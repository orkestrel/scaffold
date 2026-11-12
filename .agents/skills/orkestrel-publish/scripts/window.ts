// Work the npm authentication window. Run from the checkout root:
//   node .agents/skills/orkestrel-publish/scripts/window.ts --whoami [--wait SECONDS]
//   node .agents/skills/orkestrel-publish/scripts/window.ts --login [--wait SECONDS]
//   node .agents/skills/orkestrel-publish/scripts/window.ts --publish DIR... --otp CODE [--json]
//   node .agents/skills/orkestrel-publish/scripts/window.ts --confirm NAME@VERSION... [--wait SECONDS]
// --whoami reads `npm whoami` once, or polls it every 5 seconds until it answers or the wait ends.
// --login prints the command the operator runs in a real terminal (npm offers its approval only to a
// TTY, so no child of this script can hold it), then polls `npm whoami` until it answers or the wait
// ends. --publish refuses linked worktrees and submodules found at a package or its ancestors,
// and names a linked worktree's primary clone.
// It then re-reads `npm whoami` immediately before the first upload and refuses when it
// answers nothing, then runs `npm publish --ignore-scripts --browser=false --otp=CODE` in each
// directory back to back under captured pipes (npm's non-TTY guard turns a refused code into
// EOTP with no prompt, so the path needs no TTY), journals each upload to tmp/units/publish-<name>.log, reads the `+ name@version`
// acceptance line, stops at the first refusal and names the package to resume from, then confirms
// each accepted version against the registry. --confirm re-reads the registry for each name@version every 5
// seconds until it serves the version or the wait (default 120 seconds) ends. Exit 0 when the mode
// succeeded, 3 when it did not, 64 on usage. The script reads its flags with `parseArgs` in strict
// mode, and takes the directories of --publish and the targets of --confirm as its positional
// arguments.
import type { ParseArgsOptionsConfig } from 'node:util'
import type { SpawnSyncReturns } from 'node:child_process'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, realpathSync, statSync, writeFileSync } from 'node:fs'
import { setTimeout } from 'node:timers/promises'
import { dirname, join, resolve } from 'node:path'
import { parseArgs } from 'node:util'

/** Holds the milliseconds between two polls of the registry. */
export const POLL_MS = 5_000

/** Matches the acceptance line `npm publish` prints and captures the name and the version. */
export const ACCEPTED = /^\+ (\S+)@(\S+)\s*$/mu

/** Holds the usage line the script prints when no mode or two modes were given. */
export const USAGE =
	'usage: window.ts --whoami [--wait SECONDS] | --login [--wait SECONDS] | --publish DIR... --otp CODE [--json] | --confirm NAME@VERSION... [--wait SECONDS]'

/** Declares every flag the script reads, for `parseArgs`. */
export const OPTIONS: ParseArgsOptionsConfig = Object.freeze({
	whoami: Object.freeze({ type: 'boolean' }),
	login: Object.freeze({ type: 'boolean' }),
	publish: Object.freeze({ type: 'boolean' }),
	confirm: Object.freeze({ type: 'boolean' }),
	wait: Object.freeze({ type: 'string' }),
	otp: Object.freeze({ type: 'string' }),
	json: Object.freeze({ type: 'boolean' }),
})

/** Describes the arguments `parseArgs` read: each flag's value by name, and the positionals. */
export interface Arguments {
	readonly values: Readonly<
		Record<string, string | boolean | ReadonlyArray<string | boolean> | undefined>
	>
	readonly positionals: readonly string[]
}

/** Describes how `parseArgs` read the arguments: the arguments, or the message it refused them with. */
export type ArgumentsResult =
	| { readonly success: true; readonly value: Arguments }
	| { readonly success: false; readonly error: string }

/**
 * Parses the arguments in strict mode against `OPTIONS`.
 *
 * @param argv - The arguments after the script path.
 * @returns The values and positionals, or the message `parseArgs` refused the arguments with.
 */
export function parseArguments(argv: readonly string[]): ArgumentsResult {
	try {
		const { values, positionals } = parseArgs({
			args: [...argv],
			options: OPTIONS,
			strict: true,
			allowPositionals: true,
		})
		return { success: true, value: { values, positionals } }
	} catch (error) {
		return { success: false, error: error instanceof Error ? error.message : String(error) }
	}
}

/** Describes how to spawn npm on this host without a shell where the CLI entry is present. */
export interface NpmCommand {
	readonly file: string
	readonly prefix: readonly string[]
	readonly shell: boolean
}

/** Describes the name and version a package manifest declares. */
export interface ManifestName {
	readonly name: string | undefined
	readonly version: string | undefined
}

/** Describes one package upload and what the registry did with it. */
export interface Upload {
	readonly directory: string
	readonly name: string | undefined
	readonly version: string | undefined
	readonly exit: number | undefined
	readonly accepted: boolean
	readonly confirmed: boolean
	readonly code: string | undefined
	readonly journal: string
}

/** Describes the uploads a batch made and whether a refusal stopped it. */
export interface Published {
	readonly uploads: readonly Upload[]
	readonly stopped: boolean
}

/**
 * Parses a whole text as one JSON object.
 *
 * @param text - A JSON document, formatted or not, such as a manifest.
 * @returns The parsed object, or undefined when the text is not a JSON object.
 */
export function parseJsonRecord(text: string): Record<string, unknown> | undefined {
	try {
		const parsed: unknown = JSON.parse(text)
		if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
			return Object.fromEntries(Object.entries(parsed))
		}
	} catch {}
	return undefined
}

/**
 * Reads a string member of a record.
 *
 * @param record - The record, or undefined.
 * @param key - The member name.
 * @returns The string, or undefined when the member is absent or not a string.
 */
export function readString(
	record: Record<string, unknown> | undefined,
	key: string,
): string | undefined {
	const value = record?.[key]
	return typeof value === 'string' ? value : undefined
}

/**
 * Resolves the npm command for this host.
 *
 * @remarks
 * The `npm-cli.js` entry beside the running Node binary spawns without a shell on every host; the
 * `npm` shim on Windows is a `.cmd` file that needs one, so that path is the fallback alone.
 *
 * @returns The file to spawn, the arguments that precede npm's own, and whether a shell is needed.
 */
export function resolveNpm(): NpmCommand {
	const cli = join(dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js')
	if (existsSync(cli)) return { file: process.execPath, prefix: [cli], shell: false }
	return { file: 'npm', prefix: [], shell: process.platform === 'win32' }
}

/**
 * Runs npm with the given arguments and returns the finished child.
 *
 * @param args - The npm arguments, such as `['whoami']`.
 * @param cwd - The working directory. Default: the current directory.
 * @returns The spawn result with `utf8` stdout and stderr.
 */
export function runNpm(args: readonly string[], cwd?: string): SpawnSyncReturns<string> {
	const npm = resolveNpm()
	return spawnSync(npm.file, [...npm.prefix, ...args], {
		encoding: 'utf8',
		windowsHide: true,
		shell: npm.shell,
		maxBuffer: 64 * 1024 * 1024,
		...(cwd === undefined ? {} : { cwd }),
	})
}

/**
 * Reads the account `npm whoami` names once.
 *
 * @returns The user name, or undefined when npm exited nonzero or printed nothing.
 */
export function readWhoami(): string | undefined {
	const result = runNpm(['whoami'])
	const user = result.stdout.trim()
	return result.status === 0 && user !== '' ? user : undefined
}

/**
 * Polls `npm whoami` until it answers or the wait ends.
 *
 * @param waitSeconds - How long to keep polling; 0 reads once.
 * @param started - The millisecond the polling began. Default: now.
 * @returns The user name, or undefined when none answered within the wait.
 */
export async function pollWhoami(
	waitSeconds: number,
	started = Date.now(),
): Promise<string | undefined> {
	const user = readWhoami()
	if (user !== undefined || Date.now() - started >= waitSeconds * 1000) return user
	await setTimeout(POLL_MS)
	return pollWhoami(waitSeconds, started)
}

/**
 * Checks whether the registry serves one version of a package.
 *
 * @param name - The package name.
 * @param version - The version.
 * @returns True if `npm view` reads exactly that version; false otherwise.
 */
export function readServed(name: string, version: string): boolean {
	const result = runNpm(['view', `${name}@${version}`, 'version', '--json'])
	return result.status === 0 && result.stdout.replace(/["\s]/gu, '') === version
}

/**
 * Polls the registry until it serves one version or the wait ends.
 *
 * @param name - The package name.
 * @param version - The version.
 * @param waitSeconds - How long to keep polling; 0 reads once.
 * @param started - The millisecond the polling began. Default: now.
 * @returns True if the registry served the version within the wait; false otherwise.
 */
export async function confirmServed(
	name: string,
	version: string,
	waitSeconds: number,
	started = Date.now(),
): Promise<boolean> {
	const served = readServed(name, version)
	if (served || Date.now() - started >= waitSeconds * 1000) return served
	await setTimeout(POLL_MS)
	return confirmServed(name, version, waitSeconds, started)
}

/**
 * Finds the nearest directory at or above one that holds a `.git` entry.
 *
 * @param directory - The directory to start from.
 * @returns The nearest directory with a `.git` entry, or the filesystem root when none has one.
 */
export function findGitRoot(directory: string): string {
	return existsSync(join(directory, '.git')) || dirname(directory) === directory
		? directory
		: findGitRoot(dirname(directory))
}

/**
 * Reads the error code npm printed.
 *
 * @param text - npm's standard error.
 * @returns The first `E` code in the text, such as `EOTP` or `E401`, or undefined when none appears.
 */
export function readErrorCode(text: string): string | undefined {
	return text.match(/\b(E[A-Z0-9]{3,}|EOTP|E401|E403|E404)\b/u)?.[1]
}

/**
 * Reads the name and version a directory's package manifest declares.
 *
 * @param directory - The directory that holds `package.json`.
 * @returns The name and version, each undefined when the manifest is absent, unreadable, or lacks it.
 */
export function readManifestName(directory: string): ManifestName {
	const path = join(directory, 'package.json')
	if (!existsSync(path)) return { name: undefined, version: undefined }
	try {
		const record = parseJsonRecord(readFileSync(path, 'utf8'))
		return { name: readString(record, 'name'), version: readString(record, 'version') }
	} catch {
		return { name: undefined, version: undefined }
	}
}

/**
 * Publishes one package directory and journals the upload.
 *
 * @param directory - The package directory.
 * @param otp - The account's one-time code.
 * @returns The upload: accepted when npm exited 0 and printed the acceptance line, else refused with
 * the error code npm named.
 */
export function publishPackage(directory: string, otp: string): Upload {
	const manifest = readManifestName(directory)
	const journal = `tmp/units/publish-${(manifest.name ?? directory).replace(/[^A-Za-z0-9.-]+/gu, '-')}.log`
	// The refusal code must survive an inherited silent npm log level.
	const result = runNpm(
		['publish', '--ignore-scripts', '--browser=false', '--loglevel=error', `--otp=${otp}`],
		directory,
	)
	writeFileSync(journal, `${result.stdout}\n${result.stderr}\nexit=${result.status ?? 'null'}\n`)
	const match = `${result.stdout}\n${result.stderr}`.match(ACCEPTED)
	const accepted = result.status === 0 && match !== null
	const name = match?.[1] ?? manifest.name
	const version = match?.[2] ?? manifest.version
	const upload: Upload = {
		directory,
		name,
		version,
		exit: result.status ?? undefined,
		accepted,
		confirmed: false,
		code: accepted ? undefined : readErrorCode(result.stderr),
		journal,
	}
	if (accepted) {
		console.error(`window: accepted ${name ?? '?'}@${version ?? '?'}`)
	} else {
		console.error(
			`window: ${name ?? directory} refused (${upload.code ?? `exit ${String(result.status)}`}); resume from it on a fresh code`,
		)
	}
	return upload
}

/**
 * Publishes a batch back to back and confirms each accepted version.
 *
 * @param directories - The package directories, in publish order.
 * @param otp - The account's one-time code.
 * @param waitSeconds - How long to wait for the registry to serve each accepted version.
 * @returns One upload per directory published, ending at the first refusal; a directory after it is
 * not published.
 */
export async function publishAll(
	directories: readonly string[],
	otp: string,
	waitSeconds: number,
): Promise<readonly Upload[]> {
	mkdirSync('tmp/units', { recursive: true })
	// A step after the first refusal returns the state unchanged, so nothing publishes past it.
	const { uploads } = directories.reduce<Published>(
		(state, directory) => {
			if (state.stopped) return state
			const upload = publishPackage(directory, otp)
			return { uploads: [...state.uploads, upload], stopped: !upload.accepted }
		},
		{ uploads: [], stopped: false },
	)
	const confirmed: Upload[] = []
	for (const upload of uploads) {
		if (!upload.accepted || upload.name === undefined || upload.version === undefined) {
			confirmed.push(upload)
			continue
		}
		confirmed.push({
			...upload,
			confirmed: await confirmServed(upload.name, upload.version, waitSeconds),
		})
	}
	return confirmed
}

/**
 * Runs the mode the arguments name.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 when the mode succeeded, 3 when it did not, 64 on usage.
 */
export async function main(argv: readonly string[]): Promise<number> {
	const parsed = parseArguments(argv)
	if (!parsed.success) {
		console.error(`window: ${parsed.error}; ${USAGE}`)
		return 64
	}
	const { values, positionals } = parsed.value
	const modes = [values.whoami, values.login, values.publish, values.confirm].filter(
		(value) => value === true,
	)
	if (modes.length > 1) {
		console.error(USAGE)
		return 64
	}
	const given = typeof values.wait === 'string' ? values.wait : undefined
	const wait = Number(given ?? 120)
	if (given !== undefined && (given.trim() === '' || !Number.isFinite(wait) || wait < 0)) {
		console.error(
			`window: --wait takes a number of seconds from 0, not ${JSON.stringify(given)}; ${USAGE}`,
		)
		return 64
	}
	if (positionals.length > 0 && values.publish !== true && values.confirm !== true) {
		console.error(
			`window: ${positionals.map((value) => JSON.stringify(value)).join(', ')} given without --publish or --confirm, the modes that take a list; ${USAGE}`,
		)
		return 64
	}
	if (values.whoami === true) {
		const user = await pollWhoami(given === undefined ? 0 : wait)
		console.log(JSON.stringify({ mode: 'whoami', user, live: user !== undefined }))
		return user === undefined ? 3 : 0
	}
	if (values.login === true) {
		const command =
			process.platform === 'win32'
				? 'npm login --browser=false'
				: "script -qfc 'npm login --browser=false' tmp/units/npm-login.log"
		console.error(
			`window: run this in a real terminal, then approve the URL it prints on its first line: ${command}`,
		)
		const user = await pollWhoami(given === undefined ? 300 : wait)
		console.log(JSON.stringify({ mode: 'login', command, user, live: user !== undefined }))
		return user === undefined ? 3 : 0
	}
	if (values.publish === true) {
		const directories = positionals
		const otp = typeof values.otp === 'string' ? values.otp : undefined
		if (
			directories.length === 0 ||
			otp === undefined ||
			!/^\d{6,8}$/u.test(otp) ||
			directories.some((directory) => !existsSync(join(directory, 'package.json')))
		) {
			console.error(
				"usage: window.ts --publish DIR... --otp CODE [--wait SECONDS] [--json]; every DIR carries a package.json and CODE is the account's one-time code",
			)
			return 64
		}
		for (const directory of directories) {
			const root = findGitRoot(resolve(directory))
			const entry = join(root, '.git')
			if (statSync(entry, { throwIfNoEntry: false })?.isFile() !== true) continue
			const line = readFileSync(entry, 'utf8')
				.split(/\r\n|\n/u)
				.find((value) => value.startsWith('gitdir:'))
			const target = line?.slice('gitdir:'.length).trim()
			if (target === undefined || target === '') {
				console.error(
					`window: ${directory} has a .git file without a gitdir: path; cannot identify its primary clone`,
				)
				return 3
			}
			const gitdir = resolve(root, target)
			const common = join(gitdir, 'commondir')
			if (!existsSync(common)) {
				console.error(`window: ${directory} is a submodule; publish from a standalone clone`)
				return 3
			}
			const primary = dirname(resolve(gitdir, readFileSync(common, 'utf8').trim()))
			console.error(
				`window: ${directory} is a linked worktree; publish from its primary clone at ${primary} so npm records gitHead`,
			)
			return 3
		}
		// A stored credential expires mid-session, so the session-start answer does not hold here.
		if (readWhoami() === undefined) {
			console.error(
				'window: npm whoami answers nothing immediately before the upload; run --login first',
			)
			return 3
		}
		const uploads = await publishAll(directories, otp, wait)
		if (values.json === true) console.log(JSON.stringify({ mode: 'publish', uploads }))
		else {
			for (const upload of uploads) {
				console.log(
					`window: ${upload.directory}\t${upload.name ?? '?'}@${upload.version ?? '?'}\t${upload.accepted ? 'accepted' : `refused ${upload.code ?? String(upload.exit)}`}\t${upload.confirmed ? 'confirmed' : 'unconfirmed'}\t${upload.journal}`,
				)
			}
		}
		return uploads.every((upload) => upload.accepted && upload.confirmed) ? 0 : 3
	}
	if (values.confirm === true) {
		const targets = positionals
		if (targets.length === 0 || targets.some((target) => !/^@?[^@]+@\S+$/u.test(target))) {
			console.error('usage: window.ts --confirm NAME@VERSION... [--wait SECONDS]')
			return 64
		}
		const results: Array<{ readonly target: string; readonly served: boolean }> = []
		for (const target of targets) {
			const at = target.lastIndexOf('@')
			results.push({
				target,
				served: await confirmServed(target.slice(0, at), target.slice(at + 1), wait),
			})
		}
		console.log(JSON.stringify({ mode: 'confirm', results }))
		return results.every((result) => result.served) ? 0 : 3
	}
	console.error(USAGE)
	return 64
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	main(process.argv.slice(2)).then((code) => {
		process.exitCode = code
	})
}

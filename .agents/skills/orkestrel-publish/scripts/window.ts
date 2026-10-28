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
// succeeded, 3 when it did not, 64 on usage, including a flag the script does not read and the
// `--flag=value` form.
import type { SpawnSyncReturns } from 'node:child_process'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, realpathSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

/** Holds the milliseconds between two polls of the registry. */
export const POLL_MS = 5_000

/** Matches the acceptance line `npm publish` prints and captures the name and the version. */
export const ACCEPTED = /^\+ (\S+)@(\S+)\s*$/mu

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = [
	'--whoami',
	'--login',
	'--publish',
	'--confirm',
	'--wait',
	'--otp',
	'--json',
]

/** Holds the usage line the script prints when no mode or two modes were given. */
export const USAGE =
	'usage: window.ts --whoami [--wait SECONDS] | --login [--wait SECONDS] | --publish DIR... --otp CODE [--json] | --confirm NAME@VERSION... [--wait SECONDS]'

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
 * Reads the value that follows a flag.
 *
 * @remarks
 * Reads `--flag value` pairs: the first occurrence of a flag wins, a following value that opens
 * with `--` is a missing value, and the `--flag=value` form is not read.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--otp`.
 * @returns The value after the flag, or undefined when the flag is absent, last, or followed by
 * another flag.
 */
export function readOption(argv: readonly string[], name: string): string | undefined {
	const index = argv.indexOf(name)
	const value = index === -1 ? undefined : argv[index + 1]
	return value === undefined || value.startsWith('--') ? undefined : value
}

/**
 * Names the value flags a caller gave with no value.
 *
 * @param argv - The arguments after the script path.
 * @param names - The flags that take a value.
 * @returns Each named flag that appears last or is followed by another flag, in argument order.
 */
export function readMissingFlags(
	argv: readonly string[],
	names: readonly string[],
): readonly string[] {
	return names.filter((name) => argv.includes(name) && readOption(argv, name) === undefined)
}

/**
 * Names the flags a caller gave that the script does not read.
 *
 * @remarks
 * Reads the arguments before a bare `--`, which opens a command a script passes on. A `--flag=value`
 * argument is unknown, because the script reads no such form.
 *
 * @param argv - The arguments after the script path.
 * @param flags - Every flag the script reads, value flags and switches alike.
 * @returns Each argument that opens with `--` and is not a read flag, in argument order.
 */
export function readUnknownFlags(
	argv: readonly string[],
	flags: readonly string[],
): readonly string[] {
	const end = argv.indexOf('--')
	return (end === -1 ? argv : argv.slice(0, end)).filter(
		(argument) => argument.startsWith('--') && !flags.includes(argument),
	)
}

/**
 * Reads the values that follow a flag up to the next flag.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--publish`.
 * @returns The values between the flag and the next `--` argument, empty when the flag is absent.
 */
export function readList(argv: readonly string[], name: string): readonly string[] {
	const index = argv.indexOf(name)
	if (index === -1) return []
	const rest = argv.slice(index + 1)
	const end = rest.findIndex((argument) => argument.startsWith('--'))
	return end === -1 ? rest : rest.slice(0, end)
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
 * Waits for a number of milliseconds.
 *
 * @param ms - The delay.
 * @returns A promise that settles after the delay.
 */
export function waitFor(ms: number): Promise<void> {
	return new Promise((settle) => {
		setTimeout(settle, ms)
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
	await waitFor(POLL_MS)
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
	await waitFor(POLL_MS)
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
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(
			`window: unknown flag ${unknown.join(', ')}; give each flag and its value as separate arguments\n${USAGE}`,
		)
		return 64
	}
	const missing = readMissingFlags(argv, ['--wait', '--otp'])
	if (missing.length > 0) {
		console.error(`window: ${missing.join(', ')} given with no value`)
		return 64
	}
	const wait = Number(readOption(argv, '--wait') ?? 120)
	const modes = ['--whoami', '--login', '--publish', '--confirm'].filter((flag) =>
		argv.includes(flag),
	)
	if (modes.length > 1 || (argv.includes('--wait') && (!Number.isFinite(wait) || wait < 0))) {
		console.error(
			'usage: window.ts names one mode (--whoami | --login | --publish | --confirm), and --wait takes a number of seconds',
		)
		return 64
	}
	if (argv.includes('--whoami')) {
		const user = await pollWhoami(argv.includes('--wait') ? wait : 0)
		console.log(JSON.stringify({ mode: 'whoami', user, live: user !== undefined }))
		return user === undefined ? 3 : 0
	}
	if (argv.includes('--login')) {
		const command =
			process.platform === 'win32'
				? 'npm login --browser=false'
				: "script -qfc 'npm login --browser=false' tmp/units/npm-login.log"
		console.error(
			`window: run this in a real terminal, then approve the URL it prints on its first line: ${command}`,
		)
		const user = await pollWhoami(argv.includes('--wait') ? wait : 300)
		console.log(JSON.stringify({ mode: 'login', command, user, live: user !== undefined }))
		return user === undefined ? 3 : 0
	}
	if (argv.includes('--publish')) {
		const directories = readList(argv, '--publish')
		const otp = readOption(argv, '--otp')
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
			if (!existsSync(entry) || !statSync(entry).isFile()) continue
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
		if (argv.includes('--json')) console.log(JSON.stringify({ mode: 'publish', uploads }))
		else {
			for (const upload of uploads) {
				console.log(
					`window: ${upload.directory}\t${upload.name ?? '?'}@${upload.version ?? '?'}\t${upload.accepted ? 'accepted' : `refused ${upload.code ?? String(upload.exit)}`}\t${upload.confirmed ? 'confirmed' : 'unconfirmed'}\t${upload.journal}`,
				)
			}
		}
		return uploads.every((upload) => upload.accepted && upload.confirmed) ? 0 : 3
	}
	if (argv.includes('--confirm')) {
		const targets = readList(argv, '--confirm')
		if (targets.length === 0 || targets.some((target) => !/^@?[^@]+@\S+$/u.test(target))) {
			console.error('usage: window.ts --confirm NAME@VERSION... [--wait SECONDS]')
			return 64
		}
		const readings: Array<{ readonly target: string; readonly served: boolean }> = []
		for (const target of targets) {
			const at = target.lastIndexOf('@')
			readings.push({
				target,
				served: await confirmServed(target.slice(0, at), target.slice(at + 1), wait),
			})
		}
		console.log(JSON.stringify({ mode: 'confirm', readings }))
		return readings.every((reading) => reading.served) ? 0 : 3
	}
	console.error(USAGE)
	return 64
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	main(process.argv.slice(2)).then((code) => {
		process.exitCode = code
	})
}

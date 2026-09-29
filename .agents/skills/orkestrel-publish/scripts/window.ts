// Work the npm authentication window. Run from the checkout root:
//   node .agents/skills/orkestrel-publish/scripts/window.ts --whoami [--wait SECONDS]
//   node .agents/skills/orkestrel-publish/scripts/window.ts --login [--wait SECONDS]
//   node .agents/skills/orkestrel-publish/scripts/window.ts --publish DIR... --otp CODE [--json]
//   node .agents/skills/orkestrel-publish/scripts/window.ts --confirm NAME@VERSION... [--wait SECONDS]
// --whoami reads `npm whoami` once, or polls it every 5 seconds until it answers or the wait ends.
// --login prints the command the operator runs in a real terminal (npm offers its approval only to a
// TTY, so no child of this script can hold it), then polls `npm whoami` until it answers or the wait
// ends. --publish re-reads `npm whoami` immediately before the first upload and refuses when it
// answers nothing, then runs `npm publish --ignore-scripts --browser=false --otp=CODE` in each
// directory back to back under captured pipes (npm's non-TTY guard turns a refused code into
// EOTP with no prompt, so the path needs no TTY), journals each upload to tmp/units/publish-<name>.log, reads the `+ name@version`
// acceptance line, stops at the first refusal and names the package to resume from, then confirms
// each accepted version against the registry. --confirm re-reads the registry for each name@version every 5
// seconds until it serves the version or the wait (default 120 seconds) ends. Exit 0 when the mode
// succeeded, 3 when it did not, 64 on usage.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import {
	readList,
	readMissingFlags,
	readOption,
	readString,
	runNpm,
} from '../../orkestrel-dispatch/scripts/helpers.ts'

const POLL_MS = 5_000
const ACCEPTED = /^\+ (\S+)@(\S+)\s*$/mu

interface Upload {
	readonly directory: string
	readonly name: string | undefined
	readonly version: string | undefined
	readonly exit: number | undefined
	readonly accepted: boolean
	readonly confirmed: boolean
	readonly code: string | undefined
	readonly journal: string
}

function waitFor(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

function readWhoami(): string | undefined {
	const result = runNpm(['whoami'])
	const user = result.stdout.trim()
	return result.status === 0 && user !== '' ? user : undefined
}

async function pollWhoami(waitSeconds: number): Promise<string | undefined> {
	const started = Date.now()
	let user = readWhoami()
	while (user === undefined && Date.now() - started < waitSeconds * 1000) {
		await waitFor(POLL_MS)
		user = readWhoami()
	}
	return user
}

function readServed(name: string, version: string): boolean {
	const result = runNpm(['view', `${name}@${version}`, 'version', '--json'])
	return result.status === 0 && result.stdout.replace(/["\s]/gu, '') === version
}

async function confirmServed(name: string, version: string, waitSeconds: number): Promise<boolean> {
	const started = Date.now()
	let served = readServed(name, version)
	while (!served && Date.now() - started < waitSeconds * 1000) {
		await waitFor(POLL_MS)
		served = readServed(name, version)
	}
	return served
}

function readErrorCode(text: string): string | undefined {
	return text.match(/\b(E[A-Z0-9]{3,}|EOTP|E401|E403|E404)\b/u)?.[1]
}

function readManifestName(directory: string): {
	readonly name: string | undefined
	readonly version: string | undefined
} {
	const path = join(directory, 'package.json')
	if (!existsSync(path)) return { name: undefined, version: undefined }
	try {
		const parsed: unknown = JSON.parse(readFileSync(path, 'utf8'))
		if (typeof parsed !== 'object' || parsed === null)
			return { name: undefined, version: undefined }
		const record = Object.fromEntries(Object.entries(parsed))
		return { name: readString(record, 'name'), version: readString(record, 'version') }
	} catch {
		return { name: undefined, version: undefined }
	}
}

async function publishAll(
	directories: readonly string[],
	otp: string,
	waitSeconds: number,
): Promise<readonly Upload[]> {
	mkdirSync('tmp/units', { recursive: true })
	const uploads: Upload[] = []
	for (const directory of directories) {
		const manifest = readManifestName(directory)
		const journal = `tmp/units/publish-${(manifest.name ?? directory).replace(/[^A-Za-z0-9.-]+/gu, '-')}.log`
		const result = runNpm(
			['publish', '--ignore-scripts', '--browser=false', `--otp=${otp}`],
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
		if (!accepted) {
			uploads.push(upload)
			console.error(
				`window: ${name ?? directory} refused (${upload.code ?? `exit ${String(result.status)}`}); resume from it on a fresh code`,
			)
			break
		}
		console.error(`window: accepted ${name ?? '?'}@${version ?? '?'}`)
		uploads.push(upload)
	}
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

async function main(argv: readonly string[]): Promise<number> {
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
	console.error(
		'usage: window.ts --whoami [--wait SECONDS] | --login [--wait SECONDS] | --publish DIR... --otp CODE [--json] | --confirm NAME@VERSION... [--wait SECONDS]',
	)
	return 64
}

main(process.argv.slice(2)).then((code) => {
	process.exitCode = code
})

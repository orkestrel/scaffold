// Recover a bench login. Run from the checkout root:
//   node .agents/skills/orkestrel-dispatch/scripts/login.ts --codex [--cap SECONDS]
//   node .agents/skills/orkestrel-dispatch/scripts/login.ts --claude
// --codex reads `codex login status`; a Codex that cannot start reports live false at once. When the
// status reports no login, the script runs `codex login --device-auth` with its output journaled to
// tmp/codex/login.log, prints the verification URL and the one-time code the moment the journal
// carries them, polls `codex login status` every 5 seconds until it answers or the cap (default 600
// seconds) ends, then kills the login by its pid. Each status read gets the time left to the cap
// and is ended when it passes. --cap is a number of seconds above 0 and at most 2147483, checked
// before anything starts.
// --claude reads `claude auth status` and prints it. Name one bench per run; the script refuses a
// flag it does not read, the `--flag=value` form included. The JSON summary carries `live`; exit 0
// when the bench is logged in, 3 when it is not, 64 on usage.
import { spawn, spawnSync } from 'node:child_process'
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, realpathSync } from 'node:fs'
import { dirname } from 'node:path'

/** Names the file that journals the device-auth login output. */
export const JOURNAL = 'tmp/codex/login.log'

/** Holds the milliseconds between two reads of the login status. */
export const POLL_MS = 5_000

/** Holds the seconds the poll runs when the call gives no cap. */
export const DEFAULT_CAP = 600

/** Holds the longest cap in whole seconds, so the cap in milliseconds stays a finite timer value. */
export const MAX_CAP_SECONDS = 2_147_483

/** Holds the fewest milliseconds one status read gets, so a read that starts at the cap can still answer. */
export const STATUS_GRACE_MS = 1_000

/** Matches the verification URL the login prints. */
export const URL_PATTERN = /https?:\/\/[^\s"'<>]+/u

/** Matches the one-time code the login prints, such as `ABCD-12345`. */
export const CODE_PATTERN = /\b([A-Z0-9]{4,5}-[A-Z0-9]{4,5})\b/u

/** Lists the flags that take a value. */
export const VALUE_FLAGS: readonly string[] = ['--cap']

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = [...VALUE_FLAGS, '--codex', '--claude']

/** Describes whether a bench's status command started, whether it reports a login, and its text. */
export interface Status {
	readonly started: boolean
	readonly live: boolean
	readonly text: string
}

/** Describes what one poll of the login saw: the URL, the code, and whether the bench is logged in. */
export interface Poll {
	readonly url: string | undefined
	readonly code: string | undefined
	readonly live: boolean
}

/** Describes a command to run: the executable and the arguments it takes. */
export interface Invocation {
	readonly command: string
	readonly args: readonly string[]
}

/** Describes the commands and files a Codex login drives, and how often it polls. */
export interface Flow {
	readonly status: Invocation
	readonly device: Invocation
	readonly journal: string
	readonly intervalMs: number
}

/** Describes what a login decided: the JSON report to print and the exit code to return. */
export interface Outcome {
	readonly report: Record<string, unknown>
	readonly exit: number
}

/** Holds the real Codex commands and the journal and interval the script uses. */
export const CODEX_FLOW: Flow = {
	status: { command: 'codex', args: ['login', 'status'] },
	device: { command: 'codex', args: ['login', '--device-auth'] },
	journal: JOURNAL,
	intervalMs: POLL_MS,
}

/** Holds the real Claude status command. */
export const CLAUDE_STATUS: Invocation = { command: 'claude', args: ['auth', 'status'] }

/**
 * Reads the value that follows a flag.
 *
 * @remarks
 * The first occurrence of a flag wins, a following value that opens with `--` is a missing value,
 * and the `--flag=value` form is not read.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--cap`.
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
 * A `--flag=value` argument is unknown, because the script reads no such form. A bare `--` ends the
 * scan.
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
 * Parses the `--cap` value into a number of seconds.
 *
 * @param text - The value after `--cap`, or undefined when the flag is absent.
 * @returns The default cap when the flag is absent, the number when it is finite, above 0, and at
 * most the longest cap, and undefined otherwise.
 */
export function parseCap(text: string | undefined): number | undefined {
	if (text === undefined) return DEFAULT_CAP
	const cap = Number(text)
	return Number.isFinite(cap) && cap > 0 && cap <= MAX_CAP_SECONDS ? cap : undefined
}

/**
 * Runs a status command and reads whether it reports a login.
 *
 * @param command - The executable.
 * @param args - The status arguments.
 * @param timeoutMs - The milliseconds the command may run before it is ended, above 0; omit it for no
 * bound.
 * @returns Live when the command exits 0, with the text it printed, the reason it could not start,
 * or the note that it did not answer in time.
 */
export function readLoginStatus(
	command: string,
	args: readonly string[],
	timeoutMs?: number,
): Status {
	const result = spawnSync(command, args, {
		encoding: 'utf8',
		windowsHide: true,
		timeout: timeoutMs,
	})
	if (result.error !== undefined) {
		if ('code' in result.error && result.error.code === 'ETIMEDOUT') {
			return { started: true, live: false, text: `${command} did not answer within the cap` }
		}
		return {
			started: false,
			live: false,
			text: `${command} could not start: ${result.error.message}`,
		}
	}
	return {
		started: true,
		live: result.status === 0,
		text: `${result.stdout ?? ''}${result.stderr ?? ''}`.trim(),
	}
}

/**
 * Asks a process and the processes it started to end.
 *
 * @param pid - The process to end. A process that is already gone is not an error.
 */
export function terminateTree(pid: number): void {
	if (process.platform === 'win32') {
		spawnSync('taskkill', ['/pid', String(pid), '/T', '/F'], { stdio: 'ignore' })
		return
	}
	try {
		process.kill(pid, 'SIGTERM')
	} catch {}
}

/**
 * Waits a number of milliseconds.
 *
 * @param ms - The milliseconds to wait.
 * @returns A promise that resolves when the time has passed.
 */
export function waitFor(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

/**
 * Polls the login journal and the login status until the bench is logged in or the cap ends.
 *
 * @param started - The time the login began, in milliseconds since the epoch.
 * @param capSeconds - The seconds the poll may run.
 * @param flow - The status command, the journal to read, and the milliseconds between polls.
 * @param announce - Receives each line the poll tells the user, such as the URL to open.
 * @param url - The verification URL already read, if any.
 * @param code - The one-time code already read, if any.
 * @returns The URL, the code, and whether the bench is logged in.
 */
export async function pollLogin(
	started: number,
	capSeconds: number,
	flow: Flow,
	announce: (line: string) => void,
	url?: string,
	code?: string,
): Promise<Poll> {
	const deadline = started + capSeconds * 1000
	if (Date.now() >= deadline) return { url, code, live: false }
	await waitFor(flow.intervalMs)
	const text = existsSync(flow.journal) ? readFileSync(flow.journal, 'utf8') : ''
	const nextUrl = url ?? text.match(URL_PATTERN)?.[0]
	if (url === undefined && nextUrl !== undefined) announce(`login: open ${nextUrl}`)
	const nextCode = code ?? text.match(CODE_PATTERN)?.[1]
	if (code === undefined && nextCode !== undefined) announce(`login: enter the code ${nextCode}`)
	const remaining = Math.max(deadline - Date.now(), STATUS_GRACE_MS)
	if (readLoginStatus(flow.status.command, flow.status.args, remaining).live) {
		return { url: nextUrl, code: nextCode, live: true }
	}
	return pollLogin(started, capSeconds, flow, announce, nextUrl, nextCode)
}

/**
 * Recovers the Codex login with the device-auth flow.
 *
 * @param capSeconds - The seconds the poll may run.
 * @param flow - The status and device-auth commands, the journal, and the poll interval.
 * @param announce - Receives each line the poll tells the user, such as the URL to open.
 * @returns Exit 0 when logged in, 3 when not, with the report to print.
 */
export async function loginCodex(
	capSeconds: number,
	flow: Flow,
	announce: (line: string) => void,
): Promise<Outcome> {
	const before = readLoginStatus(flow.status.command, flow.status.args, capSeconds * 1000)
	// A Codex that cannot start cannot log in either, so the device-auth login never spawns.
	if (before.live || !before.started) {
		return {
			report: { bench: 'codex', live: before.live, status: before.text },
			exit: before.live ? 0 : 3,
		}
	}
	mkdirSync(dirname(flow.journal), { recursive: true })
	const journal = openSync(flow.journal, 'w')
	const started = Date.now()
	const child = spawn(flow.device.command, flow.device.args, {
		stdio: ['ignore', journal, journal],
		windowsHide: true,
	})
	const { url, code, live } = await pollLogin(started, capSeconds, flow, announce)
	if (child.exitCode === null && child.pid !== undefined) terminateTree(child.pid)
	closeSync(journal)
	return {
		report: {
			bench: 'codex',
			live,
			url,
			code,
			durationMs: Date.now() - started,
			journal: flow.journal,
			status: readLoginStatus(flow.status.command, flow.status.args, STATUS_GRACE_MS).text,
		},
		exit: live ? 0 : 3,
	}
}

/**
 * Reads the Claude login status.
 *
 * @param status - The command that reports the Claude login.
 * @returns Exit 0 when logged in, 3 when not, with the report to print.
 */
export function loginClaude(status: Invocation): Outcome {
	const read = readLoginStatus(status.command, status.args)
	return {
		report: { bench: 'claude', live: read.live, status: read.text },
		exit: read.live ? 0 : 3,
	}
}

/**
 * Runs the script on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 when logged in, 3 when not, 64 on usage.
 */
export async function main(argv: readonly string[]): Promise<number> {
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(
			`login: ${unknown.join(', ')} is not a flag this script reads; usage: login.ts --codex [--cap SECONDS] | --claude`,
		)
		return 64
	}
	const missing = readMissingFlags(argv, VALUE_FLAGS)
	if (missing.length > 0) {
		console.error(`login: ${missing.join(', ')} given with no value`)
		return 64
	}
	if (argv.includes('--codex') && argv.includes('--claude')) {
		console.error('usage: login.ts names one bench: --codex [--cap SECONDS] | --claude')
		return 64
	}
	const cap = parseCap(readOption(argv, '--cap'))
	if (cap === undefined) {
		console.error(
			`login: --cap takes a number of seconds above 0 and at most ${String(MAX_CAP_SECONDS)}`,
		)
		return 64
	}
	if (argv.includes('--codex')) {
		const outcome = await loginCodex(cap, CODEX_FLOW, (line) => {
			console.error(line)
		})
		console.log(JSON.stringify(outcome.report))
		return outcome.exit
	}
	if (argv.includes('--claude')) {
		const outcome = loginClaude(CLAUDE_STATUS)
		console.log(JSON.stringify(outcome.report))
		return outcome.exit
	}
	console.error('usage: login.ts --codex [--cap SECONDS] | --claude')
	return 64
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	main(process.argv.slice(2)).then((code) => {
		process.exitCode = code
	})
}

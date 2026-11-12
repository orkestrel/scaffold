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
// --claude reads `claude auth status` and prints it. Name one bench per run; the script reads its
// flags with `parseArgs` in strict mode. The JSON summary carries `live`; exit 0
// when the bench is logged in, 3 when it is not, 64 on usage.
import type { ParseArgsOptionsConfig } from 'node:util'
import { spawn, spawnSync } from 'node:child_process'
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, realpathSync } from 'node:fs'
import { setTimeout } from 'node:timers/promises'
import { dirname } from 'node:path'
import { parseArgs } from 'node:util'

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

/** Holds the usage line printed when a call names no bench or two. */
export const USAGE = 'usage: login.ts --codex [--cap SECONDS] | --claude'

/** Declares every flag the script reads, for `parseArgs`. */
export const OPTIONS: ParseArgsOptionsConfig = Object.freeze({
	cap: Object.freeze({ type: 'string' }),
	codex: Object.freeze({ type: 'boolean' }),
	claude: Object.freeze({ type: 'boolean' }),
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
			allowPositionals: false,
		})
		return { success: true, value: { values, positionals } }
	} catch (error) {
		return { success: false, error: error instanceof Error ? error.message : String(error) }
	}
}

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
	await setTimeout(flow.intervalMs)
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
	const parsed = parseArguments(argv)
	if (!parsed.success) {
		console.error(`login: ${parsed.error}; ${USAGE}`)
		return 64
	}
	const { values } = parsed.value
	if (values.codex === true && values.claude === true) {
		console.error(`login: --codex and --claude are two modes; name one bench; ${USAGE}`)
		return 64
	}
	const text = typeof values.cap === 'string' ? values.cap : undefined
	const cap = parseCap(text)
	if (cap === undefined) {
		console.error(
			`login: --cap takes a number of seconds above 0 and at most ${String(MAX_CAP_SECONDS)}, not ${JSON.stringify(text)}; ${USAGE}`,
		)
		return 64
	}
	if (values.codex === true) {
		const outcome = await loginCodex(cap, CODEX_FLOW, (line) => {
			console.error(line)
		})
		console.log(JSON.stringify(outcome.report))
		return outcome.exit
	}
	if (values.claude === true) {
		const outcome = loginClaude(CLAUDE_STATUS)
		console.log(JSON.stringify(outcome.report))
		return outcome.exit
	}
	console.error(USAGE)
	return 64
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	main(process.argv.slice(2)).then((code) => {
		process.exitCode = code
	})
}

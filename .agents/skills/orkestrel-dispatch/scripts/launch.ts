// Journaled launch of a bench exec or any command that outlives a turn. Run from the checkout root:
//   node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/codex/UNIT.jsonl --errors tmp/codex/UNIT.err --cap 1500 [--status] -- codex exec --json ...
// The command's stdout goes to --journal and its stderr to --errors; stdin is closed. Arguments after
// `--` pass to the command verbatim, so no shell quoting is involved. --cap is in seconds: when it
// expires the process tree is killed and the errors file records `capped=true`; a command that had
// already exited when the cap expired is not capped. A fractional cap
// truncates to whole milliseconds, with 1 ms the least. --status records
// `git status --porcelain` before and after beside the journal, which is how a read-only lane's
// containment is checked. Stdout carries up to two JSON lines. The spawn line
// `{"pid","journal","errors"}` prints as soon as the command starts, and the pid, as decimal digits
// and a newline, goes to `<journal>.pid`. A pid file an earlier run left on the same journal is
// removed before the spawn, so neither appears when the command cannot start. The summary line
// prints last, after the command exits, and the errors file ends with `exit=<code>`. At the cap,
// Windows kills the process tree; any other host kills the command alone, not its descendants.
// The launcher reads its own flags before the first bare `--` with `parseArgs` in strict mode, and
// passes every argument after it to the command. Exit: the command's code; 124 when capped;
// 127 when the command could not start (the errors file names why); 64 on usage, including a
// journal and errors path that are the same file and a cap that is not a number of seconds from 0
// to 2147483.
import type { ParseArgsOptionsConfig } from 'node:util'
import type { ChildProcess } from 'node:child_process'
import { spawn, spawnSync } from 'node:child_process'
import {
	appendFileSync,
	closeSync,
	mkdirSync,
	openSync,
	realpathSync,
	rmSync,
	writeFileSync,
} from 'node:fs'
import { dirname } from 'node:path'
import { parseArgs } from 'node:util'

/**
 * Holds the longest cap in whole seconds.
 *
 * @remarks
 * The longest wait a Node timer holds is 2147483647 ms; floored to whole seconds, a longer cap would
 * throw from `AbortSignal.timeout` after the spawn or clamp to 1 ms and kill the command at once.
 */
export const MAX_CAP_SECONDS = 2_147_483

/** Holds the usage line printed when a call names no journal, no errors file, or no command. */
export const USAGE =
	'usage: launch.ts --journal PATH --errors PATH [--cap SECONDS] [--status] -- COMMAND [ARGS...]'

/** Declares every flag the script reads, for `parseArgs`. */
export const OPTIONS: ParseArgsOptionsConfig = Object.freeze({
	journal: Object.freeze({ type: 'string' }),
	errors: Object.freeze({ type: 'string' }),
	cap: Object.freeze({ type: 'string' }),
	status: Object.freeze({ type: 'boolean' }),
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

/** Describes how the command ended: its code, its signal, or the reason it could not start. */
export interface Exit {
	readonly code: number | null
	readonly signal: NodeJS.Signals | null
	readonly error: string | undefined
}

/**
 * Computes the cap in whole milliseconds that the timer takes.
 *
 * @remarks
 * `AbortSignal.timeout` throws on a fractional delay, which `setTimeout` truncates and raises to 1 ms
 * from below, so the cap takes that form before the command starts.
 *
 * @param cap - The cap in seconds.
 * @returns The whole milliseconds, at least 1.
 */
export function computeCapMilliseconds(cap: number): number {
	return Math.max(1, Math.trunc(cap * 1000))
}

/**
 * Reads the working tree's `git status --porcelain` output.
 *
 * @param cwd - The directory to read the status in. Default: the current directory.
 * @returns The porcelain text, or a `git status failed:` line carrying git's own message.
 */
export function readGitStatus(cwd?: string): string {
	const result = spawnSync('git', ['status', '--porcelain'], {
		encoding: 'utf8',
		...(cwd === undefined ? {} : { cwd }),
	})
	return result.status === 0 ? result.stdout : `git status failed: ${result.stderr}`
}

/**
 * Kills a process and every process it started, at once and without a chance to clean up.
 *
 * @param pid - The process to kill. A process that is already gone is not an error.
 */
export function forceKillTree(pid: number): void {
	if (process.platform === 'win32') {
		spawnSync('taskkill', ['/pid', String(pid), '/T', '/F'], { stdio: 'ignore' })
		return
	}
	try {
		process.kill(pid, 'SIGKILL')
	} catch {}
}

/**
 * Ends a command that is still running and aborts the controller to say the cap ended it.
 *
 * @remarks
 * The cap's timer cannot be cleared, so it can elapse after the command exited on its own. The
 * controller aborts only when the command is still running at that moment, which is how the run
 * records that the cap, and not the command, ended it; a reused pid is never this command's.
 *
 * @param child - The running command.
 * @param ended - The controller that aborts when the cap ended the command.
 */
export function endRunning(child: ChildProcess, ended: AbortController): void {
	if (child.pid !== undefined && child.exitCode === null && child.signalCode === null) {
		ended.abort()
		forceKillTree(child.pid)
	}
}

/**
 * Starts the command with its output sent to the journal and errors files.
 *
 * @param command - The executable.
 * @param args - The command's arguments, passed verbatim.
 * @param journal - The open journal file descriptor that receives stdout.
 * @param errors - The open errors file descriptor that receives stderr.
 * @returns The child process, or the failure when the spawn throws.
 */
export function startCommand(
	command: string,
	args: readonly string[],
	journal: number,
	errors: number,
): ChildProcess | Exit {
	try {
		return spawn(command, args, { stdio: ['ignore', journal, errors], windowsHide: true })
	} catch (error) {
		return {
			code: null,
			signal: null,
			error: error instanceof Error ? error.message : String(error),
		}
	}
}

/**
 * Waits for a started command to close.
 *
 * @param child - The started command.
 * @returns How it ended: its code and signal, or the error that stopped it.
 */
export function waitForExit(child: ChildProcess): Promise<Exit> {
	return new Promise((resolve) => {
		child.on('error', (error) => resolve({ code: null, signal: null, error: error.message }))
		child.on('close', (code, signal) => resolve({ code, signal, error: undefined }))
	})
}

/**
 * Runs the launcher on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: the command's, 124 when capped, 127 when it could not start, 64 on usage.
 */
export async function main(argv: readonly string[]): Promise<number> {
	const separator = argv.indexOf('--')
	const parsed = parseArguments(separator === -1 ? argv : argv.slice(0, separator))
	if (!parsed.success) {
		console.error(`launch: ${parsed.error}; ${USAGE}`)
		return 64
	}
	const { values } = parsed.value
	const journal = typeof values.journal === 'string' ? values.journal : undefined
	const errors = typeof values.errors === 'string' ? values.errors : undefined
	const text = typeof values.cap === 'string' ? values.cap : '0'
	const cap = Number(text)
	const [command, ...args] = separator === -1 ? [] : argv.slice(separator + 1)
	if (
		separator === -1 ||
		journal === undefined ||
		errors === undefined ||
		command === undefined ||
		command === ''
	) {
		console.error(USAGE)
		return 64
	}
	if (journal === errors) {
		console.error(`launch: --journal and --errors name the same file; ${USAGE}`)
		return 64
	}
	if (text === '' || !Number.isFinite(cap) || cap < 0 || cap > MAX_CAP_SECONDS) {
		console.error(
			`launch: --cap takes a number of seconds from 0 to ${String(MAX_CAP_SECONDS)} (0 for none), not ${JSON.stringify(text)}; ${USAGE}`,
		)
		return 64
	}
	const status = values.status === true
	const capMilliseconds = cap > 0 ? computeCapMilliseconds(cap) : undefined
	mkdirSync(dirname(journal), { recursive: true })
	mkdirSync(dirname(errors), { recursive: true })
	if (status) writeFileSync(`${journal}.status-before.txt`, readGitStatus())
	const journalFd = openSync(journal, 'w')
	const errorsFd = openSync(errors, 'w')
	rmSync(`${journal}.pid`, { force: true })
	const started = Date.now()
	const launched = startCommand(command, args, journalFd, errorsFd)
	const child = 'error' in launched ? undefined : launched
	if (child?.pid !== undefined) {
		writeFileSync(`${journal}.pid`, `${child.pid}\n`)
		console.log(JSON.stringify({ pid: child.pid, journal, errors }))
	}
	// The ended controller aborts only when the cap found the command still running, so whether it
	// aborted is whether the cap ended the run.
	const ended = new AbortController()
	const deadline =
		child === undefined || capMilliseconds === undefined
			? undefined
			: AbortSignal.timeout(capMilliseconds)
	deadline?.addEventListener(
		'abort',
		() => {
			if (child !== undefined) endRunning(child, ended)
		},
		{ once: true },
	)
	const exit = 'error' in launched ? launched : await waitForExit(launched)
	const capped = ended.signal.aborted
	closeSync(journalFd)
	closeSync(errorsFd)
	const durationMs = Date.now() - started
	appendFileSync(
		errors,
		`${exit.error === undefined ? '' : `launch: the command could not start: ${exit.error}\n`}\nexit=${exit.error === undefined ? (exit.code ?? 'null') : '127'} signal=${exit.signal ?? 'none'} capped=${capped} duration_ms=${durationMs}\n`,
	)
	if (status) writeFileSync(`${journal}.status-after.txt`, readGitStatus())
	console.log(
		JSON.stringify({
			pid: child?.pid,
			exit: exit.error === undefined ? exit.code : 127,
			signal: exit.signal,
			capped,
			durationMs,
			journal,
			errors,
			error: exit.error,
		}),
	)
	if (exit.error !== undefined) return 127
	return capped ? 124 : (exit.code ?? 1)
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	main(process.argv.slice(2)).then((code) => {
		process.exitCode = code
	})
}

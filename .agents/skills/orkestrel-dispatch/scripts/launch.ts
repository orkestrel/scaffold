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
// The launcher's own flags are read before `--` alone, and it refuses a flag it does not read there,
// the `--flag=value` form included. Exit: the command's code; 124 when capped;
// 127 when the command could not start (the errors file names why); 64 on usage, including a
// journal and errors path that are the same file and a cap that is not a number of seconds from 0
// to 2147483.
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

/**
 * Holds the longest cap in whole seconds.
 *
 * @remarks
 * The longest wait a Node timer holds is 2147483647 ms; floored to whole seconds, a longer cap would
 * throw from `AbortSignal.timeout` after the spawn or clamp to 1 ms and kill the command at once.
 */
export const MAX_CAP_SECONDS = 2_147_483

/** Lists the flags that take a value. */
export const VALUE_FLAGS: readonly string[] = ['--journal', '--errors', '--cap']

/** Lists every flag the launcher reads before the separator, value flags and switches alike. */
export const FLAGS: readonly string[] = [...VALUE_FLAGS, '--status']

/** Describes how the command ended: its code, its signal, or the reason it could not start. */
export interface Exit {
	readonly code: number | null
	readonly signal: NodeJS.Signals | null
	readonly error: string | undefined
}

/**
 * Reads the value that follows a flag.
 *
 * @remarks
 * The first occurrence of a flag wins, a following value that opens with `--` is a missing value,
 * and the `--flag=value` form is not read.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--journal`.
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
 * scan, so the command after it keeps every argument.
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
	// The launcher's own flags end at the separator; everything after it belongs to the command.
	const own = separator === -1 ? argv : argv.slice(0, separator)
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(
			`launch: ${unknown.join(', ')} is not a flag this launcher reads before --; flags: ${FLAGS.join(' ')}`,
		)
		return 64
	}
	const journal = readOption(own, '--journal')
	const errors = readOption(own, '--errors')
	const cap =
		readMissingFlags(own, ['--cap']).length > 0
			? Number.NaN
			: Number(readOption(own, '--cap') ?? '0')
	const [command, ...args] = separator === -1 ? [] : argv.slice(separator + 1)
	if (
		separator === -1 ||
		journal === undefined ||
		errors === undefined ||
		journal === errors ||
		!Number.isFinite(cap) ||
		cap < 0 ||
		cap > MAX_CAP_SECONDS ||
		command === undefined ||
		command === ''
	) {
		console.error(
			`usage: launch.ts --journal PATH --errors PATH --cap SECONDS [--status] -- COMMAND [ARGS...]; the journal and the errors file differ, and the cap is a number of seconds from 0 to ${String(MAX_CAP_SECONDS)} (0 for none)`,
		)
		return 64
	}
	const status = own.includes('--status')
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

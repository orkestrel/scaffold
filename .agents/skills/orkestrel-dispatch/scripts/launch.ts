// Journaled launch of a bench exec or any command that outlives a turn. Run from the checkout root:
//   node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/codex/UNIT.jsonl --errors tmp/codex/UNIT.err --cap 1500 [--status] [--detach [--env NAME]...] -- codex exec --json ...
//   node .agents/skills/orkestrel-dispatch/scripts/launch.ts --handoff tmp/codex/UNIT.jsonl.handoff.json
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
// prints last, after the command exits, and the errors file ends with `exit=<code>`, written after
// every other file. At the cap, Windows kills the process tree; any other host kills the command
// alone, not its descendants.
// --detach starts the launch outside the caller's process tree, on Windows alone, through WMI's
// `Win32_Process` `Create` method, which gives the launcher the user's registry environment. The
// caller writes `<journal>.handoff.json` holding the command, its working directory, the cap, the
// --status switch, the absolute journal and errors paths, `PATH`, and each variable an --env NAME
// names (it repeats); never name a variable that holds a secret, because the record is a plain file.
// The detached launcher runs `--handoff` on that record: it writes its own id to
// `<journal>.launcher.pid`, deletes the record before the spawn, merges its variables over its own
// environment by case-folded name, writes every file an attached run writes, and writes its summary
// line to `<journal>.summary.json`. When it refuses the record, it writes the reason to
// `<journal>.handoff.json.refused`. The caller bounds each PowerShell call by `POWERSHELL_MS`, waits
// up to `HANDOFF_MS` for `<journal>.pid`, the errors file's `exit=` line, or the refusal file, prints
// `{"launcher","pid","journal","errors"}`, and exits 0; the line carries no `pid` when the command
// could not start. When the wait ends, the caller kills the launcher's tree only when that process's
// command line names the record. Stop a detached command by killing the tree of the id in
// `<journal>.pid`, never the launcher, so the launcher records `exit=`. --detach refuses a run inside
// a `lane.ts` ticket, which sets `ORKESTREL_LANE`.
// The launcher reads its own flags before the first bare `--` with `parseArgs` in strict mode, and
// passes every argument after it to the command. Exit: the command's code; 124 when capped;
// 127 when the command could not start (the errors file names why); 64 on usage, including a
// journal and errors path that resolve to one file (case-folded on Windows) in either form, a cap
// that is not a number of seconds from 0 to 2147483, --detach with no cap or a cap of 0 or with
// `ORKESTREL_LANE` set, an --env without --detach or naming a variable that is unset or holds `=`,
// and --handoff beside any other flag or a bare `--`; 69 when --detach runs on a host other than
// Windows; 75 when --detach finds `<journal>.launcher.pid` naming a live process, when PowerShell
// or `Create` fails or outlasts its bound, when the launcher refuses the record, or when the
// confirmation wait ends, and when --handoff refuses its record (a path without the record's name
// ending, a missing or malformed record, or one it cannot delete), which runs nothing and creates
// no journal.
import type { ParseArgsOptionsConfig } from 'node:util'
import type { ChildProcess } from 'node:child_process'
import { spawn, spawnSync } from 'node:child_process'
import { once } from 'node:events'
import {
	closeSync,
	existsSync,
	mkdirSync,
	openSync,
	readFileSync,
	realpathSync,
	rmSync,
	watch,
	writeFileSync,
} from 'node:fs'
import { dirname, isAbsolute, resolve as resolvePath } from 'node:path'
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
	'usage: launch.ts --journal PATH --errors PATH [--cap SECONDS] [--status] [--detach [--env NAME]...] -- COMMAND [ARGS...] | launch.ts --handoff FILE; --env repeats, and --detach takes a cap above 0'

/** Declares every flag the script reads, for `parseArgs`. */
export const OPTIONS: ParseArgsOptionsConfig = Object.freeze({
	journal: Object.freeze({ type: 'string' }),
	errors: Object.freeze({ type: 'string' }),
	cap: Object.freeze({ type: 'string' }),
	status: Object.freeze({ type: 'boolean' }),
	detach: Object.freeze({ type: 'boolean' }),
	env: Object.freeze({ type: 'string', multiple: true }),
	handoff: Object.freeze({ type: 'string' }),
})

/**
 * Holds the longest wait in milliseconds for a detached launcher to start its command or record that
 * it could not.
 *
 * @remarks
 * The wait outlasts a Node start and a git status read on a loaded host.
 */
export const HANDOFF_MS = 30_000

/**
 * Holds the longest wait in milliseconds for one `powershell.exe` call.
 *
 * @remarks
 * The bound sits inside {@link HANDOFF_MS}, and a warm CIM call answered in about 1.5 s on the Windows
 * host read 2026-11-20.
 */
export const POWERSHELL_MS = 20_000

/** Holds the name ending a detached run's handoff record adds to the journal path. */
export const HANDOFF_SUFFIX = '.handoff.json'

/** Holds the name ending the detached launcher adds to the record path when it refuses the record. */
export const REFUSED_SUFFIX = '.refused'

/** Holds the variable that carries a process id to {@link COMMAND_LINE_COMMAND}. */
export const PID_VARIABLE = 'ORKESTREL_DETACH_PID'

/** Holds the PowerShell text that prints the command line of the process {@link PID_VARIABLE} names. */
export const COMMAND_LINE_COMMAND = `$p=Get-CimInstance Win32_Process -Filter ('ProcessId='+[UInt32]$env:${PID_VARIABLE});if($p){[Console]::Out.WriteLine($p.CommandLine)}`

/** Holds the variable `lane.ts` sets for its launcher, which --detach refuses. */
export const LANE_VARIABLE = 'ORKESTREL_LANE'

/** Holds the variable that carries the detached launcher's command line to PowerShell. */
export const LINE_VARIABLE = 'ORKESTREL_DETACH_LINE'

/** Holds the variable that carries the detached launcher's working directory to PowerShell. */
export const DIRECTORY_VARIABLE = 'ORKESTREL_DETACH_DIRECTORY'

/**
 * Holds the PowerShell text that starts the detached launcher and prints `<ReturnValue> <ProcessId>`.
 *
 * @remarks
 * The text reads the command line and the working directory from {@link LINE_VARIABLE} and
 * {@link DIRECTORY_VARIABLE}, so no caller value enters the code. `ShowWindow` 0 hides the console
 * the launcher's start opens.
 */
export const DETACH_COMMAND = `$ErrorActionPreference='Stop';$s=New-CimInstance -CimClass (Get-CimClass -ClassName Win32_ProcessStartup) -ClientOnly -Property @{ShowWindow=[UInt16]0};$r=Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{CommandLine=$env:${LINE_VARIABLE};CurrentDirectory=$env:${DIRECTORY_VARIABLE};ProcessStartupInformation=$s};[Console]::Out.WriteLine(('{0} {1}' -f $r.ReturnValue,$r.ProcessId))`

/** Matches the line {@link DETACH_COMMAND} prints: the return value and the process id, absent on a failure. */
export const CREATION_PATTERN = /^(\d+)(?: (\d+))?$/u

/** Matches the errors file of a run that ended: its last line is the `exit=` trailer. */
export const TRAILER_PATTERN =
	/(?:^|\n)exit=\S+ signal=\S+ capped=(?:true|false) duration_ms=\d+\n$/u

/** Lists a handoff record's keys in sorted order; the record holds these and no other. */
export const HANDOFF_KEYS: readonly string[] = Object.freeze([
	'cap',
	'command',
	'cwd',
	'errors',
	'journal',
	'status',
	'variables',
])

/**
 * Describes the record a detached run hands its launcher.
 *
 * @remarks
 * `command` holds the executable and its arguments, `cwd` the caller's absolute working directory,
 * `cap` the cap in seconds above 0, `status` the --status switch, `journal` and `errors` the absolute
 * paths, and `variables` `PATH` and each --env variable by name.
 */
export interface Handoff {
	readonly command: readonly string[]
	readonly cwd: string
	readonly cap: number
	readonly status: boolean
	readonly journal: string
	readonly errors: string
	readonly variables: Readonly<Record<string, string>>
}

/** Describes what WMI's `Create` method answered: its return value, and the process id on a success. */
export interface Creation {
	readonly code: number
	readonly pid: number | undefined
}

/**
 * Describes what ends a detached start's wait: the command's pid, undefined when it could not start,
 * and the launcher's refusal of the record, undefined when it accepted it.
 */
export interface Confirmation {
	readonly pid: number | undefined
	readonly refusal: string | undefined
}

/** Describes one `powershell.exe` call: its exit status, its output, and whether its bound ended it. */
export interface PowerShellResult {
	readonly status: number | null
	readonly stdout: string
	readonly stderr: string
	readonly timedOut: boolean
}

/**
 * Describes the files a launch writes after its command ends.
 *
 * @remarks
 * `summary` is the summary line a detached launch writes to `<journal>.summary.json`, undefined for an
 * attached launch; `status` is the `git status --porcelain` text for `<journal>.status-after.txt`,
 * undefined without --status; `trailer` is the text appended to the errors file, ending in `exit=`.
 */
export interface Closing {
	readonly journal: string
	readonly errors: string
	readonly summary: string | undefined
	readonly status: string | undefined
	readonly trailer: string
}

/** Writes one file's text, replacing it under flag `w` and appending under flag `a`. */
export type WriterFunction = (path: string, text: string, flag: 'w' | 'a') => void

/** Describes where a command runs: its working directory and its whole environment, each undefined to inherit. */
export interface Placement {
	readonly cwd: string | undefined
	readonly env: Readonly<Record<string, string | undefined>> | undefined
}

/**
 * Describes one validated launch.
 *
 * @remarks
 * `cap` is in seconds, 0 for none; `detached` marks a launch a handoff record started, which writes
 * its summary line to `<journal>.summary.json`.
 */
export interface Launch {
	readonly command: string
	readonly args: readonly string[]
	readonly journal: string
	readonly errors: string
	readonly cap: number
	readonly status: boolean
	readonly placement: Placement
	readonly detached: boolean
}

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
 * @param env - The environment whose `PATH` resolves git. Default: this process's.
 * @returns The porcelain text, or a `git status failed:` line carrying git's own message.
 */
export function readGitStatus(
	cwd?: string,
	env?: Readonly<Record<string, string | undefined>>,
): string {
	const result = spawnSync('git', ['status', '--porcelain'], {
		encoding: 'utf8',
		...(cwd === undefined ? {} : { cwd }),
		...(env === undefined ? {} : { env }),
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
 * @param placement - The working directory and environment, each undefined to inherit. Default: both
 * inherited. A given environment's `PATH` resolves the executable.
 * @returns The child process, or the failure when the spawn throws.
 */
export function startCommand(
	command: string,
	args: readonly string[],
	journal: number,
	errors: number,
	placement?: Placement,
): ChildProcess | Exit {
	try {
		return spawn(command, args, {
			stdio: ['ignore', journal, errors],
			windowsHide: true,
			...(placement?.cwd === undefined ? {} : { cwd: placement.cwd }),
			...(placement?.env === undefined ? {} : { env: placement.env }),
		})
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
 * Quotes one argument the way `CommandLineToArgvW` and the C runtime read it back.
 *
 * @remarks
 * The argument is always wrapped in quotes. A run of backslashes before a quote doubles and the quote
 * takes one more backslash; a run at the end doubles, because the closing quote follows it; every
 * other backslash stays as it is. A program name, which the reader takes up to its closing quote with
 * no escapes, reads back the same while it holds no quote and ends in no backslash, as an executable
 * path does.
 *
 * @param text - The argument.
 * @returns The quoted argument.
 */
export function quoteArgument(text: string): string {
	return `"${text.replace(/(\\*)"/gu, '$1$1\\"').replace(/(\\+)$/u, '$1$1')}"`
}

/**
 * Renders a Windows command line from an argument array.
 *
 * @param args - The program and its arguments.
 * @returns Each argument quoted by {@link quoteArgument}, joined by spaces.
 */
export function renderCommandLine(args: readonly string[]): string {
	return args.map(quoteArgument).join(' ')
}

/**
 * Builds a child environment from a base environment and the variables a run adds.
 *
 * @remarks
 * A Windows environment block folds names by case, so an inherited variable whose lower-cased name an
 * added variable claims is dropped before the added one is laid over the rest.
 *
 * @param base - The environment the child would inherit.
 * @param added - The variables the run adds.
 * @returns The merged environment.
 */
export function buildEnvironment(
	base: Readonly<Record<string, string | undefined>>,
	added: Readonly<Record<string, string>>,
): Record<string, string | undefined> {
	const claimed = new Set(Object.keys(added).map((name) => name.toLowerCase()))
	return {
		...Object.fromEntries(
			Object.entries(base).filter(([name]) => !claimed.has(name.toLowerCase())),
		),
		...added,
	}
}

/**
 * Collects `PATH` and each named variable that a source environment sets.
 *
 * @param names - The variables --env names.
 * @param source - The caller's environment.
 * @returns Each set variable by the name it was asked for, `PATH` first, keeping the first of names
 * that differ only by case.
 */
export function collectVariables(
	names: readonly string[],
	source: Readonly<Record<string, string | undefined>>,
): Readonly<Record<string, string>> {
	const entries = ['PATH', ...names].flatMap((name) => {
		const value = source[name]
		return value === undefined ? [] : [[name, value] as const]
	})
	return Object.fromEntries(
		entries.filter(
			([name], index) =>
				entries.findIndex(([other]) => other.toLowerCase() === name.toLowerCase()) === index,
		),
	)
}

/**
 * Checks whether a value is a record of environment variables.
 *
 * @param value - The parsed JSON value.
 * @returns True for a plain object whose every name is non-empty and holds no `=`, and whose every
 * value is a string; false otherwise.
 */
export function isVariables(value: unknown): value is Readonly<Record<string, string>> {
	return (
		typeof value === 'object' &&
		value !== null &&
		!Array.isArray(value) &&
		Object.entries(value).every(
			([name, text]) => name !== '' && !name.includes('=') && typeof text === 'string',
		)
	)
}

/**
 * Checks whether a value is a handoff record.
 *
 * @param value - The parsed JSON value.
 * @returns True when the value holds exactly {@link HANDOFF_KEYS}, a command whose executable is a
 * non-empty string and whose every argument is a string, an absolute working directory, a cap above 0
 * up to {@link MAX_CAP_SECONDS}, a boolean status, two different absolute paths, and its variables;
 * false otherwise, a value whose read throws included.
 */
export function isHandoff(value: unknown): value is Handoff {
	try {
		return (
			typeof value === 'object' &&
			value !== null &&
			!Array.isArray(value) &&
			Object.keys(value).toSorted().join(',') === HANDOFF_KEYS.join(',') &&
			'command' in value &&
			Array.isArray(value.command) &&
			value.command.every((part: unknown) => typeof part === 'string') &&
			typeof value.command[0] === 'string' &&
			value.command[0] !== '' &&
			'cwd' in value &&
			typeof value.cwd === 'string' &&
			isAbsolute(value.cwd) &&
			'cap' in value &&
			typeof value.cap === 'number' &&
			Number.isFinite(value.cap) &&
			value.cap > 0 &&
			value.cap <= MAX_CAP_SECONDS &&
			'status' in value &&
			typeof value.status === 'boolean' &&
			'journal' in value &&
			typeof value.journal === 'string' &&
			isAbsolute(value.journal) &&
			'errors' in value &&
			typeof value.errors === 'string' &&
			isAbsolute(value.errors) &&
			value.journal !== value.errors &&
			'variables' in value &&
			isVariables(value.variables)
		)
	} catch {
		return false
	}
}

/**
 * Reads a pid file.
 *
 * @param path - The file.
 * @returns The id it holds as decimal digits and a newline, or undefined when the file is absent,
 * unreadable, or not yet complete.
 */
export function readPid(path: string): number | undefined {
	try {
		const match = /^(\d+)\n$/u.exec(readFileSync(path, 'utf8'))
		return match?.[1] === undefined ? undefined : Number(match[1])
	} catch {
		return undefined
	}
}

/**
 * Reads whether a process runs.
 *
 * @param pid - The process id.
 * @returns True when the host reports the process, a process this one may not signal included; false
 * otherwise.
 */
export function readRunning(pid: number): boolean {
	try {
		process.kill(pid, 0)
		return true
	} catch (error) {
		return error instanceof Error && 'code' in error && error.code === 'EPERM'
	}
}

/**
 * Parses what {@link DETACH_COMMAND} printed.
 *
 * @param text - PowerShell's standard output.
 * @returns The return value and the process id, or undefined when the first non-empty line has
 * another form.
 */
export function parseCreation(text: string): Creation | undefined {
	const line = text
		.split(/\r\n|\n/u)
		.map((part) => part.trim())
		.find((part) => part !== '')
	const match = line === undefined ? null : CREATION_PATTERN.exec(line)
	if (match?.[1] === undefined) return undefined
	return { code: Number(match[1]), pid: match[2] === undefined ? undefined : Number(match[2]) }
}

/**
 * Reads a launcher's refusal file.
 *
 * @param path - The `<record>.refused` file.
 * @returns The one-line reason when the file holds it whole, or undefined.
 */
export function readRefusal(path: string): string | undefined {
	try {
		const text = readFileSync(path, 'utf8')
		return text.endsWith('\n') && text.trim() !== '' ? text.trim() : undefined
	} catch {
		return undefined
	}
}

/**
 * Reads whether a detached start is confirmed or refused.
 *
 * @param journal - The absolute journal path.
 * @param errors - The absolute errors path.
 * @returns The launcher's refusal when `<journal>.handoff.json.refused` is complete; else the
 * command's pid when `<journal>.pid` is complete; else a confirmation with no pid when the errors file
 * ends with its `exit=` line; undefined before any of them.
 */
export function readConfirmation(journal: string, errors: string): Confirmation | undefined {
	const refusal = readRefusal(`${journal}${HANDOFF_SUFFIX}${REFUSED_SUFFIX}`)
	if (refusal !== undefined) return { pid: undefined, refusal }
	const pid = readPid(`${journal}.pid`)
	if (pid !== undefined) return { pid, refusal: undefined }
	try {
		return TRAILER_PATTERN.test(readFileSync(errors, 'utf8'))
			? { pid: undefined, refusal: undefined }
			: undefined
	} catch {
		return undefined
	}
}

/**
 * Runs one bounded `powershell.exe` call with no shell.
 *
 * @param command - The fixed PowerShell text.
 * @param added - The variables that carry the call's values, merged by case-folded name.
 * @param timeout - The longest wait in milliseconds, after which the call is ended.
 * @returns The exit status, the output, and whether the bound ended the call.
 */
export function runPowerShell(
	command: string,
	added: Readonly<Record<string, string>>,
	timeout: number,
): PowerShellResult {
	const result = spawnSync(
		'powershell.exe',
		['-NoProfile', '-NonInteractive', '-Command', command],
		{
			encoding: 'utf8',
			windowsHide: true,
			timeout,
			env: buildEnvironment(process.env, added),
		},
	)
	const error: unknown = result.error
	return {
		status: result.status,
		stdout: typeof result.stdout === 'string' ? result.stdout : '',
		stderr: error instanceof Error ? error.message : String(result.stderr),
		timedOut: error instanceof Error && 'code' in error && error.code === 'ETIMEDOUT',
	}
}

/**
 * Reads a process's command line through WMI.
 *
 * @param pid - The process id.
 * @param timeout - The longest wait in milliseconds.
 * @returns The command line, or undefined when the process is gone, the call fails, or the bound ends.
 */
export function readCommandLine(pid: number, timeout: number): string | undefined {
	const result = runPowerShell(COMMAND_LINE_COMMAND, { [PID_VARIABLE]: String(pid) }, timeout)
	const line = result.stdout.trim()
	return result.status !== 0 || result.timedOut || line === '' ? undefined : line
}

/**
 * Kills a detached launcher's tree only when its command line names this run's record.
 *
 * @remarks
 * A pid the host reused names another command line, so the check keeps the kill on the launcher this
 * run created.
 *
 * @param pid - The id WMI returned for the launcher.
 * @param record - The absolute handoff record path.
 * @param timeout - The longest wait in milliseconds for the command line.
 * @returns True when the tree was killed; false when the command line does not name the record or
 * cannot be read, in which case nothing is killed.
 */
export function killLauncher(pid: number, record: string, timeout: number): boolean {
	const line = readCommandLine(pid, timeout)
	if (line === undefined || !matchesRecord(line, record)) return false
	forceKillTree(pid)
	return true
}

/**
 * Checks whether a command line names a handoff record as a whole argument.
 *
 * @param line - The command line a process was created with.
 * @param record - The absolute handoff record path.
 * @returns True when the record path stands between the line's start, a space, or a quote and the
 * line's end, a space, or a quote; false otherwise, so a path that only begins with the record
 * path does not match.
 * @example
 * ```ts
 * matchesRecord('"node" "launch.ts" "--handoff" "C:\\run.jsonl.handoff.json"', 'C:\\run.jsonl.handoff.json') // true
 * ```
 */
export function matchesRecord(line: string, record: string): boolean {
	const pattern = record.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
	return new RegExp(`(?:^|[\\s"])${pattern}(?:$|[\\s"])`, 'u').test(line)
}

/**
 * Writes the files a launch writes after its command ends, `exit=` last.
 *
 * @param closing - The texts and paths.
 * @param write - The writer. Default: {@link writeText}.
 */
export function writeClosing(closing: Closing, write: WriterFunction = writeText): void {
	if (closing.summary !== undefined) {
		write(`${closing.journal}.summary.json`, closing.summary, 'w')
	}
	if (closing.status !== undefined) {
		write(`${closing.journal}.status-after.txt`, closing.status, 'w')
	}
	write(closing.errors, closing.trailer, 'a')
}

/**
 * Writes one file's text.
 *
 * @param path - The file.
 * @param text - The text.
 * @param flag - `w` to replace the file, `a` to append to it.
 */
export function writeText(path: string, text: string, flag: 'w' | 'a'): void {
	writeFileSync(path, text, { flag })
}

/**
 * Checks whether two paths name one file.
 *
 * @remarks
 * The comparison is platform-defined: a Windows file system folds names by case, so both resolved
 * paths are case-folded there; any other host compares them as they resolve.
 *
 * @param left - One path, relative to the working directory or absolute.
 * @param right - The other path.
 * @param platform - The host platform, `process.platform` in a run.
 * @returns True when the resolved paths are equal under the host's folding; false otherwise.
 */
export function matchesSameFile(left: string, right: string, platform: string): boolean {
	const [first, second] = [resolvePath(left), resolvePath(right)]
	return platform === 'win32' ? first.toLowerCase() === second.toLowerCase() : first === second
}

/**
 * Waits for a detached start's confirmation on the directories that hold the journal and errors files.
 *
 * @param journal - The absolute journal path.
 * @param errors - The absolute errors path.
 * @param budget - The longest wait in milliseconds.
 * @returns The confirmation or the launcher's refusal, or undefined when the budget ends first or a
 * watch fails.
 */
export async function waitForConfirmation(
	journal: string,
	errors: string,
	budget: number,
): Promise<Confirmation | undefined> {
	const done = new AbortController()
	const timer = setTimeout(() => done.abort(), budget)
	try {
		for (const directory of new Set([dirname(journal), dirname(errors)])) {
			watch(directory, { signal: done.signal }, () => {
				if (readConfirmation(journal, errors) !== undefined) done.abort()
			}).on('error', () => done.abort())
		}
		if (readConfirmation(journal, errors) !== undefined) done.abort()
		if (!done.signal.aborted) await once(done.signal, 'abort')
		return readConfirmation(journal, errors)
	} finally {
		clearTimeout(timer)
		done.abort()
	}
}

/**
 * Runs one validated launch and records it.
 *
 * @param launch - The launch.
 * @returns The command's code, 124 when capped, 127 when it could not start.
 */
export async function runLaunch(launch: Launch): Promise<number> {
	const { journal, errors, status, placement } = launch
	const capMilliseconds = launch.cap > 0 ? computeCapMilliseconds(launch.cap) : undefined
	mkdirSync(dirname(journal), { recursive: true })
	mkdirSync(dirname(errors), { recursive: true })
	if (status)
		writeFileSync(`${journal}.status-before.txt`, readGitStatus(placement.cwd, placement.env))
	const journalFd = openSync(journal, 'w')
	const errorsFd = openSync(errors, 'w')
	rmSync(`${journal}.pid`, { force: true })
	if (launch.detached) rmSync(`${journal}.summary.json`, { force: true })
	const started = Date.now()
	const launched = startCommand(launch.command, launch.args, journalFd, errorsFd, placement)
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
	const summary = JSON.stringify({
		pid: child?.pid,
		exit: exit.error === undefined ? exit.code : 127,
		signal: exit.signal,
		capped,
		durationMs,
		journal,
		errors,
		error: exit.error,
	})
	writeClosing({
		journal,
		errors,
		summary: launch.detached ? `${summary}\n` : undefined,
		status: status ? readGitStatus(placement.cwd, placement.env) : undefined,
		trailer: `${exit.error === undefined ? '' : `launch: the command could not start: ${exit.error}\n`}\nexit=${exit.error === undefined ? (exit.code ?? 'null') : '127'} signal=${exit.signal ?? 'none'} capped=${capped} duration_ms=${durationMs}\n`,
	})
	console.log(summary)
	if (exit.error !== undefined) return 127
	return capped ? 124 : (exit.code ?? 1)
}

/**
 * Starts a launch outside this process's tree and waits for it to start its command.
 *
 * @remarks
 * The procedure is platform-defined: WMI's `Win32_Process` `Create` method is the detach that
 * `.agents/platforms/windows.md` records, and no other platform page records one. The record is
 * removed again on every refusal after it is written. The launcher writes `<journal>.launcher.pid`
 * itself; this caller only reads it.
 *
 * @param handoff - The validated record, its paths absolute.
 * @param platform - The host platform, `process.platform` in a run.
 * @param budget - The longest confirmation wait in milliseconds. Default: {@link HANDOFF_MS}.
 * @returns 0 when the command started or recorded that it could not; 69 on a host other than
 * Windows; 75 when a live launcher holds the journal, when PowerShell or `Create` fails or outlasts
 * {@link POWERSHELL_MS}, when the launcher refuses the record, or when the confirmation wait ends.
 */
export async function runDetach(
	handoff: Handoff,
	platform: string,
	budget = HANDOFF_MS,
): Promise<number> {
	const { journal, errors } = handoff
	if (platform !== 'win32') {
		console.error(
			`launch: --detach has no proven procedure on ${JSON.stringify(platform)}; .agents/platforms/posix.md § Processes records none, so run the command attached and keep the session in its turn`,
		)
		return 69
	}
	const launcherFile = `${journal}.launcher.pid`
	const earlier = readPid(launcherFile)
	if (earlier !== undefined && readRunning(earlier)) {
		console.error(
			`launch: the launcher ${String(earlier)} that ${JSON.stringify(launcherFile)} names still runs; stop its command through ${JSON.stringify(`${journal}.pid`)}, or name another journal`,
		)
		return 75
	}
	mkdirSync(dirname(journal), { recursive: true })
	mkdirSync(dirname(errors), { recursive: true })
	const record = `${journal}${HANDOFF_SUFFIX}`
	const refused = `${record}${REFUSED_SUFFIX}`
	for (const stale of [launcherFile, `${journal}.pid`, errors, refused]) {
		rmSync(stale, { force: true })
	}
	writeFileSync(record, JSON.stringify(handoff))
	const line = renderCommandLine([process.execPath, import.meta.filename, '--handoff', record])
	const result = runPowerShell(
		DETACH_COMMAND,
		{ [LINE_VARIABLE]: line, [DIRECTORY_VARIABLE]: handoff.cwd },
		POWERSHELL_MS,
	)
	const creation = result.status === 0 ? parseCreation(result.stdout) : undefined
	if (creation === undefined || creation.code !== 0 || creation.pid === undefined) {
		rmSync(record, { force: true })
		console.error(
			result.timedOut
				? `launch: PowerShell did not answer Win32_Process Create within ${String(POWERSHELL_MS)} ms and was ended; a launcher it started might be running. Read \`${journal}.launcher.pid\` and the errors file before you rerun, or run the command attached and keep the session in its turn`
				: creation === undefined
					? `launch: PowerShell could not run Win32_Process Create (exit ${String(result.status)}): ${JSON.stringify(result.stderr.trim().slice(0, 400))}; nothing started. Read that message, fix its cause, and rerun, or run the command attached and keep the session in its turn`
					: `launch: Win32_Process Create returned ReturnValue ${String(creation.code)}; nothing started. Read that return value in the WMI documentation of Create, fix its cause, such as a working directory that does not exist, and rerun, or run the command attached and keep the session in its turn`,
		)
		return 75
	}
	const confirmation = await waitForConfirmation(journal, errors, budget).catch(() => undefined)
	if (confirmation?.refusal !== undefined) {
		rmSync(refused, { force: true })
		rmSync(record, { force: true })
		console.error(
			`launch: the detached launcher ${String(creation.pid)} refused the handoff and ran nothing: ${confirmation.refusal}. Fix that cause and rerun`,
		)
		return 75
	}
	if (confirmation === undefined) {
		const killed = killLauncher(creation.pid, record, POWERSHELL_MS)
		const consumed = !existsSync(record)
		rmSync(record, { force: true })
		console.error(
			`launch: the detached launcher ${String(creation.pid)} wrote neither ${JSON.stringify(`${journal}.pid`)} nor an exit= line within ${String(budget)} ms; ${killed ? 'its tree was killed' : `its command line does not name ${JSON.stringify(record)} or cannot be read, so ${String(creation.pid)} was left alive`}; ${consumed ? 'it had read the handoff record' : 'it never read the handoff record'}. Read ${JSON.stringify(errors)} and ${JSON.stringify(launcherFile)}, then rerun`,
		)
		return 75
	}
	console.log(JSON.stringify({ launcher: creation.pid, pid: confirmation.pid, journal, errors }))
	return 0
}

/**
 * Refuses a handoff record and tells the waiting caller why.
 *
 * @remarks
 * The detached launcher's standard error reaches no reader, so the reason also goes to
 * `<record>.refused`, which the caller's confirmation wait reads. A directory that refuses the write
 * leaves the caller to its timeout.
 *
 * @param path - The record.
 * @param reason - The one-line reason.
 * @returns 75.
 */
export function refuseHandoff(path: string, reason: string): number {
	console.error(`launch: ${reason}`)
	try {
		writeFileSync(`${path}${REFUSED_SUFFIX}`, `${reason}\n`)
	} catch {}
	return 75
}

/**
 * Runs the launch a handoff record names: writes `<journal>.launcher.pid`, deletes the record, then
 * starts the command.
 *
 * @param path - The record, which must end in {@link HANDOFF_SUFFIX}.
 * @returns The launch's code; 75 when the path does not end in {@link HANDOFF_SUFFIX}, which writes
 * nothing, and when the record is missing or malformed or its launcher pid file or deletion fails,
 * which writes `<record>.refused`; in each case nothing runs and no journal is created.
 */
export async function runHandoff(path: string): Promise<number> {
	if (!path.endsWith(HANDOFF_SUFFIX)) {
		console.error(
			`launch: --handoff takes the <journal>${HANDOFF_SUFFIX} record that --detach writes, not ${JSON.stringify(path)}; nothing ran`,
		)
		return 75
	}
	const text = readHandoffText(path)
	if (text === undefined) {
		return refuseHandoff(
			path,
			`the handoff record ${JSON.stringify(path)} cannot be read; --detach writes it and its launcher reads it once, so start the run again with --detach; nothing ran`,
		)
	}
	const handoff = parseHandoff(text)
	if (handoff === undefined) {
		return refuseHandoff(
			path,
			`${JSON.stringify(path)} is not a handoff record: it must hold exactly ${HANDOFF_KEYS.join(', ')}, with absolute paths and a cap above 0; nothing ran`,
		)
	}
	try {
		writeFileSync(`${handoff.journal}.launcher.pid`, `${process.pid}\n`)
		rmSync(path)
	} catch (error) {
		return refuseHandoff(
			path,
			`the handoff record ${JSON.stringify(path)} cannot be deleted or its launcher pid file written (${error instanceof Error ? error.message : String(error)}); nothing ran`,
		)
	}
	const [command = '', ...args] = handoff.command
	return runLaunch({
		command,
		args,
		journal: handoff.journal,
		errors: handoff.errors,
		cap: handoff.cap,
		status: handoff.status,
		placement: { cwd: handoff.cwd, env: buildEnvironment(process.env, handoff.variables) },
		detached: true,
	})
}

/**
 * Reads a handoff record's text.
 *
 * @param path - The record.
 * @returns The text, or undefined when the file cannot be read.
 */
export function readHandoffText(path: string): string | undefined {
	try {
		return readFileSync(path, 'utf8')
	} catch {
		return undefined
	}
}

/**
 * Parses a handoff record's text.
 *
 * @param text - The record's text.
 * @returns The record, or undefined when the text is not JSON or fails {@link isHandoff}.
 */
export function parseHandoff(text: string): Handoff | undefined {
	try {
		const parsed: unknown = JSON.parse(text)
		return isHandoff(parsed) ? parsed : undefined
	} catch {
		return undefined
	}
}

/**
 * Runs the launcher on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code the opening comment names.
 */
export async function main(argv: readonly string[]): Promise<number> {
	const separator = argv.indexOf('--')
	const parsed = parseArguments(separator === -1 ? argv : argv.slice(0, separator))
	if (!parsed.success) {
		console.error(`launch: ${parsed.error}; ${USAGE}`)
		return 64
	}
	const { values } = parsed.value
	if (typeof values.handoff === 'string') {
		const others = Object.keys(values).filter(
			(name) => name !== 'handoff' && values[name] !== undefined,
		)
		if (separator !== -1 || others.length > 0) {
			console.error(
				`launch: --handoff takes no other flag and no \`--\`, not ${[...others.map((name) => `--${name}`), ...(separator === -1 ? [] : ['--'])].join(' ')}; ${USAGE}`,
			)
			return 64
		}
		return runHandoff(values.handoff)
	}
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
	if (matchesSameFile(journal, errors, process.platform)) {
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
	const names =
		typeof values.env === 'object'
			? values.env.flatMap((name) => (typeof name === 'string' ? [name] : []))
			: []
	if (values.detach !== true) {
		if (names.length > 0) {
			console.error(`launch: --env belongs to --detach, which hands the variable over; ${USAGE}`)
			return 64
		}
		return runLaunch({
			command,
			args,
			journal,
			errors,
			cap,
			status,
			placement: { cwd: undefined, env: undefined },
			detached: false,
		})
	}
	if (cap === 0) {
		console.error(
			`launch: --detach takes --cap above 0, because no session watches a detached run; ${USAGE}`,
		)
		return 64
	}
	const malformed = names.filter((name) => name === '' || name.includes('='))
	const unset = names.filter((name) => !malformed.includes(name) && process.env[name] === undefined)
	if (malformed.length > 0 || unset.length > 0) {
		console.error(
			`launch: --env takes the name of a variable this process sets, and a name holds no \`=\`; ${[...malformed.map((name) => `${JSON.stringify(name)} is no name`), ...unset.map((name) => `${JSON.stringify(name)} is unset`)].join(', ')}; ${USAGE}`,
		)
		return 64
	}
	const lane = process.env[LANE_VARIABLE] ?? ''
	if (lane !== '') {
		console.error(
			`launch: --detach refuses a run inside the lane ticket ${JSON.stringify(lane)} (${LANE_VARIABLE} is set): a detached run takes no ticket, so start it from the session, outside lane.ts`,
		)
		return 64
	}
	return runDetach(
		{
			command: [command, ...args],
			cwd: process.cwd(),
			cap,
			status,
			journal: resolvePath(journal),
			errors: resolvePath(errors),
			variables: collectVariables(names, process.env),
		},
		process.platform,
	)
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	main(process.argv.slice(2)).then((code) => {
		process.exitCode = code
	})
}

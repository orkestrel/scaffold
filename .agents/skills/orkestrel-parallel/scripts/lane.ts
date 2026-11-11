// Run process-running commands on this host in one heavy lane and several light lanes, in arrival
// order, across every checkout and shell of one user account. Run from the checkout root:
//   node .agents/skills/orkestrel-parallel/scripts/lane.ts --label NAME --journal PATH --errors PATH --cap SECONDS [--root DIR] [--solo] -- COMMAND [ARGS...]
//   node .agents/skills/orkestrel-parallel/scripts/lane.ts --status [--root DIR] [--json]
// A run takes a ticket, waits for its turn, runs the command through the dispatch skill's `launch`
// script, reads the process tree, and releases. The launcher owns the cap, the journal, and the
// errors file; its stdout lines pass through verbatim, and the cap must be above 0. The two forms are
// two operation modes, so `--status` with a run's flag (`--solo` included) or a bare `--` is refused,
// and `--json` belongs to `--status` alone. A run therefore cannot ask the launcher for its own
// `--status` files.
// Lanes: a ticket is heavy unless its arrival reads it light, and the reading is frozen in the
// ticket. A heavy ticket holds when it is the earliest live non-light ticket; a `--solo` ticket is
// heavy and also waits out every earlier light ticket. A light ticket holds when every earlier light
// ticket holds, no earlier `--solo` ticket is live, and the light holders' summed peaks with its own
// fit `slots` and each budget; the earliest light ticket always fits. A light holder runs at
// below-normal priority, and its holder ends it and exits 69 when a sample passes the memory or
// process threshold.
// Light reading: `<root>/limits.json` holds `slots`, the `budget` and the per-run `threshold`; while
// it is absent or malformed, or on a host other than Windows, every ticket is heavy, no sampler runs,
// and no record is written. Otherwise each holder samples its tree through one PowerShell child that
// exits when its stdin closes, and writes one record per run under `<root>/history/<key>/`, keyed by
// the working directory and the command, keeping the latest runs. The command's kind seeds the
// reading: a format check, a lint check, a type check, and a scoped test run read light until a
// record breaches; a full suite, a run of several projects, an install, a pack-and-install suite, a
// release chain, a journey, a study, a capture, and a live-service run read heavy; any other command reads light only when its latest runs each sit
// inside the threshold, none capped and none ending 69 or 70.
// `--status` prints each ticket in arrival order with its label, `live`, `dead`, or `unread`, its
// lane, and `holding` for a holder, and names the heavy holder and every light holder. It writes
// nothing, removes nothing, and creates no root; an absent root reads as an empty queue. The root is
// `.orkestrel/lane` under the account's home directory, read from the account record and never from
// an environment variable; `--root DIR` is for a proof. Bench execs stay outside the lane, because
// the host bound counts process-running commands.
// Exit: the launcher's code (the command's code, 124 when capped, 127 when the command could not
// start); 1 when a signal ended the launcher; 64 on usage; 69 when a light run passed its threshold
// and its holder ended it; 75 when the lane refused before the command ran; 70 when the command ran
// and its tree still reads as present, or its ticket could not be removed. `--status` exits 0 on a
// read and 75 when the root cannot be listed. A command that itself exits 64, 69, 70, or 75 reads
// like the lane's own code.
// Protocol: a process listens on an endpoint named by a random token, writes the complete ticket to
// `<token>.stage`, and hard-links that file to `<sequence>.ticket`, which publishes it in one step.
// A waiter parks on the `close` of each earlier ticket's endpoint it waits on with no timer, and a
// refused connect means that owner is gone. A waiter on a stage file writes one byte, and a published
// owner closes that connection, because a connection its synchronous allocation left unaccepted
// would otherwise stay parked on a process that waits behind it. A light waiter writes `h` to an
// earlier light ticket that did not hold yet, and that owner closes the connection when it holds,
// so the waiter decides again; a byte that reaches an owner that is releasing parks until it ends. The protocol stays 1: the `light` and `solo` ticket fields are
// optional, a ticket without them reads as heavy, and a process of the first release holds only as
// the earliest ticket.
// Limits:
// - Process-identifier reuse, Windows. A row is matched by id and creation date, bounded by a clock
//   comparison, so a reuse of an exited seed's id inside the clock allowance can misattribute a row.
//   Only the holder kills, and only inside its own bounds.
// - Process-identifier reuse, other hosts. A group id cannot be reused while the group has a member.
//   An empty group's id can be reused by a later group leader, so a reclaimer might refuse on a stale
//   run record. It never kills on one.
// - A descendant that detached itself. A process that left the group, a run started through the WMI
//   detach of `.agents/platforms/windows.md`, and a Windows descendant whose parent exited before the
//   reading and is no recorded seed are all outside every reading. A background child of a `bash`
//   command can be that case, so pass a command directly rather than through `bash -c`. "No surviving
//   process tree" means the group, or the parent-link closure, and no more.
// - An owner ended alone mid-run. No event reports a foreign tree's end. Arrivals exit 75 until that
//   tree is gone, and the next arrival then reclaims.
// - An owner ended between the run record and the launcher id. The tree cannot be identified. Arrivals
//   exit 75 until a person deletes the named files. An owner ended between the launcher id and the
//   command id leaves the command as no seed, so its tree reads through the launcher alone.
// - A dead light holder with a live tree. Light arrivals exit 75 until that tree is gone; heavy
//   arrivals do not wait on it.
// - Sampling. A process that lives between two samples goes uncounted, the CPU time of a member that
//   exits between samples is lost, and disk input and output are not measured.
// - An unreaped member. On a host whose init does not reap, a killed member can keep reading as
//   present. The lane exits 70 and stays held.
// - Listing completeness. No probe proves that a listing returns every stable entry. The design takes
//   it from the documented directory-read contract.
// - Queue scope. The queue is one per user account per host. A wiped root, a second account, or a
//   `--root` outside a proof gives a second queue that does not see the first.
// - A denied root. A sandbox that refuses the root or the endpoint exits 75; no sandboxed bench exec
//   has run this script.
// - Linux. Every non-Windows branch is unread on this host and needs a Linux run: the socket file, the
//   process group, and the signal handling.
// Migration stop: a second queue does not see the first, so while a host's sessions run another
// serializer, no caller moves. After a scaffold release carries this script and no command runs on the
// host, move every caller in one step and delete the serializer this replaces.
import type { ChildProcess } from 'node:child_process'
import type { Server, Socket } from 'node:net'
import { spawn, spawnSync } from 'node:child_process'
import { createHash, randomUUID } from 'node:crypto'
import {
	existsSync,
	linkSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	realpathSync,
	rmSync,
	writeFileSync,
} from 'node:fs'
import { connect, createServer } from 'node:net'
import { constants, hostname, setPriority, userInfo } from 'node:os'
import { basename, dirname, extname, isAbsolute, join } from 'node:path'
import { createInterface } from 'node:readline'
import { fileURLToPath } from 'node:url'

/** Holds the protocol version a ticket carries, so a process refuses a ticket it cannot read. */
export const PROTOCOL = 1

/** Lists the flags that take a value. */
export const VALUE_FLAGS: readonly string[] = [
	'--label',
	'--journal',
	'--errors',
	'--cap',
	'--root',
]

/** Lists the flags only a run reads, which `--status` refuses. */
export const RUN_FLAGS: readonly string[] = ['--label', '--journal', '--errors', '--cap', '--solo']

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = [...VALUE_FLAGS, '--status', '--json', '--solo']

/** Holds the usage line printed on a usage refusal. */
export const USAGE =
	'usage: lane.ts --label NAME --journal PATH --errors PATH --cap SECONDS [--root DIR] [--solo] -- COMMAND [ARGS...] | lane.ts --status [--root DIR] [--json]; the journal and the errors file differ, and the cap is a number of seconds above 0 up to 2147483'

/** Holds the longest cap in whole seconds, equal to the limit of the sibling launcher. */
export const MAX_CAP_SECONDS = 2_147_483

/** Holds the digit count of a ticket name, which keeps a directory listing readable in order. */
export const SEQUENCE_WIDTH = 12

/** Holds the byte a light waiter writes to an earlier light ticket that does not hold yet. */
export const HOLD_BYTE = 'h'

/** Holds the name ending of a stage file. */
export const STAGE_SUFFIX = '.stage'

/** Holds the name ending of a ticket. */
export const TICKET_SUFFIX = '.ticket'

/** Holds the name ending of a run record. */
export const RUN_SUFFIX = '.run'

/** Holds the name ending of a token's socket file on a host without named pipes. */
export const SOCKET_SUFFIX = '.sock'

/** Matches a token, which every endpoint name and stage file name is built from. */
export const TOKEN_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/u

/** Matches a ticket name and captures its sequence. */
export const TICKET_PATTERN = /^(\d+)\.ticket$/u

/** Matches one snapshot row: process id, parent id, and creation time in milliseconds. */
export const ROW_PATTERN = /^(\d+) (\d+) (\d+)$/u

/** Lists the signals that interrupt a lane on a host that delivers them. */
export const STOP_SIGNALS: readonly NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGHUP']

/**
 * Holds the clock allowance in milliseconds between `Date.now` and a process's creation date.
 *
 * @remarks
 * The allowance is one default clock tick of 15.625 ms, rounded up, in case the kernel stamps from
 * the tick.
 */
export const CLOCK_ALLOWANCE_MS = 16

/**
 * Holds the kill attempts the handover reading makes before it stays held.
 *
 * @remarks
 * Each attempt on Windows is a synchronous `taskkill` per member and a process snapshot. A member
 * that outlives this many forced kills is a defect a person reads rather than a wait the queue absorbs.
 */
export const KILL_BUDGET = 5

/** Holds the pause in milliseconds after a group signal, because no event reports a group's end. */
export const KILL_PAUSE_MS = 200

/**
 * Holds the removal retries, each `rmSync` delay growing by {@link REMOVAL_DELAY_MS}.
 *
 * @remarks
 * The retries outlast a scanner holding a file.
 */
export const REMOVAL_RETRIES = 10

/** Holds the base delay in milliseconds between removal retries. */
export const REMOVAL_DELAY_MS = 100

/** Holds the PowerShell text that prints one row per process with a creation date. */
export const SNAPSHOT_COMMAND =
	"Get-CimInstance Win32_Process -Property ProcessId,ParentProcessId,CreationDate | Where-Object { $_.CreationDate } | ForEach-Object { '{0} {1} {2}' -f $_.ProcessId, $_.ParentProcessId, ([DateTimeOffset]$_.CreationDate).ToUnixTimeMilliseconds() }"

/** Holds the name of the file under the root that holds the light lanes' limits. */
export const LIMITS_FILE = 'limits.json'

/** Holds the name of the directory under the root that holds each command's run records. */
export const HISTORY_DIRECTORY = 'history'

/** Holds the name ending of a run record under the history directory. */
export const OUTCOME_SUFFIX = '.json'

/** Holds the digit count of the end time that opens a record's name, which keeps a listing in time order. */
export const ENDED_WIDTH = 15

/** Holds the count of latest records the light reading takes, which is also the count each key keeps. */
export const RECENT_RUNS = 3

/** Holds the pause in milliseconds between two samples of a holder's tree. */
export const SAMPLE_MS = 1000

/** Holds the exit code of a light run its holder ended at a threshold. */
export const BREACH_CODE = 69

/** Holds the exit code of a run whose tree still reads as present at handover. */
export const HELD_CODE = 70

/** Holds the launcher's exit code at the cap. */
export const CAPPED_CODE = 124

/** Lists the words that seed a command heavy: a journey, a study, a capture, a live-service run, and a release chain. */
export const HEAVY_WORDS: readonly string[] = [
	'journey',
	'journeys',
	'study',
	'studies',
	'capture',
	'captures',
	'live',
	'prepublishonly',
]

/** Lists the package-manager verbs that seed a command heavy: an install, a full suite, and a publish. */
export const HEAVY_VERBS: readonly string[] = [
	'ci',
	'i',
	'install',
	'add',
	'update',
	'rebuild',
	'uninstall',
	'publish',
	'test',
	't',
]

/**
 * Lists the package scripts a seed reads heavy: the full suite, the aggregates that build and run
 * several projects, the pack-and-install suite, and the live-service suite.
 */
export const HEAVY_SCRIPTS: readonly string[] = [
	'test',
	'test:src',
	'test:app',
	'test:distribution',
	'test:service',
]

/** Lists the Vitest projects a seed reads heavy: the pack-and-install project and the live-service project. */
export const HEAVY_PROJECTS: readonly string[] = ['distribution', 'service']

/** Matches a dotted flag such as `--outputFile.json`, whose separate value a seed skips. */
export const DOTTED_FLAG = /^--[^=.]+\.[^=]+$/u

/** Lists the package managers whose verbs and scripts a seed reads. */
export const MANAGERS: readonly string[] = ['npm', 'pnpm', 'yarn', 'bun']

/** Lists the tools a seed reads heavy by name: the release chain's step runner. */
export const HEAVY_TOOLS: readonly string[] = ['steps']

/** Lists the Vitest flags that take a separate value, so a seed reads no flag value as a file. */
export const VITEST_VALUE_FLAGS: readonly string[] = [
	'--config',
	'-c',
	'--project',
	'--reporter',
	'--mode',
	'--root',
	'-r',
	'--dir',
	'--outputFile',
	'--pool',
	'--environment',
	'--shard',
	'--testNamePattern',
	'-t',
	'--bail',
	'--retry',
	'--maxWorkers',
	'--minWorkers',
	'--testTimeout',
	'--hookTimeout',
	'--exclude',
	'--include',
]

/** Matches a package script that runs a type check: `check`, `typecheck`, `check:<scope>`, or `<tool>:check`. */
export const CHECK_SCRIPT = /^(?:check|typecheck|type-check)(?::|$)|:check$/u

/** Matches a package script that runs one project's suite. */
export const SCOPED_SCRIPT = /^test:/u

/** Matches one sampler row: process id, parent id, creation time in milliseconds, CPU time in 100 ns units, and private bytes. */
export const GAUGE_PATTERN = /^(\d+) (\d+) (\d+) (\d+) (\d+)$/u

/** Holds the PowerShell text that prints one line of rows per sample until its stdin closes. */
export const SAMPLER_COMMAND = `$i=[Console]::OpenStandardInput();$b=New-Object byte[] 1;$t=$i.ReadAsync($b,0,1);while(-not $t.IsCompleted){$r=Get-CimInstance Win32_Process -Property ProcessId,ParentProcessId,CreationDate,KernelModeTime,UserModeTime,PrivatePageCount | Where-Object { $_.CreationDate } | ForEach-Object { '{0} {1} {2} {3} {4}' -f $_.ProcessId,$_.ParentProcessId,([DateTimeOffset]$_.CreationDate).ToUnixTimeMilliseconds(),($_.KernelModeTime+$_.UserModeTime),$_.PrivatePageCount };[Console]::Out.WriteLine($r -join ';');[Console]::Out.Flush();Start-Sleep -Milliseconds ${String(SAMPLE_MS)}}`

/** Describes the footprint the light lanes add up: average cores, peak private bytes, and peak processes. */
export interface Usage {
	readonly cores: number
	readonly memory: number
	readonly processes: number
}

/** Describes the per-run threshold of a light run: a footprint and a duration in milliseconds. */
export interface Threshold extends Usage {
	readonly duration: number
}

/** Describes `limits.json`: the light holders allowed at once, their summed budget, and the per-run threshold. */
export interface Limits {
	readonly slots: number
	readonly budget: Usage
	readonly threshold: Threshold
}

/** Describes one run's record: its duration and CPU time in milliseconds, its peaks, and its exit code. */
export interface Outcome {
	readonly duration: number
	readonly cpu: number
	readonly memory: number
	readonly processes: number
	readonly code: number
}

/** Names the lane a command's kind seeds. */
export type Seed = 'light' | 'heavy'

/** Describes one process in a sampler row: a snapshot row with its CPU time and private bytes. */
export interface Gauge extends Row {
	readonly cpu: number
	readonly memory: number
}

/** Describes what a sampler has read: each member's latest CPU time by id and creation date, and the peaks. */
export interface Tally {
	readonly cpu: ReadonlyMap<string, number>
	readonly memory: number
	readonly processes: number
}

/** Describes what a measured holder needs: the limits, the command's key, its token, and its light footprint, undefined for a heavy run. */
export interface Measure {
	readonly limits: Limits
	readonly key: string
	readonly token: string
	readonly light: Usage | undefined
}

/** Describes the complete record a stage file holds and a ticket publishes; `light` holds the footprint a light ticket counts. */
export interface Ticket {
	readonly protocol: number
	readonly token: string
	readonly label: string
	readonly pid: number
	readonly host: string
	readonly platform: string
	readonly cwd: string
	readonly arrived: string
	readonly light?: Usage
	readonly solo?: boolean
}

/** Describes one ticket in the queue: its sequence and its record, undefined when unreadable. */
export interface Entry {
	readonly sequence: number
	readonly ticket: Ticket | undefined
}

/** Describes the record of a started command: when it started and the ids that seed its tree. */
export interface Run {
	readonly started: number
	readonly launcher: number | undefined
	readonly command: number | undefined
}

/** Describes one process in a Windows snapshot. */
export interface Row {
	readonly pid: number
	readonly parent: number
	readonly created: number
}

/**
 * Describes what a process does next on the queue; a light waiter that parks on several earlier
 * tickets is `queued`, and `pending` names the earlier light tickets that did not hold yet.
 */
export type Turn =
	| { readonly state: 'holder' }
	| { readonly state: 'staged'; readonly name: string }
	| { readonly state: 'behind'; readonly entry: Entry }
	| {
			readonly state: 'queued'
			readonly entries: readonly Entry[]
			readonly pending: readonly number[]
	  }
	| { readonly state: 'refused'; readonly reason: string }

/** Describes what a sweep confirmed: whether the tree reads as gone, and the members it left. */
export interface Sweep {
	readonly gone: boolean
	readonly members: readonly number[]
}

/** Describes one ticket as `--status` reports it; `holding` marks a live ticket with a run record. */
export interface StatusRow {
	readonly sequence: number
	readonly label: string | undefined
	readonly pid: number | undefined
	readonly state: 'live' | 'dead' | 'unread'
	readonly light: boolean
	readonly solo: boolean
	readonly holding: boolean
}

/** Describes what `--status` reads: every ticket in arrival order and the heavy holder among them. */
export interface Status {
	readonly tickets: readonly StatusRow[]
	readonly holder: StatusRow | undefined
}

/** Describes one validated run. */
export interface LaneOptions {
	readonly root: string
	readonly label: string
	readonly journal: string
	readonly errors: string
	readonly cap: number
	readonly solo: boolean
	readonly command: readonly string[]
}

/**
 * Holds a process's endpoint, whose existence is the process's liveness.
 *
 * @remarks
 * The host closes the endpoint however the process ends. The server sends nothing. A stage waiter
 * writes one byte, and a published owner closes that connection on reading it; the connection of a
 * ticket waiter stays open until the process ends.
 */
export class Token {
	readonly #sockets = new Set<Socket>()
	readonly #waiters = new Set<Socket>()
	readonly #server: Server
	#published = false
	#holding = false

	constructor() {
		this.#server = createServer((socket) => this.#admit(socket))
	}

	/**
	 * Starts listening.
	 *
	 * @param endpoint - The endpoint to listen on.
	 * @returns A promise that resolves when the endpoint accepts connections, and rejects with the
	 * listen failure.
	 */
	listen(endpoint: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.#server.once('error', reject)
			this.#server.listen(endpoint, () => {
				this.#server.removeListener('error', reject)
				resolve()
			})
		})
	}

	/** Marks the stage as ended and closes every accepted connection, which wakes each waiter. */
	publish(): void {
		this.#published = true
		for (const socket of this.#sockets) socket.destroy()
	}

	/** Marks the process as a holder and closes every connection that waits for it to hold. */
	hold(): void {
		this.#holding = true
		for (const socket of this.#waiters) socket.destroy()
	}

	/** Marks the process as leaving, so a hold waiter that arrives later parks until the process ends. */
	leave(): void {
		this.#holding = false
	}

	/**
	 * Closes the endpoint and every connection.
	 *
	 * @returns A promise that resolves when the server has closed.
	 */
	destroy(): Promise<void> {
		for (const socket of this.#sockets) socket.destroy()
		return new Promise((resolve) => {
			this.#server.close(() => resolve())
		})
	}

	// Another byte after the publish comes from a stage waiter whose connection the allocation left unaccepted.
	#admit(socket: Socket): void {
		this.#sockets.add(socket)
		socket.on('error', () => undefined)
		socket.on('close', () => {
			this.#sockets.delete(socket)
			this.#waiters.delete(socket)
		})
		socket.on('data', (data: Buffer) => {
			if (!data.includes(HOLD_BYTE)) {
				if (this.#published) socket.destroy()
			} else if (this.#holding) {
				socket.destroy()
			} else {
				this.#waiters.add(socket)
			}
		})
	}
}

/**
 * Reads the value that follows a flag.
 *
 * @remarks
 * The first occurrence of a flag wins, a following value that opens with `--` is a missing value,
 * and the `--flag=value` form is not read.
 *
 * @param argv - The arguments before the bare `--`.
 * @param name - The flag, such as `--label`.
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
 * @param argv - The arguments before the bare `--`.
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
 * Reads the arguments that are neither a flag nor the value of a value flag.
 *
 * @param argv - The arguments before the bare `--`.
 * @param valueFlags - The flags that take a value.
 * @returns The positional arguments in order.
 */
export function readPositionals(
	argv: readonly string[],
	valueFlags: readonly string[],
): readonly string[] {
	return argv.filter(
		(argument, index) => !argument.startsWith('--') && !valueFlags.includes(argv[index - 1] ?? ''),
	)
}

/**
 * Quotes an untrusted text for a diagnostic, JSON-encoded and cut to a bounded length.
 *
 * @param text - The text to quote.
 * @returns The JSON string literal of the text, ending in an ellipsis inside the quotes when cut.
 */
export function quote(text: string): string {
	return JSON.stringify(text.length > 80 ? `${text.slice(0, 80)}…` : text)
}

/**
 * Reads the system error code a thrown value carries.
 *
 * @param error - The thrown value.
 * @returns The code, or the value's text when it carries none.
 */
export function readCode(error: unknown): string {
	return error instanceof Error && 'code' in error && typeof error.code === 'string'
		? error.code
		: String(error)
}

/**
 * Resolves the queue root.
 *
 * @remarks
 * `os.userInfo` reads the account record rather than `HOME`, `USERPROFILE`, or `TEMP`, so every
 * checkout and shell of one account resolves one directory.
 *
 * @param argument - The `--root` value, for a proof.
 * @returns The directory that holds the queue.
 */
export function resolveRoot(argument?: string): string {
	return argument ?? join(userInfo().homedir, '.orkestrel', 'lane')
}

/**
 * Resolves the sibling launcher from the running file, so a built twin spawns its `.js` sibling.
 *
 * @returns The path of the dispatch skill's `launch` script.
 */
export function resolveLauncher(): string {
	const self = fileURLToPath(import.meta.url)
	return join(dirname(self), '..', '..', 'orkestrel-dispatch', 'scripts', `launch${extname(self)}`)
}

/**
 * Renders the endpoint a token names.
 *
 * @remarks
 * The form is platform-defined: Windows has named pipes, and any other host takes a socket file
 * under the root. The Windows host closes a pipe with its process, and a socket file outlives its
 * process, so a reclaimer removes it.
 *
 * @param root - The queue root.
 * @param token - The token.
 * @returns The path `net.listen` and `net.connect` take.
 */
export function renderEndpoint(root: string, token: string): string {
	return process.platform === 'win32'
		? `\\\\.\\pipe\\orkestrel-lane-${token}`
		: join(root, `${token}${SOCKET_SUFFIX}`)
}

/**
 * Renders the name of a ticket.
 *
 * @param sequence - The ticket's sequence.
 * @returns The file name, at a fixed width.
 */
export function renderTicketName(sequence: number): string {
	return `${String(sequence).padStart(SEQUENCE_WIDTH, '0')}${TICKET_SUFFIX}`
}

/**
 * Renders the name of a run record.
 *
 * @param sequence - The ticket's sequence.
 * @returns The file name, at a fixed width.
 */
export function renderRunName(sequence: number): string {
	return `${String(sequence).padStart(SEQUENCE_WIDTH, '0')}${RUN_SUFFIX}`
}

/**
 * Lists a directory's names.
 *
 * @param root - The queue root.
 * @returns The names; empty when the directory is absent.
 */
export function readNames(root: string): readonly string[] {
	try {
		return readdirSync(root)
	} catch (error) {
		if (readCode(error) === 'ENOENT') return []
		throw error
	}
}

/**
 * Reads the sequences a listing holds.
 *
 * @param names - The directory's names.
 * @returns Each ticket's sequence, in no promised order.
 */
export function readSequences(names: readonly string[]): readonly number[] {
	return names.flatMap((name) => {
		const match = TICKET_PATTERN.exec(name)
		return match?.[1] === undefined ? [] : [Number(match[1])]
	})
}

/**
 * Checks whether a value is a ticket record.
 *
 * @param value - The parsed JSON value.
 * @returns True when every field has its type, each present optional field too, and the token has
 * the token's form; false otherwise.
 */
export function isTicket(value: unknown): value is Ticket {
	return (
		typeof value === 'object' &&
		value !== null &&
		'protocol' in value &&
		typeof value.protocol === 'number' &&
		'token' in value &&
		typeof value.token === 'string' &&
		TOKEN_PATTERN.test(value.token) &&
		'label' in value &&
		typeof value.label === 'string' &&
		'pid' in value &&
		typeof value.pid === 'number' &&
		'host' in value &&
		typeof value.host === 'string' &&
		'platform' in value &&
		typeof value.platform === 'string' &&
		'cwd' in value &&
		typeof value.cwd === 'string' &&
		'arrived' in value &&
		typeof value.arrived === 'string' &&
		(!('light' in value) || isUsage(value.light)) &&
		(!('solo' in value) || typeof value.solo === 'boolean')
	)
}

/**
 * Checks whether a value is a footprint.
 *
 * @param value - The parsed JSON value.
 * @returns True when `cores`, `memory`, and `processes` are finite numbers of at least 0; false
 * otherwise.
 */
export function isUsage(value: unknown): value is Usage {
	return (
		typeof value === 'object' &&
		value !== null &&
		'cores' in value &&
		isAmount(value.cores) &&
		'memory' in value &&
		isAmount(value.memory) &&
		'processes' in value &&
		isAmount(value.processes)
	)
}

/**
 * Checks whether a value is a finite number of at least 0.
 *
 * @param value - The value.
 * @returns True for a finite number of at least 0; false otherwise.
 */
export function isAmount(value: unknown): value is number {
	return typeof value === 'number' && Number.isFinite(value) && value >= 0
}

/**
 * Checks whether a value is the content of `limits.json`.
 *
 * @param value - The parsed JSON value.
 * @returns True when `slots` is an integer of at least 1, `budget` is a footprint, and `threshold` is
 * a footprint with a `duration`; false otherwise.
 */
export function isLimits(value: unknown): value is Limits {
	return (
		typeof value === 'object' &&
		value !== null &&
		'slots' in value &&
		Number.isSafeInteger(value.slots) &&
		typeof value.slots === 'number' &&
		value.slots >= 1 &&
		'budget' in value &&
		isUsage(value.budget) &&
		'threshold' in value &&
		isUsage(value.threshold) &&
		'duration' in value.threshold &&
		isAmount(value.threshold.duration)
	)
}

/**
 * Checks whether a value is a run's record.
 *
 * @param value - The parsed JSON value.
 * @returns True when the measures are finite numbers of at least 0 and `code` is an integer; false
 * otherwise.
 */
export function isOutcome(value: unknown): value is Outcome {
	return (
		typeof value === 'object' &&
		value !== null &&
		'duration' in value &&
		isAmount(value.duration) &&
		'cpu' in value &&
		isAmount(value.cpu) &&
		'memory' in value &&
		isAmount(value.memory) &&
		'processes' in value &&
		isAmount(value.processes) &&
		'code' in value &&
		Number.isSafeInteger(value.code)
	)
}

/**
 * Checks whether a value is a run record.
 *
 * @param value - The parsed JSON value.
 * @returns True when `started` is a number and each present id is a number; false otherwise.
 */
export function isRun(value: unknown): value is Run {
	return (
		typeof value === 'object' &&
		value !== null &&
		'started' in value &&
		typeof value.started === 'number' &&
		(!('launcher' in value) || typeof value.launcher === 'number') &&
		(!('command' in value) || typeof value.command === 'number')
	)
}

/**
 * Parses text as JSON.
 *
 * @param text - The text.
 * @returns The parsed value, or undefined when the text is not JSON.
 */
export function parseText(text: string): unknown {
	try {
		const parsed: unknown = JSON.parse(text)
		return parsed
	} catch {
		return undefined
	}
}

/**
 * Reads one queue entry.
 *
 * @param root - The queue root.
 * @param sequence - The ticket's sequence.
 * @returns The entry, its ticket undefined when the file is unreadable or malformed; empty when the
 * ticket is gone.
 */
export function readEntry(root: string, sequence: number): readonly Entry[] {
	try {
		const parsed = parseText(readFileSync(join(root, renderTicketName(sequence)), 'utf8'))
		return [{ sequence, ticket: isTicket(parsed) ? parsed : undefined }]
	} catch (error) {
		return readCode(error) === 'ENOENT' ? [] : [{ sequence, ticket: undefined }]
	}
}

/**
 * Orders entries by arrival.
 *
 * @param entries - The entries in any order.
 * @returns The entries by ascending sequence, which the exclusive link allocated.
 */
export function orderEntries(entries: readonly Entry[]): readonly Entry[] {
	return entries.toSorted((left, right) => left.sequence - right.sequence)
}

/**
 * Reads the queue in arrival order.
 *
 * @param root - The queue root.
 * @returns Every ticket that exists when it is read.
 */
export function readQueue(root: string): readonly Entry[] {
	return orderEntries(
		readSequences(readNames(root)).flatMap((sequence) => readEntry(root, sequence)),
	)
}

/**
 * Reads a run record.
 *
 * @param root - The queue root.
 * @param sequence - The ticket's sequence.
 * @returns The record; `absent` when no record exists; `unread` when it cannot be read as a record.
 */
export function readRun(root: string, sequence: number): Run | 'absent' | 'unread' {
	try {
		const parsed = parseText(readFileSync(join(root, renderRunName(sequence)), 'utf8'))
		return isRun(parsed)
			? {
					started: parsed.started,
					launcher: parsed.launcher,
					command: parsed.command,
				}
			: 'unread'
	} catch (error) {
		return readCode(error) === 'ENOENT' ? 'absent' : 'unread'
	}
}

/**
 * Writes a run record.
 *
 * @param root - The queue root.
 * @param sequence - The ticket's sequence.
 * @param run - The record.
 */
export function writeRun(root: string, sequence: number, run: Run): void {
	writeFileSync(join(root, renderRunName(sequence)), JSON.stringify(run))
}

/**
 * Removes a file inside the removal budget.
 *
 * @param path - The file; a file that is already gone is not an error.
 */
export function removeFile(path: string): void {
	rmSync(path, { force: true, maxRetries: REMOVAL_RETRIES, retryDelay: REMOVAL_DELAY_MS })
}

/**
 * Builds the ticket of this process.
 *
 * @param token - The process's token.
 * @param label - The run's label.
 * @param light - The footprint a light ticket counts, or undefined for a heavy ticket.
 * @param solo - If `true`, marks a ticket that waits out every earlier light ticket; if `false`, omits
 * the field.
 * @returns The complete ticket, carrying `light` and `solo` only when they are set.
 */
export function buildTicket(token: string, label: string, light?: Usage, solo = false): Ticket {
	return {
		protocol: PROTOCOL,
		token,
		label,
		pid: process.pid,
		host: hostname(),
		platform: process.platform,
		cwd: process.cwd(),
		arrived: new Date().toISOString(),
		...(light === undefined ? {} : { light }),
		...(solo ? { solo } : {}),
	}
}

/**
 * Reads `limits.json` under the root.
 *
 * @param root - The queue root.
 * @returns The limits; `absent` when the file does not exist; `unread` when it cannot be read as
 * limits.
 */
export function readLimits(root: string): Limits | 'absent' | 'unread' {
	try {
		const parsed = parseText(readFileSync(join(root, LIMITS_FILE), 'utf8'))
		return isLimits(parsed) ? parsed : 'unread'
	} catch (error) {
		return readCode(error) === 'ENOENT' ? 'absent' : 'unread'
	}
}

/**
 * Renders the key of a command's run records.
 *
 * @param cwd - The real working directory.
 * @param command - The command and its arguments.
 * @returns The hex sha256 of the directory and the arguments.
 */
export function renderKey(cwd: string, command: readonly string[]): string {
	return createHash('sha256')
		.update(JSON.stringify([cwd, ...command]))
		.digest('hex')
}

/**
 * Renders the name of a run's record.
 *
 * @param ended - When the run ended, in epoch milliseconds.
 * @param token - The run's token, which keeps two records of one key and one millisecond apart.
 * @returns The file name, opening with the end time at a fixed width.
 */
export function renderOutcomeName(ended: number, token: string): string {
	return `${String(ended).padStart(ENDED_WIDTH, '0')}-${token}${OUTCOME_SUFFIX}`
}

/**
 * Reads the names of a key's records, oldest first.
 *
 * @param root - The queue root.
 * @param key - The command's key.
 * @returns Every record name under the key, sorted by end time.
 */
export function readOutcomeNames(root: string, key: string): readonly string[] {
	return readNames(join(root, HISTORY_DIRECTORY, key))
		.filter((name) => name.endsWith(OUTCOME_SUFFIX))
		.toSorted()
}

/**
 * Reads a key's latest records.
 *
 * @param root - The queue root.
 * @param key - The command's key.
 * @returns Up to {@link RECENT_RUNS} records, oldest first, each undefined when it cannot be read as
 * a record; a record removed while it is read is skipped.
 */
export function readOutcomes(root: string, key: string): ReadonlyArray<Outcome | undefined> {
	return readOutcomeNames(root, key)
		.slice(-RECENT_RUNS)
		.flatMap((name) => {
			try {
				const parsed = parseText(readFileSync(join(root, HISTORY_DIRECTORY, key, name), 'utf8'))
				return [isOutcome(parsed) ? parsed : undefined]
			} catch (error) {
				return readCode(error) === 'ENOENT' ? [] : [undefined]
			}
		})
}

/**
 * Writes a run's record once and prunes its key to the latest {@link RECENT_RUNS} records.
 *
 * @param root - The queue root.
 * @param key - The command's key.
 * @param name - The record's name.
 * @param outcome - The record.
 */
export function writeOutcome(root: string, key: string, name: string, outcome: Outcome): void {
	const directory = join(root, HISTORY_DIRECTORY, key)
	mkdirSync(directory, { recursive: true })
	writeFileSync(join(directory, name), JSON.stringify(outcome), { flag: 'wx' })
	for (const stale of readOutcomeNames(root, key).slice(0, -RECENT_RUNS)) {
		removeFile(join(directory, stale))
	}
}

/**
 * Reads the average cores a run used.
 *
 * @param outcome - The run's record.
 * @returns The CPU time over the duration; 0 for a run of no duration.
 */
export function readCores(outcome: Outcome): number {
	return outcome.duration > 0 ? outcome.cpu / outcome.duration : 0
}

/**
 * Checks whether a run's record breaches the per-run threshold.
 *
 * @param outcome - The run's record, or undefined when it cannot be read.
 * @param threshold - The per-run threshold.
 * @returns True for an unreadable record, a capped run, an exit of 69 or 70, and a measure past the
 * threshold; false otherwise.
 */
export function isBreach(outcome: Outcome | undefined, threshold: Threshold): boolean {
	return (
		outcome === undefined ||
		outcome.code === CAPPED_CODE ||
		outcome.code === HELD_CODE ||
		outcome.code === BREACH_CODE ||
		outcome.duration > threshold.duration ||
		readCores(outcome) > threshold.cores ||
		outcome.memory > threshold.memory ||
		outcome.processes > threshold.processes
	)
}

/**
 * Reads the footprint a light ticket counts from its command's records.
 *
 * @param outcomes - The records, none of which breaches.
 * @returns The largest cores, memory, and process count across the records.
 */
export function measurePeak(outcomes: readonly Outcome[]): Usage {
	return {
		cores: Math.max(0, ...outcomes.map(readCores)),
		memory: Math.max(0, ...outcomes.map((outcome) => outcome.memory)),
		processes: Math.max(0, ...outcomes.map((outcome) => outcome.processes)),
	}
}

/**
 * Reads whether a command runs light, from its seed and its latest records.
 *
 * @remarks
 * A seeded heavy command is heavy whatever its records hold. A seeded light command is light until a
 * record breaches, and counts the threshold until {@link RECENT_RUNS} records exist. Any other
 * command is light only when {@link RECENT_RUNS} records exist and none breaches.
 *
 * @param seed - The lane the command's kind seeds, or undefined when no kind names it.
 * @param outcomes - The command's latest records.
 * @param limits - The limits.
 * @returns The footprint the ticket counts, or undefined when the command runs heavy.
 */
export function classifyLight(
	seed: Seed | undefined,
	outcomes: ReadonlyArray<Outcome | undefined>,
	limits: Limits,
): Usage | undefined {
	if (seed === 'heavy') return undefined
	const clean = outcomes.flatMap((outcome) =>
		outcome === undefined || isBreach(outcome, limits.threshold) ? [] : [outcome],
	)
	if (clean.length < outcomes.length) return undefined
	if (clean.length >= RECENT_RUNS) return measurePeak(clean)
	const { cores, memory, processes } = limits.threshold
	return seed === 'light' ? { cores, memory, processes } : undefined
}

/**
 * Checks whether light footprints fit the slots and every budget together.
 *
 * @param usages - The footprints of the light holders and the arrival.
 * @param limits - The limits.
 * @returns True when the count fits `slots` and each summed measure fits its budget; false otherwise.
 */
export function fitsBudget(usages: readonly Usage[], limits: Limits): boolean {
	const total = usages.reduce(
		(sum, usage) => ({
			cores: sum.cores + usage.cores,
			memory: sum.memory + usage.memory,
			processes: sum.processes + usage.processes,
		}),
		{ cores: 0, memory: 0, processes: 0 },
	)
	return (
		usages.length <= limits.slots &&
		total.cores <= limits.budget.cores &&
		total.memory <= limits.budget.memory &&
		total.processes <= limits.budget.processes
	)
}

/**
 * Splits a command into the words a seed reads.
 *
 * @remarks
 * An absolute path contributes its base name alone, so a checkout's location never seeds a command.
 *
 * @param args - The arguments after the executable.
 * @returns The lowercase alphanumeric words.
 */
export function readWords(args: readonly string[]): readonly string[] {
	return args.flatMap((argument) =>
		(isAbsolute(argument) ? basename(argument) : argument)
			.toLowerCase()
			.split(/[^a-z0-9]+/u)
			.filter((word) => word !== ''),
	)
}

/**
 * Reads a tool's name from an executable or script path.
 *
 * @param path - The path.
 * @returns The lowercase base name without its extension, `npm-cli` and `npx-cli` read as `npm` and
 * `npx`.
 */
export function readToolName(path: string): string {
	const name = basename(path.replaceAll('\\', '/'))
		.toLowerCase()
		.replace(/\.(?:exe|cmd|bat|ps1|js|mjs|cjs|ts|mts|cts)$/u, '')
	return name.replace(/-cli$/u, '')
}

/**
 * Reads the tool a command runs and the tool's arguments, past Node and `npx`.
 *
 * @param command - The command and its arguments.
 * @returns The tool's name followed by its arguments; empty for inline Node code or no script.
 */
export function readTool(command: readonly string[]): readonly string[] {
	const [executable, ...rest] = command
	if (executable === undefined) return []
	const name = readToolName(executable)
	if (name === 'node') {
		const script = rest.findIndex((argument) => !argument.startsWith('-'))
		const flags = script === -1 ? rest : rest.slice(0, script)
		if (script === -1 || flags.some((flag) => ['-e', '--eval', '-p', '--print'].includes(flag))) {
			return []
		}
		return readTool(rest.slice(script))
	}
	if (name === 'npx') {
		const tool = rest.findIndex((argument) => !argument.startsWith('-'))
		return tool === -1 ? [] : readTool(rest.slice(tool))
	}
	return [name, ...rest]
}

/**
 * Reads the positional arguments of a command, skipping each value of a value-taking flag.
 *
 * @param args - The arguments.
 * @param valueFlags - The flags that take a separate value.
 * @returns The arguments that are neither a flag nor the value of a listed or dotted flag.
 */
export function readOperands(
	args: readonly string[],
	valueFlags: readonly string[],
): readonly string[] {
	return args.filter(
		(argument, index) =>
			!argument.startsWith('-') &&
			!valueFlags.includes(args[index - 1] ?? '') &&
			!DOTTED_FLAG.test(args[index - 1] ?? ''),
	)
}

/**
 * Reads the lane a package script's name seeds.
 *
 * @param name - The script's name.
 * @returns `heavy` for a script {@link HEAVY_SCRIPTS} names, `light` for a type, format, or lint
 * check and any other `test:` suite, and undefined for any other script.
 */
export function readScriptSeed(name: string): Seed | undefined {
	if (HEAVY_SCRIPTS.includes(name)) return 'heavy'
	return CHECK_SCRIPT.test(name) || SCOPED_SCRIPT.test(name) ? 'light' : undefined
}

/**
 * Reads the lane a Vitest command seeds.
 *
 * @param args - The arguments after `vitest`.
 * @returns `heavy` for a run of every project, of several projects, or of a project
 * {@link HEAVY_PROJECTS} names; `light` for a run of named test files or one project; undefined for
 * any other run or mode.
 */
export function readVitestSeed(args: readonly string[]): Seed | undefined {
	const [mode, ...operands] = readOperands(args, VITEST_VALUE_FLAGS)
	if (mode !== 'run') return undefined
	const projects = args.flatMap((argument, index) => {
		if (argument.startsWith('--project=')) return [argument.slice('--project='.length)]
		return args[index - 1] === '--project' ? [argument] : []
	})
	if (projects.length > 1 || projects.some((project) => HEAVY_PROJECTS.includes(project))) {
		return 'heavy'
	}
	const files = operands.filter((operand) => /\.(?:test|spec)\./u.test(operand))
	if (files.length > 0 || projects.length === 1) return 'light'
	return projects.length === 0 && operands.length === 0 ? 'heavy' : undefined
}

/**
 * Reads the lane a command's kind seeds.
 *
 * @remarks
 * Heavy wins: a word that names a journey, a study, a capture, a live-service run, or the release
 * chain seeds heavy wherever it appears, before any light kind is read.
 *
 * @param command - The command and its arguments.
 * @returns The seeded lane, or undefined when no kind names the command.
 */
export function readSeed(command: readonly string[]): Seed | undefined {
	if (readWords(command.slice(1)).some((word) => HEAVY_WORDS.includes(word))) return 'heavy'
	const [tool, ...args] = readTool(command)
	if (tool === undefined) return undefined
	if (HEAVY_TOOLS.includes(tool)) return 'heavy'
	if (MANAGERS.includes(tool)) {
		const [verb, script] = readOperands(args, [])
		if (verb === undefined) return undefined
		if (HEAVY_VERBS.includes(verb)) return 'heavy'
		return (verb === 'run' || verb === 'run-script') && script !== undefined
			? readScriptSeed(script)
			: undefined
	}
	if (tool === 'vitest') return readVitestSeed(args)
	if (tool === 'oxfmt' || tool === 'prettier') return args.includes('--check') ? 'light' : undefined
	if (tool === 'oxlint' || tool === 'eslint') {
		return args.some((argument) => argument.startsWith('--fix')) ? undefined : 'light'
	}
	if (tool === 'tsc' || tool === 'vue-tsc') return args.includes('--noEmit') ? 'light' : undefined
	return undefined
}

/**
 * Writes the complete ticket to the stage file, which also marks this process as choosing.
 *
 * @param root - The queue root.
 * @param ticket - The ticket.
 */
export function writeStage(root: string, ticket: Ticket): void {
	writeFileSync(join(root, `${ticket.token}${STAGE_SUFFIX}`), JSON.stringify(ticket))
}

/**
 * Links a file to a name, reporting a name another process took.
 *
 * @param from - The existing file.
 * @param to - The name to take.
 * @returns True when this call took the name; false when the name exists. Thrown when the host
 * refuses the link for any other reason.
 */
export function tryLink(from: string, to: string): boolean {
	try {
		linkSync(from, to)
		return true
	} catch (error) {
		if (readCode(error) === 'EEXIST') return false
		throw error
	}
}

/**
 * Publishes a stage file as the next ticket in one step.
 *
 * @remarks
 * The sequence comes from a listing and the exclusive link, never from a clock, so tickets in one
 * millisecond cannot tie. A lost link lists again.
 *
 * @param root - The queue root.
 * @param token - The token that names the stage file.
 * @returns The sequence this process took.
 */
export function linkStage(root: string, token: string): number {
	const sequence = Math.max(0, ...readSequences(readNames(root))) + 1
	return tryLink(join(root, `${token}${STAGE_SUFFIX}`), join(root, renderTicketName(sequence)))
		? sequence
		: linkStage(root, token)
}

/**
 * Decides what a process with a ticket does next.
 *
 * @remarks
 * The two listings are separate, because one listing can miss both a ticket linked and a stage file
 * removed while it runs. A stage file absent from the first listing belongs to a process whose own
 * listing sees this ticket, or to a ticket the second listing sees.
 *
 * @param root - The queue root.
 * @param sequence - This process's sequence.
 * @param token - This process's token.
 * @param limits - The limits this process read at arrival, which a light ticket's admission needs.
 * @returns The holder state, the stage file to wait on, the earlier ticket or tickets to wait on, or
 * a refusal.
 */
export function decideTurn(root: string, sequence: number, token: string, limits?: Limits): Turn {
	const stage = readNames(root).find(
		(name) => name.endsWith(STAGE_SUFFIX) && name !== `${token}${STAGE_SUFFIX}`,
	)
	if (stage !== undefined) return { state: 'staged', name: stage }
	const entries = readQueue(root)
	const position = entries.findIndex((entry) => entry.sequence === sequence)
	if (position === -1) {
		return { state: 'refused', reason: `ticket ${renderTicketName(sequence)} is gone` }
	}
	const own = entries[position]?.ticket
	const earlier = entries.slice(0, position)
	return own?.light === undefined || limits === undefined
		? decideHeavy(earlier, own?.solo === true)
		: decideLight(root, earlier, own.light, limits)
}

/**
 * Decides what a heavy ticket does next.
 *
 * @remarks
 * A heavy ticket waits on the nearest earlier ticket that is not light, an unreadable one included. A
 * `--solo` ticket waits on the nearest earlier ticket of either lane, so it holds with no light
 * holder beside it.
 *
 * @param earlier - The tickets before this one, in arrival order.
 * @param solo - If `true`, waits on light tickets too; if `false`, passes them.
 * @returns The holder state or the ticket to wait on.
 */
export function decideHeavy(earlier: readonly Entry[], solo: boolean): Turn {
	const lower = earlier.findLast((entry) => solo || entry.ticket?.light === undefined)
	return lower === undefined ? { state: 'holder' } : { state: 'behind', entry: lower }
}

/**
 * Decides what a light ticket does next.
 *
 * @remarks
 * A light ticket holds when every earlier light ticket holds, no earlier `--solo` ticket remains, and
 * the earlier light footprints with its own fit the limits; the earliest light ticket always fits.
 * The rule reads only earlier tickets, which can only leave, so an admission is never revoked. An
 * earlier ticket this process cannot read is waited on alone, which refuses.
 *
 * @param root - The queue root.
 * @param earlier - The tickets before this one, in arrival order.
 * @param light - This ticket's footprint.
 * @param limits - The limits.
 * @returns The holder state, the unreadable ticket to wait on, or every earlier light and `--solo`
 * ticket to wait on at once, with the light tickets that do not hold yet.
 */
export function decideLight(
	root: string,
	earlier: readonly Entry[],
	light: Usage,
	limits: Limits,
): Turn {
	const unread = earlier.find(
		(entry) => entry.ticket === undefined || describeForeign(entry.ticket) !== undefined,
	)
	if (unread !== undefined) return { state: 'behind', entry: unread }
	const lights = earlier.filter((entry) => entry.ticket?.light !== undefined)
	const solos = earlier.filter((entry) => entry.ticket?.solo === true)
	const pending = lights.flatMap((entry) =>
		readRun(root, entry.sequence) === 'absent' ? [entry.sequence] : [],
	)
	const usages = lights.flatMap((entry) =>
		entry.ticket?.light === undefined ? [] : [entry.ticket.light],
	)
	const fits = usages.length === 0 || fitsBudget([...usages, light], limits)
	return solos.length === 0 && pending.length === 0 && fits
		? { state: 'holder' }
		: { state: 'queued', entries: orderEntries([...lights, ...solos]), pending }
}

/**
 * Connects to an endpoint and parks until the connection closes.
 *
 * @param endpoint - The endpoint.
 * @param stage - If `true`, writes the one byte a published owner closes the connection on; if
 * `false`, writes nothing.
 * @param parked - Called when the connection is open and the wait starts.
 * @param signal - Ends the wait and the connection when it aborts.
 * @param hold - If `true`, writes the byte a ticket closes the connection on when it holds; if
 * `false`, waits only for the process to end.
 * @returns The connect failure's code, or undefined after a connection opened and closed or the
 * signal aborted.
 */
export function parkOn(
	endpoint: string,
	stage: boolean,
	parked: () => void,
	signal?: AbortSignal,
	hold = false,
): Promise<string | undefined> {
	return new Promise((resolve) => {
		const socket = connect(endpoint)
		signal?.addEventListener('abort', () => {
			socket.destroy()
			resolve(undefined)
		})
		socket.once('error', (error) => resolve(readCode(error)))
		socket.once('connect', () => {
			socket.removeAllListeners('error')
			socket.on('error', () => undefined)
			socket.once('close', () => resolve(undefined))
			socket.resume()
			if (stage) socket.write('s')
			if (hold) socket.write(HOLD_BYTE)
			parked()
		})
	})
}

/**
 * Connects to an endpoint and leaves at once.
 *
 * @param endpoint - The endpoint.
 * @returns The connect failure's code, or undefined when the connection opened.
 */
export function probeEndpoint(endpoint: string): Promise<string | undefined> {
	return new Promise((resolve) => {
		const socket = connect(endpoint)
		socket.once('error', (error) => resolve(readCode(error)))
		socket.once('connect', () => {
			socket.destroy()
			resolve(undefined)
		})
	})
}

/**
 * Checks whether a connect failure means the endpoint's owner is gone.
 *
 * @remarks
 * A token is unique and its endpoint listens before any file names it, so only a refused connect on
 * that name reads as gone. A busy endpoint or any other failure proves nothing.
 *
 * @param code - The connect failure's code.
 * @returns True for `ENOENT` and `ECONNREFUSED`; false otherwise.
 */
export function isGone(code: string): boolean {
	return code === 'ENOENT' || code === 'ECONNREFUSED'
}

/**
 * Names what makes a ticket unreadable to this process.
 *
 * @param ticket - The ticket.
 * @returns A description of the differing protocol, host, or platform; undefined when it matches.
 */
export function describeForeign(ticket: Ticket): string | undefined {
	if (ticket.protocol !== PROTOCOL) return `protocol ${String(ticket.protocol)}`
	if (ticket.host !== hostname()) return `host ${quote(ticket.host)}`
	return ticket.platform === process.platform ? undefined : `platform ${quote(ticket.platform)}`
}

/**
 * Parses the snapshot's text.
 *
 * @param text - The snapshot's standard output.
 * @returns One row per line that has the row's form.
 */
export function parseRows(text: string): readonly Row[] {
	return text.split(/\r\n|\n/u).flatMap((line) => {
		const match = ROW_PATTERN.exec(line.trim())
		return match === null
			? []
			: [{ pid: Number(match[1]), parent: Number(match[2]), created: Number(match[3]) }]
	})
}

/**
 * Reads one snapshot of the host's processes.
 *
 * @returns The rows, or undefined when the snapshot cannot be read.
 */
export function readSnapshot(): readonly Row[] | undefined {
	const result = spawnSync(
		'powershell.exe',
		['-NoProfile', '-NonInteractive', '-Command', SNAPSHOT_COMMAND],
		{ encoding: 'utf8', windowsHide: true, maxBuffer: 64 * 1024 * 1024 },
	)
	const rows = result.status === 0 ? parseRows(result.stdout) : []
	return rows.length === 0 ? undefined : rows
}

/**
 * Selects the rows of one run's process tree from a snapshot.
 *
 * @remarks
 * A seed row inside the bounds is a member. A seed row outside them reused an exited seed's id and
 * is excluded with its children. An exited seed's child keeps the seed's id as its parent, so it
 * counts inside the bounds, and earlier than any row that reused the id. Below that, a row counts
 * when its creation date is no earlier than its parent's. A process whose parent exited and is no
 * seed is outside the reading.
 *
 * @param rows - The snapshot.
 * @param seeds - The launcher id and the command id.
 * @param floor - The earliest creation date a seed's tree can carry.
 * @param ceiling - The latest creation date a row of an exited seed can carry.
 * @returns The members.
 */
export function selectMembers<T extends Row>(
	rows: readonly T[],
	seeds: readonly number[],
	floor: number,
	ceiling: number,
): readonly T[] {
	const roots = seeds.flatMap((seed) => {
		const own = rows.find((row) => row.pid === seed)
		return own !== undefined && own.created >= floor && own.created <= ceiling
			? [own]
			: rows.filter(
					(row) =>
						row.parent === seed &&
						row.created >= floor &&
						row.created <= ceiling &&
						(own === undefined || row.created < own.created),
				)
	})
	const members = new Map(roots.map((row) => [row.pid, row]))
	for (const member of members.values()) {
		for (const row of rows) {
			if (row.parent === member.pid && row.created >= member.created && !members.has(row.pid)) {
				members.set(row.pid, row)
			}
		}
	}
	return [...members.values()]
}

/**
 * Reads whether a process group still has a member.
 *
 * @param group - The group id.
 * @returns The group id while the host reports the group; empty when it reports none.
 */
export function readGroup(group: number): readonly number[] {
	try {
		process.kill(-group, 0)
		return [group]
	} catch (error) {
		return readCode(error) === 'ESRCH' ? [] : [group]
	}
}

/**
 * Reads the members of one run's process tree.
 *
 * @remarks
 * The reading is platform-defined: Windows has no process group a descendant inherits, so it reads
 * parent links, and any other host reads the launcher's group.
 *
 * @param run - The run record.
 * @param ceiling - The latest creation date a row of an exited seed can carry.
 * @returns The ids to kill, or undefined when the tree cannot be read.
 */
export function readTree(run: Run, ceiling: number): readonly number[] | undefined {
	if (run.launcher === undefined) return undefined
	if (process.platform !== 'win32') return readGroup(run.launcher)
	const rows = readSnapshot()
	return rows === undefined
		? undefined
		: selectMembers(
				rows,
				run.command === undefined ? [run.launcher] : [run.launcher, run.command],
				run.started - CLOCK_ALLOWANCE_MS,
				ceiling,
			).map((row) => row.pid)
}

/**
 * Kills each listed member.
 *
 * @remarks
 * The kill is platform-defined: Windows ends a process by id with `taskkill`, whose `/T` ends
 * nothing under a root that exited, so each member takes its own kill. Any other host signals the
 * group, and a pause follows, because no event reports the end of a foreign group.
 *
 * @param members - The ids a reading returned.
 */
export function killMembers(members: readonly number[]): void {
	for (const member of members) {
		if (process.platform === 'win32') {
			spawnSync('taskkill', ['/pid', String(member), '/T', '/F'], {
				stdio: 'ignore',
				windowsHide: true,
			})
		} else {
			try {
				process.kill(-member, 'SIGKILL')
			} catch {}
			Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, KILL_PAUSE_MS)
		}
	}
}

/**
 * Reads a tree, kills what it lists, and reads again, inside a bounded budget.
 *
 * @param read - Takes one reading; undefined means the tree cannot be read.
 * @param kill - Kills what a reading listed.
 * @param budget - The kills left.
 * @returns Gone only after a reading lists no member; otherwise the members the last reading listed.
 */
export function sweepTree(
	read: () => readonly number[] | undefined,
	kill: (members: readonly number[]) => void,
	budget: number,
): Sweep {
	const members = read()
	if (members === undefined) return { gone: false, members: [] }
	if (members.length === 0) return { gone: true, members }
	if (budget <= 0) return { gone: false, members }
	kill(members)
	return sweepTree(read, kill, budget - 1)
}

/**
 * Reclaims the ticket of an owner whose endpoint refused a connect.
 *
 * @remarks
 * A reclaimer never kills, because the parallel skill forbids ending another session's process.
 *
 * @param root - The queue root.
 * @param sequence - The dead ticket's sequence.
 * @param ticket - The dead ticket.
 * @returns The refusal when the owner's tree reads as present or cannot be identified; undefined
 * after the ticket and its files are removed.
 */
export function reclaimTicket(root: string, sequence: number, ticket: Ticket): string | undefined {
	const run = readRun(root, sequence)
	const files = `${renderTicketName(sequence)} and ${renderRunName(sequence)} under ${root}`
	if (run === 'unread' || (run !== 'absent' && run.launcher === undefined)) {
		return `the owner of ${quote(ticket.label)} (pid ${String(ticket.pid)}) ended before its tree could be identified; end its tree, then delete ${files}`
	}
	if (run !== 'absent') {
		const members = readTree(run, Date.now())
		if (members === undefined || members.length > 0) {
			return `the owner of ${quote(ticket.label)} (pid ${String(ticket.pid)}) is gone and its tree reads as ${members === undefined ? 'unread' : `present: ${members.join(', ')}`}; launcher ${String(run.launcher)}, command ${String(run.command)}, files ${files}`
		}
		removeFile(join(root, renderRunName(sequence)))
	}
	removeFile(join(root, renderTicketName(sequence)))
	removeFile(join(root, `${ticket.token}${SOCKET_SUFFIX}`))
	return undefined
}

/**
 * Waits on one stage file and removes it when its owner is gone.
 *
 * @param root - The queue root.
 * @param name - The stage file's name.
 * @returns The refusal, or undefined when the stage ended.
 */
export async function waitOnStage(root: string, name: string): Promise<string | undefined> {
	const token = name.slice(0, -STAGE_SUFFIX.length)
	if (!TOKEN_PATTERN.test(token)) return `stage file ${quote(name)} under ${root} names no token`
	const code = await parkOn(renderEndpoint(root, token), true, () =>
		console.error('lane: waiting behind an arrival'),
	)
	if (code === undefined) return undefined
	if (!isGone(code)) return `the endpoint of ${quote(name)} reported ${code}`
	removeFile(join(root, name))
	removeFile(join(root, `${token}${SOCKET_SUFFIX}`))
	return undefined
}

/**
 * Waits on the nearest earlier ticket and reclaims it when its owner is gone.
 *
 * @param root - The queue root.
 * @param entry - The earlier ticket.
 * @param announced - The token this process last printed a waiting line for.
 * @returns The refusal, or undefined when the wait ended.
 */
export async function waitOnTicket(
	root: string,
	entry: Entry,
	announced: string | undefined,
): Promise<string | undefined> {
	const name = renderTicketName(entry.sequence)
	const ticket = entry.ticket
	if (ticket === undefined) return `ticket ${name} under ${root} cannot be read`
	const foreign = describeForeign(ticket)
	if (foreign !== undefined) return `ticket ${name} under ${root} carries ${foreign}`
	const code = await parkOn(renderEndpoint(root, ticket.token), false, () => {
		if (announced !== ticket.token) console.error(`lane: waiting behind ${quote(ticket.label)}`)
	})
	if (code === undefined) return undefined
	return isGone(code)
		? reclaimTicket(root, entry.sequence, ticket)
		: `the endpoint of ticket ${name} reported ${code}`
}

/**
 * Waits on several earlier tickets at once, until the first leaves or a pending one holds, and
 * reclaims a ticket whose owner is gone.
 *
 * @param root - The queue root.
 * @param entries - The earlier tickets, each readable and of this host.
 * @param pending - The sequences of the light tickets among them that did not hold yet, whose hold
 * also ends the wait.
 * @param announced - The tokens this process last printed a waiting line for, joined by commas.
 * @returns The refusal, or undefined when the wait ended.
 */
export async function waitOnTickets(
	root: string,
	entries: readonly Entry[],
	pending: readonly number[],
	announced: string | undefined,
): Promise<string | undefined> {
	const tickets = entries.flatMap((entry) =>
		entry.ticket === undefined ? [] : [{ sequence: entry.sequence, ticket: entry.ticket }],
	)
	const key = tickets.map((item) => item.ticket.token).join(',')
	const controller = new AbortController()
	const opened = tickets.map(() => Promise.withResolvers<void>())
	const waits = tickets.map((item, index) =>
		parkOn(
			renderEndpoint(root, item.ticket.token),
			false,
			() => opened[index]?.resolve(),
			controller.signal,
			pending.includes(item.sequence),
		).then((code) => ({ ...item, code })),
	)
	void Promise.all(opened.map((resolvers) => resolvers.promise)).then(() => {
		if (announced !== key && !controller.signal.aborted) {
			console.error(
				`lane: waiting behind ${tickets.map((item) => quote(item.ticket.label)).join(', ')}`,
			)
		}
	})
	const first = await Promise.race(waits)
	controller.abort()
	if (first.code === undefined) return undefined
	return isGone(first.code)
		? reclaimTicket(root, first.sequence, first.ticket)
		: `the endpoint of ticket ${renderTicketName(first.sequence)} reported ${first.code}`
}

/**
 * Waits for this process's turn, parked on events with no timer.
 *
 * @param root - The queue root.
 * @param sequence - This process's sequence.
 * @param token - This process's token.
 * @param limits - The limits this process read at arrival.
 * @param announced - The token or tokens this process last printed a waiting line for.
 * @returns The refusal, or undefined when this process holds the lane.
 */
export async function waitForTurn(
	root: string,
	sequence: number,
	token: string,
	limits: Limits | undefined,
	announced?: string,
): Promise<string | undefined> {
	const turn = decideTurn(root, sequence, token, limits)
	if (turn.state === 'holder') return undefined
	if (turn.state === 'refused') return turn.reason
	if (turn.state === 'queued') {
		const refusal = await waitOnTickets(root, turn.entries, turn.pending, announced)
		if (refusal !== undefined) return refusal
		const key = turn.entries.map((entry) => entry.ticket?.token).join(',')
		return waitForTurn(root, sequence, token, limits, key)
	}
	const refusal =
		turn.state === 'staged'
			? await waitOnStage(root, turn.name)
			: await waitOnTicket(root, turn.entry, announced)
	if (refusal !== undefined) return refusal
	return waitForTurn(
		root,
		sequence,
		token,
		limits,
		turn.state === 'behind' ? turn.entry.ticket?.token : announced,
	)
}

/**
 * Reads the command id from a launcher line.
 *
 * @param line - One line of the launcher's stdout.
 * @returns The pid of the spawn line; undefined for any other line.
 */
export function readCommandId(line: string): number | undefined {
	const parsed = parseText(line)
	return typeof parsed === 'object' &&
		parsed !== null &&
		'pid' in parsed &&
		typeof parsed.pid === 'number' &&
		!('exit' in parsed)
		? parsed.pid
		: undefined
}

/**
 * Registers a handler on every stop signal, on a host that delivers them.
 *
 * @remarks
 * Windows runs no signal handler for a forced kill, so an ended lane process there is the reclaim
 * case.
 *
 * @param handler - The handler.
 * @returns The call that removes the handler.
 */
export function watchSignals(handler: () => void): () => void {
	if (process.platform === 'win32') return () => undefined
	for (const signal of STOP_SIGNALS) process.on(signal, handler)
	return () => {
		for (const signal of STOP_SIGNALS) process.removeListener(signal, handler)
	}
}

/**
 * Starts the sibling launcher.
 *
 * @remarks
 * A host other than Windows starts it as a group leader, so the launcher's id is the group a
 * handover reads.
 *
 * @param launcher - The launcher's path.
 * @param options - The run.
 * @returns The started launcher.
 */
export function startLauncher(launcher: string, options: LaneOptions): ChildProcess {
	return spawn(
		process.execPath,
		[
			launcher,
			'--journal',
			options.journal,
			'--errors',
			options.errors,
			'--cap',
			String(options.cap),
			'--',
			...options.command,
		],
		{
			stdio: ['ignore', 'pipe', 'inherit'],
			windowsHide: true,
			detached: process.platform !== 'win32',
		},
	)
}

/**
 * Waits for a started launcher to close.
 *
 * @param child - The started launcher.
 * @returns Its exit code, or undefined when a signal ended it or it could not start.
 */
export function waitForClose(child: ChildProcess): Promise<number | undefined> {
	return new Promise((resolve) => {
		child.once('error', () => resolve(undefined))
		child.once('close', (code) => resolve(code ?? undefined))
	})
}

/**
 * Writes a run record, leaving an unwritten id to the handover reading.
 *
 * @param root - The queue root.
 * @param sequence - The ticket's sequence.
 * @param run - The record.
 * @returns True when the record was written; false otherwise.
 */
export function tryWriteRun(root: string, sequence: number, run: Run): boolean {
	try {
		writeRun(root, sequence, run)
		return true
	} catch {
		return false
	}
}

/**
 * Removes a holder's run record and ticket.
 *
 * @param root - The queue root.
 * @param sequence - The ticket's sequence.
 * @returns The host's refusal when the removal budget ended; undefined after both are gone.
 */
export function releaseTicket(root: string, sequence: number): string | undefined {
	try {
		removeFile(join(root, renderRunName(sequence)))
		removeFile(join(root, renderTicketName(sequence)))
		return undefined
	} catch (error) {
		return readCode(error)
	}
}

/**
 * Parses one sampler line.
 *
 * @param line - One line of the sampler's stdout, its rows separated by semicolons.
 * @returns One gauge per row that has the row's form, its CPU time in milliseconds.
 */
export function parseGauges(line: string): readonly Gauge[] {
	return line.split(';').flatMap((item) => {
		const match = GAUGE_PATTERN.exec(item.trim())
		return match === null
			? []
			: [
					{
						pid: Number(match[1]),
						parent: Number(match[2]),
						created: Number(match[3]),
						cpu: Number(match[4]) / 10_000,
						memory: Number(match[5]),
					},
				]
	})
}

/**
 * Folds one sample's members into a tally.
 *
 * @param tally - The tally so far.
 * @param members - The members one sample read.
 * @returns The tally with each member's latest CPU time, keyed by id and creation date, and the
 * larger of each peak.
 */
export function tallySample(tally: Tally, members: readonly Gauge[]): Tally {
	return {
		cpu: new Map([
			...tally.cpu,
			...members.map((member): [string, number] => {
				const key = `${String(member.pid)}:${String(member.created)}`
				return [key, Math.max(member.cpu, tally.cpu.get(key) ?? 0)]
			}),
		]),
		memory: Math.max(
			tally.memory,
			members.reduce((sum, member) => sum + member.memory, 0),
		),
		processes: Math.max(tally.processes, members.length),
	}
}

/**
 * Builds a run's record from its tally.
 *
 * @param tally - The sampler's tally.
 * @param duration - The run's duration in milliseconds.
 * @param code - The lane's exit code for the run.
 * @returns The record, its CPU time summed across every member the samples read.
 */
export function buildOutcome(tally: Tally, duration: number, code: number): Outcome {
	return {
		duration,
		cpu: [...tally.cpu.values()].reduce((sum, value) => sum + value, 0),
		memory: tally.memory,
		processes: tally.processes,
		code,
	}
}

/**
 * Sets a process to below-normal priority, which a Windows child inherits.
 *
 * @param pid - The process id.
 * @returns True when the host took the priority; false when it refused.
 */
export function lowerPriority(pid: number): boolean {
	try {
		setPriority(pid, constants.priority.PRIORITY_BELOW_NORMAL)
		return true
	} catch {
		return false
	}
}

/**
 * Writes a run's record, leaving a write the host refuses unrecorded.
 *
 * @param root - The queue root.
 * @param key - The command's key.
 * @param name - The record's name.
 * @param outcome - The record.
 * @returns True when the record was written; false otherwise.
 */
export function tryWriteOutcome(
	root: string,
	key: string,
	name: string,
	outcome: Outcome,
): boolean {
	try {
		writeOutcome(root, key, name, outcome)
		return true
	} catch {
		return false
	}
}

/**
 * Samples one holder's process tree through one PowerShell child at below-normal priority.
 *
 * @remarks
 * The child exits when its stdin closes, which {@link Sampler.stop} and the end of this process both
 * do. A threshold, given for a light run, calls the breach handler once, on the first sample whose
 * memory or process count passes it.
 */
export class Sampler {
	readonly #child: ChildProcess
	readonly #closed: Promise<void>
	readonly #floor: number
	readonly #threshold: Usage | undefined
	readonly #breach: () => void
	#seeds: readonly number[] = []
	#tally: Tally = { cpu: new Map(), memory: 0, processes: 0 }
	#breached = false

	/**
	 * Starts the sampler.
	 *
	 * @param floor - The earliest creation date the tree can carry.
	 * @param threshold - The light run's threshold, or undefined for a heavy run.
	 * @param breach - Called once when a sample passes the threshold.
	 */
	constructor(floor: number, threshold: Usage | undefined, breach: () => void) {
		this.#floor = floor
		this.#threshold = threshold
		this.#breach = breach
		this.#child = spawn(
			'powershell.exe',
			['-NoProfile', '-NonInteractive', '-Command', SAMPLER_COMMAND],
			{ stdio: ['pipe', 'pipe', 'ignore'], windowsHide: true },
		)
		this.#closed = waitForClose(this.#child).then(() => undefined)
		this.#child.stdin?.on('error', () => undefined)
		if (this.#child.pid !== undefined) lowerPriority(this.#child.pid)
		if (this.#child.stdout !== null) {
			const lines = createInterface({ input: this.#child.stdout, crlfDelay: Infinity })
			lines.on('error', () => undefined)
			lines.on('line', (line) => this.#read(line))
		}
	}

	/** Holds the sampler's process id, undefined when it could not start. */
	get pid(): number | undefined {
		return this.#child.pid
	}

	/** Holds what the samples read so far. */
	get tally(): Tally {
		return this.#tally
	}

	/** Holds whether a sample passed the threshold. */
	get breached(): boolean {
		return this.#breached
	}

	/**
	 * Names the ids whose trees later samples read.
	 *
	 * @param seeds - The launcher id and, once known, the command id.
	 */
	seed(seeds: readonly number[]): void {
		this.#seeds = seeds
	}

	/**
	 * Closes the sampler's stdin, which ends it.
	 *
	 * @returns A promise that resolves when the sampler has exited.
	 */
	stop(): Promise<void> {
		this.#child.stdin?.end()
		return this.#closed
	}

	#read(line: string): void {
		const members = selectMembers(parseGauges(line), this.#seeds, this.#floor, Date.now())
		this.#tally = tallySample(this.#tally, members)
		const threshold = this.#threshold
		if (
			threshold === undefined ||
			this.#breached ||
			(this.#tally.memory <= threshold.memory && this.#tally.processes <= threshold.processes)
		) {
			return
		}
		this.#breached = true
		this.#breach()
	}
}

/**
 * Runs the command as the holder, reads the tree at handover, and releases.
 *
 * @remarks
 * A measured holder samples its tree and writes the run's record before it releases, so the
 * command's next arrival reads it. A light holder lowers its own priority before the spawn, and ends
 * its tree when a sample passes the threshold.
 *
 * @param options - The run.
 * @param launcher - The launcher's path.
 * @param sequence - This process's sequence.
 * @param measure - What a measured holder needs, or undefined when no limits apply.
 * @param token - This process's endpoint, which holds after the run record exists and leaves before
 * the run record is removed.
 * @returns The launcher's code; 1 when a signal ended it; 69 when a light run passed its threshold;
 * 70 when the tree still reads as present or the ticket could not be removed; 75 when the launcher
 * could not start or the priority could not be lowered.
 */
export async function runHolder(
	options: LaneOptions,
	launcher: string,
	sequence: number,
	measure?: Measure,
	token?: Token,
): Promise<number> {
	const { root } = options
	if (measure?.light !== undefined && !lowerPriority(process.pid)) {
		releaseTicket(root, sequence)
		console.error('lane: the host refused the light run its below-normal priority')
		return 75
	}
	const started = Date.now()
	writeRun(root, sequence, { started, launcher: undefined, command: undefined })
	token?.hold()
	const child = startLauncher(launcher, options)
	const id = child.pid
	if (id === undefined) {
		releaseTicket(root, sequence)
		console.error(`lane: ${quote(launcher)} could not start`)
		return 75
	}
	tryWriteRun(root, sequence, { started, launcher: id, command: undefined })
	const sampler =
		measure === undefined
			? undefined
			: new Sampler(
					started - CLOCK_ALLOWANCE_MS,
					measure.light === undefined ? undefined : measure.limits.threshold,
					() => killMembers([id]),
				)
	sampler?.seed([id])
	const unwatch = watchSignals(() => killMembers([id]))
	const closed = waitForClose(child)
	if (child.stdout !== null) {
		const lines = createInterface({ input: child.stdout, crlfDelay: Infinity })
		lines.on('error', () => undefined)
		lines.on('line', (line) => {
			console.log(line)
			const command = readCommandId(line)
			if (command === undefined) return
			tryWriteRun(root, sequence, { started, launcher: id, command })
			sampler?.seed([id, command])
		})
	}
	const code = await closed
	unwatch()
	const ended = Date.now()
	const stopped = sampler?.stop()
	const run = readRun(root, sequence)
	const sweep =
		run === 'absent' || run === 'unread'
			? { gone: false, members: [] }
			: sweepTree(() => readTree(run, ended), killMembers, KILL_BUDGET)
	const breached = sampler?.breached === true
	const result = !sweep.gone ? HELD_CODE : breached ? BREACH_CODE : (code ?? 1)
	if (measure !== undefined && sampler !== undefined) {
		tryWriteOutcome(
			root,
			measure.key,
			renderOutcomeName(ended, measure.token),
			buildOutcome(sampler.tally, ended - started, result),
		)
	}
	if (!sweep.gone) {
		console.error(
			`lane: the tree of ${quote(options.label)} still reads as ${sweep.members.length === 0 ? 'unread' : `present: ${sweep.members.join(', ')}`}; the lane stays held by ${renderTicketName(sequence)} and ${renderRunName(sequence)} under ${root}`,
		)
		await stopped
		return HELD_CODE
	}
	token?.leave()
	const refusal = releaseTicket(root, sequence)
	await stopped
	if (refusal !== undefined) {
		console.error(`lane: removing ${renderTicketName(sequence)} reported ${refusal}`)
		return HELD_CODE
	}
	if (breached) {
		console.error(
			`lane: ${quote(options.label)} passed the light threshold and was ended; its next arrival runs heavy`,
		)
	}
	return result
}

/**
 * Reads what a run measures at arrival: the limits, the command's key, and its light footprint.
 *
 * @remarks
 * A host other than Windows has no sampler, so it measures nothing and every ticket there is heavy.
 * A `--solo` run is heavy whatever its command reads.
 *
 * @param options - The run.
 * @param token - This process's token.
 * @returns What the holder measures, or undefined when `limits.json` is absent or malformed or the
 * host has no sampler.
 */
export function readMeasure(options: LaneOptions, token: string): Measure | undefined {
	if (process.platform !== 'win32') return undefined
	const limits = readLimits(options.root)
	if (limits === 'unread') {
		console.error(
			`lane: ${LIMITS_FILE} under ${options.root} cannot be read as limits; the ticket runs heavy`,
		)
	}
	if (limits === 'absent' || limits === 'unread') return undefined
	const key = renderKey(realpathSync(process.cwd()), options.command)
	const light = options.solo
		? undefined
		: classifyLight(readSeed(options.command), readOutcomes(options.root, key), limits)
	return { limits, key, token, light }
}

/**
 * Takes a ticket, waits for this process's turn, and runs the command.
 *
 * @param options - The run.
 * @param launcher - The launcher's path.
 * @param tokenId - This process's token.
 * @param token - This process's listening endpoint.
 * @returns The exit code.
 */
export async function enterLane(
	options: LaneOptions,
	launcher: string,
	tokenId: string,
	token: Token,
): Promise<number> {
	const { root } = options
	try {
		mkdirSync(root, { recursive: true })
		const measure = readMeasure(options, tokenId)
		await token.listen(renderEndpoint(root, tokenId))
		writeStage(root, buildTicket(tokenId, options.label, measure?.light, options.solo))
		const sequence = linkStage(root, tokenId)
		removeFile(join(root, `${tokenId}${STAGE_SUFFIX}`))
		token.publish()
		const unwatch = watchSignals(() => {
			removeFile(join(root, renderTicketName(sequence)))
			removeFile(renderEndpoint(root, tokenId))
			process.exit(75)
		})
		const refusal = await waitForTurn(root, sequence, tokenId, measure?.limits)
		unwatch()
		if (refusal === undefined) {
			return await runHolder(options, launcher, sequence, measure, token)
		}
		removeFile(join(root, renderTicketName(sequence)))
		console.error(`lane: ${refusal}`)
		return 75
	} catch (error) {
		console.error(`lane: the queue under ${root} refused the run: ${String(error)}`)
		return 75
	}
}

/**
 * Runs one validated command on the lane.
 *
 * @param options - The run.
 * @returns The exit code.
 */
export async function runLane(options: LaneOptions): Promise<number> {
	const launcher = resolveLauncher()
	if (!existsSync(launcher)) {
		console.error(`lane: the launcher ${quote(launcher)} does not exist`)
		return 75
	}
	const token = new Token()
	const code = await enterLane(options, launcher, randomUUID(), token)
	await token.destroy()
	return code
}

/**
 * Reads one ticket's state for `--status`, connecting to its endpoint and writing nothing.
 *
 * @param root - The queue root.
 * @param entry - The ticket.
 * @returns The ticket's row.
 */
export async function readStatusRow(root: string, entry: Entry): Promise<StatusRow> {
	const ticket = entry.ticket
	const fields = {
		sequence: entry.sequence,
		label: ticket?.label,
		pid: ticket?.pid,
		light: ticket?.light !== undefined,
		solo: ticket?.solo === true,
	}
	if (ticket === undefined || describeForeign(ticket) !== undefined) {
		return { ...fields, state: 'unread', holding: false }
	}
	const code = await probeEndpoint(renderEndpoint(root, ticket.token))
	if (code === undefined) {
		const holding = existsSync(join(root, renderRunName(entry.sequence)))
		return { ...fields, state: 'live', holding }
	}
	return { ...fields, state: isGone(code) ? 'dead' : 'unread', holding: false }
}

/**
 * Reads the queue for `--status`.
 *
 * @param root - The queue root.
 * @returns Every ticket in arrival order, and the earliest holding ticket that is not light.
 */
export async function readStatus(root: string): Promise<Status> {
	const tickets = await Promise.all(readQueue(root).map((entry) => readStatusRow(root, entry)))
	return { tickets, holder: tickets.find((row) => row.holding && !row.light) }
}

/**
 * Renders the queue as text.
 *
 * @param status - What `--status` read.
 * @returns One line for the heavy holder, one naming every light holder, and one per ticket with its
 * lane, in arrival order.
 */
export function renderStatus(status: Status): string {
	const lights = status.tickets.filter((row) => row.holding && row.light)
	return [
		`holder: ${status.holder === undefined ? 'none' : quote(status.holder.label ?? 'unread')}`,
		`light: ${lights.length === 0 ? 'none' : lights.map((row) => quote(row.label ?? 'unread')).join(', ')}`,
		...status.tickets.map(
			(row) =>
				`${renderTicketName(row.sequence)} ${row.state} ${renderLane(row)}${row.holding ? ' holding' : ''} ${quote(row.label ?? 'unread')} pid ${String(row.pid)}`,
		),
	].join('\n')
}

/**
 * Names a ticket's lane for `--status`.
 *
 * @param row - The ticket's row.
 * @returns `solo`, `light`, or `heavy`.
 */
export function renderLane(row: StatusRow): string {
	if (row.solo) return 'solo'
	return row.light ? 'light' : 'heavy'
}

/**
 * Prints the queue, writing nothing under the root.
 *
 * @param root - The queue root.
 * @param json - If `true`, prints JSON; if `false`, prints text.
 * @returns 0 on a read; 75 when the root cannot be listed.
 */
export async function runStatus(root: string, json: boolean): Promise<number> {
	try {
		const status = await readStatus(root)
		console.log(json ? JSON.stringify(status) : renderStatus(status))
		return 0
	} catch (error) {
		console.error(`lane: the queue under ${root} cannot be read: ${readCode(error)}`)
		return 75
	}
}

/**
 * Validates a run's arguments.
 *
 * @param own - The arguments before the bare `--`.
 * @param command - The arguments after the bare `--`.
 * @returns The run, or undefined when a flag or the command is missing or out of range.
 */
export function readLaneOptions(
	own: readonly string[],
	command: readonly string[],
): LaneOptions | undefined {
	const label = readOption(own, '--label')
	const journal = readOption(own, '--journal')
	const errors = readOption(own, '--errors')
	const cap = Number(readOption(own, '--cap') ?? Number.NaN)
	if (
		label === undefined ||
		label === '' ||
		journal === undefined ||
		errors === undefined ||
		journal === errors ||
		!Number.isFinite(cap) ||
		cap <= 0 ||
		cap > MAX_CAP_SECONDS ||
		command[0] === undefined ||
		command[0] === ''
	) {
		return undefined
	}
	return {
		root: resolveRoot(readOption(own, '--root')),
		label,
		journal,
		errors,
		cap,
		solo: own.includes('--solo'),
		command,
	}
}

/**
 * Runs the script on its arguments.
 *
 * @remarks
 * Every usage fault returns before a ticket exists, so none surfaces after a wait.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code the opening comment names.
 */
export async function main(argv: readonly string[]): Promise<number> {
	const end = argv.indexOf('--')
	const own = end === -1 ? argv : argv.slice(0, end)
	const command = end === -1 ? [] : argv.slice(end + 1)
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(`lane: ${unknown.join(', ')} is not a flag this script reads; ${USAGE}`)
		return 64
	}
	const missing = readMissingFlags(own, VALUE_FLAGS)
	if (missing.length > 0) {
		console.error(`lane: ${missing.join(', ')} given with no value; ${USAGE}`)
		return 64
	}
	if (readPositionals(own, VALUE_FLAGS).length > 0) {
		console.error(USAGE)
		return 64
	}
	const status = own.includes('--status')
	if (status) {
		if (end !== -1 || RUN_FLAGS.some((flag) => own.includes(flag))) {
			console.error(`lane: --status and a run are two modes; ${USAGE}`)
			return 64
		}
		return runStatus(resolveRoot(readOption(own, '--root')), own.includes('--json'))
	}
	const options = own.includes('--json') ? undefined : readLaneOptions(own, command)
	if (options === undefined) {
		console.error(USAGE)
		return 64
	}
	return runLane(options)
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	main(process.argv.slice(2)).then((code) => {
		process.exitCode = code
	})
}

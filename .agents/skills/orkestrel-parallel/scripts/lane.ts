// Run one process-running command at a time on this host, in arrival order, across every checkout
// and shell of one user account. Run from the checkout root:
//   node .agents/skills/orkestrel-parallel/scripts/lane.ts --label NAME --journal PATH --errors PATH --cap SECONDS [--root DIR] -- COMMAND [ARGS...]
//   node .agents/skills/orkestrel-parallel/scripts/lane.ts --status [--root DIR] [--json]
// A run takes a ticket, waits for every earlier ticket, runs the command through the dispatch skill's
// `launch` script, reads the process tree, and releases. The launcher owns the cap, the journal, and
// the errors file; its stdout lines pass through verbatim, and the cap must be above 0. The two forms
// are two operation modes, so `--status` with a run's flag or a bare `--` is refused, and `--json`
// belongs to `--status` alone. A run therefore cannot ask the launcher for its own `--status` files.
// `--status` prints each ticket in arrival order with its label and
// `live`, `dead`, or `unread`, and names the holder: the earliest live ticket with a run record. It
// writes nothing, removes nothing, and creates no root; an absent root reads as an empty queue. The
// root is `.orkestrel/lane` under the account's home directory, read from the account record and
// never from an environment variable; `--root DIR` is for a proof. Bench execs stay outside the lane,
// because the host bound counts process-running commands.
// Exit: the launcher's code (the command's code, 124 when capped, 127 when the command could not
// start); 1 when a signal ended the launcher; 64 on usage; 75 when the lane refused before the
// command ran; 70 when the command ran and its tree still reads as present, or its ticket could not
// be removed. `--status` exits 0 on a read and 75 when the root cannot be listed. A command that itself
// exits 64, 70, or 75 reads like the lane's own code.
// Protocol: a process listens on an endpoint named by a random token, writes the complete ticket to
// `<token>.stage`, and hard-links that file to `<sequence>.ticket`, which publishes it in one step.
// A waiter parks on the `close` of the nearest earlier ticket's endpoint with no timer, and a refused
// connect means that owner is gone. A waiter on a stage file writes one byte, and a published owner
// closes that connection, because a connection its synchronous allocation left unaccepted would
// otherwise stay parked on a process that waits behind it.
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
import { randomUUID } from 'node:crypto'
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
import { hostname, userInfo } from 'node:os'
import { dirname, extname, join } from 'node:path'
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
export const RUN_FLAGS: readonly string[] = ['--label', '--journal', '--errors', '--cap']

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = [...VALUE_FLAGS, '--status', '--json']

/** Holds the usage line printed on a usage refusal. */
export const USAGE =
	'usage: lane.ts --label NAME --journal PATH --errors PATH --cap SECONDS [--root DIR] -- COMMAND [ARGS...] | lane.ts --status [--root DIR] [--json]; the journal and the errors file differ, and the cap is a number of seconds above 0 up to 2147483'

/** Holds the longest cap in whole seconds, equal to the limit of the sibling launcher. */
export const MAX_CAP_SECONDS = 2_147_483

/** Holds the digit count of a ticket name, which keeps a directory listing readable in order. */
export const SEQUENCE_WIDTH = 12

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

/** Describes the complete record a stage file holds and a ticket publishes. */
export interface Ticket {
	readonly protocol: number
	readonly token: string
	readonly label: string
	readonly pid: number
	readonly host: string
	readonly platform: string
	readonly cwd: string
	readonly arrived: string
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

/** Describes what a process does next on the queue. */
export type Turn =
	| { readonly state: 'holder' }
	| { readonly state: 'staged'; readonly name: string }
	| { readonly state: 'behind'; readonly entry: Entry }
	| { readonly state: 'refused'; readonly reason: string }

/** Describes what a sweep confirmed: whether the tree reads as gone, and the members it left. */
export interface Sweep {
	readonly gone: boolean
	readonly members: readonly number[]
}

/** Describes one ticket as `--status` reports it. */
export interface StatusRow {
	readonly sequence: number
	readonly label: string | undefined
	readonly pid: number | undefined
	readonly state: 'live' | 'dead' | 'unread'
}

/** Describes what `--status` reads: every ticket in arrival order and the holder among them. */
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
	readonly #server: Server
	#published = false

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

	// A byte after the publish comes from a stage waiter whose connection the allocation left unaccepted.
	#admit(socket: Socket): void {
		this.#sockets.add(socket)
		socket.on('error', () => undefined)
		socket.on('close', () => this.#sockets.delete(socket))
		socket.on('data', () => {
			if (this.#published) socket.destroy()
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
 * @returns True when every field has its type and the token has the token's form; false otherwise.
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
		typeof value.arrived === 'string'
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
 * @returns The complete ticket.
 */
export function buildTicket(token: string, label: string): Ticket {
	return {
		protocol: PROTOCOL,
		token,
		label,
		pid: process.pid,
		host: hostname(),
		platform: process.platform,
		cwd: process.cwd(),
		arrived: new Date().toISOString(),
	}
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
 * @returns The holder state, the stage file to wait on, the nearest earlier ticket, or a refusal.
 */
export function decideTurn(root: string, sequence: number, token: string): Turn {
	const stage = readNames(root).find(
		(name) => name.endsWith(STAGE_SUFFIX) && name !== `${token}${STAGE_SUFFIX}`,
	)
	if (stage !== undefined) return { state: 'staged', name: stage }
	const entries = readQueue(root)
	const position = entries.findIndex((entry) => entry.sequence === sequence)
	if (position === -1) {
		return { state: 'refused', reason: `ticket ${renderTicketName(sequence)} is gone` }
	}
	const lower = entries[position - 1]
	return lower === undefined ? { state: 'holder' } : { state: 'behind', entry: lower }
}

/**
 * Connects to an endpoint and parks until the connection closes.
 *
 * @param endpoint - The endpoint.
 * @param stage - If `true`, writes the one byte a published owner closes the connection on; if
 * `false`, writes nothing.
 * @param parked - Called when the connection is open and the wait starts.
 * @returns The connect failure's code, or undefined after a connection opened and closed.
 */
export function parkOn(
	endpoint: string,
	stage: boolean,
	parked: () => void,
): Promise<string | undefined> {
	return new Promise((resolve) => {
		const socket = connect(endpoint)
		socket.once('error', (error) => resolve(readCode(error)))
		socket.once('connect', () => {
			socket.removeAllListeners('error')
			socket.on('error', () => undefined)
			socket.once('close', () => resolve(undefined))
			socket.resume()
			if (stage) socket.write('s')
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
export function selectMembers(
	rows: readonly Row[],
	seeds: readonly number[],
	floor: number,
	ceiling: number,
): readonly Row[] {
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
 * Waits for this process's turn, parked on events with no timer.
 *
 * @param root - The queue root.
 * @param sequence - This process's sequence.
 * @param token - This process's token.
 * @param announced - The token this process last printed a waiting line for.
 * @returns The refusal, or undefined when this process holds the lane.
 */
export async function waitForTurn(
	root: string,
	sequence: number,
	token: string,
	announced?: string,
): Promise<string | undefined> {
	const turn = decideTurn(root, sequence, token)
	if (turn.state === 'holder') return undefined
	if (turn.state === 'refused') return turn.reason
	const refusal =
		turn.state === 'staged'
			? await waitOnStage(root, turn.name)
			: await waitOnTicket(root, turn.entry, announced)
	if (refusal !== undefined) return refusal
	return waitForTurn(
		root,
		sequence,
		token,
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
 * Runs the command as the holder, reads the tree at handover, and releases.
 *
 * @param options - The run.
 * @param launcher - The launcher's path.
 * @param sequence - This process's sequence.
 * @returns The launcher's code; 1 when a signal ended it; 70 when the tree still reads as present or
 * the ticket could not be removed; 75 when the launcher could not start.
 */
export async function runHolder(
	options: LaneOptions,
	launcher: string,
	sequence: number,
): Promise<number> {
	const { root } = options
	const started = Date.now()
	writeRun(root, sequence, { started, launcher: undefined, command: undefined })
	const child = startLauncher(launcher, options)
	const id = child.pid
	if (id === undefined) {
		releaseTicket(root, sequence)
		console.error(`lane: ${quote(launcher)} could not start`)
		return 75
	}
	tryWriteRun(root, sequence, { started, launcher: id, command: undefined })
	const unwatch = watchSignals(() => killMembers([id]))
	const closed = waitForClose(child)
	if (child.stdout !== null) {
		const lines = createInterface({ input: child.stdout, crlfDelay: Infinity })
		lines.on('error', () => undefined)
		lines.on('line', (line) => {
			console.log(line)
			const command = readCommandId(line)
			if (command !== undefined) tryWriteRun(root, sequence, { started, launcher: id, command })
		})
	}
	const code = await closed
	unwatch()
	const ended = Date.now()
	const run = readRun(root, sequence)
	const sweep =
		run === 'absent' || run === 'unread'
			? { gone: false, members: [] }
			: sweepTree(() => readTree(run, ended), killMembers, KILL_BUDGET)
	if (!sweep.gone) {
		console.error(
			`lane: the tree of ${quote(options.label)} still reads as ${sweep.members.length === 0 ? 'unread' : `present: ${sweep.members.join(', ')}`}; the lane stays held by ${renderTicketName(sequence)} and ${renderRunName(sequence)} under ${root}`,
		)
		return 70
	}
	const refusal = releaseTicket(root, sequence)
	if (refusal !== undefined) {
		console.error(`lane: removing ${renderTicketName(sequence)} reported ${refusal}`)
		return 70
	}
	return code ?? 1
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
		await token.listen(renderEndpoint(root, tokenId))
		writeStage(root, buildTicket(tokenId, options.label))
		const sequence = linkStage(root, tokenId)
		removeFile(join(root, `${tokenId}${STAGE_SUFFIX}`))
		token.publish()
		const unwatch = watchSignals(() => {
			removeFile(join(root, renderTicketName(sequence)))
			removeFile(renderEndpoint(root, tokenId))
			process.exit(75)
		})
		const refusal = await waitForTurn(root, sequence, tokenId)
		unwatch()
		if (refusal === undefined) return await runHolder(options, launcher, sequence)
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
	const fields = { sequence: entry.sequence, label: ticket?.label, pid: ticket?.pid }
	if (ticket === undefined || describeForeign(ticket) !== undefined) {
		return { ...fields, state: 'unread' }
	}
	const code = await probeEndpoint(renderEndpoint(root, ticket.token))
	if (code === undefined) return { ...fields, state: 'live' }
	return { ...fields, state: isGone(code) ? 'dead' : 'unread' }
}

/**
 * Reads the queue for `--status`.
 *
 * @param root - The queue root.
 * @returns Every ticket in arrival order, and the earliest live ticket with a run record.
 */
export async function readStatus(root: string): Promise<Status> {
	const tickets = await Promise.all(readQueue(root).map((entry) => readStatusRow(root, entry)))
	return {
		tickets,
		holder: tickets.find(
			(row) => row.state === 'live' && existsSync(join(root, renderRunName(row.sequence))),
		),
	}
}

/**
 * Renders the queue as text.
 *
 * @param status - What `--status` read.
 * @returns One line for the holder and one per ticket, in arrival order.
 */
export function renderStatus(status: Status): string {
	return [
		`holder: ${status.holder === undefined ? 'none' : quote(status.holder.label ?? 'unread')}`,
		...status.tickets.map(
			(row) =>
				`${renderTicketName(row.sequence)} ${row.state} ${quote(row.label ?? 'unread')} pid ${String(row.pid)}`,
		),
	].join('\n')
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
	return { root: resolveRoot(readOption(own, '--root')), label, journal, errors, cap, command }
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

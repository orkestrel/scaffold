// Run process-running commands on this host in one heavy lane and several light lanes, in arrival
// order, across every checkout and shell of one user account. Run from the checkout root:
//   node .agents/skills/orkestrel-parallel/scripts/lane.ts --label NAME --journal PATH --errors PATH --cap SECONDS [--root DIR] [--solo] -- COMMAND [ARGS...]
//   node .agents/skills/orkestrel-parallel/scripts/lane.ts --status [--root DIR] [--json]
// A run takes a ticket, waits for its turn, runs the command through the dispatch skill's `launch`
// script, reads the process tree, and releases. The launcher owns the cap, the journal, and the
// errors file; its stdout lines pass through verbatim, and the cap must be above 0. The script reads
// its flags before the first bare `--` with `parseArgs` in strict mode, and passes every argument
// after it to the command. The two forms are two operation modes, so `--status` with a run's flag
// (`--solo` included) or a bare `--` is refused, and `--json` belongs to `--status` alone. A run
// therefore cannot ask the launcher for its own `--status` files.
// Lanes: a ticket is heavy unless its arrival reads it light, and the reading is frozen in the
// ticket. A heavy ticket holds when it is the earliest live non-light ticket; a `--solo` ticket is
// heavy and also waits out every earlier light ticket. A light ticket holds when every earlier light
// ticket that the directory rule does not block holds, no earlier `--solo` ticket is live, and the
// earlier light tickets' summed peaks with its own fit `slots` and each budget; the earliest light
// ticket always fits. A light holder runs at below-normal priority, and its holder ends it and exits
// 69 when a sample taken before the launcher exits passes the memory or process threshold; a sample
// after the exit reads no member created after it and ends nothing.
// Directories: a run of the falsify skill's `mutate` script, `--restore` included, publishes
// `edits` in its ticket, because it edits source in its working directory. Every ticket also waits
// on the nearest earlier ticket that carries `edits` and shares its working directory, and a ticket
// that carries `edits` also waits on the nearest earlier ticket of its working directory in either
// lane, and on an earlier ticket it cannot read. That last wait is the lane's existing refusal,
// because a ticket's endpoint token lives in its record, so a mutation exits 75 on any unreadable
// earlier ticket, one a writer has not finished included. Two directories share source when their
// real paths, as the file system stores them, are equal or one sits inside the other. Every wait
// names an earlier ticket, so no cycle of waits forms, and each process derives from the earlier
// tickets alone which light tickets the rule blocks.
// Light reading: `<root>/limits.json` holds `slots`, the `budget` and the per-run `threshold`; while
// it is absent or malformed, or on a host other than Windows, every ticket is heavy, no sampler runs,
// and no record is written. Otherwise each run starts one PowerShell sampler at arrival, which readies
// while the ticket waits, with no timer until its first sample, and exits when its stdin closes. The
// holder starts its command after the sampler readies, or unmeasured once `READY_MS` passes, samples
// the tree back to back through the command's first second and once a second after, and reads the
// handover through one more sample; when that sample lists a member or no sampler answers, the
// handover reads, kills, and reads again through fresh snapshots, each a second PowerShell. The
// holder writes one record per run under `<root>/history/<key>/`, keyed by the working directory and
// the command, keeping the latest runs. A record that opens a key prunes the history after the
// release, keeping only the keys written inside `HISTORY_AGE_MS` (7 days), and of those at most the
// `HISTORY_KEYS` (512) written last; a
// name it cannot list or remove stays, one stderr line names it, and the exit stays the run's. The
// command's kind seeds the reading: a format check, a lint check, a type check, and a scoped test run
// read light until a record breaches; a full suite, a run of several projects, an install, a
// pack-and-install suite, a release chain, a journey, a study, a capture, and a live-service run read
// heavy; `npx` and a package manager's `exec`, `x`, or `dlx` verb read as the tool they run; any other
// command reads light only when its latest runs each sit inside the threshold, none capped and none
// ending 69 or 70. A `mutate` run is keyed without its edits file and seeded by the command after its
// own `--`, so it reads light when that command's records allow; a `mutate --restore` run wraps no
// command and reads heavy.
// `--status` prints each ticket in arrival order with its label, `live`, `dead`, or `unread`, its
// lane, `edits` for a `mutate` run, and `holding` for a holder, and names the heavy holder and every
// light holder. It writes nothing, removes nothing, and creates no root; an absent root reads as an
// empty queue. The root is `.orkestrel/lane` under the account's home directory, read from the
// account record and never from an environment variable; `--root DIR` is for a proof. Bench execs
// stay outside the lane, because the host bound counts process-running commands.
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
// so the waiter decides again; a byte that reaches an owner that is releasing parks until it ends.
// The protocol stays 1: the `light`, `solo`, and `edits` ticket fields are optional, a ticket
// without them reads as heavy, and a process of the first release holds only as the earliest ticket.
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
// - A dead light holder with a live tree. Light arrivals exit 75 until that tree is gone. A heavy
//   arrival passes it, unless the directory rule points the arrival at it; that arrival waits on it,
//   then exits 75 while its tree lives.
// - Sampling. A process that lives between two samples goes uncounted, the CPU time of a member that
//   exits between samples is lost, and disk input and output are not measured. A command that ends
//   before one process query answers, about 140 ms on the Windows host measured 2026-11-12, can
//   record zero, so it counts nothing until a later run is read.
// - Transition. A process of an earlier release reads no `edits` field: it does not wait on a mutation
//   of its directory, a `mutate` run it carries publishes no `edits`, so the directory rule cannot see
//   that run, and as a light ticket it counts a directory-blocked light ticket of this release as one
//   that has not held, so it queues behind it. Every checkout on an earlier `@orkestrel/scaffold`
//   keeps starting such processes on the shared root until that checkout adopts this release, so the
//   bound is the last adoption, not one process's exit. A mutation of this release does wait on an
//   earlier ticket of its directory, whichever release wrote it.
// - Heavy throughput. A heavy ticket that the directory rule blocks still keeps every later heavy
//   ticket out, from every directory, because passing it would let two heavy tickets hold at once.
// - Light budget. A light ticket that the directory rule blocks is not one later light tickets wait to
//   hold, but its footprint still counts in their budget sums and their slot count. Where the per-run
//   threshold is over the budget, as in the live `limits.json` of 2026-11-12, one blocked ticket with
//   fewer than `RECENT_RUNS` records fills the budget, so every later light ticket on the host queues
//   until the mutation ends and that ticket runs. The count stays, because leaving the ticket out and
//   counting later holders when it unblocks would race two processes on one budget.
// - The ready wait. A holder waits for its sampler before it writes its run record and signals that
//   it holds, so later light tickets count it as one that has not held for up to `READY_MS` when its
//   sampler never reports ready.
// - The idle sampler. Each queued measured ticket keeps its PowerShell sampler from arrival, about
//   75 MB of private memory once ready on the Windows host measured 2026-11-13, and no budget counts
//   that memory, so a long queue of measured tickets costs that much per ticket.
// - A prune beside a write. A holder that writes a record to an existing key that is past a bound can
//   lose that record to another holder's prune, which removes the key with the record in it.
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
import type { ParseArgsOptionsConfig } from 'node:util'
import type { ChildProcess } from 'node:child_process'
import type { Server, Socket } from 'node:net'
import { spawn, spawnSync } from 'node:child_process'
import { createHash, randomUUID } from 'node:crypto'
import { once } from 'node:events'
import {
	existsSync,
	linkSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	realpathSync,
	rmSync,
	statSync,
	writeFileSync,
} from 'node:fs'
import { connect, createServer } from 'node:net'
import { constants, hostname, setPriority, userInfo } from 'node:os'
import {
	basename,
	dirname,
	extname,
	isAbsolute,
	join,
	resolve as resolvePath,
	sep,
} from 'node:path'
import { createInterface } from 'node:readline'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

/** Holds the protocol version a ticket carries, so a process refuses a ticket it cannot read. */
export const PROTOCOL = 1

/** Lists the flags only a run reads, which `--status` refuses, by the name `parseArgs` reads them under. */
export const RUN_OPTIONS: readonly string[] = ['label', 'journal', 'errors', 'cap', 'solo']

/** Holds the usage line printed on a usage refusal. */
export const USAGE =
	'usage: lane.ts --label NAME --journal PATH --errors PATH --cap SECONDS [--root DIR] [--solo] -- COMMAND [ARGS...] | lane.ts --status [--root DIR] [--json]; the journal and the errors file differ, and the cap is a number of seconds above 0 up to 2147483'

/** Declares every flag the script reads, for `parseArgs`. */
export const OPTIONS: ParseArgsOptionsConfig = Object.freeze({
	label: Object.freeze({ type: 'string' }),
	journal: Object.freeze({ type: 'string' }),
	errors: Object.freeze({ type: 'string' }),
	cap: Object.freeze({ type: 'string' }),
	root: Object.freeze({ type: 'string' }),
	status: Object.freeze({ type: 'boolean' }),
	json: Object.freeze({ type: 'boolean' }),
	solo: Object.freeze({ type: 'boolean' }),
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

/** Holds the age in milliseconds past which a history key is pruned. */
export const HISTORY_AGE_MS = 7 * 24 * 60 * 60 * 1000

/** Holds the count of history keys kept, the latest by their newest record. */
export const HISTORY_KEYS = 512

/**
 * Holds the longest wait in milliseconds for a sampler to ready before its holder starts the command
 * unmeasured.
 *
 * @remarks
 * The wait outlasts a sampler's start on a loaded host, and it bounds what a sampler that neither
 * readies nor exits costs the lane.
 */
export const READY_MS = 5000

/**
 * Holds the longest wait in milliseconds for a sampler's handover sample and for its exit after its
 * stdin closes.
 *
 * @remarks
 * A warm process query answered in about 140 ms on the Windows host measured 2026-11-12, so the wait
 * outlasts a query on a loaded host, and it bounds what a sampler that hangs after it readied costs
 * the lane at handover.
 */
export const HANDOVER_MS = 5000

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
 * several projects, the pack-and-install suite, the live-service suite, and the benchmark run.
 */
export const HEAVY_SCRIPTS: readonly string[] = [
	'test',
	'test:src',
	'test:app',
	'test:distribution',
	'test:service',
	'test:bench',
]

/** Lists the Vitest projects a seed reads heavy: the pack-and-install project and the live-service project. */
export const HEAVY_PROJECTS: readonly string[] = ['distribution', 'service']

/** Matches a browser face's Vitest project, whose whole run a seed reads heavy: `src:browser`, `app:vue`. */
export const BROWSER_PROJECT = /(?:^|:)(?:browser|vue)$/u

/** Matches a dotted flag such as `--outputFile.json`, whose separate value a seed skips. */
export const DOTTED_FLAG = /^--[^=.]+\.[^=]+$/u

/** Lists the package managers whose verbs and scripts a seed reads. */
export const MANAGERS: readonly string[] = ['npm', 'pnpm', 'yarn', 'bun']

/** Lists the package-manager verbs that run a tool, which a seed reads through to the tool. */
export const EXEC_VERBS: readonly string[] = ['exec', 'x', 'dlx']

/** Lists, by tool, the exec flags that take a separate value, so a seed reads no flag value as the tool. */
export const EXEC_VALUE_FLAGS: Readonly<Record<string, readonly string[]>> = Object.freeze({
	npm: Object.freeze(['--package', '-p', '--workspace', '-w']),
	npx: Object.freeze(['--package', '-p', '--workspace', '-w']),
	pnpm: Object.freeze(['--package']),
	pnpx: Object.freeze(['--package']),
	yarn: Object.freeze(['--package']),
	bun: Object.freeze(['--package']),
	bunx: Object.freeze(['--package']),
})

/**
 * Lists, by package manager, the flags before the verb that take a separate value, so a seed reads no
 * flag value as the verb.
 *
 * @remarks
 * npm's `-w` names a workspace and takes a value; pnpm's `-w` is the boolean `--workspace-root`.
 */
export const MANAGER_VALUE_FLAGS: Readonly<Record<string, readonly string[]>> = Object.freeze({
	npm: Object.freeze(['--prefix', '--workspace', '-w']),
	pnpm: Object.freeze(['--dir', '-C', '--filter', '-F']),
	yarn: Object.freeze(['--cwd']),
	bun: Object.freeze(['--cwd']),
})

/** Lists the tools that run another tool the way `npx` does. */
export const NPX_TOOLS: readonly string[] = ['npx', 'pnpx', 'bunx']

/** Lists the `npm exec` and `npx` flags that run inline shell text, which names no tool a seed reads. */
export const EXEC_INLINE_FLAGS: readonly string[] = ['-c', '--call']

/** Holds the tool name of the falsify skill's `mutate` script, whose run a seed reads by its wrapped command. */
export const MUTATION_TOOL = 'mutate'

/** Holds the `mutate` flag that names the edits file, which a run's key leaves out. */
export const MUTATION_FLAG = '--edits'

/** Holds the `mutate` flag that writes saved originals back, which edits source and wraps no command. */
export const RESTORE_FLAG = '--restore'

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

/** Holds the line a sampler prints when its first process query has run, which readies it. */
export const READY_LINE = 'ready'

/** Holds the byte a holder writes to its sampler to ask for one sample at once. */
export const SAMPLE_BYTE = 's'

/**
 * Holds the PowerShell text of a sampler.
 *
 * @remarks
 * The child runs one process query, the one a sample runs, so its first sample answers warm, and
 * prints {@link READY_LINE}. Until the first byte it waits on its
 * stdin with no timer. Each byte on its stdin starts one sample at once, and after the first byte it
 * also samples every {@link SAMPLE_MS}. A sample prints one line: `1` for a sample a byte asked for or `0`, a `|`,
 * and the rows separated by semicolons. The child exits when its stdin closes.
 */
export const SAMPLER_COMMAND = `$i=[Console]::OpenStandardInput();$b=New-Object byte[] 1;$t=$i.ReadAsync($b,0,1);$null=Get-CimInstance Win32_Process -Property ProcessId,ParentProcessId,CreationDate,KernelModeTime,UserModeTime,PrivatePageCount;[Console]::Out.WriteLine('${READY_LINE}');[Console]::Out.Flush();$a=$false;$q=0;$d=-1;while($true){if($a){$r=Get-CimInstance Win32_Process -Property ProcessId,ParentProcessId,CreationDate,KernelModeTime,UserModeTime,PrivatePageCount | Where-Object { $_.CreationDate } | ForEach-Object { '{0} {1} {2} {3} {4}' -f $_.ProcessId,$_.ParentProcessId,([DateTimeOffset]$_.CreationDate).ToUnixTimeMilliseconds(),($_.KernelModeTime+$_.UserModeTime),$_.PrivatePageCount };[Console]::Out.WriteLine([string]$q+'|'+($r -join ';'));[Console]::Out.Flush();$q=0};if($t.Wait($d)){if($t.Status -ne 'RanToCompletion' -or $t.Result -eq 0){break};$a=$true;$q=1;$d=${String(SAMPLE_MS)};$t=$i.ReadAsync($b,0,1)}}`

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

/** Describes what a history prune did: the keys it removed and the names it skipped. */
export interface Prune {
	readonly removed: readonly string[]
	readonly skipped: readonly string[]
}

/** Describes one sample line: whether a byte asked for it, and its rows. */
export interface Sample {
	readonly requested: boolean
	readonly gauges: readonly Gauge[]
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

/**
 * Describes the complete record a stage file holds and a ticket publishes; `light` holds the footprint
 * a light ticket counts, and `edits` marks a `mutate` run that edits source in its working directory.
 */
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
	readonly edits?: boolean
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

/** Describes one ticket as `--status` reports it; `edits` marks a `mutate` run, and `holding` a live ticket with a run record. */
export interface StatusRow {
	readonly sequence: number
	readonly label: string | undefined
	readonly pid: number | undefined
	readonly state: 'live' | 'dead' | 'unread'
	readonly light: boolean
	readonly solo: boolean
	readonly edits: boolean
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
	async listen(endpoint: string): Promise<void> {
		this.#server.listen(endpoint)
		await once(this.#server, 'listening')
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
	async destroy(): Promise<void> {
		for (const socket of this.#sockets) socket.destroy()
		this.#server.close()
		await once(this.#server, 'close')
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
 * Renders the name of a ticket or a run record.
 *
 * @param sequence - The ticket's sequence.
 * @param suffix - The name ending: `TICKET_SUFFIX` for a ticket, `RUN_SUFFIX` for its run record.
 * @returns The file name, at a fixed width.
 */
export function renderName(sequence: number, suffix: string): string {
	return `${String(sequence).padStart(SEQUENCE_WIDTH, '0')}${suffix}`
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
		(!('solo' in value) || typeof value.solo === 'boolean') &&
		(!('edits' in value) || typeof value.edits === 'boolean')
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
		const parsed = parseText(readFileSync(join(root, renderName(sequence, TICKET_SUFFIX)), 'utf8'))
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
		const parsed = parseText(readFileSync(join(root, renderName(sequence, RUN_SUFFIX)), 'utf8'))
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
	writeFileSync(join(root, renderName(sequence, RUN_SUFFIX)), JSON.stringify(run))
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
 * @param edits - If `true`, marks a `mutate` run that edits source in its working directory; if
 * `false`, omits the field.
 * @returns The complete ticket, carrying `light`, `solo`, and `edits` only when they are set.
 */
export function buildTicket(
	token: string,
	label: string,
	light?: Usage,
	solo = false,
	edits = false,
): Ticket {
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
		...(edits ? { edits } : {}),
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
 * @returns True when the write created the key's directory; false when the key existed.
 */
export function writeOutcome(root: string, key: string, name: string, outcome: Outcome): boolean {
	const directory = join(root, HISTORY_DIRECTORY, key)
	const created = mkdirSync(directory, { recursive: true }) !== undefined
	writeFileSync(join(directory, name), JSON.stringify(outcome), { flag: 'wx' })
	for (const stale of readOutcomeNames(root, key).slice(0, -RECENT_RUNS)) {
		removeFile(join(directory, stale))
	}
	return created
}

/**
 * Reads when a history key was last written.
 *
 * @param root - The queue root.
 * @param key - The key.
 * @returns The end time its newest record's name opens with; the directory's modification time when
 * it holds no record; `gone` when the entry no longer exists; `unread` when the host refuses to list
 * it, as it does for a file that is no directory.
 */
export function readKeyTime(root: string, key: string): number | 'gone' | 'unread' {
	try {
		const newest = readOutcomeNames(root, key).at(-1)
		if (newest !== undefined) return Number(newest.slice(0, ENDED_WIDTH))
		return statSync(join(root, HISTORY_DIRECTORY, key)).mtimeMs
	} catch (error) {
		return readCode(error) === 'ENOENT' ? 'gone' : 'unread'
	}
}

/**
 * Lists the names under the history directory.
 *
 * @param root - The queue root.
 * @returns The names, empty when the directory is absent; undefined when the host refuses to list it.
 */
export function readHistoryNames(root: string): readonly string[] | undefined {
	try {
		return readNames(join(root, HISTORY_DIRECTORY))
	} catch {
		return undefined
	}
}

/**
 * Removes one history key inside the removal budget.
 *
 * @param root - The queue root.
 * @param key - The key.
 * @returns True when the key is gone; false when the host refused the removal.
 */
export function removeKey(root: string, key: string): boolean {
	try {
		rmSync(join(root, HISTORY_DIRECTORY, key), {
			recursive: true,
			force: true,
			maxRetries: REMOVAL_RETRIES,
			retryDelay: REMOVAL_DELAY_MS,
		})
		return true
	} catch {
		return false
	}
}

/**
 * Prunes the history to the keys written inside {@link HISTORY_AGE_MS}, at most the
 * {@link HISTORY_KEYS} written last.
 *
 * @remarks
 * The prune throws nothing, so it never changes the lane's exit: a name the host refuses to list or
 * remove stays and is reported as skipped.
 *
 * @param root - The queue root.
 * @param now - The current time in epoch milliseconds.
 * @returns The keys removed, and the names skipped: `history` itself when it cannot be listed.
 */
export function pruneHistory(root: string, now: number): Prune {
	const names = readHistoryNames(root)
	if (names === undefined) return { removed: [], skipped: [HISTORY_DIRECTORY] }
	const times = names.map((key) => ({ key, time: readKeyTime(root, key) }))
	const unread = times.flatMap((item) => (item.time === 'unread' ? [item.key] : []))
	const results = times
		.flatMap((item) => (typeof item.time === 'number' ? [{ key: item.key, time: item.time }] : []))
		.toSorted((left, right) => right.time - left.time)
		.filter((item, index) => index >= HISTORY_KEYS || item.time < now - HISTORY_AGE_MS)
		.map((item) => ({ key: item.key, removed: removeKey(root, item.key) }))
	return {
		removed: results.flatMap((item) => (item.removed ? [item.key] : [])),
		skipped: [...unread, ...results.flatMap((item) => (item.removed ? [] : [item.key]))],
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
 * Reads the tool a command runs and the tool's arguments, past Node, `npx`, `pnpx`, `bunx`, and a
 * package manager's `exec`, `x`, or `dlx` verb.
 *
 * @param command - The command and its arguments.
 * @returns The tool's name followed by its arguments; empty for inline Node code, inline exec text,
 * or no script.
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
	if (NPX_TOOLS.includes(name)) return readExecTool(rest, EXEC_VALUE_FLAGS[name])
	if (MANAGERS.includes(name)) {
		const flags = MANAGER_VALUE_FLAGS[name] ?? []
		const verb = rest.findIndex(
			(argument, index) => !argument.startsWith('-') && !flags.includes(rest[index - 1] ?? ''),
		)
		if (EXEC_VERBS.includes(rest[verb] ?? '')) {
			return readExecTool(rest.slice(verb + 1), EXEC_VALUE_FLAGS[name])
		}
	}
	return [name, ...rest]
}

/**
 * Reads the tool an `npx` or `npm exec` call runs, from the arguments after the verb.
 *
 * @remarks
 * The tool is the first argument before a bare `--` that is neither a flag nor the value of a
 * listed flag, else the first argument after the bare `--`. A flag {@link EXEC_INLINE_FLAGS} names
 * before the tool runs shell text instead.
 *
 * @param args - The arguments after `npx` or after the exec verb.
 * @param valueFlags - The flags that take a separate value, from {@link EXEC_VALUE_FLAGS}. Default:
 * none.
 * @returns The tool's name followed by its arguments; empty for inline text or no tool.
 */
export function readExecTool(
	args: readonly string[],
	valueFlags: readonly string[] = [],
): readonly string[] {
	const end = args.indexOf('--')
	const named = args.findIndex(
		(argument, index) =>
			(end === -1 || index < end) &&
			!argument.startsWith('-') &&
			!valueFlags.includes(args[index - 1] ?? ''),
	)
	const start = named !== -1 ? named : end === -1 ? -1 : end + 1
	if (start === -1 || start >= args.length) return []
	const inline = args
		.slice(0, start)
		.some(
			(flag) =>
				EXEC_INLINE_FLAGS.includes(flag) ||
				EXEC_INLINE_FLAGS.some((name) => flag.startsWith(`${name}=`)),
		)
	return inline ? [] : readTool(args.slice(start))
}

/**
 * Checks whether a command is a `mutate --restore` run, which writes source files back.
 *
 * @param command - The command and its arguments.
 * @returns True for a `mutate` call with its restore flag before any bare `--`; false otherwise.
 */
export function matchesRestore(command: readonly string[]): boolean {
	const [tool, ...args] = readTool(command)
	if (tool !== MUTATION_TOOL) return false
	const end = args.indexOf('--')
	return (end === -1 ? args : args.slice(0, end)).some(
		(flag) => flag === RESTORE_FLAG || flag.startsWith(`${RESTORE_FLAG}=`),
	)
}

/**
 * Extracts the command a `mutate` run wraps.
 *
 * @param command - The command and its arguments.
 * @returns The arguments after the run's own bare `--`; undefined for any other command, or a
 * `mutate` call with no edits file or no wrapped command.
 */
export function extractMutation(command: readonly string[]): readonly string[] | undefined {
	const [tool, ...args] = readTool(command)
	if (tool !== MUTATION_TOOL) return undefined
	const end = args.indexOf('--')
	if (end === -1) return undefined
	const edits = args
		.slice(0, end)
		.some((flag) => flag === MUTATION_FLAG || flag.startsWith(`${MUTATION_FLAG}=`))
	const wrapped = args.slice(end + 1)
	return edits && wrapped.length > 0 ? wrapped : undefined
}

/**
 * Normalizes a command to the arguments its key hashes.
 *
 * @remarks
 * A `mutate` run names a fresh edits file each time, so its key leaves the edits flag and its value
 * out, and every run of one wrapped command from one directory shares a key. The cut reads only the
 * script's own flags, between the script and its own bare `--`, so a launcher's `--` before the
 * script moves nothing.
 *
 * @param command - The command and its arguments.
 * @returns A `mutate` run without its edits flag and value; any other command unchanged.
 */
export function normalizeCommand(command: readonly string[]): readonly string[] {
	if (extractMutation(command) === undefined) return command
	const start = command.length - readTool(command).length + 1
	const end = command.indexOf('--', start)
	return command.filter(
		(argument, index) =>
			index < start ||
			index >= end ||
			!(
				argument === MUTATION_FLAG ||
				argument.startsWith(`${MUTATION_FLAG}=`) ||
				command[index - 1] === MUTATION_FLAG
			),
	)
}

/**
 * Normalizes a working directory for the comparison that decides whether two tickets share it.
 *
 * @remarks
 * Every side of the comparison passes through this one function. It reads the real path through
 * `realpathSync.native`, which returns the name and the case the file system stores, so two
 * spellings of one directory compare equal without folding case.
 *
 * @param path - The directory.
 * @returns The real path; the resolved path when it cannot be read, as for a vanished directory.
 */
export function normalizeDirectory(path: string): string {
	try {
		return realpathSync.native(path)
	} catch {
		return resolvePath(path)
	}
}

/**
 * Checks whether two working directories share source.
 *
 * @remarks
 * Both sides pass through {@link normalizeDirectory}, so a child directory, such as a check run from
 * `packages/a`, shares source with a mutation at the checkout root, and the reverse.
 *
 * @param left - One directory.
 * @param right - The other directory.
 * @returns True when the two normalize to one directory or one sits inside the other at a separator
 * boundary; false otherwise.
 */
export function sharesDirectory(left: string, right: string): boolean {
	const one = normalizeDirectory(left)
	const other = normalizeDirectory(right)
	return one === other || matchesInside(one, other) || matchesInside(other, one)
}

/**
 * Checks whether a normalized path sits inside another at a separator boundary.
 *
 * @param inner - The path that might sit inside.
 * @param outer - The path that might contain it.
 * @returns True when `inner` opens with `outer` and a separator; false otherwise, the same path
 * included.
 */
export function matchesInside(inner: string, outer: string): boolean {
	return inner.startsWith(outer.endsWith(sep) ? outer : `${outer}${sep}`)
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
 * @returns `heavy` for a run of every project, of several projects, of a project
 * {@link HEAVY_PROJECTS} names, or of a whole browser project; `light` for a run of named test files
 * or one other project; undefined for any other run or mode.
 */
export function readVitestSeed(args: readonly string[]): Seed | undefined {
	const [mode, ...operands] = readOperands(args, VITEST_VALUE_FLAGS)
	if (mode !== 'run') return undefined
	const projects = args.flatMap((argument, index) => {
		if (argument.startsWith('--project=')) return [argument.slice('--project='.length)]
		return args[index - 1] === '--project' ? [argument] : []
	})
	if (
		projects.length > 1 ||
		projects.some((project) => project.includes('*') || HEAVY_PROJECTS.includes(project))
	) {
		return 'heavy'
	}
	const files = operands.filter((operand) => /\.(?:test|spec)\./u.test(operand))
	if (files.length === 0 && projects.some((project) => BROWSER_PROJECT.test(project)))
		return 'heavy'
	if (files.length > 0 || projects.length === 1) return 'light'
	return projects.length === 0 && operands.length === 0 ? 'heavy' : undefined
}

/**
 * Reads the lane a command's kind seeds.
 *
 * @remarks
 * Heavy wins: a word that names a journey, a study, a capture, a live-service run, or the release
 * chain seeds heavy wherever it appears, before any light kind is read. A `mutate --restore` run,
 * which writes source files back and wraps no command, seeds heavy.
 *
 * @param command - The command and its arguments.
 * @returns The seeded lane, or undefined when no kind names the command.
 */
export function readSeed(command: readonly string[]): Seed | undefined {
	if (readWords(command.slice(1)).some((word) => HEAVY_WORDS.includes(word))) return 'heavy'
	const [tool, ...args] = readTool(command)
	if (tool === undefined) return undefined
	if (HEAVY_TOOLS.includes(tool) || matchesRestore(command)) return 'heavy'
	if (MANAGERS.includes(tool)) {
		const [verb, script] = readOperands(args, MANAGER_VALUE_FLAGS[tool] ?? [])
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
	return tryLink(
		join(root, `${token}${STAGE_SUFFIX}`),
		join(root, renderName(sequence, TICKET_SUFFIX)),
	)
		? sequence
		: linkStage(root, token)
}

/**
 * Decides what a process with a ticket does next.
 *
 * @remarks
 * The two listings are separate, because one listing can miss both a ticket linked and a stage file
 * removed while it runs. A stage file absent from the first listing belongs to a process whose own
 * listing sees this ticket, or to a ticket the second listing sees. A ticket holds only when the
 * directory rule of {@link decideDirectory} names no ticket to wait on and its own lane's rule admits
 * it. Every rule names only an earlier ticket, and an earlier ticket can only leave, so no two tickets
 * wait on each other and no cycle of waits can form.
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
		return { state: 'refused', reason: `ticket ${renderName(sequence, TICKET_SUFFIX)} is gone` }
	}
	const own = entries[position]?.ticket
	const earlier = entries.slice(0, position)
	const shared = own === undefined ? undefined : decideDirectory(earlier, own)
	if (shared !== undefined) return shared
	return own?.light === undefined || limits === undefined
		? decideHeavy(earlier, own?.solo === true)
		: decideLight(root, earlier, own.light, limits)
}

/**
 * Decides which earlier ticket the directory rule makes a ticket wait on, whatever its lane.
 *
 * @remarks
 * Every ticket waits on the nearest earlier ticket that carries `edits` and shares its working
 * directory, because a `mutate` run edits source that ticket reads. A ticket that carries `edits`
 * also waits on the nearest earlier ticket of its working directory in either lane, and on an
 * earlier ticket it cannot read, which might share the directory; that wait refuses. The rule names
 * only earlier tickets, which can only leave, so it adds no cycle of waits. {@link normalizeDirectory}
 * reads both sides of every comparison.
 *
 * @param earlier - The tickets before this one, in arrival order.
 * @param own - This process's ticket.
 * @returns The ticket to wait on; undefined when the rule names none.
 */
export function decideDirectory(earlier: readonly Entry[], own: Ticket): Turn | undefined {
	const entry = earlier.findLast((item) => {
		if (item.ticket === undefined) return own.edits === true
		return (
			(own.edits === true || item.ticket.edits === true) &&
			sharesDirectory(own.cwd, item.ticket.cwd)
		)
	})
	return entry === undefined ? undefined : { state: 'behind', entry }
}

/**
 * Decides what a heavy ticket does next.
 *
 * @remarks
 * A heavy ticket waits on the nearest earlier ticket that is not light, an unreadable one included. A
 * `--solo` ticket waits on the nearest earlier ticket of either lane, so it holds with no light
 * holder beside it. The rule names only an earlier ticket, so it adds no cycle of waits.
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
	const pending = lights.flatMap((entry) => {
		const blocked =
			entry.ticket !== undefined &&
			decideDirectory(earlier.slice(0, earlier.indexOf(entry)), entry.ticket) !== undefined
		return !blocked && readRun(root, entry.sequence) === 'absent' ? [entry.sequence] : []
	})
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
	return rows === undefined ? undefined : selectTree(rows, run, ceiling)
}

/**
 * Selects the members of one run's process tree from a Windows snapshot.
 *
 * @param rows - The snapshot.
 * @param run - The run record.
 * @param ceiling - The latest creation date a row of an exited seed can carry.
 * @returns The members' ids, or undefined when the record names no launcher.
 */
export function selectTree(
	rows: readonly Row[],
	run: Run,
	ceiling: number,
): readonly number[] | undefined {
	if (run.launcher === undefined) return undefined
	return selectMembers(
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
	const files = `${renderName(sequence, TICKET_SUFFIX)} and ${renderName(sequence, RUN_SUFFIX)} under ${root}`
	if (run === 'unread' || (run !== 'absent' && run.launcher === undefined)) {
		return `the owner of ${quote(ticket.label)} (pid ${String(ticket.pid)}) ended before its tree could be identified; end its tree, then delete ${files}`
	}
	if (run !== 'absent') {
		const members = readTree(run, Date.now())
		if (members === undefined || members.length > 0) {
			return `the owner of ${quote(ticket.label)} (pid ${String(ticket.pid)}) is gone and its tree reads as ${members === undefined ? 'unread' : `present: ${members.join(', ')}`}; launcher ${String(run.launcher)}, command ${String(run.command)}, files ${files}`
		}
		removeFile(join(root, renderName(sequence, RUN_SUFFIX)))
	}
	removeFile(join(root, renderName(sequence, TICKET_SUFFIX)))
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
	const name = renderName(entry.sequence, TICKET_SUFFIX)
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
		: `the endpoint of ticket ${renderName(first.sequence, TICKET_SUFFIX)} reported ${first.code}`
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
		removeFile(join(root, renderName(sequence, RUN_SUFFIX)))
		removeFile(join(root, renderName(sequence, TICKET_SUFFIX)))
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
 * Waits for a promise within a bound.
 *
 * @param promise - The promise.
 * @param budget - The longest wait in milliseconds.
 * @returns The promise's value; undefined when the budget runs out first.
 */
export async function waitForBound<T>(promise: Promise<T>, budget: number): Promise<T | undefined> {
	const timer = Promise.withResolvers<undefined>()
	const handle = setTimeout(() => timer.resolve(undefined), budget)
	try {
		return await Promise.race([promise, timer.promise])
	} finally {
		clearTimeout(handle)
	}
}

/**
 * Parses one sample line of a sampler.
 *
 * @param line - One line of the sampler's stdout: `1` or `0`, a `|`, and the rows.
 * @returns Whether a byte asked for the sample, with its gauges; undefined for a line without the
 * marker, such as {@link READY_LINE}.
 */
export function parseSample(line: string): Sample | undefined {
	const split = line.indexOf('|')
	if (split === -1) return undefined
	return { requested: line.slice(0, split) === '1', gauges: parseGauges(line.slice(split + 1)) }
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
 * @returns True when the write created the key's directory; false when the key existed or the host
 * refused the write.
 */
export function tryWriteOutcome(
	root: string,
	key: string,
	name: string,
	outcome: Outcome,
): boolean {
	try {
		return writeOutcome(root, key, name, outcome)
	} catch {
		return false
	}
}

/**
 * Samples one holder's process tree through one PowerShell child at below-normal priority.
 *
 * @remarks
 * The child starts at arrival and readies while the ticket waits, so a holder starts its command
 * only after the child can answer at once. A {@link Sampler.sample} call starts one sample at once;
 * after the first, the child also samples every {@link SAMPLE_MS}. The child exits when its stdin
 * closes, which {@link Sampler.stop} and the end of this process both do. A threshold, given for a
 * light run, calls the breach handler once with the seeds, on the first sample whose memory or
 * process count passes it.
 */
export class Sampler {
	readonly #child: ChildProcess
	readonly #closed: Promise<void>
	readonly #ready = Promise.withResolvers<boolean>()
	readonly #waiters = new Map<number, (gauges: readonly Gauge[] | undefined) => void>()
	readonly #threshold: Usage | undefined
	readonly #breach: (seeds: readonly number[]) => void
	#seeds: readonly number[] = []
	#floor: number | undefined
	#ceiling: number | undefined
	#tally: Tally = { cpu: new Map(), memory: 0, processes: 0 }
	#breached = false
	#asked = 0
	#answered = 0

	/**
	 * Starts the sampler.
	 *
	 * @param threshold - The light run's threshold, or undefined for a heavy run.
	 * @param breach - Called once with the seeds when a sample passes the threshold.
	 * @param command - The PowerShell text the child runs, for a proof. Default: {@link SAMPLER_COMMAND}.
	 */
	constructor(
		threshold: Usage | undefined,
		breach: (seeds: readonly number[]) => void,
		command = SAMPLER_COMMAND,
	) {
		this.#threshold = threshold
		this.#breach = breach
		this.#child = spawn(
			'powershell.exe',
			['-NoLogo', '-NoProfile', '-NonInteractive', '-Command', command],
			{ stdio: ['pipe', 'pipe', 'ignore'], windowsHide: true },
		)
		this.#closed = waitForClose(this.#child).then(() => {
			this.#ready.resolve(false)
			for (const resolve of this.#waiters.values()) resolve(undefined)
			this.#waiters.clear()
		})
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
	 * Waits until the child can sample at once, within a budget.
	 *
	 * @param budget - The longest wait in milliseconds.
	 * @returns A promise of true when the child readied; false when it ended first or the budget ran out.
	 */
	async ready(budget: number): Promise<boolean> {
		return (await waitForBound(this.#ready.promise, budget)) ?? false
	}

	/**
	 * Names the ids whose trees later samples read.
	 *
	 * @param seeds - The launcher id and, once known, the command id.
	 * @param floor - The earliest creation date the tree can carry.
	 */
	seed(seeds: readonly number[], floor: number): void {
		this.#seeds = seeds
		this.#floor = floor
	}

	/**
	 * Marks the launcher's exit: a later sample reads no member created after it and triggers no
	 * breach, so a reused id after the exit is never ended.
	 *
	 * @param ceiling - When the launcher exited, in epoch milliseconds.
	 */
	seal(ceiling: number): void {
		this.#ceiling = ceiling
	}

	/**
	 * Starts one sample at once.
	 *
	 * @param budget - The longest wait in milliseconds for the answer. Default: no bound.
	 * @returns A promise of every row the sample read, taken after this call; undefined when the
	 * child ends first, cannot take the request, or does not answer within the budget.
	 */
	sample(budget?: number): Promise<readonly Gauge[] | undefined> {
		const stdin = this.#child.stdin
		if (
			stdin === null ||
			stdin.writableEnded ||
			this.#child.pid === undefined ||
			this.#child.exitCode !== null ||
			this.#child.signalCode !== null
		) {
			return Promise.resolve(undefined)
		}
		this.#asked += 1
		const answer = Promise.withResolvers<readonly Gauge[] | undefined>()
		this.#waiters.set(this.#asked, answer.resolve)
		stdin.write(SAMPLE_BYTE)
		return budget === undefined ? answer.promise : waitForBound(answer.promise, budget)
	}

	/**
	 * Samples back to back until a time or an abort, one sample after the previous one answers.
	 *
	 * @param until - The epoch millisecond after which no further sample starts.
	 * @param signal - Ends the burst after the sample in flight.
	 * @returns A promise that resolves when the burst ends.
	 */
	async burst(until: number, signal: AbortSignal): Promise<void> {
		const rows = await this.sample()
		if (rows === undefined || signal.aborted || Date.now() >= until) return
		await this.burst(until, signal)
	}

	/**
	 * Closes the sampler's stdin, which ends it, and ends the child at once when it has not exited
	 * within {@link HANDOVER_MS}.
	 *
	 * @returns A promise that resolves when the sampler has exited.
	 */
	async stop(): Promise<void> {
		this.#child.stdin?.end()
		const exited = await waitForBound(
			this.#closed.then(() => true),
			HANDOVER_MS,
		)
		if (exited === undefined) await this.destroy()
	}

	/**
	 * Ends the child at once, for a sampler that did not ready and might not read its stdin.
	 *
	 * @returns A promise that resolves when the child has exited.
	 */
	destroy(): Promise<void> {
		this.#child.stdin?.end()
		this.#child.kill()
		return this.#closed
	}

	// A sample a byte asked for answers the oldest open request, because the child answers bytes in order.
	#read(line: string): void {
		if (line === READY_LINE) {
			this.#ready.resolve(true)
			return
		}
		const sample = parseSample(line)
		if (sample === undefined) return
		if (sample.requested) {
			this.#answered += 1
			this.#waiters.get(this.#answered)?.(sample.gauges)
			this.#waiters.delete(this.#answered)
		}
		if (this.#floor === undefined) return
		const members = selectMembers(
			sample.gauges,
			this.#seeds,
			this.#floor,
			this.#ceiling ?? Date.now(),
		)
		this.#tally = tallySample(this.#tally, members)
		const threshold = this.#threshold
		if (
			threshold === undefined ||
			this.#ceiling !== undefined ||
			this.#breached ||
			(this.#tally.memory <= threshold.memory && this.#tally.processes <= threshold.processes)
		) {
			return
		}
		this.#breached = true
		this.#breach(this.#seeds)
	}
}

/**
 * Runs the command as the holder, reads the tree at handover, and releases.
 *
 * @remarks
 * A measured holder starts its command after its sampler readies, samples the tree back to back
 * through the command's first {@link SAMPLE_MS} and once every {@link SAMPLE_MS} after, reads the
 * handover through one more sample, and writes the run's record before it releases, so the command's
 * next arrival reads it. When that sample lists a member, the handover reads, kills, and reads again
 * through fresh snapshots, each a second PowerShell. A sampler that does not ready within
 * {@link READY_MS} is destroyed, and the command runs unmeasured and records nothing. A record that
 * opened a key prunes the history after the release. A light holder lowers its own priority before
 * the spawn, and ends its tree when a sample passes the threshold.
 *
 * @param options - The run.
 * @param launcher - The launcher's path.
 * @param sequence - This process's sequence.
 * @param measure - What a measured holder needs, or undefined when no limits apply.
 * @param token - This process's endpoint, which holds after the run record exists and leaves before
 * the run record is removed.
 * @param sampler - The measured holder's sampler, started at arrival; the caller stops it.
 * @returns The launcher's code; 1 when a signal ended it; 69 when a light run passed its threshold;
 * 70 when the tree still reads as present or the ticket could not be removed; 75 when the launcher
 * could not start, the priority could not be lowered, or the run record could not be written.
 */
export async function runHolder(
	options: LaneOptions,
	launcher: string,
	sequence: number,
	measure?: Measure,
	token?: Token,
	sampler?: Sampler,
): Promise<number> {
	const { root } = options
	if (measure?.light !== undefined && !lowerPriority(process.pid)) {
		releaseTicket(root, sequence)
		console.error('lane: the host refused the light run its below-normal priority')
		return 75
	}
	const measured = sampler !== undefined && (await sampler.ready(READY_MS))
	if (sampler !== undefined && !measured) {
		await sampler.destroy()
		console.error(
			`lane: the sampler did not ready within ${String(READY_MS)} ms; ${quote(options.label)} runs unmeasured`,
		)
	}
	const active = measured ? sampler : undefined
	const started = Date.now()
	if (!tryWriteRun(root, sequence, { started, launcher: undefined, command: undefined })) {
		const refusal = releaseTicket(root, sequence)
		console.error(
			`lane: the run record ${renderName(sequence, RUN_SUFFIX)} under ${root} could not be written; ${refusal === undefined ? 'the ticket was removed' : `removing the ticket reported ${refusal}`}`,
		)
		return refusal === undefined ? 75 : HELD_CODE
	}
	token?.hold()
	const child = startLauncher(launcher, options)
	const id = child.pid
	if (id === undefined) {
		token?.leave()
		releaseTicket(root, sequence)
		console.error(`lane: ${quote(launcher)} could not start`)
		return 75
	}
	tryWriteRun(root, sequence, { started, launcher: id, command: undefined })
	const floor = started - CLOCK_ALLOWANCE_MS
	const early = new AbortController()
	active?.seed([id], floor)
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
			active?.seed([id, command], floor)
			void active?.burst(Date.now() + SAMPLE_MS, early.signal)
		})
	}
	const code = await closed
	early.abort()
	unwatch()
	const ended = Date.now()
	active?.seal(ended)
	const run = readRun(root, sequence)
	const rows = typeof run === 'object' ? await active?.sample(HANDOVER_MS) : undefined
	const hung = active !== undefined && typeof run === 'object' && rows === undefined
	if (hung) {
		await active.destroy()
		console.error(
			`lane: the sampler did not answer the handover within ${String(HANDOVER_MS)} ms; ${quote(options.label)} records nothing`,
		)
	}
	const quick =
		rows !== undefined && typeof run === 'object' ? selectTree(rows, run, ended) : undefined
	const sweep =
		typeof run !== 'object'
			? { gone: false, members: [] }
			: quick?.length === 0
				? { gone: true, members: [] }
				: sweepTree(() => readTree(run, ended), killMembers, KILL_BUDGET)
	const stopped = active?.stop()
	const breached = active?.breached === true
	const result = !sweep.gone ? HELD_CODE : breached ? BREACH_CODE : (code ?? 1)
	const opened =
		measure !== undefined &&
		active !== undefined &&
		!hung &&
		tryWriteOutcome(
			root,
			measure.key,
			renderOutcomeName(ended, measure.token),
			buildOutcome(active.tally, ended - started, result),
		)
	if (!sweep.gone) {
		console.error(
			`lane: the tree of ${quote(options.label)} still reads as ${sweep.members.length === 0 ? 'unread' : `present: ${sweep.members.join(', ')}`}; the lane stays held by ${renderName(sequence, TICKET_SUFFIX)} and ${renderName(sequence, RUN_SUFFIX)} under ${root}`,
		)
		await stopped
		return HELD_CODE
	}
	token?.leave()
	const refusal = releaseTicket(root, sequence)
	const prune = opened ? pruneHistory(root, Date.now()) : undefined
	if (prune !== undefined && prune.skipped.length > 0) {
		console.error(
			`lane: the history prune under ${root} skipped ${String(prune.skipped.length)} entries it could not list or remove, such as ${quote(prune.skipped.join(', '))}`,
		)
	}
	await stopped
	if (refusal !== undefined) {
		console.error(`lane: removing ${renderName(sequence, TICKET_SUFFIX)} reported ${refusal}`)
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
 * A `--solo` run is heavy whatever its command reads. A `mutate` run is keyed without its edits
 * file and seeded by its wrapped command; {@link decideDirectory} keeps it apart from the tickets of
 * its working directory.
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
	const key = renderKey(normalizeDirectory(process.cwd()), normalizeCommand(options.command))
	if (options.solo) return { limits, key, token, light: undefined }
	const mutation = extractMutation(options.command)
	const seed = readSeed(mutation ?? options.command)
	const light = classifyLight(seed, readOutcomes(options.root, key), limits)
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
		const sampler =
			measure === undefined
				? undefined
				: new Sampler(measure.light === undefined ? undefined : measure.limits.threshold, (seeds) =>
						killMembers(seeds),
					)
		try {
			await token.listen(renderEndpoint(root, tokenId))
			const edits =
				extractMutation(options.command) !== undefined || matchesRestore(options.command)
			writeStage(root, buildTicket(tokenId, options.label, measure?.light, options.solo, edits))
			const sequence = linkStage(root, tokenId)
			removeFile(join(root, `${tokenId}${STAGE_SUFFIX}`))
			token.publish()
			const unwatch = watchSignals(() => {
				removeFile(join(root, renderName(sequence, TICKET_SUFFIX)))
				removeFile(renderEndpoint(root, tokenId))
				process.exit(75)
			})
			const refusal = await waitForTurn(root, sequence, tokenId, measure?.limits)
			unwatch()
			if (refusal === undefined) {
				return await runHolder(options, launcher, sequence, measure, token, sampler)
			}
			removeFile(join(root, renderName(sequence, TICKET_SUFFIX)))
			console.error(`lane: ${refusal}`)
			return 75
		} finally {
			await sampler?.stop()
		}
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
		edits: ticket?.edits === true,
	}
	if (ticket === undefined || describeForeign(ticket) !== undefined) {
		return { ...fields, state: 'unread', holding: false }
	}
	const probe = new AbortController()
	const code = await parkOn(
		renderEndpoint(root, ticket.token),
		false,
		() => probe.abort(),
		probe.signal,
	)
	if (code === undefined) {
		const holding = existsSync(join(root, renderName(entry.sequence, RUN_SUFFIX)))
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
				`${renderName(row.sequence, TICKET_SUFFIX)} ${row.state} ${renderLane(row)}${row.edits ? ' edits' : ''}${row.holding ? ' holding' : ''} ${quote(row.label ?? 'unread')} pid ${String(row.pid)}`,
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
 * Parses a cap given in seconds.
 *
 * @param text - The value after `--cap`.
 * @returns The cap, or undefined when the text is absent, not a finite number, not above 0, or past
 * the launcher's limit.
 */
export function parseCap(text: string | undefined): number | undefined {
	const cap = Number(text ?? Number.NaN)
	return Number.isFinite(cap) && cap > 0 && cap <= MAX_CAP_SECONDS ? cap : undefined
}

/**
 * Validates a run's arguments.
 *
 * @param values - The flag values `parseArgs` read before the bare `--`.
 * @param command - The arguments after the bare `--`.
 * @returns The run, or undefined when a flag or the command is missing or out of range.
 */
export function readLaneOptions(
	values: Arguments['values'],
	command: readonly string[],
): LaneOptions | undefined {
	const label = typeof values.label === 'string' ? values.label : undefined
	const journal = typeof values.journal === 'string' ? values.journal : undefined
	const errors = typeof values.errors === 'string' ? values.errors : undefined
	const cap = parseCap(typeof values.cap === 'string' ? values.cap : undefined)
	if (
		label === undefined ||
		label === '' ||
		journal === undefined ||
		errors === undefined ||
		journal === errors ||
		cap === undefined ||
		command[0] === undefined ||
		command[0] === ''
	) {
		return undefined
	}
	return {
		root: resolveRoot(typeof values.root === 'string' ? values.root : undefined),
		label,
		journal,
		errors,
		cap,
		solo: values.solo === true,
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
	const command = end === -1 ? [] : argv.slice(end + 1)
	const parsed = parseArguments(end === -1 ? argv : argv.slice(0, end))
	if (!parsed.success) {
		console.error(`lane: ${parsed.error}; ${USAGE}`)
		return 64
	}
	const { values } = parsed.value
	const root = typeof values.root === 'string' ? values.root : undefined
	if (values.status === true) {
		if (end !== -1 || RUN_OPTIONS.some((name) => values[name] !== undefined)) {
			console.error(`lane: --status and a run are two modes; ${USAGE}`)
			return 64
		}
		return runStatus(resolveRoot(root), values.json === true)
	}
	const cap = typeof values.cap === 'string' ? values.cap : undefined
	if (cap !== undefined && parseCap(cap) === undefined) {
		console.error(
			`lane: --cap takes a number of seconds above 0 up to ${String(MAX_CAP_SECONDS)}, not ${quote(cap)}; ${USAGE}`,
		)
		return 64
	}
	const options = values.json === true ? undefined : readLaneOptions(values, command)
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

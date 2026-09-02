# Last changes: process

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `d272bbe`, merge base with `origin/main` `4457527`, layer L2, declared version 0.0.9, registry version 0.0.9.

## Commits since origin/main

```text
17597aa 2026-08-28 Update every dependency to the published latest
7c697c8 2026-08-28 Merge remote-tracking branch 'origin/main' into claude/orkestrel-npm-audit-deps-14ibta
83560b1 2026-08-28 Adopt the catalog and guide mirrors for the wave
54c8aa6 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
8350db2 2026-09-01 Apply the verified src-audit fixes
ae39a0c 2026-09-01 Adopt the renamed guide helpers in the parity test
93555dd 2026-09-02 Name the process child interface and state the server-contracts criterion
8aa5dce 2026-09-02 State who declares the server contracts and why SupervisorFace sits there
d272bbe 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md      |   2 +-
 package.json                     |   2 +-
 src/core/constants.ts            |  18 +++---
 src/core/errors.ts               |  19 ++++--
 src/core/types.ts                | 257 ++++++++++++++++++++++++++++++++++++++++---------------------------------------
 src/server/Process.ts            |  37 +++++-------
 src/server/ProcessManager.ts     |  26 ++++----
 src/server/Session.ts            |  24 ++++----
 src/server/Supervisor.ts         |  39 +++++-------
 src/server/cloners.ts            |  37 ++++++++++++
 src/server/helpers.ts            |  59 ++++--------------
 src/server/index.ts              |   1 +
 src/server/types.ts              |  57 ++++++++++++++----
 tests/guides.test.ts             |  31 +++++-----
 tests/src/server/cloners.test.ts |  35 +++++++++++
 tests/src/server/helpers.test.ts |  42 ++-----------
 16 files changed, 361 insertions(+), 325 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index b7ccaf9..f01ff80 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,11 +1,11 @@
-/** The default cooperative POSIX window in milliseconds between `SIGTERM` and `SIGKILL` during termination. */
+/** Names the default cooperative POSIX window in milliseconds between `SIGTERM` and `SIGKILL` during termination. */
 export const PROCESS_GRACE = 5_000
 
-/** The window in milliseconds a termination waits for the child's native exit after the final kill. */
+/** Names the window in milliseconds a termination waits for the child's native exit after the final kill. */
 export const PROCESS_CONFIRMATION = 5_000
 
 /**
- * The default window in milliseconds the package waits for the child's read ends to close after
+ * Names the default window in milliseconds the package waits for the child's read ends to close after
  * the child's native exit or after a termination this package initiated, before cutting them off.
  *
  * @remarks
@@ -21,22 +21,22 @@ export const PROCESS_CONFIRMATION = 5_000
  */
 export const PROCESS_DRAIN = 1_000
 
-/** The default maximum retained stderr tail in bytes for a supervised {@link ProcessInterface}. */
+/** Names the default maximum retained stderr tail in bytes for a supervised {@link ProcessInterface}. */
 export const PROCESS_EVIDENCE = 2_048
 
-/** The default soft high-water mark in bytes for a supervised {@link ProcessInterface} line backlog. */
+/** Names the default soft high-water mark in bytes for a supervised {@link ProcessInterface} line backlog. */
 export const PROCESS_BACKLOG = 10_485_760
 
-/** The default maximum captured bytes for a one-shot run's stdout and stderr, each. */
+/** Names the default maximum captured bytes for a one-shot run's stdout and stderr, each. */
 export const PROCESS_OUTPUT = 10_485_760
 
-/** The largest timer delay in milliseconds the host schedules without truncating it to one. */
+/** Names the largest timer delay in milliseconds the host schedules without truncating it to one. */
 export const PROCESS_TIMER = 2_147_483_647
 
-/** The executable extensions a Windows lookup applies when the environment declares no `PATHEXT`. */
+/** Lists the executable extensions a Windows lookup applies when the environment declares no `PATHEXT`. */
 export const PROCESS_PATHEXT = '.COM;.EXE;.BAT;.CMD'
 
-/** The machine-readable failure categories a {@link ProcessError} carries, in declaration order. */
+/** Lists the machine-readable failure categories a {@link ProcessError} carries, in declaration order. */
 export const PROCESS_ERROR_CODES = Object.freeze([
 	'spawn',
 	'timeout',
diff --git a/src/core/errors.ts b/src/core/errors.ts
index ba2457d..23b0374 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -7,16 +7,27 @@ import type {
 import { holds, isError } from '@orkestrel/contract'
 import { PROCESS_ERROR_CODES } from './constants.js'
 
-/** A child-process failure with a stable machine-readable category. */
+/**
+ * Represents a child-process failure with a stable machine-readable category.
+ *
+ * @example
+ * ```ts
+ * const error = new ProcessError('git status refused', {
+ * 	code: 'invalid',
+ * 	context: { command: 'git status' },
+ * })
+ * error.code // 'invalid'
+ * ```
+ */
 export class ProcessError extends Error {
 	override readonly name = 'ProcessError'
 	readonly code: ProcessErrorCode
 	readonly context?: ProcessErrorContext
-	/** The buffered run outcome, present when a one-shot run produced the failure. */
+	/** Carries the buffered run outcome, present when a one-shot run produced the failure. */
 	readonly result?: ExecuteResult
 
 	/**
-	 * Create a process error.
+	 * Creates a process error.
 	 *
 	 * @param message - Human-readable failure description
 	 * @param options - Machine-readable category, optional context, optional cause, and optional run result
@@ -42,7 +53,7 @@ export class ProcessError extends Error {
  * plain or property-only lookalike.
  *
  * @param value - The value to inspect
- * @returns True only for a `ProcessError` instance; false otherwise
+ * @returns True if the value is a `ProcessError` instance; false otherwise
  *
  * @example
  * ```ts
diff --git a/src/core/types.ts b/src/core/types.ts
index db13034..94e5992 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -2,7 +2,7 @@ import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkes
 import type { PROCESS_ERROR_CODES } from './constants.js'
 
 /**
- * The public contracts for `@orkestrel/process`: a typed child-process toolkit.
+ * Declares the public contracts for `@orkestrel/process`: a typed child-process toolkit.
  *
  * @remarks
  * The tiers divide by lifetime:
@@ -25,7 +25,7 @@ import type { PROCESS_ERROR_CODES } from './constants.js'
  */
 
 /**
- * One spawnable command: the executable, its argument vector, and optional environment overrides
+ * Represents one spawnable command: the executable, its argument vector, and optional environment overrides
  * and initial standard input.
  *
  * @remarks
@@ -48,7 +48,7 @@ export interface ProcessCommand {
 }
 
 /**
- * The observed terminal state of a child process: its exit code or the signal that ended it, and
+ * Represents the observed terminal state of a child process: its exit code or the signal that ended it, and
  * how its observation ended.
  *
  * @remarks
@@ -59,16 +59,16 @@ export interface ProcessCommand {
  * dropped lines and the drain bound cut stderr off.
  */
 export interface ProcessExit {
-	/** The exit code, or `null` when a signal ended the process. A spawn fault reports the host's negative errno for `Process` and `execute`. */
+	/** Holds the exit code, or `null` when a signal ended the process. A spawn fault reports the host's negative errno for `Process` and `execute`. */
 	readonly code: number | null
-	/** The terminating signal name, or `null` when the process exited on its own. */
+	/** Holds the terminating signal name, or `null` when the process exited on its own. */
 	readonly signal: string | null
-	/** True when the terminal moment arrived because the child's streams closed; false when the `drain` bound elapsed first and later diagnostics may have existed. */
+	/** Reports how the terminal moment arrived: true when the child's streams closed; false when the `drain` bound elapsed first and later diagnostics may have existed. */
 	readonly drained: boolean
 }
 
 /**
- * The resolved spawn form of one command: the executable to launch, the argument vector to pass,
+ * Represents the resolved spawn form of one command: the executable to launch, the argument vector to pass,
  * and whether the host receives that vector verbatim.
  *
  * @remarks
@@ -86,21 +86,21 @@ export interface SpawnInput {
 }
 
 /**
- * Lookup inputs for resolving a command file to an executable path.
+ * Supplies the lookup inputs for resolving a command file to an executable path.
  *
  * @remarks
  * `workspace` is searched before `PATH`, matching Windows command semantics. `environment` is the
  * child's effective environment, so the lookup reads the same `PATH` and `PATHEXT` the child will.
  */
 export interface ExecutableOptions {
-	/** The directory searched first. Default: the current working directory. */
+	/** Names the directory searched first. Default: the current working directory. */
 	readonly workspace?: string
-	/** The child's effective environment. Default: the parent process environment. */
+	/** Holds the child's effective environment. Default: the parent process environment. */
 	readonly environment?: Readonly<Record<string, string | undefined>>
 }
 
 /**
- * The push observation surface of a {@link ProcessInterface} — the moments a fire-and-forget
+ * Represents the push observation surface of a {@link ProcessInterface} — the moments a fire-and-forget
  * observer subscribes to, alongside the `lines` stream and the `exit` promise.
  *
  * @remarks
@@ -114,16 +114,16 @@ export interface ExecutableOptions {
  * routed to that handler, never emitted as this `error` event.
  */
 export type ProcessEventMap = {
-	/** A decoded standard-error chunk arrived. */
+	/** Reports a decoded standard-error chunk arrived. */
 	readonly stderr: readonly [chunk: string]
-	/** The child or its open standard-input channel reported a fault, carrying the host cause directly or through a `protocol` {@link ProcessError}. */
+	/** Reports a fault from the child or its open standard-input channel, carrying the host cause directly or through a `protocol` {@link ProcessError}. */
 	readonly error: readonly [error: unknown]
-	/** The child settled — its terminal state, delivered once. */
+	/** Reports the child settled — its terminal state, delivered once. */
 	readonly exit: readonly [exit: ProcessExit]
 }
 
 /**
- * Construction options for one supervised child process.
+ * Configures one supervised child process.
  *
  * @remarks
  * `grace` is the cooperative window between `SIGTERM` and `SIGKILL` on a POSIX host; Windows has no
@@ -151,26 +151,26 @@ export interface ProcessOptions {
 	readonly on?: EmitterHooks<ProcessEventMap>
 	readonly error?: EmitterErrorHandler
 	readonly command: ProcessCommand
-	/** The working directory the child runs in. */
+	/** Names the working directory the child runs in. */
 	readonly workspace: string
-	/** Cooperative POSIX window in milliseconds between `SIGTERM` and `SIGKILL`. Default: {@link PROCESS_GRACE}. */
+	/** Sets the cooperative POSIX window in milliseconds between `SIGTERM` and `SIGKILL`. Default: {@link PROCESS_GRACE}. */
 	readonly grace?: number
-	/** Milliseconds the package waits for the child's read ends to close after the native exit or an initiated termination, before cutting them off; `0` cuts them off as soon as the bound is armed. Default: {@link PROCESS_DRAIN}. */
+	/** Sets the milliseconds the package waits for the child's read ends to close after the native exit or an initiated termination, before cutting them off; `0` cuts them off as soon as the bound is armed. Default: {@link PROCESS_DRAIN}. */
 	readonly drain?: number
-	/** Maximum retained stderr tail in bytes. Default: {@link PROCESS_EVIDENCE}. */
+	/** Sets the maximum retained stderr tail in bytes. Default: {@link PROCESS_EVIDENCE}. */
 	readonly evidence?: number
-	/** Soft high-water mark in bytes for the unconsumed `lines` backlog; termination retains at most twice this value. Default: {@link PROCESS_BACKLOG}. */
+	/** Sets the soft high-water mark in bytes for the unconsumed `lines` backlog; termination retains at most twice this value. Default: {@link PROCESS_BACKLOG}. */
 	readonly backlog?: number
-	/** Milliseconds an unconfirmed {@link ProcessInterface.send} waits before resolving `false`. `0` or omitted disables the bound. */
+	/** Sets the milliseconds an unconfirmed {@link ProcessInterface.send} waits before resolving `false`. `0` or omitted disables the bound. */
 	readonly delivery?: number
 	/** If `true`, stdin stays open for {@link ProcessInterface.send}; if `false` or omitted, stdin closes after any initial `input`. */
 	readonly writable?: boolean
-	/** Aborting this signal terminates the child through the same bounded `stop`. */
+	/** Terminates the child through the same bounded `stop` when this signal aborts. */
 	readonly signal?: AbortSignal
 }
 
 /**
- * One supervised child process with framed output, a bounded backlog, and bounded termination.
+ * Represents one supervised child process with framed output, a bounded backlog, and bounded termination.
  *
  * @remarks
  * `lines` is pumped as soon as the child writes, and it is a single-consumer stream: each line goes
@@ -205,16 +205,16 @@ export interface ProcessOptions {
  * supervisor inside that window reads the terminal state here.
  */
 export interface ProcessInterface {
-	/** The host process id, fixed when construction returns, or `undefined` when the spawn produced none. */
+	/** Holds the host process id, fixed when construction returns, or `undefined` when the spawn produced none. */
 	readonly pid: number | undefined
-	/** The exit code the host recorded, or `null` while the child has not exited and when a signal ended it. A spawn fault reports the host's negative errno. */
+	/** Holds the exit code the host recorded, or `null` while the child has not exited and when a signal ended it. A spawn fault reports the host's negative errno. */
 	readonly code: number | null
-	/** The terminating signal name the host recorded, or `null` while the child has not exited and when it exited on its own. */
+	/** Holds the terminating signal name the host recorded, or `null` while the child has not exited and when it exited on its own. */
 	readonly signal: string | null
-	/** The typed lifecycle observation surface. */
+	/** Holds the typed lifecycle observation surface. */
 	readonly emitter: EmitterInterface<ProcessEventMap>
 	/**
-	 * The captured stdout lines, in arrival order, for one consumer, ending at the terminal moment.
+	 * Yields the captured stdout lines, in arrival order, for one consumer, ending at the terminal moment.
 	 *
 	 * @remarks
 	 * A line feed, a CRLF pair, and a bare carriage return each terminate a line, and a CRLF split
@@ -234,7 +234,7 @@ export interface ProcessInterface {
 	 */
 	readonly lines: AsyncIterable<string>
 	/**
-	 * The decoded byte-bounded stderr tail.
+	 * Holds the decoded byte-bounded stderr tail.
 	 *
 	 * @remarks
 	 * The live tail before the terminal moment and the frozen value after it, on every path — a
@@ -244,10 +244,10 @@ export interface ProcessInterface {
 	 * the tail as of the cutoff, and later diagnostics may have existed.
 	 */
 	readonly evidence: string
-	/** True when the `lines` stream omitted output because a retention bound was reached. */
+	/** Reports whether the `lines` stream omitted output because a retention bound was reached. */
 	readonly truncated: boolean
 	/**
-	 * True after the `exit` promise settled.
+	 * Reports whether the `exit` promise settled.
 	 *
 	 * @remarks
 	 * The terminal moment has arrived: `evidence` is frozen, `lines` has ended, and the
@@ -256,7 +256,7 @@ export interface ProcessInterface {
 	 */
 	readonly settled: boolean
 	/**
-	 * True after a termination began.
+	 * Reports whether a termination began.
 	 *
 	 * @remarks
 	 * Monotonic. It turns true when `stop`, `destroy`, or an abort of the `signal` option begins a
@@ -267,7 +267,7 @@ export interface ProcessInterface {
 	 */
 	readonly stopping: boolean
 	/**
-	 * The terminal child state, delivered once.
+	 * Settles with the terminal child state, delivered once.
 	 *
 	 * @remarks
 	 * Never rejects. It settles at the terminal moment: when the child's streams close, or when the
@@ -276,7 +276,7 @@ export interface ProcessInterface {
 	 */
 	readonly exit: Promise<ProcessExit>
 	/**
-	 * Write one line to the open standard-input channel.
+	 * Writes one line to the open standard-input channel.
 	 *
 	 * @remarks
 	 * Never rejects. `true` means the host accepted the bytes without reporting a fault; it does not
@@ -290,11 +290,11 @@ export interface ProcessInterface {
 	 * for bytes the package is about to discard.
 	 *
 	 * @param text - The line text without its trailing newline
-	 * @returns True when the host accepted the bytes without reporting a fault; false when the channel was closed, destroyed, ended, failed, or remained unconfirmed through `delivery`
+	 * @returns True if the host accepted the bytes without reporting a fault; false otherwise (the channel was closed, destroyed, ended, failed, or the write remained unconfirmed through `delivery`)
 	 */
 	send(text: string): Promise<boolean>
 	/**
-	 * Terminate the child process tree, await its observed exit, and reach the terminal moment.
+	 * Terminates the child process tree, awaits its observed exit, and reaches the terminal moment.
 	 *
 	 * @remarks
 	 * Never rejects. On Windows the whole tree is killed immediately through `taskkill`, with a
@@ -307,11 +307,11 @@ export interface ProcessInterface {
 	 * reaches the end of the stream instead of waiting on a child it already ended, and needs no
 	 * second call to release it.
 	 *
-	 * @returns True when the child's native exit was observed; false when the confirmation deadline elapsed without it
+	 * @returns True if the child's native exit was observed; false otherwise (the confirmation deadline elapsed without it)
 	 */
 	stop(): Promise<boolean>
 	/**
-	 * Stop the child, close its standard-input channel, reach the terminal moment, and destroy the
+	 * Stops the child, closes its standard-input channel, reaches the terminal moment, and destroys the
 	 * observation emitter.
 	 *
 	 * @remarks
@@ -328,7 +328,7 @@ export interface ProcessInterface {
 }
 
 /**
- * The push observation surface of a {@link SessionInterface} — the moments a byte-oriented observer
+ * Represents the push observation surface of a {@link SessionInterface} — the moments a byte-oriented observer
  * subscribes to, alongside the `ending` and `exit` promises.
  *
  * @remarks
@@ -351,18 +351,18 @@ export interface ProcessInterface {
  * `error` event.
  */
 export type SessionEventMap = {
-	/** A standard-output chunk arrived, as an owned `Uint8Array` the consumer may keep and mutate. */
+	/** Reports a standard-output chunk arrived, as an owned `Uint8Array` the consumer may keep and mutate. */
 	readonly stdout: readonly [chunk: Uint8Array]
-	/** A decoded standard-error chunk arrived. */
+	/** Reports a decoded standard-error chunk arrived. */
 	readonly stderr: readonly [chunk: string]
-	/** The child or its open standard-input channel reported a fault, carrying the host cause directly or through a `protocol` {@link ProcessError}. */
+	/** Reports a fault from the child or its open standard-input channel, carrying the host cause directly or through a `protocol` {@link ProcessError}. */
 	readonly error: readonly [error: unknown]
-	/** The child settled — its terminal state, delivered once. */
+	/** Reports the child settled — its terminal state, delivered once. */
 	readonly exit: readonly [exit: ProcessExit]
 }
 
 /**
- * Construction options for one raw byte session over a supervised child.
+ * Configures one raw byte session over a supervised child.
  *
  * @remarks
  * This is {@link ProcessOptions} without `backlog` and without `writable`. A session frames nothing
@@ -382,22 +382,22 @@ export interface SessionOptions {
 	readonly on?: EmitterHooks<SessionEventMap>
 	readonly error?: EmitterErrorHandler
 	readonly command: ProcessCommand
-	/** The working directory the child runs in. */
+	/** Names the working directory the child runs in. */
 	readonly workspace: string
-	/** Cooperative POSIX window in milliseconds between `SIGTERM` and `SIGKILL`. Default: {@link PROCESS_GRACE}. */
+	/** Sets the cooperative POSIX window in milliseconds between `SIGTERM` and `SIGKILL`. Default: {@link PROCESS_GRACE}. */
 	readonly grace?: number
-	/** Milliseconds the package waits for the child's read ends to close after the native exit or an initiated termination, before cutting them off; `0` cuts them off as soon as the bound is armed. Default: {@link PROCESS_DRAIN}. */
+	/** Sets the milliseconds the package waits for the child's read ends to close after the native exit or an initiated termination, before cutting them off; `0` cuts them off as soon as the bound is armed. Default: {@link PROCESS_DRAIN}. */
 	readonly drain?: number
-	/** Maximum retained stderr tail in bytes. Default: {@link PROCESS_EVIDENCE}. */
+	/** Sets the maximum retained stderr tail in bytes. Default: {@link PROCESS_EVIDENCE}. */
 	readonly evidence?: number
-	/** Milliseconds an unconfirmed {@link SessionInterface.write} waits before resolving `false`. `0` or omitted disables the bound. */
+	/** Sets the milliseconds an unconfirmed {@link SessionInterface.write} waits before resolving `false`. `0` or omitted disables the bound. */
 	readonly delivery?: number
-	/** Aborting this signal terminates the child through the same bounded `stop`. */
+	/** Terminates the child through the same bounded `stop` when this signal aborts. */
 	readonly signal?: AbortSignal
 }
 
 /**
- * One supervised child process read as raw bytes, with an open standard-input channel and bounded
+ * Represents one supervised child process read as raw bytes, with an open standard-input channel and bounded
  * termination.
  *
  * @remarks
@@ -429,16 +429,16 @@ export interface SessionOptions {
  * the id.
  */
 export interface SessionInterface {
-	/** The host process id, fixed when construction returns, or `undefined` when the spawn produced none. */
+	/** Holds the host process id, fixed when construction returns, or `undefined` when the spawn produced none. */
 	readonly pid: number | undefined
-	/** The exit code the host recorded, or `null` while the child has not exited and when a signal ended it. A spawn fault reports the host's negative errno. */
+	/** Holds the exit code the host recorded, or `null` while the child has not exited and when a signal ended it. A spawn fault reports the host's negative errno. */
 	readonly code: number | null
-	/** The terminating signal name the host recorded, or `null` while the child has not exited and when it exited on its own. */
+	/** Holds the terminating signal name the host recorded, or `null` while the child has not exited and when it exited on its own. */
 	readonly signal: string | null
-	/** The typed lifecycle observation surface. */
+	/** Holds the typed lifecycle observation surface. */
 	readonly emitter: EmitterInterface<SessionEventMap>
 	/**
-	 * The decoded byte-bounded stderr tail.
+	 * Holds the decoded byte-bounded stderr tail.
 	 *
 	 * @remarks
 	 * The live tail before the terminal moment and the frozen value after it, on every path — a
@@ -448,7 +448,7 @@ export interface SessionInterface {
 	 */
 	readonly evidence: string
 	/**
-	 * True after the `exit` promise settled.
+	 * Reports whether the `exit` promise settled.
 	 *
 	 * @remarks
 	 * The terminal moment has arrived: `evidence` is frozen, no further `stdout` or `stderr` event
@@ -457,7 +457,7 @@ export interface SessionInterface {
 	 */
 	readonly settled: boolean
 	/**
-	 * True after a termination began.
+	 * Reports whether a termination began.
 	 *
 	 * @remarks
 	 * Monotonic. It turns true when `stop`, `destroy`, or an abort of the `signal` option begins a
@@ -467,7 +467,7 @@ export interface SessionInterface {
 	 */
 	readonly stopping: boolean
 	/**
-	 * The child's own ending, awaited without the terminal moment's drain window.
+	 * Settles at the child's own ending, awaited without the terminal moment's drain window.
 	 *
 	 * @remarks
 	 * Never rejects, and resolves no value: `code` and `signal` carry the terminal facts as soon as
@@ -480,7 +480,7 @@ export interface SessionInterface {
 	 */
 	readonly ending: Promise<void>
 	/**
-	 * The terminal child state, delivered once.
+	 * Settles with the terminal child state, delivered once.
 	 *
 	 * @remarks
 	 * Never rejects. It settles at the terminal moment: when the child's streams close, or when the
@@ -489,7 +489,7 @@ export interface SessionInterface {
 	 */
 	readonly exit: Promise<ProcessExit>
 	/**
-	 * Write raw bytes to the open standard-input channel.
+	 * Writes raw bytes to the open standard-input channel.
 	 *
 	 * @remarks
 	 * Never rejects, and adds no framing: the bytes reach the child exactly as given, with no
@@ -506,11 +506,11 @@ export interface SessionInterface {
 	 * promise settles: bytes mutated inside that window are the bytes the child receives.
 	 *
 	 * @param bytes - The payload to write, already framed by the caller
-	 * @returns True when the host accepted the bytes without reporting a fault; false when the channel was closed, destroyed, ended, failed, or remained unconfirmed through `delivery`
+	 * @returns True if the host accepted the bytes without reporting a fault; false otherwise (the channel was closed, destroyed, ended, failed, or the write remained unconfirmed through `delivery`)
 	 */
 	write(bytes: Uint8Array): Promise<boolean>
 	/**
-	 * Close the standard-input channel and leave the child running.
+	 * Closes the standard-input channel and leaves the child running.
 	 *
 	 * @remarks
 	 * Never rejects, and terminates nothing: `stopping` stays false, no signal is sent, no drain
@@ -531,7 +531,7 @@ export interface SessionInterface {
 	 */
 	end(): Promise<void>
 	/**
-	 * Terminate the child process tree, await its observed exit, and reach the terminal moment.
+	 * Terminates the child process tree, awaits its observed exit, and reaches the terminal moment.
 	 *
 	 * @remarks
 	 * Never rejects. On Windows the whole tree is killed immediately through `taskkill`, with a
@@ -542,11 +542,11 @@ export interface SessionInterface {
 	 * `stdout` and `stderr` events stop, and `exit` settles. A caller that stops a child and keeps
 	 * listening therefore reaches the end of the stream and needs no second call to release it.
 	 *
-	 * @returns True when the child's native exit was observed; false when the confirmation deadline elapsed without it
+	 * @returns True if the child's native exit was observed; false otherwise (the confirmation deadline elapsed without it)
 	 */
 	stop(): Promise<boolean>
 	/**
-	 * Stop the child, close its standard-input channel, reach the terminal moment, and destroy the
+	 * Stops the child, closes its standard-input channel, reaches the terminal moment, and destroys the
 	 * observation emitter.
 	 *
 	 * @remarks
@@ -563,7 +563,7 @@ export interface SessionInterface {
 }
 
 /**
- * The settled outcome of a one-shot run: the buffered output and the terminal state.
+ * Represents the settled outcome of a one-shot run: the buffered output and the terminal state.
  *
  * @remarks
  * `failed` is `true` when the run timed out, was aborted, ended on a host fault, was ended by a
@@ -577,27 +577,28 @@ export interface SessionInterface {
  * the host's negative errno for `execute`. A spawn fault reports `null` for `executeSync`.
  */
 export interface ExecuteResult {
-	/** The command line that was run, for diagnostics. */
+	/** Holds the command line that was run, for diagnostics. */
 	readonly command: string
-	/** The captured standard output, byte-bounded by `limit`. */
+	/** Holds the captured standard output, byte-bounded by `limit`. */
 	readonly stdout: string
-	/** The captured standard error, byte-bounded by `limit`. */
+	/** Holds the captured standard error, byte-bounded by `limit`. */
 	readonly stderr: string
-	/** The exit code. A spawn fault reports the host's negative errno for `execute` and `null` for `executeSync`. */
+	/** Holds the exit code. A spawn fault reports the host's negative errno for `execute` and `null` for `executeSync`. */
 	readonly code: number | null
+	/** Holds the terminating signal name, or `null` when the process exited on its own. */
 	readonly signal: string | null
-	/** True if the run did not complete successfully. */
+	/** Reports whether the run failed to complete successfully. */
 	readonly failed: boolean
-	/** True if the run's `timeout` elapsed before completion. */
+	/** Reports whether the run's `timeout` elapsed before completion. */
 	readonly expired: boolean
-	/** True if the caller's `signal` aborted the run before completion. */
+	/** Reports whether the caller's `signal` aborted the run before completion. */
 	readonly aborted: boolean
-	/** True when either captured stream omitted output because it exceeded `limit`. */
+	/** Reports whether either captured stream omitted output because it exceeded `limit`. */
 	readonly truncated: boolean
 }
 
 /**
- * The captured bytes and terminal facts one settled {@link ExecuteResult} is built from.
+ * Represents the captured bytes and terminal facts one settled {@link ExecuteResult} is built from.
  *
  * @remarks
  * Each byte field is trimmed to `limit` on a code-point boundary when the result is built, so a
@@ -605,13 +606,15 @@ export interface ExecuteResult {
  * that ended the run, when one did; its presence alone marks the run failed.
  */
 export interface ExecuteInput {
-	/** The diagnostic command line. */
+	/** Holds the diagnostic command line. */
 	readonly command: string
-	/** The retained standard-output bytes. */
+	/** Holds the retained standard-output bytes. */
 	readonly stdout: Uint8Array
-	/** The retained standard-error bytes. */
+	/** Holds the retained standard-error bytes. */
 	readonly stderr: Uint8Array
+	/** Holds the exit code. A spawn fault reports the host's negative errno for `execute` and `null` for `executeSync`. */
 	readonly code: number | null
+	/** Holds the terminating signal name, or `null` when the process exited on its own. */
 	readonly signal: string | null
 	/** If `true`, the run's own timeout elapsed; if `false`, it did not. */
 	readonly expired: boolean
@@ -619,14 +622,14 @@ export interface ExecuteInput {
 	readonly aborted: boolean
 	/** If `true`, a stream exceeded `limit`; if `false`, neither did. */
 	readonly truncated: boolean
-	/** The maximum retained bytes for each stream. */
+	/** Sets the maximum retained bytes for each stream. */
 	readonly limit: number
-	/** The host fault that ended the run, when one did. */
+	/** Carries the host fault that ended the run, when one did. */
 	readonly cause?: unknown
 }
 
 /**
- * Options for a one-shot run.
+ * Configures a one-shot run.
  *
  * @remarks
  * A run is a fire-and-collect function, not a lifecycle entity, so it carries no emitter. `strict`
@@ -641,26 +644,26 @@ export interface ExecuteInput {
  * that throws strands no process.
  */
 export interface ExecuteOptions {
-	/** The working directory. Default: the current working directory. */
+	/** Names the working directory. Default: the current working directory. */
 	readonly workspace?: string
-	/** Environment overrides merged over the parent environment; an `undefined` value unsets a key. */
+	/** Holds environment overrides merged over the parent environment; an `undefined` value unsets a key. */
 	readonly environment?: Readonly<Record<string, string | undefined>>
-	/** Standard-input payload written to the child, including any NUL characters. */
+	/** Holds the standard-input payload written to the child, including any NUL characters. */
 	readonly input?: string
-	/** Milliseconds before the child is terminated. `0` or omitted disables the timeout. */
+	/** Sets the milliseconds before the child is terminated. `0` or omitted disables the timeout. */
 	readonly timeout?: number
-	/** Cooperative POSIX window between `SIGTERM` and `SIGKILL` when terminating. Default: {@link PROCESS_GRACE}. */
+	/** Sets the cooperative POSIX window between `SIGTERM` and `SIGKILL` when terminating. Default: {@link PROCESS_GRACE}. */
 	readonly grace?: number
-	/** Aborting this signal terminates the run and reports `aborted`. */
+	/** Terminates the run and reports `aborted` when this signal aborts. */
 	readonly signal?: AbortSignal
-	/** If `false`, resolve with the result on failure instead of rejecting. Default: `true`. */
+	/** If `true`, reject on failure; if `false`, resolve with the result instead. Default: `true`. */
 	readonly strict?: boolean
-	/** Maximum captured bytes for stdout and for stderr, each. Default: {@link PROCESS_OUTPUT}. */
+	/** Sets the maximum captured bytes for stdout and for stderr, each. Default: {@link PROCESS_OUTPUT}. */
 	readonly limit?: number
 }
 
 /**
- * Options for a synchronous one-shot run.
+ * Configures a synchronous one-shot run.
  *
  * @remarks
  * The synchronous host offers neither a cooperative termination window nor in-flight cancellation,
@@ -671,48 +674,48 @@ export interface ExecuteOptions {
  * `input` is standard-input payload and carries no NUL restriction.
  */
 export interface ExecuteSyncOptions {
-	/** The working directory. Default: the current working directory. */
+	/** Names the working directory. Default: the current working directory. */
 	readonly workspace?: string
-	/** Environment overrides merged over the parent environment; an `undefined` value unsets a key. */
+	/** Holds environment overrides merged over the parent environment; an `undefined` value unsets a key. */
 	readonly environment?: Readonly<Record<string, string | undefined>>
-	/** Standard-input payload written to the child, including any NUL characters. */
+	/** Holds the standard-input payload written to the child, including any NUL characters. */
 	readonly input?: string
-	/** Milliseconds before the host kills the root process alone. `0` or omitted disables the timeout. */
+	/** Sets the milliseconds before the host kills the root process alone. `0` or omitted disables the timeout. */
 	readonly timeout?: number
-	/** If `false`, return the result on failure instead of throwing. Default: `true`. */
+	/** If `true`, throw on failure; if `false`, return the result instead. Default: `true`. */
 	readonly strict?: boolean
-	/** Maximum captured bytes for stdout and for stderr, each. Default: {@link PROCESS_OUTPUT}. */
+	/** Sets the maximum captured bytes for stdout and for stderr, each. Default: {@link PROCESS_OUTPUT}. */
 	readonly limit?: number
 }
 
 /**
- * Options for a detached fire-and-forget spawn.
+ * Configures a detached fire-and-forget spawn.
  *
  * @remarks
  * A detached child owns no stdio and is never awaited, so the contract carries only the directory it
  * starts in. Its environment comes from the command's own `environment` and `isolated`.
  */
 export interface DetachOptions {
-	/** The working directory. Default: the current working directory. */
+	/** Names the working directory. Default: the current working directory. */
 	readonly workspace?: string
 }
 
 /**
- * The push observation surface of a {@link ProcessManagerInterface} — the fleet-level moments a
+ * Represents the push observation surface of a {@link ProcessManagerInterface} — the fleet-level moments a
  * fire-and-forget observer subscribes to.
  *
  * @remarks
  * Declared as a `type` alias so it satisfies the emitter's `EventMap` constraint structurally.
  */
 export type ProcessManagerEventMap = {
-	/** A child was launched under its id. */
+	/** Reports a child launched under its id. */
 	readonly launch: readonly [id: string]
-	/** A child settled and left the registry — its id and terminal state. */
+	/** Reports a child settled and left the registry — its id and terminal state. */
 	readonly exit: readonly [id: string, exit: ProcessExit]
 }
 
 /**
- * Construction options for a {@link ProcessManagerInterface}.
+ * Configures a {@link ProcessManagerInterface}.
  *
  * @remarks
  * `on` installs initial {@link ProcessManagerEventMap} listeners and `error` receives isolated
@@ -724,7 +727,7 @@ export interface ProcessManagerOptions {
 }
 
 /**
- * A keyed registry of live supervised child processes.
+ * Represents a keyed registry of live supervised child processes.
  *
  * @remarks
  * A child that settles removes itself from the registry, so `count` and `processes` reflect only
@@ -736,25 +739,25 @@ export interface ProcessManagerOptions {
  * the `launch` and `exit` moments across every child.
  */
 export interface ProcessManagerInterface {
-	/** The typed fleet-level observation surface. */
+	/** Holds the typed fleet-level observation surface. */
 	readonly emitter: EmitterInterface<ProcessManagerEventMap>
-	/** The number of live children. */
+	/** Counts the live children. */
 	readonly count: number
 	/**
-	 * The live child under `id`, or `undefined` when none is.
+	 * Returns the live child under `id`, or `undefined` when none is.
 	 *
 	 * @param id - The registry key
 	 * @returns The child, or `undefined`
 	 */
 	process(id: string): ProcessInterface | undefined
 	/**
-	 * A snapshot of every live child.
+	 * Returns a snapshot of every live child.
 	 *
 	 * @returns The live children in launch order
 	 */
 	processes(): readonly ProcessInterface[]
 	/**
-	 * Spawn and register one child under `id`.
+	 * Spawns and registers one child under `id`.
 	 *
 	 * @remarks
 	 * Every option is read before the child is spawned, so a caller's own option getter runs while
@@ -772,27 +775,27 @@ export interface ProcessManagerInterface {
 	 */
 	launch(id: string, options: ProcessOptions): ProcessInterface
 	/**
-	 * Terminate the named children and await their exit.
+	 * Terminates the named children and awaits their exit.
 	 *
 	 * @param ids - The registry keys to stop
-	 * @returns True when every named child was live and its exit was confirmed; false otherwise
+	 * @returns True if every named child was live and its exit was confirmed; false otherwise
 	 */
 	stop(ids: readonly string[]): Promise<boolean>
 	/**
-	 * Terminate one child and await its exit.
+	 * Terminates one child and awaits its exit.
 	 *
 	 * @param id - The registry key to stop
-	 * @returns True when the child was live and its exit was confirmed; false when the id was not live or the confirmation deadline elapsed
+	 * @returns True if the child was live and its exit was confirmed; false otherwise (the id was not live, or the confirmation deadline elapsed)
 	 */
 	stop(id: string): Promise<boolean>
 	/**
-	 * Terminate every live child and await their exit.
+	 * Terminates every live child and awaits their exit.
 	 *
 	 * @returns A promise that resolves after every child stops
 	 */
 	stop(): Promise<void>
 	/**
-	 * Stop every child, then destroy the registry emitter last.
+	 * Stops every child, then destroys the registry emitter last.
 	 *
 	 * @remarks
 	 * Always resolves, and refuses a later `launch` with a {@link ProcessError} coded `protocol`.
@@ -805,31 +808,31 @@ export interface ProcessManagerInterface {
 	destroy(): Promise<void>
 }
 
-/** The machine-readable {@link ProcessError} categories, derived from {@link PROCESS_ERROR_CODES}. */
+/** Names the machine-readable {@link ProcessError} categories, derived from {@link PROCESS_ERROR_CODES}. */
 export type ProcessErrorCode = (typeof PROCESS_ERROR_CODES)[number]
 
-/** Structured context carried by a {@link ProcessError}. */
+/** Represents structured context carried by a {@link ProcessError}. */
 export interface ProcessErrorContext {
-	/** The registry id involved, for a manager failure. */
+	/** Names the registry id involved, for a manager failure. */
 	readonly id?: string
-	/** The command line involved, for a run or spawn failure. */
+	/** Names the command line involved, for a run or spawn failure. */
 	readonly command?: string
-	/** The child's exit code, when one was observed. */
+	/** Holds the child's exit code, when one was observed. */
 	readonly code?: number | null
-	/** The terminating signal, when one ended the child. */
+	/** Names the terminating signal, when one ended the child. */
 	readonly signal?: string | null
-	/** The rejected public input, for an input-validation failure. */
+	/** Carries the rejected public input, for an input-validation failure. */
 	readonly value?: unknown
 }
 
-/** Construction options for a {@link ProcessError}. */
+/** Configures a {@link ProcessError}. */
 export interface ProcessErrorOptions {
-	/** The stable machine-readable category. */
+	/** Names the stable machine-readable category. */
 	readonly code: ProcessErrorCode
-	/** Structured detail about the failure. */
+	/** Carries structured detail about the failure. */
 	readonly context?: ProcessErrorContext
-	/** The underlying cause, when one exists. */
+	/** Carries the underlying cause, when one exists. */
 	readonly cause?: unknown
-	/** The buffered run outcome, present when an {@link ExecuteResult} produced the failure. */
+	/** Carries the buffered run outcome, present when an {@link ExecuteResult} produced the failure. */
 	readonly result?: ExecuteResult
 }
diff --git a/src/server/index.ts b/src/server/index.ts
index a3078b5..631fb9c 100644
--- a/src/server/index.ts
+++ b/src/server/index.ts
@@ -1,4 +1,5 @@
 export * from './types.js'
+export * from './cloners.js'
 export * from './helpers.js'
 export * from './factories.js'
 export * from './Process.js'
diff --git a/src/server/types.ts b/src/server/types.ts
index 054c65e..47fc80a 100644
--- a/src/server/types.ts
+++ b/src/server/types.ts
@@ -1,14 +1,19 @@
 /**
- * The Node-side contracts of `@orkestrel/process/server`.
+ * Declares the Node-side contracts of `@orkestrel/process/server`.
  *
  * @remarks
- * The host-independent contracts live in `@orkestrel/process`. This module declares only what a
- * Node child process boundary requires, which the published contracts cannot express without
- * naming `node:child_process` types.
+ * The host-independent contracts live in `@orkestrel/process`. This module declares the contracts
+ * the Node-side face needs, each for its own reason rather than for one shared one:
+ * `ProcessChildInterface` types the child boundary the termination helpers drive and names
+ * `NodeJS.Signals`, which a host-independent contract cannot; `SupervisorFace` names no Node
+ * type, but its one consumer is the Node-only `Supervisor` engine, so it sits with the face that
+ * constructs one.
  */
 
+import type { ProcessExit } from '@src/core'
+
 /**
- * The child boundary the termination helpers drive.
+ * Represents the child boundary the termination helpers drive.
  *
  * @remarks
  * A `ChildProcess` satisfies this structurally, and so does any object carrying the same
@@ -22,22 +27,22 @@
  * the route that reaches it: `killProcess` signals the negated `pid` first and falls back to `kill`
  * when the host reports that no group owns that pid.
  */
-export interface ProcessChild {
-	/** The process id the host assigned, or `undefined` when the spawn never produced one. */
+export interface ProcessChildInterface {
+	/** Holds the process id the host assigned, or `undefined` when the spawn never produced one. */
 	readonly pid?: number | undefined
-	/** The exit code, or `null` while the process is live or a signal ended it. */
+	/** Holds the exit code, or `null` while the process is live or a signal ended it. */
 	readonly exitCode: number | null
-	/** The terminating signal name, or `null` while the process is live or it exited on its own. */
+	/** Holds the terminating signal name, or `null` while the process is live or it exited on its own. */
 	readonly signalCode: string | null
 	/**
-	 * Deliver one signal to the process.
+	 * Delivers one signal to the process.
 	 *
 	 * @param signal - The signal to deliver
-	 * @returns True when the host accepted the signal; false otherwise
+	 * @returns True if the host accepted the signal; false otherwise
 	 */
 	kill(signal: NodeJS.Signals): boolean
 	/**
-	 * Register a one-shot listener for the native exit or stream close.
+	 * Registers a one-shot listener for the native exit or stream close.
 	 *
 	 * @param event - The `exit` or `close` event name
 	 * @param listener - The listener invoked after the selected event
@@ -45,7 +50,7 @@ export interface ProcessChild {
 	 */
 	once(event: 'exit' | 'close', listener: () => void): unknown
 	/**
-	 * Release one previously registered exit or close listener.
+	 * Releases one previously registered exit or close listener.
 	 *
 	 * @remarks
 	 * `waitForExit` releases its `exit` listener, and `waitForClose` releases its `close` listener, so
@@ -57,3 +62,29 @@ export interface ProcessChild {
 	 */
 	off(event: 'exit' | 'close', listener: () => void): unknown
 }
+
+/**
+ * Represents the composing face's callbacks for each lifecycle moment of one supervised child.
+ *
+ * @remarks
+ * `Process` and `Session` each construct one and hand it to the supervision engine, which captures
+ * every callback before anything is read or spawned, so the first moment the child can produce
+ * already has somewhere to go. `chunk` receives each decoded standard-error fragment, `fault` the
+ * host error that ended the run, `close` the moment the read channels closed, `terminal` the frozen
+ * exit state, and `teardown` the release of whatever the face still holds. `relieve` is optional
+ * because only a face carrying a standard-input channel reports backpressure relief.
+ */
+export interface SupervisorFace {
+	/** Receives one decoded standard-error fragment. */
+	readonly chunk: (text: string) => void
+	/** Receives the host error that ended the run. */
+	readonly fault: (cause: unknown) => void
+	/** Reports that a pending standard-input write can proceed, for a face carrying a channel. */
+	readonly relieve?: () => void
+	/** Reports that the child's read channels closed. */
+	readonly close: () => void
+	/** Receives the frozen terminal state. */
+	readonly terminal: (exit: ProcessExit) => void
+	/** Releases whatever the face still holds after the terminal moment. */
+	readonly teardown: () => void
+}
```

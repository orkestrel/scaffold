# Last changes: queue

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `00d0352`, merge base with `origin/main` `869cc9f`, layer L3, declared version 0.0.11, registry version 0.0.11.

## Commits since origin/main

```text
c121bb6 2026-08-28 Update every dependency to the published latest
96ac8c4 2026-08-28 Adopt the catalog and guide mirrors for the wave
a206fb0 2026-09-01 Apply the verified src-audit fixes
42fd1fe 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
1cecc7b 2026-09-01 Describe the option leaves as the code shares them
f602310 2026-09-01 Adopt the renamed guide helpers in the parity test
38da78b 2026-09-02 Point the README at the guide the package ships
00d0352 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md           |  17 +++---
 README.md                             |   2 +-
 package.json                          |   6 +-
 src/core/Queue.ts                     | 232 ++++++++++++++++++++++++++++++++++++--------------------------------------
 src/core/errors.ts                    |   9 +--
 src/core/factories.ts                 |   6 +-
 src/core/helpers.ts                   |  67 ++++++++++++++++++++++
 src/core/index.ts                     |   1 +
 src/core/stores/DatabaseQueueStore.ts |  12 ++--
 src/core/stores/MemoryQueueStore.ts   |  23 ++++----
 src/core/types.ts                     |  73 +++++++++++++----------
 src/core/validators.ts                |  50 ++++++++++++----
 tests/guides.test.ts                  |  22 +++----
 tests/src/core/helpers.test.ts        | 105 ++++++++++++++++++++++++++++++++++
 tests/src/core/validators.test.ts     |  58 +++++++++++++++++++
 15 files changed, 477 insertions(+), 206 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 8d53b52..b60f964 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -1,7 +1,7 @@
 import type { QueueErrorContext, QueueErrorOptions } from './types.js'
 
 /**
- * Error carrying a machine-readable queue category and optional context.
+ * Represents a failure carrying a machine-readable queue category and optional context.
  *
  * @example
  * ```ts
@@ -14,7 +14,7 @@ export class QueueError extends Error {
 	readonly context: QueueErrorContext | undefined
 
 	/**
-	 * Create a queue error.
+	 * Creates a queue error.
 	 *
 	 * @param message - Human-readable failure description
 	 * @param options - Machine-readable category, optional context, and optional cause
@@ -28,10 +28,11 @@ export class QueueError extends Error {
 }
 
 /**
- * Determine whether an unknown value is a {@link QueueError}.
+ * Determines whether an unknown value is a {@link QueueError}.
  *
  * @param value - The value to inspect
- * @returns `true` only for a `QueueError`; hostile values return `false`
+ * @returns True if the value is a real `QueueError` instance; false otherwise, including for
+ *   a hostile value
  *
  * @example
  * ```ts
diff --git a/src/core/index.ts b/src/core/index.ts
index 208b1a0..f81d789 100644
--- a/src/core/index.ts
+++ b/src/core/index.ts
@@ -1,6 +1,7 @@
 export * from './types.js'
 export * from './errors.js'
 export * from './validators.js'
+export * from './helpers.js'
 export * from './Queue.js'
 export * from './stores/DatabaseQueueStore.js'
 export * from './stores/MemoryQueueStore.js'
diff --git a/src/core/types.ts b/src/core/types.ts
index 1b717f3..9c644cb 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1,7 +1,7 @@
 import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'
 
 /**
- * Machine-readable queue failure categories.
+ * Represents the machine-readable queue failure categories.
  *
  * @example
  * ```ts
@@ -20,7 +20,17 @@ export type QueueCode =
 	| 'cleanup'
 
 /**
- * Structured context carried by a {@link QueueError}.
+ * Represents the construction and per-entry option keys a queue validates.
+ *
+ * @example
+ * ```ts
+ * const option: QueueOption = 'concurrency'
+ * ```
+ */
+export type QueueOption = 'id' | 'concurrency' | 'retries' | 'timeout' | 'signal'
+
+/**
+ * Represents the structured context carried by a {@link QueueError}.
  *
  * @example
  * ```ts
@@ -29,13 +39,13 @@ export type QueueCode =
  */
 export interface QueueErrorContext {
 	readonly id?: string
-	readonly option?: 'id' | 'concurrency' | 'retries' | 'timeout' | 'signal'
+	readonly option?: QueueOption
 	readonly operation?: 'save' | 'remove' | 'load' | 'clear'
 	readonly value?: unknown
 }
 
 /**
- * Construction options for a {@link QueueError}.
+ * Represents the construction options for a {@link QueueError}.
  *
  * @example
  * ```ts
@@ -49,7 +59,7 @@ export interface QueueErrorOptions {
 }
 
 /**
- * The push observation surface of a {@link QueueInterface} (AGENTS §13) — the lifecycle
+ * Represents the push observation surface of a {@link QueueInterface} (AGENTS §13) — the lifecycle
  * moments a fire-and-forget observer (logging, metrics, tracing) subscribes to, ALONGSIDE
  * the per-entry `enqueue` promise.
  *
@@ -76,24 +86,24 @@ export interface QueueErrorOptions {
  * ```
  */
 export type QueueEventMap<TResult> = {
-	/** An entry was accepted (and durably persisted, when a store is set) — its id. */
+	/** Signals that an entry was accepted (and durably persisted, when a store is set) — its id. */
 	readonly enqueue: readonly [id: string]
-	/** An attempt began running — the entry's id (after it was dequeued, in flight). */
+	/** Signals that an attempt began running — the entry's id (after it was dequeued, in flight). */
 	readonly start: readonly [id: string]
-	/** A failed attempt is being retried — the entry id + completed-attempt count. */
+	/** Signals that a failed attempt is being retried — the entry id + completed-attempt count. */
 	readonly retry: readonly [id: string, attempt: number]
-	/** An entry settled successfully — its id + the resolved result. */
+	/** Signals that an entry settled successfully — its id + the resolved result. */
 	readonly success: readonly [id: string, result: TResult]
-	/** An entry settled with a terminal failure — its id + the error (always `unknown`). */
+	/** Signals that an entry settled with a terminal failure — its id + the error (always `unknown`). */
 	readonly failure: readonly [id: string, error: unknown]
-	/** The queue was aborted — its coded abort error. */
+	/** Signals that the queue was aborted — its coded abort error. */
 	readonly abort: readonly [reason: unknown]
-	/** The queue transitioned to no reserved live ids (drained). */
+	/** Signals that the queue transitioned to no reserved live ids (drained). */
 	readonly drain: readonly []
 }
 
 /**
- * The per-attempt execution handle a queue handler receives.
+ * Represents the per-attempt execution handle a queue handler receives.
  *
  * @example
  * ```ts
@@ -103,7 +113,7 @@ export type QueueEventMap<TResult> = {
  */
 export interface QueueExecution {
 	/**
-	 * The entry's stable id — equal across every attempt and across a crash-replay
+	 * Holds the entry's stable id — equal across every attempt and across a crash-replay
 	 * (`restore` re-runs an entry under its original id). Durable persistence is
 	 * at-least-once (a crash between handler-success and the store's `remove`, or a
 	 * failed `remove`, re-runs the entry), so use this id to make a handler idempotent
@@ -131,7 +141,7 @@ export type QueueHandler<TInput, TResult> = (
 ) => Promise<TResult> | TResult
 
 /**
- * Per-entry options for `enqueue`.
+ * Represents the per-entry options for `enqueue`.
  *
  * @remarks
  * - `id` — a trace label for the entry; defaults to a random UUID.
@@ -155,7 +165,7 @@ export interface QueueEntryOptions {
 }
 
 /**
- * Options for `createQueue`.
+ * Represents the options for `createQueue`.
  *
  * @remarks
  * - `handler` — runs each entry's work; rejecting triggers a retry while attempts
@@ -178,7 +188,7 @@ export interface QueueEntryOptions {
  */
 export interface QueueOptions<TInput, TResult> {
 	readonly on?: EmitterHooks<QueueEventMap<TResult>>
-	/** The emitter's listener-error handler (AGENTS §13) — a listener throw routes here, not to a domain event. */
+	/** Holds the emitter's listener-error handler (AGENTS §13) — a listener throw routes here, not to a domain event. */
 	readonly error?: EmitterErrorHandler
 	readonly handler: QueueHandler<TInput, TResult>
 	readonly concurrency?: number
@@ -188,7 +198,7 @@ export interface QueueOptions<TInput, TResult> {
 }
 
 /**
- * A concurrent, cooperative job queue.
+ * Represents a concurrent, cooperative job queue.
  *
  * @remarks
  * Exposes a typed {@link emitter} (AGENTS §13) carrying its lifecycle moments
@@ -204,33 +214,38 @@ export interface QueueOptions<TInput, TResult> {
  * ```
  */
 export interface QueueInterface<TInput, TResult> {
+	/** Holds the typed push observation surface carrying this queue's {@link QueueEventMap} moments. */
 	readonly emitter: EmitterInterface<QueueEventMap<TResult>>
+	/** Counts the reserved live entries — admitting, pending, claimed, or awaiting cleanup. */
 	readonly count: number
+	/** Counts the claimed entries in flight, never above the queue's concurrency. */
 	readonly active: number
+	/** Reports the pause state: true while `pause` has suspended dequeuing; false otherwise. */
 	readonly paused: boolean
+	/** Reports the halt state: true after `stop` or `abort` has halted the queue; false otherwise. */
 	readonly stopped: boolean
-	/** Reserve and submit one FIFO entry. */
+	/** Reserves and submits one FIFO entry. */
 	enqueue(input: TInput, options?: QueueEntryOptions): Promise<TResult>
-	/** Re-enqueue outstanding entries loaded from the store; no-op without a store. */
+	/** Re-enqueues outstanding entries loaded from the store; no-op without a store. */
 	restore(): Promise<void>
-	/** Begin or restart worker execution. */
+	/** Begins or restarts worker execution. */
 	start(): void
-	/** Reject non-active work and await current-loop/durable quiescence. */
+	/** Rejects non-active work and awaits current-loop/durable quiescence. */
 	stop(): Promise<void>
-	/** Suspend new execution resumably. */
+	/** Suspends new execution resumably. */
 	pause(): void
-	/** Continue execution after a pause. */
+	/** Continues execution after a pause. */
 	resume(): void
-	/** Cancel active work, reject pending work, and await cleanup. */
+	/** Cancels active work, rejects pending work, and awaits cleanup. */
 	abort(reason?: unknown): Promise<void>
-	/** Reject non-active work and await its durable cleanup. */
+	/** Rejects non-active work and awaits its durable cleanup. */
 	clear(): Promise<void>
-	/** Tear down idempotently and destroy observation last. */
+	/** Tears down idempotently and destroys observation last. */
 	destroy(): Promise<void>
 }
 
 /**
- * A durably persisted, still-outstanding queue entry — re-run after a restart.
+ * Represents a durably persisted, still-outstanding queue entry — re-run after a restart.
  *
  * @remarks
  * The store holds only entries that have NOT yet completed, so what `load`
@@ -251,7 +266,7 @@ export interface StoredEntry<TInput> {
 }
 
 /**
- * Durable backing for a Queue's outstanding entries.
+ * Represents the durable backing for a Queue's outstanding entries.
  *
  * @remarks
  * The store holds ONLY work that has not yet completed: `save` upserts an entry
```

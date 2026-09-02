# Last changes: worker

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `5d1d6df`, merge base with `origin/main` `2aa158e`, layer L4, declared version 0.0.10, registry version 0.0.10.

## Commits since origin/main

```text
2104afd 2026-08-28 Update every dependency to the published latest
99a0e2c 2026-08-28 Adopt the catalog and guide mirrors for the wave
abfbd14 2026-09-01 Apply the verified src-audit fixes
c42d25b 2026-09-01 Adopt the renamed guide helpers in the parity test
3944faf 2026-09-02 Point the README at the guide the package ships
5d1d6df 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md         | 17 ++++++++--------
 README.md                           |  2 +-
 package.json                        |  4 ++--
 src/core/Worker.ts                  |  4 ++--
 src/core/factories.ts               |  2 +-
 src/core/types.ts                   | 34 ++++++++++++++++----------------
 src/server/Dispatch.ts              |  4 ++--
 src/server/NodeWorker.ts            |  2 +-
 src/server/Thread.ts                |  3 ++-
 src/server/factories.ts             |  4 ++--
 src/server/handlers.ts              |  4 ++--
 src/server/helpers.ts               | 30 +++++++++++++++++++++++++---
 src/server/index.ts                 |  1 -
 src/server/types.ts                 |  8 ++++----
 src/server/validators.ts            | 23 ----------------------
 tests/guides.test.ts                | 22 ++++++++++-----------
 tests/src/server/helpers.test.ts    | 83 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++--
 tests/src/server/validators.test.ts | 81 ---------------------------------------------------------------------------
 18 files changed, 164 insertions(+), 164 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/types.ts b/src/core/types.ts
index b7ff013..a4e68fe 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -3,7 +3,7 @@ import type { PoolOptions } from '@orkestrel/pool'
 import type { QueueEntryOptions, QueueExecution, QueueStoreInterface } from '@orkestrel/queue'
 
 /**
- * The push observation surface of a {@link WorkerInterface} (AGENTS §13) — the job
+ * Represents the push observation surface of a {@link WorkerInterface} (AGENTS §13) — the job
  * lifecycle a fire-and-forget observer subscribes to, surfacing the underlying queue's
  * moments so a Worker consumer never reaches through to the internal `Queue`.
  *
@@ -21,19 +21,19 @@ import type { QueueEntryOptions, QueueExecution, QueueStoreInterface } from '@or
  * Declared as a `type` alias (§4.5).
  */
 export type WorkerEventMap<TResult> = {
-	/** A job was accepted — its id (delegated from the underlying queue's `enqueue`). */
+	/** Fires when a job is accepted — its id (delegated from the underlying queue's `enqueue`). */
 	readonly enqueue: readonly [id: string]
-	/** A job's attempt began running — its id. */
+	/** Fires when a job's attempt begins running — its id. */
 	readonly start: readonly [id: string]
-	/** A failed job attempt is being retried — its id + the next (1-based) attempt index. */
+	/** Fires when a failed job attempt is being retried — its id + the next (1-based) attempt index. */
 	readonly retry: readonly [id: string, attempt: number]
-	/** A job settled successfully — its id + the resolved result. */
+	/** Fires when a job settles successfully — its id + the resolved result. */
 	readonly success: readonly [id: string, result: TResult]
-	/** A job settled with a terminal failure — its id + the error. */
+	/** Fires when a job settles with a terminal failure — its id + the error. */
 	readonly failure: readonly [id: string, error: unknown]
-	/** The worker was aborted — the queue's coded abort error retaining the caller reason. */
+	/** Fires when the worker is aborted — the queue's coded abort error retaining the caller reason. */
 	readonly abort: readonly [reason: unknown]
-	/** The worker went idle — no pending jobs and none in flight. */
+	/** Fires when the worker goes idle — no pending jobs and none in flight. */
 	readonly drain: readonly []
 }
 
@@ -45,7 +45,7 @@ export type WorkerHandler<TInput, TResource, TResult> = (
 ) => Promise<TResult> | TResult
 
 /**
- * Options for `createWorker`.
+ * Configures `createWorker`.
  *
  * @remarks
  * - `handler` — runs each job against an acquired pool resource; rejecting triggers a
@@ -64,19 +64,19 @@ export type WorkerHandler<TInput, TResource, TResult> = (
  */
 export interface WorkerOptions<TInput, TResource, TResult> {
 	readonly on?: EmitterHooks<WorkerEventMap<TResult>>
-	/** The emitter's listener-error handler (AGENTS §13) — a listener throw routes here, not to a domain event. */
+	/** Holds the emitter's listener-error handler (AGENTS §13) — a listener throw routes here, not to a domain event. */
 	readonly error?: EmitterErrorHandler
 	readonly handler: WorkerHandler<TInput, TResource, TResult>
 	readonly pool: PoolOptions<TResource>
 	readonly concurrency?: number
 	readonly retries?: number
-	/** Integer milliseconds in `0..2_147_483_647`; `0` disables the per-attempt deadline. */
+	/** Holds integer milliseconds in `0..2_147_483_647`; `0` disables the per-attempt deadline. */
 	readonly timeout?: number
 	readonly store?: QueueStoreInterface<TInput>
 }
 
 /**
- * A resource-backed job worker — a Queue whose handler runs against a pooled resource.
+ * Represents a resource-backed job worker — a Queue whose handler runs against a pooled resource.
  *
  * @remarks
  * Exposes a typed {@link emitter} (AGENTS §13) carrying the job lifecycle
@@ -92,24 +92,24 @@ export interface WorkerInterface<TInput, TResult> {
 	readonly paused: boolean
 	readonly stopped: boolean
 	enqueue(input: TInput, options?: QueueEntryOptions): Promise<TResult>
-	/** Re-enqueue outstanding entries loaded from the store; no-op without a store. */
+	/** Re-enqueues outstanding entries loaded from the store; no-op without a store. */
 	restore(): Promise<void>
 	start(): void
-	/** Stop the queue and await current-loop and durable cleanup quiescence. */
+	/** Stops the queue and awaits current-loop and durable cleanup quiescence. */
 	stop(): Promise<void>
 	pause(): void
 	resume(): void
 	/**
-	 * Cancel in-flight work, reject pending work, and await queue-owned cleanup.
+	 * Cancels in-flight work, rejects pending work, and awaits queue-owned cleanup.
 	 *
 	 * @param reason - Optional cause retained by the queue's coded abort error
 	 * @returns The underlying queue's stable abort barrier
 	 */
 	abort(reason?: unknown): Promise<void>
-	/** Drop pending work and await its durable cleanup. */
+	/** Drops pending work and awaits its durable cleanup. */
 	clear(): Promise<void>
 	/**
-	 * Tear down the queue, then the pool, and finally the worker emitter.
+	 * Tears down the queue, then the pool, and finally the worker emitter.
 	 *
 	 * @returns One stable barrier shared by every call; it rejects with the original sole
 	 *   cleanup failure or an ordered `AggregateError` when both queue and pool fail
diff --git a/src/server/index.ts b/src/server/index.ts
index 9de9b63..cf62585 100644
--- a/src/server/index.ts
+++ b/src/server/index.ts
@@ -1,5 +1,4 @@
 export * from './types.js'
 export * from './helpers.js'
-export * from './validators.js'
 export * from './handlers.js'
 export * from './factories.js'
diff --git a/src/server/types.ts b/src/server/types.ts
index 820956d..2cf104d 100644
--- a/src/server/types.ts
+++ b/src/server/types.ts
@@ -3,7 +3,7 @@ import type { QueueExecution, QueueStoreInterface } from '@orkestrel/queue'
 import type { Worker as ThreadWorker } from 'node:worker_threads'
 
 /**
- * A thread→main reply envelope — a success carrying an opaque `value`, or a failure with a
+ * Represents a thread→main reply envelope — a success carrying an opaque `value`, or a failure with a
  * message — part of the internal wire protocol `createNodeWorker` posts and `serveWorker`
  * answers.
  *
@@ -21,7 +21,7 @@ export type Reply =
 	| { readonly id: string; readonly ok: false; readonly error: string }
 
 /**
- * A live worker thread plus its latched liveness state — the pooled resource a
+ * Represents a live worker thread plus its latched liveness state — the pooled resource a
  * {@link createNodeWorker} leases per job.
  *
  * @remarks
@@ -44,7 +44,7 @@ export interface NodeThread {
 }
 
 /**
- * Options for `createNodeWorker` — a CPU-parallel worker over `node:worker_threads`.
+ * Configures `createNodeWorker` — a CPU-parallel worker over `node:worker_threads`.
  *
  * @remarks
  * - `script` — the worker module each pooled thread runs; its module must call
@@ -80,7 +80,7 @@ export interface NodeWorkerOptions<TInput, TResult> {
 }
 
 /**
- * Options for `serveWorker` — the worker-side entry a thread script registers.
+ * Configures `serveWorker` — the worker-side entry a thread script registers.
  *
  * @remarks
  * - `input` — narrows each inbound payload inside the thread; an invalid payload replies
```

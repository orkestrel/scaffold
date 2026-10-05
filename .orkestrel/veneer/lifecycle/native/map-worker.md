# map:worker

@orkestrel/worker 0.0.15: map against pool 0.0.16 and the browse mechanisms

**What it is**
- It runs on **threads only**: a core `Queue`⨉`Pool` facade plus a `node:worker_threads` server face. It has no child-process path. Thread spawn uses `node:worker_threads` (`worker/src/server/Thread.ts:2,27`), and the package description says the same (`worker/package.json:4`).
- **Dependencies:** contract ^0.0.19, database ^0.0.17, emitter ^0.0.11, pool ^0.0.14, queue ^0.0.16 (`worker/package.json:86-90`).
- **Docs:** there is no ROADMAP.md. The local guide `worker/guides/worker.md` is tracked and current. The scaffold copy is stale: it lists only `max`, `on`, `error`, `create`, `destroy` and `validate` as forwarded pool members (`scaffold/guides/worker.md:167-168`). The local guide also lists `min`, `restarts` and `watch` (`worker/guides/worker.md:167-172,399-402`).
- **Consumers:** none. Across `C:\Users\mikes\WebstormProjects\*\package.json`, the only hit for `@orkestrel/worker` is the package's own name (`worker/package.json:2`).

**Public API**
- **Core:**
  - `createWorker` (`src/core/factories.ts:44`) and `Worker` (`src/core/Worker.ts:51`).
  - `WorkerOptions` has `on`, `error`, `handler`, `pool`, `concurrency`, `retries`, `timeout` and `store` (`src/core/types.ts:72-83`).
  - `WorkerInterface` has `emitter`, `count`, `active`, `paused`, `stopped`, `enqueue`, `restore`, `start`, `stop`, `pause`, `resume`, `abort`, `clear` and `destroy` (`types.ts:96-139`).
  - `WorkerEventMap` carries `enqueue`, `start`, `retry`, `success`, `failure`, `abort` and `drain` (`types.ts:27-42`).
- **Server:**
  - `createThread`, `createJSONQueueStore` and `createNodeWorker` (`src/server/factories.ts:41,75,124`).
  - `serveWorker` (`handlers.ts:48`), `Dispatch` (`Dispatch.ts:54`) and `isReply` (`helpers.ts:26`).
  - The types `Reply`, `NodeThread`, `NodeWorkerOptions` and `ServeWorkerOptions` (`server/types.ts:20,47,85,115`).

**How it uses pool (what the code does)**
- **Core `Worker`** forwards `create`, `max`, `min`, `restarts`, `watch`, `on`, `error`, `destroy` and `validate` (`Worker.ts:85-106`).
  - `max` defaults to `concurrency` only when both `max` and `min` are absent (`Worker.ts:98`).
  - It calls `pool.start()` at construction and swallows the rejection (`Worker.ts:109`).
  - It does not forward `capacity`: that key is not in the destructuring (`Worker.ts:85-95`).
- **`createNodeWorker`** forwards only `create`, `destroy`, `validate`, and `max = concurrency` (`NodeWorker.ts:45-50`).
  - `NodeWorkerOptions` has no `min`, `restarts`, `watch` or pool hooks (`server/types.ts:85-96`).
  - Threads are therefore created lazily on acquire, with no warm floor, no restart bound and no `watch`.
  - `validate` is `alive && threadId > 0` (`NodeWorker.ts:69-71`).

**Lifecycle it implements itself**
- **Spawn:** `Thread` resolves on `online` and rejects on an `error` or `exit` before `online` (`Thread.ts:43-45,80-96`).
- **Crash detection:** persistent `error`, `messageerror` and `exit` listeners set `alive` to false and latch `death` (`Thread.ts:40-42,68-78`). `Dispatch` checks the latch at construction (`Dispatch.ts:94-97`) and listens for a death while the job runs (`Dispatch.ts:98-101,144-150`).
- **Restart:** worker has none of its own. A dead thread fails `validate` on the next idle reuse and pool replaces it (`server/types.ts:29-32`).
- **Task dispatch:** a fresh correlation id per dispatch (`Dispatch.ts:60`), with a `run` envelope carrying the job id (`Dispatch.ts:108-113`). The thread side keeps a map of `AbortController` objects per correlation id, so it already accepts concurrent runs on one thread (`handlers.ts:53,90-91`).
- **Cancellation and timeouts:** timeouts come from the queue (`Worker.ts:81`). On abort, worker posts a cooperative `abort`, then evicts and terminates the whole thread (`Dispatch.ts:152-188`). Acquire runs over the attempt signal (`Worker.ts:173`).
- **Backpressure:** none. `QueueOptions` has no pending bound (`node_modules/@orkestrel/queue/dist/src/core/index.d.ts:621-628`).
- **Per-task outcomes:** the `enqueue` promise and the `success` / `failure` events. The job id is the idempotency key, not caller identity (`server/types.ts:106-107`).

**Overlap with pool 0.0.16 (code facts, then my opinion)**
- **`capacity`:**
  - Pool 0.0.16 adds `capacity` to `PoolOptions` (`pool/src/core/types.ts:105`), and worker types `pool` as `PoolOptions<TResource>` (`worker/src/core/types.ts:77`).
  - After the re-pin, a caller can pass `capacity`, it type-checks, and `Worker` drops it silently (`Worker.ts:85-106`).
  - Opinion: forward it in the same change as the re-pin. Otherwise the type promises a behavior the runtime ignores.
- **`capacity` above 1 on threads:**
  - Pool never revalidates an occupied record. Without `watch`, a dead record keeps receiving leases until it goes idle (`pool/src/core/types.ts:76-78`).
  - `NodeWorker` passes no `watch` (`NodeWorker.ts:45-50`).
  - An abort calls `Thread.evict()` and `terminate()` directly (`Dispatch.ts:166-169`), not `token.destroy()`, which would invalidate every co-holder (`pool/types.ts:58-65`). The terminated thread kills every co-holder's job; they reject through their `exit` listeners.
  - Opinion: several tasks per thread needs two things: a `watch` that settles on the thread's `death`, and abort routed through `token.destroy()` so pool sees the loss at once. The protocol side (correlation ids, a controller per id) is ready. Abort-by-terminate becomes a blast-radius question that needs a ruling. The answer might be to keep `capacity` 1 for CPU-bound work.
- **Idle-loss strike:**
  - Loss of a record with no live lease now adds a strike, even after prior use (`pool/types.ts:86`).
  - This reaches worker only when `min` and `restarts` are set (`pool/types.ts:84-85`). Only core `Worker` callers can set them; `createNodeWorker` callers cannot.
  - The re-pin is owed and changes the runtime range (`scaffold/.orkestrel/veneer/lifecycle/holders/status.md:62,70`; `contexts-synthesis.md:56`).
  - Existing `min`/`restarts`/`watch` cases sit at `tests/src/core/Worker.test.ts:164,184-185,219,246,487-489,515-517`. Opinion: add a case pinning the idle-loss strike at the re-pin.

**Gains from the browse mechanisms (opinion)**
- **Prepared warm resources:** expose `min`/`restarts` on `NodeWorkerOptions`, so a broken script shows at construction (browse's onset rule, `contexts-synthesis.md:31`), not at the first job.
- **Retirement with a strike:** without `min`/`restarts`, a script that fails at load respawns on every attempt with no bound (`Thread.ts:86-96`, `NodeWorker.ts:61-63`). Forwarding `restarts` gives pool's existing bound; browse's rule for this case is at `contexts-synthesis.md:36`.
- **Per-holder loss notices:** the `death` latch already covers one dispatch. A pool `watch` resolving on `Thread` `exit` would carry the same signal to pool, replacing the thread before the next acquire (`pool/types.ts:93`).
- **Generation guards and single-flight recovery:** nothing to add. Pool owns replacement, and worker holds no long-lived holder identity across calls; each job leases afresh (`Worker.ts:172-178`).
- **Belongs in pool, not worker:** the `death`-latch-to-`watch` adapter is thread-specific and stays in worker. A generic "loss promise from an `EventTarget` or emitter" helper might fit pool or contract, but no second consumer is cited, so it does not meet the minimal-API gate yet.

**Unverified:** I ran no tests. The claim that co-holder jobs reject on terminate is read from the code, not run.

# Report — `d7n-worker-prep`

Wall clock: 2026-09-07T21:21:05Z → 2026-09-07T21:25:12Z.

## Item 1 — `repair --offline`

```text
0 of 40 planned paths drifted from the plan. Audit compared bytes at 26, existence at 5, and nothing at 9.
tsconfig.json replaced (2 lines added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 32 unchanged, 0 removed in ..
```

`git status --short` after: `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json`, plus untracked `scripts/docs.ts` — matches the P21 list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

```diff
@@ methods loop @@
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)

@@ examples case @@
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(names, fences, source.examples().map((example) => example.name)),
+			).toEqual([])

@@ examples loop @@
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
-					const examples = … (removed; hoisted above the describe)
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
```

No other line in `tests/guides.test.ts` changed. The `findMissing` calls on the import-walk site (`statement.names` against `face.surface().map(...)`) and the surface-check site (`names` against `surface`) were already string arrays and stayed untouched.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 named:

- `tests/setupServer.ts:14` `policy/no-malformed-summary` — `/** Post one valid raw run envelope to a real worker thread. */` → `/** Posts one valid raw run envelope to a real worker thread. */`
- `tests/setupServer.ts:45` `policy/no-malformed-summary` — `/** Getter-backed Node worker options whose property reads are recorded. */` → `/** Records each property read against getter-backed Node worker options. */`
- `tests/setupServer.ts:113` `policy/no-malformed-summary` — `/** A pending reply from a real worker thread with stable listener identities. */` → `/** Represents a pending reply from a real worker thread with stable listener identities. */`
- `tests/setup.ts:13` `policy/no-malformed-summary` — `/** Optional protocol hooks for {@link TestQueueStore}. */` → `/** Configures optional protocol hooks for {@link TestQueueStore}. */`
- `tests/setup.ts:20` `policy/no-malformed-summary` — ` * A protocol-faithful in-memory {@link QueueStoreInterface} with optional operation hooks.` → ` * Implements a protocol-faithful in-memory {@link QueueStoreInterface} with optional operation hooks.`
- `tests/setup.ts:58` `policy/no-malformed-summary` — `/** Getter-backed pool options whose prototype property reads are recorded. */` → `/** Records each prototype property read against getter-backed pool options. */`

No `policy/no-banned-term` diagnostic printed. Re-run after the rewrites: `npx oxlint --config .oxlintrc.json --deny-warnings .` exits 0 with no output.

`npm run test:policy`'s `prose` rule named no line in `guides/**` or `README.md`; no further edit was needed there.

## Item 4 — the bump

`package.json` `"version": "0.0.11"` → `"0.0.12"`. `package-lock.json` untouched.

## Acceptance criteria

1. `git status --short`:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P21 repair list plus `tests/guides.test.ts` plus the item-3 files (`tests/setup.ts`, `tests/setupServer.ts`) and nothing else.

2. `npm run format:check`:

```text
Checking formatting...
All matched files use the correct format.
Finished in 2402ms on 73 files using 4 threads.
```

exit 0.

`npx oxlint --config .oxlintrc.json --deny-warnings .`: no output, exit 0.

`npm run check`: `tsc --noEmit --project tsconfig.json && npm run check:src` (core, server) all ran with no diagnostics printed, exit 0. The P21 `tests/guides.test.ts` `TS2345` diagnostics are gone.

3. `npm run test:guides`:

```text
 Test Files  1 passed (1)
      Tests  18 passed (18)
```

exit 0.

`npm run test:policy`:

```text
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
```

exit 0.

`npm run test:config`:

```text
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
```

exit 0.

4. `npm run docs` — non-zero `rows read`, exit 1, printed verbatim (the converge unit's worklist):

```text
guides/worker.md function createWorker: guide "Create a `WorkerInterface` — a `Queue` ⨉ `Pool`; each job runs against an acquired resource." source "Creates a resource-backed job worker — a `Queue` (`@orkestrel/queue`) marrying a `Pool` (`@orkestrel/pool`). Each enqueued input runs through the handler against an automatically acquired pooled resource (released when the job settles), with the queue's bounded concurrency, retries, and per-attempt timeout / abort."
guides/worker.md function createJSONQueueStore: guide "Create a JSON-file `QueueStoreInterface` (`@orkestrel/worker/server`) — durable across restarts." source "Creates a persistent JSON-file `QueueStoreInterface` — the core `createDatabaseQueueStore` over a server `createJSONDriver`."
guides/worker.md function createNodeWorker: guide "Create a `WorkerInterface` over `node:worker_threads` (`@orkestrel/worker/server`) — CPU parallelism." source "Creates a CPU-parallel worker over `node:worker_threads` — a thin specialization of the core `createWorker` whose pooled resource is a worker THREAD."
guides/worker.md function serveWorker: guide "The worker-side entry (`@orkestrel/worker/server`) — a thread script registers its handler with it." source "Registers a worker-thread handler — the worker-side half of `createNodeWorker`."
guides/worker.md function createThread: guide "Create one worker thread and resolve a live `NodeThread` after it comes `online` (an earlier death rejects)." source "Creates one live worker thread and resolves it as a `NodeThread` after it comes online."
guides/worker.md function isReply: guide "Narrow an inbound message to a `Reply` for a correlation id (total, correlated) — a `Dispatch`'s message filter." source "Narrows an inbound `message` to a `Reply` for a given job `id` — no assertion."
guides/worker.md class Dispatch: guide "One job posted to a leased `NodeThread`; its `promise` settles with the narrowed reply." source "Represents one dispatched worker-thread job — the lifecycle entity behind a job posted to a leased `NodeThread`, whose `promise` settles with the narrowed reply."
guides/worker.md class Worker: guide "A resource-backed job worker — a `Queue` composed with a `Pool`." source "Represents a resource-backed job worker — a thin facade composing a `Queue` (`@orkestrel/queue`) with a `Pool` (`@orkestrel/pool`)."
guides/worker.md type WorkerHandler: guide absent source "Runs one worker job with a leased pool resource."
guides/worker.md interface WorkerOptions: guide absent source "Configures `createWorker`."
guides/worker.md interface WorkerInterface: guide absent source "Represents a resource-backed job worker — a Queue whose handler runs against a pooled resource."
guides/worker.md type WorkerEventMap: guide absent source "Represents the push observation surface of a `WorkerInterface` — the job lifecycle a fire-and-forget observer subscribes to, surfacing the underlying queue's moments so a Worker consumer never reaches through to the internal `Queue`."
guides/worker.md interface NodeWorkerOptions: guide absent source "Configures `createNodeWorker` — a CPU-parallel worker over `node:worker_threads`."
guides/worker.md interface ServeWorkerOptions: guide absent source "Configures `serveWorker` — the worker-side entry a thread script registers."
guides/worker.md interface NodeThread: guide absent source "Represents a live worker thread plus its latched liveness state — the pooled resource a `createNodeWorker` leases per job."
guides/worker.md type Reply: guide absent source "Represents a thread→main reply envelope — a success carrying an opaque `value`, or a failure with a message — the reply half of the wire protocol `createNodeWorker` posts and `serveWorker` answers."
guides/worker.md pitch: readme absent tagline "A resource-backed job worker — a thin facade composing a `Queue` (from `@orkestrel/queue`) with a `Pool` (from `@orkestrel/pool`). A `Worker` is a `Queue` whose handler ACQUIRES a pooled resource, runs the caller's handler against it, and RELEASES it in a `finally` — so all concurrency, retries, per-attempt timeout, and lifecycle are the Queue's, and all resource lifecycle (idle reuse, `max` backpressure, FIFO waiting) is the Pool's. The Worker adds only the resource pairing: it does not reimplement either primitive. Construction captures every caller-owned top-level option once. Only `undefined` selects the `concurrency` default (`1`) or matching pool `max`; runtime `null` is invalid and reaches the owning validator. Queue is constructed and validates `concurrency` before the caller's pool option is read; then every declared pool option (`max`, `on`, `error`, `create`, `destroy`, `validate`) is captured once by direct property access before Pool is constructed, preserving structural implementations whose members are inherited or non-enumerable. At most one resource exists per in-flight job by default, and idle resources are reused across jobs. Each job acquires over the attempt's `context.signal`, so an abort / timeout while waiting for a resource rejects the acquire cleanly (no token to release). The worker is observable: its `emitter` RE-EXPOSES the underlying queue's job lifecycle (`enqueue` / `start` / `retry` / `success` / `failure` / `abort` / `drain`) as its own events, bridged at construction, so a consumer never reaches through to the internal `Queue`. For CPU parallelism, `createNodeWorker` (`@orkestrel/worker/server`) specializes `createWorker` over a pool of `node:worker_threads`, with `serveWorker` as the worker-side entry; the structured-clone boundary is narrowed by `input` / `result` guards with zero `as`. Source: `src/core` (the `Worker` facade) and `src/server` (the thread pool + the worker-side entry). Surfaced through the `@orkestrel/worker` and `@orkestrel/worker/server` exports."
rows read: 1, disagreements found: 17
```

exit 1 (expected).

## Deviations

None. Every reading matched the brief's expected shape.

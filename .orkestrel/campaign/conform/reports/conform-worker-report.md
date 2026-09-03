# Unit conform-worker — report

Every row is `applied` or `noop`. No row stopped. The gate chain is green in order.

## Consumer edits taken

Both addendum edits landed first, before any numbered row.

| Edit | Disposition | Line now |
| ---- | ----------- | -------- |
| queue's `QueueExecution` → `QueueContext` | applied | `src/core/types.ts:3` (import), `:43` (`WorkerHandler` third parameter `context: QueueContext`); `src/core/Worker.ts:2` (import), `:154` (`#handle(input, context: QueueContext)`); `src/server/types.ts:3` (import), `:118` (`ServeWorkerOptions.handler` second parameter); `src/server/Dispatch.ts:1` (import), `:58` (`readonly #context: QueueContext`), `:71` (constructor parameter), `:102`/`:106`/`:110`/`:159`/`:209` (`this.#context` reads); `src/server/NodeWorker.ts:4` (import), `:73` (`#handle(input, thread, context: QueueContext)`); `src/server/helpers.ts` — the `dispatch` wrapper that carried the parameter is deleted by worker-obj-1, so the type import left with it |
| the same substitution in `guides/worker.md` | applied | `:19` (`context.signal`), `:108` (`WorkerHandler` shape row `(input, resource, context)`), `:113` (`ServeWorkerOptions` row `QueueContext`), `:155`, `:158`, `:204`, `:205`, `:210`, `:286`, `:439` |
| guide's `symbol.kind` → `symbol.keyword` | applied | `tests/guides.test.ts:141` — `.filter((symbol) => symbol.keyword === 'function')` |

Failing-first evidence for the pair: `npm run check` at the committed baseline `9eb4bdd` reported 7 errors — 6 `TS2305: Module '"@orkestrel/queue"' has no exported member 'QueueExecution'` and 1 `TS2339: Property 'kind' does not exist on type 'SurfaceSymbol'` (`/home/user/work/evidence/worker-proofs/baseline-check.txt`). The same command after the two edits exits 0 (`/home/user/work/evidence/worker-proofs/consumer-edits-check.txt`).

Two sites the addendum did not name took the same substitution, because the rename made their text false about a contract this package publishes. Recorded as ancillary decisions, not as scope:

- `src/server/handlers.ts:25` — the `serveWorker` TSDoc said the stable id is "exposed as `execution.id`"; the interface it documents (`ServeWorkerOptions`) now says `context.id`, so the sentence reads `context.id`.
- `src/server/handlers.ts:87` and `:96` — the local narrowing the string job id was named `execution`; it is `entry`, and the comment at `:84` reads "stable Queue entry id".

Test and fixture parameter names that bind a `QueueContext` (`tests/src/core/Worker.test.ts`, `tests/src/server/fixtures/execution.ts`) keep the name `execution`, and the fixture file name `execution.ts` is unchanged. They are local bindings rather than a published contract, and the addendum bounded the substitution to the six source files and the guide.

## Rows

| Row | Disposition |
| --- | ----------- |
| worker-obj-1 | applied |
| worker-obj-2 | applied |
| worker-obj-3 | applied |
| worker-obj-6 | applied |
| worker-obj-7 | applied |
| worker-obj-8 | applied |
| worker-obj-9 | applied |
| worker-obj-10 | applied |
| worker-obj-11 | applied |
| worker-subj-2 | applied |
| worker-subj-6 | applied |
| worker-subj-9 | applied |
| worker-subj-10 | applied |
| worker-subj-11 | applied |
| worker-subj-13 | applied |
| worker-subj-14 | applied |
| worker-subj-15 | applied |
| fleet-F1 | noop |
| fleet-F2 | noop |

### worker-obj-1 — applied

The refuter's operative form, in full.

- `spawnThread` left `src/server/helpers.ts` and became `createThread(script: string | URL, workerData?: unknown): Promise<NodeThread>` in `src/server/factories.ts:41`, with a runnable `@example`.
- The `dispatch` wrapper is deleted. `src/server/index.ts:5` adds `export * from './Dispatch.js'`, so `Dispatch` is published; its TSDoc absorbed the wrapper's `@remarks` and carries a runnable `@example` (`src/server/Dispatch.ts:9-53`).
- `NodeWorker.#create` calls `new Thread(...)` directly and `NodeWorker.#handle` calls `new Dispatch(...).promise`, so `NodeWorker.ts` never imports `factories.ts` and the cycle the refuter warned about does not form. `createThread` is the published entry only.
- `src/server/helpers.ts` now holds `isReply` alone and imports no implementation class. The one remaining edge into it is `src/server/Dispatch.ts:6 → helpers.js`, running upward.
- `tests/guides.test.ts` INTERNAL is `['class NodeWorker', 'class Thread']` and the barrel-absence assertion's names are `['NodeWorker', 'Thread']`.
- `guides/worker.md` §Threads: prose, fence, and table rewritten; `Dispatch` added to the §Entities table.

Failing-first, parity half: with `export * from './Dispatch.js'` removed from the barrel, `npm run test:guides` reported **3 failed | 15 passed (18)** — `re-exports every direct declaration that is not named internal`, `documents only barrel exports`, `the Threads fence drives one thread by hand and filters its replies` (`/home/user/work/evidence/worker-proofs/obj1-parity-control-red.txt`). Restored, the same command reports **18 passed (18)** (`/home/user/work/evidence/worker-proofs/guides-after.txt`).

Failing-first, `createThread` half: with the body planted as `new Thread(script, undefined)`, `npx vitest run … --project src:server tests/src/server/factories.test.ts` reported **1 failed | 8 passed (9)** on `createThread > resolves a live thread and clones its \`workerData\` across at spawn` (`/home/user/work/evidence/worker-proofs/obj1-createThread-control-red.txt`). Restored, the file is green inside the **74 passed (74)** server run (`/home/user/work/evidence/worker-proofs/src-server-after-2.txt`).

Old-name sweeps, both empty:

- `grep -rniE "\b(spawnThread|spawnThreads|spawnThreaded|spawnThreading)\b"` over `README.md guides/worker.md guides/README.md src tests` (`--include=*.ts --include=*.md`) — no output.
- `grep -rnE "\`dispatch\`|\bdispatch\(|import .*\bdispatch\b"` over the same population — no output.

### worker-obj-2 — applied

`tests/setupServer.ts:33` returns `{ readonly path: string; readonly scratch: ScratchInterface }`; the arrow assigned inside the body is gone. `ScratchInterface` joins the type-import block at `:3`. The module comment at `:27-31` describes the scratch rather than a `cleanup` thunk. Call sites: `tests/src/server/factories.test.ts:35-36`, `:52-53`, `:76-77` read `const { path, scratch } = tempDatabasePath()` then `teardown.add(() => scratch.destroy())`; `tests/setupServer.test.ts:66-78` reads the scratch and calls `scratch.destroy()` twice, keeping the second call as the existing control.

Failing-first: with the body planted to destroy its scratch before returning, `npm run test:setup` reported **1 failed | 9 passed (10)** (`/home/user/work/evidence/worker-proofs/obj2-control-red.txt`). Restored, the same command reports **10 passed (10)** (`/home/user/work/evidence/worker-proofs/setup-after.txt`).

Sweep: `grep -rnE "cleanup\(\)|readonly cleanup"` over `src tests` (`--include=*.ts`) — no output.

### worker-obj-3 — applied

`tests/setupServer.test.ts:1` is `import type { NodeWorkerOptions } from '@src/server'`, ahead of the value imports, with no blank line between it and `import { describe, expect, it } from 'vitest'` at `:2`.

Sweep proving the old form is gone: `grep -rn "^import type" tests/setupServer.test.ts` returns line 1 only, and `npm run format:check` exits 0 over the file, so no blank line separates the kinds. No behavioural control applies; this is a syntax-placement row.

### worker-obj-6 — applied

Documented the obligation on the interface that owns it and proved the documentation.

- `src/server/types.ts:46-51` — the `NodeThread` `@remarks` states that a dispatch marks a thread dead for a `NodeThread` this package produced through `createThread` or a `createNodeWorker` pool, and that a foreign implementation owns flipping its own `alive` when its `worker` is terminated.
- `src/server/Dispatch.ts:35-37` — the same qualifier on the class that carries the behaviour (the `dispatch` wrapper the row named is deleted by worker-obj-1).
- `guides/worker.md:210` — "flips `alive = false` for a thread this package produced".
- `tests/src/server/helpers.test.ts:601-630` — a plain object satisfying `NodeThread` over a real `ThreadWorker`, aborted, asserting the job rejects with the caller's exact reason, that the supplied object's `alive` is untouched, and (as the case's own control) that the supplied `worker` really was terminated.

Failing-first: with `#terminate` planted to `else Object.assign(this.#thread, { alive: false })` for the non-`Thread` branch, `npx vitest run … --project src:server tests/src/server/helpers.test.ts` reported **1 failed | 47 passed (48)**, failing exactly `Dispatch — a consumer-supplied NodeThread owns its own liveness > rejects the aborted job and terminates the supplied worker, leaving \`alive\` untouched` at `:625` (`/home/user/work/evidence/worker-proofs/obj6-control-red.txt`). Restored, the same command reports **48 passed (48)** (`/home/user/work/evidence/worker-proofs/obj8-control-green.txt`).

### worker-obj-7 — applied

`tests/setupServer.ts:19-21` exports `buildFixtureURL(name: string): URL`, anchored with `resolveRoot(import.meta)` from `@orkestrel/test`. The three local `fixture` declarations are deleted and every call site imports the shared helper: `tests/src/server/helpers.test.ts`, `tests/src/server/handlers.test.ts`, `tests/setupServer.test.ts`, and `tests/src/server/factories.test.ts` (which previously built its own inline `new URL('./fixtures/…')` specifiers). `tests/setupServer.test.ts:56-65` proves the export: the href ends with `tests/src/server/fixtures/double.ts`, `existsSync(fileURLToPath(url))` is true, and a name with no fixture behind it is absent — the control that keeps the existence assertion non-vacuous.

Failing-first: with the body planted as `tests/src/server/${name}`, `npm run test:setup` reported **3 failed | 7 passed (10)** (`/home/user/work/evidence/worker-proofs/obj7-control-red.txt`). Restored: **10 passed (10)**.

Sweep: `grep -rn "const fixture = " tests` — no output.

### worker-obj-8 — applied (carry row worker-c1 ruled DRIFT, closed)

Every `await waitForDelay(20)` gate is gone. `waitForCondition` from `@orkestrel/test` replaces all three, each with a described condition and an explicit `{ budget: 5_000 }`:

- `tests/src/server/helpers.test.ts:242` — `'the long job is in flight'`.
- `:280` — `'the long job is in flight'` (the handoff spec).
- `:743` — `'three jobs are in flight'`.

Both abort specs warm the pool with a completed job before the long job, so the `acquire` returns an already-online idle thread and the abort lands on the attached listener rather than on a pending spawn. `waitForDelay` is no longer imported by that file.

The first abort spec was strengthened past `rejects.toBeDefined()`. These readings drove the final shape, and the second is a finding worth carrying:

1. Planting `#terminate` to skip `evict()` did **not** redden the suite: `npx vitest run … tests/src/server/helpers.test.ts` reported **48 passed (48)** (`/home/user/work/evidence/worker-proofs/obj8-control-red.txt`). The pool's `validate` reads `alive && worker.threadId > 0`, and `terminate()` already drops `threadId`, so `evict()` alone is not observable through the public surface.
2. Planting the real defect the row names — `#abort` calling `#fail` instead of `#terminate`, so the signal-ignoring thread is never terminated — left the spec green when its assertion was only "a replacement job resolves": the reused thread finishes its 2-second spin inside the deadline (`/home/user/work/evidence/worker-proofs/obj8-control-red-2.txt`, **2 failed | 46 passed (48)**, and neither failure was the abort spec).

So the spec now runs over `identify.ts`, which echoes its own `threadId`: it records the leased thread's id from the warm-up job, aborts the long job, and asserts the replacement job reports a **different** id. Against the `#abort` plant that reads the same id and fails. `npx vitest run … tests/src/server/helpers.test.ts` reported **3 failed | 45 passed (48)**, including `createNodeWorker — in-flight signal abort terminates + evicts the thread > rejects the aborted attempt and replaces the (signal-ignoring) thread` (`/home/user/work/evidence/worker-proofs/obj8-control-red-3.txt`). With the plant removed the same command reports **48 passed (48)** (`/home/user/work/evidence/worker-proofs/obj8-control-green.txt`).

No timeout was raised anywhere; the headroom sits in the `waitForCondition` budgets.

Sweep: `grep -n "waitForDelay" tests/src/server/helpers.test.ts` — no output.

### worker-obj-9 — applied

`tests/guides.test.ts` now imports `createJSONQueueStore`, `createNodeWorker`, `createThread`, `Dispatch`, and `isReply` from `@src/server`, plus `stringShape` and the shared `buildFixtureURL` / `tempDatabasePath` helpers, and closes with `describe('worker.md fences return the values they claim', …)` at `:194-256`. It transcribes the Threads fence, the `## NodeWorker` fence, the `## Persistence` fence, and the `### CPU-parallel jobs over threads` fence, asserting `42`, the stored entry, and `42` respectively — the values their trailing comments claim. Real worker threads and a real scratch file back each; the `guides` project runs in Node with the browser disabled, so a thread is reachable there.

Failing-first, value half: with `tests/src/server/fixtures/double.ts` planted to triple, `npm run test:guides` reported **3 failed | 15 passed (18)** — the Threads, NodeWorker, and CPU-parallel transcriptions, while every name-resolution assertion stayed green, which is the row's whole point (`/home/user/work/evidence/worker-proofs/obj9-control-red.txt`).

Failing-first, Persistence half: with `createJSONQueueStore` planted to suffix its driver path per call, the same command reported **1 failed | 17 passed (18)** on `the Persistence fence resumes the prior process outstanding entry` (`/home/user/work/evidence/worker-proofs/obj9-persistence-control-red.txt`).

Restored, `npm run test:guides` reports **18 passed (18)**.

The Threads fence body itself came from worker-subj-13 and the symbol rename from worker-obj-1, per the row's AMENDMENT; this row transcribed the resulting fence rather than rewriting it.

### worker-obj-10 — applied

`tests/src/server/fixtures/slow.ts:10,12` and `tests/src/server/fixtures/identify.ts:13,14` build their spin deadline from `performance.now()`. No import was added; `performance` is a global in the Node worker-thread scope and the type-stripped raw module is unaffected. The `.ts` import specifiers at `slow.ts:2` and `identify.ts:3` are untouched.

Sweep: `grep -rnE "Date\.now" src tests --include=*.ts` — no output.

No behavioural control exists for this row and I did not fabricate one. The defect it closes is a wall-clock adjustment during the spin; reproducing it needs the system clock moved, which is outside a test's reach and outside this unit's permissions. Both readings measure milliseconds identically on a steady clock, so the suite is green either way — the sweep plus the green server run (**74 passed (74)**) is the whole evidence this row can carry.

### worker-obj-11 — applied

`tests/src/core/Worker.test.ts:30` reads `// src/core/Worker.ts — the Queue⨉Pool facade.` Nothing else in the comment changed; `worker-subj-1` is not a row of this brief, so the `AGENTS §16` citation at `:33` was left alone.

Sweep: `grep -rn "core/workers/" tests src guides README.md` — no output.

### worker-subj-2 — applied

`NodeWorkerOptions` gains `readonly on?: EmitterHooks<WorkerEventMap<TResult>>` and `readonly error?: EmitterErrorHandler` at `src/server/types.ts:96-97`, placed first to mirror `WorkerOptions`, with `EmitterErrorHandler` / `EmitterHooks` imported from `@orkestrel/emitter` and `WorkerEventMap` from `@src/core`. Both are documented in the interface's `@remarks` at `:89-93` in the wording `WorkerOptions` uses.

`NodeWorker` captures them into `readonly #on` and `readonly #error` (`src/server/NodeWorker.ts:19-20`, assigned at `:32-33`) and threads them into `createWorker` with the same conditional-spread form as the other optional members (`:52-53`).

`guides/worker.md:112` lists `on?` / `error?` on the `NodeWorkerOptions` row, and `:322-324` states that a thread worker takes the same `on` and `error` hooks as the core worker.

`tests/src/server/factories.test.ts:135-160` proves it end to end: an `on: { success }` hook fires for a `createNodeWorker` job, and the throw from that same listener reaches the supplied `error` handler.

Failing-first: with the two spread lines removed from `build()`, `npx vitest run … tests/src/server/factories.test.ts` reported **1 failed | 8 passed (9)** on `createNodeWorker > wires the \`on\` hooks at construction and routes a listener throw to \`error\`` (`/home/user/work/evidence/worker-proofs/subj2-control-red.txt`). Restored, the file is green in the **74 passed (74)** server run.

The option addition ripples into `NodeWorkerOptionsProbe` (`tests/setupServer.ts`), which implements `Required<NodeWorkerOptions>`: it gains `on` and `error` getters ahead of `script`, and the read-order assertions in `tests/setupServer.test.ts:110-121` and `tests/src/server/factories.test.ts:181-192` lead with `'on', 'error'`. The snapshot tally in that second file reads `expect(reads.count).toBe(10)`.

### worker-subj-6 — applied

Every default in the package's public TSDoc uses the fixed form.

- `src/core/types.ts:55-59` — `concurrency` ends "Default: 1.", `retries` "Default: 0.", `timeout` "Default: no per-attempt deadline."
- `src/server/types.ts:80-85` — the same three sentences on the same three bullets.
- `src/core/factories.ts:21-22` — the `@param` parentheticals are gone; it lists the optional keys and points at `{@link WorkerOptions}`, which is the one place each default is stated.
- `src/core/types.ts:53-54` — the `pool` bullet stated a default in free prose too ("its `max` defaults to `concurrency`"), which the row's evidence did not enumerate. It reads "Default for its `max`: the `concurrency` value." Recorded as an ancillary decision on the same rule sentence.

Sweep: `grep -rniE "defaults to|\(default " src --include=*.ts` returns one line, `src/core/factories.ts:11` ("The pool's `max` defaults to `concurrency`, so resources match the jobs in flight"). Ruled permitted and left: it is composition narrative in the factory's `@remarks` about how the two options relate, not a documented option default — the row's repair scoped `factories.ts` to the `@param` parentheticals at `:21-22`, and `WorkerOptions` remains the one place each option's default value is stated. `grep -rn "Default: " src --include=*.ts` returns the `pool`, `concurrency`, `retries`, and `timeout` bullets in `src/core/types.ts` and the `concurrency`, `retries`, and `timeout` bullets in `src/server/types.ts`.

### worker-subj-9 — applied

The refuter's operative form plus the sites the re-run sweep found.

- `should` → `must`: `guides/worker.md:235`, `:442`.
- `just` deleted or recast: `guides/worker.md:250`, `:434`; `src/server/factories.ts:50`; `tests/src/server/helpers.test.ts:495`; `tests/src/server/handlers.test.ts:183-184`; `tests/src/server/fixtures/throw-async.ts:4`.
- `via` → `through`: `README.md:13`; `guides/worker.md:346`, `:442`; `src/server/types.ts` (the `workerData` bullet, rewritten wholesale by worker-subj-15); `src/server/factories.ts` (the `spawnThread` parenthetical, removed by worker-obj-1); `tests/src/core/Worker.test.ts:932`; `tests/src/server/helpers.test.ts:771`.
- Temporal `once` → `after`: `guides/worker.md` §Threads table (the `createThread` row, rewritten by worker-obj-1) and the `createThread` TSDoc at `src/server/factories.ts:11-12`, plus the sites the refuter's sweep did not name and I ruled temporal — `tests/src/server/fixtures/identify.ts:8`, `tests/src/server/fixtures/abortable.ts:2`, `tests/src/server/handlers.test.ts:130`, `tests/src/server/helpers.test.ts:488`, `tests/src/core/Worker.test.ts:620`, and `tests/src/core/Worker.test.ts:1074`.
- Count: `src/server/handlers.ts:55-56` reads "Read the envelope's `command`, `id`, `job`, and `input` fields once, defensively."

Closing sweeps, each over `README.md guides/worker.md guides/README.md src tests` with `--include=*.ts --include=*.md`, and none over the vendored dependency mirrors:

- `grep -rniE "\b(should|just|via|simply|easy|easier|currently|utilize|leverage|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|sanity check|dummy|blacklist|whitelist)\b"` — no output.
- `grep -rniE "\bonce\b"` — every remaining hit means "one time" (an option captured once, a registration read once) or is the `node:worker_threads` / `AbortSignal` `once` API. Ruled permitted, individually.
- `grep -rniE "\b(one|two|three|four|five|six|seven|eight|nine|ten)\b"` over `README.md guides/worker.md guides/README.md src` — every remaining hit is a limit, a quantity inside a described algorithm, or a value matching a literal in the same fence. The hits that were counts over growable sets were rewritten: `README.md` "Published with two entry points" → "Published with the entry points the `exports` field in `package.json` names"; `guides/worker.md` "The classes the two faces export" → "The classes the core and server faces export"; `guides/worker.md` "Two guards define the boundary" → "The `input` and `result` guards define the boundary".
- `grep -rniE "\b[0-9]+ (elements|members|rules|rows|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections|constants|passes|categories)\b"` — no output.

### worker-subj-10 — applied

An introducing sentence now precedes each bare table and list the evidence named: `guides/worker.md` §Factories (`:53`), §Threads table (`:86`), §Entities (`:95`), §Types (`:104`), the event-map table under §Observing (`:373`), §Practices (`:441`), §Tests (`:474`), §See also (`:548`); `guides/README.md` §By concept (`:7`), §By directory (`:13`), §See also (`:65`); `README.md` §Requirements (`:30`). The fences at `guides/worker.md:37` and the Threads fence keep their existing introductions.

Ancillary decision recorded: the three §Patterns fences (`### A resource-backed worker`, `### CPU-parallel jobs over threads`, `### Durable jobs across restarts`) sat bare under their headings and the evidence did not list them. The same rule sentence reaches a code fence, they are inside Owned, and closing them costs one sentence each, so each now carries an introduction. No vendored dependency guide was touched.

### worker-subj-11 — applied

`src/server/types.ts:6-8` reads "the reply half of the wire protocol `createNodeWorker` posts and `serveWorker` answers", and the sentence beginning "Internal plumbing rather than public call surface" is deleted. `guides/worker.md:114` (the `Reply` Surface row) reads "the reply half of the wire protocol". `guides/worker.md:200` reads "The run/abort/reply protocol is published as `Reply` and `isReply`:". The barrel is unchanged for these symbols; the INTERNAL list changed only for `Dispatch`, which is worker-obj-1's edit.

Sweep: `grep -rn "internal wire protocol\|Internal plumbing" src guides/worker.md` — no output.

### worker-subj-13 — applied

The Threads fence at `guides/worker.md:69-84` exercises every symbol it imports and uses every binding: it spawns through `createThread`, binds the `Dispatch` as `job` and logs `await job.promise` with the `// 42` claim, and calls `isReply` twice — a matching correlation id returning `true` and a foreign one returning `false`. The comment that stood in for the call is deleted. The fence compiles under `noUnusedLocals`, and it is transcribed and executed by worker-obj-9's block, so the claim is now gated rather than merely present.

### worker-subj-14 — applied

- `guides/worker.md:283-286` — the clause "Existing handlers that ignore the execution or destructure only `signal` remain source-compatible;" is deleted and the sentence starts at "The handler's resolved value is the reply:".
- `:285` — "`signal` is per attempt and fires on a cooperative abort."
- `:306` — "Per-job consumer context is explicit, structured-cloneable `TInput`."
- `:64-67` — "Exported for completeness and direct use; the factory is the intended entry point." is replaced by "Use these to drive one thread yourself; `createNodeWorker` is the entry point for pooled, queued work."

Sweep for `remain`, `remains`, and `still` over `guides/worker.md guides/README.md README.md src`: each remaining hit is concessive within a described case ("a throwing handler still frees the resource", "the pooled worker remains usable after the failure", "that reason remains first in `AggregateError.errors`") and stays. Four asserted continuity with an unstated earlier state and were rewritten: `guides/worker.md:12` "runtime `null` remains invalid" → "is invalid"; `guides/worker.md:242` and `src/server/types.ts:60` "a built `.js` / `.mjs` script remains an alternative" → "is an alternative"; `README.md:19` "remains explicit structured-cloneable input" → "is explicit, structured-cloneable input"; `src/server/NodeWorker.ts:16` "The resulting public entity remains the plain core `WorkerInterface`" → "is the plain core `WorkerInterface`". The `src/server/helpers.ts` site the row named ("Per-job consumer context remains explicit") moved into the `Dispatch` TSDoc with worker-obj-1 and reads "is explicit" there.

### worker-subj-15 — applied

The key name is unchanged. The licence is completed at `src/server/types.ts:76-78`: "`workerData` — opaque data cloned to every thread at spawn; the key mirrors the `node:worker_threads` `Worker` constructor option of the same name, and the thread reads it back from `node:worker_threads`. It must be structured-cloneable." The same source sentence is added to the structured-clone paragraph at `guides/worker.md:319-321`.

### fleet-F1 — noop

`tests/setup.ts` declares no `isBrowserVuePath`, and `tests/setup.test.ts` has no `describe('isBrowserVuePath', …)` block. `grep -rn "isBrowserVuePath" tests/setup.ts tests/setup.test.ts src tests/setupServer.ts` returns no output. The helper is absent, so the row records `noop` on the paths read. Nothing was deleted, the `setup` project stays in `vite.config.ts`, and the `test:setup` script keeps its step in the `test` chain.

### fleet-F2 — noop

No implementation class declares a public `readonly id: string` data field ahead of its `#` fields. Classes read: `Worker` (`src/core/Worker.ts:47`), `Dispatch` (`src/server/Dispatch.ts:54`), `NodeWorker` (`src/server/NodeWorker.ts:19`), `Thread` (`src/server/Thread.ts:13`), plus the test-infrastructure classes `TestQueueStore` and `PoolOptionsProbe` (`tests/setup.ts`) and `NodeWorkerOptionsProbe` and `ThreadReply` (`tests/setupServer.ts`). The only `readonly id: string` in the tree is a member of the `Reply` union type at `src/server/types.ts:21-22`, which is a type alias rather than a class field. No `JSON.stringify` inspection was needed, because the shape the row targets does not occur.

## Files touched

| File | Change |
| ---- | ------ |
| `/home/user/fleet/worker/src/core/types.ts` | `QueueContext` import and `WorkerHandler` third parameter renamed; the three defaults take the fixed "Default: …" form |
| `/home/user/fleet/worker/src/core/Worker.ts` | `QueueContext` import; `#handle` parameter and its TSDoc reference renamed to `context` |
| `/home/user/fleet/worker/src/core/factories.ts` | the `@param` parentheticals drop the duplicated defaults and point at `WorkerOptions` |
| `/home/user/fleet/worker/src/server/types.ts` | `QueueContext`; `on?` / `error?` added to `NodeWorkerOptions` with their remarks; `workerData` mirror licence completed; defaults in fixed form; `Reply` and `NodeThread` remarks rewritten (public reply surface, foreign-implementation obligation) |
| `/home/user/fleet/worker/src/server/helpers.ts` | reduced to `isReply`; imports no implementation class; header comment rewritten |
| `/home/user/fleet/worker/src/server/factories.ts` | gains `createThread` with a runnable `@example`; `createNodeWorker` remarks name `createThread` and `Dispatch`; `just` deleted |
| `/home/user/fleet/worker/src/server/Dispatch.ts` | published class TSDoc with `@example` and the foreign-thread obligation; `#context` field and reads renamed |
| `/home/user/fleet/worker/src/server/NodeWorker.ts` | constructs `Thread` and `Dispatch` directly; captures and threads `on` / `error`; `context` parameter |
| `/home/user/fleet/worker/src/server/handlers.ts` | count replaced by the named fields; `context.id` in TSDoc; the job-id local renamed `entry` |
| `/home/user/fleet/worker/src/server/index.ts` | adds `export * from './Dispatch.js'` |
| `/home/user/fleet/worker/guides/worker.md` | Threads section rewritten; `Dispatch` Entities row; `createThread` row; `QueueContext` substitution; introducing sentences; `on?` / `error?`; `workerData` mirror; vocabulary and continuity rewrites; Tests entries updated |
| `/home/user/fleet/worker/guides/README.md` | introducing sentences before both index tables and the See-also list |
| `/home/user/fleet/worker/README.md` | `via` → `through`; count removed from the Package section; continuity rewrite; Requirements introduction |
| `/home/user/fleet/worker/tests/guides.test.ts` | `symbol.keyword`; INTERNAL and barrel-absence names; the flagship-fence transcription block |
| `/home/user/fleet/worker/tests/setupServer.ts` | `buildFixtureURL` added; `tempDatabasePath` returns its scratch; probe gains `on` / `error` getters |
| `/home/user/fleet/worker/tests/setupServer.test.ts` | type import first; `buildFixtureURL` case and its control; scratch-based `tempDatabasePath` case; probe read order |
| `/home/user/fleet/worker/tests/src/server/factories.test.ts` | `createThread` cases; the `on` / `error` hook case; shared fixture URLs; scratch disposers; read order and tally |
| `/home/user/fleet/worker/tests/src/server/helpers.test.ts` | `createThread` / `Dispatch` call sites; shared fixture URLs; `waitForCondition` budgets; warmed abort specs with the threadId eviction assertion; the foreign-`NodeThread` case; vocabulary |
| `/home/user/fleet/worker/tests/src/server/handlers.test.ts` | shared fixture URLs; `just` recast; temporal `once`; describe renamed to "stable job identity" |
| `/home/user/fleet/worker/tests/src/core/Worker.test.ts` | subject path corrected to `src/core/Worker.ts`; `via` and temporal `once` |
| `/home/user/fleet/worker/tests/src/server/fixtures/slow.ts` | spin deadline on `performance.now()` |
| `/home/user/fleet/worker/tests/src/server/fixtures/identify.ts` | spin deadline on `performance.now()`; temporal `once` |
| `/home/user/fleet/worker/tests/src/server/fixtures/crash.ts` | comment names the `Dispatch` |
| `/home/user/fleet/worker/tests/src/server/fixtures/load-throw.ts` | comment names `createThread` and the `Dispatch` |
| `/home/user/fleet/worker/tests/src/server/fixtures/abortable.ts` | temporal `once` |
| `/home/user/fleet/worker/tests/src/server/fixtures/throw-async.ts` | `just` recast |

Diffstat: 26 files changed, 2460 lines in `git diff HEAD` (`/home/user/work/evidence/conform-worker.diff`).

## Gates

Each run captured under `/home/user/work/evidence/worker-proofs/`. Before proving, `npm run format` ran to converge, per `AGENTS.md`.

| Command | Exit code | Reading | File |
| ------- | --------- | ------- | ---- |
| `npm run format:check` | 0 | — | `gate-1-format-check.txt` |
| `npm run lint:check` | 0 | — | `gate-2-lint-check.txt` |
| `npm run check` | 0 | — | `gate-3-check.txt` |
| `npm run build` | 0 | — | `gate-4-build.txt` |
| `npm test` | 0 | `src:core`+`src:server` 111 passed (111); `policy` 111 passed (111); `config` 46 passed (46); `setup` 10 passed (10); `guides` 18 passed (18) | `gate-5-test.txt` |

`git status --short` lists 26 entries, every one inside Owned (`/home/user/work/evidence/conform-worker.status`). No file under `.claude/`, `.codex/`, `.cursor/`, `.agents/`, `configs/`, `scripts/`, the vendored test set, a vendored `guides/<dep>.md` mirror, `package.json`, or `node_modules/` was written. No `npm install`, no discarding git command, no commit, no stage.

**Observation, not a criterion.** The `npm test` reading was taken inside this unit's own exec with its harness resident. The Orchestrator's deciding run belongs after this unit exits.

## Breaking

`@orkestrel/worker/server` loses `spawnThread` and `dispatch`, and gains `createThread` and `Dispatch`.

| Removed | Replacement |
| ------- | ----------- |
| `spawnThread(script, workerData)` | `createThread(script, workerData?)` — same behaviour, `workerData` now optional |
| `dispatch(thread, input, context, result)` | `new Dispatch(thread, input, context, result).promise` — the class is now barrelled |

`ServeWorkerOptions.handler` and `WorkerHandler` also changed their context parameter's type name (`QueueExecution` → `QueueContext`) as the addendum directs; that is source-compatible for any caller that destructures or ignores it, and breaking only for a caller that names the type.

No consumer edit is required to keep this package's own gates green. I searched the fleet for importers and found none:

```
grep -rn "spawnThread\|from '@orkestrel/worker" /home/user/fleet --include=*.ts --include=*.md -l
```

returns only files inside `/home/user/fleet/worker` itself. Recorded as an unknown the brief flagged: the brief's § Consumers says "none named by the confirmed rows", and my own search agrees, but I searched only `/home/user/fleet` and cannot see a consumer outside it.

## Shared-file patches

None. No row required an edit outside Owned. No vendored file, no sibling checkout, and no vendored `guides/<dep>.md` mirror was written.

## Deviations

None. No row stopped, no name collided, and no repair contradicted a rule.

These ancillary decisions were taken and carried on from, as the deviation contract permits:

1. The `QueueExecution` → `QueueContext` substitution extended to `src/server/handlers.ts`'s TSDoc reference and its job-id local, because the addendum's rename made that prose false about `ServeWorkerOptions`. Test and fixture parameter names keep `execution`.
2. Introducing sentences were added to the three §Patterns fences in `guides/worker.md`, which the worker-subj-10 evidence did not enumerate but the rule it cites reaches.
3. `createThread` and `isReply` were kept in the guide's §Threads table rather than moved into §Factories, so the section keeps its subject; parity is satisfied from either table.

These readings corrected assumptions mid-unit and are worth carrying forward:

- A worker thread whose script cannot be resolved reports `online` **before** it dies, so `createThread` resolves and the death arrives through the latch. My first `createThread` case asserted a rejection and failed (`/home/user/work/evidence/worker-proofs/src-server-after.txt`); the case now asserts the latch, which is what actually holds.
- Removing `Dispatch`'s `evict()` call does not redden this suite, because the pool's `validate` reads `alive && worker.threadId > 0` and `terminate()` already drops `threadId`. `evict()` is therefore not independently observable through the public surface. Anyone auditing eviction coverage should know that the assertion that binds is the thread-identity one, not the liveness flag.

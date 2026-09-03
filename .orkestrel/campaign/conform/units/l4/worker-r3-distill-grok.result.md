I'll start by reading the brief and the repository's agent contracts so I can follow them exactly.I'll load the unit brief, audit brief, report, and evidence next so the row map is complete before any sweep.The row population is loaded. Next I’ll read current sites, the evidence diff, and the cited rule sentences in parallel.I’ll keep mapping current line numbers and running the old-form sweeps the brief requires.## Question

For every row of unit conform-worker, what the tree at `/home/user/fleet/worker` carries now, what the unit's diff changed there, and whether the report's readings match the tree.

## Evidence

Law sentences the rows cite (canon `/home/user/scaffold/.claude/rules/` and `/home/user/scaffold/AGENTS.md`): architecture.md Kind purity: "Keep the leaf pair class-free. `helpers.ts` and `validators.ts` sit at the bottom of a module's graph: they import types, constants, errors, and each other, and they import no implementation class. Every file that constructs or drives a class — `cloners.ts`, `compilers.ts`, `factories.ts`, `shapers.ts` — sits above them, consumes them, and is never consumed by them." architecture.md Functions: "Never declare or assign a function inside another function or method. This bans local `function`, `function*`, and `const fn = () => ...`, regardless of caller count. The only in-body function expressions allowed are an anonymous callback passed directly as an argument and an anonymous function returned directly as the result (the factory/combinator pattern)." typescript.md: "Place `import type` declarations before value imports." quality.md: "Document the obligation instead when a defect is reachable only through a hypothetical foreign implementation of a contract this package publishes. State it on the interface that owns it and prove the documentation." tests.md: "Any duplicate or near-duplicate helper is a defect; consolidate it into one general form." / "Test files import shared infrastructure rather than declaring local fixture factories." / "Export every reusable helper, fixture type, factory, constant, and guard from setup files." / Delay: "Use it to yield, never to wait for something another process produces." / "Transcribe each flagship fence and assert the values its comments claim." / "Measure an elapsed interval with `performance.now()`, never `Date.now()`." typescript.md: "Write a default as \"Default: …\" and a thrown error as \"Thrown when …\"." patterns.md: "Add `readonly on?: EmitterHooks<{Entity}EventMap>` and `readonly error?: EmitterErrorHandler` to options." names.md: "Ungrouped option keys: one word." writing.md: "In a reply or a guide, introduce every list, table, and code fence with a complete sentence naming what follows; a rule file's list sits bare under its heading." documentation.md: "A showcase is executable proof of public API. A missing demonstration is a missing feature, detectable by parity." / "Falsify a prose claim the way you falsify a code claim." / "A parity failure identifies drift; never suppress or weaken the test." AGENTS.md Design laws: "Minimal public API. … Once an intentional reusable capability exists, expose its top-level source exports through the correct environment barrel … Remove a symbol only when the capability itself should not exist." / "No compatibility shims. This is greenfield." writing.md Claims: "Write the present tense for what exists. Do not write `currently`, `now`, `new`, `latest`, or `soon`." AGENTS.md Writing: "**NEVER state a count.** … Name the members, or write the sentence without the number." architecture.md: "A function returning a live entity is an entity factory and belongs in `factories.ts` whatever it is called." / "A row obliges a documented, runnable example."

### worker-obj-1

1. **Site now.** Brief `src/server/helpers.ts:5-6` (`import { Dispatch }` / `import { Thread }`) is gone. Current `:5-6` is comment, not those imports:

```4:6:/home/user/fleet/worker/src/server/helpers.ts
// === The wire protocol (main ↔ thread)
//
// The reply half of the run/abort/reply protocol `serveWorker` answers — the leaf predicate
```

`helpers.ts` now starts `import type { Reply }` at `:1` and exports only `isReply` at `:26`. `spawnThread` is `createThread` at `src/server/factories.ts:41`. `dispatch` wrapper is absent. `NodeWorker.#create` is `new Thread(...)` at `:61-62`; `#handle` is `new Dispatch(...).promise` at `:79`. `src/server/index.ts:5` is `export * from './Dispatch.js'`. `NodeWorker.ts` does not import `./factories.js`. `Dispatch.ts:6` still `import { isReply } from './helpers.js'`. `tests/guides.test.ts:55` `INTERNAL` is `['class NodeWorker', 'class Thread']`; `:77` names `['NodeWorker', 'Thread']`.

2. **Diff at the site.** `src/server/helpers.ts @@ -1,80 +1,14 @@` deletes `import { Dispatch }` / `import { Thread }`, `export function spawnThread`, and `export function dispatch`. First `+` line in that hunk: `+import type { Reply } from './types.js'`. `src/server/factories.ts @@ -1,17 +1,53 @@` adds `+export function createThread(script: string | URL, workerData?: unknown): Promise<NodeThread> {` (verbatim vs repair). `src/server/index.ts @@ -2,3 +2,4 @@` `+export * from './Dispatch.js'` (verbatim). `src/server/NodeWorker.ts @@ -62,12 +70,12 @@` `+		return new Dispatch(thread, input, context, this.#result).promise` — repair text used `execution`; `context` is what the `+` line carries. Repair `import { createThread } from './factories.js'` is not in the `+` lines; `+		return new Thread(this.#script, this.#workerData).promise` is. `createDispatch` has no hit in the tree.

3. **Old form sweep.** Paths: `src`, `tests`, `guides/worker.md`, `guides/README.md`, `README.md` (no `node_modules`). `\b(spawnThread|spawnThreads|spawnThreaded|spawnThreading)\b` and case-insensitive `spawnThread`: no hit. `\b(dispatch|dispatches|dispatched|dispatching)\b`: hits at `src/server/types.ts:18,34,37,41`; `src/server/helpers.ts:18`; `src/server/factories.ts:22,25`; `src/server/Dispatch.ts:10,14,22,29`; `src/server/handlers.ts:24,84`; `tests/src/server/helpers.test.ts:52,245,505,537,553,554,635,810`; `tests/src/server/handlers.test.ts:42,43,44,53,54,55,56,58,63,126,128,129,131,147`; `tests/src/server/fixtures/identity.ts:3`; `guides/worker.md:207,225,227,228,232,241,243,320`; `README.md:16`; `guides/README.md` no hit. `import { dispatch` / `export function dispatch`: no hit.

4. **Report reading.** Table: `applied`. Sentence: "The refuter's operative form, in full." Cited `src/server/factories.ts:41` now is `export function createThread(...)`. Cited `src/server/index.ts:5` now is `export * from './Dispatch.js'`. Cited INTERNAL / barrel-absence names match `:55` / `:77`.

5. **Proof reading.** Report: parity red `npm run test:guides` **3 failed | 15 passed (18)** file `obj1-parity-control-red.txt` — file exists; `Tests  3 failed | 15 passed (18)`. Green `guides-after.txt` — exists; `Tests  18 passed (18)`. createThread red `obj1-createThread-control-red.txt` — exists; `Tests  1 failed | 8 passed (9)`. Isolated green `obj1-createThread-green-isolated.txt` — exists; `Tests  1 passed | 8 skipped (9)`.

### worker-obj-2

1. **Site now.** Brief `tests/setupServer.ts:24` is no longer `tempDatabasePath`. Current `:22-24` is `buildFixtureURL`. `tempDatabasePath` is `:40-43`:

```39:43:/home/user/fleet/worker/tests/setupServer.ts
// file leaks.
export function tempDatabasePath(): { readonly path: string; readonly scratch: ScratchInterface } {
	const scratch = createScratch({ prefix: 'worker-store-' })
	return { path: join(scratch.path, 'store.json'), scratch }
```

`ScratchInterface` import `:7`. Call sites `tests/src/server/factories.test.ts:38,54,78` `const { path, scratch } = tempDatabasePath()` then `teardown.add(() => scratch.destroy())`. `tests/setupServer.test.ts:68` same destructure; `:73` and `:78` `scratch.destroy()`.

2. **Diff at the site.** `tests/setupServer.ts @@ -14,18 +16,32 @@` removes `cleanup: () => scratch.destroy()`; `+export function tempDatabasePath(): { readonly path: string; readonly scratch: ScratchInterface } {` (verbatim vs repair).

3. **Old form sweep.** `cleanup\(\)|readonly cleanup` over `src` `tests`: no hit. Word-boundary `cleanup` remains as queue-cleanup prose (`src/core/types.ts:99,104,110,116`; `src/core/Worker.ts:30,32,177`). Inflections `cleanups|cleaned|cleaning`: no hit in `src`.

4. **Report reading.** `applied`. "tests/setupServer.ts:40-43 returns `{ readonly path: string; readonly scratch: ScratchInterface }`". Those lines carry that. `:7` is the `ScratchInterface` import. `:38,54,78` match the factories call sites.

5. **Proof reading.** Report `npm run test:setup` red **1 failed | 9 passed (10)** `obj2-control-red.txt` — exists; `Tests  1 failed | 9 passed (10)`. Green `setup-after.txt` — exists; `Tests  10 passed (10)`. Sweep `cleanup()` empty agrees with field 3 for that pattern.

### worker-obj-3

1. **Site now.** Brief `tests/setupServer.test.ts:8` (`import type` after values) moved. Current `:1-2`:

```1:2:/home/user/fleet/worker/tests/setupServer.test.ts
import type { NodeWorkerOptions } from '@src/server'
import { describe, expect, it } from 'vitest'
```

2. **Diff at the site.** `tests/setupServer.test.ts @@ -1,24 +1,30 @@` first `+` line `+import type { NodeWorkerOptions } from '@src/server'`; the trailing type import is deleted. Repair text present verbatim.

3. **Old form sweep.** Not a rename. `^import type` in that file: `:1` only.

4. **Report reading.** `applied`. "`tests/setupServer.test.ts:1` is `import type { NodeWorkerOptions } from '@src/server'`" — that line carries it.

5. **Proof reading.** Placement row. Report sweep `grep -rn "^import type" tests/setupServer.test.ts` returns line 1 — agrees with field 3.

### worker-obj-6

1. **Site now.** Brief `src/server/Dispatch.ts:135` (`instanceof Thread` / `evict`) is now `:166`:

```165:167:/home/user/fleet/worker/src/server/Dispatch.ts
		this.#detach()
		if (this.#thread instanceof Thread) this.#thread.evict()
		let termination: Promise<number>
```

`NodeThread` remarks `:41-45`. Dispatch TSDoc `:35-37`. Guide `:213` "flips `alive = false` for a thread this package produced". Foreign-thread case `tests/src/server/helpers.test.ts:613-639`.

2. **Diff at the site.** The evict statement is not a `+` line. Nearby hunk `src/server/Dispatch.ts @@ -125,7 +156,7 @@` is `this.#terminate(this.#context.signal.reason, notification)`. Operative remarks are `+` in `@@ -7,19 +7,55 @@` (`+ * Eviction reaches \`alive\` for a {@link NodeThread} this package produced.`) and `src/server/types.ts @@ -30,12 +31,18 @@` (`+ * A dispatch marks a thread dead for a \`NodeThread\` this package produced, through`). Repair "flips `alive = false` for a thread this package produced" is in the worker.md `+` lines (guide hunk around abort clause 6). Finder text naming `spawnThread` / `dispatch` is not what those `+` lines use; they name `createThread` / `Dispatch`.

3. **Old form sweep.** Unqualified guide clause "flips `alive = false`" without the produced-thread qualifier: no hit. `spawnThread`: no hit (same as obj-1).

4. **Report reading.** `applied`. `src/server/types.ts:41-45` carries the foreign-implementation remarks. `src/server/Dispatch.ts:35-37` carries the qualifier. Report `guides/worker.md:210` for the flips clause: current `:210` is "without a string `job` fails closed"; the flips clause is `:213`. Report `tests/src/server/helpers.test.ts:601-630`: current foreign case is `:613-639`; `:601` is still the crash-latch spec.

5. **Proof reading.** Report red `obj6-control-red.txt` **1 failed | 47 passed (48)** — exists; `Tests  1 failed | 47 passed (48)`; body names `helpers.test.ts:625` (tree assertion now `:633`). Green named `obj8-control-green.txt` — exists; `Tests  48 passed (48)`.

### worker-obj-7

1. **Site now.** Brief `tests/src/server/helpers.test.ts:40`, `handlers.test.ts:13`, `setupServer.test.ts:17` local `fixture` declarations are gone. Shared helper `tests/setupServer.ts:22-24` `buildFixtureURL`. Proof case `tests/setupServer.test.ts:54-63`. Imports: `helpers.test.ts:15`, `handlers.test.ts:5`, `setupServer.test.ts:10`, `factories.test.ts:18`.

2. **Diff at the site.** `tests/setupServer.ts` `+export function buildFixtureURL(name: string): URL {` / `+	return new URL(\`tests/src/server/fixtures/${name}\`, resolveRoot(import.meta))` (verbatim vs repair). `tests/src/server/helpers.test.ts @@ -36,9 +39,6 @@` deletes `const fixture = ...`. `tests/setupServer.test.ts` deletes `const fixture = (name: string): URL => new URL(\`./src/server/fixtures/${name}\`, import.meta.url)`.

3. **Old form sweep.** `const fixture = ` over `tests`: no hit. Word-boundary `fixture` remains as ordinary English (`tests/setupServer.test.ts:55,60`; `helpers.test.ts:22,177,230,298,318,802,804`; and other files). Inflections `fixtures|fixtured|fixturing`: directory name `fixtures` throughout.

4. **Report reading.** `applied`. `:22-24` is `buildFixtureURL`. Report `:56-65` for the proof: the `it` is `:55-63`.

5. **Proof reading.** Broad red `obj7-control-red.txt` — exists; `Tests  3 failed | 7 passed (10)`. Isolated red `obj7-control-red-isolated.txt` — `Tests  1 failed | 5 skipped (6)`. Isolated green `obj7-green-isolated.txt` — `Tests  1 passed | 5 skipped (6)`. Report's unrestored broad green **10 passed (10)** has no uniquely named file; `setup-after.txt` reads that summary.

### worker-obj-8

1. **Site now.** Brief `helpers.test.ts:228,:252,:643` `await waitForDelay(20)` gone. Current gates: `:239-241`, `:275-277`, `:727-729` `waitForCondition` with `{ budget: 5_000 }`. Warm-up `:228` / `:267`. Import `:14` `waitForCondition` only (no `waitForDelay` in this file).

2. **Diff at the site.** `tests/src/server/helpers.test.ts @@ -209,39 +209,62 @@` and `@@ -249,7 +272,9 @@` and `@@ -640,7 +724,9 @@`. `+		await waitForCondition('the long job is in flight', () => worker.active === 1, {` and `+		await waitForCondition('three jobs are in flight', () => worker.active === 3, {` present. Repair `budget: 5_000` present.

3. **Old form sweep.** `waitForDelay` in `tests/src/server/helpers.test.ts`: no hit. Same name remains in `tests/src/core/Worker.test.ts` (many lines including `:962,:1092,:1101,:1141` still `waitForDelay(20)`) and `tests/src/server/handlers.test.ts:259` `waitForDelay(0)`. Inflections `waitForDelays|waitForDelayed|waitForDelaying`: no hit.

4. **Report reading.** `applied`. Cited `:239`, `:275`, `:727` carry those `waitForCondition` calls.

5. **Proof reading.** `obj8-control-red.txt` exists; `Tests  48 passed (48)` (report: evict plant did not redden). `obj8-control-red-2.txt` `Tests  2 failed | 46 passed (48)`. `obj8-control-red-3.txt` `Tests  3 failed | 45 passed (48)`. Green `obj8-control-green.txt` `Tests  48 passed (48)`. Isolated red/green files exist with `1 failed | 47 skipped (48)` / `1 passed | 47 skipped (48)`. Report sweep `waitForDelay` in this file empty agrees.

### worker-obj-9

1. **Site now.** Brief `tests/guides.test.ts:1-189` had no `@src/server`. Current file imports `@src/server` at `:26-32` and transcription `describe` at `:199-255`.

2. **Diff at the site.** `tests/guides.test.ts @@ -20,8 +20,17 @@` and `@@ -187,3 +191,65 @@`. `+	createJSONQueueStore,` `+	createNodeWorker,` `+	createThread,` `+	Dispatch,` `+	isReply,` and `+describe('worker.md fences return the values they claim', () => {`. Repair "do not also rewrite the Threads fence from this unit": the fence rewrite is in `guides/worker.md`, not this file's transcription-only addition.

3. **Old form sweep.** No removed symbol. `@src/core` still absent from this file.

4. **Report reading.** `applied`. `:199-255` is the transcription block. Report says it transcribes Threads / NodeWorker / Persistence / CPU-parallel asserting `42` / stored entry / `42` — those expects sit at `:205-207`, `:222`, `:236`, `:250`.

5. **Proof reading.** `obj9-control-red.txt` exists; `Tests  3 failed | 15 passed (18)`. `obj9-persistence-control-red.txt` exists; `Tests  1 failed | 17 passed (18)`. Restored **18 passed (18)** is `guides-after.txt` (same file obj-1 used).

### worker-obj-10

1. **Site now.** `tests/src/server/fixtures/slow.ts:10,12` and `identify.ts:13,14` are `performance.now()`. No `performance` import. `slow.ts:2` / `identify.ts:3` still `from '../../../../src/server/handlers.ts'`.

2. **Diff at the site.** `slow.ts @@ -7,9 +7,9 @@` `+		const deadline = performance.now() + value` / `+		while (performance.now() < deadline) {` (verbatim). `identify.ts @@ -5,13 +5,13 @@` same pair.

3. **Old form sweep.** `Date\.now` over `src` `tests`: no hit. Case-insensitive `date.now`: no hit in those trees.

4. **Report reading.** `applied`. Cited lines carry `performance.now()`.

5. **Proof reading.** Report: no negative control; evidence is the `Date.now` sweep (empty, agrees) plus green run. No dedicated control file for this row.

### worker-obj-11

1. **Site now.** `tests/src/core/Worker.test.ts:30`:

```29:31:/home/user/fleet/worker/tests/src/core/Worker.test.ts

// src/core/Worker.ts — the Queue⨉Pool facade. Real behaviour, no mocks: a
// counting `create` hook proves resources are reused and never exceed the pool max,
```

2. **Diff at the site.** `tests/src/core/Worker.test.ts @@ -27,10 +27,10 @@` `+// src/core/Worker.ts — the Queue⨉Pool facade. Real behaviour, no mocks: a` (verbatim). Also `-// ... (AGENTS §16).` → citation stripped on `:33`.

3. **Old form sweep.** `core/workers/` over `src` `tests` `guides` `README.md`: no hit. Inflections `worker` as folder: no `src/core/workers`.

4. **Report reading.** `applied`. `:30` carries `src/core/Worker.ts`.

5. **Proof reading.** Report sweep empty agrees.

### worker-subj-2

1. **Site now.** Brief `src/server/types.ts:71-80` (`NodeWorkerOptions` without `on`/`error`) moved. Interface now `:85-96` with `:86-87` `on?` / `error?`. Remarks `:76-80`. `NodeWorker.ts:19-20` fields, `:31-32` assign, `:52-53` spreads. Guide Types row `:112`. Prose `:326-328`. Test `tests/src/server/factories.test.ts:149-167`.

2. **Diff at the site.** `src/server/types.ts @@ -50,25 +57,34 @@` `+	readonly on?: EmitterHooks<WorkerEventMap<TResult>>` / `+	readonly error?: EmitterErrorHandler`. `NodeWorker.ts @@ -1,19 +1,23 @@` and `@@ -43,6 +49,8 @@` add the spreads. Repair text present.

3. **Old form sweep.** No removed name. Adding keys.

4. **Report reading.** `applied`. `:86-87`, `:19-20`, `:32-33` (assign is `:31-32`), `:52-53` match. Report `guides/worker.md:112` is the `NodeWorkerOptions` row with `on?` / `error?`. Report `:322-324` for the thread-worker hooks sentence: those lines are the `workerData` clone paragraph; the hooks sentence is `:326-328`. Report `factories.test.ts:135-160`: the `it` is `:149`.

5. **Proof reading.** `subj2-control-red.txt` exists; `Tests  1 failed | 8 passed (9)`. Isolated green `subj2-green-isolated.txt` exists; `Tests  1 passed | 8 skipped (9)`.

### worker-subj-6

1. **Site now.** Brief `src/core/types.ts:56,57,58` now `:55-59` ending "Default: 1." / "Default: 0." / "Default: no per-attempt deadline." `src/server/types.ts:68-73` same three sentences. `src/core/factories.ts:21-22` lists optional keys and `{@link WorkerOptions}` (no parenthetical defaults). Ancillary pool line `src/core/types.ts:54` "Default for its `max`: the `concurrency` value." and `src/core/factories.ts:11` "Default for the pool's `max`: the `concurrency` value, so resources match the jobs in flight."

2. **Diff at the site.** `src/core/types.ts @@ -50,12 +50,13 @@` `+` lines include `Default: 1.` `Default: 0.` `Default: no per-attempt deadline.` (verbatim). Same in `src/server/types.ts`. `src/core/factories.ts @@ -18,8 +18,8 @@` drops `(default \`1\`)` / `(default \`0\`)`.

3. **Old form sweep.** `defaults to|\(default ` over `src`: no hit.

4. **Report reading.** `applied`. Cited default bullets match. Report "Sweep: `grep -rnE \"defaults to|\\(default \" src` returns no output" agrees.

5. **Proof reading.** Documentation row; sweep agrees.

### worker-subj-9

1. **Site now.** Brief sites moved. `guides/worker.md:239` "must be structured-cloneable"; `:457` "must diverge". `README.md:13` "through `input` / `result` guards". `src/server/handlers.ts:55-56` names `command`, `id`, `job`, and `input`. `src/server/factories.ts:50-52` "A queue's durable state is a database table" (no `just`). Temporal `after` at `src/server/factories.ts:11-12` ("after it comes online") and `tests/src/server/fixtures/identify.ts:8`, `abortable.ts:2`.

2. **Diff at the site.** README `@@ -10,13 +10,13 @@` `+... through \`input\` / \`result\` guards`. handlers `@@ -52,7 +52,8 @@` `+		// Read the envelope's \`command\`, \`id\`, \`job\`, and \`input\` fields once, defensively.` (verbatim vs repair). factories `just` deleted in `@@ -1,17 +1,53 @@` region (`+ * A queue's durable state is a database table`).

3. **Old form sweep.** `\b(should|just|via)\b` over `src` `tests` `guides/worker.md` `guides/README.md` `README.md`: no hit. `\bfour fields\b`: no hit. `\bonce\b` remaining (permitted "one time" / API): `src/core/types.ts:55`; `src/server/types.ts:68`; `src/server/Dispatch.ts:106`; `src/server/handlers.ts:55`; `src/core/Worker.ts:18,21,180`; `src/server/Thread.ts:43,44,45`; tests and guide hits listed in the `once` grep (property-order once, `{ once: true }`, "at once", "exactly once").

4. **Report reading.** `applied`. Report `guides/worker.md:235` / `:442` for `must`: current `must` requirement lines are `:239` and `:457`. Report via sites `guides/worker.md:346,:442`: current "through" at `:357` and `:456`. Count sentence matches `handlers.ts:55-56`.

5. **Proof reading.** Report closing sweeps claimed empty for the banned-term pattern; field 3 agrees for `should|just|via` on the owned population. Report `once` remaining-hits reading is a classification, not an empty sweep.

### worker-subj-10

1. **Site now.** Brief bare tables now have intros: `guides/worker.md:53` Factories, `:86` Threads table, `:95` Entities, `:104` Types, `:373` Observing events, `:451` Practices, `:474` Tests, `:571` See also; `guides/README.md:7` and `:15`; `README.md:30`. Report also records deletion of `guides/README.md` See-also; current file ends at the guide.md mirror (`:60-65`), no See-also list. Pattern fence intros `:392`, `:412`, `:432`.

2. **Diff at the site.** `guides/worker.md @@ -50,6 +50,8 @@` `+Each factory the package publishes, with the entry point it belongs to:` (verbatim vs example). `guides/README.md @@ -1,15 +1,19 @@` adds the two intros. `README.md @@ -27,6 +27,8 @@` `+The package runs under these conditions:`. `guides/README.md @@ -59,7 +63,3 @@` deletes the See-also block.

3. **Old form sweep.** No removed identifier.

4. **Report reading.** `applied`. Report `:53,:86,:95,:104,:373,:474` match those intros. Report Practices `:441`: heading is `:449`, intro `:451`. Report See also `:548`: intro is `:571`. Report `guides/README.md:13`: directory intro is `:15` (table `:17`).

5. **Proof reading.** Documentation row; intros are in the tree.

### worker-subj-11

1. **Site now.** Brief `src/server/types.ts:10-11` "internal" / "Internal plumbing" gone. Current `:8-10` "the reply half of the wire protocol". `guides/worker.md:115` Reply row "the reply half of the wire protocol". `:204` "The run/abort/reply protocol is published as `Reply` and `isReply`:". `src/server/index.ts:1-2` still star-exports types and helpers. INTERNAL does not list `Reply` / `isReply`.

2. **Diff at the site.** `src/server/types.ts @@ -1,18 +1,19 @@` replaces the internal-protocol sentence; plumbing sentence deleted. worker.md Surface/protocol `+` lines carry the published wording.

3. **Old form sweep.** `internal wire protocol|Internal plumbing` over `src` `guides/worker.md`: no hit.

4. **Report reading.** `applied`. `:8-10` match. Report `guides/worker.md:114` / `:200`: Reply row is `:115`; published-protocol sentence is `:204` (`:200` is "satisfy result guard").

5. **Proof reading.** Sweep empty agrees.

### worker-subj-13

1. **Site now.** Brief unused-import fence `guides/worker.md:67-80` is now `:69-84`: imports `createThread, Dispatch, isReply`; uses `job.promise`, two `isReply(...)` calls; no unread `result`; no comment standing in for the call.

2. **Diff at the site.** `guides/worker.md @@ -60,52 +62,60 @@` `+import { createThread, Dispatch, isReply } from '@orkestrel/worker/server'` and `+	console.log(isReply({ id: 'reply-1', ok: true, value: 42 }, 'reply-1')) // true`. Finder kept `spawnThread`/`dispatch`; those names are not in the `+` fence.

3. **Old form sweep.** `spawnThread` no hit. Bare `isReply` import without a call in this fence: the fence now calls it (`:79-80`).

4. **Report reading.** `applied`. Report `:69-84` matches the current fence.

5. **Proof reading.** Documentation/fence row; transcription is obj-9's block.

### worker-subj-14

1. **Site now.** Brief `:283` compatibility clause gone. Current `:294` starts "The handler's resolved value is the reply:". `:293` "`signal` is per attempt...". `:310` "Per-job consumer context is explicit, structured-cloneable `TInput`." `:64-67` "Use these to drive one thread yourself; `createNodeWorker` is the entry point for pooled, queued work." Continuity rewrites also at `guides/worker.md:12`, `:247`; `src/server/types.ts:60`; `README.md:19`; `src/server/NodeWorker.ts:16`; Dispatch TSDoc `:17` "is explicit".

2. **Diff at the site.** Threads hunk replaces the completeness sentence with the "Use these to drive..." sentence (verbatim vs example). NodeWorker/serveWorker prose hunks rewrite `remain`/`remains`.

3. **Old form sweep.** `\b(remain|remains|remaining|still)\b` over `src`: `src/core/factories.ts:12` still; `src/core/types.ts:52` remain; `src/server/Dispatch.ts:36` still; `src/server/handlers.ts:29` still. `guides/worker.md`: `:160,:171,:203,:216,:228,:344,:446,:527,:541,:566`. `guides/README.md` / `README.md`: no hit. `tests`: many `still`/`remain` hits (`helpers.test.ts:85,111,196,205,226,249,...`; `Worker.test.ts:472,638,...`). Inflection `remaining` at `guides/worker.md:541,566`.

4. **Report reading.** `applied`. Report `:64-67` match. Report `:283-286`, `:285`, `:306` do not: those lines are now in the NodeWorker script fence; the rewritten sentences are `:293-294` and `:310`. Report's remaining-hit classification is not an empty sweep; field 3 still has hits.

5. **Proof reading.** Sweep is not empty; report said remaining hits are concessive.

### worker-subj-15

1. **Site now.** Brief `src/server/types.ts:58-59,75`. Licence now `:65-67`; key still `:91` `readonly workerData?: unknown`. Guide `:321-324` names `node:worker_threads`.

2. **Diff at the site.** `src/server/types.ts @@ -50,25 +57,34 @@` `+ * - \`workerData\` — opaque data cloned to every thread at spawn; the key mirrors the` / `+ *   \`node:worker_threads\` \`Worker\` constructor option of the same name...` (verbatim vs repair, minus finder's "once at spawn").

3. **Old form sweep.** `via` no hit (subj-9). Key name `workerData` retained (not removed).

4. **Report reading.** `applied`. `:65-67` match. Report `guides/worker.md:319-321`: `:319-320` is death-latch prose; the mirror sentence starts `:321`.

5. **Proof reading.** Naming/docs row; key unchanged.

### fleet-F1

1. **Site now.** `tests/setup.ts` has no `isBrowserVuePath`. Header `:4-11` describes environment-agnostic setup. `tests/setup.test.ts` has no `describe('isBrowserVuePath'`.

2. **Diff at the site.** `tests/setup.ts @@ -2,7 +2,7 @@` only strips `(AGENTS §16.1)` from the banner. No helper deletion.

3. **Old form sweep.** `isBrowserVuePath` over `src` `tests`: no hit. Inflections `isBrowserVuePaths|isBrowserVuePathed|isBrowserVuePathing`: no hit.

4. **Report reading.** `noop`. "declares no `isBrowserVuePath`" matches the tree.

5. **Proof reading.** Report grep empty agrees.

### fleet-F2

1. **Site now.** Classes: `Worker` `:47` first field `readonly #queue`; `Dispatch` `:54` `readonly #thread`; `NodeWorker` `:18` `readonly #on`; `Thread` `:13` `readonly #worker`. No public `readonly id: string` data field ahead of `#` fields. `readonly id: string` only on `Reply` at `src/server/types.ts:21-22`.

2. **Diff at the site.** No hunk introduces or converts a public `id` field on those classes.

3. **Old form sweep.** Public class-field shape: no hit. `JSON.stringify` in owned `src` / `guides/worker.md`: no hit; `tests/distribution.test.ts:49,52,479,617` (vendored, excluded from this row's class read).

4. **Report reading.** `noop`. Class start lines match (`Worker` `:47`, `Dispatch` `:54`, `NodeWorker` report `:19` is `#on`, `Thread` `:13`).

5. **Proof reading.** Report "shape does not occur" agrees with field 1.

### Across the unit — Scope

Status paths (`/home/user/work/evidence/conform-worker.status`), tagged against the brief § Scope:

| path | tag |
| --- | --- |
| `README.md` | owned |
| `guides/README.md` | owned |
| `guides/worker.md` | owned |
| `src/core/Worker.ts` | owned |
| `src/core/factories.ts` | owned |
| `src/core/types.ts` | owned |
| `src/server/Dispatch.ts` | owned |
| `src/server/NodeWorker.ts` | owned |
| `src/server/factories.ts` | owned |
| `src/server/handlers.ts` | owned |
| `src/server/helpers.ts` | owned |
| `src/server/index.ts` | owned |
| `src/server/types.ts` | owned |
| `tests/guides.test.ts` | owned |
| `tests/setup.ts` | owned |
| `tests/setupServer.test.ts` | owned |
| `tests/setupServer.ts` | owned |
| `tests/src/core/Worker.test.ts` | owned |
| `tests/src/core/factories.test.ts` | owned |
| `tests/src/server/factories.test.ts` | owned |
| `tests/src/server/fixtures/abortable.ts` | owned |
| `tests/src/server/fixtures/crash.ts` | owned |
| `tests/src/server/fixtures/identify.ts` | owned |
| `tests/src/server/fixtures/load-throw.ts` | owned |
| `tests/src/server/fixtures/slow.ts` | owned |
| `tests/src/server/fixtures/throw-async.ts` | owned |
| `tests/src/server/handlers.test.ts` | owned |
| `tests/src/server/helpers.test.ts` | owned |

No status path is shared or off-limits. Off-limits names (`.claude/**`, `package-lock.json`, `node_modules/**`, vendored `tests/setupPolicy.ts` / `policy.test.ts` / `config.test.ts`) are absent from the status file.

Hunks whose file no numbered/fleet Where names (Where files are helpers.ts, setupServer.ts, setupServer.test.ts, Dispatch.ts, helpers.test.ts, handlers.test.ts, guides.test.ts, slow.ts, identify.ts, Worker.test.ts, server/types.ts, core/types.ts, core/factories.ts, worker.md, README.md, server/factories.ts, handlers.ts, index.ts, guides/README.md, setup.ts):

- `src/core/Worker.ts @@ -1,5 +1,5 @@` first `+` `+import type { QueueContext, QueueEntryOptions } from '@orkestrel/queue'`
- `src/core/Worker.ts @@ -22,7 +22,7 @@` first `+` `+ *   \`context.signal\`, so an \`abort\` / \`timeout\` while waiting for a resource rejects`
- `src/core/Worker.ts @@ -150,10 +150,10 @@` first `+` `+	async #handle(input: TInput, context: QueueContext): Promise<TResult> {`
- `src/server/NodeWorker.ts @@ -1,19 +1,23 @@` first `+` `+import type { EmitterErrorHandler, EmitterHooks } from '@orkestrel/emitter'`
- `src/server/NodeWorker.ts @@ -24,6 +28,8 @@` first `+` `+		this.#on = options.on`
- `src/server/NodeWorker.ts @@ -43,6 +49,8 @@` first `+` `+			...(this.#on !== undefined ? { on: this.#on } : {}),`
- `src/server/NodeWorker.ts @@ -51,7 +59,7 @@` first `+` `+		return new Thread(this.#script, this.#workerData).promise`
- `src/server/NodeWorker.ts @@ -62,12 +70,12 @@` first `+` `+	#handle(input: TInput, thread: NodeThread, context: QueueContext): Promise<TResult> {`
- `tests/src/core/factories.test.ts @@ -3,8 +3,9 @@` first `+` `+// with real implementations. createQueue / createPool / createDatabaseQueueStore /`
- `tests/src/server/factories.test.ts @@ -12,23 +12,31 @@` first `+` `+import { createJSONQueueStore, createNodeWorker, createThread } from '@src/server'`
- `tests/src/server/factories.test.ts @@ -43,8 +51,8 @@` / `@@ -67,8 +75,8 @@` / `@@ -80,10 +88,54 @@` / `@@ -94,15 +146,42 @@` / `@@ -116,6 +195,8 @@` / `@@ -126,10 +207,12 @@` / `@@ -138,7 +221,7 @@` (first `+` of the first of these is the createThread import hunk above; later hunks add `createThread` / `on` cases)
- `tests/src/server/fixtures/abortable.ts @@ -1,5 +1,5 @@` first `+` `+// sentinel \`-1\` after it fires, so a manually-driven test can observe the handler react.`
- `tests/src/server/fixtures/crash.ts @@ -3,7 +3,7 @@` first `+` `+// emits \`'exit'\` while the job is in flight and hits the \`Dispatch\`'s \`onExit\` (the thread is`
- `tests/src/server/fixtures/load-throw.ts @@ -1,8 +1,8 @@` first `+` `+// \`'exit'\` — so \`createThread\` resolves a live thread that immediately dies. The death reaches`
- `tests/src/server/fixtures/throw-async.ts @@ -1,7 +1,7 @@` first `+` `+// \`{ ok: false, error }\` reply (not an unhandled rejection / thread crash) as it does a`

### Across the unit — Residue

Diff `+` lines matching `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`:

- `conform-worker.diff:90` `+> attempt's \`context.signal\`, so an abort / timeout while waiting for a resource rejects`
- `:128-130` `+	console.log(await job.promise)` / `isReply` logs
- `:173` `+... \`timeout?\` / \`store?\` / \`on?\` / \`error?\`.`
- `:208` `+   \`context.signal\` keeps its leased resource until it returns — so on a timeout /`
- `:252` `+   listeners; \`job\` is the Queue entry's stable \`QueueContext.id\`, preserved across retry`
- `:422` `+  out when it fires, so timeouts and aborts actually stop work rather than abandoning`
- `:514` `+ *   \`context.signal\`, so an \`abort\` / \`timeout\` while waiting for a resource rejects`
- `:554` `+ *   \`timeout\`, \`store\`, \`on\`, and \`error\` keys`
- `:607` `+ * - \`timeout\` — the default per-attempt deadline`
- `:689` `+ * console.log(await job.promise) // 42`
- `:909` `+ * reconstruct ... An \`abort\` / \`timeout\``
- `:918` `+ *   \`on\` / \`error\` / ... / \`timeout\` / \`store\``
- `:1139-1140` retries/timeout Default lines
- `:1598` `+	it('frees the queue slot on timeout ...`
- `:2207` `+		// timeout path) aborts the attempt MID-FLIGHT`
- `:2230` `+		const replacement = await worker.enqueue(0, { timeout: 5_000 })`

No `+` hit for `.skip(`, `.only(`, `.todo(`, `TODO`, `FIXME`, `debugger`.

Tree `src` and `tests` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`:

`.skip(|.only(|.todo(|TODO|FIXME|debugger`: no hit in `src`; no hit in owned `tests` (those tokens live in the excluded vendored files).

`console.`: `src/server/Dispatch.ts:50` (`console.log` in `@example`). Owned tests: no hit.

`retry` / `timeout`: `src/core/factories.ts:8,22`; `src/core/types.ts:15,29,52,58,75`; `src/server/types.ts:71,72,94`; `src/server/factories.ts:87,97,105`; `src/server/NodeWorker.ts:27,39,56`; `src/core/Worker.ts:16,25,26,37,64,77,191`; `tests/src/server/helpers.test.ts:94,102,128,140,167,168,174,182,188,193,199,231,251,505,684,688`; `tests/src/core/Worker.test.ts:88,93,101,103,293,295,326,620,626,629,651,652,654,1201,1217,1222,1252,1265`; `tests/src/server/factories.test.ts:190,206,218`; `tests/src/server/fixtures/slow.ts:5`; `tests/src/server/fixtures/identity.ts:26`; `tests/setupServer.ts:98,99,100`; `tests/setupServer.test.ts:98,112,123,141,156`.

### Across the unit — Parity

`src/core/types.ts` `WorkerInterface` call-signatures: `enqueue` `:95`, `restore` `:97`, `start` `:98`, `stop` `:100`, `pause` `:101`, `resume` `:102`, `abort` `:109`, `clear` `:111`, `destroy` `:118`. Guide `## Methods` rows: `guides/worker.md:131-139` `enqueue`, `restore`, `start`, `stop`, `pause`, `resume`, `abort`, `clear`, `destroy`. Readonly data on the interface: `emitter` `:90`, `count` `:91`, `active` `:92`, `paused` `:93`, `stopped` `:94`. Guide Types/Surface: `:110` `WorkerInterface` row names `emitter` / `count` / `active` / `paused` / `stopped`; `:117-119` repeats those as readonly Surface rows.

`src/server/Dispatch.ts` (no interface in `types.ts`): call-signature `get promise` `:89`. Guide: no `## Methods` table for `Dispatch`; Entities row `guides/worker.md:99` names `promise`.

`src/server/NodeWorker.ts`: public `build` `:43`. Not in Methods; `tests/guides.test.ts:55` lists `class NodeWorker` as INTERNAL.

`src/server/types.ts` `NodeThread` readonly data: `worker` `:48`, `alive` `:49`, `death` `:50`. Guide Types row `:114`.

`NodeWorkerOptions` added readonly `on` `:86`, `error` `:87`. Guide Types row `:112` lists `on?` / `error?`.

`src/core/index.ts:1-3` `export *` from `./types.js`, `./Worker.js`, `./factories.js`. `src/server/index.ts:1-5` `export *` from `./types.js`, `./helpers.js`, `./handlers.js`, `./factories.js`, `./Dispatch.js`.

Backticked identifiers in guide sentences the diff added (not fence bodies), and barrel export:

| identifier | barrel |
| --- | --- |
| `createNodeWorker` | yes (`src/server/index.ts` ← factories) |
| `createThread` | yes (factories) |
| `Dispatch` | yes (`./Dispatch.js`) |
| `isReply` | yes (helpers) |
| `Reply` | yes (types) |
| `alive` | no (member) |
| `on` / `error` | no (option keys) |
| `node:worker_threads` | no (Node builtin) |
| `Worker` | yes (`src/core/index.ts` ← Worker.js) — also used as the Node constructor name in the workerData sentence |
| `TInput` / `TResult` / `workerData` | `workerData` is an option key, not a barrel export |
| `QueueContext` | no (imported from `@orkestrel/queue`) |
| `context.signal` | no |

Fence-added backticks `createThread`, `Dispatch`, `isReply` are barrelled as above.

### Across the unit — Gates

Report § Gates quoted:

| Command | Exit code | Reading | File |
| ------- | --------- | ------- | ---- |
| `npm run format:check` | 0 | — | `gate-1-format-check.txt` |
| `npm run lint:check` | 0 | — | `gate-2-lint-check.txt` |
| `npm run check` | 0 | — | `gate-3-check.txt` |
| `npm run build` | 0 | — | `gate-4-build.txt` |
| `npm test` | 0 | `src:core`+`src:server` 111 passed (111); `policy` 111 passed (111); `config` 46 passed (46); `setup` 10 passed (10); `guides` 18 passed (18) | `gate-5-test.txt` |

Those files exist under `/home/user/work/evidence/worker-proofs/`. `gate-1-format-check.txt` opens with the `format:check` script. `gate-5-test.txt` opens with the `test` script chaining `test:src` … `test:guides` and later `Tests  111 passed (111)` / `111` / `46` / `10` / `18` summary lines.

### Across the unit — Breaking

Report § Breaking: `@orkestrel/worker/server` loses `spawnThread` and `dispatch`, gains `createThread` and `Dispatch`; `QueueExecution` → `QueueContext` on `ServeWorkerOptions.handler` / `WorkerHandler`.

Word-boundary sweep of old published names, excluding `node_modules`, `/home/user/fleet/worker`, and vendored `guides/worker.md` mirrors:

- `\bspawnThread\b` over `/home/user/fleet` `*.{ts,md}` and `/home/user/scaffold/src`: no hit.
- `\bQueueExecution\b` over `/home/user/fleet/worker` `src` `tests` `guides/worker.md`; `/home/user/fleet/queue`; `/home/user/scaffold/src`: no hit.
- `from '@orkestrel/worker` over `/home/user/fleet` `*.ts`: hits only inside `/home/user/fleet/worker` (`src/core/factories.ts:27`; `src/server/factories.ts:35,66,111`; `src/server/Dispatch.ts:43`; `src/server/handlers.ts:40`).
- `\bdispatch\b` inside worker: the obj-1 field-3 list. Sibling `src`/`tests` word-boundary listing was not completed package-by-package.

### Across the unit — Writing sweep

Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b` on diff `+` lines in `guides/**`, `README.md`, `src/**` doc comments, `tests/**` titles/comments:

`should|simply|easy|easier|just|currently|latest|utilize|leverage|via|in order to|e.g.|i.e.|etc.|please|sanity|dummy|ensure|guarantee`: no `+` hit.

`\bnow\b` `+` hits (fixture code, not titles): `conform-worker.diff:1894-1895` / `:1923,:1926` `performance.now()` in `slow.ts` / `identify.ts`.

`\bnew\b` `+` hits in prose files / JSDoc examples: `guides/worker.md` fence `+const thread = await createThread(new URL('./double.ts', import.meta.url))`; `+	const job = new Dispatch(...)`; `src/server/Dispatch.ts` `@example` `new URL` / `new AbortController` / `new Dispatch`; `src/server/factories.ts` `@example` `new URL`. Additional `new` `+` lines in implementation/test bodies (outside the prose filter): `NodeWorker.ts` `new Thread` / `new Dispatch`; `factories.ts` `new Thread`; `tests/guides.test.ts` `new AbortController` / `new Dispatch`; `setupServer.test.ts` `new ThreadWorker`; `setupServer.ts` `new URL` / `new Error`; `factories.test.ts` `new ThreadReply`; `handlers.test.ts` `new ThreadWorker`; `helpers.test.ts` `new Dispatch` / `new AbortController`.

Count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` on those `+` lines: no hit.

## Distillate

- worker-obj-1: helpers.ts:5-6 now comment (createThread factories.ts:41; dispatch deleted; Dispatch barrelled index.ts:5) | diff present yes | old form hits spawnThread 0, dispatch-inflection 45 | report matches yes
- worker-obj-2: tempDatabasePath setupServer.ts:40-43 (brief :24 is buildFixtureURL) | diff present yes | old form hits cleanup()/readonly cleanup 0 | report matches yes
- worker-obj-3: import type at setupServer.test.ts:1 (brief :8 moved) | diff present yes | old form hits 0 | report matches yes
- worker-obj-6: instanceof Thread evict Dispatch.ts:166 (brief :135); remarks types.ts:41-45 | diff present yes (remarks; evict line unchanged) | old form hits 0 | report matches no (worker.md:210 and helpers.test.ts:601-630 pointers)
- worker-obj-7: fixture locals gone; buildFixtureURL setupServer.ts:22-24 | diff present yes | old form hits `const fixture = ` 0 | report matches no (:56-65 vs :55-63)
- worker-obj-8: waitForCondition helpers.test.ts:239,275,727 | diff present yes | old form hits waitForDelay in that file 0 | report matches yes
- worker-obj-9: transcription guides.test.ts:199-255 | diff present yes | old form hits n/a 0 | report matches yes
- worker-obj-10: performance.now slow.ts:10,12 identify.ts:13,14 | diff present yes | old form hits Date.now 0 | report matches yes
- worker-obj-11: Worker.test.ts:30 src/core/Worker.ts | diff present yes | old form hits core/workers/ 0 | report matches yes
- worker-subj-2: on?/error? types.ts:86-87; NodeWorker.ts:19-20,52-53 | diff present yes | old form hits 0 | report matches no (worker.md:322-324 and factories.test.ts:135-160 pointers)
- worker-subj-6: Default: form core/types.ts:55-59 server/types.ts:68-73 | diff present yes | old form hits defaults to 0 | report matches yes
- worker-subj-9: must/through/named fields present; should/just/via 0 | diff present yes | old form hits should/just/via 0 | report matches no (worker.md:235,:442 pointers)
- worker-subj-10: intros at worker.md:53,86,95,104,373,451,474,571 | diff present yes | old form hits 0 | report matches no (:441,:548, guides/README.md:13)
- worker-subj-11: reply-half prose types.ts:8-10; worker.md:115,204 | diff present yes | old form hits internal wire protocol 0 | report matches no (:114,:200 pointers)
- worker-subj-13: fence worker.md:69-84 exercises imports | diff present yes | old form hits spawnThread 0 | report matches yes
- worker-subj-14: present-tense sites worker.md:64-67,293-294,310 | diff present yes | old form hits remain/still many | report matches no (:283-286,:285,:306 pointers)
- worker-subj-15: workerData licence types.ts:65-67; worker.md:321-324 | diff present yes | old form hits 0 | report matches no (:319-321 pointer)
- fleet-F1: isBrowserVuePath absent | diff present no (banner only) | old form hits 0 | report matches yes
- fleet-F2: no public id-before-# shape | diff present no | old form hits 0 | report matches yes

Scope tags: every status path owned; none shared; none off-limits.

Residue: diff `+` hits are retry/timeout/console.log as listed; tree owned src/tests have no skip/only/todo/TODO/FIXME/debugger; console.log at Dispatch.ts:50; retry/timeout at the src/tests lines listed.

Writing: no should/just/via/etc on `+` prose; `now` in performance.now() fixture `+` lines; `new` in guide fence and JSDoc examples plus implementation `new` constructors; count-over-growable-set pattern no `+` hit.

Parity: WorkerInterface methods `:95-118` line up with worker.md `:131-139`; readonly data `:90-94` with `:110,:117-119`; Dispatch `promise` `:89` with Entities `:99` (no Methods table); NodeThread `:48-50` with `:114`; NodeWorkerOptions `on`/`error` `:86-87` with `:112`; `createThread`/`Dispatch`/`isReply`/`Reply` barrelled from `src/server/index.ts:1-5`; `createWorker`/`Worker` from `src/core/index.ts:1-3`.

## Unknowns

- Exhaustive `\bdispatch\b` file:line list across every `/home/user/fleet/*/src` and `*/tests` sibling (the `from '@orkestrel/worker` sweep returned only worker files; spawnThread/QueueExecution were empty).
- Whether obj-7 and obj-9 unrestored broad greens are uniquely `setup-after.txt` / `guides-after.txt` (those files are also used by other rows).
- obj-6 restored green is stored in `obj8-control-green.txt`, not an obj6-named green file.
- Full 2670-line diff not quoted line-by-line; hunks come from the `^@@` index plus targeted reads.
- Writing-sweep membership of implementation `new` / `performance.now()` `+` lines vs the brief's "prose files / doc comments / test titles and comments" filter (both listed).

## Journal

## Deviation

No tree change from this lane (read-only; no writes, no mutating commands). Every named input file was readable. Sweeps run with Grep over the named paths; fleet-sibling `\bdispatch\b` was not enumerated package-by-package. Gates were not re-run; readings are from the report's captured files under `/home/user/work/evidence/worker-proofs/`.
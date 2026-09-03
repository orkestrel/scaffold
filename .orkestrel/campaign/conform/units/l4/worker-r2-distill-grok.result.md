I'll read the brief and the repository contracts first, then follow the brief exactly in read-only mode.The brief is a per-row evidence map. I’ll load the unit inputs, then sweep the tree and the diff against each row.I’ll now read the current sites, the diff hunks, and the proof files the report names, then run the old-form and residue sweeps.Next I’ll pull the remaining Where sites, the diff hunks, and the old-form sweeps so each row can be mapped against the tree.I’ll run the remaining site, sweep, proof, residue, and writing greps in parallel so the per-row map is complete.I’ll now extract the remaining hunks, proof summaries, and the residue/writing sweeps from the diff and the owned tree.I’ll extract the residue and writing hits from the diff’s added lines, then run the fleet old-name sweep and the remaining owned-path greps.Question

For every row of unit conform-worker, what does `/home/user/fleet/worker` carry now, what did the unit's diff change there, and do the report's readings match the tree.

Evidence

Cited law (one sentence per row, from `/home/user/scaffold/.claude/rules/` and `/home/user/scaffold/AGENTS.md`):

- worker-obj-1 architecture.md § Kind purity: "Keep the leaf pair class-free. `helpers.ts` and `validators.ts` sit at the bottom of a module's graph: they import types, constants, errors, and each other, and they import no implementation class."
- worker-obj-2 architecture.md § Functions and orchestration: "Never declare or assign a function inside another function or method."
- worker-obj-3 typescript.md § Syntax and imports: "Place `import type` declarations before value imports."
- worker-obj-6 quality.md § Rounds and verdicts: "Document the obligation instead when a defect is reachable only through a hypothetical foreign implementation of a contract this package publishes. State it on the interface that owns it and prove the documentation."
- worker-obj-7 tests.md § Shared test infrastructure: "Any duplicate or near-duplicate helper is a defect; consolidate it into one general form."
- worker-obj-8 tests.md § Delay: "Use it to yield, never to wait for something another process produces."
- worker-obj-9 tests.md § Cross-cutting proofs: "Transcribe each flagship fence and assert the values its comments claim."
- worker-obj-10 tests.md § Test contract: "Measure an elapsed interval with `performance.now()`, never `Date.now()`."
- worker-obj-11 writing.md § Claims: "Claim only what the reader can check."
- worker-subj-2 patterns.md § Stateful emitters: "Add `readonly on?: EmitterHooks<{Entity}EventMap>` and `readonly error?: EmitterErrorHandler` to options."
- worker-subj-6 typescript.md § Comments and API documentation: "Write a default as \"Default: …\" and a thrown error as \"Thrown when …\"."
- worker-subj-9 writing.md § Substitutions plus AGENTS.md § Writing: "**NEVER state a count.** … Name the members, or write the sentence without the number."
- worker-subj-10 writing.md § Structure: "In a reply or a guide, introduce every list, table, and code fence with a complete sentence naming what follows; a rule file's list sits bare under its heading."
- worker-subj-11 AGENTS.md § Design laws: "Minimal public API. … Once an intentional reusable capability exists, expose its top-level source exports through the correct environment barrel … Remove a symbol only when the capability itself should not exist."
- worker-subj-13 documentation.md § Parity: "A showcase is executable proof of public API."
- worker-subj-14 AGENTS.md § Design laws: "No compatibility shims. This is greenfield."
- worker-subj-15 names.md § Entity-scoped names: "Ungrouped option keys: one word."
- fleet-F1 / fleet-F2: no extra cited sentence beyond the fleet ruling text in the unit brief.

### worker-obj-1

1. **Site now.** Brief `src/server/helpers.ts:5-6` (`import { Dispatch }` / `import { Thread }`) is gone. Current `:5-6` is comment: `// The reply half of the run/abort/reply protocol…` / `// a \`Dispatch\` filters inbound messages with…` (`helpers.ts:4-6`). `isReply` remains `helpers.ts:26`. `spawnThread` is `createThread` at `src/server/factories.ts:41`. `dispatch` wrapper deleted; class published `src/server/index.ts:5` `export * from './Dispatch.js'`. `NodeWorker.#create` `src/server/NodeWorker.ts:61-62` `return new Thread(...)`. `#handle` `NodeWorker.ts:79` `return new Dispatch(...).promise`. `Dispatch.ts:6` still `import { isReply } from './helpers.js'`. INTERNAL `tests/guides.test.ts:55` `['class NodeWorker', 'class Thread']`; barrel-absence names `:77` `['NodeWorker', 'Thread']`.
2. **Diff at the site.** `src/server/helpers.ts @@ -1,80 +1,14 @@` deletes `export function spawnThread` and `export function dispatch`. `src/server/factories.ts @@ -1,17 +1,53 @@` `+export function createThread(script: string | URL, workerData?: unknown): Promise<NodeThread> {` verbatim. `src/server/index.ts @@ -2,3 +2,4 @@` `+export * from './Dispatch.js'` verbatim. `src/server/NodeWorker.ts @@ -1,19 +1,23 @@`, `@@ -51,7 +59,7 @@` `+		return new Thread(this.#script, this.#workerData).promise`, `@@ -62,12 +70,12 @@` `+		return new Dispatch(thread, input, context, this.#result).promise`. `tests/guides.test.ts @@ -37,18 +46,13 @@` INTERNAL drop of `class Dispatch`. Repair text present in `+` lines. Finder `createDispatch` is absent from `+` lines.
3. **Old form sweep.** Paths: `src`, `tests`, `guides/worker.md`, `guides/README.md`, `README.md` (no `node_modules`). `\bspawnThread\b` and inflections `spawnThreads|spawnThreaded|spawnThreading` (also `-i`): no hit. `\bdispatch\(` as a call of the old helper: no hit. Remaining `\bdispatch\b` is English / class `Dispatch` / correlation ids (`guides/worker.md:207,227,228,232,241,243`; `src/server/Dispatch.ts:14,22,29`; `src/server/types.ts:18,37,41`; `src/server/helpers.ts:18`; `src/server/factories.ts:22,25`; `src/server/handlers.ts:24,84`; `tests/src/server/helpers.test.ts:245,505,553,554,635,810`; `tests/src/server/handlers.test.ts:42-63,126-131,147`; `README.md:16`; `tests/src/server/fixtures/identity.ts:3`).
4. **Report reading.** Table: `applied`. Sentence: "The refuter's operative form, in full." Cited `factories.ts:41`, `index.ts:5`, `Dispatch.ts:9-53`, `guides.test.ts` INTERNAL — those lines now carry that. `helpers.ts` holds `isReply` alone and imports no class (`helpers.ts:1-2,26`).
5. **Proof reading.** Parity: `npm run test:guides` red **3 failed | 15 passed (18)** (`obj1-parity-control-red.txt`: `Tests  3 failed | 15 passed (18)`); green **18 passed (18)** (`guides-after.txt`: `Tests  18 passed (18)`). `createThread`: `npx vitest run … factories.test.ts` red **1 failed | 8 passed (9)** (`obj1-createThread-control-red.txt`: `Tests  1 failed | 8 passed (9)`); green inside **74 passed (74)** (`src-server-after-2.txt`: `Tests  74 passed (74)`). Files exist under `/home/user/work/evidence/worker-proofs/`. Field-3 sweep agrees: `spawnThread` empty; old `dispatch(` empty.

### worker-obj-2

1. **Site now.** Brief `tests/setupServer.ts:24` (`cleanup: () => scratch.destroy()`) gone. `tempDatabasePath` is `setupServer.ts:40-43` `return { path: join(scratch.path, 'store.json'), scratch }`. Type import `ScratchInterface` `setupServer.ts:7`. Call sites `tests/src/server/factories.test.ts:38-39, :54-55, :77-78` `const { path, scratch } = tempDatabasePath()` then `teardown.add(() => scratch.destroy())`. `tests/setupServer.test.ts:68` destructure; `:73` and `:78` `scratch.destroy()`.
2. **Diff at the site.** `tests/setupServer.ts @@ -14,18 +16,32 @@` `+export function tempDatabasePath(): { readonly path: string; readonly scratch: ScratchInterface } {` and `+	return { path: join(scratch.path, 'store.json'), scratch }`. Repair text present verbatim in `+` lines.
3. **Old form sweep.** `cleanup()` / `readonly cleanup` over `src` `tests` (`*.ts`): no hit. Inflections `cleanups|cleaned|cleaning` not required by the row's removed name `cleanup` as a returned thunk; word-boundary `\bcleanup\b` still hits lifecycle prose (`guides/worker.md:48,134-145` and `tests/src/core/Worker.test.ts` queue cleanup cases) — those are Queue cleanup, not the thunk.
4. **Report reading.** `applied`. "returns `{ readonly path: string; readonly scratch: ScratchInterface }`". Cited `:40-43` and `:7` match. Cited `factories.test.ts:35-36` does not: those lines are `afterEach` / `describe`; the destructure is `:38-39`. Cited `setupServer.test.ts:66-78` — `:66` is `describe('tempDatabasePath'`; the body is `:67-79`.
5. **Proof reading.** Behavioural. `npm run test:setup` red **1 failed | 9 passed (10)** (`obj2-control-red.txt`: `Tests  1 failed | 9 passed (10)`); green **10 passed (10)** (`setup-after.txt`: `Tests  10 passed (10)`). Field-3 `cleanup()` / `readonly cleanup`: no hit, agrees with report sweep.

### worker-obj-3

1. **Site now.** Brief `tests/setupServer.test.ts:8` type-import-after-values is gone. Current `:1` `import type { NodeWorkerOptions } from '@src/server'` immediately followed by `:2` `import { describe, expect, it } from 'vitest'` (no blank line).
2. **Diff at the site.** `tests/setupServer.test.ts @@ -1,24 +1,30 @@` first `+` line `+import type { NodeWorkerOptions } from '@src/server'`; the old trailing type import is on a `-` line. Verbatim present.
3. **Old form sweep.** Type-import-after-value in this file: current block starts with `import type` at `:1`. Pattern `^import type` in this file: line 1 only.
4. **Report reading.** `applied`. "`tests/setupServer.test.ts:1` is `import type { NodeWorkerOptions } from '@src/server'`" — that line now carries that.
5. **Proof reading.** Placement/syntax. Report sweep `grep -rn "^import type" tests/setupServer.test.ts` → line 1; field 3 agrees. No behavioural control file required.

### worker-obj-6

1. **Site now.** Brief `src/server/Dispatch.ts:135` `if (this.#thread instanceof Thread) this.#thread.evict()` is now `Dispatch.ts:166` (same text). Context `:165` `#detach()`; `:167` `let termination: Promise<number>`. Obligation text: `src/server/types.ts:41-45`; `Dispatch.ts:35-37`; `guides/worker.md:213` `flips \`alive = false\` for a thread this package produced`. Proof case `tests/src/server/helpers.test.ts:613-639`.
2. **Diff at the site.** Evict line itself is unchanged (no `+` on that statement). Surrounding hunks `Dispatch.ts @@ -125,7 +156,7 @@` and `@@ -175,6 +206,6 @@` rename `#execution` → `#context`. Obligation `+` at `src/server/types.ts @@ -30,12 +31,18 @@` `+ * A dispatch marks a thread dead for a \`NodeThread\` this package produced, through`. `Dispatch.ts @@ -7,19 +7,55 @@` `+ * Eviction reaches \`alive\` for a {@link NodeThread} this package produced.` Guide hunk `guides/worker.md @@ -177,44 +187,45 @@` carries the qualifier. Finder text `spawnThread` is not in those `+` remarks; retargeted `createThread` is.
3. **Old form sweep.** Row does not rename a symbol. Unconditional "flips `alive = false`" without qualifier: current `guides/worker.md:213` has the qualifier. `helpers.ts:57-59` old dispatch remarks deleted with the wrapper.
4. **Report reading.** `applied`. Cited `types.ts:41-45` matches. Cited `Dispatch.ts:35-37` matches. Cited `guides/worker.md:210` is `without a string \`job\` fails closed` — the flip qualifier is `:213`. Cited `helpers.test.ts:601-630` is the crash-latch `expect(failure).toBe(thread.death)` block; the foreign-`NodeThread` case is `:613-639` (`expect(foreign.alive).toBe(true)` at `:633`, not report `:625`).
5. **Proof reading.** Behavioural. Red **1 failed | 47 passed (48)** (`obj6-control-red.txt`: `Tests  1 failed | 47 passed (48)`); report's green file `obj8-control-green.txt` `Tests  48 passed (48)`. Files exist.

### worker-obj-7

1. **Site now.** Brief local `fixture` at `helpers.test.ts:40`, `handlers.test.ts:13`, `setupServer.test.ts:17` gone. Shared helper `tests/setupServer.ts:22-24` `export function buildFixtureURL`. Call sites import `buildFixtureURL` (`helpers.test.ts:15`, `setupServer.test.ts:10`, `handlers.test.ts` via setup). Proof `setupServer.test.ts:54-63`.
2. **Diff at the site.** `tests/setupServer.ts @@ -14,18 +16,32 @@` `+export function buildFixtureURL(name: string): URL {` `+	return new URL(\`tests/src/server/fixtures/${name}\`, resolveRoot(import.meta))`. `setupServer.test.ts @@ -1,24 +1,30 @@` deletes `const fixture =`. `helpers.test.ts @@ -36,9 +39,6 @@` deletes local `fixture`. Repair text present verbatim.
3. **Old form sweep.** `const fixture = ` over `src` `tests` `guides/worker.md` `guides/README.md` `README.md`: no hit. `fixture(` as that helper: no hit.
4. **Report reading.** `applied`. Cited `setupServer.ts:22-24` matches. Cited `setupServer.test.ts:56-65` — the `it` is `:55-63` (`existsSync` control at `:62`).
5. **Proof reading.** Behavioural. Broad red **3 failed | 7 passed (10)** (`obj7-control-red.txt`: `Tests  3 failed | 7 passed (10)`). Isolated red **1 failed | 5 skipped (6)** (`obj7-control-red-isolated.txt`); green **1 passed | 5 skipped (6)** (`obj7-green-isolated.txt`: `Tests  1 passed | 5 skipped (6)`). Field-3 agrees with report `grep -rn "const fixture = " tests` empty.

### worker-obj-8

1. **Site now.** Brief `helpers.test.ts:228,:252,:643` `await waitForDelay(20)` gone. Current gates: `:239-241` `waitForCondition('the long job is in flight', () => worker.active === 1, { budget: 5_000 })`; `:275-277` same; `:727-729` `'three jobs are in flight'` / `worker.active === 3`. Warm-up `:228` `const leased = await worker.enqueue(0)` and `:267` `await expect(worker.enqueue(1)).resolves.toBe(1)`. Replacement id assert `:251-253`.
2. **Diff at the site.** `tests/src/server/helpers.test.ts @@ -209,39 +209,62 @@` and `@@ -640,7 +724,9 @@` replace `waitForDelay(20)` with `waitForCondition`. `+` lines include the described strings and `{ budget: 5_000 }`.
3. **Old form sweep.** `waitForDelay` in `tests/src/server/helpers.test.ts`: no hit. Same name remains in `tests/src/core/Worker.test.ts` (many) and `tests/src/server/handlers.test.ts:4,259` (`waitForDelay(0)`).
4. **Report reading.** `applied`. Cited `:242`, `:280`, `:743` do not hold the `waitForCondition` calls (those are `:239`, `:275`, `:727`). The described strings and budget are present at the current lines.
5. **Proof reading.** Behavioural. `obj8-control-red.txt`: `Tests  48 passed (48)` (plant did not redden). `obj8-control-red-2.txt`: `Tests  2 failed | 46 passed (48)`. `obj8-control-red-3.txt`: `Tests  3 failed | 45 passed (48)`. Isolated red `obj8-control-red-isolated.txt`: `Tests  1 failed | 47 skipped (48)`; green `obj8-green-isolated.txt`: `Tests  1 passed | 47 skipped (48)`; `obj8-control-green.txt`: `Tests  48 passed (48)`. Field-3 agrees for `helpers.test.ts` only; report's `grep -n "waitForDelay" tests/src/server/helpers.test.ts` empty.

### worker-obj-9

1. **Site now.** Brief `tests/guides.test.ts:1-189` with no `@src/server` is gone. Current imports `:26-32` `createJSONQueueStore`, `createNodeWorker`, `createThread`, `Dispatch`, `isReply` from `@src/server`. Transcription `describe` `:199-255` asserts `42`, the stored entry, and `42`.
2. **Diff at the site.** `tests/guides.test.ts @@ -20,8 +20,17 @@` and `@@ -187,3 +191,65 @@` add the `describe('worker.md fences return the values they claim'`. `+` lines include `await expect(worker.enqueue(21)).resolves.toBe(42)` and `expect(work).toEqual([{ id: 'job-1', ...}])`.
3. **Old form sweep.** Row adds transcription; no removed name. Old "imports only guide/fs/test" is false now (`guides.test.ts:26-32`).
4. **Report reading.** `applied`. Cited `:199-255` matches the `describe` span.
5. **Proof reading.** Behavioural. Value plant `obj9-control-red.txt`: `Tests  3 failed | 15 passed (18)`. Persistence plant `obj9-persistence-control-red.txt`: `Tests  1 failed | 17 passed (18)`. Restored `guides-after.txt`: `Tests  18 passed (18)`.

### worker-obj-10

1. **Site now.** `tests/src/server/fixtures/slow.ts:10` `const deadline = performance.now() + value`; `:12` `while (performance.now() < deadline)`. `identify.ts:13-14` the same pair. No `performance` import. `:2` / identify `:3` still `from '../../../../src/server/handlers.ts'`.
2. **Diff at the site.** `slow.ts @@ -7,9 +7,9 @@` `+		const deadline = performance.now() + value` / `+		while (performance.now() < deadline)`. `identify.ts @@ -5,13 +5,13 @@` same. Verbatim present.
3. **Old form sweep.** `Date.now` over `src` `tests` (`*.ts`, excluding vendored guides): no hit. (`guides/emitter.md:30` is a vendored mirror, outside the named paths.)
4. **Report reading.** `applied`. Cited `slow.ts:10,12` and `identify.ts:13,14` now carry `performance.now()`.
5. **Proof reading.** Placement. Report: no behavioural control; sweep `Date.now` empty. Field 3 agrees. Green server run `src-server-after-2.txt` `Tests  74 passed (74)`.

### worker-obj-11

1. **Site now.** `tests/src/core/Worker.test.ts:30` `// src/core/Worker.ts — the Queue⨉Pool facade.` Context `:29` blank; `:31` counting-hook sentence.
2. **Diff at the site.** `Worker.test.ts @@ -27,10 +27,10 @@` `+// src/core/Worker.ts — the Queue⨉Pool facade.` Verbatim. Same hunk also drops `(AGENTS §16)` on the following comment line.
3. **Old form sweep.** `core/workers/` over `src` `tests` `guides` `README.md`: no hit.
4. **Report reading.** `applied`. Cited `:30` matches. Report also says the citation at `:33` was removed; current `:32-33` is the acquired-resource sentence without `AGENTS §`.
5. **Proof reading.** Naming. Report sweep empty; field 3 agrees.

### worker-subj-2

1. **Site now.** Brief `src/server/types.ts:71-80` options-without-hooks is now `NodeWorkerOptions` at `:85-96` with `:86-87` `readonly on?` / `readonly error?`. Remarks `:76-80`. `NodeWorker.ts:19-20` fields, `:31-32` assign, `:52-53` conditional spread. Guide row `guides/worker.md:112`; sentence `:326-328`. Case `tests/src/server/factories.test.ts:149-171`.
2. **Diff at the site.** `src/server/types.ts @@ -50,25 +57,34 @@` adds `on` / `error` bullets and fields. `NodeWorker.ts @@ -1,19 +1,23 @@`, `@@ -24,6 +28,8 @@`, `@@ -43,6 +49,8 @@`. Repair keys present in `+` lines.
3. **Old form sweep.** Row adds keys; no removed name.
4. **Report reading.** `applied`. Cited `types.ts:86-87` and `:76-80` match. Cited `NodeWorker.ts:19-20`, `:32-33` (assign is `:31-32`), `:52-53` match. Cited `guides/worker.md:112` matches. Cited `:322-324` is the `workerData` mirror paragraph; the `on`/`error` sentence is `:326-328`. Cited `factories.test.ts:135-160` is the round-trip `it`; the hook case is `:149-171`.
5. **Proof reading.** Behavioural. `subj2-control-red.txt`: `Tests  1 failed | 8 passed (9)`. Green in `src-server-after-2.txt` `Tests  74 passed (74)`.

### worker-subj-6

1. **Site now.** `src/core/types.ts:55-56` ends `Default: 1.`; `:57` `Default: 0.`; `:58-59` `Default: no per-attempt deadline.`; `:53-54` `Default for its \`max\`: the \`concurrency\` value.` `src/server/types.ts:68-73` the same three Default sentences. `src/core/factories.ts:21-22` lists optional keys and `{@link WorkerOptions}` (no `(default \`1\`)`).
2. **Diff at the site.** `src/core/types.ts @@ -50,12 +50,13 @@` `+ *   integer, as validated by the underlying queue. Default: 1.` etc. `src/server/types.ts @@ -50,25 +57,34 @@` `+ *   validated by the underlying queue. Default: 1.` `src/core/factories.ts @@ -18,8 +18,8 @@`. Verbatim `Default: 1.` / `Default: 0.` / `Default: no per-attempt deadline.` present in `+`.
3. **Old form sweep.** `defaults to` / `(default ` over `src/**/*.ts`: `src/core/factories.ts:11` "The pool's `max` defaults to `concurrency`". `guides/worker.md:171,398,456` still use "defaults to" in prose.
4. **Report reading.** `applied`. Cited `core/types.ts:55-59`, `server/types.ts:68-73`, `factories.ts:21-22` match. Report's remaining `defaults to` at `factories.ts:11` is present.
5. **Proof reading.** Documentation. Report sweep and field 3 agree on `src/core/factories.ts:11` as the remaining `defaults to` in `src`.

### worker-subj-9

1. **Site now.** Brief sites moved. `should` → `must`: `guides/worker.md:239` "`TInput` / `TResult` / `workerData` must be structured-cloneable"; `:457` "only when the resource cap must diverge from the job cap". `just` absent from owned `src`/`tests`/`guides/worker.md`/`README.md`/`guides/README.md`. `via` → `through`: `README.md:13` `with zero \`as\` through \`input\` / \`result\` guards`. Temporal `once` → `after`: `factories.ts:11-12` "after it comes online"; `fixtures/identify.ts:8` "after it is returned to idle"; `fixtures/abortable.ts:2` "after it fires". Count: `src/server/handlers.ts:55` "Read the envelope's `command`, `id`, `job`, and `input` fields once, defensively."
2. **Diff at the site.** `README.md @@ -10,13 +10,13 @@` `+structured-clone boundary with zero \`as\` through \`input\` / \`result\` guards.` `handlers.ts @@ -52,7 +52,8 @@` `+		// Read the envelope's \`command\`, \`id\`, \`job\`, and \`input\` fields once, defensively.` `throw-async.ts @@ -1,7 +1,7 @@` deletes `just`. Verbatim repair fragments present.
3. **Old form sweep.** `\bshould\b|\bjust\b|\bvia\b` over owned `src`, `tests`, `guides/worker.md`, `guides/README.md`, `README.md`: no hit. `\bonce\b` remaining hits are "one time" or `{ once: true }` / `.once(` API (`Dispatch.ts:106`, `Thread.ts:43-45`, `handlers.ts:55`, `Worker.ts:18,21,180`, test titles, `guides/worker.md:11,15,165,170,234,236,290,493,552`).
4. **Report reading.** `applied`. Cited `guides/worker.md:235` is clause 8 heading; `must be structured-cloneable` is `:239`. Cited `:442` is the durable-restart fence `createWorker` line; `must diverge` is `:457`. `README.md:13` and `handlers.ts:55-56` match.
5. **Proof reading.** Documentation. Report closing sweeps empty for banned terms in owned files; field 3 agrees for `should|just|via` on those paths.

### worker-subj-10

1. **Site now.** Introducing sentences: `guides/worker.md:53` Factories; `:86` Threads table; `:95` Entities; `:104` Types; `:373` event-map; `:451` Practices; `:474` Tests; `:571` See also. `guides/README.md:7` concept table; `:15` directory table. `README.md:30` Requirements. `guides/README.md` has no See-also list (file ends `:66` after the guide.md paragraph). Pattern fences also have intros `:392`, `:412`, `:432`.
2. **Diff at the site.** `guides/worker.md @@ -50,6 +50,8 @@` `+Each factory the package publishes, with the entry point it belongs to:`. `guides/README.md @@ -1,15 +1,19 @@` `+Each concept this repository documents…`. `README.md @@ -27,6 +27,8 @@` `+The package runs under these conditions:`. `guides/README.md @@ -59,7 +63,3 @@` **deletes** `## See also` (no introducing sentence added there).
3. **Old form sweep.** Row adds sentences; "bare table" is the old form. Remaining bare: none of the named tables except the deleted README See-also (no table left).
4. **Report reading.** `applied`. Cited `worker.md:53,:86,:95,:104,:373,:474` match. Cited `:441` Practices intro is `:451`. Cited `:548` See-also intro is `:571`. Cited `guides/README.md:7,:13` — directory intro is `:15` (table `:17`). Cited `guides/README.md:65` "Read this next:" — **that line does not exist**; See-also was removed (`guides/README.md:60-66` is the guide.md mirror paragraph).
5. **Proof reading.** Documentation. Report lists the named intros; field 3 finds the See-also intro absent from `guides/README.md`.

### worker-subj-11

1. **Site now.** `src/server/types.ts:8-10` "the reply half of the wire protocol `createNodeWorker` posts and `serveWorker` answers". No "Internal plumbing" sentence. `guides/worker.md:115` Reply row "the reply half of the wire protocol". `:204` "The run/abort/reply protocol is published as `Reply` and `isReply`:". Barrel still star-exports `./types.js` and `./helpers.js` (`index.ts:1-2`).
2. **Diff at the site.** `src/server/types.ts @@ -1,18 +1,19 @@` replacement text in `+`. Guide hunks replace "internal wire protocol". Verbatim present.
3. **Old form sweep.** `internal wire protocol` / `Internal plumbing` over `src` `guides/worker.md`: no hit.
4. **Report reading.** `applied`. Cited `types.ts:8-10` matches. Cited `worker.md:114` is the `ServeWorkerOptions` row; Reply is `:115`. Cited `:200` is `options.input` (a bad input replies…); the published-as sentence is `:204`.
5. **Proof reading.** Documentation. Report sweep empty; field 3 agrees.

### worker-subj-13

1. **Site now.** Brief unused-`isReply` fence at `guides/worker.md:67-80` is now `:69-84`. Imports `createThread, Dispatch, isReply` (`:70`). Uses `createThread` `:74`, `new Dispatch` `:77`, `await job.promise` `:78`, `isReply(...)` `:79-80`. No unread `result`; no comment standing in for the call.
2. **Diff at the site.** `guides/worker.md @@ -60,52 +62,60 @@` rewrites the fence. `+` lines include `console.log(isReply(...))` twice. Finder's keep-`spawnThread` text is absent; `createThread` is present (obj-1 coordination).
3. **Old form sweep.** Unused-import demonstration: `isReply` is called in the fence (`worker.md:79-80`). `spawnThread` in this fence: no hit.
4. **Report reading.** `applied`. Cited `guides/worker.md:69-84` matches.
5. **Proof reading.** Documentation, gated by obj-9 transcription (`guides.test.ts:200-210`). Field 3 agrees the old unused-import form is gone.

### worker-subj-14

1. **Site now.** `guides/worker.md:64-67` "Use these to drive one thread yourself; `createNodeWorker` is the entry point for pooled, queued work." `:293` "`signal` is per attempt…". `:294` "The handler's resolved value is the reply:". `:310` "Per-job consumer context is explicit, structured-cloneable `TInput`." Continuity rewrites: `:12` "runtime `null` is invalid"; `:247` "A built `.js` / `.mjs` script is an alternative"; `README.md:19` "is explicit, structured-cloneable input"; `NodeWorker.ts:16` "is the plain core `WorkerInterface`". Dispatch remarks `Dispatch.ts:17` "Per-job consumer context is explicit".
2. **Diff at the site.** Guide hunks delete "remain source-compatible" and rewrite the named sentences. `+Use these to drive one thread yourself…` present.
3. **Old form sweep.** `remain`/`remains`/`still` over `guides/worker.md` `src`: remaining hits are concessive-in-case (`worker.md:160,171,203,216,228,344,446,527,541,566`; `Dispatch.ts:36`; `factories.ts:12`; `handlers.ts:29`; `types.ts` "retry while attempts remain" `core/types.ts:52`). Continuity-with-unstated-past form at the named sites is gone.
4. **Report reading.** `applied`. Cited `:283-286` / `:285` / `:306` have drifted (`:293-294`, `:310`). Cited `:64-67` matches.
5. **Proof reading.** Documentation. Field 3 agrees the named continuity clauses were rewritten; remaining `still`/`remains` are in-case.

### worker-subj-15

1. **Site now.** `src/server/types.ts:65-67` "`workerData` — opaque data cloned to every thread at spawn; the key mirrors the `node:worker_threads` `Worker` constructor option of the same name…". Key still `types.ts:91` `readonly workerData?: unknown`. Guide `:322-324` same source sentence.
2. **Diff at the site.** `src/server/types.ts @@ -50,25 +57,34 @@` `+ * - \`workerData\` — opaque data cloned to every thread at spawn; the key mirrors the`. Verbatim (refuter form, without finder's "once at spawn").
3. **Old form sweep.** Key not renamed. Old remark without `node:worker_threads`: gone. `via` at old `:58`: gone (subj-9).
4. **Report reading.** `applied`. Cited `types.ts:65-67` matches. Cited `guides/worker.md:319-321` is the death-latch sentence; the mirror sentence is `:323-324`.
5. **Proof reading.** Naming/docs. Field 3: key unchanged; licence sentence present.

### fleet-F1

1. **Site now.** `tests/setup.ts` has no `isBrowserVuePath` (file is `TestQueueStore` / `PoolOptionsProbe`, header `:5-11`). `tests/setup.test.ts` has `describe('TestQueueStore'` / `PoolOptionsProbe`, no `isBrowserVuePath` block.
2. **Diff at the site.** `tests/setup.ts @@ -2,7 +2,7 @@` only drops `(AGENTS §16.1)` from the header. No helper deletion hunk.
3. **Old form sweep.** `isBrowserVuePath` over `tests/setup.ts` `tests/setup.test.ts` `src` `tests/setupServer.ts`: no hit.
4. **Report reading.** `noop`. "declares no `isBrowserVuePath`" — true of `tests/setup.ts` now.
5. **Proof reading.** Placement. Report grep empty; field 3 agrees.

### fleet-F2

1. **Site now.** Classes: `Worker` `src/core/Worker.ts:47` starts `#queue`; `Dispatch` `Dispatch.ts:54` `#thread`; `NodeWorker` `NodeWorker.ts:18` `#on`; `Thread` `Thread.ts:13` `#worker`; `TestQueueStore` `setup.ts:30` `#hooks`; `PoolOptionsProbe` `setup.ts:59` `#values`; `NodeWorkerOptionsProbe` `setupServer.ts:46` `#values`; `ThreadReply` `setupServer.ts:114` `#thread` then `#id` (private). No public `readonly id: string` field ahead of `#` fields. `readonly id: string` on `Reply` union `types.ts:21-22` only.
2. **Diff at the site.** No hunk converts a public `id` field to `#id` + getter.
3. **Old form sweep.** The shape the row removes does not occur; nothing to sweep as an old name.
4. **Report reading.** `noop`. Classes named in the report are the ones read; the `Reply` note matches `:21-22`.
5. **Proof reading.** Placement. Field 3 agrees the target shape is absent.

## Across the unit

**Scope.** Status paths (`conform-worker.status`), tagged against the brief's § Scope:

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
| `tests/setup.ts` | owned (except vendored trio; this file is not off-limits) |
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

No status path is off-limits. Shared: none written.

Hunks whose **Where** does not name the file (`file @@ hunk` + first `+` line):

- `src/core/Worker.ts @@ -1,5 +1,5 @@` `+import type { QueueContext, QueueEntryOptions } from '@orkestrel/queue'`
- `src/core/Worker.ts @@ -22,7 +22,7 @@` `+ *   \`context.signal\`, so an \`abort\` / \`timeout\` while waiting for a resource rejects`
- `src/core/Worker.ts @@ -150,10 +150,10 @@` (first `+` is the `#handle` signature/`context` rename)
- `src/server/NodeWorker.ts @@ -1,19 +1,23 @@` `+import type { EmitterErrorHandler, EmitterHooks } from '@orkestrel/emitter'`
- `src/server/NodeWorker.ts @@ -24,6 +28,8 @@` `+		this.#on = options.on`
- `src/server/NodeWorker.ts @@ -43,6 +49,8 @@` `+			...(this.#on !== undefined ? { on: this.#on } : {}),`
- `src/server/NodeWorker.ts @@ -51,7 +59,7 @@` `+		return new Thread(this.#script, this.#workerData).promise`
- `src/server/NodeWorker.ts @@ -62,12 +70,12 @@` `+	#handle(input: TInput, thread: NodeThread, context: QueueContext): Promise<TResult> {`
- `tests/src/core/factories.test.ts @@ -3,8 +3,9 @@` `+// with real implementations. createQueue / createPool / createDatabaseQueueStore /`
- `tests/src/server/factories.test.ts @@ -12,23 +12,31 @@` `+import { createJSONQueueStore, createNodeWorker, createThread } from '@src/server'`
- `tests/src/server/factories.test.ts @@ -43,8 +51,8 @@` (scratch disposer)
- `tests/src/server/factories.test.ts @@ -67,8 +75,8 @@`
- `tests/src/server/factories.test.ts @@ -80,10 +88,54 @@` `+describe('createThread', () => {`
- `tests/src/server/factories.test.ts @@ -94,15 +146,42 @@` (hook case)
- `tests/src/server/factories.test.ts @@ -116,6 +195,8 @@`
- `tests/src/server/factories.test.ts @@ -126,10 +207,12 @@`
- `tests/src/server/factories.test.ts @@ -138,7 +221,7 @@`
- `tests/src/server/fixtures/abortable.ts @@ -1,5 +1,5 @@` `+// sentinel \`-1\` after it fires, so a manually-driven test can observe the handler react.`
- `tests/src/server/fixtures/crash.ts @@ -3,7 +3,7 @@` `+// emits \`'exit'\` while the job is in flight and hits the \`Dispatch\`'s \`onExit\` (the thread is`
- `tests/src/server/fixtures/load-throw.ts @@ -1,8 +1,8 @@` `+// \`'exit'\` — so \`createThread\` resolves a live thread that immediately dies. The death reaches`
- `tests/src/server/fixtures/throw-async.ts @@ -1,7 +1,7 @@` `+// \`{ ok: false, error }\` reply (not an unhandled rejection / thread crash) as it does a`

**Residue.** Diff `+` lines matching `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`:

- `conform-worker.diff:90` `+> attempt's \`context.signal\`, so an abort / timeout while waiting…`
- `:128-130` `+	console.log(await job.promise)` / `console.log(isReply(…))` ×2
- `:173` `+… \`retries?\` / \`timeout?\` / \`store?\` / \`on?\` / \`error?\`.`
- `:208` `+   \`context.signal\` keeps its leased resource until it returns — so on a timeout /`
- `:252` `+   … preserved across retry`
- `:422` `+  out when it fires, so timeouts and aborts…`
- `:514` `+ *   \`context.signal\`, so an \`abort\` / \`timeout\`…`
- `:543` `+ *   \`timeout\`, \`store\`, \`on\`, and \`error\` keys…`
- `:596` `+ * - \`timeout\` — the default per-attempt deadline…`
- `:678` `+ * console.log(await job.promise) // 42`
- `:898` `+ * … An \`abort\` / \`timeout\``
- `:907` `+ *   \`on\` / \`error\` / \`workerData\` / \`concurrency\` / \`retries\` / \`timeout\` / \`store\``
- `:1128-1129` retries/timeout Default bullets
- `:1587` `+	it('frees the queue slot on timeout while the resource stays held…'`
- `:2196` `+		// timeout path) aborts the attempt MID-FLIGHT…`
- `:2219` `+		const replacement = await worker.enqueue(0, { timeout: 5_000 })`

No `+` hit for `.skip(`, `.only(`, `.todo(`, `TODO`, `FIXME`, `debugger`.

Tree `src` + `tests` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`:

`.skip(` / `.only(` / `.todo(`: no hit in that population (`distribution.test.ts:684` `context.skip` is excluded).
`TODO` / `FIXME` / `debugger`: no hit in that population (those strings live in excluded `tests/setupPolicy.ts`).
`console.`: `src/server/Dispatch.ts:50` (`@example`).
`retry` / `timeout` (every hit): `src/core/types.ts:15,29,52,58,75`; `src/server/types.ts:71,72,94`; `src/server/factories.ts:87,97,105`; `src/server/NodeWorker.ts:27,39,56`; `src/core/factories.ts:8,22`; `src/core/Worker.ts:16,25,26,37,64,77,191`; `tests/setupServer.test.ts:98,112,123,141,156`; `tests/src/core/Worker.test.ts:88,93,101,103,233,293,294,295,296,326,620,626,629,651,652,654,1201,1217,1222,1252,1265`; `tests/src/server/factories.test.ts:190,206,218`; `tests/setupServer.ts:98,99,100`; `tests/src/server/helpers.test.ts:94,102,128,140,167,168,174,182,188,193,199,231,251,505,684,688`; `tests/src/server/fixtures/slow.ts:5`; `tests/src/server/fixtures/identity.ts:26`.

**Parity.** Entities the diff touches in `src/**/types.ts` or a class file:

`WorkerInterface` `src/core/types.ts` call-signatures vs `guides/worker.md` `## Methods`:
- `enqueue` types.ts:95 — Methods `worker.md:131`
- `restore` types.ts:97 — `:132`
- `start` types.ts:98 — `:133`
- `stop` types.ts:100 — `:134`
- `pause` types.ts:101 — `:135`
- `resume` types.ts:102 — `:136`
- `abort` types.ts:109 — `:137`
- `clear` types.ts:111 — `:138`
- `destroy` types.ts:118 — `:139`

Class `Worker` methods: `Worker.ts:113,117,121,125,129,133,137,141,145` same nine names.

Readonly data: `emitter` types.ts:90 / getter `Worker.ts:93` — Surface `worker.md:110` `emitter` / `count` / `active` / `paused` / `stopped`; getters `Worker.ts:97,101,105,109`.

`Dispatch`: no interface in `types.ts`. Public member `get promise` `Dispatch.ts:89`. Entities row `worker.md:99` names `promise`.

`NodeThread` readonly `worker`/`alive`/`death` types.ts:47-51 — Types row `worker.md:114`.

`NodeWorkerOptions` types.ts:86-96 (`on?`,`error?`,`script`,`input`,`result`,`workerData?`,`concurrency?`,`retries?`,`timeout?`,`store?`) — Types row `worker.md:112`.

`WorkerOptions` types.ts:67-76 — `worker.md:109`.
`WorkerEventMap` types.ts:23-38 — `worker.md:111`.
`WorkerHandler` types.ts:41-45 — `worker.md:108`.
`Reply` types.ts:20-22 — `worker.md:115`.
`ServeWorkerOptions` types.ts:115-118 — `worker.md:113`.

`NodeWorker` class is not in the Methods table; INTERNAL `guides.test.ts:55`.

Backticked identifiers in guide sentences the diff added, vs barrels `src/core/index.ts:1-3` / `src/server/index.ts:1-5`:
- `createNodeWorker` — exported via `src/server/index.ts:4` → factories
- `createThread` — same
- `Dispatch` — `src/server/index.ts:5`
- `isReply` — `src/server/index.ts:2` → helpers
- `Reply` — `src/server/index.ts:1` → types
- `NodeThread` — types barrel
- `WorkerInterface` — `src/core/index.ts:1` → types
- `createWorker` — `src/core/index.ts:3` → factories
- `createJSONQueueStore` — server factories barrel
- `serveWorker` — server handlers barrel
- `Worker` — `src/core/index.ts:2`
- `QueueContext` — not this package's barrel (imported from `@orkestrel/queue`)
- `workerData`, `on`, `error`, `alive` — option/data names, not barrel exports
- `node:worker_threads` — Node builtin, not barrel

**Gates.** Report § Gates quoted:

| Command | Exit code | Reading | File |
| ------- | --------- | ------- | ---- |
| `npm run format:check` | 0 | — | `gate-1-format-check.txt` |
| `npm run lint:check` | 0 | — | `gate-2-lint-check.txt` |
| `npm run check` | 0 | — | `gate-3-check.txt` |
| `npm run build` | 0 | — | `gate-4-build.txt` |
| `npm test` | 0 | `src:core`+`src:server` 111 passed (111); `policy` 111 passed (111); `config` 46 passed (46); `setup` 10 passed (10); `guides` 18 passed (18) | `gate-5-test.txt` |

Proof files exist. `gate-1-format-check.txt` "All matched files use the correct format." `gate-5-test.txt` `Tests  111 passed (111)` / `111 passed (111)` / `46 passed (46)` / `10 passed (10)` / `18 passed (18)`.

**Breaking.** Report: "`@orkestrel/worker/server` loses `spawnThread` and `dispatch`, and gains `createThread` and `Dispatch`." Also `QueueExecution` → `QueueContext`.

Word-boundary sweep old names over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/worker`, vendored `guides/worker.md` mirrors:

- `\bspawnThread\b`: no hit (`/home/user/fleet` and `/home/user/scaffold/src`).
- `\bQueueExecution\b`: `/home/user/fleet/agent/src/core/helpers.ts:14` `import type { QueueExecution } from '@orkestrel/queue'`; `:253` `execution: QueueExecution`. (queue.md mirrors are guides, outside this src/tests population.)
- `\bdispatch\b`: no `from '@orkestrel/worker'` consumer of the old helper outside worker (`from '@orkestrel/worker` hits outside worker: none). Remaining hits are other packages' own `dispatch` members (mcp `MCPServer.dispatch`, workflow `Runner.#dispatch` / `Runner.ts:350`, router `Dispatcher`, brief helpers, contract "dispatch through", etc.). Full line list not enumerated here (mcp `MCPServer.test.ts` alone is 325 count-hits). `/home/user/scaffold/src`: no `spawnThread`; no worker `dispatch` import.

**Writing sweep** of diff `+` lines in `guides/**`, `README.md`, src doc comments, test titles/comments. Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b` (`-i`):

- `guides/worker.md` fence `+const thread = await createThread(new URL(...))` (`conform-worker.diff:122`)
- `+	const job = new Dispatch(...)` (`:127`)
- `Dispatch.ts` `@example` `+ * const thread = await createThread(new URL('./double.js'…` (`:675`); `+ * const controller = new AbortController()` (`:676`); `+ * const job = new Dispatch(...)` (`:677`)
- `factories.ts` `@example` `+ * const thread = await createThread(new URL('./double.js'…` (`:862`)
- `tests/setupServer.test.ts` comment `+		// second destroy over the same (now removed) directory still settles without throwing.` (`:1411`)
- fixture code `+		const deadline = performance.now() + value` (`:1883,:1912`) and `+		while (performance.now() < deadline)` (`:1884,:1915`) — these are fixture bodies, not comments; listed because they sit in `tests/**` `+` lines matching `\bnow\b`

Count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` on those `+` lines: no hit.

Distillate

- worker-obj-1: helpers.ts:5-6 imports gone (`:5-6` comments; `isReply` `:26`) | diff present yes | old form hits spawnThread 0, dispatch( 0 | report matches yes
- worker-obj-2: thunk gone; `tempDatabasePath` `:40-43` | yes | `cleanup()`/`readonly cleanup` 0 | yes (cited factories.test.ts:35-36 is now `:38-39`)
- worker-obj-3: type import `setupServer.test.ts:1` | yes | old trailing type-import 0 | yes
- worker-obj-6: evict `Dispatch.ts:166`; remarks `types.ts:41-45` | yes (docs `+`; evict line unchanged) | n/a | no for cited `:210` / `:601-630` / `:625` (text lives at `:213` / `:613-639` / `:633`)
- worker-obj-7: `buildFixtureURL` `setupServer.ts:22-24` | yes | `const fixture =` 0 | yes
- worker-obj-8: `waitForCondition` `helpers.test.ts:239,275,727` | yes | `waitForDelay` in that file 0 | no for cited `:242,:280,:743`
- worker-obj-9: transcription `guides.test.ts:199-255` | yes | n/a | yes
- worker-obj-10: `performance.now` `slow.ts:10,12` `identify.ts:13,14` | yes | `Date.now` 0 in src/tests | yes
- worker-obj-11: `Worker.test.ts:30` `src/core/Worker.ts` | yes | `core/workers/` 0 | yes
- worker-subj-2: `on?`/`error?` `types.ts:86-87` | yes | n/a | no for cited worker.md:322-324 and factories.test.ts:135-160
- worker-subj-6: `Default: …` `core/types.ts:55-59` `server/types.ts:68-73` | yes | `defaults to` src hit 1 (`factories.ts:11`) | yes
- worker-subj-9: `must`/`through`/named fields | yes | should/just/via owned 0 | no for cited worker.md:235,:442
- worker-subj-10: intros present except guides/README See-also deleted | yes (and a deleting hunk) | n/a | no for cited guides/README.md:65 and worker.md:441,:548
- worker-subj-11: reply-half prose `types.ts:8-10` `worker.md:115,:204` | yes | internal-wire 0 | no for cited worker.md:114,:200
- worker-subj-13: fence `worker.md:69-84` calls `isReply` | yes | unused-import form 0 | yes
- worker-subj-14: present-tense sites `worker.md:64-67,:293-294,:310` | yes | named continuity clauses 0 | no for cited :283-286,:285,:306
- worker-subj-15: mirror licence `types.ts:65-67` | yes | key still `workerData` | no for cited worker.md:319-321
- fleet-F1: helper absent `tests/setup.ts` | no helper hunk | isBrowserVuePath 0 | yes (noop)
- fleet-F2: no public `id` before `#` | no shape hunk | n/a | yes (noop)

Scope tags: all 26 status paths owned; 0 off-limits; 0 shared writes.

Residue: no `.skip`/`.only`/`.todo`/`TODO`/`FIXME`/`debugger` in owned src/tests; diff `+` `console.log` at worker.md fence and Dispatch `@example`; `retry`/`timeout` hits are option/event names listed above.

Writing: `new` in added fences/examples; `now` in setupServer.test.ts comment and `performance.now()` fixture `+` lines; count-over-growable-set pattern: no hit on `+` prose.

Parity: WorkerInterface nine methods line-up with Methods table `worker.md:131-139`; Dispatch has `promise` only (`Dispatch.ts:89` / `worker.md:99`); `on?`/`error?` on NodeWorkerOptions and Surface row `:112`; added backticks `createThread`/`Dispatch`/`isReply` are server-barrelled (`index.ts:2,4,5`).

Unknowns

- Full `file:line` list for `\bdispatch\b` across `/home/user/fleet/*/src` and `*/tests` (hundreds of hits, other packages' own APIs; mcp `MCPServer.test.ts` count 325). Not a worker import of the removed helper.
- Inflection sweep `dispatches|dispatched|dispatching` line list outside worker (report already lists permitted English inside worker).
- `gate-2-lint-check.txt` body after the npm banner is empty in the file read (no oxlint summary line); exit 0 is the report's claim, not re-executed.
- worker-subj-9 `once` sites the report ruled temporal in `helpers.test.ts:488`, `handlers.test.ts:130`, `Worker.test.ts:620,:1074` — current `once` hits in those files are "one time" / `{ once: true }` (see field 3); whether those exact old temporal spellings were the pre-diff lines is visible only in the `-` side of the diff, not re-listed per line here.

Journal

Deviation

No tree change from this lane (read-only). Every named input file was readable. Sweeps run with Grep over the named paths; fleet `\bdispatch\b` not fully exploded to every line (see Unknowns). `tests/distribution.test.ts` `context.skip` seen and excluded per residue vendored/excluded set.
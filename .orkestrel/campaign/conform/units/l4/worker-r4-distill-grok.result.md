I'll read the brief and the repository's coding contracts first, then follow the brief exactly in read-only mode.The brief is a read-only distillate. Next I’ll load the unit rows, audit claims, writer report, and evidence files.I’ll map each row’s current sites, then sweep the diff, old names, proofs, and across-unit residue.Sites are mapped. Next I’ll sweep old names, proof files, guide parity, and the remaining Where locations.## Question

For every row of unit conform-worker, what does the tree at `/home/user/fleet/worker` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

## Evidence

Law sentences the rows cite:

- architecture.md § Kind purity: "Keep the leaf pair class-free. `helpers.ts` and `validators.ts` sit at the bottom of a module's graph: they import types, constants, errors, and each other, and they import no implementation class." (`/home/user/scaffold/.claude/rules/architecture.md:86-88`)
- architecture.md factory form: "A function returning a live entity is an entity factory and belongs in `factories.ts` whatever it is called" (`architecture.md:77-78`)
- architecture.md nested functions: "Never declare or assign a function inside another function or method." (`architecture.md:161`)
- typescript.md imports: "Place `import type` declarations before value imports." (`typescript.md:17`)
- quality.md: "Document the obligation instead when a defect is reachable only through a hypothetical foreign implementation of a contract this package publishes. State it on the interface that owns it and prove the documentation." (`quality.md:86`)
- tests.md: "Any duplicate or near-duplicate helper is a defect; consolidate it into one general form." (`tests.md:181`); "Test files import shared infrastructure rather than declaring local fixture factories." (`tests.md:185`)
- tests.md Delay: "Use it to yield, never to wait for something another process produces." (`tests.md:218`)
- tests.md: "Transcribe each flagship fence and assert the values its comments claim." (`tests.md:70`)
- tests.md: "Measure an elapsed interval with `performance.now()`, never `Date.now()`." (`tests.md:38`)
- writing.md: "Claim only what the reader can check." (`writing.md:38`)
- patterns.md: "Add `readonly on?: EmitterHooks<{Entity}EventMap>` and `readonly error?: EmitterErrorHandler` to options." (`patterns.md:74`)
- typescript.md: "Write a default as \"Default: …\" and a thrown error as \"Thrown when …\"." (`typescript.md:79`)
- writing.md Structure: "In a reply or a guide, introduce every list, table, and code fence with a complete sentence naming what follows" (`writing.md:63`)
- AGENTS.md: "Once an intentional reusable capability exists, expose its top-level source exports through the correct environment barrel" (`AGENTS.md:71`)
- documentation.md: "A showcase is executable proof of public API. A missing demonstration is a missing feature, detectable by parity." (`documentation.md:26`)
- AGENTS.md: "No compatibility shims. This is greenfield." (`AGENTS.md:72`)
- writing.md: "Write the present tense for what exists." (`writing.md:41`)
- names.md: "Ungrouped option keys: one word." (`names.md:29`); mirror licence at `names.md:120`

Sweep paths unless a row names a narrower set: `src`, `tests`, `guides/worker.md`, `guides/README.md`, `README.md`, excluding `node_modules`.

### worker-obj-1

1. **Site now.** Brief `src/server/helpers.ts:5-6` no longer holds `import { Dispatch }` / `import { Thread }`. Current `:5-6` is comment: `helpers.ts:5` blank comment line; `helpers.ts:6` `The reply half of the run/abort/reply protocol`. Context `helpers.ts:4-7`. `Dispatch`/`Thread` imports deleted. `spawnThread` is `createThread` at `src/server/factories.ts:41` `export function createThread(script: string | URL, workerData?: unknown): Promise<NodeThread> {`. `dispatch` wrapper absent. `src/server/index.ts:5` `export * from './Dispatch.js'`. `NodeWorker.ts:6-9` imports `Dispatch`/`Thread`, not `factories.ts`. `#create` `NodeWorker.ts:61-62` `return new Thread(...)`. `#handle` `NodeWorker.ts:79` `return new Dispatch(...).promise`.
2. **Diff at the site.** `helpers.ts @@ -1,80 +1,14 @@` (diff:987). `-export function spawnThread` (diff:1025). `-export function dispatch<TResult>(` (diff:1058). Repair text present: `factories.ts @@ -1,17 +1,53 @@` (diff:851) `+export function createThread(script: string | URL, workerData?: unknown): Promise<NodeThread> {` (diff:893). `index.ts @@ -2,3 +2,4 @@` (diff:1079) `+export * from './Dispatch.js'` (diff:1084). `NodeWorker.ts @@ -51,7 +59,7 @@` `+		return new Thread(this.#script, this.#workerData).promise` (diff:828). `@@ -62,12 +70,12 @@` `+		return new Dispatch(thread, input, context, this.#result).promise` (diff:844). Finder `createDispatch` not in `+` lines.
3. **Old form sweep.** Pattern `\b(spawnThread|spawnThreads|spawnThreaded|spawnThreading)\b` over those paths: no hit. Pattern `` `dispatch`|\bdispatch\(|import .*\bdispatch\b ``: no hit. Inflections `\b(dispatches|dispatched|dispatching)\b` (word-boundary): `guides/worker.md:225`, `guides/worker.md:320`, `tests/src/server/helpers.test.ts:52`, `tests/src/server/helpers.test.ts:537`, `src/server/types.ts:34`, `src/server/Dispatch.ts:10`. Case-insensitive spawnThread inflections: no hit.
4. **Report reading.** Table: `applied`. Sentence: "The refuter's operative form, in full." Cites `factories.ts:41` — tree has `createThread` there. `index.ts:5` — tree has `export * from './Dispatch.js'`. `guides.test.ts` INTERNAL `['class NodeWorker', 'class Thread']` — `tests/guides.test.ts:55`. Those lines carry what the report says.
5. **Proof reading.** Behavioural. Parity: `npm run test:guides` red **3 failed | 15 passed (18)** — file `/home/user/work/evidence/worker-proofs/obj1-parity-control-red.txt` `Tests  3 failed | 15 passed (18)`. Green: `guides-after.txt` `Tests  18 passed (18)`. createThread: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/factories.test.ts` red **1 failed | 8 passed (9)** — `obj1-createThread-control-red.txt` `Tests  1 failed | 8 passed (9)`. Isolated green file `obj1-createThread-green-isolated.txt` `Tests  1 passed | 8 skipped (9)`. Whole-file restored **9 passed (9)** named as "fix round 3's run" with no capture file. Old-form sweep in report (spawnThread empty) agrees with field 3 for spawnThread; inflection hits exist and the report's fix-round-1 dispatch-inflection sweep named permitted English at `Dispatch.ts:10`, `types.ts:34`, `helpers.test.ts:52,537`, `worker.md:225,320`.

### worker-obj-2

1. **Site now.** Brief `tests/setupServer.ts:24` is now `buildFixtureURL` body `return new URL(...)`. Nested `cleanup` thunk gone. `tempDatabasePath` at `setupServer.ts:40-43` `export function tempDatabasePath(): { readonly path: string; readonly scratch: ScratchInterface }`. `ScratchInterface` import `setupServer.ts:7`. Context `setupServer.ts:39-44`.
2. **Diff at the site.** `setupServer.ts @@ -14,18 +16,32 @@` (diff:1533) inserts `buildFixtureURL` at the old `tempDatabasePath` slot; `+export function tempDatabasePath(): { readonly path: string; readonly scratch: ScratchInterface } {` (diff:1567). Repair return type present verbatim.
3. **Old form sweep.** `\bcleanup\(\)|readonly cleanup\b` over `src` `tests` `*.ts`: no hit. Inflections cleanup/cleanups/cleanuped/cleanuping: no additional owned hits for the thunk name.
4. **Report reading.** `applied`. Cites `setupServer.ts:40-43` and `:7` — both match. Call sites `factories.test.ts:38,54,78` — tree has `const { path, scratch } = tempDatabasePath()` at `tests/src/server/factories.test.ts` (those lines). `setupServer.test.ts:66-78` — `describe('tempDatabasePath')` at `:66`, `scratch.destroy()` at `:73` and `:78`.
5. **Proof reading.** Behavioural. `npm run test:setup` red **1 failed | 9 passed (10)** — `obj2-control-red.txt` `Tests  1 failed | 9 passed (10)`. Green `setup-after.txt` `Tests  10 passed (10)`. Sweep empty agrees with field 3.

### worker-obj-3

1. **Site now.** Brief `tests/setupServer.test.ts:8` is now `createRecorder` import. Type import moved to `:1` `import type { NodeWorkerOptions } from '@src/server'`. Value import `:2` `import { describe, expect, it } from 'vitest'`. No blank line between them. Context `setupServer.test.ts:1-3`.
2. **Diff at the site.** `setupServer.test.ts @@ -1,24 +1,30 @@` (diff:1354) `+import type { NodeWorkerOptions } from '@src/server'` as first line (diff:1355). Repair text present verbatim.
3. **Old form sweep.** Placement row. `^import type` in this file: `setupServer.test.ts:1` only.
4. **Report reading.** `applied`. Cites `:1` type import and `:2` vitest — both match.
5. **Proof reading.** Placement. Report sweep `grep -rn "^import type" tests/setupServer.test.ts` returns line 1 only — agrees.

### worker-obj-6

1. **Site now.** Brief `Dispatch.ts:135` is now `			return` inside `#message`. `instanceof Thread` is `Dispatch.ts:166` `if (this.#thread instanceof Thread) this.#thread.evict()`. Context `Dispatch.ts:165-167`. Obligation on `NodeThread` `src/server/types.ts:41-45`. Same qualifier `Dispatch.ts:35-37`. Guide `guides/worker.md:213` `flips \`alive = false\` for a thread this package produced`. Proof `helpers.test.ts:613-639`.
2. **Diff at the site.** `instanceof Thread` is not in the diff (unchanged). Repair lives in `Dispatch.ts @@ -7,19 +7,55 @@` (diff:656) `+ * Eviction reaches \`alive\` for a {@link NodeThread} this package produced.` (diff:690). `types.ts @@ -30,12 +31,18 @@` (diff:1113) `+ * A dispatch marks a thread dead for a \`NodeThread\` this package produced, through` (diff:1126). Guide hunk `guides/worker.md` around abort clause: `+   \`abort\`, flips \`alive = false\` for a thread this package produced, and observes` (diff:259). Verbatim repair phrase present.
3. **Old form sweep.** Finder named `spawnThread` in remarks: spawnThread no hit. Unconditional guide clause replaced in the captured + line. Residual unconditional flip wording remains in test comment `helpers.test.ts:232` `flips \`alive = false\` so the pool`.
4. **Report reading.** `applied`. `types.ts:41-45` matches. `Dispatch.ts:35-37` matches. `guides/worker.md:213` matches. `helpers.test.ts:613-639` matches (`it` at `:614`). Red capture `obj6-control-red.txt` points at `:625` for `expect(foreign.alive)` which is now `:633`.
5. **Proof reading.** Behavioural. Command `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/helpers.test.ts`. Red `obj6-control-red.txt` `Tests  1 failed | 47 passed (48)`. Restored file named `obj8-control-green.txt` `Tests  48 passed (48)`.

### worker-obj-7

1. **Site now.** Brief `helpers.test.ts:40` is `const isNumberArray = arrayOf(isNumber)` — local `fixture` gone. `handlers.test.ts:13` is teardown comment. `setupServer.test.ts:17` is module comment. Shared helper `setupServer.ts:22-24` `export function buildFixtureURL`. Proof `setupServer.test.ts:54-63`.
2. **Diff at the site.** `setupServer.ts @@ -14,18 +16,32 @@` `+export function buildFixtureURL(name: string): URL {` (diff:1549) `+	return new URL(\`tests/src/server/fixtures/${name}\`, resolveRoot(import.meta))` (diff:1550). Repair text present verbatim. Call-site hunks replace `fixture('x.ts')` with `buildFixtureURL('x.ts')`.
3. **Old form sweep.** `const fixture = ` over `tests`: no hit. Word `\bfixture\b` still hits comments/titles: `helpers.test.ts:22,177,230,298,318,802,804`, `setupServer.test.ts:55,60`, `handlers.test.ts:8`, `factories.test.ts:99`, `setupServer.ts:19`, plus fixture files and vendored tests. Inflection `fixtures` is the directory name throughout.
4. **Report reading.** `applied`. `setupServer.ts:22-24` matches. `setupServer.test.ts:56-65` — `it` at `:55`, assertions `:56-62`; report's `:56-65` still covers the case.
5. **Proof reading.** Behavioural. Broad `npm run test:setup` red **3 failed | 7 passed (10)** — `obj7-control-red.txt` `Tests  3 failed | 7 passed (10)`. Isolated red `obj7-control-red-isolated.txt` `Tests  1 failed | 5 skipped (6)`. Isolated green `obj7-green-isolated.txt` `Tests  1 passed | 5 skipped (6)`. Report `const fixture = ` empty agrees; word `fixture` still present.

### worker-obj-8

1. **Site now.** Brief `:228,:252,:643` `waitForDelay(20)` gone. Current gates: `helpers.test.ts:239-241` `waitForCondition('the long job is in flight', () => worker.active === 1, { budget: 5_000 })`; `:275-277` same description; `:727-729` `'three jobs are in flight'`. Warm-up `:228-229` / `:267`. Import `helpers.test.ts:14` `waitForCondition`.
2. **Diff at the site.** `helpers.test.ts @@ -200,56 +200,81 @@` (diff:2214) `+		await waitForCondition('the long job is in flight', () => worker.active === 1, {` (diff:2266). Parallel + at diff:2306 and diff:2686 `'three jobs are in flight'`. Repair text present.
3. **Old form sweep.** `waitForDelay` in `helpers.test.ts`: no hit. `waitForDelay(20)` still at `tests/src/core/Worker.test.ts:962,1092,1101,1141`.
4. **Report reading.** `applied`. Cites `:239,:275,:727` — match.
5. **Proof reading.** Behavioural. `obj8-control-red.txt` `Tests  48 passed (48)` (evict plant did not fail). `obj8-control-red-2.txt` `Tests  2 failed | 46 passed (48)`. `obj8-control-red-3.txt` `Tests  3 failed | 45 passed (48)` including the abort spec. Isolated red `obj8-control-red-isolated.txt` `Tests  1 failed | 47 skipped (48)`. Isolated green `obj8-green-isolated.txt` `Tests  1 passed | 47 skipped (48)`. Restored `obj8-control-green.txt` `Tests  48 passed (48)`. Report's helpers.test.ts `waitForDelay` empty agrees; `waitForDelay(20)` remains in `Worker.test.ts`.

### worker-obj-9

1. **Site now.** Brief `tests/guides.test.ts:1-189` still has name-parity imports; `@src/server` now at `:26-32` (`createJSONQueueStore`, `createNodeWorker`, `createThread`, `Dispatch`, `isReply`). Transcription `describe` at `:199-255`.
2. **Diff at the site.** `guides.test.ts @@ -187,3 +191,65 @@` (diff:1271) adds the fence `describe`. First + in that hunk is the comment block then `describe('worker.md fences return the values they claim', () => {`.
3. **Old form sweep.** No renamed symbol. Transcription is additive.
4. **Report reading.** `applied`. Cites `:199-255` — match. Imports from `@src/server` at `:26-32` match the sentence.
5. **Proof reading.** Behavioural. `obj9-control-red.txt` `Tests  3 failed | 15 passed (18)`. Persistence `obj9-persistence-control-red.txt` `Tests  1 failed | 17 passed (18)`. Restored 18 passed named without an `obj9-*-green` file; `gate-5-test.txt` guides `Tests  18 passed (18)`; `guides-after.txt` is also 18 passed but timestamp `21:06:04` is before the obj9 red `21:11:11`.

### worker-obj-10

1. **Site now.** `slow.ts:10` `const deadline = performance.now() + value`; `:12` `while (performance.now() < deadline)`. Context `:9-13`. `identify.ts:13-14` the same pair. Context `:12-15`. No `performance` import.
2. **Diff at the site.** `slow.ts @@ -7,9 +7,9 @@` (diff:1951) `+		const deadline = performance.now() + value` (diff:1956) `+		while (performance.now() < deadline) {` (diff:1959). `identify.ts @@ -5,13 +5,13 @@` (diff:1915) same + at diff:1927-1928. Verbatim.
3. **Old form sweep.** `Date\.now` over `src` `tests` `*.ts`: no hit.
4. **Report reading.** `applied`. Cites `slow.ts:10,12` and `identify.ts:13,14` — match.
5. **Proof reading.** Placement/rewrite. Report sweep `Date\.now` empty agrees. Report records no negative control; names R1 static-conformance exception.

### worker-obj-11

1. **Site now.** `tests/src/core/Worker.test.ts:30` `// src/core/Worker.ts — the Queue⨉Pool facade.` Context `:29-31`.
2. **Diff at the site.** `Worker.test.ts @@ -27,10 +27,10 @@` (diff:1596) `+// src/core/Worker.ts — the Queue⨉Pool facade. Real behaviour, no mocks: a` (diff:1601). Verbatim.
3. **Old form sweep.** `core/workers/` over `tests` `src` `guides` `README.md`: no hit.
4. **Report reading.** `applied`. Cites `:30` — match.
5. **Proof reading.** Naming. Report sweep empty agrees.

### worker-subj-2

1. **Site now.** Brief `src/server/types.ts:71-80` is now concurrency/retries/timeout remarks. `on`/`error` fields at `types.ts:86-87`. Remarks `:76-80`. Capture `NodeWorker.ts:19-20`, assign `:31-32`, spread `:52-53`. Guide Types row `guides/worker.md:112`. Sentence at `guides/worker.md:326-328`. Proof `factories.test.ts:149-167`.
2. **Diff at the site.** `types.ts @@ -86,10 +102,10 @@` region plus `+	readonly on?: EmitterHooks<WorkerEventMap<TResult>>` (diff:1170) `+	readonly error?: EmitterErrorHandler` (diff:1171). `NodeWorker.ts @@ -1,19 +1,23 @@` `+	readonly #on` / `+	readonly #error` (diff:800-801). `@@ -43,6 +49,8 @@` spread (diff:818-819). Repair text present.
3. **Old form sweep.** Additive keys; no removed name.
4. **Report reading.** `applied`. `types.ts:86-87`, `:76-80`, `NodeWorker.ts:19-20` match. Report `guides/worker.md:322-324` now holds the `workerData` mirror (`:321-324`), not the on/error sentence (`:326-328`). `factories.test.ts:135-160` — the `it` is at `:149`.
5. **Proof reading.** Behavioural. Red `subj2-control-red.txt` `Tests  1 failed | 8 passed (9)`. Isolated green `subj2-green-isolated.txt` `Tests  1 passed | 8 skipped (9)`. Whole-file restored 9 passed named as fix round 3, no capture file.

### worker-subj-6

1. **Site now.** `src/core/types.ts:55-59` `Default: 1.` / `Default: 0.` / `Default: no per-attempt deadline.` Pool bullet `:54` `Default for its \`max\`: the \`concurrency\` value.` `src/server/types.ts:70,71,72-73` same three sentences. `src/core/factories.ts:21-22` lists optional keys, no parenthetical defaults.
2. **Diff at the site.** `types.ts` (core) hunks with `+ *   integer, as validated by the underlying queue. Default: 1.` (diff:621). Server `+ *   validated by the underlying queue. Default: 1.` (diff:1154). `factories.ts @@ -8,8 +8,8 @@` (diff:552) `+ * Default for the pool's \`max\`: the \`concurrency\` value, so resources match the jobs in flight.` (diff:558). Verbatim `Default:` form present.
3. **Old form sweep.** `defaults to|\(default ` over `src`: no hit. Hits outside src: `tests/src/core/Worker.test.ts:625` `pool max defaults to 1`; `tests/setup.test.ts:13` `defaults to no hooks`.
4. **Report reading.** `applied`. Cites `core/types.ts:55-59`, `server/types.ts:68-73` (timeout wraps `:72-73`), `factories.ts:21-22` — match. Report src sweep empty agrees; tests still have `defaults to`.
5. **Proof reading.** Documentation. Report `grep -rnE "defaults to|\(default " src` empty agrees for `src`.

### worker-subj-9

1. **Site now.** `should`→`must`: `guides/worker.md:239` `must be structured-cloneable`; `:457` `must diverge`. `just` deleted at Practices `:454-455` `rather than abandoning its result`; `factories.ts:50` `A queue's durable state is a database table`. `via`→`through`: `README.md:13` `through \`input\` / \`result\` guards`. Count: `handlers.ts:55` `Read the envelope's \`command\`, \`id\`, \`job\`, and \`input\` fields once, defensively.` Temporal `after`: `factories.ts:11-12` `after it comes online`; Threads table `guides/worker.md:90` `after it comes \`online\``.
2. **Diff at the site.** README `@@ -10,13 +10,13 @@` `+structured-clone boundary with zero \`as\` through \`input\` / \`result\` guards.` (diff:10). Practices `+  \`pool.max\` explicitly only when the resource cap must diverge from the job cap.` (diff:441). handlers hunk names the four fields. `just` deletion in factories `@@ -1,17 +1,53 @@` adjacent remarks `+ * A queue's durable state is a database table` (diff:903).
3. **Old form sweep.** `\b(should|just|via)\b` over `src`, `tests`, `guides/worker.md`, `guides/README.md`, `README.md`: no hit (vendored `guides/*.md` still hit). `four fields`: no hit. Temporal `\bonce\b` remaining in `guides/worker.md:11,15,165,170,234,236,290,493,552` (one-time capture sense).
4. **Report reading.** `applied`. Cites `guides/worker.md:235` — current `:235` is `serveWorker` captures options once, not `must be structured-cloneable` (`:239`). Cites `:442` — current `:442` is `await worker.enqueue(...)`; `must diverge` is `:457`. `README.md:13` matches. `handlers.ts:55-56` matches.
5. **Proof reading.** Documentation. Report banned-term sweep empty on owned paths agrees with field 3; `once` remains in one-time sense.

### worker-subj-10

1. **Site now.** Introducing sentences: Factories `guides/worker.md:53`; Threads table `:86`; Entities `:95`; Types `:104`; Observing `:373`; Patterns fences `:390+` region; Practices `:451`; Tests `:474`; See also `:571`. `guides/README.md:7`, `:15`. `README.md:30`.
2. **Diff at the site.** `+Each factory the package publishes, with the entry point it belongs to:` (diff:99). `+The thread-level functions behind \`createNodeWorker\`:` (diff:141). `+The classes the core and server faces export:` (diff:152). `+Each type and interface the core and server faces publish:` (diff:162). `+The events the worker's emitter carries:` (diff:383). `+Follow these practices when you run a worker in production:` (diff:434). `+These tests pin the behaviour this guide documents:` (diff:449). `+Read these guides next:` (diff:502). README `+The package runs under these conditions:` (diff:24).
3. **Old form sweep.** Additive sentences; no removed name.
4. **Report reading.** `applied`. `:53,:86,:95,:104,:373,:474` match. Report `:441` is now Durable-jobs fence code (`:441` `await worker.enqueue`); Practices intro is `:451`. Report `:548` is fixture-list prose; See also intro is `:571`. `guides/README.md:7,:13` — directory intro is `:15` (`:13` is `## By directory`). `README.md:30` matches.
5. **Proof reading.** Documentation. Report lists the sentences; several cited lines have drifted.

### worker-subj-11

1. **Site now.** `src/server/types.ts:8-10` `the reply half of the wire protocol`. No "Internal plumbing" sentence. `guides/worker.md:114` Reply row `the reply half of the wire protocol`. `:204` `The run/abort/reply protocol is published as \`Reply\` and \`isReply\`:`. Barrel `src/server/index.ts:1-5` still star-exports types/helpers; Dispatch added by obj-1.
2. **Diff at the site.** `types.ts @@ -1,18 +1,19 @@` `+ * message — the reply half of the wire protocol \`createNodeWorker\` posts and \`serveWorker\`` (diff:1099). Guide `+\| \`Reply\` ... the reply half of the wire protocol.` (diff:177). `+   The run/abort/reply protocol is published as \`Reply\` and \`isReply\`:` (diff:246). Verbatim.
3. **Old form sweep.** `internal wire protocol|Internal plumbing` over `src` `guides/worker.md`: no hit.
4. **Report reading.** `applied`. `types.ts:8-10` match. Report `guides/worker.md:114` matches Reply row. Report `:200` — published-as sentence is `:204`.
5. **Proof reading.** Documentation. Report sweep empty agrees.

### worker-subj-13

1. **Site now.** Fence `guides/worker.md:69-83`. Imports `createThread, Dispatch, isReply` at `:70`. Uses `new Dispatch` `:77`, `job.promise` `:78`, `isReply` `:79-80`. No unread `result`. No comment standing in for the call.
2. **Diff at the site.** `guides/worker.md @@ -60,52 +62,60 @@` (diff:104) `+import { createThread, Dispatch, isReply } from '@orkestrel/worker/server'` (diff:117). `+	console.log(isReply({ id: 'reply-1', ok: true, value: 42 }, 'reply-1')) // true` (diff:129). Repair call present.
3. **Old form sweep.** `spawnThread` in fence gone (obj-1). Unused-import form gone.
4. **Report reading.** `applied`. Cites `guides/worker.md:69-84` — fence occupies `:69-83`.
5. **Proof reading.** Documentation/behaviour via obj-9 transcription `guides.test.ts:200-210`.

### worker-subj-14

1. **Site now.** `guides/worker.md:64-67` `Use these to drive one thread yourself; \`createNodeWorker\` is the entry point for pooled, queued work.` Handler sentence starts at `:294` `The handler's resolved value is the reply:`. `:293` `\`signal\` is per attempt`. `:310` `Per-job consumer context is explicit, structured-cloneable \`TInput\`.` `Dispatch.ts:17-18` `Per-job consumer context is explicit`.
2. **Diff at the site.** Threads prose `+these to drive one thread yourself; \`createNodeWorker\` is the entry point for pooled, queued` (diff:112). Continuity rewrites in the worker.md hunks around handler/signal/context.
3. **Old form sweep.** `Exported for completeness`: no hit. `remain source-compatible|remains an alternative|remains explicit|remains per attempt`: no hit. `\b(remain|remains|still)\b` still many concessive hits (e.g. `guides/worker.md:160,171,203,216,228,344,446,527`).
4. **Report reading.** `applied`. `:64-67` matches. Report `:283-286` is now inside the NodeWorker fence (`concurrency: 4` at `:280`); handler-reply sentence is `:294`. Report `:285` / `:306` drifted to `:293` / `:310`.
5. **Proof reading.** Documentation. Report remaining `remain`/`still` as concessive agrees with field 3.

### worker-subj-15

1. **Site now.** `src/server/types.ts:65-67` mirror licence complete; key `types.ts:91` `readonly workerData?: unknown`. Guide `guides/worker.md:323-324` same source sentence.
2. **Diff at the site.** `types.ts` remarks `+ * - \`workerData\` — opaque data cloned to every thread at spawn; the key mirrors the` (diff:1147-1148). Guide `+\`workerData\` key mirrors the \`node:worker_threads\` \`Worker\` constructor option of the same` (diff:354). Verbatim.
3. **Old form sweep.** Key not renamed. Old `via serveWorker` form gone from that bullet.
4. **Report reading.** `applied`. `types.ts:65-67` matches. Report `guides/worker.md:319-321` is death-latch prose; mirror sentence is `:323-324`.
5. **Proof reading.** Naming/docs. Key still `workerData`.

### fleet-F1

1. **Site now.** `tests/setup.ts` has no `isBrowserVuePath`. Header `:5-11`. Exports `TestQueueStore` / `PoolOptionsProbe`, not an empty module.
2. **Diff at the site.** `setup.ts @@ -2,7 +2,7 @@` (diff:1341) citation strip only: `+// ── Environment-agnostic base setup ───────────────────────────────────────────` (diff:1348). Helper not deleted (already absent).
3. **Old form sweep.** `isBrowserVuePath` over `tests/setup.ts` `tests/setup.test.ts` `src` `tests/setupServer.ts`: no hit.
4. **Report reading.** `noop`. Sentence that the helper is absent — matches.
5. **Proof reading.** Placement. Report grep empty agrees.

### fleet-F2

1. **Site now.** `Worker` `src/core/Worker.ts:47-55` begins `#queue`/`#pool`/`#emitter`. `Dispatch` `Dispatch.ts:54-55` `#thread`. `NodeWorker` `NodeWorker.ts:18-19` `#on`. `Thread` `Thread.ts:13-14` `#worker`. No public `readonly id: string` class field. `Reply` union `types.ts:21-22` has `readonly id: string` as a type member.
2. **Diff at the site.** No class-id reshape hunk.
3. **Old form sweep.** `^\s*readonly id` in `src` classes: no hit. `readonly id: string` only `types.ts:21-22`.
4. **Report reading.** `noop`. Classes named match. `types.ts:21-22` match.
5. **Proof reading.** Placement. Shape absent agrees.

### Across the unit — Scope

Status paths (`/home/user/work/evidence/conform-worker.status`), tagged against brief § Scope:

| Path | Tag |
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

Hunks whose **file** no row **Where** names (`file @@ hunk` + first `+` line):

- `src/core/Worker.ts @@ -1,5 +1,5 @@` `+import type { QueueContext, QueueEntryOptions } from '@orkestrel/queue'`
- `src/core/Worker.ts @@ -22,7 +22,7 @@` (execution→context in remarks)
- `src/core/Worker.ts @@ -150,10 +150,10 @@` `#handle` `context: QueueContext`
- `src/server/NodeWorker.ts @@ -1,19 +1,23 @@` `+import type { EmitterErrorHandler, EmitterHooks } from '@orkestrel/emitter'`
- `src/server/NodeWorker.ts @@ -24,6 +28,8 @@` `+		this.#on = options.on`
- `src/server/NodeWorker.ts @@ -43,6 +49,8 @@` `+			...(this.#on !== undefined ? { on: this.#on } : {}),`
- `src/server/NodeWorker.ts @@ -51,7 +59,7 @@` `+		return new Thread(this.#script, this.#workerData).promise`
- `src/server/NodeWorker.ts @@ -62,12 +70,12 @@` `+	#handle(input: TInput, thread: NodeThread, context: QueueContext)`
- `tests/src/core/factories.test.ts @@ -3,8 +3,9 @@` `+// with real implementations. createQueue / createPool / createDatabaseQueueStore /`
- `tests/src/server/factories.test.ts @@ -12,23 +12,31 @@` `+import { createJSONQueueStore, createNodeWorker, createThread } from '@src/server'`
- `tests/src/server/factories.test.ts @@ -43,8 +51,8 @@` (scratch disposer)
- `tests/src/server/factories.test.ts @@ -67,8 +75,8 @@`
- `tests/src/server/factories.test.ts @@ -80,10 +88,54 @@` `+describe('createThread', () => {`
- `tests/src/server/factories.test.ts @@ -94,15 +146,42 @@` `+	it('wires the \`on\` hooks...`
- `tests/src/server/factories.test.ts @@ -116,6 +195,8 @@` / `@@ -126,10 +207,12 @@` / `@@ -138,7 +221,7 @@` (probe order)
- `tests/src/server/fixtures/abortable.ts @@ -1,5 +1,5 @@` `+// sentinel \`-1\` after it fires, so a manually-driven test can observe the handler react.`
- `tests/src/server/fixtures/crash.ts @@ -3,7 +3,7 @@` `+// emits \`'exit'\` while the job is in flight and hits the \`Dispatch\`'s \`onExit\` (the thread is`
- `tests/src/server/fixtures/load-throw.ts @@ -1,8 +1,8 @@` `+// \`'exit'\` — so \`createThread\` resolves a live thread that immediately dies. The death reaches`
- `tests/src/server/fixtures/throw-async.ts @@ -1,7 +1,7 @@` `+// \`{ ok: false, error }\` reply (not an unhandled rejection / thread crash) as it does a`

(Repair text of several rows names some of these files; Where does not.)

### Across the unit — Residue

Diff `+` lines, pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`:

- `console.log` in Threads fence + `guides/worker.md` (diff:128-130) `+	console.log(await job.promise) // 42` and two `isReply` logs
- `console.log` in Dispatch `@example` (diff:705) `+ * console.log(await job.promise) // 42`
- Domain `retry`/`timeout` on many + lines (event names, option keys, comments), including `+ *   \`timeout\`, \`store\`, \`on\`, and \`error\` keys` (diff:570), `+\| \`NodeWorkerOptions\` ... \`retries?\` / \`timeout?\`` (diff:173), `+		const replacement = await worker.enqueue(0, { timeout: 5_000 })` (diff:2279)
- No `+` hit for `.skip(`, `.only(`, `.todo(`, `TODO`, `FIXME`, `debugger`

Tree `src` + `tests`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`:

- `.skip(`.`.only(`.`.todo(`: no hit in that population
- `TODO`/`FIXME`/`debugger`: no hit in that population
- `console.`: `src/server/Dispatch.ts:50` `console.log(await job.promise)` (example); tests none in the non-excluded set (`tests/config.test.ts:687` excluded)
- `retry`/`timeout`: domain hits including `src/core/types.ts:29` `readonly retry`, `:75` `readonly timeout?`, `src/server/types.ts:94`, `src/core/Worker.ts:191` `queue.on('retry'`, `tests/src/server/helpers.test.ts:94` `failure + retry`, `:167` timeout describe, `:251` `{ timeout: 5_000 }`, `tests/src/core/Worker.test.ts:88,620,1217,1252`

### Across the unit — Parity

`WorkerInterface` call-signatures (`src/core/types.ts`) vs `## Methods` (`guides/worker.md`):

| Member | types.ts | Methods |
| --- | --- | --- |
| `enqueue` | `:95` | `:131` |
| `restore` | `:97` | `:132` |
| `start` | `:98` | `:133` |
| `stop` | `:100` | `:134` |
| `pause` | `:101` | `:135` |
| `resume` | `:102` | `:136` |
| `abort` | `:109` | `:137` |
| `clear` | `:111` | `:138` |
| `destroy` | `:118` | `:139` |

Readonly data `WorkerInterface`: `emitter` `:90`, `count` `:91`, `active` `:92`, `paused` `:93`, `stopped` `:94`. Guide Types row `guides/worker.md:110` names `emitter` / `count` / `active` / `paused` / `stopped`; Entities `Worker` `:100`. `Worker` class getters `Worker.ts:93-109` then methods `:113-145`.

`Dispatch` class (no types.ts interface): `get promise` `Dispatch.ts:89`. Entities row `guides/worker.md:99`. No `## Methods` row for `Dispatch`.

`NodeThread` readonly `worker`/`alive`/`death` `types.ts:48-50`. Types row `guides/worker.md:114`.

`NodeWorkerOptions` data including added `on`/`error` `types.ts:86-95`. Types row `guides/worker.md:112`.

`WorkerOptions` `types.ts:67-76`. Types row `:109`.

`ServeWorkerOptions` `types.ts:116-117`. Types row `:113`.

Barrel: `src/core/index.ts:1-3` star-exports types, Worker, factories. `src/server/index.ts:1-5` star-exports types, helpers, handlers, factories, Dispatch.

Backticked identifiers in **added** guide sentences (diff `+` prose, not only fences), and barrel:

- `createNodeWorker` — `src/server/factories.ts` via `index.ts:4` yes
- `createThread` — factories via barrel yes
- `Dispatch` — `index.ts:5` yes
- `isReply` — helpers via `index.ts:2` yes
- `NodeThread` — types via `index.ts:1` yes
- `Reply` — types yes
- `WorkerEventMap` — core types via `src/core/index.ts:1` yes
- `WorkerInterface` — core types yes
- `QueueContext` — imported from `@orkestrel/queue`, not this barrel
- `on?` / `error?` — option keys, not barrel exports
- `workerData` — option key
- `node:worker_threads` — host module
- `promise` — `Dispatch` instance getter, not a barrel export

### Across the unit — Gates

Report § Gates quoted:

| Command | Exit code | Reading | File |
| ------- | --------- | ------- | ---- |
| `npm run format:check` | 0 | — | `gate-1-format-check.txt` |
| `npm run lint:check` | 0 | — | `gate-2-lint-check.txt` |
| `npm run check` | 0 | — | `gate-3-check.txt` |
| `npm run build` | 0 | — | `gate-4-build.txt` |
| `npm test` | 0 | `src:core`+`src:server` 111 passed (111); `policy` 111 passed (111); `config` 46 passed (46); `setup` 10 passed (10); `guides` 18 passed (18) | `gate-5-test.txt` |

Control-file readings: `gate-1-format-check.txt` `All matched files use the correct format.` `gate-5-test.txt` `Tests  111 passed (111)` (src), `Tests  111 passed (111)` (policy), `Tests  46 passed (46)`, `Tests  10 passed (10)`, `Tests  18 passed (18)`. Exit codes are not printed inside those files.

### Across the unit — Breaking

Report § Breaking: `@orkestrel/worker/server` loses `spawnThread` and `dispatch`, gains `createThread` and `Dispatch`. `QueueExecution` → `QueueContext` on handler context.

Word-boundary old names across `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/worker`, vendored `guides/worker.md` mirrors:

- `\bspawnThread\b`: no hit in sampled `queue`, `pool`, `contract`, `emitter`, `database`, `test`, and `/home/user/scaffold/src`
- `\bspawnThread\b` inside worker: no hit
- `from '@orkestrel/worker` importers outside worker: this sweep's workspace grep from `/home/user/fleet` returned only worker files

`QueueExecution` in worker owned paths: no hit; remaining `guides/queue.md:74` (vendored mirror).

### Across the unit — Writing sweep

Pattern case-insensitive `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b` over diff `+` lines in `guides/**`, `README.md`, src doc comments, test titles/comments.

Hits (quoted with tree `file:line` where the + landed):

- `guides/worker.md:74` `const thread = await createThread(new URL('./double.ts', import.meta.url))`
- `guides/worker.md:75` `const controller = new AbortController()` (context/fence; job line `:77` `new Dispatch`)
- `src/server/Dispatch.ts:47-49` example `new URL` / `new AbortController` / `new Dispatch`
- `src/server/factories.ts:37` example `new URL`
- `tests/src/server/fixtures/slow.ts:10,12` `performance.now()`
- `tests/src/server/fixtures/identify.ts:13,14` `performance.now()`
- Test code (not titles/comments) also matched the same `new` constructor pattern in `+` lines (`new Thread`, `new Dispatch`, `new URL`, `new Error`, `new ThreadWorker`, `new AbortController`)

Count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` over those `+` lines: no hit.

Tree after fix round 3: report claims `\b(above|below|now|guarantee|...)\b` over owned prose returns only `performance.now()` at those four fixture lines. Current `guides/worker.md:461` still has prose `create a new worker` (`\bnew\b`). That line is unchanged context in the captured diff (not a `+` line).

## Distillate

- worker-obj-1: helpers.ts:5-6 imports gone; createThread factories.ts:41; Dispatch barrel index.ts:5 | diff present yes | old form hits spawnThread 0, dispatch() 0, dispatched/dispatching 6 | report matches yes
- worker-obj-2: cleanup thunk gone; tempDatabasePath setupServer.ts:40-43 | diff present yes | old form hits 0 | report matches yes
- worker-obj-3: type import setupServer.test.ts:1 | diff present yes | old form hits 0 | report matches yes
- worker-obj-6: instanceof Dispatch.ts:166; remarks types.ts:41-45, Dispatch.ts:35-37, worker.md:213 | diff present yes (docs; instanceof unchanged) | old form hits spawnThread 0; unconditional flip comment helpers.test.ts:232 | report matches yes (red capture line 625 drifted to 633)
- worker-obj-7: buildFixtureURL setupServer.ts:22-24; local fixture decls gone | diff present yes | const fixture= 0; word fixture 9+ owned | report matches yes
- worker-obj-8: waitForCondition helpers.test.ts:239,275,727 | diff present yes | waitForDelay gone in helpers.test.ts; waitForDelay(20) Worker.test.ts 4 | report matches yes for cited lines
- worker-obj-9: transcription guides.test.ts:199-255 | diff present yes | old form n/a 0 | report matches yes
- worker-obj-10: performance.now slow.ts:10,12 identify.ts:13,14 | diff present yes | Date.now 0 | report matches yes
- worker-obj-11: Worker.test.ts:30 src/core/Worker.ts | diff present yes | core/workers/ 0 | report matches yes
- worker-subj-2: on/error types.ts:86-87; NodeWorker.ts:19-20,52-53 | diff present yes | n/a 0 | report matches no for worker.md:322-324 (on/error now :326-328)
- worker-subj-6: Default: core/types.ts:55-59 server/types.ts:70-73 | diff present yes | src 0; tests 2 | report matches yes for src cites
- worker-subj-9: must/through/named fields present | diff present yes | should/just/via owned 0 | report matches no for worker.md:235,:442
- worker-subj-10: intros at :53,:86,:95,:104,:373,:451,:474,:571 | diff present yes | n/a 0 | report matches no for :441,:548 and guides/README.md:13
- worker-subj-11: reply-half types.ts:8-10 worker.md:114,:204 | diff present yes | internal plumbing 0 | report matches yes for types.ts; :200 drifted to :204
- worker-subj-13: fence worker.md:69-83 exercises isReply | diff present yes | unused-import form 0 | report matches yes
- worker-subj-14: present-tense :64-67,:293-294,:310 | diff present yes | completeness/remain-source 0; still/remain concessive many | report matches no for :283-286,:285,:306
- worker-subj-15: workerData licence types.ts:65-67 worker.md:323-324 | diff present yes | key kept | report matches yes for types.ts; no for worker.md:319-321
- fleet-F1: isBrowserVuePath absent setup.ts | diff present no (noop; citation-only hunk) | old form 0 | report matches yes
- fleet-F2: no public id field on classes | diff present no | old form 0 | report matches yes

Scope tags: every status path owned; none shared; none off-limits.

Residue: no skip/only/todo/TODO/FIXME/debugger in owned src/tests (vendored excluded); console.log at Dispatch.ts:50 and guide fence worker.md:78-80; retry/timeout domain uses throughout.

Writing + hits: constructor `new` and `performance.now()` as listed; count-over-set pattern no hit on `+` lines.

Parity: WorkerInterface methods 9/9 lined up with Methods table; Dispatch `promise` has Entities row and no Methods row; NodeThread/NodeWorkerOptions/WorkerOptions/ServeWorkerOptions Types rows present; added guide ticks `createThread`/`Dispatch`/`isReply`/`createNodeWorker` barrelled.

## Unknowns

- Whole-file restored **9 passed (9)** for worker-obj-1 and worker-subj-2: report attributes to "fix round 3's run" with no file under `/home/user/work/evidence/worker-proofs/`.
- worker-obj-9 restored 18 passed: no `obj9-*-green` file; `guides-after.txt` timestamp precedes the obj9 red capture.
- Gate files do not print numeric exit codes; report table says 0.
- Fleet-wide `\bspawnThread\b` / consumer import sweep: `/home/user/fleet` directory glob timed out; sampled `queue`, `pool`, `contract`, `emitter`, `database`, `test`, and `/home/user/scaffold/src` only. Remaining fleet checkouts not listed.
- Captured diff (`conform-worker.diff`) is the post-fix-round-2 tree; report `:268` says it predates fix round 3 prose. Round-3 tree lines can disagree with diff `+` lines and with report pointers.
- Writing sweep `\bnew\b` also matched some `+` code lines the brief scoped as "test titles and comments" / "doc comments"; those constructor lines are listed rather than dropped.

## Journal


## Deviation

No tree change from this lane (read-only; no create/edit/delete; no mutating command). `/home/user/fleet` recursive glob timed out. Fleet breaking sweep did not cover every checkout under `/home/user/fleet/*/src`. Evidence diff was readable. Proof files named above were readable. Vendored `tests/setupPolicy.ts` / `policy.test.ts` / `config.test.ts` / `distribution.test.ts` were excluded from residue as specified.
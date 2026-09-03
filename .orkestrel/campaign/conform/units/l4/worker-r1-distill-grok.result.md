I'll read the brief in full first, then follow its instructions exactly in read-only mode.I'll load the unit brief, audit brief, report, and evidence next, then map each row against the tree.I'll gather current sites, the evidence diff, and the cited law sentences in parallel so each row can be mapped without editing anything.Next I’ll read the remaining named sites, the law sentences, and the proof-file summaries the report cites.## Question

For every row of unit conform-worker, what does the tree at `/home/user/fleet/worker` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

## Evidence

Law sentences the rows cite (quoted only):

- architecture.md Kind purity: "Keep the leaf pair class-free. `helpers.ts` and `validators.ts` sit at the bottom of a module's graph: they import types, constants, errors, and each other, and they import no implementation class." (`/home/user/scaffold/.claude/rules/architecture.md:86-88`)
- architecture.md factory form: "A function returning a live entity is an entity factory and belongs in `factories.ts` whatever it is called" (`architecture.md:78-79`); "Every exported function in `factories.ts` is named `create*`." (`architecture.md:65-66`)
- architecture.md Functions: "Never declare or assign a function inside another function or method." (`architecture.md:161`); "The only in-body function expressions allowed are an anonymous callback passed directly as an argument and an anonymous function returned directly as the result (the factory/combinator pattern)." (`architecture.md:163`)
- typescript.md: "Place `import type` declarations before value imports." (`typescript.md:17`); "Write a default as \"Default: …\" and a thrown error as \"Thrown when …\"." (`typescript.md:79`)
- quality.md: "Document the obligation instead when a defect is reachable only through a hypothetical foreign implementation of a contract this package publishes. State it on the interface that owns it and prove the documentation." (`quality.md:86`)
- tests.md: "Any duplicate or near-duplicate helper is a defect; consolidate it into one general form." (`tests.md:181`); "Test files import shared infrastructure rather than declaring local fixture factories." (`tests.md:185`); "Export every reusable helper, fixture type, factory, constant, and guard from setup files." (`tests.md:182`)
- tests.md Delay: "Use it to yield, never to wait for something another process produces." (`tests.md:218`)
- tests.md: "Transcribe each flagship fence and assert the values its comments claim." (`tests.md:70`); "Measure an elapsed interval with `performance.now()`, never `Date.now()`." (`tests.md:38`)
- writing.md: "Claim only what the reader can check." (`writing.md:38`); "In a reply or a guide, introduce every list, table, and code fence with a complete sentence naming what follows; a rule file's list sits bare under its heading." (`writing.md:63-64`)
- patterns.md: "Add `readonly on?: EmitterHooks<{Entity}EventMap>` and `readonly error?: EmitterErrorHandler` to options." (`patterns.md:74`)
- AGENTS.md: "Once an intentional reusable capability exists, expose its top-level source exports through the correct environment barrel" (`AGENTS.md:71`); "No compatibility shims. This is greenfield." (`AGENTS.md:72`); "**NEVER state a count.** … Name the members, or write the sentence without the number." (`AGENTS.md:172`)
- documentation.md: "A showcase is executable proof of public API." (`documentation.md:26`); "A parity failure identifies drift; never suppress or weaken the test." (`documentation.md:34`); "Falsify a prose claim the way you falsify a code claim." (`documentation.md:37`); "Where a prose claim about behaviour sits under no fence, add the executed assertion that would break if the claim went false." (`documentation.md:38`)
- names.md: "Ungrouped option keys: one word." (`names.md:29`); "An option key, constant, or member that transliterates an external protocol field, format field, or engine pragma keeps the external wording in this project's casing, and its TSDoc names the source it mirrors" (`names.md:120`)

### worker-obj-1

1. **Site now.** Brief `src/server/helpers.ts:5-6` (`import { Dispatch }` / `import { Thread }`) is gone. Current `:5-6` is the file header:

```4:6:/home/user/fleet/worker/src/server/helpers.ts
// === The wire protocol (main ↔ thread)
//
// The reply half of the run/abort/reply protocol `serveWorker` answers — the leaf predicate
```

`isReply` remains at `helpers.ts:26`. `createThread` is at `src/server/factories.ts:41-42`. `Dispatch` is published at `src/server/index.ts:5`. `NodeWorker.#create` is `new Thread(...)` at `NodeWorker.ts:61-62`; `#handle` is `new Dispatch(...).promise` at `NodeWorker.ts:79`. `Dispatch.ts:6` still imports `isReply` from `./helpers.js`. Guide Threads fence is `guides/worker.md:69-84`. INTERNAL is `tests/guides.test.ts:55` `['class NodeWorker', 'class Thread']`; barrel-absence names `tests/guides.test.ts:77` `['NodeWorker', 'Thread']`.

2. **Diff at the site.** `src/server/helpers.ts` `@@ -1,80 +1,14 @@` deletes `export function spawnThread` and `export function dispatch`. Operative repair text present in `+` lines: `src/server/factories.ts` `@@ -1,17 +1,53 @@` `+export function createThread(script: string | URL, workerData?: unknown): Promise<NodeThread> {`; `src/server/index.ts` `@@ -2,3 +2,4 @@` `+export * from './Dispatch.js'`; `src/server/NodeWorker.ts` `@@ -51,7 +59,7 @@` `+		return new Thread(this.#script, this.#workerData).promise`; `@@ -62,12 +70,12 @@` `+		return new Dispatch(thread, input, context, this.#result).promise` (repair named `execution`; `+` line uses `context`). Finder `createDispatch` is absent from `+` lines.

3. **Old form sweep.** Paths: `src`, `tests`, `guides/worker.md`, `guides/README.md`, `README.md` (exclude `node_modules`).
- `\b(spawnThread|spawnThreads|spawnThreaded|spawnThreading)\b` case-insensitive: no hit.
- `\bdispatch\(` / `import … dispatch`: no function-call/import hit.
- `\bdispatch\b` (exact old token): `src/server/factories.ts:22,25`; `Dispatch.ts:14,22,29`; `types.ts:18,37,41`; `handlers.ts:24,84`; `helpers.ts:18`; `tests/src/server/helpers.test.ts:245,505,553,554,635,810`; `handlers.test.ts:42-44,53-56,58,63,126,128-129,131,147`; `fixtures/identity.ts:3`; `guides/worker.md:207,227,228,232,241,243`; `README.md:16`.
- Inflections `\b(dispatches|dispatched|dispatching)\b` case-insensitive: `Dispatch.ts:10`; `types.ts:34`; `helpers.test.ts:52,537`; `guides/worker.md:225,320`.

4. **Report reading.** Table: `applied`. Sentence: "The refuter's operative form, in full." Cited `factories.ts:41` now is `export function createThread(...)` — carries the claim. Cited `index.ts:5` is `export * from './Dispatch.js'` — carries. Cited INTERNAL / barrel-absence lines carry. Cited `NodeWorker` cycle-free: `NodeWorker.ts` imports `Dispatch`/`Thread`, not `factories.ts`.

5. **Proof reading.** Report: parity red `npm run test:guides` **3 failed | 15 passed (18)** file `obj1-parity-control-red.txt`; restored **18 passed (18)** `guides-after.txt`. File exists; `Tests  3 failed | 15 passed (18)` at `obj1-parity-control-red.txt:70`; `Tests  18 passed (18)` at `guides-after.txt:13`. createThread red `obj1-createThread-control-red.txt` `Tests  1 failed | 8 passed (9)` at `:37`; restored inside `src-server-after-2.txt` `Tests  74 passed (74)` at `:17`. Report spawnThread/dispatch greps: spawnThread empty agrees; `\bdispatch\b` does not read empty (hits listed in field 3).

### worker-obj-2

1. **Site now.** Brief `tests/setupServer.ts:24` is now the body of `buildFixtureURL`. `tempDatabasePath` is at `:30-32`:

```29:32:/home/user/fleet/worker/tests/setupServer.ts
// file leaks (AGENTS §16.1).
export function tempDatabasePath(): { readonly path: string; readonly scratch: ScratchInterface } {
	const scratch = createScratch({ prefix: 'worker-store-' })
	return { path: join(scratch.path, 'store.json'), scratch }
```

`ScratchInterface` import at `setupServer.ts:7`. Call sites: `factories.test.ts:37-38`; `:52-53` / `:76-77` same form; `setupServer.test.ts:68` / `:73` / `:78`.

2. **Diff.** `tests/setupServer.ts` `@@ -14,16 +16,20 @@` `+export function tempDatabasePath(): { readonly path: string; readonly scratch: ScratchInterface } {` — repair text verbatim. `factories.test.ts` `@@ -12,23 +12,30 @@` and three `@@` hunks `+		const { path, scratch } = tempDatabasePath()` / `+		teardown.add(() => scratch.destroy())`.

3. **Old form.** `cleanup()` / `readonly cleanup` over `src` `tests` `--include=*.ts`: no hit. Inflections `\b(cleanup|cleanups|cleaned|cleaning)\b` in owned source: `src/core/types.ts:99,104,110,116`; `src/core/Worker.ts:30,32,177`; plus many `guides/worker.md` / `tests/src/core/Worker.test.ts` queue-cleanup uses (not the removed thunk).

4. **Report.** `applied`. "returns `{ readonly path: string; readonly scratch: ScratchInterface }`". Cited `:33` is the closing `}` of `tempDatabasePath`; signature is `:30`. Call-site citations `:35-36` are now `:37-38`. Content of the repair is present; cited numbers drifted.

5. **Proof.** File `obj2-control-red.txt` exists: `Tests  1 failed | 9 passed (10)` at `:33`. `setup-after.txt`: `Tests  10 passed (10)` at `:11`. Report cleanup-thunk sweep empty agrees with `cleanup()` / `readonly cleanup`.

### worker-obj-3

1. **Site now.** Brief `:8` is no longer the type import. Type import is `:1`; value import `:2`; no blank line between:

```1:3:/home/user/fleet/worker/tests/setupServer.test.ts
import type { NodeWorkerOptions } from '@src/server'
import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
```

Current `:8` is `import { createRecorder } from '@orkestrel/test'`.

2. **Diff.** `tests/setupServer.test.ts` `@@ -1,24 +1,30 @@` `+import type { NodeWorkerOptions } from '@src/server'` as the first line; `-import type` removed from after the value block.

3. **Old form.** Pattern `^import type` in that file: line 1 only.

4. **Report.** `applied`. Cited `:1` carries `import type { NodeWorkerOptions } from '@src/server'`. Cited `:2` is the vitest value import.

5. **Proof.** Placement row; report sweep `grep -rn "^import type" tests/setupServer.test.ts` returns line 1 — agrees.

### worker-obj-6

1. **Site now.** Brief `Dispatch.ts:135` `if (this.#thread instanceof Thread) this.#thread.evict()` moved to `:166`:

```164:167:/home/user/fleet/worker/src/server/Dispatch.ts
		this.#settled = true
		this.#detach()
		if (this.#thread instanceof Thread) this.#thread.evict()
		let termination: Promise<number>
```

Foreign-thread remarks: `types.ts:41-45`; class TSDoc `Dispatch.ts:35-37`; guide `guides/worker.md:211-213`; proof `helpers.test.ts:613-640`.

2. **Diff.** `Dispatch.ts` hunks `@@ -7,19 +7,55 @@` add the qualifier (`+ * Eviction reaches \`alive\` for a {@link NodeThread} this package produced.`). `types.ts` `@@ -30,12 +31,18 @@` adds the foreign-implementation paragraph. `guides/worker.md` `@@ -181,40 +191,41 @@` `+   \`abort\`, flips \`alive = false\` for a thread this package produced, and observes`. Finder text `spawnThread` is not in those `+` remarks; `createThread` / `createNodeWorker` are. Test hunk `@@ -556,18 +610,48 @@` adds the foreign-`NodeThread` case.

3. **Old form.** Unconditional "flips `alive = false`" without the qualifier: the qualified sentence is at `guides/worker.md:213`. Sweep of the old wrapper `@param thread` in `helpers.ts`: no `dispatch` wrapper remains.

4. **Report.** `applied`. Cited `types.ts:46-51`: those lines are `export interface NodeThread { readonly worker… }` — the remarks sit at `:41-45`, not `:46-51`. Cited `Dispatch.ts:35-37` carries the qualifier. Cited `guides/worker.md:210` is the fail-closed `job` sentence; the flips clause is `:213`. Cited `helpers.test.ts:601-630`: the describe starts `:613`; assertion `:633`. Content present; several cited lines do not carry what the report names.

5. **Proof.** `obj6-control-red.txt` exists: `Tests  1 failed | 47 passed (48)` at `:31`; failure at `alive` assertion (control file shows `:625`). Report restored file `obj8-control-green.txt`: `Tests  48 passed (48)` at `:9` (same file also used for obj-8 green).

### worker-obj-7

1. **Site now.** Brief `helpers.test.ts:40` local `fixture` is gone (current `:40` is inside `track`). `handlers.test.ts:13` is a teardown comment, not `const fixture`. `setupServer.test.ts:17` is a module comment. Shared helper:

```22:24:/home/user/fleet/worker/tests/setupServer.ts
export function buildFixtureURL(name: string): URL {
	return new URL(`tests/src/server/fixtures/${name}`, resolveRoot(import.meta))
}
```

Proof case `setupServer.test.ts:54-63`. Imports: `helpers.test.ts:15`; `handlers.test.ts:5`; `setupServer.test.ts:10`; `factories.test.ts:18`.

2. **Diff.** `setupServer.ts` `@@ -14,16 +16,20 @@` `+export function buildFixtureURL(name: string): URL {` / `+	return new URL(\`tests/src/server/fixtures/${name}\`, resolveRoot(import.meta))` — verbatim. `helpers.test.ts` `@@ -36,9 +39,6 @@` deletes `const fixture`. `handlers.test.ts` `@@ -10,8 +10,6 @@` deletes local `fixture`. `setupServer.test.ts` `@@ -1,24 +1,30 @@` replaces `fixture(` with `buildFixtureURL(`.

3. **Old form.** `const fixture = ` over `tests`: no hit. Inflection `fixture` remains as directory/path prose (`helpers.test.ts:22,25,177,…`; `setupServer.ts:19,23`; `setupServer.test.ts:19,55,57,60`; `guides/worker.md:554-555`).

4. **Report.** `applied`. Cited `setupServer.ts:19-21` is the comment; the export is `:22-24`. Cited proof `:56-65` is `:54-63`. Helper body matches.

5. **Proof.** `obj7-control-red.txt`: `Tests  3 failed | 7 passed (10)` at `:56`. Restored: report names **10 passed (10)**; `setup-after.txt:11` matches that summary. Sweep `const fixture = ` empty agrees.

### worker-obj-8

1. **Site now.** Brief `:228,:252,:643` `waitForDelay(20)` gone. Current gates:

```239:241:/home/user/fleet/worker/tests/src/server/helpers.test.ts
		await waitForCondition('the long job is in flight', () => worker.active === 1, {
			budget: 5_000,
		})
```

Handoff `:275-277` same description/budget. Three-in-flight `:727-729` `'three jobs are in flight'` / `worker.active === 3` / `{ budget: 5_000 }`. Warm-up `:228` / `:267`. Import `waitForCondition` at `:14`. Replacement threadId assertion `:251-253`.

2. **Diff.** `helpers.test.ts` `@@ -209,39 +209,62 @@` and `@@ -249,7 +272,9 @@` and `@@ -640,7 +724,9 @@` add `waitForCondition` with those description strings. `+await waitForCondition('three jobs are in flight', () => worker.active === 3, {` present. No `timeout:` raised on `it(`.

3. **Old form.** `waitForDelay` in `tests/src/server/helpers.test.ts`: no hit. Same token elsewhere: `tests/src/server/handlers.test.ts:4,259`; `tests/src/core/Worker.test.ts` (including `waitForDelay(20)` at `:962,:1092,:1101,:1141`).

4. **Report.** `applied`. Cited `:242,:280,:743` — current gates are `:239,:275,:727`. Descriptions match; line numbers drifted.

5. **Proof.** `obj8-control-red.txt`: `Tests  48 passed (48)` (plant did not redden). `obj8-control-red-2.txt`: `Tests  2 failed | 46 passed (48)`. `obj8-control-red-3.txt`: `Tests  3 failed | 45 passed (48)`. `obj8-control-green.txt`: `Tests  48 passed (48)`. Files exist; summaries match the report's quoted counts. helpers.test.ts `waitForDelay` sweep empty agrees.

### worker-obj-9

1. **Site now.** Brief `guides.test.ts:1-189` still starts as parity machinery; `@src/server` imports are `:26-32`; transcription `describe` is `:199-257` (after the manifest loop). Threads / NodeWorker / Persistence / CPU-parallel cases at `:202,:215,:230,:244`.

2. **Diff.** `tests/guides.test.ts` `@@ -20,8 +20,17 @@` adds `createJSONQueueStore`, `createNodeWorker`, `createThread`, `Dispatch`, `isReply`. `@@ -187,3 +191,67 @@` adds `describe('worker.md fences return the values they claim'`. `+			await expect(worker.enqueue(21)).resolves.toBe(42)` present. Persistence `+			expect(work).toEqual([{ id: 'job-1', input: 'https://example.com', attempts: 0 }])` present.

3. **Old form.** "imports only `@orkestrel/guide`" is false now: `guides.test.ts:26-32` imports `@src/server`.

4. **Report.** `applied`. Cited `:194-256` — block is `:199-257`. Imports named in the report are at `:26-32`.

5. **Proof.** `obj9-control-red.txt`: `Tests  3 failed | 15 passed (18)` at `:73`. `obj9-persistence-control-red.txt`: `Tests  1 failed | 17 passed (18)` at `:41`. Restored: `guides-after.txt` `Tests  18 passed (18)`.

### worker-obj-10

1. **Site now.**

```9:12:/home/user/fleet/worker/tests/src/server/fixtures/slow.ts
	handler: (value) => {
		const deadline = performance.now() + value
		// Intentionally ignores the signal — a tight spin loop.
		while (performance.now() < deadline) {
```

`identify.ts:13-14` the same pair. No `performance` import. `slow.ts:2` / `identify.ts:3` still import `serveWorker` from `handlers.ts`.

2. **Diff.** `slow.ts` `@@ -7,9 +7,9 @@` `+		const deadline = performance.now() + value` / `+		while (performance.now() < deadline) {`. `identify.ts` `@@ -5,13 +5,13 @@` same `+` pair. Verbatim.

3. **Old form.** `Date.now` over `src` `tests` `--include=*.ts`: no hit (one hit in vendored `guides/emitter.md:30`, outside the named paths).

4. **Report.** `applied`. Cited `slow.ts:10,12` and `identify.ts:13,14` carry `performance.now()`.

5. **Proof.** Report records no behavioural control and sweep `Date.now` empty — agrees on owned `src`/`tests` `.ts`.

### worker-obj-11

1. **Site now.**

```29:31:/home/user/fleet/worker/tests/src/core/Worker.test.ts
// src/core/Worker.ts — the Queue⨉Pool facade. Real behaviour, no mocks: a
// counting `create` hook proves resources are reused and never exceed the pool max,
// gates pin jobs in flight so the cap is observable, and a throwing handler proves the
```

`:33` still carries `AGENTS §16`.

2. **Diff.** `Worker.test.ts` `@@ -27,7 +27,7 @@` `+// src/core/Worker.ts — the Queue⨉Pool facade. Real behaviour, no mocks: a` — verbatim.

3. **Old form.** `core/workers/` over `tests` `src` `guides` `README.md`: no hit. Inflections of `workers/Worker`: no hit.

4. **Report.** `applied`. Cited `:30` carries `src/core/Worker.ts`.

5. **Proof.** Sweep empty agrees.

### worker-subj-2

1. **Site now.** Brief `types.ts:71-80` is now the `concurrency`/`retries` remarks. `NodeWorkerOptions` members:

```85:87:/home/user/fleet/worker/src/server/types.ts
export interface NodeWorkerOptions<TInput, TResult> {
	readonly on?: EmitterHooks<WorkerEventMap<TResult>>
	readonly error?: EmitterErrorHandler
```

`#on`/`#error` `NodeWorker.ts:19-20`, assigned `:31-32`, spread `:52-53`. Guide row `guides/worker.md:112`. Sentence `guides/worker.md:326-328`. Test `factories.test.ts:148-173`.

2. **Diff.** `types.ts` `@@ -50,25 +57,34 @@` adds `on`/`error` remarks and fields. `NodeWorker.ts` `@@ -1,19 +1,23 @@` `+	readonly #on` / `+	readonly #error`. `@@ -43,6 +49,8 @@` conditional spreads. `factories.test.ts` `@@ -94,6 +145,33 @@` `+	it('wires the \`on\` hooks at construction and routes a listener throw to \`error\`'`.

3. **Old form.** `NodeWorkerOptions` without `on`/`error`: those keys are present at `types.ts:86-87` and `guides/worker.md:112`.

4. **Report.** `applied`. Cited `types.ts:96-97` are `store?:` / closing `}` — members are `:86-87`. Cited `NodeWorker.ts:19-20` carry `#on`/`#error`. Cited `guides/worker.md:112` lists `on?` / `error?`. Cited `:322-324` is the structured-clone/`workerData` paragraph; the hooks sentence is `:326-328`. Cited `factories.test.ts:135-160` is now `:148-173`.

5. **Proof.** `subj2-control-red.txt`: `Tests  1 failed | 8 passed (9)` at `:25`. Restored: report points at the **74 passed (74)** server run (`src-server-after-2.txt:17`).

### worker-subj-6

1. **Site now.** `src/core/types.ts:55-59` ends "Default: 1." / "Default: 0." / "Default: no per-attempt deadline." Pool bullet `:53-54` "Default for its `max`: the `concurrency` value." `src/server/types.ts:68-73` same three Default sentences. `src/core/factories.ts:21-22` lists optional keys and `{@link WorkerOptions}` (no parenthetical defaults). `:11` still "The pool's `max` defaults to `concurrency`".

2. **Diff.** `src/core/types.ts` `@@ -50,12 +50,13 @@` `+ *   integer, as validated by the underlying queue. Default: 1.` and retries/timeout Default lines. `src/core/factories.ts` `@@ -18,8 +18,8 @@` replaces `(default \`1\`)` / `(default \`0\`)`. `src/server/types.ts` same Default sentences in `@@ -50,25 +57,34 @@`.

3. **Old form.** `defaults to|\(default ` over `src --include=*.ts`: `src/core/factories.ts:11` only. `Default: ` present on the option bullets named by the row.

4. **Report.** `applied`. Cited `core/types.ts:55-59` carry the three Default sentences. Cited `server/types.ts:80-85` are the `on`/`error` remarks — concurrency/retries/timeout Default sentences are `:68-73`. Cited `factories.ts:21-22` carry the optional-key list.

5. **Proof.** Documentation row; report's `defaults to` sweep leaving `:11` agrees with this sweep.

### worker-subj-9

1. **Site now.** `guides/worker.md:239` "must be structured-cloneable"; `:457` "must diverge from the job cap". `just` deleted at Practices `:454` ("rather than abandoning"). `README.md:13` "through `input` / `result`". `handlers.ts:55` "Read the envelope's `command`, `id`, `job`, and `input` fields once, defensively." Temporal `after`: `abortable.ts:2`; `identify.ts:8`; `factories.ts:11-12` "after it comes online".

2. **Diff.** Multiple `guides/worker.md` hunks (`@@ -225,14 +236,14 @@`, `@@ -424,11 +448,13 @@`, README `@@ -10,13 +10,13 @@`, `handlers.ts` `@@ -52,7 +52,8 @@`, fixture comment hunks). Repair strings present in `+` lines: `must be structured-cloneable`; `must diverge`; `through \`input\` / \`result\``; envelope field list.

3. **Old form.** Owned-path `\b(should|just|via)\b` in `guides/worker.md`, `guides/README.md`, `README.md`, `src`: no `should`/`just`/`via` hits (code `new` and `guarantee` remain; see writing sweep). Temporal `\bonce\b` still appears as "one time" / API (`guides/worker.md:11,15` "captured … once"; `handlers.ts:55` "fields once"; `setup.test.ts:13` "invokes its hook once"). Count rewrite: `README.md:35` "Published with the entry points the `exports` field in `package.json` names".

4. **Report.** `applied`. Several cited worker.md lines drifted (`:235` vs `:239`; `:442` vs `:457`). `handlers.ts:55-56` carries the named-fields sentence.

5. **Proof.** Report closing greps claim empty for the banned-term pattern; owned `src`/`guides/worker.md`/`README.md`/`guides/README.md` have no `should`/`just`/`via`. `once` hits remain (permitted-sense per report). `\bnow\b` remains at `tests/setupServer.test.ts:77` and `helpers.test.ts:206,273` (not in the report's listed banned pattern, which omitted `now`).

### worker-subj-10

1. **Site now.** Introducing sentences: `guides/worker.md:53` Factories; `:86` Threads table; `:95` Entities; `:104` Types; `:373` event-map; `:451` Practices; `:474` Tests; `:571` See also; `guides/README.md:7,:15,:69`; `README.md:30`. Pattern fence intros: `:392,:412,:432`. Surface fence `:34-35` and Threads fence `:67` still have intros.

2. **Diff.** `guides/worker.md` `@@ -50,6 +50,8 @@` `+Each factory the package publishes, with the entry point it belongs to:`; similar `+` intros in later hunks; `guides/README.md` `@@ -4,12 +4,16 @@`; README `@@ -27,6 +27,8 @@` `+The package runs under these conditions:`.

3. **Old form.** Bare tables named in the evidence now have a sentence immediately above them (lines above).

4. **Report.** `applied`. Cited `:53,:86,:95,:104,:373,:441,:474,:548` — Practices intro is `:451` not `:441`; See also intro is `:571` not `:548`. README `:30` carries the Requirements sentence. `guides/README.md:65` in the repair is now `:69` "Read this next:".

5. **Proof.** Placement/docs; intros exist at the named tables. Report line numbers partially drifted.

### worker-subj-11

1. **Site now.** `src/server/types.ts:8-10` "the reply half of the wire protocol". No "Internal plumbing" sentence. `guides/worker.md:115` Reply row "the reply half of the wire protocol". `:204` "The run/abort/reply protocol is published as `Reply` and `isReply`:". `src/server/index.ts:1-2` still star-exports types and helpers. INTERNAL does not list `Reply`/`isReply`.

2. **Diff.** `types.ts` `@@ -1,15 +1,16 @@` `+ * message — the reply half of the wire protocol…` and deletion of Internal plumbing. Guide hunks replace "internal wire protocol".

3. **Old form.** `internal wire protocol|Internal plumbing` over `src` `guides/worker.md`: no hit.

4. **Report.** `applied`. Cited `types.ts:6-8` is the opening of the Reply TSDoc (line 8-9 carry "reply half"). Cited `worker.md:114` is `ServeWorkerOptions`; Reply row is `:115`. Cited `:200` is a result-guard sentence; protocol sentence is `:204`.

5. **Proof.** Sweep empty agrees.

### worker-subj-13

1. **Site now.** Fence `guides/worker.md:69-84` imports `createThread, Dispatch, isReply`; uses `new Dispatch`; `console.log(await job.promise) // 42`; `isReply(..., 'reply-1')` and `isReply(..., 'other')`. Unused `result` / comment-only `isReply` gone.

2. **Diff.** `guides/worker.md` `@@ -60,52 +62,60 @@` `+import { createThread, Dispatch, isReply } from '@orkestrel/worker/server'` and the `+console.log` / `+isReply` lines. Operative rewrite present (symbols follow obj-1 names, not finder `spawnThread`/`dispatch`).

3. **Old form.** Fence import `dispatch, isReply, spawnThread`: no hit. Comment "`isReply` is the total predicate `dispatch` uses internally": no hit.

4. **Report.** `applied`. Cited `:69-84` is the fence body.

5. **Proof.** Transcribed at `tests/guides.test.ts:202-212`. Old unused-import form gone.

### worker-subj-14

1. **Site now.** `guides/worker.md:64-67` "Use these to drive one thread yourself; `createNodeWorker` is the entry point for pooled, queued work." `:293-294` "`signal` is per attempt…"; `:294` "The handler's resolved value is the reply:". `:310` "Per-job consumer context is explicit, structured-cloneable `TInput`." Continuity rewrites: `guides/worker.md:12` "is invalid"; `:247` "is an alternative"; `README.md:19` "is explicit, structured-cloneable input"; `NodeWorker.ts:16` "is the plain core". Remaining `remain`/`still`: `guides/worker.md:160,171,203,216,228,344,446,527,541,566`; `src/core/types.ts:52`; `Dispatch.ts:36`; plus test concessives.

2. **Diff.** Threads prose `@@ -60,52 +62,60 @@` replaces "Exported for completeness…". Handler section `@@ -277,11 +288,10 @@` starts at "The handler's resolved value is the reply:". `:297` hunk "Per-job consumer context is explicit".

3. **Old form.** "remain source-compatible": no hit. "Exported for completeness and direct use": no hit. `\bremain` still hits concessive sentences listed above.

4. **Report.** `applied`. Cited `:283-286` / `:285` / `:306` drifted to `:293-294` / `:310`. Cited `:64-67` carries the "Use these to drive" sentence.

5. **Proof.** Continuity phrases named by the row are rewritten; `remain`/`still` not empty.

### worker-subj-15

1. **Site now.** Key still `workerData`. Licence:

```65:67:/home/user/fleet/worker/src/server/types.ts
 * - `workerData` — opaque data cloned to every thread at spawn; the key mirrors the
 *   `node:worker_threads` `Worker` constructor option of the same name, and the thread reads
 *   it back from `node:worker_threads`. It must be structured-cloneable.
```

Guide `guides/worker.md:323-324` same source sentence. Interface field `types.ts:91`.

2. **Diff.** `types.ts` `@@ -50,25 +57,34 @@` `+ * - \`workerData\` — opaque data cloned… mirrors the` / `+ *   \`node:worker_threads\` \`Worker\` constructor option`. Guide `@@ -309,7 +319,13 @@` adds the mirror sentence. Verbatim enough (finder "once at spawn" is not in the `+` text; "at spawn" is).

3. **Old form.** `via \`serveWorker\`'s host \`workerData\``: no hit. Key not renamed.

4. **Report.** `applied`. Cited `types.ts:76-78` is the `on` remarks; licence is `:65-67`. Cited `guides/worker.md:319-321` is the terminate/death paragraph; mirror sentence is `:323-324`.

5. **Proof.** Naming/docs; `node:worker_threads` named in TSDoc and guide. Sweep of missing licence: the source sentence is present.

### fleet-F1

1. **Site now.** `tests/setup.ts` has `TestQueueStore` / `PoolOptionsProbe`; no `isBrowserVuePath`. `tests/setup.test.ts:12` `describe('TestQueueStore'`; no `describe('isBrowserVuePath'`. Header `setup.ts:10-11` does not name that helper.

2. **Diff.** Status/diff do not touch `tests/setup.ts` or `tests/setup.test.ts`.

3. **Old form.** `isBrowserVuePath` over `tests/setup.ts` `tests/setup.test.ts` `src` `tests/setupServer.ts`: no hit.

4. **Report.** Table `noop`. Sentence: helper absent, `grep` no output. Paths read match.

5. **Proof.** Sweep agrees: helper absent. Workspace has no `src/browser`.

### fleet-F2

1. **Site now.** Public `readonly id: string` data field ahead of `#` fields: not on `Worker` (`Worker.ts:47` starts `readonly #queue`), `Dispatch` (`Dispatch.ts:54` starts `readonly #thread`; `#id` at `:60` is private), `NodeWorker` (`NodeWorker.ts:18` starts `#on`), `Thread` (`Thread.ts:13` starts `#worker`). `Reply` union has `readonly id: string` at `types.ts:21-22` (type, not class field). `ThreadReply` (`setupServer.ts:104`) has `readonly #id`.

2. **Diff.** No class-order reshape of a public `id` field.

3. **Old form.** Shape absent; no rename sweep.

4. **Report.** `noop`. Classes named in the report exist at those files; `Worker.ts:47` is `export class Worker`.

5. **Proof.** Sweep of public `readonly id: string` class fields: only `Reply` type members and vendored `setupPolicy.ts` fixture text.

### Across the unit

**Scope.** Status paths (`/home/user/work/evidence/conform-worker.status`), tagged against brief § Scope:

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
| `tests/setupServer.test.ts` | owned |
| `tests/setupServer.ts` | owned |
| `tests/src/core/Worker.test.ts` | owned |
| `tests/src/server/factories.test.ts` | owned |
| `tests/src/server/fixtures/abortable.ts` | owned |
| `tests/src/server/fixtures/crash.ts` | owned |
| `tests/src/server/fixtures/identify.ts` | owned |
| `tests/src/server/fixtures/load-throw.ts` | owned |
| `tests/src/server/fixtures/slow.ts` | owned |
| `tests/src/server/fixtures/throw-async.ts` | owned |
| `tests/src/server/handlers.test.ts` | owned |
| `tests/src/server/helpers.test.ts` | owned |

No status path is shared or off-limits.

Diff hunks whose **file** no row **Where** names (`file @@ hunk` + first `+` line):

- `src/core/Worker.ts @@ -1,5 +1,5 @@` `+import type { QueueContext, QueueEntryOptions } from '@orkestrel/queue'`
- `src/core/Worker.ts @@ -22,7 +22,7 @@` `+ *   \`context.signal\`, so an \`abort\` / \`timeout\` while waiting for a resource rejects`
- `src/core/Worker.ts @@ -150,10 +150,10 @@` `+	async #handle(input: TInput, context: QueueContext): Promise<TResult> {`
- `src/server/NodeWorker.ts @@ -1,19 +1,23 @@` `+import type { EmitterErrorHandler, EmitterHooks } from '@orkestrel/emitter'`
- `src/server/NodeWorker.ts @@ -24,6 +28,8 @@` `+		this.#on = options.on`
- `src/server/NodeWorker.ts @@ -43,6 +49,8 @@` `+			...(this.#on !== undefined ? { on: this.#on } : {}),`
- `src/server/NodeWorker.ts @@ -51,7 +59,7 @@` `+		return new Thread(this.#script, this.#workerData).promise`
- `src/server/NodeWorker.ts @@ -62,12 +70,12 @@` `+	#handle(input: TInput, thread: NodeThread, context: QueueContext): Promise<TResult> {`
- `tests/src/server/factories.test.ts @@ -12,23 +12,30 @@` `+import { createJSONQueueStore, createNodeWorker, createThread } from '@src/server'`
- `tests/src/server/factories.test.ts @@ -43,8 +50,8 @@` `+		const { path, scratch } = tempDatabasePath()`
- `tests/src/server/factories.test.ts @@ -67,8 +74,8 @@` `+		const { path, scratch } = tempDatabasePath()`
- `tests/src/server/factories.test.ts @@ -80,10 +87,54 @@` `+describe('createThread', () => {`
- `tests/src/server/factories.test.ts @@ -94,6 +145,33 @@` `+	it('wires the \`on\` hooks at construction and routes a listener throw to \`error\`', async () => {`
- `tests/src/server/factories.test.ts @@ -102,7 +180,9 @@` `+				on: {},`
- `tests/src/server/fixtures/abortable.ts @@ -1,5 +1,5 @@` `+// sentinel \`-1\` after it fires, so a manually-driven test can observe the handler react.`
- `tests/src/server/fixtures/crash.ts @@ -3,7 +3,7 @@` `+// emits \`'exit'\` while the job is in flight and hits the \`Dispatch\`'s \`onExit\` (the thread is`
- `tests/src/server/fixtures/load-throw.ts @@ -1,8 +1,8 @@` `+// \`'exit'\` — so \`createThread\` resolves a live thread that immediately dies. The death reaches`
- `tests/src/server/fixtures/throw-async.ts @@ -1,7 +1,7 @@` `+// \`{ ok: false, error }\` reply (not an unhandled rejection / thread crash) as it does a`

**Residue.** Diff `+` lines matching `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` (quoted):

- `guides/worker.md` `+> attempt's \`context.signal\`, so an abort / timeout while waiting…`
- `guides/worker.md` `+	console.log(await job.promise) // 42` and two further `+	console.log(isReply…)`
- `guides/worker.md` `+\| \`NodeWorkerOptions\` … \`retries?\` / \`timeout?\` / …`
- `guides/worker.md` `+   \`context.signal\` keeps its leased resource… on a timeout /`
- `guides/worker.md` `+   …preserved across retry`
- `guides/worker.md` `+  out when it fires, so timeouts and aborts…`
- `src/core/Worker.ts` `+ *   \`context.signal\`, so an \`abort\` / \`timeout\`…`
- `src/core/factories.ts` `+ *   \`timeout\`, \`store\`, \`on\`, and \`error\` keys`
- `src/core/types.ts` `+ * - \`timeout\` — the default per-attempt deadline…`
- `src/server/Dispatch.ts` `+ * console.log(await job.promise) // 42`
- `src/server/types.ts` `+ * - \`retries\` … failure / timeout. Default: 0.` and `+ * - \`timeout\` — …`
- `tests/src/core/Worker.test.ts` `+	it('frees the queue slot on timeout while the resource stays held…'`
- `tests/src/server/helpers.test.ts` `+		// timeout path) aborts the attempt MID-FLIGHT…`
- `tests/src/server/helpers.test.ts` `+		const replacement = await worker.enqueue(0, { timeout: 5_000 })`

No `+` hit for `.skip(` / `.only(` / `.todo(` / `TODO` / `FIXME` / `debugger`.

Tree `src` + `tests` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`:

- `.skip(` / `.only(` / `.todo(` / `TODO` / `FIXME` / `debugger`: no hit
- `console.`: `src/server/Dispatch.ts:50`
- `retry` / `timeout`: `src/core/types.ts:15,29,52,58,75`; `src/server/factories.ts:87,97,105`; `src/server/NodeWorker.ts:27,39,56`; `src/server/types.ts:71,72,94`; `src/core/factories.ts:8,22`; `src/core/Worker.ts:16,25,26,37,64,77,191`; `tests/src/server/helpers.test.ts:94,102,128,140,167,168,174,182,188,193,199,231,251,505,684,688`; `tests/src/server/factories.test.ts:191,207,219`; `tests/src/core/Worker.test.ts:88,93,101,103,233,293-296,326,620,626,629,651,652,654,1201,1217,1222,1252,1265`; `tests/src/server/fixtures/slow.ts:5`; `tests/src/server/fixtures/identity.ts:26`; `tests/setupServer.ts:88-90`; `tests/setupServer.test.ts:100,114,125,143,158`

**Parity.** Entities the diff touches in `src/**/types.ts` or a class file:

WorkerInterface call-signatures (`src/core/types.ts`) vs `guides/worker.md` `## Methods`:

| Member | types.ts | Methods table |
| --- | --- | --- |
| `enqueue` | `types.ts:95` | `guides/worker.md:131` |
| `restore` | `types.ts:97` | `guides/worker.md:132` |
| `start` | `types.ts:98` | `guides/worker.md:133` |
| `stop` | `types.ts:100` | `guides/worker.md:134` |
| `pause` | `types.ts:101` | `guides/worker.md:135` |
| `resume` | `types.ts:102` | `guides/worker.md:136` |
| `abort` | `types.ts:109` | `guides/worker.md:137` |
| `clear` | `types.ts:111` | `guides/worker.md:138` |
| `destroy` | `types.ts:118` | `guides/worker.md:139` |

Worker class methods: `Worker.ts:113,117,121,125,129,133,137,141,145` same nine names. Readonly data: `types.ts:90-94` `emitter`/`count`/`active`/`paused`/`stopped`; getters `Worker.ts:93,97,101,105,109`; Surface/Types row `guides/worker.md:110`.

Dispatch (class file, no `types.ts` interface): `constructor` `Dispatch.ts:71`; `get promise` `Dispatch.ts:89`. Guide Entities row `guides/worker.md:99` names `Dispatch` / `promise`. No `## Methods` table for `Dispatch`.

NodeWorker (class file): public `build()` `NodeWorker.ts:43`. Not in Methods (INTERNAL `guides.test.ts:55`).

NodeThread readonly data `types.ts:48-50` `worker`/`alive`/`death`; Types row `guides/worker.md:114`.

NodeWorkerOptions `types.ts:86-95` including `on?`/`error?`; Types row `guides/worker.md:112`.

WorkerOptions `types.ts:67-69` `on?`/`error?`; Types row `guides/worker.md:109`.

Backticked identifiers in guide **sentences the diff added** (not fence bodies) and barrel:

- `createNodeWorker` (`guides/worker.md:65,86`) — `src/server/index.ts:4` via `./factories.js` (`createNodeWorker` `factories.ts:124`)
- `createThread` (`guides/worker.md:90`) — same barrel (`factories.ts:41`)
- `Dispatch` (`guides/worker.md:99`) — `src/server/index.ts:5`
- `isReply` (`guides/worker.md:91`) — `src/server/index.ts:2` via `./helpers.js`
- `Reply` (`guides/worker.md:115,204`) — `src/server/index.ts:1` via `./types.js`
- `on?` / `error?` (`guides/worker.md:112,326-327`) — option keys, not barrel exports
- `WorkerEventMap` (`guides/worker.md:327,377`) — `src/core/index.ts:1` via `./types.js`
- `QueueContext` (`guides/worker.md:113,208`) — imported from `@orkestrel/queue`, not this barrel
- `NodeThread` (`guides/worker.md:90,114`) — server types barrel
- `context.signal` (`guides/worker.md:19,453`) — not an export

**Gates.** Report § Gates quoted:

| Command | Exit code | Reading | File |
| ------- | --------- | ------- | ---- |
| `npm run format:check` | 0 | — | `gate-1-format-check.txt` |
| `npm run lint:check` | 0 | — | `gate-2-lint-check.txt` |
| `npm run check` | 0 | — | `gate-3-check.txt` |
| `npm run build` | 0 | — | `gate-4-build.txt` |
| `npm test` | 0 | `src:core`+`src:server` 111 passed (111); `policy` 111 passed (111); `config` 46 passed (46); `setup` 10 passed (10); `guides` 18 passed (18) | `gate-5-test.txt` |

Those files exist under `/home/user/work/evidence/worker-proofs/`. `gate-5-test.txt` `Tests` lines: `111 passed (111)` twice (`:21,:35`), `46 passed (46)` (`:49`), `10 passed (10)` (`:63`), `18 passed (18)` (`:79`). The files do not themselves print an exit code.

**Breaking.** Report § Breaking: `@orkestrel/worker/server` loses `spawnThread` and `dispatch`, gains `createThread` and `Dispatch`; `QueueExecution` → `QueueContext` on `WorkerHandler` / `ServeWorkerOptions`.

Word-boundary old names across `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/worker`, vendored `guides/worker.md` mirrors:

- `\bspawnThread\b`: no hit
- `\bdispatch\b` as a worker import (`import {…dispatch…}` / `from '@orkestrel/worker`): no hit outside worker
- `\bQueueExecution\b`: `/home/user/fleet/agent/src/core/helpers.ts:14,253`; `/home/user/fleet/agent/guides/queue.md:74`; `/home/user/fleet/workflow/guides/queue.md:74`; `/home/user/fleet/probe/guides/queue.md:74` (queue.md mirrors, not `guides/worker.md`)

**Writing sweep** over diff `+` lines in `guides/**`, `README.md`, `src/**` doc comments, `tests/**` titles/comments. Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b` case-insensitive:

- `now`: `tests/setupServer.test.ts` `+		// second destroy over the same (now removed) directory still settles without throwing.` (tree `:77`)
- `new` (constructor `new` in added fences/examples/comments): `guides/worker.md` `+const thread = await createThread(new URL('./double.ts', import.meta.url))`; `+const controller = new AbortController()`; `+	const job = new Dispatch(...)`; `src/server/Dispatch.ts` example `+ * const thread = await createThread(new URL('./double.js', import.meta.url))`; `+ * const controller = new AbortController()`; `+ * const job = new Dispatch(...)`; `src/server/factories.ts` `+ * const thread = await createThread(new URL('./double.js', import.meta.url))`; `+	return new Thread(script, workerData).promise`; `src/server/NodeWorker.ts` `+		return new Thread(...)` / `+		return new Dispatch(...)`; `tests/guides.test.ts` `+			const job = new Dispatch(...)`; `tests/setupServer.test.ts` `+		const thread = new ThreadWorker(buildFixtureURL(...))` (×2); `tests/setupServer.ts` `+	return new URL(\`tests/src/server/fixtures/${name}\`, resolveRoot(import.meta))`; `tests/src/server/factories.test.ts` `+			const reply = new ThreadReply(...)`; `+					throw new Error('listener-boom')`; `tests/src/server/helpers.test.ts` several `+			const pending = new Dispatch(` / `+			const controller = new AbortController()`
- `should` / `just` / `via` / `currently` / `latest` / `utilize` / `leverage` / `in order to` / `e.g.` / `i.e.` / `etc.` / `please` / `sanity` / `dummy` / `ensure` / `guarantee`: no hit on `+` lines

Count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` over those `+` lines: no hit.

## Distillate

- worker-obj-1: helpers.ts:5-6 no longer class imports (isReply-only file; createThread factories.ts:41; Dispatch barrel index.ts:5) | diff present yes | old form spawnThread 0; dispatch-token hits listed | report matches yes on factories.ts:41 and index.ts:5; report dispatch-grep-empty does not match tree
- worker-obj-2: tempDatabasePath now setupServer.ts:30-32 | diff present yes | cleanup() 0; cleanup-inflection hits remain | report matches content; cited :33 is the closing brace
- worker-obj-3: type import now setupServer.test.ts:1 not :8 | diff present yes | old form 0 | report matches yes
- worker-obj-6: evict now Dispatch.ts:166; remarks types.ts:41-45 / Dispatch.ts:35-37 / worker.md:213 | diff present yes | old wrapper gone | report cited types.ts:46-51 and worker.md:210 do not carry the remarks
- worker-obj-7: buildFixtureURL setupServer.ts:22-24; local fixture gone | diff present yes | `const fixture =` 0; "fixture" path hits remain | report cited :19-21 is comment not export
- worker-obj-8: waitForCondition helpers.test.ts:239,275,727 | diff present yes | waitForDelay in helpers.test.ts 0; waitForDelay(20) remains Worker.test.ts | report line numbers drifted
- worker-obj-9: transcription guides.test.ts:199-257 | diff present yes | old "no @src" form 0 | report cited :194-256 drifted to :199-257
- worker-obj-10: performance.now slow.ts:10,12 identify.ts:13,14 | diff present yes | Date.now in owned src/tests 0 | report matches yes
- worker-obj-11: Worker.test.ts:30 src/core/Worker.ts | diff present yes | core/workers/ 0 | report matches yes
- worker-subj-2: on/error types.ts:86-87; NodeWorker.ts:19-20,52-53 | diff present yes | omitted keys 0 | report cited types.ts:96-97 and worker.md:322-324 drifted
- worker-subj-6: Default: sentences core/types.ts:55-59; server/types.ts:68-73 | diff present yes | "defaults to" src one hit factories.ts:11 | report cited server/types.ts:80-85 drifted
- worker-subj-9: must/through/named fields present | diff present yes | should/just/via owned 0; once/now remain | report line numbers drifted
- worker-subj-10: intros present at tables/lists | diff present yes | named bare tables now introduced | report :441/:548 drifted
- worker-subj-11: reply-half types.ts:8-10; worker.md:115,204 | diff present yes | internal-wire 0 | report cited worker.md:114/:200 drifted
- worker-subj-13: fence worker.md:69-84 exercises imports | diff present yes | unused-isReply fence 0 | report matches yes
- worker-subj-14: present-tense sites worker.md:64-67,293-294,310 | diff present yes | remain/still hits remain | report :283/:306 drifted
- worker-subj-15: workerData licence types.ts:65-67; worker.md:323-324 | diff present yes | missing-licence via-form 0 | report cited types.ts:76-78 and worker.md:319-321 drifted
- fleet-F1: isBrowserVuePath absent | diff present no | old helper 0 | report noop matches
- fleet-F2: no public id-before-# class field | diff present no | shape 0 | report noop matches

Scope tags: 26 status paths owned; 0 shared; 0 off-limits. Unnamed-Where files: Worker.ts, NodeWorker.ts, factories.test.ts, abortable.ts, crash.ts, load-throw.ts, throw-async.ts.

Residue: no skip/only/todo/TODO/FIXME/debugger in owned src/tests; console.log Dispatch.ts:50 and added guide/example fences; retry/timeout hits listed above (option/event names).

Writing + hits: `now` setupServer.test.ts:77; many constructor `new` in added fences/examples; count-pattern + hits none.

Parity: WorkerInterface nine methods types.ts:95-118 ↔ worker.md:131-139; readonly five types.ts:90-94 ↔ worker.md:110; Dispatch promise Dispatch.ts:89 ↔ worker.md:99; NodeWorker build() NodeWorker.ts:43 not in Methods; added backticks createThread/Dispatch/isReply/Reply/createNodeWorker barrelled; on?/error?/QueueContext/context.signal not barrel exports.

## Unknowns

- Gate file **process exit codes** are not recorded inside `gate-*.txt`; only command banners and summaries were readable. Report table exit 0 was not independently observed as a process status.
- `obj8-control-green.txt` is the file the report names for both obj-6 restored and obj-8 restored; the file contains one `Tests  48 passed (48)` line, not two labelled runs.
- Fleet `\bdispatch\b` as English/correlation-id in non-worker packages was not exhaustively listed; the worker-import form was.
- Vendored `guides/*.md` mirrors other than `worker.md` were excluded from old-form owned sweeps and included for Breaking `QueueExecution` where they sit under `/home/user/fleet/*/guides`.
- `tests/src/server/helpers.test.ts` case-insensitive `dispatch` count omitted `Dispatch` identifier hits that the capitalised class name produces; field 3 lists exact-token and inflection hits separately.

## Journal

## Deviation

No tree change from this lane (read-only Read/Grep only). Every named input path was readable. Sweeps named in the brief were run over `src`, `tests`, `guides/worker.md`, `guides/README.md`, `README.md` excluding `node_modules`; fleet Breaking sweeps ran over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src`. Gate commands were not re-executed.
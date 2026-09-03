I'll read the brief and the scaffold contracts first, then follow the brief exactly in read-only mode.The brief is a per-row evidence map. I'll load the unit brief, audit brief, report, and evidence next.I’ll gather per-row sites, the evidence diff hunks, and the old-form sweeps in parallel.Next I’ll read the current sites and run the old-form sweeps the brief asks for.Checking a few remaining first `+` lines and the `e.g.` sites the substitution row named.# Question

For every row of unit conform-workflow, what does the tree at `/home/user/fleet/workflow` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

# Evidence

Law sentences cited (scaffold copies): `tests.md:55` “Every documented API exists, every public API is documented, and every executable fence returns what the guide says it returns”; `tests.md:70-72` “Transcribe each flagship fence and assert the values its comments claim.”; `documentation.md:37` “That proof has a home: `tests/guides.test.ts` executes the flagship fences, per `.claude/rules/tests.md`.”; `tests.md:13-14` “Mirror module/application structure: `tests/{src,app}/[environment]/[domain]/[module].test.ts`.”; `tests.md:43` “Do not create test files solely for `constants.ts`, barrels, error definitions, or `types.ts`.”; `tests.md:38` “Measure an elapsed interval with `performance.now()`, never `Date.now()`.”; `architecture.md:161-163` “Never declare or assign a function inside another function or method.”; `architecture.md:153` “Delete one-line delegates, pass-through factories, rename-only helpers/getters, compatibility aliases, and wrappers around semantically identical platform or declared-dependency primitives.”; `typescript.md:17` “Place `import type` declarations before value imports.”; `architecture.md:266-268` “Barrel that class when a consumer can construct it from values they already hold.”; `architecture.md:271-273` “A row obliges a documented, runnable example, so a class kept public without one is drift that parity cannot see.”; `architecture.md:183-186` “1. `#` private fields…”; `architecture.md:46` “An implementation file contains imports and exactly one class implementation with `#` fields.”; `AGENTS.md:171` “**NEVER name a list item by its position.**”; `writing.md:38` “Claim only what the reader can check.”; `writing.md:91` “`simply`, `easy`, `just` → Delete”; `AGENTS.md:171` “**NEVER state a count.**”; `documentation.md:35` “The TSDoc voice rule governs a doc block; a guide tagline and a Surface-row description are noun phrases.”; `documentation.md:24` “`guides/README.md` is the map: maintain both a concept index and a directory index.”; `documentation.md:36` “A vendored dependency guide is a mirror.”; `patterns.md:64` “An id list applies to those items and returns true only when all succeed.”; `AGENTS.md:51` “**ALWAYS** inspect the exact declared and installed `@orkestrel/*` capabilities…”; `patterns.md:74` “Add `readonly on?: EmitterHooks<{Entity}EventMap>` and `readonly error?: EmitterErrorHandler` to options.”; `AGENTS.md:62` “**No superfluous wrappers.**”; `AGENTS.md:60` “**One concept, one term.**”; `names.md:152` “Never pluralize type names.”; `typescript.md:74` “Every public export has complete TSDoc: description, `@param`, `@returns`, and `@example` where applicable.”

## workflow-obj-1

1. **Site now.** Brief `tests/guides.test.ts:1-181`. File now 338 lines. Opening still name-parity through `tests/guides.test.ts:82-198`. Flagship block now at `tests/guides.test.ts:207` `describe('flagship fences', () => {` with behaviour + presence pairs: `tests/guides.test.ts:241-242` `expect(result.status).toBe('completed')` / `phase('build')?.task('compile')?.status`; `:266` `store.count`; `:280` `contract.is`; `:308-309` `main.phases.count` / `target?.tasks.count`; `:318-322` derivation values; imports `@src/core` at `:5-20`. Context `:206-208`: transcription comment / `describe('flagship fences'` / `const guideText`.
2. **Diff at the site.** `tests/guides.test.ts` `@@ -2,7 +2,22 @@` (core imports), `@@ -43,7 +58,6 @@` (INTERNAL drop of RunHolder, shared with obj-6), `@@ -51,6 +65,9 @@`, `@@ -128,7 +145,7 @@` (`symbol.keyword`), `@@ -179,3 +196,143 @@`. Operative repair text present in `+` lines: `+describe('flagship fences', () => {`; `+		expect(result.status).toBe('completed')`; `+		expect(store.count).toBe(2)`; `+		expect(contract.is(releaseDefinition)).toBe(true)`; `+		expect(main.phases.count).toBe(2)`; `+		expect(isTerminalStatus('completed')).toBe(true)`; `+		expect(deriveBoundary(['completed', 'completed', 'pending', 'pending'])).toBe(2)`.
3. **Old form sweep.** No renamed symbol. Pattern `describe('flagship fences'` over `src`, `tests`, `guides/workflow.md`, `guides/README.md`, `README.md`: `tests/guides.test.ts:207`.
4. **Report reading.** Disposition `applied`. Sentence: “`tests/guides.test.ts` — appended `describe('flagship fences', …)` transcribing and executing the opening runner fence, the positional-collection fence, the contract fence, the append fence, and the derivation fence… Imports through `@src/core`, runs in the existing `guides` project; no project entry added.” Cited file carries that block at `:207-337`.
5. **Proof reading.** Behavioural. Report: `npm run test:guides` red `1 failed, 97 passed` — `obj-1-control-red.txt`; green `98 passed` — `obj-1-control-green.txt`. File `/home/user/work/evidence/workflow-proofs/obj-1-control-red.txt` Tests: `1 failed | 97 passed (98)`. File `obj-1-control-green.txt` Tests: `98 passed (98)`.

## workflow-obj-2

1. **Site now.** Brief `src/core/Collection.ts:44`. Now `src/core/Collection.ts:44` `export class Collection<` (context `:43` close of example fence / `:44` class / `:45` type params). Mirror file exists `tests/src/core/Collection.test.ts:1-253`; class imported `@src/core` at `:3`; `new Collection<TaskInterface, TaskUpdate>('task', compileGuard(taskUpdateShape))` at `:23`.
2. **Diff at the site.** `src/core/Collection.ts` hunks are citation-only (`@@ -4,7 +4,7 @@`, `@@ -14,7 +14,7 @@`, `@@ -49,7 +49,7 @@`) — no class-body repair. New file `tests/src/core/Collection.test.ts` `@@ -0,0 +1,253 @@`. Operative repair text present: `+import { Collection, createWorkflow, isWorkflowError, taskUpdateShape } from '@src/core'`; `+	return new Collection<TaskInterface, TaskUpdate>('task', compileGuard(taskUpdateShape))`; `+	it('throws a MUTATION WorkflowError naming the constructor noun on a duplicate id', () => {`.
3. **Old form sweep.** Absence of mirror. Pattern `Collection.test` over named paths: `tests/src/core/Collection.test.ts` (file). Pattern `\bCollection\b` in `tests`: hits include `tests/src/core/Collection.test.ts` (throughout) and `tests/guides.test.ts:11,258,271`.
4. **Report reading.** `applied`. “New `tests/src/core/Collection.test.ts` in `src:core` over a real `new Collection<TaskInterface, TaskUpdate>('task', compileGuard(taskUpdateShape))` … Imports the class through `@src/core`.” File exists and those lines are at `:3` and `:23`.
5. **Proof reading.** Behavioural. Report: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/Collection.test.ts` red `3 failed, 12 passed` — `obj-2-control-red.txt`; green `15 passed` — `obj-2-control-green.txt`. Control-red Tests: `3 failed | 12 passed (15)`. Control-green Tests: `15 passed (15)`.

## workflow-obj-3

1. **Site now.** Brief `tests/src/core/Scheduler.test.ts:78`. Now `:78` `const start = performance.now()` (context `:77` it-title close / `:78` start / `:79` blank). Matching `:82` `expect(performance.now() - start).toBeGreaterThanOrEqual(20)`. Same pair now at `tests/src/core/factories.test.ts:760,762`; `FrameScheduler.test.ts:89,91`; `BrowserScheduler.test.ts:112,114`; `IdleScheduler.test.ts:94,96`; `tests/src/browser/factories.test.ts:19,21` / `:56,58` / `:93,95`; `tests/src/server/factories.test.ts:17,20`.
2. **Diff at the site.** `tests/src/core/Scheduler.test.ts` `@@ -75,11 +75,11 @@`; plus matching `@@` in factories/browser/server files listed in the hunk index. `+			const start = performance.now()` and `+			expect(performance.now() - start).toBeGreaterThanOrEqual(20)` verbatim. Thresholds unchanged in `+` lines (`20` / `15`).
3. **Old form sweep.** Pattern `Date.now()` over `tests`: `tests/src/core/helpers.test.ts:1520` `const future = Date.now() + 60_000`; `tests/src/core/Workflow.test.ts:368` same; `tests/src/core/tasks/Task.test.ts:283` same; `tests/src/server/NodeScheduler.test.ts:69` comment `` `performance.now()` rather than `Date.now()` ``. No `const start = Date.now()` hit. Pattern `performance.now()`: the listed interval sites plus `tests/setup.test.ts:282,284` and `NodeScheduler.test.ts:69,77,81`.
4. **Report reading.** `applied`. “`performance.now()` replaces both readings of each interval pair in `tests/src/core/Scheduler.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/browser/{FrameScheduler,BrowserScheduler,IdleScheduler,factories}.test.ts`, `tests/src/server/factories.test.ts`. Thresholds unchanged.” Those files now carry `performance.now()` at the listed lines.
5. **Proof reading.** Report failing-first table has no obj-3 row. Observation names `mid-test-src.txt` red `expected 19.438079000000016 to be greater than or equal to 20` and `obj-3-scheduler-alone-1.txt` / `obj-3-test-src-rerun.txt`. Those files exist under `/home/user/work/evidence/workflow-proofs/`. Sweep in field 3 agrees with report sweep “only the three wall-clock stamps … plus the explanatory comment”.

## workflow-obj-4

1. **Site now.** Brief `tests/setup.ts:181-189` (`createGate` body). That helper is gone. `tests/setup.ts` now 486 lines. At `:169-182` `WorkflowStoreBoundary` fields/ctor take `PromiseWithResolvers`: `:170` `readonly #reads: Array<PromiseWithResolvers<WorkflowSnapshot | undefined>>`; `:177-178` ctor params `ReadonlyArray<PromiseWithResolvers<…>>`. Context `:168` class JSDoc close / `:169` class / `:170` `#reads`.
2. **Diff at the site.** `tests/setup.ts` `@@ -162,46 +162,20 @@` (deletes `TestGateInterface` / `createGate`, retypes boundary). Other hunks citation-only. `tests/setup.test.ts` `@@ -155,27 +148,6 @@` deletes `describe('createGate'`. Operative `+` text: `PromiseWithResolvers` on the boundary; no remaining `createGate` / `TestGateInterface` in `+` lines of those hunks. `tests/src/core/WorkflowRunner.test.ts` etc. replace call sites (hunks in those files).
3. **Old form sweep.** `\bcreateGate\b|\bTestGateInterface\b` over `src`, `tests`, `guides/workflow.md`, `guides/README.md`, `README.md`: no hit. Case-insensitive + `s|ed|ing` inflections: no hit.
4. **Report reading.** `applied`. “Deleted `TestGateInterface` and `createGate` from `tests/setup.ts`; every call site now reads `Promise.withResolvers<T>()` and every type reference `PromiseWithResolvers<T>` … Removed the `createGate` proof from `tests/setup.test.ts` with no replacement.” `tests/setup.test.ts` after `:149` is `describe('WorkflowStoreBoundary'` — no `createGate` describe. Report does not cite `:181-189` as current.
5. **Proof reading.** Naming/placement. Report sweep names the symbols in the combined old-name pattern as empty over `src`/`tests`/guides. Field 3 agrees (no hit).

## workflow-obj-5

1. **Site now.** Brief `src/browser/IdleScheduler.ts:3-4`. Now `:1-5` type-first: `:1` `import type { SchedulerInterface, SchedulerOptions } from '@src/core'`; `:2` `import type { AnyFunction } from '@orkestrel/contract'`; `:3` `import type { IdleInterface } from './types.js'`; `:4` `import { delayHost, scheduleHost } from '@src/core'`; `:5` `import { isFunction } from '@orkestrel/contract'`. Seven test files now start with `import type` before value imports (`Workflow.test.ts:1-7`, `WorkflowManager.test.ts:1-8`, `Runner.test.ts:1`, `factories.test.ts:1-7`, `WorkflowRunner.test.ts:1-15`, `Task.test.ts:1-7`, `Phase.test.ts:1-7`).
2. **Diff at the site.** `src/browser/IdleScheduler.ts` `@@ -1,7 +1,7 @@` — `+` reorders type imports above `delayHost`. Matching import-order hunks in the seven test files (`Workflow.test.ts @@ -5,6 +5,7 @@` / `@@ -14,7 +15,6 @@`; `WorkflowManager.test.ts @@ -1,12 +1,12 @@`; `Runner.test.ts @@ -1,9 +1,9 @@`; etc.).
3. **Old form sweep.** Not a rename. Multiline value-then-type inversion: not re-run as a single regex here; the seven files plus IdleScheduler now show type imports first on the first lines read.
4. **Report reading.** `applied`. “`src/browser/IdleScheduler.ts` and the seven named test files now place every `import type` ahead of the first value import, with no blank line between consecutive same-kind imports.” IdleScheduler `:1-5` matches that order.
5. **Proof reading.** Placement. Report: “`^import \{…\} from …` followed by `^import type` (multiline) `src/**`, `tests/**` empty”. Field 3 did not re-execute that multiline regex (see Unknowns). Sites read match the claimed order.

## workflow-obj-6

1. **Site now.** Brief `src/core/RunHolder.ts:19` class. Still `src/core/RunHolder.ts:19` `export class RunHolder implements RunHolderInterface {` (context `:18` remarks close / `:19` class / `:20` `#runner`). `@example` import now `:32-33` `import type { TaskInterface } from '@orkestrel/workflow'` / `import { createRunner, RunHolder } from '@orkestrel/workflow'`. Barrel `src/core/index.ts:20` `export * from './RunHolder.js'`. `INTERNAL` at `tests/guides.test.ts:58-63` has Controller, Phase, Task, TaskController — no `'class RunHolder'`. Guide class table `guides/workflow.md:125` `` `RunHolder` ``. `tests/src/core/RunHolder.test.ts:3` `import { createRunner, RunHolder } from '@src/core'`.
2. **Diff at the site.** `src/core/RunHolder.ts` `@@ -30,8 +30,7 @@` folds example import to `@orkestrel/workflow`. `src/core/index.ts` `@@ -17,3 +17,4 @@` first `+` `export * from './RunHolder.js'`. `tests/guides.test.ts` `@@ -43,7 +58,6 @@` removes `'class RunHolder'`. `guides/workflow.md` `@@ -113,15 +113,16 @@` adds class row. Operative text present: `+import { createRunner, RunHolder } from '@orkestrel/workflow'`; `+export * from './RunHolder.js'`.
3. **Old form sweep.** `\bclass RunHolder\b` over named paths: `src/core/RunHolder.ts:19` (declaration). `'class RunHolder'` INTERNAL string: no hit. `from './RunHolder.js'` in `@example`: no hit (`src/core/index.ts:20` and `WorkflowRunner.ts:35` are implementation imports, not the example).
4. **Report reading.** `applied`. Cites `src/core/RunHolder.ts:33` folded import — tree has the folded import at `:33`. Cites `guides/workflow.md:125` RunHolder row — present. Cites INTERNAL removal — present.
5. **Proof reading.** Placement. Report names `obj-6-guides.txt`. File exists under workflow-proofs. Old-form INTERNAL string gone (field 3).

## workflow-obj-7

1. **Site now.** Brief `src/core/WorkflowPersistence.ts:13-20`. Now class TSDoc `:13-30` including `@example` `:20-29` with `import { WorkflowPersistence, createMemoryWorkflowStore, createWorkflow } from '@orkestrel/workflow'` and `new WorkflowPersistence(workflow, createMemoryWorkflowStore())`. Class at `:31`. `src/core/Workflow.ts:83-96` `@example` with `import { definitionToSnapshot, Workflow } from '@orkestrel/workflow'` and `const workflow = new Workflow(definitionToSnapshot(definition))`.
2. **Diff at the site.** `src/core/WorkflowPersistence.ts` `@@ -16,6 +16,17 @@` inserts `@example`. `src/core/Workflow.ts` `@@ -74,12 +73,27 @@` inserts constructor `@example`. First Persistence `+` ` * @example`. Verbatim guide-fence transcription present in `+` lines (`createMemoryWorkflowStore`, `checkpoint('initial')`, `finalize()`, `detach()`). Workflow `+` ` * import { definitionToSnapshot, Workflow } from '@orkestrel/workflow'` and ` * const workflow = new Workflow(definitionToSnapshot(definition))` — operative form, not finder’s `createWorkflow`.
3. **Old form sweep.** No removed name. Pattern `@example` in those two files: Persistence `:20`; Workflow `:83`.
4. **Report reading.** `applied`. “`WorkflowPersistence` takes the existing guide fence transcribed verbatim as its class `@example`; `Workflow` takes an `@example` exercising the published constructor — `new Workflow(definitionToSnapshot(definition))` then reads of `status`, `phase('build')?.task('compile')?.status`, and `snapshot().id`.” Persistence example matches guide fence `guides/workflow.md:553-560`. Workflow example at `:92-95` matches the report’s third read as `snapshot().id`.
5. **Proof reading.** Documentation. Report names `obj-7-guides.txt`. File exists.

## workflow-obj-11

1. **Site now.** Brief `src/core/Controller.ts:32-38` public fields before `#`. Now `:31-39` all `#` fields first: `:32` `readonly #id: string` through `:39` `#spawn`; getters `:55-69` (`get id` / `get input` / `get signal` above `get aborted`); `wait()` `:74` `parkSignal(this.#signal)`. `TaskController.ts:36-47` `#signal` / `#input` / `#task` / `#attempt` before other `#` fields; getters `:68-82`; ctor `:60` `this.#task = task.context`.
2. **Diff at the site.** `src/core/Controller.ts` `@@ -29,9 +29,10 @@`, `@@ -44,13 +45,25 @@`, `@@ -58,7 +71,7 @@`. `src/core/tasks/TaskController.ts` `@@ -34,10 +34,11 @@`, `@@ -54,18 +55,34 @@`, `@@ -86,7 +103,7 @@`, `@@ -107,11 +124,11 @@`, `@@ -120,7 +137,7 @@`. Operative `+` text includes `readonly #id: string`, `get id(): string`, `parkSignal(this.#signal)`, `this.#task = task.context`, `this.#signal`.
3. **Old form sweep.** Public instance `readonly id: string` on the class: no hit in Controller/TaskController (interface still `types.ts:2249` `readonly id: string`). Pattern `this.signal` internal reads in TaskController: getters only; body uses `this.#signal`.
4. **Report reading.** `applied`. Describes the conversion; tree matches. Report cites no stale Controller line numbers as current.
5. **Proof reading.** Placement. Report names `obj-11-controllers.txt` and a `JSON.stringify` read: hits serialize snapshots/schemas, not Controller instances (field 3 `JSON.stringify` in tests: snapshots, contract rows, entry keys — no Controller/TaskController instance). Report: fleet-F2 “every hit serializes a snapshot or a contract schema, none a Controller or TaskController instance”.

## workflow-subj-1

1. **Site now.** Brief `src/core/types.ts:12`. Now `:13` `the source of truth (AGENTS.md § Authority and loading).` (context `:12` lockstep sentence / `:13` AGENTS named section / `:14` blank). Numbered `§[0-9]` gone from `src/` and `tests/`. Remaining named-section `§` in owned guides: `guides/workflow.md:1462` `§ Design laws` / `§ Fixed lifecycle vocabulary` / `§ Errors and outcomes` / `§ Parity`; `guides/README.md:89` `§ Parity`.
2. **Diff at the site.** `src/core/types.ts` `@@ -10,7 +10,7 @@` and many later hunks delete/repoint `§`. Same across listed src/tests/guide files. `+` examples: `+ * the source of truth (AGENTS.md § Authority and loading).`; IdleScheduler `+ *   \`as\`. Where the API is absent (Safari today), it **falls back** to a`; shapers `+ * are not patchable fields).`.
3. **Old form sweep.** Pattern `§[0-9]` over `src`, `tests`: no hit. Over `guides/workflow.md`, `guides/README.md`, `README.md`: no hit. Pattern `§` over those three: `guides/workflow.md:1462`; `guides/README.md:89`. Whole-checkout `§[0-9]` minus node_modules: vendored `guides/{timeout,queue,contract,guide,database,emitter,budget}.md` (and siblings) still numbered — report also records those as untouched mirrors.
4. **Report reading.** `applied`. “Every `§` citation deleted or re-pointed across `src/**`, `tests/**`, `guides/workflow.md`, `guides/README.md`.” Table sweep `§[0-9]` src/tests empty — agrees. Report `§` over the three guide/README files empty — tree still has named `§ Design laws` / `§ Parity` (not digits). Report line “only `guides/{budget,queue,timeout,abort,contract}.md`” — digit hits also exist in `guides/guide.md`, `guides/database.md`, `guides/emitter.md` (and the named set).
5. **Proof reading.** Documentation. Report sweep vs field 3: digit pattern empty in owned src/tests/workflow.md/README.md/guides/README.md agrees. Named `§` remains in workflow.md:1462 and guides/README.md:89.

## workflow-subj-2

1. **Site now.** Brief `guides/workflow.md:61`. Now `:61` “Why this is safe…” — no `simply`. `README.md:37-38` “The proposed integration architecture lives with the package that implements it”. Permitted `just before the next paint` at `guides/workflow.md:154`, `src/browser/FrameScheduler.ts:6,:35`, `src/browser/factories.ts:37`. `Date.now()` at `guides/workflow.md:330,:1025,:1026`.
2. **Diff at the site.** `guides/workflow.md` many hunks (`@@ -58,27 +58,27 @@` onward). `README.md` `@@ -34,12 +34,12 @@` first `+` `shipped contract. The proposed integration architecture lives with the`. `src/core/types.ts` hunks drop `currently`. Evidence diff `+` at `conform-workflow.diff:671` still quotes `Subscribe via \`runner.emitter.on(...)\``; tree now `guides/workflow.md:1376` `Subscribe through \`runner.emitter.on(...)\``.
3. **Old form sweep.** `\bsimply\b|\bvia\b|\bcurrently\b|\be\.g\.\b` over `guides/workflow.md`, `guides/README.md`, `README.md`: no hit. Over `src`: no `simply`/`via`/`currently`; `e.g.` hits `src/core/types.ts:306,:834,:959,:1920,:2337`; `src/core/phases/Phase.ts:46`; `src/core/tasks/Task.ts:45`; `src/core/WorkflowRunner.ts:462`. `\bshould\b` in `guides/workflow.md`: no hit. `\bjust\b` in `guides/workflow.md`: `:154` permitted temporal. `\bnow\b` in `guides/workflow.md`: `:330,:1025,:1026` are `Date.now()`.
4. **Report reading.** `applied`. “Substitution table applied across `guides/workflow.md` and `README.md`, plus the `currently` in `src/core/types.ts`.” README `:37` matches. Report Fix-round `now` sweep lists `Date.now()` / local `now` — agrees with tree. Report does not cite `e.g.` remaining in `types.ts:306` et al.
5. **Proof reading.** Documentation. Field 3 vs report: `currently`/`simply`/`via` empty in `src` agrees if `e.g.` is a separate pattern; `e.g.` is not empty in `src`.

## workflow-subj-3

1. **Site now.** Brief `guides/workflow.md:5`. Now `:5` `Read the module as layers of one substrate, top to bottom:` (context `:3` tagline / `:5` layers / `:7` The tree describes). `README.md:42` `Published as environment-scoped entry points:`. Helpers push surface `guides/workflow.md:395` `The task's push surface — \`start\` · … · \`silence\`.` without “ten-event”.
2. **Diff at the site.** `guides/workflow.md` `@@ -1,11 +1,11 @@` `+Read the module as layers of one substrate, top to bottom:`; `README.md` `@@ -34,12 +34,12 @@` `+Published as environment-scoped entry points:`.
3. **Old form sweep.** `five layers|80% use case|All three feature|Four values|Two dependency|ten-event|three environment`: no hit in the package. Report’s numeral-count regex: not re-run in full here (see Unknowns); those seven phrases are gone.
4. **Report reading.** `applied`. “Counts deleted and the named members left to carry each sentence.” `:5` and `README.md:42` carry the repaired wording.
5. **Proof reading.** Documentation. Field 3 agrees the listed count-phrases are gone.

## workflow-subj-4

1. **Site now.** Brief `guides/workflow.md:67`. Now `:67` `The compiled workflow-definition \`ContractInterface\` …`; `:68` `The live \`WorkflowInterface\` entity tree…`; `:72` `The in-memory default \`WorkflowStoreInterface\`…`; Errors `:205` `The narrower from an unknown caught value to a \`WorkflowError\``; Helpers `:222` `The deep-own and semantic validation pass…`; `:224` `The semantic pass…`; `:225` `The narrower to the shared lifecycle vocabulary.`; `:230` `The locator of the nearest identifiable phase or task…`.
2. **Diff at the site.** `guides/workflow.md` `@@ -58,27 +58,27 @@` and later Surface hunks rewrite imperatives to noun phrases. `+` includes `The compiled workflow-definition`.
3. **Old form sweep.** Lead-in verbs `Compile the|Build the|Create the|Narrow an unknown`: no hit in `guides/workflow.md` Surface rows read. Methods tables remain imperative (`Look up`, `FORCE`, …) at e.g. `:441-448`.
4. **Report reading.** `applied`. “Every imperative Surface-row description rewritten as a noun phrase across the Factories, Environment-backend, Errors, and Helpers-and-guards tables. `## Methods` tables untouched.” Factories/Errors/Helpers rows read as noun phrases; Methods still verb-led.
5. **Proof reading.** Documentation. Field 3 agrees on the listed Surface rows.

## workflow-subj-5

1. **Site now.** Brief `guides/README.md:19`. Now `:19` `## Dependency reference`. Paragraphs include `queue.md` `:56-61`, `test.md` `:70-74`, `scaffold.md` `:76-80`, `probe.md` `:82-85`. Concept/directory indexes `:5-17` unchanged (workflow only).
2. **Diff at the site.** `guides/README.md` `@@ -1,6 +1,6 @@` (citation), `@@ -53,6 +53,13 @@` (`queue.md`), `@@ -60,6 +67,23 @@` (`test.md`/`scaffold.md`/`probe.md`). First `+` of the queue hunk: `` [`queue.md`](queue.md) is a byte-identical mirror of the guide for ``.
3. **Old form sweep.** Unnamed-mirror names as files: `guides/queue.md`, `guides/test.md`, `guides/scaffold.md`, `guides/probe.md` exist and are now named in `guides/README.md:56,:70,:76,:82`.
4. **Report reading.** `applied`. “`guides/README.md` § Dependency reference gains a paragraph for `queue.md`, `test.md`, `scaffold.md`, and `probe.md`… The mirrored files themselves untouched; neither index changed.” Indexes `:5-17` still only workflow.md. Paragraphs present.
5. **Proof reading.** Documentation. Field 3 agrees the four mirrors are named.

## workflow-subj-6

1. **Site now.** Brief `src/core/WorkflowManager.ts:143-156`. Now `:143-160` `remove` with `:149` `let removed = true`; `:153` `if (!this.#workflows.delete(id)) removed = false`; `#invalidate` / `#additions.delete` still unconditional `:151-152`. Guide `guides/workflow.md:574` `` `true` only when every id was removed, so an empty list reports `true` vacuously. `` TSDoc `src/core/types.ts:2146` `@returns True if every id was removed; false if any id was not registered` and `:2143` empty-list vacuous true. Tests `tests/src/core/WorkflowManager.test.ts:94-115`.
2. **Diff at the site.** `src/core/WorkflowManager.ts` `@@ -137,16 +137,20 @@`. `+			let removed = true`. `tests/src/core/WorkflowManager.test.ts` `@@ -96,17 +91,29 @@`. Guide `@@ -571,27 +562,27 @@`. types `@@ -2173,7 +2134,24 @@`.
3. **Old form sweep.** `true when any was removed`: no hit. `let removed = false` in WorkflowManager.remove: no hit.
4. **Report reading.** `applied`. “`src/core/WorkflowManager.ts` inverts the accumulator…” Tree `:149-153` matches. Report cites tests `:99-108` as the old site; current cases are `:94` and `:109`.
5. **Proof reading.** Behavioural. Report: same vitest command, red `2 failed, 47 passed` — `subj-6-control-red.txt`; green `49 passed` — `subj-6-control-green.txt`. Control-red Tests: `2 failed | 47 passed (49)`. Control-green Tests: `49 passed (49)`. Red titles include `remove(ids[]) drops a batch and reports true only when every id was removed` and `remove([]) reports true vacuously`.

## workflow-subj-8

1. **Site now.** Brief `src/core/types.ts:760-766` aliases. Those alias declarations are gone. Inline now `src/core/types.ts:739` `readonly on?: EmitterHooks<TaskEventMap>`; `:759` `EmitterHooks<PhaseEventMap>`; `:779` `EmitterHooks<WorkflowEventMap>`. No Surface rows for the three hook aliases in `guides/workflow.md:396-398` (TaskOptions/PhaseOptions/WorkflowOptions only).
2. **Diff at the site.** `src/core/types.ts` `@@ -754,25 +721,14 @@` / `@@ -780,8 +736,8 @@` delete aliases, write `EmitterHooks<…>` inline. Guide `@@ -394,12 +390,9 @@` drops Surface rows.
3. **Old form sweep.** `\bWorkflowHooks\b|\bPhaseHooks\b|\bTaskHooks\b` over named package paths: no hit. Case-insensitive inflections: no hit. Fleet (excluding workflow src/tests as required under Breaking): `toolbox/guides/workflow.md:365-367`; `agent/guides/workflow.md:365-367`.
4. **Report reading.** `applied`. “`WorkflowHooks` / `PhaseHooks` / `TaskHooks` deleted from `src/core/types.ts`; `EmitterHooks<…>` written inline at their three option positions; Surface rows deleted.” Tree matches at `:739,:759,:779`.
5. **Proof reading.** Naming. Report combined old-name sweep empty on package paths — field 3 agrees inside workflow. Breaking mirrors still carry the names.

## workflow-subj-9

1. **Site now.** Brief `src/core/constants.ts:46 and :55`. File now has `LIFECYCLE_STATUSES` `:21` and `TERMINAL_STATUSES` `:38`; no `PHASE_STATUSES` / `WORKFLOW_STATUSES` / `TASK_STATUSES` / `TERMINAL_TASK_STATUSES`. Guide Constants `guides/workflow.md:353-354` those two names.
2. **Diff at the site.** `src/core/constants.ts` `@@ -1,32 +1,24 @@`, `@@ -36,33 +28,14 @@`, `@@ -70,7 +43,7 @@`, `@@ -82,14 +55,15 @@`. `+export const LIFECYCLE_STATUSES: readonly LifecycleStatus[] = Object.freeze([` and `+export const TERMINAL_STATUSES`. Deletion of `PHASE_STATUSES` / `WORKFLOW_STATUSES` in the `@@ -36,33 +28,14 @@` hunk. `src/core/helpers.ts` `+	return TERMINAL_STATUSES.includes(status)` at evidence `conform-workflow.diff:1776`.
3. **Old form sweep.** `\bPHASE_STATUSES\b|\bWORKFLOW_STATUSES\b|\bTASK_STATUSES\b|\bTERMINAL_TASK_STATUSES\b` over named package paths: no hit. Fleet mirrors: `toolbox/guides/workflow.md:320-323`; `agent/guides/workflow.md:320-323`.
4. **Report reading.** `applied` with subj-10. “`PHASE_STATUSES` and `WORKFLOW_STATUSES` deleted; `TASK_STATUSES` → `LIFECYCLE_STATUSES`, `TERMINAL_TASK_STATUSES` → `TERMINAL_STATUSES`…” Tree matches `constants.ts:21,:38` and guide `:353-354`.
5. **Proof reading.** Naming. Field 3 agrees empty inside the package.

## workflow-subj-10

1. **Site now.** Brief `src/core/types.ts:369,:381,:393` aliases. Those declarations are gone. `LifecycleStatus` at `:354`. `PhaseDerivation.status` `:371` `readonly status: LifecycleStatus`. No Surface rows `TaskStatus`/`PhaseStatus`/`WorkflowStatus` in `guides/workflow.md:383` (`LifecycleStatus` only).
2. **Diff at the site.** `src/core/types.ts` `@@ -341,63 +341,25 @@` deletes the three aliases; `@@ -405,7 +367,8 @@` and later retype members. Guide `@@ -381,10 +380,7 @@` folds Surface rows.
3. **Old form sweep.** `\bTaskStatus\b|\bPhaseStatus\b|\bWorkflowStatus\b` over named package paths: no hit. Case-insensitive inflections: no hit. Fleet: `toolbox/src/core/types.ts:9,125-126`; `toolbox/tests/src/core/helpers.test.ts:5,152`; `toolbox/guides/workflow.md:208-211,350-352,599`; `agent/guides/workflow.md` same Surface/prose lines; `mcp/tests/setupConformance.ts:501-527` (A2A `TaskStatus` schema paths, different type).
4. **Report reading.** `applied`. “`TaskStatus` / `PhaseStatus` / `WorkflowStatus` deleted… every member, parameter, and return retyped `LifecycleStatus`.” `types.ts:354,:371` and guide `:383` match. Report cites toolbox import — still `WorkflowStatus` at toolbox `types.ts:9`.
5. **Proof reading.** Naming. Package sweep empty (field 3). Report “only `derivePhaseStatus` / `deriveWorkflowStatus`” for a looser pattern — word-boundary `\bPhaseStatus\b` does not hit those helper names.

## workflow-subj-11

1. **Site now.** Brief `src/core/types.ts:1677` `WorkflowFunctions`. Now `src/core/types.ts:1637` `export type WorkflowRegistry = Readonly<Record<string, WorkflowFunction>>` (context `:1636` close / `:1637` type / `:1639` TaskController TSDoc). `functions` option key remains `types.ts:805` `readonly functions?: WorkflowRegistry`. Guide `:407` `` `WorkflowRegistry` ``.
2. **Diff at the site.** `src/core/types.ts` `@@ -1674,7 +1634,7 @@` and use-site hunks. `+export type WorkflowRegistry`. Guide Surface rename hunk `@@ -411,7 +404,7 @@`.
3. **Old form sweep.** `\bWorkflowFunctions\b` over named package paths: no hit. Fleet: `toolbox/src/core/types.ts:7,167,186`; `toolbox/src/core/factories.ts:8,320,325`; `toolbox/tests/src/core/factories.test.ts:6,600`; `toolbox/guides/toolbox.md:21`; `toolbox/guides/workflow.md:377`; `agent/guides/workflow.md:377`.
4. **Report reading.** `applied`. “`WorkflowFunctions` → `WorkflowRegistry` at its declaration and every reference in `src/core/{types,helpers,Workflow,factories,WorkflowManager}.ts`, `src/core/phases/Phase.ts`, four test files, and the guide Surface row. The `functions` option key unchanged.” Declaration at `:1637`; `functions` key at `:805`.
5. **Proof reading.** Naming. Field 3 agrees empty inside the package.

## workflow-subj-12

1. **Site now.** Brief `src/core/helpers.ts:907` one-line block. Now `:903-914` complete block: first sentence `:904`; `@remarks` `:906-909`; `@param value` `:911`; `@returns` prose `:912-913` “The nearest identifying record naming the offending `phase` and `task`, or `undefined` when no inconsistent node is identifiable”; function `:915`.
2. **Diff at the site.** `src/core/helpers.ts` `@@ -904,7 +900,18 @@`. `+ * @param value - The candidate snapshot, which may be any unknown value`; `+ * @returns The nearest identifying record naming the offending \`phase\` and \`task\`, or \`undefined\``.
3. **Old form sweep.** The old single-line “Locates the nearest identifiable node…” still the first sentence at `:904`. No removed symbol.
4. **Report reading.** `applied`. “`scanSnapshotContext` in `src/core/helpers.ts` takes a complete block…” Tree `:903-914` matches the operative `@returns` prose (not nested backticks).
5. **Proof reading.** Documentation. Report records the TSDoc repair; field 3 has no old-name residue.

## workflow-subj-13

1. **Site now.** Brief `src/core/helpers.ts:869-878`. Now `:861-874` with `@param functions` `:871-872` and `@remarks` `:867-868` “`functions` belongs to the snapshot overload alone”; type `WorkflowRegistry` on overloads `:878,:882`.
2. **Diff at the site.** `src/core/helpers.ts` `@@ -872,18 +864,22 @@`. `+ * @param functions - The behavior registry the snapshot overload resolves each unique \`behavior\``.
3. **Old form sweep.** Missing `@param functions`: now present. No removed name.
4. **Report reading.** `applied`. “`hasWorkflowHandlers` gains `@param functions` … Written as `WorkflowRegistry`, since workflow-subj-11 landed first.” Tree `:871-872,:878` matches.
5. **Proof reading.** Documentation.

## workflow-subj-14

1. **Site now.** Brief `src/core/Runner.ts:408` (`#settle` boxing). Now `:400-403` `if (outcome.success) { this.#values.set(id, outcome) }`. `#values` `:83` `readonly #values = new Map<string, Success<TResult>>()`; `#failure` `:100` `Failure<unknown> | undefined`; `#cleanup` `:441` `Promise<Failure<unknown> | undefined>`; `cleanupFailure` `:462` `Failure<unknown> | undefined`; failures via `failure(` `:220,:411,:448,:466`. `RunnerValue` / `RunnerFailure` absent from `types.ts` (RunnerInterface begins `:2391`). Guide Surface `:426-429` has RunnerEntryOptions / RunnerInterface / RunnerEventMap / RunnerUnit — no RunnerValue/RunnerFailure rows. Imports `src/core/Runner.ts:2` `import type { Failure, Result, Success } from '@orkestrel/contract'`.
2. **Diff at the site.** `src/core/Runner.ts` `@@ -84,9 +77,10 @@` (`Success` map), `@@ -405,7 +399,7 @@` (`this.#values.set(id, outcome)`), `@@ -414,7 +408,7 @@` (`failure(outcome.error)`), `@@ -444,14 +438,14 @@`, `@@ -465,11 +459,11 @@`. `src/core/types.ts` `@@ -2388,35 +2367,6 @@` deletes the two interfaces. Guide `@@ -430,16 +423,14 @@` drops Surface rows.
3. **Old form sweep.** `\bRunnerValue\b|\bRunnerFailure\b` over named package paths: no hit. Fleet src/tests/scaffold/src: no hit. Guide mirrors: toolbox/agent `guides/workflow.md` still have the old Surface pair in the vendored copy (same file as other old names).
4. **Report reading.** `applied`. “`src/core/Runner.ts` types `#values` as `Map<string, Success<TResult>>` …” Tree `:83,:402,:100,:441` matches. `.value` / `.error` reads remain `:432,:471`.
5. **Proof reading.** Naming + behavioural typing. Report old-name sweep empty — field 3 agrees inside the package.

## fleet-F1

1. **Site now.** Brief: `tests/setup.ts` `isBrowserVuePath` where no browser env. Browser env present: `src/browser/BrowserScheduler.ts`, `FrameScheduler.ts`, `IdleScheduler.ts`, `constants.ts`, `factories.ts`, `index.ts`, `types.ts`; `tests/setupBrowser.ts` exists. Helper remains `tests/setup.ts:482` `export function isBrowserVuePath(path: string): boolean {` (context `:481` blank / `:482` export / `:483` normalize). `tests/setup.test.ts:363` `describe('isBrowserVuePath'`. Report cited `:508` — file is 486 lines; `:508` does not exist.
2. **Diff at the site.** No hunk deletes `isBrowserVuePath`. `tests/setup.ts` hunks are obj-4/subj-1 only.
3. **Old form sweep.** N/A (noop keep). Pattern `isBrowserVuePath`: `tests/setup.ts:482`; `tests/setup.test.ts:16,363,365-372`.
4. **Report reading.** `noop`. “This workspace has a browser environment… `isBrowserVuePath` remains at `tests/setup.ts:508`”. Helper exists at `:482`, not `:508`. Browser paths named in the report exist.
5. **Proof reading.** Placement. Report’s path-read of `src/browser/` and `tests/setupBrowser.ts` agrees. Cited line `:508` does not match the tree.

## fleet-F2

1. **Site now.** Brief: public `readonly id: string` ahead of `#` fields. Controller now `#id` first (`Controller.ts:32`) with `get id()` `:55`. TaskController has no `id` field. `errors.ts` still has Error-subclass fields (not `id`). Interface `ControllerInterface.readonly id` unchanged `types.ts:2249`.
2. **Diff at the site.** Same Controller/TaskController hunks as obj-11. No additional class converted.
3. **Old form sweep.** Implementation-class `readonly id: string` data field: no hit in `src/**/*.ts` class bodies read (interfaces in `types.ts` still declare `readonly id`). `JSON.stringify` hits as under obj-11 — no controller instance.
4. **Report reading.** `applied by workflow-obj-11`. “`Controller` was the only class carrying the shape… workflow-obj-11 performed exactly the prescribed conversion.” Controller tree matches. Report sweep “module-indent `readonly` across `src` returns only `types.ts` / `browser/types.ts` interface members and `errors.ts:22-23`” — `errors.ts:1-15` header read; Error subclass fields still present later in that file (report names `:22-23`).
5. **Proof reading.** Placement. Folds into obj-11; field 3 agrees Controller no longer has the public data field.

## Across the unit

### Scope

Evidence status paths, tagged against brief § Scope:

| Path | Tag |
| --- | --- |
| `README.md` | owned |
| `guides/README.md` | owned |
| `guides/workflow.md` | owned |
| `src/browser/BrowserScheduler.ts` | owned |
| `src/browser/IdleScheduler.ts` | owned |
| `src/browser/types.ts` | owned |
| `src/core/Collection.ts` | owned |
| `src/core/Controller.ts` | owned |
| `src/core/RunHolder.ts` | owned |
| `src/core/Runner.ts` | owned |
| `src/core/Workflow.ts` | owned |
| `src/core/WorkflowManager.ts` | owned |
| `src/core/WorkflowPersistence.ts` | owned |
| `src/core/WorkflowRunner.ts` | owned |
| `src/core/constants.ts` | owned |
| `src/core/errors.ts` | owned |
| `src/core/factories.ts` | owned |
| `src/core/helpers.ts` | owned |
| `src/core/index.ts` | owned |
| `src/core/phases/Phase.ts` | owned |
| `src/core/phases/PhaseManager.ts` | owned |
| `src/core/shapers.ts` | owned |
| `src/core/stores/DatabaseWorkflowStore.ts` | owned |
| `src/core/stores/MemoryWorkflowStore.ts` | owned |
| `src/core/tasks/Task.ts` | owned |
| `src/core/tasks/TaskController.ts` | owned |
| `src/core/tasks/TaskManager.ts` | owned |
| `src/core/types.ts` | owned |
| `src/core/validators.ts` | owned |
| `tests/guides.test.ts` | owned |
| `tests/setup.test.ts` | owned |
| `tests/setup.ts` | owned |
| `tests/setupBrowser.ts` | owned |
| `tests/setupServer.ts` | owned |
| `tests/src/browser/*.test.ts` | owned |
| `tests/src/core/**` including `Collection.test.ts` | owned |
| `tests/src/server/factories.test.ts` | owned |

No evidence-status path is shared or off-limits. Report “58 files… `git status --short` lists only files under Owned” — the evidence status list is 57 `M` + 1 `A` = 58, all under Owned.

Hunks whose **Where** field (strict, not Repair) does not name the file. subj-1 Where includes “every § site listed in the repair”, which names `src/core/{Workflow,Runner,factories,helpers,constants,shapers,errors,Collection,WorkflowRunner}.ts`, `src/core/{tasks/Task,tasks/TaskManager,phases/Phase,phases/PhaseManager,stores/MemoryWorkflowStore,stores/DatabaseWorkflowStore}.ts`, `src/browser/{types,BrowserScheduler,IdleScheduler}.ts`, `tests/{setup,setupServer,setupBrowser}.ts`, `tests/src/**/*.test.ts`, `guides/workflow.md`, `guides/README.md`. Files in the evidence diff outside that Where union:

- `README.md @@ -34,12 +34,12 @@` first `+` `shipped contract. The proposed integration architecture lives with the`
- `src/core/index.ts @@ -17,3 +17,4 @@` first `+` `export * from './RunHolder.js'`
- `src/core/tasks/TaskController.ts @@ -34,10 +34,11 @@` first `+` (field conversion; see obj-11)
- `src/core/tasks/TaskController.ts @@ -54,18 +55,34 @@`
- `src/core/tasks/TaskController.ts @@ -86,7 +103,7 @@`
- `src/core/tasks/TaskController.ts @@ -107,11 +124,11 @@`
- `src/core/tasks/TaskController.ts @@ -120,7 +137,7 @@`
- `tests/setup.test.ts @@ -2,19 +2,12 @@`
- `tests/setup.test.ts @@ -155,27 +148,6 @@`
- `tests/setup.test.ts @@ -191,9 +163,9 @@`

(Those four files are named in Repair of obj-6 / obj-11 / obj-4 / subj-2–3, not in Where.)

Session-start `git status` also listed `src/core/cloners.ts` and `tests/distribution.test.ts`, which the evidence status file does not.

### Residue

Diff `+` lines, pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` (quoted from evidence diff):

- `conform-workflow.diff:38` `backpressure, retries, and the per-attempt timeout.`
- `:79` `concurrency / retry / abort machinery`
- `:127` `remaining retry budget`
- `:250` `retries` / `timeout` / `QueueError`
- `:352` `isSkipping` / `timed out` / `deadline retryable`
- `:408-409` EventMap `skip()`
- `:428` `{ retries?, timeout? }`
- `:513` `newer retry owns the task`
- `:550` Surface `retries` / `timeout`
- `:556` `retries` / `timeout` knobs
- `:809` Controller comment `timeout`
- `:989` `timeout`
- `:2151` Task remarks `retries` / `timeout`
- `:2257` TaskController `timeout`
- `:4235,:4261,:4312,:4342` `first.skip()` / `second.skip()` (Collection.test.ts)
- `:5347` `const timeoutGate = Promise.withResolvers<void>()`
- `:5699` `timeout.category === 'optional'`
- `:5807` `retries/timeout`
- `:5966` `describe('Task — declarative behavior/retries/timeout PERSIST…`

No `+` hit for `.only(`, `.todo(`, `TODO`, `FIXME`, `console.`, or `debugger`.

Tree `src` and `tests` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`:

- `\.only\(|\.todo\(|TODO|FIXME|console\.|debugger`: no hit in `src/`; no hit in non-excluded `tests/` for those tokens.
- `\.skip\(`: domain `skip()` — `src/core/WorkflowRunner.ts:1007`; `tests/src/core/Collection.test.ts:131,157,208,238`; `Task.test.ts:345,466,481,534,595,697,776,969`; `WorkflowRunner.test.ts:632`; `WorkflowPersistence.test.ts:105-106`; `factories.test.ts:504,557`; `PhaseManager.test.ts:44,90,126,148,155,176`; `Phase.test.ts:146,152,190,233-234,274,332,460,704`; `TaskManager.test.ts:54`; `Workflow.test.ts:386-387,444,455,548,623,644,678,859,1002`.
- `retry` / `timeout`: domain vocabulary throughout `src/core/{types,Runner,Workflow,helpers,validators,WorkflowRunner,factories,shapers,errors,tasks/Task,tasks/TaskController,phases/Phase}.ts` and matching tests (including `tests/src/core/WorkflowManager.test.ts:427-447` `retry` id; `Runner.test.ts` / `WorkflowRunner.test.ts` timeout suites). Full `file:line` list is the grep dump under those tokens; no `it.skip` / `describe.skip` in the non-excluded population.

### Parity

Call-signature members (`src/core/types.ts`) beside `## Methods` rows (`guides/workflow.md`):

| Entity | types.ts members | guide Methods rows |
| --- | --- | --- |
| CollectionInterface | `append` `:1409`, `add` `:1418`, `remove` `:1426`, `move` `:1435`, `update` `:1444`, `entry` `:1451`, `entries` `:1457` | `guides/workflow.md:529-535` `append` `add` `remove` `move` `update` `entry` `entries` |
| WorkflowManagerInterface | `workflow` `:2083`, `workflows` `:2084`, `add` `:2098`, `open` `:2122`, `save` `:2136`, `remove` `:2148,:2155`, `clear` `:2156` | `:569-575` `workflow` `workflows` `add` `open` `save` `remove` `clear` |
| RunHolderInterface | `hold` `:1712` | `:617` `hold` |
| WorkflowPersistenceInterface | `checkpoint` `:1786`, `finalize` `:1792`, `detach` `:1794` | `:549-551` `checkpoint` `finalize` `detach` |
| ControllerInterface | `wait` `:2265`, `spawn` `:2286`, `abort` `:2292` | `:625-627` `wait` `spawn` `abort` |
| TaskControllerInterface | `report` `:1674`, `pulse` `:1680`, `wait` `:1686`, `results` `:1688` | `:583-586` `report` `pulse` `wait` `results` |
| RunnerInterface | `execute` `:2410`, `spawn` `:2429`, `abort` `:2437`, `pause` `:2448`, `resume` `:2458`, `stop` `:2476`, `destroy` `:2482` | `:603-609` `execute` `spawn` `abort` `pause` `resume` `stop` `destroy` |
| WorkflowRunnerInterface | `execute` `:1932,:1974` | `:541` `execute` |
| SchedulerInterface | `yield` `:2186`, `delay` `:2188` | table under `:588` (not re-listed here; file has the two-method table) |
| WorkflowInterface | `phase` `:1196`, `results` `:1198`, `skip` `:1207`, `stop` `:1216`, `complete` `:1225`, `pause` `:1245`, `resume` `:1255`, `destroy` `:1273`, `wait` `:1285`, `add` `:1318`, `remove` `:1331`, `move` `:1344`, `update` `:1356`, `snapshot` `:1357` | `:441+` `phase` `results` `skip` `stop` `complete` `pause` `resume` `destroy` `wait` plus mutation/snapshot rows in the same table |
| TaskInterface | `start` `:897` … `snapshot` `:941` | table under `:476` |
| PhaseInterface | `task` `:993` … `snapshot` `:1144` | table under `:456` |
| WorkflowStoreInterface | `get` `:562`, `set` `:569`, `delete` `:575` | table under `:629` |

Readonly data vs Surface/Entities:

- `RunHolderInterface.runner` `types.ts:1706` — Surface `guides/workflow.md:410` `` `{ runner }` + `hold` ``; Methods note `:613` “The `runner` member is a Surface row.”
- `ControllerInterface` `id`/`input`/`signal`/`aborted` `types.ts:2249-2252` — Surface `:423`; Methods `:621` “The `id` / `input` / `signal` / `aborted` members are Surface rows.”
- `WorkflowManagerInterface` has no `count` in the method list; Surface `:419` names `count`.
- `CollectionInterface` `count` is Surface `:405`; Methods `:525` “`count` is read-state (in the Surface row).”
- `LifecycleStatus` Surface `:383`; `WorkflowRegistry` `:407`; `LIFECYCLE_STATUSES` / `TERMINAL_STATUSES` Constants `:353-354`.
- Deleted: `TaskStatus`/`PhaseStatus`/`WorkflowStatus`, `WorkflowHooks`/`PhaseHooks`/`TaskHooks`, `PHASE_STATUSES`/`WORKFLOW_STATUSES`, `RunnerValue`/`RunnerFailure` — absent from current Surface.

Backticked identifiers in guide sentences the diff added (representative `+` / now), vs barrel `src/core/index.ts` / `src/browser/index.ts` / `src/server/index.ts`:

- `WorkflowDefinition`, `WorkflowRunner`, `Collection`, `TaskInterface`, `TaskUpdate`, `RunHolder`, `RunHolderInterface`, `WorkflowPersistence`, `createMemoryWorkflowStore`, `createWorkflow`, `definitionToSnapshot`, `Workflow`, `LifecycleStatus`, `WorkflowRegistry`, `EmitterHooks` (imported, not a workflow export), `queue.md` mirrors — workflow symbols exported via `src/core/index.ts:1-20` (`export * from './types.js'` covers types; `:20` RunHolder). `createWorkflow`/`definitionToSnapshot` via `:4` factories. Browser backends via `src/browser/index.ts:3-6`.

### Gates

Report § Gates, quoted:

| Command | Exit | Evidence |
| ------- | ---- | -------- |
| `npm run format:check` | 0 | `gate-1-format.txt` — "All matched files use the correct format", 106 files |
| `npm run lint:check` | 0 | `gate-2-lint.txt` |
| `npm run check` | 0 | `gate-3-check.txt` |
| `npm run build` | 0 | `gate-4-build.txt` |
| `npm test` | 0 | `gate-5-test.txt` |

Proof-file readings: `gate-1-format.txt` contains `All matched files use the correct format.` and `Finished in 2966ms on 106 files using 4 threads.`; `gate-2-lint.txt` shows the `oxlint --deny-warnings` banner only (no diagnostic body); `gate-3-check.txt` shows the `tsc --noEmit` project chain with no error stanza in the file; `gate-4-build.txt` ends after `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts`; `gate-5-test.txt` `test:src` Tests `877 passed (877)`, `test:policy` `111 passed (111)`, `test:setup` `25 passed (25)`, `test:guides` `98 passed (98)`. Those files do not themselves print `exit 0`; the report table is the source of the exit column.

### Breaking

Report § Breaking entries:

- workflow-subj-8: `WorkflowHooks`, `PhaseHooks`, `TaskHooks` removed; consumers “none in fleet”; mirrors refreshed at the wave.
- workflow-subj-9: `PHASE_STATUSES`, `WORKFLOW_STATUSES` removed; `TASK_STATUSES` → `LIFECYCLE_STATUSES`; `TERMINAL_TASK_STATUSES` → `TERMINAL_STATUSES`; “none in fleet”.
- workflow-subj-10: `TaskStatus`, `PhaseStatus`, `WorkflowStatus` removed; `@orkestrel/toolbox`.
- workflow-subj-11: `WorkflowFunctions` → `WorkflowRegistry`; `@orkestrel/toolbox`.
- workflow-subj-14: `RunnerValue`, `RunnerFailure` removed; “none in fleet”.

Word-boundary sweep of those old names across `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/workflow`, and vendored `guides/workflow.md` mirrors:

- `toolbox/src/core/types.ts:7` `WorkflowFunctions`; `:9` `WorkflowStatus`; `:125-126` `WorkflowStatus`; `:167,:186` `WorkflowFunctions`
- `toolbox/src/core/factories.ts:8,320,325` `WorkflowFunctions`
- `toolbox/tests/src/core/factories.test.ts:6,600` `WorkflowFunctions`
- `toolbox/tests/src/core/helpers.test.ts:5,152` `TaskStatus`
- `toolbox/guides/toolbox.md:21` `WorkflowFunctions`
- `mcp/tests/setupConformance.ts:501-527` `TaskStatus` (A2A schema, not this package’s alias)
- `/home/user/scaffold/src`: no hit

Vendored mirrors (excluded from the required sweep, recorded anyway): `toolbox/guides/workflow.md` and `agent/guides/workflow.md` still list `TASK_STATUSES`, `PHASE_STATUSES`, `WORKFLOW_STATUSES`, `TERMINAL_TASK_STATUSES`, `TaskStatus`, `PhaseStatus`, `WorkflowStatus`, `WorkflowHooks`, `PhaseHooks`, `TaskHooks`, `WorkflowFunctions`.

### Writing sweep

Diff `+` lines in prose files (`guides/**`, `README.md`, doc comments in `src/**`, test titles/comments in `tests/**`), case-insensitive `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`:

- `guides/workflow.md` (diff `+`, now `:154`): `resumes just before the next paint through \`requestAnimationFrame\``
- `guides/workflow.md` (diff `+`, now `:256`): `Reposition the entry keyed \`key\` to a new index`
- `guides/workflow.md` (diff `+` at `conform-workflow.diff:671`): `Subscribe via \`runner.emitter.on(...)\`` — tree now `:1376` `Subscribe through \`runner.emitter.on(...)\``
- `src/core/Runner.ts:83`: `readonly #values = new Map<string, Success<TResult>>()`
- `src/core/Runner.ts:220`: `new Error('runner aborted')`
- `src/core/Workflow.ts:92`: `const workflow = new Workflow(definitionToSnapshot(definition))`
- `src/core/WorkflowPersistence.ts:25`: `const persistence = new WorkflowPersistence(workflow, createMemoryWorkflowStore())`
- `src/core/types.ts:2395`: `resumable, no new dispatch`
- `tests/guides.test.ts:258` / Collection tests: `new Collection<…>`
- interval tests: `performance.now()` — `\bnow\b` matches the `now` in `now()`
- `src/core/types.ts` hunk `+` still adjacent to context line `e.g. \`{ finish: (r) => log(r) }\`` at `:2337` (the `+` line itself at diff `:3773` does not contain `e.g.`; the unchanged following line does)

Count-over-growable-set `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` on those `+` lines: no hit.

# Distillate

- workflow-obj-1: site now `tests/guides.test.ts:207` flagship block | diff present yes | old form hits 1 (`describe('flagship fences'`) | report matches yes
- workflow-obj-2: site now `Collection.ts:44` + `Collection.test.ts:1` | diff present yes (new file) | old form hits 0 on absence | report matches yes
- workflow-obj-3: site now `Scheduler.test.ts:78` `performance.now()` | diff present yes | old form interval `Date.now()` hits 0 (3 wall-clock + 1 comment remain) | report matches yes on sites; no failing-first row
- workflow-obj-4: site now gone; `PromiseWithResolvers` at `setup.ts:170` | diff present yes | old form hits 0 | report matches yes
- workflow-obj-5: site now `IdleScheduler.ts:1-3` type-first | diff present yes | old form inversion not re-swept multiline | report matches yes on files read
- workflow-obj-6: site now `RunHolder.ts:19` barrelled `index.ts:20` | diff present yes | old form INTERNAL string hits 0 | report matches yes (`RunHolder.ts:33`, `workflow.md:125`)
- workflow-obj-7: site now Persistence `:20` / Workflow `:83` `@example` | diff present yes (operative constructor example) | old form hits n/a | report matches yes
- workflow-obj-11: site now Controller `#` fields `:32-39` getters `:55` | diff present yes | old form public fields 0 | report matches yes
- workflow-subj-1: site now `types.ts:13` named section | diff present yes | old form `§[0-9]` hits 0 in owned src/tests/workflow.md/README; named `§` 2 | report matches yes on digits; report “`§` empty on guides” vs named `§` still at `workflow.md:1462`, `guides/README.md:89`
- workflow-subj-2: site now `workflow.md:61` no `simply`; README `:37` no `now` | diff present yes | old form `via`/`simply`/`should`/`currently` 0 in guides; `e.g.` 5 in `types.ts` + 3 other src | report matches yes on named sites; `e.g.` residue unstated
- workflow-subj-3: site now `workflow.md:5` / README `:42` | diff present yes | old form listed count-phrases 0 | report matches yes
- workflow-subj-4: site now `workflow.md:67` noun phrase | diff present yes | old form listed imperatives 0 on Surface | report matches yes
- workflow-subj-5: site now `guides/README.md:56-85` four mirrors | diff present yes | old form unnamed 0 | report matches yes
- workflow-subj-6: site now `WorkflowManager.ts:149` `let removed = true` | diff present yes | old form “any was removed” 0 | report matches yes (test lines moved `:94,:109`)
- workflow-subj-8: site now `types.ts:739,:759,:779` inline EmitterHooks | diff present yes | old form hits 0 in package | report matches yes
- workflow-subj-9: site now `constants.ts:21,:38` | diff present yes | old form hits 0 in package | report matches yes
- workflow-subj-10: site now `types.ts:354` only LifecycleStatus | diff present yes | old form hits 0 in package | report matches yes in-tree; toolbox still `WorkflowStatus`
- workflow-subj-11: site now `types.ts:1637` WorkflowRegistry | diff present yes | old form hits 0 in package | report matches yes in-tree; toolbox still `WorkflowFunctions`
- workflow-subj-12: site now `helpers.ts:903-914` full TSDoc | diff present yes | old form n/a | report matches yes
- workflow-subj-13: site now `helpers.ts:871` `@param functions` | diff present yes | old form n/a | report matches yes
- workflow-subj-14: site now `Runner.ts:83,:402` Success map | diff present yes | old form hits 0 in package | report matches yes
- fleet-F1: site now `setup.ts:482` helper kept; browser env present | diff present no (noop) | old form n/a | report matches no on `:508` (actual `:482`)
- fleet-F2: site now Controller `#id` `:32` | diff present yes (via obj-11) | old form public id field 0 | report matches yes

Scope tags: all 58 evidence-status paths `owned`; 0 `shared`; 0 `off-limits`. Where-unnamed hunk files: `README.md`, `src/core/index.ts`, `src/core/tasks/TaskController.ts`, `tests/setup.test.ts`.

Residue: no `.only`/`.todo`/`TODO`/`FIXME`/`console.`/`debugger` in non-excluded `src`/`tests`; `.skip(` is domain `skip()`; `retry`/`timeout` are domain tokens (diff `+` and tree). Writing: `just` at `guides/workflow.md:154`; `new` constructors/Map/Error/dispatch; `now` inside `Date.now`/`performance.now`; diff `+` `via` vs tree `through` at `guides/workflow.md:1376`; `e.g.` remains `types.ts:306,:834,:959,:1920,:2337`. Count-set regex on `+`: no hit.

Parity: Collection/RunHolder/WorkflowManager/Persistence/Controller/TaskController/Runner method tables match call-signatures listed above; `RunHolder.runner` Surface `:410`; hook/status/RunnerValue Surface rows gone; `src/core/index.ts:20` exports RunHolder.

# Unknowns

- Multiline import-order regex from the report (`^import \{` then `^import type`) not re-executed as one engine-regex over `src` and `tests`.
- Growable-set numeral-count regex over the whole tree not re-executed; only the seven phrases named in subj-3 Wrong were swept.
- `retry`/`timeout` tree hits not individually re-listed beyond the representative file:line sets (the pattern matches ordinary domain identifiers).
- Gate proof files do not print an `exit 0` line; exits are taken from the report table.
- Whether `src/core/cloners.ts` and `tests/distribution.test.ts` are dirty now (session-start status listed them; evidence status does not). `git status` was not re-run in this lane.
- `mcp/tests/setupConformance.ts` `TaskStatus` is an A2A schema name; included as a word-boundary hit, not typed as this package’s deleted alias.
- Evidence diff `+` `Subscribe via` vs tree `Subscribe through` at `guides/workflow.md:1376`: which snapshot is later was not dated beyond the two artifacts.

# Journal

# Deviation

No file was created, edited, or deleted in this lane; no command that writes the tree was run. Every named input file was readable. Sweeps used Grep over the named populations, excluding `node_modules` by search path. Evidence status and session-start git status disagree on `src/core/cloners.ts` and `tests/distribution.test.ts`. Evidence diff `+` still contains `Subscribe via` at `conform-workflow.diff:671` while the tree at `guides/workflow.md:1376` reads `Subscribe through`. Report `fleet-F1` cites `tests/setup.ts:508`; the file is 486 lines and the helper is at `:482`.
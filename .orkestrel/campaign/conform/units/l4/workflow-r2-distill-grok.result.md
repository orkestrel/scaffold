I'll read the brief and the repository contracts first, then follow the brief exactly in read-only mode.Next I’ll load the unit brief, audit brief, report, and evidence files so I can map each row against the tree.The brief lists every row I need to map. I’ll collect current sites, the unit diff, and old-form sweeps in parallel.I’ll read the current sites the rows name and start the old-form sweeps against `src`, `tests`, and the guides.Next I’ll sweep the old names, proof files, remaining row sites, and the across-unit residue and writing patterns.I’ll keep pulling remaining sites, proof summaries, residue, and the fleet-wide old-name sweeps.I’ll read the proof files, remaining type/guide sites, residue patterns, and fleet-wide old-name hits next.I’ll gather the remaining sweeps: architecture barrel text, fleet old-name hits, writing/count patterns, and unnamed-file hunks.One last pass: residue `retry`/`timeout` hits in the tree, plus a few remaining site-now contexts.## Question

For every row of unit conform-workflow, what does the tree at `/home/user/fleet/workflow` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

## Evidence

### workflow-obj-1
1. **Site now.** Brief Where `tests/guides.test.ts:1-181` (file now 339 lines). Lines 1–3 still open the file; flagship block is at 207, not inside 1–181.
```1:3:tests/guides.test.ts
// The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
// this repo's own `guides/README.md` manifest. The four constants below are this
// package's own, and are the only part a sibling package changes.
```
```206:208:tests/guides.test.ts
// transcription beside it.
describe('flagship fences', () => {
	const guideText = requireValue(files[WORKFLOW_GUIDE], `Missing file: ${WORKFLOW_GUIDE}`)
```
Imports through `@src/core` at `tests/guides.test.ts:5` and `:8-20`. Assertions: `result.status` `:241`, compile-task status `:242`, `store.count` `:266`, `contract.is` `:280`, `main.phases.count` `:308`, derivation values `:318-322`. Presence guards `:245-250`, `:269-274`, `:284-287`, `:312-314`, `:326-336`.
2. **Diff at the site.** `tests/guides.test.ts` `@@ -2,7 +2,22 @@` (first `+` is `import type { TaskInterface, TaskUpdate, WorkflowDefinition } from '@src/core'`); INTERNAL hunk `@@ -43,7 +58,6 @@` removes `'class RunHolder'`; flagship append ends at diff lines 4143–4164 (`describe('flagship fences'` body). Operative repair text present in `+` lines: `describe('flagship fences'`, `@src/core`, `result.status`, `store.count`, `contract.is(definition)`, `main.phases.count`, `deriveBoundary([...])`.
3. **Old form sweep.** Row adds; no rename. Pattern none. Population `src`, `tests`, `guides/workflow.md`, `guides/README.md`, `README.md`. no hit.
4. **Report reading.** Table: `applied`. Sentence: “`tests/guides.test.ts` — appended `describe('flagship fences', …)` … Imports through `@src/core`, runs in the existing `guides` project; no project entry added.” Cited `tests/guides.test.ts:148` now carries `symbol.keyword === 'function'` (`tests/guides.test.ts:148`).
5. **Proof reading.** Behavioural. Report: `npm run test:guides` red “1 failed, 97 passed” / green “98 passed”. Files exist. `obj-1-control-red.txt`: `Tests  1 failed | 97 passed (98)`; `FAIL … flagship fences > returns the documented values from the derivation fence`. `obj-1-control-green.txt`: `Tests  98 passed (98)`.

### workflow-obj-2
1. **Site now.** Brief Where `src/core/Collection.ts:44` still the class:
```43:47:src/core/Collection.ts
 */
export class Collection<
	TEntry extends CollectionEntry<TPatch>,
	TPatch,
> implements CollectionInterface<TEntry, TPatch> {
```
New `tests/src/core/Collection.test.ts` exists. It imports `buildCollection` / `buildTasks` from `tests/setup.ts` (`tests/src/core/Collection.test.ts:4`), not `new Collection<…>('task', compileGuard(taskUpdateShape))` in the test file. Duplicate-id case `tests/src/core/Collection.test.ts:24-36`. Noun parameter `tests/src/core/Collection.test.ts:38-40`.
2. **Diff at the site.** `src/core/Collection.ts` `@@ -4,7 +4,7 @@` first `+` `* Implements the insertion-ordered gated store both lean managers hold — entities keyed by `id`,`; `tests/src/core/Collection.test.ts` `@@ -0,0 +1,238 @@` first `+` `import { isWorkflowError } from '@src/core'`. Repair’s `new Collection<TaskInterface, TaskUpdate>('task', compileGuard(taskUpdateShape))` is not a `+` line in `Collection.test.ts`; `buildCollection` is (`tests/setup.ts` `+return new Collection<TaskInterface, TaskUpdate>(noun, compileGuard(taskUpdateShape))` at diff ~4465).
3. **Old form sweep.** Row adds a mirror. no rename. no hit.
4. **Report reading.** `applied`. “New `tests/src/core/Collection.test.ts` in `src:core` over a real `new Collection<…>` … Imports the class through `@src/core`.” Tree: class construction is in `tests/setup.ts:458+` (`buildCollection`); test file does not import `Collection` from `@src/core`. Fix-round-2 paragraph in the report names that move.
5. **Proof reading.** Behavioural. Report: vitest `src:core` `Collection.test.ts` red “3 failed, 12 passed” / green “15 passed”. `obj-2-control-red.txt`: `Tests  3 failed | 12 passed (15)`. `obj-2-control-green.txt`: `Tests  15 passed (15)`.

### workflow-obj-3
1. **Site now.** Brief `:78` still the interval start:
```77:82:tests/src/core/Scheduler.test.ts
			const scheduler = new Scheduler()
			const start = performance.now()

			await scheduler.delay(20)

			expect(performance.now() - start).toBeGreaterThanOrEqual(20)
```
Same `performance.now()` pair: `tests/src/core/factories.test.ts:760,762`; `tests/src/browser/FrameScheduler.test.ts:89,91`; `BrowserScheduler.test.ts:112,114`; `IdleScheduler.test.ts:94,96`; `tests/src/browser/factories.test.ts:19,21 / 56,58 / 93,95`; `tests/src/server/factories.test.ts:17,20`. Wall-clock stamps left: `tests/src/core/helpers.test.ts:1520` (`Date.now() + 60_000`; brief `:1517`), `Workflow.test.ts:368`, `tasks/Task.test.ts:283`. Comment at `tests/src/server/NodeScheduler.test.ts:69`.
2. **Diff at the site.** `tests/src/core/Scheduler.test.ts` `@@ -75,11 +75,11 @@`. `+const start = performance.now()` and `+expect(performance.now() - start)` present verbatim.
3. **Old form sweep.** Removes interval `Date.now()`. Pattern `\bDate\.now\(\)` over `tests/**`. Hits: `helpers.test.ts:1520`, `Workflow.test.ts:368`, `Task.test.ts:283`, `NodeScheduler.test.ts:69` (comment). Listed interval files: no `Date.now()` hit.
4. **Report reading.** `applied`. “`performance.now()` replaces both readings of each interval pair … Thresholds unchanged.” Matches the sites above. Report’s remaining-stamp line `helpers.test.ts:1520` matches now; brief’s `:1517` does not.
5. **Proof reading.** Placement of a timer reading. Report records no failing-first for this row; records a later red `test:src` in `mid-test-src.txt` (`Tests  1 failed | 861 passed (862)`, Scheduler delay assertion) and green `obj-3-scheduler-alone-1.txt` (`Tests  15 passed (15)`), `obj-3-test-src-rerun.txt` (`Tests  862 passed (862)`). Field-3 sweep agrees: interval sites are `performance.now()`.

### workflow-obj-4
1. **Site now.** Brief `tests/setup.ts:181-189` (`createGate` locals) gone. Those lines are now `WorkflowStoreBoundary` fields:
```177:182:tests/setup.ts
export class WorkflowStoreBoundary implements WorkflowStoreInterface {
	readonly #reads: Array<PromiseWithResolvers<WorkflowSnapshot | undefined>>
	readonly #writes: Array<PromiseWithResolvers<void>>
	readonly #gets: string[] = []
	readonly #sets: WorkflowSnapshot[] = []
	readonly #deletes: string[] = []
```
`TestGateInterface` / `createGate` absent. Call sites use `Promise.withResolvers` (e.g. `tests/setup.test.ts:168-170`, `tests/src/core/Controller.test.ts:65`).
2. **Diff at the site.** `tests/setup.ts` `@@ -162,46 +170,20 @@` deletes `TestGateInterface` / `createGate`; `+readonly #reads: Array<PromiseWithResolvers<…>>`. `tests/setup.test.ts` deletes `describe('createGate'`. Replacement `Promise.withResolvers<T>()` present in `+` lines.
3. **Old form sweep.** Names `createGate`, `TestGateInterface`. Patterns `\bcreateGate\b`, `\bcreateGates?\b|\bcreateGated\b|\bcreateGating\b`, `\bTestGateInterface\b` over `src`, `tests`, `guides/workflow.md`, `guides/README.md`, `README.md`. no hit.
4. **Report reading.** `applied`. “Deleted `TestGateInterface` and `createGate` … every call site now reads `Promise.withResolvers<T>()`.” Matches.
5. **Proof reading.** Naming/removal. Report sweep names those symbols empty. Field-3 agrees (no hit).

### workflow-obj-5
1. **Site now.** Brief `IdleScheduler.ts:3-4` (type imports after a value import) reordered. Current:
```1:5:src/browser/IdleScheduler.ts
import type { SchedulerInterface, SchedulerOptions } from '@src/core'
import type { AnyFunction } from '@orkestrel/contract'
import type { IdleInterface } from './types.js'
import { delayHost, scheduleHost } from '@src/core'
import { isFunction } from '@orkestrel/contract'
```
Named tests: type imports precede value imports in `Workflow.test.ts:1-15`, `WorkflowManager.test.ts:1-16`, `Runner.test.ts:1-4`, `factories.test.ts:1-23`, `WorkflowRunner.test.ts:1-25`, `tasks/Task.test.ts:1-9`, `phases/Phase.test.ts:1-9`.
2. **Diff at the site.** `src/browser/IdleScheduler.ts` `@@ -1,7 +1,7 @@`. `+import { delayHost, scheduleHost } from '@src/core'` after the type imports. Reorder present.
3. **Old form sweep.** Reorder only. no hit.
4. **Report reading.** `applied`. “`src/browser/IdleScheduler.ts` and the seven named test files now place every `import type` ahead of the first value import.” Matches the files read.
5. **Proof reading.** Placement. Report: multiline type-after-value sweep empty. The seven files read type-first.

### workflow-obj-6
1. **Site now.** Brief `RunHolder.ts:19` still the class:
```19:24:src/core/RunHolder.ts
export class RunHolder implements RunHolderInterface {
	#runner: RunnerInterface<TaskInterface, void> | undefined

	get runner(): RunnerInterface<TaskInterface, void> | undefined {
		return this.#runner
	}
```
`src/core/index.ts:20` `export * from './RunHolder.js'`. `INTERNAL` at `tests/guides.test.ts:58-63` has Controller, Phase, Task, TaskController — no `'class RunHolder'`. `@example` import `src/core/RunHolder.ts:33` `import { createRunner, RunHolder } from '@orkestrel/workflow'`. Guide class table `guides/workflow.md:125` `` `RunHolder` ``. `tests/src/core/RunHolder.test.ts:3` `import { createRunner, RunHolder } from '@src/core'`.
2. **Diff at the site.** `src/core/index.ts` `@@ -17,3 +17,4 @@` `+export * from './RunHolder.js'`. `RunHolder.ts` `@@ -30,8 +30,7 @@` `+ * import { createRunner, RunHolder } from '@orkestrel/workflow'`. `tests/guides.test.ts` `@@ -43,7 +58,6 @@` `-	'class RunHolder',`. Repair text present verbatim.
3. **Old form sweep.** Removes `'class RunHolder'` from INTERNAL and `'./RunHolder.js'` from the example. Pattern `'class RunHolder'` over named population: no hit. Pattern `from './RunHolder.js'` in `src/core/RunHolder.ts`: no hit.
4. **Report reading.** `applied`. “`export * from './RunHolder.js'` added … `'class RunHolder'` removed … `@example` import at `src/core/RunHolder.ts:33` folded … `RunHolder` row … `guides/workflow.md:125`.” Those citations match now (`index.ts:20`, `RunHolder.ts:33`, `workflow.md:125`, `guides.test.ts:58-63`).
5. **Proof reading.** Placement/export. Report sweep not a failing-first. Field-3: old INTERNAL string gone.

### workflow-obj-7
1. **Site now.** Brief `WorkflowPersistence.ts:13-20` is now the class TSDoc including `@example`:
```13:31:src/core/WorkflowPersistence.ts
/**
 * Coordinates advanced run-local snapshot persistence with one writer and one coalesced most recent obligation.
 …
 * @example
 * ```ts
 * import { WorkflowPersistence, createMemoryWorkflowStore, createWorkflow } from '@orkestrel/workflow'
 …
 * await persistence.checkpoint('initial')
```
`Workflow` `@example` at `src/core/Workflow.ts:84-97` uses `definitionToSnapshot` and `new Workflow(definitionToSnapshot(definition))`.
2. **Diff at the site.** `WorkflowPersistence.ts` `@@ -11,11 +11,22 @@` `+ * @example` and `+ * import { WorkflowPersistence, createMemoryWorkflowStore, createWorkflow } from '@orkestrel/workflow'`. `Workflow.ts` `@@ -74,12 +74,27 @@` `+ * import { definitionToSnapshot, Workflow } from '@orkestrel/workflow'` and `+ * const workflow = new Workflow(definitionToSnapshot(definition))`. Operative constructor example present; finder’s `createWorkflow` class example is not the `+` form for `Workflow`.
3. **Old form sweep.** Adds `@example`. no hit.
4. **Report reading.** `applied`. “`WorkflowPersistence` takes the existing guide fence transcribed … `Workflow` takes an `@example` exercising the published constructor — `new Workflow(definitionToSnapshot(definition))`.” Matches `WorkflowPersistence.ts:22-28` and `Workflow.ts:86-96`.
5. **Proof reading.** Documentation. No failing-first. `obj-7-guides.txt`: `Tests  88 passed (88)` (older guides count than current 98).

### workflow-obj-11
1. **Site now.** Brief `Controller.ts:32-38` public fields are now `#` fields then getters:
```31:69:src/core/Controller.ts
export class Controller<TInput, TResult> implements ControllerInterface<TInput, TResult> {
	readonly #id: string
	readonly #input: TInput
	readonly #signal: AbortSignal
	readonly #abort: AbortInterface
	readonly #spawn: (input: TInput) => Promise<TResult>
…
	get id(): string {
		return this.#id
	}
…
	wait(): Promise<void> {
		return parkSignal(this.#signal)
	}
```
`TaskController.ts:36-80`: `#signal` `#input` `#task` `#attempt` before other `#` fields; `this.#task = task.context` at `:60`; internal `this.#signal` at `:85`, `:106`, `:127`, `:131`.
2. **Diff at the site.** `Controller.ts` `@@ -29,9 +29,10 @@` `+	readonly #id: string` etc.; `@@ -44,13 +45,25 @@` getters; `@@ -58,7 +71,7 @@` `parkSignal(this.#signal)`. `TaskController.ts` `@@ -54,18 +55,34 @@` `+		this.#signal = signal` and `+	get signal()`. Repair text present.
3. **Old form sweep.** Public instance fields `readonly id:` on implementation classes. Pattern `readonly id: string` in `src/**/*.ts` excluding `types.ts` / `browser/types.ts`: hits only `src/core/errors.ts:22-23` (`code` / `context`, not `id`). `Controller.ts` / `TaskController.ts`: no public `readonly id` data field.
4. **Report reading.** `applied`. Describes the `#` conversion. Matches. Report `JSON.stringify` claim: hits serialize snapshots/schemas, not a Controller instance (`tests/src/core/helpers.test.ts:623`, `Workflow.test.ts:586`, stores tests, etc.).
5. **Proof reading.** Placement. `obj-11-controllers.txt`: `Tests  92 passed (92)`. No failing-first named for this row.

### workflow-subj-1
1. **Site now.** Brief `src/core/types.ts:12`:
```12:14:src/core/types.ts
// + generator in lockstep with the hand-written definition interfaces. Types are
// the source of truth (AGENTS.md § Authority and loading).
//
```
2. **Diff at the site.** `types.ts` `@@ -10,7 +10,7 @@` `+// the source of truth (AGENTS.md § Authority and loading).`. Named-section re-point present; numbered `AGENTS §2` removed.
3. **Old form sweep.** Numbered `§` citations. Pattern `§[0-9]` over `src/**`, `tests/**`: no hit. Pattern `§[0-9]|AGENTS §` over `guides/workflow.md`, `guides/README.md`, `README.md`: no hit. Same pattern over checkout minus `node_modules`: hits only vendored `guides/{timeout,queue,contract,database,emitter,guide,budget}.md` (paths under `/home/user/fleet/workflow/guides/`). Named `§` remains in owned prose as `AGENTS.md § Authority and loading` (`src/core/types.ts:13`) and `.claude/rules/documentation.md` § Parity (`guides/README.md:89`).
4. **Report reading.** `applied`. “Every `§` citation deleted or re-pointed … Vendored dependency guides untouched.” Owned numbered `§` empty; vendored mirrors still numbered. Report table `§[0-9]` empty on `src/**`,`tests/**` matches. Report `§` empty on `guides/workflow.md`/`guides/README.md`/`README.md`: numbered empty; named `§ Parity` remains at `guides/README.md:89`.
5. **Proof reading.** Documentation. Report sweep and field-3 agree on numbered `§` in owned `src`/`tests`/package guides.

### workflow-subj-2
1. **Site now.** Brief `guides/workflow.md:61` is the “Why this is safe” paragraph; no `simply`. `just before the next paint` at `guides/workflow.md:154`. README now: `README.md:37` “The proposed integration architecture lives with the package that implements it”.
2. **Diff at the site.** `guides/workflow.md` `@@ -58,27 +58,27 @@`; `README.md` `@@ -34,12 +34,12 @@` `+shipped contract. The proposed integration architecture lives with the`. `now` deleted from that README sentence.
3. **Old form sweep.** Banned fillers in owned package files (exclude vendored `guides/{contract,queue,…}.md`). `\bsimply\b` in `src`, `tests`, `guides/workflow.md`, `guides/README.md`, `README.md`: no hit. `\bvia\b` in those: `tests/setup.ts:389` (doc of legacy key), `tests/src/core/shapers.test.ts:204,212` (`via` object key), `tests/src/core/helpers.test.ts:44` (comment). `\bcurrently\b`: no hit in that population. `\be\.g\.|\bi\.e\.` in owned `src`/`tests`/`guides/workflow.md`/`guides/README.md`/`README.md`: no hit (remaining `e.g.` only vendored guides). `\bjust\b`: `guides/workflow.md:154`; `src/browser` paint comments per report. `\bnow\b` as `Date.now()`: `guides/workflow.md:330,1025,1026`; `src/core/helpers.ts` locals; `src/core/tasks/Task.ts:469,485`; `src/core/Workflow.ts:441`.
4. **Report reading.** `applied`. “Substitution table applied … Temporal `once` swept.” Matches the owned-file state above. Report permitted `just before the next paint` at `:154` matches.
5. **Proof reading.** Documentation. Field-3 and report’s later writing sweeps overlap; leftover `via`/`just`/`now` are the permitted/code-token sites the report lists.

### workflow-subj-3
1. **Site now.** Brief `guides/workflow.md:5`: “Read the module as layers of one substrate, top to bottom:”. `guides/workflow.md:21`: “The use case is: author a `WorkflowDefinition`…”. `guides/workflow.md:207`: “These values are deliberately not translated…”. `guides/workflow.md:395`: “The task's push surface — `start` · …”. `README.md:42`: “Published as environment-scoped entry points: `.` provides…”.
2. **Diff at the site.** `guides/workflow.md` `@@ -1,11 +1,11 @@`; `README.md` `@@ -34,12 +34,12 @@` `+Published as environment-scoped entry points`. Count words deleted in those `+` lines.
3. **Old form sweep.** Phrases `five layers`, `two steps`, `All three feature-detect`, `Four values`, `Two dependency-owned`, `ten-event`, `three environment-scoped`, `the four terminals`, `TWO overloads`. Population owned guides/README/src/tests: no hit.
4. **Report reading.** `applied`. “Counts deleted and the named members left to carry each sentence.” Current sentences match the repair wording.
5. **Proof reading.** Documentation. Count-phrase sweep empty. Report’s number-word table empty on `README.md`/`guides/README.md` agrees.

### workflow-subj-4
1. **Site now.** Brief `guides/workflow.md:67` Factories Surface:
```67:68:guides/workflow.md
| `createWorkflowContract`      | function | The compiled workflow-definition `ContractInterface` — JSON Schema + guard + parser + seeded generator, all from one shape.          |
| `createWorkflow`              | function | The live `WorkflowInterface` entity tree built from a `WorkflowDefinition` (every node `pending`).                                   |
```
`isWorkflowError` at `:205`: “The narrower from an unknown caught value to a `WorkflowError`.”
2. **Diff at the site.** `guides/workflow.md` Surface hunks (`@@ -58,27 +58,27 @@` and later table hunks). Noun-phrase summaries present in `+` lines (`The compiled workflow-definition`, `The live`, `The in-memory`, `The narrower`).
3. **Old form sweep.** Imperative Surface openers. Report’s later pattern over `guides/workflow.md` left `## Methods` rows only. Current Factories/Errors/Helpers summaries read as noun phrases at `:67-77`, `:204-205`.
4. **Report reading.** `applied`. “Every imperative Surface-row description rewritten as a noun phrase … `## Methods` tables untouched.” Methods tables still start with verbs (`Look up`, `FORCE`, `MINT`) at `:441+`.
5. **Proof reading.** Documentation. Field-3: no remaining listed imperative Surface rows at `:67`, `:205`.

### workflow-subj-5
1. **Site now.** Brief `guides/README.md:19` is still `## Dependency reference`. New paragraphs: `queue.md` `:56-61`, `test.md` `:70-74`, `scaffold.md` `:76-80`, `probe.md` `:82-85`.
2. **Diff at the site.** `guides/README.md` `@@ -53,6 +53,13 @@` first `+[`queue.md`](queue.md) is a byte-identical mirror…`; `@@ -60,6 +67,23 @@` test/scaffold/probe paragraphs. Repair text present.
3. **Old form sweep.** Adds names. no hit.
4. **Report reading.** `applied`. “`guides/README.md` § Dependency reference gains a paragraph for `queue.md`, `test.md`, `scaffold.md`, and `probe.md`.” Matches `:56-85`.
5. **Proof reading.** Documentation. Paragraphs present.

### workflow-subj-6
1. **Site now.** Brief `WorkflowManager.ts:143-156`:
```143:155:src/core/WorkflowManager.ts
	remove(ids: string | readonly string[]): boolean {
		if (isArray(ids)) {
			let removed = true
			for (const id of ids) {
				this.#invalidate(id)
				this.#additions.delete(id)
				if (!this.#workflows.delete(id)) removed = false
			}
			return removed
		}
```
Guide `guides/workflow.md:574`: “`true` only when every id was removed, so an empty list reports `true` vacuously.” Types: remarks `:2065-2066`; overload `@returns` `:2146` “True if every id was removed”; empty-list remarks `:2141-2143`. Test `tests/src/core/WorkflowManager.test.ts:94-114` (`remove(['a', 'missing'])` → `false`; `remove([])` → `true`). Describe title now `WorkflowManager — remove / clear` (`:82`).
2. **Diff at the site.** `WorkflowManager.ts` `@@ -137,16 +137,20 @@` `+			let removed = true` and `+				if (!this.#workflows.delete(id)) removed = false`. Verbatim.
3. **Old form sweep.** Phrase `true when any was removed`. Population owned files: no hit.
4. **Report reading.** `applied`. “inverts the accumulator … TSDoc added to both `remove` overloads.” Matches code/guide/tests. Report’s Where `types.ts:2104` is now the `open()` `@remarks` (`src/core/types.ts:2099-2104`), not the `remove` `@returns` (now `:2146`).
5. **Proof reading.** Behavioural. Report: red “2 failed, 47 passed” / green “49 passed”. `subj-6-control-red.txt`: `Tests  2 failed | 47 passed (49)`; FAIL titles still say `WorkflowManager — remove (§9.2) / clear` (proof captured before describe rename). `subj-6-control-green.txt`: `Tests  49 passed (49)`. Tree describe no longer contains `§9.2`.

### workflow-subj-8
1. **Site now.** Brief `types.ts:760-766` aliases gone. Current option `on` fields:
```738:739:src/core/types.ts
export interface TaskOptions {
	readonly on?: EmitterHooks<TaskEventMap>
```
```758:759:src/core/types.ts
export interface PhaseOptions {
	readonly on?: EmitterHooks<PhaseEventMap>
```
```778:779:src/core/types.ts
export interface WorkflowOptions {
	readonly on?: EmitterHooks<WorkflowEventMap>
```
No Surface rows for the three alias names in `guides/workflow.md`.
2. **Diff at the site.** `types.ts` deletes `export type WorkflowHooks = …` (diff ~2950–2956); `+readonly on?: EmitterHooks<…>` at the three option sites. Guide Surface rows deleted (`- | \`WorkflowHooks\`` at diff ~407).
3. **Old form sweep.** `\b(WorkflowHooks|PhaseHooks|TaskHooks)\b` over `src`, `tests`, `guides/workflow.md`, `guides/README.md`, `README.md`: no hit. Inflections `(s|es|ed|ing)?`: no hit in that population. Fleet (excluding workflow tree and `guides/workflow.md` mirrors): no src/tests hit for those three names.
4. **Report reading.** `applied`. “deleted from `src/core/types.ts`; `EmitterHooks<…>` written inline.” Matches `:739/:759/:779`.
5. **Proof reading.** Naming. Sweep empty; field-3 agrees.

### workflow-subj-9
1. **Site now.** Brief `constants.ts:46` / `:55` (`PHASE_STATUSES` / `WORKFLOW_STATUSES`) gone. Current:
```21:21:src/core/constants.ts
export const LIFECYCLE_STATUSES: readonly LifecycleStatus[] = Object.freeze([
```
```38:38:src/core/constants.ts
export const TERMINAL_STATUSES: readonly LifecycleStatus[] = Object.freeze([
```
Guide Constants `guides/workflow.md:353-354` those two names. `validators.ts:23,43` reads `LIFECYCLE_STATUSES`. `helpers.ts:31,97` reads `TERMINAL_STATUSES`.
2. **Diff at the site.** `constants.ts` `@@ -1,32 +1,24 @@` and `@@ -36,33 +28,14 @@` delete `PHASE_STATUSES` / `WORKFLOW_STATUSES` / `TASK_STATUSES`; `+export const LIFECYCLE_STATUSES`. Rename present.
3. **Old form sweep.** `\b(PHASE_STATUSES|WORKFLOW_STATUSES|TASK_STATUSES|TERMINAL_TASK_STATUSES)\b` over owned `src`/`tests`/`guides/workflow.md`/`guides/README.md`/`README.md`: no hit. Fleet src/tests excluding workflow: no hit. Vendored mirrors `toolbox/guides/workflow.md:320-323` and `agent/guides/workflow.md:320-323` still name them (excluded from owned sweep; breaking sweep excludes those mirrors).
4. **Report reading.** `applied` with subj-10. Matches tree names and guide rows `:353-354`.
5. **Proof reading.** Naming. Sweep empty in owned population.

### workflow-subj-10
1. **Site now.** Brief `types.ts:369,:381,:393` aliases gone. `LifecycleStatus` at `:354`. `PhaseDerivation.status` at `:371` is `LifecycleStatus`. `TaskInterface.status` at `:856` is `LifecycleStatus`. `@remarks` at `:343-352` no longer claims tier aliases.
2. **Diff at the site.** `types.ts` deletes `export type TaskStatus = LifecycleStatus` (diff ~2736) and the Phase/Workflow twins. Retype `+	readonly status: LifecycleStatus` on members.
3. **Old form sweep.** `\b(TaskStatus|PhaseStatus|WorkflowStatus)\b` over owned `src`/`tests`/`guides/workflow.md`/`guides/README.md`/`README.md`: no hit. `derivePhaseStatus` / `deriveWorkflowStatus` remain (prefix `derive`, not a word-boundary `PhaseStatus`). Fleet src/tests excluding workflow: `toolbox/src/core/types.ts:9,125-126` (`WorkflowStatus`); `toolbox/tests/src/core/helpers.test.ts:5,152` (`TaskStatus`); `mcp/tests/setupConformance.ts:501-527` (`TaskStatus` as A2A schema path, different type). `scaffold/src`: no hit.
4. **Report reading.** `applied`. “`TaskStatus` / `PhaseStatus` / `WorkflowStatus` deleted … every member … retyped `LifecycleStatus`.” Matches `types.ts:354+`. Surface row `guides/workflow.md:383` is the folded `LifecycleStatus` row.
5. **Proof reading.** Naming. Owned sweep empty; fleet hits as above.

### workflow-subj-11
1. **Site now.** Brief `types.ts:1677`:
```1637:1637:src/core/types.ts
export type WorkflowRegistry = Readonly<Record<string, WorkflowFunction>>
```
`functions` option key unchanged (`types.ts:805`). Singular `WorkflowFunction` remains (`types.ts:1622`).
2. **Diff at the site.** `types.ts` `+export type WorkflowRegistry = Readonly<Record<string, WorkflowFunction>>` (diff ~3517). `Workflow.ts` `+	WorkflowRegistry,` / `-	WorkflowFunctions,`.
3. **Old form sweep.** `\bWorkflowFunctions\b` over owned population: no hit. Inflections: no hit. `WorkflowFunction` (singular) remains throughout. Fleet: `toolbox/src/core/types.ts:7,167,186`; `toolbox/src/core/factories.ts:8,320,325`; `toolbox/tests/src/core/factories.test.ts:6,600`; `toolbox/guides/toolbox.md:21` (guides path, outside the src/tests breaking sweep).
4. **Report reading.** `applied`. “`WorkflowFunctions` → `WorkflowRegistry` at its declaration and every reference … `functions` option key unchanged.” Matches owned tree. Guide Surface `guides/workflow.md:407`.
5. **Proof reading.** Naming. Owned sweep empty.

### workflow-subj-12
1. **Site now.** Brief `helpers.ts:907` is now a full block above `scanSnapshotContext` at `:915`:
```903:915:src/core/helpers.ts
/**
 * Locates the nearest identifiable node for an inconsistent owned snapshot.
 *
 * @remarks
 * The walk stops at the first phase or task whose persisted fields are inconsistent and returns
 * the identifiers it could read there, so a diagnostic can name the offending node even when part
 * of its identity is unreadable.
 *
 * @param value - The candidate snapshot, which may be any unknown value
 * @returns The nearest identifying record naming the offending `phase` and `task`, or `undefined`
 * when no inconsistent node is identifiable
 */
export function scanSnapshotContext(value: unknown): Readonly<Record<string, unknown>> | undefined {
```
2. **Diff at the site.** `helpers.ts` `@@ -904,7 +900,18 @@`. `+ * @param value - The candidate snapshot, which may be any unknown value` present verbatim. Prose `@returns` present (not nested-backtick `{ phase?, task? }`).
3. **Old form sweep.** Completes TSDoc. no hit.
4. **Report reading.** `applied`. “complete block: first sentence kept, `@remarks` … `@param value`, and a prose `@returns`.” Matches `:903-914`.
5. **Proof reading.** Documentation. Block present.

### workflow-subj-13
1. **Site now.** Brief `helpers.ts:869-878` shifted to `:861-874`:
```864:872:src/core/helpers.ts
 * @remarks
 * A snapshot lookup reads each unique `behavior` binding at most once from `functions`. A live workflow
 * validates its tasks' already-resolved handlers without consulting the retained registry again.
 * `functions` belongs to the snapshot overload alone; the live-workflow overload takes no registry
 * and reads each task's already-resolved `handler`.
 *
 * @param workflow - The persisted snapshot or constructed live workflow to validate
 * @param functions - The behavior registry the snapshot overload resolves each unique `behavior`
 * name against; omitted or `undefined` leaves every named task unresolved
```
Snapshot overload type `WorkflowRegistry` at `:878`.
2. **Diff at the site.** `helpers.ts` `@@ -872,18 +864,22 @@`. `+ * @param functions - The behavior registry…` present. `WorkflowRegistry` in the signature `+` line.
3. **Old form sweep.** Adds a tag. no hit.
4. **Report reading.** `applied`. “`hasWorkflowHandlers` gains `@param functions` … Written as `WorkflowRegistry`.” Matches.
5. **Proof reading.** Documentation. Tag present.

### workflow-subj-14
1. **Site now.** Brief `Runner.ts:408` / declared `types.ts:2402`. `#settle` now:
```400:411:src/core/Runner.ts
	#settle(id: string, outcome: Result<TResult, unknown>): void {
		if (outcome.success) {
			this.#values.set(id, outcome)
…
		} else if (this.#failure === undefined) {
			this.#failure = failure(outcome.error)
```
`#values` at `:83` `Map<string, Success<TResult>>`. `#failure` at `:100` `Failure<unknown> | undefined`. `RunnerValue` / `RunnerFailure` absent from `types.ts` (file ends `RunnerInterface` at `:2391`). No Surface rows for those names in `guides/workflow.md`.
2. **Diff at the site.** `Runner.ts` `@@ -1,15 +1,8 @@` `+import type { Failure, Result, Success }`; `@@ -405,7 +399,7 @@` `+			this.#values.set(id, outcome)`; `@@ -414,7 +408,7 @@` `+			this.#failure = failure(outcome.error)`; `#cleanup` `+Promise<Failure<unknown> | undefined>`. Types delete the two interfaces. Repair text present.
3. **Old form sweep.** `\b(RunnerValue|RunnerFailure)\b` over owned population: no hit. Fleet src/tests excluding workflow: no hit. `scaffold/src`: no hit.
4. **Report reading.** `applied`. “`#values` as `Map<string, Success<TResult>>` … stores the narrowed outcome directly at `#settle` … `RunnerValue` and `RunnerFailure` deleted.” Matches `:83`, `:402`, types absence.
5. **Proof reading.** Naming plus implementation. Sweep empty.

### fleet-F1
1. **Site now.** Browser environment present: `src/browser/BrowserScheduler.ts`, `IdleScheduler.ts`, `FrameScheduler.ts`, `tests/setupBrowser.ts`. `isBrowserVuePath` at `tests/setup.ts:522-526` (report `:508`):
```522:526:tests/setup.ts
/** Whether a repository-relative Vue SFC path belongs to the private browser application. */
export function isBrowserVuePath(path: string): boolean {
	const normalized = path.replaceAll('\\', '/')
	return normalized.startsWith('app/browser/')
}
```
`tests/setup.test.ts:423` `describe('isBrowserVuePath'`.
2. **Diff at the site.** No hunk deletes `isBrowserVuePath`. Citation-only edits in `tests/setup.ts`.
3. **Old form sweep.** Row is noop (keep helper). Pattern `\bisBrowserVuePath\b`: `tests/setup.ts:523`, `tests/setup.test.ts:18,423-432`.
4. **Report reading.** `noop`. “This workspace has a browser environment … `isBrowserVuePath` remains at `tests/setup.ts:508`.” Helper remains; line is now `523`, not `508`.
5. **Proof reading.** Placement/noop. Sweep finds the helper, matching noop.

### fleet-F2
1. **Site now.** `Controller` `#id` first among `#` fields (`Controller.ts:32`). `errors.ts:22-23` public `readonly code` / `context` on `WorkflowError` (Error subclass). Interface `readonly id` remains on `ControllerInterface` (`types.ts:2249`).
2. **Diff at the site.** Same `Controller.ts` hunks as obj-11. `+	readonly #id: string`.
3. **Old form sweep.** Implementation-class public `readonly id: string` ahead of `#` fields: no remaining class in `src` other than interface members in `types.ts`. `JSON.stringify` of Controller: no hit (see obj-11).
4. **Report reading.** `applied by workflow-obj-11`. “`Controller` was the only class carrying the shape.” Matches `Controller.ts:32-39` vs `errors.ts:22-23` (no `id`).
5. **Proof reading.** Placement. Folded into obj-11; no separate proof file.

Law sentences cited (scaffold copies):
- tests.md Test contract: “Mirror module/application structure: `tests/{src,app}/[environment]/[domain]/[module].test.ts`.” (`/home/user/scaffold/.claude/rules/tests.md:13-14`)
- tests.md: “Measure an elapsed interval with `performance.now()`, never `Date.now()`.” (`tests.md:38`)
- tests.md Cross-cutting: “`tests/guides.test.ts` | Every documented API exists…” (`tests.md:55`)
- tests.md: “Transcribe each flagship fence and assert the values its comments claim.” (`tests.md:70-72`)
- documentation.md Parity: “That proof has a home: `tests/guides.test.ts` executes the flagship fences…” (`documentation.md:37`)
- typescript.md: “Place `import type` declarations before value imports.” (`typescript.md:17`)
- typescript.md: “Every public export has complete TSDoc: description, `@param`, `@returns`, and `@example` where applicable.” (`typescript.md:74`)
- architecture.md: “Never declare or assign a function inside another function or method.” (`architecture.md:161`)
- architecture.md Class order item 1: “`#` private fields: context, options, state/result, child managers.” (`architecture.md:183`)
- architecture.md Barrel: “Barrel that class when a consumer can construct it from values they already hold. Intern it — out of the barrel, and named in the package's parity `INTERNAL` list — when its constructor requires a value only its owner produces, or when the public value is a projection of the instance rather than the instance.” (`architecture.md:266-268`)
- architecture.md: “A row obliges a documented, runnable example, so a class kept public without one is drift that parity cannot see.” (`architecture.md:271-273`)
- patterns.md: “An id list applies to those items and returns true only when all succeed.” (`patterns.md:64`)
- patterns.md: “Add `readonly on?: EmitterHooks<{Entity}EventMap>` and `readonly error?: EmitterErrorHandler` to options.” (`patterns.md:74`)
- names.md: “Never pluralize type names.” (`names.md:152`)
- writing.md Claims: “Claim only what the reader can check.” (`writing.md:38`)
- writing.md Substitutions: “`simply`, `easy`, `just` → Delete”; “`should` → `must`…”; “`via` → `through`…” (`writing.md:90-95`)
- AGENTS.md Writing: “**NEVER name a list item by its position.** Write the item's name, never its ordinal or its number.” (`/home/user/scaffold/AGENTS.md` Writing)
- AGENTS.md: “**NEVER state a count.** …” (same section)
- AGENTS.md Non-negotiable: “**ALWAYS** inspect the exact declared and installed `@orkestrel/*` capabilities…” (`AGENTS.md:51`)
- AGENTS.md Design laws: “**One concept, one term.**”; “**No superfluous wrappers.**”; “**Minimal public API.**” (`AGENTS.md:60`, `66-67`)
- documentation.md: “`guides/README.md` is the map: maintain both a concept index and a directory index.” (`documentation.md:24`)
- documentation.md: “The TSDoc voice rule governs a doc block; a guide tagline and a Surface-row description are noun phrases.” (`documentation.md:35`)

### Scope
Status paths (`/home/user/work/evidence/conform-workflow.status`), tagged against the unit brief § Scope:

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
| `src/core/cloners.ts` | owned |
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
| `tests/src/browser/*.test.ts` (four files) | owned |
| `tests/src/core/Collection.test.ts` | owned |
| `tests/src/core/*.test.ts` and nested core tests in the status list | owned |
| `tests/src/server/factories.test.ts` | owned |

No status path is `shared` or `off-limits`. `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `package.json`, `configs/**`, `.claude/**` are absent from the status file.

Hunks whose file no row **Where** names (Where only, not Repair lists), `file @@ hunk` and first `+` line:

- `README.md` `@@ -34,12 +34,12 @@` `+shipped contract. The proposed integration architecture lives with the`
- `src/browser/BrowserScheduler.ts` `@@ -14,7 +14,7 @@` `+ *   never an `as`. Where the API is absent (Firefox today, older engines),`
- `src/browser/types.ts` `@@ -5,7 +5,7 @@` `+ * never an `as`) and resolves to `undefined` when the API is absent (Safari`
- `src/core/Workflow.ts` `@@ -2,6 +2,7 @@` `+	LifecycleStatus,`
- `src/core/WorkflowRunner.ts` `@@ -75,9 +75,9 @@` (citation/`once` rewrite; first `+` in that file’s hunks is a comment/type retype)
- `src/core/cloners.ts` `@@ -48,7 +48,7 @@` causal `since` → `because`
- `src/core/errors.ts` `@@ -1,6 +1,6 @@` citation
- `src/core/factories.ts` `@@ -35,7 +35,7 @@` retype/citation
- `src/core/index.ts` `@@ -17,3 +17,4 @@` `+export * from './RunHolder.js'`
- `src/core/phases/Phase.ts` `@@ -1,12 +1,12 @@` `+	LifecycleStatus,`
- `src/core/phases/PhaseManager.ts` `@@ -6,7 +6,7 @@` citation
- `src/core/shapers.ts` `@@ -11,7 +11,7 @@` `category` / citation
- `src/core/stores/DatabaseWorkflowStore.ts` `@@ -30,7 +30,7 @@` citation
- `src/core/stores/MemoryWorkflowStore.ts` `@@ -7,7 +7,7 @@` citation
- `src/core/tasks/Task.ts` `@@ -3,6 +3,7 @@` `+import type { JSONRecord, JSONValue, Result }`
- `src/core/tasks/TaskController.ts` `@@ -34,10 +34,11 @@` `+	readonly #signal: AbortSignal`
- `src/core/tasks/TaskManager.ts` `@@ -6,7 +6,7 @@` citation
- `src/core/validators.ts` `@@ -10,7 +10,7 @@` `+import { LIFECYCLE_STATUSES, MAX_TIMER_MS } from './constants.js'`
- `tests/setup.test.ts` `@@ -2,19 +2,14 @@` import rewrite / `createGate` removal
- `tests/setupBrowser.ts` `@@ -14,7 +14,7 @@` citation
- `tests/setupServer.ts` `@@` citation
- `tests/src/browser/BrowserScheduler.test.ts` `@@` `+			const start = performance.now()`
- `tests/src/browser/FrameScheduler.test.ts` `@@` `+			const start = performance.now()`
- `tests/src/browser/IdleScheduler.test.ts` `@@` `+			const start = performance.now()`
- `tests/src/browser/factories.test.ts` `@@` `+		const start = performance.now()`
- `tests/src/core/Collection.test.ts` `@@ -0,0 +1,238 @@` `+import { isWorkflowError } from '@src/core'`
- `tests/src/core/Controller.test.ts` `@@` `Promise.withResolvers` / `just` rewrite
- `tests/src/core/RunHolder.test.ts` `@@` `@src/core` import
- `tests/src/core/Runner.test.ts` `@@` `Promise.withResolvers` / import order
- `tests/src/core/Workflow.test.ts` `@@ -5,6 +5,7 @@` `+import type { TaskEvent, WorkflowEvent } from '../../setup.js'`
- `tests/src/core/WorkflowManager.test.ts` `@@` `WorkflowRegistry` / remove cases
- `tests/src/core/WorkflowPersistence.test.ts` `@@` `Promise.withResolvers`
- `tests/src/core/WorkflowRunner.test.ts` `@@` `Promise.withResolvers` / `via`→`through`
- `tests/src/core/factories.test.ts` `@@` `performance.now` / import order
- `tests/src/core/helpers.test.ts` `@@` retype / writing
- `tests/src/core/phases/Phase.test.ts` `@@` import order / `via`
- `tests/src/core/phases/PhaseManager.test.ts` `@@` `now` deletions
- `tests/src/core/shapers.test.ts` `@@` `category` / `via` key
- `tests/src/core/stores/DatabaseWorkflowStore.test.ts` `@@` `via`/`latest`
- `tests/src/core/stores/MemoryWorkflowStore.test.ts` `@@` `via`
- `tests/src/core/tasks/Task.test.ts` `@@` import order
- `tests/src/core/tasks/TaskManager.test.ts` `@@` `via`
- `tests/src/core/validators.test.ts` `@@` `WorkflowRegistry`
- `tests/src/server/factories.test.ts` `@@` `+		const start = performance.now()`

### Residue
Diff `+` lines matching `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` (quoted from `/home/user/work/evidence/conform-workflow.diff`):

- `guides/README.md` `+backpressure, retries, and the per-attempt timeout.`
- `guides/workflow.md` `+> … concurrency / retry / abort machinery`
- `guides/workflow.md` `+| \`createRecoveredWorkflow\` … remaining retry budget`
- `guides/workflow.md` `+… invalid \`concurrency\` / \`retries\` / \`timeout\``
- `guides/workflow.md` `+| \`isSkipping\` … deadline retryable`
- `guides/workflow.md` EventMap rows containing `` `skip()` ``
- `guides/workflow.md` `+| \`RunnerEntryOptions\` … \`{ retries?, timeout? }\``
- `guides/workflow.md` `+… a newer retry owns the task.`
- `guides/workflow.md` Methods bijection listing `retries` / `timeout`
- `guides/workflow.md` Determinism paragraph `retries` / `timeout`
- `guides/workflow.md` persistence paragraph (timeout contract)
- `src/core/Controller.ts` `+	// The queue attempt's signal — … timeout.`
- `src/core/Runner.ts` comment `timeout`
- `src/core/WorkflowRunner.ts` `timeout` / `budget` comments
- `src/core/types.ts` `retries` / `timeout` persistence remarks
- `src/core/tasks/TaskController.ts` `+	// The folded attempt signal — … timeout`
- `tests/src/core/Collection.test.ts` `+		first.skip()` / `+		second.skip()` (entity method, four sites)
- `tests/src/core/WorkflowRunner.test.ts` `+describe('WorkflowRunner — per-task retries / timeout …')`
- `tests/src/core/WorkflowRunner.test.ts` `+	it('TIMEOUT WHILE PAUSED: … through the timeout raced …')`
- `tests/src/core/WorkflowRunner.test.ts` `+		const timeoutGate = Promise.withResolvers<void>()`
- `tests/src/core/phases/PhaseManager.test.ts` `+		workflow.phase('a')?.skip()` (several)
- `tests/src/core/shapers.test.ts` `+		expect(timeout.category === 'optional' && timeout.inner)`
- `tests/src/core/tasks/Task.test.ts` `+describe('Task — declarative behavior/retries/timeout PERSIST…')`

No `+` line with `it.only`, `it.todo`, `TODO`, `FIXME`, `console.`, or `debugger`.

Tree `src` + `tests` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`:

`\.skip\(` (entity `.skip()`, not Vitest `.skip`): `src/core/WorkflowRunner.ts:1008`; `tests/src/core/Collection.test.ts:116,142,193,223`; `tests/src/core/tasks/Task.test.ts:345,466,481,534,595,697,776,969`; `tests/src/core/WorkflowRunner.test.ts:632`; `tests/src/core/WorkflowPersistence.test.ts:105-106`; `tests/src/core/factories.test.ts:504,557`; `tests/src/core/phases/PhaseManager.test.ts:44,90,126,148,155,176`; `tests/src/core/phases/Phase.test.ts:146,152,190,233,234,274,332,460,704`; `tests/src/core/tasks/TaskManager.test.ts:54`; `tests/src/core/Workflow.test.ts:386,387,444,455,548,623,644,678,859,1002`.

`\.only\(`, `\.todo\(`, `TODO`, `FIXME`, `debugger`: no hit in that exclusion set. `console.`: no hit in `src` or non-excluded tests (`tests/config.test.ts:687` `console.info` is excluded).

`retry|timeout` in `src`/`tests` (domain identifiers; counts): `src/core/types.ts` 39, `WorkflowRunner.ts` 49, `tests/src/core/WorkflowRunner.test.ts` 51, `Runner.test.ts` 30, plus the count table above. Not expanded line-by-line here (see Unknowns).

### Parity
Call-signature members (`src/core/types.ts`) beside `guides/workflow.md` `## Methods` rows, for entities the diff touches:

| Entity | types.ts members | guide Methods rows |
| --- | --- | --- |
| CollectionInterface | `append` `:1409`, `add` `:1418`, `remove` `:1426`, `move` `:1435`, `update` `:1444`, `entry` `:1451`, `entries` `:1457` | `:529-535` same seven names |
| TaskManagerInterface | `append` `:1489`, `add` `:1499`, `remove` `:1507`, `move` `:1516`, `update` `:1525`, `task` `:1526`, `tasks` `:1527` | `:515-521` |
| PhaseManagerInterface | `append` `:1555`, `add` `:1565`, `remove` `:1573`, `move` `:1582`, `update` `:1591`, `phase` `:1592`, `phases` `:1593` | `:501-507` |
| TaskInterface | `start` `:897`, `complete` `:898`, `fail` `:899`, `skip` `:900`, `stop` `:901`, `report` `:908`, `pulse` `:914`, `pause` `:916`, `resume` `:918`, `wait` `:924`, `patch` `:940`, `snapshot` `:941` | `:482-493` |
| PhaseInterface | `task` `:993`, `results` `:995`, `skip` `:1004`, `stop` `:1013`, `pause` `:1031`, `resume` `:1041`, `wait` `:1053`, `add` `:1089`, `remove` `:1102`, `move` `:1114`, `update` `:1126`, `patch` `:1143`, `snapshot` `:1144` | `:462-474` |
| WorkflowInterface | `phase` `:1196`, `results` `:1198`, `skip` `:1207`, `stop` `:1216`, `complete` `:1225`, `pause` `:1245`, `resume` `:1255`, `destroy` `:1273`, `wait` `:1285`, `add` `:1318`, `remove` `:1331`, `move` `:1344`, `update` `:1356`, `snapshot` `:1357` | `:441-454` |
| WorkflowRunnerInterface | `execute` `:1932`, `:1974` (overloads) | `:541` `execute` |
| WorkflowPersistenceInterface | `checkpoint` `:1786`, `finalize` `:1792`, `detach` `:1794` | `:549-551` |
| WorkflowManagerInterface | `workflow` `:2083`, `workflows` `:2084`, `add` `:2098`, `open` `:2122`, `save` `:2136`, `remove` `:2148/:2155`, `clear` `:2156` | `:569-575` (`clear` at `:575`) |
| TaskControllerInterface | `report` `:1674`, `pulse` `:1680`, `wait` `:1686`, `results` `:1688` | `:583-586` |
| RunHolderInterface | `hold` `:1712` | `:617` `hold` |
| ControllerInterface | `wait` `:2265`, `spawn` `:2286`, `abort` `:2292` | `:625-627` |
| RunnerInterface | `execute` `:2410`, `spawn` `:2429`, `abort` `:2437`, `pause` `:2448`, `resume` `:2458`, `stop` `:2476`, `destroy` `:2482` | `:603-609` |
| SchedulerInterface | `yield` `:2186`, `delay` `:2188` | `:594-595` |
| WorkflowStoreInterface | `get`/`set`/`delete` (table `:635-637`) | `:635-637` |

Readonly data vs Surface/Entities (sample of diff-touched types):

- `RunHolderInterface.runner` `types.ts:1706` — Surface `guides/workflow.md:410` `{ runner }` + Methods note `:613`
- `ControllerInterface` `id` `:2249`, `input` `:2250`, `signal` `:2252`, `aborted` `:2253` — Surface `:423`; Methods `:621` says those are Surface rows
- `RunnerInterface` `emitter` `:2392`, `active` `:2393`, `stopped` `:2394`, `paused` `:2396` — Surface `:427`
- `WorkflowManagerInterface.count` `:2082` — Surface `:419`
- `CollectionInterface.count` `:1399` — Surface `:405`; Methods `:525`
- `WorkflowPersistenceInterface.fault` `:1777` — Surface `:414`; Methods `:545`
- `TaskInterface.status` `:856` `LifecycleStatus` — Surface `:401`
- `LifecycleStatus` type `:354` — Surface `:383`
- `WorkflowRegistry` `:1637` — Surface `:407`

Backticked identifiers in guide sentences the diff **added** (new `+` prose, not whole-file rewrite of existing fences), and barrel export:

| Identifier | Added where | Barrel |
| --- | --- | --- |
| `queue.md` / `@orkestrel/queue` / `Runner` / `Queue` / `QueueInterface` | `guides/README.md:56-59` | `Runner` yes `src/core/index.ts:19`; `Queue`/`QueueInterface` are `@orkestrel/queue`, not this barrel |
| `test.md` / `@orkestrel/test` | `guides/README.md:70-71` | not this package |
| `scaffold.md` / `@orkestrel/scaffold` | `guides/README.md:76-77` | not this package |
| `probe.md` / `@orkestrel/probe` | `guides/README.md:82-83` | not this package |
| `RunHolder` / `RunHolderInterface` | `guides/workflow.md:125` | `RunHolder` `src/core/index.ts:20`; interface via `export * from './types.js'` `:1` |
| `WorkflowRegistry` | `guides/workflow.md:407` | via `types.js` barrel |
| `LIFECYCLE_STATUSES` / `TERMINAL_STATUSES` | `guides/workflow.md:353-354` | via `constants.js` `src/core/index.ts:5` |
| `plan/PROPOSAL.md` / `@orkestrel/supervisor` | `README.md:38` | not this package |
| `.` / `./browser` / `./server` | `README.md:42-44` | package exports, not `src/*/index.ts` symbols |
| `definitionToSnapshot` / `Workflow` | `Workflow.ts` `@example` (TSDoc, not guide `+` sentence) | both barrelled `src/core/index.ts:4,11` |

`src/browser/index.ts:1-6` exports types, constants, BrowserScheduler, FrameScheduler, IdleScheduler, factories. `src/server/index.ts:1-2` NodeScheduler, factories.

### Gates
Report § Gates (verbatim):

| Command | Exit | Evidence |
| ------- | ---- | -------- |
| `npm run format:check` | 0 | `gate-1-format.txt` — "All matched files use the correct format", 106 files |
| `npm run lint:check` | 0 | `gate-2-lint.txt` |
| `npm run check` | 0 | `gate-3-check.txt` |
| `npm run build` | 0 | `gate-4-build.txt` |
| `npm test` | 0 | `gate-5-test.txt` |

Capture files exist. `gate-1-format.txt` contains “All matched files use the correct format”. `gate-5-test.txt` Tests lines: `Tests  877 passed (877)`; `Tests  111 passed (111)`; `Tests  46 passed (46)`; `Tests  25 passed (25)`; `Tests  98 passed (98)`. Capture files do not print a process `exit_code` field.

### Breaking
Report § Breaking rows: subj-8 Hooks removed; subj-9 status constants removed/renamed; subj-10 `TaskStatus`/`PhaseStatus`/`WorkflowStatus` removed; subj-11 `WorkflowFunctions`→`WorkflowRegistry`; subj-14 `RunnerValue`/`RunnerFailure` removed. Consumers named: toolbox for subj-10 and subj-11; none in fleet for 8, 9, 14; vendored mirrors at wave.

Word-boundary sweep of old published names across `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/workflow`, and vendored `guides/workflow.md` mirrors:

- `WorkflowHooks` / `PhaseHooks` / `TaskHooks`: no hit
- `PHASE_STATUSES` / `WORKFLOW_STATUSES` / `TASK_STATUSES` / `TERMINAL_TASK_STATUSES`: no hit in src/tests
- `RunnerValue` / `RunnerFailure`: no hit
- `WorkflowFunctions`: `toolbox/src/core/types.ts:7,167,186`; `toolbox/src/core/factories.ts:8,320,325`; `toolbox/tests/src/core/factories.test.ts:6,600`
- `WorkflowStatus`: `toolbox/src/core/types.ts:9,125,126`
- `TaskStatus`: `toolbox/tests/src/core/helpers.test.ts:5,152`; `mcp/tests/setupConformance.ts:501,503,505,510,512,517,519,524,525,527` (A2A `$defs` paths)
- `PhaseStatus`: no src/tests hit outside excluded mirrors
- `scaffold/src`: no hit for any of these names

### Writing sweep
Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b` on diff `+` lines in `guides/**`, `README.md`, src doc comments, test titles/comments. Hits (mapped to tree where the `+` text still sits):

- `guides/workflow.md:61` long `+` paragraph (tool matched the `+` line; body has `ONCE`, not `now`)
- `guides/workflow.md:154` `just before the next paint`
- `guides/workflow.md:256` `a new index`
- `guides/workflow.md:541` `once across all runner instances`
- `guides/workflow.md:663` (Methods/contract prose `new` / `once` in the long invariant row)
- `guides/workflow.md:958` `the new task`
- `guides/workflow.md:1044` `a new persisted attempt` / `not a new logical`
- `guides/workflow.md:1421` `create a new one`
- `src/core/Runner.ts:83` `+readonly #values = new Map…` (`new` constructor)
- `src/core/Runner.ts` `+this.#failure = failure(reason === undefined ? new Error('runner aborted')`
- `src/core/Workflow.ts:93` `+ * const workflow = new Workflow…`
- `src/core/WorkflowPersistence.ts` `+ * const persistence = new WorkflowPersistence…`
- `src/core/types.ts` `+	/** Reports whether the runner is paused … no new dispatch`
- `tests/guides.test.ts:258` `+		const store = new Collection<…>`
- `tests/src/browser/*.test.ts` and factories/Scheduler `+const start = performance.now()` / `+expect(performance.now() - start)` (`now` inside `performance.now`)
- `tests/src/core/shapers.test.ts:204` `+	it('rejects the old object-form behavior ({ via, name })`
- `tests/src/core/WorkflowRunner.test.ts` `+		if (rejected.success) throw new Error(…)`
- `tests/src/core/WorkflowRunner.test.ts` `+		const gateMap = new Map<…>`
- `tests/setup.ts` `+	return new Collection<…>` (`buildCollection`)

Count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` over those same `+` prose populations in the current tree of `guides/workflow.md`, `guides/README.md`, `README.md`: no hit.

Current-tree (not only `+`) extra hits already listed under subj-2: `via` at `tests/setup.ts:389`, `shapers.test.ts:204,212`, `helpers.test.ts:44`; `just` at `guides/workflow.md:154`; `Date.now()` sites; `new` constructor/prose sites above.

## Distillate

- workflow-obj-1: site now `tests/guides.test.ts:207` (brief `:1-181` still header) | diff present yes | old form hits 0 | report matches yes (`:148` keyword yes)
- workflow-obj-2: site now `Collection.ts:44` + `Collection.test.ts` via `buildCollection` | diff present yes (test file) | old form hits 0 | report matches partial (inline `new Collection` moved to `tests/setup.ts`; Fix round 2 says so)
- workflow-obj-3: site now `Scheduler.test.ts:78` `performance.now` | diff present yes | old form hits 4 (`Date.now` stamps+comment) | report matches yes (`helpers.test.ts:1520`)
- workflow-obj-4: site now `setup.ts:178` `PromiseWithResolvers` (brief `:181-189` gone) | diff present yes | old form hits 0 | report matches yes
- workflow-obj-5: site now `IdleScheduler.ts:1-5` type-first | diff present yes | old form hits 0 | report matches yes
- workflow-obj-6: site now `RunHolder.ts:19`, barrel `:20`, example `:33`, guide `:125` | diff present yes | old form hits 0 | report matches yes
- workflow-obj-7: site now `WorkflowPersistence.ts:20-28` `@example`; `Workflow.ts:84-97` constructor example | diff present yes | old form hits 0 | report matches yes
- workflow-obj-11: site now `Controller.ts:32-74`; `TaskController.ts:37-80` | diff present yes | old form hits 0 (impl `readonly id` field) | report matches yes
- workflow-subj-1: site now `types.ts:13` named section | diff present yes | old form hits 0 numbered `§` in owned src/tests/package guides | report matches partial (`guides/README.md:89` still `§ Parity`)
- workflow-subj-2: site now `workflow.md:61` no `simply`; README `:37` no `now` | diff present yes | old form hits residual permitted `just`/`via`/`Date.now` | report matches yes on those residuals
- workflow-subj-3: site now `workflow.md:5` “layers”; README `:42` no “three” | diff present yes | old form hits 0 | report matches yes
- workflow-subj-4: site now `workflow.md:67` noun phrase | diff present yes | old form hits 0 on listed Surface rows | report matches yes
- workflow-subj-5: site now `guides/README.md:56-85` four paragraphs | diff present yes | old form hits 0 | report matches yes
- workflow-subj-6: site now `WorkflowManager.ts:149` `let removed = true`; guide `:574`; types `:2146` | diff present yes | old form hits 0 | report matches partial (cited `types.ts:2104` is now `open`)
- workflow-subj-8: site now `types.ts:739/759/779` inline `EmitterHooks` | diff present yes | old form hits 0 owned | report matches yes
- workflow-subj-9: site now `constants.ts:21/38` `LIFECYCLE_STATUSES`/`TERMINAL_STATUSES` | diff present yes | old form hits 0 owned | report matches yes
- workflow-subj-10: site now `types.ts:354` only; aliases gone | diff present yes | old form hits 0 owned; fleet toolbox+mcp | report matches yes (breaking names toolbox)
- workflow-subj-11: site now `types.ts:1637` `WorkflowRegistry` | diff present yes | old form hits 0 owned; fleet toolbox | report matches yes
- workflow-subj-12: site now `helpers.ts:903-915` | diff present yes | old form hits 0 | report matches yes
- workflow-subj-13: site now `helpers.ts:871-878` `@param functions` + `WorkflowRegistry` | diff present yes | old form hits 0 | report matches yes
- workflow-subj-14: site now `Runner.ts:83/402/411`; types no `RunnerValue` | diff present yes | old form hits 0 | report matches yes
- fleet-F1: site now `setup.ts:523` helper kept; browser tree present | diff present no (no delete) | old form hits 2 files | report matches partial (line `508` vs `523`)
- fleet-F2: site now `Controller.ts:32` `#id` | diff present yes (obj-11 hunks) | old form hits 0 | report matches yes

Scope tags: every status path `owned`; none `shared`/`off-limits`.

Residue: no `it.only`/`it.todo`/`TODO`/`FIXME`/`debugger`/`console.` in owned `src`+non-excluded tests; `\.skip\(` hits are entity `skip()`; diff `+` also has `retry`/`timeout` domain words and `first.skip()`.

Writing: `just` `guides/workflow.md:154`; `via` test fixtures `setup.ts:389` `shapers.test.ts:204,212`; `performance.now` / `Date.now` / `new` constructors; count-pattern no hit on package guides/README.

Parity table: Methods names line up for Collection, managers, Workflow/Phase/Task, Runner, Controller, RunHolder (`hold` only), Persistence, WorkflowManager, Scheduler, Store; `RunHolder` barrelled `src/core/index.ts:20`; added guide backticks `WorkflowRegistry` `LIFECYCLE_STATUSES` `RunHolder` exported; `Queue`/`@orkestrel/test`/`scaffold`/`probe` not this barrel.

## Unknowns

- Residue `retry|timeout` tree listing: file counts collected; every `file:line` for those two tokens in `src`/`tests` not enumerated (138+ matches in `src/core/types.ts` and `WorkflowRunner.test.ts` alone).
- Writing sweep: some `+` hits identified via the diff file’s own line numbers; not every src doc-comment `+` line was re-mapped to a post-edit `file:line` when the hunk was a copy of an existing paragraph.
- Unnamed-hunk first `+` lines: several test files listed with hunk presence but not every `@@` header’s first `+` quoted (multi-hunk files).
- Gate process exit codes: not printed inside `gate-*.txt`; only stdout/stderr bodies read.
- `mcp/tests/setupConformance.ts` `TaskStatus` identity (A2A schema vs workflow alias) not proven beyond the string match.
- `obj-7-guides.txt` `Tests  88 passed` vs later `98` in `gate-5-test.txt` / `obj-1-control-green.txt`: two different moments; which guides count binds to obj-7 is not re-run here.

## Journal

## Deviation

No file was created, edited, or deleted in this lane. No command that writes the tree was run. All named inputs were readable. Sweeps used Grep/Read over `/home/user/fleet/workflow`, `/home/user/work/evidence/*`, `/home/user/scaffold/.claude/rules/`, `/home/user/fleet/{toolbox,mcp,agent,test}`, `/home/user/scaffold/src`. The `retry|timeout` tree residue was not fully line-quoted.
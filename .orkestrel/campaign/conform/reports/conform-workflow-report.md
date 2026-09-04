# Unit conform-workflow — report

Every row is `applied` or `noop`. No row `stopped`. All five gates exit 0 in `/home/user/fleet/workflow`.

## Consumer edits taken

Applied first, before any row, from the addendum.

| # | Edit | Site now | Verified |
| - | ---- | -------- | -------- |
| 1 | queue's `QueueExecution` → `QueueContext` | `src/core/Runner.ts:4` imports `QueueContext`; `#dispatch(unit, context: QueueContext)` at `src/core/Runner.ts:351`; the `execution.signal` prose at `:353`, `:359` and the read at `:370` all read `context` | `npm run check` exit 0 |
| 2 | contract's `type` → `category` discriminant | `tests/src/core/shapers.test.ts` — every shape-descriptor `type:` literal and `.type` read now reads `category`; a `\.type\|type:` sweep over the file returns empty | `addendum-shapers-after.txt` — 15 passed |
| 3 | guide's `symbol.kind` → `symbol.keyword` | `tests/guides.test.ts:148` reads `.filter((symbol) => symbol.keyword === 'function')` | `addendum-guides-after.txt` — 88 passed |

Edit 2 covered the shape-descriptor sites the report named plus the `type: 'literal'` literals inside the `bail` `toMatchObject` blocks the report's line list omitted; the installed `@orkestrel/contract` declares `readonly category` at `node_modules/@orkestrel/contract/dist/src/core/index.d.ts:1798-1810`, so leaving those would have reddened the file.

`guides/queue.md:74` still names `QueueExecution`. It is a vendored mirror and refreshes at the wave, not here.

## Rows

| Row | Disposition | Where it landed |
| --- | ----------- | --------------- |
| workflow-obj-1 | applied | `tests/guides.test.ts` — appended `describe('flagship fences', …)` transcribing and executing the opening runner fence, the positional-collection fence, the contract fence, the append fence, and the derivation fence, each behaviour case paired with a presence guard reading the fence text out of `files['guides/workflow.md']`. Imports through `@src/core`, runs in the existing `guides` project; no project entry added. |
| workflow-obj-2 | applied | New `tests/src/core/Collection.test.ts` in `src:core` over a real `new Collection<TaskInterface, TaskUpdate>('task', compileGuard(taskUpdateShape))` driven with live tasks from `createWorkflow(buildWorkflowDefinition())`. Imports the class through `@src/core`. |
| workflow-obj-3 | applied | `performance.now()` replaces both readings of each interval pair in `tests/src/core/Scheduler.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/browser/{FrameScheduler,BrowserScheduler,IdleScheduler,factories}.test.ts`, `tests/src/server/factories.test.ts`. Thresholds unchanged. |
| workflow-obj-4 | applied | Deleted `TestGateInterface` and `createGate` from `tests/setup.ts`; every call site now reads `Promise.withResolvers<T>()` and every type reference `PromiseWithResolvers<T>`, including the `WorkflowStoreBoundary` fields and constructor parameters. Removed the `createGate` proof from `tests/setup.test.ts` with no replacement. |
| workflow-obj-5 | applied | `src/browser/IdleScheduler.ts` and the seven named test files now place every `import type` ahead of the first value import, with no blank line between consecutive same-kind imports. |
| workflow-obj-6 | applied | `export * from './RunHolder.js'` added to `src/core/index.ts`; `'class RunHolder'` removed from `INTERNAL` in `tests/guides.test.ts`; the `@example` import at `src/core/RunHolder.ts:33` folded to `import { createRunner, RunHolder } from '@orkestrel/workflow'`; a `RunHolder` row added to the execution-substrate class table at `guides/workflow.md:125`; `tests/src/core/RunHolder.test.ts` re-pointed to `@src/core`. |
| workflow-obj-7 | applied | `WorkflowPersistence` takes the existing guide fence transcribed verbatim as its class `@example`; `Workflow` takes an `@example` exercising the published constructor — `new Workflow(definitionToSnapshot(definition))` then reads of `status`, `phase('build')?.task('compile')?.status`, and `snapshot().id`. |
| workflow-obj-11 | applied | `Controller` converts `id` / `input` / `signal` to `readonly #id` / `#input` / `#signal` declared with `#abort` and `#spawn`, with getters above `get aborted()`; `wait()` reads `this.#signal`. `TaskController` converts `signal` / `input` / `task` / `attempt` the same way, keeping the `this.#task = task.context` derivation, with every internal `this.signal` read moved to `this.#signal`. |
| workflow-subj-1 | applied | Every `§` citation deleted or re-pointed across `src/**`, `tests/**`, `guides/workflow.md`, `guides/README.md`. Vendored dependency guides untouched. |
| workflow-subj-2 | applied | Substitution table applied across `guides/workflow.md` and `README.md`, plus the `currently` in `src/core/types.ts`. Temporal `once` swept and ruled by sense. |
| workflow-subj-3 | applied | Counts deleted and the named members left to carry each sentence. |
| workflow-subj-4 | applied | Every imperative Surface-row description rewritten as a noun phrase across the Factories, Environment-backend, Errors, and Helpers-and-guards tables. `## Methods` tables untouched. |
| workflow-subj-5 | applied | `guides/README.md` § Dependency reference gains a paragraph for `queue.md`, `test.md`, `scaffold.md`, and `probe.md`, in the form the existing paragraphs use. The mirrored files themselves untouched; neither index changed. |
| workflow-subj-6 | applied | `src/core/WorkflowManager.ts` inverts the accumulator; `#invalidate` and `#additions.delete` stay unconditional. TSDoc added to both `remove` overloads in `src/core/types.ts`; guide row and interface `@remarks` updated. |
| workflow-subj-8 | applied | `WorkflowHooks` / `PhaseHooks` / `TaskHooks` deleted from `src/core/types.ts`; `EmitterHooks<TaskEventMap>` / `<PhaseEventMap>` / `<WorkflowEventMap>` written inline at their three option positions; Surface rows deleted. |
| workflow-subj-9 | applied | Landed with workflow-subj-10 in one edit. `PHASE_STATUSES` and `WORKFLOW_STATUSES` deleted; `TASK_STATUSES` → `LIFECYCLE_STATUSES`, `TERMINAL_TASK_STATUSES` → `TERMINAL_STATUSES`, retyped `readonly LifecycleStatus[]`; `src/core/validators.ts`, `src/core/helpers.ts`, the `constants.ts` header, and the guide Constants rows updated. |
| workflow-subj-10 | applied | `TaskStatus` / `PhaseStatus` / `WorkflowStatus` deleted from `src/core/types.ts`; every member, parameter, and return retyped `LifecycleStatus`, with the tier sentence kept in each member's own TSDoc. The `LifecycleStatus` `@remarks` rewritten so it no longer claims the deleted aliases serve the one-concept rule. Surface rows folded into the `LifecycleStatus` row. No branded types introduced. |
| workflow-subj-11 | applied | `WorkflowFunctions` → `WorkflowRegistry` at its declaration and every reference in `src/core/{types,helpers,Workflow,factories,WorkflowManager}.ts`, `src/core/phases/Phase.ts`, four test files, and the guide Surface row. The `functions` option key unchanged. |
| workflow-subj-12 | applied | `scanSnapshotContext` in `src/core/helpers.ts` takes a complete block: first sentence kept, `@remarks` on where the walk stops, `@param value`, and a prose `@returns`. |
| workflow-subj-13 | applied | `hasWorkflowHandlers` gains `@param functions` and a `@remarks` sentence stating the parameter belongs to the snapshot overload alone. Written as `WorkflowRegistry`, since workflow-subj-11 landed first. |
| workflow-subj-14 | applied | `src/core/Runner.ts` types `#values` as `Map<string, Success<TResult>>` and `#failure` / `#cleanup`'s return / `cleanupFailure` as `Failure<unknown>`; stores the narrowed outcome directly at `#settle`; constructs every failure through the already-imported `failure` helper. `RunnerValue` and `RunnerFailure` deleted from `src/core/types.ts` with their imports and Surface rows. Every `.value` and `.error` read unchanged. |
| fleet-F1 | noop | This workspace has a browser environment, so the rule's own exemption applies. `src/browser/` holds `BrowserScheduler.ts`, `FrameScheduler.ts`, `IdleScheduler.ts`, `constants.ts`, `factories.ts`, `index.ts`, `types.ts`; `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` both exist. `isBrowserVuePath` remains at `tests/setup.ts:523` with its `describe` block at `tests/setup.test.ts:423`, untouched. |
| fleet-F2 | applied by workflow-obj-11 | `Controller` was the only class carrying the shape (`readonly id: string` ahead of `#abort` / `#spawn`), and workflow-obj-11 performed exactly the prescribed conversion. Before applying it I read every `JSON.stringify` in `src` and `tests`: every hit serializes a snapshot or a contract schema, none a `Controller` or `TaskController` instance, so no `stop` was owed. A sweep for module-indent `readonly` across `src` returns only `types.ts` / `browser/types.ts` interface members and `errors.ts:22-23`, which is the `Error` subclass's own shape and carries no `id`. |

## Files touched

`src`:

- `src/core/types.ts` — status aliases, hooks aliases, `RunnerValue` / `RunnerFailure` deleted; `WorkflowRegistry` rename; `remove` overload TSDoc; `§` citations cleared.
- `src/core/constants.ts` — `LIFECYCLE_STATUSES` / `TERMINAL_STATUSES`; tier constants deleted.
- `src/core/helpers.ts` — `LifecycleStatus` retyping, `TERMINAL_STATUSES`, `WorkflowRegistry`, `scanSnapshotContext` and `hasWorkflowHandlers` TSDoc.
- `src/core/validators.ts` — reads `LIFECYCLE_STATUSES`.
- `src/core/Runner.ts` — `QueueContext`; `Success` / `Failure` replace the deleted boxes.
- `src/core/Controller.ts`, `src/core/tasks/TaskController.ts` — `#` fields then getters.
- `src/core/WorkflowManager.ts` — batch `remove` reports true only when every id was removed.
- `src/core/index.ts` — `RunHolder` barrelled.
- `src/core/RunHolder.ts` — `@example` imports the published specifier.
- `src/core/Workflow.ts`, `src/core/WorkflowPersistence.ts` — class `@example` added; retyping; citations.
- `src/core/{Collection,errors,factories,shapers,WorkflowRunner}.ts`, `src/core/phases/{Phase,PhaseManager}.ts`, `src/core/tasks/{Task,TaskManager}.ts`, `src/core/stores/{MemoryWorkflowStore,DatabaseWorkflowStore}.ts` — retyping and citation removal.
- `src/browser/{IdleScheduler,BrowserScheduler,types}.ts` — import order and citation removal.

`tests`:

- `tests/src/core/Collection.test.ts` — new.
- `tests/guides.test.ts` — `symbol.keyword`; `RunHolder` un-interned; flagship fences appended.
- `tests/setup.ts`, `tests/setup.test.ts` — gate helper deleted; citations.
- `tests/{setupBrowser,setupServer}.ts` — citations.
- `tests/src/core/{Runner,WorkflowRunner,WorkflowManager,WorkflowPersistence,Controller,helpers,factories,validators,shapers,Workflow,Scheduler,RunHolder}.test.ts`, `tests/src/core/{phases,tasks,stores}/*.test.ts`, `tests/src/browser/*.test.ts`, `tests/src/server/factories.test.ts` — gate replacement, retyping, import order, `performance.now()`, citations.

Docs: `guides/workflow.md`, `guides/README.md`, `README.md`.

## Diffstat

`git status --short` lists only files under Owned; `tests/src/core/Collection.test.ts` is added and every other path modified. No vendored file, no `package.json`, no `configs/`, no `.claude/`.

## Failing-first controls

Each command was run bare and its output captured under `/home/user/work/evidence/workflow-proofs/`.

| Row | Command | Red before | Green after |
| --- | ------- | ---------- | ----------- |
| workflow-subj-6 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/WorkflowManager.test.ts` | 2 failed, 47 passed — `subj-6-control-red.txt` | 49 passed — `subj-6-control-green.txt` |
| workflow-obj-2 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/Collection.test.ts` | 3 failed, 12 passed — `obj-2-control-red.txt` | 15 passed — `obj-2-control-green.txt` |
| workflow-obj-1 | `npm run test:guides` | 1 failed, 97 passed — `obj-1-control-red.txt` | 98 passed — `obj-1-control-green.txt` |

The workflow-subj-6 control is the row's own defect: the renamed case expecting `remove(['a', 'missing'])` to be `false` and the new empty-list case were written before the accumulator was inverted, and both reddened.

The workflow-obj-2 and workflow-obj-1 controls are planted defects, since each row adds a proof rather than fixing one. Each plant was made in a file the row itself owns and removed by editing that same line back:

- workflow-obj-2 planted `src/core/Collection.ts` `#pending` to return the target regardless of status. It reddened the three settled-target refusal cases and left the rest green.
- workflow-obj-1 planted `src/core/helpers.ts` `deriveBoundary` to use `findLastIndex`. It reddened exactly the derivation fence's value assertion (`expected 3 to be 2`) while every name-parity and presence assertion stayed green — which is the property the row exists to add.

## Sweeps

Every sweep ran through the Grep tool over the named population; the population excludes `node_modules` and the vendored dependency guide mirrors, which the rows leave untouched.

| Pattern | Population | Result |
| ------- | ---------- | ------ |
| `§[0-9]` | `src/**`, `tests/**` | empty |
| `§` | `guides/workflow.md`, `guides/README.md`, `README.md` | recorded empty, and that reading is FALSE — the sweep returns `guides/README.md:89` and `guides/workflow.md:1462`. Both are the named-section citation form this row prescribes, and every section they cite exists (`AGENTS.md` § Design laws, `.claude/rules/names.md` § Fixed lifecycle vocabulary, `.claude/rules/typescript.md` § Errors and outcomes, `.claude/rules/documentation.md` § Parity), so the row supports its conclusion after all: no numbered-section form survives and no tree change is owed |
| `§[0-9]` | whole checkout minus `node_modules` | recorded as hitting `guides/{budget,queue,timeout,abort,contract}.md`, and that reading is FALSE — it names fewer files than the sweep returns. The sweep hits `guides/{abort,budget,contract,database,emitter,guide,queue,timeout}.md`. Every one is a vendored dependency guide mirror, outside this unit's Owned set and correctly untouched, so the conclusion stands: no authored file carries the numbered-section form |
| `\b(WorkflowFunctions\|TaskStatus\|PhaseStatus\|WorkflowStatus\|TASK_STATUSES\|TERMINAL_TASK_STATUSES\|PHASE_STATUSES\|WORKFLOW_STATUSES\|RunnerValue\|RunnerFailure\|WorkflowHooks\|PhaseHooks\|TaskHooks\|createGate\|TestGateInterface\|QueueExecution)(s\|es\|ed\|ing)?\b`, case-insensitive | `guides/workflow.md`, `guides/README.md`, `README.md` | empty |
| same base pattern | `src/**/*.ts`, `tests/**/*.ts` | only `derivePhaseStatus` / `deriveWorkflowStatus`, the retained helper names the rows keep |
| `Date.now()` | `tests/**` | only the three wall-clock stamps at `helpers.test.ts:1520`, `Workflow.test.ts:368`, `tasks/Task.test.ts:283`, plus the explanatory comment at `server/NodeScheduler.test.ts:69` |
| `\bcurrently\b`, `\bsimply\b`, `\bvia\b`, case-insensitive | `src/**` | empty |
| `\be\.g\.\b`, case-insensitive | `src/**` | recorded empty, and that reading is FALSE — a terminal `\b` cannot follow the pattern's final period, so the pattern matched nothing it was written to find. Superseded by the corrected `\be\.g\.` / `\bi\.e\.` sweep under Fix round 2 |
| `\b(one\|two\|…\|ten)\b`, case-insensitive | `README.md`, `guides/README.md` | empty |
| `\b\d+ (elements\|members\|rules\|rows\|exports\|files\|options\|steps\|cases\|stages\|findings\|tests\|helpers\|methods\|entities\|tables\|sections\|constants\|passes\|categories\|levels\|tiers\|layers\|backends\|overloads\|primitives)\b`, case-insensitive | `src/**`, `tests/**`, `guides/workflow.md`, `guides/README.md`, `README.md` | empty |
| `^import \{…\} from …` followed by `^import type` (multiline) | `src/**`, `tests/**` | empty — no type-after-value inversion remains |
| `LIFECYCLE_STATUSES\|TERMINAL_STATUSES\|WorkflowRegistry` before the rename | `src`, `tests`, `guides/workflow.md`, `README.md` | empty — each new name collided with nothing |

Number-word hits retained as permitted, each ruled by sense: `one` as an article throughout; `two optional description values` (a function's fixed arity); `two holders stay independent` (a fixed test scenario). Temporal `once` retained where it means "one time": `guides/workflow.md` lines 11, 129, 541, 599, 772, 1252, 1262 among the same-sense hits; the temporal sense was rewritten to `after` at the `pause` rows, the `TaskControllerInterface` paragraph, the `await waiter` fence comment, and the opening fence's "starts only after phase `build` has fully settled". `just before the next paint` retained as permitted at `guides/workflow.md:154`, `src/browser/FrameScheduler.ts:6` and `:35`, and `src/browser/factories.ts:37`.

## Gates

Run in order, bare, in `/home/user/fleet/workflow`. Output captured under `/home/user/work/evidence/workflow-proofs/`.

| Command | Exit | Evidence |
| ------- | ---- | -------- |
| `npm run format:check` | 0 | `gate-1-format.txt` — "All matched files use the correct format", 106 files |
| `npm run lint:check` | 0 | `gate-2-lint.txt` |
| `npm run check` | 0 | `gate-3-check.txt` |
| `npm run build` | 0 | `gate-4-build.txt` |
| `npm test` | 0 | `gate-5-test.txt` |

`npm test` per project: `src` 27 files / 877 tests, `policy` 1 / 111, `config` 1 / 46, `setup` 3 / 25, `guides` 1 / 98. All passed.

Before the acceptance run I ran the mutating `npx oxlint --fix` then `npx oxfmt --write` to converge, then proved with the non-mutating checks in the order above.

## Observations, not criteria

**A timing failure under concurrent load, cleared on re-run.** The first `npm run test:src` after workflow-obj-3 landed reported `tests/src/core/Scheduler.test.ts > delay > does not resolve before its requested interval` red at `expected 19.438079000000016 to be greater than or equal to 20` (`mid-test-src.txt`, 1 failed / 861 passed). The same file alone was green (`obj-3-scheduler-alone-1.txt`, 15 passed), and the immediate re-run of the whole `test:src` chain was green (`obj-3-test-src-rerun.txt`, 26 files / 862 tests), as was the acceptance `npm test`. The assertion is the one `tests/src/server/NodeScheduler.test.ts:75-82` already carries verbatim against `NodeScheduler`, and that sibling passed in the same red run. I am reporting the reading rather than diagnosing it: per the standing conditions the deciding re-run belongs to the Orchestrator after this unit exits. One hypothesis: libuv's loop clock has millisecond granularity, so a `setTimeout(20)` can settle marginally under 20 ms measured on the sub-millisecond `performance.now()` — a property `Date.now()`'s coarseness previously masked, and one that would surface under load on either scheduler.

**A nested arrow function outside this unit's rows.** `tests/src/core/RunHolder.test.ts:41` declares `const readActive = (): RunnerInterface<TaskInterface, void> | undefined => holder.runner` inside a test body, which `.claude/rules/architecture.md` § Functions and orchestration bans. No row of this brief names it and I only re-pointed that file's import, so I left it and record it here against the capability that owns it.

## Breaking

These rows move the published surface. No fleet code consumer exists for `workflow-subj-8`, `workflow-subj-9`, or `workflow-subj-14`; `workflow-subj-10` and `workflow-subj-11` reach `@orkestrel/toolbox`.

| Row | Removed or renamed | Consumers |
| --- | ------------------ | --------- |
| workflow-subj-8 | `WorkflowHooks`, `PhaseHooks`, `TaskHooks` removed | none in fleet; `agent/guides/workflow.md` and `toolbox/guides/workflow.md` are vendored mirrors, refreshed at the wave |
| workflow-subj-9 | `PHASE_STATUSES`, `WORKFLOW_STATUSES` removed; `TASK_STATUSES` → `LIFECYCLE_STATUSES`; `TERMINAL_TASK_STATUSES` → `TERMINAL_STATUSES` | none in fleet |
| workflow-subj-10 | `TaskStatus`, `PhaseStatus`, `WorkflowStatus` removed; every position now `LifecycleStatus` | `@orkestrel/toolbox` |
| workflow-subj-11 | `WorkflowFunctions` → `WorkflowRegistry` | `@orkestrel/toolbox` |
| workflow-subj-14 | `RunnerValue`, `RunnerFailure` removed | none in fleet |

A further row moves published behaviour rather than a symbol, so it sits under the table rather than in it. `workflow-subj-6` changes the value `WorkflowManagerInterface.remove(ids[])` returns: a partial batch, where some requested id is absent, returns `false` where it returned `true`, and an empty batch returns `true` where it returned `false`. The signature is unchanged, so a consumer reads the difference only at the return value. No fleet consumer calls it: `grep -rn 'WorkflowManager' --include=*.ts --include=*.vue /home/user/fleet/*/src /home/user/fleet/*/app` returns no hit outside `/home/user/fleet/workflow/src` itself (exit 1). The row therefore obliges a release note and no consumer patch.

## Shared-file patches

For toolbox's L6 unit. I did not edit these files. Each substitution below was read at its current site in `/home/user/fleet/toolbox`.

`toolbox/src/core/types.ts` — replace the `@orkestrel/workflow` type import block at lines 4-11:

```ts
import type {
	LifecycleStatus,
	WorkflowFault,
	WorkflowFunction,
	WorkflowRegistry,
	WorkflowRunnerInterface,
	WorkflowStoreInterface,
} from '@orkestrel/workflow'
```

Then at line 125-126:

```ts
	/** Holds the run's terminal {@link LifecycleStatus}. */
	readonly status: LifecycleStatus
```

And at lines 167 and 186, each `readonly functions?: WorkflowFunctions` becomes `readonly functions?: WorkflowRegistry`.

`toolbox/src/core/factories.ts` — replace the `@orkestrel/workflow` type import block at lines 5-11:

```ts
import type {
	WorkflowDefinition,
	WorkflowFunction,
	WorkflowRegistry,
	WorkflowRunnerInterface,
	TaskControllerInterface,
} from '@orkestrel/workflow'
```

Then at line 320 the return annotation `): WorkflowFunctions {` becomes `): WorkflowRegistry {`, and at line 325 `const functions: WorkflowFunctions =` becomes `const functions: WorkflowRegistry =`.

`toolbox/tests/src/core/factories.test.ts` — at line 6:

```ts
import type { WorkflowDefinition, WorkflowFunction, WorkflowRegistry } from '@orkestrel/workflow'
```

Then at line 600, `const invalid: WorkflowFunctions = { leaf: () => 'leaf' }` becomes `const invalid: WorkflowRegistry = { leaf: () => 'leaf' }`.

Toolbox's own `createWorkflowFunctions` factory keeps its name at `toolbox/src/core/factories.ts:317` and every call site: workflow-subj-11's rule reaches type names alone, and a factory named for the registry it builds is correct.

## Deviations

None. No row's repair contradicted a rule, collided with an existing name, required a file outside Owned, or required a consumer edit to keep this package's gates green.

Ancillary questions decided and carried on from, per the deviation contract:

1. **`tests/src/core/helpers.test.ts` tier case.** workflow-subj-10 removed the tier aliases that a case named "accepts a value typed at each tier (task / phase / workflow) through one predicate" existed to prove. Rather than delete the case, I retyped its three bindings `LifecycleStatus` and renamed it for what it now proves — that one predicate rules on a status read from a task, a phase, and a workflow position. Coverage unchanged.
2. **New-test case names.** The `Collection` and flagship-fence cases are named for what each proves.
3. **Guide paragraph placement.** The four new `guides/README.md` dependency paragraphs sit in the existing section, with `queue.md` before `guide.md` so the runtime dependency precedes the development ones.
4. **Two guide sentences beyond the letter of their row.** `guides/workflow.md` "a caller now has a THIRD, higher-level option" carried both a banned `now` and an ordinal naming a list item by position; I rewrote it to "a caller has a further, higher-level option" while applying workflow-subj-2 to the same sentence. Likewise the `PERSISTED_TASK_EVENTS` row's "the lifecycle five" was a count in a sentence workflow-subj-3 already reached.
5. **`Workflow` `@example` value read.** The row's operative form names reads of `workflow.status`, `workflow.phase('build')` and `workflow.snapshot()`. I wrote the third as `workflow.snapshot().id // 'release'` rather than a length, so the example states no count.

## Fix round 1

The checker finding is `/home/user/scaffold/.orkestrel/campaign/conform/units/l4/workflow-r1-checker-luna.result.md`. The successor is `/home/user/scaffold/tmp/units/conform/conform-workflow-fix1b-brief.md`.

The checker repair and its successor rewrote these sites:

- `guides/workflow.md:105` — `now inserted` became `inserted before`.
- `tests/src/core/helpers.test.ts:206-210` — `taskStatus`, `phaseStatus`, and `workflowStatus` became `fromTask`, `fromPhase`, and `fromWorkflow`.
- `tests/src/core/RunHolder.test.ts:41` — the nested `readActive` arrow was removed; the assertions read `holder.runner`.
- `src/core/WorkflowRunner.ts:466` — deleted temporal `now` from the terminal sweep comment.
- `src/core/factories.ts:49` — deleted temporal `now` from the compiler comment.
- `src/core/helpers.ts:544` — replaced temporal `now` with `at that point`.
- `src/core/types.ts:362` — replaced causal `since` with `because` and deleted temporal `now`.
- `src/core/types.ts:1708` — replaced `the phase now starting` with `the phase that is starting`.
- `src/core/types.ts:1938` — deleted temporal `now` from the control-surface description.

The sweeps produced these results:

- Old names — pattern `\b(WorkflowFunctions|TaskStatus|PhaseStatus|WorkflowStatus|TASK_STATUSES|TERMINAL_TASK_STATUSES|PHASE_STATUSES|WORKFLOW_STATUSES|RunnerValue|RunnerFailure|WorkflowHooks|PhaseHooks|TaskHooks|createGate|TestGateInterface|QueueExecution)(s|es|ed|ing)?\b`, case-insensitive, over `src`, `tests`, `guides/workflow.md`, `guides/README.md`, and `README.md`: empty.
- Nested arrow — pattern `^\s+(const|let)\s+\w+\s*=\s*(async\s*)?\(.*\)\s*(:[^=]+)?=>` over `tests/src/core/RunHolder.test.ts`: empty.
- `now` — pattern `\b[Nn][Oo][Ww]\b` over `guides/workflow.md`, `guides/README.md`, `README.md`, and `src`: `guides/workflow.md:330`, `:1025`, and `:1026` are `Date.now()` calls; `src/core/tasks/Task.ts:469` and `:485` are `Date.now()` calls; `src/core/helpers.ts:562` declares the `now` local from `Date.now()`, `:574` and `:575` read that local, `:648` declares it from `Math.max(Date.now(), snapshot.updated)`, and `:686` and `:700` read it; `src/core/Workflow.ts:441` calls `Date.now()`. Each hit is a permitted code token.

## Fix round 1c

The checker file is `/home/user/scaffold/.orkestrel/campaign/conform/units/l4/workflow-r1b-checker-luna.result.md`.

The case-insensitive sweep used pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|soon|utilize|utilizes|leverage|leverages|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|sanity check|dummy|blacklist|whitelist|ensure|ensures|guarantee|guarantees)\b|\bsince\b|\bonce\b` over `guides/workflow.md`, `guides/README.md`, `README.md`, `src`, and `tests`.

### Rewrites

- `guides/workflow.md:382` — `broken internal guarantee` became `broken internal invariant`.
- `guides/workflow.md:549` — `latest live state` became `most recent live state`.
- `guides/workflow.md:550` — `latest obligation` became `most recent obligation`.
- `guides/workflow.md:663` — `the derived-status model guarantees the phase cannot reach` became `the derived-status model keeps the phase from reaching`.
- `guides/workflow.md:673` — `terminal, currently running` became `terminal, running`.
- `guides/workflow.md:697` — `its latest follow-up` became `its most recent follow-up`.
- `guides/workflow.md:1110` — `one latest obligation` became `one most recent obligation`.
- `guides/workflow.md:1376` — `Subscribe via` became `Subscribe through`.
- `guides/workflow.md:1404` — `listener-isolation safety guarantee` became `listener-isolation safety contract`.
- `guides/workflow.md:1409` — `the phase boundary ... guarantees the inputs are ready` became `the phase boundary ... and the inputs are ready after it`.
- `guides/workflow.md:1442` — `the latest final snapshot` became `the most recent final snapshot`.
- `src/core/WorkflowPersistence.ts:14` — `one coalesced latest obligation` became `one coalesced most recent obligation`.
- `src/core/WorkflowPersistence.ts:71` — `the latest state` became `the most recent state`.
- `src/core/WorkflowRunner.ts:80` — `once the tree exists` became `after the tree exists`.
- `src/core/WorkflowRunner.ts:180` — `Once accepted` became `After acceptance`.
- `src/core/WorkflowRunner.ts:184` — causal `since` became `because`.
- `src/core/WorkflowRunner.ts:459` — `once status is already terminal` became `after status is already terminal`.
- `src/core/WorkflowRunner.ts:576` — `Once the attempt owns its slot` became `After the attempt owns its slot`.
- `src/core/WorkflowRunner.ts:965` — `once status is already terminal` became `after status is already terminal`.
- `src/core/cloners.ts:51` — causal `since` became `because`.
- `src/core/validators.ts:310` — causal `since` became `because`.
- `src/core/validators.ts:429` — causal `since` became `because`.
- `src/core/helpers.ts:105` — `halted once its derived status is terminal` became `halted after its derived status is terminal`.
- `src/core/helpers.ts:127` — causal `since` became `because`.
- `src/core/helpers.ts:140` — `no-op once a workflow's status is already terminal` became `no-op after a workflow's status becomes terminal`.
- `src/core/helpers.ts:463` — `status guarantees ... since` became `status means ... because`.
- `src/core/helpers.ts:616` — `once paired with` became `after pairing with`.
- `src/core/helpers.ts:1170` — `resolves once signal has aborted` became `resolves after signal has aborted`.
- `src/core/Controller.ts:18` — causal `since` became `because`.
- `src/core/types.ts:263` — `immutable once created` became `immutable after creation`.
- `src/core/types.ts:328` — `an internal invariant the engine guarantees did not hold` became `an internal invariant did not hold`.
- `src/core/types.ts:550` — causal `since` became `because`.
- `src/core/types.ts:838` — `result ... once the task settled` became `result ... after the task settled`.
- `src/core/types.ts:859` — `outcome once the task settled` became `outcome after the task settled`.
- `src/core/types.ts:922` — `resolves once the task gate is released` became `resolves after the task gate is released`.
- `src/core/types.ts:1000` — `NO-OP once status is already terminal` became `NO-OP after status becomes terminal`.
- `src/core/types.ts:1009` — `NO-OP once status is already terminal` became `NO-OP after status becomes terminal`.
- `src/core/types.ts:1051` — `resolves once the phase is no longer paused` became `resolves after the phase is no longer paused`.
- `src/core/types.ts:1075` — `model guarantees this phase cannot reach` became `model keeps this phase from reaching`.
- `src/core/types.ts:1082` — `Acceptance here only guarantees the task is wired` became `Acceptance here means only that the task is wired`.
- `src/core/types.ts:1203` — `NO-OP once status is already terminal` became `NO-OP after status becomes terminal`.
- `src/core/types.ts:1212` — `NO-OP once status is already terminal` became `NO-OP after status becomes terminal`.
- `src/core/types.ts:1230` — `once destroyed` became `after destroyed becomes true`.
- `src/core/types.ts:1283` — `resolves once the workflow is no longer paused` became `resolves after the workflow is no longer paused`.
- `src/core/types.ts:1305` — `once destroyed` became `after destroyed becomes true`.
- `src/core/types.ts:1364` — `applies once a patch validates` became `applies after validation`.
- `src/core/types.ts:1644` — `A NEW, lean handle` became `A lean handle`.
- `src/core/types.ts:1779` — `latest state` became `most recent state`.
- `src/core/types.ts:1784` — `latest live state` became `most recent live state`.
- `src/core/types.ts:1835` — causal `since` became `because`.
- `src/core/types.ts:1945` — `Once accepted` became `After acceptance`.
- `src/core/types.ts:1955` — causal `since` became `because`.
- `src/core/types.ts:2032` — causal `since` became `because`.
- `src/core/types.ts:2043` — causal `since` became `because`.
- `src/core/types.ts:2263` — `resolves once the unit's signal aborts` became `resolves after the unit's signal aborts`.
- `src/core/types.ts:2423` — `resolves once the unit settles` became `resolves after the unit settles`.
- `src/core/types.ts:2464` — `resolves once every unit has settled` became `resolves after every unit has settled`.
- `src/core/tasks/Task.ts:80` — `outcome once the task settled` became `outcome after the task settled`.
- `src/core/Runner.ts:54` — `resolves once every unit has settled` became `resolves after every unit has settled`.
- `src/core/Runner.ts:99` — `rejects with it once drained` became `rejects with it after draining`.
- `src/core/Runner.ts:157` — `once accepted` became `after acceptance`.
- `src/core/Runner.ts:238` — `no-op once the runner is stopped` became `no-op after the runner is stopped`.
- `src/core/Runner.ts:251` — `no-op once the runner is stopped` became `no-op after the runner is stopped`.
- `src/core/phases/Phase.ts:247` — `NO-OP once status is already terminal` became `NO-OP after status is already terminal`.
- `src/core/phases/Phase.ts:257` — `NO-OP once status is already terminal` became `NO-OP after status is already terminal`.
- `src/core/Workflow.ts:238` — `NO-OP once status is already terminal` became `NO-OP after status is already terminal`.
- `src/core/Workflow.ts:248` — `NO-OP once status is already terminal` became `NO-OP after status is already terminal`.
- `tests/setup.ts:466` — `tasks concurrent via RELEASE_FUNCTIONS` became `tasks concurrent through RELEASE_FUNCTIONS`.
- `tests/src/browser/BrowserScheduler.test.ts:18` — `sanity check` became `quick check`.
- `tests/src/core/Workflow.test.ts:280` — `not just the first` became `not only the first`.
- `tests/src/core/Workflow.test.ts:821` — `just the effective status` became `only the effective status`.
- `tests/src/core/Workflow.test.ts:838` — `override via the explicit field` became `override through the explicit field`.
- `tests/src/core/Workflow.test.ts:856` — `override via the explicit field` became `override through the explicit field`.
- `tests/src/core/Workflow.test.ts:942` — `no-op once the workflow is terminal` became `no-op after the workflow is terminal`.
- `tests/src/core/Workflow.test.ts:957` — `no-op once the workflow is destroyed` became `no-op after the workflow is destroyed`.
- `tests/src/core/Workflow.test.ts:1160` — `gate via the destroy cascade` became `gate through the destroy cascade`.
- `tests/src/core/Workflow.test.ts:1202` — `pause once destroyed` became `pause after destruction`.
- `tests/src/core/Workflow.test.ts:1249` — `driven via start()/complete()` became `driven through start()/complete()`.
- `tests/src/core/Workflow.test.ts:1294` — `fails once an early phase is terminal` became `fails after an early phase is terminal`.
- `tests/src/core/Workflow.test.ts:1298` — `p0 is now terminal` became `p0 is terminal`.
- `tests/src/core/Workflow.test.ts:1310` — `boundary is now 1` became `boundary is 1`.
- `tests/src/core/Workflow.test.ts:1456` — `not just at the entity` became `not only at the entity`.
- `tests/src/core/stores/MemoryWorkflowStore.test.ts:75` — `via an early-return guard` became `through an early-return guard`.
- `tests/src/core/stores/MemoryWorkflowStore.test.ts:108` — `driver-swap guarantee` became `driver-swap contract`.
- `tests/src/core/stores/DatabaseWorkflowStore.test.ts:80` — `via an early-return guard` became `through an early-return guard`.
- `tests/src/core/stores/DatabaseWorkflowStore.test.ts:209` — `latest wins` became `most recent wins`.
- `tests/src/core/stores/DatabaseWorkflowStore.test.ts:280` — `swaps in via` became `swaps in through`.
- `tests/src/core/tasks/TaskManager.test.ts:71` — `asserted via tasks()` became `asserted through tasks()`.
- `tests/src/core/tasks/TaskManager.test.ts:126` — `asserted via tasks()` became `asserted through tasks()`.
- `tests/src/core/tasks/TaskManager.test.ts:173` — `via a duplicate task id` became `through a duplicate task id`.
- `tests/src/core/phases/Phase.test.ts:15` — `derived ... via` became `derived ... through`.
- `tests/src/core/phases/Phase.test.ts:156` — `not just the helper` became `not only the helper`.
- `tests/src/core/phases/Phase.test.ts:188` — `via the override` became `through the override`.
- `tests/src/core/phases/Phase.test.ts:417` — `no-op once the phase is terminal` became `no-op after the phase is terminal`.
- `tests/src/core/phases/Phase.test.ts:492` — `via start()/complete()` became `through start()/complete()`.
- `tests/src/core/phases/Phase.test.ts:530` — `phase is now running` became `phase is running`.
- `tests/src/core/phases/Phase.test.ts:571` — `refuse once running` became `refuse after running starts`.
- `tests/src/core/phases/Phase.test.ts:586` — `refuse once terminal` became `refuse after the phase becomes terminal`.
- `tests/src/core/phases/PhaseManager.test.ts:90` — `is now non-pending` became `is non-pending`.
- `tests/src/core/phases/PhaseManager.test.ts:126` — `boundary now 1` became `boundary is 1`.
- `tests/src/core/phases/PhaseManager.test.ts:134` — `asserted via phases()` became `asserted through phases()`.
- `tests/src/core/phases/PhaseManager.test.ts:148` — `boundary now 1` became `boundary is 1`.
- `tests/src/core/phases/PhaseManager.test.ts:155` — `boundary now 1` became `boundary is 1`.
- `tests/src/core/phases/PhaseManager.test.ts:176` — `boundary now 1` became `boundary is 1`.
- `tests/src/core/factories.test.ts:343` — `via a live runner` became `through a live runner`.
- `tests/src/core/factories.test.ts:822` — `fan-out via spawn` became `fan-out through spawn`.
- `tests/src/core/WorkflowPersistence.test.ts:32` — `persists the latest state` became `persists the most recent state`.
- `tests/src/core/WorkflowPersistence.test.ts:310` — `persists the latest frame` became `persists the most recent frame`.
- `tests/src/core/helpers.test.ts:281` — deleted temporal `now` from `now carried per phase`.
- `tests/src/core/helpers.test.ts:295` — deleted temporal `now` from `now resolved per phase`.
- `tests/src/core/helpers.test.ts:446` — `the new override` became `the per-phase override`.
- `tests/src/core/helpers.test.ts:633` — deleted temporal `now` from `now takes the inherited workflow bail`.
- `tests/src/core/helpers.test.ts:741` — causal `since` became `because`.
- `tests/src/core/helpers.test.ts:746` — deleted `simply`.
- `tests/src/core/helpers.test.ts:1062` — `resolves once the signal aborts` became `resolves after the signal aborts`.
- `tests/src/core/Controller.test.ts:90` — `not just the own abort` became `not only the own abort`.
- `tests/src/core/Runner.test.ts:136` — `it should see` became `it must see`.
- `tests/src/core/Runner.test.ts:187` — `is now invalid` became `is invalid after the run settles`.
- `tests/src/core/Runner.test.ts:240` — `fire-and-track guarantee` became `fire-and-track behavior`.
- `tests/src/core/Runner.test.ts:312` — `just-spawned child` became `spawned child`.
- `tests/src/core/Runner.test.ts:326` — `just-spawned` became `spawned`.
- `tests/src/core/Runner.test.ts:405` — `not just the declared roots` became `not only the declared roots`.
- `tests/src/core/Runner.test.ts:468` — `via the count gate` became `through the count gate`.
- `tests/src/core/Runner.test.ts:559` — `boxed-outcome guarantee` became `boxed-outcome contract`.
- `tests/src/core/Runner.test.ts:646` — `not just the declared root` became `not only the declared root`.
- `tests/src/core/Runner.test.ts:732` — `drain guarantee via` became `drain contract through`.
- `tests/src/core/Runner.test.ts:868` — `throws once that run has settled` became `throws after that run has settled`.
- `tests/src/core/Runner.test.ts:1002` — `emit-safety guarantee` became `emit-safety contract`.
- `tests/src/core/WorkflowRunner.test.ts:37` — `fold via AbortSignal.any` became `fold through AbortSignal.any`.
- `tests/src/core/WorkflowRunner.test.ts:53` — `paces via` became `paces through`.
- `tests/src/core/WorkflowRunner.test.ts:251` — `registered via` became `registered through`.
- `tests/src/core/WorkflowRunner.test.ts:641` — `threaded via the Runner` became `threaded through the Runner`.
- `tests/src/core/WorkflowRunner.test.ts:1248` — `results via controller.results()` became `results through controller.results()`.
- `tests/src/core/WorkflowRunner.test.ts:1263` — `OUTCOME via controller.results()` became `OUTCOME through controller.results()`.
- `tests/src/core/WorkflowRunner.test.ts:1535` — `fail once settled` became `fail after settlement`.
- `tests/src/core/WorkflowRunner.test.ts:1890` — `settles via the timeout` became `settles through the timeout`.
- `tests/src/core/WorkflowManager.test.ts:621` — `latest snapshot` became `most recent snapshot`.
- `tests/distribution.test.ts:34` — causal `since` became `because`.
- `tests/distribution.test.ts:566` — `once it has loaded` became `after it has loaded`.
- `tests/src/core/RunHolder.test.ts:26` — `phase now starting` became `phase that is starting`.
- `tests/src/core/tasks/Task.test.ts:836` — deleted temporal `now` from `are now persisted`.
- `tests/src/core/shapers.test.ts:134` — `the new optional fields` became `the added optional fields`.
- `tests/src/core/shapers.test.ts:204` — deleted temporal `now` from `behavior is now a plain string`.

### Permitted hits

- `just` means immediately before a paint at `guides/workflow.md:154`, `src/browser/factories.ts:37`, and `src/browser/FrameScheduler.ts:6,35`; this spatial sense is permitted.
- `since` means elapsed time from an epoch at `src/core/types.ts:410,511`; this non-causal sense is permitted.
- `via` is a literal legacy object key at `tests/setup.ts:381`, `tests/src/core/helpers.test.ts:44`, and `tests/src/core/shapers.test.ts:204,212`; literal code identifiers are permitted.
- `latest` is fixture data at `tests/src/core/WorkflowPersistence.test.ts:334,347`, and `Latest` is the `ts.ScriptTarget.Latest` enum member at `tests/setupPolicy.ts:696,1904`; these code values are permitted.
- `now` is part of a clock API or a local bound to that API. The sites are `guides/workflow.md:330,1025,1026`; `src/core/tasks/Task.ts:469,485`; `src/core/helpers.ts:562,574,575,648,686,700`; `src/core/Workflow.ts:441`; `tests/src/server/NodeScheduler.test.ts:69,77,81`; `tests/src/server/factories.test.ts:17,20`; `tests/src/browser/factories.test.ts:19,21,56,58,93,95`; `tests/src/browser/IdleScheduler.test.ts:94,96`; `tests/src/browser/BrowserScheduler.test.ts:112,114`; `tests/src/browser/FrameScheduler.test.ts:89,91`; `tests/src/core/Workflow.test.ts:368`; `tests/src/core/tasks/Task.test.ts:283`; `tests/src/core/factories.test.ts:760,762`; `tests/src/core/Scheduler.test.ts:78,82`; `tests/src/core/helpers.test.ts:1520`; and `tests/setup.test.ts:282,284`.
- `once` means one time or simultaneously in prose. The guide sites are `guides/workflow.md:11,61,116,129,147,229,240,443,464,541,599,609,667,669,673,691,772,1071,1252,1262,1285,1415,1448`. The source sites are `src/core/shapers.ts:77,147`; `src/core/tasks/Task.ts:62,92,160`; `src/core/Runner.ts:43,228,420`; `src/core/WorkflowRunner.ts:70,269,509`; `src/core/cloners.ts:54,100,101`; `src/core/phases/Phase.ts:77,79,110,164,486,514`; `src/core/factories.ts:105,216,342,471`; `src/core/Scheduler.ts:23`; `src/core/helpers.ts:36,865,1064,1137`; `src/core/constants.ts:76`; `src/core/Workflow.ts:107,164`; `src/core/Collection.ts:127`; and `src/core/types.ts:30,70,79,487,795,869,983,1631,1830,1880,2214,2328,2375`. The test-prose sites are `tests/setup.ts:260,268`; `tests/src/server/NodeScheduler.test.ts:36`; `tests/src/browser/BrowserScheduler.test.ts:103`; `tests/src/core/Workflow.test.ts:63,289,291,298,303,669,682,1223`; `tests/src/core/validators.test.ts:66,373`; `tests/src/core/tasks/Task.test.ts:36,218,541`; `tests/src/core/phases/Phase.test.ts:46,199`; `tests/src/core/factories.test.ts:303,320,373`; `tests/src/core/helpers.test.ts:61,830,844,858,920,1342,1362`; `tests/src/core/Controller.test.ts:68,123`; `tests/src/core/cloners.test.ts:74`; `tests/src/core/Runner.test.ts:123,436,438,457,491,630,813,843,953,1018,1116,1206,1442`; `tests/src/core/WorkflowRunner.test.ts:42,154,348,1122`; `tests/distribution.test.ts:603`; and `tests/setup.test.ts:43`.
- `once` is an event-listener option at `src/core/tasks/TaskController.ts:131`; `src/core/tasks/Task.ts:501`; `src/core/WorkflowRunner.ts:287,829,889,906`; `src/core/helpers.ts:1107,1183`; `tests/src/core/Workflow.test.ts:1135`; and `tests/src/core/WorkflowRunner.test.ts:150,570,801,848,878,965,1079,1871,2126`. It is a fixture identifier or value at `tests/src/core/factories.test.ts:842`; `tests/src/core/helpers.test.ts:1580,1581,1582,1584`; `tests/src/core/Runner.test.ts:103,105,112,115,120,121,125,1484`. These code tokens are permitted.
- Every remaining `new` hit is either the JavaScript/TypeScript construction operator or names a replacement, inserted, minted, or further value rather than dating it. The prose value sites are `guides/workflow.md:256,663,958,1044,1421`; `src/core/shapers.ts:127,128,141,142`; `src/core/tasks/Task.ts:445`; `src/core/phases/Phase.ts:302,394`; `src/core/helpers.ts:974,977,982,983,984,1003,1013,1018,1019`; `src/core/constants.ts:102`; `src/core/Workflow.ts:430`; `src/core/types.ts:642,682,1074,2395`; `tests/src/core/Workflow.test.ts:300,1206,1299,1302`; `tests/src/core/tasks/Task.test.ts:938,940`; and `tests/src/core/helpers.test.ts:1254,1261`. Construction expressions and fixture values are code tokens, so each is permitted.

### Orchestrator integration (22:22 UTC, after fix round 1c returned)

Fix round 1c's population named prose in `tests` without excluding the vendored set, so the Sol writer rewrote a banned-table hit in the vendored `tests/distribution.test.ts` (the `since` scaffold's host rows already carry at `tests/distribution.test.ts:28`). The Orchestrator restored that file to its committed bytes and regenerated the evidence; the vendored site stays with scaffold's host-row follow-on. Every other rewrite of the round stands.

## Fix round 1d

The checker file is `/home/user/scaffold/.orkestrel/campaign/conform/units/l4/workflow-r1c-checker-luna.result.md`.

The Surface-row descriptions were rewritten as noun phrases:

- `guides/workflow.md:245` — “Find the first `TaskResult` in a positional list whose boxed outcome is a `Failure`, or `undefined` if none.” became “The first `TaskResult` in a positional list whose boxed outcome is a `Failure`, or `undefined` if none.”
- `guides/workflow.md:249` — “Convert a `WorkflowDefinition` into an INITIAL all-`pending` `WorkflowSnapshot` — the unified construction path.” became “An INITIAL all-`pending` `WorkflowSnapshot` converted from a `WorkflowDefinition` — the unified construction path.”
- `guides/workflow.md:250` — “Convert one `PhaseDefinition` into an initial all-`pending` `PhaseSnapshot` (the per-phase step).” became “An initial all-`pending` `PhaseSnapshot` converted from one `PhaseDefinition` (the per-phase step).”
- `guides/workflow.md:251` — “Convert one `TaskDefinition` into an initial `pending` `TaskSnapshot` (the per-task leaf step — no result, empty metadata).” became “An initial `pending` `TaskSnapshot` converted from one `TaskDefinition` (the per-task leaf step — no result, empty metadata).”
- `guides/workflow.md:252` — “Project interrupted running work onto its remaining budget without replenishing attempts.” became “Interrupted running work projected onto its remaining budget without replenishing attempts.”
- `guides/workflow.md:253` — “Flatten per-phase `TaskResult` lists into one positional list — the workflow tier of the result tree.” became “One positional list flattened from per-phase `TaskResult` lists — the workflow tier of the result tree.”
- `guides/workflow.md:256` — “Reposition the entry keyed `key` to a new index in a readonly entries array — the pure remove-then-reinsert step behind a registry's `move`.” became “The entry keyed `key` repositioned to a new index in a readonly entries array — the pure remove-then-reinsert step behind a registry's `move`.”
- `guides/workflow.md:257` — “Schedule the one host `setTimeout` boundary every scheduler's `delay` and macrotask fallback resumes from.” became “The one host `setTimeout` boundary that every scheduler's `delay` and macrotask fallback resumes from.”

The sweep used pattern `^\| \x60[^\x60]+\x60 +\| [^|]+\| (Find|Convert|Project|Flatten|Reposition|Schedule|Create|Build|Run|Start|Stop|Return|Read|Write|Compile|Derive|Resolve|Check|Narrow|Validate|Compute|Emit|Produce|Wrap|Register|Remove|Add|Bind|Drive|Hold|Persist|Load|Save|Serialize|Restore|Watch|Wait|Yield|Report|Format|Parse|Scan|Walk|Filter|Map|Fold|Merge|Split|Sort|Count)\b` over `guides/workflow.md`. It returned no Surface-row description. Its remaining hits are the `## Methods` rows at `guides/workflow.md:451-454`, `:470-474`, `:493`, `:501-504`, `:515-518`, `:529-532`, `:551`, `:594`, `:603`, and `:626`; the brief excludes those rows from the noun-phrase rule.

## Fix round 2

Briefs: `/home/user/scaffold/tmp/units/conform/conform-workflow-fix2-brief.md`, stopped before editing on an out-of-scope sweep hit, and its successor `/home/user/scaffold/tmp/units/conform/conform-workflow-fix2b-brief.md`, which widened Owned to the two test sites and carried every other item forward. The round closes the objective lane's refutations of claims 2 and 4 and its findings O1 and O2, recorded at `/home/user/scaffold/.orkestrel/campaign/conform/units/l4/workflow-objective-r1-sol.md`. Referral R2 is the Orchestrator's ruling and is not this round's work: the toolbox consumer patches under Shared-file patches apply at toolbox's own unit.

The engine changed. The Cursor bench that was to run the round on GPT-5.6 Sol is dark on the account's usage limit, so Opus 5 ran it as the native `implementer` in `/home/user/fleet/workflow`.

### Claim 2 — the two malformed doc blocks

The `workflow-subj-1` citation removal joined a wrapped sentence onto its continuation line and left the continuation's leading ` * ` mid-sentence. Each block was rejoined as prose:

- `src/core/Workflow.ts:40` — “… for a whole workflow — the observable * ROOT whose {@link LifecycleStatus} is computed from its phases under the `bail` policy and” became “… for a whole workflow — the observable ROOT” / “whose {@link LifecycleStatus} is computed from its phases under the `bail` policy and”, rewrapped at the printWidth the file already uses.
- `src/core/types.ts:661` — “A `type` alias * so it satisfies `EventMap`.” became “A `type` alias so it satisfies `EventMap`.”, matching the same sentence the sibling block at `src/core/types.ts:698` already carried.

### Claim 4 — the abbreviation rewrites

Each site took `for example` in place of `e.g.`, rewrapped where the longer phrase crossed the file's width:

- `src/core/types.ts:306` — “an illegal state-machine transition (for example, `start`ing a task that is not `pending` …”
- `src/core/types.ts:834` — “an illegal transition (for example, completing a non-`running` task) throws …”
- `src/core/types.ts:959` — “derived value (for example, skipping a whole phase); the override survives a snapshot.”
- `src/core/types.ts:1920` — “A PATHOLOGICAL `definition` (for example, a duplicate phase or task `id`) THROWS SYNCHRONOUSLY …”
- `src/core/types.ts:2337` — “wired at construction (for example, `{ finish: (r) => log(r) }`).”
- `src/core/phases/Phase.ts:46` — “FORCE the phase's status (for example, skipping a whole phase) …”
- `src/core/tasks/Task.ts:45` — “on an illegal move (for example, completing a non-`running` task) …”
- `src/core/WorkflowRunner.ts:462` — “Not a signal cancel (for example, a normal phase settle, or a bail-true fail-fast the caller already `fail`ed) …”
- `tests/src/browser/IdleScheduler.test.ts:10` — “(for engines without rIC, for example Safari) …”, added to Owned by the successor brief.
- `tests/src/core/Runner.test.ts:527` — “a sentinel-based `#collect` (for example, `if (value)` or `value !== SENTINEL`) …”, added to Owned by the successor brief.

### O1 — the counted test name

`tests/guides.test.ts:253` — the case named “reads a count of 2 back from the positional collection fence” became “reads the documented positional collection fence”. The body is unchanged, so `expect(store.count).toBe(2)` still reads the value the fence documents.

### O2 — the local fixture factories

`buildTasks` and `buildCollection` moved out of `tests/src/core/Collection.test.ts` into the host-independent `tests/setup.ts`, as exported factories with complete TSDoc. Neither needs a host module, so `tests/setupServer.ts` was not involved.

- `tests/setup.ts:438` — `buildTasks()` returns the live compile, scan, and audit tasks a fresh `buildWorkflowDefinition` tree holds.
- `tests/setup.ts:458` — `buildCollection(noun = 'task')` returns an empty `Collection<TaskInterface, TaskUpdate>` gated by the real compiled `taskUpdateShape`.
- `tests/src/core/Collection.test.ts:4` imports both from `../../setup.js`; the file declares no factory of its own.

The `noun` parameter is the round's one ancillary decision, taken under the deviation contract and recorded here. The case at `tests/src/core/Collection.test.ts:38` proves the constructor's noun reaches the refusal message, and it constructed its own `Collection` inline. Moving the factories without that parameter would have left that construction — and the `Collection`, `TaskInterface`, `TaskUpdate`, `compileGuard`, and `taskUpdateShape` imports behind it — local to the test file, which is the duplication O2 names. The parameter forwards to the real constructor unchanged, so the case now reads `buildCollection('phase')` and asserts the same message.

Proofs added to `tests/setup.test.ts`, in the form that file already uses (each case derives its expectation by a route the helper does not share):

- `tests/setup.test.ts:324` — `buildTasks` returns every live task the definition declares, in declaration order. The expected ids are flat-mapped from `buildWorkflowDefinition()` rather than copied from the addresses the factory names, and every returned task reads `pending`.
- `tests/setup.test.ts:337` — `buildTasks` mints a fresh tree per call: a `start()` on one call's task leaves a later call's task `pending` and not the same instance.
- `tests/setup.test.ts:350` — `buildCollection` returns an empty store naming the noun it was given: `count` is `0`, `entries()` is empty, and a duplicate `append` reports `duplicate phase id '<id>'`.
- `tests/setup.test.ts:365` — `buildCollection` defaults the noun to `task` and wires the real compiled guard: the duplicate message reads `duplicate task id '<id>'`, and `update(id, { name: '' })` fails, which a permissive stand-in guard would not.

### Sweeps

| Pattern | Population | Result |
| ------- | ---------- | ------ |
| `\be\.g\.\|\bi\.e\.` | `src`, `tests`, `guides/workflow.md`, `guides/README.md`, `README.md` | before the round: exactly the sites listed under Claim 4. After: empty (`grep` exit 1) |
| `\w \* \w` | `src`, `tests` | no doc-block hit remains. Every hit is permitted: `export * from` in `src/core/index.ts:1-20`, `src/browser/index.ts:1-6`, `src/server/index.ts:1-2`; `import * as` in `tests/setupPolicy.ts:12`, `tests/setupPolicy.ts:2823`, `tests/setupServer.test.ts:1`, `tests/setupBrowser.test.ts:1`, `tests/config.test.ts:20`, `tests/distribution.test.ts:485`, `tests/distribution.test.ts:553`; and arithmetic multiplication in `src/core/factories.ts:456` and at `tests/src/core/Controller.test.ts:83` and `tests/src/core/Runner.test.ts:12,19,450,456,479,480,481,946,952,1010,1138,1150,1223` |

The Sweeps table's earlier `\be\.g\.\b` row is corrected in place: its recorded empty reading was false, because a terminal `\b` cannot follow the pattern's final period.

Sites outside Owned: none. The abbreviation sweep found no further site beyond the two the successor brief added.

### Gates

Run bare in `/home/user/fleet/workflow`, in this order.

| Command | Exit |
| ------- | ---- |
| `npm run check` | 0 |
| `npm run lint:check` | 0 |
| `npm run format:check` | 0 |
| `npm run test:setup` | 0 — 3 files / 29 tests passed |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/Collection.test.ts` | 0 — 1 file / 15 tests passed |
| `npm run test:guides` | 0 — 1 file / 98 tests passed |

A verbose `setup` run confirms each added case is collected by the `setup` project and green: `buildTasks > returns every live task the definition declares, in declaration order`, `buildTasks > mints a fresh tree per call, so a transition on one call cannot reach a later one`, `buildCollection > returns an empty store naming the entity noun it was given`, and `buildCollection > defaults the noun to the task vocabulary and wires the real compiled guard`.

`git status --short` lists the same paths the round began with — `tests/src/core/Collection.test.ts` added, every other path modified — and nothing new.

## Fix round 3

Brief: `/home/user/scaffold/tmp/units/conform/conform-workflow-fix3-brief.md`. Verdict closed:
`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/workflow-objective-r2.md` — the round-2
objective lane's O1, O2, O3, O5, and O6, with its R1 recorded. Opus 5 ran the round as the native
`implementer` in `/home/user/fleet/workflow`; the Cursor bench carrying GPT-5.6 Sol stays dark on
the account's API-model usage limit.

O4 and R2 are the Orchestrator's rulings rather than this round's edits. O4 belongs to the
landing run, which executes the full gate chain on the tree this round leaves. R2 stays open with
toolbox's own unit, as this report already records under Shared-file patches.

### O1 — the counted comment

`tests/guides.test.ts:2`. The number is deleted rather than corrected.

Before:

```ts
// this repo's own `guides/README.md` manifest. The four constants below are this
```

After:

```ts
// this repo's own `guides/README.md` manifest. The constants below are this
```

Line 3 is unchanged, so the sentence reads "The constants below are this package's own, and are the
only part a sibling package changes."

### O2 — the false sweep rows

Both rows are corrected in place, in the form the `\be\.g\.\b` row already uses at `:108`. Each
re-ran on the tree this round leaves, and each records the hits it returns and the conclusion those
hits support.

Row `:102`, pattern `§` over `guides/workflow.md`, `guides/README.md`, `README.md`, returns
`guides/README.md:89` and `guides/workflow.md:1462`. Both are the named-section citation form the
row prescribes, and every section they cite exists — `AGENTS.md` § Design laws,
`.claude/rules/names.md` § Fixed lifecycle vocabulary, `.claude/rules/typescript.md` § Errors and
outcomes, `.claude/rules/documentation.md` § Parity. The row's conclusion stands: no
numbered-section form survives in an authored file, and no tree change is owed.

Row `:103`, pattern `§[0-9]` over the checkout minus `node_modules`, returns
`guides/{abort,budget,contract,database,emitter,guide,queue,timeout}.md`. The old reading named
fewer files than the sweep returns. Every file it returns is a vendored dependency guide mirror,
outside this unit's Owned set and correctly untouched, so the row's conclusion stands unchanged.

### O3 — the diffstat and § Breaking counts

- `:76` before: "58 files changed: 57 modified, 1 added (`tests/src/core/Collection.test.ts`). `git status --short` lists only files under Owned; no vendored file, …"
- `:76` after: "`git status --short` lists only files under Owned; `tests/src/core/Collection.test.ts` is added and every other path modified. No vendored file, …"
- `:140` before: "Four rows move the published surface."
- `:140` after: "These rows move the published surface."

The consumer sentence following `:140` is unchanged. The brief wrote the replacement with a
trailing colon; the consumer sentence sits between that clause and the table, so a colon would
dangle. Recorded here as an ancillary wording decision taken under the deviation contract.

### O5 — the failing-first control for the setup fixtures

Command, run bare in `/home/user/fleet/workflow`: `npm run test:setup`.

| Run | Plant | Capture | Result |
| --- | ----- | ------- | ------ |
| red | `buildTasks` reads a module-level `PLANTED_TREE` and `buildCollection` takes a permissive stand-in guard | `/home/user/work/evidence/workflow-proofs/o5-setup-control-red.txt` | exit 1 — 1 failed / 28 passed (29), file `tests/setup.test.ts > buildTasks > mints a fresh tree per call, so a transition on one call cannot reach a later one` |
| red | `buildCollection` alone takes the permissive stand-in guard | `/home/user/work/evidence/workflow-proofs/o5-setup-collection-control-red.txt` | exit 1 — 1 failed / 28 passed (29), file `tests/setup.test.ts > buildCollection > defaults the noun to the task vocabulary and wires the real compiled guard` |
| green | none; both bodies restored | `/home/user/work/evidence/workflow-proofs/o5-setup-control-green.txt` | exit 0 — 3 files / 29 tests passed |

The second red run is the round's remaining ancillary decision, and it is what the finding asks for
rather than what the brief's method produces. Planting both bodies at once masks the
`buildCollection` proof: the shared `PLANTED_TREE` leaves the task the earlier case starts in
`running`, so `Collection.update` refuses at its `#pending` gate
(`/home/user/fleet/workflow/src/core/Collection.ts:107-108`) before it ever consults the guard, and
`store.update(first.id, { name: '' }).success` reads `false` for the wrong reason. The
`buildCollection` case then passes under a guard it is written to catch. Planting that body alone
reddens it, so each fixture now carries a proof that ran red against its own body. No stop trigger
in the deviation contract fired: the planted control did fail, the restored run passed, no gate
reddened, and every named site read as the brief quotes it.

`tests/setup.ts` is restored by editing the exact lines back. `git diff --stat -- tests/setup.ts`
reads `55 insertions(+), 40 deletions(-)` before the plant and the same after the restore, and the
file's MD5 is `b0311d105154c023cbc9189c88602450` at both readings.

### O6 — the moved citation

`:44`, the `fleet-F1` `noop` evidence. Both cited lines were opened and confirmed before writing:
`tests/setup.ts:523` reads `export function isBrowserVuePath(path: string): boolean {` and
`tests/setup.test.ts:423` reads `describe('isBrowserVuePath', () => {`.

- Before: "`isBrowserVuePath` remains at `tests/setup.ts:508` with its `describe` block in `tests/setup.test.ts`, untouched."
- After: "`isBrowserVuePath` remains at `tests/setup.ts:523` with its `describe` block at `tests/setup.test.ts:423`, untouched."

### R1 — the behavioural change recorded under § Breaking

Recorded as a sentence under the § Breaking table at `:150`, because the row moves published
behaviour rather than a symbol and the table's columns are Removed or renamed. `workflow-subj-6`
changes what `WorkflowManagerInterface.remove(ids[])` returns for a partial batch from `true` to
`false`, and for an empty batch from `false` to `true`. No fleet consumer calls it.

### Gates

Run bare in `/home/user/fleet/workflow`, after the restore.

| Command | Exit |
| ------- | ---- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run test:setup` | 0 — 3 files / 29 tests passed |

`git status --short` lists the same paths the round began with, and nothing new.

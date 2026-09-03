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
| fleet-F1 | noop | This workspace has a browser environment, so the rule's own exemption applies. `src/browser/` holds `BrowserScheduler.ts`, `FrameScheduler.ts`, `IdleScheduler.ts`, `constants.ts`, `factories.ts`, `index.ts`, `types.ts`; `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` both exist. `isBrowserVuePath` remains at `tests/setup.ts:508` with its `describe` block in `tests/setup.test.ts`, untouched. |
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

58 files changed: 57 modified, 1 added (`tests/src/core/Collection.test.ts`). `git status --short` lists only files under Owned; no vendored file, no `package.json`, no `configs/`, no `.claude/`.

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
| `§` | `guides/workflow.md`, `guides/README.md`, `README.md` | empty |
| `§[0-9]` | whole checkout minus `node_modules` | only `guides/{budget,queue,timeout,abort,contract}.md` — vendored mirrors, correctly untouched |
| `\b(WorkflowFunctions\|TaskStatus\|PhaseStatus\|WorkflowStatus\|TASK_STATUSES\|TERMINAL_TASK_STATUSES\|PHASE_STATUSES\|WORKFLOW_STATUSES\|RunnerValue\|RunnerFailure\|WorkflowHooks\|PhaseHooks\|TaskHooks\|createGate\|TestGateInterface\|QueueExecution)(s\|es\|ed\|ing)?\b`, case-insensitive | `guides/workflow.md`, `guides/README.md`, `README.md` | empty |
| same base pattern | `src/**/*.ts`, `tests/**/*.ts` | only `derivePhaseStatus` / `deriveWorkflowStatus`, the retained helper names the rows keep |
| `Date.now()` | `tests/**` | only the three wall-clock stamps at `helpers.test.ts:1520`, `Workflow.test.ts:368`, `tasks/Task.test.ts:283`, plus the explanatory comment at `server/NodeScheduler.test.ts:69` |
| `\bcurrently\b`, `\bsimply\b`, `\bvia\b`, `\be\.g\.\b`, case-insensitive | `src/**` | empty |
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

Four rows move the published surface. No fleet code consumer exists for `workflow-subj-8`, `workflow-subj-9`, or `workflow-subj-14`; `workflow-subj-10` and `workflow-subj-11` reach `@orkestrel/toolbox`.

| Row | Removed or renamed | Consumers |
| --- | ------------------ | --------- |
| workflow-subj-8 | `WorkflowHooks`, `PhaseHooks`, `TaskHooks` removed | none in fleet; `agent/guides/workflow.md` and `toolbox/guides/workflow.md` are vendored mirrors, refreshed at the wave |
| workflow-subj-9 | `PHASE_STATUSES`, `WORKFLOW_STATUSES` removed; `TASK_STATUSES` → `LIFECYCLE_STATUSES`; `TERMINAL_TASK_STATUSES` → `TERMINAL_STATUSES` | none in fleet |
| workflow-subj-10 | `TaskStatus`, `PhaseStatus`, `WorkflowStatus` removed; every position now `LifecycleStatus` | `@orkestrel/toolbox` |
| workflow-subj-11 | `WorkflowFunctions` → `WorkflowRegistry` | `@orkestrel/toolbox` |
| workflow-subj-14 | `RunnerValue`, `RunnerFailure` removed | none in fleet |

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

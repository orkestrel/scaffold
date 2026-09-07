# Brief — P.1 `d7n-workflow-prep` (workflow's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`implementer` on Claude Opus 5: a fully specified unit. Sole writer in `/home/user/fleet/workflow` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `bde9d91`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

workflow's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== workflow 2026-09-07T16:43:51Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
104:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 1s
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### workflow (bde9d91, version 0.0.17, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 38 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setup.ts(25)
   src/browser/FrameScheduler.ts(2)
   src/browser/factories.ts(1)
-- docs
   guides/workflow.md TaskInterface.pulse: guide absent source "Confirms liveness without replacing the current operations, progress, or constraints."
   guides/workflow.md TaskInterface.pause: guide absent source "Suspends this task's cooperative gate while pending or running; idempotent."
   guides/workflow.md TaskInterface.resume: guide absent source "Continues this task's cooperative gate; idempotent."
   guides/workflow.md TaskInterface.wait: guide absent source "Parks until this task is not paused."
   guides/workflow.md TaskInterface.patch: guide absent source "Applies a validated declarative patch to SELF (`name` / `description`)."
   guides/workflow.md TaskInterface.snapshot: guide absent source absent
   guides/workflow.md PhaseManagerInterface.append: guide absent source "Adds `phase` at the end (the build-time wiring path)."
   guides/workflow.md PhaseManagerInterface.add: guide absent source "Inserts `phase` at `index` (default the end) — the GATED mutation counterpart to `append`: a duplicate `id` or an out-of-bounds `index` fails gracefully instead of throwing."
   guides/workflow.md PhaseManagerInterface.remove: guide absent source "Removes the `pending` phase `id`."
   guides/workflow.md PhaseManagerInterface.move: guide absent source "Repositions the `pending` phase `id` to `index`."
   guides/workflow.md PhaseManagerInterface.update: guide absent source "Applies a validated `PhaseUpdate` patch to the `pending` phase `id`."
   guides/workflow.md PhaseManagerInterface.phase: guide absent source absent
   guides/workflow.md PhaseManagerInterface.phases: guide absent source absent
   guides/workflow.md TaskManagerInterface.append: guide absent source "Adds `task` at the end (the build-time wiring path)."
   guides/workflow.md TaskManagerInterface.add: guide absent source "Inserts `task` at `index` (default the end) — the GATED mutation counterpart to `append`: a duplicate `id` or an out-of-bounds `index` fails gracefully instead of throwing."
   guides/workflow.md TaskManagerInterface.remove: guide absent source "Removes the `pending` task `id`."
   guides/workflow.md TaskManagerInterface.move: guide absent source "Repositions the `pending` task `id` to `index`."
   guides/workflow.md TaskManagerInterface.update: guide absent source "Applies a validated `TaskUpdate` patch to the `pending` task `id`."
   guides/workflow.md TaskManagerInterface.task: guide absent source absent
   guides/workflow.md TaskManagerInterface.tasks: guide absent source absent
   guides/workflow.md CollectionInterface.append: guide absent source "Adds `entry` at the end — the build-time wiring path."
   guides/workflow.md CollectionInterface.add: guide absent source "Inserts `entry` at `index` (default the end) — the gated counterpart to `append`."
   guides/workflow.md CollectionInterface.remove: guide absent source "Removes the `pending` entity `id`."
   guides/workflow.md CollectionInterface.move: guide absent source "Repositions the `pending` entity `id` to `index`."
   guides/workflow.md CollectionInterface.update: guide absent source "Applies a validated patch to the `pending` entity `id`."
   guides/workflow.md CollectionInterface.entry: guide absent source "Looks up one stored entity by its `id`."
   guides/workflow.md CollectionInterface.entries: guide absent source "Lists every stored entity in positional order."
   guides/workflow.md WorkflowRunnerInterface.execute: guide absent source "Executes a workflow definition to completion — BUILDS its live tree, runs the phases sequentially with each phase's tasks concurrent — resolving its terminal `WorkflowResult` (whose `workflow` is the freshly-built live tree)."
   guides/workflow.md WorkflowPersistenceInterface.checkpoint: guide absent source "Makes the most recent state durable at one required boundary."
   guides/workflow.md WorkflowPersistenceInterface.finalize: guide absent source "Detaches observers and makes the final live state durable."
   guides/workflow.md WorkflowPersistenceInterface.detach: guide absent source "Stops observing the live workflow tree; idempotent."
   guides/workflow.md WorkflowManagerInterface.workflow: guide absent source absent
   guides/workflow.md WorkflowManagerInterface.workflows: guide absent source absent
   guides/workflow.md WorkflowManagerInterface.add: guide absent source "Mints a live `WorkflowInterface` from `definition` (through `import('./factories.js').createWorkflow`, flowing this manager's `functions` registry in) and register it under `definition.id`."
   guides/workflow.md WorkflowManagerInterface.open: guide absent source "Resolves a workflow by id — from the registry if present, else HYDRATED from the optional `WorkflowStoreInterface` (`store`), RUNNABLE (this manager's `functions` registry is threaded into the rehydration)."
   guides/workflow.md WorkflowManagerInterface.save: guide absent source "Persists a REGISTERED workflow's `WorkflowInterface.snapshot` to the optional `WorkflowStoreInterface` (`store`)."
   guides/workflow.md WorkflowManagerInterface.remove: guide absent source "Drops a batch of registered workflows, one per id."
   guides/workflow.md WorkflowManagerInterface.clear: guide absent source absent
   guides/workflow.md TaskControllerInterface.report: guide absent source "Replaces this running task's complete observable activity."
   guides/workflow.md TaskControllerInterface.pulse: guide absent source "Confirms liveness without replacing current activity."
   guides/workflow.md TaskControllerInterface.wait: guide absent source "Parks cooperatively while any workflow, phase, or task gate is paused, or until cancelled."
   guides/workflow.md TaskControllerInterface.results: guide absent source "Lists every settled task's result across already-finished phases — the result tree, read-only."
   guides/workflow.md SchedulerInterface.yield: guide absent source "Yields control back to the host so other tasks (I/O, timers, rendering) can run, then resumes."
   guides/workflow.md SchedulerInterface.delay: guide absent source "Resumes after at least `ms` milliseconds."
   guides/workflow.md RunnerInterface.execute: guide absent source "Runs all `inputs` — and anything they `spawn` — to completion; resolves their results in order: the declared inputs first (in input order), then the spawned units (in spawn order)."
   guides/workflow.md RunnerInterface.spawn: guide absent source "Injects one more unit into an IN-FLIGHT `execute` run — a LIVE counterpart to a `Controller.spawn`, called from OUTSIDE any unit's handler (the seam a live `running` `PhaseInterface`'s `add` event lets a subscribed run offer a newly added task to the SAME execution substrate)."
   guides/workflow.md RunnerInterface.abort: guide absent source "Cancels every in-flight + pending unit (and the backing queue), making a running `execute` reject."
   guides/workflow.md RunnerInterface.pause: guide absent source "Suspends dispatch (resumable): the backing queue holds the NEXT dispatch while any in-flight unit finishes; idempotent."
   guides/workflow.md RunnerInterface.resume: guide absent source "Continues a paused runner; idempotent."
   guides/workflow.md RunnerInterface.stop: guide absent source "Ends the runner permanently — a GRACEFUL stop: no further unit is dispatched, but every already-in-flight unit runs to completion and settles normally. A never-dispatched (still-pending) unit is rejected by the backing queue and is NOT recorded as a failure (it never trips fail-fast); a genuine in-flight failure still is. `execute`'s promise RESOLVES (never rejects) after every unit has settled, with whatever results actually completed. Idempotent."
   guides/workflow.md RunnerInterface.destroy: guide absent source "Tears the runner down, awaiting backing-queue cleanup before destroying the emitter last."
   guides/workflow.md RunHolderInterface.hold: guide absent source "Takes a phase runner for the phase that is starting, or releases the held one."
   guides/workflow.md ControllerInterface.wait: guide absent source "Parks until this unit's `signal` aborts — **promise-parked**, never a timer."
   guides/workflow.md ControllerInterface.spawn: guide absent source "Adds a sibling unit to the run; returns its result promise."
   guides/workflow.md ControllerInterface.abort: guide absent source "Cancels this unit — fires its `signal` with the optional reason."
   guides/workflow.md WorkflowStoreInterface.get: guide absent source "Resolves the persisted snapshot for `id`, or `undefined` if none is stored. A present payload whose own `id` differs from the requested storage key is corrupt and rejects with a normalized `RESTORE` error carrying both ids."
   guides/workflow.md WorkflowStoreInterface.set: guide absent source "Inserts or replaces a snapshot under its own `snapshot.id` (no separate id param — mirroring `QueueStoreInterface.save` from `@orkestrel/queue`)."
   guides/workflow.md WorkflowStoreInterface.delete: guide absent source "Drops a snapshot by id; an absent id is a no-op (no throw)."
   guides/workflow.md pitch: readme absent tagline "Orchestration as DATA: a JSON-serializable `Workflow → Phase → Task` tree — strictly those levels, positional, no DAG — that a UI or an LLM authors, persistence stores, and a thin engine drives by COMPOSING the shipped execution substrate. Not a general DAG engine: it trades arbitrary dependency graphs for a fixed, deterministic shape, and writes none of its own concurrency / retry / abort machinery — it reuses what already ships."
   rows read: 1, disagreements found: 249
   exit 1
-- check
   tests/guides.test.ts(128,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(131,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(135,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(150,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(165,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 60 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  60 failed | 38 passed (98)
   exit 1
-- test:policy
        × enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace 116ms
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) } ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) } ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
   exit 1
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 28 | summary 25 | banned 3 | tests/setup.ts(25) src/browser/FrameScheduler.ts(2) src/browser/factories.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
+154,	+     "message": "prose carries no banned term: just (delete)",	+     "path": "guides/workflow.md"
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for workflow (taken 2026-09-07T16:44Z by facts.sh)

- Checkout `/home/user/fleet/workflow`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `bde9d91`, status: clean
- `package.json`: version `0.0.17`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 28 | summary 25 | banned 3 | tests/setup.ts(25) src/browser/FrameScheduler.ts(2) src/browser/factories.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept  | Spec                         | Source                                                                                    | Tests                                                                                                                         |
    8:| -------- | ---------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
    9:| Workflow | [`workflow.md`](workflow.md) | [`src/core`](../src/core), [`src/browser`](../src/browser), [`src/server`](../src/server) | [`tests/src/core`](../tests/src/core), [`tests/src/browser`](../tests/src/browser), [`tests/src/server`](../tests/src/server) |
    13:| Directory     | Guide                        |
    14:| ------------- | ---------------------------- |
    15:| `src/core`    | [`workflow.md`](workflow.md) |
    16:| `src/browser` | [`workflow.md`](workflow.md) |
    17:| `src/server`  | [`workflow.md`](workflow.md) |
- Guide `guides/workflow.md`: 1463 lines. Headings:
    1:# Workflow
    19:## Surface
    63:### Factories
    79:### The entity tree
    94:### The positional collection
    114:### The execution substrate
    127:### Scheduler (pacing)
    145:### Environment backends
    183:### Stores
    192:### Registry
    200:### Errors
    211:### Helpers & guards
    336:### Shapes
    348:### Constants
    361:### Types
    431:## Methods
    435:#### `WorkflowInterface`
    456:#### `PhaseInterface`
    476:#### `TaskInterface`
    495:#### `PhaseManagerInterface`
    509:#### `TaskManagerInterface`
    523:#### `CollectionInterface`
    537:#### `WorkflowRunnerInterface`
    543:#### `WorkflowPersistenceInterface`
    563:#### `WorkflowManagerInterface`
    577:#### `TaskControllerInterface`
    588:#### `SchedulerInterface`
    597:#### `RunnerInterface`
    611:#### `RunHolderInterface`
    619:#### `ControllerInterface`
    629:#### `WorkflowStoreInterface`
    639:## Contract
    701:## Patterns
    705:### Authoring a definition (pure JSON)
    737:### Validating + seeding with the contract
    749:### Running a workflow
    774:### The `bail` policy — graceful vs halt
    825:### Bounding a run (abort / timeout / budget)
    845:### Driving the live entity tree directly
    865:### Forcing a terminal status — `skip` / `stop`
    886:### Pausing, resuming, and parking on a run — `pause` / `resume` / `wait` / `destroy`
    922:### Mutating the live tree — `add` / `remove` / `move` / `update` / `patch`
    960:### Building the live tree by hand — `append`
    992:### Observing the live tree
    1017:### Long-running task activity and cooperative control
    1046:### Snapshot & restore (the durable payload)
    1073:### Persisting & restoring (the durable store)
    1112:### Managing workflows (registry + store seam)
    1152:### The helper functions — guards, derivation, lineage & synthesis
    1213:### Pacing with the scheduler — a cooperative loop
    1233:### Backoff — delay a growing interval between attempts
    1250:### Swapping the scheduler backend
    1271:### Driving a set of units with the `Runner`
    1282:### Bounded concurrency
    1294:### Per-entry retries and timeout
    1311:### Fanning out with `spawn`
    1331:### The per-unit `ControllerInterface` handle — `wait` / `spawn` / `abort`
    1354:### Fail-fast and abort
    1374:### Observing the `Runner`
    1406:### Practices
    1425:## Tests
    1456:## See also
- Table headers in `guides/workflow.md` (a header row is the row before a `| ---` row):
    65: | API                           | Kind     | Summary                                                                                                                              |
    87: | Class          | Kind  | Role                                                                                                                                                                                                                          |
    120: | Class                 | Kind  | Role                                                                                                                                                                                                                                                                                                                                                                                        |
    141: | API         | Kind  | Summary                                                                                      |
    157: | API                | Kind  | Summary                                                                                                                               |
    164: | API                      | Kind     | Summary                                                                                          |
    173: | Type            | Kind      | Shape                                                                                                            |
    177: | API                  | Kind  | Summary                                                                                                                                               |
    187: | Class                   | Kind  | Role                                                                                                                                    |
    196: | Class             | Kind  | Role                                                                                                                                                  |
    202: | API               | Kind     | Summary                                                                                                                                                |
    220: | API                         | Kind     | Behavior                                                                                                                                                                    |
    340: | API                | Kind  | Summary                                                                                                           |
    350: | Constant                    | Kind  | Value                                                                                                              |
    363: | Type                           | Kind      | Shape                                                                                                                                                                                                                                                                    |
    439: | Method     | Returns                                 | Behavior                                                                                                                                                                     |
    460: | Method     | Returns                                | Behavior                                                                                                                                     |
    480: | Method     | Returns                               | Behavior                                                                                                                                                                         |
    499: | Method   | Returns                                 | Behavior                                                                                                                        |
    513: | Method   | Returns                                | Behavior                                                                                                                      |
    527: | Method    | Returns                         | Behavior                                                                                                            |
    539: | Method    | Returns                   | Behavior                                                                                                                                                                               |
    547: | Method       | Returns            | Behavior                                                                                                        |
    567: | Method      | Returns                                   | Behavior                                                                                                                                                                                           |
    581: | Method    | Returns                               | Behavior                                                                                                |
    592: | Method  | Returns         | Behavior                                                                                                            |
    601: | Method    | Returns                         | Behavior                                                                                                                                                          |
    615: | Method | Returns | Behavior                                                                                                      |
    623: | Method  | Returns            | Behavior                                                                                                                   |
    633: | Method   | Returns                                  | Behavior                                                           |
    1009: | Entity     | Event map          | Events                                                                                                                                                                      |
    1392: | Event    | Payload         | Fires when                                                                      |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/workflow.md`):
    3: > Orchestration as DATA: a JSON-serializable `Workflow → Phase → Task` tree — strictly those levels, positional, no DAG — that a UI or an LLM authors, persistence stores, and a thin engine drives by COMPOSING the shipped execution substrate. Not a general DAG engine: it trades arbitrary dependency graphs for a fixed, deterministic shape, and writes none of its own concurrency / retry / abort machinery — it reuses what already ships.
- Opening prose after the blockquote (first two lines):
    5: Read the module as layers of one substrate, top to bottom:
    7: - **The tree describes.** The **definition** family (`WorkflowDefinition → PhaseDefinition → TaskDefinition`) is pure JSON — behavior referenced BY NAME, never inline functions — so the whole tree serializes, round-trips, and is safe for a 2B model to emit. One compiled [contract](contract.md) (`createWorkflowContract`) keeps the JSON Schema + guard + parser + seeded generator in lockstep with the hand-written interfaces, so definition and runtime can never drift.
- README (`README.md`) first lines:
    # @orkestrel/workflow
    
    A typed, host-independent workflow engine for the `@orkestrel` line. It keeps
    work as a serializable `Workflow → Phase → Task` tree and executes task behavior
    through a caller-supplied function registry on a cooperative scheduler.
    
    ## Install
    
    ```sh
    npm install @orkestrel/workflow
    ```
    
- `## Patterns` fences, each with its nearest preceding heading:
    23: fence under "## Surface"
    98: fence under "### The positional collection"
    131: fence under "### Scheduler (pacing)"
    273: fence under "### Helpers & guards"
    320: fence under "### Helpers & guards"
    553: fence under "#### `WorkflowPersistenceInterface`"
    707: fence under "### Authoring a definition (pure JSON)"
    739: fence under "### Validating + seeding with the contract"
    751: fence under "### Running a workflow"
    776: fence under "### The `bail` policy — graceful vs halt"
    789: fence under "### The `bail` policy — graceful vs halt"
    813: fence under "### The `bail` policy — graceful vs halt"
    827: fence under "### Bounding a run (abort / timeout / budget)"
    847: fence under "### Driving the live entity tree directly"
    867: fence under "### Forcing a terminal status — `skip` / `stop`"
    890: fence under "### Pausing, resuming, and parking on a run — `pause` / `resume` / `wait` / `destroy`"
    926: fence under "### Mutating the live tree — `add` / `remove` / `move` / `update` / `patch`"
    964: fence under "### Building the live tree by hand — `append`"
    996: fence under "### Observing the live tree"
    1021: fence under "### Long-running task activity and cooperative control"
    1048: fence under "### Snapshot & restore (the durable payload)"
    1077: fence under "### Persisting & restoring (the durable store)"
    1104: fence under "### Persisting & restoring (the durable store)"
    1116: fence under "### Managing workflows (registry + store seam)"
    1156: fence under "### The helper functions — guards, derivation, lineage & synthesis"
    1217: fence under "### Pacing with the scheduler — a cooperative loop"
    1237: fence under "### Backoff — delay a growing interval between attempts"
    1254: fence under "### Swapping the scheduler backend"
    1273: fence under "### Driving a set of units with the `Runner`"
    1284: fence under "### Bounded concurrency"
    1296: fence under "### Per-entry retries and timeout"
    1313: fence under "### Fanning out with `spawn`"
    1335: fence under "### The per-unit `ControllerInterface` handle — `wait` / `spawn` / `abort`"
    1356: fence under "### Fail-fast and abort"
    1378: fence under "### Observing the `Runner`"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/server/factories.ts:33:export function createNodeScheduler(): SchedulerInterface {
    src/browser/factories.ts:31:export function createBrowserScheduler(): SchedulerInterface {
    src/browser/factories.ts:57:export function createFrameScheduler(): SchedulerInterface {
    src/browser/factories.ts:83:export function createIdleScheduler(): SchedulerInterface {
    src/core/factories.ts:84:export function createWorkflowContract(): ContractInterface<WorkflowDefinition> {
    src/core/factories.ts:122:export function createWorkflow(
    src/core/factories.ts:164:export function createWorkflowTree(
    src/core/factories.ts:203:export function createRestoredWorkflow(
    src/core/factories.ts:232:export function createRecoveredWorkflow(
    src/core/factories.ts:282:export function createMemoryWorkflowStore(): WorkflowStoreInterface {
    src/core/factories.ts:321:export function createDatabaseWorkflowStore(
    src/core/factories.ts:378:export function createWorkflowRunner(options?: WorkflowRunnerOptions): WorkflowRunnerInterface {
    src/core/factories.ts:413:export function createWorkflowManager(options?: WorkflowManagerOptions): WorkflowManagerInterface {
    src/core/factories.ts:460:export function createScheduler(): SchedulerInterface {
    src/core/factories.ts:508:export function createRunner<TInput, TResult>(
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/server/NodeScheduler.ts:37:export class NodeScheduler implements SchedulerInterface {
    src/browser/IdleScheduler.ts:39:export class IdleScheduler implements SchedulerInterface {
    src/browser/FrameScheduler.ts:33:export class FrameScheduler implements SchedulerInterface {
    src/browser/BrowserScheduler.ts:40:export class BrowserScheduler implements SchedulerInterface {
    src/core/WorkflowPersistence.ts:31:export class WorkflowPersistence implements WorkflowPersistenceInterface {
    src/core/stores/MemoryWorkflowStore.ts:42:export class MemoryWorkflowStore implements WorkflowStoreInterface {
    src/core/stores/DatabaseWorkflowStore.ts:57:export class DatabaseWorkflowStore implements WorkflowStoreInterface {
    src/core/tasks/TaskController.ts:36:export class TaskController implements TaskControllerInterface {
    src/core/tasks/TaskManager.ts:42:export class TaskManager implements TaskManagerInterface {
    src/core/tasks/Task.ts:67:export class Task implements TaskInterface {
    src/core/Runner.ts:65:export class Runner<TInput, TResult> implements RunnerInterface<TInput, TResult> {
    src/core/WorkflowRunner.ts:129:export class WorkflowRunner implements WorkflowRunnerInterface {
    src/core/phases/PhaseManager.ts:40:export class PhaseManager implements PhaseManagerInterface {
    src/core/phases/Phase.ts:91:export class Phase implements PhaseInterface {
    src/core/Scheduler.ts:38:export class Scheduler implements SchedulerInterface {
    src/core/RunHolder.ts:19:export class RunHolder implements RunHolderInterface {
    src/core/Controller.ts:31:export class Controller<TInput, TResult> implements ControllerInterface<TInput, TResult> {
    src/core/Workflow.ts:99:export class Workflow implements WorkflowInterface {
    src/core/WorkflowManager.ts:50:export class WorkflowManager implements WorkflowManagerInterface {
    src/core/Collection.ts:44:export class Collection<
    src/core/errors.ts:21:export class WorkflowError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/NodeScheduler.ts:1
    src/server/factories.ts:1
    src/browser/IdleScheduler.ts:1
    src/browser/factories.ts:3
    src/browser/FrameScheduler.ts:1
    src/browser/BrowserScheduler.ts:1
    src/core/WorkflowPersistence.ts:1
    src/core/stores/MemoryWorkflowStore.ts:1
    src/core/stores/DatabaseWorkflowStore.ts:1
    src/core/tasks/TaskManager.ts:1
    src/core/tasks/Task.ts:1
    src/core/Runner.ts:1
    src/core/WorkflowRunner.ts:2
    src/core/cloners.ts:1
    src/core/phases/PhaseManager.ts:1
    src/core/validators.ts:8
    src/core/factories.ts:12
    src/core/Scheduler.ts:1
    src/core/helpers.ts:16
    src/core/RunHolder.ts:1
    src/core/Workflow.ts:1
    src/core/WorkflowManager.ts:1
    src/core/Collection.ts:1
    src/core/types.ts:13
    src/core/errors.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    34:} from '@orkestrel/guide'
    66:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    75:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    120:		for (const group of guide.methods()) {
    121:			const members = source.methods(group.interface)
    128:					expect(findMissing(members, group.methods)).toEqual([])
    131:					expect(findMissing(group.methods, members)).toEqual([])
    135:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    150:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    153:		for (const group of guide.methods()) {
    163:							? source.examples(group.interface)
    164:							: source.examples(group.interface).concat(source.examples(entity))
    165:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    177:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 1425:## Tests — 3 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.17"` → `"version": "0.0.18"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-workflow-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.

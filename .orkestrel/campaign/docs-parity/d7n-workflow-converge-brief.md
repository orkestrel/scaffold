# Brief — P.2 `d7n-workflow-converge` (workflow under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/workflow` from the committed baseline `84c043f` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.18`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/workflow.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/workflow/guides/workflow.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-workflow-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/workflow.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/workflow.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/workflow.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/workflow.md function createWorkflowContract: guide "The compiled workflow-definition `ContractInterface` — JSON Schema + guard + parser + seeded generator, all from one shape." source "Compiles the workflow definition contract — the JSON Schema, guard, parser, and seeded generator for a `WorkflowDefinition`, all derived from one shape and kept in lockstep."
guides/workflow.md function createWorkflow: guide "The live `WorkflowInterface` entity tree built from a `WorkflowDefinition` (every node `pending`)." source "Builds the live W-b entity tree from a `WorkflowDefinition` — the whole `WorkflowInterface` → `PhaseInterface` → `TaskInterface` tree, each level wired with its lineage context, its emitter, and the cascade."
guides/workflow.md function createWorkflowTree: guide "That tree built from an already-owned options bag — the one construction path the factory, the manager, and the runner share." source "Builds the live entity tree one definition and one owned options bag describe — the shared construction path behind every definition-driven mint."
guides/workflow.md function createRestoredWorkflow: guide "An equivalent live tree built from a `WorkflowSnapshot` — the inverse of `snapshot()` (structure + status + results + order)." source "Builds an equivalent live W-b entity tree from a `WorkflowSnapshot` — the inverse of `WorkflowInterface.snapshot`, restoring structure + each node's status + recorded results + positional order + the persisted `#override`."
guides/workflow.md function createRecoveredWorkflow: guide "An interrupted tree brought back to life — running leaves return to their remaining retry budget, or normalize to recovery failures." source "Builds an interrupted workflow back to life at its remaining retry budget."
guides/workflow.md function createMemoryWorkflowStore: guide "The in-memory default `WorkflowStoreInterface` — persists `WorkflowSnapshot`s by id (the durable-store seam; no TTL, no options)." source "Creates the in-memory durable `WorkflowStoreInterface` — a process-lifetime `MemoryWorkflowStore` persisting `WorkflowSnapshot`s by workflow id, the DEFAULT backend behind the W-d persistence seam."
guides/workflow.md function createDatabaseWorkflowStore: guide "The driver-pluggable `WorkflowStoreInterface` over a `databases` table (the snapshot as one JSON column; driver defaults to memory)." source "Creates a `DatabaseWorkflowStore` over any `DriverInterface` — the durable, driver-pluggable backing for the W-d persistence seam, the opt-in twin of `createMemoryWorkflowStore`."
guides/workflow.md function createWorkflowRunner: guide "The PURE `WorkflowRunnerInterface` engine over an optional `scheduler` — no behavior or provider registry." source "Creates the thin orchestrator — a `WorkflowRunnerInterface` — that EXECUTES a live W-b workflow tree by COMPOSING the shipped substrate: phases sequential, tasks concurrent, each task dispatched through its OWN resolved handler under the workflow's `bail` policy."
guides/workflow.md function createWorkflowManager: guide "The store-backed live-workflow registry; optional functions make hydrated named work runnable, while omission remains inspectable." source "Creates a `WorkflowManagerInterface` — the store-backed registry of `WorkflowInterface`s, the additive manager tier mirroring the `@orkestrel/agent` line's `createConversationManager` / `createWorkspaceManager`."
guides/workflow.md function createScheduler: guide "The cross-environment `setTimeout`-based default `SchedulerInterface`." source "Creates the safe cross-environment cooperative-yield default — a `SchedulerInterface` built on `setTimeout` / `clearTimeout` alone, so it runs unchanged in both the browser and Node."
guides/workflow.md function createRunner: guide "A `RunnerInterface` over a handler — drives a `Queue`, ordered + fail-fast `execute`." source "Creates a thin generic orchestrator that drives declared units — and any they `spawn` — through a bounded-concurrency queue, collecting their results in order."
guides/workflow.md class Workflow: guide absent source "Implements the live DERIVED state machine (W-b) for a whole workflow — the observable ROOT whose `LifecycleStatus` is computed from its phases under the `bail` policy and recomputed reactively as the cascade propagates up from a task transition."
guides/workflow.md class PhaseManager: guide absent source "Implements the lean child manager of a `Workflow`'s live phases — the phase vocabulary over one insertion-ordered `Collection`, the phase analogue of `TaskManager`."
guides/workflow.md class TaskManager: guide absent source "Implements the lean child manager of a `Phase`'s live tasks — the task vocabulary over one insertion-ordered `Collection`, so positional order is preserved across an interior `skip` / `remove`."
guides/workflow.md class Collection: guide absent source "Implements the insertion-ordered gated store both lean managers hold — entities keyed by `id`, positional order preserved across an interior `skip` or `remove`."
guides/workflow.md class WorkflowRunner: guide absent source "Implements the thin orchestrator that EXECUTES a live W-b workflow tree by COMPOSING the shipped substrate — phases sequential, tasks concurrent — dispatching each task through its OWN resolved handler under the `bail` policy."
guides/workflow.md class WorkflowPersistence: guide absent source "Coordinates advanced run-local snapshot persistence with one writer and one coalesced most recent obligation."
guides/workflow.md class Runner: guide absent source "Implements a thin generic orchestrator that drives declared units — and any they `spawn` — through a bounded-concurrency `createQueue`, collecting ordered results."
guides/workflow.md class RunHolder: guide absent source "Holds the active phase `RunnerInterface` for one `WorkflowRunnerInterface.execute` call, for the lifetime of that run."
guides/workflow.md class Scheduler: guide "The cross-environment cooperative-yield default — `yield` / `delay` over `setTimeout` alone." source "Implements the safe cross-environment cooperative-yield default — a `SchedulerInterface` built on `setTimeout` / `clearTimeout` alone, so it runs unchanged in both the browser and Node."
guides/workflow.md class NodeScheduler: guide "The Node backend — `yield` over `setImmediate`, verbatim abort fidelity through `scheduleHost`; priority a no-op." source "Implements the Node `SchedulerInterface` — the server-native cooperative-yield backend."
guides/workflow.md class BrowserScheduler: guide "The browser backend — `yield` over `scheduler.postTask` at the mapped priority, falling back to a macrotask; verbatim abort fidelity." source "Implements the browser `SchedulerInterface` — the browser-native cooperative-yield backend built on the Prioritized Task Scheduling API (`scheduler.postTask`), falling back to a zero-delay macrotask where it is absent."
guides/workflow.md class FrameScheduler: guide "The frame-aligned browser backend — `yield` over `requestAnimationFrame` (resume before paint); priority a no-op; verbatim abort." source "Implements the frame-aligned `SchedulerInterface` — a browser cooperative-yield backend whose `yield` resumes before the next paint through `requestAnimationFrame`."
guides/workflow.md class IdleScheduler: guide "The idle-time browser backend — `yield` over `requestIdleCallback`, falling back to a macrotask; priority a no-op; verbatim abort." source "Implements the idle-time `SchedulerInterface` — a browser cooperative-yield backend whose `yield` resumes when the host is idle through `requestIdleCallback`, falling back to a zero-delay macrotask where it is absent."
guides/workflow.md function createNodeScheduler: guide "The Node-native `SchedulerInterface` (`yield` over `setImmediate`)." source "Creates the Node-native cooperative-yield `SchedulerInterface` — `yield()` is a `setImmediate` host-turn (the canonical Node \"give the event loop a turn\"), `delay(ms)` a real `setTimeout`."
guides/workflow.md function createBrowserScheduler: guide "The browser-native `SchedulerInterface` (`yield` over `scheduler.postTask`, macrotask fallback)." source "Creates the browser-native cooperative-yield `SchedulerInterface` — `yield()` uses the Prioritized Task Scheduling API (`scheduler.postTask`) at the requested priority when present, falling back to a `setTimeout(0)` macrotask; `delay(ms)` is a real `setTimeout`."
guides/workflow.md function createFrameScheduler: guide "The frame-aligned `SchedulerInterface` (`yield` over `requestAnimationFrame`)." source "Creates the frame-aligned cooperative-yield `SchedulerInterface` — `yield()` resumes before the next paint through `requestAnimationFrame`; `delay(ms)` is a real `setTimeout`."
guides/workflow.md function createIdleScheduler: guide "The idle-time `SchedulerInterface` (`yield` over `requestIdleCallback`, macrotask fallback)." source "Creates the idle-time cooperative-yield `SchedulerInterface` — `yield()` resumes when the host is idle through `requestIdleCallback` when present, falling back to a `setTimeout(0)` macrotask; `delay(ms)` is a real `setTimeout`."
guides/workflow.md interface IdleInterface: guide absent source "Declares the narrowed `requestIdleCallback` / `cancelIdleCallback` pair feature-detected off `globalThis`."
guides/workflow.md const POST_TASK_PRIORITY: guide "The `SchedulerPriority` → `scheduler.postTask` priority map (`user` → `'user-blocking'`, `normal` → `'user-visible'`, `background` → `'background'`)." source "Maps each portable `SchedulerPriority` to the browser-native `postTask` priority — the Prioritized Task Scheduling API's three levels."
guides/workflow.md class MemoryWorkflowStore: guide absent source "Implements the in-memory `WorkflowStoreInterface` — a process-lifetime `Map` of `WorkflowSnapshot`s keyed by workflow id, the DEFAULT store `createMemoryWorkflowStore` builds."
guides/workflow.md class DatabaseWorkflowStore: guide absent source "Implements a `WorkflowStoreInterface` backed by one table of the `databases` layer — a workflow's durable run-state IS a row, so persistence reduces to keyed point-access (`get` / `set` / `delete`) over a `TableInterface`, the driver-pluggable twin of the plain-`Map` `MemoryWorkflowStore`."
guides/workflow.md class WorkflowManager: guide absent source "Implements the store-backed registry of `WorkflowInterface`s keyed by `id`, in insertion order — the additive manager tier mirroring the `@orkestrel/agent` line's `ConversationManager` / `WorkspaceManager`. Event-free (a registry, like its twins); the observability lives on each `WorkflowInterface`."
guides/workflow.md class WorkflowError: guide "Carries a `WorkflowErrorCode` (`TRANSITION` / `RESTORE` / `MUTATION` / `SCHEDULE` / `INVARIANT`) + an optional `context` naming the node or parameter." source "Represents an error raised by the workflow runtime."
guides/workflow.md function isWorkflowError: guide "The narrower from an unknown caught value to a `WorkflowError`." source "Narrows an unknown caught value to a `WorkflowError`."
guides/workflow.md function cloneWorkflowSnapshot: guide absent source "Validates and owns a workflow snapshot before live construction."
guides/workflow.md function isWorkflowSnapshot: guide absent source "Guards the hostile boundary totally for a workflow snapshot."
guides/workflow.md function isOwnedWorkflowSnapshot: guide absent source "Validates a safe owned JSON graph as a coherent workflow snapshot."
guides/workflow.md function isLifecycleStatus: guide absent source "Checks whether an unknown value belongs to the workflow lifecycle vocabulary."
guides/workflow.md function isTaskFailure: guide absent source "Tests a normalized persisted task failure."
guides/workflow.md function isTaskResult: guide absent source "Tests a result's lineage against its containing snapshot nodes."
guides/workflow.md function matchesDescription: guide absent source "Compares two optional description values."
guides/workflow.md function hasWorkflowHandlers: guide absent source "Tests that every named task has a callable runtime handler before dispatch."
guides/workflow.md function scanSnapshotContext: guide absent source "Locates the nearest identifiable node for an inconsistent owned snapshot."
guides/workflow.md function isTerminalStatus: guide absent source "Tests whether a `LifecycleStatus` is TERMINAL — a node in this state will not transition further."
guides/workflow.md function derivePhaseStatus: guide absent source "Derives a phase's status from its tasks' statuses (tasks are concurrent, so this is an order-insensitive reduction)."
guides/workflow.md function deriveWorkflowStatus: guide absent source "Derives a workflow's status from its phases' `PhaseDerivation`s — each phase's status paired with the EFFECTIVE `bail` it ran under (`phase.bail ?? workflow.bail`) — so the failure outcome is PER-PHASE-bail-aware (phases are sequential, but the derivation is an order-insensitive reduction over the settled set)."
guides/workflow.md function deriveBoundary: guide absent source "Derives the PENDING SUFFIX boundary of a positional list of `LifecycleStatus`es — the index of the first entry in the contiguous trailing run of `pending` entries."
guides/workflow.md function canTransitionTask: guide absent source "Tests whether the live W-b task state machine may move directly from one `LifecycleStatus` to another — the legal-transition guard."
guides/workflow.md function resolveTaskSilence: guide absent source "Resolves a task's runtime silence window against its workflow default."
guides/workflow.md function cloneTaskActivity: guide absent source "Validates and clones one complete task activity frame."
guides/workflow.md function isTaskActivityInput: guide absent source "Tests whether an unknown value is a valid whole-frame activity report."
guides/workflow.md function isTaskActivity: guide absent source "Tests whether an unknown value is valid persisted task activity."
guides/workflow.md function captureWorkflowOptions: guide absent source "Captures every top-level `WorkflowOptions` value exactly once into an owned plain bag."
guides/workflow.md function scheduleHost: guide absent source "Schedules one cancellable host operation behind an owned settlement signal."
guides/workflow.md function success: guide absent source "Boxes a value as a `Success` — the graceful outcome half of a `Result`."
guides/workflow.md function failure: guide absent source "Boxes an error as a `Failure` — the graceful outcome half of a `Result`."
guides/workflow.md function errorToMessage: guide absent source "Normalizes an unknown thrown value to a non-empty persistence-safe message."
guides/workflow.md function findFailure: guide absent source "Finds the first `TaskResult` in a positional list whose boxed outcome is a `Failure` — the pure scan shared by a phase's and a workflow's derived-`failed` `fail`-event lookup."
guides/workflow.md function buildWorkflowContext: guide absent source "Builds a `WorkflowContext` — the identity every level inherits — from a node's `id` / `name` / optional `description`."
guides/workflow.md function buildPhaseContext: guide absent source "Builds a `PhaseContext` — a phase's own identity plus a back-reference to its workflow — from the parent `WorkflowContext` and the phase node's identity."
guides/workflow.md function buildTaskContext: guide absent source "Builds a `TaskContext` — a task's own identity plus a back-reference to its phase (and, transitively, its workflow) — from the parent `PhaseContext` and the task node's identity."
guides/workflow.md function definitionToSnapshot: guide absent source "Converts a `WorkflowDefinition` into an INITIAL `WorkflowSnapshot` — every node `pending`, no results, empty metadata — so the live W-b tree has ONE construction path (snapshot-driven) for both a fresh build and a restore."
guides/workflow.md function phaseDefinitionToSnapshot: guide absent source "Converts one `PhaseDefinition` into an initial, all-`pending` `PhaseSnapshot` — the per-phase step of `definitionToSnapshot`."
guides/workflow.md function taskDefinitionToSnapshot: guide absent source "Converts one `TaskDefinition` into an initial, `pending` `TaskSnapshot` — the per-task leaf step of `definitionToSnapshot` (no result yet, empty metadata)."
guides/workflow.md function recoverWorkflowSnapshot: guide absent source "Converts interrupted running work into a recoverable pending suffix or an exhausted recovery failure without replenishing attempts."
guides/workflow.md function collectResults: guide absent source "Flattens a nested list of per-phase `TaskResult` lists into one positional list — the workflow tier of the result tree, built from each phase's `results()`."
guides/workflow.md function parkSignal: guide absent source "Parks until `signal` aborts — a promise-parked wait, never a timer or busy-loop, that NEVER rejects."
guides/workflow.md function insertEntry: guide absent source "Inserts one `[key, value]` entry at a positional index into a readonly entries array — the pure splice-in step behind an insertion-ordered registry's `add`."
guides/workflow.md function moveEntry: guide absent source "Repositions the entry keyed `key` to a new positional index in a readonly entries array — the pure remove-then-reinsert step behind an insertion-ordered registry's `move`."
guides/workflow.md function delayHost: guide absent source "Schedules the shared host timer boundary every scheduler backend resumes from."
guides/workflow.md function isWorkflowInterface: guide absent source "Checks whether an unknown value is a live workflow entity rather than a definition."
guides/workflow.md function isTaskClaimList: guide absent source "Checks whether an unknown value is a valid list of task activity claims."
guides/workflow.md function cloneTaskClaims: guide absent source "Validates and owns one list of task activity claims."
guides/workflow.md function isHalted: guide absent source "Tests whether a driving run must stop giving a workflow more work."
guides/workflow.md function isStoppable: guide absent source "Tests whether forcing a workflow `stopped` would still record something."
guides/workflow.md function isCompletable: guide absent source "Tests whether a naturally-finished run may force its workflow `completed`."
guides/workflow.md function isSkipping: guide absent source "Tests whether a task attempt is being genuinely cancelled rather than merely timed out."
guides/workflow.md function ownsAttempt: guide absent source "Tests whether one attempt still owns the task it launched."
guides/workflow.md const taskShape: guide "The `TaskDefinition` shape — identity + an optional `behavior` registry-key string." source "Describes the shape of a `TaskDefinition` — identity plus an optional `behavior` behavior reference (a plain registry-key string, min length 1). `description` is optional prose."
guides/workflow.md const phaseShape: guide "The `PhaseDefinition` shape — identity + ordered `taskShape` tasks + an optional positive-integer `concurrency`." source "Describes the shape of a `PhaseDefinition` — identity, its ordered `taskShape` tasks, and an optional positive-integer `concurrency` throttle (max tasks in flight; omitted ⇒ unbounded)."
guides/workflow.md const workflowShape: guide "The `WorkflowDefinition` shape (the contract root) — identity + ordered `phaseShape` phases + an optional `bail`." source "Describes the shape of a `WorkflowDefinition` — the contract root: identity, its ordered `phaseShape` phases, and the optional `bail` boolean failure policy (the literal pair `true`/`false`, the runtime mirror of the boolean toggle; omitted ⇒ the graceful default)."
guides/workflow.md const taskUpdateShape: guide "The `TaskUpdate` shape — a partial edit to a `pending` task's `name` / `description`, both optional." source "Describes the shape of a `TaskUpdate` — a partial edit to a `pending` task's `name` / `description`, both optional."
guides/workflow.md const phaseUpdateShape: guide "The `PhaseUpdate` shape — a partial edit to a `pending` phase's `name` / `description` / `concurrency` / `bail`." source "Describes the shape of a `PhaseUpdate` — a partial edit to a `pending` phase's `name` / `description` / `concurrency` / `bail`, all optional."
guides/workflow.md const DEFAULT_BAIL: guide absent source "Names the default `WorkflowDefinition.bail` — graceful (continue on a leaf failure)."
guides/workflow.md const LIFECYCLE_STATUSES: guide absent source "Lists every `LifecycleStatus` value, frozen — the vocabulary every tier draws from."
guides/workflow.md const TERMINAL_STATUSES: guide absent source "Lists the `LifecycleStatus` values that are TERMINAL — a node in one of these will not transition further, frozen."
guides/workflow.md const TASK_TRANSITIONS: guide absent source "Declares the legal `LifecycleStatus` transition graph of the live W-b task state machine — each current status mapped to the statuses it may move to directly, frozen."
guides/workflow.md const DEFAULT_PHASE_CONCURRENCY: guide absent source "Names the default per-phase task concurrency the `createWorkflowRunner` runner applies when a `PhaseDefinition` omits its `concurrency` throttle — a cap that is effectively unbounded for any realistic phase."
guides/workflow.md const MAX_TIMER_MS: guide absent source "Names the largest delay representable by the host timer APIs without overflow or clamping."
guides/workflow.md const PERSISTED_NODE_EVENTS: guide absent source "Lists the `WorkflowEventMap` / `PhaseEventMap` events that make a durable observer re-persist the live tree, frozen."
guides/workflow.md const PERSISTED_TASK_EVENTS: guide absent source "Lists the `TaskEventMap` events that make a durable observer re-persist the live tree, frozen."
guides/workflow.md interface TaskDefinition: guide absent source "Represents the serializable definition of one task — its identity plus an optional reference to the behavior it runs."
guides/workflow.md interface PhaseDefinition: guide absent source "Represents the serializable definition of one phase — its identity, its ordered tasks, and an optional resource throttle."
guides/workflow.md interface WorkflowDefinition: guide absent source "Represents the serializable definition of a whole workflow — its identity, its ordered phases, and the `bail` failure policy."
guides/workflow.md interface WorkflowContext: guide absent source "Represents the ambient context of a workflow — the identity every level inherits."
guides/workflow.md interface PhaseContext: guide absent source "Represents the ambient context of a phase — its own identity plus a back-reference to the workflow it belongs to."
guides/workflow.md interface TaskContext: guide absent source "Represents the ambient context of a task — its own identity plus a back-reference to the phase (and, transitively, the workflow) it belongs to."
guides/workflow.md type WorkflowInput: guide absent source "Represents the minimal data to create a workflow context — a partial `WorkflowContext`."
guides/workflow.md type PhaseInput: guide absent source "Represents the minimal data to create a phase context — a partial `PhaseContext`."
guides/workflow.md interface TaskInput: guide absent source "Represents the minimal data to create a task context — a partial `TaskContext` plus any creation-only fields."
guides/workflow.md interface TaskProgress: guide absent source "Represents the aggregate progress most recently reported by a running task."
guides/workflow.md interface TaskClaim: guide absent source "Represents one identified thing a running task claims active, with the moment the claim began."
guides/workflow.md interface TaskOperation: guide absent source "Represents one operation claimed active when a running task's complete frame was accepted."
guides/workflow.md interface TaskConstraint: guide absent source "Represents one constraint claimed active when a running task's complete frame was accepted."
guides/workflow.md interface TaskActivityInput: guide absent source "Represents one complete replacement of a running task's observable activity."
guides/workflow.md interface TaskActivity: guide absent source "Represents the bounded, JSON-serializable activity most recently accepted from a task reporter."
guides/workflow.md interface TaskUpdate: guide absent source "Represents a declarative partial update to a `TaskInterface` — the fields a `pending` task's `TaskInterface.patch` (and the owning `TaskManagerInterface.update`) accept, runtime-validated through `taskUpdateShape`."
guides/workflow.md interface PhaseUpdate: guide absent source "Represents a declarative partial update to a `PhaseInterface` — the fields a `pending` phase's `PhaseInterface.patch` (and the owning `PhaseManagerInterface.update`) accept, runtime-validated through `phaseUpdateShape`."
guides/workflow.md type WorkflowErrorCode: guide absent source "Names the machine-readable code of a `WorkflowError` — the fault the live W-b state machine raises."
guides/workflow.md type LifecycleStatus: guide absent source "Names the shared lifecycle vocabulary every tier draws from — `pending` before it runs, `running` while in flight, then one of the terminal states `completed` / `failed` / `skipped` / `stopped`."
guides/workflow.md interface PhaseDerivation: guide absent source "Represents one phase's contribution to the workflow-status derivation — its `LifecycleStatus` paired with the EFFECTIVE `bail` policy it ran under (`phase.bail ?? workflow.bail`)."
guides/workflow.md type TaskFailureOrigin: guide absent source "Names where a task failure arose — the axis a persisted `TaskFailure` records."
guides/workflow.md interface TaskFailure: guide absent source "Represents a normalized JSON-safe task failure persisted without a stack or cause."
guides/workflow.md interface TaskResult: guide absent source "Represents the structured outcome of a task execution — its full lineage, its terminal status, the moment it settled, and its boxed produced outcome."
guides/workflow.md interface TaskSnapshot: guide absent source "Represents a JSON-serializable snapshot of one task's state — the leaf of the snapshot tree the durable store (W-d) persists."
guides/workflow.md interface PhaseSnapshot: guide absent source "Represents a JSON-serializable snapshot of one phase's state — its identity, status, its forced override (if any), and its nested task snapshots."
guides/workflow.md interface WorkflowSnapshot: guide absent source "Represents a JSON-serializable snapshot of a whole workflow's state — its identity, status, its forced override (if any), the `bail` policy it ran under, its nested phase snapshots, and creation / update timestamps."
guides/workflow.md interface WorkflowStoreInterface: guide absent source "Declares the durable persistence seam for a `WorkflowSnapshot` — three async primitives (`get` / `set` / `delete`) keyed by a workflow id, the snapshot analogue of the server package's `SessionStoreInterface` (and the `@orkestrel/queue` `QueueStoreInterface` driver-swap pattern)."
guides/workflow.md interface WorkflowSnapshotRow: guide absent source "Represents one row of the table a `DatabaseWorkflowStore` persists — a workflow `id` plus its `WorkflowSnapshot` held as ONE OPAQUE JSON column."
guides/workflow.md type WorkflowEventMap: guide absent source "Declares the push observation surface of the workflow entity (W-b) — the lifecycle moments a fire-and-forget observer subscribes to through `workflow.emitter.on`."
guides/workflow.md type PhaseEventMap: guide absent source "Declares the push observation surface of the phase entity (W-b) — analogous to `WorkflowEventMap`, scoped to one phase."
guides/workflow.md type TaskEventMap: guide absent source "Declares the push observation surface of the task entity (W-b) — the lifecycle moments of one task."
guides/workflow.md interface TaskOptions: guide absent source "Declares the runtime options for a `TaskInterface` — the construction bag the live leaf state machine (W-b) carries that the W-a `TaskDefinition` did not."
guides/workflow.md interface PhaseOptions: guide absent source "Declares the runtime options for a `PhaseInterface` — the construction bag the live derived phase state machine (W-b) carries."
guides/workflow.md interface WorkflowOptions: guide absent source "Declares the runtime options for a `WorkflowInterface` — the construction bag the live derived workflow state machine (W-b) carries, the root `createWorkflow` accepts."
guides/workflow.md interface WorkflowInterface: guide absent source "Declares the live derived state machine (W-b) for a whole `WorkflowDefinition` — the observable root whose `LifecycleStatus` is DERIVED from its phases under the `bail` policy and recomputed reactively as the cascade propagates up."
guides/workflow.md interface PhaseInterface: guide absent source "Declares the live derived state machine (W-b) for one `PhaseDefinition` — an observable phase whose `LifecycleStatus` is DERIVED from its tasks (never set directly) and recomputed reactively as a task transitions (the cascade)."
guides/workflow.md interface TaskInterface: guide absent source "Declares the live leaf state machine (W-b) for one `TaskDefinition` — an observable, guarded synchronous task whose explicit `LifecycleStatus` advances through the declared transitions."
guides/workflow.md interface TaskManagerInterface: guide absent source "Declares the lean child manager of a `PhaseInterface`'s live tasks — positional accessors plus `count`, backed by an insertion-ordered store so order is preserved across an interior `skip` / `remove`."
guides/workflow.md interface PhaseManagerInterface: guide absent source "Declares the lean child manager of a `WorkflowInterface`'s live phases — positional accessors plus `count`, the phase analogue of `TaskManagerInterface`."
guides/workflow.md interface CollectionEntry: guide absent source "Declares what the `CollectionInterface` store requires of the entities it holds — a stable `id`, a gating `LifecycleStatus`, and a `patch` the store applies after validation."
guides/workflow.md interface CollectionInterface: guide absent source "Declares an insertion-ordered store of `CollectionEntry` entities keyed by `id`, with the gated mutation quartet a lean manager delegates to."
guides/workflow.md type WorkflowFunction: guide absent source "Declares the registered behavior a `function`-form `TaskDefinition` runs, resolved BY NAME through the `WorkflowRegistry` registry — a function type the framework invokes."
guides/workflow.md type WorkflowRegistry: guide absent source "Declares the `function`-task behavior registry — workflow function names mapped to their `WorkflowFunction` handlers."
guides/workflow.md interface TaskControllerInterface: guide absent source "Declares the per-task handle a `WorkflowFunction` receives — the running task's cancellation, its input, its lineage, and read-UP access to the result tree."
guides/workflow.md type AttemptOutcome: guide absent source "Names how one task attempt left the race between its handler and its cancellation."
guides/workflow.md interface RunHolderInterface: guide absent source "Holds the phase `RunnerInterface` one `WorkflowRunnerInterface.execute` call is driving, for the lifetime of that run."
guides/workflow.md interface WorkflowResult: guide absent source "Represents the structured outcome of a `WorkflowRunnerInterface.execute` run — the settled live workflow, its final status, and the flattened result tree."
guides/workflow.md type WorkflowCheckpoint: guide absent source "Names a runner-owned durability boundary."
guides/workflow.md interface WorkflowFault: guide absent source "Represents a normalized persistence failure surfaced as workflow result data."
guides/workflow.md interface WorkflowPersistenceInterface: guide absent source "Declares the advanced run-local durability coordinator normally composed by `WorkflowRunnerInterface.execute` when `store` is supplied."
guides/workflow.md type WorkflowRunOptions: guide absent source "Declares the options for one `WorkflowRunnerInterface.execute` call — the live tree's CONSTRUCTION options (`WorkflowOptions`) PLUS the per-run RUN CONTROLS: the bounds (an external abort, a deadline, and a cost ceiling), each folded into every task's cancellation, and the optional durable `store`."
guides/workflow.md interface WorkflowRunnerOptions: guide absent source "Declares the options for `createWorkflowRunner` — the optional pacing scheduler the runner paces phase boundaries with."
guides/workflow.md interface WorkflowRunnerInterface: guide absent source "Declares a thin orchestrator that EXECUTES a live `WorkflowInterface` tree by composing the shipped substrate — phases sequential, tasks concurrent, each task dispatched through its OWN resolved handler under the `bail` policy."
guides/workflow.md interface WorkflowManagerOptions: guide absent source "Declares the options for `createWorkflowManager` — the optional durable `WorkflowStoreInterface` seam plus the `WorkflowRegistry` registry every workflow the manager mints or hydrates resolves its tasks' handlers against."
guides/workflow.md interface WorkflowManagerInterface: guide absent source "Declares a store-backed registry of `WorkflowInterface`s keyed by their `id`, in insertion order — the additive manager tier mirroring `ConversationManagerInterface` / `WorkspaceManagerInterface` from the `@orkestrel/agent` line, adapted for the workflow domain: `add` mints from a `WorkflowDefinition` (not an empty `Input`, because a workflow only exists relative to a definition), and the optional `store` seam's `open` threads the manager's `WorkflowRegistry` registry so a HYDRATED workflow is immediately RUNNABLE, not merely a restored state mirror. NO `active` / `switch` pointer — the workflow domain has no consumer that renders \"the current workflow\" the way an agent context renders the active conversation/workspace."
guides/workflow.md type SchedulerPriority: guide absent source "Names the relative urgency hint for cooperative scheduling. Honoured by environment backends; the cross-environment default treats all priorities uniformly."
guides/workflow.md interface SchedulerOptions: guide absent source "Declares the options for a single cooperative yield/delay."
guides/workflow.md interface SchedulerInterface: guide absent source "Declares a cooperative host-yield primitive: a loop decides WHAT to do; the scheduler decides WHEN the host regains control. Abort-aware — a pending yield/delay rejects with the signal's reason when aborted."
guides/workflow.md interface ControllerInterface: guide absent source "Declares the per-unit handle a `RunnerHandler` receives — the running unit's identity, input, cancellation, and the controls to cooperate with the run."
guides/workflow.md type RunnerHandler: guide absent source "Runs one unit's work, given its `ControllerInterface`."
guides/workflow.md interface RunnerOptions: guide absent source "Declares the options for `createRunner`."
guides/workflow.md interface RunnerEntryOptions: guide absent source "Declares the per-entry reliability OVERRIDES for one unit — its extra attempts on failure and its per-attempt deadline, resolved from the unit's input through `RunnerOptions.entries`."
guides/workflow.md interface RunnerInterface: guide absent source "Declares a thin generic orchestrator that drives declared units — plus any they `spawn` — through a bounded-concurrency queue, collecting their results in order."
guides/workflow.md type RunnerEventMap: guide absent source "Declares the push observation surface of a `RunnerInterface` — the run lifecycle a fire-and-forget observer (logging, metrics, tracing) subscribes to, ALONGSIDE the eventual `execute` result."
guides/workflow.md interface RunnerUnit: guide absent source "Represents one unit the `RunnerInterface` is tracking: the queue payload it was enqueued with — its `id` (a random UUID) keys it in the runner's ordered launch list and value map, and `input` is the unit's work payload handed to the handler's `Controller`."
guides/workflow.md WorkflowInterface.phase: guide absent source "Looks up one live phase by its `id`."
guides/workflow.md WorkflowInterface.results: guide absent source "Lists every settled task's result across all phases, in positional order — the workflow tier of the result tree."
guides/workflow.md WorkflowInterface.skip: guide absent source "Forces this workflow to `skipped`, overriding the derived value; idempotent."
guides/workflow.md WorkflowInterface.stop: guide absent source "Forces this workflow to `stopped`, overriding the derived value; idempotent."
guides/workflow.md WorkflowInterface.complete: guide absent source "Forces this workflow to `completed`, overriding the derived value."
guides/workflow.md WorkflowInterface.pause: guide absent source "Suspends the workflow (resumable); idempotent."
guides/workflow.md WorkflowInterface.resume: guide absent source "Continues a paused workflow; idempotent — a no-op unless `paused`."
guides/workflow.md WorkflowInterface.destroy: guide absent source "Tears this workflow down — an atomic TERMINAL teardown: mark `destroyed`, pin non-terminal workflow/phase overrides to `stopped`, stop every non-terminal task, release gates and liveness resources, abort `signal`, then destroy task, phase, and workflow emitters in ownership order; idempotent."
guides/workflow.md WorkflowInterface.wait: guide absent source "Parks until this workflow is not paused — **promise-parked**, never a timer or busy-loop (mirrors `ControllerInterface.wait`'s doc style)."
guides/workflow.md WorkflowInterface.add: guide absent source "Mints a live `PhaseInterface` (and its tasks) from `definition` and inserts it into this workflow (the entity structural API) — gated BEFORE delegating to `phases`' manager."
guides/workflow.md WorkflowInterface.remove: guide absent source "Removes the `pending` phase `id` from this workflow."
guides/workflow.md WorkflowInterface.move: guide absent source "Repositions the `pending` phase `id` to `index` within this workflow."
guides/workflow.md WorkflowInterface.update: guide absent source "Applies a validated `PhaseUpdate` patch to the `pending` phase `id` in this workflow."
guides/workflow.md WorkflowInterface.snapshot: guide absent source absent
guides/workflow.md PhaseInterface.task: guide absent source "Looks up one live task by its `id`."
guides/workflow.md PhaseInterface.results: guide absent source "Lists the settled tasks' results, in positional order — the phase tier of the result tree."
guides/workflow.md PhaseInterface.skip: guide absent source "Forces this phase to `skipped`, overriding the derived value; idempotent."
guides/workflow.md PhaseInterface.stop: guide absent source "Forces this phase to `stopped`, overriding the derived value; idempotent."
guides/workflow.md PhaseInterface.pause: guide absent source "Suspends the phase (resumable); idempotent."
guides/workflow.md PhaseInterface.resume: guide absent source "Continues a paused phase; idempotent — a no-op unless `paused`."
guides/workflow.md PhaseInterface.wait: guide absent source "Parks until this phase is not paused — **promise-parked**, never a timer or busy-loop (mirrors `WorkflowInterface.wait`)."
guides/workflow.md PhaseInterface.add: guide absent source "Mints a live `TaskInterface` from `definition` and inserts it into this phase (the entity structural API) — gated BEFORE delegating to `tasks`' manager."
guides/workflow.md PhaseInterface.remove: guide absent source "Removes the `pending` task `id` from this phase."
guides/workflow.md PhaseInterface.move: guide absent source "Repositions the `pending` task `id` to `index` within this phase."
guides/workflow.md PhaseInterface.update: guide absent source "Applies a validated `TaskUpdate` patch to the `pending` task `id` in this phase."
guides/workflow.md PhaseInterface.patch: guide absent source "Applies a validated declarative patch to SELF (`name` / `description` / `concurrency` / `bail`)."
guides/workflow.md PhaseInterface.snapshot: guide absent source absent
guides/workflow.md TaskInterface.start: guide absent source absent
guides/workflow.md TaskInterface.complete: guide absent source absent
guides/workflow.md TaskInterface.fail: guide absent source absent
guides/workflow.md TaskInterface.skip: guide absent source absent
guides/workflow.md TaskInterface.stop: guide absent source absent
guides/workflow.md TaskInterface.report: guide absent source "Replaces the complete observable activity of this running task."
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
guides/workflow.md WorkflowManagerInterface.add: guide absent source "Mints a live `WorkflowInterface` from `definition` (through `createWorkflow`, flowing this manager's `functions` registry in) and register it under `definition.id`."
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
```

## Facts for workflow (taken 2026-09-07T21:06Z by facts.sh)

- Checkout `/home/user/fleet/workflow`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `84c043f`, status: clean
- `package.json`: version `0.0.18`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    121:			const members = source.methods(group.interface).map((method) => method.name)
    129:					expect(findMissing(members, documented)).toEqual([])
    132:					expect(findMissing(documented, members)).toEqual([])
    138:							: findMissing(
    139:									source.methods(entity).map((method) => method.name),
    157:				findUnexampled(
    160:					source.examples().map((example) => example.name),
    165:		for (const group of guide.methods()) {
    170:					? source.examples(group.interface).map((example) => example.name)
    174:							.concat(source.examples(entity).map((example) => example.name))
    181:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    193:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 1425:## Tests — 3 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-workflow-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/workflow.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/workflow.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the gate cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the gate cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-workflow-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.

# Report — P.2 `d7n-workflow-converge`

Checkout `/home/user/fleet/workflow`, branch `claude/orkestrel-npm-audit-deps-14ibta`, baseline `84c043f`. Wall clock from the first command to the last: 2026-09-07T21:12:41Z → 2026-09-07T21:39:03Z. Uncommitted, as the brief requires. Every acceptance criterion reads green.

## Criterion 1 — red-first on the unconverged tree

`PATH=/opt/npm11/bin:$PATH npm run test:guides` → `Test Files 1 failed (1) | Tests 3 failed | 98 passed (101)`, log retained at `tmp/d7n-workflow-converge/redfirst-test-guides.log.txt`. Each added case failed:

```text
FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/workflow.md pairs: guide [\"Surface\",\"The positional collection\",\"Scheduler (pacing)\", … \"Observing the Runner\"] source []",

FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:131:20

FAIL  |guides| tests/guides.test.ts > Workflow > keeps every compared summary and example equal to its source
AssertionError: expected [ …(248) ] to deeply equal []
+   "guides/workflow.md function createWorkflowContract: guide \"The compiled workflow-definition `ContractInterface` — JSON Schema + guard + parser + seeded generator, all from one shape.\" source \"Compiles the workflow definition contract — the JSON Schema, guard, parser, and seeded generator for a `WorkflowDefinition`, all derived from one shape and kept in lockstep.\"",
```

The same command after convergence: `Test Files 1 passed (1) | Tests 101 passed (101)`.

## Criterion 2 — the tables

Header renames (`Behavior` / `Role` / `Value` → `Summary`), run by `tmp/d7n-workflow-converge/tables.mjs`, one line per header row of the baseline: `87`, `120`, `187`, `196` (the class tables), `220` (`### Helpers & guards`), `350` (`### Constants`), and every `## Methods` header at `439`, `460`, `480`, `499`, `513`, `527`, `539`, `547`, `567`, `581`, `592`, `601`, `615`, `623`, `633`. Tables gaining a column: `### Types` (`173` and `363`) took `Summary` as its last column; `### Constants` and the `POST_TASK_PRIORITY` table (`177`) took `Shape` before `Summary`; `### Shapes` took `Shape` after the cells converged. Every table now heads `Summary` beside only `Kind`, `Shape`, or `Returns`.

`### Entities` does not occur in this guide and no class is documented under its own H3, so Ruling 5's rename and the added `### Classes` table have no site here. The all-class tables keep their descriptive headings (`### The entity tree`, `### The execution substrate`, `### Stores`, `### Registry`) under Ruling 16.

`Shape` idiom (Ruling 12, 15, 18, 19), stated once above each table that carries the column:

- `### Types` and the `IdleInterface` table: "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`."
- `### Constants` and the `POST_TASK_PRIORITY` table: "A `Shape` cell holds the constant's declared type."
- `### Shapes`: "A `Shape` cell holds the interface the shape value compiles into."

Every `Shape` cell was rewritten to that idiom: a member's type is gone from every interface row (`SchedulerOptions` became `{ priority?, signal? }`), an extending interface lists its whole member set (`PhaseContext` became `{ id, name, description?, workflow }`), a method-only interface reads `{} plus get, set, delete`, an event-map alias takes bare member names per Ruling 19 (`TaskEventMap` became `{ start, complete, fail, pause, resume, skip, stop, report, pulse, silence }`), and a function alias keeps its own type literal (`WorkflowFunction`).

Rows whose literal stayed in `Shape`, unchanged from the baseline: `TaskDefinition`, `PhaseDefinition`, `WorkflowDefinition`, `WorkflowContext`, `TaskProgress`, `TaskClaim`, `TaskOperation`, `TaskConstraint`, `TaskActivityInput`, `TaskUpdate`, `PhaseUpdate`, `WorkflowErrorCode`, `LifecycleStatus`, `PhaseDerivation`, `TaskFailureOrigin`, `TaskFailure`, `TaskResult`, `TaskSnapshot`, `PhaseSnapshot`, `WorkflowSnapshot`, `WorkflowSnapshotRow`, `TaskOptions`, `PhaseOptions`, `WorkflowOptions`, `WorkflowRegistry`, `WorkflowResult`, `WorkflowCheckpoint`, `WorkflowFault`, `WorkflowRunnerOptions`, `WorkflowManagerOptions`, `SchedulerPriority`, `WorkflowInput`, `PhaseInput`, `RunnerEntryOptions`, `RunnerUnit`, and `WorkflowFunction`.

Hand-rebuild comparison against `git show HEAD:guides/workflow.md`, by `tmp/d7n-workflow-converge/cells.mjs`: `rows compared: 258, rows missing after: 0`, and every reported difference is a `Shape` cell — no `Kind`, `Returns`, or key cell moved, and no row was lost or cut.

## Criterion 3 — the doc blocks, then `--to guide`

Blocks rewritten by hand before the propagation, each because the guide cell carried a fact the block lacked or shouted emphasis a cell must not carry:

- **`src/core/factories.ts`**: `createWorkflow` (every node born `pending`), `createRecoveredWorkflow` (an exhausted leaf normalizes to a recovery failure), `createMemoryWorkflowStore` (no options, no expiry — a snapshot lives until an explicit `delete`), `createDatabaseWorkflowStore` (one opaque JSON column, driver defaulting to memory), `createWorkflowRunner` (the engine's purity and its single scheduler option), `createWorkflowManager` (a factory's preference stated as the contract it returns: runnable with `functions`, inspectable without), `createRunner` (fail-fast).
- **`src/core/types.ts`**: `TaskDefinition`, `PhaseDefinition`, `TaskInput`, `TaskClaim`, `TaskActivityInput`, `PhaseDerivation`, `PhaseSnapshot`, `WorkflowSnapshotRow`, `PhaseInterface`, `WorkflowInterface`, `WorkflowFunction`, `TaskControllerInterface`, `WorkflowResult`, `WorkflowRunOptions`, `WorkflowRunnerInterface`, `WorkflowManagerInterface`, `SchedulerInterface`, `RunnerEventMap`, `RunnerEntryOptions`, `RunnerOptions`, and the members `TaskInterface.patch`, `TaskInterface.start`, `TaskInterface.complete`, `TaskInterface.fail`, `TaskInterface.skip`, `TaskInterface.stop`, `TaskInterface.snapshot`, `PhaseInterface.wait`, `PhaseInterface.add`, `PhaseInterface.patch`, `PhaseInterface.snapshot`, `WorkflowInterface.destroy`, `WorkflowInterface.wait`, `WorkflowInterface.add`, `WorkflowInterface.snapshot`, `TaskManagerInterface.add`, `TaskManagerInterface.task`, `TaskManagerInterface.tasks`, `PhaseManagerInterface.add`, `PhaseManagerInterface.phase`, `PhaseManagerInterface.phases`, `WorkflowRunnerInterface.execute`, `WorkflowManagerInterface.workflow`, `WorkflowManagerInterface.workflows`, `WorkflowManagerInterface.add`, `WorkflowManagerInterface.open`, `WorkflowManagerInterface.save`, `WorkflowManagerInterface.clear`, `ControllerInterface.wait`, `RunnerInterface.spawn`, `RunnerInterface.pause`, and `RunnerInterface.stop`.
- **`src/core/constants.ts`** (Ruling 18, the literal named in the description): `DEFAULT_BAIL` (`false`), `LIFECYCLE_STATUSES` (its ordered values), `TERMINAL_STATUSES` (its values), `DEFAULT_PHASE_CONCURRENCY` (`1024`), `MAX_TIMER_MS` (`2_147_483_647` milliseconds), `PERSISTED_NODE_EVENTS` and `PERSISTED_TASK_EVENTS` (their event names). **`src/browser/constants.ts`**: `POST_TASK_PRIORITY` names each mapping — `user`, `normal`, and `background` — and loses the count "three levels".
- **The classes**: `Workflow`, `WorkflowRunner`, `WorkflowPersistence` (composed through `execute({ store })`), `MemoryWorkflowStore` (no expiry), `DatabaseWorkflowStore`, `WorkflowError` (its code set and its `context`), `NodeScheduler`, `BrowserScheduler`, `FrameScheduler`, `IdleScheduler` (each backend's yield primitive, its verbatim abort reason, and whether `priority` acts).
- **`src/core/helpers.ts`**: `isTerminalStatus`, `isHalted` (a forced phase counts), `isStoppable` (it records the cancellation), `derivePhaseStatus` (the most severe terminal wins), `deriveWorkflowStatus` (`failed` only under a `true` policy), `deriveBoundary` (the list's length where there is no pending run), `resolveTaskSilence` (the host-safe window or `undefined`), `definitionToSnapshot`, `parkSignal`.

These interface members carried no doc block at all, so `findDrift` read `source absent` for each: `WorkflowInterface.snapshot`, `PhaseInterface.snapshot`, `TaskInterface.start` / `complete` / `fail` / `skip` / `stop` / `snapshot`, `PhaseManagerInterface.phase` / `phases`, `TaskManagerInterface.task` / `tasks`, `WorkflowManagerInterface.workflow` / `workflows` / `clear`. Each gained a block written from the guide cell, verb-first with its `@param` and `@returns`.

Ruling 7 splits: the `WorkflowManagerInterface` description keeps the registry's shape and mirroring, and its "no `active` / `switch` pointer" rationale moved into a new `@remarks` bullet rather than being dropped. The `WorkflowError` remark's opening sentence, which the rewritten description now repeats, was pruned to the `context` fact alone. No fact needed a landing in guide prose beside a table: the cell facts no block could hold — the `execute` overload pair and the mid-run `add` continuity — already live in `WorkflowRunnerInterface.execute`'s description and remarks.

Runs, in the brief's order:

```text
$ npm run docs                       exit 1: rows read: 1, disagreements found: 249   (after the headers; no row reads `guide absent`)
$ npm run docs -- --to guide         rows read: 1, disagreements found: 249, written: 248, reported: 1   (the pitch, authored by hand)
$ npx oxfmt --write guides/workflow.md   exit 0
$ npm run docs                       exit 1: rows read: 1, disagreements found: 1     (the pitch alone)
```

## Criterion 4 — the titled pair

The titled block is `createWorkflowRunner`'s, the primary factory the `## Surface` fence demonstrates (`src/core/factories.ts:368`). That fence sits under the structural `## Surface` heading, so Ruling 9's heading landed directly above it: `### Author a definition and run it` (`guides/workflow.md:27`). The text occurs once, heading-scoped (`grep -n '^#\+ Author a definition and run it' guides/workflow.md` → one hit at `27`), and the fence body carries neither an inner fence run nor a doc-comment terminator (`sed -n '24,66p' guides/workflow.md | grep -n '\*/\|```'` → the opener at the body's first line and the closer at its last).

Ruling 14: the fence demonstrates everything the block's example did — the runner, the definition, `execute` with its registry, the settled status, the task status — and adds the typed `WorkflowDefinition` import, a second phase, and `result.results`. Nothing the block demonstrated is absent from the fence, so the fence is the fuller side and the block took it whole.

```text
$ npm run docs                       exit 1: rows read: 1, disagreements found: 1     (the example pair, the summaries at zero)
$ npm run docs -- --to source        rows read: 1, disagreements found: 1, written: 1, reported: 0
$ npx oxfmt --write src/core/factories.ts   exit 0
```

Every other `@example` block stays untitled.

## Criterion 5 — the tagline, the pitch, and the prose

The H1 blockquote (`guides/workflow.md:3`) and the README pitch (`README.md:3`) are one text, one noun phrase in plain text and code spans, with no link and no bold:

```text
> Orchestration as data: a JSON-serializable `Workflow → Phase → Task` tree that a UI or an
> LLM authors, a store persists, and a thin engine drives by composing the shipped execution
> substrate.
```

The displaced clauses fold into the guide's opening prose directly after the blockquote, without restating the tagline: "The levels are exactly those, positional, and never a graph: this is not a general DAG engine, and it trades arbitrary dependency edges for a fixed, deterministic shape. It writes none of its own concurrency, retry, or abort machinery either — it reuses what already ships."

The README's opening paragraph carries its own onboarding — authoring the definition, registering the functions, handing both to the runner, the host-independence and the browser-native and Node-native backends, and the `@orkestrel` line — and restates no tagline clause.

Voice sweep over the prose this unit owns (`tmp/d7n-workflow-converge/shout.mjs`, then read back as a diff): every all-caps emphasis outside code spans, table rows, and acronyms is lowered in `guides/workflow.md` — the words `PURE`, `NEVER`, `ONCE`, `NOT`, `FORCE`, `DERIVED`, `BY NAME`, `PENDING SUFFIX`, `GRACEFUL`, and `RUNTIME-ONLY` among them — and the sentence-initial casings the sweep lowered were repaired by hand afterwards: `Both stores implement`, `Doc ↔ source bijection`, `Doc ↔ source method bijection`, `Doc ↔ source method bijection (scheduler)`, and `Real data throughout`. The error codes `TRANSITION`, `MUTATION`, `RESTORE`, `SCHEDULE`, and `INVARIANT` stay upper-case: they are literal values, not emphasis. `README.md` needed no site. The same sweep ran over every description paragraph the cells now carry, so no cell shouts; the only remaining upper-case runs in a compared description are the `W-a`/`W-b`/`W-c`/`W-d` tier labels and `JSON-serializable`. No count in prose was introduced, and none was found outside the sentences that name their members ("both directions", "both stores").

§ Tests (`guides/workflow.md:1441`) names the equality gate descriptively on the `tests/guides.test.ts` row: every `Summary` cell against its declaration's description paragraph, the titled `Author a definition and run it` fence against the `@example` block of that title, and the README pitch against this guide's tagline. No SQ/MQ/EQ/RQ identifier appears.

## Criterion 6 — the seed reads zero

```text
$ npm run docs                       exit 0: rows read: 1, disagreements found: 0
$ npm run docs -- --to guide         rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source        rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — the gates

```text
$ npx oxfmt --check <the owned paths>                                    exit 0: All matched files use the correct format.
$ npx oxlint --config .oxlintrc.json --deny-warnings src tests/guides.test.ts   exit 0 (no diagnostic)
$ npm run check                                                          exit 0
$ npm run test:guides                                                    Test Files 1 passed (1) | Tests 101 passed (101)
$ npm run test:policy                                                    Test Files 1 passed (1) | Tests 90 passed | 1 skipped (91)
```

Observation, taken under sibling-unit load: `npm run test:src:core` → `Test Files 21 passed (21) | Tests 821 passed (821)`, duration 3.75s.

## Criterion 8 — the tree

`git status --short` lists owned files only: `README.md`, `guides/workflow.md`, `tests/guides.test.ts`, and the doc-block edits in `src/browser/{BrowserScheduler,FrameScheduler,IdleScheduler,constants}.ts`, `src/core/{Workflow,WorkflowPersistence,WorkflowRunner,constants,errors,factories,helpers,types}.ts`, `src/core/stores/{MemoryWorkflowStore,DatabaseWorkflowStore}.ts`, and `src/server/NodeScheduler.ts`. Instruments sit under the git-ignored `tmp/d7n-workflow-converge/`. `package.json` and the lockfile are untouched.

## Diffstat

```text
 README.md                                |  12 +-
 guides/workflow.md                       | 804 ++++++++++++++++---------------
 src/browser/BrowserScheduler.ts          |   5 +-
 src/browser/FrameScheduler.ts            |   3 +-
 src/browser/IdleScheduler.ts             |   3 +-
 src/browser/constants.ts                 |   5 +-
 src/core/Workflow.ts                     |   2 +-
 src/core/WorkflowPersistence.ts          |   3 +-
 src/core/WorkflowRunner.ts               |   4 +-
 src/core/constants.ts                    |  23 +-
 src/core/errors.ts                       |   8 +-
 src/core/factories.ts                    |  66 ++-
 src/core/helpers.ts                      |  36 +-
 src/core/stores/DatabaseWorkflowStore.ts |   2 +-
 src/core/stores/MemoryWorkflowStore.ts   |   5 +-
 src/core/types.ts                        | 204 +++++---
 src/server/NodeScheduler.ts              |   4 +-
 tests/guides.test.ts                     |  86 +++-
 18 files changed, 747 insertions(+), 528 deletions(-)
```

## The drop-in's canonical text

`tests/guides.test.ts` matches the pilot byte for byte outside this package's constants block and its executed section: `diff <(sed -n '44,258p' /home/user/fleet/abort/tests/guides.test.ts) <(sed -n '68,282p' tests/guides.test.ts)` reports nothing. The header line takes the pilot's own current wording — "The constants that follow are this package's own, as is the executed section that closes the file." — which the pilot landed at `f54ab91` after Ruling 13's amendment, because every sibling's executed half contradicts the earlier "only part a sibling package changes" clause. The `INTERNAL` block reads "the assertion that follows it", the equality case sits directly after the methods loop and before the examples case (`tests/guides.test.ts:205`, the examples case at `215`), the examples case is named `documents an example for every Surface function`, the pin is the guard-and-continue loop with no local predicate (`96`), the README case guards each side with `not.toBeUndefined()` before `toBe` (`125`), `ROOT_FILES` carries `README.md` (`69`), and `GUIDE_SPEC` (`45`) is the spec path the pin, the README case, and the executed half all read.

## Reader and seed defects met

None. Every row the readers located converged, `--to guide` reported only the hand-authored pitch, `--to source` wrote the titled example alone, and no cell came back with the `- word` wrap artifact or an empty rendering the pass has seen elsewhere.

## Decisions recorded (ancillary)

- **Where the displaced tagline clauses sit**: one paragraph directly under the blockquote, before the existing "Read the module as layers of one substrate" list, so the reader meets the scope limit before the layer walk.
- **The `### Shapes` table takes `Shape`**: the table's rows are `const` shape values whose declared type is inferred, so the cell holds the interface each value compiles into, with its own convention sentence. Without it this guide would carry constants tables both with and without the column.
- **The `POST_TASK_PRIORITY` table takes `Shape` too**, on the constants sentence, for the same consistency.
- **The caps sweep's scope in source**: every description paragraph a cell now carries, plus the remark paragraphs of blocks whose description this unit rewrote. A remark of an untouched block keeps its own emphasis.
- **The heading over the titled fence** is `### Author a definition and run it` rather than a `####`, because the fence's structural parent is the `## Surface` H2.

## Deviation state

No deviation. Nothing was planted for the Orchestrator's lint control, and this unit planted no control of its own to reverse: the red-first reading came from the added gate cases themselves — the equality case, the pin, and the README case — which stay in the tree green.

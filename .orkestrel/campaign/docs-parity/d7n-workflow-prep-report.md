# Report — P.1 `d7n-workflow-prep`

Checkout `/home/user/fleet/workflow`, branch `claude/orkestrel-npm-audit-deps-14ibta`, baseline tip `bde9d91`. Wall clock from the first command to the last: 2026-09-07T20:49:04Z → 2026-09-07T20:56:19Z. Uncommitted, as the brief requires.

Every item landed. Every acceptance criterion reads green except `docs`, which reads the expected red with the converge unit's worklist.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`, exit 0. Summary line:

```text
0 of 46 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 12.
tsconfig.json replaced (3 lines added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 38 unchanged, 0 removed in ..
```

`git status --short` directly after it — the P21 list exactly:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

`package.json` took the `docs` script row; `tsconfig.json` took the own-specifier `paths` entries (`@orkestrel/workflow`, `@orkestrel/workflow/browser`, `@orkestrel/workflow/server`).

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Every before-text was found verbatim and replaced once. The hunk:

```diff
 		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
 					expect(extra).toEqual([])
 				})
 			})
@@
 			const names = guide
 				.surface()
 				.filter((symbol) => symbol.keyword === 'function')
 				.map((symbol) => symbol.name)
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})
 
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

The adapted region matches `/home/user/fleet/abort/tests/guides.test.ts:145-215` line for line. The `group.methods.length` assertion stays. The string-argument calls stay: the import walk's `findMissing(names, surface)` against `imported.surface().map((symbol) => symbol.name)`, and every `findMissingSymbols` call. Nothing else in the suite changed.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 printed the P20 population: `policy(no-malformed-summary)` in `tests/setup.ts`, and `policy(no-banned-term)` in `src/browser/FrameScheduler.ts` and `src/browser/factories.ts`. No diagnostic named an off-limits file. Every rewrite moved prose only: no code token moved, nothing was renamed, and no assertion's value changed.

### `tests/setup.ts` — `policy(no-malformed-summary)` at each line the diagnostic named

Each pair is the description paragraph's first sentence, before and after. Line numbers are those of the run that reported them (after item 1, before the rewrites).

| Line | Before | After |
| ---- | ------ | ----- |
| 27 | `Shared invalid task activity frames used by cloner and guard boundary tests.` | `Lists the invalid task activity frames the cloner and guard boundary tests share.` |
| 57 | ``Every {@link import('@src/core').WorkflowEventMap} event name, in declaration order.`` | ``Lists every {@link import('@src/core').WorkflowEventMap} event name, in declaration order.`` |
| 72 | `One recorded workflow event name.` | `Names one recorded workflow event.` |
| 75 | ``Every {@link import('@src/core').PhaseEventMap} event name, in declaration order.`` | ``Lists every {@link import('@src/core').PhaseEventMap} event name, in declaration order.`` |
| 90 | `One recorded phase event name.` | `Names one recorded phase event.` |
| 93 | ``Every {@link import('@src/core').TaskEventMap} event name, in declaration order.`` | ``Lists every {@link import('@src/core').TaskEventMap} event name, in declaration order.`` |
| 107 | `One recorded task event name.` | `Names one recorded task event.` |
| 110 | ``Every {@link import('@src/core').RunnerEventMap} event name, in declaration order.`` | ``Lists every {@link import('@src/core').RunnerEventMap} event name, in declaration order.`` |
| 121 | `One recorded runner event name.` | `Names one recorded runner event.` |
| 124 | `Copy a task snapshot while omitting its exact-optional activity field.` | `Copies a task snapshot while omitting its exact-optional activity field.` |
| 147 | `Resolve a required live task fixture or throw a fixture-construction error.` | `Resolves a required live task fixture, or throws a fixture-construction error.` |
| 156 | `Build a real TaskController over a live task for direct handle tests.` | `Builds a real TaskController over a live task for direct handle tests.` |
| 173 | ``A scripted real {@link WorkflowStoreInterface} boundary whose queued gates control store settlement while its readonly histories expose the exact durable calls made by a test.`` | ``Controls store settlement through queued gates, as a scripted real {@link WorkflowStoreInterface} boundary whose readonly histories expose the exact durable calls made by a test.`` |
| 222 | `A real budget boundary whose signal getter throws the supplied setup failure.` | `Implements a real budget boundary whose signal getter throws the supplied setup failure.` |
| 270 | ``Create a recorder for an {@link import('@orkestrel/emitter').EmitterErrorHandler} — the emitter's own listener-error channel: …`` | ``Creates a recorder for an {@link import('@orkestrel/emitter').EmitterErrorHandler} — the emitter's own listener-error channel: …`` |
| 286 | ``A real {@link AbortSignal}'s `'abort'` listener bookkeeping — adds vs. removes counted.`` | ``Records a real {@link AbortSignal}'s `'abort'` listener bookkeeping — adds against removes.`` |
| 294 | ``Instrument a REAL {@link AbortSignal}'s listener bookkeeping by wrapping its own `addEventListener` / `removeEventListener` …`` | ``Instruments a REAL {@link AbortSignal}'s listener bookkeeping by wrapping its own `addEventListener` / `removeEventListener` …`` |
| 339 | ``A {@link SchedulerInterface} that records how many real turn boundaries its `yield` paced.`` | ``Records how many real turn boundaries a {@link SchedulerInterface}'s `yield` paced.`` |
| 345 | `A recorder over one shipped scheduler instance.` | `Wraps one shipped scheduler instance as a recorder.` |
| 368 | ``Create a {@link RecordingSchedulerInterface} that counts `yield` calls before delegating both methods to one shipped scheduler instance.`` | ``Creates a {@link RecordingSchedulerInterface} that counts `yield` calls before delegating both methods to one shipped scheduler instance.`` |
| 387 | ``A real, valid {@link WorkflowDefinition} stub — a workflow with two phases, one task of each `via` form, …`` | ``Builds a real, valid {@link WorkflowDefinition} stub — a workflow with two phases, one task of each `via` form, …`` |
| 462 | ``A real two-phase `release` {@link WorkflowDefinition} (≥1 task each) — phase `build` runs two `function` tasks concurrently, …`` | ``Builds a real two-phase `release` {@link WorkflowDefinition} (≥1 task each) — phase `build` runs two `function` tasks concurrently, …`` |
| 494 | ``The registered behaviors a {@link buildReleaseDefinition}'s tasks dispatch to BY NAME — each a real {@link WorkflowFunction} returning a distinct value, …`` | ``Holds the registered behaviors a {@link buildReleaseDefinition}'s tasks dispatch to BY NAME — each a real {@link WorkflowFunction} returning a distinct value, …`` |
| 505 | ``Drive a `definition` to a SETTLED {@link WorkflowSnapshot} through the real runner — the live tree is built, executed …`` | ``Drives a `definition` to a SETTLED {@link WorkflowSnapshot} through the real runner — the live tree is built, executed …`` |
| 522 | `Whether a repository-relative Vue SFC path belongs to the private browser application.` | `Reports whether a repository-relative Vue SFC path belongs to the private browser application.` |

Each rewritten opener matches `POLICY_VOICE_PATTERN` and names no `POLICY_VOICE_STOPWORDS` member, and no first sentence names its own declaration.

### `src/browser/**` — `policy(no-banned-term)`, `just (delete)`

| Site | Before | After |
| ---- | ------ | ----- |
| `src/browser/FrameScheduler.ts:4` (class doc block) | ``whose `yield` resumes just before the next paint through `requestAnimationFrame`.`` | ``whose `yield` resumes before the next paint through `requestAnimationFrame`.`` |
| `src/browser/FrameScheduler.ts:34` (`yield` method doc block) | `Yields control to the host until just before the next paint through` | `Yields control to the host until the moment before the next paint through` |
| `src/browser/factories.ts:35` (`createFrameScheduler` doc block) | ```yield()` resumes just before the next paint through `requestAnimationFrame`;`` | ```yield()` resumes before the next paint through `requestAnimationFrame`;`` |

### `guides/workflow.md:154` — the prose sweep's `prose` rule

`npm run test:policy` after the source rewrites reported exactly the hit the brief named, and no other:

```text
+ [
+   {
+     "line": 154,
+     "message": "prose carries no banned term: just (delete)",
+     "path": "guides/workflow.md",
+     "rule": "prose",
+   },
+ ]
```

The edit at that line, and nothing else in that file:

```diff
-- `FrameScheduler.yield()` resumes just before the next paint through `requestAnimationFrame` (and `cancelAnimationFrame` on abort) — for work that must batch per render frame and naturally pause while the tab is hidden. `priority` is a no-op.
+- `FrameScheduler.yield()` resumes before the next paint through `requestAnimationFrame` (and `cancelAnimationFrame` on abort) — for work that must batch per render frame and naturally pause while the tab is hidden. `priority` is a no-op.
```

### Ancillary decisions, recorded

- `src/browser/FrameScheduler.ts:34` reads `until the moment before the next paint`. A bare deletion leaves `until before the next paint`, which is ungrammatical; the replacement keeps the timing fact the sentence carried.
- `tests/setup.ts` `isBrowserVuePath` moved from a single-line doc block to a multi-line one, because the `Reports whether` opener pushes the single line past the file's 100-character width.
- The `RELEASE_FUNCTIONS` doc block was rewrapped after its opener changed. `oxfmt` does not rewrap comment prose.

## Item 4 — the bump

```diff
-	"version": "0.0.17",
+	"version": "0.0.18",
```

`package-lock.json` untouched, and no install ran. `@orkestrel/guide` still declares `^0.0.17`.

## Acceptance criteria

### 1 — `git status --short` lists the P21 repair list plus this unit's files, and nothing else

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M guides/workflow.md
 M package.json
 M src/browser/FrameScheduler.ts
 M src/browser/factories.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Beyond the P21 list: `tests/guides.test.ts` (item 2), `tests/setup.ts`, `src/browser/FrameScheduler.ts`, `src/browser/factories.ts`, `guides/workflow.md:154` (item 3), and `package.json` (the repair's `docs` row plus item 4's `version`). Diffstat:

```text
 .oxlintrc.json                |   4 +-
 configs/helpers.ts            |  15 +-
 configs/policy.ts             | 534 +++++++++++++++++++++++++++++++++------
 guides/workflow.md            |   2 +-
 package.json                  |   5 +-
 src/browser/FrameScheduler.ts |   4 +-
 src/browser/factories.ts      |   2 +-
 tests/config.test.ts          | 431 ++++++++++++++++++++++++++++++-
 tests/guides.test.ts          |  36 ++-
 tests/policy.test.ts          | 128 +++++++++-
 tests/setup.ts                |  59 ++---
 tests/setupPolicy.ts          | 572 ++++++++++++++++++++++++++++++++++++------
 tsconfig.json                 |   5 +-
 13 files changed, 1580 insertions(+), 217 deletions(-)
```

The instruments this unit wrote sit under the git-ignored `tmp/d7n-workflow-prep/` inside the checkout (`git check-ignore` confirms `.gitignore:11:tmp`).

### 2 — `format:check`, `oxlint`, `check`

`npm run format:check`, exit 0:

```text
All matched files use the correct format.
Finished in 2664ms on 107 files using 4 threads.
```

`npx oxlint --config .oxlintrc.json --deny-warnings .`, exit 0, printing nothing.

`npm run check`, exit 0. It runs `tsc --noEmit --project tsconfig.json` (the project that collects `tests/**`, where P21 read the `TS2345` errors) and then `check:src:core`, `check:src:browser`, `check:src:server`:

```text
> @orkestrel/workflow@0.0.18 check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
```

### 3 — `test:guides`, `test:policy`, `test:config`

`npm run test:guides`, exit 0:

```text
 Test Files  1 passed (1)
      Tests  98 passed (98)
   Start at  20:54:21
   Duration  1.03s (transform 407ms, setup 459ms, import 246ms, tests 180ms, environment 0ms)
```

`npm run test:policy`, exit 0:

```text
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Start at  20:54:43
   Duration  810ms (transform 371ms, setup 342ms, import 107ms, tests 242ms, environment 0ms)
```

`npm run test:config`, exit 0:

```text
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
   Start at  20:54:49
   Duration  4.55s (transform 639ms, setup 434ms, import 899ms, tests 3.10s, environment 0ms)
```

### 4 — `npm run docs` reads a non-zero `rows read` and exits 1

Exit 1, terminal line `rows read: 1, disagreements found: 249` — the same disagreement total P21 read. The rows carrying text this unit changed on the source side are `class FrameScheduler` and `function createFrameScheduler`, and each already disagreed before that change. The worklist, verbatim, follows.

## The `docs` worklist, verbatim

```text

> @orkestrel/workflow@0.0.18 docs
> node --experimental-strip-types scripts/docs.ts

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
```

## Deviation state

No deviation. `repair` wrote the P21 list exactly, every before-text was found verbatim, no voice diagnostic named an off-limits file, `test:policy` reddened only on `guides/workflow.md:154` (in scope for item 3), and every gate other than `docs` reads green.

Observations, outside the criteria:

- `npm ls` reports `@orkestrel/guide@0.0.18` `invalid` against the declared `^0.0.17` range, as the standing conditions state. No install ran here.
- The gates ran while sibling units loaded the host. Each one reported its own duration and passed; no timing failure occurred.

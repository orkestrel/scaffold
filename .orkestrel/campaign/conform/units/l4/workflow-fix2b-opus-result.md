Fix round 2 is complete. All Sites of the stopped brief plus the successor's two added sites are edited, and every gate is green.

## Rewritten doc sentences

- `src/core/Workflow.ts:40` — `… for a whole workflow — the observable * ROOT whose {@link LifecycleStatus} is computed from its phases under the `bail` policy and` rejoined and rewrapped to `… for a whole workflow — the observable ROOT` / `whose {@link LifecycleStatus} is computed from its phases under the `bail` policy and`.
- `src/core/types.ts:661` — ``A `type` alias * so it satisfies `EventMap`.`` became ``A `type` alias so it satisfies `EventMap`.``, matching the sentence the sibling block at `src/core/types.ts:698` already carried.

## Abbreviation rewrites

- `src/core/types.ts:306` — `an illegal state-machine transition (for example, `start`ing a task that is not `pending` …`
- `src/core/types.ts:834` — `an illegal transition (for example, completing a non-`running` task) throws …`
- `src/core/types.ts:959` — `derived value (for example, skipping a whole phase); the override survives a snapshot.`
- `src/core/types.ts:1920` — `A PATHOLOGICAL `definition` (for example, a duplicate phase or task `id`) THROWS SYNCHRONOUSLY …`
- `src/core/types.ts:2337` — `wired at construction (for example, `{ finish: (r) => log(r) }`).`
- `src/core/phases/Phase.ts:46` — `FORCE the phase's status (for example, skipping a whole phase) …`
- `src/core/tasks/Task.ts:45` — `on an illegal move (for example, completing a non-`running` task) …`
- `src/core/WorkflowRunner.ts:462` — `Not a signal cancel (for example, a normal phase settle, or a bail-true fail-fast the caller already `fail`ed) …`
- `tests/src/browser/IdleScheduler.test.ts:10` — `(for engines without rIC, for example Safari) …`
- `tests/src/core/Runner.test.ts:527` — `a sentinel-based `#collect` (for example, `if (value)` or `value !== SENTINEL`) …`

## Renamed case

`tests/guides.test.ts:253` — `reads a count of 2 back from the positional collection fence` became `reads the documented positional collection fence`. The body is unchanged, so `expect(store.count).toBe(2)` still reads the value the fence documents.

## Moved factories and their proofs

Both are host-independent, so `tests/setup.ts` took them; `tests/setupServer.ts` was not involved.

- `/home/user/fleet/workflow/tests/setup.ts:438` — `buildTasks()`, returning the live compile, scan, and audit tasks a fresh `buildWorkflowDefinition` tree holds.
- `/home/user/fleet/workflow/tests/setup.ts:458` — `buildCollection(noun = 'task')`, returning an empty `Collection<TaskInterface, TaskUpdate>` gated by the real compiled `taskUpdateShape`.
- `/home/user/fleet/workflow/tests/src/core/Collection.test.ts:4` imports both from `../../setup.js`; the file declares no factory of its own.

The `noun` parameter is the round's one ancillary decision, taken under the deviation contract. The case at `tests/src/core/Collection.test.ts:38` proves the constructor's noun reaches the refusal message and had constructed its own `Collection` inline; without the parameter that construction and the `Collection`, `TaskInterface`, `TaskUpdate`, `compileGuard`, and `taskUpdateShape` imports behind it would have stayed local, which is the duplication O2 names. The parameter forwards unchanged, so the case now reads `buildCollection('phase')` and asserts the same message.

Proofs in `tests/setup.test.ts`, each deriving its expectation by a route the helper does not share:

- `tests/setup.test.ts:324` — returns every live task the definition declares, in declaration order; expected ids are flat-mapped from `buildWorkflowDefinition()` rather than copied from the addresses the factory names, and every returned task reads `pending`.
- `tests/setup.test.ts:337` — mints a fresh tree per call: a `start()` on one call's task leaves a later call's task `pending` and not the same instance.
- `tests/setup.test.ts:350` — returns an empty store naming the noun it was given: `count` is `0`, `entries()` is empty, and a duplicate `append` reports `duplicate phase id '<id>'`.
- `tests/setup.test.ts:365` — defaults the noun to `task` and wires the real compiled guard: the duplicate message reads `duplicate task id '<id>'`, and `update(id, { name: '' })` fails, which a permissive stand-in guard would not.

## Sweeps

`grep -rnE '\be\.g\.|\bi\.e\.' src tests guides/workflow.md guides/README.md README.md` — before the round it returned exactly the sites listed under the abbreviation rewrites; after, empty (exit 1).

`grep -rnE '\w \* \w' src tests` — no doc-block hit remains. Every hit is permitted: `export * from` at `src/core/index.ts:1-20`, `src/browser/index.ts:1-6`, `src/server/index.ts:1-2`; `import * as` at `tests/setupPolicy.ts:12`, `tests/setupPolicy.ts:2823`, `tests/setupServer.test.ts:1`, `tests/setupBrowser.test.ts:1`, `tests/config.test.ts:20`, `tests/distribution.test.ts:485`, `tests/distribution.test.ts:553`; arithmetic multiplication at `src/core/factories.ts:456`, `tests/src/core/Controller.test.ts:83`, and `tests/src/core/Runner.test.ts:12,19,450,456,479,480,481,946,952,1010,1138,1150,1223`.

The report's earlier `\be\.g\.\b` row is corrected in place: its recorded empty reading was false, because a terminal `\b` cannot follow the pattern's final period.

Sites outside Owned: none.

## `git status --short`

```
 M README.md
 M guides/README.md
 M guides/workflow.md
 M src/browser/BrowserScheduler.ts
 M src/browser/IdleScheduler.ts
 M src/browser/types.ts
 M src/core/Collection.ts
 M src/core/Controller.ts
 M src/core/RunHolder.ts
 M src/core/Runner.ts
 M src/core/Workflow.ts
 M src/core/WorkflowManager.ts
 M src/core/WorkflowPersistence.ts
 M src/core/WorkflowRunner.ts
 M src/core/cloners.ts
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/index.ts
 M src/core/phases/Phase.ts
 M src/core/phases/PhaseManager.ts
 M src/core/shapers.ts
 M src/core/stores/DatabaseWorkflowStore.ts
 M src/core/stores/MemoryWorkflowStore.ts
 M src/core/tasks/Task.ts
 M src/core/tasks/TaskController.ts
 M src/core/tasks/TaskManager.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupBrowser.ts
 M tests/setupServer.ts
 M tests/src/browser/BrowserScheduler.test.ts
 M tests/src/browser/FrameScheduler.test.ts
 M tests/src/browser/IdleScheduler.test.ts
 M tests/src/browser/factories.test.ts
 A tests/src/core/Collection.test.ts
 M tests/src/core/Controller.test.ts
 M tests/src/core/RunHolder.test.ts
 M tests/src/core/Runner.test.ts
 M tests/src/core/Scheduler.test.ts
 M tests/src/core/Workflow.test.ts
 M tests/src/core/WorkflowManager.test.ts
 M tests/src/core/WorkflowPersistence.test.ts
 M tests/src/core/WorkflowRunner.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/phases/Phase.test.ts
 M tests/src/core/phases/PhaseManager.test.ts
 M tests/src/core/shapers.test.ts
 M tests/src/core/stores/DatabaseWorkflowStore.test.ts
 M tests/src/core/stores/MemoryWorkflowStore.test.ts
 M tests/src/core/tasks/Task.test.ts
 M tests/src/core/tasks/TaskManager.test.ts
 M tests/src/core/validators.test.ts
 M tests/src/server/factories.test.ts
```

The list is identical to the one the round began with. Nothing new appears.

## Gate exit codes

| Command | Exit |
| ------- | ---- |
| `npm run format:check` | 0 — "All matched files use the correct format", 106 files |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run test:guides` | 0 — 1 file / 98 tests passed |
| `npm run test:setup` | 0 — 3 files / 29 tests passed |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/Collection.test.ts` | 0 — 1 file / 15 tests passed |

A verbose `setup` run confirms each added case is collected by the `setup` project and green: `buildTasks > returns every live task the definition declares, in declaration order`, `buildTasks > mints a fresh tree per call, so a transition on one call cannot reach a later one`, `buildCollection > returns an empty store naming the entity noun it was given`, and `buildCollection > defaults the noun to the task vocabulary and wires the real compiled guard`.

The round's section is appended to `/home/user/scaffold/tmp/units/conform/conform-workflow-report.md` as `## Fix round 2`, naming the stopped brief, its successor, and the objective lane's file. No deviation: nothing stopped the unit, and the `noun` parameter is recorded there as the round's ancillary decision.

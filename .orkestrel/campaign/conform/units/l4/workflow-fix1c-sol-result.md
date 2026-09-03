## Sweep

Pattern: `\b(should|simply|easy|easier|just|currently|now|new|latest|soon|utilize|utilizes|leverage|leverages|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|sanity check|dummy|blacklist|whitelist|ensure|ensures|guarantee|guarantees)\b|\bsince\b|\bonce\b`, case-insensitive.

Paths: `guides/workflow.md`, `guides/README.md`, `README.md`, `src`, and `tests`.

## Rewrites

- `guides/workflow.md:382`: `broken internal guarantee` → `broken internal invariant`
- `guides/workflow.md:549`: `latest live state` → `most recent live state`
- `guides/workflow.md:550`: `latest obligation` → `most recent obligation`
- `guides/workflow.md:663`: `model guarantees the phase cannot reach` → `model keeps the phase from reaching`
- `guides/workflow.md:673`: `terminal, currently running` → `terminal, running`
- `guides/workflow.md:697`: `latest follow-up` → `most recent follow-up`
- `guides/workflow.md:1110`: `latest obligation` → `most recent obligation`
- `guides/workflow.md:1376`: `Subscribe via` → `Subscribe through`
- `guides/workflow.md:1404`: `safety guarantee` → `safety contract`
- `guides/workflow.md:1409`: `guarantees the inputs are ready` → `the inputs are ready after it`
- `guides/workflow.md:1442`: `latest final snapshot` → `most recent final snapshot`
- `src/core/WorkflowPersistence.ts:14,71`: `latest` → `most recent`
- `src/core/WorkflowRunner.ts:80,180,459,576,965`: temporal `once` → `after`; `:184`: causal `since` → `because`
- `src/core/cloners.ts:51`: causal `since` → `because`
- `src/core/validators.ts:310,429`: causal `since` → `because`
- `src/core/helpers.ts:105,140,616,1170`: temporal `once` → `after`; `:127`: `since` → `because`; `:463`: `guarantees ... since` → `means ... because`
- `src/core/Controller.ts:18`: causal `since` → `because`
- `src/core/types.ts:263`: `immutable once created` → `immutable after creation`
- `src/core/types.ts:328`: removed `the engine guarantees`
- `src/core/types.ts:550,1835,1955,2032,2043`: causal `since` → `because`
- `src/core/types.ts:838,859,922,1000,1009,1051,1203,1212,1230,1283,1305,1364,1945,2263,2423,2464`: temporal `once` → `after`
- `src/core/types.ts:1075,1082`: removed behavioral `guarantees`
- `src/core/types.ts:1644`: `A NEW, lean handle` → `A lean handle`
- `src/core/types.ts:1779,1784`: `latest` → `most recent`
- `src/core/tasks/Task.ts:80`: temporal `once` → `after`
- `src/core/Runner.ts:54,99,157,238,251`: temporal `once` → `after`
- `src/core/phases/Phase.ts:247,257`: temporal `once` → `after`
- `src/core/Workflow.ts:238,248`: temporal `once` → `after`
- `tests/setup.ts:466`: `via` → `through`
- `tests/src/browser/BrowserScheduler.test.ts:18`: `sanity check` → `quick check`
- `tests/src/core/Workflow.test.ts:280,821,1456`: `just` → `only`
- `tests/src/core/Workflow.test.ts:838,856,1160,1249`: `via` → `through`
- `tests/src/core/Workflow.test.ts:942,957,1202,1294`: temporal `once` → `after`
- `tests/src/core/Workflow.test.ts:1298,1310`: deleted temporal `now`
- `tests/src/core/stores/MemoryWorkflowStore.test.ts:75`: `via` → `through`; `:108`: `guarantee` → `contract`
- `tests/src/core/stores/DatabaseWorkflowStore.test.ts:80,280`: `via` → `through`; `:209`: `latest` → `most recent`
- `tests/src/core/tasks/TaskManager.test.ts:71,126,173`: `via` → `through`
- `tests/src/core/phases/Phase.test.ts:15,188,492`: `via` → `through`
- `tests/src/core/phases/Phase.test.ts:156`: `just` → `only`
- `tests/src/core/phases/Phase.test.ts:417,571,586`: temporal `once` → `after`
- `tests/src/core/phases/Phase.test.ts:530`: deleted temporal `now`
- `tests/src/core/phases/PhaseManager.test.ts:90,126,148,155,176`: deleted temporal `now`
- `tests/src/core/phases/PhaseManager.test.ts:134`: `via` → `through`
- `tests/src/core/factories.test.ts:343,822`: `via` → `through`
- `tests/src/core/WorkflowPersistence.test.ts:32,310`: `latest` → `most recent`
- `tests/src/core/helpers.test.ts:281,295,633`: deleted temporal `now`
- `tests/src/core/helpers.test.ts:446`: `new override` → `per-phase override`
- `tests/src/core/helpers.test.ts:741`: causal `since` → `because`
- `tests/src/core/helpers.test.ts:746`: deleted `simply`
- `tests/src/core/helpers.test.ts:1062`: temporal `once` → `after`
- `tests/src/core/Controller.test.ts:90`: `just` → `only`
- `tests/src/core/Runner.test.ts:136`: `should` → `must`
- `tests/src/core/Runner.test.ts:187`: deleted temporal `now`
- `tests/src/core/Runner.test.ts:240,559,732,1002`: `guarantee` → `behavior` or `contract`
- `tests/src/core/Runner.test.ts:312,326`: deleted `just`
- `tests/src/core/Runner.test.ts:405,646`: `just` → `only`
- `tests/src/core/Runner.test.ts:468,732`: `via` → `through`
- `tests/src/core/Runner.test.ts:868`: temporal `once` → `after`
- `tests/src/core/WorkflowRunner.test.ts:37,53,251,641,1248,1263,1890`: `via` → `through`
- `tests/src/core/WorkflowRunner.test.ts:1535`: temporal `once` → `after`
- `tests/src/core/WorkflowManager.test.ts:621`: `latest` → `most recent`
- `tests/distribution.test.ts:34`: causal `since` → `because`
- `tests/distribution.test.ts:566`: temporal `once` → `after`
- `tests/src/core/RunHolder.test.ts:26`: deleted temporal `now`
- `tests/src/core/tasks/Task.test.ts:836`: deleted temporal `now`
- `tests/src/core/shapers.test.ts:134`: `new` → `added`
- `tests/src/core/shapers.test.ts:204`: deleted temporal `now`

## Permitted hits

- `just` means immediately before a paint at `guides/workflow.md:154`, `src/browser/factories.ts:37`, and `src/browser/FrameScheduler.ts:6,35`.
- `since` means elapsed time from an epoch at `src/core/types.ts:410,511`.
- `via` is a literal legacy key at `tests/setup.ts:381`, `tests/src/core/helpers.test.ts:44`, and `tests/src/core/shapers.test.ts:204,212`.
- `latest` is fixture data at `tests/src/core/WorkflowPersistence.test.ts:334,347`; `Latest` is the enum member at `tests/setupPolicy.ts:696,1904`.
- Every retained `now` is part of `Date.now()`, `performance.now()`, or a local bound to `Date.now()`.
- Every retained `once` means one time or simultaneously, or is the `{ once: true }` event-listener option, a variable, or fixture value.
- Every retained `new` is the construction operator or names a replacement, inserted, minted, or further value rather than dating it.

## `git status --short`

```text
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
 M tests/distribution.test.ts
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

## Exit codes

- `npm run format:check`: `0`
- `npm run lint:check`: `0`
- `npm run check`: `0`
- `npm run test:guides`: `0`
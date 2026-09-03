## Rewritten rows

- `guides/workflow.md:245` — “Find the first `TaskResult`…” → “The first `TaskResult`…”
- `guides/workflow.md:249` — “Convert a `WorkflowDefinition`…” → “An INITIAL all-`pending` `WorkflowSnapshot` converted from a `WorkflowDefinition`…”
- `guides/workflow.md:250` — “Convert one `PhaseDefinition`…” → “An initial all-`pending` `PhaseSnapshot` converted from one `PhaseDefinition`…”
- `guides/workflow.md:251` — “Convert one `TaskDefinition`…” → “An initial `pending` `TaskSnapshot` converted from one `TaskDefinition`…”
- `guides/workflow.md:252` — “Project interrupted running work…” → “Interrupted running work projected…”
- `guides/workflow.md:253` — “Flatten per-phase `TaskResult` lists…” → “One positional list flattened from per-phase `TaskResult` lists…”
- `guides/workflow.md:256` — “Reposition the entry keyed `key`…” → “The entry keyed `key` repositioned…”
- `guides/workflow.md:257` — “Schedule the one host `setTimeout` boundary…” → “The one host `setTimeout` boundary…”

## Sweep

No imperative-first Surface descriptions remain. Remaining matches are exclusively in `## Methods`, which the brief excludes.

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
- `npm run test:guides`: `0`
## Rewritten lines
- `src/core/WorkflowRunner.ts:466` — `// drain-race window) is left \`pending\` with nothing driving it — sweep it \`skip\`ped.`
- `src/core/factories.ts:49` — `// \`parse\` is the contract's own parser, used directly: the shared compiler`
- `src/core/helpers.ts:544` — `* snapshot is self-contained; a fresh seed has no \`override\`. \`created\` / \`updated\` are stamped at that point.`
- `src/core/types.ts:362` — `* The input shape of ...deriveWorkflowStatus: because \`bail\` is a`
- `src/core/types.ts:1708` — `* Takes a phase runner for the phase that is starting, or releases the held one.`
- `src/core/types.ts:1938` — `* The entity itself is the single control surface (no separate run handle):`

## `now` sweep with rulings
Pattern `\b[Nn][Oo][Ww]\b` over `guides/workflow.md`, `guides/README.md`, `README.md`, and `src`:

- `guides/workflow.md:330` — `Date.now()`, permitted code token.
- `guides/workflow.md:1025` — `Date.now()`, permitted code token.
- `guides/workflow.md:1026` — `Date.now()`, permitted code token.
- `src/core/tasks/Task.ts:469` — `Date.now()`, permitted code token.
- `src/core/tasks/Task.ts:485` — `Date.now()`, permitted code token.
- `src/core/helpers.ts:562` — `now` identifier and `Date.now()`, permitted code tokens.
- `src/core/helpers.ts:574` — `now` identifier, permitted code token.
- `src/core/helpers.ts:575` — `now` identifier, permitted code token.
- `src/core/helpers.ts:648` — `now` identifier and `Date.now()`, permitted code tokens.
- `src/core/helpers.ts:686` — `now` identifier, permitted code token.
- `src/core/helpers.ts:700` — `now` identifier, permitted code token.
- `src/core/Workflow.ts:441` — `Date.now()`, permitted code token.

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
- `npm run format:check` — 0
- `npm run lint:check` — 0
- `npm run check` — 0
- `npm run test:guides` — 0
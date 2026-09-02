# Unit breaking-workflow — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s06-01** — applied: UnitOutcome deleted from src/core/types.ts; Runner.#settle takes Result<TResult, unknown> from @orkestrel/contract and #launch boxes with the package success/failure helpers; guide Types row removed.
- **s06-03** — applied: createDeferred and DeferredInterface deleted; Runner (#drained, the lifecycle barriers, #settleBarrier) and the Workflow, Phase, and Task #gate fields use Promise.withResolvers and PromiseWithResolvers; guide Factories row, Types row, and the deterministic-waits section removed.
- **s06-04** — applied: The RunHolder record is RunHolderInterface (readonly runner, hold(runner?)) in types.ts and a RunHolder class in src/core/RunHolder.ts, minted per WorkflowRunner.#execute; barrelled with a guide class row, Types row, and Methods table.
- **s06-09** — applied: Phase, Task, Controller, TaskController dropped from src/core/index.ts and named in INTERNAL as 'class Phase', 'class Task', 'class Controller', 'class TaskController'; PhaseManager and TaskManager stay; guide rows replaced by prose naming the interfaces.
- **s06-11** — applied: description is a required string | undefined member on WorkflowInterface, PhaseInterface, TaskInterface, implemented as a getter; Task and Phase back it with a #description their patch mutates; Workflow reads #context.description (derive-state law; recorded as a decision).
- **s06-16** — applied: workflowSnapshotContext is locateSnapshotContext in helpers.ts, cloners.ts, validators.test.ts, the guide row and fence.
- **s06-22** — applied: WorkflowFault.origin removed from types.ts and from the frozen fault literal in WorkflowPersistence.checkpoint; guide row restated.
- **s06-23** — applied: run is behavior on TaskDefinition, TaskSnapshot, TaskInterface, Task (#behavior and getter), taskShape, and the owned-snapshot exact-key list in validators.ts; a stored-snapshot test asserts the serialized key; the version bump is the Orchestrator's (package.json off-limits; publishing held).
- **s06-24** — applied: IdleAPI is IdleInterface; IdleScheduler.#idleAPI is #idle and the former #idle boundary is #schedule (collision; one member).
- **s06-17 carrier** — applied: createWorkflowTree(definition, bail, captured) in src/core/factories.ts; createWorkflow, WorkflowManager.#build, and WorkflowRunner.execute route through it; the comments claiming the runner never imports the factory are rewritten. The reintroduced factories.ts <-> WorkflowManager.ts / WorkflowRunner.ts static edges are proven non-fatal by importing every built entry and driving a mint and an execute.
- **carry: budget consumer, database renames** — applied: Read through npm run check: no diagnostic against the staged budget or database tips beyond the rows; the adoption list was the test-side run -> behavior sites.

## Symbols moved

- UnitOutcome -> removed (Runner.#settle typed Result<TResult, unknown>)
- createDeferred -> removed (Promise.withResolvers)
- DeferredInterface -> removed (PromiseWithResolvers)
- Phase, Task, Controller, TaskController -> removed from the core barrel, interned
- RunHolder (record) -> RunHolderInterface + RunHolder class (src/core/RunHolder.ts)
- workflowSnapshotContext -> locateSnapshotContext
- WorkflowFault.origin -> removed
- TaskDefinition.run, TaskSnapshot.run, TaskInterface.run, Task.run, taskShape.run -> behavior
- IdleAPI -> IdleInterface
- createWorkflowTree -> added (src/core/factories.ts)
- Runner.#settleBarrier local failure -> cleanupFailure

## Files touched

- src/core/{types,index,Runner,Workflow,WorkflowManager,WorkflowRunner,WorkflowPersistence,factories,helpers,validators,shapers,cloners}.ts
- src/core/RunHolder.ts (new)
- src/core/phases/Phase.ts
- src/core/tasks/Task.ts
- src/browser/{types,IdleScheduler}.ts
- guides/workflow.md
- tests/guides.test.ts
- tests/setup.ts
- tests/setup.test.ts
- tests/src/core/RunHolder.test.ts (new)
- tests/src/core/{Controller,Workflow,WorkflowPersistence,WorkflowRunner,factories,helpers,shapers,validators}.test.ts
- tests/src/core/phases/{Phase,PhaseManager}.test.ts
- tests/src/core/tasks/{Task,TaskController,TaskManager}.test.ts
- tests/src/core/stores/{MemoryWorkflowStore,DatabaseWorkflowStore}.test.ts
- tests/src/browser/IdleScheduler.test.ts

## Tests changed

- added: RunHolder.test.ts (starts empty; holds then releases; swaps to the phase now starting; a closure armed before any phase reads the live runner; two holders independent)
- added: description membership cases on Task, Phase, Workflow
- added: createWorkflowTree — the shared construction path (five cases)
- changed: MemoryWorkflowStore round-trip asserts '"behavior":"compile"' and not '"run"'
- changed: INTERNAL lists the four interned classes; the interned classes imported by relative path in tests
- changed: WorkflowPersistence fault assertions drop origin
- changed: every run -> behavior site; the run fixtures renamed work/record
- failing-first: Task description membership — control restores the optional declare plus conditional defineProperty: 1 failed | 54 passed ('expected false to be true'), then 55 passed
- failing-first: MemoryWorkflowStore round-trip — control asserts the old serialized key '"run":"compile"': 1 failed | 10 passed, then 11 passed
- contract change: npm run check went from 0 to the test-side adoption list after the types.ts edit and back to 0 after adoption

## Gates

- `npm run format:check` → exit 0 — All matched files use the correct format. Finished on 105 files.
- `npm run lint:check` → exit 0 — no output
- `npm run check` → exit 0 — root plus the core, browser, and server projects — no diagnostics
- `npm run build` → exit 0 — core, browser, server built; d.cts copies written
- `npm test` → exit 0 — src 861 passed (26 files); policy 111; config 46; setup 27; guides 88
- `node <scratch>/cycle.mjs (imports dist/src/core/index.js, index.cjs, dist/src/browser/index.js, dist/src/server/index.js)` → exit 0 — core 84 exports; core.cjs 84 exports; createWorkflowTree function; RunHolder function; interned absent: []; manager mint bail false behavior work; runner status completed; description member true undefined

## Diff stat

```text
36 files changed, 695 insertions(+), 580 deletions(-); plus untracked src/core/RunHolder.ts and tests/src/core/RunHolder.test.ts
```

Status at return (writer's reading): `38 paths dirty, all inside src/**, tests/** (never the vendored policy pair), guides/workflow.md`
Built `dist/` moves: yes: dist/src/core/index.d.ts declares createWorkflowTree, RunHolder, RunHolderInterface and no UnitOutcome, DeferredInterface, createDeferred, Phase, Task, Controller, TaskController; dist/src/browser/index.d.ts declares IdleInterface; 84 core exports in ESM and CJS

## Observations

- the factories.ts <-> WorkflowManager.ts / WorkflowRunner.ts static edges the s06-17 destination reintroduces, proven non-fatal by the built-entry probe
- a TaskSnapshot written by 0.0.16 or earlier carries run and is refused by isOwnedWorkflowSnapshot's exact-key check, so a stored snapshot does not round-trip across the release; the version bump is the Orchestrator's at release
- README.md links ./guides/src/workflow.md (fleet-wide, the readme-links sweep)
- the guide's Runner fences name a consumer-supplied function run(...) — pre-existing placeholder naming that now reads as the removed field and a banned lifecycle synonym; outside the rows
- RunnerValue still boxes each settled value in Runner.#values, duplicating the presence the Result discriminant carries; s06-01 named only the #settle parameter
- no timing-suspect failure

## Deviations

- IdleScheduler: the ruled #idle name collided with the existing idle-callback boundary; the detector took #idle and the boundary became #schedule
- Workflow.description reads #context.description rather than a duplicate field (derive-state law); the observable contract is unchanged
- createWorkflowTree forwards bail to definitionToSnapshot, which resolves bail ?? definition.bail ?? DEFAULT_BAIL, removing the triplicated resolution
- RunHolder is barrelled, not interned: RunHolderInterface is published and WorkflowPersistence sets the precedent
- third-person TSDoc first sentences applied to authored or rewritten blocks only

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/workflow.diff`,
`tmp/units/breaking/workflow.status`.

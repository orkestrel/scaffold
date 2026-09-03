# Addendum to the conform-agent brief — incoming consumer edits, taken first

The closure staged for this unit carries the landed tips of queue, workflow, workspace, and guide. Each of the following edits is one a landed unit returned for this package under its report's § Shared-file patches; apply them first, exactly as given, and record each under a `## Consumer edits taken` section of the report with the line now. Line numbers are the reports' and can have moved; read each site before changing it. A vendored `guides/<dep>.md` mirror is never edited by hand: it refreshes at the wave.

1. **queue's `QueueExecution` → `QueueContext`** (`reports/conform-queue-report.md:249-262`): `src/core/helpers.ts` imports `QueueContext` and its handler parameter reads `context: QueueContext`.
2. **guide's `symbol.kind` → `symbol.keyword`** (`reports/conform-guide-report.md:154-163`): `tests/guides.test.ts:120` reads `.filter((symbol) => symbol.keyword === 'function')`.
3. **workflow's landed renames**, where this package reaches them (read `reports/conform-workflow-report.md` § Breaking once workflow lands; the reconcile sweep found no agent source consumer of `TaskStatus`, `PhaseStatus`, `WorkflowStatus`, or `WorkflowFunctions`, so this item is expected to be `noop` and is recorded as such).

Mirrors refreshed at the wave, not here: `guides/queue.md`, `guides/workflow.md`, `guides/workspace.md`, `guides/guide.md`, `guides/emitter.md`, `guides/contract.md`, `guides/database.md`.

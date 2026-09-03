# Addendum to the conform-workflow brief — incoming consumer edits, taken first

The closure staged for this unit carries the landed tips of queue, contract, and guide. Each of the following edits is one a landed unit returned for this package under its report's § Shared-file patches; apply them first, exactly as given, and record each under a `## Consumer edits taken` section of the report with the line now. Line numbers are the reports' and can have moved; read each site before changing it. A vendored `guides/<dep>.md` mirror is never edited by hand: it refreshes at the wave.

1. **queue's `QueueExecution` → `QueueContext`** (`reports/conform-queue-report.md:235-247`): `src/core/Runner.ts` imports `QueueContext` and its `#dispatch` reads `context: QueueContext`.
2. **contract's `type` → `category` discriminant** (`reports/conform-contract-report.md:230-243`): in `tests/src/core/shapers.test.ts`, every `type:` literal and `.type` read at lines 18, 19, 20, 21, 23, 24, 25, 34, 35, 36, 42, 48, 49, 53, 54, 55, 63, 64, 73, 75, 78, 79, 89, 100, 105, 111, 119, and 120 reads `category`.
3. **guide's `symbol.kind` → `symbol.keyword`** (`reports/conform-guide-report.md:154-163`): `tests/guides.test.ts:131` reads `.filter((symbol) => symbol.keyword === 'function')`.

Toolbox is this package's one source consumer of the breaking rows workflow-subj-10 and workflow-subj-11 (the status aliases collapsing to `LifecycleStatus`, `WorkflowFunctions` → `WorkflowRegistry`); record toolbox's exact substitutions under § Shared-file patches for toolbox's L6 unit. Mirrors refreshed at the wave, not here: `guides/queue.md`, `guides/guide.md`, `guides/emitter.md`, `guides/contract.md`, `guides/database.md`.

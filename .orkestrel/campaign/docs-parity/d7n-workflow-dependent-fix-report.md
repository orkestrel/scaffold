# Workflow dependent docs and native-entry fix report

## Outcome

WF1 through WF7 are implemented in the canonical Workflow checkout. The native guide entry now composes `GuideCommand` directly while preserving Workflow's existing policy and flagship behavior assertions. Source edits are limited to documentation comments. README required no change.

The `orkestrel-align-packages` workflow kept the native Guide and Test contracts direct and package-aligned. The `orkestrel-harden-package` workflow kept declarations, internal exports, guide examples, and runtime behavior under the package's existing contract instead of introducing a second engine.

Acceptance remains with the independent reviewer.

## Owned changes

- `guides/workflow.md`: corrected Shape cells, constant shapes, count wording, all-caps prose emphasis, the titled example lead-in, repeated source-summary propagation, and heading-direct fence lead-ins.
- `tests/guides.test.ts`: replaced the non-native static orchestration with direct `GuideCommand`, `readInventory`, and `createVitest` composition. Source and Vitest runtime imports now occur inside the command callback. The package-owned declaration, barrel, internal, method, import, link, example, test, and flagship behavior checks remain.
- `src/browser/BrowserScheduler.ts`, `src/server/NodeScheduler.ts`, and documentation comments under `src/core/**`: lowered prose emphasis and pruned repeated remarks while preserving non-duplicated caveats.
- `tmp/d7n-workflow-dependent-fix/**`: ignored command receipts and structural instruments.

No shared-file patch is required. Package metadata, lockfiles, scripts, vendored declarations, runtime tokens, assertions, and test infrastructure were not edited.

## WF findings closed

- WF1: each constant table uses `Shape`, and the cells carry the declared `ObjectShape<...>` type with optional members marked in declaration order. The required sentence appears in each applicable section.
- WF2: `DEFAULT_BAIL`, `DEFAULT_PHASE_CONCURRENCY`, and `MAX_TIMER_MS` now document their declared types; their descriptions retain the literal values.
- WF3: prose emphasis is sentence case. The UTF-8-aware scanner rules every remaining acronym, protocol token, error code, filename, and code literal through its explicit allowlist. Its only non-allowlisted output is `RUNNABLE` in the same code-example comment in `src/core/factories.ts`, `src/core/types.ts`, and `src/core/WorkflowManager.ts`; this is a code-state literal in an example, not prose emphasis. Receipt: `tmp/d7n-workflow-dependent-fix/caps-after.txt`.
- WF4: repeated remarks were pruned from the named types, factories, store, error, and persistence blocks. Facts not present in their summaries remain.
- WF5: `Author a definition and run it` now has a sentence lead-in after the heading, while the preceding paragraph introduces the section.
- WF6: `WorkflowStoreInterface` names `get`, `set`, and `delete` without a tally; native guide propagation updated the compared cell.
- WF7: native composition, shape idioms, fragment links, package-specific policy, guide heading lead-ins, and README install-fence placement are preserved or corrected. No obsolete `npm run docs`, `scripts/docs`, or `ROOT_FILES` pointer remains in the native entry comments.

## Defect proof

The exact command was:

```text
node --experimental-strip-types tests/guides.test.ts
```

The clean-baseline invocation exited `1` before Vitest collection because the old static entry asked Node to resolve `@src/core`. Receipt: `tmp/d7n-workflow-dependent-fix/baseline.stderr.txt`.

After the native entry registered the source graph, the same command exposed the intended guide-drift failure before reconciliation:

```text
Test Files  1 failed (1)
Tests  1 failed | 100 passed (101)
```

The failure was `Workflow > keeps every compared summary and example equal to its source`, with the `WorkflowStoreInterface` counted wording as the sole drift. Receipt: `tmp/d7n-workflow-dependent-fix/red-parity.stderr.txt`.

After the fix, the same command exited `0`:

```text
Test Files  1 passed (1)
Tests  101 passed (101)
```

Receipt: `tmp/d7n-workflow-dependent-fix/final-native.stdout.txt`.

## Scoped validation

- `node --experimental-strip-types tests/guides.test.ts --to guide` exited `0`, passed `101` tests, and printed no `wrote` line. Receipt: `tmp/d7n-workflow-dependent-fix/to-guide-zero.stdout.txt`.
- `node --experimental-strip-types tests/guides.test.ts --to source` exited `0`, passed `101` tests, and printed no `wrote` line. Receipt: `tmp/d7n-workflow-dependent-fix/to-source-zero.stdout.txt`.
- `npx oxfmt --config .oxfmtrc.json --check README.md guides/workflow.md tests/guides.test.ts src` exited `0`: `All matched files use the correct format.`
- `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src` exited `0` with no diagnostics.
- `git diff --check` exited `0`.
- The runtime-source diff filter printed nothing. Every `src/**` change is a comment line.
- The UTF-8 literal heading scan found no guide heading followed directly by a fence. README `## Install` remains followed directly by its `sh` fence; README has no `## Usage` heading. The retained brief's printed awk expression escapes backticks in a way that matches non-fence prose under this Git Bash, so the instrument uses a literal line-state check for the stated condition.
- The structural scan found no old Shape phrase, literal-valued constant Shape cell, `DUAL-store`, prose `FIRST`, counted store wording, empty applicable Shape cell, mojibake marker, or source runtime line.

The predecessor's `npm run check`, build, package policy suite, and core suite were not run. The successor contract assigns native Guide entry and scoped validation ownership, while the dispatch forbids builds and full suites.

## Final checkout evidence

Baseline hash supplied by root: `1151786257b9b29f219f2b5d2d119d0b44424769`.

```text
 guides/workflow.md                       |  78 ++--
 src/browser/BrowserScheduler.ts          |   2 +-
 src/core/Collection.ts                   |   6 +-
 src/core/Controller.ts                   |   6 +-
 src/core/Runner.ts                       |  80 ++--
 src/core/Scheduler.ts                    |   6 +-
 src/core/Workflow.ts                     |  94 ++---
 src/core/WorkflowManager.ts              |  12 +-
 src/core/WorkflowPersistence.ts          |   4 +-
 src/core/WorkflowRunner.ts               | 218 +++++-----
 src/core/constants.ts                    |   8 +-
 src/core/errors.ts                       |   3 +-
 src/core/factories.ts                    |  71 ++--
 src/core/helpers.ts                      |  64 +--
 src/core/phases/Phase.ts                 |  88 ++---
 src/core/phases/PhaseManager.ts          |   2 +-
 src/core/shapers.ts                      |  10 +-
 src/core/stores/DatabaseWorkflowStore.ts |  16 +-
 src/core/stores/MemoryWorkflowStore.ts   |  14 +-
 src/core/tasks/Task.ts                   |  54 +--
 src/core/tasks/TaskController.ts         |  10 +-
 src/core/tasks/TaskManager.ts            |   4 +-
 src/core/types.ts                        | 452 +++++++++++----------
 src/core/validators.ts                   |   6 +-
 src/server/NodeScheduler.ts              |   4 +-
 tests/guides.test.ts                     | 655 ++++++++++++++-----------------
 26 files changed, 967 insertions(+), 1000 deletions(-)
```

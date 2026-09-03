## Per-claim verdicts

1. **CONFIRMED.** The disposition table records every brief row as `applied` or evidenced `noop`; none is omitted (`conform-workflow-report.md:21-46`).

2. **REFUTED.** The `workflow-subj-1` citation removal introduced malformed TSDoc:
   - `src/core/Workflow.ts:40`: `observable * ROOT`
   - `src/core/types.ts:661`: ``A `type` alias * so``
   
   The additions are visible at `conform-workflow.diff:1176` and `:2902`. Remove the stray asterisks and restore grammatical sentences.

3. **CONFIRMED.** Re-running the case-insensitive word-boundary sweep with `(s|es|ed|ing)?` over `src`, `tests`, `guides/workflow.md`, `guides/README.md`, and `README.md` found none of the renamed or removed symbols. The report names these populations at `conform-workflow-report.md:104-105`.

4. **REFUTED.** The recorded source sweep uses `\be\.g\.\b` (`conform-workflow-report.md:107`). Its terminal boundary cannot match a period followed by whitespace, and the claimed empty result is false. The correct `\be\.g\.` sweep finds prohibited prose at:
   - `src/core/types.ts:306,834,959,1920,2337`
   - `src/core/phases/Phase.ts:46`
   - `src/core/tasks/Task.ts:45`
   - `src/core/WorkflowRunner.ts:462`
   
   Replace these occurrences with “for example” and record the corrected sweep. The behavioural controls themselves carry command-specific red and green measurements at `conform-workflow-report.md:82-94`.

5. **CONFIRMED.** Export and method-table changes appear in `guides/workflow.md`, with fence transcriptions in `tests/guides.test.ts:230-337`. The sweep `AGENTS §` over touched source, tests, and owned guides is empty. Published-specifier fences contain no relative imports.

6. **CONFIRMED.** Every removed or renamed public symbol appears under Breaking (`conform-workflow-report.md:139-147`). The only live fleet consumers found are the disclosed toolbox references (`toolbox/src/core/types.ts:7-186`, `toolbox/src/core/factories.ts:8-325`, and toolbox tests), and exact edits are supplied at `conform-workflow-report.md:151-195`.

7. **CONFIRMED.** `conform-workflow.status:1-58` contains only Owned paths. No off-limits file, lockfile, dependency tree, compatibility alias, shim, or compatibility re-export appears in the diff.

8. **CONFIRMED; independent gates NOT-EVIDENCED.** Added `.skip()` calls are workflow-domain operations, such as `tests/src/core/Collection.test.ts:130`, rather than Vitest modifiers. Added-line sweeps found no `.only`, `.todo`, test retry setting, or inflated test timeout. The required gate commands are recorded at `conform-workflow-report.md:119-127`; their independent result remains for landing.

9. **CONFIRMED.** Added-line sweeps found no TODO, FIXME, commented-out implementation, `console`, or debugger residue. The disposition table corresponds to the changed sites in the diff.

## Findings outside the claims

- **O1 — prohibited numeric prose.** `tests/guides.test.ts:253` names a case `reads a count of 2 back...`. Rename it to `reads the documented positional collection fence`; retain the numeric assertion in the test body.

- **O2 — local fixture factories.** `tests/src/core/Collection.test.ts:13-24` declares `buildTasks` and `buildCollection` locally, contrary to the shared-test-infrastructure rule requiring test files to import fixture factories. Export host-independent fixtures from `tests/setup.ts` and import them here.

## Referrals to the Orchestrator

- **R1.** Will the landing run execute the required gate chain and settle claim 8’s independent reading?
- **R2.** Will landing apply the exact toolbox consumer patches atomically with the published breaking changes?

FAIL 2 4
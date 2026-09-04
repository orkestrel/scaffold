# Audit verdict: unit conform-workflow

Subject: the uncommitted unit in `/home/user/fleet/workflow` (brief `briefs/conform-workflow-brief.md` with its addendum, audit brief `briefs/conform-workflow-audit-brief.md`, fix briefs `briefs/conform-workflow-fix1-brief.md` to `conform-workflow-fix3-brief.md` with the successors `fix1b`, `fix1c`, `fix1d`, and `fix2b`, report `reports/conform-workflow-report.md`, evidence `units/conform-workflow.diff.txt` and `units/conform-workflow.status.txt`, proofs under `/home/user/work/evidence/workflow-proofs/`), implemented by a direct Opus `implementer` (`units/l4/workflow-implement-direct.md`) from the Luna-reconciled rulings (`units/l4/workflow-reconcile-luna.md`) with the addendum's consumer edits taken first.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on Cursor Grok 4.6 (`units/l4/workflow-r1-distill-grok.result.md`) | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna, three times across the successor fix rounds (`units/l4/workflow-r1-checker-luna.result.md` FAIL 1, 3; `workflow-r1b-checker-luna.result.md` FAIL 1 with F1; `workflow-r1c-checker-luna.result.md` FAIL 1) | FAIL 1, closed by fix round 1d |
| 1 | objective | GPT-5.6 Sol through the Cursor bench, read-only (`units/l4/workflow-objective-r1-sol.md`) | FAIL 2, 4 with O1, O2, R1, R2 |
| 2 | absorption | `grok` on Cursor Grok 4.6 (`units/l4/workflow-r2-distill-grok.result.md`) | distillate |
| 2 | checker | `checker` on Cursor Grok 4.6 (`units/l4/workflow-r2-checker-grok.result.md`), Luna being dark | PASS |
| 2 | objective | `reviewer` on Claude Opus 5 (`units/l4/workflow-objective-r2.md`), Sol being dark | FAIL none with O1 to O6, R1, R2 |

Subjective lane: not run in the audit rounds, by the round's design. The objective lane ran on Sol through the Cursor bench in round 1 and on the Opus `reviewer` in round 2 after the Cursor account's usage limit darkened the API models; the checker moved from Luna to Grok 4.6 for the same reason.

Fix round 1 and its successors 1b, 1c, and 1d, Sol writers (`units/l4/workflow-fix1-sol-result.md` to `workflow-fix1d-sol-result.md`): the banned `now` sites, the stale locals, the nested arrow, the whole substitution table swept over the unit's prose, every Surface description a noun phrase. Fix round 2, a Sol writer, stopped on scope (`units/l4/workflow-fix2-sol-result.md`: two abbreviation sites outside Owned); fix round 2b, an Opus `implementer` (`units/l4/workflow-fix2b-opus-result.md`): the two malformed doc blocks, the `e.g.` and `i.e.` sites, the counted test name, the two local fixtures moved into `tests/setup.ts` with their proofs. Fix round 3, an Opus `implementer` (`units/l4/workflow-fix3-opus-result.md`): the counted comment in `tests/guides.test.ts`, the two false sweep rows and the two counts in the report, the failing-first control for `buildTasks` and `buildCollection`, the moved `isBrowserVuePath` citation, the `remove(ids[])` return-value change recorded under § Breaking.

## Rulings

- Round 1 claims 2, 4 and the checker's claims 1, 3: closed by fix rounds 1 to 2b; round 2 confirms every claim on the tree.
- Round 2 O1, O2, O3, O5, O6: closed by fix round 3. O4: the report's `build` and `test` readings predate the audited tree, so the landing's deciding run executes the full gate chain on the final tree.
- Round 2 R1: `workflow-subj-6` changes the value `WorkflowManagerInterface.remove(ids[])` returns for a partial batch and an empty batch, with no fleet consumer; recorded under § Breaking by fix round 3. R2: the exact toolbox consumer patches under § Shared-file patches land with toolbox's own unit (`briefs/conform-toolbox-brief-addendum.md` item 3), not atomically with this landing; open until toolbox lands.
- Breaking rows (`workflow-subj-8`: `WorkflowHooks`, `PhaseHooks`, `TaskHooks` removed; `-9`: `PHASE_STATUSES` and `WORKFLOW_STATUSES` removed, `TASK_STATUSES` → `LIFECYCLE_STATUSES`, `TERMINAL_TASK_STATUSES` → `TERMINAL_STATUSES`; `-10`: `TaskStatus`, `PhaseStatus`, `WorkflowStatus` folded into `LifecycleStatus`; `-11`: `WorkflowFunctions` → `WorkflowRegistry`; `-14`: `RunnerValue` and `RunnerFailure` removed; `createGate` and `TestGateInterface` were test-only and move no published surface): `workflow-subj-10` and `-11` reach `@orkestrel/toolbox` through the recorded patches; the others have no fleet consumer; the bump ruling carries them for the registry's consumers.
- Timer lower-bound seam and the toolbox patches: `ledgers/followons.md`.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/workflow`, recorded in `units/land-workflow.log.txt` and `units/conform-workflow.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (each round's refutations closed by the fix round that followed; round 2's checker and objective confirm the tree); landed as affe372 with the full chain green and the offline audit clean.

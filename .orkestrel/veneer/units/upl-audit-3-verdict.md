# Audit verdict — UTIL-PLACEMENT (`upl`), round 3 (the mechanical fix round)

Subject: the round-3 claims in `upl-audit-3-claims.md` over the worktree `/home/user/veneer-upl`, `upl-3.diff`, `upl-3-status.txt`, `upl-shared-3.patch`, `upl-unlisted-3.patch`, `b-utilities-upl-report-3.md`, and `upl-instruments-3/`. The unit was written by `builder` on Sonnet from a fully specified brief; the round ran the objective lane and the checker, no subjective lane (recorded here as the round's own reason: the brief fixed every shape and name).

## Lanes

| Lane | Role and engine | Verdict file | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst` on GPT-6 Astra (`codex-queue-18.sh`) | `upl-audit-3-objective-verdict.md` | `FAIL 1, 2, 3, 4, 8; outside the claims: REPORT-COUNTS` |
| Checker | `checker` on Sonnet | `upl-audit-3-checker-verdict.md` | `FAIL 8; outside the claims: REPORT-COUNT` |

## Reconciliation

1. **Delta and scope: the code scope holds; the retained delta artifact is wrong.** Both lanes confirm the file sets, the index bases, the apply checks, and the unlisted patch's identity. The objective lane finds `upl-instruments-3/round-delta.diff` carrying the whole `.viewport` and `.scroller` additions for `_shell.scss` that round 2 already carried, so that hunk is not round 2 against round 3. Carried to round 4 as a regeneration of the delta artifact; no code moves.
2. **F-CAP: the markup and the remark hold; the mutation does not certify the geometry.** The `w-50` line and the remark are present. The `max-width-cap-dropped` mutation reddens through the selector guard (`No width cap`), before the width comparison, so it would also redden without the narrowed containing block, and the cap-reading rerun's output is not retained. Carried to round 4: a mutation that reaches the width comparison with the specimen still selectable (the `mw-100` rule's declaration removed from the sizing partial, the cascade rebuilt), and the cap readings retained as a log.
3. **The binding case's memberships: the assertions and the round-3 controls hold; the round-2 controls were not re-run.** `edges-emptied`, `viewport-cases-emptied`, and `scroller-offset-zero` each distinguish their mutation; the brief's re-run of the round-2 setup controls is missing (`logs/setup/` empty). Carried to round 4.
4. **F-FIXTURE: the extraction holds; the freeze-case clause is false.** `TRANSLATION_BOX` is exported, consumed, and listed in the export list, but absent from the freeze case and from the setup proof's imports, and the report states otherwise. Carried to round 4 as an import and a shape assertion in the placement binding case (a string cannot be frozen; its shape can be bound).
5. **The rows, the names, the order, the shell comment, and the ledger position: CONFIRMED** in both lanes.
6. **The log headers: CONFIRMED.**
7. **The gates: CONFIRMED** (the corrected run `fresh-run-2.log.txt` and the per-gate logs).
8. **Law and report: BROKEN.** The code-law checks hold. The report writes temporal `now`, `new`, and `once`, bare and possessive tokens, ellipsized gate commands, and a failing-first account the retained logs do not support: `fresh-run.log.txt` records a format failure and a passing `check`, then a failed patch reversal, and no retained round-3 log carries the `TS2724` or `TS7031` diagnostics the report describes. A false account of what happened is a record defect beyond prose; the round-4 report states the history the logs carry and names the run whose log was not retained. Counts (both lanes): the round-4 report names members.

## Findings outside the claims

- **REPORT-COUNTS / REPORT-COUNT** (both lanes): carried into the round-4 report item.

## Carriers

Every carried finding is an item of `upl-brief-4.md` (`builder` on Sonnet). The code of round 3 stands; round 4 adds proof evidence, one geometric mutation, one shape assertion, and a corrected record.

VERDICT: FAIL 1, 2, 3, 4, 8; outside the claims: REPORT-COUNTS

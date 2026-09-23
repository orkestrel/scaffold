# Audit verdict — TOGGLES (`tg`), round 3 (the mechanical fix round)

Subject: the round-3 claims in `tg-audit-3-claims.md` over the worktree `/home/user/veneer-tg`, `tg-3.diff`, `tg-3-status.txt`, `tg-shared-3.patch`, `b-collapse-tg-report-3.md`, and `tg-instruments-3/`. The unit was written by `builder` on Sonnet from a fully specified brief; the round ran the objective lane and the checker, no subjective lane (recorded here as the round's own reason: the brief fixed every shape and name).

## Lanes

| Lane | Role and engine | Verdict file | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst` on GPT-6 Astra (`codex-queue-20.sh`) | `tg-audit-3-objective-verdict.md` | `FAIL 3, 6, 7, 8; outside the claims: REPORT-COUNTS, REBUILD-RECIPE` |
| Checker | `checker` on Sonnet | `tg-audit-3-checker-verdict.md` | `FAIL 1, 8; outside the claims: none` |

The checker's command sub-clauses are settled in `tg-audit-3-settling.txt`; the objective lane's chronology clause is settled by the Orchestrator's host gate run over the reconstructed round-3 snapshot (`tg-audit-3-settling-gates.log.txt`, `tg-settle.sh`).

## Reconciliation

1. **Delta and scope: CONFIRMED.** The objective lane ran the apply check and matched every blob; the checker's sub-clause closes on the settling readings.
2. **The guide and the constants: CONFIRMED** in both lanes.
3. **The `margin` field: CONFIRMED on the code; the report's search clause is short.** The rename is complete at every site (the objective lane's negative control: the round-2 table with the round-3 consumers reports TS2339, the round-3 pair reports nothing); the report characterises the `grep` output instead of quoting it. Record-only.
4. **The field nouns and the comments: CONFIRMED** in both lanes.
5. **The adopted probe: CONFIRMED.** The added case reddens under `dropstart-caret-rule-omitted-empty` at the split toggle's assertion (`3.57` against `0`); the control is green.
6. **The matrix and the table controls: CONFIRMED on the evidence; the title account corrected.** Every round-2 mutation and control distinguishes its case with the round-2 assertion. The report's "two retitles" is false: the `it.each` title interpolates the field's values, so the rendered styles titles are unchanged, and only the setup binding case is retitled; the claim's wording carried the same error and is corrected here. Record-only.
7. **The gates: CONFIRMED, the chronology settled.** Every gate log carries its command and exit 0; the shared files' edit times were not retained because the validation copy was deleted, so the Orchestrator rebuilt the round-3 snapshot (`a658879` plus `tg-shared-3.patch` plus the six owned files) and read `check`, the styles proofs, the scoped setup run, and the section proofs green on it at 19:27 UTC.
8. **Law and report: BROKEN, record-only.** The code-law checks hold in both lanes. The report writes `now`, `new`, a cross-reference by `above`, bare tokens, one count the checker found and the tallies the objective lane lists, and names the retained path twice.

## Findings outside the claims

- **REPORT-COUNTS** (objective lane): record-only.
- **REBUILD-RECIPE** (objective lane): the report's rebuild recipe applies the superseded round-2 shared patch, which pairs the old `side` field with the `margin` consumer; the retained round-3 patch is the one to apply. Recorded here so a reader of the report rebuilds from `tg-shared-3.patch`.

## Ruling

The code claims hold in both lanes. TOGGLES round 3 is accepted for landing on the session branch after UTIL-DISPLAY: `tg-resolve.py`, `land-seams.py`, the regeneration, and the chain; the guide's `dropdown` compatibility cell and § Dropdown classes sentence collisions with NAVBAR resolve at the NAVBAR landing as ruled.

VERDICT: PASS (claims 3, 6, 7, and 8 settled, corrected, or record-only in this verdict)

# PREFLIGHT-HOST (`pl`) audit round 2 — the Orchestrator's verdict

Claims: `pl-audit-2-claims.md`. Lanes: the objective lane, `analyst` on GPT-6 Astra (`pl-audit-2-objective-verdict.md`),
and the checker on Sonnet (`pl-audit-2-checker-verdict.md`). The subjective lane is not run on this round, by the user's
instruction to put implementation first; the round's subjective findings took the round-1 lanes' own wording.

| Claim | Objective | Checker | Ruling |
| --- | --- | --- | --- |
| 1 Coverage | CONFIRMED | — | CONFIRMED |
| 2 Dimension key | CONFIRMED | CONFIRMED | CONFIRMED |
| 3 Control | CONFIRMED | — | CONFIRMED |
| 4 Titles and guide | BROKEN | CONFIRMED | BROKEN: one guide sentence limits the rows to form controls and the root |
| 5 Gates and law | BROKEN | UNRESOLVED | The apply check exits 0 on the Orchestrator's reading (`pl-instruments/pl-apply-check-2.log.txt`); the report's relative path is a report defect, accepted on the record |

- **Claim 4.** The rewritten paragraph (`pl-shared-2.patch` around line 20) says the remaining rows concern form
  controls and the document root, where the table also records the `iframe` display and vertical alignment, the `svg`
  display, and the `table` border colors.
- **Outside the claims.** The report's opening says every item-2 mutation fails, where D1b passes by design; a report
  defect, accepted on the record.

VERDICT: FAIL 4 — carried by PREFLIGHT-HOST round 3 (`b-preflight-host-brief-3.md`), one sentence.

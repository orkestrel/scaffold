# FOCUS-FRAME (`ff`) audit round 3 — the Orchestrator's verdict

Claims: `ff-audit-3-claims.md`. Lanes: the objective lane, `analyst` on GPT-6 Astra (`ff-audit-3-objective-verdict.md`),
and the checker on Sonnet (`ff-audit-3-checker-verdict.md`). The subjective lane is not run on this round: by the user's
instruction to put implementation first, because the round adds one row, deletes one branch, and renames one directory.

| Claim | Objective | Checker | Ruling |
| --- | --- | --- | --- |
| 1 Helper rows | BROKEN | — | BROKEN: the zero clamp is the one branch no row decides |
| 2 List-group control | CONFIRMED | — | CONFIRMED |
| 3 Rename and TSDoc | CONFIRMED | CONFIRMED | CONFIRMED |
| 4 Scope and law | CONFIRMED | CONFIRMED | CONFIRMED |

- **Claim 1.** The objective lane evaluated every decision in `computeRingReach` against the tables: each has a
  deciding row except the `0` in the final maximum, which a combined row with a negative shadow reach and a negative
  outline reach decides (`color(srgb 0.1 0.2 0.3) 0px 0px 0px -3px` with a solid 1px outline at offset -4px reads 0, and
  -3 without the clamp). The enumeration closes the class: this row is the last one.

VERDICT: FAIL 1 — carried by FOCUS-FRAME round 4 (`b-focus-frame-brief-4.md`).

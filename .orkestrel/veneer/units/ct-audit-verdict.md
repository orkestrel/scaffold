# THEME (`ct`) audit round 1 — the Orchestrator's verdict

Claims: `ct-audit-claims.md`. Lanes, blind on that one file:

- the objective lane, `analyst` on GPT-6 Astra (`ct-audit-objective-verdict.md`);
- the subjective lane, `reviewer` on Opus 5.5 (`ct-audit-subjective-verdict.md`);
- the checker, `checker` on Sonnet, on claims 1, 7, and 8 (`ct-audit-checker-verdict.md`).

The unit was written by `opus` on Opus 5.5, so the objective lane ran on an engine that did not write it.

## Per claim

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Scope | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 V10 | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 3 V12 | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 V13 | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 5 The theme ledger | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 6 X3 and X12 | CONFIRMED | CONFIRMED | — | CONFIRMED; the subjective lane's R1 referral is carried |
| 7 X11 | BROKEN (S4) | CONFIRMED | CONFIRMED | BROKEN in its S4 clause |
| 8 Law and report | BROKEN | CONFIRMED | CONFIRMED | BROKEN in its report clause |

- **Claim 7.** The objective lane read the S4 log (`ct-instruments/ct-mutation-S4-section-unexported.log.txt`):
  the section suite fails to import, so no section assertion ran under S4; the index proof ran and caught the
  missing export. The checker ruled on the index failure alone. The objective reading holds: S4 is the
  export proof, and S1 to S3 are the section mutations. The report is corrected in round 2; no code changes.
- **Claim 8.** The report states the diffstat tallies and "old", and claims that every added case ran red
  first while its own red log shows the nested-island case passing (`ct-red-theme.log.txt`). The M5
  mutation reddens that case, so the case binds to a defect; the claim is false as written. Round 2's report
  states what ran red and what a mutation proves instead. The checker's sweep missed the tallies.

## Outside the claims

| Finding | Lane | Ruling | Carrier |
| --- | --- | --- | --- |
| TEST-DATA: the `controls`, `dark`, `retuned`, and `tiers` populations sit in test files (`.claude/rules/tests.md` § setup files) | objective; the subjective lane's R2 | Confirmed | THEME round 2 |
| F1: the `_tokens.scss` comments on the dark tiers, the border anchor, and the map header are false after V13 | subjective | Confirmed | LABEL (`lc`), which owns `_tokens.scss` |
| F2: the `theme-tokens` contract in `_mixins.scss` is false; the `$retuned` walk and the secondary aliases sit outside the mixin | subjective | Confirmed | LABEL (`lc`), which owns `_mixins.scss` |
| R1: the X3 plant reaches the matched-site loop only; the unmatched-selector check has no mutation that reddens | subjective referral | Confirmed from `tests/setupServer.ts` (the registry rule's two branches) | THEME round 2 |
| R4: X8, the breakpoint alias case the design verdict gives THEME, is carried by neither brief | subjective referral | Confirmed (`b-cross-design-verdict.md` X8 and § Exit criterion) | THEME round 2 |
| R5: the report's per-variant literal pair | subjective referral | Refused (`label-contrast-design-verdict.md` § Carried and dropped) | none |
| The `alert.test.ts` edit reads the release map three times in a nested ternary | subjective, non-blocking | Folded into TEST-DATA | THEME round 2 |

## Landing

THEME round 1 lands on the session branch before its fix round. Every code claim is confirmed by every lane
that ruled it; the broken clauses are the report's, and the outside findings are placement, prose, a missing
plant, and an uncarried row. LABEL needs THEME's cascade as its base, and landing first lets LABEL and THEME
round 2 run in parallel on disjoint files. THEME round 2 and LABEL both land before the session branch's next
`main` push. Landing: `ct-land.sh` with `ct-resolve.py`, logged in `land-ct.log.txt`.

VERDICT: FAIL 7, 8; outside the claims: TEST-DATA, F1, F2, R1, R4 — carried as named.

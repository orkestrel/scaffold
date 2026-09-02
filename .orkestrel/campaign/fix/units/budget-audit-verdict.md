# Audit verdict — unit breaking-budget

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` and `verifier` on Sonnet. Subject: commit `ff2659b` (`units/budget.diff`,
`units/budget-report.md`).

| Claim | Objective lane | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows | CONFIRMED | CONFIRMED | — | stands |
| 2 no old name; contract in `types.ts` | CONFIRMED (`\bconsume\b` names only the unchanged method) | CONFIRMED | — | stands |
| 3 ruled form (`consumer`; `#consumer` and `createTokenConsumer` untouched) | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | — | — | stands |
| 5 guide rows and fences | — | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | CONFIRMED | — | stands |
| 7 gates | — | quoted | GREEN (312 tests) | stands |
| 8 nothing hidden | CONFIRMED | — | — | stands |

Referrals, ruled: the TSDoc first-sentence rewrite reached `createTokenBudget`'s block, whose only
edit was a body shorthand — within the clause's spirit (the block belongs to a declaration the
unit edited) and harmless; the mixed voice inside `helpers.ts` is the TSDoc wave's subject, which
runs last by the user's ruling. The README sweep gap is a disclosure gap, not a tree defect.

Terminal lines: objective PASS; checker PASS; verifier GREEN. **Verdict: PASS.** The unit closes
**applied** for s18-19.

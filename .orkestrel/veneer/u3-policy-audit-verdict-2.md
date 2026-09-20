# U3-policy audit round 7 — verdict

Round of 2026-09-20 on `u3-policy-audit-claims-2.md` (9 claims) over the round-8 tree
(`units/u3-policy-report-8.md`). Objective lane `reviewer` on native Opus 5 through the workflow
`veneer-final-rounds-native-lanes` (`wf_f0069556-a45`), brief
`units/u3-policy-audit-2-reviewer-brief.md`, report `units/u3-policy-audit-2-reviewer-report.md`;
subjective lane `analyst` on Astra (`units/u3-policy-audit-2-analyst.sh`, report
`units/u3-policy-audit-2-analyst-report.md`, thread `01a0bea1-e75f-7ce1-b3ea-86e05afa67c6`);
`verifier` on native Sonnet through the same workflow (`units/u3-policy-gate-report.md`: the whole
chain green, the inventory stable across the build). Both lanes ran blind on the one claims file.

## Reconciliation

| Claim | Reviewer | Analyst | Ruling |
| --- | --- | --- | --- |
| 1 | REFUTED on wording (a membership string names one region; the claim asked for four) | CONFIRMED | the claim was ill-formed (it contradicted claim 4); the accounting holds; the claims file is corrected for round 8 |
| 2 | REFUTED (the remark claims a section boundary the reader lacks) | REFUTED (the row admits an absolute path and a link from a later cell) | refuted on both readings; carried |
| 3 | CONFIRMED | REFUTED (`](<x.md>#f)` and `](https:x.md)` admitted) | the analyst's executed readings win; carried |
| 4, 5 | CONFIRMED | CONFIRMED | confirmed |
| 6 | REFUTED ("directory-table" beside "directory-index") | CONFIRMED | refuted; carried |
| 7 | REFUTED (the count "four ways") | REFUTED (the same) | refuted; carried |
| 8 | REFUTED in part (the guide instruction names output the sweep never emits) | REFUTED (the same, with the recovery instruction to write) | refuted; carried |
| 9 | UNDECIDABLE | UNDECIDABLE | confirmed by the verifier's report |

## Findings carried into the fix brief (`units/u3-policy-brief-9.md`)

| Finding | Source | Carrier |
| --- | --- | --- |
| the row admits an absolute path and a later-cell link | analyst 2 | brief-9 § 1 |
| the link admits a fragment after an angled target and a colon in a bare name | analyst 3 | brief-9 § 2 |
| the count | both 7 | brief-9 § 3 |
| the recovery sentence names a diagnostic that does not exist | analyst 8, reviewer 10 | brief-9 § 4 |
| two names for the row | reviewer 6 | brief-9 § 5b |
| the remark's section-boundary claim; the two fence limits carry no case; the mirror asymmetry | reviewer 2, 12, 13, 11 | brief-9 § 5c |
| the claims file's own contradiction | reviewer 14 | the round-8 claims file |

## Dropped, on the record

Nothing.

Ruling (round 7): fix round.

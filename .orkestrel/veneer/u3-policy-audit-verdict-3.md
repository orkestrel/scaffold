# U3-policy audit round 8 — verdict

Round of 2026-09-20 on `u3-policy-audit-claims-3.md` (10 claims) over the round-9 tree
(`units/u3-policy-report-9.md`). Objective lane `reviewer` on native Opus 5 through the workflow
`policy-round-8-native-lanes` (`wf_cfc2c7c3-7f3`), brief `units/u3-policy-audit-3-reviewer-brief.md`,
report `units/u3-policy-audit-3-reviewer-report.md`; subjective lane `analyst` on Astra
(`units/u3-policy-audit-3-analyst.sh`, report `units/u3-policy-audit-3-analyst-report.md`, thread
`01a0beb0-7dee-70f2-be2a-7bed6750cb81`); `verifier` on native Sonnet through the same workflow
(`units/u3-policy-gate-report-2.md`). Both lanes ran blind on the one claims file.

## Reconciliation

| Claim | Reviewer | Analyst | Ruling |
| --- | --- | --- | --- |
| 1, 3, 4, 5, 7, 9 | CONFIRMED | CONFIRMED | confirmed; the analyst executed every link form and the reader against real roots |
| 2 | CONFIRMED (the real concept rows open with an unbackticked name) | REFUTED (a backticked concept cell matches; the remark's "does not take that shape" is a claim about meaning the reader cannot make) | the remark overclaims; carried |
| 6 | UNDECIDABLE (the cross-target readings are the writer's) | UNDECIDABLE | the Orchestrator confirmed both targets clean; the readings stand as the writer's until the next round's verifier |
| 8 | REFUTED in part (the count "The two names are distinct") | REFUTED (the same) | refuted; carried |
| 10 | UNDECIDABLE | UNDECIDABLE | the verifier ran the chain: every gate green but `test:config`, red on a case that reads the operating system's temporary directory while another checkout's build wrote there; a proof-isolation defect outside this unit (scaffold task `Isolate the config proof's declaration-roll scratch check`); the deciding re-run is the Orchestrator's, alone |

## Ruling on the mechanism

The Orchestrator considered replacing the line-and-regex reader with `@orkestrel/markdown`,
which would end the class of finding outright, and rejected it: no fleet target declares that
package and `tests/setupPolicy.ts` is vendored into every one, so a parser would force a new
declared dependency on each. The shape-matching reader stands.

## Findings carried into the fix brief (`units/u3-policy-brief-10.md`)

| Finding | Source | Carrier |
| --- | --- | --- |
| the remark's concept-row claim | analyst 2 | brief-10 § 1 |
| the count | analyst 8, reviewer 8 | brief-10 § 2 |
| the regression test cannot fail (one guide name for three rows) | analyst 11 | brief-10 § 3 |
| the fence-limit rows carry no sweep control | reviewer 11 | brief-10 § 5 |
| a row naming a directory that does not exist | reviewer 12 | brief-10 § 6 |
| the pattern's per-line application unstated on the pattern | reviewer 13 | brief-10 § 7 |
| a cell with more than one link | reviewer 14 | brief-10 § 8 |

## Dropped, on the record

Nothing.

Ruling (round 8): fix round.

# E-ID-FLOW audit, round 1 — the Orchestrator's reconciliation (2026-09-25)

Claims: `flow-audit-claims.md`. Lanes that ran, blind to each other on that one claims file: the objective lane,
`analyst` on GPT-6 Astra (`flow-audit-objective-verdict.md`, thread `01a0d5f8-d3ad-7b81-9f8f-0a35dcc05863`); the subjective lane, `reviewer` on
Opus 5.5 (`flow-audit-subjective-verdict.md`); and `checker` on Sonnet (`flow-audit-checker-verdict.md`). The unit
was written by `opus` on Opus 5.5, so the objective lane ran on an engine that did not write it.

## Rulings

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 2 | CONFIRMED | CONFIRMED | — | Held. |
| 3 | UNRESOLVED | BROKEN | — | Broken: each density case's title says the tag takes the release margins at a doubled density, while the case asserts the doubled margin; and no run shows the `address` density case red under a literal `rem`. F1, F2. |
| 4 | CONFIRMED | CONFIRMED | — | Held. |
| 5 | CONFIRMED | CONFIRMED | — | Held on the Orchestrator's re-run probe, whose full log now covers both widths (the first retained log was cut at 1280 by a pipe the Orchestrator closed; the objective lane found it). |
| 6 | CONFIRMED | CONFIRMED | CONFIRMED | Held on the rows; the gate clause is dropped on the record, because a claims file carries no gate claim (`../plan.md` § Process corrections). |
| 7 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |

## Findings outside the claims and carriers

| Finding | Source | Ruling | Carrier |
| --- | --- | --- | --- |
| F1: the density case titles overstate what they assert | subjective, claim 3 | Holds. | E-ID-FLOW round 2 (`e-id-flow-brief-2.md`) |
| F2: the `address` literal-`rem` mutation has no run | objective, claim 3 | Holds. | E-ID-FLOW round 2 |
| F3: the guide's nested-list Excluded rows do not state the visible consequence this change created, and no proof backs the `.mb-0` remedy | subjective | Holds (`ROADMAP.md` § Tenets: every incompatibility explicit). | E-ID-FLOW round 2 |

VERDICT: FAIL 3; outside the claims: F3

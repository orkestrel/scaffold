# AP-COLOR audit, round 2 — the Orchestrator's reconciliation (2026-09-24)

Claims: `apc-audit-2-claims.md`. Lanes that ran, blind to each other on that one claims file: the objective lane,
`analyst` on GPT-6 Astra (`apc-audit-2-objective-verdict.md`, thread `01a0d56c-91dc-7871-8340-366767d5b044`); the
subjective lane, `reviewer` on Opus 5.5 (`apc-audit-2-subjective-verdict.md`); and `checker` on Sonnet
(`apc-audit-2-checker-verdict.md`, claims 1, 3, 9, 10, and 11). The unit was written by `opus` on Opus 5.5, so the
objective lane ran on an engine that did not write it.

## Rulings

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 2 | CONFIRMED | CONFIRMED | — | Held: the objective lane's executed comparison returns byte equality with round 1's source. |
| 3 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 4 | CONFIRMED | CONFIRMED | — | Held. |
| 5 | CONFIRMED | CONFIRMED | — | Held. |
| 6 | BROKEN | CONFIRMED | — | Held on the code. "Every override" was the Orchestrator's wording, in the claim and the brief, and it is too wide: the root density control and the descendant F7 overrides sit where their subjects require. |
| 7 | CONFIRMED | CONFIRMED | — | Held. |
| 8 | CONFIRMED | CONFIRMED | — | Held on the source; the rewritten release-record case has no retained red (H5). |
| 9 | CONFIRMED | CONFIRMED | CONFIRMED | Held; two proof sentences are carried (H3, H4). |
| 10 | CONFIRMED | BROKEN | CONFIRMED | Broken: the retune test proves the colored link's descendant-token path under a title naming only the role color. H1. |
| 11 | BROKEN | CONFIRMED | CONFIRMED | Broken: the report says the proof sets no root override, and it sets the density override on the root. H2. |

## Findings and carriers

| Finding | Source | Carrier |
| --- | --- | --- |
| H1: the retune test's title hides the colored-link path it proves | subjective | AP-COLOR round 3 (`ap-color-brief-3.md`) |
| H2: the report's root-override and "every override" sentences | objective | AP-COLOR round 3 |
| H3: the anchor proof sentence ties the hover color to `.text-primary`, which has no hover | subjective | AP-COLOR round 3 |
| H4: the retune proof sentence packs several ideas into one | subjective | AP-COLOR round 3 |
| H5: no retained red for the rewritten release-record case | subjective referral, objective | AP-COLOR round 3 |
| H6: "only the role class takes the opacity steps" has no executed assertion | subjective referral | AP-COLOR round 3 |

VERDICT: FAIL 10, 11; outside the claims: H3, H4, H5, H6

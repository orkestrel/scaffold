# AP-TYPE audit, round 2 — the Orchestrator's reconciliation (2026-09-24)

Claims: `apt-audit-2-claims.md`. Lanes that ran, blind to each other on that one claims file: the objective lane,
`analyst` on GPT-6 Astra (`apt-audit-2-objective-verdict.md`, thread `01a0d571-bffe-7582-aa00-494d1693c5c5`); the
subjective lane, `reviewer` on Opus 5.5 (`apt-audit-2-subjective-verdict.md`); and `checker` on Sonnet
(`apt-audit-2-checker-verdict.md`, claims 1, 4, 5, 8, and 9). The unit was written by `opus` on Opus 5.5, so the
objective lane ran on an engine that did not write it.

## Rulings

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 2 | BROKEN | CONFIRMED | — | Held on the code. "Every size proof" was the Orchestrator's wording: the override and layer-escape proofs pin 1280 alone, and every fluid proof pins 1200 exactly, which the objective lane's executed matchers confirm. |
| 3 | CONFIRMED | CONFIRMED | — | Held. |
| 4 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 5 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 6 | BROKEN | BROKEN | — | Broken on the report: the full `xxl` mutation's readings differ from the rows' readings, and the `.fs-6` later-value case the guard mutation reddens is missing. The departure from the brief's G1 wording holds. J1. |
| 7 | BROKEN | CONFIRMED | — | Broken on the report's wording: the boundary mutations cannot redden the zero-excess proofs, so "every size proof" is wider than the logs. J1. |
| 8 | BROKEN | BROKEN | CONFIRMED | Broken: "This partial" attaches to `_mixins.scss`; the `.h1` with `.fs-6` sentence is false for a retuned token below 1200 (24.71px at 390 for a 32px token). J2. |
| 9 | CONFIRMED | BROKEN | CONFIRMED | Broken: the mixin case title says it scales a size its 1rem row holds. J3. |

## Findings and carriers

| Finding | Source | Carrier |
| --- | --- | --- |
| J1: the report's failing-first table and mutation coverage sentences | both lanes | AP-TYPE round 3 (`ap-type-brief-3.md`) |
| J2: the partial pronoun and the `.fs-6` sentence in § Font utilities | both lanes | AP-TYPE round 3 |
| J3: the mixin case title | subjective | AP-TYPE round 3 |
| J4: the font proof paragraph names 390 and 1280 only and omits the size class on a heading tag | subjective | AP-TYPE round 3, which owns that paragraph |
| J5: `describe('fluid size mixin')` and its TSDoc name the mixin by the function's name | subjective | AP-TYPE round 3 |

VERDICT: FAIL 6, 7, 8, 9; outside the claims: J4, J5

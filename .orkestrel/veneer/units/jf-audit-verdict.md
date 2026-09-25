# J-FIXTURES audit, round 1 — the Orchestrator's reconciliation (2026-09-25)

Claims: `jf-audit-claims.md`. Lanes that ran, blind to each other on that one claims file: the objective lane,
`analyst` on GPT-6 Astra (`jf-audit-objective-verdict.md`, thread `01a0d5f8-6156-7f10-9d34-9a76c24f555a`); the subjective lane, `reviewer` on
Opus 5.5 (`jf-audit-subjective-verdict.md`); and `checker` on Sonnet (`jf-audit-checker-verdict.md`, which returned
its lane line after a stray opening sentence). The unit was written by `opus` on Opus 5.5, so the objective lane ran on
an engine that did not write it.

## Rulings

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 2 | CONFIRMED | CONFIRMED | — | Held. |
| 3 | CONFIRMED | CONFIRMED | — | Held; the subjective lane found the check order unpinned (a candidate list of an SVG element and a `div`), which J2 carries. |
| 4 | UNRESOLVED | CONFIRMED | — | Unresolved: the cases read as distinguishing, and no retained run shows each refusal's removal red. J1. |
| 5 | BROKEN | CONFIRMED | — | Held for the subjective lane: `names.md`'s own required form `{Entity}Options` is a plural group noun, as are `EmitterHooks` (`patterns.md`) and Veneer's `DropdownDefaults`, so "never pluralize type names" binds the entity, and `MatchMessages` names a group of message slots the way `Options` names a group of option slots. Both citations resolve. |
| 6 | BROKEN | CONFIRMED | CONFIRMED | Dropped on the record as a claims-file fault: no exported interface in `tests/setupBrowser.ts` or `tests/setupStyles.ts` carries an `@example`, so the claim's interface clause asked for more than the file's convention. |

## Findings outside the claims and carriers

| Finding | Source | Ruling | Carrier |
| --- | --- | --- | --- |
| J1: no retained run shows the duplicate or the foreign refusal's removal red | objective, claim 4 | Holds. | J-FIXTURES round 2 (`j-fixtures-brief-2.md`) |
| J2: the helper's check order is unpinned | subjective | Holds. | J-FIXTURES round 2 |
| J3 (fixture-data): the case message table sits inside the test's `describe` callback | objective | Holds (`.claude/rules/tests.md`: data tables belong in a setup file). | J-FIXTURES round 2 |

VERDICT: FAIL 4; outside the claims: J3

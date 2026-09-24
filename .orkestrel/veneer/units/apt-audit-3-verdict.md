# AP-TYPE audit, round 3 — the Orchestrator's reconciliation (2026-09-24)

Claims: `apt-audit-3-claims.md`. Lanes that ran, blind to each other on that one claims file: the objective lane,
`analyst` on GPT-6 Astra (`apt-audit-3-objective-verdict.md`, thread `01a0d581-8b11-7762-98fb-a0b9616ff021`); the
subjective lane, `reviewer` on Opus 5.5 (`apt-audit-3-subjective-verdict.md`); and `checker` on Sonnet
(`apt-audit-3-checker-verdict.md`). The unit was written by `opus` on Opus 5.5, so the objective lane ran on an engine
that did not write it.

## Rulings

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 2 | CONFIRMED | CONFIRMED | CONFIRMED | Held: the guard and cap mutations distinguish the mixin rows the title names. |
| 3 | CONFIRMED | CONFIRMED | CONFIRMED | Held: 24.71px at 390 and 32px at 1280 for a 32px token, both "derived from" it. |
| 4 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 5 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 6 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |

## Findings outside the claims and carriers

| Finding | Source | Ruling | Carrier |
| --- | --- | --- | --- |
| L1: the `FLUID_SIZE_CASES` TSDoc says the 2.25rem row "sits under" a 20px root beside "sits under" the floor | subjective F1 | Holds: one phrase for two relations. | AP-TYPE round 4 (`ap-type-brief-4.md`) |
| L2: § Font utilities' "The partial writes every entry" follows a sentence naming `_tokens.scss` | subjective R1 | Holds: same defect class as J2, outside round 3's hunks. | AP-TYPE round 4 |
| L3: the `_font.scss` comment "None of the release's font entries is responsive" reads as false beside the responsive size rule the file implements | subjective R2 | Holds: the comment means the breakpoint infix. | AP-TYPE round 4 |
| L4: the report says no remaining baseline-passing test reads a changed size; the mode/density and unlayered-priority cases read `.fs-3` relationally | objective F1 | Holds on the report; the code needs no change. | AP-TYPE round 4's report, as an erratum |
| L5: the report states "The two edited guide paragraphs"; three were rewrapped, and a count is banned | subjective F2 | Holds on the report. | AP-TYPE round 4's report, as an erratum |

Every claim held; L1 to L5 stand outside the claims and AP-TYPE round 4 carries them.

VERDICT: FAIL none; outside the claims: L1, L2, L3, L4, L5

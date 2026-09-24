# T5 TEST-FRAME audit, round 6 — the Orchestrator's reconciliation (2026-09-24)

Claims: `t5-audit-6-claims.md`. Lanes that ran, blind to each other on that one claims file: the objective lane,
`analyst` on GPT-6 Astra (`t5-audit-6-objective-verdict.md`, thread `01a0d50e-6499-7863-a4e6-32a293c17c4a`); the
subjective lane, `reviewer` on Opus 5.5 (`t5-audit-6-subjective-verdict.md`); and `checker` on Sonnet
(`t5-audit-6-checker-verdict.md`). The unit was written by `opus` on Opus 5.5, so the objective lane ran on an engine
that did not write it.

## Rulings

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 2 | BROKEN | BROKEN | — | Broken on the claim's wording, which the Orchestrator wrote too wide: a fitting box whose start edge lies before the window's start and whose far edge lies inside it stays unmoved, as the ruling's zero-or-negative move and the retained negative-top case fix. The bounded arithmetic holds: the objective lane's sweep over 876096 combinations with nonnegative starts found no containment, positive-move, or unnecessary-move failure, and the round-5 arithmetic failed 242480 of them. No code change. |
| 3 | CONFIRMED | CONFIRMED | CONFIRMED | Held. The subjective lane's R3 (no retained mutation removes the left axis's rounding) is settled by the Orchestrator's run: removing it reddens the both-edges case, `-390.5` against `-391` (`t5-instruments-6/t5-6-mut-leftceil.log.txt`), with the source restored and the test digest unchanged. |
| 4 | CONFIRMED | CONFIRMED | — | Held. |
| 5 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 6 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 7 | CONFIRMED | CONFIRMED | — | Held. |

## Findings and carriers

| Finding | Source | Carrier |
| --- | --- | --- |
| G1: the F1 text joined the release sentence into one sentence of about 75 words in the guide and about 55 in the remarks | subjective | T5 round 7 (`t5-test-frame-brief-7.md`) |
| R1: a hand-built rect with a negative size can return a positive move | subjective referral | Dropped: `getBoundingClientRect` never reports a negative size, so no capture reaches it. |
| R2: a fitting fixed element whose box starts above the window is shot unmoved | subjective referral | Retained as ruled: the move is zero or negative on each axis (park ruling P4), and the `captureFrame` docs already state that a fixed element past the pane can take a scroll that does not move it. No Veneer capture meets the case. |

VERDICT: FAIL 2 (the claim's wording); outside the claims: G1

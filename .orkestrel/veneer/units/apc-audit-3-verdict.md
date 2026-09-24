# AP-COLOR audit, round 3 — the Orchestrator's reconciliation (2026-09-24)

Claims: `apc-audit-3-claims.md`. Lanes that ran, blind to each other on that one claims file: the objective lane,
`analyst` on GPT-6 Astra (`apc-audit-3-objective-verdict.md`, thread `01a0d57d-605c-7e21-8908-f2a96d29ddda`, PASS); the
subjective lane, `reviewer` on Opus 5.5 (`apc-audit-3-subjective-verdict.md`); and `checker` on Sonnet
(`apc-audit-3-checker-verdict.md`, claims 1, 5, and 7).

## Rulings

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 2 | CONFIRMED | BROKEN | — | Broken on one title: the fill-and-body case also asserts that the emphasis class follows the retuned fill, and its title names only the role color. Every assertion is kept. K1. |
| 3 | CONFIRMED | CONFIRMED | — | Held. |
| 4 | CONFIRMED | CONFIRMED | — | Held. |
| 5 | CONFIRMED | CONFIRMED | UNRESOLVED | Held: the subjective lane rules the split sentences one idea each. |
| 6 | CONFIRMED | CONFIRMED | — | Held. |
| 7 | CONFIRMED | BROKEN | CONFIRMED | Broken on one title: "each emphasis class" where the case iterates the roles outside the neutral roles. K2. The runner header's missing mutation is recorded in this verdict; the runner is a retained instrument, not landed code. |

Referrals ruled: R1 (per-assertion reds for the body-text, emphasis-follows-fill, and density assertions) is dropped,
because each split case reads red under the channel mutation and the lanes named the distinguishing mutation of each
remaining assertion by reading; R2 (the role-alpha half of the opacity case) is covered by round 1's bare-mix mutation
over the opacity-steps proof.

This defect class, a test title narrower than its assertions, has recurred through a new site in each round while the
source stayed byte-identical to round 1. Round 4 is bounded to K1 and K2, and its audit rules on those two edits alone.

## Findings and carriers

| Finding | Source | Carrier |
| --- | --- | --- |
| K1: the fill-and-body retune title omits the emphasis class | subjective | AP-COLOR round 4 (`ap-color-brief-4.md`) |
| K2: the emphasis-opacity title omits its neutral-role scope | subjective | AP-COLOR round 4 |

VERDICT: FAIL 2, 7; outside the claims: none

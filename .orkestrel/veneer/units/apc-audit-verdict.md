# AP-COLOR audit, round 1 — the Orchestrator's reconciliation (2026-09-24)

Claims: `apc-audit-claims.md`. Lanes that ran, blind to each other on that one claims file: the objective lane, `analyst`
on GPT-6 Astra (`apc-audit-objective-verdict.md`, thread `01a0d54b-3b42-7ac2-989e-d92d6e6e7774`); the subjective lane,
`reviewer` on Opus 5.5 (`apc-audit-subjective-verdict.md`); and `checker` on Sonnet (`apc-audit-checker-verdict.md`,
claims 1 and 10 to 13). The unit was written by `opus` on Opus 5.5, so the objective lane ran on an engine that did not
write it. The Orchestrator added two readings: the capture run in the worktree (`apc-instruments/apc-capture.log.txt`)
and a resting outline capture over the unit's cascade (`appearance-instruments/apc-outline-rest-capture.mjs`, its log,
and `apc-outline-rest--<mode>-<width>.png`).

## Rulings

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 2 | CONFIRMED | UNRESOLVED | — | Held: the objective lane diffed every declaration of the two cascades and found only the ruled changes. |
| 3 | CONFIRMED | CONFIRMED | — | Held. |
| 4 | CONFIRMED | BROKEN | — | Broken on its mutation sentence: the tier-at-80 and channel mutations ran only the `.text-<role>` proof, so no log shows the link, outline, feedback, or label contrast proofs red. The proofs' structure holds. F2. |
| 5 | CONFIRMED | CONFIRMED | — | Held; the identity proof has no executed red (F3). |
| 6 | CONFIRMED | CONFIRMED | — | Held on the assertions; no executed red (F3), and the proof runs in light alone (F4). |
| 7 | CONFIRMED | CONFIRMED | — | Held; whether `matchesColor` separates an oklab hover from the sRGB one is unmeasured (F3). |
| 8 | CONFIRMED | CONFIRMED | — | Held. |
| 9 | CONFIRMED | CONFIRMED | — | Held. The light fills already clear 4.5 (tier probe: success 4.95, danger 6.42), so the tier-equality proof, not the contrast proof, binds the light change. |
| 10 | CONFIRMED | CONFIRMED | CONFIRMED | Held; the tautological assertions the subjective lane refers are F5. |
| 11 | BROKEN | BROKEN | CONFIRMED | Broken: the prose states a count ("the two neutral links"), claims every colored link is read against 4.5, and states the identity sentence without its neutral scope; the departure sentence's emphasis-token clause is true only at the theme-declaring scope and has no proof, and it omits the `--bs-primary-text-emphasis` alias. F6, F7. |
| 12 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 13 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| Rendered | NOT-EVIDENCED | BROKEN | — | Held on the Orchestrator's capture: each outline label outside the neutral roles reads on its tier and its border on the fill, in both modes at 390 and 1280. The blend clause was the Orchestrator's wording, too wide: the neutral links and outlines are faint on their own canvas by the ruling's exclusion and are unchanged from the base cascade. |

## Findings and carriers

| Finding | Source | Carrier |
| --- | --- | --- |
| F1: `UNDER_BAR` in `tests/setup.ts` still lists six dark outline rests that now clear the bar, so the journey's composed-contrast case fails in every variant | Orchestrator's capture run | AP-COLOR round 2 (`ap-color-brief-2.md`) |
| F2: no retained red for the link, outline, feedback, and label contrast proofs | subjective | AP-COLOR round 2 |
| F3: the report says every added test is bound to red; no run reddens the identity, retune, outline-contrast, or anchor-identity proofs, and an oklab hover mutation is untried | objective, subjective referral | AP-COLOR round 2 |
| F4: the retune proof runs in light alone, and the identity, opacity, validation, and anchor fixtures paint no explicit canvas | objective | AP-COLOR round 2 |
| F5: `tests/setupStyles.test.ts` compares `TEXT_TIER_CASES` with its own template and `TEXT_TIER_SHARE` with its own literal and pins `tertiary` to an index; the release-record case compares each tier key with an inline copy of its own source | subjective referral | AP-COLOR round 2 |
| F6: the guide's count, the overclaimed link sentence, and the unscoped identity sentence | both lanes | AP-COLOR round 2 |
| F7: the departure sentence's emphasis-token clause and its missing proof | subjective | AP-COLOR round 2 |

VERDICT: FAIL 4, 11; outside the claims: F1, F3, F4, F5

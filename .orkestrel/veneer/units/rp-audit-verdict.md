# RP audit — the Orchestrator's reconciliation (2026-09-24)

Claims: `rp-audit-claims.md`. Lanes that ran, blind to each other on that one claims file: the objective lane,
`analyst` on GPT-6 Astra (`rp-audit-objective-verdict.md`); the subjective lane, `reviewer` on Opus 5.5
(`rp-audit-subjective-verdict.md`); and `checker` on Sonnet (`rp-audit-checker-verdict.md`). The unit was written by
`builder` on Sonnet, so both lanes ran on engines that did not write it.

## Rulings

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | UNRESOLVED | UNRESOLVED | UNRESOLVED | Unresolved: the gate exits rest on the report alone, and the unit ran direct binaries rather than the package scripts. Round 2 logs every gate. |
| 2 | CONFIRMED | BROKEN | CONFIRMED | **Broken.** The cascade-key comment still gives the padding a pointer consequence ("the parked pointer, outside the page, rests over none of them"), and `tests/setup.ts` (the `CASCADE_KEYS` remarks, around line 633) and `guides/veneer.md` (around line 10557) still tie the padded top to the released pointer resting off the copies. The brief's search pattern did not reach those sentences. |
| 3 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 4 | CONFIRMED | CONFIRMED | — | Held. The Orchestrator's park-2 readings (`t5-instruments-park2/park2-readings.md`) add that the frame manager's staging alone, with `CAPTURE` unset, separates the parks: 0.0.23 reddens, round 5 passes. |
| 5 | BROKEN | BROKEN | — | **Broken.** `parked` labels the proof's setup, not a state of the subject; the frame shows the button at rest. |
| 6 | BROKEN | BROKEN | CONFIRMED | **Broken** on the lanes' sites: the `parked` sentence has no noun after its token, "outside the page" alternates with "off the page", "the page's origin" names the tester document's origin, and one clause says the pointer would otherwise land at the origin. |

Outside the claims: the dark variant's frame shows the light theme (objective O1, subjective F1), and the descendant
hover assertion cannot fail because the copied button has no descendants (subjective F2).

## Ruling on the fork (claim 5)

The case stages the pane through the installed `stagePane` and `releasePane` functions and places no frame. The park
the ruling promises is about what staging, scroll, and offset put under the parked pointer, and staging is the adverse
condition the gate's configuration exercises. The Orchestrator's readings: the same staging after the release reddens
the case on 0.0.23 and passes it on round 5 (`park2-readings.md`, probe D). So the `parked` capture state, the
`primary-parked` row, and every census edit go; no frame is written, which also retires O1; F2's assertion goes.

## Carriers

| Finding | Carrier |
| --- | --- |
| Claim 1 | RP round 2, the gate table with logs |
| Claim 2 | RP round 2, the three padding sentences |
| Claim 5, O1, F2 | RP round 2, the staging case |
| Claim 6 | RP round 2, the case comment (the `parked` sentence goes with claim 5) |

VERDICT: FAIL 1, 2, 5, 6; outside the claims: O1, F2

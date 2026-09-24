# FOCUS-FRAME (`ff`) audit round 1 — the Orchestrator's verdict

Claims: `ff-audit-claims.md`. Lanes, blind on that one file:

- the objective lane, `analyst` on GPT-6 Astra (`ff-audit-objective-verdict.md`);
- the subjective lane, `reviewer` on Opus 5.5 (`ff-audit-subjective-verdict.md`);
- the checker, `checker` on Sonnet, on claims 1, 3, and 8 (`ff-audit-checker-verdict.md`).

The unit was written by `opus` on Opus 5.5, so the objective lane ran on an engine that did not write it.

## Per claim

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Scope | CONFIRMED | CONFIRMED (R3) | CONFIRMED | CONFIRMED; the helpers and their proofs in `tests/setup.ts` and `tests/setup.test.ts` are in scope, as the home the ring check the brief required needs |
| 2 P1 | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 3 The helpers | BROKEN | CONFIRMED (R2) | UNRESOLVED | BROKEN in its isolation wording; R2 carried |
| 4 P3, the radio | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 5 P3, the pointer | CONFIRMED | UNRESOLVED | — | The converted form's mutation run is carried |
| 6 P2 | UNRESOLVED | CONFIRMED | — | The ruling stands (no cascade change); the list-group pixel control and the omitted release readings are carried |
| 7 The frames | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 8 Law and report | BROKEN | BROKEN | BROKEN | BROKEN |

- **Claim 3.** The outline mutation reddens the outline proof and the combined-ring proof, which the claim's "and
  on nothing else" contradicts; the assertions distinguish it. The subjective lane's R2: the helper's
  parenthesis-aware split and color stripping may be distinguished by no proof row.
- **Claim 5.** The logged red came from the page-frame form; the subjective lane reads that in the converted
  frame the parked pointer likely rests in the wrapper's padding, so deleting the release may leave the watcher
  empty. A run of the converted case with the release deleted settles it.
- **Claim 6.** The pixel experiment measured the skip link alone, and the no-press rows and the light
  scripted-after-press row were overwritten. No evidence asks for a cascade change.
- **Claim 8.** The `shadows`, `outlines`, and `worn` tables sit in `tests/setup.test.ts`; the report carries tallies,
  temporal words, and code tokens without nouns; three gate logs are not retained.

## Outside the claims

| Finding | Lane | Ruling | Carrier |
| --- | --- | --- | --- |
| AUTO-OUTLINE-GUARD: no permanent assertion distinguishes a painted `auto` outline from an unpainted one (the subjective lane's R1) | objective; subjective R1 | Confirmed | FOCUS-FRAME round 2 |
| GUIDE-FOCUS-UNIVERSAL: the § Tests paragraph says every focus frame uses the padded wrapper and Tab; the dropdown and carousel cases do not | objective | Confirmed | FOCUS-FRAME round 2 |
| F3: code tokens without a noun in added comments and the patch | subjective | Confirmed | FOCUS-FRAME round 2 |
| F4: two unwrapped guide paragraphs in the patch | subjective | Confirmed | FOCUS-FRAME round 2 |
| F5: the `computeRingReach` TSDoc says the outline measured 2 CSS pixels; the probe read 1.59 to 2 | subjective | Confirmed | FOCUS-FRAME round 2 |
| F1: the lift, wrap, place, and crop block repeats in every focus case, and `nav-underline-focus` keeps a private copy of the reach reading | subjective; the unit's observation | Confirmed; the helper home is `tests/setupBrowser.ts` | FRAME-HELPERS |
| F2: one concept under several names (`lifted`, `wrapper`, `padded`, `marker`, `anchor`, `shot`) | subjective | Confirmed; resolved by the F1 helper | FRAME-HELPERS |
| R5: `dropdown-menu-focus` and `captioned-carousel-focus` reach focus by a scripted focus in dark | subjective; the unit's observation | Confirmed as unverified | FRAME-HELPERS |

VERDICT: FAIL 3, 8; claims 5 and 6 carried; outside the claims: AUTO-OUTLINE-GUARD, GUIDE-FOCUS-UNIVERSAL, F3, F4, F5 — carried by FOCUS-FRAME round 2 (`b-focus-frame-brief-2.md`); F1, F2, R5 by FRAME-HELPERS.

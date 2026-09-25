# J-CONCERNS-B — audit verdict (2026-09-25)

**Subject.** Veneer `7ab04db` on `unit/concerns-b` over `b867c96`. The claims are `units/j-concerns-b-audit-claims.md`, and the replay is `units/j-concerns-b-replay.log.txt`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra (`units/j-concerns-b-audit-objective-verdict.md`): `VERDICT: FAIL 2, 3`. Opus 5.5 wrote the unit, so this lane is the cross-engine auditor.
- **Subjective:** not run. The unit adds three test cases and changes no source, name, or prose.
- **Checker:** not run.

**Rulings.**
- **Claims 1, 4, and 5: CONFIRMED.** D-MOTION's case asserts, at each event, a running animation with a positive duration, and dispatch before the call yields. Both of its mutations redden it by an assertion. Only the two test files changed.
- **Claim 2: FAIL.** The P-CANCEL cases read the state after the prevented call: refusal, sampled state, and no completion event. They record no mutation history, so a show that writes and then writes back would pass them. The claim, and the brief's obligation, said "writes nothing".
- **Claim 3: FAIL as the Orchestrator wrote it.** `Tooltip.test.ts` does construct and show a `Popover` elsewhere. The lane confirmed the narrower point the unit needed: no tooltip prevention case reaches the popover profile, and both profile-conditional mutations leave that file green. The claim's wording was the error, and the unit's ruling stands.

**Outside the claims.** A nested `destroy` from a closing `beforetoggle` returns while the popover tip is still connected, because `Tooltip`'s `#discard` clears its fields before the placement's destruction. This is S2 row 4, which E35 gives to J-RELEASE-POPUPS.

**Successor.** Round 2 (`units/j-concerns-b-brief-2.md`) adds to each P-CANCEL case a mutation record of the trigger and the document during the prevented call, asserting that none was taken.

VERDICT: FAIL 2, 3

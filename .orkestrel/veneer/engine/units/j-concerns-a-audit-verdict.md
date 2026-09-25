# J-CONCERNS-A rounds 1 and 2 — audit verdict (2026-09-25)

**Subject.** Veneer `bcea965` on `unit/concerns-a`. The claims are `units/j-concerns-a-audit-claims.md`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra, thread `01a0d6d1-dee5-74a2-8fc4-65ef95e9b481` (`units/j-concerns-a-audit-objective-verdict.md`): `VERDICT: FAIL 3,7`.
- **Checker job:** Grok, session `af841f64-645e-4dea-b56d-b24a130a34e0`, on claims 7 and 8 (`units/j-concerns-a-audit-checker-verdict.md`): `VERDICT: PASS`.
- **Subjective:** not run. The unit changes no public shape: its diff touches two test files and no source.

**Reconciling claim 7.** The lanes disagree. The checker read the test rules and found no breach. The objective lane found a native fragment navigation that leaves a session-history entry behind, which the cleanup does not remove. Both lanes' citations resolve: `ScrollSpy.test.ts:551` in the checker's reading, and `:587` in the objective lane's. The objective lane names a state the case leaves, while the checker checked the cleanup's presence rather than its effect. The objective lane's reading stands.

**Rulings.**
- **Claim 3: FAIL, ruled E34.** Veneer's tenet requires reduced-motion gating in script. Chromium animates a scripted smooth scroll under reduced motion, so ScrollSpy gates it itself. Round 3 flips the case.
- **Claim 7: FAIL, upheld.** Round 3 removes the navigation control. The `scrollspy-navigate` mutation already distinguishes a navigation the engine fails to prevent.
- **Claims 1, 2, 4, 5, 6, and 8: CONFIRMED** on the lanes' evidence and the Orchestrator's replays (`units/j-concerns-a-mutations-orchestrator.log.txt`, `-2.log.txt`).

**Findings outside the claims (the objective lane).**
- **ScrollSpy compares `offsetTop` across offset parents.** Bootstrap's `scrollspy.js` makes the same comparison, so this is parity. J-ORACLE-GATE adds the witness as a scenario (`units/j-oracle-census-0925.md`).
- **A smooth scroll still pending at `destroy()`.** Ruled no defect. The scroll is a request the platform already holds, and the engine makes no write after destruction, which the existing case `restores every link it wrote on destruction, keeping consumer edits, and observes and writes nothing more` proves. `ScrollSpyInterface` promises no cancellation of a requested scroll, and Bootstrap cancels none.
- **A nested toggle from a toggle listener.** No defect found. Round 3 adds the case.

**Carried.** Claims 3 and 7 and the nested-toggle case go to `units/j-concerns-a-brief-3.md`, their one carrier.

VERDICT: FAIL 3, 7 — round 3 (`units/j-concerns-a-brief-3.md`)

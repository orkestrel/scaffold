# J-MOTION-PROOFS-B rounds 1 and 2 — audit verdict (2026-09-25)

**Subject.** Veneer `fd82ae9` on `unit/motion-proofs-b` over `1290162`. The claims are `units/j-motion-proofs-b-audit-claims.md`, and the replay is `units/j-motion-proofs-b-replay-2.log.txt`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra (`units/j-motion-proofs-b-audit-objective-verdict.md`): `VERDICT: FAIL 2, 7, 8, 9`. Opus 5.5 wrote both rounds, so this lane is the cross-engine auditor.
- **Subjective:** `reviewer` on Opus 5.5 (`units/j-motion-proofs-b-audit-reviewer-verdict.md`): `VERDICT: FAIL 1 9`.
- **Checker:** not run. The replay classifies every mutation's error mechanically.

**Rulings.**
- **Claim 1: FAIL** (subjective lane). `Toast.test.ts` asserts `expect(animation).toBeInstanceOf(CSSTransition)`, which pins the kind of motion the cascade ships. The Orchestrator confirmed the line at `fd82ae9`. The objective lane confirmed the rest of the claim and missed this line. Round 3 deletes it.
- **Claim 2: not a defect; the claim's wording was the Orchestrator's error.** Carousel reads its motions when the call returns, not through an observer. Every write that starts its motion runs before the slide's only await, and the running count at `slid` catches any motion a completion write starts. The subjective lane ruled the shape correct. The objective lane confirmed that `r2-carousel-yield` reddens every completion case by an assertion.
- **Claim 3, 4, 5, 6, and 10: CONFIRMED.** For claim 5, the objective lane named every collateral non-assertion failure: `Error: No transition` under the skip rows, and `AbortError` under the yield rows. In each row the named proof fails by an `AssertionError`.
- **Claim 7: ruled by an E32 amendment.** The lanes split. The objective lane read E32's amendment as binding Tab and Carousel without exempting feedback. The subjective lane ruled the exemption fits the design. The Orchestrator rules for the exemption, on Bootstrap 5.3.8's own completion:
  - its tab waits on the pane's transition;
  - its carousel waits on the active item's.
  - Neither waits on a nav link or an indicator.

  E32 is amended accordingly.
- **Claim 8: FAIL** (objective lane). `Tab.test.ts` has no case under `stageMedia({ motion: false })`; its zero-factor case changes a custom property instead. Round 3 adds the case.
- **Claim 9: FAIL on three sentences.**
  - The § Toast `shown` row reads "After the fade in the `transition` token's removal starts". That is false for `animated: false`, and it drops the helper word "that" (subjective lane).
  - Toast's class remarks and § Toast say a call reads its identity "after each write, dispatch, and await". After its completed event, a call reads only its lifetime (objective lane).
  - The same sentence stands in `Alert.ts`, `Collapse.ts`, `Modal.ts`, `Offcanvas.ts`, and `Tab.ts`, and in five guide sections. That sentence is one cross-engine finding with one carrier per engine, below. Round 3 corrects Toast's copies.

**Referrals and findings outside the claims.**
- **`animated: false` over markup `fade`** (subjective referral 1): not a defect. With `animation: false`, Bootstrap's toast completes without waiting on any transition, and Veneer's `animated: false` means the same.
- **Toast restores a `fade` token it never changed** when `animated` is `false` (objective lane, from source): this is E35's class, S5 T10. Its carrier is J-RELEASE-RECORD, which removes Toast's call-start `#save` with its `recordHostWrite` conversion.
- **The motion watcher is copied inline** across `Toast`, `Collapse`, `Tab`, and `Modal`, the completion tuple across all four, and the `playState` filter across eight files (subjective lane). Its carrier is a new unit, J-MOTION-RECORDER:
  - one motion recorder and an end-time leaf in `tests/setupBrowser.ts`, proved in `tests/setupBrowser.test.ts`, with every motion test file converted;
  - it runs after J-ORACLE-FIX-OFFCANVAS lands, because that unit owns `Offcanvas.test.ts`, and before J-MOTION-PROOFS-C;
  - it also rules the subjective lane's referral 2, a motion that starts and is cancelled inside one synchronous batch the observer reads once.
- **The identity sentence in the other engines.** Its carriers are the J-RELEASE family units that own each engine: J-RELEASE-RECORD for `Collapse` and `Tab`, J-RELEASE-SIGNALS for `Alert`, and J-OVERLAYS for `Modal` and `Offcanvas`. Each corrects its engines' remarks and guide sections.
- **The naming.** The duration read under the shipped cascade is named `released` in `Toast.test.ts` and `Tab.test.ts`, and `shipped` in `Carousel.test.ts`. The two factor cases also rely on the shipped factor being 1. Round 3 renames the reading `shipped` and sets both factors in the case.
- **Helper words** in `Toast.ts`, `Carousel.ts`, `Toast.test.ts`, and § Toast (subjective lane § Design-fit defects, item 3): round 3.

VERDICT: FAIL 1, 8, 9

# J-MOTION-PROOFS-B round 3 — audit verdict (2026-09-25)

**Subject.** Veneer `dfd9204` on `unit/motion-proofs-b` over `fd82ae9`. The claims are `units/j-motion-proofs-b-audit-claims-3.md`, and the replay is `units/j-motion-proofs-b-replay-3.log.txt`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra (`units/j-motion-proofs-b-audit-3-objective-verdict.md`): `VERDICT: PASS`. Opus 5.5 wrote the round, so this lane is the cross-engine auditor.
- **Subjective:** not run. The round applied the subjective lane's round-1 and round-2 wording as it prescribed. The objective lane read each changed sentence against the code and confirmed it.
- **Checker:** not run.

**Rulings.**
- **Claims 1 to 6: CONFIRMED.**
  - The motion-type pin is gone.
  - The Tab reduced-motion case binds: its mutation alone reddens it, by an assertion.
  - The factor cases set both factors, and a planted shipped factor of 2 reddens only the `fd82ae9` proofs.
  - The Toast prose holds in both `animated` modes.
  - The helper words are fixed, and only the claimed paths changed.
- **Outside the claims.** The Toast token restored without a change is E35's S5 T10, carried by J-RELEASE-RECORD.

**The unit closes.** Rounds 1 to 3 convert the Collapse, Toast, Tab, and Carousel proofs to E32. Along the way they fix Toast's `shown` during the fade in and Carousel's `slid` before the outgoing motion. J-MOTION-PROOFS-B lands after J-SAMEWAY-ENGINES-B's landing, merging `main` by hunk. Its landing chain runs `npm run test:app` by the landing rule for a unit that changes an engine's completion timing. After it lands, the styles session's E-ID-MOTION units on Collapse, Toast, Tab, and Carousel can land.

VERDICT: PASS

# J-RELEASE-CORE round 1 — audit verdict (2026-09-25)

**Subject.** Veneer `d702bb8` on `unit/release-core` over `63eabbd`. The claims are `units/j-release-core-audit-claims.md`, and the replay is `units/j-release-core-replay-1.log.txt`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra (`units/j-release-core-audit-objective-verdict.md`): `VERDICT: FAIL 1, 3, 4, 8`. Opus 5.5 wrote the round, so this lane is the cross-engine auditor.
- **Subjective:** `reviewer` on Opus 5.5 (`units/j-release-core-audit-reviewer-verdict.md`): `VERDICT: FAIL 3 8`. It ruled claims 2, 3, 8, and 9.
- **Checker:** not run. The replay classifies every mutation's error mechanically.

**Rulings.**
- **Claims 2, 5, 6, 7, and 9: CONFIRMED.** The replay reads every file and gate green. All 16 mutation rows fail a named case by an assertion, with no other error class, and B1 and the nested drain read red at `63eabbd` by assertions.
- **Claim 1: FAIL** (objective lane). `hold` returns `true` for a record the lifetime already holds, before it checks whether destruction has begun. So a caller that holds before a take can take again after destruction began. Round 2 returns `false` for every record once destruction has begun. E35 is amended.
- **Claim 3: FAIL** (both lanes). A child that joined through its owner's signal and is then destroyed directly stays in the owner's ledger. Once `Modal`, `Offcanvas`, `Dropdown`, and `Tooltip` adopt `join`, each show-and-hide cycle would leave a dead holding behind.
  - The Orchestrator rules for the subjective lane's shape: `join` ends the owner's holding when the child's own lifetime ends, so no adopter needs a rule.
  - Round 2 builds it. The objective lane's two orderings must be proved: the owner draining the child's release, and a child destroyed inside its own construction.
  - E35 is amended.
- **Claim 4: FAIL** (objective lane) as a letter defect. The code keeps E25's takeover rule: a no-change write joins a record that a restoration still has to write back. Without that join, the restoration writes the earliest value over the state of an engine constructed inside it, which the existing Button case pins. E35's narrowing named only a live holder, so E35 is amended to name the pending restoration too. The code stays.
- **Claim 8: FAIL.** The false or incomplete sentences:
  - `hold`'s remarks, which follow claim 1;
  - three sentences that say every class joins, where only `Button` does: § Ownership and restoration, `LifetimeInterface.signal`, and the `Lifetime` class remarks;
  - the guide stating author obligations as facts, where they need `must`;
  - one four-idea sentence in the save paragraph;
  - two test titles and two uses of `once`.

  The subjective lane gives each correction.

**Outside the claims.**
- **`Button` joins its owner after it reads consumer hooks** (objective lane, from source). A `destroy` of the owner inside an `on` getter returns before the button is reachable. E35 is amended so that a class joins right after its claim, before any consumer code. Round 2 moves the join, with the lane's input as a red-first case.
- **The replay row `button-snapshot-held` counted 34 failures and 16 assertion lines** (subjective referral). The runner logs one assertion line per failure block, so the count does not show 18 failures of another class. Round 2 re-runs the row and classifies all 34.

**Successor.** Round 2, `units/j-release-core-brief-2.md`.

VERDICT: FAIL 1, 3, 4, 8

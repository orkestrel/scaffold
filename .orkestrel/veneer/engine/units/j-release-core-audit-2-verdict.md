# J-RELEASE-CORE round 2 — audit verdict (2026-09-25)

**Subject.** Veneer `03526bc` on `unit/release-core` over `d702bb8`. The claims are `units/j-release-core-audit-claims-2.md`, and the replay is `units/j-release-core-replay-2.log.txt`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra (`units/j-release-core-audit-2-objective-verdict.md`): `VERDICT: FAIL 5`. Opus 5.5 wrote the round, so this lane is the cross-engine auditor.
- **Subjective:** not run. The round applied the subjective lane's round-1 prescriptions: `join`'s shape, the prose items, and the titles. It added no name or type.
- **Checker:** not run.

**Rulings.**
- **Claims 1 to 4 and 6: CONFIRMED.**
  - `hold` returns `false` for every record after destruction began.
  - `join` ends the owner's holding in both orderings and across repeated cycles, and `Button` joins before its hooks.
  - All 20 mutation rows fail by assertion.
  - `button-snapshot-held`'s 38 failures are all assertions, which settles round 1's referral.
- **Claim 5: FAIL.** The child-lifetime release runs inside an `abort` event listener. The DOM reports a listener's exception to the global object and does not propagate it. So a joined child whose own release throws loses that error, and both the child's and the owner's destruction return normally. The guide and `LifetimeInterface.destroy` promise that the drain rethrows the first error. The lane's input: join a child `Lifetime` to an owner, hold a throwing release in the child, and destroy the owner.
- **Claim 7: CONFIRMED as a reachable residue.** No shipped constructor reaches it, but the exported `join` called with a child lifetime that already ended enrolls that child in the owner, where it stays.

**The seam.** This is the second round at `join`'s membership, and round 3 must close it. Both defects come from the membership release living in an event listener. Round 3 removes the listener. The prescription is the Orchestrator's:
- `join` enrolls, as a holding in the child's own lifetime, a release that ends the owner's holding of the child without running that holding's release.
- The ending is a private method of `Lifetime`, which the static `join` reaches on a `Lifetime` owner.
- That holding is the child lifetime's oldest, so it runs last in the child's drain, after every other holding is given back. A nested owner drain before it still reaches the child.
- It throws nothing and runs no release, so errors propagate on the ordinary drain path.
- A child lifetime that already ended gets `false` from `hold`, which runs the ending at once, so the owner keeps nothing.

The prescription departs from the lane's text, so round 3 takes a cross-engine audit.

**Successor.** Round 3, `units/j-release-core-brief-3.md`.

VERDICT: FAIL 5

# J-RELEASE-CORE round 4 — close verdict (2026-09-25)

**Subject.** Veneer `unit/release-core` round 4 over `8b4e9d6`, with the brief `units/j-release-core-brief-4.md` and the diff `units/j-release-core-4.diff`.

**How it closes.** Round 4 adopts round 3's objective-lane correction as written (`units/j-release-core-audit-3-verdict.md`), so it closes without a fresh round (`.claude/rules/quality.md` § Rounds and verdicts). Lanes not run: a remark-only edit leaves nothing for a lane to rule that the check settles.

**The check.**
- Every changed line in the diff is a TSDoc comment line in `src/browser/Lifetime.ts`.
- The remark carries the three sentences the brief gave.
- The builder's `lint:check`, `format:check`, and `test:guides` exit 0.
- The guide's sentence states only the later-abort case, and it is true as written.

**The unit closes.** J-RELEASE-CORE lands the following:
- `Lifetime`, with a drain on every call that reaches nested destructions, the enrollment rule, and a joined class's membership that ends through its drain;
- `HostSnapshot.write`, with its change-aware save and E25's narrowed join;
- `matchesHostValue`;
- `Button` as the first consumer.

Its rounds are `d702bb8`, `03526bc`, `8b4e9d6`, and round 4. Its verdicts are `units/j-release-core-audit-verdict.md` and `-audit-2-verdict.md` to `-audit-4-verdict.md`.

VERDICT: PASS

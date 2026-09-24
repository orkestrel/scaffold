These sections are identical between ff-3.diff and ff-4.diff — confirming integration.test.ts carries no round-4 delta. The round-4 delta is confined to the two `setup.ts`/`setup.test.ts` sections shown earlier, which contain no `any`, `as`, `!`, suppression, nested function, or mock.

## Verdict

**Claim 1 — CONFIRMED.**
The row exists exactly as described in `/home/user/veneer-ff/tests/setup.ts:2649-2654` (`shadow: 'color(srgb 0.1 0.2 0.3) 0px 0px 0px -3px'`, `width: '1px'`, `offset: '-4px'`, `reach: 0`), inside `RING_WORN_CASES`, whose `RingWornCase` interface now carries `offset` (`tests/setup.ts:2578-2586`). The worn-pair proof reads `ring.offset` at `/home/user/veneer-ff/tests/setup.test.ts:245`. The red log `.orkestrel/veneer/units/ff-instruments/ff-mut4-no-zero-clamp.log.txt:33-58` shows `tests/setup.test.ts > shared setup > reads the larger of a ring shadow and an outline worn together` failing with `[3, 5, -3]` vs expected `[3, 5, +0]` and `Tests 1 failed | 304 passed (305)`. The green log `.orkestrel/veneer/units/ff-instruments/ff-4-gate-setup.log.txt:31-36` shows `Tests 305 passed (305)` and `exit 0`.

**Claim 2 — CONFIRMED.**
`ff-4-status.txt:1-3` lists exactly `tests/app/browser/integration.test.ts`, `tests/setup.test.ts`, and `tests/setup.ts`, matching the report's claim (`b-focus-frame-report-4.md:8`) and the brief's owned scope (`b-focus-frame-brief-4.md`, resumed worktree). Diffing `ff-4.diff` against `ff-3.diff` isolates the round-4 delta to: `tests/setup.ts` (the `offset` field on `RingWornCase`, its TSDoc, the third `RING_WORN_CASES` row, and a comment edit — `ff-4.diff:1901-1978`) and `tests/setup.test.ts` (reading `ring.offset` instead of a literal `'0px'` — `ff-4.diff:1752-1766`). The `integration.test.ts` diff section (`ff-4.diff` lines 1-1681) is byte-identical to `ff-3.diff`'s same section, so it carries no round-4 change. The round-4 delta contains no `any`, no `as` (beyond the pre-existing `as const` on the painted/suppressed tuple literal, unchanged from round 3), no `!`, no lint-suppression comment, no nested function declaration, and no mock/spy/fake.

No findings outside the claims.

VERDICT: PASS; outside the claims: none.

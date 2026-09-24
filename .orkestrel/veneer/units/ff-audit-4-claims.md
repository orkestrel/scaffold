# Audit claims — FOCUS-FRAME (`ff`), round 4

Subject: FOCUS-FRAME round 4 — `ff-4.diff` and `ff-4-status.txt` (the worktree `/home/user/veneer-ff` against `e4a6d7c`,
all rounds), the report `b-focus-frame-report-4.md`, and `ff-instruments/ff-mut4-no-zero-clamp.log.txt` and
`ff-instruments/ff-4-gate-setup.log.txt` — against `b-focus-frame-brief-4.md` and the objective finding in
`ff-audit-3-objective-verdict.md` (claim 1). A lane rules CONFIRMED or BROKEN with `file:line` evidence.

1. **The zero-clamp row.** `RING_WORN_CASES` in `tests/setup.ts` carries a row with the shadow
   `color(srgb 0.1 0.2 0.3) 0px 0px 0px -3px`, a solid 1px outline at a -4px offset, and reach 0; the worn-pair proof in
   `tests/setup.test.ts` reads the row's offset; the red log records the worn-pair case failing with the clamp dropped
   (`-3` against `0`), and the green log records `npm run test:setup` passing.
2. **Scope and law.** `ff-4-status.txt` lists only the three owned files, and the round-4 change adds no `any`, no `as`
   beyond a const assertion, no `!`, no suppression, no nested function, and no mock.

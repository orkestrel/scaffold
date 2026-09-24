# Unit FOCUS-FRAME (`ff`), brief 4 — round 4: the zero-clamp row

## Role and engine

`opus` on Opus 5.5, resumed in `/home/user/veneer-ff` (rounds 1 to 3 uncommitted in place). Briefs 1 to 3 stand for
everything this brief does not change.

## The work

Round 3's audit (`/home/user/scaffold/.orkestrel/veneer/units/ff-audit-3-verdict.md`) found one branch of
`computeRingReach` no row decides: the `0` in the final maximum. Add a `RING_WORN_CASES` row (or the table that holds
combined readings) with the box shadow `color(srgb 0.1 0.2 0.3) 0px 0px 0px -3px`, a solid 1px outline, and an outline
offset of -4px, expecting reach 0. Run red the mutation that drops the `0` from the maximum, and run `npm run test:setup`
green.

## Report

`/home/user/veneer-ff/tmp/units/ff-report-4.md` and the same text as the final message: the row, the red run's command,
exit, and result line, the green run, `ff-4.diff` (all rounds against `e4a6d7c`), and `ff-4-status.txt`. A few lines.

## Execution

A native subagent: perform the assignment directly and spawn nothing. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`.

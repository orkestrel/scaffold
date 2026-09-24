# Unit FOCUS-FRAME (`ff`), brief 3 — round 3: two proof rows, one run, one name

## Role and engine

`opus` on Opus 5.5, the native subagent that ran rounds 1 and 2, resumed in `/home/user/veneer-ff` (branch `unit/ff`
from `e4a6d7c`, rounds 1 and 2 uncommitted in place). Briefs 1 and 2 stand for everything this brief does not change.

## What changed and why

Round 2's audit (`/home/user/scaffold/.orkestrel/veneer/units/ff-audit-2-verdict.md`) confirmed the guard, the watcher,
the drive readings, and the law, and found two branches of `computeRingReach` no row decides and one control run
predicted but never run. The user put implementation first: this round is those items and a short report.

## The work

1. **The horizontal offset (claim 3).** Add a `RING_SHADOW_CASES` row whose horizontal offset dominates and is negative
   (`rgb(0, 0, 0) -5px 2px 3px 1px`, reach 9), and run red each mutation that drops the horizontal term (the vertical
   magnitude alone; the horizontal absolute value dropped).
2. **The `none` branch (claim 3).** Delete the `shadow === 'none'` branch, which decides no row, and run `npm run
   test:setup` green.
3. **The list-group control (claim 2).** Run the list-group case at `dark-1280` with its suppressed state painting the
   outline, and retain the red run.
4. **GUARD-TERM.** Name the pixel check for the outline reading: `tmp/capture/outline/painted` and
   `tmp/capture/outline/suppressed`, and a local name that is not "guard".
5. **SETUP-FOCUS-UNIVERSAL.** Restrict the `tests/setup.ts` TSDoc that says every focus frame uses a padded wrapper to
   the converted scenarios.

## Testing

`npm run test:setup`, the journey filtered with `-t` to the skip-link and list-group cases at `journey:dark-1280*`
with `CAPTURE=1`, `npm run check`, `npm run lint:check`, and the formatter check on the changed files.

## Report

`/home/user/veneer-ff/tmp/units/ff-report-3.md` and the same text as the final message: the change per item, each red
run, each gate's command with its exit and result line, `ff-mutations-3.log.txt`, `ff-3.diff` (all rounds against
`e4a6d7c`), and `ff-3-status.txt`. Keep it short.

## Execution

A native subagent: perform the assignment directly and spawn nothing. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`.

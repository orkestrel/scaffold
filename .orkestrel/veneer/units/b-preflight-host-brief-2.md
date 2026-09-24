# Unit PREFLIGHT-HOST (`pl`), brief 2 — round 2: coverage, the dimension key, and the control

## Role and engine

`opus` on Opus 5.5, the native subagent that ran round 1, resumed in `/home/user/veneer-pl` (branch `unit/pl` from
`fc3ddfe`, round 1 uncommitted in place). `b-preflight-host-brief.md` stands for everything this brief does not change.

## What changed and why

Round 1's audit (`/home/user/scaffold/.orkestrel/veneer/units/pl-audit-verdict.md`, the lane verdicts beside it) confirmed
the emulation and every mutation and broke the comparison's coverage, the dimension type, and three guide sentences.
The user put implementation first: code and proofs in full, prose as one plain true sentence per site, a short report.

## The work, implementation first

1. **Coverage (claim 3).** Read every longhand Veneer's elements layer declares for each tag the pairing mounts, apart
   from the reset's movement population, and assert each keeps its standalone value under the profile; the table
   `caption-side` in `_table.scss` is the known case the round-1 proof missed. Run red the mutation that makes one such
   declaration lose to the profile (or drops it from the reading), and retain it.
2. **The dimension key (R5, claim 6).** Declare one exported `PreflightDimension` type beside `PreflightDeparture`,
   key each dimension to the tags it applies to (the form controls), type `PREFLIGHT_DIMENSIONS` and the
   `computeContentExtent` parameter with it, and call the slot `dimension` everywhere. A `height` move on another tag
   (the reset's `height: auto` on `img` and `video`) is recorded or refused, never exempted; show it by a run.
3. **The control (R4).** Run the staging as `@layer base.defaults`. If the control stays green, make the control assert
   that the staging sits beneath the whole cascade (a Veneer elements-layer declaration beats a staged value on the same
   property), and run both mutations red.
4. **The title (claim 3).** Retitle the case to what it proves, and label the staged row as staged Chromium 153 defaults
   in the case and control titles.
5. **The guide (claim 7, R1).** Adopt the subjective lane's sentences: every measured move other than a height is a row;
   the proof passes under the host defaults and under the staged stand-in, which fixes the `select` content box at 21px,
   so the proof does not measure that height on Chromium 153; a `table` border color resolves to the text color; one term,
   "content box height"; and the tab size moves because the `html` rule declares it and every element inherits it.
6. **The service reading (R3).** Re-run `npm run test:service` once on the round-2 tree in the scratch copy with the patch.

## Report

`/home/user/veneer-pl/tmp/units/pl-report-2.md` and the same text as the final message: the change per item, each red
run, each gate's command with its exit and result line, `pl-mutations-2.log.txt`, `pl-shared-2.patch` superseding
`pl-shared.patch` whole, `pl-2.diff` (both rounds against `fc3ddfe`), and `pl-2-status.txt`. Keep it short.

## Execution

A native subagent: perform the assignment directly and spawn nothing. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`.

## Acceptance criteria

1. The formatter check over the owned files, `npm run lint:check`, and `npm run check` exit 0, each log printing its exit.
2. The preflight proof exits 0 under both rows and reddens on the item-1, item-2, and item-3 mutations.
3. `npm run test:guides` and `npm run test:service` exit 0 in the scratch copy with `pl-shared-2.patch` applied.

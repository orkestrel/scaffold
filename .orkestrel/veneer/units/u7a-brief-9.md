# Unit U7a — fix round brief 9: the contrast floor is the light role's; the round continues

## What changed and why

This brief supersedes `u7a-brief-8.md`; that brief stands except for finding 2's
floor, and `u7a-report-8.md` is the baseline: findings 9 (reverted), 6, and 7 are
closed in the working tree beside 3 and 5, and the unit stopped on finding 2 because the brief
asked every role in every mode to meet 4.5:1 while the calibrated dark fills (Elements' measured
values, for example dark primary `oklch(0.7 0.15 233)` under white text at 2.59:1) cannot; the
`light` role's black foreground made every light-role state pass in both modes. The floor was the
Orchestrator's over-reach; the reviewer's finding named the `light` role alone.

Ruling: the 4.5:1 floor applies to the `light` role (filled rest, hover, active; outline hover,
active) in both modes. Every other role's ratios are pinned at their measured values (the table
in report 8) with `toBeCloseTo(…, 2)`, so a regression of the calibrated fills reads; no
calibrated fill or foreground changes for them. The dark fills' contrast is recorded for the
user as a design question outside this unit.

## Findings carried

- Finding 2, narrowed: re-apply the `light` role's foreground as Bootstrap binds it (`#000`
  through `var(--vn-palette-black-base)`) for filled rest, hover, active, and disabled, and for
  outline-light hover and active; update the binding rows the guide's table carries for those
  properties; keep `BUTTON_CONTRAST_CASES` and its browser assertions, with the `light` role at
  the 4.5 floor and every other role pinned at its measured ratio per state and mode (the
  values report 8 tabulates, plus the exact ratios of the states that passed, read from the
  run). Red first on `light` (the reverted tree reads 1.05:1), green after.
- Findings 4, 8, 1 of `u7a-brief-7.md`, unchanged, in that order.
- Findings 3, 5, 9, 6, 7 stay as reports 7 and 8 left them; do not touch them again.

## Role, engine, law, context, host, unknowns, output, scope, controls, deviation contract

As in `u7a-brief-8.md`, verbatim (including the reversion clause). `HEAD` is
`2bc922d`; the working tree carries the brief-8 tree, uncommitted. Continue from it; do not
restore or reset anything.

## Execution

Finding 2 first (red on `light`, green after), then 4, 8, 1, running `npm.cmd run
test:src:styles` after each; then `PLANT-LIGHT` and `PLANT-CHECK`; then record every gate brief
7 lists and the cascade's SHA-256.

## Output

Write `u7a-report-9.md` and return its content: per finding, the change and its
red-then-green pair (command and counts); the contrast table per role, state, and mode with the
exact ratios; the controls' red readings and restore proofs; each gate's final lines; the
digest; the actual `git diff --stat` and `git status --porcelain --untracked-files=all`. Do not
repeat reports 5 to 8.

## Acceptance criteria

As in brief 7, with finding 2 read under the ruling: the `light` role meets the floor in both
modes; the other roles are pinned at their measured ratios; every gate exits 0 on Chromium and
Edge; the controls reddened and are restored; the status shows only the owned set and the
report.

## Review evidence

The actual `git diff` and `git status` at return; this report with reports 5 to 8.

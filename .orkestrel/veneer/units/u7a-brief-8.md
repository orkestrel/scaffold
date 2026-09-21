# Unit U7a — fix round brief 8: finding 9 reverted on measurement; the round continues

## What changed and why

This brief supersedes `u7a-brief-7.md`; that brief stands except for finding 9, and
`u7a-report-7.md` is the baseline: findings 3 and 5 are closed in the working tree,
and the unit stopped on finding 9 because binding the light mixer to `var(--vn-text-body-base)`
fails every light-mode calibration proof (eleven cases). The measurement refutes the finding's
premise: the calibrated light endpoint `color(srgb 0.00742457 0.0232852 0.0925134)` is not the
text token's sRGB rendering. Ruling: the literal endpoint stays, as the calibration's measured
value; finding 9 is closed as refuted by the run.

## Findings carried

- Finding 9: revert. Restore the light map entry `'state-mixer': 'color(srgb 0.00742457
  0.0232852 0.0925134)'` in `src/styles/_tokens.scss`, delete the case `retunes the light
  interaction tints with the body text token` and any table row it added, and run
  `npm.cmd run test:src:styles` green (the eleven calibration cases pass again). Record the
  refutation with the log `tmp/u7a/step-9-after-7.log` in the report.
- Findings 6, 7, 2, 4, 8, 1 of `u7a-brief-7.md`, unchanged, in that order.
- Findings 3 and 5 stay closed as report 7 left them; do not touch them again.

## Role, engine, law, context, host, unknowns, output, scope, controls, deviation contract

As in `u7a-brief-7.md`, verbatim. `HEAD` is `2bc922d`; the working tree carries the
brief-7 tree, uncommitted. Continue from it; do not restore or reset anything. The deviation
contract's stop on "a gate red after your own fix" applies after you have read the red: where a
calibration case reddens on a change a finding asked for, the finding's premise is what is
wrong — revert that one change, record the reading, and continue with the next finding; stop
only when a red survives the reversion.

## Execution

Finding 9's reversion first (green), then 6, 7, 2, 4, 8, 1, running `npm.cmd run
test:src:styles` after each; then `PLANT-LIGHT` and `PLANT-CHECK`; then record every gate brief
7 lists and the cascade's SHA-256.

## Output

Write `u7a-report-8.md` and return its content: per finding, the change and its
red-then-green pair (command and counts), with finding 9's refutation reading; the light role's
text token and the contrast readings per role and mode; the controls' red readings and restore
proofs; each gate's final lines; the digest; the actual `git diff --stat` and `git status
--porcelain --untracked-files=all`. Do not repeat reports 5, 6, and 7.

## Acceptance criteria

As in brief 7, with finding 9 closed by reversion instead of by change.

## Review evidence

The actual `git diff` and `git status` at return; this report with reports 5, 6, and 7.

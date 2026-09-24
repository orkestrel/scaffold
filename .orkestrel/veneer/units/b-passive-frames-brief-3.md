# Unit PASSIVE-FRAMES (`fp`), brief 3 — round 3: one assertion and two sentences

## Role and engine

`opus` on Opus 5.5, the native subagent that ran rounds 1 and 2, resumed in `/home/user/veneer-fp` (branch `unit/fp`
from `cf5e447`, rounds 1 and 2 uncommitted in place). Briefs 1 and 2 stand for everything this brief does not change.

## What changed and why

Round 2's audit (`/home/user/scaffold/.orkestrel/veneer/units/fp-audit-2-verdict.md`) confirmed every claim but the
disabled check's assertion, and accepted the report defects on the record. The user put implementation first: keep this
round to the three items below and a short report.

## The work

1. **The disabled check (claim 4).** In `ButtonGroupSection.test.ts`, assert that each disabled-forms host carries
   exactly one variant class before asserting the hosts share it. Run red the mutation that gives every host
   `btn-primary btn-secondary`, and retain the log.
2. **The bar (F-B).** Make the `DRIVEN_CONTRAST` TSDoc and its case comment state what the bar is: a luminance ratio
   against the row's rest fill, set above the unphotographed presses and below the photographed fills the report
   measured. Remove the audit history and the perceptual claim.
3. **The guide (R-B).** In `fp-shared-3.patch` (superseding `fp-shared-2.patch` whole), name the mode-token pattern
   without backticking the `MODE_TOKEN` constant, which is not a public export.

## Testing

`ButtonGroupSection.test.ts` scoped, `npm run check`, `npm run lint:check`, the formatter check on the changed files,
and `npm run test:guides` in a scratch copy with the patch applied.

## Report

`/home/user/veneer-fp/tmp/units/fp-report-3.md` and the same text as the final message: the change per item, the
red run, each gate's command as it ran with its exit and result line, `fp-3.diff` (all rounds against `cf5e447`),
`fp-3-status.txt`, and `fp-shared-3.patch`. No tally of a growable set and no temporal word.

## Execution

A native subagent: perform the assignment directly and spawn nothing. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`.

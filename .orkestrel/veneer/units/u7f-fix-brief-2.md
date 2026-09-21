# Unit U7f-fix — brief 2: the audit's test-sufficiency findings

## What changed and why

This brief supersedes `u7f-fix-brief.md`; that brief stands, and
`u7f-fix-report.md` is the baseline. The audit round on the fix (claims
`../u7f-fix-audit-claims.md`) confirmed the three landed changes and the frames (the
regenerated element frames decode to the settled fills) and found that three of the proofs do
not bind to the defects they claim. Audits cover implementation only by the user's ruling: make
no wording, comment, or guide-prose change beyond what a code change requires.

## Findings carried

1. (analyst 2) `tests/app/browser/integration.test.ts`, the hover placement (about lines
   426 to 446): after `PORTFOLIO.place`, the case releases the pane and re-hovers the host
   before it reads `restored` and `framed`, so the equality `restored` equals `settled` checks
   the state re-established after the capture, and a capture that loses hover escapes it. Take
   the deciding readings (`host.matches(':hover')` and the host's `background-color`) straight
   after the placement, before `releasePane()` and before any re-hover, and assert them there;
   re-hover only for what follows. A capture that loses hover must red on those readings.
2. (analyst 3) `tests/app/browser/integration.test.ts`, the `portfolio` case `records the
   toggle host as pressed at the moment its frame was shot` (about line 634): the arrival-record
   predicate `entry.includes('button "Toggle"')` also matches the focus inventory line
   `25. button "Toggle"`, so a replay with the arrival tree removed, or replaced by the pressed
   tree, still passes. Identify the arrival tree by a property only a tree carries (its
   `region "Buttons"` line, for example) together with the absence of the pressed suffix, so
   the case reds when the arrival tree is missing or replaced and stays green with both records
   present.
3. (analyst 6) `tests/app/browser/integration.test.ts`, the `afterEach` teardown (about line
   111): a failure after `stagePane` and before the placement leaves the pane staged for the
   following cases, because the teardown releases the pointer and the media only. Add
   `releasePane()` to the independently attempted releases (the installed helper requires the
   paired release; a release with nothing staged must be harmless, read its declaration).
4. (reviewer 8) `tests/app/browser/integration.test.ts`, the mode-switch journey (about lines
   156 to 164): `PORTFOLIO.place('home-dark')` is taken straight after the click on `Dark mode`
   with the pointer still resting on the control, so both `home-dark` frames carry the
   published bare-button hover mix while the `home` frames, shot at arrival, do not; a reader
   comparing the two reads the hover fill as a mode difference. Release the pointer before
   placing `home-dark`, assert the control does not match `:hover` at the shot, and keep the
   restoring click after.
5. (reviewer referral) `tests/app/browser/Showcase.test.ts`: the `header button` rule's safety
   rests on an invariant nothing asserts. Add to the existing region case the assertion that
   the header holds the mode control and no other button, and that every region (`Showcase`,
   `Buttons`) sits inside `main`, so a `.btn` specimen landing in the header would red.

## Role, engine, law, context, host, unknowns, deviation contract

As in `u7f-fix-brief.md`, verbatim. `HEAD` is `7f6d5f6`; the working tree carries the
complete brief-1 result, uncommitted. Continue from it; do not restore or reset anything.
Perform the assignment directly and spawn nothing.

## Scope

Owned: `tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`, and
`u7f-fix-report-2.md`. Every other file is off-limits this round.

## Execution

1. Items 3, 5, 4, 2, then 1. For item 2 record the red by reasoning from the predicate's shape
   over the retained artifact entries (a plant is not needed: the analyst's replay is the red);
   for item 1 record the red by reasoning from the reading's position (a capture that loses
   hover reads the rest fill at the deciding reading); for item 4 record the control's `:hover`
   reading at the shot before and after.
2. Run and record: `npm run format:check`, `npm run lint:check`, `npm run check`,
   `npm run test:app:browser`, `npm run test:journey`, `npm test`,
   `PLAYWRIGHT_CHANNEL=msedge npm run test:app:browser`,
   `PLAYWRIGHT_CHANNEL=msedge npm run test:journey`, and last of all
   `CAPTURE=1 npm run test:journey`, so the portfolio and the per-variant artifacts (which
   every journey run rewrites, and only a capture run fills with frame paths) are in step when
   you return; confirm each `tmp/capture/<variant>.txt` ends with its frame paths and say so.

## Output

Write `u7f-fix-report-2.md` in the Veneer checkout and return it: per finding, the
change as landed with its site and the reasoning for its red; each gate's exit code and final
lines on both engines; the actual `git diff --stat` and
`git status --porcelain --untracked-files=all`. Do not repeat report 1.

## Acceptance criteria

1. Findings 1 to 3 are closed at their sites with the assertion that pins each.
2. Every gate in Execution item 2 exits 0 on managed Chromium and Edge; the `CAPTURE=1` run
   regenerates the portfolio.
3. The status shows brief 1's three owned files and the reports.

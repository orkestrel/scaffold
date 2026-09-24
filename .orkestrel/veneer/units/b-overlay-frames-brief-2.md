# Unit OVERLAY-FRAMES (`fo`), brief 2 — round 2: the audit's findings

## Role and engine

`opus` on Opus 5.5, the native subagent that ran round 1, resumed in the worktree `/home/user/veneer-fo`
(branch `unit/fo` from `cf5e447`, round 1's changes uncommitted in place). `b-overlay-frames-brief.md` stands for
everything this brief does not change.

## What changed and why

Round 1's audit (`/home/user/scaffold/.orkestrel/veneer/units/fo-audit-verdict.md`, with the three lane verdicts
beside it) confirmed P11, P12, the next control, the roleless alert, and the frames, narrowed the header-strip
wording, and ruled the report broken. This round carries every finding the verdict gives OVERLAY-FRAMES.

## The work, implementation first

1. **The dark captioned carousel.** In dark mode the theme paints the captioned carousel's caption, pips, and
   chevrons black over its dark pictures (`captioned-carousel--dark-390.png`, mark strength 32). The release's dark
   carousel paints dark marks because it expects light imagery. Give the carousel specimens pictures the marks read
   against in each mode, the way the release's markup pairs its dark carousel with light pictures, and prove the
   caption's contrast against its picture in both modes; or, if the specimens must keep their pictures, record why
   with the reading. Report the resting and driven chevron strengths at `dark-390` after the change.
2. **P11's final case.** Run the final eight-width spanning case red against the tree without the `w-100` class,
   and run the `picture-own-width` mutation against the final case; retain both logs.
3. **The copy, the title, and the comment.** Drop the strip clause from `POPOVER_COPY`; name the next-control case
   for its subject ("drives the fading carousel's next control to hover and to focus on the lifted specimen, and
   photographs each state"); correct the comment that calls the marks white in every mode and rewrap it to the
   file's comment width.
4. **The strip wording (claim 7).** In the `CASCADE_KEYS` TSDoc, the guide patch, and the report, state the
   mechanism the probe read: the strip paints the header's own fill over the header, with a zero top border, so no
   frame shows it apart from the header. Drop any claim about every magnification.

## Report

A successor report, `/home/user/veneer-fo/tmp/units/fo-report-2.md`, and the same text as the final message, in
brief 1's output shape, over both rounds: each finding with the change that closes it and its proof or reading;
each gate's command exactly as it ran with every argument, its exit, and its result line as the log prints it;
`fo-mutations-2.log.txt`; `fo-shared-2.patch` superseding `fo-shared.patch` whole; `fo-2.diff` (both rounds against
`cf5e447`) and `fo-2-status.txt`. It labels the next-control registry run a post-fix mutation run, names no brief
criterion by its number, and states no tally of a growable set and no temporal word.

## Scope

As brief 1. The picture assets or markup the carousel specimens use are owned where they live in
`app/browser/constants.ts`; a picture file elsewhere is report-only.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Acceptance criteria

Brief 1's criteria over the round-2 tree, plus: the caption contrast proof reddens on the dark-picture mutation in
dark mode, or the report records the reading that keeps the pictures; the final spanning case's red run and
mutation run are retained.

# Unit UTIL-FRAMES (`fu`), brief 2 — round 2: the audit's findings

## Role and engine

`opus` on Opus 5.5, the native subagent that ran round 1, resumed in the worktree `/home/user/veneer-fu`
(branch `unit/fu` from `cf5e447`, round 1's changes uncommitted in place). `b-util-frames-brief.md` stands for
everything this brief does not change.

## What changed and why

Round 1's audit (`/home/user/scaffold/.orkestrel/veneer/units/fu-audit-verdict.md`, with the three lane verdicts
beside it) confirmed scope, the focus rings, the focusable container, the derived populations, and P18, and
ruled claims 2, 7, and 8 broken. FOCUS-FRAME's P2 reading
(`/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report.md` § P2) settles the dark focus cause: after a
pointer press, a scripted `focus()` paints no `auto` outline, and Tab does.

## The work, implementation first

1. **The link states (claim 2).** In the link-state case, assert that the `.link-body-emphasis` link's `color`
   moves from rest under hover and focus, and that each role link's paint does not move (the documented departure
   in § Color utilities). Prove each with a mutation: the emphasis `:hover` and `:focus` block deleted reddens the
   emphasis assertion; a role-link hover color reddens the role assertion.
2. **The frames (claim 7).** Reach the `role-links-focus` link and the `focusable-container-focus` link by Tab from
   the padded wrapper after `releasePointer`, so the dark frames paint the `auto` outline; drive
   `underline-offsets-hover` on the largest hover step the pointer reaches. Read each re-shot frame at `dark-390`
   and `light-1280` and name what it shows.
3. **The populations (claim 8).** Move the property populations the link-state case reads into setup constants, or
   derive them from a table that owns them.
4. **The prose (F1, F2, F3).** Write "These states lie outside the journey's variants" in `tests/setup.ts` and the
   patch, and "which are the conditions the focusable helper answers to" in `app/browser/constants.ts`; name the
   Overflow region in the viewport sentence's clause; add the focusable container to `VISIBILITY_COPY` (granted
   this round).

## Report

A successor report, `/home/user/veneer-fu/tmp/units/fu-report-2.md`, and the same text as the final message, in
brief 1's output shape over both rounds: each finding with the change that closes it and its proof or reading;
each gate's command exactly as it ran with every argument, its exit, and its result line as the log prints it;
`fu-mutations-2.log.txt`; `fu-shared-2.patch` superseding `fu-shared.patch` whole; `fu-2.diff` (both rounds against
`cf5e447`) and `fu-2-status.txt`. No tally of a growable set, no ordinal naming, and no temporal word.

## Scope

As brief 1, plus `VISIBILITY_COPY` in `app/browser/constants.ts`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Acceptance criteria

Brief 1's criteria over the round-2 tree, plus: the emphasis and role-link assertions redden on their mutations;
the dark `role-links-focus` and `focusable-container-focus` frames show the outline.

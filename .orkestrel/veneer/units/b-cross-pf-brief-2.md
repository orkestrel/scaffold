# Unit PAGE-FRAME (`pf`), round 2 — the settle re-read, the pointer guard, one "opening", derived state

## Role and engine

`opus` on Opus 5.5, the same native subagent that wrote round 1, in the worktree `/home/user/veneer-pf`
(branch `unit/pf`, round 1's edits over `dc92a09`).

## What changed and why

Round 1's audit (`/home/user/scaffold/.orkestrel/veneer/units/pf-audit-verdict.md` and the three lane
verdicts beside it) confirmed the bounding, the area guard, the placements, and the captures, and carried
P-a to P-d. Round 1's brief (`b-cross-pf-brief.md`) stands for everything this one does not change.

## Objective

- **P-a — the settle re-read.** The `#settle` method re-reads the content height after staging on every
  path, the viewport-sized one included, and refuses when the re-read disagrees; the refusal message names
  the two readings rather than "never settled". The class remarks and the method comment state exactly what
  the code does. A proof reddens when the viewport-sized branch skips the re-read.
- **P-b — the pointer guard.** Before each pointer-held placement, the case asserts the host sits outside
  the showcase's `main` (a structural guard that an in-place placement fails). Run the un-lift mutation on
  `primary-hover` (the host left in the Buttons section) at `light-1280` with `CAPTURE=1` and retain its
  red run. Rewrite each comment that says the re-read runs "in the layout the shot was taken in": nothing
  above a lifted specimen is taken out of the layout, so the specimen's position is the same at the shot and
  at the re-read.
- **P-c — the prose.** Give "opening" one meaning, the heading and the Dark mode control, everywhere
  (`tests/setup.ts` around line 491 and line 496, the guide patch's paragraph and the arrival sentence, and
  every integration comment), so the arrival frame carries the opening and the Showcase region. Rewrite the
  `check-group-focus` comment that says the frame "covers the page", the comment that states the blank
  element-frame measurement as present (it was measured before a placement bounded the document), each
  `{@link FRAME_AREA}` reference as "the {@link FRAME_AREA} constant", and the bare tokens the subjective
  lane's F4 names.
- **P-d — derived state.** Drop the `#scenarios` field and derive the `scenarios` getter from the recorded
  placements; keep "admitted for placement" in one getter's doc and point the other's at it.

## Context

Law, host, and tools as round 1's brief states. The page-frame design verdict `pf-design-verdict.md` stands.
Each changed or added proof runs red first, and each red run is retained in
`tmp/units/pf-mutations-2.log.txt`. BCF and FADE land after this unit; keep each edit local to its site.

## Scope

As round 1. Return one `pf-shared-2.patch` against `dc92a09` that supersedes `pf-shared.patch` whole.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-pf/tmp/units/pf-report-2.md` and the same text as the final message: each
item's change, with before and after for every rewritten sentence; the red runs, the un-lift mutation's
among them; each gate's command exactly as it ran, its exit, and its result line; `pf-2.diff`,
`pf-2-status.txt`, and `pf-shared-2.patch` under `tmp/units/`. The report states no tally of a growable set
and no temporal word, and follows every code token with a noun, list labels included.

## Deviation contract

As round 1. Decide, record, and carry on for the exact wording of each rewritten sentence and the refusal
message.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:setup` and `npm run test:setup:browser` exit 0, and the P-a proof reddens on its mutation.
3. The un-lift mutation reddens the `primary-hover` case at `light-1280`, and the unmutated capture run at
   `light-1280` passes.
4. `npm run test:guides` exits 0 in a scratch copy under `tmp/probe/` with `pf-shared-2.patch` applied.

**Observations, not criteria.** The capture runs at the other variants are the Orchestrator's at landing.

## Review evidence

`pf-2.diff`, `pf-2-status.txt`, `pf-shared-2.patch`, `pf-report-2.md`, and `pf-mutations-2.log.txt`.

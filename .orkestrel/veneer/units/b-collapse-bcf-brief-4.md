# Unit BCF (`bcf`), round 4 — the navbar's derived infixes and the containment remarks

## Role and engine

`opus` on Opus 5.5, the same native subagent that wrote rounds 1 to 3, in the worktree `/home/user/veneer-bcf`
(branch `unit/bcf`, rounds 2 and 3 uncommitted over `f4e5693`). The executor that opens this brief is that
subagent.

## What changed and why

The rounds 2-3 audit (`/home/user/scaffold/.orkestrel/veneer/units/bcf-audit-2-verdict.md` and the lane
verdicts beside it) confirmed every item but two. The earlier briefs stand for everything this one does not
change.

## Objective

- **B-g (claim 2).** The selector case in `tests/app/browser/sections/NavbarSection.test.ts` expands the
  literal list `['', '-sm', '-md', '-lg', '-xl', '-xxl']`. Derive it from the `BREAKPOINT_INFIXES` constant in
  `tests/setupStyles.ts`, keeping the bare `.navbar-expand` entry, and retain the red run of an infix added at
  the use site, as round 2 did for the dropdown case.
- **B-h (F1).** The `MenuContainment` remarks in `tests/setupBrowser.ts` say a shown menu is positioned out of
  flow and adds nothing to its specimen's box. The `Navbar opened` menu is static and grows its specimen.
  State what holds for both kinds: an out-of-flow menu adds nothing to the box and can reach past it, and an
  in-flow menu grows the box; the helper measures both the same way.

## Context

Law, host, and tools as round 1's brief states; each changed proof runs red first, retained in
`tmp/units/bcf-mutations-4.log.txt`.

## Scope

**Owned.** `tests/app/browser/sections/NavbarSection.test.ts` and the `MenuContainment` remarks in
`tests/setupBrowser.ts`. Everything else as round 3.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-bcf/tmp/units/bcf-report-4.md` and the same text as the final message: each
item's change, the red run, each gate's command with its exit and result line, and `bcf-4.diff` (the whole
diff against `f4e5693`) and `bcf-4-status.txt` under `tmp/units/`. The report states no tally of a growable
set and no temporal word, and follows every code token with a noun.

## Deviation contract

As round 1.

## Acceptance criteria

1. `npx oxfmt --check` over the two files, `npm run lint:check`, and `npm run check` exit 0.
2. The section command of round 2's criterion 3 and `npm run test:setup:browser` exit 0, and the navbar case
   reddens on the added infix.

## Review evidence

`bcf-4.diff`, `bcf-4-status.txt`, `bcf-report-4.md`, and `bcf-mutations-4.log.txt`.

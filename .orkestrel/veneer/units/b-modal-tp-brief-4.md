# Unit TIP (`tp`), round 4 — the prose the rounds 2 and 3 audit ruled (successor of `b-modal-tp-brief-3.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote rounds 1 to 3, continued in the worktree
`/home/user/veneer-tp` (branch `unit/tp` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

`tp-shared-3.patch`'s three false or overstated sentences read true, and nothing else changes: the
verdict is `tp-audit-2-verdict.md`; this brief names the one fix for each finding.

## Context

**Evidence.** The reconciled verdict `/home/user/scaffold/.orkestrel/veneer/units/tp-audit-2-verdict.md`
and its lane verdicts (`tp-audit-2-objective-verdict.md`, `tp-audit-2-checker-verdict.md`); round 3's
record under the same folder (`tp-shared-3.patch`, `b-modal-tp-report-3.md`).

**Law.** As round 1: `AGENTS.md` in the worktree; the scaffold rule files the round-1 brief names; the
mid-campaign notes `w2-w3-note-1.md` and `w2-w3-note-2.md`; the round-1 brief `b-modal-tp-brief.md`,
whose scope, off-limits list, standing conditions, and host facts bind this round unchanged; skill:
none.

**Host.** As round 1. Write every instrument, extract, draft, and log under this worktree's
`tmp/units/` or `tmp/probe/` with the `tp` prefix, and nothing into the session scratchpad.

**Standing conditions.** The validation copy under `tmp/probe/base/` is rebuilt for this round from
`2a3f223`, your owned files, and your revised shared patch; delete it before the report. The stacking
paragraph stays as the base has it; MODAL rewrites it.

## Unknowns

None.

## Scope

**Owned.** Round 1's owned files; no owned file changes this round.

**Shared (report-only).** `app/browser/constants.ts`, `tests/setupStyles.ts`, and `guides/veneer.md`,
at the sites below; return one revised `tp-shared-4.patch` against `2a3f223` that supersedes
`tp-shared-3.patch` whole.

**Off-limits.** As round 1.

**What asserts the state this change ends.** The sentences each fix replaces; `npm run test:guides`
over the guide.

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-tp/tmp/units/tp-report-4.md`: each fix below by its label with the file,
the before and after text, and the reading that proves it; each gate's command written exactly as it
ran, with every argument, and its result line; the revised patch at `tmp/units/tp-shared-4.patch`;
`tp-4-status.txt` and an interdiff of `tp-shared-4.patch` against `tp-shared-3.patch` at
`tmp/units/tp-4-shared-interdiff.txt`. Delivered as that file plus the same text as the final message.
The report follows the writing rule: no count of a growable set (write the members, as in "the Tooltip
and Popover rows"), no list item named by its position, and every code token followed by a noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix cannot be made without
changing what ships beyond the sentence it names. Decide, record, and carry on for re-flowing a
paragraph the fix touches.

## Fixes

- **P7.** In the `POPOVER_SPECIMENS` TSDoc, replace "one per explicit placement" with a sentence that
  names both kinds of specimen without a cardinality claim, such as "a popover at each explicit
  placement and an untitled popover at the bottom placement, in render order".
- **P8.** In the § Popover classes paragraph, replace "sets the `fade` class and the `show` class,
  which no popover rule reads" with "sets the `show` class, and the `fade` class when the popover is
  animated, and no popover rule reads either", matching the Popover `plugin` row.
- **P9.** In the `TIP_ARROW_PROPERTIES` remarks, replace "A reading of every property on the arrow and
  on each of its triangles" with "A reading of each of these properties on the arrow and on each of its
  triangles".
- Sweep every line rounds 1 to 3 added for another sentence that claims more than its proof or its
  source reads, and list what the sweep read.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the rebuilt validation copy: `npm run check`, `tests/setupStyles.test.ts` in the setup project,
   `npm run test:guides`, and `npm run test:policy` exit 0.
3. P7 to P9 are present at their sites.
4. `tp-shared-4.patch` passes `git apply --check` on a fresh extract of `2a3f223`, and it differs from
   `tp-shared-3.patch` only at the P7 to P9 sites, any sweep fix the report names, and their re-flow.

## Review evidence

`tp-4-status.txt`, `tp-shared-4.patch`, `tp-4-shared-interdiff.txt`, and `tp-report-4.md`.

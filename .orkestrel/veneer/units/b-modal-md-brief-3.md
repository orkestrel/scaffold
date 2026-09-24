# Unit MODAL (`md`), round 3 — the prose the round-2 audit ruled (successor of `b-modal-md-brief-2.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote rounds 1 and 2, continued in the worktree
`/home/user/veneer-md` (branch `unit/md` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

Round 2's false and positional sentences read true, and nothing else changes: the verdict is
`md-audit-2-verdict.md`; this brief names the one fix for each finding.

## Context

**Evidence.** The reconciled verdict `/home/user/scaffold/.orkestrel/veneer/units/md-audit-2-verdict.md`
and its lane verdicts (`md-audit-2-objective-verdict.md`, `md-audit-2-checker-verdict.md`); round 2's
record under the same folder (`md-2.diff`, `md-shared-2.patch`, `b-modal-md-report-2.md`,
`md-instruments/`).

**Law.** As round 1: `AGENTS.md` in the worktree; the scaffold rule files the round-1 brief names; the
mid-campaign notes `w2-w3-note-1.md` and `w2-w3-note-2.md`; the round-1 brief `b-modal-md-brief.md`,
whose scope, off-limits list, standing conditions, and host facts bind this round unchanged; skill:
none.

**Host.** As round 1. Write every instrument, extract, draft, and log under this worktree's
`tmp/units/` or `tmp/probe/` with the `md` prefix, and nothing into the session scratchpad.

**Standing conditions.** The validation copy under `tmp/probe/base/` is rebuilt for this round from
`2a3f223`, your owned files, and your revised shared patch; delete it before the report. The fullscreen
rule set stays as round 1 wrote it; RAMP-DOWN collapses it.

## Unknowns

None.

## Scope

**Owned.** Round 1's owned files, at a site the M9 sweep finds only.

**Shared (report-only).** `guides/veneer.md`, `tests/setupStyles.ts` (the `MODAL_SIZE_CASES` TSDoc), and
`tests/setupStyles.test.ts` (the binding case's comment), at the sites below, and any shared line the M9
sweep finds; return one revised `md-shared-3.patch` against `2a3f223` that supersedes
`md-shared-2.patch` whole.

**Off-limits.** As round 1.

**What asserts the state this change ends.** The sentences each fix replaces; `npm run test:guides`
over the guide.

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-md/tmp/units/md-report-3.md`: each fix below by its label with the file,
the before and after text, and the reading that proves it (for M7 and M8, the release source lines each
clause rests on); each gate's command written exactly as it ran, with every argument, and its result
line; the revised patch at `tmp/units/md-shared-3.patch`; `md-3.diff`, `md-3-status.txt`, and an
interdiff of `md-shared-3.patch` against `md-shared-2.patch` at `tmp/units/md-3-shared-interdiff.txt`.
Delivered as that file plus the same text as the final message. The report follows the writing rule:
no count of a growable set, no list item named by its position, and every code token followed by a
noun; a statement about the proofs names exactly the specimens it covers.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix cannot be made without
changing what ships beyond the sentence it names. Decide, record, and carry on for re-flowing a
paragraph the fix touches and for the exact wording of M7 within what the source bears out.

## Fixes

- **M7.** In the Modal `plugin` row, replace the toggle-trigger clause ("hides any other shown dialog
  first", "toggles the dialog it names") with the calls the data-API click handler makes, read from
  `node_modules/bootstrap/js/src/modal.js`: it calls the `hide` method of the modal already shown,
  which that modal's `hide.bs.modal` event can cancel, and then the `toggle` method of the modal the
  trigger names. Promise no unconditional visibility change. Keep every other clause of the row.
- **M8.** Replace the paragraph under the stacking table with: "Bootstrap declares each rung as a
  variable on its component's rule, except the sticky and fixed levels, which it writes as literals in
  its position helpers, and the drawer-backdrop level, which it writes as a literal on the
  `.offcanvas-backdrop` rule; a component Veneer ships binds that variable to its rung, and the Alias
  column names each binding." Check each clause against `node_modules/bootstrap/scss/_offcanvas.scss`,
  `_modal.scss`, `_dropdown.scss`, `_popover.scss`, `_tooltip.scss`, `_toasts.scss`, and
  `helpers/_position.scss` before writing it.
- **M9.** Write "Below the small boundary no dialog is capped" in the `MODAL_SIZE_CASES` TSDoc and "the
  cap at the small boundary" in the binding case's comment. Sweep every line rounds 1 and 2 added for
  another boundary, cap, step, or rung named by position, and fix each hit.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the rebuilt validation copy: `npm run check`, `tests/setupStyles.test.ts` in the setup project,
   `npm run test:guides`, and `npm run test:policy` exit 0.
3. M7 to M9 are present at their sites.
4. `md-shared-3.patch` passes `git apply --check` on a fresh extract of `2a3f223`, and it differs from
   `md-shared-2.patch` only at the M7 to M9 sites, any sweep fix the report names, and their re-flow.

## Review evidence

`md-3.diff`, `md-3-status.txt`, `md-shared-3.patch`, `md-3-shared-interdiff.txt`, and `md-report-3.md`.

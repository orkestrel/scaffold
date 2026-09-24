# Unit MODAL (`md`), round 2 — the audit's fixes (successor of `b-modal-md-brief.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote round 1, continued in the worktree
`/home/user/veneer-md` (branch `unit/md` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

Round 1's owned files and shared patch carry every fix the round-1 audit ruled, and nothing else
changes: the verdict is `md-audit-verdict.md`; this brief carries each of its findings and names the
one fix for each.

## Context

**Evidence.** The reconciled verdict `/home/user/scaffold/.orkestrel/veneer/units/md-audit-verdict.md`
and the three lane verdicts beside it (`md-audit-objective-verdict.md`, `md-audit-subjective-verdict.md`,
`md-audit-checker-verdict.md`); round 1's retained record under the same folder (`md.diff`,
`md-shared.patch`, `b-modal-md-report.md`, `md-instruments/`). Where a verdict quotes a replacement
sentence, that sentence is the fix.

**Law.** As round 1: `AGENTS.md` in the worktree; the scaffold rule files the round-1 brief names;
`/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`; the mid-campaign notes
`w2-w3-note-1.md` and `w2-w3-note-2.md` beside the verdict; the round-1 brief `b-modal-md-brief.md`,
whose scope, off-limits list, standing conditions, and host facts bind this round unchanged; skill:
none. `tests/src/styles/fixtures/mixins.scss` is Shared for this round, granted with the mixin case.

**Installed primitives.** As round 1. The installed `@orkestrel/test` exports no `visitBreakpoint`;
the tree's `tests/setupBrowser.ts` copy is the one to use.

**Host.** As round 1: `/home/user/veneer-md`, npm 11 on `PATH`, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.
Write every instrument, extract, draft, and log under this worktree's `tmp/units/` or `tmp/probe/` with
the `md` prefix, and nothing into the session scratchpad.

**Measurements.** Round 1's gates and mutation logs; the Orchestrator's apply check (the round-1 patch
applies to a fresh `2a3f223` extract, exit 0).

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** As round 1: the validation copy under `tmp/probe/base/` is rebuilt for this
round from `2a3f223`, your owned files, and your revised shared patch; delete it before the report.
Sibling units still run in their own worktrees. The fullscreen rule set stays written as round 1 wrote
it: a successor unit, RAMP-DOWN, collapses the down-walk in `_modal.scss`, `_table.scss`, and
`_offcanvas.scss` after this unit lands, so do not change that shape here.

## Unknowns

None.

## Scope

**Owned.** Round 1's owned files.

**Shared (report-only).** Round 1's shared files; return one revised `md-shared-2.patch` against
`2a3f223` that supersedes `md-shared.patch` whole.

**Off-limits.** As round 1.

**What asserts the state this change ends.** The cases each fix edits, the sentences each fix replaces,
and the capture registrations M1 renames; nothing outside round 1's files.

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-md/tmp/units/md-report-2.md`: each fix below by its label with the file,
the before and after text or code, and the reading that proves it; each gate's command, written as it
ran, and its result line on the rebuilt validation copy; the mutation log for every case this round
adds or edits, retained as `tmp/units/md-mutations-2.log.txt` (the mutated site, the command, the
exits, the summary, the failing case names); the revised patch at `tmp/units/md-shared-2.patch`;
`md-2.diff` and `md-2-status.txt` captured as round 1 captured them. Delivered as that file plus the
same text as the final message. The report follows the writing rule: no count of a growable set, no
list item named by its position, no cross-reference `above` or `below`, no temporal `now`, and every
code token followed by a noun. It withdraws round 1's statement that the fullscreen rule set had to be
written twice.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix cannot be made without
changing what ships beyond the sentence, case, name, or fixture it names. Decide, record, and carry on
for re-flowing a paragraph the fix touches, for the exported name of the M6 markup constant, and for
the colour token M6 passes.

## Fixes

- **M1 (claim 5).** Rename the specimens `Fullscreen modal sm` to `Fullscreen modal xxl` as
  `Fullscreen modal sm down` to `Fullscreen modal xxl down`, and their scenarios as
  `fullscreen-modal-sm-down` to `fullscreen-modal-xxl-down`, together in `app/browser/constants.ts`, the
  `CaptureSubject` union and the `CASCADE_KEYS` rows in `tests/setup.ts`, the proofs, and the guide.
- **M2 (claim 7a, F1).** In the `modal` variable row of § Compatibility, write "…each one that a rule
  applies is read beside the property it drives; the `--bs-modal-box-shadow` property is declared and
  applied by no rule." In `_modal.scss`, replace the comment that says the dialog takes a deeper shadow
  with "From the small boundary up the dialog takes a wider margin, and it is capped at the width its
  size class names and centered in the modal."
- **M3 (claim 7b).** Rewrite the Modal `plugin` row against `node_modules/bootstrap/js/src/modal.js`
  and `util/backdrop.js` at the worktree, and check each clause before writing it: the
  `[data-bs-dismiss="modal"]` trigger first, as the Alert row begins; a trigger toggles its target; the
  backdrop fades only when the modal is animated; the focus trap activates only under the `focus`
  option; the Escape key hides the dialog under the `keyboard` option unless the `hide.bs.modal` event is
  prevented, and a static backdrop bounces unless its own event is prevented; the `role` and
  `aria-modal` attributes are set on show and removed on hide; focus returns to the trigger after the
  dialog hides; the `dispose` method; the `Backdrop`, `FocusTrap`, and `ScrollBarHelper` utilities; and
  "Owner: J-ENGINE." at the end. In `### Modal classes`, replace "its frame would be the frame of the
  dialog without it" with a sentence saying it renders the same frame as the dialog alone.
- **M4 (claim 7c).** Replace the paragraph under the stacking table with: "Bootstrap declares each rung
  except the sticky and fixed levels as a variable on its component's rule, and writes those levels as
  literals in its position helpers; a component Veneer ships binds that variable to its rung, and the
  Alias column names each binding."
- **M5 (claim 8, F2, F3).** In the `MODAL_SELECTORS` TSDoc, recast "several of these twice" and "each of
  its two boundaries" to name the members or drop the number; in `ModalSection.test.ts`, name the
  stylesheets "both stylesheets" counts; in the `MODAL_SPECIMENS` TSDoc, write "because a dialog
  rendered at rest traps nothing" and "The fullscreen specimens are derived from one list of breakpoint
  names" (or derive the size specimens from a list too and say so). Sweep every added line for the same
  forms, not only the cited sites.
- **M6 (FIXTURE-PLACEMENT and the fixture colour).** Move the `DIALOG` markup from `modal.test.ts` into
  an exported constant in `tests/setupStyles.ts`, as `FORM_SELECT_MARKUP` sits there, and import it.
  In `tests/src/styles/fixtures/mixins.scss`, pass a colour token to the `overlay-backdrop` fixture in
  place of `rgb(1, 2, 3)`, and have the mixin case read the value that token resolves to; re-run the
  mixin's dropped-declaration mutation and retain it red.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the rebuilt validation copy: `npm run check` and `npm run build:src` exit 0; the round-1 style
   proof command, the round-1 section proof command, `tests/setupStyles.test.ts` and `tests/setup.test.ts`
   in the setup project, `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy`
   exit 0.
3. Each fix M1 to M6 is present at its site, and M6 carries a retained red run.
4. `md-shared-2.patch` passes `git apply --check` on a fresh extract of `2a3f223`, and it differs from
   `md-shared.patch` only at the sites M1 to M6 name.

**Observations, not criteria.** `npm run test:setup` whole, the journey, `CAPTURE=1`, `test:service`,
and the whole styles project are the Orchestrator's runs at landing.

## Review evidence

`md-2.diff`, `md-2-status.txt`, `md-shared-2.patch`, `md-report-2.md`, and `md-mutations-2.log.txt`.

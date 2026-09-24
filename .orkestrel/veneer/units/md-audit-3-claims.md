# Audit claims — MODAL (`md`), round 3

Subject: round 3's record — `md-3.diff` and `md-3-status.txt` (the worktree `/home/user/veneer-md`
against `2a3f223`), the revised shared patch `md-shared-3.patch` (one unified diff against `2a3f223`
that supersedes `md-shared-2.patch` whole), the report `b-modal-md-report-3.md`, and the round-3 logs
under `md-instruments/` (`md-gates-3/`, `md-gates-3.txt`, `md-gates-3.sh`,
`md-3-shared-interdiff.txt`) — against the successor brief `b-modal-md-brief-3.md`, the round-2 verdict
`md-audit-2-verdict.md`, round 2's record (`md-2.diff`, `md-shared-2.patch`), and the release source
at `/home/user/veneer-md/node_modules/bootstrap/`. The unit was written by `opus` on Opus 5.5. Each
claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-2
verdict's rulings stand; the Orchestrator's apply check (`md-shared-3.patch` on a fresh `2a3f223`
extract, exit 0) settles the apply clause; the § Compatibility table re-pads under the formatter.

1. **Scope and delta.** `md-3-status.txt` lists round 1's owned paths and nothing else, and `md-3.diff`
   equals `md-2.diff`; against `md-shared-2.patch`, `md-shared-3.patch` changes only the Modal `plugin`
   row, the stacking paragraph, the `MODAL_SIZE_CASES` TSDoc line, the binding case's comment, and the
   table's padding.
2. **M7.** The Modal `plugin` row says a `[data-bs-toggle="modal"]` trigger calls the `hide` method of
   the modal already shown, which that modal's `hide.bs.modal` event can cancel, then calls the `toggle`
   method of the dialog it names, and returns focus to itself after that dialog hides while the trigger
   is visible; each clause is borne out by `node_modules/bootstrap/js/src/modal.js` (the data-API click
   handler, the `hide`, `show`, and `toggle` methods), and no clause promises an unconditional
   visibility change; every other clause of the row is as round 2 wrote it.
3. **M8.** The paragraph under the stacking table carries the brief's sentence verbatim, and each clause
   is borne out by `node_modules/bootstrap/scss/_dropdown.scss`, `_offcanvas.scss`, `_modal.scss`,
   `_popover.scss`, `_tooltip.scss`, `_toasts.scss`, and `helpers/_position.scss`, and by the rungs the
   table lists.
4. **M9.** The `MODAL_SIZE_CASES` TSDoc reads "Below the small boundary no dialog is capped", the binding
   case's comment reads "the cap at the small boundary", and no line rounds 1 to 3 added names a
   boundary, cap, step, or rung by position.
5. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, or a nested function; the report writes each gate's command exactly as it ran, with
   every argument, and its result line; it follows the writing rule; the lane lists every count the
   report states, for the record.

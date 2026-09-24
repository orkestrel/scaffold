# Audit claims — MODAL (`md`), round 2

Subject: round 2's record — `md-2.diff` and `md-2-status.txt` (the worktree `/home/user/veneer-md`
against `2a3f223`), the revised shared patch `md-shared-2.patch` (one unified diff against `2a3f223`
that supersedes `md-shared.patch` whole), the report `b-modal-md-report-2.md`, and the round-2
instruments and logs under `md-instruments/` (`md-mutations-2.log.txt`, `md-mutate-2.py`,
`md-gates-2.sh`, `md-gates-2/`, `md-gates-2.txt`, `md-shared-interdiff.txt`) — against the successor
brief `b-modal-md-brief-2.md`, the round-1 verdict `md-audit-verdict.md` and its lane verdicts, round
1's record (`md.diff`, `md-shared.patch`, `b-modal-md-report.md`), and the mid-campaign notes
`w2-w3-note-1.md` and `w2-w3-note-2.md`. The unit was written by `opus` on Opus 5.5. Each claim is
falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim
about a proof names the mutation that would make the proof fail and whether its assertions distinguish
that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-1
verdict's rulings stand, and every claim it confirmed stays confirmed unless round 2 changed its
subject; the fullscreen rule set stays written as round 1 wrote it, because RAMP-DOWN collapses it;
the re-padded § Compatibility table integrates by re-running the formatter; where the verdict or the
brief quotes a replacement sentence, that sentence is the fix; the validation copy was deleted before
the report, so a lane rules the gate and mutation claims from the code's assertions and the retained
logs, and names which it read.

1. **Scope and delta.** `md-2-status.txt` lists round 1's four owned paths and nothing else;
   `md-shared-2.patch` applies with `git apply --check` to a fresh extract of `2a3f223`; against round 1
   it changes only `app/browser/constants.ts`, `guides/veneer.md`, `tests/setup.ts`,
   `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/src/styles/fixtures/mixins.scss`, and
   `tests/src/styles/mixins.test.ts`, at the M1 to M6 sites; the owned files change only at the M2, M5,
   and M6 sites.
2. **M1: the fullscreen specimen names.** The specimens read `Fullscreen modal sm down` to
   `Fullscreen modal xxl down`, and the `CaptureSubject` members and the `CASCADE_KEYS` rows and
   scenarios (`fullscreen-modal-sm-down` to `fullscreen-modal-xxl-down`) follow; no proof or guide
   sentence keeps an undirected name; the retained run with the old names reddens the section case the
   report names, and its assertion distinguishes the rename.
3. **M2 and M3: the guide rows and the shadow comment.** The `modal` variable row carries the M2
   sentence; the `_modal.scss` comment no longer claims a shadow; the Modal `plugin` row states, and
   `node_modules/bootstrap/js/src/modal.js`, `util/backdrop.js`, `util/focustrap.js`, and
   `util/component-functions.js` at the worktree bear out, every clause: the dismiss trigger, the toggle
   trigger and its focus return, the option defaults, the methods, the events, the `Escape` key under
   and without the `keyboard` option, the press beside the dialog, the attributes set and removed, the
   body class, the conditional backdrop fade, the conditional focus trap, and the scroll lock; the
   fade-alone sentence carries the M3 wording.
4. **M4: the stacking paragraph.** The paragraph under the stacking table carries the M4 sentence
   verbatim, and it is true of `node_modules/bootstrap/scss/helpers/_position.scss` and of every
   component rung the table lists.
5. **M5: counted and ambiguous forms.** The `MODAL_SELECTORS` TSDoc, the `ModalSection.test.ts` comment,
   and the `MODAL_SPECIMENS` TSDoc carry the rewritten sentences; no added or changed line in the owned
   files or the patch counts a growable set, names a list item by its position, or uses "static dialog"
   for a dialog at rest; the forms the report kept (the named `pair`, the `once each` wording, and the
   fixture strings) are each outside the ban.
6. **M6: the markup constant and the fixture fill.** `MODAL_MARKUP` sits in `tests/setupStyles.ts` with
   its TSDoc, in the export-key list, and in every modal fixture template in place of the removed
   `DIALOG` constant; the `overlay-backdrop` fixture passes the `--vn-palette-teal` token and the mixin
   case reads the value that token resolves to; each retained M6 run (a dropped fill, a dropped
   placement, the black token passed, the markup without its footer) reddens the case the report names,
   and its assertions distinguish the mutation.
7. **The round-1 confirmations.** The claims round 1 confirmed (scope, the cascade, the proof matrix,
   the mixin and the close move, the registries) still hold on round 2's files.
8. **Law and report.** The owned files and the patch add no `any`, no `as` beyond a const assertion, no
   `!`, no suppression, no mock, spy, or fake, and no nested function beyond a callback passed
   directly; the round-2 report follows the writing rule and records each gate's command as it ran with
   its result line; a lane lists every count the report states as a finding outside the claims for the
   record.

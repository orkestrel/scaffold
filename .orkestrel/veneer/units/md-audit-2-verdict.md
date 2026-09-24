# Audit round 2 — MODAL (`md`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the MODAL unit's round 2 (`opus` on Opus 5.5 in `/home/user/veneer-md` from `2a3f223`), claims
file `md-audit-2-claims.md`. Lanes that ran, blind to each other on that one file: the objective lane,
`analyst` on GPT-6 Astra (`md-audit-2-objective-verdict.md`, thread
`01a0d145-19d6-70d0-bc82-cca8150d1968`, journal `tmp/codex/md-audit-2-analyst.jsonl`, an engine that did
not write the unit), and the checker on Sonnet (`md-audit-2-checker-verdict.md`, claims 1, 2, 5, and 8,
workflow `wf_7b97f4f8-e2b`). The subjective lane is not run for round 2, as `md-audit-verdict.md`
records: M1 to M5 adopt the lanes' wording, the checker verifies the letters, and M6 closes on a
retained red run. The Orchestrator's apply check: `git apply --check md-shared-2.patch` on a fresh
`git archive 2a3f223` extract, exit 0.

## Per-claim rulings

1. **CONFIRMED** by both lanes; the checker's apply sub-clause is settled by the objective lane's run
   and the Orchestrator's.
2. **CONFIRMED.** The objective lane read `md-mutations-2.log.txt` and named the distinguishing
   assertion; the checker's UNRESOLVED sub-clause asked for that reading.
3. **BROKEN (objective lane).** The Modal `plugin` row says a toggle trigger "hides any other shown
   dialog first" and "toggles the dialog it names". The data handler calls the `hide` method of the
   shown modal, which returns without hiding when its `hide.bs.modal` event is prevented
   (`node_modules/bootstrap/js/src/modal.js`, the `hide` method and the data-API click handler), and
   then calls the target's `toggle` method, so neither visibility change is unconditional. Citations
   resolve. Carrier: M7.
4. **BROKEN (objective lane).** The M4 sentence the Orchestrator quoted is false: the release writes the
   offcanvas backdrop's level as the `$zindex-offcanvas-backdrop` literal through the `overlay-backdrop`
   mixin on the `.offcanvas-backdrop` rule (`node_modules/bootstrap/scss/_offcanvas.scss`), not as a
   variable, so the drawer-backdrop rung is a third literal. Citations resolve. Carrier: M8.
5. **BROKEN (objective lane).** Two added lines name a boundary and a cap by position: "Below the
   first boundary" in the `MODAL_SIZE_CASES` TSDoc and "the first cap" in the binding case's comment.
   The checker's CONFIRMED reading rests on the named M5 sites. Carrier: M9.
6. **CONFIRMED** (objective lane), each M6 mutation distinguished.
7. **CONFIRMED** (objective lane).
8. **BROKEN (objective lane).** The owned files and the patch pass the syntax law. The report writes
   the format and lint commands with placeholder arguments (`<every touched file>`) under "Command, as
   it ran", and says the proofs name no specimen by a literal string where the section proof names the
   shown and scrollable specimens. The checker's CONFIRMED reading is discarded for the report clause:
   the objective lane's cited lines resolve (`b-modal-md-report-2.md` in the gate table and the
   opening section). The report is the round's record, not product; the round-3 report writes each
   command as it ran. Carrier: M10 (report obligation only).

## Findings outside the claims, ruled

- **report-counts (objective lane).** The counts the report states are measurements with their runs
  or quotations of corrected text; recorded. No carrier.

## Carrier

Round 3 on the same `opus` subagent carries M7 to M10 (`b-modal-md-brief-3.md`). It is a prose-only
micro-round: its audit runs the checker alone, with the release source lines named in its claims; the
objective and subjective lanes are not run, because no code, assertion, or specimen changes and the
objective lane ruled the code in this round.

VERDICT: FAIL 3, 4, 5, 8; outside the claims: none

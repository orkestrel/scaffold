# Audit round 1 — MODAL (`md`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the MODAL unit's round 1 (`opus` on Opus 5.5 in `/home/user/veneer-md` from `2a3f223`),
claims file `md-audit-claims.md`. Lanes that ran, blind to each other on that one file: the objective
lane, `analyst` on GPT-6 Astra (`md-audit-objective-verdict.md`, thread
`01a0d11e-75fb-7dc3-a205-3d5080d7dbfb`, journal `tmp/codex/md-audit-analyst.jsonl`, an engine that did
not write the unit), the subjective lane, `reviewer` on Opus 5.5 (`md-audit-subjective-verdict.md`),
and the checker on Sonnet (`md-audit-checker-verdict.md`, claims 1, 6, and 8), the last two through
workflow `wf_153d22e7-88b`. The Orchestrator's apply check ran on a fresh `git archive 2a3f223`
extract in its scratchpad: `git apply --check md-shared.patch` exit 0.

## Per-claim rulings

1. **CONFIRMED.** The objective lane and the checker held every clause; the subjective lane left only
   the apply check unresolved, which the Orchestrator's run settles.
2. **CONFIRMED for the cascade; the fullscreen shape carried.** Both lanes found the built cascade
   equal to the inventory with the recorded departures, the rung bindings, the mixin, the colour
   tokens, and the transition mixin in place. Both lanes broke the report's reason for writing the
   fullscreen rule set twice: the objective lane compiled a map shape that writes it once, and the
   subjective lane found the same down-walk already written twice in `_table.scss` for
   `.table-responsive` at `2a3f223`, with OFFCANVAS's panel ramp a third site. The styles rule's
   pattern line fires across those partials, and the fix needs `_mixins.scss` and `_table.scss`, which
   no wave-2 brief grants. Carrier: RAMP-DOWN (`rd`), a successor unit dispatched after MODAL and
   OFFCANVAS land (§ Re-baseline). MODAL's emitted cascade is correct and lands as it is; the round-2
   report withdraws the necessity claim.
3. **CONFIRMED** by every lane that ruled it.
4. **CONFIRMED** by both lanes: the appended block equals the brief's byte for byte, and the close move
   holds.
5. **BROKEN (subjective lane).** The `Fullscreen modal sm` to `xxl` names drop the direction the
   `modal-fullscreen-{infix}-down` classes carry, where every sibling specimen's trailing infix means
   "from that boundary up". Carrier: M1. The objective lane's reading of this claim is dropped: it
   rules the claim's clause "a class the built cascade at `2a3f223` does not ship" wrong for the modal
   classes themselves, which is the claim's wording rather than a defect in the unit; the clause means
   the base plus the unit's own delta, and the unit's non-modal classes all ship at `2a3f223`.
6. **CONFIRMED** by every lane that ruled it.
7. **BROKEN** (both lanes). (a) The `modal` variable row says each variable is read beside the property
   it drives, and the `--bs-modal-box-shadow` property drives none. (b) The Modal `plugin` row: a trigger
   toggles its target rather than opening it; the backdrop fades only when the modal is animated and the
   focus trap activates only under the `focus` option; a prevented `hide.bs.modal` event keeps the dialog
   open and skips the static bounce; and the row omits the `[data-bs-dismiss="modal"]` trigger, the
   `dispose` method, the focus returned to the trigger, and the `role` and `aria-modal` attributes
   removed on hide. (c) The stacking paragraph, the brief's fixed sentence, is false for the sticky and
   fixed rungs, which the release writes as literals in its position helpers; the given ruling is wrong
   and the subjective lane's replacement is adopted. Carriers: M2, M3, M4.
8. **BROKEN.** Every lane: added prose counts a growable set ("several of these twice", "each of its two
   boundaries" in the `MODAL_SELECTORS` TSDoc, "both stylesheets" in `ModalSection.test.ts`). Carrier: M5.
   The report's cross-references, temporal word, false "remains once" statement, paraphrased gate
   commands, and tallies are the round's record, not product; recorded here, and the round-2 report
   follows the writing rule and records each executed command. No carrier.

## Findings outside the claims, ruled

- **F1 and SHADOW-COMMENT (both lanes): BROKEN.** The `_modal.scss` comment says the dialog takes a
  deeper shadow from the small boundary; no rule applies the shadow. Carrier: M2.
- **F2 (subjective lane): BROKEN.** "a static dialog" means a dialog rendered at rest in the
  `MODAL_SPECIMENS` TSDoc and the `modal-static` bounce elsewhere in the same file. Carrier: M5.
- **F3 (subjective lane): BROKEN.** The `MODAL_SPECIMENS` TSDoc says the size and fullscreen specimens
  derive from one list; only the fullscreen steps do. Carrier: M5.
- **FIXTURE-PLACEMENT (objective lane): BROKEN.** The `DIALOG` markup in `modal.test.ts` serves the
  density, layout, colour, and fullscreen cases; the landed precedent keeps such markup in
  `tests/setupStyles.ts` (`FORM_SELECT_MARKUP`, and OFFCANVAS's `OFFCANVAS_MARKUP`). Carrier: M6.
- **The fixture's literal colour (subjective lane's referral): BROKEN.** The `.vn-fixture-backdrop`
  class passes `rgb(1, 2, 3)`; `.claude/rules/styles.md` confines a literal colour to `_tokens.scss`.
  Carrier: M6.
- **The `visitBreakpoint` referral: dropped.** The installed `@orkestrel/test` exports no
  `visitBreakpoint`; the tree's `tests/setupBrowser.ts` copy is the only one, and the brief's
  statement that the package exports it was the Orchestrator's error.
- **REPORT-COUNTS (objective lane).** Recorded under claim 8. No carrier.
- **The subjective lane's optional tidy-ups** (a `body` field in place of the `id === 'scrollable'`
  branch, and the "frame of the dialog without it" phrase): the phrase is carried in M3 because a
  reader stumbles on it; the field is dropped with reason, because the landed `CLOSE_SPECIMENS` shape
  admits both forms and no rule chooses.

## Re-baseline

- **Added: RAMP-DOWN (`rd`).** `opus` on Opus 5.5, after MODAL and OFFCANVAS land: a down-direction twin
  of the `breakpoint-each` mixin in `src/styles/_mixins.scss` that emits its content unwrapped at the
  zero boundary and under `(width < boundary)` elsewhere, with its fixture case; `_modal.scss`,
  `_table.scss`, and `_offcanvas.scss` write their down-walk rule sets once through it; the cascade stays
  byte-equal (the built stylesheet compared before and after).

## Carrier

Round 2 on the same `opus` subagent carries M1 to M6 (`b-modal-md-brief-2.md`). Its audit runs the
objective lane on Astra and the checker; the subjective lane is not run for round 2, because M1, M3,
M4, and M5 adopt that lane's wording, the checker verifies the letters, and M2 and M6 close on the
objective lane's reading of the release source and the retained red runs.

VERDICT: FAIL 5, 7, 8; outside the claims: F1, F2, F3, FIXTURE-PLACEMENT, SHADOW-COMMENT

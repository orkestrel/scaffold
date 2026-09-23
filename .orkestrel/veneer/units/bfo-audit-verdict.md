# B-FORMS-CONTROL audit — round verdict (reconciled by the Orchestrator, 2026-09-23)

Lanes that ran on `bfo-audit-claims.md`, blind to each other: `analyst` on GPT-6 Astra
(`bfo-audit-analyst-verdict.md`, session `01a0cc8b-6d8b-7872-a047-572227aa4c50`, FAIL 3, 4, 5, 7,
8, 9; outside the claims SWATCH-PRIORITY), `reviewer` on Opus 5.5 (`bfo-audit-reviewer-verdict.md`,
FAIL 5, 7, 8, 9, 10; F1; R1 to R3), and `checker` on Sonnet (`bfo-audit-checker-verdict.md`, FAIL
6, 10 as UNRESOLVED on its read-only limit, 9 confirmed). Every lane ran; none empty. The writer was
Opus, so the objective lane on Astra is the auditor that did not write the work.

## Rulings per claim

1. **CONFIRMED** (both lanes; the analyst compiled and compared the selector set against the
   release). The swatch priority is the finding outside the claims.
2. **CONFIRMED** (both lanes): `var(--vn-space-24)` stands for the color width because
   `$form-color-width` is the release's own variable, not a padding multiple (D33 governs the
   latter).
3. **UNRESOLVED** (the analyst): the primary mutations are distinguished by the assertions (both
   lanes), and the plant table's incidental F failures under the reduced-motion plant depend on
   timing. Carrier: the fix round re-runs the plant table over the per-property shape and records
   each red set; the landing chain settles the gates.
4. **NOT-EVIDENCED** (the analyst): the date parts have no specimen and no frame, which the design's
   ruling 5 requires as corroboration for a declared rung. Carrier: the fix round adds the
   `Form control date` specimen and its `form-control-date` scenario.
5. **BROKEN** (both lanes): `FORM_CONTROL_CASES` binds tokens per selector and the Node case reads
   the joined declarations, the shape GROUP's fix round replaced with per-property references
   (`bfg-audit-verdict.md` claim 3). Carrier: the fix round. `FORM_RANGE_CASES` carries the same
   per-selector shape (the reviewer's scope note): carrier B-FORMS-CLOSE, recorded in `ROADMAP.md`
   at CONTROL's landing.
6. **CONFIRMED** (the analyst ran the ledger, deferral, and tag readers; the checker's UNRESOLVED
   was its read-only limit; the writer's `.form-control-color.is-*` attribution stands by
   `attributeSelector`'s reading).
7. **NOT-EVIDENCED** (both lanes) on the focus page frame, which the portfolio delivers at page
   resolution, and on FLOATING's carrier, which this worktree cannot see. Carriers: the
   Orchestrator crops the four `form-control-text-focus` frames at the control's bounding box at the
   landing (the `crop.cjs` instrument, retained under `bfo-focus/`); FLOATING's recaptures come
   from the landing's regeneration, and its bare-controls sentence takes CONTROL's landing patch
   after the FLOATING-SELECT unit rewrites the select half.
8. **UNRESOLVED** (both lanes): the `validation.test.ts` patch's mechanism holds (the `1rem` control
   type moves the mark inset to 9px; the staged preference reads the border's end state) and its
   later assertions are unrun. Carrier: the fix round applies the patch (the file is granted) and
   runs the proof.
9. **BROKEN** (both lanes): the timing tokens at guide lines 759 and 761 stand without a noun; the
   links at 775 and 788 lack `see` and one makes "classes" the subject of "reads"; the alias
   sentence at 735 to 736 names a build mechanism the diff does not show; the ladder list's lead-in
   at 777 excludes its last item; the proof comment at `form-control.test.ts` line 182 says
   "quarter-second" for a `0.15s` fade; the ROADMAP rows leave tokens without nouns and name
   B-FORMS-CONTROL for D31 where the round records B-FORMS-CLOSE. Carrier: the fix round and its
   successor report.
10. **CONFIRMED** (the analyst's `npm run check` exited 0 with an AST inspection of the added lines;
    the reviewer's reading agrees; the checker's UNRESOLVED was its read-only limit). The claims
    file's instruction to run `npm run check` reached a read-only lane, which is the claims file's
    fault, dropped on the record.

## Findings outside the claims and referrals

- **SWATCH-PRIORITY / F1** (both lanes): the swatch loop writes `border: 0` where the release writes
  `border: 0 !important`, and no gate reads priority. Carrier: the fix round writes the priority,
  asserts it in the CSSOM reading, states the swatch rule in the guide's non-utility sentence, and
  records the release's text in the case table.
- **R1** (reviewer; the analyst's finding agrees): the cascade comparison drops declaration
  priority, so any partial can lose a Bootstrap `!important` unreported. Ruled **D39**: priority is
  part of the value the ledger compares. Carrier: L2 LEDGER-PRIORITY (`opus`), after CONTROL lands;
  recorded in `ROADMAP.md` at CONTROL's landing.
- **R2** (reviewer): C cannot distinguish removing `:not([readonly])` from the color rule because the
  markup has no readonly color control. Carrier: the fix round adds one. The hover R row's empty
  `values` proves the drive while H owns the paint; recorded, no change.
- **R3** (reviewer): the ROADMAP row names B-FORMS-CLOSE for D31. Carrier: the fix round's report.

Every finding has a carrier; nothing dropped without record.

VERDICT: FAIL 3, 4, 5, 7, 8, 9; outside the claims: SWATCH-PRIORITY

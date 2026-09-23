# B-FORMS-FLOATING audit — round verdict (reconciled by the Orchestrator, 2026-09-23)

Lanes that ran on `bff-audit-claims.md`, blind to each other: `analyst` on GPT-6 Astra
(`bff-audit-analyst-verdict.md`, FAIL 2, 3, 6, 7, 10), `reviewer` on Opus 5.5
(`bff-audit-reviewer-verdict.md`, FAIL 1, 2, 4, 6, 10; F1 to F3; R1 to R6), and `checker` on Sonnet
(`bff-audit-checker-verdict.md`, nothing BROKEN). Every lane ran; none empty. The subject includes
B-FORMS-FLOOR (D32), which both lanes confirmed.

## Rulings per claim

1. **CONFIRMED** (the analyst compiled and reproduced the D4 rewrite: `:-webkit-any(…)` and
   `:is(…:autofill)`); the partial's comment says "into one `:is()` selector" and is corrected to
   the measured rewrite. Carrier: the fix round.
2. **BROKEN** (both lanes): `validation` loads before `form-floating`, so the floating padding
   shorthand overrides validation's `padding-right` on a floating `.form-control.is-*` (the release
   orders them oppositely). Ruled D35: the forms block takes the release's order with `validation`
   last, a conformance case pins the order, and the proof pins the floating invalid control's
   `padding-right`. Carrier: the fix round.
3. **CONFIRMED** (the claims file's "three" miscounted; four selectors have `rendered: false` and
   the pin holds exactly those; no defect). The analyst's unevidenced captures (a focused empty
   textarea, a focused cleared plaintext, the reduced-motion treatment, the overrides) are proof
   readings, not showcase states, under design ruling 7; no frame is owed.
4. **NOT-EVIDENCED** for the focus page frame's legibility (reviewer), the family's page-frame
   convention with the journey's readings as evidence; no action.
5. **CONFIRMED** (the analyst ran the ledger readers and `attributeSelector`).
6. **BROKEN** (both): the guide's "every Bootstrap global" claim omits `--bs-secondary-bg` from the
   override table (add an ancestor override and assert the disabled backdrop follows it); the
   universal autofill sentence at guide line 835, the `FORM_FLOATING_CASES` TSDoc, and the proof
   comment are bounded to the installed browser exports; "this tree" → "Veneer"; the nested serial
   list, "an autofill", and the unanchored "is recorded beside the reading it bounds" are rewritten.
   Carrier: the fix round.
7. **CONFIRMED** as implemented (D32); the claims file's "each case distinguishes the floors" was
   the Orchestrator's wording, and the round records that the whole-four case and the live-tree
   case distinguish the change while the others pin the arms under either floor.
8. **CONFIRMED**. 9. **CONFIRMED**. 10. **UNRESOLVED** until the landing chain after GROUP.

## Findings outside the claims and referrals

- **F1** (reviewer): the autofill case title and comments misstate the release and the split's
  reason. Fix round.
- **F2** (reviewer): the § Compatibility row names the declaration-only rows. Fix round.
- **F3** (reviewer): the ROADMAP rows take one carrier each, grant the files a carrier makes false,
  drop the moot floor row, and carry D34 here. Fix round's successor report.
- **R1** → D35. **R2** → settled by the analyst (D4); the comment follows. **R3** (the showcase
  constructs floating before range while the barrel and guide put floating after range): the
  showcase's construction order is alphabetical by section class, the family's convention (D35
  records it); no change. **R4** (the `MOTION` literal) → carrier B-PASSIVE-CLOSE. **R5** (the
  input-group rules "belong to the input-group family" while their departures attribute here) →
  the fix round rewrites the sentence. **R6** (a CDP `Autofill.trigger` probe): dropped on the
  record — bounding the sentence to the installed exports removes the claim the probe would test.
- **D34** (the height and floated top inset scale with density): the fix round.

VERDICT: FAIL 2, 6; outside the claims: F1, F2, F3; R1 → D35, R4 → carrier, R5 → fix round, R6 dropped

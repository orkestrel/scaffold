# B-FORMS-FLOATING, round 2 (the fix round) — round verdict (reconciled by the Orchestrator, 2026-09-23)

Lanes that ran on `bff-fix-audit-claims.md`, blind to each other: `analyst` on GPT-6 Astra
(`bff-fix-audit-analyst-verdict.md`, session `01a0cc7c-659b-7561-ae0f-e99e54021386`, FAIL 1, 7, 9,
10), `reviewer` on Opus 5.5 (`bff-fix-audit-reviewer-verdict.md`, FAIL 3, 6, 7, 8, 10; R1 to R3),
and `checker` on Sonnet (`bff-fix-audit-checker-verdict.md`, PASS on claims 4, 7, 8, and 9). Every
lane ran; none empty. The writer was Opus, so the objective lane on Astra is the auditor that did
not write the work.

## Rulings per claim

1. **NOT-EVIDENCED** for the integrated barrel (the analyst); the case itself is confirmed by the
   analyst's Node reproduction and the reviewer's reading (the reversal reddens, the negative control
   stays green, the removal is caught by the `arrayContaining` line). The integrated order is the
   Orchestrator's integration reading: `npm run test:conformance -- -t 'loads the forms partials'`
   on the session branch after the merge.
2. **CONFIRMED** (both lanes; the expected value is `_validation.scss`'s `calc(1.5em + 0.75rem)`).
3. **BROKEN** (the reviewer; the analyst agrees the content-box assertion adds no protection):
   under `box-sizing: border-box` the computed height is never less than the insets and borders, so
   the `< 0` filter cannot match. Carrier: round 3 replaces it with a line-box comparison.
4. **CONFIRMED** (all lanes). 5. **CONFIRMED** (both lanes).
6. **BROKEN** (the reviewer): the autofill case title names "the release's declarations" where the
   case holds the rules to the floated declarations of the focus and filled group. Carrier: round 3.
7. **BROKEN** (both lanes): the proof pathname at guide line 843 and the `--vn-space-8` name at
   line 816 stand with no noun. Carrier: round 3. The § Compatibility row's bare pathname is the
   column's form in every row (reviewer R3), so it goes to B-PASSIVE-CLOSE's guide token-noun sweep,
   not to this unit. The checker's narrower sweep missed these two sites; recorded.
8. **CONFIRMED** on the carriers (all lanes); **BROKEN** on the patch's prose (the reviewer: a
   temporal `once`, bare tokens). The Orchestrator applies the patch with those repairs at the
   landing.
9. **BROKEN** (the analyst): the density case's `insets` matrix is an unfrozen local data table (the
   freeze check returned `false` at runtime). Carrier: round 3 moves it into a frozen table in
   `tests/setupStyles.ts` with its inventory rows. The analyst's second point (a guide table row
   past 100 columns) is the claims file's own wording — the column bound governs prose — dropped on
   the record.
10. Dropped on the record: the claims file carried a gate claim, which the process corrections
    forbid; the landing chain is the verifier's evidence. The analyst's `npm run check` exited 0.

## Referrals

- **R1** (reviewer): below a density factor of 1 the fixed `1.25` line height outgrows the shrinking
  floated inset. Ruled **D38**: the scale is specified for factors of 1 and above, the range the
  proof reads; round 3 states it in the guide's density bullet.
- **R2** (reviewer): SELECT lands before CONTROL, so the bare-controls sentence in § Form floating
  classes goes false for the select at SELECT's landing. The SELECT landing's integration patch
  rewrites the select half of that sentence; CONTROL keeps the text-control half.
- **R3** (reviewer): the § Compatibility column's bare pathnames → B-PASSIVE-CLOSE (its guide
  token-noun sweep row).

Every finding has a carrier; nothing dropped without record.

VERDICT: FAIL 3, 6, 7, 9; outside the claims: none

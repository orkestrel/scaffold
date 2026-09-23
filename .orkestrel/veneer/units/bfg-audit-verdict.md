# B-FORMS-GROUP audit — round verdict (reconciled by the Orchestrator, 2026-09-23)

Lanes that ran on `bfg-audit-claims.md`, blind to each other: `analyst` on GPT-6 Astra
(`bfg-audit-analyst-verdict.md`, thread `01a0cc2e-9c61-7102-acf6-f907237576f5`, FAIL 3, 4, 5, 6, 8,
10), `reviewer` on Opus 5.5 (`bfg-audit-reviewer-verdict.md`, FAIL 1, 6, 8, 10; F1; R1 to R4), and
`checker` on Sonnet (`bfg-audit-checker-verdict.md`, nothing BROKEN; unresolved reads settled by the
analyst's execution and the landing chain). Every lane ran; none returned empty.

## Rulings per claim

1. **CONFIRMED** (the analyst compiled and compared; the reviewer's unresolved half is closed).
2. **CONFIRMED** (both lanes; the analyst compiled the alternative order).
3. **BROKEN** (analyst): N2 binds token presence across a selector's concatenated declarations, not
   per property; an in-memory `padding: 0; --audit-unused: var(--vn-space-3) var(--vn-space-6)`
   stays green. Fix: the table associates expected references with each property and the assertion
   reads per property. Carrier: the fix round.
4. **NOT-EVIDENCED** on the tooltips (analyst; reviewer F1): no capture renders a tooltip. Ruled
   D31: B-FORMS-CLOSE carries the two tooltip specimens and the ROADMAP row names it. The rest of
   the claim is CONFIRMED. Carrier: the successor report's ROADMAP patch, applied at landing.
5. **BROKEN** on the report's narrative (analyst): the sibling exclusion selector attributes to
   `input-group` (`collectSelectorClasses` excludes classes inside functional arguments), not to
   `invalid-feedback`; the ledger tables already agree with the actual attribution (the analyst's
   ledger readers returned nothing unrecorded), so the correction is to the report and the claim.
   Carrier: the successor report.
6. **BROKEN** (analyst) and **NOT-EVIDENCED** (reviewer): the guide sentence saying feedback and
   tooltip elements wrap onto their own line is false for a tooltip (`position: absolute; top:
   100%`), and the partial's comment at the overlap rule says the same; the focus sentence claims a
   lift over the addon that the paint order makes invisible. Ruled D29: the focus scenario drives
   the grouped button; the sentences and the `INPUT_GROUP_KEYS` remarks are restated; the tooltip
   sentence and comment distinguish feedback wrapping from tooltip positioning. Carrier: the fix
   round.
7. **CONFIRMED** (both lanes): the `validation.test.ts` patch distinguishes the guard-drop
   mutation; it is the Orchestrator's integration edit at landing, as the brief scoped it.
8. **BROKEN** (analyst and reviewer): the `-lg` and `-sm` blocks take one `@each` (D30), and the two
   inline matrices move to frozen `INPUT_GROUP_SIZE_CASES` and `INPUT_GROUP_FLOATING_CASES` in
   `tests/setupStyles.ts` with their export and freeze rows. Carrier: the fix round.
9. **CONFIRMED** by all lanes.
10. **UNRESOLVED** until the landing chain; the analyst's `npm run check` exited 0.

## Findings outside the claims and referrals

- **Reviewer F1** → D31 (the tooltip specimens' carrier is B-FORMS-CLOSE).
- **Reviewer R1** → D29.
- **Reviewer R2** → D30.
- **Reviewer R3** → D31: B-FORMS-CONTROL retires `INPUT_GROUP_ROUNDING` and the guide sentence; the
  fixture's TSDoc is restated in the present tense by the fix round.
- **Reviewer R4** → D33: the sized select's end padding in a group is written
  `calc(var(--vn-space-6) * 4)`, the release's `$form-select-padding-x * 4`, in the idiom SELECT's
  own `calc(var(--vn-space-6) * 3)` uses; the fix round changes it, and the observation goes to
  SELECT's claims.
- **Analyst, attacked and held**: `.btn-group > .btn:focus` overrides `.input-group .btn:focus` for
  a button nested in a button group inside an input group, as in the release; the report's "none"
  observation is corrected in the successor report. No code change.
- **Reviewer claim 3 adjacent**: the report's "reaches the feedback" plant row actually plants
  `:not(.invalid-tooltip)`; corrected in the successor report.

## Dropped

None: every finding a lane raised has a carrier.

VERDICT: FAIL 3, 4, 5, 6, 8, 10; outside the claims: F1; R1 → D29, R2 → D30, R3 → D31, R4 → D33

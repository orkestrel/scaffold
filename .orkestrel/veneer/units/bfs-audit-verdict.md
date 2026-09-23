# B-FORMS-SELECT audit — round verdict (reconciled by the Orchestrator, 2026-09-23)

Lanes that ran on `bfs-audit-claims.md`, blind to each other: `analyst` on GPT-6 Astra
(`bfs-audit-analyst-verdict.md`, thread `01a0cc3f-6cb9-7300-a972-a48216900de3`, FAIL 3, 6, 7, 10),
`reviewer` on Opus 5.5 (`bfs-audit-reviewer-verdict.md`, FAIL 3, 6, 7, 10; F1 to F4; R1 to R5), and
`checker` on Sonnet (`bfs-audit-checker-verdict.md`, nothing BROKEN). Every lane ran; none empty. The
analyst and the reviewer agree claim by claim.

## Rulings per claim

1. **CONFIRMED** (compiled; at density 2 the caret keeps 32px clear of the text).
2. **CONFIRMED**: the one tie (`.form-select:focus` against `.form-select.is-*` on `border-color`) is
   decided by the higher-specificity validated-focus rules whatever the order; D35 moves `validation`
   after the forms partials at the FLOATING landing, which also restores the release's order here.
3. **BROKEN** (both lanes): `.form-select { color: var(--bs-body-color) }` has no reading; the
   TSDoc and guide overclaim. Carrier: the fix round (a `color` row and a `background-color` row, a
   wrapper-retune reading in each mode, the sentences bounded to the rows).
4. **CONFIRMED**. 5. **CONFIRMED** (the analyst executed `attributeSelector` and the ledger readers).
6. **BROKEN** (both): bare code tokens in the section (guide lines 733, 740, 746 to 748, 751 to 752,
   755, 756, 762, 770 to 771) and the overclaim at 775. Carrier: the fix round.
7. **BROKEN** (both): the D26 carrier text omits the sites the `$assets` removal makes false: the
   guide sentence at 736 to 738 and the § Bootstrap variables paragraph at 1510, the case title at
   `form-select.test.ts:137`, and its comment at 156. Carrier: the fix round's successor report (the
   ROADMAP patch names them for B-FORMS-ASSETS).
8. **CONFIRMED** (D30's `@each` carried). 9. **CONFIRMED**. 10. **UNRESOLVED** until the landing chain.

## Findings outside the claims and referrals

- **F1** (reviewer): the partial's focus comment overclaims a package-wide ring invariant. Fix round.
- **F2** (reviewer): the density sentence and comment are false for a validated select. Fix round
  bounds them; **R2** (VALIDATION's select geometry tokenized) → carrier B-FORMS-CLOSE, in the ROADMAP
  patch.
- **F3** (reviewer): two case titles hide what fails; split into named cases. Fix round.
- **F4** (reviewer): `bright`/`dim` → `light`/`dark`. Fix round.
- **R1** (reviewer): a generic type argument on `querySelector` is the DOM declaration's type
  parameter, not an assertion; the "no `as`" law does not reach it (D36). No change.
- **R3** (reviewer): the `MOTION` literal repeated across proofs → carrier B-PASSIVE-CLOSE (with the
  FLOATING reviewer's R4), in the ROADMAP patch.
- **R5** (reviewer): the guide-wide token-noun sweep → carrier B-PASSIVE-CLOSE, in the ROADMAP patch.
- **D30**: `.form-select-sm` and `.form-select-lg` take one `@each`. Fix round.

VERDICT: FAIL 3, 6, 7, 10; outside the claims: F1, F2, F3, F4

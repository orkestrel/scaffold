# B-FORMS-CHECK audit — round verdict (reconciled by the Orchestrator, 2026-09-23)

Lanes that ran on `bfc-audit-claims.md`, blind to each other: `analyst` on GPT-6 Astra
(`bfc-audit-analyst-verdict.md`, thread `01a0cc24-ea24-7da3-bc65-23e802df0359`, FAIL 2, 8, 10),
`reviewer` on Opus 5.5 (`bfc-audit-reviewer-verdict.md`, FAIL 1, 2, 5, 10; F1 to F3; R1, R2), and
`checker` on Sonnet (`bfc-audit-checker-verdict.md`, FAIL 8). Every lane ran; none returned empty.

## Rulings per claim

1. **CONFIRMED** (analyst compiled and compared; the reviewer's unresolved rounding question is
   answered: the mix is the release's with fractional channels retained, and the guide sentence
   stands).
2. **BROKEN** (analyst and reviewer agree): the disabled-fieldset host separates `:disabled` and not
   `[disabled]`; the analyst's split-rule counterexample (an attribute-label rule with `opacity: 1`
   before the state-label rule) keeps the case green. Fix: an attribute-only host that matches
   `[disabled]` without matching `:disabled`, read for the label's opacity. Carrier: the fix round.
3. **CONFIRMED** (analyst on the files, the reviewer on the frames); the focus page frame cannot
   show the ring's pixels, and the journey's pixel guard is the reading, which is the family's rule
   for focus frames. No action.
4. **CONFIRMED** by both lanes; the reviewer's F2 on the variable row is carried below.
5. **BROKEN** on the reviewer's three prose defects (the focus bullet's lead is false against
   `_form-check.scss`'s focus rule; "both modes"; the print sentence). The analyst's CONFIRMED read
   the section's placement and limits, which stand. Carrier: the fix round.
6. **CONFIRMED**; the D26 follow-up's owned sites are named by both lanes.
7. **CONFIRMED**.
8. **BROKEN**: the checkbox and radio glyph rules are two per-variant blocks of one structure and
   the partial carries no `@each`; the analyst compiled the `@each` form byte-identical. The
   reviewer's "none owed" reading is overruled by the rule's letter (`styles.md` § "Never repeat
   per-color/per-variant blocks"). The claims file's phrase "drives repeated structure with `@each`"
   described the required state and the checker read its absence correctly. Carrier: the fix round.
9. **CONFIRMED** by all lanes (the analyst matched the live diff's digest to `bfc.diff`).
10. **UNRESOLVED** until the landing chain; the analyst's own `npm run check` exited 0.

## Findings outside the claims

- **F1** (reviewer): `theme` → `mode` in `FORM_CHECK_ICON_CASES` and its consumers. Carried.
- **F2** (reviewer): the § Compatibility variable row names the dark knob's `$dark` source. Carried.
- **F3** (reviewer): the ROADMAP patch names the focus border beside the fill. Carried into the
  unit's successor report; the Orchestrator applies the patch at landing.
- **Analyst, claim 2 note**: the report's "swapped" plant substituted one glyph rather than
  exchanging both bindings. The fix round re-runs it as an exchange and records the reddening cases.

## Referrals

- **R1** (reviewer): ruled as D28 in `decisions-round-2.md`; the fix unit mounts the nesting, reads
  the knob, and states the limit.
- **R2**: closed by the analyst's compile (claim 1) and the landing chain (claim 10); the plants are
  re-run in the fix round under claim 2's repair.

## Dropped

None: every finding a lane raised has a carrier.

VERDICT: FAIL 2, 5, 8, 10; outside the claims: F1, F2, F3, the swap-plant note

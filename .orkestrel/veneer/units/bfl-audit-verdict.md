# B-FORMS-LABEL-CASCADE (`bfl`) audit — reconciled verdict, round 1

Round: `bfl` round 1 (`b-forms-label-cascade-brief.md`; report `b-forms-label-cascade-report.md`) over `bfl.diff` and `bfl-status.txt` against `a56ca7e`. Lanes: `analyst` on GPT-6 Astra (objective; `bfl-audit-analyst-verdict.md`, session `01a0cdef-d4cf-7c32-99a7-f9ea389343e0`; it reran the ladder, the table readers, the ledger measurement, the barrel equality, and the moved-block comparison), `reviewer` on Opus 5.5 (subjective; `bfl-audit-reviewer-verdict.md`), `checker` on Sonnet (mechanical, claims 1, 2, 7, 8, 9; `bfl-audit-checker-verdict.md`). Every lane ran; every citation sampled resolves in the file it names.

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | holds |
| 2 | CONFIRMED (the built cascade read) | CONFIRMED (against the release's `_labels.scss`) | CONFIRMED (the built cascade grepped) | holds |
| 3 | BROKEN on the fallback's wording: a recording whose key is withheld prevents the all-shipped-keys fallback, so the fallback runs where the inventory records the selector nowhere; the implementation is correct | CONFIRMED (the three mutations distinguished) | — | claims-file fault, dropped on record: the claim overstated the fallback's condition; the implementation stands and the successor claims say "where the inventory records the selector nowhere" |
| 4 | CONFIRMED (the readers executed against the expanded cascade) | UNRESOLVED (the setup count rests on the report) | — | holds; the chain runs `test:setup` |
| 5 | CONFIRMED (1069 departures and 161 additions reproduced; the row → row-gap move confined) | UNRESOLVED (the counts rest on the report) | — | holds; the chain runs `test:conformance` |
| 6 | CONFIRMED (assertions and the retained runs; no browser ran) | UNRESOLVED (the scoped count rests on the report) | — | holds; the chain runs the proofs |
| 7 | BROKEN on "§ Tests is unchanged" (the required proof link sits under `## Tests`) | UNRESOLVED (the same wording; the moved blocks' identity left to the chain) | BROKEN (the same) | claims-file and report wording fault: the brief's own criterion put the link there; the stem table is unchanged; the successor brief and claims say "§ Tests is unchanged except for the required style-proof link"; the guide state stands |
| 8 | BROKEN (the "two partials" count at `conformance.test.ts:321`; bare `FORM_PARTIALS`, `collectSelectorClasses`, selector and key tokens, `component`, `aria-describedby`, `legend`) | BROKEN (the same sites, plus `matchSelectorKey` at two sites, the path token at `setupServer.ts:395`, the "hint" synonym, the "last reading" positions, the "stacked trio") | CONFIRMED (the sweep missed the bare identifiers) | broken; fixed in round 2 with the lanes' exact text |
| 9 | CONFIRMED; rules keep `inherit` (the release's inheritance relationship) | CONFIRMED; rules bind the unsized label to `--vn-size-3` (the class exists to align the label with its control; under Veneer's 14 px body `inherit` collapses the ramp to 20/14/14 and leaves the default size the one that is not level) | BROKEN on the "§ Tests" wording only | holds on the report; the ruling follows |

## Ruling on the unsized horizontal label

The unsized `.col-form-label` reads `--vn-size-3`, the control's type step, in round 2. This re-baselines ruling D on the unit's measurement, which the design round did not have: the release's `inherit` equals the control's size only because Bootstrap derives the body size and `$input-font-size` from one base, and Veneer's body (`--vn-size-2`, 14 px) and control (`--vn-size-3`, 16 px) differ by design. The class's purpose in the release is alignment with the control ("when you need the label (or legend) text to align with the form controls"; `inherit` is annotated as the legend reset), every other declaration in the rule reads the control's tokens, and both sized siblings read the control's type steps, so the family's binding rule (read the token the control reads) decides. The analyst's dissent (the inheritance relationship is discarded) is recorded; the relationship it names is Bootstrap's variable coincidence rather than a documented contract, and the partial's comment and the guide's headline already claim the control's tokens. The stacked `.form-label` keeps inheriting: it has no alignment relation with its control.

## Findings outside the claims and their carriers

- **`unsized-label-type` (reviewer).** Closed by the ruling: the binding makes the partial's comment and the guide's headline true. Round 2.
- **`match-summary` (reviewer).** The `matchSelectorKey` summary misstates the relation; exact text in round 2.
- **The `selectorText.split(',')` idiom (reviewer's referral).** The label proof routes its selector split through the shared `splitTopLevelList` helper the check proof uses (round 2); the floating proof's copy of the idiom predates the unit and is carried by B-PASSIVE-CLOSE's reduced-motion and shared-constant consolidation row as the same class of consolidation.
- **The § Showcase paragraph's "follow the Table region" (reviewer's referral).** `bfw`'s verbatim text; carried by B-PASSIVE-CLOSE's § Showcase paragraph row.
- **The capture-journey sentence (reviewer, NOT-EVIDENCED on the worktree).** Settles on the integrated tree in the combined chain.
- **The stale `### Form select classes` sentence.** Carried by B-PASSIVE-CLOSE's barrel-neighbour row.

VERDICT: FAIL 3, 7 (claims-file and report wording, dropped on record), 8 (fixed in round 2); outside the claims: unsized-label-type, match-summary — round 2

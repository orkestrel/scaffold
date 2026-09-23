# B-FORMS-LABEL-CASCADE (`bfl`) audit — reconciled verdict, round 2

Round: `bfl` round 2 (`b-forms-label-cascade-brief-2.md`; report `b-forms-label-cascade-report-2.md`) over `bfl-2-delta.diff` (round 2 over the round-1 tree), `bfl-2.diff` (rounds 1 and 2 against `a56ca7e`), and `bfl-2-status.txt`. Lanes: `analyst` on GPT-6 Astra (objective; `bfl-2-audit-analyst-verdict.md`, session `01a0ce02-1390-7640-b09d-e7de090c59be`; it compared the moved blocks, reran the ledger computation and the split helper), `reviewer` on Opus 5.5 (subjective; `bfl-2-audit-reviewer-verdict.md`), `checker` on Sonnet (mechanical, claims 1, 4, 6, 7; `bfl-2-audit-checker-verdict.md`). Every lane ran; every citation sampled resolves in the file it names.

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED (the moved blocks byte-identical) | CONFIRMED (the three unnamed sites in the section were required by the binding) | CONFIRMED | holds; the unnamed sites are inside the owned section and follow from criterion 1 |
| 2 | CONFIRMED (the `inherit` mutation breaks the Node binding equality) | CONFIRMED (three mutations) | — | holds |
| 3 | CONFIRMED (the ledger recomputed; the row's deletion produces the unrecorded departure) | UNRESOLVED (the conformance count rests on the report) | — | holds; the chain runs `test:conformance` |
| 4 | CONFIRMED | CONFIRMED | CONFIRMED | holds |
| 5 | CONFIRMED (a nested-comma input executed) | CONFIRMED | — | holds |
| 6 | BROKEN (four tokens named) | BROKEN (`.form-label` at the stacked-label clause) | CONFIRMED (its sweep missed the class token) | broken on one site: "the stacked `.form-label` keeps inheriting" takes the noun `class`; the analyst's other three sites (`--vn-space-4`, `--bs-secondary-color`, `0.875em`) are CSS property and value tokens, each its own noun under the standing ruling, and are dropped on record |
| 7 | BROKEN (the combined scoped run's command is not recorded) | CONFIRMED (the letter question of "Each command exited 0" referred) | CONFIRMED | holds on the diff; the report's command record is incomplete for the combined scoped run and the shared exit line; the report is retained as returned and the landing chain runs every gate |

## Findings outside the claims and their carriers

- **`legend-antecedent` (reviewer).** The sentence after the stacked-label clause opens with "it", which now attaches to the stacked label. Fixed at landing as an integration edit: "On a `legend` element the horizontal label also clears the element's own trailing margin and type size, so the legend reads at its control's type step."
- **"at each size" (reviewer's referral).** Vacuous for the one-size unsized label; the integration edit drops it from that sentence.
- **The proof paragraph (reviewer's referral).** Names the sized labels' type steps and not the unsized label's; the integration edit reads "each horizontal label's type step and the sized labels' insets".
- **The level case's title (reviewer's referral).** Held: the case proves alignment, and the type-step equality is the means; the title names what it proves.
- **Pre-existing bare tokens beside repaired sites (reviewer).** `tests/setupServer.ts` (the `collectShippedComponents` and `collectKeyframeNames` sites), the `FormRangeCase` remarks in `tests/setupStyles.ts`, and the container subjects in the guide around line 2044: the guide sites are CLOSE-GUIDE's sweep; the test-file sites join the later prose unit's carrier row the fold files with the § Tests link-list omissions.

The integration edit is `bfl-probe-bfl-integration.py` with its diff `bfl-integration.diff`, verified by the landing checker (`bfl-landing-checker-verdict.md`).

VERDICT: FAIL 6 (one site, fixed at landing as an integration edit); outside the claims: legend-antecedent — fixed in the same edit, verified PASS in `bfl-landing-checker-verdict.md`

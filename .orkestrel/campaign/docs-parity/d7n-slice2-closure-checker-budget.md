All evidence confirms the diff matches the tree, `GUIDE_SPEC` is declared at line 32, and each item lands as claimed.

Lane held: checker budget

## Claim 1 — every fix-brief item landed in the diff as stated, nothing else changed

PASS. `d7n-budget-converge-fix.status.txt` shows exactly `M guides/budget.md` and `M tests/guides.test.ts`, matching the fix brief's owned pair (`d7n-budget-converge-fix-brief.md:17`). The diff (`d7n-budget-converge-fix.diff.txt`) contains exactly the four hunks the report describes (opening paragraph, `GUIDE_SPEC` site, `Shape` idiom rows, See-also link) and no other change. Confirmed against the live tree at `/home/user/fleet/budget/guides/budget.md` and `/home/user/fleet/budget/tests/guides.test.ts`, which carry the diff's post-image verbatim (e.g., `guides/budget.md:6`, `:60-68`, `:194`; `tests/guides.test.ts:32,`267`).

## Claim 2 — report's citations match the tree left; no count in prose; the pin described only in file's words

PASS. The report's item citations (`guides/budget.md:6`, `:60`, `:194`; `tests/guides.test.ts:267` reading the constant at `:32`) match the actual line numbers in the tree read directly. No count appears in the report's prose — it uses "no other site," "no clause," "no row is missing or added," none of which name a number. The report does not touch the pin-form wording (Ruling 11 is not one of this unit's items), so nothing to check against that ruling here.

## Claim 3 — each named correction present as the audit's finding asked

PASS, item by item:
- **Opening paragraph re-teaching `consume`:** removed; `guides/budget.md:6` no longer restates the `consume` mechanism (moved to a description of what a budget handle is and does), and § Surface's "What happens" at `:24` still owns the mechanism. No tagline clause (`:3-4`) is repeated in the new sentence.
- **`GUIDE_SPEC` at the former literal:** `tests/guides.test.ts:267` now reads `files[GUIDE_SPEC]`, matching the pilot's form; `GUIDE_SPEC` is declared at `:32` and is the sole reader of that path elsewhere in the file (report's claim, and no other `'guides/budget.md'` literal appears at the flagship-fences site in the read file).
- **`Shape` idiom (Ruling 12):** the convention sentence at `guides/budget.md:60` matches Ruling 12's exact wording ("bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`"), byte-identical to `rulings.md:50`. Every row in the table at `:62-68` follows the idiom: `BudgetOptions`/`TokenBudgetOptions`/`TokenUsage` use bare names, `BudgetInterface` splits data members from `plus start, consume, clear`, and `TokenScope` keeps its own escaped-pipe literal (unchanged, per Ruling 12's alias exception). The comparator's output in the report shows `missing: []`, `added: []`, and every `changed` entry's `col` is `Shape`.
- **See also:** `guides/budget.md:194` now reads `[`README.md`](README.md)`, link text matching the href.

## Findings outside the claims

None outside the enumerated three. The report's own Observations section (propagation of the idiom sentence to abort/csv/emitter/guide, and abort's own Ruling-12 departure) are self-disclosed carrier notes, not defects in this unit's scope, and are already routed per the audit verdict's Findings-carried table.

VERDICT: PASS

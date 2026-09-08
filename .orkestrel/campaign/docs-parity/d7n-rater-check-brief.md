# Closure brief — rater: the checker over the fix round (carrying the closing items)

## Lane

`checker` (Sonnet), blind and clean, over rater's fix round. Evidence under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`: `d7n-rater-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `d7n-rater-audit-verdict.md` (items RT1 to RT8); `d7n-rater-close-brief.md` (the closing generator's lists the fix round carried); Rulings 13, 20, 21, and 23 in `rulings.md`; the pilot `/home/user/fleet/abort/tests/guides.test.ts`; `/home/user/fleet/rater` at its tip.

## Claims

1. Every item the fix brief names landed in the diff as the brief states it, and nothing else changed (scope honesty against the status file: `guides/rater.md`, `README.md`, `src/core/types.ts`, `tests/guides.test.ts` and no other path).
2. The report's citations match the tree the unit left; the report states no count in prose.
3. Each named correction is present as the audit's finding asked: the Validators table heads `Shape` with the type each guard narrows to, under "In a guard table a `Shape` cell holds the type the guard narrows to." between the section's prose and the table, and the sentence pointing at the declarations is gone (RT1, Ruling 20); the `LineResult` `amount` and `RatingResult` `success` rules sit in the § Surface paragraph with the trailing clause closed, and the Types table's note keeps only the `emitter` and `[Methods](#methods)` sentence (RT2); a lead-in sentence sits between every heading or table and its fence (RT3, Ruling 21); `rate`'s description names `{@link RatingDefinition}` in `src/core/types.ts` and the guide cell equals it (RT4); the README's onboarding sentence links `@orkestrel/reason` (RT5); the overload case is named "returns equal results from the array-of-lines and rating-definition `rate` overloads" (RT6); the drop-in's lines 1 to 3 equal the pilot's and the region from `const root = ` through the manifest loop's closing brace equals the pilot's with the package's own block and cases appended (RT7, Rulings 13 and 21).

## Output

Per claim PASS, FAIL, or CANNOT RULE with evidence; findings outside the claims; one terminal `VERDICT: PASS` or `VERDICT: FAIL <claims>`; open with `Lane held: checker rater`. No process diary. Perform the assignment directly and spawn nothing; run no command, edit nothing.

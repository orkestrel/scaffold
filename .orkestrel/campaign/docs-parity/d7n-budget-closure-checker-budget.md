Lane held: checker budget

**Claim 1 — scope honesty.** PASS. `d7n-budget-close.status.txt` lists only ` M guides/budget.md` and ` M tests/guides.test.ts`; the diff (`d7n-budget-close.diff.txt`) touches only the `### Validators` table (adding the `Shape` column per the brief's item 1) and the two header/`INTERNAL` corrections in `tests/guides.test.ts` (brief's item 3). No `src/**` doc block was touched, matching the report's claim that no interface row needed a code-token move. Nothing else changed.

**Claim 2 — citations and no-count prose.** FAIL. The report's citations match the tree (the quoted diffs in `d7n-budget-close-report.md` reproduce the actual diff exactly), but the report states counts in violation of `AGENTS.md` § Writing ("NEVER state a count") and its own Output contract ("No count in prose"):
- `d7n-budget-close-report.md:42`: "Two corrections outside that region, both against the pilot's canon:" — states the count of a growable set (corrections).
- `d7n-budget-close-report.md:59`: "the applied edit rewraps the two lines to the pilot's exact wording" — states a count of lines.

**Claim 3 — the `Shape` idiom.** PASS.
- `guides/budget.md:38-45`: `### Validators` now heads `Shape` under the guard sentence (Ruling 20), each cell holding the narrowed type (`number`, `AbortSignal`, `TokenScope`, `TokenUsage`).
- `guides/budget.md:60-70`: `### Types` table's `Shape` cells carry bare member names, `?` on optional members, no member types spelled out; `grep` for `…` and for a spelled member type both print nothing (report, criterion 2).
- Cross-checked against `/home/user/fleet/budget/src/core/types.ts:15,39,100,120`: `BudgetOptions`, `TokenBudgetOptions`, and `TokenUsage` declare no call-signature members (`consumer` is a data property of function type), so their braces correctly carry no `plus`; `BudgetInterface` correctly lists `start, consume, clear` after `plus` (`types.ts:58,67,74`).
- No `### Constants` table exists in `guides/budget.md`, so Rulings 18/25 do not apply; no interface in `types.ts` uses `extends`, so no extended-interface cell applies (Ruling 21).

**Claim 4 — the drop-in's canon.** PASS. `tests/guides.test.ts:1-3` reads identically to the pilot `/home/user/fleet/abort/tests/guides.test.ts:1-3` (confirmed the "as is the executed section that closes the file" wording landed at line 3, and the `INTERNAL` doc block at `tests/guides.test.ts:38-41` reads "the assertion that follows it fails when a name here stops being stranded," matching the pilot's `tests/guides.test.ts:39-40` byte for byte). Comparing the region from `const root = ` (`tests/guides.test.ts:48`) through the manifest loop's closing brace (`tests/guides.test.ts:259`) against the pilot's corresponding region (`tests/guides.test.ts:47-258`) line by line: every statement, comment, and assertion matches; only the constants block above (imports, `MODULES`, `GUIDE_SPEC`) differs, which Ruling 20 permits as package-specific. The package's own `flagship fences` block (`tests/guides.test.ts:266-398`) sits appended after the shared region, per Ruling 20's own-cases-appended clause.

**Claim 5 — fence lead-ins and headings.** PASS. Every fence in `guides/budget.md` (Surface at line 14, and each `### Race work…`, `### A token budget…`, `### Re-arm per request…`, `### Reuse a handle…` section) has an intervening sentence between its heading and its fence (`guides/budget.md:12-14, 108-112, 126-131, 147-151, 162-166`); no heading sits directly above a fence. No heading carries a retired term (headings checked: Surface, Factories, Validators, Helpers, Classes, Types, Methods, Contract, Patterns, and the four pattern subheadings, Practices, Tests, See also). `/home/user/fleet/budget/README.md`'s `## Install` (line 12) and `## Usage` (line 23) fences sit directly under their headings, matching the pilot's convention (Ruling 24); the README was untouched by this unit's diff, consistent with it already conforming.

**Findings outside the claims.** None.

VERDICT: FAIL 2

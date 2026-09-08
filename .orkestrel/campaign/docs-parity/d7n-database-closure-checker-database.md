Lane held: checker database

## Claim 1 — every closing-brief item landed as stated; scope honesty

**PASS.** `git status --short` in `d7n-database-close.status.txt:1-12` lists exactly the twelve owned paths (`guides/database.md`, ten `src/**` files under item 5's list, `tests/guides.test.ts`); nothing off-limits (`README.md`, `package.json`, `package-lock.json`, `tests/src/**`) appears. Every hunk in `d7n-database-close.diff.txt` sits inside a `//` comment, a `/** */` doc block, a guide table cell, or an inserted lead-in sentence — no code token changed (confirmed by reading every hunk). Item 1's `DriverInterface` row change (`diff.txt:27-28`) matches the brief's required `StorageInterface plus {} plus open, close, snapshot, transaction?` exactly; item 4's ten lead-in insertions (`diff.txt:9,45,54,63,72,81,90,99,108,117`) match the brief's ten listed headings exactly; item 6's `above`→`preceding` edit (`diff.txt:36-37`) matches.

## Claim 2 — citations match the tree; no count in prose

**FAIL.** `d7n-database-close-report.md:176` and `:180` read:
```
$ npx oxfmt --check <the 10 owned src/**/*.ts paths>
...
$ npx oxlint --config .oxlintrc.json --deny-warnings <the 10 owned src/**/*.ts paths>
```
"10" states a count of a growable set (the owned `src/**` files) instead of naming them, which `AGENTS.md` § Writing bans unconditionally ("NEVER state a count... Name the members, or write the sentence without the number"). The rest of the report's citations (item 1, item 6, item 7 diffs; the acceptance-criteria command outputs) match `d7n-database-close.diff.txt` and `.status.txt` verbatim, so only this count defect fails the claim.

## Claim 3 — the `Shape` idiom

**FAIL.** `guides/database.md:241-242` (Constants table, unchanged by this diff):
```
| `DEFAULT_PRIMARY`          | const | `'id'`                   | ...
| `MAX_PATTERN_LENGTH`       | const | `1024`                   | ...
```
Ruling 21 (`rulings.md:97`): "A constants `Shape` cell holds the type the constant is declared or widened to (`string`, `number`, `RegExp`), never its literal type; Ruling 18 keeps the literal in the description... No unit narrows a cell to a literal type." These two cells hold literal values (`'id'`, `1024`), not `string` / `number`. The other three Constants rows (`CONFORMANCE_USERS_SCHEMA`, `CONFORMANCE_POSTS_SCHEMA`, `CONFORMANCE_SCHEMA`, lines 243-245) correctly hold types. The Types table's extended-interface row (`DriverInterface`, line 283) and convention sentence (line 249) are correct per Ruling 21; no `…` sits inside a `Shape` cell (confirmed by grep, report line 158); the mixed `### Helpers & guards` table (`guides/database.md:214-233`) correctly carries no `Shape` column per Ruling 20's mixed-table exception. The Constants-cell defect is outside this closing unit's diff (pre-existing) but is squarely inside claim 3's scope, so the claim fails on present evidence.

## Claim 4 — the drop-in's canon

**CANNOT RULE.** Lines 1-3 of `tests/guides.test.ts` equal the pilot's byte for byte (confirmed against `/home/user/fleet/abort/tests/guides.test.ts:1-3`). Beyond the header, `tests/guides.test.ts` in `/home/user/fleet/database` carries **two** `for (const entry of manifest)` loops (`guides.test.ts:112-258` and `:643-821`), where the pilot and Ruling 20 (`rulings.md:89`) describe one loop with "its own cases inside the manifest loop's `describe`... appended after the pilot's cases." The second loop does not merely append cases: it substitutes test names and logic present in the first loop (`documents every published entry export` / `documents only real entry exports` at lines 663-668, replacing the first loop's `documents every barrel export` / `documents only barrel exports` at lines 135-140) and adds `compiler entry surfaces` / `executable guide fences` blocks. The report (`d7n-database-close-report.md:53-66`) argues this is a pre-existing, architecturally required divergence (a multi-dir `GuideModule` needing compiler-derived surfaces) outside this unit's scope, not something it introduced. Whether Ruling 20's "cases appended" language permits a second full manifest loop with substituted test names for that reason is a judgment call no ruling resolves directly; I cannot decide it mechanically. Refer to the subjective lane (or the Orchestrator) whether the landed dual-loop structure satisfies Ruling 20's canon.

## Claim 5 — fence lead-ins, sibling-fence headings, retired terms, README fences

**PASS.** All ten headings the closing brief flagged as bare (`### Create a database`, `### Declaring tables in options`, `### Keyed CRUD`, `### Coercion through the contract`, `### Fluent queries`, `### Transactions`, `### Introspection & seeding`, `### Persistence with the JSON driver`, `### Persistence with the SQLite driver`, `### Persistence with the IndexedDB driver`) now carry a lead-in sentence per `diff.txt`. Sampled fences outside that list (`### Cursors` at `guides/database.md:1398-1407`, `### Driver primitives` at `:2008-2014`, `### IndexedDB error mapping` at `:2440-2445`) already carry prose before their fence, so no lead-in was owed. No heading in `guides/database.md` carries a retired term (`grep -n 'entities|Entities'` found nothing). `README.md:14-18` has its one fence directly under `## Install`, matching Ruling 24, and `README.md` is untouched by this diff (off-limits, correctly).

## Findings outside the claims

- `d7n-database-close-report.md:82-85` names three "unlisted sites... carried along for readability" (`browser/helpers.ts:50`, `core/Table.ts:50`, `core/helpers.ts:134`) beyond item 5's enumerated lines; each is same-sentence, same-defect, no code token moved, so this is a disclosed ancillary decision rather than a scope violation.
- The Constants-table literal-type defect (claim 3) and the dual manifest-loop question (claim 4) both predate this closing unit's diff; a successor unit or ruling should resolve them rather than reopening this unit's scope.

VERDICT: FAIL 2,3

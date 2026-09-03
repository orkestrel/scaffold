## Question
For each conform-table row, what the tree carries, what the diff changed, and whether the report matches the tree.

## Evidence

### `table-obj-2`
- **Site now:** The text-search test and `readFileSync` import are gone. The surrounding test is now `tests/src/core/Table.test.ts:68-90`; the shared symbol remains legitimately at `src/core/helpers.ts:69`, with behavioral coverage in `tests/src/core/helpers.test.ts:194-200` and `tests/src/core/tables/KeyManager.test.ts:10-88`.
- **Diff:** `@@ -1,6 +1,5 @@` and `@@ -66,30 +65,6 @@ describe('Table construction and derived state', () => {`. The deletion is present; no replacement `+` line is required.
- **Old-form sweep:** Pattern `\breadFileSync\b` over `src/**/*.ts`, `tests/**/*.ts`, `guides/table.md`, `guides/README.md`, and `README.md`: 28 legitimate hits remain, including `tests/guides.test.ts:16,87`; the removed `Table.test.ts` import has no hit. Pattern `\bcomputeKeys\b`: 24 legitimate hits remain. Pattern `new KeyManager`: 7 legitimate hits remain. Removed source paths have no hits. Raw old-form hits: 59.
- **Report reading:** The report marks the row `applied`: “Deleted the text-search `it` block and the `readFileSync` import from `tests/src/core/Table.test.ts`. No replacement added.” (`conform-table-report.md:14`). This matches the tree.
- **Proof reading:** The report records `npm --prefix /home/user/fleet/table run test:src` as not applicable for the deletion, with 103 passing tests in `table-obj-2-green.txt`. The control exists and reads `Tests 103 passed (103)`.

### `table-obj-3`
- **Site now:** `src/core/tables/RowManager.ts:140-143` computes `Number.isNaN(index) ? 0 : Math.max(0, Math.trunc(index))`; the following line returns on a no-op. `src/core/types.ts:458-459` documents that `NaN` puts the row first.
- **Diff:** `@@ -139,7 +139,7 @@ export class RowManager implements RowManagerInterface {`; the operative `Number.isNaN` repair is present in `+` line 142.
- **Old-form sweep:** No removed or renamed symbol, phrase, or path. Old-form hits: 0.
- **Report reading:** The report marks the row `applied`: “`RowManager.move` now clamps a non-finite index. Red first, then green.” (`conform-table-report.md:15`). This matches the tree.
- **Proof reading:** Command: `npm --prefix /home/user/fleet/table run test:src`. Red: `1 failed, 102 passed` in `table-obj-3-red.txt`, with the positive-infinity assertion failing at `tests/src/core/tables/RowManager.test.ts:114`. Green: `103 passed` in `table-obj-3-green.txt`. Both controls exist.

### `table-obj-4`
- **Site now:** `src/core/tables/PaginationManager.ts:71-74` sends `NaN` to page 1 and otherwise clamps the truncated page through `Math.min(this.count, ...)`. `#normalize` remains unchanged at `:97-99`.
- **Diff:** `@@ -68,7 +68,10 @@ export class PaginationManager implements PaginationManagerInterface {`; the equivalent repair is present in `+` lines 71-74. The exact nested ternary from the brief is not verbatim.
- **Old-form sweep:** No removed or renamed symbol, phrase, or path. Old-form hits: 0.
- **Report reading:** The report marks the row `applied`: “`PaginationManager.move` now clamps a non-finite page. Red first, then green. `#normalize` unchanged and still serves `resize`.” (`conform-table-report.md:16`). This matches the tree.
- **Proof reading:** Command: `npm --prefix /home/user/fleet/table run test:src`. Red: `1 failed, 103 passed` in `table-obj-4-red.txt`, with page `1` received instead of `2` at `tests/src/core/tables/PaginationManager.test.ts:30`. Green: `104 passed` in `table-obj-4-green.txt`. Both controls exist.

### `table-subj-1`
- **Site now:** `guides/table.md:1356-1358` states that manager classes and the key-set shell are internal and named by the parity list. The list is present at `tests/guides.test.ts:71-79`.
- **Diff:** `@@ -1354,10 +1354,11 @@ These invariants hold across [...]`; the replacement text is present in `+` lines 1357-1358.
- **Old-form sweep:** Case-insensitive pattern `Nothing in this module is internal|the parity suite's internal list is empty` over the mandated package paths: no hits.
- **Report reading:** The report marks the row `applied`: “Contract invariant 1's second sentence now states the internal list that ships.” (`conform-table-report.md:17`). This matches the tree.
- **Proof reading:** Documentation sweep, not behavioral proof. The report’s old-phrase sweep records no package hit; the independent sweep also returns no hit.

### `table-subj-2`
- **Site now:** `guides/table.md:226-230` contains the stable-read qualification and the metadata refusal sentence. However, `guides/table.md:172-175` still lists only the audit message and `The schema is not a table schema`; `guides/table.md:1298` still ends with “which the guard and the audit refuse first.” `tests/src/core/Table.test.ts:92-114` contains the accessor case and asserts the metadata message.
- **Diff:** Guide hunk `@@ -225,9 +224,11 @@`; the stable-read and accessor wording is present, but the brief’s exact “An ordinary schema never reaches it...” replacement is not verbatim. Test hunk `@@ -114,6 +89,31 @@`; the accessor test and message assertion are present. No diff hunk changes guide lines 173-176 or 1298.
- **Old-form sweep:** Pattern `createTable never reaches it|which the guard and the audit refuse first` returns `guides/table.md:1298` for the latter phrase. The required third-message placement is absent at `guides/table.md:173-175`. Semantic old-form hits: 1.
- **Report reading:** The report’s table marks the row `applied` and says the guide sentence was scoped and the accessor case was added (`conform-table-report.md:18`). Its deviation says “nothing from this row is in the tree” (`:162-169`), while its fix-round section says the accessor and guide sentence were added (`:211-250`). The applied-site statement matches the changed lines, but the report does not match the full operative repair because the Guards paragraph and error-table sentence remain unchanged.
- **Proof reading:** `table-subj-2a-accessor.txt` exists and reads `1 test file passed (1)` and `13 tests passed (13)`. The failing controls `table-subj-2-deep-vector.txt` and `table-subj-2-branch.txt` show the original fixtures failed to establish the requested path.

### `table-subj-3`
- **Site now:** The cited sites read as follows: `guides/table.md:7` “They all hold”; `:72` “the discriminant”; `:79` “the union discriminated”; `:84` “The axes ... and the slots”; `:95` “the union”; `:101` “its managers”; `:120-127` “the managers” and “Both members”; `:139` “the budgets”; `:161` “a declared column cell”; `:167` “The schema guards”; `:188` “the filter tests, the row passes”; `:249` “Each cell fixes”; `:365` “these things”; `:397` “These reads”; `:515` “These rules”; `:793` “the same verbs”; `:873` “The verbs that end things”; `:917` “Each event carries”; `:1021-1022` the two coercions without a tally; `:1087` “The schema guards”; `:1129` “The budgets”; `:1142` “the schema door and the value door”; `:1156` “The whole-schema ceilings”; `:1160` “Rows and the structural read”; `:1169-1171` “the domain faults listed below”; `:1214-1216` “the behavioral interfaces”; `:1224-1226` “one method with overloads”; `:1361` “Each interface has one table and one class”; `:1432-1433` the coercion sentence.
- **Diff:** The guide changes are covered by hunks `@@ -4,7 +4,7 @@`, `@@ -69,20 +69,19 @@`, `@@ -93,13 +92,13 @@`, `@@ -119,15 +118,15 @@`, `@@ -137,7 +136,7 @@`, `@@ -159,13 +158,13 @@`, `@@ -186,7 +185,7 @@`, `@@ -245,9 +246,9 @@`, `@@ -361,7 +362,7 @@`, `@@ -393,7 +394,7 @@`, `@@ -511,7 +512,7 @@`, `@@ -789,7 +790,7 @@`, `@@ -869,7 +870,7 @@`, `@@ -913,9 +914,8 @@`, `@@ -1018,9 +1018,9 @@`, `@@ -1084,7 +1084,7 @@`, `@@ -1126,7 +1126,7 @@`, `@@ -1139,7 +1139,7 @@`, `@@ -1153,22 +1153,22 @@`, `@@ -1211,9 +1211,9 @@`, `@@ -1221,8 +1221,8 @@`, `@@ -1354,10 +1354,11 @@`, `@@ -1366,11 +1367,11 @@`, `@@ -1428,8 +1429,8 @@`, `@@ -1487,7 +1488,7 @@`, and `@@ -1515,7 +1516,7 @@`. The replacement text is present in the `+` lines.
- **Old-form sweep:** The targeted removed tally phrases return no semantic hits. The remaining `guides/table.md:298` phrase “has two members” is an allowed operand-arity description. The report records 21 remaining numeral hits, each classified as a value, arity, example magnitude, or named-member reference.
- **Report reading:** The report marks the row `applied`: “Deleted every member tally in `guides/table.md`, then ruled every remaining numeral by sense.” (`conform-table-report.md:19`). This matches the tree’s changed prose, subject to the permitted `:298` arity phrase.
- **Proof reading:** Documentation sweep. The report records the remaining numerals and their permitted senses; the independent sweep agrees.

### `table-subj-4`
- **Site now:** `README.md:3` says “typed column cells”; `:8` says “budgets bound”; `:73-75` says “the column cells” and “the events.” Adjacent lines retain the surrounding guide paragraph.
- **Diff:** `@@ -1,11 +1,11 @@` and `@@ -70,11 +70,11 @@`; all four replacements are present in `+` lines.
- **Old-form sweep:** Case-insensitive patterns for `a schema of four column cells`, `six budgets`, `the four column cells`, and `the eight events`: no hits.
- **Report reading:** The report marks the row `applied` and says the member tallies were deleted at README lines 3, 8, 73, and 75 (`conform-table-report.md:20`). This matches the tree.
- **Proof reading:** Documentation sweep. The report records zero numeral-word hits in `README.md`; the independent sweep agrees.

### `table-subj-5`
- **Site now:** `src/core/types.ts:809-811` says “One manager holds each axis...” and names the managers. `src/core/validators.ts:55` says “True if the value is a declared column cell.” `tests/guides.test.ts:752` is titled “executes the value claims in its comments.”
- **Diff:** Types hunk `@@ -805,9 +806,9 @@`; validator hunk `@@ -52,7 +52,7 @@`; test hunk `@@ -749,7 +749,7 @@`. Each operative replacement is present in `+` lines.
- **Old-form sweep:** Patterns for `Six managers`, `one of the four column cells`, and `its three value claims`: no hits.
- **Report reading:** The report marks the row `applied`: “`types.ts` manager tally, `validators.ts` cell tally, and the `guides.test.ts` test title.” (`conform-table-report.md:21`). This matches the tree.
- **Proof reading:** Documentation sweep; the report records no old tally hits, matching the independent sweep.

### `table-subj-6`
- **Site now:** `src/core/types.ts:356-360` has the `TableOptions` description followed by `@remarks`; the phantom `@param options` tag is absent. Valid receiving tags remain at `src/core/Table.ts:57-60` and `src/core/factories.ts:6-10`.
- **Diff:** `@@ -355,7 +355,6 @@ export type TableEventMap = {`; the removed tag has no replacement `+` line.
- **Old-form sweep:** Invalid `@param options` placement has no hit. The raw pattern still finds the two valid receiving tags at `src/core/Table.ts:59` and `src/core/factories.ts:8`.
- **Report reading:** The report marks the row `applied`: “Deleted the `@param options` tag from the `TableOptions` doc block. The block runs description, `@remarks`, `@example`.” (`conform-table-report.md:22`). This matches the tree.
- **Proof reading:** Documentation sweep; the two remaining valid tags match the report.

### `table-subj-7`
- **Site now:** `guides/table.md:1441-1442` reads “The wording of its strings is not. Never parse them.” The preceding invariant text remains intact.
- **Diff:** `@@ -1438,7 +1439,7 @@ These invariants hold across [...]`; the imperative replacement is present in `+` line 1442.
- **Old-form sweep:** Case-insensitive pattern `\bshould(s|ed|ing)?\b` over the mandated package paths: no hits.
- **Report reading:** The report marks the row `applied`: “Contract invariant 20 now reads ‘The wording of its strings is not. Never parse them.’” (`conform-table-report.md:23`). This matches the tree.
- **Proof reading:** Documentation sweep; the report and independent sweep both find no package hit.

### `fleet-F1`
- **Site now:** `isBrowserVuePath` is absent from the checkout. The workspace has no `src/browser`, `app/browser`, or `tests/setupBrowser.ts` path in the supplied evidence.
- **Diff:** No hunk. The helper is absent, so the prescribed edit is not applicable.
- **Old-form sweep:** Case-insensitive whole-checkout pattern `isBrowserVuePath`, excluding `node_modules`: no hit.
- **Report reading:** The report marks the row `noop`: “`tests/setup.ts` declares no `isBrowserVuePath`. A tree-wide search for the name returned nothing outside `node_modules`.” (`conform-table-report.md:24`). This matches the tree.
- **Proof reading:** Placement/no-op sweep only; the report’s sweep agrees.

### `fleet-F2`
- **Site now:** No implementation class in `src/**/*.ts` declares a public `readonly id: string` field. No guide or test fence serializes a manager instance with `JSON.stringify`; the only serialization hits concern table/schema values at `guides/table.md:999,1002` and related table tests.
- **Diff:** No hunk. The prescribed class transformation is not applicable.
- **Old-form sweep:** `\breadonly id\s*:\s*string\b` over `src/**/*.ts`: no hit. `isBrowserVuePath` is unrelated and absent.
- **Report reading:** The report marks the row `noop`: “No implementation class declares a public `readonly id: string` data field.” (`conform-table-report.md:25`). This matches the tree.
- **Proof reading:** Naming/placement sweep only; no serialization blocker exists.

### Across-unit scope
The status evidence lists only owned paths: `README.md`, `guides/table.md`, the two manager implementations, `src/core/types.ts`, `src/core/validators.ts`, `tests/guides.test.ts`, and the three mirrored tests (`conform-table.status:1-10`). Every path is tagged `owned`. No shared or off-limits path appears. Every diff hunk belongs to a file named by at least one row’s `Where`; there is no unassigned `file @@ hunk`.

### Residue
- Diff `+`-line pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`: no hits.
- Tree pattern over `src` and `tests`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`: no hits.
- The excluded vendored files contain expected policy fixtures and distribution controls; they are outside this residue population.

### Parity
| Entity | Type signatures | Guide `## Methods` rows | Readonly data and guide surface |
|---|---|---|---|
| `TableOptions` | No call signatures; `src/core/types.ts:380-385` | No method table; `guides/table.md:108` | `on`, `error`, `rows`, `comparators`, `matchers`, `limit`; named by `guides/table.md:108` |
| `RowManagerInterface` | `row:409`, `rows:415`, `add:424,432`, `update:441,453`, `move:462`, `remove:469,476,484` | `guides/table.md:1243-1248` lists `row`, `rows`, `add`, `update`, `move`, `remove` | No readonly data properties |
| `PaginationManagerInterface` | Properties `page:774`, `limit:776`, `offset:778`, `count:780`; methods `move:788`, `resize:799` | `guides/table.md:1286-1287` lists `move`, `resize` | Surface names the properties at `guides/table.md:115,120-126` |
| `TableInterface` | Properties `emitter:823`, `schema:825`, `rows:827`, `sort:830`, `filter:832`, `selection:834`, `expansion:836`, `pagination:838`, `view:845`, `count:847`, `destroyed:849`; methods `clear:857`, `destroy:866` | `guides/table.md:1232-1237` lists `clear`, `destroy` | Surface names all properties at `guides/table.md:120-126`; the guide excludes them from `## Methods` at `:1214-1218` |
| `RowManager` | Implementation `move` at `src/core/tables/RowManager.ts:135-143` | Matches `RowManagerInterface` table at `guides/table.md:1243-1248` | No exposed data property |
| `PaginationManager` | Implementation `move` at `src/core/tables/PaginationManager.ts:69-76`; `resize` at `:80-94` | Matches `PaginationManagerInterface` table at `guides/table.md:1286-1287` | Data is exposed through the interface properties named above |

The backticked public identifiers added or retained in changed guide prose—`ColumnCell`, `TableColumn`, `TableTerm`, `TableDirection`, `TableOrder`, `FilterOperator`, `CellComparator`, `CellMatcher`, `TableInterface`, `TableKey`, `TableError`, `TableEventMap`, `isColumnCell`, `computeKeys`, `matchesTerms`, `filterRows`, `sortRows`, `cloneSchema`, `createTable`, `isTableColumn`, `serializeTable`, `parseRows`, `auditTable`, and `isTableError`—are exported through `src/core/index.ts:1-9`. Backticked member names such as `cell`, `column`, `meta`, `rows`, `selection`, `pagination`, `page`, `limit`, `offset`, `view`, and `count` are interface members or literals, not standalone barrel exports.

### Gates
The report quotes these commands and exits:

| Command | Exit |
|---|---:|
| `npm --prefix /home/user/fleet/table run format:check` | 0 |
| `npm --prefix /home/user/fleet/table run lint:check` | 0 |
| `npm --prefix /home/user/fleet/table run check` | 0 |
| `npm --prefix /home/user/fleet/table run build` | 0 |
| `npm --prefix /home/user/fleet/table test` | 0 |

The independent gate controls exist. The supplied `gate-test.txt` reads `src:core` 104 passed, `policy` 111 passed, `config` 46 passed, `setup` 12 passed, and `guides` 82 passed.

### Breaking
The report’s § Breaking says: “None. No published symbol was renamed or removed. `src/core/index.ts` is unchanged and the barrel's surface is identical.” (`conform-table-report.md:178-179`). No renamed or removed published symbol exists, so the requested fleet-wide old-name sweep has no symbol population to search.

### Writing sweep
- Diff `+`-line prose pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`: no hits in changed guide prose, README prose, source comments, test titles, or test comments.
- Diff `+`-line count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`: no hits.

## Distillate
- `table-obj-2: tests/src/core/Table.test.ts:68-90 deletion | diff present yes | old form hits 59 raw legitimate residuals | report matches yes`
- `table-obj-3: RowManager.ts:140-143 | diff present yes | old form hits 0 | report matches yes`
- `table-obj-4: PaginationManager.ts:71-74 | diff present yes | old form hits 0 | report matches yes`
- `table-subj-1: guides/table.md:1356-1358 | diff present yes | old form hits 0 | report matches yes`
- `table-subj-2: guide :226-230 and test :92-114, but guide :173-175 and :1298 remain stale | diff present yes | old form hits 1 | report matches no`
- `table-subj-3: guide tally sites rewritten; permitted arity/value numerals remain | diff present yes | old form hits 0 after sense ruling | report matches yes`
- `table-subj-4: README.md:3,8,73-75 | diff present yes | old form hits 0 | report matches yes`
- `table-subj-5: types.ts:809-811, validators.ts:55, guides.test.ts:752 | diff present yes | old form hits 0 | report matches yes`
- `table-subj-6: types.ts:356-360 | diff present yes | old form hits 0 invalid-placement hits; 2 valid tags remain | report matches yes`
- `table-subj-7: guides/table.md:1441-1442 | diff present yes | old form hits 0 | report matches yes`
- `fleet-F1: `isBrowserVuePath` absent | diff present no | old form hits 0 | report matches yes`
- `fleet-F2: no public readonly `id` data field | diff present no | old form hits 0 | report matches yes`

Scope tags: all ten status entries are `owned`; no shared or off-limits entry appears. No unassigned diff hunk exists.

Residue: no added-line or in-scope tree hits for skip, only, todo, retry, timeout, TODO, FIXME, console, or debugger.

Writing: no banned prose hits and no growable-set count hits in diff additions.

Parity: method tables match the changed interfaces and classes; readonly properties are documented in Surface rows; changed public identifiers resolve through `src/core/index.ts`.

## Unknowns
- The full intended `table-subj-2` repair is unresolved because the supplied tree does not change `guides/table.md:173-176` or `:1298`, despite the report marking the row applied.
- Independent gate execution was not performed in this read-only pass; gate readings come from the supplied proof files and report.
- No published symbol was renamed or removed, so the breaking-symbol sweep is vacuous.

## Journal
Leave this line for the driver.

## Deviation
The containment evidence shows ten modified files, all under the brief’s Owned scope, with no untracked file (`conform-table.status:1-10`). This audit made no tree changes. All supplied briefs, diff, status, report, and referenced proof files were readable. No required sweep was unreachable.
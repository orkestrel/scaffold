## Question

For every unit row, map the current tree, its diff, old-form sweeps, and the report's reading.

## Evidence

### `table-obj-2`

- **Site now.** The `readFileSync` import and the text-search test no longer exist at the brief's `tests/src/core/Table.test.ts:69-91`; the following test now starts at `tests/src/core/Table.test.ts:68-88`. The shared behavior remains at `tests/src/core/tables/KeyManager.test.ts:10-28`, with axis coverage at `tests/src/core/tables/SelectionManager.test.ts:10-18` and `tests/src/core/tables/ExpansionManager.test.ts:10-18`.
- **Diff at the site.** `conform-table.diff:482` has `@@ -1,6 +1,5 @@`; `conform-table.diff:489` has `@@ -66,30 +65,6 @@ describe('Table construction and derived state', () => {`. The import and test are removed; no replacement text is required.
- **Old-form sweep.** `\breadFileSync\b` over `src`, `tests`, `guides/table.md`, `guides/README.md`, and `README.md` finds no hit in `tests/src/core/Table.test.ts`. Retained legitimate hits are in `tests/guides.test.ts:16,87`, `tests/distribution.test.ts:15,192`, `tests/setupPolicy.ts:5,809,899,1315,1366,1399,1514,1517,1662,1790`, and `tests/config.test.ts:5,434,479,575,597,643-644,697,720,892-893,926,1143,1146`.
- **Report reading.** The report marks the row applied and says, “Deleted the text-search `it` block and the `readFileSync` import from `tests/src/core/Table.test.ts`. No replacement added.” (`conform-table-report.md:13`). The current file and diff match that sentence.
- **Proof reading.** The control file exists at `/home/user/work/evidence/table-proofs/table-obj-2-green.txt`. It records `Test Files 16 passed (16)` and `Tests 103 passed (103)`.

### `table-obj-3`

- **Site now.** The brief's `RowManager.ts:140-143` is now `src/core/tables/RowManager.ts:139-143`: preceding context is the missing-key return at line 138, the target is `Number.isNaN(index) ? 0 : Math.max(0, Math.trunc(index))`, and following context is the no-op check at line 144. The defect test is at `tests/src/core/tables/RowManager.test.ts:104-119`.
- **Diff at the site.** `conform-table.diff:398` has `@@ -139,7 +139,7 @@ export class RowManager implements RowManagerInterface {`; its `+` line at `conform-table.diff:403` contains the operative repair. The test hunk is `@@ -110,7 +110,13 @@` at `conform-table.diff:557`, with positive infinity, `NaN`, and negative infinity assertions.
- **Old-form sweep.** `Number.isFinite(index)` over the scoped source and test paths: no hit. The replacement `Number.isNaN(index) ? 0 : Math.max(0, Math.trunc(index))` appears at `src/core/tables/RowManager.ts:142`.
- **Report reading.** The report marks the row applied: “`RowManager.move` now clamps a non-finite index. Red first, then green.” (`conform-table-report.md:14`). The current implementation and test carry that reading.
- **Proof reading.** The command was `npm --prefix /home/user/fleet/table run test:src`. The red control records `Tests 102 passed (103)` with one failed assertion at `tests/src/core/tables/RowManager.test.ts:114` (`table-obj-3-red.txt`). The green control records `Tests 103 passed (103)` (`table-obj-3-green.txt`).

### `table-obj-4`

- **Site now.** The brief's `PaginationManager.ts:71` is now `src/core/tables/PaginationManager.ts:69-74`; line 68 is the gate call, lines 69-73 compute the clamped page, and line 74 checks the no-op. `#normalize` remains at `src/core/tables/PaginationManager.ts:98-100`. Tests are at `tests/src/core/tables/PaginationManager.test.ts:19-49`.
- **Diff at the site.** `conform-table.diff:382` has `@@ -68,7 +68,10 @@`; its `+` lines at `conform-table.diff:387-390` implement the equivalent repair. The test hunk is `@@ -25,10 +25,27 @@` at `conform-table.diff:524`.
- **Old-form sweep.** `Math.min(this.count, this.#normalize(page))` and `Number.isFinite(page)` over the scoped source and test paths: no hit. `Number.isFinite(value)` remains intentionally at `src/core/tables/PaginationManager.ts:98` for page-size normalization.
- **Report reading.** The report marks the row applied: “`PaginationManager.move` now clamps a non-finite page. Red first, then green. `#normalize` unchanged and still serves `resize`.” (`conform-table-report.md:15`). The current source matches.
- **Proof reading.** The command was `npm --prefix /home/user/fleet/table run test:src`. The red control records `Tests 103 passed (104)` with one failed assertion at `tests/src/core/tables/PaginationManager.test.ts:30` (`table-obj-4-red.txt`). The green control records `Tests 104 passed (104)` (`table-obj-4-green.txt`). The added resize coverage is present at `tests/src/core/tables/PaginationManager.test.ts:38-49`.

### `table-subj-1`

- **Site now.** The brief's `guides/table.md:1355-1357` is now `guides/table.md:1353-1356`. The preceding sentence is “Every row in the `## Surface` tables is a real barrel export...” at line 1353; the repaired sentence is at lines 1355-1356; invariant 2 follows at line 1357.
- **Diff at the site.** `conform-table.diff:309` has `@@ -1354,10 +1352,11 @@`. The `+` lines at `conform-table.diff:314-315` contain the prescribed internal-list text.
- **Old-form sweep.** Case-insensitive `Nothing in this module is internal|internal list is empty` over the scoped package paths: no hit.
- **Report reading.** The report marks the row applied: “Contract invariant 1's second sentence now states the internal list that ships.” (`conform-table-report.md:16`). `guides/table.md:1355-1356` carries that statement.
- **Proof reading.** This is a documentation row. The report's sweep is the clean count-pattern sweep at `conform-table-report.md:77-80`; the scoped sweep agrees.

### `table-subj-2`

- **Site now.** The guide remains unchanged at `guides/table.md:227-229` and `guides/table.md:1296`. The first still says, “`createTable` never reaches it...” and the error row still says, “which the guard and the audit refuse first.” `src/core/Table.ts:64-73` still contains the `cloneSchema` attempt and re-guard branch. `src/core/Table.test.ts:93-115` still has the unstable-metadata fixture without the prescribed message assertion.
- **Diff at the site.** No diff hunk touches the named guide regions or adds the prescribed test assertion. The report's diff contains only the `table-obj-2` deletion in the same test file at `conform-table.diff:489`.
- **Old-form sweep.** Case-insensitive sweep over the scoped package paths finds the retained old claims at `guides/table.md:229` and `guides/table.md:1296`. The prescribed phrase `column "id" has metadata that cannot be owned` has no tree hit.
- **Report reading.** The report marks the row stopped: “The branch the row rests on is not reachable the way the row states, and the prescribed test tightening fails.” (`conform-table-report.md:17`). The deep-vector control records the received message `The table schema is unusable: The schema is not a table schema` instead of the prescribed clone message (`table-subj-2-deep-vector.txt`). The branch-failure control records `expected false to be true` for the structural-guard assertion (`table-subj-2-branch.txt`). The report matches the supplied evidence.
- **Proof reading.** The prescribed assertion is red: `Tests 102 passed (103)` with one failed test at `tests/src/core/Table.test.ts:90` (`table-subj-2-deep-vector.txt`). The alternate vector fails earlier at `tests/src/core/Table.test.ts:106` (`table-subj-2-branch.txt`).

### `table-subj-3`

- **Site now.** The cited sites now carry these forms; each entry gives the current line and one-line surrounding context:
  - Brief `:7` → `guides/table.md:7`: “They all hold”; context `:6` is the blockquote lead and `:8` begins “a set of records”.
  - Brief `:72` → `:72`: “the discriminant”; context `:71` is `TableCell`, `:73` is `ColumnChoice`.
  - Brief `:79` → `:79`: “the union discriminated on `cell`”; context `:78` is `ChoiceColumn`, `:80` is `TableSchema`.
  - Brief `:84` → `:84`: “The axes ... and the slots”; context `:83` is `### The lens`, `:85` starts the table.
  - Brief `:89` → `:95`: “the union discriminated on `operator`”; context `:94` is `EqualsFilter`, `:96` is `CellComparator`.
  - Brief `:96` → `:101`: “The entity, its managers”; context `:100` is `### The table`, `:102` starts the table.
  - Brief `:102` → `:121`: “the managers `rows`, `sort`, `filter`”; context `:120` starts the Surface paragraph, `:122` continues the manager list.
  - Brief `:122` → `:127`: “Both members spelled `count`”; context `:126` ends the property list, `:128` continues “it belongs”.
  - Brief `:128` → `:139`: “The cell registry and the budgets”; context `:138` is `### Constants`, `:140` continues “under a consumer”.
  - Brief `:140` → `:161`: “a declared column cell”; context `:160` is the `TableCell` guard row, `:162` is `ColumnChoice`.
  - Brief `:162` → `:167`: “The schema guards answer”; context `:166` is the `isTableSchema` row, `:168` starts the structural explanation.
  - Brief `:168` → `:188`: “the filter tests, the row passes”; context `:187` contains the preceding helper list, `:189` starts the audit sentence.
  - Brief `:248` → `:247`: “Each cell fixes”; context `:246` is `## Cells`, `:248` continues “apply”.
  - Brief `:364` → `:363`: “it asks these things”; context `:362` closes the example, `:364` continues the comparison explanation.
  - Brief `:396` → `:395`: “These reads turn”; context `:394` is `### Reading a column`, `:396` continues the sentence.
  - Brief `:514` → `:513`: “These rules follow”; context `:512` closes the preceding example, `:514` starts the first rule.
  - Brief `:792` → `:791`: “the same verbs”; context `:790` is `### Selection and expansion`, `:792` continues the list.
  - Brief `:872` → `:871`: “The verbs that end things”; context `:870` ends the lifecycle paragraph, `:872` starts the bullets.
  - Brief `:916` → `:915`: “Each event carries”; context `:914` is `## Events`, `:916` starts the event table.
  - Brief `:1021` → `:1019-1021`: “coerces a numeric string ... and nothing else”; context `:1018` ends the preceding paragraph, `:1022` starts the strictness paragraph.
  - Brief `:1087` → `:1085`: “The schema guards are where”; context `:1084` closes the example, `:1086` continues the explanation.
  - Brief `:1129` → `:1127`: “The budgets bound”; context `:1126` is `### Budgets`, `:1128` continues “unbounded”.
  - Brief `:1142` → `:1140`: “They bind at the schema door and the value door”; context `:1139` is the final budget table row, `:1141` starts the schema-door paragraph.
  - Brief `:1156` → `:1154`: “The whole-schema ceilings”; context `:1153` is the `STRING_LIMIT` paragraph, `:1155` continues the ceiling explanation.
  - Brief `:1160` → `:1158`: “Rows and the structural read stay unbounded”; context `:1157` is the preceding ceiling sentence, `:1159` continues the row-budget explanation.
  - Brief `:1169-1171` → `:1167-1169`: “It reports the domain faults listed below”; context `:1166` is `### Auditing a schema`, `:1170` starts the fault list.
  - Brief `:1214` → `:1212`: “The public methods ... behavioral interfaces”; context `:1211` is `## Methods`, `:1213` continues “nothing to”.
  - Brief `:1216` → `:1214`: “here: `TableInterface`'s ... its managers”; context `:1213` contains the preceding sentence, `:1215` names the remaining readonly members.
  - Brief `:1224-1225` → `:1222-1223`: “one method with overloads rather than several methods”; context `:1221` is the callable-type sentence, `:1224` continues the overload explanation.
  - Brief `:1360` → `:1359`: “Each interface has one table and one class”; context `:1358` ends invariant 2's first sentence, `:1360` starts invariant 3.
- **Diff at the site.** The guide's relevant hunk headers are `conform-table.diff:39,48,72,88,108,117,133,142,155,164,173,182,191,200,212,225,234,243,252,285,298,309,323,340,360,369`. The operative replacements appear in the `+` lines. The additional count removals in the Tests section are at `conform-table.diff:360` and `conform-table.diff:369`.
- **Old-form sweep.** Case-insensitive sweep of the listed old phrases over `src`, `tests`, `guides/table.md`, `guides/README.md`, and `README.md`: no hit. The report's remaining-number sweep records permitted values, arities, named-member descriptions, and example magnitudes at `conform-table-report.md:80-88`; the scoped sweep agrees.
- **Report reading.** The report marks the row applied: “Deleted every member tally in `guides/table.md`, then ruled every remaining numeral by sense.” (`conform-table-report.md:18`). The cited current lines carry the replacement wording.
- **Proof reading.** This is a documentation row. The report records the numeral sweep and its classifications at `conform-table-report.md:79-88`; the independent sweep agrees.

### `table-subj-4`

- **Site now.** The brief's README sites are now `README.md:3`, `README.md:8`, `README.md:73`, and `README.md:75`. They read “typed column cells,” “budgets bound,” “the column cells,” and “the events.” The adjacent lines preserve the original explanatory text and Usage fence.
- **Diff at the site.** `conform-table.diff:5` has `@@ -1,11 +1,11 @@`; `conform-table.diff:19` has `@@ -70,11 +70,11 @@`. The operative replacements appear at `conform-table.diff:9`, `:15`, `:24`, and `:29-31`.
- **Old-form sweep.** Case-insensitive sweep for `a schema of four column cells|six budgets bound what one schema may retain|the four column cells|the eight events` over the scoped package paths: no hit.
- **Report reading.** The report marks the row applied: “Deleted the member tallies at `README.md` lines 3, 8, 73, and 75.” (`conform-table-report.md:19`). The current lines carry that reading.
- **Proof reading.** This is a documentation row. The report records a zero-hit README numeral sweep at `conform-table-report.md:80`; the scoped sweep agrees.

### `table-subj-5`

- **Site now.** The brief's `types.ts:808` is now `src/core/types.ts:809-811`, beginning “One manager holds each axis...”; `validators.ts:55` remains the declaration at `src/core/validators.ts:55`; `tests/guides.test.ts:752` now reads `executes the value claims in its comments`.
- **Diff at the site.** The type hunk is `conform-table.diff:439`, `@@ -805,9 +806,9 @@`; the validator hunk is `conform-table.diff:456`, `@@ -52,7 +52,7 @@`; the test-title hunk is `conform-table.diff:469`, `@@ -749,7 +749,7 @@`. The prescribed replacement text appears in each `+` line.
- **Old-form sweep.** `Six managers hold everything that moves|one of the four column cells|executes its three value claims` over the scoped package paths: no hit. `@param options` remains only on receiving functions at `src/core/Table.ts:59` and `src/core/factories.ts:8`.
- **Report reading.** The report marks the row applied: “`types.ts` manager tally, `validators.ts` cell tally, and the `guides.test.ts` test title.” (`conform-table-report.md:20`). The current sites match.
- **Proof reading.** This is a documentation row. The report's `@param options` and prose sweeps are at `conform-table-report.md:80-82`; the scoped sweeps agree.

### `table-subj-6`

- **Site now.** The brief's `types.ts:358` no longer contains `@param options`. The block at `src/core/types.ts:356-359` now runs from “Describes how to open a table” to `@remarks`; the receiving tags remain at `src/core/Table.ts:59` and `src/core/factories.ts:8`.
- **Diff at the site.** `conform-table.diff:411` has `@@ -355,7 +355,6 @@ export type TableEventMap`; the removed tag is the only changed line. No replacement is required.
- **Old-form sweep.** `@param options` over `src/**`: hits only `src/core/Table.ts:59` and `src/core/factories.ts:8`; no hit occurs in the `TableOptions` interface block.
- **Report reading.** The report marks the row applied: “Deleted the `@param options` tag from the `TableOptions` doc block. The block runs description, `@remarks`, `@example`.” (`conform-table-report.md:21`). The current block matches.
- **Proof reading.** This is a documentation row. The report records the clean `@param options` placement sweep at `conform-table-report.md:81-82`; the scoped sweep agrees.

### `table-subj-7`

- **Site now.** The brief's `guides/table.md:1441` is now `guides/table.md:1440`: “wording of its strings is not. Never parse them.” The preceding line is invariant 20's first sentence, and the following line starts invariant 21.
- **Diff at the site.** `conform-table.diff:351` has `@@ -1438,7 +1437,7 @@`; `conform-table.diff:356` contains the exact replacement in a `+` line.
- **Old-form sweep.** Case-insensitive `\bshould\b` and the old sentence over the scoped package paths: no hit.
- **Report reading.** The report marks the row applied: “Contract invariant 20 now reads ‘The wording of its strings is not. Never parse them.’” (`conform-table-report.md:22`). The current guide matches.
- **Proof reading.** This is a documentation row. The report records the clean `should` sweep at `conform-table-report.md:75-77`; the scoped sweep agrees.

### `fleet-F1`

- **Site now.** `isBrowserVuePath` has no hit outside `node_modules`; no browser source or setup helper requires the fleet repair.
- **Diff at the site.** No diff hunk touches `tests/setup.ts` or `tests/setup.test.ts`.
- **Old-form sweep.** `isBrowserVuePath` over the checkout excluding `node_modules`: no hit.
- **Report reading.** The report marks `noop`: “`tests/setup.ts` declares no `isBrowserVuePath`. A tree-wide search for the name returned nothing outside `node_modules`.” (`conform-table-report.md:23`). The current tree matches.
- **Proof reading.** Placement sweep agrees; no behavioral control is applicable.

### `fleet-F2`

- **Site now.** `readonly id: string` has no hit under `src`; no implementation class has the ruled public data-field shape. The `JSON.stringify` sweep over tests and guide fences finds only schema and row serialization at `tests/src/core/Table.test.ts:134,182,184`, `tests/src/core/parsers.test.ts:181-189`, `tests/guides.test.ts:622,625`, and `guides/table.md:997,1000`; no class instance serialization is involved.
- **Diff at the site.** No implementation-class hunk adds or changes an `id` field.
- **Old-form sweep.** `readonly\s+id\s*:\s*string` over `src/**`: no hit.
- **Report reading.** The report marks `noop`: “No implementation class declares a public `readonly id: string` data field.” (`conform-table-report.md:24`). The current tree matches.
- **Proof reading.** Placement sweep agrees; no F2 transformation or serialization control is applicable.

### Across the unit

- **Scope.** The status file lists ten modified paths, all `owned` under the brief's Scope: `README.md`; `guides/table.md`; `src/core/tables/PaginationManager.ts`; `src/core/tables/RowManager.ts`; `src/core/types.ts`; `src/core/validators.ts`; `tests/guides.test.ts`; `tests/src/core/Table.test.ts`; `tests/src/core/tables/PaginationManager.test.ts`; and `tests/src/core/tables/RowManager.test.ts` (`conform-table.status:1-10`). No shared or off-limits path is listed.
- **Hunks whose files are named only in repairs rather than the `Where` field:** `tests/guides.test.ts @@ -749,7 +749,7 @@` with `+ it('executes the value claims in its comments', ...)` (`conform-table.diff:469-474`); `tests/src/core/tables/PaginationManager.test.ts @@ -25,10 +25,27 @@` with `+ table.pagination.move(Number.POSITIVE_INFINITY)` (`conform-table.diff:524-528`); and `tests/src/core/tables/RowManager.test.ts @@ -110,7 +110,13 @@` with `+ expect(table.rows.move('2', Number.POSITIVE_INFINITY)).toBe(true)` (`conform-table.diff:557-562`). Each is named by its row's repair.
- **Residue.** The diff-plus sweep `^\+[^+].*(\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger)` returned no hits (`conform-table.diff`). The same pattern over `src` and `tests`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`, returned no hits. The unscoped hits are confined to excluded vendored tests: `tests/distribution.test.ts:44,684`, `tests/setupPolicy.ts:1238-2687`, and `tests/config.test.ts:687,945,950`.
- **Parity.** `src/core/index.ts:1-10` star-exports `types`, `constants`, `errors`, `validators`, `helpers`, `cloners`, `parsers`, `factories`, and `Table`. The guide's added public identifiers are covered by those exports: `ColumnCell`, `TableColumn`, `TableFilter`, `TableKey`, `isColumnCell`, `parseRows`, `parseTable`, `auditTable`, `COLUMN_LIMIT`, `TableInterface`, `KEY`, `CELL`, and `COLUMN`. The tokens `sortable`, `filterable`, `number`, `flag`, `true`, `false`, `meta`, `src/core`, `## Surface`, and `## Methods` are descriptive tokens or literals, not barrel exports. Member expressions such as `table.count`, `table.pagination.count`, `rows.add`, `rows.update`, `rows.remove`, `sort.set`, `sort.remove`, `filter.set`, `filter.remove`, `selection`, and `expansion` are interface members, not direct barrel symbols; their declarations are documented in the Surface and Methods tables.
- **Parity table:**

| Entity | Type call-signature members | Guide method rows | Readonly data properties and guide Surface |
|---|---|---|---|
| `RowManagerInterface` | `row` `types.ts:409`; `rows` `415`; `add` overloads `424,432`; `update` overloads `441,453`; `move` `462`; `remove` overloads `469,476,484` | `guides/table.md:1241-1246` | No readonly data properties |
| `PaginationManagerInterface` | `move` `types.ts:788`; `resize` `799` | `guides/table.md:1286-1287` | `page`, `limit`, `offset`, `count` at `types.ts:775,777,779,781`; named in the Surface paragraph at `guides/table.md:125-128` and entity row at `guides/table.md:115` |
| `TableInterface` | `clear` `types.ts:857`; `destroy` `865` | `guides/table.md:1234` | `emitter`, `schema`, `rows`, `sort`, `filter`, `selection`, `expansion`, `pagination`, `view`, `count`, `destroyed` at `types.ts:824-849`; named in `guides/table.md:121-128` and entity row `guides/table.md:106` |

- **Gates.** The report records these lines verbatim (`conform-table-report.md:185-195`):

| Command | Exit |
|---|---:|
| `npm --prefix /home/user/fleet/table run format:check` | 0 |
| `npm --prefix /home/user/fleet/table run lint:check` | 0 |
| `npm --prefix /home/user/fleet/table run check` | 0 |
| `npm --prefix /home/user/fleet/table run build` | 0 |
| `npm --prefix /home/user/fleet/table test` | 0 |

- **Breaking.** The report's § Breaking says, “None. No published symbol was renamed or removed. `src/core/index.ts` is unchanged and the barrel's surface is identical.” (`conform-table-report.md:171-174`). No fleet old-name sweep is applicable.
- **Writing sweep.** The diff-plus case-insensitive substitution sweep for `should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e.g.|i.e.|etc.|please|sanity|dummy|ensure|guarantee` returned no hits. The growable count pattern over the same diff-plus prose lines also returned no hits. The report's separate package-prose sweep records four `should` hits only in shared mirrors `guides/contract.md`, `guides/guide.md`, and `guides/test.md` (`conform-table-report.md:75-77`).

## Distillate

```text
table-obj-2: deleted test/import at tests/src/core/Table.test.ts:1,65 | diff present yes | old form hits 0 at target | report matches yes
table-obj-3: RowManager.ts:139-143 and RowManager.test.ts:104-119 | diff present yes | old form hits 0 | report matches yes
table-obj-4: PaginationManager.ts:69-74 and PaginationManager.test.ts:19-49 | diff present yes | old form hits 0 | report matches yes
table-subj-1: guides/table.md:1353-1356 | diff present yes | old form hits 0 | report matches yes
table-subj-2: guide claims unchanged at guides/table.md:229,1296; row stopped | diff present no | old form hits 2 | report matches yes
table-subj-3: guide replacements at guides/table.md:7-1359 and 1430 | diff present yes | old form hits 0 | report matches yes
table-subj-4: README.md:3,8,73,75 | diff present yes | old form hits 0 | report matches yes
table-subj-5: types.ts:809, validators.ts:55, guides.test.ts:752 | diff present yes | old form hits 0 | report matches yes
table-subj-6: TableOptions doc block at types.ts:356-359 | diff present yes | old form hits 0 at target | report matches yes
table-subj-7: guides/table.md:1440 | diff present yes | old form hits 0 | report matches yes
fleet-F1: no isBrowserVuePath site outside node_modules | diff present no | old form hits 0 | report matches yes
fleet-F2: no public readonly id field under src | diff present no | old form hits 0 | report matches yes
```

Scope tags: all paths in `conform-table.status:1-10` are `owned`; no shared or off-limits path appears.

Residue hits: none after the specified vendored-test exclusions. Diff-plus writing hits: none. Growable count hits in diff-plus prose: none.

Parity: `src/core/types.ts` signatures and `guides/table.md` method rows match for `RowManagerInterface`, `PaginationManagerInterface`, and `TableInterface`; readonly properties remain in Surface prose.

## Unknowns

- `table-subj-2`: the exact reachability of `cloneSchema`'s `SCHEMA` branch for a foreign object whose reads change between guard and clone remains unresolved. The supplied deep and descriptor vectors do not reach the prescribed message (`table-subj-2-deep-vector.txt`, `table-subj-2-branch.txt`).
- No other row or required evidence field remained unreachable.

## Journal

Leave this line for the driver.

## Deviation

No tree change was made by this read-only lane. The supplied containment evidence shows the tree already had the ten modified owned files listed in `conform-table.status:1-10`. All named briefs, reports, evidence files, source files, tests, guides, and applicable scaffold rules were read. No requested sweep remained unrun.
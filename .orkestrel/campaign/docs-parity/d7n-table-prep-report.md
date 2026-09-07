# Report — `d7n-table-prep`

Wall clock: 2026-09-07T15:44:52Z (first command) to 2026-09-07T15:47:07Z (last command).

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

Summary line:

```
0 of 35 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 6.
tsconfig.json replaced (1 line added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 27 unchanged, 0 removed in ..
```

`git status --short` immediately after:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P21 list exactly. `package.json` carries only the `docs` script row `repair` added; the version bump (item 4) landed as a separate edit below.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Applied the exact reference-shape edits to the three sites the facts block names.

```diff
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -151,21 +151,27 @@ for (const entry of manifest) {
 		})
 
 		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/u, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
 					expect(extra).toEqual([])
 				})
 			})
@@ -180,7 +186,13 @@ for (const entry of manifest) {
 				.surface()
 				.filter((symbol) => symbol.keyword === 'function')
 				.map((symbol) => symbol.name)
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})
 
 		for (const group of guide.methods()) {
@@ -191,11 +203,15 @@ for (const entry of manifest) {
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
+					const documented = group.methods.map((method) => method.name)
 					const examples =
 						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+							? source.examples(group.interface).map((example) => example.name)
+							: source
+									.examples(group.interface)
+									.map((example) => example.name)
+									.concat(source.examples(entity).map((example) => example.name))
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

No other change made to the suite. The `findMissing` call over `statement.names`/`face.surface().map(...)` and the `names`/`surface` call in `imports only real exports` stayed untouched, as their arguments were already strings.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 named every diagnostic in `tests/setup.ts` (`policy/no-malformed-summary`), one per exported helper's doc block. Each fix rewrites the description paragraph's first sentence into a third-person verb ending in `s`, carrying every fact forward, naming no symbol. No `policy/no-banned-term` diagnostic printed.

| File:line | Diagnostic | Before | After |
| --- | --- | --- | --- |
| `tests/setup.ts:14` | `policy/no-malformed-summary` | `Compare text with numeric segments in natural lexical order.` | `Compares text with numeric segments in natural lexical order.` |
| `tests/setup.ts:22` | `policy/no-malformed-summary` | `Match a contains filter after folding text to lowercase.` | `Matches a contains filter after folding text to lowercase.` |
| `tests/setup.ts:32` | `policy/no-malformed-summary` | `Compare text by its string length.` | `Compares text by its string length.` |
| `tests/setup.ts:40` | `policy/no-malformed-summary` | `Build the shared filter-admissibility behavior matrix.` | `Builds the shared filter-admissibility behavior matrix.` |
| `tests/setup.ts:118` | `policy/no-malformed-summary` | `Build a fresh schema spanning every column cell.` | `Builds a fresh schema spanning every column cell.` |
| `tests/setup.ts:144` | `policy/no-malformed-summary` | `Build fresh rows spanning present and absent cells.` | `Builds fresh rows spanning present and absent cells.` |
| `tests/setup.ts:154` | `policy/no-malformed-summary` | `Open a table over the shared schema and row population.` | `Opens a table over the shared schema and row population.` |
| `tests/setup.ts:174` | `policy/no-malformed-summary` | `Exercise every public table write after teardown.` | `Exercises every public table write after teardown.` |
| `tests/setup.ts:199` | `policy/no-malformed-summary` | `Build a schema with an exact column population.` | `Builds a schema with an exact column population.` |
| `tests/setup.ts:208` | `policy/no-malformed-summary` | `Build a schema with an exact choice population.` | `Builds a schema with an exact choice population.` |
| `tests/setup.ts:226` | `policy/no-malformed-summary` | `Build a schema at the whole-text budget plus an optional delta.` | `Builds a schema at the whole-text budget plus an optional delta.` |
| `tests/setup.ts:238` | `policy/no-malformed-summary` | `Build a schema at the whole-node budget plus an optional delta.` | `Builds a schema at the whole-node budget plus an optional delta.` |

Re-run of `npx oxlint --config .oxlintrc.json --deny-warnings .` after these edits printed no diagnostics.

`npm run test:policy` was run to check its `prose` rule against `guides/**` and `README.md`; it passed with no hit in either directory (`90 passed | 1 skipped (91)`), so no substitution-table edit was needed in those files.

`npm run format` was run once, after the edits, to converge; `npm run format:check` passed afterward with no further file change.

## Item 4 — the bump

```diff
--- a/package.json
+++ b/package.json
@@ -1,6 +1,6 @@
 {
 	"name": "@orkestrel/table",
-	"version": "0.0.4",
+	"version": "0.0.5",
```

`package-lock.json` was not edited.

## Acceptance criteria

### 1. `git status --short`

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

This is exactly the P21 repair list plus `tests/guides.test.ts` (item 2) and `tests/setup.ts` (item 3). Nothing else changed.

### 2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, `npm run check`

```
> @orkestrel/table@0.0.5 format:check
> oxfmt --config .oxfmtrc.json --check .
Checking formatting...
All matched files use the correct format.
Finished in 6450ms on 63 files using 4 threads.
```

```
(oxlint: no output, exit 0)
```

```
> @orkestrel/table@0.0.5 check
> tsc --noEmit --project tsconfig.json && npm run check:src
> @orkestrel/table@0.0.5 check:src
> npm run check:src:core
> @orkestrel/table@0.0.5 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

All exit 0.

### 3. `npm run test:guides`, `npm run test:policy`, `npm run test:config`

```
> @orkestrel/table@0.0.5 test:guides
 Test Files  1 passed (1)
      Tests  82 passed (82)
```

P21's failures were the record shapes alone; the adaptation resolved all 28 previously failing tests with no regression (54 → 82 passed, 0 failed).

```
> @orkestrel/table@0.0.5 test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
```

```
> @orkestrel/table@0.0.5 test:config
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
```

All exit 0.

### 4. `npm run docs`

Exit 1 (expected — the converge unit's worklist). Verbatim output:

```
guides/table.md type TableKey: guide "A row's identity — a `string`, carried in the cell the schema's `key` names." source "Represents a row's identity."
guides/table.md type TableCell: guide "Every value a cell can hold — a `string`, a `number`, or a `boolean`." source "Represents every value a cell can hold."
guides/table.md type TableRow: guide "One row keyed by column. A column nobody has filled has no key here." source "Represents one row, keyed by column."
guides/table.md type ColumnCell: guide "What a column's cells hold — the discriminant that fixes the column's options, its comparison, and the filters that apply to it." source "Names what a column's cells hold."
guides/table.md interface ColumnChoice: guide "One value a `choice` column offers — `value` is stored, `label` is read, `help` explains." source "Represents one value a `choice` column offers."
guides/table.md interface ColumnBase: guide "What every column carries whatever its cells hold — `key` / `label` / `help` / `hidden` / `meta`." source "Describes what every column carries, whatever its cells hold."
guides/table.md interface TextColumn: guide "A column of text, compared lexically. Carries a date, a time, and a timestamp as ISO strings." source "Represents a column of text, compared lexically."
guides/table.md interface NumberColumn: guide "A column of numbers, compared by magnitude." source "Represents a column of numbers, compared by magnitude."
guides/table.md interface FlagColumn: guide "A column of yes-or-no answers, compared false before true." source "Represents a column of yes-or-no answers, compared false before true."
guides/table.md interface ChoiceColumn: guide "A column drawn from a declared list, compared by the order that list declares — required `choices`." source "Represents a column drawn from a declared list, compared by the order that list declares."
guides/table.md type TableColumn: guide "Any column a schema can declare — the union discriminated on `cell`." source "Represents any column a schema can declare."
guides/table.md interface TableSchema: guide "Everything a table declares about itself — optional `name` / `label` / `help`, the required `key` naming row identity, and `columns` in order." source "Holds everything a table declares about itself."
guides/table.md interface TableTerm: guide "One entry of a lens list — the `column` it names. A sort term and a filter each hold one, which is why the two share a list engine." source "Represents one entry of a lens list, held against one declared column."
guides/table.md type TableDirection: guide "Which way a column sorts — `'ascending' | 'descending'`. A column nobody has sorted carries no term at all." source "Names which way a column sorts."
guides/table.md interface TableOrder: guide "One column's place in the sort — the `column` and its `direction`. The list is read left to right." source "Represents one column's place in the sort."
guides/table.md type FilterOperator: guide "How a filter tests a cell — `'contains' | 'between' | 'equals'`." source "Names how a filter tests a cell."
guides/table.md interface ContainsFilter: guide "Keep the rows whose cell holds this `text` somewhere inside it." source "Keeps the rows whose cell holds this text somewhere inside it."
guides/table.md interface BetweenFilter: guide "Keep the rows whose cell falls between `minimum` and `maximum`, both included, compared the way the column compares." source "Keeps the rows whose cell falls between these bounds, both included."
guides/table.md interface EqualsFilter: guide "Keep the rows whose cell holds exactly this `value`." source "Keeps the rows whose cell holds exactly this value."
guides/table.md type TableFilter: guide "Any filter a table can hold — the union discriminated on `operator`." source "Represents any filter a table can hold."
guides/table.md type CellComparator: guide "Compare two cells of one column, replacing what its `cell` fixes. Always describes ascending order; direction is applied afterwards." source "Compares two cells of one column."
guides/table.md type CellMatcher: guide "Test one column's cell against a filter, replacing what its `cell` fixes. Receives every filter the table holds against that column." source "Tests one column's cell against a filter."
guides/table.md class Table: guide "A table — a schema, the rows held against it, and the lens they are read through. Implements `TableInterface` exactly." source "Holds a schema, its rows, and the lens through which they are read."
guides/table.md interface TableInterface: guide "The table contract — the readonly state in the `## Surface` rows plus `clear` and `destroy`." source "Represents a table: what it declares, the rows it holds, and the lens it reads them through."
guides/table.md function createTable: guide "Open a table against a schema. The schema is copied, and the copy is what the table declares." source "Opens a table against a schema."
guides/table.md interface TableOptions: guide "How to open a table — `on` listeners, an `error` handler, seeded `rows`, per-column `comparators` and `matchers`, and a page `limit`." source "Describes how to open a table."
guides/table.md type TableEventMap: guide "Everything a table announces — `write` / `remove` / `sort` / `filter` / `select` / `expand` / `paginate` / `clear`." source "Lists everything a table announces."
guides/table.md interface RowManagerInterface: guide "The rows the table holds, in its own order." source "Manages the rows a table holds, in the order it holds them."
guides/table.md interface SortManagerInterface: guide "The order the table reads its rows in." source "Manages the order a table reads its rows in."
guides/table.md interface FilterManagerInterface: guide "Which rows the table keeps." source "Manages which rows a table keeps."
guides/table.md interface SelectionManagerInterface: guide "The rows somebody has picked." source "Manages the rows somebody has picked."
guides/table.md interface ExpansionManagerInterface: guide "The rows somebody has opened up." source "Manages the rows somebody has opened up."
guides/table.md interface PaginationManagerInterface: guide "Which stretch of the filtered rows the view shows." source "Manages which stretch of the filtered rows the view shows."
guides/table.md class TableError: guide "An error raised by the table domain — a machine-readable `code` and optional structured `context`." source "Represents an error raised by the table domain."
guides/table.md type TableErrorCode: guide "The reason a `TableError` carries — `SCHEMA` / `COLUMN` / `KEY` / `CELL` / `DESTROYED`." source "Names the machine-readable code a table error carries."
guides/table.md function isTableError: guide "Whether a caught value is a `TableError`, so a `catch` branches on `code` without an assertion." source "Determines whether an unknown value is a table error."
guides/table.md const COLUMN_CELLS: guide "Every column cell, in the order the public contract declares them." source "Lists every column cell, in the order declared by the public contract."
guides/table.md const COLUMN_LIMIT: guide "The most columns one schema may declare: 256." source "Names the maximum number of columns one schema may declare."
guides/table.md const CHOICE_LIMIT: guide "The most choices one `choice` column may offer: 1024." source "Names the maximum number of choices one `choice` column may offer."
guides/table.md const NAME_LIMIT: guide "The longest schema name or column key: 128 UTF-16 code units." source "Names the maximum length, in UTF-16 code units, of a schema name or column key."
guides/table.md const STRING_LIMIT: guide "The longest single retained string: 65536 UTF-16 code units." source "Names the maximum length, in UTF-16 code units, of any single retained string."
guides/table.md const TEXT_LIMIT: guide "The most string code units one schema may retain in total: 1048576." source "Names the maximum total length, in UTF-16 code units, of every string one schema retains."
guides/table.md const NODE_LIMIT: guide "The most records, arrays, and leaves one schema may retain in total: 16384." source "Names the maximum total number of records, arrays, and leaves one schema retains."
guides/table.md function isTableCell: guide "Whether a value has a cell shape — a string, a finite number, or a boolean." source "Determines whether an unknown value has a table cell shape."
guides/table.md function isTableRow: guide "Whether a value is a record whose every own key is a string and every value a `TableCell`." source "Determines whether an unknown value is a record of table cells."
guides/table.md function isColumnCell: guide "Whether a value is a declared column cell." source "Determines whether an unknown value is a declared column cell."
guides/table.md function isColumnChoice: guide "Whether a value is one exact `ColumnChoice` record; an unknown member refuses it." source "Determines whether an unknown value is one exact column choice record."
guides/table.md function isTableColumn: guide "Whether a value is one exact discriminated `TableColumn`, checked against its cell's own options." source "Determines whether an unknown value is one exact discriminated table column."
guides/table.md function isStructuralTableSchema: guide "Whether a value has the exact shape of a `TableSchema` — the shape alone, with no domain check." source "Determines whether an unknown value has one exact structural table-schema shape."
guides/table.md function isTableSchema: guide "Whether a value is a `TableSchema` a table can be opened against — the exact shape, and an audit that finds nothing." source "Determines whether an unknown value is one semantically sound table schema."
guides/table.md function extractColumn: guide "Find one column by key; `undefined` when the schema declares no such column." source "Finds one column by key."
guides/table.md function extractKey: guide "Read a row's identity; `undefined` when its key cell is missing, empty, or not a string." source "Reads one row's declared identity."
guides/table.md function computeKeys: guide "Work out one atomic 0/1/N membership change over the keys a caller may address — the engine selection and expansion share." source "Computes one atomic 0/1/N membership change over known keys."
guides/table.md function mergeTerms: guide "Merge lens terms into a column-keyed list, replacing the entry naming the same column — the `set` write." source "Merges lens terms into a column-keyed list, replacing the entry that names the same column."
guides/table.md function removeTerms: guide "Remove every lens term naming one of the given columns — the drop `sort.remove` and `filter.remove` share." source "Removes every lens term naming one of the given columns."
guides/table.md function matchesTerms: guide "Whether two lens lists hold the same terms in the same order, with the supplied test deciding the operands." source "Checks whether two lens lists hold the same terms in the same order."
guides/table.md function matchesCell: guide "Whether one column can hold a value — the shape gate every write and every seed passes through." source "Checks whether a value has the shape required by one column cell."
guides/table.md function compareCells: guide "Compare two of one column's cells the way its `cell` fixes, describing ascending order." source "Compares two cells in ascending order according to one column."
guides/table.md function admitsFilter: guide "Whether one column admits a filter and every operand it carries — the gate `filter.set` and `matchesFilter` share." source "Checks whether one column admits a filter and all its operands."
guides/table.md function matchesFilter: guide "Test one of a column's cells against one filter the way its `cell` fixes." source "Tests one cell against a filter according to its column."
guides/table.md function filterRows: guide "Keep the rows every filter accepts, in the order given; a supplied `CellMatcher` replaces the default per column." source "Keeps the rows accepted by every filter."
guides/table.md function sortRows: guide "Order rows by the terms given, stably; a supplied `CellComparator` replaces the default per column." source "Orders rows stably by a sequence of terms."
guides/table.md function auditTable: guide "Audit a structurally valid schema for domain faults and budget breaches, returning human diagnostics." source "Audits a structurally valid schema for domain and budget faults."
guides/table.md function serializeTable: guide "Project a schema into JSON in declaration order, dropping every absent member; raises `SCHEMA` for a `meta` it cannot own." source "Projects a schema into declaration-ordered JSON."
guides/table.md function serializeRows: guide "Project rows into JSON with each row's cells in the schema's column order, dropping every absent cell." source "Projects rows into schema-column-ordered JSON."
guides/table.md function cloneRow: guide "Own one row as a frozen copy of its cells." source "Clones one row into an owned frozen snapshot."
guides/table.md function cloneSchema: guide "Own a whole schema, freezing every nested column, choice list, choice, and `meta`; raises `SCHEMA` for a `meta` it cannot own." source "Clones a table schema into an owned frozen snapshot."
guides/table.md function parseTable: guide "Parse unknown wire data into an owned, structurally valid, semantically sound schema." source "Parses unknown wire data into an owned, semantically sound table schema."
guides/table.md function parseRows: guide "Parse unknown wire data into owned rows against a schema, coercing a numeric string and `'true'` / `'false'`." source "Parses unknown wire rows against one table schema."
guides/table.md TableInterface.clear: guide absent source "Puts the table back the way it opened, holding nothing."
guides/table.md TableInterface.destroy: guide absent source "Tears the table down."
guides/table.md RowManagerInterface.row: guide absent source "Finds one row by key."
guides/table.md RowManagerInterface.rows: guide absent source "Reads every row the table holds, in its own order."
guides/table.md RowManagerInterface.add: guide absent source "Takes in several rows, appending them in the order given."
guides/table.md RowManagerInterface.update: guide absent source "Writes over several rows, each found by the key it carries."
guides/table.md RowManagerInterface.move: guide absent source "Moves one row to another place in the table's own order."
guides/table.md RowManagerInterface.remove: guide absent source "Takes out every row."
guides/table.md SortManagerInterface.order: guide absent source "Finds one column's term."
guides/table.md SortManagerInterface.orders: guide absent source "Reads every term the table sorts by."
guides/table.md SortManagerInterface.set: guide absent source "Sorts by several columns."
guides/table.md SortManagerInterface.remove: guide absent source "Stops sorting by anything."
guides/table.md FilterManagerInterface.filter: guide absent source "Finds one column's filter."
guides/table.md FilterManagerInterface.filters: guide absent source "Reads every filter the table keeps rows by."
guides/table.md FilterManagerInterface.set: guide absent source "Filters several columns."
guides/table.md FilterManagerInterface.remove: guide absent source "Stops filtering by anything."
guides/table.md SelectionManagerInterface.select: guide absent source "Picks every row the table holds."
guides/table.md SelectionManagerInterface.clear: guide absent source "Drops every pick."
guides/table.md SelectionManagerInterface.toggle: guide absent source "Picks one row, or drops it when it is already picked."
guides/table.md ExpansionManagerInterface.expand: guide absent source "Opens every row the table holds."
guides/table.md ExpansionManagerInterface.clear: guide absent source "Closes every row."
guides/table.md ExpansionManagerInterface.toggle: guide absent source "Opens one row, or closes it when it is already open."
guides/table.md PaginationManagerInterface.move: guide absent source "Shows another page."
guides/table.md PaginationManagerInterface.resize: guide absent source "Sets how many rows a page holds."
guides/table.md pitch: readme absent tagline "The environment-agnostic tabular document. A `TableSchema` states what the columns are, a `Table` holds the rows given against it, and one lens — sort, filter, and page — decides which of them the view shows. Nothing here renders, measures a pixel, reads a keyboard, or names a host type. A grid, a report, a terminal listing, and a CSV export are the same abstraction. They all hold a set of records, order them, narrow them, and show a stretch of them. What differs is who draws the result, and drawing is the one part this package leaves out. The table owns values; the host owns everything a person looks at. The row store is the source of truth, and it is the whole of it. Sort terms, filters, the picked keys, the opened keys, and the page are held; `view` and every tally are worked out on read, so no second copy of an answer can go stale. A write validates all of itself before any of it lands, and announces itself once it has. The core refuses rather than throws. Every guard returns `false` off-shape rather than throwing, every parser returns `undefined` on refusal, and every row the table hands back is a frozen owned copy. Table-owned refusals raise `TableError`, and each one names a caller mistake."
rows read: 1, disagreements found: 94
```

This matches P21's expected reading exactly and is the converge unit's worklist.

## Deviation report

None. `repair` wrote only paths in the P21 list, every before-text in item 2 was found verbatim, every voice diagnostic named `tests/setup.ts` (in scope), `test:policy` reported no red, and every gate other than `docs` read green.

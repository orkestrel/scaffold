# Last changes: table

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `079fc2c`, merge base with `origin/main` `f8dd50f`, layer L2, declared version 0.0.3, registry version 0.0.3.

## Commits since origin/main

```text
9b852e9 2026-08-28 Update every dependency to the published latest
f74a96d 2026-08-28 Adopt the catalog and guide mirrors for the wave
43d48c0 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
af8222d 2026-09-01 Apply the verified src-audit fixes
19e9069 2026-09-01 Adopt the renamed guide helpers in the parity test
bdd1d7b 2026-09-02 Intern the table managers and name the key-set shell
e270928 2026-09-02 Give the guide the enforceable reason no consumer constructs a manager
079fc2c 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md              |  17 ++---
 package.json                             |   6 +-
 src/core/Table.ts                        |  48 +++++++------
 src/core/cloners.ts                      |   4 +-
 src/core/constants.ts                    |  14 ++--
 src/core/errors.ts                       |  12 ++--
 src/core/factories.ts                    |   2 +-
 src/core/helpers.ts                      |  92 ++++++++++++++++++++-----
 src/core/index.ts                        |   6 --
 src/core/parsers.ts                      |   4 +-
 src/core/tables/ExpansionManager.ts      |  68 ++++++-------------
 src/core/tables/FilterManager.ts         |  75 +++++++--------------
 src/core/tables/KeyManager.ts            |  68 +++++++++++++++++++
 src/core/tables/PaginationManager.ts     |  16 ++---
 src/core/tables/RowManager.ts            |  30 ++++-----
 src/core/tables/SelectionManager.ts      |  68 ++++++-------------
 src/core/tables/SortManager.ts           |  56 +++++-----------
 src/core/types.ts                        | 261 ++++++++++++++++++++++++++++++++++++++---------------------------------
 src/core/validators.ts                   |  29 ++++----
 tests/guides.test.ts                     |  52 ++++++++++----
 tests/src/core/Table.test.ts             |  52 +++++++++++---
 tests/src/core/helpers.test.ts           |  83 ++++++++++++++++++++++-
 tests/src/core/index.test.ts             |   9 +--
 tests/src/core/tables/KeyManager.test.ts | 104 ++++++++++++++++++++++++++++
 24 files changed, 736 insertions(+), 440 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index c40d722..04649c6 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,6 +1,6 @@
 import type { ColumnCell } from './types.js'
 
-/** Every column cell, in the order declared by the public contract. */
+/** Lists every column cell, in the order declared by the public contract. */
 export const COLUMN_CELLS: readonly ColumnCell[] = Object.freeze([
 	'text',
 	'number',
@@ -8,20 +8,20 @@ export const COLUMN_CELLS: readonly ColumnCell[] = Object.freeze([
 	'choice',
 ])
 
-/** The maximum number of columns one schema may declare. */
+/** Names the maximum number of columns one schema may declare. */
 export const COLUMN_LIMIT = 256
 
-/** The maximum number of choices one `choice` column may offer. */
+/** Names the maximum number of choices one `choice` column may offer. */
 export const CHOICE_LIMIT = 1024
 
-/** The maximum length, in UTF-16 code units, of a schema name or column key. */
+/** Names the maximum length, in UTF-16 code units, of a schema name or column key. */
 export const NAME_LIMIT = 128
 
-/** The maximum length, in UTF-16 code units, of any single retained string. */
+/** Names the maximum length, in UTF-16 code units, of any single retained string. */
 export const STRING_LIMIT = 65536
 
-/** The maximum total length, in UTF-16 code units, of every string one schema retains. */
+/** Names the maximum total length, in UTF-16 code units, of every string one schema retains. */
 export const TEXT_LIMIT = 1048576
 
-/** The maximum total number of records, arrays, and leaves one schema retains. */
+/** Names the maximum total number of records, arrays, and leaves one schema retains. */
 export const NODE_LIMIT = 16384
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 515729f..4aebd55 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -1,16 +1,16 @@
 import type { JSONRecord } from '@orkestrel/contract'
 import type { TableErrorCode } from './types.js'
 
-/** An error raised by the table domain. */
+/** Represents an error raised by the table domain. */
 export class TableError extends Error {
-	/** The machine-readable reason for this failure. */
+	/** Holds the machine-readable reason for this failure. */
 	readonly code: TableErrorCode
 
-	/** Structured values that locate or explain this failure. */
+	/** Holds structured values that locate or explain this failure. */
 	readonly context?: JSONRecord
 
 	/**
-	 * Create a table error.
+	 * Creates a table error.
 	 *
 	 * @param code - The machine-readable reason.
 	 * @param message - The human-readable failure text.
@@ -25,10 +25,10 @@ export class TableError extends Error {
 }
 
 /**
- * Determine whether an unknown value is a table error.
+ * Determines whether an unknown value is a table error.
  *
  * @param input - The value to inspect.
- * @returns Whether the value is a {@link TableError} instance.
+ * @returns True if the value is a {@link TableError} instance; false otherwise.
  */
 export function isTableError(input: unknown): input is TableError {
 	return input instanceof TableError
diff --git a/src/core/index.ts b/src/core/index.ts
index 26a0a56..bb800c6 100644
--- a/src/core/index.ts
+++ b/src/core/index.ts
@@ -7,9 +7,3 @@ export * from './cloners.js'
 export * from './parsers.js'
 export * from './factories.js'
 export * from './Table.js'
-export * from './tables/RowManager.js'
-export * from './tables/SortManager.js'
-export * from './tables/FilterManager.js'
-export * from './tables/SelectionManager.js'
-export * from './tables/ExpansionManager.js'
-export * from './tables/PaginationManager.js'
diff --git a/src/core/types.ts b/src/core/types.ts
index 3235225..679fc99 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -2,7 +2,7 @@ import type { JSONRecord } from '@orkestrel/contract'
 import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'
 
 /**
- * A row's identity.
+ * Represents a row's identity.
  *
  * @remarks
  * Every row carries its own identity in the cell named by {@link TableSchema.key}, as a non-empty
@@ -17,7 +17,7 @@ import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkes
 export type TableKey = string
 
 /**
- * Every value a cell can hold.
+ * Represents every value a cell can hold.
  *
  * @remarks
  * The variant follows the column: `text` and `choice` hold a `string`, `number` holds a `number`,
@@ -27,7 +27,7 @@ export type TableKey = string
 export type TableCell = string | number | boolean
 
 /**
- * One row, keyed by column.
+ * Represents one row, keyed by column.
  *
  * @remarks
  * A row declares a cell for the columns it carries and omits the rest. It carries no key the
@@ -42,7 +42,7 @@ export type TableCell = string | number | boolean
 export type TableRow = Readonly<Record<string, TableCell>>
 
 /**
- * What a column's cells hold.
+ * Names what a column's cells hold.
  *
  * @remarks
  * The cell is the discriminant of every {@link TableColumn} variant, so choosing it fixes what the
@@ -60,7 +60,7 @@ export type TableRow = Readonly<Record<string, TableCell>>
 export type ColumnCell = 'text' | 'number' | 'flag' | 'choice'
 
 /**
- * One value a `choice` column offers.
+ * Represents one value a `choice` column offers.
  *
  * @remarks
  * `value` is what the cell holds and `label` is what a reader sees. `help` explains the choice.
@@ -74,7 +74,7 @@ export interface ColumnChoice {
 }
 
 /**
- * What every column carries, whatever its cells hold.
+ * Describes what every column carries, whatever its cells hold.
  *
  * @remarks
  * `key` names the column, and it is the name a row uses for that column's cell. `label` is the
@@ -98,23 +98,23 @@ export interface ColumnBase {
 	readonly meta?: JSONRecord
 }
 
-/** A column of text, compared lexically. */
+/** Represents a column of text, compared lexically. */
 export interface TextColumn extends ColumnBase {
 	readonly cell: 'text'
 }
 
-/** A column of numbers, compared by magnitude. */
+/** Represents a column of numbers, compared by magnitude. */
 export interface NumberColumn extends ColumnBase {
 	readonly cell: 'number'
 }
 
-/** A column of yes-or-no answers, compared false before true. */
+/** Represents a column of yes-or-no answers, compared false before true. */
 export interface FlagColumn extends ColumnBase {
 	readonly cell: 'flag'
 }
 
 /**
- * A column drawn from a declared list, compared by the order that list declares.
+ * Represents a column drawn from a declared list, compared by the order that list declares.
  *
  * @remarks
  * A cell holding a value the list does not offer is refused at admission.
@@ -125,7 +125,7 @@ export interface ChoiceColumn extends ColumnBase {
 }
 
 /**
- * Any column a schema can declare.
+ * Represents any column a schema can declare.
  *
  * @remarks
  * The union discriminates on `cell`, so narrowing on that member reaches each variant's own
@@ -141,7 +141,7 @@ export interface ChoiceColumn extends ColumnBase {
 export type TableColumn = TextColumn | NumberColumn | FlagColumn | ChoiceColumn
 
 /**
- * Everything a table declares about itself.
+ * Holds everything a table declares about itself.
  *
  * @remarks
  * The schema is data. It carries no function, so all of it crosses a wire and nothing is dropped
@@ -177,7 +177,20 @@ export interface TableSchema {
 }
 
 /**
- * Which way a column sorts.
+ * Represents one entry of a lens list, held against one declared column.
+ *
+ * @remarks
+ * A table holds at most one sort term and at most one filter per column, so `column` is what
+ * places an entry in either list. {@link mergeTerms}, {@link removeTerms}, and
+ * {@link matchesTerms} work over this shape alone, which is how sorting and filtering share one
+ * list engine while keeping their own operands.
+ */
+export interface TableTerm {
+	readonly column: string
+}
+
+/**
+ * Names which way a column sorts.
  *
  * @remarks
  * A column nobody has sorted has no {@link TableOrder} at all, so there is no third member
@@ -186,7 +199,7 @@ export interface TableSchema {
 export type TableDirection = 'ascending' | 'descending'
 
 /**
- * One column's place in the sort.
+ * Represents one column's place in the sort.
  *
  * @remarks
  * The order list is read left to right: the first term decides, and each later term breaks the
@@ -203,7 +216,7 @@ export interface TableOrder {
 }
 
 /**
- * How a filter tests a cell.
+ * Names how a filter tests a cell.
  *
  * @remarks
  * `contains` looks for text inside a `text` or `choice` cell. `between` accepts a cell inside a
@@ -215,7 +228,7 @@ export interface TableOrder {
  */
 export type FilterOperator = 'contains' | 'between' | 'equals'
 
-/** Keep the rows whose cell holds this text somewhere inside it. */
+/** Keeps the rows whose cell holds this text somewhere inside it. */
 export interface ContainsFilter {
 	readonly column: string
 	readonly operator: 'contains'
@@ -223,7 +236,7 @@ export interface ContainsFilter {
 }
 
 /**
- * Keep the rows whose cell falls between these bounds, both included.
+ * Keeps the rows whose cell falls between these bounds, both included.
  *
  * @remarks
  * The bounds compare the way the column compares, so a `text` column holding ISO strings takes a
@@ -236,7 +249,7 @@ export interface BetweenFilter {
 	readonly maximum: string | number
 }
 
-/** Keep the rows whose cell holds exactly this value. */
+/** Keeps the rows whose cell holds exactly this value. */
 export interface EqualsFilter {
 	readonly column: string
 	readonly operator: 'equals'
@@ -244,7 +257,7 @@ export interface EqualsFilter {
 }
 
 /**
- * Any filter a table can hold.
+ * Represents any filter a table can hold.
  *
  * @remarks
  * The union discriminates on `operator`, so each operator carries only the operands it uses and a
@@ -261,7 +274,7 @@ export interface EqualsFilter {
 export type TableFilter = ContainsFilter | BetweenFilter | EqualsFilter
 
 /**
- * Compare two cells of one column.
+ * Compares two cells of one column.
  *
  * @remarks
  * It replaces the comparison the column's {@link ColumnCell} fixes, for that column alone, and it
@@ -281,7 +294,7 @@ export type TableFilter = ContainsFilter | BetweenFilter | EqualsFilter
 export type CellComparator = (left: TableCell | undefined, right: TableCell | undefined) => number
 
 /**
- * Test one column's cell against a filter.
+ * Tests one column's cell against a filter.
  *
  * @remarks
  * It replaces the test the column's {@link ColumnCell} fixes, for that column alone, and it
@@ -289,7 +302,7 @@ export type CellComparator = (left: TableCell | undefined, right: TableCell | un
  *
  * @param cell - The row's cell, or `undefined` when it carries none.
  * @param filter - The filter the table is applying.
- * @returns `true` to keep the row.
+ * @returns True if the filter accepts the cell; false otherwise.
  * @example
  * ```ts
  * const loose: CellMatcher = (cell, filter) =>
@@ -299,7 +312,7 @@ export type CellComparator = (left: TableCell | undefined, right: TableCell | un
 export type CellMatcher = (cell: TableCell | undefined, filter: TableFilter) => boolean
 
 /**
- * The machine-readable code a table error carries.
+ * Names the machine-readable code a table error carries.
  *
  * @remarks
  * `SCHEMA` rejects a malformed schema, including a `key` naming no declared column. `COLUMN`
@@ -310,7 +323,7 @@ export type CellMatcher = (cell: TableCell | undefined, filter: TableFilter) =>
 export type TableErrorCode = 'SCHEMA' | 'COLUMN' | 'KEY' | 'CELL' | 'DESTROYED'
 
 /**
- * Everything a table announces.
+ * Lists everything a table announces.
  *
  * @remarks
  * Every event fires after the state it reports is committed, and only when something actually
@@ -340,7 +353,7 @@ export type TableEventMap = {
 }
 
 /**
- * How to open a table.
+ * Describes how to open a table.
  *
  * @param options - The table's settings.
  * @remarks
@@ -375,7 +388,7 @@ export interface TableOptions {
 }
 
 /**
- * The rows a table holds, in the order it holds them.
+ * Manages the rows a table holds, in the order it holds them.
  *
  * @remarks
  * This order is the table's own, and it is what the view shows when no sort term separates two
@@ -389,20 +402,20 @@ export interface TableOptions {
  */
 export interface RowManagerInterface {
 	/**
-	 * Find one row by key.
+	 * Finds one row by key.
 	 *
 	 * @param key - The row's key.
 	 * @returns The row, or `undefined` when the table holds no such key.
 	 */
 	row(key: TableKey): TableRow | undefined
 	/**
-	 * Every row the table holds, in its own order.
+	 * Reads every row the table holds, in its own order.
 	 *
 	 * @returns The rows, unfiltered, unsorted, and unpaged.
 	 */
 	rows(): readonly TableRow[]
 	/**
-	 * Take in several rows, appending them in the order given.
+	 * Takes in several rows, appending them in the order given.
 	 *
 	 * @param rows - The rows to admit.
 	 * @throws A {@link TableError} coded `KEY` when a row's key is missing, unusable, already
@@ -411,7 +424,7 @@ export interface RowManagerInterface {
 	 */
 	add(rows: readonly TableRow[]): void
 	/**
-	 * Take in one row, appending it.
+	 * Takes in one row, appending it.
 	 *
 	 * @param row - The row to admit.
 	 * @throws A {@link TableError} coded `KEY` when the row's key is missing, unusable, or already
@@ -419,60 +432,60 @@ export interface RowManagerInterface {
 	 */
 	add(row: TableRow): void
 	/**
-	 * Write over several rows, each found by the key it carries.
+	 * Writes over several rows, each found by the key it carries.
 	 *
 	 * @param rows - The rows to write, each carrying the key of the row it writes over.
-	 * @returns `true` when every key named a row the table holds.
+	 * @returns True if every key named a row the table holds; false otherwise.
 	 * @throws A {@link TableError} coded `CELL` when a cell is one its column cannot hold. Every
 	 *   row is checked before any is written, so one refusal writes none of them.
 	 */
 	update(rows: readonly TableRow[]): boolean
 	/**
-	 * Write over one row, found by the key it carries.
+	 * Writes over one row, found by the key it carries.
 	 *
 	 * @remarks
 	 * The cells given replace the cells held; the cells left out stay as they are. A row's key
 	 * therefore cannot move, because a different key names a different row.
 	 *
 	 * @param row - The cells to write, carrying the key of the row they belong to.
-	 * @returns `true` when the key named a row the table holds.
+	 * @returns True if the key named a row the table holds; false otherwise.
 	 * @throws A {@link TableError} coded `CELL` when a cell is one its column cannot hold.
 	 */
 	update(row: TableRow): boolean
 	/**
-	 * Move one row to another place in the table's own order.
+	 * Moves one row to another place in the table's own order.
 	 *
 	 * @param key - The row's key.
 	 * @param index - Where to put it, counted from zero and clamped to the rows that exist.
-	 * @returns `true` when the key named a row the table holds.
+	 * @returns True if the key named a row the table holds; false otherwise.
 	 */
 	move(key: TableKey, index: number): boolean
 	/**
-	 * Take out every row.
+	 * Takes out every row.
 	 *
 	 * @remarks
 	 * Selection and expansion drop the keys they held, because those rows are gone.
 	 */
 	remove(): void
 	/**
-	 * Take out one row.
+	 * Takes out one row.
 	 *
 	 * @param key - The row's key.
-	 * @returns `true` when the key named a row the table holds.
+	 * @returns True if the key named a row the table holds; false otherwise.
 	 */
 	remove(key: TableKey): boolean
 	/**
-	 * Take out several rows.
+	 * Takes out several rows.
 	 *
 	 * @param keys - The rows' keys.
-	 * @returns `true` when every key named a row the table holds. Every key is checked before any
-	 *   row goes, so one unknown key leaves the whole call undone.
+	 * @returns True if every key named a row the table holds; false otherwise. Every key is
+	 *   checked before any row goes, so one unknown key leaves the whole call undone.
 	 */
 	remove(keys: readonly TableKey[]): boolean
 }
 
 /**
- * The order a table reads its rows in.
+ * Manages the order a table reads its rows in.
  *
  * @remarks
  * The table holds one term per column and applies them in the order they were set. Which
@@ -487,20 +500,20 @@ export interface RowManagerInterface {
  */
 export interface SortManagerInterface {
 	/**
-	 * Find one column's term.
+	 * Finds one column's term.
 	 *
 	 * @param column - The column's key.
 	 * @returns The term, or `undefined` when nothing sorts that column.
 	 */
 	order(column: string): TableOrder | undefined
 	/**
-	 * Every term the table sorts by.
+	 * Reads every term the table sorts by.
 	 *
 	 * @returns The terms, first to last, in the order they decide.
 	 */
 	orders(): readonly TableOrder[]
 	/**
-	 * Sort by several columns.
+	 * Sorts by several columns.
 	 *
 	 * @param orders - The terms to set. A term for a column already sorted replaces that column's
 	 *   direction in place; every other term joins the end of the list.
@@ -509,34 +522,34 @@ export interface SortManagerInterface {
 	 */
 	set(orders: readonly TableOrder[]): void
 	/**
-	 * Sort by one column.
+	 * Sorts by one column.
 	 *
 	 * @param order - The term to set.
 	 * @throws A {@link TableError} coded `COLUMN` when the term names a column the schema does not
 	 *   declare.
 	 */
 	set(order: TableOrder): void
-	/** Stop sorting by anything. */
+	/** Stops sorting by anything. */
 	remove(): void
 	/**
-	 * Stop sorting by one column.
+	 * Stops sorting by one column.
 	 *
 	 * @param column - The column's key.
-	 * @returns `true` when the schema declares that column.
+	 * @returns True if the schema declares that column; false otherwise.
 	 */
 	remove(column: string): boolean
 	/**
-	 * Stop sorting by several columns.
+	 * Stops sorting by several columns.
 	 *
 	 * @param columns - The columns' keys.
-	 * @returns `true` when the schema declares every one of them. Every key is checked before any
-	 *   term goes.
+	 * @returns True if the schema declares every one of them; false otherwise. Every key is
+	 *   checked before any term goes.
 	 */
 	remove(columns: readonly string[]): boolean
 }
 
 /**
- * Which rows a table keeps.
+ * Manages which rows a table keeps.
  *
  * @remarks
  * The table holds at most one filter per column and keeps the rows every filter accepts.
@@ -549,20 +562,20 @@ export interface SortManagerInterface {
  */
 export interface FilterManagerInterface {
 	/**
-	 * Find one column's filter.
+	 * Finds one column's filter.
 	 *
 	 * @param column - The column's key.
 	 * @returns The filter, or `undefined` when nothing filters that column.
 	 */
 	filter(column: string): TableFilter | undefined
 	/**
-	 * Every filter the table keeps rows by.
+	 * Reads every filter the table keeps rows by.
 	 *
 	 * @returns The filters, in the order they were set.
 	 */
 	filters(): readonly TableFilter[]
 	/**
-	 * Filter several columns.
+	 * Filters several columns.
 	 *
 	 * @param filters - The filters to set. A filter for a column already filtered replaces that
 	 *   column's filter; every other one joins the end of the list.
@@ -572,34 +585,34 @@ export interface FilterManagerInterface {
 	 */
 	set(filters: readonly TableFilter[]): void
 	/**
-	 * Filter one column.
+	 * Filters one column.
 	 *
 	 * @param filter - The filter to set.
 	 * @throws A {@link TableError} coded `COLUMN` when the filter names a column the schema does
 	 *   not declare, and `CELL` when an operand is one the column cannot hold.
 	 */
 	set(filter: TableFilter): void
-	/** Stop filtering by anything. */
+	/** Stops filtering by anything. */
 	remove(): void
 	/**
-	 * Stop filtering one column.
+	 * Stops filtering one column.
 	 *
 	 * @param column - The column's key.
-	 * @returns `true` when the schema declares that column.
+	 * @returns True if the schema declares that column; false otherwise.
 	 */
 	remove(column: string): boolean
 	/**
-	 * Stop filtering several columns.
+	 * Stops filtering several columns.
 	 *
 	 * @param columns - The columns' keys.
-	 * @returns `true` when the schema declares every one of them. Every key is checked before any
-	 *   filter goes.
+	 * @returns True if the schema declares every one of them; false otherwise. Every key is
+	 *   checked before any filter goes.
 	 */
 	remove(columns: readonly string[]): boolean
 }
 
 /**
- * The rows somebody has picked.
+ * Manages the rows somebody has picked.
  *
  * @remarks
  * Selection holds keys, never rows or positions, so a pick survives a sort, a filter, and a page
@@ -612,10 +625,10 @@ export interface FilterManagerInterface {
  * ```
  */
 export interface SelectionManagerInterface {
-	/** The keys of the rows picked right now. */
+	/** Holds the keys of the rows picked right now. */
 	readonly keys: ReadonlySet<TableKey>
 	/**
-	 * Pick every row the table holds.
+	 * Picks every row the table holds.
 	 *
 	 * @remarks
 	 * Every row, not every visible one. A host picking one page hands that page's keys over
@@ -623,56 +636,57 @@ export interface SelectionManagerInterface {
 	 */
 	select(): void
 	/**
-	 * Pick one row.
+	 * Picks one row.
 	 *
 	 * @param key - The row's key.
-	 * @returns `true` when the key named a row the table holds.
+	 * @returns True if the key named a row the table holds; false otherwise.
 	 */
 	select(key: TableKey): boolean
 	/**
-	 * Pick several rows.
+	 * Picks several rows.
 	 *
 	 * @param keys - The rows' keys.
-	 * @returns `true` when every key named a row the table holds. Every key is checked before any
-	 *   row is picked.
+	 * @returns True if every key named a row the table holds; false otherwise. Every key is
+	 *   checked before any row is picked.
 	 */
 	select(keys: readonly TableKey[]): boolean
-	/** Drop every pick. */
+	/** Drops every pick. */
 	clear(): void
 	/**
-	 * Drop one pick.
+	 * Drops one pick.
 	 *
 	 * @param key - The row's key.
-	 * @returns `true` when the key named a row the table holds, whether or not it was picked.
+	 * @returns True if the key named a row the table holds, whether or not it was
+	 *   picked; false otherwise.
 	 */
 	clear(key: TableKey): boolean
 	/**
-	 * Drop several picks.
+	 * Drops several picks.
 	 *
 	 * @param keys - The rows' keys.
-	 * @returns `true` when every key named a row the table holds. Every key is checked before any
-	 *   pick is dropped.
+	 * @returns True if every key named a row the table holds; false otherwise. Every key is
+	 *   checked before any pick is dropped.
 	 */
 	clear(keys: readonly TableKey[]): boolean
 	/**
-	 * Pick one row, or drop it when it is already picked.
+	 * Picks one row, or drops it when it is already picked.
 	 *
 	 * @param key - The row's key.
-	 * @returns `true` when the key named a row the table holds.
+	 * @returns True if the key named a row the table holds; false otherwise.
 	 */
 	toggle(key: TableKey): boolean
 	/**
-	 * Turn several rows around, each on its own.
+	 * Turns several rows around, each on its own.
 	 *
 	 * @param keys - The rows' keys.
-	 * @returns `true` when every key named a row the table holds. Every key is checked before any
-	 *   row turns.
+	 * @returns True if every key named a row the table holds; false otherwise. Every key is
+	 *   checked before any row turns.
 	 */
 	toggle(keys: readonly TableKey[]): boolean
 }
 
 /**
- * The rows somebody has opened up.
+ * Manages the rows somebody has opened up.
  *
  * @remarks
  * Expansion holds keys exactly as selection does, and what an opened row shows beside it is the
@@ -685,61 +699,62 @@ export interface SelectionManagerInterface {
  * ```
  */
 export interface ExpansionManagerInterface {
-	/** The keys of the rows opened right now. */
+	/** Holds the keys of the rows opened right now. */
 	readonly keys: ReadonlySet<TableKey>
-	/** Open every row the table holds. */
+	/** Opens every row the table holds. */
 	expand(): void
 	/**
-	 * Open one row.
+	 * Opens one row.
 	 *
 	 * @param key - The row's key.
-	 * @returns `true` when the key named a row the table holds.
+	 * @returns True if the key named a row the table holds; false otherwise.
 	 */
 	expand(key: TableKey): boolean
 	/**
-	 * Open several rows.
+	 * Opens several rows.
 	 *
 	 * @param keys - The rows' keys.
-	 * @returns `true` when every key named a row the table holds. Every key is checked before any
-	 *   row opens.
+	 * @returns True if every key named a row the table holds; false otherwise. Every key is
+	 *   checked before any row opens.
 	 */
 	expand(keys: readonly TableKey[]): boolean
-	/** Close every row. */
+	/** Closes every row. */
 	clear(): void
 	/**
-	 * Close one row.
+	 * Closes one row.
 	 *
 	 * @param key - The row's key.
-	 * @returns `true` when the key named a row the table holds, whether or not it was open.
+	 * @returns True if the key named a row the table holds, whether or not it was
+	 *   open; false otherwise.
 	 */
 	clear(key: TableKey): boolean
 	/**
-	 * Close several rows.
+	 * Closes several rows.
 	 *
 	 * @param keys - The rows' keys.
-	 * @returns `true` when every key named a row the table holds. Every key is checked before any
-	 *   row closes.
+	 * @returns True if every key named a row the table holds; false otherwise. Every key is
+	 *   checked before any row closes.
 	 */
 	clear(keys: readonly TableKey[]): boolean
 	/**
-	 * Open one row, or close it when it is already open.
+	 * Opens one row, or closes it when it is already open.
 	 *
 	 * @param key - The row's key.
-	 * @returns `true` when the key named a row the table holds.
+	 * @returns True if the key named a row the table holds; false otherwise.
 	 */
 	toggle(key: TableKey): boolean
 	/**
-	 * Turn several rows around, each on its own.
+	 * Turns several rows around, each on its own.
 	 *
 	 * @param keys - The rows' keys.
-	 * @returns `true` when every key named a row the table holds. Every key is checked before any
-	 *   row turns.
+	 * @returns True if every key named a row the table holds; false otherwise. Every key is
+	 *   checked before any row turns.
 	 */
 	toggle(keys: readonly TableKey[]): boolean
 }
 
 /**
- * Which stretch of the filtered rows the view shows.
+ * Manages which stretch of the filtered rows the view shows.
  *
  * @remarks
  * `page` is the state, counted from one. `offset` and `count` are worked out from it and from the
@@ -756,22 +771,22 @@ export interface ExpansionManagerInterface {
  * ```
  */
 export interface PaginationManagerInterface {
-	/** The page the view shows, counted from one, and `1` when the table is not paged. */
+	/** Holds the page the view shows, counted from one, and `1` when the table is not paged. */
 	readonly page: number
-	/** How many rows a page holds, or `undefined` when the table is not paged. */
+	/** Holds the number of rows one page shows, or `undefined` when the table is not paged. */
 	readonly limit: number | undefined
-	/** How many rows the view skips before the page it shows, counted from zero. */
+	/** Holds the number of rows the view skips before the page it shows, counted from zero. */
 	readonly offset: number
-	/** How many pages the rows admitted by the filter fill, and `1` when the table is not paged. */
+	/** Counts the pages the rows admitted by the filter fill, and `1` when the table is not paged. */
 	readonly count: number
 	/**
-	 * Show another page.
+	 * Shows another page.
 	 *
 	 * @param page - The page to show, counted from one and clamped to the pages that exist.
 	 */
 	move(page: number): void
 	/**
-	 * Say how many rows a page holds.
+	 * Sets how many rows a page holds.
 	 *
 	 * @remarks
 	 * The view keeps showing the first of the rows it was showing, so the page moves to wherever
@@ -784,7 +799,7 @@ export interface PaginationManagerInterface {
 }
 
 /**
- * A table: what it declares, the rows it holds, and the lens it reads them through.
+ * Represents a table: what it declares, the rows it holds, and the lens it reads them through.
  *
  * @remarks
  * The table owns values, not pixels. It renders nothing, reads no document, and names no host
@@ -804,35 +819,35 @@ export interface PaginationManagerInterface {
  * ```
  */
 export interface TableInterface {
-	/** The table's event emitter. */
+	/** Holds the table's event emitter. */
 	readonly emitter: EmitterInterface<TableEventMap>
-	/** What this table declares. */
+	/** Holds what this table declares. */
 	readonly schema: TableSchema
-	/** The rows the table holds. */
+	/** Manages the rows the table holds. */
 	readonly rows: RowManagerInterface
-	/** The order the table reads them in. */
+	/** Manages the order the table reads them in. */
 	readonly sort: SortManagerInterface
-	/** Which of them the table keeps. */
+	/** Manages which of them the table keeps. */
 	readonly filter: FilterManagerInterface
-	/** The ones somebody has picked. */
+	/** Manages the ones somebody has picked. */
 	readonly selection: SelectionManagerInterface
-	/** The ones somebody has opened up. */
+	/** Manages the ones somebody has opened up. */
 	readonly expansion: ExpansionManagerInterface
-	/** Which stretch of them the view shows. */
+	/** Manages which stretch of them the view shows. */
 	readonly pagination: PaginationManagerInterface
 	/**
-	 * The rows to draw right now: filtered, then sorted, then paged.
+	 * Returns the rows to draw right now: filtered, then sorted, then paged.
 	 *
 	 * @remarks
 	 * It is worked out on every read and never stored, so it is right the instant anything moves.
 	 */
 	readonly view: readonly TableRow[]
-	/** How many rows the filter admits, before the page narrows them. */
+	/** Counts the rows the filter admits, before the page narrows them. */
 	readonly count: number
-	/** Whether the table has been torn down. */
+	/** Reports whether the table has been torn down. */
 	readonly destroyed: boolean
 	/**
-	 * Put the table back the way it opened, holding nothing.
+	 * Puts the table back the way it opened, holding nothing.
 	 *
 	 * @remarks
 	 * Every row goes, and sort, filter, selection, expansion, and the page all reset. The table
@@ -840,7 +855,7 @@ export interface TableInterface {
 	 */
 	clear(): void
 	/**
-	 * Tear the table down.
+	 * Tears the table down.
 	 *
 	 * @remarks
 	 * Calling it twice does what calling it once did. Afterwards every write throws a
```

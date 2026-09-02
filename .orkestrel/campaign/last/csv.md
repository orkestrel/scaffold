# Last changes: csv

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `5e4f03b`, merge base with `origin/main` `4877451`, layer L1, declared version 0.0.5, registry version 0.0.5.

## Commits since origin/main

```text
44b7939 2026-08-28 Update every dependency to the published latest
a32eb58 2026-08-28 Adopt the catalog and guide mirrors for the wave
d93a676 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
bce8508 2026-09-01 Apply the verified src-audit fixes
bee06cc 2026-09-01 Adopt the renamed guide helpers in the parity test
f73364d 2026-09-02 Apply the breaking rows in csv
1b0a142 2026-09-02 Pin the guide's comparisons against contract's parsers with executed tests
51860ac 2026-09-02 Point the README at the guide the package ships
5e4f03b 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md       |  17 ++--
 README.md                         |   4 +-
 package.json                      |   6 +-
 src/core/CSV.ts                   |  18 ++--
 src/core/constants.ts             |  36 ++++----
 src/core/errors.ts                |   9 +-
 src/core/factories.ts             |   6 +-
 src/core/helpers.ts               | 372 ++++++++++++++----------------------------------------------------------------
 src/core/index.ts                 |   1 +
 src/core/inferers.ts              | 125 ++++++++++++++++++++++++++
 src/core/parsers.ts               | 103 ++++++++++++++++++++--
 src/core/shapers.ts               |  68 +++++++++++++--
 src/core/types.ts                 | 162 +++++++++++++++++++---------------
 src/core/validators.ts            |  25 ++----
 tests/guides.test.ts              |  22 ++---
 tests/src/core/helpers.test.ts    |  89 ++++---------------
 tests/src/core/inferers.test.ts   |  69 +++++++++++++++
 tests/src/core/parsers.test.ts    |  96 +++++++++-----------
 tests/src/core/shapers.test.ts    |  31 ++++++-
 tests/src/core/validators.test.ts |  20 +----
 20 files changed, 667 insertions(+), 612 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index 4c9dee3..c823288 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -3,19 +3,23 @@ import type { ParseOptions, RenderOptions } from './types.js'
 // Centralized, frozen data the parser / renderer draw their defaults and
 // canonical-format patterns from (AGENTS §5) - no behavior lives here.
 
-/** The UTF-8 byte-order-mark character, prepended when `RenderOptions.bom` is `true`. */
+/** Names the UTF-8 byte-order-mark character, prepended when `RenderOptions.bom` is `true`. */
 export const BOM = '﻿'
 
 /**
- * The resolved default {@link ParseOptions} - what `parseCSV` uses for any
- * option left unspecified.
+ * Holds the resolved default {@link ParseOptions} (everything but `comment`,
+ * which has no default) - what `parseCSV` uses for any option left
+ * unspecified.
+ *
+ * @remarks
+ * An absent `comment` is what leaves comment handling off, so this table
+ * declares no `comment` member: see {@link ResolvedParseOptions}.
  */
-export const DEFAULT_PARSE_OPTIONS: Required<ParseOptions> = Object.freeze({
+export const DEFAULT_PARSE_OPTIONS: Required<Omit<ParseOptions, 'comment'>> = Object.freeze({
 	delimiter: ',',
 	quote: '"',
 	escape: 'double',
 	header: true,
-	comment: false,
 	blanks: 'keep',
 	trim: false,
 	ragged: 'collect',
@@ -25,8 +29,9 @@ export const DEFAULT_PARSE_OPTIONS: Required<ParseOptions> = Object.freeze({
 })
 
 /**
- * The resolved default {@link RenderOptions} (everything but `columns`, which
- * has no default) - what `renderCSV` uses for any option left unspecified.
+ * Holds the resolved default {@link RenderOptions} (everything but `columns`,
+ * which has no default) - what `renderCSV` uses for any option left
+ * unspecified.
  */
 export const DEFAULT_RENDER_OPTIONS: Required<Omit<RenderOptions, 'columns'>> = Object.freeze({
 	delimiter: ',',
@@ -41,7 +46,7 @@ export const DEFAULT_RENDER_OPTIONS: Required<Omit<RenderOptions, 'columns'>> =
 })
 
 /**
- * The leading characters the OWASP CSV-injection guard treats as
+ * Lists the leading characters the OWASP CSV-injection guard treats as
  * formula-triggering - a field starting with any of these is prefixed with a
  * protective `'` when `RenderOptions.sanitize` is `true`.
  */
@@ -56,19 +61,20 @@ export const SANITIZE_PREFIXES: ReadonlySet<string> = new Set([
 ])
 
 /**
- * The prefix used to name positional columns (`column1`, `column2`, …) when
+ * Names the prefix used for positional columns (`column1`, `column2`, …) when
  * `ParseOptions.header` is `false`, or a header field is empty - 1-based.
  */
 export const POSITIONAL_COLUMN_PREFIX = 'column'
 
 /**
- * The protective prefix {@link sanitizeField} prepends to a field starting
- * with a formula-triggering character (the OWASP CSV-injection guidance).
+ * Names the protective prefix {@link sanitizeField} prepends to a field
+ * starting with a formula-triggering character (the OWASP CSV-injection
+ * guidance).
  */
 export const SANITIZE_ESCAPE = "'"
 
 /**
- * The separator between a disambiguated column name and its collision
+ * Names the separator between a disambiguated column name and its collision
  * counter (`name` -> `name_2`, `name_3`, …) - see {@link uniqueName}.
  */
 export const SUFFIX_SEPARATOR = '_'
@@ -95,14 +101,14 @@ export const REAL_PATTERN = /^-?(0|[1-9]\d*)(\.\d+)?$/
  */
 export const NUMERIC_PATTERN = /^[+-]?(0|[1-9]\d*)(\.\d+)?$/
 
-/** The canonical serialized form of the boolean `true`. */
+/** Names the canonical serialized form of the boolean `true`. */
 export const BOOLEAN_TRUE = 'true'
 
-/** The canonical serialized form of the boolean `false`. */
+/** Names the canonical serialized form of the boolean `false`. */
 export const BOOLEAN_FALSE = 'false'
 
 /**
- * The maximum number of {@link CSVError}s collected into a parse result -
+ * Sets the maximum number of {@link CSVError}s collected into a parse result -
  * once reached, error collection stops (earlier records already parsed are
  * kept, later malformations are silently no longer recorded).
  */
diff --git a/src/core/errors.ts b/src/core/errors.ts
index d024523..d878a12 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -8,8 +8,9 @@ import type { CSVErrorCode } from './types.js'
 // which case it throws immediately.
 
 /**
- * An error surfaced by the CSV layer - either thrown for a programmer error /
- * `strict`-mode parse failure, or collected into a result's `errors` list.
+ * Represents an error surfaced by the CSV layer - either thrown for a
+ * programmer error / `strict`-mode parse failure, or collected into a
+ * result's `errors` list.
  *
  * @remarks
  * Carries a {@link CSVErrorCode} and, for a parse-time malformation, the
@@ -45,10 +46,10 @@ export class CSVError extends Error {
 }
 
 /**
- * Narrow an unknown caught value to a {@link CSVError}.
+ * Narrows an unknown caught value to a {@link CSVError}.
  *
  * @param value - The value to test (typically a `catch` binding)
- * @returns `true` when `value` is a {@link CSVError}
+ * @returns True if `value` is a {@link CSVError}; false otherwise
  *
  * @example
  * ```ts
diff --git a/src/core/index.ts b/src/core/index.ts
index 9d96e8c..b3c1132 100644
--- a/src/core/index.ts
+++ b/src/core/index.ts
@@ -2,6 +2,7 @@ export * from './types.js'
 export * from './constants.js'
 export * from './errors.js'
 export * from './helpers.js'
+export * from './inferers.js'
 export * from './parsers.js'
 export * from './shapers.js'
 export * from './validators.js'
diff --git a/src/core/types.ts b/src/core/types.ts
index cdb6044..848cc1b 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -7,23 +7,24 @@ import type { CSVError } from './errors.js'
 // this file re-derives the equivalent shapes locally so both packages stay
 // independent and portable. Types are the source of truth (AGENTS §2).
 
-/** A CSV row - a plain record of column values keyed by column name. */
+/** Represents a CSV row - a plain record of column values keyed by column name. */
 export type Row = Record<string, unknown>
 
 /**
- * A parsed CSV table - the typed rows plus the column order they were parsed
- * (or declared) in.
+ * Represents a parsed CSV table - the typed rows plus the column order they
+ * were parsed (or declared) in.
  */
 export interface CSVTable {
-	/** The column names, in order. */
+	/** Holds the column names, in order. */
 	readonly columns: readonly string[]
-	/** The parsed rows, in source order. */
+	/** Holds the parsed rows, in source order. */
 	readonly rows: readonly Row[]
 }
 
 /**
- * One raw parsed field - the value exactly as it appeared in a record, before
- * type inference or column mapping, plus whether it was quoted in the source.
+ * Represents one raw parsed field - the value exactly as it appeared in a
+ * record, before type inference or column mapping, plus whether it was quoted
+ * in the source.
  *
  * @remarks
  * `quoted` distinguishes a field that was empty because it was written `""`
@@ -31,139 +32,144 @@ export interface CSVTable {
  * type inference and the `'nonnumeric'` quote policy both depend on.
  */
 export interface RawField {
-	/** The field's decoded text (quotes removed, escapes resolved). */
+	/** Holds the field's decoded text (quotes removed, escapes resolved). */
 	readonly value: string
-	/** `true` when the field was wrapped in quotes in the source. */
+	/** Reports whether the field was wrapped in quotes in the source. */
 	readonly quoted: boolean
 }
 
 /**
- * A cursor position in a parsed source text - relative to the input after
- * byte-order-mark removal.
+ * Represents a cursor position in a parsed source text - relative to the
+ * input after byte-order-mark removal.
  *
  * @remarks
  * `offset` is a 0-based UTF-16 code-unit index; `line` is 1-based; `column`
  * is 1-based in UTF-16 code units.
  */
 export interface Position {
-	/** The 0-based UTF-16 code-unit offset. */
+	/** Holds the 0-based UTF-16 code-unit offset. */
 	readonly offset: number
-	/** The 1-based line. */
+	/** Holds the 1-based line. */
 	readonly line: number
-	/** The 1-based column, in UTF-16 code units. */
+	/** Holds the 1-based column, in UTF-16 code units. */
 	readonly column: number
 }
 
 /**
- * One raw parsed record - its ordered {@link RawField}s plus where the record
- * begins in the source, before header mapping.
+ * Represents one raw parsed record - its ordered {@link RawField}s plus where
+ * the record begins in the source, before header mapping.
  *
  * @remarks
  * `start` lets table-building errors (ragged rows, header faults) point back
  * at the exact record that produced them.
  */
 export interface RawRecord {
-	/** The record's fields, in source order. */
+	/** Holds the record's fields, in source order. */
 	readonly fields: readonly RawField[]
-	/** The position the record starts at. */
+	/** Holds the position the record starts at. */
 	readonly start: Position
 }
 
 /**
- * One scanned field - a single {@link RawField} the tokenizer produced, the
- * {@link Position} immediately after it, and any malformations found while
- * scanning it.
+ * Represents one scanned field - a single {@link RawField} the tokenizer
+ * produced, the {@link Position} immediately after it, and any malformations
+ * found while scanning it.
  */
 export interface FieldScan {
-	/** The scanned field. */
+	/** Holds the scanned field. */
 	readonly field: RawField
-	/** The position immediately after the field. */
+	/** Holds the position immediately after the field. */
 	readonly next: Position
-	/** Malformations found while scanning this field. */
+	/** Lists the malformations found while scanning this field. */
 	readonly errors: readonly CSVError[]
 }
 
 /**
- * One scanned record - a single {@link RawRecord} the tokenizer produced, the
- * {@link Position} immediately after it, and any malformations found while
- * scanning it.
+ * Represents one scanned record - a single {@link RawRecord} the tokenizer
+ * produced, the {@link Position} immediately after it, and any malformations
+ * found while scanning it.
  */
 export interface RecordScan {
-	/** The scanned record. */
+	/** Holds the scanned record. */
 	readonly record: RawRecord
-	/** The position immediately after the record. */
+	/** Holds the position immediately after the record. */
 	readonly next: Position
-	/** Malformations found while scanning this record. */
+	/** Lists the malformations found while scanning this record. */
 	readonly errors: readonly CSVError[]
 }
 
 /**
- * The result of resolving a header record - the disambiguated column names,
- * the remaining body records, and any header-related errors.
+ * Represents the result of resolving a header record - the disambiguated
+ * column names, the remaining body records, and any header-related errors.
  */
 export interface HeaderResult {
-	/** The disambiguated column names, in order. */
+	/** Holds the disambiguated column names, in order. */
 	readonly columns: readonly string[]
-	/** The records that make up the table body (the header record excluded). */
+	/** Holds the records that make up the table body (the header record excluded). */
 	readonly body: readonly RawRecord[]
-	/** Errors collected while resolving the header (`EMPTY_HEADER` / `DUPLICATE_HEADER`). */
+	/**
+	 * Lists the errors collected while resolving the header (`EMPTY_HEADER` /
+	 * `DUPLICATE_HEADER`).
+	 */
 	readonly errors: readonly CSVError[]
 }
 
 /**
- * The result of building one {@link RawRecord} into a typed {@link Row} -
- * either the row, or the error that excluded it (see `ParseOptions.ragged`).
+ * Represents the result of building one {@link RawRecord} into a typed
+ * {@link Row} - either the row, or the error that excluded it (see
+ * `ParseOptions.ragged`).
  */
 export interface RowResult {
-	/** The built row, when the record was kept. */
+	/** Holds the built row, when the record was kept. */
 	readonly row?: Row
-	/** The error collected, when the record was ragged. */
+	/** Holds the error collected, when the record was ragged. */
 	readonly error?: CSVError
 }
 
 /**
- * The result of the record-splitting phase - every {@link RawRecord} the
- * tokenizer produced plus any {@link CSVError}s collected along the way.
+ * Represents the result of the record-splitting phase - every
+ * {@link RawRecord} the tokenizer produced plus any {@link CSVError}s
+ * collected along the way.
  */
 export interface RecordsResult {
-	/** The raw records, in source order. */
+	/** Holds the raw records, in source order. */
 	readonly records: readonly RawRecord[]
-	/** Errors collected while splitting (capped at {@link MAX_ERRORS}). */
+	/** Lists the errors collected while splitting (capped at {@link MAX_ERRORS}). */
 	readonly errors: readonly CSVError[]
 }
 
 /**
- * The result of a full parse - the assembled {@link CSVTable} plus any
- * {@link CSVError}s collected along the way.
+ * Represents the result of a full parse - the assembled {@link CSVTable} plus
+ * any {@link CSVError}s collected along the way.
  */
 export interface CSVParseResult {
-	/** The parsed table. */
+	/** Holds the parsed table. */
 	readonly table: CSVTable
-	/** Errors collected while parsing (capped at {@link MAX_ERRORS}). */
+	/** Lists the errors collected while parsing (capped at {@link MAX_ERRORS}). */
 	readonly errors: readonly CSVError[]
 }
 
-/** How an embedded quote character is escaped inside a quoted field. */
+/** Names how an embedded quote character is escaped inside a quoted field. */
 export type EscapeStyle = 'double' | 'backslash'
 
-/** The renderer's quoting policy - which fields get wrapped in quotes. */
+/** Names the renderer's quoting policy - which fields get wrapped in quotes. */
 export type QuoteStyle = 'minimal' | 'always' | 'nonnumeric'
 
-/** How the parser treats a blank line - kept as an empty row, or skipped entirely. */
+/** Names how the parser treats a blank line - kept as an empty row, or skipped entirely. */
 export type BlankPolicy = 'keep' | 'skip'
 
-/** How the parser treats a record whose field count does not match the header. */
+/** Names how the parser treats a record whose field count does not match the header. */
 export type RaggedPolicy = 'collect' | 'pad' | 'error'
 
 /**
- * A portable storage type for a column - mirrors `@orkestrel/database`'s
+ * Names a portable storage type for a column - mirrors `@orkestrel/database`'s
  * `ColumnType` structurally (never imported) so a CSV column map and a
  * database table schema stay drop-in interchangeable.
  */
 export type ColumnType = 'text' | 'integer' | 'real' | 'boolean' | 'json' | 'blob'
 
 /**
- * A CSV's declared columns - a map of column name to its value
+ * Represents a CSV's declared columns - a map of column name to its value
  * {@link ContractShape}.
  *
  * @remarks
@@ -175,7 +181,7 @@ export type ColumnType = 'text' | 'integer' | 'real' | 'boolean' | 'json' | 'blo
 export type Columns = Readonly<Record<string, ContractShape>>
 
 /**
- * Options for parsing CSV text into a {@link CSVTable}.
+ * Represents the options for parsing CSV text into a {@link CSVTable}.
  *
  * @remarks
  * `delimiter` is the field separator (`,`); `quote` the quote character
@@ -183,7 +189,7 @@ export type Columns = Readonly<Record<string, ContractShape>>
  * `'double'` doubles it (`""`), `'backslash'` prefixes it (`\"`); `header`
  * whether the first record names the columns (`true`) or is itself data
  * (`false`, columns become `column1..columnN`); `comment` a leading-character
- * marking a line as a comment to skip (`false` disables comment handling);
+ * marking a line as a comment to skip (absent, no line is a comment);
  * `blanks` whether a blank line becomes an empty row (`'keep'`) or is dropped
  * (`'skip'`) - a line of only whitespace is never blank, so `trim` does not
  * change what `blanks` skips; `trim` whether leading/trailing whitespace is stripped from
@@ -201,7 +207,7 @@ export interface ParseOptions {
 	readonly quote?: string
 	readonly escape?: EscapeStyle
 	readonly header?: boolean
-	readonly comment?: string | false
+	readonly comment?: string
 	readonly blanks?: BlankPolicy
 	readonly trim?: boolean
 	readonly ragged?: RaggedPolicy
@@ -211,7 +217,20 @@ export interface ParseOptions {
 }
 
 /**
- * Options for rendering a {@link CSVTable} (or row list) back to CSV text.
+ * Represents the fully-resolved parse configuration every tokenizer and
+ * table-building helper takes - {@link ParseOptions} with every member
+ * defaulted except `comment`, which has no default and stays optional.
+ *
+ * @remarks
+ * An absent `comment` is what turns comment handling off, so
+ * {@link DEFAULT_PARSE_OPTIONS} declares no `comment` member at all.
+ */
+export type ResolvedParseOptions = Required<Omit<ParseOptions, 'comment'>> &
+	Pick<ParseOptions, 'comment'>
+
+/**
+ * Represents the options for rendering a {@link CSVTable} (or row list) back
+ * to CSV text.
  *
  * @remarks
  * `delimiter` is the field separator (`,`); `quote` the quote character
@@ -242,15 +261,15 @@ export interface RenderOptions {
 }
 
 /**
- * The fully-resolved render configuration every quoting and rendering helper
- * takes - {@link RenderOptions} with every member defaulted except `columns`,
- * which has no default and stays optional.
+ * Represents the fully-resolved render configuration every quoting and
+ * rendering helper takes - {@link RenderOptions} with every member defaulted
+ * except `columns`, which has no default and stays optional.
  */
 export type ResolvedRenderOptions = Required<Omit<RenderOptions, 'columns'>> &
 	Pick<RenderOptions, 'columns'>
 
 /**
- * Options for {@link CSVInterface.export}.
+ * Represents the options for {@link CSVInterface.export}.
  *
  * @remarks
  * `key` names the export (mirrors `@orkestrel/database`'s `TableExport` unit
@@ -263,8 +282,9 @@ export interface ExportOptions {
 }
 
 /**
- * A CSV's portable definition, produced by {@link CSVInterface.export} - the
- * unit of schema exchange across environments.
+ * Represents a CSV's portable definition, produced by
+ * {@link CSVInterface.export} - the unit of schema exchange across
+ * environments.
  *
  * @remarks
  * Structurally mirrors `@orkestrel/database`'s `TableExport` (never
@@ -278,7 +298,7 @@ export interface TableExport {
 	readonly schema: JSONSchema
 }
 
-/** A machine-readable {@link CSVError} code. */
+/** Names a machine-readable {@link CSVError} code. */
 export type CSVErrorCode =
 	| 'UNTERMINATED_QUOTE'
 	| 'BAD_QUOTE'
@@ -289,8 +309,8 @@ export type CSVErrorCode =
 	| 'INVALID_OPTION'
 
 /**
- * A parsed, queryable CSV document - the typed {@link CSVTable} plus the
- * query, rewrite, and export operations over it.
+ * Represents a parsed, queryable CSV document - the typed {@link CSVTable}
+ * plus the query, rewrite, and export operations over it.
  *
  * @remarks
  * **Immutable.** {@link CSVInterface.map} never mutates the stored table - it
@@ -300,11 +320,11 @@ export type CSVErrorCode =
  * per call.
  */
 export interface CSVInterface {
-	/** The parsed table (columns + rows). */
+	/** Holds the parsed table (columns + rows). */
 	readonly table: CSVTable
-	/** The parsed rows, in table order (same as `table.rows`). */
+	/** Holds the parsed rows, in table order (same as `table.rows`). */
 	readonly rows: readonly Row[]
-	/** Errors collected while parsing (capped at {@link MAX_ERRORS}). */
+	/** Lists the errors collected while parsing (capped at {@link MAX_ERRORS}). */
 	readonly errors: readonly CSVError[]
 	/** Finds the first row matching `predicate`. */
 	find(predicate: (row: Row, index: number) => boolean): Row | undefined
@@ -315,8 +335,8 @@ export interface CSVInterface {
 	/** Folds the rows, in table order, into an accumulator. */
 	reduce<T>(callback: (accumulator: T, row: Row, index: number) => T, initial: T): T
 	/**
-	 * A web-standard `ReadableStream` over the table's rows (source order) -
-	 * a lazy, pull-based, backpressure-respecting source. A fresh,
+	 * Returns a web-standard `ReadableStream` over the table's rows (source
+	 * order) - a lazy, pull-based, backpressure-respecting source. A fresh,
 	 * independently-replayable stream every call; never mutates the table.
 	 */
 	stream(): ReadableStream<Row>
```

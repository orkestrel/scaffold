# Report — `d7n-csv-prep`

Wall clock: 2026-09-07T15:03:44Z to 2026-09-07T15:07:53Z.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

Summary line: `9 written, 27 unchanged, 0 removed in ..`

`git status --short` after:

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

Matches the P21 list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Hunk:

```diff
 		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
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
+							: findMissing(source.methods(entity).map((method) => method.name), documented)
 					expect(extra).toEqual([])
 				})
 			})
 		}
...
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
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
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

No other change to the suite; the `findMissing(names, surface)` import-walk site stayed untouched.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1, before any fix, printed:

```
tests/src/core/shapers.test.ts:7:1: error policy(no-banned-term): Replace via in this comment: through, by using.
src/core/CSV.ts:15:1: error policy(no-banned-term): Replace should in this comment: must, can, might, or the imperative.
src/core/inferers.ts:58:1: error policy(no-banned-term): Replace via in this comment: through, by using.
src/core/inferers.ts:85:1: error policy(no-banned-term): Replace via in this comment: through, by using.
src/core/shapers.ts:23:1: error policy(no-banned-term): Replace via in this comment: through, by using.
src/core/shapers.ts:92:1: error policy(no-banned-term): Replace via in this comment: through, by using.
src/core/helpers.ts:683:1: error policy(no-banned-term): Replace via in this comment: through, by using.
src/core/helpers.ts:797:1: error policy(no-banned-term): Replace via in this comment: through, by using.
src/core/helpers.ts:857:1: error policy(no-banned-term): Replace and/or in this comment: and, or, or both.
tests/setup.ts:14:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setup.ts:40:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setup.ts:56:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setup.ts:71:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setup.ts:86:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
```

Matches the P20 file/total distribution exactly (`tests/setup.ts(5) src/core/helpers.ts(3) src/core/shapers.ts(2) src/core/inferers.ts(2)`, plus `tests/src/core/shapers.test.ts(1)` and `src/core/CSV.ts(1)`).

Per-diagnostic before/after:

**`tests/src/core/shapers.test.ts:7` (`no-banned-term: via`)**
```
- // Each shape here compiles (via createContract) into a guard / parser /
+ // Each shape here compiles (through createContract) into a guard / parser /
```

**`src/core/CSV.ts:15` (`no-banned-term: should`)**
```
- *   value should gate it with a guard first; `errors` is empty in that case.
+ *   value must gate it with a guard first; `errors` is empty in that case.
```

**`src/core/inferers.ts:58` (`no-banned-term: via`)**
```
- * @returns The typed value, via {@link parseInteger} / {@link parseReal} /
+ * @returns The typed value, through {@link parseInteger} / {@link parseReal} /
```

**`src/core/inferers.ts:85` (`no-banned-term: via`)**
```
- * that type via {@link coerceInferred}.
+ * that type through {@link coerceInferred}.
```

**`src/core/shapers.ts:23` (`no-banned-term: via`)**
```
- * `'json'` accepts any JSON value via {@link jsonShape}.
+ * `'json'` accepts any JSON value through {@link jsonShape}.
```

**`src/core/shapers.ts:92` (`no-banned-term: via`)**
```
- * column has no non-empty cells; the string-inferred type (via
+ * column has no non-empty cells; the string-inferred type (through
```

**`src/core/helpers.ts:683` (`no-banned-term: via`)**
```
- * `options.delimiter`, ending at a break (consumed via {@link scanBreak}) or
+ * `options.delimiter`, ending at a break (consumed through {@link scanBreak}) or
```

**`src/core/helpers.ts:797` (`no-banned-term: via`)**
```
- * `header: true` disambiguates via {@link uniqueColumns}, collecting
+ * `header: true` disambiguates through {@link uniqueColumns}, collecting
```

**`src/core/helpers.ts:857` (`no-banned-term: and/or`)**
```
- * @returns The built row and/or the ragged-row error
+ * @returns The built row, and the ragged-row error when one occurs
```

**`tests/setup.ts:14` (`no-malformed-summary`, `assertAndNarrow`)**
```
- * Assert that `value` satisfies `guard` and return it narrowed to `T` —
+ * Asserts that `value` satisfies `guard` and returns it narrowed to `T` —
```

**`tests/setup.ts:40` (`no-malformed-summary`, `buildQuotedField`)**
```
- * A quoted CSV field containing a delimiter, a CR, an LF, and an escaped
- * quote — the canonical field that forces quoting and exercises embedded
- * newline / escape handling in one fixture.
+ * Builds a quoted CSV field containing a delimiter, a CR, an LF, and an
+ * escaped quote — the canonical field that forces quoting and exercises
+ * embedded newline / escape handling in one fixture.
```

**`tests/setup.ts:56` (`no-malformed-summary`, `buildRaggedCSV`)**
```
- * A ragged CSV document — a three-column header, one row with fewer fields
- * than the header, and one row with more.
+ * Builds a ragged CSV document — a three-column header, one row with fewer
+ * fields than the header, and one row with more.
```

**`tests/setup.ts:71` (`no-malformed-summary`, `buildMixedNewlineCSV`)**
```
- * A CSV document whose records are separated by every newline convention in
- * one document — CRLF, bare LF, and bare CR.
+ * Builds a CSV document whose records are separated by every newline
+ * convention in one document — CRLF, bare LF, and bare CR.
```

**`tests/setup.ts:86` (`no-malformed-summary`, `buildInferenceTraps`)**
```
- * The classic type-inference trap strings — values that LOOK numeric or
+ * Lists the classic type-inference trap strings — values that LOOK numeric or
```

`npx oxlint --config .oxlintrc.json --deny-warnings .` after the preceding edits: exit `0`, no diagnostics.

`npm run test:policy` after the preceding edits still reported one `prose` failure, naming six `via` hits in `guides/csv.md` at lines `116, 137, 150, 219, 220, 259` — the same lines the standing conditions named. Applied the substitution-table row (`via` → `through`) at exactly those six lines and nothing else in the file:

```
line 116: Deterministically disambiguates header names ... , via `uniqueName`.        →  ... , through `uniqueName`.
line 137: disambiguates the first record (`header: true`, via `uniqueColumns`) ...    →  ... (`header: true`, through `uniqueColumns`) ...
line 150: Coerces one string cell to `type`'s typed representation, via `parseInteger` ...  →  ... , through `parseInteger` ...
line 219: Rewrites every row (copy-on-write) via a callback ...                       →  ... through a callback ...
line 220: Folds the rows, in table order, into an accumulator via a plain reducer ...  →  ... through a plain reducer ...
line 259: empty header name is deterministically renamed via `uniqueColumns` ...       →  ... through `uniqueColumns` ...
```

No diagnostic named an off-limits file.

## Item 4 — the bump

```diff
-	"version": "0.0.6",
+	"version": "0.0.7",
```

`package-lock.json` untouched.

## Acceptance criteria

**1. `git status --short`**

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M guides/csv.md
 M package.json
 M src/core/CSV.ts
 M src/core/helpers.ts
 M src/core/inferers.ts
 M src/core/shapers.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/src/core/shapers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

The P21 repair list, plus `tests/guides.test.ts` (item 2), plus the item 3 files (`guides/csv.md`, `src/core/CSV.ts`, `src/core/helpers.ts`, `src/core/inferers.ts`, `src/core/shapers.ts`, `tests/setup.ts`, `tests/src/core/shapers.test.ts`), plus `package.json` (version bump; the `docs` script row already came from repair). Nothing else.

**2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, `npm run check`**

```
> oxfmt --config .oxfmtrc.json --check .
All matched files use the correct format.
Finished in 4208ms on 48 files using 4 threads.
```
Exit 0.

```
(no output)
```
`oxlint` exit 0.

```
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
```
Exit 0.

**3. `npm run test:guides`, `npm run test:policy`, `npm run test:config`**

```
 Test Files  1 passed (1)
      Tests  31 passed (31)
```
`test:guides` exit 0 (record shapes now match the `0.0.18` readers; no `TS2345` errors).

```
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
```
`test:policy` exit 0.

```
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
```
`test:config` exit 0.

**4. `npm run docs`**

Exit 1, `rows read: 1, disagreements found: 89`. Worklist verbatim:

```
guides/csv.md type Row: guide absent source "Represents a CSV row - a plain record of column values keyed by column name."
guides/csv.md interface CSVTable: guide absent source "Represents a parsed CSV table - the typed rows plus the column order they were parsed (or declared) in."
guides/csv.md interface RawField: guide absent source "Represents one raw parsed field - the value exactly as it appeared in a record, before type inference or column mapping, plus whether it was quoted in the source."
guides/csv.md interface Position: guide absent source "Represents a cursor position in a parsed source text - relative to the input after byte-order-mark removal."
guides/csv.md interface RawRecord: guide absent source "Represents one raw parsed record - its ordered `RawField`s plus where the record begins in the source, before header mapping."
guides/csv.md interface FieldScan: guide absent source "Represents one scanned field - a single `RawField` the tokenizer produced, the `Position` immediately after it, and any malformations found while scanning it."
guides/csv.md interface RecordScan: guide absent source "Represents one scanned record - a single `RawRecord` the tokenizer produced, the `Position` immediately after it, and any malformations found while scanning it."
guides/csv.md interface HeaderResult: guide absent source "Represents the result of resolving a header record - the disambiguated column names, the remaining body records, and any header-related errors."
guides/csv.md interface RowResult: guide absent source "Represents the result of building one `RawRecord` into a typed `Row` - either the row, or the error that excluded it (see `ParseOptions.ragged`)."
guides/csv.md interface RecordsResult: guide absent source "Represents the result of the record-splitting phase - every `RawRecord` the tokenizer produced plus any `CSVError`s collected along the way."
guides/csv.md interface CSVParseResult: guide absent source "Represents the result of a full parse - the assembled `CSVTable` plus any `CSVError`s collected along the way."
guides/csv.md type EscapeStyle: guide absent source "Names how an embedded quote character is escaped inside a quoted field."
guides/csv.md type QuoteStyle: guide absent source "Names the renderer's quoting policy - which fields get wrapped in quotes."
guides/csv.md type RaggedPolicy: guide absent source "Names how the parser treats a record whose field count does not match the header."
guides/csv.md type ColumnType: guide absent source "Names a portable storage type for a column - the same literal set `@orkestrel/database` declares as `ColumnStorage` (never imported), so a CSV column map and a database table schema stay drop-in interchangeable."
guides/csv.md type Columns: guide absent source "Represents a CSV's declared columns - a map of column name to its value `ContractShape`."
guides/csv.md interface ParseOptions: guide absent source "Represents the options for parsing CSV text into a `CSVTable`."
guides/csv.md type ResolvedParseOptions: guide absent source "Represents the fully-resolved parse configuration every tokenizer and table-building helper takes - `ParseOptions` with every member defaulted except `comment`, which has no default and stays optional."
guides/csv.md interface RenderOptions: guide absent source "Represents the options for rendering a `CSVTable` (or row list) back to CSV text."
guides/csv.md type ResolvedRenderOptions: guide absent source "Represents the fully-resolved render configuration every quoting and rendering helper takes - `RenderOptions` with every member defaulted except `columns`, which has no default and stays optional."
guides/csv.md interface ExportOptions: guide absent source "Represents the options for `CSVInterface.export`."
guides/csv.md interface TableExport: guide absent source "Represents a CSV's portable definition, produced by `CSVInterface.export` - the unit of schema exchange across environments."
guides/csv.md type CSVErrorCode: guide absent source "Names a machine-readable `CSVError` code."
guides/csv.md interface CSVInterface: guide absent source "Represents a parsed, queryable CSV document - the typed `CSVTable` plus the query, rewrite, and export operations over it."
guides/csv.md class CSVError: guide absent source "Represents an error surfaced by the CSV layer - either thrown for a programmer error / `strict`-mode parse failure, or collected into a result's `errors` list."
guides/csv.md function isCSVError: guide absent source "Narrows an unknown caught value to a `CSVError`."
guides/csv.md const BOM: guide absent source "Names the UTF-8 byte-order-mark character, prepended when `RenderOptions.bom` is `true`."
guides/csv.md const DEFAULT_PARSE_OPTIONS: guide absent source "Holds the resolved default `ParseOptions` (everything but `comment`, which has no default) - what `parseCSV` uses for any option left unspecified."
guides/csv.md const DEFAULT_RENDER_OPTIONS: guide absent source "Holds the resolved default `RenderOptions` (everything but `columns`, which has no default) - what `renderCSV` uses for any option left unspecified."
guides/csv.md const SANITIZE_PREFIXES: guide absent source "Lists the leading characters the OWASP CSV-injection guard treats as formula-triggering - a field starting with any of these is prefixed with a protective `'` when `RenderOptions.sanitize` is `true`."
guides/csv.md const POSITIONAL_COLUMN_PREFIX: guide absent source "Names the prefix used for positional columns (`column1`, `column2`, …) when `ParseOptions.header` is `false`, or a header field is empty - 1-based."
guides/csv.md const SANITIZE_ESCAPE: guide absent source "Names the protective prefix `sanitizeField` prepends to a field starting with a formula-triggering character (the OWASP CSV-injection guidance)."
guides/csv.md const SUFFIX_SEPARATOR: guide absent source "Names the separator between a disambiguated column name and its collision counter (`name` -> `name_2`, `name_3`, …) - see `uniqueName`."
guides/csv.md const INTEGER_PATTERN: guide absent source "Matches a canonical integer only - an optional leading `-`, no leading zeros (except the bare digit `0`), digits only. No `+` sign, no whitespace."
guides/csv.md const REAL_PATTERN: guide absent source "Matches a canonical decimal only - an optional leading `-`, an integer part with no leading zeros (except the bare digit `0`), an optional `.` followed by at least one digit. No scientific notation, no `NaN` / `Infinity`, no decimal comma, no trailing dot."
guides/csv.md const NUMERIC_PATTERN: guide absent source "Matches what the renderer treats as a plain number for the `'nonnumeric'` `QuoteStyle` and the sanitize `+` / `-` exemption - like `REAL_PATTERN` but also allowing a leading `+`."
guides/csv.md const BOOLEAN_TRUE: guide absent source "Names the canonical serialized form of the boolean `true`."
guides/csv.md const BOOLEAN_FALSE: guide absent source "Names the canonical serialized form of the boolean `false`."
guides/csv.md const MAX_ERRORS: guide absent source "Sets the maximum number of `CSVError`s collected into a parse result - once reached, error collection stops (earlier records already parsed are kept, later malformations are silently no longer recorded)."
guides/csv.md function assertValidSeparators: guide absent source "Validates a delimiter / quote pair shared by both `resolveParseOptions` and `resolveRenderOptions` - each must be exactly one character, they must differ, and neither may be CR, LF, or the BOM character."
guides/csv.md function resolveParseOptions: guide absent source "Merges `options` over `DEFAULT_PARSE_OPTIONS` into a fully-resolved parse configuration."
guides/csv.md function resolveRenderOptions: guide absent source "Merges `options` over `DEFAULT_RENDER_OPTIONS` into a fully-resolved render configuration."
guides/csv.md function uniqueName: guide absent source "Disambiguates a single column name against the names already taken - the collision leaf `uniqueColumns` composes over an entire header."
guides/csv.md function uniqueColumns: guide absent source "Disambiguates a header's column names deterministically - an empty (or whitespace-only) name becomes positional, and a name that repeats an earlier kept name is suffixed `_2`, `_3`, … until unique."
guides/csv.md function sanitizeField: guide absent source "Guards a field against CSV/spreadsheet formula injection (the OWASP CSV-injection guidance) - a field starting with a formula-triggering character is prefixed with a protective `SANITIZE_ESCAPE`."
guides/csv.md function serializeCell: guide absent source "Serializes one cell value to its rendered text - the renderer's stringify leaf, applied before sanitize/quote."
guides/csv.md function deriveColumns: guide absent source "Derives a column order from a plain row list - the first-seen union of every row's keys, in encounter order."
guides/csv.md function needsQuote: guide absent source "Checks `field` against the correctness floor every `QuoteStyle` policy respects - a field containing the delimiter, the quote character, CR, or LF must ALWAYS be quoted regardless of policy."
guides/csv.md function wrapQuoted: guide absent source "Wraps `field` in quotes, escaping per `options.escape` - the shared quote-and-escape step every quoting policy applies once it decides `field` needs quoting; it IS the `'always'` `QuoteStyle` as well (every field quoted unconditionally)."
guides/csv.md function quoteMinimal: guide absent source "Implements the `'minimal'` `QuoteStyle` - quotes a field only when `needsQuote` requires it."
guides/csv.md function quoteNonnumeric: guide absent source "Implements the `'nonnumeric'` `QuoteStyle` - quotes every field whose value is not a plain number (or that `needsQuote` requires regardless)."
guides/csv.md function renderRecord: guide absent source "Renders one row to one delimited line - serializes every column's cell, optionally sanitizes it, then applies the given quoting policy."
guides/csv.md function quoteStyleToPolicy: guide absent source "Selects the quoting-policy function for a resolved `options.quotes`."
guides/csv.md function isRowList: guide absent source "Narrows a `CSVTable | readonly Row[]` union to its row-list member."
guides/csv.md function renderCSV: guide absent source "Renders a `CSVTable` (or a plain row list) to CSV text."
guides/csv.md function advancePosition: guide absent source "Advances a `Position` by `count` NON-line-break characters."
guides/csv.md function isBreakChar: guide absent source "Checks whether `char` starts a record separator (CR or LF)."
guides/csv.md function scanBreak: guide absent source "Consumes exactly one line break (CRLF, bare LF, or bare CR) at `position` - a CRLF pair counts as ONE break."
guides/csv.md function scanComment: guide absent source "Consumes a comment line at `position`, when `options.comment` names one starting there - through the end of that line INCLUDING its break (or end-of-input)."
guides/csv.md function scanUnquoted: guide absent source "Scans one unquoted field starting at `position` - content runs until the delimiter, a line break, or end-of-input."
guides/csv.md function scanQuoted: guide absent source "Scans one quoted field starting at `position` - `position` must be AT the opening quote character."
guides/csv.md function scanField: guide absent source "Scans one field at `position` - dispatches to `scanQuoted` when the character there is `options.quote`, else `scanUnquoted`."
guides/csv.md function scanRecord: guide absent source "Scans one full record at `position` - fields separated by `options.delimiter`, ending at a break (consumed through `scanBreak`) or end-of-input."
guides/csv.md function readRecords: guide absent source "Splits `input` into raw, un-mapped `RawRecord`s - the tokenizer phase beneath `parseCSV`."
guides/csv.md function deriveHeader: guide absent source "Resolves a table's header from its raw records - disambiguates the first record's names when `options.header` is `true`, or generates positional names sized to the widest record otherwise."
guides/csv.md function buildRow: guide absent source "Builds one `RawRecord` into one null-prototype `Row`, padding or truncating to `columns.length` per `options.ragged`."
guides/csv.md function inferColumnType: guide absent source "Infers a whole column's `ColumnType` conservatively from its raw string values - never `'json'` or `'blob'` (those require an explicit `Columns` declaration). Empty-string cells are ignored entirely (they neither confirm nor demote a type); a column with no non-empty cells is `'text'`."
guides/csv.md function coerceInferred: guide absent source "Coerces one string cell to `type`'s typed representation - the exhaustive per-cell dispatch `inferRows` applies once a column's type is known."
guides/csv.md function inferRows: guide absent source "Applies whole-column type inference to a built row set - per column, infers its `ColumnType` from its string cells, then coerces every cell of that type through `coerceInferred`."
guides/csv.md function parseCSV: guide absent source "Parses `input` into a typed `CSVParseResult` - header mapping, ragged-row handling, and optional type inference on top of `readRecords`, `deriveHeader`, `buildRow`, and `inferRows`."
guides/csv.md function parseInteger: guide absent source "Parses a raw cell string into a canonical integer - `undefined` for anything else (leading zeros, decimals, out-of-safe-range magnitude, non-numeric text)."
guides/csv.md function parseReal: guide absent source "Parses a raw cell string into a canonical decimal (or integer) - `undefined` for anything else."
guides/csv.md function parseBoolean: guide absent source "Parses a raw cell string into a strict boolean - `undefined` for anything other than the exact canonical forms."
guides/csv.md function columnTypeShape: guide absent source "Returns the `ContractShape` a `ColumnType`'s values must satisfy."
guides/csv.md const csvTableShape: guide absent source "Represents the `ContractShape` of a `CSVTable`'s JSON-serializable projection - an ordered `columns` list of strings plus `rows`, each an open record of JSON values."
guides/csv.md function deriveShapes: guide absent source "Derives one `ContractShape` per table column from that column's cell values across all rows (excluding `undefined`/empty-string cells) - the schema-inference leaf behind `CSVInterface.export` when no explicit `Columns` is given."
guides/csv.md const isCSVTable: guide absent source "Determines whether an arbitrary value is a valid `CSVTable` - an array of column names plus an array of `Row`s."
guides/csv.md const isColumnType: guide absent source "Determines whether a value is a valid `ColumnType` literal."
guides/csv.md class CSV: guide absent source "Wraps a typed `CSVTable` with the query (`find` / `filter` / `reduce`), rewrite (`map`), streaming, and export operations `CSVInterface` declares."
guides/csv.md function createCSV: guide absent source "Creates a working `CSVInterface` from a CSV string or an already-parsed `CSVTable`."
guides/csv.md function createTableContract: guide absent source "Compiles a `Columns` map into a `ContractInterface` for a `Row` - a guard, coercing parser, JSON Schema, and seeded generator from one shape declaration."
guides/csv.md CSVInterface.find: guide absent source "Finds the first row matching `predicate`."
guides/csv.md CSVInterface.filter: guide absent source "Collects every row matching `predicate`."
guides/csv.md CSVInterface.map: guide absent source "Rewrites every row (copy-on-write) and returns a new `CSVInterface`."
guides/csv.md CSVInterface.reduce: guide absent source "Folds the rows, in table order, into an accumulator."
guides/csv.md CSVInterface.stream: guide absent source "Returns a web-standard `ReadableStream` over the table's rows (source order) - a lazy, pull-based, backpressure-respecting source. A fresh, independently-replayable stream every call; never mutates the table."
guides/csv.md CSVInterface.toJSON: guide absent source "Returns the stored `CSVTable` - the JSON-serializable projection."
guides/csv.md CSVInterface.export: guide absent source "Produces a portable `TableExport` for moving this CSV's schema elsewhere."
guides/csv.md pitch: readme absent tagline "A types-first RFC 4180 CSV parser and renderer — a hand-written, single-pass tokenizer that turns CSV text into a typed `CSVTable`, and a stateful `CSV` workspace that wraps that table with query, rewrite, streaming, and export operations. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 89
```

This is the converge unit's worklist; no gate other than `docs` reads red.

## Deviations

None. `repair` wrote only the P21 list. Every item-2 before-text was found verbatim. No voice diagnostic named an off-limits file. `test:policy` reddened only on `guides/csv.md`, the file the standing conditions already named, and reported the same six lines. All other gates read green after the items.

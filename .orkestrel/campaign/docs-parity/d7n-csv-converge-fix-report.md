# Report — `d7n-csv-converge-fix`

Every item landed. The tree I leave is `/home/user/fleet/csv` on branch
`claude/orkestrel-npm-audit-deps-14ibta`, baseline commit `c512407`
("Re-repair from scaffold's tip after the config-test fix"), uncommitted, with
`git status --short` listing the owned files alone.

## Item 1 — the examples binding (claim 15)

`tests/guides.test.ts` — the mapped `examples` ternary moved out of the
`it('documents an example for every method')` callback to the loop's own scope,
beside `documented`.

```diff
@@ -225,19 +225,19 @@ for (const entry of manifest) {
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
 			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface).map((example) => example.name)
-							: source
-									.examples(group.interface)
-									.map((example) => example.name)
-									.concat(source.examples(entity).map((example) => example.name))
 					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
```

The loop matches the pilot byte for byte:

```text
$ diff <(sed -n '209,227p' /home/user/fleet/abort/tests/guides.test.ts) <(sed -n '225,243p' tests/guides.test.ts) && echo "IDENTICAL LOOP"
IDENTICAL LOOP
```

## Item 2 — prose truth (F7)

`src/core/types.ts` — `RowResult`'s description now states what `buildRow`
returns.

```diff
 /**
  * Represents the result of building one {@link RawRecord} into a typed
- * {@link Row} - either the row, or the error that excluded it (see
- * `ParseOptions.ragged`).
+ * {@link Row} — the row, the error that excluded it, or both when
+ * `ParseOptions.ragged` is `'collect'`.
  */
 export interface RowResult {
```

I settled the claim by running `buildRow` against a short record under each
`RaggedPolicy` arm, in a probe file I then removed:

```text
pad: row present, error absent
collect: row present, error present
error: row absent, error present
```

`.claude/rules/documentation.md` § Parity requires the corrected sentence to
rest on an executed assertion. It already does, in `tests/src/core/helpers.test.ts`
(not owned, unchanged): `'"collect" pads a short record and collects RAGGED_ROW'`
asserts `result.row` and `result.error?.code` together, `'"pad" pads/truncates
silently'` asserts `result.error` undefined, and `'"error" omits the row,
returning only the error'` asserts `result.row` undefined. Each breaks if the
behaviour the sentence now states goes false, so I added no test.

`npm run docs -- --to guide` carried the cell to `guides/csv.md`.

## Item 3 — the em dash (F8, A)

Every clause-breaking ` - ` and the one prose `->` in the doc blocks under
`src/core/**` took ` — ` and ` → `. Markdown bullets (`src/core/CSV.ts` lines
opening `* - **Construction.**` and `* - **Immutable.**`), TSDoc `@param` and
`@throws` separators, hyphens inside code spans, and `@example` fence bodies are
untouched. The rewrite ran in a mid-line pass, then a pass over the breaks
sitting at a wrapped line's end, which the first pattern could not see.

Doc blocks changed, by file and symbol:

- `src/core/CSV.ts`: `CSV`, `map`, `stream`, `toJSON`
- `src/core/constants.ts`: `DEFAULT_PARSE_OPTIONS`, `DEFAULT_RENDER_OPTIONS`, `SANITIZE_PREFIXES`, `POSITIONAL_COLUMN_PREFIX`, `SUFFIX_SEPARATOR`, `INTEGER_PATTERN`, `REAL_PATTERN`, `NUMERIC_PATTERN`, `MAX_ERRORS`
- `src/core/errors.ts`: `CSVError`
- `src/core/factories.ts`: `createCSV`, `createTableContract`
- `src/core/helpers.ts`: `assertValidSeparators`, `resolveParseOptions`, `resolveRenderOptions`, `uniqueName`, `uniqueColumns`, `sanitizeField`, `serializeCell`, `deriveColumns`, `needsQuote`, `wrapQuoted`, `quoteMinimal`, `quoteNonnumeric`, `renderRecord`, `isRowList`, `renderCSV`, `scanBreak`, `scanComment`, `scanUnquoted`, `scanQuoted`, `scanField`, `scanRecord`, `readRecords`, `deriveHeader`
- `src/core/inferers.ts`: `inferColumnType`, `coerceInferred`, `inferRows`
- `src/core/parsers.ts`: `parseCSV`, `parseInteger`, `parseReal`, `parseBoolean`
- `src/core/shapers.ts`: `columnTypeShape`, `csvTableShape`, `deriveShapes`
- `src/core/types.ts`: `Row`, `CSVTable`, `RawField`, `Position`, `RawRecord`, `FieldScan`, `RecordScan`, `HeaderResult`, `RowResult`, `RecordsResult`, `CSVParseResult`, `QuoteStyle`, `ColumnType`, `Columns`, `ParseOptions`, `ResolvedParseOptions`, `RenderOptions`, `ResolvedRenderOptions`, `ExportOptions`, `TableExport`, `CSVInterface`, `CSVInterface.stream`, `CSVInterface.toJSON`
- `src/core/validators.ts`: `isCSVTable`

The `constants.ts` `MAX_ERRORS` block shows the wrapped-line form:

```diff
 /**
- * Sets the maximum number of {@link CSVError}s collected into a parse result -
+ * Sets the maximum number of {@link CSVError}s collected into a parse result —
  * once reached, error collection stops (earlier records already parsed are
```

Runs:

```text
$ npm run docs
rows read: 1, disagreements found: 58
$ npm run docs -- --to guide
rows read: 1, disagreements found: 58, written: 58, reported: 0
$ npx oxfmt --config .oxfmtrc.json --write <owned>
$ npm run docs
rows read: 1, disagreements found: 2
$ npm run docs -- --to guide
rows read: 1, disagreements found: 2, written: 2, reported: 0
$ npx oxfmt --config .oxfmtrc.json --write guides/csv.md
$ npm run docs
rows read: 1, disagreements found: 0
```

After the propagation `guides/csv.md` carries no `->` and one ` - `, at
`guides/csv.md:447`, a code comment inside the `### Guarding an adopted table`
fence:

```text
$ grep -n ' - ' guides/csv.md
447:	if (!isCSVTable(candidate)) return undefined // total guard - never throws
```

## Item 4 — § Surface's lead-in (F9)

```diff
 ## Surface

-A short intro, then a minimal usage example:
+Parse a document with `createCSV`, infer its column types, and read the rows
+as typed records:
```

I wrote the sentence the fence supports rather than the brief's suggested
"Parse a document, read its rows as typed records, and query them:", because the
fence calls `createCSV` with `infer: true` and reads `csv.rows`; it runs no query.
The brief licenses "the sentence the fences support". The form follows the
sibling guides' lead-ins (abort, budget, emitter): imperative verbs naming what
the fence does.

## Item 5 — the README count (C)

```diff
 Parse a document with the `createCSV` function, read its rows as plain typed
 records, and write a table back out with `renderCSV`. Dialect control and
-structural interop with `@orkestrel/database` are options on those two calls.
-Part of the `@orkestrel` line.
+structural interop with `@orkestrel/database` are options on the `createCSV`
+and `renderCSV` calls. Part of the `@orkestrel` line.
```

The paragraph is rewrapped to the file's own width. The blockquote pitch is
untouched.

## Item 6 — the `Shape` idiom (Ruling 12)

`guides/csv.md:45` is the one table carrying a `Shape` column. Its convention
sentence now states the fleet idiom, matching budget's wording:

```diff
 The full parse/render/export shape, from [`types.ts`](../src/core/types.ts). A
-`Shape` cell holds an interface's members in braces, and a type alias's
-value; an interface that declares call signatures documents them under
+`Shape` cell holds an interface's data members as bare names in braces, `?`
+marking an optional member and `plus` introducing its call-signature members,
+and a type alias's own type literal with a union's arms escaped as `\|`. An
+interface's call-signature members are documented under
 [`## Methods`](#methods).
```

Rows rewritten, splitting each line on a pipe not preceded by a backslash:

| Row | Was | Is |
| --- | --- | --- |
| `CSVTable` | `{ columns: readonly string[], rows: readonly Row[] }` | `{ columns, rows }` |
| `RawField` | `{ value: string, quoted: boolean }` | `{ value, quoted }` |
| `Position` | `{ offset: number, line: number, column: number }` | `{ offset, line, column }` |
| `RawRecord` | `{ fields: readonly RawField[], start: Position }` | `{ fields, start }` |
| `FieldScan` | `{ field: RawField, next: Position, errors: readonly CSVError[] }` | `{ field, next, errors }` |
| `RecordScan` | `{ record: RawRecord, next: Position, errors: readonly CSVError[] }` | `{ record, next, errors }` |
| `HeaderResult` | `{ columns: readonly string[], body: readonly RawRecord[], errors: readonly CSVError[] }` | `{ columns, body, errors }` |
| `RowResult` | `{ row?: Row, error?: CSVError }` | `{ row?, error? }` |
| `RecordsResult` | `{ records: readonly RawRecord[], errors: readonly CSVError[] }` | `{ records, errors }` |
| `CSVParseResult` | `{ table: CSVTable, errors: readonly CSVError[] }` | `{ table, errors }` |
| `ExportOptions` | `{ key?: string, columns?: Columns }` | `{ key?, columns? }` |
| `TableExport` | `{ key: string, columns: Columns, schema: JSONSchema }` | `{ key, columns, schema }` |
| `CSVInterface` | `{ table, rows, errors, find, filter, map, reduce, stream, toJSON, export }` | `{ table, rows, errors } plus find, filter, map, reduce, stream, toJSON, export` |

`CSVInterface`'s split follows its declaration in `src/core/types.ts`: `table`,
`rows`, and `errors` are `readonly` data members; `find`, `filter`, `map`,
`reduce`, `stream`, `toJSON`, and `export` are call signatures, and each has a
row in the `#### \`CSVInterface\`` Methods table. `ParseOptions`, `RenderOptions`,
and the type-alias rows (`Row`, `EscapeStyle`, `QuoteStyle`, `RaggedPolicy`,
`ColumnType`, `Columns`, `ResolvedParseOptions`, `ResolvedRenderOptions`,
`CSVErrorCode`) already held the idiom and are unchanged; every `\|` escape
survives.

## Criteria

### 1. Format, lint, and typecheck exit 0

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/csv.md README.md tests/guides.test.ts src/core/CSV.ts src/core/constants.ts src/core/errors.ts src/core/factories.ts src/core/helpers.ts src/core/index.ts src/core/inferers.ts src/core/parsers.ts src/core/shapers.ts src/core/types.ts src/core/validators.ts
All matched files use the correct format.
Finished in 1141ms on 14 files using 4 threads.
exit=0
```

```text
$ npx oxlint --config .oxlintrc.json --deny-warnings --format=json <the same owned paths>
{ "diagnostics": [],
              "number_of_files": 12,
              "number_of_rules": 140,
              "threads_count": 4,
              "start_time": 0.317118537
            }
exit=0
```

Plain `oxlint` prints nothing on a clean run, so I used `--format=json` to read
what it processed; the Markdown paths are not lintable, leaving the TypeScript
files. The criterion's own command is `npx oxlint --config .oxlintrc.json
--deny-warnings <owned paths>`, and it exits 0.

```text
$ npm run check
> @orkestrel/csv@0.0.7 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
exit=0
```

### 2. Docs at zero in each direction, suites green

```text
$ npm run docs
rows read: 1, disagreements found: 0
exit=0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
exit=0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
exit=0
```

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  34 passed (34)
   Duration  1.61s
exit=0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  954ms
exit=0

$ npm run test:src:core
 Test Files  7 passed (7)
      Tests  239 passed (239)
   Duration  1.96s
exit=0
```

### 3. The comparator names no row missing or added, and every changed cell in `Shape`

```text
$ node /home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/pass/cells/compare-cells.mjs /home/user/fleet/csv HEAD guides/csv.md
{
 "rowsBefore": 88,
 "rowsAfter": 88,
 "missing": [],
 "added": [],
 "changed": [
  { "key": "`CSVTable`", "col": "Shape", "was": "`{ columns: readonly string[], rows: readonly Row[] }`", "is": "`{ columns, rows }`" },
  { "key": "`RawField`", "col": "Shape", "was": "`{ value: string, quoted: boolean }`", "is": "`{ value, quoted }`" },
  { "key": "`Position`", "col": "Shape", "was": "`{ offset: number, line: number, column: number }`", "is": "`{ offset, line, column }`" },
  { "key": "`RawRecord`", "col": "Shape", "was": "`{ fields: readonly RawField[], start: Position }`", "is": "`{ fields, start }`" },
  { "key": "`FieldScan`", "col": "Shape", "was": "`{ field: RawField, next: Position, errors: readonly CSVError[] }`", "is": "`{ field, next, errors }`" },
  { "key": "`RecordScan`", "col": "Shape", "was": "`{ record: RawRecord, next: Position, errors: readonly CSVError[] }`", "is": "`{ record, next, errors }`" },
  { "key": "`HeaderResult`", "col": "Shape", "was": "`{ columns: readonly string[], body: readonly RawRecord[], errors: readonly CSVError[] }`", "is": "`{ columns, body, errors }`" },
  { "key": "`RowResult`", "col": "Shape", "was": "`{ row?: Row, error?: CSVError }`", "is": "`{ row?, error? }`" },
  { "key": "`RecordsResult`", "col": "Shape", "was": "`{ records: readonly RawRecord[], errors: readonly CSVError[] }`", "is": "`{ records, errors }`" },
  { "key": "`CSVParseResult`", "col": "Shape", "was": "`{ table: CSVTable, errors: readonly CSVError[] }`", "is": "`{ table, errors }`" },
  { "key": "`ExportOptions`", "col": "Shape", "was": "`{ key?: string, columns?: Columns }`", "is": "`{ key?, columns? }`" },
  { "key": "`TableExport`", "col": "Shape", "was": "`{ key: string, columns: Columns, schema: JSONSchema }`", "is": "`{ key, columns, schema }`" },
  { "key": "`CSVInterface`", "col": "Shape", "was": "`{ table, rows, errors, find, filter, map, reduce, stream, toJSON, export }`", "is": "`{ table, rows, errors } plus find, filter, map, reduce, stream, toJSON, export`" }
 ]
}
```

`missing` and `added` are empty and `col` reads `Shape` on every entry, so the
`Summary` rewrites the propagation carried are the only other movement and the
comparator excludes that column by design.

### 4. The tree lists the owned files only

```text
$ git status --short
 M README.md
 M guides/csv.md
 M src/core/CSV.ts
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/inferers.ts
 M src/core/parsers.ts
 M src/core/shapers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts

$ git diff --stat
 README.md              |   4 +-
 guides/csv.md          | 131 +++++++++++++++++++++++++------------------------
 src/core/CSV.ts        |  12 ++---
 src/core/constants.ts  |  18 +++----
 src/core/errors.ts     |   2 +-
 src/core/factories.ts  |   8 +--
 src/core/helpers.ts    |  54 ++++++++++----------
 src/core/inferers.ts   |  10 ++--
 src/core/parsers.ts    |  16 +++---
 src/core/shapers.ts    |   6 +--
 src/core/types.ts      |  58 +++++++++++-----------
 src/core/validators.ts |   8 +--
 tests/guides.test.ts   |  14 +++---
 13 files changed, 172 insertions(+), 169 deletions(-)
```

`src/core/index.ts` is in the owned set and needed no change.

## Observations

These are readings I took, not work I did or a second criterion:

- **`//` line comments under `src/core/**` keep their spaced hyphen.** They sit
  outside the doc blocks the brief owns, so item 3 does not reach them:
  `src/core/types.ts:4`, `src/core/shapers.ts:16`, `src/core/validators.ts:5`,
  `src/core/helpers.ts:36`, `src/core/parsers.ts:19`. None propagates to a cell.
- **`guides/csv.md:447` keeps `// total guard - never throws`.** It is a comment
  inside the `### Guarding an adopted table` `ts` fence, which is code rather
  than a description paragraph. The fence is guide-only, with no source
  `@example` counterpart, so changing it would break no equality — I left it
  because item 3 scopes to `src/core/**` description paragraphs.
- **`@orkestrel/guide@0.0.18` is installed but `package.json:78` pins
  `"@orkestrel/guide": "^0.0.17"`.** I changed neither.

## Deviation state

No deviation. Each item's truth was settled from the code, no correction needed
a file outside the owned set, and `npm run docs` reached zero after the
propagation.

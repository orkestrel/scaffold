# Brief — P.2 `d7n-csv-converge` (csv under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/csv` from the committed baseline `50c9dcc` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.7`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/csv.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/csv/guides/csv.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-csv-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/csv.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run, then carry the body in with `npm run docs -- --to source` and record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in scaffold's inline form (`fence.title !== undefined && titled.has(fence.title)`, no local predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: where the guide's § Tests lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
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
exit 1
```

## Facts for csv (taken 2026-09-07T15:12Z by facts.sh)

- Checkout `/home/user/fleet/csv`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `50c9dcc`, status: clean
- `package.json`: version `0.0.7`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 14 | summary 5 | banned 9 | tests/setup.ts(5) src/core/helpers.ts(3) src/core/shapers.ts(2) src/core/inferers.ts(2) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec               | Source                    | Tests                                 |
    8:| ------- | ------------------ | ------------------------- | ------------------------------------- |
    9:| CSV     | [`csv.md`](csv.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide              |
    14:| ---------- | ------------------ |
    15:| `src/core` | [`csv.md`](csv.md) |
- Guide `guides/csv.md`: 497 lines. Headings:
    1:# CSV
    28:## Surface
    39:### Types
    70:### Errors
    81:### Constants
    102:### Helpers
    140:### Inferers
    153:### Parsers
    167:### Shapers
    180:### Validators
    190:### `CSV`
    200:### Factories
    209:## Methods
    213:#### `CSVInterface`
    225:## RFC 4180 and dialects
    240:## Total parsing and the error model
    264:## Security
    282:## Conservative inference
    300:## Database interop without dependency
    315:## Streaming boundary
    326:## Patterns
    330:### Parse and query
    342:### Rewrite with `map`, then render back
    357:### Reduce into an accumulator
    367:### Streaming rows
    382:### Handling errors without `strict`
    394:### `strict` mode throws the first error
    406:### Exporting a portable schema
    416:### Contract-backed row validation
    429:### Guarding an adopted table
    440:### Tokenizer leaves directly
    463:## Tests
    490:## See also
- Table headers in `guides/csv.md` (a header row is the row before a `| ---` row):
    43: | Type                    | Kind      | Shape                                                                                                                                                                                              |
    76: | Error        | Kind     | Signature                               | Behavior                                                                                                                                       |
    86: | Constant                   | Kind  | Behavior                                                                                                                                                                                       |
    110: | Helper                  | Kind     | Signature                                                                                                                                            | Behavior                                                                                                                                                               |
    147: | Inferer           | Kind     | Signature                                                              | Behavior                                                                                                                                                                |
    160: | Parser         | Kind     | Signature                                                   | Behavior                                                                                                                                                                                                              |
    174: | Shaper            | Kind     | Signature                             | Behavior                                                                                                                                                                                                                                                                         |
    185: | Guard          | Kind  | Narrows to / Tests  | Behavior                                                                                                                                                                                                                                  |
    204: | Factory               | Kind     | Signature                                                             | Behavior                                                                                                        |
    215: | Method   | Returns               | Behavior                                                                                                        |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/csv.md`):
    3: > A types-first RFC 4180 CSV parser and renderer — a hand-written,
    4: > single-pass tokenizer that turns CSV text into a typed `CSVTable`, and a
    5: > stateful `CSV` workspace that wraps that table with query, rewrite,
    6: > streaming, and export operations. Source: [`src/core`](../src/core).
    7: > Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    9: CSV here is: parse once into a typed `CSVTable` (columns + rows), then treat
    10: every read as a projection of it. `parseCSV` runs a tokenizer phase
- README (`README.md`) first lines:
    # @orkestrel/csv
    
    A typed CSV toolkit — RFC 4180 parsing and rendering with typed rows, dialect
    control, and structural database interop. Part of the `@orkestrel` line.
    
    ## Install
    
    ```sh
    npm install @orkestrel/csv
    ```
    
    ## Requirements
- `## Patterns` fences, each with its nearest preceding heading:
    32: fence under "## Surface"
    332: fence under "### Parse and query"
    344: fence under "### Rewrite with `map`, then render back"
    359: fence under "### Reduce into an accumulator"
    369: fence under "### Streaming rows"
    384: fence under "### Handling errors without `strict`"
    396: fence under "### `strict` mode throws the first error"
    408: fence under "### Exporting a portable schema"
    418: fence under "### Contract-backed row validation"
    431: fence under "### Guarding an adopted table"
    442: fence under "### Tokenizer leaves directly"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/CSV.ts:38:export class CSV implements CSVInterface {
    src/core/factories.ts:30:export function createCSV(input: string | CSVTable, options?: ParseOptions): CSVInterface {
    src/core/factories.ts:57:export function createTableContract(columns: Columns): ContractInterface<Row> {
    src/core/errors.ts:21:export class CSVError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/shapers.ts:3
    src/core/CSV.ts:8
    src/core/inferers.ts:2
    src/core/validators.ts:2
    src/core/factories.ts:2
    src/core/helpers.ts:24
    src/core/parsers.ts:4
    src/core/errors.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    19:} from '@orkestrel/guide'
    54:const ROOT_FILES = Object.freeze(['README.md'])
    64:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    109:		for (const group of guide.methods()) {
    110:			const members = source.methods(group.interface).map((method) => method.name)
    118:					expect(findMissing(members, documented)).toEqual([])
    121:					expect(findMissing(documented, members)).toEqual([])
    127:							: findMissing(
    128:									source.methods(entity).map((method) => method.name),
    146:				findUnexampled(
    149:					source.examples().map((example) => example.name),
    154:		for (const group of guide.methods()) {
    165:							? source.examples(group.interface).map((example) => example.name)
    169:									.concat(source.examples(entity).map((example) => example.name))
    170:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    182:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 463:## Tests — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/csv.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/csv.md`, `README.md`, the doc blocks under `src/**` (description paragraphs, `@remarks`, and `@example` titles and bodies only — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the three cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the three cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-csv-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.

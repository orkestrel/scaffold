# Brief — P.1 `d7n-csv-prep` (csv's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/csv` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `845ea9f`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

csv's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== csv 2026-09-07T15:03:13Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
77:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 1s
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### csv (845ea9f, version 0.0.6, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 27 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setup.ts(5)
   src/core/helpers.ts(3)
   src/core/shapers.ts(2)
   src/core/inferers.ts(2)
   tests/src/core/shapers.test.ts(1)
   src/core/CSV.ts(1)
-- docs
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
   guides/csv.md function scanRecord: guide absent source "Scans one full record at `position` - fields separated by `options.delimiter`, ending at a break (consumed via `scanBreak`) or end-of-input."
   guides/csv.md function readRecords: guide absent source "Splits `input` into raw, un-mapped `RawRecord`s - the tokenizer phase beneath `parseCSV`."
   guides/csv.md function deriveHeader: guide absent source "Resolves a table's header from its raw records - disambiguates the first record's names when `options.header` is `true`, or generates positional names sized to the widest record otherwise."
   guides/csv.md function buildRow: guide absent source "Builds one `RawRecord` into one null-prototype `Row`, padding or truncating to `columns.length` per `options.ragged`."
   guides/csv.md function inferColumnType: guide absent source "Infers a whole column's `ColumnType` conservatively from its raw string values - never `'json'` or `'blob'` (those require an explicit `Columns` declaration). Empty-string cells are ignored entirely (they neither confirm nor demote a type); a column with no non-empty cells is `'text'`."
   guides/csv.md function coerceInferred: guide absent source "Coerces one string cell to `type`'s typed representation - the exhaustive per-cell dispatch `inferRows` applies once a column's type is known."
   guides/csv.md function inferRows: guide absent source "Applies whole-column type inference to a built row set - per column, infers its `ColumnType` from its string cells, then coerces every cell of that type via `coerceInferred`."
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
-- check
   tests/guides.test.ts(117,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(120,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(124,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(139,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(154,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 5 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  5 failed | 26 passed (31)
   exit 1
-- test:policy
        × enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace 61ms
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(5) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(5) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
   exit 1
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 14 | summary 5 | banned 9 | tests/setup.ts(5) src/core/helpers.ts(3) src/core/shapers.ts(2) src/core/inferers.ts(2) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
+116,	+     "message": "prose carries no banned term: via (through, by using)",	+     "path": "guides/csv.md"
+137,	+     "message": "prose carries no banned term: via (through, by using)",	+     "path": "guides/csv.md"
+150,	+     "message": "prose carries no banned term: via (through, by using)",	+     "path": "guides/csv.md"
+219,	+     "message": "prose carries no banned term: via (through, by using)",	+     "path": "guides/csv.md"
+220,	+     "message": "prose carries no banned term: via (through, by using)",	+     "path": "guides/csv.md"
+259,	+     "message": "prose carries no banned term: via (through, by using)",	+     "path": "guides/csv.md"
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for csv (taken 2026-09-07T15:03Z by facts.sh)

- Checkout `/home/user/fleet/csv`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `845ea9f`, status: clean
- `package.json`: version `0.0.6`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    110:			const members = source.methods(group.interface)
    117:					expect(findMissing(members, group.methods)).toEqual([])
    120:					expect(findMissing(group.methods, members)).toEqual([])
    124:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    139:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    142:		for (const group of guide.methods()) {
    152:							? source.examples(group.interface)
    153:							: source.examples(group.interface).concat(source.examples(entity))
    154:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    166:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 463:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` once, map the `examples` binding's records to names (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.6"` → `"version": "0.0.7"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-csv-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.

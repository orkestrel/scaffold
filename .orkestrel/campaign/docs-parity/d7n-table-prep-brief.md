# Brief — P.1 `d7n-table-prep` (table's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/table` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `1a13f14`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

table's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== table 2026-09-07T15:33:23Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
70:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 797ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### table (1a13f14, version 0.0.4, guide range ^0.0.17, head start 0.0.18)
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
   tests/setup.ts(12)
-- docs
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
   exit 1
-- check
   tests/guides.test.ts(161,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(164,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(168,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(183,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(198,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 28 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  28 failed | 54 passed (82)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 12 | summary 12 | banned 0 | tests/setup.ts(12) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for table (taken 2026-09-07T15:38Z by facts.sh)

- Checkout `/home/user/fleet/table`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `1a13f14`, status: clean
- `package.json`: version `0.0.4`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 12 | summary 12 | banned 0 | tests/setup.ts(12) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                   | Source                    | Tests                                 |
    8:| ------- | ---------------------- | ------------------------- | ------------------------------------- |
    9:| Table   | [`table.md`](table.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                  |
    14:| ---------- | ---------------------- |
    15:| `src/core` | [`table.md`](table.md) |
- Guide `guides/table.md`: 1537 lines. Headings:
    1:# Table
    21:## Surface
    63:### Rows, cells, and columns
    82:### The lens
    99:### The table
    137:### Constants
    152:### Guards
    188:### Helpers
    215:### Cloners
    236:### Parsers
    250:## Cells
    268:### text
    281:### number
    292:### flag
    304:### choice
    344:### Temporal data is text
    387:### meta
    398:### Reading a column
    429:### Overriding a column
    474:## Identity
    570:## The lens
    577:### Sorting
    662:### Filtering
    752:### Pagination
    794:### Selection and expansion
    870:## Lifecycle and state
    918:## Events
    983:## Wire safety
    1107:### Owning what arrives
    1130:### Budgets
    1170:### Auditing a schema
    1215:## Methods
    1235:#### `TableInterface`
    1242:#### `RowManagerInterface`
    1253:#### `SortManagerInterface`
    1262:#### `FilterManagerInterface`
    1271:#### `SelectionManagerInterface`
    1279:#### `ExpansionManagerInterface`
    1287:#### `PaginationManagerInterface`
    1294:### Errors
    1354:## Contract
    1457:## Concept inventory
    1492:## Tests
    1534:## See also
- Table headers in `guides/table.md` (a header row is the row before a `| ---` row):
    67: | API            | Kind      | Summary                                                                                                                                        |
    86: | API              | Kind      | Summary                                                                                                                              |
    103: | API                          | Kind      | Summary                                                                                                                               |
    142: | API            | Kind  | Summary                                                                     |
    157: | API                       | Kind     | Summary                                                                                                              |
    197: | API              | Kind     | Summary                                                                                                                    |
    221: | API           | Kind     | Summary                                                                                                                        |
    241: | API          | Kind     | Summary                                                                                                       |
    256: | Cell     | Holds     | Its own options | Compares by                  | Filters with                    |
    923: | Event      | Payload                     | Fires                                                                                                                                                                      |
    1136: | Constant       | Value   | Unit                    | Bounds                                    |
    1237: | Method    | Returns | Behavior                                                                                                                 |
    1244: | Method   | Returns                   | Behavior                                                                                                           |
    1255: | Method   | Returns                     | Behavior                                                                                                                                                      |
    1264: | Method    | Returns                      | Behavior                                                                                                                                                                                           |
    1273: | Method   | Returns             | Behavior                                                                                         |
    1281: | Method   | Returns             | Behavior                                                                                        |
    1289: | Method   | Returns | Behavior                                                                                                           |
    1299: | Code        | Raised when                                                                                                                                                                                                                                                                                                                         |
    1464: | Concept                      | Layer         | Why it sits there                                                                                                                                                                                                                                                                                                                                                                                                             |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/table.md`):
    3: > The environment-agnostic tabular document. A `TableSchema` states what the columns are, a `Table`
    4: > holds the rows given against it, and one lens — sort, filter, and page — decides which of them the
    5: > view shows. Nothing here renders, measures a pixel, reads a keyboard, or names a host type.
    6: >
    7: > **A grid, a report, a terminal listing, and a CSV export are the same abstraction.** They all hold
    8: > a set of records, order them, narrow them, and show a stretch of them. What differs is who draws
    9: > the result, and drawing is the one part this package leaves out. The table owns values; the host
    10: > owns everything a person looks at.
    11: >
    12: > The row store is the source of truth, and it is the whole of it. Sort terms, filters, the picked
    13: > keys, the opened keys, and the page are held; `view` and every tally are worked out on read, so no
    14: > second copy of an answer can go stale. A write validates all of itself before any of it lands, and
    15: > announces itself once it has.
    16: >
    17: > The core refuses rather than throws. Every guard returns `false` off-shape rather than throwing, every
    18: > parser returns `undefined` on refusal, and every row the table hands back is a frozen owned copy.
    19: > Table-owned refusals raise `TableError`, and each one names a caller mistake.
- Opening prose after the blockquote (first two lines):
    21: ## Surface
    23: Open a table, narrow it, order it, and read the rows to draw:
- README (`README.md`) first lines:
    # @orkestrel/table
    
    The environment-agnostic tabular document for the `@orkestrel` line — a schema of typed column cells,
    the rows held against it, and one lens of sort, filter, and page that decides which of them the view
    shows. A grid, a report, a terminal listing, and a CSV export hold the same thing in different
    places, so this package ships what they share and draws none of it. Every row carries its own
    identity in a column the schema names, so a pick survives a re-sort; `view` and every tally are
    worked out on read, so no second copy of an answer can go stale; and budgets bound what one
    schema may retain, so a document that arrives from a wire costs a known maximum before anything
    decides to trust it.
    Built on `@orkestrel/contract` and `@orkestrel/emitter`.
    
- `## Patterns` fences, each with its nearest preceding heading:
    25: fence under "## Surface"
    270: fence under "### text"
    283: fence under "### number"
    294: fence under "### flag"
    306: fence under "### choice"
    326: fence under "### choice"
    352: fence under "### Temporal data is text"
    404: fence under "### Reading a column"
    436: fence under "### Overriding a column"
    490: fence under "## Identity"
    535: fence under "## Identity"
    559: fence under "## Identity"
    584: fence under "### Sorting"
    625: fence under "### Sorting"
    643: fence under "### Sorting"
    672: fence under "### Filtering"
    713: fence under "### Filtering"
    727: fence under "### Filtering"
    768: fence under "### Pagination"
    805: fence under "### Selection and expansion"
    826: fence under "### Selection and expansion"
    857: fence under "### Selection and expansion"
    888: fence under "## Lifecycle and state"
    950: fence under "## Events"
    988: fence under "## Wire safety"
    1036: fence under "## Wire safety"
    1067: fence under "## Wire safety"
    1096: fence under "## Wire safety"
    1118: fence under "### Owning what arrives"
    1197: fence under "### Auditing a schema"
    1307: fence under "### Errors"
    1343: fence under "### Errors"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/tables/ExpansionManager.ts:6:export class ExpansionManager implements ExpansionManagerInterface {
    src/core/tables/SortManager.ts:7:export class SortManager implements SortManagerInterface {
    src/core/tables/SelectionManager.ts:6:export class SelectionManager implements SelectionManagerInterface {
    src/core/tables/PaginationManager.ts:5:export class PaginationManager implements PaginationManagerInterface {
    src/core/tables/FilterManager.ts:7:export class FilterManager implements FilterManagerInterface {
    src/core/tables/RowManager.ts:15:export class RowManager implements RowManagerInterface {
    src/core/tables/KeyManager.ts:6:export class KeyManager {
    src/core/factories.ts:18:export function createTable(schema: TableSchema, options?: TableOptions): TableInterface {
    src/core/Table.ts:34:export class Table implements TableInterface {
    src/core/errors.ts:5:export class TableError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/factories.ts:1
    src/core/types.ts:17
- Drop-in sites (`tests/guides.test.ts`):
    15:} from '@orkestrel/guide'
    81:const ROOT_FILES = Object.freeze(['AGENTS.md', 'README.md'])
    87:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    102:			expect(findMissing(names, surface)).toEqual([])
    153:		for (const group of guide.methods()) {
    154:			const members = source.methods(group.interface)
    161:					expect(findMissing(members, group.methods)).toEqual([])
    164:					expect(findMissing(group.methods, members)).toEqual([])
    168:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    183:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    186:		for (const group of guide.methods()) {
    196:							? source.examples(group.interface)
    197:							: source.examples(group.interface).concat(source.examples(entity))
    198:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    210:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 1492:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` once, map the `examples` binding's records to names (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.4"` → `"version": "0.0.5"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-table-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.

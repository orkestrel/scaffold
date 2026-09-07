# Brief — P.2 `d7n-table-converge` (table under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/table` from the committed baseline `95aa463` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.5`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/table.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/table/guides/table.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-table-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/table.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/table.md` and `README.md`; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/table.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
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
exit 1
```

## Facts for table (taken 2026-09-07T15:50Z by facts.sh)

- Checkout `/home/user/fleet/table`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `95aa463`, status: clean
- `package.json`: version `0.0.5`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    154:			const members = source.methods(group.interface).map((method) => method.name)
    162:					expect(findMissing(members, documented)).toEqual([])
    165:					expect(findMissing(documented, members)).toEqual([])
    171:							: findMissing(
    172:									source.methods(entity).map((method) => method.name),
    190:				findUnexampled(
    193:					source.examples().map((example) => example.name),
    198:		for (const group of guide.methods()) {
    209:							? source.examples(group.interface).map((example) => example.name)
    213:									.concat(source.examples(entity).map((example) => example.name))
    214:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    226:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 1492:## Tests — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/table.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/table.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-table-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.

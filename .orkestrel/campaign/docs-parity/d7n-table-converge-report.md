# Report — `d7n-table-converge`

Wall clock: 2026-09-07T15:50:51Z (first command) to 2026-09-07T16:07:19Z (last command).

## Touched files

| File | Change |
| --- | --- |
| `guides/table.md` | The tagline as one noun phrase, the displaced sentences as opening prose, the `### Open a table` heading over the Surface fence, the `Behavior` → `Summary` header renames, every `Summary` cell written by the seed, the voice-sweep sentences, the `## Tests` bullet naming the equality gate |
| `README.md` | The pitch as the guide's blockquote, the onboarding paragraph rewritten around it |
| `src/core/types.ts` | Description paragraphs of every declaration and interface member the cells compare, with the repeated `@remarks` sentences pruned |
| `src/core/helpers.ts` | Description paragraphs of every exported helper |
| `src/core/validators.ts` | Description paragraphs of every guard |
| `src/core/constants.ts` | Description paragraphs of every budget and the cell registry |
| `src/core/errors.ts` | `TableError` and `isTableError` description paragraphs |
| `src/core/parsers.ts` | `parseTable` and `parseRows` description paragraphs |
| `src/core/cloners.ts` | `cloneSchema` description paragraph |
| `src/core/Table.ts` | `Table` class description paragraph |
| `src/core/factories.ts` | `createTable` description paragraph, and the `@example Open a table` title and body |
| `tests/guides.test.ts` | `findDrift` import, the `GUIDE_SPEC` constant, the `own` manifest row, the equality case, the title-population pin, the README case |

```text
 README.md              |  18 +--
 guides/table.md        | 336 +++++++++++++++++++++++++------------------------
 src/core/Table.ts      |   5 +-
 src/core/cloners.ts    |   3 +-
 src/core/constants.ts  |  14 ++-
 src/core/errors.ts     |   8 +-
 src/core/factories.ts  |  34 ++++-
 src/core/helpers.ts    |  42 ++++---
 src/core/parsers.ts    |   5 +-
 src/core/types.ts      | 205 +++++++++++++++++-------------
 src/core/validators.ts |  18 ++-
 tests/guides.test.ts   |  73 ++++++++++-
 12 files changed, 460 insertions(+), 301 deletions(-)
```

Every `src/**` diff line is a comment line: `git diff -U0 -- src | grep -E '^[+-]' | grep -v '^\(+++\|---\)' | grep -vE '^[+-]\s*(\*|/\*\*|\*/)'` printed nothing.

## Criterion 1 — red-first on the unconverged tree

`npm run test:guides` after adding the three cases and before any convergence: `Test Files 1 failed (1)`, `Tests 3 failed | 82 passed (85)`.

The equality case, `Table > keeps every compared summary and example equal to its source`, first lines verbatim:

```text
AssertionError: expected [ …(93) ] to deeply equal []
+   "guides/table.md type TableKey: guide \"A row's identity — a `string`, carried in the cell the schema's `key` names.\" source \"Represents a row's identity.\"",
+   "guides/table.md type TableCell: guide \"Every value a cell can hold — a `string`, a `number`, or a `boolean`.\" source \"Represents every value a cell can hold.\"",
+   "guides/table.md type TableRow: guide \"One row keyed by column. A column nobody has filled has no key here.\" source \"Represents one row, keyed by column.\"",
```

The pin, `pairs at least one example title across the guide and the source`, verbatim:

```text
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/table.md pairs: guide [\"Surface\",\"text\",\"number\",\"flag\",\"choice\",\"choice\",\"Temporal data is text\",\"Reading a column\",\"Overriding a column\",\"Identity\",\"Identity\",\"Identity\",\"Sorting\",\"Sorting\",\"Sorting\",\"Filtering\",\"Filtering\",\"Filtering\",\"Pagination\",\"Selection and expansion\",\"Selection and expansion\",\"Selection and expansion\",\"Lifecycle and state\",\"Events\",\"Wire safety\",\"Wire safety\",\"Wire safety\",\"Wire safety\",\"Owning what arrives\",\"Auditing a schema\",\"Errors\",\"Errors\"] source []",
```

The README case, `opens the README with the guide tagline`, verbatim:

```text
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:143:20
    143|  expect(pitch).not.toBeUndefined()
```

`README.md` was already in `ROOT_FILES`; its comment now reads `Root-level files these checks read. \`readInventory\` walks directories only.` The pin reads its source through the manifest row `own` rather than a second hard-coded module path.

## Criterion 2 — headers and class rows

Every table header, read with its section by a script splitting on a pipe not preceded by a backslash:

```text
   70  ##Surface   sub='Rows, cells, and columns'  header=['API', 'Kind', 'Summary']
   89  ##Surface   sub='The lens'                  header=['API', 'Kind', 'Summary']
  106  ##Surface   sub='The table'                 header=['API', 'Kind', 'Summary']
  145  ##Surface   sub='Constants'                 header=['API', 'Kind', 'Summary']
  160  ##Surface   sub='Guards'                    header=['API', 'Kind', 'Summary']
  200  ##Surface   sub='Helpers'                   header=['API', 'Kind', 'Summary']
  224  ##Surface   sub='Cloners'                   header=['API', 'Kind', 'Summary']
  244  ##Surface   sub='Parsers'                   header=['API', 'Kind', 'Summary']
 1240  ##Methods   sub='`TableInterface`'          header=['Method', 'Returns', 'Summary']
 1247  ##Methods   sub='`RowManagerInterface`'     header=['Method', 'Returns', 'Summary']
 1258  ##Methods   sub='`SortManagerInterface`'    header=['Method', 'Returns', 'Summary']
 1267  ##Methods   sub='`FilterManagerInterface`'  header=['Method', 'Returns', 'Summary']
 1276  ##Methods   sub='`SelectionManagerInterface`' header=['Method', 'Returns', 'Summary']
 1284  ##Methods   sub='`ExpansionManagerInterface`' header=['Method', 'Returns', 'Summary']
 1292  ##Methods   sub='`PaginationManagerInterface`' header=['Method', 'Returns', 'Summary']
 1302  ##Methods   sub='Errors'                    header=['Code', 'Raised when']
```

Recorded ancillary decisions:

- **The `### Errors` table keeps `Code | Raised when`.** It sits inside `## Methods` and heads none of `Behavior`, `Purpose`, `Describes`, or `Builds`, and carries no `Shape`, so neither the rename rule nor the gain rule reaches it. Its first column carries error codes rather than declarations, and `collectGroups` claims only a table immediately following an H4 that carries a code span, so no reader reaches it either.
- **No `Shape` idiom sentence was written.** No table in this guide carries a `Shape` column, so the convention sentence has no site.
- **No `### Classes` table was added and no heading was renamed.** The guide carries no `### Entities` heading. `Table` and `TableError` each carry a row in the `### The table` table, which is mixed (`type`, `interface`, `function`, `class`) and so keeps its heading. No H3 in `## Surface` carries a code span, so `extractSurface` documents no class under its own H3 and there is no H3-documented class needing a row.

The baseline comparison after the header renames, over `git show HEAD:guides/table.md`, splitting on a pipe not preceded by a backslash:

```text
baseline rows: 181 after rows: 181
non-final cell differences: 0
HEADER base:1237 after:1240: 'Behavior' -> 'Summary'   (and the six sibling Methods headers)
```

## Criterion 3 — the doc blocks rewritten, then `--to guide`

Every block below was rewritten by hand because its guide cell carried information the block lacked; the guide cell's clause moved into the description paragraph verb-first, and the `@remarks` sentence the description then repeated was pruned.

**`src/core/types.ts` declarations:** `TableKey`, `TableCell`, `TableRow`, `ColumnCell`, `ColumnChoice`, `ColumnBase`, `TextColumn`, `ChoiceColumn`, `TableColumn`, `TableSchema`, `TableTerm`, `TableDirection`, `TableOrder`, `FilterOperator`, `ContainsFilter`, `BetweenFilter`, `EqualsFilter`, `TableFilter`, `CellComparator`, `CellMatcher`, `TableErrorCode`, `TableEventMap`, `TableOptions`.

**`src/core/types.ts` interface members** (each the first overload, which is the side `findDrift` compares): `TableInterface.clear`, `TableInterface.destroy`, `RowManagerInterface.row` / `rows` / `add` / `update` / `move` / `remove`, `SortManagerInterface.order` / `orders` / `set` / `remove`, `FilterManagerInterface.filter` / `filters` / `set` / `remove`, `SelectionManagerInterface.select` / `clear` / `toggle`, `ExpansionManagerInterface.expand` / `clear` / `toggle`, `PaginationManagerInterface.move` / `resize`.

**Other files:** `helpers.ts` — `extractColumn`, `extractKey`, `computeKeys`, `mergeTerms`, `removeTerms`, `matchesTerms`, `matchesCell`, `compareCells`, `admitsFilter`, `matchesFilter`, `filterRows`, `sortRows`, `auditTable`, `serializeTable`, `serializeRows`. `validators.ts` — `isTableCell`, `isTableRow`, `isColumnChoice`, `isTableColumn`, `isStructuralTableSchema`, `isTableSchema`. `constants.ts` — `COLUMN_LIMIT`, `CHOICE_LIMIT`, `NAME_LIMIT`, `STRING_LIMIT`, `TEXT_LIMIT`, `NODE_LIMIT`. `errors.ts` — `TableError`, `isTableError`. `parsers.ts` — `parseTable`, `parseRows`. `cloners.ts` — `cloneSchema`. `Table.ts` — `Table`. `factories.ts` — `createTable`.

Blocks left as they stood, because the guide cell carried nothing the block lacked: `NumberColumn`, `FlagColumn`, `RowManagerInterface`, `SortManagerInterface`, `FilterManagerInterface`, `SelectionManagerInterface`, `ExpansionManagerInterface`, `PaginationManagerInterface`, `COLUMN_CELLS`, `isColumnCell`, `cloneRow`.

Recorded ancillary decisions inside this criterion:

- **`TableInterface` kept its source description.** Its guide cell read `The table contract — the readonly state in the \`## Surface\` rows plus \`clear\` and \`destroy\`.`, which points at the guide's own structure rather than describing the declaration. The prose under the `### The table` table already carries that pointer, so the cell took `Represents a table: what it declares, the rows it holds, and the lens it reads them through.` and no block moved.
- **An overloaded member's first overload carries the member summary.** `findDrift` compares the first overload's description, and the guide documents one row per member, so `add`, `update`, `remove`, `set`, `select`, `clear`, `expand`, and `toggle` each state what the member does in that block while every overload keeps its own precise `@param`, `@returns`, and `@throws`.
- **Each budget's value stays in its description.** The `### Constants` table carries no `Value` column and the brief authorizes adding none, so the number the guide cell already claimed (`256`, `1024`, `128`, `65536`, `1048576`, `16384`) moved into the block rather than being dropped. The `### Budgets` table under `## Wire safety` is unchanged.
- **No literal stayed in a `Shape` cell**, because the guide declares no `Shape` column. The union literals `'ascending' | 'descending'` and `'contains' | 'between' | 'equals'` sit inside the `TableDirection` and `FilterOperator` description paragraphs and reach their guide cells as `\|`-escaped code spans through `replaceCell`.

The write:

```text
$ npm run docs -- --to guide
wrote guides/table.md
guides/table.md Open a table: guide "ts\nimport { createTable } ..." source "ts\nconst table = createTable(...)"; the guide fence owns an example
rows read: 1, disagreements found: 94, written: 93, reported: 1
$ npx oxfmt --config .oxfmtrc.json --write guides/table.md      exit 0
$ npm run docs                                                  exit 1: rows read: 1, disagreements found: 1
```

The one standing line is the example pair, which `--to guide` never writes by design.

## Criterion 4 — the titled pair

**The pair:** the `@example` block of `createTable` in `src/core/factories.ts`, titled `Open a table`, paired with the guide fence under the `### Open a table` heading.

`createTable` is the first `create*` the facts block lists, and the first fence demonstrating it is the guide's opening fence. That fence sat directly under the structural heading `## Surface`, so Ruling 9 applies: the guide gains `### Open a table` one level deeper, and the block takes that heading's text as its title. The `## Surface` section paragraph naming the barrel and the internal manager classes now sits before the new heading, so the sentence introducing the fence stays directly above it and no fence changed section.

Fence bodies read before choosing: the `### Open a table` fence carries no three-backtick run and no `*/`, so it qualified and no later fence was needed. Heading uniqueness, heading-scoped: `grep -c '^#\+ Open a table' guides/table.md` printed `1`.

The block was titled first, by hand, with its body untouched. `--to source` then ran last, after the summaries agreed:

```text
$ npm run docs -- --to source
wrote src/core/factories.ts
rows read: 1, disagreements found: 1, written: 1, reported: 0
```

`written: 1` is the titled example alone. Every other `@example` block stays untitled.

## Criterion 5 — the blockquote, the opening prose, and the pitch

The tagline, identical in `guides/table.md` and `README.md` with the same line breaks:

```text
> The environment-agnostic tabular document: a `TableSchema` declaring the columns, a `Table`
> holding the rows given against it, and one lens of sort, filter, and page deciding which of them
> the view shows.
```

It is one noun phrase in plain text and code spans, with no link and no bold.

**The guide's opening prose** now carries every displaced sentence, in three paragraphs between the blockquote and `## Surface`, none of them restating a tagline clause: `Nothing here renders, measures a pixel, reads a keyboard, or names a host type.` opening the first paragraph, followed unchanged by the grid/report/listing/export paragraph, the row-store paragraph, and the refusal paragraph.

**The README's changed sentences.** Removed, because the tagline now carries them: `The environment-agnostic tabular document for the @orkestrel line — a schema of typed column cells, the rows held against it, and one lens of sort, filter, and page that decides which of them the view shows.` and `A grid, a report, a terminal listing, and a CSV export hold the same thing in different places, so this package ships what they share and draws none of it.` and `\`view\` and every tally are worked out on read, so no second copy of an answer can go stale;`. Added as the onboarding the README alone carries: `Open a table with the \`createTable\` function, seed or add its rows through \`table.rows\`, and read \`table.view\` for the rows to draw.` Kept: the identity sentence, the budgets sentence, and `Built on \`@orkestrel/contract\` and \`@orkestrel/emitter\`, and part of the \`@orkestrel\` line.`

`npm run test:guides` was run after the README edit (objective lane M9) and reports green, following.

## Criterion 6 — the seed at zero

```text
$ npm run docs                        exit 0: rows read: 1, disagreements found: 0
$ npm run docs -- --to guide          rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source         rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — gates

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/table.md README.md src tests/guides.test.ts
All matched files use the correct format.                                        exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings guides/table.md README.md src tests/guides.test.ts
(no output)                                                                      exit 0
$ npm run check                                                                  exit 0
$ npm run test:guides       Test Files  1 passed (1);  Tests  85 passed (85)     exit 0
$ npm run test:policy       Test Files  1 passed (1);  Tests  90 passed | 1 skipped (91)   exit 0
```

Observation, not a criterion — `npm run test:src:core`: `Test Files 16 passed (16)`, `Tests 104 passed (104)`, exit 0.

The three cases named in criterion 1 are among the `85 passed`; the guides suite moved from `3 failed | 82 passed` to `85 passed` with no other case changing state.

## Criterion 8 — the tree

```text
$ git status --short
 M README.md
 M guides/table.md
 M src/core/Table.ts
 M src/core/cloners.ts
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/parsers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
```

Owned files only. `package.json` and `package-lock.json` were not touched.

## Voice sweeps over the prose I own

Paths swept: `guides/table.md`, `README.md`.

- **Counts.** Pattern `(?i)\b(both|the two)\b`. Corrected: `Both members spelled \`count\`` → `The members spelled \`count\``; `\`NaN\` and both infinities` → `\`NaN\` and either infinity`; `\`between\` has two members it could not order usefully` → `\`between\` carries bounds it could not order usefully`; `and both are exported` → `and each is exported`; `one comparator serves both directions` → `one comparator serves either direction`; `so the two sides agree without either depending on the other` → `so each side agrees without depending on the other`; `Both hold \`TableKey\` sets and nothing else, and both offer the same verbs` → `Selection and expansion hold \`TableKey\` sets and nothing else, and each offers the same verbs`; `Both managers are the same algorithm over two sets` → `The selection and the expansion manager are the same algorithm over their own key set`; `Both reach the same typed emitter` → `Each reaches the same typed emitter`; `\`STRING_LIMIT\` is the one that stands at both` → `\`STRING_LIMIT\` is the one that stands at each door`; `the worst case is those two numbers` → `the worst case is those ceilings`. Every remaining hit names its members in the same sentence or in the bolded lead of the same list item, or sits inside a code fence, and each is permitted on that reading.
- **All-caps emphasis.** Pattern `\b[A-Z][A-Z]+\b`. Every hit is an acronym (`API`, `ARIA`, `CSV`, `DOM`, `ESM`, `CJS`, `ISO`, `JSON`, `MIT`, `UTC`, `UTF`), an error code (`SCHEMA`, `COLUMN`, `KEY`, `CELL`, `DESTROYED`), a filename (`AGENTS`, `README`, `LICENSE`), or the fence datum `'ADA'`. No emphasis hit; nothing changed.
- **Substitution table.** Pattern `(?i)\b(simply|easy|easier|just|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|dummy|blacklist|whitelist|sanity check|should)\b` over both paths returned no hit. `npm run test:policy`, whose prose sweep reads every authored Markdown file, is green.
- **Product nouns.** No rewritten sentence borrows a sibling export's name as its product noun. Where a rewritten description names another export it names it as what it is: `{@link CellMatcher}` and `{@link CellComparator}` as the type of a supplied replacement, `{@link matchesFilter}` as the other reader of the `admitsFilter` gate, `{@link TableInterface}` as the contract `Table` implements, `{@link TableError}` as the error a code belongs to, and `{@link TableCell}` / `{@link ColumnChoice}` / `{@link TableColumn}` / `{@link TableSchema}` as the shapes a guard decides.

## § Tests

The guide already carried a `## Tests` section. Its `tests/guides.test.ts` bullet gained the equality gate named descriptively, with no SQ/MQ/EQ/RQ identifier: `the equality gate: every \`Summary\` cell against its declaration's description paragraph, the titled \`Open a table\` fence against the \`@example\` block of that title (pinned so the titled pair cannot be retired silently), and the README pitch against this guide's tagline.` Every other bullet is unchanged.

## Reader and seed defects met

None. Every reader and every seed direction behaved as the brief describes.

Two readings worth recording, neither a defect:

- `--to guide` reports the example pair as `the guide fence owns an example` and leaves it standing. That is `writeGuide`'s design, and it is why running `--to guide` first on an unconverged tree is safe here.
- Renaming the Methods headers turned the twenty-five `guide absent` method rows into text disagreements before any block moved, so the header change and the description rewrites converge in one `--to guide` pass. The P16 comparator closed every one; no residual disagreement needed a second reading.

## Deviation state

No deviation. No stop condition fired: every cell the seed had to locate after the header change was located, the titled body fit its block, no test outside `tests/guides.test.ts` changed state, no vendored file needed an edit, every reader returned the shape the brief describes, and no residual disagreement stood after the doc-block rewrites. Nothing was planted for the lint control reading, which the Orchestrator takes after this unit exits.

Every citation in this report was re-read against the tree the unit leaves.

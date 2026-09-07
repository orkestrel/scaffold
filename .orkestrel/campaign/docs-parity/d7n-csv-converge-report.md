# Report — `d7n-csv-converge`

Wall clock: 2026-09-07T15:13:16Z to 2026-09-07T15:28:40Z.

## 1 — Red-first, on the unconverged tree

`npm run test:guides` after the three cases landed and before any convergence: `Test Files 1 failed (1) | Tests 3 failed | 31 passed (34)`. Each failing case's first lines, verbatim:

```
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/csv.md pairs: guide [\"Surface\",\"Parse and query\",\"Rewrite with map, then render back\",\"Reduce into an accumulator\",\"Streaming rows\",\"Handling errors without strict\",\"strict mode throws the first error\",\"Exporting a portable schema\",\"Contract-backed row validation\",\"Guarding an adopted table\",\"Tokenizer leaves directly\"] source []",

 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:123:20
    123|  expect(pitch).not.toBeUndefined()

 FAIL  |guides| tests/guides.test.ts > CSV > keeps every compared summary and example equal to its source
AssertionError: expected [ …(88) ] to deeply equal []
+   "guides/csv.md const BOOLEAN_TRUE: guide absent source \"Names the canonical serialized form of the boolean `true`.\"",
+   "guides/csv.md const BOOLEAN_FALSE: guide absent source \"Names the canonical serialized form of the boolean `false`.\"",
```

The same commands green after convergence: `npm run test:guides` → `Test Files 1 passed (1) | Tests 34 passed (34)`.

## 2 — Headers and class rows

Every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`:

```
44:| Type | Kind | Shape | Summary |
77:| Error | Kind | Signature | Summary |
87:| Constant | Kind | Value | Summary |
111:| Helper | Kind | Signature | Summary |
148:| Inferer | Kind | Signature | Summary |
161:| Parser | Kind | Signature | Summary |
175:| Shaper | Kind | Signature | Summary |
186:| Guard | Kind | Signature | Summary |
196:| Name | Kind | Summary |
213:| Factory | Kind | Signature | Summary |
224:| Method | Returns | Summary |
```

Column moves:

- `Behavior` → `Summary` in the Errors, Helpers, Inferers, Parsers, Shapers, Factories, and Methods tables.
- Validators: `Narrows to / Tests` → `Signature`, holding the unchanged `Guard<CSVTable>` and `Guard<ColumnType>` cells; `Behavior` → `Summary`.
- Types: gained `Summary` as its last column; every literal stayed in `Shape` and the clause after the em dash was dropped from the cell.
- Constants: gained `Value` as its third column and `Summary` as its last. `Value` carries the declaration's literal, which is what the `Behavior` cell had been carrying inline — `'﻿'`, the two frozen defaults objects, `Set(['=', '+', '-', '@', '\t', '\r', '\n'])`, `'column'`, `"'"`, `'_'`, the three regular expressions, `'true'`, `'false'`, `100`. This is the guide's own `Value` precedent (`/home/user/fleet/guide/guides/guide.md:58`), and it is what keeps the `SANITIZE_PREFIXES` character enumeration and each literal in the guide after the description paragraph replaces the cell.

`### Classes` was added before the `### `CSV`` H3 section at line 200, with the `CSV` row and a two-line intro naming `CSV.ts` and stating that the class is documented in full under the heading following the table (`guides/csv.md:191-197`). No `### Entities` table exists in this guide, and no other table is all-class: the Errors table mixes `CSVError` (class) with `isCSVError` (function) and keeps its heading.

## 3 — The cells and the blocks

Rows whose literal stayed in `Shape`: every row of the Types table — `Row`, `CSVTable`, `RawField`, `Position`, `RawRecord`, `FieldScan`, `RecordScan`, `HeaderResult`, `RowResult`, `RecordsResult`, `CSVParseResult`, `EscapeStyle`, `QuoteStyle`, `RaggedPolicy`, `ColumnType`, `Columns`, `ParseOptions`, `ResolvedParseOptions`, `RenderOptions`, `ResolvedRenderOptions`, `ExportOptions`, `TableExport`, `CSVErrorCode`, `CSVInterface`.

Blocks rewritten by hand, all in `src/core/types.ts`, all in the `CSVInterface` declaration:

- `find` — gained "called with each row and its index in table order"; the guide cell carried the index and the traversal order, the block carried neither.
- `filter` — the same clause, same reason.
- `map` — gained "never mutating this one"; the guide cell carried it, the description did not.
- `reduce` — gained "through `callback`", naming the reducer the guide cell named.
- `stream` — gained "that enqueues one row per `pull`". This was the one clause no part of the interface block carried: the guide cell had it, and the description, the `@remarks`, and every tag lacked it. The class's own `stream` block in `src/core/CSV.ts` states it under `@returns`, so the claim is the code's, not new prose.
- The `CSVInterface` `@remarks` block was deleted whole. Its three sentences — `**Immutable.**`, `**Traversal order.**`, and `**\`stream\`.**` — are each repeated by a member description after the preceding edits, and Ruling 7 prunes a remark sentence the description now repeats. The `CSVInterface` description paragraph itself is untouched, so its own `Summary` cell is unaffected.

Every other row's guide clause was already in its block, in `@remarks`, `@param`, `@returns`, or `@throws`, so those rows converged by propagation with no hand edit. Named, because each one is a judgment I made rather than a mechanical write: `CSVError` (members in `@remarks`), `isCSVError` (`@param`), `assertValidSeparators` / `resolveParseOptions` / `resolveRenderOptions` (`@throws`), `uniqueName` / `sanitizeField` / `serializeCell` / `quoteStyleToPolicy` / `isRowList` / `advancePosition` / `scanBreak` / `scanComment` / `coerceInferred` (`@returns`), `wrapQuoted` (`@param`), `renderCSV` / `inferRows` / `scanUnquoted` / `scanQuoted` / `readRecords` / `deriveHeader` / `columnTypeShape` / `csvTableShape` / `isCSVTable` / `createCSV` / `parseInteger` / `parseReal` / `parseBoolean` (`@remarks`), and `inferColumnType` (`@returns` plus its own example). `createTableContract`'s description already states the preference as the contract it returns — a guard, coercing parser, JSON Schema, and seeded generator from one shape declaration.

Commands:

```
$ npm run docs -- --to guide      rows read: 1, disagreements found: 89, written: 88, reported: 1
$ npx oxfmt --write guides/csv.md exit 0
$ npm run docs                    rows read: 1, disagreements found: 1   (the titled pair alone)
```

## 4 — The titled pair

The pair is `createCSV`'s `@example` block in `src/core/factories.ts:22` and the fence under `### Parse and query` at `guides/csv.md:339`.

```
$ grep -n '^#\+ Parse and query' guides/csv.md
340:### Parse and query
$ grep -c '^#\+ Parse and query' guides/csv.md
1
```

Fence bodies read before choosing:

- `## Surface` (the fence at `guides/csv.md:30`) — imports `createCSV`, four lines, no three-backtick run, no doc-comment terminator. Eligible.
- `### Parse and query` (the fence at `guides/csv.md:341`) — imports `createCSV`, seven lines, no three-backtick run, no doc-comment terminator. Eligible.

I took `Parse and query`. Recorded as an ancillary decision under the deviation contract's "which of two eligible fences carries the title": `## Surface`'s fence is the guide's minimal usage sample rather than a named scenario, and `Surface` as an `@example` title names a guide section rather than what the example shows. The accepted pilot resolves the same ambiguity the same way — abort's `## Surface` fence at `guides/abort.md:21` also demonstrates `createAbort`, and the pilot titled the block `Create and abort`, the `## Patterns` H3.

Every other `@example` block in `src/**` stays untitled (`grep -n '@example' src/core/factories.ts` reports the titled block at line 22 and one untitled block at line 51; no other file carries a title).

Commands, in order:

```
$ (title written into src/core/factories.ts by hand)
$ npm run docs                       rows read: 1, disagreements found: 89   (the pair now located and named)
$ npm run docs -- --to source        rows read: 1, disagreements found: 1, written: 1, reported: 0
$ npx oxfmt --write src/core/factories.ts   exit 0
$ npm run docs                       rows read: 1, disagreements found: 0
```

## 5 — The tagline, the opening prose, the pitch

The H1 blockquote is now one noun phrase in plain text and code spans, with no link and no bold (`guides/csv.md:3-6`, `README.md:3-6`, identical text and identical line breaks):

```
> A types-first RFC 4180 CSV parser and renderer — a hand-written,
> single-pass tokenizer that turns CSV text into a typed `CSVTable`, and a
> stateful `CSV` workspace that wraps that table with query, rewrite,
> streaming, and export operations.
```

Guide opening prose, sentences changed:

- Removed from the blockquote and folded to the end of the opening paragraph: `Source: [\`src/core\`](../src/core). Surfaced through the \`@src/core\` barrel.`
- Deleted as a restatement of the tagline: `A \`CSV\` instance wraps that result with query (\`find\` / \`filter\` / \`reduce\`), rewrite (\`map\`), streaming, and export operations.` Those operation names remain in the `## Methods` table and the `### \`CSV\`` section.
- Deleted as restatements of the tagline's clauses: `hand-written` and `single-pass` from the tokenizer-phase sentence, and `standalone` from the renderer sentence.
- Reworded to open the paragraph without the tagline's noun phrase: `CSV here is: parse once into a typed \`CSVTable\` (columns + rows), then treat every read as a projection of it.` became `Parse once, then treat every read as a projection of the parsed table.`
- Joined into one sentence, no content changed: the null-prototype clause and the sanitize clause.

README, sentences changed:

- The old plain pitch line `A typed CSV toolkit — RFC 4180 parsing and rendering with typed rows, dialect control, and structural database interop. Part of the \`@orkestrel\` line.` was replaced by the blockquote plus this onboarding paragraph, which the README alone carries and which restates no tagline clause: `Parse a document with the \`createCSV\` function, read its rows as plain typed records, and write a table back out with \`renderCSV\`. Dialect control and structural interop with \`@orkestrel/database\` are options on those two calls. Part of the \`@orkestrel\` line.`

`npm run test:guides` after the README edit: `Tests 34 passed (34)`.

## 6 — § Tests

`guides/csv.md:474-480` gains a `tests/guides.test.ts` row naming the checks descriptively, with no SQ/MQ/EQ/RQ identifier: the `## Surface` ↔ `src/core` bijection, the `CSVInterface` ↔ `CSV` method bijection, and the equality gate — every `Summary` cell against its declaration's description paragraph, the titled `Parse and query` fence against the `@example` block of that title, and the README pitch against the guide's tagline.

## 7 — The gate cases

In `tests/guides.test.ts`, in this file's own header and helpers:

- `findDrift` imported beside the existing `@orkestrel/guide` readers.
- `const CORE_GUIDE = 'guides/csv.md'` renamed to `const GUIDE_SPEC` and used by the pin, the README case, and the flagship-fence block. Ancillary decision, recorded: the brief asks for a `GUIDE_SPEC` constant for the spec path, and this file already had a constant holding exactly that path for the flagship fences, so a second one would be two names for one concept.
- `README.md` was already in `ROOT_FILES` from the flagship-fence work, so no addition was needed; `PACKAGE_README` names it for the README case.
- `own` binds the manifest row for `GUIDE_SPEC`, giving the pin its source module.
- `pairs at least one example title across the guide and the source` — at file scope, in scaffold's inline form (`fence.title !== undefined && titled.has(fence.title)`), no local predicate, failing line `${GUIDE_SPEC} pairs: guide [...] source [...]`.
- `opens the README with the guide tagline` — two `not.toBeUndefined()` guards before `toBe`.
- `keeps every compared summary and example equal to its source` — inside the manifest loop's `describe(entry.concept)` block, collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` with `absent` for an undefined side.

Each is named for what it proves.

## 8 — Acceptance readings

```
$ npm run docs                              rows read: 1, disagreements found: 0                  exit 0
$ npm run docs -- --to guide                rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source               rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npx oxfmt --check <owned paths>           All matched files use the correct format.             exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings <owned paths>   (no output)                  exit 0
$ npm run check                                                                                   exit 0
$ npm run test:guides                       Test Files 1 passed (1) | Tests 34 passed (34)        exit 0
$ npm run test:policy                       Test Files 1 passed (1) | Tests 90 passed | 1 skipped (91)   exit 0
```

Observation, not a criterion: `npm run test:src:core` → `Test Files 7 passed (7) | Tests 239 passed (239)`, exit 0.

`git status --short`:

```
 M README.md
 M guides/csv.md
 M src/core/factories.ts
 M src/core/types.ts
 M tests/guides.test.ts
```

`git diff --stat`:

```
 README.md             |  11 +-
 guides/csv.md         | 288 ++++++++++++++++++++++++++------------------------
 src/core/factories.ts |  11 +-
 src/core/types.ts     |  29 ++---
 tests/guides.test.ts  |  77 +++++++++++++-
 5 files changed, 258 insertions(+), 158 deletions(-)
```

Owned files only. No vendored file, no `package.json`, no lockfile, no `guides/README.md`, no `tests/setup*.ts`, no `tests/src/**`. No lint control planted.

## Seed and reader defects met

**The brief's `--to source` description is narrower than the flag's behaviour, and the order it prescribes destroys the source descriptions.** The brief states that `npm run docs -- --to source` "writes a titled fence body into its block", and instructs: title the block, then carry the body in with `--to source`, then run `--to guide`. Run in that order on an unconverged tree, `--to source` writes every disagreeing `Summary` source-ward as well. The exact line it printed:

```
$ npm run docs -- --to source
rows read: 1, disagreements found: 89, written: 51, reported: 38
```

Those 51 writes replaced the description paragraph of every doc block that disagreed with its guide cell, in `src/core/errors.ts`, `factories.ts`, `helpers.ts`, `inferers.ts`, `parsers.ts`, `shapers.ts`, `types.ts`, and `validators.ts` — 107 changed lines in `helpers.ts` alone. Two consequences, read in the diff: every `{@link X}` in a written description became a plain `` `X` `` code span, and each block acquired a description repeating what its own `@remarks` already said (`src/core/parsers.ts`'s `parseInteger` gained "Stricter than `@orkestrel/contract`'s `parseInteger`, which reads `'007'` as `7`." beside the `@remarks` sentence stating the same thing at greater length).

I undid every one of those writes by rewriting each of the eight files to its committed content and re-applying my own two edits (the `types.ts` member blocks, the `factories.ts` title), then ran the two directions in the order Ruling 6 fixes — `--to guide` first, then `--to source`. `git diff --stat src/` read clean between the undo and the re-apply, so nothing of the bad write survived. The remaining `--to source` run wrote exactly the example body: `written: 1, reported: 0`.

The correction for every following P.2 brief: run `--to guide` first and `--to source` last. Once the summaries agree, `--to source` has only the titled example left to write.

**`replaceCell` disturbed no cell outside the `Summary` column.** Measured after the write, comparing every table row of the committed guide against the converged one, splitting on a pipe not preceded by a backslash: 97 rows before, 99 after (the two `### Classes` rows), no row missing, 39 rows gained a column (the Types and Constants headers and their rows), and exactly one row changed a non-final cell at unchanged width — the Validators header, which is my own `Narrows to / Tests` → `Signature` rename. The escaped pipes in the Helpers, Parsers, and Types `Signature` and `Shape` cells survived the round trip intact.

**A hazard of my own, recorded because the next unit will meet it.** My first rebuild of the Types and Constants rows split each row on a bare `|`, which cut the five union-literal `Shape` cells at their first escaped pipe: `` `'double' \| 'backslash'` `` became `` \`'double' \\ `` for `EscapeStyle`, `QuoteStyle`, `RaggedPolicy`, `ColumnType`, and `CSVErrorCode`. `oxfmt` then escaped the orphaned backtick and, in `CSVErrorCode`, an underscore. I found it with the cell comparator, not with a gate — `docs`, `oxfmt --check`, `oxlint`, `check`, and every suite were green over the mangled cells, because nothing reads a `Shape` cell. I repaired the five rows by writing the baseline literals back and re-measured. Any hand rebuild of a fleet guide's table row must split on a pipe not preceded by a backslash.

## Deviations

None against the objective. Every cell the seed had to locate was located after the header change; the tally went from 89 rows with 51 already-located cells to 89 rows with every cell located, and no cell became unlocatable. No titled body the block could not hold, no test outside `tests/guides.test.ts` went red, no vendored file needed an edit, no reader returned a shape the brief does not describe, and no residual disagreement survived a doc-block rewrite.

Ancillary matters decided and recorded in the sections that own them: the titled fence (`Parse and query` over `Surface`, § 4); the `GUIDE_SPEC` rename rather than a second constant (§ 7); the `Value` column on the Constants table (§ 2); the `Shape` idiom sentence placed in the Types section's intro paragraph above the table, following the pilot at `guides/abort.md:60` rather than below the table, and carrying the `## Methods` pointer that the `CSVInterface` row's `Shape` cell dropped (`guides/csv.md:39-42`); and the `### \`CSV\`` section's opening sentence, trimmed because the new `### Classes` table's intro states the same source pointer.


---

## Orchestrator annotation (slice 2 audit, 2026-09-07)

The audit read counts in this report's prose against the writing ban, and where it names a citation as stale against the tree the unit left (budget: `:51` and `:77` for `guides/budget.md:52` and `:80`; csv: `340:` for `guides/csv.md:339`) or a pin description in words the file does not carry, the tree is authoritative. The report stands as the unit's evidence with this note.

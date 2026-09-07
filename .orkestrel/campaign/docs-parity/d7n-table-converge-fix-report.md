# Report — `d7n-table-converge-fix`

`implementer` on Claude Opus 5, sole writer in `/home/user/fleet/table` from `d86a5a8`. Wall clock:
first instrument written 2026-09-07 20:34:58Z, last gate reading 2026-09-07 20:39:27Z.

Touched files:

- `/home/user/fleet/table/tests/guides.test.ts` — the drop-in takes the pilot's header line, the pilot's `INTERNAL` block, and the hoisted `documented` and `examples` bindings.
- `/home/user/fleet/table/guides/table.md` — a `Shape` column on every `## Surface` table Ruling 15 names, its convention sentence above each, and the member-listing prose the column replaces.
- `/home/user/fleet/table/src/core/types.ts` — doc-block descriptions only; no code token moved.

Diffstat:

```text
 guides/table.md      | 131 ++++++++++++++++++++++++++-------------------------
 src/core/types.ts    |  24 +++++-----
 tests/guides.test.ts |  33 ++++++++-----
 3 files changed, 100 insertions(+), 88 deletions(-)
```

## Item 1 — the drop-in (T1)

Header line and `INTERNAL` block:

```diff
+// The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
+// this repo's own `guides/README.md` manifest. The constants that follow are this
+// package's own, and are the only part a sibling package changes.
+
 import { describe, expect, it } from 'vitest'
@@
-/** Declarations deliberately kept out of the barrel, as `computeSymbolKey` strings. */
+/**
+ * Declarations deliberately kept out of the barrel, as `computeSymbolKey` strings.
+ *
+ * A class that one-class-per-file evicted from its single consumer cannot become a
+ * local, so it stays exported without being public. Naming it here is what makes that
+ * intentional rather than forgotten — and the assertion that follows it fails when a name
+ * here stops being stranded, so the list cannot rot.
+ */
```

The hoist, and the regex literal converged to the pilot's:

```diff
 		for (const group of guide.methods()) {
-			const entity = group.interface.replace(/Interface$/u, '')
+			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
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
-					const documented = group.methods.map((method) => method.name)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface).map((example) => example.name)
-							: source
-									.examples(group.interface)
-									.map((example) => example.name)
-									.concat(source.examples(entity).map((example) => example.name))
 					expect(findUnexampled(documented, fences, examples)).toEqual([])
```

The methods loop's `entity` line took the same literal, so both drop-in loops read as the pilot
writes them. The `u` flag was table's own, not lint's: `npx oxlint --config .oxlintrc.json
--deny-warnings <copy without the flag>` exited 0, and `.oxlintrc.json` declares no
`require-unicode-regexp` rule.

### The drop-in diff against the pilot

The brief's command compares the two files from their first top-level `describe(` to the end, which
in both files is the executed transcription half — abort's `flagship fences` against table's
`table.md fences`. Those are package-owned by construction (Ruling 13 scopes the shared drop-in to
the text outside the constants, and the transcriptions are each package's own fences), so the
command reports the whole of both blocks:

```text
$ diff <(sed -n '/^describe(/,$p' /home/user/fleet/abort/tests/guides.test.ts) \
       <(sed -n '/^describe(/,$p' tests/guides.test.ts)
1,2c1,256
< describe('flagship fences', () => {
< 	const guideText = requireValue(files[GUIDE_SPEC], `Missing file: ${GUIDE_SPEC}`)
---
> describe('table.md fences', () => {
> 	it('opens the Surface example', () => {
… 609 lines
```

The comparison Ruling 13 rules on is the region before that line — the shared drop-in. Run over it,
the manifest loop, including the hoisted examples loop, is byte-identical to the pilot's; the diff
reports nothing between the pilot's `for (const entry of manifest) {` and the executed half:

```text
$ diff <(sed -n '1,/^describe(/p' /home/user/fleet/abort/tests/guides.test.ts) \
       <(sed -n '1,/^describe(/p' tests/guides.test.ts)
2c2
< // this repo's own `guides/README.md` manifest. The constants below are this
---
> // this repo's own `guides/README.md` manifest. The constants that follow are this
22c22 / 24c24,64 / 26c66 / 31c71 / 33c73,76 / 42,43c85,93   (constants and imports)
47c97
< const root = new URL('../', import.meta.url)
---
> const root = resolveRoot(import.meta)
61,64c111
< it('manifest lists at least one guide', () => …)
---
> const readme = createGuide(requireValue(files['README.md'], 'Missing file: README.md'))
102c149   const pitch = readme.tagline()
111a159,182   (two package-owned cases added)
260,265c331,332   (the executed half's own header and title)
```

Full text: `/home/user/fleet/table/tmp/d7n-table-converge-fix/dropin-diff.txt` and
`brief-diff.txt`.

Table now leads the pilot on the header line: it carries Ruling 13's amended wording and the pilot
still reads "The constants below are this", which the pilot takes in its own closing unit.

## Item 2 — the `Shape` column (T2, Ruling 15)

Every `## Surface` table carrying an `interface` or `type` row — `### Rows, cells, and columns`,
`### The lens`, `### The table` — heads `Shape` between `Kind` and `Summary`, with Ruling 15's
convention sentence verbatim as its own paragraph between the section heading and the table.
`### Constants` heads `Shape` with each constant's declared type under the constants sentence alone,
following the converged precedent at `/home/user/fleet/test/guides/test.md:139`. The function-only
tables — Guards, Helpers, Cloners, Parsers — take no column.

Representative cells:

```text
| `ColumnChoice` | interface | `{ value, label, help? }`                               | …
| `ChoiceColumn` | interface | `{ cell, choices, key, label?, help?, hidden?, meta? }` | …
| `ColumnCell`   | type      | `'text' \| 'number' \| 'flag' \| 'choice'`              | …
| `CellMatcher`  | type      | `(cell: TableCell \| undefined, filter: TableFilter) => boolean` | …
| `TableInterface` | interface | `{ emitter, schema, rows, sort, filter, selection, expansion, pagination, view, count, destroyed } plus clear, destroy` | …
| `RowManagerInterface` | interface | `{} plus row, rows, add, update, move, remove`  | …
| `PaginationManagerInterface` | interface | `{ page, limit, offset, count } plus move, resize` | …
| `TableEventMap` | type     | `{ write, remove, sort, filter, select, expand, paginate, clear }` | …
| `COLUMN_CELLS` | const     | `readonly ColumnCell[]`                                | …
| `COLUMN_LIMIT` | const     | `number`                                               | Names the maximum number of columns one schema may declare: 256.
```

The prose Ruling 15 retires:

```diff
-`TableInterface`'s readonly data members stay here rather than in `## Methods`: `emitter` (the typed
-event surface), `schema` (the owned frozen copy), the managers `rows`, `sort`, `filter`,
-`selection`, `expansion`, and `pagination`, plus `view` (the rows to draw right now), `count` (how
-many rows the filter admits), and `destroyed`. The managers carry readonly members of their own:
-`selection.keys` and `expansion.keys` are the picked and opened key sets, and `pagination` publishes
-`page`, `limit`, `offset`, and `count`.
+`TableInterface`'s readonly data members stay here, in its `Shape` cell, rather than in
+`## Methods`, and each manager's own readonly members sit in that manager's cell. Every
+call-signature member is documented under [Methods](#methods).
@@ ## Methods
-nothing to. Every readonly data member stays in the `## Surface` rows stated earlier and is not repeated
-here: `TableInterface`'s `emitter`, `schema`, its managers, `view`, `count`, and `destroyed`;
-`SelectionManagerInterface.keys` and `ExpansionManagerInterface.keys`; and
-`PaginationManagerInterface`'s `page`, `limit`, `offset`, and `count`.
+nothing to. Every readonly data member stays in the `## Surface` rows stated earlier, in each
+interface's `Shape` cell, and is not repeated here.
@@ ### Constants
-under a consumer. The budgets are numbers.
+under a consumer.
```

Descriptions that were only a member list, rewritten in the doc block and carried across with
`--to guide`:

```diff
- * Describes what every column carries, whatever its cells hold — `key` / `label` / `help` /
- * `hidden` / `meta`.
+ * Describes what every column carries, whatever its cells hold — the name a row's cell uses, the
+ * text a reader sees, whether a host draws the column, and the metadata a host attaches to it.
- * Holds everything a table declares about itself — optional `name` / `label` / `help`, the
- * required `key` naming row identity, and `columns` in order.
+ * Holds everything a table declares about itself — how the table is described, which column
+ * carries row identity, and the columns it declares, in the order it declares them.
- * Names which way a column sorts — `'ascending' | 'descending'`. A column nobody has sorted
- * carries no term at all.
+ * Names which way a column sorts. A column nobody has sorted carries no term at all.
- * Names how a filter tests a cell — `'contains' | 'between' | 'equals'`.
+ * Names how a filter tests a cell — the operator each filter carries.
- * Names the reason a {@link TableError} carries — `SCHEMA` / `COLUMN` / `KEY` / `CELL` /
- * `DESTROYED`.
+ * Names the reason a {@link TableError} carries — the machine-readable code a `catch` branches on.
- * Lists everything a table announces — `write` / `remove` / `sort` / `filter` / `select` /
- * `expand` / `paginate` / `clear`.
+ * Lists everything a table announces, mapping each event to the payload its listeners receive.
- * Describes how to open a table — `on` listeners, an `error` handler, seeded `rows`, per-column
- * `comparators` and `matchers`, and a page `limit`.
+ * Describes how to open a table — the listeners wired at construction and where a throw from one
+ * goes, the rows seeded into it, the per-column comparison and test replacements, and the page
+ * size.
```

Each constant's literal already sat in its description paragraph (`… may declare: 256.`), so
Ruling 18's requirement held before this unit and the cells carry it through `--to guide`.

## Item 3 — propagation

```text
$ npx oxfmt --config .oxfmtrc.json --write guides/table.md src/core/types.ts tests/guides.test.ts
Finished in 631ms on 3 files using 4 threads.

$ npm run docs -- --to guide
rows read: 1, disagreements found: 7, written: 7, reported: 0
```

## Acceptance criteria

1. `git status --short`

   ```text
    M guides/table.md
    M src/core/types.ts
    M tests/guides.test.ts
   ```

   The unit's instruments sit in `tmp/d7n-table-converge-fix/`, which the tree ignores.

2. Format, lint, typecheck

   ```text
   $ npx oxfmt --config .oxfmtrc.json --check guides/table.md src/core/types.ts tests/guides.test.ts
   All matched files use the correct format.
   Finished in 603ms on 3 files using 4 threads.
   format:check exit=0

   $ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core
   lint exit=0

   $ npm run check
   > tsc --noEmit -p configs/src/tsconfig.core.json
   check exit=0
   ```

3. Docs at zero, both directions at `written: 0`

   ```text
   $ npm run docs
   rows read: 1, disagreements found: 0
   $ npm run docs -- --to guide
   rows read: 1, disagreements found: 0, written: 0, reported: 0
   $ npm run docs -- --to source
   rows read: 1, disagreements found: 0, written: 0, reported: 0
   ```

4. The convention sentence and the member-type grep

   ```text
   $ grep -c 'A `Shape` cell holds an interface' guides/table.md
   3
   $ grep -n 'A `Shape` cell holds' guides/table.md
   70:A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
   91:A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
   110:A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
   148:A `Shape` cell holds the constant's declared type.

   $ grep -n '| interface *| `{[^`]*:' guides/table.md
   grep-exit=1   (prints nothing)
   ```

   The drop-in diff is reported under Item 1.

5. Suites

   ```text
   $ npm run test:guides
   Test Files  1 passed (1)
        Tests  85 passed (85)
     Duration  2.33s
   exit=0

   $ npm run test:policy
   Test Files  1 passed (1)
        Tests  90 passed | 1 skipped (91)
     Duration  793ms
   exit=0
   ```

## Ancillary decisions, recorded

- **The constants table's sentence.** `### Constants` carries the constants sentence alone rather
  than that sentence after the interface-and-alias one. Ruling 18 names "Ruling 12's constants
  sentence" in the singular and `/home/user/fleet/test/guides/test.md:139` — a converged package —
  writes it alone over a table whose every row is a `const`.
- **A constant's `Shape` cell holds `number`, not its literal type.** Ruling 18 removes the `Value`
  column and puts the literal in the description paragraph, so a cell repeating `256` would restore
  the column under another header. Annotating the declarations would have moved a code token, which
  the brief bars.
- **An extending column interface carries its full data member set.** `TextColumn` reads
  `{ cell, key, label?, help?, hidden?, meta? }` rather than its own `{ cell }`, matching
  `/home/user/fleet/html/guides/html.md`'s node rows, so a reader of one row sees what that type
  holds.
- **A `class` or `function` row's `Shape` cell is empty.** Ruling 12 gives the idiom for an
  interface and an alias and no form for either of those, and an em dash there would be a sentinel.
- **The regex literal.** Both drop-in loops took the pilot's `/Interface$/`, proved lint-clean
  first, because Ruling 13 makes the pilot's text canonical outside the constants.

## Observations for the closing sweep

The drop-in still diverges from the pilot outside its constants, in ways this unit did not close
because each is package-owned coverage or a mechanism choice rather than the audit's finding:

- `resolveRoot(import.meta)` where the pilot writes `new URL('../', import.meta.url)`.
- A hoisted `readme` binding, read by the tagline case.
- Two cases the pilot does not carry: `imports only real exports in every root README ```ts fence`
  and `parses manifest rows that point at real files`. The second opens with
  `expect(manifest.length).toBeGreaterThan(0)`, which is the whole of the pilot's
  `manifest lists at least one guide` case, so table asserts it under a different case name.

Closing these means either deleting package-owned coverage or adding a duplicate assertion, so they
are the Orchestrator's call rather than this unit's.

## Deviation state

No deviation. No gate outside the owned files went red, and every `Shape` cell was expressible in
Ruling 12's idiom.

---

**Orchestrator annotation (closure, 2026-09-07):** the closure `checker` read counts (and, for table, an authored elision inside a `diff` fence) in this report's prose. The tree is authoritative; the report stands annotated.

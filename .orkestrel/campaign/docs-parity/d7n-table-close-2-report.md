# Report — `d7n-table-close-2`

## Item 1 — Ruling 26 (function rows) and Item 2 — Ruling 28 (class rows)

Both landed together in `guides/table.md`'s "### The table" convention sentence and its table.

```diff
--- a/guides/table.md
+++ b/guides/table.md
@@ -107,13 +107,13 @@ A `Shape` cell holds an interface's data members as bare names in braces, `?` ma
 
 The entity, its managers, its factory, its contract, and the error it raises.
 
-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to. A class row's `Shape` cell holds the interface it implements, or its constructor signature where it implements none.
 
 | API                          | Kind      | Shape                                                                                                                   | Summary                                                                                                                                                                                           |
 | ---------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
-| `Table`                      | class     |                                                                                                                         | Holds a schema, its rows, and the lens through which they are read, implementing `TableInterface` exactly.                                                                                        |
+| `Table`                      | class     | `TableInterface`                                                                                                        | Holds a schema, its rows, and the lens through which they are read, implementing `TableInterface` exactly.                                                                                        |
 | `TableInterface`             | interface | `{ emitter, schema, rows, sort, filter, selection, expansion, pagination, view, count, destroyed } plus clear, destroy` | Represents a table: what it declares, the rows it holds, and the lens it reads them through.                                                                                                      |
-| `createTable`                | function  |                                                                                                                         | Opens a table against a schema. The schema is copied, and the copy is what the table declares.                                                                                                    |
+| `createTable`                | function  | `(schema: TableSchema, options?: TableOptions) => TableInterface`                                                       | Opens a table against a schema. The schema is copied, and the copy is what the table declares.                                                                                                    |
 | `TableOptions`               | interface | `{ on?, error?, rows?, comparators?, matchers?, limit? }`                                                               | Describes how to open a table — the listeners wired at construction and where a throw from one goes, the rows seeded into it, the per-column comparison and test replacements, and the page size. |
 | `TableEventMap`              | type      | `{ write, remove, sort, filter, select, expand, paginate, clear }`                                                      | Lists everything a table announces, mapping each event to the payload its listeners receive.                                                                                                      |
 | `RowManagerInterface`        | interface | `{} plus row, rows, add, update, move, remove`                                                                          | Manages the rows a table holds, in the order it holds them.                                                                                                                                       |
@@ -122,9 +122,9 @@ A `Shape` cell holds an interface's data members as bare names in braces, `?` ma
 | `SelectionManagerInterface`  | interface | `{ keys } plus select, clear, toggle`                                                                                   | Manages the rows somebody has picked.                                                                                                                                                             |
 | `ExpansionManagerInterface`  | interface | `{ keys } plus expand, clear, toggle`                                                                                   | Manages the rows somebody has opened up.                                                                                                                                                          |
 | `PaginationManagerInterface` | interface | `{ page, limit, offset, count } plus move, resize`                                                                      | Manages which stretch of the filtered rows the view shows.                                                                                                                                        |
-| `TableError`                 | class     |                                                                                                                         | Represents an error raised by the table domain — a machine-readable `code` and optional structured `context`.                                                                                     |
+| `TableError`                 | class     | `new (code: TableErrorCode, message: string, context?: JSONRecord) => TableError`                                       | Represents an error raised by the table domain — a machine-readable `code` and optional structured `context`.                                                                                     |
 | `TableErrorCode`             | type      | `'SCHEMA' \| 'COLUMN' \| 'KEY' \| 'CELL' \| 'DESTROYED'`                                                                | Names the reason a `TableError` carries — the machine-readable code a `catch` branches on.                                                                                                        |
-| `isTableError`               | function  |                                                                                                                         | Determines whether a caught value is a table error, so a `catch` branches on `code` without an assertion.                                                                                         |
+| `isTableError`               | function  | `TableError`                                                                                                            | Determines whether a caught value is a table error, so a `catch` branches on `code` without an assertion.                                                                                         |
```

`createTable`'s cell holds the function's signature read from `src/core/factories.ts:44`
(`export function createTable(schema: TableSchema, options?: TableOptions): TableInterface`).
`isTableError` is a guard row (`input is TableError`, `src/core/errors.ts:37`), so under
Ruling 26 its cell holds the narrowed type `TableError`, not a full signature. `Table`
(`src/core/Table.ts:37`, `implements TableInterface`) holds `TableInterface`. `TableError`
(`src/core/errors.ts:8`, `extends Error`, implements no package interface) holds its
constructor signature read from the same file's `constructor(code: TableErrorCode, message:
string, context?: JSONRecord)`.

## Item 3 — Ruling 20 (the drop-in's canon)

Moved the pilot's `manifest lists at least one guide` case back to the pilot's position
(directly after `own`), moved the `readme` binding inside the case that uses it, restored
the README-tagline case to the pilot's inline form, and appended the package's own
`imports only real exports in every root README \`\`\`ts fence` and `parses manifest rows
that point at real files` cases after the pilot's README case, dropping the
`expect(manifest.length).toBeGreaterThan(0)` line that had been folded into the latter
(that assertion now lives only in the restored `manifest lists at least one guide` case).

```diff
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -108,7 +108,10 @@ const own = requireValue(
 	manifest.find((entry) => entry.spec === GUIDE_SPEC),
 	`Missing manifest row: ${GUIDE_SPEC}`,
 )
-const readme = createGuide(requireValue(files['README.md'], 'Missing file: README.md'))
+
+it('manifest lists at least one guide', () => {
+	expect(manifest.length).toBeGreaterThan(0)
+})
 
 // The example half of the equality case is silent over an empty population: with no
 // title on both sides `findDrift` compares no pair and the case passes on the summaries
@@ -146,7 +149,7 @@ it('pairs at least one example title across the guide and the source', () => {
 // against `undefined` first, so a file that lost its blockquote reports that rather
 // than reporting two absences as agreement.
 it('opens the README with the guide tagline', () => {
-	const pitch = readme.tagline()
+	const pitch = createGuide(requireValue(files['README.md'], 'Missing file: README.md')).tagline()
 	const tagline = createGuide(
 		requireValue(files[GUIDE_SPEC], `Missing file: ${GUIDE_SPEC}`),
 	).tagline()
@@ -157,6 +160,7 @@ it('opens the README with the guide tagline', () => {
 })
 
 it('imports only real exports in every root README ```ts fence', () => {
+	const readme = createGuide(requireValue(files['README.md'], 'Missing file: README.md'))
 	const fences = readme.fences().filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 	for (const fence of fences) {
 		for (const { specifier, names } of extractFenceImports(fence.code)) {
@@ -169,7 +173,6 @@ it('imports only real exports in every root README ```ts fence', () => {
 })
 
 it('parses manifest rows that point at real files', () => {
-	expect(manifest.length).toBeGreaterThan(0)
 	for (const entry of manifest) {
 		expect(files[entry.spec]).toBeDefined()
 		const modules = typeof entry.source === 'string' ? [entry.source] : entry.source
```

Verified the pilot-matching stretch (root through own, the three pilot cases, and the
unchanged manifest `for` loop) equals the pilot byte for byte, skipping only the package's
two appended cases (`tests/guides.test.ts:162-184`, between the pilot's README case at
line 160 and the `for (const entry of manifest) {` loop at line 186):

```
$ diff <(sed -n '47,110p;112,258p' /home/user/fleet/abort/tests/guides.test.ts) \
       <(sed -n '97,160p;186,332p' /home/user/fleet/table/tests/guides.test.ts)
(no output)
```

## Item 4 — Ruling 24 (README's `## Usage` fence)

```diff
--- a/README.md
+++ b/README.md
@@ -23,8 +23,6 @@ npm install @orkestrel/table
 
 ## Usage
 
-Declare the columns, hold the rows, and read the ones to draw:
-
 ```ts
 import { createTable } from '@orkestrel/table'
```

## Criteria

1. `git status --short` in `/home/user/fleet/table`:
   ```
    M README.md
    M guides/table.md
    M tests/guides.test.ts
   ```
   Owned files only.

2. `grep -nE '^\| \`[^\`]+\` +\| (function|const|class) +\| +\| ' guides/table.md` — no output
   (exit 1, no match). `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next}
   /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/table.md` — no output.
   `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p
   tests/guides.test.ts)` — no output.

3. `npx oxfmt --config .oxfmtrc.json --check guides/table.md tests/guides.test.ts` —
   `All matched files use the correct format.` exit 0. `npx oxlint --config .oxlintrc.json
   --deny-warnings tests/guides.test.ts` — exit 0, no output.

4. `PATH=/opt/npm11/bin:$PATH npm run docs` — `rows read: 1, disagreements found: 0`.
   `node --experimental-strip-types scripts/docs.ts --to guide` — `rows read: 1,
   disagreements found: 0, written: 0, reported: 0`. `--to source` — the same line,
   `written: 0, reported: 0`. `git status --short` unchanged after both runs (no `Summary`
   cell moved by hand or by the script).

5. `PATH=/opt/npm11/bin:$PATH npm run test:guides`:
   ```
    RUN  v4.1.11 /home/user/fleet/table
   ······················································································
    Test Files  1 passed (1)
         Tests  86 passed (86)
      Start at  02:48:07
      Duration  918ms (transform 306ms, setup 368ms, import 241ms, tests 159ms, environment 0ms)
   ```
   Exit 0.

No `Shape` cell required a departure from Rulings 25, 26, or 28. `npm run docs` reported no
disagreement. No gate outside the owned files went red.

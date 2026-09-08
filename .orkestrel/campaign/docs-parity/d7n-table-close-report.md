# Report — `d7n-table-close`

## Item 1 — the `Shape` idiom (Rulings 15, 18, 20, 21)

`guides/table.md` hunk:

```diff
--- a/guides/table.md
+++ b/guides/table.md
@@ Rows, cells, and columns
-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. An extended interface's name comes before `plus`, with the members it adds after.
@@
-| `TextColumn`   | interface | `{ cell, key, label?, help?, hidden?, meta? }`             | ...
-| `NumberColumn` | interface | `{ cell, key, label?, help?, hidden?, meta? }`             | ...
-| `FlagColumn`   | interface | `{ cell, key, label?, help?, hidden?, meta? }`             | ...
-| `ChoiceColumn` | interface | `{ cell, choices, key, label?, help?, hidden?, meta? }`    | ...
+| `TextColumn`   | interface | `ColumnBase plus { cell }`                                 | ...
+| `NumberColumn` | interface | `ColumnBase plus { cell }`                                 | ...
+| `FlagColumn`   | interface | `ColumnBase plus { cell }`                                 | ...
+| `ChoiceColumn` | interface | `ColumnBase plus { cell, choices }`                        | ...
@@ Guards
-| API   | Kind | Summary |
+In a guard table a `Shape` cell holds the type the guard narrows to.
+
+| API   | Kind | Shape | Summary |
   isTableCell             -> `TableCell`
   isTableRow              -> `TableRow`
   isColumnCell            -> `ColumnCell`
   isColumnChoice          -> `ColumnChoice`
   isTableColumn           -> `TableColumn`
   isStructuralTableSchema -> `TableSchema`
   isTableSchema           -> `TableSchema`
```

`ColumnChoice`, `ColumnBase`, `TableSchema` and every row under "The lens" and "The table" carry no
call-signature members, so their bare-brace cells needed no `plus` and took no edit. `TableOptions`
(line 117 in the brief's list) likewise has no call-signature members. The `## Cells`,
`### Constants`, `### Helpers`, `### Cloners`, and `### Parsers` tables carry no interface or type
rows (or, for `### Constants`, already carried `Shape`), so none took the column.

## Item 2 — member references

Sites: none. No doc-block edit was needed; `npm run docs` reports zero disagreements before and
after the other items' edits.

## Item 3 — the drop-in's canon

`tests/guides.test.ts` hunk:

```diff
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@
-// package's own, and are the only part a sibling package changes.
+// package's own, as is the executed section that closes the file.
@@
-import { requireValue, resolveRoot } from '@orkestrel/test'
+import { requireValue } from '@orkestrel/test'
@@
-const root = resolveRoot(import.meta)
+const root = new URL('../', import.meta.url)
```

Reading the region from `const root = ` through the manifest loop's closing brace against the
pilot's current (unconverged) file surfaces only the header line and the `root` line as this
package's deviations from Ruling 20's canon ("`new URL('../', import.meta.url)` rather than a
package helper"); table's `readme` convergence, its `imports only real exports in every root
README` fence case, and its `parses manifest rows` case already matched the target shape a prior
refine pass on this tip had landed, so no further hunk was needed there. `/Interface$/` carries no
flag, `findDrift` still runs inside the `it`, and no per-case budget exists. Table's own
package-specific case sits in its own `describe('table.md fences', …)` block after the manifest
loop closes, per Ruling 20's clause that each package writes its own executed section.

## Item 4 — fence lead-ins

Added one lead-in sentence between each bare heading and its untitled fence:

```diff
 ### text
+
+This fence declares a `text` column.
+
 ```ts
@@
 ### number
+
+This fence declares a `number` column.
+
 ```ts
@@
 ### flag
+
+This fence declares a `flag` column.
+
 ```ts
@@
 ### choice
+
+This fence declares a `choice` column with its ordered choices.
+
 ```ts
```

## Item 5 — propagation

Ran in order.

## Acceptance criteria

1. `git status --short`:
```
 M guides/table.md
 M tests/guides.test.ts
```
Owned files only.

2. `grep -n '| interface *| \`{[^\`]*:' guides/table.md` — no match (exit 1).
   `grep -n '…' guides/table.md` — no match (exit 1).

3. The item 3 region diff against the pilot resolves to the header line and the `root` line
   alone, both closed; the pilot's own case shape and comments are otherwise byte-identical, and
   line 2 already read the pilot's header text (`this repo's own \`guides/README.md\` manifest.`)
   before and after this unit.

4. `npx oxfmt --check guides/table.md tests/guides.test.ts`:
```
All matched files use the correct format.
Finished in 652ms on 2 files using 4 threads.
```
exit 0.
   `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts`: no output, exit 0.

5. `npm run docs`:
```
rows read: 1, disagreements found: 0
```
exit 0.
   `node --experimental-strip-types scripts/docs.ts --to guide`:
```
rows read: 1, disagreements found: 0, written: 0, reported: 0
```
   `node --experimental-strip-types scripts/docs.ts --to source`:
```
rows read: 1, disagreements found: 0, written: 0, reported: 0
```
Both exit 0, both `written: 0`.

6. `npm run test:guides`:
```
Test Files  1 passed (1)
     Tests  85 passed (85)
  Duration  763ms (transform 306ms, setup 261ms, import 224ms, tests 114ms, environment 0ms)
```
wall clock: 4s, exit 0 (the equality case ran under the project's default `guides` configuration,
no per-case budget override).
   `npm run test:policy`:
```
Test Files  1 passed (1)
     Tests  90 passed | 1 skipped (91)
  Duration  786ms (transform 338ms, setup 248ms, import 150ms, tests 245ms, environment 0ms)
```
wall clock: 1s, exit 0.

## Deviations

None. Every item closed within the brief's scope; no ancillary decision needed recording beyond
the wording chosen for the four fence lead-in sentences.

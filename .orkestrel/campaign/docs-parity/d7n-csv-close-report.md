# Report — `d7n-csv-close`

## Item 1 — the `Shape` idiom (Rulings 15, 18, 20)

Verified the listed interface rows (`Position`, `FieldScan`, `RecordScan`, `HeaderResult`,
`RowResult`, `ParseOptions`, `RenderOptions`, `ExportOptions`, `TableExport`) against
`src/core/types.ts`: none declares a call-signature member, so none needs `plus`; their braces
were already correct.

Split the `### Types` convention sentence onto its own paragraph, directly above the table, per
Ruling 20:

```diff
 ### Types

-The full parse/render/export shape, from [`types.ts`](../src/core/types.ts). A
-`Shape` cell holds an interface's data members as bare names in braces, `?`
-marking an optional member and `plus` introducing its call-signature members,
-and a type alias's own type literal with a union's arms escaped as `\|`. An
+The full parse/render/export shape, from [`types.ts`](../src/core/types.ts). An
 interface's call-signature members are documented under
 [`## Methods`](#methods).

+A `Shape` cell holds an interface's data members as bare names in braces, `?`
+marking an optional member and `plus` introducing its call-signature members,
+and a type alias's own type literal with a union's arms escaped as `\|`.
+
 | Type                    | Kind      | Shape ...
```

Converted the `### Constants` table (`guides/csv.md`) from a `Value` column to `Shape`, per Ruling
18/20/21: header `Shape`, the constants sentence "A `Shape` cell holds the constant's declared
type." above the table, and each cell replaced with the constant's declared type
(`string`/`number`/`RegExp`/its own annotation) instead of its literal. Moved each literal that
Ruling 18 requires be named ("a default", a prefix, a separator, a canonical boolean form, the
error cap) into the matching doc block's description paragraph in `src/core/constants.ts` (`BOM`,
`DEFAULT_PARSE_OPTIONS`, `DEFAULT_RENDER_OPTIONS`, `POSITIONAL_COLUMN_PREFIX`, `SANITIZE_ESCAPE`,
`SUFFIX_SEPARATOR`, `BOOLEAN_TRUE`, `BOOLEAN_FALSE`, `MAX_ERRORS`), then converged both sides with
`npm run docs`.

Converted the `### Validators` guard table the same way: header `Signature` → `Shape`, added "In a
guard table a `Shape` cell holds the type the guard narrows to.", and narrowed each cell from
`Guard<CSVTable>` / `Guard<ColumnType>` to `CSVTable` / `ColumnType`.

## Item 2 — member references

Sites: none. `npm run docs` reported `rows read: 1, disagreements found: 0` before any edit; no
`{@link Owner#member}` / `{@link #member}` site existed to correct.

## Item 3 — the drop-in's canon (Rulings 13, 20)

Applied the header hunk (lines 1–3) and the `INTERNAL` doc-block sentence to the pilot's canon:

```diff
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
-// this repo's own `guides/README.md` manifest. The constants that follow and the
-// `flagship fences` block are this package's own; a sibling package rewrites each of them.
+// this repo's own `guides/README.md` manifest. The constants that follow are this
+// package's own, as is the executed section that closes the file.
```

```diff
- * intentional rather than forgotten — and the second assertion below fails when a name
+ * intentional rather than forgotten — and the assertion that follows it fails when a name
```

Applied the reported region hunk, replacing the multi-line `PACKAGE_README`-based pitch
construction with the pilot's single-line literal form:

```diff
-	const pitch = createGuide(
-		requireValue(files[PACKAGE_README], `Missing file: ${PACKAGE_README}`),
-	).tagline()
+	const pitch = createGuide(requireValue(files['README.md'], 'Missing file: README.md')).tagline()
```

`diff` of the region from `const root = ` through the manifest loop's closing brace against the
pilot's same region: empty (byte-identical). The `flagship fences` section (the package's own
executed section) follows immediately after, unchanged in content, matching the canon's allowance
for a package's own trailing section.

## Item 4 — fence lead-ins (Ruling 21)

Added one lead-in sentence between each listed heading and its directly-following fence:

```diff
 ### Parse and query

+Parses a small CSV string with inference, then reads and filters its rows:
+
 ```ts
```

(and the same pattern for "Rewrite with `map`, then render back", "Reduce into an accumulator",
"Streaming rows", "Handling errors without `strict`", "`strict` mode throws the first error",
"Exporting a portable schema", "Contract-backed row validation", "Guarding an adopted table", and
"Tokenizer leaves directly" — the ten headings the brief listed).

## Item 5 — propagation

Ran in order, after every edit above:

```text
$ npx oxfmt --write guides/csv.md tests/guides.test.ts
Finished in 822ms on 2 files using 4 threads.
```

```text
$ npm run docs
rows read: 1, disagreements found: 0
```

```text
$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

```text
$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Acceptance criteria

1. `git status --short` → `M guides/csv.md`, `M src/core/constants.ts`, `M tests/guides.test.ts`
   — owned files only.
2. `grep -n '| interface *| \`{[^\`]*:' guides/csv.md` → no match (exit 1). `grep -n '…' guides/csv.md`
   → four matches, each in a `Summary` cell or in body prose (`POSITIONAL_COLUMN_PREFIX`,
   `SUFFIX_SEPARATOR`, `uniqueColumns`, and the "Total parsing" section), none in a `Shape` cell.
   Every table carrying `Shape` (`### Types`, `### Constants`, `### Validators`) has its canonical
   sentence between the heading and the table.
3. The item 3 region diff against the pilot: empty. Line 2 equals the pilot's.
4. `npx oxfmt --check guides/csv.md tests/guides.test.ts` → "All matched files use the correct
   format." exit 0. `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` →
   exit 0.
5. `npm run docs` → `disagreements found: 0`; both write directions → `written: 0`.
6. `npm run test:guides` → `Test Files 1 passed (1)`, `Tests 34 passed (34)`, duration 624ms, exit
   0. `npm run test:policy` → `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`,
   duration 607ms, exit 0.

## Deviation note (ancillary, decided and recorded)

Item 1's per-line finding lists ("Tables without `Shape`...: (none)"; "Guard and constants tables,
and convention sentences off the canon (Ruling 20): (none)") did not name the `### Constants` and
`### Validators` tables as carrying a defect, yet both used `Value` / `Signature` headers rather
than `Shape` on this tip. Item 1's own directive text ("A constants table heads `Shape`...", "A
dedicated guard table heads `Shape`...") states the requirement unconditionally, and the pattern
matches the cited exemplar packages (`form`, `router`) exactly. Read the "(none)" lines as scoped
to sentence-wording violations rather than to whether a table had adopted `Shape` at all, and
converted both tables. This is not gated by `npm run docs` (the `Shape`/guard columns are
hand-authored, not compared by `findDrift`), so the change carries no risk to the equality gate;
confirmed by the `written: 0` reads above both before and after.

## Files touched

- `/home/user/fleet/csv/guides/csv.md`
- `/home/user/fleet/csv/src/core/constants.ts`
- `/home/user/fleet/csv/tests/guides.test.ts`

---

Orchestrator's annotation (2026-09-08, before landing): the unit wrote the literal U+FEFF character into `BOM`'s description (Ruling 18's literal in the description), which `oxlint` reports as `no-irregular-whitespace` at `src/core/constants.ts:6:50`; the Orchestrator's one-line correction writes the escaped form `'﻿'` in the doc comment, `--to guide` carried the cell, and `lint:check` on the file, `npm run docs` at zero, and `test:guides` re-read green before the landing. The sweep's verifier ran on the unit's tree and reported that lint red; the closure re-verifies.

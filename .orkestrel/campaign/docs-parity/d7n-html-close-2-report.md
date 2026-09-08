# Report — `d7n-html-close-2` (html: the closing checker's findings)

## Item 1 — Ruling 20, the `### Validators` guard table

```diff
-| Name              | Kind     | Signature                                   | Summary                                                                                                                                                                                                       |
-| ----------------- | -------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
-| `isHTMLAttribute` | const    | `Guard<HTMLAttribute>`                      | Determines whether an arbitrary value is a structurally valid HTML attribute - exactly a string name, optionally a string value, and nothing else.                                                            |
-| `isHTMLCodePoint` | function | `(value: unknown) => value is number`       | Determines whether a code point may appear in an unambiguous HTML source token.                                                                                                                               |
-| `isTextNode`      | const    | `Guard<TextNode>`                           | Determines whether an arbitrary value is a structurally valid text node - a closed `{ category: 'text', value: string }` record.                                                                              |
-| `isCommentNode`   | const    | `Guard<CommentNode>`                        | Determines whether an arbitrary value is a structurally valid comment node - a closed `{ category: 'comment', value: string }` record.                                                                        |
-| `isDoctypeNode`   | const    | `Guard<DoctypeNode>`                        | Determines whether an arbitrary value is a structurally valid doctype node - a declared name plus optional public and system identifiers, closed.                                                             |
-| `isHTMLNode`      | function | `(value: unknown) => value is HTMLNode`     | Determines whether an arbitrary value is a valid HTML node - the value and every descendant, walked iteratively, cycle-checked, capped at `MAX_DEPTH`, and held to the void-element empty-children invariant. |
-| `isHTMLDocument`  | function | `(value: unknown) => value is HTMLDocument` | Determines whether an arbitrary value is a valid HTML document - the whole-node check narrowed to the root category, and the gate to run before adopting an untrusted document.                               |
-| `isElementNode`   | function | `(value: unknown) => value is ElementNode`  | Determines whether an arbitrary value is a valid element node - the whole-node check narrowed to an element, and the natural predicate to pass to `find` or `filter`.                                         |
+In a guard table a `Shape` cell holds the type the guard narrows to.
+
+| Name              | Kind     | Shape           | Summary                                                                                                                                                                                                       |
+| ----------------- | -------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
+| `isHTMLAttribute` | const    | `HTMLAttribute` | Determines whether an arbitrary value is a structurally valid HTML attribute - exactly a string name, optionally a string value, and nothing else.                                                            |
+| `isHTMLCodePoint` | function | `number`        | Determines whether a code point may appear in an unambiguous HTML source token.                                                                                                                               |
+| `isTextNode`      | const    | `TextNode`      | Determines whether an arbitrary value is a structurally valid text node - a closed `{ category: 'text', value: string }` record.                                                                              |
+| `isCommentNode`   | const    | `CommentNode`   | Determines whether an arbitrary value is a structurally valid comment node - a closed `{ category: 'comment', value: string }` record.                                                                        |
+| `isDoctypeNode`   | const    | `DoctypeNode`   | Determines whether an arbitrary value is a structurally valid doctype node - a declared name plus optional public and system identifiers, closed.                                                             |
+| `isHTMLNode`      | function | `HTMLNode`      | Determines whether an arbitrary value is a valid HTML node - the value and every descendant, walked iteratively, cycle-checked, capped at `MAX_DEPTH`, and held to the void-element empty-children invariant. |
+| `isHTMLDocument`  | function | `HTMLDocument`  | Determines whether an arbitrary value is a valid HTML document - the whole-node check narrowed to the root category, and the gate to run before adopting an untrusted document.                               |
+| `isElementNode`   | function | `ElementNode`   | Determines whether an arbitrary value is a valid element node - the whole-node check narrowed to an element, and the natural predicate to pass to `find` or `filter`.                                         |
```

Placed the guard sentence between the section prose and the table, dropped `Signature`, and narrowed each cell to the type each guard's `value is X` predicate (or `Guard<X>` alias) names in `src/core/validators.ts`.

## Item 2 — Ruling 25, the `### Shapers` table

```diff
-| Name             | Kind  | Shape           | Summary                                                                                                                                                                                                                  |
-| ---------------- | ----- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
-| `attributeShape` | const | `ContractShape` | Describes the shape of an `HTMLAttribute` - an element attribute's name and, when the source wrote one, its value. `value` is optional: its absence is what distinguishes `<input disabled>` from `<input disabled="">`. |
-| `textShape`      | const | `ContractShape` | Describes the shape of a `TextNode` - the decoded character-data leaf.                                                                                                                                                   |
-| `commentShape`   | const | `ContractShape` | Describes the shape of a `CommentNode` - the verbatim, never-decoded comment leaf a bogus comment also recovers to.                                                                                                      |
-| `doctypeShape`   | const | `ContractShape` | Describes the shape of a `DoctypeNode` - the declared root name plus the optional public and system identifiers of a legacy declaration.                                                                                 |
+| Name             | Kind  | Shape                                               | Summary                                                                                                                                                                                                                  |
+| ---------------- | ----- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
+| `attributeShape` | const | `ObjectShape<{ name, value? }>`                     | Describes the shape of an `HTMLAttribute` - an element attribute's name and, when the source wrote one, its value. `value` is optional: its absence is what distinguishes `<input disabled>` from `<input disabled="">`. |
+| `textShape`      | const | `ObjectShape<{ category, value }>`                  | Describes the shape of a `TextNode` - the decoded character-data leaf.                                                                                                                                                   |
+| `commentShape`   | const | `ObjectShape<{ category, value }>`                  | Describes the shape of a `CommentNode` - the verbatim, never-decoded comment leaf a bogus comment also recovers to.                                                                                                      |
+| `doctypeShape`   | const | `ObjectShape<{ category, name, public?, system? }>` | Describes the shape of a `DoctypeNode` - the declared root name plus the optional public and system identifiers of a legacy declaration.                                                                                 |
```

Read the member set from each `objectShape({ ... })` call in `src/core/shapers.ts`: `attributeShape` declares `name`, `value` (optional); `textShape` and `commentShape` each declare `category`, `value`; `doctypeShape` declares `category`, `name`, `public` (optional), `system` (optional). No `Summary` cell moved.

## Criteria, cheapest first

1. `git status --short` → `M guides/html.md` (owned files only; `tests/guides.test.ts` needed no change).
2. `grep -nE '^\| `[^`]+` +\| (function|const|class) +\| +\| ' guides/html.md` → no output (exit 1, no empty `Shape` cell). The fence sweep `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/html.md` → no output. `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` → no output (exit 0).
3. `npx oxfmt --config .oxfmtrc.json --check guides/html.md tests/guides.test.ts` → `All matched files use the correct format.` (exit 0). `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` → exit 0, no output.
4. `PATH=/opt/npm11/bin:$PATH npm run docs` → `rows read: 1, disagreements found: 0` (exit 0). `PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide` → `rows read: 1, disagreements found: 0, written: 0, reported: 0` (exit 0). `PATH=/opt/npm11/bin:$PATH npm run docs -- --to source` → `rows read: 1, disagreements found: 0, written: 0, reported: 0` (exit 0). `git status --short` after both write directions still shows only `guides/html.md`.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` → `Test Files 1 passed (1)`, `Tests 35 passed (35)` (exit 0).

## Instruments

Logs under `/home/user/fleet/html/tmp/d7n-html-close-2/`: `oxfmt-write.log.txt`, `oxfmt-check.log.txt`, `oxlint.log.txt`, `docs.log.txt`, `docs-to-guide.log.txt`, `docs-to-source.log.txt`, `test-guides.log.txt`, `diff.txt`.

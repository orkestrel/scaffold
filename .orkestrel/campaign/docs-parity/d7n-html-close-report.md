# Report — `d7n-html-close`

## Item 1: the `Shape` idiom (Rulings 15, 18, 20)

Fixes in `guides/html.md`:

- `### Types`: replaced the off-canon convention sentence with Ruling 15's exact wording ("A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`."). Verified every interface row the brief flagged for a missing `plus` (`HTMLAttribute`, `HTMLStartTag`, `HTMLTag`, `ElementNode`, `TextNode`, `CommentNode`, `DoctypeNode`, `HTMLDocument`, `HTMLSpan`, `HTMLOpenPosition`, `HTMLRawText`, `HTMLSanitizeOptions`, `HTMLDistillOptions`) against `src/core/types.ts`: none declares a call-signature member, so none needed a `plus` addition. Fixed `HTMLInterface`'s cell, which wrapped its call-signature members in a second brace group (`plus { span, walk, … }`); the canon has no braces on the `plus` side, so it now reads `{ document } plus span, walk, find, filter, map, reduce, fold, stream, sanitize, distill`.
  ```diff
  -The full node shape … `?` marking an optional member, and its call-signature members after `plus`; a type alias's cell holds the alias's own type literal, a union's arms escaped as `\|`. …
  +The full node shape … `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. …
  -| `HTMLInterface` | interface | `{ document } plus { span, walk, find, filter, map, reduce, fold, stream, sanitize, distill }` | …
  +| `HTMLInterface` | interface | `{ document } plus span, walk, find, filter, map, reduce, fold, stream, sanitize, distill` | …
  ```
- `### Constants`: renamed `Value` to `Shape`, replaced the intro's `Value`-cell sentence with Ruling 18's constants sentence, and changed every row's cell from the constant's own literal (or type, where the literal was too long) to its declared type alone. Two constants whose literal is the fact a reader needs lost that fact from the removed `Value` column, so their literal moved into the description paragraph in both the guide and `src/core/constants.ts` (in scope per the brief, "a constant's literal named (Ruling 18)"): `HTML_WHITESPACE` (`string`, `' \t\n\f\r'`) and `MAX_DEPTH` (`number`, `64`). Every array/record constant kept its existing description prose unchanged (no fleet precedent inlines a full member list for an array-typed constant — `csv.md`'s converged `### Constants` table names none).
- `### Shapers`: added the `Shape` column headed by Ruling 18's constants sentence, with `ContractShape` as every row's declared type (matching the section's own intro, "Declarative `ContractShape` values").

## Item 2: member references

Brief's site list was `(none)`. No `{@link Owner#member}` / `{@link #member}` sites exist in this package; no change.

## Item 3: the drop-in's canon (Rulings 13 and 20)

The `const root = ` through the manifest loop's closing brace region already matched the pilot byte for byte (brief's recorded diff was empty; confirmed with `diff <(sed -n '95,306p' tests/guides.test.ts) <(sed -n '47,258p' abort/tests/guides.test.ts)`, exit 0, no output). Fixed only the header (Ruling 13 amended, Ruling 21): lines 2–3 read the stale "constants below … only part a sibling package changes" text; replaced with the pilot's "constants that follow … as is the executed section that closes the file."
```diff
-// this repo's own `guides/README.md` manifest. The constants below are this
-// package's own, and are the only part a sibling package changes.
+// this repo's own `guides/README.md` manifest. The constants that follow are this
+// package's own, as is the executed section that closes the file.
```
The `INTERNAL` doc block already carries the pilot's sentence; no change there.

## Item 4: fence lead-ins (Ruling 21)

Added one complete sentence between each of the flagged headings and its directly-following fence, worded from the flagship-fence `it(...)` name that exercises it (`tests/guides.test.ts`'s `describe('flagship fences')` section), so each sentence is grounded in an executed assertion rather than invented: `Parse, then query`, `Adopt a document that came from somewhere else`, `` Rewrite with `map`, count with `reduce`, project with `fold` ``, `Stream the top level, shallow and backpressured`, `Sanitize, and watch the floor hold`, `Distill a page down to its content`, `Work on a bare node, with no handle at all`, `Scan by hand, one piece at a time`, `Escape, resolve, and inspect`, `Ask a name or an element a question`, `Prove the roundtrip laws`.

## Item 5: propagation

Ran in order: `npx oxfmt --write guides/html.md tests/guides.test.ts` (converged column widths after the manual table edits), then `npm run docs`, `npm run docs -- --to guide`, `npm run docs -- --to source`.

## Acceptance criteria

1. `git status --short` — `M guides/html.md`, `M src/core/constants.ts`, `M tests/guides.test.ts`. Owned files only.
2. `grep -n '| interface *| `{[^`]*:' guides/html.md` — no output. `grep -n '…' guides/html.md` — every hit is prose (`HTMLDocument`/comment description text, a heading table cell, prose ellipses), none inside a `Shape` cell.
3. `diff <(sed -n '95,306p' tests/guides.test.ts) <(sed -n '47,258p' /home/user/fleet/abort/tests/guides.test.ts)` — exit 0, no output (region matches pilot byte for byte). `sed -n '2p'` of both files — identical (header line 2 equals the pilot's).
4. `npx oxfmt --check guides/html.md tests/guides.test.ts` — "All matched files use the correct format." `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` — exit 0, no output.
5. `npm run docs` — `rows read: 1, disagreements found: 0`. `npm run docs -- --to guide` — `rows read: 1, disagreements found: 0, written: 0, reported: 0`. `npm run docs -- --to source` — `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
6. `npm run test:guides` — `Test Files 1 passed (1)`, `Tests 35 passed (35)`, duration `931ms` (wall `4.219s`). `npm run test:policy` — `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, duration `850ms` (wall `1.385s`).

## Wall clock

Full unit, brief read through final gate reruns: approximately 25 minutes.

No deviation. Full diff retained at `/home/user/fleet/html/tmp/d7n-html-close/full.diff`.

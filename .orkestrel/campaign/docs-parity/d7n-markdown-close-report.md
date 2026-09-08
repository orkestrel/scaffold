# Report — `d7n-markdown-close`

## Item 1 — the `Shape` idiom (Rulings 15, 18, 20)

The Types table (`guides/markdown.md:20`) already carried `Shape`, the canonical convention
sentence, and every listed interface's braces already held bare data members with no
call-signature members to move after `plus` (each declaration in `src/core/types.ts` checked
against its cell, `MarkdownInterface` already correct with `plus`). No change needed there.

Two findings closed:

- The `### Constants` table (`guides/markdown.md:63`) headed `Value` instead of `Shape` and
  carried no convention sentence. Hunk:
  ```diff
  -| Constant           | Kind  | Value                                                        | Summary |
  -| `MAX_DEPTH`        | const | `64`                                                         | Caps the recursion depth ... honor before degrading. It bounds ... |
  -| `EMPTY_PROJECTION` | const | `{ blocks: [], inlines: [], text: '', cells: [], rows: [] }` | Holds the frozen empty ... |
  +A `Shape` cell holds the constant's declared type.
  +
  +| Constant           | Kind  | Shape                | Summary |
  +| `MAX_DEPTH`        | const | `number`             | Caps the recursion depth ... honor before degrading, at 64. It bounds ... |
  +| `EMPTY_PROJECTION` | const | `MarkdownProjection` | Holds the frozen empty ... |
  ```
  `MAX_DEPTH`'s literal `64` was not named in prose (Ruling 18), so `src/core/constants.ts`'s
  doc block gained ", at 64" in the same clause, and the guide's cell carries that same text
  (`npm run docs` reads `disagreements found: 0` after).
- The `### Shapers` table (`guides/markdown.md:151`) carried an off-canon second sentence:
  "In a shaper table a `Shape` cell holds the node shape the value compiles into." Deleted; no
  guard table or extended interface exists in this guide, so no replacement sentence applies.

## Item 2 — member references

No `{@link Owner#member}` or `{@link #member}` site exists in this package's doc blocks.
`npm run docs` reads `rows read: 1, disagreements found: 0`; no `--to guide` run was needed.

## Item 3 — the drop-in's canon (Rulings 13, 20, 21)

The region from `const root = new URL('../', import.meta.url)` through the manifest loop's
closing brace already matched the pilot (`/home/user/fleet/abort/tests/guides.test.ts`) byte for
byte (confirmed with `diff` before and after `oxfmt`). The header (lines 1 to 3) did not: it
carried the struck clause and the package's own fences-block sentence Ruling 21 retires. Hunk:

```diff
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
 // this repo's own `guides/README.md` manifest. The constants that follow are this
-// package's own, and are the only part a sibling package changes. The executed half
-// sits at the end of the file, under `flagship fences`.
+// package's own, as is the executed section that closes the file.
```

After the edit, `diff <(sed -n '1,3p' tests/guides.test.ts) <(sed -n '1,3p' <pilot>)` and the
region diff both print nothing.

## Item 4 — fence lead-ins (Ruling 21)

Every fence sitting directly under a heading (`### Construct from a string and narrow with a
guard`, `### Construct from an adopted document`, `### Filter and flatten`, `### Chain \`map\`
rewrites, then write back with \`renderMarkdown\``, `### Reduce into an accumulator`,
`### Environment-agnostic fold`, `### Sync deep iteration`, `### Async iteration with \`for
await…of\``, `### Standalone projections and traversal on a bare node`,
`### Guide-parity extraction`, `### Contract-backed fixture generation`) gained one sentence
naming what its fence builds, between the heading and the fence. Each sentence names the
demonstration's own action (construct, adopt, filter and flatten, chain and write back, reduce,
fold, walk, consume through `for await…of`, run the class-free surface, extract, compile and
generate) so it disambiguates rather than merely restating the heading.

## Item 5 — propagation

`npx oxfmt --write guides/markdown.md tests/guides.test.ts` ran, then `--check` on both files
printed "All matched files use the correct format." `npm run docs` read
`rows read: 1, disagreements found: 0`; `-- --to guide` and `-- --to source` both read
`rows read: 1, disagreements found: 0, written: 0, reported: 0`.

## Acceptance criteria

1. `git status --short` — owned files only:
   ```
    M guides/markdown.md
    M src/core/constants.ts
    M tests/guides.test.ts
   ```
2. `grep -n '| interface *| \`{[^\`]*:' guides/markdown.md` — no output (exit 1, no match).
   `grep -n '…' guides/markdown.md` — matches only in `Summary` prose and body text (heading
   lines 24, 36, 43 read the ellipsis in their fourth `Summary` column; lines 106, 116 are
   function rows in a `Signature` table, not a `Shape` column; the remaining hits sit in body
   paragraphs and fence lead-ins for `for await…of`). No `Shape` cell carries `…`.
3. `diff` of the item 3 region against the pilot — no output; the header (lines 1 to 3) equals
   the pilot's, confirmed with `diff`.
4. `npx oxfmt --check guides/markdown.md tests/guides.test.ts` — exit 0, "All matched files use
   the correct format." `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts`
   — exit 0, no output.
5. `npm run docs` — `rows read: 1, disagreements found: 0`. `-- --to guide` and `-- --to source`
   — both `written: 0`.
6. `npm run test:guides` — `Test Files 1 passed (1)`, `Tests 63 passed (63)`, wall clock 3.773s
   (includes the equality case under the default budget). `npm run test:policy` —
   `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, wall clock 1.398s.

## Deviation report

None. No `Shape` cell existed that Ruling 12 could not express, the equality case ran green
under the default budget, no gate outside the owned files went red, and `npm run docs` reported
zero disagreements throughout, so no `--to guide` write was needed to close one.

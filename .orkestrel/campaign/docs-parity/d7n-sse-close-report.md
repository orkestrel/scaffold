# Report — `d7n-sse-close`

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** `guides/sse.md`:
   - Replaced the off-canon `### Types` convention sentence with Ruling 12's exact wording: "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`."
   - `SSEParserInterface` row: `{ parse, flush, clear, id, retry }` → `{ id, retry } plus parse, flush, clear` (data members `id`/`retry` in braces, call-signature members `parse`/`flush`/`clear` after `plus`, both in declaration order from `src/core/types.ts`). `SSEEvent` and `SSEParserOptions` carry no call-signature members, so their cells were already correct and untouched.
   - `### Constants` table: added a `Shape` column headed by the sentence "A `Shape` cell holds the constant's declared type.", with `string` for both `NUL` and `BOM` (each `String.fromCharCode(...)`, inferred `string`).

2. **Member references.** `npm run docs` reads `rows read: 1, disagreements found: 0` before and after; the `{@link #carriage}` site at `src/core/SSEParser.ts:169` sits inside a plain `//` comment, outside any doc block the reader compares, so no row disagreed and no edit was needed.

3. **The drop-in's canon (Rulings 13 and 20).** `tests/guides.test.ts`:
   - Header lines 1-3: replaced the sse-specific wording ("...then executes this package's flagship fences. The following constants, the `@src/core` and `./setup.js` imports the executed cases use, and the `flagship fences` block are this package's own, and are the parts a sibling package changes.") with Ruling 21's canonical three lines, byte-identical to the pilot's.
   - `INTERNAL` doc block: "the twin assertion fails" → "the assertion that follows it fails" (Ruling 11/13).
   - The region from `const root = new URL('../', import.meta.url)` through the manifest loop's closing brace was already byte-for-byte identical to the pilot's same region (confirmed with `diff` against `/home/user/fleet/abort/tests/guides.test.ts`'s equivalent lines): empty diff, no edit needed there.

4. **Fence lead-ins (Ruling 21).** Added the sentence "The following builds a parser bounded by `limit` and feeds it chunks as they arrive:" between the `#### Create a bounded parser and feed it chunks` heading and its fence.

5. **Propagation.** `npx oxfmt --write guides/sse.md tests/guides.test.ts` reformatted the table column widths in `guides/sse.md` (no content change); `npm run docs` held at `rows read: 1, disagreements found: 0`; both write directions reported `written: 0`.

## Acceptance criteria

1. `git status --short`:
```text
 M guides/sse.md
 M tests/guides.test.ts
```
Owned files only.

2. `grep -n '| interface *| `{[^`]*:' guides/sse.md` and `grep -n '…' guides/sse.md`: both print nothing. Every `Shape`-carrying table (`### Types`, `### Constants`) has its canonical sentence between the heading and the table.

3. Region diff (`const root = ` through the manifest loop's closing brace) against the pilot's same region: empty (`diff /tmp/abort-region.txt /tmp/sse-region.txt` — no output). Line 2 equals the pilot's: `// this repo's own \`guides/README.md\` manifest. The constants that follow are this`.

4.
```text
$ npx oxfmt --check guides/sse.md tests/guides.test.ts
Checking formatting...
All matched files use the correct format.
Finished in 316ms on 2 files using 4 threads.
exit 0

$ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit 0
```

5.
```text
$ npm run docs
rows read: 1, disagreements found: 0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

6.
```text
$ npm run test:guides
Test Files  1 passed (1)
     Tests  39 passed (39)
  Duration  464ms (transform 159ms, setup 117ms, import 162ms, tests 40ms, environment 0ms)
wall clock: 3.064s

$ npm run test:policy
Test Files  1 passed (1)
     Tests  90 passed | 1 skipped (91)
  Duration  665ms (transform 248ms, setup 104ms, import 184ms, tests 249ms, environment 0ms)
wall clock: 1.192s
```

## Deviation

None. Every criterion closed on the first pass; no `Shape` cell fell outside Ruling 12's expression, the equality case stayed green under the default budget, and no gate outside the owned files went red.

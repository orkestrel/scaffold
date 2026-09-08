# Report — `d7n-sse-close`

## Deviation

Expected: sole writer starting from the committed tip `97c6508` with `git status --short`
printing nothing to fix. Found: `/home/user/fleet/sse` sits at `7778cff`, one commit ahead of
`97c6508`, titled "Close sse under the final guide tarball", whose diff against `97c6508` is
exactly this unit's items: the `### Types` convention sentence rewritten to Ruling 12's wording,
the `SSEParserInterface` cell reordered to `{ id, retry } plus parse, flush, clear`, a `Shape`
column added to `### Constants` under its own sentence, the fence lead-in sentence added before
the `#### Create a bounded parser and feed it chunks` fence, and the `tests/guides.test.ts`
header and `INTERNAL` doc-block sentence brought onto the pilot's bytes. A report for this exact
unit already existed at `/home/user/scaffold/tmp/units/d7n-sse-close-report.md` (written before
this dispatch) itemizing the identical hunks. Evidence: `git log --oneline -2` on `/home/user/fleet/sse`
shows `7778cff` above `97c6508`; `git diff 97c6508 HEAD -- guides/sse.md tests/guides.test.ts`
reproduces the item-1 and item-3/4 hunks verbatim.
Hypothesis: a prior dispatch of this same unit already ran, committed, and reported; this
dispatch is a duplicate re-run against a stale expected-tip fact.

No further edits were made — the tree was already correct — and no scope was touched beyond the
brief's own `guides/sse.md` and `tests/guides.test.ts`, both already at their required state.
Below, every acceptance criterion was re-run fresh against the current tip rather than trusted
from the prior report.

## Items (already landed at `7778cff`; content confirmed unchanged)

1. **The `Shape` idiom.** `guides/sse.md` `### Types` sentence reads Ruling 12's exact wording;
   `SSEParserInterface` cell is `{ id, retry } plus parse, flush, clear`; `SSEEvent` and
   `SSEParserOptions` carry no call-signature members so their cells were already bare braces;
   `### Constants` carries a `Shape` column headed by "A `Shape` cell holds the constant's
   declared type." with `string` for `NUL` and `BOM`.
2. **Member references.** `npm run docs` reads `rows read: 1, disagreements found: 0`; the
   `{@link #carriage}` site at `src/core/SSEParser.ts:169` sits inside a plain `//` comment, outside
   any doc block the reader compares, so no edit applies.
3. **The drop-in's canon.** The region from `const root = new URL('../', import.meta.url)`
   (`tests/guides.test.ts:52`) through the manifest loop's closing brace (line 263) diffs empty
   against the pilot's same region (`/home/user/fleet/abort/tests/guides.test.ts:47`–258). Line 2
   equals the pilot's line 2: "// this repo's own `guides/README.md` manifest. The constants that
   follow are this".
4. **Fence lead-ins.** The sentence "The following builds a parser bounded by `limit` and feeds it
   chunks as they arrive:" sits between the `#### Create a bounded parser and feed it chunks`
   heading and its fence.
5. **Propagation.** Confirmed at zero disagreements and `written: 0` both directions (below).

## Acceptance criteria

1.
```text
$ git status --short
(no output)
```
Owned files only — none dirty.

2.
```text
$ grep -n '| interface *| `{[^`]*:' guides/sse.md
(no output, exit 1)
$ grep -n '…' guides/sse.md
(no output, exit 1)
```
Both `Shape`-carrying tables (`### Types`, `### Constants`) carry their canonical sentence between
the heading and the table.

3. Region diff against the pilot's same region (`const root = ` through the manifest loop's
   closing brace):
```text
$ diff tmp/d7n-sse-close/abort-region.txt tmp/d7n-sse-close/sse-region.txt
(no output, exit 0)
```
Line 2 equals the pilot's, confirmed above.

4.
```text
$ npx oxfmt --check guides/sse.md tests/guides.test.ts
Checking formatting...
All matched files use the correct format.
Finished in 621ms on 2 files using 4 threads.
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
  Duration  762ms (transform 140ms, setup 103ms, import 173ms, tests 48ms, environment 0ms)
wall clock: 6.577s

$ npm run test:policy
Test Files  1 passed (1)
     Tests  90 passed | 1 skipped (91)
  Duration  956ms (transform 243ms, setup 83ms, import 198ms, tests 536ms, environment 0ms)
wall clock: 1.467s
```
The equality case (item 3) held green under the default budget in the `test:guides` run.

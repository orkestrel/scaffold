# Unit report — D1-fix: the guide-readers fix round, `@orkestrel/guide` at `/home/user/fleet/guide`

Done. Every ruling closed in this unit, every acceptance criterion green, on the owned files only.
`implementer`, Opus 5, sole writer in this checkout. Deviation state: none.

## Per finding

**1. A row with no code-span name is dropped silently — closed.**

- `findUnnamed(document: MarkdownDocument): readonly string[]` is new — `src/core/helpers.ts:1424`.
  It walks `selectSectionBlocks(document, SURFACE)` then `selectSectionBlocks(document, METHODS)`,
  and for each table row whose first cell yields no `findFirstCode` value pushes that row's cells
  read through `extractCellText` and joined by ` | `.
- Check id chosen: **RN — Row naming**, in the catalog beside SB and MB — `guides/guide.md:464`. The
  row names the comparison (first cell against a code span), the finding's text shape, and the
  guard: RN reuses `extractSurface`'s and `extractMethods`' own table walk, so SB's
  `guide.surface().length > 0` and MB's `group.methods.length > 0` already prove it non-vacuous.
- Helpers row — `guides/guide.md:117`.
- Wired as an empty-array assertion — `tests/guides.test.ts:93`,
  `it('names every Surface and Methods row')`.
- TSDoc rewritten to say the reader skips the row and RN reports it — `src/core/helpers.ts:1294-1296`
  (`extractSurface`) and `:1363-1364` (`extractMethods`).
- Ordering decision, recorded: the findings run `## Surface` rows then `## Methods` rows, each in
  document order within its section, because the walk reuses `selectSectionBlocks` per section
  rather than adding a second document pass. Stated that way in the TSDoc and the catalog row.

**2. A pair with no text on either side reported agreement — closed.**

- `computeDrift` agrees only when both sides carry the same text; `undefined` against `undefined`
  now returns `{ key }` — `src/core/helpers.ts:1881`
  (`if (guide !== undefined && guide === source) return undefined`).
- TSDoc naming the three states aligned on `computeDrift` (`:1857-1863`), on `findDrift`
  (`:1900-1902`), and on `findColumnIndex` (`:976-978`, which no longer claims a finding the code
  did not produce).
- SQ paragraph — `guides/guide.md:492`: the preceding sentence names guide text alone, source text
  alone, and neither side carrying text; "never as agreement" is kept, and the paragraph adds that a
  table with no `Summary` column reports every row it documents, so a package adopting SQ cannot
  pass it vacuously.
- `guides/guide.md:665-672` § Tests states this checkout's own gate: `tests/guides.test.ts` wires RN,
  SB, MB, LI, TE, NV, FL, EX, and FI, and does not wire SQ, MQ, or EQ, because this guide's compared
  columns head `Shape`, `Signature`, `Behavior`, `Builds`, and `Returns` rather than `Summary`; the
  guide adopts the `Summary` column in a later change, and until then the catalog's SQ, MQ, and EQ
  rows describe checks this repository does not run against its own guide.

**3. The transform stated per side while the code applies one form to both — closed, no code change.**

- `guides/guide.md:316-333` lists the clauses once for both sides: `{@link X}` and `{@link A.b}` to
  the code token of the target text, `{@link X | text}` to the code token of `text`, emphasis to its
  text, a link to its text, an image to its alternative text, `\|` unescaped, whitespace collapsed,
  the ends trimmed, a code span kept. The closing paragraph (`:329`) states that emphasis, a link,
  and an image are markdown nodes so those clauses reach only a guide cell, that `{@link Widget}` is
  ordinary text so a guide cell carrying it rewrites to `` `Widget` `` exactly as a doc block's
  paragraph does, and that both sides end in `normalizeSummary`.
- The image descent is named in `extractCellText`'s TSDoc (`src/core/helpers.ts:951-952`) and in its
  Helpers row (`guides/guide.md:115`).

**4. `collectTitled` broke the `{verb}{Noun}` form — closed.**

- Renamed `collectTitles` in code (`src/core/helpers.ts:1967`), at its call site (`:1935`), in its
  TSDoc example, in `tests/src/core/helpers.test.ts` (import and `describe`), and in the Helpers row
  (`guides/guide.md:118`). `grep -rn "collectTitled" src tests guides` prints nothing.

**5. The Helpers table appended rather than placed — closed.**

- `guides/guide.md:80-123` is reordered by topic: module and path keys; symbol comparison; the
  source-line grammar with the doc-block readers (`extractSourceComments`, `normalizeComment`,
  `normalizeSummary`, `collectSummaries`, `collectExamples`) placed before the example projections;
  the guide-document projections with `extractTagline` among them; link and path resolution; the
  inline and cell readers, where `extractCellText` now sits between `findColumnIndex` and
  `extractCellLinks`; and the finding producers, `findUnnamed` through `findDrift`.

**6. A block tag indented past one space after the marker was not recognized — closed.**

- `collectSummaries` ends the paragraph at the first line whose first non-blank character opens a
  tag — `src/core/helpers.ts:1663` (`search(/^[ \t]*@\w/m)`).
- `collectExamples` matches `@example` at the first non-blank column and searches the next tag the
  same way — `src/core/helpers.ts:1688` and `:1693`.
- **Decision, recorded:** `extractExampleLines`'s own filter is aligned in the same way —
  `src/core/helpers.ts:1640`. The brief names `collectSummaries` and `collectExamples`; leaving this
  filter strict would have left the package answering "does this block carry an `@example`?"
  differently in two exported readers, which is the second half of the objective lane's finding ("a
  doc block … loses its `@example`"). The existing rejection cases (`@examples`, `@exampled`,
  `text @example prose`) still reject, pinned by
  `describe('extractExampleLines exact tags and physical adjacency')`.
- Fixture — `tests/src/core/helpers.test.ts:2188`, `describe('an over-indented block tag')`, over a
  block carrying ` *   @param` and ` *   @example`: the summary stops at the tag, `collectExamples`
  and `extractExamples` read the titled example, and `extractExampleLines` projects it onto the
  record its block documents. The example's code keeps the body indentation `normalizeComment`
  preserves by contract (`'  widget.render()'`), asserted literally.
- `guides/guide.md:336-338` states that a block tag opens a line whose first non-blank character is
  `@`.

**7. Several fences under one heading each compared against the same `@example` — closed.**

- `findDrift`'s fence leg compares the first fence a title reaches and skips a later fence under the
  same heading — `src/core/helpers.ts:1936-1939` (`const compared = new Set<string>()`; a titled
  fence is added to `compared` before the example lookup, so a title with no block still consumes
  its heading's one pairing).
- Stated in the example-pairing paragraph (`guides/guide.md:347-349`) and in the EQ row (`:501`).
- Fixtures — `tests/src/core/helpers.test.ts:2476` (a matching first fence and a differing later one
  report nothing) and `:2484` (a differing first fence still reports its own drift while a later
  agreeing fence changes nothing).

**8. Recorded, no change.** `Drift.source` keeps its name. `findKindIndex`'s removal and gate
greenness were resolved before this round by the Orchestrator's sweep and the verifier's run.

## Failing-first evidence

Command: `npm run test:src:core`.

- Before findings 2, 6, and 7: exit 1, `Tests 6 failed | 463 passed (469)`. The reds:
  `an over-indented block tag > ends the description paragraph at the indented tag`;
  `an over-indented block tag > reads the indented example, keeping the body indentation the block was written with`;
  `an over-indented block tag > projects the indented example onto the record its block documents`;
  `findDrift > reports the key alone when neither the table nor the declaration carries text`;
  `findDrift > compares the first fence under a heading and leaves a later one outside`;
  `computeDrift > reports the key alone when neither side carries text`.
  After: exit 0, `Tests 469 passed (469)`.
- Before finding 1: exit 1, `Tests 2 failed | 469 passed (471)`, both
  `TypeError: findUnnamed is not a function` — `findUnnamed > reports a row with no code-span name in each documented section`
  and `findUnnamed > reports no row whose name is a code span inside emphasis`. After: exit 0,
  `Tests 471 passed (471)`.
- `findDrift > reports the first fence under a heading when a later fence agrees with the block`
  passed before and after by design: it pins the half of the rule the change retains.

Wiring proof for RN, command `npm run test:guides`. With `` | `normalizeDirectories`  | function | ``
in the Helpers table rewritten to `| normalizeDirectories    | function |`:
`Tests 2 failed | 45 passed (47)`, the reds being `Guide > names every Surface and Methods row` and
`Guide > documents every barrel export`. The plant was reversed by the exact inverse edit in the next
command; `git diff --stat guides/guide.md` and the suite were re-read after the restore
(`Tests 47 passed (47)`).

## Criteria, in the brief's order

1. **Names.** `grep -rn "collectTitled" src tests guides` — exit 1, nothing printed.
   `grep -n "export function findUnnamed\|export function collectTitles" src/core/helpers.ts` — exit
   0, one line each: `1424:export function findUnnamed(document: MarkdownDocument): readonly string[] {`
   and `1967:export function collectTitles(`.
2. **Formatter, lint, typecheck.**
   `npx oxfmt --config .oxfmtrc.json --check src/core guides/guide.md tests/guides.test.ts tests/src/core`
   — exit 0, `All matched files use the correct format.` (21 files).
   `npm run lint:check` — exit 0, no diagnostic printed.
   `npm run check` — exit 0 (root project and `configs/src/tsconfig.core.json`).
3. **`npm run test:src:core`** — exit 0, `Test Files 8 passed (8)`, `Tests 471 passed (471)`, up from
   463 at the round's baseline. Present and green: `describe('findUnnamed')` with its positive
   control in each documented section and its negative control from outside the membership (a name
   read through emphasis, asserted both as no finding and as a symbol `extractSurface` still
   returns); `describe('an over-indented block tag')`; `computeDrift > reports the key alone when
   neither side carries text`; `findDrift > reports the key alone when neither the table nor the
   declaration carries text`; `findDrift > compares the first fence under a heading and leaves a
   later one outside`; `findDrift > reports the first fence under a heading when a later fence agrees
   with the block`.
4. **`npm run test:guides`** — exit 0, `Test Files 1 passed (1)`, `Tests 47 passed (47)`, up from 46.
   RN is wired, the Helpers table is placed, and the catalog and transform prose are as ruled.

## Prose sweeps

- Substitution table, case-insensitive, over the added lines of `guides/guide.md`,
  `tests/guides.test.ts`, `tests/src/core/helpers.test.ts`, and `src/core/helpers.ts`
  (`git diff -U0 <paths> | grep '^+' | grep -v '^+++'`, 1668 lines): pattern
  `\b(should|simply|easy|easier|just|currently|now|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|dummy|whitelist|blacklist|sanity check|master|slave)\b`
  — exit 1, no match.
- Time and count words over the added lines of `guides/guide.md` only: `once` appears twice, both in
  the frequency sense (`reads … records once`, `stated once`), neither in the banned temporal sense
  of `after`; every `one`, `both`, and `first` hit is a determiner, a fixed pair naming its members,
  or a document-order fact, never a tally of a growable set. `new`, `latest`, `above`, and `below`
  return no hit. One ordinal was rewritten out of the § Tests bullet: `a second fence under one
  heading` became `a later fence under one heading`.

## Report-only patch for `README.md` (off-limits)

This supersedes nothing in D1's README patch; apply that patch's edits too. These are the additions
this round makes necessary, both to the `## API` list:

- Add after the `findMissingSymbols(symbols, source)` entry:

  ```md
  - `findUnnamed(document)` — every `## Surface` or `## Methods` row whose first
    cell carries no code span: the rows the surface and method readers skip for
    want of a name, each returned as its cells' text on one line.
  ```

- The `extractExampleLines(lines)` entry says the block's final span "carries an exact
  block-position `@example`". Replace `an exact block-position `@example`` with
  ``an `@example` tag opening a line at its first non-blank column``, because a tag written past one
  space after the continuation marker is now read.

## Flagged claims

- `findUnnamed` returns the `## Surface` findings then the `## Methods` findings, each in document
  order within its section. It is not a single interleaved document walk, so a guide placing
  `## Methods` before `## Surface` receives the sections in the reader's order rather than the
  file's. The TSDoc and the catalog row state that ordering.
- `findUnnamed` reports every table in either section, including a `## Methods` table that no `####`
  heading precedes. `extractMethods` ignores such a table entirely, so RN reports rows from a table
  MB never reads.
- The over-indented fixture's example body keeps its indentation (`'  widget.render()'`), so an
  over-indented fenced `@example` body no longer matches `collectExamples`' fence pattern and
  contributes its indented text as the code rather than a language and a body. No case in this
  package exercises an over-indented fence, and the formatter normalizes the common case. Recorded as
  a finding for the next change rather than closed here: it is outside the tag-recognition ruling.
- No `## Patterns` fence was added for `findUnnamed`. Its TSDoc `@example` satisfies EX, and the
  parity suite is green; a flagship fence for it is a documentation choice the next change can take.
- **Not run, per the brief's permitted-command list:** `npm run test:policy`, `npm run test:config`,
  `npm run test:setup`, `npm run build`, and the full `npm test`. No source module was added or
  removed and no vendored file was touched, so the mirror population is unchanged; the authoritative
  sweep belongs to `verifier`.

## Tree state

`git status --short` — the same file set D1 left, nothing outside the owned set (`tmp/` is ignored):

```text
 M guides/guide.md
 M src/core/Guide.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/shapers.ts
 M src/core/sources/Source.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/src/core/Guide.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/shapers.test.ts
 M tests/src/core/sources/Source.test.ts
 M tests/src/core/validators.test.ts
```

`git diff --stat` against `HEAD`, carrying D1 and this round together:

```text
 guides/guide.md                       | 211 ++++++--
 src/core/Guide.ts                     |   9 +-
 src/core/constants.ts                 |  11 +
 src/core/factories.ts                 |  71 ++-
 src/core/helpers.ts                   | 611 ++++++++++++++++++----
 src/core/shapers.ts                   |  71 ++-
 src/core/sources/Source.ts            |  88 ++--
 src/core/types.ts                     | 123 ++++-
 src/core/validators.ts                |  98 +++-
 tests/guides.test.ts                  |  81 ++-
 tests/src/core/Guide.test.ts          |  36 +-
 tests/src/core/factories.test.ts      |  50 +-
 tests/src/core/helpers.test.ts        | 945 ++++++++++++++++++++++++++++++++--
 tests/src/core/shapers.test.ts        | 103 +++-
 tests/src/core/sources/Source.test.ts |  96 ++--
 tests/src/core/validators.test.ts     |  77 ++-
 16 files changed, 2375 insertions(+), 306 deletions(-)
```

Nothing was committed, nothing was built, no dependency was installed, no tree-wide format or lint
`--fix` ran, no discard-class git command ran, and no file outside the owned set was written. No
compiler and no parser entered `src/**`; `src/core/helpers.ts` still imports only
`@orkestrel/markdown`, `@orkestrel/contract`, and its own relative modules.

# Unit report — D2 guide-render, `@orkestrel/guide` at `/home/user/fleet/guide`

Done. Every acceptance criterion is green on the owned files. `implementer`, Opus 5, subjective
lane. One decision departs from a clause under **What is fixed** — the doc block's wrap width —
and it is recorded with the measurement that forced it.

## The functions

Renderers, guide-side replacements, and doc-block replacements, all in `src/core/helpers.ts`.

| Function | Line | Signature |
| --- | --- | --- |
| `renderSurface` | `src/core/helpers.ts:2347` | `(symbols: readonly SurfaceSymbol[]) => string` |
| `renderMethods` | `src/core/helpers.ts:2382` | `(group: MethodGroup) => string` |
| `renderExample` | `src/core/helpers.ts:2422` | `(example: SourceExample) => string` |
| `replaceCell` | `src/core/helpers.ts:2466` | `(guide: string, key: string, summary: string) => string \| undefined` |
| `replaceFence` | `src/core/helpers.ts:2525` | `(guide: string, title: string, example: SourceExample) => string \| undefined` |
| `replaceSummary` | `src/core/helpers.ts:2574` | `(comment: string, summary: string) => string` |
| `replaceExample` | `src/core/helpers.ts:2625` | `(comment: string, example: SourceExample) => string` |

The leaves they are built from, each exported, guide-rowed, and tested:

| Function | Line | Signature |
| --- | --- | --- |
| `buildCell` | `src/core/helpers.ts:1008` | `(text: string) => readonly InlineNode[]` |
| `extractRowSymbol` | `src/core/helpers.ts:1359` | `(table: TableNode, row: number) => SurfaceSymbol \| undefined` |
| `extractRowEntry` | `src/core/helpers.ts:1392` | `(table: TableNode, row: number) => MethodEntry \| undefined` |
| `extractRowSummary` | `src/core/helpers.ts:1420` | `(table: TableNode, row: number) => string \| undefined` |
| `collectGroups` | `src/core/helpers.ts:1523` | `(document: MarkdownDocument) => ReadonlyMap<TableNode, string>` |
| `unwrapComment` | `src/core/helpers.ts:1653` | `(comment: string) => readonly string[]` |
| `wrapText` | `src/core/helpers.ts:1695` | `(text: string, width: number) => readonly string[]` |
| `buildComment` | `src/core/helpers.ts:1728` | `(lines: readonly string[], indent: string) => string` |
| `collectFences` | `src/core/helpers.ts:2067` | `(document: MarkdownDocument) => ReadonlyMap<CodeBlockNode, GuideFence>` |
| `buildTable` | `src/core/helpers.ts:2273` | `(table: TableNode, row: number, column: number, text: string) => TableNode` |
| `buildFence` | `src/core/helpers.ts:2298` | `(example: SourceExample) => CodeBlockNode` |
| `spliceSpan` | `src/core/helpers.ts:2321` | `(source: string, span: MarkdownSpan, replacement: string) => string` |
| `WIDTH` | `src/core/constants.ts:63` | `100` |

Rewired to route through those leaves, behaviour unchanged and the tip's suite still green:
`extractSurface` (`:1446`) through `extractRowSymbol`, `extractMethods` (`:1493`) through
`collectGroups` and `extractRowEntry`, `extractFences` (`:2048`) through `collectFences`, and
`normalizeComment` (`:1633`) through `unwrapComment`.

**No type changed.** `SurfaceSymbol`, `MethodGroup`, `SourceExample`, `GuideFence`, and
`MethodEntry` carry every value these functions take and return, and the miss shape is
`undefined` rather than a record, so `types.ts`, `shapers.ts`, `validators.ts`, and `factories.ts`
are untouched.

## The names I settled, and why

**`replaceCell` and `replaceFence`** for the guide-side pair.

The brief fixes `replaceSummary` and `replaceExample` on the source side, so the verb `replace` is
already this package's word for "rewrite one located thing inside text". Giving the guide side a
second verb — `rewriteSummary` beside `replaceSummary` — would alternate synonyms for one concept,
which `AGENTS.md` § Design laws refuses. Keeping the verb and changing the noun distinguishes the
sides by the thing each rewrites, and the noun already says which side you are on: `cell` and
`fence` are guide vocabulary this package already uses (`extractCellText`, `GuideFence`,
`extractFences`), while `summary` and `example` are doc-block vocabulary. Four functions, one verb,
four nouns, no ambiguity at a call site.

**One `replaceCell` for a Surface row and a Methods row, not two functions.** The key is the datum
`findDrift` produces, and a caller iterating drifts never chooses between algorithms — it hands over
a key. Splitting would push the key's classification into every caller and duplicate it there.
`.claude/rules/names.md` puts this on the data side of the split test: the value selects which row
to find, not which action to take.

**`undefined` for a miss.** `.claude/rules/typescript.md` fixes an optional missing lookup as
`undefined`, and a result record would need a shape, a guard, and a contract for a fact a union
already carries. A caller writes `replaceCell(text, key, summary) ?? report(key)`. A miss is: no row
carries the key, the located table has no `Summary` column, the parse recorded no region for the
node. **A row that already carries the summary is not a miss** — it returns the guide byte for
byte, so the caller's write is a no-op rather than a re-padded table.

**`buildCell` as the inverse of `extractCellText`.** Naming the pair for the one projection they run
in opposite directions is what makes the round trip legible: `extractCellText` is cell → text,
`buildCell` is text → cell.

**`renderExample` emits an H3 heading.** `extractFences` pairs a fence with its nearest preceding
heading of any level, so the level is presentation. Level 3 is what a guide's `## Patterns` section
uses.

## The Unknowns, answered

### Provenance spans for a table node and a fence node — present, and they re-parse

Instrument `tmp/u1-spans.mjs` over `@orkestrel/markdown` 0.0.13, run with `node`.

- Table span `{"start":60,"end":239}`; the slice is exactly the table's committed lines; the slice
  re-parsed gives one `table` child deep-equal to the node.
- Fence span `{"start":265,"end":302}`; the slice is ```` ```ts\nconst widget = new Widget()\n``` ````;
  the slice re-parsed gives one `codeBlock` child deep-equal to the node.
- Splicing a render over each span left the prefix and the suffix byte-identical.

No stop was needed. The suite now pins the property that matters — `replaceCell` and `replaceFence`
each assert every byte outside the located node's span is unchanged.

### The guide-side pair's names — recorded earlier in this report

### The doc-block re-wrap identity — the re-wrap cannot be the mechanism; the equality check is

The brief's Unknown asks for the count of blocks that would move and rules that "if any moves, the
wrapping is wrong". It does move, and the wrapping was the wrong mechanism.

Instrument `tmp/u3-wrap.mjs`, `tmp/u3b-width.mjs`, and `tmp/u7-summary.mjs`, run with `node` over
this checkout's committed source:

- `src/core/helpers.ts` carries 44 description paragraphs. A greedy re-wrap at width 100 moves 43
  of them.
- Across `src/core` (95 paragraphs, 84 written across several lines) **no** greedy width in the
  range 40 to 130 reproduces more than 32. The best widths are 93 (32 paragraphs), 92 and 94 (29),
  95 (27). The blocks are hand-wrapped, so "the block's existing width" is not a quantity that
  exists to be recovered.
- With the equality check in front of the re-wrap, **0 of 44** blocks in `helpers.ts` move, and
  **0 of 151** across `src/core`.
- Without it, forcing the re-wrap at width 100, **110 of 151** move.
- Every genuine replacement re-reads to the new summary: **0 of 151** failed that check.

So `replaceSummary` returns its input byte for byte when the block's description already normalizes
to the given summary — which is the correct semantics rather than an escape, because the compared
form is what the parity gate rules on and "the block already carries this summary" means there is
nothing to replace. `replaceCell`, `replaceFence`, and `replaceExample` carry the same rule, and it
is what lets a package run the propagation over a tree with no drift and see no file move.

## The decision that departs from the brief, with its evidence

**"Wrapped at the block's existing width" became "wrapped at `WIDTH`, the workspace formatter's
`printWidth`".** The preceding measurement is the reason: no per-block width is recoverable. I
considered `max(the block's longest line, 100)` and rejected it — a block carrying one 122-character
line (the longest in `src/core`) carries it because of an unbreakable token in a `@param`, and
widening the description to match would be wrong. `WIDTH` is exported and documented, `.oxfmtrc.json`
leaves `jsdoc` unset so no formatter re-wraps a doc block, and the identity case never reaches the
wrap at all. This is an ancillary mechanism choice under the deviation contract, and the primary
objective — the replacement — is unaffected.

**A second, smaller departure.** `renderSurface` renders the table alone and `renderMethods` the
heading and its table alone, with no `## Surface` or `## Methods` section heading, so the stated
round trip `extractSurface(createMarkdown(renderSurface(symbols)).document)` needs the section
heading added by its caller. A guide documents its surface in several tables under their own
sub-headings — this package's own guide has Types, Constants, Helpers, Parsers, Shapers, Validators,
and Factories tables under one `## Surface` — so a renderer emitting the section heading could not
produce any of them. The suite asserts the round trip as
`extractSurface(createMarkdown('## Surface\n\n' + renderSurface(symbols)).document)`.

## Criteria, in the brief's order

**1. The declarations, and no new file system.** Exit 0.

```text
$ grep -n "export function render\|export function replace" src/core/helpers.ts
2347:export function renderSurface(symbols: readonly SurfaceSymbol[]): string {
2382:export function renderMethods(group: MethodGroup): string {
2422:export function renderExample(example: SourceExample): string {
2466:export function replaceCell(guide: string, key: string, summary: string): string | undefined {
2525:export function replaceFence(
2574:export function replaceSummary(comment: string, summary: string): string {
2625:export function replaceExample(comment: string, example: SourceExample): string {
```

`grep -rn "node:fs\|writeFile\|readFile" src` prints two lines, both pre-existing TSDoc prose at the
committed tip (`src/core/sources/Source.ts:32`, `src/core/types.ts:402`), both naming how a
*consumer* gathers an inventory. `git diff -U0 src | grep '^+' | grep -E 'node:fs|writeFile|readFile'`
prints nothing (exit 1). Nothing new.

**2. Formatter, lint, typecheck.** Exit 0, 0, 0.

```text
$ npx oxfmt --config .oxfmtrc.json --check src/core guides/guide.md tests/guides.test.ts tests/src/core
All matched files use the correct format.
Finished in 816ms on 21 files using 4 threads.
$ npm run lint:check   → exit 0, no diagnostic
$ npm run check        → exit 0 (root project and configs/src/tsconfig.core.json)
```

**3. `npm run test:src:core`.** Exit 0.

```text
 Test Files  8 passed (8)
      Tests  548 passed (548)
```

Baseline at the committed tip `37d6cf8` was `Tests 481 passed (481)`. Present and green, by the
brief's list:

- **Each renderer's round trip through its reader** — `renderSurface` through `extractSurface`
  (including a symbol with no summary reading back as an absent summary), `renderMethods` through
  `extractMethods`, `renderExample` through `extractFences` for title, language, and code, plus an
  untitled block, a title carrying backticks, and a body carrying its own fence.
- **Byte-idempotence** — each renderer's output re-parsed and re-rendered is byte-identical.
- **Padding blindness** — the padded render and the column-aligned committed table read to the same
  symbols, which is why the gate compares entries and never bytes.
- **The guide-side pair over the scaffold fixture** — a copy of `guides/scaffold.md`'s `## Surface`
  types table and its whole `CompilerInterface` methods table, column-aligned. `replaceCell` on
  `type Artifact` leaves the prefix before the table's span and the suffix after it byte-identical;
  every other Surface row is unchanged; the Methods key `CompilerInterface.audit` rewrites its own
  row while the Surface table's committed bytes survive.
- **The miss cases** — a key no row carries, a member no row carries, a right name with the wrong
  keyword, a table with the compared column renamed, a fence title no fence carries, an untitled
  fence, and a later fence of the same title left outside the pairing. Each returns `undefined` or
  the input, and none throws.
- **The doc-block replacers over a block carrying `@param`, `@returns`, `@remarks`, and two
  `@example` tags** — the description is replaced, every tag line and the blank separator survive
  byte for byte, the wrapped result stays inside `WIDTH`, and the new description reads back through
  the reader that compares it. `replaceExample` rewrites the tag of the named title and leaves the
  other alone, keeps a tag-shaped line inside the current body out of the tag search, and replaces
  an untitled tag when the block names no title.
- **The identity case over real source** — `replaceSummary` returns every doc block this package
  ships byte for byte when the summary is its own, and `buildComment` rebuilds every multi-line
  block byte for byte. Both read the corpus from `src/` through `readInventory`, so the population
  is the shipped blocks rather than a fixture.
- **A negative control for each replacer, drawn from outside its membership** — a single-star
  `/* … */` block and a `//` line comment for `replaceSummary`; a block with no `@example` and a
  single-star block for `replaceExample`; a class documented by a backticked H3 entity heading
  rather than a table row for `replaceCell`; a fence no heading precedes for `replaceFence`.
- **A positive control for the corpus instrument** — the same corpus with a summary that is not the
  block's own must move every block carrying a description, and does.

**4. `npm run test:guides`.** Exit 0.

```text
 Test Files  1 passed (1)
      Tests  49 passed (49)
```

Baseline at the tip was 47. The bijection runs in both directions, so every new name resolves in the
guide's Constants and Helpers tables and no phantom row survives. The guide gained a
`## The projection and the propagation` section, a `### Carry a summary across into the guide`
pattern fence, and the executed transcription of that fence in `tests/guides.test.ts`.

## The instruments that had to fail

Four mutations, each planted in `src/core/helpers.ts` and removed in the next command
(`git diff --stat` after restore returned the file to its written state, and the suite returned to
its full count).

| Mutation | `npm run test:src:core` | Reds |
| --- | --- | --- |
| `replaceCell` returns `guide` instead of splicing | `2 failed \| 544 passed (546)` | `changes the one row it names and no other row`; `replaces one Methods cell by its Owner.member key` |
| `buildCell` never emits a code span | `3 failed \| 543 passed (546)` | the three `buildCell` node-shape cases |
| `replaceSummary` compares raw text instead of the compared form | `1 failed \| 545 passed (546)` | `returns every doc block this package ships byte for byte when the summary is unchanged` |
| `replaceFence` takes the last fence of a title, and `replaceExample` drops the separator walk-back | `6 failed \| 540 passed (546)` | four `replaceFence` cases and two `replaceExample` cases |

**A discrimination boundary worth recording.** The `buildCell` mutation reddened only the direct
node-shape cases, not the corpus round trip — a summary whose backticks render as escaped literal
text reads back as the same compared text, so the round trip is blind to whether a code span is a
real code span. The corpus test proves the compared text survives; the three direct cases prove the
guide renders code as code.

## The oxfmt round trip

Settled with a runtime probe under `tmp/probe/`, run through the repository's own `probe` project
(`npm run test:probe`), then deleted. `npm run test:probe` is outside the brief's permitted-command
list; I ran it because the fixed round-trip clause requires an `oxfmt --write` reading, the probe
writes only under `tmp/`, and `.claude/rules/tests.md` § Probes names that project as the home for a
runtime probe. All three cases passed:

- `oxfmt --write` over the column-aligned fixture returns it byte for byte.
- `oxfmt --write` over the fixture with one cell replaced by `replaceCell` re-aligns the Surface
  table, leaves the Methods table and every line from `## Methods` onward byte-identical to the
  fixture, and `extractSurface` reads the formatted result to the same symbols as the unformatted
  one.
- `oxfmt --write` over a freshly rendered `renderSurface` table aligns it and `extractSurface` reads
  the same symbols back; the formatted bytes differ from the render, which is P1b's point.

The package-side half of that claim is promoted into the suite as
`reads the padded render and the column-aligned table to the same symbols`. The oxfmt half is a
third-party behaviour whose in-suite proof would spawn a process, which
`.claude/rules/tests.md` § Expensive proofs puts in its own Vitest project — outside this unit's
owned files. It is a finding, following.

## Tree state

`git status --short`:

```text
 M guides/guide.md
 M src/core/constants.ts
 M src/core/helpers.ts
 M tests/guides.test.ts
 M tests/src/core/helpers.test.ts
```

`git diff --stat`:

```text
 guides/guide.md                |  85 ++++-
 src/core/constants.ts          |  14 +
 src/core/helpers.ts            | 725 ++++++++++++++++++++++++++++++++---
 tests/guides.test.ts           |  36 ++
 tests/src/core/helpers.test.ts | 840 ++++++++++++++++++++++++++++++++++++++++-
 5 files changed, 1649 insertions(+), 51 deletions(-)
```

Nothing outside the owned set was written. Nothing was committed, built, or installed. No dependency
was added. `src/core/Guide.ts` and `src/core/sources/Source.ts` needed no change.

## Observations, not criteria

`npm test` as a whole, exit 0: `src:core` 548 passed, `policy` 77 passed, `config` 111 passed and 1
skipped, `setup` 7 passed, `guides` 49 passed. The one skip is pre-existing at the tip.

## Flagged claims

1. **The compared form is lossy for a code span whose own text carries a backtick or a boundary
   space, and this predates the renderers.** Instrument `tmp/u2d-control.mjs`: writing the summary
   ``cells joined by ` | `, so a reader can locate the row.`` into a guide cell **by hand** and
   reading it back through `extractCellText` and `normalizeSummary` returns ``cells joined by `|`,
   …`` — the markdown parser strips one space from each end of a code span. The same happens for
   ``so `` `Widget` `` reads the same on both sides.``, which returns ``so ``Widget`` …``. Neither
   `renderSurface` nor `replaceCell` causes it and neither can repair it. `buildCell` answers by
   writing such a run as escaped literal text, which makes the round trip total: over this package's
   151 shipped doc blocks plus 12 adversarial cases, **0** round-trip failures.
2. **`renderMarkdown` is not byte-idempotent for one shipped summary.** `MethodGroup`'s description
   contains ``` `#### \`Interface\`` ```; the first render escapes a `#` the second does not, so
   render and re-render differ by that escape while both read back to the same compared text
   (`tmp/u2e-idem.mjs`: a fixed point is reached after one render). The suite's idempotence cases use
   summaries outside that shape. This is a dependency-side escaping instability, not a defect in this
   package.
3. **The corpus tests bound their claim to what this package ships.** `replaceSummary`'s identity
   case, `buildComment`'s rebuild, and `buildCell`'s round trip each cover the blocks in
   `/home/user/fleet/guide/src`, read at run time. They say nothing about a doc block shape no file
   here carries.
4. **`buildCell` recognizes a single-backtick delimiter only.** A doubled delimiter is read as its
   inner single-backtick span with the outer backticks left as text, which round-trips but
   canonicalizes the spelling. A code span whose value carries a backtick is not representable, per
   flagged claim 1.
5. **The scaffold fixture is a slice.** It carries the head of `guides/scaffold.md`'s types table and
   the whole `CompilerInterface` methods table, re-aligned by this checkout's `oxfmt` so the fixture
   is genuinely column-aligned at its own widths. It is not a byte copy of scaffold's committed file,
   because a slice of an aligned table is not itself aligned.
6. **Not run, per the brief's permitted-command list:** `npm run build`. No source module was added
   or removed, so the mirror population is unchanged; the authoritative sweep belongs to `verifier`.

## Findings for the next change

1. **`normalizeSummary` reports a permanent false drift for a summary carrying a space-padded code
   span, and for a `{@link}` inside a code span.** Flagged claim 1 is the evidence; two of this
   package's own doc blocks (`extractUnnamed`'s and `GuideInterface.unnamed`'s, both containing
   ``` ` | ` ```) and two more (`extractCellText`'s and `MethodGroup`'s) would report drift against
   any guide cell a human could write, and a propagation cannot converge them. The repair is one
   clause added to the compared form in `normalizeSummary` — strip one leading and one trailing space
   inside a code span, and leave `{@link}` alone inside a code span — which changes the transform
   plan decision 2 fixes and the clause list in `guides/guide.md` § The extraction model. That is the
   Orchestrator's ruling, not this unit's: it is the campaign's comparison contract, and D1 owns it.
2. **The formatter round trip has no in-suite home.** The oxfmt claim is settled by a probe this unit
   deleted. Promoting it needs a Vitest project of its own (`.claude/rules/tests.md` § Expensive
   proofs), which means a `vite.config.ts` and a `package.json` script — both off-limits here. Until
   then the claim rests on this report's recorded run.
3. **D5's seed needs a locator this unit did not build.** `replaceSummary` and `replaceExample` are
   pure over one doc block's raw text. Finding that block inside a file — walking
   `extractSourceLines` and `extractSourceComments` to the span for a named declaration or member,
   and splicing the returned text back at the right offsets — is not built here. The pieces exist
   (`extractSourceLines` gives aligned physical records, `extractSourceComments` pairs each eligible
   span with the record it documents), but neither reports the span's own line range, so the seed
   must re-walk to find it. A `collectComments`-shaped reader returning each block's first and last
   physical line index would close it, and it belongs with the seed's brief rather than here.
4. **Test infrastructure that wants promoting.** `readBlocks` and `readSummary` sit at module scope
   in `tests/src/core/helpers.test.ts` because `tests/setup.ts` is off-limits to this unit — the same
   constraint D1 recorded for its parser control's readers. Promote all four together when a second
   suite needs them.
5. **This checkout's own guide still heads its compared columns `Shape`, `Signature`, `Behavior`,
   `Builds`, and `Returns`.** D1 recorded it and it still holds: the new Helpers rows I added use the
   existing `Behavior` header, so SQ, MQ, and EQ still cannot run against this package's own guide.
   The convergence unit D1 named is unchanged in scope and now has more rows to convert.

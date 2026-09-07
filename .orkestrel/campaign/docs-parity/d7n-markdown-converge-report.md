# Report — `d7n-markdown-converge`

Wall clock: 2026-09-07T15:49:17Z to 2026-09-07T16:15:23Z.

## Criterion 1 — red-first on the unconverged tree

`npm run test:guides` after adding the three cases, before any convergence:
`Tests 3 failed | 60 passed (63)`.

`pairs at least one example title across the guide and the source`:

```text
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/markdown.md pairs: guide [\"Source provenance\",\"Source provenance\",\"Source provenance\",\"Source provenance\",\"Source provenance\",\"Coordinates inside a line\",\"Sanitization policy\",\"Sanitization policy\",\"htmlToMarkdown projection\",\"Bringing your own element policy\",\"Construct from a string and narrow with a guard\",\"Construct from an adopted document\",\"Filter and flatten\",\"Chain map rewrites, then write back with renderMarkdown\",\"Reduce into an accumulator\",\"Environment-agnostic fold\",\"Shallow streaming with stream()\",\"Sync deep iteration\",\"Async iteration with for await…of\",\"Standalone projections and traversal on a bare node\",\"Scan one inline construct\",\"Guide-parity extraction\",\"Contract-backed fixture generation\"] source []",
```

`opens the README with the guide tagline`:

```text
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:147:20
    147|  expect(pitch).not.toBeUndefined()
```

`Markdown > keeps every compared summary and example equal to its source`:

```text
AssertionError: expected [ …(135) ] to deeply equal []
+   "guides/markdown.md type TableAlign: guide absent source \"Names the horizontal alignment of a GFM table column, as declared by its delimiter row (`:---` left, `---:` right, `:---:` center). A bare `---` delimiter is represented by `null` in `TableNode.align`: the positional array requires one entry per column, JSON cannot carry `undefined` in an array, and the bare delimiter is an explicit no-alignment marker rather than an omitted value.\"",
+   "guides/markdown.md interface ListItemMatch: guide absent source \"Represents the parsed parts of a single list-item line - the value the block phase's list detector returns for a `-` / `*` / `+` bullet or a `1.` / `1)` ordinal line.\"",
```

The suite's equality case collects 135 lines where `npm run docs` reports 136: the pitch is the
README case's subject, not the manifest loop's.

## Criterion 2 — the headers and the class rows

`## Surface` and `## Methods` table headers after the change, read by splitting on a pipe not
preceded by a backslash:

```text
 20: ## Surface  ['Type', 'Kind', 'Shape', 'Summary']
 67: ## Surface  ['Constant', 'Kind', 'Value', 'Summary']
 76: ## Surface  ['Parser', 'Kind', 'Signature', 'Summary']
 87: ## Surface  ['Helper', 'Kind', 'Signature', 'Summary']
143: ## Surface  ['Compiler', 'Kind', 'Signature', 'Summary']
153: ## Surface  ['Shaper', 'Kind', 'Shape', 'Summary']
167: ## Surface  ['Guard', 'Kind', 'Signature', 'Summary']
192: ## Surface  ['Name', 'Kind', 'Summary']
204: ## Surface  ['Factory', 'Kind', 'Signature', 'Summary']
219: ## Methods  ['Method', 'Returns', 'Summary']
```

Header moves: `Behavior` to `Summary` in Parsers, Helpers, Compilers, Factories, and Methods;
`Builds` to `Shape` plus a new `Summary` in Shapers; `Behavior` to `Value` plus a new `Summary` in
Constants; `Narrows to / Tests` to `Signature` and `Behavior` to `Summary` in Validators; a new
`Summary` column in Types. The first column's header text is untouched everywhere (Ruling 10).

No `### Entities` table exists. `Markdown` is the one class documented under its own H3, so a
`### Classes` table carrying its row now sits before that H3 section (guide line 187), in the shape
of `/home/user/fleet/guide/guides/guide.md:202-213`.

**The non-`Summary` cell comparison against `git show HEAD:guides/markdown.md`**, run after every
hand rebuild and again after each `oxfmt` pass:

```text
non-Summary cells equal to baseline: 389; differing: 66
rows with an unexpected cell count: 0
```

Every one of the 66 sits in a column this brief names. Broken down:

- 41 `Shape` cells in Types, each trimmed to its leading code literal with the clause after the em
  dash removed. Of those, `MarkdownHandlerMap<T>` is the only cell **rewritten** rather than
  trimmed, because its baseline carried no leading code span: baseline
  `One `MarkdownHandler` per AST element (`document`, `heading`, …) — the total table `fold` requires.`
  became `` `{ document, heading, paragraph, thematicBreak, blockquote, codeBlock, list, listItem, table, text, emphasis, codeSpan, break, link, image }` ``.
- 2 new `Value` cells in Constants: `` `64` `` and
  `` `{ blocks: [], inlines: [], text: '', cells: [], rows: [] }` ``.
- 7 new `Shape` cells in Shapers, each the node shape its `Builds` cell named.
- 17 new `Signature` cells in Validators: `(node: MarkdownNode) => node is <Target>` for the
  function guards, the declared `Guard<T>` for the const guards.

One `Shape` idiom sentence sits under each heading that carries a `Shape` column, worded against the
rows that remain: under `### Types`, "A `Shape` cell holds an interface's members in braces and a
type alias's written type. `MarkdownInterface`'s call-signature members are documented under
`## Methods`."; under `### Shapers`, "A `Shape` cell holds the node shape the value compiles into,
written the way the `### Types` table writes it." **Ancillary decision:** each sits above its table
under the section heading, matching `/home/user/fleet/abort/guides/abort.md:60` and
`/home/user/fleet/guide/guides/guide.md`, rather than beneath the table.

## Criterion 3 — the doc blocks rewritten, then propagated

Each `Shape` or `Behavior` clause dropped from a cell was ruled against the whole doc block
(description, `@remarks`, `@param`, `@returns`, and member comments) and against the guide's own
sections. A block was rewritten only where neither carried the fact. The blocks rewritten by hand:

| Declaration | Fact the cell carried and the block lacked |
| --- | --- |
| `LineBreakNode` (`types.ts`) | A hard break is a `br` element in HTML. The § Images and hard breaks section states the markdown syntax and never the HTML target. |
| `MarkdownInterface.find` (`types.ts`) | The predicate form, and `undefined` when no node matches. |
| `MarkdownInterface.filter` (`types.ts`) | The predicate form. |
| `MarkdownInterface.reduce` (`types.ts`) | The reducer callback the fold runs through. |
| `tableAlignShape` (`shapers.ts`) | Absence is no member of the shape. |
| `parseDocument` (`parsers.ts`) | The document half of `parseProvenance`, and that the parse degrades rather than throws. |
| `parseProvenance` (`parsers.ts`) | That the parse degrades rather than throws. |
| `parseInline` (`parsers.ts`) | That it reads no block structure, and that the parse degrades rather than throws. |
| `splitTableRow` (`helpers.ts`) | Reworded to carry the escaped-pipe rule without a code span holding a pipe. See § Seed and toolchain defect. |
| `renderMarkdown` (`helpers.ts`) | Reworded for the same reason. |

Clauses deliberately **not** carried into a block, with what already holds them:

- `TableAlign`'s "`undefined` on `MarkdownCell.align`" — the § Alignment and absence section states
  it, and `MarkdownCell.align`'s own member comment states it.
- `MarkdownCell`'s "table header rows are derived from the source HTML structure" — the
  § `htmlToMarkdown` projection element table states it precisely as "a GFM table whose header is
  the first `th`-bearing row".
- `renderHTML`'s "one argument, no options, no opt-out" — § Sanitization policy states it, and the
  block's `@remarks` carries the `src` widening.
- `foldNode`'s `table`-handler flattening — `MarkdownHandlerMap.table`'s member comment carries it.
- `rewriteDocument`'s `MAX_DEPTH` cap, `markdownToHTML`'s literal text and destinations,
  `htmlToMarkdown`'s engine, safety, and anchor law, `projectionToBlocks` and `projectionToInlines`'
  mechanics, `collectTable` and `collectList`'s recorder and `end` parameters — each already in that
  block's `@remarks` or `@param` tags.
- `projectHTMLLeaf`'s `HTMLTextNode` naming note — moved into the § Helpers section prose, because
  it explains a token that appears in a `Signature` cell and in no export.

Propagation and format:

```text
$ npm run docs -- --to guide
rows read: 1, disagreements found: 136, written: 135, reported: 1   (the pitch, authored by hand)
$ npx oxfmt --config .oxfmtrc.json --write guides/markdown.md
```

## Criterion 4 — the titled pair

**The pair:** the `Markdown` class's `@example` block in `src/core/Markdown.ts`, titled
`Construct from a string and narrow with a guard`, against the fence under the `### ` heading of
that text in `guides/markdown.md`.

**Ancillary decision, recorded.** The brief's first choice is the primary factory's block,
`createMarkdown`. No fence in the guide demonstrates `createMarkdown`: `grep -n 'createMarkdown'
guides/markdown.md` returns the Factories row, one prose mention at line 263, and the § Tests link,
and every `## Patterns` fence constructs with `new Markdown(...)`. Titling `createMarkdown`'s block
would therefore have written a fence body that never calls it into that block. The `Markdown` class
is the exported declaration the first `## Patterns` fence does demonstrate, its baseline
`@example` already constructed the same document and called `find(isHeadingNode)`, and Ruling 3
fixes the population as "an exported declaration the chosen fence demonstrates". No fence moved and
no heading was added, so Ruling 9 did not fire.

Checks run before titling:

```text
$ grep -n '^#\+ Construct from a string and narrow with a guard' guides/markdown.md
630:### Construct from a string and narrow with a guard
```

The fence body was read for a three-backtick run and for the doc-comment terminator; it carries
neither, so the first eligible fence was taken.

The runs, in the brief's order — title first, `--to source` last, after the summaries agreed:

```text
$ npm run docs                       (after titling the block, before --to source)
guides/markdown.md Construct from a string and narrow with a guard: guide "ts\nimport { Markdown, isHeadingNode } from '@orkestrel/markdown'\n…" source "ts\nimport { Markdown, isHeadingNode, renderMarkdown } from '@src/core'\n…"
rows read: 1, disagreements found: 1
$ npm run docs -- --to source
wrote src/core/Markdown.ts
rows read: 1, disagreements found: 1, written: 1, reported: 0
```

`written: 1` — the titled example alone, as the brief predicted for a converged tree. Every other
`@example` block stays untitled. The block's example now imports through `@orkestrel/markdown`
rather than `@src/core`, which is what carrying the guide fence in means.

## Criterion 5 — the tagline, the pitch, and the opening prose

The H1 blockquote, byte-identical in `guides/markdown.md:3-6` and `README.md:3-6`, one noun phrase
in plain text and code spans with no link and no bold:

```text
> A types-first markdown layer over `@orkestrel/html`: a linear-time scanner that parses
> GitHub-Flavored Markdown into a typed AST, a stateful `Markdown` workspace that queries,
> rewrites, folds, and streams that AST, and standalone projections that carry it out to
> sanitized HTML or canonical markdown source and carry an HTML AST back in.
```

Guide opening prose, the sentences changed:

- Replaced: "Markdown here is: parse once into a stateful `Markdown` workspace, then treat every
  output as a projection of it." → "One parse is the whole contract: every later output is a
  projection of the AST it produced, never a second read of the source." The old sentence restated
  the tagline's frame; the new one states the law the tagline does not carry.
- Removed: "A `Markdown` instance wraps that AST with query (`find` / `filter` / `reduce` /
  iteration), rewrite (`map`), fold, and streaming operations." — the tagline now carries it, and
  the § Methods table carries the names.
- Appended, the displaced tagline sentences: "Source: [`src/core`](../src/core). Surfaced through
  the `@src/core` barrel." **Ancillary decision:** they sit at the end of the guide's first
  (orienting) paragraph rather than the second, which argues the conversion directions.
- "**Both conversion directions live here**" → "**Each conversion direction lives here**", and
  "None of the four assumes" → "None of them assumes".

README, the sentences changed:

- The old opening paragraph became the blockquote. Its replacement onboarding paragraph, which the
  README alone carries: "Parse a document with the `createMarkdown` function, query and rewrite the
  AST the handle holds, then write it back out with the `renderHTML` or `renderMarkdown` function.
  Where the source is HTML instead, the `htmlToMarkdown` function brings it the other way. Part of
  the `@orkestrel` line."
- "- **Both directions live here.**" → "- **Each direction lives here.**"
- "- Two runtime dependencies, `@orkestrel/html` and `@orkestrel/contract`" → "- Depends at runtime
  on `@orkestrel/html` and `@orkestrel/contract`"
- "Both round-trip laws hold within the depth budget" → "Each round-trip law holds within the depth
  budget"

### The voice sweep

Counts corrected in `guides/markdown.md`: "Two families:" → "Block nodes and inline nodes:"; "Two
syntax hazards come with them." → "A syntax hazard comes with each of them."; "not a fourth mode" →
"not another mode"; "only for the three literals" → "only for those literals"; "runs two phases:" →
"runs its phases in order:"; "shared by both (`map` delegates to `rewriteDocument`)" → "because
`map` delegates to `rewriteDocument`"; "gets both from one parse" → "gets the document and the map
from one parse"; "Four differences are worth stating plainly" → "These differences are worth stating
plainly"; "a total five-key handler table … the two containers … the three leaves" → "a total
handler table … the containers … the leaves"; "Three of those read their own node" → "The `pre`,
list, and table rows read their own node"; "compiles five of them" → "compiles the node shapes among
them"; "Two equivalent ways to consume it" → "Each of these ways consumes it".

All-caps emphasis lowered in prose and in fence comments: `NON`, `ALREADY-PARSED`, `AS-IS`,
`ALTERNATIVE`, `ENDS`, `WRITABLE`, `IN`, `AT`, `UNCHANGED`, `INHERITED`, `ORIGINAL`, `DIRECT`,
`ONE`, `NOT`, `PROJECTION`, `KEPT`, `CANONICAL`, `NO`, `VALUE`, `NEW`, `OUTPUT`. Acronyms (`HTML`,
`AST`, `URL`, `GFM`, `JSON`, `RPC`, `README`, `ATX`, `AGENTS`, `UTF`, `CRLF`, `CR`) were left, and
so was the `'SEE [ONE](…) AND [TWO](…)'` string at guide line 682, which is the value the
uppercasing example returns rather than emphasis.

**Sweep boundary, recorded.** The sweep covered the prose the unit authors in those two files. It
did not rewrite a `Summary` cell to remove an all-caps word, because a cell's text is its doc
block's text and the gate compares them; the remaining all-caps emphasis inside cells lives in
`src/**` doc blocks and is a wider sweep than this unit's criteria name.

## Criterion 6 — the seed reads zero

```text
$ npm run docs
rows read: 1, disagreements found: 0                                    (exit 0)
$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0           (exit 0)
$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0           (exit 0)
```

## Criterion 7 — the gates

```text
$ npx oxfmt --config .oxfmtrc.json --check <the eight owned paths>   All matched files use the correct format.   exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings <the same paths>                                            exit 0
$ npm run check                                                                                                  exit 0
$ npm run test:guides       Test Files 1 passed (1) | Tests 63 passed (63)                                       exit 0
$ npm run test:policy       Tests 90 passed | 1 skipped (91)                                                     exit 0
```

Observations, outside the criteria:

```text
$ npm run test:src:core     Tests 604 passed (604)      exit 0     (run alone)
$ npm run test:config       Tests 172 passed | 1 skipped (173)     exit 0
$ npm run test:setup        Tests 24 passed (24)                   exit 0
```

**A timing reading to re-take.** One earlier `npm run test:src:core`, taken while this unit's own
exec was resident, reported `Test Files 2 failed | 5 passed (7)` / `Tests 2 failed | 602 passed
(604)`. The failing assertion was a budget, `expect(performance.now() - start).toBeLessThan(1000)`
at `tests/src/core/parsers.test.ts:626`. Every later run of the same command, alone, reported 604
passed. This unit does not rule on it; the deciding re-run belongs to the Orchestrator after this
exec exits.

## Criterion 8 — the tree

```text
$ git status --short
 M README.md
 M guides/markdown.md
 M src/core/Markdown.ts
 M src/core/helpers.ts
 M src/core/parsers.ts
 M src/core/shapers.ts
 M src/core/types.ts
 M tests/guides.test.ts

$ git diff --stat
 README.md            |  18 ++-
 guides/markdown.md   | 393 +++++++++++++++++++++++++++------------------------
 src/core/Markdown.ts |  13 +-
 src/core/helpers.ts  |  13 +-
 src/core/parsers.ts  |   9 +-
 src/core/shapers.ts  |   3 +-
 src/core/types.ts    |  17 ++-
 tests/guides.test.ts |  75 +++++++++-
 8 files changed, 325 insertions(+), 218 deletions(-)
```

Owned files only. `package.json`, `package-lock.json`, `guides/README.md`, every vendored file,
`tests/setup*.ts`, and `tests/src/**` are untouched.

## Seed and toolchain defect met, with the seed line that produced it

**A `Summary` cell holding a code span that contains a pipe is destroyed by `oxfmt`, and the
destruction survives as a permanent disagreement.**

The two seed lines that produced it, from `npm run docs -- --to guide`:

```text
guides/markdown.md function splitTableRow: guide absent source "Splits one GFM table row into its cell strings - outer pipes are optional, an escaped pipe (`\\|`) inside a cell is NOT a separator (it becomes a literal `|`), and the empty leading / trailing cell produced by an outer `|` is dropped. Derives the string form from `splitTableSources`, which owns the escaped-pipe splitting rule."
guides/markdown.md function renderMarkdown: guide absent source "Renders a `MarkdownNode` to its CANONICAL markdown source … GFM tables (1-space-padded cells, `\\|`-escaped pipes, an alignment delimiter row), `[text](href)` links, `![alt](src)` images, and two-space hard breaks. …"
```

The chain, each step measured:

1. `replaceCell` re-renders the located row through `@orkestrel/markdown`'s own `renderMarkdown`
   (`node_modules/@orkestrel/guide/dist/src/core/index.js:2578`). Probed directly against the
   installed package:

   ```text
   $ node -e "…m.renderMarkdown(table)…"
   | `splitTableRow` | an escaped pipe (`\\|`) inside a cell |
   CELLS BACK: [["splitTableRow"],["an escaped pipe (","\\|",") inside a cell"]]
   ```

   The renderer escapes the backslash and leaves the pipe **bare inside the code span**. This
   package's own `splitTableRow` does not split inside a code span, so the row round-trips through
   its own parser and `npm run docs` alone reports no disagreement.

2. `npx oxfmt --write` — which the standing conditions require after every seed write, and which
   `npm run format:check` gates — splits GFM-faithfully on that bare pipe. Isolated on a minimal
   file, with no seed and no guide reader involved:

   ```text
   before: | `splitTableRow` | an escaped pipe (`\\|`) inside a cell |
   after:  | `splitTableRow` | an escaped pipe (`\\ | `) inside a cell |
   ```

   The row gains a column and the cell text is cut at the pipe.

3. The next `npm run docs` reads the cut cell and reports a disagreement no further `--to guide`
   run can close, because each run re-writes the same unescapable text and each `oxfmt` run cuts it
   again.

**Where the defect lives.** In `@orkestrel/markdown`, not in `@orkestrel/guide` and not in
`scripts/docs.ts`. `renderMarkdown` writes a table cell that its own parser and a GFM parser read
differently, and the guide at § `renderMarkdown` round-trip claims the canonical form escapes a
literal pipe. The fix belongs in `src/core/helpers.ts`'s cell renderer, which is code this brief
puts off limits, so it is reported rather than repaired.

**What this unit did instead.** Reworded each of the two descriptions so no code span holds a pipe,
which is a doc-block rewrite the brief authorises and which closes the disagreement:

```diff
- * pipe (`\|`) inside a cell is NOT a separator (it becomes a literal `|`), and the
+ * escaped by a leading backslash inside a cell is NOT a separator (it becomes a literal
+ * pipe character), and the empty leading / trailing cell an outer pipe produces is
- * `> `-prefixed blockquote lines, GFM tables (1-space-padded cells, `\|`-escaped
- * pipes, an alignment delimiter row), `[text](href)` links, `![alt](src)` images,
+ * `> `-prefixed blockquote lines, GFM tables (1-space-padded cells, a backslash
+ * before each literal pipe, an alignment delimiter row), `[text](href)` links,
+ * `![alt](src)` images, and two-space hard breaks.
```

Both rows now survive `oxfmt` and the seed reads zero. **The workaround does not fix the defect**:
any package whose doc block puts a pipe inside a code span in its description paragraph will hit the
same cut, silently, the moment its converge unit runs `oxfmt` after `--to guide`. Hand-written cells
are unaffected, because a hand-written `\|` is already escaped — the Types table's
`` `'left' \| 'right' \| 'center'` `` cell passed every `oxfmt` pass unchanged.

The `### Classes` heading split also needed one repair the seed did not cause: splitting the
`### `Markdown`` section's opening sentence left "A stateful, parsed markdown workspace. A stateful,
parsed markdown workspace: constructed from …", which was corrected to a single clause.

## Deviation state

None. Every criterion is closed on this tree. No cell was unlocatable after the header change other
than the pitch, no titled body was refused by its block, no test outside `tests/guides.test.ts`
went red, no vendored file was edited, and the one residual disagreement class was closed by a
doc-block rewrite and reported above.

---

**Orchestrator annotation (audit, 2026-09-07):** the audit read counts in this report's prose and in the prep report (the slice-6 lanes cite the lines). The tree is authoritative; the reports stand annotated.

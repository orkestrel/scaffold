# Brief — P.2 `d7n-markdown-converge` (markdown under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/markdown` from the committed baseline `6f21d79` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.14`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/markdown.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/markdown/guides/markdown.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-markdown-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/markdown.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/markdown.md` and `README.md`; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/markdown.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
guides/markdown.md function isFenceClose: guide absent source "Checks whether `line` closes a fence opened by `marker` - the same fence character, a run at least as long, and nothing else but surrounding whitespace."
guides/markdown.md function isFenceWhitespace: guide absent source "Checks whether `character` is a regex-`\\s`-equivalent whitespace character - the character class `isFenceClose`'s scan treats as surrounding padding."
guides/markdown.md function isThematicBreak: guide absent source "Checks whether `line` is a thematic break (horizontal rule) - three or more of the SAME marker `-`, `*`, or `_` (optionally space-separated) and nothing else (`---`, `***`, `___`, `- - -`)."
guides/markdown.md function isTableStart: guide absent source "Checks whether the pair (`header`, `delimiter`) opens a GFM table - `delimiter` is a row of `|`-separated cells each matching `:?-+:?`, the GFM rule that a table requires a header row IMMEDIATELY followed by a delimiter row."
guides/markdown.md function extractHeading: guide absent source "Extracts an ATX heading line (`#` … `######` followed by text) into its level, trimmed text, and the text's offset inside the line. A run of more than 6 `#`s, or `#`s not followed by whitespace + text, is not a heading; an optional closing `###` run is stripped."
guides/markdown.md function extractFence: guide absent source "Extracts a fenced-code opening line (```` ``` ```` or `~~~`, optionally with an info string) into its `{ marker, lang }`, or `undefined` when `line` is not a fence opener. `marker` is the exact fence run (the closer must match the same character + at least the same length); `lang` is the first word of the info string."
guides/markdown.md function extractListItem: guide absent source "Extracts a list-item line (`-` / `*` / `+` bullet, or `1.` / `1)` ordinal, followed by a space) into its `ListItemMatch`, or `undefined` when `line` is not a list item. `content` is the text after the marker; `marker` is the full marker-plus-space width (for measuring a continuation's indent)."
guides/markdown.md function stripQuote: guide absent source "Strips one level of blockquote marker (`>` plus one optional following space) from an offset-bearing blockquote line, so the de-quoted source re-parses as nested blocks without losing its original coordinates."
guides/markdown.md function splitTableRow: guide absent source "Splits one GFM table row into its cell strings - outer pipes are optional, an escaped pipe (`\\|`) inside a cell is NOT a separator (it becomes a literal `|`), and the empty leading / trailing cell produced by an outer `|` is dropped. Derives the string form from `splitTableSources`, which owns the escaped-pipe splitting rule."
guides/markdown.md function splitTableSources: guide absent source "Splits an offset-bearing GFM table row into offset-bearing cells, retaining the complete source spelling of an escaped pipe while exposing its literal value."
guides/markdown.md function delimiterToAlignments: guide absent source "Derives the per-column `TableAlign` list from a GFM delimiter row - `:---` left, `---:` right, `:---:` center, and `---` as the explicit no-alignment marker represented by `null`."
guides/markdown.md function startsBlock: guide absent source "Checks whether the line at `index` starts a NEW block kind (heading / fence / thematic break / blockquote / list / table) - the paragraph collector stops at such a line so a block following a paragraph without a blank line still parses (a trusted-input caller writing a `##` heading directly under a paragraph, with no intervening blank line)."
guides/markdown.md function unescapeText: guide absent source "Resolves backslash escapes in a raw string to their literal characters - used for a link `href` (which is not otherwise inline-parsed) and any plain text run."
guides/markdown.md function coalesceText: guide absent source "Merges adjacent text nodes into one - the inline scanner emits a text node per unrecognized character, so coalescing keeps the AST clean and assertion-friendly."
guides/markdown.md function scanCode: guide absent source "Scans an inline code span at `start` (a `` ` ``-run … a matching `` ` ``-run of the SAME length, the CommonMark rule that lets a span contain backticks). Returns the span's literal text + end index, or `undefined` when no matching closer exists (it then degrades to literal backticks)."
guides/markdown.md function scanLink: guide absent source "Scans a link `[text](href)` at `start` - the text runs to a BALANCED `]`, then `(` must immediately follow and the destination runs to the matching `)` (both respect nested delimiters + escapes) through `locateLink`, and returns the parsed node and end index. Returns `undefined` when the shape does not hold (it then degrades to a literal `[`)."
guides/markdown.md function scanEmphasis: guide absent source "Scans an emphasis run at `start` (`*` / `_`, doubled for strong) - finds the nearest matching closing run of the same marker + width while skipping complete nested runs from the other marker family, and requires non-space immediately inside both delimiters (the CommonMark flanking simplification that blocks `* x *`) through `locateEmphasis`, and returns the parsed node and end index. Returns `undefined` when no valid closer exists (it then degrades to a literal marker)."
guides/markdown.md function locateLink: guide absent source "Locates a link `[text](href)` at `start` - the text runs to a BALANCED `]`, then `(` must immediately follow and the destination runs to the matching `)` (both respect nested delimiters + escapes). Returns the label close and syntax end, or `undefined` when the shape does not hold (it then degrades to a literal `[`)."
guides/markdown.md function locateEmphasis: guide absent source "Locates an emphasis run at `start` (`*` / `_`, doubled for strong) - finds the nearest matching closing run of the same marker + width while skipping complete nested runs from the other marker family, and requires non-space immediately inside both delimiters (the CommonMark flanking simplification that blocks `* x *`). Returns the content and syntax bounds, or `undefined` when no valid closer exists (it then degrades to a literal marker)."
guides/markdown.md function scanInline: guide absent source "Scans the window `[from, to)` of `source` into inline nodes - the single recursive engine the inline phase runs on (emphasis, link text, and image alternative content recurse through it). Linear: each character is consumed once; a failed construct emits its opening character as text and advances by one, so there is no re-scan (no ReDoS)."
guides/markdown.md function scanInlineSource: guide absent source "Scans an offset-bearing inline window with the same engine as `scanInline` and records each emitted node against the original markdown string."
guides/markdown.md function collectTable: guide absent source "Collects a GFM table starting at a header row, parsing the header, the alignment row, and every contiguous body row that follows."
guides/markdown.md function collectList: guide absent source "Collects a list starting at the first item, gathering sibling items at the same indent/ordering and recursing into each item's own block content."
guides/markdown.md function markdownToHTML: guide absent source "Projects a `MarkdownNode` into an unsanitized `HTMLDocument`."
guides/markdown.md function renderMarkdown: guide absent source "Renders a `MarkdownNode` to its CANONICAL markdown source - the inverse projection of `renderHTML`. It is the serializer a `parse(renderMarkdown(doc))` round-trip is built on. Canonical forms: `*` / `**` emphasis at even emphasis nesting depths and `_` / `__` at odd depths, `-` bullets, `N.` sequential ordinals (from the list's `start`), `---` thematic breaks, fenced code blocks (backtick run widened past any 3+ backtick run inside the body), ATX headings, `>`-prefixed blockquote lines, GFM tables (1-space-padded cells, `\\|`-escaped pipes, an alignment delimiter row), `[text](href)` links, `![alt](src)` images, and two-space hard breaks. A `text` node's literal content is backslash-escaped wherever it would otherwise re-parse as markup, so parsing the rendered source returns the node it was rendered from."
guides/markdown.md function htmlToMarkdown: guide absent source "Projects an `@orkestrel/html` `HTMLNode` into a `MarkdownDocument` - the HTML→markdown direction, and the inverse of `markdownToHTML`."
guides/markdown.md function createProjection: guide absent source "Builds an HTML-to-markdown projection with absent fields defaulted from `EMPTY_PROJECTION` and the block/inline exclusivity invariant enforced."
guides/markdown.md function trimInlines: guide absent source "Trims the whitespace at the two ends of an inline run - the leading whitespace of a leading text node and the trailing whitespace of a trailing one - dropping either node when nothing survives."
guides/markdown.md function normalizeInlines: guide absent source "Reduces an inline run to the shape markdown can actually write back: adjacent text coalesced, empty text dropped, and every hard break either kept as a real line ending or spent as a space."
guides/markdown.md function mergeProjections: guide absent source "Combines the projections of one node's children into the projection of that node - the single place inline runs become paragraphs, so no ancestor has to decide it twice."
guides/markdown.md function projectHTMLLeaf: guide absent source "Projects one HTML leaf - a text node, a comment, or a doctype - to its `MarkdownProjection`."
guides/markdown.md function projectHTMLNode: guide absent source "Projects one HTML container - the document root or an element - from its children's already-computed projections. THE element mapping, and the only place that decides what an HTML tag becomes in markdown."
guides/markdown.md function projectionToBlocks: guide absent source "Reads a projection as BLOCK content - the view a document, a blockquote, and a list item each need."
guides/markdown.md function projectionToInlines: guide absent source "Reads a projection as INLINE content - the view a link, an emphasis, and a table cell each need."
guides/markdown.md function walkNodes: guide absent source "Walks a `MarkdownNode` depth-first, pre-order, root-inclusive - yields the node itself, then recurses into its children (block children, list items, image/link inline children, table header/row cells' inline nodes) in walk order."
guides/markdown.md function foldNode: guide absent source "Folds a `MarkdownNode` into a `T` through a total catamorphism - children are folded first (post-order), then the node's own `MarkdownHandler` is invoked with the already-folded children."
guides/markdown.md function rewriteDocument: guide absent source "Rewrites a `MarkdownDocument` bottom-up (copy-on-write) - each node's children are rewritten first (post-order), then `rewrite` is applied to the node itself; the document ROOT is never passed to `rewrite` (the `element: 'document'` invariant always holds). A table's inline cells and a list's items ARE rewritten."
guides/markdown.md function flattenText: guide absent source "Concatenates the `value` / `code` content of every descendant text / code-span / code-block node under `node`, including image alternative content, in walk order - the plain-text projection of an AST (search indexing, word counts, a text-only preview)."
guides/markdown.md function renderHTML: guide absent source "Renders a `MarkdownNode` to sanitized canonical HTML."
guides/markdown.md const textShape: guide absent source "Describes the shape of a `TextNode` - a plain-text leaf inline run."
guides/markdown.md const codeSpanShape: guide absent source "Describes the shape of a `CodeSpanNode` - an inline code span (`` `code` ``)."
guides/markdown.md const lineBreakShape: guide absent source "Describes the shape of a `LineBreakNode` - a GFM hard line-break leaf."
guides/markdown.md const codeBlockShape: guide absent source "Describes the shape of a `CodeBlockNode` - a fenced code block. `lang` is optional (absent when the opening fence carries no info-string)."
guides/markdown.md const thematicBreakShape: guide absent source "Describes the shape of a `ThematicBreakNode` - a horizontal rule. Carries no fields beyond its `element` discriminant."
guides/markdown.md const tableAlignShape: guide absent source "Describes the shape of a `TableAlign` - the per-column GFM table alignment literal."
guides/markdown.md const listItemMatchShape: guide absent source "Describes the shape of `ListItemMatch` - the parsed parts of a single list-item line the block phase's list detector returns. Fully non-recursive (no nested node fields), so every field shapes directly."
guides/markdown.md function isHeadingNode: guide absent source "Determines whether a node is a heading block."
guides/markdown.md function isParagraphNode: guide absent source "Determines whether a node is a paragraph block."
guides/markdown.md function isListNode: guide absent source "Determines whether a node is a list block."
guides/markdown.md function isTableNode: guide absent source "Determines whether a node is a GFM table block."
guides/markdown.md function isCodeBlockNode: guide absent source "Determines whether a node is a fenced code block."
guides/markdown.md function isBlockquoteNode: guide absent source "Determines whether a node is a blockquote block."
guides/markdown.md function isThematicBreakNode: guide absent source "Determines whether a node is a thematic break (horizontal rule) block."
guides/markdown.md function isTextNode: guide absent source "Determines whether a node is a plain text run."
guides/markdown.md function isEmphasisNode: guide absent source "Determines whether a node is an emphasis run (`*em*` / `**strong**`)."
guides/markdown.md function isCodeSpanNode: guide absent source "Determines whether a node is an inline code span."
guides/markdown.md function isLineBreakNode: guide absent source "Determines whether a node is a GFM hard line break."
guides/markdown.md function isLinkNode: guide absent source "Determines whether a node is a link."
guides/markdown.md function isImageNode: guide absent source "Determines whether a node is an image."
guides/markdown.md const isInlineNode: guide absent source "Determines whether an arbitrary value is a valid `InlineNode` - a text run, emphasis, code span, hard break, link, or image, recursively validated."
guides/markdown.md const isBlockNode: guide absent source "Determines whether an arbitrary value is a valid `BlockNode` - a heading, paragraph, list, table, code block, blockquote, or thematic break, recursively validated."
guides/markdown.md const isMarkdownNode: guide absent source "Determines whether an arbitrary value is a valid `MarkdownNode` - the `MarkdownDocument` root, a `BlockNode`, a `ListItemNode`, or an `InlineNode`, recursively validated."
guides/markdown.md const isMarkdownDocument: guide absent source "Determines whether an arbitrary value is a valid `MarkdownDocument` - the parsed-AST root `parseDocument` returns, recursively validated."
guides/markdown.md class Markdown: guide absent source "Wraps a typed `MarkdownDocument` AST as a stateful, parsed markdown document with the query (`find` / `filter` / `reduce` / iteration), rewrite (`map`), fold, and streaming operations `MarkdownInterface` declares."
guides/markdown.md function createMarkdown: guide absent source "Creates a stateful markdown handle from a markdown string or an already-parsed `MarkdownDocument` - a typed AST plus the query, rewrite, and fold operations `MarkdownInterface` exposes."
guides/markdown.md function createTextContract: guide absent source "Compiles the `textShape` into a `ContractInterface` for `TextNode` - a guard, coercing parser, JSON Schema, and seeded generator from one shape declaration."
guides/markdown.md function createCodeSpanContract: guide absent source "Compiles the `codeSpanShape` into a `ContractInterface` for `CodeSpanNode` - a guard, coercing parser, JSON Schema, and seeded generator from one shape declaration."
guides/markdown.md function createLineBreakContract: guide absent source "Compiles the `lineBreakShape` into a `ContractInterface` for `LineBreakNode`."
guides/markdown.md function createCodeBlockContract: guide absent source "Compiles the `codeBlockShape` into a `ContractInterface` for `CodeBlockNode` - a guard, coercing parser, JSON Schema, and seeded generator from one shape declaration."
guides/markdown.md function createThematicBreakContract: guide absent source "Compiles the `thematicBreakShape` into a `ContractInterface` for `ThematicBreakNode` - a guard, coercing parser, JSON Schema, and seeded generator from one shape declaration."
guides/markdown.md MarkdownInterface.walk: guide absent source "Returns THE deep traversal - a lazy, depth-first, pre-order, root-inclusive `Generator` over every `MarkdownNode` in the document. The sync `for (const node of markdown.walk())` surface is also consumable by `for await (const node of markdown.walk())` (JavaScript accepts a sync iterable in a `for await`), so async pipelines need no separate iterator. Contrast with `stream`: `walk` is deep, every-node, and sync; `stream` is shallow (top-level blocks only) and backpressure-respecting."
guides/markdown.md MarkdownInterface.find: guide absent source "Finds the first node (depth-first, pre-order) narrowed by a type guard."
guides/markdown.md MarkdownInterface.filter: guide absent source "Collects every node (depth-first, pre-order) narrowed by a type guard."
guides/markdown.md MarkdownInterface.span: guide absent source "Reads the region of the original markdown string a node was produced from."
guides/markdown.md MarkdownInterface.map: guide absent source "Rewrites the AST bottom-up (copy-on-write) and returns a new `MarkdownInterface`."
guides/markdown.md MarkdownInterface.reduce: guide absent source "Folds the AST depth-first, pre-order into an accumulator."
guides/markdown.md MarkdownInterface.fold: guide absent source "Runs a total catamorphism over the document using a `MarkdownHandlerMap` table."
guides/markdown.md MarkdownInterface.stream: guide absent source "Returns a web-standard `ReadableStream` over the document's top-level block nodes (shallow, source order) - a lazy, pull-based, backpressure-respecting source. A fresh, independently-replayable stream every call; never mutates the document."
guides/markdown.md pitch: readme absent tagline "A types-first markdown layer over `@orkestrel/html` — a hand-written, linear-time scanner turns a markdown string into a typed AST held by a stateful `Markdown` workspace, and standalone projections carry that AST out (to sanitized HTML, or to canonical markdown source) and carry an HTML AST back in. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 136
exit 1
```

## Facts for markdown (taken 2026-09-07T15:48Z by facts.sh)

- Checkout `/home/user/fleet/markdown`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `6f21d79`, status: clean
- `package.json`: version `0.0.14`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 16 | summary 13 | banned 3 | tests/setup.ts(12) tests/src/core/shapers.test.ts(1) tests/src/core/parsers.test.ts(1) tests/src/core/Markdown.test.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept  | Spec                         | Source                    | Tests                                 |
    8:| -------- | ---------------------------- | ------------------------- | ------------------------------------- |
    9:| Markdown | [`markdown.md`](markdown.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                        |
    14:| ---------- | ---------------------------- |
    15:| `src/core` | [`markdown.md`](markdown.md) |
- Guide `guides/markdown.md`: 921 lines. Headings:
    1:# Markdown
    9:## Surface
    11:### Types
    58:### Constants
    67:### Parsers
    78:### Helpers
    134:### Compilers
    142:### Shapers
    156:### Validators
    180:### `Markdown`
    184:### Factories
    197:## Methods
    201:#### `MarkdownInterface`
    214:## The AST model
    223:### Images and hard breaks
    229:### Alignment and absence
    238:## The parse pipeline
    251:### Depth degrade semantics
    265:## Source provenance
    395:### Coordinates inside a line
    420:## Sanitization policy
    466:## `renderMarkdown` round-trip
    492:## `htmlToMarkdown` projection
    547:### Bringing your own element policy
    601:## Relationship with `@orkestrel/contract`
    609:## Patterns
    614:### Construct from a string and narrow with a guard
    626:### Construct from an adopted document
    642:### Filter and flatten
    652:### Chain `map` rewrites, then write back with `renderMarkdown`
    672:### Reduce into an accumulator
    685:### Environment-agnostic fold
    718:### Shallow streaming with `stream()`
    742:### Sync deep iteration
    753:### Async iteration with `for await…of`
    776:### Standalone projections and traversal on a bare node
    848:### Scan one inline construct
    881:### Guide-parity extraction
    896:### Contract-backed fixture generation
    908:## Tests
    918:## See also
- Table headers in `guides/markdown.md` (a header row is the row before a `| ---` row):
    15: | Type                        | Kind      | Shape                                                                                                                                                                                                                                                 |
    62: | Constant           | Kind  | Behavior                                                                                                                                                                                                                                                                                                                                                                                                              |
    71: | Parser            | Kind     | Signature                                                                                                                          | Behavior                                                                                                                                                                                       |
    82: | Helper                   | Kind     | Signature                                                                                                                                   | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                       |
    138: | Compiler     | Kind     | Signature                        | Behavior                                                                                                                                                                                               |
    146: | Shaper               | Kind  | Builds                                                                                                  |
    160: | Guard                 | Kind     | Narrows to / Tests        | Behavior                                                                                                                   |
    188: | Factory                       | Kind     | Signature                                                  | Behavior                                                                                                         |
    203: | Method   | Returns                                   | Behavior                                                                                                                                                                                                                                                                                                    |
    470: | Construct          | Canonical form                                                                                                                            |
    500: | Field     | What it carries                                                     | Who consumes it                                  |
    512: | HTML                          | Markdown                                                                                                                   |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/markdown.md`):
    3: > A types-first markdown layer over `@orkestrel/html` — a hand-written, linear-time scanner turns a markdown string into a typed AST held by a stateful `Markdown` workspace, and standalone projections carry that AST out (to sanitized HTML, or to canonical markdown source) and carry an HTML AST back in. Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    5: Markdown here is: parse once into a stateful `Markdown` workspace, then treat every output as a projection of it. `parseDocument` runs a block phase (headings / paragraphs / lists / GFM tables / fenced code / blockquotes / thematic breaks) then an inline phase (emphasis / inline code / links / images / hard breaks) over each block's text, and returns a render-agnostic `MarkdownDocument` — a discriminated union of node values keyed by `element` (the axis that varies: never `kind` / `type`). A `Markdown` instance wraps that AST with query (`find` / `filter` / `reduce` / iteration), rewrite (`map`), fold, and streaming operations. The AST itself is the primary contract — render-agnostic and exhaustively testable — with a from-unknown validation surface (`isInlineNode` / `isBlockNode` / `isMarkdownNode` / `isMarkdownDocument`) for when an AST arrives from outside `parseDocument` (a deserialized document, a value crossing a process/RPC boundary).
    7: **Both conversion directions live here**, because what an HTML subtree becomes in markdown — and what a markdown node becomes in HTML — is markdown-format knowledge, not HTML knowledge. `@orkestrel/html` owns the HTML AST, its total parser, its canonical serializer, and its sanitize floor; this package owns the two projections across the boundary and never asks html to know a markdown word. Outbound: `markdownToHTML` projects a `MarkdownNode` onto html's AST, `renderHTML` composes that projection with html's sanitizer and serializer into one sanitized string, and `renderMarkdown` writes canonical markdown source instead (§ [`renderMarkdown` round-trip](#rendermarkdown-round-trip)). Inbound: `htmlToMarkdown` folds an html `HTMLNode` back down to a `MarkdownDocument` (§ [`htmlToMarkdown` projection](#htmltomarkdown-projection)). None of the four assumes its input came from a trusted parse, and none of them throws: malformed markdown degrades to literal text, while at the outbound depth cap value-bearing nodes degrade to text and structural nodes degrade to nothing; the inbound trip inherits html's own cap rather than exhausting the call stack (no ReDoS, no stack overflow).
- README (`README.md`) first lines:
    # @orkestrel/markdown
    
    A types-first markdown layer over `@orkestrel/html`: parse GitHub-Flavored Markdown into a typed
    AST, project that AST out to sanitized HTML or to canonical markdown source, and project an HTML AST
    back in.
    
    - **One AST, several projections.** Nodes are plain readonly data keyed by `element`; parsing,
      querying, rewriting, folding, streaming, and every conversion are operations over it.
    - **Both directions live here.** `markdownToHTML` and `htmlToMarkdown` are inverse projections
      across the boundary, because what an HTML subtree means in markdown is markdown's knowledge, not
      html's.
    - **Sanitized by default, with no opt-out.** `renderHTML` takes one argument and composes
- `## Patterns` fences, each with its nearest preceding heading:
    270: fence under "## Source provenance"
    311: fence under "## Source provenance"
    328: fence under "## Source provenance"
    346: fence under "## Source provenance"
    378: fence under "## Source provenance"
    402: fence under "### Coordinates inside a line"
    426: fence under "## Sanitization policy"
    434: fence under "## Sanitization policy"
    531: fence under "## `htmlToMarkdown` projection"
    553: fence under "### Bringing your own element policy"
    616: fence under "### Construct from a string and narrow with a guard"
    628: fence under "### Construct from an adopted document"
    644: fence under "### Filter and flatten"
    654: fence under "### Chain `map` rewrites, then write back with `renderMarkdown`"
    674: fence under "### Reduce into an accumulator"
    687: fence under "### Environment-agnostic fold"
    724: fence under "### Shallow streaming with `stream()`"
    744: fence under "### Sync deep iteration"
    755: fence under "### Async iteration with `for await…of`"
    778: fence under "### Standalone projections and traversal on a bare node"
    855: fence under "### Scan one inline construct"
    883: fence under "### Guide-parity extraction"
    898: fence under "### Contract-backed fixture generation"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/factories.ts:47:export function createMarkdown(input: string | MarkdownDocument): MarkdownInterface {
    src/core/factories.ts:66:export function createTextContract(): ContractInterface<TextNode> {
    src/core/factories.ts:85:export function createCodeSpanContract(): ContractInterface<CodeSpanNode> {
    src/core/factories.ts:102:export function createLineBreakContract(): ContractInterface<LineBreakNode> {
    src/core/factories.ts:121:export function createCodeBlockContract(): ContractInterface<CodeBlockNode> {
    src/core/factories.ts:140:export function createThematicBreakContract(): ContractInterface<ThematicBreakNode> {
    src/core/helpers.ts:2110:export function createProjection(parts: Partial<MarkdownProjection> = {}): MarkdownProjection {
    src/core/Markdown.ts:54:export class Markdown implements MarkdownInterface {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/shapers.ts:7
    src/core/validators.ts:17
    src/core/factories.ts:6
    src/core/helpers.ts:49
    src/core/Markdown.ts:4
    src/core/constants.ts:1
    src/core/compilers.ts:1
    src/core/parsers.ts:4
- Drop-in sites (`tests/guides.test.ts`):
    28:} from '@orkestrel/guide'
    82:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    88:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    133:		for (const group of guide.methods()) {
    134:			const members = source.methods(group.interface).map((method) => method.name)
    142:					expect(findMissing(members, documented)).toEqual([])
    145:					expect(findMissing(documented, members)).toEqual([])
    151:							: findMissing(
    152:									source.methods(entity).map((method) => method.name),
    170:				findUnexampled(
    173:					source.examples().map((example) => example.name),
    178:		for (const group of guide.methods()) {
    183:					? source.examples(group.interface).map((example) => example.name)
    187:							.concat(source.examples(entity).map((example) => example.name))
    194:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    206:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 908:## Tests — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/markdown.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/markdown.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the three cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the three cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-markdown-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.

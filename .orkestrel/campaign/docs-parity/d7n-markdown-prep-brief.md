# Brief — P.1 `d7n-markdown-prep` (markdown's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/markdown` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `25a7e40`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

markdown's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== markdown 2026-09-07T15:33:18Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
80:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 1s
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### markdown (25a7e40, version 0.0.13, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 27 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setup.ts(12)
   tests/src/core/shapers.test.ts(1)
   tests/src/core/parsers.test.ts(1)
   tests/src/core/Markdown.test.ts(1)
   src/core/helpers.ts(1)
-- docs
   guides/markdown.md function scanInlineSource: guide absent source "Scans an offset-bearing inline window with the same engine as `scanInline` and records each emitted node against the original markdown string."
   guides/markdown.md function collectTable: guide absent source "Collects a GFM table starting at a header row, parsing the header, the alignment row, and every contiguous body row that follows."
   guides/markdown.md function collectList: guide absent source "Collects a list starting at the first item, gathering sibling items at the same indent/ordering and recursing into each item's own block content."
   guides/markdown.md function markdownToHTML: guide absent source "Projects a `MarkdownNode` into an unsanitized `HTMLDocument`."
   guides/markdown.md function renderMarkdown: guide absent source "Renders a `MarkdownNode` to its CANONICAL markdown source - the inverse projection of `renderHTML`, and the serializer a `parse(renderMarkdown(doc))` round-trip is built on. Canonical forms: `*` / `**` emphasis at even emphasis nesting depths and `_` / `__` at odd depths, `-` bullets, `N.` sequential ordinals (from the list's `start`), `---` thematic breaks, fenced code blocks (backtick run widened past any 3+ backtick run inside the body), ATX headings, `>`-prefixed blockquote lines, GFM tables (1-space-padded cells, `\\|`-escaped pipes, an alignment delimiter row), `[text](href)` links, `![alt](src)` images, and two-space hard breaks. A `text` node's literal content is backslash-escaped wherever it would otherwise re-parse as markup, so parsing the rendered source returns the node it was rendered from."
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
-- check
   tests/guides.test.ts(141,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(144,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(148,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(163,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(178,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 5 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  5 failed | 55 passed (60)
   exit 1
-- test:policy
        × enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace 73ms
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(2) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(2) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
   exit 1
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 16 | summary 13 | banned 3 | tests/setup.ts(12) tests/src/core/shapers.test.ts(1) tests/src/core/parsers.test.ts(1) tests/src/core/Markdown.test.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
+158,	+     "message": "prose carries no banned term: e.g. (for example)",	+     "path": "guides/markdown.md"
+221,	+     "message": "prose carries no banned term: just (delete)",	+     "path": "guides/markdown.md"
+257,	+     "message": "prose carries no banned term: e.g. (for example)",	+     "path": "guides/markdown.md"
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for markdown (taken 2026-09-07T15:36Z by facts.sh)

- Checkout `/home/user/fleet/markdown`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `25a7e40`, status: clean
- `package.json`: version `0.0.13`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    134:			const members = source.methods(group.interface)
    141:					expect(findMissing(members, group.methods)).toEqual([])
    144:					expect(findMissing(group.methods, members)).toEqual([])
    148:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    163:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    166:		for (const group of guide.methods()) {
    176:							? source.examples(group.interface)
    177:							: source.examples(group.interface).concat(source.examples(entity))
    178:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    190:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 908:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` once, map the `examples` binding's records to names (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.13"` → `"version": "0.0.14"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-markdown-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.

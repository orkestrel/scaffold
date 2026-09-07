# Report — `d7n-markdown-prep`

Wall clock: 2026-09-07T15:37:21Z to 2026-09-07T15:42:14Z.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

Summary line: `9 written, 27 unchanged, 0 removed in ..`

`git status --short` after:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P21 list exactly.

## Item 2 — `tests/guides.test.ts` adaptation

Hunk 1 (methods loop):

```diff
-		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
-			const entity = group.interface.replace(/Interface$/, '')
-			describe(`${group.interface}`, () => {
-				it('documents at least one method', () => {
-					expect(group.methods.length).toBeGreaterThan(0)
-				})
-				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
-				})
-				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
-				})
-				it(`${entity} exposes no undocumented method`, () => {
-					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
-					expect(extra).toEqual([])
-				})
-			})
-		}
+		for (const group of guide.methods()) {
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
+			const entity = group.interface.replace(/Interface$/, '')
+			describe(`${group.interface}`, () => {
+				it('documents at least one method', () => {
+					expect(group.methods.length).toBeGreaterThan(0)
+				})
+				it('documents every interface method', () => {
+					expect(findMissing(members, documented)).toEqual([])
+				})
+				it('documents no phantom method', () => {
+					expect(findMissing(documented, members)).toEqual([])
+				})
+				it(`${entity} exposes no undocumented method`, () => {
+					const extra =
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
+					expect(extra).toEqual([])
+				})
+			})
+		}
```

Hunk 2 (surface-example case and examples loop):

```diff
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})

 		for (const group of guide.methods()) {
-			const entity = group.interface.replace(/Interface$/, '')
-			describe(`${group.interface} examples`, () => {
-				it('documents an example for every method', () => {
-					const fences = guide
-						.fences()
-						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
-						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
-				})
-			})
-		}
+			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
+			describe(`${group.interface} examples`, () => {
+				it('documents an example for every method', () => {
+					const fences = guide
+						.fences()
+						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
+						.map((fence) => fence.code)
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
+				})
+			})
+		}
```

No other change to the suite. Adapted against the accepted shape at `/home/user/fleet/abort/tests/guides.test.ts:145-215`.

## Item 3 — voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 printed diagnostics in `tests/src/core/shapers.test.ts`, `tests/src/core/Markdown.test.ts`, `tests/src/core/parsers.test.ts`, `tests/setup.ts`, and `src/core/helpers.ts`. Every diagnostic sat inside a comment under `tests/**` or `src/**`; none named an off-limits file.

- `tests/src/core/shapers.test.ts:25` — `policy(no-banned-term)`: Replace `via`.
  Before: `// Each shape here compiles (via createContract) into a guard / parser /`
  After: `// Each shape here compiles (through createContract) into a guard / parser /`

- `tests/src/core/Markdown.test.ts:679` — `policy(no-banned-term)`: Replace `via`.
  Before: `// Built directly as an AST (not via parseDocument, which caps depth during`
  After: `// Built directly as an AST (not through parseDocument, which caps depth during`

- `tests/src/core/parsers.test.ts:684` — `policy(no-banned-term)`: Replace `just`.
  Before: `// handles a realistic WHOLE document (not just one construct at a time) — no disk`
  After: `// handles a realistic WHOLE document (not one construct at a time alone) — no disk`

- `tests/setup.ts:59` — `policy(no-malformed-summary)`.
  Before: `/** Parse \`markdown\` and narrow its FIRST block, asserting at least one exists. */`
  After: `/** Parses \`markdown\` and narrows its FIRST block, asserting at least one exists. */`

- `tests/setup.ts:151` — `policy(no-malformed-summary)`.
  Before: `/** A {@link MarkdownProjection} with every field defaulted — the projection leaves' test input. */`
  After: `/** Builds a {@link MarkdownProjection} with every field defaulted — the projection leaves' test input. */`

- `tests/setup.ts:156` — `policy(no-malformed-summary)`.
  Before: `/** Parse \`html\` with \`@orkestrel/html\` and project it to a markdown document. */`
  After: `/** Parses \`html\` with \`@orkestrel/html\` and projects it to a markdown document. */`

- `tests/setup.ts:161` — `policy(no-malformed-summary)`.
  Before: `/** Markdown sources whose parsed AST must survive canonical rendering and reparsing. */`
  After: `/** Lists markdown sources whose parsed AST must survive canonical rendering and reparsing. */`

- `tests/setup.ts:184` — `policy(no-malformed-summary)`.
  Before: `/** The HTML documents the projection's round-trip anchor law is proved over. */`
  After: `/** Lists the HTML documents the projection's round-trip anchor law is proved over. */`

- `tests/setup.ts:230` — `policy(no-malformed-summary)`.
  Before: ` * An emphasis-like record whose \`children\` array contains a reference cycle`
  After: ` * Builds an emphasis-like record whose \`children\` array contains a reference cycle`

- `tests/setup.ts:241` — `policy(no-malformed-summary)`.
  Before: ` * An object shaped like a markdown node whose \`element\` property is a getter`
  After: ` * Builds an object shaped like a markdown node whose \`element\` property is a getter`

- `tests/setup.ts:257` — `policy(no-malformed-summary)`.
  Before: ` * An emphasis-like inline chain nested \`levels\` deep, each level's \`children\``
  After: ` * Builds an emphasis-like inline chain nested \`levels\` deep, each level's \`children\``

- `tests/setup.ts:270` — `policy(no-malformed-summary)`.
  Before: ` * A blockquote-like block chain nested \`levels\` deep, each level's \`children\``
  After: ` * Builds a blockquote-like block chain nested \`levels\` deep, each level's \`children\``

- `tests/setup.ts:287` — `policy(no-malformed-summary)`.
  Before: `/** Markdown source with \`levels\` leading \`>\` blockquote markers before \`text\`. */`
  After: `/** Builds markdown source with \`levels\` leading \`>\` blockquote markers before \`text\`. */`

- `tests/setup.ts:292` — `policy(no-malformed-summary)`.
  Before: `/** Markdown source for an \`levels\`-deep nested list, one indent per level. */`
  After: `/** Builds markdown source for an \`levels\`-deep nested list, one indent per level. */`

- `tests/setup.ts:301` — `policy(no-malformed-summary)`.
  Before: `/** Markdown source with \`levels\` nested \`*emphasis*\`/\`[link](\` inline markers around \`text\`. */`
  After: `/** Builds markdown source with \`levels\` nested \`*emphasis*\`/\`[link](\` inline markers around \`text\`. */`

- `src/core/helpers.ts:1712` — `policy(no-malformed-summary)`: State what the symbol does without naming `renderMarkdown` in the first sentence.
  Before:
  ```
   * Renders a {@link MarkdownNode} to its CANONICAL markdown source - the inverse
   * projection of `renderHTML`, and the serializer a `parse(renderMarkdown(doc))`
   * round-trip is built on. Canonical forms: ...
  ```
  After:
  ```
   * Renders a {@link MarkdownNode} to its CANONICAL markdown source - the inverse
   * projection of `renderHTML`. It is the serializer a `parse(renderMarkdown(doc))`
   * round-trip is built on. Canonical forms: ...
  ```
  (Split the first sentence so `renderMarkdown` no longer names itself there; no fact removed.)

After these edits, `npx oxlint --config .oxlintrc.json --deny-warnings .` exited 0.

`npm run test:policy` then reported a `prose` mismatch of 3 in `guides/markdown.md`, matching the standing conditions' P20 reading exactly:

- `guides/markdown.md:158` — `e.g.` (for example).
  Before: `` the **narrowing guards** (`is{Element}Node`, e.g. `isTableNode`) take an already-typed ``
  After: `` the **narrowing guards** (`is{Element}Node`, for example `isTableNode`) take an already-typed ``

- `guides/markdown.md:221` — `just` (delete).
  Before: `` a `list`'s `items` each carry `BlockNode[]` (so a nested list is just a `list` block inside a `listItem`'s children) ``
  After: `` a `list`'s `items` each carry `BlockNode[]` (so a nested list is a `list` block inside a `listItem`'s children) ``

- `guides/markdown.md:257` — `e.g.` (for example).
  Before: `` outside the exhaustive set (bypassing the type system, e.g. through an untyped/deserialized value) ``
  After: `` outside the exhaustive set (bypassing the type system, for example through an untyped/deserialized value) ``

No other sentence in `guides/markdown.md` or `README.md` was touched. `npm run test:policy` then exited 0.

## Item 4 — the bump

`package.json`: `"version": "0.0.13"` → `"version": "0.0.14"`. `package-lock.json` not edited.

## Criterion evidence

**1. `git status --short`** (final):

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M guides/markdown.md
 M package.json
 M src/core/helpers.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/src/core/Markdown.test.ts
 M tests/src/core/parsers.test.ts
 M tests/src/core/shapers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

This is the P21 repair list plus `tests/guides.test.ts`, plus the item 3 files (`guides/markdown.md`, `src/core/helpers.ts`, `tests/setup.ts`, `tests/src/core/Markdown.test.ts`, `tests/src/core/parsers.test.ts`, `tests/src/core/shapers.test.ts`), plus `package.json` (`version`), and nothing else.

**2.** `npm run format:check` → `All matched files use the correct format.` exit 0.
`npx oxlint --config .oxlintrc.json --deny-warnings .` → no output, exit 0.
`npm run check` → `tsc --noEmit` chain, no diagnostics, exit 0.

**3.** `npm run test:guides` → `Test Files 1 passed (1)` / `Tests 60 passed (60)`, exit 0.
`npm run test:policy` → `Test Files 1 passed (1)` / `Tests 90 passed | 1 skipped (91)`, exit 0.
`npm run test:config` → `Test Files 1 passed (1)` / `Tests 172 passed | 1 skipped (173)`, exit 0.

**4.** `npm run docs` exited 1 with a non-zero `rows read`. Verbatim:

```text
guides/markdown.md type TableAlign: guide absent source "Names the horizontal alignment of a GFM table column, as declared by its delimiter row (`:---` left, `---:` right, `:---:` center). A bare `---` delimiter is represented by `null` in `TableNode.align`: the positional array requires one entry per column, JSON cannot carry `undefined` in an array, and the bare delimiter is an explicit no-alignment marker rather than an omitted value."
guides/markdown.md interface ListItemMatch: guide absent source "Represents the parsed parts of a single list-item line - the value the block phase's list detector returns for a `-` / `*` / `+` bullet or a `1.` / `1)` ordinal line."
guides/markdown.md interface HeadingMatch: guide absent source "Represents the parsed parts of a single ATX heading line - the value the block phase's heading detector returns for a `#` … `######` line."
guides/markdown.md interface FenceMatch: guide absent source "Represents the parsed parts of a fenced-code opening line - the value the block phase's fence detector returns for a ```` ``` ```` or `~~~` opener."
guides/markdown.md interface CodeSpanMatch: guide absent source "Represents the located extent of one inline code span - the value the inline phase's code scanner returns for a matched backtick run."
guides/markdown.md interface LinkBounds: guide absent source "Represents the located syntax bounds of one `[text](href)` link - the value the inline phase's link locator returns for a balanced label followed by a destination."
guides/markdown.md interface EmphasisBounds: guide absent source "Represents the located content and syntax bounds of one emphasis run - the value the inline phase's emphasis locator returns for a matched marker run."
guides/markdown.md interface LinkScan: guide absent source "Represents the scanned result of one `[text](href)` link - the node the inline phase's link scanner built from `LinkBounds` and where the scan resumes."
guides/markdown.md interface EmphasisScan: guide absent source "Represents the scanned result of one emphasis run - the node the inline phase's emphasis scanner built from `EmphasisBounds` and where the scan resumes."
guides/markdown.md interface TableCollection: guide absent source "Represents the result of collecting one GFM table - the node the construct scanner built and where the block phase resumes."
guides/markdown.md interface ListCollection: guide absent source "Represents the result of collecting one list - the node the construct scanner built and where the block phase resumes."
guides/markdown.md interface MarkdownSpan: guide absent source "Addresses a half-open region of the ORIGINAL markdown string, in UTF-16 code units - `start` inclusive, `end` exclusive. The provenance a parse records for a node and `MarkdownInterface.span` reads back."
guides/markdown.md interface MarkdownSegment: guide absent source "Maps one run of a `MarkdownSource` back to the region of the ORIGINAL markdown string it was taken from."
guides/markdown.md interface MarkdownSource: guide absent source "Pairs a piece of derived markdown text with the runs mapping it back to the original string - what `splitLines` returns per line, so every phase downstream of it keeps original coordinates instead of reconstructing them from node values."
guides/markdown.md interface TextNode: guide absent source "Represents a run of plain text - the leaf inline node. `value` is the decoded text with markdown escapes (`\*`, `\_`, …) already resolved to their literal characters; html's text encoder escapes `&`, `<`, `>` on the way out; `"` and `'` stay literal in character data."
guides/markdown.md interface EmphasisNode: guide absent source "Represents emphasized inline content - `*italic*` / `_italic_` (`strong: false`) or `**bold**` / `__bold__` (`strong: true`). `children` are the nested inline nodes, so emphasis composes (a `**bold _and italic_**` is a strong node wrapping a text node and an emphasis node)."
guides/markdown.md interface CodeSpanNode: guide absent source "Represents an inline code span - `` `code` ``. `value` is the verbatim span text; no inner markdown is parsed (code is literal), and the renderer HTML-escapes it inside a `<code>` element."
guides/markdown.md interface LineBreakNode: guide absent source "Represents a GFM hard line break - two or more trailing spaces before a newline."
guides/markdown.md interface LinkNode: guide absent source "Represents an inline link - `[text](href)`. `children` are the inline nodes of the link text. At render, html's floor removes a refused `href` attribute and the link keeps its text; `htmlToMarkdown` instead stores a refused destination as `''`."
guides/markdown.md interface ImageNode: guide absent source "Represents an inline image - `![alt](src)`. `children` are the inline nodes of the alternative content and `src` is the image destination."
guides/markdown.md type InlineNode: guide absent source "Represents a node that can appear inside inline content (a heading / paragraph / cell / list item / link text)."
guides/markdown.md interface HeadingNode: guide absent source "Represents an ATX heading - `#` … `######`. `level` is 1–6 (the number of leading `#`), `children` the inline content of the heading text."
guides/markdown.md interface ParagraphNode: guide absent source "Represents a paragraph - a run of non-blank lines that is not another block; `children` its inline content."
guides/markdown.md interface ListItemNode: guide absent source "Represents one item of a `ListNode` - `children` the block content of the item (typically one paragraph, plus any nested list)."
guides/markdown.md interface ListNode: guide absent source "Represents a list - bulleted (`-` / `*` / `+`, `ordered: false`) or numbered (`1.` / `1)`, `ordered: true`). `start` is the first ordinal of an ordered list (usually `1`). Nesting is expressed by a `ListNode` appearing in a `ListItemNode`'s `children`."
guides/markdown.md interface TableNode: guide absent source "Represents a GFM table - `header` the inline content of each header cell, `rows` the body rows (each a list of cells, each cell inline content), `align` the per-column alignment from the delimiter row. A short body row is padded with empty cells; an over-long one is truncated to the header's column count."
guides/markdown.md interface CodeBlockNode: guide absent source "Represents a fenced code block - ```` ```lang ````. `code` is the verbatim block content (no inner markdown; the closing fence and the trailing newline are stripped), `lang` the info-string language tag (the first word after the opening fence), absent when none was given."
guides/markdown.md interface BlockquoteNode: guide absent source "Represents a blockquote - `>`-prefixed lines; `children` the block content parsed from the de-quoted lines (so quotes nest)."
guides/markdown.md interface ThematicBreakNode: guide absent source "Represents a thematic break - a horizontal rule (`---` / `***` / `___` on its own line)."
guides/markdown.md type BlockNode: guide absent source "Represents a node that can appear at the block level of a document (or inside a list item / blockquote)."
guides/markdown.md interface MarkdownDocument: guide absent source "Represents the root of a parsed markdown AST - the ordered block children of the whole document. The value `MarkdownInterface.document` holds."
guides/markdown.md type MarkdownNode: guide absent source "Represents any node in a markdown AST - the `MarkdownDocument` root, a `BlockNode`, a `ListItemNode`, or an `InlineNode`. The exhaustive set every projection's `switch` covers."
guides/markdown.md interface MarkdownCell: guide absent source "Represents one projected table cell - the inline content and alignment of a `th` / `td`."
guides/markdown.md interface MarkdownProjection: guide absent source "Represents what one HTML node projects to on the way to markdown - the fold value `htmlToMarkdown` carries up the AST."
guides/markdown.md type MarkdownHandler: guide absent source "Represents a fold handler for one AST element - receives the node and its children ALREADY folded to `T`, and produces the node's own `T`. The building block of a `MarkdownHandlerMap` catamorphism table."
guides/markdown.md interface MarkdownHandlerMap: guide absent source "Represents the total catamorphism table for `MarkdownInterface.fold` - one `MarkdownHandler` per AST element, keyed by its `element` discriminant. Every key is required: a fold is total over the AST, so there is no element it can skip."
guides/markdown.md type MarkdownRewriteHandler: guide absent source "Represents a copy-on-write node rewrite applied bottom-up by `MarkdownInterface.map` - receives one node (its own children already rewritten) and returns its replacement (the same node, unchanged, or a new node)."
guides/markdown.md type MarkdownParseResult: guide absent source "Pairs a parsed document with the `MarkdownSpan` of each of its nodes - what `parseProvenance` returns, and what `parseDocument` projects the document out of."
guides/markdown.md type MarkdownDerivation: guide absent source "Pairs a rewritten value with the input node each rewritten node was produced from - what `rewriteDocument` returns, so provenance survives a rewrite instead of ending at it. `T` is the rewritten value: the document for a whole-document rewrite."
guides/markdown.md interface MarkdownInterface: guide absent source "Represents a stateful, parsed markdown document: the typed `MarkdownDocument` AST plus the query, rewrite, and fold operations over it."
guides/markdown.md const MAX_DEPTH: guide absent source "Caps the recursion depth the parse pipeline (`parseDocument` and its `parsers.ts` helpers), the `helpers.ts` traversal / projection functions (`markdownToHTML`, `renderMarkdown`, `walkNodes`, `foldNode`, `rewriteDocument`), and the `compilers.ts` renderer (`renderHTML`) honor before degrading. It bounds blockquote nesting, inline nesting (emphasis / links), and traversal / projection recursion so pathological or hostile input cannot exhaust the call stack. `htmlToMarkdown` is the inherited exception: its fold and depth cap belong to `@orkestrel/html`."
guides/markdown.md const EMPTY_PROJECTION: guide absent source "Holds the frozen empty HTML-to-markdown projection from which projection factories default every absent field."
guides/markdown.md function parseBlocks: guide absent source "Parses a run of markdown lines into a block AST, recursing into nested blockquotes, list items, and depth-capped degrade paragraphs."
guides/markdown.md function parseDocument: guide absent source "Parses a markdown string into a typed `MarkdownDocument` AST through the block phase."
guides/markdown.md function parseProvenance: guide absent source "Parses a markdown string into a document and its original-source spans."
guides/markdown.md function parseInline: guide absent source "Parses inline markdown text (emphasis, code spans, links, images, and hard breaks) into inline AST nodes, coalescing adjacent text runs."
guides/markdown.md function splitLines: guide absent source "Splits a markdown document into offset-bearing lines while normalizing CRLF and bare CR terminators at the line boundary. A single trailing terminator does not yield a final empty line."
guides/markdown.md function sliceSource: guide absent source "Slices derived markdown text and narrows each intersecting source segment to the same text-relative range."
guides/markdown.md function joinSources: guide absent source "Joins offset-bearing markdown sources while mapping a separator to the original region between adjacent mapped sources."
guides/markdown.md function projectSpan: guide absent source "Projects a derived text range through its segments to a half-open region of the original markdown string."
guides/markdown.md function trimSource: guide absent source "Trims an offset-bearing source without losing the coordinates of its retained text."
guides/markdown.md function normalizeParagraphLine: guide absent source "Normalizes one paragraph line while retaining the full source run consumed by a trailing-space hard break."
guides/markdown.md function countIndent: guide absent source "Counts the leading space / tab characters on `line` (a tab counts as one) - the indent that decides whether a list item's continuation belongs to the item."
guides/markdown.md function isFlankingWhitespace: guide absent source "Checks whether `character` is whitespace under the emphasis flanking rule - a space, a tab, or a newline."
guides/markdown.md function isEscapable: guide absent source "Checks whether `character` is escapable by a leading backslash - the ASCII punctuation markdown gives meaning to (so `\*` becomes `*` but `\.` stays `\.`)."
guides/markdown.md function isBlankLine: guide absent source "Checks whether `line` is blank - empty, or containing only whitespace - the markdown definition of a blank line that block parsing uses to separate paragraphs, skip gaps, and end list continuations."
guides/markdown.md function isQuote: guide absent source "Checks whether `line` is a blockquote line (`>` optionally indented up to three spaces) - its content is de-quoted by `stripQuote`."
guides/markdown.md function isFenceClose: guide absent source "Checks whether `line` closes a fence opened by `marker` - the same fence character, a run at least as long, and nothing else but surrounding whitespace."
guides/markdown.md function isFenceWhitespace: guide absent source "Checks whether `character` is a regex-`\s`-equivalent whitespace character - the character class `isFenceClose`'s scan treats as surrounding padding."
guides/markdown.md function isThematicBreak: guide absent source "Checks whether `line` is a thematic break (horizontal rule) - three or more of the SAME marker `-`, `*`, or `_` (optionally space-separated) and nothing else (`---`, `***`, `___`, `- - -`)."
guides/markdown.md function isTableStart: guide absent source "Checks whether the pair (`header`, `delimiter`) opens a GFM table - `delimiter` is a row of `|`-separated cells each matching `:?-+:?`, the GFM rule that a table requires a header row IMMEDIATELY followed by a delimiter row."
guides/markdown.md function extractHeading: guide absent source "Extracts an ATX heading line (`#` … `######` followed by text) into its level, trimmed text, and the text's offset inside the line. A run of more than 6 `#`s, or `#`s not followed by whitespace + text, is not a heading; an optional closing `###` run is stripped."
guides/markdown.md function extractFence: guide absent source "Extracts a fenced-code opening line (```` ``` ```` or `~~~`, optionally with an info string) into its `{ marker, lang }`, or `undefined` when `line` is not a fence opener. `marker` is the exact fence run (the closer must match the same character + at least the same length); `lang` is the first word of the info string."
guides/markdown.md function extractListItem: guide absent source "Extracts a list-item line (`-` / `*` / `+` bullet, or `1.` / `1)` ordinal, followed by a space) into its `ListItemMatch`, or `undefined` when `line` is not a list item. `content` is the text after the marker; `marker` is the full marker-plus-space width (for measuring a continuation's indent)."
guides/markdown.md function stripQuote: guide absent source "Strips one level of blockquote marker (`>` plus one optional following space) from an offset-bearing blockquote line, so the de-quoted source re-parses as nested blocks without losing its original coordinates."
guides/markdown.md function splitTableRow: guide absent source "Splits one GFM table row into its cell strings - outer pipes are optional, an escaped pipe (`\|`) inside a cell is NOT a separator (it becomes a literal `|`), and the empty leading / trailing cell produced by an outer `|` is dropped. Derives the string form from `splitTableSources`, which owns the escaped-pipe splitting rule."
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
guides/markdown.md function renderMarkdown: guide absent source "Renders a `MarkdownNode` to its CANONICAL markdown source - the inverse projection of `renderHTML`. It is the serializer a `parse(renderMarkdown(doc))` round-trip is built on. Canonical forms: `*` / `**` emphasis at even emphasis nesting depths and `_` / `__` at odd depths, `-` bullets, `N.` sequential ordinals (from the list's `start`), `---` thematic breaks, fenced code blocks (backtick run widened past any 3+ backtick run inside the body), ATX headings, `>`-prefixed blockquote lines, GFM tables (1-space-padded cells, `\|`-escaped pipes, an alignment delimiter row), `[text](href)` links, `![alt](src)` images, and two-space hard breaks. A `text` node's literal content is backslash-escaped wherever it would otherwise re-parse as markup, so parsing the rendered source returns the node it was rendered from."
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
```

`docs` exits 1, as expected — this is the converge unit's worklist.

## Deviations

None. Every voice diagnostic sat inside `tests/**` or a comment under `src/**`, in scope; every `test:policy` prose hit sat in `guides/markdown.md`, in scope; every before-text was found verbatim; every gate other than `docs` read green.

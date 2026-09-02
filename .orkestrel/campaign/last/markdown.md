# Last changes: markdown

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `b6717a5`, merge base with `origin/main` `493c1af`, layer L2, declared version 0.0.12, registry version 0.0.12.

## Commits since origin/main

```text
6e5e82a 2026-08-28 Update every dependency to the published latest
884436b 2026-08-28 Adopt the catalog and guide mirrors for the wave
429987a 2026-08-28 Apply the verified src-audit fixes
f81332d 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
de72312 2026-09-01 Adopt the renamed guide helpers in the parity test
9c0dfc7 2026-09-02 Name the flanking-whitespace predicate and the helper return types
7575e6d 2026-09-02 Point the README at the guide the package ships
b6717a5 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md       |  17 ++--
 README.md                         |   2 +-
 package.json                      |   6 +-
 src/core/Markdown.ts              |  12 +--
 src/core/compilers.ts             |  33 +++++++
 src/core/constants.ts             |  10 +-
 src/core/factories.ts             |  53 ++---------
 src/core/helpers.ts               | 384 +++++++++++++++++++++++++++++++++++++++++++++++++++++----------------------
 src/core/index.ts                 |   1 +
 src/core/parsers.ts               |  24 ++++-
 src/core/shapers.ts               |  18 ++--
 src/core/types.ts                 | 227 +++++++++++++++++++++++++++++++--------------
 src/core/validators.ts            | 270 +++++++++++++++++------------------------------------
 tests/guides.test.ts              |  22 ++---
 tests/src/core/compilers.test.ts  | 256 ++++++++++++++++++++++++++++++++++++++++++++++++++
 tests/src/core/factories.test.ts  |  32 +------
 tests/src/core/helpers.test.ts    | 397 ++++++++++++++++++++++++++++--------------------------------------------------
 tests/src/core/parsers.test.ts    |   4 +-
 tests/src/core/shapers.test.ts    |   2 +-
 tests/src/core/validators.test.ts | 116 ++---------------------
 20 files changed, 1030 insertions(+), 856 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index ac9e7a7..3a8cdb0 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,10 +1,10 @@
 import type { MarkdownProjection } from './types.js'
 
 /**
- * The maximum recursion depth the parse pipeline (`parseDocument` and its
- * `parsers.ts` helpers) and the `helpers.ts` traversal / projection functions
- * (`markdownToHTML`, `renderHTML`, `renderMarkdown`, `walkNodes`, `foldNode`,
- * `rewriteDocument`) honor before degrading. It bounds blockquote nesting, inline
+ * Caps the recursion depth the parse pipeline (`parseDocument` and its
+ * `parsers.ts` helpers), the `helpers.ts` traversal / projection functions
+ * (`markdownToHTML`, `renderMarkdown`, `walkNodes`, `foldNode`, `rewriteDocument`),
+ * and the `compilers.ts` renderer (`renderHTML`) honor before degrading. It bounds blockquote nesting, inline
  * nesting (emphasis / links), and traversal / projection recursion so pathological
  * or hostile input cannot exhaust the call stack. {@link htmlToMarkdown} is the
  * inherited exception: its fold and depth cap belong to `@orkestrel/html`.
@@ -12,7 +12,7 @@ import type { MarkdownProjection } from './types.js'
 export const MAX_DEPTH = 64
 
 /**
- * The frozen empty HTML-to-markdown projection from which projection factories
+ * Holds the frozen empty HTML-to-markdown projection from which projection factories
  * default every absent field.
  *
  * @example
diff --git a/src/core/index.ts b/src/core/index.ts
index 0f35a8e..654e331 100644
--- a/src/core/index.ts
+++ b/src/core/index.ts
@@ -1,6 +1,7 @@
 export * from './types.js'
 export * from './constants.js'
 export * from './helpers.js'
+export * from './compilers.js'
 export * from './parsers.js'
 export * from './shapers.js'
 export * from './validators.js'
diff --git a/src/core/types.ts b/src/core/types.ts
index 9b8d37a..0eee61a 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -2,7 +2,7 @@
 //
 // A {@link MarkdownInterface} parses a markdown document into a typed AST - a
 // discriminated union of node values keyed by their `element` (the axis that
-// varies, AGENTS §4.4: never `kind` / `type`). The AST is the primary contract
+// varies: never `kind` / `type`). The AST is the primary contract
 // (render-agnostic, exhaustively testable); three separate projections carry it out
 // to sanitized HTML, out to canonical markdown, and in from an HTML AST. Block nodes
 // carry document structure;
@@ -10,7 +10,7 @@
 // / table cell. Every node is plain readonly data - no behaviour.
 
 /**
- * The horizontal alignment of a GFM table column, as declared by its delimiter row
+ * Names the horizontal alignment of a GFM table column, as declared by its delimiter row
  * (`:---` left, `---:` right, `:---:` center). A bare `---` delimiter is represented
  * by `null` in {@link TableNode.align}: the positional array requires one entry per
  * column, JSON cannot carry `undefined` in an array, and the bare delimiter is an
@@ -19,22 +19,105 @@
 export type TableAlign = 'left' | 'right' | 'center'
 
 /**
- * The parsed parts of a single list-item line - the value the block phase's
+ * Represents the parsed parts of a single list-item line - the value the block phase's
  * list detector returns for a `-` / `*` / `+` bullet or a `1.` / `1)` ordinal line.
  */
 export interface ListItemMatch {
-	/** `true` for an ordered (`1.` / `1)`) item, `false` for a bullet (`-` / `*` / `+`). */
+	/** Holds `true` for an ordered (`1.` / `1)`) item, `false` for a bullet (`-` / `*` / `+`). */
 	readonly ordered: boolean
-	/** The ordinal of an ordered item (its number); `1` for a bullet. */
+	/** Holds the ordinal of an ordered item (its number); `1` for a bullet. */
 	readonly start: number
-	/** The item's text after the marker. */
+	/** Holds the item's text after the marker. */
 	readonly content: string
-	/** The leading-space indent of the marker. */
+	/** Holds the leading-space indent of the marker. */
 	readonly indent: number
-	/** The full marker width (indent + bullet/ordinal + the following space) - the continuation indent. */
+	/** Holds the full marker width (indent + bullet/ordinal + the following space) - the continuation indent. */
 	readonly marker: number
 }
 
+/**
+ * Represents the parsed parts of a single ATX heading line - the value the block phase's heading
+ * detector returns for a `#` … `######` line.
+ */
+export interface HeadingMatch {
+	/** Holds the heading's level, 1 to 6. */
+	readonly level: number
+	/** Holds the heading's raw inline text, with an optional closing `#` run stripped. */
+	readonly text: string
+	/** Holds the offset of {@link HeadingMatch.text} inside the original line. */
+	readonly offset: number
+}
+
+/**
+ * Represents the parsed parts of a fenced-code opening line - the value the block phase's fence
+ * detector returns for a ```` ``` ```` or `~~~` opener.
+ */
+export interface FenceMatch {
+	/** Holds the exact fence run; a closer must repeat the same character at least as long. */
+	readonly marker: string
+	/** Holds the first word of the info string, or `undefined` when the fence declares none. */
+	readonly lang: string | undefined
+}
+
+/**
+ * Represents the located extent of one inline code span - the value the inline phase's code
+ * scanner returns for a matched backtick run.
+ */
+export interface CodeSpanMatch {
+	/** Holds the span's literal text, with one padding space stripped from each end. */
+	readonly value: string
+	/** Holds the index one past the span's closing backtick run, exclusive. */
+	readonly end: number
+}
+
+/**
+ * Represents the located syntax bounds of one `[text](href)` link - the value the inline phase's
+ * link locator returns for a balanced label followed by a destination.
+ */
+export interface LinkBounds {
+	/** Holds the index of the label's closing `]`. */
+	readonly close: number
+	/** Holds the index one past the destination's closing `)`, exclusive. */
+	readonly end: number
+}
+
+/**
+ * Represents the located content and syntax bounds of one emphasis run - the value the inline
+ * phase's emphasis locator returns for a matched marker run.
+ */
+export interface EmphasisBounds {
+	/** Holds `true` for a doubled marker (`**strong**`), `false` for a single one (`*em*`). */
+	readonly strong: boolean
+	/** Holds the index of the run's first content character. */
+	readonly open: number
+	/** Holds the index of the closing marker run's first character. */
+	readonly close: number
+	/** Holds the index one past the closing marker run, exclusive. */
+	readonly end: number
+}
+
+/**
+ * Represents the result of collecting one GFM table - the node the construct scanner built and
+ * where the block phase resumes.
+ */
+export interface TableCollection {
+	/** Holds the collected table. */
+	readonly node: TableNode
+	/** Holds the index of the first line after the table. */
+	readonly next: number
+}
+
+/**
+ * Represents the result of collecting one list - the node the construct scanner built and where
+ * the block phase resumes.
+ */
+export interface ListCollection {
+	/** Holds the collected list. */
+	readonly node: ListNode
+	/** Holds the index of the first line after the list. */
+	readonly next: number
+}
+
 /**
  * Addresses a half-open region of the ORIGINAL markdown string, in UTF-16 code units -
  * `start` inclusive, `end` exclusive. The provenance a parse records for a node and
@@ -52,9 +135,9 @@ export interface ListItemMatch {
  * is `end - start`; no length member exists to drift from the two offsets.
  */
 export interface MarkdownSpan {
-	/** The first code unit of the region, inclusive. */
+	/** Holds the first code unit of the region, inclusive. */
 	readonly start: number
-	/** The code unit one past the region's last, exclusive. */
+	/** Holds the code unit one past the region's last, exclusive. */
 	readonly end: number
 }
 
@@ -86,11 +169,11 @@ export interface MarkdownSpan {
  * The mapping is therefore affine strictly inside a run and clamped at its end.
  */
 export interface MarkdownSegment {
-	/** The first code unit of the run inside {@link MarkdownSource.text}. */
+	/** Holds the first code unit of the run inside {@link MarkdownSource.text}. */
 	readonly offset: number
-	/** The first code unit of the original-string region the run was produced from, inclusive. */
+	/** Holds the first code unit of the original-string region the run was produced from, inclusive. */
 	readonly start: number
-	/** The code unit one past that region's last, exclusive. */
+	/** Holds the code unit one past that region's last, exclusive. */
 	readonly end: number
 }
 
@@ -114,80 +197,80 @@ export interface MarkdownSegment {
  * coverage with `projectSpan` rather than assuming it.
  */
 export interface MarkdownSource {
-	/** The derived text a parser reads. */
+	/** Holds the derived text a parser reads. */
 	readonly text: string
-	/** The runs mapping `text` back to the original string, in ascending `offset` order. */
+	/** Holds the runs mapping `text` back to the original string, in ascending `offset` order. */
 	readonly segments: readonly MarkdownSegment[]
 }
 
 /**
- * A run of plain text - the leaf inline node. `value` is the decoded text with
+ * Represents a run of plain text - the leaf inline node. `value` is the decoded text with
  * markdown escapes (`\*`, `\_`, …) already resolved to their literal characters;
  * html's text encoder escapes `&`, `<`, `>` on the way out; `"` and `'` stay literal
  * in character data.
  */
 export interface TextNode {
 	readonly element: 'text'
-	/** The literal text content (escapes resolved, NOT yet HTML-escaped). */
+	/** Holds the literal text content (escapes resolved, NOT yet HTML-escaped). */
 	readonly value: string
 }
 
 /**
- * Emphasized inline content - `*italic*` / `_italic_` (`strong: false`) or
+ * Represents emphasized inline content - `*italic*` / `_italic_` (`strong: false`) or
  * `**bold**` / `__bold__` (`strong: true`). `children` are the nested inline nodes,
  * so emphasis composes (a `**bold _and italic_**` is a strong node wrapping a text
  * node and an emphasis node).
  */
 export interface EmphasisNode {
 	readonly element: 'emphasis'
-	/** `true` for strong (`**` / `__`, → `<strong>`); `false` for ordinary emphasis (`*` / `_`, → `<em>`). */
+	/** Holds `true` for strong (`**` / `__`, → `<strong>`); `false` for ordinary emphasis (`*` / `_`, → `<em>`). */
 	readonly strong: boolean
-	/** The emphasized inline content. */
+	/** Holds the emphasized inline content. */
 	readonly children: readonly InlineNode[]
 }
 
 /**
- * An inline code span - `` `code` ``. `value` is the verbatim span text; no inner
+ * Represents an inline code span - `` `code` ``. `value` is the verbatim span text; no inner
  * markdown is parsed (code is literal), and the renderer HTML-escapes it inside a
  * `<code>` element.
  */
 export interface CodeSpanNode {
 	readonly element: 'codeSpan'
-	/** The verbatim code text (no inner markdown; HTML-escaped at render). */
+	/** Holds the verbatim code text (no inner markdown; HTML-escaped at render). */
 	readonly value: string
 }
 
-/** A GFM hard line break - two or more trailing spaces before a newline. */
+/** Represents a GFM hard line break - two or more trailing spaces before a newline. */
 export interface LineBreakNode {
 	readonly element: 'break'
 }
 
 /**
- * An inline link - `[text](href)`. `children` are the inline nodes of the link text.
+ * Represents an inline link - `[text](href)`. `children` are the inline nodes of the link text.
  * At render, html's floor removes a refused `href` attribute and the link keeps its
  * text; {@link htmlToMarkdown} instead stores a refused destination as `''`.
  */
 export interface LinkNode {
 	readonly element: 'link'
-	/** The link destination (sanitized + attribute-escaped at render). */
+	/** Holds the link destination (sanitized + attribute-escaped at render). */
 	readonly href: string
-	/** The inline content of the link text. */
+	/** Holds the inline content of the link text. */
 	readonly children: readonly InlineNode[]
 }
 
 /**
- * An inline image - `![alt](src)`. `children` are the inline nodes of the
+ * Represents an inline image - `![alt](src)`. `children` are the inline nodes of the
  * alternative content and `src` is the image destination.
  */
 export interface ImageNode {
 	readonly element: 'image'
-	/** The image destination. */
+	/** Holds the image destination. */
 	readonly src: string
-	/** The inline alternative content. */
+	/** Holds the inline alternative content. */
 	readonly children: readonly InlineNode[]
 }
 
-/** A node that can appear inside inline content (a heading / paragraph / cell / list item / link text). */
+/** Represents a node that can appear inside inline content (a heading / paragraph / cell / list item / link text). */
 export type InlineNode =
 	| TextNode
 	| EmphasisNode
@@ -197,61 +280,61 @@ export type InlineNode =
 	| ImageNode
 
 /**
- * An ATX heading - `#` … `######`. `level` is 1–6 (the number of leading `#`),
+ * Represents an ATX heading - `#` … `######`. `level` is 1–6 (the number of leading `#`),
  * `children` the inline content of the heading text.
  */
 export interface HeadingNode {
 	readonly element: 'heading'
-	/** The heading level, 1 (`#`) through 6 (`######`). */
+	/** Holds the heading level, 1 (`#`) through 6 (`######`). */
 	readonly level: number
-	/** The inline content of the heading text. */
+	/** Holds the inline content of the heading text. */
 	readonly children: readonly InlineNode[]
 }
 
-/** A paragraph - a run of non-blank lines that is not another block; `children` its inline content. */
+/** Represents a paragraph - a run of non-blank lines that is not another block; `children` its inline content. */
 export interface ParagraphNode {
 	readonly element: 'paragraph'
-	/** The inline content of the paragraph. */
+	/** Holds the inline content of the paragraph. */
 	readonly children: readonly InlineNode[]
 }
 
-/** One item of a {@link ListNode} - `children` the block content of the item (typically one paragraph, plus any nested list). */
+/** Represents one item of a {@link ListNode} - `children` the block content of the item (typically one paragraph, plus any nested list). */
 export interface ListItemNode {
 	readonly element: 'listItem'
-	/** The block content of the list item (its text as a paragraph, plus any nested list). */
+	/** Holds the block content of the list item (its text as a paragraph, plus any nested list). */
 	readonly children: readonly BlockNode[]
 }
 
 /**
- * A list - bulleted (`-` / `*` / `+`, `ordered: false`) or numbered (`1.` / `1)`,
+ * Represents a list - bulleted (`-` / `*` / `+`, `ordered: false`) or numbered (`1.` / `1)`,
  * `ordered: true`). `start` is the first ordinal of an ordered list (usually `1`).
  * Nesting is expressed by a {@link ListNode} appearing in a {@link ListItemNode}'s
  * `children`.
  */
 export interface ListNode {
 	readonly element: 'list'
-	/** `true` for an ordered (numbered) list (→ `<ol>`); `false` for a bulleted list (→ `<ul>`). */
+	/** Holds `true` for an ordered (numbered) list (→ `<ol>`); `false` for a bulleted list (→ `<ul>`). */
 	readonly ordered: boolean
-	/** The starting ordinal of an ordered list (the first item's number); `1` for a bulleted list. */
+	/** Holds the starting ordinal of an ordered list (the first item's number); `1` for a bulleted list. */
 	readonly start: number
-	/** The list's items, in order. */
+	/** Holds the list's items, in order. */
 	readonly items: readonly ListItemNode[]
 }
 
 /**
- * A GFM table - `header` the inline content of each header cell, `rows` the body
+ * Represents a GFM table - `header` the inline content of each header cell, `rows` the body
  * rows (each a list of cells, each cell inline content), `align` the per-column
  * alignment from the delimiter row. A short body row is padded with empty cells; an
  * over-long one is truncated to the header's column count.
  */
 export interface TableNode {
 	readonly element: 'table'
-	/** The header row - one cell of inline content per column. */
+	/** Holds the header row - one cell of inline content per column. */
 	readonly header: ReadonlyArray<readonly InlineNode[]>
-	/** The body rows - each a list of cells, each cell inline content. */
+	/** Holds the body rows - each a list of cells, each cell inline content. */
 	readonly rows: ReadonlyArray<ReadonlyArray<readonly InlineNode[]>>
 	/**
-	 * The per-column alignment from the delimiter row, in column order. `null`
+	 * Holds the per-column alignment from the delimiter row, in column order. `null`
 	 * represents a bare `---` delimiter because this positional array requires one
 	 * entry per column, JSON cannot carry `undefined` in an array, and the delimiter
 	 * is an explicit no-alignment marker rather than an omitted value.
@@ -260,32 +343,32 @@ export interface TableNode {
 }
 
 /**
- * A fenced code block - ```` ```lang ````. `code` is the verbatim block content (no
+ * Represents a fenced code block - ```` ```lang ````. `code` is the verbatim block content (no
  * inner markdown; the closing fence and the trailing newline are stripped), `lang`
  * the info-string language tag (the first word after the opening fence), absent when
  * none was given.
  */
 export interface CodeBlockNode {
 	readonly element: 'codeBlock'
-	/** The info-string language tag (first word after the opening fence), if any. */
+	/** Holds the info-string language tag (first word after the opening fence), if any. */
 	readonly lang?: string
-	/** The verbatim code content (no inner markdown; HTML-escaped at render). */
+	/** Holds the verbatim code content (no inner markdown; HTML-escaped at render). */
 	readonly code: string
 }
 
-/** A blockquote - `>`-prefixed lines; `children` the block content parsed from the de-quoted lines (so quotes nest). */
+/** Represents a blockquote - `>`-prefixed lines; `children` the block content parsed from the de-quoted lines (so quotes nest). */
 export interface BlockquoteNode {
 	readonly element: 'blockquote'
-	/** The block content of the quote (the `>`-stripped lines, re-parsed as blocks). */
+	/** Holds the block content of the quote (the `>`-stripped lines, re-parsed as blocks). */
 	readonly children: readonly BlockNode[]
 }
 
-/** A thematic break - a horizontal rule (`---` / `***` / `___` on its own line). */
+/** Represents a thematic break - a horizontal rule (`---` / `***` / `___` on its own line). */
 export interface ThematicBreakNode {
 	readonly element: 'thematicBreak'
 }
 
-/** A node that can appear at the block level of a document (or inside a list item / blockquote). */
+/** Represents a node that can appear at the block level of a document (or inside a list item / blockquote). */
 export type BlockNode =
 	| HeadingNode
 	| ParagraphNode
@@ -296,32 +379,32 @@ export type BlockNode =
 	| ThematicBreakNode
 
 /**
- * The root of a parsed markdown AST - the ordered block children of the whole
+ * Represents the root of a parsed markdown AST - the ordered block children of the whole
  * document. The value {@link MarkdownInterface.document} holds.
  */
 export interface MarkdownDocument {
 	readonly element: 'document'
-	/** The document's top-level block nodes, in source order. */
+	/** Holds the document's top-level block nodes, in source order. */
 	readonly children: readonly BlockNode[]
 }
 
 /**
- * Any node in a markdown AST - the {@link MarkdownDocument} root, a {@link BlockNode},
+ * Represents any node in a markdown AST - the {@link MarkdownDocument} root, a {@link BlockNode},
  * a {@link ListItemNode}, or an {@link InlineNode}. The exhaustive set every
  * projection's `switch` covers.
  */
 export type MarkdownNode = MarkdownDocument | BlockNode | ListItemNode | InlineNode
 
-/** One projected table cell - the inline content and alignment of a `th` / `td`. */
+/** Represents one projected table cell - the inline content and alignment of a `th` / `td`. */
 export interface MarkdownCell {
-	/** The alignment the cell's `align` attribute declared; `undefined` when it declared none. */
+	/** Holds the alignment the cell's `align` attribute declared; `undefined` when it declared none. */
 	readonly align: TableAlign | undefined
-	/** The cell's inline content - a table cell is inline-only, so block content flattens to text. */
+	/** Holds the cell's inline content - a table cell is inline-only, so block content flattens to text. */
 	readonly inlines: readonly InlineNode[]
 }
 
 /**
- * What one HTML node projects to on the way to markdown - the fold value
+ * Represents what one HTML node projects to on the way to markdown - the fold value
  * `htmlToMarkdown` carries up the AST.
  *
  * @remarks
@@ -343,27 +426,27 @@ export interface MarkdownCell {
  *   them untouched; whatever never reaches a table degrades to paragraphs.
  */
 export interface MarkdownProjection {
-	/** The node's block content, with any surrounding inline runs already wrapped into paragraphs. */
+	/** Holds the node's block content, with any surrounding inline runs already wrapped into paragraphs. */
 	readonly blocks: readonly BlockNode[]
-	/** The node's inline content; empty whenever `blocks` is not. */
+	/** Holds the node's inline content; empty whenever `blocks` is not. */
 	readonly inlines: readonly InlineNode[]
-	/** The raw subtree text, whitespace uncollapsed and escapes unresolved. */
+	/** Holds the raw subtree text, whitespace uncollapsed and escapes unresolved. */
 	readonly text: string
-	/** The cells this node contributes to an enclosing row. */
+	/** Holds the cells this node contributes to an enclosing row. */
 	readonly cells: readonly MarkdownCell[]
-	/** The rows this node contributes to an enclosing table - each its cells, in column order. */
+	/** Holds the rows this node contributes to an enclosing table - each its cells, in column order. */
 	readonly rows: ReadonlyArray<readonly MarkdownCell[]>
 }
 
 /**
- * A fold handler for one AST element - receives the node and its children
+ * Represents a fold handler for one AST element - receives the node and its children
  * ALREADY folded to `T`, and produces the node's own `T`. The building block of a
  * {@link MarkdownHandlers} catamorphism table.
  */
 export type MarkdownHandler<TNode, T> = (node: TNode, children: readonly T[]) => T
 
 /**
- * The total catamorphism table for {@link MarkdownInterface.fold} - one
+ * Represents the total catamorphism table for {@link MarkdownInterface.fold} - one
  * {@link MarkdownHandler} per AST element, keyed by its `element` discriminant. Every
  * key is required: a fold is total over the AST, so there is no element it can skip.
  */
@@ -407,7 +490,7 @@ export interface MarkdownHandlers<T> {
 }
 
 /**
- * A copy-on-write node rewrite applied bottom-up by {@link MarkdownInterface.map} -
+ * Represents a copy-on-write node rewrite applied bottom-up by {@link MarkdownInterface.map} -
  * receives one node (its own children already rewritten) and returns its
  * replacement (the same node, unchanged, or a new node).
  */
@@ -461,7 +544,7 @@ export type MarkdownDerivation<T> = readonly [
 ]
 
 /**
- * A stateful, parsed markdown document: the typed {@link MarkdownDocument} AST plus
+ * Represents a stateful, parsed markdown document: the typed {@link MarkdownDocument} AST plus
  * the query, rewrite, and fold operations over it.
  *
  * @remarks
@@ -474,7 +557,7 @@ export type MarkdownDerivation<T> = readonly [
  * - **`stream`.** Returns a web-standard {@link ReadableStream} over the top-level
  *   blocks - a fresh, pull-based source per call: exactly one block is enqueued per
  *   `pull`, so a slow consumer's backpressure is respected and no work happens ahead
- *   of demand. Cancellable via the returned stream's own `cancel()`, async-iterable
+ *   of demand. Cancellable through the returned stream's own `cancel()`, async-iterable
  *   wherever the platform supports it (Node, Deno, and browsers that ship the
  *   proposal), and pipeable through any {@link TransformStream} / {@link WritableStream}.
  * - **The surface.** `document` (the AST root), `walk` (the deep traversal), `find` /
@@ -483,10 +566,10 @@ export type MarkdownDerivation<T> = readonly [
  *   total catamorphism), and `stream` (the shallow, backpressured top-level source).
  */
 export interface MarkdownInterface {
-	/** The stored {@link MarkdownDocument} AST root. */
+	/** Holds the stored {@link MarkdownDocument} AST root. */
 	readonly document: MarkdownDocument
 	/**
-	 * THE deep traversal - a lazy, depth-first, pre-order, root-inclusive
+	 * Returns THE deep traversal - a lazy, depth-first, pre-order, root-inclusive
 	 * {@link Generator} over every {@link MarkdownNode} in the document. The sync
 	 * `for (const node of markdown.walk())` surface is also consumable by
 	 * `for await (const node of markdown.walk())` (JavaScript accepts a sync
@@ -530,7 +613,7 @@ export interface MarkdownInterface {
 	/** Runs a total catamorphism over the document using a {@link MarkdownHandlers} table. */
 	fold<T>(handlers: MarkdownHandlers<T>): T
 	/**
-	 * A web-standard {@link ReadableStream} over the document's top-level block nodes
+	 * Returns a web-standard {@link ReadableStream} over the document's top-level block nodes
 	 * (shallow, source order) - a lazy, pull-based, backpressure-respecting source. A
 	 * fresh, independently-replayable stream every call; never mutates the document.
 	 */
```

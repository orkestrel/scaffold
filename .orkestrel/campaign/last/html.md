# Last changes: html

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `532fc73`, merge base with `origin/main` `844f00f`, layer L1, declared version 0.0.7, registry version 0.0.7.

## Commits since origin/main

```text
fc06d77 2026-08-28 Update every dependency to the published latest
5677ec2 2026-08-28 Adopt the catalog and guide mirrors for the wave
8877c31 2026-09-01 Apply the verified src-audit fixes
9a5a8b6 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
f6b23f5 2026-09-01 Move isEmptyElement to helpers under kind purity
ce9b703 2026-09-01 Adopt the renamed guide helpers in the parity test
1cec0f4 2026-09-02 Apply the breaking rows in html
bc53632 2026-09-02 Name the contracts a consumer compiles from the leaf shapes in the guide index
532fc73 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md       |  17 ++++---
 package.json                      |   6 +--
 src/core/HTML.ts                  |  30 ++++++-----
 src/core/constants.ts             |  44 ++++++++--------
 src/core/factories.ts             |  91 +--------------------------------
 src/core/helpers.ts               | 217 ++++++++++++++++++++++++++++++++++++++++++++++++------------------------------
 src/core/shapers.ts               |  26 +++++-----
 src/core/types.ts                 | 180 +++++++++++++++++++++++++++++++++++++++++-----------------------
 src/core/validators.ts            | 111 ++++++++--------------------------------
 tests/guides.test.ts              |  22 ++++----
 tests/src/core/HTML.test.ts       |  26 +++++-----
 tests/src/core/factories.test.ts  |  83 +-----------------------------
 tests/src/core/helpers.test.ts    |  53 ++++++++++++++++++-
 tests/src/core/shapers.test.ts    |   9 +++-
 tests/src/core/validators.test.ts |  51 -------------------
 15 files changed, 421 insertions(+), 545 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index bd561b7..75d3a37 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,8 +1,8 @@
-/** The five code points HTML treats as syntax whitespace. */
+/** Lists the five code points HTML treats as syntax whitespace. */
 export const HTML_WHITESPACE = ' \t\n\f\r'
 
 /**
- * The elements that cannot have children - a start tag is the whole element and a close
+ * Lists the elements that cannot have children - a start tag is the whole element and a close
  * tag for one is discarded. Voidness is looked up here rather than stored on
  * `ElementNode`, so a node can never disagree with its own tag name, and the renderer
  * writes `<br>` (never `<br/>` and never a close tag) for every member.
@@ -24,7 +24,7 @@ export const VOID_ELEMENTS: readonly string[] = Object.freeze([
 ])
 
 /**
- * The elements whose content is raw text: everything up to the matching close tag - which
+ * Lists the elements whose content is raw text: everything up to the matching close tag - which
  * is recognized case-insensitively - becomes one verbatim `TextNode` with no tag scanning
  * and no character-reference decoding inside. This is the parser's most important safety
  * boundary, so the renderer refuses to write a raw body that itself contains that close
@@ -33,14 +33,14 @@ export const VOID_ELEMENTS: readonly string[] = Object.freeze([
 export const RAW_ELEMENTS: readonly string[] = Object.freeze(['script', 'style'])
 
 /**
- * The elements whose content is literal text - one `TextNode` up to the matching close
+ * Lists the elements whose content is literal text - one `TextNode` up to the matching close
  * tag, with character references decoded but no markup parsed. They differ from
  * `RAW_ELEMENTS` only by that decoding: `<title>a &amp; b</title>` holds `a & b`.
  */
 export const LITERAL_ELEMENTS: readonly string[] = Object.freeze(['textarea', 'title'])
 
 /**
- * The elements that carry document structure rather than inline content. They are the
+ * Lists the elements that carry document structure rather than inline content. They are the
  * elements that implicitly close an open `p` (see `IMPLIED_CLOSERS`) and the boundaries
  * across which the distiller collapses whitespace instead of preserving it.
  */
@@ -93,7 +93,7 @@ export const BLOCK_ELEMENTS: readonly string[] = Object.freeze([
 ])
 
 /**
- * The implied end-tag table: for each element that can be left open, the start tags whose
+ * Holds the implied end-tag table: for each element that can be left open, the start tags whose
  * arrival closes it. An incoming start tag collects one candidate per row that lists it, the
  * innermost open instance of that row's element, so a candidate sitting beneath elements the
  * table never names is still collected. The parser rules each candidate against its own
@@ -346,9 +346,9 @@ export const IMPLIED_BARRIERS: Readonly<Record<string, readonly string[]>> = Obj
 })
 
 /**
- * The default element allowlist for `sanitize` - the document vocabulary that survives
+ * Lists the default element allowlist for `sanitize` - the document vocabulary that survives
  * unchanged. A safe element outside this set is unwrapped to its children rather than
- * dropped, so `SanitizeOptions.elements` narrows what is KEPT without ever destroying
+ * dropped, so `HTMLSanitizeOptions.elements` narrows what is KEPT without ever destroying
  * content; `UNSAFE_ELEMENTS` is the separate, unlowerable list of subtrees that are
  * removed whole.
  */
@@ -430,7 +430,7 @@ export const SAFE_ELEMENTS: readonly string[] = Object.freeze([
 ])
 
 /**
- * The default attribute allowlist for `sanitize` - the attributes that describe content
+ * Lists the default attribute allowlist for `sanitize` - the attributes that describe content
  * rather than fetch, script, or style it. Deliberately narrow: no `id`, no `style`, no
  * event handler, and no resource `src`, so a sanitized `img` keeps its `alt` text and
  * loses its download. `class` is kept because it is inert once `style`, `link`, `svg`, and
@@ -455,7 +455,7 @@ export const SAFE_ATTRIBUTES: readonly string[] = Object.freeze([
 ])
 
 /**
- * The closed values a sanitized table-cell `align` attribute may carry. This finite
+ * Lists the closed values a sanitized table-cell `align` attribute may carry. This finite
  * vocabulary keeps alignment validation to exact string normalization and membership:
  * the sanitizer deliberately gains no CSS or value-grammar parser and no general styling
  * policy axis.
@@ -463,7 +463,7 @@ export const SAFE_ATTRIBUTES: readonly string[] = Object.freeze([
 export const TABLE_ALIGNMENTS: readonly string[] = Object.freeze(['center', 'left', 'right'])
 
 /**
- * The elements on which a sanitized `align` attribute is honored. Although `align` is
+ * Lists the elements on which a sanitized `align` attribute is honored. Although `align` is
  * obsolete presentational HTML, its cell-only scope is a smaller security surface than a
  * style declaration allowlist. `sanitizeAttributes` already receives the owning element,
  * so it can narrow this allowlisted attribute just as it narrows URL attributes without a
@@ -472,17 +472,17 @@ export const TABLE_ALIGNMENTS: readonly string[] = Object.freeze(['center', 'lef
 export const TABLE_CELL_ELEMENTS: readonly string[] = Object.freeze(['td', 'th'])
 
 /**
- * The URL schemes a sanitized document may name. A relative URL - anything without a
+ * Lists the URL schemes a sanitized document may name. A relative URL - anything without a
  * `scheme:` prefix, excluding the protocol-relative forms - is always allowed; every
- * other scheme is refused. `SanitizeOptions.schemes` replaces this set but can never
+ * other scheme is refused. `HTMLSanitizeOptions.schemes` replaces this set but can never
  * admit `javascript:`, `data:`, `vbscript:`, or `file:`, which are refused outright.
  */
 export const SAFE_URL_SCHEMES: readonly string[] = Object.freeze(['http', 'https', 'mailto', 'tel'])
 
 /**
- * The attributes whose value is a URL, and therefore the values `sanitize` decodes,
+ * Lists the attributes whose value is a URL, and therefore the values `sanitize` decodes,
  * strips of ASCII whitespace and control characters, and scheme-checks before keeping,
- * and that `distill` resolves against `DistillOptions.base`. `action` and `formaction`
+ * and that `distill` resolves against `HTMLDistillOptions.base`. `action` and `formaction`
  * are listed even though their elements are removed whole, because a hand-built AST can
  * carry them anywhere.
  */
@@ -496,8 +496,8 @@ export const URL_ATTRIBUTES: readonly string[] = Object.freeze([
 ])
 
 /**
- * The hard floor of `sanitize`: elements whose entire subtree is removed, never unwrapped,
- * no matter what `SanitizeOptions` allows. Unwrapping is what makes these dangerous -
+ * Names the hard floor of `sanitize`: elements whose entire subtree is removed, never unwrapped,
+ * no matter what `HTMLSanitizeOptions` allows. Unwrapping is what makes these dangerous -
  * the body of a `script`, `style`, `template`, or `noscript` is text that becomes live
  * markup the moment its wrapper disappears - so the content goes with the element.
  * Foreign content (`svg`, `math`) is here because this AST has no namespaces to police,
@@ -529,7 +529,7 @@ export const UNSAFE_ELEMENTS: readonly string[] = Object.freeze([
 ])
 
 /**
- * The default element set `distill` keeps as content: prose, headings, lists, tables,
+ * Lists the default element set `distill` keeps as content: prose, headings, lists, tables,
  * code, and the inline marks that carry meaning. Everything else safe is unwrapped to its
  * children, which is how wrapper soup melts while its text survives. Definition lists are
  * included because a documentation page's terms and definitions are content, not chrome.
@@ -570,7 +570,7 @@ export const CONTENT_ELEMENTS: readonly string[] = Object.freeze([
 ])
 
 /**
- * The default regions `distill` removes whole - the navigation, banner, and margin
+ * Lists the default regions `distill` removes whole - the navigation, banner, and margin
  * furniture that surrounds an article rather than belonging to it. Unlike the content
  * set, these are dropped with their children: a navigation menu's link text is noise in
  * every reading of the page.
@@ -584,13 +584,13 @@ export const BOILERPLATE_ELEMENTS: readonly string[] = Object.freeze([
 ])
 
 /**
- * The content regions `distill` tries in priority order when re-rooting a document.
+ * Lists the content regions `distill` tries in priority order when re-rooting a document.
  * A region qualifies only when it occurs exactly once.
  */
 export const REGION_ELEMENTS: readonly string[] = Object.freeze(['main', 'article'])
 
 /**
- * The semicolon-terminated named character references from the WHATWG HTML set, keyed
+ * Holds the semicolon-terminated named character references from the WHATWG HTML set, keyed
  * by name without the leading `&` or trailing `;`. The parser decodes them in text,
  * attribute values, and literal-text elements through a frozen own-property record.
  * Unknown and prototype-like names stay literal.
@@ -2731,7 +2731,7 @@ export const NAMED_ENTITIES: Readonly<Record<string, string>> = Object.freeze({
 })
 
 /**
- * The recursion depth the parser, the traversals, and the renderers honor before they
+ * Names the recursion depth the parser, the traversals, and the renderers honor before they
  * stop descending - the bound that keeps pathological input (thousands of nested `div`s,
  * a fuzzer's tag soup) from exhausting the call stack. Past this depth the parser appends
  * content to the deepest allowed element instead of nesting further, so parsing stays
diff --git a/src/core/types.ts b/src/core/types.ts
index 0333e04..f0ca302 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -13,7 +13,7 @@
 // is a downstream projection from the AST to a string.
 
 /**
- * One attribute of an {@link ElementNode} - its `name` and, when the source wrote one,
+ * Represents one attribute of an {@link ElementNode} - its `name` and, when the source wrote one,
  * its `value`.
  *
  * @remarks
@@ -25,14 +25,14 @@
  * attribute recovers to an absent value rather than to invented text.
  */
 export interface HTMLAttribute {
-	/** The attribute's ASCII-lowercased name. */
+	/** Holds the attribute's ASCII-lowercased name. */
 	readonly name: string
-	/** The attribute's value; absent for a valueless attribute (`<input disabled>`). */
+	/** Holds the attribute's value; absent for a valueless attribute (`<input disabled>`). */
 	readonly value?: string
 }
 
 /**
- * One unambiguous start tag parsed directly from source without recovery.
+ * Represents one unambiguous start tag parsed directly from source without recovery.
  *
  * @remarks
  * `name` and attribute names are ASCII-lowercased, while `next` remains an exact
@@ -43,30 +43,30 @@ export interface HTMLAttribute {
  * no value through `parseStartTag`.
  */
 export interface HTMLStartTag {
-	/** The tag's ASCII-lowercased name. */
+	/** Holds the tag's ASCII-lowercased name. */
 	readonly name: string
-	/** The tag's ordered, ASCII-lowercased attributes. */
+	/** Holds the tag's ordered, ASCII-lowercased attributes. */
 	readonly attributes: readonly HTMLAttribute[]
-	/** Whether the tokenizer recognized a trailing solidus outside an attribute value. */
+	/** Indicates whether the tokenizer recognized a trailing solidus outside an attribute value. */
 	readonly slashed: boolean
-	/** The exclusive UTF-16 source offset immediately after the closing `>`. */
+	/** Holds the exclusive UTF-16 source offset immediately after the closing `>`. */
 	readonly next: number
 }
 
-/** One start or close tag returned by the total, recovering `scanTag` scanner. */
+/** Represents one start or close tag returned by the total, recovering `scanTag` scanner. */
 export interface HTMLTag {
-	/** The tag's ASCII-lowercased name. */
+	/** Holds the tag's ASCII-lowercased name. */
 	readonly name: string
-	/** The start tag's attributes; always empty for a close tag. */
+	/** Holds the start tag's attributes; always empty for a close tag. */
 	readonly attributes: readonly HTMLAttribute[]
-	/** Whether the source token is a close tag. */
+	/** Indicates whether the source token is a close tag. */
 	readonly closing: boolean
-	/** The exclusive UTF-16 source offset immediately after the recovered tag boundary. */
+	/** Holds the exclusive UTF-16 source offset immediately after the recovered tag boundary. */
 	readonly next: number
 }
 
 /**
- * An element - `<p>`, `<table>`, `<my-widget>`, or any other tag, known or custom.
+ * Represents an element - `<p>`, `<table>`, `<my-widget>`, or any other tag, known or custom.
  *
  * @remarks
  * `name` is the ASCII-lowercased tag name and `attributes` are its attributes in source
@@ -78,27 +78,30 @@ export interface HTMLTag {
  */
 export interface ElementNode {
 	readonly category: 'element'
-	/** The element's ASCII-lowercased tag name. */
+	/** Holds the element's ASCII-lowercased tag name. */
 	readonly name: string
-	/** The element's attributes, in source order; a duplicate name keeps its first occurrence. */
+	/**
+	 * Holds the element's attributes, in source order; a duplicate name keeps its first
+	 * occurrence.
+	 */
 	readonly attributes: readonly HTMLAttribute[]
-	/** The element's content; empty for a void element. */
+	/** Holds the element's content; empty for a void element. */
 	readonly children: readonly HTMLNode[]
 }
 
 /**
- * A run of character data - the leaf node. `value` is the decoded text: numeric and
+ * Represents a run of character data - the leaf node. `value` is the decoded text: numeric and
  * semicolon-terminated WHATWG named character references are already resolved (an unknown
  * named reference stays literal), and the renderer re-encodes `&`, `<`, and `>` on the way out.
  */
 export interface TextNode {
 	readonly category: 'text'
-	/** The decoded text content (character references resolved, NOT yet re-encoded). */
+	/** Holds the decoded text content (character references resolved, NOT yet re-encoded). */
 	readonly value: string
 }
 
 /**
- * A comment - `<!-- … -->`. `value` is the comment's verbatim inner text, never decoded
+ * Represents a comment - `<!-- … -->`. `value` is the comment's verbatim inner text, never decoded
  * and never parsed as markup. The parser constructs only representable values: they never
  * begin with an abrupt `>` / `->` close and never contain `-->` / `--!>`, so rendering and
  * reparsing a parser-produced comment preserves it exactly. A hand-built value can violate
@@ -109,12 +112,12 @@ export interface TextNode {
  */
 export interface CommentNode {
 	readonly category: 'comment'
-	/** The comment's verbatim inner text. */
+	/** Holds the comment's verbatim inner text. */
 	readonly value: string
 }
 
 /**
- * A document type declaration - `<!DOCTYPE html>` and its legacy public/system forms.
+ * Represents a document type declaration - `<!DOCTYPE html>` and its legacy public/system forms.
  *
  * @remarks
  * `name` is the declared root name (`html`). `public` and `system` are the external
@@ -125,45 +128,85 @@ export interface CommentNode {
  */
 export interface DoctypeNode {
 	readonly category: 'doctype'
-	/** The declared root element name, ASCII-lowercased (`html`). */
+	/** Holds the declared root element name, ASCII-lowercased (`html`). */
 	readonly name: string
-	/** The public identifier of a legacy declaration, when one was written. */
+	/** Holds the public identifier of a legacy declaration, when one was written. */
 	readonly public?: string
-	/** The system identifier of a legacy declaration, when one was written. */
+	/** Holds the system identifier of a legacy declaration, when one was written. */
 	readonly system?: string
 }
 
 /**
- * The root of a parsed AST - the ordered children of the whole input, whether that input
- * was a full page or one fragment. The value {@link HTMLInterface.document} holds.
+ * Represents the root of a parsed AST - the ordered children of the whole input, whether that
+ * input was a full page or one fragment. The value {@link HTMLInterface.document} holds.
  */
 export interface HTMLDocument {
 	readonly category: 'document'
-	/** The top-level nodes, in source order. */
+	/** Holds the top-level nodes, in source order. */
 	readonly children: readonly HTMLNode[]
 }
 
 /**
- * Any node in an HTML AST - the {@link HTMLDocument} root or one of its descendants. The
+ * Represents any node in an HTML AST - the {@link HTMLDocument} root or one of its descendants. The
  * exhaustive set every guard, traversal, fold table, and renderer covers, discriminated
  * by `category`.
  */
 export type HTMLNode = HTMLDocument | ElementNode | TextNode | CommentNode | DoctypeNode
 
 /**
- * A half-open region of the original HTML input, measured in UTF-16 code units.
+ * Represents a half-open region of the original HTML input, measured in UTF-16 code units.
  *
  * @remarks
  * `start` is inclusive and `end` is exclusive. The coordinates address the string before
  * parser normalization changes CRLF, carriage returns, or null characters.
  */
 export interface HTMLSpan {
-	/** The inclusive original-input offset. */
+	/** Holds the inclusive original-input offset. */
 	readonly start: number
-	/** The exclusive original-input offset. */
+	/** Holds the exclusive original-input offset. */
 	readonly end: number
 }
 
+/**
+ * Carries a normalized HTML source beside the boundary map back to its original input.
+ *
+ * @remarks
+ * Entry `index` of `offsets` is the original-input offset that normalized offset `index`
+ * came from, so a normalized half-open region projects back through `projectSpan`. The
+ * normalization the map accounts for is the parser's own: CRLF and a lone carriage return
+ * become one newline, and `U+0000` becomes `U+FFFD`.
+ */
+export type HTMLSource = readonly [source: string, offsets: readonly number[]]
+
+/**
+ * Describes one open element occurrence located across the parser's represented and
+ * depth-overflow stacks.
+ *
+ * @remarks
+ * `position` indexes the stack `overflow` names, so the two fields are read together;
+ * `projectDepth` is what puts them on the single scale both stacks compare on.
+ */
+export interface HTMLOpenPosition {
+	/** Indicates whether the depth-overflow stack recorded the occurrence. */
+	readonly overflow: boolean
+	/** Holds the occurrence's position within the stack that recorded it. */
+	readonly position: number
+}
+
+/**
+ * Describes the node and close boundary returned by a scanner that produces one leaf node.
+ *
+ * @remarks
+ * `next` is the first offset after the construct the scanner consumed, so a caller resumes
+ * there without recomputing the boundary.
+ */
+export interface HTMLScan<TNode extends HTMLNode> {
+	/** Holds the scanned node. */
+	readonly node: TNode
+	/** Holds the first offset after the scanned construct. */
+	readonly next: number
+}
+
 /**
  * Carries the parsed document and its original-input node regions.
  *
@@ -189,20 +232,20 @@ export type HTMLDerivation<T> = readonly [
 
 /** Describes the text, source region, and close boundary returned by a raw-text scan. */
 export interface HTMLRawText {
-	/** The raw or entity-decoded text node. */
+	/** Holds the raw or entity-decoded text node. */
 	readonly node: TextNode
-	/** The half-open text region in the string passed to the scanner. */
+	/** Holds the half-open text region in the string passed to the scanner. */
 	readonly span: HTMLSpan
-	/** The first offset after the closing tag, or the input length when unclosed. */
+	/** Holds the first offset after the closing tag, or the input length when unclosed. */
 	readonly next: number
-	/** Whether the scan found a complete matching close tag. */
+	/** Indicates whether the scan found a complete matching close tag. */
 	readonly closed: boolean
 }
 
 /**
- * A fold handler for one node category - receives the node and its children ALREADY
+ * Represents a fold handler for one node category - receives the node and its children ALREADY
  * folded to `T`, and produces the node's own `T`. The building block of an
- * {@link HTMLHandlers} table.
+ * {@link HTMLHandlerMap} table.
  *
  * @param node - The node being folded
  * @param children - The node's children, each already folded to `T`; empty for a leaf
@@ -211,11 +254,11 @@ export interface HTMLRawText {
 export type HTMLHandler<TNode, T> = (node: TNode, children: readonly T[]) => T
 
 /**
- * The total fold table for {@link HTMLInterface.fold} - one {@link HTMLHandler} per node
+ * Represents the total fold table for {@link HTMLInterface.fold} - one {@link HTMLHandler} per node
  * category, keyed by that category. Every key is required, because a fold is total over
  * the AST: there is no node it may skip.
  */
-export interface HTMLHandlers<T> {
+export interface HTMLHandlerMap<T> {
 	/** Folds the {@link HTMLDocument} root from its already-folded children. */
 	readonly document: HTMLHandler<HTMLDocument, T>
 	/** Folds an {@link ElementNode} from its already-folded children (empty for a void element). */
@@ -229,7 +272,7 @@ export interface HTMLHandlers<T> {
 }
 
 /**
- * A copy-on-write node rewrite applied bottom-up by {@link HTMLInterface.map} - receives
+ * Represents a copy-on-write node rewrite applied bottom-up by {@link HTMLInterface.map} - receives
  * one node whose children have already been rewritten and returns its replacement: the
  * same node unchanged, or a new one.
  *
@@ -239,7 +282,7 @@ export interface HTMLHandlers<T> {
 export type HTMLRewriteHandler = (node: HTMLNode) => HTMLNode
 
 /**
- * A bottom-up pruning handler applied by `pruneDocument` - receives one node whose
+ * Represents a bottom-up pruning handler applied by `pruneDocument` - receives one node whose
  * children have already been pruned and returns the nodes that replace it.
  *
  * @param node - The node to prune, with its children already pruned
@@ -248,7 +291,7 @@ export type HTMLRewriteHandler = (node: HTMLNode) => HTMLNode
 export type HTMLPruneHandler = (node: HTMLNode) => readonly HTMLNode[]
 
 /**
- * The options for {@link HTMLInterface.sanitize}. Each allowlist key REPLACES its
+ * Describes the options for {@link HTMLInterface.sanitize}. Each allowlist key REPLACES its
  * default rather than extending it, so a caller who passes one narrows or redirects that
  * one axis and leaves the others alone.
  *
@@ -275,19 +318,19 @@ export type HTMLPruneHandler = (node: HTMLNode) => readonly HTMLNode[]
  * Sanitizing is a fixpoint: sanitizing an already-sanitized document changes nothing,
  * and re-parsing sanitized output sanitizes to the same AST.
  */
-export interface SanitizeOptions {
-	/** The allowed element names, replacing the default safe element set. */
+export interface HTMLSanitizeOptions {
+	/** Holds the allowed element names, replacing the default safe element set. */
 	readonly elements?: ReadonlySet<string> | readonly string[]
-	/** The allowed attribute names, replacing the default safe attribute set. */
+	/** Holds the allowed attribute names, replacing the default safe attribute set. */
 	readonly attributes?: ReadonlySet<string> | readonly string[]
-	/** The URL schemes allowed on a URL attribute, replacing the default safe scheme set. */
+	/** Holds the URL schemes allowed on a URL attribute, replacing the default safe scheme set. */
 	readonly schemes?: ReadonlySet<string> | readonly string[]
-	/** Keep comment nodes instead of dropping them. */
+	/** Keeps comment nodes instead of dropping them. */
 	readonly comments?: boolean
 }
 
 /**
- * The options for {@link HTMLInterface.distill} - the content-extraction pass that
+ * Describes the options for {@link HTMLInterface.distill} - the content-extraction pass that
  * reduces a page to the prose a reader (or a language model) actually wants.
  *
  * @remarks
@@ -306,17 +349,20 @@ export interface SanitizeOptions {
  * it cannot resolve as written. The result is a pruned {@link HTMLInterface}, never a
  * string: rendering stays a separate, downstream choice.
  */
-export interface DistillOptions {
-	/** The URL that relative `href` / `src` values are resolved against. */
+export interface HTMLDistillOptions {
+	/** Holds the URL that relative `href` / `src` values are resolved against. */
 	readonly base?: string
-	/** The element names kept as content, replacing the default content set. */
+	/** Holds the element names kept as content, replacing the default content set. */
 	readonly elements?: ReadonlySet<string> | readonly string[]
-	/** The element names whose whole region is removed, replacing the default boilerplate set. */
+	/**
+	 * Holds the element names whose whole region is removed, replacing the default
+	 * boilerplate set.
+	 */
 	readonly boilerplate?: ReadonlySet<string> | readonly string[]
 }
 
 /**
- * A parsed HTML document: the typed {@link HTMLDocument} AST plus the query, rewrite,
+ * Represents a parsed HTML document: the typed {@link HTMLDocument} AST plus the query, rewrite,
  * fold, and reduction operations over it.
  *
  * @remarks
@@ -344,7 +390,7 @@ export interface DistillOptions {
  *   `sanitize` / `distill` (the two document-shaping engines).
  */
 export interface HTMLInterface {
-	/** The stored {@link HTMLDocument} AST root. */
+	/** Exposes the stored {@link HTMLDocument} AST root. */
 	readonly document: HTMLDocument
 	/**
 	 * Returns the original-input region that produced a node in this handle's tree.
@@ -354,7 +400,7 @@ export interface HTMLInterface {
 	 */
 	span(node: HTMLNode): HTMLSpan | undefined
 	/**
-	 * THE deep traversal - a lazy, depth-first, pre-order, root-inclusive
+	 * Provides THE deep traversal - a lazy, depth-first, pre-order, root-inclusive
 	 * {@link Generator} over every {@link HTMLNode} in the document. The sync
 	 * `for (const node of html.walk())` surface is also consumable by
 	 * `for await (const node of html.walk())`, so an async pipeline needs no second
@@ -378,24 +424,32 @@ export interface HTMLInterface {
 	map(rewrite: HTMLRewriteHandler): HTMLInterface
 	/** Reduces the AST depth-first, pre-order into one accumulated value. */
 	reduce<T>(callback: (value: T, node: HTMLNode) => T, initial: T): T
-	/** Runs a total catamorphism over the document using an {@link HTMLHandlers} table. */
-	fold<T>(handlers: HTMLHandlers<T>): T
+	/** Runs a total catamorphism over the document using an {@link HTMLHandlerMap} table. */
+	fold<T>(handlers: HTMLHandlerMap<T>): T
 	/**
-	 * A web-standard {@link ReadableStream} over the root's direct children (shallow,
+	 * Returns a web-standard {@link ReadableStream} over the root's direct children (shallow,
 	 * source order) - a lazy, pull-based, backpressure-respecting source. A fresh,
 	 * independently replayable stream every call; never mutates the document.
 	 */
 	stream(): ReadableStream<HTMLNode>
 	/**
 	 * Removes every unsafe element, attribute, and URL and returns a new
-	 * {@link HTMLInterface}. The floor documented on {@link SanitizeOptions} holds
+	 * {@link HTMLInterface}. The floor documented on {@link HTMLSanitizeOptions} holds
 	 * whatever the options say.
+	 *
+	 * @param options - The sanitize allowlists and comment policy
+	 * @returns A new handle over the sanitized document; an empty document when any step
+	 * throws, because the pass fails closed
 	 */
-	sanitize(options?: SanitizeOptions): HTMLInterface
+	sanitize(options?: HTMLSanitizeOptions): HTMLInterface
 	/**
 	 * Extracts the page's content - sanitizing first, then pruning boilerplate,
-	 * chrome, and wrappers per {@link DistillOptions} - and returns a new
+	 * chrome, and wrappers per {@link HTMLDistillOptions} - and returns a new
 	 * {@link HTMLInterface}.
+	 *
+	 * @param options - The base URL and the content and boilerplate element sets
+	 * @returns A new handle over the distilled document; an empty document when any step
+	 * throws, because the pass fails closed
 	 */
-	distill(options?: DistillOptions): HTMLInterface
+	distill(options?: HTMLDistillOptions): HTMLInterface
 }
```

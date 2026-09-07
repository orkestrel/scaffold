# Report — P.1 `d7n-html-prep`

Every item landed. Every acceptance criterion reads green, and `npm run docs` reads the expected
non-zero worklist and exit 1.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`, run in `/home/user/fleet/html`.

```text
0 of 35 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 6.
tsconfig.json replaced (1 line added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (404 lines added).
9 written, 27 unchanged, 0 removed in ..
EXIT 0
```

`git status --short` directly after, matching the P21 list exactly:

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

`package.json` carries the `docs` script row; `tsconfig.json` carries the own-specifier `paths` entry.

## Item 2 — the drop-in's adaptation

`git diff -- tests/guides.test.ts`:

```diff
diff --git a/tests/guides.test.ts b/tests/guides.test.ts
index 6e9bc89..9a1f8c3 100644
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -140,21 +140,27 @@ for (const entry of manifest) {
 		})
 
 		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
 					expect(extra).toEqual([])
 				})
 			})
@@ -169,22 +175,32 @@ for (const entry of manifest) {
 				.surface()
 				.filter((symbol) => symbol.keyword === 'function')
 				.map((symbol) => symbol.name)
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
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

A `findMissing` whose arguments were already strings stayed: the import walk's `statement.names`
against `face.surface().map((symbol) => symbol.name)`, and the `names` against `surface` in the same
case. No other change to the suite.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 printed diagnostics in three
files, matching P20's reading (total 38 | summary 37 | banned 1 | `tests/setup.ts` 36,
`src/core/constants.ts` 1, `src/core/HTML.ts` 1). Every named file is inside the unit's scope; none
sits in an off-limits path. Line numbers are those of the tree this unit leaves, which are the same
as the pre-edit numbers because every rewrite replaced one line with one line.

### `tests/setup.ts` — `policy(no-malformed-summary)`, message `Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.`

`tests/setup.ts:8`

```text
- /** The semicolon-terminated names and characters from the vendored WHATWG entity reference. */
+ /** Holds the semicolon-terminated names and characters from the vendored WHATWG entity reference. */
```

`tests/setup.ts:23`

```text
- /** The shared seed for deterministic generated test input. */
+ /** Holds the shared seed for deterministic generated test input. */
```

`tests/setup.ts:26`

```text
- /** One mutation attempt against a frozen collection, beside what restores it. */
+ /** Describes one mutation attempt against a frozen collection, beside what restores it. */
```

`tests/setup.ts:35`

```text
-  * Attempt every mutation shape a caller could reach an exported collection through.
+  * Attempts every mutation shape a caller could reach an exported collection through.
```

`tests/setup.ts:69`

```text
-  * Undo every write {@link attemptCollectionMutation} lands on a collection that accepted it.
+  * Undoes every write {@link attemptCollectionMutation} lands on a collection that accepted it.
```

`tests/setup.ts:103`

```text
-  * Build a realistic article page carrying every region the distiller prunes.
+  * Builds a realistic article page carrying every region the distiller prunes.
```

`tests/setup.ts:132`

```text
-  * Build a deeply nested HTML source around one text leaf.
+  * Builds a deeply nested HTML source around one text leaf.
```

`tests/setup.ts:143`

```text
-  * Build a representative parser-produced corpus for HTML roundtrip laws.
+  * Builds a representative parser-produced corpus for HTML roundtrip laws.
```

`tests/setup.ts:187`

```text
-  * Build every unique bounded comment-token source from the `<!--`, `<!`, and `<?` introducers
+  * Builds every unique bounded comment-token source from the `<!--`, `<!`, and `<?` introducers
```

`tests/setup.ts:213`

```text
-  * Throw whenever a hostile test value is asked to produce or expose collection behavior.
+  * Throws whenever a hostile test value is asked to produce or expose collection behavior.
```

`tests/setup.ts:222`

```text
-  * Return a value that deliberately violates the iterator protocol.
+  * Returns a value that deliberately violates the iterator protocol.
```

`tests/setup.ts:231`

```text
-  * Build the hostile allowlist shapes every shaping option must contain.
+  * Builds the hostile allowlist shapes every shaping option must contain.
```

`tests/setup.ts:249`

```text
-  * Build an allowlist whose collection-query members throw if normalization consults them.
+  * Builds an allowlist whose collection-query members throw if normalization consults them.
```

`tests/setup.ts:261`

```text
-  * One adversarial sanitizer input and the tokens whose absence proves its dangerous
+  * Describes one adversarial sanitizer input and the tokens whose absence proves its dangerous
```

`tests/setup.ts:278`

```text
-  * Build the adversarial corpus for the sanitizer's security boundary.
+  * Builds the adversarial corpus for the sanitizer's security boundary.
```

`tests/setup.ts:506`

```text
-  * Build encoded forms of every hard-banned URL scheme.
+  * Builds encoded forms of every hard-banned URL scheme.
```

`tests/setup.ts:530`

```text
- /** One entity-obfuscated URL and the exact value the HTML security floor may retain. */
+ /** Describes one entity-obfuscated URL and the exact value the HTML security floor may retain. */
```

`tests/setup.ts:540`

```text
-  * Build the entity-obfuscated URL corpus that exercises every reviewed scheme character.
+  * Builds the entity-obfuscated URL corpus that exercises every reviewed scheme character.
```

`tests/setup.ts:583`

```text
- /** One adversarial URL and the value this package's sanitizer may retain. */
+ /** Describes one adversarial URL and the value this package's sanitizer may retain. */
```

`tests/setup.ts:595`

```text
-  * Build the URL-safety corpus for `sanitizeURL`, each vector carrying its disposition.
+  * Builds the URL-safety corpus for `sanitizeURL`, each vector carrying its disposition.
```

`tests/setup.ts:668`

```text
- /** The URL-safety corpus's threat families, in corpus order. */
+ /** Lists the URL-safety corpus's threat families, in corpus order. */
```

`tests/setup.ts:679`

```text
-  * Build a hand-authored document deeper than the parser permits.
+  * Builds a hand-authored document deeper than the parser permits.
```

`tests/setup.ts:693`

```text
-  * Build an element whose two child references both point back to the element.
+  * Builds an element whose two child references both point back to the element.
```

`tests/setup.ts:706`

```text
-  * Build an acyclic diamond graph with two references to the preceding node at each level.
+  * Builds an acyclic diamond graph with two references to the preceding node at each level.
```

`tests/setup.ts:720`

```text
-  * Build many `pre` elements that share one comment-heavy non-code child.
+  * Builds many `pre` elements that share one comment-heavy non-code child.
```

`tests/setup.ts:744`

```text
-  * Build one start tag containing many duplicate empty quoted attributes.
+  * Builds one start tag containing many duplicate empty quoted attributes.
```

`tests/setup.ts:754`

```text
-  * Build a mixed parser-pressure source spanning attributes, raw elements, and close soup.
+  * Builds a mixed parser-pressure source spanning attributes, raw elements, and close soup.
```

`tests/setup.ts:769`

```text
-  * Build a deeply nested from-unknown element shape.
+  * Builds a deeply nested from-unknown element shape.
```

`tests/setup.ts:783`

```text
-  * Build a cyclic from-unknown element shape.
+  * Builds a cyclic from-unknown element shape.
```

`tests/setup.ts:795`

```text
-  * Throw from a hostile property getter.
+  * Throws from a hostile property getter.
```

`tests/setup.ts:804`

```text
-  * Build a value whose discriminant getter throws.
+  * Builds a value whose discriminant getter throws.
```

`tests/setup.ts:818`

```text
-  * Build a revoked proxy that throws on every structural read.
+  * Builds a revoked proxy that throws on every structural read.
```

`tests/setup.ts:829`

```text
-  * Build a prototype with a throwing inherited property.
+  * Builds a prototype with a throwing inherited property.
```

`tests/setup.ts:843`

```text
-  * Collect decoded text content from a document without recursion.
+  * Collects decoded text content from a document without recursion.
```

`tests/setup.ts:868`

```text
-  * Detect whether any sibling list contains adjacent text nodes.
+  * Detects whether any sibling list contains adjacent text nodes.
```

`tests/setup.ts:891`

```text
-  * Measure the greatest element nesting depth in a document.
+  * Measures the greatest element nesting depth in a document.
```

### `src/core/HTML.ts:40` — `policy(no-malformed-summary)`, message `State what the symbol does without naming HTML in the first sentence.`

```text
- * Represents a parsed HTML document - the typed {@link HTMLDocument} AST plus the query
+ * Represents a parsed document - the typed {@link HTMLDocument} AST plus the query
```

### `src/core/constants.ts:469` (block opening at line 465) — `policy(no-banned-term)`, message `Replace just in this comment: delete.`

```text
- * so it can narrow this allowlisted attribute just as it narrows URL attributes without a
+ * so it can narrow this allowlisted attribute the way it narrows URL attributes without a
```

### `guides/html.md:318` — the prose sweep's `prose` rule, `prose carries no banned term: just (delete)`

```text
- | `a`                          | The link TEXT only; the destination `base` just resolved is gone
+ | `a`                          | The link TEXT only; the destination `base` resolved is gone
```

That is the only line touched in `guides/html.md`. The formatter repadded the row's trailing
whitespace; the table's other rows are unchanged.

## Item 4 — the bump

```diff
-	"version": "0.0.8",
+	"version": "0.0.9",
```

`package-lock.json` is untouched.

## The remaining diff, outside `tests/guides.test.ts` and `tests/setup.ts`

```diff
diff --git a/guides/html.md b/guides/html.md
index 42cb7c0..8ab057b 100644
--- a/guides/html.md
+++ b/guides/html.md
@@ -315,7 +315,7 @@ There are two renderers, and they are not equivalent. `renderHTML` is the struct
 | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
 | `h1` … `h6`                  | A bare line, at no level — indistinguishable from a paragraph or a list item                                                                                             |
 | `ul` / `ol` / `li`           | One line per block inside each item, with no marker, no ordinal, no nesting depth                                                                                        |
-| `a`                          | The link TEXT only; the destination `base` just resolved is gone                                                                                                         |
+| `a`                          | The link TEXT only; the destination `base` resolved is gone                                                                                                              |
 | `img`                        | Nothing — `alt` text is an attribute, and attributes do not project                                                                                                      |
 | `table` / `tr` / `th` / `td` | Tabs preserve direct cell positions, including empty cells, and newlines preserve rows; a `th` is indistinguishable from a `td`, and spans and attributes do not survive |
 | `pre` / `code`               | Whitespace beneath `pre` stays verbatim; standalone `code` collapses normally; neither gains a fence or language marker                                                  |
diff --git a/package.json b/package.json
index 15ae472..65496e3 100644
--- a/package.json
+++ b/package.json
@@ -1,6 +1,6 @@
 {
 	"name": "@orkestrel/html",
-	"version": "0.0.8",
+	"version": "0.0.9",
 	"description": "A typed HTML AST: total parsing, canonical rendering, sanitizing against a fixed floor, and distilling a page to the content a language model should read.",
 	"keywords": [
 		"ast",
@@ -70,7 +70,8 @@
 		"test:probe": "vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe",
 		"test:bench": "vitest bench --config vite.config.ts --no-cache --project probe",
 		"prepack": "npm run build",
-		"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup"
+		"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup",
+		"docs": "node --experimental-strip-types scripts/docs.ts"
 	},
 	"dependencies": {
 		"@orkestrel/contract": "^0.0.16"
diff --git a/src/core/HTML.ts b/src/core/HTML.ts
index c7ae1ae..e5dd4de 100644
--- a/src/core/HTML.ts
+++ b/src/core/HTML.ts
@@ -38,7 +38,7 @@ import {
 import { parseDocument, parseProvenance } from './parsers.js'
 
 /**
- * Represents a parsed HTML document - the typed {@link HTMLDocument} AST plus the query
+ * Represents a parsed document - the typed {@link HTMLDocument} AST plus the query
  * (`walk` / `find` / `filter` / `reduce`), rewrite (`map`), fold, streaming, and
  * document-shaping (`sanitize` / `distill`) operations {@link HTMLInterface} declares.
  *
diff --git a/src/core/constants.ts b/src/core/constants.ts
index a7642c2..ce50f62 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -466,7 +466,7 @@ export const TABLE_ALIGNMENTS: readonly string[] = Object.freeze(['center', 'lef
  * Lists the elements on which a sanitized `align` attribute is honored. Although `align` is
  * obsolete presentational HTML, its cell-only scope is a smaller security surface than a
  * style declaration allowlist. `sanitizeAttributes` already receives the owning element,
- * so it can narrow this allowlisted attribute just as it narrows URL attributes without a
+ * so it can narrow this allowlisted attribute the way it narrows URL attributes without a
  * per-element policy mechanism.
  */
 export const TABLE_CELL_ELEMENTS: readonly string[] = Object.freeze(['td', 'th'])
```

## Acceptance criteria

### 1. `git status --short` lists the P21 repair list plus this unit's edits and nothing else

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M guides/html.md
 M package.json
 M src/core/HTML.ts
 M src/core/constants.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

The rows beyond the P21 list are `tests/guides.test.ts` (item 2), `tests/setup.ts`,
`src/core/HTML.ts`, `src/core/constants.ts`, and `guides/html.md` (item 3), and `package.json`
carries both the repair's `docs` script row and item 4's version. `git diff -U0 -- tests/setup.ts`
filtered to changed lines outside a doc block returns nothing, so that file's change is comment
prose alone.

### 2. `format:check`, `oxlint`, and `check`

`npm run format:check` — exit 0:

```text
Checking formatting...

All matched files use the correct format.
Finished in 4200ms on 47 files using 4 threads.
```

`npx oxlint --config .oxlintrc.json --deny-warnings .` — exit 0, no output. `npm run lint:check`,
which wraps the same invocation, also exits 0.

`npm run check` — exit 0:

```text
> @orkestrel/html@0.0.9 check
> tsc --noEmit --project tsconfig.json && npm run check:src


> @orkestrel/html@0.0.9 check:src
> npm run check:src:core


> @orkestrel/html@0.0.9 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

### 3. `test:guides`, `test:policy`, `test:config`

`npm run test:guides` — exit 0:

```text
 Test Files  1 passed (1)
      Tests  32 passed (32)
   Duration  1.45s (transform 661ms, setup 725ms, import 323ms, tests 187ms, environment 0ms)
```

`npm run test:policy` — exit 0:

```text
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  1.56s (transform 882ms, setup 824ms, import 199ms, tests 338ms, environment 0ms)
```

`npm run test:config` — exit 0:

```text
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
   Duration  6.35s (transform 1.07s, setup 716ms, import 842ms, tests 4.59s, environment 0ms)
```

Observation, beyond the criteria: `npm run test:setup` — exit 0, `Tests 29 passed (29)` — run
because item 3 edited `tests/setup.ts`.

### 4. `npm run docs` reads a non-zero `rows read` and exits 1

Exit 1, terminal line `rows read: 1, disagreements found: 104`. The worklist's source text for
`class HTML` and for `const TABLE_CELL_ELEMENTS` carries item 3's rewrites; both rows already read
`guide absent`, so the disagreement total is the one P21 recorded. Verbatim, every line the command
printed:

```text

> @orkestrel/html@0.0.9 docs
> node --experimental-strip-types scripts/docs.ts

guides/html.md interface HTMLAttribute: guide absent source "Represents one attribute of an `ElementNode` - its `name` and, when the source wrote one, its `value`."
guides/html.md interface HTMLStartTag: guide absent source "Represents one unambiguous start tag parsed directly from source without recovery."
guides/html.md interface HTMLTag: guide absent source "Represents one start or close tag returned by the total, recovering `scanTag` scanner."
guides/html.md interface ElementNode: guide absent source "Represents an element - `<p>`, `<table>`, `<my-widget>`, or any other tag, known or custom."
guides/html.md interface TextNode: guide absent source "Represents a run of character data - the leaf node. `value` is the decoded text: numeric and semicolon-terminated WHATWG named character references are already resolved (an unknown named reference stays literal), and the renderer re-encodes `&`, `<`, and `>` on the way out."
guides/html.md interface CommentNode: guide absent source "Represents a comment - `<!-- … -->`. `value` is the comment's verbatim inner text, never decoded and never parsed as markup. The parser constructs only representable values: they never begin with an abrupt `>` / `->` close and never contain `-->` / `--!>`, so rendering and reparsing a parser-produced comment preserves it exactly. A hand-built value can violate that invariant, in which case the renderer drops it rather than emit a breakout. A bogus comment (`<?…>`, a non-doctype `<!…>`, or a CDATA section) recovers to this same node, which is why the AST needs no processing instruction or CDATA category of its own."
guides/html.md interface DoctypeNode: guide absent source "Represents a document type declaration - `<!DOCTYPE html>` and its legacy public/system forms."
guides/html.md interface HTMLDocument: guide absent source "Represents the root of a parsed AST - the ordered children of the whole input, whether that input was a full page or one fragment. The value `HTMLInterface.document` holds."
guides/html.md type HTMLNode: guide absent source "Represents any node in an HTML AST - the `HTMLDocument` root or one of its descendants. The exhaustive set every guard, traversal, fold table, and renderer covers, discriminated by `category`."
guides/html.md interface HTMLSpan: guide absent source "Represents a half-open region of the original HTML input, measured in UTF-16 code units."
guides/html.md type HTMLSource: guide absent source "Carries a normalized HTML source beside the boundary map back to its original input."
guides/html.md interface HTMLOpenPosition: guide absent source "Describes one open element occurrence located across the parser's represented and depth-overflow stacks."
guides/html.md interface HTMLScan: guide absent source "Describes the node and close boundary returned by a scanner that produces one leaf node."
guides/html.md type HTMLParseResult: guide absent source "Carries the parsed document and its original-input node regions."
guides/html.md type HTMLDerivation: guide absent source "Carries a derived value and the source of each rebuilt node."
guides/html.md interface HTMLRawText: guide absent source "Describes the text, source region, and close boundary returned by a raw-text scan."
guides/html.md type HTMLHandler: guide absent source "Represents a fold handler for one node category - receives the node and its children ALREADY folded to `T`, and produces the node's own `T`. The building block of an `HTMLHandlerMap` table."
guides/html.md interface HTMLHandlerMap: guide absent source "Represents the total fold table for `HTMLInterface.fold` - one `HTMLHandler` per node category, keyed by that category. Every key is required, because a fold is total over the AST: there is no node it may skip."
guides/html.md type HTMLRewriteHandler: guide absent source "Represents a copy-on-write node rewrite applied bottom-up by `HTMLInterface.map` - receives one node whose children have already been rewritten and returns its replacement: the same node unchanged, or a new one."
guides/html.md type HTMLPruneHandler: guide absent source "Represents a bottom-up pruning handler applied by `pruneDocument` - receives one node whose children have already been pruned and returns the nodes that replace it."
guides/html.md interface HTMLSanitizeOptions: guide absent source "Describes the options for `HTMLInterface.sanitize`. Each allowlist key REPLACES its default rather than extending it, so a caller who passes one narrows or redirects that one axis and leaves the others alone."
guides/html.md interface HTMLDistillOptions: guide absent source "Describes the options for `HTMLInterface.distill` - the content-extraction pass that reduces a page to the prose a reader (or a language model) actually wants."
guides/html.md interface HTMLInterface: guide absent source "Represents a parsed HTML document: the typed `HTMLDocument` AST plus the query, rewrite, fold, and reduction operations over it."
guides/html.md const HTML_WHITESPACE: guide absent source "Lists the code points HTML treats as syntax whitespace."
guides/html.md const VOID_ELEMENTS: guide absent source "Lists the elements that cannot have children - a start tag is the whole element and a close tag for one is discarded. Voidness is looked up here rather than stored on `ElementNode`, so a node can never disagree with its own tag name, and the renderer writes `<br>` (never `<br/>` and never a close tag) for every member."
guides/html.md const RAW_ELEMENTS: guide absent source "Lists the elements whose content is raw text: everything up to the matching close tag - which is recognized case-insensitively - becomes one verbatim `TextNode` with no tag scanning and no character-reference decoding inside. This is the parser's most important safety boundary, so the renderer refuses to write a raw body that itself contains that close tag sequence rather than emit markup that would reopen the element."
guides/html.md const LITERAL_ELEMENTS: guide absent source "Lists the elements whose content is literal text - one `TextNode` up to the matching close tag, with character references decoded but no markup parsed. They differ from `RAW_ELEMENTS` only by that decoding: `<title>a &amp; b</title>` holds `a & b`."
guides/html.md const BLOCK_ELEMENTS: guide absent source "Lists the elements that carry document structure rather than inline content. They are the elements that implicitly close an open `p` (see `IMPLIED_CLOSERS`) and the boundaries across which the distiller collapses whitespace instead of preserving it."
guides/html.md const IMPLIED_CLOSERS: guide absent source "Holds the implied end-tag table: for each element that can be left open, the start tags whose arrival closes it. An incoming start tag collects one candidate per row that lists it, the innermost open instance of that row's element, so a candidate sitting beneath elements the table never names is still collected. The parser rules each candidate against its own `IMPLIED_BARRIERS` row, drops one holding a barrier open inside it, and closes out to the shallowest candidate that survives - carrying every element still open inside that one with it. That is how `<p>one<p>two`, `<li>a<li>b`, `<dt>t<dd>d`, and a bare `<tr><td>x<td>y` recover into the structure their author meant, how `<p><b>x<div>y` closes the open `b` element along with the paragraph, and how `<table><tr><td><p><button>x<td>y` still closes the cell after the button barrier rules the paragraph out. An open `p` maps to the whole `BLOCK_ELEMENTS` collection rather than to a second copy of it, so the two can never drift apart."
guides/html.md const IMPLIED_BARRIERS: guide absent source "Bounds each implied-close search at containers that protect matching ancestors."
guides/html.md const SAFE_ELEMENTS: guide absent source "Lists the default element allowlist for `sanitize` - the document vocabulary that survives unchanged. A safe element outside this set is unwrapped to its children rather than dropped, so `HTMLSanitizeOptions.elements` narrows what is KEPT without ever destroying content; `UNSAFE_ELEMENTS` is the separate, unlowerable list of subtrees that are removed whole."
guides/html.md const SAFE_ATTRIBUTES: guide absent source "Lists the default attribute allowlist for `sanitize` - the attributes that describe content rather than fetch, script, or style it. Deliberately narrow: no `id`, no `style`, no event handler, and no resource `src`, so a sanitized `img` keeps its `alt` text and loses its download. `class` is kept because it is inert after `style`, `link`, `svg`, and `script` are gone and it is where a code block declares its language (`class=\"language-ts\"`)."
guides/html.md const TABLE_ALIGNMENTS: guide absent source "Lists the closed values a sanitized table-cell `align` attribute may carry. This finite vocabulary keeps alignment validation to exact string normalization and membership: the sanitizer deliberately gains no CSS or value-grammar parser and no general styling policy axis."
guides/html.md const TABLE_CELL_ELEMENTS: guide absent source "Lists the elements on which a sanitized `align` attribute is honored. Although `align` is obsolete presentational HTML, its cell-only scope is a smaller security surface than a style declaration allowlist. `sanitizeAttributes` already receives the owning element, so it can narrow this allowlisted attribute the way it narrows URL attributes without a per-element policy mechanism."
guides/html.md const SAFE_URL_SCHEMES: guide absent source "Lists the URL schemes a sanitized document may name. A relative URL - anything without a `scheme:` prefix, excluding the protocol-relative forms - is always allowed; every other scheme is refused. `HTMLSanitizeOptions.schemes` replaces this set but can never admit `javascript:`, `data:`, `vbscript:`, or `file:`, which are refused outright."
guides/html.md const URL_ATTRIBUTES: guide absent source "Lists the attributes whose value is a URL, and therefore the values `sanitize` decodes, strips of ASCII whitespace and control characters, and scheme-checks before keeping, and that `distill` resolves against `HTMLDistillOptions.base`. `action` and `formaction` are listed even though their elements are removed whole, because a hand-built AST can carry them anywhere."
guides/html.md const UNSAFE_ELEMENTS: guide absent source "Names the hard floor of `sanitize`: elements whose entire subtree is removed, never unwrapped, no matter what `HTMLSanitizeOptions` allows. Unwrapping is what makes these dangerous - the body of a `script`, `style`, `template`, or `noscript` is text that becomes live markup the moment its wrapper disappears - so the content goes with the element. Foreign content (`svg`, `math`) is here because this AST has no namespaces to police, and the form and metadata elements are here because they act rather than describe."
guides/html.md const CONTENT_ELEMENTS: guide absent source "Lists the default element set `distill` keeps as content: prose, headings, lists, tables, code, and the inline marks that carry meaning. Everything else safe is unwrapped to its children, which is how wrapper soup melts while its text survives. Definition lists are included because a documentation page's terms and definitions are content, not chrome."
guides/html.md const BOILERPLATE_ELEMENTS: guide absent source "Lists the default regions `distill` removes whole - the navigation, banner, and margin furniture that surrounds an article rather than belonging to it. Unlike the content set, these are dropped with their children: a navigation menu's link text is noise in every reading of the page."
guides/html.md const REGION_ELEMENTS: guide absent source "Lists the content regions `distill` tries in priority order when re-rooting a document. A region qualifies only when it occurs exactly once."
guides/html.md const NAMED_ENTITIES: guide absent source "Holds the semicolon-terminated named character references from the WHATWG HTML set, keyed by name without the leading `&` or trailing `;`. The parser decodes them in text, attribute values, and literal-text elements through a frozen own-property record. Unknown and prototype-like names stay literal."
guides/html.md const MAX_DEPTH: guide absent source "Names the recursion depth the parser, the traversals, and the renderers honor before they stop descending - the bound that keeps pathological input (thousands of nested `div`s, a fuzzer's tag soup) from exhausting the call stack. Past this depth the parser appends content to the deepest allowed element instead of nesting further, so parsing stays total and no text is lost."
guides/html.md const isHTMLAttribute: guide absent source "Determines whether an arbitrary value is a structurally valid HTML attribute."
guides/html.md function isHTMLCodePoint: guide absent source "Determines whether a code point may appear in an unambiguous HTML source token."
guides/html.md const isTextNode: guide absent source "Determines whether an arbitrary value is a structurally valid text node."
guides/html.md const isCommentNode: guide absent source "Determines whether an arbitrary value is a structurally valid comment node."
guides/html.md const isDoctypeNode: guide absent source "Determines whether an arbitrary value is a structurally valid doctype node."
guides/html.md function isHTMLNode: guide absent source "Determines whether an arbitrary value is a valid HTML node."
guides/html.md function isHTMLDocument: guide absent source "Determines whether an arbitrary value is a valid HTML document."
guides/html.md function isElementNode: guide absent source "Determines whether an arbitrary value is a valid element node."
guides/html.md function parseDocument: guide absent source "Parses an HTML string into a total, depth-bounded document AST."
guides/html.md function parseProvenance: guide absent source "Parses an HTML string with original-input node regions."
guides/html.md function normalizeSource: guide absent source "Normalizes an HTML input and maps each normalized boundary to its original UTF-16 offset."
guides/html.md function projectSpan: guide absent source "Projects a normalized half-open region through an original-input boundary map."
guides/html.md function findOpenPosition: guide absent source "Finds the deepest open occurrence of an element name across the parser's two stacks."
guides/html.md function projectDepth: guide absent source "Projects one stack position onto the single depth scale both stacks compare on."
guides/html.md function lowercaseASCII: guide absent source "Lowercases only ASCII uppercase characters, preserving every other code point exactly."
guides/html.md function isVoidElement: guide absent source "Determines whether an element name is void."
guides/html.md function isRawElement: guide absent source "Determines whether an element name contains verbatim raw text."
guides/html.md function isLiteralElement: guide absent source "Determines whether an element name contains decoded literal text."
guides/html.md function isBlockElement: guide absent source "Determines whether an element name is a block boundary."
guides/html.md function isEmptyElement: guide absent source "Checks whether an element has no child nodes."
guides/html.md function decodeEntities: guide absent source "Decodes numeric and semicolon-terminated WHATWG named character references in a string."
guides/html.md function scanAttributes: guide absent source "Scans an attribute source segment into ordered, first-wins attributes."
guides/html.md function parseStartTag: guide absent source "Parses one unambiguous start tag without recovery under the package's ASCII tag-name grammar."
guides/html.md function scanTag: guide absent source "Scans one complete start or close tag."
guides/html.md function scanComment: guide absent source "Scans a standard or bogus HTML comment."
guides/html.md function scanDoctype: guide absent source "Scans an HTML doctype with optional public and system identifiers."
guides/html.md function scanRawText: guide absent source "Scans text through the case-insensitive matching close tag of a raw or literal element."
guides/html.md function encodeText: guide absent source "Encodes the characters that have markup meaning in HTML text."
guides/html.md function encodeAttribute: guide absent source "Encodes the characters that have markup meaning in a double-quoted HTML attribute."
guides/html.md function sanitizeURL: guide absent source "Decodes and inspects a URL against an explicit scheme allowlist and a fixed dangerous floor."
guides/html.md function isSafeURL: guide absent source "Determines whether a URL is relative or uses an allowed non-dangerous scheme."
guides/html.md function resolveURL: guide absent source "Resolves a URL through the platform WHATWG URL implementation."
guides/html.md function attributeOf: guide absent source "Finds an element attribute without case sensitivity."
guides/html.md function sanitizeAttributes: guide absent source "Filters an element's attributes down to the ones a sanitized document may carry."
guides/html.md function resolveAttributes: guide absent source "Resolves an element's URL attributes against a base URL."
guides/html.md function collapseSpace: guide absent source "Collapses a run of whitespace to one inter-word space and removes edge whitespace."
guides/html.md function renderHTML: guide absent source "Serializes an HTML node to canonical, safety-bounded HTML."
guides/html.md function renderText: guide absent source "Projects an HTML node to structural plain text."
guides/html.md function walkNodes: guide absent source "Walks an HTML node depth-first in pre-order, including the supplied root."
guides/html.md function foldNode: guide absent source "Folds an HTML node bottom-up through a total handler table."
guides/html.md function rewriteDocument: guide absent source "Rewrites a document bottom-up with copy-on-write identity preservation."
guides/html.md function mergeText: guide absent source "Restores the no-adjacent-text invariant in a rebuilt list of siblings."
guides/html.md function collapseText: guide absent source "Collapses the whitespace runs inside each direct text child of a sibling list."
guides/html.md function extractRegion: guide absent source "Re-roots a document at the sole occurrence of one of the named region elements."
guides/html.md function pruneDocument: guide absent source "Rebuilds a document bottom-up, letting each node become any number of nodes."
guides/html.md const attributeShape: guide absent source "Describes the shape of an `HTMLAttribute` - an element attribute's name and, when the source wrote one, its value. `value` is optional: its absence is what distinguishes `<input disabled>` from `<input disabled=\"\">`."
guides/html.md const textShape: guide absent source "Describes the shape of a `TextNode` - the decoded character-data leaf."
guides/html.md const commentShape: guide absent source "Describes the shape of a `CommentNode` - the verbatim, never-decoded comment leaf a bogus comment also recovers to."
guides/html.md const doctypeShape: guide absent source "Describes the shape of a `DoctypeNode` - the declared root name plus the optional public and system identifiers of a legacy declaration."
guides/html.md function createHTML: guide absent source "Creates an HTML handle from an HTML string or an already-parsed `HTMLDocument` - the typed AST plus the query, rewrite, fold, streaming, and shaping operations `HTMLInterface` exposes."
guides/html.md class HTML: guide absent source "Represents a parsed document - the typed `HTMLDocument` AST plus the query (`walk` / `find` / `filter` / `reduce`), rewrite (`map`), fold, streaming, and document-shaping (`sanitize` / `distill`) operations `HTMLInterface` declares."
guides/html.md HTMLInterface.span: guide absent source "Returns the original-input region that produced a node in this handle's tree."
guides/html.md HTMLInterface.walk: guide absent source "Provides THE deep traversal - a lazy, depth-first, pre-order, root-inclusive `Generator` over every `HTMLNode` in the document. The sync `for (const node of html.walk())` surface is also consumable by `for await (const node of html.walk())`, so an async pipeline needs no second iterator. Contrast `HTMLInterface.stream`, which is shallow and backpressured."
guides/html.md HTMLInterface.find: guide absent source "Finds the first node (depth-first, pre-order) narrowed by a type guard."
guides/html.md HTMLInterface.filter: guide absent source "Collects every node (depth-first, pre-order) narrowed by a type guard."
guides/html.md HTMLInterface.map: guide absent source "Rewrites the AST bottom-up (copy-on-write) and returns a new `HTMLInterface`. A rewrite that returns its node unchanged shares that subtree instead of copying it."
guides/html.md HTMLInterface.reduce: guide absent source "Reduces the AST depth-first, pre-order into one accumulated value."
guides/html.md HTMLInterface.fold: guide absent source "Runs a total catamorphism over the document using an `HTMLHandlerMap` table."
guides/html.md HTMLInterface.stream: guide absent source "Returns a web-standard `ReadableStream` over the root's direct children (shallow, source order) - a lazy, pull-based, backpressure-respecting source. A fresh, independently replayable stream every call; never mutates the document."
guides/html.md HTMLInterface.sanitize: guide absent source "Removes every unsafe element, attribute, and URL and returns a new `HTMLInterface`. The floor documented on `HTMLSanitizeOptions` holds whatever the options say."
guides/html.md HTMLInterface.distill: guide absent source "Extracts the page's content - sanitizing first, then pruning boilerplate, chrome, and wrappers per `HTMLDistillOptions` - and returns a new `HTMLInterface`."
guides/html.md pitch: readme absent tagline "A zero-runtime-dependency-beyond-`@orkestrel/contract`, types-first HTML parser, renderer, sanitizer, and distiller — a hand-written, index-based tokenizer that turns any HTML string into a typed AST held by an immutable `HTML` handle, plus standalone projections that write that AST back out (canonical HTML, or structural plain text). Source: `src/core`. Published through `@orkestrel/html`; surfaced in-repo through the `@src/core` barrel."
rows read: 1, disagreements found: 104
```

## Deviations

None. `repair` wrote exactly the P21 list, every before-text was found verbatim, every voice
diagnostic named a file this unit owns, `test:policy` reddened on no file outside the scope, and
every gate other than `docs` reads green.

## Ancillary decisions

- `src/core/HTML.ts`: the rule refuses the bare word `HTML` in the first sentence, and the symbol is
  named `HTML`, so no wording keeps that word. The sentence drops it and leans on the
  `{@link HTMLDocument}` tag that follows, which the guide renders as the `HTMLDocument` code token.
  Every other fact in the paragraph stands.
- `src/core/constants.ts`: `just as` there means "in the same way as", so deleting the word alone
  left a broken clause. The clause reads `the way it narrows URL attributes`, which carries the same
  meaning with no banned term.
- `guides/html.md:318`: `just` was deleted outright. `the destination `base` resolved is gone` keeps
  the row's claim.
- A noun-phrase opener became a verb chosen for what the declaration produces: `Holds` for a stored
  constant, `Describes` for a case-shape interface, `Lists` for an ordered collection.

## Wall clock

First command 2026-09-07T15:14:48Z, last command 2026-09-07T15:20:47Z: 5 minutes 59 seconds.

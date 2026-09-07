# Brief — P.2 `d7n-html-converge` (html under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/html` from the committed baseline `00f44e5` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.9`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/html.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/html/guides/html.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-html-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/html.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run, then carry the body in with `npm run docs -- --to source` and record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in scaffold's inline form (`fence.title !== undefined && titled.has(fence.title)`, no local predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: where the guide's § Tests lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
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
exit 1
```

## Facts for html (taken 2026-09-07T15:27Z by facts.sh)

- Checkout `/home/user/fleet/html`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `00f44e5`, status: clean
- `package.json`: version `0.0.9`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 38 | summary 37 | banned 1 | tests/setup.ts(36) src/core/constants.ts(1) src/core/HTML.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                 | Source                    | Tests                                 |
    8:| ------- | -------------------- | ------------------------- | ------------------------------------- |
    9:| HTML    | [`html.md`](html.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                |
    14:| ---------- | -------------------- |
    15:| `src/core` | [`html.md`](html.md) |
- Guide `guides/html.md`: 679 lines. Headings:
    1:# HTML
    9:## Surface
    11:### Types
    41:### Constants
    67:### Validators
    82:### Parsers
    91:### Helpers
    133:### Shapers
    144:### Factories
    152:### `HTML`
    156:## Methods
    160:#### `HTMLInterface`
    175:## The AST model
    191:## The parse pipeline
    224:### Depth degrade semantics
    238:## Roundtrip laws
    274:## The sanitize floor
    293:## The distill pass
    310:## Text is the lossy projection
    327:## Relationship with `@orkestrel/contract`
    336:## Patterns
    340:### Parse, then query
    357:### Adopt a document that came from somewhere else
    372:### Rewrite with `map`, count with `reduce`, project with `fold`
    398:### Stream the top level, shallow and backpressured
    415:### Sanitize, and watch the floor hold
    457:### Distill a page down to its content
    487:### Work on a bare node, with no handle at all
    538:### Scan by hand, one piece at a time
    582:### Escape, resolve, and inspect
    616:### Ask a name or an element a question
    642:### Prove the roundtrip laws
    663:## Tests
    674:## See also
- Table headers in `guides/html.md` (a header row is the row before a `| ---` row):
    15: | Name                  | Kind      | Shape                                                                                                                                                                                                                                           |
    45: | Name                   | Kind  | Behavior                                                                                                                                                                                                                                                                                               |
    71: | Name              | Kind     | Signature                                   | Behavior                                                                                                                                                                                   |
    86: | Name              | Kind     | Signature                           | Behavior                                                                                                                                                                                            |
    95: | Name                 | Kind     | Signature                                                                                                                                                  | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
    137: | Name             | Kind  | Builds                                                                                                   |
    148: | Name         | Kind     | Signature                                          | Behavior                                                                                                                   |
    162: | Method     | Returns                               | Behavior                                                                                                                                                                                                                                              |
    199: | Input                                                                                                                    | Behavior                                                                                                                          |
    248: | Construct                      | Canonical form                                                                                                                                     |
    265: | Hand-built violation                                          | Rendered as                                     |
    314: | Structure                    | In `renderText`'s output                                                                                                                                                 |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/html.md`):
    3: > A zero-runtime-dependency-beyond-`@orkestrel/contract`, types-first HTML parser, renderer, sanitizer, and distiller — a hand-written, index-based tokenizer that turns any HTML string into a typed AST held by an immutable `HTML` handle, plus standalone projections that write that AST back out (canonical HTML, or structural plain text). Source: [`src/core`](../src/core). Published through `@orkestrel/html`; surfaced in-repo through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    5: HTML here is: parse once into an `HTML` handle, then treat every output as a projection of it. `parseDocument` scans a page or a bare fragment — the same shape either way — into an `HTMLDocument`: a discriminated union of plain readonly node values keyed by `category`, the axis that varies. Parsing is TOTAL. Every input produces a document, so there are no parse options, no issue list, no strict mode, and no error path; strictness lives in the guards and in the renderer's refusals instead. Nothing is implied or inserted that the source did not write — no synthesized `html` / `head` / `body`, and a `<!DOCTYPE html>` is an ordinary child in source order — which is exactly why a fragment and a whole page need no mode switch between them. An `HTML` handle wraps that AST with query (`walk` / `find` / `filter` / `reduce`), rewrite (`map`), fold, and shallow streaming, and with the two document-shaping engines: `sanitize`, which enforces a security floor no option can lower, and `distill`, which extracts the prose a reader — or a language model — actually wants, and hands it back as a handle rather than a string, because the AST is what carries the structure. The renderers (`renderHTML`, `renderText`) are separate, downstream, standalone functions from AST → string; none of them assumes its input came from `parseDocument` on trusted markup, none of them throws, and every one of them degrades at a fixed depth cap rather than exhausting the call stack. The AST itself is the primary contract, with a from-unknown validation surface (`isHTMLNode` / `isHTMLDocument` / `isElementNode` / …) for the moment an AST arrives from somewhere other than this parser.
    7: That totality statement governs document parsing. `parseStartTag` is the separate fail-closed source boundary: it returns one unambiguous start tag within the package's deliberately narrow ASCII tag-name grammar and its exact end offset, or `undefined`, without adding a strict mode to `parseDocument` or changing `scanTag` recovery.
- README (`README.md`) first lines:
    # @orkestrel/html
    
    A typed HTML AST: parse any page or fragment into readonly nodes, render them back to canonical HTML
    or plain text, sanitize them against a floor no option can lower, and distill a page down to the
    prose a reader — or a language model — actually wants.
    
    - **Total parsing.** Every input produces a document. No parse options, no issue list, no error path:
      malformed markup recovers per a documented table instead of throwing.
    - **One AST, many projections.** Nodes are plain readonly data keyed by `category`; querying,
      rewriting, folding, streaming, sanitizing, and rendering are all operations over it.
    - **A real security floor.** `sanitize` removes unsafe subtrees whole, strips every handler and
      styling attribute, and decodes a URL before judging its scheme — whatever the options say.
- `## Patterns` fences, each with its nearest preceding heading:
    342: fence under "### Parse, then query"
    359: fence under "### Adopt a document that came from somewhere else"
    374: fence under "### Rewrite with `map`, count with `reduce`, project with `fold`"
    400: fence under "### Stream the top level, shallow and backpressured"
    417: fence under "### Sanitize, and watch the floor hold"
    459: fence under "### Distill a page down to its content"
    489: fence under "### Work on a bare node, with no handle at all"
    540: fence under "### Scan by hand, one piece at a time"
    584: fence under "### Escape, resolve, and inspect"
    618: fence under "### Ask a name or an element a question"
    644: fence under "### Prove the roundtrip laws"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/factories.ts:27:export function createHTML(input: string | HTMLDocument): HTMLInterface {
    src/core/HTML.ts:69:export class HTML implements HTMLInterface {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/shapers.ts:4
    src/core/factories.ts:1
    src/core/helpers.ts:2
    src/core/HTML.ts:5
- Drop-in sites (`tests/guides.test.ts`):
    69:} from '@orkestrel/guide'
    91:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    97:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    142:		for (const group of guide.methods()) {
    143:			const members = source.methods(group.interface).map((method) => method.name)
    151:					expect(findMissing(members, documented)).toEqual([])
    154:					expect(findMissing(documented, members)).toEqual([])
    160:							: findMissing(
    161:									source.methods(entity).map((method) => method.name),
    179:				findUnexampled(
    182:					source.examples().map((example) => example.name),
    187:		for (const group of guide.methods()) {
    192:					? source.examples(group.interface).map((example) => example.name)
    196:							.concat(source.examples(entity).map((example) => example.name))
    203:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    215:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 663:## Tests — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/html.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/html.md`, `README.md`, the doc blocks under `src/**` (description paragraphs, `@remarks`, and `@example` titles and bodies only — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-html-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.

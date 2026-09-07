# Brief — P.1 `d7n-html-prep` (html's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`implementer` on Claude Opus 5: a fully specified unit. Sole writer in `/home/user/fleet/html` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `d5caf72`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

html's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== html 2026-09-07T15:13:40Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
80:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 952ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### html (d5caf72, version 0.0.8, guide range ^0.0.17, head start 0.0.18)
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
   tests/setup.ts(36)
   src/core/constants.ts(1)
   src/core/HTML.ts(1)
-- docs
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
   guides/html.md class HTML: guide absent source "Represents a parsed HTML document - the typed `HTMLDocument` AST plus the query (`walk` / `find` / `filter` / `reduce`), rewrite (`map`), fold, streaming, and document-shaping (`sanitize` / `distill`) operations `HTMLInterface` declares."
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
-- check
   tests/guides.test.ts(150,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(153,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(157,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(172,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(187,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 5 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  5 failed | 27 passed (32)
   exit 1
-- test:policy
        × enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace 67ms
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) } ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) } ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
   exit 1
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 38 | summary 37 | banned 1 | tests/setup.ts(36) src/core/constants.ts(1) src/core/HTML.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
+318,	+     "message": "prose carries no banned term: just (delete)",	+     "path": "guides/html.md"
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for html (taken 2026-09-07T15:14Z by facts.sh)

- Checkout `/home/user/fleet/html`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `d5caf72`, status: clean
- `package.json`: version `0.0.8`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    143:			const members = source.methods(group.interface)
    150:					expect(findMissing(members, group.methods)).toEqual([])
    153:					expect(findMissing(group.methods, members)).toEqual([])
    157:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    172:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    175:		for (const group of guide.methods()) {
    185:							? source.examples(group.interface)
    186:							: source.examples(group.interface).concat(source.examples(entity))
    187:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    199:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 663:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` once, map the `examples` binding's records to names (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.8"` → `"version": "0.0.9"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-html-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.

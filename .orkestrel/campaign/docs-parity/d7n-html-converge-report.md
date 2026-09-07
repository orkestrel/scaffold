# Report — P.2 `d7n-html-converge`

Every item landed. `npm run docs` exits 0 at `rows read: 1, disagreements found: 0`, and both write
directions read `written: 0`. One source defect surfaced through the gate and is repaired: the
`distill` order in two doc blocks contradicted the code.

## Criterion 1 — red-first on the unconverged tree

`npm run test:guides` — exit 1, `Tests 3 failed | 32 passed (35)`. Each new case's first lines,
verbatim:

```text
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/html.md pairs: guide [\"Parse, then query\",\"Adopt a document that came from somewhere else\",\"Rewrite with map, count with reduce, project with fold\",\"Stream the top level, shallow and backpressured\",\"Sanitize, and watch the floor hold\",\"Distill a page down to its content\",\"Work on a bare node, with no handle at all\",\"Scan by hand, one piece at a time\",\"Escape, resolve, and inspect\",\"Ask a name or an element a question\",\"Prove the roundtrip laws\"] source []",
 ❯ tests/guides.test.ts:142:19

 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:156:20

 FAIL  |guides| tests/guides.test.ts > HTML > keeps every compared summary and example equal to its source
AssertionError: expected [ …(103) ] to deeply equal []
+   "guides/html.md interface HTMLAttribute: guide absent source \"Represents one attribute of an `ElementNode` - its `name` and, when the source wrote one, its `value`.\"",
 ❯ tests/guides.test.ts:288:24
```

The equality case reads 103 where `npm run docs` reads 104 because the pitch row is the seed's
`readme`/`tagline` comparison rather than a `findDrift(guide, source)` row; the README case is the
one that carries it.

Cases added to `tests/guides.test.ts`, each named for what it proves: `pairs at least one example
title across the guide and the source` (file scope, scaffold's inline form `fence.title !== undefined
&& titled.has(fence.title)`, no local predicate, both-sides failure line), `opens the README with the
guide tagline` (file scope, two `not.toBeUndefined()` guards before `toBe`), and `keeps every
compared summary and example equal to its source` (inside the manifest loop's `describe(entry.concept)`).
`findDrift` imported beside the existing readers; `GUIDE_SPEC = 'guides/html.md'` added at file
scope and used by the pin and the README case; `README.md` added to `ROOT_FILES`.

## Criterion 2 — the headers and the class rows

Every `## Surface` and `## Methods` table heads `Summary` beside only allowed columns:

| Table              | Header row                             |
| ------------------ | -------------------------------------- |
| `### Types`        | `Name \| Kind \| Shape \| Summary`     |
| `### Constants`    | `Name \| Kind \| Value \| Summary`     |
| `### Validators`   | `Name \| Kind \| Signature \| Summary` |
| `### Parsers`      | `Name \| Kind \| Signature \| Summary` |
| `### Helpers`      | `Name \| Kind \| Signature \| Summary` |
| `### Shapers`      | `Name \| Kind \| Summary`              |
| `### Factories`    | `Name \| Kind \| Signature \| Summary` |
| `### Classes`      | `Name \| Kind \| Summary`              |
| `#### HTMLInterface` | `Method \| Returns \| Summary`        |

`Behavior` was renamed to `Summary` in Validators, Parsers, Helpers, Factories, and the
`HTMLInterface` methods table; `Builds` was renamed to `Summary` in Shapers. The `| Input |
Behavior |` table in § The parse pipeline is outside `## Surface` and `## Methods` and was not
touched.

No `### Entities` table exists in this guide. `HTML` is the only class documented under its own H3,
so a `### Classes` table was added before the `### HTML` section, in the shape of
`/home/user/fleet/guide/guides/guide.md:202-213`, and its `Summary` cell is written from the class's
description paragraph.

## Criterion 3 — the cells and the doc blocks

Direction taken: every doc block whose description lacked what its guide cell stated was rewritten
first, then `npm run docs -- --to guide` propagated. `npm run docs -- --to guide` read
`rows read: 1, disagreements found: 103, written: 102, reported: 1` (the pitch, authored by hand),
followed by `npx oxfmt --write guides/html.md`; `npm run docs` then read
`rows read: 1, disagreements found: 1` (the pitch alone).

**Rows whose type literal stayed in `Shape`** — every row of `### Types`: `HTMLAttribute`,
`HTMLStartTag`, `HTMLTag`, `ElementNode`, `TextNode`, `CommentNode`, `DoctypeNode`, `HTMLDocument`,
`HTMLNode`, `HTMLSpan`, `HTMLSource`, `HTMLOpenPosition`, `HTMLScan`, `HTMLParseResult`,
`HTMLDerivation`, `HTMLRawText`, `HTMLHandler`, `HTMLHandlerMap`, `HTMLRewriteHandler`,
`HTMLPruneHandler`, `HTMLSanitizeOptions`, `HTMLDistillOptions`, `HTMLInterface`. The clause after
the em dash was removed from each cell, and the fact it carried was confirmed present in that
declaration's block or added to it.

Two `Shape` cells changed form to hold the one stated idiom (an interface's members in braces, a
type alias's value): `HTMLScan` from `` `HTMLScan<TNode extends HTMLNode>` = `{ node: TNode, next:
number }` `` to `` `{ node: TNode, next: number }` ``, with the `TNode extends HTMLNode` constraint
recorded in that interface's `@remarks`; and `HTMLHandlerMap` from the prose "One `HTMLHandler` per
category (…)" to `` `{ document, element, text, comment, doctype }` ``, that prose now being the
row's `Summary`.

**The `### Constants` `Value` column** carries the constant's own value where it reads in a cell —
`HTML_WHITESPACE`, `VOID_ELEMENTS`, `RAW_ELEMENTS`, `LITERAL_ELEMENTS`, `SAFE_ATTRIBUTES`,
`TABLE_ALIGNMENTS`, `TABLE_CELL_ELEMENTS`, `SAFE_URL_SCHEMES`, `URL_ATTRIBUTES`,
`BOILERPLATE_ELEMENTS`, `REGION_ELEMENTS`, `MAX_DEPTH` — and its type where the collection is too
long: `BLOCK_ELEMENTS`, `SAFE_ELEMENTS`, `UNSAFE_ELEMENTS`, `CONTENT_ELEMENTS` as `readonly
string[]`, `IMPLIED_CLOSERS` and `IMPLIED_BARRIERS` as `Readonly<Record<string, readonly string[]>>`,
`NAMED_ENTITIES` as `Readonly<Record<string, string>>`. The convention sentence sits in the section's
intro prose, worded against the rows that remain, as does the `Shape` idiom sentence for `### Types`.

**Blocks rewritten by hand**, by file:

- `src/core/types.ts` — `HTMLTag` (the recovered-`next` and no-attributes facts moved into a new
  `@remarks`), `TextNode` (description split, decoding and re-encoding detail to `@remarks`),
  `CommentNode` (description split, the representability invariant and the bogus-comment recovery to
  `@remarks`), `HTMLScan` (`@remarks` gained the `TNode` constraint), `HTMLDistillOptions` (pass
  order corrected), `HTMLInterface.walk` (description split, the async and `stream` contrast to
  `@remarks`), `HTMLInterface.fold` (the one-handler-per-category clause the cell carried), and
  `HTMLInterface.distill` (pass order corrected).
- `src/core/constants.ts` — `HTML_WHITESPACE`, `VOID_ELEMENTS`, `RAW_ELEMENTS`, `LITERAL_ELEMENTS`,
  `BLOCK_ELEMENTS`, `IMPLIED_CLOSERS`, `SAFE_ELEMENTS`, `SAFE_ATTRIBUTES`, `TABLE_ALIGNMENTS`,
  `TABLE_CELL_ELEMENTS`, `SAFE_URL_SCHEMES`, `URL_ATTRIBUTES`, `UNSAFE_ELEMENTS`, `CONTENT_ELEMENTS`,
  `BOILERPLATE_ELEMENTS`, `NAMED_ENTITIES`, `MAX_DEPTH` — each description reduced to the summary a
  table scanner needs, with every displaced sentence landing in `@remarks`. `BLOCK_ELEMENTS` gained
  the `renderText` line-boundary fact its cell carried; `TABLE_CELL_ELEMENTS` gained "whatever a
  caller's attribute allowlist names"; `SAFE_ATTRIBUTES` gained the `align` cell-and-value floor
  pointer; `MAX_DEPTH` gained the guards and both shaping engines; `HTML_WHITESPACE` gained the
  JavaScript-whitespace contrast. `REGION_ELEMENTS` and `IMPLIED_BARRIERS` were already in this
  shape and were left alone.
- `src/core/validators.ts` — `isHTMLCodePoint` (new `@remarks` naming the refused ranges),
  `isHTMLAttribute`, `isTextNode`, `isCommentNode`, `isDoctypeNode`, `isHTMLNode`, `isHTMLDocument`,
  `isElementNode` (each description enriched with what its cell stated: the closed record shape, the
  cycle check and `MAX_DEPTH` cap and void-element invariant, the narrowing and the adoption gate).
- `src/core/parsers.ts` — `parseDocument` (description gained the page-and-fragment sameness; new
  `@remarks` carrying totality, the recovery table, and the no-adjacent-text invariant),
  `parseProvenance` (new `@remarks` naming the single walk and the operation-owned map).
- `src/core/helpers.ts` — `normalizeSource`, `projectDepth`, `lowercaseASCII`, `isVoidElement`,
  `isRawElement`, `isLiteralElement`, `isBlockElement`, `isEmptyElement`, `decodeEntities`,
  `scanAttributes`, `parseStartTag`, `scanTag`, `scanComment`, `encodeText`, `encodeAttribute`,
  `sanitizeURL`, `isSafeURL`, `renderHTML`, `renderText`, `walkNodes`, `foldNode`, `pruneDocument`.
- `src/core/HTML.ts` — the class `@remarks` two-engines bullet (pass order corrected).
- `src/core/factories.ts` — `createHTML`'s `@example` (the titled pair, following).

No code token moved. `git diff -U0 -- src/` filtered to lines outside a doc comment returns nothing.

## Criterion 4 — the titled pair

The pair is `createHTML`'s `@example` block in `src/core/factories.ts` and the first fence under
`### Parse, then query` in `guides/html.md`. `createHTML` is the package's only `create*` export, so
it is the primary factory, and the first `## Patterns` fence demonstrating it sits under that
heading.

Checks before titling: `grep -n '^#\+ Parse, then query' guides/html.md` returned `352:### Parse,
then query` alone, so the heading text is unique heading-scoped; the fence body between its opening
and closing runs carries no three-backtick run and no `*/`, so it qualified and no later fence was
needed.

The title landed first — `npm run docs` then read
`guides/html.md Parse, then query: guide "ts\nimport { createHTML, isElementNode } …" source "ts\nimport { createHTML, renderText } …"`, `rows read: 1, disagreements found: 1`. The body followed
with `npm run docs -- --to source`, reading `rows read: 1, disagreements found: 1, written: 1,
reported: 0`, then `npx oxfmt --write src/core/factories.ts` and `npm run docs` at
`rows read: 1, disagreements found: 0`.

`grep -rn "@example \S" src/` returns `src/core/factories.ts:19: * @example Parse, then query`
alone, so every other block stays untitled.

## Criterion 5 — the tagline, the pitch, and the displaced sentences

The blockquote under both H1 headings, identical text and identical line breaks:

```text
> A types-first HTML toolkit: a hand-written, index-based tokenizer that turns any page or
> fragment into an immutable `HTML` handle over a typed AST, plus the sanitizer, the distiller,
> and the standalone renderers that project that AST back out as canonical HTML or structural
> plain text.
```

One noun phrase, plain text and code spans, no link and no bold.

**Displaced into the guide's opening prose**, appended to the paragraph after the blockquote and
restating none of the tagline's clauses: "The source is [`src/core`](../src/core), published through
`@orkestrel/html` and surfaced in-repo through the `@src/core` barrel, and `@orkestrel/contract` is
the one runtime dependency behind the guards, the shapes, and the containment (§ [Relationship with
`@orkestrel/contract`](#relationship-with-orkestrelcontract))."

**README.** The former opening paragraph ("A typed HTML AST: parse any page or fragment into readonly
nodes, render them back to canonical HTML or plain text, sanitize them against a floor no option can
lower, and distill a page down to the prose a reader — or a language model — actually wants.")
restated the tagline's clauses and was replaced by the blockquote plus the onboarding paragraph the
README alone carries: "Create a handle with the `createHTML` function, query it with `find` and
`filter`, reshape it with `map`, `sanitize`, or `distill`, and hand the result to `renderHTML` or
`renderText` when a string is what you need. Reach for `parseStartTag` where a fail-closed source
boundary matters more than recovery. Part of the `@orkestrel` line." The feature bullets, the
install, requirements, usage, laws, guide, package, and license sections are unchanged.

`npm run test:guides` after the README edit — exit 0, `Tests 35 passed (35)`.

## § Tests

The `tests/guides.test.ts` row in the guide's § Tests now reads: "this guide against the real surface
in both directions, and the equality gate: every `Summary` cell against its declaration's description
paragraph, the titled `Parse, then query` fence against the `@example` block of that title (pinned so
the titled pair cannot be retired silently), and the README pitch against this guide's tagline. It
also runs the flagship fences and asserts the values their comments claim." No SQ/MQ/EQ/RQ identifier.

## Criterion 6 — the seed

```text
$ npm run docs                       exit 0: rows read: 1, disagreements found: 0
$ npm run docs -- --to guide         exit 0: rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source        exit 0: rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — the gates

```text
$ npx oxfmt --check guides/html.md README.md tests/guides.test.ts src/core                 exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings guides/html.md README.md tests/guides.test.ts src/core   exit 0
$ npm run check                                                                            exit 0
$ npm run format:check                                                                     exit 0
$ npm run test:guides        exit 0: Test Files 1 passed (1), Tests 35 passed (35)
$ npm run test:policy        exit 0: Test Files 1 passed (1), Tests 90 passed | 1 skipped (91)
```

Observation, beyond the criteria: `npm run test:src:core` — exit 0, `Test Files 7 passed (7), Tests
312 passed (312)`.

## Criterion 8 — the tree

`git status --short`:

```text
 M README.md
 M guides/html.md
 M src/core/HTML.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/parsers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
```

Owned files only. `package.json`, `package-lock.json`, `guides/README.md`, `tests/setup*.ts`,
`tests/src/**`, and every vendored file are untouched.

`git diff --stat`:

```text
 README.md              |  12 ++-
 guides/html.md         | 270 ++++++++++++++++++++++++++-----------------------
 src/core/HTML.ts       |   4 +-
 src/core/constants.ts  | 201 ++++++++++++++++++++++--------------
 src/core/factories.ts  |  16 ++-
 src/core/helpers.ts    |  86 ++++++++++++----
 src/core/parsers.ts    |  13 ++-
 src/core/types.ts      |  70 ++++++++-----
 src/core/validators.ts |  27 +++--
 tests/guides.test.ts   |  75 +++++++++++++-
 10 files changed, 509 insertions(+), 265 deletions(-)
```

## Defects met

**No reader or seed defect.** `findDrift`, `replaceCell`, `replaceSummary`, and `replaceExample`
behaved exactly as the brief describes over every table shape in this guide, including the
four-column tables with escaped pipes and nested code spans, and both write directions are
idempotent.

**One source defect, repaired.** The seed line that surfaced it, after the header rename and before
the write:

```text
guides/html.md HTMLInterface.distill: guide "Extracts the page's content — regions and hidden chrome pruned, then sanitized, then re-rooted, then reduced to the content vocabulary — and returns a NEW handle, never a string (§ The distill pass)." source "Extracts the page's content - sanitizing first, then pruning boilerplate, chrome, and wrappers per `HTMLDistillOptions` - and returns a new `HTMLInterface`."
```

The two sides disagreed on the pass order, so the write would have carried a false claim into the
guide. `HTML.distill` in `src/core/HTML.ts` runs `pruneDocument(#pruneRegion)`, then `sanitize()`,
then `extractRegion`, then the content prune, so the guide's cell was right and the doc block was
wrong. `src/core/HTML.ts:255-267` (the method's own block) and `guides/html.md` § The distill pass
already stated the correct order and explain why it is necessary: `hidden` and `aria-hidden` are
outside `SAFE_ATTRIBUTES`, so sanitizing first would consume the evidence the chrome prune reads.

Repaired at the three sites carrying the wrong order — `HTMLDistillOptions`'s `@remarks` and
`HTMLInterface.distill`'s description in `src/core/types.ts`, and the two-engines bullet in
`src/core/HTML.ts`'s class `@remarks` — then re-propagated:

```text
$ npm run docs                exit 1: rows read: 1, disagreements found: 1
$ npm run docs -- --to guide  exit 1: rows read: 1, disagreements found: 1, written: 1, reported: 0
$ npx oxfmt --write guides/html.md
$ npm run docs                exit 0: rows read: 1, disagreements found: 0
```

## Ancillary decisions

- **The `### Constants` table gained a `Value` column** rather than folding the type literal into the
  description. `Value` is an allowed neighbour of `Summary`, and the alternative loses
  `HTML_WHITESPACE`'s `' \t\n\f\r'`, `MAX_DEPTH`'s `64`, and every allowlist's membership from the
  guide with nothing gained.
- **The section pointers the old cells carried moved into each section's intro prose.** A `Summary`
  cell equals a doc block, and a doc block cannot link a guide anchor, so the `§ Depth degrade
  semantics`, `§ The AST model`, `§ The sanitize floor`, `§ The distill pass`, `§ The parse
  pipeline`, `§ Roundtrip laws`, and `§ Text is the lossy projection` references that sat inside
  cells now sit in the intro paragraph of `### Types`, `### Constants`, `### Parsers`, `### Helpers`,
  and `## Methods`. Nothing a reader could reach before is unreachable.
- **`createHTML`'s former `renderText` example was replaced** by the `Parse, then query` fence body
  the ruling requires. The same call is demonstrated in the README's usage fence and in the guide's
  `### Work on a bare node, with no handle at all` section, so no demonstration was lost.
- **The description-length bar** was set at the summary a table scanner needs: what the declaration
  is or does, with an example, an edge case, a rationale, or a population walk moved to `@remarks`.
  Every displaced sentence was kept.
- **`VOID_ELEMENTS`'s members are written out in `Value`** rather than left as `readonly string[]`;
  the old cell's `(area … wbr)` hint is thereby kept exactly rather than approximately.

## Deviations

None. No cell resisted location after the header change, no titled body was rejected by its block, no
test outside `tests/guides.test.ts` reddened, no vendored file needed an edit, no reader returned an
undescribed shape, and no residual disagreement survived a doc-block rewrite under the P16
comparator.

Per the template correction, no lint control was planted; `git status --short` carries this unit's
edits alone, so the Orchestrator's reading is clean.

## Wall clock

First command 2026-09-07T15:29:43Z, last command 2026-09-07T15:46:32Z: 16 minutes 49 seconds.


---

## Orchestrator annotation (slice 3 audit, 2026-09-07)

The audit read counts in this report's prose against the writing ban (and, in html's converge report, two sentences disagreeing on the `distill` sites); the tree is authoritative. The report stands as the unit's evidence with this note.

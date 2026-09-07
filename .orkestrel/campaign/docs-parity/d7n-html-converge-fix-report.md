# Report — `d7n-html-converge-fix`

Every item landed and every acceptance criterion is green in the tree left at
`/home/user/fleet/html` (uncommitted, working tree only). No deviation.

## Item 1 — counts and all-caps (claim 9)

Counts named or dropped, source first and propagated with `npm run docs -- --to guide`:

| Site | Was | Is |
| --- | --- | --- |
| `guides/html.md:16` | "the two option interfaces in § …" | "and the option interfaces in § …" |
| `src/core/constants.ts` `MAX_DEPTH` → `guides/html.md:68` | "and both shaping engines honor" | "and the sanitize and distill engines honor" |
| `src/core/helpers.ts` `findOpenPosition` → `guides/html.md:102` | "across the parser's two stacks" | "across the parser's represented and depth-overflow stacks" |
| `src/core/helpers.ts` `projectDepth` → `guides/html.md:103` | "the single depth scale both stacks compare on" | "the single depth scale the represented and depth-overflow stacks compare on" |
| `guides/html.md:170` | "The two shaping methods are worked through" | "The shaping methods are worked through" |
| `guides/html.md:8` | "the two document-shaping engines:" | "the document-shaping engines:" |
| `guides/html.md:199` | "(both engines do)" | "(the sanitize and distill engines do)" |
| `guides/html.md:288` | "Underneath all three sits a floor" | "Underneath every one of them sits a floor" |
| `guides/html.md:303` | "all four protocol-relative forms" | "every protocol-relative form" |
| `guides/html.md:324` | "There are two renderers, and they are not equivalent." | "`renderHTML` and `renderText` are not equivalent." |
| `guides/html.md:344` | "both shaping engines in `HTML.ts`" | "the sanitize and distill engines in `HTML.ts`" |
| `guides/html.md:679` | "both renderers including the hand-built-AST refusals" | "`renderHTML` and `renderText` including the hand-built-AST refusals" |
| `guides/html.md:681`, `:684` | "in both directions" | "in each direction" |
| `src/core/constants.ts` `IMPLIED_CLOSERS` | "so the two can never drift apart" | "so the row and the collection can never drift apart" |
| `src/core/types.ts` `HTMLOpenPosition` | "so the two fields are read together" | "so the fields are read together" |
| `src/core/types.ts` `HTMLInterface` | "(the two document-shaping engines)" | "(the document-shaping engines)" |
| `src/core/HTML.ts` class block | "**The two engines.**" | "**The engines.**" |

Every word the objective lane listed is lowered. `ALREADY` (`types.ts` `HTMLHandler`),
`REPLACES` (`types.ts` `HTMLSanitizeOptions`, `HTML.ts` `sanitize`, `guides/html.md:288`,
`:301`), `THE` (`types.ts` `HTMLInterface.walk`, `HTML.ts` `walk`, `helpers.ts` `walkNodes`),
`DEFAULTS` (`HTML.ts` `distill`, `types.ts` `HTMLDistillOptions`, `guides/html.md:312`),
`EXACTLY` (`helpers.ts` `extractRegion`, `guides/html.md:313`), `BEFORE` (`HTML.ts` `distill`,
`types.ts` `HTMLSanitizeOptions` and `HTMLDistillOptions`, `guides/html.md:301`, `:316`),
`NOT` (`types.ts` `TextNode` and `HTMLInterface`, `HTML.ts` class block, `guides/html.md:252`),
`WHOLE` (`types.ts` `HTMLSanitizeOptions`, `guides/html.md:290`), `KEPT` (`constants.ts`
`SAFE_ELEMENTS`, `helpers.ts` `collapseText`, `guides/html.md:295`), `DERIVED` (`types.ts`
`ElementNode`, `guides/html.md:192`), and `WITH` (`constants.ts` `BOILERPLATE_ELEMENTS`,
`guides/html.md:311`) now read as plain prose.

The sweep also lowered the emphasis the objective lane did not list, in the same owned
prose: `TOTAL` (`factories.ts` `createHTML`, `parsers.ts` `parseDocument`,
`guides/html.md:8`), `AS-IS` (`HTML.ts` class block, `factories.ts` `createHTML`,
`guides/html.md:166`, `:376`), `NEW` (`HTML.ts` `map` / `sanitize` / `distill` and its class
block, `types.ts` `HTMLInterface`, `guides/html.md:166`), `ABSENT` (`helpers.ts`
`scanAttributes`), `REPRESENTABLE` (`helpers.ts` `scanComment`), `REMOVED` (`helpers.ts`
`sanitizeAttributes`, `guides/html.md:293`), `LIST` and `NO` (`helpers.ts` `pruneDocument`),
`ON TOP` and `UNWRAPPED` (`types.ts` `HTMLSanitizeOptions`), `SAFETY` (`types.ts`
`HTMLInterface`), and, in guide prose alone, `LEAVES` (`:138`), `EMPTY` (`:194`, `:243`),
`FIRST` (`:197`), `ORIGINAL` (`:201`), `AT` (`:242`), `UNCHANGED` (`:245`), `NO` (`:246`),
`REPARSE` (`:256`), `CLOSED` and `INSIDE` (`:299`), and `MECHANISM` (`:307`), `SAME` (`:314`).

### Sweep result — the sites left, and why

Pattern `(^|[^\`A-Za-z/_-])[A-Z]{2,}([^A-Za-z\`_]|$)` over `guides/html.md`, `README.md`,
`src/core/*.ts`, and `tests/guides.test.ts`, minus acronyms (`HTML`, `AST`, `URL`, `ASCII`,
`WHATWG`, `JSON`, `UTF`, `CRLF`, `CDATA`, `DOM`, `CSS`, `SVG`, `EOF`, `CSP`, `SGML`, `DSL`,
`MathML`, `API`), `SCREAMING_SNAKE` code tokens, and the uppercase markup inside fences and
sample tables. Pattern `\b(two|three|four|five|six|seven|eight|nine|ten|both)\b` over the
same paths for counts. `README.md` returns nothing under either pattern and is unchanged.

Emphasis left, each in a non-`Summary` table cell that acceptance criterion 3 bars this unit
from changing: `guides/html.md:221` `ABSENT` (Behavior), `:225` `EMPTY` (Behavior), `:284`
`WHOLE` (Rendered as), `:330` `TEXT` (In `renderText`'s output).

Emphasis left outside the owned set: `src/core/shapers.ts:6` `LEAVES` and `:9` `DSL` sit in
the file-header `//` comment rather than in a doc block; `src/core/HTML.ts:371` "so both go
with their children" is a `//` code comment, not a doc block; `tests/guides.test.ts:308`
`EXECUTED` is the pilot's canonical text, which item 6 requires byte for byte.

Counts left, each naming its members in its own sentence or stating a value rather than
tallying a set: `guides/html.md:199` and `src/core/parsers.ts` "no two adjacent `TextNode`
siblings"; `guides/html.md:288` "take both shapes too", after the sentence names
`ReadonlySet<string>` and `readonly string[]`; `guides/html.md:301` "any two-character
protocol-relative prefix"; `src/core/HTML.ts:224` "a fixpoint both directly and through a
reparse"; `src/core/helpers.ts:1514` and `:1549` and `src/core/constants.ts:123`, each a
sample or the adjacency invariant.

## Item 2 — `HTML.ts` the distill bullet (S-3, objective 4)

Read against `src/core/HTML.ts:249-271` (`@remarks`) and the body at `:279-300`: prune
boilerplate and hidden chrome, sanitize with the defaults, re-root, reduce to the content
vocabulary. The bullet now states that order and wraps inside the block's width — its widest
line measures 91 characters where the block's widest is 95.

```
- * - **The two engines.** `sanitize` enforces a security floor no option can lower;
- *   `distill` extracts content, sanitizing with the defaults partway through because content
- *   extraction is not a second security surface. Both compose the pure leaves in `helpers.ts` over one shared
- *   bottom-up spine, {@link pruneDocument}.
+ * - **The engines.** `sanitize` enforces a security floor no option can lower; `distill`
+ *   extracts content, pruning boilerplate regions and hidden chrome first, then sanitizing
+ *   with the defaults, then re-rooting and reducing to the content vocabulary, because
+ *   content extraction is not a second security surface. Each composes the pure leaves in
+ *   `helpers.ts` over one shared bottom-up spine, {@link pruneDocument}.
```

## Item 3 — the opening sentence (S-2)

```
-HTML here is: parse once into an `HTML` handle, then treat every output as a projection of it.
+Everything downstream reads the one `HTMLDocument` a parse produces — the queries, the rewrites, the shaping engines, and the renderers alike.
```

The tagline carries the handle, the AST, and the projection back out; the opening now carries
what it does not — that one parsed document is what every consumer reads. The rest of the
paragraph stands.

## Item 4 — `HTMLInterface`'s row (S-4)

`src/core/types.ts` `HTMLInterface`, rewritten and propagated with `npm run docs -- --to
guide`:

```
- * Represents a parsed HTML document: the typed {@link HTMLDocument} AST plus the query, rewrite,
- * fold, and reduction operations over it.
+ * Represents a parsed HTML document: the typed {@link HTMLDocument} AST plus the query
+ * (`walk` / `find` / `filter` / `reduce`), rewrite (`map`), fold, streaming, and
+ * document-shaping (`sanitize` / `distill`) operations over it.
```

The row at `guides/html.md:42` now names every operation the class row at `:162` names.

## Item 5 — the `Shape` idiom (Ruling 12, S-1, S-5)

The convention sentence above the one table carrying `Shape` (`guides/html.md:16`, the
`### Types` intro) states the fleet idiom: data members as bare names in braces, `?` for an
optional member, call-signature members after `plus`, a type alias's own literal with a
union's arms escaped as `\|`, no member type in a cell, and a generic declaration carrying
its parameter binding beside its literal, so a `TNode` or a `T` in a cell is that
declaration's own parameter. `HTMLScan<TNode extends HTMLNode>` and `HTMLHandler<TNode, T>`
carry their bindings in the cell, and `HTMLDerivation<T>` and `HTMLHandlerMap<T>` carry
theirs.

`node .orkestrel/campaign/docs-parity/instruments/d7/pass/cells/compare-cells.mjs
/home/user/fleet/html HEAD guides/html.md`:

```json
{
 "rowsBefore": 143,
 "rowsAfter": 143,
 "missing": [],
 "added": [],
 "changed": [
  { "key": "`HTMLAttribute`", "col": "Shape", "was": "`{ name: string, value?: string }`", "is": "`{ name, value? }`" },
  { "key": "`ElementNode`", "col": "Shape", "was": "`{ category: 'element', name, attributes, children }`", "is": "`{ category, name, attributes, children }`" },
  { "key": "`TextNode`", "col": "Shape", "was": "`{ category: 'text', value: string }`", "is": "`{ category, value }`" },
  { "key": "`CommentNode`", "col": "Shape", "was": "`{ category: 'comment', value: string }`", "is": "`{ category, value }`" },
  { "key": "`DoctypeNode`", "col": "Shape", "was": "`{ category: 'doctype', name, public?, system? }`", "is": "`{ category, name, public?, system? }`" },
  { "key": "`HTMLDocument`", "col": "Shape", "was": "`{ category: 'document', children: readonly HTMLNode[] }`", "is": "`{ category, children }`" },
  { "key": "`HTMLSpan`", "col": "Shape", "was": "`{ start: number, end: number }`", "is": "`{ start, end }`" },
  { "key": "`HTMLOpenPosition`", "col": "Shape", "was": "`{ overflow: boolean, position: number }`", "is": "`{ overflow, position }`" },
  { "key": "`HTMLScan`", "col": "Shape", "was": "`{ node: TNode, next: number }`", "is": "`HTMLScan<TNode extends HTMLNode>` = `{ node, next }`" },
  { "key": "`HTMLDerivation`", "col": "Shape", "was": "`readonly [value: T, derivations: ReadonlyMap<HTMLNode, HTMLNode \\| undefined>]`", "is": "`HTMLDerivation<T>` = `readonly [value: T, derivations: ReadonlyMap<HTMLNode, HTMLNode \\| undefined>]`" },
  { "key": "`HTMLHandler`", "col": "Shape", "was": "`(node: TNode, children: readonly T[]) => T`", "is": "`HTMLHandler<TNode, T>` = `(node: TNode, children: readonly T[]) => T`" },
  { "key": "`HTMLHandlerMap`", "col": "Shape", "was": "`{ document, element, text, comment, doctype }`", "is": "`HTMLHandlerMap<T>` = `{ document, element, text, comment, doctype }`" },
  { "key": "`HTMLInterface`", "col": "Shape", "was": "`{ document, span, walk, find, filter, map, reduce, fold, stream, sanitize, distill }`", "is": "`{ document } plus { span, walk, find, filter, map, reduce, fold, stream, sanitize, distill }`" }
 ]
}
```

No row is missing or added, and every changed non-`Summary` cell is in `Shape`. The escaped
pipes in `HTMLNode`'s and `HTMLDerivation`'s cells survive the split.

## Item 6 — the drop-in (Ruling 13, F-1)

`tests/guides.test.ts` now matches `/home/user/fleet/abort/tests/guides.test.ts` byte for
byte outside this package's `@src/core` imports, its constants block, and its own
`flagship fences` cases:

- the examples case is named `documents an example for every Surface function`;
- the equality case sits above that case and above the import walk, where the pilot has it;
- the file header, the `INTERNAL` doc block ("the assertion that follows it"), the executed-half comment, and the `guideText` binding are the pilot's text.

```
$ diff <(awk '/^const root = new URL/,/^\/\/ The EXECUTED half/' abort/tests/guides.test.ts) \
       <(awk '/^const root = new URL/,/^\/\/ The EXECUTED half/' html/tests/guides.test.ts)
SHARED REGION IDENTICAL
$ diff <(head -3 abort/tests/guides.test.ts) <(head -3 html/tests/guides.test.ts)
HEADER IDENTICAL
$ diff <(sed -n '/^\/\/ The EXECUTED half/,/^describe(.flagship fences/p' abort/tests/guides.test.ts) \
       <(sed -n '/^\/\/ The EXECUTED half/,/^describe(.flagship fences/p' html/tests/guides.test.ts)
EXECUTED COMMENT IDENTICAL
```

Every remaining line the pilot carries and html does not is abort's own: its
`createRecorder` / `createAbort` imports, its `GUIDE_SPEC` and `MODULES` values, and its four
abort flagship cases.

## Acceptance criteria

### 1. Format, lint, typecheck

```
$ npx oxfmt --config .oxfmtrc.json --check src/core/HTML.ts src/core/constants.ts src/core/factories.ts src/core/helpers.ts src/core/parsers.ts src/core/types.ts tests/guides.test.ts
All matched files use the correct format.
Finished in 54ms on 7 files using 4 threads.
exit=0

$ npx oxlint --config .oxlintrc.json --deny-warnings src/core/HTML.ts src/core/constants.ts src/core/factories.ts src/core/helpers.ts src/core/parsers.ts src/core/types.ts tests/guides.test.ts
exit=0

$ npm run check
> tsc --noEmit -p configs/src/tsconfig.core.json
exit=0
```

`oxfmt` claims no Markdown, so `guides/html.md` and `README.md` are outside its file set.

### 2. Docs and the scoped suites

```
$ npm run docs
rows read: 1, disagreements found: 0
exit=0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
exit=0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
exit=0

$ npm run test:guides
 Test Files  1 passed (1)
      Tests  35 passed (35)
exit=0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
exit=0

$ npm run test:src:core
 Test Files  7 passed (7)
      Tests  312 passed (312)
exit=0
```

### 3. The comparator

Quoted in full under item 5: `missing` and `added` are empty, and `Shape` is the only column
in `changed`.

### 4. The tree left

```
$ git status --short
 M guides/html.md
 M src/core/HTML.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/parsers.ts
 M src/core/types.ts
 M tests/guides.test.ts

$ git diff --stat
 guides/html.md        | 202 +++++++++++++++++++++++++-------------------------
 src/core/HTML.ts      |  27 +++----
 src/core/constants.ts |  12 +--
 src/core/factories.ts |   4 +-
 src/core/helpers.ts   |  27 +++----
 src/core/parsers.ts   |   7 +-
 src/core/types.ts     |  40 +++++-----
 tests/guides.test.ts  |  55 +++++++-------
 8 files changed, 189 insertions(+), 185 deletions(-)
```

`README.md` is owned and unmodified: its sweep returns no count and no emphasis, and its
pitch still equals the guide tagline, which `npm run test:guides` asserts.

## Observations for the Orchestrator

- **The `--to guide` writer collapses table alignment.** It rewrote the Types, Constants, Helpers, and `HTMLInterface` methods tables with `| --- |` separators and single-space cells, where the tree at `HEAD` and the pilot's `guides/abort.md` carry padded columns. I re-padded those four tables to their own column widths; the comparator trims cells, so the padding is invisible to criterion 3, and `npm run docs` still reports `disagreements found: 0`. That is most of `guides/html.md`'s changed-line count.
- **The pilot's file header is inaccurate for every package.** It reads "The constants below are this package's own, and are the only part a sibling package changes", while each package also owns its `@src/core` imports and its `flagship fences` cases, and `below` is the form `.claude/rules/writing.md` § Code tokens, references, and links bars. html carried a corrected header; Ruling 13's byte-equality requirement obliged me to take the pilot's text instead, so the correction now needs a fleet-wide carrier starting at `/home/user/fleet/abort/tests/guides.test.ts`. `tests/guides.test.ts:308` `EXECUTED` is the same case.
- **Emphasis survives in four non-`Summary` guide cells** (`:221`, `:225`, `:284`, `:330`), because acceptance criterion 3 admits a changed non-`Summary` cell only in `Shape`. Closing those needs a brief that widens that criterion.
- **`src/core/shapers.ts:6` and `:9`** carry `LEAVES` and `DSL` in the file-header `//` comment, which is outside the owned "doc blocks under `src/core/**`" set.

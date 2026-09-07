# Report — `d7n-markdown-converge-fix`

`implementer` on Claude Opus 5, `/home/user/fleet/markdown` from `c38ae24`. Wall clock 2026-09-07
20:43Z to 20:53Z. No commit, no install, no discard-class git command.

## The resumed run's partial hunks

Read `git status --short` and the full `git diff` at start. Every partial hunk conformed to the
brief and was kept; none was corrected and none was discarded. What the terminated run had landed:

- M4 whole — the spaced hyphen replaced by the spaced em dash in every description paragraph under
  `src/core/**` (`Markdown.ts`, `factories.ts`, `helpers.ts`, `parsers.ts`, `shapers.ts`,
  `types.ts`, `validators.ts`, `compilers.ts`).
- M2 whole — `TableAlign`'s `@remarks` on `MarkdownCell.align`'s `undefined`, `MarkdownCell`'s
  `@remarks` on the header derivation, `renderHTML`'s `@remarks` on the unconditional sanitize.
- M3 partly — the caps lowered in the owning `src/**` paragraphs and propagated with `--to guide`,
  so every `Summary` cell the audit named at `:33`, `:34`, `:56`, `:102`, `:103`, `:108`, `:111`,
  `:114`, `:115`, `:117`, `:124`, `:131`, `:221` was already clean on arrival.
- M6 whole — `find` and `filter`'s first overload descriptions in `src/core/types.ts`.

What remained, and this run did: M1 whole, M3's guide-body sweep and `:277`, M5 whole, M2's
`foldNode` verification, M1's format and propagation.

## Per item

**M1 — the `Shape` idiom (Ruling 15).** `guides/markdown.md`.

- `### Types` takes Ruling 15's one wording as its own paragraph. The pointer it displaced
  (`MarkdownInterface`'s call-signature members are documented under `## Methods`) moved into the
  preceding descriptive paragraph, so no fact was lost and the convention sentence is the fleet's
  verbatim.
- `### Shapers` takes the same wording plus its own second sentence: "In a shaper table a `Shape`
  cell holds the node shape the value compiles into."
- Every row whose cell spelled a member type now holds bare names: `TextNode`, `EmphasisNode`,
  `CodeSpanNode`, `LineBreakNode`, `LinkNode`, `ImageNode`, `HeadingNode`, `ParagraphNode`,
  `ListItemNode`, `ListNode`, `TableNode`, `CodeBlockNode`, `BlockquoteNode`, `ThematicBreakNode`,
  `MarkdownDocument`, `MarkdownCell` in `### Types`, and `textShape`, `codeSpanShape`,
  `lineBreakShape`, `codeBlockShape`, `thematicBreakShape` in `### Shapers`.
- `CodeBlockNode` and `codeBlockShape` mark the optional member: `{ element, lang?, code }`.
  `FenceMatch.lang` is `string | undefined` rather than optional, so its cell stays `{ marker, lang }`.
- `MarkdownInterface` reads `{ document } plus walk, find, filter, span, map, reduce, fold, stream`
  — `document` is the sole data member and the rest are call signatures.
- Every alias row keeps its own literal with `\|` escaped; each was already in that form.
- `MarkdownProjection`, `MarkdownHandlerMap<T>`, `listItemMatchShape`, and every `*Match` /
  `*Bounds` / `*Scan` / `*Collection` row was already bare and stands. `MarkdownHandlerMap<T>`'s
  members are property signatures typed `MarkdownHandler`, so they are data members and take no
  `plus` (Ruling 19's shape).

**M2 — the dropped clauses (Ruling 7).** Verified each clause in its declaration's `@remarks`, with
the guide prose that carries it left standing.

| Clause | Block | Guide prose retained |
| ------ | ----- | -------------------- |
| `TableAlign`'s `undefined` on `MarkdownCell.align` | `src/core/types.ts` `TableAlign` `@remarks` | § Alignment and absence |
| `MarkdownCell`'s header derivation | `src/core/types.ts` `MarkdownCell` `@remarks` | § `htmlToMarkdown` projection element table |
| `renderHTML`'s one argument, no options, no opt-out | `src/core/compilers.ts` `renderHTML` `@remarks` | § Sanitization policy |
| `foldNode`'s `table`-handler flattening | `src/core/helpers.ts` `foldNode` `@remarks` § **Table contract** | `MarkdownHandlerMap.table`'s member comment |

The `foldNode` clause was already in that block at `c38ae24` (`git show c38ae24:src/core/helpers.ts`
line 2830), so this item needed no edit there; it is recorded rather than re-landed.

**M3 — all-caps and the count.** `guides/markdown.md` and `src/core/**`.

- `:277`: "bounded by TWO caps in sequence rather than one" became "bounded by html's
  cap on the fold and then by `renderMarkdown`'s own, in sequence rather than by a single cap", and
  "the anchor law below" became "the anchor law that follows".
- Guide-body prose the earlier propagation could not reach: `FIRST` at `:504` and `OUTSIDE` at
  `:534` lowered, `ONE` at `:498` lowered. `:534` also took `since` → `because`
  (`.claude/rules/writing.md` substitution table).
- The `\b[A-Z]{3,}\b` sweep over the guide now returns `AST`, `HTML`, `GFM`, `JSON`, `ATX`, `URL`,
  `README`, `UTF`, `RPC`, `CRLF`, `ASCII`, `AGENTS` — every one a real token or filename — plus
  `SEE`, `ONE`, `AND`, `TWO` on `:682`, which are the fence's expected output from
  `node.value.toUpperCase()`. Sample data inside a code fence is exempt from the substitution table
  and rewriting it would falsify the example, so it stays; see § Deviations and decisions.
- The same sweep over `src/core/**` returns only `AST`, `HTML`, `GFM`, `JSON`, `ATX`, `URL`, `UTF`,
  `RPC`, `CRLF`, `ASCII`.
- Below that pattern's width, this run also lowered the emphasis in `AS-IS` (`Markdown.ts:21`,
  `factories.ts:31`) and `guard IS its own` (`validators.ts:248`). Each sits in `@remarks` or a file
  comment, so none is compared.

**M4 — the em dash.** Landed by the terminated run and kept. `grep -c ' - ' guides/markdown.md`
reads 5, against 89 at `c38ae24`. Each survivor is data rather than a clause join: the `- - -`
thematic-break sample in `isThematicBreak`'s row at `:102`, the `end - start` arithmetic at `:261`
and `:306`, and the `// total guard - never throws` and `// undefined - rejected …` comments at
`:649` and `:655` inside the adopt fence, which is compared against its `@example` and moves only
with it.

**M5 — the drop-in's text.** `tests/guides.test.ts`, matching the pilot's amended wording:

- line 2 reads "The constants that follow are this package's own";
- the `INTERNAL` block reads "the assertion that follows it fails when a name here stops being
  stranded", wrapped exactly as `/home/user/fleet/abort/tests/guides.test.ts:39-40`.

**M6 — the overload descriptions.** Landed by the terminated run and kept. `src/core/types.ts`:
`find`'s guard overload reads "Finds the first node (depth-first, pre-order) narrowed by a type
guard, and returns `undefined` when no node matches; a second overload takes a plain predicate.",
`filter`'s reads "Collects every node (depth-first, pre-order) narrowed by a type guard; a second
overload takes a plain predicate.", and each predicate overload describes its own signature.

**Item 7 — the titled pair.** `@example Construct from a string and narrow with a guard` stays on the
`Markdown` class's block. Not retitled, not moved.

**Item 8 — propagation.** `npx oxfmt --config .oxfmtrc.json --write` over the owned paths, then the
`docs` read and each write direction, recorded under the criteria.

## Per criterion

1. `git status --short` — owned files only.

```text
 M guides/markdown.md
 M src/core/Markdown.ts
 M src/core/compilers.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/parsers.ts
 M src/core/shapers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
```

2. Format, lint, typecheck.

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/markdown.md src/core/*.ts tests/guides.test.ts
All matched files use the correct format.
Finished in 589ms on 10 files using 4 threads.
exit 0

$ npx oxlint --config .oxlintrc.json --deny-warnings src/core/*.ts tests/guides.test.ts
(no output)
exit 0

$ npm run check
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
exit 0
```

3. Docs parity: the read, then `--to guide` and `--to source`.

```text
$ npm run docs
rows read: 1, disagreements found: 0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

4. The idiom, the caps, the hyphen, the drop-in.

```text
$ grep -n '| interface *| `{[^`]*:' guides/markdown.md
(no output) exit 1

$ grep -nE '\b(ORIGINAL|ALREADY|SAME|IMMEDIATELY|NOT|NEW|BALANCED|CANONICAL|TWO)\b' guides/markdown.md
682:renderMarkdown(linked.document) // 'SEE [ONE](https://a.dev?ref=guide) AND [TWO](https://b.dev?ref=guide).'

$ grep -c ' - ' guides/markdown.md
5
$ git show c38ae24:guides/markdown.md | grep -c ' - '
89

$ sed -n '2p' tests/guides.test.ts
// this repo's own `guides/README.md` manifest. The constants that follow are this
$ sed -n '79p' tests/guides.test.ts
 * intentional rather than forgotten — and the assertion that follows it fails when a name
```

The caps grep's one hit is the executed fence's expected output at `:682`, ruled exempt in § M3.
Every other line the criterion targeted is clean. The `:79` line number held after formatting.

5. Suites.

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  63 passed (63)
   Duration  952ms
exit 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  933ms
exit 0

$ npm run test:src:core          (observation)
 Test Files  7 passed (7)
      Tests  604 passed (604)
   Duration  3.06s (transform 1.27s, setup 1.39s, import 729ms, tests 3.52s, environment 1ms)
exit 0
```

The `tests/src/core/parsers.test.ts:626` 1000 ms case passed in this run under sibling load. Not
diagnosed; the Orchestrator's own re-run stands as the authoritative reading.

## Deviations and decisions

No deviation. No gate outside the owned files went red, and every `Shape` cell was expressible in
Ruling 12's idiom.

Ancillary matters decided and recorded:

- **The caps criterion's one hit stays.** `guides/markdown.md:682` is the `toUpperCase` fence's
  expected output. `.claude/rules/writing.md` exempts a sample string inside a code fence from every
  substitution row, and the fence is compared against its `@example` and executed by
  `tests/guides.test.ts`, so lowering it would make the guide state a value the code does not
  return. The criterion's grep is prose-shaped and this line is data.
- **The `## Methods` pointer moved rather than being deleted.** Ruling 15 fixes the convention
  sentence's wording and the brief grants a second sentence to the Shapers table alone, so the
  pointer sits in the `### Types` descriptive paragraph instead.
- **Emphasis caps narrower than the sweep's pattern.** `AS-IS` and `IS` are shorter than
  `\b[A-Z]{3,}\b` matches. Lowered them anyway, in `@remarks` and a file comment only.
- **`since` → `because` at `:534`.** The line was already being edited for `OUTSIDE`, and the causal
  `since` is a banned row.

Observations outside this unit's items, for the Orchestrator to route:

- **Counts in the guide's own prose.** `guides/markdown.md:247` reads "three real GFM delimiter
  forms" and "the two places absence appears". Both name their members in the same sentence or the
  bullets under it, so each may be permitted; neither is named by M1 to M6 and the audit's markdown
  claim 25 covered the reports rather than the guide, so neither was touched.
- **The Constants table keeps a `Value` column.** Ruling 18 heads a `### Constants` table with
  `Shape` and no `Value`. `guides/markdown.md:63` still carries `Value` with `MAX_DEPTH`'s `64` and
  `EMPTY_PROJECTION`'s literal. Ruling 18 is not in this brief's read-first list and M1 scopes the
  idiom to `### Types` and `### Shapers`, so the table stands.
- **The drop-in's extra header sentence.** `tests/guides.test.ts:3-4` adds "The executed
  half sits at the end of the file, under `flagship fences`.", which the pilot's header does not
  carry. Ruling 13 requires a byte-for-byte match outside the constants block; the brief named only
  lines 2 and 79, so the sentence stands.

## Diffstat

```text
 guides/markdown.md     | 198 ++++++++++++++++++++++++-------------------------
 src/core/Markdown.ts   |  18 ++---
 src/core/compilers.ts  |   3 +
 src/core/factories.ts  |  14 ++--
 src/core/helpers.ts    | 148 ++++++++++++++++++------------------
 src/core/parsers.ts    |   2 +-
 src/core/shapers.ts    |  20 ++---
 src/core/types.ts      | 171 ++++++++++++++++++++++--------------------
 src/core/validators.ts |  32 ++++----
 tests/guides.test.ts   |   4 +-
 10 files changed, 313 insertions(+), 297 deletions(-)
```

No code token moved: every changed line under `src/` is a comment or doc-block line, checked with
`git diff -U0 -- src/`, which reports 0 changed lines outside `*`, `//`, and `/**`.

Instruments and captured gate output sit under `/home/user/fleet/markdown/tmp/d7n-markdown-converge-fix/`
(`check.txt`, `oxlint.txt`, `test-guides.txt`, `test-policy.txt`, `test-src-core.txt`, the
`types.diff.txt` and `guide.diff.txt` baselines, and the terminated run's `caps.mjs`, `emdash.mjs`, `emdash.log.txt`).

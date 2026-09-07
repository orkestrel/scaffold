# Unit report — D1-fix-2: the guide-readers fix round after audit round 2, in `@orkestrel/guide`

Every finding closed in this unit. Every `file:line` is the tree as this unit leaves it.

## Per finding

### 1. RN reads a cached `Guide` projection

`findUnnamed` is now `extractUnnamed`, and the nameless rows are a cached projection like
`tagline`.

- `src/core/helpers.ts:1424` — `export function extractUnnamed(document: MarkdownDocument): readonly string[]`, body unchanged. Its TSDoc opens "Extracts every `## Surface` or `## Methods` table row whose first cell carries no code span" (`:1409`) and names `{@link GuideInterface.unnamed}` as its cache (`:1414`); the `@example` reads `extractUnnamed(document)` (`:1421`).
- `src/core/helpers.ts:1296`, `:1364` — the `extractSurface` and `extractMethods` TSDoc now point at `{@link extractUnnamed}`.
- `src/core/types.ts:211` — `unnamed(): readonly string[]` on `GuideInterface`, contract at `:198-210`: the rows `surface` and `methods` skip for want of a name, entries joined by `` ` | ` ``, "Such a row reaches neither projection, so no bijection check can report it and this one names it instead", `## Surface` rows first, `@example` at `:208`.
- `src/core/Guide.ts:37`, `:52`, `:74` — `readonly #unnamed`, computed once in the constructor, returned by the accessor. Class TSDoc projection list at `:15`.
- `tests/guides.test.ts:92` — RN is `expect(guide.unnamed()).toEqual([])`. The file's `findUnnamed` import and its `import { createMarkdown } from '@orkestrel/markdown'` are gone, so the drop-in suite parses each spec once, through `createGuide`.
- `guides/guide.md:107` — the Helpers row is `extractUnnamed`, moved from the finding producers into the guide-document projections group, after `extractMethods` and beside `extractTagline`. Placement recorded as this unit's choice: the brief's "beside `extractTagline`" is read as the topic group, and the reader it complements is `extractMethods`.
- `guides/guide.md:232` — the `GuideInterface` Methods table gains the `unnamed` row. `guides/guide.md:46` — the `GuideInterface` Types row lists `unnamed` among the projections.
- `guides/guide.md:473-479` — the RN catalog row now names `guide.unnamed()`, writes the separator as `` ` | ` ``, replaces the old second sentence with "a row without one enters neither `guide.surface()` nor a `MethodGroup`, no bijection leg can report it, and this check names the row instead of letting it go in silence", and states the limit in place of the false guard: "Guard: RN reads table rows, so a guide documenting its surface with backticked H3 entity headings and no `## Surface` table gives RN nothing to read, and SB's `guide.surface().length > 0` covers that surface instead."
- `guides/guide.md:690` — the `Guide.test.ts` § Tests bullet names the nameless rows.
- Tests: `tests/src/core/helpers.test.ts:1093` (`describe('extractUnnamed')`, both controls carried over); `tests/src/core/Guide.test.ts:55` (`unnamed()` in the caching case), `:62` (empty on the good fixture), `:69` (`'projects a nameless row that reaches neither surface() nor a method group'`, asserting `['Widget | class']` while `surface()` still returns the named row).

RN's rewiring was proved non-vacuous by plant and restore. Planting `` `maskFences` `` → `maskFences` in the `guides/guide.md` Helpers row gave `npm run test:guides` → `2 failed | 45 passed (47)`, `names every Surface and Methods row` reporting `[ 'function maskFences' ]`. The file was restored byte-for-byte (SHA-256 `8bd4c61ff91b111ce2e6015da20bc5eca8631f7a9583b0733dc80f139072f5a7` before the plant and after the restore) and the suite returned to `47 passed (47)`.

### 2. The projection enumeration

`guides/guide.md:279-281` — the enumeration reads `sections`, `tagline`, `surface`, `methods`,
`unnamed`, `links`, `tests`, `fences`. `guides/guide.md:315-317` adds the reader sentence:
"`extractTagline` reads the blockquote following the H1, and `extractUnnamed` returns the
`## Surface` and `## Methods` rows `extractSurface` and `extractMethods` skip for want of a
code-span name." The surrounding paragraph was rewrapped to the file's width.

### 3. One term for the tag rule

Every "exact block-position `@example`" is now "an `@example` tag opening a line at its first
non-blank column". `grep -rn "block-position" src guides tests` prints nothing.

- `guides/guide.md:100` (`extractExampleLines` Helpers row), `:247` (`examples` Methods row), `:384` (the `extractExampleLines` prose), `:496` (the EX catalog row).
- `src/core/helpers.ts:1661` (`extractExampleLines` TSDoc), which also gains "and {@link maskFences} keeps a fenced body's own lines out of the search" at `:1663`.
- `src/core/types.ts:360`, `:375` (both `examples()` contracts).

The `README.md` patch is in § README patch; the file is off-limits and was not edited.

### 4. `\|` is a guide-side clause

`guides/guide.md:333-334` — "Nothing else is transformed. Emphasis, a link, an image, and `\|` are
markdown syntax the parser resolves, so those clauses reach only a guide cell". The bullet list
still states every clause once; the sentence after it now rules on all four guide-side clauses.

### 5. A fenced body is outside the tag search

New leaf `maskFences` at `src/core/helpers.ts:1547`: it returns the text with every fenced body's
characters replaced by aligned spaces, keeping every line and every column, so an index found in
the projection addresses the same character of the text it was built from. A body opens at a line
whose first non-blank run is three or more backticks or tildes, closes at the first line opening
with a run of the same character at least as long, and runs to the end when unclosed; the marker
lines themselves stay. TSDoc at `:1531-1546`.

Wired at all four search sites the ruling names:

- `src/core/helpers.ts:1676` — `extractExampleLines` tests `maskFences(comment.text)`.
- `src/core/helpers.ts:1698` — `collectSummaries` searches the mask and slices the original.
- `src/core/helpers.ts:1724`, `:1730` — `collectExamples` matches `@example` on the mask and searches the next tag on the mask's aligned slice, reading the title and the body from the original.

Stated at `guides/guide.md:342-346`, following the block-tag sentence: "A line inside a fenced body
is example code rather than block structure, so it opens no tag: a body runs from a line opening
with three or more backticks or tildes to the first line opening with a run of the same character
at least as long, and `maskFences` replaces its characters with aligned spaces before every tag
search reads the block." Helpers row at `guides/guide.md:97`; § Tests bullet at `:685`.

Tests: `tests/src/core/helpers.test.ts:2271` (`describe('a tag-shaped line inside a fenced body')`)
carries the brief's fixture — an `@example` fence whose body is
`class Widget {\n  @decorator()\n  render() {}\n}` followed by an `@remarks` tag:

- `:2305` `'keeps the decorator line in the example code and still ends the body at the next tag'` — over `collectExamples` and `extractExamples`.
- `:2310` `'ends the description paragraph at the example tag, not at the decorator line'`.
- `:2316` `'opens no example from a quoted tag, and keeps it in the description paragraph'` — a block whose description fence carries an `@example` line, over `collectExamples`, `extractExampleLines`, and `collectSummaries`.

`maskFences` itself is covered at `tests/src/core/helpers.test.ts:2227`: `:2228` blanking with
markers, line count, and columns kept; `:2240` an unclosed body running to the end; `:2248` a
closer of the wrong character or length not closing; `:2254` an indented opener; `:2262` text with
no marker returned unchanged.

**Failing-first reading.** With the three fenced-body cases written and no code changed,
`npm run test:src:core` exited 1:

```
 Test Files  1 failed | 7 passed (8)
      Tests  2 failed | 472 passed (474)
```

The two reds were `a tag-shaped line inside a fenced body > keeps the decorator line in the example
code and still ends the body at the next tag` and `... > opens no example from a quoted tag, and
keeps it in the description paragraph`; the second reported
`expected [ { name: 'explain', …(2) } ] to deeply equal []`. The third case
(`ends the description paragraph at the example tag, not at the decorator line`) is a regression
guard and was green before the fix, which is why the run shows two reds rather than three. After
`maskFences` landed, the same command exited 0 at `474 passed (474)`, rising to `481 passed (481)`
once the `maskFences` and `Guide.unnamed()` cases were added.

### 6. Pairing is per title, not per heading

- `guides/guide.md:355-358` — "The pairing is per title across the whole document, not per heading: the first fence a title reaches is the compared one, and every later fence of that title is outside the comparison, whether it sits under the same heading or under a second heading of the same text."
- `guides/guide.md:511-514` — the EQ row carries the same rule in the same terms.
- `src/core/helpers.ts:1941-1943` — `findDrift`'s TSDoc carried the superseded "A heading pairs one fence" wording. It now states the same per-title rule, so the guide, the catalog row, and the contract read one term. `grep -n "A heading pairs one fence" src guides` prints nothing.

### 7. Report citations

The two corrections the objective lane names against `d1-fix-report.md` are recorded here, since
that report is a retained artifact this unit does not own: the `collectTitles` Helpers row is at
`guides/guide.md:121` in the tree D1-fix left (not `:118`, which was `findUnexampled`), and
`findDrift`'s three-state TSDoc sentence opens at `src/core/helpers.ts:1899` (not `:1900`). Both
line numbers have since moved with this round's edits; in the tree as this unit leaves it the
`collectTitles` Helpers row is `guides/guide.md:122` and `findDrift`'s three-state TSDoc sentence opens at
`src/core/helpers.ts:1939`.

### 8. Recorded, no change

`collectTitles` versus `collectSummaries` naming stands. Gate greenness was settled by the
verifier's round-2 report and is re-measured here for the files this round touched.

## README patch, both occurrences

`README.md` is off-limits. Apply this patch serially; it replaces the same phrase the owned sites
now carry.

`README.md:117`:

```diff
-  chain whose final authoritative span has an exact block-position `@example`
-  tag. Title text is allowed; intervening material severs association.
+  chain whose final authoritative span has an `@example` tag opening a line at
+  its first non-blank column. Title text is allowed; intervening material severs
+  association.
```

`README.md:144`:

```diff
-  carries an exact block-position `@example`; title text is allowed, intervening
-  material severs association, and the next physical record is consumed once.
+  carries an `@example` tag opening a line at its first non-blank column; title
+  text is allowed, intervening material severs association, and the next
+  physical record is consumed once.
```

## Criteria

### 1. Greps — PASS with one recorded reading

`grep -rn "findUnnamed\|block-position\|createMarkdown" src tests/guides.test.ts guides` — exit 0,
printing:

```
src/core/Guide.ts:2:import { createMarkdown, flattenText, isHeadingNode } from '@orkestrel/markdown'
src/core/Guide.ts:43:		const document = createMarkdown(source).document
src/core/parsers.ts:2:import { createMarkdown, flattenText, isTableNode } from '@orkestrel/markdown'
src/core/parsers.ts:31:	const document = createMarkdown(markdown).document
guides/guide.md:279:`Guide` parses a guide's markdown once (through `@orkestrel/markdown`'s `createMarkdown`) and
guides/markdown.md:190:| `createMarkdown` ...
guides/markdown.md:247:`new Markdown(markdown)` (or `createMarkdown(markdown)`) ...
guides/markdown.md:916:- [`tests/src/core/factories.test.ts`] ... `createMarkdown` + the compiled node contracts ...
```

No `findUnnamed` anywhere, no `block-position` anywhere, and nothing in `tests/guides.test.ts`. Two
readings differ from the criterion's literal wording and are flagged, not deviated on:

- The criterion names `src/core/helpers.ts` among the files carrying the pre-D1 `@orkestrel/markdown` import. That file imports types from `@orkestrel/markdown` but never `createMarkdown`, so it prints nothing. Nothing was removed from it this round.
- `guides/guide.md:279` prints one hit: the extraction-model sentence "`Guide` parses a guide's markdown once (through `@orkestrel/markdown`'s `createMarkdown`)". That is the sentence finding 2 required this unit to edit and keep, and it is prose about `Guide`'s single parse, not a second parse. `guides/markdown.md` is a different guide, outside the file the criterion names.

`grep -n "unnamed(): readonly string\[\]" src/core/types.ts` — exit 0, one line:

```
211:	unnamed(): readonly string[]
```

### 2. Formatter, lint, typecheck — PASS

`npx oxfmt --config .oxfmtrc.json --check` over `src/core/helpers.ts src/core/types.ts
src/core/Guide.ts guides/guide.md tests/guides.test.ts tests/src/core/helpers.test.ts
tests/src/core/Guide.test.ts` — exit 0:

```
All matched files use the correct format.
Finished in 717ms on 7 files using 4 threads.
```

`npm run lint:check` — exit 0, no findings:

```
> oxlint --config .oxlintrc.json --deny-warnings .
```

`npm run check` — exit 0:

```
> tsc --noEmit -p configs/src/tsconfig.core.json
```

### 3. `npm run test:src:core` — PASS

Exit 0:

```
 Test Files  8 passed (8)
      Tests  481 passed (481)
   Duration  1.50s
```

The finding-5 fixture and the `Guide.unnamed()` cases are present and green; the failing-first
reading is in finding 5.

### 4. `npm run test:guides` — PASS

Exit 0, with RN reading `guide.unnamed()`:

```
 Test Files  1 passed (1)
      Tests  47 passed (47)
   Duration  1.03s
```

## Tree state

`git status --short`:

```
 M guides/guide.md
 M src/core/Guide.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/shapers.ts
 M src/core/sources/Source.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/src/core/Guide.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/shapers.test.ts
 M tests/src/core/sources/Source.test.ts
 M tests/src/core/validators.test.ts
```

`git diff --stat` against `HEAD` (`d3ee1bb`), carrying D1, D1-fix, and this round together:

```
 guides/guide.md                       |  248 ++++++--
 src/core/Guide.ts                     |   18 +-
 src/core/constants.ts                 |   11 +
 src/core/factories.ts                 |   71 ++-
 src/core/helpers.ts                   |  651 +++++++++++++++++---
 src/core/shapers.ts                   |   71 ++-
 src/core/sources/Source.ts            |   88 +--
 src/core/types.ts                     |  138 ++++-
 src/core/validators.ts                |   98 ++-
 tests/guides.test.ts                  |   79 ++-
 tests/src/core/Guide.test.ts          |   60 +-
 tests/src/core/factories.test.ts      |   50 +-
 tests/src/core/helpers.test.ts        | 1047 +++++++++++++++++++++++++++++++--
 tests/src/core/shapers.test.ts        |  103 +++-
 tests/src/core/sources/Source.test.ts |   96 +--
 tests/src/core/validators.test.ts     |   77 ++-
 16 files changed, 2583 insertions(+), 316 deletions(-)
```

This round wrote `src/core/helpers.ts`, `src/core/types.ts`, `src/core/Guide.ts`,
`guides/guide.md`, `tests/guides.test.ts`, `tests/src/core/helpers.test.ts`, and
`tests/src/core/Guide.test.ts`. No file was added or removed, no file outside the D1 brief's owned
set was touched, and `README.md` was read only.

## Flagged claims

- **`maskFences` is a new public export, not named by the brief.** The ruling required a fenced-body exclusion at four search sites; a shared leaf is how the four stay one rule. `AGENTS.md` § Design laws forbids a hidden module helper, so it is exported, tested at `tests/src/core/helpers.test.ts:2227`, and documented at `guides/guide.md:97`. If the Orchestrator wants the projection private to the doc-block readers, that is a successor decision, not something this unit could take silently.
- **`maskFences` recognizes a wider fence than `collectExamples` unwraps.** The mask opens a body on an indented marker and on tildes, matching the brief's wording; `collectExamples`' body reader still unwraps only a column-zero backtick fence (`src/core/helpers.ts:1737`). The directions are safe — the tag search is the more conservative of the two — but a tilde-fenced or indented `@example` body still reaches `code` verbatim with its markers. Widening the body reader was outside this brief.
- **The `Guide.unnamed()` positive case builds its guide from an inline markdown string**, not from a fixture file, because no fixture under `tests/fixtures` carries a nameless row. `tests/src/core/Guide.test.ts:69`.
- **`guides/guide.md:685` still describes the EQ fixtures as "a later fence under one heading left outside the comparison".** That is what the fixtures at `tests/src/core/helpers.test.ts:2578` and `:2586` plant. The per-title rule finding 6 states is wider than those fixtures: no test plants two distinct headings that flatten to the same title. The rule is stated and the code already implements it (`findDrift` keys `compared` on the flattened title); the wider fixture is a finding for the next change against the EQ capability.
- **The gate readings are this unit's own, taken inside its own exec.** The authoritative tree-wide sweep belongs to an independent `verifier`. `npm run build` and `npm test` were not run here; the brief's criteria name neither.
- **No deviation was triggered.** No ruling needed a compiler or parser in `src/**`, no criterion needed an off-limits file, and no gate failed outside the owned files.

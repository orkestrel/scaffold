# Unit report — D2-fix, `@orkestrel/guide` at `/home/user/fleet/guide`

Done. Every edit G1 to G10 landed and every acceptance criterion is green. `implementer`, Opus 5,
subjective lane. One decision departs from a clause under **Edits, exact** — the span record's name
— and it is recorded with the rule that forced it.

## The edits

**G1. `WRAP_WIDTH`, and the width as a caller's choice.** `src/core/constants.ts:65`
(`export const WRAP_WIDTH: number = 100`). The TSDoc states a character budget — the greatest
number of characters a re-wrapped line may carry, counted from the line's first character with a
tab counting as one — and names the consequence a caller inherits: a formatter that renders a tab
wider reads the same line as longer, so a caller whose formatter measures differently passes its own
width. The `printWidth` claim is gone from the TSDoc and from the guide row
(`guides/guide.md:70`). `replaceSummary` takes `width` third, defaulting to `WRAP_WIDTH`
(`src/core/helpers.ts:2627-2631`), and its `@param` and `@remarks` name the parameter and the
character accounting. `grep -n "WIDTH" src/core/constants.ts src/core/helpers.ts guides/guide.md`
prints `WRAP_WIDTH` sites only.

**G2. One miss shape.** Every replacer returns `string | undefined`, and `undefined` means "not
replaced" everywhere.

| Function | Line | Signature |
| --- | --- | --- |
| `replaceCell` | `src/core/helpers.ts:2507` | `(guide: string, key: string, summary: string) => string \| undefined` |
| `replaceFence` | `src/core/helpers.ts:2567` | `(guide: string, title: string, example: SourceExample) => string \| undefined` |
| `replaceSummary` | `src/core/helpers.ts:2627` | `(comment: string, summary: string, width?: number) => string \| undefined` |
| `replaceExample` | `src/core/helpers.ts:2692` | `(comment: string, example: SourceExample) => string \| undefined` |

`replaceSummary` returns `undefined` for a text that is no doc block (`:2632`) and for a summary
carrying no word (`:2636`, `wrapped.length === 0`, which is `wrapText`'s own answer for a wordless
text rather than a second emptiness rule). The empty summary no longer deletes: the case
`returns undefined for a summary carrying no word and deletes no description`
(`tests/src/core/helpers.test.ts:3723`) replaces the deletion case D2 shipped and covers a tagless
block, which is where the erasure did the most damage. A tagless block with a matching summary
returns the input — `returns a block carrying no tag byte for byte when the summary is its own`
(`:3712`). `replaceExample` returns `undefined` for a text that is no doc block (`:2693`), for code
the emitted fence cannot enclose (`:2694`, `example.code.includes('```')`), and for a title no tag
carries (`:2704`), which now covers the untitled request against a block whose tags all carry a
title. Its cases are `returns undefined for a title no tag carries and for an untitled request`
(`:3808`) and `returns undefined for code the emitted fence cannot enclose` (`:3821`); the latter
pairs the refused three-backtick body with an accepted tilde body, so it discriminates the run the
fence cannot enclose from a fence-shaped body it can.

**G3. `replaceCell`'s identity compares the compared forms.** `src/core/helpers.ts:2536` —
`(extractRowSummary(located, index) ?? '') === normalizeSummary(summary)`. Case:
`is a fixed point on the second run for a summary the compared form moves` (`:3481`), over a
summary carrying a double space, one carrying a `{@link}`, and one carrying a padded code span; each
writes once, and the second run returns its input.

**G4. The compared form's code-span clause.** `src/core/helpers.ts:1701`. The clauses land in the
order the brief fixes: `text.split(/((?<!`)`[^`]+`(?!`))/)` locates every single-backtick span
first; the `{@link}` expansion runs on the outside segments only; each located span's content
collapses its whitespace and then trims its boundary, keeping one space when the content is all
whitespace; the whole result collapses and trims last.

- The delimiter set is stated as **one backtick per side with no inner backtick**, and the
  lookarounds are what make a multi-backtick construct travel untouched rather than having its inner
  run trimmed. That is the reading the audit verdict fixes ("a multi-backtick span … stays
  untouched"); `buildCell`'s bare `/`([^`]+)`/` would have matched the inner run of a doubled
  delimiter, so the locator and `buildCell` read the same spans and disagree only where the form is
  unrepresentable anyway.
- `MethodGroup`'s description is rewritten so no code span carries a backtick
  (`src/core/types.ts:127`): it names the H4 heading that carries the interface name as a code span,
  without nesting. Measured consequence in `tmp/u2e-idem-2.log.txt`: the text D2 shipped reaches a
  render fixed point only after a second render (a `#` escape appears and then sticks), and the text
  this round ships is a fixed point at the first.
- Guide sites: the clause list at `guides/guide.md:344-353` gains the locate clause, qualifies each
  `{@link}` clause with "outside a located span", and states the boundary trim; the
  "Nothing else is transformed" paragraph gains the in-span literal sentence; a paragraph on the
  order (`:362-367`) and a paragraph naming the excluded shapes (`:369-372`) follow it. `` ` | ` ``
  is restored at `guides/guide.md:512`, agreeing again with `src/core/types.ts:200`.
- Cases: `converges a padded, a one-sided, and a bare code span on the same form` (`:2042`),
  `converges the guide side and the source side on a padded and a one-sided span` (`:2054`, driving
  the real parser and `extractCellText`), `keeps one space for a span whose content is all
  whitespace` (`:2065`), `leaves a link token inside a code span literal and expands the one outside
  it` (`:2070`), `leaves a span delimited by more than one backtick untouched` (`:2076`),
  `collapses a span wrapped across two physical lines before trimming its boundary` (`:2081`), and
  `is a fixed point on its own output` (`:2085`).
- **The corpus round trip after the clause, re-run: green.** `renders every doc block summary this
  package ships back to itself` (`tests/src/core/helpers.test.ts:3104`) passes over 173 blocks. The
  `\|` escape holds in the direction that matters: the compared form `` `|` `` builds a real code
  span, `renderMarkdown` writes it into a table cell as `` `\|` ``, and reading it back gives
  `` `|` `` again. Nothing was worked around.

**G5. The guide's prose.** Heading renamed to `## The renderers and the replacers`
(`guides/guide.md:569`). The round-trip sentence is now the caller's obligation (`:577-585`): each
renderer produces the block a guide section contains, so reading one back parses it under the
section heading the caller supplies, and the guide states the concrete forms
(`'## Surface\n\n' + renderSurface(symbols)` and `'## Methods\n\n' + renderMethods(group)`) and says
`renderExample` needs no heading. `tests/guides.test.ts:390` executes it —
`reads a rendered Surface table back under the section heading its caller supplies` renders a
Surface table, asserts the bare render reads back to nothing, and asserts the prefixed
render reads back to the symbols; `carries the caller-obligation sentence the round trip proves`
(`:401`) is the presence guard beside it. "with one rule the campaign fixes" is gone and the rule
stands on its own authority (`:617-621`). The seed sentences are present tense for what exists: a
script you write reads the file, chooses the direction, and writes the result back (`:571-575`), and
the gate reports and never writes (`:620`). `grep -n "campaign" guides/guide.md` prints nothing.

**G6. The corpus reads the real spans.** `tests/src/core/helpers.test.ts:2945-2970` builds each
block from `extractSourceLines`'s own aligned JSDoc projection — the columns that reader retains for
a genuine span and withholds from an opener written inside a string or a template literal — and
takes the whole physical lines, so the indentation and the markers a rewrite must preserve are in
the corpus. The comment describes exactly that. `describe('the corpus this package ships')`
(`:3030`) asserts the floors, asserts that the walk covers every block `extractSourceComments`
attaches, and carries the negative control `leaves an opener written inside a template literal out
of the corpus`, which is the defect a file-text scan has and this walk does not. The floors are
`CORPUS_FLOOR = 150` and `DESCRIBED_FLOOR = 150` (`:2976-2977`), read against 173 blocks, every one
described; the floors were set by raising them to a value the corpus cannot meet and reading the
reported actual, which is also the proof those assertions can fail. `carries a rewrite back into the
file, read by the reader the gate compares on` (`:4006`) runs one `replaceSummary` result through
`collectSummaries` over `extractSourceLines` and asserts the new description comes back.

**G7. `wrapText`'s over-length token.** The TSDoc already states it (`src/core/helpers.ts:1727`:
"a word longer than `width` takes its own line rather than being split"). The case added is
`stands an over-length token alone and lets that one line pass the width`
(`tests/src/core/helpers.test.ts:3138`), which pins the boundary either side of the width and the
line length the exception produces, and `lets a token longer than the budget pass it on its own
line` (`:3664`) carries the same exception through to `replaceSummary`, which is where the checker
found the claim unstated.

**G8. The report.** This document. The mutation totals, the probe disclosure, and the prose
disclosure follow.

**G9. `locateComment`.** `src/core/helpers.ts:2769` —
`locateComment(text: string, key: string): MarkdownSpan | undefined`. It returns the doc block's own
character region, from the start of the opener's line (the indentation included) to the character
past the closing marker, which is the raw text `replaceSummary` and `replaceExample` document as
"as it sits in the file"; a caller slices, rewrites, and splices through `spliceSpan` with no
adjustment. Attachment is `extractSourceComments`'s, and the key grammars are the ones the readers
already run: `extractExports`'s column-zero `export` head for a declaration, and
`extractDeclaration`'s column-zero head with `extractMemberMethods`'s one-tab callable shape for a
member, the owner ending at the first column-zero `}`. Guide row at `guides/guide.md:145`.

Cases in `describe('locateComment')` (`tests/src/core/helpers.test.ts:3878`), over the D1 control
fixtures plus a member key: the overload set, a member key with its indentation, an owner closed at
its brace so a later declaration keys no member, a CRLF file, a key nothing carries, the region its
own documented example states, the end-to-end rewrite, and
`misses the shapes the attaching reader misses, and no others here` — the blank-line-separated
block, the block inside a template literal, and the re-export-only barrel, each already recorded as
that reader's own boundary. `locates the block behind every summary this package ships` (`:4027`)
runs it over this package's whole source and requires the located block's own description to equal
the summary `extractExports` reports, so a locator that found the neighbouring block reddens.

**The span record — the departure, recorded.** I did not add `SourceSpan`. The brief says to use the
package's existing span record where one exists, and `MarkdownSpan` is already in a public signature
of this package: `spliceSpan(source: string, span: MarkdownSpan, replacement: string)`, the exact
function G9 names as `locateComment`'s partner. `SourceSpan { start, end }` would be structurally
identical to `MarkdownSpan { start, end }`, which `.claude/rules/patterns.md` § Declared ecosystem
capabilities refuses ("Never reimplement or rename-wrap a declared package primitive") and
`AGENTS.md` repeats ("Reuse a primitive when its semantics match, and do not wrap it merely to
rename it"). Adding it would also force either a second structurally identical type flowing into
`spliceSpan` or a widened parameter there. The semantics match exactly — a half-open character
region over a string, `end - start` long — so `locateComment` returns `MarkdownSpan` and no type,
shape, guard, or contract was added. `src/core/types.ts` moved only for `MethodGroup`'s description.

**G10. Instruments with logs.** Paths follow.

## The mutation table

Each mutation planted in `src/core/helpers.ts` by `tmp/u8-mutations.mjs` and restored by the exact
reverse edit in the same run; the script asserts the restored file is byte-identical to the original
and re-runs the suite to confirm. Every total is from a run against the test file this round ships.
Log: `tmp/u8-mutations.log.txt`.

| Mutation | `npm run test:src:core` | Reds |
| --- | --- | --- |
| baseline (no mutation) | `574 passed (574)` | — |
| `replaceCell` returns `guide` instead of splicing | `3 failed \| 571 passed (574)` | `changes the one row it names and no other row`; `replaces one Methods cell by its Owner.member key`; `is a fixed point on the second run for a summary the compared form moves` |
| `buildCell` never emits a code span | `3 failed \| 571 passed (574)` | `inverts extractCellText on plain text and on a code span`; `reads a leading and a trailing code span`; `reads the inner delimiter of a doubled run and leaves the outer backticks as text` |
| `replaceSummary` compares raw text instead of the compared form | `1 failed \| 573 passed (574)` | `returns every described doc block this package ships byte for byte when the summary is its own` |
| `replaceFence` takes the last fence of a title, and `replaceExample` drops the separator walk-back | `6 failed \| 568 passed (574)` | `replaces the fence of that title and keeps every byte outside it`; `leaves a later fence of the same title outside the pairing`; `replaces the fence language with the body`; `returns the guide byte for byte when the fence already carries that body`; `replaces the body of the tag carrying that title and leaves the other tag alone`; `keeps a tag-shaped line inside the current body out of the tag search` |
| restored | `574 passed (574)` | — |

The D2 report's readings were taken against a 546-case suite while 548 shipped. These are taken
against the 574 the suite carries after this round, and the `replaceSummary` mutation's red is a
case this round rewrote, so no case in the table is inherited unexamined.

## The probe disclosure

**The exact paths the D2 `npm run test:probe` probe wrote and deleted are unrecoverable from this
checkout, and I am flagging that rather than guessing.** What is recoverable: the `probe` project's
include is `tmp/probe/**/*.test.ts` (`vite.config.ts:113`), so every file it wrote was a
`.test.ts` under `tmp/probe/`, and the D2 report names that directory. The evidence that nothing
more survives — `find . -path ./node_modules -prune -o -path '*probe*' -print` returns only
`./guides/probe.md`; `tmp/probe/` does not exist; `tmp` is ignored by `.gitignore`, so no probe file
entered history and `git log --all --diff-filter=D --name-only -- 'tmp/*'` returns nothing; and no
Vitest cache directory survives. The claim the probe settled (the `oxfmt` round trip over a replaced
cell) still rests on the D2 report's recorded run and remains the open finding D2 recorded.

## The instrument paths

Re-run against the tree after this round's edits, each with its log beside it under
`/home/user/fleet/guide/tmp/`.

| Instrument | Log | Reading |
| --- | --- | --- |
| `tmp/u3-wrap.mjs` | `tmp/u3-wrap.log.txt` | `src/core/helpers.ts`: 64 description paragraphs read, 61 move at width 100. Across `src/core`: 140 read, 122 move. |
| `tmp/u3b-width.mjs` | `tmp/u3b-width.log.txt` | Across `src/core`: 140 paragraphs, 11 single-line, 129 multi-line, 94 reproduced by some greedy width; best widths 93 (38), 92 (37), 95 (37); longest physical description line 122. |
| `tmp/u7-summary.mjs` | `tmp/u7-summary.log.txt` | `src/core/helpers.ts`: 64 blocks, 0 move with the equality short circuit, 63 move under a forced re-wrap at width 100. Across `src/core`: 172 blocks, 0 move, 131 move forced, 0 genuine replacements fail to re-read. |
| `tmp/u2d-control.mjs` | `tmp/u2d-control.log.txt` | Class B (padded code span) DIFFERS, Class A (backtick inside a span) DIFFERS. **Coverage: this instrument carries its own transcription of `normalizeSummary` at D2's clause and compares the guide side against the raw summary, so it reports on that transcription rather than on the tree.** Superseded. |
| `tmp/u2d-control-2.mjs` | `tmp/u2d-control-2.log.txt` | The successor: it compiles the shipped `normalizeSummary` body straight out of `src/core/helpers.ts` and compares compared form against compared form. Class B padded, one-sided, and all-whitespace all AGREE; a link token inside a span AGREES; **Class A (a backtick inside a code span) still DIFFERS**, which is the documented exclusion and is also this instrument's negative control. |
| `tmp/u2e-idem.mjs` | `tmp/u2e-idem.log.txt` | `MethodGroup` as D2 shipped it: first render fixed point at render 2. |
| `tmp/u2e-idem-2.mjs` | `tmp/u2e-idem-2.log.txt` | The successor: it reads `MethodGroup`'s description out of `src/core/types.ts` as this round ships it. Fixed point at render 1, against render 2 for the text D2 shipped. |
| `tmp/u8-mutations.mjs` | `tmp/u8-mutations.log.txt` | The mutation table, and the byte-identical restore. |

`u3-wrap.mjs`, `u3b-width.mjs`, and `u7-summary.mjs` take their file list on `argv`; run with no
argument they read nothing and report zeros, so the log records the argument list each run used.
Each carries its own transcription of the transform it measures, so their subject is the source
text's hand-wrapping rather than the shipped compared form; the shipped form is measured by
`u2d-control-2.mjs` and by the suite.

## The corpus round trip after the clause

`npm run test:src:core` exit 0. `renders every doc block summary this package ships back to itself`
passes over 173 blocks, every one carrying a description. The compared form now spells
`` `|` `` where the source writes `` ` | ` ``, `buildCell` emits a real code span for it,
`renderMarkdown` writes `` `\|` `` inside the table cell, and `extractCellText` plus
`normalizeSummary` read it back to `` `|` ``. Green, with no workaround: the corpus case is
unchanged in shape and the clause is what moved.

## Criteria, in the brief's order

**1. The greps.** Each prints what the criterion requires.

```text
$ grep -n "WIDTH" src/core/constants.ts src/core/helpers.ts guides/guide.md
src/core/constants.ts:65:export const WRAP_WIDTH: number = 100
src/core/helpers.ts:50:	WRAP_WIDTH,
src/core/helpers.ts:2618: * @param width - The character budget a re-wrapped line stays inside. Default: {@link WRAP_WIDTH}
src/core/helpers.ts:2630:	width: number = WRAP_WIDTH,
guides/guide.md:70:| `WRAP_WIDTH`       | const | `100` — the default character budget …
guides/guide.md:603:to `WRAP_WIDTH`, because a doc block's own wrapping is not recoverable from its text.

$ grep -n "export function locateComment\|export function replace" src/core/helpers.ts
2507:export function replaceCell(guide: string, key: string, summary: string): string | undefined {
2567:export function replaceFence(
2627:export function replaceSummary(
2692:export function replaceExample(comment: string, example: SourceExample): string | undefined {
2769:export function locateComment(text: string, key: string): MarkdownSpan | undefined {

$ grep -n "campaign" guides/guide.md
(no output, exit 1)
```

`replaceFence` and `replaceSummary` wrap their parameter lists, so their `string | undefined` return
sits on the closing line: `src/core/helpers.ts:2571` (`): string | undefined {`) and
`src/core/helpers.ts:2631` (`): string | undefined {`).

**2. Formatter, lint, typecheck.** Exit 0, 0, 0.

```text
$ npm run format:check   → exit 0; "All matched files use the correct format." (80 files)
$ npm run lint:check     → exit 0, no diagnostic
$ npm run check          → exit 0 (root project and configs/src/tsconfig.core.json)
```

**3. `npm run test:src:core`.** Exit 0.

```text
 Test Files  8 passed (8)
      Tests  574 passed (574)
```

Baseline at the D2 state was `548 passed (548)`. The cases G2 to G7 and G9 name are present and
green, each cited by `file:line` in § The edits. The mutation totals in § The mutation table were
taken against this suite.

**4. `npm run test:guides`.** Exit 0.

```text
 Test Files  1 passed (1)
      Tests  51 passed (51)
```

Baseline at the D2 state was `49 passed (49)`. The G5 assertion is
`reads a rendered Surface table back under the section heading its caller supplies`
(`tests/guides.test.ts:390`) with its transcription guard at `:404`; the G9 row resolves through the
bijection, which runs in both directions, so `locateComment` is documented and no phantom row
survives.

**5. Observation — `npm test` as a whole.** Exit 0.

```text
test:src     Tests  574 passed (574)
test:policy  Tests   77 passed (77)
test:config  Tests  111 passed | 1 skipped (112)
test:setup   Tests    7 passed (7)
test:guides  Tests   51 passed (51)
```

The one skip is pre-existing at the D2 state.

## Every prose edit this round makes

`guides/guide.md`:

- `:70` — the Constants row renamed to `WRAP_WIDTH` and its description restated as a character
  budget; the `printWidth` claim removed.
- `:100` — the `normalizeSummary` Helpers row's description restated for the clause and its order.
- `:143` — the `replaceSummary` row's signature gains `width?: number` and the `string | undefined`
  return, and its description names its misses.
- `:144` — the `replaceExample` row's signature gains the `string | undefined` return, and its
  description names its misses.
- `:145` — a new `locateComment` Helpers row.
- `:344` — a clause added to the transform's clause list (locate spans first).
- `:345-346` — each `{@link}` clause qualified with "outside a located span".
- `:353` — the code-span clause restated as the boundary trim, with the all-whitespace carve-out.
- `:355-359` — the "Nothing else is transformed" paragraph gains the sentence that a link token
  inside a code span stays literal on both sides.
- `:362-367` — a new paragraph on the clause order and why the trim is symmetric.
- `:369-372` — a new paragraph naming the shapes outside the compared form.
- `:512` — the RN bullet's separator restored from `` `|` `` to `` ` | ` ``.
- `:569` — the section heading renamed to `The renderers and the replacers`.
- `:571-575` — the seed sentence rewritten in the present tense for what exists.
- `:577-585` — the round-trip sentence replaced by the caller's obligation, with the concrete
  prefixed forms and `renderExample`'s exemption.
- `:596-603` — the doc-block paragraph gains `locateComment` and the caller's `width`.
- `:605-609` — a new paragraph stating the one miss shape and what it covers.
- `:614-615` — the identity paragraph gains the fixed-point sentence.
- `:617-621` — "with one rule the campaign fixes" removed; the rule stated on its own authority; the
  gate sentence rewritten as "reports and never writes".
- `:792` — the `tests/src/core/helpers.test.ts` bullet in `## Tests` extended to name the clause
  cases, the corpus floor and its reader, the miss shape and the fixed point, and `locateComment`.

`src/core/types.ts:126-129` — `MethodGroup`'s description rewritten so no code span carries a
backtick.

`src/core/constants.ts:51-64` — the `WRAP_WIDTH` doc block rewritten.

`src/core/helpers.ts` — doc blocks rewritten or extended: `normalizeSummary` (`:1666-1700`, the
clause, its order, and the excluded shapes), `replaceCell` (`:2479-2506`, the shared miss meaning
and the compared-form identity), `replaceFence` (`:2543-2566`, the shared miss meaning),
`replaceSummary` (`:2590-2626`, the misses, the tagless identity, and the width accounting),
`replaceExample` (`:2658-2691`, the misses and the fence-enclosure reason), and `locateComment`
(`:2728-2768`, new).

`tests/src/core/helpers.test.ts` — the section banner at `:2921` renamed and extended; the corpus
comment at `:2938` rewritten to describe the reader it uses; the floor comment at `:2972`; and one
explanatory comment above each new case.

`tests/guides.test.ts:386-389` — one comment introducing the executed round-trip assertion.

No other file's prose moved. No prose in this report states a count of a set that can grow; every
number here is a measurement reported with the run that produced it, a line number, or an exit code.

## Tree state

`git status --short`:

```text
 M guides/guide.md
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M tests/guides.test.ts
 M tests/src/core/helpers.test.ts
```

`git diff --stat`:

```text
 guides/guide.md                |  213 +++++--
 src/core/constants.ts          |   16 +
 src/core/helpers.ts            |  924 ++++++++++++++++++++++++++++--
 src/core/types.ts              |    4 +-
 tests/guides.test.ts           |   60 ++
 tests/src/core/helpers.test.ts | 1210 +++++++++++++++++++++++++++++++++++++++-
 6 files changed, 2314 insertions(+), 113 deletions(-)
```

`src/core/types.ts` joins the files D2 left modified, and it is in this unit's owned set. Nothing outside the owned
set was written. Nothing was committed, built, or installed. No dependency was added. No
discard-class git command ran. `shapers.ts`, `validators.ts`, `factories.ts`, `Guide.ts`, and
`sources/Source.ts` needed no change, because no type was added.

## Flagged claims

1. **The `npm run test:probe` paths are unrecoverable, not withheld.** § The probe disclosure gives
   the searches that establish it. This is the one line of G8 I could not close as written.
2. **`u3-wrap.mjs`, `u3b-width.mjs`, and `u7-summary.mjs` each carry their own transcription of the
   transform they measure**, at D2's clause. Their readings are about the source text's hand-wrapping
   and are unaffected by the code-span clause, but they are not readings of the shipped compared
   form. `u2d-control-2.mjs` is, because it compiles the shipped function body out of the source
   file; that is also why it is the instrument that can show the convergence.
3. **The clause's delimiter set is stated with lookarounds, which is narrower than `buildCell`'s
   regex.** The brief names "the delimiter set `buildCell` recognizes" and also requires a
   multi-backtick span to stay untouched; `buildCell`'s bare regex matches the inner run of a doubled
   delimiter, so the brief's wording cannot hold literally in each place. I took "stays untouched",
   which is the audit verdict's own wording, and stated the set precisely in the TSDoc and the
   guide. The case
   `leaves a span delimited by more than one backtick untouched` pins it either way.
4. **A code span whose own text carries a backtick still drifts**, and it is documented as an
   exclusion rather than closed. `tmp/u2d-control-2.log.txt` measures it (Class A DIFFERS), the
   `normalizeSummary` TSDoc names it, and `guides/guide.md:369-372` names it. `MethodGroup` was the
   only shipped block in that class and it was rewritten, so nothing this package ships is in it.
5. **The corpus is 173 blocks where D2's regex scan read 151.** The projection walk admits blocks
   the regex missed rather than the reverse — the regex required an opener at the start of a line
   and closed on the first line containing `*/`. Every one of the 173 round trips and is byte-stable
   under the identity.
6. **`locateComment`'s member grammar tracks the owner with `extractDeclaration`'s rule** — a
   column-zero `export class` or `export interface` head, closed by the first column-zero `}` — and
   a member's own grammar is `extractMemberMethods`'s one-tab callable shape. It is the same reading
   those readers do over the same projection, not a second scanner; the case
   `closes an owner at its column-zero brace, so a later declaration keys no member` is the boundary
   proof.
7. **Not run, per the brief's permitted-command list:** `npm run build` and `npm run test:probe`.
   The authoritative tree-wide sweep belongs to `verifier`.

## Findings for the next change

1. **`locateComment` has no `collectKeys` sibling, deliberately.** The key derivation — every
   compared key a file's records carry, keyed by `SourceLine` — sits inside `locateComment` rather
   than beside `collectSummaries` as an exported reader, because the brief names one addition and
   `AGENTS.md`'s minimal-API gate refuses a second export with no consumer. D5's seed is that
   consumer: a seed that must report the keys it could not place, or that rewrites several blocks in
   one file, will want the map once rather than a walk per key. Promote it when the seed asks.
2. **The formatter round trip still has no in-suite home.** Unchanged from D2's finding 2, and this
   round did not touch it.
3. **Test infrastructure that wants promoting.** `readBlocks`, `readSummary`, `CORPUS`,
   `CORPUS_FLOOR`, and `DESCRIBED_FLOOR` sit at module scope in
   `tests/src/core/helpers.test.ts` because `tests/setup.ts` is off-limits to this unit. Promote them
   together when a second suite needs them.
4. **This checkout's own guide still heads its compared columns `Behavior`, `Shape`, `Signature`,
   `Builds`, and `Returns`.** D1 named it, D2 added rows under `Behavior`, and this round added the
   `locateComment` row under the same header. D7.guide is unchanged in scope and has one more row to
   convert.
5. **`replaceExample` refuses a fenced body rather than widening its fence.** Widening the emitted
   run and `collectExamples`'s reader together is the other repair the objective lane named; it moves
   a reader's grammar, so it belongs with whoever owns the `@example` body contract rather than here.
   The refusal is total and documented, and the case pins it.

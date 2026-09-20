# Unit U3 — report 6 (successor brief 8)

Every item of `u3-brief-8.md` is done. Every gate the brief names exits 0 on managed
Chromium, and `test:src:styles`, `test:src`, and `test:setup:browser` exit 0 on Edge. Item 1 ran red
before its fix and green after, on the cases that name the defect; item 6's guard was read firing
under a planted key and the built cascade is byte-identical without it. No deviation.

Item 1 closed the seam wider than the brief's four readers: `extractCompoundTags` also scanned
selector text with a pattern of its own, so it now reads through the walker too. That is recorded
under § Ancillary choices with the rest.

## Touched files

| File                                    | Change over the report-5 baseline                                                                                                                                       | Lines       |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `guides/veneer.md`                      | `#### Text and surface`, `#### Links`, `#### Type`, `#### Space, border, radius, and elevation`, and `#### Motion, focus, validation, breakpoints, and stacking` each gained an introductory sentence; the `interpolate-size` paragraph moved from § Reference map to § Showcase's baseline paragraph | 381 → 398   |
| `src/styles/_mixins.scss`               | `role-each` gained the comment recording why it is retained against the one-caller rule                                                                                 | 132 → 142   |
| `src/styles/_theme.scss`                | the asset `@each` gained an `@error` naming a key `tokens.$dark` does not declare                                                                                       | 25 → 28     |
| `tests/setupConformance.ts`             | the header names the `conformance` and `setup` projects and the file each loads it from                                                                                 | 233 → 235   |
| `tests/setupStyles.ts`                  | gained `SelectorStep` and `walkSelector`; `findGroupEnd`, `splitTopLevelList`, `splitTopLevelCompounds`, `normalizeComplexSelector`, and `extractCompoundTags` all read through the walker and their TSDoc refers to its grammar | 1139 → 1149 |
| `tests/setupStyles.test.ts`             | cases for the walker, the quoted-parenthesis list split, the escaped combinator, the escaped space, the quoted-parenthesis compound read, and the two pair readings, each with its control; `walkSelector` in the import list and the export list | 522 → 578   |
| `tests/src/styles/fixtures/mixins.scss` | the pinning comment rewrapped, which report 5 left broken mid-sentence                                                                                                  | 34 → 33     |

`git status --porcelain` at return lists report 5's set and nothing else. No file was added or
removed. Tracked diffstat:

```text
 README.md                         |   4 +-
 configs/src/vite.styles.config.ts |   3 +-
 guides/README.md                  |   8 +
 guides/veneer.md                  | 342 +++++++++++++-
 src/core/index.ts                 |   2 +
 src/styles/_mixins.scss           | 124 +++++
 src/styles/_theme.scss            |  28 +-
 src/styles/_tokens.scss           | 353 +++++++++++++-
 src/styles/index.scss             |   2 +
 tests/distribution.test.ts        |   9 +-
 tests/setup.ts                    |  48 ++
 tests/setupBrowser.test.ts        | 212 ++++++++-
 tests/setupBrowser.ts             | 293 +++++++++++-
 tests/setupConformance.test.ts    |   8 +
 tests/setupConformance.ts         |  21 +-
 tests/setupStyles.test.ts         | 431 ++++++++++++++++-
 tests/setupStyles.ts              | 970 +++++++++++++++++++++++++++++++++++++-
 tests/src/core/index.test.ts      |  53 ++-
 tests/src/styles/index.test.ts    |  41 +-
 19 files changed, 2897 insertions(+), 55 deletions(-)
```

## Item 1 — the tokenizer's grammar

`walkSelector(text)` returns one `SelectorStep` per UTF-16 unit of `text`, at the same index,
carrying `char`, `index`, `depth`, and `literal`. Its grammar sentence, as the TSDoc states it:

> The grammar covers strings, escapes, and groups. A `"` or a `'` opens a string that the same mark
> closes, and every character of it, the marks included, is literal. A `\` and the character after
> it are literal wherever they appear, so an escaped quotation mark leaves its string open and an
> escaped `+` belongs to the identifier around it rather than joining two compounds. A `(` or a `[`
> opens a group that a `)` or a `]` closes, groups nest, and `depth` counts the ones still open; a
> closer with no opener leaves `depth` at zero.

A group's opener and its matching closer carry the depth the group sits at; its contents carry one
more. A literal character opens no group, closes none, and separates nothing.

Text outside the grammar is walked rather than refused, and the TSDoc says what happens to it: an
unterminated string leaves every character after its opening mark literal to the end of the text,
and an unclosed group leaves every character after it one deeper to the end, which is what makes
`findGroupEnd` answer `text.length` for a group that never closes. The existing unclosed-group case
`findGroupEnd(':is(h1', 3)` still answers `6`, and `walkSelector("'a")` reports both characters
literal.

Each reader's TSDoc now names that grammar instead of restating a partial copy of it: `findGroupEnd`
takes "the first closer the grammar `walkSelector` states reads back at the opener's own depth",
`splitTopLevelList` and `splitTopLevelCompounds` each defer to "the grammar `walkSelector` states",
`normalizeComplexSelector` spaces "each `>`, `+`, and `~` the grammar `walkSelector` states reads as
a combinator", and `extractCompoundTags` reads an argument "only where the grammar `walkSelector`
states puts its `(` at the compound's own depth outside quotation".

## Item 1 — every reading, before and after

Taken by running the live functions through a probe at `tmp/probe/selector8.test.ts` in the `probe`
project, against the pre-brief-8 readers extracted verbatim from
`tmp/u3/setupStyles-before-veil-plant.ts` and against the readers as they now stand, in one run. The
probe and its before-state module are retired to `tmp/u3/probe-selector-8.test.ts.txt` and
`tmp/u3/probe-before-8.ts.txt`, outside that project's include glob, because their question is
settled and their inputs are promoted into `tests/setupStyles.test.ts`.

**The four new readings, each with its control.** A control row is the same input with the quoted
`(` replaced by `x`, or the escape removed.

| Reader                     | Input                          | Required        | Before          | After           |
| -------------------------- | ------------------------------ | --------------- | --------------- | --------------- |
| `matchesLooseTagPair`      | `:is(.title[title="("], h1)+p` | `true`          | `false`         | `true`          |
| `matchesLooseTagPair`      | `:is(.title[title="x"], h1)+p` | `true`          | `true`          | `true`          |
| `matchesLooseTagPair`      | `h1[title="("], p`             | `false`         | `true`          | `false`         |
| `matchesLooseTagPair`      | `h1[title="x"], p`             | `false`         | `false`         | `false`         |
| `normalizeComplexSelector` | `h1\+p`                        | `h1\+p`         | `h1\ + p`       | `h1\+p`         |
| `normalizeComplexSelector` | `h1+p`                         | `h1 + p`        | `h1 + p`        | `h1 + p`        |
| `matchesLooseTagPair`      | `h1\+p`                        | `false`         | `true`          | `false`         |
| `matchesLooseTagPair`      | `h1+p`                         | `true`          | `true`          | `true`          |

The readers underneath them, on the same inputs:

| Reader                   | Input                        | Required                      | Before                          | After                         |
| ------------------------ | ---------------------------- | ----------------------------- | ------------------------------- | ----------------------------- |
| `splitTopLevelList`      | `h1[title="("], p`           | `['h1[title="("]', 'p']`      | `['h1[title="("], p']`          | `['h1[title="("]', 'p']`      |
| `splitTopLevelList`      | `h1[title="x"], p`           | `['h1[title="x"]', 'p']`      | `['h1[title="x"]', 'p']`        | `['h1[title="x"]', 'p']`      |
| `splitTopLevelList`      | `.title[title="("], h1`      | `['.title[title="("]', 'h1']` | `['.title[title="("], h1']`     | `['.title[title="("]', 'h1']` |
| `extractCompoundTags`    | `:is(.title[title="("], h1)` | `['h1']`                      | `[]`                            | `['h1']`                      |
| `extractCompoundTags`    | `:is(.title[title="x"], h1)` | `['h1']`                      | `['h1']`                        | `['h1']`                      |
| `splitTopLevelCompounds` | `h1\+p`                      | `['h1\+p']`                   | `['h1\+p']`                     | `['h1\+p']`                   |

**One reading the unified grammar corrected beyond the brief's four.** An escaped space is part of
an identifier, and the old splitter read it as a top-level separator:

| Reader                   | Input   | Required    | Before          | After       |
| ------------------------ | ------- | ----------- | --------------- | ----------- |
| `splitTopLevelCompounds` | `h1\ p` | `['h1\ p']` | `['h1\', 'p']`  | `['h1\ p']` |
| `splitTopLevelCompounds` | `h1 p`  | `['h1','p']`| `['h1','p']`    | `['h1','p']`|

**Every earlier reading, unchanged.** `matchesLooseTagPair`, covering reports 4 and 5:

| Input                      | Required | Before  | After   |
| -------------------------- | -------- | ------- | ------- |
| `:is(h1,:where(.title))+p` | `true`   | `true`  | `true`  |
| `:is(h1:not(.x), p) + p`   | `true`   | `true`  | `true`  |
| `[title=':is(h1)'] + p`    | `false`  | `false` | `false` |
| `:is(h1, p)`               | `false`  | `false` | `false` |
| `:where(h1, p)`            | `false`  | `false` | `false` |
| `:is(.title,h1)+p`         | `true`   | `true`  | `true`  |
| `h1, p`                    | `false`  | `false` | `false` |
| `details + summary`        | `true`   | `true`  | `true`  |
| `:is(h1)+:is(p)`           | `true`   | `true`  | `true`  |
| `details summary`          | `false`  | `false` | `false` |
| `details > summary`        | `false`  | `false` | `false` |
| `body`                     | `false`  | `false` | `false` |
| `:root`                    | `false`  | `false` | `false` |

`normalizeComplexSelector`:

| Input                | Required             | Before               | After                |
| -------------------- | -------------------- | -------------------- | -------------------- |
| `h1\ p`              | `h1\ p`              | `h1\ p`              | `h1\ p`              |
| `details   >   summary` | `details > summary` | `details > summary` | `details > summary` |
| ` details summary `  | `details summary`    | `details summary`    | `details summary`    |
| `:is(h1, h2)+p`      | `:is(h1, h2) + p`    | `:is(h1, h2) + p`    | `:is(h1, h2) + p`    |
| `:is(h1,  p)+p`      | `:is(h1,  p) + p`    | `:is(h1,  p) + p`    | `:is(h1,  p) + p`    |
| `[title="a  b"] + p` | `[title="a  b"] + p` | `[title="a  b"] + p` | `[title="a  b"] + p` |
| `[title="a b"] + p`  | `[title="a b"] + p`  | `[title="a b"] + p`  | `[title="a b"] + p`  |

`splitTopLevelCompounds`, `splitTopLevelList`, and `findGroupEnd`:

| Reader                   | Input                            | Required                             | Before  | After   |
| ------------------------ | -------------------------------- | ------------------------------------ | ------- | ------- |
| `splitTopLevelCompounds` | `:is(h1, p) + p`                 | `[':is(h1, p)', '+', 'p']`           | same    | same    |
| `splitTopLevelCompounds` | `.card h1 ~ p`                   | `['.card', 'h1', '~', 'p']`          | same    | same    |
| `splitTopLevelCompounds` | `[title='a b'] p`                | `["[title='a b']", 'p']`             | same    | same    |
| `splitTopLevelCompounds` | `[title="a\" b"] p`              | `['[title="a\" b"]', 'p']`           | same    | same    |
| `splitTopLevelCompounds` | `h1`                             | `['h1']`                             | same    | same    |
| `splitTopLevelCompounds` | `  `                             | `[]`                                 | same    | same    |
| `splitTopLevelList`      | `rgba(0, 0, 0, 0.5) 0 1px, #fff 0 2px` | `['rgba(0, 0, 0, 0.5) 0 1px', '#fff 0 2px']` | same | same |
| `splitTopLevelList`      | `:is(h1, h2) + p`                | `[':is(h1, h2) + p']`                | same    | same    |
| `splitTopLevelList`      | `a, , b`                         | `['a', 'b']`                         | same    | same    |
| `findGroupEnd`           | `:is(h1)` at 3                   | `6`                                  | `6`     | `6`     |
| `findGroupEnd`           | `:is(h1,:where(.title))` at 3    | `21`                                 | `21`    | `21`    |
| `findGroupEnd`           | `[title=')']` at 0               | `10`                                 | `10`    | `10`    |
| `findGroupEnd`           | `[title="a\"]"]` at 0            | `13`                                 | `13`    | `13`    |
| `findGroupEnd`           | `:is(h1` at 3                    | `6`                                  | `6`     | `6`     |
| `findGroupEnd`           | `:is(.title[title="("], h1)` at 3 | `25`                                | `25`    | `25`    |

`extractCompoundTags`, every earlier input: `h1`→`['h1']`, `P.lead`→`['p']`, `:is(h1)`→`['h1']`,
`:where( p )`→`['p']`, `:is(h1, p)`→`['h1','p']`, `:where(h1, p)`→`['h1','p']`,
`:is(.title,h1)`→`['h1']`, `p:is(p, .lead)`→`['p']`, `:is(h1,:where(.title))`→`['h1']`,
`:is(h1, :where(p, .title))`→`['h1','p']`, `:is(h1:not(.x), p)`→`['h1','p']`, `:not(h1)`→`[]`,
`:not(:is(h1))`→`[]`, `:root`→`[]`, `.card:hover::after`→`[]`, `[data-bs-theme='dark']`→`[]`,
`[title=':is(h1)']`→`[]`. Every one reads the same before and after.

## Item 1 — the failing-first proof

The proof is the promoted cases, not the probe. With every brief-8 case in place and the
pre-brief-8 readers planted back into `tests/setupStyles.ts` from
`tmp/u3/setupStyles-before-veil-plant.ts` by `tmp/u3/plant8.mjs`, `npm run test:setup` reported:

```text
Test Files  1 failed | 2 passed (3)
     Tests  7 failed | 62 passed (69)
```

The seven, by name:

- `exports the scanner, the predicates, the collectors, and the compatibility oracle, and nothing the document has to answer`
- `splits past a quoted parenthesis, which opens no group and so leaves the comma after it at the top level`
- `leaves an escaped combinator inside the identifier it belongs to, and stands an unescaped one alone`
- `walks each character of a selector with the group depth it sits at and whether it is text rather than syntax`
- `keeps an escaped space and an escaped combinator inside the one compound they belong to`
- `reads every bare tag a compound names, each alternative of a functional list included, and none for a punctuated compound`
- `reads a quoted parenthesis and an escaped combinator as the text they are rather than as grammar`

`tests/setupStyles.ts` was then restored from `tmp/u3/setupStyles-after-8.ts`, `diff -q` reported it
identical, and the same command reported `Tests 69 passed (69)`.

Every reader in `tests/setupStyles.ts` that scans selector text now does so through `walkSelector`.
The only remaining character loop is `splitTopLevelValues`, which reads a declaration value under a
different grammar — it emits a bare `/` as its own token and tracks no bracket depth — and reads no
selector.

## Item 2 — the bare tables

Each of the five headings the audit named now carries a complete sentence naming what its table
lists and what its columns hold, in the form `#### Factors` and `#### Palette and gray ramp` already
use. A pass over `guides/veneer.md` looking for a table row whose nearest preceding non-blank line
is a heading or another table's end returns, inside § Tokens, nothing: every table there follows a
sentence.

The one table elsewhere whose nearest preceding line is a heading is `#### \`ColorModeInterface\``
in § Methods, and it is not bare — "The interface exposes the following lifecycle operations." sits
directly before the heading and introduces it. Nothing to change.

## Item 3 — the `role-each` ruling

Recorded in one comment at the mixin's declaration in `src/styles/_mixins.scss`, stated against the
rule that deleted `theme-assets`:

> `.claude/rules/styles.md` keeps a one-partial pattern inline and creates no mixin for one caller,
> and `theme-tokens` is this mixin's only include in the shipped source. It is retained because its
> other caller is a proof the shipped source cannot supply.
> `tests/src/styles/fixtures/mixins.scss` includes it with a role and percentages of its own,
> pinning each endpoint to a palette token, so the mixed tiers are read as a function of the mix
> percentages alone. Inlining the `@each` into `theme-tokens` would put the tier math behind the
> whole theme closure and leave that proof reading a mode's own values instead. The deleted
> `theme-assets` mixin had no such proof: it emitted the dark scope's `url()` declarations and
> nothing read it except the scope that already carried them.

## Item 4 — the header

`tests/setupConformance.ts:2-5` now reads: "Node-only. The `conformance` project loads it from
`tests/conformance.test.ts`, and the `setup` project loads it from `tests/setupConformance.test.ts`
and from `tests/setupStyles.test.ts`, which reads the installed cascade through
`readBootstrapCascade`. A reader added here runs under every one of them." Those are the importers
`grep` finds, and `vite.config.ts` puts `tests/conformance.test.ts` in the `conformance` project and
`tests/setup*.test.ts` in the `setup` project.

## Item 5 — the orphan paragraph

The `interpolate-size: allow-keywords` paragraph is out of § Reference map's motion subsection, which
now holds tokens alone, and into § Showcase's styles-entry paragraph, after the sentence that names
the document and body baseline:

> The document baseline also declares `interpolate-size: allow-keywords`, and
> `tests/src/styles/elements/html.test.ts` reads it there. That proves the declaration reaches the
> document; what it interpolates is proved by the first animated consumer, which is the disclosure
> or drawer unit.

The sentence is otherwise the paragraph's own wording, and it sits after "It ships no component
treatments." so that pronoun still attaches to the styles entry. The baseline keeps the paragraph it
already had rather than taking a subsection of its own, because § Showcase describes it in one
paragraph and a subsection would be the only one in that section.

## Item 6 — the map join

`src/styles/_theme.scss`'s `@each` over `tokens.$assets` now fails the build on a key
`tokens.$dark` lacks:

```scss
@each $key, $name in tokens.$assets {
	@if not map.has-key(tokens.$dark, $key) {
		@error 'tokens.$assets names #{$key}, which tokens.$dark does not declare.';
	}
	#{$name}: #{map.get(tokens.$dark, $key)};
}
```

Read firing, under an `'absent-probe': '--bs-absent-probe'` entry planted in `tokens.$assets`:

```text
Error: [sass] "tokens.$assets names absent-probe, which tokens.$dark does not declare."
  src\styles\_theme.scss 23:5  @use
exit=1
```

`src/styles/_tokens.scss` was restored from `tmp/u3/tokens-before-guard-plant.scss`, `diff -q`
reported it identical, and the rebuild succeeded.

**The emitted bytes are unchanged.** `dist/src/styles/index.css` built before the guard landed was
kept as `tmp/u3/index-before-8.css`; `diff -q` against the cascade the full gate chain rebuilt
reports the two files identical, whole file and not only the asset lines. The asset extract is
identical too:

```text
$ diff tmp/u3/assets-before-8.txt tmp/u3/assets-final-8.txt
(identical: --bs-form-select-bg-img, --bs-form-switch-bg, --bs-navbar-toggler-icon-bg,
 --bs-accordion-btn-icon, --bs-accordion-btn-active-icon, each with its data URL)
```

## Item 7 — gates

Managed Chromium, Windows, 2026-09-20, from `tmp/u3/gates-8.log.txt`, run over the final tree.
`lint:check` and `check` print nothing on success:

```text
npm run format:check        All matched files use the correct format.                  exit=0
npm run lint:check          no diagnostics                                            exit=0
npm run check               no diagnostics                                            exit=0
npm run build               built in 353ms                                            exit=0
npm run test:src            Test Files  5 passed (5)    Tests  17 passed (17)         exit=0
npm run test:src:styles     Test Files  7 passed (7)    Tests  40 passed (40)         exit=0
npm run test:app            Test Files  2 passed (2)    Tests  3 passed (3)           exit=0
npm run test:journey        Test Files  4 passed (4)    Tests  32 passed | 4 skipped (36)   exit=0
npm run test:policy         Test Files  1 passed (1)    Tests  109 passed | 1 skipped (110) exit=0
npm run test:config         Test Files  1 passed (1)    Tests  173 passed | 1 skipped (174) exit=0
npm run test:setup          Test Files  3 passed (3)    Tests  69 passed (69)         exit=0
npm run test:setup:browser  Test Files  1 passed (1)    Tests  18 passed (18)         exit=0
npm run test:conformance    Test Files  1 passed (1)    Tests  7 passed (7)           exit=0
npm run test:guides         Test Files  1 passed (1)    Tests  18 passed (18)         exit=0
```

Edge `msedge`, same host and date, from `tmp/u3/edge-8.log.txt`, run over the same final tree:

```text
PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles     Test Files  7 passed (7)  Tests  40 passed (40)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:src            Test Files  5 passed (5)  Tests  17 passed (17)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser  Test Files  1 passed (1)  Tests  18 passed (18)  exit=0
```

`npm run test:distribution` needs the registry and stays the Orchestrator's. `npm run format` and
`oxlint --fix` were not run; `npx oxfmt --write` was run over `tests/setupStyles.test.ts` alone,
which is owned. The chains are `tmp/u3/gates-8.sh` and `tmp/u3/edge-8.sh`, each superseding its `-7`
predecessor. The instruments this brief added are `tmp/u3/plant8.mjs` (the failing-first plant and
its restore) and `tmp/u3/guide8.mjs` (the guide's edits).

## The writing sweep over what this brief added

Every line this brief added to `guides/veneer.md`, `src/styles/**`, and `tests/**` was swept
case-insensitively for `both`, `two`, `three`, `four`, `five`, `six`, `several`, and `multiple`, and
for every unconditional row of the substitution table. The unconditional rows return no hit. The
tally sweep returns, among the added lines, two hits and each is a permitted sense already ruled in
report 5: `{@link splitTopLevelList} serves both`, whose sentence names its members (selector text
and a declaration value), and `rather than joining two compounds`, the fixed arity a combinator
joins. The judged-set sweep returns `once` meaning one time in `Walks selector text once` and
nothing else new.

One count was written and removed before the gates: the walker's TSDoc opened "The grammar is three
rules", which tallies a set that can grow. It reads "The grammar covers strings, escapes, and
groups."

## Deviations

None. No gate went red after a fix inside owned files, no off-limits file was touched, and no
earlier reading the unified walker could not keep.

## Ancillary choices settled under the deviation contract

- **`walkSelector` and `SelectorStep`.** The verb-noun form every other reader in the module uses,
  and the entity's members are `char`, `index`, `depth`, and `literal`, each one word. The return is
  a `readonly SelectorStep[]` rather than a generator because `findGroupEnd` indexes it: `steps[open]`
  is the opener whose depth the closer must match.
- **The walk is by UTF-16 unit, through `text.split('')`.** A code-point walk would break the
  `steps[index].index === index` alignment `findGroupEnd` and `extractCompoundTags` slice against.
- **`extractCompoundTags` reads through the walker too**, beyond the four readers item 1 names.
  It carried its own `compound.slice(index).match(/^:(?:is|where)\(/u)` scan, and acceptance
  criterion 1 bars a reader scanning selector text outside the walker. It now takes an `(` the walk
  reports at the compound's own depth outside quotation and checks the text behind it for `:is` or
  `:where`, so every other group is passed over by depth rather than by a skip the reader computes.
- **The leading identifier keeps its anchored match.** `compound.match(/^([a-zA-Z][a-zA-Z0-9]*)/u)`
  reads position zero and scans nothing; the TSDoc says so.
- **`splitTopLevelValues` is left alone.** It reads a declaration value, not selector text, under a
  grammar the walker does not carry: a bare `/` is its own token and there is no bracket depth. The
  remark in `splitTopLevelCompounds` that already says why it cannot be reused stands.
- **`findGroupEnd` walks the whole text rather than from `open`.** The opener's depth is what
  identifies its closer, and the walk is what supplies that depth, so a walk starting at `open`
  would have to reconstruct the state the text before it establishes.
- **The fixture comment was rewrapped.** `tests/src/styles/fixtures/mixins.scss` carried a line
  broken mid-sentence ("so the painted result is a / function of the mix percentages alone") from
  report 5's item 3 edit. It is an owned file and the fix is wording alone.
- **The `interpolate-size` paragraph joined § Showcase's existing paragraph** rather than taking a
  subsection. § Showcase describes the styles entry in one paragraph and a subsection there would
  be the only one in the section.

## Observations, outside this brief's items

- **`transition` and `forced-colors` still have no include under `src/styles/**`.** Report 5 recorded
  this and nothing in brief 8 changes it. `guides/veneer.md` documents `transition` as Veneer's
  mechanism for the reduced-motion pair, so it remains a guide-visible decision for whichever unit
  owns the component partials that will include them.
- **The grab-bag heading is unchanged.** Reviewer finding 20 bound it to the next § Tokens editor,
  and this brief's item 2 gave `#### Motion, focus, validation, breakpoints, and stacking` an
  introductory sentence naming what it groups, which is what a reader scanning for a stacking rung
  now meets first.

# Unit U3 — report 5 (successor brief 7)

Every item of `u3-brief-7.md` is done. Every gate the brief names exits 0 on managed
Chromium, and `test:src:styles`, `test:src`, and `test:setup:browser` exit 0 on Edge. Item 1 ran red
before its fix and green after, on the cases that name the defect; item 5's guide case and item 5's
negative-claim case each ran red under a control and green with it removed. No deviation.

Two rulings inside the brief's ancillary scope are recorded under § Ancillary choices: the legend
clause item 7 offered to remove is kept, because three other rows need it, and the `@each` reads the
asset entries of `tokens.$dark` through a name map rather than moving those entries.

## Touched files

| File                                   | Change over the report-4 baseline                                                                                                                                               | Lines      |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `guides/veneer.md`                     | Member-shape rule says "value"; the factor table lost its `Source` column and its intro names each scale; the `Source` sentence names the factor table among the tables without one; the customization prose names the new reading | 376 → 381  |
| `src/styles/_mixins.scss`              | Lost the `theme-assets` mixin                                                                                                                                                   | 148 → 132  |
| `src/styles/_theme.scss`               | The dark scope emits the assets inline through an `@each` over `tokens.$assets`; gained `@use 'sass:map'`                                                                        | 19 → 25    |
| `src/styles/_tokens.scss`              | Gained the `$assets` map naming the Bootstrap variable each image-valued dark entry is declared as, with the emitter's remarks                                                   | 341 → 355  |
| `tests/setup.ts`                       | The normalizer's remark names the spellings instead of tallying them                                                                                                            | 48         |
| `tests/setupBrowser.ts`                | `collectLayer`'s remark names the readings instead of tallying them                                                                                                             | 375        |
| `tests/setupConformance.ts`            | Gained `readBootstrapCascade`, importing `BOOTSTRAP_CASCADE_PATH` from `./setupStyles.js`                                                                                       | 218 → 233  |
| `tests/setupConformance.test.ts`       | Export-list case covers `readBootstrapCascade`; a case reads the installed stylesheet through it                                                                                 | 184 → 192  |
| `tests/setupStyles.ts`                 | `normalizeComplexSelector` copies parenthesized, bracketed, and quoted text through byte for byte; `splitTopLevelCompounds` honours an escape inside quotation; `extractCompoundTags` walks the compound and descends only into `:is()` and `:where()`; gained `findGroupEnd`, `VENEER_GUIDE_PATH`, and `FILL_ONLY_RECIPE`; three TSDoc blocks rewritten to what the readers do; two remarks name their members | 1031 → 1139 |
| `tests/setupStyles.test.ts`            | Cases for `findGroupEnd`, the escaped-quote split, the preserved whitespace, the nested and attribute-string compound readings, the three new pair readings, and the guide fence; the three oracle cases call `readBootstrapCascade()` | 490 → 522  |
| `tests/src/styles/integration.test.ts` | Gained the case reading what a fill override without the channel triplet leaves the triplet painting                                                                             | 88 → 101   |
| `tests/src/styles/fixtures/mixins.scss`| The pinning comment names the surfaces instead of tallying them                                                                                                                 | 33 → 34    |

`git status --porcelain` at return lists report 4's set plus `tests/setupConformance.ts` and
`tests/setupConformance.test.ts`, which this brief grants for item 8. No file was added or removed.
Tracked diffstat:

```text
 README.md                         |   4 +-
 configs/src/vite.styles.config.ts |   3 +-
 guides/README.md                  |   8 +
 guides/veneer.md                  | 325 ++++++++++++-
 src/core/index.ts                 |   2 +
 src/styles/_mixins.scss           | 114 +++++
 src/styles/_theme.scss            |  25 +-
 src/styles/_tokens.scss           | 353 +++++++++++++-
 src/styles/index.scss             |   2 +
 tests/distribution.test.ts        |   9 +-
 tests/setup.ts                    |  48 ++
 tests/setupBrowser.test.ts        | 212 ++++++++-
 tests/setupBrowser.ts             | 293 +++++++++++-
 tests/setupConformance.test.ts    |   8 +
 tests/setupConformance.ts         |  15 +
 tests/setupStyles.test.ts         | 375 ++++++++++++++-
 tests/setupStyles.ts              | 960 +++++++++++++++++++++++++++++++++++++-
 tests/src/core/index.test.ts      |  53 ++-
 tests/src/styles/index.test.ts    |  41 +-
 19 files changed, 2797 insertions(+), 53 deletions(-)
```

## Item 1 — the scanner readings

Taken by running the live functions through a probe at `tmp/probe/selector.test.ts` in the `probe`
project, before the fix and after. The probe is retired to `tmp/u3/probe-selector-7.test.ts.txt`,
outside that project's include glob, because its question is settled and its inputs are promoted
into `tests/setupStyles.test.ts`.

`matchesLooseTagPair`:

| Input                      | Required | Before  | After   |
| -------------------------- | -------- | ------- | ------- |
| `:is(h1,:where(.title))+p` | `true`   | `false` | `true`  |
| `:is(h1:not(.x), p) + p`   | `true`   | `false` | `true`  |
| `[title=':is(h1)'] + p`    | `false`  | `true`  | `false` |
| `:is(h1, p)`               | `false`  | `false` | `false` |
| `:where(h1, p)`            | `false`  | `false` | `false` |
| `:is(.title,h1)+p`         | `true`   | `true`  | `true`  |
| `h1, p`                    | `false`  | `false` | `false` |
| `details + summary`        | `true`   | `true`  | `true`  |
| `:is(h1)+:is(p)`           | `true`   | `true`  | `true`  |

`splitTopLevelCompounds`, over the normalized text:

| Input                | Required                    | Before                       | After                       |
| -------------------- | --------------------------- | ---------------------------- | --------------------------- |
| `[title="a\" b"] p`  | `['[title="a\" b"]', 'p']`  | `['[title="a\" b"] p']`      | `['[title="a\" b"]', 'p']`  |
| `:is(h1, p) + p`     | `[':is(h1, p)', '+', 'p']`  | `[':is(h1, p)', '+', 'p']`   | `[':is(h1, p)', '+', 'p']`  |

The failing-first proof is the promoted cases, not the probe. With the new readings in place and
the readers unchanged, `npm run test:setup` reported `Tests 4 failed | 57 passed (61)` — the
normalizer case, the splitter case, the compound-reader case, and the loose-pair case, which are
the four this brief added readings to. The reported failures included
`extractCompoundTags(':is(h1,:where(.title))')` returning `[]` where `['h1']` is required and
`matchesLooseTagPair(':is(h1,:where(.title))+p')` returning `false` where `true` is required. After
the fix the same command reported `Tests 62 passed (62)`, and `Tests 64 passed (64)` once items 5
and 8 landed their cases.

Three causes, each fixed in the reader that carried it.

- **The compound reader scanned text it must not read, and could not see text it must.**
  `extractCompoundTags` matched `/:(?:is|where)\(([^()]*)\)/gu` anywhere in the compound. That
  pattern cannot match a list carrying its own parentheses, so `:is(h1,:where(.title))` and
  `:is(h1:not(.x), p)` reported no tag at all, and it matched inside an attribute string, so
  `[title=':is(h1)']` reported the tag named in a value that selects nothing. The reader now walks
  the compound: at each position it takes an `:is(` or `:where(` opener and reads its argument's
  alternatives, and it skips every other group — an attribute selector, a `:not()` argument, any
  other functional pseudo-class — whole. It reads an alternative by calling itself, so a nested
  `:is()` or `:where()` list inside an alternative contributes its own tags while `:not(:is(h1))`
  contributes none.
- **The splitter's quotation ended on an escaped quote.** `splitTopLevelCompounds` closed the
  string at the `"` in `[title="a\" b"]`, so the following space read as a top-level separator, the
  compound and the descendant ran together, and a descendant pair went unread. It now tracks the
  backslash, so an escaped quotation mark leaves the string open.
- **The normalizer collapsed whitespace it promised to leave alone.** This is item 2 and is
  reported with it.

`findGroupEnd` is the group walk, exported and cased rather than folded into the reader, because
`AGENTS.md` bars a module helper nothing exports. It answers one question — where does the group
opening here close — over parentheses, brackets, nesting, quotation, and escapes, and its case
drives a plain group, a nested group, a quoted closer, an escaped quote inside a quoted value, and
an unclosed group.

## Item 2 — the normalizer readings

| Input                | Required                | Before                 | After                   |
| -------------------- | ----------------------- | ---------------------- | ----------------------- |
| `[title="a  b"] + p` | `[title="a  b"] + p`    | `[title="a b"] + p`    | `[title="a  b"] + p`    |
| `[title="a b"] + p`  | `[title="a b"] + p`     | `[title="a b"] + p`    | `[title="a b"] + p`     |
| `:is(h1,  p)+p`      | `:is(h1,  p) + p`       | `:is(h1, p) + p`       | `:is(h1,  p) + p`       |

**Decision: preserve, and keep the TSDoc's promise.** The old code stood the combinators alone in
one pass and then applied `replace(/\s+/gu, ' ')` to the whole result, which reached inside
parentheses, brackets, and quotation and made the two attribute selectors one string. The readers
need no collapsing there — `extractCompoundTags` splits an `:is()` argument with
`splitTopLevelList`, which trims each alternative, and `splitTopLevelCompounds` never splits below
the top level — so preserving costs the readers nothing and keeps the documented contract true.
The normalizer now collapses a whitespace run and spaces a combinator only at depth zero outside
quotation, and copies every other character through unchanged; the deferred space also makes the
result trimmed without a trailing pass. The first two rows are the case that distinguishes the two
values.

## Item 3 — the tallies

Repaired by naming the members:

- `tests/setupStyles.ts` — "the union covers `:root` and `[data-bs-theme=light]`, and the light
  theme adds nothing to it".
- `tests/src/styles/fixtures/mixins.scss` — "the fill the tiers mix and the body surface and body
  text they mix against".
- `tests/setup.ts` — "an authored spelling and an engine's spelling compare equal only after each
  goes through this", replacing a "two spellings … both" pair the analyst did not name.
- `tests/setupBrowser.ts` — "an unloaded cascade and an unfilled layer stay apart", replacing "the
  two readings".
- `tests/setupStyles.ts` — `matchesLooseTagPair`'s remark reads "more than one tag" where it read
  "several tags".

The sweep over every owned file for `both`, `two`, `three`, `four`, `five`, `six`, `several`, and
`multiple`, case-insensitively, leaves only hits in a permitted sense, each ruled:

- a fixed arity the signature names — `matchesPaintedColor` over its pair of expressions
  (`tests/setupBrowser.ts:236,240`, `tests/setupBrowser.test.ts:144`), a combinator joining two
  compounds (`tests/setupStyles.ts:694,792,923,943,946`, `tests/src/styles/index.test.ts:23`);
- a fixed CSS grammar — the four-token edge shorthand and the two-, three-, and four-token radius
  sides (`tests/setupStyles.ts:133,215` and the cases naming them);
- a sentence naming its members — `tests/setup.ts:13` (the caller wanting the groups and the caller
  wanting the leaves), `tests/setupBrowser.ts:254` (an `oklch()` recording and an `oklab()` mix),
  `tests/setupStyles.ts:996` (a color and its channel triplet);
- a literal identifier or CSS value, exempt as data — `--vn-probe-one` through `--vn-probe-three`,
  `--bs-one` through `--bs-four`, `clear:both`.

The same files sweep clean against the substitution table. Every hit in the judged set is a
permitted sense: `new` is the JavaScript operator or the font name `Courier New`, `once` means one
time, and `below` means lower than zero.

## Item 4 — the asset snapshot

`theme-assets` is gone from `src/styles/_mixins.scss`. The dark scope in `src/styles/_theme.scss`
emits the assets inline with an `@each` over `tokens.$assets`, reading each value from
`tokens.$dark`. The emitted bytes are unchanged:

```text
$ diff tmp/u3/assets-before-7.txt tmp/u3/assets-final-7.txt
(identical; five url() declarations in dist/src/styles/index.css)
```

The before snapshot was taken from the built cascade before the edit and the after snapshot from
the cascade the full gate chain rebuilt. `src/styles/_theme.scss` holds scopes, includes, and that
one `@each`, at 25 lines, and the literal-colour sweep over `src/styles/**` still returns, outside
`_tokens.scss`, only the three `color-mix(…, transparent)` expressions over tokens in
`_mixins.scss`. The dark-partition proof and `THEME_DARK_ADDITIONS` stay green
(`test:src:styles`, 40 passed).

**Observation, outside this item.** `transition` and `forced-colors` in `src/styles/_mixins.scss`
each have one include, and that include is `tests/src/styles/fixtures/mixins.scss` rather than a
partial: no file under `src/styles/**` includes either. Both are unchanged from `HEAD`
(`git show HEAD:src/styles/_mixins.scss` declares them), the package publishes compiled CSS rather
than its SCSS source, and `guides/veneer.md:336` documents `transition` as Veneer's mechanism for
the reduced-motion pair, so removing either is a guide-visible decision rather than this item's
cleanup. It is recorded for whichever unit owns the component partials that will include them.

## Item 5 — the recipe, the guide, and the negative claim

**The coupling is now read.** `tests/setupStyles.test.ts` gained a case requiring
`CUSTOMIZATION_RECIPE` inside the text `readFileSync(VENEER_GUIDE_PATH, 'utf8')` returns, the way
the oracle cases read the Bootstrap stylesheet. `VENEER_GUIDE_PATH` sits beside
`BOOTSTRAP_CASCADE_PATH` in `tests/setupStyles.ts` for the same reason that one does: a browser
project loads the module, so the path is there and the read is not. The constant's remarks now say
the case exists instead of saying nothing compares them.

The control that makes the case bind: changing `--vn-factor-density: 1.25` to `1.5` in the guide's
fence alone gives

```text
FAIL |setup| tests/setupStyles.test.ts > styles setup > carries the customization fence the guide
     publishes, byte for byte
Tests  1 failed | 62 passed (63)
```

The guide was restored from a copy taken before the plant, `diff -q` reported it identical, and the
rerun reported `Tests 63 passed (63)`.

**Decision on the negative claim: read it, and keep the sentence.** The guide's warning — a rule of
the consumer's own reading the channel triplet keeps painting the old brand where only the fill is
overridden — is the reason the fence carries the triplet override at all, so deleting it would
leave the fence's third declaration unexplained. `tests/src/styles/integration.test.ts` now mounts a
specimen whose own inline declaration reads `rgba(var(--vn-color-primary-rgb), 0.5)`, records what
it paints, loads `FILL_ONLY_RECIPE` — the recipe cut down to the fill override — and reads that the
fill repainted to `#2e7d32` while the specimen's own color did not move. The consumer's rule is an
inline declaration rather than a loaded class, so the reading exists before the override lands and
the case compares the same element with itself instead of against a literal triplet.

The control: putting `--vn-color-primary-rgb: 46, 125, 50;` back into `FILL_ONLY_RECIPE` gives

```text
FAIL |src:styles (chromium)| tests/src/styles/integration.test.ts:59:2 > token customization >
     leaves a consumer rule reading the channel triplet on the old brand where the fill alone is
     overridden
AssertionError: expected 'rgba(46, 125, 50, 0.5)' to be 'rgba(8, 65, 234, 0.5)'
Tests  1 failed | 39 passed (40)
```

`tests/setupStyles.ts` was restored from a copy taken before the plant, `diff -q` reported it
identical, and the rerun reported `Tests 40 passed (40)`. A second mechanism holds the constant to
its purpose: the Node case requires `FILL_ONLY_RECIPE` to carry `--vn-color-primary-base` and not
`--vn-color-primary-rgb`.

The guide's sentence naming what the proof reads now names this reading too.

## Items 6, 7, and 8

- **Item 6.** `guides/veneer.md:85` reads "A group's own value takes the `base` member and the
  `-base` suffix with it", so `--vn-radius-base` and `--vn-stack-drawer-base` fall under the rule
  that explains them.
- **Item 7.** The factor table is `Token`, `Value`, and `Alias`. Its introduction carries the
  content the `Source` cells held: each value is the neutral multiplier of the scale the token's own
  name gives, `density` for the space scale, `radius` for the radius scale, `elevation` for the
  shadow scale, and `motion` for the durations, and a factor is Veneer's own so it carries no
  `Source` column. The `Source` sentence at `:90` names the factor table beside the tier table and
  the departures table as the tables without that column. The legend clause is kept; see
  § Ancillary choices.
- **Item 8.** `tests/setupConformance.ts` exports `readBootstrapCascade()`, which reads
  `BOOTSTRAP_CASCADE_PATH` imported from `./setupStyles.js`. The three oracle cases in
  `tests/setupStyles.test.ts` call it, so the repeated `readFileSync` at case scope is gone;
  `tests/setupConformance.test.ts` covers it in the export list and in a case reading the installed
  stylesheet's own banner and a root variable. Both files hold the addition and nothing else. The
  `conformance` project stays green at 7 passed: it already requires `dist/` for its shipped-entry
  case, so the `dist` import `setupStyles.ts` carries adds no new precondition there.

## Item 9 — gates

Managed Chromium, Windows, 2026-09-20, from `tmp/u3/gates-7.log.txt`, run over the final tree.
`lint:check` and `check` print nothing on success:

```text
npm run format:check        All matched files use the correct format. (83 files)      exit=0
npm run lint:check          no diagnostics                                            exit=0
npm run check               no diagnostics                                            exit=0
npm run build               built in 316ms                                            exit=0
npm run test:src            Test Files  5 passed (5)    Tests  17 passed (17)         exit=0
npm run test:src:styles     Test Files  7 passed (7)    Tests  40 passed (40)         exit=0
npm run test:app            Test Files  2 passed (2)    Tests  3 passed (3)           exit=0
npm run test:journey        Test Files  4 passed (4)    Tests  32 passed | 4 skipped (36)   exit=0
npm run test:policy         Test Files  1 passed (1)    Tests  109 passed | 1 skipped (110) exit=0
npm run test:config         Test Files  1 passed (1)    Tests  173 passed | 1 skipped (174) exit=0
npm run test:setup          Test Files  3 passed (3)    Tests  64 passed (64)         exit=0
npm run test:setup:browser  Test Files  1 passed (1)    Tests  18 passed (18)         exit=0
npm run test:conformance    Test Files  1 passed (1)    Tests  7 passed (7)           exit=0
npm run test:guides         Test Files  1 passed (1)    Tests  18 passed (18)         exit=0
```

Edge `msedge`, same host and date, from `tmp/u3/edge-7.log.txt`, run over the same final tree:

```text
PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles     Test Files  7 passed (7)  Tests  40 passed (40)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:src            Test Files  5 passed (5)  Tests  17 passed (17)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser  Test Files  1 passed (1)  Tests  18 passed (18)  exit=0
```

`npm run test:distribution` needs the registry and stays the Orchestrator's. `npm run format` and
`oxlint --fix` were not run; `npx oxfmt` was run over `tests/setupStyles.ts` alone, which is owned.
The chains are `tmp/u3/gates-7.sh` and `tmp/u3/edge-7.sh`, each superseding its `-6` predecessor.

## Deviations

None. No gate went red after a fix inside owned files, no off-limits file was touched, and no
reading item 1 requires was unreachable without changing the pair rule's meaning.

## Ancillary choices settled under the deviation contract

- **The legend's `derived` clause is kept.** Item 7 offered to remove "or the value it targets" if
  nothing else needs it. Three rows need it: `--vn-text-code` gives "reaches Bootstrap's `#e685b5`",
  `--vn-surface-tertiary-base` gives "reaches Bootstrap's `#2b3035`", and `--vn-focus-color` gives
  "reproduces the calibrated ring: `oklab(0.48 -0.0266547 -0.253603 / 0.45)`". Each names a value
  the expression targets rather than the expression, so the clause describes rows that remain.
- **The `@each` reads `tokens.$dark` through a name map.** `tokens.$assets` maps each image-valued
  dark entry's key to the Bootstrap variable the dark scope declares it as, and `_theme.scss` reads
  the value with `map.get(tokens.$dark, $key)`. Moving the five values into `$assets` instead would
  need one map rather than two in `_theme.scss`, and it was refused because `$dark` is the dark
  scope's whole value set and splitting it puts the same mode's values in two places. `_theme.scss`
  gains `@use 'sass:map'`, which is mechanism rather than a value, and no literal colour enters it.
- **`findGroupEnd` is exported and cased** rather than hidden inside `extractCompoundTags`, on the
  same reading that put `splitTopLevelCompounds` in the module: a module-scope helper nothing
  exports is what `AGENTS.md` bars.
- **`extractCompoundTags` descends into `:is()` and `:where()` alone.** A `:not()` argument names
  the tag the compound refuses, and an attribute string is a value rather than a selector, so
  neither contributes. The recursion carries this through nesting: `:not(:is(h1))` names no tag.
- **`FILL_ONLY_RECIPE` is a constant rather than a derivation.** Cutting the triplet lines out of
  `CUSTOMIZATION_RECIPE` at case scope would make the proof's input depend on the shape of a string
  an editor is told to copy from the guide. The constant states the omission it is.
- **`VENEER_GUIDE_PATH` names the file rather than the section.** The case requires the recipe
  inside the whole guide, so moving the Customization section within the file leaves it green while
  editing the fence reddens it, which is the coupling the finding asked for.
- **The specimen in the negative-claim case is an inline declaration**, not the `.brand-veil` class
  the fence ships, so the case can read the same element before and after the override lands
  instead of comparing against a literal triplet.

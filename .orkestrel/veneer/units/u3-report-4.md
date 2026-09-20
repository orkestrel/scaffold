# Unit U3 — report 4 (successor brief 6)

Every item of `u3-brief-6.md` is done except one half of item 9, which the module's own
Node/browser boundary refuses; § Deviations records it with the reading behind it. Every gate the
brief names exits 0 on managed Chromium, and `test:src:styles`, `test:src`, and `test:setup:browser`
exit 0 on Edge. Item 6 and item 7 each ran red before their fix and green after, on the case that
names the defect.

## Touched files

| File                                   | Change over the report-3 baseline                                                                                                                                                                                | Lines      |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `guides/veneer.md`                     | Alpha form at the triplet row; `Source` sentence scoped; factor rows give `1`; inset row carries the factor; `interpolate-size` moved into the motion section; member-shape rule states the `-base` convention; the customization fence gained the `.brand-veil` rule and its prose | 376        |
| `src/core/constants.ts`                | `text.secondary`, `text.tertiary`, and `surface.raised` are leaves                                                                                                                                              | 254        |
| `src/styles/_mixins.scss`              | Gained the `theme-assets` mixin; the three flattened tokens lost their `-base` suffix in declaration and in alias; two comments name their members                                                               | 148        |
| `src/styles/_theme.scss`               | Scopes and includes alone: the five data URIs left, the dark scope gained `@include theme-assets`, the mode comment names its members                                                                            | 19         |
| `src/styles/_tokens.scss`              | `--vn-shadow-inset` scales by `var(--vn-factor-elevation)`; the dark value map gained the five image values; the border anchor and the map comment follow the flattening                                         | 341        |
| `tests/setup.ts`                       | Gained `TOKEN_PREFIX`, moved from `tests/src/core/index.test.ts`                                                                                                                                                | 45 → 48    |
| `tests/setup.test.ts`                  | Export-list case covers `TOKEN_PREFIX`                                                                                                                                                                          | 31 → 35    |
| `tests/setupBrowser.ts`                | Gained `PROBE_CASCADE`, moved from the proof; the module-scope `specimens` array became the exported `SpecimenManager` class and its one shared `specimens` instance, carrying the mount, load, and clear behaviour with their TSDoc | 338 → 374  |
| `tests/setupBrowser.test.ts`           | Lost the `CASCADE` fixture; drives the registry through `specimens`; export-list case rewritten; each installed rival is removed in `finally`                                                                    | 281 → 268  |
| `tests/setupStyles.ts`                 | `SelectorTag` became `SelectorCompound`; `extractCompoundTag` became `extractCompoundTags` and `extractSelectorTags` became `extractSelectorCompounds`; gained `splitTopLevelCompounds`, `BOOTSTRAP_VERSION`, `BOOTSTRAP_DIGEST`, and `CUSTOMIZATION_RECIPE`; `matchesLooseTagPair` reads compounds; the retained-colour table explains the text-valued exclusions; three comments name their members | 917 → 1031 |
| `tests/setupStyles.test.ts`            | Lost `PINNED_VERSION`, `PINNED_DIGEST`, and `CASCADE`; the three oracle cases read the stylesheet themselves; new cases for the tokenizer, the compound reader, and the recipe; the four scanner readings sit in the loose-pair case | 456 → 490  |
| `tests/src/core/index.test.ts`         | Lost `TOKEN_PREFIX`, imports it                                                                                                                                                                                 | 56 → 53    |
| `tests/src/styles/integration.test.ts` | Lost `RECIPE`, imports `CUSTOMIZATION_RECIPE`; mounts the `.brand-veil` specimen and reads the translucent fill; drives the registry through `specimens`                                                         | 88         |
| `tests/src/styles/mixins.test.ts`      | Drives the registry through `specimens`                                                                                                                                                                         | 98         |
| `tests/src/styles/theme.test.ts`       | Drives the registry through `specimens`                                                                                                                                                                         | 82         |
| `tests/src/styles/tokens.test.ts`      | Gained the inset-shadow case; drives the registry through `specimens`                                                                                                                                           | 306 → 333  |

`git status --porcelain` at return lists the same tracked and untracked set report 3 recorded: the
owned files, the two integrated patch sites (`configs/src/vite.styles.config.ts`,
`tests/distribution.test.ts`), and nothing else. No file was added or removed by this brief.
Tracked diffstat:

```text
 README.md                         |   4 +-
 configs/src/vite.styles.config.ts |   3 +-
 guides/README.md                  |   8 +
 guides/veneer.md                  | 320 +++++++++++++-
 src/core/index.ts                 |   2 +
 src/styles/_mixins.scss           | 130 ++++++
 src/styles/_theme.scss            |  19 +-
 src/styles/_tokens.scss           | 339 ++++++++++++++-
 src/styles/index.scss             |   2 +
 tests/distribution.test.ts        |   9 +-
 tests/setup.ts                    |  48 +++
 tests/setupBrowser.test.ts        | 212 +++++++++-
 tests/setupBrowser.ts             | 292 ++++++++++++-
 tests/setupStyles.test.ts         | 343 ++++++++++++++-
 tests/setupStyles.ts              | 852 +++++++++++++++++++++++++++++++++++++-
 tests/src/core/index.test.ts      |  53 ++-
 tests/src/styles/index.test.ts    |  41 +-
 17 files changed, 2624 insertions(+), 53 deletions(-)
```

## Item 7 — the four scanner readings

The readings were taken by running the live functions, before the fix and after, through a probe at
`tmp/probe/selector.test.ts` in the `probe` project. The probe is retired to
`tmp/u3/probe-selector.test.ts.txt`, outside that project's include glob, because its question is
settled and its cases are promoted into `tests/setupStyles.test.ts`.

| Input               | Required | Before | After |
| ------------------- | -------- | ------ | ----- |
| `:is(h1, p)`        | `false`  | `true` | `false` |
| `:where(h1, p)`     | `false`  | `true` | `false` |
| `:is(.title,h1)+p`  | `true`   | `false`| `true`  |
| `h1, p`             | `false`  | `false`| `false` |

The failing-first proof is the promoted case, not the probe. `npm run test:setup` reported
`Tests 1 failed | 58 passed (59)` with the new readings in place and the readers unchanged, failing
at `tests/setupStyles.test.ts:347` on `matchesLooseTagPair(':is(.title,h1)+p')`. After the fix the
same command reports `Tests 60 passed (60)`, and `Tests 61 passed (61)` after item 9's recipe case
landed.

Two causes were fixed, each in the reader that carried it. `normalizeComplexSelector` collapses
whitespace everywhere, including inside parentheses, so splitting its result on a space cut
`:is(h1, p)` into `:is(h1,` and `p)` — two compounds where the selector writes one. The new
`splitTopLevelCompounds` walks the normalized text tracking parenthesis depth, bracket depth, and
quotation marks, so a functional list and a quoted attribute value each stay inside the compound
that carries them. It is a third member of the `splitTopLevel*` family rather than a reuse of
`splitTopLevelValues`, because that one emits a bare `/` as its own token, which a declaration value
needs and a selector never writes, and tracks no bracket depth, which an attribute selector needs.
Its TSDoc says so.

The second cause was the shape of the answer. `extractCompoundTag` returned the first bare tag of an
`:is()` or `:where()` list and dropped the rest, so `:is(.title,h1)` reported none. A compound can
name several tags, and its alternatives select one element rather than joining two, so the reader
now returns them all and the complex-selector reader groups them: `SelectorTag` became
`SelectorCompound` carrying `tags` and its `combinator`, `extractCompoundTag` became
`extractCompoundTags`, and `extractSelectorTags` became `extractSelectorCompounds`. A singular name
on a reader that returns a list would have been the defect written into the API, so the rename rides
with the contract change. `matchesLooseTagPair` compares adjacent compounds and calls a pair loose as
soon as one combination of their tags is, because the selector reaches every combination it admits.

## Item 11 — the member shape

**Decision: flatten.** `TOKEN_NAMES.text.secondary`, `.text.tertiary`, and `.surface.raised` are
leaves, and their cascade tokens are `--vn-text-secondary`, `--vn-text-tertiary`, and
`--vn-surface-raised`. The guide's rule stands as written and now describes the registry exactly.

The mixin reading behind it: `theme-tokens` does not emit `-base` for every retuned token. It
retunes `--vn-text-code`, `--vn-text-highlight`, `--vn-surface-highlight`, `--vn-border-color`,
`--vn-border-translucent`, `--vn-form-valid`, `--vn-form-invalid`, and `--vn-focus-color` with no
suffix at all, and `$roles` — `primary, secondary, tertiary, success, info, warning, danger, light,
dark` — names none of the three under question. So the suffix does not mark a retuned token. What it
marks is a member the cascade declares a second property for: `--vn-text-body-base` sits beside
`--vn-text-body-rgb`, `--vn-link-hover-base` beside `--vn-link-hover-rgb`, and each
`--vn-color-{role}-base` beside its triplet and its tiers. The three flattened names had neither a
triplet nor a tier, so `-base` claimed a family that does not exist, which is the speculation
`AGENTS.md` § Design laws bars. The guide's rule sentence now records the convention it implies: a
group's own color takes the `base` member and the `-base` suffix with it, and a tierless color takes
no suffix.

The built cascade agrees, read from `dist/src/styles/index.css` after `npm run build`:

```text
--vn-text-secondary:   3 declarations   --vn-text-tertiary:  3   --vn-surface-raised: 3
text-secondary-base | text-tertiary-base | surface-raised-base:  0
```

Three declarations each is `:root`, the light scope, and the dark scope, which is what the
theme-dependent closure requires.

## Item 9 — the registry's shape

**Shape chosen: the exported entity.** `tests/setupBrowser.ts` declares `SpecimenManager`, a class
whose `#nodes` field holds what a case attached, with `mount`, `load`, and `clear` carrying the
behaviour `mountSpecimen`, `loadStylesheet`, and `clearSpecimens` carried, and exports one instance
named `specimens` that every browser proof shares.

The other admitted shape — the functions taking and returning the registry — was refused on a
reading of what it costs the proofs: each proof would then declare the registry itself, which is the
module-scope mutable data this item exists to remove, moved from one file into six. One registry per
page is also what makes an `afterEach` hook's cleanup complete, and a per-proof registry would leave
another proof's nodes on the shared page. The three free functions are gone rather than kept as
forwarders, because a function that only calls a method is the superfluous wrapper `AGENTS.md`
bars; every call site now reads `specimens.mount(markup)`, `specimens.load(css)`, or
`specimens.clear()`.

Nothing is left at module scope in `tests/setup.ts`, `tests/setupBrowser.ts`, or
`tests/setupStyles.ts` that is unexported or mutable, and no proof this unit owns declares
module-scope data:

```text
$ grep -rn "^\(const\|let\|var\|function\|class\|interface\|type\) " tests/setup.ts tests/setupBrowser.ts tests/setupStyles.ts
(no output)
$ grep -rn "^\(const\|let\|var\|function\|class\) " tests/src tests/setup.test.ts tests/setupBrowser.test.ts tests/setupStyles.test.ts
(no output)
$ grep -rn "^\(const\|let\|var\|function\|class\) " tests/app
tests/app/browser/integration.test.ts:26  const VARIANT = inject('variant')   … through :42
```

**Observation, outside this unit.** `tests/app/browser/integration.test.ts` carries module-scope
declarations of its own — `VARIANT`, `VARIANTS`, `CAPTURE`, `FAMILIES`, `PROVEN`, `STATES`,
`PLACED`, `PORTFOLIO`, `JOURNAL`, `ARTIFACT`, and a mutable `mounted`. The file is not U3's, the
round-2 finding did not name it, and most of those bindings are runtime provisions from `inject()`
rather than data tables. It is recorded here for whichever unit owns the journey suite.

## Item 1 — the alpha form is proved rather than asserted about

`guides/veneer.md` now teaches `rgba(var(--vn-color-primary-rgb), 0.5)` at the triplet row, matching
the section opener and the shipped cascade. The customization fence carries a `.brand-veil` rule
declaring that form over the retuned triplet, `CUSTOMIZATION_RECIPE` carries the same text, and
`tests/src/styles/integration.test.ts` mounts a `.brand-veil` specimen and reads what it paints.

The control that makes the case bind: planting the guide's old form
(`rgb(var(--vn-color-primary-rgb) / 0.5)`) in `CUSTOMIZATION_RECIPE` and running
`npm run test:src:styles` gives

```text
FAIL |src:styles (chromium)| tests/src/styles/integration.test.ts:17:2 > token customization >
     rescales spacing and retunes the primary role family from one unlayered rule
AssertionError: expected false to be true
Tests  1 failed | 38 passed (39)
```

The file was restored from a copy taken before the plant, `diff -q` reported it identical, and the
rerun reported `Tests 39 passed (39)`.

## Item 6 — the inset shadow

`tests/src/styles/tokens.test.ts` gained a case reading `--vn-shadow-inset` through a real consumer.
Before the fix, `npm run test:src:styles` reported `Tests 1 failed | 38 passed (39)`: at
`--vn-factor-elevation: 2` the lengths stayed `[0, 1, 2, 0]` where the case requires `[0, 2, 4, 0]`.
After multiplying the two lengths by the factor in `src/styles/_tokens.scss`, the same command
reports `Tests 39 passed (39)`. The case also reads the neutral factor (`[0, 1, 2, 0]`, inset true,
`rgba(0, 0, 0, 0.075)`) and reads it back after restoring the factor, so the rung and the inset are
now one scale in the cascade, in the registry, and in the guide row.

## Item 8 — the literal colours left `_theme.scss`

The five image values sit in the `$dark` map in `src/styles/_tokens.scss` under the keys
`select-indicator`, `switch-knob`, `toggler-icon`, `accordion-icon`, and `accordion-active-icon`.
`src/styles/_theme.scss` is scopes and includes alone, at 19 lines. The emitted bytes are unchanged:

```text
$ diff tmp/u3/assets-before.txt tmp/u3/assets-after.txt
(identical; five url() declarations in dist/src/styles/index.css)
```

The emitter is a new `theme-assets($values)` mixin rather than a widening of `theme-tokens`, and
that is an ancillary choice recorded under § Ancillary choices with the reading that forced it.

Criterion 1 holds. The sweep over `src/styles/**` for a hex value, an `rgb()`, `hsl()`, `oklch()`, or
`oklab()` literal, a `%23`-encoded colour, or a named colour returns, outside `_tokens.scss`, only
three `color-mix(… , transparent)` expressions over tokens in `_mixins.scss`, which is the form
`.claude/rules/styles.md` prescribes:

```text
$ grep -rniE "#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(|\boklch\(|\boklab\(|%23|\b(white|black|red|blue|green|gray|grey|transparent)\b" src/styles --include=*.scss | grep -v "^src/styles/_tokens.scss:"
src/styles/_mixins.scss:70  --vn-text-secondary: color-mix(in srgb, var(--vn-text-body-base) 75%, transparent);
src/styles/_mixins.scss:71  --vn-text-tertiary: color-mix(in srgb, var(--vn-text-body-base) 50%, transparent);
src/styles/_mixins.scss:90  --vn-focus-color: color-mix(in oklab, var(--vn-color-primary-base) 45%, transparent);
```

## Items 2, 3, 4, 5, 10, 12, and 13

- **Item 2.** The `interpolate-size` paragraph sits at the end of § Reference map's motion section,
  before the breakpoint and stacking paragraph. § Deferred names is its opening sentence and its
  table of undeclared names, and nothing else.
- **Item 3.** Each factor row's `Source` cell reads `` `derived` — `1`, the neutral multiplier of the
  … `` , so the cell gives the value it targets as the legend requires.
- **Item 4.** The sentence now reads "A table with a `Source` column names in each cell where that
  row's value comes from", followed by what fixes a value in the tier table and the departures
  table, which carry no such column.
- **Item 5.** The coupling sentence is an instruction and travelled with the string it governs:
  `CUSTOMIZATION_RECIPE`'s TSDoc says to copy it from the fence and change it with the fence, and
  says plainly that nothing compares them, because the fence carries no `@example` title for
  `tests/guides.test.ts` to match it by.
- **Item 10.** `src/styles/_theme.scss` names the light selector and the dark selector;
  `tests/setupStyles.ts` says "one color in light and in dark" and "between the Node `setup` project
  and the browser `src:styles` project". `src/styles/_mixins.scss` carried the same defect in
  `role-each`'s comment ("the same in both modes") and takes the same repair.
- **Item 12.** Each rival node the installed `render` and `mount` create in
  `tests/setupBrowser.test.ts` is removed in a `finally`, so a failed assertion no longer leaks it
  into every later case.
- **Item 13.** `RETAINED_COLOR_ALIASES`'s remarks now say why a text-valued retained alias is in
  neither table: `--bs-font-monospace` and `--bs-gradient` resolve to a font stack and a gradient
  image, and neither the painted-channel reading that table drives nor the pixel reading
  `RETAINED_LENGTH_ALIASES` drives reaches one; Veneer also writes the gradient over its own palette
  token, so that pair agrees as rendered rather than as text.

## Item 14 — gates

Managed Chromium, Windows, 2026-09-20, from `tmp/u3/gates-6.log.txt`, re-run over the final tree.
`lint:check` and `check` print nothing on success:

```text
npm run format:check        All matched files use the correct format. (83 files)      exit=0
npm run lint:check          no diagnostics                                            exit=0
npm run check               no diagnostics                                            exit=0
npm run build               built in 307ms                                            exit=0
npm run test:src            Test Files  5 passed (5)    Tests  17 passed (17)         exit=0
npm run test:src:styles     Test Files  7 passed (7)    Tests  39 passed (39)         exit=0
npm run test:app            Test Files  2 passed (2)    Tests  3 passed (3)           exit=0
npm run test:journey        Test Files  4 passed (4)    Tests  32 passed | 4 skipped (36)   exit=0
npm run test:policy         Test Files  1 passed (1)    Tests  109 passed | 1 skipped (110) exit=0
npm run test:config         Test Files  1 passed (1)    Tests  173 passed | 1 skipped (174) exit=0
npm run test:setup          Test Files  3 passed (3)    Tests  61 passed (61)         exit=0
npm run test:setup:browser  Test Files  1 passed (1)    Tests  18 passed (18)         exit=0
npm run test:conformance    Test Files  1 passed (1)    Tests  7 passed (7)           exit=0
npm run test:guides         Test Files  1 passed (1)    Tests  18 passed (18)         exit=0
```

Edge `msedge`, same host and date, from `tmp/u3/edge-6.log.txt`:

```text
PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles     Test Files  7 passed (7)  Tests  39 passed (39)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:src            Test Files  5 passed (5)  Tests  17 passed (17)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser  Test Files  1 passed (1)  Tests  18 passed (18)  exit=0
```

`npm run test:distribution` needs the registry and stays the Orchestrator's. `npm run format` and
`oxlint --fix` were not run; `npx oxfmt` was run over `guides/veneer.md`,
`src/styles/_tokens.scss`, `tests/src/styles/integration.test.ts`, `tests/src/styles/theme.test.ts`,
and `tests/src/styles/tokens.test.ts` alone, all owned.

## Deviations

**D1 — the Bootstrap cascade text stayed in the proof.** Item 9 asks for `PINNED_VERSION`,
`PINNED_DIGEST`, and `CASCADE` to move from `tests/setupStyles.test.ts` into `tests/setupStyles.ts`.
The first two moved, as `BOOTSTRAP_VERSION` and `BOOTSTRAP_DIGEST`. The third cannot.

- **Expected.** `tests/setupStyles.ts` exports the stylesheet's text.
- **Found.** `tests/setupStyles.ts` is loaded by the browser projects that import the scanners
  beside it — `configs/src/vite.styles.config.ts` names it in `setupFiles`, and
  `tests/src/styles/tokens.test.ts` imports from it — so it can take no `node:fs` import, and
  brief 5's criterion 3 fixed that boundary deliberately. The raw-import route is closed too: a
  probe at `tmp/probe/raw.test.ts` (retired to `tmp/u3/probe-raw.test.ts.txt`) imported
  `bootstrap/dist/css/bootstrap.css?raw` into that module and read it from the Node `setup` project,
  which reported `TYPE string LENGTH 0`. The same emptiness is what
  `RETAINED_COLOR_ALIASES`'s own remarks already record: a Node project resolves a raw CSS import to
  an empty string. Landing it anyway turned the oracle red —
  `Tests 3 failed | 57 passed (60)`, each failure an empty reading.
- **Done or not done.** Closed inside owned files, differently. The three oracle cases each read the
  file themselves through `readFileSync(BOOTSTRAP_CASCADE_PATH, 'utf8')` at case scope, so no proof
  file carries module-scope data and criterion 2 holds. `BOOTSTRAP_CASCADE_PATH`'s TSDoc now states
  why the path is in the module and the text is not.
- **Hypothesis.** The text belongs in a Node-only setup module — `tests/setupServer.ts` is where
  `.claude/rules/tests.md` puts a `node:fs` loader — and creating one is outside this unit's owned
  files, so it is the Orchestrator's call rather than mine.

No other deviation. No gate went red after a fix inside owned files, and no off-limits file was
touched.

## Ancillary choices settled under the deviation contract

- **`theme-assets` is its own mixin.** `theme-tokens` is included by the light scope as well as the
  dark one, so emitting the five image values through it would declare five `--bs-*` names at `:root`
  and in the light scope that Bootstrap declares nowhere at theme scope. That reddens the
  root-partition oracle against `BOOTSTRAP_ROOT_VARIABLES`, and it changes the nested-island
  behaviour the guide records. A dark-only emitter keeps the values in `_tokens.scss`, keeps
  `_theme.scss` to scopes and includes, and emits the same bytes.
- **The dark map is wider than the light map.** The five keys have no light counterpart, which is
  the limit itself. The `$dark` comment and the `theme-assets` documentation both say so.
- **`splitTopLevelCompounds` is exported and cased** rather than hidden, because
  `AGENTS.md` bars a module-scope helper that nothing exports, and its case drives a functional
  list, a tag-free compound, a quoted attribute value, a lone compound, and empty text.
- **`extractCompoundTags` drops a repeated tag.** A compound names a tag or it does not, and naming
  it twice says nothing more. The TSDoc states it.
- **`CUSTOMIZATION_RECIPE` has a case of its own** in `tests/setupStyles.test.ts`: every `--vn-*`
  name the recipe overrides must be a name `TOKEN_NAMES` declares, which is a second mechanism
  rather than a re-derivation, and the recipe must carry the alpha form the guide teaches.
- **The consumer class in the fence is `.brand-veil`, with no `vn-` prefix**, so a reader sees it is
  the consumer's own rule rather than one Veneer ships.
- **`role-each`'s comment was repaired** although item 10 did not name it. It is the same writing
  defect in the same file the item repairs, and leaving it would hand the next round a finding this
  one had already read.
- **Both probes were retired out of the `probe` project** into `tmp/u3/` rather than deleted, so the
  before-and-after readings and the raw-import measurement stay reproducible while nothing collects
  them as tests.

# Unit U3 — report 3 (successor brief 5)

Every item of `u3-brief-5.md` is done. Every gate the brief names exits 0 on managed
Chromium, and `test:src:styles`, `test:src`, and `test:setup:browser` exit 0 on Edge. Every kept and
every moved helper has a substitution control that turned its named case red, and every restore was
proved by a byte diff against a copy taken from the final file.

The installed surface matched the brief. `node_modules/@orkestrel/test` is `0.0.18` and its browser
entry declares `stageMedia(options: MediaOptions)`, `MediaOptions { print?, motion? }`,
`releaseMedia()`, `sendProtocol(method, params)`, `render`, `build`, `mount`, `extractStyles`,
`readContrast`, `matchesColor`, `parseCSSColor`, `blendColor`, `readRules`, `findRule`, and
`readStyle`/`readPixels` with the `pseudo` argument. No deviation was needed.

## Touched files

| File                             | Change over the brief-4 baseline                                                                                                                                                                                              | Lines     |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `tests/setup.ts`                 | Gained `normalizeSelectorText`, moved from `tests/setupStyles.ts` so the Node oracle and the browser scope reader share one normalizer                                                                                        | 26 → 45   |
| `tests/setup.test.ts`            | New. The export-list case, the registry walk's two behavioural cases moved from `tests/src/core/index.test.ts`, and the normalizer case moved from `tests/setupStyles.test.ts`                                                | 0 → 31    |
| `tests/setupBrowser.ts`          | Lost `stageMedia`, `releaseMedia`, the `CDPSession` type import, and the `cdp` import; `loadStylesheet` builds its element through the installed `build`; gained `readCascadeSheet`, `collectNestedRules`, `collectScopeProperties`, `collectLayer`; every kept helper's TSDoc names its installed neighbour and what that neighbour cannot do | 244 → 338 |
| `tests/setupBrowser.test.ts`     | Lost the media case; gained the written `CASCADE` fixture and a rival-reading case for each kept and moved helper; export-list case rewritten                                                                                 | 147 → 281 |
| `tests/setupStyles.ts`           | Lost `collectScopeProperties`, `normalizeSelectorText`, `readCascadeSheet`, `collectNestedRules`, `collectLayer`, and the now-unused `requireValue` import; imports `normalizeSelectorText` from `./setup.js`                 | 1021 → 917 |
| `tests/setupStyles.test.ts`      | Export-list case narrowed to what survives; normalizer case moved out; gained a case for each direction table, for `MANDATED_TAG_PAIRS`, and for `CALIBRATED_TIERS`; one case renamed off a temporal `once`                   | 417 → 456 |
| `tests/src/core/index.test.ts`   | Lost `describe('token registry walk')`; keeps its consuming cases                                                                                                                                                            | 74 → 56   |
| `tests/src/styles/index.test.ts` | Imports the cascade readers from `../../setupBrowser.js`                                                                                                                                                                     | 45 → 40   |
| `tests/src/styles/tokens.test.ts`| Imports the cascade readers from `../../setupBrowser.js`                                                                                                                                                                     | 306 → 306 |
| `tests/src/styles/mixins.test.ts`| Drives reduced motion through the installed `stageMedia({ motion: false })` and `releaseMedia()`, and forced colors through `sendProtocol`                                                                                     | 90 → 98   |

Tracked diffstat at return:

```text
 README.md                         |   4 +-
 configs/src/vite.styles.config.ts |   3 +-
 guides/README.md                  |   8 +
 guides/veneer.md                  | 310 +++++++++++++++-
 src/core/index.ts                 |   2 +
 src/styles/_mixins.scss           | 114 ++++++
 src/styles/_theme.scss            |  28 +-
 src/styles/_tokens.scss           | 327 ++++++++++++++++-
 src/styles/index.scss             |   2 +
 tests/distribution.test.ts        |   9 +-
 tests/setup.ts                    |  45 +++
 tests/setupBrowser.test.ts        | 224 +++++++++++-
 tests/setupBrowser.ts             | 255 ++++++++++++-
 tests/setupStyles.test.ts         | 309 +++++++++++++++-
 tests/setupStyles.ts              | 738 +++++++++++++++++++++++++++++++++++++-
 tests/src/core/index.test.ts      |  56 ++-
 tests/src/styles/index.test.ts    |  41 ++-
 17 files changed, 2424 insertions(+), 53 deletions(-)
```

`git status --porcelain` at return lists those tracked files, the untracked files this unit owns
(`tests/setup.test.ts`, `src/core/constants.ts`, `src/core/types.ts`, `src/styles/elements/`,
`tests/src/styles/elements/`, `tests/src/styles/fixtures/`, `tests/src/styles/integration.test.ts`,
`tests/src/styles/mixins.test.ts`, `tests/src/styles/theme.test.ts`,
`tests/src/styles/tokens.test.ts`), and the two integrated patch sites
(`configs/src/vite.styles.config.ts`, `tests/distribution.test.ts`). Nothing else. The instruments
sit under `tmp/u3/`, which git ignores.

## Item 1 — the installed media helpers

`tests/setupBrowser.ts` declares no `stageMedia` and no `releaseMedia`, imports no `CDPSession`, and
calls no `cdp()`. The reading that closes criterion 1 compares every runtime export of the three
setup modules against every `export declare` of `@orkestrel/test`'s core, browser, and server
entries:

```text
node tmp/u3/cases.mjs is the coverage instrument; the collision instrument reports:
-- setup.ts          collectTokenNodes, normalizeSelectorText        no collision
-- setupBrowser.ts   mountShowcase, recordListeners, applyTheme, mountSpecimen, loadStylesheet,
                     clearSpecimens, readPaintedColor, matchesPaintedColor, readCascadeSheet,
                     collectNestedRules, collectScopeProperties, collectLayer
                                                                     no collision
-- setupStyles.ts    29 runtime exports                              no collision
$ grep -rn "CDPSession\|cdp(" tests/ --include=*.ts
(no output)
```

Before this item the same instrument reported `COLLIDES stageMedia` and `COLLIDES releaseMedia`.

`tests/src/styles/mixins.test.ts` drives the two reduced-motion cases through
`stageMedia({ motion: false })` and `releaseMedia()`. The forced-colors case drives
`sendProtocol('Emulation.setEmulatedMedia', { features: [{ name: 'forced-colors', value: 'active' }] })`
and resets with `sendProtocol('Emulation.setEmulatedMedia', { media: '', features: [] })` inside the
case, before the file's `afterEach` calls `releaseMedia()`. Both orders were settled under the
deviation contract and are recorded in § Ancillary choices.

**Observation for the Test package.** `MediaOptions` carries a `print` axis and a `motion` axis and
no forced-colors axis, while the installed `releaseMedia` restores forced colours from its own
`MEDIA_STAGE` marker. A suite proving a `@media (forced-colors: active)` block therefore stages that
one feature through `sendProtocol` and the release half is already there. Adding a `colors` axis to
`MediaOptions` would close the gap; the settling command is
`npm run test:src:styles` in this checkout, whose forced-colors case is the only consumer.

## Item 2 — the overlaps

Each helper was read against the installed export nearest its job before the decision. `render`
records nothing: its own documentation states that removal is the caller's and tells a workspace to
"build a recorded container in a setup module and remove it from an `afterEach` hook", which is
exactly the registry these helpers share. That reading is what keeps the specimen trio.

| Local helper          | Installed neighbour read          | Decision | What the neighbour cannot do                                                                                  |
| --------------------- | --------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `mountSpecimen`       | `render(markup)`                  | Kept     | Record the container, so a case's nodes survive into the next case                                              |
| `loadStylesheet`      | `build('style', …)`, `mount`      | Kept     | Put the sheet in `document.head` and record it; `mount` attaches to `document.body`                             |
| `clearSpecimens`      | `mount`, `render`                 | Kept     | Answer at all — neither records what it attached                                                                |
| `readPaintedColor`    | `parseCSSColor`, `parseColor`     | Kept     | Read a modern color function: a computed `oklab()` stays `oklab()` and `parseCSSColor` returns `undefined`       |
| `matchesPaintedColor` | `matchesColor`                    | Kept     | Compare a `color-mix()` against an `oklab()` recording; it answers `false` for colors that render identically    |
| `readCascadeSheet`    | `readRules()`                     | Kept     | Name a sheet; the walk flattens the runner's and the shell's stylesheets in with the cascade under test          |
| `collectNestedRules`  | `readRules()`                     | Kept     | Take a scope, and it reports breadth-first, so a grouping rule's children land after every later top-level rule  |
| `collectScopeProperties` | `findRule(selector)`           | Kept     | Match a whole selector or union a split scope; it substring-matches and returns one rule                        |
| `collectLayer`        | `readRules()` filtered by layer   | Kept     | Refuse a document that loaded no cascade; an unloaded document and an unfilled layer both read as empty          |

`readContrast`, `blendColor`, and `extractStyles` were read too and match no local helper's job:
`readContrast` measures a WCAG ratio between an element's text and its composited backdrop,
`blendColor` composites one color over another, and `extractStyles` reports inline `style`
attributes and `<style>` elements under a root.

`mountShowcase`, `recordListeners`, and `applyTheme` carry Veneer's own showcase, the listener
recorder, and the colour-mode variant switch. No installed export declares any of the three, and the
collision instrument reports none.

### Substitution controls

Each control replaced the local helper's body with the installed export's behaviour in
`tests/setupBrowser.ts`, ran `npm run test:setup:browser`, restored the file from a copy taken
before planting, and proved the restore with `diff -q` against that copy. Every row is from the
final state, after every other edit had landed. The instrument is `tmp/u3/plant.mjs` and its driver
`tmp/u3/controls.sh`; the log is `tmp/u3/controls.log.txt`.

| Control           | Substitution                                            | Red case                                                                                                     |
| ----------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `MOUNT-RECORD`    | `mountSpecimen` → `render(markup)`                      | `takes out a recorded container, and leaves one the installed render attached`                                 |
| `SHEET-HEAD`      | `loadStylesheet` → `mount(build('style', …))`           | `puts a loaded sheet in the head and takes it out, where an installed mount leaves it in the body`             |
| `CLEAR-REGISTRY`  | `clearSpecimens` → empty the registry without removing  | `attaches a specimen the case can address, and takes it out again on request`                                  |
| `PAINT-READ`      | `readPaintedColor` → `parseCSSColor(value)`             | `reads the channels a modern color function paints, where the installed reader reads none`                     |
| `PAINT-MATCH`     | `matchesPaintedColor` → `matchesColor(first, second)`   | `matches a mix against the modern color function it paints, where a computed read cannot`                      |
| `SHEET-SIGNATURE` | `readCascadeSheet` → `document.styleSheets[0]`          | `selects the sheet carrying the theme layer, where the installed rule walk names no sheet`                     |
| `RULE-WALK`       | `collectNestedRules` → `readRules()`                    | `reports a grouping rule before the rules it holds, where the installed walk reports by level`                 |
| `SCOPE-UNION`     | `collectScopeProperties` → `findRule(selector)`'s style | `unions the custom properties a split scope declares, where the installed rule lookup reads one rule`          |
| `LAYER-REFUSAL`   | `collectLayer` → `readRules()` filtered, no refusal     | `reports no sheet when the document has loaded no theme layer, and refuses a layer read there`                 |

Red counts, each with `exit=1`:

```text
MOUNT-RECORD      Tests  3 failed | 15 passed (18)
SHEET-HEAD        Tests  3 failed | 15 passed (18)
CLEAR-REGISTRY    Tests  5 failed | 13 passed (18)
PAINT-READ        Tests  2 failed | 16 passed (18)
PAINT-MATCH       Tests  1 failed | 17 passed (18)
SHEET-SIGNATURE   Tests  3 failed | 15 passed (18)
RULE-WALK         Tests  3 failed | 15 passed (18)
SCOPE-UNION       Tests  1 failed | 17 passed (18)
LAYER-REFUSAL     Tests  1 failed | 17 passed (18)
```

Each control was read against its own failure message, not against its exit code. `MOUNT-RECORD`,
`SHEET-HEAD`, and `CLEAR-REGISTRY` each redden more than the case they name, because a specimen or a
sheet a case leaves behind moves the page under every case after it, which is the cost the registry
exists to prevent. `SHEET-SIGNATURE` and `RULE-WALK` each redden `collectLayer`'s cases too, because
that reader composes them. `PAINT-READ` reddens `matchesPaintedColor`'s rival case for the same
reason.

The first `PAINT-READ` run was a defective control and was re-run. The plant widened the import list
with `findRule` and `readRules` and not with `parseCSSColor`, so the planted body raised
`ReferenceError: parseCSSColor is not defined` and the four red cases proved nothing about the
substitution. `tmp/u3/plant.mjs` now widens the list with `parseCSSColor` too, and the re-run
(`tmp/u3/control-paint.sh`, logged at `tmp/u3/control-paint.log.txt`) reddens on the substitution
itself:

```text
FAIL ... reads the channels a modern color function paints, where the installed reader reads none
Error: The engine painted no channels for an oklab recording
 ❯ requireValue node_modules/@orkestrel/test/dist/src/core/index.js:516:30
 ❯ tests/setupBrowser.test.ts:192:18
```

Every other control raised an `AssertionError` on its own reading; no other run carried a
`ReferenceError` or a `TypeError`.

Every restore reported `restored, file matches the pre-plant copy` — nine in the loop and one in the
re-run. Green rerun after the last restore:

```text
diff -q tmp/u3/setupBrowser.pre.ts tests/setupBrowser.ts   (identical)
npm run test:setup:browser   Test Files  1 passed (1)   Tests  18 passed (18)   exit=0
```

## Item 3 — the Node-safe boundary

`readCascadeSheet`, `collectNestedRules`, `collectScopeProperties`, and `collectLayer` now sit in
`tests/setupBrowser.ts`, each with a case in `tests/setupBrowser.test.ts` driven by a stylesheet the
proof writes:

```text
@layer theme, components, elements;
@layer theme {
	.vn-probe-scope { --vn-probe-one: 1px }
	.vn-probe-scope { --vn-probe-one: 2px; --vn-probe-two: 2px }
	.vn-probe-scope .vn-probe-card { --vn-probe-three: 3px }
}
@layer elements {
	.vn-probe-leaf { color: rgb(1, 2, 3) }
}
```

That fixture is loaded through `loadStylesheet`, so each reader is compared against a declaration a
case can vary rather than against the shipped cascade it is used to walk, and the `components` layer
the order statement names and never fills is what proves the empty-layer reading apart from the
refusal. The `setup:browser` project loads no Veneer cascade of its own, which is what makes the
refusal case possible at all: with the plain sheet loaded, `readCascadeSheet()` is `undefined` and
`collectLayer('elements')` throws.

`tests/setupStyles.ts` imports nothing from `vitest/browser` or `@orkestrel/test/browser` and
references no `document`, `CSSRule`, or `CSSStyleRule`:

```text
$ grep -n "document\|CSSRule\|CSSStyleRule\|vitest/browser\|@orkestrel/test/browser" tests/setupStyles.ts
61: * same selector makes the treatment depend on a document structure the author of the markup chose.
233: *   value as postcss reports it, without `!important`, in document order; or `undefined` when the
613: * value for it inside Veneer's own document would compare the cascade with itself.
```

Each of those is the English word inside a comment; the module names no DOM symbol.

Every export `tests/setupStyles.ts` keeps has a case in `tests/setupStyles.test.ts`. The coverage
instrument cuts the import block and the export-list case, so a name appearing only there reads as
uncased:

```text
$ node tmp/u3/cases.mjs tests/setupStyles.ts tests/setupStyles.test.ts "it('flags every property"
body characters: 19063
cased PHYSICAL_LONGHANDS (2)      cased EDGE_SHORTHANDS (3)          cased RADIUS_SHORTHAND (2)
cased SIDE_KEYWORD_PROPERTIES (2) cased MANDATED_TAG_PAIRS (3)       cased splitTopLevelValues (6)
cased matchesEdgeShorthand (2)    cased matchesRadiusShorthand (2)   cased matchesSideKeyword (2)
cased normalizeValueToken (3)     cased matchesDirectionSensitive (4) cased scanPhysicalDeclaration (55)
cased BOOTSTRAP_SCOPE_PATTERNS (4) cased BOOTSTRAP_CASCADE_PATH (1)  cased extractBootstrapVariables (9)
cased BOOTSTRAP_ROOT_VARIABLES (5) cased BOOTSTRAP_DARK_VARIABLES (5) cased THEME_DARK_ADDITIONS (2)
cased RETAINED_COLOR_ALIASES (2)  cased RETAINED_LENGTH_ALIASES (2)  cased extractShadowLayers (5)
cased splitTopLevelList (3)       cased normalizeComplexSelector (4) cased extractCompoundTag (8)
cased extractSelectorTags (5)     cased matchesLooseTagPair (10)     cased collectTokenNames (2)
cased collectTripletGroups (2)    cased CALIBRATED_TIERS (6)
```

`PHYSICAL_LONGHANDS`, `EDGE_SHORTHANDS`, `RADIUS_SHORTHAND`, `SIDE_KEYWORD_PROPERTIES`,
`MANDATED_TAG_PAIRS`, and `CALIBRATED_TIERS` were uncased before this item and gained cases that
drive each table through a second mechanism: the direction tables through `scanPhysicalDeclaration`,
the mandated pairs through `matchesLooseTagPair` in each direction, and the calibration rows against
the token names `@src/core` declares. The same instrument reports every export of
`tests/setupBrowser.ts` and `tests/setup.ts` cased.

## Item 4 — the setup proof

`tests/setup.test.ts` exists and the Node `setup` project collects it: its include is
`tests/setup*.test.ts` with `tests/setupBrowser.test.ts` excluded, so `npm run test:setup` went from
`Test Files 2 passed (2)  Tests 53 passed (53)` to `Test Files 3 passed (3)  Tests 59 passed (59)`.
`tests/src/core/index.test.ts` keeps its consuming cases and lost the walk's behavioural ones, which
is why `npm run test:src` reports 17 rather than 19.

## Item 5 — the pseudo reads

No proof reads a pseudo-element. The only `getComputedStyle` text anywhere under `tests/`, `src/`,
and `app/` is a sentence inside `tests/setupBrowser.ts`'s TSDoc, and no file carries a `'::'`
argument:

```text
$ grep -rn "getComputedStyle" tests/ app/ src/
tests/setupBrowser.ts:155: * A modern color function computes to itself, so `getComputedStyle` hands back `oklch(...)` rather
$ grep -rn "::" tests/src tests/setupBrowser.ts tests/setupStyles.ts --include=*.ts
(no output)
```

Nothing to convert. The installed `readStyle` and `readPixels` do carry the `pseudo` argument, so
the first proof that needs one has it.

## Item 6 — placement self-check

`.claude/rules/architecture.md` § Centralized-file pattern places source modules and has no row for
a test file; `.claude/rules/tests.md` places every file this unit owns.

| File                              | Placed by                                                                                                                        |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `tests/setup.ts`                  | tests.md § Shared test infrastructure — "`tests/setup.ts`: host-independent; no `node:*`, DOM, `window`, or Vue"                  |
| `tests/setup.test.ts`             | tests.md § Cross-cutting proofs row `tests/setup*.test.ts`, and "Resolve each root `tests/setup*.test.ts` proof against its sibling `tests/setup*.ts` module" |
| `tests/setupBrowser.ts`           | tests.md § Shared test infrastructure — "`tests/setupBrowser.ts`: DOM/Vue/browser helpers and setup CSS"                          |
| `tests/setupBrowser.test.ts`      | tests.md § Cross-cutting proofs — "Put `tests/setupBrowser.test.ts` in the browser-enabled `setup:browser` project"               |
| `tests/setupStyles.ts`            | tests.md § Shared test infrastructure — "`tests/setupStyles.ts`: CSS/style helpers and compiled cascade"                          |
| `tests/setupStyles.test.ts`       | tests.md § Cross-cutting proofs row `tests/setup*.test.ts`, in the Node `setup` project                                           |
| `tests/src/core/index.test.ts`    | tests.md § Test contract mirror `tests/{src,app}/[environment]/[domain]/[module].test.ts`, and "`index.test.ts` for `index.ts`"   |
| `tests/src/styles/index.test.ts`  | the same mirror row, against `src/styles/index.ts`                                                                                |
| `tests/src/styles/tokens.test.ts` | the same mirror row, resolving `src/styles/_tokens.scss` through the module's leading underscore                                  |
| `tests/src/styles/mixins.test.ts` | the same mirror row, resolving `src/styles/_mixins.scss` the same way                                                             |
| `tests/src/styles/theme.test.ts`  | the same mirror row, resolving `src/styles/_theme.scss` the same way                                                              |
| `tests/src/styles/integration.test.ts` | tests.md § Cross-cutting proofs — "`integration.test.ts` is a reserved filename at any level ... its scope is the directory it sits in" |
| `tests/src/styles/elements/body.test.ts`, `html.test.ts` | the mirror row, against `src/styles/elements/_body.scss` and `_html.scss`                                   |
| `tests/src/styles/fixtures/mixins.scss` | tests.md § Shared test infrastructure — a fixture extracted as soon as it could serve another test                          |

No owned file is left unplaced. `tests/src/styles/fixtures/` holds `mixins.scss` alone:

```text
$ ls tests/src/styles/fixtures/
mixins.scss
```

`npm run test:policy` agrees: `Tests 109 passed | 1 skipped (110)`, exit 0, with
`tests/setup.test.ts` in the tree.

## Item 7 — gates

Managed Chromium, Windows, 2026-09-20. Final lines of each command, from `tmp/u3/gates.log.txt`:

```text
npm run format:check        All matched files use the correct format. (83 files)      exit=0
npm run lint:check          no diagnostics                                            exit=0
npm run check               no diagnostics                                            exit=0
npm run build               built in 313ms                                            exit=0
npm run test:src            Test Files  5 passed (5)    Tests  17 passed (17)         exit=0
npm run test:src:styles     Test Files  7 passed (7)    Tests  38 passed (38)         exit=0
npm run test:app            Test Files  2 passed (2)    Tests  3 passed (3)           exit=0
npm run test:journey        Test Files  4 passed (4)    Tests  32 passed | 4 skipped (36)   exit=0
npm run test:policy         Test Files  1 passed (1)    Tests  109 passed | 1 skipped (110) exit=0
npm run test:config         Test Files  1 passed (1)    Tests  173 passed | 1 skipped (174) exit=0
npm run test:setup          Test Files  3 passed (3)    Tests  59 passed (59)         exit=0
npm run test:setup:browser  Test Files  1 passed (1)    Tests  18 passed (18)         exit=0
npm run test:conformance    Test Files  1 passed (1)    Tests  7 passed (7)           exit=0
npm run test:guides         Test Files  1 passed (1)    Tests  18 passed (18)         exit=0
```

Edge `msedge`, same host and date, from `tmp/u3/edge.log.txt`:

```text
PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles     Test Files  7 passed (7)  Tests  38 passed (38)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:src            Test Files  5 passed (5)  Tests  17 passed (17)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser  Test Files  1 passed (1)  Tests  18 passed (18)  exit=0
```

`npm run test:distribution` needs the registry and stays the Orchestrator's. `npm run format` and
`oxlint --fix` were not run; `npx oxfmt --write` was run over `tests/setupBrowser.test.ts` and
`tests/setupStyles.test.ts` alone, both owned.

## Deviations

None. Every item ran as brief 5 wrote it, and no gate went red after a fix inside owned files. Two
readings were settled by running rather than by argument and are recorded here because a later
reader will ask the same questions.

**The `oklab` reading.** The first draft of the `readPaintedColor` rival case pinned the channels an
`oklab(0.5 0 0)` recording paints at `[119, 119, 119]`. The run refuted it — the engine paints
`[99, 99, 99]` — and `.claude/rules/tests.md` refuses a number one run produced anyway. The case
now asserts what the declaration fixes: the `a` and `b` chroma axes are zero, so the red, green, and
blue channels are equal, the alpha is `1`, and the value sits strictly inside the black-to-white
range, while `parseCSSColor` returns `undefined` for the same string.

**The defective control.** The first `PAINT-READ` run reddened on a `ReferenceError` rather than on
the substitution, which is a control that proves nothing. It was caught by reading each control's
failure message instead of its exit code, the plant instrument was corrected, and the control was
re-run. § Substitution controls carries the corrected reading.

**The scope fixture's selector.** The split scope in `tests/setupBrowser.test.ts` is
`.vn-probe-scope` rather than `:root`. The installed `findRule` substring-matches across every
loaded sheet, and the showcase shell declares its own `:root` rule once `mountShowcase` has run
earlier in the file, so a `:root` rival reading would have measured which sheet came first rather
than which reader unions a scope.

## Ancillary choices settled under the deviation contract

- `normalizeSelectorText` moved to `tests/setup.ts` rather than being duplicated or imported across
  the Node/browser line. `tests/setupStyles.ts` matches a postcss selector with it and
  `tests/setupBrowser.ts` matches a CSSOM `selectorText` with it, and a browser setup module
  importing the styles module would pull postcss and the built cascade into every browser project.
- The forced-colors cleanup resets inside the case with the same empty command `releaseMedia` sends,
  and the file's `afterEach` release follows it. Resetting in the case is what lets the case read the
  restored colour back as its own assertion; the `afterEach` release is what covers a case that
  throws before its reset.
- `tests/setupBrowser.test.ts`'s cascade fixture is written in the proof rather than imported from
  `dist/`. A written sheet is a declaration the case can vary, and it keeps `test:setup:browser`
  runnable without a prior styles build.
- `loadStylesheet` builds its element through the installed `build` instead of
  `document.createElement`, so the text is set as text by the same primitive the rest of the suite
  uses.
- Case order in each proof follows the reading order of the module under test: the export list, then
  each helper in declaration order.
- `tests/setupStyles.test.ts`'s case `flags a value regardless of case, and permits a shorthand whose
  case-differing tokens match once lowercased` was renamed to `… match after they are lowercased`.
  The old name used `once` in the temporal sense `.claude/rules/writing.md` bans. The case proves the
  same thing.

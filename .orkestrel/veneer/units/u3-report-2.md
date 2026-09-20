# Unit U3 — report 2 (successor brief 4)

Every item of `u3-brief-4.md` is done. Every gate the brief names exits 0 on managed
Chromium; `test:src:styles`, `test:src`, and `test:setup:browser` also exit 0 on Edge. Every control
turned its named assertion red and every plant is removed, each removal proved by a byte diff
against a copy taken before planting.

## Touched files

| File                                    | Change                                                                                                                                                              |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `guides/veneer.md`                      | Gained `## Tokens` between `## Examples` and `## Showcase`, carrying every section of the deleted `guides/tokens.md`; rewrote the lead, the value sources, the elevation and focus rows, the customization recipe, the departures table, the deferred row, and every count phrase |
| `guides/tokens.md`                      | Deleted                                                                                                                                                             |
| `guides/README.md`                      | Repointed the `src/styles` directory row and the stylesheet-face paragraph at `veneer.md` § Tokens                                                                  |
| `README.md`                             | Repointed the token sentence at `guides/veneer.md` § Tokens                                                                                                         |
| `src/styles/_tokens.scss`               | Shadow colors through `rgba(var(--vn-palette-black-rgb), α)`, shadow lengths in `rem`, `--vn-focus-width: 0.1875rem`, comment repointed at the folded guide         |
| `src/styles/_mixins.scss`               | `palette-each` renamed `role-each` at its declaration and its include                                                                                               |
| `src/styles/_theme.scss`                | Count phrase removed from the dark-asset comment; comment repointed at the folded guide                                                                            |
| `tests/setup.ts`                        | Gained the exported registry walk `collectTokenNodes`                                                                                                               |
| `tests/setupBrowser.ts`                 | Gained `mountSpecimen`, `clearSpecimens`, `loadStylesheet`, `readPaintedColor`, `matchesPaintedColor`, `stageMedia`, and `releaseMedia`                             |
| `tests/setupBrowser.test.ts`            | Cases for each new export, including the rival reading `matchesColor` cannot make                                                                                  |
| `tests/setupStyles.ts`                  | Gained `extractBootstrapVariables`, `BOOTSTRAP_SCOPE_PATTERNS`, `BOOTSTRAP_CASCADE_PATH`, `RETAINED_COLOR_ALIASES`, `RETAINED_LENGTH_ALIASES`, `extractShadowLayers`, `splitTopLevelList`, `normalizeComplexSelector`, `extractCompoundTag`, `collectTripletGroups`, `collectLayer`; reworked `extractSelectorTags` and `matchesLooseTagPair`; widened the scanner; lost `readPaintedColor` |
| `tests/setupStyles.test.ts`             | Oracle equality replaces the hard-coded list lengths; cases for every new export; the two lane-named cases renamed                                                  |
| `tests/src/core/index.test.ts`          | Consumes `collectTokenNodes` and proves its behavior                                                                                                                |
| `tests/src/styles/index.test.ts`        | Consumes `collectLayer`; local helper gone                                                                                                                          |
| `tests/src/styles/tokens.test.ts`       | Re-authored around the setup modules; dark partition is an equality; retained-alias color and length proofs added; parsed shadow parts; per-factor rescale cases; invalid-factor case rewritten |
| `tests/src/styles/theme.test.ts`        | Re-authored around the setup modules; local helpers gone                                                                                                            |
| `tests/src/styles/mixins.test.ts`       | Re-authored around the setup modules; the tier mixin proved through paint                                                                                          |
| `tests/src/styles/integration.test.ts`  | Executes the guide's recipe, reads the emphasis and border tiers, the triplet, and the dark island                                                                  |
| `tests/src/styles/elements/body.test.ts`| Imports `matchesPaintedColor` from the browser setup                                                                                                                |
| `tests/src/styles/fixtures/mixins.scss` | `.vn-fixture-palette` renamed `.vn-fixture-role` and pinned to a known fill and surfaces                                                                            |
| `tests/src/styles/fixtures/colors.ts`   | Deleted                                                                                                                                                             |

Tracked diffstat at return:

```text
 README.md                         |   4 +-
 configs/src/vite.styles.config.ts |   3 +-
 guides/README.md                  |   8 +
 guides/veneer.md                  | 310 +++++++++++++-
 src/core/index.ts                 |   2 +
 src/styles/_mixins.scss           | 114 ++++++
 src/styles/_theme.scss            |  28 +-
 src/styles/_tokens.scss           | 327 ++++++++++++++-
 src/styles/index.scss             |   2 +
 tests/distribution.test.ts        |   9 +-
 tests/setup.ts                    |  26 ++
 tests/setupBrowser.test.ts        |  93 ++++-
 tests/setupBrowser.ts             | 160 ++++++++
 tests/setupStyles.test.ts         | 268 +++++++++++-
 tests/setupStyles.ts              | 842 +++++++++++++++++++++++++++++++++++++-
 tests/src/core/index.test.ts      |  74 +++-
 tests/src/styles/index.test.ts    |  46 ++-
 17 files changed, 2264 insertions(+), 52 deletions(-)
```

`configs/src/vite.styles.config.ts` and `tests/distribution.test.ts` carry the Orchestrator's
integrated patches alone; this unit wrote neither. The untracked files this unit owns are
`tests/src/styles/tokens.test.ts` (306 lines), `theme.test.ts` (81), `mixins.test.ts` (90),
`integration.test.ts` (106), `fixtures/mixins.scss` (33), `elements/body.test.ts` (23), and
`elements/html.test.ts` (16, unchanged).

`git status --porcelain` at return lists the owned files, the two integrated patch sites, and
nothing else.

## Item 1 — the guide fold

`guides/tokens.md` is absent. `guides/README.md` and `README.md` name no `tokens.md`. Readings taken
immediately after the fold:

```text
npm run test:policy   Tests  109 passed | 1 skipped (110)   exit=0
npm run test:guides   Tests  18 passed (18)                 exit=0
```

Before the fold the same `test:policy` command reported `Tests 2 failed | 107 passed | 1 skipped
(110)`, both failures naming `guides/tokens.md`.

The fold moved lines rather than retyping them: a script spliced `guides/tokens.md` lines 5 to 236
into `guides/veneer.md` with `## ` demoted to `### ` and `### ` to `#### `, and appended the old
file's `## Tests` links to the guide's own. Every relative link the moved text carried addresses
`../tests/...` and resolves unchanged from the new home; `test:guides` asserts that.

## Controls

Each control was planted, its project run, the file restored from a copy taken before planting, and
the restore proved with `diff -q` against that copy. Every row below is from the final state, after
every other edit had landed.

| Control           | Planted in                     | Project           | Red assertion                                                                                                      |
| ----------------- | ------------------------------ | ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `PLANT-REGISTER`  | `src/styles/_tokens.scss`      | `test:src:styles` | `token cascade > falls back to the factor initial value when the document element is given an invalid factor`          |
| `PLANT-MEMBER`    | `tests/setupStyles.ts`         | `test:setup`      | `styles setup > reads back the retained root and dark name lists from the installed Bootstrap stylesheet`              |
| `PLANT-ADDITION`  | `src/styles/_mixins.scss`      | `test:src:styles` | `token cascade > re-declares every theme-dependent name inside each mode scope`                                        |
| `PLANT-VALUE`     | `src/styles/_tokens.scss`      | `test:src:styles` | `token cascade > resolves every retained color token to the value Bootstrap declares for its alias`                    |
| `PLANT-SCROLL`    | `src/styles/elements/_body.scss` | `test:src:styles` | `shipped cascade > declares no physical inline-axis property anywhere in the shipped cascade`                        |
| `PLANT-COMBINATOR`| `src/styles/elements/_body.scss` | `test:src:styles` | `shipped cascade > joins no two bare tags in any elements-layer rule`                                                |
| `PLANT-TIER`      | `src/styles/_mixins.scss`      | `test:src:styles` | `declaration mixins > paints the subtle, emphasis, and border tiers at the percentages it was given`                   |

Red counts, each with `exit=1`:

```text
PLANT-REGISTER    Tests  1 failed | 37 passed (38)
PLANT-MEMBER      Tests  1 failed | 52 passed (53)
PLANT-ADDITION    Tests  5 failed | 33 passed (38)
PLANT-VALUE       Tests  2 failed | 36 passed (38)
PLANT-SCROLL      Tests  1 failed | 37 passed (38)
PLANT-COMBINATOR  Tests  1 failed | 37 passed (38)
PLANT-TIER        Tests  3 failed | 35 passed (38)
```

`PLANT-ADDITION` removes `--bs-primary` from the `theme-tokens` mixin, which emits the alias into
the root scope and the dark scope alike, so it reddens the root partition and the right-to-left
partition beside the dark-partition proof the brief names. `PLANT-VALUE` and `PLANT-TIER` each
redden a second proof for the same reason: the planted palette value and the planted tier
percentage both reach the role tiers.

Every restore reported `restored, file matches the pre-plant copy`. Green rerun after the last
restore:

```text
npm run test:src:styles     Tests  38 passed (38)   exit=0
npm run test:setup          Tests  53 passed (53)   exit=0
npm run test:src            Tests  19 passed (19)   exit=0
npm run test:setup:browser  Tests  11 passed (11)   exit=0
npm run format:check        All matched files use the correct format.
npm run lint:check          exit=0
npm run check               exit=0
npm run build               exit=0
```

## The unknowns

**Unknown 1 — does `configs/src/vite.styles.config.ts` list `tests/setupBrowser.ts`?** It already
does, at line 46:

```ts
setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts', './tests/setupStyles.ts'],
```

That is the Orchestrator's integrated D6 patch. This unit made no edit to that file, so the grant
went unused.

**Unknown 2 — does a `rem`-authored `box-shadow` resolve to the calibration's px strings on both
engines?** Yes, and both engines report the same string. Raw readings of
`readStyle(specimen, 'box-shadow')` for a specimen declaring `box-shadow: var(--bs-box-shadow-lg)`:

```text
managed Chromium  rgba(0, 0, 0, 0.07) 0px 4px 8px 0px, rgba(0, 0, 0, 0.22) 0px 24px 44px -8px
Edge              rgba(0, 0, 0, 0.07) 0px 4px 8px 0px, rgba(0, 0, 0, 0.22) 0px 24px 44px -8px
```

No calibration row moved, so no token was adjusted. The reading was taken with a throwaway
assertion planted and removed the same way a control is, and the restore was proved by diff.

**Unknown 3 — do the tier mixin's `color-mix(in oklab, …)` results match `matchesPaintedColor`
against the calibration on Edge as well as Chromium?** Yes. `npm run test:src:styles` exits 0 on
both engines with `Tests 38 passed (38)`, which includes
`resolves each calibrated role tier to the color Elements renders for it` over every row of
`CALIBRATED_TIERS`, and `paints the subtle, emphasis, and border tiers at the percentages it was
given`. Raw readings of the primary role's tiers, taken the same way:

```text
managed Chromium  subtle   color-mix(in oklab, oklch(48% .255 264) 12%, #fff)
managed Chromium  emphasis color-mix(in oklab, oklch(48% .255 264) 70%, oklch(20.8% .042 265.755))
managed Chromium  border   color-mix(in oklab, oklch(48% .255 264) 35%, #fff)
Edge              subtle   color-mix(in oklab, oklch(48% .255 264) 12%, #fff)
Edge              emphasis color-mix(in oklab, oklch(48% .255 264) 70%, oklch(20.8% .042 265.755))
Edge              border   color-mix(in oklab, oklch(48% .255 264) 35%, #fff)
```

Both engines serialize the resolved token identically, and `matchesPaintedColor` matched every
calibration row on each.

**Unknown 4 — does `tests/guides.test.ts` constrain which H2 sections `guides/veneer.md` carries?**
No. `GuideCommand` derives its rows from the `## By concept` table alone, through `parseManifest`,
and the per-row assertions read `report.fences`, `report.sections`, `report.methods`,
`report.drift`, `report.examples`, `report.imports`, `report.links`, and `report.tests`. What
constrains the guide is the fence-language list (`ts`, `css`, `scss`, `html`), the `Surface` and
`Methods` parity against the barrel, executable `ts` fences resolving against `MODULES`, relative
links resolving, and linked test files existing. Nothing reads the H2 section set. The folded
`## Tokens` section with its `###` and `####` subsections passes: `Tests 18 passed (18)`.

## Re-read of the item 3 guide rows against `_tokens.scss`

Read side by side at the final state.

| Guide row                                | Guide cell                                                                                                                     | `src/styles/_tokens.scss`                                                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `--vn-shadow-1` (reference map)          | `0 0.0625rem 0.125rem` at `0.05` over `0 0.0625rem 0.1875rem` at `0.09`                                                        | `0 calc(0.0625rem * …) calc(0.125rem * …) rgba(var(--vn-palette-black-rgb), 0.05), 0 calc(0.0625rem * …) calc(0.1875rem * …) rgba(…, 0.09)` |
| `--vn-shadow-2` (reference map)          | `0 0.125rem 0.25rem` at `0.06` over `0 0.5rem 1rem -0.25rem` at `0.12`                                                         | `0 calc(0.125rem * …) calc(0.25rem * …) rgba(…, 0.06), 0 calc(0.5rem * …) calc(1rem * …) calc(-0.25rem * …) rgba(…, 0.12)` |
| `--vn-shadow-3` (reference map)          | `0 0.25rem 0.5rem` at `0.07` over `0 1.5rem 2.75rem -0.5rem` at `0.22`                                                         | `0 calc(0.25rem * …) calc(0.5rem * …) rgba(…, 0.07), 0 calc(1.5rem * …) calc(2.75rem * …) calc(-0.5rem * …) rgba(…, 0.22)` |
| `--vn-shadow-inset` (reference map)      | `inset 0 0.0625rem 0.125rem rgba(var(--vn-palette-black-rgb), 0.075)`                                                         | `inset 0 0.0625rem 0.125rem rgba(var(--vn-palette-black-rgb), 0.075)`                                                     |
| `--vn-focus-width`, `-opacity` (map)     | `0.1875rem`, `0.45`                                                                                                           | `--vn-focus-width: 0.1875rem; --vn-focus-opacity: 0.45;`                                                                   |
| `--vn-focus-width`, `-opacity` (departures) | Veneer `0.1875rem`, `0.45`; Bootstrap `0.25rem`, `0.25`                                                                    | same Veneer values; the Bootstrap cell is the oracle's `--bs-focus-ring-width` and `--bs-focus-ring-opacity`               |
| `--vn-shadow-1`, `-2`, `-3` (departures) | Bootstrap `0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)`, `0 0.5rem 1rem rgba(0, 0, 0, 0.15)`, `0 1rem 3rem rgba(0, 0, 0, 0.175)` | driven from the oracle's `--bs-box-shadow-sm`, `--bs-box-shadow`, `--bs-box-shadow-lg`                                     |
| `--vn-font-sans` (departures, new)       | `system-ui`, `-apple-system`, `'Segoe UI'`, `roboto`, `'Helvetica Neue'`, `arial`, `sans-serif`, `'Apple Color Emoji'`, `'Segoe UI Emoji'`, `'Segoe UI Symbol'` | the declared stack, verbatim                                                       |

The new departures row names the families Veneer drops — `"Noto Sans"` and `"Liberation Sans"`
before `Arial`, and `"Noto Color Emoji"` at the end — read from the oracle's own
`--bs-font-sans-serif`.

## Gates

Managed Chromium, Windows, 2026-09-20. Final lines of each command:

```text
npm run format:check        All matched files use the correct format. (82 files)   exit=0
npm run lint:check          no diagnostics                                          exit=0
npm run check               no diagnostics                                          exit=0
npm run build               built in 309ms                                          exit=0
npm run test:src            Test Files  5 passed (5)    Tests  19 passed (19)       exit=0
npm run test:src:styles     Test Files  7 passed (7)    Tests  38 passed (38)       exit=0
npm run test:app            Test Files  2 passed (2)    Tests  3 passed (3)         exit=0
npm run test:journey        Test Files  4 passed (4)    Tests  32 passed | 4 skipped (36)  exit=0
npm run test:policy         Test Files  1 passed (1)    Tests  109 passed | 1 skipped (110) exit=0
npm run test:config         Test Files  1 passed (1)    Tests  173 passed | 1 skipped (174) exit=0
npm run test:setup          Test Files  2 passed (2)    Tests  53 passed (53)       exit=0
npm run test:setup:browser  Test Files  1 passed (1)    Tests  11 passed (11)       exit=0
npm run test:conformance    Test Files  1 passed (1)    Tests  7 passed (7)         exit=0
npm run test:guides         Test Files  1 passed (1)    Tests  18 passed (18)       exit=0
```

Edge `msedge`, same host and date:

```text
PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles     Test Files  7 passed (7)  Tests  38 passed (38)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:src            Test Files  5 passed (5)  Tests  19 passed (19)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser  Test Files  1 passed (1)  Tests  11 passed (11)  exit=0
```

The Edge `setup:browser` run is beyond what the brief asks; it was run because
`tests/setupBrowser.ts` gained the media-emulation pair and the painted-color readers, and those
drive the engine directly. `npm run test:distribution` needs the registry and stays the
Orchestrator's.

## Deviations

### D1 — the installed `@orkestrel/test/browser` exports none of the interaction helpers the brief names (not done as written)

**Expected.** Brief § Context: `@orkestrel/test/browser` at `0.0.18` exports `hoverAccessible`,
`holdAccessible`, `releasePointer`, `stageMedia`, `releaseMedia`, and `sendProtocol`, and item 6
requires using them instead of a local CDP call.

**Found.** None of those names exists anywhere in the installed package.

```text
$ grep -rn "hoverAccessible\|holdAccessible\|releasePointer\|stageMedia\|releaseMedia\|sendProtocol" node_modules/@orkestrel/test/dist/
(no output)
$ node -e "console.log(require('./node_modules/@orkestrel/test/package.json').version)"
0.0.18
```

`readStyle` and `readPixels` also take no `pseudo` argument there:
`readStyle(element: Element, property: string): string`.

**Done or not done.** Not done as written. The only proof driving a media feature is
`tests/src/styles/mixins.test.ts`, and its local `applyFeature` and `clearFeatures` helpers had to
leave the proof file regardless (acceptance criterion 6). They moved into `tests/setupBrowser.ts`
as `stageMedia(name, value)` and `releaseMedia()`, keeping the `cdp()` call the installed package
does not replace, and each gained a case in `tests/setupBrowser.test.ts`. No proof drives hover,
press, or print, so the other names were not needed.

**Hypothesis.** The brief's surface list describes a `@orkestrel/test` build that the U6 tarball
install did not leave in this checkout.

### D2 — `resetSpecimens` is named `clearSpecimens` (done, renamed)

**Expected.** Brief item 7 names `resetSpecimens()` for the `afterEach` half of the specimen pair.

**Found.** `.claude/rules/names.md` § Fixed lifecycle vocabulary assigns "reset state without
destroying the entity" to `clear`, and states: "Never introduce synonyms such as `cancel`, `reset`,
or `run` for these meanings." The function removes the recorded nodes and empties the registry,
which is exactly that meaning. `AGENTS.md` puts the rule files above a dispatch-named brief.

**Done or not done.** Done, as `clearSpecimens()`.

### D3 — `readBootstrapVariables(scope)` is `extractBootstrapVariables(cascade, scope)` (done, changed)

**Expected.** Brief item 5: an exported `readBootstrapVariables(scope)` in `tests/setupStyles.ts`
that parses the installed `bootstrap.css`.

**Found.** Two reasons to change it.

A raw CSS import resolves to an empty string in a Node Vitest project, and `tests/setupStyles.ts`
is loaded by the Node `setup` project as well as by the browser `src:styles` project. Measured with
a throwaway probe under `tmp/probe/`:

```text
tmp/probe/raw.test.ts: expected +0 to be -1
```

where the assertion read `bootstrapCascade.length` after
`import bootstrapCascade from 'bootstrap/dist/css/bootstrap.css?raw'`. The probe was deleted after
the reading.

`.claude/rules/names.md` also reserves `read*` for a value obtained from a live host object, a
stream position, or a byte layout. This walks supplied text and returns its structure, which is
`extract*`.

**Done or not done.** Done, as
`extractBootstrapVariables(cascade: string, scope: BootstrapScope)`. The stylesheet's location is
the exported `BOOTSTRAP_CASCADE_PATH` constant, and `tests/setupStyles.test.ts` reads it once with
`readFileSync`. Keeping the reader pure also bought a control the single-argument form could not
have: a case drives it with a written stylesheet whose `.navbar-dark, .navbar[data-bs-theme=dark]`
and `.card` rules it must report nothing for.

### D4 — the browser proof compares against a retained value table rather than parsing Bootstrap in the browser (done, changed)

**Expected.** Brief item 5: a browser case asserting that every token § Reference map sources
`bootstrap` resolves to the value the oracle carries for its alias.

**Found.** D3's measurement rules out reading the stylesheet from the Node proof and the browser
proof through one import, and importing 280 KB of Bootstrap text into the browser test bundle to
re-derive values the repository can state is the more expensive of the two remaining options.

**Done or not done.** Done, split across two projects with the reading carried between them by
data. `RETAINED_COLOR_ALIASES` and `RETAINED_LENGTH_ALIASES` each record a token, the alias it
answers, and Bootstrap's own value.
`tests/setupStyles.test.ts > records for every retained row the value Bootstrap declares for its
alias at root` pins every row to `extractBootstrapVariables(CASCADE, 'root')`, so a Bootstrap bump
reddens there. `tests/src/styles/tokens.test.ts` compares the shipped cascade's resolved token
against the same value — colors through `matchesPaintedColor`, lengths as numbers read from a pair
of mounted specimens — so a drifted retained value reddens there. `PLANT-MEMBER` and `PLANT-VALUE`
demonstrate the two halves.

Rows whose retained value is neither a color nor a length are outside the tables and the reason is
in each table's TSDoc: `--vn-font-mono` and `--vn-surface-gradient` would compare as text across
two different spellings of the same value; `--bs-border-radius-2xl` is declared as
`var(--bs-border-radius-xxl)`, which Veneer declares itself, so reading it inside Veneer's document
would compare the cascade with itself. Rows where the pairing is Bootstrap's and the value is not —
`--vn-form-valid`, `--vn-form-invalid`, `--vn-text-highlight` — are also excluded, and named.

### D5 — the registry walk's behavioural cases sit in `tests/src/core/index.test.ts` (done, relocated)

**Expected.** Brief item 7: `tests/setup.ts` gains `collectTokenNodes`, and item 7 also requires
behavioural cases for the registry walk.

**Found.** `.claude/rules/tests.md` resolves a `tests/setup*.test.ts` proof against its sibling
module, so the walk's home proof is `tests/setup.test.ts`. That file does not exist, and § Scope
places everything it does not name off-limits, which includes it. Creating it would also break
acceptance criterion 7.

**Done or not done.** Done inside the owned scope. `tests/src/core/index.test.ts` gained
`describe('token registry walk')` with cases for a bare name at the root path, a bare name at a
supplied path, a group reported before its members, and an empty group reported as itself alone.
That file already consumes the walk for the freeze, path-law, and uniqueness cases, and it is a
mirrored module proof rather than a cross-cutting proof, so the rule's own prohibition — "do not
move setup-helper assertions into another cross-cutting proof" — does not reach it.

### D6 — the DOM-dependent cascade readers have no case in `tests/setupStyles.test.ts` (not done)

**Expected.** Brief item 7: every helper `tests/setupStyles.ts` keeps gets a case in
`tests/setupStyles.test.ts`.

**Found.** That proof runs in the Node `setup` project, which has `browser: { enabled: false }` and
`environment: 'node'`. `readCascadeSheet`, `collectNestedRules`, `collectScopeProperties`, and
`collectLayer` each need `document`, `CSSRule`, and a loaded stylesheet. `vite.config.ts` is
off-limits, and `setup:browser` collects `tests/setupBrowser.test.ts` alone, so no owned change
puts the proof where those readers can run.

**Done or not done.** Not done for those four. Every Node-callable export has a case:
`splitTopLevelValues`, `splitTopLevelList`, `extractShadowLayers`, `matchesEdgeShorthand`,
`matchesRadiusShorthand`, `matchesSideKeyword`, `matchesDirectionSensitive`,
`scanPhysicalDeclaration`, `normalizeValueToken`, `normalizeSelectorText`,
`normalizeComplexSelector`, `extractCompoundTag`, `extractSelectorTags`, `matchesLooseTagPair`,
`collectTokenNames`, `collectTripletGroups`, `extractBootstrapVariables`,
`BOOTSTRAP_SCOPE_PATTERNS`, and the retained tables. The four DOM readers are exercised by the
style proofs that consume them in `tests/src/styles/`, which run in the browser; `collectLayer`
throws rather than returning an empty list when the document has loaded no cascade, so an empty
reading there cannot pass for an empty layer.

### D7 — `loadStylesheet` was added to `tests/setupBrowser.ts` beyond the named helper list (done, added)

**Expected.** Brief item 7 names the specimen builder and the painted-color helpers for
`tests/setupBrowser.ts`.

**Found.** After the re-authoring, two proofs still built a `<style>` element by hand, appended it
to `document.head`, and removed it: `tests/src/styles/integration.test.ts` for the customization
recipe and `tests/src/styles/tokens.test.ts` for the right-to-left cascade.
`.claude/rules/tests.md` calls a near-duplicate helper a defect and requires extraction as soon as
a fixture could serve another test.

**Done or not done.** Done. `loadStylesheet(css)` returns the appended element, so the
right-to-left case still reads its `sheet`, and the element is recorded in the same registry
`clearSpecimens` empties. `tests/setupBrowser.test.ts` covers it. The deviation contract lets this
unit settle helper placement within a granted module, so it is recorded rather than stopped on.

### D8 — the customization recipe's example colors changed (done, changed)

**Expected.** Brief item 4: declare `--vn-color-primary-rgb` beside `--vn-color-primary-base` in
the § Customization fence.

**Found.** The fence previously set `--vn-color-primary-base: oklch(0.55 0.2 150)`. A channel
triplet is the fill's sRGB rendering, and that fill is outside the sRGB gamut, so the triplet a
consumer would have to write beside it is whatever the engine clamps to rather than a number the
guide can state and a reader can check.

**Done or not done.** Done. The recipe now sets `#2e7d32` with `46, 125, 50` at `:root` and
`#66bb6a` with `102, 187, 106` under `[data-bs-theme='dark']`. Every value in it is exact, and
`tests/src/styles/integration.test.ts` executes the recipe and reads the rescaled spacing, the
fill, the subtle, emphasis, and border tiers, the triplet through
`background-color: rgb(var(--bs-primary-rgb))`, and the dark island's own fill, subtle tier, border
tier, and triplet.

### D9 — `tests/setupBrowser.ts` imports a type from `@vitest/browser-playwright` (done, added)

**Expected.** Nothing in the brief.

**Found.** Moving the `cdp()` call into `tests/setupBrowser.ts` put it inside
`configs/app/tsconfig.browser.json`'s include list, and that scope declares
`"types": ["vite/client", "vue"]`. The playwright provider augments `vitest/browser`'s `CDPSession`
with `send`; without the provider's declarations that interface is empty, so `vue-tsc` reported:

```text
tests/setupBrowser.ts(209,14): error TS2339: Property 'send' does not exist on type 'CDPSession'.
tests/setupBrowser.ts(218,14): error TS2339: Property 'send' does not exist on type 'CDPSession'.
```

`configs/**` is off-limits, so the augmentation cannot be loaded from the scoped config.

**Done or not done.** Done. `import type { CDPSession } from '@vitest/browser-playwright'` loads
the augmentation and annotates the session each function drives, with a comment stating why. An
empty `import type {}` was tried first and rejected by `lint:check`
(`import(no-empty-named-blocks)`). `npm run check` exits 0.

### D10 — the hard-coded oracle list lengths were replaced rather than kept (done, changed)

**Expected.** Brief item 5: assert the retained lists `toStrictEqual` the readings' names, keeping
the digest and version assertions.

**Found.** `tests/setupStyles.test.ts` also carried
`expect(BOOTSTRAP_ROOT_VARIABLES.length).toBe(127)` and the matching `61`. Those are a tally over a
set the next Bootstrap release changes, and the oracle equality subsumes them: a list that equals
the reading has the reading's length.

**Done or not done.** Done. The two length assertions are gone; the uniqueness and `--bs-` prefix
assertions in that case stay, and the digest and version assertions stay. `PLANT-MEMBER` confirms
the equality reddens on a swapped member of the same length, which is the case the length
assertions could not catch.

### D11 — one assertion this unit wrote was false and was dropped (observation)

While writing the oracle cases this unit asserted that no `--bs-navbar-*` name appears in the dark
reading. The run refuted it: `--bs-navbar-toggler-icon-bg` is in `BOOTSTRAP_DARK_VARIABLES` and in
the reading, because Bootstrap declares it on a rule whose selector begins `[data-bs-theme=dark]`.
The assertion was dropped. What the anchored predicate excludes is
`.navbar-dark, .navbar[data-bs-theme=dark]`, and the written-stylesheet control in
`takes each scope from its own selector, and reports nothing for a rule outside it` proves exactly
that. The TSDoc on `BOOTSTRAP_DARK_VARIABLES` and `BOOTSTRAP_SCOPE_PATTERNS` states the rule by
name rather than by prefix.

### D12 — the reader trims a declaration value (observation)

`extractBootstrapVariables` returns each value trimmed. postcss leaves trailing whitespace on a
declaration that carries no semicolon before its closing brace, which the written-stylesheet
control surfaced (`'1px '` where `'1px'` was expected). The installed Bootstrap stylesheet is
unaffected, but a reader that returns the value should return the value.

## Ancillary choices settled under the deviation contract

- `## Tokens` sits after `## Examples` and before `## Showcase`, with `### Reference map`,
  `### Bootstrap variables Veneer retains`, `### Customization`, `### Departures from Bootstrap`,
  and `### Deferred names` beneath it, and the reference map's groups at `####`.
- Every Markdown table in `guides/veneer.md` was realigned to one column width per table, so a
  rewritten row keeps the file's own shape. No gate reads table alignment.
- The reference map's space row split into `--vn-space-1` and `--vn-space-2` through
  `--vn-space-8`, rather than annotating one row twice.
- `splitSelectorList` became `splitTopLevelList`, because the shadow reader needs the same split
  and two implementations of one algorithm is a defect.
- The fixture class `.vn-fixture-palette` became `.vn-fixture-role` with the mixin it exercises,
  and pins its fill and both mix anchors to palette tokens, so the painted expectation is a
  function of the percentages alone and carries no literal color into a stylesheet
  `.claude/rules/styles.md` forbids one in.
- Case order in each rewritten proof follows the reading order of the subject rather than the
  previous file's order.

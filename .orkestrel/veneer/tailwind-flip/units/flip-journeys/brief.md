# Unit flip-journeys (U6): the three-face journeys, the face statechart, and the partition proof

## Role and engine

astra on GPT-6 Astra (effort high), run as `codex exec` at `danger-full-access`. Executor: BENCH_ENGINE. You are the only writer of tracked files in `/home/user/veneer`. Another unit, `flip-probe-3`, may still write `/home/user/veneer/tmp/probes/flip4/**` while you run. Its files may appear in `git status --porcelain`: list them and change none. Every path in this brief is absolute, or it names a file under `/home/user/veneer` in prose.

## Objective

Implement unit U6 of the Tailwind flip in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. U2 (`bae9a1b`) and U3 (`54c05ff`) are committed. U4 (`flip-integration`, finished by `flip-integration-2`), the fold unit `flip-sheet-2` (the derived curation table with its `scoped` rows folded into the Sass and the guide), and U5b (`flip-showcase`) are accepted and committed before this launch. Your work:

- Move the showcase helpers of `/home/user/veneer/tests/setupBrowser.ts` to the three faces `bootstrap`, `unexcluded`, and `tailwindcss`: `FACE_LABELS`, `TailwindReading`, `TAILWIND_READINGS`, `readFace`, `applyFace`, `assertFace`, `FACE_SCENARIOS` (9 rows), `buildPairScenarios` (6 rows), `collectBootstrapGroups`, `readShowcaseChrome`, and the added `collectPartition`.
- Amend the showcase describe blocks of `/home/user/veneer/tests/setupBrowser.test.ts` to match.
- Amend `/home/user/veneer/tests/app/browser/integration.test.ts`: J1, J2, J4, J6, the refusal case, the paired open engine states case (an equality over three faces), the partition case (replacing face invariance), and the header statechart case (9 face rows).
- Run `npm run test:journey` green on this host and record its wall time.

Commit nothing.

## Context

- **Re-read at launch (the three units' output).** This brief describes the checkout at veneer `54c05ff` plus the changes the three preceding units declare. Before editing, read each of these as those units left it:
  - `git log --oneline -6` and `git status --porcelain`. Expect the commits of U4, `flip-sheet-2`, and U5b on top of `54c05ff`, and no tracked change. Record the list.
  - U5b's report, `/home/user/scaffold/tmp/codex/flip-showcase-last.md` **(re-read)**: the face composition per face as its tests read it, the chrome counts, the P4 rerun (each face button's box at 390), the caption 3.20 branch with the bare `td` border-color triple, every `npm run test:setup:browser` failing title it lists for you, and the lines it changed in `/home/user/veneer/tests/setupBrowser.ts` under its Orchestrator ruling 1 (the `unexcluded` entry of `FACE_LABELS`, and any minimal `unexcluded` branch).
  - U4's reports, `/home/user/scaffold/tmp/codex/flip-integration-last.md` and `/home/user/scaffold/tmp/codex/flip-integration-2-last.md` **(re-read)**: the reverse-order measurement of `[built, unexcluded]` against `[unexcluded, built]`, and the instruments it added to `/home/user/veneer/tests/setupStyles.ts` (`readChromiumMajor`, `partitionPreflightRows`, `collectDeclaredLonghands`, `flattenDeclarations`, `removeLayerBlocks` at brief time).
  - The fold unit's output **(re-read)**: `/home/user/veneer/src/tailwindcss/_tokens.scss` (`$curation`, `$defaults`, and the `scoped` rows), `/home/user/veneer/guides/veneer.md` § Tailwind compatibility sheet (the curation table), and `DepartureCause` in `/home/user/veneer/tests/setupStyles.ts` (at brief time `'utility' | 'preflight' | 'inherited' | 'unattributed'`; verdict § 12 names a `resolved` kind that `flip-probe-3` derives; use the kinds present at launch).

- **The governing copy document.** `/home/user/scaffold/tmp/codex/flip-copy.md` (U5a, with § Orchestrator rulings on the open items at its end). Every test title, wait description, and specimen title you write comes from it: § 1 (labels and identifiers), § 3 (specimen titles), § 4 (specimen order), § 5 (the 390 px header), § 8 (test titles), and the ruling on open item 3. Never reword a copy string.

- **Evidence.** Read these in order before editing:
  1. `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md`. § 12 and § 13 override earlier text. Read § 1 R5 and R7; § 5 Showcase (all of it: the faces, `TAILWIND_READINGS`, the partition proof, the controls, the census per face, "The sized-image control goes", the chrome); § 6 (the restored clause inverts: each of the 192 reads its Tailwind-alone delta and each of the 17 its Bootstrap-alone delta at every width; the journeys as Chromium cases: partition, J4 over three faces, 9 statechart rows); § 8 item 7 (this unit and its acceptance); § 10 items 2, 3, 4, 8, 12, and 14; § 12 (the R5 corrections, the `resolved` kind, and "the `text-center text-md-start` witness reads `left`"); § 13 P4, P5, P7.
  2. The U1 readings: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-probe/p5.json` (45 rows) and `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-probe/report-excerpt.md` § P5 (lines 56 to 106). Its triples are ordered `bootstrap`, `unexcluded`, `tailwindcss`. P5 read the tuned sheet and recipe of the last P3 iteration (excerpt line 21), not the committed records; a live reading that departs from a P5 value is Implementation item 2's stop.
  3. `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements.md` § M3 (line 45) and `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m3-components.md` (the class sets: shared 209, shared ∩ utilities 192, shared ∩ components 17; every element departs in `tab-size` 8 to 4 under preflight, an inherited departure) and `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m3-summary.md`.
  4. The lanes contract `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md`: § Paths (lines 14 to 34: the shared-file table splits `/home/user/veneer/tests/setupBrowser.ts` and `.test.ts` into an engine section and a showcase section); § Rules (line 38, the environment boundary: `/home/user/veneer/tests/setupBrowser.ts` imports no value from the app folder, only types; pass application values as arguments, as `buildPairScenarios(FACES, THEMES)` does); the engine's entry of 2026-10-04 (lines 88 to 94: `arrangeDisclosureVisibility` clicks through `actOnDisclosureControl`; keep it); the showcase entry of 2026-10-03 (line 255: `test:journey` 60 of 60 in 225 s at `43ca8a0`; line 257: peak sampled memory 12,288,905,216 of 14,345,035,776 bytes); § Host-bound set (lines 48 to 55).
  5. The journey cost history: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/j0c-brief.md` (line 9 and line 254: the gate's budget is a wall time at or under 235 s on this host) and `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/j0c-report.md` (lines 1 to 30: final walls 226.77 s and 217.89 s at `39fd514`; J4 summed 13.95 s over four variants). `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/status.md` lines 48, 56, and 57 (substance over seconds; `npm run build` before the journeys; how to iterate on one variant).
  6. Current code. Read every named item before editing; line numbers are from `54c05ff` and move with U5b's admitted edit **(re-read)**:
     - `/home/user/veneer/tests/setupBrowser.ts` (5917 lines), showcase section. Imports `type { Choice, Face, Showcase, Theme } from '@app/browser'` (:21), `collectPreflightPseudos, readLonghands` from `/home/user/veneer/tests/setupStyles.ts` (:97), `CLASS_NAMES` from `/home/user/veneer/src/core/constants.ts` (:98). `TailwindReading` :141 (`values` and `narrow` typed `Record<Face | 'unexcluded', string>`); `FACE_LABELS` :157 (two keys at brief time; U5b adds `unexcluded`); `TAILWIND_MEDIUM` :196 (768); `TAILWIND_READINGS` :213 to :300 (14 rows with the pre-flip mirror's values); `buildShowcase` :456; `buildJourney` :475; `readPressed` :572; `readFace` :587 (two-way); `applyFace` :659; `resolveSpecimen` :697; `resolveExpectation` :721; `readTailwind` :742; `SurfaceDeparture` :769; `collectBootstrapGroups` :794 (finds the level-2 heading `Bootstrap with Tailwind`); `readSurface` :881; `readShowcaseChrome` :943 (normalizes the Stylesheets buttons by `value`, hides `#tailwindcss`); `readOpenShowcase` :994; `collectDepartures` :1036; `arrangeFace` :1071; `actOnFace` :1076; `assertFace` :1081 (two-way `other`, wait description `the status names the selected stylesheet set`, witness `TAILWIND_READINGS[0]`); `FACE_SCENARIOS` :1140 (4 rows, events `tailwindcss`, `bootstrap`, `bootstrap`, `tailwindcss`); `THEME_SCENARIOS` :1200; `ShowcaseSelection` :1248; `readSelection` :1258; `applySelection` :1263 and `assertSelection` :1269 (two-way parse); `buildPairScenarios` :1287 (`from` is the opposite face); `JOURNEY_PLACEMENTS` :3945 (`face` runs at `light-390` and `dark-1280`; `theme` and `pair` at `light-390`; `shared` at `dark-1280` and `light-390`); `COMPONENT_TABLES` :3955. `collectPartition` is absent at brief time.
     - The engine section of the same file, which you never edit (lanes § Paths): `createOracle` :4328, `runSteps` :5258, `recordTranscript` :5230, `compareTranscripts` :5612, `readTipTranscript` :5680, `normalizeTipTranscript` :5706, `DEPARTURE_FAMILIES` :5417, `DepartureLedger` :5540, `PlacementRecorder` :106, `TranscriptRecorder` :4966, `buildEnginePlugin` :5806, `buildConflict` :5882, and the `build*` engine fixtures (`buildAlert` :4542, `buildButton`, `buildToast`, `buildModal`, `buildCollapse`, `buildAccordion`, `buildTabs`, `buildScrollspy`, `buildDropdown`, `buildTooltip`, `buildPopover`, `buildCarousel`, `buildComponentLifetime`), plus `OracleOptions`, `TIP_CONTENT_CASES`, `TIP_OFFSET_CASES`, the CDP readers, `readAnchorStylesheet`, `createPlacementFixture`, and everything from :4088 to the end of the file. Also keep `arrangeDisclosureVisibility` (:2053) clicking through `actOnDisclosureControl` (:2067).
     - `/home/user/veneer/tests/setupBrowser.test.ts` (2228 lines): the showcase describes `showcase mount` :234, `component statechart setup` :338, `traverseFocus` :656, `pressed readings` :701, `parseTheme` :735, `waitForPaint` :746, `applyFace and applyTheme` :761, `specimen readings` :796, `population readings` :846, `collectDepartures` :994, `LEAKED_VALUES` :1049, `statechart tables` :1060. `consumer plugin recorder` :65 and `Bootstrap oracle` :1456 are the engine's: never edit them.
     - `/home/user/veneer/tests/app/browser/integration.test.ts` (1181 lines): imports `type { Face }` from the app types (:1), `FACES`, `GROUPS`, `SECTIONS`, `TAILWIND_CLASSES`, `THEMES`, `TITLE` (:49 to :56), `{ unexcluded }` from the app record `/home/user/veneer/app/browser/recipe.json` (:58), `adoptSheet` from `/home/user/veneer/tests/setupStyles.ts` (:111). Cases: J1 :165, J2 :203, J3 :242, J4 :311, J6 :355, the shared-placement journeys :372 and :429, the refusals :599, :638, :695, :712, the matrix cases :773 and :826, the statecharts :1005 and :1069, the portfolio :1131 and :1140.
     - `/home/user/veneer/app/browser/types.ts` (`Face`, `Choice`, `Theme`, `Showcase` export), `/home/user/veneer/app/browser/constants.ts` (`FACES`, `GROUPS`, `SECTIONS`, `TAILWIND_CLASSES`, 14 names), `/home/user/veneer/app/browser/Showcase.ts` (the three `style` elements and their ids) **(re-read; U5b's)**. Read only.
     - `/home/user/veneer/app/browser/recipe.json`: keys `tailwindcss`, `sheet`, `candidates`, `recipe` (359330 characters at brief time), `unexcluded` (20662). These are the texts the page's faces serve. `/home/user/veneer/tests/fixtures/tailwindcss/recipe.json` carries the same keys with other lengths (`recipe` 357934, `unexcluded` 19266), compiled over the fixture's candidates; the faces never adopt it.
     - `/home/user/veneer/tests/fixtures/tailwindcss/comparison.json`: keys `bootstrap`, `tailwindcss`, `shared` (209 names), `correspondences`. Filed against `CLASS_NAMES.bootstrap.utilities` in `/home/user/veneer/src/core/constants.ts`, `shared` splits into 192 utility names and 17 component names: `caption-top`, `col-1` to `col-12`, `col-auto`, `collapse`, `container`, `table` (measured from `/home/user/veneer/dist/src/core/index.js` at brief time; the same split as M3).
     - `/home/user/veneer/tests/setupStyles.ts` (the engine lane's, read only): `adoptSheet` :611, `attributeDeparture` :104 with `AttributionOptions` :256, `readClassLonghands`, `deriveClassDelta`, `collectDeclaredLonghands` (U4), `scanSheetRules`, `readLonghands`. Reuse them; a local twin is a defect.
     - `/home/user/veneer/configs/app/vite.journey.config.ts`: four projects `journey:light-1280`, `journey:dark-1280`, `journey:light-390`, `journey:dark-390` (1280x800 and 390x844), one execution group. `/home/user/veneer/vite.config.ts` `appJourney` :397 sets no `testTimeout`: each case carries its own timeout (J2 `120_000`, J3 `240_000`, the matrix cases `120_000` and `300_000`, the header statecharts `120_000`), and J1, J4, and J6 run under Vitest's browser default. `package.json` :101 `test:journey` is `vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot`; its `Duration` line is the wall time. `test:setup:browser` :106 runs `/home/user/veneer/tests/setupBrowser.test.ts` and `/home/user/veneer/tests/setupStyles.test.ts` with `/home/user/veneer/tests/setupBrowser.ts` as a setup file. `build` :110 is `clean`, `build:src`, `build:app`; `build:showcase` :124 writes `/home/user/veneer/showcase/browser.html`.
- **Law.**
  - `/home/user/scaffold/AGENTS.md`: no `any`, no `as` beyond `as const`, no `!`, no `@ts-*`, lint-disable, or formatter-ignore directives, no new npm package, no mocks; types before implementation; readonly interface properties; no nested functions; `{verb}{Noun}` helpers; the environment boundary.
  - `/home/user/scaffold/.claude/rules/tests.md`: one behavior per case, planted and removed controls, and the journey and statechart rules.
  - `/home/user/scaffold/.claude/rules/typescript.md` (every exported item keeps the full TSDoc contract; update each contract your change makes false), `/home/user/scaffold/.claude/rules/writing.md` (titles and TSDoc in plain present tense; § 7 of the copy document retires "stylesheet set" for "face"), `/home/user/scaffold/.claude/rules/names.md`.
  - `/home/user/scaffold/.agents/skills/orkestrel-journey/SKILL.md` § Prove the statechart and § Accept, and `/home/user/scaffold/.agents/skills/orkestrel-journey/references/statechart.md` § Declare the table (one table feeds the run and the harness; a row for every event in every state, including the event that leaves the state unchanged).
- **Installed primitives.** `vitest` with the browser module; `@orkestrel/test` (`requireValue`, `waitForCondition`, `waitForText`, `executeScenarios`, `STATECHART_ATTRIBUTES`); `@orkestrel/test/browser` (`clickAccessible`, `readStates`, `readStyle`, `readPerception`, `waitForState`, `createHarness`, `buildCensus`, `readCensus`). Reuse the helpers of `/home/user/veneer/tests/setupBrowser.ts` and `/home/user/veneer/tests/setupStyles.ts`.
- **Host.**
  - Linux POSIX. Run from `/home/user/veneer`, with `/home/user/.wave/npm11/node_modules/.bin` first on `PATH` (npm 11).
  - Chromium 141.0.7390.37 under Playwright.
  - Sandbox `danger-full-access`: no network, installs, or commits.
  - A nested `git` may report "not a git repository". Do not diagnose that; your own `git status --porcelain` is the authority.
  - `/home/user/veneer/tmp/` and `/home/user/veneer/dist/` are ignored. Create `/home/user/veneer/tmp/units/flip-journeys/`.
  - Run no two journey or browser runs at once: the gate's sampled peak memory reached 12.3 GB of the host's 14.3 GB cap (lanes line 257).
- **Standing conditions.**
  - At start, `git status --porcelain` shows no tracked change, plus `flip-probe-3`'s ignored files if any. Record the list.
  - Baseline before any edit: `npm run build`; `sha256sum dist/src/bootstrap/index.css showcase/browser.html app/browser/recipe.json`; one `npm run test:setup:browser`; one `npm run test:journey`. Record each exit, every failing title, and the journey's `Duration` line. The journeys are expected to fail on the retired labels; their wall time is still the "before" reading.

## Implementation

Each item can be checked against its acceptance.

1. **`FACE_SCENARIOS` and the face helpers.** Copy § 1 and § 8.1; verdict R7.
   - **Labels.** `FACE_LABELS` holds three keys in toggle order: `bootstrap: 'Bootstrap only'`, `unexcluded: 'Tailwind without the layer'`, `tailwindcss: 'Tailwind with the layer'` (rulings 1.2 to 1.4). Its example reads `FACE_LABELS.tailwindcss // 'Tailwind with the layer'`.
   - **The sheets each face serves** (U5b's plumbing, copy ruling 5.3; read `Showcase.ts` at launch **(re-read)**). Among `style[id^="veneer-"]` in document order:

     | Face | Label | Ids | Text |
     | --- | --- | --- | --- |
     | `bootstrap` | `Bootstrap only` | `veneer-bootstrap` | the built `/home/user/veneer/dist/src/bootstrap/index.css`, the lifted sheet alone |
     | `unexcluded` | `Tailwind without the layer` | `veneer-unexcluded`, `veneer-bootstrap`, adjacent | the record's `unexcluded` text, then the lifted sheet |
     | `tailwindcss` | `Tailwind with the layer` | `veneer-tailwindcss` | the record's `recipe` text alone |

     When U5b's report or `Showcase.ts` reads a different id or order, follow the code and report the difference.
   - **`readFace`** reads which of the three buttons announces itself pressed and throws when the count is not exactly one, naming the count. **`applyFace`** is unchanged in form. **`assertFace`** waits for its own button at `pressed=true` and the other two at `pressed=false`, waits for the status with the description `the status names the selected face` (ruling 8.7), then reads two witnesses that separate all three faces: the padding row (`12px`, `32px`, `32px`) and the `.mt-3` row (`16px`, `16px`, `12px`) of item 2, and the `style[id^="veneer-"]` ids of the preceding table.
   - **The 9 rows**, in toggle order of the starting face, then of the pressed button (ruling 8.1). `event` is the face the pressed button selects; `to` equals `event` in every row, because a face press always lands on its face. `arrange`, `act`, and `assert` stay `arrangeFace`, `actOnFace`, `assertFace`.

     | # | `transition.name` | `from` | `event` | `to` |
     | --- | --- | --- | --- | --- |
     | 1 | `bootstrap stays bootstrap through the Bootstrap only button` | `bootstrap` | `bootstrap` | `bootstrap` |
     | 2 | `bootstrap becomes unexcluded through the Tailwind without the layer button` | `bootstrap` | `unexcluded` | `unexcluded` |
     | 3 | `bootstrap becomes tailwindcss through the Tailwind with the layer button` | `bootstrap` | `tailwindcss` | `tailwindcss` |
     | 4 | `unexcluded becomes bootstrap through the Bootstrap only button` | `unexcluded` | `bootstrap` | `bootstrap` |
     | 5 | `unexcluded stays unexcluded through the Tailwind without the layer button` | `unexcluded` | `unexcluded` | `unexcluded` |
     | 6 | `unexcluded becomes tailwindcss through the Tailwind with the layer button` | `unexcluded` | `tailwindcss` | `tailwindcss` |
     | 7 | `tailwindcss becomes bootstrap through the Bootstrap only button` | `tailwindcss` | `bootstrap` | `bootstrap` |
     | 8 | `tailwindcss becomes unexcluded through the Tailwind without the layer button` | `tailwindcss` | `unexcluded` | `unexcluded` |
     | 9 | `tailwindcss stays tailwindcss through the Tailwind with the layer button` | `tailwindcss` | `tailwindcss` | `tailwindcss` |

     The TSDoc says "one per button per face" and that the three rows pressing the selected button leave the face where they found it.
   - **Pair rows** (ruling 8.2): `buildPairScenarios(FACES, THEMES)` keeps its signature and the name pattern `FACE and THEME through both header buttons`, and yields 6 rows, faces outermost: `to` reads `bootstrap:light`, `bootstrap:dark`, `unexcluded:light`, `unexcluded:dark`, `tailwindcss:light`, `tailwindcss:dark`. `from` takes the face that follows `face` in the `faces` argument, wrapping to the first (`bootstrap` from `unexcluded`, `unexcluded` from `tailwindcss`, `tailwindcss` from `bootstrap`), with the opposite theme, so each row changes both axes and the helper names no face literal. `applySelection` and `assertSelection` parse the face from the selection through a guard over the `faces` values or the three `FACE_LABELS` keys, with no `as`.
   - **`TailwindReading`**: `values` and `narrow` become `Readonly<Record<Face, string>>` (`Face` holds `unexcluded`). `resolveExpectation` takes `face: Face`. Update both TSDoc contracts ("under each face").

2. **`TAILWIND_READINGS`.** Verdict § 5 and § 13 P5; copy § 3 and ruling 8.11. Each row's `specimen` is the copy § 3 title, which `resolveSpecimen` finds by caption title. Triples are (`bootstrap`, `unexcluded`, `tailwindcss`); `values` holds 1280 (the md breakpoint and wider), `narrow` holds 390 where it differs. Every value is P5's measured value (`p5.json`; "shipped page" or "scratch page" as P5 read it), except where the Source column says otherwise.

   | # | `specimen` | `subject` | `property` | `values` | `narrow` | Source |
   | --- | --- | --- | --- | --- | --- | --- |
   | 1 | `Tailwind padding on a Bootstrap button` | `button` | `padding-left` | `12px`, `32px`, `32px` | none | P5, both widths |
   | 2 | `Shared spacing, border, and radius` | `.mt-3` | `margin-top` | `16px`, `16px`, `12px` | none | P5 (`Shared spacing and radius follow Tailwind`), both widths |
   | 3 | `Shared spacing, border, and radius` | `.gap-4` | `column-gap` | `24px`, `24px`, `16px` | none | P5, both widths |
   | 4 | `Shared spacing, border, and radius` | the element carrying `rounded` (P5 read `span.rounded`; use the selector that matches U5b's markup) | `border-top-left-radius` | `6px`, `6px`, `4px` | none | P5, both widths (the verdict's `rounded` graft) |
   | 5 | `Collapse, a name both systems declare` | `.collapse` | `display` | `block`, `block`, `block` | none | P5 (`Collapse stays visible`), both widths |
   | 6 | `Collapse, a name both systems declare` | `.collapse` | `visibility` | `visible`, `collapse`, `visible` | none | P5, both widths |
   | 7 | `Container, a name both systems declare` | `.container` | `padding-left` | `12px`, `12px`, `12px` | none | P5 (`Container keeps Bootstrap's widths`), both widths |
   | 8 | `Container, a name both systems declare` | `.container` | `max-width` | `1140px`, `1280px`, `1140px` | `none`, `none`, `none` | P5 at 1280 and 390 |
   | 9 | `Pill radius beside rounded-full` | `button` | `border-top-left-radius` | `800px`, `800px`, `800px` | none | P5, both widths |
   | 10 | `Tailwind grid in a card body` | `.grid` | `display` | `block`, `grid`, `grid` | none | P5, both widths |
   | 11 | `Tailwind variant at the md breakpoint` | `.md\\:flex` | `display` | `block`, `flex`, `flex` | `block`, `block`, `block` | P5 at 1280 and 390 |
   | 12 | `Arbitrary margin value` | `.mt-\\[1rem\\]` | `margin-top` | `0px`, `16px`, `16px` | none | P5, both widths |
   | 13 | `Bare heading beside a heading class` | `h5` (the bare heading; P5 read `#bare-heading` on a scratch page) | `font-size` | `20px`, `20px`, `16px` | none | P5 scratch page, both widths |
   | 14 | `Bare heading beside a heading class` | `.h5` | `font-size` | `20px`, `20px`, `20px` | none | P5 scratch page, both widths |
   | 15 | `Bootstrap card on Tailwind's reset` | `.card-title` | `font-weight` | `500`, `500`, `500` | none | P5 scratch page, both widths |
   | 16 | `Bootstrap card on Tailwind's reset` | `.card-text` | `margin-bottom` | `16px`, `16px`, `16px` | none | P5 scratch page, both widths |
   | 17 | `Bootstrap card on Tailwind's reset` | `p:not([class])` (the bare paragraph; P5 read `#bare-paragraph`) | `margin-bottom` | `16px`, `16px`, `0px` | none | P5 scratch page, both widths |
   | 18 | `Bare image and list` | `img` | `display` | `inline`, `block`, `block` | none | P5, both widths |
   | 19 | `Bare image and list` | `ul` | `list-style-type` | `disc`, `none`, `none` | none | P5, both widths |
   | 20 | `Icon in a Bootstrap button` | `svg.bi` | `display` | `inline`, `block`, `inline` | none | P5 scratch page, both widths |
   | 21 | `Hidden attribute with a display utility` | `[hidden]` | `display` | `flex`, `none`, `none` | none | P5, both widths |
   | 22 | `Border width without a border style` | `.border-1` | `border-top-width` | `0px`, `1px`, `1px` | none | P5 scratch page, both widths |
   | 23 | `Responsive alignment at the md breakpoint` | `.text-center.text-md-start` | `text-align` | `left`, `left`, `left` | `center`, `center`, `center` | P5 at 768 (`left` ×3; P5 had expected `start` under `tailwindcss` and measured `left`; verdict § 12 rules `left`). Not measured by P5 at 1280 or 390: `left` at 1280 follows from 768 (min-width breakpoint) and `center` at 390 from copy ruling 3.23 ("centered narrower than the md breakpoint"); your first live reading confirms both, and a departure is item 2's stop |

   - The 14 rows of brief time (pre-flip mirror values, under `tailwindcss` reading Bootstrap's scale) are replaced, not edited in place: rows 2, 3, 12 to 13, 17 to 20, and 23 change their `tailwindcss` value from the pre-flip value, and `Bootstrap spacing keeps its scale`, `Collapse stays visible`, and `Container keeps Bootstrap's widths` leave the file.
   - The 768 reading: `TAILWIND_MEDIUM` (768) is not a journey width. Read row 23 at 768 in the setup case `reads every Tailwind reading the caption claims under the three faces` (item 6) through `page.viewport(768, 1024)` under each face, expecting `left` ×3, and restore the viewport in `finally`.
   - Rewrite the TSDoc of `TAILWIND_READINGS` for the three faces and the walk of copy § 4; its example reads `TAILWIND_READINGS[0]?.values.tailwindcss // '32px'`.
   - **Stop** when a live reading departs from the table at a width P5 measured: report the row, the width, the three readings, and P5's triple. The sheets moved after P5 (the fold unit's derived table), so the stop carries the hypothesis; the Orchestrator rules.

3. **`collectPartition` and the partition case.** Verdict § 5 (partition), § 6 (the restored clause inverts), § 12 (R5 corrections); copy ruling 8.3.
   - **Compositions.** The journey project builds the two reference compositions from texts, never from a served face, and never composes the misuse pair (the built sheet beside the `recipe` text, in either order):
     - Bootstrap alone: the built sheet text (the content of `style#veneer-bootstrap` under the `bootstrap` face, or the `?raw` import of `/home/user/veneer/dist/src/bootstrap/index.css` as `Showcase.ts` does). This is also the `bootstrap` face.
     - Tailwind alone: the record's `unexcluded` text alone (the preflight-only composition, U4's term), from `/home/user/veneer/app/browser/recipe.json`.
     - Read each shared name's delta detached, through `readClassLonghands([NAME], [WIDTH], [TEXT])` and `deriveClassDelta` (`/home/user/veneer/tests/setupStyles.ts`), once per name per width, for the names the page carries.
     - The integration test passes the texts and the name lists to `collectPartition` as arguments; `/home/user/veneer/tests/setupBrowser.ts` imports no value from the app folder. It may import `/home/user/veneer/tests/fixtures/tailwindcss/comparison.json` and `CLASS_NAMES` (neither is app code) to derive the 192 and the 17; declare the derived lists once.
   - **`collectPartition`** lives in the showcase section of `/home/user/veneer/tests/setupBrowser.ts`, with its public types declared in that file beside `TailwindReading` and a full TSDoc contract. It takes the surface readings (or the elements) of the served faces, the reference deltas per width, and the name lists, and returns the violations as data (element key, longhand, face, expected, read, clause), so the case asserts an empty list and a control asserts a non-empty one. Settle the exact signature yourself and record it.
   - **Clauses**, on every element of `collectBootstrapGroups()` plus the chrome of `readShowcaseChrome`, at the project's width (1280 or 390), in the variant's theme:
     1. **The 192 shared utility names, `tailwindcss` face.** For each shared utility name an element carries and each longhand in that name's Tailwind-alone delta that no other class on the element declares: the element reads the Tailwind-alone value, and departs from the `bootstrap` face's reading exactly where the Tailwind-alone delta differs from the Bootstrap-alone delta. A longhand that another class on the element also declares is skipped and counted.
     2. **The 17 shared component names, `tailwindcss` face.** For each shared component name (`caption-top`, `col-1` to `col-12`, `col-auto`, `collapse`, `container`, `table`) an element carries and each longhand in its Bootstrap-alone delta that no other class on the element declares: the element reads the Bootstrap-alone value, equal to the `bootstrap` face.
     3. **The 192, `unexcluded` face.** Bootstrap's unlayered important utilities win: the element reads the Bootstrap-alone value on each longhand of clause 1.
     4. **Bare elements** (no `class` attribute). Under `tailwindcss`, each longhand preflight declares for the element (through `collectDeclaredLonghands` on the Tailwind-alone sheet) reads the Tailwind-alone value, except where a `scoped` curation row of the fold unit covers the element **(re-read)**. Under `unexcluded`, the same holds for each longhand preflight declares and the built sheet does not; a longhand the built sheet declares reads the Bootstrap-alone value (P5: the bare `h5` reads `20px` and the bare `p` `16px` under `unexcluded`, while the bare `img` reads `block`).
     5. **Every other departure of the `tailwindcss` face** from the `bootstrap` face is attributed by `attributeDeparture` with the kinds present at launch: a component element carries only layout, invisible, utility, resolved (if present), and inherited departures; a shared or other element carries those or preflight; no departure is `unattributed` (verdict § 5, § 12). Count each kind. The inherited `tab-size` (8 to 4) on every element is the expected `inherited` population (M3).
     6. The `bootstrap` face is the baseline; no clause reads it alone.
   - **Controls** inside the case, each read once at the project's width:
     - Planted name: adopt a sheet `@layer utilities { .mt-3 { margin-top: 2px } }` under the `tailwindcss` face; clause 1 fails on every `.mt-3` element. Release it.
     - Withheld rule restored: adopt Bootstrap's withheld rule for one shared utility, `.mt-3 { margin-top: 1rem !important }`, unlayered, under the `tailwindcss` face; clause 1 fails on every `.mt-3` element. Release it.
     - The `unexcluded` face read against clause 1: `collapse show` fails with `visibility` (`collapse`), and `svg.bi` reads a preflight `display` (verdict § 5).
     - Stripped curation (copy ruling 8.3): disable the sheet of `style#veneer-tailwindcss`, adopt the record's `recipe` text, delete from the adopted sheet every rule of the `reset` layer whose selector carries `:where(` (the curated copies and restore rows), read, and expect a violation on a curated element (a `card-title` or `modal-title`). Re-enable the sheet and release the adoption in `finally`.
   - **The case.** Title (ruling 8.3): `reads the resolved values under its declared variant and partitions every departure of the tailwindcss face`. It replaces `reads the resolved values under its declared variant and both stylesheet sets` (:826). Keep its timeout (`300_000`). Inside it:
     - Keep the variant reads (viewport, theme, `--bs-body-bg`, body background).
     - Read `TAILWIND_READINGS` under all three faces through `applyFace` and push the rows; delete the `adoptSheet(unexcluded)` block (:936 to :964), because the `unexcluded` face is served.
     - Census per face (verdict § 5): `census.undeclared` under `bootstrap` keeps `TAILWIND_CLASSES`; under `unexcluded` and `tailwindcss` it expects the brief-time Tailwind-face list `['md:flex', 'mt-[1rem]']` plus the shared entries. Measure both Tailwind faces at your first run and report the lists; a list that differs from the brief-time one is reported with its tokens, and you set the expectation to the measured list only when you can name the rule that explains it.
     - Delete the sized-image control (:905 to :917, `img { height: revert }`); verdict § 5 rules it out.
     - Replace the face-invariance assertion (`departures` equal `[]` between the two faces, :920 to :933) with `collectPartition` over both Tailwind faces and the chrome, and push a row per face with the clause counts and the skipped count.
     - Keep the escapes, the contrast subjects, and the contrast control unchanged.

4. **J4 and the paired open engine states case.**
   - **J4** (ruling 8.4): title `J4 compares the three faces through the Stylesheets buttons`. From the `bootstrap` face: read `TAILWIND_READINGS` under `bootstrap`; press `Tailwind without the layer`, wait for its button `pressed=true` and the other two `pressed=false`, wait for the status `Tailwind without the layer, THEME color mode` with the description `the status names the unexcluded face` (`absent: 'Bootstrap only'`), read the `unexcluded` values; press `Tailwind with the layer`, wait with `the status names the tailwindcss face` (`absent: 'Tailwind without the layer'`), read the `tailwindcss` values, journal the click, and place the existing portfolio state `tailwindcss-face` on the region `Tailwind on Bootstrap markup`; press `Bootstrap only`, wait with `the status names the bootstrap face` (`absent: 'Tailwind with the layer'`), and read the `bootstrap` values again. Add no portfolio state.
   - **Paired open engine states** (copy open item 3 ruling): title `compares paired open engine states under the three faces and switches a shown popover`. For each component table of the variant, open the first changing row under each of `bootstrap`, `unexcluded`, and `tailwindcss`, and assert equality over the three faces of the engine's own output only: the `style` attribute of every element in the region and the inserted tip (normalizing `--vn-placement-N` and the tip id as `readOpenShowcase` does), the `data-popper-placement` and `data-bs-popper` attributes, and the `style` attribute of `body` (padding and overflow for the modal and offcanvas). Computed styles are not compared; the partition owns them. The popover branch switches a shown popover through each of the other two faces and keeps the engine's output equal. Keep the hidden reset for modal and offcanvas rows and the timeout (`120_000`). Write the reading as a helper in the showcase section of `/home/user/veneer/tests/setupBrowser.ts`, with a setup case.

5. **The remaining journey and statechart cases** of `/home/user/veneer/tests/app/browser/integration.test.ts`:

   | Case (brief-time line) | Ruling |
   | --- | --- |
   | J1 :165 | Kept title. Amended: `Tailwind with the layer` and `Tailwind without the layer` read `pressed=false`; the contents perception reads the group title `Tailwind` (copy ruling 2.1) where it read `BOOTSTRAP WITH TAILWIND Tailwind on Bootstrap markup` (read the rendered case at launch). Added at width 390 (item 6 of this list): the header reading. |
   | J2 :203 | Title (ruling 8.5) `J2 reaches the skip link, the five header buttons, the contents, and a specimen field by keyboard`. The Tab walk reads `Skip to content`, `Bootstrap only`, `Tailwind without the layer`, `Tailwind with the layer`, `Light`, `Dark`, `Containers`. The reverse walk from the focused theme button grows by one stop: 4 under `light`, 5 under `dark` (measure at launch). |
   | J3 :242 | Kept unchanged. |
   | J4 :311 | Item 4. |
   | J6 :355 | Title (ruling 8.6) `J6 speaks no engine vocabulary under each face`. Visit `unexcluded` and `tailwindcss` after the arrival reading; each page reading contains `LABEL, ` and matches no `LEAKED_VALUES`. |
   | :372, :429 | Kept unchanged. |
   | :599, :638, :712 | Kept unchanged. |
   | :695 `refuses disabled and aria-disabled controls and the fieldset-disabled form` | Kept title. Amended: `readRefusal('button', 'Tailwind with the layer')` and `readRefusal('button', 'Tailwind without the layer')` are `undefined`. |
   | :773 | Item 4. |
   | :826 | Item 3. |
   | :1005 `drives the $family header table through the header buttons` | Kept title (ruling 8.2). Amended: `harness.total`, `STATECHART_ATTRIBUTES.total`, and `STATECHART_ATTRIBUTES.passed` read `table.scenarios.length` (face 9, theme 4, pair 6), not the literal 4. Keep the failure log. |
   | :1069, :1131, :1140 | Kept unchanged. |

   - **The 390 header** (copy ruling 5.5; P4 rerun in U5b's report **(re-read)**): in J1, when `OWN.width` is 390, the three buttons of the `Stylesheets` group share one `getBoundingClientRect().top`, and the group's right edge is at most `innerWidth`; journal each button's width and height and the group box. P4 measured the group 366 px wide and 52 px tall, `Bootstrap only` 90.25 px and `Tailwind without the layer` 144.97 px wide (`/home/user/veneer/tmp/probes/flip2/out/p4.json`); U5b's rerun measured `Tailwind with the layer`.
   - Retire "stylesheet set" in every comment and TSDoc you touch (copy § 7).

6. **The showcase describes of `/home/user/veneer/tests/setupBrowser.test.ts`.** Titles follow copy § 8. Line numbers are from brief time.

   | Case (line) | Ruling |
   | --- | --- |
   | `showcase mount` :235, :261, :289, :305, :320 | Kept. |
   | `component statechart setup` :339 to :626 | Kept; `settles disclosure arrangement at $transition.from when no CSS animation runs` stays as the engine's 2026-10-04 regression. |
   | `traverseFocus` :657, :672, :687 | Kept. |
   | :702 `reads the stylesheet set and color mode the header buttons announce` | Title (ruling 8.10) `reads the face and color mode the header buttons announce`. Amended: three labels; press `Tailwind without the layer` and read `unexcluded`, then `Tailwind with the layer` and `Dark` and read `tailwindcss` and `dark`. |
   | :718 `refuses a pair that announces both or neither, and an absent button` | Title `refuses a face group that announces two faces or none, and an absent button`. Amended: a rendered group with two of the three labels pressed throws; with none pressed throws; the theme and absent-button controls stay. |
   | `parseTheme` :736, `waitForPaint` :747 | Kept. |
   | :762 `select a stylesheet set and a color mode through the header buttons` | Title `select a face and a color mode through the header buttons`. Amended: `applyFace` over the three faces, reading the padding and `.mt-3` witnesses per face. |
   | :784 `refuses a name that selects no theme and a page that renders no button` | Kept title; the absent-button message names `Tailwind with the layer`. |
   | :797 `resolves a specimen figure by its caption title and refuses an absent or doubled one` | Kept title; `Collapse stays visible` becomes `Collapse, a name both systems declare` in the call and the planted twin. |
   | :816 `resolves the narrow value below the md breakpoint and the default value from it` | Kept. |
   | :827 `reads every Tailwind reading the caption claims under both stylesheet sets` | Title `reads every Tailwind reading the caption claims under the three faces`. Amended: three faces at the project's width, plus the 768 reading of item 2 row 23 under each face. |
   | :847 `collects the Bootstrap groups up to the Tailwind group and the contrast subjects` | Kept title. Amended only if `collectBootstrapGroups` changes its assertions: it finds the level-2 heading `Tailwind` (the `GROUPS` title of copy ruling 2.1, written as a literal because the harness imports no app value). |
   | :872 to :978, `collectDepartures` :995, `LEAKED_VALUES` :1050 | Kept. |
   | `statechart tables` :1061 to :1380 | Kept, including :1207 `detects chrome changes outside the specimen sections and restores normalization` (`readShowcaseChrome('bootstrap')`). |
   | :1411 `drives every stylesheet-set and color-mode row through the header buttons` | Title `drives every face and color-mode row through the header buttons`. Amended: the face events read `bootstrap`, `unexcluded`, `tailwindcss` three times in order; the pair `to` list reads the six of item 1; the final `readSelection()` reads `tailwindcss:dark`. |
   | :1441 `names the row whose assertion reads a state the button did not reach` | Kept title. Amended: row 1 (`bootstrap stays bootstrap …`) now reaches `bootstrap`, so the case takes row 2 (`bootstrap becomes unexcluded …`) with `to: 'bootstrap'` and expects the rejection to carry its name. |
   | Added | One case per added exported helper, in the § 8 shape, each with a planted and a removed control: `collectPartition` on a rendered fixture (a planted Tailwind-alone mismatch fails clause 1; the fixture without the shared name reads no violation), and the engine-output reader of item 4. |

7. **`readShowcaseChrome`.** It normalizes the three Stylesheets buttons by `value` (already generic) and writes the status from `FACE_LABELS`. Keep hiding `#tailwindcss` during the reading. The chrome is read under each face and enters the partition (item 3); remove the cross-face chrome equality.

## Unknowns

- The wall time of three faces and the partition: the before reading is 225 s at `43ca8a0` (lanes line 255) and 217.89 s to 226.77 s at `39fd514` (J0c); the partition reads `readSurface(collectBootstrapGroups())` under three faces plus the detached deltas, in four variants.
- Whether P5's scratch-page readings (rows 13 to 17, 20, 22) and the unmeasured row 23 at 1280 and 390 hold on U5b's shipped specimens under the fold unit's sheet.
- Whether clause 5 reads an `unattributed` residual on the page, and which `DepartureCause` kinds exist at launch.
- The census of the two Tailwind faces.
- The reverse-walk count of J2.

## Scope

- **Owned.**
  - The showcase section of `/home/user/veneer/tests/setupBrowser.ts` (lanes § Paths: `buildShowcase`, `buildJourney`, the statecharts and scenarios, `buildComponent` and the component tables, `TAILWIND_READINGS`, the `collect*` and `read*` showcase readings), plus `collectPartition` and its types, added there.
  - The showcase describe blocks of `/home/user/veneer/tests/setupBrowser.test.ts` (every describe except `consumer plugin recorder` and `Bootstrap oracle`).
  - `/home/user/veneer/tests/app/browser/integration.test.ts`.
  - `/home/user/veneer/tmp/units/flip-journeys/**` (create it).
  - `/home/user/veneer/showcase/browser.html`, through `npm run build:showcase` only.
- **Off-limits.**
  - The engine section of `/home/user/veneer/tests/setupBrowser.ts` (the symbols named in Context), `arrangeDisclosureVisibility` and `actOnDisclosureControl` beyond keeping them as they are, and the engine describes of `/home/user/veneer/tests/setupBrowser.test.ts`.
  - `/home/user/veneer/app/**` (U5b's; a needed change is a stop), `/home/user/veneer/src/**`, `/home/user/veneer/tests/integration.test.ts`, `/home/user/veneer/tests/conformance.test.ts`, every `tests/setup*.ts` other than `setupBrowser` (including `/home/user/veneer/tests/setupStyles.ts` and `/home/user/veneer/tests/setup.ts`), every other file under `/home/user/veneer/tests/app/browser/`, `/home/user/veneer/tests/fixtures/**`, `/home/user/veneer/guides/**`, `/home/user/veneer/package.json`, the lockfile, `/home/user/veneer/vite.config.ts`, `/home/user/veneer/configs/**`, `/home/user/veneer/tmp/probes/`.
  - Forbidden operations:
    - npm install, commit, push, any credential, `git stash`, `git add`, `git reset`, `git checkout`, or any destructive command;
    - a tree-wide mutating gate (`npm run lint`, `npm run format`). Format only owned files, with `npx oxfmt --config .oxfmtrc.json --write <files>`, and say which;
    - raising any case's timeout, adding a retry, or changing `JOURNEY_PLACEMENTS` or `COMPONENT_TABLES` to buy time;
    - a second writer: spawn nothing.
- **Tools and limits.** `node`; the `npm run` scripts named here; `npx vitest run --config vite.config.ts --project setup:browser /home/user/veneer/tests/setupBrowser.test.ts -t "<title>"`; `./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --project 'journey:VARIANT*' -t PATTERN` for one variant; `npx oxfmt` on owned files; `sha256sum`; `grep`; `git status --porcelain`; `git diff`; `git show HEAD:<path>`.

## Execution

Do the assignment yourself and spawn nothing. Order:

1. The re-reads and the baseline.
2. The face helpers, `FACE_SCENARIOS`, the pair rows, and `TAILWIND_READINGS`, with their setup cases; `npm run test:setup:browser`.
3. `collectPartition` and the engine-output reader, with their setup cases.
4. The integration cases, iterating one variant at a time.
5. `npm run build`, then the full `npm run test:journey`.
6. The gates, then `npm run build:showcase`.

Fix every failure in owned files before you report.

## Output

Write the final message through the last-message file, with no process diary:

1. Lead with the findings:
   - the 9 face rows and 6 pair rows as the harness ran them, with their pass counts per variant;
   - `TAILWIND_READINGS` as measured: each row's triple at 1280 and 390, the 768 triple of row 23, and every departure from P5;
   - the partition per variant: clause counts, skipped counts, the kind counts of clause 5, and each control's result; the census per face;
   - the paired engine-state equality per table;
   - the 390 header boxes;
   - the journey wall time before (your baseline `Duration`) and after, per project when you read a JSON run, against the 235 s budget;
   - the case list per test file, each marked kept, amended (how), deleted (why), or added;
   - each gate's exit code.
2. Paths: every edited file and the files under `/home/user/veneer/tmp/units/flip-journeys/`.
3. `sha256sum showcase/browser.html` before and after.
4. Anything not run, with the exact error or skip line.
5. The final `git status --porcelain`, with `flip-probe-3`'s entries listed as not yours.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when any of these happens:

- A sandbox write is rejected. Never try another write mechanism.
- A face composition cannot be built from the `recipe` and `unexcluded` texts of `/home/user/veneer/app/browser/recipe.json` and the built sheet, or a reference composition would need the misuse pair.
- A change under `/home/user/veneer/app/` is needed, including a label, id, specimen title, or markup a reading requires.
- A `TAILWIND_READINGS` value departs from item 2 at a width P5 measured, or row 23 departs from `left` at 768.
- Clause 5 of the partition reads an `unattributed` departure on the page.
- A journey case exceeds its configured timeout (its own timeout argument, or Vitest's browser default for J1, J4, and J6).
- A file outside Owned, or the engine section, must change.
- The bootstrap digest `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` changes.

When the full `npm run test:journey` passes but its wall time exceeds 235 s, do not stop and do not cut a claim: report the measured wall time, the per-project spans, and the three longest tests per project; the Orchestrator rules.

Settle ancillary choices yourself and record them: added test titles in the § 8 shape, the `collectPartition` signature and its types, the `readFace` error text, the selection guard, the subject selectors of rows 4, 13, and 17, and the engine-output reader's name.

## Acceptance criteria

Cheapest first; run each one bare, from `/home/user/veneer`.

1. `npm run check`
2. `npm run lint:check`
3. `npm run format:check`
4. `npm run test:setup:browser`
5. `npm run build`, then `npm run build:showcase`; report `sha256sum showcase/browser.html` (expect U5b's digest: no app file changes).
6. `npm run test:journey`: green, the face table at 9 rows in `journey:light-390` and `journey:dark-1280`, and the `Duration` line recorded as the wall time.
7. `npm run test:app:browser`, as an observation.
8. `sha256sum dist/src/bootstrap/index.css` equals `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`.
9. `git diff --check`

## Review evidence

The actual diff, the partition counts and controls, the measured `TAILWIND_READINGS`, the journey wall time before and after, the case table, and `git status --porcelain`.

## Rulings appended before launch

The driver sets these defaults from the evidence; the Orchestrator confirms or replaces each before launch.

- **Launch order.** After U4 (`flip-integration-2`), `flip-sheet-2`, and U5b (`flip-showcase`) are accepted and committed.
- **The partition's form.** The dispatch's delta clauses (1 to 4) carry the assertion; verdict § 5's attribution form survives as clause 5 over the departures the delta clauses do not cover.
- **The `unexcluded` face on bare elements.** Preflight's value where the built sheet declares nothing; Bootstrap's where it does (P5), not preflight's on every longhand.
- **The faces' texts.** `/home/user/veneer/app/browser/recipe.json`, the record the page serves; `/home/user/veneer/tests/fixtures/tailwindcss/recipe.json` is U4's and differs in length.
- **Variants.** The partition case runs in all four journey projects, as the case it replaces does.
- **Journey budget.** 235 s; exceeding it is reported, and only a case timeout is a stop.
- **Cap.** 5400 s.

## Orchestrator rulings appended before launch

- **Unattributed departures in the partition case.** The case applies the probe's exclusions before a departure counts: grid-track geometry (`grid-template-columns`, `grid-template-rows`) and anchor placement (`position-area`) are geometry, excluded; the scrollspy navigation is read in one arranged state (the active target fixed before the reading, the `active` class snapshot recorded beside each `a.nav-link` reading). An `unattributed` departure the exclusions do not cover is a stop (expected none; found: the element, longhand, and both values).
- **Unmeasured `TAILWIND_READINGS` values** (the alignment row at 1280 and 390, every row P5 read on a scratch page) are read live on the built page and pinned from the reading; a value that differs from the copy document's caption is reported with both readings and continues, because the caption is U7's to align; only a value that differs between two runs is a stop.
- **The faces read `app/browser/recipe.json`**, the record the page serves; the fixture record is U3's and U4's.
- **Builds.** `npm run build` then `npm run build:showcase`; the page digest is reported, expected equal to U5b's unless U6's changes reach the page, and nothing is committed.
- **Cost.** The partition case keeps the project coverage of the case it replaces. The report records the journey wall time against the 235 s budget and the peak memory where the runner prints it; an overrun is reported for the Orchestrator's ruling, no timeout is raised, and only a case exceeding its own timeout is a stop.
- **Launch order.** After `flip-integration-2`, `flip-sheet-2`, and `flip-showcase` are accepted and committed, on a clean tree; re-read every marked place then.

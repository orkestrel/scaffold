# J0c brief: bring the journey gate to 235 seconds with every claim proved

## Role and engine

You are the J0c writing lane, engine GPT-6 Astra. You edit three test files in `/home/user/veneer`, measure every phase on this host, run the gates, and commit. You do not push. A separate verifier re-runs the gates after you report.

## Objective

Bring the `npm run test:journey` gate to a wall time at or under 235 seconds on this host, with every claim the suite proves today still proved, in every variant its result depends on. The cuts that follow are the reconciled outcome of five analysis lenses and an adversarial verdict on each proposal.

The projection is a model, not a measurement. It puts the summed test time at about 831 seconds, against 1340.56 seconds at HEAD (`/home/user/.wave/m2-journey.log:13`), and the longest project at about 208.6 seconds. With the measured start offsets of 13.7 to 16.2 seconds, the gate lands near 222 to 225 seconds. About 322 seconds of the cut come from removing or re-pricing measured runs (header placement, J7, J8, and the frozen refusal placement, and the J3 fit). The remaining 192 seconds are modeled. The gate misses 235 seconds when less than about 75 percent of that modeled share lands, so measure every phase and re-plan the placement from measured durations.

## Context

### Checkout and environment

The dispatch named fc4c4a2, but the checkout has moved. Work on the checkout as it stands; never check out fc4c4a2.

- The checkout is `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. HEAD is f53c656, a merge of fc4c4a2 and main (3428455) made on 2026-10-02 at 21:21 UTC (`git log -1 --format=%P f53c656`). The working tree was clean when this brief was written. Every line number in this brief is HEAD's.
- Export the toolchain in every shell before any command: `export PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm_config_prefer_online=true`.
- Run vite and vitest directly through `./node_modules/.bin/vite` and `./node_modules/.bin/vitest`. Run `npm run build` before any journey run: the showcase imports the built sheet `dist/src/bootstrap/index.css` (`app/browser/Showcase.ts:2`), and `dist/` is untracked.
- Wrap every journey run in `flock /home/user/.wave/journey.lock`. The host has a 14,345,035,776-byte memory cap and another lane shares it (`/home/user/.wave/codex/j0b-last.md:39`). Wrap the `test:app:browser` and `test:setup:browser` runs in the same lock, because they launch Chromium too.
- Take scoped runs in the J0b form: the gate command with `--project 'journey:light-1280*'` and `-t '<title fragment>'` appended (`/home/user/.wave/codex/j0b-last.md:56-68`).
- Sample memory for the final gate with `/home/user/veneer/tmp/codex/j0b-measure.ts`, which writes `tmp/codex/<label>-measurement.json`; J0b ran it as `node tmp/codex/j0b-measure.ts LABEL COMMAND…` under the dispatch launcher's cap (`/home/user/.wave/codex/j0b.jsonl`), where `LABEL` names the measurement file. The four-project gate peaked at 9,963,581,440 bytes in J0b (`/home/user/.wave/codex/j0b-last.md:37`).

### Lanes

Two sessions write veneer. `/home/user/.wave/lanes.md` is their contract (a copy of scaffold main `.orkestrel/veneer/lanes.md`); read § Paths and § Rules before editing.

- In `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`, edit only the showcase section (`buildShowcase`, `buildJourney`, the statecharts and scenarios, `buildComponent` and the component tables, `TAILWIND_READINGS`, the `collect*` and `read*` showcase readings, and their describe blocks). The oracle harness (`createOracle`, `runSteps`, `recordTranscript`, `compareTranscripts`, `readTipTranscript`, the departure families and ledgers, the `build*` engine fixtures, `PlacementRecorder`, `buildEnginePlugin`, `buildConflict`) belongs to the engine session; never edit it.
- Never import a value from `app/` into `tests/setupBrowser.ts`; import types only, and pass application values to a helper as arguments, as `buildPairScenarios(FACES, THEMES)` does. Every `src:browser` suite imports the harness, and a value import from `app/` fails all of them.
- Keep the `component statechart setup` block's oracle case (`tests/setupBrowser.test.ts`, "records Bootstrap accepting rapid sibling activations") working; it consumes the engine session's `createOracle`.

### Canon

Read these files completely before editing. The scaffold checkout beside this repository is the authority (`/home/user/veneer/AGENTS.md:11-15`).

- The journey skill `/home/user/scaffold/.agents/skills/orkestrel-journey/SKILL.md` and every file under its `references/` directory: `statechart.md`, `layer.md`, `captures.md`, `decide.md`, `styles.md`, and `recorded.md`.
- The rules `/home/user/scaffold/.claude/rules/tests.md`, `names.md`, `typescript.md`, and `writing.md`.

The skill states no "cheapest variant" rule in its own words; a search of the skill directory for "cheapest" finds nothing. The variant rule this unit applies is the dispatch's: a claim whose result depends on the theme or the viewport keeps a reading in every variant it depends on; a claim that depends on neither runs one time, with a one-line comment saying why (`/home/user/.wave/codex/s1-brief.md:24`). Never replace a reading with a fixed delay (`references/layer.md:103-104`), and never weaken a control.

### Measured baseline

Two full gates exist. The fc4c4a2 gate is the one the dispatch quotes; the f53c656 gate ran at HEAD after the merge, and this brief computes from it. The following table lists both.

| Run | Wall | Summed tests | light-1280 | dark-1280 | light-390 | dark-390 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| fc4c4a2, 2026-10-02 20:37 (`/home/user/.wave/m-journey.log:9`) | 361.14 s | 1364.06 s | 344.92 s, starts +16.20 s | 344.42 s, +11.86 s | 333.05 s, +10.39 s | 341.65 s, +16.19 s |
| f53c656, 2026-10-02 21:28 (`/home/user/.wave/m2-journey.log:13`) | 352.91 s | 1340.56 s | 339.18 s, +13.73 s | 337.43 s, +11.96 s | 334.05 s, +7.23 s | 329.88 s, +13.25 s |

Project spans and start offsets come from each `testResults[]` entry's `startTime` and `endTime` in `/home/user/.wave/m2-journey.json`. Entries map to variants through the component tables each one ran (`tests/setupBrowser.ts:3232-3333`): entry 0 is light-1280, 1 is dark-1280, 2 is light-390, and 3 is dark-390. Each project's span equals its summed test durations, and the gate wall equals the end of the last project to finish. For 235 seconds, every project must end by 235 seconds, so each span must stay at or under about 219 to 221 seconds.

The f53c656 per-test durations, in seconds for light-1280, dark-1280, light-390, and dark-390, are the following.

| Test | light-1280 | dark-1280 | light-390 | dark-390 | Sum |
| --- | ---: | ---: | ---: | ---: | ---: |
| J3 sections | 56.81 | 59.02 | 79.24 | 80.48 | 275.55 |
| Header statechart | 39.22 | 46.09 | 38.98 | 42.19 | 166.48 |
| Matrix | 36.26 | 37.01 | 36.50 | 36.23 | 146.00 |
| J8 live engine | 20.91 | 21.00 | 17.52 | 17.02 | 76.45 |
| J7 native controls | 18.63 | 18.62 | 17.28 | 15.66 | 70.19 |
| J2 keyboard | 8.27 | 10.90 | 9.98 | 8.78 | 37.93 |
| J4, J6, J1, both refusals, portfolio | 13.65 | 17.91 | 12.22 | 14.03 | 57.81 |

The component tables at f53c656, in seconds, are alert 18.40, popover 18.54, carousel 49.33, modal 32.85, and scrollspy-1280 24.32 in light-1280; button 9.97, tab 26.66, dropdown 48.67, offcanvas 24.05, navbar-1280 12.33, and responsive-offcanvas-1280 3.79 in dark-1280; accordion 36.27, toast 26.04, and scrollspy-390 57.04 in light-390; and tooltip 40.14, collapse 16.33, navbar-390 35.97, and responsive-offcanvas-390 20.06 in dark-390 (`/home/user/.wave/m2-journey.json`).

### Mechanics this brief depends on

The following facts drive the design. Each one is read from the installed code at HEAD.

- Every contents click starts a smooth scroll of the root scroller, because the built sheet sets `scroll-behavior: smooth` on `:root` under `prefers-reduced-motion: no-preference` (`dist/src/bootstrap/index.css:191-195`). The sheet carries 31 reduced-motion blocks that set `transition`, `animation`, and spinner speed to their reduced values (`dist/src/bootstrap/index.css:2045-6974`), among them the 0.6-second carousel indicator transition (`dist/src/bootstrap/index.css:6079-6083`).
- The engine reads no motion preference of its own. Its transition wait resolves immediately when the element runs no CSS transition (`src/browser/helpers.ts:889-905`).
- `@orkestrel/test` 0.0.24 publishes `stageMedia`, `releaseMedia`, and the `MEDIA_STAGE` marker name (`node_modules/@orkestrel/test/dist/src/browser/index.js:202, 2853-2915, 2931-2985, 3900`). The `stageMedia` helper re-sends the observed color scheme and forced colors, records the pre-call readings on the root element, and reads the staged query back within a bounded wait. The `releaseMedia` helper restores the recorded readings. With no marker present, `releaseMedia` sends the empty reset that clears every provider override (`index.js:2969-2971`), so call it only while the marker is present.
- Vitest counts `beforeEach` and `afterEach` inside each test's duration (`node_modules/@vitest/runner/dist/chunk-artifact.js:2921, 2948, 3052`).
- Vitest fails a `describe` block that registers no test, because the journey projects do not set `passWithNoTests` (`node_modules/@vitest/runner/dist/chunk-artifact.js:3188-3193`; `vite.config.ts:380-402`). A conditional skip still counts as a test (`chunk-artifact.js:1469-1471`), but a filtered `it.each` over an empty list registers nothing (`chunk-artifact.js:2009-2037`).
- The portfolio test asserts that the proven families equal `FAMILIES` (`tests/app/browser/integration.test.ts:110-116, 777`), and only the header test adds `Statechart` (`integration.test.ts:706`).
- The setup proof asserts an unchanged row in every component table (`tests/setupBrowser.test.ts:338-343`) and pins the family list (`tests/setupBrowser.test.ts:318-337`).

## Do

Work in the phases in order. Commit after each phase is green in its scoped runs. Each item names the change, the claim it keeps and where that claim is proved after it, and the expected saving from the model at f53c656 durations. Each saving reads summed test time first and the effect on project spans second.

### Phase 0: baseline

1. Confirm `git rev-parse HEAD` reads f53c656 and `git status --short` is empty. Run `npm run build`, then one baseline gate with the JSON reporter, as in the following command.

   ```bash
   flock /home/user/.wave/journey.lock ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --reporter=json --outputFile=tmp/codex/j0c-baseline.json
   ```

   Read the four project spans, the start offsets, and every test's duration. Compare them with `/home/user/.wave/m2-journey.json`, and use your own baseline wherever the two disagree by more than 5 percent.

### Phase 1: motion declaration, J3

2. **Declare motion per claim through the published media stage.** This item merges the motion lens's M1, the J3-A mechanism, and the plumbing that items 3, 9, 10, and 12 need.
   - In `tests/setupBrowser.ts`, give the `buildJourney` helper (`tests/setupBrowser.ts:452-457`) a required second parameter `motion: boolean`, the term and polarity the `stageMedia` options use (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts:1800-1807`). If `false`, call `stageMedia({ motion: false })` before `page.viewport` and the mount. If `true`, throw when `matchMedia('(prefers-reduced-motion: reduce)').matches` reads true, so a leaked stage fails the next default-motion test. Write its TSDoc as "If `true`, …; if `false`, …" (`/home/user/scaffold/.claude/rules/typescript.md:85`). A two-valued union such as `'reduce' | 'no-preference'` breaks the binary-switch rule (`/home/user/scaffold/.claude/rules/names.md:119`).
   - Import `stageMedia`, `releaseMedia`, and `MEDIA_STAGE` from `@orkestrel/test/browser`. Write no media helper of your own: a setup export whose job matches an installed export is a defect (`/home/user/scaffold/.claude/rules/tests.md:182`; `references/layer.md:60-63`).
   - In `buildComponent` (`tests/setupBrowser.ts:1224-1232`), remount with the preference the tester reads at that moment, so a remount after an alert dismissal keeps the table's motion.
   - In `tests/app/browser/integration.test.ts`, delete the file-level `beforeEach` build (`integration.test.ts:127-129`). Open every test with `await buildJourney(OWN, MOTION)`, where the second argument is that test's declared motion, and pass the same argument to J2's mid-test rebuild (`integration.test.ts:190`).
   - Extend the `afterEach` hook (`integration.test.ts:131-134`): after `destroyShowcase()`, call `await releaseMedia()` only when `document.documentElement.hasAttribute(MEDIA_STAGE)` reads true.
   - Declare motion as follows. Pass `CAPTURE` to J1, J3, and J4, so capture runs keep default motion in every placed frame and ordinary runs reduce it. Reduced motion stops `.progress-bar-animated` and slows the spinners (`dist/src/bootstrap/index.css:4904-4908, 6169-6174`), so a frame shot under it would picture those sections differently. Pass `false` to J2, J6, J7, both refusal tests, the portfolio test, and the four header tables. Pass `true` to the matrix, because its surface reading records every computed longhand, transitions included (`tests/setupStyles.ts:462-470`). J8 takes `true` in one of its two variants and `false` in the other (item 9). The component tables take `table.motion` (item 12).
   - Prove the parameter in `tests/setupBrowser.test.ts` beside the preparation proof (`tests/setupBrowser.test.ts:129-148`). With `false`, read reduced motion and no running `CSSTransition` on the Depot hours panel after a click on its button with the engine started. With `true`, read one. With `true` while a stage holds, read the refusal. Release in the proof's own cleanup.
   - Claim kept: no claim moves. The stage adds a bounded read-back per reduced test (`index.js:2897-2914`), and every default-motion test refuses a leaked stage.
   - Saving: none. The stage and release cost about 0.1 seconds per reduced test, about +5.3 seconds summed over 53 reduced tests and +1.3 to +1.4 seconds per project. The dark variants also stop waiting out the theme switch's transitions inside each reduced build; the model claims none of that.

3. **Land each contents click without the smooth-scroll animation, and keep one default-motion landing per variant (J3-A with its required changes).**
   - J3 (`integration.test.ts:202-239`) builds with `CAPTURE`, so ordinary runs reduce motion before the mount and capture runs stage nothing.
   - When `CAPTURE` is false, before each contents click from the second section on, assert that the target heading lies outside the upper quarter of the viewport. Under reduced motion the landing poll's first read is the rest position, and this read keeps the poll a false-to-true observation (`SKILL.md:241-243`). At rest the next heading sits at least 239 pixels down at 1280 and 317 pixels down at 390, against quarters of 200 and 211 pixels (`app/browser/factories.ts:531`; `configs/app/vite.journey.config.ts:8-11`). Measure the margin rather than assume it, because the polish commit changed section heights after those frames.
   - Before the last section, Tailwind on Bootstrap markup (`app/browser/constants.ts:529-534`), call `await releaseMedia()` while the marker is present. Then assert that `getComputedStyle(document.documentElement).scrollBehavior` reads `smooth`, take the same outside-the-quarter read, and keep the same 5000-millisecond poll. The preceding section, Live components, paints 817 pixels at 1280 and 486 pixels at 390 (`tmp/captures/states/live-components--light-1280.png` and `--light-390.png` headers), so the last landing starts outside the quarter at both widths.
   - Add one comment at the build: `// The fragment landing reads the same rest position at reduced motion; the last section keeps the default-motion landing in every variant.`
   - Leave the loop body, the 5000-millisecond budget, the overflow-hint reading, and the placements as they are. The `afterEach` release covers a loop that throws.
   - Claim kept: every section is reached through the contents and lands in the upper quarter, read at rest in all four variants. The overflow hint, the placement of 73 states, the rhythm group, and the placement proof stay in all four variants (`integration.test.ts:229-237, 749`; `references/captures.md:95-99`). The default-motion landing stays read in all four variants on the last section. The variant rule keeps J3 in all four variants, because its placements depend on the theme.
   - Saving: the J3-A fit (`/home/user/veneer/tmp/j0b-one-variant.json`, `tmp/j0b-two.json`, `tmp/j0b-four.json`) prices the fixed scroll part at 0.306 seconds per section at 1280 and 0.680 seconds at 390, with a residue of 0.03 to 0.06 seconds. That is −18.8 seconds per 1280 project and −45.4 seconds per 390 project, or −128.4 seconds summed (range 119.8 to 131.4). Expect J3 near 38.0, 40.2, 33.8, and 35.1 seconds before item 4.

4. **Resolve the level-3 headings and the section regions one time per J3 run (J3-B with its required changes).**
   - Declare an exported helper in `tests/setupBrowser.ts` named for the act, such as `indexByName`. It takes a role and role options, resolves the population one time with `page.getByRole(…).elements()`, keys it by `readName`, and returns a lookup that throws when a requested name maps to no element or to more than one. A duplicate J3 never requests stays unrefused. Declaring it in the test file breaks `SKILL.md:220-222`.
   - Prove it in `tests/setupBrowser.test.ts` in three cases: a missing name, a repeated name, and a hidden element left out.
   - Call it twice before the J3 loop, for level-3 headings and for regions, and replace the per-section queries (`integration.test.ts:207-209, 220`). Nothing re-renders headings or sections during J3 (`app/browser/Showcase.ts:84-92, 131-185`).
   - Claim kept: the same role, exact name, and uniqueness per requested title, asserted by the lookup.
   - Saving: 142 whole-document role queries per variant at 14 to 17 milliseconds each, about −2.0 seconds per project and −8.0 seconds summed (range 4.0 to 9.7; the per-query price is a proxy from J2, `/home/user/.wave/codex/j0b-last.md:10`).

5. **Checkpoint.** Run the full gate with the JSON reporter into `tmp/codex/j0c-phase1.json`. Read J3 per variant against item 3's figures, and read J6 per variant against the baseline (2.34, 3.10, 2.33, and 2.51 seconds) as the CPU-contention proxy. Report any J6 rise of more than 15 percent: removing idle scroll time raises the CPU density of four concurrent projects on 4 CPUs (`nproc`), and every later estimate assumes contention near the measured four-project level.

### Phase 2: placement and journey motion

6. **Run the face table in one light and one dark variant, and the theme and pair tables one time each (H1 with its required changes).**
   - Declare in `tests/setupBrowser.ts`, beside `COMPONENT_TABLES`, one frozen string-only placement record with no application import. Its starting entries are face `['light-390', 'dark-1280']`, theme `['light-390']`, and pair `['light-390']`. Item 21 can move them.
   - In `integration.test.ts`, register one test per header table through `it.each` over the three harness descriptors filtered by the record, as the component tables do (`integration.test.ts:711`). Build the descriptor list in the test file, because the pair table needs the application's `FACES` and `THEMES` (`tests/setupBrowser.ts:1131-1132`). Each test keeps the tally assertions of `integration.test.ts:691-701`.
   - Merge the header registration and the component registration into one `describe('showcase statecharts')` block, so no variant meets an empty `describe`.
   - Write these comments. For the face entry: `// Face rows run under the variant's theme, which the status sentence names, so one light and one dark variant run them; no reading takes the width.` For theme and pair: `// Theme rows set the theme from a fresh Bootstrap-face mount and pair rows set both axes; neither reads a width or the variant's theme, so one variant runs each.` Theme rows set only the theme (`tests/setupBrowser.ts:954-956`), so a comment saying they arrange both axes is false.
   - Add `proven.add('Statechart')` to the component-table test after its tally assertions (`integration.test.ts:720-734`). Every variant runs at least three component tables, so the family declaration at `integration.test.ts:777` holds in every variant.
   - Claim kept: the face rows keep a light and a dark reading of the status sentence that names the theme (`tests/setupBrowser.ts:935-951`; `app/browser/Showcase.ts:164-186`). No header reading takes a width: the witness declares no narrow value (`tests/setupBrowser.ts:191-197`), and the click handler has no width input (`app/browser/Showcase.ts:164-186`). The setup project still runs all three tables (`tests/setupBrowser.test.ts:725-750`). Every header button stays clicked in every variant by J1, J2, J4, J6, and the matrix (`integration.test.ts:137-166, 168-200, 241-276, 278-287, 545-546`).
   - Saving: the light set costs about 39.0 seconds plus about 1.8 seconds for two added test mounts, and the dark face table about 12.7 seconds, against 166.48 seconds today. That is about −113.0 seconds summed (range 112.6 to 114.5). The test count goes from one header test per variant to four header tests in the gate.

7. **Reuse the mounted page across header rows and chain the row order (H2 with its required changes).**
   - Export `reuseJourney(variant, motion)` beside `buildJourney`. It returns the mounted showcase, and mounts through `buildJourney` only when nothing is mounted, the rule `buildComponent` applies (`tests/setupBrowser.ts:1220-1259`). Prove both branches in `tests/setupBrowser.test.ts`. Pass it as `build` to the header harnesses.
   - Reorder `FACE_SCENARIOS` (`tests/setupBrowser.ts:994-1039`) to bootstrap stays bootstrap, bootstrap becomes tailwindcss, tailwindcss stays tailwindcss, tailwindcss becomes bootstrap. Reorder `THEME_SCENARIOS` (`tests/setupBrowser.ts:1054-1099`) to light stays light, light becomes dark, dark stays dark, dark becomes light.
   - Keep `buildPairScenarios(faces, themes)` (`tests/setupBrowser.ts:1141-1162`) and derive the chained order inside it from its arguments. Start with the row whose `from` is the arrival pair, `${faces[0]}:${themes[0]}`. Then take the unvisited row whose `from` equals the preceding row's `to`, or else the first unvisited row in faces-outermost order. The resulting order is tailwindcss:dark, bootstrap:light, bootstrap:dark, tailwindcss:light, with one arrange press. Update its TSDoc `@returns` and `@example` (`tests/setupBrowser.ts:1129-1139`).
   - Give the pair rows an arrange that presses only the differing axis, through `arrangeFace` and then `arrangeTheme` (`tests/setupBrowser.ts:925-927, 954-956`).
   - Update the pins at `tests/setupBrowser.test.ts:730-749`: face events bootstrap, tailwindcss, tailwindcss, bootstrap; theme events light, dark, dark, light; pair `to` order as derived; final selection `tailwindcss:light`. Rewrite the control at `tests/setupBrowser.test.ts:752-760` to pick its row by transition, the row whose `from` is `bootstrap` and whose event is `tailwindcss`, so its mutated `to` stays a state the button did not reach.
   - Claim kept: every row keeps its `from`, event, `to`, act, and assert. Each precondition comes from the preceding row's act, which that row's assert has read. Each header table is its own test with its own mount, so the theme rows still run under the Bootstrap face. J1 reads the arrival state of a fresh mount in every variant (`integration.test.ts:137-166`). The reuse mounts no second fixture, so the duplicate-fixture reason of `references/statechart.md:161-162` does not arise. A broken transition can redden later rows in the same table; the harness names every failing row in table order (`references/statechart.md:273-274`), and the first one names the break.
   - Saving: 12 mounts at about 0.9 seconds and 7 restyling plus 4 unchanged arrange presses go from the light set, about −16.7 seconds (range 12.7 to 20.7). The dark face table drops 4 builds at about 1.39 seconds and 2 restyling presses, about −7.0 seconds. Total about −23.7 seconds summed, on the projects that hold the header tables.

8. **Press both header buttons in the pair act without the intermediate settle (H3 with its required changes).**
   - Declare the pair act as a module function beside `actOnFace` and `actOnTheme` (`tests/setupBrowser.ts:930-932, 959-961`). It calls `clickAccessible` on the Stylesheets button the event names, then on the Color mode button. Keep `assertSelection` (`tests/setupBrowser.ts:1123-1126`).
   - Delete `applySelection` (`tests/setupBrowser.ts:1117-1120`), which loses its last caller; `noUnusedLocals` refuses it otherwise (`tsconfig.json:16`).
   - Claim kept: both presses stay in the act, and the assert reads both pressed pairs with their unselected siblings, the status, the padding witness, and the body background after both.
   - Saving: about −1.0 seconds summed (range 0.8 to 1.2), unmeasured.

9. **Run J7, J8, and the frozen-specimen refusal in one theme per width (B2 with its required changes), and give J8 one default-motion reading (M3 with its required changes).**
   - Extend the placement record with one shared entry for J7, J8, and the frozen refusal. Start it at `['dark-1280', 'light-390']`; item 21 can switch it to `['light-1280', 'dark-390']`. Register the three tests filtered by that entry, as item 6 registers the header tables (for one test, an `it.each` over the entry filtered to `VARIANT`), so no skip marker appears: a conditional skip owes a narrow applicability reason (`/home/user/scaffold/.claude/rules/tests.md:41, 44`), and a filtered registration records nothing where the claim keeps no reading.
   - Move J8 into `describe('showcase journeys')` and delete `describe('showcase live components')` (`integration.test.ts:338-484`), so no variant meets an empty `describe`. The frozen refusal stays beside the disabled refusal, which runs in every variant (`integration.test.ts:486-515`).
   - Give the three tests this comment: `// No color mode changes what this reads; each width keeps one reading, in opposite themes.`
   - J8 builds with `true` in light-390 and `false` in dark-1280 until item 21 settles the homes; the default-motion home then goes to the project that measures shortest, as the M3 verdict requires. Its focus-return reading after the backdrop fade (`integration.test.ts:393-398`) depends on neither theme nor width.
   - Keep J6 in all four variants: its page text includes the status sentence that names the theme (`node_modules/@orkestrel/test/dist/src/browser/index.js:962-964`; `app/browser/Showcase.ts:184-185`).
   - Claim kept: each claim keeps one reading per width and one per theme. None reads a color (`integration.test.ts:289-335, 339-483, 498-514`), and the engine reads no color mode. The Journey and Refusal families stay proved in every variant through J1 to J4 and the disabled refusal. In the two variants without them, the variant artifact loses those tests' journal lines (`integration.test.ts:768-770`); no assertion reads them. This retires the property that J0b recorded, that native and engine interactions run in every variant (`/home/user/.wave/codex/j0b-last.md:27`), under the variant rule.
   - Saving: with homes dark-1280 and light-390, −78.9 seconds summed; with light-1280 and dark-390, −81.3 seconds. Reduced motion in J8's reduced home saves about 5.65 seconds and in the frozen refusal about 0.75 seconds per home.

10. **Declare reduced motion for the motion-independent journeys (M3 with its required changes).** Item 2 carries the declarations. The model credits J4 −0.4, J6 −0.3, the header tables about −5.6 seconds across the light set and the dark face table, and the J8 and frozen figures of item 9, about −15.6 seconds summed. Declare motion only at each test's build; no test switches motion mid-run except J3's single release before its last section.

11. **Checkpoint.** Run the full gate into `tmp/codex/j0c-phase2.json`. Expect 60 tests in the gate at this phase: 32 that run in every variant, 6 for J7, J8, and the frozen refusal, 4 header tables, and 18 component tables, with no skip.

### Phase 3: component tables

12. **Run the component tables at reduced motion, and move the motion-dependent rows into tables of their own (M4 with its required changes).**
    - Add a required `motion: boolean` field to `ComponentTable` (`tests/setupBrowser.ts:1194-1199`). The it.each body builds with `table.motion`.
    - Give `scrollspy-390` and `scrollspy-1280` `motion: true`: keyboard scrolling in the overflow region is not shown to follow the emulated preference (`tests/setupBrowser.ts:3093-3113`).
    - Split four tables, each split table with `motion: true` in its parent's variant. `collapse-motion` takes the 8 `{Enter}{Enter}` rows plus 'Depot hours hidden through {Escape}'. `accordion-motion` takes the 24 `{Enter}{Enter}` rows plus 'none through Shipping and delivery {Escape}'. `navbar-390-motion` takes the 2 Field notes `{Enter}{Enter}` rows plus 'Field notes hidden through {Escape}'. `modal-motion` takes 'Open the archive dialog through open:{Enter}{Enter}' and the static dialog's `escape:shown` and `backdrop:shown` rows. Every other table takes `motion: false`. The moved Escape rows give each split table the unchanged row `tests/setupBrowser.test.ts:342` asserts, and `references/statechart.md:39-41` requires.
    - Add the four families to the list at `tests/setupBrowser.test.ts:318-337`.
    - Claim kept: every row stays. The rapid second activation is refused only while `.collapsing` is present (`src/browser/Collapse.ts:79-110`), so the 34 rapid-activation rows of collapse, accordion, and navbar-390, the archive dialog's rapid open, and the static-modal bounce keep their default-motion reading. At reduced motion the collapse rows would fail loudly and the modal row would pass with no meaning, which is why they move. Every other row proves the same state, door, and event order and also reads the engine's immediate-completion path (`src/browser/helpers.ts:905`). Motion is a property of the table, not of the variant, so item 21 can move a table without changing the motion its rows need.
    - Saving: the corrected model credits carousel −19.4 seconds (32 waits on the 0.6-second indicator transition), accordion −12.8, navbar-390 −8.7, modal −7.7, offcanvas −6.2, collapse −5.4, popover −3.0, tab −2.9, responsive-offcanvas-390 −2.8, alert −2.25, navbar-1280 −2.1, toast about −9.8 and tooltip about −2.4 after items 14 and 16, and responsive-offcanvas-1280 −0.3. The Dialog example has no `.fade` (`app/browser/sections/live-components.html:229-236, 264-272`), so the dialog rows of the tooltip and dropdown tables save nothing. The four split tables add four mounts, +4.4 seconds. Net about −81.4 seconds summed.

13. **Chain unchanged rows first in the overlay, popover, button, carousel, and responsive tables (C1 with its required changes).**
    - Add a one-word boolean option to `sequenceComponentScenarios` (`tests/setupBrowser.ts:3210-3229`), documented as "If `true`, …; if `false`, …". With it on, among the rows that continue the preceding row's `to`, the sequencer takes one whose `from` equals its `to` first.
    - Pass it for button, popover, carousel, offcanvas, modal, navbar-390, and responsive-offcanvas-390. Leave dropdown at the default order: its focusing click toggles the menu whenever focus is off the toggle (`tests/setupBrowser.ts:1820-1827`), so the option adds 9 arrange clicks there. Leave accordion and collapse at the default order.
    - Prove the option on a fixed row set in `tests/setupBrowser.test.ts` beside the default expectation (`tests/setupBrowser.test.ts:282-290`), which stays unchanged.
    - Claim kept: no row is added or removed, and every arrange still asserts its from-state.
    - Saving: −31.05 seconds summed at default motion; after item 12 each removed open, close, or toggle costs about one 0.47-second click, so about −17.9 seconds summed: light-1280 −6.6, dark-1280 −4.3, dark-390 −7.0.

14. **Reuse a verified tooltip state between rows (C2 with its required changes).**
    - In `arrangeTooltipVisibility` (`tests/setupBrowser.ts:1952-1962`), skip the Bootstrap only reset and the second show when the row wants `shown` and the trigger already shows its tip through the row's mechanism. For a focused row, focus sits on the trigger and no trigger matches `:hover`; for a hover row, the trigger matches `:hover` and holds no focus. When a focused row's focus sits on an earlier Tooltips trigger and no trigger matches `:hover`, skip the reset and reach the trigger with `traverseAccessibleWithin` instead of a Contents click.
    - Reorder `TOOLTIP_SCENARIOS` (`tests/setupBrowser.ts:2001-2037`): Hint above focus, Escape, and blur; then the Escape rows of right, below, and left; then each trigger's hover, hover again, and leave.
    - In `arrangeDialogHint` (`tests/setupBrowser.ts:2824-2845`), replace the close-and-reopen with a reset inside the open dialog. Press Tab while focus is on Show hint, then read the hint. Click Show hint only when the hint still shows with both focus and pointer off it, because a click on a hint that focus already shows sets the latch. Then assert hidden as today.
    - Re-time the table at HEAD before counting the saving: the merge rewrote the tip lifetimes (774ada3).
    - Claim kept: all 30 rows keep their `from`, event, and `to`, and each arrange still asserts its from-state. A hidden reading after the in-dialog reset implies a released latch.
    - Saving: about −11.0 seconds in the tooltip table's project after item 12 (−18.9 seconds at default motion and fc4c4a2 durations).

15. **Skip a scrollspy arrange when the region already sits where that arrange would put it (C3 with its required changes).**
    - Record the state and `region.scrollTop` that `arrangeScrollspySelection` (`tests/setupBrowser.ts:3093-3113`) produces. Keep the record through an act only when the act is a verified no-op or its own key path equals the target state's arrange.
    - Clear the record at the start of every act, and write it only after the act's checks pass (`tests/setupBrowser.ts:3137-3142`). Clear it in `destroyShowcase` and on every remount, or key it to the region element. Keep the focus branch at `tests/setupBrowser.ts:3095-3099` independent of it. Replace the comment at `tests/setupBrowser.ts:3100-3101` with the skip rule.
    - Claim kept: all 36 rows stay, and each row's from-state is still asserted (`tests/setupBrowser.ts:3112`). A skipped arrange leaves the region at the same boundary through the same approach.
    - Saving: about −14.8 seconds in scrollspy-390 and −5.3 in scrollspy-1280, about −20.1 seconds summed.

16. **Reach keyboard doors by Tab from inside the region (C4 with its required changes).**
    - Move the Contents click and traversal of `arrangeAlertVisibility` (`tests/setupBrowser.ts:1352-1360`) into the alert act for keyboard events, as the toast act does (`tests/setupBrowser.ts:2143-2179`).
    - In both acts, skip the Contents link only when `region.contains(document.activeElement)` and `document.activeElement.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING` both hold; the traversal wraps through the whole document for a target behind focus (`node_modules/@orkestrel/test/dist/src/browser/index.js:877-898`). Prove both branches in `tests/setupBrowser.test.ts`.
    - Reorder `TOAST_SCENARIOS` (`tests/setupBrowser.ts:2181-2253`) as C4 states: upload toast hidden show:click; shown show:click, show:{Enter}, show:Space, escape, and dismiss:{Enter}; hidden escape; hidden show:{Enter}; shown dismiss:Space; hidden show:Space; shown dismiss:click. Live toast: hidden show:click; shown show:click, escape, and dismiss:click; hidden escape. Dismiss-only toasts: the four escape rows, then the four dismiss clicks.
    - Claim kept: every keyboard door still reaches its control by forward Tab traversal (`SKILL.md:238`), and every arrange keeps its from-state assertion.
    - Saving: toast navigations fall from 12 to 4 and alert navigations from 6 to 4. After item 12, about −3.2 seconds in toast and −2.0 in alert, −5.2 seconds summed.

17. **Restore a dropdown to hidden with Escape after the focusing click (C5).** In `arrangeDropdownExpansion` (`tests/setupBrowser.ts:1820-1827`), when the menu reads expanded and the row wants it hidden, press `{Escape}` through `pressKeys` instead of a second click. Press it only while the menu reads expanded: the engine stops the keydown for a visible menu (`src/browser/plugins.ts:155-160`), and a hidden menu's Escape reaches the dialog. Claim kept: only the arrange changes, and `assertDropdownExpansion` verifies hidden. Saving: 13 restores at about 0.25 seconds, about −2.9 seconds in dropdown.

18. **Keep only the availability rows at 1280 for the navbar and the drawer (C9, with one added row per table).**
    - At 1280, keep the Field notes click pair, the xxl navbar click pair, and the xxl drawer's `open:click` and `0:click` (`tests/setupBrowser.ts:2963-3027`). Also keep 'Field notes hidden through {Escape}' in navbar-1280 and the xxl drawer's `escape:hidden` row in responsive-offcanvas-1280: without them both tables fail the unchanged-row assertion (`tests/setupBrowser.test.ts:342`). The C9 verdict did not catch this.
    - Place this comment beside the width filter (`tests/setupBrowser.ts:3301-3332`): `// Field notes carries no navbar-expand class and 1280 sits under the xxl breakpoint, so 1280 keeps availability and 390 keeps every door.` The fact behind it is `app/browser/sections/navbar.html:75`.
    - Claim kept: availability at 1280 for every toggler that renders there, and every keyboard, Escape, rapid-Enter, hidden-Escape, and Tab-containment row at 390 on the same specimens. The table rows go from 564 to 554.
    - Saving: about −5.7 seconds in dark-1280, less about 1.0 seconds for the two kept rows, −4.7 seconds summed.

19. **Scope the carousel image reading to the slide (C6 with its required change).** In `assertCarouselSelection` (`tests/setupBrowser.ts:2284-2312`), replace the page-wide image query at `tests/setupBrowser.ts:2305-2309` with `page.elementLocator(slide).getByRole('img', { name: sentence, exact: true })` (`node_modules/@vitest/browser/context.d.ts:849`), and keep the rendered check. Claim kept: the same role, name, exactness, rendered check, and slide; the name Green hills belongs to two images (`app/browser/sections/carousel.html:44, 107`), and the slide still picks one. Saving: credit 0 seconds until a `performance.now()` reading in the scoped carousel run measures the 92 scans.

20. **Checkpoint.** Run each changed table green in a scoped run in its variant, then the full gate into `tmp/codex/j0c-phase3.json`. Expect 64 tests: phase 2's 60 plus the four split tables.

### Phase 4: placement

21. **Rebalance from measured durations (J3-C, M5, and C10, merged).** J3's cut is 2.4 times larger at 390 than at 1280, so without moves the 1280 projects become the long pole: the model puts light-1280 near 227 seconds, about 241 to 243 seconds of wall.
    - From phase 3's per-test durations, choose the fewest moves that bring every projected span to 218 seconds or less. Moves can change the variant of an invariant component table, a header table within its theme constraint, and the shared J7, J8, and frozen homes (one pair per width in opposite themes). J8's default-motion home moves with that pair.
    - Keep modal, offcanvas, and modal-motion at 1280: `clickDialogBackdrop` refuses a dialog with no backdrop point outside its panel (`tests/setupBrowser.ts:2463-2491`). Keep scrollspy, navbar, and responsive-offcanvas tables at their widths, moving only between themes.
    - Before landing a move to a width a table has never run at, run that table green in a scoped run in its destination variant and record its duration. The carousel captions are `d-none d-md-block` (`app/browser/sections/carousel.html:35`), so the table reads the image names there.
    - Rewrite the placement comment at `tests/setupBrowser.ts:3233` as one line naming the balance it keeps and the measuring run.
    - The model's one-move candidate is the following placement. Homes for J7, J8, and the frozen refusal are light-1280 and dark-390, with J8's default motion in dark-390. Face runs in light-390 and dark-1280, theme in light-390, and pair in light-1280. Carousel moves from light-1280 to light-390. Its projected spans are light-1280 208.5, dark-1280 208.6, light-390 208.5, and dark-390 205.0 seconds.
    - Saving: none summed. The longest project falls from about 227 to about 208.6 seconds in the model.

22. **Conditional: end each scrollspy press on `scrollend` (C7 with its required changes).** Take this step only when the measured gate after item 21 exceeds 235 seconds and a project holding a scrollspy table is the long pole. First write a probe that fails first and shows that headless Chromium fires `scrollend` for keyboard scrolls in the Live examples region at HEAD. Then attach the listener before `pressKeys` in `scrollComponentTo` and in the act (`tests/setupBrowser.ts:3053-3072, 3115-3146`), yield with `waitForFrame` twice after `scrollend`, keep the eight-reading poll as the bound, and keep the full settle for the Escape check. Record per-press times before and after. Credit 0 seconds until measured.

### Phase 5: controls

23. **Mutate each changed assertion class, read the red, restore, and read the green** (`SKILL.md:336-349`). Run each in a scoped run, and record the failing excerpt and the restored result.
    - Pair act omitted in the pair table: all four pair names appear in `harness.failures` (`/home/user/.wave/codex/r1-last.md:20`).
    - Face act omitted: the face rows that change state go red.
    - J3's release before the last section omitted: the `scrollBehavior` assertion goes red.
    - `collapse-motion` built with `false`: its rows go red, which proves the split carries the default-motion reading.
    - A setup proof of `indexByName` with a duplicated name: the lookup refuses.

## Gates

Run each gate bare, after the last commit's tree is final, and read its exit code. Run them in the following order.

1. `npm run format:check`
2. `npm run lint:check`
3. `npm run check`
4. `flock /home/user/.wave/journey.lock npm run test:app:browser`
4a. `flock /home/user/.wave/journey.lock npm run test:src:browser`: every failure must be one of the five host-bound Chromium 141 cases, `Placement.test.ts` at lines 262, 478, and 769 (`'Popover'-'scroll'` and `'Popover'-'transform'`) and `Tip.test.ts` at line 544; any other failure blocks the commit.
5. `flock /home/user/.wave/journey.lock npm run test:setup:browser`
6. `npm run build`, then the journey gate with the JSON reporter, under the memory sampler, as in the following command. Report the per-project spans and start offsets from the JSON, the wall from the reporter's Duration line, and the peak bytes.

   ```bash
   flock /home/user/.wave/journey.lock node tmp/codex/j0b-measure.ts j0c-gate ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --reporter=json --outputFile=tmp/codex/j0c-gate.json
   ```

7. `CAPTURE=1 flock /home/user/.wave/journey.lock npm run test:journey`, then compare `find tmp/captures/states -name '*.png' | sort` with `/home/user/veneer/tmp/j0b-after-captures.txt`: 304 files, none missing, none extra.
8. `npm run test:policy`

The journey gate passes at 64 tests, 0 skipped, with the wall at or under 235 seconds. Report the measured wall whatever it reads.

## Commit

Commit one time per phase after its scoped runs are green, in the repository's message style. End each message with these two trailer lines.

```text
Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_017fwYCgxCd9JhL43kVBLBJV
```

- Never push.
- Edit only `tests/app/browser/integration.test.ts`, `tests/setupBrowser.ts`, and `tests/setupBrowser.test.ts`. Write measurements under `tmp/codex/`, which git ignores (`.gitignore:11`).
- Never edit `src/browser/`, which belongs to another session, the scaffold-owned `vite.config.ts`, `configs/`, or `app/browser/`. No cut in this brief needs a page change.
- Install nothing and fetch nothing beyond what the PATH export's registry setting resolves.

## Output

End with one message that the dispatcher reads as your report. It holds the following parts.

- The commit hashes, one per phase, and `git status --short` after the last.
- A table of per-project spans and start offsets for the baseline and every checkpoint, and the gate wall for each.
- A table of per-test durations before and after for every changed test and table, beside this brief's predicted figure.
- The J6 contention reading at each checkpoint, and the memory peak of the final gate.
- The placement item 21 chose, with the measured spans it was chosen from and the scoped runs behind each move.
- The gates table with each exit code and its result line.
- The capture comparison: 304 before, the count after, missing, and extra.
- Each control of item 23 with its red excerpt and its green result.
- Every deviation under the following contract.

## Deviation contract

These rules govern every departure from this brief.

- When a step cannot keep its claim as written, keep the claim, drop the step, and report the step, the claim, and the evidence. Never weaken an assertion, a control, or a family declaration to make a step pass.
- When a step's measured saving falls under half its predicted figure, keep it if it is claim-neutral, and report the measured figure.
- When a reading needs a wait, use a published wait, an event, or `waitForFrame`. Never add a fixed delay.
- When a line number in this brief no longer matches, re-anchor on the named symbol and report the shift.
- When the final gate exceeds 235 seconds after items 21 and 22, stop cutting. Report the measured spans, the remaining gap per project, and the three largest tests per project; propose no claim cut in code.
- When a verdict-level conflict appears that this brief does not settle, stop that step and report it rather than choose.

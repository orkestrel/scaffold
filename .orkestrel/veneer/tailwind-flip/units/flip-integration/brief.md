# Unit flip-integration (U4): the Chromium integration proofs of the flipped recipe

## Role and engine

astra on GPT-6 Astra (effort high), run as `codex exec` at `danger-full-access`. Executor: BENCH_ENGINE. You are the only writer of tracked files in `/home/user/veneer`. Another unit, `flip-probe-3`, may still write `/home/user/veneer/tmp/probes/flip4/**` while you run. Its files may appear in `git status --porcelain`: list them and change none. Every path in this brief is absolute, or it names a file under `/home/user/veneer` in prose.

## Objective

Implement unit U4 of the Tailwind flip in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. U2 is committed as `bae9a1b` (the tuned sheet is built). U3 `flip-records` was accepted before this launch. Your work:

- Rewrite the three Tailwind describes of `/home/user/veneer/tests/integration.test.ts` and their import blocks so that they prove the three faces in Chromium.
- Regenerate `/home/user/veneer/tests/fixtures/tailwindcss/preflight.json` on this host, with a `chromium` field, using a writer.
- Re-derive `/home/user/veneer/tests/fixtures/tailwindcss/incompatible.json` under the raw composition, and regenerate it only if it differs.
- Add the instruments those cases need to `/home/user/veneer/tests/setupStyles.ts`, each with a case in `/home/user/veneer/tests/setupStyles.test.ts`.

Commit nothing.

## Context

- **Re-read at launch (U3's output).** This brief describes the checkout as it stood while U3 ran, plus the changes U3 declared. Before editing, read these files as U3 left them:
  - `/home/user/scaffold/tmp/codex/flip-records-last.md` (U3's report).
  - `/home/user/veneer/tests/setupServer.ts`.
  - `/home/user/veneer/tests/setup.ts`.
  - The `Tailwind compatibility recipe` describe of `/home/user/veneer/tests/conformance.test.ts`.
  - `git log --oneline -3`.

  U3 declared these changes:
  - It regenerates both `recipe.json` records, keeping their shape and key order.
  - It adds `collectUtilityClasses` and an unexcluded-compile helper to `/home/user/veneer/tests/setupServer.ts`. At brief time the helper read as `compileUnexcluded(candidates)` at :1000. Name it by what you read.
  - It deletes `collectMirror`, `readExemptions`, `MirrorFrame`, and their proofs.
  - `RecipeRecord` and `isRecipeRecord` stay in `/home/user/veneer/tests/setup.ts`.

  Never re-add a deleted helper, and never write a local twin of one. Every place below marked **(re-read)** depends on what U3 left.

- **Evidence.** Read these in order before editing:
  1. `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md`. This file governs. Where it conflicts with the proposal, the verdict wins, and § 12 and § 13 override earlier text in it. Read:
     - § 6 Records and proofs, all of it. This unit owns the record case, the witness case, the regeneration with `chromium: 141`, the incompatible re-derivation, the inverted restored clause, the disjoint-layers amendments, the misuse case, and "The three preflight titles leave the host-bound set".
     - § 8 item 4 (this unit and its acceptance) and item 9 (the landing rule: "the three preflight titles pass").
     - § 2 "What a consumer reads", the table with three face columns.
     - § 3, derivation pin 4 (the Chromium form).
     - § 10 items 6, 11, and 13.
     - § 12, the bullets on § 6 and § 3 pin 4.
     - § 13 P2 and P6.
  2. `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design/proposal-consumer-proof.md` § 6. Read the Records table (the `incompatible.json` and `preflight.json` rows), the `/home/user/veneer/tests/integration.test.ts` case table (the list the verdict amends), § "Preflight rows on either host", and § Regeneration path.
  3. `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements.md`:
     - M1: an unlayered `!important` beats a layered normal declaration in both orders. This is why the misuse composition reads 16px.
     - M2: B equals D on 2594 rows. C moves 198 more rows. Record agreement is 2568 of 2598. 14 rows differ, all form-control metrics. 16 rows name `row-rule-color`. 12 movers have no record row (`html` font-family on 4 subjects, `table` border colors on 8).
     - M6, last paragraph: inlining keeps 8093 of 8094 flattened rows; the merged `.dropstart .dropdown-toggle::after` pair; the empty `@layer bootstrap {}` blocks written as statements.
  4. `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements/m2-bare.md`:
     - § 4: the 14 differing rows and the 12 unrecorded movers, each in a table.
     - § 6 Typography witnesses: Chromium 141.0.7390.37 at 1280x720, with condition A as the lifted sheet alone, B as unexcluded then lifted, and C as flipped with the reboot in `reset`.
  5. The host-bound set: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md` § Host-bound set (line 54 names the three `integration` titles) and the "Landing rule for this lane" bullet (line 94). Read `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/status.md` line 58 too. Read only; you edit neither file.
  6. Current code. Read every named item before editing:
     - `/home/user/veneer/tests/integration.test.ts` (729 lines at brief time). The ruling for each describe and case is in Implementation item 9.
     - `/home/user/veneer/tests/setupStyles.ts`. The instruments, by line at brief time:
       - `restrictSelector` :16, `matchesConditions` :77, `attributeDeparture` :104, `collectSheetClasses` :239.
       - `readSequences` :312, `adoptSheet` :471, `scanSheetRules` :494 (each rule with its `context` and `layer`), `readLayerNames` :539.
       - `flattenRules` :563. It merges adjacent rules with equal selectors and contexts, which would hide the M6 merge.
       - `readPlacement` :592 (no context or value).
       - `collectElementNames` :647, `collectPreflightPseudos` :675, `readLonghands` :698, `isExposed` :719, `createPreflightFrame` :754 (an iframe at 1280x720).
       - `collectPreflightRows(lifted, preflight, census = lifted)` :784. It reads lifted alone against lifted plus `@layer base { preflight }`.
       - `readPreflightValues` :846, `mountPreflightElement` :878.
       - `readClassLonghands(names, widths, sheets)` :900. Sheets are taken in adoption order.
       - `deriveClassRelationship` :961, `deriveClassDelta` :996, `deriveIncompatibleRows(alone, unexcluded)` :1018, `collectLayerClasses` :1052.
     - `/home/user/veneer/tests/setupStyles.test.ts`: the describes `CSSOM instruments` (:34), `preflight instruments` (:480), and `class relationship instruments` (:592).
     - `/home/user/veneer/tests/setup.ts`, read only:
       - `SHEET_LAYERS` :324. U2 already lists `['reset', 'bootstrap']` at index 1 for the tuned sheet.
       - `LAYER_ORDER` :926, `LAYER_STATEMENT` :940.
       - `PreflightRow` :1580, `PreflightBinding` :1589, `PreflightRecord` :1602, `isPreflightRecord` :1617, `readPreflight` :1685, `PREFLIGHT_SAMPLE` :1699.
       - `RecipeRecord` :1959, `IncompatibleRow` :2016, `IncompatibleRecord` :2025, `RELATION_WIDTHS` :2031 (19 widths), `isIncompatibleRecord` :2045, `readCuration` :2132.

       **(re-read)** U3 moves these lines.
     - `/home/user/veneer/tests/setupServer.ts` **(re-read)**: `RECIPE_INPUT` (:951 at brief time), `TAILWIND_SHEET_PATH` (:960), `compileRecipe` (:974), the unexcluded helper (:1000), `readRecipe` (:1017), and `collectUtilityClasses`. These are Node helpers. The `integration` project does not load this file (see the next item). The faces reach your cases as the record's text, never through a compile in the browser.
     - `/home/user/veneer/vite.config.ts`:
       - `sheetProject(name, override)` :157. It is a Chromium browser project through `@vitest/browser-playwright`, headless, `isolate: false`, `fileParallelism: false`, with `setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts', './tests/setupStyles.ts']`.
       - `integration(override)` :576. It sets `include: ['tests/integration.test.ts']` over `sheetProject('integration', …)`.
       - `mergeOverride` :85 uses Vite's `mergeConfig`, which concatenates arrays.
       - The Chromium path comes from `/home/user/veneer/configs/browsers.ts` through `resolveBrowser(resolvePinnedBrowser(), …)` (:23).
     - Records:
       - `/home/user/veneer/tests/fixtures/tailwindcss/preflight.json`. Keys in order: `tailwindcss` {`version` 4.3.3, `integrity`, `digest` `b14eb13f…`}, `bootstrap` {`version` 5.3.8, `digest` `4a50207b…`}, `elements` (61), `pseudos` (20), `rows` (2598). Each row is {`element`, `pseudo`?, `longhand`, `alone`, `preflight`}, sorted by element, pseudo, and longhand, with `alone` never equal to `preflight`. The record was written in Chromium 153, with no writer in the tree (commit `270f381`). The bytes equal `JSON.stringify(record, null, '\t') + '\n'`. SHA-256 `50227e6e…`.
       - `/home/user/veneer/tests/fixtures/tailwindcss/incompatible.json`. Keys: `bootstrap`, `tailwindcss`, `widths` (equal to `RELATION_WIDTHS`), `rows` (2326 over 20 names). Each row is {`name`, `longhand`, `width`, `alone`, `unexcluded`}, as `deriveIncompatibleRows` returns them. The record was written by commit `c71f20f` with no writer in the tree. The bytes are the tab serialization after `oxfmt` (the `widths` array is wrapped), so they do not equal the bare `JSON.stringify` output. SHA-256 `ae0c20e3…`.
       - `/home/user/veneer/tests/fixtures/tailwindcss/recipe.json` **(re-read)**: `recipe` and `unexcluded`, as regenerated by U3.
       - `/home/user/veneer/tests/fixtures/tailwindcss/comparison.json`: `shared` holds 209 names (192 utilities and 17 components; the 17 are listed in m2-bare.md, line 5).
     - Other readers of your records, which must keep passing:
       - `/home/user/veneer/tests/setup.test.ts` :948 to :1030. `readPreflight(preflightRecord, …)` runs against the regenerated record.
       - `/home/user/veneer/tests/setup.test.ts` :1208 to :1258. `isIncompatibleRecord(incompatibleRecord)`.

       The guard accepts an extra key, so a `chromium` field passes it without any edit to `/home/user/veneer/tests/setup.ts`.
     - Sheets:
       - `/home/user/veneer/dist/src/bootstrap/index.css` (the lifted sheet). SHA-256 `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`.
       - `/home/user/veneer/dist/src/tailwindcss/index.css` (the tuned sheet). SHA-256 `f24045107a…`, 392794 bytes. It holds the order statement at line 2, Bootstrap's `:root` block, the `@source not inline` statement at line 185, and `@layer reset {` from line 186.
       - The flipped source: `/home/user/veneer/src/tailwindcss/_tokens.scss` and `/home/user/veneer/src/tailwindcss/index.scss` (read only).
     - Tailwind's spacing: `/home/user/veneer/node_modules/tailwindcss/theme.css` :325 `--spacing: 0.25rem`. The unexcluded compile emits `.mt-3 { margin-top: calc(var(--spacing) * 3); }`, which is 0.75rem, or 12px at a 16px root.
     - `/home/user/veneer/app/browser/constants.ts`: `TAILWIND_CLASSES` (:1208, 14 names). `CLASS_NAMES` comes from `@src/core`. Read only.
     - `/home/user/veneer/tests/setupBrowser.ts` belongs to U6 (`TAILWIND_READINGS` :213, `FACE_SCENARIOS`, `collectPartition`, `readShowcaseChrome`). Read only. Import nothing new from it and change nothing in it.
- **Law.**
  - `/home/user/scaffold/AGENTS.md`, the non-negotiables: no `any`, no `as` (beyond `as const`), no `!`, no `@ts-*`, lint-disable, or formatter-ignore directives, no new npm package, and no mocks. Scripts are TypeScript run by Node importing only `node:` modules, which is why a writer is a Vitest case. Interface properties are readonly, types come before implementation, there are no nested functions, and helpers are named `{verb}{Noun}`.
  - `/home/user/scaffold/.claude/rules/tests.md`: one behavior per case, planted and removed controls, and shared infrastructure with TSDoc in `setup*.ts`.
  - `/home/user/scaffold/.claude/rules/typescript.md`: every exported helper carries the TSDoc contract (a summary, `@param` with defaults, `@returns`, `@throws`, `@remarks` where needed, and a runnable `@example`).
  - `/home/user/scaffold/.claude/rules/writing.md`: plain present-tense prose and titles.
  - `/home/user/scaffold/.claude/rules/styles.md`: the Tailwind sections.
  - The lane: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md` § "Paths this lane writes".
- **Installed primitives.** In `/home/user/veneer/node_modules`: `vitest` with the Vitest browser module (`page`, `commands.readFile`, `commands.writeFile`; `/home/user/veneer/tests/app/browser/integration.test.ts` :47 and :1152 use them), `@orkestrel/test` (`requireValue`, `createTeardown`), `@orkestrel/test/browser` (`readStyle`, `render`), and `tailwindcss` 4.3.3. Reuse the instruments listed above. A local twin of an existing reader is a defect.
- **Host.**
  - Linux POSIX. Run from `/home/user/veneer`, with `/home/user/.wave/npm11/node_modules/.bin` first on `PATH` (npm 11).
  - Chromium 141.0.7390.37 under Playwright, per `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md` line 50 and m2-bare.md line 3. The browser projects already run on this host.
  - Sandbox `danger-full-access`: no network, installs, or commits.
  - A nested `git` may report "not a git repository". Do not diagnose that; your own `git status --porcelain` is the authority.
  - `/home/user/veneer/tmp/` is ignored. Create `/home/user/veneer/tmp/units/flip-integration/`.
- **Standing conditions.**
  - At start, `git status --porcelain` shows whatever U3 left uncommitted, if anything, plus `flip-probe-3`'s ignored files. Record the list. None of those entries is yours.
  - Baseline before any edit:
    - `sha256sum` of both sheets and of `preflight.json`, `incompatible.json`, and `recipe.json`.
    - One `npm run test:integration` run. Record every failing title. At brief time the expected failures are:
      - The three host-bound titles.
      - Every case that reads `compatibility` as a thin sheet: the tuned sheet now carries Bootstrap.
      - Every case that reads `recipeRecord.recipe` beside `built` as the recipe composition.

## Implementation

Each item can be checked against its acceptance.

1. **The faces and how the `integration` project builds them.** Verdict § 2 names three faces, § 5 gives their order, and § 10 item 6 the misuse:

   | Face | Composition | Text in the cases |
   | --- | --- | --- |
   | `bootstrap` ("Bootstrap only") | the lifted sheet alone | `[built]`; `built` is `/home/user/veneer/dist/src/bootstrap/index.css` imported `?raw` (integration.test.ts :5) |
   | `unexcluded` ("Tailwind without the layer"), also called the raw composition | the plain Tailwind compile of `RECIPE_INPUT` without its Veneer import, over the record's candidates, beside the lifted sheet | `recipeRecord.unexcluded` and `built`; verdict § 6 writes `[built, unexcluded]` |
   | `tailwindcss` ("Tailwind with the layer") | the recipe compile alone, which inlines the tuned sheet | `[recipeRecord.recipe]` alone |
   | misuse (refused, pinned) | the bootstrap export (./bootstrap) linked beside the recipe | `[built, recipeRecord.recipe]` |
   | preflight-only (witness reference) | the unexcluded compile with no Bootstrap | `[recipeRecord.unexcluded]` |

   Notes on the table:
   - The `unexcluded` face places the compile before the Bootstrap sheet in the showcase (verdict § 5) and in M2's condition B.
   - The project runs in Chromium and does not load `/home/user/veneer/tests/setupServer.ts`. The texts therefore come from `/home/user/veneer/tests/fixtures/tailwindcss/recipe.json` (`import recipeRecord from './fixtures/tailwindcss/recipe.json'`, `/home/user/veneer/tests/integration.test.ts` :382). That record is written by U3's writers through `compileRecipe` (the `recipe` field) and U3's unexcluded helper (the `unexcluded` field) **(re-read the helper name)**.
   - The tuned sheet alone is `compatibility` (`/home/user/veneer/dist/src/tailwindcss/index.css?raw`, :381). Rename the binding to `tuned`, because it is no longer a compatibility sheet.
   - Sheets are adopted with `adoptSheet` or passed in order to `readClassLonghands`. The bare-element proofs use `createPreflightFrame` and `readLonghands`.
   - Every case that today reads `built + '\n' + recipeRecord.recipe` as "the recipe" now reads the misuse composition. Rewrite each one onto the face its ruling names.
   - Every three-sheet `[built, recipeRecord.unexcluded, compatibility]` "exposed" reading becomes `[built, recipeRecord.unexcluded]`.
   - Measure once, in the record case or a scratch run, whether `[recipeRecord.unexcluded, built]` reads the same as `[built, recipeRecord.unexcluded]` on the incompatible names. Report the result. The pin keeps the verdict's order.
2. **The preflight record case.** It replaces `pins the live moved rows in both directions with planted and removed controls` (:324), per verdict § 6 and § 12.
   - **Shape after the flip.** Keys in order: `tailwindcss`, `bootstrap`, `chromium` (an integer, the major version of the Chromium that wrote the rows), `elements`, `pseudos`, `rows`. The row shape is unchanged.
     - `PreflightRecord` and `isPreflightRecord` in `/home/user/veneer/tests/setup.ts` stay as they are. That file is off-limits, and the guard already accepts the extra key.
     - The case reads `chromium` from the JSON import and checks it with `Number.isSafeInteger`.
     - If typing or guarding the field requires a `/home/user/veneer/tests/setup.ts` edit, stop.
   - **The live major.** Add a `{verb}{Noun}` instrument (for example `readChromiumMajor()`) that reads the major live from `navigator.userAgent` (the `Chrome/<major>.` or `HeadlessChrome/<major>.` token). It throws when no token is found.
     - Its `setupStyles.test.ts` case reads an integer at least 100 and refuses a planted user-agent string through a parameter.
     - On this host it must read `141`. If it reads anything else, or cannot be read, stop.
   - **The version gate.**
     - When `readChromiumMajor()` equals `preflightRecord.chromium`: `collectPreflightRows(built, preflight, reboot)` equals `preflightRecord.rows` in both directions, as :328 to :337 do today.
     - Otherwise, apply the portable subset, exactly as verdict § 6 states:
       - Every record row whose longhand the host enumerates, and whose element is not `button`, `input`, `select`, or `textarea`, reproduces both ways. That is, a live row with the same element, pseudo, and longhand exists, with equal `alone` and `preflight` values.
       - Every skipped record row either names a longhand the host does not enumerate, or sits on one of those four elements (host or pseudo).
       - Every live mover without a record row sits on `html`, `table`, or those four elements.
       - Implement the subset as a pure instrument over (record rows, live rows, enumerated longhands), for example `selectPortableRows` or `partitionPreflightRows`. Read the enumerated longhands as the keys of `readLonghands` on a mounted element. Do not hard-code a list.
     - Run both branches on this host. The equality branch runs against the regenerated record. The portable branch also runs, unconditionally, against the same record, so it is exercised where the majors match.
     - As evidence, report the portable instrument run against the pre-regeneration record (`git show HEAD:tests/fixtures/tailwindcss/preflight.json`). It must pass. Per M2 § 4, the skipped rows are the 14 form-control rows and the 16 `row-rule-color` rows, and the 12 unrecorded movers sit on `html` and `table`.
   - **Controls.** Both run in the case:
     - A planted row `{ element: 'div', longhand: 'opacity', alone: '1', preflight: '.5' }` fails both branches.
     - Deleting preflight's `base` block from the live composition fails both branches. Delete the `CSSLayerBlockRule` named `base` and read again; alternatively, pass a preflight text that is empty.
   - **The element and pseudo lists.** `preflightRecord.elements` equals `collectElementNames(reboot + '\n' + preflight)` and `preflightRecord.pseudos` equals `collectPreflightPseudos(preflight)`, as today at :326 and :327. Keep both checks.
   - **The composition clause.** This is the "composition proofs over the three faces" in § 6, which replaces the deleted case :648. Every reproducible record row reads:
     - its `alone` value under `[built]`;
     - its `preflight` value under `[built, recipeRecord.unexcluded]`, because M2 found B equal to D;
     - its `preflight` value under `[recipeRecord.recipe]` alone.

     Read the values with `readPreflightValues` or the frame instruments. The control: deleting the recipe's preflight `base` block makes some row stop reading its `preflight` value.
   - **The writer.** Create `/home/user/veneer/tmp/units/flip-integration/preflight-record.test.ts`, one Vitest case.
     - It builds the record:
       - `tailwindcss` and `bootstrap` bindings equal to the current record's;
       - `chromium` set to `readChromiumMajor()`;
       - `elements` set to `collectElementNames(reboot + '\n' + preflight)`;
       - `pseudos` set to `collectPreflightPseudos(preflight)`;
       - `rows` set to `collectPreflightRows(built, preflight, reboot)`.
     - It serializes as `JSON.stringify(record, null, '\t') + '\n'`.
     - It reads the current file with `commands.readFile` and writes with `commands.writeFile` only when the bytes differ.
     - Before the first write, check where a relative path resolves. Vitest resolves `commands` paths against the test file or the project root: confirm which with a read of a known file, and use the form that lands on `/home/user/veneer/tests/fixtures/tailwindcss/preflight.json`.
     - Predicted on this host: `chromium: 141` and 2594 rows. That is 2568 agreeing rows, plus 14 rows with values re-read, plus the 12 new `html` and `table` movers, minus the 16 `row-rule-color` rows (M2 § 4; it matches "B moves 2594"). Report the actual count, and the row diff against the old record grouped by element and longhand.
     - The verdict says "either host regenerates it with the writer". Durable copies of the writers go under `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/writers/` only through the Orchestrator. Leave them under `/home/user/veneer/tmp/units/flip-integration/` and name them in the report.
   - **The writer configuration.** `/home/user/veneer/tmp/units/flip-integration/vite.writers.config.ts` reuses the `integration` project settings. Build it from the exported `sheetProject('flip-integration-writers', { test: { include: [<the writer files>] } })`, not from `integration(…)`, because `mergeConfig` would append the writer include to `/home/user/veneer/tests/integration.test.ts`. It keeps the provider, instances, `setupFiles`, and `isolate` settings.
     - Run it as `npx vitest run --config tmp/units/flip-integration/vite.writers.config.ts`.
     - Confirm in the run output that only the writer files ran.
3. **The witness case.** It replaces the record-free reboot case, per verdict § 6 and § 12.
   - **Witnesses.** The M2 § 6 list: `h1` to `h6`, `p`, `a[href]`, `img`, `svg`, `ul`, `button`, `input[type=text]`, `small`, `table`, `hr`, `label`, `legend`, `pre`, `code`, `kbd`, `mark`, `sup`, `sub`, `figure`, `dl`, `dt`, `dd`, `blockquote`, and the page's own `body`.
   - **Reading.** Read every witness live in `createPreflightFrame` under three compositions: `[recipeRecord.recipe]` (the recipe), `[recipeRecord.unexcluded]` (the preflight-only composition), and `[built]` (Bootstrap alone).
   - **Longhand sets per element.** Read both from CSSOM, not from a hand list:
     - P: the longhands that a rule of `/home/user/veneer/node_modules/tailwindcss/preflight.css` declares for that element, where the selector matches the mounted witness and the rule's style is iterated to longhands.
     - R: the longhands that a reboot rule declares for that element. Use `/home/user/veneer/node_modules/bootstrap/dist/css/bootstrap-reboot.css` (the `reboot` import at :311), or the tuned sheet's `reset` blocks; say which you used and why.

     This needs an instrument, for example `collectDeclaredLonghands(sheet, element)`, built on `scanSheetRules` and `element.matches`.
   - **Equalities.**
     - On every longhand in P: recipe equals preflight-only.
     - On every longhand in R minus P: recipe equals Bootstrap alone.
     - The verdict names body `color` and `background-color`, `hr` `opacity` (0.25), `dt` `font-weight` (700), and heading `color`. Assert each of these explicitly in addition to the general equality. M2 § 6 has no heading-color row: read it live and report the value.
   - **The declared-ratio rule.** A computed value that depends on a moved `font-size` is read as its declared ratio, never as pixels. A heading's `line-height` is the example: it is in R minus P, the reboot declares 1.2, and the font size moves. Compare `parseFloat(lineHeight) / parseFloat(fontSize)` against the declared 1.2 under both compositions.
     - M2 § 6 at 1280: `h1` 48/40, `h2` 38.4/32, `h3` 33.6/28, `h4` 28.8/24, `h5` 24/20, `h6` 19.2/16 under A, and 19.2/16 under C, all 1.2.
     - Apply the ratio rule to any other R-minus-P longhand whose pixels follow the element's own moved `font-size`, and list each one.
   - **Controls.**
     - Deleting the recipe's `reset` blocks fails the R-minus-P equality. Expected: body `color` falls to the user agent's rgb(0, 0, 0) against rgb(33, 37, 41).
     - Deleting the recipe's preflight `base` block fails the P equality.
4. **The incompatible re-read.**
   - **Today.** :611 runs `deriveIncompatibleRows(alone = readClassLonghands(shared, RELATION_WIDTHS, [built]), exposed = readClassLonghands(shared, RELATION_WIDTHS, [built, recipeRecord.unexcluded, compatibility]))` and asserts it equals `incompatibleRecord.rows`.
   - **After the flip.** Use `exposed = [built, recipeRecord.unexcluded]` (verdict § 6; proposal § 6 Records: "re-read with `[built, unexcluded]` instead of `[built, unexcluded, compatibility]`"). Keep the planted `text-center opacity` control and the removed-row control.
   - **Meaning, ruled from verdict § 2, § 6, and proposal § 6 Records.** A row records a shared name whose Tailwind rule, beside lifted Bootstrap without the layer, moves a computed longhand away from Bootstrap's value. That is the breakage of the `unexcluded` face.
     - It says nothing about the `tailwindcss` face. Under the layer, the 192 shared utilities read Tailwind's value by design, so a shared utility that reads Tailwind's value under the layer is not incompatible.
     - That face is pinned by the inverted restored clause in item 5, not by this record.
     - State this meaning in the case's title or in one plain sentence beside the read.
   - **Regenerate only if the rows differ.** Write the writer `/home/user/veneer/tmp/units/flip-integration/incompatible-record.test.ts` (one case, same configuration).
     - It derives the rows as above and keeps `bootstrap`, `tailwindcss`, and `widths`.
     - It writes `JSON.stringify(record, null, '\t') + '\n'` only when the derived rows differ from the record.
     - After a write, it formats the file with `npx oxfmt --config .oxfmtrc.json --write tests/fixtures/tailwindcss/incompatible.json`, so the bytes match the committed form.
     - It is idempotent: on a second run it writes nothing.
     - The proposal (§ 6 Records) predicts no difference, because the old compatibility sheet touched only `base`. With the tuned sheet removed from the composition, rows can change. Report the count before and after, and the changed names.
5. **Case :531, the restored clause, inverted** (verdict § 6).
   - The repeated and drift partition stays: `alone` against `tailwind = [recipeRecord.unexcluded]`, with the `text-center`, `mt-3` (16px against 12px at 640), `border`, `container`, and `collapse` pins.
   - The incompatible read follows item 4.
   - `restored` becomes `readClassLonghands(shared, RELATION_WIDTHS, [recipeRecord.recipe])`. At every width:
     - each of the 192 shared utilities reads its Tailwind-alone delta (`deriveClassDelta` against the `tailwind` reading);
     - each of the 17 shared components reads its Bootstrap-alone delta (against `alone`).
   - Split the 209 names with `CLASS_NAMES.bootstrap` as U2 and U3 did, and assert 192 and 17.
   - Control: under the raw composition `mt-3` reads 16px at 640, which differs from the restored 12px.
   - Keep the 60000 ms bound.
6. **The disjoint-layers case and the misuse case.**
   - `keeps every pair of built sheets disjoint in each shared layer` (:689) keeps its sheet list `[built, tuned, builtStyles, builtThemes]`. `SHEET_LAYERS` (index 1 `['reset', 'bootstrap']`, already in `/home/user/veneer/tests/setup.ts` :324) gives the owned layers.
   - Exempt exactly the pair (0, 1): Bootstrap and the tuned sheet are alternatives, never loaded together.
   - Assert that the measured pairs include the theme pair (2, 3) and exclude (0, 1). As a control, show that the (0, 1) pair shares `bootstrap` class names, so the exemption is load-bearing.
   - Add the misuse case. `mt-3` on a `div` reads `margin-top`:
     - 16px under `[built, recipeRecord.recipe]` (Bootstrap's unlayered `!important`, M1);
     - 12px under `[recipeRecord.recipe]` alone (`--spacing: 0.25rem` × 3, `/home/user/veneer/node_modules/tailwindcss/theme.css` :325; verdict § 2 row 1);
     - 16px under `[built]`.

     The title names the refusal; the guide refuses this composition (verdict § 10 item 6).
7. **The Chromium statement-sequence pin** (verdict § 3 pin 4; U3's brief leaves it to you). Add one case.
   - Flatten the recipe and the tuned sheet to ordered rows of (context, layer, selector, property, value, priority), preserving multiplicity. Use a new instrument (for example `flattenDeclarations`), not `flattenRules`, which merges adjacent rules.
   - Strip Tailwind's own blocks from the recipe: the `properties` block, the `@property` rules, and Tailwind's `theme`, `base`, `components`, and `utilities` blocks (§ 13 P2).
   - The remainder equals the tuned sheet's rows, except exactly the rewrites U3 pinned in Node **(re-read U3's added case in the `Tailwind compatibility recipe` describe and `/home/user/scaffold/tmp/codex/flip-records-last.md` for the rewrite list and the tuned empty-block count)**. M6 predicts:
     - (a) The merged `.dropstart .dropdown-toggle::after` pair, without the overridden `display: inline-block`. This shows as one missing row.
     - (b) Empty `@layer bootstrap {}` blocks written as `@layer bootstrap;`. These carry no declaration and should not show in declaration rows.
   - Pin the rewrite list in the case as data.
   - Control: a rule planted in the tuned sheet, inserted through CSSOM into a scratch `CSSStyleSheet`, fails the equality.
   - Report every row difference beyond U3's list. Do not widen the list without stopping.
8. **Instruments in `/home/user/veneer/tests/setupStyles.ts`.** Expected additions: the major reader (item 2), the portable-subset partition (item 2), a declared-longhand collector (item 3), a declaration flattener (item 7), and, if the cases repeat it, a layer-block remover for the `base` and `reset` controls (today the code inlines `CSSLayerBlockRule` index scans at :441 and :654).
   - Name each `{verb}{Noun}`. Each export carries the full TSDoc contract, and each new type is declared before the functions that use it (in `setupStyles.ts`, next to its existing types).
   - Each instrument gets a case in `/home/user/veneer/tests/setupStyles.test.ts`, inside the describe that fits (`CSSOM instruments` or `preflight instruments`), with a planted or removed control.
   - Change no existing instrument's behavior. If one must change, say why.
9. **Case rulings in `/home/user/veneer/tests/integration.test.ts`.** The line numbers are from brief time. Keep the three describe titles so that the `-t` filters stay stable.
   - **`cross-face composition` (:29 to :308).** This describe is not a Tailwind describe, and it is not yours: change nothing. :91 and :130 adopt `/home/user/veneer/tests/fixtures/integration/tailwindcss.scss`, which `@use`s the flipped tokens. They must still pass. If one fails, stop: the fixture is off-limits.
   - **`preflight reset drift` (:323):**
     - :324: replaced by the record case (item 2).
     - :339 `restores every recorded longhand with base revert counters and fails with counters stripped`: deleted. The `revert-layer` counter mechanism is gone with the mirror (verdict § 6; proposal § 6 "Goes").
     - :358 `keeps the thumbnail max-width beside a counter and lets an unlayered consumer win`: amended (proposal § 6). Under `[recipeRecord.recipe]` a bare `img` reads preflight's `max-width: 100%`, `.img-thumbnail` keeps its rule, and an unlayered consumer `img { max-width: 50% }` still wins. Drop the counter and retitle.
     - Added: the witness case (item 3).
   - **`compiled Tailwind compatibility recipe` (:385):**
     - :386 `keeps hidden elements hidden and records the display utility departure`: amended. Read the three faces.
       - `div[hidden].d-flex` reads flex under `bootstrap`, none under `unexcluded`, and none under `tailwindcss` (verdict § 2).
       - Add `hidden="until-found"`: `none` under `[built]`; not `none` under `[recipeRecord.recipe]`, with `content-visibility: hidden` (verdict § 2 and § 13 P6).
       - Drop the `revert !important` mirror composition.
     - :412 `places properties below reset and rejects a separate Veneer sheet loaded first`: kept (proposal "Stays"), with `tuned` in place of `compatibility`. If its 2px and 1px readings no longer hold, rule from the verdict, amend, and report why.
     - :428 `restores bare images and lists to lifted Bootstrap and rejects a removed mirror`: amended (proposal "Inverts").
       - Bare `h1`, `p`, `img`, and `ul` read preflight's values under `[recipeRecord.recipe]` and the reboot's under the raw composition. Expected from M2 § 6: `img` `display` reads block under both; `ul` `list-style-type` reads none under both, because preflight declares it.
       - The control deletes the recipe's preflight `base` block. The proposal names the `reset` blocks, but deleting them does not move a longhand that preflight declares. Use the `base` deletion, and record the choice.
       - Retitle.
     - :463 `keeps the height attribute of a sized image under the recipe and rejects a revert mirror`: amended (proposal "Inverts"; verdict § 5: "preflight's `height: auto` wins under both Tailwind faces"). Expected readings: `24px` under `[built]`, `48px` under `[recipeRecord.unexcluded, built]`, and `48px` under `[recipeRecord.recipe]`. Retitle.
     - :483 `keeps a reset layer value under the recipe and rejects a revert mirror`: deleted, replaced by the witness case.
   - **`computed Tailwind class relationships` (:530):**
     - :531: amended (items 4 and 5).
     - :648 `restores every preflight row under the compiled recipe and exposes the row when its mirror is stripped`: deleted. The mirror is gone, and the composition clause in item 2 carries the preflight rows under the three faces.
     - :667 `keeps collapse show visible under the recipe and reads collapse visibility with the rule exposed`: kept. `restored` becomes `[recipeRecord.recipe]` and `exposed` becomes `[built, recipeRecord.unexcluded]` (proposal: "the exposed reading drops the compatibility sheet").
     - :689: amended (item 6), plus the misuse case.
     - :717 `reads a composed border modifier as solid on both sides`: amended. `exposed` becomes `[built, recipeRecord.unexcluded]`, and a bare `border-2` reads `solid` under `[recipeRecord.recipe]` against `none` under `[built]` (proposal § 6).
     - Added: the statement-sequence pin (item 7).
   - Remove the imports that become unused: `readPreflightValues` if no case keeps it, `LAYER_STATEMENT`, and `propertyWitness` if :412 changes. Re-sort nothing outside the Tailwind import blocks.
10. **The three preflight titles.** These are the three `integration` titles in § Host-bound set of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md` (line 54):
    - `preflight reset drift > pins the live moved rows in both directions with planted and removed controls`: replaced by the record case. You may keep the title if it still states the behavior; the record case passes on this host either way.
    - `preflight reset drift > restores every recorded longhand with base revert counters and fails with counters stripped`: deleted.
    - `computed Tailwind class relationships > restores every preflight row under the compiled recipe and exposes the row when its mirror is stripped`: deleted.

    Acceptance: none of the three fails on this host, and their replacements (the record, witness, and composition clauses) pass. Report each title's fate (kept and passing, renamed to X and passing, or deleted). The Orchestrator updates the lanes file.

## Unknowns

- The live major before the first write (predicted 141).
- The regenerated row count (predicted 2594) and whether any row differs from M2's prediction.
- Whether the incompatible rows change without the tuned sheet in the composition.
- Whether pin 4 shows any difference beyond U3's rewrite list.
- How Vitest resolves the `commands` paths.
- Whether :412 still reads 2px and 1px.

## Scope

- **Owned.**
  - The three Tailwind describes of `/home/user/veneer/tests/integration.test.ts` (`preflight reset drift`, `compiled Tailwind compatibility recipe`, `computed Tailwind class relationships`) and their import blocks (:310 to :321, :381 to :383, :517 to :528).
  - `/home/user/veneer/tests/fixtures/tailwindcss/preflight.json`.
  - `/home/user/veneer/tests/fixtures/tailwindcss/incompatible.json`, only if the re-read differs.
  - Additions to `/home/user/veneer/tests/setupStyles.ts` and `/home/user/veneer/tests/setupStyles.test.ts`.
  - `/home/user/veneer/tmp/units/flip-integration/**` (create it).
- **Read-only.**
  - `/home/user/veneer/tests/setupServer.ts`. This is U3's file; a needed change in it is a stop condition.
  - `/home/user/veneer/tests/setup.ts` and `/home/user/veneer/tests/setup.test.ts`.
  - `/home/user/veneer/tests/setupBrowser.ts` (U6's).
  - The `cross-face composition` describe.
- **Off-limits.**
  - Everything else, including: `/home/user/veneer/tests/conformance.test.ts`, `/home/user/veneer/tests/app/`, `/home/user/veneer/app/`, `/home/user/veneer/src/`, `/home/user/veneer/guides/`, `/home/user/veneer/showcase/`, `/home/user/veneer/tests/fixtures/integration/`, both `recipe.json` records, `/home/user/veneer/package.json`, the lockfile, `/home/user/veneer/vite.config.ts`, and `/home/user/veneer/tmp/probes/`.
  - Forbidden operations:
    - npm install, commit, push, any credential, `git stash`, `git add`, `git reset`, `git checkout`, or any destructive command;
    - a tree-wide mutating gate (`npm run lint`, `npm run format`). Format only owned files, with `npx oxfmt --config .oxfmtrc.json --write <files>`, and say which;
    - rebuilding `dist/` beyond `npm run build:src:tailwindcss` and `npm run build:src:bootstrap`. The bootstrap digest `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` stays unchanged, and the tuned digest stays equal to `recipe.json`'s `sheet`.
- **Tools and limits.** `node`; the `npm run` scripts named below; `npx vitest run --config vite.config.ts --project <project> <file> -t "<title>"`; `npx vitest run --config tmp/units/flip-integration/vite.writers.config.ts`; `npx oxfmt` on owned files; `sha256sum`; `git status --porcelain`; `git diff`; `git show HEAD:<path>`.

## Execution

Do the assignment yourself and spawn nothing. Order:

1. The re-reads and the baseline.
2. The instruments with their `setupStyles.test.ts` cases.
3. The preflight writer, run twice.
4. The incompatible re-derivation, and its writer if the rows differ, run twice.
5. The three describes.
6. The gates.

Fix every failure in owned files before you report.

## Output

Write the final message through the last-message file, with no process diary:

1. Lead with the findings:
   - each record's `sha256sum` before and after, the `chromium` value, and the row counts before and after, with the row diff grouped by element and longhand;
   - whether `incompatible.json` changed;
   - the case list per describe, each marked kept, amended (how), deleted (why), or added;
   - each gate's exit code.
2. Paths: the writers and the configuration under `/home/user/veneer/tmp/units/flip-integration/`, and every edited file.
3. The pinned pin-4 rewrite list and any extra difference.
4. The fate of the three host-bound titles.
5. Every `npm run test:integration` failing title, each ruled host-bound (listed in § Host-bound set) or not.
6. Anything not run, with the exact error or skip line.
7. The final `git status --porcelain`, with `flip-probe-3`'s entries and any U3 entries listed as not yours.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when any of these happens:

- A sandbox write is rejected. Never try another write mechanism.
- The bootstrap digest `7932f7a5…` changes.
- The built tuned digest changes across `npm run build:src:tailwindcss`.
- The Chromium major cannot be read live, or reads anything other than 141.
- A record field's meaning cannot be fixed from verdict § 6 and the code.
- The record shape must change beyond the added `chromium` field, or typing that field needs a `/home/user/veneer/tests/setup.ts` edit.
- A change to `/home/user/veneer/tests/setupServer.ts` is needed.
- A file outside Owned must change.
- A second writer run changes a byte.
- A failure in a Tailwind describe cannot be fixed inside Owned.
- A `cross-face composition` case fails.
- Pin 4 needs a rewrite beyond U3's list.

Settle ancillary choices yourself and record them: test titles (in the verdict's wording where it gives one), helper names in the `{verb}{Noun}` form, and writer file names.

## Acceptance criteria

Cheapest first; run each one bare.

1. Run `npx vitest run --config tmp/units/flip-integration/vite.writers.config.ts` twice. After both runs, `sha256sum tests/fixtures/tailwindcss/preflight.json tests/fixtures/tailwindcss/incompatible.json` and `git status --porcelain` are equal. `preflight.json` carries `"chromium": 141`.
2. `sha256sum dist/src/bootstrap/index.css` equals `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`, and `sha256sum dist/src/tailwindcss/index.css` equals `recipe.json`'s `sheet`.
3. `npm run test:setup:browser`
4. `npx vitest run --config vite.config.ts --project integration tests/integration.test.ts -t "preflight reset drift"`
5. `npx vitest run --config vite.config.ts --project integration tests/integration.test.ts -t "compiled Tailwind compatibility recipe"`
6. `npx vitest run --config vite.config.ts --project integration tests/integration.test.ts -t "computed Tailwind class relationships"`
7. `npm run test:setup`. It must be green: `/home/user/veneer/tests/setup.test.ts` reads both of your records.
8. `npm run test:integration`. No failure outside § Host-bound set, and none in a Tailwind describe. List every failing title with its ruling.
9. `npm run check`
10. `npm run lint:check`
11. `npm run format:check`
12. `git diff --check`

## Review evidence

The actual diff, both records' digests before and after, the writer runs' digests, the case table, the pin-4 rewrite list, and `git status --porcelain`.

## Rulings appended before launch

- **Launch order.** This unit launches after `flip-records-2` is accepted and committed; read `tests/setupServer.ts`, `tests/setup.ts`, `tests/conformance.test.ts` (the `Tailwind compatibility recipe` describe, for the Node rewrite list and its measured counts), and both `recipe.json` records as that unit left them.
- **The `chromium` field is typed and guarded.** Owned, in addition to § Scope: in `tests/setup.ts` the `PreflightRecord` interface, the `isPreflightRecord` guard, and the `PREFLIGHT_SAMPLE` constant, extended with the `chromium` field (a positive integer major version) and nothing else; in `tests/setup.test.ts` the case that reads that guard, extended with a removed-field and a wrong-type control for `chromium`. Keep every other declaration of those files byte for byte. No local re-check of the field in the integration case: the guard refuses a record without it.
- **Regeneration.** The verdict governs: `preflight.json` regenerates on this host through the writer with `chromium` read live from the browser version, and the version gate reads the same source in the case.
- **Faces.** The recipe alone is the `tailwindcss` face; `[built, recipe]` is the refused misuse composition and nothing else reads it as the recipe.
- **Order of the unexcluded composition.** Pin `[built, unexcluded]` as § 6 and the code state. Read first whether the record's `unexcluded` text opens with the order statement (`LAYER_STATEMENT`); when it does, the two sheets' order cannot move a layer, and the report says so with the reading. Measure the reverse order `[unexcluded, built]` on the witness elements once and report every longhand that reads differently; a difference is reported, not pinned, and U5b reads it before serving the face.
- **Witnesses.** The verdict's list governs (body color and background, `hr` opacity, `dt` weight, heading color); the heading-color reading is taken live and recorded in the report because M2 § 6 carries no row for it. The control of the witness case is the deleted `base` block.
- **The three host-bound preflight titles.** None may fail; report each as kept, renamed (to what), or deleted (replaced by what), with the successor's exit. The Orchestrator rewrites the host-bound set in the lanes file from that mapping at the landing.
- **The Chromium statement-sequence pin** reads declaration rows from CSSOM: the expected side is the tuned sheet in CSSOM; the recipe side differs by exactly the merged `.dropstart .dropdown-toggle::after` rule, whose style exposes one `display` (`none`), so one row (`display: inline-block`) is absent (M6: 8093 of 8094). Empty `@layer bootstrap {}` blocks carry no row. Any further difference is a stop.
- **Cap.** 5400 s.

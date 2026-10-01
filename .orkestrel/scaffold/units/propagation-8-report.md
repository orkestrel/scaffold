# Unit propagation-8 report, pass 2

Pass 2 is written and not validated: this host gives the unit no shell, so no command ran. The guide describes the tree that `propagation-3`, `propagation-4`, and `propagation-fix-1` left. `isSurface` has its guard row. Every pass-1 sentence written from rulings 3 to 5 is replaced by one an executed assertion pins. `tests/guides.test.ts` gains 8 tests, and 5 existing tests gain assertions. The vendored-proof sentences follow rulings 2 and 8, because no `propagation-5` or `propagation-6` report exists; the Orchestrator confirms them (see Deviations).

## Touched files

- `guides/scaffold.md`: the `isSurface` row, the rewritten Surfaces and extensions subsections, the release-skew paragraph, the Limits entries, and the Tests list.
- `guides/README.md`: the concept paragraph names the sections added in pass 2.
- `tests/guides.test.ts`: the imports from `configs/helpers.ts`, `node:fs`, and `node:url`; 8 new tests; assertions added to 5 existing tests.
- `tmp/units/propagation-8-report.md`: this report, which replaces the pass-1 report.

The journey references were not touched in pass 2. Their pass-1 edits stand.

Diffstat: not measured. Read it with `git diff --stat -- guides tests/guides.test.ts`.

## Sections in `guides/scaffold.md`

**Added:**
- Guards table: the `isSurface` row.
- Select at creation: the paragraph and list for the four `blueprintToQuestions` advisories on `extensions`, and the statement that an extension with no occupied axis adds no framework dependency or machinery.
- The browser surface:
  - the Vue faces list, one item per axis;
  - the paragraph on the `.oxlintrc.json` directions;
  - the `resolveExternal` paragraph with both refusal messages;
  - the `stampPage` and `computeStamp` paragraph;
  - the arrival-journey paragraph.
- Vendored files and their refresh: the paragraph on the vendored `tests/config.test.ts` and the scratch adopter.
- The migration guard: the non-blocking `audit` question, the exit code, and the omission under `--groups`.
- Limits: "The base showcase dev server refuses its default mode."
- Limits, the distribution-proof entry: seeded proofs are not generation.
- Generated workspace: a bullet for the Vue faces and the arrival journeys.
- Tests: the `tests/distribution.test.ts` entry.

**Rewritten:**
- The `parseExtension` paragraph now names `isSurface`.
- Read the markers: "derives the structural facts and the extensions" (formerly `guides/scaffold.md:1136`).
- What the styles surface emits:
  - the barrel row names `_index.scss`;
  - the seed paragraph states the `@use` order and the themes barrel's `@use 'default'`.
- The browser surface:
  - the framework-free base paragraph now includes the `app/browser/main.ts` heading and the occupied-axis condition;
  - the showcase paragraphs cover `resolveApplication`, `showcase/<application>.html`, `emptyOutDir: false`, the `prepublishOnly` order, and `.prettierignore`;
  - the journey paragraph covers `appJourney(variant, variants, mode?)` and `test:journey:<framework>`.
- Root setup mirror: both seeded sibling proofs, the `tests/setupBrowser.ts` exemption, and the policy-sweep mirror.
- Blueprint:
  - the Vue transform sentence now states the occupied axis and `optimizeDeps.include`;
  - the journey project collects the integration suite of the application the mode selects.
- Ownership and drift, the release-skew paragraph: the seeded module that can meet the question is a journey workspace's `tests/setupBrowser.ts`, not `tests/setupGlobal.ts`.
- Dependency floors: `sass` is now in the seeded set that `tests/src/core/constants.test.ts` names (`propagation-4` added it).
- Limits:
  - "Guide parity has a bounded reach" lists the claims pass 2 executes;
  - the journey-mode sentence in the distribution-proof entry is updated.
- Tests: the `tests/policy.test.ts` and `tests/config.test.ts` entries.

**Deleted:**
- "an empty barrel" for `src/vue`. The seed is one comment line.
- "the `./vue` build follows the peer rule `.claude/rules/browser.md` states". The `resolveExternal` paragraph replaces it.
- "`tests/setupGlobal.ts` is the module that can meet it".
- "and that test does not read its table".

**`guides/README.md`:** the surfaces-and-extensions sentence now also names the advisories, the Vue faces, the modes, the page stamp, external resolution, the vendored proofs, and the root setup mirror.

## `## Surface` rows

Pass 2 adds one row. The other rows carry forward from pass 1, and each Summary still equals its source paragraph.

| Table | Rows |
| --- | --- |
| Types | `Axis`, `Extension`, `Framework`, `Surface` (pass 1) |
| Interfaces | `BrowserExtension`, `FrameworkDefinition`, `StylesExtension` (pass 1) |
| Constants | `AXES`, `FRAMEWORKS`, `FRAMEWORK_MATRIX`, `RESERVED_SHEET_NAMES`, `SHEET_ENTRY_NAME`, `SHOWCASE_PAGES_PATH`, `STYLES_DEV_DEPENDENCIES`, `STYLES_ENTRY_PATH`, `SURFACES`, `THEMES_BARREL_PATH`, `THEMES_ENTRY_PATH` (pass 1) |
| Guards | `isBrowserExtension`, `isExtension`, `isSheetName`, `isStylesExtension` (pass 1); **`isSurface` (pass 2)**: "Narrows a value to a surface an extension can extend." from `src/core/validators.ts:171` |
| Parsers | `parseExtension` (pass 1) |
| Compilers | `blueprintToExports`, `blueprintToSheets` (pass 1) |

These rows were checked against their source after the renames:

| Row | Source paragraph | Equal |
| --- | --- | --- |
| `FrameworkDefinition` | `src/core/types.ts:31`: "Describes the tooling and package boundaries a browser framework contributes." | yes |
| `ViteMachinery` | `src/core/types.ts:131`: "Names which host-specific pipelines a generated root Vite configuration carries." | yes |
| `blueprintToMachinery` | `src/core/compilers.ts:750`: "Derives the host-specific machinery a generated root Vite configuration carries." | yes |

The guide spells neither `refused` nor `suffixes` as a member, and it never spells `ViteMachinery.vue`. `isSurface` carries an untitled `@example`, so no titled fence is owed.

## Executed assertions in `tests/guides.test.ts`

Every test opens with a substring presence guard on its sentence, kept on one guide line.

**New tests**, all under `describe('surfaces and extensions')`:

| Test | What it executes |
| --- | --- |
| `raises one question for each extension the workspace does not place` | `blueprintToQuestions` on five blueprints: the repeated entry (blocking), empty `axes`, an `app` axis without `browser`, a styles extension without `styles`, and an occupied control (no question). It also checks `blueprintToMachinery(...).frameworks` and the `vue` dependency, absent when no axis is occupied and present when one is. |
| `plans the Vue face on each axis the extension occupies` | The ownership of every `src/vue` and `app/vue` path. Contents: the barrel is a single comment line, `app/vue/index.ts` is empty, `main.ts` mounts `App.vue`, `App.vue` holds the heading, and `app/browser/main.ts` sets the heading. The `src/vue` wrapper's rewrite chain and `refused` list. The nine Vue scripts and root `check` through `vue-tsc`. Both aliases and the `./vue` condition. Controls: `./browser` appears only with the extension, and a `src`-only Vue face checks through `tsc`. |
| `refuses a framework import with each resolveExternal message` | Both thrown messages, each also present in the guide. Admission: a peer, a peer subpath, `node:`, `@orkestrel/*`, and a sibling. Refusal: an `@src/` alias even as a sibling, and an undeclared package. The core wrapper's call, and the root factories' `@src/core` guard with the core sibling. |
| `builds one stamped showcase page per application mode` | The four showcase scripts and the `prepublishOnly` order. An app-only control: `build:showcase` with no `prepublishOnly`. The content-owned three-line wrapper. Root factory text: the `appShowcase(mode, override?)` signature, `resolveApplication`, the `showcase` output, `emptyOutDir: false`, `stampPage`, the `<application>.html` rename, and the `applications` record. `resolveApplication` across five modes, the undeclared refusal, and the `development` refusal behind the new limit. `.prettierignore` lists `showcase/`. |
| `stamps a final page with the digest of the page without its stamp` | `computeStamp` against the published SHA-256 vectors for `''` and `'abc'`. `stampPage` puts the line before the head close. The digest ignores the stamp line. Restamping returns the page unchanged. Refusals: a repeated stamp, a malformed stamp, and a head that does not close on its own line. |
| `runs one journey per application mode from its seeded arrival journey` | `test:journey`, `test:journey:vue`, and their place in `test`. Root factory text: the `mode?` parameter, `resolveApplication`, the cleared exclude, `provide`, and `CAPTURE`. The birth-owned wrapper's mode pass-through and both variants. Both arrival journeys: birth-owned, their mount lines, the families set, and the level-1 heading. The `ProvidedContext` augmentation. |
| `seeds a sibling proof beside each setup seed that declares an export` | For each planned `tests/setup*.ts`: ownership, whether it exports, whether it is non-empty, and whether a sibling proof is planned. Expected: `setup.ts` none; `setupBrowser.ts` non-empty with no export and no proof; `setupStyles.ts` and `setupGlobal.ts` both export and have a proof. Also the global proof's import, the sheet proof's import, and `test:setup` in `test`. |
| `reports the migration guard to an unscoped audit as a non-blocking question` | A real `new --app browser --offline --from <staged host>`, then `App.vue` written under `app/browser`. An unscoped `audit --json` exits `0` with `{ field: 'extensions', message: <sentence>, blocking: false }`. `audit --groups source` exits `0` with no such question. |

**Existing tests that gained assertions:**

| Test | Added |
| --- | --- |
| `executes the extension parsing example` | `isSurface` on `browser`, `styles`, and `themes`; `parseExtension('themes:print')` is `undefined` |
| `derives every structural fact and extension from its own markers` (renamed) | the presence guard for the reworded sentence |
| `plans every sheet face path under its stated ownership` | each folder barrel is exactly `src/<face>/<folder>/_index.scss`, birth-owned and empty; the exact `index.scss` `@use` order; the exact themes barrel |
| `adds Vue tooling only with the vue browser extension` | the `setupBrowser` factory alone carries `vue` in `optimizeDeps.include` only with the extension; the factory slice is non-empty as a control |
| `states the Node floor the published manifest requires` | no new assertion; it uses the callback's `node:fs` and `node:url` imports in place of shadowing them |

## Commands the Orchestrator runs

1. `npm run build`
   - Must exit 0. `guides/scaffold.md` is staged under `REFERENCE_PATHS`, so `host.json` changes digest.
   - The staged `## Surface` set gains `isSurface`. If staging refuses it as a fleet collision, `stageHost` names the owner.
   - Run this before step 4, because `createStagedHost` and `test:config` read the inventory.
2. `npx oxfmt --config .oxfmtrc.json --check guides tests/guides.test.ts`
   - Must exit 0.
   - On failure, the cause is my hand-predicted layout: string-length line breaks and `toContain(` wrapping. Run `--write` on the named file and diff it; the diff is layout only.
3. `npx tsc --noEmit --project tsconfig.json` and `npx oxlint --config .oxlintrc.json tests/guides.test.ts`
   - Both must exit 0. The test file gained a typed import of `../configs/helpers.js`.
4. `npm run test:guides`
   - Must exit 0 with 44 tests: 36 before, plus 8. `report.surface` must be `[]`; it showed the `isSurface` failure in `propagation-fix-1`.
   - `report.drift`, `report.links`, `report.imports`, and `report.examples` must be empty.
5. `npm run test:policy`
   - Must exit 0, with no `prose` hit in `guides/`.
   - My sweep of `guides/scaffold.md` was case-insensitive. Its pattern was `\b(once|should|just|simply|easy|via|currently|now|latest|utiliz|leverag|robust|performant|please|e\.g\.|i\.e\.|etc\.|above|below|since)\b`. It found no hit in pass-2 text; the hits elsewhere are pre-existing and in the non-banned sense.
6. `git status --porcelain`
   - Must add no file outside `guides/scaffold.md`, `guides/README.md`, `tests/guides.test.ts`, and this report.

## Deviations

- **The vendored proofs are described ahead of their reports.**
  - Expected: `propagation-5` and `propagation-6` reports.
  - Found: neither file exists under `tmp/units/`.
  - Done: the prose follows verdict rulings 2 and 8 and the two briefs. Confirm each statement below against those reports when they land; no `tests/guides.test.ts` assertion can pin them, because each one describes another test file.
  - Not done: an executed assertion for these sentences.
  - Hypothesis: both units land as briefed. If one lands differently, edit only the matching sentence.

  The sentences to confirm:
  - `guides/scaffold.md` § The browser surface: "the vendored `tests/config.test.ts` drives those directions through Oxlint" (`propagation-5` step 1b).
  - § Vendored files and their refresh, the second paragraph: enumeration from the tree, non-empty populations only where a marker exists, the five mutation controls, and the scratch adopter's steps.
  - § Root setup mirror: the `tests/setupPolicy.ts` mirror in both directions, the `tests/setup.test.ts` import route, and the `HOST_PATHS` exemption.
  - § Tests: the `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts` entries.
- **The base showcase dev server refuses its default mode (source defect, documented as a limit).**
  - Expected: `npm run showcase` serves the base page.
  - Found: `blueprintToScripts` emits `showcase` as `vite --config configs/app/vite.showcase.config.ts` with no `--mode` (`src/core/compilers.ts:521`). Vite serves in `development` mode. `resolveApplication` (`configs/helpers.ts:74`) maps only `undefined`, `production`, and `test` to `browser`, and throws `The application mode "development" is not declared.`
  - Done: guide Limits states the refusal and the `--mode browser` workaround. `builds one stamped showcase page per application mode` pins the refusal, so fixing the defect turns that test red together with the limit sentence.
  - Not done: the source fix, which is outside the owned set.
  - Hypothesis: add `development` to the `browser` fallback in `resolveApplication`, or pass `--mode browser` in the generated `showcase` script. Then delete the limit and its two assertions.
- **The README concept rows are still not added (carried from pass 1).**
  - Expected: rows for surfaces and extensions.
  - Found: `## By concept` is the `parseManifest` run map, and a second `scaffold.md` row would repeat the parity run.
  - Done: the linked paragraph is extended instead.
  - Hypothesis: one row per guide spec is the intended reading. The Orchestrator rules on this if separate rows are wanted.
- **No `prove` closing line.** The `prove` tool was not available and no TypeScript type claim was made. Each claim has an executed test.

## Observations

- The pass-1 `TABLES` observation is closed: `tests/src/core/constants.test.ts:113` names `sass`.
- The pass-1 `_index.scss` observation is closed: `ARTIFACT_TEMPLATES.source.sheet` seeds `elements/_index.scss`, `components/_index.scss`, and `utilities/_index.scss`.
- The pass-1 `tests/setupGlobal.ts` observation is closed: `blueprintToTestArtifacts` plans `tests/setupGlobal.test.ts` beside the module when `global` is set.
- `src/vue/index.ts` seeds the line `// TODO: [Feature] Export the browser extension API.` (`ARTIFACT_TEMPLATES.source.barrel`). The guide calls it "a barrel holding one comment line and no export" and does not quote the TODO text.

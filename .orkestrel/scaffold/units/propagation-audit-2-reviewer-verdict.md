# propagation-audit-2: reviewer verdict (subjective lane)

Saved verbatim by the Orchestrator from the lane's final message (the lane has no Write tool).

**Lane:** subjective. It covers design fit, API shape and vocabulary, where code sits, and whether the rule and guide text match the generator. Claude Opus 5.5 ran it with Read, Grep, and Glob only, spawned nothing, and changed no tracked file.

## Deviations

- **No `git diff --stat` reading.** This lane has no shell, and the dispatch did not include the diff. The changed-file set comes from the session-start `git status` snapshot: 50 modified tracked files and an untracked `.orkestrel/scaffold/`. Every ruling below is a reading of the working tree.
- **Out of scope.** `tests/distribution.test.ts`, `tests/setupServer.ts`, and `host.json` belong to `propagation-6`. This lane did not rule on them, and did not rule on any guide sentence that describes them (`guides/scaffold.md:1312-1316`).
- **Commands this lane could not run.** Rerunning `npm run test:guides`, running `audit --offline --json`, comparing bytes, and running Oxlint all need a shell. Those parts go to the objective lane.

## Verdicts

1. **CONFIRMED.** Every first-round ruling is in the tree:
   - `ViteMachinery` has only `browser`, `frameworks`, `output`, and `showcase` (`src/core/types.ts:142-147`).
   - The migration guard sets `blocking: writing` (`src/bin/CLI.ts:1367`).
   - A method, getter, or setter is admitted only when its containing object is a call argument, a return value, or an arrow body. `MethodDefinition` returns early, as before (`configs/policy.ts:835-849`).
   - No themes alias exists. Only sheet faces get `@src/<face>` (`compilers.ts:847-849`).
   - `setup:browser` adds `vue` to `optimizeDeps` from `machinery.frameworks` (`compilers.ts:1053-1056`).
   - `blueprintToQuestions` has the extension questions (`compilers.ts:2891-2926`).
   - `targetToFacts` exists (`src/bin/helpers.ts:990`).
   - `refused` and `suffixes` carry TSDoc (`types.ts:32-43`).
   - A refused scope has its own message (`configs/helpers.ts:413-417`).
   - The browser and server builds go through `resolveExternal` (`compilers.ts:928-936`).
   - The `src/bin` lint block refuses Vue imports (`.oxlintrc.json:552`).
   - The `app/vue` barrel is empty (`compilers.ts:1549`), and the themes barrel uses `@use 'default'` (`templates.ts:1473`).
   - `check:src` appears only when it has members (`compilers.ts:369`, `:374`).
   - The `NewCommand` remarks cover the four fields (`src/bin/types.ts:65-67`), and `isSurface` reads `SURFACES` (`validators.ts:180`).

   Mutations these cases catch:
   - Setting `blocking` back to `true` reddens `tests/guides.test.ts:1131-1134`.
   - Deleting the method branch at `policy.ts:835-849` reddens `tests/config.test.ts:1516-1517`.
   - Admitting every method reddens the local-binding twin at `tests/config.test.ts:1587-1593`.

   The rule text for the method admission disagrees with this code. That item is under verdict 10.

2. **BROKEN.** The root `check` checker and every Vue face projection read the extension's raw `axes`. Dependencies and the plugin import read only the occupied axes, meaning axes whose selection includes `browser`.
   - **Input:** `createBlueprint('desk', { app: ['core'], extensions: [{ surface: 'browser', name: 'vue', axes: ['app'] }] })`. It raises only the non-blocking question `browser:vue occupies app, whose selection lacks browser.`
   - **What the plan emits:**
     - `check` starts with `vue-tsc` (`compilers.ts:346-351`), but `blueprintToDevDependencies` declares no `vue-tsc` (`compilers.ts:290-292`, read through `blueprintToMachinery` at `:778-785`; `guides.test.ts:795` asserts no `vue`).
     - The root `vite.config.ts` gets the `appVue` factory (`compilers.ts:1021-1037`). That factory calls `appBrowser()`, which is not emitted, and `vue()` (`templates.ts:423`, `:427`), whose import is gated on `machinery.frameworks` (`compilers.ts:919`).
     - The `src`-axis twin does the same: the `srcVue` factory at `compilers.ts:985-995` calls `vue()` (`templates.ts:229`).
     - Scripts, exports, aliases, wrappers, seeds, and entry tests also read raw axes (`compilers.ts:115-117`, `:837-846`, `:1357-1418`, `:1539-1575`, `:1634-1649`).
   - **How a writing verb reaches it:** `#derive` takes `app/vue` into `axes` without looking at `app/browser` (`src/bin/helpers.ts:1017-1022`, `CLI.ts:999-1001`). The advisory does not block `repair`, so `repair` writes this configuration.
   - **Fix:** derive the occupied (framework, axis) pairs once in `compilers.ts`, from `extension.axes` filtered by `blueprint[axis].includes('browser')`. Read that one projection in `blueprintToMachinery`, `blueprintToScripts`, `blueprintToWritableScripts`, `blueprintToExports`, `blueprintToRootTsconfig`, `blueprintToRootVite`, and the config, source, and test artifact compilers.
     - An extension that occupies nothing then emits nothing. That matches `guides/scaffold.md:1149-1150` and the "emits nothing" wording of the showcase and journey advisories.
   - **What held:** the CLI path is sound.
     - With `src` only, the `srcVue` factory, the `vue` import, the dependencies, and a `tsc` root check line up.
     - With `app` only, `appVue`, `vue-tsc`, and the `applications` map line up (`guides.test.ts:860-867`).

3. **CONFIRMED** (within this lane).
   - **Sheet seed:** `_index.scss` barrels, `sheet.ts`, and `index.ts` (`templates.ts:1461-1470`).
   - **Themes barrel:** it opens with its own order statement and then `@use 'default'` (`:1472-1473`).
   - **Setup seeds:** `tests/setupStyles.ts` arrives with its proof (`compilers.ts:1650-1667`), and `tests/setupGlobal.test.ts` sits beside the global seed (`:1720-1735`).
   - **Themes-only plan:** `targets` adds `themes` only without `styles` (`compilers.ts:350`, `:940-941`).
   - These match ruling 2, `styles.md:26-32`, `:66-71`, and guide `:1172-1215`.
   - The key names and the `adoptSheet` type are under verdict 11. Two possibly vacuous controls go to the objective lane (Referrals).

4. **CONFIRMED.** I read `resolveExternal` (`configs/helpers.ts:408-430`):
   - The refused scope throws even when the package is a peer.
   - A refused package throws unless a peer admits it.
   - `@src/` and `@app/` return `false`.
   - `node:`, `@orkestrel/`, peers, and siblings return `true`.

   Both messages match `guides/scaffold.md:1251-1254` and `browser.md:16-18`. `guides.test.ts:884-898` executes every branch.

5. **CONFIRMED** in code. The page-name wording in the rules is under verdict 10.
   - **`resolveApplication`** maps `undefined`, `development`, `production`, and `test` to `browser`, and throws on an undeclared mode (`configs/helpers.ts:70-82`).
   - **`appShowcase`** (`templates.ts:478-532`):
     - writes to `showcase` with `emptyOutDir: false`;
     - runs `stampPage` in a post-ordered `generateBundle`;
     - renames the page to `application + '.html'`.
   - **`appJourney`** (`:449-471`) includes `tests/app/${application}/integration.test.ts`, sets `exclude: []`, and provides `variant`, `variants`, and `capture`.
   - **Scripts** come from `compilers.ts:455-459` and `:520-527`, and the `prepublishOnly` rebuild from `:537-539`.
   - **Seeded journeys** prove Journey, Refusal, and Matrix, plus Capture under the flag (`templates.ts:1525-1579`).
   - A grep of `src`, `configs`, `tests`, the guide, and the rules for `dist/showcase`, `demo/showcase`, and the `show` script finds only negative assertions.

6. **UNRESOLVED.** Settling this claim needs the Oxlint binary run, including the three fresh fixtures, and this lane has no shell.
   - The proof's design holds as read:
     - `readImportDiagnostics` spawns the real binary through `process.execPath` with `--no-ignore` and refuses any fixture that has no `no-debugger` marker (`tests/config.test.ts:171-214`).
     - The matrix collects every mismatch before it asserts (`:2698-2703`).
     - The disabled-block control throws and names `src/vue/refused3.ts` and `src/vue/refused8.ts` (`:2704-2713`).
   - Mutation: turning off the `src/vue` block produces the readings that control expects, so the assertions tell the two states apart.
   - The trailing override is at `.oxlintrc.json:561-566`.

7. **CONFIRMED** (proof design). The placement problems are under verdict 11.
   - **Enumeration from the tree:** `collectSheets` and `collectFrameworks` read source markers, never wrappers (`tests/config.test.ts:74-100`). Populations are required only where a marker exists (`:268-270`).
   - **Wrapper loading:** every selected wrapper loads (`:271-296`).
   - **Mutation controls:**
     - deleted wrapper (`:244-247`);
     - removed `setupStyles` entry and reversed themes order (`:360-375`);
     - disabled Vue restriction (`:2669-2713`);
     - disabled rewrites (the `kept` build, `:3497-3518`);
     - second stamp line (`:2962`).
   - **Setup mirror:** it has five controls with no name-based exemption. The vendored exemption reads `HOST_PATHS` (`tests/setupPolicy.ts:543-549`, `:2733-2786`). `tests/policy.test.ts:61-68` wires the controls, and `tests/setupPolicy.test.ts:34-111` proves the inspector.

8. **UNRESOLVED.** The `audit --offline --json` output and the `host.json` byte comparison need a shell, and they belong to the objective lane. The placement parts hold:
   - `configs/helpers.ts:1-22` imports only `vite` and `node:` modules.
   - `templates.ts` exports only `CONFIG_TEMPLATES` and `ARTIFACT_TEMPLATES`. Every other declaration sits inside a template string.
   - The `probe` project is intact (`vite.config.ts:327-341`).

9. **CONFIRMED.**
   - **Guards are total:** `isSheetName` checks `isString` first (`validators.ts:192-198`). The distinct-axes predicate runs only after `recordOf` passes (`:202-209`).
   - **`parseExtension` is sound:** it returns a guard-valid value unchanged and checks every candidate (`parsers.ts:23-30`).
   - **`#derive` reads every marker:** `CLI.ts:986-1011` and `src/bin/helpers.ts:990-1053`.
   - **`new` refuses as ruled:** `CLI.ts:240-244`, and `helpers.ts:1071-1086`.

10. **BROKEN.** These sentences disagree with what the generator emits:
    - **a. Method admission.** `.claude/rules/architecture.md:169` says to "refuse a climb through a … accessor, method". The rule admits a method, getter, or setter in an argument or return position (`configs/policy.ts:835-849`; `config.test.ts:1516-1517`). Right: list "methods, getters, and setters of such an object literal" among the admitted links, and keep the refusal of a climb out of a method or accessor body (`config.test.ts:1607-1608`).
    - **b. Page name.** `workspace.md:115` and `:121`, and `documentation.md:27`, name `showcase/<mode>.html`. The generator writes `<application>.html` (`templates.ts:510`; guide `:1268`). `npm run build:showcase` runs in mode `production` and writes `showcase/browser.html`. Right: write `showcase/<application>.html` and state that the base modes write `browser.html`.
    - **c. Distribution registration.** `guides/scaffold.md:2398-2400` registers `distribution` "whenever the workspace publishes at least one `src` environment". A sheet-only workspace also registers it (`compilers.ts:912`, `:1078-1081`), and guide `:2069-2070` says "any `src` environment or sheet face". Right: add "or sheet face".
    - **d. Seeded setup proofs.** `guides/scaffold.md:2388-2406` contradicts `:1331-1345`. It says `tests/distribution.test.ts` is "the one proof scaffold generates", that "Scaffold generates nothing there", and that "the project set cannot show" an unproven setup module. Scaffold seeds `tests/setupStyles.test.ts` and `tests/setupGlobal.test.ts` (`compilers.ts:1659-1665`, `:1728-1734`), and the `policy` project refuses an exporting setup module that has no proof (`setupPolicy.ts:555-566`). Right: exclude the setup modules scaffold seeds, point at Root setup mirror, and say the `policy` project reports an exporting module that has no proof.
    - **e. Writable script region.** `guides/scaffold.md:740-743` leaves out the framework scripts the region writes: `check:<axis>:vue`, `build:<axis>:vue`, and `dev:vue` (`compilers.ts:592-601`). Right: add one sentence naming them.
    - **f. Advisory sentence and its assertion.** `guides/scaffold.md:1149-1150` says an extension that occupies no browser axis adds "no framework machinery". Its assertion reads only `blueprintToMachinery` and the dependencies (`guides.test.ts:791-796`). It does not break when the rendered `vite.config.ts` emits `appVue` with `vue()` (verdict 2). Right: fix verdict 2, then assert that `blueprintToRootVite(unplaced)` does not contain `appVue` or `srcVue`.
    - **g. Setup project registration.** `workspace.md:169-172` registers `setup` and `setup:browser` by proof presence. The generator registers them from `global` and from any sheet face (`compilers.ts:451-454`, `:1046-1050`). Right: the rule names the seed selections that also register each project.
    - **h. Typecheck table.** `workspace.md:240-247` has no row for `src:vue` or `app:vue` (`templates.ts:761-762`, `:780-781`). Right: add `src:vue` with `DOM`/`vite/client` and `app:vue` with `DOM`/`vite/client`,`vue`.

    The `## Surface` rows I spot-checked equal their doc paragraphs: `isBrowserExtension`, `isSurface`, `parseExtension`, `blueprintToSheets`, `FrameworkDefinition`, and `SURFACES` (guide `:91-300` against source). The bare `test:guides` rerun goes to the objective lane.

    I attacked three guide assertions:
    - Item f fails. Its assertion cannot break while the sentence is false.
    - `guides.test.ts:870-907` holds. It executes every `resolveExternal` branch and message.
    - `guides.test.ts:909-962` holds for the page name: the `application + '.html'` substring breaks under a mode-named rename. The stamp-after-inlining ordering is not asserted there, and guide `:2297` hands that check to the scratch adopter.

11. **BROKEN.**
    - **a. Helpers declared in a test file.** `tests/config.test.ts:74-214` declares and exports seven helper functions. No other test file in the tree exports a declaration. `tests.md:190` and `:193`, and `:184-186` for the vendored set, place them in `tests/setupPolicy.ts`.
      - The same file creates scratch directories by hand with `mkdtempSync`/`rmSync` (`:218-219`, `:346-347`, `:2563-2564`) beside its own `createPolicyScratch` (`:3439`).
      - It also round-trips plain objects through a JSON file before reading them (`:349-370`).
      - Right: move the helpers into `tests/setupPolicy.ts`, use `createPolicyScratch`, and pass the objects in directly.
    - **b. Two-word data keys.** `ARTIFACT_TEMPLATES.tests.globalproof` (`templates.ts:1597`) and `.styleproof` (`:1706`) join two words into one key. The same file groups this shape at `distribution: { proof }` (`:1777-1778`). Also, `CONFIG_TEMPLATES.factories.sheets` (`:193`) holds an `integration` factory beside `factories.integration` (`:742`). Right: `tests.global` and `tests.styles` become `{ module, proof }` groups, and the sheet integration variant sits under one `integration` group. Version 0.0.82 is unpublished.
    - **c. Duplicated predicate.** `reportNested` restates the call-argument, return, and arrow-body test inline (`configs/policy.ts:838-847`), duplicating `isPolicyCallback` and `isPolicyResult` (`:548-567`). That breaks the rule to centralize any pattern repeated twice. Right: one exported predicate over a position, used by all three.
    - **d. Missing examples.** `isBrowserExtension`, `isStylesExtension`, and `isExtension` (`validators.ts:201`, `:211`, `:217`) have no `@example`. The house form at `:157-168` has one. The added examples at `:174-178`, `:186-190`, `parsers.ts:17-21`, and `compilers.ts:87-90`, `:107-111` leave out the `import` line that every sibling example carries.
    - **e. Inline return type.** `adoptSheet` returns an inline object type (`templates.ts:1652`) beside the exported `SheetEntry` (`:1637`). Right: an exported `SheetAdoption` interface in the same seed.

    These held: every public member name is one word, the barrel is star-exports only (`src/core/index.ts`), and the name prefixes follow `names.md`.

12. **BROKEN.** On the generator side, the exit criterion still lacks:
    - occupied-axes coherence (verdict 2);
    - the rule and guide sentences under verdict 10;
    - the generated guide index entries (finding F5);
    - evidence that a generated full-selection workspace passes its own config proof. Only `tests/distribution.test.ts` from `propagation-6` supplies that evidence, so it is **NOT-EVIDENCED** this round.

    The veneer adoption and the fleet migration are later by design.

## Findings

- **F1. The executable build keeps its own external predicate.**
  - **Defect:** `templates.ts:347-351` restates the `node:`, `@orkestrel/`, and peer clauses of `resolveExternal` (`configs/helpers.ts:408-430`). That goes against ruling 3's one engine.
  - **Fix:** `external: (id: string) => id.startsWith('@src/') || resolveExternal(id, { peers, refused: [], siblings: [] })`.
  - **Bound:** the executable keeps `@src/` external, and the guide's "published face" sentence (`:1244`) stays true either way.
- **F2. TSDoc remarks no longer match the code.**
  - `types.ts:235-236` maps `browser` only to `tests/setupBrowser.test.ts`. `CLI.ts:992` also maps `tests/setupStyles.test.ts`.
  - The `compilers.ts:554-561` remarks leave out the sheet and framework region scripts.
  - The `compilers.ts:2800-2809` list of non-blocking advisories leaves out the extension and journey questions.
  - The `@returns` at `compilers.ts:1455` and `:1592` leave out the sheet seeds and journey suites.
  - **Fix:** name each one.
- **F3. The rules allow single-file components (SFCs) in `src/vue`, but the face checks only TypeScript.**
  - `browser.md:14` ("Put Vue code in `src/vue`") and `application.md:51-52` ("Vue SFCs belong to the `vue` extension's faces") permit a `.vue` file in `src/vue`.
  - `check:src:vue` runs `tsc` (`compilers.ts:382`) over `.ts` includes only (`templates.ts:769-774`), so an SFC there is neither checked nor declared.
  - Ruling 3 and veneer (`package.json:81`; `src/vue` holds only TypeScript) chose `tsc`. Right: state that `src/vue` publishes TypeScript only and that SFCs live in `app/vue`. The Orchestrator rules if `vue-tsc` is wanted instead.
- **F4. The runtime-entry list is incomplete.** `architecture.md:52` lists the fixed entries but leaves out `app/vue/main.ts`, which the workspace table names (`workspace.md` § Environments). Fix: add it.
- **F5. The generated guide index leaves out faces.** `blueprintToGuideArtifacts` (`compilers.ts:1908-1932`) and its template (`templates.ts:2908-2923`) list no `src/vue` or `app/vue` face and no showcase entry. `documentation.md:24` and `:27` require the showcase column wherever the workspace builds pages. Fix: add the occupied Vue faces to the source, test, and directory lists, and add a showcase line per page when the showcase is selected.

## Referrals

- **To the objective lane:**
  - Rerun `test:guides` bare, `audit --offline --json`, the `host.json` bytes, and the three lint fixtures.
  - The second case of the `setupGlobal.test.ts` seed tests Vitest rather than `setup` (`templates.ts:1606-1608`). The `.not.toEqual` at `:1742` cannot fail on its own.
  - No control pins the `^export ` anchoring in `setupPolicy.ts:556`. Without it, the journey seed's indented `export interface` inside `declare module` would be flagged in every journey workspace.
- **To the Orchestrator:**
  - `showcase`, `build:showcase`, and the per-framework showcase scripts sit outside the writable region (`compilers.ts:587-602`), against ruling 6's "the writable script region gains the new scripts".
  - Whether the no-nested-function law reaches the root `vite.config.ts` factories. They hold `fileName`, `generateBundle`, and `writeBundle` functions in local bindings (`templates.ts:237`, `:491`, `:506`), and those files are outside the lint population (`.oxlintrc.json:93-99`). This is an existing idiom.

## Attacked and held

- **Refused-scope message.** It derives the public package by stripping `@` and `/` (`configs/helpers.ts:415`). That is correct for the closed `Framework` union. A second framework would need an explicit scope-to-package pairing.
- **Migration guard and `--groups`.** `groups: []` hides the question from an audit scoped by `--groups`. That is documented (guide `:1326`) and asserted (`guides.test.ts:1131-1134`). Writing verbs still refuse under any scope.
- **Sheet-face imports.** No lint block covers sheet faces, as in veneer's `.oxlintrc.json`. The scoped `tsconfig.<face>.json` (ESNext, `vite/client`) and the `sheet.ts` law hold the direction.
- **Themes without styles.** Themes-only plans with no question, while a styles extension without `styles` raises one. Both emit working faces, and the brief claims themes-only as a feature.
- **`./browser` subpath.** It is emitted beside a browser root when `src/vue` is occupied (`compilers.ts:118-121`). That is deliberate for the declaration rewrite.
- **Journey seed.** `tests/setupBrowser.ts` declares no top-level export, so the mirror does not flag it (`setupPolicy.ts:556`; `guides.test.ts:1072-1079`).
- **Duplicate `--extend` entries.** `selectionToExtensions` dedupes on the raw entry text. A whitespace variant fails `parseExtension` first.

VERDICT: FAIL 2, 6, 8, 10, 11, 12; outside the claims: F1, F2, F3, F4, F5

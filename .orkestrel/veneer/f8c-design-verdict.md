# F8c SERVICE — design verdict (Orchestrator reconciliation, 2026-09-22)

Lanes run over `units/f8c-design-brief.md`: `planner` on Opus (`units/f8c-design-planner-proposal.md`)
and `analyst` on GPT-6 Astra (`units/f8c-design-analyst-proposal.md`, codex thread
`01a0cb5e-3bb1-7de0-afd7-8316b3233a72`). Probes the Orchestrator took: `units/f8c-probe-import.mjs`
(the consumer recipe compiles verbatim in Node through the manifest's self-reference) and
`units/f8c-probe-profiles.mjs` (`tests/setup.css`, `preflight.css`, and `unexcluded.css` each compile
from their own path after the candidate list is written: the `tailwind` profile emits no utility, the
`preflight` profile emits `base`, the instrument emits `.container` and `.col-1`; no warning);
`npm run build` runs `build:src`, which builds the styles target. This amends the F8 design verdict's
ruling 6 and its exit criterion under D19; rulings 1 to 5 and 7 to 11 and D16 stand.

## Rulings

1. **Readers.** A structural reading (what a stylesheet declares) is taken in Node from the compiled
   text through `postcss`; a computed reading (what a page resolves) is taken in Chromium and crosses
   back as plain data. The structural family is one entity, `SheetReader`, in `tests/setupServer.ts`
   (the planner's form: a helper family around one shape promotes to a class, `names.md`), constructed
   from CSS text, deriving lazily from one parse, with one-word members: `statement` (the names the
   opening `@layer` statement lists, or `undefined` when the sheet opens with another node), `order`
   (each layer name at its first declaration, statement or block), `layers` (each opened block as a
   `SheetLayer` of `name`, `selectors`, and `declarations`), `names` (each class name a rule declares,
   escapes resolved, the grammar `collectSelectorClasses` and the wrapper's `CASCADE_CLASS` shared
   until now), `selectors`, `properties` (each custom property declared anywhere), and `declarations`
   (each `SheetDeclaration` of `selector`, `property`, `value`, `important`, and the layer it sits
   in). Module helpers beside it: `collectSharedNames(names, others)`, `collectImportantNames(reader)`
   (F8b F2's carrier), and `collectInlineSources(source)` moved from `tests/setupBrowser.ts`
   unchanged. The candidate list is `new SheetReader(cascade).names` with ruling 5's floor, so the
   wrapper's regular expression and the browser reader's copy collapse to one grammar. The analyst's
   exception is adopted: the preflight comparison's property population is browser-normalized, never
   authored names and never a Node shorthand expander — `stage.properties(css)` returns, per rule, the
   longhand names Chromium assigns a detached constructed stylesheet, without attaching it to the
   measured document. Browser exports that lose their last consumer go, with their cases: `loadSheet`,
   `readLayerStatement`, `collectFilledLayers`, `collectSelectors`, `collectClassNames`,
   `collectSharedNames`, `collectDeclaredProperties`, `readComputedSnapshot`; `collectInlineSources`
   moves. `readCascadeSheet` (its TSDoc repointed at `tests/src/styles/index.test.ts` and
   `tests/setupBrowser.test.ts`), `collectLayer`, `collectLayerRules`, `collectLayerOrder`,
   `collectSheetRules`, `collectNestedRules`, `collectCustomProperties`, `collectScopeProperties`,
   `collectMediaConditions`, `scanPositionalPairs`, `SceneManager`, `scene`, and `PROBE_CASCADE`
   stay. `NEUTRAL_MARKUP` moves to `tests/setupStyles.ts` beside `TABLE_MARKUP`; `collectFencedBlocks`
   keeps its contract and its body becomes `extractFences` filtered by language (the analyst measured
   equal results, nested fences included). Test-side contracts live in the setup module that owns
   them; the tree has no `tests/types.ts`.
2. **Readiness.** `tests/setupService.ts` exports a pure verdict leaf `scanReadiness(readiness):
   string | undefined` over a `Readiness` record (`compiler`, `cascade`, `browser`, each its
   evidence or `undefined`) and an imperative `verifyReadiness(): Promise<void>` that gathers,
   refuses with the leaf's sentence, and writes the candidate list; the module body awaits it at top
   level, loud and never skipped. The gates, cheap first: the installed compiler compiles a two-line
   input; `dist/src/styles/index.css` is present and non-empty (the refusal names
   `npm run build:src:styles`); the pinned browser resolves through `resolveBrowser(resolvePinnedBrowser(),
   process.platform, process.env)` and its executable exists (resolve, never launch; the refusal
   names the install command); the candidate list derived from the cascade passes the floor and is
   written to `tmp/tailwind/candidates.txt`, the path `tests/setup.css` names. The `setup` project
   collects `tests/setupService.test.ts` and so runs readiness once per file there; that project
   already reads the built cascade, so the added cost is one minimal compile and two existence
   checks. The unit measures `npm run test:setup` before and after as an observation; the fallback,
   if the cost is material, is the compiler gate reduced to resolvability.
3. **Scene.** `StageManager`, exported as `stage` from `tests/setupService.ts`, with `open()`
   (launch headless Chromium the oracle's way, write a scratch page under `createScratch()` that links
   the built cascade first, navigate by `pathToFileURL`), `mount(markup)`, `load(css)` (append a
   recorded `<style>`, the `scene.load` contract), `read(selector, properties?)` (every matching
   element's computed snapshot in document order, from one `page.evaluate` callback returning pairs;
   a case takes the first with its own `requireValue`), `properties(css)` (ruling 1), `clear()`
   (empty the container and remove every loaded sheet), and `destroy()` (close the browser and the
   scratch, also after partial initialization). `compileProfile(path): Promise<string>` beside it
   reads the file and runs `postcss([tailwindcss()]).process(text, { from: path })`. One browser per
   proof file (`beforeAll` opens, `afterAll` destroys, `afterEach` clears); profiles compile once
   per file; no motion or viewport emulation. The `setup` project already launches Chromium for the
   Button oracle, so the stage's lifecycle and containment are proved in `tests/setupService.test.ts`
   with a real launch; the driven readings are the service proofs' own.
4. **Files.** `tests/service/tailwind/{profiles,consumer,preflight}.test.ts` (`shared` renamed
   `consumer`, F8b F5); the fixtures stay at `tests/fixtures/tailwind/`; `tests/setup.css` stays at
   its conventional path as the `tailwind` profile's source with its header comment reworded; `?raw`
   and `?inline` imports become `readFileSync` anchored at `WORKSPACE_ROOT`, and the guide through
   `VENEER_GUIDE_PATH`.
5. **Scripts and configuration.** `"test:service": "vitest run --config vite.config.ts --no-cache
   --reporter=dot --project service"` exactly; `prepublishOnly` gains `&& npm run test:service`
   after `npm run test:distribution -- --mode release`; `test:src:tailwind` and its `test:src`
   clause go; `configs/src/vite.tailwind.config.ts` goes whole (no alias survives the probe); the
   root `vite.config.ts` is regenerated by the Orchestrator's tracked `scaffold repair --groups
   configs` after the setup module and the scripts exist; the vendored `tests/config.test.ts` and
   `tests/policy.test.ts` are never edited and pass after the regeneration.
6. **The guide and the record.** The planner's sentence list (§ Files rows, the profile table and
   every inline proof link, the import-placement sentence narrowed to Vite's bundled `postcss-import`
   with the recipe import-first so the rule holds whichever tool inlines it, the executed-recipe
   paragraph's resolution sentence, the service-project paragraph replacing the wrapper paragraph,
   the § Departures rows, § Tests, `tests/setup.css`'s comment), the analyst's additions (§ Scripts,
   `guides/README.md`'s tests column, the roadmap's F8 row), F8b F4 dissolved by the wrapper's
   deletion, F8b F6 struck with its comment and the case retitled, the departure table kept.
7. **Units.** Two, serial, in `/home/user/veneer-f8b` from the checkpoint `d9c03a2` (F8b as
   returned): F8c-A READERS (`opus`; additive; owns `tests/setupServer.ts`,
   `tests/setupServer.test.ts`, `tests/setupService.ts`, `tests/setupService.test.ts`,
   `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `package.json` scripts) → the Orchestrator's
   `scaffold repair --groups configs`, `npm run test:config`, `npm run test:policy` → F8c-B MOVE
   (`opus`; the service proofs, the deletions, `tests/setupBrowser.ts` and its proof, `tests/setup.css`,
   `package.json` `test:src`, the guide, the README, the roadmap). Routing deviation recorded: the
   objective half runs on Opus because a bench exec cannot run Vitest under npm or launch Chromium.
8. **Exit criterion (amended).** The `standalone` profile is proved Tailwind-free by the browser
   styles project; the `tailwind`, `preflight`, and consumer recipes compile in Node through the
   installed PostCSS plugin from their own paths with no alias, wrapper, or bundler standing in;
   every shared class name is important in Veneer or excluded by the recipe, derived per run from
   the built cascade with a floor; every preflight move is a recorded guide row and every row a
   measured move; `tests/setupService.ts` verifies the compiler, the built cascade, the pinned
   browser, and the candidate list, throws loudly on each, and is proved by
   `tests/setupService.test.ts`; `npm run build:src:styles && npm run test:service` is green,
   `test:service` runs from `prepublishOnly` and not from `npm test`; no project collects
   `tests/tailwind/**` and the wrapper does not exist; the guide and the roadmap describe this shape;
   the manifest and the built cascade carry no Tailwind requirement.

Unsettled, carried as the units' observations: the `test:setup` cost of readiness (ruling 2); the
fleet collision of `SheetReader` (`npm run test:policy` in F8c-A, first); a `## Surface` parity
obligation for the new exports (`npm run test:guides` in F8c-B); Chromium property normalization's
parity with the F8b record (F8c-B compares the migrated preflight rows against the checkpoint's).

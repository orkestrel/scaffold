# propagation — scout report (Claude Opus 5.5, read-only, 2026-09-30)

Returned verbatim. Base: `tmp/units/propagation-map.txt`. Paths are relative to `C:/Users/mikes/WebstormProjects/scaffold`.

## Hits

1. `src/core/types.ts`
- :4 `Environment = 'core' | 'browser' | 'server'`. This is the only environment type. There is no Surface, Axis, Target or Extension type.
- :7 `BuildFormat`.
- :18 `Origin = 'host' | 'template' | 'computed'`.
- :31 `Ownership = 'content' | 'presence' | 'birth'`, with the semantics in the TSDoc at :20-30.
- :34 `Group` (manifest, configs, source, tests, guides, docs, orchestration).
- :51 `Drift`.
- :74 `SrcDefinition` {configs, project, path, formats}.
- :85 `AppDefinition` {configs, project, entry?}.
- :103 `ViteMachinery` {browser, vue, output, showcase}, documented at :91-102.
- :176 `Override`.
- :213 `Blueprint`. Axes `src`/`app: Environment[]` at :217-218. Structural facts at :225-235: bin, setup, guides, integration, conformance, service, vendors, global, showcase, journey, skills. The TSDoc at :181-212 says these facts are set only when the file exists.
- :239 `SetupRuntime = 'node' | 'browser'`.
- :322 `HostFile` and :352 `Mirror`.
- :371 `ArtifactBase` (group :373, ownership :374).
- :394 `HostArtifact` (origin 'host', ownership presence|birth, `pointer?` :398).
- :413 `HydratedArtifact` (host, content).
- :422 `ContentArtifact` (template|computed, content).
- :438 `Artifact` union; :452 `Plan`; :488 `Finding`; :588 `Scaffolding`; :604 `CompilerOptions`.
- Selection model: nothing is recorded. `init` does not exist, and the blueprint is re-derived from the target each run (see Q5).

2. `src/core/constants.ts`
- :13 `ENVIRONMENTS` ['core','browser','server'].
- :43 `SRC_MATRIX`: core :44, browser :50, server :59, each with configs, project label, exports subpath, and formats.
- :79 `APP_MATRIX`: core :80, browser :84 (entry `app/browser/index.html`), server :92.
- :103 `BIN_CONFIGS`; :109 `BIN_ENTRY_PATH`.
- :132 `HOST_PATHS` (vendored, presence-owned). It includes `tests/config.test.ts` :138, `configs/helpers.ts` :139, `configs/policy.ts` :140, `.oxlintrc.json` :145 and `.prettierignore` :147.
- :185 `CANON_PATHS`; :221 `SEED_GUIDE_PATHS`; :227 `HOST_INVENTORY_PATH='host.json'`; :238 `WORKSPACE_OWNED_PATHS`.
- :335 `TARGET_SKILL_NAMES` (includes `orkestrel-journey` :341).
- Structural-fact paths: :349 `GLOBAL_SETUP_PATH`, :352 `GUIDES_TEST_PATH`, :371 `INTEGRATION_TEST_PATH`, :377 `CONFORMANCE_TEST_PATH`, :380 `SERVICE_SETUP_PATH`, :389 `SHOWCASE_CONFIG_PATH`, :392 `JOURNEY_CONFIG_PATH`, :395 `SKILLS_CONFIG_PATH`.
- :563 `BASE_DEV_DEPENDENCIES`: guide, probe, scaffold, test, @types/node, oxfmt, oxlint, typescript, vite, vitest.
- Per-environment dependency tables: :583 `DECLARATION_DEV_DEPENDENCIES`, :588 `SOURCE_BROWSER_DEV_DEPENDENCIES`, :594 `APP_DEV_DEPENDENCIES`, :599 `APP_BROWSER_DEV_DEPENDENCIES` (vue entries :602-604), :617 `SHOWCASE_DEV_DEPENDENCIES`, :622 `APP_SERVER_DEV_DEPENDENCIES`.
- There is no table keyed by environment for wrappers, aliases, lint blocks, scripts or exports beyond the two matrices. Those are computed inline in compilers.ts.

3. `src/core/compilers.ts`
- :132 `srcToEntry`; :168 `srcToExports`.
- :221 `blueprintToDevDependencies` (showcase at :230).
- :282 `blueprintToScripts`: lint :293-294; check chain :299-324, including `vue-tsc` :320 and `check:skills` :324; test chain :328-377, including `test:journey` :328/:364-365 and conformance :335/:371; build :386+; showcase scripts :410-414; prepublish :426.
- :464 `blueprintToWritableScripts`.
- :534 `blueprintToManifest`: `bin` :575, `files` :576, `sideEffects` :584.
- :630 `blueprintToMachinery`: vue :637, output :638, showcase :639.
- :673 `blueprintToRootTsconfig`: aliases :674-694, filled into `CONFIG_TEMPLATES.root.tsconfig` :708.
- :731 `blueprintToRootVite`: global setup :737; vue import :740, showcase import :741; factories bin :803, guides :849, skills :853, conformance :857, service :861, integration :869; showcaseFactory :812, journeyFactory/journeyExclude :816-817, plugins :843; journey block :890-906.
- :927 `blueprintToConfigArtifacts`: `tsconfig.json` :930, `vite.config.ts` :937, `configs/browsers.ts` :949 (all content-owned); per-environment wrappers :972/:993/:1077; showcase wrapper :1084-1091, content-owned :1088; journey wrapper :1094-1101, birth-owned :1098; skills :1104-1108; `*.vue` tsconfig includes :1013/:1028.
- :1139 `blueprintToSourceArtifacts` (app/browser main and index.html, birth-owned :1163-1173).
- :1237 `blueprintToTestArtifacts`: setup.ts :1240, setupBrowser.ts :1249, setupServer.ts :1257-1259.
- :1419 guide artifacts; :1493 document artifacts; :1609 `blueprintToHostArtifacts` (presence-owned host paths :1610-1634).
- :2339 `blueprintToQuestions`: the integration gate :2397, showcase question :2422-2426, journey question :2430-2434.
- :2211 `planToFindings`.
- `.oxlintrc.json`, `.prettierignore`, `configs/helpers.ts` and `tests/config.test.ts` are not emitted by any compiler. They are host-vendored through `HOST_PATHS`.
- How facts are selected: `CLI.ts#derive` :955-997 sets each fact from whether its exact-case file exists (conformance :967/:991, skills :972/:996).
- How repair decides: `src/server/Materializer.ts:304` `repair` writes only `missing` or `stale` findings (:318-326). Drift comes from `src/core/helpers.ts:558` `inferDrift`: birth and presence are always `aligned` (:559/:561). `helpers.ts:645` `matchesDriftReachability`. `src/bin/helpers.ts:520-527` holds the ownership tallies.

4. `src/core/templates.ts`
- :28 `CONFIG_TEMPLATES`. Root tsconfig is :30 and root vite is :63 (placeholder `{{journey}}`).
- :119 `mergeOverride`.
- `factories.src` :175: `srcCore` :176, `srcBrowser` :197, `srcServer` :234, `srcBin` :268.
- `factories.app` :309: `appCore` :310; `appBrowser` :326, with plugins including `vue()` at :330 and setup files at :347; `appJourney` :359/:362, with label `journey:${variant.name}` at :371; `appShowcase` :388/:389, output `dist/showcase` :390, plugin `orkestrel-showcase-html` :399; `appServer` :430.
- Workspace factories: `policy` :461, `config` :475 (include at :480), `setup` :493, `setupBrowser` :508, `guides` :525, `skills` :540, `conformance` :559, `service` :575, `distribution` :595, `probe` :611, `integration` :633.
- `tsconfigs`: src :648 and app :707. The app browser tsconfig sets `"types": ["vite/client","vue"]` at :731. There are also `bin` :750 and `skills` :769.
- `vites`: src :781 and app :870, with `showcase` :881 and `journey` :886 (imports `JourneyVariant`).
- :897 test; :904 `browsers` (the `configs/browsers.ts` body); Chromium constants and resolvers :922-1192.
- :1242 `ARTIFACT_TEMPLATES`: source.browser html :1245, tests.global :1260, distribution :1280, integration :2349, docs :2360, guides :2410, orchestration :2428.
- There is no `srcStyles` and no styles template.

5. CLI
- Verbs: `src/bin/helpers.ts:237-265` and `CLI.ts:216-226` define `new`, `audit`, `repair`, `catalog`, `overwrite`.
- Options: `src/bin/constants.ts:113` `OPTION_SUMMARY` and :140 `VERB_OPTIONS` (new :141, audit :151, repair :158, catalog :165, overwrite :166).
- `CLI.ts:233` `#create` (`new`) builds the blueprint from options and sets `journey: app.includes('browser')` at :239.
- `CLI.ts:299` `#inspect`; :347 `#restore` (repair re-derives at :350 and :382); :488 `#replace`; :955 `#derive`.
- `src/bin/helpers.ts:955` `targetToEnvironments` reads the physical `src/<env>` and `app/<env>` directories. :1171 is `selectionToEnvironments`.
- Journey chain check: `CLI.ts:1145-1150`.
- `host.json` is the vendored-file inventory only (`src/server/helpers.ts:1843/1885`, `src/server/types.ts:103`). It records no selection.

6. `tests/config.test.ts` (scaffold's own copy; host-vendored to targets via `constants.ts:138`)
- :103 `describe('root configuration')`.
- :136 projects case, with per-environment expectations at :148-184 (src:core, src:browser, src:server, src:bin, app:core, app:browser, app:server).
- :454 wrapper case: showcase and journey requirements :468-472, planted journey fixture :488-508, wrapper regex :518, journey projects :533-552, `dist/showcase` :560, `['vite/client','vue']` :602, variant checks :608-647.
- :669 script gates.
- :785 host inventory.
- :2065 `describe('configuration helpers')`, with `isStylesheetPath('src/styles/index.scss?direct')` at :2212.

7. Guides
- `guides/README.md`: headings at :6, :28, :36, :68. Journey text is at :19-21.
- `guides/scaffold.md` sections: Command line :500 and Baselines :513 (journey/showcase selection :599-607); Reading a target :618 (:627-628); Blueprint :876 (facts :932-933, Vue setup :953-956, showcase :999, journey :1003-1021); Dependency floors :1414 (vue seeds :1432); Generated workspace :1704; Limits :1956, where the no-styles-axis statement is at :2014-2016; Tests :2209.
- `guides/test.md` journey layer: :5, :33, :223, :1393, :1606.
- `guides/supervisor.md` showcase: :2869-2915.

8. Rules
- `.claude/rules/workspace.md`: Environments table :17-34, with `src/styles/` at :24 and :35; Aliases :42-54, with `@src/styles` at :49; Build outputs :93-111, with `dist/src/styles` at :100 and `dist/showcase` at :104-110; Test project matrix :113-199: `src:styles` :123, `journey:<variant>` :138, journey rule :154-158, scripts :196-199; Isolation table, with `src:styles` :222 and tsconfig.styles :232; Script table :237-259, with showcase entries :244-246; Vue: :207, :263, :269.
- `.claude/rules/tests.md` § Cross-cutting proofs :46-93 (table :51-61). Vue at :196 and :198.
- `.claude/rules/browser.md`: :4 glob `app/browser/**/*.{ts,vue}`, :9 title, :11 `$emit` ban.
- `.claude/rules/application.md`: showcase at :58. There is no journey mention. Vue at :23-24, :35, :39, :48.
- `.claude/rules/styles.md` has globs `src/styles/**/*` at :4.

9. `vue`, everywhere (43 hits in 14 files)
- src: compilers.ts :320, :627, :637, :740, :843, :891, :906, :1013, :1028; constants.ts :598, :602-604; types.ts :98, :105; templates.ts :330, :731.
- guides: scaffold.md :110, :953, :955, :956, :1432; supervisor.md :2243, :2868, :3557.
- rules: workspace.md :207, :263, :269; tests.md :19, :196, :198; browser.md :4, :9, :11; application.md :23, :24, :35, :39, :48; architecture.md :4, patterns.md :4, names.md :3, typescript.md :3.

10. `.orkestrel`
- The root `.orkestrel/plan.md`, `ledger.md` and `release.md` are absent. Nested files that exist: `.orkestrel/veneer/plan.md`, `.orkestrel/veneer/ledger.md`, `.orkestrel/contract/plan.md`. There is no `release.md` anywhere.

## Shape

- Only one environment axis type exists (`core|browser|server`), used twice (`src` and `app`), plus boolean structural facts on `Blueprint`. There is no surface, extension or styles concept.
- Vue is implied by `app` including `browser`, through `ViteMachinery.vue` (`compilers.ts:637`). Showcase and journey are gated the same way.
- Selection is never stored. `#derive` re-reads directories and exact-case files on every audit or repair.
- Showcase wrapper is content-owned and journey wrapper is birth-owned. Setup files and app sources are birth-owned. `config.test.ts`, `helpers.ts`, `.oxlintrc.json` and `.prettierignore` are host-vendored presence files.
- Repair writes only missing or stale findings. Birth and presence files are always aligned, so repair never replaces them.
- Rules describe `src/styles` and `src:styles`. Code and `scaffold.md:2014` state that scaffold emits no styles axis.

## Not found

- In `src`: `srcStyles`, `setupStyles`, and the verbs `'init'`, `'publish'` and `'scout'` (no hits).
- `extension` as a scaffold concept (only file-extension hits).
- Globs `.orkestrel/*.md` and `.orkestrel/**/release.md`.
- Any per-environment table in constants for aliases, lint blocks or scripts.

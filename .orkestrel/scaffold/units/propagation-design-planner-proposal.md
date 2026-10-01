# propagation-design — planner proposal

Returned verbatim (subjective lane, Claude Opus 5.5, native Agent dispatch, 2026-09-30, 919 s); immutable. Lane: subjective. This lane covers the vocabulary, the type shapes, the template and guide shape, and the exact rule sentences. For data flow, ownership semantics, and proof mechanics, this proposal cites the distillates and leaves the ruling to the objective lane. Each judgment call carries a label from J1 to J9 and sits where it arises.

## Answers

1. **The model.**
   - **Vocabulary.** The proposal keeps four terms apart, following `AGENTS.md:52` ("One concept, one term").
     - An **environment** is a directory on an axis. It stays `core | browser | server` (`src/core/types.ts:4`).
     - A **surface** is what an extension extends: `browser` or `styles`. The browser surface is the `browser` environment on both axes, plus its journey and its showcase. The user's wording on 2026-09-30 sets this: "Vue extending the src, app, journey, and showcase of the browser surface … bootstrap and tailwindcss extending the styles surface" (brief `:7`). The brief also describes an extension as "a name plus the surface it extends" (brief `:28`). That sentence holds only when `browser` is a surface.
     - An **extension** is a name plus the surface it extends.
     - A **face** is one published `src/<name>` subpath. The guide already uses this word at `guides/scaffold.md:901`. A **sheet face** is a CSS face: `src/styles` or a styles extension.
     - A **mode** is one application that the journey and the showcase run under a Vite mode. The base mode is `browser`, and each browser extension adds one mode.
   - **Journey and showcase.** They stay the existing boolean structural facts (`src/core/types.ts:233-234`), and each browser extension extends them with a mode. **J1** (Orchestrator): the brief lists styles, journey, and showcase as surfaces (brief `:28`), but the user's framing makes journey and showcase parts of the browser surface. This proposal follows the user. If the Orchestrator rules that `Surface` includes `journey` and `showcase`, the union grows and `extensions` still types `surface` as the extendable pair.
   - **Types in `src/core/types.ts`.** These are the load-bearing shapes:

     ```ts
     /** Names what an extension extends: the browser environment family or the styles surface. */
     export type Surface = 'browser' | 'styles'

     /** Names one framework a browser extension binds. */
     export type Framework = 'vue'

     /**
      * Represents one framework extension of the browser surface.
      *
      * @remarks
      * `name` is the framework, its package, the Vite plugin binding, and the directory the
      * extension occupies under each axis whose `browser` environment is selected.
      */
     export interface BrowserExtension {
     	readonly surface: 'browser'
     	readonly name: Framework
     }

     /**
      * Represents one named sheet extending the styles surface.
      *
      * @remarks
      * `name` is the `src/<name>` directory of a sheet face beside `src/styles`.
      */
     export interface StylesExtension {
     	readonly surface: 'styles'
     	readonly name: string
     }

     /** Represents one extension, discriminated by the surface it extends. */
     export type Extension = BrowserExtension | StylesExtension

     /** Describes the build, check, and dependency machinery one browser framework contributes. */
     export interface FrameworkDefinition {
     	readonly plugin: string
     	readonly checker: string
     	readonly sources: readonly string[]
     	readonly packages: readonly string[]
     	readonly dependencies: Readonly<Record<string, string>>
     }
     ```

   - **Blueprint fields.** `Blueprint` (`src/core/types.ts:213-236`) gains three fields:
     - `readonly extensions: readonly Extension[]`, placed after `app`.
     - `readonly styles: boolean`, a structural fact.
     - `readonly themes: boolean`, a structural fact.

     `ViteMachinery.vue` (`src/core/types.ts:105`) becomes `readonly frameworks: readonly Framework[]`, so the root imports `import {{name}} from '{{plugin}}'` once per framework.
   - **Why these shapes.**
     - The discriminant is `surface`. It names the axis, as `.claude/rules/names.md:118` and `AGENTS.md:57` require.
     - Every member is one word.
     - `Framework` is closed because `.oxlintrc.json` and `configs/helpers.ts` are vendored byte-identical (`.claude/rules/workspace.md:70-71`, `src/core/constants.ts:132-148`). A lint block or a boundary classification can therefore exist only for a name scaffold ships.
     - `StylesExtension.name` is open because a sheet face needs no identifier, only paths and labels. `NAME_PATTERN` (`src/core/constants.ts:398`) admits hyphens, which a factory identifier could not carry.
   - **Constants in `src/core/constants.ts`.**
     - `SURFACES: readonly Surface[]` holds `['browser', 'styles']`, the gate candidates.
     - `FRAMEWORKS: readonly Framework[]` holds `['vue']`.
     - `FRAMEWORK_MATRIX: Readonly<Record<Framework, FrameworkDefinition>>` holds `vue: { plugin: '@vitejs/plugin-vue', checker: 'vue-tsc', sources: ['vue'], packages: ['vue', '@vue/'], dependencies }`. The `dependencies` move out of `APP_BROWSER_DEV_DEPENDENCIES` (`src/core/constants.ts:599-605`).
     - `STYLES_ENTRY_PATH` is `'src/styles/index.scss'`.
     - `THEMES_ENTRY_PATH` is `'src/styles/themes/sheet.ts'`.
     - `SHOWCASE_PAGES_PATH` is `'showcase'`.
     - `STYLES_DEV_DEPENDENCIES` holds `{ sass: '^1.105.1' }`, the range veneer pins at `package.json:144`.
   - **Relations.**
     - A browser extension projects `src/<framework>` when `src` selects `browser`, `app/<framework>` when `app` selects `browser`, one journey mode when `journey` is set, and one showcase mode when `showcase` is set.
     - A styles extension requires `styles`.
     - An extension whose surface is absent draws a non-blocking `extensions` question and emits nothing. This mirrors showcase without a browser application (`guides/scaffold.md:999-1001`).
     - A repeated `surface:name`, a sheet name that fails `NAME_PATTERN`, and a sheet named `core`, `browser`, `server`, `bin`, `styles`, or any framework each draw a blocking question.
     - The compiler emits extensions in `FRAMEWORKS` order, then sheets by code-unit order, so content-owned bytes are stable.
   - **Derivation in `#derive` (`src/bin/CLI.ts:955-998`).** Nothing is stored. Each field is read from the tree:
     - `styles` is the exact-case file `src/styles/index.scss`.
     - `themes` is the exact-case pair `src/styles/themes/index.scss` and `src/styles/themes/sheet.ts`.
     - `showcase` is the exact-case file `configs/app/vite.showcase.config.ts` or a physical `showcase/` directory.
     - `journey` is unchanged (`src/bin/CLI.ts:995`).
     - A browser extension is each `FRAMEWORKS` name whose `src/<name>` or `app/<name>` is a physical directory.
     - A styles extension is each physical `src/<name>` directory, other than a reserved name, that holds the exact-case `index.scss` beside `sheet.ts`.

     A helper `targetToExtensions(target)` sits beside `targetToEnvironments` (`src/bin/helpers.ts:955-960`).
   - **`new` options.** They extend `VERB_OPTIONS.new` (`src/bin/constants.ts:141-150`) and `NewCommand` (`src/bin/types.ts:67-79`):
     - `--styles` sets `styles: boolean`.
     - `--showcase` sets `showcase: boolean`, and requires `--app browser`.
     - `--extend <list>` sets `extensions?: string`. Each entry is `surface:name`, for example `--extend browser:vue,styles:print`.
     - Journey stays implied by `--app browser` (`src/bin/CLI.ts:239`).
     - Themes has no creation option. It is file-selected like `conformance` (`guides/scaffold.md:603-608`).

2. **The styles surface.**
   - **What each sheet face gets.** `styles` produces the face `styles`, and each styles extension produces the face `<sheet>`. Each face gets these birth-owned files:
     - `src/<face>/index.scss`, which contains `@use 'tokens'; @use 'elements'; @use 'components'; @use 'utilities';`.
     - `_tokens.scss`, which holds the order statement `@layer reset, theme, elements, components, utilities;`.
     - An empty `_mixins.scss`.
     - `elements/_index.scss`, `components/_index.scss`, and `utilities/_index.scss`, each empty.
     - `sheet.ts`, which contains `import './index.scss'` and nothing else.
     - `index.ts`, which contains `export * from './sheet.js'`.
     - `tests/src/<face>/index.test.ts`.

     Each face also gets two content-owned wrappers:
     - `configs/src/vite.<face>.config.ts`, which calls `sheetProject` with `outputBoundary('dist/src/<face>')`, `cssMinify: false`, `emptyOutDir: true`, and `lib.entry` of `src/<face>/sheet.ts` with `formats: ['es']`, `fileName: 'index'`, and `cssFileName: 'index'`. The test label is `src:<face>` and the include is `tests/src/<face>/**/*.test.ts`.
     - `configs/src/tsconfig.<face>.json`, which is check-only with `lib: ['ESNext']` and `types: ['vite/client']`, and includes `src/<face>`.
   - **What the workspace gets once.**
     - An empty birth-owned `tests/setupStyles.ts`. Scaffold generates no setup proof for an empty seed (`guides/scaffold.md:946`). Its proof is the config case in answer 8 that requires the module in every sheet project's `setupFiles`.
     - `tests/setupBrowser.ts` and `configs/browsers.ts`, because `ViteMachinery.browser` turns on.
     - In the content-owned root `vite.config.ts`: the `sheetProject` factory (veneer `vite.config.ts:182-192`: Chromium provider reused from `srcBrowser`, `isolate: false`, `setupFiles` of `setup.ts`, `setupBrowser.ts`, and `setupStyles.ts`) and the `optimizeDeps` constant (veneer `vite.config.ts:15-18`).
     - In the manifest:
       - `exports` of `./<face>` → `./dist/src/<face>/index.css` and `./<face>/scss` → `./src/<face>/index.scss`.
       - `files` of `dist/src`, one `!dist/src/<face>/index.js` per face, one `src/<face>/**/*.scss` per face, and `README.md`.
       - `sideEffects` of `['**/*.css', '**/*.scss']`, plus the bin pair when `bin` is set.
       - `check:src:<face>`, set to `tsc --noEmit -p configs/src/tsconfig.<face>.json`.
       - `build:src:<face>`.
       - `test:src:<face>`, set to `npm run build:src:<face> && vitest run --config configs/src/vite.<face>.config.ts --no-cache --reporter=dot`.
       - `sass` plus the Playwright pair in `devDependencies`.
   - **Themes.** When `themes` is set, scaffold adds:
     - The content-owned `configs/src/vite.themes.config.ts` (veneer `configs/src/vite.themes.config.ts:5-20`).
     - `./styles/themes` and `./styles/themes/scss` in `exports`.
     - `!dist/src/styles/themes/index.js` in `files`.
     - `build:src:styles`, set to `vite build --config configs/src/vite.styles.config.ts && vite build --config configs/src/vite.themes.config.ts` (veneer `package.json:116`).
   - **What exists today.** The following table compares veneer's foundation, the generator, and this proposal.

     | Item | Veneer's foundation | Generator at `85bd9bc24` | This proposal |
     | --- | --- | --- | --- |
     | Kind files and folder barrels | By hand, six folders (`ROADMAP.md:93-111`) | None (`guides/scaffold.md:2014-2016`) | Three folders, with a uniform `sheet.ts` entry (J2) |
     | Styles build entry | `src/styles/index.ts` side-effect import (`src/styles/index.ts:1`) | None | `sheet.ts` for every face |
     | `sheetProject`, `isolate: false`, `optimizeDeps` | By hand (`vite.config.ts:15-18`, `:182-192`) | None | Generated |
     | Wrappers, exports, `files`, `sideEffects`, scripts | By hand (`package.json:13-28`, `:48-61`, `:74-127`) | None | Generated |
     | Themes target | By hand (`configs/src/vite.themes.config.ts`) | None | Generated |
     | Stylesheet classification | Present | Present (`tests/config.test.ts:2212`) | Kept |
     | Excluded stylesheet subpath in the distribution proof | Present | Present (`guides/scaffold.md:2136`) | Kept |
   - **J2** (design fit): veneer uses a side-effect `index.ts` for `styles` and `sheet.ts` for the extensions (`ROADMAP.md:60`).
     - One entry shape gives one wrapper template.
     - It retires the barrel exception at `.claude/rules/workspace.md:35` against `.claude/rules/architecture.md:258`.
     - The cost is one edit to veneer's birth-owned `src/styles/index.ts`.
     - The generated folder set is `elements`, `components`, and `utilities`, which is veneer's narrower set (`ROADMAP.md:93`). A `surfaces/` folder would reuse the concept word (answer 7, Law conflicts).
   - **J3** (objective lane): veneer runs `setup` and `conformance` with `pool: 'threads'` and `isolate: false`, and loads `tests/setupServer.ts` on `conformance` (`vite.config.ts:223-239`, `:348-363`). Veneer also composes `integration` through `sheetProject` (`vite.config.ts:211-221`). This proposal emits all three when `styles` is set, and gives `tests/setupServer.ts` birth to the styles surface. The objective lane rules whether those changes are conditional on `styles`.

3. **The extension mechanism.**
   - **What `vue` on browser adds.**
     - In `src`:
       - A birth-owned empty `src/vue/index.ts`.
       - A content-owned `configs/src/tsconfig.vue.json` (emit plus check, `DOM`, `vite/client`; veneer `configs/src/tsconfig.vue.json:1-18`).
       - A content-owned `configs/src/vite.vue.config.ts` that calls the root `srcVue`. Its external predicate is `enforceFrameworkExternal(id, peers, ['vue', '@vue/'])`, and its declaration rollup has `rewrite: (content) => rewriteBrowserSpecifier(rewriteCoreSpecifier(content))` (veneer `configs/src/vite.vue.config.ts:16-41`).
       - `./vue` as an import-only ES export.
       - `check:src:vue` through `tsc`, plus `build:src:vue`.
       - `src:vue` registered in root `projects`.
     - In `app`:
       - A birth-owned `app/vue/index.ts`, `index.html`, `main.ts`, and `App.vue`.
       - A content-owned `configs/app/tsconfig.vue.json`, which adds `vue` types and `*.vue` includes (veneer `configs/app/tsconfig.vue.json:1-24`).
       - A content-owned `configs/app/vite.vue.config.ts`, which is `defineConfig(appVue())`.
       - A root `appVue` factory.
       - `check:app:vue` through `vue-tsc`, plus `build:app:vue`, `dev:vue`, and `test:app:vue`.
     - Across the workspace:
       - The `@src/vue` alias and the `@app/vue` alias (veneer `tsconfig.json:28`).
       - The `@orkestrel/<name>/vue` self-specifier.
       - The vendored `.oxlintrc.json` blocks for `src/vue/**` and `app/vue/**` (veneer `.oxlintrc.json:221-263`, `:397-435`).
       - Browser classification of `/vue` owners in `configs/helpers.ts` (veneer `configs/helpers.ts:483-543`).
       - The `journey` and `showcase` modes `vue`, which collect `tests/app/vue/integration.test.ts` and write `showcase/vue.html`.
   - **J4** (Orchestrator): retiring Vue from `app/browser`.
     - The retirement drops `vue()` from `appBrowser` (`src/core/templates.ts:330`), makes `check:app:browser` use `tsc` (`src/core/compilers.ts:319-321`), and removes `vue` types and includes (`src/core/templates.ts:731`, `src/core/compilers.ts:1013`).
     - Vue then enters a workspace only through the extension, which matches the user's framing. Veneer's `app/browser` holds no `.vue` file (veneer `app/**` holds `.vue` only under `app/vue`).
     - `AGENTS.md:64` requires every consumer to move in the same change. Unverified run: glob `app/browser/**/*.vue` in each fleet checkout before ruling.
   - **J5** (objective lane): test runtime for the framework projects.
     - This proposal runs `src:vue` and `app:vue` in Chromium, mirroring `src:browser` and `app:browser`.
     - Veneer's `src:vue` and `app:vue` run in Node (`configs/src/vite.vue.config.ts:42-52`, `configs/app/vite.vue.config.ts:25-34`).
     - Veneer's `tests/src/vue/index.test.ts:1-26` reads built artifacts through `tests/setupServer.ts`, so it moves on adoption.
   - **What a styles extension adds.** It gets every item of answer 2, keyed by its name, through the same `sheetProject`. The existing `conformance` fact stays file-selected and unchanged, apart from J3.
   - **Name-parameterized template.** `templates.ts` stays data (`.claude/rules/architecture.md` § Kind purity). Each template takes `{{name}}`, and a framework template also takes `{{factory}}`. `fillTemplate` fills the slots (`src/core/compilers.ts:26`) from a gate-validated name. The sheet wrapper at `CONFIG_TEMPLATES.vites.src.sheet` reads as follows:

     ```ts
     sheet: `import { defineConfig } from 'vitest/config'
     import { outputBoundary } from '../helpers.js'
     import { resolveWorkspacePath, sheetProject } from '../../vite.config.ts'

     // Lightning CSS minify rewrites the layer order statement, so the build keeps the authored order.
     export default defineConfig(
     	sheetProject({
     		plugins: [outputBoundary('dist/src/{{name}}')],
     		build: {
     			outDir: 'dist/src/{{name}}',
     			emptyOutDir: true,
     			cssMinify: false,
     			lib: {
     				entry: resolveWorkspacePath('src/{{name}}/sheet.ts'),
     				formats: ['es'],
     				fileName: 'index',
     				cssFileName: 'index',
     			},
     		},
     		test: {
     			name: { label: 'src:{{name}}', color: 'magenta' },
     			include: ['tests/src/{{name}}/**/*.test.ts'],
     		},
     	}),
     )
     `,
     ```

     `CONFIG_TEMPLATES.factories.app.framework` opens `export function {{factory}}(override?: UserConfig): UserConfig` and composes `appBrowser()` with `plugins: [outputBoundary(output), environmentBoundary('app/{{name}}'), {{name}}()]`, `input: resolveWorkspacePath('app/{{name}}/index.html')`, and the label `app:{{name}}`. `{{factory}}` is `app` plus the capitalized framework name. That identifier is safe because `Framework` is closed.
   - **How the config proof enumerates.** `tests/config.test.ts` is vendored, so it names nothing. It reads the tree through two helpers in `configs/helpers.ts`, each proved against a scratch tree:
     - `collectFrameworks(root)` returns each `FRAMEWORK_NAMES` member that has `src/<name>` or `app/<name>`.
     - `collectSheets(root)` returns each `src/<name>` holding `index.scss` beside `sheet.ts`, plus `styles`.

     A case pins `FRAMEWORK_NAMES` in the leaf to `FRAMEWORKS` from `@orkestrel/scaffold`, which `BASE_DEV_DEPENDENCIES` declares (`src/core/constants.ts:563`). The leaf cannot import the package itself: in scaffold's own checkout, `vite.config.ts` would then wait on `dist`, which the build writes through `vite.config.ts`.

4. **The showcase.**
   - **Wrapper and factory.** The content-owned wrapper becomes `export default defineConfig(({ mode }) => appShowcase(mode))`. It stays content-owned, so `repair` restores it (`src/core/compilers.ts:1084-1091`). The root `appShowcase(mode, override?)`:
     - resolves the application with `resolveApplication(mode, Object.keys(applications))`, where `applications` is the compiled record `{ browser: appBrowser, vue: appVue }`;
     - reads `app/<application>/index.html`;
     - writes `showcase/<application>.html` with `emptyOutDir: false`;
     - stamps the page in `generateBundle` after `vite:singlefile` through `stampPage`;
     - renames `index.html` after write, as veneer measured (`configs/app/vite.showcase.config.ts:19-73`).
   - **Scripts.** `showcase`, `showcase:<framework>`, `build:showcase`, and `build:showcase:<framework>`. `prepublishOnly` runs `npm run build && npm run build:showcase && npm run build:showcase:<framework> … && npm test` (veneer `package.json:127`).
   - **Formatting.** `.prettierignore` lists `showcase/` (veneer `.prettierignore:7-8`).
   - **Helpers.** `computeStamp` and `stampPage` stay under veneer's names in `configs/helpers.ts` (`:450-481`), proved by the cases in answer 8. No test gates the pages (`ROADMAP.md:70`).
   - **Retired.**
     - `dist/showcase` (`src/core/templates.ts:390`).
     - The ISO stamp (`src/core/templates.ts:403`).
     - The `show` script and `demo/showcase.html` (`src/core/compilers.ts:413-414`, `.claude/rules/workspace.md:104`, `:108`, `:246`, `:259`).
   - **Ownership.** The wrapper is content-owned. The pages are build outputs that the package commits. They are not planned artifacts, so they carry no ownership. They sit under no vendored root and no canon path, so no verb reports them `foreign` (host distillate `:44`).
   - **Private workspaces.** A `private` workspace has no `prepublishOnly` (`.claude/rules/workspace.md:175-178`), so its pages rebuild only through `build:showcase`.

5. **The journey.**
   - **Root factory.** `appJourney(variant, variants, mode?)` resolves the application the same way as `appShowcase`. It spreads that application's factory and sets:
     - `include` to `tests/app/<application>/integration.test.ts`;
     - `exclude` to `[]`;
     - `provide` to `{ variant: variant.name, variants, capture }`;
     - the viewport to the variant's size.

     The parameter is optional, so fleet wrappers that call `appJourney(variant, VARIANTS)` (`src/core/templates.ts:898`) keep the base mode with no shim. `capture` loses its Vue gate (`src/core/compilers.ts:890`).
   - **Wrapper.** The birth-owned wrapper keeps the variant list and becomes `defineConfig(({ mode }) => ({ test: { projects: VARIANTS.map((variant) => () => appJourney(variant, VARIANTS, mode)) } }))`. Each application project excludes its own integration suite.
   - **Arrival journey seed.** `ARTIFACT_TEMPLATES.tests.journey`, with slots `{{application}}` and `{{heading}}`, emits a birth-owned `tests/app/browser/integration.test.ts` and one `tests/app/<framework>/integration.test.ts` per framework. The seed:
     - imports `app/<application>/main.js`;
     - resolves `getByRole('heading', { name: HEADING, exact: true, level: 1 })` and asserts `isRendered`;
     - proves `Journey`;
     - asserts no element for each withheld role and proves `Refusal`;
     - proves `Capture` under `capture` through `createPortfolio` and `expandCaptures`;
     - removes each `main` in `finally`.

     This is veneer's shape (`tests/app/browser/integration.test.ts:1-59`, `tests/app/vue/integration.test.ts:1-64`) with the role and state lists inlined, because `.claude/rules/tests.md:188` puts data tables in setup files.
   - **Seeded applications.** The birth-owned `app/browser/main.ts` appends `main > h1` with the workspace name. The birth-owned `app/vue/main.ts` mounts `App.vue` into an appended `main`, and `App.vue` renders the same `h1`.
   - **Scripts.** `test:journey` and `test:journey:<framework>`. The second is `vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --mode <framework>`. Both run after `test:app` in `test` (veneer `package.json:86`, `:101-102`).
   - **J6** (Orchestrator): does the seeded two-variant wrapper owe the `Matrix` family? `orkestrel-journey/SKILL.md:34` owes it "where the surface ships more than one variant". Unverified: read the skill's definition of variant against viewports before the template lands.

6. **The vendored files.** Carrier items follow veneer `ROADMAP.md:150-157`.
   - **`tsconfig.json`** (content, compiled). It carries the `@app/vue` alias (item 2). `blueprintToRootTsconfig` (`src/core/compilers.ts:673-708`) adds `@src/<framework>`, `@app/<framework>`, and `@orkestrel/<name>/<framework>`. `repair` restores it.
   - **`vite.config.ts`** (content, compiled). It carries `sheetProject`, `optimizeDeps`, `setupBrowser`, `conformance`, `integration`, and `appJourney` (items 1, 3, and 6; `ROADMAP.md:159`). `blueprintToRootVite` (`src/core/compilers.ts:731-906`) emits:
     - the `sheetProject` template;
     - `optimizeDeps`, computed from the declared test packages, with the framework package added on each project that compiles it;
     - `srcVue` and `appVue`;
     - the `applications` record;
     - the mode-aware `appJourney` and `appShowcase`;
     - the J3 changes.

     `repair` restores it.
   - **`configs/src/vite.core.config.ts`** (content, template). It carries `isCoreBuildExternal` (item 4). The template (`src/core/templates.ts:782-813`) calls `matchesCoreExternal(id, peers)` in place of the inline predicate.
   - **`configs/app/vite.showcase.config.ts`** (content, template). It carries the Vue mode, the root output, and the final-page stamp (item 3). The template becomes the mode one-liner, and the logic moves into the root `appShowcase`.
   - **`configs/helpers.ts`** (vendored). It carries items 3, 4, and 5 and the `/vue` boundary classification. The release file ships:
     - `matchesCoreExternal`;
     - `enforceFrameworkExternal`, which replaces `isVueBuildExternal`, is the refusal list of item 5, and returns `true` for a framework package that `peers` declares;
     - `rewriteBrowserSpecifier`;
     - `resolveApplication`, which replaces `showcaseBuildOutput`, `showcaseHtmlEntry`, and `journeyTestInclude`, while `showcaseHtmlPresent` retires because the compiled mode set names only derived applications;
     - `computeStamp` and `stampPage`;
     - `collectFrameworks` and `collectSheets`;
     - `FRAMEWORK_NAMES`, with boundary helpers that classify each name as browser.

     The renames follow `.claude/rules/names.md:187` ("`is*`: total `Guard<T>`; never throws"; `isVueBuildExternal` throws at veneer `configs/helpers.ts:337-341`) and `:85-104`. **J7** (other lane): these renames apply only if the objective lane accepts the change to the vendored helper names.
   - **`.oxlintrc.json`** (vendored). It carries the `src/vue` and `app/vue` blocks (item 2). The release file carries those blocks and `.vue` globs. A block over an absent directory matches nothing.
   - **`.prettierignore`** (vendored). It carries `showcase/` (item 3). The release file lists that directory.
   - **`tests/config.test.ts`** (vendored). It carries every case (items 1-6). The release file carries the cases of answer 8.
   - **How an older target receives an updated vendored file.** The host distillate states that a hydrated vendored file is `content` plus `host`, and that `repair` copies it when missing or stale (`src/server/Materializer.ts:896`, `guides/scaffold.md:1182`). Established fact 3 states `presence` with `overwrite` replacing it. The objective lane rules which reading holds. Adoption in answer 9 runs `repair` and falls back to `overwrite`, which covers both readings.
   - **Package-owned leaf.** No behaviour needs one. `appVue` moves from veneer's `configs/app/vite.vue.config.ts:10-37` into the root. Each file under `configs/src` and `configs/app` becomes a thin wrapper, as `.claude/rules/workspace.md:62-63` requires.

7. **Rules and guides.** The exact sentences follow, file by file.

   **`.claude/rules/workspace.md`**
   - Environments table (`:24`). Replace the `src/styles/` row with `| `src/styles/` | Optional styles surface compiled into `index.css` |`. Add these rows:
     - `| `src/<sheet>/` | Styles extension: a named sheet face beside `src/styles/` |`
     - `| `src/<framework>/` | Browser extension: a published framework face over `src/browser/` |`
     - `| `app/<framework>/` | Browser extension: a framework application beside `app/browser/` |`
     - `| `showcase/` | Committed single-file page per showcase mode |`
   - Line `:35`. Replace it with: "A sheet face (`src/styles/` or a styles extension) ships `index.scss` as its compilation barrel, `sheet.ts` as its build entry importing `./index.scss` alone, and `index.ts` star-exporting `./sheet.js`."
   - Add a section `## Surfaces and extensions` after Environments:
     - "A surface is what an extension extends: `browser`, meaning the `browser` environment on both axes with its journey and its showcase, or `styles`. `src/styles/index.scss` selects the styles surface."
     - "An extension is a name plus the surface it extends."
     - "A browser extension names a framework scaffold binds, `vue`. It adds `src/<framework>` when `src` selects `browser`, `app/<framework>` when `app` selects `browser`, one journey mode, and one showcase mode."
     - "Treat `src/<framework>` and `app/<framework>` as browser code: each may import core and browser code on its axis and never server code."
     - "A styles extension names a sheet face `src/<sheet>` holding `index.scss` beside `sheet.ts`, and requires the styles surface. Never name a sheet `core`, `browser`, `server`, `bin`, `styles`, or a framework."
   - Aliases (`:49`). Delete the `@src/styles` row. Add `| `@src/<framework>` | `src/<framework>/index.ts` |` and `| `@app/<framework>` | `app/<framework>/index.ts` |`.
   - Build outputs (`:100`, `:104`, `:106-111`).
     - Replace the rows with:
       - `| `dist/src/<face>` | Compiled `index.css` of a sheet face | CSS; the ES stub stays out of `files` |`
       - `| `dist/src/styles/themes` | Compiled themes `index.css` | CSS |`
       - `| `dist/src/<framework>` | Framework face + declarations | ES |`
       - `| `dist/app/<framework>` | Framework application | target-defined |`
       - `| `showcase/<mode>.html` | Single-file page per showcase mode | self-contained, committed |`
     - Replace `:108-111` with these bullets:
       - "Build a sheet face with `cssMinify` off, so the authored `@layer` statement survives, and bound its output to `dist/src/<face>`."
       - "Build `dist/src/styles/themes` after `dist/src/styles`: the styles build empties its directory, and the themes build empties only its own."
       - "`configs/app/vite.showcase.config.ts` builds one mode per run: the base mode writes `showcase/browser.html` from `app/browser/index.html`, and `--mode <framework>` writes `showcase/<framework>.html` from `app/<framework>/index.html`. The build writes each page in place."
       - "Stamp each page with a `build-id` meta line whose value is the SHA-256 of the final inlined page without that line."
       - "Keep the showcase out of the default build; `prepublishOnly` rebuilds every mode after `npm run build`, and no test gates the pages."
       - "Use Oxc for showcase JS minification and Lightning CSS for CSS."
   - Matrix (`:123`, `:138`, `:154-158`, `:196-199`).
     - The `src:<face>` row reads `| `src:<face>` | `tests/src/<face>/**` | Playwright Chromium, `isolate: false` | `setup.ts`, `setupBrowser.ts`, `setupStyles.ts` |`.
     - Add `src:<framework>` and `app:<framework>` rows: Playwright Chromium with `setup.ts` and `setupBrowser.ts`.
     - The journey row's files read `tests/app/<mode>/integration.test.ts`, with gate "`test` through `test:journey` and `test:journey:<framework>`".
     - Replace `:154-158` with: "When a browser application selects the journey, register `journey:<variant>` projects through the birth-owned `configs/app/vite.journey.config.ts` wrapper, which keeps the adopter's variant list and composes each project through the root `appJourney` factory with the Vite mode. The base mode collects `tests/app/browser/integration.test.ts`, and `--mode <framework>` collects `tests/app/<framework>/integration.test.ts`. Exclude each collected suite from its application project, and run `test:journey` and one `test:journey:<framework>` per browser extension after the application projects in `test`."
     - Add: "Register each sheet-face project in its own wrapper through the root `sheetProject` factory, and run it through `test:src:<face>`, which builds the face first, because each proof reads its built sheet."
     - Add: "Give every browser project `optimizeDeps.include` of the shared test packages the workspace declares, adding the framework package on each project that compiles it, so no dependency is discovered mid-run."
     - Append `test:src:<face>` and `test:journey:<framework>` to the script list at `:196-199`.
   - Isolation (`:207`, `:222`, `:232`).
     - Replace the `src:styles` row with a `src:<face>` row carrying the same values.
     - Extend the browser row to `src:<framework>` and `app:<framework>`.
     - Replace `:232` with "`configs/src/tsconfig.<face>.json` is check-only; `configs/src/tsconfig.<framework>.json` serves emit and scoped checking; `configs/app/tsconfig.<framework>.json` is check-only."
     - Add at `:207`: "When a `vue` extension is selected, run the root `check` through `vue-tsc`, because the root includes single-file components." This sentence is unverified; the run is `npx vue-tsc --noEmit --project tsconfig.json` in veneer with `app/vue/vue.d.ts` deleted.
   - Script table (`:244-246`, `:259`, `:269`).
     - The showcase rows become `| `showcase` / `showcase:<framework>` | Showcase dev server of the base or framework mode |` and `| `build:showcase` / `build:showcase:<framework>` | Build `showcase/browser.html` or `showcase/<framework>.html` |`.
     - Add `| `test:src:<face>` | Build the sheet face, then run its wrapper project |`.
     - Delete the `show` row and `:259`, and add: "`.prettierignore` lists `showcase/`, so formatting never expands a committed page."
     - `:269` becomes "Browser framework: Vue 3 through the `vue` browser extension."

   **`.claude/rules/tests.md`**
   - `:199` becomes "`tests/setupStyles.ts`: CSSOM and sheet helpers that every sheet-face project loads after `tests/setupBrowser.ts`."
   - After `:93`, add: "`tests/app/browser/integration.test.ts` and each `tests/app/<framework>/integration.test.ts` are arrival journeys: the journey collects each in its own mode, and its application project excludes it."

   **`.claude/rules/styles.md`**
   - Frontmatter `paths` adds `'src/*/sheet.ts'`.
   - `:20` becomes "The face's reset declarations, when that face owns a reset."
   - `:47-48` ends "… records tokenization and accessibility additions in its separate authored face."
   - Add a section `## Folders`:
     - "Give each folder an `_index.scss` barrel that `@use`s its partials; an empty folder keeps its barrel."
     - "`elements/` styles one element for that element's sake; `components/` is a class skin that applies with no script running; `utilities/` is a class setting one property."
     - "Add another folder only when the face has that job, with its own barrel and its own layer."
   - After `:61`, add: "Declare the order statement in each face's `_tokens.scss`; a face that writes a layer the statement lacks adds it to every face's statement."

   **`.claude/rules/application.md`**
   - Under J4, `:23-24` becomes "app/browser uses app/core contracts, an `index.html` entry, `tsc`, and real Chromium tests. The `vue` extension adds `app/vue`, with its own `index.html` entry, `vue-tsc`, and real Chromium tests."
   - `:39-40` becomes "Vue SFCs belong to a framework application and CSS to browser code; SCSS compiles through the `sass` dependency the styles surface declares."
   - `:48-49` ends "and `vue` stays a development dependency, and becomes an optional peer only where `src/vue` imports it."

   **`.claude/rules/browser.md`**
   - `paths` (`:2-6`) adds `'src/vue/**/*.ts'`, `'app/vue/**/*.{ts,vue}'`, and `'tests/{src,app}/vue/**/*'`.

   **`.claude/rules/documentation.md`**
   - After "A showcase is executable proof of public API", add: "The showcase column of the concept index names the `showcase/<mode>.html` page that demonstrates the row."

   **`guides/scaffold.md`**
   - Help (`:552`, `:563-566`). Add `[--styles] [--showcase] [--extend <list>]` to the `new` line, plus these options:
     - `--styles`: "scaffold the styles surface at src/styles/index.scss".
     - `--showcase`: "build one single-file page per browser application into showcase/".
     - `--extend <list>`: "the extensions to add, each surface:name: browser:vue, styles:<name>".
   - `:598-609`. Add: "`new --styles` creates the styles surface. `new --showcase` creates the showcase wrapper and one page script per mode. `new --extend browser:vue,styles:print` adds the `vue` framework face and application and the `print` sheet face."
   - `:932-935`. Add `styles` and `themes` to the fact list. Then add the paragraph: "A surface is what an extension extends: `browser` or `styles`. `extensions` lists each extension as a `surface` and a `name`; reading verbs derive a browser extension from `src/<framework>` or `app/<framework>` and a styles extension from `src/<name>/index.scss` beside `sheet.ts`."
   - `:953-956`. Replace it with the J4 ruling.
   - `:999-1001` and `:1003-1022`. Restate both per answers 4 and 5.
   - `:1706`. It reads "A workspace's file set is a function of its axes, its extensions, and its structural facts."
   - `:1714-1716`. Add "and a Vite and a TypeScript wrapper per sheet face and per framework face and application".
   - `:2014-2017`. Replace it with: "**Scaffold binds one browser framework.** `FRAMEWORKS` is exactly `vue`, because the vendored lint configuration and configuration leaf classify only the frameworks scaffold ships."
   - `:2027-2030`. Add: "A journey workspace's `main.ts` renders one level-1 heading naming the application, which the arrival journey reads."
   - `:2032-2052`. Add: "The arrival journey and the sheet entry test are birth-owned seeds like the environment entry tests: each asserts only what scaffold wrote beside it, and the consumer replaces it."

8. **The proof.** The proof mechanics are the objective lane's ground. The case titles and controls here are shape.
   - **Vendored config cases.** Each case derives its population through `collectSheets` and `collectFrameworks` and carries a control that must fail:
     - "requires and validates every sheet face wrapper". It asserts the build, test, and tsconfig fields of answer 2. Control: a planted `src/<fixture>/index.scss` beside `sheet.ts` with no wrapper throws "Missing wrapper". This follows the planted-journey pattern at `tests/config.test.ts:488-508`.
     - "publishes every sheet face as CSS and SCSS". It checks `exports`, `files`, `sideEffects`, and the `check`, `build`, and `test` scripts. Control: a manifest copy without `./<face>/scss` fails.
     - "builds the opt-in themes sheet after the styles output is emptied". This is veneer's case (`tests/config.test.ts:106-135`), run when `themes` is set.
     - "pre-bundles the shared test packages in every browser project and in no Node project". This is veneer `:137-154`, generalized over `applications`.
     - "registers every framework face and application". It checks the aliases, the `src:<framework>` and `app:<framework>` projects, the rollup rewrite, the `check:app:<framework>` checker, and the lint blocks. Control: a planted `src/vue` with no `@src/vue` alias fails.
     - "refuses a framework package from its face until a peer declares it". Control: the same id with `vue` in `peers` returns `true`.
     - "resolves each journey and showcase mode to its application". Each wrapper is loaded per mode, as veneer does at `:199-255`. Control: an unknown mode resolves `browser`.
     - "stamps a page by its final content". Removing the stamp line recomputes the stamp. Control: a page whose head does not close on its own line throws, and a one-byte edit changes the stamp.
     - "keeps the committed showcase pages out of the formatter".
     - "classifies core face build externals".
     - "pins the vendored framework names to the installed release".
     - The existing "assigns every test file one project owner" case (veneer `:199-255`) spans root projects, sheet wrappers, and every journey mode.
     - The existing wrapper case (`tests/config.test.ts:454`) drops `dist/showcase`.
   - **Scratch-adopter proof.** The proof generates a workspace with `new --src core,browser --app core,browser --styles --showcase --extend browser:vue,styles:print`. It then runs `npm install`, `npm run check`, `npm run build`, `npm run build:showcase`, `npm run build:showcase:vue`, and `npm test`, and ends with `scaffold audit --offline --json` reporting no drift. Its controls are:
     - Delete `configs/src/vite.print.config.ts`. The audit reports `missing`, and `repair` restores it byte-equal.
     - Edit `configs/app/vite.showcase.config.ts`. The audit reports `stale`.

     **J8** (objective lane): placement. The installs reach the live registry, so this proposal places the proof in a `service` project that scaffold does not have. Scaffold has no `tests/setupService.ts` or `tests/service/` (Glob, 2026-09-30). The alternative is `tests/distribution.test.ts`, whose existing case "drives the built compiler from outside the checkout without a network install" (`tests/distribution.test.ts:675`) avoids the network.

9. **Release and adoption.**
   - **Version.** Scaffold moves from `0.0.81` (`package.json:3`) to `0.0.82`, because `Blueprint`, `ViteMachinery`, and `NewCommand` change shape.
   - **Unit order.** The Units table gives it: types first, then the vendored leaves, then the compilers in series, then the CLI, then the config proof, the rules and the guide, the adopter proof, review, gates and publish, and last the veneer adoption.
   - **Veneer adoption.**
     1. Bump `@orkestrel/scaffold` to `^0.0.82`.
     2. Hand-edit the birth-owned files that `repair` never rewrites (`guides/scaffold.md:1172`):
        - `src/styles/index.ts` becomes `export * from './sheet.js'`, and `src/styles/sheet.ts` is added (J2).
        - `configs/app/vite.journey.config.ts` takes the template shape.
        - The J5 proofs move.
     3. Run `scaffold repair`, and run `scaffold overwrite` if a vendored file stays stale.
     4. Delete each hand-edited divergence:
        - the `appVue` export in `configs/app/vite.vue.config.ts`, which repair replaces with the thin wrapper;
        - `isVueBuildExternal`, `isCoreBuildExternal`, and the mode helpers;
        - `ROADMAP.md` § Scaffold propagation;
        - the "wait on scaffold propagation" clause at `ROADMAP.md:64`.
     5. Confirm that `scaffold audit --offline --json` reports no stale content-owned or vendored file.
     6. Run the gate chain green: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm run build:showcase`, `npm run build:showcase:vue`, `npm test`, and `npm run test:distribution -- --mode release`.

## Proposal

**Surface.** A surface is what an extension extends. `browser` is the browser environment on both axes with its journey and its showcase. `styles` is `src/styles`, with the optional themes target. The journey and the showcase stay the boolean structural facts they are (`src/core/types.ts:233-234`), and gain one mode per browser extension. The styles surface gains the boolean fact `styles`, which `src/styles/index.scss` selects. Each surface reaches the tree through templates keyed by a face or application name, so the base and every extension share one engine: one `sheetProject`, one sheet wrapper, one framework factory pair, and one mode resolver.

**Extension.** An extension is `{ surface, name }`, discriminated by `surface`. A browser extension names a closed `Framework`. The vendored lint configuration and configuration leaf are byte-identical across targets, so they can classify only the frameworks scaffold ships. `FRAMEWORK_MATRIX` carries the framework's plugin, checker, source extension, refused packages, and development dependencies, as `SRC_MATRIX` carries each environment's. A styles extension names an open sheet whose machinery is generic: sass, a CSS build, and a Chromium proof. It needs a path and a label, never an identifier.

**Ownership.** Nothing in this proposal changes an ownership class; the objective lane rules each against the distillates.
- Kind files, barrels, seeds, setup modules, framework applications, and the journey wrapper are birth-owned.
- Every wrapper under `configs/src` and `configs/app` except the journey wrapper is content-owned, as are the root `tsconfig.json` and `vite.config.ts`.
- `configs/helpers.ts`, `tests/config.test.ts`, `.oxlintrc.json`, and `.prettierignore` are vendored.
- The showcase pages are unplanned build outputs.

**Derivation.** `#derive` reads each field from the tree and stores nothing:
- `styles` from `src/styles/index.scss`;
- `themes` from `src/styles/themes/index.scss` beside `sheet.ts`;
- `showcase` from its wrapper or `showcase/`;
- `journey` from its wrapper;
- each browser extension from `src/<framework>` or `app/<framework>`;
- each styles extension from `src/<name>/index.scss` beside `sheet.ts`.

`new` selects the same fields through `--styles`, `--showcase`, `--extend`, and the existing `--app browser` journey rule.

**Proof.** The vendored `tests/config.test.ts` names no face and no framework. It enumerates through `collectSheets` and `collectFrameworks`, pins the leaf's framework list to the installed release, and pairs every case with a control that must fail. Scaffold's own scratch adopter generates every surface and both extension kinds, builds, passes its projects, audits clean, and proves that `repair` restores a deleted wrapper.

## Law conflicts

- `AGENTS.md:19` ("src/ published library: core, browser, server, optional styles") omits extension faces. Amend it to "src/ published library: core, browser, server, optional styles, and the faces extensions add".
- `AGENTS.md:25` does not place `src/<framework>`. Append "A browser extension face follows the browser law: it may import core and browser and never server."
- `AGENTS.md:26` does not place `app/<framework>`. Append "`app/<framework>` follows the `app/browser` law."
- `AGENTS.md:52` ("One concept, one term") collides with three existing uses of "surface":
  - `.claude/rules/styles.md:20` and `:47-48` use it for a sheet face. The amendment is in answer 7.
  - `.agents/skills/orkestrel-journey/SKILL.md:26-37` uses it for a screen. The smallest amendment replaces "surface" with "screen" there. That file is outside the brief's list, so this is **J9**.
  - Veneer's `surfaces/` SCSS folder and layer (`ROADMAP.md:103`, `:109`) use it for a folder. Scaffold does not generate that folder, and veneer keeps it as package vocabulary.
- `.claude/rules/application.md:39-40` ("SCSS requires an authorized compiler dependency") conflicts because the generator declares `sass` on `--styles`. The amendment is in answer 7.
- `.claude/rules/application.md:23-24` ("Vue 3 when selected … `vue-tsc`" on app/browser) conflicts only under J4. The amendment is in answer 7.
- `.claude/rules/workspace.md:35` states a barrel exception to `.claude/rules/architecture.md:258`. The uniform `sheet.ts` entry retires the exception, so no amendment remains beyond answer 7.

## Units

The following table lists each unit in execution order.

| Unit | Lane | Owned files | Acceptance criterion | Order | Must not touch |
| --- | --- | --- | --- | --- | --- |
| `types` | astra | `src/core/types.ts`, `src/core/constants.ts`, `src/core/factories.ts`, the blueprint guard and parser | Typecheck green. `createBlueprint` defaults `extensions: []`, `styles: false`, `themes: false`. A `prove` receipt shows `{ surface: 'browser', name: 'react' }` refused at typecheck, with an accepted `vue` control | 1 | `compilers.ts`, `templates.ts`, vendored files |
| `leaves` | astra | `configs/helpers.ts`, `.oxlintrc.json`, `.prettierignore`, and the helper cases in `tests/config.test.ts` | Each renamed and added helper is exported, and each has a case with a failing control. `npm run test:config` green | 2 | Root configuration cases, `src/` |
| `styles` | astra | `src/core/compilers.ts` and `src/core/templates.ts` (styles and themes), plus `tests/src/core/compilers.test.ts` | A styles blueprint plans every artifact of answer 2 with the stated ownership. File tests green | 3 | CLI, vendored files |
| `frameworks` | astra | The same files (vue extension and the J4 ruling) | A `vue` blueprint plans answer 3 and the aliases. Without the extension, the plan carries no Vue artifact | 4 | CLI, vendored files |
| `modes` | astra | The same files (journey, showcase, pages, stamp, seeds) | Mode-aware factories, scripts, `prepublishOnly`, and the arrival seed are planned. No `dist/showcase`, `show`, or `demo/` text remains | 5 | CLI, vendored files |
| `cli` | astra | `src/bin/CLI.ts`, `src/bin/helpers.ts`, `src/bin/constants.ts`, `src/bin/types.ts`, and their tests | `#derive` reads each field from a scratch tree. `new --extend` parses `surface:name`, and a malformed entry exits `2` | 6 | `src/core` |
| `proof` | astra | Root configuration cases in `tests/config.test.ts` | Every case of answer 8 passes on scaffold's own tree, and each control fails when planted | 7 | `configs/helpers.ts` |
| `rules` | opus | `AGENTS.md`, `.claude/rules/{workspace,tests,styles,application,browser,documentation}.md` | Each sentence of answer 7 and of Law conflicts lands verbatim, with no banned term | 3 (parallel) | Code, guides |
| `guide` | astra | `guides/scaffold.md`, `guides/README.md` | `npm run test:guides` green, and every backticked API resolves | 8 | Code |
| `adopter` | astra | The scratch-adopter proof and its project registration (J8) | The run and controls of answer 8 are green, with the command and count recorded | 9 | Compilers |
| `review` | opus | None | One pass over the contract and the vendored seams, reported by a reviewer who wrote none of the units | 10 | Every file |
| `release` | astra | `package.json` version, `host.json` | Tree-wide gates green, read bare. `0.0.82` published | 11 | Source |
| `veneer` | astra | Veneer's birth-owned edits, its `ROADMAP.md`, and its manifest range | Answer 9, steps 1-6, all green | 12 | Scaffold tree |

## Alternatives refused

- **`vue` as a fourth `Environment`** (veneer `ROADMAP.md:153`). The user's framing on 2026-09-30 makes Vue an extension of the browser surface (brief `:7`). A `SRC_MATRIX.vue` row would also admit `--src vue` without `browser`, which the face depends on.
- **`styles` as an `Environment` row.** An environment carries a TypeScript scope, formats, and a root project. A sheet face ships "CSS, not declarations" (`.claude/rules/workspace.md:107`), and its proof runs from a wrapper after a build (`ROADMAP.md:66`).
- **`surfaces: readonly Surface[]` and a `--surfaces` option.** `.claude/rules/application.md:16-17` refuses it: "`--surfaces` is not an alias and must fail as an unknown option". `AGENTS.md:53` ("A binary behavioral switch is a boolean") keeps each surface fact a boolean.
- **Open browser-extension names.** `.claude/rules/workspace.md:70-71` refuses them: "vendored byte-identical to every workspace". A lint block or a boundary classification cannot exist for a name scaffold does not know.
- **A discriminant named `kind` or `type`.** `AGENTS.md:57` refuses it: "Name the axis … never `kind` or `type`".
- **Keeping veneer's helper names.** `.claude/rules/names.md:187` refuses `isCoreBuildExternal` and `isVueBuildExternal`: "`is*`: total `Guard<T>`; never throws". `.claude/rules/names.md:85` refuses `showcaseBuildOutput` and its siblings: "Module helpers … default to `{verb}{Noun}`".
- **A package-owned `appVue` in `configs/app/vite.vue.config.ts`.** `.claude/rules/workspace.md:62-64` refuses it: "thin per-target wrappers … Shared logic remains in root configs", and only `helpers.ts`, `browsers.ts`, and `policy.ts` are leaves.

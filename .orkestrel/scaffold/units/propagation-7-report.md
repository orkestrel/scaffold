# Unit propagation-7: report

Ruling 7 and the setup amendment in ruling 2 are in the eight owned files. I wrote only Markdown and ran no command. `AGENTS.md` has 132 lines (read back after editing). The journey skill's `description` changed, so the bridge has to be patched to match before `npm run test:policy` can pass (see Shared-file patch).

## Files and sentences

### `AGENTS.md` (§ Project model)

```diff
- src/      published library: core, browser, server, optional styles
- app/      application: core, browser, server
+ src/      published library: core, browser, server, optional styles, extension faces
+ app/      application: core, browser, server, extension faces
+ - The browser surface is `src/browser`, `app/browser`, the journey, and the showcase; the styles surface is `src/styles` and its themes. An extension adds a face to a surface: the `vue` browser extension adds `src/vue` and `app/vue`, and a named styles extension adds `src/<name>`.
+ - `src/vue` and each `src/<name>` may import `src/core` and `src/browser`. `app/vue` may import what `app/browser` may import, plus `app/browser` and `src/vue`. No extension face imports server code or another extension's face.
```

"Published source never imports private app code" is unchanged.

### `.claude/rules/workspace.md`

```diff
  frontmatter paths
- 'demo/**/*'
+ 'showcase/**/*'
  § Environments table (column widened)
- | `src/styles/` | Optional SCSS bundle producing `index.css` |
+ | `src/styles/` | Optional styles surface: the base sheet face producing `index.css` |
+ | `src/<name>/` | Styles extension: a named sheet face beside `src/styles/` |
+ | `src/vue/`    | Browser extension: the published `vue` face over `src/browser/` |
+ | `app/vue/`    | Browser extension: the Vue app beside `app/browser/`; `main.ts` |
- - `src/styles/index.ts` is a side-effect entry importing `./index.scss`.
+ - A sheet face (`src/styles/` and each `src/<name>/` styles extension) builds from `sheet.ts`, which imports `./index.scss` alone; its `index.ts` star-exports `./sheet.js`. The themes target builds from `src/styles/themes/sheet.ts` the same way.
+ - Name a styles extension with a name the `NAME_PATTERN` constant admits, and never `core`, `browser`, `server`, `bin`, `styles`, `themes`, or `vue`.
  § Aliases
+ | `@src/<name>` | `src/<name>/index.ts` |
+ | `@src/vue`    | `src/vue/index.ts`    |
+ | `@app/vue`    | `app/vue/index.ts`    |
+ Give every selected environment and every face an alias: `src/styles`, each `src/<name>` styles extension, and each axis the `vue` extension occupies.
  § Configuration authority
- Each `configs/src/*.config.ts` imports the root config rather than a leaf, so shared build logic stays in one place.
+ Each `configs/src/*.config.ts` wrapper imports the root config and may import the permitted leaves; keep shared build and project composition in the root config.
  § Build outputs table
- | `dist/src/styles` | Compiled `index.css` | ES wrapper |
- | `dist/showcase`   | Single-file `index.html` demo | self-contained |
+ | `dist/src/vue` | Vue face + declarations | ES |
+ | `dist/src/styles` | Compiled `index.css` | CSS |
+ | `dist/src/styles/themes` | Compiled themes `index.css` | CSS |
+ | `dist/src/<name>` | Compiled `index.css` | CSS |
+ | `dist/app/vue` | Vue application | target-defined |
+ | `showcase/<mode>.html` | Single-file page per mode | self-contained, committed |
  § Build outputs bullets
- - Library declarations are emitted by `tsc` through `configs/src/tsconfig.{core,browser,server}.json`, chained after each Vite build.
+ - Roll up each published TypeScript face's declarations in its Vite wrapper. A face that imports `@src/core` or `@src/browser` rewrites those specifiers to the published subpaths in its emitted declarations.
- - Styles ship CSS, not declarations.
+ - A sheet face ships CSS, not declarations, and its JavaScript build stub stays out of `files`.
+ - Build each sheet face with `cssMinify: false`, bounded to its own output directory.
+ - Build `dist/src/styles/themes` after `dist/src/styles`; the themes build empties only its own directory.
- - Optional `appShowcase` uses … to create a minified file-URL-safe `dist/showcase/index.html`.
+ - Optional `appShowcase(mode)` builds through `configs/app/vite.showcase.config.ts` and `vite-plugin-singlefile` one minified file-URL-safe page per mode into root `showcase/<mode>.html`, and never empties a sibling page. The base mode reads `app/browser/index.html`, and `--mode vue` reads `app/vue/index.html`.
+ - Stamp each page after inlining with a `build-id` meta line whose value is the SHA-256 digest of the final page without that line.
- - The showcase is outside the default build.
+ - The showcase is outside the default build, and no test reads its pages.
- - Inject a `build-id` meta stamp so rebuilt `file://` demos cache-bust.
  § Test project matrix, environment table (Environment column widened)
+ intro: "…one project per src/app axis × environment, plus one per extension face:"
+ | `src:vue` | `tests/src/vue/**` | Playwright Chromium | `setup.ts`, `setupBrowser.ts` |
~ | `src:styles` | … | Playwright Chromium, `isolate: false` | `setup.ts`, `setupBrowser.ts`, `setupStyles.ts` |
+ | `src:<name>` | `tests/src/<name>/**` | Playwright Chromium, `isolate: false` | `setup.ts`, `setupBrowser.ts`, `setupStyles.ts` |
+ | `app:vue` | `tests/app/vue/**` | Playwright Chromium | `setup.ts`, `setupBrowser.ts` |
+ - Compose every sheet-face project (`src:styles` and each `src:<name>`) in its own wrapper through the one root `sheetProject` factory, and run it through its `test:src:<face>` script, which builds that face first.
+ - Give every browser project `optimizeDeps.include` of `@orkestrel/test`, `@orkestrel/test/browser`, `@orkestrel/contract` where the manifest declares it, and `vue` where the project renders Vue. Give a Node project no `optimizeDeps` setting.
  § Test project matrix, workspace-proof table
~ `setup` files: `tests/setup*.test.ts` other than either `setup:browser` proof
~ `setup:browser` files: `tests/setupBrowser.test.ts`, `tests/setupStyles.test.ts`; proves: browser and style setup behavior …
~ `journey:<variant>` files: `tests/app/<application>/integration.test.ts`; proves: drive the application the Vite mode selects …; gate: `test` through the journey scripts
~ setup paragraph: `setup` excludes `tests/setupBrowser.test.ts` and `tests/setupStyles.test.ts`; `setup:browser` is defined when either exact-case browser proof exists and collects those paths alone
~ journey paragraph: compose each project through the root `appJourney(variant, variants, mode?)` factory, which resolves the Vite mode to `browser` or an app-side browser extension and collects `tests/app/<application>/integration.test.ts`; exclude each collected suite from its application project; run `test:journey` and one `test:journey:<framework>` per app-side browser extension after the application projects in `test`
  § Setup assets
- - `tests/setup.css` declares cascade-layer order before `@import 'tailwindcss'` and its `@source`.
- - Browser setup wires `setup.css`.
- - Styles setup loads `setup.css` and the compiled cascade.
+ - Load only the setup assets and compiled sheets the selected proofs require.
+ - Import `tailwindcss` from a setup asset only where an authored proof declares it.
~ scope script list gains `test:src:<face>` and `test:journey:<framework>`
  § Typechecking and environment isolation
~ isolation row label: `src:styles`, `src:<name>`
~ `configs/src/tsconfig.{core,browser,vue,server}.json` serves emit and scoped checking.
~ `configs/src/tsconfig.styles.json` and each `configs/src/tsconfig.<name>.json` of a styles extension are check-only.
~ `configs/app/tsconfig.{browser,vue,server}.json` is check-only.
  § Script intent table (Script column widened)
~ | `showcase` | Showcase dev server of the base mode |
+ | `showcase:<framework>` | Showcase dev server of that framework's mode |
~ | `build:showcase` | Build `showcase/browser.html` |
+ | `build:showcase:<framework>` | Build `showcase/<framework>.html` |
- | `show` | Build and copy showcase to `demo/showcase.html` |
- Run `show` only **after** formatting. …
+ - In a publishing workspace, `prepublishOnly` runs `build:showcase` and every `build:showcase:<framework>` script after `npm run build`.
+ - List `showcase/` in `.prettierignore`, so formatting never rewrites a committed page.
  § Tooling
- - Browser framework: Vue 3 when present.
+ - Browser framework: the `vue` extension where selected.
```

### `.claude/rules/tests.md`

```diff
- - Resolve each root `tests/setup*.test.ts` proof against its sibling `tests/setup*.ts` module. A root `tests/setup.test.ts` file can prove several setup modules when their helpers serve several projects.
+ - Mirror root setup modules and proofs in both directions. A root `tests/setup<Name>.test.ts` resolves to `tests/setup<Name>.ts`. A root `tests/setup<Name>.ts` that declares an export has `tests/setup<Name>.test.ts` or is imported by `tests/setup.test.ts`, which can prove several setup modules when their helpers serve several projects. A vendored module is outside this population. The policy sweep (`tests/setupPolicy.ts`) enforces both directions.
- - Put `tests/setupBrowser.test.ts` in the browser-enabled `setup:browser` project. … exclude the browser proof from that project.
+ - Put `tests/setupBrowser.test.ts` and `tests/setupStyles.test.ts` in the browser-enabled `setup:browser` project. … exclude both browser proofs from that project.
+ (nested integration bullet) A `tests/app/<application>/integration.test.ts` journey suite is such a proof: `.claude/rules/workspace.md` § Test project matrix collects it in the journey projects of its mode.
- - `tests/setupStyles.ts`: CSS/style helpers and compiled cascade.
+ - `tests/setupStyles.ts`: the CSSOM and sheet helpers `.claude/rules/styles.md` places there; every sheet-face project loads it after `tests/setupBrowser.ts`.
```

The `tests/setup*.test.ts` row in the cross-cutting table is unchanged.

### `.claude/rules/application.md`

```diff
+ - `new` selects the styles surface with `--styles`, its themes target with `--themes` (requires `--styles`), the showcase with `--showcase` (requires `--app browser`), and extensions with `--extend <surface:name,…>`. Each `--extend` entry is `browser:vue`, applied to every selected browser axis, or `styles:<name>`, which requires `--styles`. `--app browser` implies the journey.
- - app/browser uses app/core contracts, Vue 3 when selected, an `index.html` entry, `vue-tsc`, and real Chromium tests.
+ - app/browser is framework-independent: it uses app/core contracts, an `index.html` entry, a `main.ts` that renders through the DOM, `check:app:browser` through `tsc`, and real Chromium tests.
+ - The Vue application lives in app/vue: `main.ts`, `index.html`, `App.vue`, `check:app:vue` through `vue-tsc`, `dev:vue`, and real Chromium tests.
+ - When a target's app/browser holds a `.vue` file, move it to app/vue. The generator's `repair` raises a blocking question naming that move until it lands.
+ - The showcase builds one page per application, app/browser and each app-side browser extension, into root `showcase/` with the final-page stamp; `.claude/rules/workspace.md` § Build outputs owns its build.
- Vue SFCs and CSS belong to browser environments; SCSS requires an authorized compiler dependency.
+ Vue SFCs belong to the `vue` extension's faces and CSS to browser code; SCSS compiles through the `sass` dependency the styles surface declares.
- Mixed manifests publish only `dist/src`, and Vue remains development-only because app output is never published.
+ Mixed manifests publish only `dist/src` and the SCSS sources a stylesheet export names, and never app output; `vue` stays a development dependency apart from the optional peer `.claude/rules/browser.md` admits.
```

The sentence making `--surfaces` an unknown option stays as it was.

### `.claude/rules/browser.md`

```diff
+ paths: 'src/vue/**/*.ts', 'app/vue/**/*.{ts,vue}', 'tests/{src,app}/vue/**/*'
+ - Put Vue code in `src/vue` and `app/vue`. `src/browser` and `app/browser` hold no `.vue` file and import no `vue` module. `AGENTS.md` § Project model fixes what each Vue face may import.
+ - Declare `vue` in the manifest as an optional peer only for the `./vue` export. Until that declaration exists, the `./vue` build refuses `vue`, `vue/*`, and `@vue/*`; after it, the build externalizes `vue` and its subpaths and still refuses `@vue/*`.
```

### `.claude/rules/styles.md`

```diff
+ paths: 'src/*/sheet.ts', 'tests/setupStyles.test.ts'
~ `_reset.scss` row: "The face's reset declarations, when that face owns a reset" (table narrowed to the longest cell)
+ - Apply this table and the folder barrels in § Folders to every sheet face: `src/styles` and each `src/<name>` styles extension. `.claude/rules/workspace.md` § Environments fixes the `sheet.ts` entry.
~ recreation sentence: "A face whose contract … records tokenization and accessibility additions in its separate authored face."
+ - Open `themes/index.scss` with its own order statement rather than loading `tokens`.
+ ## Folders
+ - Give each folder an `_index.scss` barrel that loads its partials with `@use`; keep the barrel when the folder is empty.
+ - Put a rule that styles one element in `elements/`, a class skin that applies with no script running in `components/`, and a class that sets one property in `utilities/`.
+ - Add another folder only for a job `elements/`, `components/`, and `utilities/` do not hold, and give it its own barrel and its own layer.
+ ## Proofs
+ - Declare every CSSOM instrument a sheet proof reads in `tests/setupStyles.ts`, never in a test file. `tests/setupStyles.test.ts` proves each instrument under the root setup mirror in `.claude/rules/tests.md`.
```

The sentence requiring every published sheet to open with the same order statement is still the only place that rule appears.

### `.claude/rules/documentation.md`

```diff
- - A showcase is executable proof of public API. A missing demonstration is a missing feature, detectable by parity.
+ - Demonstrate public API in application source, prove its journeys there, and rebuild the selected showcase pages for publication.
+ - The showcase column of the concept index names each `showcase/<mode>.html` page that demonstrates the row.
```

### `.agents/skills/orkestrel-journey/SKILL.md`

```diff
~ description: "deciding whether a surface is reachable" -> "deciding whether a screen is reachable"
~ every body use of "surface" for a rendered screen -> "screen" (families paragraph, table, laws, intents heading and table, refusals, transport, Accept list, report line)
~ "proving a surface the application does not have" -> "proving a store contract the application does not have"
~ Matrix row trigger: "Where the journey wrapper declares more than one variant"
+ - Prove Matrix in the arrival journey `scaffold new` seeds while its wrapper declares more than one variant: read one resolved value under each declared variant.
~ journey file bullet: the `vue` extension's application keeps its journeys in `tests/app/vue/integration.test.ts`, which `npm run test:journey:vue` runs; each variant project of a mode collects that file alone, and the application's ordinary project excludes it
```

No use of "surface" is left in this file (Grep `[Ss]urface`, 0 matches). The `name` field is unchanged.

## Shared-file patch

You need to apply this to `.claude/skills/orkestrel-journey/SKILL.md`, line 3. The canonical `description` changed, and the policy sweep requires the bridge to match it exactly.

```diff
-… proving an application end to end, deciding whether a surface is reachable by keyboard alone, proving what a screen refuses …
+… proving an application end to end, deciding whether a screen is reachable by keyboard alone, proving what a screen refuses …
```

## Output

I have no shell, so I ran none of these. The Orchestrator runs them in this order:

1. Apply the bridge patch.
2. `npx oxfmt --config .oxfmtrc.json --check AGENTS.md .claude/rules/workspace.md .claude/rules/tests.md .claude/rules/styles.md .claude/rules/application.md .claude/rules/browser.md .claude/rules/documentation.md .agents/skills/orkestrel-journey/SKILL.md` must exit 0. I checked table alignment by regex: every changed table matches its column-width pattern, and each column is as wide as its longest cell. The counts were workspace.md Environments 15, Aliases 12, Build outputs 14, environment matrix 13, workspace-proof matrix 13, isolation 6, Script intent 20; styles.md 8; SKILL.md families 8 and intents 7. If the check fails, run `format` on these files and report the diff.
3. `npm run test:policy` must exit 0. It must report no `prose` banned term, no `bridge` description mismatch, and no `skill` or `rules` violation. I swept the owned files for every unconditional substitution-table term plus `should`, `now`, `new`, `once`, `since`, `above`, `below`, and `master`. My added lines contain none of them in prose; the only `new` is the code span `scaffold new`.
4. `git status --porcelain` and `git diff --stat` must list only the eight owned files, the bridge file, and this report.

## Deviations

None stopped the unit. These are the choices I made:

- **The import law has one home, in `AGENTS.md`.** Brief item 5 also lists "`app/vue` may import `app/browser` and `src/vue` may import `src/browser`" for `browser.md`. Acceptance criterion 1 forbids stating it twice, so `browser.md` points to `AGENTS.md` § Project model instead.
- **The reserved sheet names come from the `propagation-1` brief.** Ruling 1 says "non-reserved" without listing names. The `RESERVED_SHEET_NAMES` entry in `tmp/units/propagation-1-brief.md` gives the list: the environments, `bin`, `styles`, `themes`, and every framework. `workspace.md` names that set.
- **The showcase stamp and the publish rebuild each have one home.** Brief item 4 lists the final-page stamp for `application.md`. The stamp, mode, and output rules live in `workspace.md` § Build outputs, and `application.md` names the fact and points there. The `prepublishOnly` rebuild sits in § Script intent only.
- **I made one journey-skill edit beyond item 8.** The bullet that put every journey in `tests/app/browser/integration.test.ts` contradicted ruling 5's per-mode suites, so it now names the `vue` mode's file.

`propagation-1` stopped without implementing anything (`tmp/units/propagation-1-report.md`). These rules describe the ruled behaviour, which the code units have not landed yet.

## Observations

These files are outside the owned set and still disagree with the new rules:

- **`guides/scaffold.md`** (for `propagation-8`):
  - `:719` lists a `show` gate chain.
  - `:938` and `:943` map `tests/setupBrowser.test.ts` alone to the browser setup runtime.
- **The journey skill's references** still use "surface" for a rendered screen:
  - `references/captures.md` `:54`, `:59`, `:120`
  - `references/decide.md` `:56`, `:57`, `:69`
  - `references/layer.md` `:188`, `:194`, `:214`, `:248`, `:277`
  - `references/styles.md` `:3`, `:78`, `:81`, `:83`, `:97`, `:105`, `:120`, `:137`, `:142`, `:155`
  - `references/statechart.md` `:39`, `:187`, `:289`
- **The policy rule id `surface`** is a code token for a different concept from the surface vocabulary. It appears in `workspace.md` § Policy instruments, and in `names.md:128`, a shared file. Renaming it is a code change outside this unit.

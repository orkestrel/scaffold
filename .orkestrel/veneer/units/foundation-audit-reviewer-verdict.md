# foundation-audit — reviewer lane verdict (subjective lane, Claude Opus 5.5, native Agent dispatch, 2026-09-30)

Returned verbatim; immutable. Relative paths resolve against `C:\Users\mikes\WebstormProjects\veneer` unless prefixed with `scaffold/`.

1. `BROKEN`. Every exported target and every `@use` partial ships through `package.json:14-17`, but the proof does not cover the SCSS subpaths. `tests/distribution.test.ts:740-747` files stylesheet targets under `excluded`, and `:892-899` checks only that each exported target exists. No test compiles or walks the SCSS `@use` graph.
   - Mutation: narrow `package.json:15` to `src/bootstrap/index.scss`. The distribution proof stays green while `@use 'tokens'` fails in a consumer, so the assertions do not tell the two apart.
   - The `./composables/index.js` chunk does not exist: `dist/src/vue/index.js` is empty. The declaration `dist/src/vue/index.d.ts:1` resolves to `composables/index.d.ts`, which exists.
   - Fix: in the release project, compile each `*/scss` export from the installed tree through `pkg:`, and assert that the CSS is not empty.
   - Over-correcting: making every stylesheet a JavaScript-drivable entry would feed CSS into the Node import drive.

2. `BROKEN`, reasoned from webpack 5's documented tree-shaking rule; no bundler was run.
   - `package.json:21` sets `"sideEffects": false`. Under `optimization.sideEffects`, which is on in production, webpack drops a bare `import '@orkestrel/veneer/bootstrap'` unless the consumer's CSS rule sets `sideEffects: true`. Webpack's tree-shaking guide says imported CSS must be listed in `sideEffects` for this reason.
   - Vite's CSS plugin marks plain CSS modules as not tree-shakable, so Vite 8 keeps the import. This is unverified.
   - The config comment `configs/src/vite.bootstrap.config.ts:7-8` already names this hazard for JavaScript.
   - To settle it: add a webpack 5 production build of `import '@orkestrel/veneer/bootstrap'` to `tmp/probes/`, run `npm run test:probe`, and read the emitted CSS.
   - Fix: `"sideEffects": ["*.css", "*.scss"]`.
   - Over-correcting: `true` turns off pruning for the JavaScript faces.

3. `BROKEN`. A `node_modules` load path fails: `@use '@orkestrel/veneer/bootstrap/scss'` searches `bootstrap/scss.scss` and `bootstrap/scss/_index.scss`, and the tree ships under `src/bootstrap/` (`package.json:48`).
   - The `pkg:` importer can resolve the string export. Whether its output equals `dist/src/bootstrap/index.css` is `UNRESOLVED`: the shipped file carries Vite's `/*$vite$:1*/` marker (`dist/src/bootstrap/index.css:111`) and 110 empty `@layer bootstrap {}` blocks, and whether Sass keeps those blocks is untested. To settle it, compile with `sass --pkg-importer=node` in a probe and compare.
   - `index.ts` and `sheet.ts` add nothing for a Sass consumer. They are not in `files`, and their build twins `dist/src/{bootstrap,tailwindcss,styles}/index.js` are empty files that no export names.
   - Fix: document `pkg:` as the only supported form and prove it as in verdict 1.

4. `CONFIRMED`. `dist/src/core/index.js` imports nothing, and `dist/src/browser/index.js` and `dist/src/vue/index.js` are empty.
   - Future risk: `isCoreBuildExternal` (`configs/helpers.ts:371`) and the `srcBrowser` external (`vite.config.ts:153`) externalize every `@orkestrel/*` import whether or not `dependencies` declares it. A `src/core` import of `@orkestrel/contract` would therefore ship as a bare import.
   - Mutation: add that import. The consumer install lacks the package, the Node drive throws (`tests/distribution.test.ts:591-593`), and the proof goes red. That happens only under `prepublishOnly --mode release`; `npm test` never sees it.
   - Fix for the next chunk: externalize only names declared in `dependencies` or `peerDependencies`, and throw on any other `@orkestrel/*` import.

5. `BROKEN`. Every red is a foundation defect, and none is the admissible red of a stub.
   - `format:check`: the table rows at `ROADMAP.md:82` and `:91` overrun their column widths.
   - `check`: the three TS2307 diagnostics are verdicts 6 and 7.
   - `test`: `tests/src/bootstrap/index.test.ts:8` asserts the next chunk's output. `.claude/rules/tests.md:42` reserves out-of-scope roadmap work for `it.todo()`, `ROADMAP.md:3` requires each chunk to reach green, and `AGENTS.md` § Work loop closes only on green gates.
   - Because `package.json:78` is an `&&` chain, every script after `test:src:bootstrap` goes unexercised.

6. `BROKEN`. `tests/setupVue.ts:7` and `tests/src/vue/index.test.ts:3` statically import `dist/`, so `check` depends on `build`.
   - The static import also makes the missing-build guard at `tests/setupVue.ts:34-43` unreachable: module load fails before that code runs.
   - Fix: after the existence check, load the build with `await import(pathToFileURL(VUE_SURFACE_PATH).href)` and type the result as `unknown`.
   - Over-correcting: importing `src/vue` instead drops the proof against the built output.

7. `BROKEN`. The root `tsconfig.json` has no `include` and no `*.vue` declaration, so `app/vue/main.ts:2` fails there. `check:app:vue` passes only because it runs `vue-tsc` (`package.json:77`).
   - Scaffold has the same latent defect: its root check is plain `tsc` (`scaffold/src/core/compilers.ts:296`), only the `app:browser` scope uses `vue-tsc` (`:319-320`), and the template excludes only `node_modules`, `dist`, and `tmp` (`templates.ts:56`). This foundation is the first to trigger it.
   - Fix, in the scaffold generator: run the root check through `vue-tsc` when any app scope holds Vue.
   - Over-correcting: excluding `app/vue` from the root project breaks the comprehensive check in `.claude/rules/workspace.md:203`.

8. `BROKEN`. The four setup proofs are each collected twice by `npm test`.
   - The `setup` project collects `tests/setup*.test.ts` (`vite.config.ts:286-287`).
   - Each face wrapper collects its own setup proof again: `vite.bootstrap.config.ts:27`, `vite.tailwindcss.config.ts:27`, `vite.styles.config.ts:25`, and `configs/src/vite.vue.config.ts:39`.
   - The logs show it: `gates-c.log:353-354` reports 4 files and 13 tests for `setup`, and each face run reports 2 files.
   - Fix: remove the setup proofs from the face wrappers. `.claude/rules/tests.md:63-64` places them in `setup` alone, and `test:setup` already builds every face first (`package.json:97`).

9. `BROKEN`. Two fences exist for `src/browser` and are absent for `src/vue`:
   - no `src/vue/**` block in `.oxlintrc.json` (`src/browser` has one at `:177-219`);
   - no `environmentBoundary('src/vue')` plugin (`configs/src/vite.vue.config.ts:12` has only `outputBoundary`, while `vite.config.ts:138` fences `src/browser`).
   - An import that gets through: `import { x } from '@app/core'` in `src/vue/composables/*.ts`. The alias resolves (`tsconfig.json:26`) and both scoped checks accept it.
   - The Vite fence also allows stylesheets for `src/browser` (`configs/helpers.ts:486`), so the claim's "or a stylesheet" is wrong for both faces.
   - Fix: mirror the `src/browser` lint block and add the boundary plugin.
   - Over-correcting: banning imports of `src/browser` from `src/vue` breaks `ROADMAP.md:27`.

10. `BROKEN`. `configs/helpers.ts:336` refuses only `vue` and `vue/*`. A composable that imports `@vue/reactivity` is not `@src/core`, not `@orkestrel/*`, and not a peer, so `:341-350` returns `false` and Vue's reactivity gets bundled into `dist/src/vue/index.js`.
    - The contradiction: `ROADMAP.md:12` forbids a peer dependency, yet `peerDependencies.vue` is the field that makes a bare `vue` import resolve under pnpm strict mode or Yarn PnP. It works under npm only through hoisting. The distribution consumer installs no Vue, so its Node drive of `./vue` will fail the day the face imports `vue`.
    - A consumer without Vue can still import the root and `./browser`: neither built file imports Vue.
    - Fix: refuse `@vue/*` too, and amend the roadmap to `peerDependencies.vue` plus `peerDependenciesMeta.vue.optional` before the Vue chunk.
    - Over-correcting: making `vue` a runtime dependency forces Vue on consumers of the root and `./browser`.

11. `BROKEN`. Ruled from CSS Cascading and Inheritance Level 5, § Cascade layers.
    - (a) Holds too broadly. An unlayered normal declaration beats every layered one regardless of specificity. A consumer's `button { background-color: transparent }` (specificity 0,0,1) now beats `.btn`'s `background-color: var(--bs-btn-bg)` (0,1,0), which wins in official Bootstrap.
    - (b) Fails. Layered `!important` beats unlayered `!important`, so `.text-primary { color: … !important }` beats a consumer's later `.brand { color: hotpink !important }`, the reverse of official Bootstrap.
    - (c) The layer keeps order, but the barrels do not (S1).
    - If (b) fails, "the same output" can only mean an identical declaration sequence inside the wrapper, never the same rendered result. "Bootstrap wins on a shared class" then depends on load order (verdict 12).
    - Fix: ship `./bootstrap` unlayered as a drop-in, and amend `ROADMAP.md:71`. Cost: layered Veneer or Tailwind rules can then override a Bootstrap normal declaration only through tokens.
    - Over-correcting: unlayering Tailwind and styles as well destroys their internal ordering.

12. `BROKEN`. No file fixes the layer order.
    - Loading `./bootstrap` first (`src/bootstrap/_tokens.scss:2`) puts `bootstrap` below `utilities`. Loading `./tailwindcss` first (`src/tailwindcss/_tokens.scss:2`) puts it above. For `.container`, which both define normally, the winning `max-width` flips with load order.
    - Tailwind and styles share the layer names `theme` through `utilities`, so their rules merge into the same layers.
    - Loading `./tailwindcss` before `./styles` appends `surfaces`, `composables`, and `modifiers` after `utilities`, the reverse of `ROADMAP.md:71`.
    - Loading real Tailwind first (`@layer theme, base, components, utilities;`) appends the compatibility sheet's `reset` and `elements` above Tailwind's `utilities`.
    - Fix: emit one identical full order statement at the top of every face, or a `./layers` subpath that the consumer loads first (`.claude/rules/styles.md:54`). The roadmap must fix Bootstrap's position, and its "Bootstrap and Tailwind never declare the styles-only layer names" rule has to change.

13. `BROKEN`. The foundation defines no comparison.
    - The current proof, `tests/src/bootstrap/index.test.ts:8`, checks that `--bs-` appears somewhere. Any drift that keeps one `--bs-` passes.
    - A comparison that works: in Chromium, load both texts into constructable `CSSStyleSheet` objects, flatten each `CSSLayerBlockRule` into its child rules, and compare the `cssText` sequences for equality. Include a control that changes one declaration in a copy of `bootstrap.css` and must fail. This adds no second CSS parser.
    - The alphabetical barrels (S1) and the marker (S9) would fail this comparison on the first run.

14. `BROKEN`. `src/styles/themes/_default.scss:5,8` compounds both attributes on one element.
    - `<section data-bs-theme="dark">` under `<html data-vn-theme="default" data-bs-theme="light">` matches neither selector, so the section inherits the light pack's values.
    - A consumer who sets only `data-bs-theme` gets nothing from the pack. So does `data-vn-theme="default"` with no `data-bs-theme`, which is Bootstrap's default light mode.
    - Fix: add descendant forms, such as `[data-vn-theme='default'] [data-bs-theme='dark']`, and make the light pack answer `[data-vn-theme='default']:not([data-bs-theme='dark'])`.
    - Over-correcting: an unconditional `:root` pack ignores `data-vn-theme`.

15. `BROKEN`. No CSS form of the default pack exists.
    - `./styles` excludes themes (`src/styles/index.scss:1-8`), `./styles/themes` points at `.scss` (`package.json:53`), and `dist/src/styles/` holds only `index.css`.
    - Fix: build `themes/index.scss` to `dist/src/styles/themes.css` and export `{ "sass": "./src/styles/themes/index.scss", "default": "./dist/src/styles/themes.css" }`.
    - Over-correcting: folding the themes into `./styles` contradicts `ROADMAP.md:30`.

16. `BROKEN`. No test pins `TOKEN_NAMES`; the 117-name match is an unpromoted probe.
    - The `veneer` group (`src/core/constants.ts:18-308`) has no consumer: no sheet declares a `--vn-*` name and no code reads one. It fails the creation gate in `AGENTS.md` § Design laws.
    - The doc comment (`constants.ts:2-10`) and `TokenName` (`types.ts:15`) claim "the shipped cascade declares" these names, which is false today.
    - The markers `--orkestrel-veneer-styles` and `--orkestrel-veneer-tailwindcss` (`src/styles/_tokens.scss:6`, `src/tailwindcss/_tokens.scss:6`) ship on `:root`. Any consumer can read them with `getComputedStyle`, yet they are undocumented, missing from `TOKEN_NAMES`, and read only by tests. They are test hooks leaking into the public surface.
    - Fix:
      - Promote the probe to a two-way test of the `bootstrap` group against the light block of `bootstrap.css`, with a control.
      - Remove the `veneer` group until the styles chunk declares its tokens.
      - Remove the markers and identify each sheet by its path.
    - Over-correcting: emptying `src/core` breaks `ROADMAP.md:25`.

17. `BROKEN`. The installed scaffold host `configs/helpers.ts` lacks `isVueBuildExternal`, `isCoreBuildExternal`, `showcaseBuildOutput`, and `journeyTestInclude`. After a repair, the import at `configs/src/vite.core.config.ts:5` fails and `npm run build` fails at `build:src:core`. `ROADMAP.md:47` names four restorable files; `.prettierignore` is a fifth.

    The behaviours in the five edited files, each with the scaffold change that would carry it:

    | Behaviour | Scaffold change |
    | --- | --- |
    | `vue` as a boundary owner (`helpers.ts:135,448,486`) | Generator: an environment set that admits `vue` |
    | `isVueBuildExternal` (a product policy) | Rule change: admit one package-owned config leaf. `.claude/rules/workspace.md:64` allows only three leaves, so no such home exists today |
    | `isCoreBuildExternal` | Core wrapper template |
    | Showcase and journey mode helpers | Showcase and journey templates that take multiple surfaces |
    | The matching `config.test.ts` cases | Follow the helpers |
    | `@app/vue` and self paths in `tsconfig.json` | Generator path emission; self paths are already specified at `workspace.md:83` |
    | `app/vue` lint block | Generator emits one lint block per app environment |
    | `showcase/` in `.prettierignore` | Template |

18. `CONFIRMED`. The `probe` project is composed in the root config, not given as a path string (`vite.config.ts:317-332,346`). `test:probe` and `test:bench` name it (`package.json:94-95`), no chain names it, and `.gitignore:11` ignores `tmp`. I did not observe the server arming; the preconditions `.claude/rules/workspace.md:171-180` names are all met.

19. `BROKEN`. Every project is reachable, and `distribution` is correctly placed in `prepublishOnly` alone (`.claude/rules/workspace.md:142`). The failures:
    - `npm test` runs the four setup proofs twice (verdict 8).
    - It builds `bootstrap`, `tailwindcss`, and `styles` twice (`package.json:82-84,97`).
    - `test:src:vue` (`:85`) builds nothing, unlike its siblings, so on a clean checkout it reads a `dist/` that no earlier script in the chain built.
    - Fix: verdict 8's fix, plus prefix `test:src:vue` with `npm run build:src:browser && npm run build:src:vue &&`.

20. `BROKEN`. There is no `guides/veneer.md` and no `tests/guides.test.ts`, and `README.md:3` carries a generic pitch.
    - `guides/README.md:6-36` says to create the guide "when the workspace has a public surface". The workspace has one (`TOKEN_NAMES` and seven CSS subpaths), and the map omits `src/vue`, `src/bootstrap`, `src/tailwindcss`, `src/styles`, and `app/vue`.
    - `.claude/rules/documentation.md` § Parity ("Every public export is documented") does not admit a foundation without them.
    - Fix: write the guide with Surface rows for the four core exports and the CSS subpaths, add the `GuideCommand` proof, and update the map and the pitch.

21. `BROKEN`. No gate fails when a showcase file goes stale.
    - `format:check` skips the files through `.prettierignore:8`, and Oxlint does not lint `.html`.
    - Every rebuild rewrites the timestamp stamp (`configs/app/vite.showcase.config.ts:45-48`), so reviewers see one changed line in every diff that rebuilds.
    - `build:showcase` writes straight into tracked files. Scaffold's convention builds into `dist/showcase` and copies with `show` after format (`.claude/rules/workspace.md:246,259`).
    - Both pages demonstrate no public API: `showcase/browser.html:9-10` is an empty body, which falls short of `.claude/rules/documentation.md` ("A showcase is executable proof of public API").
    - Fix: derive `build-id` from a content hash, and add a proof that rebuilds into scratch and compares with the committed file.
    - Over-correcting: dropping the stamp breaks `file://` cache-busting.

22. `BROKEN`. Both journey suites assert an empty barrel (`tests/app/browser/integration.test.ts:5-7`, `tests/app/vue/integration.test.ts:5-7`) and never mount the application.
    - The `orkestrel-journey` skill declares the Journey family "Always" (`SKILL.md:32`) and requires mounting the shipped entry (`:131`). `.claude/rules/workspace.md:138` says "Drive the browser application".
    - Mutation: empty `app/vue/main.ts`. Both journeys stay green, so the assertions do not tell the two apart.
    - Fix: mount the Vue entry and assert the heading "Veneer Vue" by role. Turn the browser journey axis off until `app/browser` renders something.

23. `CONFIRMED`. `dist/src/vue/index.d.ts` and `dist/src/vue/composables/index.d.ts` exist, emitted by the `tsc` step at `package.json:105`. `tests/distribution.test.ts:969-986` compiles against them.
    - Mutation: remove the `tsc` step. `./vue` then lands in `undeclared` and `:912` fails, but only under release.
    - See S8 for the seam this leaves for the next chunk.

24. `BROKEN`. The literal checks hold: the `_mixins.scss` files are comments only, no barrel loads mixins, only `_tokens.scss` declares layer order, and every folder barrel exists. The rule conflicts are neither followed nor reported:
    - `.claude/rules/styles.md:19,25` (`_theme.scss`, loaded by `index.scss`) against `ROADMAP.md:55,61` (`themes/`, not loaded).
    - `_reset.scss` is outside the rule's file set.
    - `styles.md:53` requires each partial to use its folder's own layer; every Bootstrap partial wraps in `@layer bootstrap` (for example `src/bootstrap/components/_button.scss:1`).
    - `styles.md:54` wants one order statement in the consumer entry; the foundation ships three.
    - Under `AGENTS.md` § Authority and loading, rules state how to write and the roadmap is not in the authority chain, so on conflict the unit must stop and report. Neither document silently wins.
    - Fix: record the conflict and route a rule amendment or a roadmap amendment.
    - Over-correcting: renaming `themes/` to `_theme.scss` loses the optional pack files.

25. `BROKEN`.
    - The four setup modules (`tests/setupBootstrap.ts:9,18,44-63`, `setupStyles.ts:8,16,24-43`, `setupTailwindcss.ts:8,16,24-43`, `setupVue.ts:9,23`) each carry an unexported `workspaceRoot` and a near-duplicate `read*`/`load*` pair. That breaks `.claude/rules/tests.md:185-186,197`.
      - Fix: one exported `WORKSPACE_ROOT` plus one `readSheet(path, script)` and `loadSheet` with a `Map` cache in `tests/setupStyles.ts`.
    - `configs/app/vite.vue.config.ts:11-19` re-derives root's alias record (`vite.config.ts:33-39`). The added `@app/vue` line is redundant with `tsconfig.json:28`, and the comment at `:17-18` is false. This breaks `.claude/rules/workspace.md:68-69`.
      - Fix: export `resolve` from the root config and delete the copy.
    - `configs/src/vite.vue.config.ts:28-32` duplicates the throw at `helpers.ts:336-340` with a different message. The wrapper throws first, so the helper's throw never runs in a build, and `tests/config.test.ts:2115` proves only the helper.
      - Fix: delete the inline throw.
    - The showcase config's object-literal hook methods are in-body functions under `.claude/rules/architecture.md:167-169`, but scaffold's own template has the same shape (`templates.ts:398-410`). Report that as a conflict in scaffold's own templates, not a veneer defect. `const override` is data and holds.

26. `CONFIRMED`. The pin is exact (`package.json:128`), the lockfile carries the integrity hash (`package-lock.json:2469`), the version is read and asserted (`tests/setupBootstrap.ts:26-36`, `tests/src/bootstrap/index.test.ts:6`), and no `src/**` file imports `bootstrap`.
    - Mutation: edit the installed version. The test fails, so the assertion distinguishes it.
    - Only `npm ci` enforces the tarball's identity. No proof reads the integrity hash or a digest of `bootstrap.css`.

27. `BROKEN`. I would not ship this as the base for later chunks. The one change I would refuse to build on is the cascade-layer contract:
    - the layer-wrapped Bootstrap face (verdict 11);
    - three independent order statements (verdict 12);
    - alphabetical barrels (S1).

    Every later chunk's output order and override behaviour inherits it, and it is cheapest to fix now, while all 110 partials are empty.

**Findings outside the claims**

- **S1.** The alphabetical barrels (`src/bootstrap/utilities/_index.scss:1-3`, `components/_index.scss`, `elements/_index.scss`) replace Bootstrap's authored order.
  - Input: `class="bg-primary text-bg-danger"`. Official `.text-bg-*` (`bootstrap.css:6831`) comes before `.bg-*` (`:8797`), so `bg-primary` sets the background. Here `background` loads before `color-bg`, so `text-bg-danger` wins.
  - Input: `card-img-top img-thumbnail`. `_card` now loads before `_image`, so the radius flips.
  - Helpers are also mixed in among the components.
  - Fix: order the barrels by the imports in `bootstrap/scss/bootstrap.scss` and the `$utilities` map.
- **S2.** The Vue face's prose contradicts its code.
  - "a TypeScript re-export of browser" (`configs/src/vite.vue.config.ts:26`) and "keeps the browser re-export" (`:8-9`) conflict with `tests/src/vue/index.test.ts:7` ("does not re-export") and `src/vue/index.ts:1`.
  - `setupVue.ts:14` also says the Vue face re-exports the browser entry.
  - The result the comment claims to avoid is what ships: `dist/src/vue/composables/index.d.ts:1` is `export {};`.
  - Fix: rewrite the three comments to the composables design.
- **S3.** `readVueSurface` returns one static namespace (`tests/setupVue.ts:7,44`), so "on every call" (`:26`) is false. The cache proof (`tests/setupVue.test.ts:12-25`) cannot fail: remove the `let` cache and it stays green.
- **S4.** The setup proofs write to and rename shipped `dist` files (`tests/setupStyles.test.ts:17,29,39`) in the same parallel project as the face tests (`vite.styles.config.ts:23-28`).
  - Interleaving: while `setupStyles.test.ts:39` has the file renamed away, `tests/src/styles/index.test.ts:6` calls `readStylesSheet`, which throws.
  - Fix: run the setup proofs against a `createScratch` copy through the path parameter from verdict 25.
- **S5.** `tests/src/styles/index.test.ts:16-18` refuses `--bs-` and `.btn` in the Veneer sheet. A styles rule such as `.btn { box-shadow: var(--vn-button-shadow) }`, which `TOKEN_NAMES.veneer.button` anticipates, would go red. That contradicts "records additions against the Bootstrap pin" (`ROADMAP.md:16`).
- **S6.** `TOKEN_NAMES.bootstrap` renames Bootstrap's own names: `subtle`→`--bs-primary-bg-subtle`, `emphasis`→`--bs-primary-text-emphasis`, `border`→`--bs-primary-border-subtle` (`src/core/constants.ts:347-349`), `line`→`--bs-body-line-height` (`:415`), `base`→`--bs-box-shadow` (`:479`). That breaks the external-wording rule in `.claude/rules/names.md` § General vocabulary.
- **S7.** The CSS-face projects run in Node on text (`vite.styles.config.ts:26`). `.claude/rules/workspace.md:123` puts `src:styles` in Chromium, and `ROADMAP.md:18` makes the rendered browser result decide correctness.
- **S8.** The Vue build has no `output.paths` mapping for the browser external. `isVueBuildExternal` keeps `/browser/index.ts` external (`configs/helpers.ts:344-346`), but unlike `vite.config.ts:155` nothing rewrites it to `../browser/index.js`. `configs/src/tsconfig.vue.json` emits raw declarations with `rootDir` set to `src`, so a composable that imports `@src/browser` would ship that unresolvable specifier and overwrite `dist/src/browser/index.d.ts`.
  - Fix: reuse `declarationRollup` with a rewrite, as `configs/src/vite.browser.config.ts:10-13` does.
- **S9.** The published tarball carries the `/*$vite$:1*/` marker in all three CSS files (`dist/src/bootstrap/index.css:111`) and the empty `dist/src/{bootstrap,tailwindcss,styles}/index.js`, which no export names.
  - Fix: exclude the stub files in `files`, and strip the marker before any equality proof.

**Attacked and held**

- `TokenMap = typeof TOKEN_NAMES` derives a public type from data, which `.claude/rules/typescript.md` § Types sanctions ("derive a literal union from a value").
- `sheet.ts` declares nothing, so the placement law does not reach it, and each face `index.ts` is a lawful star barrel.
- The `files` globs reach every `@use` partial.
- `readBootstrapVersion` narrows without `as`.
- The two journey modes reuse the project names `journey:desktop` and `journey:compact`, but each mode runs as its own invocation, so the names never collide.
- The `isCoreBuildExternal` false case (`tests/config.test.ts:2124`) would catch a mutation that makes it always return true. `isVueBuildExternal` has no false case, so the same mutation would pass there.

VERDICT: FAIL 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 24, 25, 27; outside the claims: S1, S2, S3, S4, S5, S6, S7, S8, S9

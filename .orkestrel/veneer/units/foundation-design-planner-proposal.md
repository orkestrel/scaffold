# foundation-design — planner proposal (subjective lane, Claude Opus 5.5, native Agent dispatch, 2026-09-30)

Returned verbatim; immutable. Relative paths are as the lane wrote them (`veneer/…` and `scaffold/…` resolve against `C:\Users\mikes\WebstormProjects`).

## Answers

1. **The `./bootstrap` layer contract.** I recommend option (ii): the prior verdict's option (a), placing layered normal declarations beside unlayered importance (`scaffold/.orkestrel/veneer/important-layer-design-verdict.md:18-24`). The face writes every normal declaration into the single `bootstrap` layer. It writes every `!important` declaration outside every layer through `@at-root (without: layer)`. The Orchestrator's Sass probe showed that this lift keeps the selector and the media query at the source position (`important-layer-design-verdict.md:67-73`).
   - **Option (i) is refused.** An unlayered Bootstrap normal declaration beats every layered normal declaration (CSS Cascade 5 § Cascade sorting order), so several things lose that the tenets need:
     - `./styles` additions;
     - semantic-tag defaults over reboot (`veneer/ROADMAP.md:17`);
     - theme packs that retune `--bs-*` on the element where Bootstrap declares them (`veneer/node_modules/bootstrap/dist/css/bootstrap.css:7`, `:128`);
     - a Tailwind-only utility over a component (`scaffold/.orkestrel/veneer/f8-design-verdict.md:38-42`).

     The reviewer names the same cost (`scaffold/tmp/units/foundation-audit-reviewer-verdict.md:70`). Option (i) also undoes the user's own sentence at `veneer/ROADMAP.md:71`.
   - **Option (iii) is refused.** Established fact 1b holds: a layered Bootstrap `!important` beats a consumer's later unlayered `!important`. That reverses Bootstrap and breaks the escape that D6 promises (`scaffold/.orkestrel/veneer/units/decisions-round-2.md:50-56`).
   - **What "the same output" means.** It means two equalities over one authored source (instrument in answer 3):
     - (a) Compiled with `$layered: false`, the source is byte-identical to `bootstrap.css` after both texts pass through one Sass round trip.
     - (b) Read in Chromium's CSS object model (CSSOM), the published sheet lists the same rules, selectors, declarations, values, priorities, and grouping contexts, in the same order, as `bootstrap.css` read the same way. The reading flattens every `bootstrap` layer block, drops layer statements, and merges adjacent rules with the same selector and context.
     - The one sanctioned difference is placement: a normal declaration sits in `bootstrap`, and an important declaration sits in no layer.
   - **What "Bootstrap wins on a shared class" means.**
     - *Normal declarations:* no Veneer sheet writes a class name that Bootstrap declares. `./tailwindcss` omits every such name, and a disjointness proof guards this, so Bootstrap's rule is the only rule. Beside real Tailwind, the consumer recipe's exclusion line withholds the name (`f8-design-verdict.md:50-58`).
     - *Important declarations:* Bootstrap's unlayered `!important` beats every layered normal declaration, whatever the load order. Only a layered `!important` beats it, such as Tailwind's important modifier or a consumer's layered escape. Both are explicit overrides on a different class token.
   - **Consumer override paths.**
     - *Its own `!important`:* an unlayered one wins when it loads later at equal or higher specificity, as in Bootstrap. A layered one wins at any specificity (`important-layer-design-verdict.md:37-39`).
     - *A token:* `--bs-*` set on `:root` or any scope wins over Bootstrap's `:root` block by layer. This holds in unlayered CSS or in the `theme` layer, whatever the specificity or load order.
     - *Source order:* it decides as in Bootstrap inside `bootstrap` (fact 1c) and among unlayered important rules.
     - *A normal rule:* any unlayered consumer rule beats a Bootstrap normal declaration at any specificity (fact 1a). This is the one behavioural difference from a drop-in and is named under Tenet conflicts.
   - **One source can emit both forms.** The pieces are:
     - `src/bootstrap/_tokens.scss` declares `$layered: true !default`.
     - `index.scss` opens with `@forward 'tokens' show $layered`, so `@use '…/bootstrap/scss' with ($layered: false)` configures it.
     - `_mixins.scss` holds `layer`, which wraps `@content` in `@layer bootstrap` when `$layered` is true.
     - `_mixins.scss` also holds `unlayer`. It takes a map of properties and values, writes each as `!important`, and lifts it under `@at-root (without: layer)` when `$layered` is true. Otherwise it emits in place.
     - With `$layered: false`, the face also drops the order statement.
     - `unlayer` is the only home of importance. A face case refuses a literal `!important` anywhere in `src/bootstrap/**` outside `_mixins.scss`.
     - The knob is a boolean (`scaffold/AGENTS.md:53`). Its first consumer is the conformance proof, and its second is a Sass consumer who wants the drop-in. Only the layered form ships built.
     - *Unverified:* that the configuration passes through `@forward … show` into partials that `@use '../tokens'`. The run is a two-partial fixture compiled both ways with the installed Sass (`veneer/package.json:138`).
   - **The roadmap sentence survives, amended.** "Bootstrap cascade-layer order is the single `bootstrap` layer" becomes the answer 7 text.

2. **Cross-face composition.** Every face opens with the same statement:
   `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;`
   - **Why each layer sits where it does.**
     - `reset` comes first so a Veneer reset yields to everything.
     - `base` is reserved for Tailwind's preflight.
     - `bootstrap` follows `base`, so reboot beats preflight. This is the relationship behind fact 5's zero-departure reading, where reboot sat after `base` (`f8-design-verdict.md:86-91`; `scaffold/tmp/units/absorb-engine-terrain-distillate.md:46`).
     - `theme` follows `bootstrap`, so a pack retunes `--bs-*` by layer alone.
     - `elements` through `utilities` keep F8-R2's relative order after `bootstrap`. Veneer additions and Tailwind utilities then override Bootstrap normal declarations (`f8-design-verdict.md:38-42`).
     - `surfaces`, `composables`, and `modifiers` sit ahead of `utilities`, as `veneer/ROADMAP.md:71` and `veneer/src/styles/_tokens.scss:2` fix. A single-property class therefore still wins over state chrome.
     - Moving `theme` out of first place leaves Tailwind unaffected: its `theme` layer declares custom properties only, and `var()` resolves on computed values in any layer. *Unverified*; the composition proof in answer 3 covers it.
   - **Why load order stops mattering.** A later statement cannot reorder layers that already exist (`scaffold/tmp/units/foundation-audit-analyst-verdict.md:23`).
     - With the same line in every face, whichever Veneer sheet arrives first fixes the full order, and the others add nothing.
     - Real Tailwind's `theme, base, components, utilities` names only existing layers when it follows a Veneer sheet.
     - The one requirement is that a Veneer sheet, or the line itself, precedes `@import 'tailwindcss'`. That is what `scaffold/.claude/rules/styles.md:54` already asks.
     - If Tailwind loads first, `reset`, `bootstrap`, `elements`, `surfaces`, `composables`, and `modifiers` append after `utilities`. The guide states this limit, and the composition proof keeps it as its control.
   - **The `./layers` prelude is refused.** It is an extra import whose omission misorders the page silently, which is the fact 2 mechanism, and it buys nothing over the per-face line.
   - **Folding layered Bootstrap into `./tailwindcss` is refused.** The two are separate surfaces (`veneer/ROADMAP.md:7`), and the Tailwind face maps rather than carries Bootstrap (`veneer/ROADMAP.md:15`). A consumer loads two sheets, and the shared line makes their order irrelevant.
   - **Which layers each face writes.** A face names every layer in its statement but writes rules only into its own layers:
     - `./bootstrap`: `bootstrap`, plus unlayered importance.
     - `./tailwindcss`: `theme`, `reset`, `elements`, `components`, and `utilities`.
     - `./styles`: `theme`, `reset`, `elements`, `components`, `surfaces`, `composables`, `modifiers`, and `utilities`.
     - `./styles/themes`: `theme`.
     - No face writes `base`.
   - **Shared layers.** Where faces share a layer, the order inside it follows load order. The faces therefore write disjoint class names, and a disjointness proof over the built sheets guards this.
   - **Judgment call for the Tailwind chunk.** If the map retunes Tailwind's own `theme` variables, it ties with real Tailwind's `:root, :host` block and depends on load order. The chunk rules whether the map writes Tailwind variables at all.

3. **The recreation proof.** The instrument has three links, each paired with a failing control (`scaffold/.claude/rules/quality.md` § Instruments).
   - **Link 1, Node, `conformance`.** Sass reads both sides, because Sass is the declared toolchain compiler (`veneer/package.json:138`).
     - Compile `@use 'src/bootstrap' with ($layered: false)` and `bootstrap.css` (read as `syntax: 'css'`) in `compressed` style, and compare the bytes.
     - The round trip normalizes whitespace, drops ordinary comments, the Vite marker, and `/*# sourceMappingURL */` (`bootstrap.css:12048`), and keeps the `/*!` banner (`bootstrap.css:2`) on both sides.
     - The same file pins the SHA-256 of the installed `bootstrap.css`, which closes 26b (`scaffold/tmp/units/foundation-audit-verdict.md:41`).
     - *Control:* a scratch copy of `bootstrap.css` with one declaration value changed must compare unequal.
     - *Unverified:* that Sass accepts `bootstrap.css` as CSS syntax, including the empty custom property at `bootstrap.css:5379`. The run is that compile.
   - **Link 2, Node, `conformance`.** The built `dist/src/bootstrap/index.css` equals the `$layered: true` compile after the same round trip. This link proves that the Vite pipeline adds nothing, including any Lightning CSS rewrite (`veneer/configs/src/vite.bootstrap.config.ts:16-18`).
     - *Control:* a rule appended to a scratch copy of the built sheet fails.
   - **Link 3, Chromium, `src:bootstrap`.** Load the built sheet and `bootstrap/dist/css/bootstrap.css?raw` into constructable `CSSStyleSheet` objects.
     - Walk `cssRules` depth-first. Flatten `CSSLayerBlockRule` blocks, drop `CSSLayerStatementRule` rules, and carry each rule's grouping context (media, supports, and container condition text).
     - Merge adjacent rules with the same selector and context, which rejoins the lift's split, for example `bootstrap.css:4321-4332`.
     - Compare the ordered sequence of selector, context, and each declaration's name, value, and `getPropertyPriority`.
     - Assert the placement invariant: every important declaration sits outside every layer, and every normal one sits inside `bootstrap`.
     - *Controls:* one changed declaration in a copy fails the sequence, and a planted layered `!important` fails the invariant.
     - Link 1 covers what the browser discards. For example, Chromium is expected to drop the `::-moz-focus-inner` rule (`bootstrap.css:499`). *Unverified*; the run is `replaceSync` on `bootstrap.css` followed by a search for that selector.
   - **Refused parsers.** PostCSS and Lightning CSS are not declared (`veneer/package.json:123-145`). Importing them is a phantom dependency, and declaring them adds a package (`scaffold/AGENTS.md:36`) and a second CSS parser (`scaffold/AGENTS.md:28`).
   - **Where every CSS-face proof lives.** Text proofs over Sass output stay in Node. Resolved-style proofs run in Chromium. A Chromium project reads built text through `?raw` and compiles fixtures through `?inline` (`f8-design-verdict.md:77-81`).

     | Project | Environment | Proofs |
     | --- | --- | --- |
     | `conformance` (`tests/conformance.test.ts`; scaffold template `scaffold/src/core/templates.ts:559-573`) | Node | Links 1 and 2; the digest pin; the Bootstrap barrel order against `node_modules/bootstrap/scss/bootstrap.scss:15-51`; the Tailwind compatibility sheet against real Tailwind, in the Tailwind chunk |
     | `src:bootstrap` | Chromium | Link 3 and the placement invariant; the order line; layer ownership; the `TOKEN_NAMES.bootstrap` pins (answer 5) |
     | `src:tailwindcss` | Chromium | Order line; ownership (never `base`, `bootstrap`, or a styles-only name); disjointness from the Bootstrap class set read from `bootstrap.css?raw` |
     | `src:styles` | Chromium | Order line; ownership; the theme cases (answer 4); the `veneer` token pins in the styles chunk |
     | `integration` (`tests/integration.test.ts`, which composes across environments per `scaffold/.claude/rules/tests.md:80-83`) | Chromium | Every load permutation of the faces and the themes sheet; the fact 1 override cases under the lift; the real-Tailwind recipe in the Tailwind chunk |
     | `distribution` | Node, `prepublishOnly` | Every CSS subpath and every `/scss` barrel resolves and compiles through `pkg:` (claim 3) |

     The `src:*` placement follows the matrix row that puts `src:styles` in Playwright Chromium (`scaffold/.claude/rules/workspace.md:123`) and replaces today's Node blocks (`veneer/configs/src/vite.styles.config.ts:23-32`). This closes S7 (`foundation-audit-verdict.md:54`).
   - **Face-equality cases stay `it.todo`** until the cascade chunk (`scaffold/.claude/rules/tests.md:42`). Each instrument and its control land green on the foundation.

4. **Themes.**
   - **Selector scheme.** A mixin `retune($name, $mode)` in `src/styles/_mixins.scss` is the one home of the scheme. Every pack calls it. It emits, inside `@layer theme`:
     ```scss
     @scope ([data-vn-theme='NAME']) to ([data-vn-theme]) {
     	:scope, [data-bs-theme='light'] { /* light values */ }
     	:scope[data-bs-theme='dark'], [data-bs-theme='dark'] { /* dark values */ }
     }
     ```
     `NAME` is the pack name. Dark is emitted after light, and `:scope[…]` outranks `:scope` on the pack root. How the scheme behaves:
     - A dark island anywhere inside the pack takes dark values.
     - A light island inside a dark island takes light values.
     - The lower boundary stops the pack at a nested `data-vn-theme`, which removes the leak the analyst warns of (`foundation-audit-analyst-verdict.md:27`).
     - `@scope` follows the native-API tenet (`veneer/ROADMAP.md:19`).
     - The pack wins over Bootstrap's `:root` and `[data-bs-theme=dark]` blocks by layer, whatever the specificity or load order.
     - *Limit, stated in the guide:* a pack root with no `data-bs-theme` of its own, inside a dark ancestor, renders light. Put `data-vn-theme` on the same element as the outermost `data-bs-theme`, or above it.
     - *Unverified:* `@scope` support and the limit's exclusion of the root itself. The run is the island cases in Chromium, plus each browser the guide lists.
   - **A consumer who sets only `data-bs-theme`** receives Bootstrap's own modes from `./bootstrap` and Veneer's `--vn-*` defaults from `./styles`. They receive no pack value.
   - **The default pack is opt-in.** An attribute is the explicit control, loading a sheet of named packs never restyles a page by itself, and the analyst reads the opt-in as intended (`foundation-audit-analyst-verdict.md:27`).
   - **Built entry.** The export follows the pattern the other faces use (`veneer/package.json:53-58`):
     - `./styles/themes` maps to `./dist/src/styles/themes/index.css`, and `./styles/themes/scss` maps to `./src/styles/themes/index.scss`.
     - The build target is `configs/src/vite.themes.config.ts`: out directory `dist/src/styles/themes`, `cssMinify: false`, and entry `src/styles/themes/sheet.ts`, which imports `index.scss` as `veneer/src/bootstrap/sheet.ts:1` does.
     - `build:src:styles` chains it after the styles build, because that build empties `dist/src/styles` (`veneer/configs/src/vite.styles.config.ts:11-12`).
     - `files` excludes `dist/src/styles/themes/index.js`, as it does the other stubs (`veneer/package.json:15-17`).
     - A conditional `sass` export is refused: it breaks the shape the other faces share.

5. **The token registry.**
   - **Scope: defer the `veneer` group.** Remove it until the styles chunk declares its first token. The capability as typed claims names that "the shipped cascade declares" (`veneer/src/core/types.ts:15`), which fact 4 falsifies, and it has no first consumer (`scaffold/AGENTS.md:63`; `foundation-audit-reviewer-verdict.md:97-102`). `ROADMAP.md:25` is amended to match (answer 7).
   - **Key scheme: one derivation law for both groups.** Every leaf equals its group prefix followed by its key path joined with `-`, where a `base` key adds nothing.
     - For `bootstrap`, the keys are Bootstrap's own words split at hyphens. `scaffold/.claude/rules/names.md:120` requires a transliterated name to keep its external wording, and that rule wins over `:113`'s abbreviation ban for `bg`.
     - Examples:

       | Leaf | Name |
       | --- | --- |
       | `primary.base` | `--bs-primary` |
       | `primary.bg.subtle` | `--bs-primary-bg-subtle` |
       | `primary.text.emphasis` | `--bs-primary-text-emphasis` |
       | `primary.border.subtle` | `--bs-primary-border-subtle` |
       | `body.line.height` | `--bs-body-line-height` |
       | `box.shadow.sm` | `--bs-box-shadow-sm` |
       | `font.sans.serif` | `--bs-font-sans-serif` |
       | `border.radius['2xl']` | `--bs-border-radius-2xl` |

     - The present keys break the law in exactly the places S6 names: `veneer/src/core/constants.ts:347-349`, `:415`, `:474`, and `:479`.
     - Under the law, `--vn-*` names drop the `-base` suffix. That is the styles chunk's naming decision.
   - **Proofs.**
     - *`bootstrap` group:*
       - The leaf set equals the `--bs-*` names in the `:root, [data-bs-theme=light]` rule of the official `bootstrap.css`. This case exists at `veneer/tests/src/bootstrap/index.test.ts:24-54`.
       - The leaf set also equals the same rule of the built `./bootstrap` sheet, read through CSSOM in `src:bootstrap`. This case is `it.todo` until the cascade chunk.
       - A law case checks every leaf.
       - The member floor names `--bs-primary`, `--bs-body-bg`, and `--bs-border-radius-2xl` (`scaffold/.claude/rules/tests.md:34`).
       - *Controls:* the renamed leaf and the appended declaration that exist today, plus a mis-keyed leaf that the law refuses.
     - *`veneer` group (styles chunk):* the leaf set equals the `--vn-*` names that the built `./styles` sheet declares on `:root`. Every `--vn-*` name a pack declares is a leaf. The chunk sets the member floor.

6. **Vue without a dependency.** I recommend an optional peer, as a tenet amendment for the user to rule on. It lands with the Vue chunk's first `vue` import, when the external check changes (`veneer/ROADMAP.md:104`). The three options compare as follows.
   - **Optional peer.** `peerDependencies.vue` plus `peerDependenciesMeta.vue.optional: true`.
     - The consumer installs `vue` and writes `import { … } from '@orkestrel/veneer/vue'`.
     - npm installs no optional peer and resolves the consumer's `vue`.
     - pnpm links the consumer's `vue` into the package's resolution scope.
     - Yarn Plug'n'Play (PnP) grants the package access to the consumer's `vue`.
     - All three resolve the application's own Vue instance, and composables that share reactivity need that single instance.
     - A consumer without Vue can still import `.` and `./browser` (`foundation-audit-reviewer-verdict.md:61`).
     - *Unverified by run.* The run is a consumer fixture per package manager that installs the packed tarball and `vue`, then imports `./vue` from Node and from Vite.
   - **Documenting an npm hoisting requirement.** The import is the same, and it works under npm by hoisting. Under pnpm strict and Yarn PnP it fails, per fact 6.
     - *Unverified qualifier:* pnpm's default hidden hoist and Yarn's default `pnpFallbackMode: dependencies-only` might resolve the import anyway. Even then, nothing ties the resolved copy to the application's instance.
   - **Injection.** The consumer passes `ref`, `watch`, `onMounted`, and the other primitives into a factory from `./vue`. It resolves everywhere and declares nothing, but it is refused:
     - The user replaced it in D3: "no dependency at all … leaves it up to the user to pull vue in", recorded as "Replaces the injected-adapter recommendation" (`scaffold/.orkestrel/veneer/units/decisions-round-2.md:10-13`, `:31-34`).
     - Typing it either re-declares Vue's function types or imports `vue` types, which consumers then need in order to type-check.
   - **Build externals under the peer.** `vue` becomes external through the peer list that `isVueBuildExternal` already takes (`veneer/configs/helpers.ts:335-351`). `@vue/*` stays refused, because the face imports `vue` alone.

7. **The styles rule against the roadmap.** The rule changes and the roadmap keeps the user's shape. Conforming the roadmap would force three outcomes:
   - folding themes into `index.scss`, which contradicts `veneer/ROADMAP.md:30`;
   - an order statement that only a consumer entry carries, which a CSS-only consumer does not have;
   - a layer per folder on Bootstrap, which re-opens fact 1.

   **Replacements in `scaffold/.claude/rules/styles.md`:**
   - After `:19`, add a table row: `` | `themes/index.scss` | Barrel of named theme packs, compiled into its own sheet | ``
   - `:25` becomes: "`index.scss` is the sole compilation barrel of its sheet; it loads `tokens`, `theme` where `_theme.scss` exists, and the output partials with `@use`. Never load `themes/` from `index.scss`."
   - `:27` becomes: "`_theme.scss` and each `themes/` pack only retune tokens under theme selectors such as `[data-theme='…']`."
   - `:53` becomes: "Never wrap rules in a foreign cascade layer. Each partial uses its folder's own layer. A sheet that recreates an external framework instead writes every normal declaration into one layer named for that framework and every `!important` declaration outside every layer."
   - `:54` becomes: "Declare cascade-layer order once in the consumer entry before `@import 'tailwindcss'`, so utilities win predictably. When a package publishes several sheets, open every published sheet with the same full order statement, so the order holds whichever sheet loads first."

   **Replacements in `veneer/ROADMAP.md`** (the tenet lines `:12` and `:14` wait for the user's ruling; the wording is under Tenet conflicts):
   - `:25`: "`src/core` exports `.` — `TOKEN_NAMES`, `TokenMap`, `TokenName`, and `TokenLeaf`. `TOKEN_NAMES` holds the `bootstrap` (`--bs-*`) group; the styles chunk adds the `veneer` (`--vn-*`) group with its first declared token. Every leaf is its group's prefix followed by its key path joined with `-`, where a `base` key adds nothing. Core holds CSS variable token names only."
   - `:30`: "`src/styles` exports `./styles` (built CSS without themes), `./styles/scss` (compilation barrel `index.scss` without themes), `./styles/themes` (built themes CSS), and `./styles/themes/scss` (themes barrel `themes/index.scss`). That barrel loads the default pack `themes/_default.scss`. Extra theme packs are optional files the consumer imports. `data-vn-theme` opts an element and its subtree into a pack; the default pack answers `data-vn-theme="default"`. Inside that subtree the pack follows the nearest `data-bs-theme` and stops at a nested `data-vn-theme`. Bootstrap's own light/dark remains `data-bs-theme` on the bootstrap surface; `data-vn-theme` stays off `src/bootstrap`."
   - `:57`: "`_tokens.scss` — `:root` public custom properties and the package's one cascade-layer order statement; on `src/bootstrap` it also declares `$layered`. Literal colors appear only here, and only as the value that declares a token."
   - `:71`: "Every face opens with one cascade-layer order statement: `reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities`. Bootstrap writes every normal declaration into `bootstrap` and every `!important` declaration outside every layer. Tailwind writes into `theme`, `reset`, `elements`, `components`, and `utilities`. Styles writes into those and into `surfaces`, `composables`, and `modifiers`. Theme packs write into `theme`. No face writes into `base`, which Tailwind's preflight owns."
   - Append to `:73`: "Bootstrap's partials mirror Bootstrap's source files in `scss/bootstrap.scss` import order: `_tokens.scss` holds `_root.scss`, `_reset.scss` holds `_reboot.scss`, `elements/` keeps an empty barrel, `components/` holds `_type.scss` through `_placeholders.scss` and then the `_helpers.scss` partials, and `utilities/` holds the utilities map and its one emitter."
     - Reboot interleaves `button` and `select` rules (`bootstrap.css:447-492`), so a partial per element cannot keep that order.
     - The utilities API loops breakpoints outside utilities (`veneer/node_modules/bootstrap/scss/utilities/_api.scss:2-16`), so a partial per utility group reorders `.m-sm-0` against `.mt-3`.
   - Table row `:90`: "`themes/index.scss` | `themes/sheet.ts` — the build entry of `./styles/themes`".

8. **The showcase and journey conventions.**
   - **The gate.** `tests/showcase.test.ts` runs Vite's `build()` for each mode against `configs/app/vite.showcase.config.ts` with `build.write: false`. It asserts that the emitted HTML equals the committed `showcase/<mode>.html` byte for byte; the content-hash stamp makes the build deterministic.
   - **Controls.** A scratch copy of a committed page with one byte changed fails. A mode whose entry is absent expects no page (`veneer/configs/helpers.ts:416-418`).
   - **Project and gate placement.** It sits in a Node workspace-proof project named `showcase`, run by `test:showcase` from `prepublishOnly`, because "a project leaves the default run when it … drives a real build" (`scaffold/.claude/rules/workspace.md:186`).
   - **Refused alternatives.** Building the pages in `npm run build` is refused, because "The showcase is outside the default build" (`scaffold/.claude/rules/workspace.md:109`).
   - **Missing reading.** The in-memory build duration is not measured. If it is small, the user can move the gate into `test`, where a stale page is caught when it is committed. That is a rule change.
   - **Where the project comes from.** The project row comes from scaffold (answer 9, item 3); the root `vite.config.ts` is scaffold-owned (`f8-design-verdict.md:74-75`).

9. **Scaffold propagation.** The behaviours in the five hand-edited files, with the scaffold change that carries each, ordered by what unblocks the veneer chunks first:
   1. **CSS faces as a surface kind.** Needed by the Bootstrap, Tailwind, and styles chunks (`veneer/ROADMAP.md:100-102`). This change adds none of the five files' behaviours. It generates, for any number of style-shaped faces:
      - the per-face Vite wrapper (birth-owned today: `veneer/configs/src/vite.bootstrap.config.ts:5-8`);
      - a Chromium project with `setupStyles.ts` per face;
      - the `./<face>` and `./<face>/scss` exports;
      - `files` and `sideEffects`;
      - the `conformance` blueprint fact (`scaffold/src/core/compilers.ts:335`, `:371`, `:859`).
   2. **A `vue` environment on both axes.**
      - `configs/helpers.ts`: `src/vue` and `app/vue` as browser-side owners and targets (`veneer/configs/helpers.ts:437-495`), and `src/vue` in the `environmentBoundary` owner union (claim 9, O1).
      - `.oxlintrc.json`: an import-restriction block per Vue environment (`foundation-audit-analyst-verdict.md:38`; `foundation-audit-reviewer-verdict.md:52`).
      - `tsconfig.json`: the `@app/vue` alias (`veneer/tsconfig.json:28`), plus the root check through `vue-tsc` when Vue is selected (`foundation-audit-reviewer-verdict.md:40-42`).
      - `tests/config.test.ts`: the matching cases.
   3. **Showcase and journey surfaces.**
      - `configs/helpers.ts`: `showcaseBuildOutput`, `showcaseHtmlEntry`, `showcaseHtmlPresent`, and `journeyTestInclude` (`veneer/configs/helpers.ts:386-435`).
      - The template: root `showcase/<surface>.html` output with no copy step, and the content-hash stamp.
      - `.prettierignore`: `showcase/` (`veneer/.prettierignore:7-8`).
      - The `showcase` freshness project from answer 8.
      - `tests/config.test.ts`: the matching cases.
      - Every chunk demonstrates its API in the showcase (`scaffold/.claude/rules/documentation.md` § Authority and workflow).
   4. **Core external and browser specifier rewrite.**
      - `isCoreBuildExternal` (`veneer/configs/helpers.ts:370-373`) goes into the core wrapper template.
      - `rewriteBrowserSpecifier` (`veneer/configs/helpers.ts:762`) goes into the declaration rollup for any face that imports `@src/browser` (S8).
      - `tests/config.test.ts`: the matching cases.
   5. **The Vue external through the optional peer**, in the Vue chunk. `isVueBuildExternal`'s throw retires, and the generic peer rule externalizes `vue`. Until then, `veneer/tests/src/vue/index.test.ts:22-25` holds the policy.

   A package-owned config leaf is not needed, and one would break `scaffold/.claude/rules/workspace.md:64`.

## Proposal

- **`.`** It ships `TOKEN_NAMES` (the `bootstrap` group, keyed by the derivation law) with `TokenMap`, `TokenName`, and `TokenLeaf`. It holds no CSS and no layer. There is no override path, because it carries names rather than values. Proofs: the law case and the two-way pins in `src:bootstrap`, plus the guide's Surface rows under `npm run test:guides`.

- **`./browser`** It ships the interaction engine. The foundation barrel is empty. The engine toggles the state classes and attributes that `./bootstrap` styles, and it never runs Bootstrap JavaScript (`veneer/ROADMAP.md:11`). It holds no CSS and no layer. Overrides are engine options, which the engine chunk defines. Proofs: `src:browser` in Chromium and `showcase/browser.html`.

- **`./vue`** It ships composables that wrap `./browser`. `vue` becomes an optional peer from the Vue chunk, and the face is empty today. It holds no CSS and no layer. Proofs: `src:vue`, the Vue journey that mounts the application, and `distribution`, which resolves `./vue` with a consumer's Vue and `.` without one.

- **`./bootstrap` and `./bootstrap/scss`** It ships the Bootstrap 5.3.8 recreation in Bootstrap's own partial map and order. The sheet opens with the order line. Every normal declaration sits in `bootstrap`, and every `!important` sits outside every layer through `unlayer`. The Sass form takes `$layered: false` for a drop-in. Overrides: a consumer's unlayered rule at any specificity, the consumer's own `!important` as in Bootstrap, and any `--bs-*` token set unlayered or in `theme`. Proofs: links 1 and 2 in `conformance`; link 3, the placement invariant, and the token pins in `src:bootstrap`; the override and permutation cases in `integration`.

- **`./tailwindcss` and `./tailwindcss/scss`** It ships the compatibility sheet that the Tailwind map feeds. It writes into `theme`, `reset`, `elements`, `components`, and `utilities`, never into `base` or `bootstrap`, and never declares a class name that Bootstrap declares. Overrides: a consumer's unlayered rule, a consumer layer declared after the line, and tokens. Proofs:
  - equality against real Tailwind in `conformance`, with the Tailwind devDependency added by its chunk (`veneer/ROADMAP.md:101`);
  - ownership and Bootstrap disjointness in `src:tailwindcss`;
  - the real-Tailwind recipe in `integration`.

- **`./styles` and `./styles/scss`** It ships Veneer's additions against the pin. It writes into `theme`, `reset`, `elements`, `components`, `surfaces`, `composables`, `modifiers`, and `utilities`, all after `bootstrap`, so semantic-tag defaults and additions override reboot and component normal declarations. The styles chunk replaces the placeholder refusal of `--bs-` and `.btn` (`foundation-audit-verdict.md:52`). Overrides: as for `./tailwindcss`. Proofs: the order line, ownership, and the `veneer` token pins in `src:styles`.

- **`./styles/themes` and `./styles/themes/scss`** It ships the built packs, and the default pack answers `data-vn-theme="default"` through `retune`. It writes only into `theme`, which beats Bootstrap's token blocks by layer. It is opt-in. Overrides: a consumer's unlayered token, or another pack. Proofs: the fixture-pack island cases, the only-`data-bs-theme` case, and the nested-pack case in `src:styles`, plus resolution in `distribution`.

- **The guide.** `guides/veneer.md` gives each surface one section with:
  - its CSS and Sass import lines;
  - the order line and the layers the surface writes;
  - a table of override paths;
  - the load-order limit with real Tailwind.

  It is written in the present tense, addresses the reader as `you`, and uses the imperative for recipes.

## Tenet conflicts

- **`veneer/ROADMAP.md:14`, "with the same output."**
  - *Why:* a layered sheet cannot keep Bootstrap's behaviour for a consumer's unlayered normal rule (fact 1a), and the user's own `veneer/ROADMAP.md:71` layers the face.
  - *Smallest amendment:* "The Bootstrap surface recreates Bootstrap 5.3.8 in authored source order with the same rules, declarations, values, and importance. It writes every normal declaration into the `bootstrap` cascade layer and every `!important` declaration outside every layer, so a consumer's unlayered rule overrides a Bootstrap normal declaration at any specificity. The pin is the map. Pin `bootstrap` at `5.3.8` as a `devDependency`. Import official `bootstrap` only from tests and setup; those proofs compare against the exported CSS."
- **`veneer/ROADMAP.md:12`, "not peer dependencies" (for Vue only).**
  - *Why:* a bare `vue` import in `dist/src/vue/index.js` does not resolve under pnpm strict or Yarn PnP without a declaration (fact 6), and injection was withdrawn by D3.
  - *Smallest amendment:* "The consumer supplies Vue. Bootstrap, Tailwind, and Vue are not runtime dependencies. Bootstrap and Tailwind are not peer dependencies. Vue is an optional peer dependency (`peerDependenciesMeta.vue.optional`), so no install adds Vue and only `./vue` reads it. Runtime dependencies are `@orkestrel/*` only."

## Units

| Unit | Owned files | Acceptance criterion | Must not touch |
| --- | --- | --- | --- |
| F1 RULINGS. Orchestrator to the user; blocks F2, F3, and the Vue chunk | None | The user rules on both tenet amendments, the order line, and theme opt-in | Any file |
| F2 RULE. `opus`, native, in the scaffold checkout; after F1 | `scaffold/.claude/rules/styles.md` | The answer 7 rule sentences land verbatim; scaffold `npm run test:policy` is green; released in the next scaffold version | The veneer tree; other rules |
| F3 ROADMAP. Orchestrator; after F1 | `veneer/ROADMAP.md` | The answer 7 roadmap sentences and the ruled tenet text land verbatim; no other line moves | Code, tests |
| S1 FACE-KIND. `opus`, native, in scaffold | Scaffold generator, templates, and `tests/config.test.ts` cases for style-shaped faces and the `conformance` fact | A generated fixture workspace with two faces builds each face, and each face's project reports `chromium` | Veneer |
| S2 VUE-ENV. `opus`, native, in scaffold; after S1 | Scaffold environment set, boundary helpers, lint block emission, alias emission, root `vue-tsc` check | A generated Vue workspace passes `check` with a `.vue` import, and `src/vue` importing `@app/core` fails lint and the Vite fence | Veneer |
| S3 SHOWCASE-SURFACES. `opus`, native, in scaffold; after S2 | Scaffold showcase and journey templates, mode helpers, `.prettierignore` template, content-hash stamp, `showcase` project row | Generated `browser` and `vue` pages land at root `showcase/`; the freshness case fails on a one-byte scratch edit | Veneer |
| F4 PROJECTS. `opus`, native; after S1 is adopted in veneer | `configs/src/vite.{bootstrap,tailwindcss,styles}.config.ts` test blocks; the `conformance` project and `test:conformance`; `tests/conformance.test.ts` (digest pin); `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` (a `?raw` sheet reader and the CSSOM flatten helper); face tests moved to `?raw` | Each face project runs in Chromium and collects its file; the digest pin passes and a one-byte scratch control fails; the flatten helper's proof passes with a planted-rule control | `src/**` |
| F5 ORDER. `opus`, native; after F3 and F4 | `src/{bootstrap,tailwindcss,styles}/_tokens.scss`; `src/bootstrap/index.scss`; `src/bootstrap/_mixins.scss`; `tests/src/*/index.test.ts` order and ownership cases; `tests/fixtures/bootstrap/*.scss` | The three built sheets open with the identical line; a planted foreign-layer rule fails ownership; the `$layered: false` fixture emits no `@layer`; the `unlayer` fixture emits important, unlayered, inside its media query at source position; a literal `!important` planted outside `_mixins.scss` fails | Partial bodies, configs |
| F6 RECREATION-PROOF. `opus`, native; after F5 | `tests/conformance.test.ts` (links 1 and 2); `tests/src/bootstrap/index.test.ts` (link 3, placement) | Every instrument passes its own control (a copy of `bootstrap.css` with one changed declaration; a planted layered `!important`); face-equality cases are `it.todo` naming the cascade chunk | `src/**` |
| F7 BOOTSTRAP-MAP. `opus`, native; after F6 | `src/bootstrap/**/*.scss` partial set and barrels; the barrel-order case in `tests/conformance.test.ts` | The partial set matches the answer 7 sentence; the barrel sequence matches `bootstrap.scss:15-51` through a declared mapping; swapping two `@use` lines in a scratch copy fails | `src/tailwindcss`, `src/styles` |
| F8 THEMES. `opus`, native; after F5 | `src/styles/_mixins.scss` (`retune`); `src/styles/themes/_default.scss`; `src/styles/themes/sheet.ts`; `configs/src/vite.themes.config.ts`; `package.json` exports, `files`, and `build:src:styles`; `tests/src/styles/themes.test.ts`; `tests/fixtures/styles/pack.scss` | The fixture pack reaches a root, a dark island, and a light island inside a dark island; it stops at a nested other pack; an element under only `data-bs-theme` receives nothing; the built sheet writes only `theme`; both subpaths resolve in `distribution` release mode | `src/bootstrap`, `src/core` |
| F9 TOKENS. `opus`, native; after F3 and F6 | `src/core/constants.ts`; `src/core/types.ts` (TSDoc); token cases in `tests/src/bootstrap/index.test.ts`; `tests/src/core/index.test.ts` | The `bootstrap` group is re-keyed under the law; the law case fails a mis-keyed control; the two-way pin against `bootstrap.css` is green with its floor; the built-sheet pin is `it.todo`; the `veneer` group is removed | `src/**/*.scss` |
| F10 COMPOSE. `opus`, native; after F5 and F8 | `tests/integration.test.ts`; `tests/fixtures/integration/*` | Every load permutation of the three sheets and the themes sheet resolves planted probe rules to one layer order; a Tailwind-shaped statement loaded first reorders (control); a consumer's later unlayered `!important` at equal specificity beats a lifted one; a consumer's unlayered normal rule beats a layered rule of higher specificity | `src/**` |
| F11 SHOWCASE-GATE. `opus`, native; after S3 is adopted | `tests/showcase.test.ts`; `package.json` `test:showcase` and `prepublishOnly` | Both committed pages equal their in-memory builds; the one-byte scratch control fails | `app/**` |
| F12 GUIDE. `opus`, native; last | `guides/veneer.md` | The per-surface sections from the Proposal land; `npm run test:guides` is green | Code |

## Alternatives refused

- **Unlayered `./bootstrap`.** Every layered Veneer rule, theme pack, and Tailwind utility loses to a Bootstrap normal declaration (`foundation-audit-reviewer-verdict.md:70`; `bootstrap.css:7`), and it reverses `veneer/ROADMAP.md:71`.
- **Layered `./bootstrap` without the lift.** A layered `!important` beats a consumer's later `!important` (fact 1b; `important-layer-design-verdict.md:21-24`).
- **Shipping both built forms.** It doubles the proof surface and the export map. The unlayered form stays behind `$layered` for Sass consumers.
- **A `./layers` prelude.** Omitting it misorders the page silently, which is the fact 2 mechanism, and the per-face line needs no extra import.
- **`bootstrap` ahead of `base`.** Preflight would beat reboot, against `f8-design-verdict.md:86-91` and the fact 5 baseline.
- **`theme` first with packs inside it.** A pack loses to Bootstrap's `:root` block by layer (`bootstrap.css:7`, `:128`).
- **`./tailwindcss` carrying the layered Bootstrap.** The surfaces are separate (`veneer/ROADMAP.md:7`), and the Tailwind face maps rather than carries Bootstrap (`veneer/ROADMAP.md:15`).
- **Per-element reboot partials and per-group utility partials.** They break authored order (`bootstrap.css:447-492`; `node_modules/bootstrap/scss/utilities/_api.scss:2-16`).
- **PostCSS or Lightning CSS as the equality parser.** Both are undeclared (`veneer/package.json:123-145`; `scaffold/AGENTS.md:28`, `:36`).
- **CSSOM as the only equality instrument.** Chromium discards Firefox-only rules such as `bootstrap.css:499`, so a recreation missing them passes. *Unverified*; the run is named in answer 3.
- **The injected Vue adapter.** The user withdrew it in D3 (`decisions-round-2.md:31-34`).
- **An npm-hoisting-only Vue contract.** It fails under pnpm strict and Yarn PnP (fact 6) and does not guarantee the application's Vue instance.
- **A default pack that is on by default, or a descendant selector without a boundary.** The first makes loading a sheet restyle a page. The second leaks through a nested pack (`foundation-audit-analyst-verdict.md:27`).
- **A conditional `sass` export for themes.** It breaks the `/scss` subpath shape of `veneer/package.json:53-58`.
- **Keeping the roughly 150 `--vn-*` names.** They fail the creation gate (`scaffold/AGENTS.md:63`), and the claim in `veneer/src/core/types.ts:15` is false.
- **The showcase gate in `test`, or the showcase in `build`.** They are ruled out by `scaffold/.claude/rules/workspace.md:186` and `:109`.
- **A package-owned config leaf for `isVueBuildExternal`.** It breaks `scaffold/.claude/rules/workspace.md:64`, and the optional peer makes it unnecessary.

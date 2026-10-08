# Brief: variants for the styles layer

No styles partial applies a variant at `9f56e6a`. The `_maps.scss` partial and its load gate are in place, but no file under `src/styles` loads it. The sortable is the only styled native module, and its one color hook, the `--vn-drag-color` property, is a fallback that no rule declares. Bootstrap's contextual list-group items already retint the drag line through the `--bs-list-group-active-bg` token, which carries the text-emphasis family, not the base theme color. In the contrast run, the `info`, `warning`, and `light` base theme colors fall under a 3:1 ratio against the light body background, and `dark` falls under it against the dark body background. The showcase's section census refuses every class outside `CLASS_NAMES.bootstrap`, the icon classes, and `slide`, and the registries hold no `veneer` group. You rule the keying, the generation, and the scope of the mechanism, as the final section states.

This brief answers the variant item of the user's request of 2026-10-08: "I would like to allow applying variants to drag and drop elements and other elements and components that we come up with that need styling." The clipboard report on Edge for Android, the column-sort link report, and the sortable regression report belong to other units.

Every fact comes from `/home/user/veneer` at commit `9f56e6a`, read on 2026-10-08, and from the scaffold rule files the veneer `AGENTS.md` points at (`/home/user/veneer/AGENTS.md:11-15`). No browser ran. The file tree and the term census sit in `/home/user/veneer/tmp/units/variants-2026-10-08/map.txt`; the census reads the terms `vn-drag-color`, `vn-drag-size`, `data-vn-drag`, `maps.$`, `TOKEN_NAMES.veneer`, and `CLASS_NAMES.veneer` across `src/styles`, `tests/src/styles`, `tests/conformance.test.ts`, `guides/veneer.md`, `ROADMAP.md`, and `app/browser`. A repository search for the patterns `bootstrap/maps`, `CLASS_NAMES.veneer`, and `TOKEN_NAMES.veneer` across the `.ts`, `.scss`, and `.md` files of `src`, `app`, `guides`, `tests`, and `ROADMAP.md`, with `tests/conformance.test.ts` left out, returns the `ROADMAP.md:143` line and the `tests/src/styles/index.test.ts:86` line alone. The contrast figures come from `/home/user/veneer/tmp/units/variants-2026-10-08/contrast.mjs`, run on 2026-10-08, with its output in `contrast.txt` beside it.

## Maps partial and its admitted load

The `src/bootstrap/_maps.scss` partial holds the following maps, each declared `!default` and each emitting no CSS when loaded alone (`tests/conformance.test.ts:674-675`):

| Map | Lines | Keys | Values |
| --- | --- | --- | --- |
| `$grays` | 2-12 | `'100'` to `'900'` | `var(--bs-gray-*)` |
| `$colors` | 14-29 | `'blue'` to `'gray-dark'` | `var(--bs-*)` |
| `$theme-colors` | 31-40 | `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'` | `var(--bs-KEY)` |
| `$theme-colors-text` | 42-51 | the same keys | `var(--bs-KEY-text-emphasis)` |
| `$theme-colors-bg-subtle` | 53-62 | the same keys | `var(--bs-KEY-bg-subtle)` |
| `$theme-colors-border-subtle` | 64-73 | the same keys | `var(--bs-KEY-border-subtle)` |
| `$grid-breakpoints` | 75-82 | `xs` to `xxl` | literal lengths |
| `$breakpoint-tokens` | 84-91 | `xs` to `xxl` | `var(--bs-breakpoint-*)` |
| `$container-max-widths` | 93-99 | `sm` to `xxl` | literal lengths |
| `$spacers` | 101-108 | `0` to `5` | literal lengths |
| `$border-widths` | 110-116 | `1` to `5` | literal `px` lengths |
| `$font-sizes` | 118-125 | `1` to `6` | literal `rem` lengths |
| `$display-font-sizes` | 127-134 | `1` to `6` | literal `rem` lengths |
| `$position-values` | 136-140 | `0`, `50`, `100` | literals |
| `$aspect-ratios` | 142-147 | `'1x1'` to `'21x9'` | literal percentages |
| `$zindex-levels` | 149-155 | `n1` to `3` | literal integers |

In the preceding table, KEY stands for the map key. The theme-color keys are quoted strings, so a selector such as `.NAME-#{$key}` interpolates them bare. A value is `var(--bs-NAME)` only where the built Bootstrap sheet declares a root property for that key; otherwise it keeps the upstream literal (`guides/veneer.md:1915-1917`).

The following facts govern the load:

- The `styles face boundaries` case admits `@use '../bootstrap/maps'` and `@forward '../bootstrap/./_maps.scss'` from `src/styles/_allowed.scss` (`tests/conformance.test.ts:770-776`) and refuses every other crossing, including `pkg:bootstrap/scss/maps`, `src/bootstrap/reset`, and the Bootstrap barrel (`:778-780`, `:832-838`). The Bootstrap barrel loading the maps is itself refused (`:781`, `:832`).
- The gate resolves a relative target against the loading file's folder (`tests/conformance.test.ts:790-795`). From `src/styles/_mixins.scss` the statement is `@use '../bootstrap/maps'`; from a folder partial such as `src/styles/modifiers/_drag.scss` it is `@use '../../bootstrap/maps'`.
- The styles build sets no Sass load path (`configs/src/vite.styles.config.ts:5-21`), and a search of the root `vite.config.ts` file for `preprocessorOptions`, `loadPaths`, `scss`, and `sass` returns 0 hits. The roadmap names a relative Sass load as the admitted form (`ROADMAP.md:114`). A `src/bootstrap/maps` specifier resolves in `compileEntry`, which passes the workspace root as a load path (`tests/setupServer.ts:407-409`); no run checked that specifier in the build.
- The package publishes `src/bootstrap/**/*.scss` beside `src/styles/**/*.scss` (`package.json:18-19`), so a relative maps load resolves in a packed install. The distribution proof compiles only the `./bootstrap/scss` entry from that install (`tests/distribution.test.ts:845-846`, `:868`), so no proof compiles `./styles/scss` there.
- No `src/styles` file loads the maps: the census finds `maps.$` in `tests/conformance.test.ts` alone, and the repository search finds no `bootstrap/maps` load outside it.
- The conformance proof already shows the intended pattern: one `@each` over `maps.$theme-colors` writes one declaration per upstream key (`tests/conformance.test.ts:755-766`). Configuring a map to `()` through `@use … with` empties the output (`:703-707`), so a proof can plant its own key set.

## Sortable partials

The `src/styles/surfaces/_drag.scss` partial writes one `@layer surfaces` block (`:1`) with the following rules:

- `[data-vn-drag] > [draggable='true']` and `[data-vn-drag] > * [draggable='true']` take `cursor: grab`, `touch-action: none`, and `user-select: none` (`:2-7`).
- The same handles inside an `[aria-disabled='true']` item take `cursor: default` (`:9-12`).
- The partial reads no token and no color.

The `src/styles/composables/_drag.scss` partial writes one `@layer composables` block (`:14`) with the following rules:

| Selector | Lines | Declarations |
| --- | --- | --- |
| `[data-vn-drag]` | 15-18 | `--vn-drag-size: calc(var(--bs-border-width) * 2)`; `--vn-drag-opacity: 0.5` |
| `[data-vn-drag] > [data-vn-dragging]` | 20-24 | `opacity: var(--vn-drag-opacity)` and `opacity 0.15s linear` through the `transition` mixin |
| `[data-vn-drag] > [data-vn-insert]` | 26-28 | `position: relative` |
| `[data-vn-drag] > [data-vn-insert]::after` | 32-38 | absolute, `z-index: 3`, `pointer-events: none`, `content: ''`, `border: 0 solid $color` |
| `[data-vn-drag] > .active[data-vn-insert]::after` | 40-42 | `border-color: var(--bs-list-group-active-color)` |
| `[data-vn-drag] > [data-vn-insert='EDGE']::after` | 44-53 | one `@each` over the partial-local `$edges` map (`:7-12`): the named edge at 0 with `border-EDGE-width: var(--vn-drag-size)`, the cross edges at 0 |
| `[data-vn-drag][data-vn-over]` | 55-57 | `background-color: color-mix(in oklab, $color 15%, transparent)` |
| `[data-vn-drag][data-vn-over]:not(:has(> *))` | 59-61 | `outline: var(--vn-drag-size) dashed $color` |
| `@media (forced-colors: active)` | 63-72 | the line and the empty-host outline take `Highlight` |

In the preceding table, EDGE stands for `top`, `right`, `bottom`, or `left`. The partial-local `$color` variable is `var(--vn-drag-color, var(--bs-list-group-active-bg, var(--bs-primary)))` (`:4`). The token chains resolve as follows:

- The line resolves `$color` on the item's `::after` element, so it inherits the `--vn-drag-color` property from the item or the host, and the `--bs-list-group-active-bg` token from the item's contextual class or the host's `.list-group` class.
- The over tint and the empty-host outline resolve `$color` on the host (`:55-61`), where the `--bs-list-group-active-bg` token is the `.list-group` literal `#0d6efd` (`src/bootstrap/components/_list-group.scss:20`). A contextual item class therefore never retints them; only the `--vn-drag-color` property does.
- On an `.active` item the line reads the `--bs-list-group-active-color` token directly (`:40-42`) and ignores the `--vn-drag-color` property.
- The `--vn-drag-color` property is a read-only hook: the census finds it in the composable partial and the guide alone, and the guide says the sheet declares none (`guides/veneer.md:1603-1605`).
- `ROADMAP.md:143` names `--vn-drag-size` and `--vn-drag-opacity` as the first component-scoped properties and does not name `--vn-drag-color`.

## Doctrine rules that bind a variant mechanism

The Sass doctrine sits at `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/drag-2026-10-08/verdict.md:226-239`. The following rules bind a variant mechanism, each with its line and the home of its mechanism:

- Keep the Bootstrap face sealed (`verdict.md:230`). The conformance digest, link 1, and link 3 run unchanged in the styles unit's gate.
- Reach Bootstrap through `var(--bs-*)` references by default, and reach a key list only through the CSS-free maps module (`verdict.md:231`). The scaffold clause sits at `/home/user/scaffold/.claude/rules/styles.md:30`, and the gate sits at `tests/conformance.test.ts:769-846`.
- Never call a Bootstrap emitter from `src/styles` (`verdict.md:232`). The `layer`, `utility`, and `unlayer` mixins write the `bootstrap` layer or unlayered `!important` declarations (`src/bootstrap/_mixins.scss:14-100`, as `verdict.md:22` reads them).
- Generate a variant set with one `@each` over the Bootstrap key list it varies over, never a hand-listed key; where a Bootstrap component already varies a token per variant, read that token in one rule and generate nothing (`verdict.md:233`). The scaffold rule says the same at `styles.md:64`, and the user's ruling of 2026-10-08 requires every variant to come from the Bootstrap map it varies over (`/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/stage-b/user-rulings-2026-10-06.md:74`).
- Place each rule by job (`verdict.md:234`): an attribute API present before script in `surfaces/`, engine-driven chrome in `composables/`, a static class skin in `components/`, and a class that only sets a token in `modifiers/`. The roadmap defines `modifiers/` as "a class that sets a token other rules read. If it sets the property itself, it is a utility" (`ROADMAP.md:104`), and `surfaces/` as "pseudo-elements, attribute APIs, and user-agent pieces" (`ROADMAP.md:105`). Each partial writes its folder's layer a single time.
- Beat Bootstrap's normal declarations by layer order alone, never by `!important` or added specificity (`verdict.md:236`). The order is `reset, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities` (`src/styles/_tokens.scss:2`), so a `modifiers` rule beats a `composables` rule and a `surfaces` rule loses to both.
- Key native-module chrome on the module's `data-vn-*` state attribute under its host attribute (`verdict.md:235`; `styles.md:109`). The clause covers the state attributes a module writes; the stable-class-name contract covers the classes a composable writes.
- Take colors from `var(--bs-*)` or `color-mix()` over them, take sizes from Bootstrap tokens such as `--bs-border-width`, and put component-scoped `--vn-COMPONENT-*` properties on the component's host selector, not in `_tokens.scss`, until the styles chunk declares its first global token (`verdict.md:237`). The themes proof keeps `_tokens.scss` to the order statement (`tests/src/styles/themes/index.test.ts:36-38`), because the themes barrel loads `../tokens` (`src/styles/themes/index.scss:2`) and a `:root` token there would land in the themes sheet; `ROADMAP.md:63` says the barrel switches to its own copy of the statement when the first `:root` token lands.
- Pin the `TOKEN_NAMES.veneer` group in both directions when the chunk admits a component token (`verdict.md:237`). The pin is the `it.todo` case at `tests/src/styles/index.test.ts:85-87`.
- Route every `transition` declaration through the `transition` mixin and every animation through `reduced-motion` (`verdict.md:238`; `src/styles/_mixins.scss:24-36`; `styles.md:71-72`).
- Keep every at-rule inside an owned layer and nest no layer (`verdict.md:239`; `tests/src/styles/index.test.ts:45-83`).

The scaffold styles rule adds the following constraints that a mechanism meets:

- A pattern in at least 2 partials moves to `_mixins.scss` (`styles.md:65`), and a one-partial pattern stays inline with no mixin for one caller (`styles.md:69`).
- `_mixins.scss` holds `@function` values, `@mixin` emitters, and the `!default` switch an emitter reads, and emits no top-level CSS (`styles.md:19`, `:31`); partials load it with `@use '../mixins' as *` (`styles.md:32`).
- Never `@extend` across partials (`styles.md:70`); never wrap rules in a foreign layer (`styles.md:73`).
- Put global tokens in `_tokens.scss` and component-scoped properties on the component selector (`styles.md:49`); a component partial never overrides a global token (`styles.md:37`).
- Never write a literal color outside `_tokens.scss` (`styles.md:51-55`).

## Naming rules

The scaffold styles rule names each kind as the following table states (`styles.md:98-107`):

| Kind | Form | Line |
| --- | --- | --- |
| Sass variable | lowercase kebab-case; `!default` when overridable | 102 |
| Custom property | `--{scope}-{property}[-modifier]` | 103 |
| Modifier class | bare adjective or noun: `.surface`, `.muted`, `.accent` | 104 |
| State class | bare adjective from the shared lifecycle vocabulary | 105-107 |
| Mixin | lowercase kebab-case verb or verb-noun | 101 |

The following facts bear on a variant's name:

- The names rule loads for `**/*.{ts,tsx,mts,cts,vue}` alone (`/home/user/scaffold/.claude/rules/names.md:1-4`), and its single-word targets are TypeScript entity members: properties, methods, option keys, and events (`names.md:25-31`). The design law "Single-word entity APIs" names the same members (`/home/user/scaffold/AGENTS.md:52`). Neither governs a class or an attribute name.
- "One concept, one term" (`/home/user/scaffold/AGENTS.md:54`) and "Named discriminants. Name the axis" (`/home/user/scaffold/AGENTS.md:59`) are design laws. The showcase already uses "variant" for a journey project of one color mode and one viewport (`guides/veneer.md:2402-2414`).
- Every veneer attribute is `data-vn-` followed by one word: `data-vn-drag`, `data-vn-dragging`, `data-vn-insert`, `data-vn-over` (`src/browser/drags/`), `data-vn-time` (`src/browser/times/plugins.ts:17`), `data-vn-sentinel` (`src/browser/sentinels/plugins.ts:27`), and `data-vn-sort` (`src/browser/sorters/plugins.ts:27`). The copier and the fullscreen toggle key on `button[command="--copy"][commandfor]` and `button[command="--fullscreen"][commandfor]` (`src/browser/copiers/plugins.ts:24`; `src/browser/fullscreens/plugins.ts:24`).
- Every veneer custom property is `--vn-` followed by the component and the property: `--vn-drag-size`, `--vn-drag-opacity`, and the read-only `--vn-drag-color`.
- Bootstrap names a color variant as the component's class followed by the key: `.btn-{color}` (`src/bootstrap/components/_buttons.scss:98`), `.alert-{color}` (`_alert.scss:39`), `.list-group-item-{color}` (`_list-group.scss:239`), `.table-{color}` (`_tables.scss:75`), `.link-{color}` (`_colored-links.scss:4`), and `.text-bg-{color}` (`_color-bg.scss:4`). That compound form differs from the bare-noun modifier row at `styles.md:104`.
- No `CLASS_NAMES.bootstrap` leaf equals a theme-color key: a search of `src/core/constants.ts` for the pattern `'KEY' as const`, with KEY each theme-color key, returns 0 hits. The stage B verdict requires veneer-owned classes to avoid every `CLASS_NAMES.bootstrap` name (`/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/browser-stage-b-verdict.md:1030`).

## Bootstrap's contextual variants and the drag line

Each `.list-group-item-{color}` class sets the list-group color, background, border, action, and active tokens on the item (`src/bootstrap/components/_list-group.scss:239-250` for `primary`), among them `--bs-list-group-active-bg: var(--bs-primary-text-emphasis)` (`:248`) and `--bs-list-group-active-color: var(--bs-primary-bg-subtle)` (`:247`). The drag line therefore follows the text-emphasis family on a contextual item, not the `$theme-colors` value. Bootstrap's other variants pick their families as follows:

- The `.alert-{color}` class sets its color, background, border, and link tokens from the text-emphasis, bg-subtle, and border-subtle families (`_alert.scss:39-44`).
- The `.btn-{color}` class sets literal base values (`_buttons.scss:98-102`).
- The `.text-bg-{color}` class writes `color` and `background-color` as unlayered `!important` declarations over `--bs-{color}-rgb` (`_color-bg.scss:4-8`).

The following facts decide a variant's relation to the host's own Bootstrap variant:

- The `--vn-drag-color` property comes first in the chain (`composables/_drag.scss:4`), and a custom property inherits, so a value on the host overrides every contextual item's own tint inside it.
- CSS cannot tell whether an item's `--bs-list-group-active-bg` token came from the item's contextual class or from the host's `.list-group` class. Letting a contextual item keep its tint under a host variant takes a selector on the contextual classes; a Sass `@each` over the `maps.$theme-colors` keys can generate it, because those keys equal the list-group item color keys (`src/core/constants.ts:1491-1498`). The `list-group-item-action` class shares the prefix (`:1489`).
- Writing Bootstrap's `--bs-list-group-active-bg` token from a veneer rule would also repaint the `.active` item's background, which Bootstrap reads from that token (`_list-group.scss:61-63`). The stage B verdict recommends refusing take-overs of Bootstrap classes (`browser-stage-b-verdict.md:1055`, decision D-6, which `ROADMAP.md:143` lists as open).
- The `--bs-{color}` tokens are declared in the `:root, [data-bs-theme='light']` block alone (`src/bootstrap/_tokens.scss:19`, `:44-51`), so they keep one value in dark mode. The text-emphasis, bg-subtle, and border-subtle tokens retune under `[data-bs-theme='dark']` (`_tokens.scss:139`, `:155-171`).
- The `.list-group` class sets the line's default as the literal `#0d6efd` (`_list-group.scss:20`), so a theme pack that retunes `--bs-primary` leaves the default line unchanged; a variant written as `var(--bs-primary)` follows the pack.

The contrast run gives these ratios for a line drawn against the body background, by the relative-luminance formula of the Web Content Accessibility Guidelines (WCAG), over the token literals at `src/bootstrap/_tokens.scss:44-67`, `:95`, `:143`, and `:155-162`:

| Key | `$theme-colors` on light | `$theme-colors` on dark | text-emphasis on light | text-emphasis on dark |
| --- | --- | --- | --- | --- |
| primary | 4.50 | 3.43 | 13.51 | 6.39 |
| secondary | 4.69 | 3.29 | 13.50 | 6.74 |
| success | 4.53 | 3.40 | 13.43 | 6.60 |
| info | 1.96 | 7.88 | 8.93 | 9.95 |
| warning | 1.63 | 9.46 | 7.99 | 11.38 |
| danger | 4.53 | 3.41 | 13.65 | 6.10 |
| light | 1.05 | 14.63 | 8.18 | 14.63 |
| dark | 15.43 | 1.00 | 8.18 | 11.85 |

WCAG 2.2 asks a 3:1 contrast for the graphics that identify a component's state; see [Understanding SC 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). The run reads the body backgrounds alone, not a contextual item's subtle background, and no browser measured a rendered line.

## Registries and pins

The core registries hold the following groups, and the styles chunk owes the following pins:

- The `TOKEN_NAMES` registry holds the `bootstrap` group alone (`src/core/constants.ts:14-15`, closing at `:1048`), and the `CLASS_NAMES` registry holds the `bootstrap` group alone (`:1068-1069`), with the `components`, `composables`, `modifiers`, and `utilities` categories (`:1070`, `:1934`, `:1946`, `:2170`). The repository search finds no `CLASS_NAMES.veneer` reference.
- `ROADMAP.md:46` states the key law for both registries and says the styles chunk adds the `veneer` token group "with its first declared token". `ROADMAP.md:143` says the `TOKEN_NAMES.veneer` pin stays the `it.todo` case "until the first global token lands". The built sheet already declares `--vn-drag-size` and `--vn-drag-opacity` (`composables/_drag.scss:16-17`), so the two lines disagree on when the group lands.
- The Bootstrap pin shows the expected shape: the `collectSheetNames` instrument reads every custom property a style rule declares, on any selector (`tests/setupStyles.ts:139-166`), and the case compares that list with the registry leaves both ways (`tests/src/bootstrap/index.test.ts:475-490`). Under the key law, the drag properties key as `TOKEN_NAMES.veneer.drag.size`, `.drag.opacity`, and, when a rule declares it, `.drag.color`. A name read only through a `var()` fallback stays out (`ROADMAP.md:46`), which keeps `--vn-drag-color` out until a variant rule declares it.
- The stage B verdict says `CLASS_NAMES.veneer` holds every class a `./styles` selector reacts to, Bootstrap names included (`browser-stage-b-verdict.md:1029`). The composable partial selects `.active` (`composables/_drag.scss:40`, `:65`), so that group would hold `active` before any variant class.
- `ROADMAP.md:128` maps each `modifiers/` partial to `CLASS_NAMES.<face>.modifiers`. Read under the category law (`src/core/constants.ts:1056`), a token-only class whose prefix no declared class carries files as a modifier, which places both `.drag-success` and `.success` under `modifiers`; the law is written for the Bootstrap inventory, and the `veneer` group has no committed inventory; an attribute has no core registry, because core holds token and class names alone (`ROADMAP.md:46`).

## Sweeps that read class names

Neither instrument the dispatch names reads a class name. The following list states what each reads and refuses:

- The `tests/setupPolicy.ts` instrument reads SCSS as a module population for the mirror rule (`:252-279`): a test at `tests/src/styles/FOLDER/NAME.test.ts` needs `src/styles/FOLDER/_NAME.scss`, and a stem mismatch is refused (control at `:2726-2734`). It refuses a formatter or lint suppression directive in an SCSS file (`:288-291`, control at `:2696-2705`) and a banned term in authored Markdown (`:2193-2222`). It refuses a weakened wiring of the `policy/no-banned-term` lint rule (`:293-298`), which `.oxlintrc.json:62` enables; the brief did not check whether that rule reads an SCSS comment.
- The `src:styles` placement proof refuses a layer block outside the owned layers, a declaration with no owned layer (`tests/src/styles/index.test.ts:24-43`), an unlayered at-rule, and a nested layer (`:45-83`). Each drag proof adds a per-partial case that compiles the partial alone and refuses a block outside its folder's layer, with a planted `bootstrap` control (`tests/src/styles/composables/drag.test.ts:35-59`; `tests/src/styles/surfaces/drag.test.ts:19-40`).

The following instruments do read class names:

- The `keeps every pair of built sheets disjoint in each shared layer` case refuses a class name that a pair of built sheets writes in one shared layer (`tests/integration.test.ts:292-320`), through `collectLayerClasses` (`tests/setupStyles.ts:445`). The `./styles` and `./bootstrap` sheets share no layer.
- The `%s shows every class it owns and only admitted classes` case refuses any class on a showcase section that the `ADMITTED` set lacks (`tests/app/browser/sections/integration.test.ts:36-62`). That set holds `CLASS_NAMES.bootstrap`, the icon classes, and `slide` (`:11`, `:23-27`), and its control reports a planted `veneer-planted` class (`:179-197`). A variant class on a specimen fails this case until the set admits a veneer registry group; a data attribute passes it.

## Showcase

The showcase loads the styles sheet as follows, and a variant specimen meets these constraints:

- The `app/browser/Showcase.ts` file imports the built `dist/src/styles/index.css` sheet (`:3`) and appends it as `style#veneer-styles` after `style#veneer-bootstrap` (`:64-69`); `tests/app/browser/Showcase.test.ts:246` pins the order. A variant rule in the built sheet reaches the page with no app change.
- The sortable section is a fragment of the `native` group (`app/browser/constants.ts:53`, `:518-523`), read from `app/browser/sections/sortable-list.html`, whose host is `ul#dispatch-priorities.list-group[data-vn-drag]` (`:5-10`). A native section owns no registry class (`tests/app/browser/sections/integration.test.ts:42-51`).
- A specimen carries no `style` attribute at rest (`tests/app/browser/sections/integration.test.ts:63`; `guides/veneer.md:2070-2077`), so the page cannot show a variant through an inline `--vn-drag-color` value.
- Every figure is `card flex-fill mb-0` inside a `col d-flex` column (`tests/app/browser/sections/integration.test.ts:64-70`).
- The sortable journey resolves the list by the exact name "Dispatch priorities", reads the line widths on the named edge, and asserts that no class changes during the drag (`tests/app/browser/integration.test.ts:437-513`, `:496`). A second sortable specimen needs its own accessible name.

## Proof shape

The drag composable proofs give the pattern a variant proof follows:

- The proof imports the built Bootstrap sheet, the built styles sheet, and the partial through `?inline` (`tests/src/styles/composables/drag.test.ts:1-3`), and adopts the sheets with `adoptSheet` (`:62`).
- The `buildDragCells` instrument builds the matrix from `CLASS_NAMES.bootstrap`: plain, flush, numbered, horizontal, each responsive horizontal class on both sides of its boundary, each `list.group.item` key other than `base` (the `action` class included), `.active`, and `.disabled`, in light and dark (`tests/setupStyles.ts:548-600`). It renders through `visitDragCells` (`:614-633`).
- Per cell, the proof sets each edge's attribute directly and reads computed widths and colors, comparing the line color with the item's resolved token through `readToken` and `matchesColor` (`drag.test.ts:77-104`).
- Each control edits the built sheet text and expects a reading to redden: the line on the item's own border (`:139-159`), the line on `::before` (`:161-178`), and a `box-shadow` line under forced colors (`:203-235`).
- A variant matrix can take its keys from `CLASS_NAMES.bootstrap.components.list.group.item`, leaving out its `action` and `base` keys, or from the committed `tests/fixtures/bootstrap/maps.json` fixture, whose `theme-colors` entry lists the keys and values in upstream order. A generation control can configure a map through `@use … with` to a planted key set and read that exactly those keys generate (`tests/conformance.test.ts:703-707`), which separates an `@each` from a hand-listed set, whose compiled output is otherwise identical. No run has compiled a styles partial under that configuration.
- The proofs declare every CSS Object Model instrument in `tests/setupStyles.ts` (`styles.md:94`).

## Stale citations in the doctrine

The doctrine's mechanism lines predate later changes. The following citations point elsewhere at `9f56e6a`:

- The load gate the doctrine cites at `tests/conformance.test.ts:672-680` sits at `:769-846`; `:673-767` hold the maps cases.
- The placement proof cited at `tests/src/styles/index.test.ts:8-32` sits at `:24-43`, and the `it.todo` case cited at `:38-40` sits at `:85-87`.
- The attribute clause cited at `styles.md:108` sits at `:109`; the transition rule cited at `:70-71` sits at `:71`.
- The folder list cited at `ROADMAP.md:100-105` sits at `:101-107`.
- The override table cited at `guides/veneer.md:1499-1502` sits at `:1971-1977`.

## Open decisions

You rule the following decisions. Each option carries its fit against the binding rules, and the closing paragraph of each decision names the option the rules leave with the fewest conflicts.

### Keying

The keying decides how markup selects a variant. The options fit the rules as follows:

- A class per module, such as `.drag-success`. It mirrors Bootstrap's component-then-key convention, sets a token alone so it belongs in `modifiers/` (`ROADMAP.md:104`), and its `modifiers` layer beats every `composables` default (`src/styles/_tokens.scss:2`). It breaks the bare-noun modifier form (`styles.md:104`), needs a `CLASS_NAMES.veneer` group with a two-way pin, and needs the showcase `ADMITTED` set to take that group. It writes one class per module and key.
- A generic modifier class that sets component tokens, such as `.success` or `.vn-success`. The bare `.success` form meets `styles.md:104`; the `vn-` prefix form does not. Each module's `modifiers/` partial can write the class under its own host selector, `[data-vn-drag].success` setting the `--vn-drag-color` property, which keeps every token component-scoped on the host selector (`verdict.md:237`). A shape in which one class sets one token that every module reads makes that token global, and a global token belongs in `_tokens.scss` (`styles.md:49`), whose first `:root` token moves the themes barrel off `../tokens` (`ROADMAP.md:63`). It needs the same registry and census changes as the class per module. A bare theme-key class collides with no Bootstrap name, and its collision with a consumer's own classes is unmeasured.
- An attribute, such as `data-vn-variant='success'`. It matches the native modules' `data-vn-WORD` keying and passes the showcase census with no change. The folder law files an authored attribute API in `surfaces/` (`ROADMAP.md:105`), whose layer loses to a `composables` declaration of the same property on the same element, and no core registry exists for attributes. The word "variant" collides with the showcase's journey variants (`guides/veneer.md:2402-2414`; `/home/user/scaffold/AGENTS.md:54`), so the attribute needs another word that names the axis (`/home/user/scaffold/AGENTS.md:59`).

The keying also rules its precedence over the host's own Bootstrap variant. One question asks whether a host-level variant overrides a contextual item's text-emphasis tint, as the `--vn-drag-color` property does at `9f56e6a`, or yields to it through a generated selector on the `.list-group-item-KEY` classes. The rules leave the override with the fewest conflicts: it keeps the chain the guide documents (`guides/veneer.md:1603-1610`) and adds no rule that selects a Bootstrap contextual class. The other asks whether a variant reaches the `.active` line, which reads the `--bs-list-group-active-color` token alone so that it contrasts with the active background (`guides/veneer.md:1608-1609`). The rules leave the `.active` line on that token with the fewest conflicts, because a variant color on the filled active background has no contrast reading.

The rules leave the bare modifier class written under each module's host selector with the fewest conflicts: it meets the modifier form, the folder law, and the component-scoped token rule, and its cost is the registry group and the census admission that the class per module also needs, plus an unmeasured collision with a consumer's own bare classes.

### Generation

The generation decides where the `@each` lives. The options fit the rules as follows:

- One `@each` over the chosen map in each module's partial. It meets `styles.md:69`, which keeps a one-partial pattern inline, and needs the partial to load the maps with `@use '../../bootstrap/maps'`. When another styled module repeats the loop, `styles.md:65` moves it into a mixin.
- One shared mixin in `src/styles/_mixins.scss` that every module calls. It meets `styles.md:65` when more than one partial calls it, and breaks `styles.md:69` while the sortable is its one caller, because `src/styles` holds no other styled module (`map.txt` tree). The mixin loads the maps with `@use '../bootstrap/maps'`, the exact statement the gate admits (`tests/conformance.test.ts:775`), emits no top-level CSS, and runs inside the caller's single layer block.

The rules leave the per-module `@each` with the fewest conflicts until another styled module lands, when `styles.md:65` moves the loop into the mixin.

### Scope

The scope decides which families and axes a variant covers. The options fit the rules as follows:

- The `$theme-colors` family alone. It follows the `--bs-primary` token and its siblings, which keep one value across color modes (`src/bootstrap/_tokens.scss:44-51`). Its `info` (1.96), `warning` (1.63), and `light` (1.05) readings on the light body and its `dark` (1.00) reading on the dark body fall under 3:1 in the contrast run. It differs from the family Bootstrap's contextual list-group items give the line (`_list-group.scss:248`).
- The text-emphasis family for the line, with the bg-subtle and border-subtle families for fills and outlines. It matches Bootstrap's contextual list-group and alert tokens (`_list-group.scss:239-250`; `_alert.scss:39-44`), retunes in dark mode (`_tokens.scss:155-171`), and reads at least 6.10 in every key and mode of the contrast run.
- Non-color variants such as size. The only width map, `$border-widths`, holds literal `px` lengths (`_maps.scss:110-116`), while the doctrine takes sizes from Bootstrap tokens such as `--bs-border-width` (`verdict.md:237`), and the `--vn-drag-size` property already reads that token. No admitted map holds opacity steps, because Bootstrap's opacity values live in the `opacity` entry of the `$utilities` map (`src/bootstrap/_utilities.scss:40-41`), whose partial emits CSS on load (`verdict.md:21`). The D2.3 contract deferred even the color modifier for want of a consumer (`verdict.md:121`).

The rules leave the text-emphasis family for the line, with the subtle families for fills and outlines and no non-color variant, with the fewest conflicts.

# Appearance sites — Cursor Grok distillate (session a9ccf89b-e995-4689-af3f-181e9300a522, journal tmp/cursor/appearance-sites.jsonl, swept at acceptance)

Brief: `../appearance-terrain-brief.md`.

I'll read the brief and follow it as the instructions for this task.The brief is a read-only map of every Veneer site the appearance ruling touches. I'll read the writing contract and the earlier terrain, then cite the palette and type sites it names.The emphasis tokens already mix a role with the text color. Next I’ll list every selector that still paints a full role color as text, then the type-scale sites.Colored text on the page still paints the role fill. The on-canvas mix already exists, and only some of those text sites read it. Type sizes are fixed tokens. Bootstrap’s fluid `calc()` and the 1200px cap are dropped.

## P7

### Role text utilities and opacity

`src/styles/utilities/_color.scss:11-12` builds the color map. For each name in `$aliased` plus `black` and `white`, the value is `rgba(var(--bs-#{$name}-rgb), var(--bs-text-opacity))`. `$aliased` is `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `light`, `dark` (`src/styles/_tokens.scss:11`). The `utility` mixin writes that map as `.text-*` and sets a local `--bs-text-opacity: 1` (`src/styles/utilities/_color.scss:52-60`). The opacity steps are a separate variable utility (`src/styles/utilities/_color.scss:61-71`).

The built cascade is one line, `dist/src/styles/index.css:1`:

| Selector | Built `color` |
| --- | --- |
| `.text-primary` | `rgba(var(--bs-primary-rgb), var(--bs-text-opacity))` |
| `.text-secondary` | `rgba(var(--bs-secondary-rgb), var(--bs-text-opacity))` |
| `.text-success` | `rgba(var(--bs-success-rgb), var(--bs-text-opacity))` |
| `.text-info` | `rgba(var(--bs-info-rgb), var(--bs-text-opacity))` |
| `.text-warning` | `rgba(var(--bs-warning-rgb), var(--bs-text-opacity))` |
| `.text-danger` | `rgba(var(--bs-danger-rgb), var(--bs-text-opacity))` |

Each of those rules also sets `--bs-text-opacity: 1`. The same file writes `.text-opacity-25` as `--bs-text-opacity: .25`, `.text-opacity-50` as `.5`, `.text-opacity-75` as `.75`, and `.text-opacity-100` as `1`.

The opacity classes do not set `color`. They overwrite `--bs-text-opacity` after the color class has set it to `1`, and the `rgba()` above multiplies that variable by the role’s `--bs-<role>-rgb` channel. A `color-mix()` with no alpha slot would stop reading those steps. The same emitter also writes `.text-light` and `.text-dark` through `--bs-light-rgb` and `--bs-dark-rgb`. `tertiary` is not in `$aliased`, so there is no `.text-tertiary`.

Channel aliases: primary and secondary are rewritten per mode inside `theme-tokens` (`src/styles/_mixins.scss:449-453`). The other roles are declared once at `:root` (`src/styles/_tokens.scss:520-531`). Triplets: primary light `8, 65, 234`, dark `0, 172, 236` (`src/styles/_tokens.scss:28-32, 92-96`); secondary light `69, 85, 108`, dark `108, 117, 125` (`:34-38, 98-102`); success `0, 130, 54`, info `0, 105, 168`, warning `187, 77, 0`, danger `193, 0, 7`, light `248, 249, 250`, dark `33, 37, 41` (`:171-206`), unchanged in dark.

### Other role-colored text

**`--bs-link-color` and `a`.** The alias is `var(--vn-link-base)` (`src/styles/_mixins.scss:475`). Light value: `color-mix(in oklab, var(--vn-color-primary-base) 70%, var(--vn-text-body-base))`, channels `13, 54, 172`. Dark value: the same mix at `80%`, channels `79, 185, 238` (`src/styles/_tokens.scss:64-67, 131-134`). `a` paints `rgb(from var(--vn-link-base) r g b / var(--bs-link-opacity, 1))` (`src/styles/elements/_a.scss:3`). Hover reads `--vn-link-hover-base`, which is the resting link mixed `65%` toward black in light and toward white in dark (`src/styles/_tokens.scss:66-67, 133-134`, `src/styles/elements/_a.scss:5-6`).

Readers of that link color, still on the page: `.nav-link` via `--bs-nav-link-color: var(--bs-link-color)` (`src/styles/components/_nav.scss:13, 24`); `.page-link` via `--bs-pagination-color: var(--bs-link-color)` (`src/styles/components/_pagination.scss:20`); `.btn-link` via `--bs-btn-color: var(--vn-link-base)` (`src/styles/components/_button.scss:191-192`).

**`.link-<role>`.** `src/styles/utilities/_link.scss:21-28` paints `rgba(var(--vn-color-#{$role}-rgb), var(--bs-link-opacity, 1))`. That is the role channel, not the mix. Built `dist/src/styles/index.css:1` matches, for example `.link-primary` → `rgba(var(--vn-color-primary-rgb), var(--bs-link-opacity, 1))`, and the same shape for `secondary`, `success`, `info`, `warning`, `danger`. Hover and focus mix that channel 20% toward the contrast endpoint (`src/styles/utilities/_link.scss:22-39`). `.link-body-emphasis` reads `--vn-text-emphasis-rgb`, not a role (`src/styles/utilities/_link.scss:44-45`).

**Feedback.** `.valid-feedback` and `.invalid-feedback` set `color: var(--bs-form-valid-color)` and `color: var(--bs-form-invalid-color)` (`src/styles/components/_validation.scss:14-19`). Built `dist/src/styles/index.css:1` matches. The aliases are `--vn-form-valid` and `--vn-form-invalid` (`src/styles/_mixins.scss:484-486`). Light: `var(--vn-color-success-base)` = `oklch(0.527 0.154 150.069)` and `var(--vn-color-danger-base)` = `oklch(0.505 0.213 27.518)` (`src/styles/_tokens.scss:70-71, 353-356`). Dark: `var(--vn-color-success-emphasis)` and `var(--vn-color-danger-emphasis)` (`src/styles/_tokens.scss:137-138`), which are the 70% mix below. The checked label uses the same tokens: `.form-check-input.is-valid ~ .form-check-label` and the invalid twin (`src/styles/components/_validation.scss:113-115`).

**`.text-<role>-emphasis`.** The class reads `var(--bs-<role>-text-emphasis)` (`src/styles/utilities/_color.scss:27-29`). Built `dist/src/styles/index.css:1`: `.text-primary-emphasis { color: var(--bs-primary-text-emphasis) }` and the same for `secondary`, `success`, `info`, `warning`, `danger`. The alias is `var(--vn-color-<role>-emphasis)` (`src/styles/_mixins.scss:455-456`).

Also on a tinted surface, not the bare canvas: `.alert-*` sets `--bs-alert-color` and `--bs-alert-link-color` to `var(--bs-<role>-text-emphasis)` (`src/styles/components/_alert.scss:63-66`); `.list-group-item-*` sets `--bs-list-group-color` to that alias (`src/styles/components/_list-group.scss:157`); `.accordion-button:not(.collapsed)` sets `--bs-accordion-active-color: var(--bs-primary-text-emphasis)` (`src/styles/components/_accordion.scss:36`).

**Outline buttons.** Resting and disabled text is the role fill on a transparent ground: `--bs-btn-color: var(--vn-color-#{$role}-base)` and the same for `--bs-btn-disabled-color` (`src/styles/components/_button.scss:173-186`). Hover and active switch to the contrast label over the fill.

`.text-bg-*` paints a black or white label on a role fill (`src/styles/utilities/_color-bg.scss:14-15`). That is text on a role surface, not a role color on the canvas.

### Tokens that already mix a role with the text color

`role-each` writes, for every role, in light and in dark:

`--vn-color-<role>-emphasis: color-mix(in oklab, var(--vn-color-<role>-base) 70%, var(--vn-text-body-base))` (`src/styles/_mixins.scss:376-380`).

The text color is `--vn-text-body-base`: light `oklch(0.208 0.042 265.755)`, dark `oklch(0.929 0.013 255.508)` (`src/styles/_tokens.scss:49, 116`, assigned at `src/styles/_mixins.scss:421`). The guide records the same expression for light and for dark (`guides/veneer.md:6712`).

`light` and `dark` replace that mix afterward (`src/styles/_tokens.scss:160-167`, `src/styles/_mixins.scss:418-420`). Light mode: `--vn-color-light-emphasis` and `--vn-color-dark-emphasis` are `var(--vn-gray-700)`. Dark mode: light emphasis is `var(--vn-gray-100)`, dark emphasis is `var(--vn-gray-300)` (`src/styles/_tokens.scss:39-43, 103-106`).

`--vn-link-base` is the primary fill mixed with the body text at 70% in light and 80% in dark, cited above.

### Tests and guide rows that pin those colors

Tests:

- `tests/setupStyles.ts:2782-2784` pins each role text color, including `.text-primary` through `.text-danger`, to `rgba(var(--bs-${key}-rgb), var(--bs-text-opacity))`. `tests/setupStyles.test.ts:2676-2680` checks the recorded inventory against that string, including `--bs-text-opacity: 1`.
- `tests/setupStyles.ts:2804-2808` pins `.text-opacity-25/50/75/100` to `0.25`, `0.5`, `0.75`, `1`. `tests/src/styles/utilities/color.test.ts:95-96` reads those alphas off the computed color.
- `tests/src/styles/utilities/color.test.ts:24-40` resolves each `.text-*` color to the recorded formula. `tests/src/styles/utilities/color.test.ts:113-114` pins `.text-primary` to `rgb(20, 80, 140)` after `--vn-color-primary-rgb` is set to `20, 80, 140`.
- `tests/setupStyles.ts:2797-2800` pins `.text-<role>-emphasis` to `var(--bs-<role>-text-emphasis)`. `tests/src/styles/utilities/color.test.ts:47-68` resolves the class to that alias in light and in dark.
- `tests/src/styles/utilities/link.test.ts:32-34` pins `.link-<role>` to `rgb(${--vn-color-<role>-rgb})`. `tests/src/styles/utilities/link.test.ts:38` pins a retuned channel to `rgba(20, 80, 140, 0.5)`. `tests/src/styles/utilities/link.test.ts:104-105` pins `.link-body-emphasis` to `--vn-text-emphasis-rgb`.
- `tests/src/styles/components/validation.test.ts:49-51` pins feedback `color` to `--bs-form-<state>-color`. The comment at `tests/src/styles/components/validation.test.ts:54-56` states light uses the role base and dark uses the emphasis tier. `tests/src/styles/components/validation.test.ts:314` pins the check label to the same token.
- `tests/setup.ts:2654-2676` and `tests/setup.ts:777-827` name `.text-primary`, `.text-primary-emphasis`, `.text-opacity-50`, `.link-primary`, `.valid-feedback`, and `.invalid-feedback` as the `color` (or `--bs-text-opacity`) subject. They do not pin a color literal.

Guide ledger. `.text-primary` through `.text-danger` have no departure row: the built `color` matches Bootstrap, and the ledger records departures. The prose at `guides/veneer.md:6264-6268` states the `rgba(var(--bs-*-rgb), var(--bs-text-opacity))` reading. `guides/veneer.md:10236` records `--bs-text-opacity` as shipped.

Color rows that do pin a value:

- `.link-<role>` `color` is `rgba(var(--vn-color-<role>-rgb), var(--bs-link-opacity, 1))` at `guides/veneer.md:8251, 8260, 8269, 8278, 8287, 8296` for primary, secondary, success, info, warning, danger. `.link-light` and `.link-dark` follow at `:8305` and `:8314`.
- `a` `color` is `rgb(from var(--vn-link-base) r g b/var(--bs-link-opacity, 1))` at `guides/veneer.md:9179`.
- `--bs-link-color` is `var(--vn-link-base)` at `:root` `guides/veneer.md:9561`, light `guides/veneer.md:9678`, dark `guides/veneer.md:9747`. The canonical mix is `guides/veneer.md:6806`.
- `--bs-<role>-text-emphasis` is `var(--vn-color-<role>-emphasis)` at `:root` `guides/veneer.md:9513-9520`, light `guides/veneer.md:9630-9637`, dark `guides/veneer.md:9722-9729`.
- `--bs-form-valid-color` is `var(--vn-form-valid)` at `:root` `guides/veneer.md:9587`, light `guides/veneer.md:9704`, dark `guides/veneer.md:9756`. `--bs-form-invalid-color` is `var(--vn-form-invalid)` at `:9589`, `:9706`, `:9758`. The light base and dark emphasis are `guides/veneer.md:6916-6917`.
- `.invalid-feedback` and `.valid-feedback` ledger rows pin `margin-top` only (`guides/veneer.md:8211, 9437`). They do not pin `color`.
- Outline resting text is `var(--vn-color-<role>-base)`. Primary is `guides/veneer.md:7329`. Secondary is `guides/veneer.md:7343`. The same `--bs-btn-color` column continues for the other outline roles in that `btn` table.

### Elements

Light on-canvas, 70% of the role mixed with `--color-text` (`src/styles/_theme.scss:215-225`): `--color-primary-on-canvas`, `--color-secondary-on-canvas`, `--color-tertiary-on-canvas`, `--color-success-on-canvas`, `--color-warning-on-canvas`, `--color-danger-on-canvas`, `--color-information-on-canvas`.

Dark raises that share to 80% in the `prefers-color-scheme: dark` block (`src/styles/_theme.scss:329-339`) and again under `[data-mode=dark]` (`src/styles/_theme.scss:462-472`). The ruling’s 70% formula is the light definition. Elements’ dark on-canvas is 80%.

Selectors that read a `--color-<role>-on-canvas` token:

- `.primary`, `.secondary`, `.tertiary`, `.success`, `.warning`, `.danger`, `.information` set `--set-variant-on-canvas-color` to that token (`src/styles/modifiers/_variants.scss:57, 71, 82, 98, 115, 134, 151`).
- `a` falls through to `--color-primary-on-canvas` (`src/styles/elements/_a.scss:61-63`).
- Active menu link `color: var(--color-primary-on-canvas)` (`src/styles/components/_menu.scss:309`). Selected option `color: var(--color-primary-on-canvas)` (`src/styles/components/_menu.scss:629`).
- Header and footer link hover (`src/styles/components/_header.scss:129`, `src/styles/components/_footer.scss:94`).
- Invalid label `color: var(--color-danger-on-canvas)` (`src/styles/components/_form.scss:133`).

These read the set variable, which points at the token: `button.flat` and `button.flush` (`src/styles/modifiers/_local.scss:393, 294`), `details.flush` (`:477`), `dialog.flush:not(:modal)` (`:539`), `article.flush` (`:650`), `label` (`src/styles/elements/_label.scss:37`). `form.flush` and `section.flush` do not set `color` (`src/styles/modifiers/_local.scss:719-732`).

Elements does not emit `.text-*` rules in its own SCSS. A search for `.text-primary` under `src/styles` hits only the comment at `src/styles/_theme.scss:7-8`: Tailwind v4’s `@theme` block (`src/styles/_theme.scss:53`) is what emits `.text-success` and the other text utilities, and those utilities read the role identity (`--color-primary` and its siblings at `src/styles/_theme.scss:103-109`), not `--color-*-on-canvas`.

## P8

### Veneer source and built sizes

`heading-size($level)` returns `var(--vn-size-#{9 - $level})` (`src/styles/_mixins.scss:156-158`). `h1` through `h6` and `.h1` through `.h6` call it (`src/styles/elements/_heading.scss:12-15`, `src/styles/components/_type.scss:12-16`). `.fs-1` through `.fs-6` use the same function (`src/styles/utilities/_font.scss:10-12, 24`). `.display-1` through `.display-6` read `var(--vn-display-#{$level})` (`src/styles/components/_type.scss:27-30`).

Tokens at `src/styles/_tokens.scss:384-398`:

| Token | Value | Read by |
| --- | --- | --- |
| `--vn-size-8` | `2.25rem` | `h1`, `.h1`, `.fs-1` |
| `--vn-size-7` | `1.875rem` | `h2`, `.h2`, `.fs-2` |
| `--vn-size-6` | `1.5rem` | `h3`, `.h3`, `.fs-3` |
| `--vn-size-5` | `1.25rem` | `h4`, `.h4`, `.fs-4` |
| `--vn-size-4` | `1.125rem` | `h5`, `.h5`, `.fs-5` |
| `--vn-size-3` | `1rem` | `h6`, `.h6`, `.fs-6` |
| `--vn-display-1` … `--vn-display-6` | `5rem`, `4.5rem`, `4rem`, `3.5rem`, `3rem`, `2.5rem` | `.display-1` … `.display-6` |

Heading weight is `--vn-weight-heading: 600` (`src/styles/_tokens.scss:404`), applied by `heading-text` (`src/styles/_mixins.scss:19-21`). No `@media` wraps these font sizes. The comment at `src/styles/utilities/_font.scss:7-8` says the fluid formula and the 1200px cap are not written.

Built `dist/src/styles/index.css:1`: `.fs-1` is `font-size: var(--vn-size-8) !important`, then `.fs-2` through `.fs-6` read `--vn-size-7` down to `--vn-size-3`. `.h1` through `.h6` read `--vn-size-8` down to `--vn-size-3`. `.display-1` through `.display-6` read `--vn-display-1` through `--vn-display-6`. Extracted element rules: `h2` is `var(--vn-size-7)`, `h4` is `var(--vn-size-5)`, `h6` is `var(--vn-size-3)`.

### Bootstrap 5.3.8

`node_modules/bootstrap/dist/css/bootstrap.css`. Headings share a rule with the classes.

| Selector | Below 1200px | `@media (min-width: 1200px)` |
| --- | --- | --- |
| `h1, .h1` | `calc(1.375rem + 1.5vw)` (`:226`) | `2.5rem` (`:228-231`) |
| `h2, .h2` | `calc(1.325rem + 0.9vw)` (`:235`) | `2rem` (`:237-240`) |
| `h3, .h3` | `calc(1.3rem + 0.6vw)` (`:244`) | `1.75rem` (`:246-249`) |
| `h4, .h4` | `calc(1.275rem + 0.3vw)` (`:253`) | `1.5rem` (`:255-258`) |
| `h5, .h5` | `1.25rem` (`:262`) | none; left fixed |
| `h6, .h6` | `1rem` (`:266`) | none; left fixed |
| `.fs-1` | `calc(1.375rem + 1.5vw)` (`:8366-8368`) | `2.5rem` (`:11998-12000`) |
| `.fs-2` | `calc(1.325rem + 0.9vw)` (`:8370-8372`) | `2rem` (`:12002-12004`) |
| `.fs-3` | `calc(1.3rem + 0.6vw)` (`:8374-8376`) | `1.75rem` (`:12005-12007`) |
| `.fs-4` | `calc(1.275rem + 0.3vw)` (`:8378-8380`) | `1.5rem` (`:12008-12010`) |
| `.fs-5` | `1.25rem` (`:8382-8384`) | none; left fixed |
| `.fs-6` | `1rem` (`:8386-8388`) | none; left fixed |
| `.display-1` | `calc(1.625rem + 4.5vw)` (`:607-611`) | `5rem` (`:612-615`) |
| `.display-2` | `calc(1.575rem + 3.9vw)` (`:618-622`) | `4.5rem` (`:623-626`) |
| `.display-3` | `calc(1.525rem + 3.3vw)` (`:629-633`) | `4rem` (`:634-637`) |
| `.display-4` | `calc(1.475rem + 2.7vw)` (`:640-644`) | `3.5rem` (`:645-648`) |
| `.display-5` | `calc(1.425rem + 2.1vw)` (`:651-655`) | `3rem` (`:656-659`) |
| `.display-6` | `calc(1.375rem + 1.5vw)` (`:662-666`) | `2.5rem` (`:667-670`) |

Fixed sizes are `h5`, `.h5`, `h6`, `.h6`, `.fs-5`, and `.fs-6`. Every display size is fluid and capped.

### Guide rows and how a media declaration is recorded

Each declaration inside `@media` is its own ledger row. The Condition cell is the query. A cap Veneer does not emit has Veneer `—` and Departure `dropped`.

Heading classes, `guides/veneer.md:8123-8124, 8134-8135, 8145-8146, 8156-8157, 8167, 8177`: `.h1` through `.h4` replace the `calc()` with `--vn-size-8` through `--vn-size-5` and drop the `@media (min-width: 1200px)` cap (`2.5rem`, `2rem`, `1.75rem`, `1.5rem`). `.h5` is `1.25rem` → `var(--vn-size-4)` with no media row. `.h6` is `1rem` → `var(--vn-size-3)` with no media row.

Element headings, `guides/veneer.md:9146-9155`: the same values on `h1` through `h6`.

`.fs-1` through `.fs-6`, `guides/veneer.md:7904-7913`: same replacement and the same dropped caps for `.fs-1` through `.fs-4`. `.fs-5` and `.fs-6` have no media row.

`.display-1` through `.display-6`, `guides/veneer.md:7658-7674`: each `calc()` becomes `var(--vn-display-*)`, and each `@media (min-width: 1200px)` cap (`5rem` down to `2.5rem`) is `dropped`.

The prose states the same choice at `guides/veneer.md:6160-6163`.

The one kept media font-size row uses Veneer’s own query text in the Condition cell: `legend` at `guides/veneer.md:9208-9209`, Condition `@media (width >= 1200px)`, Veneer `var(--vn-size-6)`, Departure `tokenized`.

### Tests that pin those sizes

- `tests/setupStyles.ts:1337` and `tests/src/styles/elements/heading.test.ts:19` pin `h1` through `h6` to `36px`, `30px`, `24px`, `20px`, `18px`, `16px`. Weight is `600` (`heading.test.ts:22`).
- `tests/setupStyles.ts:3183-3189` and `tests/src/styles/components/type.test.ts:31` pin `.h1` through `.h6` to those same pixels.
- `tests/setupStyles.ts:3193-3199` and `tests/src/styles/components/type.test.ts:69` pin `.display-1` through `.display-6` to `80px`, `72px`, `64px`, `56px`, `48px`, `40px`.
- `tests/src/styles/utilities/font.test.ts:26-38` pins `.fs-1` through `.fs-6` to the heading class size at every journey viewport, so the size does not change with width.
- `tests/setupStyles.ts:3211-3217` retune tokens to `101px` through `106px` for `--vn-size-8` down to `--vn-size-3`. `tests/setupStyles.ts:3226-3232` retune display tokens to `107px` through `112px`.

### Breakpoint mixins and fluid size

`src/styles/_mixins.scss`: `breakpoints()` returns `xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px, xxl: 1400px` (`:137-138`). `breakpoint($name)` reads one width (`:143-148`). `breakpoint-up` emits `@media (width >= …)` and emits nothing wrapped at `xs` (`:251-259`). `breakpoint-down` emits `@media (width < …)` and emits nothing at `xs` (`:280-286`). `breakpoint-each` and `breakpoint-each-down` walk the ramp (`:263-273, 297`).

No function computes a fluid type size. `heading-size` returns a fixed token. The remaining viewport-scaled font size is `legend`: `calc(var(--vn-size-6) * 0.85 + 0.3vw)`, then `var(--vn-size-6)` from `breakpoint-up(xl)` (`src/styles/elements/_fieldset.scss:15-20`).

## Unlocated

- Built `h1`, `h3`, and `h5` `font-size` text. Search `rg -o 'h1{font-size:…'` against `dist/src/styles/index.css` was rejected by the runner. The source loop at `src/styles/elements/_heading.scss:12-15` writes them, and the built extract did return `h2`, `h4`, `h6` plus every `.h*` class.
- A compiled Elements `.text-*` rule and the property it sets. Elements SCSS does not contain those selectors. The only hit is the `@theme` comment at `src/styles/_theme.scss:7-8`. No built Elements stylesheet was in the named checkout.

# Veneer

> Elements' look and motion on Bootstrap 5.3 contracts, with an owned engine and standalone CSS.

## Surface

The core entry publishes the token registry and the types that read it. The browser entry
publishes the color-mode controller. The token values those names carry are in § Tokens.

| Name                   | Kind      | Summary                                                                                                                              |
| ---------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `TOKEN_NAMES`          | const     | Names every canonical custom property the shipped cascade declares, grouped by the surface each one paints or the scale it controls. |
| `TokenLeaf`            | type      | Reduces a group of custom-property names to the union of the names at its leaves.                                                    |
| `TokenMap`             | type      | Describes the grouped tree of custom-property names the token registry carries.                                                      |
| `TokenName`            | type      | Names one canonical custom property the shipped cascade declares.                                                                    |
| `ColorModeState`       | type      | Names the color modes Bootstrap's color-mode attribute accepts.                                                                      |
| `ColorModeOptions`     | interface | Configures the root and optional persistence of a color-mode controller.                                                             |
| `ColorModeInterface`   | interface | Controls the color-mode attribute on one root element.                                                                               |
| `ColorMode`            | class     | Applies and optionally restores a root's color mode without registering listeners.                                                   |
| `isColorModeState`     | function  | Checks whether a value names a supported color mode.                                                                                 |
| `COLOR_MODE_ATTRIBUTE` | const     | Names the Bootstrap color-mode attribute.                                                                                            |
| `COLOR_MODE_KEY`       | const     | Names the storage key for the chosen color mode.                                                                                     |

The controller reads its mode from the root on every access. A `dark` attribute selects dark mode;
every other value selects light mode. Applying light mode removes the attribute. Construction
restores a valid stored mode when you supply storage, and otherwise leaves the root unchanged.
Storage operations use the supplied browser storage directly and propagate its errors.

## Methods

The interface exposes the following lifecycle operations.

#### `ColorModeInterface`

| Method    | Summary                                                     |
| --------- | ----------------------------------------------------------- |
| `apply`   | Writes the mode to the root and to storage when configured. |
| `toggle`  | Flips the mode and returns the applied mode.                |
| `destroy` | Removes the attribute only when this controller wrote it.   |

## Examples

Construct a controller on the document root, select a mode, toggle it, and release its attribute.

```ts
import { ColorMode } from '@orkestrel/veneer/browser'

const controller = new ColorMode()
controller.apply('light')
controller.toggle()
controller.destroy()
```

Supply a particular root and a storage, so construction restores the mode already stored there.

```ts
import { ColorMode } from '@orkestrel/veneer/browser'

const controller = new ColorMode({ root: document.documentElement, storage: sessionStorage })
controller.apply('dark')
controller.destroy()
```

Check an external value before passing it to the controller.

```ts
import { isColorModeState } from '@orkestrel/veneer/browser'

isColorModeState('dark') // true
isColorModeState('auto') // false
```

## Styles

Veneer publishes its cascade through a standalone stylesheet subpath, `./styles`. The
`build:src:styles` script compiles the `src/styles/index.scss` barrel to the
`dist/src/styles/index.css` stylesheet, and the manifest's `exports` map names that file under the
subpath. The manifest lists the `**/*.css` pattern in its `sideEffects` field, so a bundler keeps
an import of that subpath rather than dropping it as unused.

Load the cascade from your entry module, ahead of the rules of your own that override it.

```ts
import '@orkestrel/veneer/styles'
```

The specifier resolves to standalone CSS rather than to a JavaScript module, so the import carries a
stylesheet and declares no binding. A consumer with no bundler resolves the same subpath and serves
the resolved file with a `<link>` element instead.

### Files

The following files carry the axis.

| File                                | Role                                                                       |
| ----------------------------------- | -------------------------------------------------------------------------- |
| `src/styles/index.scss`             | The compilation barrel.                                                    |
| `src/styles/index.ts`               | The side-effect entry, and the build's library entry.                      |
| `configs/src/vite.styles.config.ts` | The build and test wrapper, composed from the root's `srcBrowser` factory. |
| `configs/src/tsconfig.styles.json`  | The check-only TypeScript project.                                         |
| `tests/setupStyles.ts`              | The shared setup module the styles proofs read.                            |
| `tests/src/styles/`                 | The browser proofs of the shipped cascade.                                 |

The barrel's `@use` rules name the `_tokens.scss` and `_theme.scss` partials and the element
partials under the `elements/` directory; the `_mixins.scss` partial reaches the build through the
token and theme partials rather than through the barrel. The entry imports the `./index.scss`
barrel and nothing else, and the JavaScript wrapper the build emits from it stays unexported,
because the `./styles` subpath names the stylesheet.

The wrapper replaces the plugins, the output directory, the library entry, the build options
(keeping the root's build-log handler and dropping the browser externals and output paths), and the
test fields it inherits, and it declares the `src:styles` project. The check-only project extends
the root `tsconfig.json` file, narrows the `lib` option to the `ESNext` value and the `types`
option to the `vite/client` value over the `src/styles/**/*.ts` sources, and emits nothing.
The setup module carries the direction scanners, the shadow readers, and the Bootstrap
compatibility oracle's retained values, and it imports no stylesheet of its own: the styles project
loads the built cascade through its `setupFiles` array instead. § Tests names each proof under the
`tests/src/styles/` directory.

### Scripts

Each script names the styles target alone, and the `src` chain it belongs to runs it after the core
and browser targets.

| Script             | Contract                                                                                            | Chained from                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `build:src:styles` | Builds the `dist/src/styles` directory from the `configs/src/vite.styles.config.ts` wrapper.        | The `build:src` chain, after the `build:src:core` and `build:src:browser` scripts. |
| `check:src:styles` | Typechecks the `src/styles/**/*.ts` sources against the `configs/src/tsconfig.styles.json` project. | The `check:src` chain, after the `check:src:core` and `check:src:browser` scripts. |
| `test:src:styles`  | Builds the cascade, then runs the `src:styles` project.                                             | The `test:src` chain, after the root's `src:core` and `src:browser` projects.      |

The `test:src:styles` script builds first because the proof's subject is the compiled cascade: the
project loads the `dist/src/styles/index.css` file through its `setupFiles` array, and the cases
that read the shipped cascade read the rules the browser resolved from that file rather than the
declarations the SCSS sources carry. The mixin proofs compile their own fixture partial,
`tests/src/styles/fixtures/mixins.scss`, and the token proofs also drive declarations the case
writes.

### Departures from the workspace rows

The `.claude/rules/workspace.md` rule file carries a row for the styles axis in each of its tables:
a `src/styles/` row in the environment table, a `@src/styles` row in the alias table, and the
matching rows of its build-output, test-project, and scoped-check tables. Veneer's pilot departs
from those rows as follows, and each departure names its cause.

- **No `@src/styles` alias.** The root `tsconfig.json` file is the package's own content, so the
  alias could sit there; the lint allowlist is what forecloses it. The
  `import/no-unassigned-import` rule permits an unassigned import only for a stylesheet suffix, and
  an alias carries none. The showcase shell imports the barrel through its
  `../../src/styles/index.scss` relative path instead, and a generator that emits the alias widens
  that allowlist in the same release.
- **The wrapper composes the root's browser factory.** The root `vite.config.ts` file declares no
  styles factory to compose, so the `configs/src/vite.styles.config.ts` wrapper spreads the
  `srcBrowser` factory and replaces the differing fields by assignment. The root's `mergeOverride`
  helper is not that mechanism: it keeps a base plugin no override names, so the
  `environmentBoundary('src/browser')` plugin would stay on a styles build, and it concatenates
  every other array, so the include list and the setup files would double.
- **No environment boundary and no lint fence owns the `src/styles` directory.** The root's
  `srcBrowser` and `appBrowser` factories plant the `environmentBoundary` plugin on the
  `src/browser` and `app/browser` environments, and the `configs/src/vite.core.config.ts` wrapper
  plants it on the `src/core` environment. The `.oxlintrc.json` file fences each of those
  environments with its own `no-restricted-imports` patterns. Neither the boundary nor the fence
  names the `src/styles` directory, so the generic `src/**` rules govern the styles entry alone.
- **The `src:styles` project is declared in its own wrapper.** The root `vite.config.ts` file
  registers the `src:core`, `src:browser`, and `app:browser` projects and the cross-cutting ones;
  the styles project is declared in the `configs/src/vite.styles.config.ts` wrapper. So the
  `--project src:styles` selection at the root matches no project and Vitest refuses the run, and
  the `probe` workbench, which runs from the root configuration, cannot name the project either.
  The `test:src:styles` script reaches it with the `--config` flag.
- **The vendored `tests/config.test.ts` proof asserts nothing about the axis.** That proof iterates
  the environments scaffold generates, so its alias, project, and plugin cases pass over the
  `src/styles` directory and the `src:styles` project. The proofs under the `tests/src/styles/`
  directory prove the cascade, the tokens, the theme, the mixins, and the elements, and no proof
  asserts the alias, the project registration, or the configuration plugins for the axis; that gap
  is a departure recorded here, not covered.
- **The `tests/setup.css` file arrives with the Tailwind unit.** The workspace rows describe that
  file as the declaration of cascade-layer order ahead of the `@import 'tailwindcss'` rule and its
  `@source` rule. Veneer declares no Tailwind dependency and carries no such file, so it lands with
  the unit that adds one.

Scaffold's `SRC_MATRIX` constant is closed on the `core`, `browser`, and `server` environments, so
this axis is hand-authored and its configuration files, `configs/src/vite.styles.config.ts` and
`configs/src/tsconfig.styles.json`, are the package's own. Emitting the axis from the generator
means the `@src/styles` alias in the root `tsconfig.json` file, the matching lint allowlist entry
and fence, a `src/styles` owner in the environment boundary, a `srcStyles` factory and its project
registration in the root `vite.config.ts` file, and the environment lists in the
`tests/config.test.ts` proof.

## Tokens

Veneer publishes the token registry through the `@orkestrel/veneer` specifier and the cascade that
declares those tokens through `@orkestrel/veneer/styles`. `src/core/constants.ts` holds the names,
`src/styles/_tokens.scss` holds the light and dark value maps, and `src/styles/_theme.scss` holds the
scopes that apply them.

Veneer declares one canonical token per value and one `--bs-*` alias per Bootstrap root variable. A
registry path is its name: `TOKEN_NAMES.color.primary.subtle` is `--vn-color-primary-subtle`. A
registry member is a group exactly where the cascade declares more than one property for it, so
`TOKEN_NAMES.border.color` is a leaf while `TOKEN_NAMES.color.primary` carries `base`, `rgb`, and
the tiers. A group's own value takes the `base` member and the `-base` suffix with it, which is why
`--vn-text-body-base` sits beside `--vn-text-body-rgb` and the tierless `--vn-text-secondary` takes
no suffix at all. Read a channel triplet through the alpha form it exists for:
`rgba(var(--vn-color-primary-rgb), 0.5)`.

A table with a `Source` column names in each cell where that row's value comes from. The factor
table, the tier table, and the departures table carry no such column: the factor table's values are
Veneer's own neutral multipliers, the tier table gives each tier's expression in the row, and the
departures table sets Veneer's value beside Bootstrap's. The table lists every `Source` value a
cell can carry, and gives in each row what that value names.

| Source      | Meaning                                                                                       |
| ----------- | --------------------------------------------------------------------------------------------- |
| `elements`  | Read from Elements' built showcase on 2026-09-20; the cell names the reading                  |
| `bootstrap` | Bootstrap 5.3.8's own value, retained because no Elements specimen measures it                |
| `derived`   | An expression over other Veneer tokens; the cell gives the expression or the value it targets |

### Reference map

#### Factors

Each factor is a registered `<number>` that inherits, so an invalid value falls back to `1` rather
than dropping every length built on it. Each value here is the neutral multiplier of the scale the
token's own name gives: `density` multiplies the space scale, `radius` the radius scale,
`elevation` the shadow scale, and `motion` the durations. A factor is Veneer's own, so it carries
no `Source` column.

| Token                   | Value | Alias |
| ----------------------- | ----- | ----- |
| `--vn-factor-density`   | `1`   | none  |
| `--vn-factor-radius`    | `1`   | none  |
| `--vn-factor-elevation` | `1`   | none  |
| `--vn-factor-motion`    | `1`   | none  |

A factor takes effect where the scale it multiplies is declared. Veneer declares the scales at
`:root`, so a factor set on the root element rescales the document. A subtree that sets a factor
alone keeps the root's lengths, because a custom property carries its `var()` references already
substituted; to rescale a subtree, declare the factor and the scale together on that subtree.

#### Palette and gray ramp

No Elements specimen measures a hue outside the semantic roles, so every value here is Bootstrap's.

| Token                                               | Value                                                                                                        | Source      | Alias                             |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------- | --------------------------------- |
| `--vn-palette-blue` through `--vn-palette-cyan`     | `#0d6efd`, `#6610f2`, `#6f42c1`, `#d63384`, `#dc3545`, `#fd7e14`, `#ffc107`, `#198754`, `#20c997`, `#0dcaf0` | `bootstrap` | `--bs-blue` through `--bs-cyan`   |
| `--vn-palette-black-base`, `--vn-palette-black-rgb` | `#000`, `0, 0, 0`                                                                                            | `bootstrap` | `--bs-black`, `--bs-black-rgb`    |
| `--vn-palette-white-base`, `--vn-palette-white-rgb` | `#fff`, `255, 255, 255`                                                                                      | `bootstrap` | `--bs-white`, `--bs-white-rgb`    |
| `--vn-gray-100` through `--vn-gray-900`             | `#f8f9fa`, `#e9ecef`, `#dee2e6`, `#ced4da`, `#adb5bd`, `#6c757d`, `#495057`, `#343a40`, `#212529`            | `bootstrap` | `--bs-gray-100` … `--bs-gray-900` |

`--bs-gray` reads `var(--vn-gray-600)` and `--bs-gray-dark` reads `var(--vn-gray-800)`, which are
Bootstrap's own values for them, so neither gets a canonical token of its own.

#### Semantic roles

Each role carries a fill, its channel triplet, and the subtle, emphasis, and border tiers. Veneer
takes Bootstrap's role names as the compatibility axis and Elements' measured fills as the identity.
`tertiary` is Veneer's own role and answers no Bootstrap alias.

| Role        | Fill                                                | Source                                             | Alias            |
| ----------- | --------------------------------------------------- | -------------------------------------------------- | ---------------- |
| `primary`   | `oklch(0.48 0.255 264)`, dark `oklch(0.7 0.15 233)` | `elements` — primary fill and border               | `--bs-primary`   |
| `secondary` | `oklch(0.446 0.043 257.281)`                        | `elements` — secondary fill                        | `--bs-secondary` |
| `tertiary`  | `oklch(0.541 0.281 293.009)`                        | `elements` — tertiary fill                         | none             |
| `success`   | `oklch(0.527 0.154 150.069)`                        | `elements` — success fill                          | `--bs-success`   |
| `info`      | `oklch(0.5 0.134 242.749)`                          | `elements` — the fill of the `information` variant | `--bs-info`      |
| `warning`   | `oklch(0.555 0.163 48.998)`                         | `elements` — warning fill                          | `--bs-warning`   |
| `danger`    | `oklch(0.505 0.213 27.518)`                         | `elements` — danger fill                           | `--bs-danger`    |
| `light`     | `var(--vn-gray-100)`                                | `bootstrap` — no Elements specimen renders it      | `--bs-light`     |
| `dark`      | `var(--vn-gray-900)`                                | `bootstrap` — no Elements specimen renders it      | `--bs-dark`      |

Only the primary fill retunes by mode. Each role's tiers are oklab mixes over that role's own fill,
so a retuned fill carries its whole family with it.

| Tier                         | Light expression                                               | Dark expression                                             | Alias                       |
| ---------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------- |
| `--vn-color-{role}-subtle`   | `color-mix(in oklab, {fill} 12%, var(--vn-surface-body-base))` | the same mix at `15%`                                       | `--bs-{role}-bg-subtle`     |
| `--vn-color-{role}-emphasis` | `color-mix(in oklab, {fill} 70%, var(--vn-text-body-base))`    | the same mix                                                | `--bs-{role}-text-emphasis` |
| `--vn-color-{role}-border`   | `color-mix(in oklab, {fill} 35%, var(--vn-surface-body-base))` | `color-mix(in oklab, {fill} 50%, var(--vn-surface-raised))` | `--bs-{role}-border-subtle` |

The percentages are Elements' own, and `tests/src/styles/tokens.test.ts` resolves each measured
role's tier against the color Elements renders for it.

`--vn-color-{role}-rgb` carries the fill's sRGB rendering as channels, for a consumer writing
`rgba(var(--vn-color-primary-rgb), 0.5)`. A fill outside the sRGB gamut takes the color the engine
paints for it, which is the clamped rendering: the dark primary is `0, 172, 236` rather than the
negative red channel its `color-mix()` serialization reports.

#### Text and surface

The table lists the body text tokens and the surface tokens they are painted on. Each row gives
its light value, its dark value, the `Source` the preceding legend decides, and the `--bs-*`
variables it answers.

| Token                                 | Light                                                                                                     | Dark                                                                           | Source                                                 | Alias                                            |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------ |
| `--vn-text-body-base`, `-rgb`         | `oklch(0.208 0.042 265.755)`, `15, 23, 43`                                                                | `oklch(0.929 0.013 255.508)`, `226, 232, 240`                                  | `elements` — text                                      | `--bs-body-color`, `--bs-body-color-rgb`         |
| `--vn-text-emphasis-base`, `-rgb`     | `var(--vn-palette-black-base)`, `var(--vn-palette-black-rgb)`                                             | `var(--vn-palette-white-base)`, `var(--vn-palette-white-rgb)`                  | `elements` — dialog text                               | `--bs-emphasis-color`, `--bs-emphasis-color-rgb` |
| `--vn-text-secondary`                 | `color-mix(in srgb, var(--vn-text-body-base) 75%, transparent)`                                           | the same expression                                                            | `derived` — Bootstrap's own 75% step                   | `--bs-secondary-color`                           |
| `--vn-text-tertiary`                  | the same expression at `50%`                                                                              | the same expression                                                            | `derived` — Bootstrap's own 50% step                   | `--bs-tertiary-color`                            |
| `--vn-text-heading`                   | `inherit`                                                                                                 | `inherit`                                                                      | `bootstrap` — headings take the body color             | `--bs-heading-color`                             |
| `--vn-text-code`                      | `var(--vn-palette-pink)`                                                                                  | `color-mix(in srgb, var(--vn-palette-white-base) 40%, var(--vn-palette-pink))` | `derived` — reaches Bootstrap's `#e685b5`              | `--bs-code-color`                                |
| `--vn-text-highlight`                 | `var(--vn-text-body-base)`                                                                                | the same expression                                                            | `bootstrap` — the highlight takes body copy            | `--bs-highlight-color`                           |
| `--vn-surface-body-base`, `-rgb`      | `var(--vn-palette-white-base)`, `var(--vn-palette-white-rgb)`                                             | `oklch(0.21 0.013 256)`, `20, 25, 30`                                          | `elements` — the page canvas                           | `--bs-body-bg`, `--bs-body-bg-rgb`               |
| `--vn-surface-raised`                 | `oklch(0.984 0.003 247.858)`                                                                              | `oklch(0.235 0.013 256)`                                                       | `elements` — popover and drawer surface                | none                                             |
| `--vn-surface-secondary-base`, `-rgb` | `var(--vn-gray-200)`, `233, 236, 239`                                                                     | `var(--vn-gray-800)`, `52, 58, 64`                                             | `bootstrap` — no Elements specimen renders the tier    | `--bs-secondary-bg`, `--bs-secondary-bg-rgb`     |
| `--vn-surface-tertiary-base`, `-rgb`  | `var(--vn-gray-100)`, `248, 249, 250`                                                                     | `color-mix(in srgb, var(--vn-gray-800) 50%, var(--vn-gray-900))`, `43, 48, 53` | `derived` — reaches Bootstrap's `#2b3035`              | `--bs-tertiary-bg`, `--bs-tertiary-bg-rgb`       |
| `--vn-surface-highlight`              | `color-mix(in srgb, var(--vn-palette-white-base) 80%, var(--vn-color-warning-base))`                      | the same mix over `var(--vn-palette-black-base) 60%`                           | `derived` — Bootstrap's own tint over the warning role | `--bs-highlight-bg`                              |
| `--vn-surface-gradient`               | `linear-gradient(180deg, color-mix(in srgb, var(--vn-palette-white-base) 15%, transparent), transparent)` | the same expression                                                            | `bootstrap` — Bootstrap's own gradient                 | `--bs-gradient`                                  |

`--vn-surface-raised` is the color Elements paints its popover and drawer on. Veneer declares it
here because the dark border tier mixes against it; the component surfaces that consume it land with
their components.

#### Links

The table lists the link tokens: the resting color, the hover color, and the decoration. Each row
gives its light value, its dark value, its `Source`, and the `--bs-*` variables it answers.

| Token                          | Light                                                                                     | Dark                                                                                                 | Source                                                                                                 | Alias                                                |
| ------------------------------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| `--vn-link-base`, `-rgb`       | `var(--vn-color-primary-base)`, `8, 65, 234`                                              | `color-mix(in srgb, var(--vn-palette-white-base) 40%, var(--vn-color-primary-base))`, `85, 205, 243` | `derived` — light takes the primary fill unchanged, and dark is Bootstrap's own 40% white tint over it | `--bs-link-color`, `--bs-link-color-rgb`             |
| `--vn-link-hover-base`, `-rgb` | `color-mix(in srgb, var(--vn-palette-black-base) 20%, var(--vn-link-base))`, `6, 52, 187` | `color-mix(in srgb, var(--vn-palette-white-base) 20%, var(--vn-link-base))`, `119, 215, 246`         | `derived` — Bootstrap's own shade step                                                                 | `--bs-link-hover-color`, `--bs-link-hover-color-rgb` |
| `--vn-link-decoration`         | `underline`                                                                               | `underline`                                                                                          | `bootstrap` — retained, because no Elements specimen measures a link's decoration                      | `--bs-link-decoration`                               |

#### Type

The table lists the type tokens: the families, the size scale, the line heights, and the weights.
Each row gives one value for every mode, its `Source`, and the `--bs-*` variables it answers.

| Token                                     | Value                                                                                 | Source                                          | Alias                                            |
| ----------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------ |
| `--vn-font-sans`                          | Elements' system stack, beginning `system-ui`                                         | `elements` — the family on every specimen       | `--bs-font-sans-serif`, `--bs-body-font-family`  |
| `--vn-font-mono`                          | Bootstrap's monospace stack                                                           | `bootstrap` — no Elements specimen renders code | `--bs-font-monospace`                            |
| `--vn-size-1` through `--vn-size-8`       | `0.75rem`, `0.875rem`, `1rem`, `1.125rem`, `1.25rem`, `1.5rem`, `1.875rem`, `2.25rem` | `elements` — the type table's 12 to 36 px steps | `--bs-body-font-size` reads `--vn-size-2`        |
| `--vn-line-body`, `--vn-line-heading`     | `1.5`, `1.2`                                                                          | `elements` — the type table's rhythm            | `--bs-body-line-height` reads `--vn-line-body`   |
| `--vn-weight-body`, `--vn-weight-heading` | `400`, `600`                                                                          | `elements` — the type table's weights           | `--bs-body-font-weight` reads `--vn-weight-body` |

#### Space, border, radius, and elevation

The table lists the length tokens the layout is built from: the space scale, the border, the radius
scale, and the elevation rungs. Each row gives its value, its `Source`, and the `--bs-*` variables
it answers, and a row whose dark mode differs writes the dark reading into its own `Value` cell.

| Token                                     | Value                                                                                                                                                                                                                                                                                                                                                                                 | Source                                              | Alias                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| `--vn-space-1`                            | `calc(0.125rem * var(--vn-factor-density))`, giving 2 px                                                                                                                                                                                                                                                                                                                              | `derived` — the scale expression at N = 1           | none                                                                   |
| `--vn-space-2` through `--vn-space-8`     | the scale expression `calc(N * 0.125rem * var(--vn-factor-density))` at N = 2 through 8, giving 4 to 16 px                                                                                                                                                                                                                                                                            | `elements` — the space table's paddings             | none                                                                   |
| `--vn-border-width`, `--vn-border-style`  | `1px`, `solid`                                                                                                                                                                                                                                                                                                                                                                        | `elements` — every bordered specimen draws 1 px     | `--bs-border-width`, `--bs-border-style`                               |
| `--vn-border-color`                       | `oklch(0.869 0.022 252.894)`, dark `oklch(0.4 0.022 256)`                                                                                                                                                                                                                                                                                                                             | `elements` — border                                 | `--bs-border-color`                                                    |
| `--vn-border-translucent`                 | `color-mix(in srgb, var(--vn-palette-black-base) 17.5%, transparent)`, dark white at `15%`                                                                                                                                                                                                                                                                                            | `bootstrap` — Bootstrap's own translucent edge      | `--bs-border-color-translucent`                                        |
| `--vn-radius-small`, `-base`, `-large`    | `calc(0.25rem * var(--vn-factor-radius))`, `0.375rem`, `0.5rem` scaled the same way                                                                                                                                                                                                                                                                                                   | `elements` — the 4, 6, 8 px radius scale            | `--bs-border-radius-sm`, `--bs-border-radius`, `--bs-border-radius-lg` |
| `--vn-radius-xlarge`, `-xxlarge`, `-pill` | `1rem` and `2rem` scaled the same way, then `50rem`                                                                                                                                                                                                                                                                                                                                   | `bootstrap` — no Elements specimen renders them     | `--bs-border-radius-xl`, `-xxl`, `-2xl`, `-pill`                       |
| `--vn-shadow-1`, `-2`, `-3`               | Elements' hint, popover, and dialog pairs, each length in `rem` scaled by `var(--vn-factor-elevation)` and each color `rgba(var(--vn-palette-black-rgb), α)`: `0 0.0625rem 0.125rem` at `0.05` over `0 0.0625rem 0.1875rem` at `0.09`; `0 0.125rem 0.25rem` at `0.06` over `0 0.5rem 1rem -0.25rem` at `0.12`; `0 0.25rem 0.5rem` at `0.07` over `0 1.5rem 2.75rem -0.5rem` at `0.22` | `elements` — the elevation table                    | `--bs-box-shadow-sm`, `--bs-box-shadow`, `--bs-box-shadow-lg`          |
| `--vn-shadow-inset`                       | `inset 0 0.0625rem 0.125rem` at `0.075`, each length scaled by `var(--vn-factor-elevation)` and the color written the same way as the preceding rungs                                                                                                                                                                                                                                 | `bootstrap` — no Elements specimen renders an inset | `--bs-box-shadow-inset`                                                |

#### Motion, focus, validation, breakpoints, and stacking

The table lists the durations and easings, the focus ring, the validation pair, the breakpoint
ladder, and the stacking ladder. Each row gives its value, its `Source`, and the `--bs-*` variables
it answers, and a row whose dark mode differs writes the dark reading into its own cell.

| Token                                                    | Value                                                                                               | Source                                                                                                                                              | Alias                                                                                                                |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `--vn-motion-feedback`, `--vn-motion-panel`              | `calc(150ms * var(--vn-factor-motion))`, `calc(250ms * …)`                                          | `elements` — the motion table's durations                                                                                                           | none                                                                                                                 |
| `--vn-ease-standard`, `--vn-ease-out`, `--vn-ease-panel` | `ease`, `ease-out`, `cubic-bezier(0.32, 0.72, 0, 1)`                                                | `elements` — the motion table's easings                                                                                                             | none                                                                                                                 |
| `--vn-focus-width`, `--vn-focus-opacity`                 | `0.1875rem`, `0.45`                                                                                 | `elements` — the focus-visible ring                                                                                                                 | `--bs-focus-ring-width`, `-opacity`                                                                                  |
| `--vn-focus-color`                                       | `color-mix(in oklab, var(--vn-color-primary-base) 45%, transparent)`                                | `derived` — reproduces the calibrated ring: `oklab(0.48 -0.0266547 -0.253603 / 0.45)` in light and `oklab(0.7 -0.0902723 -0.119795 / 0.45)` in dark | `--bs-focus-ring-color`                                                                                              |
| `--vn-form-valid`, `--vn-form-invalid`                   | `var(--vn-color-success-base)` and `var(--vn-color-danger-base)`, dark the `-emphasis` tier of each | `bootstrap` — Bootstrap's own pairing                                                                                                               | `--bs-form-valid-color`, `--bs-form-valid-border-color`, `--bs-form-invalid-color`, `--bs-form-invalid-border-color` |
| `--vn-breakpoint-xs` through `--vn-breakpoint-xxl`       | `0`, `576px`, `768px`, `992px`, `1200px`, `1400px`                                                  | `bootstrap` — the documented wire vocabulary                                                                                                        | `--bs-breakpoint-xs` … `-xxl`                                                                                        |
| `--vn-stack-dropdown`, `-sticky`, `-fixed`               | `1000`, `1020`, `1030`                                                                              | `bootstrap` — retained from `$zindex-dropdown`, `$zindex-sticky`, and `$zindex-fixed`                                                               | none                                                                                                                 |
| `--vn-stack-drawer-backdrop`, `-drawer-base`             | `1040`, `1045`                                                                                      | `bootstrap` — retained from `$zindex-offcanvas-backdrop` and `$zindex-offcanvas`                                                                    | none                                                                                                                 |
| `--vn-stack-dialog-backdrop`, `-dialog-base`             | `1050`, `1055`                                                                                      | `bootstrap` — retained from `$zindex-modal-backdrop` and `$zindex-modal`                                                                            | none                                                                                                                 |
| `--vn-stack-popover`, `-hint`, `-toast`                  | `1070`, `1080`, `1090`                                                                              | `bootstrap` — retained from `$zindex-popover`, `$zindex-tooltip`, and `$zindex-toast`                                                               | none                                                                                                                 |

Veneer keeps Bootstrap's breakpoint names verbatim because a consumer predicts `--bs-breakpoint-md`
from `--vn-breakpoint-md`. The stacking ladder takes Veneer's own component words: `drawer` is
Bootstrap's offcanvas, `dialog` its modal, and `hint` its tooltip. Bootstrap declares that ladder as
Sass variables on its component rules rather than as root custom properties, so each rung retains
Bootstrap's own number and answers no `--bs-*` alias.

### Bootstrap variables Veneer retains

`--bs-btn-close-filter`, `--bs-carousel-indicator-active-bg`, `--bs-carousel-caption-color`, and
`--bs-carousel-control-icon-filter` paint a component Veneer does not own yet. Each keeps
Bootstrap's value in the alias scope until the component that paints it lands its canonical token. A
data URI cannot read a custom property, so the forward path for each is a `mask-image` treatment in
the unit that owns the component.

Bootstrap also retunes `--bs-form-select-bg-img`, `--bs-form-switch-bg`,
`--bs-navbar-toggler-icon-bg`, `--bs-accordion-btn-icon`, and `--bs-accordion-btn-active-icon` under
a dark component selector, and declares no light counterpart at theme scope. Veneer declares each in
its dark scope with Bootstrap's own value. A light island nested inside a dark one therefore
inherits the dark asset, and the component unit that owns each one closes that.

### Customization

Override a canonical token in your own unlayered rule. Veneer declares its tokens inside
`@layer theme`, so an unlayered rule wins, and every derived tier and every `--bs-*` alias follows
the override because each one is an expression over the token you changed.

```css
:root {
	--vn-factor-density: 1.25;
	--vn-color-primary-base: #2e7d32;
	--vn-color-primary-rgb: 46, 125, 50;
}

[data-bs-theme='dark'] {
	--vn-color-primary-base: #66bb6a;
	--vn-color-primary-rgb: 102, 187, 106;
}

.brand-veil {
	background-color: rgba(var(--vn-color-primary-rgb), 0.5);
}
```

That rule rescales the space scale from 6 px to 7.5 px at `--vn-space-3`, repaints `--bs-primary` in
the color you named, and carries that color through `--bs-primary-bg-subtle`,
`--bs-primary-text-emphasis`, and `--bs-primary-border-subtle`. The channel triplet is a literal
rather than an expression, so override `--vn-color-primary-rgb` alongside the fill; the
`.brand-veil` rule, and any other rule of yours reading the triplet, otherwise keeps painting the
old brand. That rule is also the alpha form itself: a triplet is comma-separated, so it takes
`rgba(triplet, alpha)` and not the slash syntax a modern `rgb()` accepts. The
`[data-bs-theme='dark']` rule is what carries the brand into a dark island, which keeps its own fill
and mixes its own tiers from it. `tests/src/styles/integration.test.ts` executes this recipe and
reads the rescaled spacing, the fill, the subtle, emphasis, and border tiers, the triplet, the
translucent fill the alpha form paints, what a fill override without the triplet leaves that
translucent fill painting, and the dark island's own fill and tiers.

### Departures from Bootstrap

Veneer takes Elements' identity wherever a specimen measures it, so these values differ from the
Bootstrap release they alias.

| Token                                    | Veneer value                                                                                                                                                    | Bootstrap 5.3.8 value                                                                                                     |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `--vn-size-2`                            | `0.875rem`                                                                                                                                                      | `1rem`                                                                                                                    |
| `--vn-weight-heading`                    | `600`                                                                                                                                                           | `500`                                                                                                                     |
| `--vn-color-primary-base`                | `oklch(0.48 0.255 264)`, dark `oklch(0.7 0.15 233)`                                                                                                             | `#0d6efd` in light and dark                                                                                               |
| `--vn-color-secondary-base`              | `oklch(0.446 0.043 257.281)`                                                                                                                                    | `#6c757d`                                                                                                                 |
| `--vn-color-success-base`                | `oklch(0.527 0.154 150.069)`                                                                                                                                    | `#198754`                                                                                                                 |
| `--vn-color-info-base`                   | `oklch(0.5 0.134 242.749)`                                                                                                                                      | `#0dcaf0`                                                                                                                 |
| `--vn-color-warning-base`                | `oklch(0.555 0.163 48.998)`                                                                                                                                     | `#ffc107`                                                                                                                 |
| `--vn-color-danger-base`                 | `oklch(0.505 0.213 27.518)`                                                                                                                                     | `#dc3545`                                                                                                                 |
| `--vn-text-body-base`                    | `oklch(0.208 0.042 265.755)` / `oklch(0.929 0.013 255.508)`                                                                                                     | `#212529` / `#dee2e6`                                                                                                     |
| `--vn-surface-body-base` dark            | `oklch(0.21 0.013 256)`                                                                                                                                         | `#212529`                                                                                                                 |
| `--vn-border-color`                      | `oklch(0.869 0.022 252.894)` / `oklch(0.4 0.022 256)`                                                                                                           | `#dee2e6` / `#495057`                                                                                                     |
| `--vn-shadow-1`, `-2`, `-3`              | Elements' hint, popover, and dialog pairs                                                                                                                       | `0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)`, `0 0.5rem 1rem rgba(0, 0, 0, 0.15)`, `0 1rem 3rem rgba(0, 0, 0, 0.175)`        |
| `--vn-focus-width`, `--vn-focus-opacity` | `0.1875rem`, `0.45`                                                                                                                                             | `0.25rem`, `0.25`                                                                                                         |
| `--vn-font-sans`                         | `system-ui`, `-apple-system`, `'Segoe UI'`, `roboto`, `'Helvetica Neue'`, `arial`, `sans-serif`, `'Apple Color Emoji'`, `'Segoe UI Emoji'`, `'Segoe UI Symbol'` | the same stack with `"Noto Sans"` and `"Liberation Sans"` added before `Arial`, and `"Noto Color Emoji"` added at the end |

Bootstrap's `--bs-body-font-size` reads `--vn-size-2` and its `--bs-font-sans-serif` reads
`--vn-font-sans`, so those rows are the departures a Bootstrap component meets through its own
variable rather than through a Veneer token it names directly.

Veneer drops the `"Noto Sans"`, `"Liberation Sans"`, and `"Noto Color Emoji"` families Bootstrap
lists, because no Elements specimen renders any of them.

`--vn-line-heading` at `1.2` and `--vn-radius-base` at `0.375rem` agree with Bootstrap's own values.
They are recorded here rather than in the table, so a reader looking for them meets the agreement
instead of an omission.

Veneer's `tertiary` role has no Bootstrap counterpart, and Bootstrap's `light` and `dark` roles have
no Elements specimen, so each of those keeps the other project's value unchanged.

These Elements behaviors are departures Veneer does not copy. Elements' disclosure still
interpolates its content height when the engine reports `prefers-reduced-motion: reduce`; Veneer's
`transition` mixin emits the reduced-motion pair for every transition it writes, and
`tests/src/styles/mixins.test.ts` reads the collapse. Elements' popover snaps open and fades closed;
that asymmetry belongs to the overlay units and is recorded as an Elements decision rather than a
Bootstrap one.

### Deferred names

These names are not declared in this release. Each one lands with the first consumer that reads it,
and each is named here so a consumer does not look for it.

| Name                                             | Waiting on                                                      |
| ------------------------------------------------ | --------------------------------------------------------------- |
| `scroll-padding` on the document                 | The first sticky header, which fixes the offset                 |
| The hover and active fill tints                  | The button, whose specimens calibrate the mix against each role |
| The `focus-ring` mixin                           | The button, its first consumer                                  |
| The `breakpoint-down` mixin                      | The first responsive partial                                    |
| The hint surface and the component-scoped tokens | The components that paint them                                  |

## Compatibility

This section is the ledger of what Veneer accepts from Bootstrap 5.3.8. The
tests/conformance.test.ts proof reads its rows and compares their named steps with the official
Button recording. The Component column carries the inventory key, so later component units extend
the same table.

The table records the Button obligations and the engine obligations assigned to its unit.

| Component | Kind           | Obligation                                                                                                                                                                                                                        | Proof                 | Status   |
| --------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | -------- |
| btn       | identity       | Button identifies itself as button, bs.button, and .bs.button; defaults and type defaults are inherited empty.                                                                                                                    | button.initial        | accepted |
| btn       | attribute      | The data-bs-toggle="button" click prevents its default action and creates or reuses the instance to toggle active and aria-pressed.                                                                                               | button.click.toggle   | accepted |
| btn       | method         | toggle() flips active and aria-pressed on every activation, without a no-op guard.                                                                                                                                                | button.click.toggle   | accepted |
| btn       | method         | toggle() flips active and aria-pressed on every activation, without a no-op guard.                                                                                                                                                | button.click.release  | accepted |
| btn       | method         | The static jQueryInterface invokes toggle only when config is toggle.                                                                                                                                                             | —                     | accepted |
| btn       | initialization | defineJQueryPlugin registers Button.                                                                                                                                                                                              | —                     | accepted |
| btn       | accessibility  | A toggle announces the button role and its pressed state, rather than a checkbox role.                                                                                                                                            | button.click.toggle   | accepted |
| btn       | accessibility  | A toggle announces the button role and its pressed state, rather than a checkbox role.                                                                                                                                            | button.pressed.click  | accepted |
| btn       | accessibility  | A disabled anchor carries disabled, aria-disabled="true", tabindex="-1", and role="button"; pointer activation is refused.                                                                                                        | button.disabled.click | accepted |
| btn       | keyboard       | Space activates the focused toggle button.                                                                                                                                                                                        | button.keyboard.space | accepted |
| btn       | keyboard       | Enter activates the focused toggle button.                                                                                                                                                                                        | button.keyboard.enter | accepted |
| btn       | variable       | The --bs-btn-* vocabulary includes padding, font, color, background, border, shadow, disabled, and active state properties.                                                                                                       | —                     | accepted |
| btn       | identity       | Cross-cutting engine: `VERSION` `'5.3.8'`; `DATA_KEY` `bs.${NAME}`; `EVENT_KEY` `.${DATA_KEY}`; `eventName(name)` returns `${name}${EVENT_KEY}`                                                                                   | —                     | accepted |
| btn       | option         | Cross-cutting engine: `Default`/`DefaultType` inherited empty from `Config` unless a component overrides                                                                                                                          | —                     | accepted |
| btn       | attribute      | Cross-cutting engine: `data-bs-config` JSON merges with `data-bs-*` attributes read by `Manipulator`; config object wins last                                                                                                     | —                     | accepted |
| btn       | method         | Cross-cutting engine: `constructor(element, config)` no-op when `getElement(element)` is falsy; `dispose()`; `_queueCallback` through `executeAfterTransition`                                                                    | —                     | accepted |
| btn       | method         | Cross-cutting engine: static `getInstance`, static `getOrCreateInstance(element, config = {})`, static `VERSION`                                                                                                                  | —                     | accepted |
| btn       | initialization | Cross-cutting engine: `Data.set(this._element, DATA_KEY, this)` on construction                                                                                                                                                   | —                     | accepted |
| btn       | method         | Cross-cutting engine: All API methods are asynchronous, return to the caller before the transition ends, and a method call mid-transition is ignored                                                                              | —                     | accepted |
| btn       | method         | Cross-cutting engine: `dispose()` must not follow `hide()` immediately; wait for the completion event                                                                                                                             | —                     | accepted |
| btn       | event          | Cross-cutting engine: Every plugin fires paired infinitive/past-participle events; `EventHandler.trigger` builds `new Event(event, { bubbles, cancelable: true })` and hydrates the payload                                       | —                     | accepted |
| btn       | event          | Cross-cutting engine: Infinitive events are cancelable through `event.preventDefault()`; returning `false` from a handler also cancels                                                                                            | —                     | accepted |
| btn       | option         | Cross-cutting engine: `Config._mergeConfigObj`: `Default`, then `data-bs-config` JSON, then `getDataAttributes`, then the `config` object; `_typeCheckConfig` type-checks against `DefaultType`                                   | —                     | accepted |
| btn       | attribute      | Cross-cutting engine: `Manipulator.getDataAttributes` reads every `dataset` key starting `bs` except `bsConfig`, kebab-cased through `data-bs-*`                                                                                  | —                     | accepted |
| btn       | method         | Cross-cutting engine: `SelectorEngine.getSelector` reads `data-bs-target` else `href`; `find`, `findOne`, `children`, `parents`, `prev`, `next`, `focusableChildren`, `getElementFromSelector`, `getMultipleElementsFromSelector` | —                     | accepted |
| btn       | method         | Cross-cutting engine: `Data.set`/`get`/`remove`; one instance per element, a second key logs an error and returns                                                                                                                 | —                     | accepted |
| btn       | attribute      | Cross-cutting engine: `enableDismissTrigger(component, method = 'hide')` binds document `click.dismiss${EVENT_KEY}` on `[data-bs-dismiss="${NAME}"]`                                                                              | —                     | accepted |
| btn       | transition     | Cross-cutting engine: `TRANSITION_END` emulation: listens `transitionend`, emulates after `getTransitionDurationFromElement` plus `5` ms padding through `executeAfterTransition`                                                 | —                     | accepted |
| btn       | accessibility  | Cross-cutting engine: Sanitizer allowlist and `sanitizeFn` override on Tooltip/Popover content                                                                                                                                    | —                     | accepted |
| btn       | attribute      | Cross-cutting engine: Native `querySelector`/`querySelectorAll`; a CSS special character in a selector must be escaped                                                                                                            | —                     | accepted |
| btn       | option         | util/config.js: Base `Config` class; `Default: {}`, `DefaultType: {}`; `NAME` getter throws; extended by `BaseComponent`, `Backdrop`, `FocusTrap`, `Swipe`, `TemplateFactory`                                                     | —                     | accepted |
| btn       | method         | util/index.js: `getUID`, `getElement`, `isElement`, `isVisible`, `isDisabled`, `isRTL`, `toType`, `noop`, `parseSelector`, `reflow`, `execute`, `findShadowRoot`, `getNextActiveElement` exported as shared utilities             | —                     | accepted |
| btn       | initialization | util/index.js: `getjQuery` skipped when `document.body` carries `data-bs-no-jquery`; `defineJQueryPlugin` registers `$.fn[NAME]` after `onDOMContentLoaded`                                                                       | —                     | accepted |

An accepted row records scope; a named Proof step obliges the official recording to agree with the
row. A shipped row also accepts implementation responsibility; when every row for a component is
shipped, the built cascade must carry its official selector and custom-property sets, and the
conformance component list must include its key. A dash marks a source or engine obligation that
the Button interaction recording cannot drive. Transition, dismissal, sanitizer, and selector
engine rows record shared engine scope; they do not claim that Button dispatches transition events.
The jQuery rows retain the source inventory while the exclusion that follows limits the claim.

The compatibility claim excludes contextual Reboot selectors that combine bare tags: nested
ordered and unordered lists, code inside preformatted text or links, nested keyboard tags, and the
sibling after a legend. It also excludes the jQuery interface and plugin registration, the
window.bootstrap global and UMD namespace, and Bootstrap's Sass variables, maps, and mixins as a
source API. Popper pass-through positioning options remain accepted wire keys with platform
anchoring as an accepted difference. The sanitizer allowlist and sanitizer overrides remain in
scope for the overlay unit.

## Showcase

The private application renders the Veneer heading, the Dark mode button, and a Showcase region.
Its button drives the controller and announces the selected mode. The application barrel is a
workspace implementation surface and is outside this guide's published API tables.

Scaffold mandates the Vue toolchain for an `app/browser` environment, and this shell declares no
component in it: the shell is framework-free by design, so the showcase drives the published
cascade and the published engine with no framework between them and what renders.

The styles entry declares the cascade order `theme, reset, base, elements, components, utilities`,
every `--vn-*` token, every `--bs-*` root alias Bootstrap 5.3.8 declares, and the document and body
baseline. It ships no component treatments. The document baseline also declares
`interpolate-size: allow-keywords`, and `tests/src/styles/elements/html.test.ts` reads it there.
That proves the declaration reaches the document; what it interpolates is proved by the first unit
that animates a keyword length. § Tokens gives each token's value and
source.

## Tests

The core proof reads the registry's export set, its freeze, and its path law; see
[token registry](../tests/src/core/index.test.ts).
The browser proofs cover the controller and the guard; see
[controller behavior](../tests/src/browser/ColorMode.test.ts) and
[mode validation](../tests/src/browser/validators.test.ts).
The application proofs drive the shell through its interface; see
[showcase mounting and destruction](../tests/app/browser/Showcase.test.ts) and
[showcase journeys](../tests/app/browser/integration.test.ts).
The style proofs bind the cascade to the registry and to the calibration; see
[token parity and values](../tests/src/styles/tokens.test.ts),
[theme scopes](../tests/src/styles/theme.test.ts),
[declaration mixins](../tests/src/styles/mixins.test.ts),
[layer order and direction neutrality](../tests/src/styles/index.test.ts),
[the document baseline](../tests/src/styles/elements/html.test.ts),
[the body baseline](../tests/src/styles/elements/body.test.ts), and
[the customization recipe](../tests/src/styles/integration.test.ts).

The conformance proofs pin the official release and its artifact digests, reject runtime boundary
escapes, check shipped CSS vocabulary, compare each live Button step with its fixture, and
cross-check the compatibility rows; see [Bootstrap conformance](../tests/conformance.test.ts).
The helper proofs read compatibility tables, built CSS, and the pinned inventory; see
[conformance readers and recorder](../tests/setupConformance.test.ts).

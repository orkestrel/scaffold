# U3-design report, subjective lane (planner, native Opus 5, 2026-09-20, 1079 s)

# Question

What is the complete `--vn-*` token contract, its `--bs-*` alias scope, its dark retune, its `TOKEN_NAMES` shape, and the tests that bind them, such that U3 lands in one unit?

# Proposal

## 0. The four laws the contract runs on

Every row later follows from these; an implementer who holds them can derive a row I omitted.

1. **Path law.** A registry path is its custom-property name: `TOKEN_NAMES.color.danger.subtle` is `'--vn-color-danger-subtle'`. Group and leaf names join with `-` under the `--vn-` prefix, with no exception. This makes the map predictable without documentation, and it gives `constants.test.ts` a second mechanism to check the authored literals against.
2. **Value-source law.** A token takes, in order: the `calibration.md` row that measures it; where no row measures it, the value Bootstrap 5.3.8 declares, recorded as retained with the reason; where neither exists, the token is not declared in U3.
3. **Derivation law.** A value Bootstrap itself derives is authored as that derivation over a `--vn-*` token, never as a repeated literal. `color-mix(in srgb, …)` reproduces Sass `mix()` channel for channel: `color-mix(in srgb, var(--vn-palette-white-base) 80%, #0d6efd)` gives `207, 226, 255` and Bootstrap's `--bs-primary-bg-subtle` is `#cfe2ff` (`inventory.json:123057`). Every tier, link, code, highlight, tertiary-surface, and form-feedback value in this contract was checked that way.
4. **Substitution law.** A custom property's computed value is its specified value with variables already substituted, so an alias declared at `:root` freezes against `:root`. Every token whose value depends on a theme-varying token, and every `--bs-*` alias pointing at one, is re-declared inside each theme block. This is why Bootstrap declares its full light set twice, at `:root` (`inventory.json:1478`) and at `[data-bs-theme=light]` (`inventory.json:1958`), and Veneer does the same.

## 1. Name map

### Structure

`_tokens.scss` carries, inside `@layer theme`: the layer statement; the `@property` registrations; one `:root` rule for canonical `--vn-*` names; one `:root` rule for the `--bs-*` alias pass. `_theme.scss` carries, in the same layer, `[data-bs-theme='light']` and `[data-bs-theme='dark']`. Both partials `@use '../mixins' as *`; `index.scss` loads `tokens` and `theme` only.

The current `_tokens.scss:3` `:root` is unlayered. Unlayered declarations beat every layer, so an unlayered `:root` would beat a layered theme block and dark islands would fail. Wrap both partials in `@layer theme`, which also leaves a consumer's own unlayered `:root { --vn-…: … }` override winning — the behaviour the customization recipe documents.

### Factors

These register with `@property` as `<number>`, `inherits: true`, `initial-value: 1`. Registration is safe here and unsafe for colors: `tokens.md:124` records that registering a resolved color token breaks nested `[data-bs-theme]` chains, and a number that never retunes carries no such chain. Registration is also what makes an invalid factor fall back deterministically, which `tokens.test.ts` reads.

| `--vn-*` | Calibration trace | Value | `--bs-*` |
| --- | --- | --- | --- |
| `--vn-factor-density` | specimens read at Elements' defaults | `1` | none |
| `--vn-factor-radius` | same | `1` | none |
| `--vn-factor-elevation` | same | `1` | none |
| `--vn-factor-motion` | same | `1` | none |

### Palette and gray ramp

No Elements specimen measures a hue other than the primary, so every value here is Bootstrap's, retained.

| `--vn-*` | Value | `--bs-*` |
| --- | --- | --- |
| `--vn-palette-blue`, `-indigo`, `-purple`, `-pink`, `-red`, `-orange`, `-yellow`, `-green`, `-teal`, `-cyan` | `#0d6efd`, `#6610f2`, `#6f42c1`, `#d63384`, `#dc3545`, `#fd7e14`, `#ffc107`, `#198754`, `#20c997`, `#0dcaf0` | `--bs-blue` … `--bs-cyan` |
| `--vn-palette-black-base`, `--vn-palette-black-rgb` | `#000`, `0, 0, 0` | `--bs-black`, `--bs-black-rgb` |
| `--vn-palette-white-base`, `--vn-palette-white-rgb` | `#fff`, `255, 255, 255` | `--bs-white`, `--bs-white-rgb` |
| `--vn-gray-100` … `--vn-gray-900` | `#f8f9fa`, `#e9ecef`, `#dee2e6`, `#ced4da`, `#adb5bd`, `#6c757d`, `#495057`, `#343a40`, `#212529` | `--bs-gray-100` … `--bs-gray-900` |

`--bs-gray` takes `var(--vn-gray-600)` and `--bs-gray-dark` takes `var(--vn-gray-800)`; both equal Bootstrap's own values, so no `--vn-*` token is added for them.

### Semantic color roles

Each role carries the tiers `base`, `rgb`, `subtle`, `emphasis`, `border`. One `palette-each` pass over a Sass role map emits all of them.

| Role | `base` | `rgb` | `--bs-*` per tier |
| --- | --- | --- | --- |
| `primary` | light `oklch(0.48 0.255 264)`, dark `oklch(0.7 0.15 233)` — Colour row "primary fill and border" | **open reading**, see Unknowns | `--bs-primary`, `--bs-primary-rgb`, `--bs-primary-bg-subtle`, `--bs-primary-text-emphasis`, `--bs-primary-border-subtle` |
| `secondary` | `var(--vn-gray-600)` | `108, 117, 125` | same shape |
| `success` | `var(--vn-palette-green)` | `25, 135, 84` | same shape |
| `info` | `var(--vn-palette-cyan)` | `13, 202, 240` | same shape |
| `warning` | `var(--vn-palette-yellow)` | `255, 193, 7` | same shape |
| `danger` | `var(--vn-palette-red)` | `220, 53, 69` | same shape |
| `light` | `var(--vn-gray-100)` | `248, 249, 250` | same shape |
| `dark` | `var(--vn-gray-900)` | `33, 37, 41` | same shape |

Tier expressions, authored once in `palette-each` and emitted per mode:

| Tier | Light | Dark |
| --- | --- | --- |
| `subtle` | `color-mix(in srgb, var(--vn-palette-white-base) 80%, <base>)` | `color-mix(in srgb, var(--vn-palette-black-base) 80%, <base>)` |
| `emphasis` | `color-mix(in srgb, var(--vn-palette-black-base) 60%, <base>)` | `color-mix(in srgb, var(--vn-palette-white-base) 40%, <base>)` |
| `border` | `color-mix(in srgb, var(--vn-palette-white-base) 60%, <base>)` | `color-mix(in srgb, var(--vn-palette-black-base) 40%, <base>)` |

These reproduce every Bootstrap light and dark tier value in `inventory.json:123049-123072` and `:123153-123176` exactly, and they carry Veneer's primary through the primary's own tiers, which Bootstrap's literals cannot.

### Text, surface, link

| `--vn-*` | Calibration trace | Light | Dark | `--bs-*` |
| --- | --- | --- | --- | --- |
| `--vn-text-body-base` | Colour row "text" | `oklch(0.208 0.042 265.755)` | `oklch(0.929 0.013 255.508)` | `--bs-body-color` |
| `--vn-text-body-rgb` | — | **open** | **open** | `--bs-body-color-rgb`, `--bs-secondary-color-rgb`, `--bs-tertiary-color-rgb` |
| `--vn-text-emphasis-base` | Colour row "dialog text" | `var(--vn-palette-black-base)` | `var(--vn-palette-white-base)` | `--bs-emphasis-color` |
| `--vn-text-emphasis-rgb` | same | `var(--vn-palette-black-rgb)` | `var(--vn-palette-white-rgb)` | `--bs-emphasis-color-rgb` |
| `--vn-text-secondary-base` | derived | `color-mix(in srgb, var(--vn-text-body-base) 75%, transparent)` | same expression | `--bs-secondary-color` |
| `--vn-text-tertiary-base` | derived | same at `50%` | same expression | `--bs-tertiary-color` |
| `--vn-text-heading` | Type table: headings share the body colour | `inherit` | `inherit` | `--bs-heading-color` (aliased with an `inherit` fallback) |
| `--vn-text-code` | — | `var(--vn-palette-pink)` | `color-mix(in srgb, var(--vn-palette-white-base) 40%, var(--vn-palette-pink))` | `--bs-code-color` |
| `--vn-text-highlight` | — | `var(--vn-text-body-base)` | same | `--bs-highlight-color` |
| `--vn-surface-body-base` | **open**, proposed from Colour row "dialog surface" | `var(--vn-palette-white-base)` | `rgb(18, 18, 18)` | `--bs-body-bg` |
| `--vn-surface-body-rgb` | same | `var(--vn-palette-white-rgb)` | `18, 18, 18` | `--bs-body-bg-rgb` |
| `--vn-surface-secondary-base` / `-rgb` | — | `var(--vn-gray-200)` / `233, 236, 239` | `var(--vn-gray-800)` / `52, 58, 64` | `--bs-secondary-bg`, `--bs-secondary-bg-rgb` |
| `--vn-surface-tertiary-base` / `-rgb` | — | `var(--vn-gray-100)` / `248, 249, 250` | `color-mix(in srgb, var(--vn-gray-800) 50%, var(--vn-gray-900))` / `43, 48, 53` | `--bs-tertiary-bg`, `--bs-tertiary-bg-rgb` |
| `--vn-surface-highlight` | — | `color-mix(in srgb, var(--vn-palette-white-base) 80%, var(--vn-color-warning-base))` | `color-mix(in srgb, var(--vn-palette-black-base) 60%, var(--vn-color-warning-base))` | `--bs-highlight-bg` |
| `--vn-surface-gradient` | — | `linear-gradient(180deg, color-mix(in srgb, var(--vn-palette-white-base) 15%, transparent), transparent)` | same | `--bs-gradient` |
| `--vn-link-base` | derived from the primary | `var(--vn-color-primary-base)` | `color-mix(in srgb, var(--vn-palette-white-base) 40%, var(--vn-color-primary-base))` | `--bs-link-color` |
| `--vn-link-hover-base` | derived | `color-mix(in srgb, var(--vn-palette-black-base) 20%, var(--vn-link-base))` | `color-mix(in srgb, var(--vn-palette-white-base) 20%, var(--vn-link-base))` | `--bs-link-hover-color` |
| `--vn-link-rgb`, `--vn-link-hover-rgb` | — | **open** | **open** | `--bs-link-color-rgb`, `--bs-link-hover-color-rgb` |
| `--vn-link-decoration` | — | `underline` | `underline` | `--bs-link-decoration` |

Elements' popover, drawer, and hint surfaces are not mapped onto Bootstrap's body tiers. They are component surfaces with different jobs, and mapping the near-white popover surface onto `--bs-secondary-bg` would erase that tier's contrast. They land with the components that paint them.

### Type, space, border, radius, shadow, motion, focus, form, breakpoint, stack

| `--vn-*` | Calibration trace | Value | `--bs-*` |
| --- | --- | --- | --- |
| `--vn-font-sans` | Type table, first family `system-ui` | Bootstrap's sans stack, whose first family is `system-ui` | `--bs-font-sans-serif`, `--bs-body-font-family` |
| `--vn-font-mono` | — | Bootstrap's mono stack | `--bs-font-monospace` |
| `--vn-size-1` … `--vn-size-8` | Type table: 12, 14, 16, 18, 20, 24, 30, 36px | `0.75rem`, `0.875rem`, `1rem`, `1.125rem`, `1.25rem`, `1.5rem`, `1.875rem`, `2.25rem` | `--bs-body-font-size` takes `var(--vn-size-2)` |
| `--vn-line-body`, `--vn-line-heading` | Type note: 1.5 body, 1.2 heading | `1.5`, `1.2` | `--bs-body-line-height` takes `var(--vn-line-body)` |
| `--vn-weight-body`, `--vn-weight-heading` | Type table: 400, 600 | `400`, `600` | `--bs-body-font-weight` takes `var(--vn-weight-body)` |
| `--vn-space-1` … `--vn-space-8` | Space table: 4, 6, 8, 10, 12, 14, 16px paddings | `calc(<n> * 0.125rem * var(--vn-factor-density))`, giving 2px through 16px | none |
| `--vn-border-width` | Space table: 1px on every bordered specimen | `1px` | `--bs-border-width` |
| `--vn-border-style` | — | `solid` | `--bs-border-style` |
| `--vn-border-color` | Colour row "border" | `oklch(0.869 0.022 252.894)` / dark `oklch(0.4 0.022 256)` | `--bs-border-color` |
| `--vn-border-translucent` | — | `color-mix(in srgb, var(--vn-palette-black-base) 17.5%, transparent)` / dark white at `15%` | `--bs-border-color-translucent` |
| `--vn-radius-base`, `-sm`, `-lg` | Space table: 6, 4, 8px | `calc(0.375rem * var(--vn-factor-radius))`, `calc(0.25rem * …)`, `calc(0.5rem * …)` | `--bs-border-radius`, `-sm`, `-lg` |
| `--vn-radius-xl`, `-xxl`, `-pill` | — | `calc(1rem * …)`, `calc(2rem * …)`, `50rem` | `--bs-border-radius-xl`, `-xxl`, `-2xl`, `-pill` |
| `--vn-shadow-1`, `-2`, `-3` | Elevation table, hint/drawer, popover, dialog | the measured pairs, each offset and blur wrapped in `calc(<px> * var(--vn-factor-elevation))` | `--bs-box-shadow-sm`, `--bs-box-shadow`, `--bs-box-shadow-lg` |
| `--vn-shadow-inset` | — | `inset 0 1px 2px rgba(0, 0, 0, 0.075)` | `--bs-box-shadow-inset` |
| `--vn-motion-feedback`, `--vn-motion-panel` | Motion table: 0.15s, 0.25s | `calc(150ms * var(--vn-factor-motion))`, `calc(250ms * var(--vn-factor-motion))` | none |
| `--vn-ease-standard`, `-out`, `-panel` | Motion table | `ease`, `ease-out`, `cubic-bezier(0.32, 0.72, 0, 1)` | none |
| `--vn-focus-width`, `--vn-focus-opacity`, `--vn-focus-color` | Interaction-states row "focus-visible" | `3px`, `0.45`, `color-mix(in oklab, var(--vn-color-primary-base) 45%, transparent)` | `--bs-focus-ring-width`, `-opacity`, `-color` |
| `--vn-form-valid`, `--vn-form-invalid` | — | light `var(--vn-color-success-base)` / `var(--vn-color-danger-base)`; dark `var(--vn-color-success-emphasis)` / `var(--vn-color-danger-emphasis)` | `--bs-form-valid-color`, `--bs-form-valid-border-color`, `--bs-form-invalid-color`, `--bs-form-invalid-border-color` |
| `--vn-breakpoint-xs` … `-xxl` | — | `0`, `576px`, `768px`, `992px`, `1200px`, `1400px`, emitted from the `$breakpoints` Sass map that `breakpoint-down` reads | `--bs-breakpoint-xs` … `-xxl` |
| `--vn-stack-dropdown`, `-sticky`, `-fixed`, `-offcanvas-backdrop`, `-offcanvas-base`, `-modal-backdrop`, `-modal-base`, `-popover`, `-tooltip`, `-toast` | Bootstrap's component rules, `inventory.json:63403`, `:89039`, `:89159` and siblings | `1000`, `1020`, `1030`, `1040`, `1045`, `1050`, `1055`, `1070`, `1080`, `1090` | none |

The `--vn-focus-color` mix runs in oklab because the calibration reads the ring as `oklab(0.48 -0.0266547 -0.253603 / 0.45)`; a mix with `transparent` in oklab serializes in exactly that form. Percentages stay literal, so the ring needs no `calc()` inside `color-mix()`, which `instruments.md` has not measured.

### `--bs-*` root variables that keep Bootstrap's own value

These four sit in the root list because Bootstrap retunes them by mode, and each paints a component U3 does not own. Each is declared in the compatibility scope with Bootstrap's own value, in both modes, and its canonical token lands with the component that paints it. A data URI cannot consume a custom property, so the forward path is a `mask-image` treatment in the owning unit, the shape `tokens.md:19` records from Mailbox.

| Variable | Light | Dark |
| --- | --- | --- |
| `--bs-btn-close-filter` | ` ` | `invert(1) grayscale(100%) brightness(200%)` |
| `--bs-carousel-indicator-active-bg` | `#fff` | `#000` |
| `--bs-carousel-caption-color` | `#fff` | `#000` |
| `--bs-carousel-control-icon-filter` | ` ` | `invert(1) grayscale(100)` |

The dark-only rows `--bs-form-select-bg-img`, `--bs-form-switch-bg`, `--bs-navbar-toggler-icon-bg`, `--bs-accordion-btn-icon`, and `--bs-accordion-btn-active-icon` take Bootstrap's own data URIs in the dark block, for the same reason.

## 2. Dark retune

`_theme.scss` declares two attribute blocks and nothing else:

```scss
[data-bs-theme='light'] {
	color-scheme: light;
	@include theme-tokens(tokens.$light);
}

[data-bs-theme='dark'] {
	color-scheme: dark;
	@include theme-tokens(tokens.$dark);
}
```

- **Nesting works because the light block exists.** A bare `[data-bs-theme='dark']` block alone cannot return a nested light island to light, because `:root`'s declarations do not reapply on a descendant. Both blocks are plain attribute selectors with no `:root` qualifier, so any element is an island, and the island's own declarations inherit to its subtree until a deeper island re-declares them.
- **`:root` carries the light closure too**, through the same mixin, so a document with no attribute renders light. `COLOR_MODE_ATTRIBUTE` is `data-bs-theme` (`src/browser/constants.ts:2`) and `ColorMode.set('light')` removes the attribute (`src/browser/color-mode/ColorMode.ts:37`), so the engine's light state is the `:root` state and the light block serves hand-written nesting.
- **The mixin emits the whole theme-dependent closure**: every measured token, every derived token whose expression names a measured token, and every `--bs-*` alias pointing into that set. A derived token's expression is authored once and re-substituted inside each block, so derivation removes duplicated values without breaking the substitution law. Aliases outside the closure stay at `:root` alone, which keeps a consumer's `:root` override of `--bs-border-radius` from being clobbered inside an island.
- **`color-scheme` lives only in the theme layer.** The plan's `_body.scss` row also names it; an `elements/_body.scss` declaration would win over the theme block on layer order and freeze the form controls and scrollbars in one scheme. `_body.scss` declares font, canvas, and text colours and leaves `color-scheme` to `_theme.scss`.
- **No `prefers-color-scheme` block.** The attribute is the switch; a media block would fight the engine.

Tokens that vary: `color.{role}.{subtle,emphasis,border}` for every role, `color.primary.{base,rgb}`, `text.{body,emphasis}.{base,rgb}`, `text.{code,highlight}`, `surface.{body,secondary,tertiary}.{base,rgb}`, `surface.highlight`, `link.{base,rgb}`, `link.hover.{base,rgb}`, `border.{color,translucent}`, `form.{valid,invalid}`. Tokens that follow by expression, and so need no mode value: `text.{secondary,tertiary}.base`, `focus.color`. Everything else is mode-independent.

## 3. TypeScript shape

`src/core/constants.ts` is the sole home of the name literals; `src/core/types.ts` projects them. That direction is what keeps the union exhaustive with no second copy: an annotated constant plus a hand-written union would write every name twice and let the two drift silently.

```ts
// src/core/types.ts
import type { TOKEN_NAMES } from './constants.js'

/**
 * Reduces a group of custom-property names to the union of the names at its leaves.
 *
 * @typeParam TNode - A custom-property name, or a group whose members are names or groups.
 */
export type TokenLeaf<TNode> = TNode extends string
	? TNode
	: { readonly [TKey in keyof TNode]: TokenLeaf<TNode[TKey]> }[keyof TNode]

/** Describes the grouped tree of custom-property names the token registry carries. */
export type TokenMap = typeof TOKEN_NAMES

/** Names one canonical custom property the shipped cascade declares. */
export type TokenName = TokenLeaf<TokenMap>
```

```ts
// src/core/constants.ts
/**
 * Names every canonical custom property the shipped cascade declares, grouped by the surface each
 * one paints or the scale it controls.
 *
 * @remarks
 * A path is its name: each group and leaf joins with `-` under the `--vn-` prefix. The registry
 * holds names alone; `src/styles/_tokens.scss` holds the values.
 *
 * @example
 * ```ts
 * readRootToken(TOKEN_NAMES.color.primary.base) // '--vn-color-primary-base'
 * ```
 */
export const TOKEN_NAMES = Object.freeze({
	factor: Object.freeze({
		density: '--vn-factor-density',
		radius: '--vn-factor-radius',
		elevation: '--vn-factor-elevation',
		motion: '--vn-factor-motion',
	} as const),
	color: Object.freeze({
		primary: Object.freeze({
			base: '--vn-color-primary-base',
			rgb: '--vn-color-primary-rgb',
			subtle: '--vn-color-primary-subtle',
			emphasis: '--vn-color-primary-emphasis',
			border: '--vn-color-primary-border',
		} as const),
		// the remaining roles take the same tier shape
	} as const),
	// palette, gray, text, surface, link, border, radius, space, font, size, line, weight,
	// shadow, motion, ease, focus, form, breakpoint, stack
} as const)
```

- Every object literal in the tree is frozen, per the kind-purity freeze obligation; `as const` sits on each literal, which the assertion ban permits and which the vendored `prefer-as-const` rule expects.
- `TOKEN_NAMES.color.primary.subtle` types as its own literal, so a consumer keeps the exact name and `TokenName` accepts it.
- `TokenName` is exhaustive by construction. The runtime proof of exhaustiveness against the cascade is `tokens.test.ts`, not the type.
- `TokenMap`, `TokenName`, and `TokenLeaf` are free across the hosted guides; `TokenScope` and `TokenUsage` belong to `@orkestrel/budget` (`guides/budget.md:101`) and are not used.
- `src/core/index.ts` gains `export * from './types.js'` and `export * from './constants.js'`. `tests/src/core/index.test.ts:6` asserts an empty export set today, so U3 owns that file and restates the set.

## 4. Departures

Each row is recorded in `guides/tokens.md` beside its Bootstrap value.

| Token | Elements value taken | Bootstrap value recorded |
| --- | --- | --- |
| `--vn-size-2`, through `--bs-body-font-size` | `0.875rem` (14px) | `1rem` |
| `--vn-weight-heading` | `600` | `500` |
| `--vn-color-primary-base` | `oklch(0.48 0.255 264)` / dark `oklch(0.7 0.15 233)` | `#0d6efd` in both modes, equal to `--bs-blue` |
| `--vn-text-body-base` | `oklch(0.208 0.042 265.755)` / `oklch(0.929 0.013 255.508)` | `#212529` / `#dee2e6` |
| `--vn-border-color` | `oklch(0.869 0.022 252.894)` / `oklch(0.4 0.022 256)` | `#dee2e6` / `#495057` |
| `--vn-shadow-1`, `-2`, `-3` | Elements' hint, popover, and dialog pairs | `0 .125rem .25rem rgba(0,0,0,.075)`, `0 .5rem 1rem rgba(0,0,0,.15)`, `0 1rem 3rem rgba(0,0,0,.175)` |
| `--vn-focus-width`, `--vn-focus-opacity` | `3px`, `0.45` | `0.25rem`, `0.25` |
| `--vn-link-base`, `--vn-link-hover-base` | follow Veneer's primary through Bootstrap's own tint and shade steps | `#0d6efd` / `#0a58ca`, dark `#6ea8fe` / `#8bb9fe` |
| `--vn-surface-body-base` dark | `rgb(18, 18, 18)`, proposed from the dialog-surface row and open | `#212529` |
| `--vn-radius-base`, `-sm`, `-lg` | 6, 4, 8px | the same; recorded as agreement, not departure |
| type scale steps above the body size | 36, 30, 24, 20, 18, 16px | 2.5rem, 2rem, 1.75rem, 1.5rem, 1.25rem, 1rem; Bootstrap ships these in Sass, so no alias carries the departure |

Two calibration departures bind U3 directly. Elements' `::details-content` still interpolates under emulated reduced motion; Veneer's `transition` mixin emits the `prefers-reduced-motion` pair for every transition it writes, and `mixins.test.ts` reads the collapse. Elements' popover entry snaps and only its exit fades; that belongs to the overlay units, recorded as an Elements decision.

## 5. Tests

All styles tests sit in the `src:styles` project and are named for the partial they prove. Every value assertion reads a consuming property on a mounted element: `tokens.md:122` records that `getComputedStyle` substitutes a custom property without evaluating its `calc()`, so `readRootToken` proves a name's presence and its declared text, never a used length.

| Test | Assertion | Installed helper | Planted control | Browser reading |
| --- | --- | --- | --- | --- |
| `tokens.test.ts` — parity | The `--vn-` partition of every `:root` rule equals `TOKEN_NAMES`' leaves, both directions; the `--bs-` partition equals the official root list; a name in neither partition fails | `readRules` over the LTR cascade, then again with the RTL text appended as a `<style>` element and removed after the read | a `--vn-ghost` declaration added to `_tokens.scss`; a mapped name deleted from `_tokens.scss`; `--vn-border-width` relocated into the light block alone | each control red, then green on restore, on managed Chromium and Edge |
| `tokens.test.ts` — values | Body resolves `font-size` `14px`, `line-height` `21px`, first `font-family` `system-ui`, `color` matching `oklch(0.208 0.042 265.755)`; a specimen carrying `border-radius: var(--bs-border-radius)` resolves `6px`; one carrying `box-shadow: var(--bs-box-shadow-lg)` resolves the dialog pair | `readPixels`, `readStyle`, `parseCSSColor`, `matchesColor`, `mount`, `build` | a specimen carrying an undeclared `--vn-*` name resolves the property's initial value | the calibration strings, identical on both browsers per the record's own note |
| `tokens.test.ts` — island and geometry | A mounted island setting `--vn-factor-density: 2` doubles the used `padding` of a descendant carrying `padding: var(--vn-space-3)`, and an unchanged neighbour outside the island keeps the base reading | `mount`, `build`, `readPixels` | the neighbour is the control; a leaked override fails it | `6px` outside, `12px` inside |
| `tokens.test.ts` — invalid and cycle | `--vn-factor-density: banana` on an island falls back to the registered `initial-value`, so the padding holds; `--vn-space-3: banana` makes the consumer invalid at computed-value time and the padding reads `0px`; a two-token cycle between island-local `--probe-a` and `--probe-b` gives the consumer its guaranteed-invalid result | `mount`, `readPixels`, `readStyle` | the registered and unregistered cases are each other's control, and they must differ | `6px`, `0px`, and the initial value |
| `tokens.test.ts` — nesting | A light island inside a dark island resolves the light body colour on its descendant, and the dark island's own descendant resolves the dark one | `mount`, `build`, `readStyle`, `matchesColor` | removing the `[data-bs-theme='light']` block reddens the inner reading | both calibrated colours in one mounted tree |
| `theme.test.ts` | Driving `data-bs-theme` on the document element retunes `color`, `background-color`, `border-color`, and the focus ring colour of mounted consumers, and `color-scheme` follows; the attribute is restored after each case | `readStyle`, `readToken`, `mount`, `build` | a consumer bound to a mode-independent token must not move | the dark Colour rows, and `color-scheme` reading `dark` |
| `mixins.test.ts` | A mounted specimen carrying the `transition` mixin's output resolves `transition-duration` `0.15s` and `transition-timing-function` `ease`, and resolves `0s` under emulated reduced motion, restoring afterwards | `readStyle`; `cdp()` with `Emulation.setEmulatedMedia`, the exact call `instruments.md:14` proved, until U6's helper lands | the same specimen read before emulation | `0.15s`, then `0s`, then `0.15s` |
| `index.test.ts` | Extends the landed layer-order proof: no rule in the `elements` layer carries a selector combining two bare tags outside the HTML-mandated pairings | `readRules` | a planted `h1 + p` rule in an elements partial | the planted rule rejected, then green on removal |
| `elements/html.test.ts`, `elements/body.test.ts` | `interpolate-size` resolves `allow-keywords` on the document element; the body resolves the canvas and text colours, the sans family, and the size, line height, and weight | `readStyle`, `readPixels` | a detached element resolves none of them | the Type and Colour rows |
| `integration.test.ts` | The `guides/tokens.md` customization recipe, transcribed byte for byte, produces the values the guide claims | `mount`, `build`, `readStyle`, `readPixels` | the recipe's own before-and-after readings | the guide's stated results |
| `tests/src/core/constants.test.ts` | Every group and the map are frozen; every leaf matches `--vn-` followed by the joined path, derived from the path rather than restated; a dynamic import registers no `globalThis` listener | `createRecorder` from `@orkestrel/test`, installed before the dynamic import | a recorder that records nothing proves nothing, so the test also records a deliberate listener registration and reads the recorder non-empty | the Node `src:core` project, where a DOM touch fails the import outright |

The official `--bs-*` root list the parity test compares against is an exported constant in `tests/setupStyles.ts`, authored from `inventory.json`'s `root` key against the pinned tarball identity the plan's standing conditions record. U4b's Node conformance test then proves that constant against the installed `bootstrap.css` live, which closes the oracle without U3 importing a foreign specifier into `tests/**`.

## 6. Risks

- **Open readings U3 needs.** The primary's sRGB triplet in each mode, for `--vn-color-primary-rgb` and the link triplets; the smallest instrument is a mounted span carrying `background-color: color-mix(in srgb, var(--vn-color-primary-base) 100%, transparent 0%)` read with `readStyle`, which the calibration proves serializes as `color(srgb …)`. The body canvas colour in each mode; the smallest instrument is a re-run of `calibration.mjs` reading `background-color` on `html` and `body` per `data-mode`. Until both land, those tokens carry the proposed values and the guide names them as open.
- **Hover and active fill tints are deferred to U7.** The calibration assigns them to U3, and the record does not contain the primary's sRGB base, so the mixes cannot be solved here; their first consumer is Button, and their proof needs an interactive specimen U3 does not own. This is a deliberate move of a named assignment and the Orchestrator rules it.
- **`color-mix()` serialization.** A mixed value resolves as `color(srgb …)` rather than as Bootstrap's hex, so every colour assertion compares through `parseCSSColor` or `matchesColor`, never as a string.
- **`calc()` inside `box-shadow` under the elevation factor.** The factor is registered, so the calc must collapse at computed-value time and the resolved string must equal the calibration row. The shadow assertion is where that is read; if it does not collapse, the factor moves off `box-shadow` and onto the component partials that compose shadows.
- **`--vn-text-heading: inherit`** reads as an empty string through `readRootToken`, because a CSS-wide keyword on a custom property at `:root` inherits from nothing. Its alias carries an `inherit` fallback and its proof is a heading's resolved `color`, not a token read.
- **Rules this proposal cannot satisfy as written.** `_tokens.scss` declares literal colours, which `styles.md` § Prohibitions bans; a token file must contain literals or nothing can be defined, and every other partial consumes `var()` or `color-mix()`. `names.md` § Rejected naming bans abbreviations, and `sm`, `lg`, `xl`, `xxl` are kept for the radius and breakpoint scales because a consumer predicts `--bs-border-radius-sm` from `--vn-radius-sm` and predicts nothing from `--vn-radius-small`. `tests.md` bars a test file created solely for `constants.ts`, and the plan requires `tests/src/core/constants.test.ts`; its subject is the module's import behaviour and the path law, not the data, which is why it earns its place.
- **`focus-ring` and `breakpoint-down` have no U3 consumer.** The plan's mixin list names them and the minimal-API law argues to defer them to Button and to the first responsive partial. Writing them follows the plan; deferring them follows the law.
- **The theme transition.** `_body.scss` transitions `color` and `background-color` at `--vn-motion-feedback` so the mixin has a real consumer and `theme.test.ts` has a rendered observable. Elements reads `transition: all 0s` on body copy, so this is a Veneer addition rather than a calibrated value, and it animates every colour-mode switch.
- **`scroll-padding` is unmeasured.** The plan names it in `_html.scss` and no calibration row fixes an offset. Declare it at `var(--vn-space-8)` or defer it to the first sticky-header consumer.
- **The RTL build is a byte copy** (`configs/src/vite.styles.config.ts:27`), so the LTR and RTL name union is trivially equal at U3. The parity test still runs both, because the assertion is what catches the day a logical-property partial makes them diverge.

# Unknowns

- The primary's sRGB channel triplet, light and dark, and the link triplets that follow it.
- The body canvas colour, light and dark, on Elements' built showcase.
- Whether `box-shadow` collapses a registered-factor `calc()` into the calibration's exact string on both engines.
- Whether the disabled host's `opacity` and `cursor` change any token U3 declares; the calibration names this open and Button reads it.

# Journal

native

# Deviation

None stopped the work. I held the subjective lane: shape, vocabulary, ergonomics, and the feel the token surface presents. Where the readings left a fork I ruled inline and named the ruling — the `{base, rgb}` tier shape, the derivation of role tiers rather than literal Bootstrap values, `color-scheme` owned by `_theme.scss` rather than `_body.scss`, the theme-dependent closure rather than a full alias repeat, the deferral of the fill tints, and the constants-first direction of the TypeScript declarations.

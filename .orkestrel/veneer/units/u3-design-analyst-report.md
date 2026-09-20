## Question

Which token contract can U3 implement from the retained calibration while satisfying the canonical names, Bootstrap aliases, theme islands, typed registry, and browser proofs?

## Proposal

**The contract cannot close from the supplied calibration alone.** Implement the supported mappings below only after the missing readings and contract conflicts are resolved. Do not fill those gaps with invented Elements values.

The proposal uses these sources:

- **Calibration:** [Elements calibration](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration.md).
- **Inventory:** [Bootstrap values and consumers](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/inventory.json), restricted to `root`, `dark`, and `references`.
- **Ledger:** [Token rows](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/ledger.md:176).
- **Plan:** [U3 Token contract](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/plan.md:289).
- **Platform:** [Substitution and inheritance](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/platform.md).
- **Instruments:** [Executed browser capabilities](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/instruments.md).
- **Helpers:** [Installed browser declarations](C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts).

### Name map

Use grouped canonical names. In the tables, **open** means the calibration supplies no defensible value for that role. An open entry is a design obligation, not permission to publish a placeholder.

The measured foundation maps as follows. Theme-varying entries show their light defaults here.

| Group | Canonical token | Calibration specimen, state, mode, property | Proposed value | Bootstrap alias |
|---|---|---|---|---|
| Factor | `--vn-factor-theme` | Theme selection; structural contract, not a measured scalar | `light`; retune to `dark` | Drives `color-scheme` |
| Factor | `--vn-factor-density` | Space measurements at the calibrated baseline | `1`, defined as the normalization identity | No root alias |
| Factor | `--vn-factor-radius` | Radius measurements at the calibrated baseline | `1`, defined as the normalization identity | Scales the radius consumers |
| Factor | `--vn-factor-elevation` | Elevation measurements at the calibrated baseline | `1`, defined as the normalization identity | Scales shadow geometry |
| Factor | `--vn-factor-motion` | Ordinary and reduced motion | `1`; reduced motion disables transitions through the mixin | Scales ordinary durations |
| Palette | `--vn-palette-black` | Dialog, rest, light, `color` | `rgb(0, 0, 0)` | `--bs-black` |
| Palette | `--vn-palette-white` | Filled primary, rest, light/dark, `color` | `rgb(255, 255, 255)` | `--bs-white` |
| Channel | `--vn-channel-black`, `--vn-channel-white` | The preceding measured colors, channel projection | `0, 0, 0`; `255, 255, 255` | `--bs-black-rgb`, `--bs-white-rgb` |
| Primary | `--vn-primary-fill` | `.primary`, rest, light, background and border color | `oklch(0.48 0.255 264)` | `--bs-primary` |
| Text | `--vn-text-base` | Body/headings, rest, light, `color` | `oklch(0.208 0.042 265.755)` | `--bs-body-color` |
| Text | `--vn-text-emphasis` | Dialog, rest, light, `color`; proposed mapping to emphasis | `var(--vn-palette-black)` | `--bs-emphasis-color` |
| Text | `--vn-text-inverse` | Filled primary, rest, light/dark, `color` | `var(--vn-palette-white)` | No root alias |
| Text | `--vn-text-hint` | Hint, rest, light, `color` | `var(--vn-palette-white)` | No root alias |
| Surface | `--vn-surface-dialog` | Dialog, rest, light, `background-color` | `var(--vn-palette-white)` | No global canvas alias |
| Surface | `--vn-surface-raised` | Popover/drawer, rest, light, `background-color` | `oklch(0.984 0.003 247.858)` | Proposed `--bs-tertiary-bg` |
| Surface | `--vn-surface-inverse` | Hint, rest, light, background channels before its recorded alpha | `color(srgb 0.0571636 0.0900503 0.168809)` | No root alias |
| Surface | `--vn-surface-hint` | Hint, rest, light, `background-color` | Mix the inverse surface with transparent at `--vn-opacity-hint` | No root alias |
| Opacity | `--vn-opacity-hint` | Hint, rest, light/dark, background alpha | `0.95` | No root alias |
| Border | `--vn-border-width` | Details/dialog/popover/drawer, rest, light/dark, border width | `1px` | `--bs-border-width` |
| Border | `--vn-border-color` | The preceding specimens, border color, light | `oklch(0.869 0.022 252.894)` | `--bs-border-color` |
| Radius | `--vn-radius-small`, `--vn-radius-base`, `--vn-radius-large` | Small/default/large button, rest, light/dark, radius | `0.25rem`, `0.375rem`, `0.5rem` | `--bs-border-radius-sm`, `--bs-border-radius`, `--bs-border-radius-lg` |
| Space | `--vn-space-4`, `--vn-space-6`, `--vn-space-8` | Small/default/large button, padding | `0.25rem`, `0.375rem`, `0.5rem` | No root aliases |
| Space | `--vn-space-10`, `--vn-space-14` | Details, rest, padding | `0.625rem`, `0.875rem` | No root aliases |
| Space | `--vn-space-12`, `--vn-space-16` | Popover/dialog, rest, padding | `0.75rem`, `1rem` | No root aliases |
| Font | `--vn-font-sans` | Every typography specimen; only the leading family was retained | `system-ui`; the remaining stack is open | `--bs-font-sans-serif` |
| Font | `--vn-font-body` | Body, rest, family | `var(--vn-font-sans)` | `--bs-body-font-family` |
| Size | `--vn-size-small`, `--vn-size-body`, `--vn-size-large` | Small button/hint, body/default button, large button/dialog | `0.75rem`, `0.875rem`, `1rem` | Body maps to `--bs-body-font-size` |
| Size | `--vn-size-h1`, `--vn-size-h2`, `--vn-size-h3` | Matching heading, rest, `font-size` | `2.25rem`, `1.875rem`, `1.5rem` | No root aliases |
| Size | `--vn-size-h4`, `--vn-size-h5`, `--vn-size-h6` | Matching heading, rest, `font-size` | `1.25rem`, `1.125rem`, `1rem` | No root aliases |
| Weight | `--vn-weight-body`, `--vn-weight-heading` | Body/headings, rest, weight | `400`, `600` | Body maps to `--bs-body-font-weight` |
| Leading | `--vn-leading-body`, `--vn-leading-heading` | Body/headings, retained size-to-line-height relationship | `1.5`, `1.2` | Body maps to `--bs-body-line-height` |
| Duration | `--vn-duration-feedback`, `--vn-duration-panel` | Buttons/headings and dialog/drawer, ordinary transitions | `150ms`, `250ms` | No root aliases |
| Easing | `--vn-easing-feedback`, `--vn-easing-opacity`, `--vn-easing-panel` | Feedback, panel opacity, panel transform | `ease`, `ease-out`, `cubic-bezier(0.32, 0.72, 0, 1)` | No root aliases |
| Focus | `--vn-focus-width`, `--vn-focus-opacity` | Buttons, focus-visible, light/dark, shadow spread and alpha | `3px`, `0.45` | `--bs-focus-ring-width`, `--bs-focus-ring-opacity` |
| Focus | `--vn-focus-color` | Buttons, focus-visible, light/dark, shadow color | Primary mixed with transparent at the focus opacity | `--bs-focus-ring-color` |

The `rem` values are conversions of the calibration’s pixel readings at its recorded `16px` root. Scaling with a changed root font is a proposed behavior to prove, not an additional Elements measurement.

Use the measured shadow compositions as the elevation steps. Their geometry consumes the elevation factor; their colors consume the black palette token.

| Canonical token | Calibration row | Shadow at factor `1` | Bootstrap alias |
|---|---|---|---|
| `--vn-elevation-small` | Hint/drawer, rest, light/dark | Black at `5%`: `0 1px 2px 0`; black at `9%`: `0 1px 3px 0` | `--bs-box-shadow-sm` |
| `--vn-elevation-base` | Popover, rest, light/dark | Black at `6%`: `0 2px 4px 0`; black at `12%`: `0 8px 16px -4px` | `--bs-box-shadow` |
| `--vn-elevation-large` | Dialog, rest, light/dark | Black at `7%`: `0 4px 8px 0`; black at `22%`: `0 24px 44px -8px` | `--bs-box-shadow-lg` |
| `--vn-elevation-inset` | No measured inset shadow | Open | `--bs-box-shadow-inset` |

The remaining palette aliases need calibration. The Bootstrap values are reference values, not approved substitutes.

| Canonical token | Bootstrap root variable | Bootstrap value | Elements value |
|---|---|---|---|
| `--vn-palette-blue` | `--bs-blue` | `#0d6efd` | Open |
| `--vn-palette-indigo` | `--bs-indigo` | `#6610f2` | Open |
| `--vn-palette-purple` | `--bs-purple` | `#6f42c1` | Open |
| `--vn-palette-pink` | `--bs-pink` | `#d63384` | Open |
| `--vn-palette-red` | `--bs-red` | `#dc3545` | Open |
| `--vn-palette-orange` | `--bs-orange` | `#fd7e14` | Open |
| `--vn-palette-yellow` | `--bs-yellow` | `#ffc107` | Open |
| `--vn-palette-green` | `--bs-green` | `#198754` | Open |
| `--vn-palette-teal` | `--bs-teal` | `#20c997` | Open |
| `--vn-palette-cyan` | `--bs-cyan` | `#0dcaf0` | Open |
| `--vn-gray-base` | `--bs-gray` | `#6c757d` | Open |
| `--vn-gray-dark` | `--bs-gray-dark` | `#343a40` | Open |
| `--vn-gray-100` | `--bs-gray-100` | `#f8f9fa` | Open |
| `--vn-gray-200` | `--bs-gray-200` | `#e9ecef` | Open |
| `--vn-gray-300` | `--bs-gray-300` | `#dee2e6` | Open |
| `--vn-gray-400` | `--bs-gray-400` | `#ced4da` | Open |
| `--vn-gray-500` | `--bs-gray-500` | `#adb5bd` | Open |
| `--vn-gray-600` | `--bs-gray-600` | `#6c757d` | Open |
| `--vn-gray-700` | `--bs-gray-700` | `#495057` | Open |
| `--vn-gray-800` | `--bs-gray-800` | `#343a40` | Open |
| `--vn-gray-900` | `--bs-gray-900` | `#212529` | Open |

Give each semantic role its own group. Do not equate the `.subtle` button’s transparent treatment with Bootstrap’s semantic subtle-background tier.

| Role | Bootstrap root variables | Canonical destinations | Calibration status |
|---|---|---|---|
| Primary | `--bs-primary`, `--bs-primary-rgb`, `--bs-primary-text-emphasis`, `--bs-primary-bg-subtle`, `--bs-primary-border-subtle` | `--vn-primary-fill`, `--vn-primary-rgb`, `--vn-primary-emphasis`, `--vn-primary-subtle`, `--vn-primary-border` | Fill measured; channel representation and remaining tiers open |
| Secondary | `--bs-secondary`, `--bs-secondary-rgb`, `--bs-secondary-text-emphasis`, `--bs-secondary-bg-subtle`, `--bs-secondary-border-subtle` | Corresponding `--vn-secondary-fill`, `--vn-secondary-rgb`, `--vn-secondary-emphasis`, `--vn-secondary-subtle`, `--vn-secondary-border` | Open |
| Success | `--bs-success`, `--bs-success-rgb`, `--bs-success-text-emphasis`, `--bs-success-bg-subtle`, `--bs-success-border-subtle` | Corresponding `--vn-success-fill`, `--vn-success-rgb`, `--vn-success-emphasis`, `--vn-success-subtle`, `--vn-success-border` | Open |
| Info | `--bs-info`, `--bs-info-rgb`, `--bs-info-text-emphasis`, `--bs-info-bg-subtle`, `--bs-info-border-subtle` | Corresponding `--vn-info-fill`, `--vn-info-rgb`, `--vn-info-emphasis`, `--vn-info-subtle`, `--vn-info-border` | Open |
| Warning | `--bs-warning`, `--bs-warning-rgb`, `--bs-warning-text-emphasis`, `--bs-warning-bg-subtle`, `--bs-warning-border-subtle` | Corresponding `--vn-warning-fill`, `--vn-warning-rgb`, `--vn-warning-emphasis`, `--vn-warning-subtle`, `--vn-warning-border` | Open |
| Danger | `--bs-danger`, `--bs-danger-rgb`, `--bs-danger-text-emphasis`, `--bs-danger-bg-subtle`, `--bs-danger-border-subtle` | Corresponding `--vn-danger-fill`, `--vn-danger-rgb`, `--vn-danger-emphasis`, `--vn-danger-subtle`, `--vn-danger-border` | Open |
| Light | `--bs-light`, `--bs-light-rgb`, `--bs-light-text-emphasis`, `--bs-light-bg-subtle`, `--bs-light-border-subtle` | Corresponding `--vn-light-fill`, `--vn-light-rgb`, `--vn-light-emphasis`, `--vn-light-subtle`, `--vn-light-border` | Open |
| Dark | `--bs-dark`, `--bs-dark-rgb`, `--bs-dark-text-emphasis`, `--bs-dark-bg-subtle`, `--bs-dark-border-subtle` | Corresponding `--vn-dark-fill`, `--vn-dark-rgb`, `--vn-dark-emphasis`, `--vn-dark-subtle`, `--vn-dark-border` | Open |

The remaining root variables map as follows. Inventory supplies their Bootstrap defaults; calibration does not establish the missing Elements roles.

| Bootstrap root variable | Canonical destination | Ruling |
|---|---|---|
| `--bs-font-monospace` | `--vn-font-monospace` | Open; no monospace specimen |
| `--bs-gradient` | `--vn-surface-gradient` | Open; no gradient reading |
| `--bs-body-color-rgb` | `--vn-channel-body` | Derive from measured body color only after settling the channel contract |
| `--bs-body-bg`, `--bs-body-bg-rgb` | `--vn-surface-canvas`, `--vn-channel-canvas` | Open; transparent in-flow specimens do not establish canvas paint |
| `--bs-emphasis-color-rgb` | `--vn-channel-emphasis` | `0, 0, 0` light; `255, 255, 255` dark, under the proposed dialog-to-emphasis mapping |
| `--bs-secondary-color`, `--bs-secondary-color-rgb` | `--vn-text-secondary`, `--vn-channel-secondary` | Open; no secondary-text reading |
| `--bs-secondary-bg`, `--bs-secondary-bg-rgb` | `--vn-surface-inset`, `--vn-channel-inset` | Open; no inset-surface reading |
| `--bs-tertiary-color`, `--bs-tertiary-color-rgb` | `--vn-text-tertiary`, `--vn-channel-tertiary` | Open; no tertiary-text reading |
| `--bs-tertiary-bg-rgb` | `--vn-channel-raised` | Channel projection of the proposed raised-surface mapping |
| `--bs-heading-color` | `--vn-text-heading` | Open on inheritance semantics; matching body color does not prove `inherit` |
| `--bs-link-color`, `--bs-link-color-rgb` | `--vn-link-color`, `--vn-channel-link` | Open; no link specimen |
| `--bs-link-decoration` | `--vn-link-decoration` | Open; Bootstrap declares `underline` |
| `--bs-link-hover-color`, `--bs-link-hover-color-rgb` | `--vn-link-hover`, `--vn-channel-hover` | Open; button hover does not establish link hover |
| `--bs-code-color` | `--vn-text-code` | Open |
| `--bs-highlight-color`, `--bs-highlight-bg` | `--vn-text-highlight`, `--vn-surface-highlight` | Open |
| `--bs-border-style` | `--vn-border-style` | Open; calibration retained width and color, not style |
| `--bs-border-color-translucent` | `--vn-border-translucent` | Open; an opaque border reading does not establish this tier |
| `--bs-border-radius-xl` | `--vn-radius-extra` | Open; Bootstrap declares `1rem` |
| `--bs-border-radius-xxl`, `--bs-border-radius-2xl` | `--vn-radius-double` | Open; Bootstrap declares `2rem`, with `2xl` aliasing `xxl` |
| `--bs-border-radius-pill` | `--vn-radius-pill` | Open; Bootstrap declares `50rem` |
| `--bs-form-valid-color`, `--bs-form-valid-border-color` | `--vn-validation-valid`, `--vn-validation-accept` | Open; do not infer validation from an unmeasured success role |
| `--bs-form-invalid-color`, `--bs-form-invalid-border-color` | `--vn-validation-invalid`, `--vn-validation-reject` | Open |
| `--bs-breakpoint-xs` | `--vn-breakpoint-xs` | Open calibration exception; Bootstrap value `0` |
| `--bs-breakpoint-sm` | `--vn-breakpoint-sm` | Open calibration exception; Bootstrap value `576px` |
| `--bs-breakpoint-md` | `--vn-breakpoint-md` | Open calibration exception; Bootstrap value `768px` |
| `--bs-breakpoint-lg` | `--vn-breakpoint-lg` | Open calibration exception; Bootstrap value `992px` |
| `--bs-breakpoint-xl` | `--vn-breakpoint-xl` | Open calibration exception; Bootstrap value `1200px` |
| `--bs-breakpoint-xxl` | `--vn-breakpoint-xxl` | Open calibration exception; Bootstrap value `1400px` |
| `--bs-btn-close-filter` | `--vn-filter-close` | Open; Bootstrap’s root value is whitespace, not `none` |
| `--bs-carousel-indicator-active-bg` | `--vn-carousel-indicator` | Open; Bootstrap uses white/light and black/dark |
| `--bs-carousel-caption-color` | `--vn-carousel-caption` | Open; Bootstrap uses white/light and black/dark |
| `--bs-carousel-control-icon-filter` | `--vn-filter-carousel` | Open; Bootstrap’s root value is whitespace |

Keep Bootstrap’s breakpoint values as the **recommended compatibility exception**, because changing the published breakpoint variables independently of their media-query thresholds would misstate the responsive contract. That exception requires reconciliation with the plan’s instruction that every value comes from calibration. Do not treat it as already granted.

Reserve the requested stacking groups as `--vn-z-dropdown`, `--vn-z-sticky`, `--vn-z-fixed`, `--vn-z-offcanvas`, `--vn-z-modal`, `--vn-z-popover`, `--vn-z-tooltip`, `--vn-z-toast`, `--vn-backdrop-offcanvas`, and `--vn-backdrop-modal`. Their numeric values remain open: the supplied calibration records top-layer behavior, not a z-index ladder.

### Dark retune

Retune the measured theme-dependent tokens as follows. These values come from Calibration § Colour and § Interaction states.

| Canonical token | Dark value |
|---|---|
| `--vn-factor-theme` | `dark`, as the theme-selection contract |
| `--vn-primary-fill` | `oklch(0.7 0.15 233)` |
| `--vn-text-base` | `oklch(0.929 0.013 255.508)` |
| `--vn-text-emphasis` | `var(--vn-palette-white)` |
| `--vn-channel-emphasis` | `255, 255, 255` |
| `--vn-text-hint` | `oklch(0.208 0.042 265.755)` |
| `--vn-surface-dialog` | `rgb(18, 18, 18)` |
| `--vn-surface-raised` | `oklch(0.235 0.013 256)` |
| `--vn-surface-inverse` | `color(srgb 0.944349 0.960546 0.976583)` |
| `--vn-border-color` | `oklch(0.4 0.022 256)` |
| `--vn-focus-color` | Recompute from dark primary at `0.45` alpha |
| `--vn-surface-hint` | Recompute from dark inverse surface at `0.95` alpha |
| Relevant RGB channels | Recompute from their retuned source colors after the channel contract closes |

Do not retune density, radius, elevation, typography, shadow steps, or ordinary motion solely because the theme changed. Calibration records the corresponding measurements unchanged.

Use explicit light and dark island selectors. Light must restore the light defaults inside dark, rather than merely inherit the document’s defaults:

```scss
:where([data-bs-theme='light']) {
	--vn-factor-theme: light;
	/* Restore every theme-varying canonical token to its light declaration. */
}

:where([data-bs-theme='dark']) {
	--vn-factor-theme: dark;
	/* Declare every dark canonical retune. */
}
```

The implementation must also address these inheritance obligations:

- Declare `color-scheme: var(--vn-factor-theme)` on each theme island. Setting it only on `html` or `body` does not make a nested island follow its own factor.
- Rebind dependent custom-property expressions and Bootstrap aliases at each supported customization boundary. Platform records that substitution occurs before inheritance; an alias inherited from the root does not become a live expression over a child’s overridden canonical token.
- Keep the alias declarations in a shared declaration emitter, with their mapping authority in `_tokens.scss`. Emit the same mapping at root and theme boundaries.
- Document whether a canonical override on an arbitrary unmarked ancestor must update inherited Bootstrap aliases. The supplied contract does not settle that locality. Do not silently satisfy only direct canonical consumers.
- Prove light → dark → light and dark → light → dark nesting, with unchanged siblings.

Ledger’s dark retunes additionally require the semantic emphasis/subtle/border tiers, canvas and secondary/tertiary text and surfaces, link, code, highlight, translucent border, validation, and carousel/filter tokens listed earlier. Their Elements dark values are open.

Ledger also includes dark-only component variables:

| Bootstrap dark variable | Proposed canonical destination | Missing evidence |
|---|---|---|
| `--bs-form-select-bg-img` | `--vn-image-select` | Select image and light restoration |
| `--bs-form-switch-bg` | `--vn-image-switch` | Switch image and light restoration |
| `--bs-navbar-toggler-icon-bg` | `--vn-image-navbar` | Navbar icon and light restoration |
| `--bs-accordion-btn-icon` | `--vn-image-accordion` | Accordion icon and light restoration |
| `--bs-accordion-btn-active-icon` | `--vn-image-active` | Active accordion icon and light restoration |

Do not place these Bootstrap names in `:root`: they are absent from `Inventory.root`, and doing so would violate the prescribed root-set equality. Their scoped treatment and component ownership need reconciliation before U3 closes.

### TypeScript shape

Use literal names in the authoritative type. Derive the leaf union from that type, rather than maintaining a separate name union. Keep every group and leaf readonly.

The following declarations specify the proposed namespace, including entries whose values remain blocked. They are design declarations, not a claim of successful typechecking.

```ts
/**
 * Defines the grouped canonical CSS custom-property names.
 */
export type TokenMap = {
	readonly [Role in
		| 'primary'
		| 'secondary'
		| 'success'
		| 'info'
		| 'warning'
		| 'danger'
		| 'light'
		| 'dark']: {
		readonly [Tier in
			| 'fill'
			| 'rgb'
			| 'emphasis'
			| 'subtle'
			| 'border']: `--vn-${Role}-${Tier}`
	}
} & {
	readonly factor: {
		readonly [Name in
			| 'theme'
			| 'density'
			| 'radius'
			| 'elevation'
			| 'motion']: `--vn-factor-${Name}`
	}
	readonly palette: {
		readonly [Name in
			| 'blue'
			| 'indigo'
			| 'purple'
			| 'pink'
			| 'red'
			| 'orange'
			| 'yellow'
			| 'green'
			| 'teal'
			| 'cyan'
			| 'black'
			| 'white']: `--vn-palette-${Name}`
	}
	readonly gray: {
		readonly [Name in
			| 'base'
			| 'dark'
			| '100'
			| '200'
			| '300'
			| '400'
			| '500'
			| '600'
			| '700'
			| '800'
			| '900']: `--vn-gray-${Name}`
	}
	readonly channel: {
		readonly [Name in
			| 'black'
			| 'white'
			| 'body'
			| 'emphasis'
			| 'secondary'
			| 'tertiary'
			| 'canvas'
			| 'inset'
			| 'raised'
			| 'link'
			| 'hover']: `--vn-channel-${Name}`
	}
	readonly text: {
		readonly [Name in
			| 'base'
			| 'emphasis'
			| 'secondary'
			| 'tertiary'
			| 'heading'
			| 'inverse'
			| 'hint'
			| 'code'
			| 'highlight']: `--vn-text-${Name}`
	}
	readonly surface: {
		readonly [Name in
			| 'canvas'
			| 'inset'
			| 'raised'
			| 'dialog'
			| 'inverse'
			| 'hint'
			| 'gradient'
			| 'highlight']: `--vn-surface-${Name}`
	}
	readonly opacity: {
		readonly hint: '--vn-opacity-hint'
	}
	readonly font: {
		readonly [Name in 'sans' | 'monospace' | 'body']: `--vn-font-${Name}`
	}
	readonly size: {
		readonly [Name in
			| 'small'
			| 'body'
			| 'large'
			| 'h1'
			| 'h2'
			| 'h3'
			| 'h4'
			| 'h5'
			| 'h6']: `--vn-size-${Name}`
	}
	readonly weight: {
		readonly [Name in 'body' | 'heading']: `--vn-weight-${Name}`
	}
	readonly leading: {
		readonly [Name in 'body' | 'heading']: `--vn-leading-${Name}`
	}
	readonly space: {
		readonly [Name in '4' | '6' | '8' | '10' | '12' | '14' | '16']: `--vn-space-${Name}`
	}
	readonly radius: {
		readonly [Name in
			| 'small'
			| 'base'
			| 'large'
			| 'extra'
			| 'double'
			| 'pill']: `--vn-radius-${Name}`
	}
	readonly border: {
		readonly [Name in 'width' | 'style' | 'color' | 'translucent']: `--vn-border-${Name}`
	}
	readonly elevation: {
		readonly [Name in 'small' | 'base' | 'large' | 'inset']: `--vn-elevation-${Name}`
	}
	readonly duration: {
		readonly [Name in 'feedback' | 'panel']: `--vn-duration-${Name}`
	}
	readonly easing: {
		readonly [Name in 'feedback' | 'opacity' | 'panel']: `--vn-easing-${Name}`
	}
	readonly focus: {
		readonly [Name in 'width' | 'opacity' | 'color']: `--vn-focus-${Name}`
	}
	readonly link: {
		readonly [Name in 'color' | 'hover' | 'decoration']: `--vn-link-${Name}`
	}
	readonly validation: {
		readonly [Name in 'valid' | 'accept' | 'invalid' | 'reject']: `--vn-validation-${Name}`
	}
	readonly breakpoint: {
		readonly [Name in 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl']: `--vn-breakpoint-${Name}`
	}
	readonly filter: {
		readonly [Name in 'close' | 'carousel']: `--vn-filter-${Name}`
	}
	readonly carousel: {
		readonly [Name in 'indicator' | 'caption']: `--vn-carousel-${Name}`
	}
	readonly image: {
		readonly [Name in
			| 'select'
			| 'switch'
			| 'navbar'
			| 'accordion'
			| 'active']: `--vn-image-${Name}`
	}
	readonly z: {
		readonly [Name in
			| 'dropdown'
			| 'sticky'
			| 'fixed'
			| 'offcanvas'
			| 'modal'
			| 'popover'
			| 'tooltip'
			| 'toast']: `--vn-z-${Name}`
	}
	readonly backdrop: {
		readonly [Name in 'offcanvas' | 'modal']: `--vn-backdrop-${Name}`
	}
}

/**
 * Names every canonical CSS custom property in the grouped registry.
 */
export type TokenName = {
	readonly [Group in keyof TokenMap]: TokenMap[Group][keyof TokenMap[Group]]
}[keyof TokenMap]
```

In `src/core/constants.ts`, use an explicitly annotated `TOKEN_NAMES: TokenMap` declaration initialized with `Object.freeze`. Freeze every nested group separately. Populate each group with the exact name literals prescribed by its mapped type; do not generate CSS values or import SCSS.

A group has this shape:

```ts
factor: Object.freeze({
	theme: '--vn-factor-theme',
	density: '--vn-factor-density',
	radius: '--vn-factor-radius',
	elevation: '--vn-factor-elevation',
	motion: '--vn-factor-motion',
}),
```

The annotation rejects missing groups, missing leaves, and a leaf mapped to another name. `TokenName` derives exhaustively without duplicating CSS values. No `as` assertion, generic string index signature, runtime registry builder, or extra public helper is needed. See [TypeScript rules](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/typescript.md) and [constant placement and freezing](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/architecture.md).

The bounded search for `\b(TokenMap|TokenName|TOKEN_NAMES)\b` found no matching text in Veneer’s installed `@orkestrel/scaffold/dist/host/guides/*.md` population. This is a name-search observation, not a passed surface-policy gate.

### Departures

Record these measured or proposed departures against Inventory’s Bootstrap defaults. Do not describe unchanged radii as a visual departure.

| Subject | Elements value taken | Bootstrap value | Evidence or qualification |
|---|---|---|---|
| Body size | `0.875rem` at the calibrated root | `1rem` | Calibration § Type |
| Heading weight | `600` | `500` | Calibration § Departures |
| Primary, light | `oklch(0.48 0.255 264)` | `#0d6efd` | Calibration § Colour; Inventory.root |
| Primary, dark | `oklch(0.7 0.15 233)` | Root primary remains `#0d6efd`; Inventory.dark has no primary-fill retune | Same |
| Body text, light | `oklch(0.208 0.042 265.755)` | `#212529` | Same |
| Body text, dark | `oklch(0.929 0.013 255.508)` | `#dee2e6` | Same |
| Raised surface, light | `oklch(0.984 0.003 247.858)` | Tertiary background `#f8f9fa` | Proposed popover/drawer-to-tertiary mapping |
| Raised surface, dark | `oklch(0.235 0.013 256)` | Tertiary background `#2b3035` | Same |
| Border, light | `oklch(0.869 0.022 252.894)` | `#dee2e6` | Calibration § Colour |
| Border, dark | `oklch(0.4 0.022 256)` | `#495057` | Same |
| Small shadow | Measured hint/drawer composition | `0 0.125rem 0.25rem rgba(0,0,0,.075)` | Calibration § Elevation |
| Base shadow | Measured popover composition | `0 0.5rem 1rem rgba(0,0,0,.15)` | Same |
| Large shadow | Measured dialog composition | `0 1rem 3rem rgba(0,0,0,.175)` | Same |
| Focus spread | `3px` | `0.25rem`, resolving to `4px` at the reference root | Calibration § Interaction states |
| Focus alpha | `0.45` | `0.25` | Same |
| Focus color | Theme primary at the measured alpha | `rgba(13,110,253,.25)` | Same |
| Small/default/large radius | `4px` / `6px` / `8px` | `0.25rem` / `0.375rem` / `0.5rem` | Equal at the reference root; factor behavior requires proof |
| Body weight and leading | `400`, `1.5` | `400`, `1.5` | Equal |
| Reduced-motion disclosure | Disable interpolation | Elements still interpolates | Explicit accepted repair in Calibration § Departures |

Primary hover and active fills remain independent expected readings:

| Mode | Hover endpoint | Active endpoint |
|---|---|---|
| Light | `color(srgb 0.0288046 0.226321 0.817248)` | `color(srgb 0.0263751 0.203249 0.734892)` |
| Dark | `color(srgb 0.0248835 0.714208 0.933359)` | `color(srgb 0.135692 0.746684 0.940932)` |

Calibration requires `color-mix()` expressions over primary but does not retain their percentages or interpolation formula. Do not claim a formula is calibrated until its browser consumers match these endpoints.

### Tests

Run these proofs independently against built LTR and RTL CSS on managed Chromium and Edge. The following are proposed assertions and controls; none ran in this lane.

| Test | Assertion and installed helper | Planted control that must fail | Closing reading |
|---|---|---|---|
| `tokens.test.ts`: canonical membership | Use `readRules()` to inspect every actual root rule. Compare the canonical-name set bidirectionally with `TOKEN_NAMES` leaves. Reject undeclared prefixes. | Add an unmapped root name; remove a mapped declaration; relocate its declaration exclusively into a scoped rule. Restore after each run. | Each control fails the membership assertion; restored LTR and RTL populations agree |
| `tokens.test.ts`: Bootstrap membership | Compare root Bootstrap names with `Inventory.root`, independently of the canonical map. | Remove a Bootstrap alias; introduce a dark-only component variable at root. | Exact membership, not nonempty values or a total |
| `tokens.test.ts`: alias behavior | `mount`, `readStyle`, and `readPixels` read consumers corresponding to `Inventory.references`. Use `readRootToken` only as a supporting declaration reading. | Redirect an alias to a different valid canonical token. | The consumer fails while name membership remains valid |
| `tokens.test.ts`: calibrated values | Consume font, color, radius, border, spacing, shadow, duration, and easing through real properties. Compare with retained calibration measurements. | Change a declaration to another valid value while preserving every token name. | Independent expected property strings and geometry |
| `tokens.test.ts`: local override | Override a canonical token on the documented island boundary. Read its direct consumer, Bootstrap-alias consumer, descendant, and unchanged neighbor. | Leave an alias bound only at root. | The intended island changes; the neighbor does not |
| `tokens.test.ts`: density and radius independence | Change each factor separately; use `readPixels`, `readStyle`, and bounding rectangles. | Make radius consume density, or scale typography with density. | Padding changes without radius/font changes; radius changes without padding/font changes |
| `tokens.test.ts`: invalid value | For a non-inherited property, supply a nonempty token value invalid for that property. Read the property’s initial result. Separately test a missing variable with a `var()` fallback. | Assert that an invalid nonempty value selects the `var()` fallback. | The invalid value and missing-variable cases produce their distinct specified outcomes |
| `tokens.test.ts`: cycle | Declare the cycle on the same element, consume through a property without a fallback, and read its initial or inherited result as appropriate. Add a separate fallback-bearing consumer. | Break the cycle while preserving declaration membership. | Guaranteed-invalid substitution reaches the expected consumer behavior |
| `theme.test.ts` | Drive light/dark attributes; read canonical and compatible consumers, including `color-scheme`. Exercise nesting in each direction. | Delete the light restoration, a dark retune, or an island alias rebind. | Every nested island uses its own mode; siblings retain theirs |
| `tokens.test.ts`: RGB aliases | Consume aliases using Bootstrap’s actual `rgba(var(--bs-…-rgb), alpha)` shape from Inventory.references. | Assign a complete `oklch()` color to a channels alias; leave light channels under a dark fill. | Valid resolved color with the expected channels and supplied alpha |
| `mixins.test.ts` | Mount a transition specimen; read transition properties through `readStyle`; emulate reduced motion through the provider mechanism recorded in Instruments. Observe a changing consumer property. | Remove the reduced-motion branch. | Ordinary transition interpolates; reduced motion resolves to disabled transition and snaps |
| `mixins.test.ts`: focus | Consume the focus mixin on a mounted focusable specimen; reach focus through real keyboard input. Read the resolved shadow. | Remove the shadow or bind it to an unrelated color. | Measured spread and alpha over the theme’s primary color |
| `index.test.ts` | Use `readRules()` to check layer order and the elements-layer selector contract. Use `findRule` only for supporting discovery. | Insert `section button` in the elements layer; also exercise a functional-selector spelling such as `:is(section) button`. | The selector instrument rejects contextual composition rather than passing a substring-only scan |
| `elements/html.test.ts`, `elements/body.test.ts` | Read document baseline properties and body font/text/canvas through real elements. | Remove a baseline declaration. | Expected resolved properties; canvas and scroll-padding expectations remain blocked on measurement |
| Core import proof | Import the public core entry in its Node project; verify name-map shape and nested freezing. Pair runtime import with actual environment-boundary checks. | Introduce a DOM access, CSS import, or forbidden host listener into the imported graph. | The relevant runtime or policy/type stage rejects the planted edit; a successful Node import alone does not prove absence of listeners |
| `styles/integration.test.ts` | Transcribe the customization recipe and read its changed consumers and unchanged neighbor through installed helpers. | Disconnect the recipe’s token from its consumer. | The documented result fails under the control and succeeds after restoration |
| Guide parity | Prove public exports, summaries, and recipe parity with the repository’s existing guide mechanism. | Change a documented name or claimed recipe result. | Name parity and executed recipe assertions fail appropriately |

For stylesheet-escape checks, use `extractStyles` directly and `buildEscapes` for its detached control. These helpers inspect inline styles and embedded stylesheets; they do **not** inspect selector semantics. Permit the deliberate override fixture only within the token test’s documented customization operation. See Helpers’ declarations for those exact limits.

Do not register all color tokens with `@property`. Registration changes invalid-value and inheritance behavior; Instruments proves syntax availability, not suitability for this contract.

### Risks

The following conflicts prevent an unconditional implementation handoff.

| Risk | Evidence | Required ruling |
|---|---|---|
| Calibration coverage is narrower than U3 | Calibration lacks the open roles in the name map | Extend calibration before assigning their values |
| Bootstrap fallback permission conflicts with the plan | Brief permits retaining a Bootstrap value with a reason; Plan requires every value from calibration and complete canonical aliasing | Authorize named compatibility exceptions or obtain the missing readings |
| RGB aliases have a different grammar from color tokens | Inventory references consume comma-separated channels inside `rgba()` | Specify which canonical representation owns color and how supported overrides keep the channels coherent; a whole color expression is not a channel tuple |
| Root aliases can retain ancestor values | Platform states substitution precedes inheritance | Fix supported override boundaries and prove canonical-to-compatible propagation there |
| Light restoration is necessary | Nested theme requirement includes islands inside other islands | Restore every theme-dependent value, derived expression, and scoped alias in light islands |
| Theme-only declaration placement conflicts with island `color-scheme` | Styles rules limit `_theme.scss` to token retunes; Plan also requires island `color-scheme` behavior | Specify the permitted home of the non-token island declaration |
| Constants-only test placement conflicts with rules | Plan names `tests/src/core/constants.test.ts`; Tests rules prohibit files solely for constants | Move the import/registry proof to a permitted integration scope, or revise the governing instruction |
| Selector proof lacks a demonstrated complete instrument | `readRules` exposes CSSOM; `findRule` matches substrings; `extractStyles` detects style escapes | Prove selector coverage through the existing toolchain; do not introduce a handwritten CSS parser |
| Dark-only component assets lack calibrated light counterparts | Ledger.dark and Inventory.dark include image-valued component overrides absent from root | Reconcile U3 ownership with component-local initialization and nested light restoration |
| Factor normalization is a definition, not a retained measurement | Calibration records one baseline, not factor values or formulas | Define scaling semantics explicitly; do not present `1` as a measured Elements token |
| An ordinary motion factor cannot replace reduced-motion policy | Calibration records a reduced-motion defect; Plan requires the paired mixin | Keep reduced-motion suppression effective regardless of ordinary duration customization |
| The RTL build copies LTR bytes | [Styles build wrapper](C:/Users/mikes/WebstormProjects/veneer/configs/src/vite.styles.config.ts) | Keep U3 declarations direction-independent and test each emitted artifact separately |

## Unknowns

The smallest additional instruments are:

| Open input | Instrument that settles it |
|---|---|
| Semantic palette, tiers, secondary/tertiary text, links, code, highlights, validation | Extend the calibration specimen matrix with the corresponding actual Elements consumers in light and dark |
| Canvas | Read `html` and `body` backgrounds, `color-scheme`, and the composed page backdrop; do not infer paint from transparent descendants |
| Font stacks and monospace | Retain the complete computed family string on body and a code specimen |
| Large/pill radii, translucent/inset treatments | Measure specimens that actually consume those treatments |
| Breakpoints and z-index ladder | Obtain a targeted source-and-consumer reading; test responsive boundaries and overlapping non-top-layer hosts |
| Hover/active formulas | Read the authored expression, then consume it in each target browser against the retained endpoints |
| RGB synchronization and alias locality | Mount root, themed island, unmarked island, and nested component consumers; independently override the full-color and channel forms |
| HTML baseline | Read `interpolate-size`, `text-size-adjust`, and scroll-padding; exercise anchor placement for scroll-padding |
| Dark component images | Capture the corresponding light/dark component specimens and nested restoration |
| Type declarations and freeze behavior | Typecheck the proposed declaration and run its import/freeze controls in the actual core project |

## Journal

`native`

## Deviation

The supplied readings do not support a complete implementation-ready value contract. The proposal identifies the unresolved values and conflicting requirements instead of manufacturing defaults.

No files were written, and no probes, tests, builds, or browser actions ran. The host instruction required read-only inspection and prohibited execution.
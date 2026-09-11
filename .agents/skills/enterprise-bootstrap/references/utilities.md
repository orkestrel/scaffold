# Bootstrap 5 Utilities Reference

> Part of the `enterprise-bootstrap` package. Bootstrap **5.3.x** class index +
> composition notes. Component markup: [components.md](components.md).
> Theming, patterns, a11y: [bootstrap-reference.md](bootstrap-reference.md).

## Contents

- [Utility classes](#utility-classes-quick-reference) — background, borders, text color, display, flexbox, float, interactions, links, object fit, opacity, overflow, position, shadows, sizing, spacing, text, vertical align, visibility, z-index
- [Scales](#spacing-scale) — spacing scale, z-index component scale
- [Print utilities](#print-utilities)
- [Helpers](#helpers) — visually-hidden, stretched-link, ratio, stacks, vr, focus-ring, icon-link
- [Enterprise notes](#enterprise-notes-utilities) — composition habits

## Utility Classes Quick Reference

### Background

```css
.bg-primary, .bg-secondary, .bg-success, .bg-danger, .bg-warning, .bg-info, .bg-light, .bg-dark, .bg-body, .bg-white, .bg-transparent, .bg-black
.bg-body-secondary, .bg-body-tertiary
.bg-primary-subtle, .bg-secondary-subtle, .bg-success-subtle, .bg-danger-subtle, .bg-warning-subtle, .bg-info-subtle, .bg-light-subtle, .bg-dark-subtle
.bg-gradient
.bg-opacity-10, .bg-opacity-25, .bg-opacity-50, .bg-opacity-75, .bg-opacity-100
```

Prefer `bg-body`, `bg-body-secondary`, `bg-body-tertiary`, and `bg-*-subtle` for quiet surfaces; inherit text without an added foreground class. Treat original contextual `bg-*`, including `bg-light` and `bg-dark`, as non-adaptive in stock 5.3. Take ownership and exceptions from [color-modes.md](color-modes.md).

### Borders

```css
.border, .border-top, .border-end, .border-bottom, .border-start
.border-0, .border-top-0, .border-end-0, .border-bottom-0, .border-start-0
.border-1, .border-2, .border-3, .border-4, .border-5          /* widths */
.border-primary, .border-secondary, .border-success, .border-danger, .border-warning, .border-info, .border-light, .border-dark, .border-white, .border-black
.border-primary-subtle, .border-secondary-subtle, .border-success-subtle, .border-danger-subtle, .border-warning-subtle, .border-info-subtle, .border-light-subtle, .border-dark-subtle
.border-opacity-10, .border-opacity-25, .border-opacity-50, .border-opacity-75, .border-opacity-100
.rounded, .rounded-top, .rounded-end, .rounded-bottom, .rounded-start, .rounded-circle, .rounded-pill
.rounded-0, .rounded-1, .rounded-2, .rounded-3, .rounded-4, .rounded-5
```

Use adaptive border roles for quiet separation. Measure boundaries needed to identify a control or state; `border-*-subtle` adapts but does not automatically meet the contrast bar.

- **`border-{1..5}` sets `border-width` on every side.** On a component that already has a border (`.card`, `.alert`) it thickens the whole box. For a one-side accent, zero first, restore one side, then widen — `card border-0 border-top border-4 border-primary` — utility source order (`border` → `border-{side}` → `border-width`) makes it hold, and the cleared sides have no border style so their width never paints.
- Strengthen a rule that reads too faint with `border-2` on its soft color, not with a darker color; heavier width keeps the softness.
- `border-{color}` is the fixed brand color in both modes; check an accent against a dark `bg-*-subtle` before shipping it.

### Colors (Text)

```css
.text-primary, .text-secondary, .text-success, .text-danger, .text-warning, .text-info, .text-light, .text-dark
.text-body, .text-body-secondary, .text-body-tertiary, .text-body-emphasis
.text-primary-emphasis, .text-secondary-emphasis, .text-success-emphasis, .text-danger-emphasis, .text-warning-emphasis, .text-info-emphasis, .text-light-emphasis, .text-dark-emphasis
.text-black, .text-white, .text-black-50, .text-white-50
.text-muted        /* Deprecated in 5.3; use a deliberate .text-body-secondary role instead. */
.text-reset        /* Restore inherited color; not the same as .text-body. */
.text-opacity-25, .text-opacity-50, .text-opacity-75, .text-opacity-100
```

Default ordinary text to inheritance. Original contextual `text-*` colors do not adapt in stock 5.3; body-role and `text-*-emphasis` colors do. `text-body-secondary` (body color at .75 alpha) clears 4.5:1 on every stock body surface in both modes; `text-body-tertiary` (.5 alpha) measures 3.0–4.1:1 and is decoration or disabled only. Neither, nor `text-white-50`, is a quiet tier on a colored fill — take the same-hue token from [color-modes.md](color-modes.md) → Text tiers. Do not add emphasis text automatically to subtle fills, and do not replace a component's native foreground without inspecting its state contract.

### Display

```css
.d-none, .d-inline, .d-inline-block, .d-block, .d-grid, .d-inline-grid, .d-table, .d-table-cell, .d-table-row, .d-flex, .d-inline-flex
.d-{breakpoint}-none, .d-{breakpoint}-inline, .d-{breakpoint}-inline-block, .d-{breakpoint}-block, .d-{breakpoint}-grid, .d-{breakpoint}-inline-grid, .d-{breakpoint}-table, .d-{breakpoint}-table-cell, .d-{breakpoint}-table-row, .d-{breakpoint}-flex, .d-{breakpoint}-inline-flex
```

### Flexbox

```css
/* Direction */
.flex-row, .flex-column, .flex-row-reverse, .flex-column-reverse
.flex-{breakpoint}-row, .flex-{breakpoint}-column, .flex-{breakpoint}-row-reverse, .flex-{breakpoint}-column-reverse

/* Justify Content */
.justify-content-start, .justify-content-end, .justify-content-center, .justify-content-between, .justify-content-around, .justify-content-evenly
.justify-content-{breakpoint}-start, .justify-content-{breakpoint}-end, .justify-content-{breakpoint}-center, .justify-content-{breakpoint}-between, .justify-content-{breakpoint}-around, .justify-content-{breakpoint}-evenly

/* Align Items */
.align-items-start, .align-items-end, .align-items-center, .align-items-baseline, .align-items-stretch
.align-items-{breakpoint}-start, .align-items-{breakpoint}-end, .align-items-{breakpoint}-center, .align-items-{breakpoint}-baseline, .align-items-{breakpoint}-stretch

/* Align Self */
.align-self-start, .align-self-end, .align-self-center, .align-self-baseline, .align-self-stretch

/* Fill */
.flex-fill, .flex-{breakpoint}-fill

/* Grow/Shrink */
.flex-grow-0, .flex-grow-1, .flex-shrink-0, .flex-shrink-1

/* Wrap */
.flex-wrap, .flex-nowrap, .flex-wrap-reverse

/* Order */
.order-first, .order-0, .order-1, .order-2, .order-3, .order-4, .order-5, .order-last

/* Align Content */
.align-content-start, .align-content-end, .align-content-center, .align-content-between, .align-content-around, .align-content-stretch
```

### Float

```css
.float-start, .float-end, .float-none
.float-{breakpoint}-start, .float-{breakpoint}-end, .float-{breakpoint}-none
```

### Interactions

```css
.user-select-all, .user-select-auto, .user-select-none
.pe-none, .pe-auto        /* pointer-events */
```

`.pe-none` blocks pointer input only — keyboard and assistive tech can still reach the element. Pair with `tabindex="-1"` and `aria-disabled="true"`, or better, use the real `disabled` attribute on form controls and drop `href` on links.

### Link

```css
.link-primary, .link-secondary, .link-success, .link-danger, .link-warning, .link-info, .link-light, .link-dark
.link-body-emphasis
.link-opacity-10, .link-opacity-25, .link-opacity-50, .link-opacity-75, .link-opacity-100
.link-underline, .link-underline-primary (…per theme color)
.link-underline-opacity-0, .link-underline-opacity-10, .link-underline-opacity-25, .link-underline-opacity-50, .link-underline-opacity-75, .link-underline-opacity-100
.link-offset-1, .link-offset-2, .link-offset-3
```

Keep normal links on Bootstrap's link rules inside prose. Where most things are links — navigation, lists, tables — use `link-body-emphasis link-underline-opacity-0 link-underline-opacity-100-hover link-offset-2`: body tone, underline on hover and focus, and the one colored-link helper that adapts to dark mode; add `fw-semibold` where the link is the row's identity. For a brand underline that completes on hover: `link-underline-primary link-underline-opacity-50 link-underline-opacity-100-hover link-offset-2`. Do not replace hover/focus rules with a text-color utility.

### Object Fit

```css
.object-fit-contain, .object-fit-cover, .object-fit-fill, .object-fit-scale, .object-fit-none
.object-fit-{breakpoint}-contain, .object-fit-{breakpoint}-cover, .object-fit-{breakpoint}-fill, .object-fit-{breakpoint}-scale, .object-fit-{breakpoint}-none
```

### Opacity

```css
.opacity-0, .opacity-25, .opacity-50, .opacity-75, .opacity-100
```

Opacity is not a text tier: it reads as disabled and lets the surface show through the glyphs. Do not use whole-element opacity to quiet a region containing readable text. Color-opacity utilities affect only rules that consume their variable; stock subtle backgrounds do not consume `--bs-bg-opacity`. Measure the composited result rather than assuming a tint.

### Overflow

```css
.overflow-auto, .overflow-hidden, .overflow-visible, .overflow-scroll
.overflow-x-auto, .overflow-x-hidden, .overflow-x-visible, .overflow-x-scroll
.overflow-y-auto, .overflow-y-hidden, .overflow-y-visible, .overflow-y-scroll
```

### Position

```css
.position-static, .position-relative, .position-absolute, .position-fixed, .position-sticky
.fixed-top, .fixed-bottom
.sticky-top, .sticky-bottom
.top-0, .top-50, .top-100
.bottom-0, .bottom-50, .bottom-100
.start-0, .start-50, .start-100
.end-0, .end-50, .end-100
.translate-middle, .translate-middle-x, .translate-middle-y
```

### Shadows

```css
.shadow-none, .shadow-sm, .shadow, .shadow-lg
```

Three elevation steps: `shadow-sm` (`0 .125rem .25rem` at .075) for slightly raised cards and controls, `shadow` (`0 .5rem 1rem` at .15) for floating menus and a dragged item, `shadow-lg` (`0 1rem 3rem` at .175) for dialogs. Stock dropdowns, popovers, toasts, and modals all sit on `--bs-box-shadow`; lift a modal to the top step through `--bs-modal-box-shadow` ([bootstrap-reference.md](bootstrap-reference.md) → Elevation and depth). No shadow is a valid role.

### Sizing

Bootstrap ships exactly these — nothing else (no `.vw-25`, `.vh-50`, `.mw-auto`, or `.min-vh-75`; add missing steps through the utilities API if a project truly needs them — see [bootstrap-reference.md](bootstrap-reference.md)):

```css
/* Width / height (percent of parent) */
.w-25, .w-50, .w-75, .w-100, .w-auto
.h-25, .h-50, .h-75, .h-100, .h-auto

/* Max */
.mw-100, .mh-100

/* Viewport */
.vw-100, .vh-100, .min-vw-100, .min-vh-100
```

### Spacing

```css
/* Format: {property}{sides}-{size} or {property}{sides}-{breakpoint}-{size} */
/* Property: m (margin), p (padding) */
/* Sides: t, b, s (start), e (end), x, y, (blank) */
/* Size: 0, 1, 2, 3, 4, 5, auto (margins only) */

.m-0 … .m-5, .m-auto      .mt-* .mb-* .ms-* .me-* .mx-* .my-*   (same sizes, + auto)
.p-0 … .p-5               .pt-* .pb-* .ps-* .pe-* .px-* .py-*   (same sizes)

/* Gap — flex and grid parents */
.gap-0 … .gap-5
.row-gap-0 … .row-gap-5
.column-gap-0 … .column-gap-5
```

Notes: `s`/`e` are logical start/end — they flip automatically under RTL; never reach for physical left/right. `.g-*` / `.gx-*` / `.gy-*` are **row gutters** (used on `.row`), a separate system from `gap-*`. Negative margins exist in source but are disabled by default (`$enable-negative-margins`).

### Text

```css
/* Alignment */
.text-start, .text-center, .text-end
.text-{breakpoint}-start, .text-{breakpoint}-center, .text-{breakpoint}-end

/* Wrap / break */
.text-wrap, .text-nowrap, .text-break

/* Transform */
.text-lowercase, .text-uppercase, .text-capitalize

/* Weight / italics */
.fw-lighter, .fw-light, .fw-normal, .fw-medium, .fw-semibold, .fw-bold, .fw-bolder
.fst-normal, .fst-italic

/* Line height */
.lh-1, .lh-sm, .lh-base, .lh-lg

/* Family / reset / decoration */
.font-monospace, .text-reset
.text-decoration-none, .text-decoration-underline, .text-decoration-line-through

/* Size */
.fs-1, .fs-2, .fs-3, .fs-4, .fs-5, .fs-6

/* Truncate — needs a constrained inline width and block/inline-block layout */
.text-truncate
```

`fs-6…1` = 1 · 1.25 · 1.5 · 1.75 · 2 · 2.5 rem (16–40 px at the default root); `display-6…1` = 2.5–5 rem. Values above 1.25 rem scale down fluidly below a 1200 px viewport under RFS; `fs-5`, `fs-6`, `.lead`, and controls do not. There is no `rem` step below 1 rem: `.small` and `<small>` are `.875em`, so use one level only — `.small` inside `.small` is 12.25 px, off every scale — and take a 14 px or 12 px role from the generated `fs-sm`/`fs-xs` ([bootstrap-reference.md](bootstrap-reference.md) → Layout and type extensions). Stock 5.3 ships no letter-spacing utility; generate `ls-tight`/`ls-wide` there for display text and `text-uppercase` labels. `fw-light`/`fw-lighter` (300) belong only at display size; `.lead` and `display-*` ship at 300 by design.

The composition traps in this group:

- **`fs-*` without `lh-1` grows the row.** A resized glyph or mark keeps the parent's line-height, so the line box stretches and the row sits taller than its neighbors. Pair `fs-*` with `lh-1` on anything that is a mark rather than a paragraph.
- **`text-truncate` is not a minimum-size utility.** It sets hidden overflow, ellipsis, and no wrapping; it does not declare `min-width: 0`. Give the truncating element a constrained width and make its flex ancestry shrink where required. In a constrained column, protect a title from height loss with `flex-shrink-0`. Take any missing inline-size utility from the project's generated scale, never an invented `.min-w-0`.

### Vertical Align

```css
.align-baseline, .align-top, .align-middle, .align-bottom, .align-text-top, .align-text-bottom
```

### Visibility

```css
.visible, .invisible
```

### Z-index

```css
.z-n1, .z-0, .z-1, .z-2, .z-3    /* NOT responsive — no breakpoint classes exist */
```

## Spacing Scale

| Class  | Size                           |
| ------ | ------------------------------ |
| `0`    | 0                              |
| `1`    | $spacer \* .25 (0.25rem = 4px) |
| `2`    | $spacer \* .5 (0.5rem = 8px)   |
| `3`    | $spacer (1rem = 16px)          |
| `4`    | $spacer \* 1.5 (1.5rem = 24px) |
| `5`    | $spacer \* 3 (3rem = 48px)     |
| `auto` | auto                           |

Use the installed scale as the first choice. Assign its steps to internal, group, panel, and section
gaps; keep inter-group gaps larger than internal gaps. Compare adjacent steps before adding one.
The displayed pixel equivalents assume the default root size; they are not fixed pixel constraints.

The shipped jumps are +100 / +100 / +50 / +100 %: coarse above 16 px, with no 12 px or 32 px
step and nothing above 48 px for section rhythm. A missing step is not permission to type `p-2.5`
or `p-6`; those resolve to no rule and fail silently. Add a named step through
[bootstrap-reference.md](bootstrap-reference.md) → Layout and type extensions and verify the
generated class in the shipped build. Take type, width, and spacing decisions from
[frontend-design.md](frontend-design.md).

## Z-index Scale (components)

| Component          | Z-index |
| ------------------ | ------- |
| Dropdown           | 1000    |
| Sticky             | 1020    |
| Fixed              | 1030    |
| Offcanvas backdrop | 1040    |
| Offcanvas          | 1045    |
| Modal backdrop     | 1050    |
| Modal              | 1055    |
| Popover            | 1070    |
| Tooltip            | 1080    |
| Toast              | 1090    |

## Print Utilities

```css
.d-print-none, .d-print-inline, .d-print-inline-block, .d-print-block, .d-print-grid, .d-print-table, .d-print-table-cell, .d-print-table-row, .d-print-flex, .d-print-inline-flex
```

## Helpers

Helpers are single-purpose classes that sit alongside utilities.

- **`.visually-hidden`** — hide visually, keep for screen readers (icon-button labels, table caption text, "Danger:" prefixes).
- **`.visually-hidden-focusable`** — hidden until focused; the skip-link class. Never combine with `.visually-hidden`.
- **`.stretched-link`** — makes a whole `position-relative` container (for example, a card) the click target of one inner link, without wrapping everything in `<a>`.
- **`.ratio .ratio-16x9`** (also `1x1`, `4x3`, `21x9`, or `--bs-aspect-ratio`) — responsive embeds/iframes.
- **`.vstack` / `.hstack gap-*`** — shorthand vertical/horizontal flex stacks for quick toolbars and side rails.
- **`.vr`** — vertical rule divider inside an `.hstack` or flex row.
- **`.focus-ring`** (+ `.focus-ring-primary` … per theme color) — opt-in focus ring for custom interactive elements; tune through `--bs-focus-ring-width` (.25rem), `--bs-focus-ring-opacity` (.25), `--bs-focus-ring-color`, `--bs-focus-ring-x/y/blur`. Use it instead of `outline: none` hacks so keyboard focus stays visible.
- **`.icon-link`** (+ `.icon-link-hover`) — pairs a Bootstrap Icon SVG with a text link; icon auto-sizes to 1em; give decorative icons `aria-hidden="true"`. Hover shift through `--bs-icon-link-transform`.

## Enterprise notes (utilities)

### Composition habits

- **Spacing:** let the parent own rhythm with `gap-*`; use margins where the relationship requires
  them. Choose panel padding from the shared scale, not a separate value per card. Keep labels,
  controls, help, and errors closer together than neighboring groups: `.form-label` ships `.5rem`
  below, so field groups take `mb-3` or `row g-3`. Headings ship `margin-bottom: .5rem` and no top
  margin, so a section heading after a paragraph attaches to the wrong block — add `mt-4`/`mt-5`
  or let a `vstack gap-4` parent own the rhythm. In a row, `hstack gap-2` inside a group and
  `gap-4` between groups. Start a gap one step too large and step down.
- **Hierarchy:** use `fw-normal` for reading and `fw-semibold`/`fw-bold` for emphasis; headings
  ship at 500, barely a step above body on a system stack, so pair a smaller heading class with
  `fw-semibold` (`<h2 class="h5 fw-semibold">`) rather than a large heading at 500. Never
  `fw-light` on UI text. Start ordinary text and quiet status with inheritance; add
  `text-body-secondary` as the one quiet tier. Do not make metadata tiny or translucent to quiet
  it. Quiet a heavy icon beside a label with `text-body-secondary` on the icon, not a larger label.
  Quiet an active nav item's competitors (inherited text, normal weight) before making the active
  item louder.
- **Type:** `fs-*` changes size, not semantic heading level. Choose `lh-*` by the text's role;
  `lh-1` suits a glyph or suitable display treatment, not every paragraph. Keep prose start-aligned
  and bound its measure independently of wider content.
- **Baseline:** use `align-items-baseline` for mixed-size text on one row. Keep `align-items-center`
  for controls or icon/text combinations where the boxes, rather than text baselines, need to align.
- **Body surfaces:** `bg-body`, `bg-body-secondary`, and `bg-body-tertiary` track `data-bs-theme`.
  Keep ordinary text inherited on those surfaces; use an explicit pair only at an owned boundary.
  Take exceptions from [color-modes.md](color-modes.md).
- **Opacity:** do not use `text-white-50`, `text-black-50`, or `text-opacity-*` as the default secondary
  tier. On colored fills, inherit the tested foreground or use a scoped opaque token. Any opacity
  changes the composited contrast, including opacity on an ancestor.
- **Width:** use `w-100` inside a content-led maximum width, not `w-50` merely to avoid a wide form.
  Stock Bootstrap has no prose-measure, fixed-rail, or zero-inline-minimum utility. Generate needed
  roles through [bootstrap-reference.md](bootstrap-reference.md) → Layout and type extensions.
- **Flex floors:** allow a flexible main region to shrink without clipping its essential content.
  Protect titles or marks that must retain height with `flex-shrink-0`. Do not add `overflow-hidden`
  to an ancestor to conceal a layout bug; it can clip menus and focus rings.
- **Toolbars:** start with `d-grid gap-2` or labelled `row g-2` controls; expand with `d-sm-flex
flex-sm-wrap` or `col-md-auto` only when the container fits. Do not default to a horizontal
  scroller for search or primary actions. Keep matching control sizes and usable hit areas. Align equal-height
  cards only where their content benefits, not to fill empty space.
- **Responsive content:** follow [responsive-layout.md](responsive-layout.md); unprefixed utilities define the complete narrow task. A class that resolves can still implement the wrong layout. Reflow and prioritize before truncating. Hide a button caption only when
  its remaining icon is recognizable and its accessible name remains complete; unfamiliar or
  consequential actions keep visible labels. Do not erase task information to save the brand's width.
- **Links:** use persistent underlines for inline prose links. In conventional navigation, quieter
  color and weight can carry hierarchy; retain visible hover and focus. Never rely on hover alone
  for discovery. An action remains a button even when styled with `btn-link`.
- **RTL:** use `ms-*`/`me-*`/`ps-*`/`pe-*`, `text-start`/`text-end`, and logical custom properties;
  verify the matching RTL build and the content's writing direction.
- **Density:** drive compact/comfortable variants from shared tokens or a wrapper, not scattered
  per-element tweaks. Dense data retains readable text and ≥24px control targets.
- **Boundaries and depth:** separate with spacing first, then a surface change, then a shadow, then
  a line: `bg-body-tertiary` panels instead of bordered ones; `card border-0 shadow-sm` on a page
  surface that differs from the card; `list-group-flush`, `accordion-flush`, `table-borderless`,
  `border-0` on a `card-header`; `gap-4` instead of an `<hr>`. Remove a border where a distinct
  background already separates. Use `border-0` or `shadow-none` only when grouping and control
  recognition survive. Assign `shadow-sm`, `shadow`, and `shadow-lg` by layer role; do not shadow
  every panel or replace the focus indicator with depth. A `bg-body` panel on `bg-body-tertiary`
  reads raised and `bg-body-secondary` inside `bg-body` reads inset — depth with no shadow, in
  both modes.
- **Accents and decoration:** one accent border per region (see [Borders](#borders)); the shipped
  `nav-underline` is the active-item accent. Alternate `bg-body` and `bg-body-tertiary` sections
  before decorating; a `bg-primary-subtle` band emphasizes one panel. `bg-gradient` is a
  white-to-transparent fade over the current fill, not a hero gradient.
- **Overlap:** `position-relative translate-middle-y` for a card that straddles two surfaces;
  `mt-n*` only after `$enable-negative-margins`. Ring an overlapping avatar in the body color
  with `rounded-circle border border-3` plus the `ring-body` class from
  [bootstrap-reference.md](bootstrap-reference.md) → Elevation and depth, never `border-white`.
- **Images:** combine a declared frame or ratio with `object-fit-cover` only when cropping is safe;
  take `object-fit-contain` when the whole asset matters. Guard a user upload against bleeding into
  a same-color surface with `border border-black border-opacity-10` — translucent, so it does not
  clash with the photo. Reduce a photo's dynamics before placing text on it: a `bg-dark
bg-opacity-50` (or `-75`) overlay layer under `card-img-overlay`, measured at every crop. Keep a
  small glyph near 16–24 px inside `rounded-circle bg-primary-subtle p-3` rather than scaling it up.
  Keep useful image detail and icon optical size rather than stretching assets to fill a box.
- **Lists and quotes:** `list-unstyled` with a meaningful glyph per item (`d-flex gap-2
align-items-baseline`, glyph `aria-hidden="true"`); `.blockquote` with `.blockquote-footer`.
- **Print:** mark chrome `d-print-none` and keep results readable; do not hide data merely because
  its interactive controls have no print role.

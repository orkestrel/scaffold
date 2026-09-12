# Bootstrap 5 Deep Reference — Theming, Forms, JS, Accessibility, Enterprise Patterns

> Part of the `enterprise-bootstrap` package. Bootstrap **5.3.x**.
> Component markup lookups: [components.md](components.md). Utility classes: [utilities.md](utilities.md).
> This file holds what those do not: setup, color modes, theming/tokens, forms in
> production, the JS lifecycle, accessibility depth, and enterprise app patterns.

## Contents

- [Quick start](#quick-start)
- [Breakpoints & layout](#breakpoints--layout)
- [Color modes (light / dark / custom)](#color-modes-light--dark--custom)
- [Theming & design tokens](#theming--design-tokens) — [Define the working scales](#define-the-working-scales) · [Elevation and depth](#elevation-and-depth) · [Layout and type extensions](#layout-and-type-extensions)
- [Forms in production](#forms-in-production)
- [JavaScript lifecycle](#javascript-lifecycle)
- [Accessibility](#accessibility)
- [Enterprise patterns](#enterprise-patterns) — [App shell](#app-shell) · [Dense data tables](#dense-data-tables) · [Filter & search bars](#filter--search-bars) · [Wizards & multi-step forms](#wizards--multi-step-forms) · [The data states](#the-data-states) · [Feedback discipline](#feedback-discipline) · [Destructive actions](#destructive-actions)
- [RTL](#rtl)
- [Print](#print)
- [Performance](#performance)
- [When not to hand-roll](#when-not-to-hand-roll)
- [Common layout patterns](#common-layout-patterns)

## Quick Start

Pinned CDN example (5.3.8). Prefer the installed compatible version; this is not an upgrade instruction:

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>App</title>
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
			rel="stylesheet"
		/>
	</head>
	<body>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
	</body>
</html>
```

- `bootstrap.bundle.min.js` includes Popper (needed by dropdowns, tooltips, popovers). Without the bundle, load `@popperjs/core` yourself first.
- Under a strict CSP, add per-file SRI `integrity` hashes — regenerate them from the CDN for the exact version; never copy hashes across versions.
- In a project with a bundler, prefer the installed `bootstrap` package (and its Sass source) over the CDN — see [Performance](#performance).

## Breakpoints & Layout

Start with the feature's content and narrow layout, then choose its container and breakpoints.
Take the region contract, content parity, and test matrix from [responsive-layout.md](responsive-layout.md).
Use fluid columns for content that needs to scale together; keep rails, forms, and reading measures
bounded where it does not. A full-width shell does not require full-width text or fields.
Take the missing role-based utilities from [Layout and type extensions](#layout-and-type-extensions).

Give a form, dialog, or login card a content-led maximum and let it shrink only when the viewport
is narrower: `w-100 mx-auto measure-form`, not `col-md-8 offset-md-2 col-lg-6 offset-lg-3`, whose
width changes at every breakpoint and is narrower on `lg` than at some `md` widths. Give a
sidebar a fixed rail (`shell-rail-lg-fixed flex-shrink-0`) beside a flexible `min-inline-0` main
region, not `col-3`, which grows on wide screens and collapses below its minimum on narrow ones.
Put supporting explanation beside a narrow form in a second column rather than widening its
fields. Percentage widths belong only where columns must scale together.

| Breakpoint  | Class Infix | Dimensions |
| ----------- | ----------- | ---------- |
| Extra small | (none)      | <576px     |
| Small       | `sm`        | ≥576px     |
| Medium      | `md`        | ≥768px     |
| Large       | `lg`        | ≥992px     |
| Extra large | `xl`        | ≥1200px    |
| XXL         | `xxl`       | ≥1400px    |

```html
<div class="container">Fixed-width responsive container</div>
<div class="container-fluid">Full-width container (app shells)</div>
<div class="container-md">100% until md, then fixed</div>

<div class="container">
	<div class="row">
		<div class="col">Auto-width column</div>
		<div class="col-6">6 of 12 columns</div>
		<div class="col-md-4">4 columns on md+</div>
	</div>
	<div class="row row-cols-1 row-cols-md-3 g-4">
		<div class="col">Equal cards per row, 1 → 3 across breakpoints</div>
	</div>
</div>

<div class="row g-0">No gutters</div>
<div class="row g-3">1rem gutters</div>
<div class="row gx-5 gy-3">Independent horizontal/vertical gutters</div>
```

## Color Modes (light / dark / custom)

The 5.3 color-mode system replaces the old per-component `*-dark` classes.

### Mechanics

Read [color-modes.md](color-modes.md) before choosing color classes or repairing a theme failure.
It owns inheritance, adaptive-versus-fixed families, surface boundaries, and component exceptions.
Use the installed build's attribute or media-query strategy; do not assume every `--bs-*` variable
changes with the mode.

### Author rules

Preserve ordinary text inheritance and native component states. Prefer adaptive body/subtle
surfaces. Establish an explicit foreground only at an owned solid or mode boundary, or for a
measured role that requires it. Do not turn every subtle panel into a custom color pair.

### Theme toggle

Reuse the host controller. When implementing one, follow [Scope the mode](color-modes.md#scope-the-mode)
for validated preference, automatic-mode resolution, storage failure, first paint, and overlay
mounts. Bootstrap ships no picker; an attribute example is not a complete controller.

### Custom modes

Add a custom mode only when the brief requires it. Map its used body, surface, link, border,
validation, and component-state variables, including RGB companions. Resolve embedded component
images and `color-scheme` where relevant. Do not claim a complete mode from a partial token block.

In Sass, use `$enable-dark-mode`, `$color-mode-type: data` for local attribute scopes, or
`media-query` for system-driven mode without per-component scoping. Use `color-mode()` rather than
competing selectors; keep overrides in the host theme source.

## Theming & Design Tokens

### The tiered token model

Keep literal values in declared primitives, map primitives to semantic roles, and let component
variables consume those roles. Reuse Bootstrap's `--bs-*` semantic and component layers rather
than adding a parallel palette. Name semantics by purpose, not a particular shade.

Distinguish token structure from runtime behavior. Bootstrap also generates fixed values through
Sass; a component variable is not necessarily mode-adaptive. Map the actual consumer, including its
states, and resolve aliases at the scope where they must change. Take the constraints from
[Extend the theme](color-modes.md#extend-the-theme).

### Define the working scales

Reuse the installed theme and its scales first. Declare new values only for a role the feature
needs; refine one shared definition instead of accumulating per-component exceptions. Every
system below has a Bootstrap source, a utility, and a known gap; extend the source, never the
markup.

| System         | Sass source                                                 | Utility                                       | Stock steps (default root)                       | Gap                                                                              |
| -------------- | ----------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| Font size      | `$font-sizes`, `$h1…h6-font-size`, `$display-font-sizes`    | `fs-1…6`, `.h1…h6`, `display-1…6`             | 16 · 20 · 24 · 28 · 32 · 40 px; display 40–80 px | No `rem` step below 16 px; `.small` is `.875em`                                  |
| Font weight    | `$font-weight-*`, `$headings-font-weight`                   | `fw-light…bold`                               | 300 · 400 · 500 · 600 · 700; headings 500        | Headings barely heavier than body                                                |
| Line height    | `$line-height-*`, `$headings-line-height`                   | `lh-1`, `lh-sm`, `lh-base`, `lh-lg`           | 1 · 1.25 · 1.5 · 2; headings 1.2                 | —                                                                                |
| Color          | `$gray-100…900`, `$blue-100…900` …, `$theme-colors`, triads | `text-*`, `bg-*`, `border-*` families         | 9 shades per hue; subtle/emphasis per role       | Ramps are mechanical mixes ([color-modes.md](color-modes.md) → Extend the theme) |
| Spacing        | `$spacers`                                                  | `m-*`, `p-*`, `gap-*`, `g-*`                  | 0 · 4 · 8 · 16 · 24 · 48 px                      | No 12 or 32 px; nothing above 48 px                                              |
| Width          | `$container-max-widths`, the grid                           | `w-*`, `mw-100`, `col-*`                      | 25 / 50 / 75 / 100 %                             | No content-led maximums                                                          |
| Shadow         | `$box-shadow`, `-sm`, `-lg`, `-inset`                       | `shadow-sm`, `shadow`, `shadow-lg`            | 3 steps                                          | Single-layer; modal shares the dropdown step                                     |
| Radius         | `$border-radius*`, `$enable-rounded`                        | `rounded-0…5`, `-pill`, `-circle`             | 0 · 4 · 6 · 8 · 16 · 32 px                       | —                                                                                |
| Border width   | `$border-widths`                                            | `border-1…5`                                  | 1–5 px                                           | Sets every side at once                                                          |
| Opacity        | —                                                           | `opacity-*`, `text-opacity-*`, `bg-opacity-*` | 0 · 10 · 25 · 50 · 75 · 100                      | Not a text tier                                                                  |
| Letter-spacing | —                                                           | none                                          | —                                                | Generate ([Layout and type extensions](#layout-and-type-extensions))             |

- **Color:** neutral, brand, and required status/categorical ramps. Pick base, light surface, and
  dark text shades in real components, then fill the gaps. Use HSL when it helps tune related
  shades; keep the project's existing format. Review fixed shade pairs in each theme rather than
  generating a new `lighten`, `darken`, or `color-mix` result at each use site. Stock ramps and
  triads are tint/shade mixes with a fixed hue; override the nine shade variables and six triad
  variables per brand hue, and the nine greys as one temperature-matched set
  ([color-modes.md](color-modes.md) → Extend the theme).
- **Type:** display/body/utility roles, finite `rem` sizes, working weights, and line-height per
  role. Roles may share a font. RFS scales sizes above 1.25 rem down below a 1200 px viewport
  (`h1`–`h4`, `display-*`, `fs-1`–`fs-4`); body, `fs-5`, `fs-6`, `.lead`, and controls hold — do not
  fight it with `em` heading sizes. Take 14 px and 12 px roles from generated `fs-sm`/`fs-xs`, not
  nested `.small`. Never globally scale body text down to make a display treatment fit.
- **Space and size:** internal, group, panel, and section gaps; control sizes; reading/form widths;
  rail width. Start with Bootstrap's shipped scale. Add a missing step through the utilities API
  only where the adjacent steps cannot express the intended relationship. Button sizes already
  scale padding faster than font (4/8 px at 14 px, 6/12 at 16, 8/16 at 20); use the three shipped
  sizes rather than deriving one with `em` padding.
- **Radius and elevation:** a small consistent family, assigned to real component/layer roles.
  Set `$border-radius` once and let components inherit it; do not hand-mix `rounded-*` per
  element. Reuse component variables and shadow utilities ([Elevation and depth](#elevation-and-depth)).
  No shadow is a valid surface role.

Record these roles in the existing token source or a compact design contract, not a second design
system. Keep literal colors and raw scale values in named primitive definitions; component rules
consume semantic or component tokens. [inspection.md](inspection.md) → Token discipline checks
that boundary; [frontend-design.md](frontend-design.md) owns the visual choices.

### Elevation and depth

Three shipped steps — `--bs-box-shadow-sm` (`0 .125rem .25rem` at .075), `--bs-box-shadow`
(`0 .5rem 1rem` at .15), `--bs-box-shadow-lg` (`0 1rem 3rem` at .175) — plus
`--bs-box-shadow-inset`. Assign by z-position: `sm` for raised cards and controls, base for
floating menus and a dragged item, `lg` for dialogs. Stock dropdowns, popovers, toasts, and
modals all sit on `--bs-box-shadow` (modal: `-sm` below 576 px), which puts a blocking dialog at
dropdown elevation. Lift it at rung 3, in the project stylesheet after Bootstrap's so the rule
wins the `sm`-up media rule:

```css
.modal {
	--bs-modal-box-shadow: var(--bs-box-shadow-lg);
}
```

Two-part shadows — a broad cast plus a tight contact shadow that fades with elevation — are a
token change: redefine `$box-shadow-sm`, `$box-shadow`, and `$box-shadow-lg` as two-layer values
and every consumer follows.

`$enable-shadows: true` (off by default) paints light-from-above on controls: buttons take
`inset 0 1px 0 rgba(#fff, .15), 0 1px 1px rgba(#000, .075)` (lit top edge, tight cast shadow),
inputs `inset 0 1px 2px rgba(#000, .075)` (recessed), and an active button `inset 0 3px 5px`
(pressed). Enable it when the direction wants tactile controls, and verify both modes; the alphas
are fixed white and black. Without the flag the `box-shadow` mixin emits nothing, so
`--bs-btn-box-shadow` and `--bs-box-shadow-inset` have no consumer and a rung-3 override does
nothing; the recipe is then a proposed rule.

Flat depth: a `bg-body` panel on `bg-body-tertiary` reads raised and `bg-body-secondary` inside
`bg-body` reads inset, both mode-adaptive with no shadow. A hard offset shadow is a `$box-shadow`
override.

Overlap: `position-relative translate-middle-y`, or `mt-n*` after `$enable-negative-margins`.
Ring overlapping images in the surface color through the border variable so the ring follows the
mode, where `border-white` does not:

```css
.ring-body {
	--bs-border-color: var(--bs-body-bg);
}
```

Then `rounded-circle border border-3 ring-body`.

### The CSS-variables-only path (no Sass build)

Use native components and adaptive utilities before adding overrides. For a recurring component
surface role, use its local variable rather than repainting the whole component. This optional
project-defined class changes the card background without assigning a foreground:

```css
.card-quiet {
	--bs-card-bg: var(--bs-tertiary-bg);
}
```

Use `class="card card-quiet"` only after declaring that extension in the host theme stylesheet.
Do not add it when `card bg-body-tertiary` already expresses the requirement. Measure the card's
inherited foreground and its header/footer layers in the loaded skin.

When a custom button variant is required, define rest, hover, focus, active/checked, and disabled
component variables as one contract. Include borders and the focus-ring RGB value; test busy
content without changing geometry. Do not generate a custom tinted button merely to distinguish a
secondary action, and do not assume reversing a subtle/emphasis pair produces valid states.
Changing root `--bs-primary` alone does not rebuild Sass-generated button states or utility RGB
consumers; follow [Extend the theme](color-modes.md#extend-the-theme).

### The Sass path (compiled builds)

Import order matters — override maps **before** the files that consume them:

```scss
@import 'bootstrap/scss/functions';
// your $variable overrides here ($primary, $font-family-base, $border-radius…)
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/variables-dark';
// your map overrides here ($theme-colors, $spacers, $grid-breakpoints…)
@import 'bootstrap/scss/maps';
@import 'bootstrap/scss/mixins';
@import 'bootstrap/scss/root';
// …only the parts you use…
@import 'bootstrap/scss/utilities';
@import 'bootstrap/scss/utilities/api'; // generates utilities — keep LAST
```

Feature flags worth knowing: `$enable-dark-mode`, `$enable-rounded`, `$enable-shadows` (light-from-above button/input/active shadows, [Elevation and depth](#elevation-and-depth)), `$enable-gradients` (a white fade on every `bg-*`; not a two-hue gradient), `$enable-rfs` (sizes above 1.25 rem shrink below 1200 px), `$enable-validation-icons`, `$enable-negative-margins` (`mt-n*` for overlap), `$enable-important-utilities`, `$enable-reduced-motion`. For added theme colors, extend the light/dark emphasis and subtle maps and inspect the generated utility-value maps; see [Extend the theme](color-modes.md#extend-the-theme). Do not infer a generated class from a token alone.

### Utilities API

All utilities generate from the `$utilities` Sass map — extend the system instead of writing one-off CSS. Definition keys: `property`, `values` (required), plus `class`, `state`, `responsive`, `rfs`, `print`, `rtl`, `css-var`, `local-vars`.

```scss
// After functions/variables/variables-dark/maps/mixins/utilities:
$utilities: map-merge(
	$utilities,
	(
		'cursor': (
			property: cursor,
			class: cursor,
			values: auto pointer grab,
		),
		// Modify an existing utility: make width responsive.
		'width': map-merge(
				map-get($utilities, 'width'),
				(
					responsive: true,
				)
			),
	)
);
@import 'bootstrap/scss/utilities/api';
```

Remove with `map-remove($utilities, "width")` or set the key to `null`. This is the sanctioned answer when the shipped scale is missing a step (for example, a `vh-50` the design truly needs).

### Layout and type extensions

These are **project-generated classes**, not stock Bootstrap utilities. Use the existing project
roles when present. Otherwise add only the needed entries; the values below are illustrative role
definitions, not universal sizes.

Scale steps go in the map-override slot (after `variables-dark`, before `maps`). Keys `0`–`5`
keep their shipped meaning; an intermediate 12 px or 32 px step is a new key, never a decimal.
`$font-sizes` feeds only the `fs-*` utility in 5.3.8, and RFS leaves values at or below 1.25 rem
alone, so extending it is safe:

```scss
$spacers: map-merge(
	$spacers,
	(
		6: $spacer * 4,
		7: $spacer * 6,
	)
); // 64px section gap, 96px page rhythm
$font-sizes: map-merge(
	$font-sizes,
	(
		sm: 0.875rem,
		xs: 0.75rem,
	)
); // fs-sm 14px captions, fs-xs 12px eyebrows only
```

Role utilities go after importing `utilities` and before `utilities/api`:

```scss
$utilities: map-merge(
	$utilities,
	(
		'content-measure': (
			property: max-inline-size,
			class: measure,
			values: (
				prose: 65ch,
				form: 36rem,
			),
		),
		'shell-rail': (
			property: inline-size,
			class: shell-rail,
			responsive: true,
			values: (
				fixed: 16rem,
			),
		),
		'inline-minimum': (
			property: min-inline-size,
			class: min-inline,
			values: (
				0: 0,
			),
		),
		'table-viewport': (
			property: max-block-size,
			class: max-block,
			responsive: true,
			values: (
				table: 70vh,
			),
		),
		'tabular-figures': (
			property: font-variant-numeric,
			class: figures,
			values: (
				tabular: tabular-nums,
			),
		),
		'letter-spacing': (
			property: letter-spacing,
			class: ls,
			values: (
				tight: -0.02em,
				wide: 0.05em,
			),
		),
	)
);
// Generate once, after all utility-map additions:
@import 'bootstrap/scss/utilities/api';
```

Use `w-100 measure-form` for a bounded form, `measure-prose` for a reading column,
`shell-rail-lg-fixed flex-shrink-0` for an inline desktop rail, `min-inline-0` for its flexible
sibling, `max-block-lg-table` only for a warranted wide-screen bounded table scroller, `figures-tabular` for comparable
quantities, `ls-tight` on `display-*` and `fs-1`, and `ls-wide` with `text-uppercase` labels (`em`
is correct for tracking: it follows the element's own size). Verify those selectors in the
compiled output before using the examples below. The font must support tabular figures. A `ch`
measure is a starting width, not a character-count proof.

Without a Sass build, take an existing equivalent; otherwise propose the smallest stylesheet rule
under [SKILL.md](../SKILL.md) → When custom CSS is justified. Never ship an unresolved utility name.

## Forms in Production

### Layout & labels

- **Top-aligned labels by default** — keep a consistent single-column scan. Reserve side labels for a deliberate dense layout that still reads correctly at narrow widths.
- Visible label or `.form-floating` — never placeholder-only (disappears on input, fails accessibility).
- **Name the form without duplicating its heading.** Associate the form with an existing visible title through `aria-labelledby` where useful. Keep each control's own visible label; a form name does not label its fields.
- Use one field column by default; add columns only for genuinely related fields. At wide widths,
  put supporting explanation beside the form rather than stretching its fields.
- Keep each label, control, help text, and error in one group. Use a smaller internal gap than the
  gap to the next field group, and recheck the relationship when errors or long labels wrap.

```html
<form class="row g-3">
	<div class="col-12">
		<label for="inputEmail4" class="form-label">Email</label>
		<input type="email" class="form-control" id="inputEmail4" aria-describedby="emailHelp" />
		<div id="emailHelp" class="form-text">Work address preferred.</div>
	</div>
	<div class="col-12">
		<label for="inputPassword4" class="form-label">Password</label>
		<input type="password" class="form-control" id="inputPassword4" />
	</div>
	<div class="col-12">
		<button type="submit" class="btn btn-primary">Sign in</button>
	</div>
</form>
```

### Validation timing (the rules that matter)

- Validate a field **on blur** — after the user leaves it — never on every keystroke, and never before the user has reached the field. Exception: live feedback that _helps_ while typing (password strength, username availability, character counts).
- After a field enters an error state, re-validate as the user types so they see the fix land.
- Always re-check everything on submit. Keep the submit button **enabled** — a disabled submit hides _what is_ wrong; a validating submit shows it.
- On failed submit of a long form, render an **error summary** at the top (focus it; link each item to its field) _and_ inline messages at each field — never summary-only, never inline-only.
- Error style = color + icon + text, stating what is wrong and how to fix it. Wire message to field with `aria-describedby`, mark the field `aria-invalid="true"`. Never report errors through a hover tooltip.

### Bootstrap validation mechanics

Client-side, the documented pattern:

```html
<form class="needs-validation" novalidate>
	<div class="mb-3">
		<label for="name" class="form-label">First name</label>
		<input type="text" class="form-control" id="name" required />
		<div class="invalid-feedback">Enter your first name.</div>
	</div>
	<button class="btn btn-primary" type="submit">Submit</button>
</form>

<script>
	;(() => {
		'use strict'
		const forms = document.querySelectorAll('.needs-validation')
		Array.from(forms).forEach((form) => {
			form.addEventListener(
				'submit',
				(event) => {
					if (!form.checkValidity()) {
						event.preventDefault()
						event.stopPropagation()
					}
					form.classList.add('was-validated')
				},
				false,
			)
		})
	})()
</script>
```

**Documented limitation (enterprise-critical):** Bootstrap's client-side validation styles and `valid/invalid-tooltip`s are **not exposed to assistive technologies**. For accessible flows use the server-side pattern — apply `.is-invalid` / `.is-valid` directly (no `.was-validated` parent needed), with `.invalid-feedback` linked through `aria-describedby` — or rely on native browser validation.

```html
<input
	type="text"
	class="form-control is-invalid"
	id="username"
	aria-describedby="usernameFeedback"
	aria-invalid="true"
	required
/>
<div id="usernameFeedback" class="invalid-feedback">
	Choose a username — letters and digits only.
</div>
```

Details: input groups with feedback need `.has-validation` on the group (border-radius fix). `.valid-tooltip` and `.invalid-tooltip` need a `position-relative` parent. Validation colors are mode-adaptive through `--bs-form-valid-color`, `--bs-form-valid-border-color`, `--bs-form-invalid-color`, `--bs-form-invalid-border-color`.

### Autosave vs explicit save

- **Autosave** (with a visible "Saved" status) for continuous low-risk editing: drafts, preferences, notes.
- **Explicit, pessimistic save** for audited, transactional, or financial records — a deliberate server-confirmed commit, no optimistic success on data that must be validated and logged.

## JavaScript Lifecycle

### Initialization

- Data-attribute components initialize from markup. **Tooltips and popovers are opt-in** — construct them; toasts are hidden until shown ([components.md](components.md) → JavaScript initialization).
- Constructors accept an element or a CSS selector string: `new bootstrap.Modal('#myModal', options)`.
- Prefer `getOrCreateInstance` when an instance may already exist; `getInstance` returns `null` if none:

```js
const modal = bootstrap.Modal.getOrCreateInstance('#confirm', { backdrop: 'static' })
modal.show()
```

### Events & async behavior

- Event pairs per component: infinitive fires at start and is cancelable (`show.bs.modal` → `event.preventDefault()`); past participle fires after the transition completes (`shown.bs.modal`, `hidden.bs.modal`, `shown.bs.collapse`, …).
- **All methods are asynchronous** — they return before the transition ends, and a method called on a transitioning component is ignored. Sequence work off the completion events, not timers.

### Teardown — SPAs and dynamic views

- `dispose()` destroys the instance and its DOM data. Call it when the host element leaves the DOM (route change, list re-render), or instances and listeners leak. Dispose only after any transition finishes:

```js
el.addEventListener('hidden.bs.modal', () => {
	bootstrap.Modal.getInstance(el)?.dispose()
})
```

- **Framework reality check:** Bootstrap's JS and a virtual-DOM framework both mutating the same nodes causes bugs (stuck dropdowns, ghost backdrops). In React/Vue/Angular apps, prefer the framework-native implementations (React Bootstrap, BootstrapVueNext, ng-bootstrap) which reuse Bootstrap's CSS but own the DOM. Use raw `bootstrap.*` JS in SPAs only for leaf widgets you fully control, and dispose them on unmount.

### Popper

Dropdowns, tooltips, and popovers require Popper — load `bootstrap.bundle.min.js` (includes it) or `@popperjs/core` before `bootstrap.min.js`. Modal, collapse, offcanvas, toast, tab, alert do not need it.

## Accessibility

### Baseline (every screen)

Hold the baseline in [SKILL.md](../SKILL.md) → Accessibility baseline. Its Bootstrap-specific parts:

- Skip link: `.visually-hidden-focusable` to `<main>`. Landmarks: `nav`, `main`, `aside`. Heading order `h1 → h2 → h3` without skips.
- Keep Bootstrap's focus rings; use the `.focus-ring` helper on custom interactive elements instead of removing outlines.
- `.visually-hidden` for screen-reader-only text; `.visually-hidden-focusable` for skip links. Never combine the two.
- Verify every color pairing against the shipped cascade. Bootstrap's own docs warn that parts of the default palette fall short.

**Measuring the bars:**

- Hold the bars from [SKILL.md](../SKILL.md) → Surfaces, color, contrast: **≥ 4.5:1** for everything information-bearing, **≥ 3:1** for textless marks and state chrome. WCAG 2.2 permits 3:1 for large text; this package does not — size grants no lower tier.
- Measure each declared theme from the compiled cascade, never from token names. A light-theme result does not establish a dark-theme result, and a skin's values are its own.
- Focus rings and hover fills are UI graphics: they are in scope for the 3:1 bar.
- Disabled controls are exempt from the bars by the spec. That exemption covers legibility, not meaning — see [Destructive actions](#destructive-actions) for the one disabled state that still has to change color.

**The instrument.** Bootstrap paints in translucent layers: a card header and footer are a 3% tint of the body color over the card's own background. A reader that stops at the first painted ancestor and drops its alpha treats that tint as full-strength paint, and is then wrong in **both** directions — it green-lights a pairing nobody can read, and it red-flags one that reads fine. Use a reader that:

- collects every painted layer from the element upward to the first opaque one, then composites them top over bottom (Porter-Duff `over`) onto that opaque base;
- composites a translucent foreground over that result before taking the ratio, rather than reading the declared color;
- measures each declared theme in the same run, since a theme swap re-points the tokens under every layer;
- carries a negative control drawn from outside the population it covers — a pairing known to fail — and voids the run if that negative control passes.

Include ancestor opacity in the painted stack. For images, gradients, masks, or blend modes the
reader does not support, use a suitable rendered-background measurement or leave the pairing open;
never flatten a variable background to its average color. Name reached states beside every result.
Wire the reader into the suite once it has settled a question.

### WCAG 2.2 deltas that bite dense app UI

- **Target size ≥ 24×24 CSS px (2.5.8, AA).** Icon buttons, row actions, close buttons, sort carets, checkbox hit-areas. A smaller visual target passes if a 24px spacing circle around it stays undisturbed — so in tight `table-sm` toolbars, pad the hit area rather than enlarging the glyph.
- **Focus not obscured (2.4.11, AA).** Sticky headers/footers/action bars and toast overlays must not bury the focused element. Reserve space with `scroll-margin-top` on focusables (or `scroll-padding-top` on the scroll container) equal to the sticky chrome height.
- **Dragging alternatives (2.5.7, AA).** Any drag (row reorder, kanban, slider, resize) needs a non-drag single-pointer path: move up/down buttons, numeric input, click-to-place.
- **Accessible authentication (3.3.8, AA).** Never block paste in password/OTP fields; support password managers; no puzzle as the only way in.
- **Redundant entry (3.3.7, A).** Do not ask for the same information twice in one flow — auto-fill or offer "same as above". Governs wizards directly.
- **Consistent help (3.2.6, A).** If a help affordance repeats across pages, keep it in the same relative place everywhere.
- Housekeeping: SC 4.1.1 Parsing was removed in 2.2 — duplicate-ID lint is no longer a WCAG failure by itself (still fix it).

### Pattern contracts (APG, compact)

- **Dialog/modal:** `role="dialog"` (`alertdialog` for destructive confirms) + `aria-modal="true"` + `aria-labelledby`. Focus moves in on open, Tab is trapped, Esc closes, focus returns to the invoker. Bootstrap's modal does this — verify you did not break focus-return by removing the trigger.
- **Tabs:** `tablist` > `tab` (+`aria-selected`, `aria-controls`) with panels `tabpanel`. Roving tabindex: Left/Right between tabs, Home/End to ends; only the selected tab is `tabindex="0"`.
- **Disclosure:** a `<button>` with `aria-expanded` + `aria-controls`. Enter/Space toggles. That is the whole contract — Bootstrap collapse matches it.
- **Radio group:** prefer native `<input type="radio" name>` — one tab stop and arrow-selection come free.
- **Combobox:** input `role="combobox"` + `aria-expanded` + `aria-controls` + `aria-activedescendant` tracking the active option; Down opens/advances, Enter accepts, Esc closes. This is the hardest contract on the list — see [When not to hand-roll](#when-not-to-hand-roll).
- **Toolbar:** `role="toolbar"` + `aria-label`; one tab stop, arrows move between controls (roving tabindex). Use it to collapse a dense button cluster's tab-stops.
- **Table vs grid:** semantics follow _interaction_, not looks — see [Dense data tables](#dense-data-tables).

### Focus management in SPAs

Browsers handle focus on full page loads; in an SPA **you** do:

- On route change, move focus to the new view's `h1` (or the `<main>` with `tabindex="-1"`) so SR users hear where they landed.
- On failed submit, focus the error summary. On a compact destructive confirm, focus the safe action; in a scrolling or structured dialog, focus a static heading at the start when an action would scroll its context away.
- After deleting a row, move focus to a sensible neighbor (next row / the table region), never let it fall to `<body>`.
- Anything focused programmatically under sticky chrome needs the `scroll-margin-top` offset (2.4.11 above).

### Reduced motion

Bootstrap wraps its transitions and animations (`.fade`, `.collapsing`, carousel slide, spinner speed) in `prefers-reduced-motion: reduce` handling — transitions are disabled or slowed automatically when `$enable-reduced-motion` is on (default). Your obligations: wrap **custom** animation in `@media (prefers-reduced-motion: no-preference)`, do not auto-play movement for reduced-motion users, and keep any purely decorative motion cuttable.

## Enterprise Patterns

### App shell

**Structure:** reuse the product's shell. For a new product, let implemented features and their
navigation needs decide between a sidebar and a shallow top bar; do not design the shell first.
Give an inline rail a content-led width and the task the remaining space. A collapsible rail can
reclaim width for comparison data.

The Bootstrap implementation — a responsive offcanvas that renders inline above `lg` and becomes a drawer below it, with no custom JS:

```html
<body>
	<a class="visually-hidden-focusable" href="#main">Skip to main content</a>
	<header class="navbar bg-body-tertiary border-bottom sticky-top">
		<div class="container-fluid">
			<button
				class="btn btn-secondary d-lg-none"
				type="button"
				data-bs-toggle="offcanvas"
				data-bs-target="#appSidebar"
				aria-controls="appSidebar"
				aria-label="Open navigation"
			>
				☰
			</button>
			<a class="navbar-brand" href="/">Product</a>
			<div class="d-flex align-items-center gap-2"><!-- search, account --></div>
		</div>
	</header>

	<div class="d-flex">
		<div
			class="offcanvas-lg offcanvas-start border-end shell-rail-lg-fixed flex-shrink-0"
			tabindex="-1"
			id="appSidebar"
			aria-labelledby="appSidebarLabel"
		>
			<div class="offcanvas-header">
				<h5 class="offcanvas-title" id="appSidebarLabel">Navigation</h5>
				<button
					type="button"
					class="btn-close"
					data-bs-dismiss="offcanvas"
					data-bs-target="#appSidebar"
					aria-label="Close"
				></button>
			</div>
			<div class="offcanvas-body d-lg-block p-lg-3">
				<nav aria-label="Primary">
					<ul class="nav nav-pills flex-column gap-1">
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="#">Dashboard</a>
						</li>
						<li class="nav-item"><a class="nav-link" href="#">Accounts</a></li>
						<li class="nav-item"><a class="nav-link" href="#">Reports</a></li>
					</ul>
				</nav>
			</div>
		</div>
		<main id="main" class="flex-grow-1 p-3 p-lg-4 min-inline-0">
			<!-- Generated min-inline-0 lets the task shrink inside the flex row. -->
		</main>
	</div>
</body>
```

**Navigation rules:**

- Breadcrumbs only for genuinely hierarchical models (org → account → contact); in flat or tabbed apps they are noise. Current item: `aria-current="page"`, not a link.
- A command palette (Ctrl/Cmd-K) is an accelerator **on top of** visible nav, never a replacement — everything it exposes needs a discoverable UI route too.
- Keyboard shortcuts: use conventional bindings (Ctrl/Cmd-K palette, `/` focuses search, `?` opens the shortcut cheat-sheet), surface them in tooltips, and never let single-key shortcuts fire while an input has focus.
- Dashboard composition follows the same craft as any screen: state the screen's single job, lead with the numbers that answer it, and keep every widget to one job — a dashboard is not a place to exhibit every chart type.

### Dense data tables

**Semantics first — table vs grid.** Default to a static `<table>`: links and buttons inside cells ride the natural tab order and screen readers get real table navigation free. Reserve `role="grid"` for _editable, cell-interactive_ spreadsheet-like UIs — grid means you now own roving tabindex and full arrow-key cell navigation. Never bolt `role="grid"` onto a read-only table because it "looks like a data grid": semantics follow interaction, not appearance.

**Craft rules:**

- **Align by comparison:** quantities and currency right-aligned (`text-end`, header too), with
  consistent units and precision. Use the generated `figures-tabular` utility or the project's
  equivalent. Keep text start-aligned; choose date alignment by its format and comparison task.
- **Group related content:** combine identity and supporting detail only when they do not need
  independent column comparison or sorting. Keep key comparison columns explicit. Quiet repeated
  labels and row actions before increasing density.
- **Density:** `table-sm` for compact; offer density as a user toggle (comfortable/compact) driven by one token or wrapper class, not per-cell tweaks. Do not shrink font below readability to fake density.
- **Sticky header** when the table meaningfully scrolls (roughly a viewport / ~15+ rows). Not built into Bootstrap — the pattern:

```html
<div
	class="table-responsive max-block-lg-table"
	role="region"
	aria-label="Comparison table"
	tabindex="0"
>
	<table class="table table-sm align-middle">
		<thead class="sticky-top">
			<tr>
				<th scope="col" class="bg-body-secondary">…</th>
			</tr>
		</thead>
		…
	</table>
</div>
```

Keep sticky header cells on an **opaque, mode-aware surface** such as `bg-body-secondary`. Stock `.table` cells use the body background; verify that a skin or override has not made them translucent. Do not substitute a `.table-*` color variant and assume it adapts. Inspect cell overlays through [Tables and overlays](color-modes.md#tables-and-overlays). Sticky chrome is the prime Focus-Not-Obscured offender: add `scroll-margin-top` on row focusables equal to the header height. Sticky first column only when row identity is lost on horizontal scroll — it costs paint and complexity.

- **Sorting:** the whole header is a button (not a bare caret), with a visible direction indicator, and `aria-sort="ascending|descending"` on the active `<th>` only:

```html
<th scope="col" aria-sort="ascending">
	<button type="button" class="btn btn-link p-0 fw-semibold">
		Amount <span aria-hidden="true">↑</span>
	</button>
</th>
```

- **Row actions:** 1–3 high-frequency actions inline; the rest behind a per-row kebab (dropdown). Hover-only reveal fails touch and keyboard — keep at least the overflow trigger always visible and ≥24px.
- **Selection & bulk actions:** header checkbox with indeterminate state for partial selection; per-row checkboxes with `aria-label` naming the row ("Select INV-1042"). When selection > 0, swap the toolbar's content in place for a contextual bar — "3 selected", the batch actions, and a clear-selection escape — never push the layout down (layout-shifting chrome is an anti-pattern). Announce the count through a polite live region.
- **Pagination vs scrolling:** paginate when users need position, totals, deep links, and "go to page N" — most enterprise CRUD. Virtualize (windowed rendering) for long uniform lists where scrolling is natural. True infinite scroll is for exploratory feeds only — never where users need a footer or a findable end.
- **Responsive, by task:** use a compact record list for record work, a locally scrollable semantic table for essential comparison, or priority columns with an operable detail path. Preserve identity, decision fields, and actions. Choose expansion from available container width, not `md` by habit. Keep one state model across variants; take the contract from [Keep the task intact](responsive-layout.md#keep-the-task-intact).
- **Table states:** loading → **skeleton rows** matching the real column count/widths (a centered spinner collapses the layout); empty → distinguish _no data yet_ (invite the first action) from _no results for these filters_ (offer "Clear filters"); error → inline retry inside the table region, header and toolbar preserved.

### Filter & search bars

- One toolbar above the table: search input first (`role="search"` on the form), then the 2–4 highest-value filters as `form-select`/segmented controls, overflow filters behind a "Filters" button (offcanvas on mobile, dropdown/collapse on desktop).
- **Active filters must be visible and dismissible** — chips/badges with an ✕ and a "Clear all" — users must see _why_ the list is short. A filtered-empty state repeats the escape hatch.
- Debounce live search; show result counts ("128 results") so feedback is immediate; filter state belongs in the URL when views are shareable.
- At the base, give search a full row; stack or wrap actions and filters without shrinking labels or targets. Expand with `col-12 col-md`, `col-md-auto`, or `d-grid d-sm-flex` when they fit. Reserve a horizontal scroller for a documented spatial interaction, not an ordinary toolbar. Keep active filters and the clear path outside any disclosed extras.

### Wizards & multi-step forms

- Show step progress: current position, total, and step name (for example, "Billing — step ⟨n⟩ of
  ⟨total⟩", where the wizard fills in its own runtime position and total); `list-group-numbered` or
  a simple nav renders it honestly.
- Validate per step before advancing; never let a step advance carrying invalid data.
- Back never loses data. Persist partial state (save-and-resume) for anything beyond ~3 steps or that crosses sessions.
- Never re-ask what a previous step collected (Redundant Entry, 3.3.7) — carry it forward or offer "same as above".
- Review step: a review summary with per-section edit links, then one clearly-named commit action ("Create account", not "Submit").

### The data states

Design **every one** for every data surface: ideal (populated), empty, loading, partial, error. A component is not done until all of them exist.

- **Skeleton vs spinner:** skeleton (`placeholder` + `placeholder-glow`) when you know the content's shape and it fills a region — tables, cards, detail panes — because it holds layout and shortens perceived wait. Spinner for short, indeterminate, or in-control waits (inside a button, a small inline fetch).
- **Wait feedback:** acknowledge the action promptly, avoid flashing a loader for trivial waits, and keep the known layout stable. For longer work, show actual steps or measured progress when available; otherwise state that work continues and offer cancellation where supported. Never invent a percentage.
- **Optimistic vs pessimistic:** apply UI immediately and reconcile (rolling back loudly on failure) for reversible high-frequency actions — toggles, stars, reorders. Await confirmation for money, audited records, and anything a rollback would confuse.
- **First-use empty:** name what belongs here and the useful create/import action. Drop tabs or
  filters only when they genuinely have no data to operate on. An illustration may support that
  action; it must not replace it.
- **Filtered-empty:** retain the active filters and result context, explain that nothing matched,
  and offer a clear-filter path. Never hide the controls needed to undo the empty result.
- **Partial:** keep available data readable, identify the missing or stale part, and scope recovery
  to it. Missing is not zero. Do not collapse the whole surface into an error when some data exists.
- **Every error state states what failed and how to fix it**, carries a keyboard-reachable retry in place, and preserves surrounding context — a body fetch failure must not blow away the toolbar and filters.

### Feedback discipline

| Channel                       | Use for                                                                                       | Never for                                          |
| ----------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Toast**                     | Transient confirmation of an action that finished a moment ago; auto-dismiss; `role="status"` | Errors needing action; anything the user must read |
| **Inline alert**              | Feedback tied to a specific field/section/action; persists in context                         | App-wide conditions                                |
| **Banner** (page-level alert) | Persistent page/app conditions — outage, trial expiring, permissions                          | Action confirmations                               |
| **Modal / alertdialog**       | Blocking decisions the user must resolve now                                                  | FYIs, success messages                             |

Blocking errors are never toasts. Keep the acting verb consistent across the flow: the "Publish" button confirms with "Published".

### Destructive actions

Match friction to reversibility × blast radius:

1. **Undo** (soft-delete + toast with Undo) for reversible, low-stakes, frequent actions — least friction, best experience. Prefer making actions undoable over interrupting them.
2. **Confirm dialog** for irreversible-but-scoped operations. Restate the specific consequence ("This permanently deletes 3 invoices"), verb-labeled buttons ("Delete invoices" / "Cancel" — never Yes/No), destructive action visually separated from safe; `alertdialog` semantics; focus lands on the safe action for a compact confirmation, or a static top heading when focusing an action would scroll the consequences out of view.
3. **Type-to-confirm** (type the entity name) only for high-blast-radius irreversible operations — delete an org, drop a dataset.

Keep action rank separate from consequence. A row-level destructive action can use a measured
quiet treatment; emphasize the final destructive commit where the ladder makes it the decision.
Do not make every row's delete button compete with the page's primary action.

Do not type-gate a single-row delete; do not one-tap a tenant wipe. Confirm only where this ladder calls for it — a confirmation on every action gets clicked through.

**Neutralize a disabled destructive control.** `btn-danger` at full saturation reads as armed whatever the `disabled` attribute says, and the contrast exemption for disabled controls does not excuse it. While the action is unavailable, drop to the neutral or outline `btn-*` class (or let the disabled state mute the fill) so the color stops promising an action, and say _why_ it is unavailable in text the assistive layer reaches: `aria-describedby` pointing at the reason, with `title` only as the pointer-user convenience on top. Never use `title` alone — it never reaches a keyboard or screen-reader user, and it disappears on touch.

## RTL

- Enable per page: `<html lang="ar" dir="rtl">` + the RTL stylesheet `bootstrap.rtl.min.css` (built from the same source through RTLCSS). RTL support is documented as experimental.
- The logical properties model is why the utilities say start/end: `ms-*`/`me-*`, `ps-*`/`pe-*`, `text-start`/`text-end`, `float-start`/`float-end`, `offcanvas-start`/`end` all flip automatically. **Never write `left`/`right` positioning or physical margins in custom CSS** — use logical properties (`margin-inline-start`, `inset-inline-end`) so your custom rules flip too.
- Caveats: shipping LTR+RTL simultaneously costs significant extra CSS; the breadcrumb divider needs `$breadcrumb-divider-flipped`; source Sass can embed RTLCSS directives (`/* rtl: … */`) for value swaps like font stacks.

## Print

- Hide chrome, keep the data: `d-print-none` on nav, sidebars, toolbars, action buttons; the report/table itself stays printable.
- `d-print-block`/`d-print-table` can resurface content hidden on screen (a print-only header with report title/date).
- Print-check data screens users will export: collapse interactive affordances (sort carets, checkboxes) through `d-print-none`, and prefer `table-bordered` legibility over hover/stripe effects that may not print.

## Performance

- **Keep one CSS system.** Extend the installed Bootstrap theme; do not add a competing framework or a parallel palette to restyle the surface.
- **Compressed, the full build is cheap; incomplete builds are not.** Trimming through a Sass-subset build (import only the parts used — see [Theming](#theming--design-tokens)) is the sanctioned diet. Aggressive purge tools are the risky one: Bootstrap adds classes **at runtime** (`show`, `showing`, `fade`, `collapsing`, `modal-open`, `modal-backdrop`, `offcanvas-backdrop`, tooltip/popover generated markup) — purging without safelisting them ships UIs whose modals silently stop rendering. If you purge, safelist every JS-toggled class and test every overlay.
- **Icons:** Bootstrap Icons is a separate package — prefer inline SVG or an SVG sprite (crisp, styleable through `currentColor`, no font flash) over the icon font; load only the icons used.
- **JS:** the bundle is small, but only load it where behavior exists; per-component ESM imports (`bootstrap/js/dist/modal`) trim further in bundlers.
- **Fonts:** reuse the existing families and load only needed weights/scripts. Add a display face only for a distinct role; use `font-display: swap` and test fallback wrapping. Keep the data face legible before and after fonts load.

## When Not to Hand-Roll

Bootstrap has **no** combobox/autocomplete, date picker, multi-select tags input, data grid, or tree view. The boundary rule:

- **Reach for native first:** `<input type="date">`, `<datalist>` for light autocomplete, `<select multiple>` where acceptable. Native widgets bring keyboard and AT behavior free.
- **Reach for an established accessible library second** when the product genuinely needs the richer widget (combobox with async search, spreadsheet grid, drag-reorder tree). Budget for auditing it against the APG contract.
- **Hand-roll last**, only with the APG contract in hand ([Accessibility](#accessibility) → Pattern contracts) and budget for the _keyboard_ half, which is most of the work.
- Never fake it: a `.dropdown-menu` posing as a select, a `<div>` grid with click handlers, or a scroll-anchor "wizard" each break keyboard and AT users in ways a demo never shows.

## Common Layout Patterns

### Centered content

```html
<div class="d-flex flex-column min-vh-100 p-3">
	<div class="my-auto">Centered content</div>
</div>
```

### Sticky footer

```html
<body class="d-flex flex-column min-vh-100">
	<main class="flex-grow-1">Content</main>
	<footer>Footer</footer>
</body>
```

### Equal height columns

```html
<div class="row">
	<div class="col-md-6"><div class="card h-100">Equal height</div></div>
	<div class="col-md-6"><div class="card h-100">Equal height</div></div>
</div>
```

### Responsive visibility

```html
<div class="d-none d-md-block">Hidden on mobile, visible md+</div>
<div class="d-md-none">Visible only below md</div>
```

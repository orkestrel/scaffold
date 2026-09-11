# Bootstrap 5 Component Reference

> Part of the `enterprise-bootstrap` package. Bootstrap **5.3.x** component
> markup + enterprise selection notes. Utility classes: [utilities.md](utilities.md).
> Theming, forms deep-dive, JS lifecycle, patterns: [bootstrap-reference.md](bootstrap-reference.md).

## Contents

- [Component list](#complete-component-list) — layout, content, form components
- Markup: [Accordion](#accordion) · [Alerts](#alerts) · [Badge](#badge) · [Breadcrumb](#breadcrumb) · [Buttons](#buttons) · [Button group](#button-group) · [Card](#card) · [Carousel](#carousel) · [Close button](#close-button) · [Collapse](#collapse) · [Dropdown](#dropdown) · [List group](#list-group) · [Modal](#modal) · [Navbar](#navbar) · [Navs & tabs](#navs--tabs) · [Offcanvas](#offcanvas) · [Pagination](#pagination) · [Placeholder](#placeholder-skeletons) · [Popover](#popover-requires-popperjs) · [Progress](#progress) · [Scrollspy](#scrollspy) · [Spinners](#spinners) · [Tables](#tables) · [Toasts](#toasts) · [Tooltip](#tooltip-requires-popperjs)
- [JavaScript initialization](#javascript-initialization) — which components need JS, which auto-init
- [Icons](#icons) — icon sourcing, status glyph marks
- [Enterprise notes](#enterprise-notes-components) — choosing components, forms, selection fills, navigation, theming

## Complete Component List

### Layout Components

- Containers: `.container`, `.container-fluid`, `.container-{breakpoint}`
- Grid: `.row`, `.col`, `.col-{1-12}`, `.col-{breakpoint}-{1-12}`
- CSS Grid (opt-in): `.grid`, `.g-col-{1-12}`

### Content Components

- Typography: `.h1`–`.h6`, `.display-1`–`.display-6`, `.lead`, `.small` (sizes, weights, and the `.small` `em` trap: [utilities.md](utilities.md) → Text)
- Lists and quotes: `.list-unstyled`, `.list-inline`, `.blockquote`, `.blockquote-footer` — icon bullets and promoted quotes per [utilities.md](utilities.md) → Composition habits
- Images: `.img-fluid`, `.img-thumbnail`, `.figure`
- Tables: `.table` plus its `.table-*` tone classes — see [Tables](#tables)
- Figures: `.figure`, `.figure-img`, `.figure-caption`

### Form Components

- Control: `.form-control`, `.form-control-lg/sm`, `.form-select`
- Check/Radio: `.form-check`, `.form-check-input`, `.form-check-label`
- Switch: `.form-switch`
- Range: `.form-range`
- Floating: `.form-floating`
- Input Group: `.input-group`, `.input-group-text`, `.has-validation`
- Validation: `.was-validated`, `.is-valid/invalid`, `.valid/invalid-feedback/tooltip`

Full form patterns and validation JS: [bootstrap-reference.md](bootstrap-reference.md) → Forms in production.

## Component Markup

Preserve the component's native foreground and state rules. For quiet custom surfaces, inherit text
and use adaptive fills; take exceptions from [color-modes.md](color-modes.md). Do not copy a solid
variant merely because it appears in this catalog.

### Accordion

```html
<div class="accordion" id="accordionExample">
	<div class="accordion-item">
		<h2 class="accordion-header">
			<button
				class="accordion-button"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#collapseOne"
				aria-expanded="true"
				aria-controls="collapseOne"
			>
				Item #1
			</button>
		</h2>
		<div
			id="collapseOne"
			class="accordion-collapse collapse show"
			data-bs-parent="#accordionExample"
		>
			<div class="accordion-body">Body content</div>
		</div>
	</div>
	<div class="accordion-item">
		<h2 class="accordion-header">
			<button
				class="accordion-button collapsed"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#collapseTwo"
				aria-expanded="false"
				aria-controls="collapseTwo"
			>
				Item #2
			</button>
		</h2>
		<div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
			<div class="accordion-body">Body content</div>
		</div>
	</div>
</div>
```

Modifier classes: `.accordion-flush` (edge-to-edge, no outer borders); omit `data-bs-parent` to allow multiple items open.

### Alerts

```html
<div class="alert alert-primary" role="status">Sync complete</div>
<div class="alert alert-success" role="status">Changes saved</div>
<div class="alert alert-danger" role="alert">Danger alert</div>
<div class="alert alert-warning" role="alert">Warning alert</div>

<div class="alert alert-primary d-flex align-items-center" role="status">
	<svg class="bi flex-shrink-0 me-2" role="img" aria-label="Info:">...</svg>
	<div>Alert with icon</div>
</div>

<div class="alert alert-success alert-dismissible fade show" role="status">
	<h4 class="alert-heading">Well done!</h4>
	<p>Content here.</p>
	<hr />
	<p class="mb-0">Additional info.</p>
	<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
```

Choose the announcement by urgency: `role="status"` for routine asynchronous results, `role="alert"` for urgent failures. Do not make every warning assertive or infer urgency from `.alert` styling. A static advisory does not require a live region merely because it has alert chrome. Take channel selection from [bootstrap-reference.md](bootstrap-reference.md) → Feedback discipline.

Keep the native `.alert-*` foreground, subtle background, and `.alert-link` states. Do not add blanket `text-reset` or text-color utilities to alerts. Measure their children on the actual fill; see [color-modes.md](color-modes.md) → Alerts, buttons, and selection.

A side accent is an accessory, one per region: `alert alert-warning border-0 border-start border-4 border-warning`. Zero the alert's own border first — `border-4` alone widens all four sides — and check the fixed `border-warning` against the dark `bg-warning-subtle` ([utilities.md](utilities.md) → Borders).

### Badge

Start quiet status with inherited text on a subtle fill. Use a plain span to avoid the badge's
built-in white foreground; when retaining `.badge`, use `text-reset` to restore inheritance:

```html
<span class="d-inline-flex rounded-pill bg-success-subtle px-2 py-1 small fw-semibold">Paid</span>
<span class="badge bg-success-subtle text-reset">Paid</span>
```

Reserve the solid variants for intentional prominence or a counter with its own paired surface:

```html
<span class="badge text-bg-primary">Primary</span>
<span class="badge text-bg-secondary">Secondary</span>
<span class="badge text-bg-success">Success</span>
<span class="badge text-bg-danger">Danger</span>
<span class="badge text-bg-warning">Warning</span>
<span class="badge text-bg-info">Info</span>
<span class="badge text-bg-light">Light</span>
<span class="badge text-bg-dark">Dark</span>

<span class="badge rounded-pill text-bg-primary">Pill badge</span>

<!-- Notification counter positioned on a control -->
<button type="button" class="btn btn-primary position-relative">
	Inbox
	<span
		class="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger"
	>
		9<span class="visually-hidden">unread messages</span>
	</span>
</button>
```

For an intentional solid badge, use a measured `text-bg-*` pair rather than a solid background alone. Its foreground is selected at Sass build time, not recalculated on a runtime theme change. Never make color the only carrier of meaning; keep visible text or an accessible label.

**A badge is never a textless mark.** Stock Bootstrap ships `.badge:empty { display: none }`, so an empty `<span class="badge">` used as a status dot renders nothing at all — the surface silently loses the state it claimed to show, and source review never sees it. A textless status mark is an **icon glyph** (see [Icons](#icons) → Status glyph marks), not a stripped badge.

State a badge's intended fill and inspect the skin. For a quiet badge use `bg-*-subtle text-reset`; for an unfilled badge use `bg-transparent text-reset`. Verify the inherited foreground on that actual surface in light and dark. A fill-only utility does not remove `.badge`'s white text; see [color-modes.md](color-modes.md) → Badges and removable tags.

A badge reporting an in-flight request is a live region: `role="status"` on the badge (or on the small wrapper that holds it) announces the settled state politely without stealing focus. Reserve `role="alert"` for urgent results ([Alerts](#alerts)).

### Breadcrumb

```html
<nav style="--bs-breadcrumb-divider: '>';" aria-label="Breadcrumb">
	<ol class="breadcrumb">
		<li class="breadcrumb-item"><a href="#">Home</a></li>
		<li class="breadcrumb-item"><a href="#">Library</a></li>
		<li class="breadcrumb-item active" aria-current="page">Data</li>
	</ol>
</nav>
```

The current page is `aria-current="page"` and not a link. Use breadcrumbs only for genuinely hierarchical models — in flat or tabbed apps they are noise.

### Buttons

```html
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>
<button type="button" class="btn btn-link">Link</button>

<button type="button" class="btn btn-outline-primary">Outline</button>
<button type="button" class="btn btn-outline-secondary">Outline Secondary</button>

<button type="button" class="btn btn-primary btn-lg">Large</button>
<button type="button" class="btn btn-primary btn-sm">Small</button>

<button type="button" class="btn btn-primary" disabled>Disabled</button>
<a class="btn btn-primary disabled" role="button" aria-disabled="true">Disabled Link</a>

<button type="button" class="btn btn-primary" data-bs-toggle="button">Toggle</button>
```

Icon-only buttons need `aria-label` and a ≥24×24 px target (WCAG 2.2) — `btn-sm` icon clusters in toolbars are the common violation; pad rather than shrink.

The three sizes scale padding faster than font — `btn-sm` 4/8 px at 14 px, `btn` 6/12 at 16 px, `btn-lg` 8/16 at 20 px — so a large button reads as larger, not zoomed. Use them as shipped; do not derive a fourth size with `em` padding. Weight is `$font-weight-normal`; `fw-semibold` on a button is a deliberate emphasis choice, not a default.

Choose action rank, then a variant whose rest, hover, focus, active/checked, and disabled treatment works on its actual surface ([SKILL.md](../SKILL.md) → Hierarchy & actions). Do not override native button states with background or text utilities.

### Button Group

Keep joined groups on one line only while their labels and targets fit. For narrow filters or
review controls, use a select or independently spaced wrapping buttons; `flex-wrap` alone does
not make joined corners and shared borders into a coherent multiline group.

```html
<div class="btn-group" role="group" aria-label="Basic example">
	<button type="button" class="btn btn-primary">Left</button>
	<button type="button" class="btn btn-primary">Middle</button>
	<button type="button" class="btn btn-primary">Right</button>
</div>

<div class="btn-toolbar" role="toolbar" aria-label="Toolbar">
	<div class="btn-group me-2" role="group">...</div>
	<div class="btn-group me-2" role="group">...</div>
</div>

<div class="btn-group-vertical">
	<button type="button" class="btn btn-primary">Top</button>
	<button type="button" class="btn btn-primary">Middle</button>
	<button type="button" class="btn btn-primary">Bottom</button>
</div>
```

### Card

```html
<div class="card">
	<div class="card-header">Header</div>
	<img src="..." class="card-img-top" alt="..." />
	<div class="card-body">
		<h5 class="card-title">Title</h5>
		<h6 class="card-subtitle mb-2">Subtitle</h6>
		<p class="card-text">Text content.</p>
		<a href="#" class="card-link">Link</a>
		<a href="#" class="btn btn-primary">Button</a>
	</div>
	<ul class="list-group list-group-flush">
		<li class="list-group-item">Item</li>
	</ul>
	<div class="card-footer">Footer</div>
</div>

<div class="card bg-primary-subtle">Quiet tinted card</div>
<div class="card border-primary-subtle">Quiet bordered card</div>
<div class="card border-0 shadow-sm">
	Borderless raised card — page surface must differ from the card's
</div>
<div class="card border-0 border-top border-4 border-primary">
	Top accent — border-0 first, or border-4 widens every side
</div>
<div class="card-group">Card group</div>
<div class="row row-cols-1 row-cols-md-3 g-4">Card grid (with h-100 on cards)</div>
```

Use `card` only where a group earns containment; try spacing and a surface change first. Card headers and footers are a 3 % tint of the body color, so `border-0` on `card-header` often reads cleaner than the shipped rule. One accent per region ([utilities.md](utilities.md) → Borders).

### Carousel

```html
<div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
	<div class="carousel-indicators">
		<button
			type="button"
			data-bs-target="#carouselExample"
			data-bs-slide-to="0"
			class="active"
			aria-current="true"
		></button>
		<button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
	</div>
	<div class="carousel-inner">
		<div class="carousel-item active">
			<img src="..." class="d-block w-100" alt="..." />
			<div class="carousel-caption d-none d-md-block">
				<h5>Caption</h5>
				<p>Description</p>
			</div>
		</div>
		<div class="carousel-item">
			<img src="..." class="d-block w-100" alt="..." />
		</div>
	</div>
	<button
		class="carousel-control-prev"
		type="button"
		data-bs-target="#carouselExample"
		data-bs-slide="prev"
	>
		<span class="carousel-control-prev-icon" aria-hidden="true"></span>
		<span class="visually-hidden">Previous</span>
	</button>
	<button
		class="carousel-control-next"
		type="button"
		data-bs-target="#carouselExample"
		data-bs-slide="next"
	>
		<span class="carousel-control-next-icon" aria-hidden="true"></span>
		<span class="visually-hidden">Next</span>
	</button>
</div>
```

`.carousel-dark` is deprecated — use `data-bs-theme="dark"` on the carousel instead. Auto-advancing carousels rarely belong in product UI.

### Close Button

```html
<button type="button" class="btn-close" aria-label="Close"></button>
<button type="button" class="btn-close" disabled aria-label="Close"></button>

<!-- On dark surfaces: .btn-close-white is DEPRECATED — scope the theme instead -->
<button type="button" class="btn-close" data-bs-theme="dark" aria-label="Close"></button>
```

### Collapse

```html
<p>
	<button
		class="btn btn-primary"
		type="button"
		data-bs-toggle="collapse"
		data-bs-target="#collapseExample"
		aria-expanded="false"
		aria-controls="collapseExample"
	>
		Toggle
	</button>
</p>
<div class="collapse" id="collapseExample">
	<div class="card card-body">Content here.</div>
</div>
```

Multiple targets: give each panel `.multi-collapse` and point separate triggers at each id (or one trigger at a shared selector). The trigger button IS the disclosure pattern: `aria-expanded` + `aria-controls`, Enter/Space toggles — nothing more needed.

### Dropdown

```html
<div class="dropdown">
	<button
		class="btn btn-secondary dropdown-toggle"
		type="button"
		data-bs-toggle="dropdown"
		aria-expanded="false"
	>
		Dropdown button
	</button>
	<ul class="dropdown-menu">
		<li><a class="dropdown-item" href="#">Action</a></li>
		<li><a class="dropdown-item" href="#">Another action</a></li>
		<li><hr class="dropdown-divider" /></li>
		<li><a class="dropdown-item" href="#">Something else</a></li>
	</ul>
</div>

<!-- Directions: wrap in .btn-group with .dropup / .dropend / .dropstart -->

<ul class="dropdown-menu dropdown-menu-end">
	Right-aligned
</ul>
<ul class="dropdown-menu">
	<li><h6 class="dropdown-header">Header</h6></li>
	<li><span class="dropdown-item-text">Text</span></li>
	<li><a class="dropdown-item active" aria-current="true" href="#">Active</a></li>
	<li><a class="dropdown-item disabled" aria-disabled="true">Disabled</a></li>
</ul>

<div class="dropdown-menu p-4">
	<form>Form content</form>
</div>
```

`.dropdown-menu-dark` is deprecated — use `data-bs-theme="dark"` on the menu or an ancestor. Dropdowns have full keyboard support (arrows, Esc) built in. A dropdown is a **command menu** — for choosing a form value use `.form-select`, never a styled dropdown pretending to be an input.

A menu is a floating surface, not only a list of links: give it `dropdown-header` sections, a `dropdown-divider`, an icon, and a `small text-body-secondary` line under a `fw-semibold` label inside each `dropdown-item`, or a `row` of columns in a `p-3` menu, while keeping `dropdown-item` semantics on every choice.

### List Group

```html
<ul class="list-group">
	<li class="list-group-item">Item</li>
	<li class="list-group-item active" aria-current="true">Active</li>
	<li class="list-group-item disabled" aria-disabled="true">Disabled</li>
	<li class="list-group-item list-group-item-primary">Primary</li>
</ul>

<div class="list-group">
	<a href="#" class="list-group-item list-group-item-action active" aria-current="true">
		<div class="d-flex w-100 justify-content-between">
			<h5 class="mb-1">Heading</h5>
			<small>3 days ago</small>
		</div>
		<p class="mb-1">Content.</p>
		<small>Footer text.</small>
	</a>
</div>

<ul class="list-group list-group-horizontal">
	<li class="list-group-item">Horizontal</li>
</ul>
<ul class="list-group list-group-numbered">
	<li class="list-group-item">Numbered</li>
</ul>
<ul class="list-group list-group-flush">
	<li class="list-group-item">Flush (edge-to-edge)</li>
</ul>

<!-- Checkboxes / radios in a list group (core pattern — form-check inside items) -->
<ul class="list-group">
	<li class="list-group-item">
		<input class="form-check-input me-1" type="checkbox" id="lgCheck1" value="" />
		<label class="form-check-label" for="lgCheck1">First checkbox</label>
	</li>
	<li class="list-group-item">
		<input class="form-check-input me-1" type="radio" name="lgRadio" id="lgRadio1" value="" />
		<label class="form-check-label" for="lgRadio1">First radio</label>
	</li>
</ul>
```

(The `list-group-checkable` / `list-group-item-check` classes seen in Bootstrap's _examples gallery_ are custom CSS, not core — do not ship them without their styles.)

### Modal

Keep width bounded and all actions vertically reachable on short viewports and enlarged text.
Use `modal-fullscreen-*-down` only with Bootstrap modal markup; a native `<dialog>` needs its own
measured sizing contract. Keep row-action dialogs outside table overflow ancestors.

**Build a blocking dialog on the native `<dialog>`.** `showModal()` brings focus containment, Esc, an inert background, and top-layer stacking from the platform — nothing to construct, nothing to dispose when the view unmounts, and no JS instance for a virtual-DOM framework to fight with over the same nodes. Leave the element itself unpainted and put Bootstrap chrome inside it:

```html
<dialog class="p-0 border-0 bg-transparent" role="alertdialog" aria-labelledby="confirmHeading">
	<div class="card shadow">
		<div class="card-header">
			<h2 id="confirmHeading" class="h5 mb-0">Delete invoice</h2>
		</div>
		<div class="card-body">
			<p class="card-text mb-0">This permanently deletes INV-1042.</p>
		</div>
		<div class="card-footer d-flex flex-wrap justify-content-end gap-2">
			<button type="button" class="btn btn-secondary">Keep</button>
			<button type="button" class="btn btn-danger">Delete invoice</button>
		</div>
	</div>
</dialog>
```

`role="alertdialog"` for a destructive confirm, `role="dialog"` otherwise; `aria-labelledby` points at the heading. The element's own `close` event is where the host clears the state that opened it, so Esc and the buttons all close by one path. The scrim is the UA's `::backdrop`, which no Bootstrap class touches — restyling it requires the custom-CSS tier.

Bootstrap's `.modal` is the answer when the project already drives its dialogs through Bootstrap's JS:

```html
<div
	class="modal fade"
	id="exampleModal"
	tabindex="-1"
	aria-labelledby="exampleModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="exampleModalLabel">Title</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">Body</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
				<button type="button" class="btn btn-primary">Save changes</button>
			</div>
		</div>
	</div>
</div>

<div class="modal-dialog modal-dialog-scrollable">Scrollable body</div>
<div class="modal-dialog modal-dialog-centered">Centered vertically</div>
<div class="modal-dialog modal-sm">Small</div>
<div class="modal-dialog modal-lg">Large</div>
<div class="modal-dialog modal-xl">Extra large</div>
<div class="modal-dialog modal-fullscreen">Fullscreen</div>
<div class="modal-dialog modal-fullscreen-sm-down">Fullscreen below sm</div>

<div class="modal" data-bs-backdrop="static" data-bs-keyboard="false">
	Static backdrop (blocks click-outside / Esc dismiss)
</div>
```

Bootstrap's modal enforces focus, adds `role="dialog"`/`aria-modal="true"`, closes on Esc, and returns focus to the trigger. One modal at a time — nesting is unsupported; if a flow needs a second layer, redesign it. In SPAs, `dispose()` the instance on unmount ([bootstrap-reference.md](bootstrap-reference.md) → JavaScript lifecycle).

### Navbar

```html
<nav class="navbar navbar-expand-lg bg-body-tertiary">
	<div class="container-fluid">
		<a class="navbar-brand" href="#">Brand</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNav"
			aria-controls="navbarNav"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<a class="nav-link active" aria-current="page" href="#">Home</a>
				</li>
				<li class="nav-item"><a class="nav-link" href="#">Features</a></li>
				<li class="nav-item">
					<a class="nav-link disabled" aria-disabled="true">Disabled</a>
				</li>
			</ul>
			<form class="d-flex" role="search">
				<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
				<button class="btn btn-success" type="submit">Search</button>
			</form>
		</div>
	</div>
</nav>

<nav class="navbar bg-body-tertiary fixed-top">Fixed top</nav>
<nav class="navbar bg-body-tertiary sticky-top">Sticky top</nav>

<!-- Dark navbar: .navbar-dark is DEPRECATED — scope the theme instead -->
<nav class="navbar bg-body-tertiary" data-bs-theme="dark">
	<a class="navbar-brand" href="#">Dark-themed navbar</a>
</nav>
```

### Navs & Tabs

```html
<ul class="nav">
	<li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Active</a></li>
	<li class="nav-item"><a class="nav-link" href="#">Link</a></li>
	<li class="nav-item"><a class="nav-link disabled" aria-disabled="true">Disabled</a></li>
</ul>

<ul class="nav nav-tabs">
	…
</ul>
<ul class="nav nav-pills">
	…
</ul>
<ul class="nav nav-underline">
	…
</ul>
<!-- 5.3: understated bottom-border style -->
<ul class="nav nav-pills nav-fill">
	…
</ul>
<ul class="nav nav-pills nav-justified">
	…
</ul>
<nav class="nav nav-tabs flex-column flex-sm-row">Responsive nav</nav>
```

Real switchable tab panels (JS-driven — buttons, not scroll anchors):

```html
<ul class="nav nav-tabs" id="myTab" role="tablist">
	<li class="nav-item" role="presentation">
		<button
			class="nav-link active"
			id="home-tab"
			data-bs-toggle="tab"
			data-bs-target="#home-pane"
			type="button"
			role="tab"
			aria-controls="home-pane"
			aria-selected="true"
		>
			Home
		</button>
	</li>
	<li class="nav-item" role="presentation">
		<button
			class="nav-link"
			id="profile-tab"
			data-bs-toggle="tab"
			data-bs-target="#profile-pane"
			type="button"
			role="tab"
			aria-controls="profile-pane"
			aria-selected="false"
		>
			Profile
		</button>
	</li>
</ul>
<div class="tab-content">
	<div
		class="tab-pane fade show active"
		id="home-pane"
		role="tabpanel"
		aria-labelledby="home-tab"
		tabindex="0"
	>
		Home content
	</div>
	<div
		class="tab-pane fade"
		id="profile-pane"
		role="tabpanel"
		aria-labelledby="profile-tab"
		tabindex="0"
	>
		Profile content
	</div>
</div>
```

### Offcanvas

Take narrow/inline thresholds, trigger parity, and open-resize-close tests from
[responsive-layout.md](responsive-layout.md#handle-navigation-and-overlays). Match trigger and panel
breakpoints; do not leave a hidden focus trap or scroll lock after expansion.

```html
<button
	class="btn btn-primary"
	type="button"
	data-bs-toggle="offcanvas"
	data-bs-target="#offcanvasExample"
>
	Launch
</button>

<div
	class="offcanvas offcanvas-start"
	tabindex="-1"
	id="offcanvasExample"
	aria-labelledby="offcanvasExampleLabel"
>
	<div class="offcanvas-header">
		<h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
		<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
	</div>
	<div class="offcanvas-body">Body content</div>
</div>

<div class="offcanvas offcanvas-top">Top</div>
<div class="offcanvas offcanvas-bottom">Bottom</div>
<div class="offcanvas offcanvas-start">Left/start</div>
<div class="offcanvas offcanvas-end">Right/end</div>

<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false">
	No backdrop, body still scrolls
</div>
```

**Responsive offcanvas** — the canonical sidebar-that-becomes-a-drawer: replace `.offcanvas` with `.offcanvas-{sm|md|lg|xl|xxl}`. Content renders **inline above** that breakpoint and as an **offcanvas below** it. Close buttons inside a responsive offcanvas need an explicit `data-bs-target`. Always set `aria-labelledby` (it is conceptually a dialog; `role="dialog"` is added by JS). Width/height through `--bs-offcanvas-width` (400px) / `--bs-offcanvas-height` (30vh). Full app-shell pattern: [bootstrap-reference.md](bootstrap-reference.md) → App shell.

### Pagination

On narrow screens, retain the current page and previous/next controls; reduce numbered links
before shrinking targets. Keep pagination outside the table scroller and preserve page state
when the presentation changes.

```html
<nav aria-label="Search results pages">
	<ul class="pagination">
		<li class="page-item"><a class="page-link" href="#">Previous</a></li>
		<li class="page-item"><a class="page-link" href="#">1</a></li>
		<li class="page-item active" aria-current="page"><a class="page-link" href="#">2</a></li>
		<li class="page-item"><a class="page-link" href="#">3</a></li>
		<li class="page-item"><a class="page-link" href="#">Next</a></li>
	</ul>
</nav>

<ul class="pagination pagination-lg">
	Large
</ul>
<ul class="pagination pagination-sm">
	Small
</ul>
<ul class="pagination justify-content-center">
	Centered
</ul>
```

### Placeholder (skeletons)

```html
<p aria-hidden="true">
	<span class="placeholder col-6"></span>
	<span class="placeholder w-75"></span>
	<span class="placeholder" style="width: 25%;"></span>
</p>

<span class="placeholder col-12 placeholder-lg">Large</span>
<span class="placeholder col-12 placeholder-sm">Small</span>
<span class="placeholder col-12 placeholder-xs">Extra small</span>

<p class="placeholder-glow"><span class="placeholder col-12"></span></p>
<p class="placeholder-wave"><span class="placeholder col-12"></span></p>

<button class="btn btn-primary disabled placeholder col-4" aria-hidden="true"></button>
```

Always wrap skeletons in `aria-hidden="true"` — they are visual scaffolding, not content. Skeleton-vs-spinner decision rules: [bootstrap-reference.md](bootstrap-reference.md) → The data states.

### Popover (Requires Popper.js)

```html
<button
	type="button"
	class="btn btn-lg btn-danger"
	data-bs-toggle="popover"
	data-bs-title="Popover title"
	data-bs-content="And here's some amazing content."
>
	Click to toggle popover
</button>

<button
	type="button"
	class="btn btn-secondary"
	data-bs-container="body"
	data-bs-toggle="popover"
	data-bs-placement="top"
	data-bs-content="Top popover"
>
	Popover on top
</button>
```

Popovers are **opt-in**: they do nothing until initialized in JS (see [JavaScript initialization](#javascript-initialization)). Only attach them to focusable elements; wrap disabled elements in a `<span tabindex="0">`. `data-bs-html="true"` with untrusted content is an XSS vector.

### Progress

5.3 markup — `role="progressbar"` and the `aria-value*` attributes go on the **outer `.progress`**, not the inner bar:

```html
<div
	class="progress"
	role="progressbar"
	aria-label="Basic example"
	aria-valuenow="25"
	aria-valuemin="0"
	aria-valuemax="100"
>
	<div class="progress-bar" style="width: 25%">25%</div>
</div>

<div
	class="progress"
	role="progressbar"
	aria-label="Success"
	aria-valuenow="25"
	aria-valuemin="0"
	aria-valuemax="100"
>
	<div class="progress-bar bg-success" style="width: 25%"></div>
</div>

<div
	class="progress"
	role="progressbar"
	aria-label="Striped"
	aria-valuenow="10"
	aria-valuemin="0"
	aria-valuemax="100"
>
	<div class="progress-bar progress-bar-striped" style="width: 10%"></div>
</div>

<div
	class="progress"
	role="progressbar"
	aria-label="Animated"
	aria-valuenow="75"
	aria-valuemin="0"
	aria-valuemax="100"
>
	<div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 75%"></div>
</div>

<div class="progress-stacked">
	<div
		class="progress"
		role="progressbar"
		aria-label="Segment one"
		aria-valuenow="30"
		aria-valuemin="0"
		aria-valuemax="100"
		style="width: 30%"
	>
		<div class="progress-bar"></div>
	</div>
	<div
		class="progress"
		role="progressbar"
		aria-label="Segment two"
		aria-valuenow="20"
		aria-valuemin="0"
		aria-valuemax="100"
		style="width: 20%"
	>
		<div class="progress-bar bg-success"></div>
	</div>
</div>
```

### Scrollspy

```html
<nav id="navbar-example2" class="navbar bg-body-tertiary px-3 mb-3">
	<a class="navbar-brand" href="#">Navbar</a>
	<ul class="nav nav-pills">
		<li class="nav-item">
			<a class="nav-link" href="#scrollspyHeading1">First</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" href="#scrollspyHeading2">Second</a>
		</li>
	</ul>
</nav>
<div
	data-bs-spy="scroll"
	data-bs-target="#navbar-example2"
	data-bs-root-margin="0px 0px -40%"
	data-bs-threshold="0.1"
	tabindex="0"
>
	<h4 id="scrollspyHeading1">First heading</h4>
	<p>Content...</p>
	<h4 id="scrollspyHeading2">Second heading</h4>
	<p>Content...</p>
</div>
```

Gotcha: the spied element must be a scroll container (height/overflow, or focusable through `tabindex="0"`), and heading IDs must match the nav `href`s exactly. Scrollspy highlights position in one long page — it is not a substitute for real tabs.

### Spinners

```html
<div class="spinner-border" role="status">
	<span class="visually-hidden">Loading...</span>
</div>

<div class="spinner-grow" role="status">
	<span class="visually-hidden">Loading...</span>
</div>

<div class="spinner-border spinner-border-sm" role="status"></div>
<div class="spinner-grow spinner-grow-sm" role="status"></div>

<button class="btn btn-primary" type="button" disabled>
	<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
	<span role="status">Loading...</span>
</button>
```

### Tables

```html
<table class="table">
	<caption class="visually-hidden">
		Monthly invoices with status and totals
	</caption>
	<thead>
		<tr>
			<th scope="col">Invoice</th>
			<th scope="col">Status</th>
			<th scope="col" class="text-end">Amount</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row">INV-1042</th>
			<td><span class="badge bg-success-subtle text-reset">Paid</span></td>
			<td class="text-end">$1,280.00</td>
		</tr>
	</tbody>
</table>
```

Combine structural modifiers as needed; choose color variants separately:

```css
.table-sm                 /* half padding — dense screens */
.table-striped, .table-striped-columns
.table-hover              /* row highlight — scanning aid */
.table-bordered, .table-borderless
.table-active             /* highlight a row/cell */
.table-group-divider      /* thicker rule between <tbody> groups */
.caption-top              /* caption above the table */
.table-primary … .table-dark   /* tone classes, on table/tr/td */
.align-middle             /* vertical alignment, on table/tr/td */
```

- **Responsive:** wrap in `.table-responsive{-sm|-md|-lg|-xl|-xxl}` for horizontal scroll. Caveat: the wrapper clips overflowing content — dropdown menus inside a responsive table get cut off.
- **Color modes:** let the uncolored `.table` follow the page. Use `data-bs-theme="dark"` only for an intentional local mode, not as a permanent setting on a table that must follow the toggle.
- **Theming:** treat `.table-*` color variants as non-adaptive in stock 5.3; their CSS variables contain Sass-generated colors. The base table background uses the body background; the transparent default belongs to `--bs-table-accent-bg`. Inspect painted cells and their state overlays; see [color-modes.md](color-modes.md) → Tables and overlays.
- **Sticky headers are NOT built in.** Bootstrap ships no sticky-header feature; the pattern needs a few lines of custom CSS. That, plus selection columns, `aria-sort` sorting, bulk-action bars, and responsive strategies: [bootstrap-reference.md](bootstrap-reference.md) → Dense data tables.

### Toasts

```html
<div class="toast" role="status" aria-live="polite" aria-atomic="true">
	<div class="toast-header">
		<strong class="me-auto">Deployment</strong>
		<small>11 mins ago</small>
		<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
	</div>
	<div class="toast-body">Changes published.</div>
</div>

<div class="toast align-items-center bg-primary-subtle border-0" role="status" aria-live="polite">
	<div class="d-flex">
		<div class="toast-body">Color tone</div>
		<button
			type="button"
			class="btn-close me-2 m-auto"
			data-bs-dismiss="toast"
			aria-label="Close"
		></button>
	</div>
</div>

<!-- One fixed container stacks all toasts (flex column) -->
<div class="toast-container position-fixed top-0 end-0 p-3">
	<div class="toast" role="status" aria-live="polite" aria-atomic="true">…</div>
	<div class="toast" role="status" aria-live="polite" aria-atomic="true">…</div>
</div>
```

Toasts are **opt-in** — hidden until `.show()` is called (or shown through a trigger). Keep the container in the DOM before showing so the live region announces. Use `role="status"`/`aria-live="polite"` for confirmations; reserve `role="alert"`/`assertive` for urgent messages. Errors requiring action are never toasts — see [bootstrap-reference.md](bootstrap-reference.md) → Feedback discipline.

### Tooltip (Requires Popper.js)

```html
<button
	type="button"
	class="btn btn-secondary"
	data-bs-toggle="tooltip"
	data-bs-placement="top"
	data-bs-title="Tooltip on top"
>
	Tooltip on top
</button>
<!-- data-bs-placement: top | right | bottom | left (auto-flipped in RTL) -->

<button
	type="button"
	class="btn btn-secondary"
	data-bs-toggle="tooltip"
	data-bs-html="true"
	data-bs-title="<em>Tooltip</em> <u>with</u> <b>HTML</b>"
>
	Tooltip with HTML
</button>
```

Tooltips are **opt-in** (JS init required, below). Only attach to focusable elements so keyboard users can trigger them; never put essential information _only_ in a tooltip, and never report form errors through a tooltip. `data-bs-html` with untrusted content is an XSS vector.

## JavaScript Initialization

Data-attribute components (modal, collapse, dropdown, offcanvas, tab, alert dismiss) work from markup alone. **Tooltips and popovers do not** — they must be constructed; **toasts** stay hidden until shown:

```js
// Required for every tooltip/popover on the page
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map((el) => new bootstrap.Tooltip(el))

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map((el) => new bootstrap.Popover(el))

// Programmatic control — prefer getOrCreateInstance over `new` when the
// element may already be initialized (e.g. by a data attribute)
const myModal = bootstrap.Modal.getOrCreateInstance('#myModal')
myModal.show()

const myToast = bootstrap.Toast.getOrCreateInstance('#myToast')
myToast.show()
```

Constructors accept elements or CSS selector strings. Full lifecycle — `getInstance`, `dispose()` on unmount, event pairs (`show.bs.*` / `shown.bs.*`), async behavior, and why an SPA prefers a framework wrapper: [bootstrap-reference.md](bootstrap-reference.md) → JavaScript lifecycle.

## Icons

Bootstrap's core CSS ships **no icons**. The `.bi` SVGs in examples come from the companion [Bootstrap Icons](https://icons.getbootstrap.com/) library (`bootstrap-icons` package) — a separate install, used as inline SVG / SVG sprite (preferred) or icon font (`<i class="bi bi-check"></i>`). Decorative icons get `aria-hidden="true"`; meaningful icons get `role="img"` + `aria-label`. Pairs with the `.icon-link` helper ([utilities.md](utilities.md) → Helpers).

### Status glyph marks

The textless mark that survives both themes — dots, ticks, rings, pulses — is a glyph, not a badge ([Badge](#badge)). Inline SVG or icon font, the composition rules are the same:

```html
<span class="bi bi-circle-fill fs-6 lh-1" role="img" aria-label="Healthy"></span>
<span class="bi bi-circle fs-6 lh-1" role="img" aria-label="Not started"></span>
```

- **Inherit the owning foreground.** Keep ordinary glyphs on body or component text, including selected fills. Add `text-*-emphasis` only for a deliberate semantic tint on a known, measured surface; never apply it to every mark on a subtle fill. Measure meaningful marks at **≥ 3:1** in light and dark. Take cascade exceptions from [color-modes.md](color-modes.md).
- **Filled and hollow say different things** — done vs pending, live vs idle — so pair glyphs that share one advance width (a filled/hollow pair from the same icon family). Mixed widths make a column of marks jitter row to row.
- **Size with `fs-*` _and_ `lh-1`.** A glyph inherits the row's line-height, so an `fs-*` bump without `lh-1` grows the line box and pushes the row taller than its neighbors.
- Give the mark an accessible name (`role="img"` + `aria-label`, or a `.visually-hidden` word next to an `aria-hidden` glyph) — a mark whose only meaning is its color and shape is color-only status.

## Enterprise notes (components)

### Choosing components

| Need                                           | Prefer                                                                     | Avoid                                          |
| ---------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------- |
| Primary page actions                           | `btn` / `btn-group` / `btn-toolbar`                                        | Random links styled as buttons inconsistently  |
| Full-width stacks (sidebars, empty-state CTAs) | `d-grid gap-2` + `btn`                                                     | Absolute positioning                           |
| Switching in-page views                        | `nav-tabs` / `nav-pills` / `nav-underline` + tab panes or equivalent state | Anchor links that only scroll a long page      |
| App sidebar navigation                         | Responsive `offcanvas-{bp}` + `nav`                                        | Hand-rolled drawer JS                          |
| Structured groups                              | `card` with `card-header` / `card-body` / `card-footer`                    | Ad-hoc bordered `div`s with mismatched padding |
| Ordered instructions / schemas                 | `list-group` / `list-group-numbered`                                       | Unstyled paragraphs pretending to be steps     |
| Long documentation in-product                  | `accordion` or scrollable `modal`                                          | One infinite tinted card stack                 |
| Dense data                                     | `table` + `table-responsive` (+ `table-sm` when appropriate)               | Non-semantic grids of text                     |
| Choosing a form value                          | `form-select` (or native input)                                            | A `dropdown` menu posing as an input           |
| Confirmations / focused tasks                  | native `<dialog>` with header, body, footer actions                        | Nested modals                                  |
| Secondary filters on small screens             | `offcanvas`                                                                | Permanent wide sidebars that crush content     |
| Transient success feedback                     | `toast`                                                                    | `alert()`; toasts for errors                   |
| Loading a known layout                         | `placeholder` skeleton                                                     | Layout-collapsing centered spinner             |

### Forms

- Prefer visible labels or `.form-floating` — placeholder-only labels fail accessibility and disappear on input.
- Pair help and errors with `aria-describedby`; use `.invalid-feedback` with `.is-invalid` and mark the field `aria-invalid="true"`.
- Money/units: `.input-group` + `.input-group-text`; add `.has-validation` on groups with validation feedback.
- Show progress with `spinner-border spinner-border-sm` inside the submit button while waiting; keep submit enabled and validate on submit rather than disabling it ([bootstrap-reference.md](bootstrap-reference.md) → Forms in production).

### Selection fills

Keep the component's selected foreground on ordinary labels and glyphs. Remove a competing
semantic tint before changing its active fill; handle an independently filled badge through
[color-modes.md](color-modes.md) → Alerts, buttons, and selection.

Verify that chosen and unchosen filters remain distinguishable in light and dark. Do not assume
that a neutral outline always inverts meaning or that an accent hue repairs it. Preserve the
checked/pressed state and add a visible non-color cue when the fill alone is ambiguous.

Use `aria-current` for current navigation, `aria-selected` for tabs, and native checked state for
checkboxes/radios. Match the visual state to the applicable pattern; do not apply `aria-current`
to every selection widget.

### Navigation & overlays

- Active nav items need `aria-current="page"` (or `aria-selected="true"` for tabs).
- Modals and offcanvas: set `aria-labelledby`; Bootstrap traps focus and restores it on close — do not fight it; `dispose()` instances when the host unmounts in SPAs.
- Icon-only controls always need an accessible name (`aria-label` or visually-hidden text) and a ≥24px target.

### Theming

- Preserve native component colors and prefer adaptive quiet surfaces. Take ownership, solid exceptions, nested modes, and deprecated-class replacements from [color-modes.md](color-modes.md). Do not assume every component variable adapts.
- To restyle a component, override its `--bs-{component}-*` variables in your own scope instead of writing high-specificity rules — see [bootstrap-reference.md](bootstrap-reference.md) → Theming & design tokens.

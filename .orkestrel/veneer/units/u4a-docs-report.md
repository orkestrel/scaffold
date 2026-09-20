# U4a-docs report (researcher, native Sonnet, 2026-09-20, 211 s; substitution for the Grok lane, which cannot reach the web in print mode)

Question: For each Bootstrap 5.3 JavaScript component and for its color-mode and Reboot contracts, what does the official documentation commit to: data attributes, option tables with defaults and types, methods, events, keyboard behavior, dismissal rules, accessibility notes, and the CSS variables each component documents?

## Evidence

### `https://getbootstrap.com/docs/5.3/getting-started/javascript/`

- **Data attributes (§ Data attributes).** Options are set through kebab-case `data-bs-*` attributes (e.g. `data-bs-custom-class`). As of v5.2.0 an experimental `data-bs-config` attribute carries a JSON blob; the final configuration merges `data-bs-config`, individual `data-bs-*` attributes, and the JS options object, with the last key-value pair winning (`data-bs-config='{"delay":0, "title":123}' data-bs-title="456"` resolves `title: 456`). Only one `data-bs-*` toggle set is allowed per element.
- **Events (§ Events).** Every plugin fires paired infinitive/past-participle events (`show`/`shown`, `hide`/`hidden`). Infinitive events are cancelable through `event.preventDefault()`; returning `false` from a handler also cancels.
- **Methods common to all plugins (§ Programmatic API).** `dispose` destroys the component and clears stored data; `getInstance` (static) returns the bound instance or `null`; `getOrCreateInstance` (static) returns the bound instance or constructs one, accepting an optional config as the second argument. Static properties `NAME` and `VERSION` are documented (e.g. `bootstrap.Tooltip.VERSION`).
- **Asynchronous methods and transition note (§ Asynchronous functions and transitions).** "All API methods are asynchronous and start a transition"; each "returns to the caller before it ends." A method call on a still-transitioning component is ignored. `dispose()` must not be called immediately after `hide()`; the page instructs waiting for the completion event first.
- **Sanitizer/allowlist (§ Sanitizer).** Tooltip and popover sanitize content by default. Global allowlist attributes: `class`, `dir`, `id`, `lang`, `role`, and any `aria-*` attribute matching `/^aria-[\w-]*$/i`. Per-tag allowances are documented for `a` (`target`, `href`, `title`, `rel`) and `img` (`src`, `srcset`, `alt`, `title`, `width`, `height`), among others. The allowlist is mutable (`bootstrap.Tooltip.Default.allowList`) and a `sanitizeFn` option overrides sanitization entirely.
- **Selectors (§ Selectors).** Plugins use native `querySelector`/`querySelectorAll`; a CSS special character in a selector (such as in `collapse:Example`) must be escaped.
- No accessibility content is documented on this page beyond a link to the separate accessibility guide.

### `https://getbootstrap.com/docs/5.3/components/alerts/`

- **Options.** No component-specific options table; alert has no `new bootstrap.Alert(el, options)` configuration surface documented.
- **Methods (§ Methods).** `close` — closes and removes the alert from the DOM, fading it out first if `.fade`/`.show` are present. `dispose`, `getInstance`, `getOrCreateInstance` as the common pattern.
- **Events (§ Events).** `close.bs.alert` — fires immediately on `close()` call; preventable not stated. `closed.bs.alert` — fires once the alert is removed and CSS transitions finish; preventable not stated.
- **Data attributes/markup (§ Usage / Dismissing).** `data-bs-dismiss="alert"` on a control element inside the alert; `data-bs-target="#my-alert"` when dismissing an alert other than the ancestor. Minimal markup: `<div class="alert alert-primary" role="alert">`; dismissible form adds `.alert-dismissible.fade.show` and a `<button class="btn-close" data-bs-dismiss="alert" aria-label="Close">`.
- **Keyboard/accessibility (§ Additional resources / Dismissing).** Color alone must not convey meaning — pair with visible text and sufficient contrast. Dismissal moves focus away; the page recommends listening for `closed.bs.alert` and setting `.focus()` programmatically, adding `tabindex="-1"` when the focus target is non-interactive.
- **CSS variables (§ CSS variables, "Added in v5.2.0").** `--bs-alert-bg`, `--bs-alert-padding-x`, `--bs-alert-padding-y`, `--bs-alert-margin-bottom`, `--bs-alert-color`, `--bs-alert-border-color`, `--bs-alert-border`, `--bs-alert-border-radius`, `--bs-alert-link-color`. Sass variables: `$alert-padding-y`, `$alert-padding-x`, `$alert-margin-bottom`, `$alert-border-radius`, `$alert-link-font-weight`, `$alert-border-width`, `$alert-dismissible-padding-r`. The `alert-variant()` mixin is marked "Deprecated in v5.3.0."

### `https://getbootstrap.com/docs/5.3/components/buttons/`

- **Options.** No configuration options table; Button plugin exposes only the `toggle` behavior, no constructor options documented.
- **Methods (§ Methods).** `toggle` — toggles push state; `dispose`; `getInstance`; `getOrCreateInstance`.
- **Events.** No events table is documented for the Button plugin on this page.
- **Data attributes/markup (§ Button plugin / Toggle states).** `data-bs-toggle="button"` enables toggle; `.active` plus `aria-pressed="true"` marks a pre-toggled button; a disabled toggle combines `disabled` (buttons) with `data-bs-toggle="button"`. `role="button"` is required on `<a>` elements used as buttons.
- **Keyboard/accessibility.** Screen readers announce toggle buttons as "button"/"button pressed," not as a checkbox. For disabled `<a>` buttons: `.disabled` class, `aria-disabled="true"`, and `tabindex="-1"` (documented on this page for link-styled buttons; `tabindex="-1"` is recommended for links with `href`).
- **CSS variables ("Added in v5.2.0").** `--bs-btn-padding-x`, `--bs-btn-padding-y`, `--bs-btn-font-family`, `--bs-btn-font-size`, `--bs-btn-font-weight`, `--bs-btn-line-height`, `--bs-btn-color`, `--bs-btn-bg`, `--bs-btn-border-width`, `--bs-btn-border-color`, `--bs-btn-border-radius`, `--bs-btn-hover-border-color`, `--bs-btn-box-shadow`, `--bs-btn-disabled-opacity`, `--bs-btn-focus-box-shadow`, `--bs-btn-hover-color`, `--bs-btn-hover-bg`, `--bs-btn-focus-shadow-rgb`, `--bs-btn-active-color`, `--bs-btn-active-bg`, `--bs-btn-active-border-color`, `--bs-btn-active-shadow`, `--bs-btn-disabled-color`, `--bs-btn-disabled-bg`, `--bs-btn-disabled-border-color`. Sass mixins: `button-variant()`, `button-outline-variant()`, `button-size()`.

### `https://getbootstrap.com/docs/5.3/components/carousel/`

- **Options.** `interval` (number, `5000`); `keyboard` (boolean, `true`); `pause` (string|boolean, `"hover"`); `ride` (string|boolean, `false`); `touch` (boolean, `true`); `wrap` (boolean, `true`) — descriptions as fetched verbatim.
- **Methods.** `cycle`, `dispose`, `getInstance` (static), `getOrCreateInstance` (static), `next` ("returns to the caller before the next item has been shown"), `nextWhenVisible` ("returns to the caller before the target item has been shown"), `pause`, `prev` (same async note), `to` (same async note).
- **Events.** `slide.bs.carousel`, `slid.bs.carousel`; the page does not state preventability for either. Event properties: `direction`, `relatedTarget`, `from`, `to`.
- **Data attributes/markup.** `data-bs-ride="carousel"|"true"`, `data-bs-slide="prev"|"next"`, `data-bs-slide-to="0"`, `data-bs-target`, `data-bs-interval`, `data-bs-touch`, `data-bs-pause`, `data-bs-keyboard`, `data-bs-wrap`, `data-bs-config`. Minimal markup shown includes `.carousel.slide`, `.carousel-inner`, `.carousel-item(.active)`, and control buttons with `aria-hidden="true"` icon spans and `.visually-hidden` text.
- **Keyboard/accessibility.** Reacts to keyboard by default (`keyboard: true`). Autoplaying carousels must supply a pause/stop control; the page cites WCAG 2.2 Success Criterion 2.2.2. Animation is gated on `prefers-reduced-motion`. Touch swipe is enabled by default. Manual `new bootstrap.Carousel(...)` initialization is required except when `data-bs-ride="carousel"` is used.
- **CSS variables.** No `--bs-*` custom-property list is given on this page. Sass variables: `$carousel-control-color`, `$carousel-control-width`, `$carousel-control-opacity`, `$carousel-control-hover-opacity`, `$carousel-control-transition`, `$carousel-control-icon-filter`, `$carousel-indicator-*` (width, height, hit-area-height, spacer, opacity, active-bg, active-opacity, transition), `$carousel-caption-*` (width, color, padding-y, spacer), `$carousel-control-icon-width`, `$carousel-control-prev-icon-bg`, `$carousel-control-next-icon-bg`, `$carousel-transition-duration`, `$carousel-transition`. Deprecation notes: `.carousel-dark` deprecated in v5.3.0 (use `data-bs-theme="dark"`); `$carousel-dark-*` variables deprecated in v5.3.4.

### `https://getbootstrap.com/docs/5.3/components/collapse/`

- **Options.** `parent` (selector|DOM element, `null`) — closes sibling collapsible items under the given parent, attribute set on the target collapsible area; `toggle` (boolean, `true`).
- **Methods.** `dispose`; `getInstance` (static); `getOrCreateInstance` (static); `hide` ("returns to the caller before the collapsible element has actually been hidden"); `show` (same async note, before shown); `toggle` (same async note, before shown or hidden).
- **Events.** `hide.bs.collapse`, `hidden.bs.collapse`, `show.bs.collapse`, `shown.bs.collapse`; preventability is not stated for any.
- **Data attributes/markup.** `data-bs-toggle="collapse"`, `data-bs-target` (or `href`), `data-bs-parent="#selector"`, `data-bs-animation`, `data-bs-config`. Minimal markup: trigger button carries `aria-expanded="false"` and `aria-controls="collapseExample"`; target is `<div class="collapse" id="collapseExample">`. Horizontal variant adds `.collapse-horizontal`.
- **Keyboard/accessibility.** `aria-expanded` state and `aria-controls` reference are required on the control; `role="button"` is required on non-button controls. Animation is gated on `prefers-reduced-motion`. The page states its implementation "does not cover optional keyboard interactions described in the ARIA Authoring Practices Guide accordion pattern" and that custom JavaScript is required for that.
- **CSS variables.** No `--bs-*` list documented for collapse. Sass variables: `$transition-collapse`, `$transition-collapse-width`.

### `https://getbootstrap.com/docs/5.3/components/dropdowns/`

- **Options.** `autoClose` (boolean|string, `true`) with values `true`, `false`, `'inside'`, `'outside'`, noting the dropdown can always be closed with Esc; `boundary` (string|element, `'clippingParents'`); `display` (string, `'dynamic'`); `offset` (array|string|function, `[0, 2]`); `popperConfig` (null|object|function, `null`); `reference` (string|element|object, `'toggle'`).
- **Methods.** `dispose`; `getInstance` (static); `getOrCreateInstance` (static); `hide`; `show`; `toggle`; `update`.
- **Events.** `hide.bs.dropdown` and `hidden.bs.dropdown` carry a `clickEvent` property when triggered by a click; `show.bs.dropdown`; `shown.bs.dropdown`. Preventability is not stated in the fetched table.
- **Data attributes/markup.** `data-bs-toggle="dropdown"`, `data-bs-offset`, `data-bs-reference`, `data-bs-display="static"`, `data-bs-auto-close`. Minimal markup: `.dropdown` wrapper, `.dropdown-toggle` button with `aria-expanded="false"`, `.dropdown-menu` list with `.dropdown-item` anchors. Split-button variant adds `.dropdown-toggle-split`.
- **Keyboard/accessibility.** Dropdowns toggle on click, not hover, by design. Built-in keyboard support: cursor keys move through items, Esc closes. Bootstrap does not add `role="menu"` or `aria-*` attributes automatically — authors must add them. `role="button"` is required on `<a>` triggers; `aria-current` for active items; `aria-disabled="true"` for disabled items. Requires Popper (bundled in `bootstrap.bundle.min.js`). On touch devices empty `mouseover` handlers are added to immediate children of `<body>` for an iOS event-delegation quirk.
- **CSS variables ("Added in v5.2.0" for CSS-variable support).** `--bs-dropdown-zindex`, `--bs-dropdown-min-width`, `--bs-dropdown-padding-x`, `--bs-dropdown-padding-y`, `--bs-dropdown-spacer`, `--bs-dropdown-font-size`, `--bs-dropdown-color`, `--bs-dropdown-bg`, `--bs-dropdown-border-color`, `--bs-dropdown-border-radius`, `--bs-dropdown-border-width`, `--bs-dropdown-inner-border-radius`, `--bs-dropdown-divider-bg`, `--bs-dropdown-divider-margin-y`, `--bs-dropdown-box-shadow`, `--bs-dropdown-link-color`, `--bs-dropdown-link-hover-color`, `--bs-dropdown-link-hover-bg`, `--bs-dropdown-link-active-color`, `--bs-dropdown-link-active-bg`, `--bs-dropdown-link-disabled-color`, `--bs-dropdown-item-padding-x`, `--bs-dropdown-item-padding-y`, `--bs-dropdown-item-border-radius`, `--bs-dropdown-header-color`, `--bs-dropdown-header-padding-x`, `--bs-dropdown-header-padding-y`. `.dropdown-menu-dark` deprecated in v5.3.0 in favor of `data-bs-theme="dark"`.

### `https://getbootstrap.com/docs/5.3/components/modal/`

- **Options.** `backdrop` (boolean|`'static'`, `true`); `focus` (boolean, `true`); `keyboard` (boolean, `true`).
- **Methods.** `dispose`; `getInstance` (static); `getOrCreateInstance` (static); `handleUpdate` — readjusts position if the modal's height changes while open; `hide` ("returns to the caller before the modal has actually been hidden"); `show` (same async note; also accepts a DOM element argument surfaced as `relatedTarget` on modal events); `toggle` (same async note, before shown or hidden).
- **Events.** `hide.bs.modal` — preventable (`event.preventDefault()`); `hidden.bs.modal` — not preventable; `hidePrevented.bs.modal` — fired when a `static`-backdrop modal is clicked outside, or Esc is pressed with `keyboard: false`; `show.bs.modal` — exposes `relatedTarget` when triggered by a click; `shown.bs.modal` — same `relatedTarget` note.
- **Data attributes/markup (dismissal rules).** `data-bs-toggle="modal"` plus `data-bs-target="#foo"` (or `href="#foo"`) to open; `data-bs-dismiss="modal"` inside the modal to close, or combined with `data-bs-target` on an external control; `data-bs-backdrop="static"` disables outside-click dismissal; `data-bs-keyboard="false"` disables Esc dismissal; `data-bs-whatever` passes custom data retrievable through `event.relatedTarget`. Minimal markup: `.modal.fade` with `tabindex="-1"`, `aria-labelledby`, `aria-hidden="true"`, nested `.modal-dialog > .modal-content > .modal-header/.modal-body/.modal-footer`.
- **Keyboard/accessibility.** The `autofocus` HTML attribute has no effect inside modals; the page instructs focusing an element manually on `shown.bs.modal`. `aria-labelledby` referencing the title is required; `aria-describedby` is optional. Esc closes by default; disable through `keyboard: false` or `data-bs-keyboard="false"`. Animation gated on `prefers-reduced-motion`.
- **Dismissal rules.** Only one modal window is supported at a time; nested modals are not supported. `position: fixed` requires placing the modal markup at the top level to avoid rendering issues with other fixed-position ancestors, and this has documented caveats on mobile.
- **CSS variables.** `--bs-modal-zindex`, `--bs-modal-width`, `--bs-modal-padding`, `--bs-modal-margin`, `--bs-modal-color`, `--bs-modal-bg`, `--bs-modal-border-color`, `--bs-modal-border-width`, `--bs-modal-border-radius`, `--bs-modal-box-shadow`, `--bs-modal-inner-border-radius`, `--bs-modal-header-padding-x`, `--bs-modal-header-padding-y`, `--bs-modal-header-padding`, `--bs-modal-header-border-color`, `--bs-modal-header-border-width`, `--bs-modal-title-line-height`, `--bs-modal-footer-gap`, `--bs-modal-footer-bg`, `--bs-modal-footer-border-color`, `--bs-modal-footer-border-width`, `--bs-backdrop-zindex`, `--bs-backdrop-bg`, `--bs-backdrop-opacity`.

### `https://getbootstrap.com/docs/5.3/components/offcanvas/`

- **Options.** `backdrop` (boolean|`'static'`, `true`); `keyboard` (boolean, `true`); `scroll` (boolean, `false`) — allows body scrolling while open.
- **Methods.** `dispose`; `getInstance` (static); `getOrCreateInstance` (static); `hide` ("returns to the caller before the offcanvas element has actually been hidden"); `show` (same async note); `toggle` (same async note).
- **Events.** `hide.bs.offcanvas`, `hidden.bs.offcanvas`, `hidePrevented.bs.offcanvas` (fired for a `static` backdrop clicked outside, or Esc pressed with `keyboard: false`), `show.bs.offcanvas`, `shown.bs.offcanvas`. Preventability not itemized per row in the fetched table.
- **Data attributes/markup.** `data-bs-toggle="offcanvas"` plus `data-bs-target`/`href`; `data-bs-dismiss="offcanvas"` (inside, or with `data-bs-target` for an outside control); `data-bs-backdrop`, `data-bs-keyboard`, `data-bs-scroll`. Placement classes `.offcanvas-start`, `.offcanvas-end`, `.offcanvas-top`, `.offcanvas-bottom`; responsive classes `.offcanvas-sm`…`.offcanvas-xxl` ("Added in v5.2.0"). Minimal markup: `.offcanvas.offcanvas-start` with `tabindex="-1"`, `aria-labelledby`, header with `.btn-close` and `data-bs-dismiss="offcanvas"`.
- **Keyboard/accessibility.** `aria-labelledby` referencing the offcanvas title is required; `role="dialog"` is added automatically through JavaScript. Animation gated on `prefers-reduced-motion`. `margin` and `translate` must not be used on the `.offcanvas` element itself.
- **CSS variables ("Added in v5.2.0").** `--bs-offcanvas-zindex`, `--bs-offcanvas-width`, `--bs-offcanvas-height`, `--bs-offcanvas-padding-x`, `--bs-offcanvas-padding-y`, `--bs-offcanvas-color`, `--bs-offcanvas-bg`, `--bs-offcanvas-border-width`, `--bs-offcanvas-border-color`, `--bs-offcanvas-box-shadow`, `--bs-offcanvas-transition`, `--bs-offcanvas-title-line-height`. Dark offcanvas variant deprecated in v5.3.0 in favor of `data-bs-theme="dark"`.

### `https://getbootstrap.com/docs/5.3/components/popovers/`

- **Options.** `allowList` (object, default per the sanitizer page); `animation` (boolean, `true`); `boundary` (string|element, `'clippingParents'`); `container` (string|element|false, `false`); `content` (string|element|function, `''`); `customClass` (string|function, `''`); `delay` (number|object, `0`); `fallbackPlacements` (string|array, `['top','right','bottom','left']`); `html` (boolean, `false`); `offset` (number|string|function, `[0, 8]`); `placement` (string|function, `'right'`); `popperConfig` (null|object|function, `null`); `sanitize` (boolean, `true`); `sanitizeFn` (null|function, `null`); `selector` (string|false, `false` — the page notes `title` must not be used as a selector); `template` (string, the documented default popover markup); `title` (string|element|function, `''`); `trigger` (string, `'click'`, noting `'hover'` alone cannot be triggered by keyboard).
- **Methods.** `disable`; `dispose` (notes delegated popovers created with `selector` cannot be individually destroyed on descendant triggers); `enable` (popovers enabled by default); `getInstance` (static); `getOrCreateInstance` (static); `hide` ("returns to the caller before the popover has actually been hidden," described as manual triggering); `setContent`; `show` (same async note; zero-length title and content are never displayed); `toggle` (same async note); `toggleEnabled`; `update`.
- **Events.** `hide.bs.popover`, `hidden.bs.popover`, `inserted.bs.popover` (fires after `show.bs.popover` once the template is added to the DOM), `show.bs.popover`, `shown.bs.popover`. The page's table does not mark any of them preventable.
- **Data attributes/markup.** `data-bs-toggle="popover"`, `data-bs-title`, `data-bs-content`, `data-bs-placement`, `data-bs-container`, `data-bs-custom-class`, `data-bs-trigger`, `data-bs-offset`, `data-bs-animation`, `data-bs-delay`, `data-bs-html`, `data-bs-config`. Dismissal on next click requires an `<a>` element (not `<button>`) with a `tabindex`, per the page's cross-browser note.
- **Keyboard/accessibility.** Popovers must only attach to naturally focusable/interactive elements; adding `tabindex="0"` to non-interactive elements is discouraged because assistive technology largely does not announce popovers there. `hover` alone must not be the sole trigger. Content is tied to the trigger through `aria-describedby`, so excessive `html` content is announced as one uninterrupted stream. Popovers do not manage keyboard focus order; placing interactive content inside is discouraged in favor of a modal dialog.
- **CSS variables (§ Variables).** `--bs-popover-zindex`, `--bs-popover-max-width`, `--bs-popover-font-size`, `--bs-popover-bg`, `--bs-popover-border-width`, `--bs-popover-border-color`, `--bs-popover-border-radius`, `--bs-popover-inner-border-radius`, `--bs-popover-box-shadow`, `--bs-popover-header-padding-x`, `--bs-popover-header-padding-y`, `--bs-popover-header-font-size`, `--bs-popover-header-color`, `--bs-popover-header-bg`, `--bs-popover-body-padding-x`, `--bs-popover-body-padding-y`, `--bs-popover-body-color`, `--bs-popover-arrow-width`, `--bs-popover-arrow-height`, `--bs-popover-arrow-border`. "Added in v5.2.0": custom popovers through CSS variables with `data-bs-custom-class`. Popovers require Popper and are opt-in — must be initialized manually.

### `https://getbootstrap.com/docs/5.3/components/scrollspy/`

- **Options.** `rootMargin` (string, `0px 0px -25%`); `smoothScroll` (boolean, `false`); `target` (string|DOM element, `null`); `threshold` (array, `[0.1, 0.5, 1]`). `offset` and `method` are documented as deprecated (used through v5.1.3, replaced by `rootMargin`, backward-compatible through v5, to be removed in v6).
- **Methods.** `dispose`; `getInstance` (static); `getOrCreateInstance` (static); `refresh` — required after adding or removing observed DOM elements.
- **Events.** `activate.bs.scrollspy` — fires on the scroll element when an anchor is activated.
- **Data attributes/markup.** `data-bs-spy="scroll"`, `data-bs-target`, `data-bs-root-margin`, `data-bs-smooth-scroll`, `data-bs-offset` (deprecated), `data-bs-config`. The scroll container needs `tabindex="0"` for keyboard access. Requires nav/list-group/anchor elements plus a scrollable container (`<body>` or an element with set `height` and `overflow-y: scroll`); links must resolve to real `id` targets; non-visible target elements are ignored.
- **Keyboard/accessibility.** `tabindex="0"` required on the scroll container for keyboard access; no further accessibility notes fetched.
- **CSS variables.** None documented on this page.

### `https://getbootstrap.com/docs/5.3/components/navs-tabs/`

- **Options.** No JavaScript constructor options table for the Tab plugin is present on this page.
- **Methods.** `dispose`; `getInstance` (static); `getOrCreateInstance` (static); `show` — selects the given tab and shows its pane, returning before the pane is shown (before `shown.bs.tab`).
- **Events.** `hide.bs.tab`, `show.bs.tab`, `hidden.bs.tab`, `shown.bs.tab`, in that documented firing order; the page's table marks each "No" for preventable. `event.target`/`event.relatedTarget` semantics are documented per event.
- **Data attributes/markup.** `data-bs-toggle="tab"` or `data-bs-toggle="pill"`, `data-bs-target`. Minimal markup: `<ul class="nav nav-tabs" role="tablist">` with `<button role="tab" aria-controls aria-selected>`, paired with `.tab-content > .tab-pane[role="tabpanel"]`.
- **Keyboard/accessibility.** `role="tablist"`/`role="tab"`/`role="tabpanel"` for dynamic interfaces; `aria-current="page"` for static nav active state; `aria-selected`, `aria-controls`, `aria-labelledby` for dynamic tabs; `tabindex="0"` on tab panes for focusability. Roving `tabindex` manages focus (inactive tabs get `tabindex="-1"`). Documented keys: Up/Left = previous tab, Down/Right = next tab, Home = first tab, End = last tab. The page states `role="tablist"` must not be used on `<nav>` elements, and the JavaScript plugin does not support dropdowns inside tab interfaces.
- **CSS variables.** Base `.nav`: `--bs-nav-link-padding-x`, `--bs-nav-link-padding-y`, `--bs-nav-link-font-size`, `--bs-nav-link-font-weight`, `--bs-nav-link-color`, `--bs-nav-link-hover-color`, `--bs-nav-link-disabled-color`. `.nav-tabs`: `--bs-nav-tabs-border-width`, `--bs-nav-tabs-border-color`, `--bs-nav-tabs-border-radius`, `--bs-nav-tabs-link-hover-border-color`, `--bs-nav-tabs-link-active-color`, `--bs-nav-tabs-link-active-bg`, `--bs-nav-tabs-link-active-border-color`. `.nav-pills`: `--bs-nav-pills-border-radius`, `--bs-nav-pills-link-active-color`, `--bs-nav-pills-link-active-bg`. `.nav-underline` ("v5.3.0+"): `--bs-nav-underline-gap`, `--bs-nav-underline-border-width`, `--bs-nav-underline-link-active-color`.

### `https://getbootstrap.com/docs/5.3/components/toasts/`

- **Options.** `animation` (boolean, `true`); `autohide` (boolean, `true`); `delay` (number, `5000`).
- **Methods.** `dispose` — "hides an element's toast... will remain on the DOM but won't show anymore"; `getInstance` (static); `getOrCreateInstance` (static); `hide` ("returns to the caller before the toast has actually been hidden"; must be called manually when `autohide: false`); `isShown` — returns a boolean; `show` (same async note; must be called manually to display the toast).
- **Events.** `hide.bs.toast`, `hidden.bs.toast`, `show.bs.toast`, `shown.bs.toast`; preventability is not indicated in the fetched table.
- **Data attributes/markup.** `data-bs-dismiss="toast"` (inside, or with `data-bs-target` for an outside control), `data-bs-autohide`, `data-bs-delay`, `data-bs-animation`, `data-bs-config` (experimental, v5.2.0+). Minimal markup: `.toast[role="alert"][aria-live="assertive"][aria-atomic="true"]` with `.toast-header` and `.toast-body`, `.btn-close` carrying `data-bs-dismiss="toast"`.
- **Keyboard/accessibility.** Toasts must be wrapped in an `aria-live` region present in markup before the toast is generated; `aria-atomic="true"` announces the whole toast; `role="alert" aria-live="assertive"` for important/error content, `role="status" aria-live="polite"` otherwise. `delay` must give the reader enough time. `autohide: false` requires a manual close control. Focusable/actionable controls inside an autohiding toast are discouraged because of the timing difficulty for keyboard/assistive-technology users. Toasts do not receive focus when displayed.
- **CSS variables ("v5.2.0").** `--bs-toast-zindex`, `--bs-toast-padding-x`, `--bs-toast-padding-y`, `--bs-toast-spacing`, `--bs-toast-max-width`, `--bs-toast-font-size`, `--bs-toast-color`, `--bs-toast-bg`, `--bs-toast-border-width`, `--bs-toast-border-color`, `--bs-toast-border-radius`, `--bs-toast-box-shadow`, `--bs-toast-header-color`, `--bs-toast-header-bg`, `--bs-toast-header-border-color`.

### `https://getbootstrap.com/docs/5.3/components/tooltips/`

- **Options.** `allowList` (object, default per sanitizer page); `animation` (boolean, `true`); `boundary` (string|element, `'clippingParents'`); `container` (string|element|false, `false`); `customClass` (string|function, `''`); `delay` (number|object, `0`); `fallbackPlacements` (array, `['top','right','bottom','left']`); `html` (boolean, `false`); `offset` (array|string|function, `[0, 6]`); `placement` (string|function, `'top'`); `popperConfig` (null|object|function, `null`); `sanitize` (boolean, `true`); `sanitizeFn` (null|function, `null`); `selector` (string|false, `false` — `title` must not be used as a selector); `template` (string, the documented default tooltip markup); `title` (string|element|function, `''`); `trigger` (string, `'hover focus'`, noting `sanitize`/`sanitizeFn`/`allowList` cannot be set through data attributes for security reasons).
- **Methods.** `disable`; `dispose` (delegated tooltips created with `selector` cannot be individually destroyed on descendant triggers); `enable` (enabled by default); `getInstance` (static); `getOrCreateInstance` (static); `hide` (async return-before-event note; manual trigger); `setContent`; `show` (same async note; zero-length titles never display); `toggle` (same async note); `toggleEnabled`; `update`.
- **Events.** `hide.bs.tooltip`, `hidden.bs.tooltip`, `inserted.bs.tooltip` (fires after `show.bs.tooltip` once the template is in the DOM), `show.bs.tooltip`, `shown.bs.tooltip`. Preventability is not marked per row.
- **Data attributes/markup.** Options map to `data-bs-*` in kebab-case (`data-bs-custom-class` for `customClass`). `data-bs-config` supported experimentally as of v5.2.0. Minimal markup: `<a href="#" data-bs-toggle="tooltip" data-bs-title="...">`, generating `.tooltip.bs-tooltip-auto[role="tooltip"] > .tooltip-arrow + .tooltip-inner`.
- **Keyboard/accessibility.** Tooltips must only attach to naturally keyboard-focusable, interactive elements. `hover` alone must not be the sole trigger. Disabled elements need a focusable wrapper (`tabindex="0"` on a `<div>`/`<span>`) since tooltips cannot trigger on `disabled` elements directly. Animation gated on `prefers-reduced-motion`.
- **CSS variables.** `--bs-tooltip-zindex`, `--bs-tooltip-max-width`, `--bs-tooltip-padding-x`, `--bs-tooltip-padding-y`, `--bs-tooltip-margin`, `--bs-tooltip-font-size`, `--bs-tooltip-color`, `--bs-tooltip-bg`, `--bs-tooltip-border-radius`, `--bs-tooltip-opacity`, `--bs-tooltip-arrow-width`, `--bs-tooltip-arrow-height`. "v5.2.0": custom tooltips through CSS variables, `data-bs-config` experimental support. Sass `$tooltip-arrow-color` is "Deprecated in Bootstrap 5.2.0" in favor of the CSS variable; `$tooltip-margin` carries a `// TODO: remove this in v6` source comment reported by the fetch.

### `https://getbootstrap.com/docs/5.3/customize/color-modes/`

- **`data-bs-theme` contract.** Setting `data-bs-theme` on `<html>` applies the mode globally; setting it on any component or element scopes the mode to that subtree, and a scoped value overrides the inherited global one (nested-scope rule).
- **Built-in mode names.** `light` (default) and `dark`; the page also shows a custom mode is possible with an arbitrary value such as `data-bs-theme="blue"`.
- **`color-mode()` mixin (§ Sass mixins).** Fetched verbatim: takes `$mode: light` and `$root: false`; when `$color-mode-type == "media-query"`, wraps content in `@media (prefers-color-scheme: $mode)`, nested in `:root` when `$root: true`; otherwise emits `[data-bs-theme="#{$mode}"] { @content; }`. The `$color-mode-type` Sass variable switches between the `data` attribute approach (default) and the media-query approach.
- **JavaScript theme toggler (§ JavaScript).** The page's full toggler script was fetched verbatim: reads/writes `localStorage.getItem/setItem('theme', ...)`, resolves `'auto'` through `window.matchMedia('(prefers-color-scheme: dark)')`, sets `document.documentElement.setAttribute('data-bs-theme', theme)`, and listens for `change` on the `prefers-color-scheme: dark` media query to re-resolve when no explicit stored theme is set. Toggle buttons carry `data-bs-theme-value` and the script sets `.active` and `aria-pressed` on the selected one.
- **Color-mode CSS variables (§ Variables, dark-mode block).** Documented variable names (values shown as dark-mode overrides): `--bs-body-color`, `--bs-body-color-rgb`, `--bs-body-bg`, `--bs-body-bg-rgb`, `--bs-emphasis-color`, `--bs-emphasis-color-rgb`, `--bs-secondary-color`, `--bs-secondary-color-rgb`, `--bs-secondary-bg`, `--bs-secondary-bg-rgb`, `--bs-tertiary-color`, `--bs-tertiary-color-rgb`, `--bs-tertiary-bg`, `--bs-tertiary-bg-rgb`, per-theme-color `--bs-[color]-text-emphasis`, `--bs-[color]-bg-subtle`, `--bs-[color]-border-subtle`, `--bs-heading-color`, `--bs-link-color`, `--bs-link-hover-color`, `--bs-link-color-rgb`, `--bs-link-hover-color-rgb`, `--bs-code-color`, `--bs-highlight-color`, `--bs-highlight-bg`, `--bs-border-color`, `--bs-border-color-translucent`, `--bs-form-valid-color`, `--bs-form-valid-border-color`, `--bs-form-invalid-color`, `--bs-form-invalid-border-color`. Corresponding `*-dark` Sass variables are listed for theme text-emphasis, background-subtle, and border-subtle sets, plus body/link/code/mark/border/heading and form/accordion dark variables.

### `https://getbootstrap.com/docs/5.3/content/reboot/`

- **`<html>`/`<body>`.** `box-sizing: border-box` set globally; `<body>` gets `font-size: 1rem`, inherited `font-family`/`font-weight`/`line-height`/`color`, and `background-color: #fff`.
- **`<h1>`–`<h6>`.** `margin-top` removed, `margin-bottom: .5rem`, tightened `line-height`, `color` overridable through `--bs-heading-color`.
- **`<p>`.** `margin-top` removed, `margin-bottom: 1rem`.
- **`<a>`.** Default color and underline applied; color set with `rgba()` using `--bs-link-opacity`. An `<a>` with no `href` resets `color`/`text-decoration` to default.
- **`<hr>`.** Styled through `border-top`, `opacity: .25`, and inherits `border-color` from `color`.
- **`<ul>`, `<ol>`, `<dl>`.** `margin-top` removed, `margin-bottom: 1rem`; nested lists drop `margin-bottom`; `padding-left` reset on `<ul>`/`<ol>`.
- **`<dd>`.** `margin-left: 0`, `margin-bottom: .5rem`.
- **`<dt>`.** Bolded.
- **`<code>`, `<pre>`, `<var>`, `<kbd>`, `<samp>`.** Each restyled for inline code, code blocks (`<pre>` drops `margin-top`, uses `rem` for `margin-bottom`), variables, keyboard input, and sample output respectively.
- **`<table>`, `<caption>`.** Borders collapsed, consistent `text-align`.
- **`<fieldset>`, `<legend>`, `<label>`.** `<fieldset>` has no border/padding/margin; `<legend>` restyled as a heading; `<label>` set `display: inline-block`.
- **`<input>`, `<select>`, `<textarea>`, `<button>`.** `margin` removed, `line-height: inherit`; `<textarea>` resizes vertically only; button-type elements get `cursor: pointer` when `:not(:disabled)`.
- **`role="button"`.** `cursor: pointer` applied.
- **`<address>`.** `font-style` reset to `normal`, inherited `line-height`, `margin-bottom: 1rem`.
- **`<blockquote>`.** `margin: 0 0 1rem`.
- **`<abbr>`.** Basic styling applied (no further detail fetched).
- **`<summary>`.** `cursor` reset from `text` to `pointer`.
- **`[hidden]`.** `display: none !important`.
- **CSS variables named.** `--bs-heading-color`, `--bs-link-opacity`, `--bs-body-font-family`, `--bs-body-font-size`, `--bs-body-font-weight`, `--bs-body-line-height`, `--bs-body-text-align`, `--bs-body-color`, `--bs-body-color-rgb`, `--bs-body-bg`, `--bs-body-bg-rgb`, `--bs-emphasis-color`, `--bs-emphasis-color-rgb`, `--bs-secondary-color`, `--bs-secondary-color-rgb`, `--bs-secondary-bg`, `--bs-secondary-bg-rgb`, `--bs-tertiary-color`, `--bs-tertiary-color-rgb`, `--bs-tertiary-bg`, `--bs-tertiary-bg-rgb`.

## Distillate

**JavaScript (cross-cutting)**

| Obligation | Kind | Page |
|---|---|---|
| `data-bs-*` kebab-case option mapping, single toggle set per element | attribute | `getting-started/javascript/` |
| `data-bs-config` JSON merge order (config < data-bs-* < JS object, last wins) | attribute | `getting-started/javascript/` |
| Infinitive/past-participle event pairing, `preventDefault()`/`return false` cancels infinitive events | event | `getting-started/javascript/` |
| `dispose`, `getInstance`, `getOrCreateInstance`, `NAME`, `VERSION` common members | method | `getting-started/javascript/` |
| All API methods asynchronous, return before transition ends, ignored calls mid-transition | method | `getting-started/javascript/` |
| Sanitizer allowlist and `sanitizeFn` override | accessibility | `getting-started/javascript/` |

**Alert**

| Obligation | Kind | Page |
|---|---|---|
| `close`, `dispose`, `getInstance`, `getOrCreateInstance` | method | `components/alerts/` |
| `close.bs.alert`, `closed.bs.alert` | event | `components/alerts/` |
| `data-bs-dismiss="alert"`, `data-bs-target` | attribute | `components/alerts/` |
| Focus lost on dismissal; recommend `closed.bs.alert` + `.focus()` + `tabindex="-1"` | accessibility | `components/alerts/` |
| `--bs-alert-*` variable set | variable | `components/alerts/` |

**Buttons**

| Obligation | Kind | Page |
|---|---|---|
| `toggle`, `dispose`, `getInstance`, `getOrCreateInstance` | method | `components/buttons/` |
| `data-bs-toggle="button"`, `.active` + `aria-pressed` | attribute | `components/buttons/` |
| Screen reader announces "button"/"button pressed," not checkbox | accessibility | `components/buttons/` |
| Disabled `<a>` needs `.disabled`, `aria-disabled="true"`, `tabindex="-1"` | accessibility | `components/buttons/` |
| `--bs-btn-*` variable set | variable | `components/buttons/` |

**Carousel**

| Obligation | Kind | Page |
|---|---|---|
| `interval`, `keyboard`, `pause`, `ride`, `touch`, `wrap` options | option | `components/carousel/` |
| `cycle`, `dispose`, `getInstance`, `getOrCreateInstance`, `next`, `nextWhenVisible`, `pause`, `prev`, `to` | method | `components/carousel/` |
| `slide.bs.carousel`, `slid.bs.carousel` | event | `components/carousel/` |
| `data-bs-ride`, `data-bs-slide`, `data-bs-slide-to`, `data-bs-target`, `data-bs-interval`, `data-bs-touch`, `data-bs-pause`, `data-bs-keyboard`, `data-bs-wrap` | attribute | `components/carousel/` |
| Reacts to keyboard by default; requires manual pause control for autoplay (WCAG 2.2 SC 2.2.2) | keyboard | `components/carousel/` |
| `.carousel-dark` deprecated in v5.3.0 for `data-bs-theme="dark"` | variable | `components/carousel/` |

**Collapse**

| Obligation | Kind | Page |
|---|---|---|
| `parent`, `toggle` options | option | `components/collapse/` |
| `dispose`, `getInstance`, `getOrCreateInstance`, `hide`, `show`, `toggle` | method | `components/collapse/` |
| `hide.bs.collapse`, `hidden.bs.collapse`, `show.bs.collapse`, `shown.bs.collapse` | event | `components/collapse/` |
| `data-bs-toggle="collapse"`, `data-bs-target`, `data-bs-parent` | attribute | `components/collapse/` |
| `aria-expanded`, `aria-controls`, `role="button"` required on controls | accessibility | `components/collapse/` |
| No coverage of ARIA APG accordion keyboard pattern; custom JS required | keyboard | `components/collapse/` |

**Dropdown**

| Obligation | Kind | Page |
|---|---|---|
| `autoClose`, `boundary`, `display`, `offset`, `popperConfig`, `reference` options | option | `components/dropdowns/` |
| `dispose`, `getInstance`, `getOrCreateInstance`, `hide`, `show`, `toggle`, `update` | method | `components/dropdowns/` |
| `hide.bs.dropdown`, `hidden.bs.dropdown`, `show.bs.dropdown`, `shown.bs.dropdown` | event | `components/dropdowns/` |
| `data-bs-toggle="dropdown"`, `data-bs-offset`, `data-bs-reference`, `data-bs-display`, `data-bs-auto-close` | attribute | `components/dropdowns/` |
| Cursor keys move through items, Esc closes; authors must add `role`/`aria-*` themselves | keyboard | `components/dropdowns/` |
| Esc always closes regardless of `autoClose` | dismissal | `components/dropdowns/` |
| `.dropdown-menu-dark` deprecated in v5.3.0 for `data-bs-theme="dark"` | variable | `components/dropdowns/` |

**Modal**

| Obligation | Kind | Page |
|---|---|---|
| `backdrop`, `focus`, `keyboard` options | option | `components/modal/` |
| `dispose`, `getInstance`, `getOrCreateInstance`, `handleUpdate`, `hide`, `show`, `toggle` | method | `components/modal/` |
| `hide.bs.modal` preventable; `hidden.bs.modal`, `hidePrevented.bs.modal`, `show.bs.modal`, `shown.bs.modal` not preventable | event | `components/modal/` |
| `data-bs-toggle="modal"`, `data-bs-target`, `data-bs-dismiss="modal"`, `data-bs-backdrop="static"`, `data-bs-keyboard="false"` | attribute | `components/modal/` |
| `data-bs-backdrop="static"` blocks outside-click dismissal; `data-bs-keyboard="false"` blocks Esc dismissal | dismissal | `components/modal/` |
| `autofocus` has no effect; focus must be set manually on `shown.bs.modal`; `aria-labelledby` required | accessibility | `components/modal/` |
| Only one modal at a time; nested modals unsupported | dismissal | `components/modal/` |
| `--bs-modal-*`, `--bs-backdrop-*` variable sets | variable | `components/modal/` |

**Offcanvas**

| Obligation | Kind | Page |
|---|---|---|
| `backdrop`, `keyboard`, `scroll` options | option | `components/offcanvas/` |
| `dispose`, `getInstance`, `getOrCreateInstance`, `hide`, `show`, `toggle` | method | `components/offcanvas/` |
| `hide.bs.offcanvas`, `hidden.bs.offcanvas`, `hidePrevented.bs.offcanvas`, `show.bs.offcanvas`, `shown.bs.offcanvas` | event | `components/offcanvas/` |
| `data-bs-toggle="offcanvas"`, `data-bs-target`, `data-bs-dismiss="offcanvas"`, `data-bs-backdrop`, `data-bs-keyboard`, `data-bs-scroll` | attribute | `components/offcanvas/` |
| `aria-labelledby` required; `role="dialog"` added by JavaScript | accessibility | `components/offcanvas/` |
| `margin`/`translate` must not be applied to `.offcanvas` element | accessibility | `components/offcanvas/` |
| `--bs-offcanvas-*` variable set (added v5.2.0); dark variant deprecated v5.3.0 | variable | `components/offcanvas/` |

**Popover**

| Obligation | Kind | Page |
|---|---|---|
| `allowList`, `animation`, `boundary`, `container`, `content`, `customClass`, `delay`, `fallbackPlacements`, `html`, `offset`, `placement`, `popperConfig`, `sanitize`, `sanitizeFn`, `selector`, `template`, `title`, `trigger` options | option | `components/popovers/` |
| `disable`, `dispose`, `enable`, `getInstance`, `getOrCreateInstance`, `hide`, `setContent`, `show`, `toggle`, `toggleEnabled`, `update` | method | `components/popovers/` |
| `hide.bs.popover`, `hidden.bs.popover`, `inserted.bs.popover`, `show.bs.popover`, `shown.bs.popover` | event | `components/popovers/` |
| `data-bs-toggle="popover"`, `data-bs-title`, `data-bs-content`, `data-bs-placement`, `data-bs-trigger` | attribute | `components/popovers/` |
| Only naturally focusable/interactive elements; `hover` must not be sole trigger; no keyboard focus-order management | accessibility | `components/popovers/` |
| `--bs-popover-*` variable set | variable | `components/popovers/` |

**Scrollspy**

| Obligation | Kind | Page |
|---|---|---|
| `rootMargin`, `smoothScroll`, `target`, `threshold` options; `offset`/`method` deprecated | option | `components/scrollspy/` |
| `dispose`, `getInstance`, `getOrCreateInstance`, `refresh` | method | `components/scrollspy/` |
| `activate.bs.scrollspy` | event | `components/scrollspy/` |
| `data-bs-spy="scroll"`, `data-bs-target`, `data-bs-root-margin`, `data-bs-smooth-scroll` | attribute | `components/scrollspy/` |
| `tabindex="0"` required on scroll container | keyboard | `components/scrollspy/` |
| No CSS variables documented | variable | `components/scrollspy/` |

**Navs and tabs**

| Obligation | Kind | Page |
|---|---|---|
| `dispose`, `getInstance`, `getOrCreateInstance`, `show` | method | `components/navs-tabs/` |
| `hide.bs.tab` → `show.bs.tab` → `hidden.bs.tab` → `shown.bs.tab`, all not preventable | event | `components/navs-tabs/` |
| `data-bs-toggle="tab"|"pill"`, `data-bs-target` | attribute | `components/navs-tabs/` |
| `role="tablist"|"tab"|"tabpanel"`, `aria-selected`, `aria-controls`, roving `tabindex` | accessibility | `components/navs-tabs/` |
| Up/Left previous, Down/Right next, Home first, End last | keyboard | `components/navs-tabs/` |
| `role="tablist"` must not sit on `<nav>`; dropdowns inside tabs unsupported | dismissal | `components/navs-tabs/` |
| `--bs-nav-link-*`, `--bs-nav-tabs-*`, `--bs-nav-pills-*`, `--bs-nav-underline-*` (v5.3.0+) variable sets | variable | `components/navs-tabs/` |

**Toast**

| Obligation | Kind | Page |
|---|---|---|
| `animation`, `autohide`, `delay` options | option | `components/toasts/` |
| `dispose`, `getInstance`, `getOrCreateInstance`, `hide`, `isShown`, `show` | method | `components/toasts/` |
| `hide.bs.toast`, `hidden.bs.toast`, `show.bs.toast`, `shown.bs.toast` | event | `components/toasts/` |
| `data-bs-dismiss="toast"`, `data-bs-target`, `data-bs-autohide`, `data-bs-delay` | attribute | `components/toasts/` |
| `aria-live` region present before generation; `role="alert"|"status"`; `autohide: false` requires manual close control | accessibility | `components/toasts/` |
| Toasts never receive focus; avoid focusable controls under autohide | keyboard | `components/toasts/` |
| `--bs-toast-*` variable set | variable | `components/toasts/` |

**Tooltip**

| Obligation | Kind | Page |
|---|---|---|
| `allowList`, `animation`, `boundary`, `container`, `customClass`, `delay`, `fallbackPlacements`, `html`, `offset`, `placement`, `popperConfig`, `sanitize`, `sanitizeFn`, `selector`, `template`, `title`, `trigger` options | option | `components/tooltips/` |
| `disable`, `dispose`, `enable`, `getInstance`, `getOrCreateInstance`, `hide`, `setContent`, `show`, `toggle`, `toggleEnabled`, `update` | method | `components/tooltips/` |
| `hide.bs.tooltip`, `hidden.bs.tooltip`, `inserted.bs.tooltip`, `show.bs.tooltip`, `shown.bs.tooltip` | event | `components/tooltips/` |
| `data-bs-toggle="tooltip"`, `data-bs-title`, kebab-case option mapping | attribute | `components/tooltips/` |
| Only naturally focusable/interactive elements; `hover` must not be sole trigger; disabled elements need a wrapper | accessibility | `components/tooltips/` |
| `--bs-tooltip-*` variable set | variable | `components/tooltips/` |

**Color modes**

| Obligation | Kind | Page |
|---|---|---|
| `data-bs-theme` on `<html>` is global; on a component/element it scopes and overrides | attribute | `customize/color-modes/` |
| `light` (default), `dark` built-in modes; custom mode values allowed | option | `customize/color-modes/` |
| `color-mode()` mixin (`$mode`, `$root`) switches on `$color-mode-type` | variable | `customize/color-modes/` |
| Documented `localStorage`-backed JavaScript toggler with `matchMedia` auto-resolution | method | `customize/color-modes/` |
| Dark-mode `--bs-*` override list (`--bs-body-color`, `--bs-emphasis-color`, `--bs-secondary-*`, `--bs-tertiary-*`, per-color subtle/emphasis variables, `--bs-link-*`, `--bs-border-*`, `--bs-form-valid/invalid-*`) | variable | `customize/color-modes/` |

**Reboot**

| Obligation | Kind | Page |
|---|---|---|
| `<html>`/`<body>` box-sizing, font, and background defaults | option | `content/reboot/` |
| Heading, paragraph, list, `<dt>`/`<dd>`, `<hr>`, table, form-element, `<address>`, `<blockquote>`, `<summary>` restyling rules | option | `content/reboot/` |
| `<a>` without `href` resets color/decoration | accessibility | `content/reboot/` |
| `[hidden]` forces `display: none !important` | dismissal | `content/reboot/` |
| `--bs-heading-color`, `--bs-link-opacity`, `--bs-body-*` variable set | variable | `content/reboot/` |

## Unknowns

None. All fifteen named pages were fetched successfully and returned the requested categories, though several pages (buttons, carousel, collapse, scrollspy, navs-tabs, reboot) document no `--bs-*` custom-property list or no options/events table for the JavaScript plugin — those absences are recorded per component preceding rather than treated as fetch failures.

## Deviation

None. All fetches in § Context succeeded; no substitution or scope departure occurred.

# Bootstrap 5.3.8 obligations

Sources: `.orkestrel/veneer/units/u4a-obligations-report.md` (Grok, session
`df7e1e1c-0b2f-47c1-b37b-d555a2985f95`, reading `bootstrap/js/src` at Bootstrap version `5.3.8`) and
`.orkestrel/veneer/units/u4a-docs-report.md` (researcher, native Sonnet, reading the Bootstrap 5.3
documentation pages). Date `2026-09-20`.

A row that both readings state carries a `Source` and a `Documentation` citation. A row only the
source states carries `—` under `Documentation`. A row only the documentation states carries `—`
under `Source`. `Kind` uses the source vocabulary (`attribute`, `option`, `method`, `event`,
`keyboard`, `dismissal`, `transition`, `initialization`) and adds `accessibility` and `variable`
from the documentation reading.

## Cross-cutting engine

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `VERSION` `'5.3.8'`; `DATA_KEY` `` `bs.${NAME}` ``; `EVENT_KEY` `` `.${DATA_KEY}` ``; `eventName(name)` returns `` `${name}${EVENT_KEY}` `` | identity | `base-component.js:17,73-83` | `getting-started/javascript/` |
| `Default`/`DefaultType` inherited empty from `Config` unless a component overrides | option | `base-component.js:17-23` | — |
| `data-bs-config` JSON merges with `data-bs-*` attributes read by `Manipulator`; config object wins last | attribute | `base-component.js:53-57`; `config.js:40-48` | `getting-started/javascript/` |
| `constructor(element, config)` no-op when `getElement(element)` is falsy; `dispose()`; `_queueCallback` through `executeAfterTransition` | method | `base-component.js:24-51` | `getting-started/javascript/` |
| static `getInstance`, static `getOrCreateInstance(element, config = {})`, static `VERSION` | method | `base-component.js:61-71` | `getting-started/javascript/` |
| `Data.set(this._element, DATA_KEY, this)` on construction | initialization | `base-component.js:35` | — |
| All API methods are asynchronous, return to the caller before the transition ends, and a method call mid-transition is ignored | method | — | `getting-started/javascript/` |
| `dispose()` must not follow `hide()` immediately; wait for the completion event | method | — | `getting-started/javascript/` |
| Every plugin fires paired infinitive/past-participle events (`show`/`shown`, `hide`/`hidden`); `EventHandler.trigger` builds `new Event(event, { bubbles, cancelable: true })` and hydrates the payload | event | `dom/event-handler.js:214-297` | `getting-started/javascript/` |
| Infinitive events are cancelable through `event.preventDefault()`; returning `false` from a handler also cancels | event | — | `getting-started/javascript/` |
| `Config._mergeConfigObj`: `Default`, then `data-bs-config` JSON, then `getDataAttributes`, then the `config` object; `_typeCheckConfig` type-checks against `DefaultType` | option | `util/config.js:17-62` | `getting-started/javascript/` |
| `Manipulator.getDataAttributes` reads every `dataset` key starting `bs` except `bsConfig`, kebab-cased through `data-bs-*` | attribute | `dom/manipulator.js:40-68` | `getting-started/javascript/` |
| `SelectorEngine.getSelector` reads `data-bs-target` else `href`; `find`, `findOne`, `children`, `parents`, `prev`, `next`, `focusableChildren`, `getElementFromSelector`, `getMultipleElementsFromSelector` | method | `dom/selector-engine.js:10-123` | `getting-started/javascript/` |
| `Data.set`/`get`/`remove`; one instance per element, a second key logs an error and returns | method | `dom/data.js:14-55` | — |
| `enableDismissTrigger(component, method = 'hide')` binds document `click.dismiss${EVENT_KEY}` on `[data-bs-dismiss="${NAME}"]` | attribute | `util/component-functions.js:12-31` | — |
| `TRANSITION_END` emulation: listens `transitionend`, emulates after `getTransitionDurationFromElement` plus `5` ms padding through `executeAfterTransition` | transition | `util/index.js:10,47-68,229-256` | — |
| `onDOMContentLoaded` gates `defineJQueryPlugin`; skipped when `document.body` carries `data-bs-no-jquery` | initialization | `util/index.js:179-223` | — |
| Sanitizer allowlist and `sanitizeFn` override on Tooltip/Popover content | accessibility | `util/sanitizer.js:11-116` | `getting-started/javascript/` |
| Native `querySelector`/`querySelectorAll`; a CSS special character in a selector must be escaped | attribute | — | `getting-started/javascript/` |

## Alert

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `NAME` `'alert'`; `DATA_KEY` `'bs.alert'`; `EVENT_KEY` `.bs.alert`; no component `Default`/`DefaultType` | identity | `alert.js:17-19` | — |
| `data-bs-dismiss="alert"` document click → `close()`; target via `data-bs-target`/`href` or closest `.alert` | attribute | `component-functions.js:12-16`; `alert.js:79`; `component-functions.js:25-26` | `components/alerts/` |
| `close()`; no-op if `close.bs.alert` prevented | method | `alert.js:37-42` | `components/alerts/` |
| `close.bs.alert` cancelable; then `closed.bs.alert` (not checked) | event | `alert.js:38-42,53` | `components/alerts/` |
| Disabled dismiss trigger returns; `<a>`/`<area>` dismiss triggers `preventDefault` | dismissal | `component-functions.js:17-23` | — |
| remove `show`; animated iff `fade`; wait transition; then remove the node from the DOM | transition | `alert.js:44-54` | — |
| `enableDismissTrigger(Alert, 'close')`; `defineJQueryPlugin(Alert)`; no load auto-init | initialization | `alert.js:79,85` | — |
| Focus is lost on dismissal; recommend listening for `closed.bs.alert`, calling `.focus()`, and adding `tabindex="-1"` when the focus target is non-interactive | accessibility | — | `components/alerts/` |
| `--bs-alert-bg`, `--bs-alert-padding-x`, `--bs-alert-padding-y`, `--bs-alert-margin-bottom`, `--bs-alert-color`, `--bs-alert-border-color`, `--bs-alert-border`, `--bs-alert-border-radius`, `--bs-alert-link-color` | variable | — | `components/alerts/` |

## Button

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `NAME` `'button'`; `DATA_KEY` `'bs.button'`; `EVENT_KEY` `.bs.button`; no `Default`/`DefaultType` | identity | `button.js:16-18` | — |
| `[data-bs-toggle="button"]` document `click.bs.button.data-api`, `preventDefault`, `getOrCreateInstance` then `toggle()` | attribute | `button.js:22-23,57-64` | `components/buttons/` |
| `toggle()` flips class `active` and `aria-pressed`; no no-op guard | method | `button.js:36-39` | `components/buttons/` |
| static `jQueryInterface` runs only when `config === 'toggle'` | method | `button.js:42-50` | — |
| `defineJQueryPlugin(Button)` | initialization | `button.js:70` | — |
| Screen readers announce a toggle button as `button`/`button pressed`, not as a checkbox | accessibility | — | `components/buttons/` |
| Disabled `<a>` needs `.disabled`, `aria-disabled="true"`, and `tabindex="-1"`; `role="button"` required on `<a>` used as a button | accessibility | — | `components/buttons/` |
| `--bs-btn-*` variable set (padding, font, color, background, border, box-shadow, disabled and active states) | variable | — | `components/buttons/` |

## Carousel

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `NAME` `'carousel'`; `DATA_KEY` `'bs.carousel'`; `EVENT_KEY` `.bs.carousel` | identity | `carousel.js:26-28` | — |
| `interval` `5000` `(number\|boolean)`; `keyboard` `true` boolean; `pause` `'hover'` `(string\|boolean)`; `ride` `false` `(boolean\|string)`; `touch` `true` boolean; `wrap` `true` boolean | option | `carousel.js:70-86` | `components/carousel/` |
| `[data-bs-slide], [data-bs-slide-to]` click; `data-bs-slide-to` → `to`; `data-bs-slide="next"` → `next` else `prev`; `[data-bs-ride="carousel"]` window load `getOrCreateInstance`; `data-bs-interval` on an item overrides the interval | attribute | `carousel.js:62-63,295-297,432-466` | `components/carousel/` |
| `next`/`prev`/`to`/`cycle`/`pause`/`nextWhenVisible`; `_slide` no-op while `_isSliding` or same index | method | `carousel.js:124-188,301-303` | `components/carousel/` |
| `slide.bs.carousel` cancelable, payload `{ relatedTarget, direction, from, to }`; then `slid.bs.carousel` (not checked), same payload | event | `carousel.js:316-328,362` | `components/carousel/` |
| `ArrowLeft`/`ArrowRight` if `keyboard`, ignored in `input`/`textarea`, `preventDefault` then `_slide` | keyboard | `carousel.js:205-207,254-263` | `components/carousel/` (reacts to keyboard by default; requires a pause control for autoplay per WCAG 2.2 SC 2.2.2) |
| `pause: 'hover'` pauses on `mouseenter`, resumes on `mouseleave`; touch end pauses then restarts after `500 + interval` ms | dismissal | `carousel.js:209-212,224-243` | — |
| Class `slide` animates; order next/prev classes then start/end classes; complete swaps `active` | transition | `carousel.js:344-374` | — |
| Constructs `Swipe` when `touch && Swipe.isSupported()` | initialization | `carousel.js:214-216,251` | — |
| `constructor(element, config)`; click data-api; load ride init; `defineJQueryPlugin(Carousel)` | initialization | `carousel.js:93,432-472` | — |
| Autoplaying carousels must supply a pause/stop control (WCAG 2.2 SC 2.2.2); animation gated on `prefers-reduced-motion`; touch swipe enabled by default; manual initialization required unless `data-bs-ride="carousel"` | accessibility | — | `components/carousel/` |
| `.carousel-dark` deprecated in v5.3.0 for `data-bs-theme="dark"` | variable | — | `components/carousel/` |

## Collapse

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `NAME` `'collapse'`; `DATA_KEY` `'bs.collapse'`; `EVENT_KEY` `.bs.collapse` | identity | `collapse.js:21-23` | — |
| `parent` `null` `(null\|element)`; `toggle` `true` boolean | option | `collapse.js:45-53` | `components/collapse/` |
| `[data-bs-toggle="collapse"]` click → `getOrCreateInstance(..., { toggle: false }).toggle()`; target through `getMultipleElementsFromSelector` (`data-bs-target`/`href`); `A` gets `preventDefault` | attribute | `collapse.js:43,280-289` | `components/collapse/` |
| `constructor` calls `toggle()` when `config.toggle`; `toggle()` shows or hides by `_isShown()`; `show`/`hide` no-op if `_isTransitioning` or already shown/hidden | method | `collapse.js:84-114,166-169` | `components/collapse/` |
| `show.bs.collapse`/`hide.bs.collapse` cancelable; then `shown.bs.collapse`/`hidden.bs.collapse` | event | `collapse.js:129-132,156,171-174,199` | `components/collapse/` |
| Accordion: `parent` hides sibling first-level `.collapse.show, .collapse.collapsing` first | dismissal | `collapse.js:119-136` | — |
| Show: remove `collapse`, add `collapsing`, set `style[dimension]=0`, then complete swaps to `collapse`+`show`. Hide: size from `getBoundingClientRect`, add `collapsing`, remove `collapse`+`show`, then complete restores `collapse`. Horizontal variant (`collapse-horizontal`) uses `width`; toggles trigger `collapsed` + `aria-expanded` | transition | `collapse.js:140-220,244-252` | — |
| `constructor`; click data-api; `defineJQueryPlugin(Collapse)` | initialization | `collapse.js:60-86,295` | — |
| `aria-expanded` and `aria-controls` required on the control; `role="button"` required on a non-button control; animation gated on `prefers-reduced-motion` | accessibility | — | `components/collapse/` |
| The plugin does not cover the ARIA Authoring Practices Guide accordion keyboard pattern; custom JavaScript is required for it | keyboard | — | `components/collapse/` |

## Dropdown

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `NAME` `'dropdown'`; `DATA_KEY` `'bs.dropdown'`; `EVENT_KEY` `.bs.dropdown` | identity | `dropdown.js:29-31` | — |
| `autoClose` `true` `(boolean\|string)`; `boundary` `'clippingParents'` `(string\|element)`; `display` `'dynamic'` string; `offset` `[0, 2]` `(array\|string\|function)`; `popperConfig` `null` `(null\|object\|function)`; `reference` `'toggle'` `(string\|element\|object)` | option | `dropdown.js:71-87` | `components/dropdowns/` |
| `[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)` click toggle; document `click`/`keyup` call `clearMenus`; document `keydown` on toggle and `.dropdown-menu`; `data-bs-popper="static"` written on the menu for navbar or `display === 'static'` | attribute | `dropdown.js:44,55,268,314,440-447` | `components/dropdowns/` |
| `toggle`/`show`/`hide` no-op if disabled or already shown/hidden; `dispose` destroys popper; `update()`; static `clearMenus`; static `dataApiKeydownHandler` | method | `dropdown.js:120-184,244-246,356-433` | `components/dropdowns/` |
| `show.bs.dropdown`/`hide.bs.dropdown` cancelable, payload `{ relatedTarget }`; then `shown.bs.dropdown`/`hidden.bs.dropdown`, same payload; `clearMenus` may add `clickEvent` | event | `dropdown.js:129-156,187-209,384-388` | `components/dropdowns/`; `hide.bs.dropdown`/`hidden.bs.dropdown` carry a `clickEvent` property when triggered by a click |
| `ArrowUp`/`ArrowDown` show and focus item; `Escape` hides and focuses the toggle; `Tab` keyup may close unless inside the menu; ignored in `input`/`textarea` except `Escape`; right mouse button ignored | keyboard | `dropdown.js:357,379-381,394-433` | `components/dropdowns/`; cursor keys move through items, Esc always closes; authors must add `role`/`aria-*` themselves |
| Click-outside via `clearMenus`; `autoClose` `true`/`'inside'`/`'outside'`/`false`; click on the toggle itself skipped | dismissal | `dropdown.js:356-392` | `components/dropdowns/`; Esc always closes regardless of `autoClose` |
| Immediate `show` class on menu and toggle, no CSS transition queue | transition | `dropdown.js:154-155,205-206` | — |
| `constructor`; document click/keydown/keyup data-api; `defineJQueryPlugin(Dropdown)`; Popper required at `show`/`_createPopper` | initialization | `dropdown.js:94,226-228,440-453` | — |
| Toggles on click, not hover, by design; requires Popper (bundled in `bootstrap.bundle.min.js`); touch devices get empty `mouseover` handlers on immediate children of `<body>` for an iOS event-delegation quirk | accessibility | — | `components/dropdowns/` |
| `--bs-dropdown-*` variable set (added v5.2.0); `.dropdown-menu-dark` deprecated v5.3.0 for `data-bs-theme="dark"` | variable | — | `components/dropdowns/` |

## Modal

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `NAME` `'modal'`; `DATA_KEY` `'bs.modal'`; `EVENT_KEY` `.bs.modal` | identity | `modal.js:23-25` | — |
| `backdrop` `true` `(boolean\|string)`; `focus` `true` boolean; `keyboard` `true` boolean | option | `modal.js:50-60` | `components/modal/` |
| `[data-bs-toggle="modal"]` click `toggle`; `[data-bs-dismiss="modal"]` through `enableDismissTrigger(Modal)` → `hide`; target via `data-bs-target`/`href`; `data-bs-whatever` custom data surfaces on `event.relatedTarget` | attribute | `modal.js:48,339-370` | `components/modal/` |
| `toggle(relatedTarget)`; `show`/`hide` no-op on `_isShown`/`_isTransitioning` mismatch; `dispose()`; `handleUpdate()` | method | `modal.js:94-155` | `components/modal/`; `handleUpdate` readjusts position if the modal's height changes while open |
| `show.bs.modal` cancelable, `{ relatedTarget }`; `shown.bs.modal` same payload; `hide.bs.modal` cancelable; `hidden.bs.modal`; `hidePrevented.bs.modal` cancelable | event | `modal.js:103-132,198-200,256,265-268` | `components/modal/`; `hide.bs.modal` preventable, `hidden.bs.modal`/`hidePrevented.bs.modal`/`show.bs.modal`/`shown.bs.modal` not marked preventable in the fetched table |
| `Escape` hides if `keyboard`, else `_triggerBackdropTransition` | keyboard | `modal.js:207-218` | `components/modal/`; disable through `keyboard: false` or `data-bs-keyboard="false"` |
| Backdrop click: `'static'` triggers backdrop transition, else `hide()`; `focus: true` activates `FocusTrap` after shown; body gets `modal-open`; opening one hides an already-open `.modal.show`; only one modal at a time, nested modals unsupported | dismissal | `modal.js:116,159-241,360-363` | `components/modal/`; `data-bs-backdrop="static"` blocks outside-click dismissal, `data-bs-keyboard="false"` blocks Esc dismissal; only one modal window supported, nested modals unsupported |
| Animated iff `fade`; show adds `show` after `reflow`; hide removes `show`; static backdrop adds `modal-static` then removes it | transition | `modal.js:138-203,260-287` | — |
| Constructs `Backdrop`, `FocusTrap` (`trapElement: this._element`), `ScrollBarHelper` | initialization | `modal.js:71-75,114-166,255` | — |
| `constructor`; click `[data-bs-toggle="modal"]` `toggle(this)`; `enableDismissTrigger(Modal)`; `defineJQueryPlugin(Modal)` | initialization | `modal.js:67,365-376` | — |
| `autofocus` has no effect inside a modal; focus must be set manually on `shown.bs.modal`; `aria-labelledby` required, `aria-describedby` optional | accessibility | — | `components/modal/` |
| `--bs-modal-*`, `--bs-backdrop-*` variable sets | variable | — | `components/modal/` |

## Offcanvas

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `NAME` `'offcanvas'`; `DATA_KEY` `'bs.offcanvas'`; `EVENT_KEY` `.bs.offcanvas` | identity | `offcanvas.js:25-27` | — |
| `backdrop` `true` `(boolean\|string)`; `keyboard` `true` boolean; `scroll` `false` boolean | option | `offcanvas.js:49-59` | `components/offcanvas/` |
| `[data-bs-toggle="offcanvas"]` click; window `load.bs.offcanvas.data-api` on `.offcanvas.show`; resize hides non-`fixed` `[aria-modal][class*=show][class*=offcanvas-]`; `enableDismissTrigger(Offcanvas)` on `[data-bs-dismiss="offcanvas"]` | attribute | `offcanvas.js:44,47,232-274` | `components/offcanvas/` |
| `toggle(relatedTarget)`; `show`/`hide` no-op if already shown/hidden; `dispose()` | method | `offcanvas.js:89-164` | `components/offcanvas/` |
| `show.bs.offcanvas`/`hide.bs.offcanvas` cancelable, `{ relatedTarget }`; then `shown.bs.offcanvas`/`hidden.bs.offcanvas`; `hidePrevented.bs.offcanvas` does not check `defaultPrevented` | event | `offcanvas.js:98-154,170,206` | `components/offcanvas/` |
| `Escape` hides if `keyboard`, else triggers `hidePrevented`; `FocusTrap` handles `Tab` | keyboard | `offcanvas.js:196-207` | `components/offcanvas/` |
| Backdrop clickCallback: `'static'` triggers `hidePrevented`, else `hide()`; `scroll: false` hides the scrollbar and activates `FocusTrap`; another open offcanvas is hidden first | dismissal | `offcanvas.js:107-175,251-254` | `components/offcanvas/` |
| Show: add `showing`, complete swaps to `show`. Hide: add `hiding`, complete removes `show`+`hiding` | transition | `offcanvas.js:113-157` | — |
| Backdrop `className: 'offcanvas-backdrop'`, `isAnimated: true`; `FocusTrap`; `new ScrollBarHelper()` when `!scroll` | initialization | `offcanvas.js:108,151,180-192` | — |
| `constructor`; click toggle; load `.show`; `enableDismissTrigger(Offcanvas)`; `defineJQueryPlugin(Offcanvas)`; disabled trigger returns | initialization | `offcanvas.js:66,239-241,260-280` | — |
| `aria-labelledby` required; `role="dialog"` added by JavaScript; `margin`/`translate` must not be applied to the `.offcanvas` element | accessibility | — | `components/offcanvas/` |
| `--bs-offcanvas-*` variable set (added v5.2.0); dark variant deprecated v5.3.0 | variable | — | `components/offcanvas/` |

## Popover

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `NAME` `'popover'`; `DATA_KEY`/`EVENT_KEY` → `bs.popover`/`.bs.popover` | identity | `popover.js:15` | — |
| Tooltip options plus `content` `''` `(null\|string\|element\|function)`; `offset` `[0, 8]`; `placement` `'right'`; `trigger` `'click'`; popover template | option | `popover.js:20-36` | `components/popovers/` |
| Same data-attribute pipeline as Tooltip; no `data-bs-toggle` document listener; template fills `.popover-header`/`.popover-body` | attribute | `popover.js:17-18,62-66`; `tooltip.js:540-546` | `components/popovers/` |
| Inherits Tooltip's public methods; `_isWithContent` checks title or content; `_getContent` | method | `popover.js:57-59,69-71` | `components/popovers/` |
| Same namespaced events as Tooltip under `.bs.popover`, same cancelability | event | `popover.js:15`; `tooltip.js:193-278`; `base-component.js:81-83` | `components/popovers/` |
| Default click trigger; otherwise Tooltip's dismissal rules | dismissal | `popover.js:30` | — |
| `defineJQueryPlugin(Popover)` only; no data-api auto-init | initialization | `popover.js:95` | Popovers are opt-in and must be initialized manually |
| Only naturally focusable/interactive elements; `hover` alone must not be the sole trigger; no keyboard focus-order management | accessibility | — | `components/popovers/` |
| `--bs-popover-*` variable set | variable | — | `components/popovers/` |

## ScrollSpy

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `NAME` `'scrollspy'`; `DATA_KEY` `'bs.scrollspy'`; `EVENT_KEY` `.bs.scrollspy` | identity | `scrollspy.js:19-21` | — |
| `offset` `null` `(number\|null)`; `rootMargin` `'0px 0px -25%'` string; `smoothScroll` `false` boolean; `target` `null` `element`; `threshold` `[0.1, 0.5, 1]` array | option | `scrollspy.js:41-55` | `components/scrollspy/`; `offset`/`method` are deprecated, replaced by `rootMargin`, to be removed in v6 |
| `[data-bs-spy="scroll"]` window load `getOrCreateInstance`; smooth-scroll listens clicks on `[href]` inside `config.target` | attribute | `scrollspy.js:26,31,135,284-288` | `components/scrollspy/` |
| `constructor` calls `refresh()`; `refresh()`; `dispose()` disconnects the observer | method | `scrollspy.js:75-110` | `components/scrollspy/`; `refresh` is required after adding or removing observed elements |
| `activate.bs.scrollspy`, `{ relatedTarget: target }`, not checked for `defaultPrevented` | event | `scrollspy.js:233` | `components/scrollspy/` |
| `constructor`+`refresh`; load spy init; `defineJQueryPlugin(ScrollSpy)`; `target` defaults to `document.body`; `offset` rewrites `rootMargin`; string `threshold` splits to floats | initialization | `scrollspy.js:62,115-122,284-294` | — |
| `tabindex="0"` required on the scroll container for keyboard access | keyboard | — | `components/scrollspy/` |

## Tab

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `NAME` `'tab'`; `DATA_KEY` `'bs.tab'`; `EVENT_KEY` `.bs.tab`; no `Default`/`DefaultType` | identity | `tab.js:17-19` | — |
| `[data-bs-toggle="tab"\|"pill"\|"list"]` click `show()`; load initializes `.active` toggles; panel via `data-bs-target`/`href` | attribute | `tab.js:48,51,111,216,289-308` | `components/navs-tabs/` |
| `constructor(element)` takes no config; returns early with no `.list-group, .nav, [role="tablist"]` parent; `show()` no-op if already active or `show`/`hide` prevented | method | `tab.js:58-97` | `components/navs-tabs/` |
| On the active sibling: `hide.bs.tab`, `{ relatedTarget: innerElem }` (checked); on the shown tab: `show.bs.tab`, `{ relatedTarget: active }` (checked); then `hidden.bs.tab`/`shown.bs.tab`, same payload; not fired when `role !== 'tab'` | event | `tab.js:89-149` | `components/navs-tabs/`; firing order `hide.bs.tab` → `show.bs.tab` → `hidden.bs.tab` → `shown.bs.tab`, none marked preventable in the fetched table |
| `ArrowLeft`/`ArrowUp` previous, `ArrowRight`/`ArrowDown` next, `Home` first, `End` last; `stopPropagation`+`preventDefault`; skips disabled; cycles; then focus + `show()` | keyboard | `tab.js:155-176` | `components/navs-tabs/` |
| Dropdown tabs toggle `active` on `.dropdown-toggle`, `show` on `.dropdown-menu`, `aria-expanded` | dismissal | `tab.js:229-245` | The plugin does not support dropdowns inside tab interfaces |
| Activate adds `active`; role-tab path adds aria/tabindex/dropdown state then fires `shown`; deactivate removes `active`+`blur`, role-tab path fires `hidden` | transition | `tab.js:109-152` | — |
| Click: disabled return, `getOrCreateInstance(this).show()`; load initializes already-active toggles; `defineJQueryPlugin(Tab)`; `A`/`AREA` get `preventDefault` | initialization | `tab.js:290-313` | — |
| `role="tablist"`/`"tab"`/`"tabpanel"`; `aria-selected`, `aria-controls`, `aria-labelledby`; roving `tabindex`; `role="tablist"` must not sit on `<nav>` | accessibility | — | `components/navs-tabs/` |
| `--bs-nav-link-*`, `--bs-nav-tabs-*`, `--bs-nav-pills-*`, `--bs-nav-underline-*` (v5.3.0+) variable sets | variable | — | `components/navs-tabs/` |

## Toast

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `NAME` `'toast'`; `DATA_KEY` `'bs.toast'`; `EVENT_KEY` `.bs.toast`; `Default` `{ animation: true, autohide: true, delay: 5000 }`; `DefaultType` `{ animation: 'boolean', autohide: 'boolean', delay: 'number' }` | option | `toast.js:17-45` | `components/toasts/` |
| `enableDismissTrigger(Toast)` binds `[data-bs-dismiss="toast"]` → `hide` | attribute | `toast.js:216` | `components/toasts/` |
| `show()` no-op if `show` prevented; `hide()` no-op if not shown or `hide` prevented; `dispose()`; `isShown()` | method | `toast.js:75-135` | `components/toasts/` |
| `show.bs.toast` (checked) then `shown.bs.toast`; `hide.bs.toast` (checked) then `hidden.bs.toast` | event | `toast.js:76-116` | `components/toasts/` |
| `autohide: true` schedules `hide` after `delay` unless mouse or keyboard interaction; interaction clears the timeout, leaving reschedules unless `relatedTarget` is inside | dismissal | `toast.js:138-188` | `components/toasts/`; `autohide: false` requires a manual close control |
| Show: optional add `fade`, `reflow`, add `show`+`showing`, complete removes `showing`. Hide: add `showing`, complete adds `hide` and removes `showing`+`show` | transition | `toast.js:84-120` | — |
| `constructor`; `enableDismissTrigger(Toast)`; `defineJQueryPlugin(Toast)`; no load/click toggle auto-init | initialization | `toast.js:52,216-222` | — |
| Wrapped in an `aria-live` region present before generation; `aria-atomic="true"`; `role="alert" aria-live="assertive"` for important content, `role="status" aria-live="polite"` otherwise; toasts never receive focus, avoid focusable controls under autohide | accessibility | — | `components/toasts/` |
| `--bs-toast-*` variable set | variable | — | `components/toasts/` |

## Tooltip

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `NAME` `'tooltip'`; `DATA_KEY`/`EVENT_KEY` → `bs.tooltip`/`.bs.tooltip` | identity | `tooltip.js:22` | — |
| `Default`/`DefaultType`: `allowList`, `animation` `true`, `boundary` `'clippingParents'`, `container` `false`, `customClass` `''`, `delay` `0`, `fallbackPlacements` `['top','right','bottom','left']`, `html` `false`, `offset` `[0, 6]`, `placement` `'top'`, `popperConfig` `null`, `sanitize` `true`, `sanitizeFn` `null`, `selector` `false`, `template`, `title` `''`, `trigger` `'hover focus'` | option | `tooltip.js:58-99` | `components/tooltips/` |
| `_getConfig` reads `data-bs-*` then deletes `sanitize`/`allowList`/`sanitizeFn`; `title` copies to `data-bs-original-title` and is removed, restored on dispose; hides on closest `.modal` `hide.bs.modal` | attribute | `tooltip.js:23,174,357,477-546` | `components/tooltips/`; `sanitize`/`sanitizeFn`/`allowList` cannot be set through data attributes for security reasons |
| `constructor` throws without Popper; `enable`/`disable`/`toggleEnabled`; `toggle()` no-op if disabled; `show()` throws if `display: none`, no-op without content/enabled; `hide()` no-op if not shown or prevented; `update()`; `setContent` | method | `tooltip.js:107-332` | `components/tooltips/` |
| `show.bs.tooltip` (checked) → optional `inserted.bs.tooltip` (not checked) → `shown.bs.tooltip` (not checked); `hide.bs.tooltip` (checked) → `hidden.bs.tooltip` | event | `tooltip.js:193-278` | `components/tooltips/` |
| No Escape/arrow/Tab/Space handling; focus trigger through `focusin`/`focusout` | keyboard | `tooltip.js:444-475` | — |
| `trigger` tokens `hover`/`focus`/`click`/`manual`; hover/focus use `delay.show`/`delay.hide`; modal hide forces `hide()`; no click-outside closer, Escape, backdrop, or autohide timer | dismissal | `tooltip.js:444-483,501-528` | — |
| Animated iff `animation` or the tip carries `fade`; create/show/hide toggle `fade`/`show` on the tip | transition | `tooltip.js:217,239,253,281,311-367` | — |
| `constructor` only; no document/window data-api auto-init; `defineJQueryPlugin(Tooltip)`; `selector` delegates then creates a child instance with `trigger: 'manual'` | initialization | `tooltip.js:106,361-363,579-590,631` | — |
| Only naturally focusable/interactive elements; `hover` alone must not be the sole trigger; disabled elements need a focusable wrapper (`tabindex="0"`); animation gated on `prefers-reduced-motion` | accessibility | — | `components/tooltips/` |
| `--bs-tooltip-*` variable set | variable | — | `components/tooltips/` |

## Color modes

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `data-bs-theme` on `<html>` applies globally; on a component or element it scopes to that subtree and overrides the inherited global value | attribute | — | `customize/color-modes/` |
| `light` (default) and `dark` built-in modes; a custom mode value such as `data-bs-theme="blue"` is possible | option | — | `customize/color-modes/` |
| `color-mode($mode: light, $root: false)` mixin: wraps content in `@media (prefers-color-scheme: $mode)` when `$color-mode-type == "media-query"`, nested in `:root` when `$root: true`; otherwise emits `[data-bs-theme="#{$mode}"] { @content; }` | variable | — | `customize/color-modes/` |
| Documented `localStorage`-backed JavaScript toggler: reads/writes `theme`, resolves `'auto'` through `matchMedia('(prefers-color-scheme: dark)')`, sets `data-bs-theme` on `document.documentElement`, re-resolves on `change` when no explicit stored theme is set; toggle buttons carry `data-bs-theme-value` and receive `.active`+`aria-pressed` | method | — | `customize/color-modes/` |
| Dark-mode `--bs-*` override list: `--bs-body-color`, `--bs-body-bg`, `--bs-emphasis-color`, `--bs-secondary-*`, `--bs-tertiary-*`, per-color `text-emphasis`/`bg-subtle`/`border-subtle`, `--bs-heading-color`, `--bs-link-*`, `--bs-code-color`, `--bs-highlight-*`, `--bs-border-*`, `--bs-form-valid/invalid-*` | variable | — | `customize/color-modes/` |

## Reboot

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `box-sizing: border-box` globally; `<body>` sets `font-size: 1rem`, inherited `font-family`/`font-weight`/`line-height`/`color`, `background-color: #fff` | option | — | `content/reboot/` |
| `<h1>`–`<h6>` remove `margin-top`, set `margin-bottom: .5rem`, tighten `line-height`, color overridable through `--bs-heading-color`; `<p>` removes `margin-top`, sets `margin-bottom: 1rem` | option | — | `content/reboot/` |
| `<a>` gets a default color and underline through `--bs-link-opacity`; `<hr>` styled through `border-top`/`opacity: .25`, inherits `border-color` from `color` | option | — | `content/reboot/` |
| `<ul>`/`<ol>`/`<dl>` remove `margin-top`, set `margin-bottom: 1rem`, nested lists drop `margin-bottom`, `padding-left` reset; `<dd>` gets `margin-left: 0`+`margin-bottom: .5rem`; `<dt>` bolded | option | — | `content/reboot/` |
| `<code>`, `<pre>`, `<var>`, `<kbd>`, `<samp>` restyled; `<table>`/`<caption>` collapse borders and set `text-align`; `<fieldset>`/`<legend>`/`<label>` restyled | option | — | `content/reboot/` |
| `<input>`/`<select>`/`<textarea>`/`<button>` remove `margin`, set `line-height: inherit`; `<textarea>` resizes vertically only; button-type elements get `cursor: pointer` when `:not(:disabled)`; `role="button"` gets `cursor: pointer` | option | — | `content/reboot/` |
| `<address>` resets `font-style: normal`, inherits `line-height`, sets `margin-bottom: 1rem`; `<blockquote>` sets `margin: 0 0 1rem`; `<summary>` resets `cursor` from `text` to `pointer` | option | — | `content/reboot/` |
| `<a>` with no `href` resets `color`/`text-decoration` to default | accessibility | — | `content/reboot/` |
| `[hidden]` forces `display: none !important` | dismissal | — | `content/reboot/` |
| `--bs-heading-color`, `--bs-link-opacity`, `--bs-body-font-family`, `--bs-body-font-size`, `--bs-body-font-weight`, `--bs-body-line-height`, `--bs-body-text-align`, `--bs-body-color`, `--bs-body-color-rgb`, `--bs-body-bg`, `--bs-body-bg-rgb`, `--bs-emphasis-color`, `--bs-emphasis-color-rgb`, `--bs-secondary-color`, `--bs-secondary-color-rgb`, `--bs-secondary-bg`, `--bs-secondary-bg-rgb`, `--bs-tertiary-color`, `--bs-tertiary-color-rgb`, `--bs-tertiary-bg`, `--bs-tertiary-bg-rgb` | variable | — | `content/reboot/` |

## Utilities

### util/backdrop.js

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `NAME` `'backdrop'`; `Default` `{ className: 'modal-backdrop', clickCallback: null, isAnimated: false, isVisible: true, rootElement: 'body' }` | option | `util/backdrop.js:18-29` | — |
| `show`/`hide` no-op-execute the callback when `!isVisible`; `dispose`; mousedown on the element runs `clickCallback`; adds `fade` if animated, adds/removes `show` | method | `util/backdrop.js:66-141` | — |
| Constructed by Modal and Offcanvas | initialization | `modal.js:159-162`; `offcanvas.js:180-186` | — |

### util/focustrap.js

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `NAME` `'focustrap'`; `DATA_KEY` `'bs.focustrap'`; `Default` `{ autofocus: true, trapElement: null }` | option | `util/focustrap.js:16-29` | — |
| `activate` no-op if already active, focuses `trapElement` if `autofocus`, listens document `focusin` + `keydown.tab`; `deactivate` no-op if inactive; `_handleKeydown` records Tab direction; `_handleFocusin` refocuses first/last focusable child or the trap | method | `util/focustrap.js:63-111` | — |
| Constructed by Modal and Offcanvas with `{ trapElement: this._element }` | initialization | `modal.js:166-168`; `offcanvas.js:190-192` | — |

### util/scrollbar.js

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| No `Config`; `constructor()` uses `document.body`; public `getWidth()`, `hide()`, `reset()`, `isOverflowing()`; targets `.fixed-top, .fixed-bottom, .is-fixed, .sticky-top`; saves overflow/padding/margin through `Manipulator.setDataAttribute` | method | `util/scrollbar.js:16-56` | — |
| Constructed by Modal (`this._scrollBar`) and by Offcanvas when `!scroll` | initialization | `modal.js:75,114,255,298`; `offcanvas.js:108,151` | — |

### util/swipe.js

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `NAME` `'swipe'`; `EVENT_KEY` `.bs.swipe`; `Default` `{ endCallback: null, leftCallback: null, rightCallback: null }` | option | `util/swipe.js:16-38` | — |
| `constructor(element, config)` returns if `!element \|\| !Swipe.isSupported()`; `dispose` unbinds `.bs.swipe`; static `isSupported()` checks `ontouchstart`/`maxTouchPoints > 0`; threshold `40`; class `pointer-event` when pointer | method | `util/swipe.js:26,49-51,73-75,128,141-143` | — |
| Constructed by Carousel | initialization | `carousel.js:245-251` | — |

### util/sanitizer.js

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `sanitizeHtml(unsafeHtml, allowList, sanitizeFunction)`; URI attributes checked against `SAFE_URL_PATTERN` forbidding `javascript:`; a function `sanitizeFunction` overrides sanitization | method | `util/sanitizer.js:49-116` | `getting-started/javascript/` |
| Global allowlist: `class`, `dir`, `id`, `lang`, `role`, `aria-*`; per-tag allowances documented for `a` and `img`; the allowlist is mutable through `bootstrap.Tooltip.Default.allowList` | accessibility | `util/sanitizer.js:11-46` | `getting-started/javascript/` |

### util/template-factory.js

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `NAME` `'TemplateFactory'`; `Default`/`DefaultType`/`DefaultContentType` for `allowList`, `content`, `extraClass`, `html`, `sanitize`, `sanitizeFn`, `template`, `entry`, `selector`; public `getContent`, `hasContent`, `changeContent`, `toHtml` | method | `util/template-factory.js:17-42` | — |
| Constructed by Tooltip (`_getTemplateFactory`); inherited by Popover | initialization | `tooltip.js:338-344` | — |

### util/config.js

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| Base `Config` class; `Default: {}`, `DefaultType: {}`; `NAME` getter throws; extended by `BaseComponent`, `Backdrop`, `FocusTrap`, `Swipe`, `TemplateFactory` | option | `util/config.js:17-27` | — |

### util/component-functions.js

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `enableDismissTrigger(component, method = 'hide')` binds document `click.dismiss${EVENT_KEY}` on `[data-bs-dismiss="${NAME}"]`; used by Alert (`'close'`), Modal, Offcanvas, Toast (default `'hide'`) | attribute | `util/component-functions.js:12-31` | — |

### util/index.js

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| `getUID`, `getElement`, `isElement`, `isVisible`, `isDisabled`, `isRTL`, `toType`, `noop`, `parseSelector`, `reflow`, `execute`, `findShadowRoot`, `getNextActiveElement` exported as shared utilities | method | `util/index.js:165` | — |
| `getjQuery` skipped when `document.body` carries `data-bs-no-jquery`; `defineJQueryPlugin` registers `$.fn[NAME]` after `onDOMContentLoaded` | initialization | `util/index.js:179-223` | — |

### Auto-initialization

| Obligation | Kind | Source | Documentation |
| --- | --- | --- | --- |
| Every `defineJQueryPlugin` call gates on `onDOMContentLoaded`, which fires immediately if `document.readyState !== 'loading'` else on `DOMContentLoaded` | initialization | `util/index.js:189-223` | — |
| No component file calls `onDOMContentLoaded` except through `defineJQueryPlugin` | initialization | `util/index.js:165` | — |

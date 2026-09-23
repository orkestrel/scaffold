I'll start by reading the brief and the repository's agent contract so I follow the required process.The brief is a read-only terrain pass. I'll record git status, then read the disclosure terrain so this family only reports what it adds.Git status is clean. The disclosure report already covers the shared engine, the four disclosure plugins, and the shipped styles pattern, so I’ll read only what this overlay family adds.Porcelain was empty before and after. The disclosure terrain already settles the shared engine, the four disclosure plugins, and the shipped styles pattern. What follows is only what B-MODAL … B-CAROUSEL adds. There is no `_toast.scss`; the toast rules are `_toasts.scss`.

## A. Oracle surface

No partial in this family declares a `@keyframes` rule. None of modal, offcanvas, tooltip, popover, alert, or toast writes a `[data-bs-theme]` block. Reduced motion is not spelled in these partials; it arrives only where a rule `@include`s `transition`, which the disclosure terrain already records as emitting `@media (prefers-reduced-motion: reduce)`.

**`modal`** (`_modal.scss`, about 240 lines). Selectors: `.modal` (`display: none`, `position: fixed`, `z-index: var(--bs-modal-zindex)`), `.modal-dialog`, `.modal.fade .modal-dialog`, `.modal.show .modal-dialog`, `.modal.modal-static .modal-dialog`, `.modal-dialog-scrollable` and its `.modal-content` / `.modal-body`, `.modal-dialog-centered`, `.modal-content`, `.modal-backdrop`, `.modal-header` and `.modal-header .btn-close`, `.modal-title`, `.modal-body`, `.modal-footer` and `.modal-footer > *`. Custom properties on `.modal` (`:11-32`): `--bs-modal-zindex`, `-width`, `-padding`, `-margin`, `-color`, `-bg`, `-border-color`, `-border-width`, `-border-radius`, `-box-shadow`, `-inner-border-radius`, `-header-padding-x`, `-header-padding-y`, `-header-padding`, `-header-border-color`, `-header-border-width`, `-title-line-height`, `-footer-gap`, `-footer-bg`, `-footer-border-color`, `-footer-border-width`. On `.modal-backdrop` (`:115-117`): `--bs-backdrop-zindex`, `-bg`, `-opacity`. The backdrop mixin (`mixins/_backdrop.scss:2-13`) is `position: fixed`, full viewport, and `.fade { opacity: 0 }` / `.show { opacity: $backdrop-opacity }`. State classes this partial reads: `.fade`, `.show`, `.modal-static`. It does not read `.showing` or `.hiding`. No `/* rtl:` comment. Responsive loops: `@include media-breakpoint-up(sm)` (`:180`) retunes `--bs-modal-margin` and `--bs-modal-box-shadow` and caps `.modal-dialog`; `.modal-sm` sets the width there; `media-breakpoint-up(lg)` (`:198`) sets `.modal-lg, .modal-xl`; `media-breakpoint-up(xl)` (`:205`) sets `.modal-xl`. The fullscreen loop (`:212-238`) walks `$grid-breakpoints` (`_variables.scss:484-491`: `xs` 0 through `xxl` 1400px) and emits `.modal-fullscreen` plus `.modal-fullscreen-{sm,md,lg,xl,xxl}-down` inside `media-breakpoint-down`. Fade transform is `translate(0, -50px)`, show is `none`, static is `scale(1.02)` (`_variables.scss:1537-1540`). There is no `.modal.show { display }` rule and no `.modal-open` rule; line 3 only comments that `.modal-open` is a body class for killing scroll.

**`offcanvas`** (`_offcanvas.scss`, about 147 lines). Two `@each` loops over the same breakpoint map. The first (`:20-27`) only extends `%offcanvas-css-vars` onto `.offcanvas` and `.offcanvas-{sm,md,lg,xl,xxl}`. The second (`:29-117`) puts the fixed panel inside `media-breakpoint-down($next)` and, when the infix is not empty, a `media-breakpoint-up($next)` block that sets height `auto`, border width `0`, hides `.offcanvas-header`, and clears `.offcanvas-body`. Inside the down query the placement classes are `.offcanvas-start`, `-end`, `-top`, `-bottom`. State classes read there (`:84-93`): `.showing`, `.show:not(.hiding)`, `.hiding`, `.show`. No `.fade` on the panel. Custom properties (`:5-16`): `--bs-offcanvas-zindex`, `-width`, `-height`, `-padding-x`, `-padding-y`, `-color`, `-bg`, `-border-width`, `-border-color`, `-box-shadow`, `-transition`, `-title-line-height`. `.offcanvas-backdrop` (`:119-121`) calls the same backdrop mixin with Sass values, not the `--bs-backdrop-*` properties. Also `.offcanvas-header`, `.offcanvas-header .btn-close`, `.offcanvas-title`, `.offcanvas-body`. No `/* rtl:` comment, no theme retune. `@include transition` is on the panel (`:47`).

**`tooltip`** (`_tooltip.scss`, about 120 lines). Selectors: `.tooltip`, `.tooltip.show`, `.tooltip .tooltip-arrow`, `.tooltip-arrow::before`, `.bs-tooltip-top .tooltip-arrow`, `.bs-tooltip-end .tooltip-arrow`, `.bs-tooltip-bottom .tooltip-arrow`, `.bs-tooltip-start .tooltip-arrow`, `.bs-tooltip-auto[data-popper-placement^="top"|"right"|"bottom"|"left"]` (each `@extend`s the matching side class, `:96-108`), `.tooltip-inner`. Custom properties (`:4-15`): `--bs-tooltip-zindex`, `-max-width`, `-padding-x`, `-padding-y`, `-margin`, `-font-size`, `-color`, `-bg`, `-border-radius`, `-opacity`, `-arrow-width`, `-arrow-height`. Resting opacity is `0`; `.show` sets `opacity: var(--bs-tooltip-opacity)` (`:28-30`). No `.fade`, `.showing`, or `.hiding` in this partial. No keyframes, no theme block, no breakpoint loop. `/* rtl:begin:ignore */` … `/* rtl:end:ignore */` wrap the end arrow (`:56-69`) and the start arrow (`:81-94`).

**`popover`** (`_popover.scss`, about 196 lines). Selectors: `.popover`, `.popover .popover-arrow`, `.popover-arrow::before`, `.popover-arrow::after`, `.bs-popover-top > .popover-arrow`, `.bs-popover-end > .popover-arrow`, `.bs-popover-bottom > .popover-arrow`, `.bs-popover-bottom .popover-header::before`, `.bs-popover-start > .popover-arrow`, `.bs-popover-auto[data-popper-placement^="top"|"right"|"bottom"|"left"]` (`:163-175`), `.popover-header`, `.popover-body`. Custom properties (`:3-22`): `--bs-popover-zindex`, `-max-width`, `-font-size`, `-bg`, `-border-width`, `-border-color`, `-border-radius`, `-inner-border-radius`, `-box-shadow`, `-header-padding-x`, `-header-padding-y`, `-header-font-size`, `-header-color`, `-header-bg`, `-body-padding-x`, `-body-padding-y`, `-body-color`, `-arrow-width`, `-arrow-height`, `-arrow-border`. This partial reads none of `.fade`, `.show`, `.showing`, `.hiding`. Same `/* rtl:begin:ignore */` pairs around the end arrow (`:78-102`) and the start arrow (`:137-161`). No theme block, no breakpoint loop, no `transition` include.

**`alert`** (`_alert.scss`, about 68 lines). Selectors: `.alert`, `.alert-heading`, `.alert-link`, `.alert-dismissible`, `.alert-dismissible .btn-close`, and `.alert-{primary,secondary,success,info,warning,danger,light,dark}` from `@each` over `$theme-colors` (`_variables.scss:312-320`, `_alert.scss:60-66`). Custom properties on `.alert` (`:7-15`): `--bs-alert-bg`, `-padding-x`, `-padding-y`, `-margin-bottom`, `-color`, `-border-color`, `-border`, `-border-radius`, `-link-color`. The modifiers retune color, bg, border-color, and link-color. No state class, no keyframes, no theme block, no breakpoint loop, no `/* rtl:` comment, no `transition` include.

**`toast`** (`_toasts.scss`, about 73 lines). Selectors: `.toast`, `.toast.showing`, `.toast:not(.show)`, `.toast-container`, `.toast-container > :not(:last-child)`, `.toast-header`, `.toast-header .btn-close`, `.toast-body`. Custom properties on `.toast` (`:3-17`): `--bs-toast-zindex`, `-padding-x`, `-padding-y`, `-spacing`, `-max-width`, `-font-size`, `-color`, `-bg`, `-border-width`, `-border-color`, `-border-radius`, `-box-shadow`, `-header-color`, `-header-bg`, `-header-border-color`. `.toast-container` redeclares `--bs-toast-zindex` (`:41`). `.showing` sets `opacity: 0` (`:31-33`); `:not(.show)` sets `display: none` (`:35-37`). No `.fade`, no `.hiding`, no keyframes, no theme block, no breakpoint loop, no `/* rtl:` comment, no `transition` include.

**`carousel`** (`_carousel.scss`, about 227 lines). Selectors: `.carousel`, `.carousel.pointer-event`, `.carousel-inner`, `.carousel-item`, `.carousel-item.active`, `.carousel-item-next`, `.carousel-item-prev`, `.carousel-item-next:not(.carousel-item-start)`, `.active.carousel-item-end`, `.carousel-item-prev:not(.carousel-item-end)`, `.active.carousel-item-start`, `.carousel-fade` and its item, active, next/start, prev/end, and active start/end children, `.carousel-control-prev`, `.carousel-control-next`, their `:hover` / `:focus`, `.carousel-control-prev-icon`, `.carousel-control-next-icon`, `.carousel-indicators`, `.carousel-indicators [data-bs-target]`, `.carousel-indicators .active`, `.carousel-caption`, `.carousel-dark`, `:root`, `[data-bs-theme="light"]`. The file header (`:6-12`) says `.carousel-item-start` / `-end` mark where the active slide is heading, and `.carousel-item-next.carousel-item-start` / `.carousel-item-prev.carousel-item-end` are the incoming slide. No `.fade`, `.show`, `.showing`, or `.hiding`. No `.slide` selector. `@include transition` is on `.carousel-item` (`:36`), the controls (`:105`), the indicators (`:179`), and the fade variant's outgoing active item (`:78`). Dark: `.carousel-dark` (`:211`) and, when `$enable-dark-mode`, `@include color-mode(dark, true)` (`:222-225`). `$color-mode-type` is `data`, so that mixin writes `[data-bs-theme="dark"]` (`mixins/_color-mode.scss:16-18`); the `$root: true` argument does nothing in that branch. The light values are the explicit `:root, [data-bs-theme="light"]` block (`:215-220`). Those three properties are `--bs-carousel-indicator-active-bg`, `--bs-carousel-caption-color`, `--bs-carousel-control-icon-filter`. No breakpoint loop. The only `/* rtl:` text is injected into the control icons (`:137-140`): each `background-image` is one SVG with the other direction's SVG inside a `/*rtl:…*/` comment. The URIs live in `_variables.scss:1673-1674` (`viewBox='0 0 16 16'`, a left chevron and a right chevron). Indicators are a bar, not an SVG.

**Classes that exist for the engine.** The plugin, not a resting markup class, adds these while a transition runs: `.showing` and `.hiding` on offcanvas; `.showing` on toast (and the deprecated `.hide`, which this partial does not style); `.modal-static` on modal; `.carousel-item-next`, `-prev`, `-start`, `-end` on carousel items; `.pointer-event` on the carousel (Swipe adds it; the partial sets `touch-action: pan-y`); `.fade` and `.show` on the backdrop element the Backdrop helper creates; `bs-tooltip-auto` / `bs-popover-auto` and `data-popper-placement` on the generated tip. `.modal-open` and `.slide` are read or written by script and have no rule in these partials. Modal visibility is an inline `display`, not a `.show` display rule.

## B. Plugin obligations

Shared construction, config merge, `EventHandler.trigger` (`cancelable: true`), `_queueCallback`, and `BaseComponent.dispose` stay as the disclosure terrain recorded them. Below, "pre-change" means the event whose `defaultPrevented` aborts the change.

| Obligation | Modal `modal.js` | Offcanvas `offcanvas.js` | Tooltip `tooltip.js` | Popover `popover.js` | Alert `alert.js` | Toast `toast.js` | Carousel `carousel.js` |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Data read | `[data-bs-toggle="modal"]` (`:48`, `:339`); `backdrop`, `focus`, `keyboard` through the shared merge | `[data-bs-toggle="offcanvas"]` (`:47`, `:232`); also `load` on `.offcanvas.show` (`:260`) and resize on `[aria-modal][class*=show][class*=offcanvas-]` (`:266`) | No `data-bs-toggle` string and no document listener. `_getConfig` (`:539-545`) reads every `data-bs-*` except `sanitize`, `allowList`, `sanitizeFn` (`:23`) | Inherits Tooltip. No data-api listener of its own | `[data-bs-dismiss="alert"]` via `enableDismissTrigger(Alert, 'close')` (`alert.js:79`, `component-functions.js:12-16`) | `animation`, `autohide`, `delay` through the merge; dismiss is `[data-bs-dismiss="toast"]` (`toast.js:216`) | `[data-bs-slide]`, `[data-bs-slide-to]` (`:62`, `:432`); `[data-bs-ride="carousel"]` on load (`:63`, `:460`); `data-bs-interval` (`:295`) |
| Defaults | `backdrop: true`, `focus: true`, `keyboard: true` (`:50-53`); types `(boolean\|string)`, `boolean`, `boolean` (`:56-59`) | `backdrop: true`, `keyboard: true`, `scroll: false` (`:49-52`); types `(boolean\|string)`, `boolean`, `boolean` (`:55-58`) | `animation: true`, `delay: 0`, `html: false`, `placement: 'top'`, `offset: [0, 6]`, `trigger: 'hover focus'`, `sanitize: true`, `fallbackPlacements: ['top','right','bottom','left']`, `boundary: 'clippingParents'`, `container: false`, `popperConfig: null`, `title: ''`, template with `role="tooltip"` (`:58-78`); types at `:81-98` | Spreads Tooltip, then `content: ''`, `offset: [0, 8]`, `placement: 'right'`, `trigger: 'click'`, popover template still `role="tooltip"` (`:20-35`); `content` type `(null\|string\|element\|function)` (`:33-35`) | No `Default` | `animation: true`, `autohide: true`, `delay: 5000` (`:41-44`); types `boolean`, `boolean`, `number` (`:35-38`) | `interval: 5000`, `keyboard: true`, `pause: 'hover'`, `ride: false`, `touch: true`, `wrap: true` (`:70-76`); types at `:79-85`. `ride === 'carousel'` calls `cycle()` (`:105`) |
| Public methods | `toggle`, `show`, `hide`, `dispose`, `handleUpdate` (`:94-155`) | `toggle`, `show`, `hide`, `dispose` (`:89-164`) | `enable`, `disable`, `toggleEnabled`, `toggle`, `show`, `hide`, `update`, `setContent`, `dispose` (`:146-181`, `:284`, `:326`) | Inherited, plus `_getContent` (`:69`) | `close` (`:37`) | `show`, `hide`, `dispose`, `isShown` (`:75-135`) | `next`, `nextWhenVisible`, `prev`, `pause`, `cycle`, `to`, `dispose` (`:124-195`) |
| Events | `show`, `shown`, `hide`, `hidden`, `hidePrevented`, plus resize and dismiss names (`:29-38`). Pre-change: `show` (`:103-108`) and `hide` (`:128-131`). `hidePrevented` is also checked (`:265`) | `show`, `shown`, `hide`, `hidden`, `hidePrevented` (`:38-42`). Pre-change: `show` (`:98-101`) and `hide` (`:133-136`). `hidePrevented` fires for static backdrop and for Escape when `keyboard` is false (`:169-171`, `:206`) | `show`, `shown`, `hide`, `hidden`, `inserted` (`:39-43`). Pre-change: `show` (`:193-197`) and `hide` (`:248`) | Inherited | `close`, `closed` (`:21-22`). Pre-change: `close` (`:38-41`) | `show`, `shown`, `hide`, `hidden` (`:25-28`). Pre-change: `show` (`:76-79`) and `hide` (`:107-110`) | `slide`, `slid` (`:40-41`), with `relatedTarget`, `direction`, `from`, `to` (`:315-321`). Pre-change: `slide` (`:324-327`). `slid` is not checked |
| Keys | `Escape` (`:27`, `:207-217`). Static backdrop or `keyboard: false` runs the static scale instead of hide | `Escape` (`:30`, `:196-206`) | None. Triggers are `hover`, `focus`, `click`, `manual` (`:34-37`, `:78`) | Inherited; default trigger is `click` | None | None. `focusin` / `focusout` only pause autohide (`:184-188`) | `ArrowLeft`, `ArrowRight` (`:31-32`, `:254-262`), ignored when the target is `input` or `textarea`. RTL swaps the mapping (`:391-396`) |
| ARIA written | `aria-modal`, `role="dialog"`, removes `aria-hidden` on show (`:178-180`); sets `aria-hidden` and removes the other two on hide (`:247-249`) | `aria-modal` and `role="dialog"` on show (`:111-112`); both removed on hide (`:147-148`). No `aria-hidden` | Template `role="tooltip"`; `id` on the tip; `aria-describedby` on the trigger (`:206`, `:317`); `aria-label` when the trigger has no label and no text (`:493-494`); writes `data-bs-original-title` (`:497`) | Template still `role="tooltip"` (`:25`) | None | None | Removes `aria-current` from the active indicator and sets `aria-current="true"` on `[data-bs-slide-to]` (`:278-284`) |
| Focus | `FocusTrap` on the modal when `focus` is true (`:165-168`, `:193-194`). Data API returns focus to the trigger after `hidden` (`:352-355`). Static backdrop calls `this._element.focus()` (`:289`) | `FocusTrap` when `!scroll` or `backdrop` is set (`:116-118`). `blur()` on hide (`:140`). Data API returns focus to a visible trigger (`:243-247`) | Focus is a show trigger, not a trap | Inherited | None | `focusin` sets `_hasKeyboardInteraction` and clears the autohide timer (`:160-172`) | None |
| Transition end | `_queueCallback` on the dialog, waiting only when the modal has `.fade` (`:140`, `:203`, `:260-261`) | `_queueCallback` on the element with the wait flag always true (`:125`, `:157`) | `_queueCallback` on the tip when `animation` or the tip has `.fade` (`:239`, `:281`, `:365-366`) | Inherited | `_queueCallback` waiting when the element has `.fade` (`:46-47`) | Adds `.fade` when `animation` is true (`:84-86`); `_queueCallback` waits on that flag (`:99`, `:120`). Also `setTimeout(hide, delay)` for autohide (`:147-148`) | `_queueCallback` on the active item only when the root has `.slide` (`:365`, `:372-373`) |
| `dispose` | Off window and dialog listeners, `backdrop.dispose()`, `focustrap.deactivate()`, then `super` (`:143-150`) | `backdrop.dispose()`, `focustrap.deactivate()`, `super` (`:160-163`) | Clears the timer, restores `title` from `data-bs-original-title`, destroys the Popper instance, removes the tip (`:171-181`, `:597-606`) | Inherited | Inherited. `close` removes the element, then `dispose` (`:51-54`) | Clears the timer, removes `.show` if shown, `super` (`:123-130`) | `swipeHelper.dispose()` if present, then `super` (`:190-195`) |

**Popper, from `tooltip.js`.** Import is required; construction throws if `Popper` is undefined (`:107-108`). `Popper.createPopper(trigger, tip, config)` (`:373-376`). `AttachmentMap` (`:50-56`) maps `RIGHT`/`LEFT` through `isRTL()`. Modifiers (`:400-434`): `flip` with `fallbackPlacements`, `offset`, `preventOverflow` with `boundary`, `arrow` whose element is `.tooltip-arrow` or `.popover-arrow`, and a `preSetPlacement` modifier that writes `data-popper-placement` before Popper measures the arrow. `popperConfig` is spread over that object (`:438-440`). `update` calls `_popper.update()` (`:284-286`). On `hide.bs.modal` from an ancestor `.modal`, the tooltip hides (`:32`, `:174`).

**Backdrop** (`util/backdrop.js`, about 151 lines). Defaults (`:23-28`): `className: 'modal-backdrop'`, `clickCallback: null`, `isAnimated: false`, `isVisible: true`, `rootElement: 'body'`. `show` appends a `div`, adds `.fade` when animated and `.show` always, then `executeAfterTransition` (`:65-82`, `:146-147`). `hide` removes `.show` and then `dispose`, which removes the node (`:85-107`). Offcanvas passes `className: 'offcanvas-backdrop'`, `isAnimated: true`, and `rootElement` the parent (`offcanvas.js:180-186`). Modal uses the default class and `isVisible: Boolean(backdrop)`, so the string `'static'` still builds a backdrop (`modal.js:158-162`).

**FocusTrap** (`util/focustrap.js`, about 115 lines). Defaults `autofocus: true`, `trapElement: null` (`:26-28`). `activate` focuses the trap element and listens on `document` for `focusin` and for `Tab` (`:62-75`, key `Tab` at `:22`). A `focusin` outside the trap moves focus to the first or last `focusableChildren`, depending on whether Shift was down (`:88-103`). `deactivate` only removes those document listeners (`:78-85`).

**ScrollBarHelper** (`util/scrollbar.js`, about 114 lines). `getWidth` is `Math.abs(window.innerWidth - document.documentElement.clientWidth)` (`:31-35`). `hide` sets `body` `overflow: hidden`, adds that width to `padding-right` on `body` and on `.fixed-top, .fixed-bottom, .is-fixed, .sticky-top`, and subtracts it from `margin-right` on `.sticky-top` (`:15-18`, `:37-44`). Prior inline values are stored with `Manipulator.setDataAttribute` (`:79-83`). `reset` restores `overflow`, `padding-right`, and `margin-right` (`:47-51`). There is no `dispose`. Modal calls `hide` on show and `reset` after the backdrop hides (`modal.js:114`, `:255`). Offcanvas does the same only when `scroll` is false (`offcanvas.js:107-108`, `:150-151`). Modal also writes `paddingLeft` or `paddingRight` on the modal itself when the body scrollbar and the modal's own overflow disagree, swapped by `isRTL()` (`modal.js:296-309`).

**Swipe** (`util/swipe.js`, about 146 lines). Threshold is `40` (`:26`); a swipe whose absolute delta is at most 40 returns (`:105-109`). A positive direction calls `rightCallback`, a negative one `leftCallback` (`:120`). When `PointerEvent` exists it listens to pointer down/up and adds `.pointer-event`; otherwise touch start/move/end (`:123-132`). `isSupported` is `ontouchstart` or `navigator.maxTouchPoints > 0` (`:141-142`). `dispose` removes the swipe events (`:73-75`). Carousel wires left/right to `_directionToOrder` and, when `pause === 'hover'`, restarts the cycle after `TOUCHEVENT_COMPAT_WAIT` of 500 (`carousel.js:33`, `:224-251`).

**Sanitizer** (`util/sanitizer.js`, about 117 lines). `DefaultAllowlist` (`:11-46`) maps a tag to an attribute list. `'*'` allows `class`, `dir`, `id`, `lang`, `role`, and `/^aria-[\w-]*$/i`. URI attributes (`href`, `src`, and the set at `:49-58`) must match `SAFE_URL_PATTERN`, which rejects a `javascript:` URL (`:66`, `:72-73`). `sanitizeHtml` (`:84`) uses `DOMParser` and drops tags and attributes outside the list, unless a `sanitizeFn` is passed.

**TemplateFactory** (`util/template-factory.js`, about 161 lines). Defaults (`:19-26`): `allowList: DefaultAllowlist`, `content: {}`, `extraClass: ''`, `html: false`, `sanitize: true`, `sanitizeFn: null`, `template: '<div></div>'`. `toHtml` (`:84-99`) sanitizes the template, fills each `{ selector: text }` entry, and adds `extraClass`. Tooltip builds the tip through it (`tooltip.js:304`). No `dispose`.

## C. Elements and Mailbox

Every factory below imports `@vue/reactivity`. The disclosure terrain already records that, and the construction ruling refuses it. None of these factories calls `IntersectionObserver`, `ResizeObserver`, `scroll-snap`, or sets the `inert` attribute. Native `showModal()` is what the Elements guide says makes the rest of the document inert (`elements/guides/w3c/interactions.md`, heading "Modal dialogs and inert subtrees", about `:275-281`).

| Site | What it does | Covers | Platform |
| --- | --- | --- | --- |
| `elements/.../createDialog.ts:16-23` and `:60-63` | `<dialog>` only. Cancelable `elements:dialog:show` / `hide` over `showModal()` / `close()` | lifecycle, cancellation, focus (comment: the platform traps focus) | `<dialog>`, `showModal` |
| `elements/.../createAside.ts:10-22` and `:65-70` | Sets `popover` to `'auto'` or `'manual'`; visibility is `:popover-open`. The comment says it does not wire `aria-modal`, `role`, `inert`, or body scroll lock | lifecycle, cleanup (`:140` restores `popover`) | `popover` attribute |
| `elements/.../createTooltip.ts:28-29` and `:157-169` | `popover="manual"`, cancelable show/hide, `position-area` for placement | lifecycle, cancellation, placement, cleanup | `popover`, CSS anchor (`anchorName` / `positionAnchor`, `:230-235`) |
| `elements/.../createPopover.ts:26-45` and `:192-207` | Same popover pipeline; writes `aria-expanded`, `aria-haspopup`, `aria-controls`, restored on destroy (`:283-348`) | lifecycle, cancellation, placement, cleanup | `popover`, CSS anchor, `showPopover({ source })` |
| `elements/.../createAlert.ts:6-16` and `:18-27` | In-flow `[role="alert"]`. Cancelable show/hide, `aria-hidden`, dismiss click. No popover | lifecycle, cancellation | none of the listed platform APIs |
| `elements/.../createToast.ts:35-40` and `:176` | Toast is `[popover][role="status"]` delegated to `createPopover`, plus an auto-dismiss timer. Swipe threshold constant is `DEFAULT_TOAST_SWIPE_THRESHOLD_PX = 80` (`constants.ts:40`) | lifecycle, cancellation, placement, cleanup | `popover` |
| `elements/.../createCarousel.ts:12-27` | Active index, autoplay, keyboard, touch. Writes `.active` and `.carousel-item-next` / `-prev` / `-start` / `-end`. No `matchMedia` | lifecycle, motion (comment: consumer CSS animates) | none of the listed APIs. `SWIPE_THRESHOLD_PX = 40` (`constants.ts:63`) |
| `elements/.../createDrag.ts:16-19` | Pointer selection (click, toggle, extend), not an overlay swipe | lifecycle | none |
| `elements/.../createFocus.ts:6-21` | Tab wrap inside the host; `deactivate` restores the previous focus | focus, cleanup | none |
| `mailbox/.../createModal.ts:16-19` and `:35-40` | Bootstrap-class modal: backdrop element, body scroll lock, Escape, Tab trap via `createFocus`. A comment at `:175` bridges a native `<dialog>` `cancel` when the host happens to be one | lifecycle, cancellation, focus, motion (`runTransition`), cleanup | `<dialog>` only as an optional bridge |
| `mailbox/.../createOffcanvas.ts:20-23` and `:38-40` | Same backdrop, dismiss, scroll lock, and focus trap; visibility so the slide can run | lifecycle, cancellation, focus, motion, cleanup | none required |
| `mailbox/.../createDialog.ts:15-22` | Same `<dialog>` / `showModal()` pipeline as Elements, events named `mailbox:dialog:*` | lifecycle, cancellation, focus | `<dialog>`, `showModal` |
| `mailbox/.../createTooltip.ts:33-34` and `:158-172` | Popover API plus CSS anchor; also toggles `.show` | lifecycle, cancellation, placement, cleanup | `popover`, CSS anchor (`:239-248`) |
| `mailbox/.../createPopover.ts:60-63` and `:208-225` | Same, and applies Bootstrap placement classes (`applyPopoverClasses`, `:141`) | lifecycle, cancellation, placement, cleanup | `popover`, CSS anchor (`:285-297`) |
| `mailbox/.../createAlert.ts:15-21` | `.show` / `.fade`, dismiss click, `role="alert"` if absent. Comment: alerts stay in flow, unlike popovers | lifecycle, cancellation, motion, cleanup | none |
| `mailbox/.../createToast.ts:36` and `:159` | Delegates to `createPopover`, with a timer | lifecycle, cancellation, placement, cleanup | `popover` |
| `mailbox/.../createCarousel.ts:173-181` | Same slide classes as Elements. `matchMedia('(prefers-reduced-motion: reduce)')` skips autoplay | lifecycle, motion | `matchMedia` |
| `mailbox/.../createDrag.ts:322-323` | Selection drag; reduced-motion read is the same `matchMedia` call | motion | `matchMedia` |
| `mailbox/.../createFocus.ts:6-19` | Same Tab trap as Elements | focus, cleanup | none |

Elements appearance rulings, beyond the disclosure terrain's `<details>` / `<menu popover>` notes:

- `styles.md` rule 6 (about `:129`): a modal is `<dialog>`, a sidebar is `<aside>`, a toast is `<output>`. The z-index token line (about `:133`) names `--set-z-index-{sticky,fixed,dropdown,modal,popover,tooltip,toast}`.
- `components.md` (about `:10-15`, `:114-116`, `:156-164`): `<dialog>` opened with `showModal()` is the centered modal; `<aside popover>` is the offcanvas drawer and shares the dialog scrim; `<aside role="alert">` is the in-flow alert; `<output popover>` is the toast; `[popover='hint']` is the tooltip. `.carousel` is named as a class root because no tag fits (about `:148`).
- `surfaces.md` (about `:13-15`, `:160-184`): one native `::backdrop` for `dialog:modal` and for `:is(aside, nav)[popover]:popover-open`; tooltips, toasts, and non-modal dialogs keep a transparent backdrop. Anchor placement is `position-area` on `[popover]` excluding `aside`, `dialog`, `nav`, and `output`.
- `elements.md` (about `:24`, `:33`, `:51`, `:211`): `<dialog>` pairs `useDialog` and gates layout on `:modal`; `<output>` pairs `useToast` and gates chrome on `:popover-open`.

## D. What the tree already carries

`src/styles/index.scss:1-73` `@use`s through `components/close` and `utilities/gap`. It does not name `modal`, `offcanvas`, `tooltip`, `popover`, `alert`, `toast`, or `carousel`. `app/` has no match for those words. `tests/setup.ts` registers no subject by those names.

Shipped overlap is the forms tooltip and the close control, not these keys:

- `_validation.scss` (about `:21-38`) styles `.#{$state}-tooltip`. `_input-group.scss` (about `:104-109`) excludes `.valid-tooltip` and `.invalid-tooltip` from the overlap rule. The guide's validation and input-group sections (about `:1412-1478`) and the departure rows `#### invalid-tooltip` and `#### valid-tooltip` (`guides/veneer.md:3547-3567`) record those. Compatibility rows `valid-tooltip` and `invalid-tooltip` (about `:3919-3921`) are `shipped`.
- `### Close classes` (`:1673-1678`) says the combinators the alert, toast, modal, and offcanvas headers write belong to the overlay components and stay under Deferred selectors.
- `### Deferred selectors` (`:1704`). Owner `Overlays`, reason "The owning component supplies this relationship." (`:1736-1739`), each row whole:

`| .alert-dismissible .btn-close | Overlays | The owning component supplies this relationship. |`

`| .toast-header .btn-close | Overlays | The owning component supplies this relationship. |`

`| .modal-header .btn-close | Overlays | The owning component supplies this relationship. |`

`| .offcanvas-header .btn-close | Overlays | The owning component supplies this relationship. |`

`tests/setupStyles.ts` `CLOSE_DEFERRED` (`:4087-4092`) lists the same four selectors. No departure row and no addition row is keyed `modal`, `offcanvas`, `tooltip`, `popover`, `alert`, `toast`, or `carousel`. No compatibility row names them. `### Departures from the workspace rows` (`:1741`) is still the styles-axis configuration list.

Stack ladder. Declared in `_tokens.scss:358-367` and mirrored by `stack` in `src/core/constants.ts:290-305`. The guide's `#### Motion, focus, validation, breakpoints, and stacking` rows (`:2081-2084`), each whole:

`| --vn-stack-dropdown, -sticky, -fixed | 1000, 1020, 1030 | bootstrap — retained from $zindex-dropdown, $zindex-sticky, and $zindex-fixed | none |`

`| --vn-stack-drawer-backdrop, -drawer-base | 1040, 1045 | bootstrap — retained from $zindex-offcanvas-backdrop and $zindex-offcanvas | none |`

`| --vn-stack-dialog-backdrop, -dialog-base | 1050, 1055 | bootstrap — retained from $zindex-modal-backdrop and $zindex-modal | none |`

`| --vn-stack-popover, -hint, -toast | 1070, 1080, 1090 | bootstrap — retained from $zindex-popover, $zindex-tooltip, and $zindex-toast | none |`

The paragraph at `:2094-2097` says `drawer` is Bootstrap's offcanvas, `dialog` its modal, and `hint` its tooltip, and that Bootstrap declares that ladder as Sass variables on component rules rather than as root custom properties. Those Sass numbers match `_variables.scss:1133-1142`. No shipped partial reads `--vn-stack-drawer-*`, `--vn-stack-dialog-*`, `--vn-stack-popover`, `--vn-stack-hint`, or `--vn-stack-toast`.

Carousel variables already in the theme. `_mixins.scss:332-334` writes `--bs-carousel-indicator-active-bg`, `--bs-carousel-caption-color`, and `--bs-carousel-control-icon-filter` from palette tokens. The guide's `### Bootstrap variables Veneer retains` (`:2179-2186`) says they paint a component Veneer does not own yet, so no ledger row measures them, and that a data URI cannot read a custom property, so the forward path is a `mask-image` treatment in the owning unit. `### Outside the ledger` (`:3761-3763`) repeats that. `tests/setupStyles.ts:2714-2716` and `:2793-2795` list the same three names.

## E. Rulings

Tenets that name focus or motion (`ROADMAP.md` `### Product tenets`):

> Exercise user actions, state transitions, focus, keyboard use, and interaction outcomes.

> Preserve the look and feel that the user values in Elements, including its interaction animations.

> Verify the resulting behavior and animation rather than assuming a native element automatically supplies the complete component contract.

No tenet names an overlay, a backdrop, `z-index`, or stacking.

Rulings that do (`## Rulings`):

> Take Elements' spacing scale, container widths, and motion tokens from rendered specimens when the identity phase opens.

> Adopt the cancelable pre-change event beside the completed one, a shared focus primitive, native-first disclosure and placement proved on captures, reduced-motion gating in script, `IntersectionObserver` for Scrollspy, and completion read from the actual transition.

> Close the baseline before the engine (D41). Each `B` family ships its cascade keys with every state class rendered statically, and the Tailwind compatibility proofs stay green over them; the plugin obligations and the utilities form J-ENGINE after the baseline, on native browser systems, with no runtime dependency outside `@orkestrel/*` and each candidate ruled on, Elements and Mailbox read for mechanisms and lessons.

D5 (`:160-161`) ships no right-to-left support. D11 (`:167-170`) writes Bootstrap's physical properties.

Exit criterion (`## Exit criterion`, items 2, 3, 4, and 7):

> 2. Accounting closure: every emitted selector, declaration, custom property, and keyframe maps to a recorded Bootstrap value, a departure row, or an addition row; every recorded name ships or holds a deferral row with an owner; each gate reddens on its planted mutation.

> 3. Baseline coverage: every key the pinned record carries ends `shipped`, deferred with an owner, or excluded with a reason the user has seen, engine obligations included, under the same gates.

> 4. Owned engine: every interactive contract works without Bootstrap JavaScript or another forbidden runtime, with lifecycle, cancellation, focus, motion, and cleanup proved per component.

> 7. Rendered acceptance: every shipped key carries captures at its states and variants under one frame grammar, ruled through the polish skill.

The phases row (`## Phases and units`, the B-MODAL … B-CAROUSEL row) closes "the overlays and feedback family's cascade keys (`modal`, `offcanvas`, `tooltip`, `popover`, `alert`, `toast`, `carousel`) in the cascade, the showcase, the proofs, and the ledger, every state class rendered statically; the plugin obligations and the utilities deferred with J-ENGINE as owner (D41)." The queue bullet is the same list (`### The family queue`, about `:313-316`).

`decisions-round-2.md` **D41** (about `:444-450`), the user's sentence:

> My expectation is that what we will be closing is the baseline for bootstrap parity and tailwindcss compatibility, and then next we will be tackling the replacement of bootstrap JavaScript with our own typescript package closely using native browser systems and without dependencies except orkestrel packages where needed and after careful consideration of all and each, and looking at the elements and mailbox projects for ideas and lessons learned.

The "As read" paragraph names Modal, Offcanvas, Tooltip, Popover, Alert, Toast, Carousel and the six utilities as J-ENGINE, and says exit criterion item 4 closes with J-ENGINE.

**D31** (about `:298-302`) names tooltip specimens, not the `.tooltip` key:

> `valid-tooltip` and `invalid-tooltip` ship from GROUP with no rendered specimen (D6). B-FORMS-CLOSE carries `Input group valid tooltip` and `Input group invalid tooltip` as resting element frames over a wrapper that keeps the tooltip's overflow room beneath the group, and the ROADMAP row names that unit.

D29, D34, and D37 use `z-index`, `backdrop`, and `focus` for form controls. No decision in that file names the stack ladder, an overlay, or modal, offcanvas, alert, toast, popover, or carousel.

One Carriers row names a tooltip and stacking (`ROADMAP.md` `## Carriers`, the validation-tooltip row): it says B-FORMS-CLOSE-SPECIMENS renders `Input group valid tooltip` and `Input group invalid tooltip` as resting element frames, and the journey reads each hanging key's display, room, and stacking. That is the forms key, not this family's `tooltip` key.

## F. Sizing

| Source | Lines |
| --- | --- |
| `_modal.scss` | 240 |
| `_offcanvas.scss` | 147 |
| `_tooltip.scss` | 120 |
| `_popover.scss` | 196 |
| `_alert.scss` | 68 |
| `_toasts.scss` | 73 |
| `_carousel.scss` | 227 |
| `modal.js` | 378 |
| `offcanvas.js` | 282 |
| `tooltip.js` | 633 |
| `popover.js` | 98 |
| `alert.js` | 87 |
| `toast.js` | 224 |
| `carousel.js` | 475 |
| `util/backdrop.js` | 151 |
| `util/focustrap.js` | 115 |
| `util/scrollbar.js` | 114 |
| `util/swipe.js` | 146 |
| `util/sanitizer.js` | 117 |
| `util/template-factory.js` | 161 |

Inventory summary (`tests/fixtures/oracle/inventory.json`, the counts object near `:113219-113316`), selectors as the brief states, and keyframes / media from that same object. Every `keyframes` and `media` array on the component objects is `[]` (`offcanvas` `:59394`, `alert` `:67395` area via the summary, `toast` `:68637`, `modal` `:70910`, `tooltip` `:71976`, `popover` `:73937`, `carousel` `:75704`).

| Key | Selectors | Properties | Keyframes | Media field |
| --- | --- | --- | --- | --- |
| `modal` | 56 | 24 | 0 | 0 |
| `offcanvas` | 112 | 12 | 0 | 0 |
| `tooltip` | 21 | 12 | 0 | 0 |
| `popover` | 49 | 20 | 0 | 0 |
| `alert` | 13 | 9 | 0 | 0 |
| `toast` | 8 | 15 | 0 | 0 |
| `carousel` | 41 | 3 | 0 | 0 |

The empty `media` arrays are not the responsive rules. Those sit on selector `condition` fields inside the component objects: offcanvas from about `:53600` through `:56295` (86 conditions, `max-width` / `min-width` plus one `prefers-reduced-motion`); modal from `:68828` through `:69895` (32 conditions, one reduced-motion plus the `min-width` size steps and the `max-width` fullscreen steps); carousel from `:74064` through `:74861` (6 conditions, all `prefers-reduced-motion`). Alert, toast, tooltip, and popover have no `condition` media query inside their objects. The light and dark carousel custom properties on `:root` and `[data-bs-theme]` are recorded under `theme` (`:1408`, the declarations near `:2740`), while `.carousel-dark` holds the three properties on the `carousel` key (`:75690`). `.fade:not(.show)`, `.modal.fade .modal-dialog`, and `.offcanvas-backdrop.fade` are also recorded under `transition` (`:47961`, selectors near `:47993-48105`), and again under `modal` and `offcanvas`.

## G. Files the family makes false

The disclosure terrain's enumerating assertions, briefly: the styles barrel's `@use` list; `tests/conformance.test.ts`'s closed shipped-name array; `tests/setupServer.test.ts`'s matching set; `tests/setupStyles.ts` and `tests/setupStyles.test.ts` case tables; the per-component `it.each` lists; `Showcase.ts` and `Showcase.test.ts`'s region labels; the guide's `### Files`, `## Showcase`, `## Surface`, and `## Methods` enumerations; `src/browser/index.ts` and `tests/src/browser/index.test.ts`'s export list. `tests/setupPolicy.ts` and `tests/policy.test.ts` stay vendored.

This family adds:

- The barrel still ends at `components/close` and `utilities/gap` (`src/styles/index.scss:72-73`), so a new partial is a new `@use`.
- `tests/conformance.test.ts` has no match for these seven keys.
- `CLOSE_DEFERRED` (`tests/setupStyles.ts:4087-4092`) is the four overlay combinators, paired with the guide rows whose owner is `Overlays`.
- The journey's hanging-element branch (`tests/app/browser/integration.test.ts`, the comment near `:664` and the tooltip-keyed expects at `:713-733`) reads `input-group-valid-tooltip` and `input-group-invalid-tooltip`. The hit it accepts is the string `'tooltip'`. That is the forms key.
- `tests/setup.ts` frame grammar (the page-frame paragraph near `:344`): a page frame covers the whole document, so one shot of the resting page is one image whatever scenario name it carries. The hanging-key paragraph (`:358-362`) frames a key the release positions below its host together with the in-flow content beneath it, and reads which element paints on top. No scenario in that file is named for this family.
- Capture variants (`configs/app/vite.journey.config.ts:7-11`): `light-1280`, `dark-1280`, `light-390`, `dark-390`.

## Contradictions

- The guide says Bootstrap declares the stacking ladder as Sass variables on component rules, not as root custom properties (`guides/veneer.md:2094-2097`). The numbers match `_variables.scss:1133-1142`. Veneer has already declared the same numbers as `--vn-stack-*` on the theme root (`_tokens.scss:358-367`), and no component rule reads them. Carousel's three `--bs-carousel-*` properties are already emitted from `_mixins.scss:332-334` while the guide says no shipped key claims them (`:2179-2183`).
- Inventory `media` is 0 for every key in this family, and each component's `media` array is empty. The same objects carry dozens of `@media` conditions on selectors for offcanvas, modal, and carousel.
- `.modal` is `display: none` (`_modal.scss:39`) and `.show` only transforms the dialog (`:65-67`). The plugin sets `style.display` (`modal.js:177` and `:246`). `.modal-open` is a comment at `_modal.scss:3` and a class the plugin adds (`modal.js:40`, `:116`); scroll locking is `ScrollBarHelper`, which writes inline `overflow` and padding. A static stylesheet that includes `.show` does not, by these rules, show the modal.
- `.popover` has no `.show` or `.fade` rule. Tooltip's `.show` only changes opacity (`_tooltip.scss:30`). Popover's plugin still adds `.show` and `.fade` because it extends Tooltip.
- `.fade` and the backdrop `.fade` live in `_transitions.scss:1-7` and `mixins/_backdrop.scss:12-13`, and the inventory records them under `transition` as well as under `modal` and `offcanvas`. D22, from the disclosure terrain, gives a selector recorded under several keys to the most specific one. This reading did not re-read D22's text.
- D41 says every state class is rendered statically in the `B` family, and the plugins are J-ENGINE. Several of those classes (`.showing`, `.hiding`, `.modal-static`, `.carousel-item-next`, `-prev`, `-start`, `-end`) are added only while a plugin transition runs.
- Elements' guides rule `<dialog>`, `<aside popover>`, `<output popover>`, and `[popover='hint']`. Bootstrap's partials rule `.modal`, `.offcanvas`, `.tooltip`, `.popover`, `.alert`, `.toast`, and `.carousel`. The product tenet says Elements is the visual reference and Bootstrap compatibility must not replace it. E-IDENTITY is still after this family.
- The construction ruling refuses `@vue/reactivity`, the factory idiom, and the fixed transition fallback. Mailbox `createModal` and Elements `createDialog` use the factories and `@vue/reactivity`. Mailbox carousel is the one overlay factory here that calls `matchMedia`; Elements carousel does not. Tooltip and popover in both trees place with CSS anchor positioning; Bootstrap places them with Popper. The product tenet forbids Popper as a runtime package.
- The deferred-selector owner is the word `Overlays`. The roadmap's unit name is `B-MODAL … B-CAROUSEL`. The disclosure terrain's disclosure rows use the owner `Disclosure`.

## Unresolved inputs

- Which inventory field a unit should treat as the media count: the `media: 0` summary, or the selector `condition` queries.
- Whether D22 assigns `.modal.fade .modal-dialog` and `.offcanvas-backdrop.fade` to `modal` / `offcanvas` or leaves them on `transition`.
- Whether "every state class rendered statically" includes the mid-transition classes the plugin adds and removes, and how a static capture shows a modal whose `display` is an inline style.
- The guide names `mask-image` as the forward path for the carousel control SVG. No ruling in `decisions-round-2.md` confirms that path.
- Elements' guides do not rule Bootstrap's class roots for this family. `.carousel` is the one name they call a class root. The roadmap puts the appearance ruling at E-IDENTITY.
- No compatibility row states these seven plugins. The disclosure terrain's `engine` rows remain the shared machinery.
- CLOSE-GUIDE has not landed. The guide citations above are the file as it is now.
- The page-frame grammar covers the whole document in one shot. Nothing in `tests/setup.ts` says how a subject that covers the page is cropped, or how a tooltip that hangs over a control is distinguished from the forms hanging-key branch already in the journey.

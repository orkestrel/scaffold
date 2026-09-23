I'll start by reading the brief and the repository's agent contract so I follow the right instructions.The brief is a read-only terrain reading of the B-COLLAPSE through B-SCROLLSPY family. I'll capture git status, then gather the evidence it names.Porcelain was empty before and after. HEAD moved during the reading from `402c033` to `7b66db2` (`ROADMAP.md` only: the F0, F8d, and T3 rows marked landed). The family citations below are from the unchanged regions, except the unit-table wording for T3, which matches `7b66db2`.

Bootstrap is `"bootstrap": "5.3.8"` in `devDependencies` (`package.json:107`). The only `@orkestrel/*` runtime dependency is `"@orkestrel/contract": "^0.0.17"` (`package.json:92-94`). `$prefix` is `bs-` (`_variables.scss:392`). No SCSS file under `node_modules/bootstrap/scss/` contains `scrollspy`.

## A. Oracle surface

**`collapse` / `collapsing`** live in `_transitions.scss` (about 27 lines), inside `scss-docs-start collapse-classes` (`_transitions.scss:9-27`). Selectors: `.collapse:not(.show)` (`display: none`); `.collapsing` (`height: 0`, `overflow: hidden`, `@include transition($transition-collapse)`); `.collapsing.collapse-horizontal` (`width: 0`, `height: auto`, `@include transition($transition-collapse-width)`). No custom properties, keyframes, at-rules, `[data-bs-theme]`, or `/* rtl:` comments in this block. The durations sit in `_variables.scss:584-586` (`$transition-collapse`, `$transition-collapse-width`). The `transition` mixin (`mixins/_transition.scss:15-24`) emits `@media (prefers-reduced-motion: reduce) { transition: none }` when `$enable-transitions` and `$enable-reduced-motion` are true (`_variables.scss:374-375`).

**`accordion`** (`_accordion.scss`, about 153 lines). Selectors: `.accordion`, `.accordion-button`, `:not(.collapsed)`, `::after`, `:hover`, `:focus`, `.accordion-header`, `.accordion-item` (`:first-of-type`, `:not(:first-of-type)`, `:last-of-type`), `.accordion-body`, `.accordion-flush` and its item, collapse, and button children. Custom properties on `.accordion` (`_accordion.scss:6-27`): `--bs-accordion-color`, `-bg`, `-transition`, `-border-color`, `-border-width`, `-border-radius`, `-inner-border-radius`, `-btn-padding-x`, `-btn-padding-y`, `-btn-color`, `-btn-bg`, `-btn-icon`, `-btn-icon-width`, `-btn-icon-transform`, `-btn-icon-transition`, `-btn-active-icon`, `-btn-focus-box-shadow`, `-body-padding-x`, `-body-padding-y`, `-active-color`, `-active-bg`. No keyframes. No `/* rtl:` comment. Dark retune (`_accordion.scss:146-152`): `@if $enable-dark-mode` then `@include color-mode(dark)`, and `$color-mode-type` is `data` (`_variables.scss:388`), so the mixin writes `[data-bs-theme="dark"]` (`mixins/_color-mode.scss:16-18`) and retunes `--bs-accordion-btn-icon` and `--bs-accordion-btn-active-icon` on `.accordion-button::after`. Reduced motion arrives only through `@include transition` on the button and the icon (`_accordion.scss:44`, `:67`).

**`nav`** (`_nav.scss`, about 197 lines). Selectors: `.nav`, `.nav-link` (`:hover`, `:focus`, `:focus-visible`, `.disabled`, `:disabled`), `.nav-tabs` and `.nav-link` / `.nav-link.active` / `.nav-item.show .nav-link` / `.dropdown-menu`, `.nav-pills` (`.nav-link.active`, `.show > .nav-link`), `.nav-underline` (same active and show pair), `.nav-fill`, `.nav-justified`, `.tab-content > .tab-pane`, `.tab-content > .active`. Custom properties: `--bs-nav-link-padding-x`, `-padding-y`, `-font-size`, `-font-weight`, `-color`, `-hover-color`, `-disabled-color` (`_nav.scss:7-14`); `--bs-nav-tabs-border-width`, `-border-color`, `-border-radius`, `-link-hover-border-color`, `-link-active-color`, `-link-active-bg`, `-link-active-border-color` (`:60-67`); `--bs-nav-pills-border-radius`, `-link-active-color`, `-link-active-bg` (`:106-109`); `--bs-nav-underline-gap`, `-border-width`, `-link-active-color` (`:129-132`). No keyframes, no at-rule in the partial, no `[data-bs-theme]`, no `/* rtl:` comment. `.nav-link` includes `transition` (`:33`). `.nav-tabs .dropdown-menu` (`:92-97`) pulls the menu up by the tab border and clears the top radius.

**`navbar`** (`_navbar.scss`, about 289 lines). Selectors: `.navbar`, the `%container-flex-properties` extend onto `> .container`, `> .container-fluid`, and breakpoint containers; `.navbar-brand`; `.navbar-nav` and `.nav-link.active` / `.show`; `.dropdown-menu`; `.navbar-text`; `.navbar-collapse`; `.navbar-toggler`; `.navbar-toggler-icon`; `.navbar-nav-scroll`; `.navbar-expand` with `navbar-expand-{infix}` inside `@include media-breakpoint-up`; `.navbar-light` (deprecated); `.navbar-dark` and `.navbar[data-bs-theme="dark"]`. Custom properties on `.navbar` (`_navbar.scss:8-27`): `--bs-navbar-padding-x`, `-padding-y`, `-color`, `-hover-color`, `-disabled-color`, `-active-color`, `-brand-padding-y`, `-brand-margin-end`, `-brand-font-size`, `-brand-color`, `-brand-hover-color`, `-nav-link-padding-x`, `-toggler-padding-y`, `-toggler-padding-x`, `-toggler-font-size`, `-toggler-icon-bg`, `-toggler-border-color`, `-toggler-border-radius`, `-toggler-focus-width`, `-toggler-transition`. `.navbar-nav` reassigns `--bs-nav-link-*` (`:88-94`). `--bs-scroll-height` is read, not declared (`:185`). No keyframes, no `/* rtl:` comment. Dark: the explicit `.navbar[data-bs-theme="dark"]` block (`:269-281`) retunes the eight `--bs-navbar-*` color and toggler variables; `@include color-mode(dark)` (`:283-288`) retunes `--bs-navbar-toggler-icon-bg` on `.navbar-toggler-icon`. Reduced motion via `@include transition` on `.navbar-toggler` (`:158`) and `.offcanvas` inside the expand loop (`:241`). `.navbar-nav .dropdown-menu` is `position: static` (`:110-112`) and `position: absolute` inside the expand breakpoint (`:206-208`). The comment at `:135-136` says the collapse is powered by the collapse JavaScript plugin.

**`dropdown`** (`_dropdown.scss`, about 250 lines). Selectors: `.dropup`, `.dropend`, `.dropdown`, `.dropstart`, `.dropup-center`, `.dropdown-center`; `.dropdown-toggle`; `.dropdown-menu` and `&[data-bs-popper]`; `.dropdown-menu{infix}-start` and `-end`; placement blocks for `.dropup`, `.dropend`, `.dropstart`; `.dropdown-divider`; `.dropdown-item` (`:hover`, `:focus`, `.active`, `:active`, `.disabled`, `:disabled`); `.dropdown-menu.show`; `.dropdown-header`; `.dropdown-item-text`; `.dropdown-menu-dark`. Custom properties (`:21-46` and the dark block `:237-248`): `--bs-dropdown-zindex`, `-min-width`, `-padding-x`, `-padding-y`, `-spacer`, `-font-size`, `-color`, `-bg`, `-border-color`, `-border-radius`, `-border-width`, `-inner-border-radius`, `-divider-bg`, `-divider-margin-y`, `-box-shadow`, `-link-color`, `-link-hover-color`, `-link-hover-bg`, `-link-active-color`, `-link-active-bg`, `-link-disabled-color`, `-item-padding-x`, `-item-padding-y`, `-header-color`, `-header-padding-x`, `-header-padding-y`. Also `--bs-position: start|end` (`:93`, `:102`), which the comment at `:84-86` says JavaScript reads. No keyframes, no `[data-bs-theme="dark"]` (dark is the `.dropdown-menu-dark` class), no `/* rtl:` comment, no `transition` include. At-rules: `@if $dropdown-padding-y == 0` (`:71`) and `@each` breakpoint plus `@include media-breakpoint-up` (`:88-110`). `.dropdown-toggle` (`:11-16`) is `white-space: nowrap` plus `@include caret()`. The caret mixin (`mixins/_caret.scss:29-68`) uses physical `margin-left` / `border-*` and has no `/* rtl:` comment. `$enable-caret` gates it.

**`.dropdown-toggle` and `.navbar` outside those partials.** `.navbar` rules are only in `_navbar.scss` (plus `@import "navbar"` in `bootstrap.scss:28`). Other partials that select `.dropdown-toggle`: `_button-group.scss:46-47` and `:133` (corner reset excludes the toggle; split toggle is a separate rule), `.dropdown-toggle-split` (`:75-98`), `.btn-group.show .dropdown-toggle` (`:103-110`); `forms/_input-group.scss:101-111` and `:123` (radius and margin exclusions). `_nav.scss:92` and `_navbar.scss:110` and `:206` restyle `.dropdown-menu`.

**Ledger binding** (`tests/setupServer.ts`). `OracleBinding` (`:163-170`) is `{ component, category, obligation, steps, events, predicate }`. `ORACLE_BINDINGS` (`:182`) currently has four entries, all `component: 'btn'`. One entry (`:183-196`): component `btn`, category `identity`, obligation text about `button` / `bs.button` / `.bs.button`, `events: []`, `steps: [/^button\./u]`, a predicate over `after.identity`. A new key adds further entries whose `component` is that key; the comment at `:174-176` says a named obligation must match a compatibility row, and an `obligation: undefined` entry answers for every unclaimed row of that component and category. `LAYER_COMPONENTS` (`:383-386`) is `{ elements: 'reboot', reset: 'reboot' }`. The comment at `:378-381` says every other layer is attributed by the classes its rules select, so a component key adds a row only when it is an element-treatment layer. `FORM_PARTIALS` (`:400-404`) maps `labels`, `form-text`, and `floating-labels` onto Veneer partial names. The comment at `:389-398` says a release partial omitted from the record keeps its own name, so a non-form key adds nothing. `LEDGER_INVENTORY` (`:458`) is an `OracleInventory`: `{ version, digests, components }`. One planted component, `btn` (`:462-493`), is `{ selectors, rules: [{ selector, condition, declarations: [{ property, value }] }], properties, keyframes }`. The planted keys are `btn`, `reboot`, and `table` (`LEDGER_SHIPPED`, `:528`). This fixture is the planted world named at `:422-425`, not the pinned upstream inventory.

**Guide rows.** Under `### Deferred selectors` (`guides/veneer.md:1704`), `readDeferrals` reads Name, Owner, Reason (`:1708`). Owner `Disclosure`, seven rows, each reason "The owning component supplies this relationship." (`:1729-1735`):

- `.btn-group > .btn.dropdown-toggle-split:first-child`
- `.btn-sm + .dropdown-toggle-split`
- `.btn-group-sm > .btn + .dropdown-toggle-split`
- `.btn-lg + .dropdown-toggle-split`
- `.btn-group-lg > .btn + .dropdown-toggle-split`
- `.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3)`
- `.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)`

No row has owner `Navigation`. `### Departures from the workspace rows` (`:1741`) is a bullet list about the styles axis configuration. It has no Owner column and no Disclosure or Navigation row. Prose outside those headings names the same owners: Disclosure owns the split toggle (`:852`, `:869`, `:1433`); Navigation owns `.nav-link` at the card-header-tabs sentence (`:1546`).

## B. Plugin obligations

Shared path: each class extends `BaseComponent` (`base-component.js:23`), which extends `Config` (`util/config.js:15`). Config merge order (`config.js:40-48`): `Default`, then `data-bs-config` JSON, then every `data-bs-*` attribute except `data-bs-config` (`manipulator.js:49-60`), then the constructor object. `EventHandler.trigger` builds `new Event(event, { bubbles, cancelable: true })` (`event-handler.js:282`). Completion goes through `_queueCallback` → `executeAfterTransition` (`base-component.js:49-50`, `util/index.js:229-255`): if waiting, listen for `transitionend` on that element, and after `getTransitionDurationFromElement` plus 5 ms (`util/index.js:47-67`, `:235`) dispatch a synthetic `transitionend` if the real one has not fired. `dispose` (`base-component.js:39-46`) removes the data key, removes events for `EVENT_KEY`, and nulls own properties. Data-API target resolution reads `data-bs-target`, else `href` (`selector-engine.js:11-29`).

| Obligation | Collapse `collapse.js` | Dropdown `dropdown.js` | Tab `tab.js` | ScrollSpy `scrollspy.js` |
| --- | --- | --- | --- | --- |
| Data read | `[data-bs-toggle="collapse"]` (`:43`); `parent` and `toggle` via the merge; target via `getSelectorFromElement` (`:69`) | `[data-bs-toggle="dropdown"]` (`:55`); config keys below; writes `data-bs-popper="static"` (`:314`) | `[data-bs-toggle="tab\|pill\|list"]` (`:48`); target via selector engine | `[data-bs-spy="scroll"]` (`:31`); config keys below |
| Defaults | `parent: null`, `toggle: true` (`:45-47`); types `(null\|element)`, `boolean` (`:50-53`). After merge, `toggle` is `Boolean(...)` and `parent` is `getElement` (`:212-215`) | `autoClose: true`, `boundary: 'clippingParents'`, `display: 'dynamic'`, `offset: [0, 2]`, `popperConfig: null`, `reference: 'toggle'` (`:71-78`); types `(boolean\|string)`, `(string\|element)`, `string`, `(array\|string\|function)`, `(null\|object\|function)`, `(string\|element\|object)` (`:80-87`) | No `Default` or `DefaultType`. Constructor takes the element only (`:58`) | `offset: null`, `rootMargin: '0px 0px -25%'`, `smoothScroll: false`, `target: null`, `threshold: [0.1, 0.5, 1]` (`:41-47`); types `(number\|null)`, `string`, `boolean`, `element`, `array` (`:49-55`). After merge, null target becomes `document.body`, a numeric `offset` replaces `rootMargin` with `` `${offset}px 0px -30%` ``, and a string `threshold` is split to numbers (`:113-122`) |
| Public methods | `toggle`, `show`, `hide` (`:103-205`). No `dispose` override | `toggle`, `show`, `hide`, `dispose`, `update` (`:120-184`); static `clearMenus`, `dataApiKeydownHandler` | `show` (`:80`) | `refresh`, `dispose` (`:92-110`) |
| Events | `show.bs.collapse`, `shown.bs.collapse`, `hide.bs.collapse`, `hidden.bs.collapse` (`:26-29`). Cancelable pre-change: `show` (`:129-131`) and `hide` (`:171-173`) | `show.bs.dropdown`, `shown.bs.dropdown`, `hide.bs.dropdown`, `hidden.bs.dropdown` (`:40-43`), each with `{ relatedTarget }`. Cancelable: `show` (`:133-136`) and `hide` (`:188-190`) | `hide.bs.tab`, `hidden.bs.tab`, `show.bs.tab`, `shown.bs.tab` (`:21-24`), with `relatedTarget`. Cancelable: `show` and `hide` (`:89-96`) | `activate.bs.scrollspy` with `{ relatedTarget: target }` (`:24`, `:233`). No cancelable pre-change event. Also a click listener name `click.bs.scrollspy` when `smoothScroll` is on (`:25`, `:133`) |
| Keys | None | `ArrowUp`, `ArrowDown`, `Escape` (`:34-37`, `:394-432`); `Tab` only as a reason not to close (`:357`, `:380`) | `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `Home`, `End` (`:29-34`, `:155-176`) | None |
| ARIA written | `aria-expanded` on triggers (`:251`); class `collapsed` toggled with it | `aria-expanded` `true` on show (`:152`), `'false'` on hide (`:207`) | `role=tablist` on the parent (`:188`); `role=presentation` on the outer element (`:202`); `role=tab`, `aria-selected`, `tabindex=-1` on the trigger (`:199-209`); `role=tabpanel`, `aria-labelledby` on the target (`:222-225`); `aria-expanded` on a dropdown parent (`:244`) | None. Adds and removes class `active` (`:230`, `:253-259`) |
| Focus | None | `this._element.focus()` on show (`:151`); menu item `.focus()` on arrows (`:336`); toggle `.focus()` on Escape (`:431`) | `nextActiveElement.focus({ preventScroll: true })` (`:174`); `element.blur()` on deactivate (`:136`) | None. `smoothScroll` calls `scrollTo({ behavior: 'smooth' })` or sets `scrollTop` (`:141-147`) |
| Transition end | `_queueCallback(complete, element, true)` on show and hide (`:162`, `:204`), so it always waits | None. Show and hide mutate classes and fire `shown` / `hidden` immediately | `_queueCallback` only when the element has class `fade` (`:127`, `:152`) | None |
| `dispose` | Inherited only | Destroys `_popper` if present, then `super.dispose()` (`:171-176`). Hide also destroys the popper (`:201-203`) | Inherited only | `this._observer.disconnect()`, then `super.dispose()` (`:107-109`) |

**Popper, from `dropdown.js`.** Import `* as Popper from '@popperjs/core'` (`:8`). `Popper.createPopper(reference, menu, config)` (`:241`). Placement (`:62-69`, `_getPlacement` `:248-275`): `top-start`/`top-end`/`bottom-start`/`bottom-end` swapped by `isRTL()`; `right-start`/`left-start` swapped the same way; `top` and `bottom` for the center classes; `--bs-position: end` selects the `*-end` placement. Modifiers (`:298-309`): `preventOverflow` with `boundary: this._config.boundary`, and `offset` with `offset: this._getOffset()`. In a navbar or when `display === 'static'`, modifiers become only `{ name: 'applyStyles', enabled: false }` (`:312-318`). `popperConfig` is spread over that object (`:321-324`). `autoClose` (`:72`, `clearMenus` `:356-391`): `false` never closes; `'inside'` skips a click outside the menu; `'outside'` skips a click inside the menu; otherwise a click on the toggle is skipped, and Tab or a form control inside the menu does not close it. `reference` (`:77`, `:230-238`): `'toggle'` (the element), `'parent'`, an element, or an object with `getBoundingClientRect`.

**IntersectionObserver, from `scrollspy.js:152-159`.** `root` is the element when its computed `overflowY` is not `visible`, otherwise `null` (`:68`). `rootMargin` default `'0px 0px -25%'` (`:43`). `threshold` default `[0.1, 0.5, 1]` (`:46`). The callback (`:163-198`) activates the intersecting section with the greater `offsetTop` when scrolling down, and the smaller when scrolling up.

**Where the tree records this.** `guides/veneer.md` `## Surface` (`:64-68`) names Collapse as the first cancelable pre-change component and says `emitEvent` cannot express one. The compatibility table's `engine` rows (`:3938-3958`) record the shared Bootstrap engine: data-attribute merge, `dispose`, `_queueCallback`, paired events with `cancelable: true`, the 5 ms transition emulation, and the selector and data helpers. The paragraph at `:3960-3966` says an accepted row records scope, and that transition, dismissal, sanitizer, and selector rows do not claim Button fires transition events. `:3971-3974` excludes the jQuery interface and says Popper pass-through options remain accepted wire keys with platform anchoring as an accepted difference. No compatibility row names Collapse, Dropdown, Tab, or ScrollSpy. `ROADMAP.md` `### The family queue` (`:304-305`) names the four plugin obligations and the seven keys. `tests/` matches for those names are the word "plugin" on Vite, PostCSS, and policy, or "Table" / keyboard Tab. No test file names the four plugins.

## C. Shipped engine

Shapes in `src/browser/types.ts`: `ColorModeOptions` (`:5-10`) is optional `root` and `storage`. `ColorModeInterface` (`:13-24`) is `root`, `mode`, `apply`, `toggle`, `destroy`. `ButtonDetail` (`:27-29`) is `{ pressed: boolean }`. `ButtonEventMap` (`:32-34`) is `{ toggle: CustomEvent<ButtonDetail> }`. `ButtonHooks` (`:37-39`) is optional `toggle`. `ButtonOptions` (`:42-45`) is optional `on: ButtonHooks`. `ButtonInterface` (`:48-57`) is `host`, `pressed`, `toggle(): boolean`, `destroy()`. `DelegateOptions` (`:60-63`) is optional `root: ParentNode`. `DelegateInterface` (`:66-70`) is `root` and `destroy()`.

`emitEvent` (`helpers.ts:17-19`) dispatches `new CustomEvent(type, { bubbles: true, cancelable: false, detail })`. `bindEventMap` (`:33-48`) subscribes `hooks.toggle` to `BUTTON_TOGGLE` with `{ signal }` after `isButtonEvent`.

Guards in `validators.ts`: `isColorModeState` (`:19`) is `literalOf('light', 'dark')`; `isButtonHost` (`:36-38`) is `isInstance(value, HTMLElement)`; `isButtonEvent` (`:57-69`) checks `instanceof CustomEvent` and a boolean `detail.pressed`.

`Button` (`Button.ts:21-85`): construction checks `isButtonHost`, refuses a second live owner via a `WeakSet`, snapshots `active` membership, whether `class` was present, and `aria-pressed`, then `bindEventMap` on an `AbortController` signal. `toggle` returns the live `pressed` after abort; otherwise toggles `active`, writes `aria-pressed`, and `emitEvent`. `destroy` aborts, restores the snapshot, removes `class` when it was absent and the list is empty, restores or removes `aria-pressed`, and drops the host from the set.

`Delegate` (`Delegate.ts:21-74`): construction defaults `root` to `document` and listens for `click` with the abort signal. `destroy` aborts, calls `destroy` on every owned `Button`, and replaces the map. `#activate` destroys owned buttons no longer contained by the root, finds `event.target.closest(BUTTON_SELECTOR)`, `preventDefault`, constructs `new Button(host)` unless the host is already owned (`BUTTON_HOST_OWNED` returns), and calls `toggle`.

The ruling paragraph (`ROADMAP.md:143-151`), whole:

> Build every entity on explicit construction, opt-in delegation, typed contracts, ownership with restore-on-destroy, abort-driven cleanup, and a side-effect-free import. Adopt the cancelable pre-change event beside the completed one, a shared focus primitive, native-first disclosure and placement proved on captures, reduced-motion gating in script, `IntersectionObserver` for Scrollspy, and completion read from the actual transition. Refuse `@vue/reactivity`, the factory idiom, the fixed transition fallback, position-based bare-tag rules, the Tailwind `!important` workaround, and post-`destroy` mutation. Land each mechanism with its first consumer: `emitEvent`, `bindEventMap`, and `Delegate` stay Button-shaped and the guide records that until the first cancelable-event component moves them.

Guide `## Surface` (`guides/veneer.md:64-68`): `emitEvent` is bubbling and non-cancelable and cannot express a cancelable event; `bindEventMap` and `Delegate` are shaped around Button; they stay that shape until a second component needs them; B-COLLAPSE generalizes them because Collapse is the first component with a cancelable pre-change event. `## Methods` (`:70-93`) tables `ColorModeInterface`, `ButtonInterface`, and `DelegateInterface` only. Those summaries match the types above.

Proofs run in the `src:browser` project (`vite.config.ts:149-159`): include `tests/src/browser/**/*.test.ts`, setup `tests/setup.ts` and `tests/setupBrowser.ts`, Playwright Chromium. The browser tsconfig is `configs/src/tsconfig.browser.json` (DOM libs), referenced from `configs/src/vite.browser.config.ts:11`. `Button.test.ts` builds real elements with `build` from `@orkestrel/test/browser` (`:6`, `:12`), records with `createRecorder` and `recordEvents` (`:108-138`), asserts `bubbles`, `cancelable: false`, and `defaultPrevented: false` after `preventDefault` (`:138-139`), and passes `{ on: { toggle } }` (`:125`). `Delegate.test.ts` uses `mount` and `build` (`:8-16`) and asserts `preventDefault`, class and `aria-pressed`, reuse, and restore on `destroy` (`:21-36`).

`@orkestrel/contract` in the engine: `isInstance` in `src/core/errors.ts:1` and `src/browser/validators.ts:3`; type `Guard` and `literalOf` in `validators.ts:2-3`. `attempt` appears in `Button.test.ts`, not in `src/`.

## D. Elements and Mailbox

Elements has no `useCollapse`, `useDropdown`, or `useScrollSpy`. The matching factories are `createDetails`, `createMenu`, `createTabs`, `createNav`, `createPopover`, `createFocus`. Mailbox has `createCollapse`, `createDropdown`, `createTab`, `createScrollSpy`, `createPopover`, `createFocus`, and `createDetails`. Both trees' composables are adapters that call `instance.destroy()` (for example `elements/.../useDetails.ts:36`, `mailbox/.../useCollapse.ts:32`, `useScrollSpy.ts:7`). Both factories import `@vue/reactivity`.

| Site | What it does | Covers |
| --- | --- | --- |
| `mailbox/.../factories/createCollapse.ts:42-68` | `dispatch` of `mailbox:collapse:show` (`constants.ts:139-144`) must return true or `show` returns; then height `0` → `scrollHeight`, classes `collapsing` / `collapse` / `show` | lifecycle, cancellation |
| `createCollapse.ts:36-40` and `:104-113` | `cancelTransition` drops the in-flight callback; `destroy` unbinds, `scope.stop()`, cancels, clears classes and inline height | cancellation, cleanup |
| `mailbox/.../helpers.ts:150-173` | `runTransition` listens for `transitionend` on that element and also `setTimeout(finish, fallbackMs)` | motion |
| `elements/.../factories/createDetails.ts:95-118` | Native `<details>`. `elements:details:hide` / `show` (`constants.ts:390`); a prevented summary click calls `preventDefault` so the platform does not toggle | lifecycle, cancellation |
| `elements/.../factories/createMenu.ts:86-163` | Menu over the popover factory; `preventDefault` on toggle; `aria-expanded` / `aria-haspopup="menu"`; arrow keys call `.focus()` on items | lifecycle, focus, cleanup (`:188` removes the ARIA) |
| `mailbox/.../factories/createDropdown.ts:20` and `:56-147` | Same shape: cancelable show/hide, `aria-expanded`, roving `.focus()`, `aria-haspopup` restored on destroy (`:178-184`). Placement option; a comment at `:56` says the flip threshold writes `--bs-dropdown-flip` | lifecycle, cancellation, focus, cleanup |
| `elements/.../factories/createPopover.ts:26-135` and `:194-206` | Placement is CSS `position-area` on a `popover="manual"` panel, not Popper. `aria-expanded` tracks visibility; prior ARIA is restored (`:340-348`) | placement, lifecycle, cleanup |
| `mailbox/.../factories/createPopover.ts:62-141` and `:210-223` | Same popover lifecycle; placement applies classes (`applyPopoverClasses`) rather than anchor `position-area` | placement, lifecycle |
| `elements/.../factories/createTabs.ts:11-24` and `:88-127` | Active state is `aria-selected`; pane uses `[hidden]`; the comment says it does not wait for `transitionend`. `preventDefault` on click | lifecycle, cancellation. Motion is explicitly not waited on |
| `mailbox/.../factories/createTab.ts:111-208` | `aria-selected`, `aria-controls`, keyboard including Home/End, `target.focus()`, `preventDefault` | lifecycle, focus, cancellation |
| `elements/.../factories/createNav.ts:13-18` and `:55-88` | `IntersectionObserver`. Defaults `DEFAULT_NAV_OFFSET_PX = 10`, `DEFAULT_NAV_THRESHOLD = 0.1` (`constants.ts:60-61`). `rootMargin` is `` `-${offset}px 0px 0px 0px` `` unless `margin` is passed. Writes `aria-current="location"`, not `.active` | scroll tracking |
| `createNav.ts:96-108` | `destroy` disconnects the observer and removes `aria-current` | cleanup |
| `mailbox/.../factories/createScrollSpy.ts:17-72` | Same observer shape. Defaults `DEFAULT_SCROLLSPY_OFFSET_PX = 10`, `DEFAULT_SCROLLSPY_THRESHOLD = 0.1` (`constants.ts:24-25`). Writes both `.active` and `aria-current="location"` (`:45-47`). `destroy` (`:100-107`) disconnects and clears both | scroll tracking, cleanup |
| `elements/.../factories/createFocus.ts:58-82` and the Mailbox twin | Tab wrap: `preventDefault` and focus first or last; deactivate restores the previous focus | focus, cleanup |
| `elements/.../helpers.ts:1592-1615` | Same `transitionend` plus timeout fallback as Mailbox | motion |

Neither collapse, dropdown, tab, nor scroll-spy factory calls `matchMedia('(prefers-reduced-motion: reduce)')`. Mailbox does that in `createDrag.ts:323` and `createCarousel.ts:181`.

Tenets (`ROADMAP.md:23-24` and `:29-30`), the two paragraphs:

> Build the interaction engine from the useful mechanisms and lessons in Mailbox and Elements. Do not use Bootstrap JavaScript to implement Veneer or to make its demonstrations pass. Compatibility describes the behavior consumers receive; it does not authorize a dependency on Bootstrap's implementation.

> Keep framework integration outside the engine. Make the engine usable without Vue or another framework. Provide Vue compatibility through an adapter over the owned engine, without making Vue a Veneer runtime dependency. Inspect Mailbox and Elements rather than assuming their existing implementations already meet this boundary.

`/home/user/elements/guides` has 33 files, including `components.md`, `composables.md`, `styles.md`, `surfaces.md`, `elements.md`. Rulings that name this family's appearance or motion: `styles.md` rule 6 (`:129`) says a disclosure is `<details>` and names `useDetails` and `useMenu`; rule 7 (`:131`, `:185`) pairs every `transition` with `prefers-reduced-motion` through `@include transition`. `elements.md` (`:32`, `:57`, `:170`, `:209`, `:256`) puts `<details>` and `<summary>` in a `disclosure` group whose token is `transition-duration`. `components.md:13` says `<details>` is an accordion item; the `_menu.scss` row (`:48`) is the dropdown column. `surfaces.md:115-123` paints `<menu popover>` from `--set-popover-*` and says it only arranges rows; `:147` names `position-visibility: anchors-visible`; `:318` says the shared `transition()` mixin collapses view-transition duration under reduced motion.

## E. Shipped styles pattern

`_pagination.scss` (about 129 lines) opens `@use '../mixins' as *;` (`:1`), declares `$sizes` (`:5-8`), and writes inside `@layer components` starting `:10`. `.page-link` includes `transition` (`:56`). The barrel `@use` order (`src/styles/index.scss:1-73`) is `tokens`, `theme`, `reset`, the `elements/*` list through `button`, then `components/button` as `button-component`, `type`, `list`, `quote`, `image`, `link`, `container`, `grid`, `table` as `table-component`, `icon-link`, `ratio`, `vr`, `form-label`, `form-control`, `form-select`, `form-check`, `form-range`, `form-floating`, `input-group`, `validation`, `pagination`, `button-group`, `progress` as `progress-component`, `spinner`, `placeholder`, `card`, `list-group`, `breadcrumb`, `badge`, `close`, `utilities/gap`.

`PaginationSection` (`app/browser/sections/PaginationSection.ts:12-18`) extends `SpecimenSection` with `PAGINATION_COPY` and `PAGINATION_SPECIMENS`. Copy (`constants.ts:754-758`) names the region `Pagination`. Specimens start `:770`. `Showcase` constructs it (`Showcase.ts:100`) after `ValidationSection` and before `ButtonGroupSection`.

`CASCADE_KEYS` (`tests/setup.ts:381`) rows for pagination (`:460-488`): subjects `Page strip`, `Active page`, `Disabled page`, `Small pagination`, `Large pagination`, each with a scenario, subject, selector, and property. Those subjects are members of `CaptureSubject` (`:118`, `:186`). `DRIVEN_KEYS` (`:1087`) adds `page-strip-hover` and `page-strip-focus` on subject `Page strip` (`:1094-1095`). `FRAMES` in the journey is `new FrameManager(PORTFOLIO)` (`tests/app/browser/integration.test.ts:122`). The hover and focus cases call `FRAMES.page('page-strip-hover', strip)` and `FRAMES.page('page-strip-focus', strip)` (`:835`, `:861`).

Guide `### Pagination classes` (`guides/veneer.md:778`). The `#### pagination` table header and first row (`:3274-3276`):

`| Component | Selector | Property | Condition | Bootstrap 5.3.8 | Veneer | Departure |`

`| pagination | .pagination | --bs-pagination-padding-x | — | 0.75rem | var(--vn-space-6) | tokenized |`

`### Departures` row shape is that seven-column table (`:2234-2257`). `### Additions` (`:3569`) is `| Component | Name | Condition | Category | Reason |`. One pagination addition (`:3745`): `.page-link:focus { outline }` under `@media (forced-colors: active)`, category `declaration`.

`driveTraversal` is not called in this repository. The journey comment (`integration.test.ts:994`) says the installed walk stops at the first element it reaches twice, so the range case focuses the preceding control and uses `pressKeys('{Tab}')`, then `traverseAccessible`. Button driven scenarios exist: `primary-focus`, `primary-hover`, `primary-active`, `toggle-pressed` (`tests/setup.ts:1088-1091`), photographed at `integration.test.ts:381`, `:517`, `:551`, `:601`. No registered scenario is named `open`, `expanded`, or `show`. The only `scenario:` match for those substrings is `showcase` (`tests/setup.ts:319`).

## F. Rulings that bind the family

Exit criterion (`ROADMAP.md:234-243`):

> 3. Baseline coverage: every key the pinned record carries ends `shipped`, deferred with an owner, or excluded with a reason the user has seen, engine obligations included, under the same gates.

> 4. Owned engine: every interactive contract works without Bootstrap JavaScript or another forbidden runtime, with lifecycle, cancellation, focus, motion, and cleanup proved per component.

> 7. Rendered acceptance: every shipped key carries captures at its states and variants under one frame grammar, ruled through the polish skill.

`§ Carriers` rows that name the family (`:365`, `:412`, `:414`), each one table line:

- "Container and navigation combinators while navigation stays deferred" → "the Navbar unit of B-COLLAPSE … B-SCROLLSPY closes their behaviour; F5 classified them (landed)".
- "`emitEvent`, `bindEventMap`, and `Delegate` are Button-shaped (audit claim 24)" → "B-COLLAPSE moves all three (F6 FOUNDATION recorded the shape, `04114c5`)".
- "Audit claim 4: delegated release on host removal happens only on the next click that reaches the root" → "B-COLLAPSE rules release-on-removal (F4 HOST-OBSERVATIONS recorded the present semantics, `af673cb`)".

The phases row (`:281`) is not a Carriers row: role "`opus` on Opus 5.5, one unit per component", depends on B-FORMS, closes "the disclosure and navigation family; the cancelable event, the entity-neutral binder, and the generalized delegation land with Collapse". `E-VUE` (`:287`) depends on B-COLLAPSE. The queue bullet is `:304-305`.

`§ Rulings` bullets that name the engine, Popper, `IntersectionObserver`, focus, or motion are the construction bullet quoted in C (`:143-151`), the Elements motion-token sentence (`:131-133`: take motion tokens from rendered specimens when the identity phase opens), the `Delegate` data-API bullet (`:100-101`), and the D4 bullet (`:158-159`). Popper is not named in `§ Rulings`. The product tenet (`:26-27`) forbids Popper as a runtime package. D5 (`:160-161`) removes right-to-left support.

`decisions-round-2.md` decisions that name the interaction engine or Delegate: **D4** (`:35-39`), whole: the refusal of `disabled`, `.disabled`, and `aria-disabled="true"` hosts is a Veneer addition over Bootstrap's data API; remove it, match Bootstrap, and record no departure. Carrier: F6 FOUNDATION (the engine change and the Delegate proofs), with the guide's engine rows. **D6** (`:53`) names the class `.collapse` in the Tailwind shared-name list, not the plugin. The routing paragraph (`:82`) and **D13** (`:127`) use "engine" for the audit and implementation models, not the interaction engine. No decision in that file names Dropdown, Tab, ScrollSpy, or an interactive component of this family.

`§ Standing conditions` rows a writer of any unit in this checkout hits (`:210-223`): the npm 11 binary versus the host's npm 10.9.7; Chromium 141 receipts and detached-event `target` clearing; the `codex exec` sandbox rows; the Cursor shell allowlisted to `ls`; `scaffold repair` restoring `tests/setupPolicy.ts` and `tests/policy.test.ts`, which are off-limits; the policy sweep of every authored Markdown file against `writing.md` `§ Substitutions`; the `BOOTSTRAP_VERSION` pin; the mirror law that a `tests/{app,src}/**/*.test.ts` file other than `integration.test.ts` must name a sibling module under `src/` or `app/`.

## G. Sizing

Approximate line counts from the reads:

| File | Lines |
| --- | --- |
| `_transitions.scss` | 27 |
| `_accordion.scss` | 153 |
| `_nav.scss` | 197 |
| `_navbar.scss` | 289 |
| `_dropdown.scss` | 250 |
| `collapse.js` | 298 |
| `dropdown.js` | 456 |
| `tab.js` | 316 |
| `scrollspy.js` | 297 |
| `base-component.js` | 87 |
| `util/config.js` | 65 |
| `util/index.js` | 307 |
| `dom/event-handler.js` | 318 |
| `dom/selector-engine.js` | 127 |
| `dom/manipulator.js` | 71 |
| `dom/data.js` | 56 |
| `_pagination.scss` | 129 |
| `_button-group.scss` | 95 |
| `PaginationSection.ts` | 21 |
| `ButtonGroupSection.ts` | 21 |
| `pagination.test.ts` | 395 |
| `button-group.test.ts` | 512 |
| `PaginationSection.test.ts` | 94 |
| `ButtonGroupSection.test.ts` | 190 |
| `Button.ts` | 85 |
| `Delegate.ts` | 75 |
| `Button.test.ts` | 294 |
| `Delegate.test.ts` | 402 |

## H. Files the family makes false

Enumerating assertions over shipped keys or the engine surface:

- `src/styles/index.scss:63` is `@use 'components/pagination'`. The file does not contain the string `btn-group`; the group partial is `@use 'components/button-group'` (`:64`).
- `tests/conformance.test.ts:98-155` is a closed array of shipped component names including `'btn-group'` (`:104`) and `'pagination'` (`:141`), compared to `collectShippedComponents` (`:159`).
- `tests/setupServer.test.ts:1337` onward expects the same kind of set, including `'btn-group'` (`:1344`) and `'pagination'` (`:1382`), for rows whose Proof cell is a dash.
- `tests/setupStyles.ts:3104` and `:3267` name `'pagination'` and `'btn-group'` in case tables. `tests/setupStyles.test.ts:1002` reads `oracle.components['btn-group'].selectors`.
- `tests/src/styles/components/button-group.test.ts` repeats `'btn-group'` and `'btn-group-vertical'` in `it.each` (`:208` and following). `pagination.test.ts:66` compares a specimen name to `'pagination'`.
- `app/browser/Showcase.ts:92-114` constructs a fixed section list including `PaginationSection` and `ButtonGroupSection`. `tests/app/browser/Showcase.test.ts:87-114` expects that region's `aria-label` list, including `'Pagination'` and `'Button group'`.
- `guides/veneer.md` `### Files` (`:182`) enumerates partials, including `_pagination.scss` (`:218`) and `_button-group.scss` (`:205`). `## Showcase` (`:3977`) enumerates regions in prose and does not name Pagination, Button group, Card, or List group, while the test and `Showcase.ts` do. `## Surface` (`:10-40`) and `## Methods` (`:74-93`) enumerate only the current engine exports.
- `src/browser/index.ts:1-7` re-exports `types`, `constants`, `helpers`, `validators`, `ColorMode`, `Button`, `Delegate`. `tests/src/browser/index.test.ts:11-25` asserts that exact sorted name list, including `Button`, `Delegate`, `bindEventMap`, `emitEvent`, and the three guards.

`tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored (`ROADMAP.md:220`). `setupPolicy.ts` `inspectPolicyProse` (`:2033`) runs `textToPolicyHits` (`:2047`) over authored Markdown after fences, spans, `{@link}`-style tags, and URLs are stripped (`configs/policy.ts:270-271`, `:706-716`). A banned term is one from `writing.md` `§ Substitutions` (`:83`), such as `should`. `inspectSkillImports` (`setupPolicy.ts:1305`) reports an `@orkestrel/` import inside a Markdown fence that is not an installed declaration export. `policy.test.ts` imports `POLICY_BANNED_TERMS` (`:4`) and loops `PROSE_POLICY_CONTROLS` (`:650`), including a planted banned term in the package guide. The TSDoc voice rule is `VOICE_RULE` in `configs/policy.ts:1337-1347`: an export doc block must open on a third-person verb ending in `s`, and the first sentence must not name the symbol. `policy.test.ts` does not mention that rule. The `{@link}` comparison the documentation rule names is `findDrift` in `tests/guides.test.ts` (`documentation.md:35-39` in the scaffold writing rules), which treats a `{@link}` as its target's code token.

## Contradictions

- `emitEvent` is `cancelable: false` (`helpers.ts:18`). The guide says it cannot express a cancelable event (`guides/veneer.md:64-68`). The compatibility `engine` event rows (`:3946-3947`) record Bootstrap's `cancelable: true` as accepted scope. The paragraph at `:3965` says those rows do not claim Button fires transition events.
- `§ Standing conditions` (`ROADMAP.md:215`) still says the registry serves `@orkestrel/test` `0.0.19` and to keep `holdOraclePointer` until F9. The T3 row at `7b66db2` says the registry serves `0.0.20` and F9 re-pinned it. `package.json:102` is `"@orkestrel/test": "^0.0.20"`. The Carriers row for audit claim 17 (`:425`) says F9 deleted the local copies.
- `## Showcase` prose does not list the Pagination region. `Showcase.ts:100` mounts it, and `Showcase.test.ts:97` expects the label `Pagination`.
- The construction ruling refuses `@vue/reactivity` and the fixed transition fallback (`ROADMAP.md:147-148`). Mailbox `createCollapse` imports `@vue/reactivity` and finishes through `runTransition`'s timeout (`helpers.ts:168`). Elements `createPopover` places with CSS anchor positioning; Bootstrap dropdown places with Popper. The guide already calls platform anchoring an accepted difference (`guides/veneer.md:3973`).
- `scrollspy` is a family key (`ROADMAP.md:305`) and has no SCSS. Tab is a plugin obligation and is not one of the seven keys; its CSS is in `_nav.scss` (`.nav-tabs`, `.tab-content`).
- Disclosure has deferred selector rows. Navigation has none, while the card prose (`guides/veneer.md:1546`) says `.nav-link` is Navigation's class.

## Unresolved inputs

- Whether the pinned inventory at `tests/fixtures/oracle/inventory.json` already has entries for these seven keys. This reading used `ORACLE_BINDINGS`, `LAYER_COMPONENTS`, `FORM_PARTIALS`, and `LEDGER_INVENTORY` only. The planted inventory does not contain them.
- CLOSE-GUIDE has not landed. `guides/veneer.md` is still the file cited above. The HEAD move did not touch it.
- No compatibility row states the per-plugin obligations. The `engine` rows state the shared Bootstrap machinery as accepted scope.
- Elements' guides rule native `<details>`, `<menu popover>`, and `<nav>` appearance. They do not rule Bootstrap's `.accordion`, `.dropdown`, `.navbar`, or `.nav-tabs` appearance. The roadmap puts that ruling at E-IDENTITY, after this family.
- `driveTraversal` is named only in a comment. The opened or closed state has no registered capture scenario.

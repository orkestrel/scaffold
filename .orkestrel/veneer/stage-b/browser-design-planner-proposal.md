# Browser engine design: planner proposal

This is the planner lane's proposal: subjective (API shape, vocabulary, architecture, and the unit plan), written blind to the analyst lane. Every Bootstrap fact cites the distillate as `D:line` (`tmp/units/browser-engine-distillate.md`) or the source, every CSS fact cites `node_modules/bootstrap/dist/css/bootstrap.css:line` as `css:line`, and every measurement is named `[m: entry]` from `tmp/units/browser-feasibility-measurements.json`.

**The recommendation:**
- One `Engine` per document owns the data API, the registry of instances, and a single correction stylesheet.
- There is one implementation class per component, plus shared mechanics classes.
- Events use Bootstrap's own names and properties only.
- Native mechanisms are adopted only where they keep Bootstrap's markup, class, and event contract:
  - floating parts (dropdown menu, tooltip, popover) use the Popover API with anchor positioning;
  - `<dialog>` is used only when the author writes `<dialog class="modal">`;
  - transition completion uses `getAnimations()`;
  - scroll lock uses `scrollbar-gutter`.
- Everything else keeps Bootstrap's mechanism.

## Contract

### Shape

**Engine and accessors.**
- `src/browser` publishes one constructible class, `Engine`, bound to one `Document`.
- It has twelve one-word accessor methods named after Bootstrap's `NAME` values (D:11). Each one gets or creates the single instance for an element, as Bootstrap's registry does (one instance per element and name, `dom/data.js:15-30`, D:9).
- `options` apply only when the instance is created. An existing instance keeps its config, as Bootstrap's does (D:187).

**Components.**
- Tooltip and popover share one implementation, `Tip`, driven by a frozen profile, because Bootstrap's `Popover` is a `Tooltip` with different defaults and slots (D:540-542).
- Component classes are internal: their constructors take a context only the engine produces. They go in the parity `INTERNAL` list, per `scaffold/.claude/rules/architecture.md:271-276`.
- The public surface is the interfaces in this fence.

The shared slice lands in U1, and each family unit adds its own slice (§ Units):

```ts
export type ComponentName =
	| 'alert' | 'button' | 'carousel' | 'collapse' | 'dropdown' | 'modal'
	| 'offcanvas' | 'popover' | 'scrollspy' | 'tab' | 'toast' | 'tooltip'
export type Placement =
	| 'auto' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
	| 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
export type SlideDirection = 'left' | 'right'

/** Mirrors the properties Bootstrap's `hydrateObj` copies onto an event (event-handler.js:300-314). */
export interface EventDetail {
	readonly relatedTarget?: Element
	readonly direction?: SlideDirection
	readonly from?: number
	readonly to?: number
	readonly clickEvent?: MouseEvent
}
export interface RelatedDetail { readonly relatedTarget?: Element }
export interface SlideDetail { readonly relatedTarget: Element; readonly direction: SlideDirection; readonly from: number; readonly to: number }
export interface MenuDetail { readonly relatedTarget: Element; readonly clickEvent?: MouseEvent }
export type ComponentEvent<TDetail extends EventDetail = EventDetail> = CustomEvent<TDetail> & Readonly<TDetail>
export type ComponentHooks<TMap> = { readonly [K in keyof TMap]?: (event: TMap[K]) => void }

export interface ComponentInterface { readonly element: Element; destroy(): void }
export interface AlertInterface extends ComponentInterface { close(): void }
export interface ButtonInterface extends ComponentInterface { readonly active: boolean; toggle(): void }
export interface CarouselInterface extends ComponentInterface {
	readonly index: number; readonly cycling: boolean; readonly transitioning: boolean
	next(): void; previous(): void; to(index: number): void; start(): void; pause(): void
}
export interface CollapseInterface extends ComponentInterface {
	readonly shown: boolean; readonly transitioning: boolean; show(): void; hide(): void; toggle(): void
}
export interface DropdownInterface extends ComponentInterface {
	readonly menu: HTMLElement; readonly shown: boolean; readonly placement: Placement | undefined
	show(): void; hide(): void; toggle(): void; update(): void
}
export interface ModalInterface extends ComponentInterface {
	readonly shown: boolean; readonly transitioning: boolean
	show(related?: Element): void; hide(): void; toggle(related?: Element): void
}
export interface OffcanvasInterface extends ComponentInterface {
	readonly shown: boolean; show(related?: Element): void; hide(): void; toggle(related?: Element): void
}
export interface TipContent { readonly title?: string | Element; readonly content?: string | Element }
export interface TipInterface extends ComponentInterface {
	readonly tip: HTMLElement | undefined; readonly shown: boolean; readonly enabled: boolean
	readonly placement: Placement | undefined
	show(): void; hide(): void; toggle(): void; enable(): void; disable(): void; update(): void
	write(content: TipContent): void
}
export interface ScrollspyInterface extends ComponentInterface { readonly link: HTMLAnchorElement | undefined; refresh(): void }
export interface TabInterface extends ComponentInterface { readonly active: boolean; show(): void }
export interface ToastInterface extends ComponentInterface { readonly shown: boolean; show(): void; hide(): void }

export interface EngineInterface {
	start(): void
	destroy(): void
	alert(element: Element, options?: AlertOptions): AlertInterface
	button(element: Element): ButtonInterface
	carousel(element: Element, options?: CarouselOptions): CarouselInterface
	collapse(element: Element, options?: CollapseOptions): CollapseInterface
	dropdown(element: Element, options?: DropdownOptions): DropdownInterface
	modal(element: Element, options?: ModalOptions): ModalInterface
	offcanvas(element: Element, options?: OffcanvasOptions): OffcanvasInterface
	popover(element: Element, options?: TipOptions): TipInterface
	scrollspy(element: Element, options?: ScrollspyOptions): ScrollspyInterface
	tab(element: Element, options?: TabOptions): TabInterface
	toast(element: Element, options?: ToastOptions): ToastInterface
	tooltip(element: Element, options?: TipOptions): TipInterface
}
```

### State the Vue surface reads

Every readonly property is derived on read, and none is stored. The state lives in the DOM classes Bootstrap's own guards read:
- `shown` is class `show` (D:43).
- `active` is class `active` (`button.js:38`, D:559).
- `placement` is the `data-popper-placement` attribute.
- `transitioning` and `cycling` are derived from whether an in-flight `AbortController` exists, or an interval id for `cycling`.

A composable wraps an instance by listening to its events and re-reading these getters, which is ruling 5's "plain state and methods".

### Vocabulary decisions

Bootstrap's verbs were renamed where the fixed vocabulary or one-word rule required it:
- `dispose` → `destroy` (fixed vocabulary, `scaffold/.claude/rules/names.md:218-232`).
- Carousel `cycle` → `start`. `prev` → `previous` (names.md rejects abbreviations).
- `isShown()` → the `shown` getter.
- Tooltip `setContent` → `write(content)`. `toggleEnabled` is dropped; a caller writes `enabled ? disable() : enable()`.
- Modal `handleUpdate` is dropped, because the gutter scroll lock removes `_adjustDialog` (§ Shared mechanics, scroll lock).

### Exceptions to one-word members

Every other member is one word. These exceptions are external wording kept under `names.md:120` (a member that transliterates an external field keeps its wording, and its TSDoc names the source):
- **Option keys `autoClose`, `customClass`, `fallbackPlacements`, `allowList`, `sanitizeFn`, `rootMargin`, `smoothScroll`.** One word cannot carry them because `data-bs-config` JSON is part of the markup contract (`util/config.js:40-48`, D:29). A page writing `data-bs-config='{"autoClose":"outside"}'` must work without edits. That requires option keys equal to Bootstrap's config keys; a one-word rename would need a translation table that the JSON format cannot see.
- **Event keys `hidePrevented`, `shown`, `hidden`, `closed`, `slid`, `inserted`.** They are Bootstrap's event verbs (D:111, D:221, D:378-380, D:526, D:726).
- **Event properties `relatedTarget` and `clickEvent`.** They are Bootstrap's hydrated property names (D:297-299).

### Options

Options use Bootstrap's flat config keys plus the reserved `on` hook map (`scaffold/.claude/rules/patterns.md:27`):
- `ModalOptions { backdrop?: boolean | 'static'; focus?: boolean; keyboard?: boolean; on?: ComponentHooks<ModalEventMap> }`.
- The other components follow the key tables at D:182-185, D:272-279, D:352-356, D:430-434, D:502-520, D:635-639, D:705-712, and D:777-783.

The engine refuses these keys, and the guide names each refusal:
- Popper-only keys: `boundary`, `popperConfig` (D:275, D:278, D:505, D:513).
- Function-valued forms of `offset`, `placement`, `title`, `content`, and `customClass`, which are JavaScript API (D:277, D:512, D:516).

Config merges in Bootstrap's order: defaults, then `data-bs-config` when it is an object, then the `data-bs-*` dataset keys, then `options` (D:29). Two exceptions:
- Tip skips `data-bs-config` and strips `allowList`, `sanitize`, and `sanitizeFn` from attributes (D:522).
- Each value is coerced by a `parseDatum` parser that mirrors `normalizeData` (D:31), then checked per key with `@orkestrel/contract` guards.

Bootstrap throws a `TypeError` on a mistyped value (D:33). The engine reads it as absent, so the default applies. This is a guide departure, and only a page that is already broken sees it.

### Event contract

**Names and shape.**
- The engine dispatches only Bootstrap's own names: `<verb>.bs.<component>`, bubbling, `cancelable: true` on every event (`event-handler.js:282`, D:19).
- It dispatches them from the same host element Bootstrap uses:
  - the dropdown toggle (`dropdown.js:129-133`);
  - the tooltip and popover trigger (D:526);
  - each tab element (D:588).
- The event is a `CustomEvent` whose `detail` is the payload. The payload's keys are also defined as own properties on the event, as `hydrateObj` does (D:19). A drop-in listener reading `event.relatedTarget` or `event.to` keeps working.
- This is the DOM variant of `patterns.md:92-100`: the shared helpers `emitEvent`, `bindEventMap`, and `on` bound through `bindEventMap`.

**Departures named in the guide.**
- No jQuery mirror (D:19, ruling 3).
- No emulated untrusted `transitionend` dispatches, which Bootstrap's fallback timer produces (`util/index.js:251-255`; untrusted events recorded in [m: bootstrap-oracle]).

**Cost.** Bootstrap's names alone cost one dispatch per transition step, which is Bootstrap's own cost. Emitting both name sets doubles dispatches and gives listeners two events for one fact. That cost is unmeasured; I request bench P9 under § Risks.

### Entry point and barrel

A page boots with `new Engine(document).start()`.

**`start()`:**
- adopts the correction sheet;
- attaches the capture-phase `document` listeners;
- runs the load-time initializations on the window `load` event, or at once when `document.readyState` is `complete`. These are `.offcanvas.show` → `show` (D:459), `.active` tab toggles (D:592), `[data-bs-ride="carousel"]` (D:846), `[data-bs-spy="scroll"]` (D:848), and `[data-bs-toggle="tooltip"|"popover"]`; the last is a departure (§ Risks).

`destroy()` destroys every instance, aborts every listener, and removes the sheet. There is no per-component factory: `createModal(element)` would bypass the registry the data API shares.

**Barrel.** `src/browser/index.ts` star-exports:
- `types.ts`, `constants.ts`, `helpers.ts`, `parsers.ts`, and `validators.ts`;
- `mechanics/Engine.ts`.

Component and mechanics classes other than `Engine` stay internal.

**Discriminants:**
- `component: ComponentName`, the axis the event namespace and the tip profile vary on;
- `Placement`, `SlideDirection`, `backdrop: boolean | 'static'`, `autoClose: boolean | 'inside' | 'outside'`, `display: 'dynamic' | 'static'`, and `ride: boolean | 'carousel'`. Each is an external value from Bootstrap's markup contract.

### Alternatives considered

- **Per-component factories with no engine** (the elements `create*` shape). I rejected it. A drop-in needs document-level delegation (D:23) and one shared registry for cross-instance work:
  - `clearMenus` walks every open menu (D:306);
  - collapse siblings under a parent (D:240);
  - the modal data API hides another open modal (D:381);
  - the offcanvas data API hides another open offcanvas (D:458).
- **Dual event names (Bootstrap's plus Veneer's own).** I rejected it because it splits one fact across two events and doubles the dispatch cost. It also leaves the Vue face to choose between them, which `patterns.md:100` forbids by fixing one event model per environment.

## Shared mechanics

**Data API.**
- `Engine.start()` registers `click`, `keydown`, and `keyup` listeners on `document` in the capture phase, as Bootstrap's delegated listeners do (`event-handler.js:184`, D:21).
- One frozen route table in `constants.ts` maps each selector to its component:
  - `[data-bs-dismiss]` (D:23);
  - the `data-bs-toggle` values `button`, `collapse`, `dropdown`, `modal`, `offcanvas`, `tab`, `pill`, and `list`;
  - `[data-bs-slide], [data-bs-slide-to]` (D:23);
  - the dropdown `clearMenus` listener with no selector (D:300).
- Routing uses `closest()`. The `A`/`AREA` `preventDefault` and the `isDisabled` refusal live in the router, as `enableDismissTrigger` does (D:23).

**Targets.**
- The `resolveTargets` helper mirrors `getSelector`: `data-bs-target`, then `href`, then the `#` fallback, then the comma list (D:47).
- `isVisible`, `isDisabled`, and `nextActive` mirror D:51 because the dropdown, tab, and carousel guards read them.
- Every listener is registered with `{ signal }` from an `AbortController` per instance and one for the engine, so `destroy()` is one `abort()`.

**Config reading.** Covered under § Contract, Options. Merge logic and coercion live in `helpers.ts` and `parsers.ts`; defaults live in `constants.ts` as frozen data.

**Transition completion.** The `awaitTransition(element, signal)` helper resolves when every `CSSTransition` from `element.getAnimations()` has finished, and at once when there is none:
- It replaces the duration parse and the 5 ms emulated `transitionend` (D:37, `util/index.js:229-256`).
- [m: fade-discrete] shows the `transition: none` control and reduced motion produce no animation, while both enabled paths produce one 150 ms animation.
- Carousel `pause` finishes an in-flight slide with `Animation.finish()` instead of `triggerTransitionEnd` (D:722).

Two rules keep Bootstrap's observable order:
- The engine keeps Bootstrap's `reflow` (`offsetHeight` read) at every site Bootstrap reflows (D:39), because Bootstrap's sheet animates from class changes and declares no `@starting-style`.
- `@starting-style` and `transition-behavior: allow-discrete` are refused. They animate the same opacity ([m: fade-discrete]) but would need correction rules duplicating Bootstrap's transitions.

The waited element and the animated flag per component stay exactly as D:41 lists.

**Focus containment.**
- A `Trap` class reproduces `FocusTrap`: `focusin` on `document`, Tab direction recorded with neither `preventDefault` nor `stopPropagation`, and first or last focus (D:57). [m: focus-inert] `trapped` reads `inside-first, inside-last, …` cycling inside the frame.
- `inert` is refused for `div` overlays. It writes an attribute on page nodes Bootstrap never touches, and it does not wrap: [m: focus-inert] `inert` reads `BODY ×5` as Tab leaves the frame.
- On `dialog.modal`, native modality replaces the trap. The guide names the departure that Tab from the last control reaches browser interface rather than cycling. [m: dialog-modal] `initial.tabs` reads `BODY ×4`, with the iframe limit recorded in the report's Limits section.

**Backdrop.**
- A `Backdrop` class creates the `div.modal-backdrop` or `div.offcanvas-backdrop`, adds `fade` when animated, appends it, reflows, and adds `show`. Hiding reverses this, and the class listens for `mousedown` (D:55).
- `::backdrop` is refused as the painted scrim. Bootstrap's scrim variables sit on `.modal-backdrop` itself (`css:5542-5558`), and the oracle compares the created node ([m: bootstrap-oracle] `added: div.modal-backdrop.fade.show`).
- On `dialog.modal`, the correction sheet makes `::backdrop` transparent, and the `div` backdrop paints beneath the top-layer dialog (P12).

**Scroll lock.**
- A `Lock` class, counted per engine, writes inline `overflow: hidden` on `body`, as Bootstrap does (D:59). When `innerWidth - documentElement.clientWidth > 0`, it also writes inline `scrollbar-gutter: stable` on `<html>`, and restores both on the last release.
- It replaces Bootstrap's `padding-right` compensation on `body` and `.fixed-top, .fixed-bottom, .is-fixed, .sticky-top`, its `data-bs-*` save attributes (D:59), and the modal `_adjustDialog` padding (D:366).
- [m: scroll-lock]: with a 15 px scrollbar, the stable gutter preserved body and fixed-navbar widths at 399 px with zero padding. Bootstrap's helper widened both to 414 px and padded them by 15 px.
- This is a departure in the DOM writes, with the layout preserved. Sticky and modal-dialog geometry are unmeasured (P7).

**Placement.** A `Placement` class serves the dropdown menu and the tip. On show:
- set `popover="manual"`;
- call `showPopover({ source: anchor })` for the implicit anchor (pending P1; the measured fallback is an inline `anchor-name` and `position-anchor` pair, [m: dropdown-anchor-popover]);
- write inline `position-area` from a frozen `PLACEMENT_AREAS` map in logical keywords, so `dir="rtl"` swaps without Bootstrap's module-load `isRTL` (D:51, D:322);
- write `position-try-fallbacks`: `flip-block` for a vertical dropdown, `flip-inline` for `dropend` and `dropstart`, and the `fallbackPlacements` areas for a tip;
- write an offset margin (`[0, 2]` for a dropdown, `[0, 6]` for a tooltip, `[0, 8]` for a popover; D:277, D:511, D:540).

The engine learns the resolved side after a flip by geometry readback: it compares the floating box with the anchor box and writes `data-popper-placement`, keeping the requested `-start` or `-end` suffix:
- on show, through a synchronous `getBoundingClientRect` after the writes;
- on capture-phase passive `scroll` and on `resize` while shown, the cadence Popper's event listeners use.

That is event-driven, not polling. [m: tooltip-arrows] `edge` shows the tip flipping left while `data-popper-placement` stayed `right`, which is why the readback is needed. Anchored container queries are the rejected alternative: Bootstrap's sheet selects the attribute (`css:5798-5839`), so the attribute must be written anyway.

Hide reverses every inline write and calls `hidePopover()`; the menu's `popover` attribute is removed at hide. A closed component's DOM therefore equals Bootstrap's.

**Correction sheet.** One `CSSStyleSheet`, built from a frozen `CORRECTION_RULES` string in `constants.ts`, is adopted by `start()` through `document.adoptedStyleSheets` and removed by `destroy()`.

Every rule is unlayered and wrapped in `:where()` with zero specificity. It therefore beats only user-agent declarations and loses to Bootstrap's sheet, whether unlayered or lifted into `bootstrap`, and to any author rule. That is the override path the guide states, replacing "ships no sheet" in guides/veneer.md:106-109.

The rules each family adds are:
- **U6:** `:where(dialog.modal) { margin: 0; border: 0; padding: 0; max-width: none; max-height: none; color: inherit; background: transparent }` ([m: dialog-modal]: `differences: []` against the `div` control), plus `:where(dialog.modal)::backdrop { background: transparent }`.
- **U7:** `:where(.dropdown-menu, .tooltip, .popover)[popover]` neutralizing the user-agent `inset`, `width`, `height`, `margin`, `border`, `padding`, `overflow`, `color`, and `background` ([m: dropdown-anchor-popover] `c` keeps user-agent `overflow: auto` and `inset: 0`; `.tooltip` sets no border, padding, or background at `css:5760-5790`; P2).
- **U7:** `:where(.tooltip-arrow, .popover-arrow) { position: absolute }`, plus centering keyed on the side, for example `:where([data-popper-placement^=top], [data-popper-placement^=bottom]) > :where(.tooltip-arrow) { left: calc(50% - var(--bs-tooltip-arrow-width) / 2) }`. [m: tooltip-arrows] `centered` matched Popper within 1 px. Popper wrote the arrow's `position: absolute` inline (`popper.arrowInline`), and `css:5786-5790` declares none.

`display` on `dialog.modal` is the inline `display: block` and `display: none` Bootstrap itself writes (D:364, D:368), so no rule is needed.

**Disposal.**
- Component `destroy()` performs Bootstrap's `dispose`: remove the instance from the registry and abort its listeners and timers. It also does the per-component extras: destroy the placement, remove the tip, restore `title`, disconnect the observer, and clear the toast timer (D:13, D:289, D:524, D:649, D:722, D:791).
- `Engine.destroy()` destroys every instance first, then its own listeners and the sheet.

## Per plugin

Each row names the contract kept, the native mechanism, the Bootstrap CSS it changes, the correction or departure, and the proof that settles it:

| Component | Bootstrap contract kept | Native mechanism | Bootstrap CSS the mechanism changes | Correction or departure | Proof |
| --- | --- | --- | --- | --- | --- |
| Alert | Capture-phase `[data-bs-dismiss="alert"]` with `A`/`AREA` `preventDefault`, `isDisabled`, and target resolution (D:23, D:82); `close.bs.alert` cancelable, then remove `show`, wait on `fade`, `remove()`, and `closed.bs.alert` (D:97-112) | `awaitTransition` | None: `.fade` (`css:3342-3352`) unchanged | No emulated `transitionend` (`util/index.js:251-255`) | Oracle: dismiss with `fade`, without `fade`, and with `close` prevented |
| Button | Capture click with `preventDefault`, then toggle `active` and write `aria-pressed` from the toggle result; no event (D:136, D:148-152) | None; nothing native improves a class toggle | None (`css:3015-3018`) | None | Oracle: two clicks; a click on a nested child |
| Carousel | Item, indicator, and `aria-current` writes and class order (D:720); `slide`/`slid` with `relatedTarget`, `direction`, `from`, and `to` (D:726); arrow keys (D:734); hover pause and `pointer-event` swipe at a 40 px threshold (D:61, D:736); per-item `data-bs-interval` (D:714); ride at load (D:846); `to` deferred while sliding (D:718) | `awaitTransition`; `pause` finishes the slide with `Animation.finish()`; pointer events are Bootstrap's own path (`swipe.js:55`) | None (`css:6026-6073`) | View Transitions refused, because Bootstrap's classes drive the slide | Oracle: `next`, `previous`, `to`, keys, and an indicator click; swipe through `createPointerEvent` with `pointerType: 'touch'`; reduced motion |
| Collapse | Show and hide write sequences, including inline px sizes, `collapsing`, trigger `collapsed`, and `aria-expanded` (D:195-215); parent accordion (D:184, D:240); horizontal (D:172); `A` prevent (D:174) | `awaitTransition` only. `interpolate-size` refused: equal motion ([m: collapse-intrinsic] 368 ms against 349 ms), but it changes the inline writes the oracle compares and adds a rule for no visible gain. `<details>` refused: the markup is `div.collapse`, and [m: collapse-intrinsic] `details` produced no animation | None (`css:3354-3376`) | None | Oracle: accordion sibling close, horizontal, prevented show, and a double click mid-transition |
| Dropdown | Toggle and menu resolution (D:258); show writes: focus the toggle, `aria-expanded`, then `show` on the menu and then the toggle (D:285); events on the toggle (`dropdown.js:129-156`); `clearMenus` with `autoClose` and `clickEvent` (D:299, D:306); keyboard (D:308); `data-bs-popper="static"` in the navbar or with `display: static` (D:289, D:324); placement from parent classes and `--bs-position` (D:322) | Dynamic path: `Placement` (Popover API, anchor positioning, fallbacks, readback). Light dismiss (`popover="auto"`) refused: closing `beforetoggle` is not cancelable ([m: dropdown-anchor-popover] `d.events`) while `hide.bs.dropdown` is (D:298), and `inside`/`outside` cannot be expressed. Invoker commands refused because they need markup edits ([m: invoker-commands]) | The user-agent popover box (`inset: 0`, `overflow: auto`, [m: dropdown-anchor-popover] `c`); the top layer outranks `--bs-dropdown-zindex` 1000 ([m: top-layer]) | Correction rule (U7). Departures: an open menu paints over sticky and fixed bars and over toasts ([m: top-layer] `reordered`); no Popper transform; `boundary`, `popperConfig`, and function `offset` refused; the touch `noop` listeners (`dropdown.js:145-148`) dropped | Oracle: click, arrow keys, Escape, outside click, the three `autoClose` modes, and the navbar static path (P10); `data-popper-placement` after a forced flip (P4) |
| Modal | On `div.modal`: show and hide write order, the backdrop, `modal-open`, `display`, `aria-*`, and `role` (D:364-368); trap (D:390); Escape and `keyboard` with the `modal-static` bounce and `hidePrevented` (D:370, D:380); mousedown plus click on the modal (D:388); the data API hides another `.modal.show` (D:381); focus restore on `hidden` (D:384) | `awaitTransition`; `Lock`. On `<dialog class="modal">`: `showModal()` and `close()` give the top layer and inert exclusion, while every Bootstrap class, attribute, event, and the `div` backdrop are kept; Escape through Bootstrap's keydown with `closedby="none"` (P6). Refused on `div`: `<dialog>` (the element type cannot change, ruling 3), `popover` on the `div` (top-layer modals bury toasts, z-index 1090 against 1055, [m: top-layer]), and `inert` (D:57, [m: focus-inert]) | Dialog path: the user-agent dialog box ([m: dialog-modal] `raw` and `initial`: 3 px border, 16 px padding, centered margin) | Correction rule (U6). Departures: gutter scroll lock replaces `padding-right` and `_adjustDialog` (`modal.js:297-309`); dialog path: Tab reaches browser interface instead of cycling, and toasts sit below the open dialog | Oracle on `div`: show, hide, static, Escape, outside click, and focus restore; dialog path: the same transcript compared with the dialog departure rows; P7 for geometry |
| Offcanvas | Classes `showing`, `show`, and `hiding`, plus `aria-modal` and `role` (D:442-444); backdrop appended to `parentNode` with static `hidePrevented` (D:456); trap when `!scroll \|\| backdrop` (D:436); `blur` on hide (D:444); load `.offcanvas.show` (D:459); resize hide when `position` is not `fixed` (D:460); the data API hides another open offcanvas (D:458) | `awaitTransition`; `Lock`. Top layer refused: `.offcanvas-lg` and its siblings are in-flow content above their breakpoint (`css:6290-6348`), and the top layer would lift them out | None | Gutter scroll lock | Oracle: show, hide, Escape, `scroll: true`, static backdrop, and the responsive resize hide |
| Popover | Tip contract with the popover profile: template `.popover-arrow`, `h3.popover-header`, and `.popover-body`; `bs-popover-auto`; defaults `click`, `right`, and `[0, 8]`; empty slots removed (D:538-542) | As Tooltip | `.popover` sets border and background but no padding or position (`css:5851-5900`) | As Tooltip | Oracle: click toggle, title and content slots, an empty header, and an HTML body sanitized |
| Scrollspy | `IntersectionObserver` with `root`, `rootMargin`, and `threshold`; direction logic, `active` on links, parents, and the dropdown toggle; `activate.bs.scrollspy`; smooth scroll (D:779-805) | Bootstrap's own mechanism is already native (`scrollspy.js:152-159`); kept wholesale | None | None | Oracle: programmatic scroll steps, each awaited on `activate`; `refresh` after a section is added |
| Tab | Construction ARIA writes (D:572); `hide` then `show` events and their order (D:588); class and ARIA sequences (D:574-580); keyboard arrows, Home, and End (D:598); `.active` toggles at load (D:592); `fade` waits (D:602) | `awaitTransition`. The elements `[hidden]` model (`elements/.../createTabs.ts:16-21`) refused, because Bootstrap's CSS selects `.tab-content > .active` (`css:3925-3929`) | None | None | Oracle: click, arrow and Home/End keys, a fade pane, and a dropdown tab |
| Toast | Writes for `fade`, `hide`, `showing`, and `show`, including the deprecated `hide` class (D:645-647, D:629); autohide timer with hover and focus interaction (D:665, D:669); dismiss (D:659) | `awaitTransition`. Popover top layer refused: it removes the toast from `.toast-container` layout | None (`css:5413-5418`) | None | Oracle: show, autohide at `data-bs-delay="30"`, a hover hold, and dismiss |
| Tooltip | Template and sanitizer (D:63, D:491); `title` moved to `data-bs-original-title`, `aria-label` when there is no text, and `aria-describedby` with a generated id (D:493-494); the container (D:506); `hover`, `focus`, `click`, and `manual` triggers with `relatedTarget` containment (D:21, D:528); delays and `_isHovered` (D:530); `show`, `inserted`, `shown`, `hide`, and `hidden` on the trigger (D:526); hide on the closest modal's `hide` (D:532); `bs-tooltip-auto`, `fade`, `show`, and `data-popper-placement` | `Placement`; arrows through the correction sheet keyed on the attribute. `interestfor` refused: it needs markup attributes and has no `delay` or `_isHovered` semantics | `.tooltip` declares no position, border, padding, or background (`css:5760-5790`); `.tooltip-arrow` has no `position` (`css:5786-5790`; Popper wrote it inline, [m: tooltip-arrows] `popper.arrowInline`) | Correction rules (U7). Departures: a tip paints over toasts ([m: top-layer] `first`); a tip whose trigger sits in an open `dialog:modal` is appended into that dialog, because a body-level popover is outside the modal and receives no pointer input ([m: dropdown-anchor-popover] `outsideAfterDialog`); `auto` maps to `top` with fallbacks; Popper transforms are absent | Oracle: DOM with the id normalized, events, and delays; geometry within 1 px for top and right ([m: tooltip-arrows]) and after a flip (P3, P4) |

## Proof model

**The oracle** is Bootstrap's own engine, `bootstrap.bundle.js` (which includes Popper), loaded by a `<script>` into a same-origin child `iframe` with the Bootstrap sheet and the fixture markup.
- The iframe gives Bootstrap its own realm and `document`, so its module-load `document` listeners (D:23) never see the Veneer engine's events. Within one test file the two would otherwise both handle every click.
- The Veneer engine runs on the same markup in the test document, with `import 'bootstrap/dist/css/bootstrap.css'` (tests may import Bootstrap, ROADMAP.md:14).
- One scenario, a list of steps (`click`, `key`, `hover`, `focus`, `tab`, `scroll`, or `call`, each with a selector), drives both through `userEvent`. Whether `userEvent` reaches the child frame is P8. If it does not, synthetic dispatch drives both, except steps whose native mechanism needs trusted input.

**What is compared** is one transcript per run, recorded per step:
- attribute mutations as final values per element path;
- the class list as a set;
- inline style declarations per property;
- created and removed nodes by tag, class set, and path;
- the ordered event sequence of `*.bs.*` types with target path, `cancelable`, `defaultPrevented`, and hydrated properties as paths or values;
- the `document.activeElement` path after each step.

Generated ids are normalized by first appearance.

**What is excluded:**
- timing and `isTrusted`;
- `transitionend` events;
- Popper's inline `position`, `inset`, `margin`, and `transform` on the menu, the tip, and the arrow;
- the engine's own inline anchor properties: `position-area`, `position-anchor`, `anchor-name`, `position-try-fallbacks`, and the offset margin.

**Admitting a departure.** Every other mismatch must match a row in a new guide section, `## Browser departures`, with columns `Component`, `Bootstrap`, `Engine`, and `Reason` (the proof or measurement). The comparison reads the table in both directions, as the sheet's departure table does (guides/veneer.md:329-338):
- an unmatched mismatch reddens;
- a row no scenario produces reddens.

A row is admitted only with the probe or test that shows the native behavior and the ruling it serves. The harness's own controls are a planted extra class write, a dropped event, and an orphan row.

**Geometry** is outside the transcript. It is proved per floating component against Popper's boxes within 1 px, as [m: tooltip-arrows] did.

## Units

Every writing unit runs as `builder` on Opus 5.5 through the native Agent tool, and the units run serially. `.claude/AGENTS.md` serializes writing nodes, and the families share `types.ts`, `constants.ts`, `mechanics/Engine.ts`, and the guide. U3 alone runs in parallel with U2, on disjoint files. Each family unit is medium-sized: types first, then a `reviewer` pass on the contract and its risky seams, then file and project tests. `verifier` runs the tree-wide gates once, at U10.

These are the units in order:

1. **U1 Shared contract.**
   - **Owned:** `src/browser/types.ts` (the shared slice of the § Contract fence: unions, details, `ComponentEvent`, `ComponentHooks`, `ComponentInterface`, and `EngineInterface` with only `start` and `destroy`) and `src/browser/constants.ts` (`UNDECLARED_CLASSES` for `modal-open` and `hide`, the names Bootstrap writes that no rule declares per engine.json `declared: false`; the empty `CORRECTION_RULES`; the empty `ROUTES`).
   - **Deps:** none.
   - **Accept:**
     - the browser project typecheck is green;
     - every member is one word or carries the `names.md:120` TSDoc naming its source;
     - class names are read from `CLASS_NAMES.bootstrap` (src/core/constants.ts:1934-1945), so no declared class is a string literal.
2. **U2 Engine core and shared helpers.**
   - **Owned:** `src/browser/helpers.ts` (`resolveTargets`, `readData`, `isDisabled`, `isVisible`, `nextActive`, `awaitTransition`, `reflow`, `emitEvent`, `bindEventMap`), `src/browser/parsers.ts` (`parseDatum`), `src/browser/validators.ts`, `src/browser/mechanics/Engine.ts`, `src/browser/index.ts`, and the mirrored tests including `tests/src/browser/index.test.ts`. Guide: the `## Browser entry` surface rows.
   - **Deps:** U1.
   - **Accept:**
     - `resolveTargets` passes every D:47 case;
     - `parseDatum` passes every D:31 case;
     - `awaitTransition` resolves for a 150 ms fade and resolves at once under `transition: none`, with the control red;
     - `emitEvent` events carry `detail` and own properties;
     - `start` adopts the sheet and `destroy` removes it;
     - load init deferred while `readyState` is not `complete`;
     - a recorder proves every listener is aborted;
     - `npm run test:src:browser` is green.
3. **U3 Oracle harness** (parallel with U2).
   - **Owned:** `tests/setupBrowser.ts` (`createOracle`, `recordTranscript`, `compareTranscripts`, `readBrowserDepartures`, and the step types) and `tests/setupBrowser.test.ts`.
   - **Deps:** U1, P8.
   - **Accept:**
     - Bootstrap-against-Bootstrap transcripts on the alert and modal fixtures are equal;
     - the three controls each redden;
     - the oracle frame's realm is distinct (its `document` differs from the test `document`);
     - the `setup:browser` project is green.
4. **U4 Dismissal: Alert, Button, Toast.**
   - **Owned:** `src/browser/components/Alert.ts`, `Button.ts`, and `Toast.ts`; their slices of `types.ts` and `constants.ts`; the `alert`, `button`, and `toast` accessors and routes in `Engine.ts`; `tests/src/browser/components/{Alert,Button,Toast}.test.ts`. Guide: `### Dismissal`.
   - **Deps:** U2, U3.
   - **Accept:**
     - each row's oracle scenarios compare equal;
     - the `transitionend` departure row is matched.
5. **U5 Disclosure: Collapse, Tab.**
   - **Owned:** `components/Collapse.ts` and `Tab.ts`, their slices, and their tests. Guide: `### Disclosure`.
   - **Deps:** U4.
   - **Accept:**
     - the oracle scenarios of both rows compare equal, including the inline px sizes;
     - the accordion sibling case runs.
6. **U6 Overlay: Modal, Offcanvas.**
   - **Owned:** `components/Modal.ts` and `Offcanvas.ts`; `mechanics/Backdrop.ts`, `Trap.ts`, and `Lock.ts`; the dialog correction rules; their tests. Guide: `### Overlay` and its departure rows.
   - **Deps:** U5, P6, P7, P12.
   - **Accept:**
     - the `div` oracle scenarios compare equal under the gutter departure;
     - the dialog path transcript matches the `div` oracle under its rows;
     - the trap cycles ([m: focus-inert] `trapped` as the expected reading);
     - the `Lock` count survives modal and offcanvas overlap.
7. **U7 Floating: Dropdown, Tooltip, Popover.**
   - **Owned:** `components/Dropdown.ts` and `Tip.ts`; `mechanics/Placement.ts`; the sanitizer helper (a port of Bootstrap's `DOMParser` walk, D:63, pending P11); the popover and arrow correction rules; tip profiles in `constants.ts`; their tests. Guide: `### Floating`.
   - **Deps:** U6, P1, P2, P3, P4, P10.
   - **Accept:**
     - the oracle transcripts compare equal;
     - boxes within 1 px of Popper for top, right, and after a flip;
     - `data-popper-placement` equals the resolved side;
     - the sanitizer drops the D:63 disallowed tags and `javascript:` URLs.
8. **U8 Motion: Carousel.**
   - **Owned:** `components/Carousel.ts`, its slices, and its tests. Guide: `### Motion`.
   - **Deps:** U7.
   - **Accept:**
     - oracle scenarios equal, including indicator `aria-current`;
     - swipe below and above 40 px.
9. **U9 Observation: Scrollspy.**
   - **Owned:** `components/Scrollspy.ts`, its slices, and its tests. Guide: `### Observation`.
   - **Deps:** U8.
   - **Accept:** the oracle `activate` sequence is equal for down and up scroll.
10. **U10 Integration and close.**
    - **Owned:** `tests/src/browser/integration.test.ts` (tooltip hides on modal `hide` per D:532; dropdown inside a modal; collapse inside an offcanvas; `Engine.destroy` mid-transition); `app/browser/main.ts` (a Bootstrap-markup demonstration started by `new Engine(document).start()`); the browser journey; the full `## Browser departures` table.
    - **Deps:** U9.
    - **Accept:** `verifier` runs `format:check`, `lint:check`, `check`, `build`, and `npm test` green.

**Chunk exit:**
- all twelve components compare equal to the oracle modulo a departure table read in both directions;
- the guide documents every export;
- the gates are green.

## Risks

**Probes for the analyst lane.** I have no shell, so each one needs a negative control:
- **P1 implicit anchor.** Does `showPopover({ source })` with an inline `position-area` and no `anchor-name` place the menu at the [m: dropdown-anchor-popover] `fixed` box? Control: no `source`.
- **P2 tip in the top layer.** Do `.tooltip` and `.popover` as `popover="manual"` with the `:where()` rule equal Popper's boxes, border, padding, and color? Control: without the rule.
- **P3 cross-axis flip.** Does a uniform offset margin with area fallbacks keep Popper's gap after a top-to-right flip? Control: a margin on one side only.
- **P4 flip on scroll.** Does the fallback re-evaluate when a nested scroller scrolls? elements' `surfaces.md:153` claims it does not. Also, does readback on `scroll` catch the flip? Control: no `position-anchor`.
- **P5 synchronous `getAnimations()`.** Does it return the `CSSTransition` synchronously after the class write? Does `finish()` complete it? Control: `transition: none`.
- **P6 dialog Escape.** With `closedby="none"`, does Escape produce no `cancel` or `close` while the engine's keydown path runs, including on repeat presses? Control: no `closedby`.
- **P7 scroll-lock geometry.** Do the gutter and Bootstrap's helper give equal `.modal-dialog`, `.sticky-top`, and `.fixed-bottom` boxes, both when the body overflows and when the modal overflows? Control: no compensation.
- **P8 oracle frame input.** Can `userEvent` drive elements in a same-origin child iframe? Control: an element outside the frame.
- **P9 event cost.** A guarded bench of a single hydrated dispatch against dual dispatch, with the threshold declared first.
- **P10 navbar static path.** Does the static path without `popover` match the oracle box in expanded and collapsed navbars?
- **P11 Sanitizer API.** Can `setHTML` express `/^aria-[\w-]*$/i`? If it can, it replaces the `DOMParser` port.
- **P12 dialog backdrop.** On `dialog.modal`, does the document-layer `.modal-backdrop` paint beneath the top-layer dialog with a transparent `::backdrop`? Control: the user-agent `rgba(0, 0, 0, 0.1)`.

**Readings missing:**
- standalone Tab wrapping (the report's Limits section);
- pixel compositing over modals;
- event dispatch cost;
- the 153 behavior of an implicit anchor.

**Ancillary choices settled here, each a departure row:**
- **Tooltip and popover auto-start.** The engine starts `[data-bs-toggle="tooltip"|"popover"]` at load. Bootstrap needs page script to create them, through the JavaScript API ruling 3 drops, so a drop-in page's tooltips would otherwise never work.
- **No `window.bootstrap` and no jQuery.**
- **Mistyped config** resolves to the default instead of throwing.
- **One engine per document.** This is documented but not enforced: enforcing it needs module state that the kind rules forbid.

**Defects found:**
- The distillate carries a truncated table row stitched to `SLICE 11` at D:821 and a stray "wait" at D:520. Both are harmless, because D:822-848 restates the table and D:522 restates the cell. Repair them before a cheap executor reads those lines.
- `readDepartures` refuses a second table (guides/veneer.md:340-342). U3's reader must take a section heading, or the browser table collides with the sheet's.

**Exposure:**
- Star-exported `helpers.ts`, `parsers.ts`, and `validators.ts` make every helper public. Each needs a guide row, per the parity rule.
- `Engine`, `bindEventMap`, `emitEvent`, and the `*Interface` names must pass the fleet `surface` check (names.md:124-137) before U2 lands.

**Measured conflicts with elements claims:**
- elements says `::backdrop` cannot inherit host tokens (`surfaces.md:190`). The dialog path avoids that question by keeping the `div` backdrop.

## Open questions for the user

1. **Boot.** A drop-in page must call `new Engine(document).start()`, because the standing shape fixes one `./browser` subpath (ROADMAP.md:51) and a library barrel must not start itself. Do you want an auto-starting entry? It would add a subpath, which the standing shape forbids without your ruling. My recommendation: no; keep the one explicit call.
2. **`<dialog class="modal">`.** Bootstrap markup is `div.modal`, which cannot become a `<dialog>` without edits (ruling 3). Do you want the engine to also accept an author-written `<dialog class="modal">` as a native top-layer path in this chunk? Ruling 7's note on the `dialog.modal` user-agent declarations suggests you expect it. My recommendation: yes, for the modal only. The offcanvas transform transition collides with the closed dialog's `display: none`, and no measurement covers it.

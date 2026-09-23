# J-ENGINE-DESIGN — the subjective lane's proposal (returned 2026-09-23 by `planner` on Opus 5.5, native, read-only; the alias served `claude-opus-5-5[1m]`; retained verbatim from the subagent's final message, 57 tool uses, 964 s)

---

Lane: subjective, held by `planner` on Opus 5.5 as a native read-only subagent. The `opus` alias served `claude-opus-5-5[1m]`.

## Design

### The governing idea

Bootstrap owns the outside of the engine and the platform owns the inside.

- **The outside is Bootstrap's.** That covers the markup, the `data-bs-*` attributes, the wire event names, the cascade classes (`show`, `collapsing`, `showing`, `active`, `modal-static`), and every method verb that is already one word.
- **The inside is the platform's.** That covers `getAnimations()`, `inert`, `CloseWatcher`, the Popover API, CSS anchor positioning, `IntersectionObserver`, `Element.setHTML` with `Sanitizer`, pointer events, and `MutationObserver`.
- **The TypeScript surface obeys Veneer's naming law.** Where the law and a Bootstrap name collide on a TypeScript member, the law wins and the guide records a departure. Where they collide on a wire name, such as an attribute, an event name, or a class, Bootstrap wins.

These rules bind every entity:

- **Explicit construction.** Importing the barrel installs nothing. `Delegate` is the data API.
- **State lives in the DOM.** Every getter derives from the classes and attributes the cascade reads. So any engine can run the shared state algorithm on a sibling it does not own, which covers accordion siblings, tab siblings, and a queued carousel slide. Ownership decides who holds listeners and who restores the host. It never decides state.
- **One owner per host per component.** Destruction restores the host, and one `AbortController` ends every listener.
- **Two events per change.** Every change dispatches a pre-change event and a completed event on Bootstrap's wire names.
- **No timers for completion.** Completion is read from the element's own animations.
- **Immediate return.** Every method returns at once. Show-type methods return a promise that reports the outcome (`true` for the change happened, `false` for refused or prevented). This satisfies the accepted row that methods "return to the caller before the transition ends".

### File placement (Unknown 8)

The plugin classes form one family, because they share the host, lifecycle, event, and restore contract. They nest in `src/browser/components/`. Each mechanism is a lone class of its own kind, so each stays flat at `src/browser/`. No module splits into its own centralized files, and every contract stays in `src/browser/types.ts`.

| Path | Holds |
| --- | --- |
| `src/browser/types.ts` | Every engine contract |
| `src/browser/constants.ts` | `{ENTITY}_EVENTS` wire tables, `{ENTITY}_SELECTOR` and dismiss selectors, `{ENTITY}_DEFAULTS`, `SANITIZE_ALLOWLIST`, `TOOLTIP_TEMPLATE`, `POPOVER_TEMPLATE` |
| `src/browser/helpers.ts` | `emitEvent`, `bindEventMap`, `settleAnimations`, `reflow`, `readTarget`, `readTargets`, `collectFocusable`, `computeNeighbor`, `matchesReducedMotion`, `generateId`, `buildSanitizer`, `buildTip`, `writeContent` |
| `src/browser/validators.ts` | `isHost` (the `isButtonHost` guard renamed, with every consumer updated), `is{Entity}Event`, and value-union guards through `literalOf` |
| `src/browser/parsers.ts` (new) | `parse{Entity}Attributes`, one per entity that reads options |
| `src/browser/ColorMode.ts`, `Delegate.ts` | Unchanged location |
| `src/browser/Registry.ts`, `Snapshot.ts`, `Backdrop.ts`, `Isolation.ts`, `ScrollLock.ts`, `Placement.ts`, `Swipe.ts` | Shared mechanisms |
| `src/browser/components/{Button,Collapse,Dropdown,Tab,ScrollSpy,Modal,Offcanvas,Tooltip,Popover,Alert,Toast,Carousel}.ts` | Plugin entities; `Button.ts` moves here from the root |
| `tests/src/browser/**` | The mirror of each preceding path: `components/*.test.ts`, `Registry.test.ts`, `Snapshot.test.ts`, `Backdrop.test.ts`, `Isolation.test.ts`, `ScrollLock.test.ts`, `Placement.test.ts`, `Swipe.test.ts`, `parsers.test.ts` |
| `src/core/types.ts` | No engine contract, because every engine contract names a DOM type |

### Shared mechanisms

| Mechanism | Shape | Home | First consumer | Native system |
| --- | --- | --- | --- | --- |
| Pre-change and completed event | `emitEvent(host, name, detail): boolean` dispatches `CustomEvent` with `{ bubbles: true, cancelable: true }`, which is Bootstrap's shape for every event. It hydrates each detail field as an own read-only property and returns `!defaultPrevented`. Pre-change call sites branch on the return value; completed call sites ignore it. | `helpers.ts` | Collapse; Button's event moves with it | `CustomEvent` |
| Entity-neutral binder | `bindEventMap(host, wire, hooks, guard, signal)`. It subscribes each hook in `options.on` to its wire name and narrows through the entity's guard. An entity's events share one event type, so the guard is `Guard<CustomEvent<TDetail>>`. | `helpers.ts` | Button, migrated first | `addEventListener` with `signal` |
| Ownership and lookup | `Registry<TEngine>` has `claim(host, engine)`, which throws `AppError` `{ENTITY}_HOST_OWNED`, plus `find(host)` and `release(host)`. Each class holds one static instance and exposes `static find(host): {Entity}Interface \| undefined`. | `Registry.ts` | Button | `WeakMap` |
| Restore on destroy | `Snapshot` has `save(target)` and `restore()`. The target is discriminated by `category: 'attribute' \| 'token' \| 'property'`, and the first save of a target wins. | `Snapshot.ts` | Button (replaces its hand-kept fields) | — |
| Lifetime | One native `AbortController` per engine, with no wrapper | Each class | Every class | `AbortSignal` |
| Generalized delegation | One `Delegate` listens for `click` and `keydown` on its root, runs a construction-time scan, and releases through `MutationObserver` (see Delegation) | `Delegate.ts` | Button, then Collapse | `MutationObserver`, `closest` |
| Transition completion | `settleAnimations(element, signal): Promise<void>` reads `element.getAnimations()`, excluding infinite and paused animations. It awaits each `finished`, treats an `AbortError` rejection as settled, re-reads the list until it is empty, and resolves early when the signal aborts. `reflow(element)` forces layout between class steps. | `helpers.ts` | Collapse | Web Animations |
| Focus | `collectFocusable(root)` implements Bootstrap's `focusableChildren` with `checkVisibility()`. `computeNeighbor(items, current, step, wrap)` implements Bootstrap's `getNextActiveElement`. `Isolation` makes every element outside a host `inert` at construction and restores each one it changed on `destroy()`. | `helpers.ts`, `Isolation.ts` | Tab (helpers), Modal (`Isolation`) | `inert`, `focus({ preventScroll })` |
| Placement | `Placement(reference, floating, options)` writes `anchor-name` on the reference and `position-anchor`, `position-area`, `position-try-fallbacks`, `inset: auto`, and the offset margin on the floating element. It can promote the floating element to `popover="manual"` or `"hint"`, and it writes the resolved side attribute (`data-popper-placement`, or `data-bs-popper="static"`). It has `side`, `update()`, and `destroy()`, which restores. | `Placement.ts` | Dropdown | CSS anchor positioning, Popover API, `ResizeObserver` |
| Backdrop | `Backdrop({ class, parent, animated })` has `element`, `show()`, `hide()`, and `destroy()`. It appends the cascade's own `.modal-backdrop` or `.offcanvas-backdrop` element. | `Backdrop.ts` | Modal | The cascade's element, `settleAnimations` |
| Scroll lock | Construction locks and `destroy()` unlocks. A reference count is kept per document. The lock sets `overflow: hidden` and adds the measured scrollbar width to `padding-right` on `body` and on `.fixed-top`, `.fixed-bottom`, `.is-fixed`, and `.sticky-top`. It subtracts the width from `margin-right` on `.sticky-top` and toggles `body.modal-open`. | `ScrollLock.ts` | Modal | The terrain record's `dialog.showModal.scrollLock` reading shows the platform does not lock scroll |
| Swipe | `Swipe(host, { threshold, handler })`. `handler` receives a `SwipeDirection` of `'left'` or `'right'`. Threshold default: `40`. It adds and removes `.pointer-event`. | `Swipe.ts` | Carousel | Pointer events |
| Sanitizer | `buildSanitizer(allow)` returns a `Sanitizer` built from Bootstrap's allowlist. `writeContent(target, content, options)` writes text, sanitized HTML through `setHTML(html, { sanitizer })`, an element, or the result of `sanitize.filter`. With `sanitize.enabled: false` it writes through `setHTMLUnsafe`. | `helpers.ts` | Tooltip | `Element.setHTML`, `Sanitizer` |
| Template | `buildTip(template, sanitizer): HTMLElement` parses the sanitized template. Filling it is `Tooltip.fill(content)`, keyed by selector, which is Bootstrap's `TemplateFactory` shape. | `helpers.ts` | Tooltip | `setHTML` |
| Reduced motion | `matchesReducedMotion(): boolean` reads the preference on each call | `helpers.ts` | Carousel | `matchMedia` |

This design imports no `@orkestrel/*` package beyond `@orkestrel/contract` (`isInstance`, `literalOf`, `Guard`). The objective lane owns the candidate matrix.

### Events (Unknown 1)

- **Wire names.** The engine dispatches Bootstrap's own names, `{event}.bs.{name}`, which is the `EVENT_KEY` convention. Consumers already subscribe by those names. A Veneer event gets the `.vn.` namespace only where Bootstrap fires no event, which is F6's precedent for `toggle.vn.button`. Dispatching both vocabularies is refused, because each event would then have two terms.
- **Map keys.** Event-map keys mirror Bootstrap's verbs: `show`, `shown`, `hide`, `hidden`, `hidePrevented`, `inserted`, `close`, `closed`, `slide`, `slid`, `activate`. This follows the mirrored-name rule in `names.md` § General vocabulary. Each key's TSDoc names the wire event it mirrors. Each wire table is a frozen constant typed `EventWire<{Entity}EventMap>`, for example `COLLAPSE_EVENTS.show === 'show.bs.collapse'`. `BUTTON_TOGGLE` becomes `BUTTON_EVENTS.toggle`.
- **Detail.** `{Entity}Detail` is a declared wire body that transliterates the fields Bootstrap hydrates onto the event:
  - `relatedTarget` (Dropdown, Tab, ScrollSpy, Modal, Offcanvas, Carousel)
  - `clickEvent` (Dropdown)
  - `direction`, `from`, `to` (Carousel)
  - `pressed` (Button)

  An entity whose Bootstrap events carry no payload (Collapse, Tooltip, Popover, Alert, Toast) declares no detail type, and its events are `CustomEvent<undefined>`. `emitEvent` mirrors each detail field onto the event as an own property, so drop-in code that reads `event.relatedTarget` keeps working. Typed code reads `event.detail`.
- **Cancellation.** `preventDefault()` cancels a pre-change event. "Returning `false` cancels" belongs to jQuery handlers and is refused with the jQuery interface.
- **Proof cell.** A `plugin` row's Proof cell claims the component's browser proof file, for example `tests/src/browser/components/Collapse.test.ts`, and only if the conformance reader admits a non-step value (see Tensions).

### Ownership (Unknown 2)

- **`Data` and one instance per element.** These are carried by `Registry`. A second owner throws `{ENTITY}_HOST_OWNED`, which is the seed's precedent, where Bootstrap would log and return.
- **`getInstance`.** This becomes `static find(host)` on every class. It is one word, typed, and returns `undefined` when absent.
- **`getOrCreateInstance`.** This is refused because it creates implicitly. The explicit form is `Modal.find(host) ?? new Modal(host)`.
- **The `Delegate`.** It uses `find` first and drives a consumer-owned engine, which is Bootstrap's `getOrCreateInstance` result. It owns only what it constructs.

### Delegation (Unknown 3)

One `Delegate` stays the whole data API, with private methods per contract. The alternative, a per-component binder, spreads one data API across a dozen entry points and puts discovery on the consumer.

| Contract | Delegate action |
| --- | --- |
| `data-bs-toggle` = `button`, `collapse`, `dropdown`, `tab`/`pill`/`list`, `modal`, `offcanvas` | Acquires the engine, then calls `toggle` or `show`. The click is prevented for `<a>` and `<area>` hosts only, as each Bootstrap handler does. |
| `data-bs-dismiss` = `alert`, `modal`, `offcanvas`, `toast` | Finds the target (`readTarget`, else `closest('.{name}')`), then calls `close` or `hide` |
| `data-bs-slide`, `data-bs-slide-to` | Acquires Carousel and calls `next`, `previous`, or `to` |
| `keydown` on a dropdown toggle or menu, and on a tab trigger | Acquires the engine, which then handles the key |
| Construction-time scan | `[data-bs-spy="scroll"]` acquires ScrollSpy, `[data-bs-ride="carousel"]` starts cycling, and `.offcanvas.show` shows |
| Modal toggle from a trigger | Hides an already open `.modal.show` first, which is Bootstrap's handler |

**Release on removal.** The Delegate observes its root with `MutationObserver` (`childList`, `subtree`). It observes only while it owns at least one engine, and disconnects when it owns none. In each callback it destroys and releases every owned engine whose host is no longer inside the root.

- A host removed and reinserted within one task keeps its engine and state, because the check runs at the microtask checkpoint.
- A host still absent at that checkpoint is restored then, not at the next click.
- This replaces the release sentence in § Surface and closes audit claim 4.
- Engines a consumer constructed are never released by removal, because their owner destroys them.

### Motion (Unknown 4)

| Case | Behaviour |
| --- | --- |
| No `.fade`, no `.slide`, or no transition | No animation exists, so `settleAnimations` resolves at the next microtask and the completed event follows in that turn |
| Reduced motion | The cascade's `@include transition` yields `transition: none`, so no animation exists. The completed event is not delayed. Script gating covers only work that CSS cannot see: carousel autoplay and smooth scrolling. |
| Second call mid-flight | Ignored and resolves `false`, which is the accepted row. Carousel's `to()` alone queues itself until `slid`, as Bootstrap's `to` does. |
| `destroy()` mid-flight | Aborts. The settle resolves, the completion step sees the aborted signal, and no completed event fires. The promise resolves `false` and `Snapshot` restores the construction state. |
| Animation cancelled (host removed, property reverted) | Counts as settled. The state the classes already name completes, and the completed event fires. |
| Return value | `Promise<boolean>`, created and returned before any await |

`@orkestrel/test`'s `waitForAnimations` stays the proofs' wait. It is not a runtime primitive, because its `1000` ms budget is a fixed fallback.

### Overlays (Unknown 5)

| Concern | Modal and Offcanvas | Dropdown menu, Tooltip tip, Popover tip | Toast and Alert |
| --- | --- | --- | --- |
| Stacking | The cascade's `z-index` ladder, in flow. There is no top layer, so a toast (1090) stays above a modal (1055) as in Bootstrap, and `.offcanvas-lg` stays in flow at its breakpoint. | Top layer through `popover="manual"` for the dropdown menu and the popover tip, and `popover="hint"` for the tooltip. The attribute is added at show and removed after hidden. | In flow. A toast stays in `.toast-container` layout. |
| Focus containment | `Isolation` (`inert` on every branch outside the host), constructed at show and destroyed at hide. Offcanvas isolates only when it has a backdrop or does not scroll, which is Bootstrap's `FocusTrap` condition. | None | None |
| Backdrop | The cascade's own element through `Backdrop` (`.modal-backdrop`, `.offcanvas-backdrop`). There is no `::backdrop`. | None | None |
| Escape and close request | `CloseWatcher` per show. Its `cancel` event routes to `hide` or `hidePrevented`. | Dropdown: `keydown` Escape. Tooltip: the platform's `hint` dismissal, bridged through the cancelable `beforetoggle` into `hide.bs.tooltip`. | None |
| Light dismiss | `mousedown` then `click` on the host itself, which is Bootstrap's check. `'static'` fires `hidePrevented` and bounces `.modal-static`. | The dropdown engine implements `dismiss.inside` and `dismiss.outside` while shown, because `auto` cannot express Bootstrap's `autoClose` matrix | Timer and dismiss contract |
| Scroll lock | `ScrollLock`, except Offcanvas with `scroll: true` | None | None |
| Focus return | On `hidden`, focus returns to the element focused before `show` when it is connected and visible. This is a Veneer addition that also covers the data API's trigger. | Dropdown Escape returns focus to the toggle | None |

### Placement (Unknown 6)

- **What it writes.** `Placement` writes inline declarations on the floating element only: `position-anchor`, `position-area`, `position-try-fallbacks`, `inset: auto`, and the offset margin. On the reference it writes `anchor-name: --vn-anchor-{id}`, with the id from `generateId`. Inline style is used because the value is per-instance geometry and not appearance. `destroy()` restores both elements through `Snapshot`.
- **Bootstrap placement strings** map to physical `position-area` keywords. `auto` becomes a flip fallback list.
- **Dropdown direction.** `--bs-position` is read from the menu's computed style at show, which is ruling R7. `.dropdown-center` and `.dropup-center` centre the menu, which is ruling R9. `.dropend` and `.dropstart` choose the side.
- **The cascade's attribute vocabulary.** `data-popper-placement` on a tip carries the resolved side. `Placement` reads it by rectangle comparison after `toggle` opens, on the anchor's `ResizeObserver`, and on `scrollend`.
- **Static display.** A menu inside `.navbar` or with `placement.static: true` (`display: 'static'`) gets `data-bs-popper="static"`, no anchoring, and no popover attribute. The cascade positions it.
- **Popper-only keys.** `boundary` is accepted in `data-bs-*` and ignored, because the top layer has no clipping parent. `popperConfig` is refused as a TypeScript option and ignored as an attribute. Both are recorded under the existing "accepted difference" sentence.

### Content (Unknown 7)

- `html: false` writes `textContent`.
- `html: true` with sanitizing on writes through `setHTML` with `buildSanitizer(sanitize.allow ?? SANITIZE_ALLOWLIST)`.
- `sanitize.filter`, which is `sanitizeFn`, receives the string and its result still passes through `setHTML`. Veneer is never less safe than the platform's safe baseline.
- `sanitize.enabled: false` writes through `setHTMLUnsafe`, which is the consumer's explicit Bootstrap opt-out.
- The template is sanitized the same way before `buildTip` parses it.
- `@orkestrel/html` and `@orkestrel/template` are not used, because the design works on live elements.

### Options and data attributes (Unknown 9)

Each class merges options in Bootstrap's order: `{ENTITY}_DEFAULTS`, then `data-bs-config` JSON, then the `data-bs-*` keys the entity declares (`parse{Entity}Attributes`), then the constructor object.

- A present attribute that fails coercion throws `AppError` `{ENTITY}_OPTION_INVALID`, which is Bootstrap's `TypeError` in Veneer's form.
- An undeclared `data-bs-*` key is ignored.

Bootstrap keys that are already one word stay verbatim: `parent`, `toggle`, `backdrop`, `focus`, `keyboard`, `scroll`, `animation`, `autohide`, `delay`, `html`, `title`, `content`, `container`, `target`, `interval`, `touch`, `wrap`, `reference`. Compound keys are grouped by entity noun:

| Bootstrap key (attribute) | Veneer option path |
| --- | --- |
| `autoClose` (`data-bs-auto-close`): `true`, `false`, `'inside'`, `'outside'` | `dismiss: { inside, outside }`, two booleans that cover all four modes |
| `backdrop: 'static'`, `keyboard: false` | `backdrop: true` plus `dismiss: { backdrop: false }`, and `dismiss: { escape: false }` |
| `placement`, `offset`, `fallbackPlacements`, `display` | `placement: { position, offset, fallbacks, static }` |
| `delay: number \| { show, hide }` | `delay: { show, hide }`; a number attribute sets both |
| `trigger: 'hover focus'` | `trigger: { hover, focus, click }`; `manual` is all three `false` |
| `sanitize`, `allowList`, `sanitizeFn` (constructor only, as in Bootstrap) | `sanitize: { enabled, allow, filter }` |
| `template`, `customClass` | `tip: { template, class }` |
| `rootMargin`, `threshold`, `offset` (deprecated) | `intersection: { margin, threshold }`; `data-bs-offset` is converted by Bootstrap's formula |
| `smoothScroll` | `smooth` |
| `interval`, `pause: 'hover' \| false`, `ride: true \| 'carousel'` | `cycle: { interval, pause, ride }`, with `ride` typed `'interaction' \| 'load'` and absence meaning no ride |

### Components

Every entity also carries a `host` getter, `destroy()`, `static find(host)`, and an `on` option typed `{Entity}Hooks = EventHooks<{Entity}EventMap>`. Show-type methods return `Promise<boolean>`.

| Class, file | Host | Members | Options | Events (key, then wire) | Detail |
| --- | --- | --- | --- | --- | --- |
| `Button`, `components/Button.ts` | Toggle | `pressed`; `toggle(): boolean` | `on` | `toggle`, `toggle.vn.button` | `pressed` |
| `Collapse`, `components/Collapse.ts` | `.collapse` panel | `shown`; `show`, `hide`, `toggle` | `parent`, `toggle` | `show`, `shown`, `hide`, `hidden` on `.bs.collapse` | none |
| `Dropdown`, `components/Dropdown.ts` | Toggle | `menu`, `shown`; `show`, `hide`, `toggle`, `update` | `dismiss`, `placement`, `reference` | The same set on `.bs.dropdown` | `relatedTarget`, `clickEvent` |
| `Tab`, `components/Tab.ts` | Trigger | `pane`, `active`; `show` | none | The same set on `.bs.tab` | `relatedTarget` |
| `ScrollSpy`, `components/ScrollSpy.ts` | Scroll container | `target`, `active`; `refresh` | `target`, `smooth`, `intersection` | `activate` on `.bs.scrollspy` | `relatedTarget` |
| `Modal`, `components/Modal.ts` | `.modal` | `shown`; `show(trigger?)`, `hide`, `toggle(trigger?)`, `update` | `backdrop`, `dismiss`, `focus` | `show`, `shown`, `hide`, `hidden`, `hidePrevented` on `.bs.modal` | `relatedTarget` |
| `Offcanvas`, `components/Offcanvas.ts` | `.offcanvas` | `shown`; `show(trigger?)`, `hide`, `toggle(trigger?)` | `backdrop`, `dismiss`, `scroll` | The same set on `.bs.offcanvas` | `relatedTarget` |
| `Tooltip`, `components/Tooltip.ts` | Trigger | `shown`, `enabled`; `show`, `hide`, `toggle`, `enable`, `disable`, `fill`, `update` | `animation`, `delay`, `trigger`, `title`, `html`, `tip`, `container`, `placement`, `sanitize` | `show`, `shown`, `hide`, `hidden`, `inserted` on `.bs.tooltip` | none |
| `Popover`, `components/Popover.ts` | Trigger | Inherits Tooltip | Adds `content` | The same set on `.bs.popover` | none |
| `Alert`, `components/Alert.ts` | `.alert` | `close` | none | `close`, `closed` on `.bs.alert` | none |
| `Toast`, `components/Toast.ts` | `.toast` | `shown`; `show`, `hide` | `animation`, `autohide`, `delay` | `show`, `shown`, `hide`, `hidden` on `.bs.toast` | none |
| `Carousel`, `components/Carousel.ts` | `.carousel` | `index`; `next`, `previous`, `to`, `start`, `pause` | `cycle`, `keyboard`, `touch`, `wrap` | `slide`, `slid` on `.bs.carousel` | `relatedTarget`, `direction`, `from`, `to` |

**Why each verb.**

- **Lifecycle vocabulary wins** where a Bootstrap verb is a synonym of a fixed lifecycle verb:
  - `dispose` becomes `destroy`, because it tears the engine down.
  - `cycle` becomes `start`, because it begins or restarts autoplay.
  - `pause` is already the lifecycle verb.
- **Abbreviations are rejected:** `prev` becomes `previous`.
- **Compound methods are reshaped:**
  - `handleUpdate` becomes `update`.
  - `setContent` becomes `fill`, the template fill.
  - `isShown` becomes the `shown` getter.
  - `toggleEnabled` becomes the `enabled` getter plus `enable` and `disable`.
- **`nextWhenVisible`** is internal.
- **Every other verb is Bootstrap's own:** `show`, `hide`, `toggle`, `close`, `next`, `to`, `refresh`, `update`, `enable`, `disable`.

**Popover and Tooltip.** `Popover` extends `Tooltip`, as Bootstrap's does. `Tooltip`'s constructor reads the static `profile` of `new.target`, which holds the name, wire table, defaults, template, and content slots, and `Popover` overrides that static. One trigger, delay, and placement engine therefore serves both, with no protected member.

Collapse is the template for every contract:

```ts
export interface CollapseEventMap {
	/** Mirrors Bootstrap's cancelable `show.bs.collapse` event. */
	readonly show: CustomEvent<undefined>
	readonly shown: CustomEvent<undefined>
	readonly hide: CustomEvent<undefined>
	readonly hidden: CustomEvent<undefined>
}
export type CollapseHooks = EventHooks<CollapseEventMap>
export interface CollapseOptions {
	readonly parent?: HTMLElement
	readonly toggle?: boolean
	readonly on?: CollapseHooks
}
export interface CollapseInterface {
	readonly host: HTMLElement
	readonly shown: boolean
	show(): Promise<boolean>
	hide(): Promise<boolean>
	toggle(): Promise<boolean>
	destroy(): void
}
```

**Guide sections.**

- § Surface: one row per export.
- § Methods: one `#### \`{Entity}Interface\`` table per behavioural interface, the mechanisms included.
- § Examples: one fence per component.
- A `## Engine` section after § Examples, containing:
  - `### Events`
  - `### Delegation`
  - `### Ownership and restoration`
  - `### Motion`
  - `### Focus`
  - `### Placement`
  - `### Content`
  - `### Components`, with one `####` per component giving its host, the table of its `data-bs-*` attributes against option paths, its events, and its departures.
- The § Surface sentence about the Button-shaped mechanisms is removed by the unit that generalizes them.

### The `engine` rows (Unknown 10)

| Row (Obligation cell) | Ruling | Veneer carrier and recorded departure |
| --- | --- | --- |
| `VERSION`, `DATA_KEY`, `EVENT_KEY`, `eventName` | Carry the event-key half, with a departure | The `{ENTITY}_EVENTS` constants. No static `VERSION` or `DATA_KEY`. |
| `Default`/`DefaultType` inherited empty | Carry, with a departure | `{ENTITY}_DEFAULTS` plus TypeScript option types |
| `data-bs-config` merges with `data-bs-*`; config wins last | Carry | `parse{Entity}Attributes` and the merge order |
| Constructor no-op on a falsy element; `dispose()`; `_queueCallback` | Carry, with departures | An invalid host throws `{ENTITY}_HOST_INVALID`; `destroy()`; `settleAnimations` |
| `getInstance`, `getOrCreateInstance`, static `VERSION` | Carry `getInstance` only | `static find(host)`. `getOrCreateInstance` and `VERSION` are refused. |
| `Data.set` on construction | Carry | `Registry.claim` |
| Methods asynchronous; a call mid-transition is ignored | Carry | `Promise<boolean>`; a mid-flight call resolves `false` |
| `dispose()` must not follow `hide()` immediately | Departure: the restriction is lifted | `destroy()` mid-flight aborts and restores |
| Paired events; `new Event(…, { bubbles, cancelable: true })`; hydrated | Carry, with a departure | `CustomEvent` with `detail` and mirrored own properties |
| Infinitive cancelable by `preventDefault`; `return false` cancels | Carry the first half; refuse the second | `emitEvent`'s return value; `return false` is jQuery handler semantics |
| `_mergeConfigObj` order and `_typeCheckConfig` | Carry | The merge order; `{ENTITY}_OPTION_INVALID` |
| `Manipulator.getDataAttributes` | Carry, with a departure | Only declared keys are read |
| `SelectorEngine` | Carry `getSelector`, `getElementFromSelector`, `getMultipleElementsFromSelector`, and `focusableChildren`; refuse the rest as public API | `readTarget`, `readTargets`, `collectFocusable`; native `querySelector` and `closest` |
| `Data.set`/`get`/`remove`; a second key errors | Carry | `Registry`; a second owner throws |
| `enableDismissTrigger` | Carry | The Delegate's dismiss contract |
| `TRANSITION_END` emulation after the duration plus `5` ms | Refuse (the construction paragraph's fixed-fallback refusal) | `settleAnimations` replaces it |
| Sanitizer allowlist and `sanitizeFn` | Carry | `buildSanitizer`, `writeContent`, `sanitize.filter` |
| Native `querySelector`; escape special characters | Carry | `readTarget` escapes through `CSS.escape` |
| Base `Config` class | Refuse the class | Typed options and parsers |
| `getUID` … `getNextActiveElement` | Carry each named utility except `isRTL`, `toType`, `noop`, `execute`, and `findShadowRoot` | Carried: `generateId`, `isHost`, `checkVisibility()`, `reflow`, `readTarget`, `computeNeighbor`. `isRTL` is refused by D5; `toType`, `noop`, `execute`, and `findShadowRoot` are refused because the JavaScript they compensate for is unnecessary in typed code. |
| `getjQuery`, `defineJQueryPlugin` | Refuse | Covered by the jQuery exclusion paragraph |

Every refused row keeps Status `accepted` and joins the exclusion paragraph, because the reader admits only `accepted` and `shipped` (R8). Carried rows flip to `shipped` with a Proof cell when their carrier lands.

## Alternatives

1. **A Bootstrap-shaped port.** This means a `BaseComponent` base class, a `Data` registry with static `getOrCreateInstance`, `z-index` overlays, a `focusin` bounce `FocusTrap`, and `transitionend` with duration emulation.
   - **Gain:** it maximizes literal parity.
   - **Why it loses:** it needs `protected` members and two-word statics, keeps `dispose` and `cycle` against the lifecycle vocabulary, restores the refused fixed fallback, and ignores D41's native-first ruling.
2. **A native-element engine in the Elements shape.** This means `<details>` for Collapse, `<dialog>` with `showModal()` for Modal, `<aside popover="auto">` for Offcanvas, and Elements-style event names.
   - **Gain:** it needs the least script.
   - **Why it loses:** it breaks the Bootstrap markup and wire contracts the product tenets require, and the baseline's cascade paints Bootstrap's class vocabulary rather than those tags.

The design wins because it keeps every contract a consumer writes against and moves every mechanism underneath onto the platform. Each departure is small, named, and proved.

## Constraints

## Refusals

## Measurements

## Units

**Routing reason.** Every unit proves its component in Chromium, and the Codex bench sandbox denies the browser (ROADMAP § Phases and units, F8d row). So no browser-proved unit routes to `sol`, and that is recorded as the reason. Judgment-bearing units run on `opus` on Opus 5.5. J-ROWS alone is fully specified and runs on `builder` on Sonnet.

**Shared (report-only) for every unit:** `src/browser/index.ts`, `constants.ts`, `helpers.ts`, `validators.ts`, `parsers.ts`, `Delegate.ts` (after J-BINDER), `src/browser/types.ts` (after J-TYPES; a gap becomes a successor brief), `tests/setup.ts`, `tests/setupBrowser.ts`, `guides/veneer.md`, and `tests/src/browser/index.test.ts`. Each unit returns exact patches for these, and the Orchestrator integrates them serially.

**Off-limits for every unit:** `app/**`, `src/styles/**`, the vendored files, and `configs/**`.

| Unit | Role, engine | Wave | Depends on | Owned files |
| --- | --- | --- | --- | --- |
| J-TYPES | `opus`, Opus 5.5 | 0 | — | `src/browser/types.ts`, `src/core/types.ts`, and the guide's § Surface rows for every type |
| J-BINDER | `opus`, Opus 5.5 | 1 | J-TYPES | `Registry.ts`, `Snapshot.ts`, `components/Button.ts` (moved), `Delegate.ts`, and their tests; `bindEventMap` and `isHost` in the leaf files |
| J-COLLAPSE | `opus`, Opus 5.5 | 2 | J-BINDER | `components/Collapse.ts` and its test, `parsers.ts` (created), and the helpers `emitEvent` (cancelable), `settleAnimations`, `reflow`, `readTarget`, `readTargets`, `generateId` |
| J-TAB | `opus`, Opus 5.5 | 3 | J-COLLAPSE | `components/Tab.ts`; `collectFocusable` and `computeNeighbor` |
| J-ALERT | `opus`, Opus 5.5 | 3 | J-COLLAPSE | `components/Alert.ts`; the Delegate's dismiss contract |
| J-MODAL | `opus`, Opus 5.5 | 3 | J-COLLAPSE | `components/Modal.ts`, `Backdrop.ts`, `Isolation.ts`, `ScrollLock.ts` |
| J-CAROUSEL | `opus`, Opus 5.5 | 3 | J-COLLAPSE | `components/Carousel.ts`, `Swipe.ts`; `matchesReducedMotion` |
| J-DROPDOWN | `opus`, Opus 5.5 | 4 | J-TAB | `components/Dropdown.ts`, `Placement.ts` |
| J-TOAST | `opus`, Opus 5.5 | 4 | J-ALERT | `components/Toast.ts` |
| J-OFFCANVAS | `opus`, Opus 5.5 | 4 | J-MODAL | `components/Offcanvas.ts` |
| J-SCROLLSPY | `opus`, Opus 5.5 | 4 | J-CAROUSEL | `components/ScrollSpy.ts` |
| J-TOOLTIP | `opus`, Opus 5.5 | 5 | J-DROPDOWN | `components/Tooltip.ts`; `buildSanitizer`, `buildTip`, `writeContent`, `SANITIZE_ALLOWLIST`, `TOOLTIP_TEMPLATE` |
| J-POPOVER | `opus`, Opus 5.5 | 6 | J-TOOLTIP | `components/Popover.ts`; `POPOVER_TEMPLATE` |
| J-ROWS | `builder`, Sonnet | 7 | Every preceding unit | The Status, Proof, and Obligation cells of every `engine` and `plugin` row, and the exclusion paragraph |

Every owned file set includes its mirrored test under `tests/src/browser/`, its guide `####` subsection under `## Engine`, and its § Methods table.

**Acceptance for every unit, cheapest check first:**

1. `npm run check` is clean over the owned files.
2. `npm run lint:check` is clean over the owned files.
3. `tests/src/browser/index.test.ts` lists the export set exactly.
4. `npm run test:guides` and `npm run test:policy` are green over the patch.
5. The unit's browser proofs ran red before green. The report records the exact command and the failing count, and names the mutation each assertion distinguishes.
6. The unit's `plugin` row flips to `shipped` only when its family's cascade is on `main`. Otherwise the report names the row as pending.

**Acceptance specific to each unit:**

- **J-TYPES:** every public contract of the preceding Components and Shared mechanisms tables exists and typechecks, with a § Surface row whose Summary equals its TSDoc.
- **J-BINDER:**
  - Button's existing proofs pass on `Registry`, `Snapshot`, and the generic binder.
  - The Delegate case that restores on a later click is rewritten as release at the microtask checkpoint. The mutation is the observer removed, which the proof must catch.
  - The same-task reinsert case keeps the engine.
  - The § Surface sentence about the Button-shaped mechanisms is replaced.
- **J-COLLAPSE:**
  - Button's `toggle.vn.button` proof reads `cancelable: true`.
  - The navbar toggler (`data-bs-toggle="collapse"` on `.navbar-toggler`) is proved. This closes the Carriers row for container and navigation combinators.

**Proof matrix.** Each cell is the proof, then the mutation it distinguishes. Every proof runs in Chromium 153.0.8010.12 under `tests/src/browser/components/`.

| Component | Lifecycle | Cancellation | Focus | Motion | Cleanup |
| --- | --- | --- | --- | --- | --- |
| Collapse | `collapsing` with an inline pixel height mid-flight, then `collapse show` with the height cleared and triggers set to `aria-expanded="true"` without `collapsed`. An accordion `parent` hides the open sibling with that sibling's own events. Mutation: skipping the `collapsing` phase; hiding the sibling without its events. | A prevented `show` or `hide` leaves classes, height, and triggers untouched, resolves `false`, and fires no completed event. A call while `collapsing` resolves `false`. Mutation: ignoring `emitEvent`'s return value; dropping the mid-flight guard. | The active element is the trigger before and after. Mutation: focusing the panel. | `shown` fires after the staged `height` transition's `finished` resolves, and `getAnimations()` is empty at the event. Under staged reduced motion it fires with no animation created. Mutation: a zero timer (event fires before `finished`); a `transitionend` wait (the reduced-motion case exceeds its budget). | `destroy()` mid-flight fires no `shown`, resolves `false`, restores classes, height, and trigger attributes, leaves no listener (`recordListeners`), and `find()` returns `undefined`. A later call writes nothing. Mutation: omitting the abort. |
| Dropdown | `show` on toggle and menu, `aria-expanded`, anchor declarations present, `:popover-open`. `--bs-position: end` selects end. A navbar menu gets `data-bs-popper="static"` and no anchor. Mutation: ignoring `--bs-position`; anchoring inside a navbar. | Prevented `show` and `hide`. Each of the four `dismiss` combinations is driven by trusted clicks inside and outside. The `hide` detail carries `clickEvent`. Mutation: inverting `inside`. | ArrowDown on a closed toggle opens the menu and focuses the first item. ArrowUp wraps to the last item. Escape closes and focuses the toggle. Mutation: no wrap; no focus return. | `shown` fires in the same task as `show()` with a staged menu transition present, which is Bootstrap's no-wait. Mutation: awaiting the menu's animations. | `destroy()` while open closes the menu, removes `anchor-name` and the inline declarations, and removes document listeners (a later outside click changes nothing). Mutation: leaving the document listener. |
| Tab | `active`, `aria-selected`, and `tabindex` move to the host. The pane gets `active`, then `show` after the fade. Roles are written. Mutation: the previous pane is left active. | A prevented `show` on the target or `hide` on the previous tab aborts the swap. Mutation: checking only `show`. | Arrow keys, Home, and End focus and activate the next enabled trigger with `preventScroll`; disabled triggers are skipped. Mutation: including disabled triggers. | With `.fade`, `shown` follows the pane animation. Without it, `shown` is immediate. Mutation: always waiting. | `destroy()` restores roles and attributes and removes `keydown`. Mutation: leaving `keydown`. |
| ScrollSpy | Real scrolling activates the section's link, its parent nav link, and a dropdown toggle, and fires `activate` with `relatedTarget`. The section chosen follows the scroll direction. Mutation: choosing by DOM order. | A prevented `activate` still activates, matching Bootstrap. Mutation: honouring the prevention. | A link click with `smooth` scrolls without moving focus. Under reduced motion `behavior` is `auto`. Mutation: smooth scrolling under reduced motion. | Activation reads `IntersectionObserver` records with no scroll listener. Mutation: polling `scroll`. | `destroy()` disconnects the observer (later scrolling changes nothing) and removes the classes it added. Mutation: keeping the observer. |
| Modal | Backdrop `.fade.show`, `display: block`, `aria-modal`, `role`, `show`, and `body.modal-open`. `scrollTo(0, 500)` leaves the document where it was. Siblings are inert. `hide` reverses all of it and removes the backdrop. Mutation: no `ScrollLock` (the terrain record's `dialog.showModal.scrollLock` reading returns). | Prevented `show` and `hide`. A static backdrop click and Escape with `dismiss.escape: false` fire `hidePrevented` and bounce `modal-static`; preventing `hidePrevented` skips the bounce. Mutation: hiding on a static click. | The modal holds focus after `shown`, and an outside button cannot take focus. After `hidden`, focus returns to the previous element. Mutation: no `Isolation`. | `shown` follows the `.modal-dialog` transform. Without `.fade` it is immediate. Mutation: waiting on `.modal` instead of `.modal-dialog`. | `destroy()` while open removes the backdrop and restores inert, scroll, the body class, and attributes; the `CloseWatcher` is destroyed. Mutation: leaving one sibling inert. |
| Offcanvas | `showing`, then `show`, then `hiding` in order. The backdrop goes into the parent. `scroll: true` neither locks nor isolates without a backdrop. Mutation: always locking. | As Modal, including `hidePrevented`. | As Modal, conditioned on `backdrop` or not `scroll`. Mutation: isolating with `scroll: true` and no backdrop. | `shown` follows the slide transition. Mutation: completing at `showing`. | As Modal. Mutation: leaving `showing`. |
| Tooltip | Hover or focus inserts a tip with `role="tooltip"`, an id, the trigger's `aria-describedby`, and `title` moved to `data-bs-original-title`. `inserted` fires, then `shown`. `data-popper-placement` equals the side the flip fallback chose near a staged edge. Mutation: an attribute that ignores the flip. | Prevented `show` inserts no tip. A prevented `hide` keeps the tip. A platform `hint` dismissal is refused through `beforetoggle`. Sanitizing removes `<script>`, `onclick`, and `javascript:`; `filter` applies; `html: false` writes text. Mutation: ignoring `beforetoggle`; skipping the sanitizer. | The tip never takes focus. `focusout` hides; Escape hides. Mutation: focusable tip content. | `animation` or `.fade` waits on the tip; `animation: false` is immediate. Mutation: waiting with `animation: false`. | `destroy()` removes the tip, restores `title`, `aria-describedby`, and `anchor-name`, and cancels a pending delayed show, which never fires. Mutation: leaving the delay timer. |
| Popover | The click trigger toggles. The title fills `.popover-header` and the content fills `.popover-body`; the header is removed when empty. Mutation: keeping an empty header. | As Tooltip, on `.bs.popover`. Mutation: dispatching `.bs.tooltip` names. | Interactive content stays operable inside an open Modal (the container is inside the isolated host). Mutation: appending to `body`. | As Tooltip. | As Tooltip. |
| Alert | `close` removes `show`, waits on `.fade`, removes the element, and fires `closed` on it. Mutation: removing before the transition. | A prevented `close` keeps the element and classes. Mutation: ignoring the return value. | Closing moves no focus and writes no `tabindex`. Mutation: focusing a neighbour. | Without `.fade` the removal is immediate. Mutation: always waiting. | `destroy()` without closing restores the host and releases the registry claim. Mutation: releasing no claim. |
| Toast | `fade` added when `animation` is set, then `showing` and `show`. `autohide` hides after `delay`. Mutation: starting the timer before `shown`. | Prevented `show` and `hide`. Mutation: ignoring the return value. | `focusin` and pointer hover pause `autohide`; leaving resumes it. Mutation: no pause. | Under `animation: false`, `shown` is immediate. Mutation: waiting anyway. | `destroy()` clears the timer (no `hide` fires later). Mutation: leaving the timer. |
| Carousel | `next` fires `slide` with `direction: 'left'`, `from`, and `to`. `carousel-item-next` is followed by `carousel-item-start`. `slid` fires. Indicators get `aria-current` and `active`. `wrap: false` stops at the ends. Mutation: a wrong `direction`. | A prevented `slide` keeps the active item. `to()` mid-slide runs after `slid`. Mutation: dropping the queued `to`. | ArrowLeft and ArrowRight move the deck, except from `input` and `textarea`. `keyboard: false` ignores both. A trusted pointer drag past the threshold moves the deck. Mutation: handling keys from `input`. | `.slide` waits on the active item's transition; without it the move is immediate. Under reduced motion, `start` does not cycle. Mutation: cycling under reduced motion. | `destroy()` stops the interval, removes `.pointer-event` and every listener, and restores classes. Mutation: leaving the interval. |

**Exit criterion.** The campaign ends when each capability in the following list ends implemented, retained, or excluded on evidence. The list is checked against the kickoff brief's § Acceptance criteria.

1. Every public engine contract is in `src/browser/types.ts`, and `src/core/types.ts` is ruled unchanged or extended.
2. The event mechanism is implemented: Bootstrap wire names, hydration, and the generic binder.
3. Ownership and restoration are implemented: `Registry`, `Snapshot`, and `find`.
4. Delegation is implemented with release on removal.
5. Transition completion is implemented, and `TRANSITION_END` and the fixed fallback stay excluded.
6. Focus is implemented: the rove helpers, `Isolation`, and focus return.
7. Placement is implemented, and Popper's `boundary` and `popperConfig` stay excluded as accepted differences.
8. `Backdrop` and `ScrollLock` are implemented.
9. `Swipe` is implemented.
10. Sanitizer and template are implemented.
11. Each plugin obligation (Collapse, Dropdown, Tab, ScrollSpy, Modal, Offcanvas, Tooltip, Popover, Alert, Toast, Carousel) is implemented with its proof-matrix row.
12. Every `engine` row is ruled.
13. Every `plugin` row reads `shipped` after its cascade lands, or is retained pending with the baseline as the named gate.
14. Every `@orkestrel/*` candidate is ruled, with the user's ruling recorded.
15. `./browser/auto`, the jQuery rows, and `isRTL` stay excluded.
16. The guide's engine sections are true of what shipped and the gates are green.

J-SHOWCASE and E-VUE are excluded from this campaign by the kickoff brief's observations.

## Tensions

- **Unknown 1: all events are cancelable.** Completed events carry `cancelable: true`, a flag Bootstrap sets and never honours. This is parity against honesty, and I chose parity. The other lane can argue for `cancelable: false` on completed events with a departure row.
- **Unknown 1: hydrated properties.** Mirroring detail fields as own properties on a `CustomEvent` keeps drop-in reads working. It also stores the same fact twice. The alternative is `detail` alone, with a recorded incompatibility the user rules on.
- **Unknown 1: mirrored event keys.** The event-map keys `shown`, `hidden`, and `hidePrevented` rely on the mirrored-name rule, not on the one-word present-tense event rule.
- **Unknown 1: the Proof cell.** The format of a `plugin` row's Proof cell depends on how `tests/conformance.test.ts` parses Proof values, and the baseline owns that file. Each plugin unit reads the parser before it edits a row. A dash plus a proof path inside the Obligation cell is the fallback.
- **Unknown 2: statics.** The static `find` and the static `profile` add static public members, which Bootstrap also has. The alternative is lookup on the Delegate alone, which leaves consumer-constructed engines unfindable.
- **Unknown 3: one Delegate.** The single Delegate imports every component, so a consumer cannot tree-shake the data API. I rank drop-in behaviour above bundle size. Per-component static routes are the alternative the other lane can press.
- **Unknown 4: promises.** `Promise<boolean>` returns diverge from Bootstrap's `undefined` returns. They are additive, but a consumer's floating-promise lint can flag bare calls.
- **Unknown 5: the top layer.** Floating surfaces go to the top layer and Modal and Offcanvas stay in flow. That is a fit judgment on toast-over-modal order, `.offcanvas-lg`, and the backdrop element. The top layer depends on a cascade reset of the UA `[popover]` defaults, which is the baseline's file (see Risks).
- **Unknown 5: `inert` against Bootstrap's `focusin` bounce.** `inert` is stronger for accessibility. It forces the tip-container rule (the nearest `[aria-modal="true"]` ancestor, else `body`) and leaves siblings inserted after `show()` outside isolation.
- **Unknown 5: Tooltip as `hint`.** A `hint` tooltip adds Escape and outside-click dismissal, which WCAG 1.4.13 asks for and Bootstrap lacks. Popover stays `manual` for parity.
- **Unknown 5: focus return.** Focus returns to the previously focused element for programmatic `show()` too. This is a Veneer addition.
- **Unknown 6: resolving the side.** Placement reads the resolved side by comparing rectangles on events. An anchored container query (`@container anchored(fallback: …)`) could replace the reading if Chromium 153 ships it. That is a probe for the Orchestrator.
- **Unknown 7: the `aria-*` allowlist.** Bootstrap's `'*'` allowlist admits `aria-*` by regular expression, and `SanitizerConfig` lists names, not patterns. The design needs a probe on whether the safe baseline keeps `aria-*` attributes. If it does not, `buildSanitizer` expands the pattern against each input's attribute names read from an inert parse.
- **Unknown 8: the folder name.** `components/` is a judgment. `engines/` is the rival name. The mechanisms stay flat because each is a lone class of its own kind.
- **Unknown 9: coercion failure.** An attribute that fails coercion throws, matching Bootstrap's `TypeError`. The alternative ignores bad attributes silently.
- **Unknown 10: refused rows.** Refused rows stay `accepted` under the exclusion paragraph, because the reader admits only `accepted` and `shipped` (R8).
- **Core types.** `src/core/types.ts` gains nothing, against the brief's expectation that both files change.

**Probes the design needs that the terrain record lacks:**

- The computed `border`, `padding`, `background-color`, `inset`, `margin`, and `overflow` of `.dropdown-menu[popover]`, `.tooltip[popover]`, and `.popover[popover]` while `:popover-open` in the built cascade.
- Whether `getAnimations()` returns the `CSSTransition` in the same task as the class change without an explicit `reflow`.
- Whether `CloseWatcher`'s `cancel` event is cancelable after a programmatic `show()` with no user activation.
- Whether `Object.defineProperty` of `relatedTarget` on a `CustomEvent` reads back in a listener attached at the document.
- The `MutationObserver` release timing under `Element.moveBefore`.
- Whether `setHTML`'s safe baseline keeps `aria-*` attributes.
- Support for anchored container queries.

## Risks

- **The top layer depends on the baseline's cascade.** The UA `[popover]` defaults would paint a border, padding, and `Canvas` background on the tip and menu. Veneer's cascade carries no `[popover]` reset: a search for `\[popover|:popover-open|\.modal\b|\.dropdown-menu\b` over `veneer/src/styles` matched only `_input-group.scss`. Settle it with the computed-style probe. The fix is a pending shared change recorded against the baseline's `dropdown`, `tooltip`, and `popover` keys. If the user refuses it, `Placement` falls back to anchoring without promotion.
- **Isolation gaps.** An element inserted after `show()`, such as a toast or a `body`-appended tip, escapes isolation. Settle it with a proof that inserts a sibling after `shown` and reads whether it can take focus. If it can, `Isolation` observes the body's children.
- **The Proof-cell format.** A unit that edits a row blind can redden `tests/conformance.test.ts`. Settle it by reading the parser before the first flip, in J-COLLAPSE.
- **Fidelity of `aria-*` sanitizing.** Settle it with the allowlist probe.
- **Delegate bundle cost.** Settle it with the built `./browser` entry's size before and after J-POPOVER, read from `npm run build`.
- **Observer cost on large documents.** Observing the document subtree costs a callback per mutation batch. Settle it with a bench block that measures callback cost at a named document size, in J-BINDER.
- **Serial integration of shared files.** Parallel waves share `Delegate.ts`, `helpers.ts`, and the guide. A patch that conflicts in integration becomes a successor brief. Settle it by assigning each new helper to one unit, which the Units table already does.
- **Plugin rows that cannot flip.** A row cannot flip until the baseline lands its family. Settle it by reading `origin/main` at each landing under the intersession protocol and carrying the row as pending with a named gate.
- **Reading completion from animations.** A transition that starts in the frame after a class change would be missed. Settle it with the same-task `getAnimations()` probe. The `reflow` step between class writes is the remedy.

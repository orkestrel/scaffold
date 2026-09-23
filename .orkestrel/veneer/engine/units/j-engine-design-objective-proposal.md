# J-ENGINE-DESIGN — the objective lane's proposal (returned 2026-09-23 by analyst on GPT-6 Astra, gpt-6-astra at high effort, read-only codex exec)

Thread `01a0cef3-7aaf-7633-9ab6-144be5d76cc4`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-engine-design.jsonl` (launch copy under `tmp/codex/`); 59 commands; 1321 s; usage {"input_tokens":5110111,"cached_input_tokens":4830720,"cache_write_input_tokens":0,"output_tokens":29635,"reasoning_output_tokens":8365}. Retained verbatim from the exec's last message.

---

Objective lane — analyst, GPT-6 Astra.

## Design

## Alternatives

## Constraints

Paths below are relative to `C:/Users/mikes/WebstormProjects/veneer-engine/`, unless stated otherwise. Bootstrap source references are relative to `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/`.

The engine preserves Bootstrap’s observable component behavior where the native platform and the governing rulings permit it. Source implementation details, public method spellings, and browser behavior are separate obligations. A departure must identify which obligation changes; native API availability alone does not prove compatibility.

**Contracts and ownership**

All public contracts land first in `src/browser/types.ts` and `src/core/types.ts`.

- `src/browser/types.ts` declares each component’s `{Entity}Interface`, `{Entity}Options`, `{Entity}EventMap`, `{Entity}Hooks`, and `{Entity}Detail`; shared mechanism contracts; foreign Bootstrap wire formats; and structural contracts for measured browser APIs missing from the installed DOM declarations.
- `src/core/types.ts` holds only host-independent vocabulary, including transition outcomes and placement discriminants. DOM hosts, events, observers, and sanitizer capabilities remain browser contracts.
- Options and returned collections are readonly. Optional absence is `undefined`. Constructors validate before acquiring ownership or mutating a host.
- Construction requires a real host. Invalid hosts throw `AppError`; Bootstrap’s partially initialized, missing-element constructor is excluded.
- Each concrete component maintains a private, weak, per-class registry. `instance(host)` retrieves its live owner; a second construction of that class on that host throws before mutation. Different components may share a host when their owned state does not conflict.
- `destroy()` restores owned attributes, class tokens, inline declarations, moved content, listeners, and resources. It preserves unrelated consumer edits. Registry release and destruction are idempotent.
- Public lifecycle methods return immediately. Completed events provide completion notification. The internal transition mechanism returns a promise with a typed outcome.
- Every operation checks liveness again after synchronous consumer callbacks. A listener can destroy an entity during its pre-change event without allowing subsequent mutation.

This deliberately replaces `Data`’s cross-component exclusion and console error with per-component ownership and a typed error: `dom/data.js:15–30`; `base-component.js:24–49`.

**Wire events**

Dispatch Bootstrap names for Bootstrap plugin obligations. Do not dispatch parallel `.vn` aliases. Preserve `toggle.vn.button` as the existing addition: Bootstrap Button has no corresponding lifecycle event (`button.js:36–43`).

In the tables, `show/shown.bs.collapse` means the two exact names `show.bs.collapse` and `shown.bs.collapse`.

Bootstrap events bubble and have `cancelable: true`, including completed events. Only pre-change cancellation prevents the operation; cancellation of a completed notification cannot undo committed state. Publish typed `CustomEvent` detail and Bootstrap’s applicable top-level payload fields, including `relatedTarget`, `clickEvent`, `direction`, `from`, and `to`.

The typed `on` map uses one-word domain names: `show`, `open`, `hide`, `close`, `prevent`, `insert`, `activate`, `slide`, `change`, and `remove`, as applicable. The binder translates these to foreign wire names. A hook returning `false` invokes `preventDefault()`; a native listener’s return value has no effect. Bootstrap’s native handler wrapper also does not turn a returned `false` into cancellation (`dom/event-handler.js:90–99,259–296`). The guide’s unqualified claim needs correction.

**Plugin obligations**

| Component and home | Native system and source boundary | Permitted behavior, wire events, and recorded departure |
|---|---|---|
| **Collapse** — `src/browser/Collapse.ts` | CSS state classes, measured dimensions, native animation objects. Terrain: `getAnimations`, `transition.getAnimations`, `transition.reducedMotionZero`; `collapse.js:60–86,111–204,218–253`. | Preserve horizontal sizing, parent accordion exclusion, nested-collapse isolation, multiple triggers, and `aria-expanded`. Methods: `show`, `hide`, `toggle`, `destroy`; static `instance`. Events: `show/shown.bs.collapse`, `hide/hidden.bs.collapse`. Use the consumer’s existing element. `<details>` cannot replace arbitrary collapse markup, and `details.beforetoggle="none"` cannot supply the required pre-change veto. Explicit pixel sizing remains valid; intrinsic-size support is not a requirement to rewrite the cascade. |
| **Dropdown** — `src/browser/Dropdown.ts` | Manual Popover API, CSS anchor positioning, native keyboard/pointer events. Terrain: `popover.showPopover`, anchor keys; `dropdown.js:124–209,248–327,356–446`. | Preserve disabled guards, trigger focus, arrows/Escape, form and Tab exceptions, inside/outside/false automatic dismissal, `relatedTarget` and `clickEvent`. Methods: `show`, `hide`, `toggle`, `update`, `destroy`; `instance`. Events: `show/shown.bs.dropdown`, `hide/hidden.bs.dropdown`. Dynamic menus enter the top layer; static/navbar menus retain their cascade layout. Native collision behavior replaces Popper’s positioning engine, with the limits below. |
| **Tab** — `src/browser/Tab.ts` | DOM focus, native keyboard events, ARIA, cascade classes and animation promises; `tab.js:58–75,80–175,188–244`. | Preserve both outgoing `hide.bs.tab` and incoming `show.bs.tab` before committing; either veto stops the switch. Preserve reciprocal `relatedTarget`, roving tabindex, Home/End and arrow navigation, pane activation, dropdown state, and disabled exclusion. Methods: `show`, `destroy`; `instance`. Completion names: `hidden.bs.tab`, `shown.bs.tab`. No hidden replacement navigation model. |
| **ScrollSpy** — `src/browser/ScrollSpy.ts` | `IntersectionObserver`, root scrolling and native smooth scrolling. Terrain: `IntersectionObserver`, `scrollend`; `scrollspy.js:68–159,163–256`. | Preserve target resolution, visible section filtering, direction-sensitive activation, ancestor/dropdown activation, refresh, thresholds and root margins. Methods: `refresh`, `destroy`; `instance`. Event: `activate.bs.scrollspy`, with `relatedTarget`. This notification has no cancelable pre-change counterpart. Preserve the source’s truthy `offset` conversion, including its zero behavior (`:118`), rather than the broader terrain paraphrase. No `scrollspy` cascade key is invented. Reduced motion changes smooth scrolling to immediate scrolling. |
| **Modal** — `src/browser/Modal.ts` | Manual popover on the consumer host; `inert`, shared focus containment, `CloseWatcher`, a separate cascade backdrop, shared scroll locking, native animation promises. Terrain: popover, inert, CloseWatcher and dialog measurements; `modal.js:98–203,207–289,296–310`. | Preserve cancelable show/hide, related trigger, static-backdrop prevention feedback, focus option, Escape option, body locking, overflow adjustment, and completion after dialog/backdrop motion. Methods: `show`, `hide`, `toggle`, `update`, `destroy`; `instance`. Events: `show/shown.bs.modal`, `hide/hidden.bs.modal`, `hidePrevented.bs.modal`. Top-layer ordering replaces z-index competition. Do not require conversion of `.modal` into `<dialog>`; record that this path is not native `:modal`. |
| **Offcanvas** — `src/browser/Offcanvas.ts` | The same overlay mechanisms, with offcanvas-specific policy; `offcanvas.js:93–157,167–208,232–271`. | Preserve backdrop/static behavior, keyboard option, scroll option, focus condition `!scroll || backdrop`, showing/hiding classes and responsive dismissal. Methods: `show`, `hide`, `toggle`, `destroy`; `instance`. Events: `show/shown.bs.offcanvas`, `hide/hidden.bs.offcanvas`, `hidePrevented.bs.offcanvas`. Reject repeated operations while transitioning consistently with the cross-cutting contract; this is stricter than the source’s `_isShown`-only guard. |
| **Tooltip** — `src/browser/hints/Tooltip.ts` | Shared `Hint`, manual popover, native anchors, native sanitizer and DOM template filling; `tooltip.js:58–98,184–281,303–365,373–483,486–597`. | Preserve title migration/restoration, accessible description, enable/disable, hover/focus/click/manual triggers, independent active-trigger tracking, delay, insertion notification, container, template and content replacement. Methods: `show`, `hide`, `toggle`, `enable`, `disable`, `update`, `fill`, `destroy`; `instance`. Events: `show/shown.bs.tooltip`, `hide/hidden.bs.tooltip`, `inserted.bs.tooltip`. `fill` replaces `setContent`; no alias. Top-layer and sanitizer differences are recorded below. |
| **Popover** — `src/browser/hints/Popover.ts` | The same native hint engine, with popover template, title/content slots and defaults; `popover.js:20–69`. | Same lifecycle methods and event family under `.bs.popover`, including `inserted.bs.popover`. Preserve click default, right placement, `[0,8]` offset and removal of empty slots. Shared behavior lives in `src/browser/hints/Hint.ts`; the sibling classes enforce different contracts and defaults rather than duplicating overlay logic. |
| **Alert** — `src/browser/Alert.ts` | DOM removal, cascade fade and animation promises; `alert.js:37–55`. | Methods: `close`, `destroy`; `instance`. Events: `close.bs.alert`, `closed.bs.alert`. A veto prevents removal. `closed` fires on the removed host, as upstream does; listeners on its former ancestor cannot be used as the sole recorder. Successful `close` intentionally removes the alert; later destruction does not reinsert it. |
| **Toast** — `src/browser/Toast.ts` | Ordinary document flow, native interaction events, owned timeout and animation promises; `toast.js:75–120,138–195`. | Preserve `.toast-container` flow, animation/autohide/delay options, hover and focus suspension, descendant-focus handling and rearming. Methods: `show`, `hide`, `destroy`; `instance`; readonly `visible`. Events: `show/shown.bs.toast`, `hide/hidden.bs.toast`. Do not promote each toast to the top layer: that changes the container’s layout contract without a corresponding obligation. The lifetime timer never determines motion completion. |
| **Carousel** — `src/browser/Carousel.ts` | Native keyboard and pointer events, shared Swipe, cascade transforms, visibility checks, policy timers and animation promises; `carousel.js:105–195,219–245,254–383`. | Preserve indicators, interval overrides, wrapping, indexed selection, keyboard exclusions, hover pause, touch navigation and event payload. Methods: `next`, `prev`, `select`, `start`, `pause`, `resume`, `stop`, `destroy`; `instance`. Events: `slide/slid.bs.carousel`. `start` replaces `cycle`, `select` replaces `to`; no aliases. Mid-transition requests are ignored, departing from `to()`’s queued retry (`:175`). Reduced motion suppresses automatic cycling while retaining explicit navigation. No RTL work or scroll-snap rewrite. |

**Options and data attributes**

Read configuration on explicit construction, not exclusively through `Delegate`. Normalize foreign wire keys before applying the typed constructor options. Preserve source precedence: defaults, permitted `data-bs-config`, individual `data-bs-*`, constructor options. Explicit `false` and zero survive merging. Validate the final values before mutation.

Tooltip and Popover are an important exception: `tooltip.js:539–555` filters security attributes and calls `_mergeConfigObj` without the element. Their implementation does not consume `data-bs-config` through the ordinary Config path. Preserve that exception; do not introduce a JSON route around the security-option restriction.

| Entity | Typed option groups; foreign mappings |
|---|---|
| Collapse | `parent`, `toggle` |
| Dropdown | `menu.close` ← `autoClose`; `display`; `anchor.reference`, `anchor.placement`, `anchor.offset`, `anchor.boundary`, `anchor.config` ← applicable positioning keys and `popperConfig` |
| Tab | Shared `signal` and `on`; no fabricated Bootstrap options |
| ScrollSpy | `target`, `offset`, `observer.margin` ← `rootMargin`, `observer.threshold`, `scroll.smooth` ← `smoothScroll` |
| Modal | `backdrop`, `focus`, `keyboard` |
| Offcanvas | `backdrop`, `keyboard`, `scroll` |
| Tooltip | `animation`, `title`, `trigger`, `selector`, `delay.show`, `delay.hide`, `html`; `surface.container`, `surface.class`, `surface.template`; `anchor.placement`, `anchor.offset`, `anchor.fallbacks`, `anchor.boundary`, `anchor.config`; `sanitizer.enabled`, `sanitizer.allowlist`, `sanitizer.filter` |
| Popover | Tooltip groups plus `content`, with Popover defaults |
| Alert | Shared `signal` and `on` |
| Toast | `animation`, `delay`, `timer.automatic` ← `autohide` |
| Carousel | `interval`, `keyboard`, `pause`, `ride`, `touch`, `wrap` |

Every entity also accepts `signal` and typed `on` hooks. Foreign interfaces may retain exact external spellings such as `autoClose`, `popperConfig` and `allowList`; those spellings do not become Veneer’s domain option keys.

**Shared mechanisms and utility homes**

| Mechanism / Bootstrap utility | Home and first consumer | Native system, source boundary and contract |
|---|---|---|
| Cancelable and completed dispatch | Existing `src/browser/helpers.ts`, `emitEvent`; **Collapse** | Native `CustomEvent` and `dispatchEvent`; `dom/event-handler.js:259–304`. Return the dispatch outcome, preserve payload hydration and distinguish operation veto from completed notification. Retain Button’s noncancelable event. |
| Entity-neutral binding | Existing `src/browser/helpers.ts`, `bindEventMap`; **Collapse**, with Button migrated in the same landing | Native listener registration with abort-linked cleanup. The typed map supplies wire names and event guards; no dependency on Button’s detail shape. Listener removal uses the same target, callback and capture value. |
| Configuration and selectors | New `src/browser/parsers.ts`; shared helpers/validators; **Collapse** | Dataset/JSON parsing, `querySelector`, `querySelectorAll`, `CSS.escape`; `util/config.js:40–62`, `dom/manipulator.js:8–34,49–64`, `dom/selector-engine.js:11–119`. Preserve multi-target collapse, fragment extraction and ordinary DOM querying. Escape identifier fragments, not a whole selector expression. No jQuery-object input. |
| Registry | Private static registry in each concrete class; **Button** migration, then Collapse | Native `WeakMap`; `dom/data.js:12–55`, `base-component.js:61–66`. Lookup is `instance`; ownership is per class and host. No global mutable registry in `constants.ts`, and no public get-or-create factory. |
| Delegation and removal | Existing `src/browser/Delegate.ts`; **Collapse** expansion | Native root listeners and `MutationObserver`; Bootstrap data APIs and `util/component-functions.js:12–30`. One opt-in delegate, expanded incrementally as components land. Removal releases delegate-created owners at observer delivery, without waiting for another click. |
| Transition completion | New `src/browser/Transition.ts`; **Collapse** | `Element.getAnimations()` and each relevant animation’s `finished`; replaces `util/index.js:229–255`. `execute` returns a typed settled outcome. No fixed-duration fallback, synthetic `transitionend`, unrelated descendant wait or indefinite-animation wait. |
| Overlay coordination | New `src/browser/Overlay.ts`; **Dropdown**, later Modal and hints | Manual popovers, a per-document owned layer stack and `CloseWatcher`. Coordinates topmost dismissal and resource release. No import-time listeners or native automatic dismissal that can bypass a Bootstrap veto. |
| FocusTrap | New `src/browser/Focus.ts`; **Modal** | Native focus, inert exclusion, keyboard traversal and current visibility; `util/focustrap.js:62–113`. Preserve an empty host’s fallback focus, forward/reverse traversal and restoration. Inert ownership belongs to the active modal layer; restore prior values rather than removing every inert attribute. |
| Placement | New `src/browser/Placement.ts`; **Dropdown** | CSS anchors, scoped native position-try rules, `ResizeObserver`, layout readings and event-driven refresh; `dropdown.js:248–327`, `tooltip.js:373–441`. Own only its declarations, attributes and generated rules. Placement completion is not an animation timer. |
| Backdrop | New `src/browser/Backdrop.ts`; **Modal** | A real `.modal-backdrop` or `.offcanvas-backdrop`, native pointer events, manual popover and Transition; `util/backdrop.js:65–147`. Keep cascade paint and classes. Promote immediately before its panel; do not substitute an independently styled `::backdrop`. |
| ScrollBarHelper | New `src/browser/ScrollLock.ts`; **Modal** | Measured scrollbar width, owned inline overflow/padding/margin and per-document reference counting; `util/scrollbar.js:31–100`. Retain full-width fixed/sticky compensation and restore priorities/absence. `showModal()` is not a scroll lock. `scrollbar-gutter` support does not prove it replaces Bootstrap’s fixed/sticky compensation. |
| Swipe | New `src/browser/Swipe.ts`; **Carousel** | Native Pointer Events and owned listeners; `util/swipe.js:26,78–145`. Preserve touch/pen discrimination, direction, threshold and end callback. No timer-based gesture inference. Pointer/multitouch behavior requires the named probe below. |
| Sanitizer | `sanitizeContent` in existing `src/browser/helpers.ts`; **Tooltip** | Native `Element.setHTML` and `Sanitizer`; `util/sanitizer.js:11–46,66–116`. Translate the allowlist, including concrete attribute names admitted by regex rules. Record the native mandatory safety floor. Constructor-only `sanitizeFn` is an explicit trusted override and runs without an additional sanitizer pass; `sanitize: false` remains an explicit constructor escape. |
| TemplateFactory | New `src/browser/ContentTemplate.ts`; **Tooltip** | Detached native DOM parsing, selector slots, `textContent`, sanitized HTML and actual Element insertion; `util/template-factory.js:84–156`. Preserve missing-slot handling, falsey-slot removal, callable content, extra classes and node identity. Track borrowed nodes so destruction restores their original location when still owned. |
| Shared hint behavior | New `src/browser/hints/Hint.ts`; **Tooltip** | Abstract shared lifecycle, active triggers, delay, template ownership, Overlay and Placement composition; `tooltip.js:105–597`, `popover.js:42–69`. Tooltip and Popover supply variant defaults and slots. No duplicate lifecycle engines. |

**Transition semantics**

Capture the affected element and transition properties for the operation. Establish the initial cascade state before changing classes or dimensions, then inspect the resulting native animations. Modal waits on its dialog child and backdrop; Tab waits on the affected fading nodes; Carousel waits on its active item.

- No relevant animation, no `.fade`, or a reduced-motion zero-duration result completes in a microtask. No event or timeout is awaited.
- Ignore a second show/hide while the first operation is transitioning.
- A rejected `finished` promise is a settlement, not an unhandled rejection. If the host remains live, reconcile to the requested endpoint and complete once; if destruction or removal invalidates the operation, suppress completion.
- `destroy()` aborts observation immediately, restores owned state and invalidates queued callbacks. It does not wait for a completed event.
- Do not cancel unrelated consumer animations or call `commitStyles()` merely to freeze their visual state.
- Timers remain legitimate for tooltip delay, toast lifetime and carousel intervals. None reads transition completion.

**Overlay and placement boundaries**

Use `popover="manual"` on the existing dynamic panel. Bootstrap’s hide veto runs before the engine closes the popover. Native automatic and hint dismissal cannot provide that guarantee: the terrain’s cancelable `beforetoggle` measurement covers opening only.

For Modal, Focus owns containment and inert exclusion; Backdrop owns the separate cascade element; Overlay routes Escape and outside interaction; ScrollLock owns overflow and compensation. `focus: false` disables the engine’s focus containment and inert exclusion, preserving Bootstrap’s focus opt-out. Offcanvas applies containment only under its source condition. A static backdrop requests `hidePrevented`, retains the open state and runs only the measured cascade feedback motion.

CloseWatcher is a close-request source, not the panel’s state owner. A veto must leave the panel, focus scope, backdrop and scroll lock intact. Repeated vetoes and stacked layers are probe gates.

Placement writes:

- A unique, restored `anchor-name` on the reference element.
- `position-anchor`, `position-area`, positioning mode, inset/margin resets, `position-try-fallbacks`, `position-try-order: normal` and `position-visibility` on the panel.
- Scoped `@position-try` rules where fallback-specific alignment and offset require them.
- Engine-owned arrow positioning declarations and `data-popper-placement` from the **resolved** physical placement, not merely the requested placement.

Read `--bs-position` for dropdown alignment, as R7 requires. Support centered dropdown/dropup placement in the engine, as R9 requires. Top-layer UA layout resets may neutralize default border, padding and margin; they must not replace cascade colors, typography, dimensions or motion values.

`display: 'static'` and navbar positioning bypass native anchoring and promotion. Preserve `data-bs-popper="static"` and its cascade effect. Do not invent a `"dynamic"` value that Bootstrap does not write.

Accept the positioning wire keys and translate supported placement, offset, fallback and strategy values. `boundary` remains an accepted input, but native viewport/containing-block collision semantics are a documented departure from Popper’s clipping-parent algorithm. A `popperConfig` callback receives the documented configuration projection; executable Popper modifiers are not executed. Virtual references without an Element anchor are excluded explicitly. These limitations must appear beside the affected options, not only in a general compatibility paragraph.

**Installed candidate matrix**

Declaration pointers below use `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/<package>/dist/src/core/index.d.ts`. Costs are the terrain’s raw built core-entry byte counts, not incremental bundle or compressed sizes. Recommendations do not authorize a new runtime dependency.

| Candidate | Declaration evidence | Runtime cost and fit | Recommendation |
|---|---|---|---|
| `contract` 0.0.17 | `isInstance:2874`, `attempt:205`, `isRecord:3291`, `isString:3353`, `isFunction:2834`, `literalOf:3828` | Already the sole runtime dependency; entry **397,467 B**; no runtime dependencies. Reuse guards/combinators. No published DOM guard exists; narrowly typed DOM guards remain necessary. | **reuse** |
| `emitter` 0.0.10 | `Emitter:67`; `emit:74,147` returns `void` | **6,242 B**, plus contract. Adds a second event model without native bubbling or the required veto contract. The Browser/DOM variant already supplies the appropriate mechanism. | **exclude** |
| `abort` 0.0.11 | `Abort:28`; `linkSignal:169` | **8,289 B**, plus contract. Native `AbortController` and measured `AbortSignal.any` cover the required lifetime composition. No engine-specific traceable abort entity is required. | **exclude** |
| `timeout` 0.0.11 | `Timeout:108–117`; rearming semantics `:88–96` | **7,906 B**, plus contract. A general abort-deadline object is not needed for component-owned delay policies; its parent-abort and signal-rearming semantics would add translation. Use native timers inside those policies; create no duplicate generic timeout helper. | **exclude** |
| `queue` 0.0.14 | `createQueue:115`; `Queue:310` | Entry size **unmeasured**. Dependencies include abort, contract, database, emitter and timeout. FIFO jobs/retries conflict with ignored mid-transition component calls and supply no required mechanism. | **exclude** |
| `html` 0.0.10 | `createHTML:161`; `HTML:344`; `sanitize:446,680`; options `:787`; `renderHTML:1254` | **138,896 B**, plus contract; a `node:` import occurs in the built entry. AST round trips and a distinct allowlist model do not fit live DOM templates. Native sanitizer differences still require proof, but this package does not eliminate them. | **exclude** |
| `template` 0.0.8 | `fillTemplate:134`; `Template:292`; `TemplateManager:533` | **27,962 B**, plus contract and emitter. String placeholder substitution does not implement selector slots, Element identity, removal of empty slots or DOM ownership. | **exclude** |

Use the existing development dependency’s `createRecorder`, `createRecorders` and wait primitives where their contracts fit. `@orkestrel/test/browser`’s `waitForAnimations:2992` is a proof helper with a timeout budget and detached-element refusal; it is not the production transition contract.

**Rulings on every Compatibility `engine` row**

The existing row numbers refer to `guides/veneer.md`. “Departure” means carry the observable obligation while recording the stated difference. “Exclude” retains source inventory with an explicit exclusion; it does not invent an unsupported table status.

| Row | Ruling and proof obligation |
|---|---|
| `4138` — identity/version/event suffix | **Departure.** Preserve Bootstrap wire suffixes. Exclude Bootstrap `VERSION`, `DATA_KEY`, `EVENT_KEY` and `eventName` as public Veneer API. Prove exact emitted strings and the intentional export set. |
| `4139` — inherited Default/DefaultType | **Departure.** Carry defaults and validation in typed centralized data and parsers; exclude inherited static `Default`/`DefaultType`. Prove each default and invalid input before mutation. |
| `4140` — attribute/config precedence | **Carry**, with the Tooltip/Popover source exception. Prove collisions among JSON, individual attributes and constructor options. |
| `4141` — missing host/dispose/queueCallback | **Departure.** Invalid host throws; `destroy` replaces `dispose`; Transition replaces `_queueCallback`. Split the compound obligation so exclusions cannot hide an unproved implementation. |
| `4142` — static lookup/get-or-create/version | **Departure.** Carry lookup as `instance`. Exclude public get-or-create and Bootstrap version impersonation. Prove identity and release. |
| `4143` — registration on construction | **Departure.** Register the live instance in a per-class weak registry after validation and before callbacks can query it. Prove failed construction leaves no owner. |
| `4144` — asynchronous methods/mid-transition guard | **Departure.** Methods return immediately; completion follows actual motion, or a microtask when none exists. Ignore overlapping operations consistently, including Carousel indexed selection. Do not claim every source method is inherently asynchronous. |
| `4145` — dispose must await hidden | **Departure.** `destroy` is safe immediately after `hide` and during any transition. Prove no delayed writes or completion. |
| `4146` — paired events/cancelable hydration | **Departure.** Preserve actual plugin pairs, names, bubbling, flags and payload. Correct the universal claim: ScrollSpy has only activation; Button has no Bootstrap pair. Preserve Button’s F6 addition separately. |
| `4147` — preventDefault/return false | **Departure.** Native `preventDefault` vetoes; typed hook `false` is translated by the binder. Native listener return values do not veto. Exclude the jQuery bridge. |
| `4148` — merge and type checking | **Carry** behavior through typed parsers, including component-specific normalization. No Config inheritance or regex-based runtime type framework is required. |
| `4149` — dataset normalization | **Carry** supported wire-key reading and value normalization. Security keys remain unavailable through hint attributes. Unknown data is not turned into a domain option. |
| `4150` — SelectorEngine operations | **Departure.** Carry the selector/focus/navigation behavior consumed by components through native APIs and shared helpers. Do not publish a clone of SelectorEngine or unused traversal wrappers. |
| `4151` — Data registry/second key error | **Departure.** Per-class weak lookup; duplicate same-class ownership throws. Different compatible classes may share a host. No console-only failure or public Data facade. |
| `4152` — document dismiss binding | **Departure.** Explicit root-scoped Delegate supplies dismissal. No document listener appears on import. Preserve target resolution and component-specific disabled guards. |
| `4153` — duration-plus-padding emulation | **Exclude.** Actual animation promises replace timer completion and synthetic transition events. The proof fails if a fixed timer is substituted. |
| `4154` — sanitizer and override | **Departure.** Carry allowlist configuration and trusted custom override, with the native mandatory safety floor stated and tested. |
| `4155` — native selectors/escaping | **Carry.** Prove special-character IDs, href fragments, multiple selectors and invalid-selector handling. |
| `4156` — Config inheritance hierarchy | **Exclude implementation surface; retain its behavior** through the option rows. No throwing abstract `NAME` getter or copied base hierarchy. |
| `4157` — utility export census | **Split.** Carry only consumed ID, selector, visibility, disabled, reflow, shadow and navigation behavior through native APIs or narrower helpers. Exclude `isRTL`, jQuery handling, `noop`, generic type-string machinery and duplicate execution wrappers. Each retained helper needs a consumer and behavioral proof. |
| `4158` — jQuery registration | **Exclude**, including `getjQuery`, body opt-out, DOMContentLoaded registration and `defineJQueryPlugin`. Prove import remains inert. |

The current ledger accepts only `accepted` and `shipped`, and its proof resolver expects official recording steps. Do not place browser test paths into Proof cells and assume they work. `tests/setupServer.ts:2833` and `tests/conformance.test.ts:181` expose a Button-specific resolution path. The baseline owner must extend that path before plugin or engine proofs can claim closure.

## Refusals

| Foreclosed choice | Governing text and consequence |
|---|---|
| Import-time registration, automatic entry, factory construction | [ROADMAP.md:143](C:/Users/mikes/WebstormProjects/veneer-engine/ROADMAP.md:143): “Build every entity on explicit construction, opt-in delegation … and a side-effect-free import.” The explicit refusal of `./browser/auto` also stands. Only `.`, `./browser` and `./styles` remain published surfaces. |
| Reactive factory engines and fixed transition timers | [ROADMAP.md:147](C:/Users/mikes/WebstormProjects/veneer-engine/ROADMAP.md:147): “Refuse `@vue/reactivity`, the factory idiom, the fixed transition fallback”. No Vue/reactivity dependency, factory facade, timeout completion or synthetic `transitionend`. |
| Writes after destruction | [ROADMAP.md:149](C:/Users/mikes/WebstormProjects/veneer-engine/ROADMAP.md:149): “post-`destroy` mutation.” Every callback, observer and timer must become inert after teardown. This includes the inherited ColorMode defect. |
| RTL implementation | [ROADMAP.md, Rulings](C:/Users/mikes/WebstormProjects/veneer-engine/ROADMAP.md): “Right-to-left support is refused (D5).” Do not carry `isRTL`, logical-direction branches or RTL proof units. Physical placement support is sufficient for this campaign. |
| Speculative shared infrastructure | [architecture.md:294](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/architecture.md:294): “Build or substantively expand a capability with its first real consumer; do not speculate.” Mechanism and first-consumer units form one landing cohort. |
| Pass-through wrappers and compatibility aliases | [architecture.md:157](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/architecture.md:157): “A wrapper survives only when it adds a real boundary, invariant, composition, translation, lifecycle, or materially narrower contract.” Keep no `dispose`, `getOrCreateInstance`, `handleUpdate` or `setContent` aliases. |
| Compound domain option names | [names.md:29](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md:29): “Ungrouped option keys: one word”; “Grouped option key: the configured entity noun; every leaf remains one word.” Keep external camel-case vocabulary at the wire boundary. |
| Arbitrary folder trees and hidden declarations | [architecture.md:215](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/architecture.md:215): “When one entity grows a family … nest only its class files in a lowercase plural folder.” Only the hint family nests; centralized files remain at the browser root. |
| Polling architecture | [architecture.md:305](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/architecture.md:305): “No polling/busy loops or recursive microtasks as architecture.” Use observer, input, animation and abort wakeups. Frame coalescing must be event-driven and finite. |
| Showcase work during this campaign | [design brief, Standing conditions](C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-engine-design-brief.md): “`app/**` … is off-limits to this session until the baseline closes.” Report required showcase changes; assign no application unit. |
| Unauthorized dependencies or surfaces | [design brief, Installed primitives](C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-engine-design-brief.md): “a runtime dependency enters only on the user's ruling”. Candidate decisions above are recommendations, not dependency changes. |

## Measurements

These are readings from the [terrain record](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-terrain-record.md), taken on Chromium **153.0.8010.12**, managed revision `chromium-1243`, Playwright **1.63.0**. They establish this host’s behavior, not a cross-browser support claim.

| Record key | Reading and design bound |
|---|---|
| `control.present`, `control.absent` | `true`, `false`; the capability instrument distinguishes presence from absence. |
| `dialog.showModal`, `dialog.requestClose`, `dialog.closedBy` | Present; `dialog.closedBy.reflect="any"`. Native dialog is available, but requiring dialog markup remains a compatibility decision. |
| `dialog.showModal.inert` | `outsideFocusable=false insideFocusedOnOpen=true`. Native modal inertness and initial focus were observed. This does not prove the proposed manual-popover composition. |
| `dialog.showModal.scrollLock` | `bodyOverflow=visible scrollTopAfterScrollTo500=500`. Scroll locking requires a separate mechanism. |
| `popover.attribute`, `popover.showPopover`, `popover.hidePopover`, `popover.togglePopover`, `popover.selector`, `popover.hint` | Present. `popover.togglePopover.return="true/false"`. Capability exists for promotion of consumer elements. |
| `popover.beforetoggle.cancelable` | `cancelable=true openedDespitePreventDefault=false`. This proves an **opening** veto; it does not establish cancelable closing. |
| `popover.lightDismiss.trusted`, `popover.escape.trusted` | Auto popovers closed on trusted outside click and Escape. That behavior is unsuitable where closure must first survive a Bootstrap veto. |
| `dialog.beforetoggle`, `details.beforetoggle` | `"beforetoggle"` for dialog `show()`; `"none"` for details. Neither reading proves a complete showModal or details cancellation contract. |
| `inert`, `CloseWatcher` | Available. `closeWatcher.escape.trusted="closed=1 cancelCancelable=true"`. Stacked and repeatedly vetoed watcher behavior remains unmeasured. |
| `anchor.anchorName`, `anchor.positionAnchor`, `anchor.positionArea`, `anchor.positionTryFallbacks`, `anchor.positionTryOrder`, `anchor.positionVisibility` | All `true`. |
| `anchor.area.physical`, `anchor.area.logical`, `anchor.area.span`, `anchor.fallbacks.flip`, `anchor.fallbacks.area`, `anchor.function`, `anchor.size` | All `true`. Older claims that logical anchor areas are absent do not apply to this receipt. These readings do not prove offset, arrow or collision parity. |
| `getAnimations`, `animation.finished`, `CSSTransition` | Available. `transition.getAnimations="count=1 kind=CSSTransition property=width finished=resolved"`. |
| `transition.cancel`, `transition.removeMidway` | Both reject `finished` with `AbortError`; cancellation/removal must be handled explicitly. |
| `transition.reducedMotionZero` | `animations=0 events=`. No-animation completion cannot wait for an event. |
| `transition.allowDiscrete`, `CSSStartingStyleRule`, `interpolateSize`, `calcSize` | Available. Their availability does not establish that the shipped cascade uses them or that they replace its current class transitions. |
| `IntersectionObserver`, `ResizeObserver`, `scrollend` | Available. `IntersectionObserver.scrollMargin` and `.trackVisibility` are present; neither is required merely because it exists. |
| `scrollIntoView.container` | `"accepted"` only. Do not claim the intended container actually scrolled from this reading. |
| `scrollbarGutter`, `overscrollBehavior` | Present. Replacement of fixed/sticky compensation remains unproved. |
| `AbortSignal.any`, `AbortSignal.timeout`, `CSS.escape`, `checkVisibility` | Available. Use native capabilities where they satisfy the actual contract. |
| `setHTML`, `setHTMLUnsafe`, `Sanitizer` | Available. `sanitizer.default="<b>safe</b><a>link</a>"` proves removal of the sampled script, handler and unsafe href. It does not prove arbitrary allowlist translation. |
| `focusVisible.option`, `moveBefore` | Available/accepted. Node moves, focus retention and fallback focus still require component proofs. |
| `reducedMotion.matches`, `forcedColors.matches` | Both `false` on the receipt host. Proofs must explicitly stage the alternate media states. |

The candidate entry sizes and built-entry `node:` checks are the record’s appended spot checks. They do not establish incremental bundle costs or browser-load compatibility for an unselected dependency.

## Units

The default implementation route is **`opus` on Opus 5.5**. No unit below needs an Astra implementation exception. Proof execution routes to **`verifier` on Sonnet**, with correctness and design-fit audits under the orchestration protocol.

For every implementation row, **S** means these exact shared, report-only files:

`src/browser/index.ts`, `src/core/index.ts`, `src/browser/constants.ts`, `src/core/constants.ts`, `src/browser/helpers.ts`, `src/browser/validators.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`, `guides/veneer.md`, `ROADMAP.md`, `tests/src/browser/index.test.ts`, and `tests/src/core/index.test.ts`.

After the types unit, both `src/browser/types.ts` and `src/core/types.ts` are also report-only to other units. After their owning units land, `src/browser/parsers.ts`, `src/browser/Delegate.ts` and `tests/src/browser/Delegate.test.ts` become report-only for subsequent extensions. Agents return concrete patches for these files; the Orchestrator integrates them serially.

**G** is the common acceptance contract: real browser behavior and named mutation controls pass; documentation covers Surface, Methods, Examples and Compatibility; import remains inert; destruction leaves no owned resources; the applicable `format → lint → check → build → test → test:service` gates pass at the accepted revision.

A wave permits parallel implementation of disjoint owned files. A mechanism does not land on `main` alone: its first-consumer cohort lands together after integration and verification. Cascade availability gates `shipped`, not implementation start.

| Unit | Role / engine | Owned files | Shared files | Dependencies / wave | Acceptance |
|---|---|---|---|---|---|
| Contracts | `opus` / Opus 5.5 | `src/browser/types.ts`; `src/core/types.ts` | S | Verdict; **W0** | Every public component, mechanism, hook, detail, wire format, native capability and outcome contract exists before implementation. No assertion-based DOM workaround. |
| Registry | `opus` / Opus 5.5 | `src/browser/Button.ts`; `tests/src/browser/Button.test.ts` | S + types | Contracts; **W1a** | Button lookup, duplicate-owner refusal, release and existing restoration/event proofs pass. |
| Seed lifetime | `opus` / Opus 5.5 | `src/browser/ColorMode.ts`; `tests/src/browser/ColorMode.test.ts` | S + types | Contracts; **W1**, independent | `apply` and `toggle` after destruction make no host or storage writes; existing theme/restoration behavior remains. |
| Event dispatch | `opus` / Opus 5.5 | New `tests/src/browser/events.test.ts` | S + types; implementation patch to `helpers.ts` | Contracts; **W1**, lands with Collapse | Native veto, flags, hydration, bubbling and reentrant destruction pass; Button event remains distinct. |
| Event binding | `opus` / Opus 5.5 | New `tests/src/browser/bindings.test.ts` | S + types; implementation patch to `helpers.ts` | Event contract; **W1**, lands with Collapse | Non-Button detail, hook cancellation and exact abort cleanup pass. Event/helper patches integrate sequentially. |
| Options and selectors | `opus` / Opus 5.5 | New `src/browser/parsers.ts`; new `tests/src/browser/parsers.test.ts` | S + types | Contracts; **W1**, first consumer Collapse | Precedence, false/zero, invalid inputs, escaped IDs and multi-target resolution pass. |
| Delegation | `opus` / Opus 5.5 | `src/browser/Delegate.ts`; `tests/src/browser/Delegate.test.ts` | S + types | Registry, options, event contracts; **W1**, lands with Collapse | Button plus Collapse routing; bounded-root ownership; observer-driven release; no acquisition of foreign owners; no duplicate nested-root action. |
| Transition | `opus` / Opus 5.5 | New `src/browser/Transition.ts`; new `tests/src/browser/Transition.test.ts` | S + types | Contracts; **W1**, first consumer Collapse | Actual completion, zero animation, multiple relevant properties, cancellation, removal and abort pass without completion timers. |
| Collapse | `opus` / Opus 5.5 | New `src/browser/Collapse.ts`; new `tests/src/browser/Collapse.test.ts` | S + types + parser/delegate extensions | W1 mechanisms; **W1b** | G; Collapse matrix below; accordion and horizontal behavior; container/navigation combinator carrier closes against landed cascade. |
| Overlay | `opus` / Opus 5.5 | New `src/browser/Overlay.ts`; new `tests/src/browser/Overlay.test.ts` | S + types | W1, overlay probe; **W2**, first consumer Dropdown | Topmost request routing, veto, nested layers, promotion/restoration and watcher cleanup pass. |
| Placement | `opus` / Opus 5.5 | New `src/browser/Placement.ts`; new `tests/src/browser/Placement.test.ts` | S + types | W1, placement probe; **W2**, first consumer Dropdown | Actual geometry, fallback order, offsets, attributes, arrows, static bypass and complete style/rule cleanup pass. |
| Dropdown | `opus` / Opus 5.5 | New `src/browser/Dropdown.ts`; new `tests/src/browser/Dropdown.test.ts` | S + types + parser/delegate extensions | Overlay, Placement; **W2** | G; Dropdown matrix; navbar/static, `--bs-position`, centered placement and dismissal exceptions. |
| Tab | `opus` / Opus 5.5 | New `src/browser/Tab.ts`; new `tests/src/browser/Tab.test.ts` | S + types + parser/delegate extensions | W1; **W2** | G; Tab matrix; dual veto, keyboard traversal and nested dropdown state. |
| ScrollSpy | `opus` / Opus 5.5 | New `src/browser/ScrollSpy.ts`; new `tests/src/browser/ScrollSpy.test.ts` | S + types + parser/delegate extensions | W1; **W2** | G; ScrollSpy matrix; directional intersection cases and refreshed targets. No fictional CSS family. |
| Alert | `opus` / Opus 5.5 | New `src/browser/Alert.ts`; new `tests/src/browser/Alert.test.ts` | S + types + delegate extension | W1; **W2** | G; Alert matrix; detached-host completed event and dismissal. |
| Focus | `opus` / Opus 5.5 | New `src/browser/Focus.ts`; new `tests/src/browser/Focus.test.ts` | S + types | Overlay, focus probe; **W3**, first consumer Modal | Empty scope, forward/reverse traversal, inert snapshots, nested scopes and return target pass. |
| Backdrop | `opus` / Opus 5.5 | New `src/browser/Backdrop.ts`; new `tests/src/browser/Backdrop.test.ts` | S + types | Overlay, Transition; **W3**, first consumer Modal | Real cascade element, correct layer order, pointer origin guard, independent motion and removal pass. |
| Scroll lock | `opus` / Opus 5.5 | New `src/browser/ScrollLock.ts`; new `tests/src/browser/ScrollLock.test.ts` | S + types | Overlay, scroll probe; **W3**, first consumer Modal | Root lock, fixed/sticky compensation, nested holds and exact owned-property restoration pass. |
| Modal | `opus` / Opus 5.5 | New `src/browser/Modal.ts`; new `tests/src/browser/Modal.test.ts` | S + types + parser/delegate extensions | Focus, Backdrop, ScrollLock; **W3** | G; Modal matrix; static feedback, focus opt-out and overflow adjustment. |
| Sanitizer | `opus` / Opus 5.5 | New `tests/src/browser/sanitizer.test.ts` | S + types; implementation patch to `helpers.ts` | Contracts, sanitizer probe; **W3**, first consumer Tooltip | Default and custom allowlists, regex attributes, URL handling, trusted override and data-option exclusion pass. |
| Content template | `opus` / Opus 5.5 | New `src/browser/ContentTemplate.ts`; new `tests/src/browser/ContentTemplate.test.ts` | S + types | Sanitizer; **W3**, first consumer Tooltip | Slot selection, empty removal, function values, Element identity and borrowed-node restoration pass. |
| Hint behavior | `opus` / Opus 5.5 | New `src/browser/hints/Hint.ts`; new `tests/src/browser/hints/Hint.test.ts` | S + types | Overlay, Placement, ContentTemplate; **W3**, first consumer Tooltip | Independent triggers, delay cancellation, title/description ownership and content replacement pass. |
| Tooltip | `opus` / Opus 5.5 | New `src/browser/hints/Tooltip.ts`; new `tests/src/browser/hints/Tooltip.test.ts` | S + types + parser/delegate extensions | Hint cohort; **W3** | G; Tooltip matrix; tooltip-specific defaults, template and event identity. |
| Toast | `opus` / Opus 5.5 | New `src/browser/Toast.ts`; new `tests/src/browser/Toast.test.ts` | S + types + parser/delegate extensions | W1; **W3** | G; Toast matrix; stacked container flow, interaction suspension and timer cleanup. |
| Swipe | `opus` / Opus 5.5 | New `src/browser/Swipe.ts`; new `tests/src/browser/Swipe.test.ts` | S + types | Contracts, pointer probe; **W3**, first consumer Carousel | Threshold, direction, pointer kind, multitouch rejection and teardown pass. |
| Carousel | `opus` / Opus 5.5 | New `src/browser/Carousel.ts`; new `tests/src/browser/Carousel.test.ts` | S + types + parser/delegate extensions | Swipe, Transition; **W3** | G; Carousel matrix; visibility, interval override, wrap and reduced-motion policy. |
| Offcanvas | `opus` / Opus 5.5 | New `src/browser/Offcanvas.ts`; new `tests/src/browser/Offcanvas.test.ts` | S + types + parser/delegate extensions | Modal mechanism cohort; **W4** | G; Offcanvas matrix; scroll/backdrop combinations and responsive dismissal. |
| Popover | `opus` / Opus 5.5 | New `src/browser/hints/Popover.ts`; new `tests/src/browser/hints/Popover.test.ts` | S + types + parser/delegate extensions | Hint/Tooltip cohort; **W4** | G; Popover matrix; title/body slots, click default and Popover event identity. |
| Campaign integration | `opus` / Opus 5.5 | New `tests/src/browser/integration.test.ts` | S + types + parser/delegate files | All implementation units, baseline proof-reader acceptance; **W5** | Mixed components, nested layers, delegate removal, final exports, guide parity and ledger closure pass. |
| Gate receipt | `verifier` / Sonnet | No source files | All files read-only; report gate results | Each landing cohort and **W5** | Named revision, browser receipt and complete gate chain; report failures without accepting its own work. |

The proof-reader extension is a **baseline-owned dependency**, not an engine writing unit. Report the needed changes to `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts` and the official recording dispatch. It must resolve proofs by component, retain oracle comparisons for carried behavior, and represent recorded departures explicitly. A file-exists check is insufficient.

**Component proof matrices**

Every row runs in the real browser in the component test file named above. Each proof observes the host, delivered events or actual browser behavior, and names a mutation that must fail it.

| Component | Concern | Proof and distinguishing mutation |
|---|---|---|
| Collapse | Lifecycle | Show/hide horizontal and vertical hosts, accordion siblings and multiple triggers; remove the dimension or sibling update and the observed state fails. |
| Collapse | Cancellation | Veto each pre-event before classes, dimensions and ARIA change; ignore `defaultPrevented` and the proof fails. |
| Collapse | Focus | Trigger focus survives disclosure and content is not spuriously focused; insert a host `focus()` and the proof fails. |
| Collapse | Motion | Completion follows the real size transition; zero-duration completes without a transition event. Substitute a fixed timer and the ordering proof fails. |
| Collapse | Cleanup | Destroy/remove mid-transition restores owned state and releases delegated ownership; leave a queued completion or observer-owned instance and the proof fails. |
| Dropdown | Lifecycle | Toggle menu, trigger ARIA and resolved placement; bypass static/navbar handling and the geometry/attribute proof fails. |
| Dropdown | Cancellation | Veto show and every allowed hide request; close the native popover before the veto and the proof fails. |
| Dropdown | Focus | Arrows skip disabled items, Escape restores trigger, form/Tab exceptions hold; remove filtering or restoration and the proof fails. |
| Dropdown | Motion | Show/hide follow the actual menu motion, including no-animation behavior; emit completion before settlement and the proof fails. |
| Dropdown | Cleanup | Destroy restores popover, anchor declarations and placement attributes and removes rules/listeners; retain any owned declaration or live request source and the proof fails. |
| Tab | Lifecycle | Switch trigger/pane/dropdown state with reciprocal payloads; mutate only the trigger and the pane proof fails. |
| Tab | Cancellation | Either outgoing hide or incoming show veto prevents the entire switch; omit one veto check and the proof fails. |
| Tab | Focus | Arrows/Home/End maintain one tabbable active trigger and skip disabled entries; omit roving tabindex or filtering and the proof fails. |
| Tab | Motion | Hidden/shown follow the affected fades; zero-motion still completes once. Wait on an unrelated descendant animation and the proof fails. |
| Tab | Cleanup | Destroy restores authored roles/tabindex/ARIA and silences keyboard handlers; leave one altered attribute or listener and the proof fails. |
| ScrollSpy | Lifecycle | Scroll both directions, refresh added/removed sections and activate ancestors; remove direction handling or re-observation and the proof fails. |
| ScrollSpy | Cancellation | `activate` is a notification: preventing default does not roll state back; mistakenly treat it as a pre-event and the proof fails. |
| ScrollSpy | Focus | Observation never steals focus; smooth-link activation retains the source focus behavior. Add section focusing and the proof fails. |
| ScrollSpy | Motion | Reduced motion disables smooth scrolling; force smooth behavior under that media state and the proof fails. |
| ScrollSpy | Cleanup | Destroy disconnects observation, removes scrolling handlers and restores owned active tokens; retain the observer and post-destroy scrolling exposes it. |
| Modal | Lifecycle | Show/hide, trigger payload, backdrop order and body lock agree; omit one resource or complete before backdrop settlement and the proof fails. |
| Modal | Cancellation | Veto show/hide, Escape and outside dismissal; native closure before veto or omitted static handling fails. |
| Modal | Focus | Forward/reverse containment, empty host, return focus, nested overlay and focus opt-out pass; omit inert restoration or the empty fallback and the proof fails. |
| Modal | Motion | Dialog-child and backdrop transitions govern completion; wait only on the modal host or use a timeout and the proof fails. |
| Modal | Cleanup | Destroy during either phase restores inert, scroll compensation, attributes and focus ownership; retain a layer or callback and the proof fails. |
| Offcanvas | Lifecycle | All scroll/backdrop combinations and responsive dismissal behave correctly; always locking scroll or ignoring resize fails. |
| Offcanvas | Cancellation | Veto show/hide and retain static backdrop on prevented dismissal; unconditional native hide fails. |
| Offcanvas | Focus | Containment follows `!scroll || backdrop`, with restoration; trap every configuration or none and the proof fails. |
| Offcanvas | Motion | Showing/hiding classes remain until actual settlement, including reduced motion; remove them prematurely and the proof fails. |
| Offcanvas | Cleanup | Mid-transition destruction releases only this layer’s scroll/focus/backdrop ownership; unconditional global unlock fails with a remaining modal. |
| Tooltip | Lifecycle | Independent hover/focus/click triggers, insertion order and live content replacement work; clear all trigger state on one leave and the proof fails. |
| Tooltip | Cancellation | Veto show/hide without creating/removing the tip or description; create before show approval and the proof fails. |
| Tooltip | Focus | Focus trigger opens without stealing focus, and internal focus movement does not falsely leave; add tip autofocus or omit related-target containment and the proof fails. |
| Tooltip | Motion | Delay and fade are separate; completion follows the fade and zero-motion settles. Reuse the delay timer as transition completion and the proof fails. |
| Tooltip | Cleanup | Destroy restores title/description and borrowed nodes, cancels delay and removes tip/anchors; leave any scheduled show or node and the proof fails. |
| Popover | Lifecycle | Click-default toggling, title/body slots and empty-header removal work; use Tooltip defaults or retain an empty header and the proof fails. |
| Popover | Cancellation | Correct `.bs.popover` pre-events veto each change; dispatch Tooltip names or ignore the veto and the proof fails. |
| Popover | Focus | Showing a nonmodal popover does not introduce modal trapping or implicit autofocus; add either and the proof fails. |
| Popover | Motion | Completion tracks the popover’s actual fade and content replacement invalidates old waits; stale completion or fixed timing fails. |
| Popover | Cleanup | Destroy restores moved content and removes its layer without closing another hint; shared/global cleanup fails the paired-host proof. |
| Alert | Lifecycle | Close removes the host, then dispatches `closed` on that host once; dispatch before removal or rely only on ancestor recording and the proof fails. |
| Alert | Cancellation | Veto close and preserve the connected host and classes; remove before approval and the proof fails. |
| Alert | Focus | Closing an unrelated alert does not steal focus; unconditional restoration/focus fails. |
| Alert | Motion | Fade completes before removal; no-fade closure completes without waiting for an event. Timer substitution fails ordering. |
| Alert | Cleanup | Destroy during fade prevents later removal/completion; completed close releases ownership without reinsertion. Retain a callback or reinsert on teardown and the proof fails. |
| Toast | Lifecycle | Show, autohide and repeated shows preserve container flow and restart policy; promote the toast or omit rearming and the proof fails. |
| Toast | Cancellation | Veto show/hide, including timer-triggered hide; bypass the shared pre-event in the timer and the proof fails. |
| Toast | Focus | Focus/hover suspend autohide and movement within descendants does not rearm; omit containment checking and the proof fails. |
| Toast | Motion | Fade completion and lifetime delay are observed independently; use either timer to infer fade completion and the proof fails. |
| Toast | Cleanup | Destroy clears pending autohide and restores owned classes without deleting sibling toasts; leave the timer or clear the container and the proof fails. |
| Carousel | Lifecycle | Next/prev/indexed selection, wrapping, indicators and payloads agree; omit indicator updates or bounds checks and the proof fails. |
| Carousel | Cancellation | Veto slide before active classes, interval state or indicators change; commit one of them early and the proof fails. |
| Carousel | Focus | Keyboard input in text controls is ignored and slides do not steal focus; remove the input guard or add focus movement and the proof fails. |
| Carousel | Motion | `slid` follows the active item’s transform; reduced motion suppresses autoplay while explicit navigation remains. Fixed completion or an unguarded interval fails. |
| Carousel | Cleanup | Destroy stops interval/touch rearm, releases Swipe and suppresses pending completion; retain any timer or gesture callback and the proof fails. |

Retain Button’s existing lifecycle, noncancelable event, focus-neutral behavior, motion independence and restoration proofs. Extend its ownership proof for lookup and immediate delegated removal. Retain ColorMode’s theme and restoration proofs, adding direct `apply` and `toggle` calls after destruction; the current source permits those writes despite the guide’s promise.

**Exit criterion**

The campaign ends only when the following capabilities close with the stated disposition and evidence:

- **Implemented:** every named plugin’s typed contracts, lifecycle, events, configuration, delegation and five proof concerns.
- **Implemented:** cancelable dispatch, neutral binding, ownership lookup, removal release, transition completion, overlay coordination, focus, placement, backdrop, scroll lock, Swipe, sanitizer and template behavior, each with its first consumer.
- **Implemented:** the Collapse container/navigation combinator carrier and all applicable static-cascade integration proofs.
- **Retained:** Button’s F6 event and explicit-construction behavior, ColorMode’s theme behavior, existing restoration guarantees, contract reuse and side-effect-free imports; the post-destroy ColorMode gap is repaired.
- **Retained with recorded departures:** native placement, top-layer stacking, sanitizer floor, asynchronous completion semantics, per-class ownership and renamed domain methods. Each departure has a consumer-visible explanation and a distinguishing proof.
- **Excluded on evidence:** jQuery/global registration, automatic entrypoints, RTL, Config/Data/SelectorEngine replicas, fixed transition emulation, executable Popper extensions, non-Element virtual anchors and the rejected runtime candidates.
- **Implemented:** component-aware proof resolution accepted by the baseline owner; every carried engine obligation and landed plugin obligation has a valid, nonvacuous proof. Excluded source inventory remains explicitly excluded, not falsely marked implemented.
- **Implemented:** Surface, Methods, Examples and Compatibility parity; intentional exports through only `.`, `./browser` and `./styles`; no application changes.
- **Implemented:** required audits, complete gate chain on the accepted revision, Chromium receipt, clean resource teardown and ledger closure. A plugin becomes `shipped` only after its required cascade has landed. ScrollSpy does not wait for an invented cascade family.

## Tensions

1. **Wire vocabulary — ruled: Bootstrap names for Bootstrap obligations.** F6 excludes Button’s invented event from the oracle projection because Bootstrap Button emits none. It does not authorize dropping event comparisons for Collapse or other plugins. Challenge the domain-hook translation, but retain exact wire-name proofs.

2. **Ownership and lookup — ruled: per-class weak ownership plus `instance`.** This supports lookup without reinstating public factories or Data’s cross-component exclusion. Delegate never destroys or adopts an explicitly owned instance. Foreign ownership causes its route to leave that host alone, preserving the seed’s ownership boundary. Challenge this departure from Bootstrap’s get-or-create data API explicitly.

3. **Delegation — ruled: one incremental Delegate, no component-specific binder family.** Preserve the current default Button scope. Add an explicit `components` selection for other plugin routes; selector-based hint delegation is separately opt-in. Cover toggle, dismiss, slide, spy and ride contracts as their components land. Initial scanning and MutationObserver additions handle selected spy/ride initialization. Root membership, not `isConnected` alone, determines ownership for detached fragments. Same-delivery remove/reinsert within the root retains ownership; a host still outside the root at observer delivery is restored and released.

4. **Transition primitive — ruled: promises internally, immediate public return, completed events externally.** No-animation completion is a microtask; repeated operations are ignored; destruction suppresses completion. **Unknown probe:** multiple transition properties, cancellation followed by a replacement transition, removal/reinsertion, fading descendants and paused animations. The probe must distinguish target settlement from unrelated animation activity.

5. **Overlay composition — ruled: manual popover on existing panels, separate promoted cascade backdrop, explicit focus/inert/scroll policy.** Native dialog would provide stronger built-in modality but would impose markup or a second implementation path. Toast remains in flow. **Unknown probe:** nested manual popovers, backdrop/panel ordering, Escape after repeated vetoes, CloseWatcher grouping, pointer-down-inside/pointer-up-outside, inert ancestor traversal and focus restoration when a trigger disappears. Failure requires revising the composition, not asserting that the individual presence readings proved it.

6. **Placement — ruled: native declarations and measured resulting attributes, with documented Popper limits.** Physical placement, `--bs-position`, centering and navbar/static behavior remain obligations. **Unknown probe:** viewport-edge fallback, ordered alternatives, scrolling/resize, offset across fallback sides, arrow alignment, custom containers, transformed ancestors and top-layer anchor scope. The proposal does not claim clipping-parent parity or virtual-anchor support.

7. **Sanitizer/template — ruled: native sanitizer plus native selector-slot filling.** `sanitizeFn` is honored as an explicit trusted replacement; attribute configuration cannot select it. **Unknown probe:** per-tag versus wildcard attributes, regex-expanded attributes, URL and `srcset` handling, forbidden-element subtree removal, malformed HTML, SVG/MathML namespaces, custom allowlists and repeated sanitation. Any stricter native result must be recorded against Bootstrap rather than described as exact parity.

8. **File placement — ruled: coequal classes stay at `src/browser/`; only the hint family nests under `src/browser/hints/`.** No new module barrel or subpath is introduced. Hint contracts and constants stay in browser-root centralized files. Challenge whether a shared Hint passes the wrapper test; its lifecycle and trigger ownership must remain substantive.

9. **Options — ruled: explicit constructors read permitted attributes, then typed options win.** Foreign wire shapes retain foreign spellings; domain options use one-word groups. Preserve Tooltip’s actual JSON exception. Challenge the accepted-but-limited positioning keys in consumer documentation: an ignored executable modifier cannot be represented as implemented behavior.

10. **Engine rows — ruled individually above.** Compound rows need splitting before shipped status can communicate the result honestly. **Unknown integration requirement:** the baseline owner must establish component-aware official recordings and engine proof references. The current Button-only resolver is a concrete prerequisite, not permission for an engine unit to edit baseline-owned tests.

Additional probes required before the affected cohorts land:

- **Focus and scroll:** shadow-host focus, empty traps, initially inert siblings, nested locks, fixed/sticky elements, existing inline priorities and consumer edits during ownership.
- **Swipe:** trusted touch/pen input, simultaneous pointers, cancellation and the source threshold.
- **ScrollSpy:** actual nested-container scrolling and threshold-boundary ordering; `scrollIntoView.container="accepted"` alone is insufficient.
- **Native typings:** total structural guards for `setHTML` and CloseWatcher against the installed DOM declarations, with no casts, global prototype patches or import-time capability reads.

## Risks

| Risk | Evidence that settles it |
|---|---|
| Top-layer promotion changes stacking, containing blocks or inherited layout | Captures and geometry assertions using real baseline cascade, nested overlays and transformed/scrolled ancestors; the overlay/placement probes above. |
| Native closure bypasses cancelable lifecycle | Trusted Escape/outside-click proofs that inspect open state, focus, backdrop and scroll lock after every veto, including repeated vetoes. |
| Transition observation becomes a timer or waits on unrelated motion | Real property-duration variation, zero-duration, cancellation and unrelated-animation controls; fixed-delay and wrong-target mutations must fail. |
| Sanitizer translation silently broadens permissions or breaks accepted content | Differential default/custom allowlist fixtures, hostile URL/namespace cases and exact serialized output, with every intentional stricter result documented. |
| Ownership cleanup overwrites consumer state or leaks shared resources | Snapshot/restoration cases covering absent and empty attributes, later consumer edits, nested ownership and post-destroy input/observer/timer delivery. |
| Delegate expansion changes the existing showcase implicitly | Retain Button-only default scope; prove all additional routes require selection. Report future showcase wiring without touching `app/**`. |
| Ledger closure becomes a test-path label without behavioral evidence | Baseline proof-reader tests reject missing component recordings, missing steps, missing bindings and unsupported proof references. |
| Browser availability is mistaken for supported behavior | Keep presence readings separate from composition probes and component proofs; receipts name Chromium 153.0.8010.12. |
| Shared-file work creates conflicting implementations | Types land first; disjoint owned files proceed in waves; centralized changes are returned as patches and integrated once per cohort. |
| Seed behavior contradicts the stated lifetime contract | The ColorMode post-destroy mutation regression must fail on the inherited source and pass after the bounded repair. |

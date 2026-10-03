## Question
What do Chromium 153 and the specs provide for the overlay and dismissal cluster (Popover API, `<dialog>`, CloseWatcher, invoker commands, `interestfor`, the top layer and `overlay`)? For each feature: events, focus, keyboard and light dismiss, accessibility, top layer, UA styles, gotchas, and how each lines up with Bootstrap 5.3.8's contracts.

Chromium 153 reached stable on 2026-09-08 (https://developer.chrome.com/release-notes/153). Its release notes contain no entries for this cluster.

## Facts

### 1. Popover API (`popover="auto" | "manual" | "hint"`)

**Spec and maturity.** WHATWG HTML §6.12, a Living Standard (https://html.spec.whatwg.org/multipage/popover.html).

**Shipping.**
- The base API shipped in Chrome 114 and is "Enabled by default" (https://chromestatus.com/feature/5463833265045504).
- `hint` shipped in Chrome 133 (https://chromestatus.com/feature/5073251081912320; https://developer.chrome.com/release-notes/133).
- `showPopover({source})` and implicit-anchor invoker relationships shipped in Chrome 133, flag `PopoverAnchorRelationships` (release notes 133; https://chromestatus.com/feature/5120638407409664). The chromestatus status text still says "In developer trial (Behind a flag)", which contradicts the release notes. Treat that text as stale.
- A popover nested inside its own invoker no longer re-invokes it, from Chrome 133 (https://chromestatus.com/feature/4821788884992000).
- Top-layer elements can be nested inside popovers from Chrome 125. Before that, a nested dialog would hide its parent popover (https://chromestatus.com/feature/5149353645965312).
- The `ToggleEvent.source` attribute shipped in Chrome 140 (https://chromestatus.com/feature/5165304401100800).
- The `hint` behaviour changes shipped in Chrome 150 (https://chromestatus.com/feature/6282804208992256; https://developer.chrome.com/release-notes/150). The spec change is whatwg/html PR 12345, merged 2026-05-14. In that PR thread, mfreed7 says the changes were turned off in M150 because chatgpt.com called `showPopover()` re-entrantly, and planned to "re-enable the full set of `popover=hint` changes by default in M151" (comments of 2026-06-29 and 2026-07-13, https://github.com/whatwg/html/pull/12345).
- Chromium 153 therefore has auto, manual and hint, plus `source` and nested stacks. Light dismiss in 153 still uses pointer events (see Gotchas).

**States** (#attr-popover).
- `auto`: "Closes other popovers when opened; has light dismiss and responds to close requests."
- `manual`: "does not light dismiss or respond to close requests."
- `hint`: "Closes other hint popovers when opened, but not other auto popovers; has light dismiss."
- Model since Chrome 150: hints are hidden "only when their ancestral auto popover is hidden, or when a new, unrelated auto popover is opened". Auto popovers nested in a hint "downgrade" to hint instead of throwing (release notes 150).

**Methods** (#dom-showpopover, #dom-togglepopover, #dom-hidepopover).
- `showPopover({source})`, `togglePopover({force, source})` (returns the resulting open state) and `hidePopover()`.
- `source` sets the popover's "implicit anchor element" and establishes the ancestor relationship used by the stack.
- `check popover validity` throws `InvalidStateError` when the element is not connected, its document is not fully active, it is a modal dialog, or it is fullscreen. It throws `NotSupportedError` when the element has no popover attribute.
- Re-entrancy: "If document's showing popover is true, or document's hiding popover nesting count is not 0", show throws `InvalidStateError`.

**Events, cancelability and order** (show/hide popover steps; #queue-a-popover-toggle-event-task).
- Show fires `beforetoggle` synchronously "with the `cancelable` attribute initialized to true", `oldState` "closed", `newState` "open" and `source`. Then other popovers are hidden (hide stack until), the element is added to the top layer, the popover focusing steps run, and a `toggle` task is queued.
- Hide fires `beforetoggle` with no cancelable initializer, so it cannot be cancelled. It is skipped when `fireEvents` is false.
- `toggle` is asynchronous (queued task) and coalesced: a pending task keeps the original `oldState`.
- Neither event bubbles, because the DOM `EventInit` default is `bubbles = false` (https://dom.spec.whatwg.org/#interface-event). Capture-phase listeners on ancestors still receive them (https://dom.spec.whatwg.org/#dispatching-events).

**Focus** (#popover-focusing-steps).
- Focus moves on show only if the popover or a descendant has `autofocus` (or an autofocus delegate exists). Otherwise focus stays where it is.
- On hide, focus returns to the previously focused element only "if … document's focused area is a shadow-including inclusive descendant of element", that is, only when focus is inside the popover.
- No focus trapping, and the rest of the document is not inerted.
- An invoker that triggers a showing popover is a "focus navigation scope owner" (https://html.spec.whatwg.org/multipage/interaction.html#focus-navigation-scope-owner).
- The spec advises placing the popover "immediately after its triggering element in the DOM".

**Keyboard and light dismiss** (#popover-light-dismiss).
- Auto and hint popovers get a close watcher. Its closeAction hides the popover, so Escape or Android Back hides it.
- Light dismiss tracks the `pointerdown` target, then on `pointerup` with the same target runs hide-until. Manual popovers are exempt.
- A popovertarget button inside the target popover returns early instead of re-toggling it.

**Accessibility.**
- The spec gives `popover` no semantics: on a `div`, "authors should use the appropriate ARIA attributes".
- Chromium says popovers "already create aria-details" relationships (https://chromestatus.com/feature/5068815373303808, Chrome 144).
- Invoker `aria-expanded`: see Unknowns.

**Top layer.** A shown popover is added to the top layer, so it renders above everything regardless of `z-index` or ancestor clipping (see section 6).

**UA styles** (https://html.spec.whatwg.org/multipage/rendering.html#flow-content-3).
- `[popover]:not(:popover-open):not(dialog[open]) { display:none }`
- `[popover] { position:fixed; inset:0; width/height:fit-content; margin:auto; border:solid; padding:0.25em; overflow:auto; color:CanvasText; background-color:Canvas }`
- `:popover-open::backdrop { position:fixed; inset:0; pointer-events:none !important; background-color:transparent }`
- A page must neutralise the border, padding, margin, inset and colours, and style `:popover-open`.
- From Chrome 149, `:hover`, `:active` and `:focus-within` match ancestors only "up to the first top layer element" (https://chromestatus.com/feature/6296574159355904).

**Gotchas.**
- Light dismiss switches from pointer events to `click` in Chrome 154, flag `LightDismissFromClick`, to stop scrolls and right-clicks from dismissing (https://chromestatus.com/feature/6209615938322432; https://developer.chrome.com/release-notes/154). The spec PR whatwg/html#11536 is still open. Chromium 153 uses pointerdown/pointerup.
- Escape cannot be vetoed through `beforetoggle` on hide.
- The `toggle` event fires after the show call returns, so it is not synchronous with `beforetoggle`.

**Bootstrap reconciliation** (from veneer/node_modules/bootstrap/js/src).
- **Dropdown.** `auto` gives Escape dismissal, outside-click dismissal and the top layer.
  - `autoClose` `'inside'`, `'outside'` and `false` (dropdown.js:365-377) have no native equivalent; `false` maps to `manual`.
  - Bootstrap also closes on `keyup` Tab leaving the menu (dropdown.js:357, 379-381), which native light dismiss does not.
  - Bootstrap dismisses on `click` (dropdown.js:442); 153 dismisses on pointerup.
  - Arrow-key navigation (dropdown.js:394-426) is not native.
  - Popper placement would need anchor positioning or Popper on the top-layer element.
  - `hide.bs.dropdown` is cancelable in Bootstrap; native `beforetoggle` on hide is not.
- **Tooltip (`hint`) and popover (`auto`, trigger `click`, popover.js:30).**
  - Bootstrap builds the tip element dynamically and appends it to `container` (tooltip.js:208-213). The top layer removes the need for `container`.
  - Bootstrap sets `aria-describedby` (tooltip.js:206).
  - `show.bs.*` is cancelable (tooltip.js:193-199); `hide.bs.*` is cancelable (tooltip.js:247-250), which native hide is not.
- **Toast** could use `manual` for stacking above modals. No dismissal semantics needed.
- **Event timing.** `shown` and `hidden` in Bootstrap wait for transitions (`_queueCallback`), which native `toggle` does not.

### 2. `<dialog>`: show, showModal, closedby, requestClose, cancel/close, focusing steps, ::backdrop

**Spec and maturity.** WHATWG HTML §4.11.4, Living Standard (https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element).

**Shipping.**
- Dialog `ToggleEvent`s shipped in Chrome 132 (https://chromestatus.com/feature/5078613609938944).
- `closedby` (dialog light dismiss) shipped in Chrome 134 (https://chromestatus.com/feature/5097714453577728; https://developer.chrome.com/release-notes/134).
- Close-request integration shipped in Chrome 126 (section 3).
- `requestClose()`: release notes 139 call it "recently … added"; milestone in Unknowns. It is present in 153.
- `::backdrop` inherits from its originating element from Chrome 122 (https://chromestatus.com/feature/4875749691752448).
- `CSSPseudoElement` for `::backdrop` arrived in Chrome 152, "useful for closing a dialog when the backdrop is clicked" (https://chromestatus.com/feature/6516055192240128).
- The `:open` pseudo-class, which matches an open `<dialog>`, shipped in Chrome 133 (https://chromestatus.com/feature/5085419215781888).

**`closedby`** (#attr-dialog-closedby).
- `any`: close requests and outside clicks close the dialog.
- `closerequest`: only close requests close it.
- `none`: no user action closes it.
- Auto (the missing and invalid default) "behaves as Close Request state when … showModal() …; otherwise the None state."
- Light dismiss runs on pointerdown/pointerup and acts on the topmost dialog only when its computed closed-by is Any.

**`show()` and `showModal()`.**
- `showModal()` throws `InvalidStateError` if the dialog is already open in any mode; `show()` throws if it is open as modal.
- Order: `beforetoggle` (cancelable), add `open`, set is-modal, "blocked by the modal dialog", add to top layer, establish close watcher, store previously focused element, dialog focusing steps, queue `toggle`.
- The close watcher is enabled for non-modal dialogs too when computed closed-by is not None.

**Close path.**
- `close(rv)`: `beforetoggle` (not cancelable), remove `open`, "request an element to be removed from the top layer", restore focus only "if … focused area is a shadow-including inclusive descendant of subject, or wasModal is true", queue the `close` event (asynchronous).
- `requestClose(rv)` "fires a cancel event, and if that event is not canceled … proceeding to close."
- Close-watcher cancelAction fires `cancel` "with the cancelable attribute initialized to canPreventClose", which is gated on user activation (section 3).

**Focusing steps.**
- Spec text: "If subject has the autofocus attribute, then set control to subject. If control is null, … focus delegate … If control is null, then set control to subject."
- Spec PR 8199 (merged 2023-01-26) moved this to keyboard-focusable elements with the dialog as fallback. Chromium's owner wrote on 2024-12-17: "I did not end up shipping this as-is, we are still working on it" (https://www.mail-archive.com/blink-dev@chromium.org/msg12262.html). See Unknowns.
- Authors should not put `tabindex` on `dialog` and should put `autofocus` on the expected target.

**Inertness and trapping.**
- A modal makes the document "blocked by a modal dialog": everything is inert "with the exception of the subject element and its flat tree descendants" (https://html.spec.whatwg.org/multipage/interaction.html, inert section).
- There is no explicit Tab-cycling trap.
- There is no scroll-lock step in the showModal steps.

**Accessibility.** The implicit role `dialog` is listed in HTML-AAM (Editor's Draft, 2026-07-29, https://w3c.github.io/html-aam/). An explicit `aria-modal` mapping was not found there.

**UA styles** (rendering #flow-content-3).
- `dialog:not([open]) { display:none }`
- `dialog { position:absolute; inset-inline:0; width/height:fit-content; margin:auto; border:solid; padding:1em; background-color:Canvas; color:CanvasText }`
- `dialog:modal { position:fixed; overflow:auto; inset-block:0; max-width/max-height: calc(100% - 6px - 2em) }`
- `dialog::backdrop { background: rgba(0,0,0,0.1) }`
- `dialog:popover-open { display:block }`

**Gotchas.**
- Removing `open` by hand means "The close event will not be fired" and the document stays blocked.
- Hide `beforetoggle` is not cancelable; veto only through `cancel`, which is user-activation gated.
- `close` is queued (asynchronous).

**Bootstrap reconciliation.**
- **Modal markup.** Bootstrap toggles `display:block`, `role="dialog"` and `aria-modal` itself (modal.js:177-180, 245-249).
- **Focus trap.** Bootstrap's trap activates after the transition (modal.js:192-194). Native inertness applies at once.
- **Escape.** Escape plus `keyboard:false` fires `hidePrevented` (modal.js:207-218); this maps to `cancel` and `preventDefault`, except that cancel is not cancelable without activation.
- **Backdrop clicks.** Bootstrap uses mousedown+click on `.modal` (modal.js:226-242). `backdrop:'static'` fires `hidePrevented` and plays the `.modal-static` bounce (264-290). `closedby="any"` uses pointer events and has no "prevented" hook other than `cancel`.
- **Scroll lock.** Scroll lock and scrollbar compensation (modal.js:114, 296-315; offcanvas.js:107-109) have no native replacement.
- **Focus return.** Bootstrap returns focus to the trigger on `hidden` (modal.js:346-357). Native restoration goes to the previously focused element.
- **Stacking.** Bootstrap closes an already open modal (360-363); the top layer could stack them instead.
- **Offcanvas** (`role="dialog"`, `aria-modal`, offcanvas.js:111-112) maps to showModal, or to `show()` with `closedby` when `scroll:true` and no backdrop (116-118).
- **Backdrop element.** `.modal-backdrop` is a separate element appended by util/backdrop.js; native gives `::backdrop`, so the CSS must move there.

### 3. CloseWatcher and close requests

**Spec.** WHATWG HTML §6.10 (https://html.spec.whatwg.org/multipage/interaction.html#close-requests-and-close-watchers). The WICG explainer says it "has been merged to the HTML Standard" (https://github.com/WICG/close-watcher).

**Shipping.** First shipped in Chrome 120, disabled, then re-enabled in Chrome 126 (https://developer.chrome.com/blog/new-in-chrome-126). Chromestatus lists desktop and Android 126, "Enabled by default", for close requests covering CloseWatcher, `<dialog>` and `popover` (https://chromestatus.com/feature/4722261258928128). Present in 153.

**API.** `new CloseWatcher({signal})`, `requestClose()`, `close()`, `destroy()`, and `cancel` / `close` events (spec §6.10.3; explainer).

**Anti-abuse rules.**
- One watcher is free without user activation. Further watchers created without activation are "grouped together, and both will close in response to a single close request".
- `cancel` fires only with activation; a second request without new activation "definitely goes through" (explainer).
- Chromestatus: without activation, "cancel events may be skipped or multiple close watchers closed simultaneously".
- The activation budget is shared with dialogs and popovers.

**Bootstrap reconciliation.** This is the cross-platform route for Escape and Android Back for components that are not dialogs or popovers: dropdown Escape (dropdown.js:428-432), and the Escape handling in offcanvas and modal. Bootstrap's `hide.bs.*` veto on Escape is not guaranteed, because `cancel` is skipped without activation.

### 4. Invoker commands (`commandfor`, `command`, CommandEvent)

**Spec.** WHATWG HTML button element (https://html.spec.whatwg.org/multipage/form-elements.html#attr-button-commandfor). It originated at Open UI (https://open-ui.org/components/invokers.explainer/).

**Shipping.**
- Shipped in Chrome 135, "Enabled by default" (https://chromestatus.com/feature/5142517058371584).
- The `request-close` command shipped in Chrome 139 (https://developer.chrome.com/release-notes/139; https://chromestatus.com/feature/5592399713402880, whose status text is stale).
- `step-up` / `step-down` have no milestone (https://chromestatus.com/feature/5077339740438528).
- Declarative scroll commands are "Proposed" (https://chromestatus.com/feature/6400108400869376).
- Present in 153: the popover and dialog commands and custom commands.

**Keywords.** `toggle-popover`, `show-popover`, `hide-popover`, `close`, `request-close`, `show-modal`, and custom commands: "A custom command keyword is a string that starts with '--'."

**Event.**
- "firing an event named `command` at target, using `CommandEvent`, with its `command` attribute initialized to command, its `source` attribute initialized to element, and its `cancelable` attribute initialized to true."
- If cancelled, the built-in action does not run.
- `bubbles` and `composed` are not initialized, so by DOM defaults the event is non-bubbling and non-composed. The explainer calls it "composed", which conflicts with the spec text.
- The event is dispatched before the built-in action.

**Button type.** The Auto state of `type` makes a button a submit button only when both `command` and `commandfor` are absent (and it is not inside `select`). A disabled button does nothing.

**Accessibility.** The Open UI explainer says popover-command buttons implicitly get `aria-expanded` and `aria-details`. HTML-AAM has no mapping.

**Bootstrap reconciliation.**
- Bootstrap's delegated data-API is a document-level `click` delegation (modal.js:339; dropdown.js:440-447). `command` events do not bubble, so delegation needs a capture-phase document listener.
- `commandfor` is on `<button>` only. Bootstrap also accepts `<a>`/`<area>` toggles (modal.js:342-344).
- Custom `--` commands could carry collapse, tab, carousel slide, alert close and toast hide.
- `ToggleEvent.source` and `CommandEvent.source` could fill Bootstrap's `relatedTarget` (modal.js:103-105).

### 5. Interest invokers (`interestfor`)

**Spec and maturity.**
- HTML PR whatwg/html#11006 "Add the `interestfor` attribute" is open (last activity 2026-10-01). It is not in the Living Standard.
- The CSS properties are in css-ui-4 §6.4 (WD 2026-05-06, https://drafts.csswg.org/css-ui-4/#interest).
- The pseudo-classes are in selectors-5 §4.1 (ED 2026-08-18, https://drafts.csswg.org/selectors-5/).
- Explainer: https://open-ui.org/components/interest-invokers.explainer/ (updated 2026-10-02).

**Shipping.**
- Chrome 142 release notes list it, on `<button>` and `<a>` (https://developer.chrome.com/release-notes/142).
- Chromestatus has a launch stage of 142 with no flag, but its status text still says "Origin trial" (https://chromestatus.com/feature/4530756656562176).
- Present in 153, subject to that stale text.

**Behaviour** (explainer).
- Elements: non-disabled `<button>`, `<a href>`, SVG `<a href>`, `<area href>`.
- Events: `interest` and `loseinterest` (`InterestEvent` with `source`), "always non-bubbling, non-composed". Both are cancelable, except that Escape-triggered loss is not.
- With a popover target (hint, auto or manual), interest shows the popover and loss hides it, and the invoker becomes its implicit anchor. If the popover "was opened by some other means, such as `commandfor` or `popovertarget`", interest does not take it over.
- Hovering the target keeps interest alive.
- Delays: `interest-delay-start` and `interest-delay-end` (`normal | <time>`, inherited) and the `interest-delay` shorthand. In Chromium, `normal` is 0.25 s start and 0.15 s end.
- Keyboard focus shows interest after the delay; Escape cancels it.
- Touch: a long-press "Show details" menu item, or an opt-in `::interest-button`.
- Pseudo-classes: `:interest-source` and `:interest-target`.
- Accessibility: plain hints expose their text as the invoker's description; rich hints get `aria-expanded`, `aria-details` and role tooltip.
- Only one invoker can hold interest at a time. Removing an element ends interest with no event.

**Bootstrap reconciliation.**
- Tooltip trigger `'hover focus'` (tooltip.js:78), the `delay` `{show, hide}` option (tooltip.js:513, 527, 561-564) and `_isWithActiveTrigger` map closely to `interestfor` plus `interest-delay`.
- Bootstrap tooltips attach to any element. `interestfor` only works on button, a and area, and disabled buttons are excluded.
- `show.bs.tooltip` maps to cancelable `interest`, and `hide` maps to `loseinterest`.
- Bootstrap's manual trigger and `click` trigger need commands instead.

### 6. Top layer, `overlay`, inertness

**Spec.** CSS Position 4, Editor's Draft 2025-12-25 (https://drafts.csswg.org/css-position-4/#top-styling).

**Adding and removing.**
- Adding an element removes it from the top layer if present, then appends it, so it becomes topmost. It also adds a UA `!important` `overlay: auto`.
- "Request removal" drops that rule and appends the element to the pending removals. Pending elements are removed once their computed `overlay` is `none` or they are not rendered.

**Rendering.**
- A top-layer element "generates a new stacking context" whose parent is the root stacking context.
- Its containing block is the viewport if it is `position:fixed`, otherwise the initial containing block. Any other position computes to absolute.
- UA default: `::backdrop { position:fixed; inset:0 }`.

**The `overlay` property.**
- Values `none | auto`, initial `none`. It is UA-controlled; authors only transition it.
- It shipped in Chrome 117 with `transition-behavior: allow-discrete` and `@starting-style` (https://chromestatus.com/feature/5138724910792704; https://developer.chrome.com/blog/entry-exit-animations). The blog's warning: "if you don't transition `overlay`, your element will immediately go back to being clipped".
- A deprecation entry, "Deprecate and remove: CSS overlay property" (flag `OverlayProperty`), has been "Proposed" since 2026-01-15 with no milestone (https://chromestatus.com/feature/5103791907143680).
- CSSWG PR 13234 would remove the property and keep elements in the top layer until `display:none`. It is open, dated 2025-12-17 (https://github.com/w3c/csswg-drafts/pull/13234).
- `overlay` is still present in 153.

**Inertness.**
- `inert` attribute: Chrome 102 (https://chromestatus.com/feature/5703266176335872).
- CSS `interactivity`: Chrome 135 (https://chromestatus.com/feature/5107436833472512).
- A modal dialog inerts everything outside it; popovers do not.
- `overscroll-behavior` on scroll containers that do not overflow: Chrome 144 (https://chromestatus.com/feature/5129635997941760). This is relevant to scroll chaining from a backdrop, but it is not a scroll lock.

**Bootstrap reconciliation.**
- The top layer replaces the `z-index` stack (`.modal-backdrop` and `.modal` z-indexes), the tooltip `container` option and the append-to-body of a dynamic modal (modal.js:173-175).
- Bootstrap's transition waits (`_queueCallback`) map to `transition` plus `overlay`/`display` with `allow-discrete` and `@starting-style`. This is styling work, and the `overlay` keyword itself may be removed.

## Matrix

| Feature | Chromium milestone | In 153 | Candidate Bootstrap subjects | Evidence against / contract changes | Styling needs |
|---|---|---|---|---|---|
| Popover `auto` / `manual` | 114 | Yes | dropdown, popover, toast (`manual`), Popper replacement via implicit anchor | Hide is not cancelable (`hide.bs.*` is); no `autoClose` inside/outside; no Tab-out close; pointerup vs click dismissal until 154; `toggle` is async and does not wait for transitions | Neutralise `[popover]` UA box (border, padding, inset, margin, Canvas colours); `:popover-open`; transparent `::backdrop` |
| Popover `hint` (+ M150 model) | 133; model 150 (reverted in 150, planned for 151) | Yes (model per PR thread) | tooltip | Tip must exist in the DOM with an id (Bootstrap builds it dynamically, tooltip.js:204); hide not cancelable | Same as above |
| `showPopover({source})`, `ToggleEvent.source` | 133 / 140 | Yes | `relatedTarget` on show events; Popper anchor | Implicit anchor needs CSS anchor positioning instead of Popper | Anchor-positioning CSS |
| `<dialog>` showModal/show + `ToggleEvent`s | `ToggleEvent`s 132 | Yes | modal, offcanvas, backdrop, focus trap | No scroll lock or scrollbar compensation; Chromium focusing steps may differ from spec; Bootstrap sets role/`aria-modal` itself | Neutralise dialog UA box and `:modal` max sizes; move `.modal-backdrop` look to `::backdrop` |
| `closedby` | 134 | Yes | modal `backdrop`/`keyboard` options, offcanvas | `static` bounce and `hidePrevented` only via `cancel`, which is activation-gated; pointer-based dismissal until 154 | Static-bounce animation hook |
| `requestClose()` / `request-close` | method: unknown (before 139); command 139 | Yes | `hide()` with a vetoable `hide.bs.modal` | `cancel` may be skipped without user activation | None |
| CloseWatcher | 126 | Yes | Escape for dropdown, collapse, others | Groups and activation gating can skip `cancel` | None |
| Invoker commands | 135 (`request-close` 139) | Yes | data-API toggles (modal, offcanvas, popover); custom `--` for collapse, tab, carousel, alert, toast | `<button>` only (Bootstrap allows `a`/`area`); non-bubbling, so delegation needs capture; `type` default changes | None |
| `interestfor` | 142 | Yes (chromestatus text says "Origin trial") | tooltip hover/focus + delay; popover hover | Not in the Living Standard (PR open); button/a/area only; no disabled elements | `interest-delay`; `:interest-source` / `:interest-target`; optional `::interest-button` |
| Top layer + `overlay` | `overlay` 117; nesting in popovers 125 | Yes | `z-index` stacking, `container`, transition waits | Deprecation of `overlay` proposed; `:hover` boundary from 149 | `transition: … overlay … allow-discrete; display`; `@starting-style` |
| Click-based light dismiss | 154 | No | n/a | n/a | n/a |

## Unknowns
- When `dialog.requestClose()` itself shipped. Only secondary sources say Chrome 134; release notes 139 say only "recently … added".
- Whether Chromium 153's dialog focusing steps follow spec PR 8199 (keyboard-focusable elements, dialog as fallback). The last primary word (2024-12-17) is that it did not ship as written.
- Whether the full popover=hint model is actually on by default in 153. The evidence is the 2026-07-13 PR comment planning M151 re-enable; no runtime check was done.
- Whether Chromium gives `popovertarget` and `commandfor` invokers an implicit `aria-expanded`. HTML-AAM has no mapping; only the Open UI explainer and secondary blogs say so.
- Whether the popover close watcher has a cancelAction, i.e. whether Escape on an auto popover can be vetoed at all. Hide `beforetoggle` is confirmed non-cancelable.
- Close-watcher internals (group count, `canPreventClose` definition): the spec §6.10.2 text was too long to fetch. The facts above come from the WICG explainer and chromestatus.
- Interest invokers: the chromestatus status text ("Origin trial") conflicts with the Chrome 142 release notes. Also unverified: whether `::interest-button`, the touch "Show details" item and the plain/rich-hint accessibility mappings are in 153; and the conflict over "partial interest" (PR 11006 has it, the explainer calls it abandoned).
- Whether `CommandEvent` is composed: the spec text sets only cancelable, while the explainer says "composed".
- Timing of the `overlay` removal in Chromium (deprecation entry has no milestone).
- The exact HTML-AAM mapping of modal dialogs to `aria-modal`.
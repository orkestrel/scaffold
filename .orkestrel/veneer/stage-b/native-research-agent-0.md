## Question
For Veneer Stage B's motion cluster: how @starting-style, transition-behavior: allow-discrete (display and overlay), interpolate-size and calc-size(), same-document and element-scoped View Transitions, scroll-driven animations, getAnimations() with `finished`, and prefers-reduced-motion behave in Chromium 153, and how each could replace Bootstrap 5.3.8's reflow-and-class transition idiom and its transitionend emulation. I did not consult the "elements" repo because this task allowed primary sources only.

## Facts

### 0. Bootstrap 5.3.8 baseline (installed source)
- `reflow()` just reads `element.offsetHeight` to restart a transition. `C:\Users\mikes\WebstormProjects\veneer\node_modules\bootstrap\js\src\util\index.js:175-177`
- `executeAfterTransition` listens for `transitionend`, but only when the event target is the element itself (any property counts). A `setTimeout` fallback fires after the duration plus 5 ms and sends a synthetic `transitionend`. index.js:229-256
- The duration comes from only the first value of `transitionDuration` and `transitionDelay` ("If multiple durations are defined, take the first"). index.js:63-67
- Per-plugin use:
  - **Modal:** sets `style.display='block'`, calls `reflow`, adds `.show`, then waits on `this._dialog` (`.modal-dialog`), not on `.modal`. modal.js:177-203
  - **Collapse:** show swaps `.collapse` for `.collapsing`, sets `height:0`, then sets `height` to `scrollHeight`px. Hide sets the measured px height, calls `reflow`, then clears the height. collapse.js:138-204
  - **Carousel:** adds `carousel-item-next/prev`, calls `reflow(nextElement)`, adds `-start/-end`, and waits on the active item. carousel.js:344-365
  - **Toast:** calls `reflow`, adds `show showing`, and waits. Hide adds `showing`, waits, then removes it. toast.js:95-120
  - **Backdrop:** uses `reflow` and `executeAfterTransition`. backdrop.js:75,147
- CSS: `.collapse:not(.show){display:none}`, `.collapsing{height:0;overflow:hidden}`, `.fade:not(.show){opacity:0}`. scss/_transitions.scss:1-26
- Reduced motion: the transition mixin emits `@media (prefers-reduced-motion: reduce){transition:none}` when `$enable-reduced-motion` is on. scss/mixins/_transition.scss:20-24. The JS then gets 0 ms and the 5 ms synthetic `transitionend` fallback fires.
- Offcanvas styles itself with `.showing`, `.hiding` and `.show:not(.hiding)`. scss/_offcanvas.scss:84-90

### 1. Transition events (shared reconciliation fact)
- Level 1 §6.2 (https://drafts.csswg.org/css-transitions-1/#transition-events): `transitionrun`, `transitionstart`, `transitionend` and `transitioncancel` all bubble, and none is cancelable.
- If a transition is "removed before completion", `transitionend` does not fire; `transitioncancel` fires instead. This is the case Bootstrap's setTimeout covers.
- Level 2 §5.1 (https://drafts.csswg.org/css-transitions-2/#event-dispatch) gives the order run → start → end.
- A Level 2 summary claimed that all events are cancelable. That contradicts Level 1 and is unverified.
- `TransitionEvent.animation` accessor (returns the CSSTransition object): chromestatus 6046278267043840 lists Intent to Ship at M151. Spec: https://drafts.csswg.org/css-animations-2/#interface-animationevent

### 2. @starting-style
- **Spec:** CSS Transitions 2 §3.3, https://drafts.csswg.org/css-transitions-2/#defining-before-change-style. It is a grouping rule whose styles are used when "the previous style change event did not establish a before-change style".
- **Maturity:** Editor's Draft dated 22 Apr 2026; the TR copy is a W3C Working Draft of 4 Feb 2026 (https://www.w3.org/TR/css-transitions-2/).
- **Chromium:** M117, chromestatus 4515377717968896. Present in 153 with no flag.
- **Behaviour:** It applies only on the first style of an element that was just inserted or just went from `display:none` to rendered. It does nothing on a class toggle of an element that is already rendered.
- **Gotcha:** rules inside "do not necessarily win over those outside", because they cascade normally (https://developer.chrome.com/blog/entry-exit-animations).
- **Top layer:** select open dialogs with `[open]` and open popovers with `:popover-open` (same article).
- **Events, focus, keyboard, accessibility:** none of its own. It produces ordinary transition events.
- **Bootstrap fit:** it removes the forced `reflow()` before adding `.show` in modal (display:block then `.show`), toast, backdrop (insert then fade) and collapse show (from display:none).
  - Bootstrap's contract also needs the `showing`/`collapsing` classes during the transition, a `shown` event after the transition, and the `_isTransitioning` guard. @starting-style supplies none of these.
  - The CSS would have to key entry state on the element becoming rendered, not on `.show` alone.

### 3. transition-behavior: allow-discrete; display and overlay animation
- **Spec:** CSS Transitions 2 §2.5, https://drafts.csswg.org/css-transitions-2/#transition-behavior-property.
  - `normal`: discrete properties do not transition.
  - `allow-discrete`: they do, and discrete values "flip at 50% progress" (§2.1).
- **Display:** CSS Display 4 §2.9, https://drafts.csswg.org/css-display-4/#display-animation. When one end is `none`, the element stays visible for 0<p<1.
  - Chrome's article: `display` and `content-visibility` switch at the start when animating in and at the end when animating out.
- **Chromium:**
  - display and content-visibility in keyframes: M116 (chromestatus 5154958272364544)
  - transition-behavior: M117 (5071230636392448)
  - overlay: M117 (5138724910792704)
  - All are in 153.
- **overlay:** CSS Position 4 §3.4, https://drafts.csswg.org/css-position-4/#overlay. Values `none | auto`. Only the UA sets it ("can't be set by authors at all"), but authors can transition it.
  - Top-layer removal (§3.3, https://drafts.csswg.org/css-position-4/#top-layer) removes the UA `overlay: auto !important` rule and appends the element to "pending top layer removals".
  - Without an `overlay` transition the element "immediately go[es] back to being clipped" (Chrome article).
- **Gotchas:**
  - The `transition` shorthand resets transition-behavior, so declare `allow-discrete` after the shorthand (Chrome article).
  - chromestatus 5103791907143680 ("Deprecate and remove: CSS overlay property", proposed, created 15 Jan 2026, no milestones) would keep elements in the top layer automatically during exit animations. Its CSSWG PR #13234 (https://github.com/w3c/csswg-drafts/pull/13234) was open with no reviews.
- **Native event timing:** HTML "close the dialog" (https://html.spec.whatwg.org/multipage/interactive-elements.html#close-the-dialog) queues `toggle` and `close` tasks at state change, not after the exit transition. Native close events therefore fire before an exit animation finishes, while Bootstrap's `hidden` fires after it.
- **Accessibility:** none of its own.
- **Bootstrap fit:**
  - It could carry exit fades with `display:none` at the end for collapse (`.collapse:not(.show){display:none}`), fade/toast and offcanvas.
  - It removes the inline `style.display='block'` toggling in modal.
  - For a native `<dialog>` or popover modal/offcanvas, it is what keeps the backdrop and box painted during exit.
  - `hidden.bs.*` still has to wait on the transition, because native close events do not.

### 4. interpolate-size and calc-size()
- **Spec:** CSS Values 5 §11 (https://drafts.csswg.org/css-values-5/#calc-size) and §11.3 (#interpolate-size). Editor's Draft, 4 Sep 2026, described as early exploration with "major breaking changes are expected".
- **Chromium:** M129, chromestatus 5196713071738880. In 153.
- **Values:** `numeric-only` (default) or `allow-keywords`; setting it on `:root` covers the page through inheritance. Syntax: `calc-size(<basis>, <calc-sum>)` with the `size` keyword (https://developer.chrome.com/docs/css-ui/animate-to-height-auto).
- **Limit:** "Interpolation between two intrinsic sizing keyword is not possible", so one end must be a length or percentage (same article).
- Firefox and Safari do not support it (article). That does not matter for a Chromium-only target.
- **Events, focus, keyboard, accessibility:** none of its own.
- **Bootstrap fit (collapse and accordion):**
  - `height:0` ↔ `height:auto`, combined with @starting-style and `display` allow-discrete, removes the `scrollHeight` measurement, the inline px height and the `reflow` (collapse.js:143,163,178-180,202).
  - `.collapse-horizontal` does the same with width.
  - Still required by the contract: the `.collapsing` class during motion, `aria-expanded` and `.collapsed` on triggers, `show/shown/hide/hidden`, and the `_isTransitioning` guard.

### 5. Same-document View Transitions
- **Spec:** CSS View Transitions 1, W3C Candidate Recommendation Draft, 28 Mar 2024 (https://www.w3.org/TR/css-view-transitions-1/).
  - `startViewTransition` and `ViewTransition` with `updateCallbackDone`, `ready`, `finished` and `skipTransition()`: §6.1.1 / §6.2 (https://drafts.csswg.org/css-view-transitions-1/#the-domtransition-interface).
- **Chromium:** M111, chromestatus 5193009714954240. In 153.
- **Later additions:**
  - transition types: M125 (5089552511533056)
  - `view-transition-class`: M125 (5064894363992064)
  - non-nullable callback: M120
  - `document.activeViewTransition`: shipping stage M142 (5067126381215744)
  - `waitUntil()`: shipping stage M144, flag `ViewTransitionWaitUntil` (4812903832223744)
- **Events:** none. The lifecycle is promise-based.
  - Starting a new transition skips the active one "with an AbortError DOMException" (§6.1.1).
  - Hiding the document skips it (§7.6).
  - `ready` rejects on duplicate names; "If two rendered elements have the same view-transition-name… the transition will be skipped" (https://developer.chrome.com/docs/web-platform/view-transitions/same-document).
- **Interaction:** during rendering suppression, "all pointer hit testing must target its document element" (§7.1.1). Captured elements are painted as opacity 0 and get no hit testing during animation (§4.2).
- **Stacking:** the view transition layer "paints after all other content… (including… the top layer)" (§4.2).
- **Pseudo-elements to style:** `::view-transition`, `-group()`, `-image-pair()`, `-old()`, `-new()` (§3.2). The UA default is a 0.25s cross-fade (§5).
- **Focus and accessibility:** nothing specific confirmed.
- **Reduced motion:** the spec has no handling (summary of §5). Chrome's guidance is to reduce motion, not remove it.
- **Bootstrap fit:**
  - Carousel slide and fade, and tab pane swap (fade), are candidates.
  - Carousel's contract needs the item and indicator classes (`carousel-item-next/prev/start/end`, `active`), `slide` (cancelable) before and `slid` after, `_isSliding` blocking new slides, and the cycle/pause timing.
  - VT's abort-on-restart differs from Bootstrap ignoring input while sliding.
  - Document scope blocks pointer input page-wide during capture.

### 6. Element-scoped View Transitions
- **Spec:** CSS View Transitions 2, https://drafts.csswg.org/css-view-transitions-2 (Editor's Draft).
- **Chromium:** dev trial M140; shipped in M147 stable per https://developer.chrome.com/blog/element-scoped-view-transitions. chromestatus 5109852273377280 (shipping stage desktop 147; flag `enable-experimental-web-platform-features` for the trial). In 153.
- **API:** `element.startViewTransition({callback})`.
  - The scope root automatically gets `contain: layout` and `view-transition-scope: all`, and participates in its own transition by default.
  - Pseudo-elements are affected by ancestor clips and transforms (chromestatus summary).
  - Concurrent and nested transitions are allowed, and the rest of the page stays interactive (blog).
  - `::view-transition-group-children()` clips when the root clips overflow.
- **Related:** "size containment for capture" is proposed (5200894124752896). `CSSPseudoElement` for `::view-transition` is listed at M152 (6516055192240128).
- **Bootstrap fit:** carousel (`.carousel-inner` as scope), tab-content and accordion reflow animations without blocking the page.
  - Added `contain: layout` changes containing-block and positioning behaviour inside the scope during the transition.

### 7. Scroll-driven animations
- **Spec:** https://drafts.csswg.org/scroll-animations-1 (Editor's Draft, 25 Sep 2026).
  - `scroll()` / `view()`, `ScrollTimeline` / `ViewTimeline`, `animation-range`, `scroll-timeline-*`, `view-timeline-*`, `timeline-scope`.
  - A timeline is inactive when the scroller has no scrollable overflow.
- **Chromium:** M115, chromestatus 6752840701706240 (shipping stage 115). In 153. Timeline range `scroll` is listed at M147 (6522328437620736).
- **Gotchas:** `animation-timeline` is "not part of the animation shorthand", so declare it after the shorthand. Use `animation-duration: auto`. These animations run off the main thread (https://developer.chrome.com/docs/css-ui/scroll-driven-animations).
- **Events:** standard animation events with direction-dependent timing (spec summary; unverified detail).
- **Focus, keyboard, accessibility:** none.
- **Bootstrap fit:** no direct plugin carry.
  - Scrollspy's contract (`.active` on nav links, `activate.bs.scrollspy` with `relatedTarget`) needs JS state that timelines do not set.
  - Possible uses are visual extras only, such as a progress indicator, outside Bootstrap's contract.

### 8. Web Animations getAnimations() and `finished`
- **Spec:** Web Animations 1, TR Working Draft 5 Jun 2023 (https://www.w3.org/TR/web-animations-1/); Editor's Draft 23 Sep 2026.
  - `getAnimations()` returns relevant animations, including CSS transitions and animations, in composite order.
  - `finished` "is replaced with a new promise every time the animation leaves the finished play state".
  - `cancel()` rejects it "with a DOMException named AbortError".
  - `finish` and `cancel` events are `AnimationPlaybackEvent`.
- **Chromium:** Web Animations API completion (promises, getAnimations): M84 (5126405660606464). Replaceable animations: M83. `Animation.overallProgress`: M133. In 153.
- **Bootstrap fit:** this is the direct replacement for `executeAfterTransition`'s timeout and first-duration-only heuristic for modal, offcanvas, fade, collapse, carousel, toast and backdrop.
  - Wait on all of the element's transitions instead of guessing one duration.
  - With `transition:none` (reduced motion) the list is empty, so completion can be immediate.
  - Cancellation rejects `finished` (AbortError), where Bootstrap's emulation always calls back. That needs handling.
  - Bootstrap waits on a specific element: `_dialog` for modal, the active item for carousel. Native code must query the same element.

### 9. prefers-reduced-motion
- **Spec:** Media Queries 5 §12.1, https://drafts.csswg.org/mediaqueries-5/#prefers-reduced-motion. Values `no-preference | reduce`.
- **Chromium:** M74, chromestatus 5597964353404928. `Sec-CH-Prefers-Reduced-Motion` header: M108. In 153.
- **Bootstrap fit:** Bootstrap already handles it in Sass (§0). View Transitions get no UA reduction (§5), so the styles surface would own reduced-motion rules for any VT, @starting-style or scroll-driven CSS.

## Matrix

| Feature | Chromium milestone | In 153 | Candidate Bootstrap subjects | Styling needs |
|---|---|---|---|---|
| @starting-style | 117 | Yes | modal, toast, backdrop, collapse show, offcanvas, fade; removes `reflow()` | Entry-state rules keyed to the element becoming rendered; mind the cascade |
| transition-behavior allow-discrete (display) | 116 (keyframes) / 117 | Yes | collapse, fade, toast, offcanvas exit to `display:none`; modal `display` toggling | Declare after the `transition` shorthand; add `display` to the transition list |
| overlay | 117 (removal proposed, no milestone) | Yes | native dialog or popover modal/offcanvas exit plus `::backdrop` | Transition `overlay` with allow-discrete; watch the removal proposal |
| interpolate-size / calc-size() | 129 | Yes | collapse and accordion (height/width to auto) | `interpolate-size: allow-keywords` on `:root` or the element; one end must be a length |
| Same-document View Transitions | 111 (+120/125/142/144 additions) | Yes | carousel, tab fade | `::view-transition-*` pseudo-elements; unique names; reduced-motion rules |
| Element-scoped View Transitions | 147 | Yes | carousel inner, tab-content, accordion | Scope gets `contain: layout`; group-children clipping |
| Scroll-driven animations | 115 | Yes | none for the contract; scrollspy visuals only | `animation-timeline` after the shorthand; `duration: auto` |
| getAnimations() / finished | 84 | Yes | replaces `executeAfterTransition` in every animated plugin | None; must handle AbortError |
| prefers-reduced-motion | 74 | Yes | all transitions; Bootstrap Sass already gates them | Author rules for VT, @starting-style and timelines |

## Unknowns
- Whether `getAnimations()` flushes pending style. The spec wording ("flushes pending style changes" or "triggers a style change event") could not be quoted exactly. The exact definition of "relevant animation" (current or in effect, which would include delayed transitions) is also unconfirmed.
- Whether `AnimationPlaybackEvent` bubbles or is cancelable; not confirmed.
- Whether the M142 (`activeViewTransition`), M144 (`waitUntil`) and M151 (`TransitionEvent.animation`) items are enabled by default in 153. chromestatus showed shipping-stage milestones, but status text read "Proposed".
- Whether the `overlay` removal (chromestatus 5103791907143680, CSSWG PR #13234) has landed in Chromium by 153. I found no milestone. The PR's status after its snapshot is unconfirmed.
- Whether display-at-start-on-entry and display-at-end-on-exit applies to transitions as well as keyframes. Only the Chrome article stated it; the CSS Display 4 §2.9 text was paraphrased by a summarizer, not quoted.
- Full CSS Values 5 §11.3 property table (initial value, inherited, animation type); the page was truncated.
- Focus behaviour of View Transitions (whether focus or the accessibility tree is affected during capture); not found.
- Scroll-driven animation event timing when scrolling backwards; seen only in summary, unverified.
- Media Queries 5 maturity. The fetch reported "W3C Working Draft, 29 June 2026" from the drafts URL, which is unverified.
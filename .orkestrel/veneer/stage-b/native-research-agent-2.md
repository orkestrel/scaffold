**Question.** For the disclosure, scrolling and focus cluster: what does each native feature do, which Chromium milestone shipped it and does Chromium 153 have it, and what changes when it is reconciled with Bootstrap 5.3.8's collapse, accordion, tab, carousel, scrollspy and scroll-lock contracts?

**Facts**

Chromium 153 reached stable on 2026-09-08. Its release notes list none of this cluster's features (https://developer.chrome.com/release-notes/153). I also checked the 151 and 152 notes and found none there either. The local `elements` repo was used only for leads and for its copy of the HTML rendering section; every claim below cites the primary URL. Bootstrap facts come from `C:\Users\mikes\WebstormProjects\veneer\node_modules\bootstrap\`.

### 1. `details` / `summary`: exclusive accordion, `::details-content`, `toggle`

- **Spec:** WHATWG HTML, living standard. https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element
- **Shipped:**
  - `name` (exclusive accordion): Chrome 120 (chromestatus 6710427028815872; https://developer.chrome.com/docs/css-ui/exclusive-accordion).
  - `::details-content` and removal of the `display` restrictions on details: Chrome 131 (chromestatus 5112013093339136, flag `DetailsStyling`; https://developer.chrome.com/blog/styling-details).
  - Auto-expand on find-in-page and fragment navigation: Chrome 97 (chromestatus 5032469667512320).
  - `:open` (matches open details): Chrome 133 (chromestatus 5085419215781888).
  - `interpolate-size` / `calc-size()` for height-to-auto animation: Chrome 129 (chromestatus 5196713071738880).
  - All are in 153.
- **Exclusivity:**
  - Opening one member closes the others. #ensure-details-exclusivity-by-closing-other-elements-if-needed: "Remove the open attribute on otherElement".
  - When an open details is inserted or its `name` changes, the newcomer is closed if another member is already open (#ensure-details-exclusivity-by-closing-the-given-element-if-needed).
  - Members do not have to be siblings; any details sharing a `name` form one group (exclusive-accordion article).
- **Events:**
  - `toggle` is a `ToggleEvent` with `oldState`/`newState` (#queue-a-details-toggle-event-task).
  - It is queued as a task, not fired synchronously, and it is not cancelable.
  - Rapid toggles "essentially get coalesced so that only one event is fired."
  - There is no native before-open event.
- **Cancelling:** summary activation flips `open` (#the-summary-element). Activation behavior only runs if the click's "canceled flag is unset" (https://dom.spec.whatwg.org/#concept-event-dispatch, step 12). So calling `preventDefault()` on the summary `click` is the only way to veto opening.
- **Content model:** summary is "Phrasing content, optionally intermixed with heading content" and must be the first child. Details holds "One summary element followed by flow content" (#the-summary-element).
- **Spec limits on use:** "Tab widgets and menu widgets are not disclosure widgets," and details is "not appropriate for footnotes" (#the-details-element).
- **UA rendering** (https://html.spec.whatwg.org/multipage/rendering.html#the-details-and-summary-elements; local copy at `C:\Users\mikes\WebstormProjects\elements\guides\w3c\renderings.md:1239-1280`):
  - `details > summary:first-of-type { display: list-item; list-style: disclosure-closed inside }`.
  - When closed, the content slot (`::details-content`) gets "display: block; content-visibility: hidden;"; when open, `display: block`.
  - The spec notes that using content-visibility rather than `display:none` changes what layout APIs report.
  - Since Chrome 131 `::details-content` is `display:block` instead of `contents`, which can affect `height:100%`. Animating needs `interpolate-size: allow-keywords` or `calc-size()`, plus `overflow: clip` and `content-visibility … allow-discrete`. Marker styling is "non-interoperable" (styling-details article).
  - `::details-content` is listed under "Element-backed Pseudo-Elements" in css-pseudo-4 §5.2 (Editor's Draft, 2026-09-10; https://drafts.csswg.org/css-pseudo-4/#details-content-pseudo).
- **Accessibility:** html-aam maps details to role `group` (Editor's Draft 2026-07-29, §3.5.31; https://w3c.github.io/html-aam/). I could not retrieve the summary mapping.
- **Focus, keyboard, stacking:** summary is focusable and activates like a button. There is no focus trap, no light dismiss and no top layer.
- **Bootstrap clash:** reboot sets `summary { display: list-item; cursor: pointer }` (`scss/_reboot.scss:596-599`). This matches the UA style.
- **Bootstrap subjects:** collapse and accordion.
  - Collapse fires a cancelable `show/hide.bs.collapse` before any change, then `shown/hidden` after the `.collapsing` height transition (`js/src/collapse.js:129-205`).
  - It toggles `.collapse/.collapsing/.show` on the panel and `.collapsed` plus `aria-expanded` on every trigger (`collapse.js:244-252`).
  - The accordion uses `data-bs-parent` rather than `name` (`collapse.js:119-136`).
  - Collapse supports many triggers per panel, horizontal collapse (`.collapse-horizontal`), and triggers anywhere in the document.
  - Native details changes this contract in five ways: there is one toggle (the first summary, which must be inside details), the trigger and panel markup is reshaped, there is no cancelable pre-event, `toggle` arrives asynchronously after the change, and open state lives in the `[open]` attribute rather than `.show`.

### 2. `hidden="until-found"` and `beforematch`

- **Spec:** WHATWG HTML, #the-hidden-attribute and #ancestor-revealing-algorithm in https://html.spec.whatwg.org/multipage/interaction.html.
- **Shipped:** Chrome 102 (chromestatus 5400510406328320; https://developer.chrome.com/docs/css-ui/hidden-until-found). Chrome 141 updated the revealing algorithm "to prevent the browser from getting stuck in an infinite loop" (chromestatus 5179013869993984, whatwg/html#11457). Both are in 153.
- **Revealing algorithm:**
  - It collects ancestors from the target outward through the flat tree.
  - For each `until-found` ancestor it fires `beforematch` (bubbles: true) and then removes `hidden`.
  - For each closed details it sets `open`.
  - It stops if a node is no longer connected.
  - The spec only initialises `bubbles`, so `beforematch` is not cancelable.
  - It runs for find-in-page and for fragment navigation.
- **Rendering:** the UA rule is `[hidden=until-found i]:not(embed) { content-visibility: hidden; }` (rendering §15.3.1). The element keeps its box, so borders, padding and explicit sizes still render, and `getBoundingClientRect` reports space (hidden-until-found article).
- **Bootstrap clashes:**
  - `[hidden] { display: none !important; }` in `scss/_reboot.scss:615-617` overrides `until-found`, so the content can never be found.
  - `.collapse:not(.show) { display: none }` (`scss/_transitions.scss:10-14`), `.tab-content > .tab-pane { display: none }` (`scss/_nav.scss:191-193`) and `.carousel-item { display: none }` (`scss/_carousel.scss:29-31`) would also hide content from find-in-page.
- **Accessibility, focus, top layer:** content-visibility-hidden content is not rendered. There is no focus effect and no top layer.
- **Bootstrap subjects:** collapse, accordion, tab panes, possibly carousel items. A `beforematch` reveal skips the cancelable `show.*` event and the transition. The engine would have to sync `.show`/`.active`, `aria-expanded`/`aria-selected` and `.collapsed` after the fact, and deactivate siblings for an accordion or tab set.

### 3. CSS overflow carousels: `::scroll-button()`, `::scroll-marker`, `::scroll-marker-group`, `::column`, `:target-current`

- **Spec:** CSS Overflow 5, Editor's Draft 2026-08-04 (https://drafts.csswg.org/css-overflow-5/): §3.1.3 #scroll-marker-group-property, §3.1.6 #scroll-marker-modes, §3.1.8 #active-scroll-markers-calculation, §3.1.9 #scroll-marker-activation, §3.2 #scroll-buttons.
- **Shipped:**
  - `::scroll-marker` and `::scroll-marker-group`: Chrome 135 (chromestatus 5160035463462912).
  - `::scroll-button()`: Chrome 135 (chromestatus 5093129273999360).
  - `::column` and nested pseudo-elements: Chrome 135 (https://developer.chrome.com/release-notes/135).
  - All are in 153.
  - **`scroll-marker-group` modes (`links` / `tabs`) are slated for 154 and are not in 153** (chromestatus 5109685301673984: "links mode (default…) and tabs mode").
  - `scroll-initial-target`: chromestatus 6276178888097792 shows "In development" with no milestone.
- **Grammar:** `scroll-marker-group: none | [ [ before | after ] || [ links | tabs ] ]`, initial `none`.
- **Scroll buttons:**
  - Directions: up, down, left, right, block-/inline-start/end, prev, next, or `*`.
  - They scroll "by one page," like PgUp/PgDn. The Chrome article says "85% of a scroll area."
  - `:disabled` matches when the container cannot scroll in that direction.
  - They are focusable. While a scroll control is focused, `activeElement` is the scroll container.
- **Marker modes per the spec (154 semantics):**
  - Links mode: roles `navigation`/`link`, and every marker is a tab stop.
  - Tabs mode: roles `tablist`/`tab`/`tabpanel`. Only the active marker is a tab stop, arrow keys move between markers, and inactive content is "hidden from the accessibility tree."
- **Marker behavior as shipped in 135:** markers behave "like a focusgroup" with arrow keys and are exposed with "tablist" semantics (https://developer.chrome.com/blog/carousels-with-css).
- **Activation and active marker:**
  - Activating a marker scrolls the target into view. With invocation it also follows the hyperlink, updating the URL.
  - Focus is lost from the marker in links mode and kept in tabs mode.
  - The active marker is computed from the "eventual scroll position."
  - No carousel-specific events exist. Observers have only `scroll`/`scrollend` (Chrome 114, chromestatus 5186382643855360) and the snap events (section 6).
- **Top layer:** none. Markers and buttons are generated boxes that the page must style completely.
- **Bootstrap subject: carousel.**
  - Options: `interval` 5000, `keyboard`, `pause: 'hover'`, `ride`, `touch`, `wrap: true` (`js/src/carousel.js:70-76`).
  - A cancelable `slide.bs.carousel` (`carousel.js:326`) is followed by `slid`.
  - Keys are ArrowLeft/ArrowRight only (`carousel.js:65-67`).
  - Indicators use `[data-bs-slide-to]` with `aria-current` (`carousel.js:278-284`).
  - The visible slide is the one with `.active`; others are `display:none` and the effect is a transform or fade.
  - The native path has no autoplay, no cyclic wrap (Chrome lists cyclic scrolling as future work), no cancelable pre-event, and no `.active` class. Markup changes to a scroll container plus pseudo-elements, and the marker accessibility semantics change between 153 and 154.

### 4. `scroll-target-group` and `:target-current` (scrollspy)

- **Spec:** CSS Overflow 5, #scroll-target-group. `auto` makes the element a "scroll marker group container"; its fragment anchors act as scroll markers.
- **Shipped:** Chrome 140, stable 2025-09-02 (https://developer.chrome.com/release-notes/140; chromestatus 5189126177161216, flag `CSSScrollTargetGroup`). In 153.
- **Related:** `:target-before` and `:target-after` are listed for 142 (chromestatus 5120827674722304, flag `CSSScrollMarkerTargetBeforeAfter`). I did not confirm them in release notes.
- **Events:** none. The state is exposed only as a pseudo-class.
- **Active algorithm:** the spec's eventual-scroll-position algorithm (§3.1.8). Bootstrap instead uses an IntersectionObserver with `rootMargin: '0px 0px -25%'` and `threshold: [0.1, 0.5, 1]` (`js/src/scrollspy.js:41-46`).
- **Bootstrap subject: scrollspy.** Bootstrap fires `activate.bs.scrollspy` (`scrollspy.js:24`), adds `.active` to nav-links and their parent links, and offers `smoothScroll` (`scrollspy.js:128-147`). The native path gives no event, no class, different activation thresholds, and URL updates on activation per §3.1.9.

### 5. Scroll-state container queries

- **Spec:** CSS Conditional 5, Working Draft 2026-06-30, §6.3 (https://drafts.csswg.org/css-conditional-5/#scroll-state-container). Needs `container-type: scroll-state`. Features are `stuck`, `snapped`, `scrollable` and `scrolled`, and only descendants of the container query it.
- **Shipped:** `stuck`/`snapped`/`scrollable` in Chrome 133 (chromestatus 5072263730167808). `scrolled` in Chrome 144, stable 2026-01-13 (chromestatus 5083137520173056; https://developer.chrome.com/release-notes/144). In 153.
- **Events, focus, accessibility, top layer:** none (CSS only).
- **Bootstrap subjects:** carousel styling (style the snapped slide's descendants instead of `.active`), the `.sticky-top` stuck state, and scroll-button visibility through `scrollable`. These are styling-only conveniences.

### 6. Scroll snap and snap events

- **Spec:** css-scroll-snap-1, Candidate Recommendation Snapshot 2021-03-11 (https://www.w3.org/TR/css-scroll-snap-1/). It requires re-snapping after layout changes and leaves animation and physics to the user agent.
- **Snap events:** css-scroll-snap-2, Editor's Draft 2026-02-25, #snap-events. `scrollsnapchange` fires "before a scrollend event" when the snap target changes. `scrollsnapchanging` fires during the scroll. Both expose `snapTargetBlock` and `snapTargetInline`. I did not establish whether they are cancelable.
- **Shipped:** snap events in Chrome 129 (chromestatus 5826089036808192). In 153.
- **Bootstrap subject: carousel.** Snap supplies item-by-item positioning, and `scrollsnapchanging` → `scrollsnapchange` → `scrollend` is a native sequence that could correlate with `slide` → `slid`. None of these events can veto the move.

### 7. `scrollbar-gutter`

- **Spec:** css-overflow-3, Editor's Draft 2026-08-13 (https://drafts.csswg.org/css-overflow-3/#scrollbar-gutter-property). Grammar is `auto | stable && both-edges?`, not inherited.
  - With `stable`, the gutter is present "when overflow is hidden, scroll, or auto, regardless of whether the box is actually overflowing."
  - Overlay scrollbars never get a gutter.
  - On the root element the property applies to the viewport and does not propagate from body.
- **Shipped:** Chrome 94 (chromestatus 5746559209701376). In 153.
- **Bootstrap subjects:** scroll lock and scrollbar compensation for modal and offcanvas. `ScrollBarHelper` sets `body { overflow: hidden }`. It then adds padding-right equal to `innerWidth - documentElement.clientWidth` to body and to `.fixed-top`, `.fixed-bottom`, `.is-fixed` and `.sticky-top`, adds a negative margin-right to `.sticky-top`, and saves the original values in `data-bs-padding-right` / `data-bs-margin-right` (`js/src/util/scrollbar.js:16-62`).
- **Elements repo observation:** the elements stylesheet notes that a stable gutter shrinks `html` `clientWidth` and makes fixed-position insets asymmetric (`C:\Users\mikes\WebstormProjects\elements\src\styles\surfaces\_scrollbar.scss:60-74`). This is a secondary source.

### 8. `inert` and the CSS `interactivity` property

- **Spec:** WHATWG HTML §6.3, #the-inert-attribute.
  - Inert nodes "generally cannot be focused" and are not exposed to accessibility APIs.
  - The user agent should ignore them for find-in-page.
  - Hit-testing acts as `pointer-events: none` and selection as `user-select: none`.
  - A modal dialog escapes the inertness of its ancestors (§6.3.1).
  - There is no default visual style.
- **Shipped:**
  - `inert` attribute: Chrome 102 (chromestatus 5703266176335872).
  - `interactivity: inert`: listed under Chrome 135 in the release notes (https://developer.chrome.com/release-notes/135), but chromestatus 5107436833472512 names the flag `#enable-experimental-web-platform-features` and links only an explainer (github.com/flackr/carousel).
- **Focus:** there is no initial focus and no restoration. Inert creates a boundary rather than a trap.
- **Bootstrap subjects:** the focus trap used by modal and offcanvas. `FocusTrap` autofocuses the trap element and listens for `focusin` and Tab `keydown` on document (`js/src/util/focustrap.js:27, 67-73, 89-98`). Making the rest of the page inert would replace that redirect. Inert can also stand in for hiding collapsed or inactive panels from focus, and it changes find-in-page reach.

### 9. `focusgroup`

- **Spec:** whatwg/html PR #11723, still open (revisions through 2026-05); chromestatus maturity is "under development in a Working Group." Open UI explainer: https://open-ui.org/components/scoped-focusgroup.explainer/.
- **Shipped:**
  - Origin trial in Chrome 146-149, shipped in **Chrome 150**, stable 2026-06-30. Chrome 150 lists it under "DOM and HTML" (https://developer.chrome.com/release-notes/150), and the Intent to Ship targets 150 (http://www.mail-archive.com/blink-dev@chromium.org/msg16361.html).
  - The chromestatus 5637601087193088 status field still reads "In developer trial (Behind a flag)," which conflicts with the release notes.
  - Treated as in 153.
- **Syntax (explainer):** `focusgroup="<behavior> [inline|block] [wrap|nowrap] [nomemory]"`.
  - Behaviors: toolbar, tablist, radiogroup, listbox, menu, menubar; `none` opts a subtree out.
  - Defaults: tablist is inline + wrap; toolbar is inline without wrap; menu is block + wrap.
  - It gives one guaranteed tab stop and last-focused memory. `focusgroupstart` sets the first entry point.
  - Calling `preventDefault()` on the keydown cancels the movement. Text inputs keep their arrow keys.
  - Roles are inferred only on generic elements. The PR later moved role inference out to accessibility specs.
- **Selection:** "focusgroup is decoupled from selection." It moves focus only; it does not select tabs.
- **Item rules:** `tabindex="-1"` elements are left out of initial arrow navigation (explainer; the PR says they are "excludable").
- **Bootstrap subject: tab.**
  - Bootstrap handles ArrowLeft/Right/Up/Down plus Home/End, wraps, skips disabled tabs, and selection follows focus (`js/src/tab.js:155-177`).
  - It sets `tabindex="-1"` on inactive tabs and fills in role/`aria-selected`/`aria-labelledby` (`tab.js:187-227`).
  - **That `tabindex="-1"` would drop inactive tabs out of focusgroup arrow navigation.**
  - Home/End semantics are not documented in the sources I reached.
- **Bootstrap subject: toolbar.** `.btn-toolbar` has no Bootstrap JavaScript (no toolbar module exists in `js/src`).

### 10. Tabs and toolbar patterns (Open UI / WHATWG)

- **Tabs:** Open UI has only a research page (last updated 2023-08-26; https://open-ui.org/components/tabs.research/) with no keyboard spec. The nearest native tabs are CSS Overflow 5 tabs mode, which is not in 153.
- **Toolbar:** a proposed `<toolbar>` element, incubated in a Community Group (chromestatus 5383423793430528, no milestone; explainer https://open-ui.org/components/toolbar.explainer, 2026-06-04).
  - Implicit `role="toolbar"`, arrow keys plus Home/End, and a single tab stop.
  - It claims the same behavior as a toolbar focusgroup "including wrap-around," which conflicts with the focusgroup explainer's toolbar default of no wrap.
  - Not in 153.

**Matrix**

| Feature | Chromium milestone | In 153 | Candidate Bootstrap subjects | Styling needs |
|---|---|---|---|---|
| details `name` exclusive accordion | 120 | Yes | accordion (`data-bs-parent`) | summary marker; spacing between group members |
| `::details-content` and details display unlock | 131 | Yes | collapse/accordion transition | height animation needs `interpolate-size` (129) or `calc-size()`, plus `overflow: clip` and `content-visibility` allow-discrete; `display:block` side effects |
| details `toggle` (ToggleEvent, async, not cancelable) | ToggleEvent 114 per secondary source | Yes (unverified milestone) | `shown/hidden.bs.collapse` correlation | none |
| `:open` | 133 | Yes | collapse/accordion state styling | selector for `[open]` |
| Find-in-page auto-expand of details | 97 | Yes | collapse/accordion | closed content must stay content-visibility-hidden, not `display:none` |
| `hidden=until-found` + `beforematch` | 102; algorithm fix 141 | Yes | collapse, accordion, tab panes, carousel items | neutralise reboot `[hidden]{display:none!important}` and the `display:none` on `.collapse:not(.show)`, `.tab-pane`, `.carousel-item`; the box stays visible |
| `::scroll-button()` | 135 | Yes | carousel prev/next controls | full button styling; `:disabled` state |
| `::scroll-marker` / `::scroll-marker-group` / `::column` / `:target-current` | 135 | Yes | carousel indicators | marker and group layout; current marker state |
| scroll-marker-group `links` / `tabs` modes | 154 (proposed) | No | tab, carousel | not applicable |
| `scroll-target-group` | 140 | Yes | scrollspy | `:target-current` link styling replaces `.active` |
| `:target-before` / `:target-after` | 142 (chromestatus only) | Probably (unverified) | scrollspy, carousel | before/after states |
| scroll-state queries (stuck, snapped, scrollable) | 133 | Yes | carousel, sticky-top | container-type declarations |
| scroll-state `scrolled` | 144 | Yes | none directly | same |
| Scroll snap level 1 | not confirmed | Yes (long shipped; unverified milestone) | carousel | snap-type, snap-align, snap-stop |
| `scrollsnapchange` / `scrollsnapchanging` | 129 | Yes | carousel `slide`/`slid` correlation | none |
| `scrollend` | 114 | Yes | carousel and scrollspy transition waits | none |
| `scrollbar-gutter` | 94 | Yes | scroll lock / scrollbar compensation | root gutter declaration; would double-count with `ScrollBarHelper` (inference) |
| `inert` attribute | 102 | Yes | focus trap (modal, offcanvas), hidden panels | no UA style; page supplies any visual cue |
| CSS `interactivity` | 135 (flag status unclear) | Unclear | same as inert | CSS property |
| `focusgroup` | OT 146-149, shipped 150 | Yes (chromestatus status field conflicts) | tab arrow keys and roving tabindex; `.btn-toolbar` | none required |
| `scroll-initial-target` | none | No | carousel start slide | not applicable |
| `<toolbar>` element | proposed | No | `.btn-toolbar` | not applicable |

**Unknowns**

1. The Chromium milestone when details `toggle` became a `ToggleEvent`. "114" comes from secondary search results only, and chromestatus 5078613609938944 (132) concerns dialog.
2. Whether 153 scroll markers expose tablist semantics, as the Chrome 135 article says, or links semantics. The modes that make `links` the default ship in 154.
3. Whether `scrollsnapchange` and `scrollsnapchanging` are cancelable or bubble, and what they target for the root scroller.
4. The html-aam mapping for `summary`, including whether it exposes expanded/collapsed state. I could not retrieve it.
5. The HTML focus fixup rule's exact steps, and whether blur fires when the focused element becomes inert or hidden.
6. Focusgroup Home/End semantics, the exact token set (the PR lists `menulist`, the explainer lists `menu`), and whether wrap is the default for toolbar.
7. Focusgroup's chromestatus status field ("developer trial") versus the Chrome 150 release-note entry.
8. Whether `interactivity: inert` is enabled by default in 153 or still behind the experimental flag.
9. Whether `:target-before` / `:target-after` shipped in 142. They appear only in chromestatus.
10. The scroll snap level 1 Chromium milestone. It was not found in chromestatus.
11. With `scrollbar-gutter: stable` on the root, whether `innerWidth - documentElement.clientWidth` stays above zero while body is `overflow:hidden`, which would make Bootstrap's padding compensation double up. This is inferred from the spec, not tested.
12. Whether `el.matches(':target-current')` can be read from script and whether anything notifies when it changes. No primary source found.
13. What "single-axis scroll containers" in Chrome 153 changes for horizontal carousels. The release notes name it without detail.
14. Whether a `beforematch` or details reveal inside a `name` group closes the open sibling. It follows from the attribute-change steps but I saw no explicit statement.

Sources: https://html.spec.whatwg.org/multipage/interactive-elements.html, https://html.spec.whatwg.org/multipage/interaction.html, https://html.spec.whatwg.org/multipage/rendering.html, https://dom.spec.whatwg.org/#concept-event-dispatch, https://drafts.csswg.org/css-overflow-5/, https://drafts.csswg.org/css-overflow-3/#scrollbar-gutter-property, https://drafts.csswg.org/css-conditional-5/#scroll-state-container, https://drafts.csswg.org/css-scroll-snap-2/#snap-events, https://www.w3.org/TR/css-scroll-snap-1/, https://drafts.csswg.org/css-pseudo-4/#details-content-pseudo, https://w3c.github.io/html-aam/, https://open-ui.org/components/scoped-focusgroup.explainer/, https://open-ui.org/components/toolbar.explainer, https://open-ui.org/components/tabs.research/, https://github.com/whatwg/html/pull/11723, https://chromestatus.com/feature/5637601087193088, https://developer.chrome.com/release-notes/135, https://developer.chrome.com/release-notes/140, https://developer.chrome.com/release-notes/144, https://developer.chrome.com/release-notes/150, https://developer.chrome.com/release-notes/151, https://developer.chrome.com/release-notes/152, https://developer.chrome.com/release-notes/153, https://developer.chrome.com/blog/carousels-with-css, https://developer.chrome.com/blog/styling-details, https://developer.chrome.com/docs/css-ui/exclusive-accordion, https://developer.chrome.com/docs/css-ui/hidden-until-found, http://www.mail-archive.com/blink-dev@chromium.org/msg16361.html
## Question
Cluster: positioning. This covers CSS anchor positioning (anchor-name, position-anchor, position-area, anchor(), anchor-size(), position-try-fallbacks, @position-try, position-try-order, position-visibility, anchor-scope), implicit anchors from popover sources and interest invokers, and anchored container queries. It also covers how these interact with the top layer, scroll containers, transforms and containing blocks, and which Popper.js modifiers have native equivalents. Target: Chromium 153.0.8010.12.

## Facts

### F1. Spec and maturity
- **CSS Anchor Positioning Level 1:**
  - The Editor's Draft is at https://drafts.csswg.org/css-anchor-position-1/.
  - https://www.w3.org/TR/css-anchor-position-1/ reports "W3C Working Draft", dated "27 March 2026".
  - One ED fetch linked a later WD, `WD-css-anchor-position-1-20260906`, which conflicts with that date (see U1).
  - Table of contents: §2 Determining the Anchor, §3 Anchor-Based Positioning, §4 Anchor-Based Alignment, §5 Anchor-Based Sizing, §6 Overflow Management, §7 Accessibility Implications, §8 DOM Interfaces.
- **Level 2:** https://drafts.csswg.org/css-anchor-position-2/ is an ED dated Oct 24 2025. It is a delta spec, "provided for discussion only", and it holds anchored container queries.

### F2. Core: anchor-name, position-anchor, anchor(), anchor-center
- **anchor-name** (§2.1): initial `none`. Applies to "all elements that generate a principal box".
- **position-anchor** (§2.4): applies to absolutely positioned boxes.
  - Values (Overview.bs, raw.githubusercontent.com/w3c/csswg-drafts/main/css-anchor-position-1/Overview.bs): `normal | none | auto | <anchor-name> | match-parent`, initial `normal`.
  - `normal`: "If position-area is none, behaves as none. Otherwise, behaves as auto."
  - `auto`: "Use the implicit anchor element if it exists".
- **Chromium 151 changed the initial value** of position-anchor from `none` to `normal`. Sources: chromestatus 5351959625334784 and https://developer.chrome.com/release-notes/151 ("Changes the initial value… from `none` to `normal`").
  - In 153, a popover that sets only `position-area` therefore anchors to its implicit anchor.
- **anchor()** (§3.2): "only allowed in the inset properties (and is otherwise invalid)". If it cannot be resolved, it "computes to its specified fallback value". With no fallback, the declaration is invalid at computed-value time.
- **anchor-center** (§4.2): "centered (insofar as possible) over the default anchor box". Near the edge of the original containing block it will "'shift' … to remain within the original containing block".
- **Acceptable anchor** (§2): the anchor must be "laid out strictly before" the positioned element. That holds in either of two cases:
  - (a) both have the "same original containing block", and the anchor is in a lower top layer, or in the same top layer but "not absolutely positioned or occurs earlier in the flat tree order";
  - (b) recursively, "the element generating possible anchor's containing block … is an acceptable anchor element".
  - Anchors inside skipped contents (`content-visibility`) are not acceptable.
  - The anchor name and the anchor reference must come from the same shadow tree.
- **Shipped:** Chromium 125, per https://developer.chrome.com/release-notes/125 ("CSS anchor positioning lets developers tether…") and https://developer.chrome.com/blog/anchor-positioning-api ("shipped in Chrome 125, with syntax updates in Chrome 129").
  - The chromestatus API (5124922471874560) still shows the status text "In developer trial (Behind a flag)" next to desktop 125. That field looks stale.
- **Renames** (https://developer.chrome.com/blog/anchor-syntax-changes):
  - `position-try-options` became `position-try-fallbacks` in 128.
  - `inset-area` became `position-area` in 129; `inset-area` was removed in 131 (release-notes/131).
  - The `inset-area()` wrapper inside fallbacks was dropped in 129.
- **Events, focus, keyboard, light dismiss:** none. This is a CSS layout feature, and the fetched spec content defines no events. Fallback changes cannot be observed as events (U4).

### F3. position-area
- §3.1: initial `none`. Applies to "positioned boxes with a default anchor box".
- It selects a cell region of a 3×3 grid and "makes that the box's containing block".
- When position-area is set, `normal` self-alignment goes "toward the non-specified side track".
- §4.1 overflow: if the box overflows its inset-modified containing block "but would still fit within its original containing block, by default it will 'shift'".
- Shipped 125 as `inset-area`; renamed `position-area` in 129 (chromestatus 5142143019253760, "Enabled by default"). Present in 153.
- The HTML spec's own `::picker(select)` UA rule uses `position-area: self-block-end span-self-inline-end`, `position-try-order: most-block-size` and `inset: auto; margin: 0`. Source: local mirror C:\Users\mikes\WebstormProjects\elements\guides\w3c\renderings.md:1685-1702. The live spec could not be reached to confirm (U7).

### F4. anchor-size()
- §5.1: allowed only in the accepted @position-try properties (insets, margins, sizing, self-alignment, position-anchor, position-area).
- Shipped 125 for sizing properties. Allowed in inset and margin properties from 132 (chromestatus 5203950077476864). Present in 153.

### F5. position-try-fallbacks, @position-try, position-try-order, position-try
- **position-try-fallbacks** (§6.1): initial `none`.
  - Values: `flip-block`, `flip-inline`, `flip-x`, `flip-y`, `flip-start`, a `<position-area>`, or a `<dashed-ident>` naming an @position-try rule. Keywords combine in order.
  - A fallback is tried when the box "overflows its inset-modified containing block" after any default scroll shift.
- **position-try-order** (§6.2): `normal | most-width | most-height | most-block-size | most-inline-size`, initial `normal`. `normal` walks the list in declaration order.
- **@position-try** (§6.4): only accepts insets, margins, sizing, self-alignment, position-anchor and position-area.
  - Implementations may cap the number of position options, but must allow at least 5.
- **When fallbacks are chosen:**
  - "At the time that ResizeObserver events are determined and delivered, the box must record the last successful position option" (Overview.bs).
  - An "anchor recalculation point" happens when the box "begins generating boxes", i.e. leaves `display:none`.
  - Within a layout pass, once fallback styles are determined, "laying out later boxes cannot change this decision".
- **Shipped:** 125. The 128 rename is in chromestatus 5090673808900096. Present in 153.
- **Gotcha (non-primary):** the elements repo records that in Chromium, once a popover flips at open it stays flipped while its anchor scrolls in a nested scroller. Source: C:\Users\mikes\WebstormProjects\elements\src\styles\surfaces\_anchor-position.scss:84-103. This is an observation, not a spec statement (U3).

### F6. position-visibility
- Overview.bs propdef: `always | [ anchor-valid || anchor-visible || no-overflow ]`, **Initial: anchor-visible**.
  - One rendered-ED fetch gave the initial value as `always`, which conflicts (U2).
- `anchor-visible`: hidden if the default anchor "is invisible or clipped by intervening boxes".
- `no-overflow`: hidden if the box "overflows its inset-modified containing block even after applying position-try".
- `always`: "This property has no effect."
- **Chromium status:**
  - The plural names `anchors-visible` and `no-overflow` are documented at https://developer.chrome.com/docs/css-ui/anchor-positioning-api. The milestone they shipped in is unconfirmed (U5).
  - The singular names `anchor-visible` and `anchor-valid` ship in **157** (chromestatus 5136123851571200 and 5136856479039488). They are **not in 153**.
  - `anchors-valid` "was implemented … but subsequently reverted" (5136856479039488).

### F7. anchor-scope
- §2.2: `none | all | <dashed-ident>`. It limits anchor-name visibility to a subtree.
- Shipped **131** (chromestatus 5094192052436992; release-notes/131 "Stable"). Present in 153.
- This matters for repeated components that reuse one anchor name (many `.dropdown` instances).

### F8. Implicit anchors
- **Popover sources (HTML):**
  - Show popover, step 22: "Set element's implicit anchor element to source." The hide popover cleanup sets it "to null". Source: https://html.spec.whatwg.org/multipage/popover.html#show-popover.
  - popovertarget activation runs show popover "given popover, false, and node" (the button).
  - `commandfor` popover commands pass the button as source (https://html.spec.whatwg.org/multipage/form-elements.html).
  - `showPopover({source})` takes its source from `options["source"]`.
  - Chromium **133** stable: release-notes/133, "Enables invoker relationships to create implicit anchor element references". chromestatus 5120638407409664 lists flag PopoverAnchorRelationships, and the feature ships by default. Present in 153.
  - Whether `show-modal` on `<dialog>` sets an implicit anchor could not be confirmed (U6).
- **Pseudo-elements:** "The implicit anchor element of a pseudo-element is its originating element" (§2, ED).
- **Interest invokers (`interestfor`):**
  - Not in the WHATWG HTML attribute index (indices.html fetch). The definition lives in the Open UI explainer, https://open-ui.org/components/interest-invokers.explainer/: "The interest invoker also becomes the popover's implicit anchor element".
  - Events `interest` and `loseinterest` are cancelable, except loseinterest triggered by Escape. Delays come from `interest-delay-start` / `interest-delay-end`. Touch has `::interest-button`.
  - Shipped stable in **142** (release-notes/142; chromestatus 4530756656562176). Present in 153.
- **Local Chromium 153 probe** (C:\Users\mikes\WebstormProjects\veneer\tmp\probes\stage-b\dropdown-anchor-popover.json):
  - With `position-area: block-end span-inline-end` and `flip-block`, a menu near the viewport bottom was placed above the toggle (menu bottom 854, toggle top 856).
  - A manual popover kept its UA box declarations: `position: fixed; inset: 0; margin: auto`; border 3px; padding 4px.

### F9. Anchored container queries
- Level 2 ED: `container-type: anchored` "establishes a query container… allowing for descendants of an anchor positioned element to be styled". The `@container anchored(fallback: …)` query tests which fallback is applied.
- Shipped **143**, enabled by default (https://developer.chrome.com/blog/anchored-container-queries; release-notes/143). chromestatus 5177580990496768 lists the flag "enable-experimental-web-platform-features", which looks like the developer-trial flag. Present in 153.
- **Limit:** only descendants of the positioned element can be styled, not the element itself.

### F10. Top layer, scrolling, transforms, containing blocks
- **Top layer** (https://drafts.csswg.org/css-position-4/#top-layer, ED 25 Dec 2025):
  - Containing block: "If its position property computes to fixed, its containing block is the viewport; otherwise, it's the initial containing block."
  - "Ancestor elements with overflow, opacity, mask, etc. cannot affect it."
  - It forms its own stacking context, and its parent stacking context is the root.
- **Anchor rule:** an anchor in a lower top layer (for example the document) is acceptable for a top-layer popover (F2a).
  - Chrome docs: anchor positioning lets top-layer elements "tether them back to, and scroll along with elements not in the top layer".
  - The same docs say popover UA styles "center them in the viewport by default", and recommend resetting with `inset: auto`.
- **UA styles to neutralise** (https://html.spec.whatwg.org/multipage/rendering.html §15.3.3):
  - `[popover]{position:fixed; inset:0; width:fit-content; height:fit-content; margin:auto; border:solid; padding:0.25em; overflow:auto; color:CanvasText; background-color:Canvas}`
  - `:popover-open::backdrop{… pointer-events:none !important; background-color:transparent}`
  - The fetched rendering section has no anchor-related UA rule for `[popover]`.
- **Scrolling** (§ "scroll"):
  - Only the default anchor gets "default scroll shift" compensation.
  - Other anchors use a "remembered scroll offset" snapshot taken at recalculation points.
  - When a default anchor is set and the abspos containing block is generated by a scroll container, "the scrollable containing block is used in place of the local containing block".
  - Remembered-scroll-offset sizing shipped **135** stable (release-notes/135; chromestatus 4710507824807936).
- **Transforms:**
  - The ED text still flags an issue that transforms are ignored.
  - Chromium **144** stable: anchor() and anchor-size() resolve "against the bounding box of the transformed anchor" (release-notes/144; chromestatus 5201048700583936). Present in 153.
- **DOM order:** Chrome blog, "The positioned element must appear after the anchor in the DOM". For popovers and dialogs, Chrome docs say the browser corrects focus navigation, so DOM order is not required.

### F11. Accessibility
- §7 (Overview.bs): "Authors must not rely on the visual connections implied by CSS positioning to link elements together semantically." It cites the Popover API as the semantic link.
- chromestatus 5068815373303808 ("Don't use aria-details for anchor positioning", desktop 144, flag NoAriaDetailsForAnchorPos):
  - "aria-details relationships for non-popover use cases… was likely a mistake".
  - "popovers and other semantic relationships *do* create aria-details".
  - Its rollout in 153 is not confirmed (U8).
- Chrome docs advise adding `aria-details` manually when a real semantic relationship exists.
- Related: https://github.com/w3c/html-aam/issues/545.

### F12. Bootstrap 5.3.8 and Popper 2.11.8 facts (installed)
- **Popper default modifiers:** `eventListeners, popperOffsets, computeStyles, applyStyles, offset, flip, preventOverflow, arrow, hide`. Source: C:\Users\mikes\WebstormProjects\veneer\node_modules\@popperjs\core\lib\popper.js:11.
- **eventListeners** re-run `update` on scroll of every scroll parent and on window resize (lib\modifiers\eventListeners.js:16-25).
- **hide** sets `data-popper-reference-hidden` and `data-popper-escaped` (lib\modifiers\hide.js:49-50).
- **flip:** with no fallbackPlacements, it uses the opposite placement, or expanded variations when `flipVariations` is on (lib\modifiers\flip.js:42).
- **Dropdown** (C:\Users\mikes\WebstormProjects\veneer\node_modules\bootstrap\js\src\dropdown.js):
  - Defaults: `boundary:'clippingParents'`, `display:'dynamic'`, `offset:[0,2]`, `reference:'toggle'` (73-77).
  - Virtual reference objects must have `getBoundingClientRect` (215-219). `reference:'parent'` uses the parent element (232-237).
  - Placement comes from `.dropend`, `.dropstart`, `.dropup-center`, `.dropdown-center`, `.dropup` and computed `--bs-position: end` (248-275).
  - Modifiers set: preventOverflow and offset only (296-310).
  - In a navbar or with `display:'static'`, it sets `data-bs-popper="static"` and disables applyStyles (312-319).
  - `popperConfig` is merged in (321-324). Public `update()` calls `_popper.update()` (179-182).
- **Dropdown CSS** (node_modules\bootstrap\scss\_dropdown.scss): the `[data-bs-popper]` static fallbacks are `top:100%; left:0; margin-top: var(--bs-dropdown-spacer)` (65-69), plus `.dropup`, `.dropend` and `.dropstart` variants (115-152). The responsive `.dropdown-menu{-bp}-start/end` classes set `--bs-position` (88-110).
- **Tooltip and popover** (node_modules\bootstrap\js\src\tooltip.js):
  - The RTL AttachmentMap swaps left and right (50-56).
  - Defaults: `container:false` (body, 559), `fallbackPlacements:['top','right','bottom','left']` (65), `offset:[0,6]` (67), `placement:'top'` (68).
  - Placement can be a function (374).
  - Modifiers: flip, offset, preventOverflow, and arrow with element `.tooltip-arrow` (397-424).
  - `onFirstUpdate` sets `data-popper-placement` on the tip (430-432). Public `update()` (284-286).
- **Placement-dependent CSS:** `.bs-tooltip-auto[data-popper-placement^="top|right|bottom|left"]` extends `.bs-tooltip-{side}` (node_modules\bootstrap\scss\_tooltip.scss:96-108). Arrow geometry is keyed on the side class (46-92). Same pattern in _popover.scss:164-173.

## Matrix

### Popper modifier to native mapping (the Orchestrator rules)

| Popper / Bootstrap mechanism | Native candidate | Evidence for | Evidence against / gap |
|---|---|---|---|
| Placement (`top`, `bottom-end`, `dropup`, `dropend`, `--bs-position`) | `position-area` (logical keywords also cover RTL) | F3; tooltip.js:50-56 handles RTL by hand | Function placement (tooltip.js:374) needs JS per show |
| `flip` with fallbackPlacements | `position-try-fallbacks` (flip-* keywords, position-area list, @position-try) with `position-try-order: normal` | F5; order-of-list semantics match | Popper re-runs on every scroll (eventListeners.js:16-25). Native recording happens at ResizeObserver timing with "last successful position option" retained; the elements repo reports flips stick while scrolling (U3) |
| `placement:'auto'` | `position-try-order: most-*` | F5 | Not identical. The elements repo judged it "too greedy" (non-primary) |
| `offset` [skidding, distance] | `margin` on the positioned box (distance); `anchor()` calc in insets (skidding) | F2, F4 | Function-form offset (dropdown.js:288-290, tooltip.js:386-388) has no native equivalent |
| `preventOverflow` (boundary `clippingParents` or an element) | Default "shift" within the original containing block (§4.1, §4.2) | F2, F3 | The boundary is always the containing block. A custom boundary element has no equivalent (U9) |
| `arrow` (centred on the reference, clamped) | Anchored container queries flip the arrow's side styles on descendants (143) | F9 | No native calculation of the arrow offset toward the anchor centre. Whether a descendant arrow can use anchor() to the trigger depends on the F2(b) recursion and is unverified (U10) |
| `data-popper-placement` attribute and `.bs-tooltip-auto[...]` CSS | `@container anchored(fallback: …)` | F9 | No attribute is set natively. Container queries cannot style the tooltip element itself, only descendants |
| `hide` (`data-popper-reference-hidden`, `-escaped`) | `position-visibility: anchors-visible` / `no-overflow` | F6 | No attributes and no events. Singular names only from 157 |
| `eventListeners` (scroll/resize update) | Default-anchor scroll compensation, remembered scroll offset (135) | F10 | Only the default anchor tracks scroll |
| `computeStyles` / `applyStyles` inline styles | None needed | F2 | Bootstrap's public `update()` (dropdown.js:179, tooltip.js:284) would have nothing to drive |
| `reference:'parent'` or element | `anchor-name` on that element, or `position-anchor` | F2 | Virtual reference with `getBoundingClientRect` (dropdown.js:215-219) has no equivalent; anchors must be elements or pseudo-elements |
| Navbar / `display:'static'` | No anchoring (keep `[data-bs-popper]` CSS) | dropdown.js:312-319 | n/a |
| `container` (tooltip appended to body) | Anchor must be laid out before; top layer avoids clipping | F2, F10 | A non-top-layer tooltip in body while the trigger sits inside a positioned or scrolling container depends on the F2(b) recursion; edge cases unverified |

### Closing table

| Feature | Chromium milestone | In 153 | Candidate Bootstrap subjects | Styling needs |
|---|---|---|---|---|
| anchor-name / position-anchor / anchor() / anchor-center | 125 (renames 128/129; initial `normal` 151) | Yes | dropdown, tooltip, popover; replaces Popper placement | `anchor-name` per instance; reset popover UA `inset:0; margin:auto` |
| position-area | 125 as inset-area; 129 rename | Yes | dropdown (dropup/dropend/dropstart/center, `--bs-position`), tooltip/popover placement | Map Bootstrap placement classes to areas; `align-self` / `justify-self` |
| anchor-size() | 125; insets/margins 132 | Yes | Dropdown min-width matching the toggle (no Bootstrap equivalent today) | Optional sizing rules |
| position-try-fallbacks / @position-try / position-try-order | 125; rename 128; inset-area() dropped 129 | Yes | Popper flip, fallbackPlacements, `auto` | Fallback lists per placement; max-block-size as demanded space |
| position-visibility | anchors-visible / no-overflow: 125? (U5); singular names and anchor-valid 157 | Plural forms: yes (unconfirmed milestone). Singular: no | Popper hide | Pick a value; initial value disputed (U2) |
| anchor-scope | 131 | Yes | Repeated dropdown/tooltip instances sharing a name | `anchor-scope` on component roots |
| Implicit anchor from popover source / commandfor / showPopover({source}) | 133 | Yes | dropdown or tooltip carried on popover | No anchor-name needed; neutralise popover UA box |
| Implicit anchor from interestfor | 142 (Open UI explainer, not WHATWG HTML) | Yes | tooltip, popover (hover/focus trigger) | `interest-delay`, `::interest-button` |
| Anchored container queries | 143 | Yes | tooltip/popover arrow side (replaces `data-popper-placement` CSS) | `container-type: anchored`; arrow rules per fallback |
| Remembered scroll offset | 135 | Yes | Popper eventListeners | None |
| Transformed anchors | 144 | Yes | Anchors inside transformed carousel or offcanvas | None |
| No aria-details for non-popover anchoring | 144 (flag NoAriaDetailsForAnchorPos) | Unverified | Tooltip/popover accessibility (Bootstrap uses aria-describedby) | None |

## Unknowns
- U1: Which TR Working Draft is current: 27 March 2026, or the 6 Sep 2026 date implied by one ED fetch.
- U2: The initial value of position-visibility. Overview.bs says `anchor-visible`; one rendered-ED fetch said `always`. Chromium's computed initial value in 153 was not checked.
- U3: Whether Chromium 153 re-evaluates position-try fallbacks while the anchor scrolls in a nested scroller. The spec records the "last successful position option" at ResizeObserver timing; the elements repo's "sticky flip" is an unconfirmed observation.
- U4: Whether the spec's §8 DOM Interfaces (CSSPositionTryRule) exposes any way to observe which fallback is applied. No event was found.
- U5: The Chromium milestone in which `position-visibility: anchors-visible` and `no-overflow` shipped. No chromestatus entry was found.
- U6: Whether `commandfor` `show-modal` or `dialog.showModal()` sets an implicit anchor.
- U7: That the live HTML rendering section has the `::picker(select)` anchor UA rule. Only the local mirror was read.
- U8: Whether the aria-details removal (chromestatus 5068815373303808, flag NoAriaDetailsForAnchorPos) is enabled by default in 153.
- U9: Whether any native mechanism lets the overflow boundary be an element other than the containing block (Popper `boundary`).
- U10: Whether an absolutely positioned arrow inside a tooltip can resolve `anchor()` against the trigger under the recursive acceptable-anchor rule.
- U11: Support in Chromium 153 for the `position-anchor: match-parent` value (present in Overview.bs).
- U12: The chromestatus API status texts ("In developer trial", "Proposed") contradict the release notes for 125, 133, 135 and 143. Milestones above follow the release notes where available.
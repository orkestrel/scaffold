Question: What do the specs and chromestatus say about five Bootstrap 5.3.8 engine mechanisms no earlier report examined? The five are Element.moveBefore(), Element.checkVisibility(), scrollIntoView({container}), focus({focusVisible}) and ARIA element reflection. For each: the milestone, whether Chromium 153 has it, and which Bootstrap contract it would change.

## Facts

### 1. Node.prototype.moveBefore() (DOM state-preserving move)

| Claim | Source | Date | Quote |
|---|---|---|---|
| Shipped on desktop and Android in Chromium 133. chromestatus lists the spec as the WHATWG DOM PR; maturity is "Working draft". | https://chromestatus.com/api/v0/features/5135990159835136 | read 2026-10-03 | "Desktop: 133 / Android: 133" |
| Chrome 133 release note | https://developer.chrome.com/release-notes/133 | 2025-02-04 | "move elements around a DOM tree, without resetting the element's state" |
| State it keeps: iframe documents, focus, popovers, modal dialogs, fullscreen, CSS transitions and animations, pointer events. Live Range and selection state are deliberately not kept. | https://groups.google.com/a/chromium.org/g/blink-dev/c/YE_xLH6MkRs (Intent to Ship) | 2024-12 | "moving connected elements around a DOM tree (same-Document)" |
| A flag existed before shipping | https://developer.chrome.com/blog/movebefore-api | 2025-01 | "chrome://flags/#atomic-move" |
| DOM PR #1307 merged on 2025-03-07. Pre-move validity throws HierarchyRequestError when the shadow-including root differs. | https://github.com/whatwg/dom/pull/1307/files | 2025-03-07 | "newParent's shadow-including root is not the same as node's shadow-including root, then throw" |
| A move produces two mutation records, one removal and one insertion | https://github.com/whatwg/dom/pull/1307 | 2025-03 | consumers "already have to do coalescing" |
| Bootstrap modal appends to body only when the element is not in body | C:\Users\mikes\WebstormProjects\veneer\node_modules\bootstrap\js\src\modal.js:173-174 | 5.3.8 | `if (!document.body.contains(this._element)) { document.body.append(this._element)` |
| Bootstrap tooltip appends to `container` only when the tip is not in the document | C:\Users\mikes\WebstormProjects\veneer\node_modules\bootstrap\js\src\tooltip.js:210-212 | 5.3.8 | `if (!this._element.ownerDocument.documentElement.contains(this.tip)) { container.append(tip)` |

### 2. Element.checkVisibility()

| Claim | Source | Date | Quote |
|---|---|---|---|
| Base method shipped in 105 (desktop and Android). It started as `isVisible` (Intent to Ship said 103) and the chromestatus entry now reads checkVisibility, 105. Spec is the CSSOM View working draft. | https://chromestatus.com/api/v0/features/5163102852087808 ; https://groups.google.com/a/chromium.org/g/blink-dev/c/fvpRgcE8_Yg | read 2026-10-03 | "Desktop: 105" |
| The `opacityProperty`, `visibilityProperty` and `contentVisibilityAuto` options shipped in 121 | https://groups.google.com/a/chromium.org/g/blink-dev/c/ruNqbP3wDSY/m/JZUK92gsAwAJ (chromestatus 5070043440480256) | 2023 | "opacityProperty as an alias for checkOpacity, visibilityProperty as an alias for checkVisibilityCSS" |
| Algorithm: false if there is no box, or if a flat-tree ancestor has `content-visibility: hidden`. Opacity, visibility and content-visibility: auto are each checked only when their option is set. | https://raw.githubusercontent.com/w3c/csswg-drafts/main/cssom-view-1/Overview.bs (#dom-element-checkvisibility) | ED | "If |this| does not have an associated box, return false." |
| Bootstrap isVisible: `getClientRects().length === 0`, computed `visibility === 'visible'`, plus a special case for closed `<details>` | C:\Users\mikes\WebstormProjects\veneer\node_modules\bootstrap\js\src\util\index.js:99-124 | 5.3.8 | `element.closest('details:not([open])')` |
| Bootstrap isDisabled checks the `.disabled` class, the `disabled` property and the `disabled` attribute. It has no visibility check. | ...\util\index.js:126-140 | 5.3.8 | `element.classList.contains('disabled')` |
| Callers: carousel:132, modal:353, dropdown:328, scrollspy:216, offcanvas:245, and SelectorEngine.focusableChildren (selector-engine.js:100), which the focus trap uses | grep of ...\bootstrap\js\src | 5.3.8 | `filter(el => !isDisabled(el) && isVisible(el))` |
| Bootstrap's `.fade:not(.show)` sets opacity to 0 | C:\Users\mikes\WebstormProjects\veneer\node_modules\bootstrap\dist\css\bootstrap.css:3350-3352 | 5.3.8 | `opacity: 0;` |

### 3. scrollIntoView({container})

| Claim | Source | Date | Quote |
|---|---|---|---|
| Shipped in 140 on desktop, Android and WebView; developer trial from 138. Spec is the CSSOM View working draft. Firefox is positive; Safari shows "Support". | https://chromestatus.com/api/v0/features/5100036528275456 ; https://developer.chrome.com/release-notes/140 | 2025 | "only scrolls the scroll container of target ... will not scroll all of the scroll containers to the viewport" |
| IDL: `ScrollIntoViewContainer container = "all"`, with enum values `"all"` and `"nearest"`. Defaults are `block = "start"` and `inline = "nearest"`. | cssom-view-1/Overview.bs (#dom-scrollintoviewoptions-container) | ED | `enum ScrollIntoViewContainer { "all", "nearest" };` |
| Steps: when `container` is `"nearest"`, set container to the element. The ancestor walk stops once the scrolling box's element is the container. | cssom-view-1/Overview.bs (scroll a target into view) | ED | "set container to the element" |
| Bootstrap scrollspy smoothScroll calls `root.scrollTo({top: offsetTop delta, behavior:'smooth'})` on the configured `rootElement` or on `window` | C:\Users\mikes\WebstormProjects\veneer\node_modules\bootstrap\js\src\scrollspy.js:135-148 | 5.3.8 | `observableSection.offsetTop - this._element.offsetTop` |
| Bootstrap tab moves focus with `preventScroll: true`. Tab has no reveal-scroll mechanism of its own. | ...\tab.js:174 | 5.3.8 | `nextActiveElement.focus({ preventScroll: true })` |

### 4. focus({focusVisible})

| Claim | Source | Date | Quote |
|---|---|---|---|
| Shipped on desktop in 145. chromestatus says Android and WebView had not shipped. Spec is the HTML Living Standard (#dom-focusoptions-focusvisible). WebKit and Gecko already ship it. | https://chromestatus.com/api/v0/features/5612989944299520 ; https://developer.chrome.com/release-notes/145 | 2026-01 | "the feature is opt-in and both WebKit and Gecko already ship this feature" |
| Semantics: true forces the ring and `:focus-visible`; false suppresses both; omitted leaves it to UA heuristics | https://chromestatus.com/feature/5612989944299520 ; https://github.com/whatwg/html/pull/8087 (merged 2022-07-13) | 2022 | "if it's explicitly false, you wouldn't indicate focus" |
| Bootstrap focus moves pass no options: trap autofocus, wrap-around, modal static-backdrop refocus, trigger restore after hide, dropdown arrow keys | focustrap.js:68,98,100,102; modal.js:289,354; offcanvas.js:246; dropdown.js:151,336,431 | 5.3.8 | `this._config.trapElement.focus()` |

### 5. ARIA element reflection

| Claim | Source | Date | Quote |
|---|---|---|---|
| Shipped in 135 on desktop and Android. Spec is the HTML Living Standard. `ariaOwnsElements` is excluded. Safari shipped it in 16.4 and Firefox planned 136. | https://chromestatus.com/api/v0/features/6244885579431936 ; https://developer.chrome.com/release-notes/135 | 2025-04-01 | "reflected in IDL as element references rather than DOMStrings" |
| Getter scoping: an element is returned only if it is a descendant of one of the host element's shadow-including ancestors. References out to light DOM work; references into a shadow tree are hidden. | https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:element | LS | "is a descendant of any of element's shadow-including ancestors" |
| The setter writes the content attribute as an empty string; setting null deletes it | same anchor | LS | "set the content attribute with the empty string" |
| Bootstrap tooltip writes `aria-describedby` as the tip's id and removes it on hide. The tip goes into `container` (body by default) while the trigger may sit in a shadow root (Bootstrap has `findShadowRoot`). | tooltip.js:206,277; util/index.js:142-149 | 5.3.8 | `setAttribute('aria-describedby', tip.getAttribute('id'))` |
| Bootstrap 5.3.8 src never writes `aria-controls`; it relies on authored markup | grep for `aria-controls` in ...\bootstrap\js\src, no matches | 5.3.8 | n/a |
| Chrome 133 had an origin trial for Reference Target for cross-root ARIA | https://developer.chrome.com/release-notes/133 | 2025-02 | "IDREF attributes ... across shadow DOM boundaries" |

## Matrix

| Row | For | Against / contract change |
|---|---|---|
| moveBefore for modal append-to-body (modal.js:173) | Shipped in 133, so present in 153 by milestone. Keeps focus and open modal dialogs or popovers. | The append only runs when the modal is not in body, which usually means disconnected. A disconnected node has a different shadow-including root, so moveBefore throws HierarchyRequestError (PR #1307 diff). It only helps for a connected modal outside body, which Bootstrap leaves in place today. The `insertBefore` fallback stays required. Observers see a removal plus an insertion. |
| moveBefore for the tooltip/popover `container` option (tooltip.js:210) | Same as above. Would keep a showing tip, or a popover in the top layer, alive when moved. | Bootstrap appends only when the tip is not in the document (it is always freshly built and disconnected), so moveBefore throws. Moving into or out of a shadow root also throws (root mismatch). Live Range and selection state are not preserved. |
| checkVisibility for isVisible | Shipped in 105, options in 121, so present in 153. "No box" matches the `getClientRects` test. `visibilityProperty` covers the computed visibility check. | Do not set `opacityProperty`/`checkOpacity`: `.fade:not(.show)` is opacity 0, so fading modals, offcanvas and toasts would read as invisible. checkVisibility also returns false inside `content-visibility: hidden` subtrees, which Bootstrap does not check. Bootstrap's closed-`<details>`/`<summary>` exception has no named option (see Unknowns). |
| checkVisibility for isDisabled | none | No overlap. isDisabled is class, property and attribute logic. checkVisibility has no disabled or inert test. |
| scrollIntoView({container:'nearest'}) for scrollspy smoothScroll | Shipped in 140, so present in 153. Keeps the scroll inside the nearest scroll container and leaves outer page scroll alone. | Bootstrap scrolls the configured `rootElement` (or window) to an `offsetTop` delta. 'nearest' picks the section's nearest scroll container, which may not be `rootElement` if nested. Alignment follows the `block` default 'start' instead of the offsetTop calculation. Scrollspy's `click` with `preventDefault()` stays as is. |
| scrollIntoView for tab reveal | Present in 153 | Bootstrap tab has no reveal step. It deliberately passes `preventScroll: true` (tab.js:174), so adding a reveal is new behaviour, not a replacement. |
| focus({focusVisible}) for the focus trap, dialog and trigger restore | Shipped on desktop in 145, so present in 153 desktop. Lets the engine force or suppress `:focus-visible` on programmatic moves. | Bootstrap passes no FocusOptions, so it relies on UA heuristics today. Passing true or false changes which `:focus-visible` styles match on modal and offcanvas open, trap wrap and trigger restore. chromestatus lists Android/WebView as not shipped. |
| ariaDescribedByElements for tooltip/popover across shadow boundaries | Shipped in 135, so present in 153. A trigger inside a shadow root can reference a tip in light-DOM `container`, which an id string cannot do. | The setter makes the attribute `aria-describedby=""` instead of the tip id, so selectors or tests that read the id break. A reference into a shadow tree is dropped by the getter. Clean-up must assign null, not remove the attribute. |
| ariaControlsElements for collapse/tab/dropdown | Present in 153 | Bootstrap never writes `aria-controls`; it comes from authored markup. Reflection would add an engine-written relation that Bootstrap does not have. `ariaOwnsElements` does not exist. |

## Unknowns

- Whether Chromium's UA style hides closed `<details>` content with `content-visibility: hidden` or `display: none`. This decides whether checkVisibility() reproduces Bootstrap's closed-details special case. The HTML rendering section fetch was truncated.
- Exact merged DOM text for moveBefore's validity steps. The quotes come from the PR #1307 diff, which may differ from the final living-standard text. The DOM spec page fetch was truncated.
- Whether Chromium 153 returns a Promise from scrollIntoView. The current CSSOM View draft text read as returning a promise; no Chromium source confirms it.
- Whether scroll-margin and scroll-padding apply to scrollIntoView({container}) in Chromium 153. Not fetched from CSS Scroll Snap.
- The full HTML FocusOptions IDL and focus() steps text. The html.spec page was truncated; semantics come from chromestatus and the PR #8087 discussion.
- Whether focusVisible reached Android or WebView by 153. chromestatus showed desktop 145 only.
- Presence in 153 for all five rests on shipped milestones (133, 105/121, 140, 145, 135) being below 153 with no kill-switch reported. Not tested in a 153 build.
- Status of Reference Target for cross-root ARIA after the Chrome 133 origin trial.
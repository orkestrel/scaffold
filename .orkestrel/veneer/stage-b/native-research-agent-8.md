**Question**

In Chromium 153, can a native mechanism replace Bootstrap's scroll lock (ScrollBarHelper) while a modal or offcanvas is open? Three candidates were checked:
- **(A)** `overflow: hidden` on the root plus `scrollbar-gutter: stable`. Sub-questions: does `innerWidth - documentElement.clientWidth` stay non-zero and double Bootstrap's padding, and do `.fixed-top` and `.sticky-top` move?
- **(B)** `html:has(dialog:modal)` or `:has(:popover-open)` selectors.
- **(C)** `overscroll-behavior: contain` on the dialog and its `::backdrop`.

**Facts**

*Bootstrap 5.3.8 baseline (installed source)*

1. **How Bootstrap measures the scrollbar.** `getWidth()` returns `Math.abs(window.innerWidth - documentWidth)`, where `documentWidth` is `document.documentElement.clientWidth`. Source: `C:\Users\mikes\WebstormProjects\veneer\node_modules\bootstrap\js\src\util\scrollbar.js:31-35`.
2. **Order of operations in `hide()`.** It reads `width` *before* it sets `overflow: hidden` on `document.body` (lines 38-39 and 59-62). It then sets the body's `padding-right` to computed padding plus that saved width (line 41).
3. **Fixed and sticky handling.** `.fixed-top, .fixed-bottom, .is-fixed, .sticky-top` get extra `padding-right`, and `.sticky-top` gets a negative `margin-right` (lines 16-17, 43-44). An element is skipped when `window.innerWidth > element.clientWidth + scrollbarWidth` (line 67). That `scrollbarWidth` is measured again *after* overflow is already hidden (line 65).
4. **Modal timing.** `show()` calls `_scrollBar.hide()`, adds `modal-open` to the body, then calls `_adjustDialog()`. Source: `node_modules\bootstrap\js\src\modal.js:114-118`. Unlocking happens only after the hide transition and the backdrop fade: `_hideModal` resets `modal-open` and the scrollbar inside the `_backdrop.hide` callback (`modal.js:245-257`). `_adjustDialog` calls `getWidth()` again after the lock (`modal.js:296-310`).
5. **Offcanvas.** It locks only when `!this._config.scroll`: `hide()` runs at show time and `reset()` runs after the hide transition. Source: `node_modules\bootstrap\js\src\offcanvas.js:107-109, 150-152`. It never adds a class to the body.
6. **Relevant Bootstrap CSS** (`node_modules\bootstrap\dist\css\bootstrap.css`):
   - `.modal` is a full-viewport fixed box with `overflow-x: hidden; overflow-y: auto`, so it is already a scroll container (lines 5455-5487).
   - `.modal-backdrop` and `.offcanvas-backdrop` are fixed and sized `100vw` × `100vh`, with no `overflow` set (5542-5551, 6737-6745).
   - `.offcanvas` has no `overflow`; only `.offcanvas-body` has `overflow-y: auto` (6680-6692, 6771-6775).

*(A) Root `overflow: hidden` plus `scrollbar-gutter`*

7. **Spec values.** `stable` means "the scrollbar gutter is present for classic scrollbars when overflow is hidden, scroll, or auto, regardless of whether the box is actually overflowing." Overlay scrollbars get no gutter. Source: https://drafts.csswg.org/css-overflow-3/#scrollbar-gutter-property (§5.2, Editor's Draft dated 13 Aug 2026, not at CR).
8. **Root only.** When set on the root, the property is applied to the viewport. The UA "must not propagate scrollbar-gutter from the HTML body element." "Applies to: scroll containers." Source: same §5.2.
9. **Body overflow still reaches the viewport.** If the root's overflow is `visible`, the body's overflow is applied to the viewport. So Bootstrap's `body { overflow: hidden }` still locks the viewport when `html { scrollbar-gutter: stable }` is set. Source: https://drafts.csswg.org/css-overflow-3/#overflow-propagation (§3.1.4).
10. **What `hidden` blocks.** It forbids scrolling "by direct intervention of the user," but content "must still be scrollable programmatically." Only `clip` forbids all scrolling. Source: https://drafts.csswg.org/css-overflow-3/#valdef-overflow-hidden.
11. **Measurement APIs.** `clientWidth` on the root returns the "viewport width excluding the size of a rendered scroll bar (if any)" (https://raw.githubusercontent.com/w3c/csswg-drafts/main/cssom-view-1/Overview.bs, clientWidth step 2). `innerWidth` is the viewport width "including the size of a rendered scroll bar" (https://drafts.csswg.org/cssom-view-1/#dom-window-innerwidth, Editor's Draft dated 12 July 2026).
12. **WPT in Chromium's tree.** `scrollbar-gutter-propagation-001.html` says root `clientWidth` "does not take scrollbar-gutter into account," and asserts `root.offsetWidth < window.innerWidth` ("viewport has gutter"). Source: https://chromium.googlesource.com/chromium/src/+/main/third_party/blink/web_tests/external/wpt/css/css-overflow/scrollbar-gutter-propagation-001.html.
13. **Interop is unsettled.** In CSSWG issue #8099 (open, filed by Bramus, Nov 2022), Chrome 110 "always resizes the ICB", but its `documentElement.clientWidth` value "is wrong", and it "only resizes the LVP if scrollbars are actually there". Source: https://github.com/w3c/csswg-drafts/issues/8099.
14. **Shipping.** chromestatus "CSS Overflow: scrollbar-gutter" (5746559209701376) shipped on desktop in **Chrome 94**. Source: https://chromestatus.com/feature/5746559209701376.
15. **Fixed elements and the gutter.** Chromium bug 40792788 is titled "Elements with position: fixed should respect scrollbar-gutter: stable" (https://issues.chromium.org/issues/40792788; sign-in wall, status not read). On CSSWG #9904 (10 Mar 2025), a commenter reports Chrome bug 1251856 fixed, but says "::backdrop does not override gutter" in both Chrome and Firefox (https://lists.w3.org/Archives/Public/public-css-archive/2025Mar/0388.html). #9904, about the top-layer containing block and the gutter, is still open (https://github.com/w3c/csswg-drafts/issues/9904).
16. **WPT for fixed elements.** `scrollbar-gutter-fixedpos-002`: "Root element's scrollbar-gutter is accounted for in fixed-pos positioning." Source: https://searchfox.org/firefox-main/source/testing/web-platform/tests/css/css-overflow/scrollbar-gutter-fixedpos-002.html.

*(B) `:has()`, `:modal`, `:popover-open`*

17. **`:has()`** shipped in **Chrome 105** (https://chromestatus.com/feature/5794378545102848; spec https://www.w3.org/TR/selectors-4/#relational).
18. **`:modal`** shipped in **Chrome 105** (https://chromestatus.com/feature/5192833009975296).
19. **What `:modal` matches.** Dialogs whose "is modal" is true, *and* elements whose "fullscreen flag" is true. Source: https://html.spec.whatwg.org/multipage/semantics-other.html#selector-modal.
20. **What `:popover-open` matches.** Any HTML element with a `popover` attribute whose visibility state is showing. This includes every popover-based dropdown or tooltip. Source: https://html.spec.whatwg.org/multipage/semantics-other.html#selector-popover-open. The Popover API shipped in **Chrome 114** (https://chromestatus.com/feature/5463833265045504).
21. **No native lock.** WHATWG html#7732, "Consider preventing page scroll when modal dialog is visible" (Scott O'Hara, 21 Mar 2022), is open. `showModal()` does not lock scroll. Source: https://github.com/whatwg/html/issues/7732.

*(C) `overscroll-behavior`*

22. **Spec.** "Applies to: scroll container elements." `contain` "must not perform non-local boundary default actions such as scroll chaining." Programmatic scrolling "can not trigger any boundary default actions." The viewport takes part in chaining as the `scrollingElement`. Source: https://drafts.csswg.org/css-overscroll-1/#overscroll-behavior-properties (§3, §4.1; Editor's Draft dated 30 June 2026).
23. **Chrome 144: non-scrollable containers.** "applies to all scroll container elements, regardless of whether those elements currently have overflowing content." Its stated use is preventing propagation "on an `overflow: hidden` backdrop." Desktop **144**; Safari and Firefox not shipped. Sources: https://chromestatus.com/feature/5129635997941760, https://developer.chrome.com/release-notes/144, PSA https://groups.google.com/a/chromium.org/g/blink-dev/c/p2edIq4J-eQ.
24. **Chrome 144: keyboard.** Keyboard scrolls now respect `overscroll-behavior` (desktop **144**). Source: https://chromestatus.com/feature/5099117340655616.
25. **Chrome 140: root propagation.** Viewport `overscroll-behavior` is propagated from the root, no longer from `<body>` (desktop **140**). Source: https://chromestatus.com/feature/6210047134400512. The `chain` value shipped in **150** (chromestatus 5176802466201600; entry seen only in the list output).
26. **UA styles** (https://html.spec.whatwg.org/multipage/rendering.html#flow-content-3, §15.3.3):
    - `dialog:modal` has `position: fixed; overflow: auto; inset-block: 0`, so a modal dialog is already a scroll container.
    - `dialog::backdrop` sets only a background.
    - `:popover-open::backdrop` has `pointer-events: none !important`.
27. **Recommended recipe (secondary source).** Chrome DevRel author's blog: `dialog { overscroll-behavior: contain }` plus `dialog::backdrop { overflow: hidden; overscroll-behavior: contain }`, for Chrome 144+. Source: https://www.bram.us/2025/11/25/use-overscroll-behavior-contain-to-prevent-a-page-from-scrolling-while-a-dialog-is-open/.
28. **Viewport units (secondary source).** From Chrome 145, `vw` subtracts the vertical scrollbar when the root has `scrollbar-gutter: stable` or `overflow-y: scroll`. Chromium bug 354751900 was reportedly fixed 31 Dec 2025. Source: https://www.bram.us/2026/01/15/100vw-horizontal-overflow-no-more/.

**Matrix**

Rows marked "derived" are worked out from the code and spec facts above, not observed in a browser.

| Row | Evidence for | Evidence against / gotcha |
|---|---|---|
| **A1.** Root `overflow: hidden` plus `scrollbar-gutter: stable` stops layout shift without JS padding | `stable` keeps the gutter while hidden (F7). Body overflow reaches the viewport (F9). Chrome 94, so present in 153 (F14). | Classic scrollbars only (F7). An empty gutter strip shows on pages that don't scroll. `hidden` still allows programmatic, focus, and anchor scrolling (F10). Spec is an Editor's Draft and viewport interop is open (F13). |
| **A2.** `innerWidth - documentElement.clientWidth` stays non-zero once locked | — | Spec and the Chromium-tree WPT say root `clientWidth` ignores an empty gutter (F11, F12). So after locking, the difference is likely **0**. Chrome 110's value was called "wrong" (F13). Chromium 153 not measured. |
| **A3.** Bootstrap's padding is doubled | Derived: `width` is read before the lock (F2). If the page was scrolling, the body gets padding equal to the scrollbar width *on top of* the gutter, so in-flow content moves left. | No doubling if root overflow is already hidden before `hide()` runs (`getWidth()` is then 0), or when the page wasn't overflowing. |
| **A4.** `.fixed-top` and `.sticky-top` shift | Derived: the re-measured `scrollbarWidth` is 0 after the lock (F3, A2). If fixed elements respect the gutter (F15, F16), `.fixed-top` is narrower than `innerWidth` and gets skipped, so it stays put. `.sticky-top` sits inside the padded body and narrows by the extra padding. | The fixed-element/gutter fix in Chromium is reported only second-hand (F15). The version "136" appears only in search output. Top-layer and `::backdrop` coverage of the gutter is unresolved (F15). |
| **B1.** `html:has(dialog:modal) { overflow: hidden }` as a CSS-only lock | `:has` and `:modal` both Chrome 105 (F17, F18). | `:modal` also matches fullscreen elements (F19), so scope it as `dialog:modal`. It unlocks the moment `close()` runs, whereas Bootstrap unlocks after the transition (F4). Shifts layout unless combined with A1. The modal path can hook `body.modal-open` instead (F4); offcanvas has no body class (F5). |
| **B2.** `:has(:popover-open)` as a lock | Popover API is Chrome 114 (F20). | Matches every open popover, including dropdowns and tooltips (F20), so it needs a class scope such as `.offcanvas:popover-open`. |
| **C1.** `overscroll-behavior: contain` on the dialog and `::backdrop` | Chrome 144: works on non-scrollable containers and on keyboard scrolls (F23, F24). `dialog:modal` is already `overflow: auto` (F26). Bootstrap's `.modal` wrapper is already a scroll container (F6). | It stops chaining, not scrolling (F22). Programmatic scrolling is unaffected (F22). Chrome only (F23). It does not reserve or compensate for the scrollbar: the page scrollbar stays visible. |
| **C2.** C1 for popover-based offcanvas or Bootstrap's `.offcanvas-backdrop` | The backdrop can be made a container with `overflow: hidden` (F23). | `:popover-open::backdrop` has `pointer-events: none !important` (F26), so wheel input passes through to the page. `.offcanvas` itself is not a scroll container (F6). With `backdrop: false` and `scroll: false` the page is exposed directly, so only a root `overflow` lock works. |

**Unknowns**

- Chromium 153's actual values for `documentElement.clientWidth` and `innerWidth` with `scrollbar-gutter: stable` while root overflow is hidden. The spec and the WPT agree on intent, but Chromium's pass status was not found.
- The Chromium milestone where fixed elements started respecting the root's gutter. "Chrome 136.0.7054.0" comes from search snippets only; crbug 40792788 and 1251856 sit behind sign-in.
- Whether `::backdrop` and top-layer dialogs cover the gutter strip in Chromium 153 (reported as not covering in March 2025; #9904 open).
- Chrome 145 scrollbar-aware `vw` (relevant because Bootstrap's backdrops are `100vw`). Only a secondary source; no chromestatus entry found.
- Whether `overscroll-behavior` on `::backdrop` and the dialog blocks dragging the viewport scrollbar, wheel input over the gutter, or touch scrolling. No primary source covers this.
- WHATWG #7732 comments were not readable. Whether any engine plans a native UA scroll lock is unknown.
- That viewport `overflow: clip` is treated as `hidden` was not fetched.
- No reverts of the listed features before 153 were checked. Presence in 153 is inferred from the shipped milestones (94, 105, 114, 140, 144, 150).
- Shadow DOM: whether `html:has(dialog:modal)` matches a dialog inside a shadow root was not checked.
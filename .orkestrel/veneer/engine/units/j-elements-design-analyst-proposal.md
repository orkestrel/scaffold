# J-ELEMENTS design round — the objective lane's proposal (analyst on GPT-6 Astra)

Thread `01a0d603-e5ac-78b0-8517-5cd0a4d74ce2`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-elements-design-analyst.jsonl` (launch copy under `tmp/codex/`); 26 commands; 295 s; usage {"input_tokens":1357680,"cached_input_tokens":1232384,"cache_write_input_tokens":0,"output_tokens":8216,"reasoning_output_tokens":2331}. Retained verbatim from the exec's last message.

---

This is a source-based proposal against Veneer `main` at `6d27028`. Elements was readable. No files were edited, no tests were run, and no agents were spawned. Paths below are relative to `C:/Users/mikes/WebstormProjects`.

**Read:** E11 limits additions to Bootstrap’s native set; E26 assigns motion values to the styles session and requires this mechanism ruling. See [decisions.md:49](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:49) and [decisions.md:184](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:184).

1. **Tab indicator geometry: refuse the engine addition within this baseline.**

   **Read:** Elements writes `--set-tabs-indicator-x`, `-y`, `-width`, and `-height` on the tab group from bounding rectangles. Its comment explicitly leaves consumption to author CSS: [createTabs.ts:52](C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createTabs.ts:52). A literal search for `--set-tabs-indicator-` across `elements/src/styles` found no consumer. Veneer’s active-tab cascade instead reads classes and Bootstrap variables: [Veneer _nav.scss:85](C:/Users/mikes/WebstormProjects/veneer/src/styles/components/_nav.scss:85). Its `TabOptions` contract exposes vocabulary, hooks, and lifetime: [types.ts:1111](C:/Users/mikes/WebstormProjects/veneer/src/browser/types.ts:1111).

   **Inferred:** Geometry writes could preserve Bootstrap markup, but without an agreed cascade consumer they supply an unused capability. Adding a sliding marker would require a visual departure and a styles-session consumer, not merely copying Elements’ writes. E11 supplies no authorization for that addition. Keep the existing class-driven selection and pane behavior.

   Reason: scope and missing consumer. Carrier: J-ELEMENTS ruling. Owned files: `scaffold/.orkestrel/veneer/engine/decisions.md` and `engine/plan.md`; no implementation or shared-style change. **REFUSE**

2. **Toast swipe offset and opacity: refuse swipe-to-dismiss within this baseline.**

   **Read:** Elements writes the swipe variables during movement, sets `data-toast-swiping`, and commits dismissal upon reaching the threshold, before pointer release: [createToast.ts:356](C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createToast.ts:356). Its `[popover][role='status']` cascade consumes the variables through `translate` and `opacity`; the attribute controls transitions: [Elements _toast.scss:97](C:/Users/mikes/WebstormProjects/elements/src/styles/composables/_toast.scss:97).

   **Read:** Bootstrap 5.3.8’s toast binds hover and focus listeners, with no swipe route: [Bootstrap toast.js:184](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/toast.js:184). Veneer’s `ToastOptions` has no swipe contract, and `SwipeOptions.handler` receives only a completed direction: [types.ts:2140](C:/Users/mikes/WebstormProjects/veneer/src/browser/types.ts:2140), [types.ts:614](C:/Users/mikes/WebstormProjects/veneer/src/browser/types.ts:614). `Swipe` listens for down, up, and cancellation, without movement: [Swipe.ts:70](C:/Users/mikes/WebstormProjects/veneer/src/browser/Swipe.ts:70).

   **Inferred:** This requires an added gesture and progress contract, not a motion-value substitution. Copying Elements’ cascade also assumes popover/status markup that Veneer’s in-flow toast contract does not require. A future authorized addition would need `.toast` consumers, cancellation recovery, and restoration rather than transplanting those selectors.

   Reason: E11 scope and incompatible gesture contracts. Carrier: J-ELEMENTS ruling. Owned files: `scaffold/.orkestrel/veneer/engine/decisions.md` and `engine/plan.md`; no changes to `Toast.ts`, `Swipe.ts`, or their contracts. **REFUSE**

3. **Menu flip cap: measure the complete sizing mechanism before adopting it.**

   **Read:** Elements writes `--set-menu-flip` but implements the cap through the ordinary inline property `max-block-size: flip × 2.25rem`; zero removes the cap and changes fallbacks: [createMenu.ts:71](C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createMenu.ts:71). A literal search for `--set-menu-flip` across `elements/src/styles` found no consumer. Its surface additionally supplies `overflow: auto`: [Elements _anchor-position.scss:275](C:/Users/mikes/WebstormProjects/elements/src/styles/surfaces/_anchor-position.scss:275).

   **Read:** Veneer writes fixed positioning, native fallbacks, and normal fallback order: [Placement.ts:152](C:/Users/mikes/WebstormProjects/veneer/src/browser/Placement.ts:152). Its dropdown cascade has no cap or scrolling rule: [Veneer _dropdown.scss:122](C:/Users/mikes/WebstormProjects/veneer/src/styles/components/_dropdown.scss:122). Placement also preserves overflow across promotion: [constants.ts:293](C:/Users/mikes/WebstormProjects/veneer/src/browser/constants.ts:293), [Placement.ts:140](C:/Users/mikes/WebstormProjects/veneer/src/browser/Placement.ts:140).

   **Inferred:** Copying the cap alone may constrain the box without making overflowing content accessible. Elements’ row-height assumption also does not establish correctness for Bootstrap dropdown forms, headers, dividers, or customized padding.

   **Exact proposed probe:** On Chromium 153 and 141, drive real `Dropdown` instances with the shipped cascade. Compare unchanged placement, the literal Elements cap alone, and the cap with scrolling. Use short menus, overflowing menus, mixed-height content, and embedded forms. Exercise viewport-edge placement, nested scrolling, resize, dropup and lateral placement, static/navbar placement, custom inline sizing, and destruction. Record rectangles, resolved overflow, scroll dimensions, focused-item visibility, hit targets, placement side, and restored declarations. Removing the cap must break a claimed cap-dependent geometry assertion; removing scrolling must break last-item accessibility in the overflowing fixture. Compare Bootstrap’s behavior on the same markup and identify every departure.

   No cap consumer exists in Veneer. Any accepted sizing/overflow cascade must be requested under `engine/plan.md` § Pending shared changes; a green probe does not authorize a row-count API.

   Reason: unresolved sizing and accessibility behavior. Proposed carrier: J-ELEMENTS-PROBE. Owned files: `scaffold/.orkestrel/veneer/engine/units/j-elements-probe.test.ts` and `units/j-elements-probe-report.md`; production ownership follows the measured ruling. **MEASURE**

4. **`position-visibility: anchors-visible`: measure visibility and lifecycle together.**

   **Read:** Elements declares this property in its anchored-popover surface: [Elements _anchor-position.scss:246](C:/Users/mikes/WebstormProjects/elements/src/styles/surfaces/_anchor-position.scss:246). Veneer’s `Dropdown.shown` reads the menu’s class, while `Placement.side` returns undefined when visibility checking fails: [Dropdown.ts:195](C:/Users/mikes/WebstormProjects/veneer/src/browser/Dropdown.ts:195), [Placement.ts:191](C:/Users/mikes/WebstormProjects/veneer/src/browser/Placement.ts:191).

   **Inferred:** Native suppression may leave the component logically open. Source inspection cannot establish its effects on focus, hit testing, accessibility, restoration, or reappearance.

   **Exact proposed probe:** On Chromium 153 and 141, open real dropdowns, tooltips, and popovers with the shipped cascade. Add the candidate property only to their promoted component selectors. Scroll the reference partially and fully outside a nested scrollport, return it, hide it, and detach it. Repeat with focus inside an interactive overlay. Record screenshots, hit targets, accessibility exposure, focus, classes, ARIA, `:popover-open`, public state, and lifecycle events throughout. Verify Escape, explicit hide, destruction, and reappearance. Use `position-visibility: always` as the control that must fail the claimed suppression assertion. Compare the same scenarios with Bootstrap and record any behavioral departure.

   The candidate styles-side keys are `.dropdown-menu[popover]`, `.tooltip[popover]`, and `.popover[popover]`, each consuming the existing engine-written **attribute** through `position-visibility: anchors-visible`. These rules do not exist and require a Pending shared changes request before adoption. No additional author markup is proposed.

   Reason: unresolved relationship between rendered visibility and component state. Proposed carrier: J-ELEMENTS-PROBE. Owned files: `scaffold/.orkestrel/veneer/engine/units/j-elements-probe.test.ts` and `units/j-elements-probe-report.md`; no production cascade change before the ruling. **MEASURE**

PROPOSAL: Refuse tab-indicator geometry and toast swipe under E11, measure the complete menu-cap and anchor-visibility mechanisms before adoption, and leave motion values and any accepted cascade consumers with the styles session.

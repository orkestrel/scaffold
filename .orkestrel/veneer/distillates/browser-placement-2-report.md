# Browser placement 2 report

The scoped acceptance criteria pass. The measured population contains 178 passing rows: the original 169 configuration rows and scroll, resize, and transformed-container rows for Dropdown, Tooltip, and Popover. The maximum floating-box difference is 0.5 px; the maximum arrow-box difference is 0.59375 px. The first-layout Popper transient is recorded separately under the supplied ruling.

The correction waits for the requested animation frame and executes in its following task, after native anchor scroll snapshots advance. This repairs a measured 300 px scroll discrepancy without a second requested frame or an idle loop. Both pending resources are canceled by destroy. The controlled mutation that removes this task makes each plugin's scroll row fail by 300 px.

## Exported names and contract

The browser barrel exports the class `Placement`. Its inherited placement surface consists of these names, all carried by the guide patch:

- Types: `PlacementInterface`, `PlacementOptions`, `PlacementInsets`, `PlacementOverflowOptions`, `PlacementSettings`, `PlacementFallback`, and `PlacementSnapshot`.
- Constants: `PLACEMENT_NAMES` and `PLACEMENT_PROPERTIES`.
- Helpers: `computePlacementArea`, `readPlacement`, `resolvePlacementFallbacks`, `computePlacementMargin`, `resolvePlacementInsets`, `resolvePlacementOverflow`, `resolvePlacementOptions`, `computePlacementBox`, and `computeArrow`.

The interface shape remains:

```ts
interface PlacementInterface {
  readonly placement: FloatingPlacement | undefined
  update(): void
  destroy(): void
}
```

Construction positions the connected elements synchronously. The placement getter reports the physical side after forced layout and is undefined after destroy. The update method coalesces a burst across its frame and task; destroy restores original inline values, priorities, and placement attributes, removes its constructed rules, aborts listeners, disconnects the observer, and cancels pending work.

The additive harness changes expose the first oracle reading and oracle toggle, perform one Bootstrap update for modifier-list replacement, and support a transformed containing block. `PlacementRecorder` records calls while running the real superclass unchanged; it replaces neither platform APIs nor project behavior. Its request recorder distinguishes an inert aborted callback from a callback that has actually been released.

## Controls and helper proofs

The permanent controls use real browser layouts, MutationObserver records, real ResizeObserver callbacks, and the Bootstrap bundle. Their isolated mutations restore the original source after each run.

| Control | Passing observation | Isolated falsification |
| --- | --- | --- |
| Geometry comparator | Original Dropdown x delta is 0 px | A planted 2 px translation throws the same <=1 px comparison assertion. |
| Distinct anchors | Independent anchor names and retained rules for the surviving owner | Removing the sequence increment fails the name assertion; exit 1, 1 failed test. |
| Owned declarations | Every owned property and priority restored for empty and populated originals | Omitting snapshots fails both cases; exit 1, 2 failed tests. |
| Placement attribute | Absent and preexisting attributes restored | Restoring a corrupted value fails the populated case; exit 1, 1 failed test. |
| Coalescing | 20 scroll requests produce the 2 attribute writes of one correction, followed by idle frames | Removing the frame/task guards produces 40 writes; exit 1, 1 failed test. |
| Listener release | Scroll and resize after destroy produce no update requests | Omitting abort fails the control; exit 1, 1 failed test. |
| Observer release | Live resizing reaches the recorder; resizing after destroy produces no request | Omitting disconnect records a surviving callback; exit 1, 1 failed test. |
| Frame cancellation | Queued frame cannot overwrite restored state | Omitting cancelAnimationFrame fails both restoration cases; exit 1, 2 failed tests. |
| Task cancellation | Destroy between frame and task preserves restored state | Omitting clearTimeout fails the task control; exit 1, 1 failed test. |
| Scroll snapshot timing | Each plugin matches after captured ancestor scroll | Applying inside the frame instead of its following task fails the scroll rows by 300 px; exit 1, 3 failed tests. |

The frame-cancellation control originally checked too early and remained green under mutation. Waiting through the scheduled task made that control red; the retained test includes this observation window.

The helpers file passes 21 tests, including the placement helper cases for physical/logical side round trips in both directions, fallback order and rules, offset margins and boxes, finite padding, overflow defaults, modifier replacement and merging without input mutation, tether offsets, arrow enablement, and arrow clamping at both edges. No prove receipt is claimed; the evidence is the retained browser tests and isolated mutation logs.

## Departures and rulings

The style departure proof asserts both Bootstrap's absolute/transform declarations and the engine's fixed/anchor declarations, including physical inline arrow coordinates. The visibility proof reads `node_modules/bootstrap/dist/css/bootstrap.css` through its raw import, verifies that both metadata names are absent, and observes both attributes on the clipped Bootstrap menu and neither on the engine. The restoration departure proof observes Bootstrap clearing a preexisting position, top, and placement attribute, while the engine restores them. The restoration controls additionally cover every owned property and priority.

| Scenario | Path | Bootstrap | Engine | Proof |
| --- | --- | --- | --- | --- |
| anchor-placement | floating::style | Absolute position with Popper inset/margin/transform writes | Fixed ordinary-layer anchors, logical area, fallbacks, margins, width, and translate correction | proves the anchor-placement and inline-arrow style departures in both implementations |
| inline-arrow | arrow::style | Absolute transform coordinates | Absolute physical left/top coordinates | Same style departure proof and population arrow boxes |
| config-popover-flip | floating::box | Initial (401,269,155.984375,107.1875,556.984375,376.1875); settled (401,265,155.984375,107.1875,556.984375,372.1875) | Settled (401.03125,265.40625,155.96875,107.1875,557,372.59375) | records the config-popover-flip transient departure and compares the settled box |
| popper-visibility-attributes | floating::data-popper-reference-hidden,data-popper-escaped | Present when hidden/escaped | Absent | proves Popper visibility metadata is absent from the Bootstrap sheet and engine |
| placement-restore | floating::teardown | Owned declarations and placement attribute cleared | Original values and priorities restored | proves placement-restore preserves declarations that Popper clears; restores every owned property and placement attribute |

The modifier-list replacement removes Bootstrap's early-placement and arrow modifiers. The oracle's first y=269 reading differs from its settled y=265 reading by 4 px. The engine's y=265.40625 reading differs from the settled oracle by 0.40625 px; the transient is not reproduced.

The keyword warrant is a retained proof: `flip-start` changes an explicit 120 × 80 box to 80 × 120, while the physical perpendicular area keeps 120 × 80. This admits constructed per-document fallback rules under the supplied ruling. The correction retains tether and clipping shifts on both axes; no native tether equivalent is claimed.

## Configuration and moving population

The journal is `tmp/units/browser-placement-2-final.log`; the complete JSON readings, initial oracle boxes, computed areas, inline styles, and differences are in `tmp/units/browser-placement-2-measurements.json`. Each table cell lists x, y, width, height, right, bottom in CSS pixels. Every row passes the placement equality and 1 px box/arrow comparisons. A missing arrow is absent on both sides.

| Row | Placement oracle / engine | Oracle box | Engine box | Oracle arrow | Engine arrow | Max delta box / arrow |
| --- | --- | --- | --- | --- | --- | --- |
| dropdown-start-800-ltr | bottom-start / bottom-start | 150, 340, 160, 50, 310, 390 | 150, 340, 160, 50, 310, 390 | absent | absent | 0 / 0 |
| dropdown-dropdown-menu-end-800-ltr | bottom-end / bottom-end | 80.3125, 340, 160, 50, 240.3125, 390 | 80.3125, 340, 160, 50, 240.3125, 390 | absent | absent | 0 / 0 |
| dropdown-dropdown-menu-lg-end-800-ltr | bottom-start / bottom-start | 150, 340, 160, 50, 310, 390 | 150, 340, 160, 50, 310, 390 | absent | absent | 0 / 0 |
| dropdown-dropdown-menu-lg-end-1100-ltr | bottom-end / bottom-end | 80.3125, 340, 160, 50, 240.3125, 390 | 80.3125, 340, 160, 50, 240.3125, 390 | absent | absent | 0 / 0 |
| dropup-start-800-ltr | top-start / top-start | 150, 248, 160, 50, 310, 298 | 150, 248, 160, 50, 310, 298 | absent | absent | 0 / 0 |
| dropup-dropdown-menu-end-800-ltr | top-end / top-end | 80.3125, 248, 160, 50, 240.3125, 298 | 80.3125, 248, 160, 50, 240.3125, 298 | absent | absent | 0 / 0 |
| dropup-dropdown-menu-lg-end-800-ltr | top-start / top-start | 150, 248, 160, 50, 310, 298 | 150, 248, 160, 50, 310, 298 | absent | absent | 0 / 0 |
| dropup-dropdown-menu-lg-end-1100-ltr | top-end / top-end | 80.3125, 248, 160, 50, 240.3125, 298 | 80.3125, 248, 160, 50, 240.3125, 298 | absent | absent | 0 / 0 |
| dropend-start-800-ltr | right-start / right-start | 238, 300, 160, 50, 398, 350 | 238.3125, 300, 160, 50, 398.3125, 350 | absent | absent | 0.3125 / 0 |
| dropend-dropdown-menu-end-800-ltr | right-start / right-start | 238, 300, 160, 50, 398, 350 | 238.3125, 300, 160, 50, 398.3125, 350 | absent | absent | 0.3125 / 0 |
| dropend-dropdown-menu-lg-end-800-ltr | right-start / right-start | 238, 300, 160, 50, 398, 350 | 238.3125, 300, 160, 50, 398.3125, 350 | absent | absent | 0.3125 / 0 |
| dropend-dropdown-menu-lg-end-1100-ltr | right-start / right-start | 238, 300, 160, 50, 398, 350 | 238.3125, 300, 160, 50, 398.3125, 350 | absent | absent | 0.3125 / 0 |
| dropstart-start-800-ltr | right-start / right-start | 238, 300, 160, 50, 398, 350 | 238.3125, 300, 160, 50, 398.3125, 350 | absent | absent | 0.3125 / 0 |
| dropstart-dropdown-menu-end-800-ltr | right-start / right-start | 238, 300, 160, 50, 398, 350 | 238.3125, 300, 160, 50, 398.3125, 350 | absent | absent | 0.3125 / 0 |
| dropstart-dropdown-menu-lg-end-800-ltr | right-start / right-start | 238, 300, 160, 50, 398, 350 | 238.3125, 300, 160, 50, 398.3125, 350 | absent | absent | 0.3125 / 0 |
| dropstart-dropdown-menu-lg-end-1100-ltr | right-start / right-start | 238, 300, 160, 50, 398, 350 | 238.3125, 300, 160, 50, 398.3125, 350 | absent | absent | 0.3125 / 0 |
| dropup-center-start-800-ltr | top / top | 115, 248, 160, 50, 275, 298 | 115.15625, 248, 160, 50, 275.15625, 298 | absent | absent | 0.15625 / 0 |
| dropup-center-dropdown-menu-end-800-ltr | top / top | 115, 248, 160, 50, 275, 298 | 115.15625, 248, 160, 50, 275.15625, 298 | absent | absent | 0.15625 / 0 |
| dropup-center-dropdown-menu-lg-end-800-ltr | top / top | 115, 248, 160, 50, 275, 298 | 115.15625, 248, 160, 50, 275.15625, 298 | absent | absent | 0.15625 / 0 |
| dropup-center-dropdown-menu-lg-end-1100-ltr | top / top | 115, 248, 160, 50, 275, 298 | 115.15625, 248, 160, 50, 275.15625, 298 | absent | absent | 0.15625 / 0 |
| dropdown-center-start-800-ltr | bottom / bottom | 115, 340, 160, 50, 275, 390 | 115.15625, 340, 160, 50, 275.15625, 390 | absent | absent | 0.15625 / 0 |
| dropdown-center-dropdown-menu-end-800-ltr | bottom / bottom | 115, 340, 160, 50, 275, 390 | 115.15625, 340, 160, 50, 275.15625, 390 | absent | absent | 0.15625 / 0 |
| dropdown-center-dropdown-menu-lg-end-800-ltr | bottom / bottom | 115, 340, 160, 50, 275, 390 | 115.15625, 340, 160, 50, 275.15625, 390 | absent | absent | 0.15625 / 0 |
| dropdown-center-dropdown-menu-lg-end-1100-ltr | bottom / bottom | 115, 340, 160, 50, 275, 390 | 115.15625, 340, 160, 50, 275.15625, 390 | absent | absent | 0.15625 / 0 |
| dropdown-start-800-rtl | bottom-end / bottom-end | 80.3125, 340, 160, 50, 240.3125, 390 | 80.3125, 340, 160, 50, 240.3125, 390 | absent | absent | 0 / 0 |
| dropdown-dropdown-menu-end-800-rtl | bottom-start / bottom-start | 150, 340, 160, 50, 310, 390 | 150, 340, 160, 50, 310, 390 | absent | absent | 0 / 0 |
| dropdown-dropdown-menu-lg-end-800-rtl | bottom-end / bottom-end | 80.3125, 340, 160, 50, 240.3125, 390 | 80.3125, 340, 160, 50, 240.3125, 390 | absent | absent | 0 / 0 |
| dropdown-dropdown-menu-lg-end-1100-rtl | bottom-start / bottom-start | 150, 340, 160, 50, 310, 390 | 150, 340, 160, 50, 310, 390 | absent | absent | 0 / 0 |
| dropup-start-800-rtl | top-end / top-end | 80.3125, 248, 160, 50, 240.3125, 298 | 80.3125, 248, 160, 50, 240.3125, 298 | absent | absent | 0 / 0 |
| dropup-dropdown-menu-end-800-rtl | top-start / top-start | 150, 248, 160, 50, 310, 298 | 150, 248, 160, 50, 310, 298 | absent | absent | 0 / 0 |
| dropup-dropdown-menu-lg-end-800-rtl | top-end / top-end | 80.3125, 248, 160, 50, 240.3125, 298 | 80.3125, 248, 160, 50, 240.3125, 298 | absent | absent | 0 / 0 |
| dropup-dropdown-menu-lg-end-1100-rtl | top-start / top-start | 150, 248, 160, 50, 310, 298 | 150, 248, 160, 50, 310, 298 | absent | absent | 0 / 0 |
| dropend-start-800-rtl | right-start / right-start | 238, 300, 160, 50, 398, 350 | 238.3125, 300, 160, 50, 398.3125, 350 | absent | absent | 0.3125 / 0 |
| dropend-dropdown-menu-end-800-rtl | right-start / right-start | 238, 300, 160, 50, 398, 350 | 238.3125, 300, 160, 50, 398.3125, 350 | absent | absent | 0.3125 / 0 |
| dropend-dropdown-menu-lg-end-800-rtl | right-start / right-start | 238, 300, 160, 50, 398, 350 | 238.3125, 300, 160, 50, 398.3125, 350 | absent | absent | 0.3125 / 0 |
| dropend-dropdown-menu-lg-end-1100-rtl | right-start / right-start | 238, 300, 160, 50, 398, 350 | 238.3125, 300, 160, 50, 398.3125, 350 | absent | absent | 0.3125 / 0 |
| dropstart-start-800-rtl | right-start / right-start | 238, 300, 160, 50, 398, 350 | 238.3125, 300, 160, 50, 398.3125, 350 | absent | absent | 0.3125 / 0 |
| dropstart-dropdown-menu-end-800-rtl | right-start / right-start | 238, 300, 160, 50, 398, 350 | 238.3125, 300, 160, 50, 398.3125, 350 | absent | absent | 0.3125 / 0 |
| dropstart-dropdown-menu-lg-end-800-rtl | right-start / right-start | 238, 300, 160, 50, 398, 350 | 238.3125, 300, 160, 50, 398.3125, 350 | absent | absent | 0.3125 / 0 |
| dropstart-dropdown-menu-lg-end-1100-rtl | right-start / right-start | 238, 300, 160, 50, 398, 350 | 238.3125, 300, 160, 50, 398.3125, 350 | absent | absent | 0.3125 / 0 |
| dropup-center-start-800-rtl | top / top | 115, 248, 160, 50, 275, 298 | 115.15625, 248, 160, 50, 275.15625, 298 | absent | absent | 0.15625 / 0 |
| dropup-center-dropdown-menu-end-800-rtl | top / top | 115, 248, 160, 50, 275, 298 | 115.15625, 248, 160, 50, 275.15625, 298 | absent | absent | 0.15625 / 0 |
| dropup-center-dropdown-menu-lg-end-800-rtl | top / top | 115, 248, 160, 50, 275, 298 | 115.15625, 248, 160, 50, 275.15625, 298 | absent | absent | 0.15625 / 0 |
| dropup-center-dropdown-menu-lg-end-1100-rtl | top / top | 115, 248, 160, 50, 275, 298 | 115.15625, 248, 160, 50, 275.15625, 298 | absent | absent | 0.15625 / 0 |
| dropdown-center-start-800-rtl | bottom / bottom | 115, 340, 160, 50, 275, 390 | 115.15625, 340, 160, 50, 275.15625, 390 | absent | absent | 0.15625 / 0 |
| dropdown-center-dropdown-menu-end-800-rtl | bottom / bottom | 115, 340, 160, 50, 275, 390 | 115.15625, 340, 160, 50, 275.15625, 390 | absent | absent | 0.15625 / 0 |
| dropdown-center-dropdown-menu-lg-end-800-rtl | bottom / bottom | 115, 340, 160, 50, 275, 390 | 115.15625, 340, 160, 50, 275.15625, 390 | absent | absent | 0.15625 / 0 |
| dropdown-center-dropdown-menu-lg-end-1100-rtl | bottom / bottom | 115, 340, 160, 50, 275, 390 | 115.15625, 340, 160, 50, 275.15625, 390 | absent | absent | 0.15625 / 0 |
| Tooltip-top-center-ltr | top / top | 119, 265, 137.984375, 29, 256.984375, 294 | 119.40625, 265, 137.96875, 29, 257.375, 294 | 182, 294, 12.796875, 6.390625, 194.796875, 300.390625 | 181.40625, 294, 12.796875, 6.390625, 194.203125, 300.390625 | 0.40625 / 0.59375 |
| Tooltip-top-top-ltr | right / right | 233, 7, 137.984375, 29, 370.984375, 36 | 232.765625, 6.5, 137.96875, 29, 370.734375, 35.5 | 226.609375, 15, 6.390625, 12.796875, 233, 27.796875 | 226.375, 14.5, 6.390625, 12.796875, 232.765625, 27.296875 | 0.5 / 0.5 |
| Tooltip-top-right-ltr | left / left | 180.015625, 305, 137.984375, 29, 318, 334 | 180.03125, 304.5, 137.96875, 29, 318, 333.5 | 318, 313, 6.390625, 12.796875, 324.390625, 325.796875 | 318, 312.5, 6.390625, 12.796875, 324.390625, 325.296875 | 0.5 / 0.5 |
| Tooltip-top-bottom-ltr | top / top | 119, 821, 137.984375, 29, 256.984375, 850 | 119.40625, 821, 137.96875, 29, 257.375, 850 | 182, 850, 12.796875, 6.390625, 194.796875, 856.390625 | 181.40625, 850, 12.796875, 6.390625, 194.203125, 856.390625 | 0.40625 / 0.59375 |
| Tooltip-top-left-ltr | right / right | 85, 305, 137.984375, 29, 222.984375, 334 | 84.765625, 304.5, 137.96875, 29, 222.734375, 333.5 | 78.609375, 313, 6.390625, 12.796875, 85, 325.796875 | 78.375, 312.5, 6.390625, 12.796875, 84.765625, 325.296875 | 0.5 / 0.5 |
| Tooltip-right-center-ltr | right / right | 233, 305, 137.984375, 29, 370.984375, 334 | 232.765625, 304.5, 137.96875, 29, 370.734375, 333.5 | 226.609375, 313, 6.390625, 12.796875, 233, 325.796875 | 226.375, 312.5, 6.390625, 12.796875, 232.765625, 325.296875 | 0.5 / 0.5 |
| Tooltip-right-top-ltr | right / right | 233, 7, 137.984375, 29, 370.984375, 36 | 232.765625, 6.5, 137.96875, 29, 370.734375, 35.5 | 226.609375, 15, 6.390625, 12.796875, 233, 27.796875 | 226.375, 14.5, 6.390625, 12.796875, 232.765625, 27.296875 | 0.5 / 0.5 |
| Tooltip-right-right-ltr | left / left | 180.015625, 305, 137.984375, 29, 318, 334 | 180.03125, 304.5, 137.96875, 29, 318, 333.5 | 318, 313, 6.390625, 12.796875, 324.390625, 325.796875 | 318, 312.5, 6.390625, 12.796875, 324.390625, 325.296875 | 0.5 / 0.5 |
| Tooltip-right-bottom-ltr | right / right | 233, 861, 137.984375, 29, 370.984375, 890 | 232.765625, 860.5, 137.96875, 29, 370.734375, 889.5 | 226.609375, 869, 6.390625, 12.796875, 233, 881.796875 | 226.375, 868.5, 6.390625, 12.796875, 232.765625, 881.296875 | 0.5 / 0.5 |
| Tooltip-right-left-ltr | right / right | 85, 305, 137.984375, 29, 222.984375, 334 | 84.765625, 304.5, 137.96875, 29, 222.734375, 333.5 | 78.609375, 313, 6.390625, 12.796875, 85, 325.796875 | 78.375, 312.5, 6.390625, 12.796875, 84.765625, 325.296875 | 0.5 / 0.5 |
| Tooltip-bottom-center-ltr | bottom / bottom | 119, 344, 137.984375, 29, 256.984375, 373 | 119.40625, 344, 137.96875, 29, 257.375, 373 | 182, 337.609375, 12.796875, 6.390625, 194.796875, 344 | 181.40625, 337.609375, 12.796875, 6.390625, 194.203125, 344 | 0.40625 / 0.59375 |
| Tooltip-bottom-top-ltr | bottom / bottom | 119, 46, 137.984375, 29, 256.984375, 75 | 119.40625, 46, 137.96875, 29, 257.375, 75 | 182, 39.609375, 12.796875, 6.390625, 194.796875, 46 | 181.40625, 39.609375, 12.796875, 6.390625, 194.203125, 46 | 0.40625 / 0.59375 |
| Tooltip-bottom-right-ltr | left / left | 180.015625, 305, 137.984375, 29, 318, 334 | 180.03125, 304.5, 137.96875, 29, 318, 333.5 | 318, 313, 6.390625, 12.796875, 324.390625, 325.796875 | 318, 312.5, 6.390625, 12.796875, 324.390625, 325.296875 | 0.5 / 0.5 |
| Tooltip-bottom-bottom-ltr | top / top | 119, 821, 137.984375, 29, 256.984375, 850 | 119.40625, 821, 137.96875, 29, 257.375, 850 | 182, 850, 12.796875, 6.390625, 194.796875, 856.390625 | 181.40625, 850, 12.796875, 6.390625, 194.203125, 856.390625 | 0.40625 / 0.59375 |
| Tooltip-bottom-left-ltr | right / right | 85, 305, 137.984375, 29, 222.984375, 334 | 84.765625, 304.5, 137.96875, 29, 222.734375, 333.5 | 78.609375, 313, 6.390625, 12.796875, 85, 325.796875 | 78.375, 312.5, 6.390625, 12.796875, 84.765625, 325.296875 | 0.5 / 0.5 |
| Tooltip-left-center-ltr | left / left | 6.015625, 305, 137.984375, 29, 144, 334 | 6.03125, 304.5, 137.96875, 29, 144, 333.5 | 144, 313, 6.390625, 12.796875, 150.390625, 325.796875 | 144, 312.5, 6.390625, 12.796875, 150.390625, 325.296875 | 0.5 / 0.5 |
| Tooltip-left-top-ltr | left / left | 6.015625, 7, 137.984375, 29, 144, 36 | 6.03125, 6.5, 137.96875, 29, 144, 35.5 | 144, 15, 6.390625, 12.796875, 150.390625, 27.796875 | 144, 14.5, 6.390625, 12.796875, 150.390625, 27.296875 | 0.5 / 0.5 |
| Tooltip-left-right-ltr | left / left | 180.015625, 305, 137.984375, 29, 318, 334 | 180.03125, 304.5, 137.96875, 29, 318, 333.5 | 318, 313, 6.390625, 12.796875, 324.390625, 325.796875 | 318, 312.5, 6.390625, 12.796875, 324.390625, 325.296875 | 0.5 / 0.5 |
| Tooltip-left-bottom-ltr | left / left | 6.015625, 861, 137.984375, 29, 144, 890 | 6.03125, 860.5, 137.96875, 29, 144, 889.5 | 144, 869, 6.390625, 12.796875, 150.390625, 881.796875 | 144, 868.5, 6.390625, 12.796875, 150.390625, 881.296875 | 0.5 / 0.5 |
| Tooltip-left-left-ltr | right / right | 85, 305, 137.984375, 29, 222.984375, 334 | 84.765625, 304.5, 137.96875, 29, 222.734375, 333.5 | 78.609375, 313, 6.390625, 12.796875, 85, 325.796875 | 78.375, 312.5, 6.390625, 12.796875, 84.765625, 325.296875 | 0.5 / 0.5 |
| Tooltip-auto-center-ltr | bottom / bottom | 119, 344, 137.984375, 29, 256.984375, 373 | 119.40625, 344, 137.96875, 29, 257.375, 373 | 182, 337.609375, 12.796875, 6.390625, 194.796875, 344 | 181.40625, 337.609375, 12.796875, 6.390625, 194.203125, 344 | 0.40625 / 0.59375 |
| Tooltip-auto-top-ltr | bottom / bottom | 119, 46, 137.984375, 29, 256.984375, 75 | 119.40625, 46, 137.96875, 29, 257.375, 75 | 182, 39.609375, 12.796875, 6.390625, 194.796875, 46 | 181.40625, 39.609375, 12.796875, 6.390625, 194.203125, 46 | 0.40625 / 0.59375 |
| Tooltip-auto-right-ltr | left / left | 180.015625, 305, 137.984375, 29, 318, 334 | 180.03125, 304.5, 137.96875, 29, 318, 333.5 | 318, 313, 6.390625, 12.796875, 324.390625, 325.796875 | 318, 312.5, 6.390625, 12.796875, 324.390625, 325.296875 | 0.5 / 0.5 |
| Tooltip-auto-bottom-ltr | top / top | 119, 821, 137.984375, 29, 256.984375, 850 | 119.40625, 821, 137.96875, 29, 257.375, 850 | 182, 850, 12.796875, 6.390625, 194.796875, 856.390625 | 181.40625, 850, 12.796875, 6.390625, 194.203125, 856.390625 | 0.40625 / 0.59375 |
| Tooltip-auto-left-ltr | right / right | 85, 305, 137.984375, 29, 222.984375, 334 | 84.765625, 304.5, 137.96875, 29, 222.734375, 333.5 | 78.609375, 313, 6.390625, 12.796875, 85, 325.796875 | 78.375, 312.5, 6.390625, 12.796875, 84.765625, 325.296875 | 0.5 / 0.5 |
| Tooltip-top-center-rtl | top / top | 119, 265, 137.984375, 29, 256.984375, 294 | 119.40625, 265, 137.96875, 29, 257.375, 294 | 182, 294, 12.796875, 6.390625, 194.796875, 300.390625 | 181.40625, 294, 12.796875, 6.390625, 194.203125, 300.390625 | 0.40625 / 0.59375 |
| Tooltip-top-top-rtl | right / right | 233, 7, 137.984375, 29, 370.984375, 36 | 232.765625, 6.5, 137.96875, 29, 370.734375, 35.5 | 226.609375, 15, 6.390625, 12.796875, 233, 27.796875 | 226.375, 14.5, 6.390625, 12.796875, 232.765625, 27.296875 | 0.5 / 0.5 |
| Tooltip-top-right-rtl | left / left | 180.015625, 305, 137.984375, 29, 318, 334 | 180.03125, 304.5, 137.96875, 29, 318, 333.5 | 318, 313, 6.390625, 12.796875, 324.390625, 325.796875 | 318, 312.5, 6.390625, 12.796875, 324.390625, 325.296875 | 0.5 / 0.5 |
| Tooltip-top-bottom-rtl | top / top | 119, 821, 137.984375, 29, 256.984375, 850 | 119.40625, 821, 137.96875, 29, 257.375, 850 | 182, 850, 12.796875, 6.390625, 194.796875, 856.390625 | 181.40625, 850, 12.796875, 6.390625, 194.203125, 856.390625 | 0.40625 / 0.59375 |
| Tooltip-top-left-rtl | right / right | 85, 305, 137.984375, 29, 222.984375, 334 | 84.765625, 304.5, 137.96875, 29, 222.734375, 333.5 | 78.609375, 313, 6.390625, 12.796875, 85, 325.796875 | 78.375, 312.5, 6.390625, 12.796875, 84.765625, 325.296875 | 0.5 / 0.5 |
| Tooltip-right-center-rtl | left / left | 6.015625, 305, 137.984375, 29, 144, 334 | 6.03125, 304.5, 137.96875, 29, 144, 333.5 | 144, 313, 6.390625, 12.796875, 150.390625, 325.796875 | 144, 312.5, 6.390625, 12.796875, 150.390625, 325.296875 | 0.5 / 0.5 |
| Tooltip-right-top-rtl | left / left | 6.015625, 7, 137.984375, 29, 144, 36 | 6.03125, 6.5, 137.96875, 29, 144, 35.5 | 144, 15, 6.390625, 12.796875, 150.390625, 27.796875 | 144, 14.5, 6.390625, 12.796875, 150.390625, 27.296875 | 0.5 / 0.5 |
| Tooltip-right-right-rtl | left / left | 180.015625, 305, 137.984375, 29, 318, 334 | 180.03125, 304.5, 137.96875, 29, 318, 333.5 | 318, 313, 6.390625, 12.796875, 324.390625, 325.796875 | 318, 312.5, 6.390625, 12.796875, 324.390625, 325.296875 | 0.5 / 0.5 |
| Tooltip-right-bottom-rtl | left / left | 6.015625, 861, 137.984375, 29, 144, 890 | 6.03125, 860.5, 137.96875, 29, 144, 889.5 | 144, 869, 6.390625, 12.796875, 150.390625, 881.796875 | 144, 868.5, 6.390625, 12.796875, 150.390625, 881.296875 | 0.5 / 0.5 |
| Tooltip-right-left-rtl | right / right | 85, 305, 137.984375, 29, 222.984375, 334 | 84.765625, 304.5, 137.96875, 29, 222.734375, 333.5 | 78.609375, 313, 6.390625, 12.796875, 85, 325.796875 | 78.375, 312.5, 6.390625, 12.796875, 84.765625, 325.296875 | 0.5 / 0.5 |
| Tooltip-bottom-center-rtl | bottom / bottom | 119, 344, 137.984375, 29, 256.984375, 373 | 119.40625, 344, 137.96875, 29, 257.375, 373 | 182, 337.609375, 12.796875, 6.390625, 194.796875, 344 | 181.40625, 337.609375, 12.796875, 6.390625, 194.203125, 344 | 0.40625 / 0.59375 |
| Tooltip-bottom-top-rtl | bottom / bottom | 119, 46, 137.984375, 29, 256.984375, 75 | 119.40625, 46, 137.96875, 29, 257.375, 75 | 182, 39.609375, 12.796875, 6.390625, 194.796875, 46 | 181.40625, 39.609375, 12.796875, 6.390625, 194.203125, 46 | 0.40625 / 0.59375 |
| Tooltip-bottom-right-rtl | left / left | 180.015625, 305, 137.984375, 29, 318, 334 | 180.03125, 304.5, 137.96875, 29, 318, 333.5 | 318, 313, 6.390625, 12.796875, 324.390625, 325.796875 | 318, 312.5, 6.390625, 12.796875, 324.390625, 325.296875 | 0.5 / 0.5 |
| Tooltip-bottom-bottom-rtl | top / top | 119, 821, 137.984375, 29, 256.984375, 850 | 119.40625, 821, 137.96875, 29, 257.375, 850 | 182, 850, 12.796875, 6.390625, 194.796875, 856.390625 | 181.40625, 850, 12.796875, 6.390625, 194.203125, 856.390625 | 0.40625 / 0.59375 |
| Tooltip-bottom-left-rtl | right / right | 85, 305, 137.984375, 29, 222.984375, 334 | 84.765625, 304.5, 137.96875, 29, 222.734375, 333.5 | 78.609375, 313, 6.390625, 12.796875, 85, 325.796875 | 78.375, 312.5, 6.390625, 12.796875, 84.765625, 325.296875 | 0.5 / 0.5 |
| Tooltip-left-center-rtl | right / right | 233, 305, 137.984375, 29, 370.984375, 334 | 232.765625, 304.5, 137.96875, 29, 370.734375, 333.5 | 226.609375, 313, 6.390625, 12.796875, 233, 325.796875 | 226.375, 312.5, 6.390625, 12.796875, 232.765625, 325.296875 | 0.5 / 0.5 |
| Tooltip-left-top-rtl | right / right | 233, 7, 137.984375, 29, 370.984375, 36 | 232.765625, 6.5, 137.96875, 29, 370.734375, 35.5 | 226.609375, 15, 6.390625, 12.796875, 233, 27.796875 | 226.375, 14.5, 6.390625, 12.796875, 232.765625, 27.296875 | 0.5 / 0.5 |
| Tooltip-left-right-rtl | left / left | 180.015625, 305, 137.984375, 29, 318, 334 | 180.03125, 304.5, 137.96875, 29, 318, 333.5 | 318, 313, 6.390625, 12.796875, 324.390625, 325.796875 | 318, 312.5, 6.390625, 12.796875, 324.390625, 325.296875 | 0.5 / 0.5 |
| Tooltip-left-bottom-rtl | right / right | 233, 861, 137.984375, 29, 370.984375, 890 | 232.765625, 860.5, 137.96875, 29, 370.734375, 889.5 | 226.609375, 869, 6.390625, 12.796875, 233, 881.796875 | 226.375, 868.5, 6.390625, 12.796875, 232.765625, 881.296875 | 0.5 / 0.5 |
| Tooltip-left-left-rtl | right / right | 85, 305, 137.984375, 29, 222.984375, 334 | 84.765625, 304.5, 137.96875, 29, 222.734375, 333.5 | 78.609375, 313, 6.390625, 12.796875, 85, 325.796875 | 78.375, 312.5, 6.390625, 12.796875, 84.765625, 325.296875 | 0.5 / 0.5 |
| Tooltip-auto-center-rtl | bottom / bottom | 119, 344, 137.984375, 29, 256.984375, 373 | 119.40625, 344, 137.96875, 29, 257.375, 373 | 182, 337.609375, 12.796875, 6.390625, 194.796875, 344 | 181.40625, 337.609375, 12.796875, 6.390625, 194.203125, 344 | 0.40625 / 0.59375 |
| Tooltip-auto-top-rtl | bottom / bottom | 119, 46, 137.984375, 29, 256.984375, 75 | 119.40625, 46, 137.96875, 29, 257.375, 75 | 182, 39.609375, 12.796875, 6.390625, 194.796875, 46 | 181.40625, 39.609375, 12.796875, 6.390625, 194.203125, 46 | 0.40625 / 0.59375 |
| Tooltip-auto-right-rtl | left / left | 180.015625, 305, 137.984375, 29, 318, 334 | 180.03125, 304.5, 137.96875, 29, 318, 333.5 | 318, 313, 6.390625, 12.796875, 324.390625, 325.796875 | 318, 312.5, 6.390625, 12.796875, 324.390625, 325.296875 | 0.5 / 0.5 |
| Tooltip-auto-bottom-rtl | top / top | 119, 821, 137.984375, 29, 256.984375, 850 | 119.40625, 821, 137.96875, 29, 257.375, 850 | 182, 850, 12.796875, 6.390625, 194.796875, 856.390625 | 181.40625, 850, 12.796875, 6.390625, 194.203125, 856.390625 | 0.40625 / 0.59375 |
| Tooltip-auto-left-rtl | right / right | 85, 305, 137.984375, 29, 222.984375, 334 | 84.765625, 304.5, 137.96875, 29, 222.734375, 333.5 | 78.609375, 313, 6.390625, 12.796875, 85, 325.796875 | 78.375, 312.5, 6.390625, 12.796875, 84.765625, 325.296875 | 0.5 / 0.5 |
| Popover-top-center-ltr | top / top | 110, 200.8125, 155.984375, 91.1875, 265.984375, 292 | 110.40625, 200.8125, 155.96875, 91.1875, 266.375, 292 | 180, 292, 16, 8, 196, 300 | 180.40625, 292, 16, 8, 196.40625, 300 | 0.40625 / 0.40625 |
| Popover-top-top-ltr | bottom / bottom | 110, 48, 155.984375, 91.1875, 265.984375, 139.1875 | 110.40625, 48, 155.96875, 91.1875, 266.375, 139.1875 | 180, 40, 16, 8, 196, 48 | 180.40625, 40, 16, 8, 196.40625, 48 | 0.40625 / 0.40625 |
| Popover-top-right-ltr | left / left | 160.015625, 273, 155.984375, 91.1875, 316, 364.1875 | 160.03125, 273.40625, 155.96875, 91.1875, 316, 364.59375 | 316, 311, 8, 16, 324, 327 | 316, 311.40625, 8, 16, 324, 327.40625 | 0.40625 / 0.40625 |
| Popover-top-bottom-ltr | top / top | 110, 756.8125, 155.984375, 91.1875, 265.984375, 848 | 110.40625, 756.8125, 155.96875, 91.1875, 266.375, 848 | 180, 848, 16, 8, 196, 856 | 180.40625, 848, 16, 8, 196.40625, 856 | 0.40625 / 0.40625 |
| Popover-top-left-ltr | right / right | 87, 273, 155.984375, 91.1875, 242.984375, 364.1875 | 86.765625, 273.40625, 155.96875, 91.1875, 242.734375, 364.59375 | 79, 311, 8, 16, 87, 327 | 78.765625, 311.40625, 8, 16, 86.765625, 327.40625 | 0.40625 / 0.40625 |
| Popover-right-center-ltr | right / right | 235, 273, 155.984375, 91.1875, 390.984375, 364.1875 | 234.765625, 273.40625, 155.96875, 91.1875, 390.734375, 364.59375 | 227, 311, 8, 16, 235, 327 | 226.765625, 311.40625, 8, 16, 234.765625, 327.40625 | 0.40625 / 0.40625 |
| Popover-right-top-ltr | bottom / bottom | 110, 48, 155.984375, 91.1875, 265.984375, 139.1875 | 110.40625, 48, 155.96875, 91.1875, 266.375, 139.1875 | 180, 40, 16, 8, 196, 48 | 180.40625, 40, 16, 8, 196.40625, 48 | 0.40625 / 0.40625 |
| Popover-right-right-ltr | left / left | 160.015625, 273, 155.984375, 91.1875, 316, 364.1875 | 160.03125, 273.40625, 155.96875, 91.1875, 316, 364.59375 | 316, 311, 8, 16, 324, 327 | 316, 311.40625, 8, 16, 324, 327.40625 | 0.40625 / 0.40625 |
| Popover-right-bottom-ltr | top / top | 110, 756.8125, 155.984375, 91.1875, 265.984375, 848 | 110.40625, 756.8125, 155.96875, 91.1875, 266.375, 848 | 180, 848, 16, 8, 196, 856 | 180.40625, 848, 16, 8, 196.40625, 856 | 0.40625 / 0.40625 |
| Popover-right-left-ltr | right / right | 87, 273, 155.984375, 91.1875, 242.984375, 364.1875 | 86.765625, 273.40625, 155.96875, 91.1875, 242.734375, 364.59375 | 79, 311, 8, 16, 87, 327 | 78.765625, 311.40625, 8, 16, 86.765625, 327.40625 | 0.40625 / 0.40625 |
| Popover-bottom-center-ltr | bottom / bottom | 110, 346, 155.984375, 91.1875, 265.984375, 437.1875 | 110.40625, 346, 155.96875, 91.1875, 266.375, 437.1875 | 180, 338, 16, 8, 196, 346 | 180.40625, 338, 16, 8, 196.40625, 346 | 0.40625 / 0.40625 |
| Popover-bottom-top-ltr | bottom / bottom | 110, 48, 155.984375, 91.1875, 265.984375, 139.1875 | 110.40625, 48, 155.96875, 91.1875, 266.375, 139.1875 | 180, 40, 16, 8, 196, 48 | 180.40625, 40, 16, 8, 196.40625, 48 | 0.40625 / 0.40625 |
| Popover-bottom-right-ltr | left / left | 160.015625, 273, 155.984375, 91.1875, 316, 364.1875 | 160.03125, 273.40625, 155.96875, 91.1875, 316, 364.59375 | 316, 311, 8, 16, 324, 327 | 316, 311.40625, 8, 16, 324, 327.40625 | 0.40625 / 0.40625 |
| Popover-bottom-bottom-ltr | top / top | 110, 756.8125, 155.984375, 91.1875, 265.984375, 848 | 110.40625, 756.8125, 155.96875, 91.1875, 266.375, 848 | 180, 848, 16, 8, 196, 856 | 180.40625, 848, 16, 8, 196.40625, 856 | 0.40625 / 0.40625 |
| Popover-bottom-left-ltr | right / right | 87, 273, 155.984375, 91.1875, 242.984375, 364.1875 | 86.765625, 273.40625, 155.96875, 91.1875, 242.734375, 364.59375 | 79, 311, 8, 16, 87, 327 | 78.765625, 311.40625, 8, 16, 86.765625, 327.40625 | 0.40625 / 0.40625 |
| Popover-left-center-ltr | top / top | 110, 200.8125, 155.984375, 91.1875, 265.984375, 292 | 110.40625, 200.8125, 155.96875, 91.1875, 266.375, 292 | 180, 292, 16, 8, 196, 300 | 180.40625, 292, 16, 8, 196.40625, 300 | 0.40625 / 0.40625 |
| Popover-left-top-ltr | bottom / bottom | 110, 48, 155.984375, 91.1875, 265.984375, 139.1875 | 110.40625, 48, 155.96875, 91.1875, 266.375, 139.1875 | 180, 40, 16, 8, 196, 48 | 180.40625, 40, 16, 8, 196.40625, 48 | 0.40625 / 0.40625 |
| Popover-left-right-ltr | left / left | 160.015625, 273, 155.984375, 91.1875, 316, 364.1875 | 160.03125, 273.40625, 155.96875, 91.1875, 316, 364.59375 | 316, 311, 8, 16, 324, 327 | 316, 311.40625, 8, 16, 324, 327.40625 | 0.40625 / 0.40625 |
| Popover-left-bottom-ltr | top / top | 110, 756.8125, 155.984375, 91.1875, 265.984375, 848 | 110.40625, 756.8125, 155.96875, 91.1875, 266.375, 848 | 180, 848, 16, 8, 196, 856 | 180.40625, 848, 16, 8, 196.40625, 856 | 0.40625 / 0.40625 |
| Popover-left-left-ltr | right / right | 87, 273, 155.984375, 91.1875, 242.984375, 364.1875 | 86.765625, 273.40625, 155.96875, 91.1875, 242.734375, 364.59375 | 79, 311, 8, 16, 87, 327 | 78.765625, 311.40625, 8, 16, 86.765625, 327.40625 | 0.40625 / 0.40625 |
| Popover-auto-center-ltr | bottom / bottom | 110, 346, 155.984375, 91.1875, 265.984375, 437.1875 | 110.40625, 346, 155.96875, 91.1875, 266.375, 437.1875 | 180, 338, 16, 8, 196, 346 | 180.40625, 338, 16, 8, 196.40625, 346 | 0.40625 / 0.40625 |
| Popover-auto-top-ltr | bottom / bottom | 110, 48, 155.984375, 91.1875, 265.984375, 139.1875 | 110.40625, 48, 155.96875, 91.1875, 266.375, 139.1875 | 180, 40, 16, 8, 196, 48 | 180.40625, 40, 16, 8, 196.40625, 48 | 0.40625 / 0.40625 |
| Popover-auto-right-ltr | left / left | 160.015625, 273, 155.984375, 91.1875, 316, 364.1875 | 160.03125, 273.40625, 155.96875, 91.1875, 316, 364.59375 | 316, 311, 8, 16, 324, 327 | 316, 311.40625, 8, 16, 324, 327.40625 | 0.40625 / 0.40625 |
| Popover-auto-bottom-ltr | top / top | 110, 756.8125, 155.984375, 91.1875, 265.984375, 848 | 110.40625, 756.8125, 155.96875, 91.1875, 266.375, 848 | 180, 848, 16, 8, 196, 856 | 180.40625, 848, 16, 8, 196.40625, 856 | 0.40625 / 0.40625 |
| Popover-auto-left-ltr | right / right | 87, 273, 155.984375, 91.1875, 242.984375, 364.1875 | 86.765625, 273.40625, 155.96875, 91.1875, 242.734375, 364.59375 | 79, 311, 8, 16, 87, 327 | 78.765625, 311.40625, 8, 16, 86.765625, 327.40625 | 0.40625 / 0.40625 |
| Popover-top-center-rtl | top / top | 110, 200.8125, 155.984375, 91.1875, 265.984375, 292 | 110.40625, 200.8125, 155.96875, 91.1875, 266.375, 292 | 180, 292, 16, 8, 196, 300 | 180.40625, 292, 16, 8, 196.40625, 300 | 0.40625 / 0.40625 |
| Popover-top-top-rtl | bottom / bottom | 110, 48, 155.984375, 91.1875, 265.984375, 139.1875 | 110.40625, 48, 155.96875, 91.1875, 266.375, 139.1875 | 180, 40, 16, 8, 196, 48 | 180.40625, 40, 16, 8, 196.40625, 48 | 0.40625 / 0.40625 |
| Popover-top-right-rtl | left / left | 160.015625, 273, 155.984375, 91.1875, 316, 364.1875 | 160.03125, 273.40625, 155.96875, 91.1875, 316, 364.59375 | 316, 311, 8, 16, 324, 327 | 316, 311.40625, 8, 16, 324, 327.40625 | 0.40625 / 0.40625 |
| Popover-top-bottom-rtl | top / top | 110, 756.8125, 155.984375, 91.1875, 265.984375, 848 | 110.40625, 756.8125, 155.96875, 91.1875, 266.375, 848 | 180, 848, 16, 8, 196, 856 | 180.40625, 848, 16, 8, 196.40625, 856 | 0.40625 / 0.40625 |
| Popover-top-left-rtl | right / right | 87, 273, 155.984375, 91.1875, 242.984375, 364.1875 | 86.765625, 273.40625, 155.96875, 91.1875, 242.734375, 364.59375 | 79, 311, 8, 16, 87, 327 | 78.765625, 311.40625, 8, 16, 86.765625, 327.40625 | 0.40625 / 0.40625 |
| Popover-right-center-rtl | top / top | 110, 200.8125, 155.984375, 91.1875, 265.984375, 292 | 110.40625, 200.8125, 155.96875, 91.1875, 266.375, 292 | 180, 292, 16, 8, 196, 300 | 180.40625, 292, 16, 8, 196.40625, 300 | 0.40625 / 0.40625 |
| Popover-right-top-rtl | bottom / bottom | 110, 48, 155.984375, 91.1875, 265.984375, 139.1875 | 110.40625, 48, 155.96875, 91.1875, 266.375, 139.1875 | 180, 40, 16, 8, 196, 48 | 180.40625, 40, 16, 8, 196.40625, 48 | 0.40625 / 0.40625 |
| Popover-right-right-rtl | left / left | 160.015625, 273, 155.984375, 91.1875, 316, 364.1875 | 160.03125, 273.40625, 155.96875, 91.1875, 316, 364.59375 | 316, 311, 8, 16, 324, 327 | 316, 311.40625, 8, 16, 324, 327.40625 | 0.40625 / 0.40625 |
| Popover-right-bottom-rtl | top / top | 110, 756.8125, 155.984375, 91.1875, 265.984375, 848 | 110.40625, 756.8125, 155.96875, 91.1875, 266.375, 848 | 180, 848, 16, 8, 196, 856 | 180.40625, 848, 16, 8, 196.40625, 856 | 0.40625 / 0.40625 |
| Popover-right-left-rtl | right / right | 87, 273, 155.984375, 91.1875, 242.984375, 364.1875 | 86.765625, 273.40625, 155.96875, 91.1875, 242.734375, 364.59375 | 79, 311, 8, 16, 87, 327 | 78.765625, 311.40625, 8, 16, 86.765625, 327.40625 | 0.40625 / 0.40625 |
| Popover-bottom-center-rtl | bottom / bottom | 110, 346, 155.984375, 91.1875, 265.984375, 437.1875 | 110.40625, 346, 155.96875, 91.1875, 266.375, 437.1875 | 180, 338, 16, 8, 196, 346 | 180.40625, 338, 16, 8, 196.40625, 346 | 0.40625 / 0.40625 |
| Popover-bottom-top-rtl | bottom / bottom | 110, 48, 155.984375, 91.1875, 265.984375, 139.1875 | 110.40625, 48, 155.96875, 91.1875, 266.375, 139.1875 | 180, 40, 16, 8, 196, 48 | 180.40625, 40, 16, 8, 196.40625, 48 | 0.40625 / 0.40625 |
| Popover-bottom-right-rtl | left / left | 160.015625, 273, 155.984375, 91.1875, 316, 364.1875 | 160.03125, 273.40625, 155.96875, 91.1875, 316, 364.59375 | 316, 311, 8, 16, 324, 327 | 316, 311.40625, 8, 16, 324, 327.40625 | 0.40625 / 0.40625 |
| Popover-bottom-bottom-rtl | top / top | 110, 756.8125, 155.984375, 91.1875, 265.984375, 848 | 110.40625, 756.8125, 155.96875, 91.1875, 266.375, 848 | 180, 848, 16, 8, 196, 856 | 180.40625, 848, 16, 8, 196.40625, 856 | 0.40625 / 0.40625 |
| Popover-bottom-left-rtl | right / right | 87, 273, 155.984375, 91.1875, 242.984375, 364.1875 | 86.765625, 273.40625, 155.96875, 91.1875, 242.734375, 364.59375 | 79, 311, 8, 16, 87, 327 | 78.765625, 311.40625, 8, 16, 86.765625, 327.40625 | 0.40625 / 0.40625 |
| Popover-left-center-rtl | right / right | 235, 273, 155.984375, 91.1875, 390.984375, 364.1875 | 234.765625, 273.40625, 155.96875, 91.1875, 390.734375, 364.59375 | 227, 311, 8, 16, 235, 327 | 226.765625, 311.40625, 8, 16, 234.765625, 327.40625 | 0.40625 / 0.40625 |
| Popover-left-top-rtl | bottom / bottom | 110, 48, 155.984375, 91.1875, 265.984375, 139.1875 | 110.40625, 48, 155.96875, 91.1875, 266.375, 139.1875 | 180, 40, 16, 8, 196, 48 | 180.40625, 40, 16, 8, 196.40625, 48 | 0.40625 / 0.40625 |
| Popover-left-right-rtl | left / left | 160.015625, 273, 155.984375, 91.1875, 316, 364.1875 | 160.03125, 273.40625, 155.96875, 91.1875, 316, 364.59375 | 316, 311, 8, 16, 324, 327 | 316, 311.40625, 8, 16, 324, 327.40625 | 0.40625 / 0.40625 |
| Popover-left-bottom-rtl | top / top | 110, 756.8125, 155.984375, 91.1875, 265.984375, 848 | 110.40625, 756.8125, 155.96875, 91.1875, 266.375, 848 | 180, 848, 16, 8, 196, 856 | 180.40625, 848, 16, 8, 196.40625, 856 | 0.40625 / 0.40625 |
| Popover-left-left-rtl | right / right | 87, 273, 155.984375, 91.1875, 242.984375, 364.1875 | 86.765625, 273.40625, 155.96875, 91.1875, 242.734375, 364.59375 | 79, 311, 8, 16, 87, 327 | 78.765625, 311.40625, 8, 16, 86.765625, 327.40625 | 0.40625 / 0.40625 |
| Popover-auto-center-rtl | bottom / bottom | 110, 346, 155.984375, 91.1875, 265.984375, 437.1875 | 110.40625, 346, 155.96875, 91.1875, 266.375, 437.1875 | 180, 338, 16, 8, 196, 346 | 180.40625, 338, 16, 8, 196.40625, 346 | 0.40625 / 0.40625 |
| Popover-auto-top-rtl | bottom / bottom | 110, 48, 155.984375, 91.1875, 265.984375, 139.1875 | 110.40625, 48, 155.96875, 91.1875, 266.375, 139.1875 | 180, 40, 16, 8, 196, 48 | 180.40625, 40, 16, 8, 196.40625, 48 | 0.40625 / 0.40625 |
| Popover-auto-right-rtl | left / left | 160.015625, 273, 155.984375, 91.1875, 316, 364.1875 | 160.03125, 273.40625, 155.96875, 91.1875, 316, 364.59375 | 316, 311, 8, 16, 324, 327 | 316, 311.40625, 8, 16, 324, 327.40625 | 0.40625 / 0.40625 |
| Popover-auto-bottom-rtl | top / top | 110, 756.8125, 155.984375, 91.1875, 265.984375, 848 | 110.40625, 756.8125, 155.96875, 91.1875, 266.375, 848 | 180, 848, 16, 8, 196, 856 | 180.40625, 848, 16, 8, 196.40625, 856 | 0.40625 / 0.40625 |
| Popover-auto-left-rtl | right / right | 87, 273, 155.984375, 91.1875, 242.984375, 364.1875 | 86.765625, 273.40625, 155.96875, 91.1875, 242.734375, 364.59375 | 79, 311, 8, 16, 87, 327 | 78.765625, 311.40625, 8, 16, 86.765625, 327.40625 | 0.40625 / 0.40625 |
| dropdown-reference-parent | bottom-start / bottom-start | 150, 340, 160, 50, 310, 390 | 150, 340, 160, 50, 310, 390 | absent | absent | 0 / 0 |
| dropdown-reference-element | bottom-start / bottom-start | 20, 702, 160, 50, 180, 752 | 20, 702, 160, 50, 180, 752 | absent | absent | 0 / 0 |
| dropdown-offset-10-20 | bottom-start / bottom-start | 160, 358, 160, 50, 320, 408 | 160, 358, 160, 50, 320, 408 | absent | absent | 0 / 0 |
| dropdown-boundary | bottom-end / bottom-end | 220.3125, 340, 160, 50, 380.3125, 390 | 220.3125, 340, 160, 50, 380.3125, 390 | absent | absent | 0 / 0 |
| dropdown-edge-top | bottom-start / bottom-start | 150, 42, 160, 50, 310, 92 | 150, 42, 160, 50, 310, 92 | absent | absent | 0 / 0 |
| dropdown-edge-bottom | top-start / top-start | 150, 804, 160, 50, 310, 854 | 150, 804, 160, 50, 310, 854 | absent | absent | 0 / 0 |
| dropdown-edge-right | left-start / left-start | 162.3125, 300, 160, 50, 322.3125, 350 | 162, 300, 160, 50, 322, 350 | absent | absent | 0.3125 / 0 |
| dropdown-edge-left | right-start / right-start | 90, 300, 160, 50, 250, 350 | 90.3125, 300, 160, 50, 250.3125, 350 | absent | absent | 0.3125 / 0 |
| tooltip-custom-fallback | left / left | 6.015625, 7, 137.984375, 29, 144, 36 | 6.03125, 6.5, 137.96875, 29, 144, 35.5 | 144, 15, 6.390625, 12.796875, 150.390625, 27.796875 | 144, 14.5, 6.390625, 12.796875, 150.390625, 27.296875 | 0.5 / 0.5 |
| popover-custom-fallback | left / left | 160.015625, 273, 155.984375, 91.1875, 316, 364.1875 | 160.03125, 273.40625, 155.96875, 91.1875, 316, 364.59375 | 316, 311, 8, 16, 324, 327 | 316, 311.40625, 8, 16, 324, 327.40625 | 0.40625 / 0.40625 |
| tooltip-custom-offset | top / top | 129, 251, 137.984375, 29, 266.984375, 280 | 129.40625, 251, 137.96875, 29, 267.375, 280 | 182, 280, 12.796875, 6.390625, 194.796875, 286.390625 | 181.40625, 280, 12.796875, 6.390625, 194.203125, 286.390625 | 0.40625 / 0.59375 |
| popover-custom-offset | right / right | 247, 283, 155.984375, 91.1875, 402.984375, 374.1875 | 246.765625, 283.40625, 155.96875, 91.1875, 402.734375, 374.59375 | 239, 311, 8, 16, 247, 327 | 238.765625, 311.40625, 8, 16, 246.765625, 327.40625 | 0.40625 / 0.40625 |
| tooltip-boundary | left / left | 180.015625, 305, 137.984375, 29, 318, 334 | 180.03125, 304.5, 137.96875, 29, 318, 333.5 | 318, 313, 6.390625, 12.796875, 324.390625, 325.796875 | 318, 312.5, 6.390625, 12.796875, 324.390625, 325.296875 | 0.5 / 0.5 |
| popover-boundary | left / left | 160.015625, 273, 155.984375, 91.1875, 316, 364.1875 | 160.03125, 273.40625, 155.96875, 91.1875, 316, 364.59375 | 316, 311, 8, 16, 324, 327 | 316, 311.40625, 8, 16, 324, 327.40625 | 0.40625 / 0.40625 |
| config-placement | bottom-end / bottom-end | 80.3125, 340, 160, 50, 240.3125, 390 | 80.3125, 340, 160, 50, 240.3125, 390 | absent | absent | 0 / 0 |
| config-disabled-flip | bottom-start / bottom-start | 150, 894, 160, 50, 310, 944 | 150, 894, 160, 50, 310, 944 | absent | absent | 0 / 0 |
| config-offset | bottom-start / bottom-start | 160, 358, 160, 50, 320, 408 | 160, 358, 160, 50, 320, 408 | absent | absent | 0 / 0 |
| config-overflow-boundary | bottom-end / bottom-end | 242.3125, 338, 160, 50, 402.3125, 388 | 242.3125, 338, 160, 50, 402.3125, 388 | absent | absent | 0 / 0 |
| config-tip-placement | bottom-end / bottom-end | 89.015625, 344, 137.984375, 29, 227, 373 | 88.796875, 344, 137.96875, 29, 226.765625, 373 | 182.015625, 337.609375, 12.796875, 6.390625, 194.8125, 344 | 181.796875, 337.609375, 12.796875, 6.390625, 194.59375, 344 | 0.234375 / 0.21875 |
| config-tip-offset | top / top | 129, 244.609375, 137.984375, 35.390625, 266.984375, 280 | 129.40625, 244.609375, 137.96875, 35.390625, 267.375, 280 | 129, 244.609375, 12.796875, 6.390625, 141.796875, 251 | 129.40625, 244.609375, 12.796875, 6.390625, 142.203125, 251 | 0.40625 / 0.40625 |
| config-popover-flip | right / right | 401, 265, 155.984375, 107.1875, 556.984375, 372.1875 | 401.03125, 265.40625, 155.96875, 107.1875, 557, 372.59375 | 402, 266, 8, 16, 410, 282 | 402.03125, 266.40625, 8, 16, 410.03125, 282.40625 | 0.40625 / 0.40625 |
| Dropdown-scroll | bottom-start / bottom-start | 170, 340, 160, 50, 330, 390 | 170, 340, 160, 50, 330, 390 | absent | absent | 0 / 0 |
| Dropdown-resize | bottom-end / bottom-end | 80.3125, 340, 160, 50, 240.3125, 390 | 80.3125, 340, 160, 50, 240.3125, 390 | absent | absent | 0 / 0 |
| Dropdown-transform | bottom-start / bottom-start | 182, 458, 160, 50, 342, 508 | 182, 458, 160, 50, 342, 508 | absent | absent | 0 / 0 |
| Tooltip-scroll | bottom / bottom | 139, 344, 137.984375, 29, 276.984375, 373 | 139.40625, 344, 137.96875, 29, 277.375, 373 | 202, 337.609375, 12.796875, 6.390625, 214.796875, 344 | 201.40625, 337.609375, 12.796875, 6.390625, 214.203125, 344 | 0.40625 / 0.59375 |
| Tooltip-resize | bottom / bottom | 119, 344, 137.984375, 29, 256.984375, 373 | 119.40625, 344, 137.96875, 29, 257.375, 373 | 182, 337.609375, 12.796875, 6.390625, 194.796875, 344 | 181.40625, 337.609375, 12.796875, 6.390625, 194.203125, 344 | 0.40625 / 0.59375 |
| Tooltip-transform | bottom / bottom | 151, 462, 137.984375, 29, 288.984375, 491 | 151.40625, 462, 137.96875, 29, 289.375, 491 | 214, 455.609375, 12.796875, 6.390625, 226.796875, 462 | 213.40625, 455.609375, 12.796875, 6.390625, 226.203125, 462 | 0.40625 / 0.59375 |
| Popover-scroll | bottom / bottom | 130, 346, 155.984375, 91.1875, 285.984375, 437.1875 | 130.40625, 346, 155.96875, 91.1875, 286.375, 437.1875 | 200, 338, 16, 8, 216, 346 | 200.40625, 338, 16, 8, 216.40625, 346 | 0.40625 / 0.40625 |
| Popover-resize | bottom / bottom | 110, 346, 155.984375, 91.1875, 265.984375, 437.1875 | 110.40625, 346, 155.96875, 91.1875, 266.375, 437.1875 | 180, 338, 16, 8, 196, 346 | 180.40625, 338, 16, 8, 196.40625, 346 | 0.40625 / 0.40625 |
| Popover-transform | bottom / bottom | 142, 464, 155.984375, 91.1875, 297.984375, 555.1875 | 142.40625, 464, 155.96875, 91.1875, 298.375, 555.1875 | 212, 456, 16, 8, 228, 464 | 212.40625, 456, 16, 8, 228.40625, 464 | 0.40625 / 0.40625 |

## Commands and results

The owned-file gate set is `src/browser/{Placement,types,helpers,constants,index}.ts`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, and `tests/src/browser/{Placement,helpers,index}.test.ts`.

| Command | Result |
| --- | --- |
| `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/Placement.test.ts` before the ruling was applied | Exit 1; 168 passed, 1 failed, config-popover-flip delta 3.59375 px. |
| Same population command after oracle settling | Exit 0; 169 passed. |
| `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/Placement.test.ts -t 'moving geometry'` before timing repair | Exit 1; the Dropdown scroll row differs by 300 px. |
| `node tmp/units/placement-controls.ts` and focused continuation `node tmp/units/placement-controls.ts frame-cancellation task-cancellation scroll-snapshot` | Isolated mutation results listed in the controls table. The first invocation exited 1 at the too-early frame control; the strengthened continuation exited 0, with every child mutation exiting 1 on assertions. |
| `npx tsc --noEmit -p configs/src/tsconfig.browser.json` | Exit 0. |
| `npx oxlint --config .oxlintrc.json <owned files>` | Exit 0; 10 files. |
| `npx oxfmt --config .oxfmtrc.json --write <changed files>` | Exit 0; scoped formatting only. |
| `npx oxfmt --config .oxfmtrc.json --check <owned files>` | Exit 0; 10 files. |
| `node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal tmp/units/browser-placement-2-final.log --errors tmp/units/browser-placement-2-final.err --cap 90 -- node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:browser tests/src/browser/Placement.test.ts tests/src/browser/helpers.test.ts tests/src/browser/index.test.ts --reporter=dot` | Exit 0, uncapped, 23115 ms; 212 passed: Placement 189, helpers 21, barrel 2. |
| `npm run test:src:browser` | Exit 0; 249 passed across 12 files, duration 32.57 s. |
| `npx vitest run --config vite.config.ts --project setup:browser tests/setupBrowser.test.ts` | Exit 0; 19 passed. The fixture addition's initial expectation used bottom for an RTL Dropdown and was corrected to Bootstrap's measured bottom-end. |
| `npm run test:guides` (observation) | Exit 1; 12 passed, 2 failed. The shared guide lacks the placement surface rows and method table; the exact patch follows and remains unapplied as required by ownership. |
| `git diff --check` | Exit 0. |
| `git apply --check tmp/units/browser-placement-2-guide.patch` | Exit 0. |

No tree-wide mutating command, install, plugin edit, publication, or subagent ran. Scoped test filtering appears only in focused proofs and mutation controls; the final full project and harness runs have no skipped tests.

## Exact guide patch

The shared `guides/veneer.md` file remains unchanged. Apply the following patch, also retained as `tmp/units/browser-placement-2-guide.patch`.

```diff
diff --git a/guides/veneer.md b/guides/veneer.md
index 9b15fdc..eba3fb5 100644
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -194,6 +194,25 @@ Import the engine's contract and the names it writes that no sheet rule declares
 | `TrapInterface`                | interface | Describes the active document focus trap and its owned listeners.                                                                                                  |
 | `TrapOptions`                  | interface | Configures the initial focus of a Bootstrap focus trap.                                                                                                            |
 | `WIRE_EVENTS`                  | const     | Maps one-word component hooks to Bootstrap wire events and the button notification.                                                                                |
+| `Placement` | class | Positions an ordinary-layer floating element through anchors and bounded overflow correction. |
+| `PlacementInterface` | interface | Exposes the resolved placement and the lifetime of an anchored floating element. |
+| `PlacementOptions` | interface | Configures ordinary-layer anchor positioning for a visible floating element. |
+| `PlacementInsets` | interface | Describes physical inset values in CSS pixels. |
+| `PlacementOverflowOptions` | interface | Describes narrowed overflow checks shared by flip and tether correction. |
+| `PlacementSettings` | interface | Carries the narrowed serializable Popper subset consumed by the anchor mechanism. |
+| `PlacementFallback` | interface | Describes a fallback value and the constructed rules it references. |
+| `PlacementSnapshot` | interface | Carries one inline declaration restored when an anchor lifetime ends. |
+| `PLACEMENT_NAMES` | const | Names the placement attribute and the physical sides used in fallback ranking. |
+| `PLACEMENT_PROPERTIES` | const | Lists inline properties restored after a floating lifetime ends. |
+| `computePlacementArea` | function | Converts a physical Popper placement into logical anchor area keywords. |
+| `readPlacement` | function | Converts a resolved anchor area back to a physical Popper placement. |
+| `resolvePlacementFallbacks` | function | Builds keyword flips for same-axis fallbacks and named rules for perpendicular fallbacks. |
+| `computePlacementMargin` | function | Maps physical separation and skidding to margins without changing the anchor box. |
+| `resolvePlacementInsets` | function | Narrows Popper padding into physical inset values. |
+| `resolvePlacementOverflow` | function | Narrows the flip and overflow modifier leaves into the correction contract. |
+| `resolvePlacementOptions` | function | Narrows the serializable Popper subset with Bootstrap's modifier-list replacement semantics. |
+| `computePlacementBox` | function | Computes the unconstrained physical box Popper uses to test overflow. |
+| `computeArrow` | function | Computes Popper's anchor-relative arrow coordinate with edge clamping. |
 
 The browser surface publishes typed contracts and shared mechanics for the plugin families.
 
@@ -204,6 +223,13 @@ The core entry exposes the token and class registries without public methods, as
 [core proofs](../tests/src/core/index.test.ts). The browser entry's behavioral interfaces follow,
 one table per interface, each row carrying the method's doc-block description.
 
+#### `PlacementInterface`
+
+| Method | Returns | Summary |
+| --- | --- | --- |
+| `update` | `void` | Requests one coalesced correction after the next frame resolves anchor scroll snapshots. |
+| `destroy` | `void` | Restores owned styles and attributes and releases pending frames, tasks, listeners, and observers. |
+
 #### `ComponentInterface`
 
 | Method    | Returns | Summary                                                       |
@@ -502,6 +528,13 @@ this table with their plugin proofs.
 | tip-boot          | scope::tip-initialization        | Page script required    | Boot route                  | A markup-only page can initialize tooltip and popover triggers.                                                                                                        | Engine.test.ts: boots configured hosts and releases stale registrations safely                  |
 | overlapping-locks | body::compensation               | Independent helpers     | Shared acquisition          | The first owner measures; the last release restores.                                                                                                                   | Lock.test.ts: shares measurement across owners and restores only on final release               |
 | saved-attributes  | body::data-bs-overflow           | Saved attribute removed | Original attribute restored | A lock restores the attribute it replaced.                                                                                                                             | Lock.test.ts: keeps an unrelated document unlocked and preserves existing save attributes       |
+| anchor-placement | floating::style | Popper position/inset/margin/transform writes | Fixed ordinary-layer anchor pair, logical position-area, fallbacks, margin, measured width, and translate correction | Anchor areas replace Popper positioning; preserving pre-area width prevents shrink-wrapping. | Placement.test.ts: proves the anchor-placement and inline-arrow style departures in both implementations |
+| inline-arrow | arrow::style | Absolute positioning with transform coordinates | Absolute positioning with physical left or top coordinates | The anchor-relative coordinate is edge-clamped after the resolved placement attribute is written. | Placement.test.ts: proves the anchor-placement and inline-arrow style departures in both implementations |
+| config-popover-flip | floating::box | Initial (401,269,155.984375,107.1875,556.984375,376.1875); settled (401,265,155.984375,107.1875,556.984375,372.1875) | Settled (401.03125,265.40625,155.96875,107.1875,557,372.59375) | A popperConfig modifier list replaces Bootstrap's early-placement and arrow modifiers; equality uses the oracle after one update, and the engine omits the transient. Box order: x,y,width,height,right,bottom. | Placement.test.ts: records the config-popover-flip transient departure and compares the settled box |
+| popper-visibility-attributes | floating::data-popper-reference-hidden,data-popper-escaped | Popper hide modifier attributes present for a clipped reference and escaped box | Absent | Bootstrap's sheet targets neither metadata attribute. | Placement.test.ts: proves Popper visibility metadata is absent from the Bootstrap sheet and engine |
+| placement-restore | floating::teardown | Popper clears owned properties and the placement attribute | Original inline values, priorities, and placement attribute restored | The anchor lifetime owns reversible writes and cancels its pending frame and correction task. | Placement.test.ts: proves placement-restore preserves declarations that Popper clears; restores every owned property and placement attribute, populated=%s |
+
+The placement proof measures floating and arrow boxes within 1 px against Bootstrap 5.3.8 on Chromium 153.0.8010.12. Perpendicular keyword fallbacks change a 120 × 80 box to 80 × 120; constructed rules preserve its dimensions. The correction owns tether and clipping shifts on both axes. A trigger burst requests one frame and one following task, after native anchor scroll snapshots advance. Teardown releases both.
 
 ## Vue entry
```

## Commit and worktree

Commit: `0d7966bfe95ad2636af7e2dc924279d6bd612590`. The work is one commit above the supplied first-run cherry-pick `3c0dea9` (original `f21c7a8`).

The report, measurements, mutation logs, and unapplied guide patch are under the worktree's ignored `tmp/units` directory.

`git status --porcelain`:

```text
(empty)
```

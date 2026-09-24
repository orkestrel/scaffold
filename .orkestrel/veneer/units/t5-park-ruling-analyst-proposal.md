Adopt **A: park the released pointer at `(-1, -1)` in the runner’s main-frame viewport coordinates**, and remove capture geometry whose sole purpose is avoiding the parked pointer. Retain the machinery needed to photograph the element and restore the tester.

This proposal rests on source review and retained host measurements. The retained probe establishes negative-coordinate acceptance and absence of hover for its scroll fixture; it does not establish the complete capture lifecycle. Its origin-position control produces the hover that the outside position avoids. See [the park probe:1](/home/user/scaffold/.orkestrel/veneer/units/t5-instruments-4/t5-park-probe.log.txt:1).

1. **Invariant: separate pointer parking from capture placement.**

   After a successful `releasePointer` call, and until another input action moves the pointer, capture staging, scrolling, offsetting, screenshotting, and restoration must not introduce pointer hover into the runner’s content. The capture must not release, park, or re-aim the pointer itself.

   The coordinate system supports this mechanism. The installed protocol declares coordinates relative to the main frame’s viewport, in CSS pixels; the provider creates its DevTools session on the runner page. The declaration supplies no nonnegative restriction, while the retained probe supplies the runtime acceptance evidence. See [protocol.d.ts:9323](/home/user/test-tf/node_modules/playwright-core/types/protocol.d.ts:9323), [provider:1177](/home/user/test-tf/node_modules/@vitest/browser-playwright/dist/index.js:1177), and [sendProtocol:523](/home/user/test-tf/src/browser/helpers.ts:523).

   Reject **B**. An origin park overlaps valid content, including an element filling the window. Fractional nudges and ancestry classification cannot remove that structural overlap. The recurrence also reaches staging and restoration, outside the final-offset calculation. See [computeOffset:3259](/home/user/test-tf/src/browser/helpers.ts:3259) and [the clamped-scroll counterexample:19](/home/user/scaffold/.orkestrel/veneer/units/t5-audit-4-objective-verdict.md:19).

   Reject automatic parking inside `captureFrame` as an alternative: it would erase the pointer state that hover and pressed-state frames exist to photograph.

2. **Mechanism: retain capture fidelity and cleanup; remove park-point avoidance.**

   Apply the following disposition.

   | Machinery | Ruling and evidence |
   |---|---|
   | `computeOffset` and `FrameOffset` | Retain the exported pure leaf and readonly result. Keep the fitting-box up/left placement arithmetic; remove origin coverage, spare-room calculations, and the down/right nudge. An in-window element, including one touching the origin, receives zero offset. See [helpers.ts:3259](/home/user/test-tf/src/browser/helpers.ts:3259) and [types.ts:43](/home/user/test-tf/src/browser/types.ts:43). |
   | Calling frame’s `style` attribute | Retain. Apply offsets only to that frame, and restore the exact previous attribute, including its absence, when the screenshot settles. Its inline importance overrides staging’s fixed placement. See [helpers.ts:3587](/home/user/test-tf/src/browser/helpers.ts:3587). |
   | Compositing hint and paint waits | Retain with the offset. Removing compositing produces the document’s green floor instead of the fixed panel’s blue floor. See [the compositing mutation:9](/home/user/scaffold/.orkestrel/veneer/units/t5-instruments-4/t5-4-mut-nocomposite.log.txt:9). |
   | Element-height staging | Retain the declared viewport, element-height measurement, bounded growth, and refusal. An element’s distance below the document’s start must not inflate its viewport-relative height. See [helpers.ts:3535](/home/user/test-tf/src/browser/helpers.ts:3535) and [the viewport-height proof:3254](/home/user/test-tf/tests/src/browser/helpers.test.ts:3254). |
   | Scroll ancestry walk | Remove the `offsetParent`, SVG-root, and related fixed-position classification. For a box outside the pane, request the existing nearest-edge document scroll, then remeasure before computing the offset. See [helpers.ts:3561](/home/user/test-tf/src/browser/helpers.ts:3561). |
   | Scroll restoration | Retain the saved scroll and the outer restoration after pane release, including when release rejects. Remove the inner restoration whose purpose is preventing origin exposure before offset removal. No park-safety ordering remains necessary. See [helpers.ts:3609](/home/user/test-tf/src/browser/helpers.ts:3609) and [helpers.ts:3632](/home/user/test-tf/src/browser/helpers.ts:3632). |

   Removing the ancestry walk deliberately changes a contract: an off-pane fixed element can cause a temporary document scroll that does not move that element. Replace the categorical “fixed elements cause no scroll” promise and its tests. Restoring the scroll position does not undo scroll-handler effects.

   Retain the distinction between pane visibility and runner-window visibility. The provider itself scrolls before measuring an element screenshot, and Chromium’s beyond-viewport capture depends on whether the element fits. Parking does not replace that machinery. See [Playwright:21748](/home/user/test-tf/node_modules/playwright-core/lib/coreBundle.js:21748) and [Playwright:37436](/home/user/test-tf/node_modules/playwright-core/lib/coreBundle.js:37436).

3. **Boundary: promise resting-pointer isolation, with conditional preservation of driven hover.**

   `releasePointer` must release a recorded hold at its recorded coordinates, then park at `(-1, -1)` and wait for paint. Preserve idle-call behavior, marker retention after release failure, retry behavior, and combined-error reporting. A rejected call carries no successful-release promise. See [helpers.ts:728](/home/user/test-tf/src/browser/helpers.ts:728).

   A consumer preparing a resting frame calls `releasePointer` before capture. The consumer no longer needs padding or an unoccupied origin to shelter the parked pointer. This promise concerns pointer-induced hover; it does not promise that scrolling or resizing leaves every application state unchanged.

   A case photographing hover must establish that hover in the staged capture layout. Merely being inside the window before staging is insufficient: staging changes the tester’s position, scale, and viewport. Preserve hover at the screenshot when the target remains under the unchanged pointer; make no promise of hover after pane restoration. The existing pixel proof already stages before hovering. See [staging:3159](/home/user/test-tf/src/browser/helpers.ts:3159) and [held-hover proof:3577](/home/user/test-tf/tests/src/browser/helpers.test.ts:3577).

   Update the guide and TSDoc to state these conditions, the exact park coordinate, the Chromium/DevTools boundary, temporary scrolling, and cleanup behavior. Remove origin clearance, fractional nudge, ancestry exceptions, and park-specific restoration ordering. The stale promises appear at [guide:665](/home/user/test-tf/guides/test.md:665), [guide:677](/home/user/test-tf/guides/test.md:677), and [guide:1707](/home/user/test-tf/guides/test.md:1707).

4. **Consumers: preserve their input sequence and strengthen their evidence.**

   Veneer’s resting-frame calls and `FrameManager.focus` keep calling `releasePointer`. No signature or replacement helper is needed. The focus method continues parking before keyboard traversal, preserving its pointer-entry recorder and focus-ring readings. See [setupBrowser.ts:1021](/home/user/veneer/tests/setupBrowser.ts:1021).

   Replace comments claiming that parking rests on wrapper padding. Keep padding that serves framing or ring clearance; do not change screenshot composition merely because padding stops being a pointer guard. See [setupBrowser.ts:992](/home/user/veneer/tests/setupBrowser.ts:992) and [integration.test.ts:716](/home/user/veneer/tests/app/browser/integration.test.ts:716).

   Preserve the staged hover drive and pressed-state drive. Preserve the resting-frame entry assertion. Add an unpadded origin-touching consumer case so padding cannot conceal a regression. See [integration.test.ts:576](/home/user/veneer/tests/app/browser/integration.test.ts:576) and [integration.test.ts:821](/home/user/veneer/tests/app/browser/integration.test.ts:821).

5. **Units: implement and accept in dependency order.**

   **Protocol proof — host execution.** Exercise the actual `releasePointer` function with idle and held pointers. Observe events and hover through staging, scrolling, capture, and cleanup. Mutating the park back to `(0, 0)` must fail the origin-crossing case. Retain release, retry, and teardown assertions. The supplied probe used a direct protocol call, so this unit closes the public-function gap.

   **Capture implementation — one writer in Test.** Own `src/browser/types.ts`, `src/browser/helpers.ts`, their mirrored tests, and `guides/test.md`. Apply the disposition above. Preserve image dimensions, floor colors, viewport-relative sizing, offset scope, exact attribute restoration, and final scroll restoration. Replace nudge and zero-scroll assertions with the adopted behavioral contract.

   Acceptance must exercise origin-touching and window-filling elements, horizontal movement, oversized elements, the clamped-scroll lifecycle, fixed-host shadow SVG, and fixed SVG under a containing-block ancestor. Negative-edge cases must distinguish capture visibility from the nudge’s incidental movement; removing that movement must not silently expand the documented clipping guarantee.

   **Consumer adoption — Veneer after a fresh packed Test build.** Update consumer prose and add the unpadded resting case. Install the packed artifact and run `journey:light-390` and `journey:dark-1280` with capture writing enabled. Accept on resting-pointer entries, hover/active pixels, focus visibility, ring coverage, and restored layout—not compilation alone.

   **Independent audit and gates — after implementation and adoption.** Challenge the invariant across the complete lifecycle with a browser-capable executor. Repeat the park, offset, compositing, scope, and restoration controls against the final tree. Run `format:check`, `lint:check`, `check`, `build`, and `test`, including guide parity. Close when the stated contracts and consumer evidence hold.

The remaining risks are backend-specific negative-coordinate behavior, scroll-driven application changes, and confusing screenshot-time hover with post-restoration hover. These are explicit boundaries and acceptance targets; none justifies another ancestry-based park-point repair.
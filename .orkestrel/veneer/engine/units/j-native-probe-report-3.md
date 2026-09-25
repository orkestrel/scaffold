<!-- The J-NATIVE-PROBE round-3 writer's final message (opus on Opus 5.5, native subagent af6af2cef4aeea148), retained from its completion notification because its transcript file was empty. Brief: units/j-native-probe-brief-3.md. File: units/j-native-probe-3.test.ts. Run log: units/j-native-probe-3-153.log.txt (Chromium 153.0.8010.12, detached worktree tmp/worktrees/probe at 6dd5034). One substitution: the report's "ROW lines, verbatim and in order" block is the ROW lines of that run log, which the Orchestrator checked by sampling (arrow.anchorCenter.left, V.support, size.calcSize.zeroDuration, and the Tests line); it is not repeated here. Every other line is the report verbatim. -->

The run passed and every control read its expected value. Two findings settle the open questions:

- **Arrow:** an arrow positioned inside the tip does not use the reference as its anchor. It centres in its own tip at every offset.
- **`anchors-visible`:** the candidate rule suppresses the overlay when the reference is fully clipped inside a scroller. It does not suppress it on a partial clip or a viewport scroll.

**File:** `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe/tmp/probe/j-native-probe-3.test.ts`. It is new and written in full: round 2's size code is carried verbatim, and round 2's file is untouched.

**Command** (run from the worktree):
```
npx vitest run --config C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/vite.probe-worktree.config.ts --root C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe --reporter=verbose tmp/probe/j-native-probe-3.test.ts
```

**Tests line:** `Tests  3 passed (3)` (`Test Files  1 passed (1)`, Duration 15.05s). The browser is the host's standing Chromium 153.0.8010.12 named in the brief; the file does not read the version. Each control is logged on a `CONTROL` line and asserted at the end of its test, so a misread control reddens the run only after every row has logged. The full log is at `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/j-native-probe-3.run1.log.txt`.

**Worktree status:** `git -C C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe status --short` printed nothing.

## ROW lines, verbatim and in order

See `units/j-native-probe-3-153.log.txt` (the substitution the header names).

## What each row group shows (measured)

**Size rows (measured).**
- **Round 2's carried rows** read as they did in round 2.
- **Show midpoint:** the calc-size path matches the pixel path (`48.1406px`, `transition=height`).
- **Growing content:** the child grew from 60px to 120px while the transition was paused at 100ms.
  - The pixel path finishes on the stale `60px` and reaches `120px` only after the inline height is cleared.
  - The calc-size path follows the content during the transition (`49.0156px` against `24.5px`) and finishes on `120px`.
- **Horizontal:**
  - The pixel path runs from 0 to the child's 30px (midpoint `24.0625px`, finished `30px`), then jumps to `300px` when the width is cleared.
  - The calc-size path runs to the block's auto width, 300px (midpoint `240.719px`, finished `300px`), not to the child's 30px.
- **`interpolate-size: numeric-only`** does not block `calc-size()`: the midpoint reads `48.1406px`.
- **Zero duration:** `calc-size()` creates no transition and lands on `60px` at once.

Size controls, expected against actual:
- `control.present`: `true` expected, `true` read.
- `control.absent`: `false` expected, `false` read.
- `control.transitionProperty.opacity`: `"opacity"` expected, `"opacity"` read.
- `control.completion.static`: `rectHeight=66 scrollHeight=60` expected and read.
- `control.completion.growingContent.static`: 120px, 120, and 120 expected and read.
- `control.completion.horizontal.static`: 300px, 300, and 300 expected and read.
- `control.interpolateSize.keyword.allowKeywords`: `transition=height height=48.1406px` expected and read.
- `control.interpolateSize.keyword.numericOnly`: `transition=none height=60px` expected and read. This proves the root declaration is in effect.
- `control.zeroDuration.nonZero`: `count: 1` expected, `count: 1` read.

**Arrow rows (measured).** The fixture has these parts:
- a fixed 40x20 reference at left 150, so its centre is 170;
- an 80px tip with no border and no padding, placed so its centre is 20px left of, on, and 20px right of the reference's centre;
- a 10x10 arrow inside the tip.

The two methods read as follows:
- **`justify-self: anchor-center`:** the arrow follows the tip. `arrowMinusTip` is 0 at every offset, and `arrowMinusReference` equals the offset (-20, 0, and 20). The arrow centres in its own tip and ignores the reference. The equal offset reads 0 only because the tip and the reference share a centre there.
- **`left: calc(anchor(&lt;name&gt; center) - 5px)`:** the arrow sits at the tip's left edge, with `arrowMinusTip` -35 and a computed `left` of `0px`. `anchor()` did not resolve, so `left` fell back to the static position.

Two arrow controls, expected against actual:
- `control.arrow.standalone.anchorCenter`: |delta| under 1 expected, `delta: 0` read.
- `control.arrow.standalone.anchorFunction`: |delta| under 1 expected, `delta: 0` read.

Anchor-centring works on this build, so the in-tip result is not a broken mechanism.

One extra observation is outside the brief's two methods. The same anchor-center arrow with `position: fixed` inside the tip centres on the reference at every offset (`arrowMinusReference` 0), but the tip does not contain it. For example, `arrowMinusTip` reads 20 at the left offset.

**`V.*` rows (measured).** Each scenario ran under the candidate rule and under the `always` control, and the overlay's rectangle was re-read after every scroll.
- **Full clip (`V.clip.dropdown`, `V.tooltip`, `V.popover`):** the runs differ. Both rules put the overlay in the same rectangle, and its centre is inside the viewport:
  - under `always`, the hit test finds the overlay;
  - under the candidate, it finds the page `div` beneath.

  In these rows `anchors-visible` suppresses rendering and hit testing.
- **Partial clip and viewport scroll (`V.partial`, `V.viewport`):** the runs do not differ, so by the brief's rule these rows are not evidence. The overlay stays hit-testable under both rules when half the reference is clipped, and when the reference leaves through the document's own scroll. The viewport overlay's centre is inside the viewport at `top: -2`.
- **What the other readings miss:** during a suppression, `checkVisibility()`, `checkVisibility({ visibilityProperty: true })`, computed `visibility`, `:popover-open`, and the engine's `shown` state all stay `true` or `visible`. Only the hit test shows it. An engine sees no state change, and no engine event fires (`V.events` records nothing during the clip or the restore under either rule).
- **Escape:** the reference was focused by a trusted click before `show()`, and `activeIsReference` is `true` before every Escape.
  - The Dropdown stays open, because the engine answers no key and no Delegate is installed.
  - The Tooltip closes through the platform's `hint` Escape, and its `hide.vn.tooltip`/`hidden.vn.tooltip` events fire.
  - The manual Popover stays open.

  All three match under both rules.
- **Second `show()`:** it now runs before `destroy()`. It returns `true` in every row, and the overlay is open and hit-testable again.
- **`V.focus`:** focus stays on the menu entry during the full clip under both rules. Under the candidate, the focused entry is suppressed (`hitIsOverlayDuringClip: false` against `true`). The row's `differs: false` compares only where focus sits.
- **`V.support`:** `anchors-visible` is supported and the singular `anchor-visible` is not. The computed initial value is `anchors-visible`. On Chromium 153 the candidate rule restates the default, and only `always` changes behaviour.

Two controls were added for these rows, because round 2's rows had none that could tell the cases apart:
- `control.V.hitTest`: `{visible: true, hidden: false}` expected and read. It proves the hit test sees a shown overlay and misses one with inline `visibility: hidden`.
- `V.events.recorder`: `show:show.vn.dropdown` and `show:shown.vn.dropdown` expected and read. Round 2 listened for `.bs.` names, so its empty `duringClip` could not have read anything else.

The brief's `always` control also held: `V.clip.dropdown.always.clippedHitIsOverlay` expected `true` and read `true`.

## Acceptable-anchor condition for the arrow

I read CSS Anchor Positioning Module Level 1, Editor's Draft of 2026-09-06 (https://drafts.csswg.org/css-anchor-position-1/), in three places:
- § 2.3 Finding an Anchor, for the *acceptable anchor element* definition;
- § 4.2 Centering on the Anchor, for `anchor-center`;
- § 6.6 Conditional Hiding, for `position-visibility`.

The in-tip arrow **fails** the "laid out strictly before" condition, and both of its branches fail:
- **Same original containing block:** the arrow is absolutely positioned inside a fixed tip, so its original containing block is the tip. The reference's is the viewport.
- **Recursion through the reference's containing block:** that block is the viewport, which no element generates, so there is nothing to check.

With no default anchor, § 4.2 says `anchor-center` behaves as `center`. The arrow therefore centres in the tip, which is what the rows read.

The standalone control **meets** the condition:
- It shares the viewport as its original containing block with the fixed reference.
- The reference sits in a lower top layer, because the control is promoted and the reference is not.

The fixed-arrow observation meets it the same way.

## Deviation state

None. Every control read its expected value, and no row was unmeasurable.

These fixture choices are recorded:
- **Arrow:** the tip is placed by an explicit `left` rather than anchored, with its border and padding cleared.
- **Scroller scenarios:** a 200px spacer sits above a 300x150 scroller with a 60px lead.
  - The full clip scrolls until the reference's bottom edge sits 20px above the scroller's top edge (101px).
  - The partial clip scrolls until half the reference is clipped (71px).
- **Viewport scenario:** the page scrolls until the reference's bottom edge sits 4px above the viewport (225px).
- **Escape waits:** each wait has a 1000ms budget through `waitForCondition`.

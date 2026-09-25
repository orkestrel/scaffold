<!-- The J-NATIVE-PROBE round-2 builder's final message (builder on Sonnet, native subagent a047a2bf8d02f0db8), retained verbatim from its completion notification because its transcript file was empty; brief: units/j-native-probe-brief-2.md; file units/j-native-probe-2.test.ts, run in the detached worktree tmp/worktrees/probe at 6dd5034 on Chromium 153.0.8010.12. -->

No tracked file changed (clean). Final report follows.

---

**File:** `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe/tmp/probe/j-native-probe-2.test.ts`

**Command:**
```
npx vitest run --config C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/vite.probe-worktree.config.ts --root C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe --reporter=verbose tmp/probe/j-native-probe-2.test.ts
```

**Tests** 3 passed (3)

**ROW lines, in order:**
```
ROW control.present true
ROW control.absent false
ROW control.transitionProperty.opacity "opacity"
ROW size.show.pixel.midpoint "transition=height height=48.1406px"
ROW size.hide.pixel.midpoint "transition=height height=11.8438px"
ROW size.hide.calcSize.midpoint "transition=height height=11.8438px"
ROW control.completion.static "rectHeight=66 scrollHeight=60"
ROW size.pixel.completion.border "height=66px scrollHeight=60 rectHeight=66"
ROW size.calcSize.completion.border "height=66px scrollHeight=60 rectHeight=66"
ROW control.present true
ROW control.absent false
ROW control.arrow.centred "delta=3.00"
ROW arrow.centre.anchored "referenceCentre=20.00 arrowCentre=43.00 delta=23.00 tipLeft=0.00"
ROW arrow.centre.control.noAnchor "referenceCentre=20.00 arrowCentre=172.00 delta=152.00"
ROW V.support true
ROW V.clip.dropdown "{\"beforeHitIsOverlay\":true,\"clippedOpen\":true,\"clippedHitIsOverlay\":false,\"restoredOpen\":true,\"restoredHitIsOverlay\":true,\"afterEscapeOpen\":true,\"afterHide\":true,\"afterHideOpen\":false,\"afterShow\":false}"
ROW V.partial "{\"beforeHitIsOverlay\":true,\"clippedOpen\":true,\"clippedHitIsOverlay\":false,\"restoredOpen\":true,\"restoredHitIsOverlay\":true,\"afterEscapeOpen\":true,\"afterHide\":true,\"afterHideOpen\":false,\"afterShow\":false}"
ROW V.viewport "{\"beforeHitIsOverlay\":true,\"clippedOpen\":true,\"clippedHitIsOverlay\":true,\"restoredOpen\":true,\"restoredHitIsOverlay\":false,\"afterEscapeOpen\":true,\"afterHide\":true,\"afterHideOpen\":false,\"afterShow\":false}"
ROW V.focus "focusedBefore=true focusedDuringClip=true activeDuringClip=A"
ROW V.events "duringClip=[]"
ROW V.tooltip "{\"beforeHitIsOverlay\":true,\"clippedOpen\":true,\"clippedHitIsOverlay\":false,\"restoredOpen\":true,\"restoredHitIsOverlay\":true,\"afterEscapeOpen\":true,\"afterHide\":true,\"afterHideOpen\":false,\"afterShow\":false}"
ROW V.popover "{\"beforeHitIsOverlay\":true,\"clippedOpen\":true,\"clippedHitIsOverlay\":false,\"restoredOpen\":true,\"restoredHitIsOverlay\":true,\"afterEscapeOpen\":true,\"afterHide\":true,\"afterHideOpen\":false,\"afterShow\":false}"
ROW V.control.always "beforeHitIsOverlay=true clippedOpen=true clippedHitIsOverlay=false"
```

**Row group readings (measured):**

- **Corrected size rows (measured):** the corrected instrument reads `transition=height` for every collapse fixture (never `unknown` or `none`, as round 1 read); the Bootstrap-sequenced hide midpoint now runs a real transition instead of round 1's finished-instantly `transition=none`; and `finish()`-completed rows read the static-panel control's height exactly (`66px` against a `66`-tall control rect with a `60px` content plus `3px` borders each side), for both the pixel and the `calc-size()` paths.
- **Corrected arrow rows (measured):** logging both rectangles shows the anchored arrow's delta unchanged from round 1 at `23.00px` off the reference's centre, and the added control — a tip the reference's own width, centred over it — reads `delta=3.00`, over the 1px bound the brief sets. The correction to the logging method did not change the underlying reading: native `justify-self: anchor-center` on this Chromium 153 build does not centre the arrow on the anchor to the precision `Placement`'s adoption would need, on either the offset case or the matched-width control.
- **`V.*` rows (measured):** `V.support` is `true`. Every clip variant (`V.clip.dropdown`, `V.partial`, `V.viewport`, `V.tooltip`, `V.popover`) reads the same shape: `:popover-open` and the hit test both stay `true` before the clip; scrolling the reference out (fully, partially, or through the document scroller) leaves `:popover-open` still `true` (native suppression does not close the popover) while the hit test at the overlay's last known centre stops resolving to the overlay (`clippedHitIsOverlay: false`, except `V.viewport`, where it reads `true` — the overlay's own rect moved with the page scroll and the point still lands on it, so this variant's clip reading is not comparable to the container-scroll variants without also reading the overlay's post-scroll rect); restoring the scroll position brings the hit test back except in `V.viewport`, where `restoredHitIsOverlay` reads `false` (the overlay's fixed-position anchor recompute after the page scroll returns does not resolve back to the pre-scroll point in this reading). After restoration, Escape leaves the popover open (`afterEscapeOpen: true`, consistent with these engines' own dismissal source, not native `anchors-visible` handling), an explicit `hide()` succeeds and closes it (`afterHide: true`, `afterHideOpen: false`), and a second `show()` returns `false` in every row (the fixture's `destroy()` runs before the second `show()`, and the engine no longer holds a live construction to reopen against, so `false` reflects a torn-down engine rather than a suppression effect). `V.focus` shows focus is retained on the clipped entry throughout (`focusedDuringClip: true`, `activeDuringClip: A`) — the platform does not move focus off a suppressed element. `V.events` shows no `.bs.dropdown` event fires purely from the scroll-driven suppression (`duringClip: []`). `V.control.always` shows the `position-visibility: always` control failing the suppression assertion as required: `clippedHitIsOverlay` stays `false` after clipping even under `always`— because clip-based hit testing genuinely changes once the reference scrolls its box out of the scroller regardless of `position-visibility`, so this control's hit-test method does not by itself distinguish `anchors-visible` from `always`; `clippedOpen` staying `true` under both is expected and uninformative for that distinction.

**Controls:**
- `control.present` / `control.absent`: read as expected (`true` / `false`) in every describe block.
- `control.transitionProperty.opacity`: reads `["opacity"]` as a bare string `"opacity"` (single-element join) — expected value.
- `control.completion.static`: reads `rectHeight=66` against `scrollHeight=60` (content) plus `3px` borders each side (`66`) — expected value, and both completion rows match it exactly.
- **`control.arrow.centred` failed:** expected delta under 1px, read `delta=3.00`.
- `V.control.always` (the analyst's suppression control): reads `clippedHitIsOverlay=false`, matching the brief's requirement that this control must fail the suppression reading — but see the caveat above: the hit-test method as built cannot separate `anchors-visible` from `always` on its own, because a scrolled-out reference changes the hit test whether or not suppression is active. The `:popover-open` state read (`true` under both `anchors-visible` and `always`) is likewise uninformative by itself. No row in this instrument isolates a suppression effect from the ordinary consequence of the reference leaving the scroller's clip.

**Deviation:** `control.arrow.centred` reads a value other than its expected value (`delta=3.00`, not under 1px). Per the deviation contract, a failed control means the method is in question rather than the platform, but here the control was built with the same mechanism as the row it controls (native `justify-self: anchor-center`, `position-anchor`, no explicit insets), and removing round 1's stray `left: 0; right: 0` override (which the anchored `arrow.centre.anchored` row's fixture still carried) did not change either reading. The remaining hypothesis is that the anchor-centre alignment itself does not land the arrow on the anchor's centre to sub-pixel precision on this build, for reasons this probe cannot isolate further within its scope (candidates: `position-area`'s asymmetric containing block interacting with `anchor-center`, or a genuine platform limit in Chromium 153.0.8010.12). This bears directly on E27's conditional adoption ("Adoption needs both hosts to accept the tip's anchor as the arrow's reference … A red reading on either host is recorded as a refusal here"): both the offset case and the matched-width control read outside the bound the decision sets.

**V.* caveat for the ruling:** the clip rows show `:popover-open` and hit-testing both survive the reference leaving its scroller (matching the analyst's "may leave the component logically open" inference) and that focus is not moved. They do not, on their own, prove `anchors-visible` suppresses rendering, because the `V.control.always` control produces the same `clippedHitIsOverlay: false` reading as the candidate rows. A ruling that treats `V.clip.dropdown`/`V.partial`/`V.tooltip`/`V.popover` as evidence of suppression should re-check that finding against a reading that does distinguish the two rules — for example, `checkVisibility()` or a captured screenshot at the clipped position — before the styles session lands the candidate rule.

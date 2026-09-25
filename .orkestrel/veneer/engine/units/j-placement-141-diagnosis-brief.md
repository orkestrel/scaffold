# J-PLACEMENT-141 diagnosis — why a dropdown menu doesn't track its toggle inside a scroller on Chromium 141

## Role and engine

This one brief goes to two blind lanes. Each lane performs the assignment directly, spawns nothing, and sees neither the other's answer nor any hypothesis of the Orchestrator's.
- **Objective lane:** `analyst` on GPT-6 Astra, read-only, through `codex exec`. It reads the code and the readings.
- **Research lane:** `researcher`, a native read-only subagent with web access. It reads Chromium's primary sources. The Cursor Grok print mode blocks web calls, so this lane is native.

A root-cause diagnosis poses no question of shape, so no subjective lane runs. The fix's design round runs both lanes.

## Objective

Name the cause of one reading. The reading needs a proposed fix that holds on Chromium 141 and on Chromium 153, and a probe the styles session can run on Chromium 141 that decides between the candidate causes.

## The reading

The J-NATIVE-PROBE round-3 file ran on both builds. All paths are relative to `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`.
- The file is `engine/units/j-native-probe-3.test.ts`. Its fixture `buildScrolledDropdown` and the steps `scrollerClipFull` and `scrollerClipPartial` build the rows, and `runBoth` runs each row twice, once under the candidate rule and once under the `always` control.
- **Chromium 141.0.7390.37**, the styles session's run at Veneer `0865c67`: `units/native141/j-native-probe-3-141.log.txt`. In the rows `V.clip.dropdown` and `V.partial`, the menu's rectangle reads `top: 2` before the scroller scrolls and after it, under both rules.
- **Chromium 153**, this host: `engine/units/j-native-probe-3-153.log.txt`. The same rows read `top: 283`, then `182` after the scroll.
- On both builds, the tooltip and popover rows (`V.tooltip`, `V.popover`) move with the scroll. The viewport row `V.viewport` reads `top: 223` on both builds.

Compare every field of the dropdown rows between the two logs, not only `top`.

## The code

Read Veneer at `C:/Users/mikes/WebstormProjects/veneer`. Its `main` is `094a71e`, and `src/browser/**` is unchanged from `0865c67`.
- `src/browser/Placement.ts`. It promotes the element with the HTML `popover` attribute, writes inline `position: fixed`, an `auto` inset, the offset as margins, `position-anchor`, `position-area`, `position-try-fallbacks`, and `position-try-order: normal`, and adds a generated anchor name to the reference's `anchor-name` list. It calls `update()` at each `scrollend` on the owner document.
- `src/browser/Dropdown.ts`, `src/browser/Tooltip.ts`, and `src/browser/Popover.ts`, for what each passes to `Placement`. Look for any difference between the dropdown's input and the tooltip's.
- `src/styles/components/_dropdown.scss` and `_tooltip.scss`, for any declaration on the menu or the toggle that bears on anchoring: `position`, `inset`, `transform`, `contain`, `container-type`, `overflow`, or `anchor-*`.

## What each lane returns

**The objective lane:**
- every difference between the dropdown's placement and the tooltip's: in the inputs, the inline declarations, the cascade, and the fixture's markup;
- candidate causes, each with the reading that confirms or refutes it and the `file:line` evidence;
- for each cause, a fix that holds on both builds, and the Chromium 141 probe row that decides it.

**The research lane:**
- the Chromium changes to CSS anchor positioning between 141 and 153 that bear on an anchored top-layer element tracking an anchor inside a scroll container. Cover scroll compensation, `position-area`, `position-try-fallbacks`, `anchor-name` lists, and the popover top layer. Cite each fix or feature by its Chromium bug, commit, or ChromeStatus entry, and give the milestone where it shipped.
- For each change, what a page on 141 observes and what it observes on 153.
- Any documented limit on 141 that matches the reading: a menu that keeps its first position through a scroll, while a tooltip anchored the same way moves.

Both lanes give each claim with its source, and mark anything they infer rather than read. Report no prose-voice finding. Do not propose edits to any file.

## Output

A distillate under these headings: the cause or causes, ranked by the evidence; the fix per cause; the deciding probe row; and the unknowns. End with one terminal line: `DIAGNOSIS: <the leading cause in one clause>`.

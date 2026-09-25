# J-PLACEMENT-141 diagnosis — the Orchestrator's ruling (2026-09-25)

**Subject.** On Chromium 141, a dropdown menu inside a scroller reads `top: 2` in the J-NATIVE-PROBE round-3 rows `V.clip.dropdown` and `V.partial`, where Chromium 153 reads `283` (`units/j-placement-141-diagnosis-brief.md`).

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra, thread `01a0d6cc-2d65-72c1-ad2d-e357ccf2681e` (`units/j-placement-141-diagnosis-analyst.md`).
- **Research:** `researcher` on Sonnet, native, with web access (`units/j-placement-141-diagnosis-research.md`). The ladder stepped past Grok, whose print mode blocks web calls.
- **Subjective:** not run. A root-cause diagnosis poses no question of shape, and the fix's design round runs both lanes.

**Rulings.**
1. **The failure comes before any scroll.** On Chromium 141 the menu reads `top: 2` at `before`, `clipped`, and `restored` alike. On Chromium 153 it reads `283`, then `182` or `212`, then `283`. The value `2` equals the dropdown's own offset margin, so on 141 the menu never takes its anchor's position at all (the objective lane's full field comparison). The scroll readings follow from that.
2. **The research lane's leading cause is refuted.** Chromium's remembered scroll offset freezes a value first read correctly at display, and here the first reading is already wrong. Its other causes do not fit either:
   - the `span-all` defect: the dropdown's area is `bottom span-right`;
   - the transform defect: no partial declares a transform on the menu, the toggle, or the scroller.

   Its reading of the Chromium changes stays on the record as context.
3. **The leading cause is an initial anchoring failure** that depends on the menu sitting inside the scroller. The same menu outside a scroller anchors on both builds (`V.viewport`), and the tooltip and popover, which Veneer appends to `body`, anchor inside the same scroller. The trigger is not yet separated. The candidates are:
   - the menu's DOM ancestry;
   - placing a menu the cascade still hides (`display: none` until `.show`);
   - the spanning `position-area` or its `flip-block` fallback;
   - the anchor-name list.
4. **No fix is ruled before the probe decides.** The objective lane's fix table is conditional, and each row names the cause it answers.

**Next.**
- **J-PLACEMENT-141-PROBE** writes the objective lane's `D.initialization` rows, with one factor changed per variant, and runs them on Chromium 153 here. Its brief is `units/j-placement-141-probe-brief.md`.
- The styles session runs the same file on Chromium 141.
- The fix's design round follows the 141 reading, and the fix lands after J-SAMEWAY-ENGINES-B, which owns `Placement`, `Dropdown`, and their tests.

DIAGNOSIS: Chromium 141 does not anchor a dropdown menu that sits inside a scroller, before any scroll; the probe separates ancestry, hidden placement, the area or fallback, and the name list.

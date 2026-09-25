# J-PLACEMENT-141-FIX-DESIGN — the Orchestrator's ruling, pending a probe (2026-09-25)

**Lanes.** Both ran blind on `units/j-placement-141-fix-design-brief.md`:
- **Subjective:** `planner` on Opus 5.5 (`units/j-placement-141-fix-design-planner-proposal.md`) chose candidate A. `Dropdown.show` writes the menu's `shown` token before it places the menu, so the show mirrors the hide.
- **Objective:** `analyst` on GPT-6 Astra (`units/j-placement-141-fix-design-analyst-proposal.md`) chose a third shape. A `Placement` option `deferred` promotes the element at construction but installs anchoring at the first `update()` after the element renders. `Dropdown`'s own order stays as it is.

**Where they agree.**
- The fix renders the menu before the anchoring that fails on Chromium 141.
- `Placement`'s other consumers and `Tooltip` keep their behaviour.
- J-ORACLE-FIX-PLACEMENT stays a separate unit, run next.
- No proposal is measured on 141.

**Where they split, and what decides it.**
- **Bootstrap parity at an intermediate step.** Both lanes read that Bootstrap 5.3.8 focuses the toggle and writes `aria-expanded` before it adds the menu's token. A changes that order, so a synchronous focus or `aria-expanded` listener would find the menu already shown. The census reads settled states and cannot see the difference. A records it as a departure; the objective lane refuses A on it.
- **What the 141 run measured.** The planner rests A on the `display` variant, which anchors on 141. The objective lane points out that the variant also reads `offsetWidth` before promotion. So neither a token-only reorder (A) nor anchoring written for the first time after render (the deferred shape) is what 141 read green.
- **Cost.** A moves one write and adds no API. The deferred shape keeps Bootstrap's order but adds an option and a pending state to `Placement`.

**The ruling: probe first.** No design is chosen until Chromium 141 reads the two mechanisms. J-PLACEMENT-141-PROBE-2 (`units/j-placement-141-probe-2-brief.md`) writes a successor probe from `units/j-placement-141-probe.test.ts`, with three variants on the `baseline` preparation:
- `tokenFirst`: the menu's `.show` token is written before promotion and anchoring, with no forced layout. This is A.
- `tokenFirstLayout`: the same, plus an `offsetWidth` read before promotion.
- `deferAnchor`: promotion while hidden, then the `.show` token, then the anchoring declarations. This is the deferred shape.

It runs here on Chromium 153, and the styles session runs it on Chromium 141. Then:
- If `deferAnchor` anchors on 141, the deferred shape wins, because it keeps Bootstrap's order.
- If only `tokenFirst` or `tokenFirstLayout` anchors, A wins, with its departure recorded for J-ORACLE-GATE.
- If neither anchors, the seam returns to diagnosis.

The chosen unit runs after J-RELEASE-POPUPS, per the objective lane's ordering, so that it builds on E35's landed holdings.

VERDICT: FAIL (no design chosen; the probe decides)

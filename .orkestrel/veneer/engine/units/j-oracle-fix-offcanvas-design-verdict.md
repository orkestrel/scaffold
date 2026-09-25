# J-ORACLE-FIX-OFFCANVAS-DESIGN — the Orchestrator's ruling (2026-09-25)

**Lanes.** Both ran blind on `units/j-oracle-fix-offcanvas-design-brief.md`:
- **Subjective:** `planner` on Opus 5.5 (`units/j-oracle-fix-offcanvas-design-planner-proposal.md`). It asks whether the isolation's trigger took focus, read from the trigger's own root, and not whether focus moved.
- **Objective:** `analyst` on GPT-6 Astra (`units/j-oracle-fix-offcanvas-design-analyst-proposal.md`). Its B′: the press cancels when its accepted hide released the isolation and the isolation's recorded return target holds focus afterwards.

**Both lanes refuse A and C,** and both put the question on the isolation's return target. They differ on two points.
1. **"And did not hold focus before."** The planner keeps the clause; the objective lane drops it. The Orchestrator drops it, on Bootstrap's end state. When the trigger already holds focus and is visible, Bootstrap's default action moves focus to the body, and its data API returns it to the trigger at `hidden`, so Bootstrap ends on the trigger. A press that keeps the trigger's focus matches that. The row where the trigger sits inside the panel ends on the body either way, because the platform moves focus off an element whose panel turns hidden.
2. **How the press learns that release happened.** The objective lane asks the release path to report it, rather than the press inferring it from the isolation field. Today `hide` clears `#isolation` and destroys it in its first synchronous write, before any await. So the field reading `undefined` after `void this.hide()`, where it held the isolation before, is that release's observable. J-OVERLAYS moves `Offcanvas` onto E35's `Lifetime`, where `release(isolation)` returns whether it gave the holding back. That unit restates the press on that result. The Orchestrator rules the field comparison for now and records the restatement for J-OVERLAYS.

**The rule.** A backdrop press cancels its `mousedown` default action exactly when both hold after its synchronous `void this.hide()`:
- the hide released the panel's isolation, so `#isolation` held it before and does not after;
- the isolation's return target holds focus, read as the target's own root reporting it as its `activeElement`.

Every other press keeps its default action. That covers a prevented or refused hide, a static backdrop, a trigger that takes no focus, and a press while the panel slides out.

**The surface.**
- `IsolationInterface` gains `readonly trigger: HTMLElement | undefined`: the element destruction returns focus to, which is the `trigger` option, or else the HTML element focused at construction. The press is its first consumer.
- `holdsFocus(element): boolean` is exported from `helpers.ts` and proved there. It replaces this unit's `readFocusedElement`, which has no consumer. The objective lane cautions that a shadow host reads as focused while its tree holds focus. The helper's cases pin that, and the press reads a host's focus correctly for a fallback trigger.

**The limits the guide states.** Both come from the planner.
- **Under reduced motion,** the hide completes in the microtasks after the listener. So a focus move that a `hidden.vn.offcanvas` listener makes after the press's read is undone by a default action the press did not cancel.
- **A fallback trigger that is a shadow host** is the isolation's limit, and J-ISOLATION-SHADOW owns it.

**The unit.** Round 5, `units/j-oracle-fix-offcanvas-brief-5.md`, run by `opus` on Opus 5.5 and audited cross-engine.
- It runs the planner's probe first: the root read and `:focus` around the hide, across the round-4 placements, the guard rows, and the new rows.
- It owns the `Isolation` getter. J-RELEASE-PRIMITIVES, which owns `Isolation.ts` next, is not yet dispatched, so this unit lands first.

VERDICT: PASS (the rule is chosen; the unit's first probe must confirm it)

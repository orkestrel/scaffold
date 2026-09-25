# J-ORACLE-FIX-OFFCANVAS round 3 — the Orchestrator's ruling (2026-09-25)

**Subject.** Veneer `43fa73d` on `unit/oracle-fix-offcanvas` over `dcff520`. The report is `units/j-oracle-fix-offcanvas-report-3.md`, with its probes `units/j-oracle-fix-offcanvas-3-residual-probe.sh` and `-3-residual-probe.log.txt`.

**What the round found.** The deepest-focused-element comparison closes round 2's residual input: the residual case reads red at `dcff520` and green after, and every gate passes. The writer then probed two further inputs. Both reach the documented surface, and both escape any comparison of focus state:
- **A closed shadow root that the panel carries,** holding the trigger and the focused element. No reader sees into a closed root, so the press keeps its default action, and focus ends on `body`.
- **A panel inside a shadow root, with focus on a light-tree element outside that root.** `Isolation` does not make that element inert (J-ISOLATION-SHADOW). The panel's root reads no focused element before or after the hide.

The writer did not write the brief's "without a limit" prose, because it would be false. It stated both misses instead. That is a correct stop under the deviation contract.

**The seam budget.** This is the third round at one seam: detecting that the hide moved focus.
- Round 1 compared the document's `activeElement`.
- Round 2 compared the panel's root's.
- Round 3 compares the deepest one.

Each round moved the comparison one boundary down, and the next boundary still hid the move. The recurrence has a direction, and its source is the method: comparing focus state is bound by every scope a root can hide. `.claude/rules/quality.md` § Rounds and verdicts calls for switching the strategy, not a fourth scope.

**The ruling: observe the move, not the state.**
- `focusin` is a composed event, so a focus move at any depth, closed shadow roots included, dispatches a `focusin` that reaches the panel's document, retargeted to the visible host.
- Round 4 listens for `focusin` on the panel's document, in the capture phase, only for the duration of the synchronous `void this.hide()`. It cancels the press's default action when one fired. It stores nothing past the call.
- The round measures the event first, in every placement the three rounds found: the light tree, one open shadow level, two open levels, a closed root the panel carries, and a panel inside a shadow root with an outside trigger.

**`readFocusedElement` is removed in round 4.** With the event mechanism, the press no longer reads focus state, so the helper would have no consumer. AGENTS.md § Minimal public API adds a capability with its first real consumer. J-ISOLATION-SHADOW, which needs a deep focus read for `Isolation`'s trigger fallback, adds it again from `43fa73d` when it runs. This finding is recorded against J-ISOLATION-SHADOW.

**Successor.** Round 4, `units/j-oracle-fix-offcanvas-brief-4.md`. It is audited cross-engine, and its audit covers rounds 3 and 4 together.

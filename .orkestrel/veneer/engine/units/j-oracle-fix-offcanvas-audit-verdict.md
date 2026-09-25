# J-ORACLE-FIX-OFFCANVAS round 1 — audit verdict (2026-09-25)

**Subject.** Veneer `eaf3908` on `unit/oracle-fix-offcanvas` over `63eabbd`. The claims are `units/j-oracle-fix-offcanvas-audit-claims.md`, and the Orchestrator's replay is `units/j-oracle-fix-offcanvas-replay-1.log.txt`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra (`units/j-oracle-fix-offcanvas-audit-objective-verdict.md`): `VERDICT: FAIL 7,9`. Opus 5.5 wrote the round, so this lane is the cross-engine auditor.
- **Subjective:** `reviewer` on Opus 5.5 (`units/j-oracle-fix-offcanvas-audit-reviewer-verdict.md`): `VERDICT: FAIL 7`. It ruled claims 1, 2, 3, 7, and 8.
- **Checker:** not run. The replay reads every mutation's error class and the census mechanically.

**Rulings.**
- **Claims 1 to 6 and 8: CONFIRMED** by both lanes where both ruled. The replay shows:
  - whole-file green on Offcanvas, Isolation, and Modal;
  - every mutation, and the `63eabbd` base, reddening its named case by an `AssertionError` and no other error class;
  - the census reading 66 departures, every one an `inert` row, with none on focus;
  - a clean tree.
- **Claim 9: FAIL** (objective lane, from source). The press compares the document's `activeElement`, which is retargeted to a shadow host. When the panel and its trigger sit in the same shadow root, the isolation's focus return changes only the shadow root's `activeElement`. The press then keeps its default action, and focus moves to `body`. The input reaches the documented surface: `new Offcanvas(panel)`, then `show(button)`, then a backdrop press. The Orchestrator checked the citations: `Offcanvas.ts` `#press` compares `this.#host.ownerDocument.activeElement`, and `Isolation.destroy` focuses the recorded trigger. Reading the active element from `this.#host.getRootNode()` detects the move in all four placements the lane tabulated.
- **Claim 7: FAIL.** Both lanes name the same two false sentences, and the objective lane adds a third that claim 9 makes false:
  - `guides/veneer.md`'s Bootstrap-difference bullet ("A backdrop press that hides the panel therefore cancels…") is false for a trigger that takes no focus. The guard's own `unfocusable` row pins that.
  - `Offcanvas.ts`'s `#press` comment credits Bootstrap's panel with the focus return, where Bootstrap's data API makes it.
  - The class TSDoc and § Offcanvas promise cancellation "whenever the hide moves focus". That holds only after claim 9's fix.
- **Accepted from the subjective lane:** the `#press` comment's ambiguous `it`, the guard case's title, which uses "the press" in two senses, and the test comment "The window hears the press".

**Outside the claims.** `Isolation` stops its walk at a shadow boundary. When a panel sits directly in a shadow root, an element outside that root gets no `inert` claim (objective lane, from source, not executed). This predates the unit, and it is not the focus fix. It goes to a new unit, J-ISOLATION-SHADOW, serialized after J-RELEASE-PRIMITIVES, which owns `Isolation.ts` first. That unit first rules whether a panel inside a shadow root is a supported host, because the guide requires only "an HTMLElement in the current realm". Then it repairs the walk, or states the limit.

**Successor.** Round 2 (`units/j-oracle-fix-offcanvas-brief-2.md`) carries claim 9's fix with a red-first same-shadow-root case, and the claim-7 prose fixes, including the subjective lane's three accepted items.

VERDICT: FAIL 7,9

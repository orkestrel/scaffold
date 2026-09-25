# J-RELEASE-RECORD round 1 — the Orchestrator's verdict (2026-09-25)

**Subject.** Veneer `a1041bd` on `unit/release-record` over `b8c6a08`, on the claims in `units/j-release-record-audit-claims.md`:
- `fdb19cb` is the unit's work;
- `a1041bd` is the integration of its report-only `tests/setupBrowser.ts` patch.

**Lanes.** Both ran blind on that one claims file.
- **Objective:** `analyst` on GPT-6 Astra (`units/j-release-record-audit-objective-verdict.md`; journal `scaffold/tmp/codex/j-release-record-audit.jsonl`, session `01a0d7f5-a6c3-70e2-b577-7eb578c44b3f`). VERDICT: FAIL 5.
- **Subjective:** `reviewer` on Opus 5.5 (`units/j-release-record-audit-subjective-verdict.md`). VERDICT: FAIL 5.

Opus 5.5 wrote the unit, so the Astra lane is the cross-engine auditor. The lanes agree on every claim they both ruled. Their citations resolve at `a1041bd`. The take-time read sits at `src/browser/Tab.ts:219-225`, before `outgoing.blur()` around line 242. Bootstrap's `_deactivate` blurs, then reads the dropdown in `_toggleDropDown` (`node_modules/bootstrap/js/src/tab.js`, around lines 136, 148, and 229).

## Rulings

| Claim | Ruling |
| --- | --- |
| 1. `recordHostWrite` | CONFIRMED by both lanes. Obligation 2 carries the unproved priority half. |
| 2. No call-start save, no direct host write | CONFIRMED (Astra's search of the five engines). |
| 3. The agreement tokens | CONFIRMED by both lanes. Writing the token back would undo the host's takeover (E22, E24). |
| 4. Tab's planned attributes | CONFIRMED (Astra). |
| 5. Tab's selection at the take | **FAIL**, from both lanes. The read's only cause was S4 T2 I1: the call-start save and the write read the dropdown set at different times. The snapshot now records each write as it happens, so that cause is gone. With the re-read restored, the destroy witness stays green, and only the case that pins the departure fails (replay). No rule requires the take-time read. It is a Bootstrap departure with no defect behind it. The brief's mutation row "Tab's re-read after the blur restored" anticipated the take-time read, and that framing was the Orchestrator's error. |
| 6. The split writes | CONFIRMED for order and presence: every split write has a door (Astra, by line). Obligation 3 carries the binding: the reviewer found a case that fails without its door only for Carousel's outgoing removal. |
| 7. The witnesses bind | CONFIRMED (Astra; replay). Obligation 1 carries the Tab destroy witness, which reads green under the post-blur re-read because it asserts nothing after `show()`. |
| 8. The mutations bind | CONFIRMED (Astra; replay). Obligation 1 retires the Tab re-read row. |
| 9. The `DROPDOWN_WRITE_BACKS` row | CONFIRMED by both lanes. The old row is unreachable under the change-aware write, and the show row keeps its rule. |
| 10. The rewritten cases | CONFIRMED by both lanes. No assertion was weakened. |
| 11. Scope and no legacy | CONFIRMED by both lanes. |

**Outside the claims.** Astra derives from source that a nested `Toast.destroy()` inside a restoration reaction returns before the pending `show` restoration. That is S5's whole-method latch. E35 already gives it to J-RELEASE-SIGNALS (unit 6), so it is carried there with Astra's input and not reopened here.

**The optional simplification** (the reviewer: `Carousel`'s door helper could default `marks` to `[]`). The writer may take it in round 2. It is no obligation.

## Round 2 obligations

1. **Restore Bootstrap's read order in Tab.** Adopt the subjective lane's D1 prescription verbatim:
   - read `this.#selection(outgoing, false)` where the deselection loop runs, after the previous pane's writes;
   - read `this.#selection(host, true)` where the selection loop runs, after the host's `active` write;
   - leave the role reads where `b8c6a08` read them;
   - replace the case that pins the take-time read with one asserting Bootstrap's result: after `show()`, the wrapper that a blur listener gave the `dropdown` token reads `aria-expanded="false"`;
   - add that after-show assertion to the destroy witness, before `destroy()`, so the witness proves a real restoration;
   - the mutation for S4 T2 I1 becomes `recordHostWrite` writing through `writeHostValue`, which must redden the destroy witness.

   The sentences that describe the take-time read, in Tab's class TSDoc and the guide's § Tab, go false with this change, so the unit rewrites them.
2. **Prove the priority half of claim 1.** The case whose write matches an inline property's value but not its priority adds `snapshot.restore()`, and asserts that the value and the `important` priority are written back. Bypassing the snapshot must redden it.
3. **Bind each door after a split write.** For each split pair, a case has a reaction to the pair's first write destroy the engine, and asserts that the second write never lands. The pairs:
   - Collapse's host tokens in show and in hide;
   - Toast's shown and transition tokens in show and in hide;
   - Tab's previous-pane `active` and `shown`;
   - Carousel's incoming direction and order, and its outgoing active and order.

   A case may cover several pairs of one engine. Removing each door must redden a case by an assertion. A door that no input can reach is reported with the reason rather than given a case.

**How it closes.** Obligations 1 and 2 adopt the lanes' prescriptions verbatim, so the Orchestrator's mutation replay closes them. Obligation 3 adds proofs the lanes did not prescribe case by case. It closes when the Orchestrator's replay reads each door's removal red, followed by one objective-lane check of those cases alone.

VERDICT: FAIL 5

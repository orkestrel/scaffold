# J-SNAPSHOT-SHARED round 3 — reconciled verdict (2026-09-25)

**Subject.** Veneer `43637c1` on `unit/snapshot-shared`, over round 2's `e3167f7`. The claims are in `units/j-snapshot-shared-audit-claims-3.md`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra, which ran (thread `01a0d615-fc74-7172-b0d8-ae5a4eb19c9c`, `units/j-snapshot-shared-audit-3-objective-verdict.md`). It is an engine that did not write the round.
- **Subjective (not run):** round 3 changes no public name or shape. It changes `HostSnapshot`'s private entry shape, the private `#folds` method, and one error code, `SCROLL_LOCK_BODY_MISSING`, which follows the `SCROLL_LOCK_OPTION_INVALID` pattern beside it. The Orchestrator's diff read carries the one shape finding, the inline `{ target, key }` shape, to J-HOLDERS (`plan.md` § Carried findings).
- **Checker (not run):** the round's mechanical criteria, scope and greenfield, are claim 9, which the objective lane confirmed from the commit comparison.

**The Orchestrator's readings.**
- The scoped gates at `43637c1`: `units/j-snapshot-shared-gates-3.log.txt`.
- The mutation replay: `units/j-snapshot-shared-mutations-3-orchestrator.log.txt`, 30 rows killed, the control held, and every source restored.
- The cause replay: `units/j-snapshot-shared-causes-3-orchestrator.log.txt`, `tools/causes.py`. All 30 kills are assertion failures, and none was caused by a broken plant.
- The red reading: `units/j-snapshot-shared-red-3-orchestrator.log.txt`, `tools/red-snapshot-shared-3.sh`. Round 2's sources read 5 failed and 90 passed, each failure an assertion.
- The landing gates on the merge with Veneer `main` `6d27028`: `tools/w2-land-2c-snapshot-shared.log.txt`, every gate green.

## Per claim

| Claim | Ruling | Basis |
| --- | --- | --- |
| 1. The key is fixed at the save | CONFIRMED | Objective lane |
| 2. The folding reading is the platform's | CONFIRMED | Objective lane, over five document kinds |
| 3. The write back names the attribute the save read | CONFIRMED within one document | Objective lane. The XML-to-HTML move (A1) is ruled a stated limit by E30 |
| 4. Placement reads before it writes | FAIL on a form host only; ruled outside the contract | The eager reads hold. The failure needs a form control named `removeAttribute`, which E30 puts outside the engine contract |
| 5. A body-less first lock holds nothing | CONFIRMED | Objective lane |
| 6. ColorMode puts the root back | FAIL on a form host only; ruled outside the contract | The ordinary cleanup holds. The failure needs a form control named `removeAttribute` (E30) |
| 7. The C1 search is complete | FAIL on a form host only; ruled outside the contract | Every witness (Swipe, Isolation, Delegate) needs a form control shadowing a DOM member (E30). The lane's class table finds no other acquisition without release |
| 8. The proofs bind | CONFIRMED | Objective lane, over the retained logs |
| 9. Greenfield and scope | CONFIRMED | Objective lane |

## Findings outside the claims

- **A1 (XML-to-HTML adoption).** Ruled a stated limit by E30. J-ROWS carries the guide sentence.
- **A2 (`save` publishes before a presence read that a form control shadows).** This is the same class, outside the contract by E30.
- **Proof gaps the lane named on confirmed claims.** No `ScrollLock` case supplies a signal, so none distinguishes the removal of the abort listener. The ColorMode persist case uses a root with no theme attribute and checks the error's message, so it distinguishes neither the restoration of a present value nor the error's identity. These cases are carried to J-HOLDERS, which owns `ScrollLock`, with `ColorMode.test.ts` granted beside it.

## Ruling

Round 3 closes. Every failed claim fails only on the input class E30 rules outside the engine contract, and every in-contract claim is confirmed. The unit lands.

VERDICT: PASS (claims 4, 6, and 7 ruled outside the contract by E30)

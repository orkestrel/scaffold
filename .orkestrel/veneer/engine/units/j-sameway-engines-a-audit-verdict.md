# J-SAMEWAY-ENGINES-A round 1 — reconciled verdict (2026-09-25)

**Subject.** Veneer `9019d81` and the integration `7511b82` on `unit/engines-a`, over `8bc940d`. The claims are in `units/j-sameway-engines-a-audit-claims.md`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra (thread `01a0d683-b0bc-7a51-b7fc-2cd1d3f53aaf`, `units/j-sameway-engines-a-audit-objective-verdict.md`). It confirmed claims 1, 3, 6, and 8 and failed 2, 4, 5, and 7.
- **Checker:** `checker` on Sonnet (`units/j-sameway-engines-a-audit-checker-verdict.md`). It matched every A4 row to the source and named one write no row lists: Toast's `#arm()` in a completed show.
- **Subjective (not run):** the unit changes no public name or shape. Its `@returns` sentences are the writer's, and claim 7's truth is the objective lane's.

**The Orchestrator's readings.**
- The scoped gates at `7511b82`: `tools/w2-gates-scoped-engines-a-1.log`, with 996 passed.
- The red reading: `units/j-sameway-engines-a-red-orchestrator.log.txt`. There are 36 failed on `8bc940d`'s four sources, every one an `AssertionError`.
- The mutation replay: `units/j-sameway-engines-a-mutations-orchestrator.log.txt`. There are 32 rows, every kill is an assertion, `BOOM` and `UNBOUND` are refused, and the control holds.
- The held landing gates on the merge with `0865c67`: `tools/w2-land-2c-engines-a.log.txt`, every gate green, with 1002 passed.

## Reconciliation

Claims 2, 4, 5, and 7 fail on one cause: a return entry that does not describe the change the call made to its target.
- Tab records dropdown entries for writes that changed nothing.
- Tab's forward-order return undoes a shared dropdown's restoration.
- Carousel's completion removes a pre-existing order or direction token with no entry.

These are in-contract inputs. So round 2 closes them by one invariant rather than three fixes: a returning step restores each target the call changed to the value it held before the call's first write to it, records nothing for a write that changed nothing, and restores in reverse order. The checker's Toast `#arm()` omission is a completed show's write, which takes no returning step. Round 2's table names it.

## Ruling

Round 2 (`units/j-sameway-engines-a-brief-2.md`) applies the invariant to the four engines, with the lane's witnesses read red first.

VERDICT: FAIL 2, 4, 5, 7

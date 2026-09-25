# J-SAMEWAY round 3 (J-INTEGRATION round 6) — reconciled verdict (2026-09-25)

**Subject.** Veneer `e557bfe` on `unit/integration`, over round 2's `dc838aa`. The claims are in `units/j-sameway-audit-claims-3.md`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra, which ran (thread `01a0d62d-e8b3-75c3-8cbe-3ef57d500836`, `units/j-sameway-audit-3-objective-verdict.md`). It is an engine that did not write the round.
- **Checker:** `checker` on Sonnet, which ran (`units/j-sameway-audit-3-checker-verdict.md`). It matched every row of the writer's D1 table to the source, found no unnamed write, and confirmed claim 7.
- **Subjective (not run):** the round changes no public name and no public shape. The returning steps' private entry lists gain `connection` and `token`, which the checker matched to the source.

**The Orchestrator's readings.**
- The scoped gates at `e557bfe`: `units/j-integration-gates-6.log.txt`, with `test:src:browser` 926 passed.
- The red reading: `units/j-sameway-red-3-orchestrator.log.txt`, `tools/replay-sameway-3.sh`. The four added cases fail on `dc838aa`'s sources, each through an assertion.
- The mutation replay: `units/j-sameway-mutations-3-orchestrator.log.txt`. There are 60 rows. All 57 killed rows fail through an assertion, the D2 plant is refused as a `ReferenceError`, and both controls hold.
- The landing gates on the merge with Veneer `main` `6dd5034`: `tools/w2-land-2c-integration.log.txt`. Every gate is green, including `test:app` (222) and `test:journey` (252).

## Per claim

| Claim | Ruling | Basis |
| --- | --- | --- |
| 1. Every write has its entry | FAIL on out-of-contract input only; ruled outside the contract | The checker and the objective lane agree that every write is enumerated. The lane's two mismatches need either a host outside a connected document or a consumer that removes the engine's backdrop, which the E24 amendment of 2026-09-25 rules outside the contract |
| 2. The lane's witness closes | CONFIRMED | Objective lane, both engines |
| 3. A stopped show returns only its own backdrop writes | FAIL on out-of-contract input only; ruled outside the contract | The failing input is an Offcanvas host inside a detached element |
| 4. A stopped hide returns only its own backdrop writes | FAIL on out-of-contract input only; ruled outside the contract | The failing input is a consumer removing the shown backdrop element |
| 5. Each backdrop return reads the call | CONFIRMED | Objective lane |
| 6. The proofs bind | CONFIRMED | Objective lane, over the retained logs |
| 7. Greenfield and scope | CONFIRMED | Objective lane and checker |

## The writer's rulings

- **The host's insertion into the body is kept, not returned.** The objective lane confirms that the guide requires this.
- **Offcanvas's removal of a leftover `showing` token is not returned.** The lane confirms that returning it would not restore the settled state.

Both stand.

## Carried

The guide sentence stating that the backdrop is the engine's own element, and that an overlay host is in a connected document, goes beside E30's limits. J-ROWS carries it (`plan.md` § Carried findings).

## Ruling

Round 3 closes. Every failed claim fails only on input the E24 amendment rules outside the contract, and every in-contract claim is confirmed. J-INTEGRATION and J-SAMEWAY land together.

VERDICT: PASS (claims 1, 3, and 4 ruled outside the contract by the E24 amendment of 2026-09-25)

# J-HOLDERS round 2 — reconciled verdict (2026-09-25)

**Subject.** Veneer `88f15c7` and the integration patch `ada50f4` on `unit/holders`, over the merge `806717d`. The claims are in `units/j-holders-audit-claims-2.md`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra (thread `01a0d674-8294-7423-84e4-de2984d081b1`, `units/j-holders-audit-2-objective-verdict.md`). It confirmed claims 3 and 5 and failed 1, 2, and 4.
- **Checker:** `checker` on Sonnet (`units/j-holders-audit-2-checker-verdict.md`). It confirmed that the reviewer's five prescriptions are applied word for word.
- **Subjective (not run):** round 2's prose is the subjective lane's own round-1 prescription, which the checker verified, and the round changes no name or shape.

**The Orchestrator's readings.**
- The scoped gates at `ada50f4`: `tools/w2-gates-scoped-holders-2.log`, with 980 passed.
- The red reading: `units/j-holders-red-2-orchestrator.log.txt`. The six changed readings fail on `806717d`'s `HostSnapshot.ts`, each through an assertion. The uncaught `DOMTokenList.toggle` error in that log is the deliberate throw of the case "withdraws a shared target when the last holder restoration throws inside a reaction". It prints in every browser run since at least `6dd5034`.
- The mutation replay: `units/j-holders-mutations-2-orchestrator.log.txt`. Every kill is an assertion, `BOOM` is refused, and the control holds.
- The landing gates with the fast-forward held, on the merge with Veneer `main` `14fe489` (E-ID-FLOW-2): `tools/w2-land-2c-holders.log.txt`, every gate green.

## Reconciliation

- **Claim 1, the whole-attribute path: ruled E13's overlapping-target limit.** The lane's input has one snapshot save the whole `class` attribute beside a token in it, while another snapshot holds the token. The whole-attribute record's last holder then writes the attribute back over the token's presence. No engine saves a whole `class` or `style` attribute: `git grep` over `src/browser` at `ada50f4` finds no `category: 'attribute'` save with either name. The attribute record follows its own rule, and a whole attribute saved beside its tokens or properties is the overlapping target E13 names. J-ROWS carries the guide sentence that states it. The presence paths themselves obey P1, and the lane traced every order of two and three holders.
- **Claim 2, the clear-ending composition: an accepted consequence.** When `clear()` is the presence record's final departure, it writes nothing, by E25's definition of `clear()`. So a Button destroyed inside a successful Alert close leaves `class=""` on the alert's element. Alert's successful close is `clear()`'s only engine caller, and it removes the element from the document, so the difference is on a detached element.
- **Claim 4, the instrument's held reading: the rule is tightened.** The instrument reads a passed case as held when the file run has a failed sibling case and an unhandled error. The recorded kills are assertion kills and stand. The standing rule in `plan.md` § Landing procedure now requires the whole file run to report success, with no failed case and no unhandled error, before a passed case reads held. Every later instrument carries that.
- **Outside the claims.** The ScrollLock body-replacement behaviour is already ruled outside the contract in round 1's verdict.

## Ruling

J-HOLDERS closes. Round 1's H1 to H5 and round 2's P1 to P3 hold within the contract, and the rulings are on the record. It lands.

VERDICT: PASS (claims 1, 2, and 4 closed by the rulings above)

# Audit verdict — UTIL-DISPLAY (`ud`), round 3 (the mechanical fix round)

Subject: the round-3 claims in `ud-audit-3-claims.md` over the worktree `/home/user/veneer-ud`, `ud-3.diff`, `ud-3-status.txt`, `ud-shared-3.patch`, `b-utilities-ud-report-3.md`, and `ud-instruments-3/`. The unit was written by `builder` on Sonnet from a fully specified brief; the round ran the objective lane and the checker, no subjective lane (recorded here as the round's own reason: the brief fixed every shape and name).

## Lanes

| Lane | Role and engine | Verdict file | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst` on GPT-6 Astra (`codex-queue-19.sh`) | `ud-audit-3-objective-verdict.md` | `FAIL 1, 4, 6, 7; outside the claims: R-counts` |
| Checker | `checker` on Sonnet | `ud-audit-3-checker-verdict.md` | `PASS` |

## Reconciliation

1. **Delta and scope: CONFIRMED, the missing log settled.** Both lanes confirm the file sets, the round-to-round confinement, and the index bases; the objective lane ran the apply check (exit 0). The reverse-application reading the report described had no retained log; the Orchestrator reproduced it in a fresh extract of `e4e6a40` (`ud-audit-3-settling.txt`: forward apply exit 0, reverse apply exit 0, the tree equal to the base after reversal, fifteen index lines for fifteen headers).
2. **The label loop: CONFIRMED.** `label-trailing-bare` reddens on the exact-text assertion with the class preserved; every earlier mutation agrees with round 2 after the declared title change.
3. **The `families` matrix: CONFIRMED** in both lanes; the freeze assertions distinguish an unfrozen table, entry, or properties list.
4. **The binding case's prefixes: CONFIRMED on the code; the claim's derivation clause corrected.** The implementation returns the captured family prefix (`flex` for `.flex-row-reverse`), which is right, because a last-hyphen split would conflict with the table's compound value keys; the claim's description of a last-segment split was wrong and is corrected here. Every setup control, `flex-prefix-omitted` included, reddens the binding case alone.
5. **The TSDoc, the count, and the title: CONFIRMED.**
6. **The gates: CONFIRMED; one attribution corrected.** Every gate log reads exit 0 with the stated result. The `110 passed` reading belongs to the whole `tests/setupStyles.test.ts` file (the control runs it without a filter), not to the binding case alone; the claim's and the report's wording are corrected here.
7. **Law and report: BROKEN, record-only.** The code-law checks hold. The report writes `below`, `now`, `new`, and `etc.`, bare and possessive tokens, and a collision narrative without retained output; the mutation digests and the final results support the no-content-effect ruling. Counts (the objective lane's list): record-only.

## Ruling

The code claims hold in both lanes. UTIL-DISPLAY round 3 is accepted for landing on the session branch after the ACCORDION and PROOF-RESOLVER push: `ud-resolve.py`, `land-seams.py`, the `CaptureStem` type change as the recorded pending shared change, the regeneration, and the chain.

VERDICT: PASS (claims 1, 4, and 6 settled or corrected in this verdict; claim 7 record-only)

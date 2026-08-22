# Audit U8 reconciliation

Sol's verdict is `audit-u8-verdict.md`: FAIL — 3 broken, 0 unresolved, 0 not-evidenced,
0 findings outside the claims. The Orchestrator reconciled on 2026-08-21. The broken
findings collapse to one prose defect and one ruling-wording correction; the mechanism, the
comments, and the contract docs are CONFIRMED.

- **Claim 2 — accepted as a narrowing, no code change.** The ruling on the withdrawn
  latency pin overclaimed: U8's measurement refutes a second full `drain` interval, not
  every timing difference — event-loop work between the read-end destruction and the host
  `close` delivery delays the unfixed path where the fixed shared promise has already
  settled. The record now claims only "no second full drain interval". The pin's removal
  itself is validated: no residue remains in the suite.
- **Claims 4 and 6 — one defect, accepted and fixed.** The rewritten guide paragraph's
  closing clause said a child still running never meets the bound, which
  `guides/process.md:382-384` and `src/core/types.ts:130-132` both contradict: an
  unconfirmed termination reaches the cutoff while the child still runs. The Orchestrator
  replaced the clause with Sol's prescribed sentence — "The cutoff ends observation; it
  does not terminate the child." — keeping the true every-ending-reaches-the-bound clause.
  Verification, mechanical: `oxfmt --check guides/process.md` exit 0; the corrected
  paragraph read beside `:382-384` and found in agreement; `test:guides` exit 0,
  `99 passed | 2 skipped`.
- **Closure ruling.** The fix adopts the auditing engine's own prescribed sentence
  verbatim, so a further Sol round would audit Sol's own words; the mechanical
  verification above closes it. Recorded here rather than run as a third round.

The audit chain for process 0.0.6 terminal work is closed: U7 (`unit-u7-report.md`,
verdict `audit-u7-verdict.md`, reconciliation `audit-u7-reconciliation.md`), U8
(`unit-u8-report.md`, verdict `audit-u8-verdict.md`, this file). Remaining before commit:
the independent verifier's authoritative gate run.

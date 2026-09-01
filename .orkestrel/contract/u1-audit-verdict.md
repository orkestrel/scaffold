# U1 audit — round 1 verdict and reconciliation (2026-09-01)

Subject: U1 packed-array fast path (tree over 3193da1; brief `u1-packed-brief.md`, report `u1-packed-report.md`, audit brief `u1-audit-brief.md`). Lanes: subjective (`reviewer`, Opus 5) and objective (Opus 5 through the `reviewer` role file, substituting the excluded Sol `analyst`), blind, read-only, immutable returns in `u1-audit-subjective.md` and `u1-audit-objective.md`. `checker` did not run this round (the mechanical criteria were carried by the Orchestrator's own records); `verifier` runs after the fix round.

## Lane terminal lines

- Subjective: `VERDICT: FAIL — 2 broken, 0 unresolved, 0 not-evidenced, 3 findings outside the claims`
- Objective: `VERDICT: FAIL — 1 broken, 0 unresolved, 0 not-evidenced, 1 finding outside the claims`

## Reconciliation (reproduced before ruling)

| Item | Ruling | Evidence and carrier |
| --- | --- | --- |
| Claim 3 (both lanes BROKEN) | Brief defect, not a code defect. The direct copy is taken by every population that is exactly canonical, which includes array-like objects, a throwing-`get` proxy over a plain target, and the disowning proxy; each answers identically to 0.0.15 (hostile record identical, parity IDENTICAL). | Successor brief restates the claim by the predicate the code applies. No code change. |
| Claim 11 (subjective BROKEN: `above`/`below` in two added comments) | Confirmed by reading `constants.ts:220,239`. | Both lines sit in the table block that U1f deletes; U1f sweeps its own added prose for the banned words. |
| F1 (subjective): the table's contribution was never isolated | Measured: U1 vs U1 with the ternary replaced by `INTRINSICS.text(position)` reads, in 6 processes, is-medium 0.996, is-deep 0.992, is-list48 0.992 (max 0.994), audit-list48 1.001 (`multi-table-contribution.out`). The table buys nothing measurable (V8 caches small-integer-to-string conversions). | U1f deletes `INDEX_TEXTS`, its TSDoc, its guide row, and the ternary; the comparison reads `INTRINSICS.text(position)`; the `canonical` flag and its two blocks collapse into one predicate. Prescription adopted verbatim. |
| Objective finding: `"sideEffects": false` made false by module-evaluation statements | Confirmed: `dist/src/core/index.js:243-244` carry a top-level `for` and a bare `freeze` call detached from the declaration. | Closed by the same deletion: no module-evaluation statement remains. |
| F2 (subjective): disowning pin asserts only `success === false`, last index only | Confirmed by reading `helpers.test.ts:789-802`. | U1f asserts the exact message `Array index views disagree` and adds the first-index case. Prescription adopted verbatim. |
| F3 (subjective): table assertions ride in a differently named test; the added five-member parity test restates the pre-existing three-member one | Confirmed by reading. | The table test is deleted with the table; U1f deletes the restating parity test and keeps the extra-key, symbol-key, and disowning cases. |
| Claim 9 note (both lanes): "are sorted numerically" now describes an operation the direct copy does not perform | Weakened, not false. | U1f tightens the guide clause to "arrive in ascending order, or are sorted numerically" while it removes the `INDEX_TEXTS` clause from the same row. |
| Referral: `Reflect.ownKeys` order for plain arrays | Both lanes cite `OrdinaryOwnPropertyKeys`; the code verifies the order rather than assuming it. Closed. | none |
| Referral: gate evidence | Carried to the `verifier` run after U1f. | verifier dispatch |

## Ruling

Round 1 FAILS. Every finding has one carrier (U1f, or the successor audit brief for the claim-text defect). Because U1f adopts each lane's prescription verbatim, it closes with the Orchestrator's mutation probe and re-run evidence records plus a `checker` pass on the mechanical criteria, per `.claude/rules/quality.md` § Rounds and verdicts; the `verifier` gates follow.

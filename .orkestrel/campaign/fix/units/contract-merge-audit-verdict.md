# Audit verdict — unit contract-merge

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context; `verifier` on
Sonnet. Subject: merge commit `2c15840` (`units/contract-merge.diff`, `units/contract-merge-report.md`).

| Claim | Objective lane | Verifier | Orchestrator |
| --- | --- | --- | --- |
| 1 no conflict marker; every main change present (`ownPattern`, `pattern` on `buildStringFaults` at both leaves, the canonical fast path, refusal-only `readValue` diagnostics, main's tests) | CONFIRMED | — | stands |
| 2 every branch outcome survives (spines interned, `INTRINSICS.reflect`, renames, `limits`, `expansion`, the cloners' pattern) | CONFIRMED (zero hits for every old name with non-zero controls) | — | stands |
| 3 main's new code names no renamed symbol | CONFIRMED | — | stands |
| 4 the guide describes the merged tree; no count reintroduced (the branch's own counts also removed) | CONFIRMED | — | stands |
| 5 `package.json` and the lockfile untouched | CONFIRMED | — | stands |
| gates | NOT-EVIDENCED in the lane | GREEN at `2c15840` (1327 src, 111 policy, 46 config, 61 setup, 65 guides) | stands |

Finding outside the claims: the `buildStringFaults` guide row keeps a pre-existing count ("two
copies of the same twenty-one lines") on both sides of the merge → carried to the next contract
prose touch (the TSDoc wave, which runs last). Verdict: **PASS.** Merge base is `c13cfae`;
tarball `contract-2c15840.tgz` packed; contract's consumers re-stage it at the L2 boundary.

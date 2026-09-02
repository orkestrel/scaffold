# Audit verdict — unit breaking-html

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` and `verifier` on Sonnet. Subject: commit `1cec0f4` (`units/html.diff`,
`units/html-report.md`).

| Claim | Objective lane | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows | CONFIRMED | CONFIRMED | — | stands |
| 2 no old name; contracts in `types.ts` | CONFIRMED (tree-wide, README included) | CONFIRMED | — | stands |
| 3 ruled forms (HTML-prefixed types; doors deleted with rows and fence; fix-ups landed) | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | — | — | stands |
| 5 guide rows, fences, parity, executed assertion for the doctype carry | — | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | CONFIRMED | — | stands |
| 7 gates | — | quoted | GREEN (312 src, 111 policy, 46 config, 29 setup, 18 guides) | stands |
| 8 nothing hidden (the s08-04 test disposition disclosed and true: shapers.test.ts carries the proofs) | CONFIRMED | — | — | stands |

Finding outside the claims (objective lane), ruled and closed by the Orchestrator as a one-line
fix: `guides/README.md:23` named "compiled contracts" as a surface category with no referent
after the doors' deletion; the sentence now names the leaf shapes and the contracts a consumer
compiles from them (`format:check` 0, `test:guides` 0 on the Orchestrator's run). Import-order
residue at `HTML.ts:32-33` recorded for the next change.

Terminal lines: objective PASS; checker PASS; verifier GREEN. **Verdict: PASS.** The unit closes
**applied** for s08-01, s08-04, s08-09, and the audit carriers s08-02 and s08-06.

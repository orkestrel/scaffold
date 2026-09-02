# Audit verdict — unit breaking-ndjson

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` and `verifier` on Sonnet. Subject: commit `ead03a1` (`units/ndjson.diff`,
`units/ndjson-report.md`).

| Claim | Objective lane | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows (s18-03; s18-22 test-header carrier) | CONFIRMED | CONFIRMED | — | stands |
| 2 no old name in owned files; `clear()` in `types.ts` (survivors only in the vendored `guides/test.md` mirror and the vendored settings) | CONFIRMED | CONFIRMED | — | stands |
| 3 ruled form at every named guide site; the s18-22 rationale verified against the staged contract's `parseJSON` | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | — | — | stands |
| 5 guide rows, fences, README; parity list empty | — | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | CONFIRMED | — | stands |
| 7 gates | — | UNRESOLVED (no shell) | GREEN (263 tests) | stands |
| 8 nothing hidden (deviations carry expected/found/evidence; out-of-scope README defects disclosed) | CONFIRMED | — | — | stands |

Referrals, ruled and closed by the Orchestrator as one-line fixes: `README.md:50` linked
`guides/src/ndjson.md`, which does not exist → `guides/ndjson.md`; `README.md:20` stated
`Node.js >= 24` against `package.json`'s `>=22.12.0` → `>= 22.12` (`format:check` 0, `test:guides` 0).

Terminal lines: objective PASS; checker PASS on its claims; verifier GREEN. **Verdict: PASS.** The
unit closes **applied** for s18-03 and the s18-22 carrier.

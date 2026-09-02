# Audit verdict — unit breaking-sse

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` and `verifier` on Sonnet. Subject: commit `c6d84e1` (`units/sse.diff`,
`units/sse-report.md`).

| Claim | Objective lane | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows applied | CONFIRMED | CONFIRMED | — | stands |
| 2 no old name; contract in `types.ts` | CONFIRMED (only the vendored `guides/test.md` mirror carries `reset` in foreign senses) | CONFIRMED | — | stands |
| 3 ruled form (`clear()`; `#clear` private kept; `errors.ts` example lines moved) | CONFIRMED | — | — | stands |
| 4 no alias or shim (`dist` carries no `reset`) | CONFIRMED | — | — | stands |
| 5 guide rows, fences, executed assertions; no parity list | — | CONFIRMED | — | stands |
| 6 only owned files; `README.md` outside both lists | CONFIRMED as a scope observation: the README ships in `files` and its usage fence called the renamed method | CONFIRMED | — | `README.md` granted; every later brief owns the package README (template updated) |
| 7 gates | — | NOT-EVIDENCED by design | GREEN (311 tests) | stands |
| 8 nothing hidden | CONFIRMED (the `resets` → `rewinds` prose follow-up, the ledger's wrong `errors.ts:46` pointer, and the TSDoc scope decision are each disclosed) | — | — | stands |

Referral on the guide table's trimmed padding: settled by the verifier's `format:check` exit 0.

Terminal lines: objective PASS; checker PASS; verifier GREEN. **Verdict: PASS.** The unit closes
**applied** for s18-04.

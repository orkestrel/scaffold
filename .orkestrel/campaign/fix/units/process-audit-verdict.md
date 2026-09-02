# Audit verdict — unit breaking-process

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` and `verifier` on Sonnet. Subject: commit `93555dd` (`units/process.diff`,
`units/process-report.md`). The subjective lane did not run: one interface rename and one guide
section, below the wide-unit trigger.

| Claim | Objective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows (s13-15, s13-17) | CONFIRMED | CONFIRMED | — | stands |
| 2 no old name (`ProcessChild` gone; `ProcessChildInterface` in `types.ts:29`, barrelled; `dist` moved) | CONFIRMED | CONFIRMED | — | stands |
| 3 ruled form (`types.ts`, the Server contracts row, the `REFUSALS` parity list) | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | — | — | stands |
| 5 guide rows and prose moved; no `INTERNAL` entry for a published symbol | — | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | CONFIRMED | — | stands |
| 7 gates | UNRESOLVED (no shell) | CONFIRMED on the quoted commands | GREEN (skips are platform conditionals) | stands |
| 8 nothing hidden (the `#vocabulary` anchor resolves; the skipped guides case is `skipIf` on win32) | CONFIRMED | — | — | stands |

Findings outside the claims, ruled and closed by an Orchestrator edit `8aa5dce` (scoped gates:
`format:check` 0, `lint:check` 0, `check` 0, `test:guides` 102 passed, 1 platform skip): F1 the
rewritten criterion said the Node-side face declares its contracts while the module declares them
and the face needs them; F2 the `SupervisorFace` reason was a use site, not a constraint — the
guide paragraph and the module `@remarks` now say the module declares the contracts,
`ProcessChildInterface` names `NodeJS.Signals`, and `SupervisorFace` names no Node type but sits
with the face that constructs its only consumer, the Node-only `Supervisor` engine. F3 (the report
cites the Vocabulary table row's line for the heading) is a record nit, no change.

Terminal lines: objective PASS; checker PASS; verifier GREEN. **Verdict: PASS.** The unit closes
**applied** for both rows. Tip packed: `process-8aa5dce.tgz`.

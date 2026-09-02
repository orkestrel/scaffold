# Audit verdict — unit breaking-rater

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` and `verifier` on Sonnet. Subject: commit `458b787` (`units/rater.diff`,
`units/rater-report.md`), then the README fix at `350608e`. The subjective lane did not run: a
`build*` rename family and one member removal, below the wide-unit trigger.

| Claim | Objective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows (s17-05, s17-06, s17-08, the Carry ruling) | CONFIRMED | CONFIRMED | — | stands |
| 2 no old name; `LineResult` in `types.ts` | CONFIRMED | CONFIRMED | — | stands |
| 3 ruled form (`build*` names, `LineResult.success` gone, `RatingResult.success` kept, `isRecord` and the reason `create*` adoption) | CONFIRMED | CONFIRMED | — | stands |
| 4 no alias or shim | CONFIRMED | — | — | stands |
| 5 guide rows, `INTERNAL` empty, executed assertions on `worksheet.success` | — | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | CONFIRMED | — | stands |
| 7 gates | UNRESOLVED (no shell) | CONFIRMED on the quoted commands | GREEN (320 tests) | stands |
| 8 nothing hidden | CONFIRMED | — | — | stands |

Findings and their closure: F1 (the report's observation that a class-instance subject "now meets
`MISMATCH`") — settled from the primary source: `@orkestrel/reason` declared
`export const isSubject: Guard<Readonly<Record<string, unknown>>> = isRecord` at
`src/core/validators.ts:259` of commit `a42bd0f~1`, the tree the published `0.0.8` came from, so
the swap to `isRecord` changed the identity and not the narrowing, and no consumer's outcome moved;
the report's observation is false and downstream units read this verdict, not the report, for the
package's breaking surface. F5 (the `README.md` link to `guides/src/rater.md`) — closed by the
Orchestrator's direct one-line edit, landed at `350608e` with the full chain green
(`instruments/land-fixup.mjs`, log `land-fixup.log`). F2 (the `Worksheet` guide row never says the
line's outcome lives on it), F3 (`lineDefinition`, `ratingDefinition`, `worksheetStep`,
`worksheetSteps` assemble composites without the `build*` prefix), and F4 (the `npx vite-node`
fetch, no tree effect) are recorded for the next change.

Terminal lines: objective PASS; checker PASS; verifier GREEN. **Verdict: PASS.** The unit closes
**applied** for every row. Tip packed: `rater-350608e.tgz`.

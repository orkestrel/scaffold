<!-- task a83743eb1e771e5ba.output -->
## Checker verdict — breaking-rater

**Claim 1 — every row applied/refused/stopped, refusals quote rule text.** CONFIRMED.
Report `## Rows` (rater-report.md:6-9) marks all three assigned rows applied: s17-05, s17-06, s17-08. No row is refused, so the refusal-quote requirement is vacuous. The brief's "Carry" instruction (rater-brief.md:36) — reason `create{Entity}` constructors and `isSubject` removal at `Rater.ts` — is also completed: diff shows `isSubject` import replaced by `isRecord` (rater.diff:258-278) and `createCheck`/`createFactorGroup`/`createFieldFactor`/`createLookupFactor`/`createStaticFactor`/`createQuantitativeDefinition`/`createLogicalDefinition` adopted across `tests/setup.ts`, `tests/src/core/Rater.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts` (rater.diff:722-738, 826-837, 1078-1086, 1300-1301).

**Claim 2 — no old name survives under `src`/`tests`/`guides`; new published contract symbols in `types.ts`.** CONFIRMED.
Word-boundary and case-insensitive inflected grep for `worksheetFactor(s)`, `worksheetGroup(s)`, `resultsWorksheet(s)`, `ratedLine(s)`, `evidenceCheck(s|ed|ing)`, `checkEvidence(s|d|ing)` over `/home/user/fleet/rater` (excluding `node_modules`) returns only hits for the retained `WorksheetFactor`/`WorksheetGroup` type names, their `isWorksheetFactor`/`isWorksheetGroup` guards, and the new `buildWorksheetFactor`/`buildWorksheetGroup` names — no old lowercase-first-letter helper name survives. `LineResult.success` is removed from `src/core/types.ts` (rater.diff:619-625), the sole contract-level change; the new helpers (`buildEvidence`, `buildEvidenceRows`, `buildWorksheetFactor`, `buildWorksheetGroup`, `buildWorksheet`, `buildLineResult`) are functions, not contract members, so no `types.ts` declaration is owed for them.

**Claim 3 — ruled forms applied exactly.** CONFIRMED.
`buildWorksheetFactor`, `buildWorksheetGroup`, `buildWorksheet`, `buildLineResult`, `buildEvidence`, `buildEvidenceRows` (rater.diff:433,468,534,570,368,399) exactly match the ruling list in rater-brief.md:34. `LineResult.success` removed and `RatingResult.success` retained per rater-brief.md:35 (rater.diff:619-635). Carry ruling applied per claim 1 evidence.

**Claim 5 — guide/example parity, `INTERNAL` list, executed assertion for behavior prose.** CONFIRMED.
`guides/rater.md` Helpers table, fences, and `@example` blocks moved atomically with the renames (rater.diff:118-234). `LineResult`/`RatingResult` guide rows read through `worksheet.success` (rater.diff:68-71). The parity list `INTERNAL` in `tests/guides.test.ts:38` is `Object.freeze([])`, untouched by this diff and not invalidated by it. The behavior-prose claim (the derived `worksheet.success`) carries an executed assertion, not a substring check: `tests/src/core/Rater.test.ts` asserts `line.worksheet.success` and `result.success` directly (rater.diff:864-981) rather than checking guide text for a string.

**Claim 6 — scope honesty.** CONFIRMED.
`rater.status` lists only `README.md`, `guides/rater.md`, `src/core/Rater.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `src/core/validators.ts`, `tests/setup.test.ts`, `tests/setup.ts`, `tests/src/core/Rater.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`. Nothing under `.claude/`, `configs/`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `package.json`, `package-lock.json`, or a vendored guide mirror appears.

**Claim 7 — gate commands exit as reported.** CONFIRMED (quoted evidence, not independently re-run).
`rater-report.md:54-58` quotes each command with its exact exit code: `npm run format:check` → exit 0; `npm run lint:check` → exit 0; `npm run check` → exit 0; `npm run build` → exit 0; `npm test` → exit 0 (with per-suite pass counts). Per the brief's own escape clause (rater-brief.md:32) and this lane's instruction, quoting the exact command and exit code for every gate lifts the default NOT-EVIDENCED. This checker has no shell and did not re-execute the chain; the `verifier` lane owns the authoritative re-run.

PASS

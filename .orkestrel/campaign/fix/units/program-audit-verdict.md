# Audit verdict — unit breaking-program

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` and `verifier` on Sonnet. Subject: commit `f0c1ae8` (`units/program.diff`,
`units/program-report.md`, `units/program-report.json`), then the fix-up at `7ef860d`
(`units/program-fixup-brief.md`, `units/program-fixup-report.md`, `units/program-fixup.diff`,
`units/program-fixup.status`). The subjective lane did not run: a `build*` rename family and one
helper removal, below the wide-unit trigger.

| Claim | Objective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows (s15-22, s15-23, the qualifier, rater, and reason carry) | CONFIRMED | CONFIRMED | — | stands |
| 2 no old name; functions only, no `types.ts` contract owed | CONFIRMED | CONFIRMED | — | stands |
| 3 ruled form (`build*` in place, `structuredClone` at the one caller, no `cloners.ts`) | CONFIRMED | CONFIRMED | — | stands |
| 4 no alias or shim | CONFIRMED | — | — | stands |
| 5 guide rows and fences; `INTERNAL` empty; executed assertion for the copy behavior | — | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | CONFIRMED | — | stands |
| 7 gates | — | CONFIRMED as quoted | GREEN (216 src; policy 111; config 46; setup 78; guides 23) | stands |
| 8 nothing hidden | CONFIRMED (F2 on one observation) | — | — | closed by the fix-up |

Findings and their closure: F1 (the `buildProgramDefinition` remark claimed it never aliases its
inputs while only `metadata` is deep-copied) — closed by the fix-up: the remark states what is
copied, what is shared, and that the `Program` constructor snapshots and seals the graph. F2 (the
report said the test import lists kept their pre-existing order while the rename unsorted four)
— closed by the fix-up: every test import list is alphabetical. F3 (a runtime-off-type
`metadata` now raises a raw `DataCloneError` where the deleted helper returned it unchanged) —
accepted as a tightening; a uniform error surface with `Program`'s `ProgramError('DEFINITION')`
wrap is a successor question. The `buildNotice` / `buildNotices` pair is a naming successor row
(the plural returns `Determination[]`), not a correctness defect. The s15-23 behavior difference
is recorded with its measurement (structuredClone clones the cycle the deleted recursion
overflowed on; a 200000-level tree still throws; the typed API admits no cycle). The vendored
`guides/qualifier.md` and `guides/reason.md` mirrors refresh at the re-pin.

The fix-up (`builder` on Sonnet) landed at `7ef860d` with the full chain green
(`instruments/land-fixup.mjs`, log `land-fixup.log`).

Terminal lines: objective PASS; checker PASS; verifier GREEN. **Verdict: PASS.** The unit closes
**applied** for every row. Tip packed: `program-7ef860d.tgz`.

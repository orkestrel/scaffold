# Audit verdict — unit breaking-brief

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` and `verifier` on Sonnet. Subject: commit `3b94bdb` (`units/brief.diff`,
`units/brief-report.md` with the Orchestrator's corrections, `units/brief-report.json`), then the
fix-up at `bc0f767` (`units/brief-fixup-brief.md`, `units/brief-fixup-report.md`,
`units/brief-fixup.diff`, `units/brief-fixup.status`). The subjective lane did not run: one tally
rename, one refused signature row, and the upstream carries, below the wide-unit trigger.

| Claim | Objective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows (s13-28 applied, s13-30 refused, the s13-20 carrier, the interpret and reason carries) | BROKEN (the refusal's rule citation does not reach the row) | CONFIRMED | — | the refusal stands as an Orchestrator engineering ruling on its two verified grounds; recorded in the report |
| 2 no old name; `count` and `RecordOptions` in `types.ts` | BROKEN (the vendored `guides/interpret.md` mirror is stale) | CONFIRMED | — | criterion 1 narrowed to the hand-authored files; the mirror refreshes at the re-pin |
| 3 ruled form | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | — | — | stands |
| 5 guide rows; no `INTERNAL` list; executed assertion for the absent-axis refusal | — | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | CONFIRMED | — | stands |
| 7 gates | — | CONFIRMED as quoted | GREEN (283 src; policy 111; config 46; setup 27; guides 18) | stands |
| 8 nothing hidden | BROKEN (the sweep observation named no pattern or paths and the mirror collision was not filed as a deviation) | — | — | closed by the report corrections |

Findings and their closure: F1 (the guide kept the tallies the carrier's six sites deleted at
other sites) — closed by the fix-up: every count over a set in `guides/brief.md` is gone or its
members named, with each kept hit recorded as a value or a fixed pair. F2 (one three-line comment
repeated at four stubs in `tests/setup.ts`) — closed by the fix-up: stated once. R2 (the
`result` parameter fills `Example.output`, a synonym pair) — a successor naming row; the s13-30
refusal stands because a positional parameter rename binds no caller and `output` shadows the
module's own export. R3 (the baseline `format:check` claim) — confirmed by the Orchestrator:
`oxfmt --check` on `3b94bdb~1:tests/guides.test.ts` reports format issues, so the reflow rode in
the unit as disclosed. The adoption red the unit read first (`npm run check`, fourteen `size`
diagnostics, then the interpret and reason renames) is recorded in the report with the
red-then-green for the absent-axis guard.

The fix-up (`builder` on Sonnet) landed at `bc0f767` with the full chain green
(`instruments/land-fixup.mjs`, log `land-fixup.log`).

Terminal lines: objective `FAIL 1, 2, 8` — closed by the ruling record, the criterion scoping,
and the report corrections; checker PASS; verifier GREEN. **Verdict: PASS.** The unit closes
**applied** for s13-28, the carrier, and the carries, and **refused** for s13-30 on the
Orchestrator's engineering grounds. Tip packed: `brief-bc0f767.tgz`.

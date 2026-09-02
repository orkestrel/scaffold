# Audit verdict — unit breaking-sea

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` and `verifier` on Sonnet. Subject: commit `62b6f40` (`units/sea.diff`,
`units/sea-report.md`). The subjective lane did not run: four renames and one carrier, below
the wide-unit trigger.

| Claim | Objective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows (s12-03, s12-05, s12-07, s12-17, the ProcessChildInterface carrier) | CONFIRMED | CONFIRMED | — | stands |
| 2 no old name; `ELFNoteHeader` and `SEACompressionHandler` in `types.ts` | CONFIRMED | CONFIRMED | — | stands |
| 3 ruled form (`readPEOffset`, `executeShell`, the declared `ELFNoteHeader` with `total`, `SEACompressionHandler`; no adoption owed) | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | — | — | stands |
| 5 guide rows and fences moved; `INTERNAL` empty | — | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | CONFIRMED | — | stands |
| 7 gates | UNRESOLVED (no shell) | NOT-EVIDENCED by construction | GREEN (386 tests) | stands |
| 8 nothing hidden | CONFIRMED | — | — | stands |

The requested finding: the `entryTotal` → `total` rename and the declared type reach every reader
in the injector with the note-area arithmetic byte-identical. No fix-up.

Recorded for the next change: `readPEOffset` returns the sentinel `0` on a short read where the
`read*` contract returns or throws (pre-existing; `isPEExecutable` stays correct today); the
vendored `guides/process.md` mirror refreshes after process publishes; `ELFNoteHeader` names the
header half of a type whose `total` spans the whole padded entry (a naming question); the
injector's local alias rename `noteEntryTotal` → `noteTotal` was required for atomicity and is
recorded.

Terminal lines: objective PASS; checker PASS; verifier GREEN. **Verdict: PASS.** The unit closes
**applied** for every row. Tip packed: `sea-62b6f40.tgz`.

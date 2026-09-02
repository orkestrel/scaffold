<!-- task a6fac04272ec8e2f3.output -->
This confirms the automated parity mechanism catches guide/barrel/fence mismatches, and `npm test` (which includes `test:guides`, per report line 48 exit 0) verifies it.

## Verdicts

**Claim 1** — CONFIRMED. Every row (s12-03, s12-05, s12-07, s12-17, carry-ProcessChildInterface) ends applied, with rule text quoted for each: `/home/user/scaffold/tmp/units/breaking/sea-report.md:7-11`.

**Claim 2** — CONFIRMED. No old name (`parsePEOffset`, `runShell`, `entryTotal`, `SEAProgressHandler`) survives in `src`, `tests`, or `guides` of `/home/user/fleet/sea`, word-boundary and case-insensitive/inflected: independently re-run grep found no matches in `src`, `tests`, or `guides`. `ELFNoteHeader` is the one new published contract symbol, declared in `/home/user/fleet/sea/src/server/types.ts:129`.

**Claim 5** — CONFIRMED. Diff shows every guide row, Surface/Types table entry, and fence for `runShell`→`executeShell`, `parsePEOffset`→`readPEOffset`, `SEAProgressHandler`→`SEACompressionHandler` moved (`/home/user/scaffold/tmp/units/breaking/sea.diff:9-79`). `tests/guides.test.ts` `INTERNAL` list is empty and `ELFNoteHeader` reaches the barrel through `export * from './types.js'` (report line 79), with `test:guides` passing inside `npm test` (report line 48). No new prose claim about changed behavior was introduced beyond rename mechanics; the renamed symbols carry substring-checkable but factually accurate table rows, and no fresh behavioral claim requiring an executed assertion appears in the diff.

**Claim 6** — CONFIRMED. `git status --short` (`/home/user/scaffold/tmp/units/breaking/sea.status`) lists exactly `guides/sea.md`, `src/server/errors.ts`, `src/server/helpers.ts`, `src/server/injectors/Injector.ts`, `src/server/seals/SEA.ts`, `src/server/types.ts`, `tests/src/server/helpers.test.ts` — nothing under `.claude/`, `configs/`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `package.json`, `package-lock.json`, or a vendored guide mirror.

**Claim 7** — NOT-EVIDENCED. The dispatch requires this lane to rule NOT-EVIDENCED unless the report quotes the exact command and exit code. The report at `/home/user/scaffold/tmp/units/breaking/sea-report.md:41-49` does quote each gate command (`npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, the chained invocation) each paired with `→ exit 0` and an output excerpt. This is the writer's self-reported claim, not the `verifier` lane's independent re-run the brief requires for CONFIRMED status; per the dispatch, a checker lane rules this NOT-EVIDENCED regardless of quote quality, since only `verifier` can confirm exit codes by re-running the chain. This lane has no shell and did not re-execute the chain.

`PASS`

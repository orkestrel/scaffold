# J-ORACLE-RECORD audit — the checker job

## Role and engine

`grok` on Cursor Grok holds the `checker` job: read-only and in ask mode. Perform the assignment directly and spawn nothing. You read files and run no command. Paths are relative to `C:/Users/mikes/WebstormProjects/`.

## Read first

- `scaffold/.orkestrel/veneer/engine/units/j-oracle-record-audit-claims.md`, the claims.
- `scaffold/AGENTS.md`.

## The subject

- `scaffold/.orkestrel/veneer/engine/units/j-oracle-record.diff` and `j-oracle-record-status.txt`.
- The worktree copies under `veneer/tmp/worktrees/oracle-record/`, committed as `9ea360d` with a clean status: `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`, and `tests/fixtures/oracle/`.
- The report `scaffold/.orkestrel/veneer/engine/units/j-oracle-record-report.md`.
- The census readings `scaffold/.orkestrel/veneer/engine/units/j-oracle-record-census/departures.json`.
- The replay `scaffold/.orkestrel/veneer/engine/units/j-oracle-record-replay.log.txt`.

## Your claims

Rule claims 8 and 10 only.
- **Claim 8:** list the changed paths in the status file. Confirm that `scanOracleObligation` and `isProofFile` do not appear in the diff's changed lines, and that no `guides/` path changed. Confirm that each exported name the diff adds to `setupServer.ts` appears in `setupServer.test.ts`'s export list.
- **Claim 10:** compare the report's census table with `departures.json` row by row. Name every row that one has and the other lacks, or that differs in plugin, element, facet, name, or value.

## Output

Give a per-claim ruling: CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.

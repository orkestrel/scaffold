## Per-claim verdicts

- Claim 1 — `CONFIRMED`: All condition waits are inside cleanup `try` blocks; relevant `finally` blocks destroy the process, conditionally kill held descendants, and contain no assertions. Evidence: `tests/src/server/processes/Supervisor.test.ts:47-48,78-99,131-156,192-194,229-231`; `tests/src/server/processes/Process.test.ts:561-565,767-771,886-900,928-943,1004-1021,1037-1058,1100-1114,1138-1156,1191-1228,1290-1313,1374-1423`.
- Claim 2 — `NOT HELD`.
- Claim 3 — `CONFIRMED`: The helper case uses `timeout: 60_000` for its sequential condition and stop bounds; the guide cases use `timeout: 20_000` with the required comment. Evidence: `tests/src/server/helpers.test.ts:608-654`; `tests/guides.test.ts:1299-1337`.
- Claim 4 — `NOT HELD`.
- Claim 5 — `CONFIRMED`: The before capture has the planted failure without `CLEANUP-MARKER`; the after capture has the same failure with `CLEANUP-MARKER: about to destroy`. The current search finds `planted` only in excluded `tests/policy.test.ts:543` and no cleanup marker. Evidence: `/home/user/work/evidence/process-proofs/row1-before-plant.log`; `/home/user/work/evidence/process-proofs/row1-after-plant.log`; `process-tests-report.md:44-66`.
- Claim 6 — `NOT HELD`.
- Claim 7 — `CONFIRMED`: Status lists only the four named test files, and the diff contains only those files with no `src/**` hunk. Evidence: `/home/user/work/evidence/conform-process.status:1-4`; `/home/user/work/evidence/conform-process.diff:1-300`.
- Claim 8 — `NOT HELD`.
- Claim 9 — `CONFIRMED`: Added lines contain no prohibited residue; the report matches the diff changes and discloses `npx oxfmt --config .oxfmtrc.json tests/guides.test.ts`. Evidence: `/home/user/work/evidence/conform-process.diff:1-300`; `/home/user/scaffold/tmp/units/followon/process-tests-report.md:91-135`.

## Findings outside the claims

None.

## Referrals

None.

## Claims attacked and held

Claims 1, 3, 5, 7, and 9.

VERDICT: PASS

## Journal

Left for the driver.

## Deviation

None.
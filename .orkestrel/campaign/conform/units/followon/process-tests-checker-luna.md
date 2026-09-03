## Per-claim verdicts

1. `REFUTED` — `Process.test.ts:886-905`, `927-969`, and `1002-1019` contain condition waits whose `finally` blocks do not destroy the primary child.

2. `not held`

3. `CONFIRMED` — `helpers.test.ts:608-650` gives the case a `60_000` ms timeout against `40_000` ms of budgets; `guides.test.ts:1299-1323` has both timeout options and the required comment.

4. `not held`

5. `REFUTED` — The captures support the failure and cleanup marker behavior, but `tests/policy.test.ts:543` contains `planted`, so the prescribed literal grep is not clean.

6. `not held`

7. `CONFIRMED` — `conform-process.status:1-4` lists only the scoped files, and `conform-process.diff` contains no other hunk or `src/**` change.

8. `not held`

9. `REFUTED` — `guides.test.ts:1299-1301` and `1318-1320` add semantic reason comments as well as the timeout options; the diff does not show formatting and timeout options only. The report does disclose the formatter command at `process-tests-report.md:126-129`.

## Findings outside the claims

none

## Referrals

- Claim 1 cleanup gaps: driver.
- Claim 5 literal grep mismatch: driver.
- Claim 9 report and diff mismatch: driver.

## Claims attacked and held

- Claim 3: checked the condition and `stopChild` budgets against the case timeout and compared both guide cases with the `Supervisor.test.ts` reason comment.
- Claim 7: compared the status evidence with the actual scoped diff.

VERDICT: FAIL 1, 5, 9; outside the claims: none

## Journal

Left for the driver.

## Deviation

No unexpected tree change beyond the scoped uncommitted files.
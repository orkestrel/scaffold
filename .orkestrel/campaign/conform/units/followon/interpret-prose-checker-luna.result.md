## Per-claim verdicts

- Claim 1 — `CONFIRMED`. Evidence: `tests/guides.test.ts:414-433`; `guides/interpret.md:367-416`; `src/core/Interpret.ts:47-51`; requested sweeps found no banned terms.
- Claim 2 — `not held`.
- Claim 3 — `CONFIRMED`. All requested sweeps returned no banned-sense matches in the specified paths.
- Claim 4 — `not held`.
- Claim 5 — `CONFIRMED`. `tests/guides.test.ts:414-433` executes `scoreTemplate` and asserts `1`; no stale sentence guard appears. Guide-only diff changes are at `/home/user/work/evidence/conform-interpret.diff:22-149`.
- Claim 6 — `not held`.
- Claim 7 — `CONFIRMED`. `/home/user/work/evidence/conform-interpret.status:1-18` lists only permitted paths; source hunks in `/home/user/work/evidence/conform-interpret.diff:151-224` change comments or documentation only.
- Claim 8 — `not held`.
- Claim 9 — `REFUTED`. Added lines contain no forbidden residue, and the report discloses the formatter command, but the report states counts at `/home/user/scaffold/tmp/units/followon/interpret-prose-report.md:47`, `:98`, and `:153`.

## Findings outside the claims

None.

## Referrals

Driver: revise the report prose to remove set counts before acceptance.

## Claims attacked and held

Claims 1, 3, 5, and 7 held after direct sweeps and diff inspection.

VERDICT: FAIL 9; outside the claims: none

## Journal

Leave for the driver.

## Deviation

None.
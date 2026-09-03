## Per-claim verdicts

1. `REFUTED` — `src/core/factories.ts:774` uses lowercase `default`, not the required `Default: \`value\`.` form used at `src/core/types.ts:230-231` and `src/core/constants.ts:47`.
2. `NOT HELD`
3. `CONFIRMED` — Sweeps found only permitted out-of-scope or fixed-quantity hits.
4. `NOT HELD`
5. `CONFIRMED` — No stale guards occur in `tests/guides.test.ts`; guide changes match the allowed prose edits and table re-padding.
6. `NOT HELD`
7. `CONFIRMED` — `conform-reason.status` and `conform-reason.diff` contain only owned paths; no `src/core/types.ts` hunk exists.
8. `NOT HELD`
9. `CONFIRMED` — The setup diff changes only the header and `simplest` sentence; the correction, unauthorized formatter command, and guide reflow are disclosed.

## Findings outside the claims

None.

## Referrals

- Carry the `src/core/factories.ts:774` wording defect to a successor fix for Row 1.

## Claims attacked and held

Claims 3, 5, 7, and 9.

VERDICT: FAIL 1; outside the claims: none

## Journal

Leave for the driver.

## Deviation

None observed.
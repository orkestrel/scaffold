## Per-claim verdicts

1. `CONFIRMED` — All prescribed replacements appear at the report’s named sites: `guides/form.md:41,91,449,824,971,1275,1513,1695,1710`, `src/core/types.ts:109`, `tests/setup.test.ts:104`, and `tests/src/core/helpers.test.ts:242`.

2. `not held`

3. `CONFIRMED` — The sweeps found no banned-sense count in Owned files. Remaining hits are singular references, fixed arity, literal measurements, or numeric relationships. The directional sweep found permitted numeric uses at `guides/form.md:824` and `tests/setup.test.ts:326`; `src/**` had no hits.

4. `not held`

5. `REFUTED` — `guides/form.md:91` is a changed row in the `## Surface` table. No changed sentence is quoted by a presence guard in `tests/guides.test.ts`, and the method tables are unchanged.

6. `not held`

7. `CONFIRMED` — `conform-form.status` lists only `guides/form.md`, `src/core/types.ts`, `tests/setup.test.ts`, and `tests/src/core/helpers.test.ts`. The diff has hunks only in those paths.

8. `not held`

9. `CONFIRMED` — Added lines contain no TODO, deferred row, skipped test, or debug residue. The report matches the diff hunks, records `npx oxfmt --config .oxfmtrc.json guides/form.md`, and the formatting-only changes affect table padding.

## Findings outside the claims

- `O-TESTS-GUIDE-DIRECTIONAL`: `tests/guides.test.ts:2,91,244,246` retains document-position uses of `above` or `below`.
- `O-POLICY-DIRECTIONAL`: `tests/policy.test.ts:544` retains a document-position use of `above`.
- `tests/setupPolicy.ts:2098` uses `below` for filesystem hierarchy, which is permitted.

## Referrals

Refer `O-TESTS-GUIDE-DIRECTIONAL` to the guide-test owner and `O-POLICY-DIRECTIONAL` to the policy-test owner. Claims 2, 4, 6, and 8 remain unheld by this lane.

## Claims attacked and held

- Claim 1: searched every old and new phrase, then read each changed site.
- Claim 3: reran the case-insensitive directional and number-word sweeps over the named paths and classified every hit.
- Claim 7: compared the status entries and diff path headers with the Owned list.
- Claim 9: compared every report row with the diff and inspected added lines for prohibited residue.

VERDICT: FAIL 5; outside the claims: O-TESTS-GUIDE-DIRECTIONAL, O-POLICY-DIRECTIONAL

## Journal

## Deviation

None.
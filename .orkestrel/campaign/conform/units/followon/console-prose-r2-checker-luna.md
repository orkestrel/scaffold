I’m applying the brief as a read-only checker audit. I’ll inspect the required contract and falsification guidance, then verify each named claim against the current tree and evidence.## Per-claim verdicts

1. **CONFIRMED** — README wording, published examples, error remark, extracted helpers, imports, and fix-round sites match the brief. Evidence: `README.md:4`, `README.md:68`, `README.md:84`, `src/core/factories.ts:120`, `src/browser/factories.ts:52`, `tests/setup.ts:52`, `tests/setup.ts:63`, `tests/setupServer.ts:103`, `tests/src/core/Spinner.test.ts:315`, `tests/src/core/Progress.test.ts:205`.

2. **NOT HELD**.

3. **CONFIRMED** — The substitution sweep over `README.md`, `src/**`, and `tests/**` found no banned prose senses. Remaining hits are permitted: `Date.now()` and `performance.now()` at `src/core/types.ts:282`, `src/core/types.ts:820`, `src/server/types.ts:126`, `src/server/ProcessCapture.ts:252`, `src/core/Capture.ts:166`, `src/core/loggers/Logger.ts:142`, and the corresponding test sites; literal test data at `tests/src/core/Reporter.test.ts:354` and `tests/src/core/loggers/Logger.test.ts:164`.

4. **NOT HELD**.

5. **CONFIRMED** — No stale changed sentence or retitled case appears in `tests/guides.test.ts` or `guides/console.md`. The evidence diff contains no guide or guide-test hunk; Surface and Methods sections remain unchanged.

6. **NOT HELD**.

7. **CONFIRMED** — `conform-console.status` lists only `README.md`, `src/**`, and non-vendored `tests/**`. The diff has no index-file hunk and no path outside that scope. Fix-round hunks change only comments, fence comments, or case titles.

8. **NOT HELD**.

9. **CONFIRMED** — Added lines contain no TODO, deferred row, skipped test, `.only`, or debug residue. `createStubWriter` and `createOverloadProbe` preserve their captured state and have dedicated tests. The report’s rows and fix-round sites correspond to the evidence diff.

## Findings outside the claims

None.

## Referrals

None.

## Claims attacked and held

- Claim 1 — checked each named README, source, test, helper, import, and fix-round site.
- Claim 3 — reran the case-insensitive substitution sweep and classified every match.
- Claim 5 — searched for stale prose and verified the diff excludes guide tables and Surface rows.
- Claim 7 — checked the supplied status and diff path headers.
- Claim 9 — checked added-line residue and matched helper/report content to the diff.

VERDICT: PASS

## Journal

Left for the driver.

## Deviation

None.
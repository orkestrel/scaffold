## Per-claim verdicts

1. **CONFIRMED** — Factory doc blocks use `Default:`; listed test prose is updated; manager names are present (`src/core/factories.ts:81-1133`, `guides/reason.md:52-126`, `tests/setup.ts:3,159-165`).

2. **NOT HELD**.

3. **CONFIRMED** — Sweeps are clean in owned files. Remaining `defaults to` hits are the excluded/out-of-scope test prose and `src/core/factories.ts:519`; `tests/src/core/operators/Transformer.test.ts:190` is a permitted fixed fixture length.

4. **NOT HELD**.

5. **REFUTED** — Non-default prose changed in the Surface row and method table: `guides/reason.md:387` and `guides/reason.md:552`. The stale-guard search was clean, but the untouched-surface claim is false.

6. **NOT HELD**.

7. **CONFIRMED** — Status and diff names contain only the permitted paths (`/home/user/work/evidence/conform-reason.status:1-10`); `git diff --numstat -- src/core/types.ts` is empty.

8. **NOT HELD**.

9. **REFUTED** — The diff changes `tests/setup.ts:164`, while the report says the test `@param` sites were left unchanged (`reason-prose-report.md:46`). The added-line residue search found only permitted uses of “skipped”; no TODO, skipped test, `.only`, or debug residue.

## Findings outside the claims

None. The module comment, out-of-scope test defaults, excluded `setupBrowser` references, and fixed fixture length were recorded as permitted or excluded hits.

## Referrals

- Claim 5: driver must reconcile the claim with the required sweep-driven guide edits.
- Claim 9: driver must reconcile the report against the `tests/setup.ts:164` diff hunk.

## Claims attacked and held

- Claim 1 — factory, guide, setup, tally, and listed test sites were checked.
- Claim 3 — all named sweeps were rerun and every hit was ruled by scope or sense.
- Claim 7 — status, changed paths, and the `types.ts` diff were checked.

VERDICT: FAIL 5, 9; outside the claims: none

## Journal

Driver-owned.

## Deviation

None.
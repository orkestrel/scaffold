## Per-claim verdicts

1. `REFUTED` — `markdown-sanitizer-report.md:107-109` names `sanitizer-read-2.txt`, but that file is absent. The current `sanitizer-read-2.ts` also does not reproduce the fence input.
2. `NOT HELD`
3. `CONFIRMED` — `tests/guides.test.ts:692-718`; red and green captures exist, and the planted values are absent.
4. `NOT HELD`
5. `REFUTED` — `guides/markdown.md:430-432` makes broader claims than the output shown at `guides/markdown.md:447-452`, including refusals for schemes and attributes not exercised by the fence.
6. `NOT HELD`
7. `CONFIRMED` — `conform-markdown.status:1-2`, `conform-markdown.diff:1-70`, and the sanitizer read scripts at line 1 import built `dist` output.
8. `NOT HELD`
9. `REFUTED` — `markdown-sanitizer-report.md:107-110` references the missing reading capture, and `markdown-sanitizer-report.md:169` contains the authored count “gained two cases.” The report also uses “one” and “both” as authored counts at `markdown-sanitizer-report.md:106-110`.

## Findings outside the claims

None.

## Referrals

- Claim 1 and claim 9: restore or recapture the missing `sanitizer-read-2.txt` evidence and correct the report.
- Claim 5: narrow the sanitizer prose to the fence evidence or extend the fence to exercise each remaining claim.
- Claim 9: remove authored counts from the report.

## Claims attacked and held

- Claim 3: the planted refused-image value failed the red control, the corrected value passed the green run, and the sweep found no planted value.
- Claim 7: the status and diff remain scoped to `guides/markdown.md` and `tests/guides.test.ts`; the read scripts use built output.

VERDICT: FAIL 1, 5, 9; outside the claims: none

## Journal

Left for the driver.

## Deviation

None.
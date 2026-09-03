## Per-claim verdicts

1. **CONFIRMED** — `guides/markdown.md:432-449` and `sanitizer-read.txt:1` match byte-for-byte. The fence imports only `@orkestrel/markdown`.

2. **not held**

3. **CONFIRMED** — `tests/guides.test.ts:692-715` executes and guards the fence. The control fails with `BOGUS` at `sanitizer-control-red.txt:6-12`; the green run passes at `sanitizer-green.txt:6`. The `BOGUS` sweep over `tests/**` and `guides/**` is empty.

4. **not held**

5. **REFUTED** — The fence shows escaped paragraph text and no script subtree at `guides/markdown.md:446-449`, but the prose claims whole unsafe-subtree removal. The fence also does not exercise the sentence: “A refused image keeps its element and its alt text and loses only the destination.” (`guides/markdown.md:432`)

6. **not held**

7. **CONFIRMED** — The status lists only the two changed paths (`conform-markdown.status:1-2`). The diff has hunks only in those files (`conform-markdown.diff:1-62`). The reading script imports built output and only logs the result (`sanitizer-read.ts:1,11-14`).

8. **not held**

9. **REFUTED** — The added lines contain no prohibited residue, and the evidence matches the files. The report violates its no-count requirement with: “`tests/guides.test.ts` § `flagship fences` gained two cases: one executing the fence's code and asserting the transcribed value with `toBe`, and one presence guard reading the transcribed fence lines back out of `guideText`...” (`markdown-sanitizer-report.md:45-46`)

## Findings outside the claims

None.

## Referrals

- Driver: revise or narrow the sanitizer prose so the fence directly supports unsafe-subtree removal and refused-image behavior.
- Driver: remove count wording from the report's prose while retaining test-run measurements.

## Claims attacked and held

Attacked: claims 1, 3, 5, 7, and 9.  
Held: claims 1, 3, and 7.

VERDICT: FAIL 5, 9; outside the claims: none

## Journal

Leave for the driver.

## Deviation

None.
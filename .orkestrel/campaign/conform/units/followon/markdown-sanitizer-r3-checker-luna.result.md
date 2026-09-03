I’m applying the brief’s checker/falsification contract and will keep the audit read-only.## Per-claim verdicts

1. **CONFIRMED** — `guides/markdown.md:436-449` and `sanitizer-read-3.txt:1` match; the fence imports only `@orkestrel/markdown`.

2. **not held**

3. **CONFIRMED** — `tests/guides.test.ts:692-725` executes and guards the fence. The red control fails, the green capture passes, and the prohibited-value sweep over `tests/**` and `guides/**` returns no matches.

4. **not held**

5. **REFUTED** — `guides/markdown.md:430-432` still claims facts the fence does not show, including the exact allowlist widening, `URL_ATTRIBUTES` membership, and unconditional hand-built-node behavior. The refused-image sentence is shown at `guides/markdown.md:446-449`.

6. **not held**

7. **CONFIRMED** — `conform-markdown.status:1-2` lists only the two changed files. `conform-markdown.diff:1-70` contains no other hunk or `src/**` change. The proof scripts import built `dist` output and contain no source writes.

8. **not held**

9. **REFUTED** — The report still states authored counts at `markdown-sanitizer-report.md:214`, `:236`, and `:250`. Its prose-change sections at `:125-134` and `:240-252` paraphrase changes instead of recording the required old and new text.

## Findings outside the claims

None.

## Referrals

- Orchestrator: narrow the unsupported sentences in `guides/markdown.md:430-432`, or extend the fence with evidence for each remaining claim.
- Orchestrator: remove authored counts from the report and record literal old and new prose for each reported change.

## Claims attacked and held

- Claim 1: compared the fence comment with `sanitizer-read-3.txt`.
- Claim 3: inspected the red and green captures and ran the prohibited-value sweep.
- Claim 7: inspected the status, diff, and all proof scripts.

VERDICT: FAIL 5, 9; outside the claims: none

## Journal

Leave for the driver.

## Deviation

None.
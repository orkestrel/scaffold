## Per-claim verdicts

1. CONFIRMED — Target comments use `following`, `later`, or `earlier`; no positional `above` or `below` remains.
2. not held
3. CONFIRMED — The sweep found only permitted numeric-comparison uses and excluded vendored references.
4. not held
5. CONFIRMED — The assertion title exists at `tests/guides.test.ts:80`; no changed comment is quoted elsewhere.
6. not held
7. CONFIRMED — Status and diff contain only the named files, with comment-only hunks.
8. not held
9. REFUTED — The report states counts at `middleware-prose-report.md:89`, `:95`, `:102-106`.

## Findings outside the claims

none

## Referrals

Claim 9 — revise the report to remove count statements before acceptance.

## Claims attacked and held

- Claim 1 — Searched the target comments for positional wording. `one-class-per-file` and `single consumer` describe ownership facts, not document positions.
- Claim 3 — Re-ran the case-insensitive `\b(above|below)\b` sweep and classified every hit. Remaining non-excluded hits are numeric comparisons.
- Claim 5 — Searched for the exact assertion title and changed comment text. The title exists, and no snapshot or presence assertion quotes changed prose.
- Claim 7 — Compared live status and diff evidence. Every changed line is a comment.

VERDICT: FAIL 9; outside the claims: none

## Journal

left for the driver

## Deviation

none
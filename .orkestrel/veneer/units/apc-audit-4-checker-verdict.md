# Audit round 4 — AP-COLOR (`apc`): checker verdict

## Claim verdicts

**1. Scope.**
- Status match: `apc-4-status.txt` lists the same 15 files as `apc-3-status.txt` (both list `guides/veneer.md`, `src/styles/_tokens.scss`, `src/styles/components/_button.scss`, `src/styles/utilities/_color.scss`, `src/styles/utilities/_link.scss`, `tests/setup.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`, and the seven modified test files). CONFIRMED.
- Edited test vs. round-3 copy: `apc-instruments-4/apc-4-round3-delta.txt:1-8` shows exactly two changed lines (247, 339), both title strings; my own line-by-line read of `apc-instruments-4/apc-4-round3-color.test.ts.txt` against the current `tests/src/styles/utilities/color.test.ts` (as rendered in `apc-4.diff`) confirms no assertion, import, or comment line differs outside those two titles. CONFIRMED.
- `apc-4.diff` vs. `apc-3.diff`: `apc-instruments-4/apc-4-round3-check.txt:1` states every file but `color.test.ts` equals its round-3 diff; comparing `apc-4.diff:1-380` against the `color.test.ts` section of `apc-3.diff` (lines ~459-969) by hand, the only differences are the two title lines at K1 (`apc-4.diff:257` vs. `apc-3.diff:715`) and K2 (`apc-4.diff:349` vs. `apc-3.diff:807`). CONFIRMED.
- Gate logs as observations, landing chain authoritative: this sub-clause restates the review-evidence norm rather than asserting a fact I can falsify against a site; I have no evidence contradicting it. CONFIRMED.

**2. K1.** Title (`apc-4.diff:257`): "moves a role color and its emphasis class to the tier of a fill or body text retuned at the scope declaring the %s theme." Scoped to the checker's assigned lenses — count law, banned-term rows, token-noun rule: no stated count, no row-table term present, no backticked token requiring a noun. CONFIRMED on those three lenses. Whether the title's coverage of "and its emphasis class" across both the fill-retune and body-text-retune branches (`apc-4.diff:270-282`) exactly matches what the assertions prove is a semantic-scope question the brief's objective statement does not route to the checker's method; that sub-question is UNRESOLVED here and belongs to the subjective/objective lanes.

**3. K2.** Title (`apc-4.diff:349`): "keeps each emphasis class outside the neutral roles opaque under an opacity step and fades its role class beside it, in %s mode." Same three lenses: no stated count, no banned-term row, no backticked token. CONFIRMED on those three lenses.

## Findings outside the claims

None found on the sites read: the status files, the two diffs, the report's gate table against its logs (`apc-instruments-4/apc-4-final-format-check.log.txt:10`, `apc-4-final-lint-check.log.txt:6`, `apc-4-final-check.log.txt:30`, `apc-4-final-test-src-styles.log.txt:8198-8203` all read exit 0 and 1456 passed/115 files, matching `ap-color-report-4.md:31-34` exactly).

## Counts the report states

- Gates: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:styles` (`ap-color-report-4.md:29-34`).
- Test result: 1456 passed, 115 files (`ap-color-report-4.md:34`; log confirms `apc-instruments-4/apc-4-final-test-src-styles.log.txt:8198-8199`).
- Changes: two title lines (`ap-color-report-4.md:5-18`).

VERDICT: FAIL none; outside the claims: none

Note: claim 2 (K1) carries one sub-clause ruled UNRESOLVED — whether the title's "and its emphasis class" phrase matches the assertions' coverage across both retune branches — because the brief scopes the checker's method to the count law, banned-term rows, and token-noun rule, not to assertion-to-title semantic correspondence. Route that sub-clause to the subjective or objective lane.

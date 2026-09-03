## Per-claim verdicts

- Claim 1 — `CONFIRMED`. Factory doc blocks use `Default:`; guide twins, test wording, setup prose, and manager tallies align. Evidence: `src/core/factories.ts:81-1133`, `guides/reason.md:52-126`, `guides/reason.md:387-552`, `tests/setup.ts:1-4,159-166`.
- Claim 2 — `NOT HELD`.
- Claim 3 — `CONFIRMED`. All required sweeps were rerun. Remaining hits are permitted: `src/core/factories.ts:519`, test default descriptions, and `tests/src/core/operators/Transformer.test.ts:190`. `setupBrowser` hits occur only in excluded files. No banned `via` or simplification hit remains.
- Claim 4 — `NOT HELD`.
- Claim 5 — `CONFIRMED`. No stale old/new sentence guard exists in `tests/guides.test.ts`. Guide changes are limited to the declared default cells, manager tallies, and formatter re-padding. Evidence: `guides/reason.md:52-126,387-432,549-552`; no matching guard in `tests/guides.test.ts`.
- Claim 6 — `NOT HELD`.
- Claim 7 — `CONFIRMED`. Status and diff contain only the listed guide, factory, setup, and core test paths; neither contains `src/core/types.ts`. Evidence: `conform-reason.status:1-10`, `conform-reason.diff:1-810`.
- Claim 8 — `NOT HELD`.
- Claim 9 — `CONFIRMED`. The setup diff changes only its header and `simplest` sentence; no test `@param` line or forbidden residue was added. The report names the correction, formatter command, and guide reflow. Evidence: `conform-reason.diff:620-640`, `reason-prose-report.md:85-105`.

## Findings outside the claims

None.

## Referrals

None.

## Claims attacked and held

Claims 1, 3, 5, 7, and 9 held after direct source, diff, status, and sweep checks. Permitted adjacent hits remain bounded by the brief: the factory module comment at `src/core/factories.ts:519`, defaults in test prose, excluded `setupBrowser` references, and the fixed six-operation fixture.

VERDICT: PASS

## Journal

Leave for the driver.

## Deviation

None.
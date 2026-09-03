## Per-claim verdicts

- Claim 1 — CONFIRMED — `src/server/types.ts:353,370`; `Injector.ts:282,1376`; `integration.test.ts:171,204`.
- Claim 2 — not held.
- Claim 3 — CONFIRMED — requested sweeps matched the recorded results; no external fleet hit.
- Claim 4 — CONFIRMED — captures and `conform-sea.diff:1-34` match the report.
- Claim 5 — CONFIRMED — `guides/sea.md:36`; remaining `INJECT` sites remain unchanged.
- Claim 6 — not held.
- Claim 7 — CONFIRMED — `conform-sea.status:1-6`; no out-of-scope diff or compatibility alias.
- Claim 8 — not held.
- Claim 9 — REFUTED — the report violates its no-count condition in the gate paragraph at `/home/user/scaffold/tmp/units/followon/sea-skip-report.md:154`; the remaining implementation conditions are supported by `tests/setupServer.ts:115,200,296` and the scoped diff.

## Findings outside the claims

- F1 — Existing `MachoFixtureOptions.tightHeaders` is a compound option at `tests/setupServer.ts:713`, consumed at `tests/setupServer.test.ts:354`. The report records this at `/home/user/scaffold/tmp/units/followon/sea-skip-report.md:210-229`.

## Referrals

- F1 → successor fixture-key cleanup covering `tests/setupServer.ts`, `tests/src/server/injectors/Injector.test.ts`, and `tests/setupServer.test.ts`.
- Claim 9 → correct the report prose before acceptance.

## Claims attacked and held

Claims 1, 3, 4, 5, and 7.

VERDICT: FAIL 9; outside the claims: F1

## Journal

Left for the driver.

## Deviation

None observed.
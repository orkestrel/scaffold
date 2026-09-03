## Per-claim verdicts

1. CONFIRMED. The overload order is correct at `src/core/types.ts:1475-1477`. The TSDoc matches the manager wording at `src/core/types.ts:1453-1457` and `src/core/types.ts:902-906`. No other interface member changed.

2. CONFIRMED. The no-argument branch checks lifecycle state, snapshots key order, removes non-id fields, emits through `#removeOne`, and returns nothing at `src/core/builders/SubjectBuilder.ts:107-114`. The keyed forms and `clear()` remain unchanged at `src/core/builders/SubjectBuilder.ts:115-144`.

3. CONFIRMED. The case proves removal, event order, empty `fields()`, and destroyed refusal at `tests/src/core/builders/SubjectBuilder.test.ts:76-89`. `reason-remove-proofs/red.txt:38-39` records `1 failed, 20 passed`; `reason-remove-proofs/green.txt:6-7` records `21 passed`.

4. CONFIRMED. The forms appear at `guides/reason.md:94`, `guides/reason.md:390`, and `guides/reason.md:563`. Method parity compares the guide table with interface and class members at `tests/guides.test.ts:130-149`.

5. CONFIRMED. The rerun status names only `guides/reason.md`, `src/core/builders/SubjectBuilder.ts`, `src/core/types.ts`, and `tests/src/core/builders/SubjectBuilder.test.ts`, matching `reason-remove.status:1-4`. No alias, shim, or compatibility branch appears.

6. REFUTED. The added line at `guides/reason.md:566` contains the banned token `as` in “clones as plain payloads.” The smallest correct fix is “clones into plain payloads.” The other forbidden-pattern sweeps were clean.

7. CONFIRMED. No added TODO, deferral, or commented-out code appears. The report rows at `tmp/units/reason-remove-report.md:3-7` match the live diff.

## Findings outside the claims

O-1. None.

## Referrals to the Orchestrator

R-1. Settle `format:check`, `lint:check`, `check`, `test:guides`, and the scoped `src:core` run at landing. This read-only lane did not run them.

FAIL 6
## Per-claim verdicts

1. CONFIRMED — `src/core/types.ts:1453-1456` documents the batch family, and `src/core/types.ts:1475-1477` declares the overloads in array, single-key, no-argument order. No other interface member changed in `git diff HEAD`.

2. CONFIRMED — `SubjectBuilder.ts:109-123` snapshots keys, removes non-`id` fields, emits per key, returns nothing for no arguments, and preserves keyed behavior. Destroyed calls fail through `SubjectBuilder.ts:167`.

3. CONFIRMED — The test case is at `SubjectBuilder.test.ts:76-89`. `red.txt:38-39` records `1 failed, 20 passed`; `green.txt:6-7` records `21 passed`.

4. CONFIRMED — The guide documents the forms at `guides/reason.md:94`, `guides/reason.md:390`, and `guides/reason.md:563`. The interface methods align with `src/core/types.ts:1472-1482`, and the parity checks are defined at `tests/guides.test.ts:131-148`.

5. CONFIRMED — The status evidence lists only the permitted paths at `reason-remove.status:1-4`. The diff contains no alias, shim, or compatibility branch.

6. CONFIRMED — The added-line syntax sweep found no prohibited skip, only, todo, retry, timeout, `any`, type assertion, or non-null assertion. The `!` at `SubjectBuilder.test.ts:87` is logical negation. Gate results remain NOT-EVIDENCED for this read-only audit.

7. CONFIRMED — The added-line hidden-work sweep found no TODO, deferred row, or commented-out code. The report rows at `reason-remove-report.md:5-8` match the changed paths.

## Findings outside the claims

None.

## Referrals to the Orchestrator

R-1. Run the deciding landing gates. The writer's gate table at `reason-remove-report.md:53-64` is not authoritative evidence for this read-only audit.

PASS
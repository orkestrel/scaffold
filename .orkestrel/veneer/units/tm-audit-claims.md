# TEST-MATRICES audit: claims

Subject: TEST-MATRICES `0bc5bca` (cherry-picked as `46336ac`) and the Orchestrator's fix `7911f63` in `/home/user/test`.

## The Orchestrator's given ruling

The brief's population is data tables: a module-level constant whose initializer is data. The scenario tables in `tests/src/core/helpers.test.ts` and `tests/src/browser/factories.test.ts` hold `arrange`, `act`, and `assert` functions bound to fixture classes and helpers their own test files declare, so they belong with the local-fixture finding the Orchestrator carries to a later test-package change (`tm-fixture-population.txt`). Rule them out of this unit's population unless the diff shows a table of pure data left behind.

## Claims

1. Every table the report names as moved is gone from its test file and is a frozen, documented export of the named setup module (`tests/setup.ts`, `tests/setupBrowser.ts`, or `tests/setupServer.ts`), with every nested row or tuple frozen, and each test file imports it.
2. No moved table changed a row, a value, or an order, and no assertion changed. Compare each removed declaration in `tm.diff` with its added export.
3. The two `VARIANTS` tables had equal rows, and both test files import the one export.
4. No module-level table of pure data is left in a test file under `tests/` (the vendored `tests/policy.test.ts` and `tests/config.test.ts` excepted), under the given ruling.
5. The diff touches only the owned files the brief names, adds no `any`, type assertion, non-null assertion, or suppression comment, and its TSDoc carries no banned term and no count.
6. `tm-full-gates-2.log.txt` records `format:check`, `lint:check`, `check`, `build`, and `test` exiting 0 at `7911f63`, and the guides project among the test runs passes; `tm-fix.diff` changes only the static setup import and the header comment of `tests/guides.test.ts`.

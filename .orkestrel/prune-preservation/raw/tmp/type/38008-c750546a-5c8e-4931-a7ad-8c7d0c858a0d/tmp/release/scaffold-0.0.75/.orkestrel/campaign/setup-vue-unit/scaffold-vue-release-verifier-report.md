# Scaffold Vue release verifier report

GATES: RED

## Command

`npm.cmd run prepublishOnly` exited `1`.

Combined output: `tmp/units/scaffold-vue-release-gates.log.txt`.

## Reached stages

- `format:check` passed.
- `lint:check` passed.
- `check` passed, including `check:src:core`, `check:src:server`, and `check:src:bin`.
- `build` passed, including source, host, and inventory output.
- `test:src:core` passed: 9 test files and 426 tests.
- `test:src:server` failed: 1 test failed, 465 passed, and 7 skipped across 5 test files.

## Failure

`tests/src/server/helpers.test.ts:2842`:

```text
FAIL  |src:server| tests/src/server/helpers.test.ts > write anchors > reports a directory swapped in by rename
AssertionError: expected true to be false // Object.is equality
- Expected
+ Received
- false
+ true
```

The chain did not reach `test:src:bin`, `test:policy`, `test:config`, `test:setup`, `test:guides`, or release-mode `test:distribution`.

## Anomalies

- API Extractor warned that its bundled TypeScript is 5.9.3 while the target uses TypeScript 6.0.3.
- The core suite emitted its expected malformed-fixture Vite warning.

## Final tree

`git diff --check` exited `0`.

The expected tracked changes remain in `guides/scaffold.md`, `host.json`, `src/core/compilers.ts`, `src/core/templates.ts`, `tests/distribution.test.ts`, `tests/setupServer.ts`, `tests/src/core/compilers.test.ts`, and `tests/src/core/templates.test.ts`.

# Scaffold Vue release replay verifier report

GATES: GREEN

`npm.cmd run prepublishOnly` exited `0`.

Combined output: `tmp/units/scaffold-vue-release-gates-2.log.txt`.

## Stage results

- `format:check`, `lint:check`, and `check` passed.
- `build` passed.
- `test:src:core` passed: 9 test files and 426 tests.
- `test:src:server` passed: 5 test files, 466 tests passed, and 7 skipped.
- `test:src:bin` passed: 3 test files and 267 tests.
- `test:policy` passed: 110 tests.
- `test:config` passed: 173 tests passed and 1 skipped.
- `test:setup` passed: 162 tests passed and 3 skipped.
- `test:guides` passed: 23 tests.
- Release-mode `test:distribution` passed: 7 tests passed and 1 skipped.

The prior server-project failure did not recur. This report does not rule on its cause.

## Final tree

`git diff --check` exited `0`.

The frozen tracked changes remain in `guides/scaffold.md`, `host.json`, `src/core/compilers.ts`, `src/core/templates.ts`, `tests/distribution.test.ts`, `tests/setupServer.ts`, `tests/src/core/compilers.test.ts`, and `tests/src/core/templates.test.ts`.

# Gate report — U11 lsp-imports (lsp)

1. `grep -rn "from 'typescript'\|from \"typescript\"\|require('typescript')" tests src configs`
   Exit: 1. No line printed (grep found no match). PASS (expected: no line).

2. `npm run format:check`
   Exit: 0.
   ```
   Checking formatting...
   All matched files use the correct format.
   Finished in 4734ms on 64 files using 4 threads.
   ```
   PASS

3. `npm run lint:check`
   Exit: 0. No diagnostics printed (the baseline `no-restricted-imports` diagnostic at `tests/setupConformance.ts:37` is gone).
   PASS

4. `npm run check`
   Exit: 0.
   ```
   > tsc --noEmit --project tsconfig.json && npm run check:src
   > tsc --noEmit -p configs/src/tsconfig.core.json
   > tsc --noEmit -p configs/src/tsconfig.server.json
   ```
   PASS

5. `npm run test:setup`
   Exit: 0.
   ```
   Test Files  3 passed (3)
        Tests  22 passed (22)
   ```
   PASS

6. `npm run test:conformance`
   Exit: 0.
   ```
   Test Files  1 passed (1)
        Tests  243 passed (243)
   ```
   PASS

7. `npm test`
   Exit: 0.
   ```
   test:src       — Test Files  8 passed (8)   / Tests  159 passed (159)
   test:policy    — Test Files  1 passed (1)   / Tests  77 passed (77)
   test:setup     — Test Files  3 passed (3)   / Tests  22 passed (22)
   test:config    — Test Files  1 passed (1)   / Tests  111 passed | 1 skipped (112)
   test:guides    — Test Files  1 passed (1)   / Tests  27 passed (27)
   test:conformance — Test Files  1 passed (1) / Tests  243 passed (243)
   test:integration — Test Files  1 passed (1) / Tests  1 passed (1)
   ```
   PASS

8. `git status --short`
   ```
    M tests/setupConformance.test.ts
    M tests/setupConformance.ts
   ```
   Working tree has uncommitted modifications to the two named files. No untracked or unexpected files.

## Overall verdict

GREEN — every gate passed.

## Anomalies

- None. `npm run test:config` emits an API Extractor informational stderr note about TypeScript 6.0.3 exceeding its bundled 5.9.3 engine; it does not affect the test outcome (111 passed, 1 skipped).

Report written to `/home/user/fleet/lsp/tmp/units/ts6-u11-verify-report.md`.

GATES: GREEN
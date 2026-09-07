# Gate report — U10 database-readers (database)

## 1. `grep -rn "from 'typescript'\|from \"typescript\"\|require('typescript')" tests src configs`
Exit code: 1 (no line matched, as expected).

## 2. `npm run format:check`
Exit code: 0.
```
Checking formatting...
All matched files use the correct format.
Finished in 3292ms on 99 files using 4 threads.
```

## 3. `npm run lint:check`
Exit code: 0.
```
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no warnings or errors printed)

## 4. `npm run check`
Exit code: 0.
```
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
> tsc --noEmit -p configs/src/tsconfig.browser.json
> tsc --noEmit -p configs/src/tsconfig.server.json
```

## 5. `npm run test:setup`
Exit code: 0.
```
Test Files  3 passed (3)
     Tests  82 passed (82)
  Start at  02:20:59
  Duration  32.92s
```

## 6. `npm run test:guides`
Exit code: 0.
```
Test Files  1 passed (1)
     Tests  84 passed (84)
  Start at  02:21:35
  Duration  42.73s
```

## 7. `npm test`
Exit code: 0. Ran the full script chain (unit, policy, config, setup, guides projects).
```
Test Files  25 passed (25)
     Tests  969 passed (969)
  Duration  24.21s

> test:policy
Test Files  1 passed (1)
     Tests  77 passed (77)

> test:config
Test Files  1 passed (1)
     Tests  111 passed | 1 skipped (112)

> test:setup
Test Files  3 passed (3)
     Tests  82 passed (82)

> test:guides
Test Files  1 passed (1)
     Tests  84 passed (84)
```

## 8. `git status --short`
```
 M tests/setupServer.test.ts
 M tests/setupServer.ts
```

## Overall verdict
GREEN — every gate exit code 0, no re-run needed (no timeout failures).

## Anomalies
- None. No Vitest timeout or flake observed on this run.

GATES: GREEN
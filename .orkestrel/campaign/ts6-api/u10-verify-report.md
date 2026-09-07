# Gate report — U10 database-readers (database)

## 1. `grep -rn "from 'typescript'\|from \"typescript\"\|require('typescript')" tests src configs`
Exit: 1 (no match). No line printed.

## 2. `npm run format:check`
Exit: 0
```
> oxfmt --config .oxfmtrc.json --check .
Checking formatting...
All matched files use the correct format.
Finished in 3494ms on 99 files using 4 threads.
```

## 3. `npm run lint:check`
Exit: 0
```
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no warnings printed)

## 4. `npm run check`
Exit: 0
```
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:core && npm run check:src:browser && npm run check:src:server
> tsc --noEmit -p configs/src/tsconfig.core.json
> tsc --noEmit -p configs/src/tsconfig.browser.json
> tsc --noEmit -p configs/src/tsconfig.server.json
```

## 5. `npm run test:setup`
Exit: 0
```
 Test Files  3 passed (3)
      Tests  78 passed (78)
   Duration  34.66s
```

## 6. `npm run test:guides`
Exit: 0
```
 Test Files  1 passed (1)
      Tests  84 passed (84)
   Duration  43.59s
```

## 7. `npm test`
Exit: 0
```
 Test Files  25 passed (25)
      Tests  969 passed (969)
   Duration  26.37s

> test:policy
 Test Files  1 passed (1)
      Tests  77 passed (77)
   Duration  918ms

> test:config
 Test Files  1 passed (1)
      Tests  111 passed | 1 skipped (112)
   Duration  5.61s

> test:setup
 Test Files  3 passed (3)
      Tests  78 passed (78)
   Duration  38.64s

> test:guides
 Test Files  1 passed (1)
      Tests  84 passed (84)
   Duration  55.49s
```

## 8. `git status --short`
Exit: 0
```
 M tests/setupServer.test.ts
 M tests/setupServer.ts
```

## Anomalies
None. `npm test` exceeded the 120-second foreground cap and was moved to a tracked background command; it completed exit code 0 with the summary blocks above. No re-run was needed.

Report written to `/home/user/fleet/database/tmp/units/ts6-u10-verify-report.md`.

GATES: GREEN
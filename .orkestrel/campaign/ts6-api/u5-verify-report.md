# Verify report — U5 generated-readers (scaffold)

## 1. `node node_modules/typescript/bin/tsc --version`
Exit: 0
```
Version 6.0.3
```

## 2. `npm run format:check`
Exit: 0
```
Checking formatting...

All matched files use the correct format.
Finished in 7499ms on 222 files using 4 threads.
```

## 3. `npm run lint:check`
Exit: 0
```
> @orkestrel/scaffold@0.0.63 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no warnings printed)

## 4. `npm run check`
Exit: 0
```
> @orkestrel/scaffold@0.0.63 check:src:bin
> tsc --noEmit -p configs/src/tsconfig.bin.json
```
All four `tsc --noEmit` invocations (root, core, server, bin) completed with no diagnostics.

## 5. `npm run build`
Exit: 0
```
build-host: staged 121 file(s) into dist/host
build-inventory: staged 121 file(s) into host.json
```
`build:inventory` regenerated `host.json` as expected; no other unexpected write.

## 6. `npm test`
Exit: 0
```
test:src:core    Test Files  9 passed (9)      Tests  385 passed (385)
test:src:server  Test Files  5 passed (5)      Tests  432 passed (432)
test:src:bin     Test Files  3 passed (3)      Tests  245 passed (245)
test:policy      Test Files  1 passed (1)      Tests  77 passed (77)
test:config      Test Files  1 passed (1)      Tests  111 passed | 1 skipped (112)
test:setup       Test Files  2 passed (2)      Tests  73 passed (73)
test:guides      Test Files  1 passed (1)      Tests  17 passed (17)
```
All projects passed; no red rows requiring a re-run.

## 7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
Exit: 0
```
 Test Files  1 passed (1)
      Tests  5 passed (5)
   Start at  17:47:34
   Duration  64.89s
```

## 8. `grep -rn "from 'typescript'\|node:vm\|runInNewContext" src tests configs --include=*.ts`
Exit: 1 (ripgrep/grep exit 1 means no match)
No line printed. Expected reading (no line) confirmed.

## 9. `git status --short`
Exit: 0
```
 M tests/guides.test.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/core/templates.test.ts
```

## Anomalies
None. No rerun triggered by step 6 (no red row). Step 5's `build:inventory` write to `host.json` matches the brief's stated expectation.

GATES: GREEN

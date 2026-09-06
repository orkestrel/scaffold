# Verify report — U7-fix-f (probe), the whole U7 change after every fix

## 1. `node node_modules/typescript/bin/tsc --version`

Exit 0.

```
Version 6.0.3
```

## 2. `npm run format:check`

Exit 0.

```
Checking formatting...

All matched files use the correct format.
Finished in 3291ms on 70 files using 4 threads.
```

## 3. `npm run lint:check`

Exit 0.

```
> @orkestrel/probe@0.0.12 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 4. `npm run check`

Exit 0. `tsc --noEmit --project tsconfig.json` plus `check:src:core`, `check:src:server`, `check:src:bin` all ran with no diagnostics.

## 5. `npm run build`

Exit 0.

```
dist/src/server/index.js  113.04 kB │ gzip: 30.81 kB │ map: 223.85 kB
dist/src/server/index.cjs  117.57 kB │ gzip: 31.06 kB │ map: 227.44 kB
dist/bin/main.js  0.41 kB │ gzip: 0.28 kB │ map: 0.63 kB
✓ built in 23ms
```

## 6. `npm test`

Exit 1. One red row, reported as it stands per the brief's carve-out for a plain test timeout — not re-run.

```
 FAIL  |src:server| tests/src/server/stages/RuntimeStage.test.ts > runtime stage > raises progress for the caller's run and lowers it before the stage's cleanup
Error: Test timed out in 60000ms.
If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".
 ❯ tests/src/server/stages/RuntimeStage.test.ts:1197:2
    1195|  // `readFIFOGate` describes. It samples the claimant side again becau…
    1196|  // at cleanup means nothing without the raised reading it returned fr…
    1197|  it(
       |  ^
    1198|   "raises progress for the caller's run and lowers it before the stage…
    1199|   { timeout: 60_000 },

 Test Files  1 failed | 11 passed (12)
      Tests  1 failed | 247 passed (248)
   Start at  17:17:41
   Duration  617.16s (transform 2.51s, setup 1.22s, import 4.04s, tests 1293.24s, environment 1ms)
```

`npm run test:policy`, `npm run test:config`, `npm run test:setup`, and `npm run test:guides` never ran because `npm run test:src` failed and the chain is `&&`-joined.

## 7. `git status --short`

```
 M guides/probe.md
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/server/Overlay.ts
 M src/server/Probe.ts
 M src/server/helpers.ts
 M src/server/index.ts
 A src/server/parsers.ts
 M src/server/stages/RuntimeStage.ts
 M src/server/stages/TypeStage.ts
 M src/server/types.ts
 M tests/src/core/errors.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/validators.test.ts
 M tests/src/server/Overlay.test.ts
 M tests/src/server/Probe.test.ts
 M tests/src/server/ProbeServer.test.ts
 M tests/src/server/helpers.test.ts
 A tests/src/server/parsers.test.ts
 M tests/src/server/stages/TypeStage.test.ts
```

GATES: RED npm test

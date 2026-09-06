# Verify report — U4 proof-template (scaffold)

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
Finished in 9453ms on 222 files using 4 threads.
```

## 3. `npm run lint:check`
Exit: 0
```
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no findings reported)

## 4. `npm run check`
Exit: 0
```
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
> tsc --noEmit -p configs/src/tsconfig.server.json
> tsc --noEmit -p configs/src/tsconfig.bin.json
```
(all four `tsc` invocations completed with no diagnostics)

## 5. `npm run build`
Exit: 0
```
dist/src/core/index.js  258.56 kB │ gzip: 69.83 kB
dist/src/server/index.js  174.89 kB │ gzip: 45.17 kB
dist/bin/main.js  82.83 kB │ gzip: 21.39 kB
build-host: staged 121 file(s) into dist/host
build-inventory: staged 121 file(s) into host.json
```
The `build:inventory` step regenerated `host.json`, as expected.

## 6. `npm test`
Exit: 0
```
> test:src:core && test:src:server && test:src:bin && test:policy && test:config && test:setup && test:guides

test:src:core   — Test Files 1 passed; Tests 245 passed
test:src:server — (chained, no failures reported)
test:src:bin    — (chained, no failures reported)
test:policy     — Test Files 1 passed (1); Tests 77 passed (77)
test:config     — Test Files 1 passed (1); Tests 111 passed | 1 skipped (112)
test:setup      — Test Files 2 passed (2); Tests 70 passed (70)
test:guides     — Test Files 1 passed (1); Tests 17 passed (17)
```
`tests/src/core/templates.test.ts > emitted workspaces under their own gates > refuses a non-object peer dependency declaration at config load` logs `failed to load config from .../malformed/vite.config.ts` to `stderr`; this is the fixture's asserted negative-path output, not a failure. All projects report a fully green summary and the chained `&&` pipeline reached its final `test:guides` step, confirming exit 0 throughout.

## 7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
Exit: 0
```
Test Files  1 passed (1)
     Tests  5 passed (5)
  Duration  77.12s
```

### Observation — same command without the `PATH` prefix (not the gate line)
Exit: 1
```
FAIL |distribution| tests/distribution.test.ts > installed package consumer > installs the packed scaffold and passes one generated core/server workspace through prepublish [requires a reachable npm registry]
AssertionError: expected 1 to be +0 // Object.is equality
 ❯ tests/distribution.test.ts:908:33
    expect(dependencies.status).toBe(0)
Test Files  1 failed (1)
     Tests  1 failed | 4 passed (5)
```
This reproduces the brief's named condition: the host's default npm 10 fails the materialized workspace's install with a `null`-graph read, a condition outside this change. Reported as an observation only.

## 8. `git status --short`
```
 M src/core/templates.ts
 M tests/distribution.test.ts
```

## Anomalies
- None. The npm-10-vs-npm-11 divergence in step 7 is the documented, expected condition, not a flake.

GATES: GREEN

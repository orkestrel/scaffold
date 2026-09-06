# Gate report — U12 fleet-visit-browser (phase A)

1. `git log --oneline -1` && `git status --short` — exit 0
```
52947e2 Align the lint script with the host's shape
---
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M configs/src/vite.core.config.ts
 M configs/src/vite.server.config.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M vite.config.ts
```

2. `grep -rn "vite-plugin-dts" package.json configs/src` — exit 1, no line (expected). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` — exit 0
```
configs/src/vite.core.config.ts:1
configs/src/vite.server.config.ts:1
```

3. `head -20 tests/distribution.test.ts | grep -n "typescript"` — exit 1, no line (expected).

4. `npx scaffold audit --offline` — exit 0
```
0 of 40 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 10.
```

5. `npm run format:check` — exit 0
```
Checking formatting...
All matched files use the correct format.
Finished in 3263ms on 135 files using 4 threads.
```

6. `npm run lint:check` — exit 1 (FAIL)
```
tests/distribution.test.ts:23:1: error eslint(no-restricted-imports): 'typescript' import is restricted from being used by a pattern. help: the in-process compiler API is not a surface the fleet uses
```
Owning file: `/home/user/fleet/browser/tests/distribution.test.ts:23`

7. `npm run check` — exit 0
```
tsc --noEmit --project tsconfig.json && npm run check:src
tsc --noEmit -p configs/src/tsconfig.core.json
tsc --noEmit -p configs/src/tsconfig.server.json
```

8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts` — exit 0
```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
dist/src/server/index.d.cts
dist/src/server/index.d.ts
```

## Anomalies

None observed on this run.

GATES: RED npm run lint:check

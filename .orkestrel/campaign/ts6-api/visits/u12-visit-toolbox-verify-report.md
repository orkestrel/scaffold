# Gate report — U12 fleet-visit-toolbox (phase A)

## 1. `git log --oneline -1` and `git status --short`
Exit: 0
```
8a67ffa Align the lint script with the host's shape
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M configs/src/vite.core.config.ts
 M configs/src/vite.server.config.ts
 M package.json
 M tests/config.test.ts
D  tests/distribution.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M vite.config.ts
?? tests/distribution.test.ts
```

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`
Exit: 1 (no match, expected) / 0
```
configs/src/vite.core.config.ts:1
configs/src/vite.server.config.ts:1
```
No line printed for the `vite-plugin-dts` search.

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`
Exit: 1 (no match, expected)
No line printed.

## 4. `npx scaffold audit --offline`
Exit: 0
```
0 of 39 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 9.
```

## 5. `npm run format:check`
Exit: 0
```
Checking formatting...
All matched files use the correct format.
Finished in 7773ms on 72 files using 4 threads.
```

## 6. `npm run lint:check`
Exit: 0
```
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no warnings or errors printed)

## 7. `npm run check`
Exit: 0
```
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:core && npm run check:src:server
> tsc --noEmit -p configs/src/tsconfig.core.json
> tsc --noEmit -p configs/src/tsconfig.server.json
```
(no diagnostics printed)

## 8. `ls dist/src/*/index.d.ts`, then `ls dist/src/*/index.d.cts` where `require` applies
Exit: 0 / 0
```
dist/src/core/index.d.ts
dist/src/server/index.d.ts
---
dist/src/core/index.d.cts
dist/src/server/index.d.cts
```
Exports map conditions per face: `.` (core) carries `import` and `require`, each with `types` and `default`. `./server` carries `import` and `require`, each with `types` and `default`. Both faces carry a `require` condition, so both `.d.cts` files are expected and present.

GATES: GREEN

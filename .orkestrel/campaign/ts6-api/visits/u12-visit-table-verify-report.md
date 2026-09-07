# Gate report — U12 fleet-visit-table (phase A)

## 1. `git log --oneline -1` and `git status --short`
Exit: 0
```
88a2ef5 Re-pin the development ranges to the released fleet
---
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M configs/src/vite.core.config.ts
 M package.json
 M tests/config.test.ts
D  tests/distribution.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M vite.config.ts
?? tests/distribution.test.ts
```
Anomaly: `tests/distribution.test.ts` shows both staged as deleted (`D `) and as untracked (`??`) — a working-tree file replaced a staged deletion. Read as the expected dirty state.

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`
Exit: 1 (no match, expected)
```
(no line)
```
`declarationRollup(` count:
```
1
```

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`
Exit: 1 (no match, expected)
```
(no line)
```

## 4. `npx scaffold audit --offline`
Exit: 0
```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

## 5. `npm run format:check`
Exit: 0
```
Checking formatting...
All matched files use the correct format.
Finished in 3095ms on 62 files using 4 threads.
```

## 6. `npm run lint:check`
Exit: 0
```
> oxlint --config .oxlintrc.json --deny-warnings .
(no violations)
```

## 7. `npm run check`
Exit: 0
```
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
(no diagnostics)
```

## 8. `ls dist/src/*/index.d.ts` and `ls dist/src/*/index.d.cts`
`package.json` exports map for `.`: carries both an `import` condition (`types: ./dist/src/core/index.d.ts`) and a `require` condition (`types: ./dist/src/core/index.d.cts`) — one face, `core`, and it ships both.

`index.d.ts` listing, exit 0:
```
dist/src/core/index.d.ts
```
`index.d.cts` listing, exit 0:
```
dist/src/core/index.d.cts
```

## Overall verdict
GREEN — every gate passed.

## Anomalies
- `tests/distribution.test.ts` reads as staged-deleted and untracked at once in `git status --short`; treated as the expected dirty state per dispatch instructions, not a gate failure.

GATES: GREEN

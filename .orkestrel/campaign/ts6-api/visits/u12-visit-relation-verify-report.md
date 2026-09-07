# Gate report — U12 fleet-visit-relation (phase A)

## 1. `git log --oneline -1` and `git status --short`
Exit: 0
```
098535a Align the lint script with the host's shape
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

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`
Exit: 1 (no line, as expected) for the first grep; second grep reports:
```
1
```
(only `configs/src/vite.core.config.ts` exists; it contains one `declarationRollup(` call.)

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`
Exit: 1 (no line, as expected)

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
Finished in 3084ms on 44 files using 4 threads.
```

## 6. `npm run lint:check`
Exit: 0
```
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no warnings or errors reported)

## 7. `npm run check`
Exit: 0
```
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```
(no diagnostics reported)

## 8. `ls dist/src/*/index.d.ts`, then `ls dist/src/*/index.d.cts` per exports map
`package.json`'s `exports` map carries one face (`.`), with both `import` (types `./dist/src/core/index.d.ts`) and `require` (types `./dist/src/core/index.d.cts`) conditions, so the `require` listing applies.

```
dist/src/core/index.d.ts
```
```
dist/src/core/index.d.cts
```
Both files exist.

GATES: GREEN

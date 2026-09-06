# Gate report — U12 fleet-visit-budget (phase A)

## 1. `git log --oneline -1` and `git status --short`

Exit: 0

```
4aa9d6b Align the lint script with the host's shape
```

`git status --short`:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M configs/src/vite.core.config.ts
 M package.json
 M tests/config.test.ts
 M tests/distribution.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M vite.config.ts
```

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

`grep -rn "vite-plugin-dts" package.json configs/src`: exit 1, no output (expected: no line). PASS.

`grep -c "declarationRollup(" configs/src/vite.*.config.ts`: exit 0, count `1`.

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit: 1, no output (expected: no line). PASS.

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
Finished in 2597ms on 39 files using 4 threads.
```

## 6. `npm run lint:check`

Exit: 0

```
> oxlint --config .oxlintrc.json --deny-warnings .
```

(no findings printed)

## 7. `npm run check`

Exit: 0

```
tsc --noEmit --project tsconfig.json && npm run check:src
tsc --noEmit -p configs/src/tsconfig.core.json
```

## 8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`

Exit: 0

```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

GATES: GREEN

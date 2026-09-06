# Gate report — U12 fleet-visit-form (phase A), independent cheap gates

Run from `/home/user/fleet/form`.

## 1. `git log --oneline -1` and `git status --short`

Exit: 0

```
f9bcf4e Re-pin the development ranges to the released fleet
```

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

Exit (first grep): 1 (no line printed, as expected)
Exit (second grep, count): 0

```
1
```

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit: 1 (no line printed, as expected)

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
Finished in 2955ms on 48 files using 4 threads.
```

## 6. `npm run lint:check`

Exit: 0

```
> @orkestrel/form@0.0.5 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 7. `npm run check`

Exit: 0

```
> @orkestrel/form@0.0.5 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## 8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`

Exit: 0

```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

GATES: GREEN

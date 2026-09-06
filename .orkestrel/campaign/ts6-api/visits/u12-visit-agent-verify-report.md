# Gate report — U12 fleet-visit-agent (phase A)

Working directory: `/home/user/fleet/agent`

## 1. `git log --oneline -1` and `git status --short`

Exit: 0 (both)

```
a65878c Align the lint script with the host's shape
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

`grep -rn "vite-plugin-dts" package.json configs/src` exit: 1 (no line, as expected)

`grep -c "declarationRollup(" configs/src/vite.*.config.ts` exit: 0

```
1
```

(Only `configs/src/vite.core.config.ts` matches the glob; it contains one `declarationRollup(` call.)

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
Finished in 4149ms on 77 files using 4 threads.
```

## 6. `npm run lint:check`

Exit: 0

```
> @orkestrel/agent@0.0.20 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 7. `npm run check`

Exit: 0

```
> @orkestrel/agent@0.0.20 check
> tsc --noEmit --project tsconfig.json && npm run check:src

> @orkestrel/agent@0.0.20 check:src
> npm run check:src:core

> @orkestrel/agent@0.0.20 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## 8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`

Exit: 0

```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

## Anomalies

- The working tree carries the uncommitted changes listed in step 1's `git status --short`; the audit and gates in steps 4-8 ran against that dirty tree, matching the expected state.
- Step 2's `grep -c` glob (`vite.*.config.ts`) matches only `configs/src/vite.core.config.ts`; no other `vite.*.config.ts` file exists under `configs/src`.

GATES: GREEN

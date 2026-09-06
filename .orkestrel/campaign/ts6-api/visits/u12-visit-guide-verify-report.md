# Gate report — U12 fleet-visit-guide (phase A), independent cheap gates

Working directory: `/home/user/fleet/guide`

## 1. `git log --oneline -1` and `git status --short`

Exit 0.

```
cb7b5b4 Align the lint script with the host's shape
---
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

`vite-plugin-dts` grep: exit 1, no line printed (expected).

`declarationRollup(` count, `configs/src/vite.core.config.ts`: `1`.

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit 1, no line printed (expected).

## 4. `npx scaffold audit --offline`

Exit 0.

```
0 of 33 planned paths drifted from the plan. Audit compared bytes at 23, existence at 4, and nothing at 6.
```

## 5. `npm run format:check`

Exit 0.

```
> @orkestrel/guide@0.0.17 format:check
> oxfmt --config .oxfmtrc.json --check .

Checking formatting...

All matched files use the correct format.
Finished in 2718ms on 80 files using 4 threads.
```

## 6. `npm run lint:check`

Exit 0.

```
> @orkestrel/guide@0.0.17 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 7. `npm run check`

Exit 0.

```
> @orkestrel/guide@0.0.17 check
> tsc --noEmit --project tsconfig.json && npm run check:src

> @orkestrel/guide@0.0.17 check:src
> npm run check:src:core

> @orkestrel/guide@0.0.17 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## 8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`

Exit 0.

```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

## Anomalies

None observed.

GATES: GREEN

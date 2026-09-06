# Gate report — U12 fleet-visit-markdown (phase A)

## 1. `git log --oneline -1` / `git status --short`

Exit: 0 / 0

```
246d89f Align the lint script with the host's shape
```

```
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

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` / `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

Exit: 1 (no match, expected) / 0

First command prints no line, as expected. Second command: only one file matches the glob (`configs/src/vite.core.config.ts`), so `grep -c` prints `1` with no filename prefix.

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit: 1 (no match, expected)

No line printed.

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
Finished in 4707ms on 47 files using 4 threads.
```

## 6. `npm run lint:check`

Exit: 0

```
> @orkestrel/markdown@0.0.13 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .

```

## 7. `npm run check`

Exit: 0

```
> @orkestrel/markdown@0.0.13 check
> tsc --noEmit --project tsconfig.json && npm run check:src

> @orkestrel/markdown@0.0.13 check:src
> npm run check:src:core

> @orkestrel/markdown@0.0.13 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## 8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`

Exit: 0

```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

## Anomalies

None observed.

GATES: GREEN

# Gate report — U12 fleet-visit-abort (phase A), independent cheap gates

Run from `/home/user/fleet/abort`.

## 1. `git log --oneline -1` / `git status --short`

Exit 0 / exit 0.

```
f7b5aaf Align the lint script with the host's shape
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

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` / `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

First command: exit 1, no line printed (expected: no line — matches).

Second command: exit 0, output `1` (only one file matches the glob, `configs/src/vite.core.config.ts`, so the count prints unprefixed).

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit 1, no line printed (expected: no line — matches).

## 4. `npx scaffold audit --offline`

Exit 0.

```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

## 5. `npm run format:check`

Exit 0.

```
Checking formatting...

All matched files use the correct format.
Finished in 2649ms on 39 files using 4 threads.
```

## 6. `npm run lint:check`

Exit 0.

```
> @orkestrel/abort@0.0.9 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

No warnings or errors printed.

## 7. `npm run check`

Exit 0.

```
> @orkestrel/abort@0.0.9 check
> tsc --noEmit --project tsconfig.json && npm run check:src

> @orkestrel/abort@0.0.9 check:src
> npm run check:src:core

> @orkestrel/abort@0.0.9 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## 8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`

Exit 0.

```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

## Anomalies

- The working tree carries uncommitted modifications (10 files) per step 1's `git status --short`; this is the expected dirty state for this unit, not a gate failure.

GATES: GREEN

# Gate report — U12 fleet-visit-pool (phase A), the independent cheap gates

## 1. `git log --oneline -1` and `git status --short`

Exit 0.

```
904f22a Align the lint script with the host's shape
----
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

`grep -rn "vite-plugin-dts" package.json configs/src`: exit 1, no line printed (expected).

`grep -c "declarationRollup(" configs/src/vite.*.config.ts`: the glob matches one file, `configs/src/vite.core.config.ts`. Count: 1.

```
1
```

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit 1, no line printed (expected).

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
Finished in 2264ms on 38 files using 4 threads.
```

## 6. `npm run lint:check`

Exit 0.

```
> @orkestrel/pool@0.0.10 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 7. `npm run check`

Exit 0.

```
> @orkestrel/pool@0.0.10 check
> tsc --noEmit --project tsconfig.json && npm run check:src

> @orkestrel/pool@0.0.10 check:src
> npm run check:src:core

> @orkestrel/pool@0.0.10 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## 8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`

Exit 0.

```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

## Anomalies

- `git status --short` shows `tests/distribution.test.ts` staged for deletion (`D`) alongside an
  untracked copy at the same path (`??`), a preexisting working-tree state, not caused by this
  verification run.

GATES: GREEN

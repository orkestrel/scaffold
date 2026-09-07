# Gate report — U12 fleet-visit-workspace (phase A)

## 1. `git log --oneline -1` and `git status --short`

Exit 0.

```
9967b73 Align the lint script with the host's shape
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

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

First grep: exit 1, no line printed (matches expectation).
Second grep: exit 0, count `1`.

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit 1, no line printed (matches expectation).

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
Finished in 3454ms on 49 files using 4 threads.
```

## 6. `npm run lint:check`

Exit 0. No diagnostics printed.

## 7. `npm run check`

Exit 0.

```
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## 8. `ls dist/src/*/index.d.ts`, then `ls dist/src/*/index.d.cts` where `exports` carries a `require` condition

```
dist/src/core/index.d.ts
```

```
dist/src/core/index.d.cts
```

`package.json` `exports["."]` carries both an `import` condition (`./dist/src/core/index.d.ts`) and a `require` condition (`./dist/src/core/index.d.cts`) for the `core` face, so both listings are expected and both are present.

## Anomalies

`git status --short` reports `tests/distribution.test.ts` as both staged-deleted (`D`) and untracked (`??`) — a working-tree state to note, not a gate failure. Step 2 and step 3 each printed no line, matching their expectation, so neither decides the terminal line by that clause.

GATES: GREEN

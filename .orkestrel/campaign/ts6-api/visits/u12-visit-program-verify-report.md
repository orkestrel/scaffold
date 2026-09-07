# Gate report — U12 fleet-visit-program (phase A)

## 1. `git log --oneline -1` and `git status --short`

Exit: 0

```
32cef62 Align the lint script with the host's shape
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

Exit: 1 (no match, as expected)

`declarationRollup(` count: `1`

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit: 1 (no match, as expected)

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
Finished in 3221ms on 48 files using 4 threads.
```

## 6. `npm run lint:check`

Exit: 0

```
> @orkestrel/program@0.0.12 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 7. `npm run check`

Exit: 0

```
> @orkestrel/program@0.0.12 check
> tsc --noEmit --project tsconfig.json && npm run check:src

> @orkestrel/program@0.0.12 check:src
> npm run check:src:core

> @orkestrel/program@0.0.12 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## 8. `ls dist/src/*/index.d.ts`, then `ls dist/src/*/index.d.cts`

`package.json` `exports` map, `.` face: `import` condition (`types`/`default`) and `require` condition (`types`/`default`) — the `core` face carries a `require` condition, so `.d.cts` is expected.

`ls dist/src/*/index.d.ts` — exit 0:

```
dist/src/core/index.d.ts
```

`ls dist/src/*/index.d.cts` — exit 0:

```
dist/src/core/index.d.cts
```

## Anomalies

None observed.

GATES: GREEN

# Gate report — U12 fleet-visit-process (phase A), independent cheap gates

Working directory: `/home/user/fleet/process`

## 1. `git log --oneline -1` and `git status --short`

Exit: 0 / 0

```
ba0b4d0 Re-pin the development ranges to the released fleet
---
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M configs/src/vite.core.config.ts
 M configs/src/vite.server.config.ts
 M package.json
 M tests/config.test.ts
D  tests/distribution.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M vite.config.ts
?? tests/distribution.test.ts
```

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

`grep -rn "vite-plugin-dts"`: exit 1, no line printed (matches the expected-no-line condition).

`grep -c "declarationRollup("`:

```
configs/src/vite.core.config.ts:1
configs/src/vite.server.config.ts:1
```

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

Exit: 1, no line printed (matches the expected-no-line condition).

## 4. `npx scaffold audit --offline`

Exit: 0

```
0 of 39 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 9.
```

## 5. `npm run format:check`

Exit: 0

```
Checking formatting...

All matched files use the correct format.
Finished in 2851ms on 56 files using 4 threads.
```

## 6. `npm run lint:check`

Exit: 0

```
> @orkestrel/process@0.0.10 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 7. `npm run check`

Exit: 0

```
> @orkestrel/process@0.0.10 check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
```

## 8. `ls dist/src/*/index.d.ts`, then `ls dist/src/*/index.d.cts` where `require` applies

`ls dist/src/*/index.d.ts`: exit 0

```
dist/src/core/index.d.ts
dist/src/server/index.d.ts
```

`ls dist/src/*/index.d.cts`: exit 0

```
dist/src/core/index.d.cts
dist/src/server/index.d.cts
```

`package.json` exports map conditions per face:
- `.` (core): carries both `import` and `require` conditions.
- `./server`: carries both `import` and `require` conditions.

Both faces declare a `require` condition, so both are expected to ship `.d.cts`, and both do.

## Anomalies

None observed.

---

GATES: GREEN

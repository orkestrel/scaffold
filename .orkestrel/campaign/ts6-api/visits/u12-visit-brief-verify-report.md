# Gate report — U12 fleet-visit-brief (phase A)

Commands run from `/home/user/fleet/brief`, in order.

## 1. `git log --oneline -1` and `git status --short`

PASS (exit 0, both commands)

`git log --oneline -1`:
```
094b679 Re-pin the development ranges to the released fleet
```

`git status --short`:
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

PASS

`grep -rn "vite-plugin-dts" package.json configs/src`: exit 1, no line printed (expected).

`grep -c "declarationRollup(" configs/src/vite.*.config.ts`: exit 0, last line:
```
1
```
(single matching file `configs/src/vite.core.config.ts`, count 1)

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

PASS (exit 1, no line printed, expected)

## 4. `npx scaffold audit --offline`

PASS (exit 0). `npx` resolved and ran without a host refusal; no fallback to the installed binary was needed. Last line:
```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

## 5. `npm run format:check`

PASS (exit 0). Last lines:
```
All matched files use the correct format.
Finished in 3211ms on 53 files using 4 threads.
```

## 6. `npm run lint:check`

PASS (exit 0). No output beyond the command banner.

## 7. `npm run check`

PASS (exit 0). Last lines:
```
> @orkestrel/brief@0.0.7 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## 8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`

PASS (exit 0). Output:
```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

## Anomalies

None observed.

GATES: GREEN

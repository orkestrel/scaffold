# Gate report — U12 fleet-visit-codec (phase A)

Ran from `/home/user/fleet/codec`.

## 1. `git log --oneline -1` / `git status --short`
PASS (exit 0 / exit 0)
```
e7fe73d Re-pin the development ranges to the released fleet
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

## 2. `grep -rn "vite-plugin-dts" package.json configs/src`
PASS — no line printed (exit 1, expected).
`grep -c "declarationRollup(" configs/src/vite.*.config.ts`
```
1
```
PASS (exit 0).

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`
PASS — no line printed (exit 1, expected).

## 4. `npx scaffold audit --offline`
PASS (exit 0)
```
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

## 5. `npm run format:check`
PASS (exit 0)
```
Checking formatting...
All matched files use the correct format.
Finished in 2183ms on 32 files using 4 threads.
```

## 6. `npm run lint:check`
PASS (exit 0) — no output beyond the command invocation.

## 7. `npm run check`
PASS (exit 0) — `tsc --noEmit --project tsconfig.json` and `check:src:core` (`tsc --noEmit -p configs/src/tsconfig.core.json`) both completed with no diagnostics.

## 8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`
PASS (exit 0)
```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
```

## Overall verdict

GREEN. Every gate passed; step 2 and step 3 each printed no line, as expected.

## Anomalies

None observed.

GATES: GREEN

# Verify report — U12 fleet-visit-workflow (phase A)

## 1. `git log --oneline -1` / `git status --short`
Exit: 0 / 0
```
f1f2d65 Align the lint script with the host's shape
```
```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M configs/src/vite.browser.config.ts
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

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` / `grep -c "declarationRollup(" configs/src/vite.*.config.ts`
Exit: 1 (no match, as expected) / 0
```
(no output)
```
```
configs/src/vite.browser.config.ts:1
configs/src/vite.core.config.ts:1
configs/src/vite.server.config.ts:1
```

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`
Exit: 1 (no line, as expected)
```
(no output)
```

## 4. `npx scaffold audit --offline`
Exit: 0
```
0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
```

## 5. `npm run format:check`
Exit: 0
```
Checking formatting...
All matched files use the correct format.
Finished in 3720ms on 106 files using 4 threads.
```

## 6. `npm run lint:check`
Exit: 0
```
(no output; oxlint --deny-warnings . returned clean)
```

## 7. `npm run check`
Exit: 0
```
tsc --noEmit --project tsconfig.json && npm run check:src
check:src:core, check:src:browser, check:src:server all completed with no diagnostics
```

## 8. `ls dist/src/*/index.d.ts` and conditional `ls dist/src/*/index.d.cts`
Exit: 0 / 0
```
dist/src/browser/index.d.ts
dist/src/core/index.d.ts
dist/src/server/index.d.ts
```
`package.json` exports map conditions per face:
- `.` (core): `import` and `require` — carries `require`, checked for `.d.cts`.
- `./browser`: `import` only — no `require` condition, ships ES alone, no `.d.cts` expected.
- `./server`: `import` and `require` — carries `require`, checked for `.d.cts`.

```
dist/src/core/index.d.cts
dist/src/server/index.d.cts
```
Both present as required; `./browser` correctly carries no `.d.cts`.

## Terminal line

GATES: GREEN

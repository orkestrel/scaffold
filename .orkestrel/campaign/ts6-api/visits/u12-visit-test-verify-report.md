# Gate report — U12 fleet-visit-test (phase A), the independent cheap gates

## 1. `git log --oneline -1` and `git status --short`
- Exit code: 0
- Last lines:
```
5951098 Re-pin the development ranges to the released fleet
---
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

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`
- Exit code (grep vite-plugin-dts): 1 (no match, expected)
- Exit code (grep -c declarationRollup): 0
- Output:
```
configs/src/vite.browser.config.ts:1
configs/src/vite.core.config.ts:1
configs/src/vite.server.config.ts:1
```

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`
- Exit code: 1 (no match, expected)
- Output: (none)

## 4. `npx scaffold audit --offline`
- Exit code: 0
- Last lines:
```
0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
```

## 5. `npm run format:check`
- Exit code: 0
- Last lines:
```
Checking formatting...
All matched files use the correct format.
Finished in 2458ms on 59 files using 4 threads.
```

## 6. `npm run lint:check`
- Exit code: 0
- Last lines: (no warnings or errors printed)

## 7. `npm run check`
- Exit code: 0
- Last lines: (all four `tsc --noEmit` invocations completed with no diagnostics printed)

## 8. `ls dist/src/*/index.d.ts`, then `ls dist/src/*/index.d.cts` where `package.json`'s `exports` map carries a `require` condition
- Exit code (`ls dist/src/*/index.d.ts`): 0
- Output:
```
dist/src/browser/index.d.ts
dist/src/core/index.d.ts
dist/src/server/index.d.ts
```
- Exit code (`ls dist/src/*/index.d.cts`): 0
- Output:
```
dist/src/core/index.d.cts
dist/src/server/index.d.cts
```
- Exports map per face: `.` (core) carries `import` and `require` conditions; `./browser` carries `import` alone; `./server` carries `import` and `require` conditions. The `.d.cts` listing matches: core and server each have a `.d.cts` file, browser has none, consistent with the browser face shipping ES alone.

GATES: GREEN

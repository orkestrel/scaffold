# Gate report — U12 fleet-visit-mcp (phase A)

## 1. `git log --oneline -1` / `git status --short`
Exit: 0
```
ba753b2 Align the lint script with the host's shape
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
Exit: 1 (no match, as expected — no line printed)
`declarationRollup(` counts:
```
configs/src/vite.browser.config.ts:1
configs/src/vite.core.config.ts:1
configs/src/vite.server.config.ts:1
```

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`
Exit: 1 (no line printed, as expected)

## 4. `npx scaffold audit --offline`
Exit: 0
```
0 of 47 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 14.
```

## 5. `npm run format:check`
Exit: 0
```
Checking formatting...
All matched files use the correct format.
Finished in 4008ms on 126 files using 4 threads.
```

## 6. `npm run lint:check`
Exit: 0 (no output beyond the script header)

## 7. `npm run check`
Exit: 0 (each of `tsc --noEmit --project tsconfig.json`, `check:src:core`, `check:src:browser`, `check:src:server` completed with no diagnostics printed)

## 8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`
Exit: 0
```
dist/src/browser/index.d.ts
dist/src/core/index.d.cts
dist/src/core/index.d.ts
dist/src/server/index.d.cts
dist/src/server/index.d.ts
```
Note: `dist/src/browser/index.d.cts` does not exist; `dist/src/browser/` contains only `index.d.ts`, `index.js`, `index.js.map`. The glob matched no `.d.cts` file for `browser`, so that entry is absent from the listing rather than erroring.

## Anomalies
- Working tree is dirty per step 1 (expected per the brief's evidence; not treated as a gate failure).
- `tests/distribution.test.ts` shows both a staged deletion (`D`) and an untracked copy (`??`) in `git status --short`.

GATES: GREEN

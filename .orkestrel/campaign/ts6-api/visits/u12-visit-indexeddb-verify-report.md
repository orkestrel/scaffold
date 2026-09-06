# Gate report — U12 fleet-visit-indexeddb (phase A)

## 1. `git log --oneline -1` and `git status --short`
Exit 0.
```
8d8216b Align the lint script with the host's shape
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M configs/src/vite.browser.config.ts
 M package.json
 M tests/config.test.ts
D  tests/distribution.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M vite.config.ts
?? tests/distribution.test.ts
```

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` and `grep -c "declarationRollup(" configs/src/vite.*.config.ts`
Exit 1 (no match, expected). No line printed.
Second command: `configs/src/vite.browser.config.ts: 1`. Exit 0.

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`
Exit 1 (no match, expected). No line printed.

## 4. `npx scaffold audit --offline`
Exit 0.
```
0 of 36 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 7.
```

## 5. `npm run format:check`
Exit 0.
```
Checking formatting...

All matched files use the correct format.
Finished in 2793ms on 53 files using 4 threads.
```

## 6. `npm run lint:check`
Exit 0. No warnings printed.

## 7. `npm run check`
Exit 0.
```
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:browser
> tsc --noEmit -p configs/src/tsconfig.browser.json
```

## 8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`
Exit 2 (FAIL).
```
ls: cannot access 'dist/src/*/index.d.cts': No such file or directory
dist/src/browser/index.d.ts
```
`dist/src/*/index.d.cts` does not exist; only `dist/src/browser/index.d.ts` is present. File: `dist/src/browser/` (missing `index.d.cts`).

## Anomalies
`git status --short` shows `tests/distribution.test.ts` both staged as deleted (`D`) and untracked (`??`), reflecting the working tree's expected dirty state per the brief's standing conditions.

GATES: RED ls dist/src/*/index.d.ts dist/src/*/index.d.cts

# Gate report — U12 fleet-visit-console (phase A)

## 1. `git log --oneline -1` / `git status --short`
Exit 0.
```
1aac385 Align the lint script with the host's shape
```
`git status --short`:
```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M configs/src/vite.browser.config.ts
 M configs/src/vite.core.config.ts
 M configs/src/vite.server.config.ts
 M package.json
 M tests/config.test.ts
 M tests/distribution.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M vite.config.ts
```

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` / `grep -c "declarationRollup(" configs/src/vite.*.config.ts`
`grep -rn "vite-plugin-dts"`: no line printed, exit 1 (expected).
`grep -c "declarationRollup("`:
```
configs/src/vite.browser.config.ts:1
configs/src/vite.core.config.ts:1
configs/src/vite.server.config.ts:1
```

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`
No line printed, exit 1 (expected).

## 4. `npx scaffold audit --offline`
Exit 0.
```
0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
```

## 5. `npm run format:check`
Exit 0.
```
Checking formatting...
All matched files use the correct format.
Finished in 2938ms on 83 files using 4 threads.
```

## 6. `npm run lint:check`
Exit 0.
```
> @orkestrel/console@0.0.12 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 7. `npm run check`
Exit 0.
```
> @orkestrel/console@0.0.12 check
> tsc --noEmit --project tsconfig.json && npm run check:src
> check:src:core / check:src:browser / check:src:server all ran, no errors printed
```

## 8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`
Exit 0.
```
dist/src/browser/index.d.ts
dist/src/core/index.d.cts
dist/src/core/index.d.ts
dist/src/server/index.d.cts
dist/src/server/index.d.ts
```
No `dist/src/browser/index.d.cts` file exists (browser build is ESM-only); the glob still resolved and the command exited 0.

GATES: GREEN

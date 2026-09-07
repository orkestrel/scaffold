# Gate report — D1 guide-readers (guide)

Run from `/home/user/fleet/guide`.

## 1. `npm run format:check`
Exit code: 0
```
Checking formatting...
All matched files use the correct format.
Finished in 2911ms on 80 files using 4 threads.
```

## 2. `npm run lint:check`
Exit code: 0
```
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no warnings or errors printed)

## 3. `npm run check`
Exit code: 0
```
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## 4. `npm run build`
Exit code: 0
```
dist/src/core/index.js  88.92 kB │ gzip: 22.01 kB │ map: 139.15 kB
dist/src/core/index.cjs  93.32 kB │ gzip: 22.38 kB │ map: 140.73 kB
✓ built in 389ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```

## 5. `npm test`
Exit code: 0
```
test:src    — Test Files  8 passed (8) — Tests  463 passed (463)
test:policy — Test Files  1 passed (1) — Tests  77 passed (77)
test:config — Test Files  1 passed (1) — Tests  111 passed | 1 skipped (112)
test:setup  — Test Files  1 passed (1) — Tests  7 passed (7)
test:guides — Test Files  1 passed (1) — Tests  46 passed (46)
```
No red row; no re-run needed.

## 6. `grep -rn "from 'typescript'\|from 'vite'\|from \"vite\"" src`
Exit code: 1 (no match, no line printed — expected)

## 7. `git status --short`
```
 M guides/guide.md
 M src/core/Guide.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/shapers.ts
 M src/core/sources/Source.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/src/core/Guide.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/shapers.test.ts
 M tests/src/core/sources/Source.test.ts
 M tests/src/core/validators.test.ts
```

## Overall verdict

GREEN. All gates passed; step 6 printed no line, so it does not decide the terminal line.

## Anomalies

- `npm run build` and `npm run test:config` print an API Extractor notice that the bundled TypeScript 5.9.3 is older than the project's TypeScript 6.0.3. Informational only; exit code 0 both times.

Report written to `/home/user/fleet/guide/tmp/units/docs-d1-verify-report.md`.

GATES: GREEN
# Gate report — D1 guide-readers (guide)

Run from `/home/user/fleet/guide`.

## 1. `npm run format:check`
PASS (exit 0)
```
Checking formatting...
All matched files use the correct format.
Finished in 3091ms on 80 files using 4 threads.
```

## 2. `npm run lint:check`
PASS (exit 0)
```
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no findings)

## 3. `npm run check`
PASS (exit 0)
```
tsc --noEmit --project tsconfig.json && npm run check:src
tsc --noEmit -p configs/src/tsconfig.core.json
```

## 4. `npm run build`
PASS (exit 0)
```
dist/src/core/index.js  91.05 kB │ gzip: 22.53 kB │ map: 141.91 kB
dist/src/core/index.cjs  95.49 kB │ gzip: 22.88 kB │ map: 143.50 kB
✓ built in 476ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```
Note: API Extractor prints a compiler-version advisory ("bundled TypeScript version 5.9.3 ... target project appears to use TypeScript 6.0.3"); the build still exits 0.

## 5. `npm test`
PASS (exit 0)

- `test:src` (project src:core): Test Files 8 passed (8), Tests 471 passed (471)
- `test:policy` (project policy): Test Files 1 passed (1), Tests 77 passed (77)
- `test:config` (project config): Test Files 1 passed (1), Tests 111 passed | 1 skipped (112)
- `test:setup` (project setup): Test Files 1 passed (1), Tests 7 passed (7)
- `test:guides` (project guides): Test Files 1 passed (1), Tests 47 passed (47)

No red Vitest row; no re-run needed.

## 6. `grep -rn "from 'typescript'\|from 'vite'\|from \"vite\"" src`
PASS (exit 1, no line printed — expected no match)

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
Working tree carries pre-existing modifications; nothing discarded or changed by this run.

## Anomalies
None observed. The API Extractor compiler-version advisory in step 4 is informational only and does not affect the exit code.

Report written to `/home/user/fleet/guide/tmp/units/docs-d1-verify-2-report.md`.

GATES: GREEN
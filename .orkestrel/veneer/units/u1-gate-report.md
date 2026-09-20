# U1-gate report (verifier, native Sonnet, 2026-09-20, 133 s), Veneer at `ae0221d`

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 735ms on 71 files using 16 threads.` |
| 2 | `npm run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` (no violations reported) |
| 3 | `npm run check` | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json` (no diagnostics) |
| 4 | `npm run build` | 0 | `✓ built in 255ms` |
| 5 | `npm test` | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` (guides suite, final chain member) |
| 6 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src` | 0 | `Test Files 5 passed (5)` / `Tests 12 passed (12)` |
| 7 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` | 0 | `Test Files 1 passed (1)` / `Tests 1 passed (1)` |
| 8 | `PLAYWRIGHT_CHANNEL=msedge npm run test:app` | 0 | `Test Files 2 passed (2)` / `Tests 3 passed (3)` |
| 9 | `PLAYWRIGHT_CHANNEL=msedge npm run test:journey` | 0 | `Test Files 4 passed (4)` / `Tests 32 passed \| 4 skipped (36)` |
| 10 | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 3 passed (3)` |
| 11 | `node ../scaffold/dist/bin/main.js audit --target .` | 0 | see verbatim below |
| 12 | `git status --porcelain` | 0 | empty output |
| 13 | `ls dist/src/styles dist/src/core dist/src/browser` | 0 | see listing below |

No non-zero exit occurred; no failure excerpts apply.

`audit` output, verbatim:
```
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.
```

`git status --porcelain` output, verbatim:
```
(empty)
```

`ls dist/src/styles dist/src/core dist/src/browser` output:
```
dist/src/browser:
index.d.ts
index.js
index.js.map

dist/src/core:
index.cjs
index.d.cts
index.d.ts
index.js

dist/src/styles:
index.css
index.js
index.rtl.css
```

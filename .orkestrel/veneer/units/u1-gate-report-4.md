# U1-gate report, round 4 (verifier, native Sonnet, 2026-09-20, 144 s), Veneer at `bd4284c`

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `npm run format:check` | 0 | clean |
| 2 | `npm run lint:check` | 0 | clean |
| 3 | `npm run check` | 0 | clean |
| 4 | `npm run build` | 0 | build completed |
| 5 | `npm test` | 0 | full chain passed |
| 5b | `npm run test:distribution` (managed Chromium) | 0 | `Test Files 1 passed (1)` / `Tests 10 passed \| 3 skipped (13)` / `Duration 10.26s` |
| 6 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src` | 0 | `Test Files 5 passed (5)` / `Tests 13 passed (13)` |
| 7 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` | 0 | `Test Files 1 passed (1)` / `Tests 1 passed (1)` |
| 8 | `PLAYWRIGHT_CHANNEL=msedge npm run test:app` | 0 | `Test Files 2 passed (2)` / `Tests 3 passed (3)` |
| 9 | `PLAYWRIGHT_CHANNEL=msedge npm run test:journey` | 0 | `Test Files 4 passed (4)` / `Tests 32 passed \| 4 skipped (36)` |
| 10 | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 5 passed (5)` |
| 11 | `node ../scaffold/dist/bin/main.js audit --target .` | 0 | the three registry-major advisories; `0 of 48 planned paths drifted from the plan.` |
| 12 | `git status --porcelain` | 0 | empty |
| 13 | `ls dist/src/styles dist/src/core dist/src/browser` | 0 | `browser: index.d.ts, index.js, index.js.map`; `core: index.cjs, index.d.cts, index.d.ts, index.js`; `styles: index.css, index.js, index.rtl.css` |

No non-zero exits. The two named distribution cases passed within the 10; the 3 skips are registry-gated.

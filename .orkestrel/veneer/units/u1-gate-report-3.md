# U1-gate report, round 3 (verifier, native Sonnet, 2026-09-20, 129 s), Veneer at `a0447d2`

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `npm run format:check` | 0 | `All matched files use the correct format. Finished in 736ms on 71 files using 16 threads.` |
| 2 | `npm run lint:check` | 0 | oxlint ran with `--deny-warnings`, no findings printed |
| 3 | `npm run check` | 0 | `tsc --noEmit` (core, browser, styles) and `vue-tsc --noEmit` (app:browser) all completed with no diagnostics |
| 4 | `npm run build` | 0 | `dist/app/browser/assets/index-D7E3wk78.js 2.35 kB │ gzip: 0.98 kB` / `✓ built in 244ms` |
| 5 | `npm test` | 0 | `test:guides` — Test Files 1 passed (1), Tests 18 passed (18) |
| 5b | `npm run test:distribution` (Chromium) | 0 | Test Files 1 passed (1), Tests 10 passed \| 3 skipped (13), Duration 10.31s |
| 6 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src` | 0 | Test Files 5 passed (5), Tests 13 passed (13) |
| 7 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` | 0 | Test Files 1 passed (1), Tests 1 passed (1) |
| 8 | `PLAYWRIGHT_CHANNEL=msedge npm run test:app` | 0 | Test Files 2 passed (2), Tests 3 passed (3) |
| 9 | `PLAYWRIGHT_CHANNEL=msedge npm run test:journey` | 0 | Test Files 4 passed (4), Tests 32 passed \| 4 skipped (36) |
| 10 | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | Test Files 1 passed (1), Tests 5 passed (5) |
| 11 | `node ../scaffold/dist/bin/main.js audit --target .` | 0 | the three registry-major advisories; `0 of 48 planned paths drifted from the plan.` |
| 12 | `git status --porcelain` | 0 | empty |
| 13 | `ls dist/src/styles dist/src/core dist/src/browser` | 0 | `browser: index.d.ts, index.js, index.js.map`; `core: index.cjs, index.d.cts, index.d.ts, index.js`; `styles: index.css, index.js, index.rtl.css` |

No non-zero exit occurred. The distribution skips are the `[requires the registry]` cases; the two required cases (`loads standalone styles with the declared cascade order`, `publishes what it declares to a real browser, and no more`) are among the passes.

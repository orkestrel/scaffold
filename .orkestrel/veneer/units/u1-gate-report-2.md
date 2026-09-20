# U1-gate report, round 2 (verifier, native Sonnet, 2026-09-20, 152 s), Veneer at `690bbb4`

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 739ms on 71 files using 16 threads.` |
| 2 | `npm run lint:check` | 0 | oxlint ran with `--deny-warnings`, no diagnostics printed |
| 3 | `npm run check` | 0 | `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` (last subcommand, no diagnostics) |
| 4 | `npm run build` | 0 | `✓ built in 250ms` |
| 5 | `npm test` | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` (final `test:guides` stage) |
| 5b | `npm run test:distribution` (managed Chromium) | 0 | `Test Files 1 passed (1)` / `Tests 10 passed \| 3 skipped (13)` |
| 6 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src` | 0 | `Test Files 5 passed (5)` / `Tests 13 passed (13)` |
| 7 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` | 0 | `Test Files 1 passed (1)` / `Tests 1 passed (1)` |
| 8 | `PLAYWRIGHT_CHANNEL=msedge npm run test:app` | 0 | `Test Files 2 passed (2)` / `Tests 3 passed (3)` |
| 9 | `PLAYWRIGHT_CHANNEL=msedge npm run test:journey` | 0 | `Test Files 4 passed (4)` / `Tests 32 passed \| 4 skipped (36)` |
| 10 | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 5 passed (5)` |
| 11 | `node ../scaffold/dist/bin/main.js audit --target .` | 0 | the three registry-major advisories; `0 of 48 planned paths drifted from the plan.` |
| 12 | `git status --porcelain` | 0 | empty output |
| 13 | `ls dist/src/styles dist/src/core dist/src/browser` | 0 | `browser: index.d.ts, index.js, index.js.map`; `core: index.cjs, index.d.cts, index.d.ts, index.js`; `styles: index.css, index.js, index.rtl.css` |

No non-zero exits; no failure excerpts.

Step 5b detail: verbose confirmation shows both required cases pass —
`installed package consumer > loads standalone styles with the declared cascade order [requires the registry]` (293 ms) and
`installed entry ./browser > publishes what it declares to a real browser, and no more [requires a browser]` (605 ms).
The remaining 3 skips are registry-gated cases (`packs one archive...`, `installed entry . > publishes what it declares to a real browser`, `installed entry ./browser > publishes what it declares to a Node import/require`).

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1a | `git status --porcelain \| grep -v '^??'` (start) | — | 17 modified files: README.md, configs/src/vite.styles.config.ts, guides/README.md, guides/veneer.md, src/core/index.ts, src/styles/_mixins.scss, src/styles/_theme.scss, src/styles/_tokens.scss, src/styles/index.scss, tests/distribution.test.ts, tests/setup.ts, tests/setupBrowser.test.ts, tests/setupBrowser.ts, tests/setupStyles.test.ts, tests/setupStyles.ts, tests/src/core/index.test.ts, tests/src/styles/index.test.ts |
| 1b | untracked outside `tmp/` (start) | — | src/core/constants.ts, src/core/types.ts, src/styles/elements/, tests/setup.test.ts, tests/src/styles/elements/, tests/src/styles/fixtures/, tests/src/styles/integration.test.ts, tests/src/styles/mixins.test.ts, tests/src/styles/theme.test.ts, tests/src/styles/tokens.test.ts |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 800ms on 83 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` (no diagnostics) |
| 4 | `npm run check` | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json` (no diagnostics) |
| 5 | `npm run build` | 0 | `✓ built in 332ms` |
| 6 | `npm test` (whole chain) | 0 | `test:guides` — `Test Files 1 passed (1)` / `Tests 18 passed (18)`; every chained step (`test:src`, `test:src:styles`, `test:app`, `test:journey`, `test:policy`, `test:config`, `test:setup`, `test:setup:browser`, `test:conformance`, `test:guides`) reported "Tests ... passed" with no failures |
| 7 | `npm run test:distribution` | 0 | `Test Files 1 passed (1)` / `Tests 10 passed \| 3 skipped (13)` / `Duration 10.56s` |
| 8 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` | 0 | `Test Files 7 passed (7)` / `Tests 38 passed (38)` |
| 9 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src` | 0 | `Test Files 5 passed (5)` / `Tests 17 passed (17)` |
| 10 | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` |
| 11 | `node ../scaffold/dist/bin/main.js audit --target .` | 0 | `dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.` / `dependencies: typescript declares major 6, while the registry serves major 7.` / `dependencies: vitest declares major 4, while the registry serves major 5.` / `0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.` |
| 12a | `git status --porcelain \| grep -v '^??'` (end) | — | same 17 modified files as step 1a, unchanged |
| 12b | untracked outside `tmp/` (end) | — | same 10 entries as step 1b, unchanged |

No non-zero exit occurred; no failure excerpt applies.

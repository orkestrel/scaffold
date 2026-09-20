Step | Command | Exit | Final lines
--- | --- | --- | ---
1 | `git status --porcelain` (tracked, first reading) | n/a | 17 modified tracked files: `README.md`, `configs/src/vite.styles.config.ts`, `guides/README.md`, `guides/veneer.md`, `src/core/index.ts`, `src/styles/_mixins.scss`, `src/styles/_theme.scss`, `src/styles/_tokens.scss`, `src/styles/index.scss`, `tests/distribution.test.ts`, `tests/setup.ts`, `tests/setupBrowser.test.ts`, `tests/setupBrowser.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`, `tests/src/core/index.test.ts`, `tests/src/styles/index.test.ts`; untracked outside `tmp/`: `src/core/constants.ts`, `src/core/types.ts`, `src/styles/elements/`, `tests/setup.test.ts`, `tests/src/styles/elements/`, `tests/src/styles/fixtures/`, `tests/src/styles/integration.test.ts`, `tests/src/styles/mixins.test.ts`, `tests/src/styles/theme.test.ts`, `tests/src/styles/tokens.test.ts`
2 | `npm run format:check` | 0 | `Checking formatting...` / `All matched files use the correct format.` / `Finished in 769ms on 83 files using 16 threads.`
3 | `npm run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` (no findings)
4 | `npm run check` | 0 | ran `check:src:core`, `check:src:browser`, `check:src:styles`, `check:app` → `check:app:browser` (`vue-tsc --noEmit`), all clean
5 | `npm run build` | 0 | `dist/app/browser/index.html 0.35 kB` / `dist/app/browser/assets/index-Cul7X1QY.css 31.62 kB` / `dist/app/browser/assets/index-C6LJHZ6V.js 2.35 kB` / `✓ built in 337ms`
6 | `npm test` (whole chain, background) | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` / `Start at 10:44:38` / `Duration 493ms` (final `test:guides` stage; all preceding stages in the chain also passed)
7 | `npm run test:distribution` (background) | 0 | `Test Files 1 passed (1)` / `Tests 10 passed \| 3 skipped (13)` / `Start at 10:44:46` / `Duration 10.36s`
8 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` (background) | 0 | `Test Files 7 passed (7)` / `Tests 39 passed (39)` / `Start at 10:45:08` / `Duration 2.71s`
9 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src` (background) | 0 | `Test Files 5 passed (5)` / `Tests 17 passed (17)` / `Start at 10:45:20` / `Duration 1.82s`
10 | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` (background) | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` / `Start at 10:45:31` / `Duration 1.77s`
11 | `node ../scaffold/dist/bin/main.js audit --target .` | 0 | `dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.` / `dependencies: typescript declares major 6, while the registry serves major 7.` / `dependencies: vitest declares major 4, while the registry serves major 5.` / `0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.`
12 | `git status --porcelain \| grep -v '^??'` (second reading) | n/a | Identical 17-line list to step 1's tracked reading, unchanged

No non-zero exits occurred, so no failure excerpts apply.

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1a | `git status --porcelain \| grep -v '^??'` | n/a | 19 modified tracked files (README.md, configs/src/vite.styles.config.ts, guides/README.md, guides/veneer.md, src/core/index.ts, src/styles/_mixins.scss, src/styles/_theme.scss, src/styles/_tokens.scss, src/styles/index.scss, tests/distribution.test.ts, tests/setup.ts, tests/setupBrowser.test.ts, tests/setupBrowser.ts, tests/setupConformance.test.ts, tests/setupConformance.ts, tests/setupStyles.test.ts, tests/setupStyles.ts, tests/src/core/index.test.ts, tests/src/styles/index.test.ts) |
| 1b | untracked outside `tmp/` | n/a | src/core/constants.ts, src/core/types.ts, src/styles/elements/, tests/setup.test.ts, tests/src/styles/elements/, tests/src/styles/fixtures/, tests/src/styles/integration.test.ts, tests/src/styles/mixins.test.ts, tests/src/styles/theme.test.ts, tests/src/styles/tokens.test.ts |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 778ms on 83 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` (no warnings/errors reported) |
| 4 | `npm run check` | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json` (no diagnostics printed) |
| 5 | `npm run build` | 0 | `dist/app/browser/index.html 0.35 kB │ gzip: 0.25 kB` / `dist/app/browser/assets/index-Cul7X1QY.css 31.62 kB │ gzip: 4.08 kB` / `dist/app/browser/assets/index-C6LJHZ6V.js 2.35 kB │ gzip: 0.98 kB` / `✓ built in 341ms` |
| 6 | `npm test` (whole chain, background, log at `tmp/u3-gate-test.log.txt`) | 0 | last suite (`test:journey`) started and dotted; earlier suites reported `Test Files 7 passed (7)` / `Tests 40 passed (40)`, then `Test Files 2 passed (2)` / `Tests 3 passed (3)`; wrapper reported `[exited with code 0]` |
| 7 | `npm run test:distribution` (background, log at `tmp/u3-gate-dist.log.txt`) | 0 | `(node:57072) [DEP0190] DeprecationWarning: ...` then 7 dots (no printed summary line before stream end); wrapper reported `[exited with code 0]` |
| 8 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` (background, log at `tmp/u3-gate-edge-styles.log.txt`) | 0 | `Test Files 7 passed (7)` / `Tests 40 passed (40)` / `Duration 2.81s` |
| 9 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src` (background, log at `tmp/u3-gate-edge-src.log.txt`) | 0 | `Test Files 5 passed (5)` / `Tests 17 passed (17)` / `Duration 1.82s` |
| 10 | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` (background, log at `tmp/u3-gate-edge-setup.log.txt`) | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` / `Duration 1.74s` |
| 11 | `node ../scaffold/dist/bin/main.js audit --target .` | 1 | `dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.` / `dependencies: typescript declares major 6, while the registry serves major 7.` / `dependencies: vitest declares major 4, while the registry serves major 5.` / `0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.` / `@orkestrel/scaffold: ^0.0.75 differs from ^0.0.76.` |
| 12 | `git status --porcelain \| grep -v '^??'` | n/a | same 19 modified tracked files as step 1a |

**Failure excerpt, step 11 (`node ../scaffold/dist/bin/main.js audit --target .`), exit 1:**
```
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.
@orkestrel/scaffold: ^0.0.75 differs from ^0.0.76.
```

**Status readings (verbatim):**

Before (step 1a, tracked): 19 lines listed above under Step 1a. Untracked outside `tmp/` (step 1b): listed above.

After (step 12): identical 19 tracked lines to step 1a — no change.

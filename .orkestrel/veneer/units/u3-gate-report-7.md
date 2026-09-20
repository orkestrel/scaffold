Both status readings identical (before/after).

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain \| grep -v '^??'` + untracked outside `tmp/` | n/a | 30 tracked lines listed below; 0 untracked outside `tmp/` |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 784ms on 83 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | (no output beyond the two `npm notice run` lines) |
| 4 | `npm run check` | 0 | `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` (no diagnostics) |
| 5 | `npm run build` | 0 | `✓ built in 313ms` |
| 6 | `npm test` | 0 (see anomaly) | `Test Files 1 passed (1)` / `Tests 18 passed (18)` (`test:guides`, last step in the chain) |
| 7 | `npm run test:distribution` | 0 | `Test Files 1 passed (1)` / `Tests 10 passed \| 3 skipped (13)` |
| 8 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` | 0 | `Test Files 7 passed (7)` / `Tests 40 passed (40)` |
| 9 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src` | 0 | `Test Files 5 passed (5)` / `Tests 17 passed (17)` |
| 10 | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` |
| 11 | `node ../scaffold/dist/bin/main.js audit --target .` | 1 | `dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.` / `dependencies: typescript declares major 6, while the registry serves major 7.` / `dependencies: vitest declares major 4, while the registry serves major 5.` / `0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.` / `@orkestrel/scaffold: ^0.0.75 differs from ^0.0.76.` |
| 12 | `git status --porcelain \| grep -v '^??'` again | n/a | identical to step 1's tracked-lines list |

**Status readings (steps 1 and 12, identical both times):**
```
 M README.md
 M configs/src/vite.styles.config.ts
 M guides/README.md
 M guides/veneer.md
A  src/core/constants.ts
 M src/core/index.ts
A  src/core/types.ts
 M src/styles/_mixins.scss
 M src/styles/_theme.scss
 M src/styles/_tokens.scss
A  src/styles/elements/_body.scss
A  src/styles/elements/_html.scss
 M src/styles/index.scss
 M tests/distribution.test.ts
A  tests/setup.test.ts
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/core/index.test.ts
A  tests/src/styles/elements/body.test.ts
A  tests/src/styles/elements/html.test.ts
A  tests/src/styles/fixtures/mixins.scss
 M tests/src/styles/index.test.ts
A  tests/src/styles/integration.test.ts
A  tests/src/styles/mixins.test.ts
A  tests/src/styles/theme.test.ts
A  tests/src/styles/tokens.test.ts
```
No untracked lines outside `tmp/` in either reading.

**Failure excerpt for step 11 (only non-zero exit):**
```
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.
@orkestrel/scaffold: ^0.0.75 differs from ^0.0.76.
```
File: `C:/Users/mikes/WebstormProjects/veneer/package.json` (dependency major-version drift and the `@orkestrel/scaffold` range `^0.0.75` versus the registry-served `^0.0.76`).

**Anomaly:** the harness's own background-task notification for step 6 reported `status: failed, exit code 1`, but the captured log at `C:/Users/mikes/WebstormProjects/veneer/tmp/u3-test.log.txt` shows the full `npm test` chain (`test:src` through `test:guides`, chained with `&&`) completed every stage in order with every test file passed, ending at `test:guides` with `18 passed (18)` and no error, `npm error`, or non-zero-exit text anywhere in the log. Because the chain is `&&`-joined and its final stage ran and passed, npm test's actual exit code is 0; the "failed" signal traces to the outer detaching wrapper (`nohup … & disown`), not to `npm test` itself.

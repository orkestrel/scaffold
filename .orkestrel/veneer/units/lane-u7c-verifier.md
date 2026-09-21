<!-- workflow wf_014be581-50d, agent a1d8efe38a7073ebf, label unknown, retained 2026-09-21 -->

All eighteen steps ran successfully. Now producing the final report.

Step | Command | Exit | Final lines
--- | --- | --- | ---
1a | `git status --porcelain --untracked-files=all \| grep -v '^?? tmp/'` (first) | 0 | ` M app/browser/Showcase.ts`, ` M app/browser/constants.ts`, ` M app/browser/index.ts`, ` M app/browser/main.ts`, ` M app/browser/styles/_shell.scss`, ` M app/browser/types.ts`, ` M tests/app/browser/Showcase.test.ts`, ` M tests/app/browser/index.test.ts`, ` M tests/app/browser/integration.test.ts`, ` M tests/distribution.test.ts`, ` M tests/setup.test.ts`, ` M tests/setup.ts`, ` M tests/setupBrowser.test.ts`, ` M tests/setupBrowser.ts`, `?? app/browser/sections/ButtonSection.ts`, `?? app/browser/sections/index.ts`, `?? tests/app/browser/sections/ButtonSection.test.ts`
1b | `git log --oneline -1` | 0 | `0cbb563 Ship the Button engine and the delegated data API behind ./browser (U7b)`
2 | `npm run format:check` | 0 | `Checking formatting...` / `All matched files use the correct format.` / `Finished in 873ms on 97 files using 16 threads.`
3 | `npm run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` (no findings printed)
4 | `npm run check` | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json` (no diagnostics printed)
5 | `npm run build` | 0 | `dist/app/browser/index.html 0.35 kB │ gzip: 0.25 kB` / `dist/app/browser/assets/index-Csx7qJPY.css 51.80 kB │ gzip: 5.94 kB` / `dist/app/browser/assets/index-CN-letQO.js 8.65 kB │ gzip: 2.48 kB` / `✓ built in 405ms`
6 | `npm run test:setup` | 0 | `Test Files 3 passed (3)` / `Tests 116 passed (116)` / `Duration 6.02s`
7 | `npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 21 passed (21)` / `Duration 4.78s`
8 | `npm run test:app:browser` | 0 | `Test Files 3 passed (3)` / `Tests 10 passed (10)` / `Duration 1.74s`
9 | `npm run test:journey` | 0 | `Test Files 4 passed (4)` / `Tests 80 passed \| 4 skipped (84)` / `Duration 15.73s`
10 | `CAPTURE=1 npm run test:journey` | 0 | `Test Files 4 passed (4)` / `Tests 84 passed (84)` / `Duration 17.22s`
11 | `npm run test:distribution` | 0 | `Test Files 1 passed (1)` / `Tests 12 passed \| 4 skipped (16)` / `Duration 10.91s`
12 | `npm run test:guides` | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` / `Duration 575ms`
13 | `npm test` (background, full chain) | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` / `Duration 588ms` (final sub-run was `test:guides`) / `EXIT:0`
14 | `PLAYWRIGHT_CHANNEL=msedge npm run test:journey` | 0 | `Test Files 4 passed (4)` / `Tests 80 passed \| 4 skipped (84)` / `Duration 17.05s` (with transient `Port 6331x is in use, trying another one...` lines from concurrent step 13)
15 | `PLAYWRIGHT_CHANNEL=msedge npm run test:app:browser` | 0 | `Test Files 3 passed (3)` / `Tests 10 passed (10)` / `Duration 2.25s` (same transient port-retry lines)
16 | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 21 passed (21)` / `Duration 2.39s` (same transient port-retry lines)
17 | `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` | 0 | full output below
18 | `ls tmp/capture/states` | 0 | 48 capture PNG filenames listed below
19 | `git status --porcelain --untracked-files=all \| grep -v '^?? tmp/'` (final) | 0 | identical to step 1a's listing

No non-zero exit occurred; no failure excerpt applies.

**Audit's full output (step 17):**
```
setup: The target at . carries a test setup module that no proof covers: tests/setupListeners.ts. Add tests/setupListeners.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.
```

**Capture listing (step 18) — `tmp/capture/states`:**
```
button-primary-active--dark-1280.png
button-primary-active--dark-390.png
button-primary-active--light-1280.png
button-primary-active--light-390.png
button-primary-active-dark--dark-1280.png
button-primary-active-dark--dark-390.png
button-primary-active-dark--light-1280.png
button-primary-active-dark--light-390.png
button-primary-focus--dark-1280.png
button-primary-focus--dark-390.png
button-primary-focus--light-1280.png
button-primary-focus--light-390.png
button-primary-focus-dark--dark-1280.png
button-primary-focus-dark--dark-390.png
button-primary-focus-dark--light-1280.png
button-primary-focus-dark--light-390.png
button-primary-hover--dark-1280.png
button-primary-hover--dark-390.png
button-primary-hover--light-1280.png
button-primary-hover--light-390.png
button-primary-hover-dark--dark-1280.png
button-primary-hover-dark--dark-390.png
button-primary-hover-dark--light-1280.png
button-primary-hover-dark--light-390.png
button-primary-pressed--dark-1280.png
button-primary-pressed--dark-390.png
button-primary-pressed--light-1280.png
button-primary-pressed--light-390.png
button-primary-pressed-dark--dark-1280.png
button-primary-pressed-dark--dark-390.png
button-primary-pressed-dark--light-1280.png
button-primary-pressed-dark--light-390.png
button-primary-rest--dark-1280.png
button-primary-rest--dark-390.png
button-primary-rest--light-1280.png
button-primary-rest--light-390.png
button-primary-rest-dark--dark-1280.png
button-primary-rest-dark--dark-390.png
button-primary-rest-dark--light-1280.png
button-primary-rest-dark--light-390.png
home--dark-1280.png
home--dark-390.png
home--light-1280.png
home--light-390.png
home-dark--dark-1280.png
home-dark--dark-390.png
home-dark--light-1280.png
home-dark--light-390.png
```

**Status reading 1 (before, step 1a), verbatim:**
```
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M app/browser/main.ts
 M app/browser/styles/_shell.scss
 M app/browser/types.ts
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/distribution.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
?? app/browser/sections/ButtonSection.ts
?? app/browser/sections/index.ts
?? tests/app/browser/sections/ButtonSection.test.ts
```

**Status reading 2 (after, step 19), verbatim:**
```
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M app/browser/main.ts
 M app/browser/styles/_shell.scss
 M app/browser/types.ts
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/distribution.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
?? app/browser/sections/ButtonSection.ts
?? app/browser/sections/index.ts
?? tests/app/browser/sections/ButtonSection.test.ts
```

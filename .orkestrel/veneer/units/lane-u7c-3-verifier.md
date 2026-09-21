<!-- workflow wf_0cd99cbf-009, agent a4729f61161f6e0b3, label unknown, retained 2026-09-21 -->

All eighteen chained steps executed. Here is the gate report.

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain --untracked-files=all \| grep -v '^?? tmp/'` + `git log --oneline -1` | 0 | See status block below; HEAD `0cbb563 Ship the Button engine and the delegated data API behind ./browser (U7b)` |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 814ms on 96 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | No output beyond the run header (no warnings/errors) |
| 4 | `npm run check` | 0 | Ran `check:src:core`, `check:src:browser`, `check:src:styles`, `check:app:browser` (`vue-tsc`) to completion with no diagnostics |
| 5 | `npm run build` | 0 | `dist/app/browser/index.html 0.35 kB`, `assets/index-Csx7qJPY.css 51.80 kB`, `assets/index-CN-letQO.js 8.65 kB`, `✓ built in 386ms` |
| 6 | `npm run test:setup` | 0 | `Test Files 3 passed (3)` / `Tests 121 passed (121)` |
| 7 | `npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 27 passed (27)` |
| 8 | `npm run test:app:browser` | 0 | `Test Files 3 passed (3)` / `Tests 10 passed (10)` |
| 9 | `npm run test:journey` | 0 | `Test Files 4 passed (4)` / `Tests 80 passed \| 4 skipped (84)` |
| 10 | `CAPTURE=1 npm run test:journey` | 0 | `Test Files 4 passed (4)` / `Tests 84 passed (84)` |
| 11 | `npm run test:distribution` | 0 | `Test Files 1 passed (1)` / `Tests 12 passed \| 4 skipped (16)` |
| 12 | `npm run test:guides` | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` |
| 13 | `npm test` (background, logged to `veneer/tmp/u7c-npmtest.log`) | 0 | Chain ran `test:src → test:app → test:journey → test:policy → test:config → test:setup → test:setup:browser → test:conformance → test:guides` to completion; final block `Test Files 1 passed (1)` / `Tests 18 passed (18)` (`test:guides`), then `EXITCODE:0` |
| 14 | `PLAYWRIGHT_CHANNEL=msedge npm run test:journey` | 0 | `Test Files 4 passed (4)` / `Tests 80 passed \| 4 skipped (84)` |
| 15 | `PLAYWRIGHT_CHANNEL=msedge npm run test:app:browser` | 0 | `Test Files 3 passed (3)` / `Tests 10 passed (10)` |
| 16 | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 27 passed (27)` |
| 17 | `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` | 0 | Full output reproduced below |
| 18 | `ls tmp/capture/states` | 0 | Full listing reproduced below |
| 19 | `git status --porcelain --untracked-files=all \| grep -v '^?? tmp/'` (again) | 0 | Identical to step 1's reading, reproduced below |

No non-zero exit occurred; no failure excerpt applies.

**Step 1 and step 19 status (identical both times):**
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
?? tests/app/browser/sections/ButtonSection.test.ts
```
`git log --oneline -1`: `0cbb563 Ship the Button engine and the delegated data API behind ./browser (U7b)`

**Step 17 full audit output:**
```
setup: The target at . carries a test setup module that no proof covers: tests/setupListeners.ts. Add tests/setupListeners.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.
```

**Step 18 capture listing** (`tmp/capture/states`, 48 files): `button-primary-active--dark-1280.png`, `button-primary-active--dark-390.png`, `button-primary-active--light-1280.png`, `button-primary-active--light-390.png`, `button-primary-active-dark--dark-1280.png`, `button-primary-active-dark--dark-390.png`, `button-primary-active-dark--light-1280.png`, `button-primary-active-dark--light-390.png`, `button-primary-focus--dark-1280.png`, `button-primary-focus--dark-390.png`, `button-primary-focus--light-1280.png`, `button-primary-focus--light-390.png`, `button-primary-focus-dark--dark-1280.png`, `button-primary-focus-dark--dark-390.png`, `button-primary-focus-dark--light-1280.png`, `button-primary-focus-dark--light-390.png`, `button-primary-hover--dark-1280.png`, `button-primary-hover--dark-390.png`, `button-primary-hover--light-1280.png`, `button-primary-hover--light-390.png`, `button-primary-hover-dark--dark-1280.png`, `button-primary-hover-dark--dark-390.png`, `button-primary-hover-dark--light-1280.png`, `button-primary-hover-dark--light-390.png`, `button-primary-pressed--dark-1280.png`, `button-primary-pressed--dark-390.png`, `button-primary-pressed--light-1280.png`, `button-primary-pressed--light-390.png`, `button-primary-pressed-dark--dark-1280.png`, `button-primary-pressed-dark--dark-390.png`, `button-primary-pressed-dark--light-1280.png`, `button-primary-pressed-dark--light-390.png`, `button-primary-rest--dark-1280.png`, `button-primary-rest--dark-390.png`, `button-primary-rest--light-1280.png`, `button-primary-rest--light-390.png`, `button-primary-rest-dark--dark-1280.png`, `button-primary-rest-dark--dark-390.png`, `button-primary-rest-dark--light-1280.png`, `button-primary-rest-dark--light-390.png`, `home--dark-1280.png`, `home--dark-390.png`, `home--light-1280.png`, `home--light-390.png`, `home-dark--dark-1280.png`, `home-dark--dark-390.png`, `home-dark--light-1280.png`, `home-dark--light-390.png`.

**Overall verdict:** GREEN. Every step returned exit code 0 on managed Chromium, on `msedge`, and for the capture run.

**Anomalies:** the harness's background-task notification for step 13 (`npm test`) fired while the `npm run test:journey` sub-step was still mid-run (log at 684 lines, no `EXITCODE` marker); polling the log directly (checked every 15s) showed the chain continued through `test:policy`, `test:config`, `test:setup`, `test:setup:browser`, `test:conformance`, `test:guides` and appended `EXITCODE:0` about 66 seconds after the premature notification. Treat that notification as unreliable for this nested-background invocation; the log file, not the notification, is the exit-code source of truth here.

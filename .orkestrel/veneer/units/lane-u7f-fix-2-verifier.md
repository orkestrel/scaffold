<!-- workflow wf_b34576fe-3ce, agent a9f5bb912e153811a, label unknown, retained 2026-09-21 -->

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain --untracked-files=all \| grep -v '^?? tmp/'` and `git log --oneline -1` | n/a | see status blocks below |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 800ms on 96 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` (no violations reported) |
| 4 | `npm run check` | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json` (no diagnostics) |
| 5 | `npm run build` | 0 | `✓ built in 380ms` |
| 6 | `npm run test:setup` | 0 | `Test Files 3 passed (3)` / `Tests 121 passed (121)` |
| 7 | `npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 27 passed (27)` |
| 8 | `npm run test:app:browser` | 0 | `Test Files 3 passed (3)` / `Tests 11 passed (11)` |
| 9 | `npm run test:journey` | 0 | `Test Files 4 passed (4)` / `Tests 84 passed \| 4 skipped (88)` |
| 10 | `CAPTURE=1 npm run test:journey` | 0 | `Test Files 4 passed (4)` / `Tests 88 passed (88)` |
| 11 | `npm run test:distribution` | 0 | `Test Files 1 passed (1)` / `Tests 12 passed \| 4 skipped (16)` |
| 12 | `npm run test:guides` | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` |
| 13 | `npm test` (background, logged to `tmp/full-test.log`) | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` (final sub-run: `test:guides`), followed by `EXIT:0` |
| 14 | `PLAYWRIGHT_CHANNEL=msedge npm run test:journey` | 0 | `Test Files 4 passed (4)` / `Tests 84 passed \| 4 skipped (88)` |
| 15 | `PLAYWRIGHT_CHANNEL=msedge npm run test:app:browser` | 0 | `Test Files 3 passed (3)` / `Tests 11 passed (11)` |
| 16 | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 27 passed (27)` |
| 17 | `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` | 0 | see full output below |
| 18 | `ls tmp/capture/states` | 0 | see listing below |
| 19 | `git status --porcelain --untracked-files=all \| grep -v '^?? tmp/'` (repeat) | 0 | see status blocks below |

No non-zero exit occurred; no failure excerpt applies.

**Step 1 status/log:**
```
 M app/browser/styles/_shell.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/integration.test.ts
---LOG---
7f6d5f6 Correct the guide to what the landed Button mechanisms show (U7e)
```

**Step 17 full audit output:**
```
setup: The target at . carries a test setup module that no proof covers: tests/setupListeners.ts. Add tests/setupListeners.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.
```

**Step 18 capture listing (`tmp/capture/states`):**
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

**Step 19 status (final reading):**
```
 M app/browser/styles/_shell.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/integration.test.ts
```

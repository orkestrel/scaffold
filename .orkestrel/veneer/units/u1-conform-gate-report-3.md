<!-- workflow wf_b7025f01-4d1, agent aa345b988e8fa5ae3, retained 2026-09-20 -->

Matches the initial status exactly, confirming no unintended writes into the checkout beyond the `tmp/` logs.

Step | Command | Exit | Final lines
--- | --- | --- | ---
1 | `git status --porcelain \| grep -v '^?? tmp/'` + `git log --oneline -1` | n/a | See "Status (first)" and "HEAD" below.
2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 794ms on 80 files using 16 threads.`
3 | `npm run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` (no violations reported)
4 | `npm run check` | 0 | Last line: `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json` (no diagnostics emitted)
5 | `npm run build` | 0 | `dist/app/browser/assets/index-D2JnOl_e.js 2.31 kB │ gzip: 0.96 kB` / `✓ built in 306ms`
6 | `npm test` (whole chain) | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` / `Start at 15:57:15` / `Duration 502ms (transform 51ms, setup 33ms, import 307ms, tests 6ms, environment 0ms)` (final `test:guides` suite)
7 | `npm run test:distribution` | 0 | `Test Files 1 passed (1)` / `Tests 11 passed \| 3 skipped (14)` / `Start at 16:01:46` / `Duration 10.61s (transform 107ms, setup 32ms, import 2.42s, tests 8.01s, environment 0ms)`
8 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src` | 0 | `Test Files 4 passed (4)` / `Tests 17 passed (17)` / `Start at 16:02:11` / `Duration 1.72s (transform 44ms, setup 107ms, import 83ms, tests 45ms, environment 0ms)`
9 | `PLAYWRIGHT_CHANNEL=msedge npm run test:app` | 0 | `Test Files 2 passed (2)` / `Tests 3 passed (3)` / `Start at 16:02:32` / `Duration 1.56s (transform 0ms, setup 70ms, import 71ms, tests 137ms, environment 0ms)`
10 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` | 0 | `Test Files 7 passed (7)` / `Tests 40 passed (40)` / `Start at 16:02:52` / `Duration 2.76s (transform 0ms, setup 243ms, import 303ms, tests 515ms, environment 0ms)`
10b | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 19 passed (19)` / `Start at 16:03:12` / `Duration 1.74s (transform 0ms, setup 57ms, import 10ms, tests 486ms, environment 0ms)`
11 | `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` | 0 | See full audit output below.
12 | `git status --porcelain \| grep -v '^?? tmp/'` (again) | n/a | Identical to the first reading below.

No non-zero exit occurred; no failure excerpt applies.

**Audit's full output (step 11):**
```
setup: The target at . carries a test setup module that no proof covers: tests/setupListeners.ts. Add tests/setupListeners.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.
```

**HEAD (step 1):** `d8b0e65 Adopt the scaffold 0.0.76 vendored floor`

**Status (first, step 1) and status (second, step 12) — identical both times:**
```
 D app/browser/factories.ts
 M app/browser/index.html
 M app/browser/index.ts
 M app/browser/main.ts
 D app/browser/showcases/Showcase.ts
 M app/browser/styles/_shell.scss
 M app/browser/styles/index.scss
 M guides/veneer.md
 M package-lock.json
 M package.json
 D src/browser/color-mode/ColorMode.ts
 M src/browser/constants.ts
 D src/browser/factories.ts
 M src/browser/index.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/app/browser/index.test.ts
 D tests/app/browser/showcases/Showcase.test.ts
 M tests/conformance.test.ts
 M tests/distribution.test.ts
 M tests/guides.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 D tests/src/browser/color-mode/ColorMode.test.ts
 D tests/src/browser/factories.test.ts
 D tests/src/browser/fixtures/constants.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
?? app/browser/Showcase.ts
?? src/browser/ColorMode.ts
?? tests/app/browser/Showcase.test.ts
?? tests/setupListeners.ts
?? tests/src/browser/ColorMode.test.ts
```

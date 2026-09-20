<!-- workflow wf_d2fd9a8e-665, agent a2837bd14903998e0, retained 2026-09-20 -->

All steps ran and passed. Final report follows.

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain \| grep -v '^?? tmp/'` and `git log --oneline -1` | 0 | (see verbatim status below); `d8b0e65 Adopt the scaffold 0.0.76 vendored floor` |
| 2 | `npm run format:check` | 0 | (clean run, no output) |
| 3 | `npm run lint:check` | 0 | (clean run, no output) |
| 4 | `npm run check` | 0 | (clean run, no output) |
| 5 | `npm run build` | 0 | (clean run, no output) |
| 6 | `npm test` | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` / `Duration 487ms` / `EXIT:0` |
| 7 | `npm run test:distribution` | 0 | `Test Files 1 passed (1)` / `Tests 11 passed \| 3 skipped (14)` / `Duration 10.63s` / `EXIT:0` |
| 8 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src` | 0 | `Test Files 4 passed (4)` / `Tests 17 passed (17)` / `Duration 1.70s` / `EXIT:0` |
| 9 | `PLAYWRIGHT_CHANNEL=msedge npm run test:app` | 0 | `Test Files 2 passed (2)` / `Tests 3 passed (3)` / `Duration 1.55s` / `EXIT:0` |
| 10 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` | 0 | `Test Files 7 passed (7)` / `Tests 40 passed (40)` / `Duration 2.69s` / `EXIT:0` |
| 10b | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 19 passed (19)` / `Duration 1.75s` / `EXIT:0` |
| 11 | `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` | 0 | (full output below) |
| 12 | `git status --porcelain \| grep -v '^?? tmp/'` (again) | 0 | (identical to step 1's status, below) |

No non-zero exits occurred; no failure excerpts apply.

**Audit's full output (step 11):**

```
setup: The target at . carries a test setup module that no proof covers: tests/setupListeners.ts. Add tests/setupListeners.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.
```

**Both status readings verbatim (steps 1 and 12, identical):**

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

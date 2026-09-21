<!-- workflow wf_e37cd732-c28, agent a4abcdb6eac6f17a0, label unknown, retained 2026-09-21 -->

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain --untracked-files=all \| grep -v '^?? tmp/'` + `git log --oneline -1` | 0 | `M guides/veneer.md`, `M tests/setupBrowser.test.ts`, `M tests/setupBrowser.ts`, `M tests/setupConformance.test.ts`, `M tests/setupConformance.ts`, `M tests/setupStyles.test.ts`, `M tests/setupStyles.ts`; `060ce02 Give the mode control one affordance and shoot the pointer frames settled (U7f-fix)` |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format. Finished in 788ms on 96 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` (no findings reported) |
| 4 | `npm run check` | 0 | `npm notice run @orkestrel/veneer@0.0.1 check:app:browser` / `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json` (no errors emitted) |
| 5 | `npm run build` | 0 | `✓ built in 381ms` (app/browser) |
| 6 | `npm run test:setup` | 0 | `Test Files 3 passed (3)` / `Tests 124 passed (124)` |
| 7 | `npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 31 passed (31)` |
| 8 | `npm run test:conformance` | 0 | `Test Files 1 passed (1)` / `Tests 8 passed (8)` |
| 9 | `npm run test:src:styles` | 0 | `Test Files 9 passed (9)` / `Tests 104 passed (104)` |
| 10 | `npm run test:app:browser` | 0 | `Test Files 3 passed (3)` / `Tests 11 passed (11)` |
| 11 | `npm run test:journey` | 0 | `Test Files 4 passed (4)` / `Tests 84 passed \| 4 skipped (88)` |
| 12 | `npm run test:guides` | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` |
| 13 | `npm test` (background, logged to `tmp/npmtest-cl1.log.txt`) | 0 | `Tests 18 passed (18)` (guides, last sub-run) / `EXITCODE:0` / `===DONE===` |
| 14 | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 31 passed (31)` |
| 15 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` | 0 | `Test Files 9 passed (9)` / `Tests 104 passed (104)` |
| 16 | `PLAYWRIGHT_CHANNEL=msedge npm run test:journey` (background, logged to `tmp/edge-journey-cl1.log.txt`) | 0 | `Test Files 4 passed (4)` / `Tests 84 passed \| 4 skipped (88)` / `EXITCODE:0` |
| 17 | `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` | 0 | see full output below |
| 18 | `git status --porcelain --untracked-files=all \| grep -v '^?? tmp/'` (again) | 0 | same seven modified files as step 1 |

No non-zero exits occurred; no failure excerpts to report.

**Step 17 full audit output:**
```
setup: The target at . carries a test setup module that no proof covers: tests/setupListeners.ts. Add tests/setupListeners.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.
```

**Step 1 status (verbatim):**
```
 M guides/veneer.md
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```
HEAD: `060ce02 Give the mode control one affordance and shoot the pointer frames settled (U7f-fix)`

**Step 18 status (verbatim):**
```
 M guides/veneer.md
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

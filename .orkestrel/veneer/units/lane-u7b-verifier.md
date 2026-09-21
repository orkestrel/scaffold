<!-- workflow wf_5e2e7998-7dd, agent a563b03a30b43dbef, label unknown, retained 2026-09-20 -->

Unchanged from the baseline reading, matching the "write nothing except the npm test log under tmp/" constraint. All steps complete.

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain --untracked-files=all \| grep -v '^?? tmp/'` + `git log --oneline -1` | 0 | See status block below; HEAD `91e5906 Retire the paint wrappers and settle the setup modules' pins and refusals` |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 769ms on 94 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` (no violations) |
| 4 | `npm run check` | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json` (no errors emitted) |
| 5 | `npm run build` | 0 | `✓ built in 368ms` (final app browser build) |
| 6 | `npm run test:src:browser` | 0 | `Test Files 6 passed (6)` / `Tests 36 passed (36)` |
| 7 | `npm run test:setup` | 0 | `Test Files 3 passed (3)` / `Tests 110 passed (110)` |
| 8 | `npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 15 passed (15)` |
| 9 | `npm run test:guides` | 1 | See failure excerpt below |
| 10 | `npm test` | 1 | Fails on the `test:guides` sub-run; every earlier sub-run (`test:src`, `test:app`, `test:journey`, `test:policy`, `test:config`, `test:setup`, `test:setup:browser`, `test:conformance`) passed |
| 11 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` | 0 | `Test Files 6 passed (6)` / `Tests 36 passed (36)` |
| 12 | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | `Test Files 1 passed (1)` / `Tests 15 passed (15)` |
| 13 | `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` | 0 | See full output below |
| 14 | `git status --porcelain --untracked-files=all \| grep -v '^?? tmp/'` (again) | 0 | Identical to step 1's reading |

**Failure excerpt (steps 9 and 10, `tests/guides.test.ts:81:67`, in the `documents every barrel export` case):**

```
AssertionError: expected [ 'class AppError', …(17) ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "class AppError",
+   "const BUTTON_ACTIVE",
+   "const BUTTON_SELECTOR",
+   "const BUTTON_TOGGLE",
+   "class Button",
+   "interface ButtonDetail",
+   "interface ButtonEventMap",
+   "interface ButtonHooks",
+   "interface ButtonInterface",
+   "interface ButtonOptions",
+   "class Delegate",
+   "interface DelegateInterface",
+   "interface DelegateOptions",
+   "function bindEventMap",
+   "function emitEvent",
+   "function isAppError",
+   "function isButtonEvent",
+   "function isButtonHost",
+ ]

 ❯ tests/guides.test.ts:81:67
Test Files  1 failed (1)
     Tests  1 failed | 17 passed (18)
```

**Audit output (step 13, full):**

```
setup: The target at . carries a test setup module that no proof covers: tests/setupListeners.ts. Add tests/setupListeners.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.
```

**Status reading, step 1 and step 14 (identical, verbatim):**

```
AM src/browser/Button.ts
A  src/browser/Delegate.ts
 M src/browser/constants.ts
A  src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M src/core/index.ts
AM tests/src/browser/Button.test.ts
A  tests/src/browser/Delegate.test.ts
A  tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
 M tests/src/core/index.test.ts
?? src/core/errors.ts
?? tests/src/core/errors.test.ts
```

<!-- workflow wf_15472760-4e5, agent a12384f5e871306f7, retained 2026-09-20 -->

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1a | `git status --porcelain \| grep -v '^?? tmp/'` | 0 | ` M configs/src/vite.styles.config.ts`, ` M package.json`, ` M tests/setupStyles.ts` |
| 1b | `git log --oneline -1` | 0 | `a05e9ff Bring the browser tree to the fleet's placement, naming, and test rules (U1-conform)` |
| 2a | `npm run clean` | 0 | removed `dist/`, no error output |
| 2b | `ls dist` | 2 (expected) | `ls: cannot access 'dist': No such file or directory` |
| 3 | `npm run test:setup` (no `dist/`) | 1 (expected) | see failure excerpt following |
| 4 | `npm run test:conformance` (no `dist/`) | 0 | `Test Files 1 passed (1)`, `Tests 6 passed (6)` |
| 5 | `npm run format:check` | 0 | `All matched files use the correct format.` |
| 6 | `npm run lint:check` | 0 | no output beyond command echo (no lint errors) |
| 7 | `npm run check` | 0 | last command run: `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`, no errors printed |
| 8 | `npm run build` | 0 | `dist/app/browser/assets/index-D2JnOl_e.js 2.31 kB │ gzip: 0.96 kB`, `✓ built in 333ms` |
| 9 | `npm run test:src` | 0 | `Test Files 7 passed (7)`, `Tests 40 passed (40)`; projects reported: `src:core`, `src:browser` (single `vitest` invocation with both `--project` flags), then `src:styles` run separately through `npm run test:src:styles` (its own `configs/src/vite.styles.config.ts` invocation) |
| 10 | `npm test` (background, log `tmp/npm-test.log`) | 0 | `Test Files 1 passed (1)`, `Tests 18 passed (18)` (final sub-step `test:guides`) |
| 11 | `npm run test:distribution` (background, log `tmp/test-distribution.log`) | 0 | `Test Files 1 passed (1)`, `Tests 11 passed \| 3 skipped (14)` |
| 12 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` | 0 | `Test Files 7 passed (7)`, `Tests 40 passed (40)` |
| 13 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src` | 0 | `Test Files 7 passed (7)`, `Tests 40 passed (40)` |
| 14 | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | `Test Files 1 passed (1)`, `Tests 19 passed (19)` |
| 15 | `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` | 0 | see full output following |
| 16 | `git status --porcelain \| grep -v '^?? tmp/'` | 0 | ` M configs/src/vite.styles.config.ts`, ` M package.json`, ` M tests/setupStyles.ts` |

Failure excerpt, step 3 (`npm run test:setup`, exact match to expected: exactly two cases red, both in `tests/setupStyles.test.ts`, all other cases green):

```
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |setup| tests/setupStyles.test.ts > styles setup > requires the directional outputs from npm run build:src:styles
AssertionError: expected false to be true // Object.is equality
 ❯ tests/setupStyles.test.ts:167:51
   expect(existsSync('dist/src/styles/index.css')).toBe(true)

 FAIL  |setup| tests/setupStyles.test.ts > styles setup > ships an RTL cascade that needs no flipping, over a cascade that declares treatments
Error: ENOENT: no such file or directory, open 'C:\Users\mikes\WebstormProjects\veneer\dist\src\styles\index.css'
 ❯ tests/setupStyles.test.ts:318:15

 Test Files  1 failed | 2 passed (3)
      Tests  2 failed | 82 passed (84)
```

Step 15 full audit output:

```
setup: The target at . carries a test setup module that no proof covers: tests/setupListeners.ts. Add tests/setupListeners.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.
```

Both status readings (step 1a and step 16), verbatim:

```
 M configs/src/vite.styles.config.ts
 M package.json
 M tests/setupStyles.ts
```

Both readings are identical: the working tree carries only the three expected U-styles-config modifications, unchanged before and after the gate run.

<!-- workflow wf_58c8653a-2ff, agent a49511f5ea6883853, label unknown, retained 2026-09-20 -->

Now I have everything needed for the report.

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain \| grep -v '^?? tmp/'` + `git log --oneline -1` | 0 | see status readings below; HEAD `12e1bd6 Ship Button's cascade with its deferral partition and shipped rows (U7a)` |
| 2 | `npm run format:check` | 0 | All matched files use the correct format. Finished in 853ms on 86 files using 16 threads. |
| 3 | `npm run lint:check` | 0 | oxlint ran, no findings printed, clean exit |
| 4 | `npm run check` | 0 | last line: `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` (no errors emitted) |
| 5 | `npm run build` | 0 | `dist/app/browser/assets/index-Bn7H1o_M.js 2.31 kB │ gzip: 0.96 kB` / `✓ built in 348ms` |
| 6 | `npm run test:config` | 0 | Test Files 1 passed (1); Tests 173 passed \| 1 skipped (174) |
| 7 | `npm run test:setup` | 0 | Test Files 3 passed (3); Tests 110 passed (110) |
| 8 | `npm run test:setup:browser` (Chromium) | 0 | Test Files 1 passed (1); Tests 15 passed (15) |
| 9 | `npm run test:src:styles` (Chromium) | 0 | Test Files 9 passed (9); Tests 104 passed (104) |
| 10 | `npm run test:conformance` | 0 | Test Files 1 passed (1); Tests 8 passed (8) |
| 11 | `npm test` (whole chain) | 0 | Final sub-run `test:guides`: Test Files 1 passed (1); Tests 18 passed (18) |
| 12 | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | Test Files 1 passed (1); Tests 15 passed (15) |
| 13 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` | 0 | Test Files 9 passed (9); Tests 104 passed (104) |
| 14 | `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` | 1 | see full output below |
| 15 | `git status --porcelain \| grep -v '^?? tmp/'` again | 0 | see status readings below |

Failure excerpt (step 14, only non-zero exit) — full audit output:

```
setup: The target at . carries a test setup module that no proof covers: tests/setupListeners.ts. Add tests/setupListeners.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
┌────────────────┬─────────┬───────┐
│ path           │ group   │ drift │
├────────────────┼─────────┼───────┤
│ vite.config.ts │ configs │ stale │
└────────────────┴─────────┴───────┘
1 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.
```

Status reading 1 (before the run):

```
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/elements/body.test.ts
 M tests/src/styles/integration.test.ts
 M tests/src/styles/mixins.test.ts
 M tests/src/styles/theme.test.ts
 M tests/src/styles/tokens.test.ts
 M vite.config.ts
```

Status reading 2 (after the run, step 15):

```
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/elements/body.test.ts
 M tests/src/styles/integration.test.ts
 M tests/src/styles/mixins.test.ts
 M tests/src/styles/theme.test.ts
 M tests/src/styles/tokens.test.ts
 M vite.config.ts
```

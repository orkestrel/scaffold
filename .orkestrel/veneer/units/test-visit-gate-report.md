# test-visit-gate — verifier report (native Sonnet), 2026-09-20

Checkout `C:/Users/mikes/WebstormProjects/test` after the 0.0.76 re-pin, the declared
`test:setup:browser` script, the repaired planned paths, and the catalog refresh.

| Step | Command | Exit | Final lines |
| --- | --- | --- | --- |
| 1 | `git status --porcelain \| grep -v '^??'` | — | `.claude/agents/orkestrel.md`, `configs/browsers.ts`, `guides/scaffold.md`, `package-lock.json`, `package.json`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `vite.config.ts` |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 1142ms on 60 files` |
| 3 | `npm run lint:check` | 0 | no diagnostics |
| 4 | `npm run check` | 0 | every scoped `tsc --noEmit` clean |
| 5 | `npm run build` | 0 | `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts` |
| 6 | `npm test` | 1 | chain stopped at `test:setup:browser`: `tests/setupBrowser.test.ts:23 > buildFixture > refuses to run outside a DOM host` — `expected [Function] to throw an error`; `Tests 1 failed \| 2 passed (3)` |
| 7 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` | 0 | `Test Files 2 passed (2)` / `Tests 349 passed \| 2 expected fail (351)` |
| 8 | `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 1 | the same case, the same excerpt (the label prints `chromium` for the Edge channel) |
| 9 | `npm run test:distribution -- --mode release` | 0 | `Test Files 1 passed (1)` / `Tests 11 passed \| 4 skipped (15)` |
| 10 | `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` | 0 | `0 of 45 planned paths drifted from the plan.` |
| 11 | `git status --porcelain \| grep -v '^??'` | — | identical to step 1 |

Orchestrator's reading: the one red is the 0.0.52 Node-importability workaround in
`tests/setupBrowser.ts` meeting the planned browser `setup:browser` project; carried by
`units/test-setup-browser-brief.md` (`builder`).

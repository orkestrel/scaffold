# U6-gate report, round 6 (verifier, native Sonnet, through workflow wf_49b909a9-824, 2026-09-20)

Gate tree unchanged after all commands, matching the initial status. Now compiling the report.

## Gate report — Test checkout (`HEAD f49bc7f` + U6 working-tree diff)

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain` / `git diff --stat` | — | `M guides/test.md`, `M src/browser/constants.ts`, `M src/browser/helpers.ts`, `M src/browser/types.ts`, `M tests/setup.ts`, `M tests/src/browser/helpers.test.ts`; diffstat: `6 files changed, 1141 insertions(+), 78 deletions(-)` |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 1390ms on 60 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` (no findings printed) |
| 4 | `npm run check` | 0 | ran `tsc --noEmit` for root, `check:src:core`, `check:src:browser`, `check:src:server` — all completed with no diagnostics |
| 5 | `npm run build` | 0 | `✓ built in 103ms`; API Extractor advisory: `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.`; `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts` |
| 6 | `npm test` (managed Chromium, whole chain) | 0 | `test:src` ran `src:core`, `src:browser`, `src:server` projects (with the expected `Boom`/`Refused`/`Ignored` journal-fixture lines); `test:policy`, `test:config`, `test:setup` all passed; `test:guides`: `Test Files 1 passed (1)` / `Tests 50 passed | 1 skipped (51)` |
| 7a | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` (reading 1) | 0 | `Test Files 2 passed (2)` / `Tests 349 passed \| 2 expected fail (351)` / `Duration 28.31s` |
| 7b | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` (reading 2) | 0 | `Test Files 2 passed (2)` / `Tests 349 passed \| 2 expected fail (351)` / `Duration 28.60s` |
| 8 | `node ../scaffold/dist/bin/main.js audit --target .` | 1 | see verbatim block below |
| 9 | `ls dist/src/browser` | 0 | `index.d.ts`, `index.js`, `index.js.map` |
| 10 | `grep -c "hoverAccessible\|holdAccessible\|releasePointer\|stageMedia\|releaseMedia\|sendProtocol" dist/src/browser/index.d.ts` | 0 | `21` |
| 11 | `git status --porcelain` (again) | — | `M guides/test.md`, `M src/browser/constants.ts`, `M src/browser/helpers.ts`, `M src/browser/types.ts`, `M tests/setup.ts`, `M tests/src/browser/helpers.test.ts` (unchanged from step 1) |

**Failure excerpt (step 8, `scaffold audit`, exit 1) — verbatim:**
```
guides: The mirror at guides/scaffold.md differs from the hosted guide. Run catalog to refresh it.
scripts: The manifest at . does not declare a planned script: test:setup:browser. Add this exact script line to package.json: "test:setup:browser": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser",
projects: the manifest at . does not reach a Vitest project the planned configuration registers: setup:browser. No chain from test or prepublishOnly invokes it. test:setup:browser is not declared, so the script is missing as well as the gate: declare it and invoke it by name from the test or prepublishOnly chain.
dependencies: @types/node declares the floor ^26.6.1, while the registry serves 26.6.2 within major 26.
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
┌──────────────────────┬─────────┬───────┐
│ path                 │ group   │ drift │
├──────────────────────┼─────────┼───────┤
│ vite.config.ts       │ configs │ stale │
│ configs/browsers.ts  │ configs │ stale │
│ tests/setupPolicy.ts │ tests   │ stale │
│ tests/policy.test.ts │ tests   │ stale │
│ tests/config.test.ts │ tests   │ stale │
└──────────────────────┴─────────┴───────┘
5 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
@orkestrel/scaffold: ^0.0.73 differs from ^0.0.75.
```
Suspected owning files: `guides/scaffold.md` (mirror drift), `package.json` (missing `test:setup:browser` script and stale `@orkestrel/scaffold` pin), `vite.config.ts`, `configs/browsers.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts` (vendored-path drift).

**Browser user agent line from the Edge run:** not printed by the dot reporter (neither step 7a nor step 7b emitted a user-agent line; confirmed absent by `grep -in "user.agent\|edge\|msedge"` over both logs).

**Overall verdict:** RED — step 8 (`scaffold audit`) failed with exit code 1. Every other step (1-7, 9-11) exited 0 and the working tree was identical before and after the full chain (`git status --porcelain` unchanged). First place to look: `package.json`'s `@orkestrel/scaffold` pin (`^0.0.73` vs. registry `^0.0.75`) and the missing `test:setup:browser` script/gate.

**Anomalies:** none — no flakes, no cache weirdness. Both `PLAYWRIGHT_CHANNEL=msedge` readings (step 7a, step 7b) returned identical pass counts (`349 passed | 2 expected fail`) and exit code 0, with only duration varying (28.31s vs. 28.60s).
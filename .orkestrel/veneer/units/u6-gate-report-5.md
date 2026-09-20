# U6-gate report, round 5 (verifier, native Sonnet, through workflow wf_f0069556-a45, 2026-09-20)

All steps complete, tree unchanged.

## Gate Report

| Step | Command | Exit | Final lines |
|------|---------|------|--------------|
| 1a | `git status --porcelain` | — | `M guides/test.md`, `M src/browser/constants.ts`, `M src/browser/helpers.ts`, `M src/browser/types.ts`, `M tests/setup.ts`, `M tests/src/browser/helpers.test.ts` |
| 1b | `git diff --stat` | — | `guides/test.md \| 285 +++++++++++++++-----`, `src/browser/constants.ts \| 18 ++`, `src/browser/helpers.ts \| 373 ++++++++++++++++++++++++++-`, `src/browser/types.ts \| 8 +`, `tests/setup.ts \| 3 +`, `tests/src/browser/helpers.test.ts \| 529 +++++++++++++++++++++++++++++++++++++-`, `6 files changed, 1138 insertions(+), 78 deletions(-)` |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 4079ms on 60 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` (no violations reported) |
| 4 | `npm run check` | 0 | `npm notice run tsc --noEmit -p configs/src/tsconfig.server.json` (last invoked project, no errors) |
| 5 | `npm run build` | 0 | `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts` |
| 6 | `npm test` (full chain, managed Chromium) | 0 | `Test Files 1 passed (1)` / `Tests 50 passed \| 1 skipped (51)` / `Duration 1.16s` (last sub-suite: `test:guides`) |
| 7a | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` (first run) | 0 | `Test Files 2 passed (2)` / `Tests 349 passed \| 2 expected fail (351)` / `Duration 28.67s` |
| 7b | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` (second run) | 0 | `Test Files 2 passed (2)` / `Tests 349 passed \| 2 expected fail (351)` / `Duration 28.66s` |
| 8 | `node ../scaffold/dist/bin/main.js audit --target .` | 1 | see verbatim `audit` lines following |
| 9 | `ls dist/src/browser` | 0 | `index.d.ts`, `index.js`, `index.js.map` |
| 10 | `grep -c "hoverAccessible\|holdAccessible\|releasePointer\|stageMedia\|releaseMedia\|sendProtocol" dist/src/browser/index.d.ts` | 0 | `21` |
| 11 | `git status --porcelain` (final) | — | `M guides/test.md`, `M src/browser/constants.ts`, `M src/browser/helpers.ts`, `M src/browser/types.ts`, `M tests/setup.ts`, `M tests/src/browser/helpers.test.ts` |

**Failure excerpt — Step 8 (`scaffold audit`, exit 1), verbatim:**
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
Suspected owning file(s): `C:/Users/mikes/WebstormProjects/test/package.json` (missing `test:setup:browser` script and its chain wiring), `C:/Users/mikes/WebstormProjects/test/guides/test.md` (mirror drift), `C:/Users/mikes/WebstormProjects/test/vite.config.ts`, `C:/Users/mikes/WebstormProjects/test/configs/browsers.ts`, `C:/Users/mikes/WebstormProjects/test/tests/setupPolicy.ts`, `C:/Users/mikes/WebstormProjects/test/tests/policy.test.ts`, `C:/Users/mikes/WebstormProjects/test/tests/config.test.ts`.

**Browser user agent line (Edge run, first pass, `PLAYWRIGHT_CHANNEL=msedge`):** not printed by the dot reporter.

**Browser user agent line (Edge run, second pass, `PLAYWRIGHT_CHANNEL=msedge`):** not printed by the dot reporter.

**Overall verdict:** RED. Nine of ten gates passed; step 8 (`scaffold audit`) exited 1 on `dependencies` major-version advisories (informational per brief) plus non-informational `guides`, `scripts`, `projects`, and path-drift findings against `package.json` and the five listed files. First place to look: `C:/Users/mikes/WebstormProjects/test/package.json`, missing the `test:setup:browser` script.

**Anomalies:** none. The `Boom`, `Refused`, and `Ignored` lines and the stack frame shown mid-run in the Edge logs came from the journal fixture per the brief's standing conditions, not a failure. Both Edge runs produced identical readings (349 passed, 2 expected fail, exit 0); neither printed a user-agent line under the dot reporter. Final `git status --porcelain` matches the initial reading; the gates left the tree unchanged.
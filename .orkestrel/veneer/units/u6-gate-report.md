# U6-gate report (verifier, native Sonnet, 2026-09-20, 127 s)

Test checkout, HEAD `f49bc7f`, U6 working-tree diff (six files, 730 insertions, 9 deletions).

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain` / `git diff --stat` | — | `guides/test.md`, `src/browser/constants.ts`, `src/browser/helpers.ts`, `src/browser/types.ts`, `tests/setup.ts`, `tests/src/browser/helpers.test.ts` |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 1169ms on 60 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | No diagnostics reported |
| 4 | `npm run check` | 0 | `tsc --noEmit -p configs/src/tsconfig.server.json` completed with no output |
| 5 | `npm run build` | 0 | `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts` |
| 6 | `npm test` | 0 | `test:src` 603 passed, 2 expected fail, 9 skipped (614); `test:policy` 173 passed, 1 skipped; `test:config` 24 passed; `test:setup` 24 passed; `test:guides` 50 passed, 1 skipped |
| 7 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` | 0 | `Test Files 2 passed (2)` / `Tests 340 passed | 2 expected fail (342)`; engine `HeadlessChrome/153.0.0.0 ... Edg/153.0.0.0` |
| 8 | `node ../scaffold/dist/bin/main.js audit --target .` | 1 | see the verbatim block |
| 9 | `ls dist/src/browser` | 0 | `index.d.ts`, `index.js`, `index.js.map` |
| 10 | `grep -c "hoverAccessible\|holdAccessible\|releasePointer\|stageMedia\|releaseMedia\|sendProtocol" dist/src/browser/index.d.ts` | 0 | `21` |
| 11 | `git status --porcelain` (final) | — | identical to step 1 |

## Step 8, `scaffold audit`, verbatim

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

Orchestrator's reading: the audit's red is the checkout's standing terrain (Test 0.0.18 released
against scaffold `^0.0.73`; the vendored paths and the `setup:browser` gate moved in scaffold
0.0.75), none of it touched by U6. The Test release visit (re-pin, `repair`, gates) owns it and
runs before Test publishes.

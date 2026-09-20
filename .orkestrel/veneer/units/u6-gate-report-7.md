# U6-gate report, round 7 (verifier, native Sonnet, through workflow wf_8ec26ff3-b73, 2026-09-20)

Final `git status --porcelain` matches the initial state exactly — the gates did not change the tree.

Gate Report — Test checkout (`HEAD f49bc7f` + uncommitted U6 diff)

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain` / `git diff --stat` | — | 6 files modified: `guides/test.md`, `src/browser/constants.ts`, `src/browser/helpers.ts`, `src/browser/types.ts`, `tests/setup.ts`, `tests/src/browser/helpers.test.ts`; 1145 insertions(+), 78 deletions(-) |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` `Finished in 1146ms on 60 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` (no warnings) |
| 4 | `npm run check` | 0 | `tsc --noEmit -p configs/src/tsconfig.server.json` (core, browser, server all clean) |
| 5 | `npm run build` | 0 | `✓ built in 97ms` — API Extractor TypeScript-version advisory printed (not a failure), `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts` |
| 6 | `npm test` (managed Chromium) | 0 | `Test Files 7 passed (7)` `Tests 612 passed \| 2 expected fail \| 9 skipped (623)` (src) plus policy/config/setup/guides suites all passed; `Boom`/`Refused`/`Ignored` journal-fixture lines printed, not failures |
| 7a | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` (run 1) | 0 | `Test Files 2 passed (2)` `Tests 349 passed \| 2 expected fail (351)` |
| 7b | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` (run 2) | 0 | `Test Files 2 passed (2)` `Tests 349 passed \| 2 expected fail (351)` |
| 8 | `node ../scaffold/dist/bin/main.js audit --target .` | 1 | see verbatim block below |
| 9 | `ls dist/src/browser` | 0 | `index.d.ts` `index.js` `index.js.map` |
| 10 | `grep -c "hoverAccessible\|holdAccessible\|releasePointer\|stageMedia\|releaseMedia\|sendProtocol" dist/src/browser/index.d.ts` | 0 | `21` |
| 11 | `git status --porcelain` (again) | — | identical to step 1: same 6 files, nothing else |

Non-zero exit excerpt (step 8, `scaffold audit`, verbatim):

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

`git status --porcelain` (step 1 and step 11, identical, verbatim):

```
 M guides/test.md
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M tests/setup.ts
 M tests/src/browser/helpers.test.ts
```

`ls dist/src/browser` (verbatim):

```
index.d.ts
index.js
index.js.map
```

`grep -c` reading (verbatim): `21`

Browser user agent line from the Edge run: not printed by the dot reporter (checked both Edge runs; the same holds for the managed-Chromium run inside step 6).
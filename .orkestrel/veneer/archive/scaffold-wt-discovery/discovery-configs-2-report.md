Implemented the census repair and explicit browser instance names. The required scoped gates pass; `npm test` remains red on timeout failures in unchanged tests that pass alone. Verification ran on Windows with Node 24.21.0 and Vitest 4.1.11 on 2026-10-03.

The commits, in order, are:

- `e7bf576a899dd235777d9112becab4e56ab47c71` — fix discovery gates within each config listing.
- `24524868932b68fcceffb2ada3a91c026403080b` — fix generated browser instance names across configs.

The red and green commands were:

```text
D: node node_modules/vitest/vitest.mjs run --config vite.config.ts --project skills tests/agents/skills/orkestrel-harden/scripts/discovery.test.ts
T: node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/templates.test.ts -t "gives a generated browser instance the same name"
C: node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/templates.test.ts tests/src/core/compilers.test.ts
```

The item results are:

| Item | Change | Red → green evidence |
| --- | --- | --- |
| 2 | Removed the shared-file gate bridge and foreign unfiltered-gate clause. Restored `gates.files`. Folded names using each listing's own gates before deduplication. | D: shared-file, cross-unit folding, deduplication, and wrapper cases failed before the repair; all pass afterward. The duplicate-name fixture changed from 4 reported tests to the correct 2. |
| 3 | Rewrote the wrapper expectation to report `ungated`; added shared-file and folding regressions. Retained the second-config, mode, union, unfiltered-gate proofs, and orphan control. | D on `81ac20857` with the revised tests: 6 failed, 13 passed, exit 1. After repair: 19 passed, exit 0. |
| 5 | Updated the opening comment and skill to state listing-local gating, folding, deduplication, direct-file gates, default mode, and `npm run X -- args` forwarding. | D supplies the behavioral red/green evidence; final policy and guide gates pass. No separate prose-only red claim. |
| O1 | Asserted the `browser` and `server` row gates in the union proof; the `core` gate assertion remains. | D: the strengthened union proof passes before and after the repair. This closes an assertion gap, not a reproduced implementation failure. |
| O2 | Recognized command basenames `vitest`, `vitest.mjs`, and `vitest.js`. | D: the real `node node_modules/vitest/vitest.mjs run --project core` fixture failed before and passes afterward. |
| O3 | Canonicalized explicit `--mode test` to the default mode. | D: the config recorder changed from 2 listings to 1; the case failed before and passes afterward. |
| 4 | Named emitted browser instances from their project label and browser. Renamed inherited Vue and journey instances. Updated config assertions, emitted-text expectations, the guide, and inventory. | T: 1 failed before, showing `[object Object] (chromium)`; 1 passed after, with 39 unrelated tests filtered out in both runs. Root and wrapper listings agree on `src:browser (chromium)`; discovery reports one gated row with 1 file and 1 test. C: final 234 passed. |

Vitest's installed declaration exposes `BrowserInstanceOption.name?: string` in `node_modules/vitest/dist/chunks/reporters.d.DtoKVV2s.d.ts:1574`. Its implementation preserves explicit instance names in `node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:10356` and `:14253`. The live generated-workspace proof drives those implementations.

Veneer's census ran from `C:/Users/mikes/WebstormProjects/veneer` with:

```text
node C:/Users/mikes/WebstormProjects/scaffold-wt-discovery/.agents/skills/orkestrel-harden/scripts/discovery.ts --json
```

It exited 3. The JSON records 9 distinct config/mode units, no empty gated projects, no undiscovered files, and `probe` as an empty workbench. The recorded rows are:

| Project | Files | Tests | Gate |
| --- | ---: | ---: | --- |
| `[object Object] (chromium)` | 6 | 34 | `test > test:app:vue` |
| `app:browser` | 8 | 226 | `test > test:app` |
| `app:core` | 1 | 1 | `test > test:app` |
| `app:vue (chromium)` | 1 | 1 | ungated |
| `config` | 1 | 227 | `test > test:config` |
| `conformance` | 1 | 117 | `test > test:conformance` |
| `distribution` | 1 | 17 | `prepublishOnly > test:distribution` |
| `guides` | 1 | 15 | `test > test:guides` |
| `integration` | 1 | 54 | `test > test:integration` |
| `journey:dark-1280 (chromium)` | 2 | 19 | `test > test:journey:vue` |
| `journey:dark-390 (chromium)` | 2 | 14 | `test > test:journey:vue` |
| `journey:light-1280 (chromium)` | 2 | 14 | `test > test:journey:vue` |
| `journey:light-390 (chromium)` | 2 | 17 | `test > test:journey:vue` |
| `policy` | 1 | 119 | `test > test:policy` |
| `probe` | 0 | 0 | `test:probe` |
| `setup` | 2 | 149 | `test > test:setup` |
| `setup:browser` | 2 | 102 | `test > test:setup:browser` |
| `src:bootstrap (chromium)` | 1 | 14 | ungated |
| `src:browser` | 26 | 787 | `test > test:src` |
| `src:core` | 2 | 14 | `test > test:src` |
| `src:styles (chromium)` | 2 | 15 | ungated |
| `src:tailwindcss (chromium)` | 1 | 3 | ungated |
| `src:vue (chromium)` | 1 | 1 | ungated |

The census markers were `tests/config.test.ts` (`.skipIf(` ×4, `timeout:` ×2), `tests/distribution.test.ts` (`.skip(` ×2, `.runIf(` ×4), `tests/policy.test.ts` (`.skipIf(` ×1), `tests/setupBrowser.test.ts` (`timeout:` ×1), and `tests/src/styles/index.test.ts` (`.todo(` ×1). Raw evidence is in `tmp/codex/discovery-configs-2-veneer.json`.

The final gate results are:

| Command | Census commit | Config commit |
| --- | --- | --- |
| `npm run format:check` | exit 0 | exit 0 |
| `npm run lint:check` | exit 0 | exit 0 |
| `npm run check` | exit 0 | exit 0 |
| `npm run test:skills` | exit 0; 74 passed | exit 0; 74 passed |
| `npm run test:policy` | exit 0; 120 passed | exit 0; 120 passed |
| `npm run test:guides` | exit 0; 45 passed | exit 0; 45 passed |
| `npm run test:config` | exit 0; 227 passed, 1 skipped | exit 0; 227 passed, 1 skipped |
| `npm run build` | exit 0; inventory regenerated | exit 0; ran before `npm test` |
| `npm test` | not required | exit 1; timeout failures in the following table |
| `git diff --check` | exit 0 | exit 0 |

The full-chain observations are:

| Run journal under `tmp/codex/` | Passing projects before the failure | Failing project |
| --- | --- | --- |
| `discovery-configs-2-gates-2.log` | core: 508 passed; server: 480 passed, 7 skipped; bin: 300 passed; policy: 120 passed; config: 227 passed, 1 skipped | setup: 1 failed, 204 passed, 3 skipped |
| `discovery-configs-2-test-final.log` | none | core: 1 failed, 507 passed |
| `discovery-configs-2-test-retry.log` | core: 508 passed; server: 480 passed, 7 skipped | bin: 1 failed, 299 passed |

Each chain stopped at its failing project. The independently required skills and guides gates passed as recorded in the gate table. The census commit's final gate journal is `tmp/codex/discovery-configs-2-build-1.log`; each journal's sibling `.err` file records stderr and exit status.

Deviation in the predicted census: the brief predicts that veneer's `[object Object] (chromium)` row is ungated. Its unfiltered wrapper gates actually list that name, so the requested listing-local rule gates it. The five correctly labelled root rows remain ungated; veneer received no config edits.

Additional validation: commit 1 required a build to regenerate `host.json`. The preliminary config gate reported 1 failure, 226 passes, and 1 skip for stale inventory; the standalone inventory command failed because `dist` was absent. An interrupted preliminary gate run is excluded from the final results. The generated Vue/journey typecheck initially reported 2 failing cases for optional instance arrays; C passes after the correction.

The full test chain encountered 5-second setup and compiler timeouts, and a 15-second CLI timeout. Each unchanged case passed when run alone:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project setup tests/setupServer.test.ts -t "answers the supplied inventory and every host-owned path"
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/compilers.test.ts -t "keeps the first matched title and absent-language comparison boundaries"
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:bin tests/src/bin/CLI.test.ts -t "makes offline audit answer drift alone and offline repair match a forced floor write"
```

The isolated setup, compiler, and CLI runs each reported 1 pass, with 81, 193, and 161 unrelated tests filtered out, respectively. No timeout budgets or unrelated behavior were changed. No push, publication, or installation was performed.

Final `git status --porcelain`: empty, exit 0.

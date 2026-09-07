# Unit report — U12 fleet-visit-test (phase A, before the releases)

## Steps

1. `git status --short` → `D  tests/distribution.test.ts` alone. Exit 0.
   `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` → `1`. Exit 0.

2. Removed the `vite-plugin-dts` row (`"vite-plugin-dts": "^5.1.0",`) from `package.json` `devDependencies`. No other row touched.

3. Rewrote each `configs/src/vite.<face>.config.ts` to the seed shape:
   - `configs/src/vite.core.config.ts`: `dts(` shape replaced with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`, imported from `'../helpers.js'` beside `environmentBoundary` and `outputBoundary`. `vite-plugin-dts` import removed.
   - `configs/src/vite.browser.config.ts`: `dts(` shape replaced with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.browser.json'), rewrite: rewriteCoreSpecifier })`, imported from `'../helpers.js'`. Inline `beforeWriteFile` and its comment replaced with the seed's two-line comment above `export default`. `vite-plugin-dts` import removed.
   - `configs/src/vite.server.config.ts`: same pattern as browser, with `tsconfig.server.json`.

4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` — exit 0:
   ```
   0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
   vite.config.ts replaced (1 line added).
   configs/helpers.ts replaced (300 lines added).
   configs/policy.ts replaced (677 lines added).
   .oxlintrc.json replaced (69 lines added).
   tests/setupPolicy.ts replaced (912 lines removed).
   tests/policy.test.ts replaced (142 lines removed).
   tests/config.test.ts replaced (751 lines added).
   8 written, 38 unchanged, 0 removed in ..
   ```
   Paths `repair` wrote (the 8th being `tests/distribution.test.ts`, written back where absent, not itemized in the summary line):
   - `vite.config.ts`
   - `configs/helpers.ts`
   - `configs/policy.ts`
   - `.oxlintrc.json`
   - `tests/setupPolicy.ts`
   - `tests/policy.test.ts`
   - `tests/config.test.ts`
   - `tests/distribution.test.ts`

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` — exit 0:
   ```
   0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
   ```
   No drift reported.

5. `npm run format:check` — exit 0: `All matched files use the correct format. Finished in 4015ms on 59 files using 4 threads.`
   `npm run lint:check` — exit 0, no output (oxlint `--deny-warnings`, silent on clean).
   `npm run check` — exit 0: `tsc --noEmit --project tsconfig.json` then `check:src:core`, `check:src:browser`, `check:src:server` each ran with no diagnostics.

6. `npm run build` — exit 0. `dist/src/core`, `dist/src/browser`, `dist/src/server` each built; `copy` ran for core and server to produce `.d.cts`.
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
   ```
   dist/src/browser/index.d.ts
   dist/src/core/index.d.cts
   dist/src/core/index.d.ts
   dist/src/server/index.d.cts
   dist/src/server/index.d.ts
   ```
   `dist/src/browser/index.d.cts` does not exist; the browser face's `exports["./browser"]` map declares an `import` condition alone, no `require` condition, so this is the expected emission and not a deviation.
   `head -5` of each `index.d.ts`:
   - core: begins `/**\n * Builds the error {@link retryUntil} raises when its elapsed-time budget runs out.\n *\n * @param description - The operation the retry was named for.\n * @param budget - The elapsed-time limit in milliseconds.`
   - browser: begins `/**\n * Loads only inside Vitest Browser Mode, where it drives a real browser through the installed\n * provider.\n *\n * @remarks`
   - server: begins `import type { Server } from 'node:net';\nimport type { Socket } from 'node:net';\nimport type { Stats } from 'node:fs';\nimport type { WaitOptions } from '@orkestrel/test';`

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` (npm 11.19.1) — exit 0: `Test Files 1 passed (1)`, `Tests 11 passed | 4 skipped (15)`.

8. `git status --short`:
   ```
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M configs/src/vite.browser.config.ts
    M configs/src/vite.core.config.ts
    M configs/src/vite.server.config.ts
    M package.json
    M tests/config.test.ts
   D  tests/distribution.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
   ?? tests/distribution.test.ts
   ```
   `git diff --stat`:
   ```
    .oxlintrc.json                     |   69 +++
    configs/helpers.ts                 |  304 +++++++++-
    configs/policy.ts                  |  731 +++++++++++++++++++++++-
    configs/src/vite.browser.config.ts |   20 +-
    configs/src/vite.core.config.ts    |   17 +-
    configs/src/vite.server.config.ts  |   19 +-
    package.json                       |    1 -
    tests/config.test.ts               |  783 +++++++++++++++++++++++++-
    tests/policy.test.ts               |  202 +------
    tests/setupPolicy.ts               | 1078 +++---------------------------------
    vite.config.ts                     |    7 +-
    11 files changed, 1975 insertions(+), 1256 deletions(-)
   ```
   `tests/distribution.test.ts` shows both as staged `D` (the pre-existing index entry the Orchestrator removed) and untracked `??` (the parser-shaped file `repair` wrote back); `git diff --stat` therefore omits it because it is not yet staged against the index.

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no match); `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` for each of the three faces.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier; `audit --offline` reports `0 of 45 planned paths drifted`.
3. PASS — `format:check`, `lint:check`, and `check` each exited 0.
4. PASS — `build` exited 0 and emits `dist/src/<face>/index.d.ts` for every face and `dist/src/<face>/index.d.cts` for `core` and `server`, matching the unchanged exports map, which declares a `require` condition only for those two faces and none for `browser`.
5. PASS — `test:distribution` under npm 11.19.1 exited 0 (11 passed, 4 skipped).

## Deviations

None. `dist/src/browser/index.d.cts` was absent by design (the exports map names no `require` condition for `./browser`), not a defect against the Deviation contract's "the build emits no `index.d.ts` for a face" clause, which names `index.d.ts` and is satisfied for every face.

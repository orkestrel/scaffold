# Unit report — U12 fleet-visit-router (phase A, before the releases)

## Steps

1. `git status --short` → `D  tests/distribution.test.ts` alone. `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` → `1`. Both matched the brief's expectation. Exit 0.

2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies` (the `"vite": "^8.2.2",` and `"vitest": "^4.1.11"` rows are now adjacent). No other row touched.

3. Rewrote `configs/src/vite.core.config.ts`, `configs/src/vite.browser.config.ts`, and `configs/src/vite.server.config.ts` to the seed shapes from `src/core/templates.ts` (`vites.src.core`, `vites.src.browser`, `vites.src.server`): each now imports `declarationRollup` (and `rewriteCoreSpecifier` for browser/server) from `'../helpers.js'`, drops the `vite-plugin-dts` import, and drops the inline `beforeWriteFile` rewrite in favor of `declarationRollup({ project, rewrite: rewriteCoreSpecifier })`. Core keeps `declarationRollup({ project, types: ['node'] })` beside `outputBoundary`/`environmentBoundary`.

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
   Paths `repair` wrote (8, the report line above plus `tests/distribution.test.ts` regenerated from absent): `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`.

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` — exit 0:
   ```
   0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
   ```
   No drift reported.

5. `npm run format:check` — exit 0, "All matched files use the correct format." (73 files).
   `npm run lint:check` — exit 0, no output.
   `npm run check` — exit 0 (`tsc --noEmit --project tsconfig.json` then `check:src:core`, `check:src:browser`, `check:src:server`, each clean).

6. `npm run build` — exit 0. `dist/src/core/index.js`, `dist/src/core/index.cjs`, `dist/src/browser/index.js`, `dist/src/server/index.js`, `dist/src/server/index.cjs` emitted; `copy` scripts produced `dist/src/core/index.d.cts` and `dist/src/server/index.d.cts` from their respective `.d.ts` files.

   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
   ```
   dist/src/browser/index.d.ts
   dist/src/core/index.d.cts
   dist/src/core/index.d.ts
   dist/src/server/index.d.cts
   dist/src/server/index.d.ts
   ```
   `head -5` of each `index.d.ts`:
   - `dist/src/core/index.d.ts` — starts with the emitter type imports (`EmitterErrorHandler`, `EmitterHooks`, `EmitterInterface`), then a JSDoc block.
   - `dist/src/browser/index.d.ts` — starts with the emitter and router type imports, with `RouteEntry`/`RouterInterface` sourced from `@orkestrel/router` (the `rewriteCoreSpecifier` rewrite is in effect: no relative `core/index` specifier remains).
   - `dist/src/server/index.d.ts` — starts with `DispatcherInterface` from `@orkestrel/router` and `IncomingMessage`/`ServerResponse` from `node:http`, then a JSDoc block.

   `dist/src/browser/index.d.cts` was not produced, matching the unchanged exports map, which declares no `require` condition for `./browser`.

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` (npm 11.19.1) — exit 0:
   ```
   Test Files  1 passed (1)
        Tests  11 passed | 4 skipped (15)
   ```

8. Final `git status --short`:
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
    M vite.config.ts
   ?? tests/distribution.test.ts
   ```
   (The `D`/`??` pair on `tests/distribution.test.ts` is the compiler-shaped proof the Orchestrator removed with `git rm` before this unit launched, now replaced on disk by `repair`'s parser-shaped rewrite; it is unstaged, consistent with every other file in this list.)

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

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` printed nothing (exit 1, no matches). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reported one call per face (`vite.core.config.ts:1`, `vite.browser.config.ts:1`, `vite.server.config.ts:1`).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier. `audit --offline` reported no drift.
3. PASS — `format:check`, `lint:check`, and `check` each exited 0.
4. PASS — `build` exited 0 and emitted `dist/src/<face>/index.d.ts` and `dist/src/<face>/index.d.cts` for `core` and `server`; `browser` has no `require` condition in the exports map, so it emits `index.d.ts` only, matching the unchanged exports map.
5. PASS — `test:distribution` under npm 11.19.1 exited 0 (11 passed, 4 skipped).

## Deviations

None. All steps ran as the brief described; no face carried an unrecognized `dts(` shape, `repair`/`audit` reported no drift outside the owned/vendored set, no gate failed outside the owned set, and the build emitted `index.d.ts` for every face.

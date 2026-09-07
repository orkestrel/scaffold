# Unit report — U12 fleet-visit-sse (phase A, before the releases)

## Steps and results

1. `git status --short` → `D  tests/distribution.test.ts` alone, confirmed. `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` → `1`, confirmed. Exit 0 for both.
2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies` (the line `"vite-plugin-dts": "^5.1.0",`). No other row touched.
3. Rewrote `configs/src/vite.core.config.ts`: replaced `import dts from 'vite-plugin-dts'` with `declarationRollup` imported alongside `environmentBoundary, outputBoundary` from `../helpers.js`, and replaced the `dts({ tsconfigPath, bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` call with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`. This checkout has one face, `core`; no browser or server config exists.
4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` — exit 0:
   ```
   0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
   vite.config.ts replaced (1 line added).
   configs/helpers.ts replaced (300 lines added).
   configs/policy.ts replaced (677 lines added).
   .oxlintrc.json replaced (69 lines added).
   tests/setupPolicy.ts replaced (912 lines removed).
   tests/policy.test.ts replaced (142 lines removed).
   tests/config.test.ts replaced (751 lines added).
   8 written, 27 unchanged, 0 removed in ..
   ```
   Paths `repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts` (the eighth write, the absent proof it regenerated; it shows in `git status` as untracked alongside the pre-existing staged deletion).

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` — exit 0:
   ```
   0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
   ```
   No drift reported anywhere, including in the vendored files `repair` just refreshed.
5. `npm run format:check` — exit 0, last line: `Finished in 2539ms on 37 files using 4 threads.`
   `npm run lint:check` — exit 0, no output beyond the command echo.
   `npm run check` — exit 0 (`tsc --noEmit --project tsconfig.json` then `check:src:core` `tsc --noEmit -p configs/src/tsconfig.core.json`), no diagnostics.
6. `npm run build` — exit 0. Vite built `dist/src/core/index.js` and `dist/src/core/index.cjs`, then the `copy` script wrote `dist/src/core/index.d.cts` from `dist/src/core/index.d.ts`. API Extractor logged its usual bundled-compiler-version notice (`*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine`), unchanged in substance from the prior `dts(` shape.
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts` → `dist/src/core/index.d.cts` and `dist/src/core/index.d.ts`, one face, both present.
   `head -5` of each is identical text (both open on the `BYTE_ORDER_MARK` TSDoc comment), confirming the rollup wrote the `.d.ts` and the copy step produced the matching `.d.cts` for the `require` condition.
7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0:
   ```
   Test Files  1 passed (1)
        Tests  9 passed (9)
   ```
8. `git status --short`:
   ```
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M configs/src/vite.core.config.ts
    M package.json
    M tests/config.test.ts
   D  tests/distribution.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M vite.config.ts
   ?? tests/distribution.test.ts
   ```
   `git diff --stat`:
   ```
    .oxlintrc.json                  |   69 +++
    configs/helpers.ts              |  304 ++++++++++-
    configs/policy.ts               |  731 +++++++++++++++++++++++++-
    configs/src/vite.core.config.ts |   17 +-
    package.json                    |    1 -
    tests/config.test.ts            |  783 +++++++++++++++++++++++++++-
    tests/policy.test.ts            |  202 ++------
    tests/setupPolicy.ts            | 1078 +++------------------------------------
    vite.config.ts                  |    7 +-
    9 files changed, 1963 insertions(+), 1229 deletions(-)
   ```

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no match). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1`, one call for the sole `core` face this checkout declares.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier (confirmed by `grep -n "typescript"` over that head returning no match). `audit --offline` reports no drift.
3. PASS — `format:check`, `lint:check`, and `check` each exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts`, byte-identical, so the exports map's `import` and `require` conditions both resolve.
5. PASS — `test:distribution` under npm 11 (`11.19.1`) exits 0, 9 of 9 tests passing.

## Paths `repair` wrote

`vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`.

## Deviations

None. No face other than `core` exists in this checkout, so the browser/server `dts(` shape in the brief's Context did not apply here. `repair` did not report drift in any file outside the owned/reported set, no gate failed outside the owned set, and the build emitted `index.d.ts` for its one face.

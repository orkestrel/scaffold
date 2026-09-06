# Unit report — U12 fleet-visit-middleware (phase A)

## Steps

1. `git status --short` → `D  tests/distribution.test.ts` (only entry, as expected). Exit 0.
   `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` → `1`. Exit 0.
2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies` (line 109, `"vite-plugin-dts": "^5.1.0",`) with `sed -i '109d' package.json`. No other row touched.
3. Rewrote both faces:
   - `configs/src/vite.core.config.ts`: replaced the `dts({ tsconfigPath, bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` call with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`, importing `declarationRollup` from `'../helpers.js'` beside `environmentBoundary`/`outputBoundary`. Dropped the `vite-plugin-dts` import. Nothing else in the file changed.
   - `configs/src/vite.server.config.ts`: replaced the `dts({ tsconfigPath, bundleTypes: true, beforeWriteFile: ... })` call and its inline rewrite with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.server.json'), rewrite: rewriteCoreSpecifier })`, importing `declarationRollup, rewriteCoreSpecifier` from `'../helpers.js'`. Dropped the `vite-plugin-dts` import and my hand-written comment above `export default`. `repair` (step 4) then replaced my comment with the seed's own two-line comment, which is the expected repair behavior.
4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` — exit 0. Output:
   ```
   0 of 39 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 9.
   vite.config.ts replaced (1 line added).
   configs/src/vite.server.config.ts replaced (2 lines removed).
   configs/helpers.ts replaced (300 lines added).
   configs/policy.ts replaced (677 lines added).
   .oxlintrc.json replaced (69 lines added).
   tests/setupPolicy.ts replaced (912 lines removed).
   tests/policy.test.ts replaced (142 lines removed).
   tests/config.test.ts replaced (751 lines added).
   9 written, 31 unchanged, 0 removed in ..
   ```
   Paths `repair` wrote (9 total): `vite.config.ts`, `configs/src/vite.server.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts` (the ninth, regenerated from absent — confirmed present after the run via `ls -la tests/distribution.test.ts`).

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` — exit 0. Output:
   ```
   0 of 39 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 9.
   ```
   No drift reported anywhere, including outside the owned set.
5. `npm run format:check` — exit 0 (`All matched files use the correct format.`, 69 files).
   `npm run lint:check` — exit 0 (no output, no violations).
   `npm run check` — exit 0 (`tsc --noEmit` for `tsconfig.json`, `configs/src/tsconfig.core.json`, `configs/src/tsconfig.server.json` all clean).
6. `npm run build` — exit 0. Built `dist/src/core/index.js`, `dist/src/core/index.cjs`, `dist/src/server/index.js`, `dist/src/server/index.cjs`, each with the `d.ts`/`d.cts` copy step. API Extractor emitted its standard advisory (`bundled compiler engine ... TypeScript 6.0.3 which is newer`), no errors.
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts` →
   ```
   dist/src/core/index.d.cts
   dist/src/core/index.d.ts
   dist/src/server/index.d.cts
   dist/src/server/index.d.ts
   ```
   `head -5 dist/src/core/index.d.ts` and `dist/src/core/index.d.cts` (identical): imports from `@orkestrel/server` and `@orkestrel/contract`, no rewrite applied (core face passes no `rewrite`, as expected).
   `head -5 dist/src/server/index.d.ts` and `dist/src/server/index.d.cts` (identical): first import lines from `@orkestrel/server` and `node:fs/promises`; line 5 reads `import type { MultipartBody } from '@orkestrel/middleware';` — confirms `rewriteCoreSpecifier` externalized the core specifier to the published package name.
7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0. `11 passed (11)` in the `distribution` project, `1 passed (1)` test file.
8. `git status --short`:
   ```
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
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
   (`tests/distribution.test.ts` shows both the pre-existing staged `D` from before this unit launched and the regenerated file as untracked content — net effect is the file is present with new content.)
   `git diff --stat`:
   ```
    .oxlintrc.json                    |   69 +++
    configs/helpers.ts                |  304 ++++++++++-
    configs/policy.ts                 |  731 ++++++++++++++++++++++++-
    configs/src/vite.core.config.ts   |   17 +-
    configs/src/vite.server.config.ts |   19 +-
    package.json                      |    1 -
    tests/config.test.ts              |  783 ++++++++++++++++++++++++++-
    tests/policy.test.ts              |  202 ++-----
    tests/setupPolicy.ts              | 1078 +++----------------------------------
    vite.config.ts                    |    7 +-
    10 files changed, 1969 insertions(+), 1242 deletions(-)
   ```

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no matches). `grep -c "declarationRollup(" configs/src/vite.core.config.ts configs/src/vite.server.config.ts` reports `1` for each face.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier (no match, exit 1). `audit --offline` reports no drift (`0 of 39 planned paths drifted`).
3. PASS — `format:check`, `lint:check`, `check` all exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts`, `dist/src/core/index.d.cts`, `dist/src/server/index.d.ts`, `dist/src/server/index.d.cts` for both faces.
5. PASS — `test:distribution` under npm 11 exits 0, 11 tests passed.

## Deviations

None. No face carried a `dts(` shape outside the two the Context described. `repair` and `audit` reported no drift in any file outside the owned/vendored set. No gate failed. The build emitted `index.d.ts` for every face.

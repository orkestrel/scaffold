# Unit report — U12 fleet-visit-server (phase A, before the releases)

## Steps

1. `git status --short` → `D  tests/distribution.test.ts` alone, exit 0.
   `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` → `1`, exit 0.

2. Removed the `vite-plugin-dts` row (`"vite-plugin-dts": "^5.1.0",`) from `package.json` `devDependencies`. No other row touched.

3. Rewrote `configs/src/vite.server.config.ts` from the inline `dts({ tsconfigPath, bundleTypes: true, beforeWriteFile: ... })` shape to `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.server.json'), rewrite: rewriteCoreSpecifier })`, imported from `'../helpers.js'`, matching the seed in scaffold's `src/core/templates.ts` `vites.src.server` string byte for byte (import lines, the two-line comment above `export default`, and the plugin call). The `vite-plugin-dts` import and the inline `beforeWriteFile` rewrite plus its comment are gone.

4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline`, exit 0. First run:
   ```
   0 of 35 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 7.
   vite.config.ts replaced (1 line added).
   configs/helpers.ts replaced (300 lines added).
   configs/policy.ts replaced (677 lines added).
   .oxlintrc.json replaced (69 lines added).
   tests/setupPolicy.ts replaced (912 lines removed).
   tests/policy.test.ts replaced (142 lines removed).
   tests/config.test.ts replaced (751 lines added).
   8 written, 28 unchanged, 0 removed in ..
   ```
   The eighth written path is `tests/distribution.test.ts`, created from absent (an existence check, not a byte diff, so it prints no line in the report above). A second `repair` run confirmed `0 written, 36 unchanged, 0 removed`.

   Paths `repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`.

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline`, exit 0:
   ```
   0 of 35 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 7.
   ```

5. `npm run format:check` → exit 0, "All matched files use the correct format." (53 files).
   `npm run lint:check` → exit 0, no warnings.
   `npm run check` → exit 0 (`tsc --noEmit --project tsconfig.json` then `check:src:server`).

6. `npm run build` → exit 0. Vite built `dist/src/server/index.js` and `index.cjs`, then the `declarationRollup` plugin's `closeBundle` hook ran the extractor and the `copy` script copied `dist/src/server/index.d.ts` to `dist/src/server/index.d.cts`.
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts` → `dist/src/server/index.d.cts`, `dist/src/server/index.d.ts` (this checkout has one face, `server`).
   `head -5` of `index.d.ts` and `index.d.cts` are identical, both starting `import type { AddressInfo } from 'node:net';` with no `../core/index.js` or `@src/core` specifier.

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` → exit 0. `Test Files 1 passed (1)`, `Tests 9 passed (9)`.

8. `git status --short`:
   ```
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M configs/src/vite.server.config.ts
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
    .oxlintrc.json                    |   69 +++
    configs/helpers.ts                |  304 ++++++++++-
    configs/policy.ts                 |  731 ++++++++++++++++++++++++-
    configs/src/vite.server.config.ts |   19 +-
    package.json                      |    1 -
    tests/config.test.ts              |  783 ++++++++++++++++++++++++++-
    tests/policy.test.ts              |  202 ++-----
    tests/setupPolicy.ts              | 1078 +++----------------------------------
    vite.config.ts                    |    7 +-
    9 files changed, 1965 insertions(+), 1229 deletions(-)
   ```
   `tests/distribution.test.ts` appears as `D` plus `??` because the Orchestrator's `git rm` staged the delete before this unit launched and `repair` wrote a new untracked file back at the same path.

## Acceptance criteria

1. PASS. `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no match). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` (one face, `server`).
2. PASS. `head -20 tests/distribution.test.ts` names no `typescript` specifier. `audit --offline` reports `0 of 35 planned paths drifted`.
3. PASS. `format:check`, `lint:check`, and `check` each exit 0.
4. PASS. `build` exits 0 and emits `dist/src/server/index.d.ts` and `dist/src/server/index.d.cts` (the checkout's only face), so the unchanged exports map resolves both conditions.
5. PASS. `test:distribution` under npm 11 exits 0 (9 tests passed).

## Deviations

None. The face's config carried the `dts({ tsconfigPath, bundleTypes: true, beforeWriteFile: ... })` shape the Context predicted; `repair` and `audit` reported drift in no file outside the vendored set the brief names as owned; every gate passed; the build emitted `index.d.ts` for its one face.

# Unit report — U12 fleet-visit-interpret (phase A, before the releases)

## Steps

1. `git status --short` — output: `D  tests/distribution.test.ts` alone (exit 0, matched). `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` — output: `1` (exit 0, matched).
2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies`. No other row touched.
3. Rewrote `configs/src/vite.core.config.ts`: dropped the `vite-plugin-dts` import, imported `declarationRollup` from `'../helpers.js'` beside `environmentBoundary`/`outputBoundary`, and replaced the `dts({...})` call with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`, matching the seed at `node_modules/@orkestrel/scaffold/dist/src/core/index.js` (`CONFIG_TEMPLATES.vites.src.core`). This checkout has only the `core` face (no server or browser face present under `configs/src/`), so only the `dts({ tsconfigPath, bundleTypes: { extractorConfig: ... } })` shape applied.
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
   `tests/distribution.test.ts` was written back (the 8th write; not individually logged with an add/remove count because it was absent, not replaced) — confirmed present after the run (39857 bytes).

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` — exit 0:
   ```
   0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
   ```
   Paths `repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`.
5. `npm run format:check` — exit 0: "All matched files use the correct format." (69 files).
   `npm run lint:check` — exit 0, no output (no violations).
   `npm run check` — exit 0 (`tsc --noEmit --project tsconfig.json` then `check:src:core`, both clean).
6. `npm run build` — exit 0. `vite build` for `configs/src/vite.core.config.ts` emitted `dist/src/core/index.js` and `dist/src/core/index.cjs`, then the `copy` script produced `dist/src/core/index.d.cts` from `dist/src/core/index.d.ts`.
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
   ```
   dist/src/core/index.d.cts
   dist/src/core/index.d.ts
   ```
   `head -5 dist/src/core/index.d.ts`:
   ```
   import type { Definition } from '@orkestrel/reason';
   import type { EmitterErrorHandler } from '@orkestrel/emitter';
   import type { EmitterHooks } from '@orkestrel/emitter';
   import type { EmitterInterface } from '@orkestrel/emitter';
   import type { FieldPath } from '@orkestrel/contract';
   ```
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
   (The `D`/`??` pair on `tests/distribution.test.ts` reflects the pre-existing `git rm`-staged deletion of the old compiler-shaped tracked file, with `repair` then writing an unstaged, untracked file of the same path containing the new parser-shaped proof.)

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

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no matches); `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1`.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier; `audit --offline` reports `0 of 34 planned paths drifted`.
3. PASS — `format:check`, `lint:check`, and `check` each exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts`.
5. PASS — `test:distribution` under npm 11 (11.19.1) exits 0, 9 of 9 tests passed.

## Paths repair wrote

`vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`.

## Deviations

None. The host's command classifier refused `npx scaffold ...`, so per the brief's stated fallback, `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline` was used for `repair` and `audit` throughout (recorded here as the anticipated substitution, not a departure from the brief). Only the `core` face exists in this checkout's `configs/src/`, so the server/browser `dts(` shape and `rewriteCoreSpecifier` import did not apply; no face carried a shape outside the two the brief names.

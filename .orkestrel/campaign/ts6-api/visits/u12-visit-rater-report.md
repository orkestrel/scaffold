# Unit report — U12 fleet-visit-rater (phase A, before the releases)

## Steps

1. `git status --short` → exit 0, output ` D  tests/distribution.test.ts` (matched expectation). `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` → exit 0, output `1` (matched expectation).

2. Removed the `vite-plugin-dts` row (`"vite-plugin-dts": "^5.1.0",`) from `package.json` `devDependencies`. No other row touched.

3. Rewrote `configs/src/vite.core.config.ts` (the checkout's only face): replaced the `vite-plugin-dts` import and the `dts({ tsconfigPath, bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` call with `import { declarationRollup, environmentBoundary, outputBoundary } from '../helpers.js'` and `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`, matching the seed at `node_modules/@orkestrel/scaffold/dist/src/core/index.js` lines 1125-1152 exactly. Nothing else in the file changed.

4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` → exit 0. Full output:
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
   Paths `repair` wrote (8, including `tests/distribution.test.ts` regenerated at the path `git rm` had cleared): `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`.

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` → exit 0. Full output:
   ```
   0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
   ```
   No drift reported in any file.

5. `npm run format:check` → exit 0. Last lines: `All matched files use the correct format.` / `Finished in 3434ms on 43 files using 4 threads.`
   `npm run lint:check` → exit 0. No output beyond the command echo.
   `npm run check` → exit 0. Ran `tsc --noEmit --project tsconfig.json`, `check:src`, `check:src:core` (`tsc --noEmit -p configs/src/tsconfig.core.json`), all clean.

6. `npm run build` → exit 0. Last lines:
   ```
   Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
   ```
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts` → `dist/src/core/index.d.cts`, `dist/src/core/index.d.ts`.
   `head -5 dist/src/core/index.d.ts`:
   ```
   import type { Aggregation } from '@orkestrel/reason';
   import type { Check } from '@orkestrel/reason';
   import type { CheckResult } from '@orkestrel/reason';
   import type { Comparison } from '@orkestrel/reason';
   import type { EmitterErrorHandler } from '@orkestrel/emitter';
   ```

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` → exit 0. Last lines:
   ```
   Test Files  1 passed (1)
        Tests  9 passed (9)
     Start at  23:50:40
     Duration  17.40s (transform 380ms, setup 265ms, import 2.63s, tests 14.21s, environment 0ms)
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
   ?? tests/distribution.test.ts
    M vite.config.ts
   ```
   (`tests/distribution.test.ts` shows both `D`, staged by the Orchestrator's earlier `git rm`, and `??`, the untracked file `repair` wrote back at the same path.)

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

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no matches). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` for the one face (`core`).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier. `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` reports no drift (`0 of 34 planned paths drifted from the plan`).
3. PASS — `format:check`, `lint:check`, and `check` all exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts` for the checkout's only face (`core`); the unchanged exports map resolves both conditions.
5. PASS — `test:distribution` under npm 11 exits 0 (9 tests passed).

## Deviations

- The host's command classifier refused `npx scaffold ...`, so `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline` ran instead, as the brief's Context anticipated and pre-authorized. This is the substitution the brief names, not an unplanned deviation.
- No other deviation. Every face's config carried the `dts(` shape the Context names; `repair` and `audit` reported no drift in any file; every gate passed in owned files; the build emitted `index.d.ts` for the checkout's only face (`core`).

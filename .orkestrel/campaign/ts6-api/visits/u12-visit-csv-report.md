# Unit report — U12 fleet-visit-csv (phase A, before the releases)

## Steps

1. `git status --short` → exit 0, empty (clean). `node -e "console.log(require('@orkestrel/scaffold/package.json').version)"` → exit 0, printed `0.0.63` (the head-start version already installed by `npm install --no-save <TARBALL>`; `swap-scaffold.log.txt` was not present in this checkout, so the version was confirmed directly against `node_modules/@orkestrel/scaffold`, whose `dist/host/configs/helpers.ts` and compiled `src/core/index.js` templates carry `declarationRollup`).

2. Removed the `"vite-plugin-dts": "^5.1.0",` row from `package.json` `devDependencies`. No other row touched.

3. Rewrote `configs/src/vite.core.config.ts` to the seed shape from the installed scaffold's `vites.src.core` template: replaced `import dts from 'vite-plugin-dts'` with `declarationRollup` imported alongside `environmentBoundary` and `outputBoundary` from `../helpers.js`, and replaced the `dts({ tsconfigPath: ..., bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` call with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`. `types: ['node']` carried over unchanged, matching the seed for the `core` face. Nothing else in the file changed. This checkout has only the `core` face.

4. `rm tests/distribution.test.ts` → exit 0.
   `npx scaffold repair --offline` → exit 0:
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
   Paths `repair` wrote (8, including the recreated `tests/distribution.test.ts`, which was absent after the `rm` and so is not itemized above as a byte-replacement but is confirmed written by its post-run existence and content):
   - `vite.config.ts`
   - `configs/helpers.ts`
   - `configs/policy.ts`
   - `.oxlintrc.json`
   - `tests/setupPolicy.ts`
   - `tests/policy.test.ts`
   - `tests/config.test.ts`
   - `tests/distribution.test.ts` (regenerated because absent)

   `npx scaffold audit --offline` → exit 0:
   ```
   0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
   ```
   No drift reported anywhere, including the vendored files `repair` rewrote.

5. `npm run format:check` → exit 0, last line: `Finished in 3029ms on 47 files using 4 threads.` (`All matched files use the correct format.`)
   `npm run lint:check` → exit 0, no output beyond the command echo (no warnings, no errors).
   `npm run check` → exit 0, last line: `tsc --noEmit -p configs/src/tsconfig.core.json` (ran to completion with no diagnostics printed).

6. `npm run build` → exit 0. Last lines:
   ```
   > copy
   > node -e "..." dist/src/core/index.d.ts dist/src/core/index.d.cts
   Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
   ```
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
   ```
   dist/src/core/index.d.cts
   dist/src/core/index.d.ts
   ```
   `head -5 dist/src/core/index.d.ts`:
   ```
   import { ArrayShape } from '@orkestrel/contract';
   import type { ContractInterface } from '@orkestrel/contract';
   import type { ContractShape } from '@orkestrel/contract';
   import type { Guard } from '@orkestrel/contract';
   import type { JSONSchema } from '@orkestrel/contract';
   ```
   `head -5 dist/src/core/index.d.cts` — identical content, confirming the rollup wrote the `.d.ts` and the `copy` step duplicated it to `.d.cts` for the `require` condition.

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` → exit 0. Last lines:
   ```
   Test Files  1 passed (1)
        Tests  9 passed (9)
     Start at  22:36:22
     Duration  14.66s (transform 180ms, setup 42ms, import 2.21s, tests 12.23s, environment 0ms)
   ```

8. `git status --short`:
   ```
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M configs/src/vite.core.config.ts
    M package.json
    M tests/config.test.ts
    M tests/distribution.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M vite.config.ts
   ```
   `git diff --stat`:
   ```
    .oxlintrc.json                  |   69 +++
    configs/helpers.ts              |  304 ++++++++++-
    configs/policy.ts               |  731 +++++++++++++++++++++++++-
    configs/src/vite.core.config.ts |   17 +-
    package.json                    |    1 -
    tests/config.test.ts            |  783 +++++++++++++++++++++++++++-
    tests/distribution.test.ts      |  281 ++++++----
    tests/policy.test.ts            |  202 ++------
    tests/setupPolicy.ts            | 1078 +++------------------------------------
    vite.config.ts                  |    7 +-
    10 files changed, 2158 insertions(+), 1315 deletions(-)
   ```
   `package-lock.json` and the `@orkestrel/scaffold`/`@orkestrel/probe` ranges are untouched, as instructed. The 6 additional modified files beyond this brief's directly owned set (`.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `vite.config.ts`) are the vendored/guide-mirror paths `repair` refreshed to the head-start version, as the brief's Context and Scope anticipate ("`repair` may also refresh vendored files and guide mirrors; report every path it wrote").

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` printed nothing (exit 1, no matches). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reported `1` (one call, one face: `core`).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier (the only `typescript` reference is `require('typescript/bin/tsc')` at line 33, outside the first 20 lines). `npx scaffold audit --offline` reported `0 of 34 planned paths drifted from the plan`.
3. PASS — `format:check` exit 0, `lint:check` exit 0, `check` exit 0.
4. PASS — `build` exit 0; emitted `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts`, both populated with the same declaration content, so the unchanged exports map resolves both the `import` and `require` conditions.
5. PASS — `test:distribution` under npm 11 exit 0, 9 of 9 tests passed.

## Deviations

None. `swap-scaffold.log.txt` named in the brief's Context was not found in the checkout at unit start; the head-start installation was independently confirmed instead by reading the installed `@orkestrel/scaffold` package version and its `declarationRollup` helper directly from `node_modules`, and by `scaffold audit --offline` reporting no drift after `repair`. This substitution changed no scope or outcome and is noted here for completeness rather than as a stop condition.

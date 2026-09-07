# Unit report — U12 fleet-visit-qualifier (phase A, before the releases)

## Steps

1. `git status --short` and `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts`.
   Exit 0 both. `git status --short` printed `D  tests/distribution.test.ts` alone, matching the
   expected baseline. `grep -c` reported `1`, confirming the head start.

2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies`. No other row touched.

3. Rewrote `configs/src/vite.core.config.ts`: replaced the `dts` import and call with the
   `declarationRollup` import (added beside `environmentBoundary` and `outputBoundary` from
   `../helpers.js`) and `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`,
   matching the seed in the installed head start's compiled `vites.src.core` template
   (`node_modules/@orkestrel/scaffold/dist/src/core/index.js`). This checkout has one face
   (`core`); no browser or server face config exists here.

4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline`. Exit 0.
   Output: `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at
   5, and nothing at 6.` followed by `vite.config.ts replaced (1 line added).`,
   `configs/helpers.ts replaced (300 lines added).`, `configs/policy.ts replaced (677 lines
   added).`, `.oxlintrc.json replaced (69 lines added).`, `tests/setupPolicy.ts replaced (912
   lines removed).`, `tests/policy.test.ts replaced (142 lines removed).`, `tests/config.test.ts
   replaced (751 lines added).`, `8 written, 27 unchanged, 0 removed in ..`. The eighth written
   path is `tests/distribution.test.ts` (the deleted proof, regenerated), confirmed by its
   presence afterward and by a second `repair` run reporting `0 written, 35 unchanged, 0 removed`
   (idempotent).

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline`. Exit 0. Output:
   `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and
   nothing at 6.` No drift reported.

   Paths `repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`,
   `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
   `tests/distribution.test.ts`.

5. `npm run format:check`. Exit 0. Last lines: `All matched files use the correct format.`
   `Finished in 3432ms on 43 files using 4 threads.`

   `npm run lint:check`. Exit 0. No output (no violations).

   `npm run check`. Exit 0. Last lines: `tsc --noEmit -p configs/src/tsconfig.core.json`
   completed with no diagnostics printed.

6. `npm run build`. Exit 0. Last lines: `Copied: dist/src/core/index.d.ts to
   dist/src/core/index.d.cts`. A bundled-compiler-version notice from API Extractor printed
   (`*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled
   compiler engine; consider upgrading API Extractor.`) — informational, not an error, exit
   remained 0.

   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`: both `dist/src/core/index.d.ts` and
   `dist/src/core/index.d.cts` present. `head -5` of each shows identical content (the `.cts`
   is the copy):
   ```
   import type { Check } from '@orkestrel/reason';
   import type { CheckResult } from '@orkestrel/reason';
   import type { Comparison } from '@orkestrel/reason';
   import type { EmitterErrorHandler } from '@orkestrel/emitter';
   import type { EmitterHooks } from '@orkestrel/emitter';
   ```

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`. Exit 0. Last lines: `Test Files 1
   passed (1)`, `Tests 9 passed (9)`, `Duration 17.40s`.

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
   The `D` plus `??` pair on `tests/distribution.test.ts` reflects the file's staged deletion
   (performed by the Orchestrator before this unit launched) alongside `repair`'s regeneration of
   its working-tree content; the file exists on disk with the parser-shaped proof.

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

## Criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing; `grep -c
   "declarationRollup(" configs/src/vite.*.config.ts` reports `1` for the one face
   (`vite.core.config.ts`).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier;
   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` reports no drift
   (host classifier refuses `npx scaffold`; ran the installed binary directly, per the Deviations
   section below).
3. PASS — `format:check`, `lint:check`, and `check` each exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts`.
5. PASS — `test:distribution` under npm 11 exits 0 (9 tests passed).

## Paths `repair` wrote

`vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`,
`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
`tests/distribution.test.ts`.

## Deviations

The brief's Steps section and Context named `npx scaffold ...` in the acceptance criteria wording
but stated the host's command classifier refuses `npx scaffold`, directing use of the installed
head start's binary directly. Ran `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair
--offline` and `... audit --offline` in place of `npx scaffold repair --offline` and `npx scaffold
audit --offline`, per the brief's own Host note (§ Context, final bullet). No other deviation.

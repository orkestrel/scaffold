# Unit report — U12 fleet-visit-relation (phase A, before the releases)

## Steps

1. `git status --short` and `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts`
   - Exit 0 both.
   - `git status --short` output: `D  tests/distribution.test.ts` (matched expectation).
   - `grep -c` output: `1` (matched expectation).

2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies`. No other row touched.

3. Rewrote `configs/src/vite.core.config.ts` from the `dts({ tsconfigPath, bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` shape to `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`, imported from `'../helpers.js'` beside `environmentBoundary` and `outputBoundary`. The `vite-plugin-dts` import was removed. This checkout has one face (`core`); no `vite.browser.config.ts` or `vite.server.config.ts` exists.

4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline`
   - Exit 0.
   - Output:
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
   - `repair` also wrote `tests/distribution.test.ts` back (the parser-shaped proof), not named in the summary line above but present as an untracked new file replacing the staged deletion.
   - Paths `repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`.

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline`
   - Exit 0.
   - Output:
     ```
     0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
     ```
   - No drift reported.

5. `npm run format:check`
   - Exit 0.
   - Last lines: `All matched files use the correct format.` / `Finished in 3331ms on 44 files using 4 threads.`

   `npm run lint:check`
   - Exit 0.
   - No output (clean).

   `npm run check`
   - Exit 0.
   - Ran `tsc --noEmit --project tsconfig.json` then `check:src:core` (`tsc --noEmit -p configs/src/tsconfig.core.json`), no errors.

6. `npm run build`
   - Exit 0.
   - Built `dist/src/core/index.js` and `dist/src/core/index.cjs`, then rolled up declarations and copied `dist/src/core/index.d.ts` to `dist/src/core/index.d.cts`.
   - Note: build emitted `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` (informational, non-fatal, exit 0).

   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`
   - Output: `dist/src/core/index.d.cts` and `dist/src/core/index.d.ts` both present.

   `head -5` of each:
   - `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts` both start:
     ```
     import type { DatabaseInterface } from '@orkestrel/database';
     import type { EmitterErrorHandler } from '@orkestrel/emitter';
     import type { EmitterHooks } from '@orkestrel/emitter';
     import type { EmitterInterface } from '@orkestrel/emitter';
     import type { Key } from '@orkestrel/database';
     ```

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
   - `npm --version` under that `PATH`: `11.19.1`.
   - Exit 0.
   - Last lines: `Test Files  1 passed (1)` / `Tests  9 passed (9)` / `Duration  18.58s`.

8. `git status --short`
   - Output:
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
   (The `D`/`??` pair on `tests/distribution.test.ts` reflects the index still holding the earlier `git rm`, with `repair` having written a new working-tree file at the same path.)

   `git diff --stat`
   - Output:
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

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no matches); `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` for the sole face (`core`).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier (`grep -n "typescript"` on that head found none); `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` reports no drift.
3. PASS — `format:check`, `lint:check`, and `check` each exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts` (the only face in this checkout).
5. PASS — `test:distribution` under npm 11 exits 0 (9 tests passed).

## Deviations

- The brief's Context lists faces as "core" only, with the templated placeholder `<face>` list left empty (`` `` ``); this checkout has exactly one face (`core`) and no `browser` or `server` `vite.<face>.config.ts` files exist, so only `configs/src/vite.core.config.ts` was rewritten. No `dts(` shape existed to convert for `browser` or `server` because those files are absent — not a deviation from the stated shapes, just a smaller face set than the general Context paragraph enumerates.
- The host's command classifier refused `npx scaffold ...` invocations were not attempted; the brief's Step 4 already directs the installed head start's own binary (`node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline`), which was used throughout, consistent with the brief.
- No other deviation encountered. `repair` did not report drift in any file outside the owned set; the vendored files it rewrote (`vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`) are exactly the class the brief's Scope names as owned ("every vendored file or guide mirror `repair` refreshes"), so no shared-file patch is required.

# Unit report — U12 fleet-visit-program (phase A, before the releases)

## Steps

1. `git status --short` and `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts`
   Exit 0 / 0. `git status --short` showed `D  tests/distribution.test.ts` alone, as expected. The
   `grep -c` reported `1`, confirming the head start carries `declarationRollup`.

2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies`. No other row touched.

3. Rewrote `configs/src/vite.core.config.ts` from the `dts({ tsconfigPath, bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` shape to
   `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`,
   imported from `'../helpers.js'` beside `environmentBoundary` and `outputBoundary`. The
   `vite-plugin-dts` import was removed; nothing else in the file changed. This checkout's sole
   face is `core` — no `browser`, `bin`, or `server` config exists here.

4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline`
   Exit 0. Last lines:
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
   Paths `repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`,
   `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and
   `tests/distribution.test.ts` (the absent proof, restored silently as the 8th written path with
   no byte-diff message since it did not exist to diff against).

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline`
   Exit 0. Output:
   ```
   0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
   ```
   No drift reported.

5. `npm run format:check` — exit 0. Last lines: `All matched files use the correct format.` /
   `Finished in 3628ms on 48 files using 4 threads.`
   `npm run lint:check` — exit 0. No output (clean).
   `npm run check` — exit 0. Ran `tsc --noEmit --project tsconfig.json` then
   `check:src:core` (`tsc --noEmit -p configs/src/tsconfig.core.json`), both clean.

6. `npm run build` — exit 0. Built `dist/src/core/index.js` and `dist/src/core/index.cjs`, then
   copied `dist/src/core/index.d.ts` to `dist/src/core/index.d.cts`. API Extractor logged a
   compiler-version advisory (`bundled TypeScript version 5.9.3` older than the project's
   `6.0.3`), not an error.
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts` listed `dist/src/core/index.d.cts` and
   `dist/src/core/index.d.ts`. `head -5` of each showed the same rolled-up `import type` lines
   from `@orkestrel/qualifier`, `@orkestrel/emitter` (three named types), and `@orkestrel/reason`.

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0. `1 passed (1)` test file,
   `9 passed (9)` tests.

8. `git status --short` (final):
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

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` printed nothing (exit 1, no
   match). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reported `1` for the sole
   `core` face's config.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier. `audit --offline`
   reported `0 of 34 planned paths drifted from the plan.`
3. PASS — `format:check`, `lint:check`, and `check` each exited 0.
4. PASS — `build` exited 0 and emitted `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts`
   for the `core` face.
5. PASS — `test:distribution` under npm 11 exited 0 (`9 passed (9)`).

## Deviations

None. The host's command classifier refused `npx scaffold ...`, so `repair` and `audit` ran
through the installed head start's own binary,
`node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline`, exactly as the
brief's Context anticipated — recorded here per that anticipated substitution, not as a new
deviation. No file outside the brief's owned/vendored-refresh set was touched. No face other than
`core` exists in this checkout.

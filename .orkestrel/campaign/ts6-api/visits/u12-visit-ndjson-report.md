# Unit report — U12 fleet-visit-ndjson (phase A, before the releases)

## Steps

1. `git status --short` → `D  tests/distribution.test.ts` alone, as expected.
   `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` → `1`, as expected.
   Exit codes: 0, 0.

2. Removed the `vite-plugin-dts` row (`"vite-plugin-dts": "^5.1.0",`) from `package.json` `devDependencies`. No other row touched.

3. Rewrote `configs/src/vite.core.config.ts` to the core-face seed: dropped the `vite-plugin-dts` import, added `declarationRollup` to the `../helpers.js` import beside `environmentBoundary` and `outputBoundary`, and replaced the `dts({ tsconfigPath, bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` call with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`. This checkout carries only the `core` face; no `server` or `browser` face config exists to touch.

4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline`
   Exit code: 0
   Output (whole):
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
   Paths `repair` wrote (8 total): `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts` (the absent file, restored as the parser-shaped proof; shown as untracked new content in `git status`, not in the "replaced" summary line above since it was previously deleted rather than present-and-differing).

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline`
   Exit code: 0
   Output (whole):
   ```
   0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
   ```
   No drift reported.

5. `npm run format:check` → exit 0. Last lines: `All matched files use the correct format.` / `Finished in 3410ms on 35 files using 4 threads.`
   `npm run lint:check` → exit 0. No output beyond the command echo.
   `npm run check` → exit 0. Last line: `tsc --noEmit -p configs/src/tsconfig.core.json` (ran clean, no diagnostics).

6. `npm run build` → exit 0. Build produced `dist/src/core/index.js`, `dist/src/core/index.cjs`, and rolled up `dist/src/core/index.d.ts`, copied to `dist/src/core/index.d.cts` by the `copy` step. API Extractor emitted an informational compiler-version notice (bundled 5.9.3 vs. project TypeScript 6.0.3), not an error.

   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
   ```
   dist/src/core/index.d.cts
   dist/src/core/index.d.ts
   ```

   `head -5 dist/src/core/index.d.ts`:
   ```
   /**
    * Creates an NDJSON (newline-delimited JSON) stream parser - a stateful handle
    * that turns string chunks into the complete records decoded so far.
    *
    * @returns A working {@link NDJSONParserInterface}
   ```

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` → exit 0.
   ```
   RUN  v4.1.11 /home/user/fleet/ndjson
   ·········
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

1. PASS. `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no match). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` (one call, one face: `core`).
2. PASS. `head -20 tests/distribution.test.ts` names no `typescript` specifier. `audit --offline` reports no drift (`0 of 34 planned paths drifted`).
3. PASS. `format:check`, `lint:check`, and `check` each exit 0.
4. PASS. `build` exits 0 and emits `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts` for the `core` face (the only face in this checkout).
5. PASS. `test:distribution` under npm 11 (`11.19.1`) exits 0, 9 tests passed.

## Deviations

None. The single-face (`core`-only) shape of this checkout meant the browser/server rewrite pattern in the Context section did not apply; only the core-face rewrite was performed, as the Context section's own conditional ("A server or browser face's...") makes optional per checkout. No `npx scaffold` invocation was needed; the brief's own step 4 already names the installed-binary form (`node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline`), which was used directly.

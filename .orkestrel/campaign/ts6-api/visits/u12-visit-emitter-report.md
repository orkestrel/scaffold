# Unit report — U12 fleet-visit-emitter (phase A)

## Steps

1. `git status --short` — clean (no output). `node -e "console.log(require('@orkestrel/scaffold/package.json').version)"` — `0.0.63`. Exit 0 both.
2. Removed the `"vite-plugin-dts": "^5.1.0",` row from `package.json` `devDependencies`. No other row touched.
3. Rewrote `configs/src/vite.core.config.ts`: replaced the `import dts from 'vite-plugin-dts'` import and the `dts({ tsconfigPath, bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` call with `import { declarationRollup, environmentBoundary, outputBoundary } from '../helpers.js'` and `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`, matching the seed in scaffold's `src/core/templates.ts` `vites.src.core`. Nothing else in the file changed.
4. `rm tests/distribution.test.ts` — removed. `npx scaffold repair --offline`:
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
   Exit 0. `repair` also regenerated `tests/distribution.test.ts` (the deleted file), reported as unchanged-path-count noise in the summary but confirmed present afterward with new content (parser-shaped proof, no `typescript` specifier).
   Paths `repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts` (regenerated from the deleted file).
   `npx scaffold audit --offline`:
   ```
   0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
   ```
   Exit 0, no drift reported.
5. `npm run format:check` — "All matched files use the correct format. Finished in 3945ms on 37 files using 4 threads." Exit 0.
   `npm run lint:check` — no output, no violations. Exit 0.
   `npm run check` — `tsc --noEmit --project tsconfig.json && npm run check:src` → `check:src:core` → `tsc --noEmit -p configs/src/tsconfig.core.json`, no diagnostics. Exit 0.
6. `npm run build` — `clean` then `build:src:core`: `vite build --config configs/src/vite.core.config.ts` built `dist/src/core/index.js` and `dist/src/core/index.cjs`, then `npm run copy dist/src/core/index.d.ts dist/src/core/index.d.cts` copied the declaration. Exit 0.
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts` → `dist/src/core/index.d.cts`, `dist/src/core/index.d.ts` (both present).
   `head -5 dist/src/core/index.d.ts` and `head -5 dist/src/core/index.d.cts` both start:
   ```
   /**
    * Creates a typed event emitter — the foundational observable primitive.
    *
    * @remarks
    * Prefer this over `new Emitter(...)` at call sites that only need the interface.
   ```
7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` under npm `11.19.1`: `vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution` — "Test Files 1 passed (1); Tests 9 passed (9)". Exit 0.
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

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no match). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` (this checkout has one face, `core`).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier (only `node:child_process`, `node:fs`, `node:module`, `vitest` in the head). `npx scaffold audit --offline` reports no drift.
3. PASS — `format:check`, `lint:check`, and `check` each exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts`, the only face this checkout builds.
5. PASS — `test:distribution` under npm 11 exits 0 (9 tests passed).

## Repair-written paths (vendored, not builder-edited)

`vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts` — all written by `npx scaffold repair --offline` from the head-start `@orkestrel/scaffold` tip, per the brief's Scope and Context sections.

## Deviations

None. The build's declaration-rollup step logged an informational notice ("Analysis will use the bundled TypeScript version 5.9.3 ... target project appears to use TypeScript 6.0.3 ... consider upgrading API Extractor"); it did not affect the exit code, the emitted declarations, or any gate, so it is not a deviation.

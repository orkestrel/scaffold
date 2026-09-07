# Unit report — U12 fleet-visit-terminal (phase A, before the releases)

## Steps

1. `git status --short` and `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts`
   - Exit 0 / 0. `git status --short` showed exactly `D  tests/distribution.test.ts`. `grep -c` reported `1`.

2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies`. No other row touched.

3. Rewrote both faces:
   - `configs/src/vite.core.config.ts`: `dts({ tsconfigPath, bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` replaced with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`, imported from `'../helpers.js'` beside `environmentBoundary`/`outputBoundary`. `vite-plugin-dts` import removed.
   - `configs/src/vite.server.config.ts`: inline `dts({ tsconfigPath, bundleTypes: true, beforeWriteFile: ... })` and its rewrite comment replaced with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.server.json'), rewrite: rewriteCoreSpecifier })`, imported from `'../helpers.js'`. `beforeWriteFile` and the old comment removed; the seed's two-line comment above `export default` inserted in their place. `vite-plugin-dts` import removed.

4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` then `... audit --offline`.
   - `repair` (first run), exit 0:
     ```
     0 of 40 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 10.
     vite.config.ts replaced (1 line added).
     configs/helpers.ts replaced (300 lines added).
     configs/policy.ts replaced (677 lines added).
     .oxlintrc.json replaced (69 lines added).
     tests/setupPolicy.ts replaced (912 lines removed).
     tests/policy.test.ts replaced (142 lines removed).
     tests/config.test.ts replaced (751 lines added).
     8 written, 33 unchanged, 0 removed in ..
     ```
     `git status --short` after this run showed `tests/distribution.test.ts` as untracked (`??`), alongside the still-staged deletion (`D`) — the file was regenerated as the eighth written path (not named individually in the summary line, which prints only "replaced" paths; the new file was "created" and counted in the total).
   - `repair` (idempotency check, re-run), exit 0:
     ```
     0 of 40 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 10.
     0 written, 41 unchanged, 0 removed in ..
     ```
   - `audit --offline`, exit 0:
     ```
     0 of 40 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 10.
     ```
   - Paths `repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts` (the eighth path, regenerated new).

5. `npm run format:check`, `npm run lint:check`, `npm run check` — all exit 0.
   - `format:check`: "All matched files use the correct format. Finished in 4061ms on 68 files using 4 threads."
   - `lint:check`: no output, exit 0.
   - `check`: `tsc --noEmit --project tsconfig.json` then `check:src:core` and `check:src:server`, all silent, exit 0.

6. `npm run build`, exit 0. Both faces built and copied `.d.ts` to `.d.cts`:
   ```
   dist/src/core/index.js  80.47 kB │ gzip: 21.22 kB
   dist/src/core/index.cjs  84.00 kB │ gzip: 21.60 kB
   Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
   dist/src/server/index.js  38.57 kB │ gzip: 12.02 kB
   dist/src/server/index.cjs  39.86 kB │ gzip: 12.18 kB
   Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
   ```
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
   ```
   dist/src/core/index.d.cts
   dist/src/core/index.d.ts
   dist/src/server/index.d.cts
   dist/src/server/index.d.ts
   ```
   `head -5 dist/src/core/index.d.ts`:
   ```
   import type { CheckboxField } from '@orkestrel/form';
   import type { ConfirmField } from '@orkestrel/form';
   import type { DriverInterface } from '@orkestrel/database';
   import type { EditorField } from '@orkestrel/form';
   import type { EmitterErrorHandler } from '@orkestrel/emitter';
   ```
   `head -5 dist/src/server/index.d.ts`:
   ```
   import type { FieldChoice } from '@orkestrel/form';
   import type { FieldControl } from '@orkestrel/form';
   import type { FieldValue } from '@orkestrel/form';
   import type { FormField } from '@orkestrel/form';
   import type { FormInterface } from '@orkestrel/form';
   ```

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`, exit 0:
   ```
   Test Files  1 passed (1)
        Tests  11 passed (11)
     Duration  24.37s
   ```

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

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` for each face.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier (grep exit 1). `audit --offline` reports `0 of 40 planned paths drifted`.
3. PASS — `format:check`, `lint:check`, `check` all exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts`, `dist/src/core/index.d.cts`, `dist/src/server/index.d.ts`, `dist/src/server/index.d.cts`.
5. PASS — `test:distribution` under npm 11 exits 0, 11 tests passed.

## Deviations

None. The host's command classifier refused `npx scaffold ...`; the brief's own Context section already directed the substitute `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline`, which was used throughout steps 4. No other departure from the brief.

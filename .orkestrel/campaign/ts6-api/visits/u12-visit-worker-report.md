# Unit report — U12 fleet-visit-worker (phase A, before the releases)

## Steps

1. `git status --short` → `D  tests/distribution.test.ts` alone. Exit 0.
   `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` → `1`. Exit 0.
   Both matched the expected head start.

2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies` (was `"vite-plugin-dts": "^5.1.0",` between `vite` and `vitest`). No other row touched.

3. Rewrote both faces:
   - `configs/src/vite.core.config.ts`: dropped `import dts from 'vite-plugin-dts'`, added `declarationRollup` to the existing `../helpers.js` import, replaced the `dts({ tsconfigPath, bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } } })` call with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`.
   - `configs/src/vite.server.config.ts`: dropped `import dts from 'vite-plugin-dts'`, added `import { declarationRollup, rewriteCoreSpecifier } from '../helpers.js'`, replaced the `dts({ tsconfigPath, bundleTypes: true, beforeWriteFile: ... })` call (and its inline rewrite/comment) with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.server.json'), rewrite: rewriteCoreSpecifier })`, and replaced the old comment with the seed's two-line comment ("The roll-up reaches src/core through a specifier the tarball does not carry, so the rewrite / externalizes core through the package's own published root export, on the final roll-up alone."). Both rewrites match the seed in `node_modules/@orkestrel/scaffold/dist/src/core/index.js` (`vites.src.core` and `vites.src.server`) exactly.

4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline`:
   ```
   0 of 39 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 9.
   vite.config.ts replaced (1 line added).
   configs/helpers.ts replaced (300 lines added).
   configs/policy.ts replaced (677 lines added).
   .oxlintrc.json replaced (69 lines added).
   tests/setupPolicy.ts replaced (912 lines removed).
   tests/policy.test.ts replaced (142 lines removed).
   tests/config.test.ts replaced (751 lines added).
   8 written, 32 unchanged, 0 removed in ..
   ```
   Exit 0. `tests/distribution.test.ts` was the eighth written path (untracked new file, absent beforehand — not itemized by name in the summary but confirmed present and populated afterward).

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline`:
   ```
   0 of 39 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 9.
   ```
   Exit 0. No drift reported anywhere, including in files this brief does not own.

   Paths `repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts` (new).

5. `npm run format:check` → "All matched files use the correct format." Exit 0.
   `npm run lint:check` → no output (no violations). Exit 0.
   `npm run check` → `tsc --noEmit --project tsconfig.json`, `check:src:core`, `check:src:server` all ran with no diagnostics. Exit 0.

6. `npm run build` → `clean` then `build:src:core` and `build:src:server`, each `vite build` followed by the `copy` script writing `.d.cts` from `.d.ts`. Exit 0.
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
   ```
   dist/src/core/index.d.cts
   dist/src/core/index.d.ts
   dist/src/server/index.d.cts
   dist/src/server/index.d.ts
   ```
   `head -5 dist/src/core/index.d.ts`:
   ```
   import type { EmitterErrorHandler } from '@orkestrel/emitter';
   import type { EmitterHooks } from '@orkestrel/emitter';
   import type { EmitterInterface } from '@orkestrel/emitter';
   import type { PoolOptions } from '@orkestrel/pool';
   import type { QueueContext } from '@orkestrel/queue';
   ```
   `head -5 dist/src/server/index.d.ts`:
   ```
   import type { ContractShape } from '@orkestrel/contract';
   import type { EmitterErrorHandler } from '@orkestrel/emitter';
   import type { EmitterHooks } from '@orkestrel/emitter';
   import type { Guard } from '@orkestrel/contract';
   import type { Infer } from '@orkestrel/contract';
   ```
   Confirmed the server declaration's core references resolve through `import type { WorkerEventMap } from '@orkestrel/worker';` (line 9), proving `rewriteCoreSpecifier` ran on the roll-up.

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` (npm 11.19.1):
   ```
   RUN  v4.1.11 /home/user/fleet/worker
   ···········
   Test Files  1 passed (1)
        Tests  11 passed (11)
   ```
   Exit 0.

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
   The `D`/`??` pair on `tests/distribution.test.ts` is the pre-existing deletion plus `repair`'s untracked regenerated file (`git diff --stat` does not show this pair because the old blob is gone from the index and the new file is untracked).

## Criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no match); `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` for each face.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier; `audit --offline` reports no drift.
3. PASS — `format:check`, `lint:check`, `check` all exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts`, `dist/src/core/index.d.cts`, `dist/src/server/index.d.ts`, `dist/src/server/index.d.cts`.
5. PASS — `test:distribution` under npm 11 exits 0 (11 passed).

## Deviations

None. `npx scaffold` invocations were not attempted; the brief's host note already directed `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline`, which was used throughout.

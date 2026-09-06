# Unit report — U12 fleet-visit-console (phase A)

## Steps

1. `git status --short` — exit 0, empty (clean tree). `node -e "console.log(require('@orkestrel/scaffold/package.json').version)"` — exit 0, printed `0.0.63` (matches the head-start version named in the brief).
2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies`. No other row touched.
3. Rewrote `configs/src/vite.core.config.ts`, `configs/src/vite.browser.config.ts`, `configs/src/vite.server.config.ts`: replaced the `import dts from 'vite-plugin-dts'` import and the `dts({ tsconfigPath, bundleTypes: ... })` / `dts({ ..., beforeWriteFile })` calls with `import { declarationRollup, ... } from '../helpers.js'` and `declarationRollup({ project, types: ['node'] })` (core) or `declarationRollup({ project, rewrite: rewriteCoreSpecifier })` (browser, server). Core kept its `environmentBoundary`/`outputBoundary` plugins and `types: ['node']`, matching the prior `dts` call's `types` override. Browser and server's manual `beforeWriteFile` core-specifier rewrite was replaced by `rewrite: rewriteCoreSpecifier`, the seed's equivalent mechanism. Nothing else in the files changed.
4. `rm tests/distribution.test.ts` — exit 0.
   `npx scaffold repair --offline` — exit 0:
   ```
   0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
   vite.config.ts replaced (1 line added).
   configs/helpers.ts replaced (300 lines added).
   configs/policy.ts replaced (677 lines added).
   .oxlintrc.json replaced (69 lines added).
   tests/setupPolicy.ts replaced (912 lines removed).
   tests/policy.test.ts replaced (142 lines removed).
   tests/config.test.ts replaced (751 lines added).
   8 written, 38 unchanged, 0 removed in ..
   ```
   `npx scaffold audit --offline` — exit 0:
   ```
   0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
   ```
   Paths `repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts` (the absent file `repair` regenerated per the brief's Context, carrying the parser-shaped distribution proof with no `typescript` specifier).
5. `npm run format:check` — exit 0, `All matched files use the correct format. Finished in 3392ms on 83 files using 4 threads.`
   `npm run lint:check` — exit 0, no output (clean).
   `npm run check` — exit 0 (`tsc --noEmit --project tsconfig.json` then `check:src:core`, `check:src:browser`, `check:src:server`, each exit 0 with no diagnostics).
6. `npm run build` — exit 0. `build:src:core`, `build:src:browser`, `build:src:server` each ran `vite build` and exited 0; core and server each ran the `.d.cts` copy step after. Output:
   ```
   dist/src/core/index.js  85.94 kB │ gzip: 27.04 kB │ map: 144.24 kB
   dist/src/core/index.cjs  87.77 kB │ gzip: 27.36 kB │ map: 144.28 kB
   dist/src/browser/index.js  12.41 kB │ gzip: 4.83 kB │ map: 19.46 kB
   dist/src/server/index.js  18.19 kB │ gzip: 6.54 kB │ map: 34.20 kB
   dist/src/server/index.cjs  18.62 kB │ gzip: 6.63 kB │ map: 34.28 kB
   ```
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
   ```
   dist/src/browser/index.d.ts
   dist/src/core/index.d.cts
   dist/src/core/index.d.ts
   dist/src/server/index.d.cts
   dist/src/server/index.d.ts
   ```
   No `dist/src/browser/index.d.cts` exists because the `./browser` export in `package.json` names only the `import` condition, no `require` condition, so the exports map resolves correctly with `.d.ts` alone for that face.
   `head -5` of each `index.d.ts`:
   ```
   === dist/src/browser/index.d.ts ===
   import type { Attribute } from '@orkestrel/console';
   import type { Color } from '@orkestrel/console';
   import type { SinkInterface } from '@orkestrel/console';

   /**
   === dist/src/core/index.d.ts ===
   import type { EmitterErrorHandler } from '@orkestrel/emitter';
   import type { EmitterHooks } from '@orkestrel/emitter';
   import type { EmitterInterface } from '@orkestrel/emitter';

   /**
   === dist/src/server/index.d.ts ===
   import type { EmitterErrorHandler } from '@orkestrel/emitter';
   import type { EmitterHooks } from '@orkestrel/emitter';
   import type { EmitterInterface } from '@orkestrel/emitter';
   import type { LogLevel } from '@orkestrel/console';
   import type { SinkInterface } from '@orkestrel/console';
   ```
   Browser and server declarations reference `@orkestrel/console` (the package's own published root export), confirming `rewriteCoreSpecifier` ran.
7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0:
   ```
   Test Files  1 passed (1)
        Tests  11 passed | 4 skipped (15)
   ```
8. `git status --short`:
   ```
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M configs/src/vite.browser.config.ts
    M configs/src/vite.core.config.ts
    M configs/src/vite.server.config.ts
    M package.json
    M tests/config.test.ts
    M tests/distribution.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M vite.config.ts
   ```
   `git diff --stat`:
   ```
    .oxlintrc.json                     |   69 +++
    configs/helpers.ts                 |  304 +++++++++-
    configs/policy.ts                  |  731 +++++++++++++++++++++++-
    configs/src/vite.browser.config.ts |   20 +-
    configs/src/vite.core.config.ts    |   17 +-
    configs/src/vite.server.config.ts  |   19 +-
    package.json                       |    1 -
    tests/config.test.ts               |  783 +++++++++++++++++++++++++-
    tests/distribution.test.ts         |  297 +++++++---
    tests/policy.test.ts               |  202 +------
    tests/setupPolicy.ts               | 1078 +++---------------------------------
    vite.config.ts                     |    7 +-
    12 files changed, 2181 insertions(+), 1347 deletions(-)
   ```
   `package-lock.json` and `configs/browsers.ts` were untouched, as scoped. The other modified files beyond the three vite configs and `package.json` are the vendored files and guide mirrors `repair` refreshed, per the brief's Context and Output sections.

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` printed nothing (exit 1). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reported `1` for each of `vite.browser.config.ts`, `vite.core.config.ts`, `vite.server.config.ts`.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier. `npx scaffold audit --offline` reported no drift (`0 of 45 planned paths drifted from the plan`).
3. PASS — `format:check`, `lint:check`, and `check` each exited 0.
4. PASS — `build` exited 0 and emitted `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts`, `dist/src/browser/index.d.ts` (no `require` condition to satisfy), and `dist/src/server/index.d.ts` and `dist/src/server/index.d.cts`, matching the unchanged exports map's conditions for every face.
5. PASS — `test:distribution` under npm 11 exited 0 (11 passed, 4 skipped).

## Deviations

None. No face's config diverged from the `dts(` shape the Context named; `repair` and `audit` reported no drift in any file outside this brief's owned set; no gate failed; the build emitted `index.d.ts` for every face.

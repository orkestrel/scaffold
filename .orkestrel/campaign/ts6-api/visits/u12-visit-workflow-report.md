# Unit report — U12 fleet-visit-workflow (phase A, before the releases)

## Steps

1. `git status --short` → `D  tests/distribution.test.ts` alone. Exit 0.
   `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` → `1`. Exit 0.
   Both matched expectation.

2. Removed the `vite-plugin-dts` row (`"vite-plugin-dts": "^5.1.0",`) from `package.json` `devDependencies`. No other row touched.

3. Rewrote each `configs/src/vite.<face>.config.ts` per the Context's seed shapes:
   - `configs/src/vite.core.config.ts`: `dts(...)` replaced with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`, imported from `'../helpers.js'` beside `environmentBoundary, outputBoundary`; `vite-plugin-dts` import removed.
   - `configs/src/vite.browser.config.ts`: `dts(...)` and its inline `beforeWriteFile` rewrite removed, replaced with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.browser.json'), rewrite: rewriteCoreSpecifier })`, imported from `'../helpers.js'`; the seed's two-line comment replaces the old four-line comment above `export default`; `vite-plugin-dts` import removed.
   - `configs/src/vite.server.config.ts`: same pattern as browser, seed's two-line comment above `export default`.
   Nothing else in any of the three files changed.

4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` — exit 0:
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
   Paths `repair` wrote (8, matching "8 written"): `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts` (the absent file regenerated; not named in the printed list but present as untracked after the run).

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` — exit 0:
   ```
   0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
   ```
   No drift.

5. `npm run format:check` — exit 0, last line: `Finished in 5870ms on 106 files using 4 threads.`
   `npm run lint:check` — exit 0, no output (`--deny-warnings`, clean).
   `npm run check` — exit 0 (`tsc --noEmit` on the root project, then `check:src:core`, `check:src:browser`, `check:src:server`, all clean).

6. `npm run build` — exit 0. `vite build` for `core`, `browser`, `server` all succeeded; `core` and `server` each ran their `copy` step to produce `index.d.cts`. `browser` has no `require` export condition in `package.json`, so it has no `copy` step and emits no `index.d.cts` — unchanged from before this unit (scaffold's own `dist/src/` shows the same pattern: only faces with a `require` condition ship a `.d.cts`).
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
   ```
   dist/src/browser/index.d.ts
   dist/src/core/index.d.cts
   dist/src/core/index.d.ts
   dist/src/server/index.d.cts
   dist/src/server/index.d.ts
   ```
   `head -5` of each `index.d.ts`:
   - `dist/src/browser/index.d.ts`: begins `import type { SchedulerInterface } from '@orkestrel/workflow';`
   - `dist/src/core/index.d.ts`: begins `import { ArrayShape } from '@orkestrel/contract';`
   - `dist/src/server/index.d.ts`: begins `import type { SchedulerInterface } from '@orkestrel/workflow';`

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
   D  tests/distribution.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M vite.config.ts
   ?? tests/distribution.test.ts
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
    tests/policy.test.ts               |  202 +------
    tests/setupPolicy.ts               | 1078 +++---------------------------------
    vite.config.ts                     |    7 +-
    11 files changed, 1975 insertions(+), 1256 deletions(-)
   ```

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, empty). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` for each of `vite.browser.config.ts`, `vite.core.config.ts`, `vite.server.config.ts`.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier. `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` reports no drift (`0 of 45 planned paths drifted from the plan`).
3. PASS — `format:check`, `lint:check`, and `check` all exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts` + `dist/src/core/index.d.cts` and `dist/src/server/index.d.ts` + `dist/src/server/index.d.cts`. `dist/src/browser/index.d.ts` emits with no `.d.cts`, matching the unchanged exports map, which declares no `require` condition for `./browser`.
5. PASS — `test:distribution` under npm 11 (`11.19.1`) exits 0 (11 passed, 4 skipped).

## Deviations

- The host's command classifier refused `npx scaffold ...`; ran the installed head start's own binary directly, `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline`, per the brief's own instruction for this host condition.
- No other deviation. `repair` refreshed vendored files (`vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`) and regenerated `tests/distribution.test.ts`; none of these are drift in a file this brief does not own — the brief names every vendored file `repair` refreshes as owned and reportable, and `audit` confirms zero drift afterward.

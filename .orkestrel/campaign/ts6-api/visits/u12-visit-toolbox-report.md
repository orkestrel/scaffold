# Unit report — U12 fleet-visit-toolbox (phase A, before the releases)

## Steps

1. `git status --short` → `D  tests/distribution.test.ts` alone. Exit 0.
   `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` → `1`. Exit 0.

2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies`. No other row touched.

3. Rewrote `configs/src/vite.core.config.ts`: replaced the `dts(...)` call and its `vite-plugin-dts`
   import with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'),
   types: ['node'] })`, imported from `'../helpers.js'` beside `environmentBoundary`/`outputBoundary`.
   Rewrote `configs/src/vite.server.config.ts`: replaced the `dts(...)` call, its `beforeWriteFile`
   rewrite, and its comment with `declarationRollup({ project:
   resolveWorkspacePath('configs/src/tsconfig.server.json'), rewrite: rewriteCoreSpecifier })`, the
   `rewriteCoreSpecifier` import from `'../helpers.js'`, and the seed's two-line comment above
   `export default`. Nothing else in either file changed.

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
   Exit 0. Paths written: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`,
   `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
   `tests/distribution.test.ts` (the eighth path; regenerated as the parser-shaped proof, shown as
   `?? tests/distribution.test.ts` beside the earlier `git rm` staged deletion).

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline`:
   ```
   0 of 39 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 9.
   ```
   Exit 0. No drift in any file, owned or vendored.

5. `npm run format:check`: `All matched files use the correct format. Finished in 6748ms on 72
   files using 4 threads.` Exit 0.
   `npm run lint:check`: no output, no warnings or errors. Exit 0.
   `npm run check`: `tsc --noEmit` for the root project, `configs/src/tsconfig.core.json`, and
   `configs/src/tsconfig.server.json`, each with no diagnostics. Exit 0.

6. `npm run build`: cleaned `dist`, built `dist/src/core/index.js` (154.34 kB) and
   `dist/src/core/index.cjs` (165.82 kB), copied `index.d.ts` to `index.d.cts`; built
   `dist/src/server/index.js` (8.52 kB) and `dist/src/server/index.cjs` (8.86 kB), copied
   `index.d.ts` to `index.d.cts`. Exit 0.
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
   ```
   dist/src/core/index.d.cts
   dist/src/core/index.d.ts
   dist/src/server/index.d.cts
   dist/src/server/index.d.ts
   ```
   `head -5 dist/src/core/index.d.ts`:
   ```
   import type { AgentInterface } from '@orkestrel/agent';
   import type { AgentRegistryInterface } from '@orkestrel/agent';
   import { ArrayShape } from '@orkestrel/contract';
   import { BooleanShape } from '@orkestrel/contract';
   import type { Condition } from '@orkestrel/database';
   ```
   `head -5 dist/src/server/index.d.ts`:
   ```
   import type { TerminalManagerInterface } from '@orkestrel/terminal';
   import type { TimerHandler } from '@orkestrel/terminal';

   /**
    * Builds the GET SSE stream and POST answer routes that bridge a terminal manager onto the wire.
   ```

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`:
   ```
   Test Files  1 passed (1)
        Tests  11 passed (11)
     Duration  26.62s
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

## Paths `repair` wrote

`vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`,
`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
`tests/distribution.test.ts`.

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no
   matches); `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` for
   `vite.core.config.ts` and `1` for `vite.server.config.ts`.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier; `audit --offline`
   reports `0 of 39 planned paths drifted`.
3. PASS — `format:check`, `lint:check`, and `check` each exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts`, `dist/src/core/index.d.cts`,
   `dist/src/server/index.d.ts`, `dist/src/server/index.d.cts`.
5. PASS — `test:distribution` under npm 11 exits 0 (11 tests passed).

## Deviations

None. The host's command classifier refused `npx scaffold ...`; ran the identical installed
binary as `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline` instead, as
the brief's Context names as the expected substitution.

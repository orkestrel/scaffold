# Unit report — U12 fleet-visit-database (phase A, before the releases)

## Steps

1. `git status --short` → `D  tests/distribution.test.ts` alone, exit 0. `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` → `1`, exit 0. Both matched the expected head start.
2. Removed the `vite-plugin-dts` devDependency row from `package.json`. No other row touched.
3. Rewrote `configs/src/vite.core.config.ts`, `configs/src/vite.browser.config.ts`, and `configs/src/vite.server.config.ts` onto the `declarationRollup` seed from `node_modules/@orkestrel/scaffold/dist/src/core/index.js` (the `vites.src.core`, `vites.src.browser`, `vites.src.server` strings). The core face imports `declarationRollup` from `../helpers.js` and calls it with `project` and `types: ['node']`. The browser and server faces import `declarationRollup` and `rewriteCoreSpecifier` from `../helpers.js`, call `declarationRollup({ project, rewrite: rewriteCoreSpecifier })`, and carry the seed's own two-line comment above `export default` in place of the removed inline `beforeWriteFile` rewrite and its comment. The `vite-plugin-dts` import is gone from each file; nothing else in any file changed.
4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline`, exit 0:
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
   `repair` also wrote `tests/distribution.test.ts` back as the 8th written path (the parser-shaped proof; confirmed present afterward, and a second `repair` run reported it unchanged).

   Paths `repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`.

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline`, exit 0:
   ```
   0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
   ```
5. `npm run format:check`, exit 0: `All matched files use the correct format. Finished in 5856ms on 99 files using 4 threads.`
   `npm run lint:check`, exit 1, red only in the off-limits U10 files, the expected standing condition:
   ```
   tests/setupServer.ts:10:1: error eslint(no-restricted-imports): 'typescript' import is restricted from being used by a pattern. help: the in-process compiler API is not a surface the fleet uses
   tests/setupServer.ts:16:1: error eslint(no-restricted-imports): 'typescript' import is restricted from being used by a pattern. help: the in-process compiler API is not a surface the fleet uses
   tests/setupServer.test.ts:1:1: error eslint(no-restricted-imports): 'typescript' import is restricted from being used by a pattern. help: the in-process compiler API is not a surface the fleet uses
   tests/setupServer.test.ts:10:1: error eslint(no-restricted-imports): 'typescript' import is restricted from being used by a pattern. help: the in-process compiler API is not a surface the fleet uses
   ```
   `npm run check`, exit 0 (root `tsc --noEmit` then `check:src:core`, `check:src:browser`, `check:src:server`, all silent success).
6. `npm run build`, exit 0. `vite build` ran for each face through `configs/src/vite.<face>.config.ts`, then the `copy` script duplicated `index.d.ts` to `index.d.cts` for `core` and `server` (the faces whose exports map names a `require` condition); `browser` has no `require` condition in `package.json`, so its build script carries no `.d.cts` copy step, unchanged from before this unit and not a deviation.
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
   ```
   dist/src/browser/index.d.ts
   dist/src/core/index.d.cts
   dist/src/core/index.d.ts
   dist/src/server/index.d.cts
   dist/src/server/index.d.ts
   ```
   `head -5` of each `index.d.ts`:
   - `dist/src/browser/index.d.ts`: `import type { ColumnStorage } from '@orkestrel/database'; import type { Condition } from '@orkestrel/database'; import { DatabaseError } from '@orkestrel/database'; import type { DriverInterface } from '@orkestrel/database'; import type { DriverMetadata } from '@orkestrel/database';`
   - `dist/src/core/index.d.ts`: `import type { ContractInterface } from '@orkestrel/contract'; import type { ContractShape } from '@orkestrel/contract'; import type { EmitterErrorHandler } from '@orkestrel/emitter'; import type { EmitterHooks } from '@orkestrel/emitter'; import type { EmitterInterface } from '@orkestrel/emitter';`
   - `dist/src/server/index.d.ts`: `import type { AggregateOperation } from '@orkestrel/database'; import type { ColumnSchema } from '@orkestrel/database'; import type { ColumnStorage } from '@orkestrel/database'; import type { Condition } from '@orkestrel/database'; import type { DriverInterface } from '@orkestrel/database';`
7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`, exit 0:
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
   `git diff --stat`: `11 files changed, 1975 insertions(+), 1256 deletions(-)`.

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing; `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` for each of the three faces.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier; `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` reports `0 of 45 planned paths drifted from the plan.`
3. PASS — `format:check` and `check` exit 0. `lint:check` exits 1, red only in `tests/setupServer.ts` and `tests/setupServer.test.ts`, which are U10's off-limits files under the head start's `typescript`-import restriction; this brief's Context names that red as the expected standing condition, not a criterion this unit owns.
4. PASS — `build` exits 0 and emits `dist/src/<face>/index.d.ts` for every face (`core`, `browser`, `server`) and `dist/src/<face>/index.d.cts` for `core` and `server`, the faces whose exports map names a `require` condition; `browser` carries only an `import` condition in `package.json` and its build script has never copied a `.d.cts` for it, unaffected by this unit's changes.
5. PASS — `test:distribution` under npm 11 exits 0 (11 passed, 4 skipped).

## Deviations

None. `git status --short` matched the brief's expected standing condition at the start, `repair` and `audit` reported no drift outside the owned and vendored sets, `lint:check`'s red was confined to the named off-limits U10 files, and every face's build emitted `index.d.ts`, with `.d.cts` emitted for the two faces whose exports map names a `require` condition — unchanged from before this unit for `browser`.

## Host substitution

No `npx scaffold` invocation was attempted; ran `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline` directly per the brief's Context, as instructed.

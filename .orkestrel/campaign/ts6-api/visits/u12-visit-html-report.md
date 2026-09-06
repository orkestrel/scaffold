# Unit report — U12 fleet-visit-html

## Steps

1. `git status --short` → clean (no output). `node -e "console.log(require('@orkestrel/scaffold/package.json').version)"` → `0.0.63` (exit 0). No `swap-scaffold.log.txt` was found in the checkout, but `node_modules/@orkestrel/scaffold/dist/src/core/index.js` already carries `declarationRollup`, confirming the head start is installed even though `package.json` still pins `^0.0.63`.

2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies`. No other row touched.

3. Rewrote `configs/src/vite.core.config.ts` to import `declarationRollup` from `../helpers.js` and call `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })` in place of the `dts(...)` plugin, matching scaffold's `src/core/templates.ts` `vites.src.core` seed exactly. This checkout has only the `core` face.

4. `rm tests/distribution.test.ts` (exit 0).
   `npx scaffold repair --offline` — exit 0:
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
   `repair` wrote 8 paths total (the 7 named above plus `tests/distribution.test.ts`, confirmed regenerated via `git status --short`, which the summary line counted but did not name individually).

   `npx scaffold audit --offline` — exit 0:
   ```
   0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
   ```
   No drift reported anywhere, including in files this brief does not own.

   Paths `repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`.

5. `npm run format:check` — exit 0. Last lines:
   ```
   Checking formatting...
   All matched files use the correct format.
   Finished in 3113ms on 46 files using 4 threads.
   ```
   `npm run lint:check` — exit 0. Output:
   ```
   > oxlint --config .oxlintrc.json --deny-warnings .
   ```
   (no findings printed).
   `npm run check` — exit 0. Last lines:
   ```
   > @orkestrel/html@0.0.8 check:src:core
   > tsc --noEmit -p configs/src/tsconfig.core.json
   ```

6. `npm run build` — exit 0. Last lines:
   ```
   > @orkestrel/html@0.0.8 copy
   > node -e "..." dist/src/core/index.d.ts dist/src/core/index.d.cts

   Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
   ```
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
   ```
   dist/src/core/index.d.cts
   dist/src/core/index.d.ts
   ```
   `head -5 dist/src/core/index.d.ts`:
   ```
   import type { Guard } from '@orkestrel/contract';
   import { LiteralShape } from '@orkestrel/contract';
   import { ObjectShape } from '@orkestrel/contract';
   import { OptionalShape } from '@orkestrel/contract';
   import { StringShape } from '@orkestrel/contract';
   ```

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` (`npm --version` under that `PATH` = `11.19.1`) — exit 0. Last lines:
   ```
    RUN  v4.1.11 /home/user/fleet/html

   ·········

    Test Files  1 passed (1)
         Tests  9 passed (9)
      Start at  23:06:42
      Duration  14.85s (transform 559ms, setup 585ms, import 1.77s, tests 12.31s, environment 0ms)
   ```

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
    tests/distribution.test.ts      |  353 ++++++++-----
    tests/policy.test.ts            |  202 ++------
    tests/setupPolicy.ts            | 1078 +++------------------------------------
    vite.config.ts                  |    7 +-
    10 files changed, 2199 insertions(+), 1346 deletions(-)
   ```

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` printed nothing. `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reported `1` for the single `core` face.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier (`grep -n "typescript"` on that head found nothing). `npx scaffold audit --offline` reported no drift.
3. PASS — `format:check`, `lint:check`, and `check` all exited 0.
4. PASS — `build` exited 0 and emitted `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts`.
5. PASS — `test:distribution` under npm 11.19.1 exited 0 (9 tests passed).

## Deviations

- The brief's step 1 names `swap-scaffold.log.txt` as evidence of the head-start install, but no such file exists in this checkout (`find` for it returned nothing). The head-start install is confirmed instead by the presence of `declarationRollup` in the installed `node_modules/@orkestrel/scaffold` build output, and by every following step succeeding against that helper. `package.json` still pins `^0.0.63` as the brief states, and that range was not touched.
- `repair` refreshed several vendored files this brief lists as off-limits (`configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`) plus `vite.config.ts` and `tests/config.test.ts`. This is `repair`'s own action, not a direct edit by this unit, and the brief anticipates it ("`repair` may also refresh vendored files and guide mirrors; report every path it wrote"). `npx scaffold audit --offline` confirms zero drift after these writes.

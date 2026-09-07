# Unit report — U12 fleet-visit-process (phase A, before the releases)

## Steps

1. `git status --short` → `D  tests/distribution.test.ts` (exit 0, matched expectation).
   `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` → `1` (exit 0, matched expectation).

2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies`. No other row touched.

3. Rewrote `configs/src/vite.core.config.ts` and `configs/src/vite.server.config.ts` to the seed shapes from `node_modules/@orkestrel/scaffold/dist/src/core/index.js` (`vites.src.core`, `vites.src.server`): `declarationRollup` (and `rewriteCoreSpecifier` for `server`) imported from `../helpers.js`, the `vite-plugin-dts` import removed, the inline `beforeWriteFile` rewrite in `server` replaced by the seed's two-line comment.

4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` — exit 0:
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
   Paths `repair` wrote (8 total): `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts` (the eighth path, regenerated from absent — not named in the printed diff list because it had no prior byte content to diff against, confirmed present via `git status --short` showing it `?? ` untracked after the run).

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` — exit 0:
   ```
   0 of 39 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 9.
   ```
   No drift reported in any file, owned or vendored.

5. `npm run format:check` — exit 0: `All matched files use the correct format. Finished in 3592ms on 56 files using 4 threads.`
   `npm run lint:check` — exit 0, no output (deny-warnings, clean).
   `npm run check` — exit 0 (`tsc --noEmit` on root, `configs/src/tsconfig.core.json`, `configs/src/tsconfig.server.json`, all silent success).

6. `npm run build` — exit 0. Core and server both built (`vite build` + `.d.ts` → `.d.cts` copy). Notable non-fatal build tool notice: "The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine" (API Extractor informational, not an error).
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

   /**
   ```
   `head -5 dist/src/server/index.d.ts`:
   ```
   import { Buffer as Buffer_2 } from 'node:buffer';
   import type { DetachOptions } from '@orkestrel/process';
   import type { EmitterInterface } from '@orkestrel/emitter';
   import type { ExecutableOptions } from '@orkestrel/process';
   import type { ExecuteInput } from '@orkestrel/process';
   ```
   The server declaration correctly externalizes the core specifier through the package's own root export (`@orkestrel/process`), confirming `rewriteCoreSpecifier` ran on the roll-up.

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0:
   ```
   Test Files  1 passed (1)
        Tests  11 passed (11)
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

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` printed nothing (exit 1, no matches). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` for each face.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier. `audit --offline` reports `0 of 39 planned paths drifted`.
3. PASS — `format:check`, `lint:check`, `check` all exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts`, `dist/src/core/index.d.cts`, `dist/src/server/index.d.ts`, `dist/src/server/index.d.cts`.
5. PASS — `test:distribution` under npm 11 exits 0, 11 tests passed.

## Paths `repair` wrote

`vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts` — 8 written, 32 unchanged, 0 removed.

## Deviations

None. Every step matched the brief's stated expectations. No `npx scaffold` substitution was needed because the brief already named the installed binary invocation (`node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline`), which was used throughout.

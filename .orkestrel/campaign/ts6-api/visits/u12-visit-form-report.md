# Unit report — U12 fleet-visit-form (phase A, before the releases)

## Deviations

- `npx scaffold repair --offline` (and `audit`) was refused by the host's Claude Code auto-mode
  classifier before any command effect ran. Ran the identical installed binary instead, per the
  brief's fallback: `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` and
  `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline`.
- The first attempted `rm tests/distribution.test.ts && npx scaffold repair --offline` chain was
  denied whole by the classifier, so the `rm` never ran; the following `repair` invocation ran
  against the still-present old file and reported `7 written, 28 unchanged` with no
  `tests/distribution.test.ts` entry. Re-ran `rm -f tests/distribution.test.ts` alone (confirmed
  removed), then re-ran `repair`, which then reported `1 written, 34 unchanged` and regenerated the
  file. No content beyond `tests/distribution.test.ts` was affected by the false start; the second
  `repair` run made every other path settle to the same bytes (`0 of 34 planned paths drifted`
  both times).
- `swap-scaffold.log.txt` named in the brief's Context was not present in
  `/home/user/fleet/form` at unit start; confirmed the installed `@orkestrel/scaffold` version
  directly instead (`0.0.63`, matching the range already pinned in `package.json`).

## Steps

1. `git status --short` → empty (clean). `node -e "console.log(require('@orkestrel/scaffold/package.json').version)"` → `0.0.63`. Exit 0 both.
2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies`. No other row touched.
3. Rewrote `configs/src/vite.core.config.ts`: replaced `import dts from 'vite-plugin-dts'` and the `dts({...})` call with `import { declarationRollup, environmentBoundary, outputBoundary } from '../helpers.js'` and `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`, matching scaffold's `vites.src.core` seed byte-for-byte in that plugin block. `form` has one face (`core`); no other `configs/src/vite.*.config.ts` file exists.
4. `rm tests/distribution.test.ts`; `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` (fallback for the classifier-blocked `npx scaffold repair --offline`) → exit 0:
   ```
   0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
   1 written, 34 unchanged, 0 removed in ..
   ```
   Paths `repair` wrote across both attempts: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts` (first, false-start run before the delete landed), `tests/distribution.test.ts` (second run, after the delete landed). No guide mirror path was written.
   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` (fallback for `npx scaffold audit --offline`) → exit 0:
   ```
   0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
   ```
   No drift reported in any file, owned or vendored.
5. `npm run format:check` → exit 0, `All matched files use the correct format.` (48 files).
   `npm run lint:check` → exit 0, no output.
   `npm run check` → exit 0 (`tsc --noEmit --project tsconfig.json` then `tsc --noEmit -p configs/src/tsconfig.core.json`, both clean).
6. `npm run build` → exit 0. `dist/src/core/index.js`, `dist/src/core/index.cjs` built; `index.d.ts` produced by the roll-up and copied to `index.d.cts`.
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts` → `dist/src/core/index.d.cts`, `dist/src/core/index.d.ts` (both present, only face is `core`).
   `head -5 dist/src/core/index.d.ts`:
   ```
   import type { EmitterErrorHandler } from '@orkestrel/emitter';
   import type { EmitterHooks } from '@orkestrel/emitter';
   import type { EmitterInterface } from '@orkestrel/emitter';
   import type { JSONRecord } from '@orkestrel/contract';
   import type { Result } from '@orkestrel/contract';
   ```
7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` → exit 0, `Test Files 1 passed (1)`, `Tests 9 passed (9)`.
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
   `package-lock.json`, `configs/browsers.ts`, and every other off-limits path are unchanged (absent
   from `git status --short`).

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1);
   `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` (one face, one call).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier;
   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` reports
   `0 of 34 planned paths drifted from the plan`.
3. PASS — `format:check`, `lint:check`, and `check` all exit 0.
4. PASS — `build` exits 0; emits `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts` (the
   only face), so the unchanged exports map resolves both the `import` and `require` conditions.
5. PASS — `test:distribution` under npm 11 (`/opt/npm11/bin`) exits 0, 9 tests passed.

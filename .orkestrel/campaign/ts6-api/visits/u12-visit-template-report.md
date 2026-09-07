# Unit report — U12 fleet-visit-template (phase A, before the releases)

## Steps

1. `git status --short` — exit 0 — `D  tests/distribution.test.ts` alone, as expected.
   `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` —
   exit 0 — `1`, as expected.
2. Removed the `vite-plugin-dts` row (`"vite-plugin-dts": "^5.1.0",`) from `package.json`
   `devDependencies`. No other row touched.
3. Rewrote `configs/src/vite.core.config.ts`: removed the `dts` import from `vite-plugin-dts`,
   added `declarationRollup` to the `../helpers.js` import, and replaced the `dts({ tsconfigPath,
   bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types:
   ['node'] } } } } } })` call with `declarationRollup({ project:
   resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`. This checkout has
   only the `core` face; no `browser` or `server` face exists.
4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` — exit 0:

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

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` — exit 0:

   ```
   0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
   ```

   Paths `repair` wrote (8, matching the 8-written count): `vite.config.ts`, `configs/helpers.ts`,
   `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
   `tests/config.test.ts`, `tests/distribution.test.ts` (regenerated new file, not logged as
   "replaced" since it was absent).
5. `npm run format:check` — exit 0 — "All matched files use the correct format." (44 files).
   `npm run lint:check` — exit 0 — no output, no warnings.
   `npm run check` — exit 0 — `tsc --noEmit --project tsconfig.json` then
   `check:src:core` (`tsc --noEmit -p configs/src/tsconfig.core.json`), both clean.
6. `npm run build` — exit 0 — `vite build --config configs/src/vite.core.config.ts` built
   `dist/src/core/index.js` and `dist/src/core/index.cjs`, then the `copy` step wrote
   `dist/src/core/index.d.cts` from `dist/src/core/index.d.ts`. API Extractor logged an informational
   notice that the bundled TypeScript engine (5.9.3) is older than the project's TypeScript
   (6.0.3); this did not fail the build.
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
   ```
   dist/src/core/index.d.cts
   dist/src/core/index.d.ts
   ```
   `head -5 dist/src/core/index.d.ts`:
   ```
   import type { ContractShape } from '@orkestrel/contract';
   import type { EmitterErrorHandler } from '@orkestrel/emitter';
   import type { EmitterHooks } from '@orkestrel/emitter';
   import type { EmitterInterface } from '@orkestrel/emitter';
   import type { FieldPath } from '@orkestrel/contract';
   ```
   `head -5 dist/src/core/index.d.cts` — identical to the preceding.
7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0 — `npm --version` reported
   `11.19.1`. `vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution`:
   ```
   Test Files  1 passed (1)
        Tests  9 passed (9)
   ```
8. `git status --short`:
   ```
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M configs/src/vite.core.config.ts
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
    .oxlintrc.json                  |   69 +++
    configs/helpers.ts              |  304 ++++++++++-
    configs/policy.ts               |  731 +++++++++++++++++++++++++-
    configs/src/vite.core.config.ts |   17 +-
    package.json                    |    1 -
    tests/config.test.ts            |  783 +++++++++++++++++++++++++++-
    tests/policy.test.ts            |  202 ++------
    tests/setupPolicy.ts            | 1078 +++------------------------------------
    vite.config.ts                  |    7 +-
    9 files changed, 1963 insertions(+), 1229 deletions(-)
   ```

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` printed nothing (exit 1, no
   match). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reported `1` for the sole
   `core` face.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier.
   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` (the installed head
   start's binary, run in place of `npx scaffold audit --offline` per the recorded deviation)
   reported "0 of 34 planned paths drifted from the plan."
3. PASS — `format:check`, `lint:check`, and `check` all exited 0.
4. PASS — `build` exited 0 and emitted `dist/src/core/index.d.ts` and `dist/src/core/index.d.cts`
   for the sole `core` face.
5. PASS — `test:distribution` under npm 11 (`11.19.1`) exited 0, 9 of 9 tests passed.

## Deviations

- The host's command classifier refused `npx scaffold ...`. Ran the installed head start's own
  binary instead, `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline`,
  for both `repair` and `audit`, as the brief's Context and Host sections direct.
- `repair` wrote to `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`,
  `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` beyond
  `tests/distribution.test.ts`. This is the brief's own "every vendored file or guide mirror
  `repair` refreshes" clause under Scope, not unexpected drift — `audit --offline` confirms zero
  drift against the regenerated plan afterward. No file the brief marks off-limits was edited
  directly by this unit; every listed path was written solely by `repair`.
- No other deviation. This checkout carries only the `core` face (no `browser` or `server` face),
  so only `configs/src/vite.core.config.ts` needed rewriting.

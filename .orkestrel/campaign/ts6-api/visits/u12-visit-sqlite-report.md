# Unit report — U12 fleet-visit-sqlite (phase A, before the releases)

## Steps

1. `git status --short` — exit 0 — last line: `D  tests/distribution.test.ts` (matched expectation, alone).
   `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` — exit 0 — output `1` (matched expectation).

2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies`. No other row touched.

3. Rewrote `configs/src/vite.server.config.ts` (this checkout's only face) from the `dts({ tsconfigPath, bundleTypes: true, beforeWriteFile })` shape to `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.server.json'), rewrite: rewriteCoreSpecifier })`, imported from `'../helpers.js'` beside the existing helper imports. The inline `beforeWriteFile` rewrite and its comment were removed and replaced by the seed's two-line comment above `export default`. The `vite-plugin-dts` import was removed; nothing else in the file changed.

4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` — exit 0 — output:
   ```
   0 of 35 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 7.
   vite.config.ts replaced (1 line added).
   configs/helpers.ts replaced (300 lines added).
   configs/policy.ts replaced (677 lines added).
   .oxlintrc.json replaced (69 lines added).
   tests/setupPolicy.ts replaced (912 lines removed).
   tests/policy.test.ts replaced (142 lines removed).
   tests/config.test.ts replaced (751 lines added).
   8 written, 28 unchanged, 0 removed in ..
   ```
   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` — exit 0 — output:
   ```
   0 of 35 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 7.
   ```
   Paths `repair` wrote (8 total): `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts` (written back at the path the Orchestrator's pre-launch `git rm` left absent; it is not named in the "replaced" lines because it was a fresh write rather than a byte replacement, but it is included in the reported "8 written" count).

5. `npm run format:check` — exit 0 — last lines:
   ```
   All matched files use the correct format.
   Finished in 2487ms on 43 files using 4 threads.
   ```
   `npm run lint:check` — exit 0 — no output (silent pass).
   `npm run check` — exit 0 — last lines:
   ```
   > @orkestrel/sqlite@0.0.10 check:src:server
   > tsc --noEmit -p configs/src/tsconfig.server.json
   ```

6. `npm run build` — exit 0 — last lines:
   ```
   > @orkestrel/sqlite@0.0.10 copy
   > node -e "..." dist/src/server/index.d.ts dist/src/server/index.d.cts

   Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
   ```
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts` — output:
   ```
   dist/src/server/index.d.cts
   dist/src/server/index.d.ts
   ```
   `head -5 dist/src/server/index.d.ts`:
   ```
   import type { StatementSync } from 'node:sqlite';

   /**
    * Normalizes {@link SQLiteParameters} to the binding shape a native `StatementSync`
    * call expects.
   ```
   `head -5 dist/src/server/index.d.cts` — byte-identical to the preceding (copy target).

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0 — last lines:
   ```
   Test Files  1 passed (1)
        Tests  9 passed (9)
     Start at  00:32:03
     Duration  15.04s (transform 175ms, setup 25ms, import 2.01s, tests 12.79s, environment 0ms)
   ```

8. `git status --short`:
   ```
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M configs/src/vite.server.config.ts
    M package.json
    M tests/config.test.ts
   D  tests/distribution.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
   ?? tests/distribution.test.ts
    M vite.config.ts
   ```
   `git diff --stat`:
   ```
    .oxlintrc.json                    |   69 +++
    configs/helpers.ts                |  304 ++++++++++-
    configs/policy.ts                 |  731 ++++++++++++++++++++++++-
    configs/src/vite.server.config.ts |   19 +-
    package.json                      |    1 -
    tests/config.test.ts              |  783 ++++++++++++++++++++++++++-
    tests/policy.test.ts              |  202 ++-----
    tests/setupPolicy.ts              | 1078 +++----------------------------------
    vite.config.ts                    |    7 +-
    9 files changed, 1965 insertions(+), 1229 deletions(-)
   ```

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no match). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` for the checkout's one face (`vite.server.config.ts`).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier. `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` (the installed head start's own binary, substituted per the brief's Context for the host-refused `npx scaffold audit --offline`) reports `0 of 35 planned paths drifted from the plan`.
3. PASS — `format:check`, `lint:check`, and `check` each exit 0.
4. PASS — `build` exits 0 and emits `dist/src/server/index.d.ts` and `dist/src/server/index.d.cts` for the one configured face, so the unchanged exports map resolves both conditions.
5. PASS — `test:distribution` under npm 11 exits 0 (9 tests passed).

## Deviations

- Per the brief's Context and Host notes, ran `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline` instead of `npx scaffold <command> --offline` for both `repair` and `audit`, because the host's command classifier refuses `npx scaffold ...`. This is the substitution the brief names in advance, not a new one.
- No other deviation. No face's config carried a shape outside the Context's two `dts(` forms (only the `server` face exists in this checkout). `repair` and `audit` reported no drift in any file outside the owned/reported set. No gate failed. The build emitted `index.d.ts` for the one configured face.

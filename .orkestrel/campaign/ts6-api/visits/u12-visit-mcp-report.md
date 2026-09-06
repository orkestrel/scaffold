# Unit report — U12 fleet-visit-mcp (phase A, before the releases)

## Steps

1. `git status --short` and `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts`
   Exit 0 / 0. Output: `D  tests/distribution.test.ts` alone; `declarationRollup` count `1`. Both matched expectation.

2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies`. No other row touched.

3. Rewrote each `configs/src/vite.<face>.config.ts`:
   - `configs/src/vite.core.config.ts`: replaced the `dts(...)` call with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.core.json'), types: ['node'] })`, imported `declarationRollup` from `../helpers.js` beside `environmentBoundary` and `outputBoundary`, removed the `vite-plugin-dts` import. Nothing else changed.
   - `configs/src/vite.server.config.ts`: replaced the `dts(...)` call (with its inline `beforeWriteFile` rewrite) with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.server.json'), rewrite: rewriteCoreSpecifier })`, imported `declarationRollup` and `rewriteCoreSpecifier` from `../helpers.js`, removed the `vite-plugin-dts` import, replaced the old two-line comment with the seed's two-line comment.
   - `configs/src/vite.browser.config.ts`: same transform as server, project path `configs/src/tsconfig.browser.json`.

4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline`
   Exit 0. Output:
   ```
   0 of 47 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 14.
   vite.config.ts replaced (1 line added).
   configs/helpers.ts replaced (300 lines added).
   configs/policy.ts replaced (677 lines added).
   .oxlintrc.json replaced (69 lines added).
   tests/setupPolicy.ts replaced (912 lines removed).
   tests/policy.test.ts replaced (142 lines removed).
   tests/config.test.ts replaced (751 lines added).
   8 written, 40 unchanged, 0 removed in ..
   ```
   Paths `repair` wrote (8, per its own count): `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts` (recreated at the path `git status --short` showed absent; the tool's summary line names 8 written but names only 7 by path, so the eighth is `tests/distribution.test.ts`, confirmed present on disk and in `git status --short` as untracked `??` after the run).

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline`
   Exit 0. Output:
   ```
   0 of 47 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 14.
   ```
   No drift reported in any file, owned or vendored.

5. `npm run format:check` — exit 0, last line: `Finished in 4846ms on 126 files using 4 threads.`
   `npm run lint:check` — exit 0, no output (silent pass).
   `npm run check` — exit 0, ran `tsc --noEmit --project tsconfig.json` and `check:src:core`, `check:src:browser`, `check:src:server`, each with no diagnostics.

6. `npm run build` — exit 0. Built `dist/src/core` (js + cjs + copied `index.d.cts`), `dist/src/browser` (js only, no cjs build step in that face's script), `dist/src/server` (js + cjs + copied `index.d.cts`).
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`:
   ```
   dist/src/browser/index.d.ts
   dist/src/core/index.d.cts
   dist/src/core/index.d.ts
   dist/src/server/index.d.cts
   dist/src/server/index.d.ts
   ```
   `head -5` of each `index.d.ts`:
   - `dist/src/core/index.d.ts`: `import type { EmitterErrorHandler } from '@orkestrel/emitter';` ... (five `import type` lines, no `vite-plugin-dts` residue, no relative `../core` specifiers).
   - `dist/src/browser/index.d.ts`: `import type { EmitterInterface } from '@orkestrel/emitter';` then four `import type ... from '@orkestrel/mcp';` lines — core specifiers rewritten to the package root export as the seed's `rewriteCoreSpecifier` states.
   - `dist/src/server/index.d.ts`: `import type { EmitterInterface } from '@orkestrel/emitter';` then `HTTPClientTransportOptions`, `IncomingMessage` from `node:http`, `JSONRPCInvocation`, `JSONRPCMessage`, all from `@orkestrel/mcp` or `node:http` — same rewrite applied.

   `dist/src/browser/index.d.cts` does not exist. This is not new: the package's `exports["./browser"]` map carries only an `import` condition (no `require`), so no `.d.cts` is needed there, and the pre-existing `build:src:browser` script (unchanged by this unit) never ran a copy step for it. `core` and `server` both carry `require` conditions in `exports` and both emit `index.d.cts`. This satisfies the criterion's stated purpose — "so the unchanged exports map resolves both conditions" — for every face the exports map actually declares both conditions for.

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0.
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

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` printed nothing (exit 1, no match). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reported `1` for each of `vite.browser.config.ts`, `vite.core.config.ts`, `vite.server.config.ts`.
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier (checked with a scoped `grep`, exit 1/no match). `audit --offline` (run through the installed head-start binary per the host substitution below) reported `0 of 47 planned paths drifted from the plan`.
3. PASS — `format:check`, `lint:check`, and `check` all exit 0.
4. PASS — `build` exits 0 and emits `dist/src/core/index.d.ts` + `dist/src/core/index.d.cts` and `dist/src/server/index.d.ts` + `dist/src/server/index.d.cts`; `dist/src/browser/index.d.ts` exists with no `.d.cts` because `exports["./browser"]` carries no `require` condition (pre-existing, unrelated to this unit's change), so the unchanged exports map resolves both conditions everywhere it declares both.
5. PASS — `test:distribution` under npm 11 exits 0 (11 passed, 4 skipped).

## Deviations

- The host's command classifier refuses `npx scaffold ...`, exactly as the brief anticipated. Ran the installed head start's own binary instead: `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` and `... audit --offline`, per the brief's stated substitution.
- No other deviation. No face carried a `dts(` shape outside the two the Context named; `repair`/`audit` reported no drift in any file; no gate failed; the build emitted `index.d.ts` for every face.

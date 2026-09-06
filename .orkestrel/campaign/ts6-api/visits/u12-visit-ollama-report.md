# Unit report — U12 fleet-visit-ollama (phase A, before the releases)

## Steps

1. `git status --short` and `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts`
   - Exit 0 for both.
   - `git status --short` printed `D  tests/distribution.test.ts` alone, matching the expected precondition.
   - `grep -c` printed `1`, confirming the head start carries `declarationRollup`.

2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies`. No other row touched.

3. Rewrote `configs/src/vite.server.config.ts` to the server face's `declarationRollup({ project, rewrite: rewriteCoreSpecifier })` shape, importing `declarationRollup` and `rewriteCoreSpecifier` from `'../helpers.js'`, replacing the inline `beforeWriteFile` rewrite and its comment with the seed's two-line comment above `export default`. This checkout has one face, `server`; no other `configs/src/vite.*.config.ts` file exists.

4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline`
   - Exit 0.
   - Output: `0 of 36 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 8.` then `vite.config.ts replaced (1 line added).`, `configs/helpers.ts replaced (300 lines added).`, `configs/policy.ts replaced (677 lines added).`, `.oxlintrc.json replaced (69 lines added).`, `tests/setupPolicy.ts replaced (912 lines removed).`, `tests/policy.test.ts replaced (142 lines removed).`, `tests/config.test.ts replaced (751 lines added).`, `8 written, 29 unchanged, 0 removed in ..`
   - Paths `repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts` (the absent parser-shaped proof, written back as an untracked file — the 8th written path).

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline`
   - Exit 0.
   - Output: `0 of 36 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 8.` No drift.

5. `npm run format:check` — exit 0. Last lines: `All matched files use the correct format.` / `Finished in 4344ms on 68 files using 4 threads.`
   `npm run lint:check` — exit 0. No output beyond the command echo.
   `npm run check` — exit 0. Ran `tsc --noEmit --project tsconfig.json`, `check:src`, `check:src:server` (`tsc --noEmit -p configs/src/tsconfig.server.json`), all clean.

6. `npm run build` — exit 0. Built `dist/src/server/index.js` and `dist/src/server/index.cjs`, ran the declaration rollup (API Extractor reported the informational note "bundled compiler engine 5.9.3 is older than the project's TypeScript 6.0.3", no error), and copied `dist/src/server/index.d.ts` to `dist/src/server/index.d.cts`.
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`: `dist/src/server/index.d.cts`, `dist/src/server/index.d.ts` — both present for the one face.
   `head -5 dist/src/server/index.d.ts`:
   ```
   import type { ContextFormat } from '@orkestrel/agent';
   import type { Message } from '@orkestrel/agent';
   import type { ProviderDelta } from '@orkestrel/agent';
   import type { ProviderInterface } from '@orkestrel/agent';
   import type { ProviderResult } from '@orkestrel/agent';
   ```

7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0. `npm --version` under that `PATH` reported `11.19.1`. Last lines: `Test Files  1 passed (1)` / `Tests  9 passed (9)`.

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
    M vite.config.ts
   ?? tests/distribution.test.ts
   ```
   `git diff --stat`: 9 files changed, 1965 insertions(+), 1229 deletions(-) across `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `configs/src/vite.server.config.ts`, `package.json`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `vite.config.ts`. `package-lock.json` and the `@orkestrel/scaffold`/`@orkestrel/probe` ranges were not touched.

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no match). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1` (one call, one face: `server`).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier. `audit --offline` (run as the installed head start's own binary, per the host's classifier refusal noted below) reports no drift.
3. PASS — `format:check`, `lint:check`, and `check` all exit 0.
4. PASS — `build` exits 0 and emits `dist/src/server/index.d.ts` and `dist/src/server/index.d.cts` for the one face.
5. PASS — `test:distribution` under npm 11 exits 0 (9 tests passed).

## Deviations

- The host's command classifier refuses `npx scaffold ...`, so `repair` and `audit` ran as `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline`, the same file `npx scaffold` resolves to, per the brief's own substitution instruction.
- No other deviation. The only face in this checkout is `server`; no `browser` or `core` face config exists to touch.

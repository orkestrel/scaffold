# Unit report — U12 fleet-visit-websocket (phase A, before the releases)

## Deviations

`npx scaffold` was not invoked because the brief pre-names the host's command classifier refusal;
per the brief's Host line, `node node_modules/@orkestrel/scaffold/dist/bin/main.js <command>
--offline` was run instead. No other deviation.

## Steps

1. `git status --short` → `D  tests/distribution.test.ts` (exit 0, matched expectation).
   `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` →
   `1` (exit 0, matched expectation).
2. Removed the `vite-plugin-dts` row (`"vite-plugin-dts": "^5.1.0",`) from `package.json`
   `devDependencies`. No other row touched.
3. Rewrote `configs/src/vite.server.config.ts` to the server-face seed: replaced the
   `vite-plugin-dts` `dts({ tsconfigPath, bundleTypes: true, beforeWriteFile })` shape and its
   inline rewrite comment with `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.server.json'), rewrite: rewriteCoreSpecifier })`,
   both imported from `'../helpers.js'`, and the seed's own two-line comment above
   `export default`.
4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` — exit 0. Output:
   ```
   integration: integration drives features across environments, and this workspace declares fewer than two, so its seed composes nothing.
   0 of 37 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 9.
   vite.config.ts replaced (1 line added).
   configs/helpers.ts replaced (300 lines added).
   configs/policy.ts replaced (677 lines added).
   .oxlintrc.json replaced (69 lines added).
   tests/setupPolicy.ts replaced (912 lines removed).
   tests/policy.test.ts replaced (142 lines removed).
   tests/config.test.ts replaced (751 lines added).
   8 written, 30 unchanged, 0 removed in ..
   ```
   Paths `repair` wrote: `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`,
   `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and
   `tests/distribution.test.ts` (the absent file it regenerated; 8 written total).

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` — exit 0. Output:
   ```
   integration: integration drives features across environments, and this workspace declares fewer than two, so its seed composes nothing.
   0 of 37 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 9.
   ```
   No drift reported in any file, owned or vendored.
5. `npm run format:check` — exit 0, "All matched files use the correct format." (47 files).
   `npm run lint:check` — exit 0, no output (no warnings/errors).
   `npm run check` — exit 0 (`tsc --noEmit --project tsconfig.json` then
   `check:src:server` → `tsc --noEmit -p configs/src/tsconfig.server.json`, both clean).
6. `npm run build` — exit 0. `clean` then `build:src:server`:
   `vite build --config configs/src/vite.server.config.ts` built
   `dist/src/server/index.js` (31.16 kB) and `dist/src/server/index.cjs` (32.39 kB), then
   `copy dist/src/server/index.d.ts dist/src/server/index.d.cts` copied the declaration file.
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts` →
   `dist/src/server/index.d.cts` and `dist/src/server/index.d.ts` both present.
   `head -5 dist/src/server/index.d.ts` and `head -5 dist/src/server/index.d.cts` are identical:
   ```
   import type { Duplex } from 'node:stream';
   import type { EmitterErrorHandler } from '@orkestrel/emitter';
   import type { EmitterHooks } from '@orkestrel/emitter';
   import type { EmitterInterface } from '@orkestrel/emitter';
   ```
7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0. `vitest run --config
   vite.config.ts --no-cache --reporter=dot --project distribution`: 1 test file passed, 9 tests
   passed, duration 21.41s.
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
   `git diff --stat`: 9 files changed, 1965 insertions(+), 1229 deletions(-)
   (`.oxlintrc.json` +69, `configs/helpers.ts` +304/-, `configs/policy.ts` +731/-,
   `configs/src/vite.server.config.ts` +19/-, `package.json` -1, `tests/config.test.ts` +783/-,
   `tests/policy.test.ts` +202 net removal, `tests/setupPolicy.ts` net removal to 1078 lines
   changed, `vite.config.ts` +7/-).

## Acceptance criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1, no
   matches). `grep -c "declarationRollup(" configs/src/vite.*.config.ts` → `1` (one face,
   one call).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier as an import
   (the file resolves `typescript/bin/tsc` through `createRequire` inside its body, not as a
   module specifier the head lines carry); `audit --offline` reported no drift (`0 of 37 planned
   paths drifted`).
3. PASS — `format:check`, `lint:check`, and `check` all exited 0.
4. PASS — `build` exited 0 and emitted `dist/src/server/index.d.ts` and
   `dist/src/server/index.d.cts` for the sole `server` face; the unchanged exports map resolves
   both the `import` and `require` conditions against these files.
5. PASS — `test:distribution` under npm 11 exited 0 (9 tests passed).

## Owned files changed

- `package.json` — removed the `vite-plugin-dts` `devDependencies` row only.
- `configs/src/vite.server.config.ts` — replaced `vite-plugin-dts`'s `dts(...)` with
  `declarationRollup(...)` and `rewriteCoreSpecifier` from `../helpers.js`, per the seed.
- `tests/distribution.test.ts` — regenerated by `repair` (parser-shaped proof), previously absent.
- Vendored files `repair` refreshed (report-only, not hand-edited): `vite.config.ts`,
  `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`.

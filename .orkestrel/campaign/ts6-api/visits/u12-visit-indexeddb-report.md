# Unit report — U12 fleet-visit-indexeddb (phase A, before the releases)

## Steps

1. `git status --short` → `D  tests/distribution.test.ts` alone. Exit 0.
   `grep -c declarationRollup node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` → `1`. Exit 0.
2. Removed the `vite-plugin-dts` row from `package.json` `devDependencies`. No other row touched.
3. Rewrote `configs/src/vite.browser.config.ts` (the checkout's one face) from the `dts({ tsconfigPath, bundleTypes: true, beforeWriteFile: ... })` shape to `declarationRollup({ project: resolveWorkspacePath('configs/src/tsconfig.browser.json'), rewrite: rewriteCoreSpecifier })`, imported from `'../helpers.js'`, matching the seed at `node_modules/@orkestrel/scaffold/dist/src/core/index.js:1157-1173`. The `vite-plugin-dts` import and the inline `beforeWriteFile` rewrite are gone; the seed's own two-line comment replaces the old four-line comment above `export default`.
4. `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline` — exit 0:
   ```
   0 of 36 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 7.
   vite.config.ts replaced (1 line added).
   configs/helpers.ts replaced (300 lines added).
   configs/policy.ts replaced (677 lines added).
   .oxlintrc.json replaced (69 lines added).
   tests/setupPolicy.ts replaced (912 lines removed).
   tests/policy.test.ts replaced (142 lines removed).
   tests/config.test.ts replaced (751 lines added).
   8 written, 29 unchanged, 0 removed in ..
   ```
   `repair` wrote (8 paths): `vite.config.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts` (the untracked new file replacing the `git rm`-staged deletion; not named in the printed lines because it had no prior tracked bytes to diff against, but `git status` confirms `?? tests/distribution.test.ts` after the run).

   `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline` — exit 0:
   ```
   0 of 36 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 7.
   ```
5. `npm run format:check` — exit 0, last line: `Finished in 3954ms on 53 files using 4 threads.`
   `npm run lint:check` — exit 0, no output beyond the command echo.
   `npm run check` — exit 0, last line: `> tsc --noEmit -p configs/src/tsconfig.browser.json` (no diagnostics printed).
6. `npm run build` — exit 0, last lines:
   ```
   dist/src/browser/index.js  36.65 kB │ gzip: 9.41 kB │ map: 74.18 kB
   ✓ built in 193ms
   Analysis will use the bundled TypeScript version 5.9.3
   *** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
   ```
   `ls dist/src/*/index.d.ts dist/src/*/index.d.cts` → `dist/src/browser/index.d.ts` exists; `dist/src/*/index.d.cts` reports "No such file or directory". `head -5 dist/src/browser/index.d.ts` shows a normal TSDoc-led declaration file.
7. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0, last lines:
   ```
   Test Files  1 passed (1)
        Tests  7 passed | 2 skipped (9)
   ```
8. `git status --short`:
   ```
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M configs/src/vite.browser.config.ts
    M package.json
    M tests/config.test.ts
   D  tests/distribution.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M vite.config.ts
   ?? tests/distribution.test.ts
   ```
   `git diff --stat`: 9 files changed, 1965 insertions(+), 1230 deletions(-).

## Criteria

1. PASS — `grep -n "vite-plugin-dts" package.json configs/src/*.ts` prints nothing (exit 1); `grep -c "declarationRollup(" configs/src/vite.*.config.ts` reports `1`, one call for the checkout's one face (`browser`).
2. PASS — `head -20 tests/distribution.test.ts` names no `typescript` specifier; `audit --offline` reports no drift.
3. PASS — `format:check`, `lint:check`, `check` all exit 0.
4. PARTIAL / not a defect — `build` exits 0 and emits `dist/src/browser/index.d.ts`. It emits no `dist/src/browser/index.d.cts`, and this package's own `package.json` `exports` map carries no `require` condition — only `types`/`import`/`default` (verified: `grep -n "require" package.json` matches only two `node:fs`/`node:path` `require(...)` calls in scripts, not an exports condition). `declarationRollup` in `node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts:634-735` never writes a `.d.cts` copy itself; a `.d.cts` only exists where a face's own build step or exports map calls for a second condition (as scaffold's own core/server faces do, which do carry `require` conditions — confirmed at `node_modules/@orkestrel/scaffold/package.json:37-52`). Because this checkout's exports map is unchanged and names only the `import`/`default`/`types` trio for its single face, there is nothing for the criterion's premised second file to resolve, and the build output matches the unchanged exports map exactly.
5. PASS — `test:distribution` under npm 11 exits 0 (7 passed, 2 skipped).

## Deviations

None of the deviation contract's stop conditions fired: the face's config carried the server/browser `dts(` shape the Context describes, `repair` and `audit` reported no drift in any file, no gate failed in a file outside the owned set, and `build` did emit `index.d.ts` for the face. The one departure from the brief's literal wording is acceptance criterion 4's `.d.cts` expectation, addressed under Criteria above: it does not apply to this package because its `exports` map (untouched, off-limits, and out of this unit's scope) never named a `require` condition, so `declarationRollup` correctly emits only the one declaration file this face's published surface uses.

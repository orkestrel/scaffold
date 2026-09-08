# Report — d7n-table-verify

Lane held: verifier table

## Standing conditions

- Installed `@orkestrel/guide` version: `0.0.18` (packed tip, `--no-save`, per standing condition; `package.json` declares `^0.0.17`).
- `git rev-parse --short HEAD`: `e82fe9b`
- `git status --short`: empty (clean tree)

## Commands

1. `git rev-parse --short HEAD && git status --short` — exit 0. Output: `e82fe9b` (no status lines; tree clean).
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0. Output: `0.0.18`.
3. `npm run format:check` — exit 0. Last lines:
   ```
   Checking formatting...
   All matched files use the correct format.
   Finished in 3627ms on 63 files using 4 threads.
   ```
4. `npm run lint:check` — exit 0. Output: `oxlint --config .oxlintrc.json --deny-warnings .` (no findings).
5. `npm run check` — exit 0. Ran `tsc --noEmit --project tsconfig.json` then `check:src:core` (`tsc --noEmit -p configs/src/tsconfig.core.json`), no diagnostics.
6. `npm run build` — exit 0. Last lines:
   ```
   vite v8.2.2 building client environment for production...
   dist/src/core/index.js  51.56 kB │ gzip: 12.06 kB │ map: 98.24 kB
   dist/src/core/index.cjs  54.07 kB │ gzip: 12.28 kB │ map: 99.30 kB
   ✓ built in 277ms
   Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
   ```
7. `npm run docs` — exit 0. Output: `rows read: 1, disagreements found: 0`.
8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Per-project totals:
   - `test:src` (project `src:core`): Test Files 16 passed (16); Tests 104 passed (104).
   - `test:policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91).
   - `test:config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173).
   - `test:setup`: Test Files 1 passed (1); Tests 12 passed (12).
   - `test:guides`: Test Files 1 passed (1); Tests 86 passed (86).
9. `grep -n '"test:distribution"' package.json` — exit 0, script present at line 59: `"test:distribution": "vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution"`.
   `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0. Test Files 1 passed (1); Tests 9 passed (9).

## Anomalies

- `npm run build` and `npm run test:config` each emit an API Extractor notice: "The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor." Non-fatal, no exit-code effect.

GATES: GREEN

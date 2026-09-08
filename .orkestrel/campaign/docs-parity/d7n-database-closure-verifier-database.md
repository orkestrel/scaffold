All commands passed on exit code 0. Report below.

---

Lane held: verifier database

# Report — d7n-database-verify

**Working directory:** `/home/user/fleet/database`

## Command results

1. `git rev-parse --short HEAD && git status --short` — exit 0
   - HEAD: `cdbf66a`
   - `git status --short`: empty (clean tree)

2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0
   - Installed `@orkestrel/guide` version: `0.0.18` (packed tip, `--no-save`; `package.json` declares `^0.0.17` per the recorded head-start standing condition)

3. `npm run format:check` — exit 0
   - `Checking formatting... All matched files use the correct format. Finished in 2549ms on 100 files using 4 threads.`

4. `npm run lint:check` — exit 0
   - `oxlint --config .oxlintrc.json --deny-warnings .` produced no output (no warnings/errors)

5. `npm run check` — exit 0
   - `tsc --noEmit --project tsconfig.json` and `check:src:core`, `check:src:browser`, `check:src:server` all completed with no diagnostics printed

6. `npm run build` — exit 0
   - `dist/src/core/index.js` 129.24 kB, `dist/src/browser/index.js` 35.13 kB, `dist/src/server/index.js` 96.48 kB, all built successfully
   - Non-fatal API Extractor notice repeated across targets: `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.`

7. `npm run docs` — exit 0
   - `rows read: 1, disagreements found: 0`

8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0
   - `test:src`: Test Files 25 passed (25); Tests 971 passed (971)
   - `test:policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
   - `test:config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
   - `test:setup`: Test Files 3 passed (3); Tests 82 passed (82)
   - `test:guides`: Test Files 1 passed (1); Tests 88 passed (88)

9. `grep -n '"test:distribution"' package.json` — exit 0, script present:
   `"test:distribution": "vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution"`
   `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0
   - Test Files 1 passed (1); Tests 11 passed | 4 skipped (15)

## Anomalies

- Every Vitest project run under `npm test` and `test:distribution` emitted `(node:PID) ExperimentalWarning: SQLite is an experimental feature and might change at any time` — an informational Node warning, not a failure.
- `npm run build` emitted a repeated non-fatal API Extractor notice about the bundled TypeScript version (`5.9.3`) being older than the project's TypeScript (`6.0.3`); build still succeeded with exit 0.
- Vitest's `test:src` run logged `[vite] (client) Re-optimizing dependencies because lockfile has changed` mid-run; the run still completed with all tests passing.

GATES: GREEN

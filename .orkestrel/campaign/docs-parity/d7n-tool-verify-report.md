# Report — d7n-tool-verify (tool's whole chain under the guide head start)

Lane held: verifier tool

## Installed guide version

`node -p "require('./node_modules/@orkestrel/guide/package.json').version"` → `0.0.18` (exit 0). The registry serves `0.0.17`; `package.json` declares `^0.0.17`. This matches the brief's recorded head-start state.

## Command results

1. `git rev-parse --short HEAD && git status --short`
   Exit 0. HEAD `c9755ef`. `git status --short` printed no lines (clean tree).

2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`
   Exit 0. Output: `0.0.18`.

3. `npm run format:check`
   Exit 0.
   ```
   Checking formatting...
   All matched files use the correct format.
   Finished in 1831ms on 42 files using 4 threads.
   ```

4. `npm run lint:check`
   Exit 0. No warnings or errors reported.

5. `npm run check`
   Exit 0. `tsc --noEmit --project tsconfig.json` and `check:src:core` (`tsc --noEmit -p configs/src/tsconfig.core.json`) both completed with no diagnostics.

6. `npm run build`
   Exit 0.
   ```
   dist/src/core/index.js  7.49 kB │ gzip: 2.47 kB │ map: 12.08 kB
   dist/src/core/index.cjs  7.89 kB │ gzip: 2.56 kB │ map: 12.23 kB
   ✓ built in 126ms
   Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
   ```
   Anomaly: API Extractor printed `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` This is a warning, not a failure; exit code stayed 0.

7. `npm run docs`
   Exit 0. Output: `rows read: 1, disagreements found: 0` — matches the brief's expected non-zero-rows, zero-disagreements shape.

8. `PATH=/opt/npm11/bin:$PATH npm test` (every project's totals)
   Exit 0 overall.
   - `test:src` (project `src:core`): Test Files 5 passed (5); Tests 54 passed (54).
   - `test:policy` (project `policy`): Test Files 1 passed (1); Tests 90 passed | 1 skipped (91).
   - `test:config` (project `config`): Test Files 1 passed (1); Tests 172 passed | 1 skipped (173). Same API Extractor TypeScript-version warning repeated twice mid-run; non-fatal.
   - `test:setup` (project `setup`): Test Files 1 passed (1); Tests 2 passed (2).
   - `test:guides` (project `guides`): Test Files 1 passed (1); Tests 30 passed (30).

9. `grep -n '"test:distribution"' package.json` — present at line 65:
   `"test:distribution": "vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution",`
   `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — Exit 0. Test Files 1 passed (1); Tests 9 passed (9).

## Anomalies

- API Extractor's TypeScript-version compatibility warning (bundled 5.9.3 vs. project 6.0.3) appeared during `npm run build` and twice during `test:config`; it did not change any exit code and is reported verbatim above.

GATES: GREEN

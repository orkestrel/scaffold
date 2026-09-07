Lane held: verifier

# Gate report — A.4 `d7n-abort-verify`

Working directory: `/home/user/fleet/abort`. Installed guide version: `0.0.18` (packed tip installed `--no-save`; `package.json` declares `^0.0.17` as the recorded head-start state).

## Commands

1. `git rev-parse --short HEAD && git status --short` — exit 0.
   ```
   41f893b
   ```
   `git status --short` returned no lines (clean tree).

2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0.
   ```
   0.0.18
   ```

3. `npm run format:check` — exit 0.
   ```
   Checking formatting...
   All matched files use the correct format.
   Finished in 2878ms on 40 files using 4 threads.
   ```

4. `npm run lint:check` — exit 0.
   ```
   > @orkestrel/abort@0.0.10 lint:check
   > oxlint --config .oxlintrc.json --deny-warnings .
   ```
   (no findings)

5. `npm run check` — exit 0.
   ```
   > @orkestrel/abort@0.0.10 check:src:core
   > tsc --noEmit -p configs/src/tsconfig.core.json
   ```

6. `npm run build` — exit 0.
   ```
   dist/src/core/index.js  8.38 kB │ gzip: 2.72 kB │ map: 11.69 kB
   dist/src/core/index.cjs  8.85 kB │ gzip: 2.80 kB │ map: 11.85 kB
   ✓ built in 241ms
   Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
   ```

7. `npm run docs` — exit 0.
   ```
   rows read: 1, disagreements found: 0
   ```

8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Totals per Vitest project:
   - `src:core` — Test Files 4 passed (4); Tests 51 passed (51)
   - `policy` — Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
   - `config` — Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
   - `setup` — Test Files 1 passed (1); Tests 1 passed (1)
   - `guides` — Test Files 1 passed (1); Tests 25 passed (25)

9. `grep -n '"test:distribution"' package.json` — present at line 66, so `test:distribution` ran.
   `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0.
   ```
   Test Files  1 passed (1)
        Tests  9 passed (9)
   ```

## Anomalies

- API Extractor (invoked during `npm run build` and during the `config` Vitest project) reports the bundled TypeScript version 5.9.3 is older than the project's TypeScript 6.0.3 and warns to consider upgrading it. This did not change any exit code.

GATES: GREEN

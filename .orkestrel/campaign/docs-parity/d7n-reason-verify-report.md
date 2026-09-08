# Report — d7n-reason-verify

Lane held: verifier reason

## Installed guide version

`0.0.18` — recorded head-start state per brief; `package.json` declares `^0.0.17`.

## Per command

1. `git rev-parse --short HEAD && git status --short` — exit 0
   ```
   82fde71
   ```
   (no untracked/modified files reported by `git status --short`)

2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0
   ```
   0.0.18
   ```

3. `npm run format:check` — exit 0
   ```
   > @orkestrel/reason@0.0.10 format:check
   > oxfmt --config .oxfmtrc.json --check .

   Checking formatting...

   All matched files use the correct format.
   Finished in 2156ms on 80 files using 4 threads.
   ```

4. `npm run lint:check` — exit 0
   ```
   > @orkestrel/reason@0.0.10 lint:check
   > oxlint --config .oxlintrc.json --deny-warnings .
   ```

5. `npm run check` — exit 0
   ```
   > @orkestrel/reason@0.0.10 check
   > tsc --noEmit --project tsconfig.json && npm run check:src

   > @orkestrel/reason@0.0.10 check:src
   > npm run check:src:core

   > @orkestrel/reason@0.0.10 check:src:core
   > tsc --noEmit -p configs/src/tsconfig.core.json
   ```

6. `npm run build` — exit 0
   ```
   > @orkestrel/reason@0.0.10 build:src
   > npm run build:src:core

   > @orkestrel/reason@0.0.10 build:src:core
   > vite build --config configs/src/vite.core.config.ts && npm run copy dist/src/core/index.d.ts dist/src/core/index.d.cts

   vite v8.2.2 building client environment for production...
   transforming...
   ✓ 27 modules transformed.
   rendering chunks...
   computing gzip size...
   dist/src/core/index.js  240.97 kB │ gzip: 51.52 kB │ map: 384.23 kB

   transforming...
   ✓ 27 modules transformed.
   rendering chunks...
   computing gzip size...
   dist/src/core/index.cjs  252.17 kB │ gzip: 52.51 kB │ map: 387.61 kB

   ✓ built in 638ms
   Analysis will use the bundled TypeScript version 5.9.3
   *** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.

   > @orkestrel/reason@0.0.10 copy
   > node -e "..." dist/src/core/index.d.ts dist/src/core/index.d.cts

   Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
   ```

7. `npm run docs` — exit 0
   ```
   > @orkestrel/reason@0.0.10 docs
   > node --experimental-strip-types scripts/docs.ts

   rows read: 1, disagreements found: 0
   ```
   Matches the expected `rows read: <non-zero>, disagreements found: 0` shape.

8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Per-project totals:
   - `test:src` (project `src:core`): Test Files 23 passed (23); Tests 1203 passed (1203)
   - `test:policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
   - `test:config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
   - `test:setup`: Test Files 1 passed (1); Tests 26 passed (26)
   - `test:guides`: Test Files 1 passed (1); Tests 97 passed (97)

9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — script present (confirmed with `grep -n '"test:distribution"' package.json`, line 66) — exit 0
   ```
   > @orkestrel/reason@0.0.10 test:distribution
   > vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution

   Test Files  1 passed (1)
        Tests  9 passed (9)
   ```

## Anomalies

- `api-extractor` (invoked during `build` and `test:config`) reports the bundled TypeScript 5.9.3 compiler is older than the project's TypeScript 6.0.3, a non-fatal informational message; it does not affect exit codes.
- No flakes observed on any run; each command ran once and exited as reported.

GATES: GREEN

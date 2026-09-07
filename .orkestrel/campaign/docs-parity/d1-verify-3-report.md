# Gate report — D1 guide-readers (guide)

1. `npm run format:check` — PASS (exit 0)
   `Checking formatting... All matched files use the correct format. Finished in 7369ms on 80 files using 4 threads.`

2. `npm run lint:check` — PASS (exit 0)
   No output; `oxlint --config .oxlintrc.json --deny-warnings .` reported no diagnostics.

3. `npm run check` — PASS (exit 0)
   `tsc --noEmit --project tsconfig.json && npm run check:src` completed with no diagnostics through `check:src:core`.

4. `npm run build` — PASS (exit 0)
   `dist/src/core/index.js  92.81 kB │ gzip: 23.07 kB │ map: 144.47 kB`
   `dist/src/core/index.cjs  97.28 kB │ gzip: 23.44 kB │ map: 146.07 kB`
   `✓ built in 706ms`
   API Extractor printed its standing compiler-version notice: `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` (non-fatal, exit 0).

5. `npm test` — PASS (exit 0)
   - `test:src`: Test Files 8 passed (8), Tests 481 passed (481), Duration 2.94s.
   - `test:policy`: Test Files 1 passed (1), Tests 77 passed (77), Duration 853ms.
   - `test:config`: Test Files 1 passed (1), Tests 111 passed | 1 skipped (112), Duration 5.90s. (Same API Extractor compiler-version notice printed twice during a fixture run.)
   - `test:setup`: Test Files 1 passed (1), Tests 7 passed (7), Duration 461ms.
   - `test:guides`: Test Files 1 passed (1), Tests 47 passed (47), Duration 1.36s.
   No red row; no re-run needed.

6. `grep -rn "from 'typescript'\|from 'vite'\|from \"vite\"" src` — exit 1, no line printed (expected).

7. `git status --short` — exit 0
   ```
    M README.md
    M guides/guide.md
    M src/core/Guide.ts
    M src/core/constants.ts
    M src/core/factories.ts
    M src/core/helpers.ts
    M src/core/shapers.ts
    M src/core/sources/Source.ts
    M src/core/types.ts
    M src/core/validators.ts
    M tests/guides.test.ts
    M tests/src/core/Guide.test.ts
    M tests/src/core/factories.test.ts
    M tests/src/core/helpers.test.ts
    M tests/src/core/shapers.test.ts
    M tests/src/core/sources/Source.test.ts
    M tests/src/core/validators.test.ts
   ```

## Anomalies

- API Extractor's TypeScript 6.0.3-vs-bundled-5.9.3 compiler-version notice prints during `npm run build` and once inside `test:config`'s fixture run; it is a standing non-fatal notice and did not change any exit code.

Report written to `/home/user/fleet/guide/tmp/units/docs-d1-verify-report.md` and `/home/user/fleet/guide/tmp/units/docs-d1-verify-3-report.md`.

GATES: GREEN
# Report — d7n-emitter-verify

Lane held: verifier emitter

## Preconditions

1. `git rev-parse --short HEAD && git status --short`
   Exit 0. HEAD `045aaca`. `git status --short` output empty — working tree is clean; the brief's stated expectation of uncommitted edits from the closing unit does not hold in this checkout at read time (recorded as read; see Anomalies).

2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`
   Exit 0. Output: `0.0.18` (matches the brief's recorded packed-tip head-start state; `package.json` still declares `^0.0.17`).

## Gates

3. `npm run format:check` — Exit 0
   Last lines:
   ```
   Checking formatting...
   All matched files use the correct format.
   Finished in 3058ms on 38 files using 4 threads.
   ```

4. `npm run lint:check` — Exit 0
   Last lines:
   ```
   > @orkestrel/emitter@0.0.10 lint:check
   > oxlint --config .oxlintrc.json --deny-warnings .
   ```
   (no diagnostics printed)

5. `npm run check` — Exit 0
   Last lines:
   ```
   > @orkestrel/emitter@0.0.10 check:src:core
   > tsc --noEmit -p configs/src/tsconfig.core.json
   ```
   (no diagnostics printed)

6. `npm run build` — Exit 0
   Last lines:
   ```
   > @orkestrel/emitter@0.0.10 copy
   > node -e "..." dist/src/core/index.d.ts dist/src/core/index.d.cts

   Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
   ```

7. `npm run docs` — Exit 0
   Last line: `rows read: 1, disagreements found: 0` (matches expected shape, non-zero rows, zero disagreements).

8. `PATH=/opt/npm11/bin:$PATH npm test` — Exit 0. Per-project Vitest totals:
   - `src:core`: Test Files 3 passed (3); Tests 43 passed (43)
   - `policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
   - `config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
   - `setup`: Test Files 1 passed (1); Tests 1 passed (1)
   - `guides`: Test Files 1 passed (1); Tests 23 passed (23)

9. `grep -n '"test:distribution"' package.json` — script present (line 66).
   `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — Exit 0.
   Last lines:
   ```
   Test Files  1 passed (1)
        Tests  9 passed (9)
     Start at  02:18:19
     Duration  12.80s
   ```

## Anomalies

- The brief's standing condition states the working tree carries the closing unit's uncommitted edits; `git status --short` at read time returned empty (clean tree) at HEAD `045aaca`. Recorded as read, per the brief's instruction to record the status as read rather than to reconcile it.
- The `check` and `build:src:core` steps each print an API Extractor notice that the bundled TypeScript version (`5.9.3`) is older than the project's TypeScript version (`6.0.3`); this is an informational notice, not a nonzero exit or a failure.

GATES: GREEN

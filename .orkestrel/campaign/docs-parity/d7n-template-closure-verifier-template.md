# Gate report — verifier lane, `template` package

Lane held: verifier template

## Command results

1. `git rev-parse --short HEAD && git status --short` — exit 0. HEAD `7b8bdd9`. `git status --short` returned no lines: the working tree is clean, not carrying uncommitted edits as the brief's standing condition described. Recorded as read (see Anomalies).

2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0. Installed `@orkestrel/guide` version: `0.0.18`.

3. `npm run format:check` — exit 0.
   Last lines:
   ```
   All matched files use the correct format.
   Finished in 2420ms on 45 files using 4 threads.
   ```

4. `npm run lint:check` — exit 0. No output beyond the command echo.

5. `npm run check` — exit 0.
   Last lines:
   ```
   > @orkestrel/template@0.0.7 check:src:core
   > tsc --noEmit -p configs/src/tsconfig.core.json
   ```

6. `npm run build` — exit 0.
   Last lines:
   ```
   > @orkestrel/template@0.0.7 copy
   > node -e "..." dist/src/core/index.d.ts dist/src/core/index.d.cts
   Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
   ```

7. `npm run docs` — exit 0.
   Last line: `rows read: 1, disagreements found: 0` — matches expected shape (non-zero rows, zero disagreements).

8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Per-project totals:
   - `src:core`: Test Files 5 passed (5); Tests 128 passed (128)
   - `policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
   - `config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
   - `setup`: Test Files 1 passed (1); Tests 1 passed (1)
   - `guides`: Test Files 1 passed (1); Tests 34 passed (34)

9. `grep -n '"test:distribution"' package.json` — present at `package.json:62`. Ran `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0.
   - `distribution`: Test Files 1 passed (1); Tests 9 passed (9)

## Anomalies

- The brief's standing condition states the working tree carries the closing unit's uncommitted edits under verification. `git status --short` returned empty output: the tree at HEAD `7b8bdd9` is clean, with no uncommitted changes present at verification time.
- `npm run check` and `npm run test:distribution` (through `npm run build:src:core`'s API Extractor step) each print: `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` This did not affect any exit code.

GATES: GREEN

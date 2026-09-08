# Report — d7n-markdown-verify

Lane held: verifier markdown

## Standing state

- `git rev-parse --short HEAD`: `40f63bb`
- `git status --short`: empty (clean working tree — no uncommitted edits present at verification time)
- Installed `@orkestrel/guide` version: `0.0.18` (packed tip, `--no-save`; `package.json` declares `^0.0.17`, matching the recorded head-start state)

## Commands

1. `git rev-parse --short HEAD && git status --short` — exit 0. Output: `40f63bb`, no status lines (clean tree).
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0. Output: `0.0.18`.
3. `npm run format:check` — exit 0.
   ```
   Checking formatting...
   All matched files use the correct format.
   Finished in 4312ms on 48 files using 4 threads.
   ```
4. `npm run lint:check` — exit 0. No output beyond the command header (no findings).
5. `npm run check` — exit 0. Ran `tsc --noEmit --project tsconfig.json`, `check:src`, `check:src:core` with no diagnostics.
6. `npm run build` — exit 0.
   ```
   dist/src/core/index.js  135.23 kB │ gzip: 31.34 kB │ map: 223.96 kB
   dist/src/core/index.cjs  140.83 kB │ gzip: 31.79 kB │ map: 226.33 kB
   ✓ built in 483ms
   Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
   ```
   API Extractor printed its standing notice: `The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` (non-fatal; build exited 0).
7. `npm run docs` — exit 0. Output: `rows read: 1, disagreements found: 0`.
8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Per-project totals:
   - `src:core`: 7 test files passed, 604 tests passed.
   - `policy`: 1 test file passed, 90 passed, 1 skipped (91 total).
   - `config`: 1 test file passed, 172 passed, 1 skipped (173 total). Same API Extractor TypeScript-version notice printed twice as stdout during this project's run (non-fatal).
   - `setup`: 1 test file passed, 24 tests passed.
   - `guides`: 1 test file passed, 63 tests passed.
9. `grep -n '"test:distribution"' package.json` — present at line 68. Ran `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0. `distribution` project: 1 test file passed, 9 tests passed.

## Anomalies

- API Extractor's bundled-TypeScript-version notice (TypeScript 6.0.3 vs. bundled 5.9.3) appeared during `npm run build` and during the `config` Vitest project's `test:distribution`-adjacent run; it is a printed advisory, not an error, and every affected command still exited 0.
- No other anomalies. No flakes observed; each gate ran once and passed.

GATES: GREEN

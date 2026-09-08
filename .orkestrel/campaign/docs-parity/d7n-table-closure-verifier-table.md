# Gate Report — `d7n-table-verify` (table)

Lane held: verifier table

## Per gate

1. `git rev-parse --short HEAD && git status --short` — PASS (exit 0). HEAD `af9a526`; `git status --short` produced no output (clean working tree).
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — PASS (exit 0). Output: `0.0.18`.
3. `npm run format:check` — PASS (exit 0). Last line: `Finished in 3832ms on 63 files using 4 threads.`
4. `npm run lint:check` — PASS (exit 0). No output beyond the command echo.
5. `npm run check` — PASS (exit 0). Final step: `tsc --noEmit -p configs/src/tsconfig.core.json` produced no errors.
6. `npm run build` — PASS (exit 0). Last line: `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`.
7. `npm run docs` — PASS (exit 0). Output: `rows read: 1, disagreements found: 0`.
8. `PATH=/opt/npm11/bin:$PATH npm test` — PASS (exit 0). Per-project totals:
   - `test:src`: 16 files, 104 tests passed.
   - `test:policy`: 1 file, 90 passed, 1 skipped (91 total).
   - `test:config`: 1 file, 172 passed, 1 skipped (173 total).
   - `test:setup`: 1 file, 12 passed.
   - `test:guides`: 1 file, 85 passed.
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` (present in `package.json:59`) — PASS (exit 0). 1 file, 9 tests passed.

## Overall verdict

GREEN.

## Anomalies

- Brief's standing condition states the working tree carries the closing unit's uncommitted edits; `git status --short` returned no output (clean tree) at command 1. Recorded as read; all subsequent gates ran against the tree as found (HEAD `af9a526`).
- `build` and `test:config` both emit a non-fatal API Extractor notice: "The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor." Present in both runs, did not affect exit codes.
- `test:policy` and `test:config` each report one skipped test (not a failure); totals recorded as-is per project.

GATES: GREEN

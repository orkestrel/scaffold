Lane held: verifier codec

Command 1 — `git rev-parse --short HEAD && git status --short`
Exit 0. Output: `1effa58` (HEAD), no untracked/modified files (clean tree).

Command 2 — `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`
Exit 0. Output: `0.0.18` (the recorded head start; `package.json` declares `^0.0.17`, as expected).

Command 3 — `npm run format:check`
Exit 0. Last lines: `All matched files use the correct format.` / `Finished in 4808ms on 33 files using 4 threads.`

Command 4 — `npm run lint:check`
Exit 0. No output beyond the invoked command line.

Command 5 — `npm run check`
Exit 0. Last line: `tsc --noEmit -p configs/src/tsconfig.core.json` (no diagnostics printed).

Command 6 — `npm run build`
Exit 0. Last lines: `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`.

Command 7 — `npm run docs`
Exit 0. Last line: `rows read: 1, disagreements found: 0` (matches expectation).

Command 8 — `PATH=/opt/npm11/bin:$PATH npm test`
Exit 0. Per-project totals:
- `test:src`: 2 test files passed, 157 tests passed.
- `test:policy`: 1 test file passed, 90 tests passed, 1 skipped (91 total).
- `test:config`: 1 test file passed, 172 tests passed, 1 skipped (173 total).
- `test:guides`: 1 test file passed, 28 tests passed.

Command 9 — `PATH=/opt/npm11/bin:$PATH npm run test:distribution` (manifest declares this script)
Exit 0. Last lines: `Test Files 1 passed (1)`, `Tests 9 passed (9)`.

GATES: GREEN

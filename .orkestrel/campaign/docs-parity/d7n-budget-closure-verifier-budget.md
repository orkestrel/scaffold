All gates passed. Report follows.

# Report — d7n-budget-verify

Working tree: HEAD `37ada20`; `git status --short` returned empty (no uncommitted changes present at verification time, contrary to the brief's stated standing condition — recorded as an anomaly).

Installed `@orkestrel/guide` version: `0.0.18` (registry serves `0.0.17`; `package.json` declares `^0.0.17` per the head-start standing condition).

| # | Command | Exit | Last lines |
|---|---------|------|------------|
| 1 | `git rev-parse --short HEAD && git status --short` | 0 | `37ada20`, status empty |
| 2 | `node -p "...guide/package.json').version"` | 0 | `0.0.18` |
| 3 | `npm run format:check` | 0 | `All matched files use the correct format. Finished in 2013ms on 40 files using 4 threads.` |
| 4 | `npm run lint:check` | 0 | (no warnings/errors emitted) |
| 5 | `npm run check` | 0 | `tsc --noEmit -p configs/src/tsconfig.core.json` completed with no diagnostics |
| 6 | `npm run build` | 0 | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts` |
| 7 | `npm run docs` | 0 | `rows read: 1, disagreements found: 0` |
| 8 | `PATH=/opt/npm11/bin:$PATH npm test` | 0 | `test:src` 4 files/132 passed; `test:policy` 1 file/90 passed, 1 skipped (91); `test:config` 1 file/172 passed, 1 skipped (173); `test:setup` 1 file/7 passed; `test:guides` 1 file/29 passed |
| 9 | `PATH=/opt/npm11/bin:$PATH npm run test:distribution` | 0 | 1 file, 9 passed |

Anomalies:
- `git status --short` reported clean (no output) at verification time, though the brief states the working tree carries the closing unit's uncommitted edits — recorded as read, not corrected.
- `npm run build` and `npm run test:config` each print an API Extractor notice that the bundled TypeScript version (5.9.3) is older than the project's TypeScript (6.0.3); non-fatal, exit codes unaffected.

GATES: GREEN

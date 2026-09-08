# Gate Report — indexeddb (d7n-indexeddb-verify)

Lane held: verifier indexeddb

**HEAD and status.** `git rev-parse --short HEAD` → `951eace`. `git status --short` → empty (clean tree). This diverges from the brief's standing condition that the tree carries the closing unit's uncommitted edits; recording the divergence as an anomaly, not a fix.

**Installed guide version.** `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` → `0.0.18`, matching the recorded head-start state.

| # | Command | Exit | Last lines |
|---|---------|------|------------|
| 3 | `npm run format:check` | 0 | `All matched files use the correct format.` `Finished in 2435ms on 54 files using 4 threads.` |
| 4 | `npm run lint:check` | 0 | (no output; clean run) |
| 5 | `npm run check` | 0 | `tsc --noEmit -p configs/src/tsconfig.browser.json` (no errors) |
| 6 | `npm run build` | 0 | `✓ built in 141ms` plus an API Extractor version-mismatch notice (informational): `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` |
| 7 | `npm run docs` | 0 | `rows read: 1, disagreements found: 0` |
| 8 | `PATH=/opt/npm11/bin:$PATH npm test` | 0 | see per-project totals below |
| 9 | `PATH=/opt/npm11/bin:$PATH npm run test:distribution` (script present, `package.json:63`) | 0 | `Test Files 1 passed (1)` `Tests 7 passed \| 2 skipped (9)` |

Per-project totals from command 8:
- `src:browser`: 9 test files passed, 129 tests passed
- `policy`: 1 test file passed, 90 tests passed, 1 skipped (91 total)
- `config`: 1 test file passed, 172 tests passed, 1 skipped (173 total)
- `setup`: 2 test files passed, 12 tests passed
- `guides`: 1 test file passed, 71 tests passed

**Anomalies**
- `git status --short` reports a clean tree; the brief states the closing unit's uncommitted edits should be present. Recorded as read, per instruction, without investigation.
- `vite` reported "Re-optimizing dependencies because lockfile has changed" at the start of `test:src`; the suite still ran green.
- The API Extractor TypeScript-version-mismatch notice recurs in `npm run build` and in `test:config`'s stdout; it is an informational compiler-version notice, not a failure, and every affected command still exited `0`.

GATES: GREEN

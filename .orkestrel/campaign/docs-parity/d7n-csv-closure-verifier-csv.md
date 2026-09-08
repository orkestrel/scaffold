Lane held: verifier csv

# Report — d7n-csv-verify (csv gate sweep)

**Working tree at verification** (`git status --short` in `/home/user/fleet/csv`):
```
 M guides/csv.md
 M src/core/constants.ts
 M tests/guides.test.ts
```
HEAD: `715aed6`. Installed `@orkestrel/guide`: `0.0.18` (matches brief's recorded head-start state; registry serves `0.0.17`, `package.json` declares `^0.0.17`).

| # | Command | Exit | Result |
|---|---|---|---|
| 3 | `npm run format:check` | 0 | PASS — 48 files, correct format |
| 4 | `npm run lint:check` | 1 | **FAIL** — `src/core/constants.ts:6:50: error eslint(no-irregular-whitespace)` |
| 5 | `npm run check` | 0 | PASS — no `tsc` diagnostics |
| 6 | `npm run build` | 0 | PASS — build succeeded (informational API Extractor TS-version notice only) |
| 7 | `npm run docs` | 0 | PASS — `rows read: 1, disagreements found: 0` |
| 8 | `PATH=/opt/npm11/bin:$PATH npm test` | 1 | **FAIL** — chain stopped at `test:config` |
| 9 | `PATH=/opt/npm11/bin:$PATH npm run test:distribution` | 0 | PASS — 9/9 tests |

**Gate 4 detail**: `src/core/constants.ts:6` — the doc comment naming the UTF-8 byte-order-mark literal contains the actual BOM bytes (`M-oM-;M-?` in `cat -A`), which Oxlint's `no-irregular-whitespace` rule flags. `constants.ts` is a working-tree modified file, in scope for this verification.

**Gate 8 detail** — per-project totals from `npm test`'s chain (`test:src && test:policy && test:config && test:setup && test:guides`):
- `test:src` (`src:core`): 7 files passed, 239 tests passed.
- `test:policy`: 1 file passed, 90 passed | 1 skipped (91).
- `test:config`: **1 file failed** — 1 failed | 171 passed | 1 skipped (173). Failing test: `tests/config.test.ts > configuration helpers > rolls one face into a single declaration and rewrites its core specifier` at `tests/config.test.ts:2370:55`:
  ```
  AssertionError: expected false to be true
  expect(after.every((entry) => before.has(entry))).toBe(true)
  ```
  Compares an `orkestrel-declarations-*` scratch-directory listing before/after an operation — reads as filesystem scratch-tree timing sensitivity per the brief's standing condition. Reported as read; not investigated.
- `test:setup`, `test:guides`: **not run** — chain halted at `test:config` (`&&`-joined).

Full report written to `/home/user/scaffold/tmp/units/d7n-csv-verify-report.md`.

## Anomalies
- `npm test`'s `&&` chain stopped before `test:setup` and `test:guides` ran; neither has a reading in this pass.
- `npm run build` logged an informational API Extractor notice (bundled TypeScript 5.9.3 older than project's 6.0.3); non-fatal, exit 0.

GATES: RED npm run lint:check, npm test

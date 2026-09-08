Lane held: verifier abort

# Gate report — `abort`

**Anomaly:** the brief states the working tree carries the closing unit's uncommitted edits. `git status --short` returned no output — the tree is clean at `3dad185`. Recorded as read; verification proceeded on the tree as found.

| Command | Exit code | Result |
|---|---|---|
| `git rev-parse --short HEAD && git status --short` | 0 | HEAD `3dad185`; `git status --short` empty (clean tree) |
| `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` | 0 | `0.0.18` |
| `npm run format:check` | 0 | `All matched files use the correct format. Finished in 2414ms on 40 files using 4 threads.` |
| `npm run lint:check` | 0 | no output (clean) |
| `npm run check` | 0 | `tsc --noEmit` and `check:src:core` completed with no diagnostics |
| `npm run build` | 0 | `dist/src/core/index.js 8.32 kB`, `dist/src/core/index.cjs 8.79 kB`; `.d.cts` copied |
| `npm run docs` | 0 | `rows read: 1, disagreements found: 0` |
| `PATH=/opt/npm11/bin:$PATH npm test` | 0 | see per-project totals below |
| `grep -n '"test:distribution"' package.json` | 0 | script present at line 66 |
| `PATH=/opt/npm11/bin:$PATH npm run test:distribution` | 0 | `Test Files 1 passed (1)`, `Tests 9 passed (9)` |

## `npm test` per-project totals

- `src:core`: Test Files 4 passed (4); Tests 51 passed (51)
- `policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
- `config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
- `setup`: Test Files 1 passed (1); Tests 1 passed (1)
- `guides`: Test Files 1 passed (1); Tests 25 passed (25)

## Anomalies

- `git status --short` reported a clean tree, not the uncommitted state the brief's standing conditions describe; recorded as read, no fix attempted.
- `build` and `test:config` each print an API Extractor notice: `The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` — non-fatal, exit codes unaffected.

GATES: GREEN

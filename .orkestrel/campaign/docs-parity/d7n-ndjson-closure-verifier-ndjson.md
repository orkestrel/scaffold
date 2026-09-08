Lane held: verifier ndjson

# Gate report — `d7n-ndjson-verify` (`ndjson`)

**Standing state.** `git rev-parse --short HEAD`: `7ce1e46`. `git status --short`:
```
 M guides/ndjson.md
 M tests/guides.test.ts
```
Installed `@orkestrel/guide` version: `0.0.18` (packed tip, `--no-save`, per the brief's recorded head-start state; `package.json` declares `^0.0.17`).

| Command | Exit | Last lines |
|---|---|---|
| `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` | 0 | `0.0.18` |
| `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 2149ms on 36 files using 4 threads.` |
| `npm run lint:check` | 0 | (no warnings or errors reported) |
| `npm run check` | 0 | `tsc --noEmit -p configs/src/tsconfig.core.json` completed with no diagnostics |
| `npm run build` | 0 | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts` |
| `npm run docs` | 0 | `rows read: 1, disagreements found: 0` |
| `PATH=/opt/npm11/bin:$PATH npm test` | 0 | see per-project totals below |
| `PATH=/opt/npm11/bin:$PATH npm run test:distribution` (script present, `package.json:67`) | 0 | `Test Files 1 passed (1)` / `Tests 9 passed (9)` |

## Per-project totals (`npm test`)

- `src:core`: 2 files passed, 70 passed (0 failed, 0 skipped)
- `policy`: 1 file passed, 90 passed | 1 skipped (91 total)
- `config`: 1 file passed, 172 passed | 1 skipped (173 total)
- `setup`: 1 file passed, 16 passed (16)
- `guides`: 1 file passed, 31 passed (31)
- `distribution` (separate command): 1 file passed, 9 passed (9)

## Anomalies

- `npm run build` and `npm run docs` (during `test:config`) each print: `Analysis will use the bundled TypeScript version 5.9.3` / `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` This is an API Extractor version-mismatch warning, non-fatal, exit codes stayed 0.
- One skipped test each in `policy` (1 of 91) and `config` (1 of 173); not a failure, reported as observed.

GATES: GREEN

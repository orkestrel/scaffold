Lane held: verifier table

## Gate report — `/home/user/fleet/table`

| # | Command | Exit | Result |
|---|---------|------|--------|
| 1 | `git rev-parse --short HEAD && git status --short` | 0 | HEAD `e82fe9b`; tree clean (no status lines) |
| 2 | `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` | 0 | `0.0.18` (packed tip, `--no-save`; `package.json` still declares `^0.0.17` per standing condition) |
| 3 | `npm run format:check` | 0 | "All matched files use the correct format." (63 files) |
| 4 | `npm run lint:check` | 0 | `oxlint --deny-warnings .` — no findings |
| 5 | `npm run check` | 0 | `tsc --noEmit` root + `check:src:core` — no diagnostics |
| 6 | `npm run build` | 0 | `dist/src/core/index.js` and `.cjs` built; `.d.cts` copied |
| 7 | `npm run docs` | 0 | `rows read: 1, disagreements found: 0` |
| 8 | `PATH=/opt/npm11/bin:$PATH npm test` | 0 | see per-project totals below |
| 9 | `grep -n '"test:distribution"' package.json` then `PATH=/opt/npm11/bin:$PATH npm run test:distribution` | 0 / 0 | script present (line 59); Test Files 1 passed (1), Tests 9 passed (9) |

Per-project totals from command 8:
- `test:src` (`src:core`): Test Files 16 passed (16); Tests 104 passed (104)
- `test:policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
- `test:config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
- `test:setup`: Test Files 1 passed (1); Tests 12 passed (12)
- `test:guides`: Test Files 1 passed (1); Tests 86 passed (86)

## Anomalies

- `npm run build` and `test:config` each print an API Extractor notice that the target project's TypeScript 6.0.3 is newer than the bundled compiler engine (5.9.3). Non-fatal, no exit-code effect.

## Overall verdict

GREEN — every gate exited 0.

Report written to `/home/user/scaffold/tmp/units/d7n-table-verify-report.md`.

GATES: GREEN

# Unit verify-final — returned report

## Gate Report — `/home/user/contract` at commit `950a241`

**Pre-check:** `git status --porcelain` → empty (clean). `git log --oneline -1` → `950a241 Publish the retention rule and the eager-bundle reason`.

| Command | Exit code | Result |
|---|---|---|
| `npm run format:check` | 0 | PASS — `oxfmt`: "All matched files use the correct format." 62 files. |
| `npm run lint:check` | 0 | PASS — `oxlint --deny-warnings`, no output, clean. |
| `npm run check` | 0 | PASS — `tsc --noEmit` (root and `configs/src/tsconfig.core.json`), no diagnostics. |
| `npm run build` | 0 | PASS — `vite build` for `configs/src/vite.core.config.ts`; produced `dist/src/core/index.js`, `index.cjs`, `index.d.ts`/`.d.cts`. Non-fatal notices only: API Extractor's bundled TypeScript (5.9.3) is older than the project's TypeScript (6.0.3), and a plugin-timing report. Neither affects the exit code. |
| `npm test` | 0 | PASS — `test:src` 1296 tests (15 files), `test:policy` 111 tests, `test:config` 46 tests, `test:setup` 61 tests, `test:guides` 65 tests — all passed. |

**Chain exit codes in order:** 0, 0, 0, 0, 0.

**Overall verdict:** GREEN. Every gate passed.

**Anomalies**
- `npm run build` prints an API Extractor version-mismatch notice (bundled TypeScript 5.9.3 vs. project TypeScript 6.0.3) and a plugin-timing report; both are informational and did not affect the exit code.

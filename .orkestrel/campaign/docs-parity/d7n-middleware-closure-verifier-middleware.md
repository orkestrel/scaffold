Lane held: verifier middleware

# Report — d7n-middleware-verify

Commands run from `/home/user/fleet/middleware`, each read from `$?`.

## 1. `git rev-parse --short HEAD && git status --short`
Exit 0. `5747e3f`; `git status --short` produced no output (clean tree).

## 2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`
Exit 0. `0.0.18` — matches the brief's recorded standing condition (registry serves `0.0.17`, `package.json` declares `^0.0.17`).

## 3. `npm run format:check`
Exit 0.
```
Checking formatting...
All matched files use the correct format.
Finished in 6565ms on 70 files using 4 threads.
```

## 4. `npm run lint:check`
Exit 0. `oxlint --config .oxlintrc.json --deny-warnings .` — no warnings or errors reported.

## 5. `npm run check`
Exit 0. `tsc --noEmit` across the root project, `configs/src/tsconfig.core.json`, and `configs/src/tsconfig.server.json` — no diagnostics.

## 6. `npm run build`
Exit 0. Core and server builds succeeded (`dist/src/core/index.js`, `dist/src/core/index.cjs`, `dist/src/server/index.js`, `dist/src/server/index.cjs`), each with its `.d.ts`/`.d.cts` pair copied. API Extractor logged its standing advisory that the bundled TypeScript (5.9.3) is older than the project's installed TypeScript (6.0.3); advisory only, did not affect exit code.

## 7. `npm run docs`
Exit 0, matching the expected shape: `rows read: 1, disagreements found: 0`.

## 8. `PATH=/opt/npm11/bin:$PATH npm test`
Exit 0. Per-project totals:

| Project           | Test files | Tests                          |
| ----------------- | ---------- | ------------------------------- |
| src (core+server) | 11 passed  | 432 passed \| 1 skipped (433)   |
| policy            | 1 passed   | 90 passed \| 1 skipped (91)     |
| config            | 1 passed   | 172 passed \| 1 skipped (173)   |
| setup             | 2 passed   | 36 passed (36)                   |
| guides            | 1 passed   | 43 passed (43)                   |

## 9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
Script present (`grep -n '"test:distribution"' package.json` matched line 84). Exit 0: `Test Files 1 passed (1)`, `Tests 11 passed (11)`.

## Installed guide version
`0.0.18` (packed tip, `--no-save`; registry serves `0.0.17`, `package.json` declares `^0.0.17`).

## Anomalies
None. All commands ran clean on the first attempt; no reruns or flakes.

Report written to `/home/user/scaffold/tmp/units/d7n-middleware-verify-report.md`.

GATES: GREEN

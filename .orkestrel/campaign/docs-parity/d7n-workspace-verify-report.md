# Report — d7n-workspace-verify

Lane held: verifier workspace

Repo: `/home/user/fleet/workspace`

## 1. `git rev-parse --short HEAD && git status --short`
Exit: 0
```
eb02ec0
```
(empty `git status --short` output — clean tree)

## 2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`
Exit: 0
```
0.0.18
```
Confirms the packed tip `0.0.18` is installed `--no-save`, matching the brief's recorded head-start state (`package.json` declares `^0.0.17`; registry serves `0.0.17`).

## 3. `npm run format:check`
Exit: 0
```
Checking formatting...
All matched files use the correct format.
Finished in 2507ms on 50 files using 4 threads.
```

## 4. `npm run lint:check`
Exit: 0
```
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no warnings or errors reported)

## 5. `npm run check`
Exit: 0
```
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```
(no diagnostics emitted)

## 6. `npm run build`
Exit: 0
```
dist/src/core/index.js  26.60 kB │ gzip: 7.06 kB │ map: 47.59 kB
dist/src/core/index.cjs  28.03 kB │ gzip: 7.27 kB │ map: 48.03 kB
✓ built in 230ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```
Anomaly (non-fatal, informational only, not an error): API Extractor prints `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` This is a warning line, not an exit-code failure.

## 7. `npm run docs`
Exit: 0
```
rows read: 1, disagreements found: 0
```
Matches the brief's expected shape (non-zero rows read, zero disagreements).

## 8. `PATH=/opt/npm11/bin:$PATH npm test`
Exit: 0 (overall chain: `test:src && test:policy && test:config && test:setup && test:guides`)

Per-project totals:
- `src:core`: Test Files 7 passed (7); Tests 141 passed (141)
- `policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
- `config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
- `setup`: Test Files 1 passed (1); Tests 10 passed (10)
- `guides`: Test Files 1 passed (1); Tests 40 passed (40)

Anomaly (non-fatal, informational only): the `config` project logs the same API Extractor TypeScript-version-mismatch notice twice during `tests/config.test.ts > configuration helpers > rolls one face into a single declaration and rewrites its core specifier`; tests still pass.

## 9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
Manifest declares the script (`package.json:65`):
```
"test:distribution": "vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution",
```
Exit: 0
```
Test Files  1 passed (1)
     Tests  9 passed (9)
```

## Anomalies
- API Extractor's TypeScript-version-mismatch notice (bundled 5.9.3 vs. project 6.0.3) appears during `npm run build` and during the `config` Vitest project; both runs still exit 0 and the notice does not affect pass/fail status.
- No other anomalies, flakes, or cache irregularities observed across the run.

GATES: GREEN

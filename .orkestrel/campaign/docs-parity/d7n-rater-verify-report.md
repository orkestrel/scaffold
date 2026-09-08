Lane held: verifier rater

# Report — d7n-rater-verify

## 1. `git rev-parse --short HEAD && git status --short`
Exit: 0
```
76fab91
```
(status --short: no output, clean tree)

## 2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`
Exit: 0
```
0.0.18
```
Confirms the recorded head-start state: packed `@orkestrel/guide` tip `0.0.18` installed against a `package.json` declaring `^0.0.17`.

## 3. `npm run format:check`
Exit: 0
```
Checking formatting...
All matched files use the correct format.
Finished in 2287ms on 44 files using 4 threads.
```

## 4. `npm run lint:check`
Exit: 0
```
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no warnings or errors)

## 5. `npm run check`
Exit: 0
```
> tsc --noEmit -p configs/src/tsconfig.core.json
```
(no diagnostics)

## 6. `npm run build`
Exit: 0
```
dist/src/core/index.js  26.82 kB │ gzip: 6.00 kB │ map: 39.58 kB
dist/src/core/index.cjs  28.74 kB │ gzip: 6.18 kB │ map: 40.23 kB
✓ built in 114ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```
Anomaly: API Extractor emits `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` This is an informational warning, not a failure; exit code is 0.

## 7. `npm run docs`
Exit: 0
```
rows read: 1, disagreements found: 0
```
Matches the expected shape (non-zero rows read, zero disagreements).

## 8. `PATH=/opt/npm11/bin:$PATH npm test`
Exit: 0

Per-project totals:
- `test:src` (project `src:core`): Test Files 4 passed (4); Tests 131 passed (131)
- `test:policy` (project `policy`): Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
- `test:config` (project `config`): Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
- `test:setup` (project `setup`): Test Files 1 passed (1); Tests 15 passed (15)
- `test:guides` (project `guides`): Test Files 1 passed (1); Tests 29 passed (29)

Anomaly: `test:config` emits the same API Extractor TypeScript-version notice as command 6, twice (once per subtest run), informational only.

## 9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
Script present (`grep -n '"test:distribution"' package.json` → line 66, exit 0).
Exit: 0
```
Test Files  1 passed (1)
      Tests  9 passed (9)
```

## Anomalies

- API Extractor's TypeScript-version mismatch notice (bundled 5.9.3 vs. project 6.0.3) appears during command 6 and during the `test:config` project in command 8. It does not change any exit code and is not a gate failure.
- No timing failures, flakes, or cache anomalies on reruns; every command ran once and returned green on that run.

GATES: GREEN

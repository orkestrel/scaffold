# Report — d7n-form-verify

Lane held: verifier form

## 1. `git rev-parse --short HEAD && git status --short`
Exit: 0
```
2f1ceaf
```
(no untracked/modified files; clean tree)

## 2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`
Exit: 0
```
0.0.18
```
Confirms the packed `0.0.18` head-start install (`package.json` declares `^0.0.17`).

## 3. `npm run format:check`
Exit: 0
```
Checking formatting...
All matched files use the correct format.
Finished in 3644ms on 49 files using 4 threads.
```

## 4. `npm run lint:check`
Exit: 0
```
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no warnings/errors reported)

## 5. `npm run check`
Exit: 0
```
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
```

## 6. `npm run build`
Exit: 0
```
dist/src/core/index.js  65.38 kB │ gzip: 15.22 kB │ map: 114.64 kB
dist/src/core/index.cjs  70.87 kB │ gzip: 15.61 kB │ map: 117.15 kB
✓ built in 313ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```
Note: API Extractor prints "*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor." — informational, not a failure (exit 0).

## 7. `npm run docs`
Exit: 0
```
rows read: 1, disagreements found: 0
```
Matches the expected `rows read: <non-zero>, disagreements found: 0` shape. `git status --short` after the run is clean (no drift written).

## 8. `PATH=/opt/npm11/bin:$PATH npm test`
Exit: 0

Per-project totals:
- `test:src` (project `src:core`): Test Files 9 passed (9); Tests 183 passed (183)
- `test:policy` (project `policy`): Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
- `test:config` (project `config`): Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
- `test:setup` (project `setup`): Test Files 1 passed (1); Tests 14 passed (14)
- `test:guides` (project `guides`): Test Files 1 passed (1); Tests 51 passed (51)

Same API Extractor TypeScript-version notice repeats during `test:config` (stdout of one test) — informational only.

## 9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
Script present: `grep -n '"test:distribution"' package.json` → line 59:
`"test:distribution": "vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution",`

Exit: 0
```
Test Files  1 passed (1)
     Tests  9 passed (9)
  Duration  17.54s
```

## Installed guide version

`0.0.18` (packed tip, installed `--no-save`; `package.json` still declares `^0.0.17`) — per the brief's standing condition, this is the recorded head-start state, not a defect.

## Anomalies

- API Extractor (invoked from `npm run build` and again inside one `test:config` test case) reports that the target project's TypeScript 6.0.3 is newer than its bundled compiler engine (5.9.3). It is a printed notice, not a nonzero exit, and did not affect any command's exit code.

## GATES: GREEN

Lane held: verifier html

# Gate report — `d7n-html-verify` (html)

## Command 1 — `git rev-parse --short HEAD && git status --short`
Exit 0.
```
1121b5c
 M guides/html.md
 M src/core/constants.ts
 M tests/guides.test.ts
```

## Command 2 — installed guide version
Exit 0. `0.0.18` (matches the recorded packed-tip head-start state; `package.json` declares `^0.0.17`).

## Command 3 — `npm run format:check`
Exit 0.
```
All matched files use the correct format.
Finished in 3184ms on 47 files using 4 threads.
```

## Command 4 — `npm run lint:check`
Exit 0. No output beyond the invocation line.

## Command 5 — `npm run check`
Exit 0. Chain: `tsc --noEmit --project tsconfig.json && npm run check:src` → `check:src:core` (`tsc --noEmit -p configs/src/tsconfig.core.json`). No diagnostics.

## Command 6 — `npm run build`
Exit 0. `clean` → `build:src:core` (`vite build` + `.d.cts` copy). Last lines:
```
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```
Anomaly (non-fatal, repeats each build/docs run): "The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine" from API Extractor.

## Command 7 — `npm run docs`
Exit 0. `rows read: 1, disagreements found: 0`.

## Command 8 — `PATH=/opt/npm11/bin:$PATH npm test`
Exit 0. Per-project totals:
- `src:core`: 7 files passed, 312 tests passed.
- `policy`: 1 file passed, 90 passed | 1 skipped (91).
- `config`: 1 file passed, 172 passed | 1 skipped (173).
- `setup`: 1 file passed, 29 tests passed.
- `guides`: 1 file passed, 35 tests passed.

## Command 9 — `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
Script present (`package.json:69`). Exit 0. `distribution`: 1 file passed, 9 tests passed. Duration 13.01s.

## Anomalies
- API Extractor's TypeScript-version warning (6.0.3 vs bundled 5.9.3) recurs in `build` and in `config` project tests; non-fatal, no exit-code impact.
- `policy` and `config` projects each report one skipped test alongside all-passed counts; not a failure.

GATES: GREEN

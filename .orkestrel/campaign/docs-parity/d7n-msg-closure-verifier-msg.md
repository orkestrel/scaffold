Lane held: verifier msg

## Gate report — package `msg`

**Command 1** `git rev-parse --short HEAD && git status --short` — PASS (exit 0)
```
57128e9
```
`git status --short` returned no output: the working tree is clean. This contradicts the brief's standing condition ("the working tree carries the closing unit's uncommitted edits, which is the state under verification"). Recorded as anomaly.

**Command 2** `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — PASS (exit 0)
```
0.0.18
```
Matches the brief's stated packed tip.

**Command 3** `npm run format:check` — PASS (exit 0)
```
All matched files use the correct format.
Finished in 2211ms on 47 files using 4 threads.
```

**Command 4** `npm run lint:check` — PASS (exit 0), no output beyond the command header.

**Command 5** `npm run check` — PASS (exit 0)
```
> tsc --noEmit -p configs/src/tsconfig.core.json
```

**Command 6** `npm run build` — PASS (exit 0)
```
dist/src/core/index.js  92.64 kB │ gzip: 24.55 kB
dist/src/core/index.cjs  95.59 kB │ gzip: 24.96 kB
✓ built in 410ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```
API Extractor warning noted: "target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine" — non-fatal, exit 0.

**Command 7** `npm run docs` — PASS (exit 0)
```
rows read: 1, disagreements found: 0
```
Matches the brief's expected shape.

**Command 8** `PATH=/opt/npm11/bin:$PATH npm test` — PASS (exit 0), per-project totals:
- `src:core`: 6 files passed, 180 tests passed
- `policy`: 1 file passed, 90 passed | 1 skipped (91)
- `config`: 1 file passed, 172 passed | 1 skipped (173)
- `setup`: 2 files passed, 17 passed
- `guides`: 1 file passed, 36 passed

**Command 9** `test:distribution` (present per `grep -n '"test:distribution"' package.json` at line 70) — PASS (exit 0)
```
Test Files  1 passed (1)
Tests  9 passed (9)
```

## Anomalies

- `git status --short` reported a clean working tree, not the uncommitted closing-unit edits the brief's standing condition described; verified twice with identical result.
- `npm run build` emitted a non-fatal API Extractor version-mismatch notice (bundled TypeScript 5.9.3 vs. project TypeScript 6.0.3); did not affect exit code.

GATES: GREEN

Report written below (also captured for `/home/user/scaffold/tmp/units/d7n-router-verify-report.md` retention).

Lane held: verifier router

**Command 1** — `git rev-parse --short HEAD && git status --short` — exit 0
```
2ddcce1
```
`git status --short` produced no output: the tree is clean at this checkout, no uncommitted edits present.

**Command 2** — installed guide version — exit 0
```
0.0.18
```
Matches the brief's recorded head-start state (packed `0.0.18` installed `--no-save`, `package.json` still declares `^0.0.17`).

**Command 3** — `npm run format:check` — exit 0
```
All matched files use the correct format.
Finished in 2985ms on 74 files using 4 threads.
```

**Command 4** — `npm run lint:check` — exit 0 (no output)

**Command 5** — `npm run check` — exit 0 (tsc root + `check:src:core`/`browser`/`server`, each silent success)

**Command 6** — `npm run build` — exit 0
```
dist/src/core/index.js  35.78 kB │ gzip: 10.75 kB
dist/src/browser/index.js  13.27 kB │ gzip: 4.45 kB
dist/src/server/index.js  10.36 kB │ gzip: 3.73 kB
```
Anomaly: API Extractor logs `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine (5.9.3)` on each `core`/`server` sub-build. Non-fatal; build still exited 0.

**Command 7** — `npm run docs` — exit 0
```
rows read: 1, disagreements found: 0
```
Matches the expected shape (non-zero rows, zero disagreements).

**Command 8** — `PATH=/opt/npm11/bin:$PATH npm test` — exit 0, per-project totals:
- `src:core` + `src:browser` + `src:server`: Test Files 13 passed (13); Tests 265 passed (265)
- `policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
- `config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
- `setup`: Test Files 3 passed (3); Tests 9 passed (9)
- `guides`: Test Files 1 passed (1); Tests 48 passed (48)

**Command 9** — `test:distribution` present (`package.json:88`); ran `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0
```
Test Files  1 passed (1)
Tests  11 passed | 4 skipped (15)
```

Anomalies: API Extractor's TypeScript-6.0.3-vs-bundled-5.9.3 warning during `npm run build` (commands 5 and 7 also invoke tsc/API Extractor and it recurs identically); non-fatal, no effect on exit codes. No timing failures on rerun; each command ran once and exited 0.

GATES: GREEN

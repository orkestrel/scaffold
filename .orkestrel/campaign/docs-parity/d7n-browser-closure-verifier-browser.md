Lane held: verifier browser

# Gate report — package browser

**Command 1** `git rev-parse --short HEAD && git status --short` — exit 0
```
547bcef
```
(no untracked/modified files)

**Command 2** `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0
```
0.0.18
```

**Command 3** `npm run format:check` — exit 0
```
Checking formatting...
All matched files use the correct format.
Finished in 2532ms on 136 files using 4 threads.
```

**Command 4** `npm run lint:check` — exit 0 (no output)

**Command 5** `npm run check` — exit 0 (tsc root project, `check:src:core`, `check:src:server` all clean)

**Command 6** `npm run build` — exit 0 (`build:src:core`, `build:src:server` both built; API Extractor emits its standing TypeScript 6.0.3-vs-5.9.3 informational notice, no error)

**Command 7** `npm run docs` — exit 0
```
rows read: 1, disagreements found: 0
```

**Command 8** `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Per-project totals:
- `test:src` (src:core, src:server): 45 test files passed, 610 tests passed
- `test:policy`: 1 test file passed, 90 tests passed, 1 skipped (91 total)
- `test:config`: 1 test file passed, 172 tests passed, 1 skipped (173 total)
- `test:setup`: 3 test files passed, 51 tests passed
- `test:guides`: 1 test file passed, 201 tests passed

**Command 9** `grep -n '"test:distribution"' package.json` — present (line 82). `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0
```
Test Files  1 passed (1)
     Tests  11 passed (11)
```

## Anomalies

- `npm run build` prints the standing API Extractor notice ("target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine") on both the core and server sub-builds. This is informational only; the build exits 0.
- The tree at `git status --short` reports clean (no output) at the start of the run, consistent with the recorded head-start state.

GATES: GREEN

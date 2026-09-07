Lane held: verifier contract

**Command 1** — `git rev-parse --short HEAD && git status --short`
Exit: 0
```
6e9942a
```
(no untracked/modified files; tree matches the recorded tip)

**Command 2** — `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`
Exit: 0
```
0.0.18
```

**Command 3** — `npm run format:check`
Exit: 0
```
All matched files use the correct format.
Finished in 3044ms on 71 files using 4 threads.
```

**Command 4** — `npm run lint:check`
Exit: 0
```
(no output — clean)
```

**Command 5** — `npm run check`
Exit: 0
```
> tsc --noEmit -p configs/src/tsconfig.core.json
```

**Command 6** — `npm run build`
Exit: 0
```
dist/src/core/index.js  397.42 kB │ gzip: 91.09 kB │ map: 761.92 kB
dist/src/core/index.cjs  402.91 kB │ gzip: 91.83 kB │ map: 761.93 kB
✓ built in 1.34s
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```

**Command 7** — `npm run docs`
Exit: 0
```
rows read: 1, disagreements found: 0
```

**Command 8** — `PATH=/opt/npm11/bin:$PATH npm test`
Exit: 1
```
FAIL |src:core| tests/src/core/JSONCloner.test.ts > JSONCloner — bounded produced work (H9) > bounds the snapshot it produces instead of paying alias duplication without limit
AssertionError: expected 2700.8285260000002 to be less than 2000
 ❯ tests/src/core/JSONCloner.test.ts:578:19

FAIL |src:core| tests/src/core/ShapeValidator.test.ts > the cyclic fallback agrees with an unmemoized walk (R6-A-fix) > returns the memo-free verdict on four hundred seeded cyclic declarations
Error: Test timed out in 5000ms.
 ❯ tests/src/core/ShapeValidator.test.ts:1358:2

FAIL |src:core| tests/src/core/compilers.test.ts > compileGuard > compiles a machine-scale literal vocabulary that no spread could carry
Error: Test timed out in 5000ms.
 ❯ tests/src/core/compilers.test.ts:3119:2

Test Files  3 failed | 16 passed (19)
     Tests  3 failed | 1347 passed (1350)
```
All three failures are timing-bound assertions (an elapsed-time budget and two 5000 ms test timeouts). The chained script (`test:src && test:policy && test:config && test:setup && test:guides`) stopped after `test:src` failed, so `test:policy`, `test:config`, `test:setup`, and `test:guides` did not run in this invocation. Per the brief, this timing red is reported with its reading; the Orchestrator re-runs it alone.

**Command 9** — `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
Exit: 0
```
Test Files  1 passed (1)
     Tests  9 passed (9)
```
(the manifest declares `test:distribution`; it is present and ran)

**Totals**
- `src:core` project: 3 failed, 1347 passed, 1350 total (test file totals: 3 failed, 16 passed, 19 total)
- `test:policy`, `test:config`, `test:setup`, `test:guides`: not run (chain stopped at `test:src`)
- `distribution` project: 0 failed, 9 passed, 9 total

GATES: RED 8

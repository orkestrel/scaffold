Lane held: verifier abort

**Command 1** `git rev-parse --short HEAD && git status --short`
Exit: 0
```
41f893b
 M README.md
 M guides/abort.md
 M src/core/Abort.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
```

**Command 2** `npm run format:check`
Exit: 0
```
All matched files use the correct format.
Finished in 2685ms on 40 files using 4 threads.
```

**Command 3** `npm run lint:check`
Exit: 0
(no output lines besides the command echo)

**Command 4** `npm run check`
Exit: 0
```
> @orkestrel/abort@0.0.10 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

**Command 5a** `npm run docs`
Exit: 0
```
rows read: 1, disagreements found: 0
```

**Command 5b** `npm run docs -- --to guide`
Exit: 0
```
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

**Command 5c** `npm run docs -- --to source`
Exit: 0
```
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

**Command 6** `npm run test:guides`
Exit: 0
```
 Test Files  1 passed (1)
      Tests  25 passed (25)
```

**Command 7** `PATH=/opt/npm11/bin:$PATH npm test`
Exit: 0
```
test:src   — Test Files 4 passed (4), Tests 51 passed (51)
test:policy — Test Files 1 passed (1), Tests 90 passed | 1 skipped (91)
test:config — Test Files 1 passed (1), Tests 172 passed | 1 skipped (173)
test:setup  — Test Files 1 passed (1), Tests 1 passed (1)
test:guides — Test Files 1 passed (1), Tests 25 passed (25)
```

**Per-project totals**
- src:core — 4 files passed, 51 tests passed
- policy — 1 file passed, 90 tests passed, 1 skipped (91 total)
- config — 1 file passed, 172 tests passed, 1 skipped (173 total)
- setup — 1 file passed, 1 test passed
- guides — 1 file passed, 25 tests passed

**Anomalies**
- `test:config` prints two API Extractor advisory lines (bundled TypeScript 5.9.3 versus target TypeScript 6.0.3) as stdout from a test case; the test still passed and this reads as expected tool output, not a failure.
- No other anomalies on rerun; each command ran once and completed without retry.

GATES: GREEN
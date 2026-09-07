Lane held: verifier reason

**Command 1** — `git rev-parse --short HEAD && git status --short` — exit 0
```
684fd45
```
Working tree clean (no status lines).

**Command 2** — `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0
```
0.0.18
```

**Command 3** — `npm run format:check` — exit 0
```
All matched files use the correct format.
Finished in 2043ms on 80 files using 4 threads.
```

**Command 4** — `npm run lint:check` — exit 0
```
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no warnings)

**Command 5** — `npm run check` — exit 0
```
> tsc --noEmit -p configs/src/tsconfig.core.json
```

**Command 6** — `npm run build` — exit 0
```
dist/src/core/index.js  240.97 kB │ gzip: 51.52 kB │ map: 384.23 kB
dist/src/core/index.cjs  252.17 kB │ gzip: 52.51 kB │ map: 387.61 kB
✓ built in 484ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```

**Command 7** — `npm run docs` — exit 0
```
rows read: 1, disagreements found: 0
```

**Command 8** — `PATH=/opt/npm11/bin:$PATH npm test` — exit 0

Totals per project:
- `src:core`: 23 test files passed, 1203 tests passed
- `policy`: 1 test file passed, 90 passed | 1 skipped (91)
- `config`: 1 test file passed, 172 passed | 1 skipped (173)
- `setup`: 1 test file passed, 26 tests passed
- `guides`: 1 test file passed, 97 tests passed

No timing red observed on this run.

**Command 9** — `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — present in `package.json`, exit 0
```
Test Files  1 passed (1)
     Tests  9 passed (9)
```

GATES: GREEN

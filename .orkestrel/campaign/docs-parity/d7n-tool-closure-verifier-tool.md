# Gate report — d7n-tool-verify (tool)

Lane held: verifier tool

**Git state (command 1)** — exit 0
```
6273ea7
 M guides/tool.md
 M tests/guides.test.ts
```

**Installed guide version (command 2)** — exit 0: `0.0.18` (packed tip, matches standing condition; `package.json` declares `^0.0.17`)

**`npm run format:check` (command 3)** — PASS (exit 0)
```
Checking formatting...
All matched files use the correct format.
Finished in 1928ms on 42 files using 4 threads.
```

**`npm run lint:check` (command 4)** — PASS (exit 0)
```
> oxlint --config .oxlintrc.json --deny-warnings .
(no output)
```

**`npm run check` (command 5)** — PASS (exit 0)
```
> tsc --noEmit -p configs/src/tsconfig.core.json
(clean, no diagnostics)
```

**`npm run build` (command 6)** — PASS (exit 0)
```
dist/src/core/index.js  7.49 kB │ gzip: 2.47 kB │ map: 12.08 kB
dist/src/core/index.cjs  7.89 kB │ gzip: 2.56 kB │ map: 12.23 kB
✓ built in 86ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```
Anomaly (non-blocking): API Extractor reports the bundled TypeScript version 5.9.3 is older than the project's TypeScript 6.0.3; it proceeds and exits 0.

**`npm run docs` (command 7)** — PASS (exit 0)
```
rows read: 1, disagreements found: 0
```

**`PATH=/opt/npm11/bin:$PATH npm test` (command 8)** — PASS (exit 0), per-project totals:
- `src:core`: Test Files 5 passed (5), Tests 54 passed (54)
- `policy`: Test Files 1 passed (1), Tests 90 passed | 1 skipped (91)
- `config`: Test Files 1 passed (1), Tests 172 passed | 1 skipped (173)
- `setup`: Test Files 1 passed (1), Tests 2 passed (2)
- `guides`: Test Files 1 passed (1), Tests 30 passed (30)

Anomaly (non-blocking): the `config` project logs the same API Extractor version-mismatch notice twice during its run; it does not affect the passing result.

**`PATH=/opt/npm11/bin:$PATH npm run test:distribution` (command 9)** — script present (`package.json:65`) — PASS (exit 0)
```
Test Files  1 passed (1)
Tests  9 passed (9)
Duration  11.00s
```

## Anomalies
- API Extractor's bundled-TypeScript-version notice (5.9.3 vs. project's 6.0.3) surfaces during both `build` and the `config` test project; non-fatal in every occurrence.
- Working tree carries uncommitted edits in `guides/tool.md` and `tests/guides.test.ts` per `git status --short`, matching the brief's stated closing-unit state under verification.

GATES: GREEN

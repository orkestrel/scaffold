# Gate Report — d7n-ndjson-verify (`/home/user/fleet/ndjson`)

Lane held: verifier ndjson

**1. `git rev-parse --short HEAD && git status --short`** — PASS (exit 0)
HEAD `0a5504b`; `git status --short` printed nothing (clean tree).

**2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`** — PASS (exit 0)
Output: `0.0.18`.

**3. `npm run format:check`** — PASS (exit 0)
```
Checking formatting...
All matched files use the correct format.
Finished in 4062ms on 36 files using 4 threads.
```

**4. `npm run lint:check`** — PASS (exit 0)
No output beyond the command echo; no warnings or errors.

**5. `npm run check`** — PASS (exit 0)
`tsc --noEmit --project tsconfig.json` and `check:src:core` both completed with no diagnostics.

**6. `npm run build`** — PASS (exit 0)
```
dist/src/core/index.js  2.52 kB │ gzip: 1.09 kB │ map: 3.52 kB
dist/src/core/index.cjs  2.68 kB │ gzip: 1.17 kB │ map: 3.54 kB
✓ built in 82ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```

**7. `npm run docs`** — PASS (exit 0)
```
rows read: 1, disagreements found: 0
```

**8. `PATH=/opt/npm11/bin:$PATH npm test`** — PASS (exit 0)
Per-project Vitest totals:
- `src:core`: 2 Test Files passed, 70 Tests passed
- `policy`: 1 Test Files passed, 90 passed | 1 skipped (91)
- `config`: 1 Test Files passed, 172 passed | 1 skipped (173)
- `setup`: 1 Test Files passed, 16 Tests passed
- `guides`: 1 Test Files passed, 31 Tests passed

**9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`** — present, PASS (exit 0)
`grep -n '"test:distribution"' package.json` at line 67 confirms the script exists.
```
Test Files  1 passed (1)
Tests  9 passed (9)
Duration  10.71s
```

## Overall verdict

GREEN — every gate (commands 3 through 9) exited 0.

## Anomalies

- API Extractor (invoked inside `build` and `test:config`) warned twice: "The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor." Non-fatal, did not affect exit codes.
- The installed `@orkestrel/guide` is the packed tip `0.0.18` while `package.json` declares `^0.0.17` (registry serves `0.0.17`), matching the brief's recorded standing condition, not a defect.

GATES: GREEN

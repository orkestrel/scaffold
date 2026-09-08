Lane held: verifier websocket

# Gate Report — websocket (`d7n-websocket-verify`)

**Working tree status (as read, expected dirty from closing unit's uncommitted edits):**
`git rev-parse --short HEAD` → `d8ff4ee`
`git status --short`:
```
 M guides/websocket.md
 M tests/guides.test.ts
```

**Installed guide version:** `0.0.18` (packed tip, per standing conditions; registry serves `0.0.17`, `package.json` declares `^0.0.17` — recorded head-start state, not a defect).

## Commands

1. `git rev-parse --short HEAD && git status --short` — PASS (exit 0). See preceding output.
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — PASS (exit 0). Output: `0.0.18`.
3. `npm run format:check` — PASS (exit 0). Last lines: `All matched files use the correct format.` / `Finished in 2523ms on 48 files using 4 threads.`
4. `npm run lint:check` — PASS (exit 0). No warnings or errors reported.
5. `npm run check` — PASS (exit 0). `tsc --noEmit --project tsconfig.json` and `check:src:server` both completed with no diagnostics.
6. `npm run build` — PASS (exit 0). Last lines: `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts`. Vite built `dist/src/server/index.js` and `.cjs` successfully.
7. `npm run docs` — PASS (exit 0). Output line: `rows read: 1, disagreements found: 0` (matches expected shape).
8. `PATH=/opt/npm11/bin:$PATH npm test` — PASS (exit 0). Per-project totals:
   - `src:server`: 4 test files passed, 120 tests passed
   - `policy`: 1 test file passed, 90 passed | 1 skipped (91)
   - `config`: 1 test file passed, 172 passed | 1 skipped (173)
   - `setup`: 3 test files passed, 21 passed
   - `guides`: 1 test file passed, 25 passed
   - `integration`: 1 test file passed, 14 passed
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — script present (`package.json:66`). PASS (exit 0). 1 test file passed, 9 passed. Duration 10.56s.

## Anomalies

- `npm run build` and `npm run docs` each emit an API Extractor notice: "The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor." Non-fatal, exit codes unaffected.
- `test:config` project prints the same API Extractor notice twice mid-run (from a test exercising the same tool); non-fatal, exit code 0.
- Two skipped tests recorded (`policy` project: 1 skipped; `config` project: 1 skipped); not failures, and not investigated per this dispatch's scope (report exit codes and totals only).

**GATES: GREEN**

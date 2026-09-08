All gates ran and exited 0.

## Gate report — pool

Lane held: verifier pool

**1. `git rev-parse --short HEAD && git status --short`** — exit 0
HEAD `3c9e926`; `git status --short` empty (clean tree). Anomaly: the brief's standing condition states the tree carries the closing unit's uncommitted edits; the actual tree is clean at `3c9e926` with no pending changes.

**2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`** — exit 0
`0.0.18` (packed tip, installed `--no-save`; `package.json` declares `^0.0.17` as the recorded head-start state).

**3. `npm run format:check`** — PASS (exit 0)
`All matched files use the correct format. Finished in 2283ms on 39 files using 4 threads.`

**4. `npm run lint:check`** — PASS (exit 0)
No output beyond the command echo (no violations).

**5. `npm run check`** — PASS (exit 0)
`tsc --noEmit` for root, `configs/src/tsconfig.core.json` — clean.

**6. `npm run build`** — PASS (exit 0)
`dist/src/core/index.js` 19.83 kB, `dist/src/core/index.cjs` 20.04 kB, built in 304ms; `.d.cts` copy succeeded. Note: API Extractor warns the target project uses TypeScript 6.0.3, newer than its bundled 5.9.3 — non-fatal.

**7. `npm run docs`** — PASS (exit 0), matches expected shape
`rows read: 1, disagreements found: 0`

**8. `PATH=/opt/npm11/bin:$PATH npm test`** — PASS (exit 0)
Per-project totals:
- `src:core` — 3 files passed, 47 tests passed
- `policy` — 1 file passed, 90 passed | 1 skipped (91)
- `config` — 1 file passed, 172 passed | 1 skipped (173)
- `setup` — 1 file passed, 3 tests passed
- `guides` — 1 file passed, 28 tests passed

**9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`** — present (declared at `package.json:65`); PASS (exit 0)
1 file passed, 9 tests passed, duration 14.88 s.

## Anomalies

- `git status --short` reported a clean tree, contradicting the brief's stated standing condition that the tree carries the closing unit's uncommitted edits — recorded as read, not corrected.
- `npm run build` and `npm run docs`/`npm test` (config project) emit a non-fatal API Extractor warning that the target project's TypeScript (6.0.3) is newer than the bundled compiler engine (5.9.3); build and tests still exit 0.

## Overall verdict

GREEN — every gate (commands 3 through 9) exited 0.

GATES: GREEN

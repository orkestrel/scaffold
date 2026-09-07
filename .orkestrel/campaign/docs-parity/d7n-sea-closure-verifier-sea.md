Lane held: verifier sea

# Gate report — sea (`/home/user/fleet/sea`)

**1.** `git rev-parse --short HEAD && git status --short` — PASS (exit 0). HEAD `76cfbe2`; tree clean (no `--short` output).

**2.** `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — PASS (exit 0). Installed guide version `0.0.18`, matching the recorded head-start state (`package.json` declares `^0.0.17`; registry serves `0.0.17`).

**3.** `npm run format:check` — PASS (exit 0). "All matched files use the correct format." (53 files)

**4.** `npm run lint:check` — PASS (exit 0). No warnings/errors from `oxlint --deny-warnings`.

**5.** `npm run check` — PASS (exit 0). `tsc --noEmit` for root and `configs/src/tsconfig.server.json` both clean.

**6.** `npm run build` — PASS (exit 0). Vite built `dist/src/server/index.{js,cjs}`; `.d.ts`→`.d.cts` copy succeeded. Anomaly: API Extractor warns the project's TypeScript (6.0.3) is newer than its bundled compiler (5.9.3) — non-fatal warning, command still exits 0.

**7.** `npm run docs` — PASS (exit 0). Output: `rows read: 1, disagreements found: 0`, matching the expected shape.

**8.** `PATH=/opt/npm11/bin:$PATH npm test` — PASS (exit 0). Per-project totals:
- `src:server`: 7 files passed, 190 tests passed
- `policy`: 1 file passed, 90 passed | 1 skipped (91)
- `config`: 1 file passed, 172 passed | 1 skipped (173) — same API Extractor version warning as command 6 surfaces in stdout during one test case; non-fatal, all tests passed
- `setup`: 2 files passed, 23 tests passed
- `guides`: 1 file passed, 37 tests passed
- `integration`: 1 file passed, 4 tests passed

**9.** `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — script present (`package.json:68`) — PASS (exit 0). 1 file passed, 9 tests passed.

## Overall verdict

GREEN. Every gate (3–9) exited 0.

## Anomalies

- API Extractor's TypeScript-version-mismatch warning (bundled 5.9.3 vs. project's 6.0.3) appears in both `npm run build` (command 6) and the `config` Vitest project's stdout during `npm test` (command 8). Cosmetic tool notice; no command's exit code is affected.

Report written to `/home/user/scaffold/tmp/units/d7n-sea-verify-report.md`.

GATES: GREEN

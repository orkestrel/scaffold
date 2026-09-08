Lane held: verifier markdown

# Gate Report — `@orkestrel/markdown` (`/home/user/fleet/markdown`)

**1. `git rev-parse --short HEAD && git status --short`** — PASS (exit 0)
HEAD `ac33037`; `git status --short` produced no output (clean working tree).

**2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`** — PASS (exit 0)
`0.0.18` — matches the brief's recorded packed-tip head-start state; `package.json` still declares `^0.0.17`.

**3. `npm run format:check`** — PASS (exit 0)
`All matched files use the correct format. Finished in 3507ms on 48 files using 4 threads.`

**4. `npm run lint:check`** — PASS (exit 0)
No output beyond the command echo; no violations.

**5. `npm run check`** — PASS (exit 0)
`tsc --noEmit --project tsconfig.json && npm run check:src` → `check:src:core` completed with no diagnostics.

**6. `npm run build`** — PASS (exit 0)
`dist/src/core/index.js 135.23 kB`, `dist/src/core/index.cjs 140.83 kB`, `✓ built in 587ms`; `.d.cts` copy step completed.

**7. `npm run docs`** — PASS (exit 0)
`rows read: 1, disagreements found: 0` — matches the brief's expected one-line output exactly.

**8. `PATH=/opt/npm11/bin:$PATH npm test`** — PASS (exit 0)
Per-project totals:
- `src:core` — 7 Test Files passed (7), 604 Tests passed (604)
- `policy` — 1 Test File passed (1), 90 Tests passed | 1 skipped (91)
- `config` — 1 Test File passed (1), 172 Tests passed | 1 skipped (173)
- `setup` — 1 Test File passed (1), 24 Tests passed (24)
- `guides` — 1 Test File passed (1), 63 Tests passed (63)

**9. `grep -n '"test:distribution"' package.json` then `PATH=/opt/npm11/bin:$PATH npm run test:distribution`** — PASS (exit 0)
Script present at `package.json:68`. Run: `distribution` — 1 Test File passed (1), 9 Tests passed (9).

## Overall verdict

GREEN — every gate (3 through 9) exited 0.

## Anomalies

- API Extractor (invoked during `npm run build` at command 6, and again inside `test:config` at command 8) prints a stderr-style advisory each run: "The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor." This does not affect exit codes and repeats deterministically across the build and the `config` test project.

GATES: GREEN

# Report — d7n-workspace-verify

Lane held: verifier workspace

Report written to `/home/user/scaffold/tmp/units/d7n-workspace-verify-report.md`.

Repo: `/home/user/fleet/workspace`

**1.** `git rev-parse --short HEAD && git status --short` — exit 0. HEAD `eb02ec0`, clean tree (empty status output).

**2.** `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0. Returns `0.0.18`, confirming the packed tip installed `--no-save` per the standing condition.

**3.** `npm run format:check` — exit 0. `All matched files use the correct format.` (50 files)

**4.** `npm run lint:check` — exit 0. No warnings.

**5.** `npm run check` — exit 0. `tsc --noEmit` clean for root and `configs/src/tsconfig.core.json`.

**6.** `npm run build` — exit 0. Emitted `dist/src/core/index.js` and `index.cjs`; declaration copy succeeded.

**7.** `npm run docs` — exit 0. Output: `rows read: 1, disagreements found: 0`, matching the expected shape.

**8.** `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Per-project totals: `src:core` 141 passed (141), `policy` 90 passed | 1 skipped (91), `config` 172 passed | 1 skipped (173), `setup` 10 passed (10), `guides` 40 passed (40).

**9.** `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — present in `package.json:65`; exit 0. 9 passed (9).

Anomalies: `npm run build` and the `config` Vitest project each print an API Extractor notice (`bundled TypeScript 5.9.3` vs. project `TypeScript 6.0.3`); both are informational, exit 0, and pass. No other anomalies.

GATES: GREEN

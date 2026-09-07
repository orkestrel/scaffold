Lane held: verifier template

1. `git rev-parse --short HEAD && git status --short` — exit 0. HEAD `e65daa8`; `git status --short` output empty (clean tree).
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0. Output `0.0.18` (head start; `package.json` declares `^0.0.17`, recorded state, not a defect).
3. `npm run format:check` — exit 0. Last lines: `All matched files use the correct format.` / `Finished in 2187ms on 45 files using 4 threads.`
4. `npm run lint:check` — exit 0. No output beyond the command echo.
5. `npm run check` — exit 0. Last line: `> tsc --noEmit -p configs/src/tsconfig.core.json`.
6. `npm run build` — exit 0. Last line: `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`.
7. `npm run docs` — exit 0. Output: `rows read: 1, disagreements found: 0`.
8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Per-project totals: `test:src` — Test Files 5 passed (5), Tests 128 passed (128); `test:policy` — Test Files 1 passed (1), Tests 90 passed | 1 skipped (91); `test:config` — Test Files 1 passed (1), Tests 172 passed | 1 skipped (173); `test:setup` — Test Files 1 passed (1), Tests 1 passed (1); `test:guides` — Test Files 1 passed (1), Tests 34 passed (34). No timing red observed.
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — present in the manifest, exit 0. Test Files 1 passed (1), Tests 9 passed (9).

Anomalies: none observed; no rerun needed.

GATES: GREEN

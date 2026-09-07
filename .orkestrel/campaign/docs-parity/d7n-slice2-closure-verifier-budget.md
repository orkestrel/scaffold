Lane held: verifier budget

**Command 1** — `git rev-parse --short HEAD && git status --short`
Exit 0. Last lines: `d3147bb` (clean tree, no status output).

**Command 2** — `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`
Exit 0. Last line: `0.0.18`.

**Command 3** — `npm run format:check`
Exit 0. Last lines: `All matched files use the correct format.` / `Finished in 2856ms on 40 files using 4 threads.`

**Command 4** — `npm run lint:check`
Exit 0. No warnings or errors output.

**Command 5** — `npm run check`
Exit 0. Last line: `> tsc --noEmit -p configs/src/tsconfig.core.json` (no diagnostics).

**Command 6** — `npm run build`
Exit 0. Last lines: `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`.

**Command 7** — `npm run docs`
Exit 0. Last line: `rows read: 1, disagreements found: 0`.

**Command 8** — `PATH=/opt/npm11/bin:$PATH npm test`
Exit 0. Totals per project:
- `test:src` — Test Files 4 passed (4); Tests 132 passed (132)
- `test:policy` — Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
- `test:config` — Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
- `test:setup` — Test Files 1 passed (1); Tests 7 passed (7)
- `test:guides` — Test Files 1 passed (1); Tests 29 passed (29)

**Command 9** — `test:distribution` script present in `package.json`. Ran `PATH=/opt/npm11/bin:$PATH npm run test:distribution`.
Exit 0. Last lines: Test Files 1 passed (1); Tests 9 passed (9).

Anomalies: none observed.

GATES: GREEN

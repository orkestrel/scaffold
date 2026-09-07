Lane held: verifier emitter

1. `git rev-parse --short HEAD && git status --short` — exit 0. Last lines: `286586f` (HEAD), status output empty (clean tree).
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0. Output: `0.0.18` (`package.json` declares `^0.0.17`, matching the recorded state).
3. `npm run format:check` — exit 0. Last lines: `All matched files use the correct format.` / `Finished in 6447ms on 38 files using 4 threads.`
4. `npm run lint:check` — exit 0. No output beyond the command echo.
5. `npm run check` — exit 0. Last line: `tsc --noEmit -p configs/src/tsconfig.core.json` completed with no diagnostics.
6. `npm run build` — exit 0. Last lines: `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`.
7. `npm run docs` — exit 0. Last line: `rows read: 1, disagreements found: 0`.
8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Totals per project: `src:core` 43 passed (43); `policy` 90 passed | 1 skipped (91); `config` 172 passed | 1 skipped (173); `setup` 1 passed (1); `guides` 23 passed (23).
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — declared in the manifest; exit 0. Last lines: `Test Files 1 passed (1)` / `Tests 9 passed (9)`.

Anomalies: none observed; no reruns needed.

GATES: GREEN

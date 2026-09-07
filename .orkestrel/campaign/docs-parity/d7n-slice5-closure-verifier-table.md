Lane held: verifier table

1. `git rev-parse --short HEAD && git status --short` — exit 0. Last lines: `a7612eb` (git status output empty, tree clean).
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0. Last line: `0.0.18`.
3. `npm run format:check` — exit 0. Last lines: `All matched files use the correct format.` / `Finished in 3145ms on 63 files using 4 threads.`
4. `npm run lint:check` — exit 0. No output beyond the command echo.
5. `npm run check` — exit 0. Last line: `> tsc --noEmit -p configs/src/tsconfig.core.json` (silent success).
6. `npm run build` — exit 0. Last lines: `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`.
7. `npm run docs` — exit 0. Last line: `rows read: 1, disagreements found: 0`.
8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Per-project totals: `test:src` 16 files / 104 tests passed; `test:policy` 1 file passed, 90 passed | 1 skipped (91); `test:config` 1 file passed, 172 passed | 1 skipped (173); `test:setup` 1 file / 12 tests passed; `test:guides` 1 file / 85 tests passed. No browser/Chromium suite ran under `table`'s manifest (that note applies to router).
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — present in manifest; exit 0. Last lines: `Test Files 1 passed (1)` / `Tests 9 passed (9)`.

GATES: GREEN

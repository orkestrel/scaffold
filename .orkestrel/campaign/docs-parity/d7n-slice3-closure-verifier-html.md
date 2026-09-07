Lane held: verifier html

1. `git rev-parse --short HEAD && git status --short` — exit 0. Last lines: `1121b5c` (clean, no status output)
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0. Last line: `0.0.18`
3. `npm run format:check` — exit 0. Last line: `Finished in 6709ms on 47 files using 4 threads.`
4. `npm run lint:check` — exit 0. No output beyond the command line.
5. `npm run check` — exit 0. Last lines: `> tsc --noEmit -p configs/src/tsconfig.core.json`
6. `npm run build` — exit 0. Last line: `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`
7. `npm run docs` — exit 0. Last line: `rows read: 1, disagreements found: 0`
8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Totals per project:
   - `test:src`: Test Files 7 passed (7); Tests 312 passed (312)
   - `test:policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
   - `test:config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
   - `test:setup`: Test Files 1 passed (1); Tests 29 passed (29)
   - `test:guides`: Test Files 1 passed (1); Tests 35 passed (35)
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — present in manifest, run — exit 0. Last lines: Test Files 1 passed (1); Tests 9 passed (9)

GATES: GREEN

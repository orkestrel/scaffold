# Report — `d7n-html-verify`

Lane held: verifier html

## Repository state

- `git rev-parse --short HEAD`: `0b95316`
- `git status --short`: no output (clean tree)

## Installed guide version

- `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` → `0.0.18` (exit 0), matching the recorded packed-tip head-start state.

## Commands and exit codes

1. `git rev-parse --short HEAD && git status --short` — exit 0. Output: `0b95316`, clean tree.
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0. Output: `0.0.18`.
3. `npm run format:check` — exit 0. Last lines: `All matched files use the correct format.` / `Finished in 2228ms on 47 files using 4 threads.`
4. `npm run lint:check` — exit 0. No warnings or errors reported.
5. `npm run check` — exit 0. `tsc --noEmit` for the root project and `configs/src/tsconfig.core.json` both completed with no output.
6. `npm run build` — exit 0. Last lines: `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts` (API Extractor emitted its standard TypeScript-version-mismatch notice: `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine`).
7. `npm run docs` — exit 0. Output: `rows read: 1, disagreements found: 0`.
8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Per-project totals:
   - `test:src` (project `src:core`): Test Files 7 passed (7), Tests 312 passed (312).
   - `test:policy` (project `policy`): Test Files 1 passed (1), Tests 90 passed | 1 skipped (91).
   - `test:config` (project `config`): Test Files 1 passed (1), Tests 172 passed | 1 skipped (173).
   - `test:setup` (project `setup`): Test Files 1 passed (1), Tests 29 passed (29).
   - `test:guides` (project `guides`): Test Files 1 passed (1), Tests 35 passed (35).
9. `grep -n '"test:distribution"' package.json` — script present at line 69. Ran `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0. Output (project `distribution`): Test Files 1 passed (1), Tests 9 passed (9).

## Anomalies

- API Extractor's TypeScript-version-mismatch notice (`TypeScript 6.0.3 which is newer than the bundled compiler engine`) appears in the `build` step and repeats twice during `test:config` (which drives Extractor internally). Non-fatal; both runs exited 0.
- `test:policy` and `test:config` each report one skipped test alongside all-passing counts; neither run failed.

GATES: GREEN

Lane held: verifier form

# Report — d7n-form-verify (verifier lane, package form)

## Working tree state (read as expected)

- `git rev-parse --short HEAD`: `6483f42`
- `git status --short`:
  ```
   M guides/form.md
   M tests/guides.test.ts
  ```
  This is the closing unit's uncommitted state under verification; unchanged after `npm run docs` ran.

## Installed guide version

- `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` → `0.0.18` (packed tip installed `--no-save`; `package.json` declares `^0.0.17`, matching the recorded head-start state).

## Per-command results

1. `git rev-parse --short HEAD && git status --short` — exit `0`.
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit `0`, output `0.0.18`.
3. `npm run format:check` — exit `0`. `All matched files use the correct format. Finished in 4987ms on 49 files using 4 threads.`
4. `npm run lint:check` — exit `0`, no warnings reported.
5. `npm run check` — exit `0` (`tsc --noEmit --project tsconfig.json` then `tsc --noEmit -p configs/src/tsconfig.core.json`, no diagnostics).
6. `npm run build` — exit `0`. `dist/src/core/index.js 65.38 kB`, `dist/src/core/index.cjs 70.87 kB`, `✓ built in 325ms`, `.d.cts` copy completed. API Extractor's TypeScript-version advisory printed but did not affect the exit code.
7. `npm run docs` — exit `0`, output `rows read: 1, disagreements found: 0`.
8. `PATH=/opt/npm11/bin:$PATH npm test` — exit `0`. Per-project totals:
   - `test:src` (`src:core`): Test Files 9 passed (9); Tests 183 passed (183).
   - `test:policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91).
   - `test:config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173).
   - `test:setup`: Test Files 1 passed (1); Tests 14 passed (14).
   - `test:guides`: Test Files 1 passed (1); Tests 51 passed (51).
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — script present (`package.json:59`). Exit `0`. `distribution` project: Test Files 1 passed (1); Tests 9 passed (9).

## Anomalies

- API Extractor's TypeScript-version advisory during `npm run build` and inside `test:config` (`configuration helpers > rolls one face into a single declaration and rewrites its core specifier`) is informational stdout; both commands exited `0`.
- `tests/policy.test.ts` and `tests/config.test.ts` each skipped one test; both runs exited `0` with no failures reported.
- No other anomalies; the working tree's two modified files (`guides/form.md`, `tests/guides.test.ts`) stayed unchanged across the whole run.

Report file: `/home/user/scaffold/tmp/units/d7n-form-verify-report.md`

GATES: GREEN

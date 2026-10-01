Implemented the Chromium integration project and cross-face composition proof. All required gates pass.

Files changed by this unit (`<owned files>` in the commands below expands to this list):

- `vite.config.ts`
- `package.json`
- `tests/config.test.ts`
- `tests/integration.test.ts`
- `tests/fixtures/integration/bootstrap.scss`
- `tests/fixtures/integration/tailwindcss.scss`
- `tests/fixtures/integration/styles.scss`
- `tests/fixtures/integration/themes.scss`
- `tests/fixtures/integration/tailwind-first.scss`
- `tests/fixtures/integration/consumer.scss`

The report is saved at `tmp/units/foundation-fix-8-report.md`. The project reuses `sheetProject`, and `test` invokes `test:integration` immediately after `test:conformance`. No `setupGlobal.ts` exists, so the project declares no global setup.

Chromium measured the following outcomes:

- All 24 permutations resolve `margin-top: 4px` and `padding-top: 5px`, with the full layer order read from the first adopted sheet.
- The Tailwind-first control resolves `margin-top: 3px`. Its initial statement places utilities before the subsequently introduced layers; surfaces supplies the winning declaration.
- With Bootstrap before the consumer, the display, radius, and layered-important cases resolve `block`, `19px`, and `grid`.
- With the consumer before Bootstrap, those cases resolve `flex`, `19px`, and `grid`.
- Both theme orders resolve `--vn-probe: light` on the pack root and `dark` on its island.
- The permutation case took **8 ms** in the verbose Chromium run at 17:27:39 America/New_York on 2026-09-30. No timeout adjustment was needed.

Validation commands and results follow. A test count of `none` means the command did not execute tests.

| Command | Exit code | Test count |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --write <owned files>` (initial run) | 0 | none |
| `npx tsc --noEmit --project tsconfig.json` (initial run) | 0 | none |
| `npx oxlint --config .oxlintrc.json vite.config.ts tests/integration.test.ts tests/config.test.ts` (initial run) | 1 | none; conditional assertion rejected |
| `npx oxfmt --config .oxfmtrc.json --write <owned files>` (after correction) | 0 | none |
| `npx tsc --noEmit --project tsconfig.json` (after correction) | 0 | none |
| `npx oxlint --config .oxlintrc.json vite.config.ts tests/integration.test.ts tests/config.test.ts` (after correction) | 0 | none |
| `npm run test:integration -- --reporter=verbose` | 1 | none; npm rejected the reporter flag |
| `npm run test:integration` | 0 | 6 passed |
| `npm run test:config` | 0 | 184 passed, 1 skipped |
| `npm run test:policy` | 0 | 112 passed, 1 skipped |
| `node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=verbose --project integration` | 0 | 6 passed |
| `npx oxfmt --config .oxfmtrc.json --check <owned files>` | 0 | none |
| `git status --porcelain` (before and after) | 0 | none |
| `git diff -- vite.config.ts package.json tests/config.test.ts` | 0 | none |
| `rg --files tests/fixtures/integration tmp/probes` | 0 | none |

Probes written: none. Probe deletions: none. `tmp/probes/` contains no files from this unit. Adopted sheets and mounted nodes are released after every case, including between permutations and after assertion failure.

Deviations: the initial lint run rejected a conditional assertion; the assertion was moved outside the adoption loop and the gates were repeated. npm rejected the requested verbose reporter argument, so the prescribed integration command ran unchanged and a direct Node invocation supplied the individual case duration. No scope deviation or stop condition occurred. Existing working-tree changes predate this unit; this unit edited only the owned paths and its report. No commit or install was performed.

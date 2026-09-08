Lane held: verifier contract

# Gate Report — `/home/user/fleet/contract`

1. `git rev-parse --short HEAD && git status --short` — exit 0. HEAD `2320ccd`; `git status --short` empty (clean tree).
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0. Installed `@orkestrel/guide` version: `0.0.18` (packed tip, per standing condition; `package.json` declares `^0.0.17`).
3. `npm run format:check` — PASS (exit 0). `All matched files use the correct format. Finished in 3608ms on 71 files using 4 threads.`
4. `npm run lint:check` — PASS (exit 0). No output beyond the command echo (no warnings/errors).
5. `npm run check` — PASS (exit 0). `tsc --noEmit --project tsconfig.json` and `check:src:core` both completed with no diagnostics printed.
6. `npm run build` — PASS (exit 0). `dist/src/core/index.js 397.42 kB`, `dist/src/core/index.cjs 402.91 kB`, "built in 606ms"; API Extractor emitted the informational notice `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.`
7. `npm run docs` — PASS (exit 0). `rows read: 1, disagreements found: 0`.
8. `PATH=/opt/npm11/bin:$PATH npm test` — PASS (exit 0). Per-Vitest-project totals:
   - `src:core`: 19 Test Files passed (19), 1350 Tests passed (1350)
   - `policy`: 1 Test Files passed (1), 90 passed | 1 skipped (91)
   - `config`: 1 Test Files passed (1), 172 passed | 1 skipped (173)
   - `setup`: 2 Test Files passed (2), 61 Tests passed (61)
   - `guides`: 1 Test Files passed (1), 70 Tests passed (70)
9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — script present (`grep -n '"test:distribution"' package.json` → line 68). PASS (exit 0). `distribution`: 1 Test Files passed (1), 9 Tests passed (9).

## Overall verdict

GREEN. Every gate from `format:check` through `test:distribution` exited 0.

## Anomalies

- `npm run build` and the `config` Vitest project both print an API Extractor notice about running against TypeScript 6.0.3 vs. its bundled 5.9.3 engine; this did not affect exit codes and repeats identically on both runs.
- The `policy` and `config` Vitest projects each report one skipped test alongside all-passing totals (`90 passed | 1 skipped`, `172 passed | 1 skipped`); no failures.

GATES: GREEN

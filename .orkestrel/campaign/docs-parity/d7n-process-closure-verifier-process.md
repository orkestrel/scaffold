# Gate Report — verifier lane, `process`

Lane held: verifier process

1. `git rev-parse --short HEAD && git status --short` — exit 0. HEAD `6a7f96f`; `git status --short` output empty (clean tree).
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0. Output `0.0.18`.
3. `npm run format:check` — exit 0. Last lines: `All matched files use the correct format.` / `Finished in 2232ms on 57 files using 4 threads.`
4. `npm run lint:check` — exit 0. Output: `oxlint --config .oxlintrc.json --deny-warnings .` with no further lines (no violations).
5. `npm run check` — exit 0. Ran `tsc --noEmit --project tsconfig.json`, `check:src:core`, `check:src:server` with no diagnostics printed.
6. `npm run build` — exit 0. `dist/src/core` and `dist/src/server` built (`.js`/`.cjs`/`.d.ts`/`.d.cts`); API Extractor printed its standing `bundled TypeScript version 5.9.3` vs `6.0.3` notice (informational, non-failing).
7. `npm run docs` — exit 0. Last line: `rows read: 1, disagreements found: 0`.
8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Per-project totals:
   - `src:core`/`src:server`: Test Files 8 passed (8); Tests 196 passed | 8 skipped (204)
   - `policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
   - `config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
   - `setup`: Test Files 2 passed (2); Tests 10 passed (10)
   - `guides`: Test Files 1 passed (1); Tests 119 passed | 1 skipped (120)
9. `grep -n '"test:distribution"' package.json` — present at line 74, so ran `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0. Test Files 1 passed (1); Tests 11 passed (11).

## Anomalies

- API Extractor (invoked from `npm run build`) prints `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` on both `build:src:core` and `build:src:server`, and again twice during `test:config` (`tests/config.test.ts` exercising the same Extractor path). Informational only; exit codes stayed 0 throughout.
- Installed `@orkestrel/guide` is the packed tip `0.0.18`, while `package.json` declares `^0.0.17` and the registry serves `0.0.17` — this is the brief's recorded head-start state, not a defect.

## Overall verdict

GATES: GREEN

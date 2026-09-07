Lane held: verifier markdown

Per command, exit code and last lines:

1. `git rev-parse --short HEAD && git status --short` — exit 0
   `2f16fdd`
   (status: no output, clean tree)

2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0
   `0.0.18`

3. `npm run format:check` — exit 0
   `All matched files use the correct format.`
   `Finished in 3585ms on 48 files using 4 threads.`

4. `npm run lint:check` — exit 0
   (no warnings; `oxlint --config .oxlintrc.json --deny-warnings .` produced no output)

5. `npm run check` — exit 0
   `tsc --noEmit -p configs/src/tsconfig.core.json` (no diagnostics)

6. `npm run build` — exit 0
   `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`

7. `npm run docs` — exit 0
   `rows read: 1, disagreements found: 0`

8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0
   Totals per project:
   - `src:core` — Test Files 7 passed (7); Tests 604 passed (604)
   - `policy` — Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
   - `config` — Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
   - `setup` — Test Files 1 passed (1); Tests 24 passed (24)
   - `guides` — Test Files 1 passed (1); Tests 63 passed (63)
   No timing red observed in `tests/parsers.test.ts` on this run.

9. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — present, exit 0
   `distribution` — Test Files 1 passed (1); Tests 9 passed (9)

GATES: GREEN

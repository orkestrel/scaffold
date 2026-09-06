# Gate report — U12 fleet-visit-interpret (phase A)

1. `git log --oneline -1` / `git status --short` — exit 0
   - `d0ceb12 Align the lint script with the host's shape`
   - Working tree dirty (expected state): modified `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `configs/src/vite.core.config.ts`, `package.json`, `tests/config.test.ts`, `vite.config.ts`; staged deletion `tests/distribution.test.ts`; untracked `tests/distribution.test.ts`.

2. `grep -rn "vite-plugin-dts" package.json configs/src` — exit 1, no line (expected).
   `grep -c "declarationRollup(" configs/src/vite.*.config.ts` — exit 0, output: `1`.

3. `head -20 tests/distribution.test.ts | grep -n "typescript"` — exit 1, no line (expected).

4. `npx scaffold audit --offline` — exit 0
   - `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`

5. `npm run format:check` — exit 0
   - `All matched files use the correct format.`
   - `Finished in 3244ms on 69 files using 4 threads.`

6. `npm run lint:check` — exit 0, no output beyond the command header (no lint findings).

7. `npm run check` — exit 0
   - `tsc --noEmit --project tsconfig.json` then `check:src` → `check:src:core` → `tsc --noEmit -p configs/src/tsconfig.core.json`, all completed with no diagnostics.

8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts` — exit 0
   - `dist/src/core/index.d.cts`
   - `dist/src/core/index.d.ts`

GATES: GREEN

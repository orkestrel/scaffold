All commands executed and passed. Now compiling the final report.

Lane held: verifier console

# Gate Report — `d7n-console-verify` (console, `/home/user/fleet/console`)

**Standing state**
- `git rev-parse --short HEAD`: `4687fe7`, exit 0
- `git status --short`: no output (clean tree), exit 0
- Installed `@orkestrel/guide` version: `0.0.18` (packed tip, per brief's recorded head-start; `package.json` declares `^0.0.17`)

**Per gate**

1. `git rev-parse --short HEAD && git status --short` — PASS (exit 0). HEAD `4687fe7`, no working-tree changes.
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — PASS (exit 0). Output: `0.0.18`.
3. `npm run format:check` — PASS (exit 0). Last lines: `All matched files use the correct format.` / `Finished in 3787ms on 84 files using 4 threads.`
4. `npm run lint:check` — PASS (exit 0). No lint findings reported.
5. `npm run check` — PASS (exit 0). `tsc --noEmit` for root, `core`, `browser`, `server` all completed with no diagnostics printed.
6. `npm run build` — PASS (exit 0). Built `dist/src/core`, `dist/src/browser`, `dist/src/server` (`.js`/`.cjs` plus `.d.ts`/`.d.cts`). API Extractor prints an advisory (`bundled TypeScript version 5.9.3` vs. project `6.0.3`); non-fatal.
7. `npm run docs` — PASS (exit 0). Output: `rows read: 1, disagreements found: 0`.
8. `PATH=/opt/npm11/bin:$PATH npm test` — PASS (exit 0). Per-project totals:
   - `test:src` (`src:core`, `src:browser`, `src:server`): 17 files passed, 638 tests passed
   - `test:policy`: 1 file passed, 90 passed | 1 skipped (91)
   - `test:config`: 1 file passed, 172 passed | 1 skipped (173)
   - `test:setup`: 3 files passed, 29 passed
   - `test:guides`: 1 file passed, 94 passed
9. `test:distribution` — present (`package.json:88`). `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — PASS (exit 0). 1 file passed, 11 passed | 4 skipped (15).

**Overall verdict**: GREEN — every gate exited 0.

**Anomalies**
- `npm run build` prints a non-fatal API Extractor advisory about a TypeScript version mismatch (bundled `5.9.3` vs. project `6.0.3`) on all three build targets; build still exits 0.
- `test:policy`, `test:config`, and `test:distribution` each report skipped tests (1, 1, and 4 respectively) alongside passing totals; no failures.

GATES: GREEN

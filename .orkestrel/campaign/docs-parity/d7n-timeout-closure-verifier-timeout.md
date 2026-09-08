Lane held: verifier timeout

## Gate report — `/home/user/fleet/timeout`

**Standing state**
- `git rev-parse --short HEAD`: `d221dba`
- `git status --short`:
```
 M guides/timeout.md
 M tests/guides.test.ts
```
- Installed `@orkestrel/guide` version: `0.0.18` (packed tip, per the brief's recorded head-start state; `package.json` declares `^0.0.17`)

**Per gate**

1. `git rev-parse --short HEAD && git status --short` — exit 0. Recorded above.
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0. Output `0.0.18`.
3. `npm run format:check` — PASS (exit 0). Last lines: `All matched files use the correct format.` / `Finished in 3019ms on 41 files using 4 threads.`
4. `npm run lint:check` — PASS (exit 0). No output beyond the command header.
5. `npm run check` — PASS (exit 0). `tsc --noEmit` for root and `configs/src/tsconfig.core.json` both completed with no diagnostics.
6. `npm run build` — PASS (exit 0). Last lines: `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`. Note: API Extractor logged `*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.` — non-fatal, exit 0.
7. `npm run docs` — PASS (exit 0). Output: `rows read: 1, disagreements found: 0`.
8. `PATH=/opt/npm11/bin:$PATH npm test` — PASS (exit 0). Per-project totals:
   - `src:core` — Test Files 4 passed (4); Tests 62 passed (62)
   - `policy` — Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
   - `config` — Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
   - `setup` — Test Files 1 passed (1); Tests 2 passed (2)
   - `guides` — Test Files 1 passed (1); Tests 29 passed (29)
9. `grep -n '"test:distribution"' package.json` — script present (line 66). `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — PASS (exit 0). Test Files 1 passed (1); Tests 9 passed (9).

**Overall verdict**: GREEN. Every gate exited 0.

**Anomalies**
- API Extractor logged a non-fatal notice about a bundled TypeScript version mismatch (5.9.3 bundled vs. project's 6.0.3) during `npm run build` and again inside `npm run test:config`; both runs still exited 0.
- The working tree carries uncommitted edits in `guides/timeout.md` and `tests/guides.test.ts` (the closing unit's edits under verification), consistent with the brief's recorded standing condition.

GATES: GREEN

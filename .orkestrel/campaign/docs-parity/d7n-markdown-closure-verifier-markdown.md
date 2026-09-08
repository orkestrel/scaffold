Lane held: verifier markdown

Per-command results in `/home/user/fleet/markdown`:

1. `git rev-parse --short HEAD && git status --short` — exit 0. HEAD `40f63bb`; `git status --short` empty (clean working tree).
2. `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0. `0.0.18`.
3. `npm run format:check` — exit 0. `All matched files use the correct format.` (48 files).
4. `npm run lint:check` — exit 0. No findings.
5. `npm run check` — exit 0. `tsc --noEmit` (root + `check:src:core`), no diagnostics.
6. `npm run build` — exit 0. `dist/src/core/index.js` 135.23 kB, `dist/src/core/index.cjs` 140.83 kB, built in 483ms; d.cts copy succeeded.
7. `npm run docs` — exit 0. `rows read: 1, disagreements found: 0`.
8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Totals: `src:core` 7 files / 604 passed; `policy` 1 file / 90 passed, 1 skipped (91); `config` 1 file / 172 passed, 1 skipped (173); `setup` 1 file / 24 passed; `guides` 1 file / 63 passed.
9. `grep -n '"test:distribution"' package.json` — present at line 68. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0. `distribution` project: 1 file / 9 passed.

Anomalies: API Extractor's bundled-compiler notice ("TypeScript 6.0.3 ... newer than the bundled compiler engine 5.9.3") printed during `npm run build` and during test runs that invoke API Extractor; non-fatal, every affected command exited 0.

Full report written to `/home/user/scaffold/tmp/units/d7n-markdown-verify-report.md`.

GATES: GREEN

Lane held: verifier tool

Report written to `/home/user/scaffold/tmp/units/d7n-tool-verify-report.md`. Summary:

- Installed guide version: `0.0.18` (registry `0.0.17`, `package.json` declares `^0.0.17` — matches the recorded head-start state).
- `git rev-parse --short HEAD && git status --short` — exit 0, HEAD `c9755ef`, clean tree.
- `npm run format:check` — exit 0.
- `npm run lint:check` — exit 0.
- `npm run check` — exit 0.
- `npm run build` — exit 0 (API Extractor emitted a non-fatal TypeScript 6.0.3-vs-bundled-5.9.3 warning).
- `npm run docs` — exit 0, `rows read: 1, disagreements found: 0`.
- `PATH=/opt/npm11/bin:$PATH npm test` — exit 0 overall: `test:src` 5 files/54 tests passed; `test:policy` 1 file/90 passed+1 skipped; `test:config` 1 file/172 passed+1 skipped (same API Extractor warning repeated, non-fatal); `test:setup` 1 file/2 passed; `test:guides` 1 file/30 passed.
- `test:distribution` script present (`package.json:65`); `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0, 1 file/9 tests passed.

Anomalies: API Extractor's TypeScript-version compatibility warning appeared during `build` and `test:config` runs; exit codes unaffected.

GATES: GREEN

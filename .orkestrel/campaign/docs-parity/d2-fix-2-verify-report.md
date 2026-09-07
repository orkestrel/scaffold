# Verify report — D2 guide-render after D2-fix (guide)

Written to `/home/user/fleet/guide/tmp/units/docs-d2-verify-3-report.md` (round three's evidence; the brief names `docs-d2-verify-2-report.md`, but this run is the third round's).

All commands run from `/home/user/fleet/guide`.

**1.** `grep -n "export function render\|export function replace\|export function locateComment" src/core/helpers.ts` — exit 0. Three renderers (`renderSurface`, `renderMethods`, `renderExample`), four replacers (`replaceCell`, `replaceFence`, `replaceSummary`, `replaceExample`), one locator (`locateComment`). Matches expected — GREEN.

**2.** `grep -rn "\bWIDTH\b" src guides/guide.md` — exit 1, no output. Every site reads `WRAP_WIDTH`; exit 1 with no matches is GREEN per the brief.

**3.** `grep -rn "node:fs\|writeFile\|readFile\|from 'typescript'\|from 'vite'\|from \"vite\"" src` — exit 0. Only `src/core/sources/Source.ts:32` and `src/core/types.ts:402`, both the pre-existing TSDoc mentions, no `import` line — GREEN.

**4.** `npm run format:check` — exit 0. "All matched files use the correct format." (80 files)

**5.** `npm run lint:check` — exit 0. No diagnostics.

**6.** `npm run check` — exit 0. `tsc --noEmit --project tsconfig.json` and `check:src:core` both clean.

**7.** `npm run build` — exit 0. `dist/src/core/index.js` and `.cjs` built; `.d.cts` copied. API Extractor's standing bundled-compiler-version notice appears (not an error).

**8.** `npm test` — exit 0. `test:src` 587 passed (8 files), `test:policy` 77 passed, `test:config` 111 passed | 1 skipped, `test:setup` 7 passed, `test:guides` 51 passed. No timeout or red row; no re-run needed.

**9.** `git status --short` — exit 0.
```
 M guides/guide.md
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M tests/guides.test.ts
 M tests/src/core/helpers.test.ts
```

Anomalies: none.

GATES: GREEN

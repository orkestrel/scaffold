# Gate report — D2 guide-render after D2-fix (guide)

Fourth verification round for `docs-d2-verify-2-brief.md`; written to `/home/user/fleet/guide/tmp/units/docs-d2-verify-4-report.md` (not `-2-report.md`, since prior rounds used earlier slots).

**Command 1** `grep -n "export function render\|export function replace\|export function locateComment" src/core/helpers.ts` — exit 0. Matches: three renderers (`renderSurface`, `renderMethods`, `renderExample`), four replacers (`replaceCell`, `replaceFence`, `replaceSummary`, `replaceExample`), one locator (`locateComment`) — as expected.

**Command 2** `grep -rn "\bWIDTH\b" src guides/guide.md` — exit 1, no output. GREEN per brief (all sites use `WRAP_WIDTH`).

**Command 3** `grep -rn "node:fs\|writeFile\|readFile\|from 'typescript'\|from 'vite'\|from \"vite\"" src` — exit 0. Only the two pre-existing TSDoc mentions at `src/core/sources/Source.ts:32` and `src/core/types.ts:402`; no `import` line.

**Command 4** `npm run format:check` — exit 0. "All matched files use the correct format." (80 files)

**Command 5** `npm run lint:check` — exit 0, no findings.

**Command 6** `npm run check` — exit 0 (`tsc --noEmit --project tsconfig.json` and `configs/src/tsconfig.core.json` both clean).

**Command 7** `npm run build` — exit 0. `dist/src/core/index.js` and `index.cjs` built; `.d.cts` copied.

**Command 8** `npm test` — exit 0. `test:src` 588 passed (588), `test:policy` 77 passed (77), `test:config` 111 passed | 1 skipped (112), `test:setup` 7 passed (7), `test:guides` 51 passed (51). No timeout-classed red row; no re-run needed.

**Command 9** `git status --short` — exit 0:
```
 M guides/guide.md
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M tests/guides.test.ts
 M tests/src/core/helpers.test.ts
```

**Anomalies**: none observed.

**Overall verdict**: GREEN — every gate passed.

GATES: GREEN

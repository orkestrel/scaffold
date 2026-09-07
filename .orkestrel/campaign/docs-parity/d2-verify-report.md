# Verify report — D2 guide-render (guide)

Commands run from `/home/user/fleet/guide`, in order. Report written to `/home/user/fleet/guide/tmp/units/docs-d2-verify-report.md`.

## 1. `grep -n "export function render\|export function replace" src/core/helpers.ts`

Exit code: 0

```
2347:export function renderSurface(symbols: readonly SurfaceSymbol[]): string {
2382:export function renderMethods(group: MethodGroup): string {
2422:export function renderExample(example: SourceExample): string {
2466:export function replaceCell(guide: string, key: string, summary: string): string | undefined {
2525:export function replaceFence(
2574:export function replaceSummary(comment: string, summary: string): string {
2625:export function replaceExample(comment: string, example: SourceExample): string {
```

## 2. `grep -rn "node:fs\|writeFile\|readFile\|from 'typescript'\|from 'vite'\|from \"vite\"" src`

Exit code: 0 (grep found matches; expectation was no line)

```
src/core/sources/Source.ts:32: * (`node:fs` in a Node script, `import.meta.glob` in a browser/vitest run) and
src/core/types.ts:402: * (`node:fs` in a Node script, `import.meta.glob` in a browser/vitest run) —
```

Both hits sit in TSDoc comments naming `node:fs` as illustrative prose, not an import or filesystem call.

## 3. `npm run format:check`

Exit code: 0 — `All matched files use the correct format. Finished in 3000ms on 80 files using 4 threads.`

## 4. `npm run lint:check`

Exit code: 0 — no output beyond the command echo.

## 5. `npm run check`

Exit code: 0 — `tsc --noEmit --project tsconfig.json` and `tsc --noEmit -p configs/src/tsconfig.core.json` both completed with no diagnostics.

## 6. `npm run build`

Exit code: 0 — `✓ built in 654ms`, `dist/src/core/index.d.ts` copied to `dist/src/core/index.d.cts`. An unrelated API Extractor notice about the bundled TypeScript version (5.9.3) versus the project's TypeScript version (6.0.3) prints but does not affect the exit code.

## 7. `npm test`

Exit code: 0

```
test:src      — Test Files  8 passed (8);   Tests  548 passed (548)
test:policy   — Test Files  1 passed (1);   Tests  77 passed (77)
test:config   — Test Files  1 passed (1);   Tests  111 passed | 1 skipped (112)
test:setup    — Test Files  1 passed (1);   Tests  7 passed (7)
test:guides   — Test Files  1 passed (1);   Tests  49 passed (49)
```

No Vitest row named a timeout; no re-run performed.

## 8. `git status --short`

Exit code: 0

```
 M guides/guide.md
 M src/core/constants.ts
 M src/core/helpers.ts
 M tests/guides.test.ts
 M tests/src/core/helpers.test.ts
```

Anomalies: none observed.

GATES: GREEN

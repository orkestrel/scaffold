# Gate report — D2 guide-render after D2-fix (guide)

All commands run from `/home/user/fleet/guide`.

1. `grep -n "export function render\|export function replace\|export function locateComment" src/core/helpers.ts`
   Exit: 0
   ```
   2386:export function renderSurface(symbols: readonly SurfaceSymbol[]): string {
   2421:export function renderMethods(group: MethodGroup): string {
   2461:export function renderExample(example: SourceExample): string {
   2507:export function replaceCell(guide: string, key: string, summary: string): string | undefined {
   2567:export function replaceFence(
   2627:export function replaceSummary(
   2692:export function replaceExample(comment: string, example: SourceExample): string | undefined {
   2769:export function locateComment(text: string, key: string): MarkdownSpan | undefined {
   ```
   Matches expected: three renderers, four replacers, one locator.

2. `grep -rn "\bWIDTH\b" src guides/guide.md`
   Exit: 1
   No output. GREEN per brief (every site reads `WRAP_WIDTH`).

3. `grep -rn "node:fs\|writeFile\|readFile\|from 'typescript'\|from 'vite'\|from \"vite\"" src`
   Exit: 0
   ```
   src/core/sources/Source.ts:32: * (`node:fs` in a Node script, `import.meta.glob` in a browser/vitest run) and
   src/core/types.ts:402: * (`node:fs` in a Node script, `import.meta.glob` in a browser/vitest run) —
   ```
   Only the two pre-existing TSDoc mentions. No import line beyond that. GREEN.

4. `npm run format:check`
   Exit: 0
   ```
   Checking formatting...
   All matched files use the correct format.
   Finished in 2876ms on 80 files using 4 threads.
   ```

5. `npm run lint:check`
   Exit: 0 (no violations reported)

6. `npm run check`
   Exit: 0 (`tsc --noEmit --project tsconfig.json && ... tsc --noEmit -p configs/src/tsconfig.core.json`, no diagnostics)

7. `npm run build`
   Exit: 0
   ```
   dist/src/core/index.js  127.03 kB │ gzip: 32.36 kB │ map: 190.63 kB
   dist/src/core/index.cjs  132.26 kB │ gzip: 32.81 kB │ map: 192.42 kB
   ✓ built in 702ms
   Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
   ```

8. `npm test`
   Exit: 0
   ```
   Test Files  1 passed (1)   Tests  77 passed (77)              [default project]
   Test Files  1 passed (1)   Tests  111 passed | 1 skipped (112) [config project]
   Test Files  1 passed (1)   Tests  7 passed (7)                [setup project]
   Test Files  1 passed (1)   Tests  51 passed (51)               [guides project]
   ```
   No Vitest row named a plain test timeout; no re-run performed.

9. `git status --short`
   Exit: 0
   ```
    M guides/guide.md
    M src/core/constants.ts
    M src/core/helpers.ts
    M src/core/types.ts
    M tests/guides.test.ts
    M tests/src/core/helpers.test.ts
   ```

Report written to `/home/user/fleet/guide/tmp/units/docs-d2-verify-2-report.md`.

Anomalies: none.

GATES: GREEN

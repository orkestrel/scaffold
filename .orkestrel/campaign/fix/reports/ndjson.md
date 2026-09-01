# Fix report: ndjson

## Dispositions

- **s18-03** deferred_breaking: Re-verified: `reset()` still stands at src/core/types.ts:21 and src/core/NDJSONParser.ts:68. Renaming it to `clear()` renames a published interface member and a public class method, which the breaking test defers whole. Nothing applied — the guide rows and tests that call `reset()` stay consistent with the shipped surface. Carry to the work order together with the guide lines (guides/ndjson.md quote block, Surface fence, Types row, Methods row, Methods fence) and the tests that call it.
- **s18-22** applied (src/core/NDJSONParser.ts): Re-verified: `#line` was a one-line delegate returning `parseJSONAs(line, isRecord)`, called once. Deleted the `#` private and inlined the call at the loop body. `#` private removal is non-breaking; `isRecord` and `parseJSONAs` were already imported, so no import changed.
- **s18-38** applied (src/core/types.ts): Re-verified: the `parse` block carried a description only and `reset` carried a single-line doc. Added `@param chunk - Stream text appended to the internal buffer before splitting` and `@returns Every complete line parsed to a record, in arrival order` to `parse`, and expanded the `reset` doc to carry `@returns Nothing`, matching the fleet form in budget/src/core/types.ts:51-69. Applied the interface half only: both lanes ruled the third claim (method TSDoc on `NDJSONParser.parse`) out of scope, so `NDJSONParser.ts` method docs are untouched. The lane note sequencing this after s18-03 could not be honored because s18-03 defers, so the expanded block documents `reset` under its shipped name. Existing description sentences were left verbatim — first-sentence voice belongs to the deferred TSDoc wave.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2496ms on 35 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . (no diagnostics, exit 0)
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json (no diagnostics)
- npm run build: pass — ✓ 5 modules transformed. dist/src/core/index.js 2.34 kB │ gzip: 1.03 kB — ✓ built in 2.52s; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — Test Files 2 passed (2) / Tests 70 passed (70); 111 passed; 46 passed; 18 passed; 18 passed. npm test exit: 0

## Diffstat

```text
 src/core/NDJSONParser.ts | 6 +-----
 src/core/types.ts        | 9 ++++++++-
 2 files changed, 9 insertions(+), 6 deletions(-)
```

- dist moves: true

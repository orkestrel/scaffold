# Fix report: sse

## Dispositions

- **s18-04** deferred_breaking: Re-verified present: `reset()` is declared on the exported `SSEParserInterface` at src/core/types.ts:89 and implemented at src/core/SSEParser.ts:147. The repair renames a published interface member and the class method implementing it, which the breaking test defers whole. Neither lane correction avoids that: the DRIFT lane adds guide line 42 and the DRIFT-RESHAPE lane drops the `#clear()` -> `#drop()` private rename and adds TSDoc/test call sites, but every part of both corrections exists only to follow the public rename, so no non-breaking part stands on its own. Applied nothing.
- **s18-05** applied (src/core/types.ts, src/core/SSEParser.ts, guides/sse.md): Re-verified: `flush(): SSEEvent[]` at types.ts:79 and SSEParser.ts:135, while the sibling `parse` already returned `readonly SSEEvent[]`. Tightened both to `readonly SSEEvent[]`; the local `events` accumulator in `flush` stays `SSEEvent[]` and widens on return. Updated the `flush` row's Returns cell in guides/sse.md to `readonly SSEEvent[]`. Readonly tightening on a public return collection is an explicit apply case. No test asserted on array mutability, so no test changed.
- **s18-35** applied (src/core/errors.ts): Re-verified: the `SSEError` class TSDoc carried no `@example` and the constructor carried no `@param` tags, while the barrelled `isSSEError` beside it carries both. Added an `@example` on the class showing a `catch` narrowed with `isSSEError` on `error.code === 'OVERFLOW'`, and added `@param` tags for `code`, `message`, and `context` with a third-person first sentence (`Creates an SSE error carrying a machine-readable code.`). Ancillary choices mine: the example uses the `@src/core` specifier matching the existing `isSSEError` example in the same file, and its `{ limit: 10, size: 20 }` comment is the value `#size()` produces for a 20-character chunk against `limit: 10`. TSDoc-only, so no published surface moved.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 1883ms on 37 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . (no diagnostics, exit 0)
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json (no diagnostics)
- npm run build: pass — dist/src/core/index.js 12.01 kB | gzip: 4.26 kB; dist/src/core/index.cjs 12.19 kB; built in 2.25s; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — test:src 2 files / 120 tests passed; test:policy 1 / 111 passed; test:config 1 / 46 passed; test:setup 1 / 16 passed; test:guides 1 / 18 passed

## Diffstat

```text
 guides/sse.md         |  2 +-
 src/core/SSEParser.ts |  2 +-
 src/core/errors.ts    | 22 ++++++++++++++++++++++
 src/core/types.ts     |  2 +-
 4 files changed, 25 insertions(+), 3 deletions(-)
```

- dist moves: true

## Deviations

None. `git status --short` lists only guides/sse.md, src/core/SSEParser.ts, src/core/errors.ts, and src/core/types.ts; no off-limits file is touched and the tree is uncommitted. Two notes for the work order rather than deviations: (a) s18-04's rename of `reset()` to `clear()` needs the breaking work order, and its full carrier set is the union of the two lane corrections — types.ts:89, SSEParser.ts:147, the prose at factories.ts:17,36; errors.ts:17,46 (now shifted by the s18-35 insertion); SSEParser.ts:29,84; types.ts:82,85,88, the guide lines including 42, and the tests at tests/src/core/factories.test.ts and tests/src/core/SSEParser.test.ts; the lanes genuinely disagree on whether the private `#clear()` must become `#drop()`, and the DRIFT-RESHAPE lane's tsc proof that a public `clear` and a private `#clear` do not collide settles it against the rename, so the private member can stay. (b) `dist/` was rebuilt by the build gate and is gitignored, but the applied `flush` return type reaches the published `dist/src/core/index.d.ts`, so this package's declaration surface moved.

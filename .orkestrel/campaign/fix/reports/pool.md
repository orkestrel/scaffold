# Fix report: pool

## Dispositions

- **s18-17** applied (src/core/Pool.ts, src/core/types.ts, src/core/errors.ts, src/core/factories.ts, guides/pool.md): Re-verified against the current tree: every cited site still present. Applied the non-breaking half only, split on a fixed boundary — text naming the teardown *hook* (publicly the `destroy` option and the `destroy` event) moves to `destroy`; text naming the failure *category* (publicly the `cleanup` code) stays. Applied: `#cleanup` -> `#destroy` (Pool.ts:29, :70, :491), which aligns the private field with the option key it stores and is invisible to consumers; TSDoc at types.ts:10 ("Distinct destroy-hook failures"), types.ts:32 ("A resource destroy hook"), errors.ts:20 ("aggregate destroy-hook failure details"), factories.ts:10 ("every in-flight create, validation, and destroy attempt"); guide rows guides/pool.md:58 (`PoolContext`) and :62 (`PoolOptions`, which named the `destroy` option "cleanup"). DEFERRED BREAKING to the work order: renaming the exported `PoolCode` union member `'cleanup'` to `'destroy'` (a published union member), the `PoolError` message literal 'pool cleanup failed' at errors.ts:32 (observable, pinned by no document as changeable), the code literals at Pool.ts:381 and :551, the `#destroyError`/`#cleanupError` helper rename (it writes `code: 'cleanup'`, so renaming it away from the literal it produces does not stand on its own), guides/pool.md rows 57, 106-107, 135, 163 and the blockquote, and the ~12 `code: 'cleanup'` assertions in tests/src/core/Pool.test.ts. Both lanes agreed on `'destroy'` over the finding's `'teardown'`; that ruling carries to the work order. Lane enumerations differed only in breadth (lane 1 named errors.ts:20 and factories.ts:10 prose, lane 2 did not) — no conflicting detail, so the union of the non-breaking prose sites was applied.
- **s18-18** applied (src/core/types.ts, src/core/Pool.ts): Re-verified: `acquire` still throws `PoolError` synchronously at Pool.ts:108 for a non-native signal (and `#state` can throw the same code from the pre-queue check at Pool.ts:113), and the constructor still throws for a bad `max` at Pool.ts:67, with no `@throws` on either doc. Added `@throws {@link PoolError}` to `PoolInterface.acquire` (types.ts) naming `code: 'invalid'` and stating the throw is synchronous rather than a rejected promise, and to the `Pool` constructor (Pool.ts) naming `code: 'invalid'` for a non-positive-safe-integer `max`. Ancillary choice recorded: the same `@throws` block was added to the `Pool.acquire` class TSDoc, because that is the doc a consumer reads on the implementation and leaving it bare recreates the exact defect. Wording follows `.claude/rules/typescript.md` § Comments and API documentation ("Thrown when …"). The guide already documents both behaviors (guides/pool.md:94-96 and :114-115), so no guide change was needed. First sentences left in their existing imperative voice — rewriting them belongs to the TSDoc voice wave.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2054ms on 37 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . (no diagnostics, exit 0)
- npm run check: pass — tsc --noEmit --project tsconfig.json and tsc --noEmit -p configs/src/tsconfig.core.json both exit 0
- npm run build: pass — 7 modules transformed; dist/src/core/index.cjs 18.58 kB; built in 2.81s; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — src 41 passed (41); policy 111 passed (111); config 46 passed (46); setup 3 passed (3); guides 13 passed (13)

## Diffstat

```text
 guides/pool.md        |  4 ++--
 src/core/Pool.ts      | 11 ++++++++---
 src/core/errors.ts    |  2 +-
 src/core/factories.ts |  3 ++-
 src/core/types.ts     |  7 +++++--
 5 files changed, 18 insertions(+), 9 deletions(-)
```

- dist moves: true

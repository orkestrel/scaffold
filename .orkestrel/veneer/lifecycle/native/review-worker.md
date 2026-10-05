# Review of the worker pool 0.0.16 preparation (worker `main` at `a055007`, uncommitted, unit `pool16b`), Opus 5.5 reviewer, 2026-10-05

Lanes: contract, test sufficiency, and guide voice. Terminal: **FAIL**.

1. **The narrowing refuses `capacity`:** REFUTED.
   - `Omit<PoolOptions<TResource>, 'capacity'>` refuses `capacity` only through the excess-property check on a fresh literal. A widened value, such as `const shared: PoolOptions<Db> = { create, capacity: 4 }`, compiles, and `Worker` drops `capacity` silently.
   - Every other field still reaches the pool (`src/core/Worker.ts:85-106`).
2. **The type assertion:** CONFIRMED in placement, because `npm run check` type-checks the tests through the root `tsconfig.json`. A `keyof` check cannot tell the bare `Omit` from a contract that truly refuses `capacity`.
3. **The fixture:** CONFIRMED. `PoolOptionsProbe` keeps its nine keys and its pinned claims.
4. **The idle-loss case:** CONFIRMED in mechanism. Its red run is reported, not re-run. Its `jobs` counter cannot fail on its own.
5. **The guide:** REFUTED in part. Line 392 is false for the reason in claim 1. Lines 411 to 413 and the test list are true.

Required changes, carried by unit `pool16c` (worker `tmp/codex/pool16c-brief.md`):
- `readonly pool: Omit<PoolOptions<TResource>, 'capacity'> & { readonly capacity?: never }`;
- the fixture alias `Omit<WorkerOptions<unknown, T, unknown>['pool'], 'capacity'>`;
- `expectTypeOf<PoolOptions<number>>().not.toExtend<WorkerOptions<number, number, number>['pool']>()`;
- the `jobs` counter deleted;
- the guide sentence: "refuses the `capacity` option, so each resource serves one job at a time".

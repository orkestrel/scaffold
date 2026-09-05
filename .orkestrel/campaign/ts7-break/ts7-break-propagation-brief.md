# Unit ts7-break-propagation — the publish order and blast radius of a fleet-wide TypeScript 7 break

`orkestrel` on Sonnet, the read-only ecosystem reconciler. Perform the assignment directly and spawn nothing. Rule only from the evidence below and the catalog your role file carries (regenerated 2026-09-05); collect no live state.

## Question

If every `@orkestrel/*` package moves `typescript` to `^7.0.2`, drops `@typescript/typescript6`, replaces its in-process 6.x API sites, and bumps, in what order does the fleet publish, which packages need a source change beyond the vendored pair, and what does each layer's consumers re-pin?

## Evidence

- The catalog's `Layer` column is the publish round, derived from runtime `dependencies` and `peerDependencies` edges; `scaffold` publishes outside the order as a development dependency of every package; `probe` is a development dependency of its consumers and holds an optional peer on `typescript`.
- Every package carries the vendored `tests/setupPolicy.ts` (scaffold's `repair` restores it) and a generated `tests/distribution.test.ts` (scaffold's template), both loading the 6.x API in process; `database/tests/setupServer.ts`, `lsp/tests/setupConformance.ts`, and `probe/src/server/stages/TypeStage.ts` load it beyond the pair; `guide` is a runtime dependency of `scaffold` and of no test suite.
- A development-dependency change obliges no bump unless the built `dist/` moves; `probe`'s change is a source change (a bump); `scaffold`'s vendored bytes move (a bump); `guide`'s `Source` is text-only.
- The declaration rollup (`vite-plugin-dts` + `@microsoft/api-extractor`) runs in every package that publishes `src`.

## Rows

1. The publish rounds, from the catalog layers, with each package's current version and the packages that re-pin it in the next round.
2. The packages whose change is source-level (a bump on their own account) versus vendored-and-generated only (re-pin, `repair`, regenerate, prove, commit to `main`, no bump unless `dist/` moves).
3. `scaffold`'s and `probe`'s positions: what must publish before any target's fleet visit can start, and why.
4. Risks: a package whose `dist/` moves because its build toolchain changed (the declaration path), and packages whose published declarations `import type` from `typescript`.

## Output

Tables for rows 1 and 2, prose for rows 3 and 4, then `## Unknowns`. No process diary.

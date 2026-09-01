# Unit devadopt — adopt the renamed `@orkestrel/guide` helpers in every checkout's parity test

## Role and engine

Orchestrator-owned scripted unit (a fully specified mechanical rewrite run from a script file
while no writer is live in any fleet checkout, per `.agents/orchestration.md` § Writing
concurrency rule 7). Verdict by the re-run dev sweep (typecheck and `test:guides` per checkout).

## Objective

Every fleet checkout's `tests/guides.test.ts` imports and calls the renamed helpers
(`extractFenceImports`, `findMissingSymbols`, `computeSymbolKey`) and none of the retired names;
the one checkout that called `declarationBody` (`brief`) calls `extractDeclaration(...)?.body`.

## Measurements

The dev sweep's first row (`abort check=2 guides=1`: `TS2724 '@orkestrel/guide' has no exported
member named 'fenceImports'`) and a word-boundary search over `tests/**/*.ts` in every checkout:
`missingSymbols`, `symbolKey`, and `fenceImports` in `tests/guides.test.ts` of every checkout
except `guide` and `probe`; `declarationBody` only in `brief/tests/guides.test.ts:12,207,257`. No
consumer `src/` or own guide names a retired helper (the hits under `guides/guide.md` are the
vendored mirror of the guide package's guide, refreshed at the next scaffold release).

## Scope

Owned: `tests/guides.test.ts` in every fleet checkout and in scaffold. Off-limits: every other
file. Instrument: `/home/user/work/adoptguide.mjs` (retained in
`.orkestrel/campaign/instruments/`), run once per checkout; `brief`'s two `declarationBody`
calls edited by the Orchestrator to `extractDeclaration(types, 'interface', name)?.body ?? []`.

## Acceptance criteria

1. `rg -w 'fenceImports|missingSymbols|symbolKey|declarationBody' --type ts <checkout>/tests`
   returns no hit in any checkout.
2. The `@orkestrel/guide` import block of each rewritten file lists its specifiers in
   case-insensitive order.
3. The re-run dev sweep reports `check=0 guides=0` for every checkout, or names the checkout and
   the first diagnostic as a row for a successor brief.
4. Each rewritten checkout is committed ("Adopt the renamed guide helpers in the parity test") and
   pushed.

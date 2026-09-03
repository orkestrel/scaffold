# Addendum to the conform-mcp brief — incoming consumer edits, taken first

The closure staged for this unit carries the landed tips of router, websocket, guide, contract, and emitter. Apply the following edit first, exactly as given, and record it under a `## Consumer edits taken` section of the report with the line now. A vendored `guides/<dep>.md` mirror is never edited by hand: it refreshes at the wave.

1. **guide's `symbol.kind` → `symbol.keyword`** (`reports/conform-guide-report.md:154-163`): `tests/guides.test.ts:641` reads `.filter((symbol) => symbol.keyword === 'function')`.

Router's landed renames (`route` → `defineRoute`, `TypeError` → `ContractError` at the public boundary, the typed navigator router) oblige no mcp source edit (`reports/conform-router-report.md:176-178`); confirm with a whole-word sweep for `route(` imports from `@orkestrel/router` and record `noop` where none exists. Mirrors refreshed at the wave, not here: `guides/guide.md`, `guides/contract.md`, `guides/emitter.md`, `guides/websocket.md`.

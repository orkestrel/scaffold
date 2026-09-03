# Addendum to the conform-server brief — incoming consumer edits, taken first

The closure staged for this unit carries the landed tips of router, codec, guide, contract, and emitter. Apply the following edit first, exactly as given, and record it under a `## Consumer edits taken` section of the report with the line now. A vendored `guides/<dep>.md` mirror is never edited by hand: it refreshes at the wave.

1. **guide's `symbol.kind` → `symbol.keyword`** (`reports/conform-guide-report.md:154-163`): `tests/guides.test.ts:120` reads `.filter((symbol) => symbol.keyword === 'function')`.

Router's landed renames oblige no server source edit (`reports/conform-router-report.md:176-178`); confirm with a whole-word sweep for `route(` imports from `@orkestrel/router` and record `noop` where none exists. Codec's `encodeHex` note (the marks file `briefs/marks-server.json`, server-obj-3): the staged codec exports `encodeHex`; where server-obj-3's repair names it, adopt it as the row says. Mirrors refreshed at the wave, not here: `guides/guide.md`, `guides/emitter.md`, `guides/contract.md`.

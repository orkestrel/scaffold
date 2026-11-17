# Fleet campaign: the contract 0.0.26 and scaffold 0.0.139 wave

## Goal

Move every package in the catalog onto `@orkestrel/contract` 0.0.26 and `@orkestrel/scaffold` 0.0.139, then the scaffold release this wave closes with, per scaffold `ROADMAP.md` item 187, with contract 0.0.25's helper adoptions made at each visit that item names.

## Exit criterion

A registry sweep after the last window lists no `@orkestrel` range, in any catalog package, that trails the version the registry serves, and scaffold `ROADMAP.md` item 187 is closed.

## Repositories

- Every package in the catalog table of `.claude/agents/orkestrel.md`, at `https://github.com/orkestrel/<package>`. `node .agents/skills/orkestrel-publish/scripts/wave.ts --plan` prints the layer order.
- `@orkestrel/scaffold`, this repository, for the catalog refresh, its own adoption, and `ROADMAP.md` items 185, 186, and 187; item 182 rides item 187 per its last bullet.

## Governing skills

- `orkestrel-publish` for each visit, bump ruling, release window, and the close of the wave.
- `orkestrel-harden` for each adoption unit.
- `orkestrel-align` for the router, server, and middleware moves that cross into browser, toolbox, and mcp.
- `orkestrel-falsify` for each review the size gate in `.agents/orchestration.md` names.

## Standing rulings

- 2026-11-17, the user ruled that this wave makes contract 0.0.25's helper adoptions at each visit, not only the re-pin.
- 2026-11-17, reviews ruled two adoption bounds: adopt `settle` only where a `catch` turns the failure into a value or a branch and no effect the old `catch` ran before the caller's next statement moves past a microtask, and adopt `isCodedError` only where the old check already required `isError`, because `isCodedError` reads `instanceof Error`.
- Publish only with a one-time code the user gives in the session, one `window.ts --publish` call per layer, in layer order.
- Push a release commit only after the registry serves its version.
- Run every process-running command through `.agents/skills/orkestrel-parallel/scripts/lane.ts`, on Node 22.
- Fetch and merge each repository's `origin/main` before its visit.

## Units each package owes

Every package re-pins contract `^0.0.26` and scaffold `^0.0.139` and owes a release, because its runtime contract range moves. The adoption units follow contract 0.0.25's `Release 0.0.25` commit (contract `d2fc632`) and scaffold `ROADMAP.md` item 187.

| Package | Adoption unit |
| --- | --- |
| `@orkestrel/abort` | `validateAbortOptions` and `linkSignal` refuse through `refuseValue` and `readValue`; `guides/abort.md` states the Node 22 `AbortSignal.any` retention and router 0.0.23's remedy |
| `@orkestrel/budget`, `@orkestrel/timeout` | Inline `ContractError` assembly through `refuseValue`, `readValue`, or `refusalToError` where the semantics match |
| `@orkestrel/indexeddb`, `@orkestrel/test`, `@orkestrel/database`, `@orkestrel/process`, `@orkestrel/relation`, `@orkestrel/capture`, `@orkestrel/browser`, `@orkestrel/scaffold` | A `try`/`catch` around an `await` through `settle`, a `'code' in` pairing through `isCodedError`, and a `Number.isSafeInteger` pairing through `isSafeInteger`, where the semantics match |
| `@orkestrel/router` | Inline `ContractError` assembly through `refusalToError` |
| `@orkestrel/server` | The `Server` constructor's `TypeError` checks refuse as `ContractError` |
| `@orkestrel/middleware` | Foreign option contracts through `interfaceShape` and `own` |
| `@orkestrel/guide` | The signature-cell rewrite (`tests/guides.test.ts --to guide`) writes Markdown table cells padded as `oxfmt` pads them, so `format:check` passes after a rewrite (reported by veneer, 2026-11-17) |
| `@orkestrel/mcp`, `@orkestrel/browser`, `@orkestrel/toolbox` | Router 0.0.23, server 0.0.29, and middleware 0.0.35 surface moves; mcp's `next(forwarded)` call in `src/server/middlewares.ts` |

An adoption that moves a refusal's class, code, message, or path lists each move in the package's release notes.

## Release bar

- Each adoption unit: scoped gates green, one review pass by `reviewer` on numbered claims about each moved refusal, and the package's release chain green on the candidate commit.
- Each release: the bump ruled from `compare.ts` and the final runtime range set, per the publish skill's wave reference.

## Deferrals

- Taverna and veneer adopt in their own sessions after this wave closes, by the user's ruling of 2026-11-17; veneer holds contract `^0.0.24` until then (veneer `08a688a`) and yields the host lane to the wave.

## State

- 2026-11-17, contract 0.0.26, router 0.0.23, server 0.0.29, middleware 0.0.35, test 0.0.43, and scaffold 0.0.139 serve; every other catalog package declares contract `^0.0.24`.
- 2026-11-17, layer 1 holds release commits for every package: abort 0.0.19, budget 0.0.20, codec 0.0.12, emitter 0.0.18, html 0.0.18, indexeddb 0.0.20, jsonrpc 0.0.5, ndjson 0.0.19, sqlite 0.0.20, test 0.0.44, and timeout 0.0.19, each chain green.
- 2026-11-17, browser waits on mcp's release for its router and server re-pin, because mcp 0.0.44 peers router `^0.0.22`; browser carries contract `^0.0.26` alone (browser `9571066`).
- Next: publish layer 1 with the user's one-time code, then re-pin and release layer 2.

## Sequence

1. Layer 1: visit every package, land the adoption units for abort, budget, timeout, indexeddb, and test, run each release chain, and publish the layer in one window.
2. Layers 2 to 7 in order, each with its adoption units, release chains, and one window.
3. Scaffold: its adoption unit, `ROADMAP.md` items 185 and 186, `scaffold catalog --all`, and its release.
4. Close the wave per the publish skill's wave reference § Close the wave, then tell veneer's session the wave is closed.

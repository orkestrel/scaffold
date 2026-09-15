<!-- A3-S — reviewer (Opus 5, native), subjective and cross-engine lane on the U3 → U3c chain, blind. Retained from the completion notification, 2026-09-15 (606 s, 44 tool uses). Abridged to verdict lines, findings, and attacked-and-held. -->

Subjective lane plus cross-engine objective lane (chain written on GPT-6 Astra).

1. Default execution forwards the request signal — CONFIRMED (`MCPServer.ts:949-954`; controller registered synchronously at `helpers.ts:1880-1882` before any `await`; fixture delivery synchronous; connection usable after; a cancelled request writes no response per `helpers.ts:1889` and the package's stated reading at `:1833-1835`).
2. `caller` travels only in the context — CONFIRMED (`helpers.ts:651-663` builds `{ id, name, arguments }`; readers at `MCPServer.ts:813`, `:921`; `handlers.ts:196-199` places it on dispatch options; the Tasks path keeps it through `MCPMethodOptions`).
3. The wrapped tool forwards the agent-side signal — CONFIRMED (`MCPClient.ts:786-793`, `:802-809`; arity cannot strip it; a dropped signal produces a timeout the `/aborted/` matcher refuses).
4. `title` and `annotations` cross the wire both ways — CONFIRMED (`helpers.ts:769-777`, `:791-798`, `:811-818`; `summary` loss stated at `guides/mcp.md:3554-3556`; wire type `types.ts:873-879` with the revision at `:867`). See F2, F3.
5. The refresh example is executed — CONFIRMED (all four outcomes driven against a real duplex pair; `for await` over `listen`; no new source class). See F5.
6. The guide is true — BROKEN: the declared gap "Not every guide fence is executed" (`guides/mcp.md:4834-4838`) enumerates the transcribed fences and omits the new refresh fence (`:3904`); the `guides.test.ts` Tests bullet (`:4415`) omits the refresh transcription.
7. Nothing else moved — BROKEN on the mirror half: `guides/tool.md` in mcp differs from tool's tip (Validators intro and `isToolError` placement; `errors.test.ts` bullet; the "For versions from 0.0.15" sentence; a re-wrap). Referral: settle whether tool moved after U3c's hash (it did — U1d) and re-copy.
8. Rules and tests — CONFIRMED. Weakest tests and surviving mutations: `builds call envelopes without caller identity…` (restoring a third `caller` parameter stays green); `adds remote tools beside the local tool…` (deleting the collision branch stays green); `advertises titles and mapped annotation hints…` (emitting `annotations` only when non-empty stays green — F2).
9. Ship as 0.0.31 for U4 — BROKEN until 6 and 7 close; F1 and F3 worth taking before U4.

Findings outside the claims:
- F1 — `#execute(request, call, signal, caller?: unknown, progress?)` grew positional parameters with an `unknown` slot; both callers hold `options`; `MCPExecutionContext` carries `signal` and `caller` as loose members and the guide (`:1150-1152`) tells a delegating handler to forward both, which reassembles a present-but-`undefined` `caller` key. Fix: pass `options` into `#execute`; state the omitting spread in the guide sentence (or give `MCPExecutionContext` one member holding the `ToolContext`).
- F2 — a tool with only unmapped hints advertises `annotations: {}` (`helpers.ts:774-776`); the client accepts it and the wrapped tool gains an empty member; undocumented third state. Fix: emit `annotations` only when the projection produced a member; same on the client.
- F3 — `MCPToolAnnotations` declares `title`, `idempotentHint`, `openWorldHint` that nothing produces or reads, and `isMCPToolAnnotations` (`validators.ts:696-707`) refuses the whole object when one is malformed while ignoring unknown fields. Fix: keep the wire type complete and have the guard check only what the projection consumes (or narrow the type).
- F4 — `createAbortTools` and `createToolRefresh` in `tests/setup.ts` carry no return type and no named interface, unlike every sibling factory.
- F5 — the published refresh fence takes out-parameter arrays and an untyped `let snapshot`; return `{ installed, collisions, failures }` and annotate.
- F6 — the round-trip paragraph omits the `inputSchema: { type: 'object' }` default the wire adds for a schema-less tool (`helpers.ts:771`); `types.ts:1182`'s `MCPTaskHandler` remark should read `options.caller`.
- F7 — `MCPClient.test.ts` suite label carries the refresh test that belongs to the guide proof (duplicated suite); the projections sit under `describe('buildToolDescriptors')`.
- F8 — new Surface rows and imports out of their files' existing order (`guides/mcp.md:2260`, `:2333-2334`; `validators.test.ts` import list; `PUBLISHED_GUARDS`).

Attacked and held: cancellation frame ordering; the Tasks caller path; the arity attack; annotation inversion under mixed values; the undriven-outcome attack; suppression sweep.

VERDICT: FAIL 6, 7, 9; outside the claims: F1, F2, F3, F4, F5, F6, F7, F8

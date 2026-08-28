# Fix report: mcp

## Dispositions

- **s01-01** deferred_breaking: Re-verified: both HTTPClientTransport copies stand and server/#deliver still throws buildResponseError where browser swallows. The repair moves the class to core and leaves each face with a factory, but neither face barrel re-exports core, so `HTTPClientTransport` would disappear from both `@orkestrel/mcp/browser` and `@orkestrel/mcp/server`; unifying the non-ok fork also changes observable send behaviour on one face. No half stands alone.
- **s01-02** deferred_breaking: Re-verified: `decodeEvent` and `readEventStream` are still byte-identical in both faces. Both are published from the browser and server barrels and documented in each face's Helpers table, so moving them to core removes exported names from two published entry points. `architecture.md` § Barrel exports forbids leaving a compatibility re-export behind, so no non-breaking half exists.
- **s01-03** deferred_breaking: Re-verified: `browser/helpers.ts` still constructs `MessagePortTransport` and calls `createMCPServer`. The repair binds the move to renaming the published `serveMCP` and `serveMCPScope` into `create*` form. Moving them unrenamed is not available: `tests/policy.test.ts` enforces that every exported function in `factories.ts` is named `create*`. Moving `createScopeMessageListener` alone would leave `serveMCPScope` in the leaf still calling `createMCPServer` and importing from `factories.ts`, so it does not close the finding.
- **s01-04** deferred_breaking (src/core/MCPClient.ts): The comment half was applied: `the taverna idiom` is deleted from MCPClient.ts and `never a raw setTimeout` kept. The constant half is deferred — `DEFAULT_MCP_CLIENT_NAME` and `DEFAULT_MCP_SERVER_NAME` are published constants whose `'taverna'` value the guide rows at the Constants tables pin, so changing the default wire identity is an observable runtime change no document pins the other way.
- **s01-05** applied (src/core/MCPServer.ts, src/core/inferers.ts, src/server/handlers.ts, guides/mcp.md): The era is now read off the invocation. The literal ternary could not live in MCPServer.ts: tests/guides.test.ts asserts that file carries no standalone `legacy` word (the legacy-removability boundary). So the read is centralized as the additive core export `inferRequestEra(invocation)` in `src/core/inferers.ts` — which also collapses the second copy at `handlers.ts:102` — with its guide Helpers row, its survivor-table row, and an `@example`.
- **s01-06** applied (src/core/MCPServer.ts): The misplaced comment above `#resources` is replaced with one describing the cacheable paged projection over the consumer's resource manager, and the `tools/call` cacheability note moved to `#call`, which carried none.
- **s01-07** deferred_breaking: Re-verified: one `MCPSessionOptions` still serves the middleware store and `MCPSession`'s replay-log lifetime. The repair renames the published `MCPSessionOptions` to `MCPSessionMiddlewareOptions` and rebinds the old name to a different shape — a rename plus a non-additive change to a published type. No half stands alone.
- **s01-09** deferred_breaking: Re-verified: `createReadableStream` is still a bare `new ReadableStream` wrapper with one caller and a published guide row, fence, and parity entry. Deleting it removes an exported symbol from `@orkestrel/mcp/server`. The lanes' corrections agree on the `#pull`/`#cancel` field shape, but every version of the repair starts with the deletion.
- **s01-10** deferred_breaking: Re-verified: `MCPClientTransportInterface` is still implemented by `StdioServerTransport` and `WebSocketServerTransport`. The repair renames two published types; the finding itself records that it moves the published surface and earns a version bump.
- **s01-11** deferred_breaking: Re-verified: `bridgeMessageTransport` still sits in `server/helpers.ts` and is consumed by `factories.ts:26`. Moving it without the rename is not available — the policy sweep requires every exported `factories.ts` function to be named `create*` — so the move cannot be split from the breaking rename of a published export.
- **s01-12** applied (src/server/HTTPDisconnect.ts, src/server/transports/HTTPDisconnect.ts, src/server/index.ts, src/server/handlers.ts, src/server/middlewares.ts, tests/src/server/HTTPDisconnect.test.ts, tests/src/server/transports/HTTPDisconnect.test.ts, guides/mcp.md): The file moved to `src/server/HTTPDisconnect.ts` beside `MCPSession.ts`; the barrel row and both importers follow, and the export name is unchanged. The test moved with it to keep the `tests.md` mirror rule (the policy suite enforces it) and the guide's Tests link was repointed. The optional class rename is not taken — it moves a published name.
- **s01-13** applied (src/browser/transports/MessagePortTransport.ts, tests/src/browser/factories.test.ts): `#malformed` and its add/remove listener calls are deleted. The class TSDoc bullet now states the outcome — an unhandled `messageerror` neither throws, closes the port, nor reaches the transport, so one bad frame costs exactly that frame. The existing behavioural test still passes unchanged; its comment claimed the transport registers a listener, so that sentence was corrected.
- **s01-14** applied (src/browser/helpers.ts, src/server/helpers.ts, src/core/MCPServer.ts, src/core/MCPLegacy.ts, src/server/handlers.ts, src/core/helpers.ts, src/server/middlewares.ts, src/core/parsers.ts): `parseJSON` from @orkestrel/contract replaces the hand-written boundary at every site both lane corrections share, plus `core/helpers.ts:1194` (the `attempt` composition) and, per the lane that ruled on it, only the parse step inside `parsers.ts` (surrounding `try` kept). In `middlewares.ts` the `try` now wraps `await request.text()` alone and the text is parsed outside it. `cloners.ts:33` is untouched: only one lane named it, the finding's own site list omits it, and its input is this package's own serializer output. In `MCPLegacy.handle` the former catch branch and the following invocation check forward identically, so the boundary needs no branch of its own — behaviour is unchanged.
- **s01-15** applied (src/core/helpers.ts, src/server/helpers.ts, src/server/transports/WebSocketServerTransport.ts, src/server/transports/WebSocketClientTransport.ts, src/browser/transports/WebSocketClientTransport.ts, guides/mcp.md): `deliverMessage(emitter, text, fault)` is added to `src/core/helpers.ts` (additive export, guide Helpers row, `@example`) and the three `#receive` bodies plus `dispatchLines` now call it, with the differing error text passed as the parameter. One observable refinement: a malformed-JSON stdio line now emits the caught parse error rather than `Error('non-JSON-RPC stdio line')`, matching what the three transports already emitted. That is the only body the four sites can share; the guide and TSDoc pin only that such a line emits `error`, and both were updated to state the payload.
- **s01-16** applied (src/core/types.ts, src/core/validators.ts, guides/mcp.md): `MCPTaskNotification` is declared in `src/core/types.ts` beside `MCPTaskNotificationParams`, the guard is annotated `value is MCPTaskNotification`, and the guide carries its Types row. Additive.
- **s01-17** applied (src/core/MCPClient.ts): The duplication is gone and nothing new is published. The finding's repair (name the shape in `src/core/types.ts`) was applied first and then reversed on evidence: with the shape in the published declaration surface, `npm run build` fails — `[unplugin-dts] Failed to bundle declaration files due to an API Extractor limitation when analyzing the symbol "PromiseWithResolvers"`. The applied repair is the alternative both lanes admit: the object literal is built inside the `#pending.set` argument, so the map's value type is its one declaration, and the generator reads that same object back once (`#settle` deletes the entry before mutating what it captured, so the loop must hold the object, not the key). The `#pending` comment at :146 is corrected. See deviations.
- **s01-18** deferred_breaking: Re-verified: `EventStoreEntry` is still declared in `src/server/types.ts` and returned by `MCPSessionInterface.replay`. Renaming it to `MCPSessionEvent` renames a published type.
- **s01-19** deferred_breaking: Re-verified: `inferHeaderIssue(request, reference: JSONRPCInvocation | MCPVersion)` still branches on the argument's runtime type. The split narrows a published call signature, which is non-additive; adding `inferSessionHeaderIssue` alone would leave the union parameter and both algorithms in place.
- **s01-20** applied (src/core/MCPServer.ts, src/server/transports/WebSocketClientTransport.ts): `#round` → `#ownRound`, `#answers` → `#checkAnswers`, `#named` → `#readTaskId`, `#httpURL` → `#toHTTPURL`. All `#` private, so no published surface moves. The three `const named = …` locals became `taskId`, which is what the method returns.
- **s01-ex-A** applied (src/core/types.ts, src/core/MCPProgressReporter.ts, guides/mcp.md): `MCPProgressOwnerInterface extends MCPProgressInterface` with `take` and `stop` is declared in `src/core/types.ts` with an `@example`, `MCPProgressReporter` implements it, and the guide gains its Types row and its `## Methods` block. Additive — no class member removed. The `#### MCPProgressReporter` paragraph that claimed a second interface would describe one entity twice is replaced, since that claim was the exemption the judge overruled.
- **s01-ex-B** applied (src/core/MCPServer.ts, tests/src/core/MCPServer.test.ts): `server/discover` and `tools/list` now bind `(request)` alone; `MCPMethodHandler` still declares both parameters and admits a handler taking fewer, so the type is unchanged and nothing published moves. The `#register` comment that justified keeping `_options` is rewritten. `tests/src/core/MCPServer.test.ts` pinned the old arity (`[2, 2, 2, 2]`) and its comment carried the overruled justification; both were updated to `[1, 1, 2, 2]` and to the rule the repair enforces.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2842ms on 128 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . (no output, exit 0)
- npm run check: pass — tsc --noEmit --project tsconfig.json; check:src:core / :browser / :server all clean
- npm run build: pass — [unplugin:dts] Declaration files built in 2556ms. ✓ built in 3.39s (core, browser, server)
- npm test: pass — src 32 files 1331 passed | 1 skipped; policy 111; config 46; setup 86; guides 154; conformance 47; integration 4

## Diffstat

```text
 guides/mcp.md                                      | 296 +++++++++--------
 src/browser/helpers.ts                             |  17 +-
 src/browser/transports/MessagePortTransport.ts     |  12 +-
 src/browser/transports/WebSocketClientTransport.ts |  26 +-
 src/core/MCPClient.ts                              |  30 +-
 src/core/MCPLegacy.ts                              |  12 +-
 src/core/MCPProgressReporter.ts                    |   4 +-
 src/core/MCPServer.ts                              |  81 +++--
 src/core/helpers.ts                                |  53 +++-
 src/core/inferers.ts                               |  24 +-
 src/core/parsers.ts                                |   3 +-
 src/core/types.ts                                  |  40 +++
 src/core/validators.ts                             |   7 +-
 src/server/handlers.ts                             |  14 +-
 src/server/helpers.ts                              |  35 +-
 src/server/index.ts                                |   2 +-
 src/server/middlewares.ts                          |   9 +-
 src/server/transports/HTTPDisconnect.ts            | 171 ----------
 src/server/transports/WebSocketClientTransport.ts  |  30 +-
 src/server/transports/WebSocketServerTransport.ts  |  24 +-
 tests/src/browser/factories.test.ts                |   8 +-
 tests/src/core/MCPServer.test.ts                   |  16 +-
 tests/src/server/transports/HTTPDisconnect.test.ts | 352 ---------------------
 23 files changed, 421 insertions(+), 845 deletions(-)

Untracked (the s01-12 move's destinations, not counted by `git diff --stat`, nothing staged):
 src/server/HTTPDisconnect.ts            | 171 lines
 tests/src/server/HTTPDisconnect.test.ts | 352 lines
```

- dist moves: true

## Deviations

1. s01-17 mechanism, on measured evidence. The finding is DRIFT, so its `repair:` line ("declare it once in src/core/types.ts") stood, and I applied it first: `MCPClientSubscription` in types.ts, referenced from both positions, with its guide Types row. `npm run build` then failed — "[unplugin-dts] Failed to bundle declaration files due to an API Extractor limitation when analyzing the symbol 'PromiseWithResolvers'" — because naming the shape puts `PromiseWithResolvers` into the published declaration surface for the first time. Repairing that would need `bundledPackages` in an off-limits config file, or re-spelling a platform type by hand. I reversed it and applied the alternative both lane corrections admit (contextual typing off `#pending.set` plus one read-back), which removes the duplication and publishes nothing. The judge's note that `#settle` deletes the entry before mutating it is honoured: the generator holds the object, read back once, not the key. One consequence to weigh: the read-back carries `if (subscription === undefined) throw new Error('MCP subscription state is missing')`, which the map's `get` type requires and no runtime path reaches.

2. s01-05 needed a new shared export. `tests/guides.test.ts` ("keeps MCPServer free of legacy ownership spellings") fails on any standalone `legacy` word in `src/core/MCPServer.ts`, so the finding's literal `isModernRequest(invocation) ? 'modern' : 'legacy'` cannot be written there. I added `inferRequestEra` to `src/core/inferers.ts` (additive, correct kind file) and routed both this emit and the identical ternary at `src/server/handlers.ts:102` through it, which is also the centralization `architecture.md` § System constraints asks for. Guide Helpers row, legacy-survivor table row, and `@example` added.

3. s01-15 changes one error payload. A single body for the four `#receive`/`dispatchLines` sites cannot preserve both prior behaviours: the three transports emitted the caught parse error, `dispatchLines` emitted `Error('non-JSON-RPC stdio line')` for that same case. `deliverMessage` keeps the caught value (which s01-14 also names as the one boundary that must keep it), so a malformed-JSON stdio line now emits the parse error instead. No guide sentence or test pins the payload — both say only that such a line emits `error` — and the transports' behaviour is unchanged. Flagging it because it is observable to a consumer listening on `error`.

4. s01-04 is applied in part. The comment cleanup landed; the constant change did not. If the work order wants the identity change, it carries `src/core/constants.ts:235`, `src/browser/constants.ts:43`, two guide Constants rows, and three assertions in `tests/src/core/MCPClient.test.ts`.

5. Two tests were edited, both because a repair invalidated what they pinned: the arity assertion and comment in `tests/src/core/MCPServer.test.ts` (s01-ex-B) and one comment in `tests/src/browser/factories.test.ts` (s01-13). No test was created, deleted, or renamed; `tests/src/server/transports/HTTPDisconnect.test.ts` moved with its module under the mirror rule.

6. The guide diff is larger than its content change. `npm run format` recomputed the column widths of the Surface tables my new rows widened; that reflow is most of the 296 lines in `guides/mcp.md`.

<!-- U4d — implementer (Opus 5, native), mcp browser fix round after A4. Retained verbatim from the completion notification, 2026-09-15 (1945 s, 179 tool uses). -->

Unit U4d complete. Every carrier closed; all acceptance criteria green.

## Touched files

| File | Change |
| --- | --- |
| `src/core/MCPClient.ts` | Adds `#checkSession`, the session-bound refusal `call` and `tools` run before writing anything |
| `src/core/errors.ts` | `MCPError`'s doc block names the `-32600` refusal and narrows the plain-`Error` sentence to requests already in flight |
| `src/browser/types.ts` | `PageServerInterface.stop`; `client?: Omit<MCPClientOptions, 'transport'>`; reconciliation, call-time-snapshot, and `adopt`-validation rulings; `ScopeInterface` member docs; date phrasing |
| `src/browser/ModelContext.ts` | Call-time snapshot, per-name reconciliation over `{ controller, descriptor, tools }`, snapshot-driven prune |
| `src/browser/helpers.ts` | New `matchesDescriptor` leaf built on `canonicalStringify` and `attempt` |
| `src/browser/factories.ts` | `createPageServer` returns `stop`; inert-client and date prose |
| `src/browser/transports/WebSocketClientTransport.ts` | `typeof protocols === 'string'` → `isString(protocols)` |
| `guides/mcp.md` | Disconnected-refusal prose, `stop` rows and fences, reconciliation rule replacing the remove-then-add workaround, rejection shape, registration identity, corrected `inputSchema` parity row, rewritten `#### Helpers` intro, new Methods tables for `WebMCPRegistryInterface`, `ScopeInterface`, `ScopeTransportInterface`, `MCPContinuationInterface` |
| `tests/guides.test.ts` | New per-face assertion that every behavioural interface carries a Methods table |
| `tests/fixtures/modelContext.ts` | IDL `ontoolchange` attribute, injected `ModelContextState`, live-subscription readout |
| `tests/fixtures/browserServer.ts` | `recordFrame` replaced by `createRecorder`'s handler |
| `tests/setupBrowser.ts` | Resource-timing buffer raise and clear, `recordRegistration`, `REGISTRY_MEMBERS`, `buildRegistry` |
| `tests/setupBrowser.test.ts` | Header comment names the new DOM-driven helpers |
| `tests/src/browser/ModelContext.test.ts` | Reconciliation, snapshot, interleaving, adoption, listener-release, IDL-handler, native-gated scenarios |
| `tests/src/browser/factories.test.ts` | `stop` rename, `settles calls across page destruction`, binding assertion, `client` group type pin |
| `tests/src/browser/helpers.test.ts` | `matchesDescriptor` cases |
| `tests/src/browser/validators.test.ts` | Reads `REGISTRY_MEMBERS`/`buildRegistry` from setup; no anonymous assignment in a callback |
| `tests/src/browser/transports/WebSocketClientTransport.test.ts` | Keeps the transport-level refusal claim, reached directly now that the client refuses first |
| `tests/src/core/MCPClient.test.ts` | Disconnected-refusal pins plus the `discover` control |

Diffstat: `26 files changed, 3224 insertions(+), 82 deletions(-)`. `git status --porcelain` lists only files in the Owned set (U4's + U4c's + U4d's grants).

## Baseline, recorded at launch

`b9ff0b9` dirty with U4c's work. `npm run check` exit 0; `test:src:browser` 115 passed; `test:src:core` 932 passed.

## Carriers

| # | Closing `file:line` | Pinning test |
| --- | --- | --- |
| 1 | `src/core/MCPClient.ts:540` (`#checkSession`), call sites `:400`, `:433` | `rejects a request on a client that is not connected` (`MCPClient.test.ts:1636`), `rejects a request on a client that has never connected` (`:1655`), `answers the discovery probe on a client that has never connected` (`:1665`), `settles calls across page destruction` (`factories.test.ts:1186`) |
| 2 | `src/browser/types.ts:205`, `src/browser/factories.ts:402` | `leaves the client disconnected after stop, and a repeat stops nothing further` (`factories.test.ts:1174`) |
| 3 | `src/browser/ModelContext.ts:150-167`, `src/browser/helpers.ts:141` | `leaves a name it already registered alone on a second call` (`:100`), `re-registers a name whose definition changed` (`:117`), `rebinds a name published from a second manager` (`:152`), `matchesDescriptor` block (`helpers.test.ts:161`) |
| 4 | `src/browser/ModelContext.ts:112` | `captures the publish snapshot at call time` (`:172`) |
| 5 | `src/browser/ModelContext.ts:216-221`, `guides/mcp.md` § `ModelContextInterface` | `preserves the failure text in the rejection` (`:225`) |
| 6 | `guides/mcp.md` parity row + `src/browser/types.ts` `adopt` remarks + rewritten `#### Helpers` intro | `npm run test:guides` |
| 7 | `tests/guides.test.ts:648`, `guides/mcp.md` § `WebMCPRegistryInterface` | `documents a Methods table for every interface declaring call-signature members` |
| 8 | `tests/src/browser/ModelContext.test.ts:538` (`describe.runIf`) | `publishes to the real document registry and reads its own tools back` (`:544`), `releases every registration it made on the real document registry` (`:557`) |
| 9 | `src/browser/ModelContext.ts:157`, `guides/mcp.md` registration-identity paragraph | `leaves no registration alive when destroy runs mid-publish from a toolchange listener` (`:476`), `registers each queued publication against its own snapshot` (`:185`), `replaces an earlier handle registration when a second handle publishes the same name` (`:492`) |
| 10 | `tests/setupBrowser.ts:310` (`recordRegistration`) | `reads each registered tool as a tool advertising the inverse projection` (`:275`), `forwards the caller arguments to the foreign handler unchanged` (`:297`) |
| 11 | `tests/fixtures/modelContext.ts:101-118` | `emits nothing more after the handle is destroyed` (`:371`) |
| 12 | `tests/fixtures/modelContext.ts:87-96` | `dispatches the IDL ontoolchange handler` (`:393`) |
| 13 | `tests/setupBrowser.ts:431`, `:456` | `is inert on a repeat` (`:458`), `omits exposedTo when no origins were asked for` (`:59`), `hands back a client that is bound but not yet connected` (`factories.test.ts:1161`), `is narrowed by the same guard the factory runs` (`:519`), `refuses a registry missing any one operation it would go on to call` (`validators.test.ts:34`) |
| 14 | `tests/fixtures/browserServer.ts:35`, `src/browser/transports/WebSocketClientTransport.ts:83` | existing `drainRecorded` and WebSocket subprotocol tests |
| 15 | `guides/mcp.md` (both sites), `src/browser/factories.ts:417`, `src/browser/types.ts:212`, `tests/fixtures/modelContext.ts:6`, `tests/src/browser/ModelContext.test.ts:18` | — |
| 16 | `src/browser/types.ts:178` | `publishes the page pair and the WebMCP bridge with their declared contracts` (`factories.test.ts:1243`) |
| 17 | `tests/setupBrowser.ts:176-178` | `completes connect, tools/list, and tools/call with no request leaving the page` (`:1097`) |
| 18 | Left as they are, per the ruling | — |

## Carrier-1 error code

`JSONRPC_INVALID_REQUEST` (`-32600`), from the existing `src/core/constants.ts` — no new code, so `src/core/errors.ts` changed only in prose. The refusal says this request cannot be issued at all, and the package already codes purely local refusals against reserved JSON-RPC codes (`buildWebMCPDescriptors` throws `-32602` for a local projection failure). A machine-readable code is what separates "reconnect" from "retry" without matching a message.

**Placement decision, recorded:** the guard sits at `call` and `tools`, not inside `#request`. `#request` also carries `discover`, which the core suite drives on a never-connected client (`MCPClient.test.ts:671` and eleven siblings) and which `#negotiate` calls to build the connection itself, so gating `#request` wholesale would refuse `connect`. The brief's own documentation instruction names the `call` and `tools` rows, and this matches it. The `discover` exemption is stated in the guide, in `#checkSession`'s comment, and pinned by `answers the discovery probe on a client that has never connected`.

## Red first, then green

- Red: `tmp/probe/U4d-red.log.txt` — core `2 failed | 147 passed`, browser `12 failed | 113 passed | 2 skipped`.
- Green: `tmp/probe/U4d-green.log.txt` — core `935 passed`, browser `128 passed | 2 skipped`.
- Carrier 7's assertion was proved red by deleting the `WebMCPRegistryInterface` Methods table: `expected [ 'WebMCPRegistryInterface' ] to deeply equal []`, `1 failed | 195 passed`; restored, `201 passed`.

## Acceptance commands

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | all matched files correct |
| `npm run lint:check` | 0 | — |
| `npm run check` | 0 | — |
| `npm run test:src:core` | 0 | 935 passed |
| `npm run test:src:browser` | 0 | 128 passed, 2 skipped |
| `npm run test:src:server` | 0 | 374 passed |
| `npm run test:guides` | 0 | 201 passed |
| `npm run test:setup` | 0 | 86 passed |
| `npm run test:policy` | 0 | 90 passed, 1 skipped |
| `npm run test:config` | 0 | 172 passed, 1 skipped |
| `npm run test:conformance` | 0 | 47 passed |
| `npm run test:integration` | 0 | 4 passed |
| `npm run build` | 0 | — |

The 2 skipped browser tests are carrier 8's `describe.runIf(isWebMCPDocument(document))` block, not collected because this host exposes no registry.

Criterion 6 sweeps: installed `@orkestrel/test` plus `@orkestrel/contract` declaration names 469, collisions `[]` against every name this unit declared (`RESOURCE_TIMING_CAPACITY`, `recordRegistration`, `RecordedRegistrationInterface`, `REGISTRY_MEMBERS`, `buildRegistry`, `matchesDescriptor`, `ModelContextEventHandler`, `ModelContextState`). `Promise.withResolvers` in owned files is the `entered`/`release` latch resolved from inside the handler, never from an abort or an event; the one `addEventListener('abort'` in an owned test file is the double's own WebMCP unregistration path. No `performance.now()` deadline read in any owned test.

## Per-helper ruling, new declarations only

| Helper | Installed export considered | What it lacks |
| --- | --- | --- |
| `recordRegistration` | `createRecorder` | It uses it. The addition is the WebMCP tool dictionary the recorder is wired into. |
| `buildRegistry` | `createHostileValues` | Hostile values prove totality, not "complete except one operation". The builder reads the real double's operations through `readProperty`. |
| `REGISTRY_MEMBERS`, `RESOURCE_TIMING_CAPACITY` | none | Data tables and constants; no export names them. |
| `matchesDescriptor` | `canonicalStringify`, `attempt` | It uses both. The addition is the descriptor-equality contract `publish` reconciles against, and the ruling that an unencodable descriptor is unequal. |
| `ModelContextState` | none | The double's injected live state, so the installed registry keeps exactly the IDL surface. |

## Unknown's reading

Real Chromium still exposes no `document.modelContext`: `records that this real Chromium page exposes no WebMCP registry` passes with `'modelContext' in document === false`, so the gated native scenarios were not collected.

## Observations, not criteria

- Carrier 7's assertion, written per face, found one hole beyond the browser Surface the carrier named: `MCPContinuationInterface` had no Methods table in the core face, and `ScopeInterface` and `ScopeTransportInterface` had none in the browser face. I closed all three in `guides/mcp.md` rather than narrowing the assertion to hide the core one.
- Carrier 17's buffer raise is recorded as an observation: `performance.setResourceTimingBufferSize(1000)` plus `clearResourceTimings()` at recorder creation. The suite never approached the browser's default, so this closes a reachable-in-principle vacuity rather than an observed one.
- `tests/src/browser/transports/WebSocketClientTransport.test.ts` changed because the new client-side refusal now fires before the transport's. Both claims are kept: the client's message is asserted through `client.call`, and the transport's own refusal through a direct `transport.send`.

## Shared-file patches

None. Every change landed in an owned file.

## Deviation state

No deviation. Carrier 1 stayed inside `src/core/MCPClient.ts` and `src/core/errors.ts`; no new coded error was needed; no rule forbade a named member; the native registry is absent on this host.

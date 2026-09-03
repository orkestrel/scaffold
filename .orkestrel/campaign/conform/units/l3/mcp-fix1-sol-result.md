## Rewritten sentences
- `src/server/constants.ts:39-40`: “Override through the `session` group of `createMCPSession`'s options (`session.capacity`)…”
- `src/server/middlewares.ts:45-47`: Minting names the `session` options group.
- `tests/src/server/middlewares.test.ts:51-52`: Replay mechanics name `session.capacity`.
- `tests/src/server/middlewares.test.ts:89-92`: `startSession` forwards the `session` group.
- `tests/setup.ts:1217-1219`: The client “must ask again”; `simply` is removed.
- `tests/src/core/MCPServer.test.ts:5239`: “the paragraph must be deleted.”

## Capacity sweep
Pattern and paths: `grep -rnE "capacity" src tests guides/mcp.md README.md`.

Rulings:
- Session capacity: `src/server/constants.ts`, `src/server/MCPSession.ts`, `src/server/middlewares.ts`, `src/server/types.ts`, their tests, and the session guide sections. These name `MCPSessionOptions.capacity`, `session.capacity`, its implementation, or its default.
- Subscription capacity: core client types/implementation, related tests, and guide sections. This is the separate `MCPListenOptions.capacity` queue bound.
- Other valid uses: manager-page capacity, deployment capacity, and the recording stream’s available capacity.
- No compatibility `startSession.capacity` parameter or mapping remains.

## Inflection sweep
Pattern:

`\bisFormElicitationSupport(s|ed|ing)?\b|\bisTaskSupport(s|ed|ing)?\b|\bMCPCompletionManagerInterface(s|ed|ing)?\b|\bdefer\??:|\blisten\??:`

Paths: `src`, `tests`, `guides/mcp.md`, `guides/README.md`, `README.md`.

Hits:
- `src/core/types.ts:2347`: required `MCPTransportInterface.listen`.
- `tests/src/core/MCPServer.test.ts:3220`: local `listen` request binding.

No old predicate, completion-interface, `defer` option-key, or `listen` option-key residue remains.

## Proof commands
- mcp-obj-5: exact browser command. Red: 4 failed, 3 passed — `/home/user/work/evidence/mcp-proofs/mcp-obj-5-control-red.txt`. Green: 7 passed — `/home/user/work/evidence/mcp-proofs/mcp-obj-5-green.txt`.
- mcp-subj-2: exact server command. Red: 1 failed, 33 passed — `/home/user/work/evidence/mcp-proofs/mcp-subj-2-control-red.txt`. Green: 35 passed — `/home/user/work/evidence/mcp-proofs/mcp-subj-2-green.txt`.
- mcp-subj-1 control: exact server command. Red: 1 failed, 34 passed — `/home/user/work/evidence/mcp-proofs/mcp-subj-1-control-red.txt`.
- mcp-subj-1 restored: the same command. Green: 35 passed — `/home/user/work/evidence/mcp-proofs/mcp-subj-1-green.txt`.

## Moved cases
- Population: `tests/src/core/helpers.test.ts:118-121`
- Form predicate: `tests/src/core/helpers.test.ts:149-160`
- Task predicate: `tests/src/core/helpers.test.ts:162-179`
- Population and hostile battery: `tests/src/core/helpers.test.ts:181-204`

## O2 case shape
`tests/src/server/MCPSession.test.ts:215-224` is asynchronous, awaits `waitForDelay(5)`, then asserts that the earlier event aged out. No `performance.now()` remains.

## git status --short
```text
 M README.md
 M guides/mcp.md
 M package.json
 M src/browser/constants.ts
 M src/browser/transports/WebSocketClientTransport.ts
 M src/browser/types.ts
 M src/core/MCPServer.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/transports/HTTPClientTransport.ts
 M src/core/types.ts
 M src/server/MCPSession.ts
 M src/server/constants.ts
 M src/server/factories.ts
 M src/server/middlewares.ts
 M src/server/transports/WebSocketClientTransport.ts
 M src/server/types.ts
 M tests/fixtures/browserServer.ts
 M tests/guides.test.ts
 M tests/setup.ts
 M tests/setupConformance.ts
 M tests/src/browser/factories.test.ts
 A tests/src/browser/transports/MessagePortTransport.test.ts
 M tests/src/core/MCPLegacy.test.ts
 M tests/src/core/MCPServer.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/validators.test.ts
 M tests/src/server/MCPSession.test.ts
 M tests/src/server/handlers.test.ts
 M tests/src/server/middlewares.test.ts
```

## Exit codes
- `npm run format:check`: 0
- `npm run lint:check`: 0
- `npm run check`: 0
- MessagePort transport: 0, 7 passed
- Server middleware: 0, 35 passed
- Core helpers: 0, 183 passed
- Core validators: 0, 164 passed
- MCPSession: 0, 18 passed
- MCPServer: 0, 222 passed
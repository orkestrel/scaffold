## Reshaped case

```673:678:tests/src/server/middlewares.test.ts
const second = await openSessionStream(handle.base, id, cursor)
await triggerPush(handle.base, id)
const received = await takeEvents(second.response, 1)
second.controller.abort()
expect(received[0]?.id).toBe(seen[1]?.id)
```

## Red and green counts

- Red: exit 1; 1 failed, 34 passed. Failing test: `forwards its own clock to the session it mints, so the replay log sweeps on that clock`. No timeout appears. Capture: `/home/user/work/evidence/mcp-proofs/mcp-subj-2-control-red2.txt`
- Green: exit 0; 35 passed. Capture: `/home/user/work/evidence/mcp-proofs/mcp-subj-2-green2.txt`

## O1 call sites

- Import: `tests/guides.test.ts:53`
- Calls: `tests/guides.test.ts:1439-1440`
- The local factory is removed.

## Git status

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
- `npm run lint:check`: 1
- `npm run check`: not run
- `npm run test:guides`: 0
- Scoped middlewares run: 0

Expected lint exit 0. It found an unused `MCPTransportInterface` import at `tests/guides.test.ts:12`. The report update and remaining gates are not done because the deviation contract requires stopping when a gate reddens.
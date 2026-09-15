<!-- U4e-c — implementer (Opus 5, native), mcp: the server and browser tests U4e made false on the host (two HTTP handler scenarios to the prompts family; the WebSocket and browser discover literals carry tools.listChanged). Retained from the completion notification, 2026-09-15 (281 s, 42 tool uses). Carrier 4 named one further false site outside its scope: guides/mcp.md:3450 (the server/discover reply comment) → U4e-d. -->

Done. All eight tests are green and the gates are clean.

## Per-carrier before and after

**Carrier 1 — `C:/Users/mikes/WebstormProjects/mcp/tests/src/server/handlers.test.ts`** (both scenarios migrated to the prompts family; the SSE pump and the HTTP-disconnect subjects are unchanged)

| Site | Before | After |
| --- | --- | --- |
| `subscriptionEvents` fixture frame (`:43`) | `method: 'notifications/tools/list_changed'` | `method: 'notifications/prompts/list_changed'` |
| `disconnectEvents` fixture frame (`:57`) | `method: 'notifications/tools/list_changed'` | `method: 'notifications/prompts/list_changed'` |
| SSE pump consumer filter (`:452`) | `notifications: { toolsListChanged: true }` | `notifications: { promptsListChanged: true }` |
| SSE pump `subscriptions/listen` params (`:469`) | `{ toolsListChanged: true }` | `{ promptsListChanged: true }` |
| SSE pump acknowledgement echo (`:487`) | `{ toolsListChanged: true }` | `{ promptsListChanged: true }` |
| SSE pump expected notification frame (`:493`) | `notifications/tools/list_changed` | `notifications/prompts/list_changed` |
| Disconnect consumer filter (`:576`) | `notifications: { toolsListChanged: true }` | `notifications: { promptsListChanged: true }` |
| Disconnect `subscriptions/listen` params (`:595`) | `{ toolsListChanged: true }` | `{ promptsListChanged: true }` |

No fixture parametrisation was needed: `subscriptionEvents` has one caller (`:453`) and `disconnectEvents` has one caller (`:580`), and no other test in the file uses either. Neither generator's name carries a family, so both names stand. The expected terminal is unchanged and still arrives, because the honoured filter now omits `toolsListChanged`, and `MCPServer.ts:1537` closes the queue on producer end only in that case.

**Carrier 2 — `C:/Users/mikes/WebstormProjects/mcp/tests/src/server/transports/WebSocketClientTransport.test.ts`** (`:244`): expected discover result `capabilities: { tools: {} }` → `capabilities: { tools: { listChanged: true } }`.

**Carrier 3 — `C:/Users/mikes/WebstormProjects/mcp/tests/src/browser/factories.test.ts`**: `expectModernReply` (`:702`) compares `capabilities: { tools: { listChanged: true } }` instead of `{ tools: {} }`, closing the five `createScopeServer` tests. The helper's remark did not name the advertised capability, so I added one sentence to it and left the existing text as it stood:

```ts
// That bare server still advertises `tools: { listChanged: true }`, because it owns the tools
// family and produces it from its own registry whatever the host configured.
```

## Carrier 4 — further sites

No further site exists in the owned files. `grep -rn "listChanged|list_changed|toolsListChanged|tools: {}|subscription:" tests/src/server tests/src/browser` returns only the sites listed earlier plus these two, both recorded and untouched:

- `C:/Users/mikes/WebstormProjects/mcp/tests/src/server/factories.test.ts:226` — `capabilities: { tools: {} }` in the expected **legacy** `initialize` result. U4e changed `buildDiscoverResult` only, not `buildInitializeResult`, so this literal is still true and the test is green. It is outside the owned list.
- `C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md:3450` — the `// reply →` comment under the `server/discover` fence still claims `"capabilities":{"tools":{}}`. U4e made that comment false; the real reply carries `"listChanged":true`. `guides/**` is off-limits, so this needs a successor carrier. The neighbouring `capabilities: { tools: {} }` at `guides/mcp.md:5363` describes the legacy `initialize` result and stays true.

## Acceptance readings

| Command | Exit | Reading |
| --- | ---: | --- |
| `npm.cmd run test:src:server` (baseline, before edits) | 1 | 3 failed \| 371 passed (374) |
| `npm.cmd run test:src:browser` (baseline, before edits) | 1 | 5 failed \| 160 passed \| 2 skipped (167) |
| `npm.cmd run test:src:server` | 0 | 374 passed (374), 12 files |
| `npm.cmd run test:src:browser` | 0 | 165 passed \| 2 skipped (167), 6 files |
| `npm.cmd run test:src:server -- --reporter=verbose -t "pumps a held-open subscription acknowledgement\|aborts an A4 subscription handler when a real HTTP client disconnects\|ignores the old socket close after a new socket has replaced it"` | 0 | 3 passed \| 371 skipped |
| `npm.cmd run test:src:browser -- --reporter=verbose tests/src/browser/factories.test.ts` | 0 | 62 passed, the five named `createScopeServer` tests among them |
| `npm.cmd run format:check` | 0 | All matched files use the correct format (133 files) |
| `npm.cmd run lint:check` | 0 | No output |
| `npm.cmd run check` | 0 | Root plus core, browser, and server projects |
| `git diff --check` | 0 | No output |

The projects' totals are unchanged from the gates log (374 server, 167 browser including the same 2 pre-existing skips), so nothing was lost.

## `git status --short`

```text
 M guides/mcp.md
 M src/core/MCPServer.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.ts
 M tests/src/browser/factories.test.ts
 M tests/src/core/MCPClient.test.ts
 M tests/src/core/MCPServer.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/validators.test.ts
 M tests/src/server/handlers.test.ts
 M tests/src/server/transports/WebSocketClientTransport.test.ts
```

The eleven U4e and U4e-b files plus the three owned files, and nothing else. Diffstat over the owned files: `tests/src/browser/factories.test.ts` 4 +/-, `tests/src/server/handlers.test.ts` 16 +/-, `tests/src/server/transports/WebSocketClientTransport.test.ts` 2 +/- — 12 insertions, 10 deletions.

## Deviation state

None. Every migrated scenario passed on the prompts family on its first run, no source file was touched, and no test outside the eight moved.

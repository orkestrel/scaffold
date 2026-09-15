<!-- U4e-b — builder (Sonnet, native), mcp: the four MCPClient.test.ts client scenarios moved from the tools family to the prompts family after U4e made the server the tools family's sole producer. Retained from the completion notification, 2026-09-15 (71 s, 11 tool uses). -->

All ten U4e files untouched plus `MCPClient.test.ts`, matching the brief.

## Report

**Changes**

`C:/Users/mikes/WebstormProjects/mcp/tests/src/core/MCPClient.test.ts` — migrated four scenarios' consumer-injected `tools` frames to `prompts`, per the brief's Carriers:

1. `yields stamped frames in order as owned snapshots and returns the validated result` (near `:3721`)
   - Before: filter `{ toolsListChanged: true, resourceSubscriptions: ['resource://one'] }`; local binding `const tools = { ..., method: 'notifications/tools/list_changed' }`; asserted frame `method: 'notifications/tools/list_changed'`.
   - After: filter `{ promptsListChanged: true, resourceSubscriptions: ['resource://one'] }`; local binding renamed `prompts` with `method: 'notifications/prompts/list_changed'`; asserted frame `method: 'notifications/prompts/list_changed'`.

2. `keeps concurrent subscriptions isolated by their stamped request ids` (near `:3864`)
   - Before: `tools`/`resources` transform streams; producer branch `filter.toolsListChanged === true ? tools.readable : resources.readable`; `toolStream`, `toolAcknowledgement`; listen filter `{ toolsListChanged: true }`; written/asserted frame `notifications/tools/list_changed`.
   - After: `prompts`/`resources` transform streams; producer branch `filter.promptsListChanged === true ? prompts.readable : resources.readable`; `promptStream`, `promptAcknowledgement`; listen filter `{ promptsListChanged: true }`; written/asserted frame `notifications/prompts/list_changed`.

3. `fails loudly when the subscription frame queue reaches capacity` (near `:4071`)
   - Before: filter `{ toolsListChanged: true }`; two written frames `notifications/tools/list_changed`.
   - After: filter `{ promptsListChanged: true }`; two written frames `notifications/prompts/list_changed`.

4. `delivers to a read parked past the configured request deadline` (near `:4096`)
   - Before: filter `{ toolsListChanged: true }`; written frame and asserted `method` `notifications/tools/list_changed`.
   - After: filter `{ promptsListChanged: true }`; written frame and asserted `method` `notifications/prompts/list_changed`.

**Scoped validation**

| Command | Exit | Result |
|---|---:|---|
| `npm.cmd run test:src:core -- tests/src/core/MCPClient.test.ts` | 0 | 153 passed |
| `npm.cmd run test:src:core` | 0 | 949 passed (17 files) |
| `npm.cmd run format:check` | 0 | All matched files correctly formatted |
| `npm.cmd run lint:check` | 0 | Passed |
| `npm.cmd run check` | 0 | Passed (tsc core/browser/server) |

**`git status --short`**

```
 M guides/mcp.md
 M src/core/MCPServer.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.ts
 M tests/src/core/MCPClient.test.ts
 M tests/src/core/MCPServer.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/validators.test.ts
```

`git diff HEAD --stat -- tests/src/core/MCPClient.test.ts` reports 20 insertions/20 deletions, confined to the four migrated tests.

**Deviation state:** none. All four migrated scenarios passed against the prompts family on first run; no other test went red.

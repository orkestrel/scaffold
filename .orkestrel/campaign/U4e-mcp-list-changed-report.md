<!-- U4e — sol (GPT-6 Astra, workspace-write codex exec rooted in mcp on 7959f08): the server produces notifications/tools/list_changed from the registry. Retained from tmp/codex/U4e-mcp-list-changed-last.md, 2026-09-15 (897 s, journal tmp/codex/U4e-mcp-list-changed.jsonl 752 633 bytes, exit 0). Deviation: four MCPClient.test.ts scenarios outside the owned list inject consumer-produced tools notifications and now fail — carried to U4e-b. -->

## Status

Implementation and executed refresh proof are in place. **Acceptance remains blocked by conflicting tests outside the brief’s owned scope.**

## Baseline

Commit: `7959f080a7d1eaed167e8192395824c5b2f3da5d` on `main`.

Tracked tree was clean. Baseline `npm.cmd run test:src:core`: **939 passed, exit 0**.

## Touched files and diff stat

`git diff --stat main` reports:

```text
 guides/mcp.md                     |  33 +++--
 src/core/MCPServer.ts             | 139 ++++++++++++++++-----
 src/core/helpers.ts               |   2 +-
 src/core/types.ts                 |  19 +--
 src/core/validators.ts            |  21 ++++
 tests/guides.test.ts              |  22 ++--
 tests/setup.ts                    |  66 ++++++++--
 tests/src/core/MCPServer.test.ts   | 245 +++++++++++++++++++++++++++++++++-----
 tests/src/core/helpers.test.ts    |  12 +-
 tests/src/core/validators.test.ts |  24 ++++
 10 files changed, 479 insertions(+), 104 deletions(-)
```

`git status --porcelain` reports:

```text
 M guides/mcp.md
 M src/core/MCPServer.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.ts
 M tests/src/core/MCPServer.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/validators.test.ts
```

## Red-then-green evidence

The following tests ran red against the preceding implementation and green after implementation:

- `pushes tools/list_changed when the registry adds a tool`
- `pushes tools/list_changed when the registry removes a tool`
- `pushes tools/list_changed when the registry clears`
- `releases the registry subscription when the stream signal aborts`
- `pumps a consumer producer beside the built-in tools family`
- `refuses a consumer filter that claims the tools family`
- `advertises tools.listChanged`

The exact command produced **7 failed, exit 1 → 7 passed, exit 0**:

```powershell
npm.cmd run test:src:core -- -t 'pushes tools/list_changed when the registry|releases the registry subscription|pumps a consumer producer beside|refuses a consumer filter|advertises tools.listChanged'
```

The executed guide test, `refreshes after a server registry add without re-publishing or polling`, produced **1 failed, exit 1 → 1 passed, exit 0**. The final proof isolates a server-side add and executes the installed tool. Its red run used the baseline server implementation.

```powershell
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project guides -t 'refreshes after a server registry add'
```

Logs are under `tmp/codex/U4e-{core,guides}-{red,green}.log`.

## Merge ruling

The declaration survey covered installed `node_modules/@orkestrel/**/*.d.ts` using `rg --no-ignore`. Relevant declarations read included the core `index.d.ts` files for `emitter`, `test`, `tool`, `contract`, `agent`, `queue`, and `mcp`, including their event, collector, channel, and stream surfaces.

No async-iterable merge primitive was found. `MCPServer` therefore feeds registry events and the consumer producer into one native `ReadableStream` queue. `MCPStreamController` retains cancellation ownership; abort releases registry listeners with the original handler reference.

Construction refusal uses the existing `MCPError` with `JSONRPC_INVALID_PARAMS` (`-32602`). The guide documents it. Consumer examples use prompts where graceful consumer-source completion is the subject.

## Acceptance readings

The final readings are:

| Command | Exit | Result |
|---|---:|---|
| `npm.cmd run format:check` | 0 | Passed |
| `npm.cmd run lint:check` | 0 | Passed |
| `npm.cmd run check` | 0 | Passed |
| `npm.cmd run test:src:core` | 1 | 945 passed, 4 failed |
| `npm.cmd run test:guides` | 0 | 201 passed |
| `npm.cmd run test:setup` | 0 | 86 passed |
| Owned core test files | 0 | 587 passed |
| `git diff --check` | 0 | Passed |
| Owned-path, LF, and UTF-8 checks | 0 | Passed |

## Deviation state

The remaining failures are in [MCPClient.test.ts](C:/Users/mikes/WebstormProjects/mcp/tests/src/core/MCPClient.test.ts:3722), outside the owned list:

- `yields stamped frames in order as owned snapshots and returns the validated result`
- `keeps concurrent subscriptions isolated by their stamped request ids`
- `fails loudly when the subscription frame queue reaches capacity`
- `delivers to a read parked past the configured request deadline`

These tests inject consumer-generated tools notifications, which the required server ownership now rejects. They need a successor scope to migrate their scenarios.

No off-limits files were changed. No agents were spawned. No polling or second registry event source was introduced. `prove` was unavailable; no receipt is claimed.
<!-- U4e-e — sol (GPT-6 Astra, workspace-write codex exec rooted in mcp on the dirty U4e tree over 7959f08): the subscription stream paces its producers, survives them, and reads in one voice. Retained from tmp/codex/U4e-e-mcp-pump-last.md, 2026-09-15 (888 s, thread 01a0a5a9-0881-78d1-81b3-ef646d91d06b, journal tmp/codex/U4e-e-mcp-pump.jsonl 687 395 bytes, exit 0). -->

## Status and baseline

U4e-e is implemented. All required acceptance commands pass. No agents were spawned.

Baseline: `7959f080a7d1eaed167e8192395824c5b2f3da5d`, with the inherited U4e–U4e-d edits. Baseline core suite: **949 passed, exit 0**.

## Touched files and owned diff stat

The cumulative `git diff --stat main` over the owned paths is:

```text
 guides/mcp.md                     |  63 ++++--
 src/core/MCPServer.ts             | 180 ++++++++++++++---
 src/core/helpers.ts               |   4 +-
 src/core/types.ts                 |  39 +++-
 src/core/validators.ts            |  22 +++
 tests/guides.test.ts              |  69 +++++--
 tests/setup.test.ts               |  69 ++++++-
 tests/setup.ts                    | 101 ++++++++--
 tests/src/core/MCPServer.test.ts   | 398 ++++++++++++++++++++++++++++++++++----
 tests/src/core/validators.test.ts |  35 ++++
 10 files changed, 857 insertions(+), 123 deletions(-)
```

`src/core/index.ts` already exports the type through its `types.ts` star export.

## Working-tree status

`git status --porcelain` reports:

```text
 M guides/mcp.md
 M src/core/MCPServer.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/browser/factories.test.ts
 M tests/src/core/MCPClient.test.ts
 M tests/src/core/MCPServer.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/validators.test.ts
 M tests/src/server/handlers.test.ts
 M tests/src/server/transports/WebSocketClientTransport.test.ts
```

Baseline hash comparison confirms that this assignment changed only owned files. The off-limits inherited edits remain byte-identical.

## Red-then-green evidence

The regression command was:

```powershell
npm.cmd run test:src:core -- -t 'advances the consumer producer only on demand|delivers queued notifications before|coalesces registry changes while|acknowledges a tools subscription on a destroyed registry'
```

Its readings were **3 failed, 2 passed, exit 1 → 5 passed, exit 0**.

| Test title | Baseline → implementation |
|---|---|
| advances the consumer producer only on demand | Failed → passed; parked writes bounded, then all 32 delivered in order |
| delivers queued notifications before a producer failure's terminal | Failed → passed |
| coalesces registry changes while the last frame is unread | Failed → passed |
| delivers queued notifications before a normal producer close | Passed → passed |
| acknowledges a tools subscription on a destroyed registry and produces nothing | Passed → passed |

The destroyed-registry behavior already passed because the installed emitter ignores registration after destruction. A mutation that prematurely closed that stream produced **1 failed, exit 1 → 1 passed, exit 0** after restoration, using:

```powershell
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project src:core -t 'acknowledges a tools subscription on a destroyed registry'
```

The guard pin, `narrows unknown input to the declared consumer filter`, was checked by restoring the wider predicate temporarily:

```powershell
node node_modules/typescript/bin/tsc --noEmit --project tsconfig.json
```

Result: **2 type diagnostics at the pin, exit 2 → no diagnostics, exit 0**.

Evidence logs are under [tmp/codex](C:/Users/mikes/WebstormProjects/mcp/tmp/codex), named `U4e-e-{core,guard,destroyed}-{red,green}.log`.

## Helper and coalescing mechanism

`createSubscriptionScript`, configured by `SubscriptionScriptOptions`, replaces the nested producers. Setup tests verify frame order, filter/signal recording, cancellation parking, and failure after yielded frames.

The coalescing state is `unread`: a per-subscription set holding the unread registry notification. Consumption removes it, permitting the next registry frame.

## Acceptance readings

The final commands produced:

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run format:check` | 0 | Passed |
| `npm.cmd run lint:check` | 0 | Passed |
| `npm.cmd run check` | 0 | Passed |
| `npm.cmd run test:src:core` | 0 | 955 passed |
| `npm.cmd run test:setup` | 0 | 89 passed |
| `npm.cmd run test:guides` | 0 | 202 passed |
| `git diff --check` | 0 | Clean |
| Baseline hash and text-integrity checks | 0 | Only owned changes; UTF-8, LF-only |

## Criterion 4 search

The search was:

```powershell
rg -n -U '(?::|=)\s*(?:async\s+)?function\b' tests/src/core -g '*.test.ts'
```

Result: **no matches, exit 1**. Assigned-generator and property-function controls matched, exit 0. See [search evidence](C:/Users/mikes/WebstormProjects/mcp/tmp/codex/U4e-e-search.log).

## Deviation state

No scope or implementation deviations. The destroyed-registry baseline required the mutation evidence described earlier. `prove` remained unavailable; no receipt is claimed. Independent audit and P20 replay remain with the Orchestrator.
<!-- U4e-g — sol (GPT-6 Astra, workspace-write codex exec rooted in mcp on the dirty U4e tree over 7959f08): a caught undefined keeps its identity, the closed stream refuses registry enqueues, the state record is private, two comments one line. Retained from tmp/codex/U4e-g-mcp-failure-last.md, 2026-09-15 (400 s, thread 01a0a5e7-5e84-79f0-81d7-e4776f1619f9, journal tmp/codex/U4e-g-mcp-failure.jsonl 476 568 bytes, exit 0). -->

## Touched files and diff stat

U4e-g is implemented. Changes relative to the captured dirty baseline are:

| File | Change | Added / removed |
|---|---|---:|
| [MCPServer.ts](C:/Users/mikes/WebstormProjects/mcp/src/core/MCPServer.ts:1438) | Private annotations; wrapped failure; rethrow original value; condensed comment | +28 / −12 |
| [types.ts](C:/Users/mikes/WebstormProjects/mcp/src/core/types.ts:1766) | Removed published state interface; clarified producer remarks | +2 / −19 |
| [MCPServer.test.ts](C:/Users/mikes/WebstormProjects/mcp/tests/src/core/MCPServer.test.ts:554) | Regression cases; condensed refusal comment | +70 / −3 |
| [mcp.md](C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md:2544) | Removed state Surface row | +0 / −1 |

Unit total: **100 insertions, 35 deletions**. `validators.test.ts` required no change.

## Status and baseline

Baseline: `7959f080a7d1eaed167e8192395824c5b2f3da5d`, with **956 core tests passing**.

The original fifteen dirty paths remain unchanged as a status set. Hash comparison identifies only the owned files listed above as changed. Off-limits files remain byte-identical. See [baseline status](C:/Users/mikes/WebstormProjects/mcp/tmp/codex/U4e-g-baseline-status.log), [final status](C:/Users/mikes/WebstormProjects/mcp/tmp/codex/U4e-g-status.log), and [scope evidence](C:/Users/mikes/WebstormProjects/mcp/tmp/codex/U4e-g-scope.log).

## Red-then-green evidence

The regression titles are:

- `terminates with the failure terminal when the producer throws undefined`
- `ignores registry changes after the stream closed on a producer failure (%s)` — `undefined` and `Error` cases.

The same command ran before and after implementation:

```powershell
npm.cmd run test:src:core -- -t 'terminates with the failure terminal when the producer throws undefined|ignores registry changes after the stream closed on a producer failure'
```

**Red:** 2 failed, 1 passed, 956 skipped; exit 1.  
**Green:** 3 passed, 956 skipped; exit 0.

The failures reproduced successful completion instead of `-32603`, and the closed-controller `TypeError`. The `Error` case passed at baseline.

Removing the failure guard supplied the negative control for both closure cases:

```powershell
npm.cmd run test:src:core -- -t 'ignores registry changes after the stream closed on a producer failure'
```

**Guard removed:** 2 failed, 957 skipped; exit 1.  
**Guard restored:** 2 passed, 957 skipped; exit 0.

Logs use `tmp/codex/U4e-g-regressions-{red,green}.log` and `U4e-g-closure-control-{red,green}.log`.

## Inline annotation

The local record and private method parameters use this structural form:

```ts
{
	frame: JSONRPCNotification | undefined
	failure: { readonly error: unknown } | undefined
	iterator: AsyncIterator<JSONRPCNotification> | undefined
}
```

The generator rethrows `state.failure.error` after draining. The existing failure guard suppresses registry enqueue. Lint and typechecking admit the annotations.

## Acceptance readings

The final readings are:

| Command | Exit | Result |
|---|---:|---|
| `npm.cmd run lint:check` | 0 | Clean |
| `npm.cmd run check` | 0 | Typechecks pass |
| `npm.cmd run format:check` | 0 | Clean |
| `npm.cmd run test:src:core` | 0 | 959 passed |
| `npm.cmd run test:guides` | 0 | 202 passed |
| `git diff --check` | 0 | Clean |

An earlier concurrent core run failed the unchanged legacy-transport timeout test. The standalone rerun passed; the failed reading remains in `U4e-g-core-concurrent-failure.log`.

## Searches and comments

`rg -n MCPSubscriptionState src tests guides` returns **no matches**. The guide’s coalescing sentence remains once.

Each requested comment occupies one line:

- `MCPServer.ts:1493`: “Skip listener registration on destroyed registries without relying on emitter tolerance.”
- `MCPServer.test.ts:784`: “Bypass the literal types to prove the runtime refusal a JavaScript caller reaches.”

See [search evidence](C:/Users/mikes/WebstormProjects/mcp/tmp/codex/U4e-g-search.log).

## Deviation state

No scope or implementation deviations. No agents spawned. No `prove` receipt claimed under the brief’s standing constraint.
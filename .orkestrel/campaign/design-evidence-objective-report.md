Adopt a durable terminal `evidence` getter on a stdio-specific transport interface. Preserve the last ended child’s snapshot across `start()`. Replace it when the replacement child reaches its own terminal boundary.

### 1. Shape

Recommendation: expose `readonly evidence: string | undefined` as a getter on `StdioClientTransportInterface`.

The getter is the correct shape because evidence is durable diagnostic state. A consumer can inspect it after receiving `close` or after `close()` resolves.

Reject these alternatives:

- An event is lossy when the consumer subscribes after the child exits. Adding it to `MCPClientTransportEventMap` also exposes an irrelevant event on HTTP, WebSocket, browser, and test transports.
- A `start()` result cannot carry exit evidence because `start()` resolves when the child is ready for messages.
- A `close()` result would change the shared `Promise<void>` lifecycle contract and would not cover a child that exits independently.
- Attaching the tail to `error` conflates a nonzero child exit with a transport fault. The existing transport reports child exit through `close`.
- A live passthrough to `this.#process?.evidence` loses the value when either teardown path clears `#process`.

### 2. Type and absence

Recommendation: make `evidence` a required property whose value is `string | undefined`.

Its readings are:

- Before any child lifetime ends: `undefined`.
- After the last ended child wrote no stderr: `undefined`.
- After the last ended child wrote stderr: the retained tail string.
- During a replacement lifetime: the prior terminal snapshot remains readable until the replacement reaches its terminal boundary.
- After `start()` rejects before constructing a supervisor: the prior snapshot remains unchanged.

Reject `string` with `''`. An empty string invents a sentinel for absence and makes “no ended lifetime” indistinguishable from “an ended lifetime produced no stderr.”

Reject an optional `evidence?` property. The stdio transport always supports the capability; its value, not the capability, can be absent.

### 3. Lifetime

Recommendation: store one terminal snapshot, tagged to the child lifetime that produced it.

Apply these capture rules:

- On natural exit, read `child.evidence` inside `#onExit(child)` before clearing `#process`. The `Process.exit` promise settles from the child `close` event, after its stdio closes, so this snapshot is final.
- On explicit shutdown, retain the local `child` reference, release the line pump, clear the active identity, await `child.destroy()`, read `child.evidence`, and emit the transport `close` event after the snapshot is stored.
- Do not clear evidence in `start()`. The replacement’s terminal snapshot replaces it, including replacing a prior string with `undefined` when the replacement was quiet.
- Do not change evidence on an idempotent `close()` with no child.
- Tag captures by lifetime so a delayed completion from an older child cannot overwrite evidence from a later completed child.

The public getter represents terminal evidence, not a live stderr view. During an active child lifetime, it continues to report the latest ended lifetime.

Reject accumulated history. A collection adds retention policy, addressing, and eviction questions that the diagnosed startup-failure consumer does not need.

Reject retaining the supervisor as the public store. It keeps an ended process object reachable, permits the getter to mutate after `close()`, and lets stale children cross restart boundaries.

### 4. Interface placement

Recommendation: add `StdioClientTransportInterface extends MCPClientTransportInterface` in [src/server/types.ts](/C:/Users/mikes/WebstormProjects/mcp/src/server/types.ts), make the class implement it, and make `createStdioClientTransport` return it.

This keeps the shared transport contract honest:

```ts
export interface StdioClientTransportInterface extends MCPClientTransportInterface {
	readonly evidence: string | undefined
}
```

A consumer retaining the factory result can read `transport.evidence` and can still pass that value wherever `MCPClientTransportInterface` is required. A consumer that widens the value, including by reading `client.transport`, loses access and must retain the original stdio-specific reference.

Reject placement on `MCPClientTransportInterface`. HTTP, WebSocket, browser, server-bridge, loopback, and recording transports have no supervised child or stderr. Adding the member would force false absence semantics across those implementations and their guide rows.

Reject a concrete-class-only member. The factory erases the class behind `MCPClientTransportInterface`, and a public contract declared only in the implementation conflicts with the repository’s types-first rule.

The guide needs a `StdioClientTransportInterface` Surface/Types row. It needs no separate Methods table because it inherits `start`, `send`, and `close` without adding a call signature.

### 5. Bound and truth

Recommendation: document that the transport retains the last `PROCESS_EVIDENCE` raw stderr bytes. Under installed `@orkestrel/process` 0.0.5, that value is `2,048`.

The bound applies to raw bytes before decoding. It is not a character limit or a promise about JavaScript `string.length`. The retained value is the tail, and its leading cut advances past UTF-8 continuation bytes.

Do not add a configurable transport option. No named consumer requires a separate bound, and the transport already adopts the supervisor’s declared default.

`Process.evidence` is safe to read after `destroy()` resolves: the getter has no destroyed-state refusal, and `destroy()` does not discard its retained buffer. It is not necessarily stable then. The declaration explicitly permits `destroy()` to resolve while inherited stdio remains open.

A real-child probe on Node v24.18.1 for Windows read `"parent-subject\n"` when `destroy()` resolved and `"parent-subject\nlate-subject\n"` later. The control with descendant stderr ignored stayed unchanged. Therefore:

- Natural exit captures the final tail.
- Explicit close captures the tail available when `destroy()` resolves.
- Descendant-held stderr can deliver more bytes after transport `close()` resolves.
- Those later bytes must not mutate the transport’s stored snapshot.

Reject a final-tail promise for explicit close. Waiting for inherited stderr to close would undo the transport’s bounded-close behavior. Reject asynchronous post-close refresh for the same reason: it makes evidence unstable and creates stale-child restart races.

### 6. Proof

Use real spawned children and event-driven settlement. The permanent cases and their negative controls are:

| Case | Required proof | Negative control |
|---|---|---|
| Startup failure | A child writes a sentinel to stderr and exits nonzero; after the transport `close` event, `evidence` equals the sentinel. | A nonzero child writes no stderr; `evidence` is `undefined`. |
| Pre-start absence | A factory-created transport exposes `evidence` as `undefined` without a cast. | The startup-failure case proves the getter can return a value. |
| Explicit close | A live child writes stderr, signals readiness over stdout, and is closed; the tail is available before the transport emits `close`. | A ready but quiet child closes with `undefined`. |
| Restart retention | A failed lifetime records a sentinel; a replacement starts and the sentinel remains readable until that replacement ends. | The quiet replacement’s terminal boundary replaces the sentinel with `undefined`. |
| Byte bound | A child writes valid multibyte stderr beyond `PROCESS_EVIDENCE`; the returned suffix occupies the declared raw-byte window. | ASCII output occupying the same raw-byte window has a different character length, disproving a character bound. |
| Tail selection | A discarded prefix and retained suffix straddle the bound; only the suffix remains. | A below-bound message remains intact. |
| Post-close stability | A detached descendant inherits stderr and writes after the root’s destroy barrier; the transport snapshot stays unchanged after `close()` resolves. | A descendant that writes before the barrier has that text included. |
| Stale lifetime isolation | An older child’s delayed completion occurs after a replacement has ended; the older result does not overwrite the replacement’s terminal evidence. | The replacement’s own terminal capture does replace the earlier snapshot. |
| Guide truth | The existing guide child writes `STDERR_SENTINEL`; the factory result exposes that evidence after close. | The raw inherited-stderr control writes the sentinel to its parent-owned file instead. |

### File-level change list

- [src/server/types.ts](/C:/Users/mikes/WebstormProjects/mcp/src/server/types.ts): declare and document `StdioClientTransportInterface`.
- [StdioClientTransport.ts](/C:/Users/mikes/WebstormProjects/mcp/src/server/transports/StdioClientTransport.ts): implement the narrower interface, store terminal evidence, capture it on natural and explicit teardown, and guard stale lifetimes.
- [factories.ts](/C:/Users/mikes/WebstormProjects/mcp/src/server/factories.ts:342): return `StdioClientTransportInterface` and correct the stale TSDoc claim that stderr is inherited.
- [StdioClientTransport.test.ts](/C:/Users/mikes/WebstormProjects/mcp/tests/src/server/transports/StdioClientTransport.test.ts): add the real-child lifecycle, restart, byte-bound, and late-stderr proofs.
- [guides/mcp.md](/C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md:2258): document the getter, absence rules, lifetime replacement, `2,048`-raw-byte bound, and post-close limitation; update the stdio Types row and Methods mapping.
- [guides.test.ts](/C:/Users/mikes/WebstormProjects/mcp/tests/guides.test.ts:674): extend the executed stdio guide proof to assert the retained sentinel and its raw-spawn control.

Leave `MCPClientTransportInterface`, its event map, the HTTP and WebSocket transports, and [src/server/index.ts](/C:/Users/mikes/WebstormProjects/mcp/src/server/index.ts) unchanged. The existing star export already exposes the server types.
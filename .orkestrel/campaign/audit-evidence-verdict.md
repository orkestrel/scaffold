1. **BROKEN** — Settled, non-overlapping lifetimes return the intended values. Concurrent restart does not. `close()` clears `#process` before awaiting `child.destroy()`. A second `start()` can therefore install child B while child A is closing. If B exits and captures its tail before A’s destroy resumes, A then overwrites `#evidence` without an identity guard. Reads after B’s end report A’s tail. See [StdioClientTransport.ts](/C:/Users/mikes/WebstormProjects/mcp/src/server/transports/StdioClientTransport.ts:130). Serialize `start()` behind the in-flight close barrier and make concurrent `close()` calls share that barrier.

2. **BROKEN** — The individual capture sites are correctly positioned for serialized lifetimes, but they are not complete under the reachable A-close/B-start interleaving. The unguarded assignment in `close()` can overwrite B’s captured result after B ends. The installed `Process.destroy()` also settles on native exit while stderr observation can remain outstanding. The ruling probe explicitly leaves stderr written during the `SIGTERM` window unsettled, so completeness at that barrier lacks executed evidence. A regression child that writes a sentinel from its `SIGTERM` handler would settle that part with `npm run test:src:server -- tests/src/server/transports/StdioClientTransport.test.ts`.

3. **CONFIRMED** — After either capture, `#process` no longer refers to that supervisor, and the getter returns the immutable stored string. A detached descendant can mutate the old `Process.evidence`, but no later getter reads that process. The post-close test proves the pre-barrier channel is live, releases the late writer, waits for its exit, and repeatedly compares the public reading. See [StdioClientTransport.test.ts](/C:/Users/mikes/WebstormProjects/mcp/tests/src/server/transports/StdioClientTransport.test.ts:724).

4. **CONFIRMED** — `StdioClientTransportInterface` extends the unchanged shared interface, the class implements it, the factory returns it, and the server barrel exports `types.ts`. Existing consumers use inherited members or assign the factory to its own inferred type, so the narrower return remains assignable wherever the former return was accepted. See [types.ts](/C:/Users/mikes/WebstormProjects/mcp/src/server/types.ts:391) and [factories.ts](/C:/Users/mikes/WebstormProjects/mcp/src/server/factories.ts:345). The supplied host runs report `test:src` with 1062 passing tests and `test:guides` with 138.

5. **BROKEN** — The post-close-stability case is substantive, and the supplied red-first trap proves the naïve getter can fail. The restart and multibyte cases leave holes:

   - The restart case checks only the replacement’s live empty tail. It never checks the result after that silent replacement ends. An implementation that preserves A when B captures `''` passes the present assertions but later reports A as B’s captured tail.
   - The multibyte case deliberately chooses a two-byte character and requires `2048 % 2 === 0`. A naïve raw `Buffer.subarray(-2048).toString('utf8')` therefore passes. With a three-byte character, the slice can begin on a continuation byte, introduce `�`, and produce decoded output whose encoded size exceeds the claimed bound.

   Add an assertion after the replacement lifetime ends and add a non-divisible three-byte boundary vector. See [StdioClientTransport.test.ts](/C:/Users/mikes/WebstormProjects/mcp/tests/src/server/transports/StdioClientTransport.test.ts:543) and [StdioClientTransport.test.ts](/C:/Users/mikes/WebstormProjects/mcp/tests/src/server/transports/StdioClientTransport.test.ts:586).

6. **BROKEN** — The `2048`-raw-byte bound and the two-byte/`1024`-character example match `@orkestrel/process` 0.0.5. The lifetime prose overclaims:

   - Concurrent close/restart can make an older lifetime overwrite the replacement’s captured tail.
   - “The `close` listener … fires before any replacement child starts” is false. A listener can synchronously call `start()`, so a later listener can observe the replacement.
   - The guide presents the close capture as the child’s completed tail without stating the ruling probe’s unresolved `SIGTERM`-window race.

   See [mcp.md](/C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md:2264) and [mcp.md](/C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md:4384).

### Findings outside the claims

- **BROKEN** — Added developer prose violates the repository’s ban on stating counts of extensible sets. Examples include “`evidence` is the one member” in [types.ts](/C:/Users/mikes/WebstormProjects/mcp/src/server/types.ts:383), “Three host facts” in [StdioClientTransport.test.ts](/C:/Users/mikes/WebstormProjects/mcp/tests/src/server/transports/StdioClientTransport.test.ts:263), and “Two host facts” in [guides.test.ts](/C:/Users/mikes/WebstormProjects/mcp/tests/guides.test.ts:688). Recast each sentence without the tally.

VERDICT: FAIL — 4 broken, 0 unresolved, 0 not-evidenced, 1 finding outside the claims
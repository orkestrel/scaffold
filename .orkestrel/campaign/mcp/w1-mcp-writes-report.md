Implemented the ruled stdio write outcome.

- Added exported `writeLine` with callback-error and synchronous-throw rejection. The existing server helpers barrel exposes it.
- `StdioServerTransport.send` awaits callback confirmation, rejects after closure, and settles pending sends during teardown.
- `start()` subscribes to output `error`; `#release()` removes that exact listener without ending or destroying caller streams.
- Updated transport-family TSDoc and `guides/mcp.md`. Sibling transports did not change.

Pins:

- Callback error rejection: passed.
- Synchronous throw rejection: passed.
- Output error survival and domain emission: passed.
- Input/output listener restoration and pending-send settlement: passed.
- Send after close rejection: passed.
- Deferred high-water-mark send ordering: passed.
- `sendStream` delivery ordering: passed.
- Existing send tests: passed.
- Focused server run: exit 0, 68 tests passed.
- Server TypeScript check: exit 0.
- Scoped lint: exit 0.
- Scoped format check: exit 0.
- MCP guide parity selection: exit 0, 92 selected tests passed.

Mutation controls:

- Removing callback settlement failed at `tests/src/server/helpers.test.ts:101` and `:108`.
- Removing the output error subscription failed at `tests/src/server/transports/StdioServerTransport.test.ts:259`.
- Each control was reverted.

Teardown seam: `#release()`.

Unclosed claims:

- `npm run test:src:server` exited 1 because restricted loopback listeners returned `EPERM`; 127 tests failed, 179 passed, and 1 skipped.
- `npm run test:guides` exited 1 because existing spawned-child cases timed out; 5 failed and 133 passed.
- The short hypothesis is the brief’s stated sandbox denial of loopback listeners and grandchild processes.
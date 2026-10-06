# Review of mcp items 13 and 14 (`c98d82f`, `8f743a8`), Opus 5.5 reviewer, 2026-10-06

Objective lane. Terminal: **FAIL**, with two required test changes.

1. **Item 14:** CONFIRMED in code. `clock` is read at every expiry read (`MCPServer.ts:1164`, `:1210`, `:1305`, `:1312`, `:1361`, `:1362`), and the cases contain no real timer.
   - Gap: `createManualClock()` starts at 0, below the wall clock. A read reverted to `Date.now()` near `:1210` or `:1362` stays green.
2. **`isPingRequest`:** CONFIRMED. It is total, sits in `validators.ts`, is documented, and no other fleet guide claims the name.
   - Gap: the inherited off-shape inputs (a wrong `jsonrpc`, array `params`, a batch array) are unpinned.
3. **The transport:** CONFIRMED.
   - Only `initialize` and `isPingRequest` are exempt from the header. The pass-through precedes the state write, the header supply, the write-back, and the stamp.
   - Unknown-id pings, empty session headers, batches, notifications, and modern pings are each refused or routed earlier.
   - The departure from the 400 recommendation is stated and minimal.
4. **Tests:** CONFIRMED by code path. ROADMAP item 15 names only the POST arm; the GET and DELETE arms also answer 404.

Outside the claims: a `NaN` clock fails open. The Orchestrator ruled that the trust goes in the TSDoc, with no runtime guard.

Repair unit: `items13-14fix` (mcp `tmp/codex/items13-14fix-brief.md`).

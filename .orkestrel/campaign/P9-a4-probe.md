# P9 — the A4 analyst's vectors reproduced in the real `src:browser` project (Orchestrator, 2026-09-15 09:19–09:23Z)

Instrument: `mcp/tests/src/browser/probe-p9.test.ts` (retained beside this file as `P9-a4-probe.test.ts.txt`; deleted from the tree after the reading), run as `npm run test:src:browser -- tests/src/browser/probe-p9.test.ts` on the U4c working tree in real Chromium.

Readings (3 failed, 1 passed on the second run; the first run's 5a/5b built the fixture wrongly and are void):

- Claim 5a — `publish` reads the registry at queue time, not at call time: `const pending = bridge.publish(tools); tools.clear(); await pending` registers nothing (`registered after publish-then-clear = []`). The TSDoc says "registers every tool the manager holds now". **BROKEN as documented**; ruling: capture the definitions at call time before queueing (the documented contract), or change the sentence — the fix round captures at call time.
- Claim 5b — a failing tool rejects with a fresh `Error` whose message is the failure text (`rejection is Error = true, message = kaboom, same as thrown = false`). `ToolFailure.error` is a string, so the thrown instance cannot be forwarded. **Not a defect**; ruling: document that `executeTool` rejects with an `Error` carrying the failure's message.
- Claim 2 — a `client.call` after `page.destroy()` is still pending after 1500 ms (`call after destroy = still pending after 1500 ms`). **BROKEN**: a hanging promise; the fix round makes a call on a destroyed pair reject promptly.
- Claim 3 — held: after an aborted `tools/call` (`rejected: MCP request 'tools/call' was aborted`) the pair answered a second tool (`echo after = ok`).

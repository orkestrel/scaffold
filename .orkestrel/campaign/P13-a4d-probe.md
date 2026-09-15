# Probe P13 — the A4d analyst's unexecuted vectors, run in real Chromium (Orchestrator, 2026-09-15)

**Instrument.** `mcp/tests/src/browser/probe-p13.test.ts`, run by explicit path in the `src:browser`
Vitest project (Playwright Chromium), then removed from the tree; retained beside this record as
`P13-a4d-probe.test.ts.txt`. Logs: `P13-a4d-probe.log.txt` (both claims), `P13-a4d-probe-2.log.txt`
(claim 2 alone with the verbose reporter, to capture its reading). The mutation reading for claim 5
is `P13b-a4d-mutation.log.txt`: the Orchestrator applied the queued-call-only run-time projection
to `src/browser/ModelContext.ts` (a `#depth` counter; a queued call projects `buildWebMCPDescriptors`
at execution), ran the three tests, and restored the file from a byte copy (SHA-256 prefix
`cbf062310b41bcc8` before and after; no `#depth` remains).

**Readings.**

- Claim 2 (`disconnect()` inside a `connect` listener, then a call, a task request, and a
  subscription's first `next()`): HOLDS. `{"connect":"resolved","disconnect":"settled after 0 ms",
  "call":"rejected after 0 ms: MCP client disconnected","task":"rejected after 0 ms: MCP client
  disconnected","next":"rejected after 0 ms: MCP client disconnected"}` — the deferred teardown's
  drain settles what was issued; nothing parks and nothing reaches the request deadline. The
  contract is settlement, not `-32600`, which is what the prose finding O1 must say.
- Claim 4 (an earlier `clear` listener adds a described tool under the SAME name `add`): BROKEN.
  Registrations after the clear read `[]` while the manager holds the new `add`; expected
  `[["add","Adds again"]]`. The nested addition queues its reconciliation before `#cleared` queues
  the release of that name, and the release drops the replacement.
- Claim 5 (the queued-call-only projection): REPRODUCED as the writer reported. Under the
  mutation `a queued publication does not see a tool added after its call` fails (`promise
  rejected "MCPError: WebMCP requires a description f…"`) and the two restated snapshot tests
  pass (`1 failed | 2 passed | 38 skipped (41)`); the shipped implementation passes all three
  (U4g's gates). Closed.

**Carried by.** `U4h-mcp-browser-fix-brief.md` carriers 1 (claim 4), 2 (the claim 2 pin), and 3
(O1 prose).

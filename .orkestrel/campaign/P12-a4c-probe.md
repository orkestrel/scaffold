# Probe P12 — the A4c analyst's unexecuted vectors, run in real Chromium (Orchestrator, 2026-09-15)

**Instrument.** `mcp/tests/src/browser/probe-p12.test.ts`, run by explicit path in the `src:browser`
Vitest project (Playwright Chromium), then removed from the tree; retained beside this record as
`P12-a4c-probe.test.ts.txt`. Logs: `P12-a4c-probe.log.txt` (the first run; claim 2b masked by a
probe defect of the Orchestrator's — a `tools.has` call the installed manager does not declare) and
`P12-a4c-probe-2b.log.txt` (claim 2b alone after the line was removed).

**Readings.**

- Claim 1 (requests issued inside a `connect` listener after `page.stop()`): BROKEN. `call` and
  `tasks.task` passed the refusal and rejected only on the 1000 ms request timeout
  (`MCP request 'tools/call' timed out after 1000ms`, `MCP request 'tasks/get' timed out after
  1000ms`); the subscription's first `next()` was `still pending after 1500 ms`; `connect()` itself
  resolved. `#refuse` accepts `#connecting !== undefined`, and `connect` is emitted before the
  attempt clears that gate.
- Claim 2a (an `add` listener registered before `publish(first)` republishes `second`): BROKEN.
  Registrations after `first.add('subtract')` read `["lookup","subtract"]`: the bridge's own listener
  on the replaced manager still fired from the emitter's captured listener array and queued the
  addition after the second manager's publication. Expected `["lookup"]`.
- Claim 2b (a `clear` listener registered before `publish` adds `fresh` inside the clear): BROKEN.
  Registrations read `[]` while the manager holds `fresh` (the installed manager clears its map and
  then emits `clear` with the cleared tools, so the listener's addition stays in the manager). The
  bridge's `#cleared` released every registration bound to the manager, including the one the
  earlier listener's addition had queued before it. Expected `["fresh"]`.
- Claim 2c (a `remove` then an `add` of the same name in one turn): holds — `[["add","Adds again"]]`.
- Claim 2d (a `clear` during a suspended publish): holds — registrations `[]` after the release.

**Carried by.** `U4g-mcp-browser-fix-brief.md` carriers 1, 2, and 3; claim 9 (the queued-snapshot
mutation) is carried by U4g carrier 4 with the distinguishing vector the Orchestrator derived (a
tool WebMCP cannot carry added between a queued call and its execution: the snapshot resolves, a
run-time projection rejects).

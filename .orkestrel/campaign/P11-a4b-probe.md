# Probe P11 — the A4b analyst's unexecuted vectors, run in real Chromium (Orchestrator, 2026-09-15)

Reconstructed from the routing ledger row `P11-run` and the retained instrument
`P11-a4b-probe.test.ts.txt` (the record file was not written at the time; the ledger row and the
U4f brief carried the reading).

**Instrument.** `mcp/tests/src/browser/probe-p11.test.ts`, run by explicit path in the
`src:browser` Vitest project (Playwright Chromium), then removed from the tree; retained beside
this record as `P11-a4b-probe.test.ts.txt`.

**Readings.**

- Claim 1 (the disconnect refusal guards every session-bound request): BROKEN. `client.tasks.task`
  issued after `page.stop()` is `still pending after 1500 ms`; `client.call` after `stop` rejects at
  once (U4d's `#checkSession` holds for `call` and `tools` only).
- Claim 6 (destroy from a `change` listener during a replacement's unregistration): BROKEN. A
  listener that calls `destroy()` while the replacement's previous registration is being aborted
  leaves `echo` registered in the fixture registry after `destroy` returns.

**Carried by.** `U4f-mcp-browser-fix-brief.md` carriers 1 and 3; A4c claims 1 and 3 audit the
closure.

# Audit mcp-adopt reconciliation

Sol's verdict is `audit-mcp-adopt-verdict.md`: FAIL — 2 broken, 0 unresolved,
0 not-evidenced, 0 findings outside the claims. The deletions, the pump-join soundness,
the single-notice latch, and the suite's binding are CONFIRMED. The Orchestrator verified
each broken finding against source on 2026-08-21 before ruling.

- **Claim 4 (stale `close` after a mid-report restart) — accepted.** Verified verbatim in
  `src/server/transports/StdioClientTransport.ts:199-211` and `:107-126`: on a
  `drained: false` natural exit, `#report`'s synchronous `error` emission lets a listener
  call `start()`, which finds no `#closing` barrier on this path, does not short-circuit
  on the ended child, and installs a successor before `#onExit` emits `close`. The
  `#teardown` path is already safe because `#closing` holds the teardown promise across
  its report. Fix as Sol prescribed — hold `#closing` across `#report` in `#onExit`,
  release and clear before emitting `close` — carried by `unit-mcp-fix1-brief.md`, with
  the hazard row required failing-first and the natural-close-listener restart pinned as
  the control.
- **Claim 6 (the unqualified restart sentence) — accepted.** `src/server/types.ts:413`
  states the close-listener `start()` replacement without the natural-exit versus
  explicit-close split the guide draws. Carried by the same unit, scoped to that remark.
- Routing: native Opus implementer, because the hazard row spawns the orphan fixture,
  which the Sol bench sandbox cannot run. The re-check after the fix is Sol, read-only,
  scoped to the two findings.

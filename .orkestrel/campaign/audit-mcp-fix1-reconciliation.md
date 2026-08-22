# Audit mcp-fix1 reconciliation

Sol's verdict is `audit-mcp-fix1-verdict.md`: FAIL — 2 broken, 0 unresolved,
0 not-evidenced, 0 findings outside the claims. The Orchestrator reconciled 2026-08-21.

- **Claim 2 (the `start()` drain loop) — CONFIRMED**, including termination, the
  clear-guard semantics, and "lifetimes never overlap" across the constructible
  interleavings. The fix1 deviation (the loop shipped beyond the prescribed barrier) is
  thereby closed as correct.
- **Claim 4 (no regression) — CONFIRMED.** The adoption's deletions, held child, pump
  soundness, single notice, and suite rows all stand.
- **Claims 1 and 3 — one defect, accepted, carried by `unit-mcp-fix2-brief.md`.** During
  a natural `close` emit, an earlier listener's `close()` assigns the resolved no-op
  teardown into `#closing` because `#closed` is already true; a later listener's
  `start()` parks on that pointless barrier, the documented inside-the-emit restart
  fails silently, and later listeners read the ended child — contradicting the types
  remark and the guide. Fix as Sol prescribed: `close()` returns directly when `#closed`
  is true and no active barrier exists, keeping the documented behaviour universal
  rather than documenting an exception; the listener-order regression row is required
  failing-first.
- **Frame boundary, recorded.** The audit rounds on this transport keep finding
  `#closed`/`#closing` interleaving defects through new doors — the pattern the ROADMAP
  already records as evidence for the teardown-state-machine redesign. If the re-check
  after fix2 surfaces another interleaving of that class, the rounds stop and the
  scheduled redesign comes forward as the answer; fix2's deviation contract tells the
  unit to stop and report rather than patch any further one it exposes.

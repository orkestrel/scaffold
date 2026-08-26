# Unit PR0 report — process: grandchild survives the sync tree kill

Implementer (Opus 5) returned 2026-08-26. Acceptance met; diagnosis refuted the briefed
hypothesis.

- Measured: `taskkill /F /T` names and kills the detached grandchild at every age (probe rows
  quoted in the unit's return); the failure was the fixture's 250 ms marker timer racing
  `taskkill.exe` launch latency (343–835 ms against a nonexistent pid; 2.2–2.7 s launch-to-death
  under load). The test measured process-creation latency, not termination.
- Ruling: test expectation wrong for a documented Windows mechanism (`helpers.ts:630-659` already
  documents the no-signal tree route). Repair in the owned test file only: the asynchronous half
  reads descendant liveness within a budget instead of marker absence; instrument control (orphan
  fixture, root self-ends first) proves the readout reports survival when the kill cannot land.
- A source-mutation probe was run and reverted; its red under contention was discarded per
  `tests.md:41` (harness-invalid revert evidence), the control standing in its place;
  `src/server/helpers.ts` byte-identical to baseline.
- Red-then-green: 1 failed | 12 passed → 13 passed. Gates: format:check (147), lint:check, check
  green. Status: ` M tests/src/server/execution/executeSync.test.ts` only.
- Successor-row observations: stale bootstrap-latency comment at `executeSync.test.ts:23`
  (measured 75–163 ms vs claimed 45.7–49.9 ms); 6 s readiness budgets thin under contention
  (descendant creation spans 307–2455 ms here).

## Control adoption correction (audit F7)

The discriminating readout the report's control proved lives durably in the suite at
`process/tests/src/server/helpers.test.ts:616-623` (`isRunning` false for the terminated pid, true
for the abandoned orphan) — that suite case, not the swept `tmp/probe` instrument, is the standing
guard a later repair reads.

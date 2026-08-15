# U1 fix round 1 — successor to u1-brief.md

Amends, never restates: everything in `u1-brief.md` stands. One finding from the Orchestrator's
own gate run carries into this round. Executor: the same Sol thread that wrote U1, resumed.

## The finding (Orchestrator-verified, reproduced twice)

`tests/app/server/ApplicationServer.test.ts` roster-stream test fails deterministically outside
your sandbox (your loopback was denied; the Orchestrator's environment runs it):

```text
tests/app/server/ApplicationServer.test.ts:290
expected next event after stop to be { runs: [] }
received: { event: 'roster', data: { runs: [{ id: 'w-one', status: 'running', ... }] } }
Standalone app:server: 1 failed | 207 passed. Full suite: 1 failed | 594 passed. Same frame both times.
```

Diagnosis (verified against the test source, lines 195–297): after the test reads `w-one`'s
start event, `w-one`'s `pending→running` transition publishes a second frame that is **flushed to
the socket and never read**. The test then stops the run and asserts the very next read shows
removal — but the next read returns the buffered transition frame. Coalescing collapses only
unwritten payloads; flushed frames arrive in order. The one-read-per-action assumption contradicts
the complete-snapshot wire contract. The server behaviour is correct; the test's read discipline
is wrong.

## The fix, bounded

- Fix the **test**, not the wire: after the stop, read frames until the roster snapshot without
  `w-one` arrives, bounded (fail loudly after a small fixed number of reads, e.g. 5), asserting
  every drained frame is a valid `APP_ROSTER_EVENT` roster message.
- Over-correction bounds: do not weaken or remove the identical-filtered-suppression proof in
  `RosterBroker.test.ts`; do not add timers, sleeps, retries, or polling; do not change server
  code or the projection; do not relax the initial-roster or start-event assertions.
- If the same one-read assumption exists elsewhere in the roster tests you wrote, fix those sites
  the same way and name them in the report.

## Gates for this round

Converge nothing (no lint/format needed unless your edit requires it); the Orchestrator re-runs
`test:app:server` and the full suite as acceptance. Report: the exact edit as a diff, any sibling
sites fixed, one line on why the bounded drain cannot mask a real removal failure.

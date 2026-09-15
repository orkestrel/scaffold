<!-- P20 replay — Orchestrator probe on the host, 2026-09-15: the same instrument as P20-a4k-probe.test.ts.txt, run through the mcp `probe` project on the tree after U4e-e (copied to mcp/tmp/probe/ for the run and removed). Log P20-a4l-replay.log.txt. -->

# P20 replay — the consumer producer under a parked reader, after U4e-e

| Vector | Reading at the U4e baseline (`P20-a4k-probe.md`) | Reading after U4e-e |
| --- | --- | --- |
| Backpressure | `32 of 32 writes resolved with nothing read` | `1 of 32 writes resolved with nothing read` — the pull-driven consumer parks after the queue's high-water mark; the assertion `resolved < 32` passes |
| Failure ordering | the `-32603` terminal arrived first | the queued `notifications/prompts/list_changed` frame (stamped with the subscription id) arrives first; the assertion on `method` passes |

Command: `npm run test:probe` in the mcp checkout with the instrument at `tmp/probe/p20-a4k-probe.test.ts`
→ `Test Files 1 passed (1)`, `Tests 2 passed (2)`, exit 1: Vitest reported 31 unhandled rejections,
each `{ type: 'Unhandled Rejection', message: undefined }` — the 31 producer writes the parked
reader never consumed, rejected with an `undefined` reason when `fixture.close()` released the
subscription and the server returned the consumer's iterator. At the baseline no write was left
pending, so the run had none. The instrument does not catch its writes (a real producer's owner
would), so the count is the instrument's; the `undefined` reason is the server's — the release
cancels the consumer's source with no reason. Recorded for the A4l lanes as an observation: is a
release reason (the stream signal's) owed to a producer's pending writes? The file was removed
after the run.

## Ruling

Both objective vectors the A4k analyst named are closed on the host by U4e-e's carriers 1 and 2.
The reviewer and the checker rule on the rest of the round (A4l).

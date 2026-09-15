<!-- P20 — Orchestrator probe on the host, 2026-09-15: the A4k objective lane's two claim-2 vectors replayed through the mcp `probe` project at the U4e … U4e-d baseline (dirty on 7959f08). Instrument P20-a4k-probe.test.ts.txt (copied to mcp/tmp/probe/ for the run and removed); log P20-a4k-probe.log.txt. The same instrument replays after U4e-e for the green reading. -->

# P20 — the consumer producer under a parked reader, at the U4e baseline

Both vectors the A4k objective lane executed read-only are reproduced here on the host, at the
server-dispatch level through `createRegistrySubscription` with a consumer producer.

| Vector | Instrument | Reading at the baseline |
| --- | --- | --- |
| Backpressure | acknowledge, then write 32 `notifications/prompts/list_changed` frames into a transform-stream producer while nothing is read, wait 100 ms | `32 of 32 writes resolved with nothing read` — the pump drains the producer regardless of demand; the assertion `resolved < 32` fails |
| Failure ordering | a producer that yields one prompts frame and throws; acknowledge, wait 50 ms, read once | the first frame after the acknowledgement is `{"jsonrpc":"2.0","id":"registry","error":{"code":-32603,"message":"Server error"}}` — the terminal, not the queued frame; the assertion on `method` fails |

Command: `npm run test:probe` in the mcp checkout with the instrument at `tmp/probe/p20-a4k-probe.test.ts`
→ exit 1, `Tests 2 failed (2)`. The file was removed after the run; the tree's fourteen dirty
paths are unchanged.

## Ruling

The two red readings are U4e-e's carriers 1 and 2. After U4e-e the same instrument must read
fewer than 32 writes resolved (the writes beyond the demand pending) and the prompts frame before
the terminal.

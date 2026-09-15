<!-- P21 — Orchestrator probe on the host, 2026-09-15: the A4m objective lane's two claim-4 vectors replayed through the mcp `probe` project after U4e-g. Instrument P21-a4n-probe.test.ts.txt (its corrected form); logs P21-a4n-probe.log.txt (the corrected run) and P21-a4n-probe-first-run.log.txt (the first form, whose second case cleared the registry before the pull that surfaces the producer's throw and so read a legitimate tools frame — an instrument error, recorded). -->

# P21 — a producer that throws a literal `undefined`, after U4e-g

| Vector | Instrument | Reading after U4e-g |
| --- | --- | --- |
| Identity | the producer yields one prompts frame and `throw undefined`; acknowledge, wait, read twice | first the queued `notifications/prompts/list_changed` frame, then `{"error":{"code":-32603,"message":"Server error"}}` with `done: true` — the terminal survives the caught `undefined` |
| Closure | the same producer; acknowledge, read the frame (the pull that surfaces the throw and closes the stream), wait, `tools.clear()`, read | `clear` threw nothing (at the A4m baseline it threw `TypeError: Invalid state: Controller is already closed`); the next read is the `-32603` terminal, no tools frame |

Command: `npm run test:probe` in the mcp checkout with the instrument at `tmp/probe/p21-a4m-probe.test.ts`
→ exit 0, `Test Files 1 passed (1)`, `Tests 2 passed (2)`, no unhandled rejections. The file
was removed after the run; the tree's fifteen dirty paths are unchanged.

## Ruling

Both A4m claim-4 vectors are closed on the host by U4e-g's carriers 1 and 2. The first form of
the closure case is retained beside the corrected one so the correction is auditable: clearing
the registry before any read reaches an open stream, whose honoured filter carries the tools
family, and a tools frame there is correct behaviour.

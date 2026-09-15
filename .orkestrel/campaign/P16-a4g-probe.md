# Probe P16 — the two U4j writer-only controls, replayed by the Orchestrator (2026-09-15; A4g analyst 2 and 3)

Instrument: `P16-controls.sh.txt` with `P16-mutate-a.mjs.txt` and `P16-mutate-b.mjs.txt`, run from the mcp checkout on the host; `src/browser/ModelContext.ts` restored from a byte copy after each control (SHA-256 prefix `c373ff768f72fd2d` before and after both).

- Control A (the pre-U4j order: `#sync` prunes before it reconciles): `registers what a change added before it releases what the change removed` FAILS — `expected [ [], [ 'subtract' ] ] to deeply equal [ [ 'add', 'subtract' ], …(1) ]` (`1 failed | 55 skipped (56)`). The writer's red reading is reproduced (`P16a-order-control.log.txt`).
- Control B (`#prune` keeps a name the manager still holds): `releases a registered name the manager replaced with a tool WebMCP cannot carry` FAILS — `expected [ { …(2) } ] to deeply equal []` (`1 failed | 55 skipped (56)`). The writer's reading is reproduced (`P16b-keep-control.log.txt`).

Closes A4g analyst claims 2 (the red reading) and 3; the failure-path pin and the prose items go to U4k.

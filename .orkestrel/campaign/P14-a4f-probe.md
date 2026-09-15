# Probe P14 — the A4f analyst's V1 vectors and the two writer-only controls (Orchestrator, 2026-09-15)

**Instrument.** `mcp/tests/src/browser/probe-p14.test.ts` (authored in the session scratchpad,
copied in for the run, removed after; retained beside this record as `P14-a4f-probe.test.ts.txt`),
run by explicit path in the `src:browser` Vitest project (Playwright Chromium). Log
`P14-a4f-probe.log.txt`. The controls: `P14b-coalescing-control.log.txt` (the U4i boolean-coalescing
mutation, `if (this.#pending === tools) return` → `if (this.#pending !== undefined) return`, applied
to `src/browser/ModelContext.ts` and restored from a byte copy — SHA-256 prefix `71102e91b9026163`
before and after) and `P14c-teardown-control.log.txt` (the U4h synchronous-teardown mutation,
`const teardown = Promise.resolve().then(() => this.#closeConnection())` → `const teardown =
this.#closeConnection()` in `src/core/MCPClient.ts`, restored — `c9c29c08a364b645` before and after).

**Readings.**

- V1a (after a completed publish: `clear()` queues a sync, a same-manager `publish()` queues behind
  it with an empty snapshot, `add(fresh)` is coalesced into the earlier sync): BROKEN — registrations
  `[]` while the manager holds `fresh`; the publication's prune dropped what the sync registered.
- V1b (the same behind a suspended registration): BROKEN — `[]`.
- V1c (`add(fresh)` queues a sync, `publish()` snapshots `[add, fresh]`, `clear()` is coalesced into
  the earlier sync): BROKEN — `["add","fresh"]` registered while the manager is empty.
- V1d (a publish of ANOTHER manager between a coalesced event and its sync): holds — `["lookup"]`.
- Control 1 (A4f checker claim 2): under the boolean coalescing, `registers a change to a manager
  published while a synchronisation is queued` fails — `expected [ 'lookup' ] to deeply equal
  [ 'lookup', 'fresh' ]` (`1 failed | 50 skipped (51)`). The writer's reading is reproduced.
- Control 2 (A4e checker claim 3, A4f checker claim 8): under the synchronous teardown, `settles
  requests issued after disconnect inside a connect listener` fails — `expected 'MCP client is not
  connected, so …' to be 'MCP client disconnected'` (`1 failed | 152 skipped (153)`). The writer's
  reading is reproduced.

**Ruling carried to U4j.** Coalescing must respect publication order: a queued synchronisation
covers the events before the next queued publication for that manager and no event after it. The
mechanism: `publish` clears the pending mark for the manager it queues behind, so a later event
queues a fresh synchronisation after the publication (V1a–V1c); V1d stays as it is.

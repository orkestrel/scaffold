# Release wave plan — v2, 2026-08-21

Supersedes v1 after the Sol falsification round (`audit-plan-verdict.md`: claims 1, 3, 4
broken, corrections adopted) and the user's directive: every package's visit re-pins every
`@orkestrel` range — runtime, dev, and peer — to the latest version the registry serves at
that visit, so each package publishes against and with the latest. The user demonstrated the
procedure in contract (dev `scaffold ^0.0.46` re-pin plus `scaffold overwrite`), which also
invalidated contract's earlier verifier GREEN — its gates re-run after its visit completes.

## Corrections adopted from the falsification round

- Only contract must precede runtime dependents; test is dev-only and scaffold sits outside
  the runtime order (nothing runtime-depends on either; scaffold publishes on its own and
  propagates through dev re-pins and `repair`).
- The duplicate-copy condition is over the runtime CLOSURE's contract constraints: every
  contract constraint reachable through a package's runtime closure must admit the same
  contract release; contract-free branches (`sse`) are vacuously safe.
- The unpublished-runtime-re-pin ledger gains **agent** (`database ^0.0.10 → ^0.0.11`
  committed locally against the published `0.0.16`), beside queue's equivalent.

## The binding constraint

Runtime "latest" is bounded by coherence: every local package's runtime closure passes
through non-local packages (emitter above all), and until those republish against contract
`0.0.13`, a local package pinning contract `^0.0.13` while a closure member serves a
`^0.0.12` build installs duplicate contract copies. Latest-SERVED is therefore the visit
rule, and it is coherent by construction when visits run in layer order.

## Phase 1 — the local fleet, latest-served pins

Every visit: re-pin all `@orkestrel` ranges to latest-served; `scaffold overwrite` where the
target vendors the host; install; mutating `format` converge; full gates; material-dist and
final-runtime-set bump test; commit and push; publish where obliged. Serial per checkout;
independent branches in parallel slices.

- **Window 1 (user, now): test `0.0.8`.** Committed `23e7530`, pushed, verifier GREEN, pins
  already latest. No dependency on anything below.
- **Contract `0.0.13` visit tail (after test publishes):** dev `test ^0.0.8`, install,
  format converge, full gate re-run (post-overwrite), commit the overwrite and re-pin, push.
  **Window 2 (user): contract `0.0.13`.**
- **Scaffold `0.0.47`:** merge the 5 origin commits into the local tree first; visit with
  runtime pins latest-served (the `0.0.12` world — its closure blocks on non-local members),
  dev `test ^0.0.8`, tarball swept; publish early so every later visit runs the current
  vendored host. Its `0.0.13`-world runtime re-pin is a phase-2 release (`0.0.48`).
- **Then in local layer order**, each with the visit procedure: process `0.0.5` (prepared;
  runtime set unchanged, coherent) → mcp `0.0.21` (runtime `process ^0.0.5` re-pin) →
  qualifier `0.0.11` → program `0.0.10` (runtime `qualifier ^0.0.11`) → sea `0.0.10`
  (carries the `runSync` migration unit before its `process ^0.0.5` re-pin) → queue
  `0.0.10` (absorbs its `database ^0.0.11` re-pin) → workflow/worker (runtime
  `queue ^0.0.10` re-pins) → probe `0.0.2` (merge the 3 origin commits first; runtime
  `mcp ^0.0.21` re-pin; tarball swept, dev `test ^0.0.8`) → agent `0.0.17` (absorbs its
  `database ^0.0.11` re-pin) → toolbox `0.0.8` (runtime `agent ^0.0.17` and friends) →
  supervisor (user's ongoing work — coordinate, do not assume). brief, browser, middleware,
  router, worker-if-unobliged: visit, commit, publish only if the material-dist or
  final-runtime-set test obliges.

## Phase 2 — the contract `0.0.13` cascade

Full-fleet, catalog layer order L1 → L6, each visit re-pinning to the then-served latest
(which now admits `0.0.13` layer by layer). Requires the non-local checkouts: abort, budget,
csv, emitter, html, indexeddb, ndjson, sqlite, timeout, tool (L1); console, database, form,
markdown, pool, reason, table, template, websocket (L2); guide, interpret, rater, relation,
server, terminal, workspace (L3); ollama (L6). Regenerate the catalog before sequencing.
BLOCKED until the user names where those checkouts live or the wave clones them.

## Standing risks

- Each visit's `scaffold overwrite` (0.0.47 host) vendors the strengthened
  `no-nested-functions` plugin into the target; a target's own sweep may red where
  scaffold's did not. Budget fix rounds per target.
- Registry state is re-read at each window open (`npm whoami` re-probe plus a version
  sweep); the plan's recorded versions are evidence from 2026-08-21, not standing truth.

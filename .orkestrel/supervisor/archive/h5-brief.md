# H5 — the browser mechanics for history

## Role and engine

`implementer` route, engine **GPT-5.6 Sol**, sandbox `workspace-write`, fresh thread. Sole
serial writer in `/workspace/supervisor` from clean committed baseline **42652bf** (H4 closed:
the wire is settled). Perform directly, spawn nothing, no commits/pushes/installs.

## Authority

`/home/user/scaffold/tmp/redesign/history-analyst.md` §3-4 name the surface semantics your
mechanics must enable — H6 builds that surface; you build everything beneath it and NOTHING
rendered. The History and H4-CLOSED sections of
`/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md` bind (the honest watermark law; the
carriers: **the client reads cursor presence, never page fullness**; the wire vocabulary is the
catalog's own). `AGENTS.md`; applicable rules; `app/browser/types.ts` authoritative;
TTTDD binds. Follow the established browser patterns as precedent: the `client.roster`
sub-entity shape for the client, the `RosterManager` shape for the manager (facts in, reactive
readonly out, states derived never stored, commands as methods, no polling — a refresh is an
explicit human command).

## The unit

1. **The client's history sub-entity** (`app/browser/services/Client.ts` + `app/browser/types.ts`):
   a read of `GET /history` carrying `limit`/`cursor`/`prefix` exactly as the wire names them,
   returning the page shape; cursor round-trips opaquely (the browser never constructs or
   inspects one); wire faults surface through the client's established fault path.
2. **The history state manager** (new controller beside `RosterManager`, mirrored test): holds
   the loaded rows, the continuation cursor, and the active prefix as facts; exposes derived
   state for the five surface conditions (§3: ideal/empty/loading/partial/error) computed from
   facts alone; commands: load (first page; resets on prefix change per §4 — submitting or
   clearing the prefix resets the cursor), older (continuation — EXISTS only while a cursor is
   present), retry (per the partial/error split), clear (session end). Continuation reads
   cursor presence, never page fullness (a short page with a cursor continues; a full page
   without one ends). No polling; a roster transition never mutates loaded rows (the §3
   "History changed" affordance is H6's — you expose the FACT it needs: whether the roster has
   changed since the first page's load, derived, not stored where it can drift).
3. **The operator's seam**: expose the manager through the operator the way `roster` is exposed
   (reactive readonly), with lifecycle (login/logout/adoption) matching the roster's clearing
   semantics.
4. **`ApplicationTail.terminal` surfaced** (the recorded ledger carrier): the terminal-render
   fragment the types already carry reaches the browser's run-view state so H6 can render it;
   follow the existing tail/feed projection pattern; no rendering.

## Scope

**Owned:** `app/browser/types.ts` (extend), `app/browser/services/Client.ts`, the new manager
controller file + its mirrored test, `app/browser/controllers/Operator.ts` (the seam only),
the tail projection files the carrier touches, `tests/setupBrowser.ts` (fixtures for the new
seams, additive), `tests/app/browser/` mirrored tests, `tests/app/browser/integration/`
transport-class additions ONLY if a real-server proof of the client read belongs there (the
journey class is J1's layer — do not touch journey.test.ts).

**Off-limits:** every Vue component (`app/browser/**/*.vue` — H6's), `app/server/**`,
`app/core/**`, `src/**`, `guides/**` (report the parity delta), vendored files, `configs/**`,
`package.json`.

Forbidden: the standing list; no timers/polling; convergence on every async observation; real
implementations in tests (the scripted-client fixture pattern).

## Environment facts

Node/npm on PATH; your sandbox denies loopback listeners — the browser component/unit projects
are listener-DEPENDENT (Vitest browser mode serves over a local listener), so you may find
`npm run test:app:browser` blocked: write the mirrored tests, run every listener-free check you
can (`npm run check`, static gates, any node-side unit project), and enumerate exactly which
suites await the Orchestrator. `npm run build:app` may run (no listener).

## Acceptance criteria

1. Types first, then the client read proved against the wire shape (transport-class, real
   server if the harness permits, else enumerated for the Orchestrator).
2. The manager's five derived states, the cursor-presence law, the prefix-reset law, and the
   roster-change fact each have a mirrored proof.
3. The operator seam and lifecycle proved; the terminal fragment reaches the run-view state
   with a proof.
4. Static gates and every listener-free check green; the parity delta reported exactly;
   enumerate suites awaiting the Orchestrator.

## Deviation contract

Stop and report if the wire shape and the design disagree, or if the terminal carrier needs a
server change. Ancillary naming within the rules is yours, recorded (single-word members; the
manager's name follows `RosterManager`'s pattern).

## Output

Touched files + diffstat; the full `app/browser/types.ts` diff; per-criterion proofs with
commands and tails; the parity delta; suites awaiting the Orchestrator;
`git status --porcelain`; deviations or none. No diary.

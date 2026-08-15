# H-DESIGN — the completed-runs history capability

Both lanes receive exactly this brief, blind to each other. Each returns a ruled design.

## Why this exists

The owner, correcting both lanes' earlier deferral: operators run up to ~5 active workflows, "but
what you forgot is about all the workflows that complete over time and that collection that
grows." The objective lane's own closing question — must a human discover retained ended workflows
without knowing their ids? — is answered **yes**. Its stated consequence is the scope: "a durable
catalog with enumeration, authorization, retention, and search — not merely roster liveness."

## Fixed context — do not redesign these

The main redesign is settled and recorded in
`/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md`: a live Runs rail (complete-snapshot SSE,
rich entries) covers active runs and recent decay; "Open by id" survives as a collapsed disclosure;
the one-run operator model stands; no polling anywhere; enterprise-bootstrap skill law binds all
UI. Evidence: `/home/user/scaffold/tmp/redesign/absorb-report.md` (esp. §6: stores are point-access
`acquire/renew/get/set/release`, no catalog; `inspect` serves live or in-memory-retained ended
runs), `capture-report.md`, `research-report.md`.

`@orkestrel/supervisor` is **unpublished** (registry 404), so `src/` contract changes have zero
external blast radius — but they are still the package's published-shape surface: types first,
naming laws, guide parity, TTTDD.

## Rule on all of these

1. **The store contract.** What enumeration joins `SupervisorStoreInterface` (src/core/types.ts):
   member name(s) under the single-word law, paging shape (cursor? offset? the stores are SQLite
   and memory), ordering guarantee, what a listed record carries (id alone, or enough to render a
   history row without N gets), and what both existing stores must prove. Objective lane owns
   precision; subjective lane states what the surface needs a row to show.
2. **The endpoint.** Route, method, authorization against session grants, paging wire shape,
   whether it lives beside `/roster` or elsewhere, CSRF posture. Server-side: what
   `SupervisorApplication` composes to serve it, and how a long-completed run (from a *previous
   process*) opens — the `inspect` path today serves live + in-memory-retained; rule on the store
   fallback.
3. **The surface.** Where history lives in the redesigned shell (the rail's footer? a view in the
   content pane? — remember the pane is the open run's home), what a row shows, how it opens, the
   five states, both viewports and themes, and how the boundary between the live rail and history
   is communicated so the operator never wonders which list they are looking at. Newest-first
   assumed; argue if wrong.
4. **Search.** The owner said the collection grows. Rule on v1: none, client-side filter over the
   loaded page, or server-side prefix/substring — with the cost of each stated. Do not gold-plate:
   the smallest complete v1 that will not need a shim to grow.
5. **Retention.** Who owns deletion of old records — this design, or explicitly out of scope with
   the limit stated where a reader meets it? Rule, don't stall.
6. **Units.** Decomposition with owned files, serial order relative to the main campaign's U-queue,
   acceptance criteria, pixel proofs, routing (objective/subjective/mechanical).

## Output

A ruled design over all six; the strongest argument against your rulings on 1–4; what you refuse
to build; the single question that would most change the design. No code, no process diary.

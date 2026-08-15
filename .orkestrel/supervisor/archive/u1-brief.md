# U1 — roster liveness: server capability wired to the browser client

## Role and engine

`implementer` route, engine **GPT-5.6 Sol**, sandbox `workspace-write`. Sole serial writer in
`/workspace/supervisor`, clean baseline `3390fa0` on branch `claude/orkestrel-test-package-0m1m8u`.
Perform this directly and spawn nothing. Do not commit, push, or npm install.

## Authority for this unit

Your own lane's design is the primary spec: `/home/user/scaffold/tmp/codex/design-last.md`,
sections 2 (the roster-liveness capability) and its unit 1/2 rows. The Orchestrator's reconciliation
overrides it in exactly one place, recorded in
`/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md`:

**The roster entry is not a bare id string.** The subjective lane showed a bare-id roster forces
the browser into N inspect fetches to paint rows, which your own no-second-fetch discipline
forbids. The stream (and `GET /roster`) carries rich entries. Types-first target shape, names
final subject to the naming rules you verify them against:

```
ApplicationRun: { id, status, paused, started, updated, waiting? }
ApplicationRoster: { runs: readonly ApplicationRun[], executors: readonly Executor[] }
```

`status`/`paused` mirror `ApplicationSnapshot` fields rather than pre-collapsing, so the browser
keeps its one collapse rule. This widens `ApplicationRoster` — every consumer moves in this unit,
no shims. Complete-snapshot-per-event semantics, single shared projection, coalescing, drain
discipline, handshake-only auth, and everything else in your design stand unchanged.

## First step — price `waiting` before fixing the shape

`waiting` is the count of unanswered human requests. Admit it into the entry **only if** it reads
cheaply from in-memory state (`SupervisorApplication`'s live maps / the application snapshot). If
it requires journal reads or store reads per publish, **drop the field**, note the measured cost in
your report, and proceed without it. Measure first, in a probe under `tmp/probe/`, and report what
you measured either way.

## Scope

**Owned:** `app/core/types.ts`, `app/core/constants.ts`, `app/server/types.ts` (if present),
`app/server/LiveBroker.ts`, new `app/server/RosterBroker.ts`, new `app/server/RosterViewer.ts`,
`app/server/SupervisorApplication.ts`, `app/server/ApplicationRuntime.ts`,
`app/server/ApplicationHandlers.ts`, `app/server/ApplicationRoutes.ts`, server factories/barrels,
`app/browser/services/Client.ts`, `app/browser/services/LiveStream.ts` (generalize, do not
duplicate the parser), `app/browser/components/CommandBar.vue` (consumer move only), and the
mirrored tests for every file above.

**Off-limits:** `src/**`, `guides/**`, `README.md`, `LoginPanel.vue`, `ApplicationView.vue`,
`OpenPanel.vue`, `Operator.ts` (U2 owns it — if your Client surface change forces a mechanical
touch there, make the smallest one and flag it in the report), the three vendored files
(`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), `package.json`,
`configs/**`.

Forbidden: `any`, `as`, `!`, `@ts-` comments, `eslint-disable`, mocks/fakes/spies/fake clocks, new
dependencies, polling or timed loops anywhere.

## Acceptance criteria

1. `GET /roster/live` streams SSE to a cookie session with no workflow id; first event is the
   complete filtered roster; a run started through the bearer route emits a snapshot containing
   it; its completion emits a snapshot without it (decay is the browser's job, not the wire's).
2. `LiveFrame` is byte-unchanged. The roster channel is its own broker/viewer pair composed into
   `LiveBroker`, one class per file.
3. Grant filtering: a session granted `['*']` sees all; a named-grant session sees only its runs —
   both proved by real-server tests.
4. Slow consumer: a viewer holding a pending payload replaces it with the newer one; identical
   filtered rosters emit nothing — proved by test.
5. `Client.roster` is a sub-entity `{ read(), watch(signal) }`; `Client.roster()` the method is
   gone; `CommandBar` consumes the new surface; compiler-backed proof that no `.roster()` call
   sites remain.
6. `GET /roster` and the stream share one projection function — proved by a test that would fail
   if membership diverged.
7. Gates: converge `npm run lint` then `npm run format`; then `format:check`, `lint:check`,
   `check`, `build`, and the relevant test projects exit 0. `npm test` full run green except any
   guide-parity failure your new exports cause — guides are U7's; report the exact expected
   failure if one appears.

## Deviation contract

Stop and report if the entry widening collides with something your design's file:line citations
did not reveal, or if `waiting` cannot be priced without touching `src/**`. Ancillary choices —
file-internal order, test names, exact constant names — are yours under the naming rules.

## Output

Touched files + diffstat; full `git diff` stat-level plus the complete diff of `app/core/types.ts`;
`git status --porcelain`; the `waiting` pricing measurement and your ruling; gate commands with
real output; per-criterion one-line proof pointers; deviations or none. No process diary.

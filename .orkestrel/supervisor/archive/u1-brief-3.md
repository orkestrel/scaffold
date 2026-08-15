# U1 fix round 2 — successor to u1-brief.md and u1-brief-2.md

Same Sol thread, same scope laws, same off-limits as `u1-brief.md` (plus the nine fallout files
the audit ruled in scope — the accounting is corrected, the mandate unchanged). Perform directly,
spawn nothing, no commits/pushes/installs. This round carries the reconciled findings of audit
round 1 (three lanes, both engine lanes FAIL). Every item below is Orchestrator-reproduced or
Orchestrator-ruled; none is optional. Where an item names a decision, the decision is made — do
not relitigate it.

## Items

1. **Lifecycle publish (blocking).** A run's own `pending→running` (and every lifecycle move)
   never reaches the wire: `#publish()` has exactly four call sites (SupervisorApplication.ts
   48/104/224/257), none subscribed to the workflow's own events. Attach `#publish` to the created
   workflow's `emitter` (`WorkflowEventMap`: start/complete/fail/pause/resume/skip/stop) in
   `start()` beside `#workflows.set`, detach in `#release`, mirroring the on/off discipline
   `LiveBroker.observe`/`destroy` uses. Proof: real-server test — start exactly ONE parked run,
   read initial `[]`, then its `pending` frame, then require its `running` frame with no other
   action taken. Viewer suppression keeps redundant publishes free; no polling.
2. **One grant predicate.** Membership filtering is written twice (`grants.includes(workflow)` in
   SupervisorApplication.ts:317; `this.#grants.includes(run.id)` in RosterViewer.ts:73). Extract
   one exported pure leaf (its correct centralized home per the rules — a helpers file the server
   host reaches) and route both sites through it. Extend the divergence proof in
   `SupervisorApplication.test.ts` with a named-grant membership case so a filtering divergence
   fails the test, not only a projection one.
3. **Viewer read semantics.** `#read()` unconditionally overwrites `#waiting`: a second concurrent
   `next()` orphans the first promise forever. Rule and implement: either queue waiters or refuse
   concurrent reads explicitly — no orphaned pending promise either way. Tests: (a) two concurrent
   reads both settle after `destroy()`; (b) destroy a REAL server while its roster consumer is
   parked mid-await — response body reader reaches done, `broker.roster.count === 0`, no abort
   listener survives. Keep (b) as the permanent regression guard.
4. **Names and TSDoc.**
   - `RosterFrameHandler` → `RosterSnapshotHandler` (the channel carries snapshots, not frames —
     its own TSDoc says so); update its uses.
   - Extract `ApplicationRosterHandlers` with `read()` and `live()` exposed as `handlers.roster`,
     mirroring `handlers.units` and the client's `roster.{read,watch}` sub-entity. `subscribe`
     dies (it was a synonym forced by a name collision).
   - `ApplicationRun.status` names the ecosystem type (`WorkflowStatus`), not an indexed access.
   - Rename the entry timestamp `started` → `created` (Orchestrator ruling, recorded in
     REDESIGN.md: it is populated from `snapshot.created` and must say so). Move every consumer.
   - Complete TSDoc (`@param`/`@returns` where applicable) on `ClientRosterReadHandler`,
     `LiveStreamEventHandler`, and the broker method docs in `app/server/types.ts`.
   - Fix the import order in `ApplicationRoutes.ts:7-8`.
5. **Delete `RosterViewer.close()`.** It has no production caller (only its own test) and costs a
   `#closing` branch across four methods. Remove it from `RosterViewerInterface` and the class,
   and delete/adjust its tests. If you find a real production consumer the audit missed, stop and
   report instead.
6. **Collapse the `ClientRoster.read()` forwarding chain.** Three hops, two pure delegates.
   Pass the generic request seam (as `ClientUnitManager` receives `ClientCommandHandler`); let
   `read()` own `APP_ROSTER_PATH` + `isApplicationRoster`; `Client.#read` disappears.
7. **`#pump` stops sniffing.** `'source' in frame` discriminates channels structurally. The caller
   knows which channel it opened: pass the event name or resolver as a parameter. Move
   `resolveLiveFrameEvent` to the shared core helpers so one implementation serves both hosts;
   update barrels and consumers.
8. **Unauthenticated stream refusal proof.** One real-server assertion: `GET /roster/live` with no
   cookie → the uniform refusal (same status/body family as every other route).
9. **Comment the drain test's silent-server path** (one line): a server that stops removing
   produces no further frames, so the failure arrives as a read timeout, not the explicit throw.

## Gates

Converge `npm run lint` then `npm run format`; then `format:check`, `lint:check`, `check`,
`build`, and the test projects your sandbox can run (loopback is denied for you — the Orchestrator
runs `test:app:server`, `test:app:browser`, and the full chain as acceptance). Expected red:
guide parity only (U7's carrier — the set may shift with items 4/7; list the exact new set).

## Output

Touched files + diffstat; full diff of `app/core/types.ts` and `app/server/types.ts`; `git status
--porcelain`; per-item one-line proof pointers; the ruling you took on item 3 (queue vs refuse)
with one sentence of reasoning; deviations or none. No process diary.

# U1 fix round 4 — successor to u1-brief-4.md, carrying audit round 2

Round 2 (two Opus lanes, blind) confirmed claims 2-6 mechanically and claim 7 on the
Orchestrator's full-chain run. Four reconciled carriers remain. Same thread, same scope laws.
Every decision below is made.

## Items

1. **Two-sided emitter instrument + pause wire proof.** The leak assertion
   (`SupervisorApplication.test.ts:91-97`) asserts `count === 0` after release — satisfied
   equally by "detached" and "never attached", so five of seven subscriptions are unproven and
   deleting `on('pause')` leaves the suite green. Fix: assert `emitter.count(event) === 1` for
   all seven events immediately after `application.start(...)` resolves (before any stop); then
   drive `application.pause(principal, ...)` and `resume` with a roster viewer attached and
   assert the next snapshots carry `paused: true` then `paused: false`. Production wiring is
   correct — tests only.
2. **Name the pumpable contract once.** `#pump` takes an anonymous structural
   `{ events; destroy() }` — the concept now exists three times. Add `ViewerInterface<T>`
   (`readonly events: AsyncIterable<T>`, `destroy(): void`) to `app/core/types.ts`;
   `LiveViewerInterface extends ViewerInterface<LiveFrame>` (keeping its `close()`),
   `RosterViewerInterface extends ViewerInterface<ApplicationRoster>`; type `#pump`'s parameter
   as `ViewerInterface<T>`; reshape `ApplicationRosterPumpHandler` to the smallest true form
   against it. TSDoc on the new interface.
3. **One misuse, one answer, stated.** `RosterViewer` refuses a concurrent `next()`;
   `LiveViewer.#read` silently overwrites `#waiting`, orphaning the first promise — two opposite
   answers to one misuse on one contract shape. Orchestrator ruling: **unify on refusal** —
   `LiveViewer` rejects a second concurrent read with the same typed error, and the obligation is
   documented once on `ViewerInterface.events` TSDoc ("one consumer at a time; a second
   concurrent next() rejects"). Test: LiveViewer's two concurrent reads — first settles with the
   frame/done, second rejects typed; both settle on destroy. The production pumps are serial, so
   no behavioral path changes.
4. **Rename the client seam for what it is.** `ClientRosterReadHandler` is the client's generic
   request boundary named for its one consumer, with a `method` parameter its own TSDoc calls
   fixed. Rename to `ClientRequestHandler` in `app/browser/types.ts`, widen `method` to exactly
   the methods `Client.#request` accepts, let the roster pass `'GET'` at its call site, and
   rewrite the TSDoc truthfully. Update consumers.

## Gates

Static gates in your sandbox (`format:check`, `lint:check`, `check`, `build`); Orchestrator runs
the listener-dependent suites as acceptance. The parity red set shifts with items 2-4: report the
exact new export list.

## Output

Diffs of `app/core/types.ts`, `app/server/LiveViewer.ts`, `app/browser/types.ts`; `git status
--porcelain`; per-item one-line proof pointers; the exact new parity set; deviations or none.

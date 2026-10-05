# What belongs native where — synthesis (2026-10-05)

The user asked three questions: what is unpublished, what from the browse work belongs native to `@orkestrel/pool` and then to `@orkestrel/worker`, and what to examine in queue and the other packages.

The workflow `orkestrel-native-lifecycle` (8 Opus 5.5 agents) produced the records beside this file:
- five maps: `map-browse.md`, `map-pool.md`, `map-worker.md`, `map-queue.md`, and `map-kin.md`;
- two blind proposals: `propose-consumer.md` and `propose-reliability.md`;
- an adversarial review: `attack.md`.

The Orchestrator verified the facts the conclusions rest on.

## Verified facts

- **Probe:** `@orkestrel/probe` does not depend on `@orkestrel/pool` (probe `package.json` dependencies). The pool ROADMAP item 1 sentence saying that probe runs stages at `min: 1` is false. Probe's own ROADMAP item 1, its eager start, would make probe pool's second consumer and drop its `@orkestrel/queue` dependency.
- **Worker:** `WorkerOptions.pool` is `PoolOptions<TResource>` (worker `src/core/types.ts:77`). A re-pin to pool 0.0.16 therefore exposes `capacity` through worker with no consumer, which would hand one resource to several concurrent jobs.
- **Strike paths at the default topology:** at size 1, the shared holder always leases the only browser. Browse's retirement releases before declaring loss only when no other lease or build sits on the slot (browser `src/server/BrowserMCPServer.ts:864-870`). A named holder's unconfirmed disposal or failed context creation is therefore a leased loss: a refill credit and no strike. Rulings 4 and 8 of `holders/contexts-synthesis.md` do not bound a browser that always fails either step. That browser falls under the call-paced relaunch loop, the recorded Q3 limit.
- **Breaking rename:** pool 0.0.16 renames the public export `isPoolMax` to `isPoolLimit`. No fleet source imports it. The scaffold mirror `guides/pool.md` still names `isPoolMax` until the scaffold release refreshes it.

## Conclusions

- **Native to pool in this round:** nothing beyond what 0.0.16 carries (`capacity`, the idle-loss strike, the rename).
  - Browse emulates five operations through pool's API: an immediate refusal at admission, prepared sub-resources, exact-lease guards and rebinding, retirement with a strike, and a per-lease loss signal.
  - Each is either browse's own policy or has no second consumer.
  - The one with a real effect, a pool verb that faults a record and charges a strike, bounds nothing alone. The next qualifying grant resets the strikes. It matters only if the user reopens Q3(b) and moves the reset off the bare grant in the same change.
- **Worker next:** re-pin directly to pool `^0.0.16`, and narrow `WorkerOptions.pool` to exclude `capacity` (the minimal public API law). Add a case pinning the idle-loss strike under `min` and `restarts`. `min`, `restarts`, and a death-latch `watch` for `createNodeWorker` wait for that function's first consumer.
- **Probe next:** build probe ROADMAP item 1 (eager stages) on the pool 0.0.16 API. Refresh that item's stale facts first (pool 0.0.14, browser 0.0.23, a contract re-pin already done).
- **Queue:** nothing in this round.
  - Queue keeps no outcome after an entry settles, has no retry delay, and cannot refuse a conflicting input after settlement (`map-queue.md`). These are the reliability assessment's operation concerns.
  - None has a consumer. Probe item 1 removes queue from probe.
- **Workflow:** store fencing, so that two processes recovering one snapshot cannot both dispatch, waits until supervisor returns to the release waves.
- **Never, unless the user asks:**
  - a holder or session layer, prepared sub-resources, or retained lease cleanup in pool or worker;
  - validation on every hand-out;
  - a non-waiting acquire;
  - public strike counts;
  - queue de-duplication after settlement, or a cap on pending entries;
  - launching Chromium through `@orkestrel/process`.

## Corrections applied

- `holders/contexts-synthesis.md` rulings 4 and 8: the strike holds only with no co-holder on the slot. At size 1 the shared holder is always a co-holder, so both failures fall under the Q3 limit.
- The C3 brief's limit line names failed disposal and failed context creation under the call-paced loop.
- Pool `ROADMAP.md` item 1: the false probe sentence is removed.

## Open for the user

- Pool ROADMAP item 1 (a waiter waits while a release could return capacity above floor 1). Recommendation: leave it unbuilt, because size 1 never reaches it.
- Q3(b): bound the call-paced relaunch loop in pool 0.0.16, with a fault verb that charges a strike plus the reset moved to a proven-healthy event, or keep Q3(a), the recorded limit. Recommendation: keep Q3(a). Contexts already removed the renderer-crash path.

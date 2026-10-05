# map:pool

Pool (`C:\Users\mikes\WebstormProjects\pool`, main `1f194d7`, 0.0.16 unreleased on top of the 0.0.15 release at `4c589c6`)

**What the code does**

Public API
- The exports are `createPool`, `Pool`, `PoolError`, `isPoolError`, `isPoolLimit` and `isPoolSignal`, plus the types `PoolCode`, `PoolContext`, `PoolErrorOptions`, `PoolEventMap`, `PoolToken`, `PoolOptions` and `PoolInterface` (guides/pool.md:42-75).
- The options are `on`, `error`, `create`, `destroy`, `validate`, `watch`, `capacity`, `max`, `min` and `restarts` (src/core/types.ts:98-109).
- The interface has `emitter`, `size`, `idle` and `active`, plus `start`, `acquire(signal?)`, `clear` and `destroy` (types.ts:115-169).
- A token has `value`, `release()` (returns void) and `destroy()` (returns a Promise) (types.ts:50-66).

Bounds
- `capacity`, `min` and `max` must be positive safe integers, and `min` must equal `max` (Pool.ts:90-98). `max` defaults to `min` (Pool.ts:117) and `capacity` defaults to 1 (Pool.ts:118).
- `restarts` is required when `min` is set and refused without it (Pool.ts:99-108).
- Leaving out both `min` and `max` gives an unbounded record count (types.ts:84).
- A create can start only while records plus reservations are below `max` (Pool.ts:390).

Warm floor
- `start()` fills the floor and resets strikes only when the floor is spent (Pool.ts:157-167, 164).
- Under `min`, an `acquire` never creates; it waits for a refill or is refused (Pool.ts:359-388).
- Refills run one at a time (Pool.ts:436-454).

Restarts and strikes
- A strike comes from a failed refill (Pool.ts:473) or from losing a record that has no live lease (Pool.ts:523-527).
- Losing a leased record adds no strike. Instead it owes one refill (Pool.ts:512, 809), and that refill runs even when the bound is spent (Pool.ts:444-445).
- A grant resets strikes only when its record was created after the last strike (Pool.ts:713, 533).
- The floor is spent when strikes exceed `restarts` (Pool.ts:432-434).

Watch
- `watch` is called once per record with an AbortSignal (Pool.ts:484-498). Any settlement means loss.
- A rejection reaches `error` with event `watch` while the record is live (Pool.ts:493-497).
- Disposal aborts the signal (Pool.ts:780).

Validate
- `validate` runs only when an idle record is handed out (Pool.ts:355, 547). Throwing or returning anything but `true` counts as invalid (Pool.ts:612-613).
- An invalid record gets a strike and is disposed (Pool.ts:632-651).

Selection and FIFO
- The available list is tried first in release order; otherwise the least-occupied record is picked (Pool.ts:412-430).
- Results settle through a commit barrier at the head of the queue, in request order (Pool.ts:684-717).

Cancellation
- The signal is checked synchronously and an invalid one throws (Pool.ts:186-188).
- An abort rejects with the caller's exact `reason` and gives back any handout already prepared for that caller (Pool.ts:315-329).

Tokens
- `release()` ends only its own lease and is idempotent (Pool.ts:297-303, 743-748).
- `destroy()` disposes the whole record for every co-holder (Pool.ts:305-313, 779).
- Once a lease has settled, both methods do nothing (Pool.ts:299, 307).

Retained cleanup
- Under `min`, a failed destroy hook keeps the record as a survivor. It still counts against `max` and is never retried (Pool.ts:804-806).
- An `acquire` is refused with `cleanup` when the floor holds a retained record, owns `min` records, has nothing eligible and has no refill or disposal pending (Pool.ts:360-374).

Events
- The events are `create`, `acquire`, `release` and `destroy`, and none carries a payload (types.ts:35-44).
- `destroy` is emitted one microtask after cleanup (Pool.ts:815-816).

**Recorded limits**
- **Call-paced relaunch loop.** A leased loss never strikes and owes a refill, and the refilled record's grant resets strikes. So a resource that dies on every use relaunches once per call without bound (scaffold contexts-synthesis.md:30, 44; the user ruled it a recorded limit at :9).
- **Occupied records are never revalidated when capacity is above 1.** Without `watch`, a dead record keeps receiving leases until it goes idle (types.ts:76-78; guides/pool.md:235-237; review-p1.md:8).
- **ROADMAP item 1.** The spent-floor and retained-cleanup refusals reject a waiter even when a live lease could free a place. This is to be built with the browse contexts consumer at `BROWSE_POOL` above 1 (ROADMAP.md:3; Pool.ts:360-387).

**Gaps consumers must work around (from browser's `BrowserMCPServer.ts`)**
1. **Retiring a record with a strike while co-holders hold leases.** The pool has no retire call, and a loss counts as a strike only when no lease is live (Pool.ts:524). Browser releases the token only when no co-holder or construction remains, then resolves its own watch promise to trigger loss (BrowserMCPServer.ts:863-871, 923-930, 758-769).
2. **Validating on every hand-out.** Shared hand-outs skip `validate`, so browser pings in `#hold` and `#serve` (BrowserMCPServer.ts:657, 708-716) on top of the idle-only `validate` (748-756).
3. **Per-lease loss notice.** There is no lease signal or loss callback, and the events carry no payload. Browser keeps its own `#losses`, `#departures` and `#notices` and detaches every lease itself (BrowserMCPServer.ts:758-780).
4. **Per-record state.** `#prepared`, `#building` and `#owned` are side maps keyed by `token.value` (BrowserMCPServer.ts:666-667, 896-946), because the pool exposes no record identity or occupancy.
5. **Refusing instead of waiting.** There is no try-acquire. Browser waits through the holder's abort signal and races the call's signal (BrowserMCPServer.ts:610-641).
6. **Telling "spent" apart from "retained".** The consumer branches on `PoolError.code` and reads `cause` (BrowserMCPServer.ts:725-730, 1114-1119).
7. **No public counts for strikes or the spent state.** `#strikes` and `#spent` are private (Pool.ts:71, 432).

**Dependents** (only two `package.json` files declare `@orkestrel/pool`)
- **browser** pins `^0.0.15` (browser/package.json:110). It calls `createPool` with `create`, `destroy`, `validate`, `watch`, `error`, `min: size`, `capacity: contexts` and `restarts: BROWSER_SERVER_RESTARTS` (BrowserMCPServer.ts:200-209), with `BROWSER_SERVER_RESTARTS = 1` (constants.ts:242). It holds one lease per holder, acquired on the holder's abort signal (BrowserMCPServer.ts:629). `capacity` exists only in 0.0.16 (`3ff0c63`), so this code needs the unreleased version.
- **worker** pins `^0.0.14` (worker/package.json:89), which is behind 0.0.15. `new Pool` takes `max` (defaulting to concurrency), `min`, `restarts`, `watch`, `on`, `error`, `destroy` and `validate` (Worker.ts:85-106). Each job acquires on the attempt signal and releases in `finally` (Worker.ts:172-179). The `pool` option is typed as the full `PoolOptions<TResource>` (worker/src/core/types.ts:77).
- **probe** declares no dependency on pool and nothing in `probe/src` names `Pool`. Its only mentions are in a catalog file (probe/.claude/agents/orkestrel.md:51, 71, 95). This contradicts ROADMAP.md:3, which says probe runs each stage at `min: 1`; nothing in probe/src shows that.

**Opinion**
- The worker drops `capacity` without saying so: the field is typed as accepted (types.ts:77) but never forwarded (Worker.ts:85-106). Once worker re-pins to 0.0.16, forward it or narrow the type.
- The worker will also pick up the 0.0.16 change that adds a strike when a previously used idle record is lost (contexts-synthesis.md:56). Its re-pin needs a deliberate check.
- Gaps 1 and 3 are the strongest candidates to make native in pool. One would be a token-level retire that strikes even with co-holders, which also bounds the call-paced loop. The other would be a per-lease loss signal on `PoolToken`. Gap 2 could be an option to validate on every hand-out.
- Worker would gain from per-lease loss: today a thread that dies mid-job is only found at the next idle `validate`.
- `capabilities.md` describes pool 0.0.13 (its line 9, and the 0.0.13 surface at :229-230) and is stale for any further decisions.

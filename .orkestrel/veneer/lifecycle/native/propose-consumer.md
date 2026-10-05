# propose:consumer

```json
{
  "summary": "I checked the key facts in the maps against the code. The maps have two errors. First, the probe does not use pool: probe/src has no @orkestrel/pool import, and pool's ROADMAP.md:3 presents a plan as if probe already runs each stage at `min: 1`. Second, worker does not forward `capacity`: the destructuring at Worker.ts:85-95 leaves it out, while worker/src/core/types.ts:77 types `pool` as the full `PoolOptions`.\n\n**Publishing: yes, one item is missing.** The released pool 0.0.15 (commit 4c589c6, src/core/types.ts) has no `capacity` option. Browser HEAD passes `capacity: contexts` (BrowserMCPServer.ts:207) but pins `^0.0.15` (package.json:110), and it builds only against a local pool build. So pool 0.0.16 must publish first. Browser must then re-pin to `^0.0.16` before 0.0.25 publishes. Worker owes a re-pin in the next wave. Supervisor stays out of the waves.\n\n**Pool and worker: nothing from the browse work must become native right now.** Every candidate has browse as its only consumer, or it cuts against a ruling the user made on 2026-10-05:\n- **Retiring a record with a strike.** The release-then-lose sequence at BrowserMCPServer.ts:863-871 and :923-931 would become a `retire()` method on the pool token. The user ruled the call-paced relaunch loop a recorded limit (contexts-synthesis.md:9, status.md:43), and this method would undo that ruling.\n- **Loss notices, prepared contexts, holder rebinding, and retained cleanup.** These rest on browse's holder model, and nothing else uses them yet.\n\nBefore 0.0.16 publishes, pool needs only two corrections to its ROADMAP.md: fix the probe claim, and rule on item 1 as status.md:46 asks. Item 1 does not block the release, because the default `BROWSE_POOL` of 1 never reaches it.\n\n**Worker.** Re-pin to pool 0.0.16 and keep `capacity` out of the `pool` option type. Abort ends a job by terminating the whole thread (Dispatch.ts:162-169), so a thread shared by several leases would lose every co-holder's job. Add a test that pins the idle-loss strike. The browse pattern of a warm floor plus loss detection by `watch` fits `createNodeWorker`, but no package depends on worker, so leave it until one does.\n\n**Queue.** Queue has nothing to gain from pool, and none of its gaps has a consumer. Those gaps are backoff, a cap on pending entries, and a record of completed ids. The real next pool consumer is probe's ROADMAP item 1, which plans to build on pool's existing API. Its brief names pool 0.0.14 and must name 0.0.16.\n\nI ran no tests. Every claim comes from reading code, git history, and the scaffold records.",
  "items": [
    {
      "id": "publish-pool-0.0.16",
      "target": "pool",
      "change": "Publish pool 0.0.16 with commits 3ff0c63 and 1f194d7: the per-record `capacity` option and the idle-loss strike. The public API gains nothing beyond `capacity`, which is already built.",
      "source": "pool/package.json:3 still says 0.0.15. The 0.0.15 release (git show 4c589c6:src/core/types.ts) has no `capacity` option. pool/src/core/types.ts:105 adds it, after 4c589c6.",
      "consumer": "Browser 0.0.25. BrowserMCPServer.ts:207 passes `capacity: contexts`, and a registry install of the pinned range would fail the typecheck. Publishing closes the gap between browser's manifest and its code.",
      "priority": "now",
      "risk": "Low for the API. The idle-loss strike changes runtime strike accounting for anyone using `min` plus `restarts`. Browser is the only current dependent that sets them. The release must precede browser 0.0.25, which is held for the startup flake (ROADMAP item 15, status.md:58)."
    },
    {
      "id": "browser-repin-pool",
      "target": "browser",
      "change": "Re-pin `@orkestrel/pool` to `^0.0.16` and replace the locally built node_modules copy with the registry tarball in the same commit as the 0.0.25 bump. No API change.",
      "source": "browser/package.json:110 pins `^0.0.15`. The installed copy is a local build that carries `capacity`. git status shows package.json and package-lock.json modified and uncommitted.",
      "consumer": "Browser 0.0.25 itself. Re-pinning stops the release from shipping code that its declared range cannot satisfy.",
      "priority": "now",
      "risk": "The lockfile must resolve from the registry after pool 0.0.16 publishes. A prefer-offline install can read a stale packument (memory: Windows npm environment)."
    },
    {
      "id": "pool-roadmap-correction",
      "target": "pool",
      "change": "Correct ROADMAP.md item 1. It must say that probe plans per-stage pools at `min: 1` (probe ROADMAP item 1); probe does not run them. Also record the ruling that status.md:46 asks for before the release: at the default `BROWSE_POOL` of 1 the item has no consumer, so it stays unbuilt and does not block 0.0.16.",
      "source": "pool/ROADMAP.md:3 states that @orkestrel/probe runs each stage at `min: 1`. probe/src declares no pool dependency and imports none. probe/ROADMAP.md:5 describes it only as a plan. status.md:46 says to rule on the item before the release.",
      "consumer": "The pool 0.0.16 release, which this fixes: the planning record it ships with currently states something false.",
      "priority": "now",
      "risk": "None. This is a documentation fix."
    },
    {
      "id": "worker-repin-narrow-capacity",
      "target": "worker",
      "change": "Re-pin `@orkestrel/pool` from `^0.0.14` to `^0.0.16`. Narrow `WorkerOptions.pool` to `Omit<PoolOptions<TResource>, 'capacity'>`, so the type no longer promises an option that the `Worker` constructor drops. Add a test that pins the idle-loss strike under `min` plus `restarts`. Update the scaffold copy of guides/worker.md, which lists pool members that are out of date.",
      "source": "worker/package.json:89 pins `^0.0.14`. worker/src/core/types.ts:77 types `pool` as the full `PoolOptions`. The destructuring at Worker.ts:85-95 and the forwarding at :96-106 leave out `capacity`. On abort, Dispatch.ts:162-169 evicts the thread and terminates it.",
      "consumer": "Worker's own contract. After the re-pin, `capacity` would type-check and then do nothing at runtime; narrowing closes that defect. No other package depends on worker, so the fleet wave drives this re-pin (status.md:62, 70).",
      "priority": "next",
      "risk": "The runtime range changes, and so does strike accounting for core `Worker` callers that set `min` and `restarts`. Narrowing removes an input that today is silently ignored. That is a type break but no behavior change. If a non-thread consumer later wants shared resources, it must first get a ruling on what abort does to co-holders."
    },
    {
      "id": "probe-pool-stages",
      "target": "probe",
      "change": "Build probe ROADMAP item 1 on pool 0.0.16, using only the existing API: one pool per stage with `min: 1` and `restarts`, `start()` when the server starts, `watch` settling on the Oxlint client's exit, and `token.destroy()` in place of the deadline recycle. Update the brief from pool 0.0.14 to 0.0.16. Pool needs no change for this.",
      "source": "probe/ROADMAP.md:5. The current mechanisms are Probe.ts:229-242 (a failed arm retried once per later call, with no bound), Probe.ts:536-575 (recycle on a deadline), and LintStage.ts:173-175 (a dead lint server is kept). The brief is probe/tmp/codex/eager-probe-brief.md.",
      "consumer": "Probe. It deletes its unbounded per-call arm retry and its kept dead lint server, both recorded in probe ROADMAP item 1, and it becomes pool's second real consumer.",
      "priority": "next",
      "risk": "`token.destroy()` is a leased loss, so it never strikes. A stage that hangs on every call would therefore be recycled on every call, the same call-paced loop the user ruled a recorded limit. The user's ruling of 2026-10-03 calls for eager start at the server onset. The contract re-pin to `^0.0.19` comes along with it."
    },
    {
      "id": "node-worker-floor-watch",
      "target": "worker",
      "change": "Give `NodeWorkerOptions` the single-word keys `min` and `restarts`, and wire an internal pool `watch` that settles on the thread's existing `death` latch. A dead thread is then replaced when it dies, not at the next idle `validate`, and a script that fails at load is bounded by strikes.",
      "source": "NodeWorker.ts:45-50 forwards only `create`, `destroy`, `validate`, and `max`. server/types.ts:85-96 has no `min` or `restarts`. Thread.ts:68-78 already latches the thread's death. NodeWorker.ts:69-71 is the idle-only validate.",
      "consumer": "None. No package depends on @orkestrel/worker. Admit this with the first `createNodeWorker` consumer.",
      "priority": "later",
      "risk": "Medium. It adds public options, changes the server face from lazy to eager thread creation, and adds strike-driven refusals. Without a consumer, the gate on minimal public APIs refuses it."
    },
    {
      "id": "pool-token-retire",
      "target": "pool",
      "change": "Add a `retire()` method to `PoolToken`. It disposes the record for every co-holder and charges one strike whether or not leases are live, which removes the release-then-lose sequence and its window where a waiter wins the record.",
      "source": "Pool.ts:512 and :523-527 add a strike only for a record with no live lease. Pool.ts:305-313 shows that `destroy()` counts as a leased loss. Browse works around this at BrowserMCPServer.ts:863-871 and :923-931, and guards for it at :662 and :680.",
      "consumer": "Browse would delete both release-then-lose branches and the two guards for a waiter that won the record. A waiter that wins the briefly idle record today gets UNAVAILABLE instead of a refill. Probe item 1's deadline recycle would also strike.",
      "priority": "later",
      "risk": "High. It changes strike accounting, and the user ruled on 2026-10-05 that the call-paced loop is a recorded limit and the grant rule stays (contexts-synthesis.md:9, option (a) at :44). It needs the user to reopen that ruling first, so it must not ride in 0.0.16."
    },
    {
      "id": "pool-roadmap-item-1",
      "target": "pool",
      "change": "Keep ROADMAP item 1 open and unbuilt: a waiter waits while a live lease could still free a place, instead of being refused by the spent-floor or retained-cleanup checks.",
      "source": "Pool.ts:359-387 holds the refusals. status.md:46 notes that the default size of 1 never reaches them, and that the analyst argues for terminal unavailability in browse.",
      "consumer": "Browse, at a `BROWSE_POOL` above 1. The default is 1 (status.md:44), so no consumer exists today.",
      "priority": "later",
      "risk": "FIFO settlement and cancellation must survive the change. Browse might prefer terminal unavailability over waiting on another holder, so it needs a ruling at that time."
    }
  ],
  "rejected": [
    "A per-token loss signal or event on `PoolToken` (browse mechanism 6). Browse declares the loss itself, through its own watch and ping (BrowserMCPServer.ts:758-769), so a pool signal would delete only the lease loop at :762-765 while browse still keeps `#losses`, `#departures`, and `#notices` for the per-holder notices. Worker leases afresh for each job and already observes a thread's death in Dispatch, so it is not a second consumer.",
    "Validating on every hand-out, or revalidating occupied records (mechanism 8). By design, pool skips validation on shared hand-outs so that validation cannot dispose co-holders (pool/src/core/types.ts:74-78). Browse's ping on every call (BrowserMCPServer.ts:711) checks a lease it already holds, not an acquire, so a pool option would replace only the single ping site at :657.",
    "A non-waiting acquire or a waiter limit (mechanism 1). Browse admits by holder: a holder keeps its seat through disposal and through retained cleanup (BrowserMCPServer.ts:355-359, 460). Pool counts leases instead, so a try-acquire in pool would not replace browse's BUSY admission.",
    "A promise per record that settles when the record ends (mechanism 9). Browse resolves `#endings` inside its own destroy hook (BrowserMCPServer.ts:968) at no cost, and `token.destroy()` already returns the record's cleanup promise.",
    "A holder or session layer that rebinds a consumer to a new lease, prepared sub-resources, and lease-level retained cleanup, placed in pool or worker (mechanisms 2, 3, 4, and 7). Browse is the only consumer, and worker holds no identity across calls (Worker.ts:172-179). Generalizing these now would break the minimal-API gate and would push product policy into framework code.",
    "Forwarding `capacity` in worker instead of narrowing the type. Abort terminates the whole thread (Dispatch.ts:162-169), which would reject every co-holder's job, and no consumer has asked for shared threads.",
    "Queue: retry backoff, a cap on pending entries, and a record of completed ids for de-duplication after an entry settles. None has a consumer or a recorded defect. Queue's concurrency counts loops with no resource behind them, so nothing in queue belongs in pool, and worker already pairs queue with pool.",
    "Workflow: compare-and-set or fenced leases on `WorkflowStoreInterface`. Its only motivating consumer is supervisor, which has been out of the release waves since the 2026-09-29 contract wave and pins workflow `^0.0.18`.",
    "A promise-against-deadline race helper in timeout or abort. Each hand-written race can switch to the existing `createTimeout` or `AbortSignal.timeout`, so no added API is needed. The map's claim that mcp contradicts itself does not hold: the rule in MCPClient.ts:116 governs request deadlines, and StdioClientTransport.ts:230 is the close grace.",
    "Launching Chromium through process's `Supervisor` and merging the two kill procedures. No defect is recorded against browser's single-pid kill on Windows, and the change would alter the termination path of a package being released (0.0.25).",
    "A shared teardown barrier for `Server.destroy()`. I did not confirm that the close runs twice (I read Server.ts:257-269 only), it is outside the pool, worker, and queue question, and no consumer has reported it."
  ]
}
```

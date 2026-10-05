# propose:reliability

```json
{
  "summary": "I checked the facts these rulings depend on against the source: pool types.ts and Pool.ts at 1f194d7, BrowserMCPServer.ts and its tests at browser 6bedbb1, worker's Worker.ts, NodeWorker.ts, Dispatch.ts and Thread.ts, queue's Queue.ts, probe's Probe.ts and ROADMAP.md, and contexts-synthesis.md.\n\nPublishing. Pool 0.0.16 is the blocker. Pool's package.json still says 0.0.15, and the registry copy of 0.0.15 has no `capacity`. Browser HEAD passes `capacity` (BrowserMCPServer.ts:207) but pins `^0.0.15` (browser/package.json:110). Its tree also holds uncommitted C2 work. Publish in this order: pool 0.0.16 as it stands, then browser re-pinned to `^0.0.16` once C2 and C3 close, then the scaffold re-pin. Worker's re-pin to pool is owed after that. Supervisor stays outside the release waves. Queue's devDependency pins can ride its next release.\n\nThere is no reason to hold 0.0.16 for a further change. Every pool addition below is additive to `PoolToken`, and none has a consumer that needs it before publication.\n\nA finding the release record has to carry. At the default topology the shared holder holds a lease from setup (S:274). So an unconfirmed context disposal (S:863-871) or a failed context creation (S:923-931) takes the leased-credit path, which charges no strike. The tests pin this path at BrowserMCPServer.test.ts:3196 and :3230. The idle-strike path does not bound the loop either: the refilled record is born after the strike, so its first grant sets the strikes back to 0 (Pool.ts:713). In both paths the bound holds only because the fixture refuses the relaunch. Synthesis rulings 4 and 8 say a Chromium that always fails disposal or creation \"cannot relaunch without bound\". That is false. Both cases are the call-paced relaunch loop the user recorded as a limit (Q3).\n\nWhat becomes native, by owner:\n- **Pool.** Pool can take a `fail` verb only if the user reopens Q3(b). Hand-out validation of occupied records, a non-waiting acquire, and public strike counts stay out.\n- **Worker.** At the re-pin, narrow its `pool` type so it no longer accepts `capacity`. Worker gains a death-latch `watch` and a warm floor when worker has a consumer.\n- **Queue.** Queue gains nothing now. A retry `delay` waits for a consumer.\n- **Workflow.** Fenced store ownership waits for supervisor to return to the waves.\n- **Applications.** The operation-lifecycle concerns belong to applications and to mcp's durable task manager: request versus operation outcome, operation identity, de-duplication after settle, and a durable result. They do not belong to pool, worker, or queue.",
  "items": [
    {
      "id": "release-pool-0.0.16",
      "target": "other",
      "change": "Release order. Bump pool to 0.0.16 with no further API change and publish it. Then re-pin browser to `^0.0.16` and publish browser 0.0.25 after C2 and C3 close. Then re-pin scaffold. Refresh scaffold .orkestrel/veneer/lifecycle/eager/capabilities.md, which still describes pool 0.0.13, in the release record.",
      "source": "pool/package.json:3 says 0.0.15 at HEAD 1f194d7, and the 0.0.15 release (4c589c6) has no `capacity`. Browser passes `capacity: contexts` (browser/src/server/BrowserMCPServer.ts:207) while pinning `^0.0.15` (browser/package.json:110). The browser tree has uncommitted work in tests/service/browse.test.ts, tests/setupService.ts and package.json. Release unit R is in contexts-synthesis.md:56.",
      "consumer": "Browser 0.0.25. A clean install of browser HEAD against registry pool 0.0.15 would drop `capacity`. With the shared holder on the single exclusive record, a second holder's acquire would wait without end (read from the code, not run).",
      "priority": "now",
      "risk": "The ordering is the whole risk: publishing browser before pool ships a binary whose admission limit (size times contexts) exceeds what the pool hands out. Holding pool 0.0.16 for an additive token method gains nothing, because adding a method to `PoolToken` is non-breaking for consumers."
    },
    {
      "id": "record-retirement-limit",
      "target": "browser",
      "change": "Correct the record. Synthesis rulings 4 and 8 promise a bound on retiring a browser that fails context disposal or creation, and that bound does not hold. Both cases are the Q3 call-paced relaunch limit. C3's guide states the limit, not the bound. The user decides whether to reopen Q3(b).",
      "source": "The shared holder is granted at setup (BrowserMCPServer.ts:274), so #release (S:863-871) and #construct (S:923-931) call #lose with a live co-holder. That is a leased loss with no strike (pool/src/core/Pool.ts:512, 524). When there is no co-holder, the strike is cleared by the refilled record's grant (Pool.ts:713, 533). The tests reach the spent state only through `fixture.launcher.refuse` (browser/tests/src/server/BrowserMCPServer.test.ts:3196-3264).",
      "consumer": "Browser C3 (guides/browser.md, ROADMAP.md) and scaffold contexts-synthesis.md:32 and :36. The fix is one corrected sentence in each.",
      "priority": "now",
      "risk": "Prose only. If it is left as written, the guide states a bound that the C2 real-Chromium proofs cannot show."
    },
    {
      "id": "pool-roadmap-probe",
      "target": "pool",
      "change": "Rewrite the closing sentence of pool ROADMAP.md item 1. Probe does not run stages on pool. Name probe ROADMAP item 1 as the planned exclusive-lease consumer instead.",
      "source": "pool/ROADMAP.md:3 says probe runs each stage at `min: 1`. probe/package.json declares no pool dependency, probe/src/server/Probe.ts:229-242 retries arming once per call, and probe/ROADMAP.md:5 still lists the pool build as a plan.",
      "consumer": "The pool roadmap reader. It can ride the 0.0.16 release commit.",
      "priority": "now",
      "risk": "None. It is a present-tense claim about another package that is false today."
    },
    {
      "id": "pool-fail-verb",
      "target": "pool",
      "change": "Add `PoolToken.fail(cause?: unknown): Promise<void>`. It disposes the record for every co-holder, charges a strike whether or not other leases are live, records `cause` as the spent-floor cause, owes no refill credit, and returns the record's cleanup barrier. This differs from `destroy`, which is a deliberate teardown with a refill credit. `fail` bounds the relaunch loop only together with Q3(b): moving the strike reset from a bare grant to a proven-healthy event such as the first `release()`.",
      "source": "Pool.ts:305-313 (`destroy` is a leased loss), :504-527 (strikes only without a live lease) and :713 (a grant resets strikes). Browser emulates the verb with release-then-#lose (BrowserMCPServer.ts:863-871, 923-931) and awaits #endings for completion (S:671, 871, 968).",
      "consumer": "Browser #release and #construct. They delete the co-holder and #building guards, the release-then-lose sequence and its comment at S:864, and the #endings waits on those paths. Probe ROADMAP item 1 gets a fault verb distinct from its deadline recycle through `destroy()`.",
      "priority": "next",
      "risk": "It takes effect only if the user reopens Q3, which they ruled a recorded limit on 2026-10-05. Without the reset change, `fail` adds a strike that the next grant erases, so it only cleans up browser's code. A strike on a shared record also refuses co-holders' re-grants once the floor is spent, which needs a ruling on blast radius."
    },
    {
      "id": "probe-on-pool",
      "target": "probe",
      "change": "Build probe ROADMAP item 1 on pool 0.0.16 with no new pool API. Each stage gets one pool with `min: 1` and `restarts`, `start()` at server start, a `watch` on the Oxlint client's exit, and the leased token's `destroy()` in place of the deadline recycle.",
      "source": "probe/ROADMAP.md:5. Probe.ts:229-242 retries arming once per call with no limit. LintStage.ts:156 and :173-175 record a dead lint server and never replace it.",
      "consumer": "Probe itself. It deletes #ready's per-call re-arm and #recycle's replacement by identity (Probe.ts:536-575), and it is the second real pool consumer.",
      "priority": "next",
      "risk": "A stage that hangs on every call gets recycled through `destroy()` as a leased loss, which has no strike and earns a credit. Probe therefore inherits the same call-paced loop. Probe also pins contract below pool's `^0.0.19`, and the roadmap entry requires that re-pin first."
    },
    {
      "id": "worker-repin-capacity",
      "target": "worker",
      "change": "At the re-pin to pool `^0.0.16`, narrow `WorkerOptions.pool` to `Omit<PoolOptions<TResource>, 'capacity'>` in worker/src/core/types.ts. Add a case that pins the idle-loss strike for core `Worker` with `min` and `restarts`.",
      "source": "worker/src/core/types.ts:77 types `pool` as the full `PoolOptions`, and Worker.ts:85-106 never forwards `capacity`. Pool types.ts:86 adds the idle-loss strike. contexts-synthesis.md:56 says worker must take the change knowingly.",
      "consumer": "Worker's own re-pin, owed by release unit R. No external package depends on worker, so the change is type honesty: after the re-pin a caller's `capacity` type-checks and is silently dropped.",
      "priority": "next",
      "risk": "Narrowing breaks a caller that passes `capacity`, and none exists. Forwarding it instead would expand the capability without a consumer, and threads cannot share safely (see the rejected list)."
    },
    {
      "id": "worker-thread-watch-floor",
      "target": "worker",
      "change": "`NodeWorkerOptions` gains `min` and `restarts`, forwarded to the pool. NodeWorker passes a `watch` that settles on the `Thread` death latch: an event-driven promise on `exit`, `error` or `messageerror`. The aim is that a job abort, which evicts and terminates the thread, lands as a leased loss: no strike and one refill credit. Today it lands as an idle validate failure, which strikes.",
      "source": "Dispatch.ts:162-169 evicts and terminates. Worker.ts:177 then releases, and the next acquire validates the dead thread (NodeWorker.ts:69-71). An invalid record strikes (Pool.ts:632). NodeWorker forwards only `create`, `destroy`, `validate` and `max` (NodeWorker.ts:45-50).",
      "consumer": "None yet. Gate it on the first `createNodeWorker` caller that needs a warm floor. Until then, NodeWorker sets no `min`, so validate failures never strike.",
      "priority": "later",
      "risk": "Without `watch`, adding `min` makes each timed-out job a strike: with `restarts: 0`, one timeout spends the floor until `start()`. With `watch`, correctness depends on the pool's watch callback running before Worker's `finally` release. The code read suggests the Thread exit listener fires before terminate()'s own resolution, but this needs a test that is red without the watch."
    },
    {
      "id": "pool-lease-signal",
      "target": "pool",
      "change": "Add a `PoolToken.signal: AbortSignal`, aborted with the loss cause when the lease ends by loss, by a co-holder's `destroy()`, or by teardown. It would not abort on the holder's own `release()`.",
      "source": "PoolToken has only `value`, `release` and `destroy` (pool/src/core/types.ts:50-66), and a loss invalidates leases silently (types.ts:90). Browser fans out loss itself (BrowserMCPServer.ts:758-780).",
      "consumer": "None that deletes code today. Browser's #lose loop is a few lines and still needs its own per-holder URL and notice state. Worker's handler receives `token.value`, not the token, and Dispatch already listens for thread death.",
      "priority": "later",
      "risk": "It adds a signal per lease. It has value only for a shared-record consumer without its own watch fan-out, and none exists."
    },
    {
      "id": "pool-roadmap-item-1",
      "target": "pool",
      "change": "Keep ROADMAP item 1 as written. Derive whether a waiter can still make progress from live leases, disposals and owed refills before the spent-floor and retained-cleanup refusals.",
      "source": "Pool.ts:359-387. With `BROWSE_POOL` above 1, a spent floor refuses a displaced holder while another browser's lease could free a place.",
      "consumer": "Browser at `BROWSE_POOL` above 1. The user ruled the default stays 1 (contexts-synthesis.md:11), so no consumer runs this today.",
      "priority": "later",
      "risk": "It touches FIFO settlement and cancellation in the pump loop, so it needs the full medium-size review."
    },
    {
      "id": "queue-retry-delay",
      "target": "queue",
      "change": "Add a `delay` entry and queue option: milliseconds between attempts, parked on the attempt signal through @orkestrel/timeout, not polled. Exponential policy would be a later shape.",
      "source": "queue/src/core/Queue.ts:582-597 retries at once in a loop, and queue/guides/queue.md:181 records that delay was cut. The reliability assessment (line 252) calls for a bounded retry policy.",
      "consumer": "None cited. Worker, workflow, agent and probe use queue retries, and none has a recorded need for spacing.",
      "priority": "later",
      "risk": "A restored entry loses its per-entry options (queue.md:223), so a delay would not survive `restore` unless the store schema changes."
    },
    {
      "id": "workflow-store-fencing",
      "target": "workflow",
      "change": "Add fenced ownership to `WorkflowStoreInterface`: a compare-and-set `set` keyed on a revision. Two processes recovering one snapshot then cannot both dispatch.",
      "source": "workflow/src/core/types.ts:2000-2002 (a process-local execute claim) and :554-577 (get, set and delete with no revision). Supervisor layers lease renewal on top (supervisor/src/core/Run.ts:539-636).",
      "consumer": "Supervisor, when it returns to the release waves. Its `^0.0.18` workflow pin is behind 0.0.21.",
      "priority": "later",
      "risk": "It is a store contract change across every store backend. It is not justified until supervisor re-pins."
    },
    {
      "id": "browser-process-launch",
      "target": "process",
      "change": "Launch Chromium through `@orkestrel/process` and merge the two kill procedures. Process takes browser's bounded wait for leftover group members, made event-driven, and browser takes `taskkill /T` on Windows.",
      "source": "browser/src/server/helpers.ts:462-465 (a raw spawn) and Browser.ts:1096-1100 (one pid signalled on Windows), against process/src/server/helpers.ts:773-790 (`taskkill /F /T`). Portability.md:61 binds only a package that declares process, and browser does not.",
      "consumer": "Browser on Windows. It deletes its own SIGTERM, SIGKILL and group-poll loop (Browser.ts:1124-1175).",
      "priority": "later",
      "risk": "Browser would gain a dependency, which AGENTS.md allows only on the user's explicit request. Browser's leftover-member wait polls, and moving it into process conflicts with the no-polling law until it is rewritten on events."
    }
  ],
  "rejected": [
    "Pool validation on every hand-out of a shared record (map item 8, kin opinion). P1 deliberately skips validation on occupied records so that a failed check cannot dispose co-holders (pool/src/core/types.ts:74-78). Browser's per-call ping at S:711 runs per call, not per hand-out, so a pool option would delete only S:657. Shared-record consumers detect loss through `watch`.",
    "A non-waiting acquire or a waiter cap in pool (map item 1). Browser refuses at its own admission limit, which counts holders whose disposal is still pending (S:355-359, 460). The pool cannot see those, so a pool-level refusal would not replace it, and no other consumer asks for one.",
    "Public strike and spent counts on `PoolInterface` (pool map gap 7). Browser branches on `PoolError.code` and `cause` (S:725-730), which is the contract. Exposing `#strikes` would publish internal policy state with no consumer.",
    "A holder or session layer in pool or worker that rebinds an identity to a new lease (map items 3 and 4). Worker leases afresh for each job (Worker.ts:172-179) and has no long-lived identity. Browser is the only consumer, so a shared layer fails the minimal-API gate. Rebinding policy is application behavior.",
    "Prepared sub-resources per record, and lease-level cleanup that can fail and be retained, in pool (map items 2 and 7). Each fits only browser's context generations. `create` already lets a record carry a prepared member, so a pool feature would wrap what the record type already holds.",
    "`capacity` above 1 for worker threads. Dispatch aborts by terminating the whole thread (Dispatch.ts:162-169), which kills every co-holder's job. CPU-bound threads keep exclusive leases.",
    "A completed-id or retained-outcome window in queue for de-duplication after settle. Queue is at-least-once with outstanding entries only (Queue.ts:382-416). Durable outcomes and caller-scoped de-duplication belong to workflow snapshots, mcp's durable task manager, or the application store (reliability-assessment.md:58, 88, 173).",
    "A pending-entry cap in queue. No consumer needs backpressure, and queue's bound is a loop count with no resource behind it.",
    "An operation-lifecycle contract (request versus operation outcome, operation identity, recovery after a lost connection) in pool, worker, or queue. The assessment assigns it to applications composed over server, mcp tasks, workflow, and supervisor (reliability-assessment.md:360-364). These packages see attempts, not operations.",
    "A generic loss-promise helper in pool or contract that turns an EventTarget into a promise. Only worker's death latch would use it, and that adapter is thread-specific."
  ]
}
```

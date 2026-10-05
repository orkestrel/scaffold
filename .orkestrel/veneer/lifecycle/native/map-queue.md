# map:queue

Queue and workflow map, as of 2026-10-05 (read-only)

Neither repository has a ROADMAP.md. The only Markdown at each repository root is README.md and AGENTS.md.

**@orkestrel/queue 0.0.16** (queue/package.json:3)

What the code does:
- **Public API.** It exports `Queue`, `createQueue`, `MemoryQueueStore`, `DatabaseQueueStore`, errors, validators and helpers (queue/src/core/index.ts:1-8). `QueueInterface` has `enqueue`, `restore`, `start`, `stop`, `pause`, `resume`, `abort`, `clear`, `destroy`, plus `count`, `active`, `paused`, `stopped` and `emitter` (queue/src/core/types.ts:221-250).
- **Concurrency.** `concurrency` defaults to 1. The engine spawns worker loops up to min(concurrency, claims+pending) (Queue.ts:427-442), and idle loops park on a wake list (Queue.ts:461-482). The bound is a count of loops. It is not a set of leased slots, and a claim has no holder identity (Queue.ts:61).
- **Ordering.** Entries run in FIFO order through `#pending.shift()` (Queue.ts:478).
- **Retries and backoff.** Retries run immediately in a loop with no delay (Queue.ts:582-597). The guide says delay was cut (queue/guides/queue.md:181). A queue-level abort never retries (types.ts:152-153).
- **Timeout and cancellation.** Each attempt races the handler against the queue abort, the entry signal and the per-attempt deadline, combined with `AbortSignal.any` (Queue.ts:698-706, 720-770).
- **Backpressure.** There is no cap on pending entries: `#accept` pushes without a limit (Queue.ts:418-424).
- **Live id de-duplication.** A live id is refused with code `duplicate` (Queue.ts:194-201). After the entry settles, the id is free again.
- **Durability.** The store keeps outstanding entries only: `save` on admission, `remove` before the entry settles, and `restore` re-runs entries at their persisted attempt count (Queue.ts:382-416, 549, 214-252). Saving the attempt count is best-effort (Queue.ts:625-633). Delivery is at-least-once with a single owner, and handlers must de-duplicate on `context.id` (types.ts:119-126; queue.md:184, 223). Restored entries lose per-entry retry, timeout and signal (queue.md:223).
- **Outcome reporting.** Each entry's outcome is its `enqueue` promise, plus the events `enqueue`, `start`, `retry`, `success`, `failure`, `abort` and `drain` (types.ts:92-107).
- **Dependencies.** Runtime dependencies are abort, contract, database, emitter and timeout (queue/package.json:73-79).
- **Consumers (runtime dependency).** workflow (workflow/package.json:100), worker (worker/package.json:90), agent (agent/package.json:78) and probe (probe/package.json:99).

**@orkestrel/workflow 0.0.21** (workflow/package.json:3)

What the code does:
- **Public API.** It has a JSON definition tree (Workflow → Phase → Task) and live entities. The main entry points are:
  - `WorkflowRunnerInterface.execute`, which accepts a definition or a live tree (workflow/src/core/types.ts:1954-2036).
  - `WorkflowManagerInterface`, with `add`, `open`, `save`, `remove` and `clear` (types.ts:2140-2228).
  - `WorkflowStoreInterface`, with `get`, `set` and `delete` (types.ts:554-577).
  - The generic `RunnerInterface` (types.ts:2465-2557) and `SchedulerInterface` (types.ts:2252-2260).
  - The browser and server scheduler subpaths (package.json:39-54).
- **Ordering and concurrency.** Phases run in order and the tasks inside a phase run concurrently (types.ts:15-18). Each phase builds one `Runner`, using the phase's `concurrency` value (WorkflowRunner.ts:416-433). That `Runner` sits on a `createQueue` (Runner.ts:7, 119-123), so the phase bound is a queue loop count.
- **Fan-out caveat.** A `spawn` awaited inline can deadlock a bounded runner (types.ts:2348-2352).
- **Retries.** `retries` is threaded to the queue minus the attempts already used (WorkflowRunner.ts:485-486, 563-564). There is no backoff. `scheduler.delay` appears only as a documentation example (factories.ts:478-483).
- **Timeout and cancellation.** There is a per-task deadline (WorkflowRunner.ts:571-576), and run-level `signal`, `timeout` and `budget` are combined; on a cancel the run settles `stopped` and resolves rather than rejects (types.ts:1873-1883, 1971-1977). Under `bail`, the run fails fast (types.ts:1967-1970).
- **Persistence.**
  - The checkpoints are `initial`, `attempt`, `settlement` and `final` (types.ts:1819).
  - The `attempt` checkpoint is written before the handler is dispatched, and a failed write stops the run (WorkflowRunner.ts:585-591).
  - `createRecoveredWorkflow` returns `running` tasks to `pending` without restoring spent attempts. An exhausted task becomes `failed` with origin `recovery` (factories.ts:233-252; helpers.ts:651-695).
  - Snapshots last until an explicit `delete` (types.ts:548-550).
- **Outcome reporting.** `WorkflowResult` carries `status`, `results`, `durable` and `fault` (types.ts:1807-1816). Each task's `result` is a `Result` with a persisted failure origin (types.ts:388-421). With `bail: false`, a failed task still lets the root reach `completed` (types.ts:1967-1969).
- **Ownership.** The execute claim is process-local and keyed on the object (types.ts:2000-2002). The store has no compare-and-set or lease (types.ts:554-577).
- **Handler identity.** The handler receives `task` (its lineage) and a one-based `attempt` (types.ts:1714-1722). It receives no caller-scoped operation key.
- **Dependencies.** Runtime dependencies are abort, budget, contract, database, emitter, queue and timeout (package.json:94-102).
- **Consumers.** agent (agent/package.json:81), toolbox (toolbox/package.json:94) and supervisor. Supervisor pins `^0.0.18` (supervisor/package.json:111), which does not accept 0.0.21.

**Overlap with pool and worker**

What the code does:
- Neither queue nor workflow imports pool.
- worker composes a `Queue` with a `Pool`. Pool `max` defaults to the queue's concurrency (Worker.ts:96-98). Each job acquires a resource over the attempt signal and releases it in a `finally` (Worker.ts:172-179).
- worker pins pool `^0.0.14` (worker/package.json:89) while browser pins `^0.0.15` (browser/package.json:110). On a 0.0.x version a caret range accepts only that exact patch, so worker stays on 0.0.14.

**Reliability assessment concerns** (reliability-assessment.md)

1. **Request outcome vs operation outcome** (assessment lines 27-37):
   - Queue does not address it. The final answer lives only in the in-process promise, and the store row is removed before the promise settles (Queue.ts:549-551, 646-657). The assessment says the same (lines 124-130).
   - Workflow partly addresses it. Per-task results plus `durable` and `fault` separate the execution outcome from the persistence outcome (types.ts:1807-1827), and snapshots keep them. Workflow has no request or transport side, so the scope question ("success of what?") is left to the caller.
2. **Idempotent retries** (assessment lines 169-177, 261-267):
   - Queue partly addresses it. It gives a stable `context.id` across attempts and replays (types.ts:119-126), and refuses an id only while it is live (Queue.ts:194-201). It keeps no completed-id record, so it cannot refuse a conflicting input after the first entry settles, and it has no backoff.
   - Workflow partly addresses it. It persists the attempt before dispatch (WorkflowRunner.ts:585-591), never resets the attempt budget (helpers.ts:659-677), and passes the attempt number to the handler (types.ts:1721-1722). De-duplicating the effect is still the handler's job, and nothing carries an operation identity that a caller supplies.
3. **Durable outcomes across a lost connection or process**:
   - Queue partly addresses it. Outstanding work survives a crash and `restore` re-runs it, but the outcome does not survive (queue.md:223).
   - Workflow partly addresses it. A single owner can recover after a crash (factories.ts:233-252), and outcomes stay in the store. Ownership is process-local with no fencing (types.ts:2000-2002; 554-577), so two processes recovering the same snapshot can both dispatch.
   - Lost connection: neither package addresses it, because neither has a transport.

**My opinion** (not stated in the code):
- **Native to pool.** None of queue's own behaviour belongs in pool. Queue's bound counts slots and has no resource behind it, and worker already pairs it with pool. A lease with a holder identity from the browser work would sit in pool, and worker would gain it through `acquire`.
- **Gaps in queue worth a design look:**
  - an optional retry delay or backoff, because there is none today;
  - an optional cap on pending entries;
  - an optional retained-outcome or completed-id window for de-duplication after settle.

  Each needs a real consumer before it lands.
- **Gaps in workflow worth a design look.** A fenced lease or compare-and-set on `WorkflowStoreInterface` would let more than one process share a store safely. Supervisor already layers that ownership on top, which is one reason its `^0.0.18` pin needs a re-pin.
- **Publishing.**
  - Supervisor's pins are behind: workflow, plus contract, database, emitter and process as listed in capabilities.md:18.
  - worker's pool `^0.0.14` pin lags pool 0.0.15.
  - queue's devDependency pins are scaffold `^0.0.90` and probe `^0.0.19` (queue/package.json:82-84). Workflow already uses scaffold `^0.0.91` and probe `^0.0.20`.

Files read: C:\Users\mikes\WebstormProjects\queue\src\core\{types,Queue,index}.ts, queue\guides\queue.md, C:\Users\mikes\WebstormProjects\workflow\src\core\{types,factories,helpers,WorkflowRunner,Runner}.ts, C:\Users\mikes\WebstormProjects\worker\src\core\Worker.ts, C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\reliability-assessment.md, scaffold\.orkestrel\veneer\lifecycle\eager\capabilities.md.

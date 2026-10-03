# Eager browse: `@orkestrel/*` capabilities map

Grok 4.7 mapping lane `eager-capabilities`, 2026-10-03, over `scaffold/guides/` and each package's repository under `C:\Users\mikes\WebstormProjects\`. Read-only; no live run. Brief: `capabilities-brief.md`. `@orkestrel/supervisor` is mapped but ruled out by the user.

## 1. Packages

### `@orkestrel/pool`

- Version `0.0.13` (`C:\Users\mikes\WebstormProjects\pool\package.json:3`). Local `main` equals `origin/main` `66ddb1252f09a38d10550b35b7b16c09ef6ebaa7`. The reflog’s `Release 0.0.13` is followed by `Re-pin the @orkestrel ranges for the release visit` and `Overwrite with scaffold 0.0.81`.
- Environment: core only (`package.json:28-39`, export `.`).
- Runtime dependencies: `@orkestrel/contract` `^0.0.18`, `@orkestrel/emitter` `^0.0.11` (`package.json:71-74`).
- Guide: `C:\Users\mikes\WebstormProjects\scaffold\guides\pool.md`. No roadmap.

### `@orkestrel/supervisor`

- Version `0.0.2` (`C:\Users\mikes\WebstormProjects\supervisor\package.json:3`). Local `main` equals `origin/main` `f5fc6e2cd5931ccf085087e45754c75d7133431d`. The reflog records only the clone, so no `Release` line is visible. The browser catalog lists `0.0.1` (`C:\Users\mikes\WebstormProjects\browser-wt-browse\.claude\agents\orkestrel.md:86`).
- Environments: published core and server (`package.json:21-42`). The guide says the package still has no published browser environment; `app/browser` is a private application (`scaffold\guides\supervisor.md:27-31`).
- Runtime dependencies: `@orkestrel/contract` `^0.0.17`, `@orkestrel/database` `^0.0.14`, `@orkestrel/emitter` `^0.0.10`, `@orkestrel/process` `^0.0.12`, `@orkestrel/workflow` `^0.0.18` (`package.json:106-112`). Those pins are older than the sibling checkouts read here (`contract` `0.0.19` on `@orkestrel/browser`, `database` `0.0.16`, `emitter` `0.0.11`, `process` `0.0.14`, `workflow` `0.0.20`).
- Guide: `scaffold\guides\supervisor.md`. No roadmap.

### `@orkestrel/worker`

- Version `0.0.14` (`C:\Users\mikes\WebstormProjects\worker\package.json:3`). Local `main` equals `origin/main` `7f1a168086a078c836824477a6dc3b8fefdaa7aa`. Reflog: `Release 0.0.14`, then re-pin, then `Overwrite with scaffold 0.0.81`.
- Environments: core and server (`package.json:29-49`).
- Runtime dependencies: `@orkestrel/contract` `^0.0.18`, `@orkestrel/database` `^0.0.16`, `@orkestrel/emitter` `^0.0.11`, `@orkestrel/pool` `^0.0.13`, `@orkestrel/queue` `^0.0.15` (`package.json:85-90`).
- Guide: `scaffold\guides\worker.md`. No roadmap.

### `@orkestrel/workflow`

- Version `0.0.20` (`C:\Users\mikes\WebstormProjects\workflow\package.json:3`). Local `main` equals `origin/main` `69ac1f17761280d362b2fe63bf602e91829f0352`. Reflog: `Release 0.0.20`, then re-pin, then `Overwrite with scaffold 0.0.81`.
- Environments: core, browser, and server (`package.json:28-54`).
- Runtime dependencies: `@orkestrel/abort` `^0.0.12`, `@orkestrel/budget` `^0.0.12`, `@orkestrel/contract` `^0.0.18`, `@orkestrel/database` `^0.0.16`, `@orkestrel/emitter` `^0.0.11`, `@orkestrel/queue` `^0.0.15`, `@orkestrel/timeout` `^0.0.12` (`package.json:94-101`).
- Guide: `scaffold\guides\workflow.md`. No roadmap.

### `@orkestrel/queue`

- Version `0.0.15` (`C:\Users\mikes\WebstormProjects\queue\package.json:3`). Local `main` equals `origin/main` `f2c5caa90843f4b1e03ca0d267e8041929e587a3`. Reflog: `Release 0.0.15`, then re-pin, then `Overwrite with scaffold 0.0.81`.
- Environment: core only (`package.json:30-41`).
- Runtime dependencies: `@orkestrel/abort` `^0.0.12`, `@orkestrel/contract` `^0.0.18`, `@orkestrel/database` `^0.0.16`, `@orkestrel/emitter` `^0.0.11`, `@orkestrel/timeout` `^0.0.12` (`package.json:73-79`).
- Guide: `scaffold\guides\queue.md`. No roadmap.

### `@orkestrel/process`

- Version `0.0.14` (`C:\Users\mikes\WebstormProjects\process\package.json:3`). Local `main` equals `origin/main` `18da96063fab2d361e66e0a81e65dbef340e7195`. Reflog: `Release 0.0.14`, then re-pin, then `Overwrite with scaffold 0.0.81`. The copy installed in the browser workspace is also `0.0.14`.
- Environments: core (contracts) and server (Node engine) (`package.json:29-49`; `scaffold\guides\process.md:17-20`).
- Runtime dependencies: `@orkestrel/contract` `^0.0.18`, `@orkestrel/emitter` `^0.0.11` (`package.json:84-87`).
- Guide: `scaffold\guides\process.md`. No roadmap.

### `@orkestrel/timeout`

- Version `0.0.12` (`C:\Users\mikes\WebstormProjects\timeout\package.json:3`). Local `main` equals `origin/main` `f4f7386fa85d3be173f95923038cfb017b16935e`. Reflog: `Release 0.0.12`, then re-pin, then `Overwrite with scaffold 0.0.81`.
- Environment: core only (`package.json:29-40`).
- Runtime dependency: `@orkestrel/contract` `^0.0.18` (`package.json:72-74`).
- Guide: `scaffold\guides\timeout.md`. No roadmap.

### `@orkestrel/abort`

- Version `0.0.12` (`C:\Users\mikes\WebstormProjects\abort\package.json:3`). Local `main` equals `origin/main` `ba2081b9a565372cc55b099346166d48b42979fe`. Reflog: `Release 0.0.12`, then re-pin, then `Overwrite with scaffold 0.0.81`.
- Environment: core only (`package.json:29-40`).
- Runtime dependency: `@orkestrel/contract` `^0.0.18` (`package.json:72-74`).
- Guide: `scaffold\guides\abort.md`. No roadmap.

### `@orkestrel/emitter`

- Version `0.0.11` (`C:\Users\mikes\WebstormProjects\emitter\package.json:3`). Local `main` equals `origin/main` `92203a60b0857849a5a8f45b6862ea31e8a879d0`. Reflog: `Release 0.0.11`, then re-pin, then `Overwrite with scaffold 0.0.81`.
- Environment: core only (`package.json:29-40`).
- Runtime dependency: `@orkestrel/contract` `^0.0.18` (`package.json:72-74`).
- Guide: `scaffold\guides\emitter.md`. No roadmap.

### `@orkestrel/budget`

- Version `0.0.12` (`C:\Users\mikes\WebstormProjects\budget\package.json:3`). Local `main` equals `origin/main` `3978a169ae13d2f38ee3d921a9a11cd38682ddb1`. Reflog: `Release 0.0.12`, then re-pin, then `Overwrite with scaffold 0.0.81`.
- Environment: core only (`package.json:29-40`).
- Runtime dependency: `@orkestrel/contract` `^0.0.18` (`package.json:73-75`).
- Guide: `scaffold\guides\budget.md`. No roadmap.

### `@orkestrel/msg`

- Version `0.0.12` (`C:\Users\mikes\WebstormProjects\msg\package.json:3`). Local `main` equals `origin/main` `c181b470f9a4202d9048542735f2a535fa70393d`. Reflog: `Release 0.0.12`, then re-pin, then `Overwrite with scaffold 0.0.81`.
- Environment: core only (`package.json:33-44`).
- Runtime dependency: `@orkestrel/contract` `^0.0.18` (`package.json:76-78`).
- Guide: `scaffold\guides\msg.md`. It is an Outlook `.msg` / `.eml` parser (`msg.md:1-3`). No roadmap. It exports none of the capabilities in section 2.

### Other guides whose text shows one of the capabilities

Taglines were read for `agent`, `console`, `middleware`, `probe`, `router`, `sea`, `server`, and `tool`. The ones that expose a capability named in the brief are `lsp`, `websocket`, and `middleware`.

- `@orkestrel/lsp` guide (`scaffold\guides\lsp.md:1-17`) and `StdioClientTransport` (`C:\Users\mikes\WebstormProjects\lsp\src\server\transports\StdioClientTransport.ts:10-28`) run a language server as a child through `@orkestrel/process` `createSession`, keep a stderr tail, and terminate the tree. A later `start()` opens a new generation after the previous one settles (`lsp.md:15-17`; `StdioClientTransport.ts:19-20`). Its `package.json` was not read for this map.
- `@orkestrel/websocket` (`scaffold\guides\websocket.md:1-8`) is the RFC 6455 wrapper. It publishes `close` and `error` events, caller `ping` / `pong`, and a close-handshake deadline. The guide says it has no reconnection and no heartbeats (`websocket.md:8`).
- `@orkestrel/middleware` `createDeadline` (`scaffold\guides\middleware.md:55`, `DeadlineOptions` at `middleware.md:89`) is a per-request HTTP deadline. Its implementation file was not opened.

`@orkestrel/database` `0.0.16` is the durable layer under `queue`, `worker`, `workflow`, and `supervisor`. Its runtime dependencies are `@orkestrel/contract` `^0.0.18`, `@orkestrel/emitter` `^0.0.11`, `@orkestrel/indexeddb` `^0.0.13`, and `@orkestrel/sqlite` `^0.0.13` (`C:\Users\mikes\WebstormProjects\database\package.json:3`, `94-98`).

## 2. Capabilities

### Owning a fixed set of long-lived resources created eagerly

`@orkestrel/pool` owns records up to an optional ceiling `max`. Omit `max` and the pool is unbounded (`scaffold\guides\pool.md:111-117`; `C:\Users\mikes\WebstormProjects\pool\src\core\types.ts:65-67`). The constructor stores hooks and does not call `create` (`C:\Users\mikes\WebstormProjects\pool\src\core\Pool.ts:65-80`). A record is created when an `acquire` finds no idle record and `owned + reservations < max` (`Pool.ts:265-276`). The guide states there is no warm floor (`pool.md:7-8`). `size` counts owned records, including ones being validated or destroyed; an in-flight create reservation is capacity and is not yet `size` (`pool.md:76-79`; `Pool.ts:87-90`).

`@orkestrel/worker` `createNodeWorker` sets the pool `max` to `concurrency`, so at most that many `node:worker_threads` exist (`C:\Users\mikes\WebstormProjects\worker\src\server\types.ts:68-70`). They are still created by the pool’s on-demand `create`. `createThread` resolves after the thread is online (`scaffold\guides\worker.md:84`).

`@orkestrel/process` `Supervisor` spawns one child in its constructor, before the caller awaits anything (`C:\Users\mikes\WebstormProjects\process\src\server\processes\Supervisor.ts:32-33`, `159-166`). `Process` is that engine plus framed stdout (`Process.ts:11-13`). `ProcessManager` is a keyed registry: it launches by id, evicts each child as it settles, and destroys every live child on teardown (`scaffold\guides\process.md:84`, `208-210`). That is a registry of children the caller launches, not a pre-created fixed population.

`@orkestrel/supervisor` `Lane` is “first-in, first-out admission over one exclusive resource” (`scaffold\guides\supervisor.md:80`). It is one resource, not a set.

### Acquiring and releasing a resource (a lease) with a record of the holder

`@orkestrel/pool` `acquire(signal?: AbortSignal): Promise<PoolToken<T>>` and `PoolToken.release(): void` (`pool\src\core\types.ts:50-57`, `106`). The token holds `value` and an idempotent `release`. The pool records the opaque record in `#leased` (`Pool.ts:440-441`, `470-472`). The token and the events carry no holder id; `PoolEventMap` payloads are empty tuples (`types.ts:36-43`). Release returns that exact record to the idle list (`Pool.ts:470-483`). A repeat release, and a release after teardown took the record, are no-ops (`types.ts:54-55`; `pool.md:148-151`).

`@orkestrel/worker` acquires inside the queue handler over the attempt’s `context.signal` and releases in a `finally` (`scaffold\guides\worker.md:155-161`). The worker’s public methods are the queue’s: `enqueue`, `restore`, `start`, `stop`, `pause`, `resume`, `abort`, `clear`, `destroy` (`worker.md:127-137`).

`@orkestrel/supervisor` `Lease` is `{ run, owner, epoch, expiry }` (`supervisor\src\core\types.ts:27-37`). `owner` is the supervisor process holding the workflow id. `SupervisorStoreInterface.acquire(id, owner, options?)` mints a new epoch or returns `CONFLICT` while any live lease holds the id (`types.ts:698-715`). `renew(lease, options?)` extends the same epoch (`types.ts:716-725`). Default tenure is `LEASE_TTL` `30_000` ms (`supervisor\src\core\constants.ts:4`). `Supervisor.open(id)` acquires or returns the in-memory run (`Supervisor.ts:97-116`). Release expires the lease in place at the same epoch (`types.ts:100-110`). `Run` arms renewal at `expiry - (ttl * 2) / 3` with one `setTimeout` (`Run.ts:101`, `539-543`).

### Choosing which resource serves work

`@orkestrel/pool` gives the oldest waiter the first idle record (`Pool.ts:263-266`) and settles successes and failures in request order (`pool.md:106-109`). There is no load score. If nothing is idle and capacity remains, it creates.

`@orkestrel/queue` runs jobs FIFO with a concurrency ceiling. Worker loops exist only for accepted demand, up to `min(demand, concurrency)` (`scaffold\guides\queue.md:7-9`, `29-30`). Default concurrency is `1` (`queue\src\core\types.ts:177-178`). That chooses how many jobs run, not which of a set of resources receives one.

`@orkestrel/workflow` runs phases sequentially and tasks inside a phase concurrently, with an optional per-phase `concurrency` (`scaffold\guides\workflow.md:13-17`, `357`). `DEFAULT_PHASE_CONCURRENCY` is `1024` (`workflow.md:372`). `Runner` enqueues units on one `Queue` (`workflow\src\core\Runner.ts:17-21`).

`@orkestrel/worker` pairs the next job with the next pooled resource the pool’s FIFO acquire returns (`worker.md:1-6`).

### Detecting that a resource died or stopped answering

`@orkestrel/pool` emits `create`, `acquire`, `release`, and `destroy` with no payload (`types.ts:36-43`). `validate` runs when an idle record is about to be handed to a waiter (`Pool.ts:293-305`). The guide says there is no polling loop; waits park on a promise or a signal (`pool.md:7-8`). Nothing in `Pool.ts` inspects a leased or idle record on a timer.

`@orkestrel/process` `Supervisor` listens to the child `error`, `exit`, and `close` events (`Supervisor.ts:167-169`). `ProcessExit` is `{ code, signal, drained }` (`process.md:192`). Stderr is a live `stderr` event plus a byte-bounded tail `evidence`, default `PROCESS_EVIDENCE` `2048` (`process.md:8-9`, `178`). `waitForExit` uses `child.once('exit')` and one `setTimeout` deadline (`process\src\server\helpers.ts:708-719`). `waitForClose` uses `once('close')` and one deadline (`helpers.ts:734-745`). `execute` has a `timeout` option (`process.md:205`).

`@orkestrel/worker` `NodeThread.alive` starts true and becomes false on thread `error`, `messageerror`, `exit`, or abort eviction. `death` latches the first terminal error (`worker\src\server\types.ts:29-33`). The pool `validate` reads `alive && worker.threadId > 0` on the next handoff (`types.ts:30-32`).

`@orkestrel/supervisor` `reconcile` probes each live unit. `ProbeStatus` is `'present' | 'absent'` (`supervisor\src\core\types.ts:282`). `ProviderExecutor.probe` spawns one short-lived `Process`, arms one `setTimeout` of `timeout`, and stops the child when that deadline fires (`supervisor\src\server\executors\ProviderExecutor.ts:187-223`). That probe runs when reconcile asks, not on a repeating interval. Lease loss is a timer to `expiry` (`Run.ts:610-618`) and a check inside `#authorize` when an operation is called (`Run.ts:530-536`).

`@orkestrel/timeout` `createTimeout({ id?, ms, signal? })`, `start()`, `clear()`. `signal` aborts when one `setTimeout` expires (`scaffold\guides\timeout.md:1-12`, `107-109`). The guide says it is not a scheduler (`timeout.md:11-13`).

`@orkestrel/abort` `createAbort({ id?, signal? })`, `abort(reason?)`. The native `abort` event is the observation surface (`scaffold\guides\abort.md:1-14`, `66`).

`@orkestrel/emitter` `createEmitter`, `on`, `once`, `off`, `emit`, `count`, `clear`, `destroy`. `emit` is synchronous (`scaffold\guides\emitter.md:1-15`, `76`).

`@orkestrel/queue` races each attempt against a signal that fires on queue abort, the entry signal, or the per-attempt deadline (`queue.md:10-13`). Events: `enqueue`, `start`, `retry`, `success`, `failure`, `abort`, `drain` (`queue.md:80`). Idle loops park on a wake list (`queue.md:7-9`).

`@orkestrel/workflow` folds abort, timeout, and budget through `AbortSignal.any` (`workflow\src\core\WorkflowRunner.ts:933-949`). `parkSignal` waits on the abort event (`workflow.md:264`). The runner comment says that race is not a poll (`WorkflowRunner.ts:882-888`).

`@orkestrel/budget` `createBudget`, `createTokenBudget`, `start`, `consume`, `clear`. `signal` aborts when `consumed` reaches `max`. The guide says it carries no clock (`scaffold\guides\budget.md:1-8`, `68`).

`@orkestrel/websocket` events include `close`, `error`, `ping`, and `pong` (`websocket.md:114-116`). `WEBSOCKET_CLOSE_TIMEOUT_MS` is `30000` (`websocket.md:99`). `ping` is a method on `NodeWebSocketInterface` (`websocket.md:116`). The guide says there is no heartbeat loop (`websocket.md:8`).

`@orkestrel/lsp` `LSPExit` is `{ code, signal }` (`lsp.md:417`). The transport reports the child exit for the current generation (`StdioClientTransport.ts:19-24`).

`@orkestrel/middleware` `createDeadline({ ms, status? })` is a per-request deadline (`middleware.md:55`, `89`). Whether that battery uses one timer or a loop was not read.

### Replacing a dead resource

`@orkestrel/pool`: `validate` returning anything other than `true`, or throwing, disposes the record. After a successful dispose, the same waiter is pumped again and may create a replacement (`Pool.ts:356-408`; `pool.md:126-128`). A leased record that the caller considers dead stays leased until `release()` or `destroy()`. `release()` pushes it back to idle with no validate call (`Pool.ts:470-483`). The next `acquire` is what validates it.

`@orkestrel/worker`: a dead thread fails `validate` and the pool destroys it and creates another on a later acquire (`worker\src\server\types.ts:30-32`).

`@orkestrel/supervisor`: `Run.reconcile` probes a running row. `absent` selects recovery `'relaunch'` (`Run.ts:436`). `present` with `attach` selects `'reattach'` (`Run.ts:447-480`). An undeterminable probe or a failed attach quarantines the row (`Run.ts:430-434`, `472-477`). `RecoveryMode` is `'reattach' | 'relaunch' | 'quarantine'` (`types.ts:56`). Relaunch is a recovery mode on the unit; the method that then calls `executor.launch` again was not the function read past `#hold`.

`@orkestrel/process` `Supervisor` reports the child’s exit and stops there. No second spawn appears in the constructor or `stopChild`.

`@orkestrel/lsp`: the caller’s next `start()` opens a new generation after the previous one has settled (`lsp.md:15-17`).

### Restart limits or backoff

`@orkestrel/queue` `retries` is a nonnegative count of extra attempts after the first. Default `0` (`queue\src\core\types.ts:175-180`). A queue-level abort does not retry (`types.ts:152-153`). The guide says the queue ships no delay (`queue.md:29-30`, `181`). The retry function inside `Queue.ts` was not opened.

`@orkestrel/workflow` `TaskDefinition.retries` and `timeout` are optional (`workflow.md:383`). The runner treats `retries + 1` as the attempt count, rethrows a non-final failure so the queue retries, and fails the leaf on the final attempt (`WorkflowRunner.ts:533-541`, `849-875`). `recoverWorkflowSnapshot` does not replenish attempts (`workflow.md:264`). The spacing between those attempts is the queue’s.

`@orkestrel/supervisor` lease renewal, on a failed renew, schedules another `setTimeout` at `prior + ttl / 3`, then one final arm at `expiry - ttl / 6`, then `#expire` (`Run.ts:595-618`). That spaces lease renewal. It is not a child-process restart count.

`@orkestrel/worker` passes `retries` and `timeout` through to the queue (`worker\src\server\types.ts:71-73`). Default retries `0`.

### Warm-up before first use

`@orkestrel/pool` creates on acquire. The guide says there is no warm floor (`pool.md:7`).

`@orkestrel/process` `Supervisor` spawns during construction (`Supervisor.ts:112-116`, `159`).

`@orkestrel/worker` `createThread` resolves after the thread comes online (`worker.md:84`). `createNodeWorker` still obtains threads through the pool, which creates them when a job acquires.

### Ordered teardown that releases everything, including after a crash

`@orkestrel/pool` `destroy(): Promise<void>` installs one promise, rejects queued acquires with `PoolError` code `destroyed`, disposes idle and leased records, waits for in-flight create, validation, and cleanup, and destroys the emitter last (`Pool.ts:170-188`, `574-586`; `pool.md:163-173`). `clear()` disposes the idle snapshot only (`Pool.ts:147-159`). Both run in the process that holds the pool. A crash of that process is not a path in `Pool.ts`.

`@orkestrel/worker` `destroy` awaits queue cleanup, then pool cleanup, then destroys the worker emitter. One failure rejects with that value; failures from both layers reject with `AggregateError`, queue first (`worker.md:139-145`).

`@orkestrel/queue` `destroy` blocks admissions, aborts, awaits cleanup, and destroys the emitter last (`queue\src\core\types.ts:248-249`). With a store, outstanding rows remain after a crash and `restore()` re-enqueues them (`queue.md:15-21`, `207-220`). Removal is at-least-once (`queue.md:184`).

`@orkestrel/process` `ProcessInterface.stop` terminates the tree and reaches the terminal moment. `destroy` stops, closes stdin, and then destroys the emitter (`process.md:262-266`). `stopChild` is the tree kill (`helpers.ts:773-789`). Those calls run while this process is alive.

`@orkestrel/supervisor` `Supervisor.destroy` destroys every run, then the emitter (`Supervisor.ts:124-130`, `170-176`). Durable unit rows and the lease live in the store (`types.ts:688-697`). `reconcile` is how a later process reads them (`Run.ts:264-272`).

`@orkestrel/workflow` `createRecoveredWorkflow` rebuilds an interrupted workflow at its remaining retry budget (`workflow.md:79`). `WorkflowStoreInterface` is `get` / `set` / `delete` of a snapshot (`workflow.md:409`).

### Supervising a child process (exit, signals, stderr tail, tree kill)

`@orkestrel/process` is the implementation.

- Exit: child `exit` and `close` (`Supervisor.ts:167-169`). `ProcessExit` `{ code, signal, drained }` (`process.md:192`). `ending` settles at native exit; `exit`, `evidence`, and `settled` wait until streams close or the drain window cuts them off (`Supervisor.ts:39-46`). `PROCESS_DRAIN` default `1000` ms (`process.md:177`).
- Signals: POSIX `killProcess` signals the process group with `process.kill(-pid, signal)`; Windows signals the one process (`helpers.ts:645-652`). `stopChild` sends `SIGTERM`, waits `grace` (default `PROCESS_GRACE` `5000`), then `SIGKILL` (`helpers.ts:782-785`; `process.md:175`).
- Stderr tail: `evidence`, default `2048` bytes, plus a live stderr callback (`process.md:178`; `Supervisor.ts:49`).
- Tree kill: POSIX group signal (`helpers.ts:654`). Windows `killTree` via `taskkill`, bounded by a timeout; a descendant that outlives the root is outside that mechanism (`helpers.ts:665-672`, `779-781`).

`Process`, `Session`, and `ProcessManager` are the published faces over that engine (`process.md:58-70`, `79-85`). `detach` spawns a child with no stdio and does not observe its outcome (`process.md:13-14`).

`@orkestrel/supervisor` `ProviderExecutor.launch` constructs a `Process` from `@orkestrel/process/server` (`ProviderExecutor.ts:19`, `117-142`). It does not construct `process`'s `Supervisor` class. `Process` itself constructs that class (`Process.ts:11`).

`@orkestrel/lsp` `StdioClientTransport` uses `createSession` and describes the same group-signal / `taskkill` termination (`StdioClientTransport.ts:10-28`).

## 3. `pool` and `supervisor`

### `@orkestrel/pool` public surface

From `scaffold\guides\pool.md:39-74` and `pool\src\core\index.ts:1-5` (re-exports `types`, `errors`, `validators`, `Pool`, `factories`):

| Export | Kind | Signature / shape |
| --- | --- | --- |
| `createPool` | function | `(options: PoolOptions<T>) => PoolInterface<T>` |
| `Pool` | class | implements `PoolInterface<T>` |
| `PoolError` | class | `code`, `cause`, `context` |
| `isPoolError` | guard | `unknown => value is PoolError` |
| `isPoolMax` | guard | positive safe integer |
| `isPoolSignal` | guard | native `AbortSignal` |
| `PoolCode` | type | `'invalid' \| 'destroyed' \| 'create' \| 'cleanup'` |
| `PoolContext` | interface | `{ value?, failures? }` |
| `PoolErrorOptions` | interface | `{ code, cause?, context? }` |
| `PoolEventMap` | type | `{ create, acquire, release, destroy }` all `readonly []` |
| `PoolToken<T>` | interface | `{ readonly value: T; release(): void }` |
| `PoolOptions<T>` | interface | `{ on?, error?, create, destroy?, validate?, max? }` |
| `PoolInterface<T>` | interface | `{ emitter, size, idle, active }` plus `acquire`, `clear`, `destroy` |

`acquire(signal?: AbortSignal): Promise<PoolToken<T>>`. An invalid signal throws `PoolError` `invalid` synchronously. `clear(): Promise<void>` destroys the idle snapshot. `destroy(): Promise<void>` is one shared barrier (`types.ts:92-125`).

### Resource lifecycle

Phases in the guide (`pool.md:119-124`):

```text
create reservation -> ready -> leased -> available -> validating -> ready
                                      \-> destroying -> removed
```

- Create: caller `create()`, only from `#startCreate` for a queued acquire (`Pool.ts:284-290`, `314-335`). Failure rejects that acquire with code `create` and the thrown value as `cause` (`types.ts:101-104`).
- Validate: optional `validate(value) => Promise<boolean> | boolean`, only when an idle record is assigned to a waiter (`types.ts:66`; `Pool.ts:293-305`).
- Acquire: FIFO queue, then the token (`types.ts:92-95`; `Pool.ts:425-443`).
- Release: `#leased` delete, then `#available` push, then `release` event if the record is still idle (`Pool.ts:470-483`).
- Destroy: per-record `destroy` hook inside `#clean`, then the `destroy` event one microtask later (`Pool.ts:503-525`). `clear` and `destroy` aggregate hook failures as code `cleanup` (`pool.md:156-157`, `181-184`).

### Failure while leased and while idle

While leased, the pool has no method other than `release` on the token. It does not subscribe to the resource. `destroy()` disposes leased records along with the rest (`Pool.ts:183-186`).

While idle, the record sits in `#available`. The next acquire validates it. A failed validate disposes it and, when cleanup succeeds, pumps the same waiter toward another record or a new create (`Pool.ts:386-408`). Cleanup failure rejects that acquire with `cleanup` (`Pool.ts:391-401`).

### Eager or on demand, fixed size, reported state

On demand, under an optional ceiling. `max` is snapshotted at construction and must be a positive safe integer if present (`Pool.ts:65-75`; `pool.md:115-117`). There is no pre-fill.

State is `size`, `idle`, `active`, and the emitter. Events do not name the record (`types.ts:36-43`; `Pool.ts:82-100`).

### `@orkestrel/supervisor`: what it supervises, and its restart policy

It supervises external work launched for a workflow: one `Lease` per workflow id, one `UnitRecord` per attempt, executors, journals, and the process trees an executor launches (`supervisor.md:1-25`). `Supervisor` holds the store, executor registry, and runs (`Supervisor.ts:26-27`, `35-48`). `ExecutorInterface` is `launch`, optional `attach`, optional `probe`, optional `stop` (`types.ts:323-358`). The server `ProviderExecutor` turns a provider command into a `@orkestrel/process` `Process` (`ProviderExecutor.ts:25-26`, `111-142`).

Restart policy that the code implements:

- Lease renewal on a timer at two-thirds of the remaining tenure, same epoch (`Run.ts:539-543`; `types.ts:716-719`). Failed renewals are retried on `ttl / 3` spacing until a last slot at `ttl / 6` before expiry, then the run is fenced (`Run.ts:595-618`).
- `reconcile(snapshot)` reads durable running rows and probes them. Absent means `'relaunch'`. Present with `attach` means `'reattach'`. Otherwise the row is quarantined (`Run.ts:264-272`, `430-480`). A unit this run already holds is reused without another probe (`Run.ts:265-267`).

### Relative to `@orkestrel/process` `Supervisor`

They are different classes.

`@orkestrel/process` `Supervisor` (`process\src\server\processes\Supervisor.ts:29-37`) supervises one child: eager spawn, stderr tail, stdin, `SIGTERM` then `SIGKILL` or Windows `taskkill`, and one terminal moment. It has no lease, no workflow id, and no second spawn. `Process` composes it (`Process.ts:11`).

`@orkestrel/supervisor` `Supervisor` (`supervisor\src\core\Supervisor.ts:35`) supervises workflow leases and unit rows. Its Node executor uses `Process`, which is the face over process’s `Supervisor`, to spawn provider commands (`ProviderExecutor.ts:19`). The package pins `@orkestrel/process` `^0.0.12` (`supervisor\package.json:110`), while the process checkout and the browser install are `0.0.14`.

## 4. Dependency fit for `@orkestrel/browser` `src/server`

`C:\Users\mikes\WebstormProjects\browser-wt-browse\AGENTS.md:1-4` states no law of its own and points at scaffold. Scaffold `AGENTS.md:24-25` says core is host-independent, browser and server may import core, and browser and server never import each other. `AGENTS.md:38` says an npm package is not added unless the user explicitly requests it. `AGENTS.md:44` says to inspect declared and installed `@orkestrel/*` capabilities before writing overlapping logic.

`C:\Users\mikes\WebstormProjects\browser-wt-browse\.oxlintrc.json:278-322` forbids `src/server` from importing Vue, stylesheets, private app modules, and `@orkestrel/<name>/browser`. It does not forbid `@orkestrel/<name>` or `@orkestrel/<name>/server`.

`guides\browser.md:3167` describes what `src/server` imports today: the core, `@orkestrel/contract`, `@orkestrel/emitter`, `@orkestrel/websocket`, `@orkestrel/tool`, `@orkestrel/mcp`, and `node:*`.

`package.json:104-113` runtime dependencies are `@orkestrel/contract` `^0.0.19`, `@orkestrel/emitter` `^0.0.11`, `@orkestrel/html` `^0.0.12`, `@orkestrel/markdown` `^0.0.17`, `@orkestrel/mcp` `^0.0.35`, `@orkestrel/router` `^0.0.16`, `@orkestrel/server` `^0.0.22`, `@orkestrel/tool` `^0.0.18`, `@orkestrel/websocket` `^0.0.14`.

Installed ranges that this graph already pulls:

- `@orkestrel/server` `0.0.22`: `abort` `^0.0.12`, `codec` `^0.0.5`, `contract` `^0.0.19`, `emitter` `^0.0.11`, `router` `^0.0.16`, `timeout` `^0.0.12`.
- `@orkestrel/mcp` `0.0.35`: `codec` `^0.0.5`, `contract` `^0.0.19`, `emitter` `^0.0.11`, `process` `^0.0.14`, `sse` `^0.0.9`, `tool` `^0.0.18`, `websocket` `^0.0.14`.
- `@orkestrel/router` `0.0.16`: `abort` `^0.0.12`, `contract` `^0.0.18`, `emitter` `^0.0.11`.
- Installed `process`, `abort`, and `timeout` each depend on `contract` `^0.0.18`.

`@orkestrel/queue` `0.0.15` is in `node_modules` because devDependency `@orkestrel/probe` `^0.0.19` depends on it (`browser-wt-browse\node_modules\@orkestrel\probe\package.json:94-99`). It is not a runtime dependency of `@orkestrel/browser`. `pool`, `supervisor`, `worker`, and `workflow` are not in that runtime list. The catalog rule at `orkestrel.md:129-133` says two pins of one package install two copies.

Under the oxlint rule, `src/server` can import the core entry of each package below, and the `/server` entry where the package publishes one. It cannot import `@orkestrel/workflow/browser`. `@orkestrel/database`, pulled by `queue`, `worker`, `workflow`, and `supervisor`, also publishes a browser entry; importing that entry from `src/server` is the same oxlint refusal. Adding any package that is not already in `package.json:104-113` is the addition `AGENTS.md:38` forbids unless the user requested that package. The design brief records a user request to reuse a package whose semantics match (`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\eager\design-brief.md:14`).

What a new runtime dependency adds, from the declared ranges:

| Package | Already in the browser runtime graph | Names added | Pin that disagrees with a package already in the graph |
| --- | --- | --- | --- |
| `pool` | no | `pool` | `contract` `^0.0.18` beside browser/mcp/server `^0.0.19`. `emitter` `^0.0.11` matches. |
| `process` | yes, via `mcp` `^0.0.14` | none | its own `contract` `^0.0.18` is already the installed process range |
| `timeout` | yes, via `server` `^0.0.12` | none | `contract` `^0.0.18` already on the installed timeout |
| `abort` | yes, via `server` and `router` `^0.0.12` | none | `contract` `^0.0.18` already on the installed abort |
| `emitter` | yes, direct `^0.0.11` | none | `contract` `^0.0.18` already on emitter |
| `queue` | dev install only, through `probe` | `queue`, `database`, `indexeddb`, `sqlite` | `contract` `^0.0.18`. `abort`, `emitter`, `timeout` match pins already present |
| `budget` | no | `budget` | `contract` `^0.0.18` |
| `msg` | no | `msg` | `contract` `^0.0.18` |
| `workflow` | no | `workflow`, `budget`, `queue`, `database`, `indexeddb`, `sqlite` | `contract` `^0.0.18`. `abort` `^0.0.12`, `timeout` `^0.0.12`, `emitter` `^0.0.11` match |
| `worker` | no | `worker`, plus `pool` and the `queue` closure above | `contract` `^0.0.18` |
| `supervisor` | no | `supervisor`, plus its declared `workflow` `^0.0.18` and `database` `^0.0.14` | `contract` `^0.0.17`, `emitter` `^0.0.10`, `process` `^0.0.12`, `database` `^0.0.14`, `workflow` `^0.0.18` |

The dependency closure of those older supervisor pins was not read from a `0.0.17` / `0.0.14` / `0.0.10` / `0.0.12` / `0.0.18` tree. The ranges above are the ranges `supervisor\package.json:106-112` declares.

## Capability table

| Capability | Package | Exported names | Semantics | Polls or not |
| --- | --- | --- | --- | --- |
| Fixed long-lived set, created when the owner decides | `pool` | `Pool`, `createPool`, `max` | Ceiling. Create runs inside `acquire` when nothing is idle. No warm floor (`pool.md:7`; `Pool.ts:265-276`). | Parks on the waiter promise and the abort signal (`pool.md:7-8`). |
| Same | `worker` | `createNodeWorker`, `concurrency` | Pool `max` equals concurrency (`worker\src\server\types.ts:68-70`). Threads come from that pool. | Same pool wait. |
| Same | `process` | `Supervisor`, `Process`, `createProcess` | One child, spawned in the constructor (`Supervisor.ts:159`). | Child `exit` / `error` / `close` events (`Supervisor.ts:167-169`). |
| Lease with a holder record | `pool` | `acquire`, `PoolToken.release` | Opaque record in `#leased`. Token has `value` and `release`. No holder id (`types.ts:36-57`). | Signal listener on the optional acquire `AbortSignal` (`Pool.ts:127-132`). |
| Lease with a holder record | `supervisor` | `Lease`, `Supervisor.open`, `SupervisorStoreInterface.acquire`, `renew` | `{ run, owner, epoch, expiry }`. Default ttl `30000`. Renewal keeps the epoch (`types.ts:27-37`, `698-725`; `constants.ts:4`). | One `setTimeout` to the renewal instant (`Run.ts:539-543`). |
| Lease with a holder record | `worker` | `enqueue` then pool `acquire` / `release` | Queue attempt signal is the acquire signal; `release` is in a `finally` (`worker.md:155-161`). | The queue parks; the pool waits on that signal. |
| Which resource serves work | `pool` | `acquire` | First idle record, FIFO settlement (`Pool.ts:263-266`; `pool.md:106-109`). | No load scan. |
| Which job runs | `queue` | `createQueue`, `concurrency` | FIFO jobs, at most `concurrency` in flight (`queue.md:7-9`). | Idle loop parks on a wake list (`queue.md:7-9`). |
| Which task runs | `workflow` | `createWorkflowRunner`, `PhaseDefinition.concurrency` | Phases in order; tasks in a phase concurrent (`workflow.md:13-17`). | `parkSignal` on abort (`workflow.md:264`). |
| Died or stopped answering | `process` | `Process.exit`, `emitter` `stderr` / `error` / `exit`, `evidence` | Native exit, signal, stderr tail (`process.md:192`, `178`). | `once('exit')` or `once('close')` plus one deadline (`helpers.ts:708-745`). |
| Died or stopped answering | `worker` | `NodeThread.alive`, `NodeThread.death` | Latched on thread `error`, `messageerror`, `exit` (`worker\src\server\types.ts:29-33`). | Next pool `validate` reads the latch. |
| Died or stopped answering | `supervisor` | `reconcile`, `ExecutorInterface.probe`, `ProbeStatus` | One probe command; `present` or `absent` (`types.ts:282`; `ProviderExecutor.ts:187-223`). | One `setTimeout` bounds that probe. |
| Died or stopped answering | `timeout` | `createTimeout`, `Timeout.start`, `signal` | One deadline (`timeout.md:1-12`). | One `setTimeout`. |
| Died or stopped answering | `abort` | `createAbort`, `Abort.abort`, `signal` | Native abort event (`abort.md:7-14`). | Abort listener. |
| Died or stopped answering | `queue` | `timeout`, `QueueContext.signal`, events `failure` / `abort` | Attempt raced against the deadline signal (`queue.md:10-13`). | Deadline timer from `timeout`; idle loop parked. |
| Died or stopped answering | `websocket` | `close`, `error`, `ping`, `WEBSOCKET_CLOSE_TIMEOUT_MS` | Close event and close-handshake deadline. No heartbeat (`websocket.md:8`, `99`, `114-116`). | Close timer when `close` is called. |
| Died or stopped answering | `lsp` | `LSPExit`, `StdioClientTransport` | Child exit for the current generation (`StdioClientTransport.ts:19-24`). | Process events, via `createSession`. |
| Died or stopped answering | `middleware` | `createDeadline` | Per-request deadline (`middleware.md:55`). | Implementation not read. |
| Replace a dead resource | `pool` | `validate`, `destroy` option | Failed validate disposes and the waiter may create again (`Pool.ts:386-408`). A leased value is not observed. | On the next acquire. |
| Replace a dead resource | `worker` | pool `validate` on `NodeThread` | Dead thread is destroyed and replaced on a later acquire (`worker\src\server\types.ts:30-32`). | On the next acquire. |
| Replace a dead resource | `supervisor` | `reconcile`, `RecoveryMode` | `absent` → `relaunch`; `present` → `reattach`; else quarantine (`Run.ts:436-480`). | When `reconcile` is called. |
| Replace a dead resource | `lsp` | `StdioClientTransport.start` | A later `start` opens a new generation after the previous one settles (`lsp.md:15-17`). | Caller calls `start`. |
| Restart limit | `queue` | `retries` | Extra attempts after the first. Default `0`. No delay in the guide (`types.ts:175-180`; `queue.md:181`). | No retry timer described. |
| Restart limit | `workflow` | `TaskDefinition.retries` | `retries + 1` attempts, thrown into the queue (`WorkflowRunner.ts:533-541`). | The queue’s retry. |
| Restart spacing | `supervisor` | `Run` renewal | Failed renew waits `ttl / 3`, then a last slot at `ttl / 6` (`Run.ts:595-607`). | `setTimeout`. |
| Warm before use | `process` | `Supervisor` constructor, `createProcess` | Spawn during construction (`Supervisor.ts:159`). | — |
| Warm before use | `worker` | `createThread` | Resolves after the thread is online (`worker.md:84`). | Thread online event. |
| Teardown | `pool` | `clear`, `destroy` | One destroy barrier disposes idle and leased records, emitter last (`Pool.ts:170-188`, `574-586`). | Barrier waits on hook promises (`pool.md:168`). |
| Teardown | `worker` | `destroy` | Queue, then pool, then emitter (`worker.md:139-145`). | Awaits those promises. |
| Teardown | `queue` | `destroy`, `restore` | In-process barrier. Outstanding store rows survive a crash (`queue.md:15-21`; `types.ts:248-249`). | — |
| Teardown | `process` | `stop`, `destroy`, `stopChild` | Tree termination then terminal moment (`process.md:262-266`; `helpers.ts:773-789`). | `waitForExit` deadline. |
| Teardown | `supervisor` | `Supervisor.destroy`, store `get` | Runs destroyed in process. Rows remain in the store for a later `reconcile` (`Supervisor.ts:170-176`; `Run.ts:264-272`). | — |
| Child process | `process` | `Supervisor`, `Process`, `Session`, `ProcessManager`, `stopChild`, `killProcess`, `killTree` | Exit, signals, stderr tail, POSIX group kill, Windows `taskkill` (`Supervisor.ts:29-37`; `helpers.ts:645-672`, `773-789`). | Events plus termination deadlines. |
| Child process | `supervisor` | `ProviderExecutor.launch` | Spawns `@orkestrel/process` `Process` (`ProviderExecutor.ts:19`, `145-165`). | That process’s events, plus the probe deadline. |
| Child process | `lsp` | `StdioClientTransport` | `createSession`, stderr tail, tree kill (`StdioClientTransport.ts:10-28`). | Process events. |

`@orkestrel/msg` is absent from the table. Its guide is an email parser (`msg.md:1-10`).

`@orkestrel/emitter` and `@orkestrel/abort` and `@orkestrel/budget` are the observation and bound primitives the rows above compose. `emitter` has no scheduler (`emitter.md:11-13`). `budget` has no clock (`budget.md:8`).

## Unknowns

- The npm registry tarball for each version. `npm view` was not used. For every package except `supervisor`, `main` matches `origin/main` and that tip is the scaffold `0.0.81` overwrite after the `Release <version>` commit that matches `package.json`. Whether the published tarball is the release commit or that tip was not compared.
- `supervisor` history before the clone. The reflog has only the clone of `f5fc6e2`, and `package.json` says `0.0.2`, while the browser catalog says `0.0.1`. No `Release 0.0.2` line was visible.
- The dependency tree of the older versions `supervisor` pins (`contract` `0.0.17`, `database` `0.0.14`, `emitter` `0.0.10`, `process` `0.0.12`, `workflow` `0.0.18`). Only the declared ranges were read.
- `Queue.ts`’s retry function. The guide says delay is cut (`queue.md:181`). That function was not opened.
- The code path after `Run` sets recovery `'relaunch'` that calls `executor.launch` again. `reconcile`’s choice of mode was read (`Run.ts:436`); the later launch call was not.
- `@orkestrel/middleware` `createDeadline`’s timer. `src/core/deadline.ts` was not in the middleware repository at that path.
- `@orkestrel/lsp`’s `package.json` version, environments, and dependency ranges. The transport and the guide’s lifecycle paragraph were read.
- Whether any of these packages reaps a child after the parent process itself has crashed. The teardown paths read run inside the living process. `queue` `restore` and `supervisor` `reconcile` resume durable rows in a new process. No orphan-process sweep after a parent crash was read in `@orkestrel/process`.
# Ruled design: an eager, recovering `browse` on `@orkestrel/pool` 0.0.14 (revision 2)

**Lane: ruling.** The dispatch names no single lane, so this document rules on both. The objective lane covers correctness against the pool, mcp, and browser code and what their contracts permit. The subjective lane covers shape and naming. Calls that stay open are listed under Tensions.

The paths in this document follow these conventions:

- The root is `C:\Users\mikes\WebstormProjects\`.
- `pool\…` is the pool checkout at `445a4ba`. That is the review repair that followed `aea3bda` (`pool\tmp\codex\floor-fix-report.md:1`, `:55`). This revision reads `Pool.ts` there as a file.
- `mcp\…` is the mcp checkout at `94e2e09`.
- Unqualified `src\…` and `tests\…` paths are in `browser-wt-browse` at `d6937be` (branch `ccr-d15a48b1-yyyll6`, `browser\.git\worktrees\browser-wt-browse\HEAD:1`).
- Lifecycle records are under `scaffold\.orkestrel\veneer\lifecycle\`.
- W-n names workaround n of `eager\revision-3.md:271-282`. A-n, R2-n, and R3-n keep the meanings revision 3 gives them. X-n names finding n of `eager\revision-3-attack.md`.
- P-n names a finding handed to the pool review. F-n names finding n of the attack on the preceding version of this design.

## Design

### The shape

The design has these parts:

- **The pool.** `BrowserMCPServer` composes one `Pool<BrowserSlot>` with `min` equal to the size and `restarts` equal to `BROWSER_SERVER_RESTARTS`.
- **The hooks.** Browse supplies five hooks: `create` (`#warm`), `destroy` (`#destroySlot`), `validate` (a ping), `watch` (`disconnect`, or a crash of the current page), and `error` (`#fault`).
- **What the pool owns.** The warm floor, the refill, the bound, the owed attempt for a leased loss, disposal of a lost record, retention of a browser whose teardown failed, the watch signal, and the one teardown barrier.
- **What browse owns.** Only policy:
  - what a slot is, how it is built, and how it is torn down;
  - what counts as a loss;
  - the session's one held lease and the shared acquire;
  - the operation-lifecycle texts;
  - the handshake gate and the setup gate on calls;
  - the profile record, the sweep, and the shutdown recheck;
  - `BROWSE_POOL`;
  - logging.
- **What is not built.** The browse-side layer W1 to W8 (D13, `eager\design-brief.md:25`).

### Pool 0.0.14 as read, and what a review change could break

The pool is in review. A U6 or U7 case pins every behavior browse relies on, and a review change to any row reruns those units. The following table cites `pool\src\core\Pool.ts` at `445a4ba` unless it names another file:

| Behavior | Code | Browse relies on it for |
| --- | --- | --- |
| Construction creates nothing. `max` defaults to `min`, and `restarts` is required with `min`. | `:81-119` | building the pool in the constructor |
| `start()` resolves when `min` live records exist. A repeat call shares the pending promise. `destroy()` rejects it with `destroyed`. | `:149-159`, `:397-401`, `:236` | warming at setup |
| Refills create one at a time. | `:396`, `:404-405`, `:432-444`; `pool\guides\pool.md:115-116` | an onset of one launch; spares warm in sequence (T3) |
| Under `min`, a waiter never causes a create. It waits. It rejects with `cleanup` when retained records fill the floor and nothing is refilling or disposing. It rejects with `create` and the last cause when the bound is spent and no refill, disposal, or owed attempt is pending. | `:349-375` | V3; failure rows 14, 17, and 33 |
| `watch` is armed in `#insert` before the record idles. A settlement while the record is live disposes it. Disposal aborts the signal before the destroy hook runs. A rejection after the abort is ignored. | `:442-443`, `:449-464`, `:459`, `:733`, `:736`, `:745` | releasing listeners; the forced kill reads the cause recorded before disposal |
| A loss reported after disposal began, or on a retained record, does nothing. | `:470-476` | overlapping loss signals |
| A watch rejection while the record is live counts as a loss and reaches `error(error, 'watch')`. | `:458-462` | X-7 |
| `PoolToken.destroy()` disposes that exact record or shares the disposal in progress. A repeat call, or a call after release, does nothing. A failed disposal rejects with `cleanup`. | `:297-305`; `types.ts:58-65` | a failed per-call ping |
| Strikes count each failed refill and each loss of a never-leased record, including a failed validation. A grant resets the strikes. The bound is spent when strikes exceed `restarts`. | `:437-440`, `:412-414`, `:490-495`, `:594`, `:674`, `:390-392` | the crash-loop bound (T2) |
| A leased loss earns one refill, which runs even when the bound is spent. | `:477-478`, `:402-403`; withdrawn at `:482-483` (P-2) | V5 |
| Under `min`, a record whose destroy hook rejected stays counted and is never disposed again. | `:757-760`, `:722`, `:402` | V1 |
| A record that fails validation is struck and disposed, and the waiter waits for a refill. When that disposal fails, the waiter rejects with `cleanup`. While the pool ends, the record is disposed with no strike. | `:594`, `:612-629`, `:587-592` | the hand-out ping; F-7 |
| A lost record is never committed. | `:577-585`, `:652-662` | R2-9 |
| The oldest idle record is handed out first. A record that was released does not strike when lost. | `:342`, `:716`, `:491`, `:673` | the second alternative |
| `destroy()` is one barrier. It rejects with `cleanup` and `context.failures` when a failure was retained. | `:231-252`, `:817-835`; `types.ts:12-17` | the server's `destroy()` |
| `create` and `validate` take no signal. | `types.ts:89`, `:91` | passing `#abort.signal` to every launch and ping |
| A loss with no thrown cause leaves the cause undefined. | `:457`, `:594`; `pool\guides\pool.md:142-143` | `#failure` (T16) |

**P-1 is repaired.** The review ruled FAIL 8 (`pool\tmp\codex\review-floor\objective.md:49-51`). `Pool.ts:350-361` rejects such an acquire with `cleanup`. The browse fallback from the preceding version is dropped.

**P-2 (required of the pool review): a failed leased disposal can take `#owed` below 0, and later acquires park (F-1).**

- **Defect.** `#lose` credits before disposal (`:477-478`). `#fill` spends the credit when a refill starts while that disposal is still running (`:402-403`). The failed disposal then withdraws it again (`:482-483`). `#owed` reaches -1, and the spent branch needs `#owed === 0` (`:366`).
- **Breaking input.** Use `min: 2, restarts: 1`.
  1. Creates 1 and 2 succeed. `acquire()` leases A.
  2. B's watch settles. That is one strike, and refill 3 starts.
  3. `token.destroy()` runs, with A's hook held. `#owed` is 1.
  4. Refill 3 rejects. Strikes reach 2, and the bound is spent. `#fill` spends the credit on create 4, which throws.
  5. A's hook rejects. `#owed` is -1.
  6. `acquire()` parks until `destroy()`.
- **Scope.** P-2 applies at sizes 2 and 3 only. At size 1, the disposing record keeps `resources.size` at `min`, so `#fill` starts no refill during that disposal (`:402`).
- **Required.** The withdrawal never takes `#owed` below 0. This keeps the credit-before-disposal order that the writer's controls pinned (`floor-fix-report.md:19`).
- **Acceptance.**
  - The breaking sequence's acquire rejects with `create`. Without the repair, the case fails by its timeout.
  - `withdraws owed credit when leased cleanup fails` (`pool\tests\src\core\Pool.test.ts:646-665`) stays green.

### Composition

The constructor validates the size and builds the pool. Each hook is a bound method or an arrow given as a non-computed object-literal property value (`scaffold\.claude\rules\architecture.md:175`):

```ts
this.#pool = createPool<BrowserSlot>({
	create: this.#warm.bind(this),
	destroy: (slot) =>
		this.#destroySlot(slot.profile, slot.browser, slot.toolset, this.#losses.get(slot)?.cause),
	validate: this.#validate.bind(this),
	watch: this.#watch.bind(this),
	error: this.#fault.bind(this),
	min: size,
	restarts: BROWSER_SERVER_RESTARTS,
})
```

Browse never calls `release()`, `clear()`, `size`, `idle`, `active`, or `emitter`.

### Setup and the handshake (D1, D4, D8, D10)

`start()` behaves as follows:

- After `destroy()` began, `start()` rejects with `BROWSER_TOOLSET_ENDED` (`src\server\BrowserMCPServer.ts:132`; A-1).
- Otherwise it runs `this.#starting ??= this.#setup()`.

`#setup()` runs these steps in order. After every await, it returns when `#closing` is defined:

1. Attach the input `end`, `SIGINT`, and `SIGTERM` listeners (`:136-138`).
2. Call `transport.start()`.
3. Run `mkdir(ROOT/.profiles, { recursive: true })`. A rejection becomes `BROWSER_SERVER_UNAVAILABLE` carrying the cause message (A-2).
4. Start the sweep detached as `this.#sweeping = this.#sweep()`. The sweep never rejects (A-3).
5. Run `const warming = this.#pool.start().then(undefined, (error: unknown) => error)`.
6. Await `this.#grant(this.#abort.signal)`. This is the first lease, and `validate` pings it (D10). A rejection while the server is not closing becomes `BROWSER_SERVER_UNAVAILABLE` with `error.cause ?? #failure` as its message (R3-11).
7. Run `void warming.then(this.#exhaust.bind(this))`. When `pool.start()` rejected with `create`, `#exhaust` writes one `browse: BROWSER_SERVER_EXHAUSTED: …` line. That line is D10's report of a spare that failed to warm. A `destroyed` or `cleanup` outcome writes nothing.

The handshake works as follows:

- `createMCPServer` receives `handshake: this.#handshake.bind(this)` (`mcp\src\core\types.ts:2189`). `createMCPLegacy` passes it through (`mcp\src\core\factories.ts:92`).
- `#handshake(options)` awaits `this.#race(#starting, options.signal)`. When `#closing` is defined after that, it throws `BROWSER_TOOLSET_ENDED` (F-6).
- A `BrowserError` becomes `new MCPError(`${code}: ${message}`, JSONRPC_SERVER_ERROR, { code })` (`mcp\src\core\errors.ts:41`; `mcp\src\core\constants.ts:307`). `MCPLegacy` answers it under the request id with `data` (`mcp\src\core\MCPLegacy.ts:150-158`).
- An aborted request rethrows, and nothing is written (`:149`).
- Only the legacy `initialize` waits on the hook. `ping` (`:176-177`), legacy `tools/list` (`:178-179`), and modern requests (`:92-93`) answer while setup runs. The setup gate in `#serve` covers a modern `tools/call`.

### Hand-out and the lease (D7, D10)

`#race(promise, signal)` races a promise against a signal with `addAbortListener`, as `Browser.#raceAbort` does (`src\server\Browser.ts:371-386`).

`#grant(signal)` hands out the lease:

- It returns `#lease` when one is held.
- Otherwise it runs `this.#granting ??= this.#pool.acquire(this.#abort.signal).then(this.#hold.bind(this), this.#refuse.bind(this))`.
- It returns `#race(#granting, signal)`. One acquire serves concurrent calls.

`#hold(token)` takes a granted token:

- It clears `#granting`.
- When `#closing` is defined, it throws `BROWSER_TOOLSET_ENDED` without holding the token (F-6). `pool.destroy()` disposes leased records (`Pool.ts:247-249`).
- Otherwise it sets `#lease`, adds a dispatcher for each adopted tool outside the vocabulary, subscribes the `add`, `remove`, and `clear` listeners (`src\server\BrowserMCPServer.ts:244-248`, `:263-268`), and returns the token.

`#refuse(error)` clears `#granting` and rethrows.

`#serve(signal)` runs once per call and never loops (X-4):

1. When `#closing` is defined, it throws `ENDED`.
2. It awaits `#race(#starting, signal)` (F-2). `#starting` is always defined here, because only `#setup` starts the transport. A rejected setup refuses the call with that rejection, so a modern client meets the onset refusal at its first `tools/call`. It then checks `#closing` again.
3. When a lease is held, it pings that browser under `AbortSignal.any([signal, #abort.signal])`.
   - An abort rethrows its reason.
   - When the ping resolves and `#lease` is unchanged, it returns the slot.
   - Any other rejection calls `#lose(slot, error)`.
4. It runs `const token = await #grant(signal)`. A rejection is classified through `isPoolError` (R2-13):
   - `create` and `cleanup` become `UNAVAILABLE` with `error.cause ?? #failure`.
   - `destroyed` and the server's abort become `ENDED`.
   - A `BrowserError` passes through.
5. When `#lease !== token`, the slot was lost between the grant and the return. The call did not run, so it answers `UNAVAILABLE` naming `#losses.get(token.value)?.cause`.

A call makes at most one per-call ping and at most one acquire.

`#validate(slot)` pings under `#abort.signal` with the browser's command deadline (R2-10):

- A resolved ping returns true.
- An abort returns false.
- Any other rejection calls `#lose(slot, error)` and returns false.

### The watch (D2, D7, V4)

`#watch(slot, signal)` stores a `BrowserSlotWatch` in `#watches: Map<BrowserSlot, BrowserSlotWatch>`. The watch holds these listeners:

- `disconnect`, bound as `this.#disconnect.bind(this, slot)` and subscribed on `slot.browser`;
- `page`, bound as `this.#track.bind(this, slot)` and subscribed on `slot.context` (`src\core\types.ts:1618`);
- `crashes`, a `ReadonlyMap` from each page in `slot.context.pages()` (`:3424-3434`) to the listener `this.#createCrash(slot, page)` returns. A returned function is admitted by `architecture.md:175`. `crash` carries no payload (`src\core\types.ts:1084`), so each page needs its own listener.
- `abort`, the `Disposable` that `addAbortListener(signal, this.#unwatch.bind(this, slot))` returns.

When `#track` sees a later page, it subscribes that page's listener and replaces the `#watches` entry with a copy whose `crashes` is a fresh map that includes the page (F-3; `scaffold\.claude\rules\typescript.md:27`).

The watch settles only on a loss:

- **`disconnect`.** The cause is a process exit when `browser.pid === undefined`, because an exit clears the pid (`src\server\Browser.ts:396-398`). Otherwise the cause is a transport loss (`:444-475`).
- **`crash` of the current view.** The crashed page must be `slot.toolset.view` when the event arrives (`src\core\BrowserToolset.ts:362-364`, `:539-541`). A background tab's crash does nothing.
- **A browser that is not connected at arming.** The watch settles at once.

A loss runs `#report(slot, cause)`, which calls `#unwatch(slot)`, then `#lose(slot, cause)`, and then resolves `loss` with the cause.

`#unwatch(slot)` removes every listener and deletes the entry. When the signal aborts, the watch only unwatches and never settles (R2-7). The watch never rejects (X-7). A defect still reaches `#fault` through `Pool.ts:458-462`. The emitter takes no signal, and `on` returns nothing (`node_modules\@orkestrel\emitter\dist\src\core\index.d.ts:71-73`), which is why the watch keeps its listener references.

### Loss and the operation lifecycle

`#lose(slot, cause)` returns at once when `#closing` is defined or `#losses.has(slot)`. Otherwise it runs these steps:

1. It records `#losses.set(slot, { cause, url })` with the view's last URL (`src\core\BrowserFrame.ts:84`), and sets `#failure = cause`.
2. When the slot is the lease, it does the following in order:
   1. unmirrors the lease's manager (X-5);
   2. removes every dispatcher outside the vocabulary;
   3. clears `#lease` and sets `#notice = slot`;
   4. calls `token.destroy()` and drops its rejection. The pool keeps the hook's failure for its barrier (`Pool.ts:757-760`, `:833`).
3. For any other slot it does nothing more. The watch settlement or the failed validation disposes that slot.

The operation lifecycle follows `reliability-assessment.md:116-122`, `:203-217`, and `:249-267`:

- **The post-failure ping.** `#forward` records the slot each call ran on. A tool failed when it threw or answered `success: false`. When it failed, the slot is still the lease, and the call's signal has not aborted, `#forward` pings that browser under `AbortSignal.any([context.signal, #abort.signal])` (R3-1). A rejection that is not an abort calls `#lose`.
- **An interrupted call.** When `#lease?.value !== slot`, the call answers `BROWSER_SERVER_UNRESOLVED: …`, built from `#losses.get(slot)` by `describeBrowserServerLoss`. The text states these facts:
  - the cause;
  - that the outcome is unknown;
  - what was lost: the page at its last URL, its tabs, every element reference, the retained reading, dialogs, holds, an unsaved recording, the active replay, and the isolated context's cookies;
  - that browse did not repeat the call;
  - that the next call acquires a browser that starts at `about:blank`, or answers `BROWSER_SERVER_UNAVAILABLE` when none can serve (F-9).
- **A success.** A call that succeeded keeps its success (R2-9).
- **The note.** `BROWSER_SERVER_CRASH: …` prefixes the next string outcome of a call that ran on a slot other than `#notice`, and that outcome clears it. A value that is not a string leaves the note pending. A refusal carries the note and clears it (A-23).
- **No repeats.** Browse never repeats a call.

### Create: `#warm()`

`#warm()` builds one slot in these steps:

1. When `#closing` is defined, it refuses with `ENDED` before any `mkdir` (F-7). When `#stranded` is defined, it refuses with `BROWSER_SERVER_TEARDOWN`, naming the stranded pid when the failure carries one.
2. It runs `mkdir(ROOT/.profiles/<pid>-<uuid>)` exclusively. That is the form `parseBrowserLockEntry` reads (`src\server\helpers.ts:59-65`).
3. It launches as `src\server\BrowserMCPServer.ts:222-231` does, with `signal: #abort.signal`, then awaits `browser.connect()`.
4. When `pid` and `endpoint` are both defined, it writes `browse.json.tmp` and renames it to `browse.json` (A-20).
5. It runs `browser.isolate({ reference: this.#reference })`, which uses the server's one counter across contexts (A-8).
6. It runs `context.create()`, then `createBrowserToolset(page, { context, journeys })` (`:236-243`), then awaits `toolset.start()`.
7. It returns `{ browser, profile, context, toolset }`.

A failed warm never leaves an armed watch, because the pool arms the watch only after `#warm` resolves (`Pool.ts:442`).

**Failure path.** `#warm` calls `#destroySlot` with whatever it built (A-22) and rethrows the launch failure.

**A stranded launch.** When the failure path's teardown rejects, a process might live that the pool cannot count. `#warm` records `#stranded = error`, and every later `#warm` refuses before it launches. The pool strikes each refusal until the bound is spent (`Pool.ts:437-440`).

### Teardown: `#destroySlot(profile, browser?, toolset?, cause?)`

Each step runs whatever the other steps did:

1. **Forced kill.** When `isCDPTimeoutError(cause)` (`src\core\errors.ts:186`) and `browser?.pid` is defined, send `SIGKILL`. `ESRCH` is ignored, and any other failure goes to `#faults` (R3-6).
2. **Toolset.** Destroy the toolset when one exists. This runs before the browser, so a replay writes its run while the manager stands (`src\core\BrowserToolset.ts:2090-2093`; R2-8). A failure goes to `#faults`.
3. **Browser.** Destroy the browser when one exists, and keep any rejection. When the server is not closing, a rejection writes one `browse: BROWSER_SERVER_TEARDOWN: …` line, naming the pid from the error's context (`src\server\Browser.ts:1141-1143`).
4. **Profile.** When step 3 resolved, or no browser exists, run `rm(profile, { recursive: true, force: true, maxRetries: 5 })`. A failure goes to `#faults` and never rejects the hook, because a rejection would retain the record (`Pool.ts:757-760`).
5. **Rethrow.** Rethrow step 3's failure.

`Browser.destroy()` settles a pending exit first, because `#destroyResources` awaits `#settle()` (`src\server\Browser.ts:843`, `:909-913`; R3-15).

### Closing and the server's `destroy()` (D8; R2-6, R3-8, R3-9)

`destroy()` runs `this.#closing ??= Promise.resolve().then(this.#destroy.bind(this))`, so `#closing` is assigned in the call's own turn.

`#destroy()` runs these steps:

1. **First turn, before any await.** Remove the signal and input listeners. Stop the transport, which is synchronous (`src\server\BrowserMCPServer.ts:151`). Remove the dispatchers and unmirror the lease. Then abort `#abort` and call `pool.destroy()` in the same turn, keeping its promise (F-7).
   - The abort ends launches, pings, the shared acquire, and the sweep's attaches.
   - The barrier rejects `start()` and the waiter with `destroyed` (`Pool.ts:236-242`) and disposes every record that is not validating (`:247-249`).
   - A validation in flight ends in disposal with no strike (`:587-592`).
2. Await `#starting` and ignore its rejection.
3. Await the barrier. Keep `context.failures` of its `cleanup` error.
4. Await `#sweeping`.
5. **Shutdown recheck (A-4, F-8).** List `.profiles`. Check each folder the sweep kept and each `<process.pid>-` folder that remains, using the sweep's folder rule without the attach:
   - remove the folder when its `browse.json` is missing or names a pid that `probeProcess` reports gone;
   - keep it otherwise.

   A failure goes to `#faults`.
6. Throw an `AggregateError` of the barrier's failures, `#stranded`, and `#faults`, deduplicated by identity.

`#end` handles the input's end and both signals:

- It returns when `#closing` is defined.
- Otherwise it calls `destroy()` and handles a rejection with a bound method. That method sets `process.exitCode = 1` and writes one `TEARDOWN` line (A-5).

### The sweep

The sweep visits each `.profiles` entry whose `parseBrowserLockEntry` pid is neither `process.pid` nor alive, and applies this folder rule:

- **A record with a live pid.** Attach with a bare `CDPClient` and send `Browser.close` under `#abort.signal`, as `Browser.#closeRemote` does (`src\server\Browser.ts:922`; R2-11). Then remove the folder when `probeProcess(pid)` is false, and keep it otherwise.
- **No record.** Remove the folder.
- **A record read that fails with anything but `ENOENT`.** Keep the folder (X-6).

A failed `.profiles` read writes one `SWEEP` line and ends the sweep. The sweep never rejects.

### Logging

`#write(line)` is the only writer to `log`. A throw goes to `#faults` (X-6, R3-7).

### The ceiling and the bound (D6, D8, Q3)

**The ceiling holds.** The browsers that might be alive never exceed the size, for these reasons:

- The pool creates only while `resources.size < min`, and one create runs at a time (`Pool.ts:396`, `:402`).
- A record stays counted until its hook settles (`:760`).
- A retained record stays counted (`:757-758`).
- A stranded launch refuses every later launch.

**The bound.** `BROWSER_SERVER_RESTARTS` is 1, reasoned from the case, and M9 informs it:

- A deterministic cause fails its one retry, so a missing executable costs exactly 2 launches.
- A transient cause clears on the retry.
- A bound of 0 would retire a spare at its first idle death.
- A higher bound multiplies the cost of a deterministic failure on hosts that "do not take heavy load well" (D6).

Between two grants, the pool allows `restarts` + 1 strikes, plus one owed attempt for each leased loss. Grants happen only at setup and after a leased loss. No background loop runs.

The following table gives the failed launches with `restarts: 1`:

| Input | Size 1 | Size 2 | Size 3 |
| --- | --- | --- | --- |
| Every create fails at start | 2; `start()` and `initialize` refuse | 2 | 2 |
| Only the spares' creates fail at start | none | 2, 3, or 4, depending on where the session's grant lands (F-5); one `EXHAUSTED` line; serves on 1 | the same as size 2; the third slot is tried only after a grant reset |
| The lease is lost, and every later create fails | 2; the next call answers the note, then `UNAVAILABLE` | the session takes the spare; 2, 3, or 4, depending on where that grant lands | the same as size 2 |
| A spare is lost, and every later create fails | none | 1 relaunch; no line (T4) | 1 relaunch |
| The lease is lost with the bound spent | exactly 1 owed attempt | exactly 1 owed attempt; the next grant re-arms the bound | the same as size 2 |

### Fields

The following table lists the fields after the change:

| Field | Role |
| --- | --- |
| `#pool` | the mechanism |
| `#lease: PoolToken<BrowserSlot> \| undefined` | the session's held token (V6) |
| `#granting` | one acquire shared by concurrent calls |
| `#watches: Map<BrowserSlot, BrowserSlotWatch>` | the watch listeners |
| `#losses: WeakMap<BrowserSlot, { readonly cause: unknown; readonly url: string }>` | the loss texts and the forced kill |
| `#notice: BrowserSlot \| undefined` | the pending `CRASH` note (A-15) |
| `#failure` | the last loss cause, used when the pool's cause is undefined (T16) |
| `#stranded` | the teardown failure of a failed launch |
| `#faults` | toolset, `rm`, kill, log, recheck, and watch-defect failures |
| `#starting`, `#sweeping` | setup (which also gates calls) and the sweep |
| `#references` and `#reference` | the shared reference counter and its bound issuer (A-8) |
| `#log`, `#closing`, `#abort`, and the bound listeners | kept |

These fields are deleted:

- `#session`, `#browser`, `#profile`, and `#started` (`src\server\BrowserMCPServer.ts:85-88`);
- `#mirrored`, which is derived from `#lease` (X-5). `#withdraw` reads `this.#lease?.value.toolset.tools`.

### Rulings on the brief's questions 1 to 8

**1. Where the launch starts, and what the handshake does meanwhile.**

- **Where.** In `start()`, through `#setup`, which runs `pool.start()` beside the sweep.
- **What waits.** `initialize` and every `tools/call` wait for the session's first validated lease (D10).
- **A failed setup.** Each surface reports it differently (A-18):
  - `initialize` answers `-32000` with `BROWSER_SERVER_UNAVAILABLE: <cause>` and `data: { code }`;
  - `ping` answers `{}`;
  - `tools/list` answers the vocabulary;
  - every `tools/call` from a legacy or modern client answers `isError` text that opens with `BROWSER_SERVER_UNAVAILABLE:` (F-2);
  - `start()` rejects, `main.ts` prints one line and sets exit code 1 (`src\bin\main.ts:31-33`), and the process exits after its input ends.
- **The code token.** The message carries the cause only, and each surface adds `CODE: ` one time (A-19).
- **Client budgets.** Claude Code allows 30 s and connects in the background. Codex allows 10 s. Cursor documents no budget (`eager\clients.md:18-20`).

**2. Crash detection.** No timer runs (D10; `scaffold\AGENTS.md:68`). Each fault has its signal:

- The watch reports an exit, a socket drop, or a crash of the current view.
- A browser that stops answering fails the hand-out ping or the per-call ping. Each is bounded by the command deadline (`src\core\CDPClient.ts:134-145`).
- When a tool fails before the loss signal arrives, the post-failure ping classifies it (R3-1).
- A hung or early-crashed view is not detected (T19).

**3. Recovery.**

- **What is rebuilt.** The pool refills a fresh slot: a process, a `<pid>-<uuid>` profile, an isolated context on the shared counter, a page at `about:blank`, and a started toolset with its journey toolset. The stores reopen on the same root.
- **How the agent learns.** `UNRESOLVED` for an interrupted call, and the `CRASH` note otherwise.
- **The last address.** Not restored: restoring could repeat side effects, and it is product policy (`scaffold\AGENTS.md:67`).
- **The crash loop.** The bound ends it.
- **Profiles.** The teardown, the sweep, and the shutdown recheck clean them up. Bare `.profiles/<uuid>` folders stay, and the guide names a one-time removal (D10).

**4. The pool.**

- **Shape.** `Pool<BrowserSlot>` with `min` equal to `max` equal to the size.
- **Liveness.** Events plus pings.
- **Work in flight on a browser that dies.** It answers `UNRESOLVED`.
- **The lease.** The session holds one token across calls. A loss destroys that token, and the next call acquires again.
- **Balancing.** Failover only (D10). The pool hands out its oldest idle record. Parallel holders are browser item 14.
- **Second process or second context.** A second process, because a context dies with its process.
- **When browsers start.** Every browser starts at `start()`, one after another (T3). M4 measures the idle cost.
- **Default size.** 1 (D10).

**5. Placement.**

- **Library:**
  - `Browser.endpoint`, `Browser.ping()`, and the port-probe fix;
  - `BrowserContextOptions.reference`;
  - `probeProcess`, `parseBrowserProfileRecord`, and `describeBrowserServerLoss`;
  - `BrowserProfileRecord`, `BrowserSlot`, and `BrowserSlotWatch`.
- **Server-private:** the hooks, the sweep, the recheck, the handshake mapping, the texts, and the pings.
- **Bin:** `BROWSE_POOL`.
- **No switch to turn off the eager start** (D1).

**6. Proof.**

- Real Chromium runs in `tests\service\browse.test.ts`, which this change adds. Crashes are real: `process.kill(pid)`, CDP `Page.crash` from a second client, and `SIGSTOP` on POSIX.
- `src:server` covers the wiring with launch doubles over the real Pool 0.0.14 and the real `CDPClient` on the test transport. The double's `drop()` reproduces the real event order (`scaffold\.claude\rules\tests.md:32`).
- `tests\service\browser.test.ts` keeps one launch per test. A shared test browser is later work.

**7. Tests outside `browse`.** None in this change:

- `PLAYWRIGHT_WS_ENDPOINT` needs a Playwright `launchServer` browser, and browse's Chromium speaks CDP only (`eager\map.md:132`, `:138`).
- The probe measured no end-to-end gain (`status.md:19`).
- `endpoint` enables a later CDP attach.

**8. Probe.**

- **What carries over:** the `handshake` hook; the composition (`min`, `restarts`, `start()`, `watch`, `validate`, `acquire()`, `PoolToken.destroy()`); one setup place; one teardown hook.
- **Prerequisites:** probe re-pins contract, because probe pins `^0.0.18` (`probe\package.json:95`) and pool pins `^0.0.19` (`pool\package.json:72`). D11 gives the dependency request.

### Type sketches

The pool sketch shows 0.0.14 as built (`pool\src\core\types.ts:50-156`), used as is:

```ts
// createPool<BrowserSlot>({ create, destroy, validate, watch, error, min, restarts })
// used: start(), acquire(signal), destroy(); PoolToken: value, destroy(); isPoolError
```

The mcp sketch shows 0.0.36 as built (`mcp\src\core\types.ts:1770`, `:2189`, `:2346`):

```ts
export type MCPHandshakeHandler = (options: MCPMethodOptions) => Promise<void>
// MCPServerOptions.handshake?, MCPLegacyOptions.handshake?, MCPServerInterface.handshake
```

The browser sketch shows 0.0.23:

```ts
// src/server/types.ts
export interface BrowserInterface {
	/** Reports the CDP WebSocket endpoint of the represented session, or undefined when none is. */
	readonly endpoint: string | undefined
	/** Sends CDP `Browser.getVersion` and resolves when the browser answers, changing no state. */
	ping(options?: BrowserCallOptions): Promise<void>
}

/** Names the browser a browse profile serves, which a later start's sweep reads. */
export interface BrowserProfileRecord {
	readonly pid: number
	readonly endpoint: string
}

/** Holds one warm browser a browse server owns: the browser, its profile, its isolated context, and its started toolset. */
export interface BrowserSlot {
	readonly browser: BrowserInterface
	readonly profile: string
	readonly context: BrowserContextInterface
	readonly toolset: BrowserToolsetInterface
}

/** Holds the listeners one slot's loss watch installed, which it removes when it settles or its signal aborts. */
export interface BrowserSlotWatch {
	readonly loss: PromiseWithResolvers<unknown>
	readonly disconnect: () => void
	readonly page: (page: BrowserPageInterface) => void
	readonly crashes: ReadonlyMap<BrowserPageInterface, () => void>
	readonly abort: Disposable
}

export interface BrowserMCPServerOptions {
	// root, headless, executable, readonly, launch, stdio unchanged
	/** `size`: the browsers kept warm, 1 through `BROWSER_SERVER_POOL_LIMIT`. Default: `BROWSER_SERVER_POOL_SIZE` */
	readonly pool?: { readonly size?: number }
	/** The stream the server writes its diagnostic lines to. Default: `process.stderr` */
	readonly log?: NodeJS.WritableStream
}

export interface BrowserMCPServerInterface {
	/**
	 * Serves stdio, sweeps the profiles ended servers left, warms the pool, and resolves after the
	 * session leases a warm browser; the legacy handshake and every tool call await the same setup.
	 * Rejects with `BROWSER_SERVER_UNAVAILABLE` when no browser can serve and with
	 * `BROWSER_TOOLSET_ENDED` after `destroy()`, and resolves when `destroy()` interrupts setup.
	 */
	start(): Promise<void>
	/** Stops admission, tears down every browser, its toolset, and its profile, then rechecks the folders left behind. */
	destroy(): Promise<void>
}

// src/core/types.ts
export interface BrowserContextOptions {
	/** Names each element reference the context's pages issue. Default: a counter the context owns. */
	readonly reference?: BrowserReferenceFunction // existing type, src/core/types.ts:2509
}
```

Each further declaration goes in its kind file:

- **Constants** (`src\server\constants.ts`): `BROWSER_SERVER_POOL_SIZE = 1`, `BROWSER_SERVER_POOL_LIMIT = 3`, `BROWSER_SERVER_RESTARTS = 1`, and `BROWSER_SERVER_RECORD = 'browse.json'`.
- **Helpers** (`src\server\helpers.ts`):
  - `probeProcess(pid): boolean`, false only on `ESRCH`;
  - `parseBrowserProfileRecord(text)`;
  - `describeBrowserServerLoss(code, cause, url)`, which names the pid a cause carries in its context.
- **Codes:** `BROWSER_SERVER_UNAVAILABLE`, `_CRASH`, `_UNRESOLVED`, `_EXHAUSTED`, `_TEARDOWN`, `_SWEEP`, and `_OPTIONS`, beside the existing `_ENVIRONMENT`.

### State machine

Each slot's state is derived, never stored:

- `warming`: a refill's `#warm` runs.
- `ready`: the record is idle.
- `validating`: the hand-out ping is in flight.
- `leased`: `#lease.value` is the slot.
- `lost`: `#losses.has(slot)`, and disposal began.
- `gone`: the hook resolved.
- `retained`: the hook rejected.
- `stranded`: a failed create's teardown rejected.

The server's state is derived the same way:

- `starting`: `#starting` is pending.
- `refused`: `#starting` rejected. Every call answers that rejection.
- `serving`: `#lease` is defined.
- `recovering`: no lease is held and the server is not closing.
- `spent`: seen only as a `create` rejection.
- `closing`: `#closing` is defined.

The following table gives each transition:

| From | Event | To | Action |
| --- | --- | --- | --- |
| (none) | `start()` | warming | `#setup`; `pool.start()` refills one record at a time (`Pool.ts:149-159`, `:394-444`) |
| starting | `#setup` rejects | refused | `start()` rejects; `initialize` and every call answer the rejection |
| warming | `#warm` resolves | ready | the pool inserts the record, arms `watch`, and idles it (`:442-443`) |
| warming | `#warm` rejects | (none) | the pool strikes and refills unless the bound is spent (`:437-440`) |
| warming | `#warm` fails, and its teardown rejects | stranded | `#stranded`; one `TEARDOWN` line; later creates refuse |
| ready | the session's acquire assigns the record | validating | `validate` pings |
| validating | the ping resolves | leased | the pool commits and resets strikes (`:672-675`); `#hold` sets `#lease` and mirrors |
| validating or ready | the ping rejects, or the watch settles | lost | `#lose` records the loss; the pool strikes and disposes (`:594`, `:612-629`, `:457`) |
| leased | the per-call ping rejects, a failed call's ping rejects, or the watch settles | lost | `#lose` unmirrors, clears `#lease`, sets `#notice`, and calls `token.destroy()`; the owed credit applies (`:477-478`) |
| lost | the hook resolves | gone | the pool deletes the record and refills (`:760`, `:767`) |
| lost | the hook rejects | retained | the pool keeps the record counted (`:757-759`); one `TEARDOWN` line |
| any | `destroy()` | (released) | the closing sequence, including the shutdown recheck |

### Failure table

The following table gives each failure, its signal, the action, and what the caller sees:

| # | Failure | Signal | Action | Caller sees |
| --- | --- | --- | --- | --- |
| 1 | Chromium cannot start at setup | `#warm` rejects twice | the pool's bound; `start()` and the acquire reject `create` | `initialize` gets `-32000` with `BROWSER_SERVER_UNAVAILABLE: <cause>` and `data.code`; every `tools/call` gets the same code; one stderr line; exit 1 after the input ends |
| 2a | The root is unusable | `mkdir` rejects | `UNAVAILABLE`; no `pool.start()` (A-2) | as row 1, with no launch; a modern call answers instead of parking (F-2) |
| 2b | The `.profiles` read fails | the sweep catches it | one `SWEEP` line | nothing at onset |
| 3 | A spare cannot start | its creates reject | `start()` rejects; one `EXHAUSTED` line | nothing; fewer browsers serve |
| 4 | Another Chrome answers on 9222 | none after U2 | no port probe without `cdp.port` | nothing |
| 5 | An idle spare exits | its watch | the pool strikes, disposes, and refills within the bound | nothing |
| 6 | The leased process exits between calls | its watch | `#lose`, `token.destroy()`, the owed refill | the next call runs on the spare, or waits for the successor at size 1, and opens with `BROWSER_SERVER_CRASH:` naming the URL |
| 7 | The leased process exits during a call | the call's requests reject (`src\core\CDPClient.ts:288-297`), then the post-failure ping rejects | as row 6 | `BROWSER_SERVER_UNRESOLVED:`; a call that succeeded keeps its success |
| 8 | The socket drops while the process lives | the post-failure ping rejects at once (`src\core\CDPClient.ts:118-120`) | as row 6; the hook terminates the process | as row 7 |
| 9 | The current view's renderer crashes | `crash` on `toolset.view` | as row 6 | as rows 6 and 7 |
| 9b | The view crashed during `#warm`, before the watch armed | none | none (T19) | each call on that browser fails with the page's error |
| 10 | A background tab crashes | `crash` on another page | none | `tabs` lists it |
| 11 | The lease hangs between calls | the per-call ping rejects with `CDPTimeoutError` | `#lose`; `SIGKILL` in the hook; the owed refill | that call waits one deadline (plus a launch at size 1), then runs with the note |
| 11b | The lease hangs during a call | the tool's deadline, then the post-failure ping's deadline | as row 11 | `UNRESOLVED` after two deadlines (M5) |
| 12 | An idle spare hangs | `validate` times out | strike; `SIGKILL` when a pid exists; the waiter waits for a refill | the hand-out takes one deadline longer |
| 13 | The renderer hangs while the browser answers | the call's own deadline; the post-failure ping resolves | none (T19) | that call's timeout text, on every call |
| 14 | The lease's termination is unconfirmed | the hook rejects | the pool retains the record, and no successor launches; one `TEARDOWN` line | size 2: the call runs on the spare. Size 1: the note, then `UNAVAILABLE` naming the pid (`Pool.ts:350-361`). `destroy()` rejects; exit 1 |
| 15 | `rm` fails past its retries | `rm` rejects | `#faults`; the successor still warms | as the end of row 14 |
| 16 | The bound is spent while a browser serves | the pool stops refilling | the next grant re-arms the bound (`:674`) | nothing (T4) |
| 17 | Every browser is gone, and the bound is spent | the acquire rejects `create` (`:362-373`) | refuse | each call: a pending note, then `UNAVAILABLE` with `error.cause ?? #failure` |
| 18 | The server is killed | none in the process | the next start's sweep closes the browser | nothing; the orphan lives until then (M6) |
| 19 | The server is killed between spawn and rename | no record | the sweep removes the folder; a Windows lock refuses it | an orphan might run |
| 20 | Input end, `SIGINT`, or `SIGTERM` during setup | the listeners attach first | `destroy()` aborts and calls `pool.destroy()` in one turn | `start()` resolves; exit 0 |
| 21 | The client's startup timeout passes | the client's own | as row 20 when the client closes the input (U11) | the client's display |
| 22 | Concurrent first calls | the shared `#granting` | one lease | every call runs on one browser |
| 23 | Exit, socket loss, and crash overlap | the first settles | the `#losses.has` guard and the pool's guard (`:470-476`) | one loss, one successor |
| 24 | A browser dies between create and grant | its watch | the pool never commits a lost record (`:652-662`) | nothing |
| 25 | `destroy()`, then `start()` | `#closing` | `start()` rejects `ENDED` | nothing attached or launched |
| 26 | `start()` and `destroy()` in one turn | `#closing` checked after `mkdir` | no `pool.start()`, no sweep | both settle; nothing launched |
| 27 | The bound is spent while one create runs | the pool waits for `!refilling` (`:364`) | the waiter stays | `initialize` answers when that create succeeds (R2-4) |
| 28 | A leftover browser hangs during the sweep | the attach parks | off the handshake path; `#abort` ends it | nothing |
| 29 | The lease and a spare are lost in one turn | either order | the owed credit survives (`:477-478`, `:402-403`) | the next call runs on the successor with the note |
| 30 | A call fails for its own reason on a live browser | the post-failure ping resolves | none | the plain failure text |
| 31 | A launch fails, and its teardown fails | `#warm`'s cleanup rejects | `#stranded`; later creates refuse | as row 1 or row 3; `destroy()` reports it |
| 32 | The hand-out ping fails, and that teardown fails | the acquire rejects `cleanup` (`:614-623`) | none | that call: the note, then `UNAVAILABLE`; the next call acquires again |
| 33 | At size 2 or 3, the lease's teardown fails while the refill it paid for runs | the hook rejects | retained; with P-2 repaired, the acquire rejects `create` | the note, then `UNAVAILABLE`. Without P-2, every call parks |
| 34 | A grant lands after `destroy()` began | `#hold` checks `#closing` | `#hold` throws `ENDED`; the barrier disposes the record (F-6) | `ENDED` |
| 35 | `destroy()` lands during a hand-out ping | the ping aborts | disposal with no strike and no refill (F-7) | nothing |

### Roadmap texts

In item 14, `LINE` stands for the line number U13 reads from the landed file.

**Browser item 13**, which U5 pastes and U13 removes:

```markdown
- **13.** Start `browse`'s browsers at server start and replace one that dies: `start()` (`src/server/BrowserMCPServer.ts:131-139`) serves stdio and launches nothing, the first tool call launches one Chromium (`#open` and `#launch`, `:199-260`), a fulfilled launch stays in `#session` (`:85`, `:199-209`) after its browser exits, and nothing subscribes to the browser's `disconnect`, so a crashed browser leaves every later call on a dead page. Declare `@orkestrel/pool` `^0.0.14` and compose one pool of `BrowserSlot` records with `min` equal to the size, a `restarts` bound, a `watch` on each browser's `disconnect` and its current page's `crash`, and a ping as `validate`; start it beside a sweep of the profiles a killed server left; gate `initialize` and every tool call on the session's first lease, through `@orkestrel/mcp` 0.0.36's `handshake` hook for `initialize`; ping the held lease before every call and after a failed one, and destroy its token on a failed ping; answer a call its browser's loss interrupted with `BROWSER_SERVER_UNRESOLVED` and never repeat it. Keep the size at 1 until the user rules on the spare's measured value (D3, D10, 2026-10-03).
```

**Browser item 14**, which U13 pastes:

```markdown
- **14.** Let `browse` serve a second holder at the same time: the session holds one token across calls (`#lease`, `src/server/BrowserMCPServer.ts:LINE`) and concurrent calls share one acquire (`#granting`, `:LINE`), so every other warm browser waits idle in the pool for failover only, and a replay runs on the session's browser. After the user rules that failover is proven (D10, 2026-10-03), give each holder its own token from `pool.acquire()`, rule whether a holder that ends releases its browser to the next holder or destroys it for a clean page, keep the holders within the size, rule with `@orkestrel/pool` whether a floor that retained records fill refuses a waiter while another holder's live lease could be released (pool 0.0.14 refuses it), and measure the contention on the target host before raising the default.
```

**The sentence U15 appends to probe item 1** (`probe\ROADMAP.md:5`):

```markdown
Build it on `@orkestrel/pool` 0.0.14 as `@orkestrel/browser`'s `browse` server does: one pool per stage with `min: 1` and a `restarts` bound, `start()` at server start, `create` constructing the stage (`src/server/Probe.ts:137-139`), `destroy` calling the stage's own (`:545`), `watch` settling on the Oxlint client's `exit` (`src/server/stages/LintStage.ts:156`), `validate` where a stage can answer a liveness check, `acquire()` for each `prove`, and the leased token's `destroy()` in place of the deadline recycle (`#recycle`, `src/server/Probe.ts:536-575`); re-pin `@orkestrel/contract` to `^0.0.19`, because pool pins it, and declare pool on the user's request of 2026-10-03.
```

### Map: workarounds and findings, and where each went

The following table maps each revision 3 workaround to the pool member that replaces it (`Pool.ts` at `445a4ba`):

| Revision 3 | Replaced by |
| --- | --- |
| W1: the owner acquire loop (`#fill`, `#filling`, `#receive`, `#refuse`, pass sizing) | `min`, `start()`, and the refill (`:149-159`, `:394-444`) |
| W2: loss observation (`#watches` controllers, `#lost` as a marker) | `watch(value, signal)` with the pool's controller (`:449-464`, `:733`); browse keeps only the listener map |
| W3: disposing a chosen record (release, then `clear()` or a refusing `#validate`, and the idle drain) | `PoolToken.destroy()` and disposal driven by `watch` (`:297-305`, `:469-488`) |
| W4: `#survivors` and the subtraction from `k` | retention under `min` (`:757-760`, `:402`) and the `cleanup` refusal (`:350-361`) |
| W5: `#strikes`, `#owed`, and the loop's bound | `restarts` (`:390-392`, `:437-440`, `:490-495`) and the owed credit (`:477-478`, `:402-403`), after P-2 |
| W6: `#spares`, `#change`, `#wake`, `#promote`, `#granted` | the idle list and `acquire()` with `validate` as the ping (`:340-375`, `:567-630`) |
| W7: `#lease` beside `#spares` | `#lease` stays as the session's token (V6) |
| W8: the commit order at sizes 2 and 3 | moot: one create at a time (`:396`) and one waiter |
| `#lost` as a marker | the pool's guards (`:470-476`, `:577-585`, `:652-662`) |
| `#lost` as the loss text and the forced-kill cause | browse policy, `#losses` |
| `#serve`'s repeat loop | one ping and at most one acquire (X-4) |
| `#mirrored` | derived from `#lease` (X-5) |

The following table maps each attack finding to where it went:

| Findings | Where |
| --- | --- |
| F-1 owed underflow; stale citations | P-2 for the pool review; the table re-cited at `445a4ba`; the P-1 fallback dropped |
| F-2 a call after a failed setup parks | `#serve` step 2; the U6 unusable-root case |
| F-3 mutable `Map` in a public type | `crashes: ReadonlyMap`, replaced per page |
| F-4 the `version` handler cannot tell pings apart | U2's `version(call)` option; U6 and U7 cases resolve call 1 |
| F-5 grant-reset count | count table "2, 3, or 4"; U6 pins 5 launches |
| F-6 closing gaps | `#hold` and `#handshake` throw `ENDED`; rows 34 and 20 |
| F-7 closing window | `pool.destroy()` in the abort's turn; `#warm` refuses first; row 35; U6 case |
| F-8 retained folders at shutdown | the shutdown recheck; U7 survivor case |
| F-9 a false `UNRESOLVED` sentence | the conditional sentence |
| F-10 hung or early-crashed view | T19; rows 9b and 13; Risks |
| F-11 citations | corrected in Constraints and U2 |
| F-12 a pid assertion on a pid-less double | U7 stranded case asserts code and cause |
| F referrals | `describeBrowserServerLoss` (ruled); item 14 clause; T2 |
| V1 to V5 | pool members; U6 and U7 pin them |
| X-1 SSE session mint | done in U1 (`mcp\src\server\middlewares.ts:219-221`) |
| X-2, and the `design.md:6` U8 repair | U7 V4 cases through `validate` and `token.destroy()`; browse has no `clear()` path |
| X-3, and the `design.md:7` U8 repair | U7 keeps the unmirror case as hygiene, with no fails-without claim |
| X-4 to X-12 | `#serve` bound; derived `#mirrored`; `#write` and `ENOENT`; the watch's rejection path; the `0o300` fixture; `SIGTERM` timing; the killed-server control; the silent spare; the `mkdir` code probe (U6, U7) |
| X referrals | `describeBrowserServerLoss` (U4); `restarts` from the pool; `BrowserSlotWatch` (U7); the U2 precondition; D13 settles D12's move |
| R3-1, R3-4, R3-6, R3-9 to R3-13, R3-15 | carried: post-failure ping; `BrowserSlot.context`; pid guard; synchronous `#closing`; unmirror in `#lose`; `#failure` and the pid from context; rows 2a and 2b; `waitForProcessExit`; `#settle` order |
| R3-2, R3-3, R3-5, R3-7, R3-8 | moot: no browse loop |
| R3-14 | T10 |
| R3-16 | U2 precondition |
| R2-1 to R2-5 | the pool's owed credit; no create for a waiter; no browse loop; `!refilling`; retention plus `#stranded` |
| R2-6 to R2-15 | carried as listed in the preceding version |
| A-1 to A-31 | carried as revision 3 maps them (`eager\revision-3.md:1243-1273`); A-4 widened by F-8; A-6 is the pool's bound; A-22 is `#warm`'s failure path plus `#stranded`; A-26 is `#unwatch` |

## Alternatives

Two real alternatives lose to this design:

- **Build revision 3's browse-side layer on pool 0.0.13.** D13 forbids it (`eager\design-brief.md:25`), and the hand-out path would need a rewrite later (`eager\design.md:13`).
- **Acquire and release per call, with `validate` as the only ping.** The pool hands out its oldest idle record (`Pool.ts:342`), so at size 2, consecutive calls would land on different browsers and lose the page the agent built. A released record also adds no strike when it is lost (`:491`).

The following table rules on each other option:

| Rejected option | Reason |
| --- | --- |
| Gating the handshake on `pool.start()` | at sizes 2 and 3 it waits for every browser, against D10 |
| Calling `pool.start()` again after a refusal | it resets the bound (`Pool.ts:156`), which makes a launch loop on demand |
| A browse workaround for P-2 | the pool owns the credit; P-2 blocks the publish |
| Waiting for the lost lease's teardown before acquiring | the pool already orders the successor after it |
| Ignoring a stranded launch | the pool cannot count it |
| A stranded guard precise to the size | it needs `#size` and pool counts; the conservative refusal is safe (T15) |
| A watch that settles on abort | it contradicts "settles on loss" (R2-7) |
| A watch that reads `browser.contexts()` | that list can hold a synced default context (R3-4) |
| A mutable `crashes` map behind a readonly property | `scaffold\.claude\rules\typescript.md:27` |
| Logging every spare loss after warming | noise without a ruling (T4) |
| A forced kill outside the hook | a second termination site, against D8 |
| A shorter ping deadline or a scheduled check | a fixed figure (D5) and polling (`scaffold\AGENTS.md:68`) |
| A check of the view after a timeout | not ruled by D10; T19 |
| Gating `server/discover` | no specification text supports it (A-13) |
| Restoring the last address or repeating a call | side effects; the agent owns re-execution |
| One code for the note and the interruption | recovery must not parse prose (`reliability-assessment.md:259`) |
| An eager-off switch, or a `browsers` or `spares` option | D1; it clashes with `BrowserOptions.browsers`; D6 states a size |
| `@orkestrel/supervisor`, or `Supervisor` from `@orkestrel/process` | the user's exclusion (`eager\design-brief.md:8`) |
| `renderBrowserServerLoss` | the input is a detected loss, which is a finding: "`describe*` takes a finding" (`scaffold\.claude\rules\names.md:100`, `:104`) |

## Constraints

**Pool** (`pool\` at `445a4ba`, version 0.0.14, `package.json:3`):

- Construction validates the options (`src\core\Pool.ts:81-119`).
- The floor branch is at `:349-375`: the `cleanup` refusal at `:350-361`, which also applies with live leases (`src\core\types.ts:131-133`), and the spent refusal at `:362-373`.
- Refills are serialized (`:396`, `:404-405`).
- The watch is armed at `:449-464`, with the abort guard at `:459`. Disposal aborts the watch before the hook runs (`:733`, `:745`).
- A late loss does nothing (`:470-476`).
- Strikes are at `:437-440`, `:490-495`, and `:594`. The grant resets them at `:674`, and `:390-392` reads the spent state.
- The owed credit is added at `:477-478`, spent at `:402-403`, and withdrawn at `:482-483` (P-2).
- Retention is at `:757-760`.
- `PoolToken.destroy()` is at `:297-305`.
- The barrier is at `:231-252` and `:817-835`.
- `create` and `validate` take no signal (`src\core\types.ts:89`, `:91`).
- The pins are contract `^0.0.19` and emitter `^0.0.11`, with probe as a dev dependency (`package.json:72-73`, `:78`).

**mcp** (`mcp\` at `94e2e09`, 0.0.36):

- The hook waits on the legacy `initialize` only (`src\core\MCPLegacy.ts:142-165`). The error mapping is at `:149-161`.
- The hook passes through `src\core\factories.ts:92`.
- The types are at `src\core\types.ts:1770`, `:2189`, and `:2346`.
- `JSONRPC_SERVER_ERROR` is at `src\core\constants.ts:307`.
- Modern requests skip the hook (`src\core\MCPLegacy.ts:92-93`).

**Browser** (`browser-wt-browse` at `d6937be`):

- The package pins contract `^0.0.19` and mcp `^0.0.35` (`package.json:105`, `:109`).
- `BrowserMCPServer.ts`:
  - the lazy launch is at `:131-139` and `:185-260`;
  - the profile is a bare UUID (`:215`);
  - `transport.stop()` is synchronous (`:151`);
  - `#withdraw` and `#unmirror` are at `:272-290`.
- `Browser.ts`:
  - `pid` is at `:138-140`, and an exit clears it at `:396-398`;
  - transport loss is at `:444-475`;
  - `#raceAbort` is at `:371-386`;
  - the port probe is at `:320-322` and `:543-563`;
  - `#endpoint` is set at `:574` and `:653`, and cleared at `:350`, `:406`, `:463`, `:589`, `:672`, and `:1165`;
  - `#destroyResources` awaits `#settle()` at `:843`, and `#settle` is at `:909-913`;
  - `#closeRemote` is at `:922`;
  - `#terminate` throws with the pid at `:1141-1143`;
  - `#finish` destroys the emitter at `:1171-1172`.
- `src\core\types.ts`:
  - `crash` carries no payload (`:1084`);
  - `BrowserContextOptions` is at `:1607-1614`, and the context `page` event is at `:1618`;
  - `BrowserReferenceFunction` is at `:2509`;
  - `BrowserToolsetWatch` is at `:3032-3037`;
  - `pages()` is at `:3424-3434`.
- The context's own counter is at `src\core\BrowserContext.ts:71` and `:349`.
- `isCDPTimeoutError` is at `src\core\errors.ts:186`.
- `CDPClient`:
  - it refuses when not connected (`src\core\CDPClient.ts:118-120`);
  - its deadline is at `:134-145`;
  - it rejects pending requests at `:288-297`.
- `parseBrowserLockEntry` is at `src\server\helpers.ts:59-65`.
- The store's pid check is at `src\server\stores\FileBrowserStore.ts:214-222`.
- `main.ts` prints the coded line at `src\bin\main.ts:31-33`.
- The emitter's `on` and `off` return nothing and take no signal (`node_modules\@orkestrel\emitter\dist\src\core\index.d.ts:71-73`).
- The launch double's `pid` is undefined (`tests\setupServer.ts:1587-1589`).
- Roadmaps: the worktree holds items 6 to 8 (`ROADMAP.md:3-5`), and `main` holds items 6 to 12 (`browser\ROADMAP.md:3-9`).

**Probe:** contract is pinned at `^0.0.18` (`probe\package.json:95`). Item 1 is at `probe\ROADMAP.md:5`.

## Refusals

Each refused option is followed by the rule that forecloses it:

- **A periodic liveness check:** "No polling architecture. Park idle work on events and abort signals." (`scaffold\AGENTS.md:68`)
- **A stored `spent`, `refused`, or `#mirrored` copy:** "never store a second flag or label that can drift." (`scaffold\AGENTS.md:58`)
- **Keeping the lazy launch:** "No compatibility shims. Update every consumer in the same change." (`scaffold\AGENTS.md:66`)
- **Faking a crash or spying on stderr:** "NEVER use mocks, behavioral fakes, module replacement, framework spies, or fake clocks for project-owned behavior." (`scaffold\AGENTS.md:42`)
- **A double whose `kill()` alone proves the in-call order:** a stub "never stands in for the integration being claimed" (`scaffold\.claude\rules\tests.md:32`).
- **Closures declared inside the watch:** "Never declare or assign a function inside another function or method." (`scaffold\.claude\rules\architecture.md:173`)
- **A mutable `Map` in `BrowserSlotWatch`:** "Public collection properties and return types use `readonly T[]`, `ReadonlyMap<K, V>`, or `ReadonlySet<T>`." (`scaffold\.claude\rules\typescript.md:27`)
- **`BrowserSlot` or `BrowserSlotWatch` declared in `BrowserMCPServer.ts`:** "An implementation file holds one class plus imports." (`scaffold\AGENTS.md:60`)
- **A `poolSize` key:** "Never flatten these into prefixed keys." (`scaffold\.claude\rules\names.md:49`)
- **`reset`, `restart`, or `#teardown` as member names:** "Never introduce synonyms such as `cancel`, `reset`, or `run` for these meanings." (`scaffold\.claude\rules\names.md:234`)
- **A fixed test port:** "never to a fixed port" (`scaffold\.claude\rules\tests.md:33`).
- **An inline wait loop in a test:** "A polling loop, a deadline read, or a deferred that observes an abort or an event in a test or a setup module is a defect" (`scaffold\.claude\rules\tests.md:236-237`).
- **Re-implementing pool logic in browse:** "Reuse a primitive whose semantics match; never wrap one to rename it." (`scaffold\AGENTS.md:45`)
- **Adding pool without a request:** "NEVER add an npm package unless the user explicitly requests it" (`scaffold\AGENTS.md:38`). D11 is that request.

## Measurements

**Readings supplied:**

- `status.md:19` (2026-10-03, loaded host, preliminary): an 80.5 ms headless-shell launch and no end-to-end gain from a warm test browser. This bears on D3 only.
- The pool fix report (`pool\tmp\codex\floor-fix-report.md:39-57`, Windows, Node 24.21.0): every gate exited 0, with 86 core tests and 398 tests in total. No independent run exists, and Linux was not run.
- This lane's static reading on 2026-10-03:
  - `Pool.ts` and `types.ts` at `445a4ba`, read as files;
  - P-2 traced through `:402-403`, `:477-483`, and `:362-374`;
  - mcp 0.0.36's hook;
  - the browser line references.

**Readings missing:**

- every timing;
- the serialized fill time at sizes 2 and 3;
- how clients display a non-version `initialize` error;
- whether a client closes the input at its startup timeout;
- whether `Inspector.targetCrashed` arrives without `Inspector.enable`;
- whether `DevToolsActivePort` is written;
- whether Chromium survives a server killed by `TerminateProcess`;
- the target host's rate of transient first-launch failures;
- the row 11b total against each client's tool timeout;
- whether a throwing `Writable` write propagates on the Node version in use.

**Plan.** The case decides every figure, and none is fixed in advance:

- **Hosts:** the target Windows host, plus a Linux host for the POSIX rows.
- **Instrument:** a TypeScript instrument run by Node under `browser-wt-browse\tmp\probes\eager\`, driving `dist\bin\main.js` over stdio.
- **Load:** a realistic session against a heavy local page (`navigate`, `look`, `read`, `click`, `type`, `replay`) while the veneer journey projects run.
- **Reporting:** distributions, never a lone mean.
- **Control:** onset under load must exceed onset at idle. Otherwise the record states that the load was not reached.

The readings to take:

- **M1:** `#warm` for each slot, and the time until the floor is full at sizes 1 to 3, idle and under load (T3).
- **M2:** time from spawn to the `initialize` answer at sizes 1 to 3, with and without a leftover browser, read against 10 s and 30 s.
- **M3:** failover from killing the leased pid to the next successful call, size 1 against size 2. Control: the endpoint differs at size 2.
- **M4:** a spare's idle working set and CPU, and the leased call's latency with and without the spare, under load.
- **M5:** the round trips of both pings, the row 11 recovery, and the row 11b total against Codex's 60 s.
- **M6:** whether Chromium survives `TerminateProcess` and `SIGKILL` of the server.
- **M7:** whether `DevToolsActivePort` appears with the port and GUID.
- **M8:** the refill launch time while the session works.
- **M9:** the failure rate over a long launch series under load, and whether the immediate retry succeeds. This informs `restarts`.

The Orchestrator records the readings in `eager\readings.md`. The user rules on D3 from M3 and M4, and on the bound from M9.

## Units

Writers serialize. Each writer owns only its files, stops at its project boundary, and reports the commands it ran. Every proof uses real implementations, and the service projects use real Chromium.

### U1 (done): `@orkestrel/mcp` 0.0.36 handshake hook

- **State:** at `mcp` `94e2e09` (`src\core\MCPLegacy.ts:142-165`, `src\server\middlewares.ts:219-221`, `guides\mcp.md:1987-2005`).
- **Remaining:** the verifier runs the tree-wide gates, the user publishes, and the Orchestrator records the pack integrity.

### Floor unit (done, in review): `@orkestrel/pool` 0.0.14

- **State:**
  - The review ruled FAIL 3 and 8.
  - The repair landed at `445a4ba` (`pool\tmp\codex\floor-fix-report.md:1-23`).
  - P-1 is closed.
- **P-2 repair:**
  - **Role and engine:** the writer lane that produced `445a4ba`.
  - **Owns:** `pool\src\core\Pool.ts` and `pool\tests\src\core\Pool.test.ts`.
  - **Spec:** the withdrawal at `:482-483` never takes `#owed` below 0.
  - **Accept:** the P-2 breaking sequence's acquire rejects with `create`. Without the repair, the case fails by its timeout. `withdraws owed credit when leased cleanup fails` stays green.
  - **Run:** `npm run test:src:core`, then the gates in the report's order.
- **Re-review:** a reviewer (Opus 5.5, objective lane) reviews P-2 only.
- **Release:** the user publishes after the re-review.

### U2: `Browser.endpoint`, `Browser.ping`, the port probe, and the double

- **Precondition:** release 0.0.22 has landed, and `main` is merged into the worktree (R3-16). Other writers are changing the waits and the service tests.
- **Role and engine:** builder (Sonnet 5.5).
- **Owns:**
  - `src\server\types.ts` (the `BrowserInterface` members and the `BrowserCDPOptions` remark);
  - `src\server\Browser.ts`;
  - `tests\setupServer.ts` and `tests\setupServer.test.ts`;
  - `tests\src\server\Browser.test.ts`;
  - the added cases in `tests\service\browser.test.ts`;
  - the guide rows.
- **Spec:**
  - The `endpoint` getter reads `#endpoint`, which is set at `:574` and `:653` and cleared at `:350`, `:406`, `:463`, `:589`, `:672`, and `:1165`.
  - `ping` sends `Browser.getVersion`.
  - The port probe runs only when `cdp.port` is set (`:320-322`).
  - The double gains `endpoint`, `ping`, a `connect()` that honors its signal, and a `version?: (call: number) => Promise<void> | void` option. `call` counts that double's pings from 1 (F-4).
  - The launcher gains `silent`, `timeout`, and `version`.
- **Accept:**
  - `src:server`: `endpoint` and `ping` behave correctly in each state. A held double's `connect()` rejects on abort. `version` receives 1, then 2.
  - `service`: `endpoint` matches `^ws://127\.0\.0\.1:\d+/devtools/browser/`.
  - `service`: an ephemeral `/json/version` fixture with `cdp.port` set makes the launch reject naming that port. This case fails without the probe.
- **Run:** the two test files, `npm run test:src:server`, `npm run test:setup`, and `npm run test:guides`.

### U3: `BrowserContextOptions.reference`

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:** `src\core\types.ts` (the member), `src\core\BrowserContext.ts`, `tests\src\core\BrowserContext.test.ts`, and the guide row.
- **Depends:** U2.
- **Spec:** the constructor stores `options?.reference`. `#attach` and `#reattach` pass it, or `this.#nextReference.bind(this)` when it is absent (A-9).
- **Accept:**
  - Two contexts given one function issue `e1`, then `e2`.
  - Without the option, each context starts at `e1`.
  - The case fails when the option is read from `BrowserPageOptions`.
- **Run:** the test file, `npm run test:src:core`, and `npm run test:guides`.

### U4: profile and loss helpers

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:**
  - `src\server\types.ts` (`BrowserProfileRecord`);
  - `src\server\helpers.ts` (`probeProcess`, `parseBrowserProfileRecord`, `describeBrowserServerLoss`);
  - `src\server\stores\FileBrowserStore.ts` (route `:214-222` through `probeProcess`);
  - `tests\src\server\helpers.test.ts`;
  - the guide rows.
- **Depends:** U3.
- **Accept:**
  - `probeProcess(process.pid)` is true, and `readExitedProcessId()` gives false.
  - `parseBrowserProfileRecord` round-trips a record. It returns undefined for bad text, a missing key, a bad pid, and an endpoint that is not `ws://`.
  - `describeBrowserServerLoss` opens with its code.
  - The `UNRESOLVED` text states that the outcome is unknown, that the call was not repeated, and the F-9 condition.
  - `new BrowserConnectionError('Browser process did not exit after SIGKILL', { pid: 4242 })` renders `4242`.
  - The store's lock tests stay green.
- **Run:** the test file, `npm run test:src:server`, and `npm run test:guides`.

### U5: dependencies and item 13

- **Precondition:** pool 0.0.14 (with P-2) and mcp 0.0.36 are published.
- **Role and engine:** builder (Sonnet 5.5).
- **Owns:**
  - `package.json` (`"@orkestrel/pool": "^0.0.14"`, `"@orkestrel/mcp": "^0.0.36"`);
  - `package-lock.json`;
  - `guides\pool.md`, a byte-identical mirror at pool's published commit;
  - the `guides\mcp.md` mirror;
  - the `guides\README.md` rows;
  - `ROADMAP.md` (paste item 13).
- **Depends:** U4.
- **Accept:**
  - `npm ci --ignore-scripts`, `npm run check`, `npm run test:src`, `npm run test:policy`, and `npm run test:guides` are green.
  - `npm ls @orkestrel/pool @orkestrel/mcp --omit=dev` shows one copy of each.
  - The output of `npm ls @orkestrel/contract --omit=dev` is in the report.

### U6: the eager server (composition, setup, gates, hand-out, closing, teardown, sweep, recheck, logging)

- **Role and engine:** astra (GPT-6 Astra).
- **Owns:**
  - `src\server\types.ts` (`BrowserSlot`, the server block, the `BrowserLaunchFunction` doc);
  - `src\server\constants.ts`;
  - `src\server\BrowserMCPServer.ts`;
  - `src\server\factories.ts` (the doc and the `@example` at `:98-106`);
  - `tests\src\server\BrowserMCPServer.test.ts`, rewriting the lazy cases at `:34`, `:71`, and `:122`;
  - `tests\setupServer.ts` and `tests\setupServer.test.ts` (`hold(from?)`, `refuse(from, count?)`, and a log stream that collects lines);
  - `tests\setupService.ts` and `tests\setupService.test.ts` (the recording launcher);
  - `tests\service\browse.test.ts`;
  - the server rows of `guides\browser.md`.
- **Depends:** U2 to U5.
- **Spec:**
  - the composition without `watch`;
  - `#setup`, `#handshake`, `#race`, `#grant`, `#hold`, `#refuse`, and `#serve`;
  - `#warm` without the stranded refusal;
  - `#destroySlot` steps 2 to 5;
  - closing and `destroy()`, including the shutdown recheck;
  - the sweep and `#write`;
  - the derived mirror;
  - a size that is not an integer from 1 through `BROWSER_SERVER_POOL_LIMIT` throws `BROWSER_SERVER_OPTIONS`.
- **Accept, `src:server`** (doubles over the real Pool 0.0.14):
  - **Eager.** A launch exists before any input is written. Fails when the launch stays lazy.
  - **Handshake.** Under `hold()`, `initialize` and a modern `tools/call` wait while `ping` and `tools/list` answer. After `release()`, both answer, and the call runs on double 0. At size 2 with the second launch held, `initialize` answers. Fails when setup awaits `pool.start()`.
  - **Start failure** (size 1, `failures: 2`):
    - `initialize` gets `-32000`, `data.code`, and the fixture text one time;
    - `start()` rejects `UNAVAILABLE`;
    - a modern `tools/call` answers `UNAVAILABLE`;
    - exactly 2 launches.
  - **Per-size start.** With every create failing, sizes 2 and 3 record exactly 2 launches. Fails when browse adds retries.
  - **Spare fails at start (F-5, grant first).** Size 2, with later launches refused and each refusal held until the first grant commits: exactly 3 launches, one `EXHAUSTED` line, and calls on double 0. Fails without `#exhaust`.
  - **Grant reset (F-5, refusals first).** The same input, with double 0's `version` call 1 held until both refusals settle: exactly 5 launches and one `EXHAUSTED` line. This pins `Pool.ts:674`.
  - **No launch on demand (V3).** Size 1, with a `version` handler that resolves call 1 and rejects later calls, and every later launch refused. The launch count stays at 3 across later calls. Fails when browse calls `pool.start()` again.
  - **Concurrency.** Concurrent first calls run on one double. At size 2, after a lease loss, two concurrent calls lease one browser, and the other double's page stays at `about:blank`. Fails when each call acquires.
  - **Options.** Sizes 0, 4, 1.5, and -1 throw `BROWSER_SERVER_OPTIONS`.
  - **Destroy during a hold.** `destroy()` resolves `start()` without `release()`, and nothing is written afterward. The `#handshake` and `#hold` checks are hygiene with no fails-without claim, because the stopped transport writes nothing (F-6).
  - **Destroy during a hand-out ping (F-7).** Hold double 0's `version` call 1, then call `destroy()`. The launch count is unchanged, and no profile folder appears after `destroy()`. Fails when `pool.destroy()` waits for `#starting`.
  - **One-turn close.** An exited child's bare-pid entry survives, no launch is recorded, both promises settle, and the listeners return to baseline.
  - **`destroy()`, then `start()`.** `start()` rejects `ENDED` with no launch and the listeners at baseline.
  - **Unusable root (X-12, F-2).** First probe the host's `mkdir` code under a regular file. Then assert `initialize` `-32000`, `start()` naming that code, and a modern `tools/call` answering `BROWSER_SERVER_UNAVAILABLE:`. The call part fails by timeout without `#serve` step 2.
  - **Unreadable `.profiles` (X-8).** On POSIX as a non-root user, use a mode `0o300` directory, probed at runtime. `initialize` answers, and one `SWEEP` line is written. NOT-EVIDENCED on other hosts.
  - **Sweep.**
    - A folder is kept or removed by the folder rule.
    - A record read that fails with anything but `ENOENT` keeps the folder.
    - A folder whose endpoint refuses is kept (A-27).
    - A `CDPTestServer` or `StallServer` endpoint never delays `initialize`, and `destroy()` resolves (A-3).
  - **One teardown line (X-9).** Use a double whose destroy rejects. `SIGTERM` is emitted from an `end` listener registered after the server's. Exactly one `TEARDOWN` line is written.
  - **Log failure.** A `log` whose write throws: `destroy()` rejects with that failure in its `AggregateError`, and no `unhandledRejection` arrives. The writer first probes how a throwing write behaves on the Node version in use.
- **Accept, `service`:**
  - `start()` resolves after a recorded browser connects.
  - `navigate`, then `look`, run on one pid. At size 2, the other page stays at `about:blank`.
  - After `destroy()`:
    - every pid gives `ESRCH`;
    - every port refuses;
    - no `<pid>-` entry remains;
    - the listeners are at baseline.
  - A missing executable gives exactly 2 launches, `ENOENT` in `start()`, `-32000`, and no profile.
  - **Killed server (X-10).** Kill a child Node server. `probeProcess(pid)` is true before the second `start()`. After that start, `waitForProcessExit(pid)` resolves, and the second `destroy()` leaves the folder gone.
- **Run:** the two test files, `npm run test:src:server`, `npm run test:setup`, `npm run test:guides`, and `npm run test:service -- tests/service/browse.test.ts`.

### U7: liveness, loss, and the operation lifecycle

- **Role and engine:** astra (GPT-6 Astra).
- **Owns:**
  - `src\server\types.ts` (`BrowserSlotWatch`);
  - `src\server\BrowserMCPServer.ts`;
  - `tests\src\server\BrowserMCPServer.test.ts`;
  - `tests\setupServer.ts` and `tests\setupServer.test.ts`;
  - `tests\service\browse.test.ts`;
  - the server remarks in the guide.
- **Double changes:**
  - `isolate()` keeps its contexts, and `contexts()` returns them;
  - `kill()` emits `disconnect`;
  - `drop()` closes the fixture transport and emits `disconnect` a macrotask later;
  - `defer()` and `resume()`;
  - launcher option `survivors?: number`: that many doubles' `destroy()` rejects;
  - launcher option `broken?: number`: that many doubles' `isolate()` rejects.
- **Depends:** U6.
- **Spec:**
  - `watch`, `#watches`, `#track`, `#createCrash`, `#report`, and `#unwatch`;
  - `validate` calling `#lose`;
  - `#lose`;
  - the post-failure ping;
  - `#losses`, `#notice`, and `#failure`;
  - the texts;
  - `#destroySlot` step 1;
  - `#stranded`;
  - `error: #fault`.
- **Accept, `src:server`:**
  - **In-call drop (R3-1).** The call answers `UNRESOLVED`, and the next call runs on a successor. Fails without the post-failure ping.
  - **Known failure.** An unknown reference answers the plain failure, with no launch and no note.
  - **V4, validation path.** `silent: 1`, size 2, and double 0's hand-out ping times out.
    - Its `disconnect`, `page`, and `crash` counts return to 0.
    - No kill is attempted.
    - `destroy()` resolves (X-11).
    - Double 2 launches, and the call runs on double 1.
  - **V4 on `token.destroy()`.** A `version` handler resolves call 1 and rejects call 2. The lost lease's counts return to 0, and the call runs on the spare with the note.
  - **V4 on `pool.destroy()`.** Every double's counts return to 0.
  - **V4 on a failed warm.** No listener is added.
  - All four V4 cases fail when the watch ignores its signal (X-2).
  - **Late page.** A page opened after arming gains a crash listener, and that listener's count returns to 0 after a loss. Fails when `#track` skips the map.
  - **One call, one acquire (X-4).** A `version` handler resolves call 1 and rejects later calls. Each call records at most one launch. Fails when `#serve` pings again after acquiring.
  - **Owed attempt (V5).** Size 2. Kill the spare twice so the bound is spent, then kill the lease under `hold(next)`. Exactly one launch follows, and after `release()` the call succeeds with the note.
  - **Survivor, size 1 (V1, F-8).** `survivors: 1`.
    - `kill()` on the lease launches nothing.
    - The next call answers the note, then `UNAVAILABLE` naming unconfirmed termination.
    - `destroy()` rejects with that failure, and the retained profile folder is gone after it. That part fails without the shutdown recheck.
    - Ending the input writes one `TEARDOWN` line and sets `process.exitCode` to 1, which the test restores.
  - **Survivor, size 2.** The call runs on double 1, no launch follows, and one `TEARDOWN` line is written.
  - **Stranded (F-12).** `broken: 1` with `survivors: 1` at size 1. Exactly 1 launch is recorded. `start()` rejects with `BROWSER_SERVER_UNAVAILABLE`, whose message carries the `BROWSER_SERVER_TEARDOWN` refusal. `destroy()` rejects with the double's destroy failure. Fails without `#stranded`.
  - **Concurrent calls across a fault (A-15).** A `wait` on A answers `UNRESOLVED` while a call on B carries the note.
  - **Known outcomes (R2-9).** A click that succeeds before its browser dies keeps its success, and the next call carries the note.
  - **Unmirror at loss.** Hygiene only (X-3): the next lease's adopted tool has its dispatcher.
- **Accept, `service`** (size 2 unless stated):
  - **Lease kill.** The next call runs on the other pid and opens with `CRASH` naming the URL. One replacement launches.
  - **Outcome unknown.** A held fixture route records exactly one request, and the call answers `UNRESOLVED`.
  - **Renderer crash.** `Page.crash` on the view gives the note, and on a background tab it gives none. A failure here moves `Inspector.enable` into a core unit (A-17).
  - **Spare kill.** The call keeps its pid, and one replacement launches.
  - **Stale reference (A-8).** An old `eN` is refused after a kill and re-navigation.
  - **Size 1.** The call after a kill waits and then succeeds with the note.
  - **Hang, POSIX.** `SIGSTOP` the lease. The note arrives, the stopped pid gives `ESRCH`, and the replacement starts within one deadline of the ping's rejection.
  - **Missing executable after start.** A lease kill answers the note, then `UNAVAILABLE` naming `ENOENT`.
- **Run:** as U6.

### U8: the bin and `BROWSE_POOL`

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:** `src\bin\main.ts`, `tests\src\bin\main.test.ts`, the bin cases in `tests\service\browse.test.ts`, and the guide's variable list.
- **Depends:** U7.
- **Spec:**
  - `parseInteger` sits beside `parseBoolean` (`src\bin\main.ts:1`, `:7`).
  - An empty value counts as unset.
  - A value that is not an integer gives `BROWSER_SERVER_ENVIRONMENT`.
  - A value out of range surfaces `BROWSER_SERVER_OPTIONS`.
- **Accept:**
  - With a missing executable:
    - stdout carries `-32000`;
    - stderr carries exactly one `browse: BROWSER_SERVER_UNAVAILABLE: … ENOENT …` line with one code token;
    - the exit code is 1 after the input ends.
  - `BROWSE_POOL=two` exits 1 with `ENVIRONMENT`.
  - `BROWSE_POOL=4` exits 1 with `OPTIONS`.
  - The built entry answers `initialize`, `tools/list`, and `navigate`. Input end gives exit 0 and leaves no `<pid>-` profile.
- **Run:** the test file, the service file, and `npm run test:guides`.

### U9: review

- **Role:** reviewer (Opus 5.5), objective lane, not a writer.
- **Scope:**
  - the ceiling and the stranded guard;
  - the setup gate in `#serve`;
  - `#serve`'s single acquire;
  - the derived `UNRESOLVED`;
  - the closing checks and the same-turn barrier;
  - the forced kill;
  - the deletions by the sweep and the recheck;
  - the handshake mapping;
  - every row of the pool table against the published 0.0.14, P-2 included.
- **Depends:** U8.
- **Accept:** a falsify verdict. Each finding returns to its unit.

### U10: gates

- **Role:** verifier.
- **Work:** in browser, run `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, and `npm run test:service`, each read bare.

### U11: real-client check

- **Role:** verifier.
- **Work:**
  - Register the built `browse` with Claude Code, and read `/mcp` with a missing executable and with a valid one.
  - Do the same with `codex mcp` where the host has Codex.
  - Record whether each client closes the input at its startup timeout (A-29).

### U12: measurement

- **Role:** a builder writes the instrument, and the Orchestrator runs it.
- **Owns:** `tmp\probes\eager\*.ts` and `eager\readings.md`.
- **Depends:** U10.
- **Accept:** M1 to M9, each with its host, Chromium version, load, date, and every run. No default changes in this unit.

### U13: prose, roadmap, and version

- **Role and engine:** opus (Opus 5.5).
- **Owns:**
  - `guides\browser.md` § Register the browse binary with Claude Code: the eager start, the client budgets, `BROWSE_POOL`, the note and `UNRESOLVED`, the onset refusal on `initialize` and on calls, the `log` lines, and the one-time removal of bare `.profiles/<uuid>` folders;
  - Codex's `startup_timeout_sec`, only when M2 passes 10 s;
  - the lazy-launch passages of `README.md`;
  - `ROADMAP.md`: remove item 13, and paste item 14 with each `LINE` filled;
  - `package.json` at 0.0.23.
- **Depends:** U11 and U12.
- **Accept:** `npm run test:guides` and `npm run test:policy` are green, and every sentence about behavior maps to a U6, U7, or U8 assertion.

### U14: gates and publish

The verifier reruns the U10 gates. The user publishes `@orkestrel/browser` 0.0.23, and the Orchestrator records the pack integrity.

### U15: probe roadmap sentence

- **Role and engine:** builder (Sonnet 5.5), in `probe`.
- **Owns:** `ROADMAP.md`. Append the sentence from the roadmap texts to item 1.
- **Depends:** U14.
- **Accept:** `npm run test:policy` is green.

### Release order

1. `@orkestrel/mcp` 0.0.36 (U1). Then `@orkestrel/pool` 0.0.14, after the P-2 repair and its re-review. The user publishes both.
2. `@orkestrel/browser` 0.0.22 (items 11 and 12 and the reading change) lands from `main` as planned.
3. `@orkestrel/browser` 0.0.23: merge `main` into the worktree, run U2 to U13, then the U14 gates, and the user publishes.
4. `@orkestrel/probe`: a roadmap sentence only (U15), with no release.

## Tensions

- **P-2 repair shape (pool review).** The recommended repair stops the withdrawal at 0. Crediting the record in `#clean`'s success branch also closes P-2, but it reverses the order that the writer's late-credit control pinned (`floor-fix-report.md:19`).
- **T2: the grant resets the strikes (user, ruled in `eager\pool-floor-brief.md:24`; built at `Pool.ts:674`).** A retired spare re-arms at the session's next acquire. That sits against D7's "never by a caller's demand" (F referral). The counts depend on where the grant lands, so U6 pins two interleavings.
- **T3: refills are serialized (user).** Spares warm one after another (`Pool.ts:396`), against D8's "as eagerly as possible". M1 measures the cost.
- **T4: a spare retired after warming is not reported (user).** The pool exposes no signal for it.
- **T5: the bound applies pool-wide (user).**
- **T6: `BROWSER_SERVER_RESTARTS = 1` (user).** It is reasoned from the case, and M9 informs it.
- **T7: a third ping site (user, D10).** The post-failure ping costs a second deadline in row 11b.
- **T8: D4 for modern clients (user).** A modern client meets the onset refusal at its first `tools/call`, which F-2 makes answer.
- **T9: codes travel in tool text (user).** A `_meta` field could carry them later.
- **T10: `UNRESOLVED` is conservative (R3-14).**
- **T11: the unset-port branch has no failing proof without binding 9222 (Orchestrator).** Recommended: accept it on review.
- **T12: the `log` option is public (subjective).** It serves spy-free proofs and embedding hosts.
- **T13: a library class sets `process.exitCode` (subjective).** The class owns the input's end and both signals.
- **T14: `BrowserSlot` and `BrowserSlotWatch` are public by the kind-file law (subjective).** No public signature uses them. Every member is readonly after F-3.
- **T15: the stranded guard is conservative (subjective).**
- **T16: a loss with no cause leaves the pool's cause undefined (`Pool.ts:457`, `:594`).** Browse keeps `#failure`.
- **T17: the record window between spawn and rename** stays open until M7.
- **T18: probe dependency loop.** Pool has a dev dependency on probe (`pool\package.json:78`), and probe would depend on pool. This stays open until probe item 1.
- **T19: hung or early-crashed view (user, F-10).** Neither row 9b nor row 13 ever recovers, because both pings reach the browser target only. The user rules whether a check on the view after a `CDPTimeoutError` joins D10's "before every call". This design builds none.
- **Names (subjective):** `describeBrowserServerLoss` is ruled. These private names stay open: `#destroySlot`, `#lose`, `#serve`, `#grant`, `#hold`, `#refuse`, `#race`, `#track`, `#createCrash`, `#report`, `#unwatch`, `#losses`, `#stranded`, `#exhaust`, and `#nextReference`.

## Risks

- **The pool is in review.** Each row of the pool table is a dependency, and a change reruns U6 and U7.
- **Without P-2,** an acquire parks at sizes 2 and 3 after a failed leased teardown (row 33), and V5 breaks after it.
- **The writer's pool gate counts** rest only on its report.
- **POSIX orphans** after a server `SIGKILL` live until the next start in the same root. Windows is unmeasured (M6).
- **Deleting a live orphan's profile on POSIX.** A kill between spawn and rename, or a stranded launch with no record, lets the sweep or the shutdown recheck delete a live orphan's profile.
- **Survivor classification is conservative.** Any `destroy()` rejection counts.
- **Two deadlines.** A hang during a call costs two deadlines (row 11b), which meets Codex's 60 s tool timeout at the 30 s default (M5).
- **Undetected view faults.** A hung view or an early view crash costs every later call a deadline or an error (T19).
- **The real-Chromium hang proof runs on POSIX only.**
- **`Page.crash` is experimental**, and detection might need `Inspector.enable`.
- **Slow hosts** might pass Codex's 10 s startup budget (M2).
- **The per-call ping adds one round trip**, and a failed call adds another.
- **With `BROWSE_HEADLESS=false`, each spare opens a window.**
- **The log-failure case** depends on how a throwing `Writable` behaves on the Node version in use.
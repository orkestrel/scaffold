# Ruled design: an eager, recovering `browse` on `@orkestrel/pool` 0.0.14

**Lane: ruling.** The dispatch names no single lane, so this document rules on both lanes. The objective lane covers correctness against the pool, mcp, and browser code and what their contracts permit. The subjective lane covers shape and naming, and its calls are listed under Tensions.

The paths in this document follow these conventions:

- The root is `C:\Users\mikes\WebstormProjects\`.
- `pool\…` is the pool checkout at `aea3bda`, and `mcp\…` is the mcp checkout at `94e2e09`.
- Unqualified `src\…` and `tests\…` paths are in `browser-wt-browse` at `d6937be`.
- Lifecycle records are under `scaffold\.orkestrel\veneer\lifecycle\`.
- W-n names workaround n of `eager\revision-3.md:271-282`.
- A-n, R2-n, and R3-n keep the meanings revision 3 gives them.
- X-n names finding n of `eager\revision-3-attack.md`.
- P-n names a finding this design hands to the pool review.

## Design

### The shape

The design is built from these parts:

- **The pool.** `BrowserMCPServer` composes one `Pool<BrowserSlot>` with `min` equal to the size and `restarts` equal to `BROWSER_SERVER_RESTARTS`.
- **The browse hooks.** Browse supplies five hooks: `create` (`#warm`), `destroy` (`#destroySlot`), `validate` (a ping), `watch` (`disconnect`, or a crash of the current page), and `error` (`#fault`).
- **What the pool owns.** The pool owns the warm floor, the refill, the bound, the owed attempt for a leased loss, the disposal of a lost record, the retention of a browser whose teardown failed, the watch signal, and the one teardown barrier.
- **What browse keeps.** Browse keeps only policy:
  - what a slot is and how it is built and torn down;
  - what counts as a loss;
  - the session's one held lease and the shared acquire;
  - the operation-lifecycle texts;
  - the handshake gate;
  - the profile record and the sweep;
  - the `BROWSE_POOL` variable;
  - logging.
- **What is not built.** The browse-side layer of revision 3 (W1 to W8) is not built (D13, `eager\design-brief.md:25`).

### Pool 0.0.14 as read, and what a review change could break

The pool is in review, so every behavior browse relies on is pinned by a browse case in U6 or U7. A review change to any row reruns those units. Browse relies on these behaviors:

| Behavior | Code | Browse relies on it for |
| --- | --- | --- |
| Construction creates nothing. `max` defaults to `min`, and `restarts` is required with `min`. | `pool\src\core\Pool.ts:81-119` | building the pool in the constructor |
| `start()` fills the floor and resolves when `min` live records exist. A repeat call shares the pending promise, and `destroy()` rejects it with `destroyed`. | `:149-159`, `:382-389`, `:236` | warming at setup |
| Refills create one at a time. | `:384`, `:390-399`; `pool\guides\pool.md:115-116` | an onset equal to one launch; spares warm in sequence (T3) |
| Under `min`, the pump never creates for a waiter. A waiter with nothing idle waits. It rejects with `create` and the last cause only when the bound is spent and no refill, disposal, or owed attempt is pending. | `:349-363` | V3: no launch on a caller's demand |
| `watch` is armed after each create and before the record idles. Any settlement disposes the record. The signal aborts when disposal begins, before the destroy hook runs. | `:425-445`, `:698-717` (abort `:710`, hook `:713`) | releasing the listeners; the forced kill reads the cause recorded before disposal |
| A loss reported after disposal began does nothing. | `:447-454` | overlapping loss signals |
| A watch rejection counts as a loss and reaches `error(error, 'watch')`. | `:437-440` | X-7 |
| `PoolToken.destroy()` disposes that exact record. A repeat call, or a call after release, does nothing. A failed disposal rejects it with `cleanup`. | `:297-305`; `pool\src\core\types.ts:59-65` | a failed per-call ping |
| Strikes count each failed refill and each loss of a never-leased record, including a failed validation. A lease grant resets the strikes. The bound is spent when strikes exceed `restarts`. | `:412-420`, `:467-472`, `:571`, `:651`, `:378-380` | the crash-loop bound (T2) |
| A leased loss whose disposal resolved earns one refill that runs even when the bound is spent. | `:455`, `:463`, `:390-391` | V5 |
| Under `min`, a record whose destroy hook rejected stays counted and is never replaced. | `:734-737`, `:390` | V1 |
| A record that fails validation is disposed. The waiter then waits for a refill, or rejects with `cleanup` when that disposal fails. | `:584-606` | the hand-out ping |
| A lost record is never committed to a waiter. | `:554-562`, `:629-639` | R2-9 |
| `destroy()` is one barrier. It settles after every create, validation, and cleanup, and it rejects with `cleanup` when a failure was retained. | `:231-252`, `:794-812` | the server's `destroy()` |
| `create` and `validate` receive no signal. | `pool\src\core\types.ts:87-89` | passing `#abort.signal` to every launch and ping |
| A loss with no thrown cause leaves the cause undefined. | `:436`, `:571`; `pool\guides\pool.md:132-133` | `#failure` (T16) |

**P-1 (required of the pool review): an acquire parks forever when retained records hold the floor.**

- **The defect.** The floor branch leaves the waiter parked without settling it (`Pool.ts:349-363`). `#fill` creates nothing, because `resources.size` counts the retained record (`:390`). `#fill` settles only `#starting`, never a waiter (`:402-408`).
- **Breaking input.** Use `min: 1`, `restarts: 1`, and a destroy hook that rejects. Run `start()`, then `acquire()`, then `token.destroy()`, which rejects with `cleanup`. A second `acquire()` stays pending until `destroy()`.
- **Browse impact.** At size 1, after the leased browser's termination fails, every later call waits until its client cancels.
- **Required.** Under `min`, an acquire must reject with `cleanup` and the retained failures when all of these hold: no live record exists (idle, validating, or leased), no refill, disposal, or owed attempt is pending, and retained records hold the floor. This matches what `start()` does at `:401-408`.
- **Acceptance.** The breaking sequence rejects. Without the change, the case fails by its timeout.

### Composition

The constructor validates the size and then builds the pool. Each hook is a bound method or an arrow given as a non-computed object-literal property value, which `scaffold\.claude\rules\architecture.md:175` admits:

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

Browse never calls `release()`, `clear()`, `size`, `idle`, `active`, or `emitter`. The session holds its token until a loss or the server's teardown.

### Setup and the handshake (D1, D4, D8, D10)

`start()` behaves as follows:

- After `destroy()` began, `start()` rejects with `BROWSER_TOOLSET_ENDED` (`src\server\BrowserMCPServer.ts:132`; A-1).
- Otherwise it runs `this.#starting ??= this.#setup()`.

`#setup()` runs these steps in order. After every await, it returns when `#closing` is defined:

1. Attach the input `end`, `SIGINT`, and `SIGTERM` listeners (`:136-138`).
2. Call `transport.start()`.
3. Run `mkdir(ROOT/.profiles, { recursive: true })`. A rejection becomes `BrowserError(<cause message>, 'BROWSER_SERVER_UNAVAILABLE')` (A-2).
4. Start the sweep detached: `this.#sweeping = this.#sweep()`. The sweep never rejects and stays off the handshake path (A-3).
5. Run `const warming = this.#pool.start().then(undefined, (error: unknown) => error)`, so a rejection is never left unobserved.
6. Await `this.#grant(this.#abort.signal)`. This is the first lease, pinged by `validate` (D10). A rejection while not closing becomes `BROWSER_SERVER_UNAVAILABLE`, with `error.cause ?? #failure` as its message (R3-11).
7. Run `void warming.then(this.#exhaust.bind(this))`. When `pool.start()` rejected with `create`, `#exhaust` writes one `browse: BROWSER_SERVER_EXHAUSTED: …` line naming the cause. That line is D10's report of a spare that failed to warm. A `destroyed` or `cleanup` outcome writes nothing, because the `TEARDOWN` line already reports retention.

The handshake gate works as follows:

- `createMCPServer` receives `handshake: this.#handshake.bind(this)` (`mcp\src\core\types.ts:2189`), and `createMCPLegacy` passes it through (`mcp\src\core\factories.ts:92`).
- `#handshake(options)` races `#starting` against `options.signal`.
- A `BrowserError` becomes `new MCPError(`${code}: ${message}`, JSONRPC_SERVER_ERROR, { code })` (`mcp\src\core\errors.ts:41`; `mcp\src\core\constants.ts:297-307`). `MCPLegacy` answers it under the request id with `data` (`mcp\src\core\MCPLegacy.ts:150-158`).
- An aborted request rethrows, and the binder writes nothing (`:149`).
- Only the legacy `initialize` waits. `ping` (`:176-177`), legacy `tools/list` (`:178-179`), and modern requests (`:92-93`) answer while setup runs (`mcp\guides\mcp.md:1987-2001`).

### Hand-out and the lease (D7, D10)

`#grant(signal)` hands out the lease:

- It returns `#lease` when one is held.
- Otherwise it runs `this.#granting ??= this.#pool.acquire(this.#abort.signal).then(this.#hold.bind(this), this.#refuse.bind(this))`.
- Each caller races that shared promise against its own signal with `addAbortListener`, as `Browser.#raceAbort` does (`src\server\Browser.ts:371-386`). One acquire serves concurrent calls, so at size 2 two calls never take two leases.

`#hold(token)` takes a granted token:

- It clears `#granting`.
- When the server is closing, it returns without holding the token, because `pool.destroy()` disposes leased records (`Pool.ts:247-249`).
- Otherwise it sets `#lease`, adds a dispatcher for each adopted tool of the leased toolset outside the vocabulary, and subscribes the server's `add`, `remove`, and `clear` listeners (`src\server\BrowserMCPServer.ts:244-248`, `:262-268`).

`#refuse(error)` clears `#granting` and rethrows. Its caller classifies the error through `isPoolError` (R2-13):

- `create` and `cleanup` become `UNAVAILABLE` with the cause.
- `destroyed`, or the server's abort, becomes `ENDED`.

`#serve(signal)` runs once per call and never loops (X-4):

1. When `#closing` is defined, it throws `ENDED`.
2. When a lease is held, it pings the leased browser under `AbortSignal.any([signal, #abort.signal])`.
   - An abort rethrows the reason.
   - When the ping resolves and `#lease` is unchanged, it returns the slot.
   - Any other rejection calls `#lose(slot, error)`.
3. It awaits `#grant(signal)`. `validate` pinged that browser at hand-out, so the call runs without a second ping.
4. When `#lease !== token`, the slot was lost between the grant and the return. The call is refused with `UNAVAILABLE` naming the cause. The call did not run, so its outcome is known, and the next call acquires again.

A call issues at most one per-call ping and at most one acquire.

`#validate(slot)` is the hand-out ping:

- It pings under `#abort.signal` with the browser's command deadline (R2-10).
- A resolved ping returns true.
- A rejection that is not an abort calls `#lose(slot, error)` and returns false. The pool then strikes the record and disposes it (`Pool.ts:571`, `:589-606`).

### The watch (D2, D7, V4)

`#watch(slot, signal)` subscribes to these signals:

- `slot.browser`'s `disconnect`;
- `slot.context`'s `page` event (`src\core\types.ts:1618`);
- `crash` (`:1084`) on each page in `slot.context.pages()` (`:3424-3434`) and on each later page.

The watch settles only on a loss:

- **`disconnect`.** The cause is a process exit when `browser.pid === undefined`, because an exit clears the pid (`src\server\Browser.ts:398`). Otherwise the cause is a transport loss (`:452-475`).
- **`crash` of the current view.** The crash must come from the page that is `slot.toolset.view` when it arrives (`src\core\BrowserToolset.ts:362-364`, `:539-541`). A background tab's crash does nothing.
- **A browser that is not connected at arming.** The watch settles at once.

On a loss, the watch removes every listener, calls `#lose(slot, cause)`, and resolves with the cause.

When the pool's signal aborts, the watch removes every listener and never settles (R2-7).

The watch never rejects (X-7). A defect still reaches `#fault` through `Pool.ts:437-440`.

The emitter takes no signal (`node_modules\@orkestrel\emitter\dist\src\core\index.d.ts:71-75`). So the bound handlers live in `#watches: Map<BrowserSlot, BrowserSlotWatch>`, a named type after `BrowserToolsetWatch` (`src\core\types.ts:3032-3037`). The entry is deleted on settle and on abort. The pool owns the `AbortController`.

### Loss and the operation lifecycle

`#lose(slot, cause)` returns at once when the server is closing or `#losses.has(slot)`. Otherwise it runs these steps:

1. It records `#losses.set(slot, { cause, url })`, with the view's last URL (`src\core\BrowserFrame.ts:84`), and sets `#failure = cause`.
2. When the slot is the lease, it does these things in order:
   - unmirrors the lease's manager before clearing `#lease` (X-5);
   - removes every dispatcher outside the vocabulary;
   - clears `#lease` and sets `#notice = slot`;
   - calls `token.destroy()` and drops its rejection. The pool retains the hook's failure for its own `destroy()` (`Pool.ts:734-736`, `:810`).
3. For any other slot it does nothing more. The watch settlement or the failed validation disposes that slot.

The operation lifecycle follows `reliability-assessment.md:116-122`, `:203-217`, and `:249-267`:

- **The post-failure ping.** `#forward` records the slot each call ran on. The tool failed when it threw or answered `success: false`. When it failed, the slot is still the lease, and the call's signal has not aborted, `#forward` pings that browser under `AbortSignal.any([context.signal, #abort.signal])` (R3-1). A rejection that is not an abort calls `#lose`.
- **An interrupted call.** The lease changes only through `#lose`. So when `#lease?.value !== slot`, the call answers `BROWSER_SERVER_UNRESOLVED: …` from `#losses.get(slot)`. The text states these facts:
  - the cause;
  - that the outcome is unknown;
  - what was lost: the page at its last URL, its tabs, every element reference, the retained reading, dialogs, holds, an unsaved recording, the active replay, and the isolated context's cookies;
  - that browse did not repeat the call;
  - that the next call runs on a fresh browser at `about:blank`.
- **A success.** A call that succeeded keeps its success (R2-9).
- **The note.** `BROWSER_SERVER_CRASH: …` prefixes the next string outcome of a call that ran on a slot other than `#notice`, and that outcome clears it. A value that is not a string leaves the note pending. A refusal carries the note and clears it (A-23).
- **No repeats.** Browse never repeats a call.

### Create: `#warm()`

`#warm()` builds one warm slot in these steps:

1. When `#stranded` is defined, it refuses with `BROWSER_SERVER_TEARDOWN` naming the stranded pid.
2. It runs `mkdir(ROOT/.profiles/<pid>-<uuid>)` exclusively. That is the form `parseBrowserLockEntry` reads (`src\server\helpers.ts:59-65`), so the sweep can tell servers apart.
3. It launches as `src\server\BrowserMCPServer.ts:222-231` does, with `signal: #abort.signal`, then runs `await browser.connect()`.
4. It writes `browse.json.tmp` and renames it to `browse.json` when `pid` and `endpoint` are both defined (A-20).
5. It runs `browser.isolate({ reference: this.#reference })`, which passes the server's one reference counter across contexts (A-8).
6. It runs `context.create()`, then `createBrowserToolset(page, { context, journeys })` (`:236-243`), then `await toolset.start()`.
7. It returns `{ browser, profile, context, toolset }`.

The pool arms the watch only after this step resolves (`Pool.ts:425-445`), so a failed warm never leaves an armed watch. The warm subscribes no mirror; the grant mirrors.

On failure, `#warm` calls `#destroySlot` with whatever it built (A-22) and rethrows the launch failure.

**A stranded launch.** When that teardown rejects, a process might live while the pool owns no record. The pool's retention cannot count it. `#warm` therefore records `#stranded = error`. Every later `#warm` refuses before launching, and the pool strikes each refusal until the bound is spent (`Pool.ts:412-420`). The server runs short and never over (V1 as corrected in D11).

### Teardown: `#destroySlot(profile, browser?, toolset?, cause?)`

Each step runs whatever the other steps did:

1. **Forced kill.** When `isCDPTimeoutError(cause)` (`src\core\errors.ts:186`) and `browser?.pid` is defined, send `SIGKILL`. Ignore `ESRCH`. Any other failure goes to `#faults` (R3-6).
2. **Toolset.** Destroy the toolset when one exists. This runs before the browser, so a replay writes its run while the manager stands (`src\core\BrowserToolset.ts:2090-2093`; R2-8). A failure goes to `#faults`.
3. **Browser.** Destroy the browser when one exists, and keep any rejection. When the server is not closing, a rejection writes one `browse: BROWSER_SERVER_TEARDOWN: …` line naming the pid from the error's context (`src\server\Browser.ts:1139-1141`).
4. **Profile.** When step 3 resolved, or no browser exists, run `rm(profile, { recursive: true, force: true, maxRetries: 5 })`. A failure goes to `#faults`. A failure here never rejects the hook, because under `min` a rejection would retain the record (`Pool.ts:734-737`).
5. **Rethrow.** Rethrow step 3's failure, if any.

The hook has no watch step: the pool aborted the watch before it called the hook (`Pool.ts:710`, `:713`). `Browser.destroy()` awaits `#settle()` (`src\server\Browser.ts:908`), so an `exit` that arrives during teardown still settles in order (R3-15).

### Closing and the server's `destroy()` (D8; R2-6, R3-8, R3-9)

These rules govern closing:

- `destroy()` runs `this.#closing ??= Promise.resolve().then(this.#destroy.bind(this))`, so `#closing` is assigned in the call's own turn.
- `start()`, `#setup` after each await, `#hold`, `#serve`, `#lose`, and `#end` all check `#closing`.

`#destroy()` runs these steps in order:

1. Remove the signal and input listeners, stop the transport, remove the dispatchers, and unmirror the lease.
2. Abort `#abort`. That abort covers launches, pings, the shared acquire, and the sweep's attaches.
3. Await `#starting`, ignoring its rejection.
4. Await `pool.destroy()`, and keep the `context.failures` of its `cleanup` error (`pool\src\core\types.ts:12-17`).
5. Await `#sweeping`. Recheck the folders the sweep kept, and remove each one whose pid has gone (A-4).
6. Throw an `AggregateError` of the pool's failures, `#stranded`, and `#faults`, deduplicated by identity.

`#end` handles the input's end and both signals:

- It returns when the server is closing.
- Otherwise it calls `destroy()` and handles a rejection with a bound method. That method sets `process.exitCode = 1` and writes one `TEARDOWN` line (A-5).

### The sweep

The sweep keeps revision 3's rules (`eager\revision-3.md:643-650`) and adds X-6:

- **Which entries it checks.** It visits each `.profiles` entry whose `parseBrowserLockEntry` pid is neither `process.pid` nor alive.
- **A live pid in the record.** It attaches with a bare `CDPClient` and sends `Browser.close` under `#abort.signal`, as `Browser.#closeRemote` does (`src\server\Browser.ts:921-949`; R2-11).
- **After the attempt.** It removes the folder when `probeProcess(pid)` is false, and keeps it otherwise.
- **No record.** It removes the folder.
- **A failed record read.** A read that fails with anything but `ENOENT` keeps the folder (X-6).
- **A failed `.profiles` read.** It writes one `SWEEP` line and ends.
- It never rejects.

### Logging

`#write(line)` is the only writer to `log`. A throw goes to `#faults` (X-6, R3-7).

### The ceiling and the bound (D6, D8, Q3)

**The ceiling holds.** Browsers that might be alive never exceed the size, for these reasons:

- The pool creates only while `resources.size < min`, and one create runs at a time (`Pool.ts:384`, `:390`).
- A lost record stays counted until its hook settles (`:737`), so a successor launches only after its predecessor's teardown.
- A retained record stays counted (`:734-737`).
- A stranded launch refuses every later launch.

**The bound.** `BROWSER_SERVER_RESTARTS` is 1. It is reasoned from the case, and M9 informs it:

- A deterministic cause fails its one retry. A missing executable or an unusable root costs exactly 2 launches.
- A transient cause clears on the retry.
- A value of 0 would retire a spare at its first idle death, and higher values multiply the cost of a deterministic failure on hosts that "do not take heavy load well" (D6).

Between two grants, the pool allows `restarts` + 1 failed creates and never-leased losses, plus one owed attempt per leased loss. Grants happen only at setup and when the session acquires after a leased loss. So a browser that dies on every call costs one launch per call, and no background loop runs.

The following table gives the counts with `restarts` set to 1. The size 2 and 3 rows assume that the session's grant lands before the first spare failure. A grant that lands later resets the strikes and allows one more pair of attempts (`Pool.ts:651`; T2).

| Input | Size 1 | Size 2 | Size 3 |
| --- | --- | --- | --- |
| Every create fails at start | 2 failed launches; `start()` and `initialize` refuse | 2 failed (the bound is pool-wide) | 2 failed |
| Only the spares' creates fail at start | none | 2 failed spare launches; one `EXHAUSTED` line; serves on 1 | 2 failed (the second slot spends the bound and the third is never tried); one line; serves on 1 |
| The lease is lost and every later create fails | 2 failed; the call answers the note, then `UNAVAILABLE` | the session takes the spare; 2 failed, or 4 when the grant lands after the first pair | the same as size 2 |
| A spare is lost and every later create fails | none | 1 failed relaunch; no line (T4) | 1 failed relaunch |
| The lease is lost with the bound spent | exactly 1 owed attempt | exactly 1 owed attempt; the next grant re-arms the bound | the same |

### Fields

The following table lists the fields after the change:

| Field | Role |
| --- | --- |
| `#pool` | the mechanism |
| `#lease: PoolToken<BrowserSlot> \| undefined` | the session's held token (the holder stays browse policy, V6) |
| `#granting` | one acquire shared by concurrent calls |
| `#watches: Map<BrowserSlot, BrowserSlotWatch>` | the watch's bound listeners |
| `#losses: WeakMap<BrowserSlot, { readonly cause: unknown; readonly url: string }>` | the cause and URL behind the loss texts and the forced kill |
| `#notice: BrowserSlot \| undefined` | the pending `CRASH` note (A-15) |
| `#failure` | the last loss cause, for `UNAVAILABLE` when the pool's cause is undefined (T16) |
| `#stranded` | the teardown failure of a failed launch |
| `#faults` | toolset, `rm`, kill, log, and watch-defect failures |
| `#starting`, `#sweeping` | setup and the sweep |
| `#references` and `#reference` | the shared reference counter and its bound issuer (A-8) |
| `#log`, `#closing`, `#abort`, and the bound listeners | kept |

These fields are deleted:

- `#session`, `#browser`, `#profile`, and `#started` (`src\server\BrowserMCPServer.ts:85-88`);
- `#mirrored`, which is derived from `#lease` (X-5).

`#withdraw` reads `this.#lease?.value.toolset.tools`.

### Rulings on the brief's questions 1 to 8

**1. Where the launch starts, and what the handshake does meanwhile.**

- **Where.** In `start()`, through `#setup`, which runs `pool.start()` beside the sweep.
- **What waits.** `initialize` waits for the session's first validated lease (D10).
- **A failed setup.** Each surface answers differently (A-18):
  - `initialize` answers `-32000` with `BROWSER_SERVER_UNAVAILABLE: <cause>` and `data: { code }`;
  - `ping` answers `{}`;
  - `tools/list` answers the vocabulary;
  - `tools/call` answers `isError` text that opens with `BROWSER_SERVER_UNAVAILABLE:`;
  - `start()` rejects, `main.ts` prints one line and sets exit code 1 (`src\bin\main.ts:31-33`), and the process exits after its input ends.
- **The code token.** The message carries the cause only. `CODE: ` is added one time by each surface (A-19).
- **Client budgets.** Claude Code allows 30 s and connects in the background. Codex allows 10 s. Cursor documents no budget (`eager\clients.md:18-20`).

**2. Crash detection.** No timer runs (D10; `scaffold\AGENTS.md:68`). Each fault has its signal:

- **A process exit, a socket drop, or a crash of the current view.** The watch reports it.
- **A browser that stops answering.** The hand-out ping (`validate`) and the per-call ping report it, each bounded by the command deadline (`src\core\CDPClient.ts:134-145`).
- **A tool failure that arrives before the loss signal.** The post-failure ping classifies it (R3-1).

**3. Recovery.**

- **What is rebuilt.** The pool refills with a fresh slot: a process, a `<pid>-<uuid>` profile, an isolated context on the shared reference counter, a page at `about:blank`, and a started toolset with its journey toolset. The stores reopen on the same root.
- **How the agent learns.** It gets `UNRESOLVED` for an interrupted call and the `CRASH` note otherwise.
- **The last address.** It is not restored, because restoring could repeat side effects and is product policy (`scaffold\AGENTS.md:67`).
- **How a crash loop ends.** The bound in the preceding section ends it.
- **Profile cleanup.** It follows the teardown and the sweep. Bare `.profiles/<uuid>` folders from earlier versions stay, and the guide names a one-time removal (D10).

**4. The pool.**

- **Shape.** `Pool<BrowserSlot>` with `min = max = size`.
- **States.** The state machine gives them.
- **Liveness.** Events plus pings.
- **Work in flight on a browser that dies.** It answers `UNRESOLVED`.
- **The lease.** The session holds one token across calls. A loss destroys it, and the next call acquires again.
- **Balancing.** Failover only (D10). The pool hands out its oldest idle record. Parallel holders are browser item 14.
- **A second process, not a second context.** A context dies with its process.
- **When browsers start.** Every browser starts at `start()`, one after another (T3). A successor starts after its predecessor's teardown.
- **Idle cost.** M4 measures it.
- **Default size.** 1 (D10).

**5. Placement.**

- **Library:**
  - `Browser.endpoint`, `Browser.ping()`, and the port-probe fix;
  - `BrowserContextOptions.reference`;
  - `probeProcess`, `parseBrowserProfileRecord`, and `renderBrowserServerLoss`;
  - `BrowserProfileRecord`, `BrowserSlot`, and `BrowserSlotWatch`.
- **Server-private:** the hooks, the sweep, the handshake mapping, the texts, and the pings.
- **Bin:** `BROWSE_POOL`.
- **No eager-off switch** (D1).

**6. Proof.**

- Real Chromium in an added `tests\service\browse.test.ts`. Crashes are real: `process.kill(pid)`, CDP `Page.crash` from a second client, and `SIGSTOP` on POSIX.
- `src:server` covers the wiring with launch doubles over the real Pool 0.0.14 and the real `CDPClient` on the test transport. The double's `drop()` reproduces the real event order (`scaffold\.claude\rules\tests.md:32`).
- `tests\service\browser.test.ts` keeps one launch per test. A shared test browser is later work.

**7. Tests outside `browse`.** None in this change:

- `PLAYWRIGHT_WS_ENDPOINT` needs a Playwright `launchServer` browser, and browse's Chromium speaks CDP only (`eager\map.md:132`, `:138`).
- The probe measured no end-to-end gain (`status.md:19`).
- `endpoint` enables a later CDP attach.

**8. Probe.** These parts carry over:

- the `handshake` hook;
- the composition `min`, `restarts`, `start()`, `watch`, `validate`, `acquire()`, and `PoolToken.destroy()`;
- one setup place and one teardown hook.

The probe needs these changes at its item 1:

- a contract re-pin, because probe pins `^0.0.18` (`probe\package.json:95`) and pool 0.0.14 pins `^0.0.19` (`pool\package.json:72`);
- the user's dependency request, which D11 gives.

### Type sketches

The pool sketch shows 0.0.14 as built (`pool\src\core\types.ts:50-153`). Browse uses it as is:

```ts
// createPool<BrowserSlot>({ create, destroy, validate, watch, error, min, restarts })
// used: start(), acquire(signal), destroy(); PoolToken: value, destroy(); isPoolError
```

The mcp sketch shows 0.0.36 as built (`mcp\src\core\types.ts:1770`, `:2189`, `:2256`, `:2346`):

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
	readonly crashes: Map<BrowserPageInterface, () => void>
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
	 * session leases a warm browser; the legacy handshake awaits the same setup. Rejects with
	 * `BROWSER_SERVER_UNAVAILABLE` when no browser can serve and with `BROWSER_TOOLSET_ENDED` after
	 * `destroy()`, and resolves when `destroy()` interrupts setup.
	 */
	start(): Promise<void>
	/** Stops admission, tears down every browser, its toolset, and its profile, then rechecks the folders the sweep kept. */
	destroy(): Promise<void>
}

// src/core/types.ts
export interface BrowserContextOptions {
	/** Names each element reference the context's pages issue. Default: a counter the context owns. */
	readonly reference?: BrowserReferenceFunction // existing type, src/core/types.ts:2509
}
```

The browser package also gains these declarations, each in its kind file:

- **Constants** (`src\server\constants.ts`): `BROWSER_SERVER_POOL_SIZE = 1`, `BROWSER_SERVER_POOL_LIMIT = 3`, `BROWSER_SERVER_RESTARTS = 1`, and `BROWSER_SERVER_RECORD = 'browse.json'`.
- **Helpers** (`src\server\helpers.ts`):
  - `probeProcess(pid): boolean`, false only on `ESRCH`;
  - `parseBrowserProfileRecord(text)`;
  - `renderBrowserServerLoss(code, cause, url)`, which names the pid a cause carries in its context.
- **Codes:** `BROWSER_SERVER_UNAVAILABLE`, `_CRASH`, `_UNRESOLVED`, `_EXHAUSTED`, `_TEARDOWN`, `_SWEEP`, and `_OPTIONS`, beside the existing `_ENVIRONMENT`.

### State machine

The per-slot states are derived and never stored:

- `warming`: a refill's `#warm` is running.
- `ready`: the record is idle in the pool.
- `validating`: the hand-out ping is in flight.
- `leased`: `#lease.value` is the slot.
- `lost`: `#losses.has(slot)` and disposal began.
- `gone`: the hook resolved.
- `retained`: the hook rejected.
- `stranded`: a failed create's teardown rejected.

The server-wide states are these:

- `starting`: `#starting` is pending.
- `serving`: `#lease` is defined.
- `recovering`: no lease is held and the server is not closing; the next call acquires.
- `spent`: the pool's bound is spent. Browse never stores it and sees it only as a `create` rejection.
- `closing`: `#closing` is defined.

The following table gives each transition:

| From | Event | To | Action |
| --- | --- | --- | --- |
| (none) | `start()` | warming | `#setup`; `pool.start()` refills one at a time (`Pool.ts:149-159`, `:382-399`) |
| warming | `#warm` resolves | ready | the pool inserts the record, arms `watch`, and idles it (`:421-445`, `:686-696`) |
| warming | `#warm` rejects | (none) | the pool strikes and keeps the cause, then refills unless spent (`:412-420`) |
| warming | `#warm` fails and its teardown rejects | stranded | `#stranded`; one `TEARDOWN` line; later creates refuse |
| ready | the session's acquire assigns the record | validating | `validate` pings |
| validating | the ping resolves | leased | the pool commits and resets strikes (`:623-654`); `#hold` sets `#lease` and mirrors |
| validating or ready | the ping rejects, or the watch settles | lost | `#lose` records; the pool strikes and disposes (`:571`, `:589-606`, `:436`, `:447-465`) |
| leased | the per-call ping rejects, a failed call's ping rejects, or the watch settles | lost | `#lose`: unmirror, clear `#lease`, `#notice`, `token.destroy()`; the pool credits the owed attempt after a resolved disposal (`:463`) |
| lost | the hook resolves | gone | the pool deletes the record and refills (`:737`, `:744`) |
| lost | the hook rejects | retained | the pool keeps it counted (`:734-736`); one `TEARDOWN` line |
| any | `destroy()` | (released) | the server's `destroy()` sequence |

### Failure table

The following table gives each failure, its signal, the action, and what the caller sees:

| # | Failure | Signal | Action | Caller sees |
| --- | --- | --- | --- | --- |
| 1 | Chromium cannot start at setup | `#warm` rejects twice | the pool's bound; `start()` and the acquire reject `create` | `initialize` `-32000` with `BROWSER_SERVER_UNAVAILABLE: <cause>` and `data.code`; one stderr line; exit 1 after the input ends |
| 2a | The root is unusable | `mkdir` rejects | `UNAVAILABLE` (A-2) | as row 1 |
| 2b | The `.profiles` read fails | the sweep catches it | one `SWEEP` line | nothing at onset |
| 3 | A spare cannot start | its creates reject | `start()` rejects after the grant; one `EXHAUSTED` line | nothing; fewer browsers serve |
| 4 | Another Chrome answers on 9222 | none after U2 | no port probe without `cdp.port` | nothing |
| 5 | An idle spare exits | its watch | the pool strikes, disposes, and refills within the bound | nothing |
| 6 | The leased process exits between calls | its watch | `#lose`, `token.destroy()`, the owed refill | the next call runs on the spare, or waits for the successor at size 1, and opens with `BROWSER_SERVER_CRASH:` naming the URL |
| 7 | The leased process exits during a call | the call's requests reject first (`src\core\CDPClient.ts:288-297`), then the post-failure ping rejects | as row 6 | `BROWSER_SERVER_UNRESOLVED:` (outcome unknown, what was lost, not repeated); a call that succeeded keeps its success |
| 8 | The socket drops while the process lives | the post-failure ping rejects at once (`src\core\CDPClient.ts:118-120`) | as row 6; the hook terminates the process | as row 7 |
| 9 | The current view's renderer crashes | `crash` on `toolset.view` | as row 6 | as rows 6 and 7 |
| 10 | A background tab crashes | `crash` on another page | none | `tabs` lists it |
| 11 | The lease hangs between calls | the per-call ping rejects with `CDPTimeoutError` | `#lose`; `SIGKILL` in the hook; the owed refill | that call waits one deadline (plus a launch at size 1), then runs with the note |
| 11b | The lease hangs during a call | the tool's deadline, then the post-failure ping's deadline | as row 11 | `UNRESOLVED` after two deadlines (M5) |
| 12 | An idle spare hangs | `validate` times out | strike; `SIGKILL` when a pid exists; the waiter waits for a refill | the hand-out takes one deadline longer |
| 13 | The renderer hangs while the browser answers | the call's own deadline; the post-failure ping resolves | none | that call's timeout text |
| 14 | The lease's termination is unconfirmed | the hook rejects | the pool retains the record and no successor launches; one `TEARDOWN` line | size 2: the call runs on the spare; size 1: the note, then `UNAVAILABLE` naming the pid (needs P-1); `destroy()` rejects; exit 1 |
| 15 | `rm` fails past its retries | `rm` rejects | `#faults`; the successor still warms | as the end of row 14; a later sweep removes the folder |
| 16 | The bound is spent while a browser serves | the pool stops refilling | the next grant re-arms the bound (`Pool.ts:651`) | nothing (T4) |
| 17 | Every browser is gone and the bound is spent | the acquire rejects `create` at once (`:350-360`) | refuse | each call: a pending note, then `UNAVAILABLE` with `error.cause ?? #failure` |
| 18 | The server is killed | none in process | the next start's sweep closes the browser and checks its pid; `destroy()` rechecks | nothing; the orphan lives until then (M6) |
| 19 | The server is killed between spawn and rename | no record | the sweep removes the folder; a Windows lock refuses it | an orphan might run |
| 20 | Input end, `SIGINT`, or `SIGTERM` during setup | listeners attached first | `destroy()` aborts launches, pings, the acquire, and the sweep; `pool.destroy()` rejects `start()` with `destroyed` | `start()` resolves; exit 0 |
| 21 | The client's startup timeout passes | the client's own | as row 20 when the client closes the input (U11) | the client's display |
| 22 | Concurrent first calls | the shared `#granting` | one lease | every call runs on one browser |
| 23 | Exit, socket loss, and crash overlap | the first settles | the `#losses.has` guard and the pool's guard (`:447-454`) | one loss, one successor |
| 24 | A browser dies between create and grant | its watch | the pool never commits a lost record (`:629-639`) | nothing |
| 25 | `destroy()` then `start()` | `#closing` | `start()` rejects `ENDED` before attaching anything | nothing attached or launched |
| 26 | `start()` and `destroy()` in one turn | `#closing` checked after `mkdir` | no `pool.start()`, no sweep | both settle; nothing launched |
| 27 | The bound is spent while one create is in flight | the pool waits for `!refilling` (`:350-354`) | the waiter stays | `initialize` answers when that create succeeds (R2-4) |
| 28 | A leftover browser hangs during the sweep | the attach parks | off the handshake path; `#abort` rejects it | nothing |
| 29 | The lease and a spare are lost in one turn | either order | the owed credit survives (`:390-391`, `:463`) | the next call runs on the successor with the note |
| 30 | A call fails for its own reason on a live browser | the post-failure ping resolves | none | the plain failure text |
| 31 | A launch fails and its teardown fails | `#warm`'s cleanup rejects | `#stranded`; later creates refuse | as rows 1 or 3; `destroy()` reports it |
| 32 | The hand-out ping fails and that teardown fails | the acquire rejects `cleanup` (`:591-599`) | none | that call: the note, then `UNAVAILABLE`; the next call acquires again |

### Roadmap texts

In item 14, `LINE` stands for the line number U13 reads from the landed file.

**Browser item 13**, pasted by U5 and removed by U13:

```markdown
- **13.** Start `browse`'s browsers at server start and replace one that dies: `start()` (`src/server/BrowserMCPServer.ts:131-139`) serves stdio and launches nothing, the first tool call launches one Chromium (`#open` and `#launch`, `:199-260`), a fulfilled launch stays in `#session` (`:85`, `:199-209`) after its browser exits, and nothing subscribes to the browser's `disconnect` (`src/server/Browser.ts:416-418`), so a crashed browser leaves every later call on a dead page. Declare `@orkestrel/pool` `^0.0.14` and compose one pool of `BrowserSlot` records with `min` equal to the size, a `restarts` bound, a `watch` on each browser's `disconnect` and its current page's `crash`, and a ping as `validate`; start it beside a sweep of the profiles a killed server left; gate `initialize` on the session's first lease through `@orkestrel/mcp` 0.0.36's `handshake` hook; ping the held lease before every call and after a failed one, and destroy its token on a failed ping; answer a call its browser's loss interrupted with `BROWSER_SERVER_UNRESOLVED` and never repeat it. Keep the size at 1 until the user rules on the spare's measured value (D3, D10, 2026-10-03).
```

**Browser item 14**, pasted by U13:

```markdown
- **14.** Let `browse` serve a second holder at the same time: the session holds one token across calls (`#lease`, `src/server/BrowserMCPServer.ts:LINE`) and concurrent calls share one acquire (`#granting`, `:LINE`), so every other warm browser waits idle in the pool for failover only, and a replay runs on the session's browser. After the user rules that failover is proven (D10, 2026-10-03), give each holder its own token from `pool.acquire()`, rule whether a holder that ends releases its browser to the next holder or destroys it for a clean page, keep the holders within the size, and measure the contention on the target host before raising the default.
```

**The sentence U15 appends to probe item 1** (`probe\ROADMAP.md:5`):

```markdown
Build it on `@orkestrel/pool` 0.0.14 as `@orkestrel/browser`'s `browse` server does: one pool per stage with `min: 1` and a `restarts` bound, `start()` at server start, `create` constructing the stage (`src/server/Probe.ts:137-139`), `destroy` calling the stage's own (`:545`), `watch` settling on the Oxlint client's `exit` (`src/server/stages/LintStage.ts:156`), `validate` where a stage can answer a liveness check, `acquire()` for each `prove`, and the leased token's `destroy()` in place of the deadline recycle (`#recycle`, `src/server/Probe.ts:536-575`); re-pin `@orkestrel/contract` to `^0.0.19`, because pool pins it, and declare pool on the user's request of 2026-10-03.
```

### Map: revision 3's workarounds and findings, and where each went

The following table maps each workaround to the pool member that replaces it:

| Revision 3 | Replaced by |
| --- | --- |
| W1: the owner acquire loop (`#fill`, `#filling`, `#receive`, `#refuse`, the pass sizing) | `min`, `start()`, and the pool's refill (`Pool.ts:149-159`, `:382-423`) |
| W2: loss observation (`#watches` controllers, `#lost` as a marker) | `watch(value, signal)` with the pool's controller (`:425-445`, `:710`); browse keeps only the listener map |
| W3: disposing a chosen record (release, then `clear()` or a refusing `#validate`, and the idle drain) | `PoolToken.destroy()` and disposal driven by `watch` (`:297-305`, `:447-465`); browse never calls `clear()` |
| W4: `#survivors` and the subtraction from `k` | retention under `min` (`:734-737`, `:390`); P-1 closes the waiter case |
| W5: `#strikes`, `#owed`, `BROWSER_SERVER_RESTARTS` in the loop | `restarts` (`:378-380`, `:412-420`, `:467-472`) and the owed credit (`:390-391`, `:463`) |
| W6: `#spares`, `#change`, `#wake`, `#promote`, `#granted` | the idle list and `acquire()` with `validate` as the ping; under `min` no refill waiter exists (`:349-363`, `:412-423`) |
| W7: `#lease` beside `#spares` | `#lease` stays as the session's token; no pool holder (V6) |
| W8: the commit order at sizes 2 and 3 | moot: one create at a time and one waiter (`:384`) |
| `#lost` as a marker | the pool's ownership guards (`:447-454`, `:554-562`, `:629-639`) |
| `#lost` as loss text and the forced-kill cause | browse policy, `#losses` |
| `#serve`'s repeat loop | one ping and at most one acquire (X-4) |
| `#mirrored` | derived from `#lease` (X-5) |

The following table maps each finding to where it went:

| Findings | Where |
| --- | --- |
| V1, V2, V3, V4, V5 | pool members (rows of "Pool 0.0.14 as read"); browse pins them in U6 and U7 |
| X-1 SSE session mint | done in U1 (`mcp\src\server\middlewares.ts:219-221`) |
| X-2 V4 needs ping-driven losses | U7 V4 cases through `validate` and `token.destroy()`; browse has no `clear()` path |
| X-3 unmirror case cannot fail | U7 keeps it as hygiene, with no "fails without" claim |
| X-4 one call drives unbounded launches | `#serve` bound; U7 case |
| X-5 `#mirrored` duplicates `#lease` | derived; U6 |
| X-6 `log` writes; `ENOENT` | `#write`; the sweep keeps a folder; U6 |
| X-7 watch rejection | the pool's rejection path plus `error`; U7 |
| X-8 0o300 fixture | U6 |
| X-9 `SIGTERM` timing | U6 |
| X-10 killed-server control | U6 service |
| X-11 silent spare | U7 asserts that `destroy()` resolves |
| X-12 `mkdir` code | U6 probes it |
| X referrals | `renderBrowserServerLoss` (U4); `restarts` is shipped by the pool; `BrowserSlotWatch` (U7); the concurrent writer is the U2 precondition; D12's "move" is settled by D13 |
| `design.md` U8 repairs | attack 2 and attack 3 as listed for X-2 and X-3 |
| R3-1, R3-4, R3-6, R3-9, R3-10, R3-11, R3-12, R3-13, R3-15 | carried: post-failure ping; `BrowserSlot.context`; pid guard; synchronous `#closing`; unmirror in `#lose`; `#failure` and the pid from context; rows 2a and 2b; `waitForProcessExit`; teardown sentence |
| R3-2 idle drain, R3-3 V5 order, R3-5, R3-7 loop `finally`, R3-8 | moot: no browse loop; the pool's tests cover the owed credit in both orders (`pool\tmp\codex\floor-last.md:25`) |
| R3-14 conservative `UNRESOLVED` | T10 |
| R3-16 merge `main` first | U2 precondition |
| R2-1, R2-2, R2-3, R2-4, R2-5 | pool owed credit; no create for a waiter; no browse loop; the pool waits for `!refilling`; retention plus `#stranded` |
| R2-6 to R2-15 | carried: closing guards; the watch never settles on abort; teardown order; known outcomes; `validate` under `#abort.signal`; bare-client sweep; the double's signal (U2); `isPoolError` classification; restated count table; M5 |
| A-1 to A-31 | carried as revision 3 maps them (`eager\revision-3.md:1243-1273`); A-6 is the pool's bound; A-21 stays moot; A-22 is `#warm`'s failure path plus `#stranded`; A-26 is the watch removing its listeners on settle and on abort |

## Alternatives

Two real alternatives lose to this design:

- **Build revision 3's browse-side layer on pool 0.0.13.** D13 forbids it (`eager\design-brief.md:25`). It duplicates the mechanism the pool provides, and `eager\design.md:13` records that its hand-out path would need a rewrite at the move.
- **Acquire and release per call, so `validate` is the only ping.** The pool hands out its oldest idle record (`Pool.ts:340-347`). At size 2, consecutive calls would land on different browsers and lose the page state the agent built. A released record is also "used", so its later loss adds no strike (`:467-472`). The held lease wins.

The following table rules every other rejected option:

| Rejected option | Reason |
| --- | --- |
| Gating the handshake on `pool.start()` | at sizes 2 and 3 it waits for every browser, against D10 |
| Calling `pool.start()` again after a refusal | it resets the bound (`Pool.ts:156`), which makes a launch loop on demand (V3) |
| Waiting for the lost lease's teardown before acquiring | at size 2 the spare serves at once; the pool already orders the successor after the teardown |
| A browse survivor map | the pool retains the record; P-1 closes the waiter case |
| Ignoring a stranded launch | the pool cannot count it, and a successor would launch beside it |
| A size-precise stranded guard | rare, and the guard needs `#size` and pool counts; conservative refusal is safe (T15) |
| A watch that settles on abort | the pool ignores it, but it would contradict "settles on loss" (R2-7) |
| A watch that reads `browser.contexts()` | that list can hold a synced default context (R3-4) |
| Logging every spare loss after warming | noise without a ruling (T4) |
| Resetting the bound from browse | the pool owns it; `start()` is its only reset |
| A forced kill outside the hook | a second termination site, against D8 |
| A shorter ping deadline or a scheduled check | a fixed figure (D5) and polling (`scaffold\AGENTS.md:68`) |
| Gating `server/discover` | no specification text (A-13) |
| Restoring the last address or repeating a call | side effects; the agent owns re-execution |
| One code for the note and the interruption | recovery must not parse prose (`reliability-assessment.md:259`) |
| An eager-off switch, or a `browsers` or `spares` option | D1; clashes with `BrowserOptions.browsers`; D6 states a size |
| `@orkestrel/supervisor`, or `Supervisor` from `@orkestrel/process` | the user's exclusion (`eager\design-brief.md:8`) |

## Constraints

**Pool** (`pool\` at `aea3bda`):

- Construction validates the options: `min` and `max` must be equal, and `restarts` is required with `min` (`src\core\Pool.ts:81-119`).
- The floor branch never creates for a waiter (`:349-363`).
- Refills are serialized (`:384`, `:390-399`).
- The watch is armed per record (`:425-445`), and disposal aborts it before the hook (`:710`, `:713`).
- A late loss does nothing (`:447-454`).
- Strikes and the reset come from `:412-420`, `:467-472`, `:571`, and `:651`.
- The owed credit comes from `:390-391` and `:463`.
- Retention comes from `:734-737`.
- Token destruction is at `:297-305`.
- The teardown barrier is at `:231-252` and `:794-812`.
- `create` and `validate` take no signal (`src\core\types.ts:87-89`).
- The pool pins contract `^0.0.19` and emitter `^0.0.11`, and it has a dev dependency on probe (`package.json:72-73`, `:78`).

**mcp** (`mcp\` at `94e2e09`, 0.0.36):

- The hook waits only on the legacy `initialize` (`src\core\MCPLegacy.ts:142-165`).
- The error mapping is at `:149-161`.
- The hook passes through `createMCPLegacy` (`src\core\factories.ts:92`).
- The types are at `src\core\types.ts:1770`, `:2189`, and `:2346`.
- `JSONRPC_SERVER_ERROR` is at `src\core\constants.ts:307`.

**Browser** (`browser-wt-browse` at `d6937be`, 0.0.21):

- The package pins mcp `^0.0.35` and contract `^0.0.19` (`package.json:105`, `:109`).
- The lazy launch is at `src\server\BrowserMCPServer.ts:131-139` and `:185-260`.
- The profile name is a bare UUID (`:215`).
- `#unmirror` and `#withdraw` are at `:270-290`.
- The exit and transport-loss handling is at `src\server\Browser.ts:388-476`, and the abort race is at `:371-386`.
- The port probe is at `:320-322` and `:543-561`.
- `#terminate` throws with the pid at `:1139-1141`, and `#finish` destroys the emitter at `:1156-1157`.
- The page `crash` event is at `src\core\types.ts:1084`, `BrowserContextOptions` at `:1607-1614`, and `BrowserReferenceFunction` at `:2509`.
- The context's own counter is at `src\core\BrowserContext.ts:71` and `:349`.
- `isCDPTimeoutError` is at `src\core\errors.ts:186`.
- `CDPClient.send` refuses at once when not connected (`src\core\CDPClient.ts:118-120`), and its deadline is at `:134-145`.
- `parseBrowserLockEntry` is at `src\server\helpers.ts:59-65`.
- The store's pid check is at `src\server\stores\FileBrowserStore.ts:214-222`.
- `main.ts` prints the coded line at `src\bin\main.ts:31-33`.
- The test fixtures are at `tests\setupServer.ts:152`, `:187`, `:360`, `:1500`, `:1673-1710`, and `:2167`.
- The worktree's roadmap holds items 6 to 8 (`ROADMAP.md:3-5`), and `main`'s holds items 6 to 12 (`browser\ROADMAP.md:3-9`).

**Probe:** the package pins contract `^0.0.18` (`probe\package.json:95`). Item 1 is at `probe\ROADMAP.md:5`.

## Refusals

Each refused option is followed by the rule that forecloses it:

- **A periodic liveness check:** "No polling architecture. Park idle work on events and abort signals." (`scaffold\AGENTS.md:68`)
- **A stored `spent`, `unavailable`, or `#mirrored` copy:** "never store a second flag or label that can drift." (`scaffold\AGENTS.md:58`)
- **Keeping the lazy launch beside the eager path:** "No compatibility shims. Update every consumer in the same change." (`scaffold\AGENTS.md:66`)
- **Faking a crash or spying on stderr:** "NEVER use mocks, behavioral fakes, module replacement, framework spies, or fake clocks for project-owned behavior." (`scaffold\AGENTS.md:42`)
- **A double whose `kill()` alone proves the in-call order:** a stub "never stands in for the integration being claimed" (`scaffold\.claude\rules\tests.md:32`).
- **Closures declared inside the watch:** "Never declare or assign a function inside another function or method." (`scaffold\.claude\rules\architecture.md:173`)
- **`BrowserSlot` or `BrowserSlotWatch` declared in `BrowserMCPServer.ts`:** "An implementation file holds one class plus imports." (`scaffold\AGENTS.md:60`)
- **A `poolSize` key:** "Never flatten these into prefixed keys." (`scaffold\.claude\rules\names.md:49`)
- **`reset`, `restart`, or `#teardown` as member names:** "Never introduce synonyms such as `cancel`, `reset`, or `run` for these meanings." (`scaffold\.claude\rules\names.md:234`)
- **A fixed test port:** "never to a fixed port" (`scaffold\.claude\rules\tests.md:33`)
- **An inline wait loop in a test:** "A polling loop, a deadline read, or a deferred that observes an abort or an event in a test or a setup module is a defect" (`scaffold\.claude\rules\tests.md:236-237`)
- **Re-implementing pool logic in browse:** "Reuse a primitive whose semantics match; never wrap one to rename it." (`scaffold\AGENTS.md:45`)
- **Adding pool without a request:** "NEVER add an npm package unless the user explicitly requests it" (`scaffold\AGENTS.md:38`). D11 is that request.

## Measurements

**Readings supplied:**

- `status.md:19` (2026-10-03, loaded host, preliminary): an 80.5 ms headless-shell launch and no end-to-end gain from a warm test browser. It bears on D3 only.
- The pool writer's report (`pool\tmp\codex\floor-last.md`, 2026-10-03, Windows): 77 of 77 core tests and every gate passed. Linux was not run, and no independent review had run (`:70`).
- This lane's static reading on 2026-10-03:
  - the pool behaviors tabled in this document;
  - P-1;
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
- how often a first launch fails transiently on the target host;
- the row 11b total against each client's tool timeout;
- whether a `Writable` whose `write` option throws propagates the throw out of `write()` on the Node version in use.

**Plan.** The case decides every figure, and none is fixed in advance:

- **Hosts:** the target Windows host, plus a Linux host for the POSIX rows.
- **Instrument:** a TypeScript instrument run by Node under `browser-wt-browse\tmp\probes\eager\`, driving `dist\bin\main.js` over stdio.
- **Load:** a realistic session against a heavy local page (`navigate`, `look`, `read`, `click`, `type`, `replay`) while the veneer journey projects run.
- **Reporting:** distributions, never a lone mean.
- **Control:** onset under load must exceed onset at idle. Otherwise the record states that the load was not reached.

The readings to take:

- **M1:** `#warm` per slot, and the time until the floor is full at sizes 1 to 3 under the pool's serialized refill, idle and under load (T3).
- **M2:** spawn to the `initialize` answer at sizes 1 to 3, with and without a leftover browser, read against 10 s and 30 s.
- **M3:** failover from killing the leased pid to the next successful call, at size 1 against size 2. Control: at size 2 the endpoint differs.
- **M4:** a spare's idle working set and CPU, and the leased call's latency with and without the spare under load.
- **M5:** the per-call and post-failure ping round trips, the row 11 recovery, and the row 11b total, read against Codex's 60 s.
- **M6:** whether Chromium survives `TerminateProcess` and `SIGKILL` of the server.
- **M7:** whether `DevToolsActivePort` appears with the port and GUID.
- **M8:** the refill launch time while the session works.
- **M9:** over a long launch series under load, the failure rate and whether the immediate retry succeeds. It informs `restarts`.

The Orchestrator records the readings in `eager\readings.md`. The user rules on D3 from M3 and M4, and on the bound from M9.

## Units

Writers serialize. Each writer owns only its files, stops at its project boundary, and reports the commands it ran. Every proof uses real implementations, and the service projects use real Chromium. Each case names the defect it fails for.

### U1 (done): `@orkestrel/mcp` 0.0.36 handshake hook

- **State:** the hook is at `mcp` `94e2e09` (`src\core\MCPLegacy.ts:142-165`, `src\server\middlewares.ts:219-221`, `guides\mcp.md:1987-2005`).
- **Remaining:** the verifier runs the tree-wide gates, the user publishes, and the Orchestrator records the pack integrity.

### Floor unit (done, in review): `@orkestrel/pool` 0.0.14

- **State:** the unit is at `pool` `aea3bda` (`pool\tmp\codex\floor-last.md`).
- **Review:**
  - The reviewer (Opus 5.5, objective) rules P-1 and the assumptions table.
  - A P-1 repair adds the acceptance sequence under "Pool 0.0.14 as read".
- **Release:** gates, then the user publishes.

### U2: `Browser.endpoint`, `Browser.ping`, the port probe, and the double's signal

- **Precondition:** release 0.0.22 has landed, and `main` is merged into the worktree. Other writers are changing the waits and the service tests (R3-16, X referral).
- **Role and engine:** builder (Sonnet 5.5).
- **Owns:**
  - `src\server\types.ts` (`BrowserInterface` members and the `BrowserCDPOptions` remark);
  - `src\server\Browser.ts`;
  - `tests\setupServer.ts` and `tests\setupServer.test.ts`;
  - `tests\src\server\Browser.test.ts`;
  - the added cases in `tests\service\browser.test.ts`;
  - the guide rows.
- **Spec:** as `eager\revision-3.md:898-923`:
  - `endpoint` is set at `Browser.ts:574` and `:653`, and cleared at `:350`, `:406`, `:463`, `:589`, `:672`, and `:1150`;
  - `ping` sends `Browser.getVersion`;
  - the port probe runs only when `cdp.port` is set (`:320-322`);
  - the double gains `endpoint`, `ping`, and a signal-honoring `connect()`;
  - the launcher gains `silent`, `timeout`, and `version`.
- **Accept:**
  - `src:server`: `endpoint` and `ping` behave per state, and a held double's `connect()` rejects on abort.
  - `service`: `endpoint` matches `^ws://127\.0\.0\.1:\d+/devtools/browser/`.
  - `service`: an ephemeral `/json/version` fixture with `cdp.port` set makes the launch reject naming that port. Fails without the probe.
- **Run:** the two test files, `npm run test:src:server`, `npm run test:setup`, and `npm run test:guides`.

### U3: `BrowserContextOptions.reference`

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:** `src\core\types.ts` (the member), `src\core\BrowserContext.ts`, `tests\src\core\BrowserContext.test.ts`, and the guide row.
- **Depends:** U2.
- **Spec:** the constructor stores `options?.reference`. `#attach` and `#reattach` pass it, or `this.#nextReference.bind(this)` when it is absent (A-9).
- **Accept:**
  - Two contexts given one function issue `e1` and then `e2`.
  - Without the option, each context starts at `e1`.
  - Fails when the option is read from `BrowserPageOptions`.
- **Run:** the test file, `npm run test:src:core`, and `npm run test:guides`.

### U4: profile and loss helpers

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:**
  - `src\server\types.ts` (`BrowserProfileRecord`);
  - `src\server\helpers.ts` (`probeProcess`, `parseBrowserProfileRecord`, `renderBrowserServerLoss`);
  - `src\server\stores\FileBrowserStore.ts` (route `:214-222` through `probeProcess`);
  - `tests\src\server\helpers.test.ts`;
  - the guide rows.
- **Depends:** U3.
- **Accept:**
  - `probeProcess(process.pid)` is true, and `readExitedProcessId()` gives false.
  - `parseBrowserProfileRecord` round-trips a record and returns undefined for bad text, a missing key, a bad pid, and an endpoint that is not `ws://`.
  - `renderBrowserServerLoss` opens with its code. Its `UNRESOLVED` text states that the outcome is unknown and that the call was not repeated.
  - A cause `new BrowserConnectionError('Browser process did not exit after SIGKILL', { pid: 4242 })` renders `4242`.
  - The store's lock tests stay green.
- **Run:** the test file, `npm run test:src:server`, and `npm run test:guides`.

### U5: dependencies and item 13

- **Precondition:** pool 0.0.14 and mcp 0.0.36 are published.
- **Role and engine:** builder (Sonnet 5.5).
- **Owns:**
  - `package.json` (`"@orkestrel/pool": "^0.0.14"` and `"@orkestrel/mcp": "^0.0.36"`);
  - `package-lock.json`;
  - `guides\pool.md`, a byte-identical mirror of the pool repository's `guides\pool.md` at its published commit;
  - the `guides\mcp.md` mirror;
  - the `guides\README.md` rows;
  - `ROADMAP.md` (paste item 13).
- **Depends:** U4.
- **Accept:**
  - `npm ci --ignore-scripts`, `npm run check`, `npm run test:src`, `npm run test:policy`, and `npm run test:guides` are green.
  - `npm ls @orkestrel/pool @orkestrel/mcp --omit=dev` shows one copy of each at 0.0.14 and 0.0.36.
  - The output of `npm ls @orkestrel/contract --omit=dev` is in the report.

### U6: the eager server on the pool (composition, setup, handshake, hand-out, closing, teardown, sweep, logging)

- **Role and engine:** astra (GPT-6 Astra).
- **Owns:**
  - `src\server\types.ts` (`BrowserSlot`, the server block, the `BrowserLaunchFunction` doc);
  - `src\server\constants.ts`;
  - `src\server\BrowserMCPServer.ts`;
  - `src\server\factories.ts` (the doc and the `@example` at `:98-106`);
  - `tests\src\server\BrowserMCPServer.test.ts`, rewriting the lazy cases at `:34`, `:71`, and `:122`;
  - `tests\setupServer.ts` and `tests\setupServer.test.ts` (`hold(from?)`, `refuse(from, count?)`, and a line-collecting `log` stream);
  - `tests\setupService.ts` and `tests\setupService.test.ts` (the recording launcher);
  - `tests\service\browse.test.ts` (added);
  - the server rows of `guides\browser.md`.
- **Depends:** U2 to U5.
- **Spec:**
  - Composition without `watch` (U7 adds it).
  - Setup, the handshake, `#grant`, `#hold`, `#refuse`, and `#serve`'s ping-and-acquire.
  - `#warm` without the stranded refusal.
  - `#destroySlot` steps 2 to 5.
  - Closing and `destroy()`.
  - The sweep and `#write`.
  - The derived `#mirrored`.
  - A size that is not an integer from 1 through `BROWSER_SERVER_POOL_LIMIT` throws `BROWSER_SERVER_OPTIONS`.
- **Accept, `src:server`** (doubles over the real Pool 0.0.14):
  - **Eager:** a launch exists before any input is written. Fails when the launch stays lazy.
  - **Handshake:** under `hold()`, `initialize` waits while `ping` and `tools/list` answer. After `release()`, `initialize` answers. At size 2 with the second launch held, `initialize` answers. Fails when setup awaits `pool.start()`.
  - **Start failure, size 1, `failures: 2`:**
    - `initialize` gets `-32000`, `data.code`, and the fixture text one time;
    - `start()` rejects `UNAVAILABLE`, and `tools/call` answers `UNAVAILABLE`;
    - exactly 2 launches.
  - **Per-size start:** with every create failing, sizes 2 and 3 launch exactly 2. Fails when browse adds retries.
  - **Spare fails at start:** size 2, later launches refused and held until after the first grant. The case records exactly 3 launches, one `EXHAUSTED` line, and calls on double 0. Fails without `#exhaust`.
  - **Grant reset:** the same input with the refusals released before the grant records 4 launches. This pins `Pool.ts:651`.
  - **No launch on demand (V3):** size 1. Kill the lease (U7 adds `kill()`; until then, a `version` handler fails the per-call ping) while every later launch is refused. Five later calls keep the launch count. Fails when browse calls `pool.start()` again.
  - **Concurrency:** concurrent first calls run on one double. At size 2, after a lease loss, two concurrent calls lease one browser, and the other double's page stays at `about:blank`. Fails when each call acquires.
  - **Options:** sizes 0, 4, 1.5, and -1 throw `BROWSER_SERVER_OPTIONS`.
  - **Destroy during a hold:** `destroy()` resolves `start()` without `release()` and writes nothing afterward.
  - **One-turn close:** an exited child's bare-pid entry survives, no launch is recorded, both promises settle, and the listeners return to baseline.
  - **`destroy()` then `start()`:** rejects `ENDED`, with no launch and baseline listeners.
  - **Unusable root:** probe the host's `mkdir` code under a regular file first, then assert `initialize` `-32000` and `start()` naming that code (X-12).
  - **Unreadable `.profiles`:** on POSIX as a non-root user, a mode `0o300` directory. `initialize` answers, and one `SWEEP` line is written. Probed at runtime; NOT-EVIDENCED elsewhere (X-8).
  - **Sweep:** keep and remove as revision 3 describes. A record read that fails with anything but `ENOENT` keeps the folder (X-6). The negative case keeps a folder whose endpoint refuses (A-27). A `CDPTestServer` or `StallServer` endpoint never delays `initialize`, and `destroy()` resolves (A-3).
  - **One teardown line:** a destroy-rejecting double. `SIGTERM` is emitted from an `end` listener registered after the server's. Exactly one `TEARDOWN` line (X-9).
  - **Log failure:** a `log` whose write throws. `destroy()` rejects with the write failure in its `AggregateError`, and no `unhandledRejection` arrives. The writer first probes whether the throw leaves `write()` on the Node version in use.
- **Accept, `service`:**
  - `start()` resolves after a recorded browser connects.
  - `navigate` then `look` run on one pid. At size 2, the other page stays at `about:blank`.
  - After `destroy()`: `ESRCH` for every pid, every port refuses, no `<pid>-` entry remains, and listeners are at baseline.
  - A missing executable gives exactly 2 launches, `ENOENT` in `start()`, `-32000`, and no profile.
  - **Killed server:** a child Node server is killed. `probeProcess(pid)` is true before the second `start()` (X-10). After that start, `waitForProcessExit(pid)` resolves, and the second server's `destroy()` leaves the folder gone.
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
  - `isolate()` keeps contexts, and `contexts()` returns them;
  - `kill()` emits `disconnect`;
  - `drop()` closes the fixture transport and emits `disconnect` a macrotask later;
  - `defer()` and `resume()`;
  - launcher options `survivors?: number` (that many doubles' `destroy()` rejects) and `broken?: number` (that many doubles' `isolate()` rejects).
- **Depends:** U6.
- **Spec:**
  - `watch` and `#watches`;
  - `validate` calling `#lose`;
  - `#lose`;
  - the post-failure ping;
  - `#losses`, `#notice`, and `#failure`;
  - the texts;
  - `#destroySlot` step 1;
  - `#stranded`;
  - `error: #fault`.
- **Accept, `src:server`:**
  - **In-call drop (R3-1):** the call answers `UNRESOLVED`, and the next call runs on a successor. Fails without the post-failure ping, because the call then answers `CDP connection closed`.
  - **Known failure:** an unknown reference answers the plain failure. No launch and no note follow.
  - **V4 on the validation path:** `silent: 1`, size 2. Double 0's hand-out ping times out. Its `disconnect`, `page`, and `crash` counts return to 0, and no kill is attempted (its pid is undefined). `destroy()` resolves (X-11). Double 2 launches, and the call runs on double 1.
  - **V4 on `token.destroy()`:** a `version` handler rejects the per-call ping. The lost lease's counts return to 0, and the call runs on the spare with the note.
  - **V4 on `pool.destroy()`:** every double's counts return to 0.
  - **V4 on a failed warm:** no listener is added.
  - All four V4 cases fail when the watch ignores its signal (X-2).
  - **One call, one acquire (X-4):** a `version` handler fails every per-call ping. Each call records at most one launch. Fails when `#serve` pings again after acquiring.
  - **Owed attempt (V5):** size 2. Kill the spare twice so the bound is spent. Kill the lease under `hold(next)`: exactly one launch follows, and after `release()` the call succeeds with the note.
  - **Survivor, size 1 (V1):** `survivors: 1`. `kill()` on the lease launches nothing and keeps the profile. The next call answers the note, then `UNAVAILABLE` naming unconfirmed termination. `destroy()` rejects with it. Ending the input writes one `TEARDOWN` line and sets `process.exitCode` to 1, which the test restores. Needs P-1, and fails by timeout without it.
  - **Survivor, size 2:** the call runs on double 1, no launch follows, and one `TEARDOWN` line is written.
  - **Stranded:** `broken: 1` with `survivors: 1` at size 1. Exactly 1 launch is recorded, and `start()` rejects naming the pid. Fails without `#stranded`.
  - **Concurrent calls across a fault (A-15):** a `wait` on A answers `UNRESOLVED` while a call on B carries the note.
  - **Known outcomes (R2-9):** a click that succeeds before its browser dies keeps its success, and the next call carries the note.
  - **Unmirror at loss:** hygiene only (X-3). The next lease's adopted tool has its dispatcher.
- **Accept, `service`** (size 2 unless stated):
  - **Lease kill:** the next call runs on the other pid and opens with `CRASH` naming the URL. One replacement launches after the predecessor's destroy settled.
  - **Outcome unknown:** a held fixture route records exactly one request, and the call answers `UNRESOLVED`.
  - **Renderer crash:** `Page.crash` on the view gives the note, and on a background tab it gives none. This decides A-17. A failure moves `Inspector.enable` into a core unit.
  - **Spare kill:** the call keeps its pid, and one replacement launches.
  - **Stale reference (A-8):** an old `eN` is refused after a kill and re-navigation.
  - **Size 1:** the next call after a kill waits and succeeds with the note.
  - **Hang, POSIX:** `SIGSTOP` the lease. The note arrives, the stopped pid gives `ESRCH`, and the replacement starts within one deadline of the ping's rejection.
  - **Missing executable after start:** a lease kill answers the note, then `UNAVAILABLE` naming `ENOENT`.
- **Run:** as U6.

### U8: the bin and `BROWSE_POOL`

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:** `src\bin\main.ts`, `tests\src\bin\main.test.ts`, the bin cases in `tests\service\browse.test.ts`, and the guide's variable list.
- **Depends:** U7.
- **Spec:** `parseInteger` sits beside `parseBoolean` (`src\bin\main.ts:1`, `:7`). An empty value counts as unset. A value that is not an integer gives `BROWSER_SERVER_ENVIRONMENT`. A value out of range surfaces the constructor's `BROWSER_SERVER_OPTIONS`.
- **Accept:**
  - With a missing executable, stdout carries `-32000`, and stderr carries exactly one `browse: BROWSER_SERVER_UNAVAILABLE: … ENOENT …` line with one code token. The exit code is 1 after the input ends.
  - `BROWSE_POOL=two` exits 1 with `ENVIRONMENT`, and `BROWSE_POOL=4` exits 1 with `OPTIONS`.
  - The built entry answers `initialize`, `tools/list`, and `navigate`. Input end gives exit 0 and leaves no `<pid>-` profile.
- **Run:** the test file, the service file, and `npm run test:guides`.

### U9: review

- **Role:** reviewer (Opus 5.5), objective lane, not a writer.
- **Scope:**
  - the ceiling and the stranded guard against the published pool;
  - the one-acquire `#serve`;
  - the derived `UNRESOLVED`;
  - the closing checks;
  - the forced kill;
  - the sweep's deletions;
  - the handshake mapping;
  - each row of the assumptions table against the published pool 0.0.14.
- **Depends:** U8.
- **Accept:** a falsify verdict. Each finding returns to its unit.

### U10: gates

- **Role:** verifier.
- **Work:** in browser, run `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, and `npm run test:service`, each read bare.

### U11: real-client check

- **Role:** verifier.
- **Work:**
  - Register the built `browse` with Claude Code and read `/mcp` with a missing executable and with a valid one.
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
  - `guides\browser.md` § Register the browse binary with Claude Code: the eager start, client budgets, `BROWSE_POOL`, the note and `UNRESOLVED`, the onset refusal, the `log` lines, and the one-time removal of bare `.profiles/<uuid>` folders;
  - Codex's `startup_timeout_sec`, only when M2 passes 10 s;
  - the lazy-launch passages of `README.md`;
  - `ROADMAP.md`: remove item 13 and paste item 14 with each `LINE` filled;
  - `package.json` at 0.0.23.
- **Depends:** U11 and U12.
- **Accept:** `npm run test:guides` and `npm run test:policy` are green, and every behavior sentence maps to a U6, U7, or U8 assertion.

### U14: gates and publish

The verifier reruns the U10 gates. The user publishes `@orkestrel/browser` 0.0.23, and the Orchestrator records the pack integrity.

### U15: probe roadmap sentence

- **Role and engine:** builder (Sonnet 5.5), in `probe`.
- **Owns:** `ROADMAP.md`. Append the sentence from the roadmap texts to item 1.
- **Depends:** U14.
- **Accept:** `npm run test:policy` is green.

### Release order

1. `@orkestrel/mcp` 0.0.36 (U1) and `@orkestrel/pool` 0.0.14 (the floor unit, after its review rules P-1): the user publishes both.
2. `@orkestrel/browser` 0.0.22 (items 11 and 12 and the reading change) lands from `main` as planned.
3. `@orkestrel/browser` 0.0.23: merge `main` into the worktree, then U2 to U13; U14 gates, and the user publishes.
4. `@orkestrel/probe`: a roadmap sentence only (U15), no release.

## Tensions

These judgment calls stay open for the user, the Orchestrator, or the other lane:

- **P-1 (Orchestrator, to the pool review).** The pool parks an acquire when retained records hold the floor. Recommended: repair it in 0.0.14 before publishing. If the review refuses, browse counts its destroy-hook rejections and refuses at `#grant` when they equal the size.
- **T2: the lease grant resets the strikes (user, already ruled in `eager\pool-floor-brief.md:24`; built at `Pool.ts:651`).** Revision 3 refused this reset. Its consequences:
  - a retired spare re-arms at the next grant;
  - counts depend on when the grant lands, so U6 pins both orders.
  The bound still holds per grant.
- **T3: refills are serialized (user).** Spares warm one after another (`Pool.ts:384`), against D8's "as eagerly as possible". Size 1 is unaffected. M1 measures it. Concurrent refills would be a pool change.
- **T4: a spare retired after warming is not reported (user).** The pool exposes no signal for it (V6). D10's "reported" is met at warming only. The alternative is one log line per spare loss from the watch.
- **T5: the bound applies pool-wide (user).** A failed spare retires after `restarts` + 1 failures, as in revision 3.
- **T6: `BROWSER_SERVER_RESTARTS = 1` (user).** It is reasoned, not measured. M9 informs it.
- **T7: a third ping site (user, D10).** The post-failure ping is accepted as part of "before every call". Row 11b costs a second deadline.
- **T8: D4 for modern clients (user).** A modern client meets the onset at its first `tools/call`.
- **T9: codes travel in tool text (user).** A `_meta` field could carry them later (`reliability-assessment.md:259`).
- **T10: conservative `UNRESOLVED` (R3-14).** A read-only tool and a call that failed for its own reason just before a loss still answer `UNRESOLVED`.
- **T11: the unset-port branch has no failing proof without binding 9222 (Orchestrator).** Recommended: accept it on review.
- **T12: the `log` option (subjective).** It is public for spy-free proofs and embedding hosts.
- **T13: `process.exitCode` set by a library class (subjective).** The class owns the input's end and both signals.
- **T14: `BrowserSlot` and `BrowserSlotWatch` are public by the kind-file law (subjective).** No public signature uses them. `BrowserSlotWatch.crashes` is a mutable `Map` behind a readonly property, because the watch adds pages as they appear.
- **T15: the stranded guard is conservative (subjective).** It refuses every later launch, not only one that would exceed the size. That is rare and safe, and a size-precise guard needs `#size` and pool counts.
- **T16: the pool leaves a cause-less loss's cause undefined (`Pool.ts:436`, `:571`).** Browse keeps `#failure`. The alternative is a pool change that records the watch's value as the cause.
- **T17: the record window between spawn and rename** stays open until M7.
- **T18: the probe dependency loop.** Pool has a dev dependency on probe (`pool\package.json:78`), and probe would depend on pool. This stays unresolved until probe item 1 (`resource\ruling.md:167`).
- **Names (subjective):** `#destroySlot`, `#lose`, `#serve`, `#grant`, `#hold`, `#refuse`, `#losses`, `#stranded`, `#exhaust`, `#nextReference`, and `renderBrowserServerLoss` (`scaffold\.claude\rules\names.md:104`).

## Risks

The design carries these risks:

- **The pool is in review.** Each row of the assumptions table is a dependency, and a change reruns U6 and U7.
- **P-1 left unrepaired** parks a size-1 call after an unconfirmed termination until the client cancels.
- **POSIX orphans** after a server `SIGKILL` live until the next start in the same root. Windows is unmeasured (M6).
- **A kill between spawn and rename** on POSIX lets the sweep delete a live orphan's profile.
- **Survivor classification is conservative.** Any `destroy()` rejection counts, including a local cleanup failure after termination.
- **A hang during a call costs two deadlines** (row 11b). At the 30 s default, that total meets Codex's 60 s tool timeout (M5).
- **The real-Chromium hang proof is POSIX only.**
- **`Page.crash` is experimental**, and detection might need `Inspector.enable`.
- **Slow hosts** might pass Codex's 10 s startup budget (M2).
- **The per-call ping adds one round trip,** and a failed call adds another.
- **With `BROWSE_HEADLESS=false`, each spare opens a window.**
- **The `log` failure case** depends on how a throwing `Writable` behaves on the Node version in use.
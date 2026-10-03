# Ruled design, revision 3: eager, recovering `browse` on a thin `@orkestrel/pool`

**Lane: ruling.** The dispatch names no single lane, so this document rules on both. The objective lane covers correctness against the code and what the contracts permit. The subjective lane covers shape and naming, and its calls are listed under Tensions.

Path conventions:

- Paths are relative to `C:\Users\mikes\WebstormProjects\`.
- Unqualified `src/` and `tests/` paths are in `browser-wt-browse`.
- Lifecycle records are under `scaffold\.orkestrel\veneer\lifecycle\`.
- "R2-n" names finding n of the attack on revision 2. "A-n" names finding n of `eager\attack.md`.

## Design

### Placement (D12)

D12 (`eager\design-brief.md:24`) sets the placement:

- `browse` declares `@orkestrel/pool` `^0.0.13` as a runtime dependency. The user requested it in D11 (`:23`), which `AGENTS.md:38` requires.
- `BrowserMCPServer` composes one unchanged `createPool<BrowserSlot>({ create, destroy, validate, max: size })` (`pool\src\core\factories.ts:39`).
- A layer inside `browse` adds what Pool 0.0.13 lacks. The layer is a set of private members of `BrowserMCPServer`. Each member has the semantics of the pool member it later becomes.
- `@orkestrel/pool` gets no API change and no release.

### Pool 0.0.13 as read

The layer relies on these behaviors of `pool\src\core\Pool.ts`:

- **Construction creates nothing** (`:65-80`).
- **A create runs only for a queued waiter.** It runs when no record is idle and `size + reservations < max` (`:263-277`, `:284-291`).
- **An idle record is validated only when it is handed out.** `#pump` hands the oldest idle record to the next unassigned waiter, and validation happens then (`:265-269`, `:293-312`).
- **A failed validation disposes the record and pumps the same waiter again,** which can create (`:386-408`). When that cleanup fails, the waiter is rejected with `cleanup` and nothing is created for it (`:391-402`).
- **`release()` recycles without validation.** The record goes idle and `#pump` runs (`:470-483`).
- **`active` counts committed, unreleased tokens only** (`:97-100`). It excludes reservations (`:272-275`) and results that wait in `#ready` (`:348-352`).
- **`clear()` disposes the idle snapshot.** It pumps after each cleanup and rejects with `cleanup` on any hook failure (`:147-160`, `:528-540`).
- **`#dispose` can be called twice safely** (`:485-501`).
- **A failed destroy frees capacity.** `#clean` deletes the record whether or not the hook rejected (`:518-520`).
- **Waiters settle in request order** at the commit barrier (`:425-444`).
- **`destroy()` is one barrier.** It rejects waiters with `destroyed`, disposes idle and leased records, waits for creates in flight, and destroys the emitter last (`:170-189`, `:336-342`, `:574-587`).
- **`acquire` rejects with one of four codes:** `destroyed`, `create`, `cleanup`, or a signal's reason (`:115-119`, `:319-329`, `:391-402`).
- **Events carry no payload, and a token is `{ value, release }`** (`pool\src\core\types.ts:35-58`).

### The layer and the pool member each part becomes

Each layer part maps to the member that a later expansion of `@orkestrel/pool` takes:

| Layer part in `BrowserMCPServer` | Later `@orkestrel/pool` member |
| --- | --- |
| `#size`, passed as `max` and used as the floor | `min` and `max` |
| `#fill()` starts or joins the loop; `#restore()` is the loop; `#refill` holds it | `start()`, plus a refill that needs no waiter |
| `#watches` (one `AbortController` per slot), armed in `#warm` with `.then(this.#lose.bind(this, slot))` | the pool arms `watch` after create and aborts its signal when disposal begins |
| `#lose(slot, cause)` | `PoolToken.destroy()` for the lease; disposal driven by `watch` for any other record |
| `#validate(slot)`, which returns `!this.#lost.has(slot)` | Pool's own disposal of a lost record. Browse's `validate` then becomes the ping. |
| `#strikes` with `BROWSER_SERVER_RESTARTS` | `restarts`, required with `min` (V2) |
| `#survivors`, subtracted from the floor | a record whose destroy rejects stays counted |
| `#spares` and `#change` | the idle list and the acquire queue, after refills need no waiter |
| `#lease` | the holder, deferred (V6) |

Three hooks stay browse policy before and after the move:

- `#warm()` is `create`.
- `#teardown(browser, profile, toolset, cause)` is `destroy`. The pool calls it as `(slot) => this.#teardown(slot.browser, slot.profile, slot.toolset, this.#lost.get(slot))`.
- `#watch(slot, signal): Promise<unknown>` is `watch`.

Each hook is an arrow given as an object-literal property value in the `createPool` argument, which `architecture.md:175` admits.

### How the layer drives Pool 0.0.13

**1. The owner fills the floor at start (D1, D7, D8).**

- Setup calls `#fill()`.
- With strikes at 0, the loop's first step issues `size` owner acquires with no signal.
- With no record idle and capacity free, Pool reserves a slot and runs `#warm` for each waiter (`Pool.ts:272-276`, `:314-317`).
- **No caller can cause a launch (V3).** Owner acquires are the only `acquire` calls in the server, so every create serves an owner waiter.

**2. The refill loop (R2-1, R2-3, R2-4).**

`#fill()` returns when `#closing` is defined. Otherwise it runs `this.#refill ??= this.#restore()`.

`#restore()` repeats a step with these parts, in order:

1. **Clear.** `await this.#pool.clear()`, catching its rejection. A `cleanup` rejection means a survivor, which `#teardown` has already recorded. This is the first statement and it always suspends, so `#refill` is assigned before the body can clear it.
2. **Check for closing.** If `#closing` is defined, stop.
3. **Compute the gap.** `k = #size − pool.active − #survivors.size`.
4. **Check the bound.** If `k <= 0` or exhausted (`#strikes > BROWSER_SERVER_RESTARTS`), stop.
5. **Size the step.** `n = #strikes === 0 ? k : Math.min(k, BROWSER_SERVER_RESTARTS + 1 − #strikes)` (R2-1).
6. **Acquire.** Issue `n` calls to `pool.acquire()`, each with `.then(this.#receive.bind(this), this.#refuse.bind(this))`, and await `Promise.allSettled` over them.

The loop keeps `k` exact without a pending count. A step awaits every acquire it issued, and the loop runs once at a time. So no step computes `k` while an owner acquire is outstanding, and no waiter outlives the loop (R2-3).

Stopping happens in one synchronous turn after the last await, in this order:

1. Set `#refill = undefined`.
2. Resolve and replace `#change`.
3. If the floor is short (`k > 0`, or survivors fill the gap) while a lease or spare exists, write one line to `log`:
   - `browse: BROWSER_SERVER_EXHAUSTED: …` when the bound stopped the loop;
   - `browse: BROWSER_SERVER_TEARDOWN: …` when survivors fill the gap (R2-14).

`#receive(token)` handles a token:

- When `#closing` is defined, it returns. Pool's barrier owns the record, and a later `release()` does nothing (`types.ts:53-56`).
- When `#lost.has(token.value)`, it adds a strike and calls `token.release()`.
- Otherwise it pushes the token onto `#spares` and wakes `#change`.

`#refuse(error)` classifies a rejected acquire through `isPoolError` (`pool\src\core\errors.ts:61-63`):

- `create` adds a strike and stores `error.cause` in `#failure`.
- `cleanup` adds no strike, because the survivor lowers `k` (R2-13).
- `destroyed` means the server is closing.

**3. A hand-out never refills (R2-2, D7, V3).**

`#grant()` is shared: `#granting ??= #promote()`, and `#granting` is cleared when it settles. Each caller races it against its own signal. `#promote()` repeats this check:

- **When `#closing` is defined,** it throws `BROWSER_TOOLSET_ENDED`.
- **When a spare exists,** it pings `#spares[0].value.browser` with `{ signal: #abort.signal }` (R2-10).
  - On success, if that token is still the head, its slot is not lost, and the server is not closing, it moves the token into `#lease` and mirrors the leased toolset's adopted tools.
  - On a rejection while `#abort` has aborted, it throws `ENDED`.
  - On any other rejection, it calls `#lose(head.value, error)` and repeats.
- **When no spare exists and `#refill` is defined,** it awaits `#change.promise` and repeats.
- **Otherwise,** it throws `BROWSER_SERVER_UNAVAILABLE`. The cause is a survivor's error when survivors fill the gap, and `#failure` otherwise.

`#grant` never calls `#fill`. A grant moves a token from `#spares` to `#lease`, and both count in `pool.active`, so `k` is unchanged. No grant resets `#strikes` (behavior 6). So no hand-out changes what a step issues.

`#acquire(signal)` runs per call and repeats this check:

- **When `#closing` is defined,** it throws `ENDED`.
- **When a lease exists,** it pings with `AbortSignal.any` over the call's signal and `#abort.signal`.
  - On success, it re-checks that `#lease` is still that token and its slot is not lost, then returns the slot (R2-9).
  - On a rejection caused by an abort, it rethrows the reason.
  - On any other rejection, it calls `#lose(slot, error)` and repeats.
- **Otherwise,** it awaits `#grant()` raced against the call's signal, and repeats.

**4. A watch on every browser (D2, D7, V4, R2-7).**

- **Arming.** `#warm` arms the watch as its last step, after the record is written and `toolset.start()` resolves. It stores an `AbortController` in `#watches` and calls `void this.#watch(slot, controller.signal).then(this.#lose.bind(this, slot))`. Because arming is last, a failed warm never leaves an armed watch.
- **What settles it.** The watch settles only on a loss signal:
  - the browser's `disconnect` (`src/server/Browser.ts:416-418`, `:474`);
  - a `crash` (`src/core/types.ts:1084`) of a page that is `slot.toolset.view` when the crash arrives (`src/core/BrowserToolset.ts:362-364`, `:539-541`). The watch subscribes to the existing pages and to the context's `page` event (`src/core/types.ts:1618`).
- **At arming.** When the browser is not connected, the watch settles at once.
- **On abort.** The watch removes every listener with `off` and never settles, so an abort never reaches `#lose`.
- **Listeners.** Each listener is a method bound with its slot and page, after the precedent at `BrowserToolset.ts:2061-2066`. The bound handlers live in a private map with an inline type, after the precedent at `Pool.ts:42-50`. The emitter offers no signal option (`node_modules\@orkestrel\emitter\dist\src\core\index.d.ts:71-73`).
- **Cause.** At `disconnect`, `browser.pid === undefined` means the process exited, because `:398` clears the pid. Otherwise the transport was lost (`:452-464`).

**5. Loss.** `#lose(slot, cause)` returns at once when the slot is already lost or `#closing` is defined. Otherwise it runs these steps:

1. It records `#lost.set(slot, cause)`.
2. If the slot is the lease, it:
   - clears `#lease` and sets `#notice = slot`;
   - withdraws the mirrored dispatchers outside the vocabulary;
   - sets `#strikes = Math.min(#strikes, BROWSER_SERVER_RESTARTS)` (V5);
   - calls `token.release()`.
3. If the slot is in `#spares`, it removes the token, adds a strike, and calls `token.release()`.
4. If the token has not been received yet, it does nothing more here; `#receive` adds the strike and releases it.
5. It calls `#fill()`.

The released record sits idle without validation (`Pool.ts:470-483`). From there it takes one of two paths:

- The next step's `clear()` disposes it.
- If an owner acquire is unassigned when it goes idle, `#pump` hands the record to that acquire. `#validate` then refuses it, Pool disposes it, and Pool creates for the same waiter (`:386-408`).

**6. The refill bound (V2, V5, R2-1, R2-14).**

Strikes count in these cases:

- **One strike** for each acquire rejected with `create`.
- **One strike** for each slot lost before it was ever leased, whether by its watch, its hand-out ping, or before receipt.
- **No strike** for a lost lease. It lowers `#strikes` to at most `BROWSER_SERVER_RESTARTS`, so a leased loss always gets at least one attempt, and that attempt's failure counts (V5).

The exhausted state is derived (`#strikes > BROWSER_SERVER_RESTARTS`) and never stored.

No grant resets `#strikes`. A reset at a grant fails on two counts:

- It would let a hand-out change what the loop issues, which R2-2 and V3 forbid.
- It would make the counts depend on whether a grant's ping settles before or after a failure in the same step, so V2's pinned cases could not pin.

`BROWSER_SERVER_RESTARTS = 1` is reasoned from the case, as brief Q3 asks: a deterministic cause fails its one retry, and a transient cause clears on it.

The following table states the counts for each size and input, with `RESTARTS = 1` (R2-14):

| Input | Size 1 | Size 2 | Size 3 |
| --- | --- | --- | --- |
| Every create fails at start | 2 failed launches; `start()` rejects | 2 (one step); rejects | 3 (one step); rejects |
| Only the spares' creates fail at start | none | 2 failed launches (the failure and one retry); one `EXHAUSTED` line; serves on 1 | 2 failed launches (one step, no retry); one line; serves on 1 |
| Lease lost at strikes 0, every later create fails | 2 failed; calls get the note, then `UNAVAILABLE` | the session takes the spare; 2 failed; one line | the session takes a spare; 2 failed; one line |
| Spare lost at strikes 0, every later create fails | none | 1 failed relaunch; one line | 1 failed; one line |
| Lease lost with the bound spent | exactly 1 attempt | exactly 1 attempt; if it succeeds, the spare follows in a later step | the same |

**7. A browser whose teardown fails still counts (V1 as corrected in D11; R2-5).**

- In `#teardown`, a rejected `browser.destroy()` means termination is unconfirmed (`Browser.ts:1139-1141`).
- The process can survive in more than one way. `#destroyResources` sets `terminated` only after `#terminate` returns (`:840-859`), so an earlier throw leaves the process unterminated too.
- The browser goes into `#survivors` with its error. Its profile and record stay on disk, and the hook rethrows.
- Pool frees the capacity anyway (`:518-520`). The layer compensates with one guard: `k` subtracts `#survivors.size`.
- The `BROWSER_SERVER_CEILING` refusal in `#warm` and its code are deleted. One guard per fact, each with a case that fails when the guard is removed (U8).

**8. Closing (R2-6).** Every path checks `#closing`:

- `start()` rejects with `ENDED` when `#closing` is defined (`src/server/BrowserMCPServer.ts:132`).
- `#setup` returns after every await when `#closing` is defined.
- `#fill` refuses to start a loop.
- `#restore` stops at every step.
- `#promote` checks before every park and after every wake.
- `destroy()` sets `#closing` and wakes `#change` synchronously, before its first await.

**9. Teardown has one place (D8).** `#teardown(browser, profile, toolset, cause)` runs these steps in order, and each step runs whatever the others did:

1. Abort the slot's watch controller and delete it from `#watches`.
2. When `isCDPTimeoutError(cause)` (`src/core/errors.ts:186`), the loss was a hang. Send `SIGKILL` to `browser.pid` and ignore `ESRCH`. This forced kill sits inside teardown, so termination has one place.
3. Destroy the toolset when one exists. A failure goes to `#faults`.
4. `await browser.destroy()`. A rejection records `#survivors.set(browser, error)`.
5. If step 4 resolved, `rm(profile, { recursive: true, force: true, maxRetries: 5 })`. A failure goes to `#faults`.
6. Rethrow the step 4 failure, if any.

The order is toolset, then browser, then profile, which is today's order (`src/server/BrowserMCPServer.ts:158-165`). The journey toolset goes first so that a replay writes its run while the manager stands (`BrowserToolset.ts:2090-2093`) (R2-8). The forced kill closes a hung browser's socket, so steps 3 and 4 fail fast instead of waiting one command deadline each. `destroy()` marks the browser destroyed before the exit event, so the exit handler returns at `Browser.ts:389` and destroy's own path cleans up (A-30).

`#warm`'s failure path calls `#teardown` with whatever it built, including a toolset whose `start()` rejected (A-22). It swallows the hook's rethrow, because the survivor is already recorded, and then rethrows the launch failure. A toolset or `rm` failure never rejects the hook, because a rejection on the validation path withholds the successor (`Pool.ts:391-402`).

**10. The ceiling holds.** Browsers that might be alive never exceed `size`. The bound is Pool records plus reservations plus `#survivors`, and each kind is covered:

- **Pool records and reservations.** Pool creates only while records plus reservations are below `max = size` (`:272`). A lost record stays a record until its hook settles (`:518`), so a successor never launches beside a predecessor whose teardown is still running.
- **Survivors.** A survivor leaves Pool at `:518`, but `k` subtracts it.
- **A survivor found during a step.**
  - If the record was idle when the step began, the waiter that took it through validation is rejected with `cleanup` and creates nothing (`:391-402`).
  - If the record was released after the step computed `k`, it was counted as active in `k`.

U10 reviews this argument.

**Server `destroy()`** runs these steps in order:

1. Set `#closing`. Remove the signal and input listeners, stop the transport, remove the dispatchers, and unmirror.
2. Abort `#abort`, which covers launches, pings, and the sweep's attaches. Wake `#change`.
3. Await `#starting`, ignoring its rejection.
4. Await `pool.destroy()` and keep its `cleanup` failures.
5. Await `#refill`.
6. Await `#sweeping`. Recheck the folders the sweep kept, and remove each one whose pid has gone (A-4).
7. Throw an `AggregateError` of Pool's failures, `#survivors`, and `#faults`, deduplicated by identity.

`#end` calls `destroy()` and handles its rejection with a bound method. That method sets `process.exitCode = 1` and writes one `log` line, `browse: BROWSER_SERVER_TEARDOWN: …` (A-5).

### Workarounds Pool 0.0.13 forces (the members the later move adds)

Each workaround names the Pool fact that forces it:

- **W1: no floor.** Pool creates only for a waiter (`Pool.ts:263-277`), so the owner acquires for itself. The move adds `min`, `start()`, and a refill that needs no waiter.
- **W2: no loss observation.** Pool reads a value only in `validate` and `destroy` (`:293-312`, `:503-526`), so the layer arms `#watch` and keeps `#lost`. The move adds `watch(value, signal)`.
- **W3: no disposal of a chosen record.** Pool disposes only through `validate`, `clear`, or `destroy` (`:386-408`, `:147-160`, `:170-189`). So the layer releases the lost record, and `clear()` or a refusing `#validate` disposes it. The move adds `PoolToken.destroy()`.
- **W4: a rejected destroy frees capacity** (`:518-520`), so the layer subtracts `#survivors` from `k`. After the move, such a record stays counted.
- **W5: no refill bound.** The layer keeps `#strikes`, the step cap, and the V5 lowering. The move adds a required `restarts`.
- **W6: idle records go to whichever waiter the pump meets first** (`:263-271`), and a hand-out queued behind a refill waits at the commit barrier (`:425-444`). So the layer holds every live token in `#spares` or `#lease`, keeps Pool's idle list for lost records only, and parks hand-outs on `#change`.
- **W7: no holder, and empty event payloads** (`types.ts:35-58`). `#lease` beside `#spares` records which browser the session holds. The holder member stays deferred (V6).
- **W8: tokens commit in request order** (`:425-444`). At sizes 2 and 3, the first lease waits for the head of the queue, not for the fastest launch. Size 1 is unaffected, and M2 measures the effect.

### V1 to V5 as requirements on the layer

The following table maps each V requirement to where the layer meets it:

| V | Requirement | Where |
| --- | --- | --- |
| V1 | No refill beside a browser whose destroy rejected; that browser stays counted; `destroy()` reports it | behavior 7 (`k` subtracts survivors); U8 survivor cases |
| V2 | The bound always exists; cases pin the last allowed failure and the first refused one | `BROWSER_SERVER_RESTARTS`, the step cap, the per-size table; U8 "exactly 2" case |
| V3 | No create for a caller's waiter | only owner acquires exist; a hand-out changes neither `k` nor `#strikes`; U7 "launch count stays fixed" case |
| V4 | The watch takes a signal that aborts when disposal begins | `#teardown` step 1; U8 listener counts on the `clear`, validation, and `pool.destroy` paths, and on the failed warm |
| V5 | A leased loss always gets one refill attempt, and its failure counts a strike | the `Math.min` lowering plus the step cap; U8 V5 case |

### Ruling: no `@orkestrel/pool` release to re-pin `@orkestrel/contract`

The re-pin is not needed, for three reasons.

- **The two copies give the same answers.**
  - `PoolError` extends the global `Error` (`pool\src\core\errors.ts:19`). Its message uses `isError` and `isString`, and `isPoolError` is `isInstance(value, PoolError)` against the pool's own single class (`:2`, `:35-41`, `:61-63`).
  - In both the 0.0.19 copy and the 0.0.18 copy under `emitter`, `isInstance` is `value instanceof target` guarded by `holds` (`dist\src\core\index.js:933-936`), and `isError` is `isInstance(value, Error)` (`:981-983`).
  - The only module-level identity is `CONTRACT_ERROR_BRAND = Symbol.for("@orkestrel/contract.error")` (`:12` in both copies).
  - So every value that crosses between the copies gets the same answer.
- **A 0.0.18 copy is already present at runtime.** `browser-wt-browse\node_modules\@orkestrel\{emitter,websocket,router}\node_modules\@orkestrel\contract` (0.0.18) sits beside the root 0.0.19 (`package.json:105`).
- **A re-pinned pool removes none of them.** Pool depends on `@orkestrel/emitter` `^0.0.11` (`pool\package.json:73`), and that emitter carries 0.0.18. Adding pool adds one more physical 0.0.18 copy and no new version. U5 records `npm ls @orkestrel/contract --omit=dev`.

### Trigger for the move into `@orkestrel/pool`

The layer moves at whichever of these comes first:

- `@orkestrel/probe` ROADMAP item 1 reaching its design round (`probe\ROADMAP.md:5`);
- a second consumer that needs the floor, the watch, the loss, or the bound.

At the trigger:

- `@orkestrel/pool` gains `min`, `start()`, `watch(value, signal)`, `PoolToken.destroy()`, and a required `restarts`, under V1 to V5.
- `@orkestrel/browser` re-pins pool and deletes the layer's members in the same change, with no shim (`AGENTS.md:66`).

That work is browser ROADMAP item 15.

### Fields: what Pool covers and what stays

These fields of the earlier synthesis (`eager\synthesis.md:304-315`) are removed or replaced:

- `#slots` is replaced by Pool records of `BrowserSlot`.
- `#releasing` is replaced by Pool's destroy barrier (`Pool.ts:170-189`, `:574-587`).
- The per-slot strike field is replaced by the pool-wide `#strikes`.
- The `#lost` note string is replaced by `#notice: BrowserSlot | undefined` plus `#lost: WeakMap<BrowserSlot, unknown>` (A-15).

This change also removes these fields from today's code:

- `#session`, `#browser`, and `#profile` (`src/server/BrowserMCPServer.ts:85-87`);
- `#started` (`:88`), which `#starting` replaces.

These fields stay, because Pool covers none of them:

| Fields | Reason |
| --- | --- |
| `#pool` and `#size` | the composed pool and its size |
| `#lease`, `#spares`, `#change` | W6 and W7 |
| `#watches` | W2 |
| `#survivors` | W4 |
| `#strikes` and `#refill` | W5 and the loop |
| `#failure` | the last create cause |
| `#faults` | toolset and `rm` failures |
| `#notice` and `#lost` | the operation lifecycle |
| `#starting`, `#sweeping`, `#granting` | the setup, the sweep, and the shared grant |
| `#references` | the shared reference counter (A-8) |
| `#closing`, `#abort`, `#mirrored` | kept from today's code |

The design adds no `#pending` count, because the loop never computes `k` while an acquire is outstanding.

### Operation lifecycle: a call a crash interrupts

This section follows `reliability-assessment.md:116-122`, `:203-217`, and `:249-267`.

**The interrupted call.**

- `#forward` records the slot it ran on.
- After the tool settles, if the tool failed (it threw, or its result has `success: false`) and `#lost.has(slot)`, the call answers `isError: true` with `BROWSER_SERVER_UNRESOLVED: …`. The text states:
  - that the call was running when its browser was lost, and the cause;
  - that the outcome is unknown, because the action might have reached the page or a server before the loss;
  - what was lost: the page at its last URL (`src/core/BrowserFrame.ts:84`), its tabs, every element reference, the retained reading, dialogs, holds, an unsaved recording, the active replay, and the isolated context's cookies;
  - that browse did not repeat the call, and that the next call runs on a fresh browser at `about:blank`.
- It is never the plain CDP failure or `BROWSER_TOOLSET_ENDED` text.
- The `UNRESOLVED` answer leaves `#notice` alone.

**A tool that succeeded.** A tool that resolved with success keeps its success, even if its slot is lost right after. That outcome is known (R2-9).

**Who decides.** Browse never repeats a call. The agent owns re-execution (`:261-267`).

**Known outcomes.** Two other codes carry a known outcome:

- `BROWSER_SERVER_CRASH: …` is the one-time note.
  - The next string outcome (success text or error text) of a call that ran on a slot other than `#notice` carries it as a prefix and clears it.
  - A value that is not a string leaves the note pending.
  - A refusal carries the note and clears it (A-23).
- A failed per-call ping is a known outcome: the call never ran on the hung browser. It runs on the next lease and carries the note.

Distinct codes carry the distinction, because recovery must not parse prose (`:259`).

### `@orkestrel/mcp` 0.0.36: one `handshake` hook, corrected by A-10 to A-14

**Shape.**

- `MCPServerOptions.handshake?: MCPHandshakeHandler`, exposed as `MCPServerInterface.handshake: MCPHandshakeHandler | undefined`, a getter beside `identity` (`mcp\src\core\MCPServer.ts:205`).
- `createMCPLegacy` passes it the way it passes `identity` (`mcp\src\core\factories.ts:88-90`).

**What waits.**

- Only the legacy `initialize` (`mcp\src\core\MCPLegacy.ts:140-150`) awaits the hook. It builds `MCPMethodOptions` the way `:196-197` does.
- `ping` (`:151-152`) and every forwarded method stay ungated.
- Modern `server/discover` is not gated, because no 2026-07-28 specification text is on record (A-13). A modern client meets the onset at its first `tools/call`, which `#forward` gates on `#starting`.

**How a rejection is answered.**

- After the request aborted, the hook's rejection is rethrown. The binder then writes nothing and emits nothing (`mcp\src\core\helpers.ts:1887-1901`).
- An `MCPError` is answered under the request id with its `code`, its `message`, and its `context` as `data` (`mcp\src\core\errors.ts:29-46`).
- Any other rejection emits `error` exactly once on the dispatcher's emitter (`MCPLegacy.ts:69-71`) and answers `-32603` `Server error`.
- Without a hook, every byte of every answer is identical to 0.0.35.

**HTTP sessions (A-12).**

- The middleware mints a session for any OK response (`mcp\src\server\middlewares.ts:177-193`, `:215-222`), and legacy errors answer HTTP 200 (`mcp\src\server\inferers.ts:298-300`).
- After the change, it mints only when the `initialize` body, read from `response.clone()`, is a JSON-RPC result.
- U1 fetches the MCP 2025-11-25 Streamable HTTP text, § Session Management ("on the HTTP response containing the `InitializeResult`"), and records it in `guides\mcp.md`. This lane had no fetch tool, so the quote is unverified here.

**The remark (A-14).** The sentence added to `JSONRPC_SERVER_ERROR` (`mcp\src\core\constants.ts:297-305`) is limited to the hook: "A `handshake` hook that rejects with an `MCPError` answers the legacy `initialize` with that error's own code and data."

**The test stub (A-10).** U1 owns `mcp\tests\src\core\helpers.test.ts`, whose typed stub (`:1464-1481`) gains `handshake: real.handshake`.

### Rulings on the brief's questions 1 to 8

**1. Where the launch starts, and what the handshake does meanwhile.**

- **Where.** `start()` rejects with `ENDED` after `destroy()` began (A-1). Otherwise it runs `this.#starting ??= this.#setup()`.
- **Setup order.**
  1. Attach the input `end`, `SIGINT`, and `SIGTERM` listeners.
  2. Call `transport.start()`.
  3. `mkdir(ROOT/.profiles, { recursive: true })`.
  4. Start the sweep detached and store its promise in `#sweeping` (A-3).
  5. `#fill()`.
  6. Await `#grant()`.
  Each step after an await returns when `#closing` is defined.
- **Failure.** A rejection while not closing becomes `BrowserError(cause message, 'BROWSER_SERVER_UNAVAILABLE')` (A-2). The message carries the cause only. `CODE: ` is added once each by `#forward`, by the handshake, and at `src/bin/main.ts:32` (A-19).
- **Meanwhile.** `initialize` waits for the first warm, pinged, leased browser (D10). After a failed setup, each method answers differently (A-18):
  - `initialize` gets `-32000`, the message `BROWSER_SERVER_UNAVAILABLE: <cause>`, and `data: { code }`;
  - `ping` gets `{}`;
  - `tools/list` gets the vocabulary;
  - `tools/call` gets `isError` text that opens `BROWSER_SERVER_UNAVAILABLE:`;
  - `start()` rejects, `main.ts` prints one line and sets exit code 1, and the process exits after its input ends.
- **Client budgets.** Claude Code allows 30 s and connects in the background (`eager\clients.md:18`). Codex allows 10 s (`:19`). Cursor documents no budget (`:20`).

**2. Crash detection.** Each fault has one signal, and none of them polls:

| Fault | Signal |
| --- | --- |
| Process exit | `error`, then `disconnect` (`Browser.ts:388-420`) |
| Socket drop | `disconnect` after the defer (`:441`, `:468-475`) |
| The current view's renderer crashes | page `crash`. Arrival without `Inspector.enable` is unproved (A-17), and U8 decides it. |
| A browser that stops answering | the ping at hand-out and before every call, bounded by the command deadline (`src/core/CDPClient.ts:134-145`). No timer runs (D10; `AGENTS.md:68`). |
| The server's own teardown | not a fault: `destroy()` emits `destroy` (`Browser.ts:1156`), and an exit after destroy is ignored (`:389`) |

**3. Recovery.**

- **What is rebuilt.** A fresh slot from the owner's loop: a process, a `PID-UUID` profile, an isolated context that uses the server's shared reference counter, a page at `about:blank`, and a started toolset with its journey toolset. The stores reopen on the same root.
- **What is lost.** The list in the operation lifecycle.
- **How the agent learns.** It gets `UNRESOLVED` for a call that was running on the lost browser, and the one-time `CRASH` note otherwise.
- **The last address is not restored.** Restoring could repeat side effects, and it is product policy (`AGENTS.md:67`).
- **How a crash loop ends.** Behavior 6.
- **Profile cleanup.**
  - `#teardown` removes the profile only after termination is confirmed.
  - The start sweep reclaims folders that dead servers left (D10).
  - `destroy()` rechecks the folders the sweep kept.
  - Bare `.profiles/<uuid>` folders stay, and the guide names a one-time removal (D10).

**4. The pool.**

- **States.** Derived; see the state machine.
- **Liveness.** Events, plus a ping at hand-out and before each call.
- **Work in flight on a browser that dies.** It answers `UNRESOLVED`.
- **The lease.** The holder is the MCP session. It holds one `PoolToken<BrowserSlot>` across calls, and the lease ends only through `#lose`. A failed holder ends its input, and `destroy()` runs.
- **Balancing.** Failover only (D10): the session takes the oldest spare. Parallel holders are browser item 14.
- **Second process, not second context.** A context dies with its process.
- **When each browser starts.** All browsers start at `start()`, concurrently (D8). A successor starts after its predecessor's teardown settles (behavior 10).
- **Idle cost.** M4 measures it.
- **Default size.** 1 (D10).

**5. Placement.**

- **Library:**
  - `Browser.endpoint`, `Browser.ping()`, and the port-probe fix;
  - `BrowserContextOptions.reference`;
  - `probeProcess` and `parseBrowserProfileRecord`;
  - `BrowserProfileRecord` and `BrowserSlot`.
- **`BrowserSlot` is public by rule.** `AGENTS.md:60` puts every type in its kind file, and the barrel star-exports `types.ts` (`architecture.md:269-283`).
- **Server-private:** the layer, the sweep, the handshake mapping, the loss texts, and the per-call ping.
- **Bin:** `BROWSE_POOL`.
- **No eager-off switch** (D1).

**6. Proof.**

- Every claim is proved against real Chromium in an added `tests/service/browse.test.ts`, using a recording launcher kept in `tests/setupService.ts`.
- Crashes are real: `process.kill(pid)`, CDP `Page.crash` from a second client, and `SIGSTOP` on POSIX.
- `src:server` covers the wiring with launch doubles over the real Pool.
- `tests/service/browser.test.ts` keeps one launch per test. A shared test browser is later work.

**7. Tests outside `browse`.** No test browser is served in this change, for three reasons:

- `PLAYWRIGHT_WS_ENDPOINT` needs a Playwright `launchServer` browser, and browse's Chromium speaks CDP only (`eager\map.md:132`, `:138`).
- The probe measured no end-to-end gain (`status.md:19`).
- `endpoint` enables a later CDP attach.

**8. Probe.** These parts carry over:

- the `handshake` hook;
- one setup place and one teardown hook;
- watches driven by events;
- the start sweep;
- this layer, which moves into pool at probe item 1's design round (item 15).

Pool and probe both pin contract `^0.0.18` (`pool\package.json:72`; `probe\package.json:95`), so probe needs no re-pin to adopt pool 0.0.13.

### Type sketches

**`@orkestrel/pool`: no change in this campaign.**

```ts
// pool/src/core/types.ts at 0.0.13, used as is:
// createPool<BrowserSlot>({ create, destroy, validate, max }): PoolInterface<BrowserSlot>
// used: acquire(), clear(), destroy(), active; PoolToken: value, release(); isPoolError

// Browser ROADMAP item 15, not built here:
// PoolOptions.min?: number                                              <- #size as floor
// PoolOptions.restarts?: number                                         <- BROWSER_SERVER_RESTARTS; required with min
// PoolOptions.watch?: (value: T, signal: AbortSignal) => Promise<unknown> <- browse's #watch hook
// PoolInterface.start(): Promise<void>                                  <- #fill and #restore
// PoolToken.destroy(): Promise<void>                                    <- #lose of the lease
```

**`@orkestrel/mcp` 0.0.36.**

```ts
/** Awaits a server's own setup before the legacy `initialize` answers; a rejection refuses it. */
export type MCPHandshakeHandler = (options: MCPMethodOptions) => Promise<void>
// MCPServerOptions.handshake?: MCPHandshakeHandler
// MCPServerInterface.handshake: MCPHandshakeHandler | undefined
// MCPLegacyOptions.handshake?: MCPHandshakeHandler
```

**`@orkestrel/browser` 0.0.22.**

```ts
// src/server/types.ts
export interface BrowserInterface {
	/**
	 * Reports the CDP WebSocket endpoint of the represented session, or undefined when none is.
	 *
	 * @remarks
	 * A connect or launch sets it; an attachment's detach, a failed attach or launch, an observed
	 * process exit, a lost unowned transport, and `destroy()` clear it.
	 */
	readonly endpoint: string | undefined
	/** Sends CDP `Browser.getVersion` and resolves when the browser answers, changing no state. */
	ping(options?: BrowserCallOptions): Promise<void>
}

/** Names the browser a browse profile serves, which a later start's sweep reads. */
export interface BrowserProfileRecord {
	readonly pid: number
	readonly endpoint: string
}

/** Holds one warm browser a browse server owns: the browser, its profile, and its started toolset. */
export interface BrowserSlot {
	readonly browser: BrowserInterface
	readonly profile: string
	readonly toolset: BrowserToolsetInterface
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
	/** Stops admission and tears down every browser, its toolset, and its profile, then rechecks swept folders. */
	destroy(): Promise<void>
}

// src/core/types.ts
export interface BrowserContextOptions {
	/** Names each element reference the context's pages issue. Default: a counter the context owns. */
	readonly reference?: BrowserReferenceFunction // existing type, src/core/types.ts:2509
}
```

The browser package also gains these declarations, each in its kind file:

- **Constants** (`src/server/constants.ts`): `BROWSER_SERVER_POOL_SIZE = 1` (D10), `BROWSER_SERVER_POOL_LIMIT = 3` (D6), `BROWSER_SERVER_RESTARTS = 1`, and `BROWSER_SERVER_RECORD = 'browse.json'`.
- **Helpers** (`src/server/helpers.ts`):
  - `probeProcess(pid): boolean`, which is false only on `ESRCH`;
  - `parseBrowserProfileRecord(text): BrowserProfileRecord | undefined`;
  - `formatBrowserServerLoss(code, cause, url): string`, which builds the `CRASH` and `UNRESOLVED` texts.
- **Codes:** `BROWSER_SERVER_UNAVAILABLE`, `BROWSER_SERVER_CRASH`, `BROWSER_SERVER_UNRESOLVED`, `BROWSER_SERVER_EXHAUSTED`, `BROWSER_SERVER_TEARDOWN`, and `BROWSER_SERVER_OPTIONS`. `BrowserError` takes any string code. `BROWSER_SERVER_CEILING` is deleted.

### State machine

**Per-slot states.** Every state is derived, and none is stored:

- `warming`: a create for an owner acquire is in flight.
- `ready`: the token is in `#spares`.
- `leased`: the token is `#lease`.
- `lost`: `#lost.has(slot)`, and the record is idle or being destroyed in Pool.
- `gone`: the record left Pool after its hook resolved.
- `survivor`: `#survivors.has(browser)`.

**Server-wide states.**

- `exhausted`: `#strikes > BROWSER_SERVER_RESTARTS`.
- `unavailable`: `#lease === undefined`, `#spares.length === 0`, and `#refill === undefined`. The loop never stops with an acquire outstanding, so an undefined `#refill` implies no create is in flight (R2-4).

The following table lists each transition:

| From | Event | To | Action |
| --- | --- | --- | --- |
| (none) | `start()` | warming | setup steps; the first step issues `size` acquires |
| warming | the owner receives a token whose slot is not lost | ready | push to `#spares`; wake `#change` |
| warming | the owner receives a token whose slot is lost | lost | strike; release |
| warming | the acquire rejects with `create` | (none) | strike; store `#failure` |
| ready | the hand-out ping resolves, the token is still the head, and the slot is not lost | leased | set `#lease`; mirror tools |
| ready | the hand-out ping rejects without an abort | lost | `#lose`: strike; release; `#fill` |
| ready | the watch settles | lost | the same |
| leased | the per-call ping rejects without an abort | lost | `#lose`: set `#notice`; withdraw mirrors; `#strikes = min(#strikes, RESTARTS)`; release; `#fill`; the call takes the next lease |
| leased | the watch settles | lost | the same |
| lost | `clear()` or a refusing `#validate` disposes the record, and `#teardown` resolves | gone | Pool deletes the record (`:518`); a later step creates if `k > 0` and the bound allows |
| lost | `#teardown` rejects | survivor | profile and record kept; `k` lowered |
| any | `destroy()` | (released) | the server `destroy()` sequence |

**The sweep** runs once, during setup. It never rejects. For each `.profiles` entry whose `parseBrowserLockEntry` pid (`src/server/helpers.ts:59-65`) is not `process.pid` and is not alive:

- **The record names a live pid.** The sweep attaches the way `Browser.#closeRemote` does (`Browser.ts:921-949`): a bare `CDPClient` over `createCDPTransport({ url: endpoint })`. It races the client's `connect()` against `#abort.signal` as `#raceAbort` does (`:371-386`), and sends `Browser.close` with `{ signal: #abort.signal }`. It never syncs contexts (R2-11) and closes the client in a `finally`.
- **After the attempt.** If `probeProcess(record.pid)` is false, the folder is removed. Otherwise it is kept in the sweep's result.
- **No record.** A folder with no record is removed.
- **A failed `rm`** keeps the folder.

### Failure table

The following table gives each failure, its signal, the server's action, and what the caller sees:

| # | Failure | Signal | Action | Caller sees |
| --- | --- | --- | --- | --- |
| 1 | Chromium cannot start at setup | acquires reject with `create` (`Pool.ts:319-329`) | strikes; counts per size in behavior 6 | `initialize`: `-32000`, `BROWSER_SERVER_UNAVAILABLE: <cause>`, `data.code`; one stderr line from `main.ts`; per-method answers per Q1; exit 1 after input ends |
| 2 | The root is unusable, or the `.profiles` read fails | `mkdir` rejects; the sweep keeps its own failure | converted to `UNAVAILABLE` (A-2) | as row 1 |
| 3 | A spare cannot start | its create rejects | per-size counts; one `EXHAUSTED` line on stop | nothing at onset; the session runs on fewer browsers |
| 4 | Another Chrome answers on 9222 | none after U2 | no port probe without `cdp.port` | nothing |
| 5 | An idle spare exits | its watch | strike; release; `clear()`; one relaunch within the cap | nothing |
| 6 | The leased process exits between calls | its watch | `#notice`; lowering; release; refill | the next call runs on a spare, or waits for the successor at size 1, and opens with `BROWSER_SERVER_CRASH:` naming the URL |
| 7 | The leased process exits during a call | its watch; the call's CDP requests reject or its toolset ends | as row 6 | that call answers `BROWSER_SERVER_UNRESOLVED:` (outcome unknown, what was lost, not repeated); a call that succeeded keeps its success |
| 8 | The socket drops while the process lives | `disconnect` after the defer | as rows 6 and 7; `#teardown` terminates the process | as rows 6 and 7 |
| 9 | The current view's renderer crashes | page `crash` on `toolset.view` | as row 6 | as rows 6 and 7 |
| 10 | A background tab crashes | `crash` on another page | none | `tabs` lists it |
| 11 | The leased browser hangs | the per-call ping rejects with `CDPTimeoutError` | loss; forced kill inside `#teardown`; no strike | that call waits one deadline (plus a launch at size 1), then runs with the note; M5 reads this against Codex's 60 s tool timeout (`clients.md:19`) |
| 12 | An idle spare hangs | the hand-out ping times out | strike; forced kill; next spare | the hand-out takes one deadline longer |
| 13 | The current renderer hangs while the browser answers | the call's own CDP deadline | none | that call's CDP timeout text |
| 14 | Termination is unconfirmed (`Browser.ts:1139-1141`) | `#teardown` rejects | survivor; profile kept; `k` lowered; one `TEARDOWN` line while a browser serves | one browser fewer; at size 1, the note and then `UNAVAILABLE` naming the pid; `destroy()` rejects; at input end, one `TEARDOWN` line and exit 1 |
| 15 | `rm` of a profile fails past its retries | `rm` rejects | added to `#faults`; the successor still warms | as the end of row 14; a later sweep removes the folder |
| 16 | The bound is spent while a browser serves | the loop stops exhausted | one `EXHAUSTED` line | nothing; the next leased loss still gets one attempt (V5) |
| 17 | Every browser is gone and the bound is spent | `unavailable` | refuse | every call: a pending note, then `UNAVAILABLE` with the last cause |
| 18 | The server is killed | none in process | the next start's sweep closes the browser and checks its pid; `destroy()` rechecks | nothing; the orphan runs until then (M6) |
| 19 | The server is killed between spawn and the record's rename | no record | the sweep removes the folder, and a Windows lock refuses it | an orphan might run (Risks) |
| 20 | Input ends, or `SIGINT` or `SIGTERM` arrives, during setup | listeners attached first | `destroy()` aborts launches, pings, and the sweep; `start()` resolves | nothing more; exit 0 |
| 21 | The client's startup timeout passes | the client's own | as row 20 if the client closes the input; unverified (U12, A-29) | the client's own display |
| 22 | Concurrent first calls | the shared `#granting` | one lease | every call runs on one browser |
| 23 | Exit, socket loss, and crash overlap | the first one settles | the `#lost` guard | one loss, one release, one successor |
| 24 | A browser dies between create and receipt | `#receive` sees it lost | strike; release | nothing |
| 25 | `destroy()` then `start()` | `#closing` is defined | `start()` rejects `ENDED` before attaching anything | nothing attached or launched (A-1) |
| 26 | `start()` and `destroy()` in one turn | `#closing` is checked after each await | setup returns after `mkdir`; no loop starts | both settle; nothing launched (R2-6) |
| 27 | Strikes spend the bound while one create is still in flight | `#refill` is defined | `#promote` parks until that create settles | `initialize` answers when it succeeds (R2-4) |
| 28 | A leftover browser hangs during the sweep | the attach parks | off the handshake path; `#abort` rejects its connect and send | nothing (A-3, R2-11) |

## Alternatives

Two real alternatives lose to this design:

- **Spares idle in Pool, with the session acquiring through `pool.acquire()` and `validate` as the ping.** It loses on three counts:
  - A hand-out queued behind a refill's waiter waits at the commit barrier (`Pool.ts:425-444`).
  - The pump gives the oldest idle spare to the refill's waiter (`:263-271`).
  - A failed `validate` at the session's hand-out creates for the session's waiter (`:386-408`), which D7 and V3 forbid.
- **The layer as its own class in `src/server`.** A consumer could construct it from values it holds, so the barrel rule makes it public (`architecture.md:284-289`). It would ship from `@orkestrel/browser` and be removed at the move. D12 wants the lifecycle shaped before it becomes shared API.

The following table rules every other rejected option:

| Rejected option | Reason |
| --- | --- |
| A private ledger with no Pool | D12 composes Pool |
| Expanding `@orkestrel/pool` to 0.0.14 now | D12 keeps pool thin in this campaign |
| A pool release that only re-pins contract | answers are identical across copies, and the emitter, websocket, and router copies stay |
| Resetting `#strikes` at a lease grant | a hand-out would change what the loop issues (R2-2, V3), and counts would depend on ping timing (R2-1, V2) |
| Resetting strikes after a successful create | a launch-then-die loop never ends |
| A `#pending` count in `k` | the loop never computes `k` with an acquire outstanding |
| `BROWSER_SERVER_CEILING` in `#warm` beside the `k` subtraction | two guards for one fact; neither case could fail alone (R2-5); `pool.size` misses creates in flight (`:88-90`, `:333-334`) |
| `#grant` starting `#fill` | D7 and V3; a hand-out is not the owner's decision |
| Strikes per slot | records are anonymous in Pool and in the later member; V5 repairs the pool-wide count |
| A forced kill in `#lose` | a second termination site against D8; `#teardown` reads the cause |
| Browser before toolset in teardown | it reverses today's order with no gain (R2-8) |
| A watch that settles on abort | an abort would reach `#lose` (R2-7) |
| The sweep's attach through `Browser.connect()` | `#syncContexts` holds `destroy()` one deadline per page (R2-11) |
| A shorter ping deadline, or a scheduled idle check | a fixed figure (D5); polling (`AGENTS.md:68`) |
| Gating `server/discover` | no specification text (A-13) |
| Exiting right after a refusal | the unbind drops an unwritten answer (`mcp\src\core\helpers.ts:1887-1888`) |
| Refusing with `-32603` | carries no detail (`MCPServer.ts:1775-1777`) |
| Launching per call, in the constructor, or waiting for every browser before answering | D1, D4, D7, D10 |
| A second context as the spare | it dies with its process |
| Restoring the last address, or repeating an interrupted call | side effects; the agent owns re-execution (`reliability-assessment.md:261-267`) |
| Reporting an interrupted call as a plain failure | its outcome is unresolved (`:116-122`) |
| One code for the note and the interruption | recovery must not parse prose (`:259`) |
| Exiting when every browser is gone | loses the cause; Claude Code does not restart stdio servers (`clients.md:18`) |
| An eager-off switch; a `browsers` or `spares` option | D1; collides with `BrowserOptions.browsers`; the user stated a size (D6) |
| `@orkestrel/supervisor`, or `Supervisor` from `@orkestrel/process` | the user's exclusion (`design-brief.md:8`) |

## Constraints

These code facts bind the design:

**Pool.**

- Pool creates only for a waiter, and capacity counts records plus reservations (`pool\src\core\Pool.ts:263-277`, `:284-291`).
- `active` counts only `#leased` (`:97-100`).
- Validation happens only at hand-out (`:293-312`). The same waiter is pumped after a refused record's cleanup, and a failed cleanup rejects that waiter with `cleanup` (`:386-408`).
- `release` recycles without validation (`:470-483`). `clear` disposes its snapshot and pumps after each cleanup (`:147-160`).
- `#clean` frees capacity whether the hook resolved or rejected (`:518-520`).
- The commit barrier is FIFO (`:425-444`). The teardown barrier is at `:170-189` and `:574-587`.
- Pool pins contract `^0.0.18` and emitter `^0.0.11` (`pool\package.json:72-73`).

**Browser package.**

- Browser pins contract `^0.0.19`, emitter `^0.0.11`, and mcp `^0.0.35` (`browser-wt-browse\package.json:105-109`).
- `start()` launches nothing (`src/server/BrowserMCPServer.ts:131-139`); the first call launches (`:199-260`); teardown runs toolset, then browser, then profile (`:158-165`).
- `main.ts` rethrows anything that is not a `BrowserError` and prints `browse: CODE: message` (`src/bin/main.ts:31-32`).
- A process exit emits `error`, and `disconnect` only when connected (`Browser.ts:388-420`).
- A transport loss is confirmed after a defer (`:441`, `:468-475`).
- `destroy` returns its shared promise (`:264-274`).
- `#destroyResources` sets `terminated` only after `#terminate` returns (`:840-872`), and `#terminate` throws after `SIGKILL` (`:1139-1141`).
- `#finish` destroys the browser's emitter (`:1144-1157`).
- `#closeRemote` closes a browser with a bare client and `Browser.close` (`:921-949`).
- `CDPClient.send` takes a signal and a timeout, and the default timeout is 30 s (`src/core/CDPClient.ts:113-154`; `src/core/constants.ts:96`).
- `isCDPTimeoutError` exists (`src/core/errors.ts:186`).
- The context's reference counter starts per context (`src/core/BrowserContext.ts:71`, `:348-350`), and `isolate` takes `BrowserContextOptions` (`Browser.ts:196`).
- A page `crash` carries no payload (`src/core/types.ts:1084`). The context emits `page` (`:1618`).
- `toolset.view` returns the current page or the initial view (`BrowserToolset.ts:362-364`, `:539-541`).
- The emitter has `on` and `off` with no signal (`node_modules\@orkestrel\emitter\dist\src\core\index.d.ts:71-75`).

**Test fixtures.**

- The double's `pid` is undefined (`tests/setupServer.ts:1568-1570`).
- Its `connect` awaits the gate and ignores the signal (`:1596-1599`).
- Its `destroy` leaves its emitter alive (`:1650-1653`).
- The launcher has `failures`, `hold()`, and `release()` (`:1670-1710`).
- `CDPTestServer` and `StallServer` exist (`:187`, `:360`).

**mcp.**

- Legacy `initialize` answers inline (`mcp\src\core\MCPLegacy.ts:140-150`).
- The binder writes and emits nothing for an aborted request (`mcp\src\core\helpers.ts:1887-1901`).
- The HTTP middleware mints a session on any OK response (`mcp\src\server\middlewares.ts:177-193`, `:215-222`).

## Refusals

Each refused option is followed by the rule that forecloses it:

- **A periodic liveness check:** "No polling architecture. Park idle work on events and abort signals." (`AGENTS.md:68`)
- **A stored exhausted or unavailable flag:** "never store a second flag or label that can drift." (`AGENTS.md:58`)
- **Keeping the lazy launch or old tests beside the eager path:** "No compatibility shims. Update every consumer in the same change." (`AGENTS.md:66`)
- **Faking a crash or spying on stderr:** "NEVER use mocks, behavioral fakes, module replacement, framework spies, or fake clocks for project-owned behavior." (`AGENTS.md:42`) This is why the `log` stream option exists.
- **Closures declared inside the watch:** "Never declare or assign a function inside another function or method." (`architecture.md:173`)
- **`BrowserSlot` declared in `BrowserMCPServer.ts`:** "An implementation file holds one class plus imports." (`AGENTS.md:60`)
- **A layer class kept out of the barrel:** "Barrel that class when a consumer can construct it from values they already hold." (`architecture.md:285-286`)
- **A `poolSize` key:** "Never flatten these into prefixed keys." (`names.md:49`)
- **`evict`, `refill`, `reset`, or `restart` verbs:** "Never introduce synonyms such as `cancel`, `reset`, or `run` for these meanings." (`names.md:234`)
- **A fixed test port:** "never to a fixed port" (`tests.md:33`)
- **Adding pool without a request:** "NEVER add an npm package unless the user explicitly requests it" (`AGENTS.md:38`). D11 is that request.

## Measurements

**Readings supplied:**

- `status.md:19` (2026-10-03, loaded host, preliminary): an 80.5 ms headless-shell launch, and no end-to-end gain from a warm test browser. It bears on D3 only.
- This lane's static reading on 2026-10-03:
  - `browser-wt-browse\node_modules` holds 0.0.18 contract copies under `emitter`, `websocket`, and `router` beside the root 0.0.19;
  - both copies define `isInstance`, `isError`, and the brand the same way (`index.js:12`, `:933-936`, `:981-983`).

**Readings missing:**

- every timing;
- how clients display a non-version `initialize` error (`clients.md:26`);
- whether a client closes the input at its startup timeout;
- whether `Inspector.targetCrashed` arrives without `Inspector.enable`;
- whether `DevToolsActivePort` is written;
- whether Chromium on Windows survives a server killed by `TerminateProcess`;
- the install-size cost of pool's extra contract copy;
- the fetched HTTP session text;
- a failing proof of the unset-port branch without binding 9222;
- how often a first launch fails transiently on the target host.

**Plan.** The case decides every figure; none is fixed in advance.

- **Host:** the target Windows host, plus a Linux host for the POSIX rows.
- **Instrument:** a TypeScript instrument run by Node under `browser-wt-browse\tmp\probes\eager\`, driving `dist/bin/main.js` over stdio.
- **Load:** a realistic session against a heavy local page (`navigate`, `look`, `read`, `click`, `type`, `replay`), while the host runs the veneer journey projects at the same time.
- **Reporting:** distributions over every run, never a lone mean.
- **Control:** onset under load must exceed onset at idle; otherwise the record states that the load was not reached.

The readings to take:

- **M1:** warm-up per slot (`#warm`) with 1, 2, and 3 at a time, idle and under load.
- **M2:** spawn to the `initialize` answer at sizes 1 to 3, with and without a leftover browser in the root. Read against Codex's 10 s and Claude Code's 30 s (`clients.md:18-19`). This reading includes W8.
- **M3:** failover, from killing the leased pid to the next successful call, at size 1 against size 2. Control: at size 2 the call's endpoint differs from the killed one; at size 1 it is the successor's.
- **M4:** a spare's idle cost (working set and CPU of its process tree, selected by profile path on Windows and by process group on POSIX), and the leased call's latency with and without the spare under load.
- **M5:** the per-call ping round trip under load, confirmation that no healthy call reaches the deadline, and the row 11 recovery (ping deadline plus launch plus call) read against Codex's 60 s `tool_timeout_sec` (`clients.md:19`) (R2-15).
- **M6:** whether Chromium survives a server killed by `TerminateProcess` and by `SIGKILL`.
- **M7:** whether `DevToolsActivePort` appears with the bound port and GUID.
- **M8:** refill launch time after a loss while the session works, against M1.
- **M9:** across a long series of launches under load, how often a launch fails and whether its immediate retry succeeds. This informs `BROWSER_SERVER_RESTARTS`.

The Orchestrator records the readings with dates in `eager\readings.md`. The user rules on D3 from M3 and M4, and on the bound from M9.

## Units

The units are in commit order. Writers serialize, each writes only its owned files, and each stops at its project boundary and reports the commands it ran. Browser commands run in `browser-wt-browse`, and one unit at a time writes `guides\browser.md`. Every proof uses real implementations, and the service projects use real Chromium.

### U1: `@orkestrel/mcp` 0.0.36 handshake hook

- **Role and engine:** astra (GPT-6 Astra), in `mcp`.
- **Owns:**
  - `src\core\types.ts`, `MCPServer.ts` (the option and the getter), `MCPLegacy.ts`, `factories.ts`, `constants.ts` (the remark);
  - `src\server\middlewares.ts`;
  - `tests\src\core\MCPLegacy.test.ts`, `MCPServer.test.ts`, `helpers.test.ts` (the stub), `factories.test.ts`;
  - `tests\src\server\middlewares.test.ts`, `factories.test.ts`;
  - `guides\mcp.md` (rows, conformance text, the fetched HTTP quote);
  - `package.json` at 0.0.36.
- **Depends:** none.
- **Accept** (real `createStdioServer` over `PassThrough`, real `MCPServer`):
  - a. While the hook is pending, `initialize` is unanswered and a later `ping` is answered first. After the hook resolves, the result equals 0.0.35's byte for byte. Fails if `initialize` answers at once.
  - b. `MCPError(msg, -32000, { code })` answers that code, message, and `data` under the id.
  - c. A plain `Error` answers `-32603` `Server error` and emits exactly one `error` event.
  - d. Without a hook, the whole suite passes unchanged.
  - e. Ending the input while the hook is pending aborts `options.signal`, writes nothing, and emits nothing (A-28).
  - f. Legacy `tools/list` answers while `initialize` is parked.
  - g. Modern `server/discover` answers at once with the hook pending.
  - h. Over HTTP, a refused `initialize` returns no `Mcp-Session-Id` and stores no session, and a resolved hook mints one. Fails without the middleware change.
- **Run:**
  - `npx vitest run --config vite.config.ts --project src:core tests/src/core/MCPLegacy.test.ts tests/src/core/MCPServer.test.ts tests/src/core/helpers.test.ts tests/src/core/factories.test.ts`
  - `npx vitest run --config vite.config.ts --project src:server tests/src/server/middlewares.test.ts tests/src/server/factories.test.ts`
  - `npm run check`, `npm run test:src`, `npm run test:guides`
- **Release:** the verifier runs the tree-wide gates. The user publishes from their terminal, and the Orchestrator records the pack integrity.

### U2: `Browser.endpoint`, `Browser.ping`, the port probe, and the double's signal

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:** `src\server\types.ts` (the `BrowserInterface` members and the `BrowserCDPOptions` remark), `src\server\Browser.ts`, `tests\setupServer.ts`, `tests\setupServer.test.ts`, `tests\src\server\Browser.test.ts`, the added cases in `tests\service\browser.test.ts`, and the guide rows.
- **Spec:**
  - `endpoint` returns `#endpoint`. It is set at `Browser.ts:574` and `:653`, and cleared at `:350`, `:406`, `:463`, `:589`, `:672`, and `:1150` (A-25).
  - `ping` throws `BrowserDestroyedError` after destroy, and `BrowserNotConnectedError` unless the browser is connected with a client. Otherwise it sends `Browser.getVersion` with only the defined `timeout` and `signal` keys.
  - The branch at `:320-322` probes only when `this.#options.cdp?.port !== undefined`.
- **Test infrastructure:**
  - The double gains `endpoint` (undefined) and `ping` over its fixture client. `ping` uses `options.timeout ?? the double's options.timeout` (A-7).
  - The double's `connect()` races the gate against `options.signal` and rejects with `BrowserConnectionError('Connection aborted')` (R2-12).
  - `BrowserLauncherOptions` gains three keys:
    - `silent?: number`, which leaves `Browser.getVersion` unanswered for the first N doubles;
    - `timeout?: number`, written into each double's options;
    - `version?: BrowserLaunchHandler`, which hands each `Browser.getVersion` to a proof.
  - The fake process answers `Browser.getVersion` and gains `stall`.
- **Accept, `src:server`:**
  - `endpoint` is undefined before connect, a `ws://` URL after it, and undefined after destroy and after the fake pid's kill.
  - `ping` resolves on a live fake. It rejects `BrowserNotConnectedError` before connect and after the kill, `CDPTimeoutError` under `stall`, and the signal's reason on abort.
  - A held double's `connect()` rejects when its signal aborts, without `release()`.
- **Accept, `service`:**
  - After `connect()`, `endpoint` matches `^ws://127\.0\.0\.1:\d+/devtools/browser/`, that port's `/json/version` answers, and `ping()` resolves.
  - After a kill and `disconnect`, `endpoint` is undefined and `ping()` rejects `BrowserNotConnectedError`.
  - After `destroy()`, the port refuses.
  - A `/json/version` fixture on `127.0.0.1` port 0, with `discover: false` and `cdp.port` set to the fixture's port, makes the launch reject naming that port. Fails without the probe.
- **Run:** the two test files, `npm run test:src:server`, `npm run test:setup`, `npm run test:guides`.

### U3: `BrowserContextOptions.reference`

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:** `src\core\types.ts` (the member), `src\core\BrowserContext.ts`, `tests\src\core\BrowserContext.test.ts`, and the guide row.
- **Depends:** U2, and the item 12 writer's commit when that writer touches `src\core\types.ts`.
- **Spec (A-9):**
  - The constructor (`BrowserContext.ts:73-91`) stores `options?.reference` in a private field whose name does not clash with `#reference` (`:71`).
  - `#attach` (`:283-295`) and `#reattach` (`:322-334`) pass that field, or `this.#nextReference.bind(this)` when it is absent.
- **Accept:**
  - Two contexts given one function issue `e1` and then `e2`.
  - Without the option, each context starts at `e1`.
  - Fails if the option is read from `BrowserPageOptions`.
- **Run:** the test file, `npm run test:src:core`, `npm run test:guides`.

### U4: profile helpers

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:** `src\server\types.ts` (`BrowserProfileRecord`), `src\server\helpers.ts` (`probeProcess`, `parseBrowserProfileRecord`, `formatBrowserServerLoss`), `src\server\stores\FileBrowserStore.ts` (route the check at `:214-222` through `probeProcess`), `tests\src\server\helpers.test.ts`, and the guide rows.
- **Depends:** U3.
- **Accept:**
  - `probeProcess(process.pid)` is true, and an exited child's pid (`readExitedProcessId`, `tests/setupServer.ts:2167`) is false.
  - `parseBrowserProfileRecord` round-trips a record. It returns undefined for unparsable text, a missing key, a pid that is not a positive safe integer, and an endpoint that does not start with `ws://`.
  - `formatBrowserServerLoss` opens with its code, names the cause and the URL, and its `UNRESOLVED` text states that the outcome is unknown and that browse did not repeat the call.
  - The store's lock tests stay green.
- **Run:** the test file, `npm run test:src:server`, `npm run test:guides`.

### U5: the `@orkestrel/pool` dependency and ROADMAP item 13

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:** `package.json` (`"@orkestrel/pool": "^0.0.13"`), `package-lock.json`, `guides\pool.md` (a byte-identical mirror of `scaffold\guides\pool.md`), the `guides\README.md` dependency row, and `ROADMAP.md` (item 13).
- **Depends:** U4.
- **Accept:**
  - `npm ci --ignore-scripts`, `npm run check`, `npm run test:src`, `npm run test:policy`, and `npm run test:guides` are green.
  - `npm ls @orkestrel/pool --omit=dev` shows one copy at 0.0.13.
  - The output of `npm ls @orkestrel/contract --omit=dev` is in the report.

### U6: re-pin `@orkestrel/mcp`

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:** `package.json` (`^0.0.36` at `:109`), the lockfile, and the `guides\mcp.md` mirror.
- **Depends:** the U1 publish.
- **Accept:**
  - `npm ci --ignore-scripts`, `npm run check`, and `npm run test:src` are green.
  - `npm ls @orkestrel/mcp --omit=dev` shows one copy at 0.0.36 (A-11).

### U7: the eager server on the layer (setup, loop, hand-out, handshake, closing, teardown, sweep)

- **Role and engine:** astra (GPT-6 Astra).
- **Owns:**
  - `src\server\types.ts` (`BrowserSlot`, the server block, the `BrowserLaunchFunction` doc);
  - `src\server\constants.ts`;
  - `src\server\BrowserMCPServer.ts`;
  - `src\server\factories.ts` (the doc, and the `@example` at `:103`);
  - `tests\src\server\BrowserMCPServer.test.ts`, which rewrites the lazy cases at `:34`, `:71`, and `:122`;
  - `tests\setupServer.ts` and `tests\setupServer.test.ts` (`hold(from?)`, `refuse(from, count?)`, and a line-collecting `log` stream);
  - `tests\setupService.ts` and `tests\setupService.test.ts` (the recording launcher);
  - `tests\service\browse.test.ts` (added);
  - the server rows of `guides\browser.md`.
- **Depends:** U2 to U6.
- **Spec:**
  - Behaviors 1, 2, 3, 6, 7 (the `k` guard), 8, 9, and 10; the server `destroy()`; Q1's setup; the sweep; the fields table.
  - `createPool` takes `max: #size`.
  - A size that is not an integer from 1 through `BROWSER_SERVER_POOL_LIMIT` throws `BROWSER_SERVER_OPTIONS`.
  - The handshake races `#starting` against `options.signal` and maps a `BrowserError` to `MCPError(`${code}: ${message}`, JSONRPC_SERVER_ERROR, { code })`.
  - `#forward` awaits `#starting`, takes its slot from `#acquire(signal)`, and runs the tool on `slot.toolset`.
  - The record is written as `browse.json.tmp` and renamed, only when `pid` and `endpoint` are both defined (A-20).
  - At a lease change, the mirrored dispatchers outside the vocabulary are removed, and the leased toolset's adopted tools are mirrored.
- **Accept, `src:server`** (doubles over the real Pool):
  - **Eager:** a launch exists before any input is written. Fails if the launch stays lazy.
  - **Handshake:** under `hold()`, `initialize` waits and `ping` answers; after `release()`, `initialize` answers. At size 2 with `hold(1)`, `initialize` answers while double 1 is parked.
  - **Start failure, size 1, `failures: 2`:**
    - `initialize` gets `-32000`, `data.code`, and the fixture text exactly once;
    - `start()` rejects `UNAVAILABLE`, and a `tools/call` answers `BROWSER_SERVER_UNAVAILABLE:`;
    - the launch count is exactly 2 and stays 2 across five more calls (V3, R2-2).
  - **Per-size start counts:** with every create failing, size 2 launches exactly 2 and size 3 exactly 3, and `start()` rejects (R2-14).
  - **Spare fails at start:** `refuse(1)` at size 2 gives exactly 3 launches, one `EXHAUSTED` line, and calls on double 0. At size 3, exactly 3 launches and one line.
  - **Create in flight when the bound is spent (R2-4):** size 3, `failures: 2`, `hold(2)`. `start()` stays pending until `release()`, then resolves. A call runs on double 2, the launches are exactly 3, and one `EXHAUSTED` line names 2 browsers short. Fails if `unavailable` ignores the create in flight.
  - **Options:** sizes 0, 4, 1.5, and -1 throw `BROWSER_SERVER_OPTIONS`.
  - **Concurrency:** concurrent first calls run on one double.
  - **Destroy during a hold:** `destroy()` resolves `start()` without `release()` and writes nothing afterward (R2-12).
  - **One-turn close (R2-6):** `start(); destroy()` in one turn settles both, records no launch, leaves the pre-created `.profiles` listing at its baseline, and returns the listener counts to baseline. Fails if `#fill` or `#setup` ignores `#closing`.
  - **`destroy()` then `start()`:** rejects `ENDED`; listeners and `.profiles` are at baseline; no launch (A-1).
  - **Unusable root:** a root under a regular file answers `initialize` `-32000` with `data.code: 'BROWSER_SERVER_UNAVAILABLE'`, and `start()` rejects naming `ENOTDIR` (A-2).
  - **Listeners:** after `destroy()`, the `SIGINT`, `SIGTERM`, input `end`, `close`, and `data` listener counts equal their baseline.
  - **Shared root:** two servers in one root; destroying one leaves the other's profiles.
  - **Sweep keep and remove:** an exited child's entry with no record is removed; a record with a dead pid is removed; a running child's entry, this pid's entries, and a bare UUID are kept.
  - **Sweep negative (A-27):** the record names a running child and an endpoint that refuses, and the folder is kept. The control without the recheck removes it.
  - **Sweep off the handshake path (A-3, R2-11):** the record names a running child and a `CDPTestServer` endpoint that accepts the WebSocket and leaves `Browser.close` unanswered. `initialize` answers while that attach is pending, and `destroy()` resolves without the fixture answering. A second case uses a `StallServer` endpoint whose connect never completes.
- **Accept, `service`** (real Chromium):
  - `start()` resolves only after a recorded browser is connected, and an `initialize` written earlier is answered after that.
  - `navigate` then `look` run on one pid; at size 2, the other page stays at `about:blank`.
  - After `destroy()`: every recorded pid gives `ESRCH`, every endpoint port refuses, no entry carries this pid's prefix, and listeners are at baseline.
  - A missing executable makes `start()` reject naming `ENOENT`; `initialize` gets `-32000`; no profile is left.
  - **Killed server:** a child Node script starts a size-1 server from `dist`, prints its browser pid and endpoint, and is killed. A second server's `start()` and `destroy()` then leave that pid at `ESRCH` and its folder gone.
- **Run:** the two test files, `npm run test:src:server`, `npm run test:setup`, `npm run test:guides`.

### U8: liveness, loss, bound, survivors, and outcome semantics

- **Role and engine:** astra (GPT-6 Astra).
- **Owns:** `src\server\BrowserMCPServer.ts`, `tests\src\server\BrowserMCPServer.test.ts`, `tests\setupServer.ts` and `tests\setupServer.test.ts`, `tests\service\browse.test.ts`, and the server remarks in the guide.
  - The double gains `kill()`, which emits `disconnect` and reports `disconnected` while its fixture transport keeps answering.
  - The double gains `defer()` and `resume()`, which park its next `destroy()`.
  - `BrowserLauncherOptions` gains `survivors?: number`: the first N doubles' `destroy()` rejects.
- **Depends:** U7.
- **Spec:** behaviors 4, 5, 6 (the V5 lowering), 7, and 9 (the forced kill); the operation lifecycle; the transitions.
- **Accept, `src:server`:**
  - **Silent spare:** `silent: 1`, size 2, and a launcher `timeout` the case picks inside Vitest's 5 s default. The hand-out times out on double 0, which is struck and destroyed; double 2 launches; the call runs on double 1.
  - **Survivor at size 1 (V1, R2-5):** `survivors: 1`; `kill()` on the lease launches nothing and keeps that profile.
    - The next call answers the note, then `UNAVAILABLE` naming unconfirmed termination.
    - `destroy()` rejects an `AggregateError` containing the failure.
    - Ending the input raises no `unhandledRejection`, writes one `TEARDOWN` line, and sets `process.exitCode` to 1, which the test restores (A-5).
    - Fails if `k` omits survivors, because Pool frees the capacity (`Pool.ts:518`) and a launch would be recorded.
  - **Survivor at size 2:** the leased double 0 is a survivor. After `kill()`, the call runs on double 1, no launch follows, and one `TEARDOWN` line is written.
  - **Watch signal (V4, R2-7):** each double's `emitter.count('disconnect')` and its context's `count('page')` return to 0 on three paths:
    - after a spare kill drained by `clear()`;
    - on the validation path: double 1 `defer()`, kill the spare, kill the lease, `resume()`; double 0 is disposed by a refusing `#validate`, and double 2 starts only after double 0's destroy settled;
    - after `pool.destroy()`.
    On a failed warm, none are added and no slot enters `#lost`.
  - **V5:** size 2.
    1. Kill the spare: one relaunch.
    2. Kill the spare again: no launch, and one `EXHAUSTED` line.
    3. With `hold(next)`, kill the lease: exactly one double exists while it is held.
    4. `release()`: the call succeeds with the note, and only then is the spare's double launched, for exactly 2 launches after the lease kill.
    Fails if the leased loss gets no launch, or if two launches start together (R2-1).
  - **V2 pinned:** size 1, `refuse(1, 3)`, kill the lease. Exactly 2 failed launches; the launcher records 3 doubles in total. Fails at 1 or 3 failed launches.
  - **Finding 6 counts:** size 2, `refuse(2)`. A spare kill records exactly one failed relaunch; a later lease kill records exactly one more, and calls answer the note and then `UNAVAILABLE`.
  - **No outstanding waiter (R2-3):** size 2, `hold(2)`.
    1. Kill the lease; make a call (it leases double 1); kill double 1.
    2. `release()`: exactly 2 relaunches are recorded.
    3. `refuse(next)`, then kill the spare: exactly one failed launch.
    Fails if a step runs while an acquire is outstanding.
  - **Concurrent calls across a fault (A-15):** a `wait` call runs on A, and A is killed. A second call runs on B with the note, and the `wait` answers `BROWSER_SERVER_UNRESOLVED:`.
  - **Known outcomes (R2-9):**
    - A `version` handler that answers the per-call ping and kills the lease in the same turn makes the call run on the spare with the note.
    - A `released` handler that answers and kills during a `click` makes the click answer success, and the next call carries the note.
- **Accept, `service`** (real Chromium; size 2 unless stated):
  - **Lease kill:** kill the leased pid after `navigate`.
    - The next call runs on the other pid and opens `BROWSER_SERVER_CRASH:` naming the URL; the call after it has no note.
    - One replacement is recorded, and its connect starts after the predecessor's destroy settled. Two pids are live afterward.
    - `destroy()` then resolves.
  - **Outcome unknown:** a `navigate` to a fixture route that holds its response, with the browser killed mid-call, answers `UNRESOLVED` stating that the outcome is unknown. The fixture records exactly one request. Fails if browse repeats the call.
  - **Renderer crash:** `Page.crash` on the current view puts the note on the next call; on a background tab it gives no note. This decides A-17. If the case fails, `Inspector.enable` goes into `#enableSession` (`BrowserContext.ts:494-497`) in a core unit after item 12.
  - **Spare kill:** the next call runs on the same pid with no note, and one replacement is recorded.
  - **Stale reference (A-8):** take `eN` from `look`, kill, `navigate` to the same fixture, `look`, then click the old `eN`. The click is refused and the counter stays 0. U3's control without the shared counter increments it.
  - **Size 1:** after a kill, the next call waits for the successor and succeeds with the note.
  - **Hang, POSIX only:** `SIGSTOP` the leased pid with the browser `timeout` the case picks. The next call opens with the note, the replacement's launch is recorded within one deadline of the ping's rejection (A-24), and the stopped pid gives `ESRCH`.
  - **Missing executable after start:** a spare kill records one failed relaunch; a lease kill answers the note and then `UNAVAILABLE` naming `ENOENT`.
- **Run:** as U7.

### U9: the bin and `BROWSE_POOL`

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:** `src\bin\main.ts`, `tests\src\bin\main.test.ts`, the bin cases in `tests\service\browse.test.ts`, and the guide's variable list.
- **Spec:**
  - `parseInteger` from `@orkestrel/contract` beside `parseBoolean` (`src/bin/main.ts:1`, `:7`). An empty value counts as unset.
  - A value that is not an integer exits 1 with `BROWSER_SERVER_ENVIRONMENT`. A value out of range surfaces the constructor's `BROWSER_SERVER_OPTIONS`.
- **Depends:** U8.
- **Accept, `src:bin`:**
  - With a missing executable, stdout carries the `-32000` answer and stderr carries exactly one `browse: BROWSER_SERVER_UNAVAILABLE: … ENOENT …` line, with the code token once (A-19). Exit is 1 after the input ends.
  - `BROWSE_POOL=two` exits 1 with `ENVIRONMENT`; `BROWSE_POOL=4` exits 1 with `OPTIONS`.
- **Accept, `service`** (built entry): `initialize`, `tools/list`, and `navigate` answer. Input end gives exit 0 and leaves no profile with the child's prefix.
- **Run:** the test file, the service file, `npm run test:guides`.

### U10: review

- **Role and engine:** reviewer (Opus 5.5), objective lane, not a writer.
- **Scope:**
  - the ceiling argument (behavior 10) against `Pool.ts`;
  - the step rule and the turn in which the loop stops;
  - the claim that no grant changes `k` or `#strikes`;
  - the `#closing` checks;
  - the forced kill read from the cause;
  - the sweep's deletions;
  - the handshake and the HTTP session mapping.
- **Depends:** U9.
- **Accept:** a falsify verdict. Each finding returns to its unit.

### U11: gates

- **Role:** verifier.
- **Work:** in browser, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, and `npm run test:service`, each read bare.

### U12: real-client check

- **Role:** verifier.
- **Work:**
  - Register the built `browse` with Claude Code and read `/mcp` with a missing executable and with a valid one.
  - Do the same with `codex mcp` where the host has Codex.
  - Record whether each client closes the input at its startup timeout (A-29).

### U13: measurement

- **Role:** a builder writes the instrument; the Orchestrator runs it.
- **Owns:** `tmp\probes\eager\*.ts` and the readings record.
- **Depends:** U11.
- **Accept:** M1 to M9, each with host, Chromium version, load, date, and every run. No default changes in this unit.

### U14: prose, roadmap, and version

- **Role and engine:** opus (Opus 5.5).
- **Owns:**
  - `guides\browser.md` § Register the browse binary with Claude Code: the eager start, the client budgets, `BROWSE_POOL`, the note and the unresolved outcome, the onset refusal, the `log` lines, and the one-time removal of bare `.profiles/<uuid>` folders (D10);
  - Codex's `startup_timeout_sec`, only if M2 passes 10 s (D10);
  - the lazy-launch passages of `README.md`;
  - `ROADMAP.md`: remove item 13, then paste items 14 and 15 with each `LINE` filled in;
  - `package.json` at 0.0.22.
- **Depends:** U12 and U13.
- **Accept:** `npm run test:guides` and `npm run test:policy` are green, and every behavior sentence maps to a U7, U8, or U9 assertion.

### U15: gates and publish

The verifier reruns the U11 gates. The user publishes `@orkestrel/browser` 0.0.22 from their terminal, and the Orchestrator records the pack integrity.

### U16: the probe roadmap sentence

- **Role and engine:** builder (Sonnet 5.5), in `probe`.
- **Owns:** `ROADMAP.md`. Append the sentence from Roadmap texts to item 1.
- **Depends:** U15.
- **Accept:** `npm run test:policy` is green.

### After this release

After the user's D3 ruling, one unit changes `BROWSER_SERVER_POOL_SIZE` and its guide sentence. After the user's bound ruling, one unit changes `BROWSER_SERVER_RESTARTS`.

### Release order

1. `@orkestrel/mcp` 0.0.36: U1 and its gates, then the user publishes.
2. `@orkestrel/browser` 0.0.22: U6 re-pins mcp, U7 to U14 land, U15 gates, then the user publishes.
3. `@orkestrel/pool`: no release. The re-pin is ruled unnecessary.
4. `@orkestrel/probe`: a roadmap text only, no release.

## Roadmap texts

**Browser item 13,** pasted by U5 and removed by U14. Check the number against the merged main `ROADMAP.md`, whose highest item is 12.

```markdown
- **13.** Start `browse`'s browsers at server start and replace one that dies: `start()` (`src/server/BrowserMCPServer.ts:131-139`) serves stdio and launches nothing, the first tool call launches one Chromium (`#open` and `#launch`, `:199-260`), a fulfilled launch stays in `#session` (`:85`, `:199-209`) after its browser exits, and nothing subscribes to the browser's `disconnect` (`src/server/Browser.ts:416-418`), so a crashed browser leaves every later call on a dead page. Declare `@orkestrel/pool` `^0.0.13` and compose one pool of `BrowserSlot` records whose `max` is the size, with a server-private layer that fills the floor at start by acquiring for itself, watches each browser, refills after a loss on the owner's decision one step at a time within a refill bound, and counts a browser whose termination failed against the size; gate `initialize` on the first warm browser through `@orkestrel/mcp` 0.0.36's `handshake` hook; ping the leased browser at hand-out and before every call; answer a call its browser's loss interrupted with `BROWSER_SERVER_UNRESOLVED` and never repeat it; and reclaim the profiles a killed server left at the next start in the same root. Keep the size at 1 until the user rules on the spare's measured value (D3, D10, 2026-10-03).
```

**Browser item 14,** pasted by U14:

```markdown
- **14.** Let `browse` serve a second holder at the same time: the session holds one lease across calls (`#lease`, `src/server/BrowserMCPServer.ts:LINE`), every other warm browser is a spare that serves failover only (`#spares`, `:LINE`), and a replay runs on the session's browser, so parallel agents, or a replay beside interactive work, share one browser. After the user rules that failover is proven (D10, 2026-10-03), give each holder its own lease from the spares, keep the holders within the configured size, and measure the contention on the target host before raising the default.
```

**Browser item 15,** pasted by U14:

```markdown
- **15.** Move `browse`'s lifecycle layer into `@orkestrel/pool` when `@orkestrel/probe` ROADMAP item 1 reaches its design round or a second consumer needs the same parts, whichever comes first: `BrowserMCPServer` fills its floor by acquiring for itself, one step at a time, and holds every live token (`#fill`, `#restore`, `#spares`, `src/server/BrowserMCPServer.ts:LINE`), because `@orkestrel/pool` 0.0.13 creates only for a queued waiter and settles waiters in request order (that package's `src/core/Pool.ts:263-277`, `:425-444`); it marks a lost browser and releases it for `clear()` or a refusing `validate` to dispose (`:147-160`, `:386-408`, `:470-483`); and it subtracts a browser whose termination failed from the floor, because `#clean` frees that capacity (`:518-520`). Expand `@orkestrel/pool` with `min`, `start()`, a `watch(value, signal)` hook, the token's `destroy()`, and a `restarts` bound required with `min`, keeping the resource ruling's V1 to V5; declare that release here; pass `#watch` as the `watch` hook and the ping as `validate`; delete `#fill`, `#restore`, `#refill`, `#lose`, `#validate`, `#watches`, `#spares`, `#change`, `#survivors`, and `#strikes` in the same change; and release this package.
```

**The sentence U16 appends to probe item 1** (`probe\ROADMAP.md:5`):

```markdown
Build that replacement on the lifecycle layer `@orkestrel/browser`'s `browse` server composes over `@orkestrel/pool` 0.0.13 (that package's ROADMAP item 15): this item's design round is that layer's trigger to move into `@orkestrel/pool` as `min`, `start()`, `watch(value, signal)`, the token's `destroy()`, and `restarts`, so map each stage onto those members first, with `create` constructing the stage (`src/server/Probe.ts:137-139`), `destroy` calling the stage's own (`:545`), `watch` settling on the Oxlint client's `exit` (`src/server/stages/LintStage.ts:156`), and the deadline recycle (`#recycle`, `src/server/Probe.ts:536-575`) calling the leased token's `destroy`, and write a local loop only for a stage that needs a member the layer lacks.
```

## Finding map

The following table maps each finding to where this design repairs or rules on it:

| Finding | Ruling | Where |
| --- | --- | --- |
| A-1 `start()` after `destroy()` | Repaired | Q1; row 25; U7 |
| A-2 setup errors that are not browser errors | Repaired | Q1 conversion; U7 `ENOTDIR` case |
| A-3 the handshake waits for the sweep | Repaired | sweep detached in `#sweeping`; U7; M2 |
| A-4 the sweep's exit race | Repaired | `destroy()` rechecks kept folders; U7 killed-server case |
| A-5 an unhandled rejection at exit | Repaired | `#end`; U8 survivor case |
| A-6 spare-kill count | Repaired | strike rule plus step cap; U8 counts |
| A-7 silent-ping timeout | Repaired | U2 `timeout`; U8 |
| A-8 stale-reference test | Repaired | U3 plus the U8 navigate-and-click case |
| A-9 U3 reads the wrong options | Repaired | U3 spec |
| A-10 typed stub | Repaired | U1 owns `helpers.test.ts`; `npm run check` |
| A-11 `npm ls` count | Repaired | U6 `--omit=dev` |
| A-12 HTTP session on refusal | Repaired | U1 middleware, case h |
| A-13 `server/discover` gate | Repaired | gate dropped |
| A-14 false remark | Repaired | limited to the hook |
| A-15 shared note | Repaired | per-slot `#lost` plus `#notice`; U8 |
| A-16 fixed port | Repaired | ephemeral fixture; unset branch in Tensions |
| A-17 crash evidence | Taken | U8 decides |
| A-18 per-method behavior | Taken | Q1 |
| A-19 code token twice | Taken | cause-only message; U9 |
| A-20 record write | Taken | temp file and rename, both fields defined |
| A-21 `#releasing` keyed | Moot | Pool owns destroying records |
| A-22 half-built toolset | Taken | `#warm` failure passes it to `#teardown` |
| A-23 note plus refusal | Taken | a refusal carries and clears the note |
| A-24 `SIGSTOP` start | Taken | measured from the ping's rejection |
| A-25 endpoint clears | Taken | U2 doc |
| A-26 explicit listener removal | Taken | the watch removes its listeners on abort (V4) |
| A-27 sweep negative case | Taken | U7 |
| A-28 case f emits nothing | Taken | U1 case e |
| A-29 client closes input | Taken | row 21; U12 |
| A-30 forced-kill explanation | Taken | behavior 9 |
| A-31 panel scores | Taken | dropped |
| R2-1 V5 issues `size` attempts | Repaired | step cap `RESTARTS + 1 − #strikes`; U8 V5 and counts cases |
| R2-2 hand-out refills | Repaired | `#grant` never calls `#fill`; no reset at grant; U7 fixed-count case |
| R2-3 `k` misses pending acquires | Repaired | a step awaits every acquire; one loop at a time; U8 no-outstanding-waiter case |
| R2-4 `unavailable` ignores a create in flight | Repaired | `unavailable` requires `#refill` undefined; U7 case |
| R2-5 two guards, neither provable | Repaired | `CEILING` deleted; `k` guard; U8 case fails without it |
| R2-6 no `#closing` guard | Repaired | behavior 8; U7 one-turn case |
| R2-7 aborted watch | Taken | the watch never settles on abort; armed last |
| R2-8 teardown order | Taken | toolset, then browser, then profile |
| R2-9 misclassified outcomes | Taken | `UNRESOLVED` only on failure; re-check after the ping; U8 |
| R2-10 hand-out ping signal | Taken | `#abort.signal` |
| R2-11 sweep attach unbounded | Taken | bare client, `Browser.close` under the signal; U7 |
| R2-12 double ignores signal | Taken | U2 |
| R2-13 `cleanup` and `destroyed` codes | Taken | `#refuse` |
| R2-14 counts per size; unreported stops | Taken | behavior 6 table; stop lines |
| R2-15 row 11 against the tool timeout | Taken | M5 |
| R2 referred: names | Ruled | members renamed (`#fill`, `#watch`, `#lose`, `#validate`); see Tensions |
| R2 referred: `BrowserSlot` | Ruled | public by `AGENTS.md:60` |
| R2 referred: forced kill site | Ruled | moved inside `#teardown` |
| R2 referred: D10 retire, D4 modern, RESTARTS | Referred | Tensions |
| V1 | Required | behavior 7; U8 survivor cases |
| V2 | Required | behavior 6; U8 V2 pinned case |
| V3 | Required | behaviors 1 and 3; U7 |
| V4 | Required | behaviors 4 and 9; U8 three disposal paths |
| V5 | Required | `Math.min` lowering plus step cap; U8 V5 case |

## Tensions

These judgment calls stay open for the user, the Orchestrator, or the other lane:

- **D10's "a spare that fails retires and is reported" (user).** The design applies one bound to every failed create, so a failed spare retires after its one retry within the bound, and the stop is reported. The literal reading retires it at its first failure, which costs one less launch.
- **`BROWSER_SERVER_RESTARTS = 1` (user).** It is reasoned from the case as Q3 asks, not measured. M9 informs it, and D5 and V2's "no default" argue for a measured value.
- **D4 for modern clients (user).** A 2026-07-28 client meets the onset only at its first `tools/call`.
- **No strike reset at a grant (user or Orchestrator).** After `RESTARTS + 1` spare failures over a server's life, spare positions stay short until a leased loss lowers the count, even when the failures were hours apart. At size 1 there is no spare. The alternative, a reset at grant, breaks R2-1 and R2-2.
- **The unset-port branch has no failing proof without binding 9222 (Orchestrator).** Recommended: accept it on review beside the ephemeral-port case. Alternative: a recorded exception for one case on `127.0.0.1:9222`.
- **The `log` option (subjective).** It is a public option that exists for spy-free proofs and for hosts that embed the server. The alternative is an event surface the server lacks.
- **Layer names (subjective).** `#lose` cannot be `#destroy`, because the server's own `#destroy` and `destroy()` exist. The move renames it to the token's `destroy`.
- **`BrowserSlot` is public with no public signature that uses it (subjective).** The kind-file law places it in `types.ts`.
- **The interrupted call answers `isError: true`.** A read-only tool gets the same text.
- **W8.** At sizes 2 and 3, the onset is the launch time of the head of the queue.
- **The record window** between spawn and rename stays open until M7 rules on `DevToolsActivePort`.
- **Concurrent writers.** U3 waits for item 12 when both touch `src/core/types.ts`.

## Risks

The design carries these risks:

- **POSIX orphans** after a server `SIGKILL` live until the next start in the same root. Windows is unmeasured (M6).
- **A hung leftover whose close fails** is kept until its pid ends.
- **On POSIX, a kill between spawn and rename** lets the sweep delete a live orphan's profile.
- **Survivor classification is conservative.** Any `destroy()` rejection counts as a survivor, including a local cleanup failure after termination (`Browser.ts:865-867`). The pool then runs short by one, with a report, and never runs over.
- **The real-Chromium hang proof is POSIX only.**
- **`Page.crash` is experimental,** and crash detection might need `Inspector.enable`.
- **Slow hosts** might pass Codex's 10 s startup budget (M2) or its 60 s tool budget on row 11 (M5).
- **The per-call ping adds one round trip per call** (M5).
- **The pool adds one more physical contract 0.0.18 copy.**
- **The layer's correctness rests on Pool 0.0.13's ordering.** Any pool re-pin before item 15 must rerun U7 and U8.
- **With `BROWSE_HEADLESS=false`, each spare opens a window.**
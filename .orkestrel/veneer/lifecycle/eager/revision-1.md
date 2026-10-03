# Ruled design, revision 2: eager, recovering `browse` on a thin `@orkestrel/pool`

**Lane: ruling.** The dispatch names no single lane, so this document rules both lanes: correctness against the code (objective) and shape and naming (subjective). Subjective calls are marked under Tensions. Paths are relative to `C:\Users\mikes\WebstormProjects\`. Unqualified `src/` and `tests/` paths are in `browser-wt-browse`. Lifecycle records are under `scaffold\.orkestrel\veneer\lifecycle\`.

## Design

D12 (`eager\design-brief.md:24`) sets the placement:

- `browse` declares `@orkestrel/pool` `^0.0.13` as a runtime dependency. The user requested it explicitly in D11 (`:23`), as `AGENTS.md:38` requires.
- `BrowserMCPServer` composes one unchanged `createPool<BrowserSlot>({ create, destroy, validate, max: size })`.
- A browse-side layer adds what Pool 0.0.13 lacks. That layer is a set of private members of `BrowserMCPServer`, and each member is written as the pool member it later becomes.
- `@orkestrel/pool` gets no API change and no release.

### Pool 0.0.13 as read

The layer relies on these behaviors of the real code:

- **Construction creates nothing** (`pool\src\core\Pool.ts:65-80`).
- **`create` runs only for a queued waiter.** It runs when no record is idle and `size + reservations < max` (`:263-277`, `:284-291`).
- **Idle records go out in order.** `#pump` hands the oldest idle record to the next unassigned waiter, and validates it only then (`:265-269`, `:293-312`).
- **A failed validation disposes the record and feeds the same waiter.** After the cleanup settles, the same waiter is pumped again and might trigger a create (`:386-408`). If the cleanup fails, that waiter is rejected with code `cleanup` and nothing is created for it (`:393-402`).
- **`release()` recycles without validation.** It removes the lease at once (`:470-473`), pushes the record to idle, and emits `release` (`:475-483`). `active` drops at the same moment (`:97-100`).
- **`clear()` disposes the idle snapshot** (`:147-160`).
- **`#dispose` can be called twice safely** (`:485-501`). `#clean` deletes the record after the hook attempt whether the hook resolved or rejected (`:518-520`), so a failed destroy frees capacity.
- **The commit barrier settles waiters in request order** (`:425-444`).
- **`destroy()` is one barrier.** It rejects waiters with `destroyed`, disposes idle and leased records, waits for creates in flight, and destroys the emitter last (`:170-189`, `:336-342`, `:574-587`).
- **Events carry no payload, and the token is `{ value, release }`** (`pool\src\core\types.ts:35-44`, `:50-58`).

### The layer and the pool member each part becomes

Each private member of `BrowserMCPServer` maps to the member a later pool expansion takes:

| Layer part in `BrowserMCPServer` | Later `@orkestrel/pool` member |
| --- | --- |
| `pool.size` (`#size`), passed as `max` and used as the floor | `min` and `max` |
| `#replenish()`, the owner's fill at setup and refill after a loss | `start()` and a refill that needs no waiter |
| `#watch(slot, signal): Promise<unknown>`; the signal aborts when teardown begins | `watch(value, signal)` |
| `#lose(slot, cause)` | `PoolToken.destroy()` for a leased record; disposal driven by `watch` for an idle one |
| `BROWSER_SERVER_RESTARTS` with `#strikes` | `restarts` (required with `min`, no default; V2) |
| `#survivors` plus the refusal in the create hook | a record whose destroy rejects stays counted |
| `#spares` and the `#change` wake-up | the idle list and the acquire queue, after refills need no waiter |
| `#lease` beside `#spares` | the holder, deferred (V6) |

The hooks are private methods:

- `#warm()` is `create`.
- `#teardown(browser, profile, toolset)` is `destroy`, called as `(slot) => this.#teardown(slot.browser, slot.profile, slot.toolset)`. The failure path of `#warm` calls the same method, so teardown has one place (D8).
- `#check(slot)` is `validate`, and returns `!this.#lost.has(slot)`.

### How the layer drives Pool 0.0.13, behavior by behavior

**1. The owner fills the warm floor at start (D1, D7).**

- `#replenish()` computes `k = #size − pool.active − #survivors.size`.
- It issues `k` calls to `pool.acquire()` with no signal. These owner acquires are the only `acquire` calls in the server.
- With no idle record and capacity free, Pool reserves and runs `#warm` for each waiter (`Pool.ts:272-276`, `:314-317`). It inserts the record (`:332-335`) and commits tokens in FIFO order (`:425-444`).
- Each token the owner receives goes to `#spares` and resolves `#change`.
- **Proof that no caller causes a launch:** the session never calls `pool.acquire`, so every create is for an owner waiter. That meets V3 by construction.

**2. The hand-out serves the session (D7, D10).**

- `#grant()` peeks at `#spares[0]` and pings its browser.
- When the ping resolves and that token is still the head and not lost, `#grant()` shifts it into `#lease`, resets `#strikes` to 0, and mirrors its adopted tools.
- No Pool call is involved, so no hand-out waits on the commit barrier behind a refill's create.
- With no spare, `#grant()` starts or joins `#replenish()` and parks on `#change`.
- `#grant()` is one promise that concurrent callers share. Each call races it against its own signal.

**3. A watch runs on each browser (D2, D7).**

- `#warm` arms `#watch(slot, signal)` after `toolset.start()` resolves: `void this.#watch(slot, signal).then((cause) => this.#lose(slot, cause))`.
- The watch settles on the browser's `disconnect` (`src/server/Browser.ts:416-418`, `:474`). It also settles on a `crash` (`src/core/types.ts:1084`) of a context page that is `slot.toolset.view` when the crash arrives (`src/core/BrowserToolset.ts:362-364`). It subscribes to existing pages and to the context's `page` event (`src/core/types.ts:1617-1620`).
- When the browser is not `connected` at arming, the watch settles at once.
- Listeners are bound methods; nested functions are banned (`.claude\rules\architecture.md:173-175`), and `BrowserToolset.ts:2061-2088` sets the precedent. The browser `disconnect` and context `page` listeners are removed on the signal's abort (V4). A page `crash` handler returns when the signal has aborted, and its page emitter is destroyed with the page.
- The cause is derived at `disconnect`: `browser.pid === undefined` means the process exited (`Browser.ts:396-406`); otherwise the CDP connection was lost (`:452-464`).

**4. The owner refills after a loss; a caller's hand-out never refills (D12).**

`#lose(slot, cause)` returns at once if the slot is already lost or the server is closing. Otherwise it runs these steps:

1. It records `#lost.set(slot, cause)`.
2. When the cause is a ping failure, it sends `SIGKILL` to `browser.pid`, ignoring `ESRCH` (forced).
3. When the slot is `#lease`, it clears `#lease`, sets `#notice = slot`, withdraws the mirrored dispatchers, and sets `#strikes = Math.min(#strikes, BROWSER_SERVER_RESTARTS)` (V5).
4. When the slot is in `#spares`, it removes the token and adds a strike, because the browser was never leased.
5. It calls `token.release()`. The lost record goes idle without validation (`Pool.ts:470-483`).
6. It calls `#replenish()`.

A token not yet received (still in Pool's ready map) is handled when it arrives: the refill sees `#lost.has(token.value)`, adds a strike, and releases it.

Each refill step runs in this order:

1. `await pool.clear()` disposes every idle record (`:147-160`). Only lost records are ever idle, so this tears down every lost browser even when no successor follows (D8). Its cleanup rejection is caught.
2. The step recomputes `k`. If `k > 0` and the pool is not exhausted, it issues `k` owner acquires.
3. A lost record released after the `clear()` snapshot meets an acquire. `#check` refuses it, Pool disposes it and then creates for the same owner waiter (`:386-408`).

Ordering proof: Pool deletes a record only after its destroy hook settles (`:518`), and capacity counts records plus reservations (`:272`). The step awaits `clear()` before acquiring. So a successor never launches beside a predecessor whose teardown is still running.

**5. The refill has a bound (V2, V5).**

- `#strikes` counts consecutive refill failures since the last lease grant.
- One strike is added for each of these:
  - a create that rejects (the owner acquire rejects with `create`, `Pool.ts:319-329`);
  - a spare lost before it was ever leased, whether by its watch, its hand-out ping, or before receipt.
- A leased loss adds no strike. It sets `#strikes` to at most `BROWSER_SERVER_RESTARTS`, so it always gets one attempt, and that attempt's failure counts (V5).
- A lease grant resets the count.
- Exhausted is derived as `#strikes > BROWSER_SERVER_RESTARTS` and never stored.
- `BROWSER_SERVER_RESTARTS = 1` is reasoned: a deterministic cause fails its one retry, and a transient cause clears on it.
- When the bound stops the refill while a lease exists, the server writes one stderr line `browse: BROWSER_SERVER_EXHAUSTED: …` (D10: a spare that fails is reported).

**6. A browser whose teardown fails still counts against the ceiling (V1 as corrected in D11).**

- In `#teardown`, a rejected `browser.destroy()` means termination is unconfirmed (`Browser.ts:1139-1141`). The browser goes into `#survivors` with its error, its profile and record stay on disk, and the hook rethrows.
- Pool frees the capacity anyway (`:518-520`). The layer compensates in two places:
  - `k` subtracts `#survivors.size`.
  - `#warm` refuses before any launch when `pool.size + #survivors.size >= #size`, with `BrowserError` code `BROWSER_SERVER_CEILING`. The refill treats that refusal as a stop and adds no strike.

**7. Teardown has one place.**

- `destroy()` aborts `#abort`, which the Browser signal and the sweep's attaches observe. It wakes `#change` and awaits `#starting`.
- It then awaits `pool.destroy()`. That covers leased, idle, and creating records through the one hook (`:170-189`).
- It then awaits the sweep and rechecks the folders the sweep kept.
- It ends by throwing an `AggregateError` of Pool's cleanup failures, `#survivors`, and `#faults`, deduplicated by identity.

### Workarounds Pool 0.0.13 forces (the members the later move adds)

Each workaround names the Pool fact that forces it:

- **W1, no floor.** Creation only serves a waiter (`Pool.ts:263-277`), so the owner acquires for itself. The move adds `min`, `start()`, and a refill with no waiter.
- **W2, no loss observation.** Pool reads `T` only in `validate` and `destroy` (`:293-312`, `:503-526`), so the layer runs `#watch` and `#lost`. The move adds `watch(value, signal)`.
- **W3, no disposal of a chosen record.** Pool disposes only through `validate`, `clear`, or `destroy` (`:386-408`, `:147-160`, `:170-189`), so the layer releases the lost record and calls `clear()`. The move adds `PoolToken.destroy()` and disposal driven by `watch`.
- **W4, a rejected destroy frees capacity** (`:518-520`), so the layer keeps `#survivors` and the ceiling refusal. The move keeps such a record counted.
- **W5, no refill bound.** The layer keeps `#strikes` and `BROWSER_SERVER_RESTARTS` with the V5 rule. The move adds a required `restarts`.
- **W6, idle records go to whichever waiter the pump meets first** (`:263-271`). A hand-out queued behind a refill waiter also waits on the commit barrier (`:425-444`). So the layer holds every live token in `#spares` or `#lease`, keeps Pool's idle list for lost records only, and parks hand-outs on `#change`. After the move, refills need no waiter, and the session's `acquire()` takes an idle spare whose `validate` is the ping.
- **W7, no holder and empty payloads** (`types.ts:35-58`). `#lease` beside `#spares` records who holds each browser. The holder stays deferred (V6).
- **W8, the onset carries the slowest launch ahead of the head.** With size 2 or 3, the first token arrives in FIFO order (`:425-444`), so the onset waits for the queue's head and not the fastest launch. Size 1 is unaffected, and M2 measures the effect.

### V1 to V5 as requirements on the layer

| V | Requirement | Where |
| --- | --- | --- |
| V1 | No refill beside a browser whose destroy rejected; that browser stays counted; `destroy()` reports it | Behavior 6; U8 accept `survivors` |
| V2 | The bound always exists; cases pin the last allowed failure and the first refused one | `BROWSER_SERVER_RESTARTS`; U8 accept "exactly 2 failed launches" |
| V3 | No create for a waiter | Only owner acquires exist; U7 accept "calls never launch" |
| V4 | The watch takes a signal that aborts when disposal begins | `#teardown` aborts the slot's controller first; U8 accept listener counts on all three disposal paths |
| V5 | A leased loss always gets one refill attempt, and its failure counts a strike | `Math.min` rule; U8 accept V5's breaking input |

### Ruling: no `@orkestrel/pool` release to re-pin `@orkestrel/contract`

The re-pin is not needed, for three reasons:

- **The two copies behave the same.** `PoolError` builds its message with `isError` and `isString`, and `isPoolError` is `isInstance(value, PoolError)` (`pool\src\core\errors.ts:2`, `:35-41`, `:61-63`). The class compared is the pool's own single class. `isInstance` is `value instanceof target` (contract `dist\src\core\index.js:933-936` in both copies), `isError` uses the global `Error` (`:981-983`), and the only module-level identity, `CONTRACT_ERROR_BRAND`, is `Symbol.for("@orkestrel/contract.error")` (`:12` in both copies). Every value that crosses between the copies therefore gets the same answer.
- **The second copy is already there.** `@orkestrel/browser`'s runtime dependencies already install `@orkestrel/contract` 0.0.18 copies beside the root 0.0.19:
  - `node_modules\@orkestrel\emitter\node_modules\@orkestrel\contract` (emitter pins `^0.0.18`, `emitter\package.json:73`);
  - the same folder under `websocket` (`:73`);
  - the same folder under `router` (`:96`).
- **A re-pinned pool removes none of them.** Pool depends on `@orkestrel/emitter` `^0.0.11` (`pool\package.json:73`), and that emitter still carries 0.0.18. Adding pool adds one more physical 0.0.18 copy and no new version. U5 records `npm ls @orkestrel/contract --omit=dev`.

### Trigger for the move into `@orkestrel/pool`

The layer moves at whichever of these comes first:

- `@orkestrel/probe` ROADMAP item 1 reaching its design round (`probe\ROADMAP.md:5`);
- a second consumer that needs the floor, the watch, the loss, or the bound.

At the trigger, `@orkestrel/pool` gains `min`, `start()`, `watch(value, signal)`, `PoolToken.destroy()`, and a required `restarts`, under V1 to V5. `@orkestrel/browser` re-pins it and deletes the layer's members in the same change, with no shim (`AGENTS.md:66`). That is browser ROADMAP item 15.

### Synthesis fields removed because Pool covers them

The previous synthesis kept these fields (`eager\synthesis.md:304-315`):

- `#slots` is replaced by Pool records holding `BrowserSlot` values.
- `#releasing` is replaced by Pool's destroy barrier (`Pool.ts:170-189`, `:574-587`).
- The per-slot `strikes` field is replaced by pool-wide `#strikes`.
- `#ready` is replaced by `#spares`. This is a re-ruling forced by W6, not a ledger duplicate.
- The `#lost` note string is replaced by `#notice: BrowserSlot | undefined` plus `#lost: WeakMap<BrowserSlot, unknown>`, which repairs attack finding 15.

These fields stay because Pool does not cover them:

- `#lease`, `#spares`, and `#change` (W6, W7);
- `#watches`, an `AbortController` per slot (W2);
- `#survivors` (W4);
- `#strikes` (W5);
- `#failure`, the last cause;
- `#faults`, the toolset and `rm` failures. The hook must not reject for these, because a rejection during a drain withholds the successor (`Pool.ts:393-402`);
- `#starting`, `#sweeping`, `#granting`, `#refill`, `#references`, `#size`, and `#notice`.

### Operation lifecycle: a call a crash interrupts

This follows the operation lifecycle in `reliability-assessment.md:116-122`, `:203-217`, and `:249-267`.

**What the call reports.**

- A call running on a slot that becomes lost reports `BROWSER_SERVER_UNRESOLVED: …`.
- The text says the call was running when its browser was lost, gives the cause, and states that the outcome is unknown: the action might have reached the page or a server before the loss.
- It lists what was lost: the page at the last URL (`src/core/BrowserFrame.ts:84-86`), its tabs, every element reference, the retained reading, dialogs, holds, an unsaved recording, the active replay, and the isolated context's cookies.
- It says that browse did not repeat the call and that the next call runs on a fresh browser at `about:blank`.
- The answer is `isError: true` with that text. It is never the plain CDP or `BROWSER_TOOLSET_ENDED` failure (`src/core/BrowserToolset.ts:2096`).

**Who decides.**

- browse never repeats the call. The agent owns re-execution (`:261-267`).

**How the server knows.**

- `#forward` reads `#lost.has(slot)` for the slot it ran on, after the tool settles. The check is per slot (attack 15).

**What the other codes mean.**

- `BROWSER_SERVER_CRASH: …` is the one-time note for a loss with no call running on the lost browser. Its outcome is known: the call carrying the note ran on a fresh browser.
- A per-call ping that fails is a known outcome too: the call never ran on the hung browser, and it runs on the next lease with the note.
- Distinct codes carry the distinction, because recovery must not parse prose (`:259`).

### `@orkestrel/mcp` 0.0.36: one `handshake` hook, corrected by findings 10 to 14

**Shape.**

- `MCPServerOptions.handshake?: MCPHandshakeHandler`, exposed as `MCPServerInterface.handshake: MCPHandshakeHandler | undefined`, a getter beside `identity` (`mcp\src\core\MCPServer.ts:205`).
- `createMCPLegacy` passes it the way it passes `identity` (`mcp\src\core\factories.ts:88-90`).

**What waits.**

- Only legacy `initialize` (`mcp\src\core\MCPLegacy.ts:140-150`) awaits the hook. It builds `MCPMethodOptions` the way `:196-197` does.
- `ping` (`:151-152`) and every forwarded method stay ungated.
- Modern `server/discover` is not gated, because no 2026-07-28 specification text is on record (finding 13). A modern client meets the onset at its first `tools/call`, which `#forward` gates on setup.

**How a rejection is answered.**

- After the request aborted, the rejection is rethrown. `bindServer` then writes nothing and emits nothing (`mcp\src\core\helpers.ts:1887-1901`; finding 28).
- An `MCPError` is answered under the request id with its `code`, `message`, and `context` as `data` (`mcp\src\core\errors.ts:29-46`).
- Any other rejection emits `error` exactly once on the dispatcher's emitter (`MCPLegacy.ts:69-71`) and answers `-32603` `Server error`.
- Without a hook, every byte of every answer is identical to 0.0.35.

**HTTP sessions (finding 12).**

- `createMCPSession` mints and stores a session for any OK response (`mcp\src\server\middlewares.ts:177-193`, `:215-222`), and legacy errors answer HTTP 200 (`mcp\src\server\inferers.ts:298-300`).
- The middleware mints only when the `initialize` body read from `response.clone()` is a JSON-RPC result. Otherwise it returns the response with no `Mcp-Session-Id`.
- Specification text: the MCP 2025-11-25 Streamable HTTP transport, § Session Management, assigns the session ID "on the HTTP response containing the `InitializeResult`". This lane had no fetch tool, so the quote is unverified here; U1 fetches it and records it in `guides\mcp.md`.

**The remark (finding 14).**

- The sentence added to `JSONRPC_SERVER_ERROR` (`mcp\src\core\constants.ts:297-305`) is limited to the hook: "A `handshake` hook that rejects with an `MCPError` answers the legacy `initialize` with that error's own code and data."

**The test stub (finding 10).**

- U1 owns `mcp\tests\src\core\helpers.test.ts`. The typed stub at `:1464-1481` gains `handshake: real.handshake`, and `npm run check` is on U1's run list.

## Rulings on the brief's questions 1 to 8

**1. Where the launch starts, and what the handshake does meanwhile.**

- **Where.** `start()` is `#starting ??= #setup()`, and it rejects with `#ended()` after `destroy()` began (today's `src/server/BrowserMCPServer.ts:132`; finding 1).
- **Setup order.**
  1. Attach the input `end`, `SIGINT`, and `SIGTERM` listeners.
  2. Call `transport.start()`.
  3. Create `ROOT/.profiles` recursively.
  4. Start the sweep detached. Its promise goes to `#sweeping`, and only `destroy()` awaits it (finding 3).
  5. Call `#replenish()`.
  6. Await `#grant()`.
- **Failure.** Any rejection that is not a close becomes `BrowserError(cause, 'BROWSER_SERVER_UNAVAILABLE')` (finding 2). The message carries only the cause, and `CODE: ` is added once by `#forward`, the handshake, and `main.ts:32` (finding 19).
- **Meanwhile.** `initialize` waits for the first warm, pinged browser (D10). On failure the server behaves per method (finding 18):
  - `initialize` gets `-32000`, the message `BROWSER_SERVER_UNAVAILABLE: <cause>`, and `data: { code }`;
  - `ping` gets `{}`;
  - `tools/list` gets the vocabulary;
  - `tools/call` gets `isError` text that opens `BROWSER_SERVER_UNAVAILABLE:`;
  - `start()` rejects, `main.ts` prints one line and sets exit code 1, and the process exits after its input ends.
- **Client budgets.** Claude Code allows 30 s and connects in the background (`eager\clients.md:18`). Codex allows 10 s (`:19`); M2 reads the onset against it, and D10 documents `startup_timeout_sec` if the onset passes it. Cursor documents no budget (`:20`).

**2. Crash detection.** Each fault has one signal, and none is a poll:

- **Process exit:** `error` then `disconnect` (`Browser.ts:388-420`).
- **Socket drop:** `disconnect` after `BROWSER_TRANSPORT_LOSS_DEFER_MS` (`:441`, `:468-475`).
- **Renderer crash of the current view:** page `crash`. Whether `Inspector.targetCrashed` arrives without `Inspector.enable` is unproved (`src/core/BrowserPage.ts:369`; finding 17), and U8 decides it.
- **A browser that stops answering:** the ping at hand-out and before every call, bounded by the browser's own command deadline (`src/core/CDPClient.ts:134-145`). No timer runs (D10; `AGENTS.md:68`).
- **The server's own teardown is not a fault:** `destroy()` emits `destroy` (`Browser.ts:1156`), and an exit after destroy is ignored (`:389`).

**3. Recovery.**

- **What is rebuilt.** A fresh slot through the owner refill: a process, a `PID-UUID` profile, an isolated context created with the server's reference allocator, a page at `about:blank`, and a started toolset with its journey toolset. The stores reopen on the same root.
- **What is lost.** The list in the operation lifecycle section.
- **How the agent learns.** `BROWSER_SERVER_UNRESOLVED` for a call running on the lost browser, or `BROWSER_SERVER_CRASH` prefixed one time on the next string outcome, success or error text. A non-string value leaves the note pending. A refusal carries and clears a pending note (finding 23).
- **The last address is not restored.** Restoring could repeat side effects, and it is product policy (`AGENTS.md:67`).
- **How a crash loop ends.** `BROWSER_SERVER_RESTARTS` with the V5 rule.
- **Profile cleanup.**
  - `#teardown` removes the profile only after termination is confirmed.
  - The start sweep reclaims folders that dead servers left.
  - `destroy()` removes swept folders whose pid has gone since (finding 4).
  - Bare `.profiles/<uuid>` folders from earlier versions stay in place, and the guide names a one-time removal (D10).

**4. The pool.**

- **States.** Derived; see State machine.
- **Liveness.** Events plus a ping at hand-out and before each call (D10).
- **Work in flight on a browser that dies.** Its CDP requests reject or its toolset ends, and the call answers `BROWSER_SERVER_UNRESOLVED`.
- **The lease.**
  - The holder is the MCP session.
  - It receives one `PoolToken<BrowserSlot>` and keeps it across calls.
  - It ends only by `#lose`. A failed holder ends its input, and `destroy()` runs.
- **Balancing.** Failover only (D10): the oldest spare in `#spares` insertion order goes first. Parallel holders are browser item 14.
- **Second process, not second context.** A context dies with its process (`Browser.ts:196-244`).
- **What a spare serves.** Failover.
- **When each browser starts.** All browsers start at `start()`, concurrently (D8). A successor starts after its predecessor's teardown settles (behavior 4).
- **Idle cost.** M4 measures it.
- **Default size.** 1 (D10).

**5. Placement.**

- **Library:**
  - `Browser.endpoint`, `Browser.ping()`, and the port-probe fix;
  - `BrowserContextOptions.reference`;
  - `probeProcess`, `parseBrowserProfileRecord`, and `BrowserProfileRecord`;
  - `BrowserSlot`, the public plain data type the ruling named (`resource\ruling.md:58`).
- **Server-private:** the layer, the sweep, the handshake mapping, the loss texts, and the per-call ping.
- **Bin:** `BROWSE_POOL`.
- **No eager-off switch.** D1 rules eager start; a host that wants no Chromium does not run `browse`.

**6. Proof.**

- Every D claim is proved against real Chromium in an added `tests/service/browse.test.ts`.
- The recording launcher there wraps `createBrowser` and records each instance's pid, endpoint, connect start, and destroy settlement. It lives in `tests/setupService.ts` with cases in `tests/setupService.test.ts`.
- Crashes are real: `process.kill(pid)`, CDP `Page.crash` from a second client, and `SIGSTOP` on POSIX.
- `src:server` covers the wiring with the launcher double over the real Pool.
- `tests/service/browser.test.ts` keeps one launch per test; a shared test browser is later work.

**7. Tests outside `browse`.**

- No test browser is served in this change.
- `PLAYWRIGHT_WS_ENDPOINT` needs a Playwright `launchServer` browser, which speaks the Playwright protocol, while browse's Chromium speaks CDP only (`eager\map.md:132`, `:138`).
- The `ws-endpoint-probe` found no end-to-end gain for those scripts (`status.md:19`).
- `endpoint` enables a later CDP attach.

**8. Probe.** Five parts carry over:

- the `handshake` hook;
- one setup method and one teardown hook;
- watches driven by events;
- the start sweep of state that dead pids left;
- this layer's members, which move into `@orkestrel/pool` at probe item 1's design round (item 15). A floor of 1 per stage, a watch on the Oxlint client's `exit`, and the deadline recycle as the token's `destroy`.

Pool and probe both pin contract `^0.0.18` (`pool\package.json:72`; `probe\package.json:95`), so probe needs no re-pin to adopt pool.

## Type sketches

### `@orkestrel/pool`: no change in this campaign

```ts
// pool/src/core/types.ts at 0.0.13, used as is
createPool<BrowserSlot>({ create, destroy, validate, max }) // PoolInterface<BrowserSlot>
// used: acquire(), clear(), destroy(), size, active; PoolToken: value, release()

// Sketch of browser ROADMAP item 15, not built here:
// PoolOptions.min?: number                                          <- the floor (#size)
// PoolOptions.restarts?: number                                     <- BROWSER_SERVER_RESTARTS; required with min
// PoolOptions.watch?: (value: T, signal: AbortSignal) => Promise<unknown> <- #watch
// PoolInterface.start(): Promise<void>                              <- #replenish at setup
// PoolToken.destroy(): Promise<void>                                <- #lose of the lease
```

### `@orkestrel/mcp` 0.0.36

```ts
/** Awaits a server's own setup before the legacy `initialize` answers; a rejection refuses it. */
export type MCPHandshakeHandler = (options: MCPMethodOptions) => Promise<void>
// MCPServerOptions.handshake?: MCPHandshakeHandler
// MCPServerInterface.handshake: MCPHandshakeHandler | undefined
// MCPLegacyOptions.handshake?: MCPHandshakeHandler
```

### `@orkestrel/browser`

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
// BrowserCDPOptions remark: with `discover` false the occupied-port probe runs only when `port`
// is set; with `port` unset the launch binds a port the operating system picks and probes nothing.

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

/** Creates each browser a browse server keeps warm, and each attach its start sweep makes. */
export type BrowserLaunchFunction = (options: BrowserOptions) => BrowserInterface

export interface BrowserMCPServerOptions {
	// root, headless, executable, readonly, launch, stdio unchanged
	/** `size`: the browsers kept warm, 1 through `BROWSER_SERVER_POOL_LIMIT`. Default: `BROWSER_SERVER_POOL_SIZE` */
	readonly pool?: { readonly size?: number }
}

export interface BrowserMCPServerInterface {
	/**
	 * Serves stdio, sweeps the profiles ended servers left, warms the pool, and resolves after the
	 * session leases a warm browser; the legacy handshake awaits the same setup. Rejects with
	 * `BROWSER_SERVER_UNAVAILABLE` when no browser can serve, with `BROWSER_TOOLSET_ENDED` after
	 * `destroy()`, and resolves when `destroy()` interrupts setup.
	 */
	start(): Promise<void>
	/** Stops admission and tears down every browser, its toolset, and its profile, then rechecks swept folders. */
	destroy(): Promise<void>
}

// src/core/types.ts
export interface BrowserContextOptions {
	/** Names each element reference the context's pages issue. Default: a counter the context owns. */
	readonly reference?: BrowserReferenceFunction
}
```

These additions complete the browser sketch:

- **Constants** in `src/server/constants.ts`:
  - `BROWSER_SERVER_POOL_SIZE = 1` (D10);
  - `BROWSER_SERVER_POOL_LIMIT = 3` (D6);
  - `BROWSER_SERVER_RESTARTS = 1` (reasoned);
  - `BROWSER_SERVER_RECORD = 'browse.json'`.
- **Helpers** in `src/server/helpers.ts`:
  - `probeProcess(pid): boolean`, which is false only on `ESRCH`;
  - `parseBrowserProfileRecord(text): BrowserProfileRecord | undefined`.
- **Codes:** `BROWSER_SERVER_UNAVAILABLE`, `BROWSER_SERVER_CRASH`, `BROWSER_SERVER_UNRESOLVED`, `BROWSER_SERVER_CEILING`, `BROWSER_SERVER_EXHAUSTED`, `BROWSER_SERVER_TEARDOWN`, and `BROWSER_SERVER_OPTIONS`. `BrowserError` takes any string code (`src/core/errors.ts:13-26`).

## State machine

Every state is derived and none is stored. The derivations are:

- `warming`: an owner acquire's create is in flight.
- `ready`: the token is in `#spares`.
- `leased`: the token is `#lease`.
- `lost`: `#lost.has(slot)`; the token is released and the record is idle or destroying in Pool.
- `gone`: the record has left Pool after its hook resolved.
- `survivor`: the browser is in `#survivors`.

Pool-wide states:

- `exhausted` is `#strikes > BROWSER_SERVER_RESTARTS`.
- `unavailable` means no lease, no spare, and no refill can run: the pool is exhausted, or `k <= 0` with `#refill` undefined.

The following table lists each transition:

| From | Event | To | Action |
| --- | --- | --- | --- |
| (none) | `start()` | warming | setup steps 1 to 6; `#replenish()` issues `k = size` owner acquires |
| warming | the owner receives a token and the slot is not lost | ready | push to `#spares`; resolve `#change` |
| warming | the owner receives a token and the slot is lost | lost | strike; release |
| warming | the create rejects (`create` code) | (none) | strike; set `#failure`; the next step runs if not exhausted |
| warming | `#warm` refuses with `CEILING` | (none) | stop the refill; no strike |
| ready | the hand-out ping resolves, the token is still the head, and the slot is not lost | leased | set `#lease`; `#strikes = 0`; mirror the adopted tools |
| ready | the hand-out ping rejects (not an abort) | lost | forced kill; strike; release; try the next spare |
| ready | the watch settles | lost | strike; release; `#replenish()` |
| leased | the per-call ping rejects (not an abort) | lost | forced kill; set `#notice`; withdraw mirrors; `#strikes = min(#strikes, RESTARTS)`; release; `#replenish()`; the call takes the next lease |
| leased | the watch settles | lost | the same, unforced |
| lost | `clear()` or a refusing `validate` disposes the record, and `#teardown` resolves | gone | Pool deletes the record (`Pool.ts:518`); the next step creates if `k > 0` and not exhausted |
| lost | `#teardown` rejects (termination unconfirmed) | survivor | record in `#survivors`; keep the profile and record; no successor |
| any | `destroy()` | released | abort; wake; await setup; `pool.destroy()`; await the sweep; recheck kept folders; aggregate |

`#teardown(browser, profile, toolset)` runs these steps in order, and every step runs whatever the others do:

1. Abort the slot's watch controller and delete it from `#watches`.
2. `await browser.destroy()`. On rejection, record `#survivors.set(browser, error)`.
3. Destroy the toolset when one exists. A failure goes to `#faults`.
4. Remove the profile with `rm(profile, { recursive: true, force: true, maxRetries: 5 })`, only if step 2 resolved. A failure goes to `#faults`.
5. Rethrow the step 2 failure, if any.

The browser is destroyed before the toolset because an owned destroy closes contexts over CDP first (`Browser.ts:848-850`). The forced kill comes in `#lose`, before the drain. If the exit event wins, the exit handler clears contexts (`:396-406`). If `destroy()` wins, the handler returns at `:389` and destroy's own path fails fast on the closed socket (finding 30).

The sweep runs once, in setup. For each `.profiles` entry whose `parseBrowserLockEntry` pid (`src/server/helpers.ts:59-65`) is not `process.pid` and is not alive:

1. Read the record.
2. If the record's pid is alive, attach with `launch({ cdp: { endpoint }, signal: #abort.signal })`, then `connect()` and `close()`.
3. If `probeProcess(record.pid)` is false, remove the folder. Otherwise keep it in the sweep's result.

A folder with no record is removed, and a failed `rm` keeps it. The sweep never rejects. `destroy()` rechecks each kept folder and removes it when its pid has gone (finding 4).

## Failure table

Each row gives a failure, its signal, the server's action, and what the caller sees:

| # | Failure | Signal | Action | Caller sees |
| --- | --- | --- | --- | --- |
| 1 | Chromium cannot start at setup | `#warm` rejects; the owner acquire rejects with `create` (`Pool.ts:319-329`) | strike; one retry; exhausted with no lease means `start()` rejects | `initialize`: `-32000`, `BROWSER_SERVER_UNAVAILABLE: <cause>`, `data.code`; one stderr line; per-method answers per Q1; exit 1 after the input ends |
| 2 | Root unusable (`ENOTDIR`, `EACCES`) or the `.profiles` read fails | `mkdir` rejects; the sweep keeps the failure | converted to `UNAVAILABLE` (finding 2) | as row 1 |
| 3 | A spare cannot start while the first warms | create rejects | strike, retry, then exhausted with a stderr `EXHAUSTED` line | nothing at onset; the session runs on fewer browsers |
| 4 | A Chrome answers on 9222 | none after U2 | no probe without `cdp.port` | nothing |
| 5 | An idle spare exits | watch | strike; release; `clear()`; successor | nothing |
| 6 | The leased process exits between calls | watch | `#notice`; release; refill | the next call runs on a spare, or waits for the successor at size 1, and opens `BROWSER_SERVER_CRASH:` naming the URL |
| 7 | The leased process exits during a call | watch; pending CDP rejects or the toolset ends | as row 6 | that call: `BROWSER_SERVER_UNRESOLVED:` (outcome unknown, what was lost, not repeated) |
| 8 | The socket drops while the process lives | `disconnect` after the defer (`Browser.ts:441`, `:468-475`) | as rows 6 and 7; `#teardown` terminates the process | as rows 6 and 7 |
| 9 | The current view's renderer crashes | page `crash` on `toolset.view` | as row 6 | as rows 6 and 7 |
| 10 | A background tab crashes | `crash` on another page | none | `tabs` lists it |
| 11 | The leased browser hangs | the per-call ping rejects at the deadline | forced kill; loss; no strike | that call waits one deadline (plus a launch at size 1), then runs with the note |
| 12 | An idle spare hangs | the hand-out ping rejects | forced kill; strike; next spare | the hand-out takes one deadline longer |
| 13 | The current renderer hangs while the browser answers | the call's own CDP deadline | none | that call's CDP timeout text |
| 14 | Termination is unconfirmed (`Browser.ts:1139-1141`) | `#teardown` rejects | survivor; profile kept; no successor (`k` and `CEILING`) | one browser fewer; at size 1, a pending note then `UNAVAILABLE` naming the pid; `destroy()` rejects; an input end gives a stderr `TEARDOWN` line and exit code 1 (finding 5) |
| 15 | Profile `rm` fails past its retries | `rm` rejects | `#faults`; the successor still warms | as the end of row 14; a later sweep removes the folder |
| 16 | The bound is spent while a lease exists | `#strikes > RESTARTS` | stderr `EXHAUSTED` | nothing; the next leased loss still gets one attempt (V5) |
| 17 | Every browser is gone and the bound is spent | hand-out finds nothing | refuse | every call: a pending note, then `UNAVAILABLE` with the last cause |
| 18 | The server is killed | none in process | the next start's sweep attaches, closes, and checks the pid; `destroy()` rechecks | nothing; the orphan runs until then (M6) |
| 19 | Killed between spawn and the record's rename | no record | the sweep removes the folder; a Windows lock refuses it | an orphan might run (Risks) |
| 20 | Input ends, or `SIGINT` or `SIGTERM`, during setup | listeners attached first | `destroy()` aborts launches and `pool.destroy()` runs; `start()` resolves | nothing more; exit 0 |
| 21 | The client's startup timeout passes | the client's own | as row 20 if the client closes the input; whether it does is unverified (U12; finding 29) | the client's own display |
| 22 | Concurrent first calls | shared `#granting` | one lease | every call runs on one browser |
| 23 | Exit, socket loss, and crash overlap | the first settles | the `#lost` guard | one loss, one release, one successor |
| 24 | A browser dies between create and receipt | the refill sees `#lost` | strike; release; the next step drains it | nothing |
| 25 | `destroy()` then `start()` | `#closing` defined | reject `ENDED` before attaching anything | nothing attached, nothing launched (finding 1) |
| 26 | A leftover browser hangs during the sweep | the attach parks | off the handshake path; `destroy()` aborts it | nothing (finding 3) |

## Measurements

**Readings supplied:**

- `status.md:19` (2026-10-03, loaded host, preliminary): an 80.5 ms headless-shell launch, and no end-to-end gain from a warm test browser. It bears on D3 only.
- This lane's static reading of `browser-wt-browse\node_modules` (2026-10-03): the 0.0.18 contract copies under `emitter`, `websocket`, and `router` beside root 0.0.19.

**Readings missing:**

- every timing;
- how clients display a non-version `initialize` error (`eager\clients.md:26-28`);
- whether a client closes the input at its startup timeout;
- whether `Inspector.targetCrashed` arrives without `Inspector.enable`;
- whether `DevToolsActivePort` is written;
- whether Chromium on Windows survives a server killed by `TerminateProcess`;
- the install-size cost of pool's extra contract copy;
- the fetched HTTP session text (U1);
- a failing proof of the unset-port branch without binding 9222 (Tensions).

**Plan.** The case decides every figure, and none is fixed in advance.

- **Host and load:**
  - the target Windows host, plus a Linux host for the POSIX rows;
  - a TypeScript instrument run by Node under `browser-wt-browse\tmp\probes\eager\`, driving `dist/bin/main.js` over stdio;
  - a realistic session against a heavy local page (`navigate`, `look`, `read`, `click`, `type`, `replay`), while the host runs the veneer journey projects at once.
- **Reporting:** distributions over every run, never a lone mean.
- **Control:** onset under load must exceed onset at idle; otherwise the record states that the load was not reached.

The readings to take:

- **M1:** warm-up per slot (the `#warm` duration) for 1, 2, and 3 at once, idle and under load.
- **M2:** spawn to the `initialize` answer, sizes 1 to 3, with and without a leftover browser in the root, read against Codex 10 s and Claude Code 30 s (`eager\clients.md:18-19`). This reading includes W8.
- **M3:** failover, from killing the leased pid to the next successful call, size 1 against size 2. Control: at size 2 the call's endpoint was recorded before the kill; at size 1, after it.
- **M4:** a spare's idle cost: the working set and CPU of its tree (selected by the profile path on Windows, by the process group on POSIX), and the leased call's latency with and without the spare under load.
- **M5:** the per-call ping round trip under load, and confirmation that no healthy call reaches the deadline.
- **M6:** whether Chromium survives a server killed by `TerminateProcess` and by `SIGKILL`.
- **M7:** whether `DevToolsActivePort` appears with the bound port and GUID.
- **M8:** refill launch time after a loss while the session works, against M1.

**Record and decision.** The Orchestrator records the readings with dates in `eager\readings.md`. The user rules D3 from M3 and M4.

## Units

The units are listed in commit order. Writers serialize, and each writes only its owned files. Each stops at its project boundary and reports the commands it ran. Browser commands run in `C:\Users\mikes\WebstormProjects\browser-wt-browse`, and `guides\browser.md` is written by one unit at a time. Every proof uses real implementations, and the service projects use real Chromium.

### U1: `@orkestrel/mcp` 0.0.36 handshake hook

- **Role and engine:** astra (GPT-6 Astra). Repository `C:\Users\mikes\WebstormProjects\mcp`.
- **Owns:** in `src\core\`: `types.ts`, `MCPServer.ts` (the option and the getter only), `MCPLegacy.ts`, `factories.ts`, `constants.ts` (the remark); `src\server\middlewares.ts`; in `tests\src\core\`: `MCPLegacy.test.ts`, `MCPServer.test.ts`, `helpers.test.ts` (the stub), `factories.test.ts`; in `tests\src\server\`: `middlewares.test.ts`, `factories.test.ts`; `guides\mcp.md` (rows, the conformance text, and the fetched HTTP quote); `package.json` at 0.0.36.
- **Depends:** none.
- **Accept** (real `createStdioServer` over `PassThrough` streams and a real `MCPServer`):
  - a. While the hook is pending, `initialize` gets no answer and a later `ping` is answered first. After the hook resolves, the result equals 0.0.35's byte for byte. Fails if `initialize` is answered at once.
  - b. A hook rejecting with `MCPError(msg, -32000, { code })` answers that code, message, and `data` under the id.
  - c. A plain `Error` answers `-32603` `Server error` with exactly one `error` event.
  - d. Without a hook, the whole suite passes unchanged.
  - e. Ending the input while the hook is pending aborts `options.signal`, writes nothing, and emits nothing (finding 28).
  - f. Legacy `tools/list` answers while `initialize` is parked.
  - g. Modern `server/discover` answers at once with a hook pending. Fails if the gate leaks onto the modern path.
  - h. Over HTTP, a refused `initialize` returns no `Mcp-Session-Id` and stores no session, and a resolved hook mints one. Fails without the middleware change.
- **Run:**
  - `npx vitest run --config vite.config.ts --project src:core tests/src/core/MCPLegacy.test.ts tests/src/core/MCPServer.test.ts tests/src/core/helpers.test.ts tests/src/core/factories.test.ts`
  - `npx vitest run --config vite.config.ts --project src:server tests/src/server/middlewares.test.ts tests/src/server/factories.test.ts`
  - `npm run check`, `npm run test:src`, `npm run test:guides`
- **Release:** verifier runs the tree-wide gates. The user publishes from their terminal, and the Orchestrator records the pack integrity.

### U2: `Browser.endpoint`, `Browser.ping`, and the port probe

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:** `src\server\types.ts` (the `BrowserInterface` members and the `BrowserCDPOptions` remark), `src\server\Browser.ts`, `tests\setupServer.ts`, `tests\setupServer.test.ts`, `tests\src\server\Browser.test.ts`, `tests\service\browser.test.ts` (added cases only), and the `guides\browser.md` rows.
- **Spec:**
  - `endpoint` returns `#endpoint`, which is set at `Browser.ts:574` and `:653` and cleared at `:350`, `:406`, `:463`, `:589`, `:672`, and `:1150` (finding 25).
  - `ping` throws `BrowserDestroyedError` after destroy, and `BrowserNotConnectedError` unless the browser is connected with a client. Otherwise it sends `Browser.getVersion` with only the defined `timeout` and `signal` keys (`CDPClient.ts:113-154`).
  - The branch at `Browser.ts:320-322` probes only when `this.#options.cdp?.port !== undefined`.
- **Test infrastructure:**
  - The double gains `endpoint` (undefined).
  - The double gains `ping` over its fixture client, using `options.timeout ?? the double's options.timeout` (finding 7).
  - `BrowserLauncherOptions` gains `silent?: number`, which leaves `Browser.getVersion` unanswered for the first N doubles, and `timeout?: number`, which the launcher writes into each double's options.
  - The fake process answers `Browser.getVersion` and gains `stall`.
- **Accept, `src:server`:**
  - `endpoint` is undefined before connect, a `ws://` URL after it, and undefined after destroy and after the fake pid's kill.
  - `ping` resolves on a live fake; it rejects `BrowserNotConnectedError` before connect and after the kill; it rejects `CDPTimeoutError` with `stall` and a case-chosen timeout; it rejects with the signal's reason on abort.
- **Accept, `service`:**
  - After `connect()`, `endpoint` matches `^ws://127\.0\.0\.1:\d+/devtools/browser/`, that port's `/json/version` answers, and `ping()` resolves.
  - After a kill and `disconnect`, `endpoint` is undefined and `ping()` rejects `BrowserNotConnectedError`.
  - After `destroy()`, the port refuses connections.
  - A `/json/version` fixture on `127.0.0.1` port 0 (finding 16), with `discover: false` and `cdp.port` set to the fixture's port, makes the launch reject naming that port. Fails if the probe is removed.
- **Run:** the two test files, `npm run test:src:server`, `npm run test:setup`, `npm run test:guides`.

### U3: `BrowserContextOptions.reference`

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:** `src\core\types.ts` (the member and its remark), `src\core\BrowserContext.ts`, `tests\src\core\BrowserContext.test.ts`, and the guide row.
- **Depends:** U2, and the item 12 writer's commit when it touches `src\core\types.ts`.
- **Spec (finding 9):**
  - The constructor (`BrowserContext.ts:73-91`) stores `options?.reference` in a private field whose name does not clash with the counter `#reference` (`:71`).
  - `#attach` (`:283-295`) and `#reattach` (`:322-334`) pass that field, or `this.#nextReference.bind(this)` when it is absent.
- **Accept:**
  - Two contexts given one function issue `e1` and then `e2`, without repeats.
  - Without the option, each context starts at `e1` (`:348-350`).
  - Fails if the option is read from `BrowserPageOptions`.
- **Run:** the test file, `npm run test:src:core`, `npm run test:guides`.

### U4: profile helpers

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:** `src\server\types.ts` (`BrowserProfileRecord`), `src\server\helpers.ts`, `src\server\stores\FileBrowserStore.ts` (route the check at `:214-222` through `probeProcess`), `tests\src\server\helpers.test.ts`, and the guide rows.
- **Depends:** U3.
- **Accept:**
  - `probeProcess(process.pid)` is true, and an exited child's pid is false.
  - `parseBrowserProfileRecord` round-trips `JSON.stringify` of a record. It returns undefined for unparsable text, a missing key, a pid that is not a positive safe integer, and an endpoint not starting `ws://`.
  - The store's lock tests stay green.
- **Run:** the test file, `npm run test:src:server`, `npm run test:guides`.

### U5: the `@orkestrel/pool` dependency and ROADMAP item 13

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:** `package.json` (`"@orkestrel/pool": "^0.0.13"`), `package-lock.json`, `guides\pool.md` (a byte-identical mirror of the installed scaffold host guide), the `guides\README.md` dependency row, and `ROADMAP.md` (item 13 from Roadmap texts).
- **Depends:** U4.
- **Accept:**
  - `npm ci --ignore-scripts`, `npm run check`, `npm run test:src`, `npm run test:policy` (mirror identity), and `npm run test:guides` are green.
  - `npm ls @orkestrel/pool --omit=dev` shows one copy at 0.0.13.
  - The output of `npm ls @orkestrel/contract --omit=dev` is recorded in the report.

### U6: re-pin `@orkestrel/mcp`

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:** `package.json` (`^0.0.36` at `:109`), the lockfile, and the `guides\mcp.md` mirror.
- **Depends:** the U1 publish.
- **Accept:**
  - `npm ci --ignore-scripts`, `npm run check`, and `npm run test:src` are green.
  - `npm ls @orkestrel/mcp --omit=dev` shows one copy at 0.0.36. The nested copy under the dev dependency `@orkestrel/probe` is expected (finding 11).

### U7: the eager server on the layer (setup, fill, hand-out, handshake, teardown, sweep)

- **Role and engine:** astra (GPT-6 Astra).
- **Owns:**
  - `src\server\types.ts`: `BrowserSlot`, the server block, and the `BrowserLaunchFunction` doc;
  - `src\server\constants.ts`;
  - `src\server\BrowserMCPServer.ts`;
  - `src\server\factories.ts`: the doc, and the `@example` comment at `:103`, which is false after this change;
  - `tests\src\server\BrowserMCPServer.test.ts`: rewrite the lazy cases at `:34`, `:71`, and `:122`, with no shim;
  - `tests\setupServer.ts` and `tests\setupServer.test.ts`: `hold(from?)` parks connects of doubles at or after a launch index;
  - `tests\setupService.ts` and `tests\setupService.test.ts`: the recording launcher;
  - `tests\service\browse.test.ts` (added);
  - the server rows of `guides\browser.md`.
- **Depends:** U2 to U6.
- **Spec:** Design behaviors 1, 2, 6 (the ceiling refusal), and 7; Q1's setup order; the sweep and record rules; the members and fields in the Design tables. In addition:
  - `createPool` takes `max: #size`.
  - The size must be an integer from 1 through `BROWSER_SERVER_POOL_LIMIT`; any other value throws `BROWSER_SERVER_OPTIONS`.
  - The handshake races `#starting` against `options.signal` and maps a `BrowserError` to `MCPError(`${code}: ${message}`, JSONRPC_SERVER_ERROR, { code })`.
  - `#forward` awaits `#starting`, takes the lease from `#acquire(signal)`, and runs the tool on `slot.toolset`.
  - The record is written as `browse.json.tmp` and renamed, only when `pid` and `endpoint` are both defined (finding 20).
  - `#refill` is cleared in the same synchronous turn as the loop's decision to stop, and the loop's first statement awaits.
  - At a lease change, mirrored dispatchers outside the vocabulary are removed and the leased toolset's adopted tools are mirrored.
  - `#end` calls `destroy()` and handles its rejection: it sets `process.exitCode = 1` and writes one stderr line `browse: BROWSER_SERVER_TEARDOWN: …`.
- **Accept, `src:server`** (doubles over the real Pool):
  - A launch exists before any input is written. Fails if the launch stays lazy.
  - Under `hold()`, `initialize` waits and `ping` answers; after `release()`, `initialize` answers.
  - With size 2 and `hold(1)`, `initialize` answers while the second double is parked (D10).
  - With `failures: 2` and size 1:
    - `initialize` gets `-32000`, the `data.code`, and the fixture text exactly once;
    - `start()` rejects `UNAVAILABLE`, and a `tools/call` answers `BROWSER_SERVER_UNAVAILABLE:`;
    - the launch count is exactly 2, and stays 2 after five more calls. Fails if a call launches (V3) or if retries are unbounded.
  - Sizes 0, 4, 1.5, and -1 throw `BROWSER_SERVER_OPTIONS`.
  - Concurrent first calls run on one double.
  - `destroy()` during a hold resolves `start()` and writes nothing afterward.
  - `destroy()` then `start()` rejects `ENDED`; the listener counts and the `.profiles` listing equal their baseline; no launch is recorded (finding 1).
  - A root under a regular file answers `initialize` `-32000` with `data.code: 'BROWSER_SERVER_UNAVAILABLE'`, and `start()` rejects a `BrowserError` naming `ENOTDIR` (finding 2).
  - After `destroy()`, the `SIGINT`, `SIGTERM`, input `end`, `close`, and `data` listener counts equal their baseline.
  - Two servers in one root: destroying one leaves the other's profiles.
  - Sweep: an exited child's entry with no record is removed; a record with a dead pid is removed; a running child's entry, this pid's entries, and a bare UUID are kept.
  - Sweep negative (finding 27): the record names a running child and an endpoint that refuses, and the folder is kept. The control without the recheck removes it.
  - The handshake does not wait for the sweep (finding 3): a record names a running child and an endpoint served by a fixture that never answers. `initialize` answers while that attach is pending, and `destroy()` aborts it and resolves.
- **Accept, `service`** (real Chromium):
  - `start()` resolves only after a recorded browser is connected, and an `initialize` written earlier is answered after that.
  - `navigate` then `look` run on one pid; at size 2, the other page stays at `about:blank`.
  - After `destroy()`: every recorded pid gives `ESRCH`, every endpoint port refuses, no entry carries this pid's prefix, and the listener counts are at baseline.
  - A missing executable: `start()` rejects naming `ENOENT`, `initialize` gets `-32000`, and no profile is left.
  - Killed server: a child Node script starts a size-1 server from `dist` on a scratch root, prints its browser pid and endpoint, and is killed. A second server's `start()` and `destroy()` then leave that pid at `ESRCH` and its folder gone.
- **Run:** the two test files, `npm run test:src:server`, `npm run test:setup`, `npm run test:guides`.

### U8: liveness, loss, refill bound, survivors, and outcome semantics

- **Role and engine:** astra (GPT-6 Astra).
- **Owns:** `src\server\BrowserMCPServer.ts`, `tests\src\server\BrowserMCPServer.test.ts`, `tests\setupServer.ts` and `tests\setupServer.test.ts`, `tests\service\browse.test.ts`, and the server remarks in `guides\browser.md`.
  - The double gains `kill()`, which emits `disconnect` and sets its status to `disconnected` so `ping` rejects.
  - `BrowserLauncherOptions` gains `survivors?: number`: the first N doubles' `destroy` rejects.
- **Depends:** U7.
- **Spec:** Design behaviors 3, 4, and 5; the operation-lifecycle texts; the transitions; `#teardown`; the stderr `EXHAUSTED` line.
- **Accept, `src:server`:**
  - **Silent spare:** with `silent: 1`, size 2, and a launcher `timeout` the case chooses inside Vitest's 5 s default, the hand-out strikes the silent double, a replacement launches, and the call runs on the other double.
  - **Survivor (V1):** with `survivors: 1` and size 1, `kill()` on the lease launches no successor and keeps that profile. The next call answers the note then `UNAVAILABLE` naming unconfirmed termination. `destroy()` rejects an `AggregateError` containing the failure. Ending the input raises no `unhandledRejection` and sets `process.exitCode` to 1, which the test restores (finding 5). Fails if the refill or `#warm` ignores survivors.
  - **Watch signal (V4):** after a drain and after `pool.destroy()`, the double's `emitter.count('disconnect')` and the context's `count('page')` return to 0. On the failed-warm path, none are added.
  - **Leased loss after an exhausted bound (V5):** size 2. Kill the spare; it is refilled. Kill the spare again; no launch follows. Kill the lease; exactly one launch follows, the call succeeds with the note, and the spare is refilled after the lease grant.
  - **Bound pinned (V2):** size 1, with later launches failing. A lease kill gives exactly 2 failed launches. Fails at 1 or 3.
  - **Spare-kill count (finding 6):** with later launches failing, a spare kill records exactly one failed relaunch, and a lease kill records one more.
  - **Concurrent calls across a fault (finding 15):** a `wait` call runs on double A, then A is killed. A second call runs on B with the note, and the `wait` answers `BROWSER_SERVER_UNRESOLVED:`, not the note and not `ENDED`.
- **Accept, `service`** (real Chromium; size 2 unless stated):
  - **Lease kill:** kill the leased pid after `navigate`. The next call runs on the other pid and opens `BROWSER_SERVER_CRASH:` naming the URL, and the call after it has no note. One replacement is recorded, its connect starts after the predecessor's destroy settled, and two pids are live afterward.
  - **Outcome unknown:** a `navigate` to a fixture route that holds its response, killed mid-call, answers `BROWSER_SERVER_UNRESOLVED:` stating that the outcome is unknown. The fixture records exactly one request for that route. Fails if browse repeats the call.
  - **Renderer crash:** `Page.crash` on the current view puts the note on the next call, and on a background tab gives no note. This decides finding 17; if the case fails, `Inspector.enable` goes in `#enableSession` (`BrowserContext.ts:494-497`) in a core unit after item 12.
  - **Spare kill:** the next call runs on the same pid with no note, and one replacement is recorded.
  - **Stale reference (finding 8):** take `eN` from `look`, kill, `navigate` to the same fixture, `look` again, then click the old `eN`. The click is refused and a click-counting button stays at 0. U3's control without the allocator increments it.
  - **Size 1:** after a kill, the next call waits for the successor and succeeds with the note.
  - **Hang, POSIX only:** `SIGSTOP` on the leased pid, with the browser `timeout` chosen by the case. The next call opens with the note, and the replacement's `launch` is recorded within one deadline measured from the ping's rejection (finding 24). The stopped pid gives `ESRCH`.
  - **Missing executable after start:** a spare kill records one failed relaunch, and a lease kill answers the note then `UNAVAILABLE` naming `ENOENT`.
- **Run:** as for U7.

### U9: the bin and `BROWSE_POOL`

- **Role and engine:** builder (Sonnet 5.5).
- **Owns:** `src\bin\main.ts`, `tests\src\bin\main.test.ts`, the bin cases in `tests\service\browse.test.ts`, and the variable list in the guide.
- **Spec:**
  - `parseInteger` from `@orkestrel/contract`, beside `parseBoolean` (`src/bin/main.ts:1`, `:7`). An empty value counts as unset.
  - A non-integer exits 1 with `BROWSER_SERVER_ENVIRONMENT`. A value out of range surfaces as the constructor's `BROWSER_SERVER_OPTIONS`.
- **Depends:** U8.
- **Accept, `src:bin`:**
  - Missing executable: stdout carries the `-32000` answer; stderr carries exactly one `browse: BROWSER_SERVER_UNAVAILABLE: … ENOENT …` line, with the code token once (finding 19); exit is 1 after the input ends.
  - `BROWSE_POOL=two` exits 1 with `ENVIRONMENT`, and `BROWSE_POOL=4` with `OPTIONS`.
- **Accept, `service`** (built entry): `initialize`, `tools/list`, and `navigate` answer. The end of input gives exit 0 and leaves no profile with the child's prefix.
- **Run:** the test file, the service file, `npm run test:guides`.

### U10: review

- **Role and engine:** reviewer (Opus 5.5), objective lane, not a writer.
- **Scope:** the `#lose`, `#replenish`, and `#grant` interleavings against `Pool.ts`; the `#refill` stop turn; the ceiling; the forced kill; the sweep's deletions; the handshake and HTTP session mapping.
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
  - Record whether each client closes the input at its startup timeout (finding 29).

### U13: measurement

- **Role:** builder writes the instrument; the Orchestrator runs it.
- **Owns:** `tmp\probes\eager\*.ts` and the readings record.
- **Depends:** U11.
- **Accept:** M1 to M8, each with the host, the Chromium version, the load, the date, and every run. No default changes in this unit.

### U14: prose, roadmap, and version

- **Role and engine:** opus (Opus 5.5).
- **Owns:**
  - `guides\browser.md` § Register the browse binary with Claude Code: the eager start, each client's startup budget, `BROWSE_POOL`, the note and the unresolved outcome, the onset refusal, and the one-time removal of bare `.profiles/<uuid>` folders (D10);
  - Codex's `startup_timeout_sec`, only if M2 passes 10 s (D10);
  - the lazy-launch passages of `README.md`;
  - `ROADMAP.md`: remove item 13, then paste items 14 and 15 with their `LINE` placeholders filled from the landed file;
  - `package.json` at 0.0.22.
- **Depends:** U12 and U13.
- **Accept:** `npm run test:guides` and `npm run test:policy` are green, and every behavior sentence maps to a U7, U8, or U9 assertion.

### U15: gates and publish

- **Role:** verifier reruns the U11 gates. The user publishes `@orkestrel/browser` 0.0.22 from their terminal, and the Orchestrator records the pack integrity.

### U16: the probe roadmap sentence

- **Role and engine:** builder (Sonnet 5.5). Repository `C:\Users\mikes\WebstormProjects\probe`.
- **Owns:** `ROADMAP.md`. Append the sentence in Roadmap texts to item 1.
- **Depends:** U15.
- **Accept:** `npm run test:policy` is green.

### Later, outside this release

After the user's D3 ruling, one unit changes `BROWSER_SERVER_POOL_SIZE` and its guide sentence.

### Release order

1. `@orkestrel/mcp` 0.0.36: U1, its gates, then the user publishes.
2. `@orkestrel/browser`: U6 re-pins mcp, U7 to U14 land, U15 gates, then the user publishes 0.0.22.
3. `@orkestrel/pool`: no release. The re-pin is ruled unnecessary.
4. `@orkestrel/probe`: a roadmap text only; no release.

## Roadmap texts

Browser item 13, pasted by U5 and removed by U14. Check the number against the merged main `ROADMAP.md`, whose highest item is 12 (`browser\ROADMAP.md:9`).

```markdown
- **13.** Start `browse`'s browsers at server start and replace one that dies: `start()` (`src/server/BrowserMCPServer.ts:131-139`) serves stdio and launches nothing, the first tool call launches one Chromium (`#open` and `#launch`, `:199-260`), a fulfilled launch stays in `#session` (`:85`, `:199-209`) after its browser exits, and nothing subscribes to the browser's `disconnect` (`src/server/Browser.ts:416-418`), so a crashed browser leaves every later call on a dead page. Declare `@orkestrel/pool` `^0.0.13` and compose one pool of `BrowserSlot` records whose `max` is the size, with a server-private layer that fills a warm floor at start, watches each browser, refills after a loss on the owner's decision within a refill bound, and counts a browser whose termination failed against the size; gate `initialize` on the first warm browser through `@orkestrel/mcp` 0.0.36's `handshake` hook; ping the leased browser at hand-out and before every call; answer a call its browser's loss interrupted with `BROWSER_SERVER_UNRESOLVED` and never repeat it; and reclaim the profiles a killed server left at the next start in the same root. Keep the size at 1 until the user rules on the spare's measured value (D3, D10, 2026-10-03).
```

Browser item 14, pasted by U14. Replace each `LINE` with the landed line number.

```markdown
- **14.** Let `browse` serve a second holder at once: the session holds one lease across calls (`#lease`, `src/server/BrowserMCPServer.ts:LINE`), every other warm browser is a spare that serves failover only (`#spares`, `:LINE`), and a replay runs on the session's browser, so parallel agents, or a replay beside interactive work, share one browser. After the user rules that failover is proven (D10, 2026-10-03), give each holder its own lease from the spares, keep the holders within the configured size, and measure the contention on the target host before raising the default.
```

Browser item 15, pasted by U14.

```markdown
- **15.** Move `browse`'s lifecycle layer into `@orkestrel/pool` when `@orkestrel/probe` ROADMAP item 1 reaches its design round or a second consumer needs the same parts, whichever comes first: `BrowserMCPServer` fills its floor by acquiring for itself and holds every live token (`#replenish`, `#spares`, `src/server/BrowserMCPServer.ts:LINE`), because `@orkestrel/pool` 0.0.13 creates only for a queued waiter and settles waiters in order (that package's `src/core/Pool.ts:263-277`, `:425-444`); it marks a lost browser and releases it for `clear()` to dispose (`:147-160`, `:470-483`); and it counts a browser whose termination failed, because `#clean` frees that capacity (`:518-520`). Expand `@orkestrel/pool` with `min`, `start()`, `watch(value, signal)`, the token's `destroy()`, and a `restarts` bound required with `min`, keeping the resource ruling's V1 to V5; declare that release here; delete `#replenish`, `#watch`, `#lose`, `#spares`, `#change`, `#survivors`, and `#strikes` in the same change; and release this package.
```

The sentence U16 appends to probe item 1 (`probe\ROADMAP.md:5`):

```markdown
Build that replacement on the lifecycle layer `@orkestrel/browser`'s `browse` server composes over `@orkestrel/pool` 0.0.13 (that package's ROADMAP item 15): this item's design round is that layer's trigger to move into `@orkestrel/pool` as `min`, `start()`, `watch(value, signal)`, the token's `destroy()`, and `restarts`, so map each stage onto those members first, with `create` constructing the stage (`src/server/Probe.ts:137-139`), `destroy` calling the stage's own (`:545`), `watch` settling on the Oxlint client's `exit` (`src/server/stages/LintStage.ts:156`), and the deadline recycle (`#recycle`, `src/server/Probe.ts:536-575`) calling the leased token's `destroy`, and write a local loop only for a stage that needs a member the layer lacks.
```

## Finding map

The following table maps each attack finding and each V finding to where this design repairs or rules it:

| Finding | Ruling | Where |
| --- | --- | --- |
| 1 `start()` after `destroy()` | Repaired | Q1 (keeps `:132`); row 25; U7 accept |
| 2 setup errors that are not browser errors | Repaired | Q1 conversion; the sweep never rejects; U7 `ENOTDIR` case |
| 3 the handshake waits for the sweep | Repaired | the sweep is detached in `#sweeping`; `destroy()` aborts its attaches; U7 case; M2 with a leftover |
| 4 the sweep's exit race | Repaired | `destroy()` rechecks kept folders; U7 killed-server case asserts at destroy |
| 5 an unhandled rejection at exit | Repaired | `#end` handles it; rows 14 and 15; U8 case |
| 6 the spare-kill count | Repaired | pool-wide strike rule; U8 case |
| 7 the silent-ping timeout | Repaired | the double's `ping` uses the instance timeout; `BrowserLauncherOptions.timeout` (U2) |
| 8 the stale-reference test | Repaired | U8 navigate-and-click case; U3 control |
| 9 U3 reads the wrong options | Repaired | U3 spec |
| 10 the typed test stub | Repaired | U1 owns `helpers.test.ts` and runs `npm run check` |
| 11 the `npm ls` count | Repaired | U6 uses `--omit=dev` |
| 12 a refused handshake creates an HTTP session | Repaired | U1 middleware; spec quote recorded by U1 |
| 13 the `server/discover` gate cites no text | Repaired | gate dropped; the modern onset is the first `tools/call` |
| 14 the false remark | Repaired | limited to the hook |
| 15 a shared note consumed by another call | Repaired | per-slot `#lost` plus `#notice`; U8 case |
| 16 a fixed port | Repaired | ephemeral fixture; the unset branch goes to Tensions |
| 17 crash detection not evidenced (advisory) | Taken | U8 decides; follow-up enable in core |
| 18 per-method behavior after refusal (advisory) | Taken | Q1 |
| 19 the code token twice (advisory) | Taken | message holds the cause only; U9 case |
| 20 the record-write rule (advisory) | Taken | temp file then rename, only with pid and endpoint |
| 21 `#releasing` not keyed (advisory) | Moot | no such set; Pool owns destroying records |
| 22 a half-built toolset (advisory) | Taken | `#warm` destroys a toolset that failed `start()` through `#teardown` |
| 23 note plus refusal (advisory) | Taken | a refusal carries and clears the note |
| 24 the `SIGSTOP` start point (advisory) | Taken | measured from the ping's rejection |
| 25 the endpoint's clears (advisory) | Taken | U2 doc |
| 26 explicit listener removal (advisory) | Taken | watch signal (V4) |
| 27 the sweep's negative case (advisory) | Taken | U7 |
| 28 case f emits nothing (advisory) | Taken | U1 (e) |
| 29 row 19 not evidenced (advisory) | Taken | row 21; U12 |
| 30 the forced-kill explanation (advisory) | Taken | State machine paragraph |
| 31 the panel scores (advisory) | Taken | dropped from this revision |
| V1 | Required | Design behavior 6; U8 survivor case |
| V2 | Required | the constant; U8 "exactly 2" case |
| V3 | Required | only owner acquires; U7 "calls never launch" case |
| V4 | Required | `#watch(slot, signal)`; U8 listener counts |
| V5 | Required | the `Math.min` rule; U8 breaking-input case |

## Alternatives

Two real alternatives lose to this design:

- **Spares idle in Pool, with the session acquiring through `pool.acquire()` and `validate` as the ping.** This is the drive the brief offered as an example. It loses for three reasons:
  - A hand-out queued behind a refill's waiter waits on the commit barrier (`Pool.ts:425-444`), which removes the failover gain.
  - The pump hands the oldest idle spare to the refill's waiter (`:263-271`).
  - A failed `validate` at the session's hand-out creates for the session's waiter (`:386-408`, `:272-276`), which D7 and V3 forbid.
- **The layer as a separate class (`BrowserReserve<T>`) in `src/server`.** A consumer can construct it from hooks it holds, so the barrel rule makes it public (`architecture.md:284-289`). It would then be published from `@orkestrel/browser` and removed at the move. D12 wants it shaped before it becomes shared API.

The following table rules every other rejected option:

| Rejected option | Reason |
| --- | --- |
| A private ledger with no Pool (the previous synthesis) | D12 composes Pool |
| Expand `@orkestrel/pool` to 0.0.14 now | D12 keeps pool thin in this campaign |
| A pool release that only re-pins contract | Behavior is identical across copies, and the 0.0.18 copies under emitter, websocket, and router stay |
| A create hook that refuses unless the owner granted a permit | Counted permits race FIFO waiters; holding every token removes the need |
| A drain through `validate` alone | It does not dispose a lost record when the bound is spent; `clear()` does (D8) |
| Strikes per slot | Records are anonymous in Pool and in the later member; V5 repairs the pool-wide count |
| Reset strikes on a successful create | A launch-then-die loop would never end |
| A shorter ping deadline | A fixed figure (D5) |
| A scheduled check of idle spares | `AGENTS.md:68`; D10 |
| Gate `server/discover` | No specification text on record (D9; finding 13) |
| Exit right after a refusal | Unbinding drops an unwritten answer (`mcp\src\core\helpers.ts:1887-1888`, `:1913-1919`) |
| Refuse with `-32603` | Detail-free and indistinguishable from containment (`constants.ts:285-295`; `MCPServer.ts:1775-1778`) |
| Answer at once and launch per call | Breaks D1, D4, and D7 |
| Launch in the constructor | Cannot report; breaks `src/server/factories.ts:96` |
| Wait for every browser before answering | D10 rules the first warm browser |
| A second context as the spare | It dies with its process |
| Rebuild only the page after a renderer crash | A second recovery path |
| Restore the last address | Side effects; product policy |
| Repeat an interrupted call | The agent owns re-execution (`reliability-assessment.md:261-267`) |
| Report an interrupted call as a plain failure | Its outcome is unresolved, not failed (`:116-122`) |
| Refuse the next call to deliver the note | Spends a call |
| A one-word code for both note and interruption | Recovery must not parse prose (`:259`) |
| Exit when every browser is gone | Loses the cause; Claude Code does not restart stdio servers (`eager\clients.md:18`) |
| An eager-off switch | D1 |
| A `browsers` or `spares` option | Collides with `BrowserOptions.browsers`; the user stated a size (D6) |
| Binding 9222 in tests | `tests.md:33` |
| `@orkestrel/supervisor` or the `Supervisor` class of `@orkestrel/process` | The user's exclusion (`eager\design-brief.md:8`) |

## Constraints

These code facts bind the design:

- Pool creates only for a waiter and checks capacity as records plus reservations (`pool\src\core\Pool.ts:263-277`, `:284-291`).
- Pool validates only at hand-out (`:293-312`) and pumps the same waiter after an invalid record's cleanup (`:386-408`). A failed cleanup rejects that waiter with `cleanup` (`:393-402`).
- `release` recycles without validation (`:470-483`), and `active` is the lease count (`:97-100`).
- `clear` disposes the idle snapshot (`:147-160`).
- `#clean` frees capacity whether or not the hook failed (`:518-520`).
- The FIFO commit barrier is at `:425-444`, and the teardown barrier at `:170-189` and `:574-587`.
- The token and events are at `pool\src\core\types.ts:35-58`. Pool pins contract `^0.0.18` and emitter `^0.0.11` (`pool\package.json:72-73`).
- Browser pins contract `^0.0.19` and mcp `^0.0.35` (`browser-wt-browse\package.json:105`, `:109`).
- Today, `start()` launches nothing (`src/server/BrowserMCPServer.ts:131-139`), and the first call launches (`:199-260`).
- `main.ts` rethrows anything that is not a `BrowserError` (`src/bin/main.ts:31`) and prints `browse: CODE: message` (`:32`).
- An exit emits `error`, and `disconnect` only while connected (`Browser.ts:388-420`). A transport loss defers before confirming (`:441`, `:468-475`).
- `destroy` closes contexts over CDP before terminating (`:840-872`) and throws after `SIGKILL` (`:1139-1141`). `destroy` returns its shared promise (`:264-274`).
- A CDP timeout rejects only its request (`src/core/CDPClient.ts:134-145`).
- The context's reference counter starts per context (`src/core/BrowserContext.ts:71`, `:348-350`), and options reach the constructor (`:73-91`, `Browser.ts:218-226`).
- A page `crash` carries no payload (`src/core/types.ts:1084`), and no `Inspector.enable` is sent (`BrowserContext.ts:494-497`).
- The double's `pid` is undefined (`tests/setupServer.ts:1568-1570`), and its `destroy` leaves its emitter alive (`:1650-1653`).
- `legacy initialize` is inline (`mcp\src\core\MCPLegacy.ts:140-150`), and `createMCPLegacy` reads from the server (`factories.ts:88-90`).
- The binder writes and emits nothing for an aborted request (`mcp\src\core\helpers.ts:1883-1901`).
- The HTTP session is minted on any OK response (`mcp\src\server\middlewares.ts:177-193`, `:215-222`), and legacy errors answer 200 (`inferers.ts:298-300`).

## Refusals

Each refused option is followed by the rule that forecloses it:

- **A periodic liveness check:** "No polling architecture. Park idle work on events and abort signals." (`AGENTS.md:68`)
- **A stored exhausted or unavailable flag:** "never store a second flag or label that can drift." (`AGENTS.md:58`)
- **Keeping the lazy launch or old tests beside the eager path:** "No compatibility shims. Update every consumer in the same change." (`AGENTS.md:66`)
- **Faking a crash:** "NEVER use mocks, behavioral fakes, module replacement, framework spies, or fake clocks for project-owned behavior." (`AGENTS.md:42`)
- **Closures declared inside the watch:** "Never declare or assign a function inside another function or method." (`architecture.md:173`)
- **A public layer class kept out of the barrel:** "Intern it … when its constructor requires a value only its owner produces" (`architecture.md:286-288`); the layer's constructor would not.
- **A `poolSize` key:** "Never flatten these into prefixed keys." (`names.md:49`)
- **`evict`, `refill`, or `restart` verbs:** "Never introduce synonyms … for these meanings." (`names.md:234`)
- **A fixed test port:** "never to a fixed port" (`tests.md:33`)
- **Adding pool without a request:** "NEVER add an npm package unless the user explicitly requests it" (`AGENTS.md:38`); D11 is the request.

## Tensions

These judgment calls stay open for the other lane or the Orchestrator:

- **The unset-port branch has no failing proof without binding 9222.** Recommended: accept it on review beside the ephemeral-port case. Alternative: the Orchestrator records an exception for one case on `127.0.0.1:9222`.
- **`BrowserSlot` is public with no public signature using it** (subjective). The ruling named it. The alternative is an inline type on the private field, after the precedent at `Pool.ts:42-50`.
- **`BROWSER_SERVER_RESTARTS = 1` is reasoned, not measured.**
- **Two idle spare deaths spend the bound,** even hours apart. With size 1 there is no spare; V5 recovers the lease.
- **The interrupted call answers `isError: true`.** Its text states that the outcome is unknown. A read-only tool gets the same text.
- **The server writes stderr itself** for `EXHAUSTED` and `TEARDOWN`. MCP stdio permits stderr logging, and the server owns the process's stdio. The alternative is an event surface the server lacks.
- **W8:** at sizes 2 and 3, the onset is the FIFO head's launch.
- **The forced kill uses the public `browser.pid`.** A library member is the alternative.
- **The record window** between spawn and rename is open until M7 rules on `DevToolsActivePort`.
- **Concurrent writers:** U3 waits for item 12 when both touch `src/core/types.ts`.

## Risks

The design carries these risks:

- **POSIX orphans** after a server `SIGKILL` live until the next start in the same root. Windows is unmeasured (M6).
- **A hung leftover whose attach fails** is kept until its pid ends.
- **On POSIX, a kill between spawn and rename** lets the sweep delete a live orphan's profile.
- **The real-Chromium hang proof is POSIX only.**
- **`Page.crash` is experimental,** and crash detection might need `Inspector.enable`.
- **Slow hosts** might pass Codex's 10 s default (M2).
- **The pool adds one more physical contract 0.0.18 copy.**
- **The layer's correctness rests on Pool 0.0.13's ordering.** A pool re-pin before item 15 must rerun U7 and U8.
- **With `BROWSE_HEADLESS=false`, each spare opens a window.**
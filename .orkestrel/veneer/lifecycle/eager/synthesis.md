# Ruled design: eager, recovering `browse` on a small private browser pool

**Lane: ruling.** The dispatch names no single lane, so this document rules both the subjective verdict (decisions, laws) and the objective verdict (correctness). It lists the judgment calls still open under Tensions.

## Design

The panel ranked the server proposal first: decisions 7, correctness 5.5, laws 6.5, for 19 in total. The library proposal scored 17.5 and the analyst proposal 14. This design starts from the server proposal and adds every graft that no user decision contradicts.

The design has six parts:

- **Setup has one place: `start()`.** In order, `start()` attaches the end-of-input and signal listeners, starts the stdio transport, and launches every browser of the pool at once. It also runs the profile sweep alongside the launches. It resolves after the session holds a lease on a warm browser.
  - `@orkestrel/mcp` 0.0.36 gains one `handshake` hook. With it, legacy `initialize` and modern `server/discover` wait for that same setup, while `ping` is answered during the wait.
  - When no browser can start, the handshake is refused with `-32000` and `data.code: 'BROWSER_SERVER_UNAVAILABLE'`, and `start()` rejects. The server keeps answering every request with that refusal until its input ends, then exits 1.
- **The pool.** It holds 1 to 3 browsers, set by `pool: { size }` or `BROWSE_POOL`, with a default of 1 until the user rules on D3. It is private to `BrowserMCPServer`.
  - Each incarnation of a browser has its own Chromium process, a `PID-UUID` profile, one isolated context, one page, and one toolset.
  - The MCP session holds one lease across calls. Every other warm browser is a spare.
- **Liveness.**
  - Events report most faults: the browser `disconnect` event covers a process exit and a socket loss, and the page `crash` event covers a crash of the session's current page.
  - Before a browser is handed out, and before every call, the server sends one `ping` (`Browser.getVersion`), bounded by the browser's own command deadline.
  - No timer runs.
- **Faults.** A fault invalidates its incarnation exactly once. If the browser still runs, the server ends the process first, then releases everything that incarnation owns.
  - A successor warms only after that release confirms the browser was destroyed.
  - A fault on an unleased incarnation counts a strike. A second consecutive strike retires the slot, and granting a lease resets the count.
  - A leased fault never strikes. The agent learns of it from that call's text, or from a one-time note at the start of the next result.
- **Teardown has one place.** `#release` is the only code that releases an incarnation, and `destroy()` is built from it. Teardown leaves no process, port, profile, or listener behind. For a server that was killed outright, the next `start()` reclaims what it left: it attaches to the recorded endpoint, closes that browser, confirms the recorded pid is gone, and then removes the directory.
- **Library changes.**
  - `Browser.endpoint` and `Browser.ping()` are added.
  - The port-9222 probe runs only when the caller sets `cdp.port`.
  - `BrowserContextOptions.reference` lets one element-reference allocator span every context the server builds, so a reference from a lost page never matches an element on its replacement.
  - `probeProcess` and `parseBrowserProfileRecord` are added as helpers.
  - `@orkestrel/pool` does not change.

The following table maps each user decision to where the design meets it:

| Decision | Met by |
| --- | --- |
| D1 | `start()` launches every browser; no tool call launches one |
| D2 | `#fault` → `#release` → successor `#warm` |
| D3 | `pool.size` 2 or 3 keeps a full warm spare (process, context, page, toolset); M3 and M4 measure it before it is kept |
| D4 | The handshake waits for setup and refuses a failed setup with a coded error |
| D5 | Every figure comes from a reading (Measurements), except the strike bound, which is reasoned |
| D6 | Fixed size of 1 to 3; the ceiling holds because a successor starts only after its predecessor's release |
| D7 | Owner-decided launches; incarnations tracked by `pid`, `endpoint`, and profile; event-driven liveness plus a `ping` at hand-out and before each call; one recorded session lease; spares warm before work arrives |
| D8 | `#setup` and `#release` are the only places; teardown leaves nothing; the start sweep covers a killed server |
| D9 | One `@orkestrel/mcp` hook, conformant to MCP 2025-11-25, published before the browser re-pins |

### Grafts and how each is ruled

Every graft the judges named is listed in the following table with its ruling:

| Graft | Source | Ruling |
| --- | --- | --- |
| `@orkestrel/mcp` `handshake` hook replaces the unread stdin | all three judges | Taken |
| Refusal `-32000` with `data.code` | all three judges | Taken |
| Endpoint record inside the incarnation's own profile; the sweep attaches and closes before removing | decisions, laws | Taken. The record also holds the browser `pid`, so the sweep confirms termination with one check after the close (correctness #7) |
| Re-warm only after a confirmed release; otherwise keep the profile and retire the slot | decisions, correctness | Taken |
| Run the next call and open its result with a one-time note; the in-flight call fails; the code token goes in the text | decisions, laws | Taken |
| Skip the 9222 probe when `cdp.port` is unset | all three judges | Taken |
| `pool: { size }` 1–3 and `BROWSE_POOL` | decisions | Taken |
| End the process before CDP teardown on a fault | correctness #1 | Taken: a failed `ping` sends `SIGKILL` to `browser.pid` before `browser.destroy()`, and `#release` ends the browser before the toolset |
| Stop admission on a CDP deadline and challenge the page session | correctness #2 | Declined (Alternatives); a renderer-hang row is added to the failure table |
| Reference allocator per MCP connection | correctness #3, laws | Taken |
| One invalidation per life, listeners keyed to the instance | correctness #4 | Taken |
| Classify launch failures | correctness #6 | Declined (Alternatives) |
| After `destroy()`, assert ports refuse and listener counts are back to baseline | correctness #8 | Taken |
| Gate modern `tools/call` on the same setup promise | correctness #9 | Taken: `#forward` awaits `#starting` |
| `formatBrowserLockEntry`, `parseBrowserLockEntry`, and one `probeProcess` | laws | Taken |
| Improve `@orkestrel/pool` and use it | laws | Declined (pool ruling) |

### Pool ruling: private to `BrowserMCPServer`; `@orkestrel/pool` is not used, as it is or improved

Two judges (decisions, correctness) kept the pool in the browser package, and one (laws) asked to improve `@orkestrel/pool` and use it. `.claude/rules/quality.md` § Ecosystem reuse requires a proven semantic difference before keeping a local variant. The following readings of `C:\Users\mikes\WebstormProjects\pool` are that proof:

1. **It creates on demand.** `#pump` creates a record for a waiting acquire whenever nothing is idle and capacity remains (`pool/src/core/Pool.ts:272-276`). Its contract states that `create` "lazily produces resources" (`pool/src/core/types.ts:64-66`), and its guide states it has no warm floor (`scaffold/guides/pool.md:7`). After a loss, the session's next acquire would therefore launch a browser on a caller's demand, which D7 forbids.
2. **A failed teardown frees capacity.** `#clean` deletes the record from `#resources` whether the destroy hook resolved or rejected (`Pool.ts:518-520`), and `#pump` then counts that capacity as free (`Pool.ts:272`). A browser whose termination failed (`src/server/Browser.ts:1139-1141`) would be replaced while it still runs, which breaks the D6 ceiling.
3. **It cannot evict one record.** `clear()` disposes the whole idle snapshot (`Pool.ts:147-160`). `release()` recycles a record without validating it (`Pool.ts:470-483`), and validation runs only at hand-out (`Pool.ts:293-305`). Nothing observes a leased or idle record.
4. **It has no slot identity or holder.** `PoolToken` carries only `value` and `release` (`pool/src/core/types.ts:50-58`), and every event has an empty payload (`types.ts:35-44`). Per-slot strikes, per-slot retirement, and D7's holder cannot be expressed.
5. **The proposed improvement leaves gaps 2 and 4 open.** The laws judge proposed `min`, `start()`, and an `evict` function. A floor without slot identity refills to `min` whichever slot retired, so retiring one slot whose browser survived would still launch past the ceiling. The owner would rebuild slot identity and strikes beside the pool, giving two state machines over one set of browsers. That is the cross-layer race the correctness judge named (`Pool.ts:36`, `293-305`).

Of the mechanics the laws judge listed as duplicated, the private pool keeps two:

- **A wake-up promise (`#change`).** All concurrent calls of one session wait for the same lease, so FIFO order among them has no meaning. The toolset already serializes actions (map.md:64).
- **A barrier over at most three release promises.** This is smaller than the adaptation code the pool package would need.

No public `BrowserPool` class is added: browse is its only consumer (AGENTS.md § Design laws, minimal public API). The first consumer that could justify extracting it is the deferred shared test browser.

The other `@orkestrel/*` packages are ruled on their semantics:

- `@orkestrel/queue`: refused. It adds `database`, `indexeddb`, and `sqlite` to the runtime graph (capabilities.md:309), and one lease needs no job queue.
- `@orkestrel/timeout`: not used, because no aggregate startup deadline is adopted.
- `@orkestrel/abort`: not used. A native `AbortController` already composes with the `Browser` signal (`src/server/Browser.ts:364-369`).
- `@orkestrel/emitter`: not needed, because the server publishes no events.
- `@orkestrel/supervisor` and the `Supervisor` class of `@orkestrel/process`: excluded by the user.

### `@orkestrel/mcp` ruling: one `handshake` hook in 0.0.36, nothing else

The hook works as follows:

- **Shape.** `MCPServerOptions.handshake?: MCPHandshakeHandler`, exposed read-only as `MCPServerInterface.handshake`. `createMCPLegacy` passes it the way it passes `identity` (`mcp/src/core/factories.ts:88-90`; `MCPServer.ts:205-207`).
- **What waits.** Legacy `initialize` (`mcp/src/core/MCPLegacy.ts:140-150`) and modern `server/discover` (`MCPServer.ts:340`, `459-461`) await the hook with the request's `MCPMethodOptions` before they build their result. `ping` (`MCPLegacy.ts:151-152`) never awaits it.
- **Rejection with an `MCPError`.** The request is answered under its own id with `{ code: error.code, message: error.message, data: error.context }` (`mcp/src/core/errors.ts:29-46`).
- **Any other rejection.** The answer is the detail-free `-32603` `Server error`, and the server emits `error` exactly once. That matches the package's existing fault handling (`MCPServer.ts:1775-1777`; `constants.ts:285-295`).
- **Without a hook.** Every answer is byte-identical to 0.0.35.
- **A parked `initialize` does not block `ping`.** `bindServer` runs each inbound line in its own async handler and does not await it per message (`mcp/src/core/helpers.ts:1868-1907`).
- **Cancellation.** The request signal aborts on cancellation, on transport close, and on unbind. An aborted request writes nothing (`helpers.ts:1888`, `1908-1919`).

Every other change the analyst proposed is refused:

- Per-connection initialization state.
- A write-completion observation and a closure signal. These existed only so the server could exit right after answering, and browse instead stays up until its input ends.
- A `logging` capability. The failure travels in the `initialize` answer.

The hook conforms to the MCP 2025-11-25 lifecycle page, as recorded in clients.md:

- The client "SHOULD NOT send requests other than pings before the server has responded" (clients.md:7). Pings can therefore arrive while `initialize` waits, which is why `ping` is never gated.
- An error reply to `initialize` is allowed (clients.md:9).
- Requests carry timeouts, and the sender cancels on expiry (clients.md:11). The wait ends on the request signal.
- JSON-RPC 2.0 § 5.1 reserves `-32000` to `-32099` for implementation-defined server errors.

The unit also edits one remark. The `JSONRPC_SERVER_ERROR` remark (`constants.ts:297-305`) says the code is retained for the legacy branch, so it gains one sentence: a consumer `MCPError` keeps its own code on either branch.

Release order: the user publishes `@orkestrel/mcp` 0.0.36 from their terminal. `@orkestrel/browser` then re-pins `^0.0.36`; a caret on 0.0.x pins the patch.

### Rulings on the brief's questions 1 to 8

**1. Where the launch starts and what the handshake does meanwhile.** The launch starts in `start()`.

- `src/bin/main.ts:22-29` calls `start()` right after parsing the environment.
- A constructor cannot await, and `createBrowserMCPServer` is documented to return a server "that reads nothing until `start()`" (`src/server/factories.ts:96`).
- The transport starts first, so the server answers `ping` and sees the end of its input during setup.
- `initialize` waits for the first lease on a warm browser.
- A failed setup is answered with `-32000`, a message naming the cause, and `data.code`. `start()` rejects, so `main.ts` prints `browse: BROWSER_SERVER_UNAVAILABLE: …` and sets exit code 1 (`src/bin/main.ts:30-34`). Every later request gets the same refusal until the input ends, and then the process exits.
- An exit before answering is rejected: it carries no detail, and how clients display it is unknown (clients.md:28).
- Client budgets differ:
  - Claude Code allows 30 s and connects in the background (clients.md:18).
  - Codex allows 10 s (clients.md:19); M2 measures the onset against it.
  - Cursor documents no budget (clients.md:20).

**2. Crash detection.** Each fault has one signal, and none is a poll:

- **Owned process exit.** `Browser` emits `error` and then `disconnect` (`Browser.ts:388-420`).
- **Socket drop.** The loss is confirmed after `BROWSER_TRANSPORT_LOSS_DEFER_MS` and ends in `disconnect` (`Browser.ts:422-476`).
- **Renderer crash.** The page emits `crash` (`src/core/BrowserPage.ts:368`, `1904-1906`). The server subscribes through the context's `page` event (`src/core/BrowserContext.ts:475-481`) and acts only when the crashed page is `toolset.view` (`src/core/BrowserToolset.ts:360`).
- **A browser that stops answering.** A `ping` before every hand-out and every call detects it, bounded by the browser's command deadline (`src/core/CDPClient.ts:134-145`).
- **The server's own teardown is not a fault.** `destroy()` emits `destroy`, not `disconnect` (`Browser.ts:1144-1158`), and an exit after destroy is ignored (`Browser.ts:389`).

**3. Recovery.**

- **What is rebuilt.** A fresh incarnation: a process, a profile, an isolated context created with the server's reference allocator, a page at `about:blank`, and a toolset with its journey toolset. The journey and run stores reopen on the same root (map.md:69). Mirrored page tools follow the lease.
- **What is lost.** Tabs, the retained reading, element references, dialogs, holds, an unsaved recording, the active replay, and the isolated context's cookies. Because the allocator never reissues a spelling, an old `eN` reference resolves to nothing instead of matching a different element.
- **How the agent learns.**
  - A call in flight on the lost browser fails with `BROWSER_SERVER_CRASH: …`, naming the last address and the losses.
  - After an idle loss, the next string result opens with that text, one time only.
  - The tool layer passes only the message text, so the code token lives in the text (map.md:32).
- **The last address is not restored.** Restoring could repeat side effects or re-crash on the same page, and it would be product policy.
- **How a crash loop ends.** `BROWSER_SERVER_STRIKES` (2) consecutive unleased failures retire the slot.
  - Reason for one retry: a deterministic cause fails its retry. ENOENT fails at spawn, so that retry costs almost nothing. A transient cause, such as a launch deadline missed under load, clears on one retry.
  - A leased fault never strikes, because the agent's own work paces it and the agent sees each one.
  - With every slot retired, each call answers `BROWSER_SERVER_UNAVAILABLE: …` with the last cause. The server stays up, because Claude Code does not restart a stdio server (clients.md:18).
- **Profile cleanup.**
  - `#release` removes each incarnation's profile.
  - The start sweep reclaims directories whose owner pid is dead (Q3 of the following State machine section; failure table rows 16–17).
  - Bare `.profiles/<uuid>` directories from earlier versions are left in place until the user rules (Decision 6).

**4. The pool.**

- **States.** `warming`, `ready`, `leased`, `releasing`, and `retired`, all derived from fields the server already holds (State machine).
- **Liveness.** Events cover every state. Whether a browser answers is checked when it is handed out and before every call. A periodic check is refused, and the user rules on whether to allow one (Decision 2).
- **Work in flight on a browser that dies.** Its CDP requests reject (map.md:83), and the call answers with the loss text instead.
- **The lease.**
  - The holder is the MCP session, the only holder a stdio server has.
  - It receives one incarnation: every call runs on that incarnation's toolset.
  - The lease is granted during setup and again by the first call after a loss.
  - It ends when its incarnation faults, or at `destroy()`. A failed holder ends the session itself: its input ends and `destroy()` runs.
- **Balancing.** A lease goes to the incarnation that has been ready longest, which is the insertion order of `#ready`. With one holder, the other browsers are failover (Decision 1).
- **A second process, not a second context.** `isolate()` creates a context inside the same browser (`Browser.ts:196-244`), so a context dies with its browser's process.
- **What a spare serves.** Instant failover only. Replays run on the session toolset.
- **When each browser starts.** Every browser starts at `start()`, concurrently, because D8 asks for setup as eagerly as possible. A successor starts after its predecessor's release confirms the browser was destroyed.
- **Idle cost.** M4 measures it.

**5. Placement.**

- **In the library:**
  - on `Browser`: `endpoint`, `ping`, and the probe fix;
  - in `src/core`: `BrowserContextOptions.reference`;
  - in `src/server/helpers.ts`: `probeProcess` and `parseBrowserProfileRecord`, with the `BrowserProfileRecord` type.
- **In the server, private:** the pool, the lease, liveness, recovery, the sweep, and teardown. Per-incarnation state lives in private maps keyed by the `BrowserInterface` instance, so no `BrowserSlot` type is exported. Inline field types follow the precedent at `Pool.ts:42-50`.
- **In `src/bin/main.ts`:** `BROWSE_POOL`.
- **No eager-off switch.** D1 fixes eager start. A host that wants no Chromium does not run `browse`.

**6. Proof.**

- Every D-claim is proved against real Chromium in an added `tests/service/browse.test.ts`. A recording launcher wraps `createBrowser` and records each instance with its pid, endpoint, connect start, and destroy settlement. Crashes are real:
  - `process.kill(pid)` causes an exit;
  - CDP `Page.crash` from a second client causes a renderer crash;
  - `SIGSTOP` causes a hang, POSIX only.
- `src:server` uses the existing launcher double for wiring, and the real `Browser` over `createFakeBrowserProcess({ serveCDP: true })` (`tests/setupServer.ts:724-736`) for `ping` and the probe.
- `tests/service/browser.test.ts` keeps one launch per test. A shared browser is a later change.

**7. Tests outside `browse`.**

- No test browser is served in this change.
- `endpoint` enables a later attach over CDP (`connectOverCDP`).
- `PLAYWRIGHT_WS_ENDPOINT` cannot point at a raw CDP browser: `launchServer` owns its Chromium over a pipe and speaks the Playwright protocol (map.md:132, 138).
- The `ws-endpoint-probe` unit settles the facts.

**8. What carries over to probe** (noted only; nothing is designed there):

- the `handshake` hook gating `initialize` on arming;
- one setup method and one release method;
- event-driven faults;
- a start sweep of state that dead pids left;
- strikes reset by use;
- no pool.

### Type sketch

The additions and revisions follow, in `src/server/types.ts` terms. Unlisted members are unchanged.

```ts
// src/server/types.ts
export interface BrowserInterface {
	/**
	 * Reports the CDP WebSocket endpoint of the represented session, or undefined when none is
	 * represented.
	 *
	 * @remarks
	 * A connect sets it, an owned session keeps it across a transport loss, and an observed process
	 * exit and `destroy()` clear it.
	 */
	readonly endpoint: string | undefined
	/**
	 * Sends CDP `Browser.getVersion` and resolves when the browser answers, changing no state.
	 *
	 * @remarks
	 * Rejects with `BrowserDestroyedError` after `destroy()`, with `BrowserNotConnectedError` while no
	 * connection is active, with `CDPTimeoutError` when no answer arrives within `options.timeout` or
	 * the instance `timeout`, and with the signal's reason on abort.
	 */
	ping(options?: BrowserCallOptions): Promise<void>
}
// BrowserCDPOptions `discover` remark: set `false` to launch without discovery; when `port` is set, a
// short probe of that port runs first and rejects naming the occupied port; with `port` unset the
// launch binds a port the operating system picks and probes nothing.

/** Names the browser a browse server's profile serves, which a later start's sweep reads. */
export interface BrowserProfileRecord {
	readonly pid: number
	readonly endpoint: string
}

/** Creates each browser a browse server keeps warm, and each attach its start sweep makes. */
export type BrowserLaunchFunction = (options: BrowserOptions) => BrowserInterface

export interface BrowserMCPServerOptions {
	readonly root?: string
	readonly headless?: boolean
	readonly executable?: string
	readonly readonly?: boolean
	/** `size` — the browsers kept warm, 1 through `BROWSER_SERVER_POOL_LIMIT`. Default: `BROWSER_SERVER_POOL_SIZE` */
	readonly pool?: { readonly size?: number }
	readonly launch?: BrowserLaunchFunction
	readonly stdio?: StdioServerOptions
}

export interface BrowserMCPServerInterface {
	/**
	 * Serves stdio, sweeps the profiles ended servers left under the root, launches every browser of
	 * the pool, and resolves after the session leases a warm one; the protocol handshake awaits the
	 * same setup. Rejects with `BROWSER_SERVER_UNAVAILABLE` when no browser can start; resolves when
	 * `destroy()` interrupts setup.
	 */
	start(): Promise<void>
	/** Stops admission and releases every browser of the pool: its process, its toolset, and its profile. */
	destroy(): Promise<void>
}

// src/core/types.ts
export interface BrowserContextOptions {
	/** Names each element reference the context's pages issue. Default: a counter the context owns. */
	readonly reference?: BrowserReferenceFunction
}

// @orkestrel/mcp 0.0.36 — src/core/types.ts
/** Awaits a server's own setup before a handshake answers; a rejection refuses the handshake. */
export type MCPHandshakeHandler = (options: MCPMethodOptions) => Promise<void>
// MCPServerOptions.handshake?: MCPHandshakeHandler
// MCPServerInterface.handshake: MCPHandshakeHandler | undefined
// MCPLegacyOptions.handshake?: MCPHandshakeHandler
```

The remaining additions are constants, helpers, error codes, and private state:

- **Constants** in `src/server/constants.ts`:
  - `BROWSER_SERVER_POOL_SIZE = 1` (the default until the D3 ruling);
  - `BROWSER_SERVER_POOL_LIMIT = 3` (D6);
  - `BROWSER_SERVER_STRIKES = 2`;
  - `BROWSER_SERVER_RECORD = 'browse.json'` (the record file inside each profile).
- **Helpers** in `src/server/helpers.ts`:
  - `probeProcess(pid): boolean`, which is false only when `process.kill(pid, 0)` throws `ESRCH`. `FileBrowserStore.ts:217-222` routes through it.
  - `parseBrowserProfileRecord(text): BrowserProfileRecord | undefined`.
- **Error codes:** `BROWSER_SERVER_CRASH`, `BROWSER_SERVER_UNAVAILABLE`, and `BROWSER_SERVER_OPTIONS`.
- **`@orkestrel/pool`:** no change.
- **Private state of `BrowserMCPServer`.** It removes `#session`, `#browser`, `#profile`, and `#started` (`BrowserMCPServer.ts:85-88`). It adds:
  - `#size: number`;
  - `#slots: Map<BrowserInterface, { profile: string; toolset: Promise<BrowserToolsetInterface>; strikes: number }>`, the live incarnations;
  - `#ready: Map<BrowserInterface, BrowserToolsetInterface>`, warm incarnations whose insertion order is the time each became ready;
  - `#lease: BrowserInterface | undefined`;
  - `#releasing: Set<Promise<void>>`;
  - `#change: PromiseWithResolvers<void>`;
  - `#starting: Promise<void> | undefined`;
  - `#failure: unknown`, the last cause;
  - `#faults: unknown[]`, release failures kept for `destroy()`;
  - `#lost: string | undefined`, the pending note;
  - `#references: number`, the allocator's counter.
- **The closing check.** `#abort.signal.aborted` serves as the closing check inside `#fault`, because `#destroy()` aborts synchronously before `#closing` is assigned.

### State machine

The state of one slot lineage is derived from server fields and never stored. The derivation is:

- `warming`: the browser is in `#slots` and not in `#ready`.
- `ready`: it is in `#ready` and is not `#lease`.
- `leased`: it is `#lease`.
- `releasing`: its release is in `#releasing`.
- `retired`: no successor exists.
- The server is unavailable when `#slots.size === 0 && #releasing.size === 0`.

The following table lists each transition:

| From | Event | To | Action |
| --- | --- | --- | --- |
| (none) | `start()` | warming | `#warm(0)` for each of `size` slots: name the `PID-UUID` profile, call `launch`, then build: exclusive `mkdir`, attach `disconnect`, `connect`, write the record, `isolate({ reference })`, attach the context `page` listener, `create`, toolset `start` |
| warming | build resolves, the browser is still in `#slots`, `status === 'connected'` | ready | add to `#ready`; wake |
| warming | build rejects, `disconnect`, or current-page `crash` | releasing | strike; `#release` |
| ready | `#acquire` with no lease: longest-ready candidate answers `ping` | leased | set `#lease`; mirror its tools; the lineage's strikes reset |
| ready | hand-out `ping` rejects (not an abort) | releasing | strike; forced `#release`; try the next ready candidate |
| ready | `disconnect` or current-page `crash` | releasing | strike; `#release` |
| leased | per-call `ping` rejects (not an abort) | releasing | end the lease; set `#lost`; withdraw mirrored dispatchers; forced `#release`; no strike |
| leased | `disconnect` or current-page `crash` | releasing | the same, with an unforced `#release` |
| releasing | `browser.destroy()` resolved, strikes < `BROWSER_SERVER_STRIKES`, not closing | warming | `#warm(strikes)` (the successor) |
| releasing | `browser.destroy()` resolved, strikes at the bound | retired | `#failure` holds the cause |
| releasing | `browser.destroy()` rejected (termination unconfirmed) | retired | keep the profile and record; push to `#faults` |
| any | `destroy()` | released | abort; wake; await setup; `#release` every live slot; await `#releasing`; aggregate `#faults` |

The steps of `#release(browser, forced)` run in this order:

1. When `forced` is set and the browser still reports `connected` with a pid, send `SIGKILL` to `browser.pid`, ignoring `ESRCH`. Browser's exit path then clears its contexts and client and drains the group (`Browser.ts:388-420`, `1124-1142`).
2. `await browser.destroy()`.
3. Destroy the build's toolset, if one was built.
4. `rm(profile, { recursive: true, force: true, maxRetries: 5 })`, only when step 2 resolved.

Every step runs whatever the others do. Failures from steps 3 and 4 go to `#faults`. Only a step 2 rejection rejects the release.

The browser is released before the toolset because on an owned launch `Browser.destroy()` closes contexts over CDP before it terminates the process (`Browser.ts:848-856`, `951-958`). A toolset teardown against a hung browser would wait through command deadlines; ending the browser first rejects pending CDP calls at once.

The sweep runs only in `#setup`, concurrently with the launches. For each `.profiles` entry that `parseBrowserLockEntry` accepts (`helpers.ts:59-65`), whose pid is not `process.pid`, and for which `probeProcess(pid)` is false, it does the following:

1. Read the record.
2. If the record's pid answers `probeProcess`, attach through `launch({ cdp: { endpoint }, signal })` and `close()` it. The GUID in the endpoint path refuses a different browser on a reused port.
3. Check `probeProcess(record.pid)` once more. If the pid is still alive, keep the directory for a later start; otherwise `rm` it.
4. A directory with no record is removed, and a failed `rm` leaves it for the next start.

### Failure table

Each row gives a failure, its signal, the server's action, and what the caller sees:

| Failure | Signal | Action | Caller sees |
| --- | --- | --- | --- |
| 1. Chromium cannot start (missing executable, sandbox refusal, unwritable profile, launch deadline) | the build rejects (`Browser.ts:616-620`, `744-750`, `769-773`) | strike, release, retry once, retire; every slot retired before a lease makes `start()` reject | `initialize`: `-32000`, cause in the message, `data.code: 'BROWSER_SERVER_UNAVAILABLE'`; stderr line; later requests get the same refusal; exit 1 after the input ends |
| 2. A spare cannot start while another browser warms | the same | the spare retires after its retry | nothing at onset (Decision 3) |
| 3. A user's Chrome answers on 9222 | none after unit U2 | no probe without `cdp.port` | nothing |
| 4. An idle spare's process exits | `disconnect` | strike, release, successor or retire | nothing |
| 5. The leased process exits between calls | `disconnect` | end the lease, set the note, release, successor | the next call runs on the spare (or after the successor warms, with size 1) and opens with `BROWSER_SERVER_CRASH: …` naming the last address |
| 6. The leased process exits during a call | `disconnect`; pending CDP rejects | the same | that call answers `BROWSER_SERVER_CRASH: …` instead of the CDP message |
| 7. Socket drops while the process lives | `disconnect` after the defer (`Browser.ts:441`, `468-475`) | the same; `destroy()` terminates the process, and the contexts are already cleared (`Browser.ts:452-467`) | the same as row 5 or row 6 |
| 8. The current page's renderer crashes | page `crash`, page equal to `toolset.view` | the same as an exit | the same as row 5 or row 6 |
| 9. A background tab's renderer crashes | page `crash` on another page | none | `tabs` lists it; commands on it fail with their own text |
| 10. The leased browser hangs | the per-call `ping` rejects at the command deadline | forced release (`SIGKILL` first), successor; no strike | that call waits one deadline, then runs on the next lease with the note |
| 11. An idle spare hangs | the hand-out `ping` rejects | strike, forced release; try the next ready browser | that hand-out takes one deadline longer |
| 12. The current page's renderer hangs while the browser answers | the call's own CDP deadline | none | that call returns its CDP timeout text (Tensions, Risks) |
| 13. Termination is unconfirmed (`Browser.ts:1139-1141`) | `browser.destroy()` rejects | keep the profile and record; no successor; push the failure | one browser fewer; `destroy()` rejects with an `AggregateError` |
| 14. Profile `rm` fails (Windows lock past the retries) | `rm` rejects | push the failure; the successor still warms | nothing; a later sweep removes the directory |
| 15. Every slot is retired mid-session | the last retirement | no lease | every call: `BROWSER_SERVER_UNAVAILABLE: …` with the last cause, after a pending note |
| 16. The server is killed (`SIGKILL`, `TerminateProcess`) | none in-process | the next `start()` sweep: attach, close, confirm the pid is gone, `rm` | nothing; the orphan runs until then (Decision 5, M6) |
| 17. The server is killed between spawn and the record write | no record | the sweep removes the directory; on Windows a live lock refuses the `rm` | an orphan might keep running (Risks) |
| 18. Input ends, or `SIGINT`/`SIGTERM` arrives, during setup | listeners attached first | `destroy()` aborts launches through the `Browser` signal; `start()` resolves | nothing further is written; exit 0 |
| 19. The client's startup timeout passes during setup | the client closes the input | the same as row 18 | the client's own timeout display |
| 20. Concurrent first calls | `#acquire` | the first to grant the lease wins; the others loop and ping that lease | every call runs on one browser |
| 21. An exit, a socket close, and a crash overlap on one incarnation | the first event invalidates it | the later events find it absent from `#slots` | exactly one release and one successor |

## Measurements

**Readings supplied:** none from a live run. map.md:3 is a static read, and clients.md:3 records fetched documentation only.

**Readings missing:**

- every timing and cost;
- how clients display a non-version `initialize` error (clients.md:26–28; settled by unit U11);
- whether a target client pings before the `initialize` answer;
- the parameters of `Inspector.targetCrashed` (map.md:144);
- whether `navigate` recovers a hung renderer;
- whether Chromium writes `DevToolsActivePort` under `--remote-debugging-port=0` with `--user-data-dir`.

**Load case.** The case decides the figures; none is fixed in advance.

- The target Windows host, plus a Linux host for the POSIX-only rows.
- A TypeScript instrument run by Node under the browser checkout's `tmp/probes/eager/` drives the built `dist/bin/main.js` over stdio.
- It loops a realistic session against a heavy local page: `navigate`, `look`, `read`, `click`, `type`, and `replay` of a saved journey.
- Meanwhile the host runs its own heavy work: the veneer journey projects at once.
- Every run is reported, as distributions and never a lone mean.
- **Control:** onset under load must exceed onset at idle. Otherwise the record states that the load was not reached.

**Readings to take:**

- **M1:** warm-up per incarnation (launch to toolset started) with 1, 2, and 3 browsers warming at once, idle and under load.
- **M2:** spawn to the `initialize` answer for sizes 1, 2, and 3, read against the Codex 10 s and Claude Code 30 s defaults (clients.md:18-19). This also shows whether concurrent warm-up delays the first lease.
- **M3:** failover time, from killing the leased pid to the next successful call, for size 1 and size 2.
  - **Control:** with size 2, the session page must live on an endpoint recorded before the kill; with size 1, on one recorded after it.
- **M4:** the idle cost of a spare: working set and CPU of its process tree, plus the leased browser's call latency with and without the spare under load. On Windows, select processes by the profile path on their command line; on POSIX, by the process group.
- **M5:** the per-call `ping` round trip under load, and confirmation that no healthy call reaches the deadline.
- **M6:** whether Chromium survives the server ended by `TerminateProcess` (Windows) and by `SIGKILL` (POSIX).
- **M7:** whether `DevToolsActivePort` appears in the profile with the bound port and browser GUID (Tensions).

**Record and decision.** The Orchestrator records the readings with dates in `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\eager\readings.md`. The user rules on D3 from M3 and M4.

## Units

The writers serialize. Each unit writes only the files it owns, stops at its project boundary, and reports the commands it ran. Browser-repo commands run in `C:\Users\mikes\WebstormProjects\browser-wt-browse`, and `guides/browser.md` is written by one unit at a time. Units U2 to U4 do not depend on the `@orkestrel/mcp` publish.

1. **U1: `@orkestrel/mcp` 0.0.36 handshake hook.**
   - **Role / engine:** astra (GPT-6 Astra); repository `C:\Users\mikes\WebstormProjects\mcp`.
   - **Owns:** `src/core/types.ts`, `src/core/MCPServer.ts` (getter beside `identity`; gate on `server/discover`), `src/core/MCPLegacy.ts` (gate on `initialize`, method options built as at `MCPLegacy.ts:196-197`), `src/core/factories.ts`, `src/core/constants.ts` (the `JSONRPC_SERVER_ERROR` remark), `tests/src/core/MCPLegacy.test.ts`, `tests/src/core/MCPServer.test.ts`, `tests/src/server/factories.test.ts`, `guides/mcp.md`, and `package.json` at 0.0.36.
   - **Depends:** none.
   - **Accept** (real `createStdioServer` over `PassThrough` streams, real `MCPServer`):
     - (a) While the hook is pending, `initialize` gets no answer and a later `ping` is answered first. After the hook resolves, the result equals 0.0.35's byte for byte.
     - (b) A hook rejecting with `MCPError(msg, -32000, { code })` produces that error under the request id.
     - (c) A plain `Error` produces `-32603` `Server error` and exactly one `error` event.
     - (d) Without a hook, the whole suite is unchanged.
     - (e) Modern `server/discover` is gated as in (a) and (b).
     - (f) Ending the input while the hook is pending aborts `options.signal` and writes nothing.
     - (g) Legacy `tools/list` answers while `initialize` is parked.
   - **Run:** `npx vitest run --config vite.config.ts --project src:core tests/src/core/MCPLegacy.test.ts tests/src/core/MCPServer.test.ts`, `npx vitest run --config vite.config.ts --project src:server tests/src/server/factories.test.ts`, `npm run test:src`, `npm run test:guides`.
   - **Release:** verifier runs the tree-wide gates; the user publishes from their terminal; the Orchestrator records the pack integrity.

2. **U2: `Browser.endpoint`, `Browser.ping`, and the port probe.**
   - **Role / engine:** builder (Sonnet 5.5).
   - **Owns:** `src/server/types.ts` (`BrowserInterface` and the `BrowserCDPOptions` remark), `src/server/Browser.ts`, `tests/setupServer.ts`, `tests/src/server/Browser.test.ts`, `tests/service/browser.test.ts` (added cases only), and the `guides/browser.md` rows for those types.
   - **Test infrastructure changes in `tests/setupServer.ts`:**
     - `BrowserLaunchDouble.endpoint` returns `undefined`.
     - `BrowserLaunchDouble.ping` sends `Browser.getVersion` over its fixture client under `options.timeout`.
     - `BrowserLauncherOptions` gains `silent?: number`: the first N doubles leave that method unanswered.
     - The fake process answers `Browser.getVersion` and gains a `stall` control, which stops answering and keeps the socket open.
   - **Spec:**
     - `endpoint` returns `#endpoint`, which is set at `Browser.ts:574` and `653` and cleared at `406`, `463`, and `1150`.
     - `ping` throws `BrowserDestroyedError` after destroy, and `BrowserNotConnectedError` unless the browser is `connected` with a client. Otherwise it calls `client.send('Browser.getVersion', undefined, …)` with only the `timeout` and `signal` keys that are defined.
     - The `discover === false` branch (`Browser.ts:320-322`) calls `#assertPortFree` only when `this.#options.cdp?.port !== undefined`.
   - **Depends:** none.
   - **Accept, `src:server`** (real `Browser` over the fake process):
     - `endpoint` is undefined before `connect`, a `ws://` URL after it, and undefined again after `destroy` and after the fake's pid is killed.
     - `ping` resolves on a live fake; it rejects `BrowserNotConnectedError` before connect and after the kill; with `stall` and a timeout the case chooses, it rejects `CDPTimeoutError`; on abort it rejects with the signal's reason.
   - **Accept, `service`** (real Chromium):
     - After `connect()`, `endpoint` matches `^ws://127\.0\.0\.1:\d+/devtools/browser/` and that port's `/json/version` answers 200. `ping()` resolves.
     - After `process.kill(pid)` and the `disconnect` event, `endpoint` is undefined and `ping()` rejects `BrowserNotConnectedError`.
     - After `destroy()`, the port refuses connections.
     - With a `/json/version` fixture bound on 127.0.0.1:9222 (the case fails loudly when the port is taken), `discover: false` without a port launches and the fixture records no request. With `cdp.port: 9222`, the launch rejects naming the occupied port.
   - **Run:** `npx vitest run --config vite.config.ts --project src:server tests/src/server/Browser.test.ts`, `npx vitest run --config vite.config.ts --project service tests/service/browser.test.ts`, `npm run test:src:server`, `npm run test:guides`.

3. **U3: `BrowserContextOptions.reference`.**
   - **Role / engine:** builder (Sonnet 5.5).
   - **Owns:** `src/core/types.ts` (the `BrowserContextOptions` member and remark), `src/core/BrowserContext.ts` (lines 293 and 332 pass `options?.reference` when it is present, otherwise `this.#nextReference.bind(this)`), `tests/src/core/BrowserContext.test.ts`, and the `guides/browser.md` row.
   - **Must not touch:** `BrowserToolset.ts`, `constants.ts`, `helpers.ts`, or `BrowserReading.ts` (another writer's files).
   - **Depends:** U2 (the guide is written serially).
   - **Accept:**
     - Two contexts given one function issue `e1` and `e2`, then `e3` onward.
     - Without the option, each context starts at `e1`, as at `BrowserContext.ts:348-350`.
   - **Run:** `npx vitest run --config vite.config.ts --project src:core tests/src/core/BrowserContext.test.ts`, `npm run test:src:core`, `npm run test:guides`.

4. **U4: Profile helpers.**
   - **Role / engine:** builder (Sonnet 5.5).
   - **Owns:** `src/server/types.ts` (`BrowserProfileRecord`), `src/server/helpers.ts`, `src/server/stores/FileBrowserStore.ts` (lines 217-222 through `probeProcess`), `tests/src/server/helpers.test.ts`, and `guides/browser.md` rows.
   - **Depends:** U3.
   - **Accept:**
     - `probeProcess(process.pid)` is true, and an exited child's pid is false.
     - `parseBrowserProfileRecord` round-trips `JSON.stringify` of a record. It returns undefined for unparsable text, a missing key, a pid that is not a positive safe integer, and an endpoint not starting with `ws://`.
     - The `FileBrowserStore` lock tests stay green.
   - **Run:** `npx vitest run --config vite.config.ts --project src:server tests/src/server/helpers.test.ts`, `npm run test:src:server`, `npm run test:guides`.

5. **U5: Re-pin `@orkestrel/mcp`.**
   - **Role / engine:** builder (Sonnet 5.5).
   - **Owns:** `package.json` (`@orkestrel/mcp` `^0.0.36`, `package.json:109`), the lockfile, and a refreshed mirror at `guides/mcp.md`.
   - **Depends:** the U1 publish.
   - **Accept:** `npm ci --ignore-scripts`, `npm run check`, and `npm run test:src` are green, and `npm ls @orkestrel/mcp` shows one copy at 0.0.36.

6. **U6: Eager pool: setup, lease, teardown, sweep, and handshake.**
   - **Role / engine:** astra (GPT-6 Astra).
   - **Owns:** `src/server/types.ts` (the server block), `src/server/constants.ts`, `src/server/BrowserMCPServer.ts`, `src/server/factories.ts` (the doc), `tests/src/server/BrowserMCPServer.test.ts`, `tests/setupServer.ts` (`BrowserLauncherOptions.survivors?: number`: the first N doubles' `destroy` rejects), `tests/service/browse.test.ts` (added), and `guides/browser.md` (server rows).
   - **Depends:** U2, U3, U4, U5.
   - **Spec:**
     - The constructor validates `pool.size` as an integer from 1 through `BROWSER_SERVER_POOL_LIMIT`; any other value throws `BrowserError` with `BROWSER_SERVER_OPTIONS`.
     - `createMCPServer` receives `handshake: this.#handshake.bind(this)`. The handshake awaits `#starting` and maps a `BrowserError` rejection to `new MCPError(message, JSONRPC_SERVER_ERROR, { code })`.
     - `start()` is `#starting ??= #setup()`.
     - `#setup` runs in this order:
       1. attach the input `end`, `SIGINT`, and `SIGTERM` listeners;
       2. `transport.start()`;
       3. `mkdir(ROOT/.profiles, { recursive: true })`;
       4. `#warm(0)` × `size`, concurrently with `#sweep()`;
       5. `await #acquire(#abort.signal)` and await the sweep.

       If closing, it resolves; when every slot has retired, it rejects `BROWSER_SERVER_UNAVAILABLE` with the cause in the message.
     - `#acquire` follows the rule in State machine. It creates the first lease and mirrors existing and future adopted tools (`BrowserMCPServer.ts:262-290`).
     - `#forward`:
       1. awaits `#starting` (a rejection throws the unavailable text);
       2. `#acquire(signal)`;
       3. runs the tool on `#ready.get(lease)`.
     - The reference allocator is a private method formatting `BROWSER_REFERENCE_PREFIX` plus `++#references`, bound once and passed to `isolate`.
     - `#destroy` keeps its listener and dispatcher removal (`BrowserMCPServer.ts:147-153`), aborts, wakes, awaits `#starting`, releases every live slot, awaits `#releasing`, and aggregates.
   - **Accept, `src:server`** (launcher doubles):
     - A launch exists before any input.
     - While `launcher.hold()` holds, `initialize` waits and `ping` is answered; after `release()`, `initialize` answers.
     - With `failures` equal to 2 × size: `initialize` gets `-32000` with `data.code` and the fixture text; `start()` rejects `BROWSER_SERVER_UNAVAILABLE`; a later `tools/call` answers `isError` text starting `BROWSER_SERVER_UNAVAILABLE:`; the launch count stays at 2 × size.
     - `size` 0, 4, 1.5, and -1 throw `BROWSER_SERVER_OPTIONS`.
     - Concurrent first calls run on one double.
     - `destroy()` during a hold resolves `start()` and writes nothing afterward.
     - After `destroy()`, the `SIGINT`, `SIGTERM`, input `end`, `close`, and `data` listener counts equal their values before `start()`.
     - Two servers in one process: destroying one leaves the other's profiles.
     - Sweep: an exited child's `PID-UUID` with no record is removed; with a record whose pid is dead, it is removed; a running child's entry, this pid's entries, and a bare `UUID` entry are kept.
   - **Accept, `service`** (real Chromium, recording launcher):
     - `start()` resolves only after a recorded browser reports `connected`, and an `initialize` written earlier is answered after that.
     - `navigate` then `look` run on one pid; with size 2 the other page stays at `about:blank`.
     - After `destroy()`: every recorded pid gives `ESRCH`; every recorded endpoint port refuses connections; no entry carries this pid's prefix; listener counts are at baseline.
     - A missing executable: `start()` rejects with the ENOENT cause, `initialize` is answered `-32000`, and no profile is left.
     - A child Node script starts a size-1 server from `dist` on a scratch root, prints its browser pid and endpoint, and is killed. A second server's `start()` then leaves that pid at `ESRCH` (when it was alive before) and removes the directory.
   - **Run:** `npx vitest run --config vite.config.ts --project src:server tests/src/server/BrowserMCPServer.test.ts`, `npx vitest run --config vite.config.ts --project service tests/service/browse.test.ts`, `npm run test:src:server`, `npm run test:guides`.

7. **U7: Liveness and recovery.**
   - **Role / engine:** astra (GPT-6 Astra).
   - **Owns:** `src/server/BrowserMCPServer.ts`, `tests/src/server/BrowserMCPServer.test.ts`, `tests/service/browse.test.ts`, and `guides/browser.md` (server remarks).
   - **Depends:** U6.
   - **Spec:**
     - `#fault(browser, cause, forced)` runs as in State machine, guarded by `#slots.has(browser)` and `#abort.signal.aborted`.
     - `#crash` faults only when the crashed page is `#ready.get(browser)?.view`.
     - The note is `BROWSER_SERVER_CRASH: ` plus a description of the last address (`toolset.view.url`, which stays readable after death: `src/core/BrowserFrame.ts:84-85`) and of the losses.
     - A call whose browser was lost during it throws the note and clears it. A later call with a string result prefixes the note and a blank line, then clears it; a value that is not a string leaves the note pending.
   - **Accept, `service`** (real Chromium, size 2 unless stated):
     - Kill the leased pid after `navigate` to a local page. The next call succeeds on the other pid, its text opens `BROWSER_SERVER_CRASH:` naming the URL, and the call after it has no note. One replacement is recorded, its `connect()` starts after the predecessor's `destroy()` settled, and two pids are live afterward.
     - A pending `wait` answers the loss text when its browser is killed.
     - `Page.crash` on the current page puts the note on the next call; on a background tab, no note appears.
     - Killing the spare leaves the next call on the same pid with no note, and one replacement is recorded.
     - A reference `eN` from `look` before the kill fails after recovery, and a click-counting fixture button stays at 0.
     - Later launches use a missing executable: killing the spare records exactly two failed relaunches and no more; killing the lease makes the next call answer the note followed by `BROWSER_SERVER_UNAVAILABLE:` naming ENOENT.
     - Size 1: after a kill, the next call waits for the successor and succeeds with the note.
     - POSIX only: `SIGSTOP` on the leased pid, with the launcher's browser `timeout` chosen by the case. The next call opens with the note; the replacement's `launch` event is recorded within one command deadline of the fault; the stopped pid gives `ESRCH`.
   - **Accept, `src:server`:**
     - `silent: 1` with size 2: the hand-out strikes the silent double, a replacement launches, and the call runs on the other double.
     - `survivors: 1`: a fault launches no successor, keeps that profile, and `destroy()` rejects an `AggregateError` containing the failure.
   - **Run:** as for U6.

8. **U8: The bin and `BROWSE_POOL`.**
   - **Role / engine:** builder (Sonnet 5.5).
   - **Owns:** `src/bin/main.ts`, `tests/src/bin/main.test.ts`, `tests/service/browse.test.ts` (bin cases), and `guides/browser.md` (the variable list).
   - **Spec:** parse with `parseInteger` from `@orkestrel/contract`, beside `parseBoolean` (`src/bin/main.ts:1`, `7`). An empty value counts as unset. A non-integer exits 1 with `BROWSER_SERVER_ENVIRONMENT` (`main.ts:10-21`). An out-of-range value surfaces as the constructor's `BROWSER_SERVER_OPTIONS`.
   - **Depends:** U7.
   - **Accept, `src:bin`:**
     - A missing executable: stdout carries the `-32000` answer to the written `initialize`; stderr carries exactly one `browse: BROWSER_SERVER_UNAVAILABLE: … ENOENT …` line; exit is 1 after the input ends.
     - `BROWSE_POOL=two` exits 1 with the `BROWSER_SERVER_ENVIRONMENT` line, and `BROWSE_POOL=4` with the `BROWSER_SERVER_OPTIONS` line.
   - **Accept, `service`** (built entry): `initialize`, `tools/list`, and `navigate` answer; the end of input gives exit 0 and leaves no profile with the child's prefix; where cooperative `SIGTERM` holds, the result is the same.
   - **Run:** `npx vitest run --config vite.config.ts --project src:bin tests/src/bin/main.test.ts`, the service file, `npm run test:guides`.

9. **U9: Review.**
   - **Role / engine:** reviewer (Opus 5.5), objective lane.
   - **Scope:** the `#acquire`, `#fault`, and `#release` interleavings, the deletion paths of the sweep, the handshake mapping, and the kill-first path.
   - **Depends:** U8.
   - **Accept:** a falsify verdict; a finding returns to its unit.

10. **U10: Gates.**
    - **Role / engine:** verifier.
    - **Work:** in each repository, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, and `npm run test:service` (browser), read bare.

11. **U11: Real-client check.**
    - **Role / engine:** verifier.
    - **Work:** register the built `browse` with Claude Code and read `/mcp` twice: once with a missing executable (expected: failed, with the cause) and once with a valid one (expected: connected). Do the same with `codex mcp` where the host has Codex. The readings settle clients.md:26-28 before any guide text states a display.

12. **U12: Measurement.**
    - **Role / engine:** builder writes the instrument; the Orchestrator runs it on the target host.
    - **Owns:** `tmp/probes/eager/*.ts` in the browser checkout, and the readings record.
    - **Depends:** U10.
    - **Accept:** M1 to M7, each with the host, Chromium version, load description, date, and every run. No default changes in this unit.

13. **U13: Default and guide prose after the D3 ruling.**
    - **Role / engine:** opus (Opus 5.5).
    - **Owns:** `BROWSER_SERVER_POOL_SIZE`, `guides/browser.md` (§ Register the browse binary with Claude Code: eager start, each client's startup budget with Codex `startup_timeout_sec`, `BROWSE_POOL`, the loss note, the onset refusal), and the passages of `README.md` and `ROADMAP.md` that describe the lazy launch.
    - **Depends:** U11, U12, and the user's ruling.
    - **Accept:** `npm run test:guides` is green, and every behavior sentence maps to a U6–U8 assertion.

**Release order:**

1. `@orkestrel/mcp` 0.0.36 (U1, published by the user).
2. `@orkestrel/browser` re-pins it (U5).
3. Units U6 to U13.
4. The user publishes `@orkestrel/browser`.

`@orkestrel/pool` gets no release.

## Alternatives

Two real alternatives lost to this design:

- **A public `BrowserPool` class in `src/server`** (library, analyst). It loses on the minimal-API law: browse is the only consumer. Its surface carries a class, factory, status union, member snapshot, `member(id)`, holder strings, eight events, and seven codes.
- **An improved `@orkestrel/pool`** (laws). It loses on the semantic proof in the preceding pool ruling.

The following table lists every other rejected option and its reason:

| Rejected option | Reason |
| --- | --- |
| Hold stdin unread until a browser is warm | `ping` goes unanswered and the input's end goes unseen during setup (`StdioServerTransport.ts:83-100`); a failure shows only as an exit, whose display is unknown (clients.md:28) |
| Exit right after the error response (analyst) | Unbinding drops an unwritten answer (`mcp/src/core/helpers.ts:1888`, `1913-1919`); avoiding that needs a write-completion API with no other consumer |
| Refuse with `-32603` (library) | Documented as detail-free (`constants.ts:285-295`) and indistinguishable from `#contain` (`MCPServer.ts:1775-1777`) |
| Refuse with `-32602` | It names invalid parameters, not a missing executable |
| A `notifications/message` at onset | Needs the `logging` capability, `logging/setLevel`, and a push path (map.md:37); its use before the `initialize` answer is unknown (clients.md:27) |
| Answer at once and refuse or relaunch per call | Breaks D4 and D7 |
| Launch in the constructor | Cannot await or report; breaks `src/server/factories.ts:96` |
| Serial launches (library) | D8 asks for setup as eagerly as possible; M2 reads the contention |
| Wait for every slot before answering (analyst) | Onset carries the slowest launch, and one spare failure fails the server (Decision 3) |
| A second context as the spare | It dies with its process (`Browser.ts:196-244`) |
| A heartbeat or scheduled check | `architecture.md:318` (Decision 2) |
| A CDP `timeout` event plus a challenge (library, analyst) | Edits `src/core` while another writer works there, and detection costs the call's deadline plus the challenge's: twice the default deadline against Codex's 60 s tool budget (clients.md:19). `ping` first bounds detection at one deadline |
| A page-session challenge for renderer hangs | It measures the page, not the browser: a page busy for its own reasons would cost the session, and D2 and D7 name browsers |
| Rebuild only the context and page after a renderer crash (library) | A second recovery path |
| `connect()` the same `Browser` again after an exit | Reuses the crashed profile (`Browser.ts:624-626`) |
| Restore the last address | Side effects, re-crash, product policy |
| Refuse calls during recovery (analyst) | The agent retries blind |
| Refuse the next call to deliver the notice (server ruling 3) | Spends a call that `navigate` would have used |
| Replacement credits per owner lifetime (analyst) | A second crash in a long session retires the only browser, which fails D2 |
| Classify launch failures (correctness #6) | A deterministic cause fails its one retry; ENOENT fails at spawn; a classifier would parse messages |
| A crash-loop bound by time window | A fixed figure (D5) |
| Exit when every slot retires | Loses the cause; Claude Code does not restart stdio servers (clients.md:18) |
| An aggregate startup deadline (analyst) | A fixed figure (D5); the client's own timeout closes the input |
| Per-connection initialization state, write completion, a closure signal (analyst) | No consumer |
| Durable owner records with process identity stronger than a pid, and reclamation claims (analyst) | Node offers no native source for such identity; the endpoint GUID plus the browser pid confirm enough |
| A sibling `.endpoint` file (library) | The record inside the profile goes with the profile in one `rm` |
| `spares` (0–2), `BROWSE_SPARES` | Counts beside the session; the user stated the pool size (D6) |
| A `browsers` option key | Collides with `BrowserOptions.browsers` (`src/server/types.ts:161-163`, `177`) |
| An exported `BrowserSlot` record | Private maps keyed by the instance need no public type |
| Bound the whole release with a deadline | The process outlives the bound, so the slot retires instead of being replaced |
| Reorder `Browser.destroy()` in the library | Changes the documented order for every user (`src/server/types.ts:207-212`, `286-295`) |
| Destroy the toolset before the browser (today's order) | Waits through command deadlines on a hung browser (`Browser.ts:848-856`) |
| Isolated replays on a spare | Needs a second holder, beyond D6 |
| `@orkestrel/queue`, `timeout`, `abort`, `emitter` | Ruled in the pool ruling |
| `@orkestrel/supervisor`, the `Supervisor` class of `@orkestrel/process` | The user's ruling, 2026-10-03 |
| An eager-off switch | D1 |

## Constraints

These code facts bind the design:

- `initialize` is answered inline with no hook (`mcp/src/core/MCPLegacy.ts:140-150`), and `ping` likewise (`:151-152`). Modern requests bypass the legacy branch (`:90-92`). The legacy branch uses `-32000` (`:264-270`).
- `createMCPLegacy` reads `server.identity` (`mcp/src/core/factories.ts:88-90`). `MCPError` carries a code and context (`mcp/src/core/errors.ts:29-46`).
- A thrown modern handler is contained as `-32603` (`MCPServer.ts:316-317`, `1775-1777`).
- `bindServer` dispatches each line without awaiting it, aborts on close or unbind, and writes nothing for an aborted request (`mcp/src/core/helpers.ts:1868-1919`).
- The stdio transport subscribes to its input only in `start()` (`mcp/src/server/factories.ts:493-495`; `StdioServerTransport.ts:83-100`) and removes its listeners on close (`:152-168`).
- Today, browse launches on the first call (`BrowserMCPServer.ts:185-209`), and `start()` launches nothing (`:131-139`).
- Discovery off still probes 9222 (`Browser.ts:320-322`, `543-563`), while the launch binds port 0 (`src/server/helpers.ts:363`).
- The spawn is detached on POSIX only (`helpers.ts:368-371`).
- An exit and a transport loss clear contexts and the client and emit `disconnect` (`Browser.ts:388-420`, `444-476`). Destroy emits `destroy` (`:1144-1158`).
- An owned destroy closes contexts over CDP before terminating (`:848-856`, `951-958`), and `#terminate` throws after `SIGKILL` (`:1139-1141`).
- A CDP timeout rejects only its request (`src/core/CDPClient.ts:134-145`).
- The context publishes pages through `page` (`BrowserContext.ts:475-481`). Each context counts references from 0 (`:71`, `293`, `332`, `348-350`).
- `toolset.view` is the current page (`BrowserToolset.ts:360`), and a page's `url` is cached (`BrowserFrame.ts:84-85`).
- Lock-entry helpers exist (`src/server/helpers.ts:47-65`), and the store checks pid liveness (`FileBrowserStore.ts:215-222`).
- A caller's profile is never removed by `Browser` (`helpers.ts:174-177`, `190-191`).
- The launcher double's `pid` is undefined (`tests/setupServer.ts:1568-1570`).

## Refusals

Each refused option is followed by the rule that forecloses it:

- **A heartbeat:** "No polling/busy loops or recursive microtasks as architecture." (`architecture.md:318`)
- **Reaching `Browser`'s private client:** "add it to the interface as a real entity capability; never reach a private member" (`architecture.md:216`).
- **Keeping the lazy launch:** "No compatibility shims." (AGENTS.md § Design laws)
- **Faked crashes:** "NEVER use mocks, behavioral fakes, module replacement, framework spies, or fake clocks for project-owned behavior." (AGENTS.md)
- **A `poolSize` key:** "Never flatten these into prefixed keys." (`names.md` § Group options by entity)
- **A slot type in `BrowserMCPServer.ts`:** "It contains no module-scope interface, type, constant, or free function" (`architecture.md:48`).
- **A stored busy flag or phase union:** "Derive state. … never store a second flag or label that can drift." (AGENTS.md)
- **A lease `destroy()` (analyst):** "`destroy` | Tear down and release resources" (`names.md` § Fixed lifecycle vocabulary).
- **A runtime dependency on `@orkestrel/pool` or `@orkestrel/queue`:** "NEVER add an npm package unless the user explicitly requests it" (AGENTS.md). The user's reuse ruling applies only where semantics match.
- **A PowerShell instrument:** "ALWAYS write a script as TypeScript run by Node" (AGENTS.md).

## Tensions

These judgment calls stay open for the other lane or the Orchestrator:

- **Renderer hang.** The design detects no hang of the current page while the browser answers. The correctness judge asked for a page challenge. U7 adds a service case (`Runtime.evaluate` of an endless loop from a second client, then `navigate`) that records what the agent can do.
- **Concurrent warm-up.** Ruled concurrent per D8. If M2 shows that concurrency delays the first lease on the target host, this returns to the user.
- **Idle-death strikes.** A spare that dies idle twice in a row retires, even hours apart.
- **The server sends `SIGKILL` to `browser.pid` on a failed `ping`.** This uses a public member and keeps the library's documented order; a library member is the alternative.
- **The record window.** The window between spawn and the record write is unrecorded. If M7 confirms `DevToolsActivePort`, reading it closes the window.
- **The note's edges.** The note is also sent when the lost lease ran no call, and a non-string result leaves it pending.
- **The `-32000` remark.** The mcp unit edits the remark at `constants.ts:301-304`.
- **The strike bound of 2** is reasoned, not measured.
- **Concurrent writers.** `src/core/types.ts` and `guides/browser.md` are shared with the other writer; U3 waits for the other writer to land if the two touch the same lines.

## Risks

The design carries these risks:

- **POSIX orphans** after a server `SIGKILL` live until the next start in the same root. The Windows behavior is unmeasured (M6).
- **The real-Chromium hang proof is POSIX-only.** Windows has only the fixture proof.
- **Slow hosts** fail Codex's 10 s default until `startup_timeout_sec` is raised (M2).
- **Hidden retirements.** A retired spare is reported nowhere but in the onset cause and the unavailable text.
- **PID reuse** keeps an orphan's directory (the safe direction).
- **`Page.crash` is an experimental CDP command.**
- **Visible windows.** With `BROWSE_HEADLESS=false`, each spare opens a window.

## Decisions for the user

1. **What D6's balancing means.** Recommended: failover only. One stdio session is one holder, and the longest-ready rule already serves a second holder if one is added later. Alternative: browse serves a second holder at once, such as parallel agents or a replay beside interactive work, which changes the lease to several holders.
2. **What "at all times" means for D7's liveness.** Recommended: events plus a `ping` at hand-out and before every call. A spare that hangs while idle is found when it is next handed work, and no timer runs (AGENTS.md § Design laws). Alternative: a scheduled check of idle spares, as a named exception to the no-polling law.
3. **What the onset waits for.** Recommended: the first warm browser. The onset then carries only the fastest launch against Codex's 10 s, and a broken spare retires while the session runs on fewer. Alternative: wait for every configured browser and fail the onset if one cannot start (strict D4); the change is that setup awaits `size` ready incarnations.
4. **If M2 shows the onset past Codex's 10 s.** Recommended: document Codex's `startup_timeout_sec`. Answering before a browser is warm would break D1 and D4.
5. **POSIX orphans after the server is killed with `SIGKILL`.** Recommended: reclaim them at the next start in the same root. Alternative: operating-system containment (a reaper outside the process), which is out of reach in Node.
6. **Bare `.profiles/<uuid>` directories from earlier versions.** Recommended: leave them, and have the guide name a one-time removal. No code path then has to guess an owner, and a live older server is never at risk. Alternative: delete them at the first start.
7. **Whether to keep the spare (D3), after M3 and M4.** Recommended: keep a default size of 1 until the readings show the failover gain outweighs the spare's idle and contention cost on the target host. Then set 2 (or 3, which D6 permits).
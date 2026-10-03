# Design proposal: an eager, recovering `browse` server on a small browser pool

**Lane: subjective.** This lane covers API shape, vocabulary, placement, and ergonomics. It also holds every objective fact the inputs establish, and each code claim cites `path:line`. Code paths are relative to `C:\Users\mikes\WebstormProjects\browser-wt-browse` unless they name another repository. Lines marked `mcp:` refer to `C:\Users\mikes\WebstormProjects\mcp`.

## Design

**Decision.** Add a reusable `BrowserPool` class to `src/server`. It owns launch, liveness, recovery, leases, and teardown for a pool of 1 to N Chromium processes, with a fresh profile for every process life. The `browse` server is rebuilt on top of it:

- The `start()` method becomes the one setup place. It launches the pool and builds the first session.
- `initialize` waits for that setup through a `handshake` hook added to `@orkestrel/mcp` 0.0.36.
- The `destroy()` method becomes the one teardown place.

**Which consumers are real.**
- **Real in this change:** the `browse` server, which needs D1 to D8. The pool's own `src:server` and `service` proofs exercise every path, but they are proofs, not consumers.
- **Later:** a shared browser for the `tests/service` files that launch once in `beforeAll`. A shared browser needs leases handed across processes, which waits for `ws-endpoint-probe`.
- **Later:** a warm test browser reached through a CDP endpoint.
- **Later:** `@orkestrel/probe`'s server start. The pattern carries over; the code does not.

**Surface sized to `browse`.** The pool exposes `start`, `acquire`, a lease (`browser`, `signal`, `release`), `destroy`, a member snapshot, and transition events. It does not build:
- `idle` or `active` tallies (they can be derived from `members()`);
- disposal with `using`;
- leases that cross processes;
- a context or page prepared for each lease;
- growth, priorities, or idle shutdown;
- a supervisor that is not specific to browsers.

### Rulings

**Q1. Where the launch starts and what the handshake does meanwhile.**

**Ruling:**
- The launch starts at the top of `BrowserMCPServer.start()`, before the transport reads stdin.
- `initialize` waits until member 0 answers and the first session (context, page, started toolset) is built.
- A failed setup answers `initialize` with JSON-RPC `-32603`. The message is `browse could not start Chromium: CAUSE` and `data` is `{ code }`.
- `start()` then rejects with a `BrowserError`, so `main.ts` prints its `browse: CODE: message` line and sets exit code 1 (`src/bin/main.ts:30-34`).
- The server keeps answering every later request with that failure until stdin ends.
- A `destroy()` during setup resolves `start()` instead of rejecting it.
- Nothing exits before the answer, no logging notification is sent, and no call triggers a relaunch.

**Reasoning:**
- `main.ts` constructs the server and calls `start()` immediately (`src/bin/main.ts:22-29`), so `start()` is the highest point upstream.
- The constructor binds and reads nothing (`src/server/BrowserMCPServer.ts:91-129`), so it stays free of side effects.
- The transport starts during setup so that pings are answered and a stdin `end` destroys a server whose client gave up. Messages are dispatched without being awaited (`mcp:src/server/factories.ts:115-118`, `mcp:src/core/helpers.ts:1868`), so a ping is answered while `initialize` is parked. U1 proves this.
- The specification allows an error reply to `initialize` and allows pings before it (`clients.md:7`, `clients.md:9`).
- On failure, Claude Code shows `✘ Failed to connect` with the detail, and Codex fails startup for a `required` server (`clients.md:18-19`). That meets D4.
- Client startup timeouts:
  - Claude Code allows 30 s and connects in the background (`clients.md:18`), so the user does not wait.
  - Codex allows 10 s (`clients.md:19`), which is the binding limit. Measurement M2 decides it. The guide names `startup_timeout_sec`, and the server does not shorten its launch to fit.
- Launches are serial, so the spare never adds to onset time. M2 checks this.

**Q2. Crash detection, from events only.**
- **Owned process exits.** The browser emits `error` with cause `process-exit`, then `disconnect` (`src/server/Browser.ts:388-420`). U3 adds the exit code and signal to that error, which today drops them (`src/server/Browser.ts:388`).
- **Socket drops while the process lives.** After a 50 ms defer, the browser emits `error` with cause `transport-loss`, then `disconnect` (`src/server/Browser.ts:422-476`, `src/server/constants.ts:89`). The pool kills the live process instead of reattaching.
- **Renderer crash.** The page emits `crash` (`src/core/BrowserPage.ts:368`, `:1904-1906`). This is a page fact: the browser stays alive, so the lease holder (`browse`) handles it and the pool does not.
- **Browser stops answering.** No event exists today. An expired deadline rejects one request and `Browser` never sees it (`src/core/CDPClient.ts:134-145`, `map.md:89`).
  - U3 adds a `timeout` event to `CDPClient` and re-emits it from `Browser`.
  - The pool answers each such event with one `version()` check under the browser's own `timeout`, at most one check in flight per member.
  - If the check gets no answer, the pool destroys the browser with cause `unresponsive`.
  - Idle members are checked at handoff (Q4). No schedule runs.

**Q3. Recovery.**
- **Unit of recovery.** Each process life gets a fresh `Browser` instance with a fresh profile, never `connect()` on the dead one: relaunching on the same instance would reuse the crashed profile (`src/server/Browser.ts:624-626`).
- **Cleanup order.** The old instance's `destroy()` drains any remaining processes (`src/server/Browser.ts:1124-1142`). The pool then removes the profile directory and the endpoint record, then launches.
- **What `browse` rebuilds.** The isolated context, the page, the toolset, and the journey toolset. The journey and run stores reopen on the same root, so files on disk survive (`map.md:69`).
- **What is lost.** Tabs, the retained reading, adopted page tools, dialogs and holds, an unsaved recording, the isolated context's cookies and storage, and an in-flight replay. The replay's run is still written, because the journey toolset's `destroy` aborts it and waits.
- **How the agent learns.** A call in flight fails with text naming the cause, the last URL (`toolset.view.url`, `src/core/types.ts:2666`), and what was lost. After a loss while idle, the next result opens with a one-time note. The `describeBrowserLoss` helper writes both.
- **Last address: not restored.** Restoring can replay the crash, which would make the server drive the loop instead of the agent. It would also show a page without its lost cookies and form state.
- **Rebuild timing.** The rebuild starts immediately after the loss, outside any call (D7: warm before work arrives).
- **How a crash loop ends.** A member retires after `BROWSER_POOL_FAILURES` (2) failed lives in a row.
  - A failed life is a launch that never answers, or a life that ends before any lease took it (including a failed handoff check).
  - Taking a lease resets the count.
  - A death while leased does not count: the work caused it, and the agent sees each one.
  - Reason for 2: one failure can be transient (a launch timeout in a load spike, a one-off kill). A second in a row, with a fresh profile and the same executable and arguments, points at a systematic cause. Each further attempt costs a full launch on a host the user says does not take heavy load well.
  - When every member has retired, `acquire` rejects with `BROWSER_POOL_RETIRED` and every call answers it. D7 forbids a relaunch on a call; the user reconnects the server.
- **Profiles a killed server left behind.**
  - Each pool owns `<root>/<pid>-<uuid>`, using the existing `formatBrowserLockEntry` and `parseBrowserLockEntry` helpers (`src/server/helpers.ts:47-65`).
  - Each life gets `<pooldir>/<uuid>/` plus `<pooldir>/<uuid>.endpoint`.
  - At `start()`, the pool sweeps entries whose owner pid is dead (the same check as `src/server/stores/FileBrowserStore.ts:215-222`, routed through a shared `probeProcess` helper).
  - For each recorded endpoint, it attaches with `createBrowser({ cdp: { endpoint } })`, calls `close()` (which sends `Browser.close`), then removes the directory with `rm`. The browser GUID in the endpoint path means a reused port never matches.
  - Old `.profiles/<uuid>` entries have no owner and are left alone.

**Q4. The pool.**
- **Shape.** `size` members, each a separate process. Launches run one at a time through one promise chain. Leases are exclusive.
- **States.** `launching`, `ready`, `leased`, `retired`. A separate `recovering` state is folded into `launching`, because the predecessor's termination is the first step of the next launch and gives a caller nothing to decide.
- **Liveness.**
  - Exit and drop events arrive at any time, in every state.
  - "Answering" is checked by `version()` at handoff and after any command deadline.
  - No schedule runs: a hung idle browser costs nothing until it is handed work, and handoff is exactly when the check matters.
- **Work in flight on a dying browser.** Pending CDP requests reject (`map.md:83`), and the lease `signal` aborts with `BROWSER_POOL_LOST`.
- **The lease.**
  - The holder receives `{ member, browser, signal, release }`.
  - `release()` closes the contexts created during the lease and keeps the ones present at acquire. This avoids closing the initial tab; whether new headless mode exits when its last tab closes is unmeasured (see Measurements).
  - The `signal` passed to `acquire` stops the wait before assignment and releases the lease after it.
  - A lease also ends when its browser is lost or the pool is destroyed.
  - A holder that fails without releasing keeps its member until one of those happens. `members()` names the holder.
- **Balancing.** The waiter at the head of a FIFO queue gets the member that has been `ready` longest, with ties going to the lower id. Consecutive leases therefore rotate across members.
- **Second process, not second context.** A context dies with its browser's connection, so failover (D2, D3) needs a separate process.
- **What the spare serves.** Instant failover only. Replays run on the session toolset, and a second replay is refused while one runs (`browser-browse-map.md:53`). Parallel replays need a change in `core`, so they come later.
- **When each member starts and how it is replaced.**
  - Member 0 launches at `start()`; each next member launches after the previous one is `ready`.
  - A lost member relaunches immediately after its cleanup.
  - Promotion means the session's lease takes the spare; the crashed member relaunches into the spare role.
- **Idle cost.** M3 measures it.

**Q5. Placement.**
- **Library (`src/server`):**
  - The `BrowserPool` class with its types, constants, helpers, factory, and barrel row.
  - On `Browser`: an `endpoint` property, a `version()` method, a `timeout` event, exit context on the process-exit error, and no 9222 probe when `cdp.port` is unset.
  - In `core`: the `CDPClient` `timeout` event.
- **The 9222 fix.** A launch on port 0 cannot collide with anything (`src/server/helpers.ts:363`). Today a user's Chrome listening on 9222 makes `browse` fail at onset for no reason (`src/server/Browser.ts:320-322`, `map.md:113-115`).
- **`browse`:**
  - The eager start, the handshake gate, the session rebuild, and the loss notes.
  - A `pool.size` option and a `BROWSE_POOL` variable, accepting 1 to `BROWSER_SERVER_POOL_LIMIT` (3, the ceiling the user gave in D6). The default is 1 until the user rules on D3.
- **Turning the eager start off: not possible.** D1 and D4 define the server. A lazy mode would bring back the call-triggered launch that D7 forbids, plus a second code path. A host that wants no browser does not start `browse`.

**Q6. Proof.** Every claim gets a test with no mocks:
- `src:server` runs the real `Browser` against `createFakeBrowserProcess({ serveCDP: true })` (`tests/setupServer.ts:724-736`). A crash is a kill of its published pid; a socket drop is `dropSocket()` (`tests/setupServer.ts:700`).
- `service` runs real Chromium. A crash is `process.kill(pid)`, a hang is `SIGSTOP` on POSIX, and a renderer crash is `Page.crash`.
- New service files: `tests/service/pool.test.ts` and `tests/service/browse.test.ts`.
- Rewritten `src` tests: `tests/src/server/BrowserMCPServer.test.ts` and `tests/src/bin/main.test.ts`. The bin test's missing-executable cases become the D4 proof.
- `tests/service/browser.test.ts` keeps one launch per test, in this change and later, because those tests prove `Browser`'s own launch, destroy, and reconnect (`browser-browse-map.md:71`).
- The single-`beforeAll` files (document, toolset, journey, codegen) can move to a pool later, after `ws-endpoint-probe`.

**Q7. Tests outside `browse`.**
- **CDP endpoint: yes, later.** A member's `endpoint` serves `createBrowser({ cdp: { endpoint } })` and Playwright's `connectOverCDP`, which `tests/service/document.test.ts` already uses (`browser-browse-map.md:72`).
- **`PLAYWRIGHT_WS_ENDPOINT`: no.**
  - `launchServer` launches its own browser over a pipe, and its `wsEndpoint` speaks Playwright's protocol, not CDP (`map.md:132`, `:138`).
  - `run-server` default mode launches a browser per connection (`map.md:136`).
  - So a pool member cannot back `chromium.connect`. `ws-endpoint-probe` settles whether Vitest's provider accepts a CDP endpoint.

**Q8. What carries over to probe** (`probe:ROADMAP.md:5`), noted only, nothing designed there:
- The same `handshake` hook gates `initialize` on arming the probe.
- The `launching`/`ready`/`leased`/`retired` machine fits each resident worker (the Oxlint LSP, the Vitest service), with the exit event as the crash signal and replacement immediately after exit.
- The failed-lives bound.
- "No relaunch on a caller's demand" replaces "retried once by each later call".
- The owner-pid directory sweep.
- Any extraction to `@orkestrel/process` (whose `Supervisor` exists, `map.md:101`) goes through a design round when probe's item 1 lands.

### Type sketch

```ts
// src/core/types.ts
export type CDPClientEventMap = {
	readonly connect: readonly []
	readonly close: readonly []
	readonly drop: readonly []
	readonly error: readonly [error: unknown]
	/** A request passed its deadline unanswered; emitted before that request rejects. */
	readonly timeout: readonly [method: string]
}

// src/server/types.ts — Browser additions
export type BrowserEventMap = {
	// …existing members unchanged…
	/** A CDP request on this connection passed its deadline unanswered. */
	readonly timeout: readonly [method: string]
}
export interface BrowserInterface {
	// …existing members unchanged…
	/** Reports the CDP endpoint this instance is connected to or owns, or undefined when it represents none. */
	readonly endpoint: string | undefined
	/**
	 * Reads the product the connected browser reports through CDP `Browser.getVersion`.
	 *
	 * @remarks
	 * Rejects with `BrowserNotConnectedError` while disconnected, with `CDPTimeoutError` when no
	 * answer arrives within `options.timeout` or the instance `timeout`, and with the signal's reason.
	 */
	version(options?: BrowserCallOptions): Promise<string>
}

// === Browser pool

/**
 * Names the lifecycle status of one pool member.
 *
 * @remarks
 * - `launching` — the previous life is being ended and a fresh browser is starting
 * - `ready` — the browser answered and waits for a lease
 * - `leased` — one lease holds the browser
 * - `retired` — the member stopped relaunching after `BROWSER_POOL_FAILURES` failed lives in a row,
 *   or its pool was destroyed
 */
export type BrowserPoolStatus = 'launching' | 'ready' | 'leased' | 'retired'

/** Describes one pool member as it stands when read. */
export interface BrowserPoolMember {
	readonly id: number
	readonly status: BrowserPoolStatus
	readonly pid: number | undefined
	readonly endpoint: string | undefined
	readonly profile: string | undefined
	readonly holder: string | undefined
}

export type BrowserPoolEventMap = {
	readonly launch: readonly [member: BrowserPoolMember]
	readonly ready: readonly [member: BrowserPoolMember]
	readonly acquire: readonly [member: BrowserPoolMember]
	readonly release: readonly [member: BrowserPoolMember]
	readonly crash: readonly [member: BrowserPoolMember, error: unknown]
	readonly retire: readonly [member: BrowserPoolMember, error: unknown]
	readonly error: readonly [error: unknown]
	readonly destroy: readonly []
}

/** Describes the launch every member's browser receives; the pool supplies `profile`, `cdp`, and `signal`. */
export type BrowserPoolLaunchOptions = Omit<BrowserOptions, 'profile' | 'cdp' | 'signal'>

/**
 * Configures a browser pool.
 *
 * @remarks
 * - `root` — the directory the pool creates its own `PID-UUID` directory under
 * - `size` — the members, a positive integer; the pool never grows past it. Default: `1`
 * - `browser` — the launch every member receives
 * - `launch` — creates each member's browser. Default: `createBrowser`
 */
export interface BrowserPoolOptions {
	readonly on?: EmitterHooks<BrowserPoolEventMap>
	readonly error?: EmitterErrorHandler
	readonly root: string
	readonly size?: number
	readonly browser?: BrowserPoolLaunchOptions
	readonly launch?: BrowserLaunchFunction
}

/**
 * Configures one acquisition.
 *
 * @remarks
 * - `holder` — the name `members()` reports while the lease stands
 * - `signal` — ends the wait before assignment and releases the lease after it
 */
export interface BrowserLeaseOptions {
	readonly holder?: string
	readonly signal?: AbortSignal
}

export interface BrowserLeaseInterface {
	readonly member: number
	readonly browser: BrowserInterface
	/** Aborts when the lease ends: `BROWSER_POOL_RELEASED`, `BROWSER_POOL_LOST`, or `BROWSER_POOL_DESTROYED`. */
	readonly signal: AbortSignal
	/** Closes the contexts created during the lease and returns the member to `ready`. Idempotent. */
	release(): Promise<void>
}

export interface BrowserPoolInterface {
	readonly emitter: EmitterInterface<BrowserPoolEventMap>
	readonly size: number
	member(id: number): BrowserPoolMember | undefined
	members(): readonly BrowserPoolMember[]
	/** Sweeps dead owners' directories, then launches members one at a time; resolves when member 0 is `ready`. */
	start(): Promise<void>
	/** Hands the longest-ready member to the head waiter after a `version()` check; never launches. */
	acquire(options?: BrowserLeaseOptions): Promise<BrowserLeaseInterface>
	destroy(): Promise<void>
}

// Browse server
export interface BrowserMCPServerOptions {
	// …root, headless, executable, readonly, launch, stdio unchanged…
	readonly pool?: { readonly size?: number }
}

// @orkestrel/mcp 0.0.36 — src/core/types.ts
/** Runs a server's own setup, which every handshake awaits before it answers. */
export type MCPHandshakeHandler = (options: MCPMethodOptions) => Promise<void>
// MCPServerOptions.handshake?: MCPHandshakeHandler
// MCPServerInterface.handshake: MCPHandshakeHandler | undefined   (read by createMCPLegacy, as it reads `identity`)
// MCPLegacyOptions.handshake?: MCPHandshakeHandler
```

New constants:
- `BROWSER_POOL_FAILURES = 2`
- `BROWSER_POOL_ENDPOINT_SUFFIX = '.endpoint'`
- `BROWSER_UNRESPONSIVE_CAUSE = 'unresponsive'`
- `BROWSER_SERVER_POOL_LIMIT = 3`

New helpers:
- `probeProcess(pid): boolean`
- `describeBrowserLoss(error, url): string`

New factory: `createBrowserPool(options)`.

New error codes, all on `BrowserError`: `BROWSER_POOL_ARGUMENT`, `BROWSER_POOL_IDLE`, `BROWSER_POOL_START`, `BROWSER_POOL_LOST`, `BROWSER_POOL_RELEASED`, `BROWSER_POOL_RETIRED`, `BROWSER_POOL_DESTROYED`.

### State machine of one member

```text
            start / previous member ready / after loss cleanup
                              │
                              ▼
   ┌──────────────────► launching ──(connect + version answered)──► ready
   │                      │                                         │  ▲
   │   launch rejects:    │                                         │  │ release (contexts closed)
   │   failures += 1      │                       acquire + check   ▼  │
   │◄─────────────────────┘                       passes: failures=0 leased
   │                                                                  │
   │◄── ready: exit/drop/check fails ─ failures += 1 ─────────────────┤
   │◄── leased: exit/drop/unresponsive ─ lease aborts LOST ───────────┘
   │
   └── failures == BROWSER_POOL_FAILURES, or start's first launch fails ──► retired
       any state ── pool destroy ──► retired (pool emits `destroy` last)
```

Pool-level facts are derived, never stored: `started` (a start promise exists), `failed` (every member is `retired`), `destroyed` (a teardown promise exists).

### Failure table

| Failure | Signal | Action | What the caller sees |
| --- | --- | --- | --- |
| No executable, spawn `ENOENT`, exit before the DevTools line, or launch timeout, at onset | `connect()` rejects | Retire member 0, launch nothing more, `start()` rejects `BROWSER_POOL_START` | `initialize` error `-32603` with the cause; stderr `browse: BROWSER_POOL_START: …`; exit 1 after stdin ends; any call gets the same text |
| Client startup timeout passes before the gate opens (Codex 10 s) | Client closes stdin | `end` → `destroy()` | The client's own timeout display |
| Session build fails at onset with the browser alive | `isolate`, `create`, or toolset `start` rejects | Release the lease, `start()` rejects | `initialize` error with that message |
| Leased process exits | `error` `process-exit` + `disconnect` (`src/server/Browser.ts:388-420`) | Abort the lease, emit `crash`, destroy, remove profile and endpoint file, relaunch; `browse` rebuilds on a ready member | Call in flight: loss text; idle: one-time note on the next result |
| Socket drops, process alive | `error` `transport-loss` + `disconnect` (`src/server/Browser.ts:444-476`) | Same as the previous row; `destroy()` kills the live process | Same |
| Leased browser stops answering | CDP deadline → `timeout` → `version()` gets no answer | `crash` with cause `unresponsive`, then as for an exit | Same |
| Idle member stops answering | `version()` at handoff gets no answer | Relaunch, count a failed life, try the next ready member | A slower acquire |
| Idle member dies | `disconnect` while `ready` | `crash`, count a failed life, relaunch | Nothing |
| A member fails `BROWSER_POOL_FAILURES` lives in a row | Counter | `retire`; the pool continues on the remaining members | Nothing while one remains; when none remain, every call answers "browse stopped relaunching the browser … Reconnect the browse server." |
| Renderer crash on a session page | Page `crash` (`src/core/BrowserPage.ts:1904-1906`) | Destroy the toolset (its `release` closes the context), build a fresh context, page, and toolset on the same lease | Tab-crash text, or a note naming the URL |
| `release` cannot close a context | `close()` rejects | Treat as a crash | Nothing to the releaser |
| Profile `rm` fails (Windows lock past retries) | `rm` rejects | Pool `error` event; the directory waits for the next start's sweep | Nothing |
| Server killed (SIGKILL or crash) | None | Next `start()` in the root attaches to the recorded endpoints, sends `Browser.close`, removes the directories | Nothing |
| Holder never releases | None | The lease stands until the holder's signal aborts or the pool is destroyed | `members()` shows the holder |
| A user's Chrome on 9222 | Probe answers (`src/server/Browser.ts:543-550`) | After U3: no probe without an explicit `cdp.port` | Nothing |
| `destroy()` during a launch | Pool abort signal | The browser cleans its partial process (`src/server/Browser.ts:663-674`), the pool removes the profile | `start()` resolves |

## Alternatives

Two real alternatives were rejected:

1. **Pool logic inside `BrowserMCPServer`, kept private.** Rejected because:
   - The server file would carry two classes' state.
   - A warm test browser would have to duplicate launch, liveness, and teardown.
   - Launch, liveness, and teardown are mechanism, not `browse` product policy (`AGENTS.md:67`).
2. **A single-browser supervisor that `browse` composes into a pool.** Rejected because D7 makes the pool decide which work goes where and record leases. A per-browser supervisor pushes assignment, balancing, and the waiter queue into every consumer.

Other options rejected, with reasons:
- **Answer `initialize` at once and fail on the first call:** fails D4.
- **Exit without answering:** carries no detail. Self-exit after the error races the unbind, which drops unwritten answers (`mcp:src/core/helpers.ts:1834-1845`).
- **Declare `logging` and send `notifications/message`:** needs the capability, `logging/setLevel` handling, and a stdio push path the package lacks (`map.md:37`), with no client display measured.
- **A `BROWSE_EAGER` off switch:** contradicts D1, D4, and D7.
- **A periodic heartbeat:** forbidden by the polling rule (see Refusals).
- **Holder-driven `lease.check()`:** pushes hang detection into every holder. The `timeout` event keeps it in the pool.
- **Recovery inside `Browser` (auto-relaunch):** changes the documented reattach contract for every user (`src/server/types.ts:267-272`).
- **Restoring the last address:** can replay the crash and shows a page stripped of its session.
- **A second context as the spare:** dies with its process.
- **Concurrent warm-up of all members:** slows onset on hosts that do not take heavy load well.
- **Leases shared within one browser:** ambiguous holder, cross-holder interference.
- **A synchronous `exit` hook that kills browsers:** cannot cover SIGKILL, and would duplicate `Browser`'s signal logic (`src/server/Browser.ts:1060-1083`). The sweep covers every crash kind.
- **A stderr lifecycle log:** deferred (Tension 7).
- **A pool usable for things other than browsers:** no second real consumer.
- **Retry with backoff:** no backoff primitive is installed (`map.md:103`), and a bound of 2 leaves a delay little to do.

## Constraints

- The launch happens on the first tool call; `#session` stays resolved after a crash: `src/server/BrowserMCPServer.ts:185-209`, `:199-202`.
- `start()` does not launch: `src/server/BrowserMCPServer.ts:131-139`. Teardown order: `:146-167`.
- `browse` passes `cdp: { discover: false }` with no port: `src/server/BrowserMCPServer.ts:225`. The 9222 probe still runs: `src/server/Browser.ts:320-322`, `:552-563`.
- The launch is on port 0: `src/server/helpers.ts:363`. The spawn is detached outside Windows: `src/server/helpers.ts:368-371`.
- The browser emits no hang event, and a request timeout rejects only that request: `src/core/CDPClient.ts:134-145`.
- `Browser` holds `#endpoint` privately: `src/server/Browser.ts:82`. The interface has no `endpoint` and no version read: `src/server/types.ts:227-305`.
- The toolset's `release` option runs last on `destroy`: `src/core/types.ts:2882-2885`, `src/core/BrowserToolset.ts:2075-2092`.
- If the origin page closes, the toolset has nothing to select: `src/core/BrowserToolset.ts:2140-2148`.
- Declared dependencies exclude queue, timeout, abort, and process: `package.json:105-113`.
- `initialize` is answered inline with `{ tools: {} }` and no hook: `mcp:src/core/MCPLegacy.ts:139-150`, `mcp:src/core/helpers.ts:1192-1203`.
- `createMCPLegacy` reads `server.identity`: `mcp:src/core/factories.ts:88-90`. `MCPError` carries code and context: `mcp:src/core/errors.ts:29-46`. `JSONRPC_INTERNAL_ERROR`: `mcp:src/core/constants.ts:295`.
- The bin test expects empty stderr and a `look` that fails lazily: `tests/src/bin/main.test.ts:60`, `:100`, `:123`.
- Test infrastructure available: launcher double `tests/setupServer.ts:1670-1710`; fake process `:724-736`.
- Rules: one-word names `AGENTS.md:52`; derive state `:58`; minimal API `:65`; no shims `:66`; mechanism only `:67`; no polling `:68`; no stray declarations `.claude/rules/architecture.md:48`; manager accessors `.claude/rules/patterns.md:43-50`; one event per transition `:105`.
- `@orkestrel/mcp` source is at 0.0.35 (`mcp:package.json:3`). A caret on 0.0.x pins the patch, so `browse` re-pins to `^0.0.36`.

## Refusals

- **`@orkestrel/queue`, `timeout`, `abort`, and `process` primitives.** `AGENTS.md:38`: "**NEVER** add an npm package unless the user explicitly requests it; prefer native APIs." `@orkestrel/emitter` is declared and is used.
- **Heartbeat liveness.** `AGENTS.md:68`: "No polling architecture. Park idle work on events and abort signals."
- **Keeping the lazy `#open` launch as a fallback.** `AGENTS.md:66`: "No compatibility shims." D7: "never by a caller's demand."
- **A stored `checking` or `recovering` flag beside `status`.** `AGENTS.md:58`: "never store a second flag or label that can drift."
- **A module-scope member record type in `BrowserPool.ts`.** `.claude/rules/architecture.md:48`: "It contains no module-scope interface, type, constant, or free function." Keep per-member state in `#` maps keyed by id.
- **A `poolSize` key.** `.claude/rules/names.md:49`: "Never flatten these into prefixed keys."
- **A `status` event.** `.claude/rules/patterns.md:105`: "Never publish a generic `status` event carrying a transition value."
- **Mocked child processes or fake clocks in crash proofs.** `AGENTS.md:42`.
- **A PowerShell measurement script.** `AGENTS.md:47`: "Never write a bash, PowerShell, or Python script."

## Measurements

**Readings supplied.** None from a live run. The inputs give configured figures only:
- 30 s default CDP timeout (`map.md:89`), 200 ms port probe (`src/server/constants.ts:61`), 3 s kill grace (`:54`), 50 ms transport-loss defer (`:89`).
- Client startup timeouts of 30 s and 10 s, from documentation (`clients.md:18-19`).
- 24 service launches, counted from source and not measured (`browser-browse-map.md:67`).

**Readings missing:**
- Onset latency.
- Failover latency.
- The spare's idle cost.
- Real crash frequency (no instrument exists).
- `Browser.getVersion` round trip under load.
- Whether new headless mode exits when its last tab closes.
- `Inspector.targetCrashed` parameters.
- WebSocket close codes on a crash.
- Profile file locks after a kill.
- How clients display an `initialize` error that is not a version mismatch (`clients.md:26-28`).

**Plan (D3 and D5).**
- **Instrument.** A runtime probe at `tmp/probes/pool.test.ts`, never committed, run with `npx vitest run --config vite.config.ts --project probe tmp/probes/pool.test.ts` against the built entry and real Chromium.
- **Load.** The probe starts `npm run test:service` as a child in the same checkout and measures while that runs. An idle baseline runs too.
- **M1, failover.** Kill the leased browser's pid (found from the endpoint records and CDP `SystemInfo.getProcessInfo`), then time until a `look` call succeeds. Compare `BROWSE_POOL` 1 and 2.
  - Control: with size 2, the session page must live on an endpoint recorded before the kill; with size 1, on one recorded after it.
- **M2, onset.** Time from spawn until `connect()` resolves, for sizes 1 and 2, idle and under load. Compare with the 10 s Codex limit.
  - Control: onset under load must exceed onset idle, otherwise report that the load was not reached.
- **M3, spare cost.**
  - The spare's `cpuTime` sum from `SystemInfo.getProcessInfo` at the start and end of the load run.
  - Its working set, read through `tasklist` (spawned with an argument array) on Windows and `ps -o rss=` on POSIX.
  - The leased browser's `look` latency with and without the spare under load.
- **M4.** The `version()` round trip under load, as a reading for the check deadline.
- **Output.** The probe writes `tmp/probes/pool-readings.json`, and the Orchestrator records the readings with the run date in `.orkestrel/veneer/lifecycle/eager/readings.md`. No threshold is fixed in advance; the user rules on whether to keep the spare (D3, D5).

## Units

Repository order: U1 runs in the `mcp` repository alongside U3 to U5. U2 waits for the 0.0.36 publish. U6 onward run in order. Each writer stops at its project boundary; `verifier` runs the gates afterwards.

**U1 — `@orkestrel/mcp` handshake hook.** Role `astra`, engine astra, repository `mcp`. Depends on nothing.
- **Files:** `src/core/types.ts` (`MCPHandshakeHandler`, `MCPServerOptions.handshake`, `MCPServerInterface.handshake`, `MCPLegacyOptions.handshake`), `src/core/MCPServer.ts` (gate `server/discover`), `src/core/MCPLegacy.ts` (gate `initialize`, resolving options as at `:196-197`), `src/core/factories.ts`, the mirrored tests, the guide, and `package.json` at 0.0.36.
- **Acceptance**, over a real stdio pair through `createStdioServer`:
  - (a) While the hook is pending, `initialize` gets no answer and a later `ping` is answered first. After the hook resolves, the result keeps the 0.0.35 shape.
  - (b) A hook rejecting with `MCPError(msg, -32603, data)` produces that error under the request id.
  - (c) A hook rejecting with any other error produces the fixed detail-free `-32603` and exactly one `error` event.
  - (d) Without a hook, every existing test is unchanged.
  - (e) `server/discover` is gated the same way.
  - (f) The hook's signal aborts when the transport closes.
- **Conforms to:** `clients.md:7`, `:9`, `:11`.
- **Release:** the user publishes 0.0.36 from their terminal before U2. Record the pack integrity.

**U2 — Re-pin.** Role `builder`, engine sonnet. Depends on the U1 publish.
- **Files:** `package.json` to `@orkestrel/mcp` `^0.0.36`, the lockfile, and a refreshed mirror at `guides/mcp.md`.
- **Acceptance:** `npm ci --ignore-scripts`, `npm run check`, and `npm run test:src` are green.

**U3 — `Browser` liveness surface.** Role `astra`, engine astra. Depends on nothing.
- **Files:** `src/core/types.ts`, `src/core/CDPClient.ts`, `src/server/types.ts` (event, `endpoint`, `version`, and the `BrowserCDPOptions` remarks at `:101-106`), `src/server/Browser.ts`, `tests/setupServer.ts` (double implements `endpoint` and `version`; fake answers `Browser.getVersion` and gains a `stall` option), the mirrored tests, and `guides/browser.md`.
- **Acceptance:**
  - (a) A request past its deadline emits `timeout` with its method exactly once, before it rejects. An answered or aborted request emits nothing.
  - (b) `Browser` re-emits the event.
  - (c) `endpoint` equals the WebSocket URL after connect and is `undefined` after destroy or a process exit. `version()` returns the fixture's product, and rejects with `BrowserNotConnectedError` while disconnected.
  - (d) The process-exit error context carries `code` and `signal`. Prove it by killing the fake's pid.
  - (e) A service case binds a `/json/version` fixture on 127.0.0.1:9222 and throws when the port is taken. With `discover: false` and no port, the launch proceeds. With an explicit answering port, the launch still refuses.

**U4 — `BrowserPool`.** Role `astra`, engine astra. Depends on U3.
- **Files:** `src/server/types.ts`, `constants.ts`, `helpers.ts` (`probeProcess`), `stores/FileBrowserStore.ts` (routed through `probeProcess`), `BrowserPool.ts`, `factories.ts`, the `index.ts` barrel row, `tests/src/server/BrowserPool.test.ts`, `helpers.test.ts`, and `guides/browser.md`.
- **Acceptance** (real `Browser` over the fake process):
  - (a) Serial `launch`/`ready` order. `start()` resolves at member 0. The snapshot carries pid, endpoint, and profile, and the endpoint file matches.
  - (b) `acquire` rejects with `BROWSER_POOL_IDLE` before start and `BROWSER_POOL_DESTROYED` after destroy, and launches nothing.
  - (c) Leases are exclusive and waiters FIFO. Aborting while waiting rejects; aborting after assignment releases. Two cycles on size 2 alternate members.
  - (d) Killing the leased pid aborts the lease with `BROWSER_POOL_LOST` and cause `process-exit`, then emits `crash`, `launch`, and `ready` with a fresh pid and profile. The old directory and endpoint file are gone.
  - (e) `dropSocket()` gives the same result with `transport-loss`, and the old pid is dead.
  - (f) A stalled leased browser: a request deadline leads to `crash` with `unresponsive`, and the pid is dead.
  - (g) A stalled ready member is skipped at handoff, relaunched, and counted.
  - (h) Killing each life at `ready` retires the member after 2; with size 1, `acquire` then rejects `BROWSER_POOL_RETIRED`. No launch happens after `retire`.
  - (i) A missing executable makes `start()` reject `BROWSER_POOL_START`, member 1 never launches, and the root is empty after destroy.
  - (j) `release` closes only the contexts created during the lease.
  - (k) `destroy`: every recorded pid is dead, the pool directory is gone, waiters are rejected, and `destroy` is emitted last.
  - (l) The sweep closes a fake browser recorded under an exited owner pid and removes its directory, and leaves a live owner's directory alone.
  - (m) `probeProcess` returns `true` for `process.pid` and `false` for an exited child.

**U5 — Pool live proofs.** Role `builder`, engine sonnet. Depends on U4 and a build.
- **File:** `tests/service/pool.test.ts`, real Chromium.
- **Acceptance:**
  - (a) Size 2 gives two live pids, launched serially.
  - (b) A kill recovers with a fresh pid, and the profile directory is gone.
  - (c) POSIX only: `SIGSTOP` on the leased browser with a short `browser.timeout` leads to an `unresponsive` kill.
  - (d) `Page.crash` leaves the browser leased and alive, and the pool emits nothing.
  - (e) After destroy, no pid is alive and the root is empty.
  - (f) A child script starts a pool from `dist` and is killed with SIGKILL. A second pool's `start()` closes the orphaned Chromium and removes its directory.

**U6 — `browse` on the pool.** Role `opus`, engine opus. Depends on U2 and U4.
- **Files:** `src/server/types.ts`, `BrowserMCPServer.ts`, `helpers.ts` (`describeBrowserLoss`), `constants.ts`, `factories.ts`, `src/bin/main.ts` (`BROWSE_POOL` parsed with `parseInteger`, refused with `BROWSER_SERVER_ENVIRONMENT`), `tests/src/server/BrowserMCPServer.test.ts`, `tests/src/bin/main.test.ts`, `tests/setupServer.ts`, `guides/browser.md`, and `README.md`.
- **Acceptance:**
  - (a) A launch exists before any message arrives. `initialize` is parked while `launcher.hold()` holds, a `ping` is answered meanwhile, and after release `initialize` answers with the 0.0.35 shape.
  - (b) A launch failure gives an `initialize` error carrying the fixture text and `data.code`, and `start()` rejects `BROWSER_POOL_START`. A later `tools/call` answers the same text, and the launch count stays 1.
  - (c) Bin test with a missing executable: `connect()` rejects with `ENOENT`, stderr is exactly one `browse: BROWSER_POOL_START:` line, exit is 1 after disconnect, and `.profiles` is empty.
  - (d) `BROWSE_POOL` set to `4` or `two` exits 1 with one line. `BROWSE_POOL=2` produces two serial launches.
  - (e) A loss during a call returns the loss text, and the next call carries no note.
  - (f) A loss while idle puts the note in the next call's first block, one time.
  - (g) A renderer crash rebuilds on the same browser (launch count unchanged) and produces the tab note.
  - (h) With size 2, the spare serves the next call, and the replacement launches outside any call.
  - (i) A retired pool answers every call with the retire text and launches nothing.
  - (j) After destroy, signal listener counts are back to baseline and the pool directory is gone.

**U7 — `browse` live proofs.** Role `builder`, engine sonnet. Depends on U6 and a build.
- **File:** `tests/service/browse.test.ts`, using the built entry and real Chromium.
- **Acceptance:**
  - (a) `initialize` is answered only after the recorded endpoint answers.
  - (b) Killing the leased pid makes the next `look` succeed with the note.
  - (c) With `BROWSE_POOL=2`, the session page target lives on an endpoint recorded before the kill.
  - (d) `Page.crash` from a second CDP client produces the tab note, with the same browser pid.
  - (e) After disconnect, every recorded pid is dead, the pool directory is gone, and the exit code is 0.

**U8 — Measurement.** Role `builder` writes the probe; `verifier` runs it. Depends on U7.
- **Deliverable:** the plan in Measurements, with its controls and the readings record.

**U9 — Default size 2.** Role `builder`. Runs only on the user's D3 ruling.
- **Files:** the default in `BrowserMCPServer.ts` and its docs.

**U10 — Real-client check.** Role `verifier`. Depends on U6 and a build.
- **Work:** run `claude mcp list` against the built `browse`, once with a missing executable (expected failed, with the cause) and once with a valid one (expected connected). Whether `claude mcp list` runs the handshake is unverified until this unit settles it.
- **Then:** `builder` writes the guide's client rows, including Codex `startup_timeout_sec`.

## Tensions

1. **"At all times" (D7) versus the no-polling law.** Answering is checked at handoff and after command deadlines, not on a schedule. The Orchestrator rules.
2. **The crash-loop bound of 2 is reasoned, not measured.** The other lane may argue for a time window, which would need a fixed figure.
3. **The handshake gate makes every client wait for Chromium,** against Codex's 10 s limit. M2 decides it.
4. **Default size 1 until D3 is ruled.** The ceiling of 3 is the user's D6 figure.
5. **The lease `signal` aborts on release and on loss alike,** told apart by the reason code.
6. **U3 edits `core` (`types.ts`, `CDPClient.ts`) while another writer edits other `core` files.**
7. **No stderr lifecycle log.** Operators see crashes only through the agent's notes, and real crash frequency (M4's missing companion) stays unmeasurable.
8. **A renderer crash discards every tab,** not only the crashed one.
9. **`start()` rejects while the server keeps serving** the failure.
10. **The 9222 fix changes `Browser`'s documented `discover: false` contract.**
11. **`member(id)` is included to satisfy the manager-accessor rule,** against the minimal-API rule.

## Risks

- An orphaned Chromium after a SIGKILL of the server lives until the next start in the same root.
- PID reuse can keep an orphan's directory (the safe direction).
- An extreme load can push `version()` past the 30 s budget and kill a healthy browser.
- Windows profile locks can outlast the `rm` retries.
- `Page.crash` is an experimental CDP command.
- The hang path has no live proof on Windows; only the fixture proves it there.
- Old `.profiles/<uuid>` directories stay until someone removes them by hand.
- A session rebuild can race calls in flight. U6 (e) to (h) cover it.
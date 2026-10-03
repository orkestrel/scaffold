Adopt an eager, fixed-capacity browser pool, with startup readiness controlling MCP initialization and recovery controlled by the pool owner. Keep each browsing session on one browser. Never replay an interrupted action automatically.

Two requirements need precise limits:

- **D7 cannot mean continuous proof of responsiveness.** A silent, idle browser can hang without emitting an event. Events plus command deadlines detect observed failures; they cannot establish that every idle renderer is answering at every instant.
- **D8 cannot mean synchronous cleanup after an uncatchable server kill.** Cleanup code cannot run in a killed process. Require cleanup on normal termination and verified reclamation on the next start. Immediate cleanup after that kill requires an independently surviving supervisor or operating-system containment. Node documents the uncatchable signal limitation in its [signal documentation](https://nodejs.org/api/process.html#signal-events).

This is a source-based proposal. The acceptance proofs and measurements specified below remain to be run. Code paths are relative to `browser-wt-browse`; `../mcp`, `../probe`, and `../scaffold` name sibling checkouts.

**1. Start in `BrowserMCPServer.start()` and defer successful initialization until readiness**

Keep the constructor free of launch side effects. Make `start()` the sole setup owner; `src/bin/main.ts` remains the composition entry that constructs the server and awaits it. That entry already awaits `.start()`, but `start()` only starts stdio and installs termination listeners. Chromium starts inside `#forward → #open → #launch`. (`src/bin/main.ts:22`; `src/server/BrowserMCPServer.ts:131`; `src/server/BrowserMCPServer.ts:185`; `src/server/BrowserMCPServer.ts:199`.)

Use this startup sequence:

1. Install termination, input-end, input-close, and transport-failure handling before beginning asynchronous setup.
2. Publish one shared startup promise and one owner lifetime signal.
3. Start stdio immediately, with initialization gated on that promise.
4. Validate configuration, sweep verifiable orphan ownership records, and allocate the configured slots.
5. Launch every configured browser independently of requests. Prepare its isolated context, blank page, toolset, and journey toolset.
6. Confirm browser and page responsiveness. Publish a slot only after its entire preparation succeeds.
7. Answer `initialize` successfully only after every configured slot is prepared. Normal legacy operation begins after `notifications/initialized`.

A configured spare that cannot start is a startup failure. Silently accepting a smaller pool would conceal a broken configured capability under D4. After successful initialization, a later failure may temporarily reduce capacity while recovery proceeds.

The installed MCP package cannot implement this through its existing request event: legacy `initialize` returns directly from `MCPLegacy`, and notifications return before its switch. Its initialization result advertises only `tools`. (`node_modules/@orkestrel/mcp/dist/src/core/index.js:4745`; `../mcp/src/core/MCPLegacy.ts:129`; `../mcp/src/core/helpers.ts:1192`.)

Under D9, add these mechanisms to `@orkestrel/mcp`:

- An optional asynchronous initialization callback, outside emitter hooks, that receives the request lifetime and may refuse initialization with a structured JSON-RPC error.
- Per-connection initialization state. Do not store one client's initialization state on a dispatcher shared by unrelated HTTP sessions.
- A transport completion observation that distinguishes a response successfully written from a response merely constructed. Browse uses it to finish an initialization error before terminating.
- A transport closure signal available to the resource owner, including input and output failure.

The callback awaits setup that `start()` already began. It must not start setup itself. Browse also gates its modern execution path on the same readiness state; modern requests bypass the legacy adapter. (`../mcp/src/core/MCPLegacy.ts:90`.)

Use an implementation-defined server error, such as `-32000`, with a stable application code in `error.data`, for setup failure. Do not label a missing executable as invalid initialization parameters. Return the error using the original request ID, write a concise diagnostic to stderr, then tear down and exit unsuccessfully after the response write completes or its bounded egress deadline expires. When no initialization request arrived, stderr and process exit are the available onset signals.

The protocol permits initialization errors, defines initialization before normal operation, and permits stdio shutdown through output closure and exit. Waiting for setup preserves that ordering; it does not extend a client's deadline. See the [MCP lifecycle specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle).

The alternatives have these consequences:

| Candidate | Protocol and correctness ruling | Failure visible to the user |
|---|---|---|
| Launch before starting stdio | Conforming, but cannot answer an initialization error while launch is pending. Client timeout includes all launch work. Reject as the preferred design. | Startup failure, disconnect, or timeout; precise presentation requires client proof. |
| Start stdio, await readiness in `initialize` | **Select.** Produces a correlated startup error and prevents successful initialization of a broken configured pool. | Initialization failure with a stable diagnostic, subject to client presentation. |
| Answer initialization immediately; exit if launch fails | Conforming shutdown, but establishes a successful connection before readiness. Reject for D4. | A connected server subsequently disappears. |
| Answer immediately; refuse tools until ready | Can preserve protocol ordering, but discovers failure through use. Reject for D1/D4 if calls also launch or relaunch. | A tool error after discovery appeared successful. |
| Answer immediately; send logging on failure | Logging can supplement diagnostics but cannot replace failed initialization. Reject as the onset mechanism. | Client-dependent logging display, potentially invisible in the conversation. |
| Advertise an empty tool list, then add tools | Makes browser readiness depend on capability refresh behavior. Reject for this fixed vocabulary. | Temporary absence of tools; clients may retain an earlier catalog. |

If logging is added, implement the advertised capability, notification delivery, and `logging/setLevel` together. The logging specification requires capability declaration and leaves presentation to clients. Do not depend on logging before the initialization response; queue diagnostics until capabilities are declared, or use stderr. See [MCP logging](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging).

Client startup constraints are:

| Client | Documented constraint | Design consequence |
|---|---|---|
| Claude Code | Startup timeout defaults to 30 seconds through `MCP_TIMEOUT`; connection normally runs in the background. A separate blocking-startup wait can expire while connection continues. | Measure connection completion, not merely whether the first prompt appeared. See [environment variables](https://code.claude.com/docs/en/env-vars). |
| Codex | Startup defaults to 10 seconds; `startup_timeout_sec` or its millisecond alias changes it. `required = true` makes initialization failure fail startup/resume. Tool timeout defaults to 60 seconds. | This is the tightest documented default in the supplied client set. Optional catalog timing is distinct from successful initialization. See [configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference). |
| Cursor | The supplied evidence establishes no startup timeout. Documentation describes chat/tool errors and MCP Logs. | Do not invent a budget or exact initialization-error presentation. Test the supported client version. See [Cursor MCP documentation](https://cursor.com/docs/mcp). |

Claude Code documents `/mcp` failure status and no automatic reconnection for stdio servers. Initialization failure therefore needs a useful diagnostic; process exit is not an automatic recovery strategy. Exact rendering of a launch-specific initialization error remains an acceptance test for every client. See [Claude Code MCP documentation](https://code.claude.com/docs/en/mcp).

The browser's default timeout is 30 seconds, and launch, socket establishment, and subsequent commands can each consume their own deadlines. It is not an end-to-end startup budget. (`src/server/Browser.ts:509`; `src/server/Browser.ts:645`; `src/server/Browser.ts:727`; `src/core/CDPClient.ts:134`.)

Add one aggregate startup deadline covering sweep, launch, preparation, and readiness. Derive its default from contended measurements and leave time for the error response before the supported client budget expires. If realistic startup cannot fit the Codex default, document the measured required client configuration. Do not answer success early to conceal the mismatch.

**2. Detect failures from events and bounded commands**

Subscribe before connecting, and retain subscriptions through cleanup.

The existing signals are sufficient to begin supervision, but not to claim continuous health:

- Owned-child exit emits a connection error with `cause: 'process-exit'`, followed by `disconnect` and `idle` when previously connected. Exit code and signal are discarded by the established-process handler. (`src/server/Browser.ts:388`.)
- Socket loss emits `cause: 'transport-loss'`. The implementation defers confirmation briefly to distinguish process exit. (`src/server/Browser.ts:422`; `src/server/Browser.ts:444`.)
- Renderer failure emits page `crash` from `Inspector.targetCrashed`; it does not close the page. The toolset watches dialog, popup, and close, without subscribing to crash. (`src/core/BrowserPage.ts:368`; `src/core/BrowserPage.ts:1904`; `src/core/BrowserToolset.ts:2044`.)
- A CDP deadline rejects its request without invalidating browser readiness. (`src/core/CDPClient.ts:134`.)

Add a typed timeout observation at the CDP boundary, carrying the method and session, so supervision does not parse tool error prose. On that event, stop admitting work to the affected slot and perform a bounded diagnostic challenge. Distinguish a browser-level response from the affected renderer's response.

A failed application wait is not automatically a dead browser. A caller abort is not a crash. If the diagnostic challenge succeeds, retain the session and return the original operation failure. If browser or renderer responsiveness remains unconfirmed, invalidate the lease and recover.

Challenge an idle slot before assigning it, and challenge a spare before promotion. This incurs a bounded health-check cost, never a browser launch inside acquisition. A challenge can still be followed immediately by a crash; generation validation and lease cancellation handle that race.

**No periodic heartbeat belongs in this proposal.** With no request outstanding and no failure event, an idle hang remains undetected until the next challenge. A scheduled heartbeat would bound detection delay, but would be polling and would still not prove instantaneous responsiveness. D7 must describe observed health and bounded failure detection, rather than an impossible continuous fact.

The existing process-group drain contains a bounded interval loop because it lacks an exit event for the remainder. That is explicit source evidence, not authority for adding an idle health poll. Audit its necessity and scope in the cleanup unit. (`src/server/Browser.ts:1085`.)

**3. Recover a generation, with explicit state loss and no action replay**

Treat each slot incarnation as a generation. A fault synchronously invalidates that generation before asynchronous cleanup begins.

For browser exit, persistent transport loss, or unresponsive-browser diagnosis:

- Abort every lease and admitted call belonging to the failed generation.
- Withdraw its dynamic tools.
- Destroy its toolset and journey toolset.
- Terminate the owned process tree and confirm release.
- Remove its owned profile only after termination is confirmed.
- Create a fresh browser, profile, context, page, and toolset outside request execution.
- Publish the replacement only if the pool remains open and the attempt still owns that slot generation.

For a renderer-only crash, invalidate the affected browsing session and rebuild its context, pages, and toolsets after a successful browser-level challenge. Escalate to process replacement when that challenge or context cleanup fails. Do not automatically reload the crashing address.

Rebuilding only `Browser` is insufficient. The toolset retains its context and page, reading, watches, adopted tools, and turn chain; the journey toolset retains recording and replay state. Teardown drops that in-memory state. (`src/core/BrowserToolset.ts:205`; `src/core/BrowserToolset.ts:228`; `src/core/BrowserToolset.ts:1334`; `src/core/BrowserToolset.ts:2075`; `src/core/BrowserJourneyToolset.ts:595`.)

Saved journeys and completed runs survive because their stores remain under the same root. Unsaved recording, active replay progress, cookies in the abandoned isolated context, tabs, dialogs, retained readings, and element references do not survive. Existing replay operates on the same toolset and claims it before awaiting work. (`src/server/BrowserMCPServer.ts:236`; `src/server/stores/FileBrowserJourneyStore.ts:98`; `src/core/BrowserJourneyToolset.ts:439`.)

Return a stable failure such as `BROWSER_SESSION_LOST`, including that an interrupted action may already have taken effect. Never resend a click, submission, navigation, or replay step automatically.

After recovery, the first receipt must state that the session was replaced and starts at a blank page. Refuse queued reference-dependent work from the preceding generation; require fresh observation before further interaction. Do not restore the last address automatically: loading it can repeat effects, encounter missing authentication, or reproduce the crash.

Element-reference identity needs an additional repair. A context starts its reference counter at zero and increments it locally, so replacing the context can reuse an earlier reference spelling. A generation check on queued calls does not prevent a later request from supplying that old spelling. Use a pool/session-owned allocator that never reuses references during the MCP connection, threaded through context creation. (`src/core/BrowserContext.ts:71`; `src/core/BrowserContext.ts:293`; `src/core/BrowserContext.ts:348`.)

The error code must survive the wire boundary. Throwing a coded `BrowserError` alone does not achieve that: the installed tool manager retains only the error message, and MCP exposes that string as an error content block. Format the browse failure code explicitly in its tool result before that projection. (`node_modules/@orkestrel/tool/dist/src/core/index.js:285`; `node_modules/@orkestrel/mcp/dist/src/core/index.js:5793`; `src/server/BrowserMCPServer.ts:192`.)

Bound recovery with owner-granted replacement credits. For the initial implementation, allow a replacement attempt per configured slot during an owner lifetime. Consume credit before launching, including failed launches; neither successful blank-page readiness nor incoming calls replenish it. This permits recovery from a transient loss without allowing a repeatedly failing executable to restart indefinitely on a constrained host. Retire a slot when its credit is exhausted; retain healthy capacity and report degradation. Explicit owner restart creates a fresh lifetime.

The credit limit is a conservative safety policy, not a performance measurement. Expose it through the library contract; choose any larger browse default only from observed operational need. Permanent setup failures—missing executable, refused profile ownership, or storage failure—do not consume repeated automatic attempts.

The important interleavings resolve as follows:

| Race | Required resolution |
|---|---|
| Call arrives during recovery | Return a coded unavailable/session-loss result promptly. It neither launches nor waits for a replacement. |
| Call was queued before a crash | Bind it to the admitted generation; refuse it after invalidation. |
| Process exit, socket close, and renderer crash overlap | One invalidation and one cleanup promise per generation. Later observations may enrich diagnostics but cannot launch another replacement. |
| Replacement crashes before publication | Fail that attempt, clean its resources, and consume its credit. Never publish it. |
| Promoted spare crashes while another slot recovers | Invalidate the promoted lease independently. Use only already-ready eligible capacity; otherwise refuse work. |
| Old attempt finishes after replacement or shutdown | Generation/attempt identity prevents publication. Clean the late result. |
| Holder releases an invalidated lease | Idempotent release of that lease only; it cannot free a successor's slot. |
| Crash occurs during teardown | Closing state suppresses replacement. The event helps settle the existing cleanup. |
| Signal or stdin closure occurs during eager launch | Abort setup, prevent publication, and join all partially acquired resources. |
| Initialization response races with failure | Readiness is checked at response commitment; a later failure is a runtime loss. No handshake can promise future availability. |

**4. Use a small process pool with session leases**

Use separate browser processes. Contexts provide session isolation but share the browser's process failure domain; `isolate()` sends `Target.createBrowserContext`, not a process launch. (`src/server/Browser.ts:196`.)

Support a fixed integer capacity from one through three. Compare an eager single-browser baseline with a two-browser candidate before retaining the spare. A third browser requires evidence that the extra capacity improves the realistic workload without unacceptable host contention. Never exceed configured capacity, including while draining a failed process.

Keep supervision in one pool class with per-slot records. Avoid a second public supervisor hierarchy unless an independent consumer requires it.

Assign exclusive session leases to ready slots in rotating order. Because each slot admits an exclusive holder, selection needs no predictive scheduler or load score. Reject acquisition when eligible capacity is unavailable; do not create an unbounded wait queue.

A lease records:

- Holder identity, lease identity, slot identity, and generation.
- The prepared context and page.
- A lifetime signal and an idempotent release operation.

The server keeps its interactive lease across tool calls. Releasing after every call would let `look` and `click` reach different contexts, invalidate tab semantics, and discard session state. The existing server exposes one browsing session; its toolset serializes actions and replay shares that same session. (`src/server/BrowserMCPServer.ts:85`; `src/core/BrowserToolset.ts:1334`; `src/core/BrowserJourneyToolset.ts:449`.)

Therefore, balancing applies to **independent session leases**, not individual actions within one session. A reusable pool can balance independent test holders. In browse's existing vocabulary, the spare primarily serves failover. The existing replay tool cannot be silently moved to it while preserving behavior.

Do not claim parallel replay acceleration in the first pool result. An explicitly isolated replay capability would need its own contract and proof. It is unnecessary to prove eager launch and recovery.

A failed holder releases through its required lifetime signal; server-owned execution also uses `finally`. Signal cancellation revokes admission immediately, but the slot becomes reusable only after outstanding work is settled or its context is destroyed. A timeout race alone does not stop the underlying action.

The spare is warm at startup through context, page, and browse-toolset readiness. Promotion assigns that prepared session. Replenishment follows the loss/release event under owner control. If the only spare is leased to an independent workload, instant failover capacity is no longer available; report that fact rather than overcommitting it.

The proposed slot state machine is:

```text
idle → warming → ready
          │         │
          │         ├─ acquire/release: lease record changes
          │         ├─ diagnostic needed → checking → ready
          │         │                         │
          └─ fault ─┴─────────────────────────┴→ recovering
                                                    │
                                     cleanup confirmed + credit
                                                    ↓
                                                 warming
                                                    │
                                       no credit / permanent fault
                                                    ↓
                                                 retired

Every state → stopping → stopped
```

“Busy” is derived from a ready slot's lease record. “Recovering” means the old generation is invalid and cleanup/replacement is owned. “Retired” stops automatic replacement but does not imply that failed cleanup disappeared. `stopped` requires confirmed release; teardown rejection retains the ownership evidence.

**5. Place mechanisms in the library and policy in browse**

Put the reusable pool, leases, observation, ownership records, safe profile reclamation, and cleanup in `src/server`. Keep environment parsing, interactive-session affinity, toolset mirroring, onset diagnostics, and receipt wording in `BrowserMCPServer` and the bin entry.

The illustrative public contract uses existing server terminology:

```ts
export type BrowserPoolPhase =
	| 'idle'
	| 'warming'
	| 'ready'
	| 'checking'
	| 'recovering'
	| 'retired'
	| 'stopping'
	| 'stopped'

export interface BrowserPoolLaunchOptions {
	readonly executable?: string
	readonly headless?: boolean
	readonly args?: readonly string[]
	readonly viewport?: BrowserViewport
}

export interface BrowserPoolDeadlineOptions {
	readonly startup: number
	readonly check: number
	readonly cleanup: number
}

export interface BrowserPoolRecoveryOptions {
	readonly attempts: number
}

export interface BrowserPoolOptions {
	readonly root: string
	readonly size: number
	readonly browser?: BrowserPoolLaunchOptions
	readonly deadline: BrowserPoolDeadlineOptions
	readonly recovery: BrowserPoolRecoveryOptions
	readonly signal?: AbortSignal
	readonly on?: EmitterHooks<BrowserPoolEventMap>
	readonly error?: EmitterErrorHandler
}

export interface BrowserPoolSlot {
	readonly id: string
	readonly generation: number
	readonly phase: BrowserPoolPhase
	readonly pid: number | undefined
	readonly endpoint: string | undefined
	readonly profile: string | undefined
	readonly lease: string | undefined
}

export interface BrowserLeaseOptions {
	readonly holder: string
	readonly signal: AbortSignal
}

export interface BrowserLeaseInterface {
	readonly id: string
	readonly holder: string
	readonly slot: string
	readonly generation: number
	readonly context: BrowserContextInterface
	readonly page: BrowserPageInterface
	readonly signal: AbortSignal
	destroy(): Promise<void>
}

export type BrowserPoolEventMap = {
	readonly ready: readonly [slot: BrowserPoolSlot]
	readonly loss: readonly [slot: BrowserPoolSlot, error: unknown]
	readonly retire: readonly [slot: BrowserPoolSlot, error: unknown]
	readonly error: readonly [error: unknown]
	readonly destroy: readonly []
}

export interface BrowserPoolInterface {
	readonly emitter: EmitterInterface<BrowserPoolEventMap>
	slots(): readonly BrowserPoolSlot[]
	start(): Promise<void>
	acquire(options: BrowserLeaseOptions): Promise<BrowserLeaseInterface>
	destroy(): Promise<void>
}
```

Treat the sketch as contract direction, not checked declarations. The first implementation must also define the browser endpoint observation, bounded health operation, timeout observation, and context reference allocator in their owning `types.ts` files.

`BrowserInterface` exposes a PID but no endpoint getter; the endpoint is private. Expose the actual owned endpoint rather than rediscovering port 9222. (`src/server/types.ts:227`; `src/server/Browser.ts:82`; `src/server/Browser.ts:138`.)

The pool owns fresh profiles and ephemeral ports. Its launch options intentionally do not accept a caller's persistent profile or arbitrary attachment endpoint.

Repair the fresh-launch port behavior before pooling. Browse passes `discover: false` without a port; `Browser` consequently probes default port 9222, while the spawned process requests port zero. An unrelated CDP endpoint can therefore prevent an otherwise independent launch. Skip fixed-port occupancy probing when the requested launch port is ephemeral. Preserve explicit fixed-port refusal and verify endpoint ownership after launch. (`src/server/BrowserMCPServer.ts:225`; `src/server/Browser.ts:112`; `src/server/Browser.ts:320`; `src/server/Browser.ts:543`; `src/server/helpers.ts:363`.)

Add grouped pool configuration to `BrowserMCPServerOptions`, with validated bin variables such as `BROWSE_POOL` and `BROWSE_TIMEOUT`. Retain the existing root, executable, headless, and readonly controls. Their present parsing is in `src/bin/main.ts:6`.

Do not offer lazy browse mode: it contradicts D1. A library host controls eagerness by deciding when to call `pool.start()`, or by using the existing direct `Browser` API. A browse host disables the configured server to avoid launch.

Reuse declared emitter and contract capabilities. The mapped queue, timeout, abort, and process packages are installed transitively but are not direct runtime dependencies in this package. Do not import them implicitly or add dependencies under this read-only assignment. (`package.json:104`.) Native abort composition is already used by `Browser`; the queue's retry mechanism does not replace generation supervision, and the timeout package's parent signal clears its timer without aborting its own signal. (`src/server/Browser.ts:364`; `node_modules/@orkestrel/queue/dist/src/core/index.d.ts:75`; `node_modules/@orkestrel/timeout/dist/src/core/index.d.ts:7`.)

**Cleanup ownership is part of the pool contract**

The resource inventory and acceptance requirements are:

| Resource | Required release and proof |
|---|---|
| Browser process, launcher handoff, descendants | Confirm the serving process and owned descendants are gone before removing the profile or opening replacement capacity. |
| CDP listener port | Confirm the recorded endpoint no longer accepts connections after termination. Never close an unrelated listener discovered on a default port. |
| Profile and ownership record | Remove only verified pool-owned paths after process release. Retain recoverable evidence if removal fails. |
| Contexts, targets, workers, toolsets | Stop admission, abort leases, finish bounded toolset teardown, and dispose remote contexts when the browser remains reachable. |
| CDP socket and pending requests | Close the socket; reject pending work; remove timers and abort listeners. |
| Process, stream, page, pool, and signal listeners | Remove every installed listener, including failed setup paths and late completions. |
| Recovery/check/cleanup timers | Cancel or settle every owner timer when the slot or pool ends. |
| Journey/run files | Preserve committed artifacts; report failed final writes separately from browser cleanup. |

The existing code cannot serve as proof of that contract:

- Server teardown catches browser-destruction failure and still removes the profile. Failed-launch cleanup also swallows destruction failures before removal. (`src/server/BrowserMCPServer.ts:157`; `src/server/BrowserMCPServer.ts:251`.)
- Windows termination signals the serving PID or child directly and relies on Chromium taking its descendants down. That assumption needs real process-tree evidence. (`src/server/Browser.ts:1060`.)
- The termination path can accept an unknown remainder result on its final attempt. Unknown is not proof of absence. (`src/server/Browser.ts:1113`.)
- `context.destroy()` releases local resources; `context.close()` also disposes the remote context. Lease release must choose deliberately. (`src/core/BrowserContext.ts:352`; `src/core/BrowserContext.ts:365`.)
- Endpoint reading retains stream listeners to drain stderr. Cleanup must explicitly account for their full lifetime. (`src/server/helpers.ts:389`.)
- The transport-loss confirmation timer is not retained for cancellation; its callback merely checks state when it fires. (`src/server/Browser.ts:441`.)

Bound teardown as a whole. Do not allow sequential per-context CDP deadlines to postpone process termination indefinitely. Attempt every independent release despite preceding errors, aggregate failures, and retain ownership records until their resources are confirmed released.

For killed-server reclamation, create a durable owner record **before any spawn**. Record a unique owner identity, process identity stronger than a bare PID, slot/generation, executable, profile, and later the endpoint and serving process. Persist the intent before acquisition so a kill between spawn and recording its PID remains recoverable.

At the next start:

1. Claim reclamation exclusively.
2. Validate containment and refuse symlinks/reparse-point escapes.
3. Establish that the recorded owner is dead; PID reuse must not identify a different process as the owner.
4. Locate and verify any surviving browser associated with that owned profile, including an incomplete-launch record.
5. Terminate only the verified owned process tree.
6. Confirm release, remove the profile, then remove the ownership record.

Concurrent live servers sharing the root remain untouched. Existing UUID profile directories contain no such ownership metadata, so ambiguous legacy directories cannot be safely deleted merely because they are old. Report those separately; do not claim the new sweep proves ownership retroactively. (`src/server/BrowserMCPServer.ts:212`.)

If process identity cannot be established on a supported host, leave the candidate intact and report cleanup failure. Immediate cleanup after killing every process in the ownership tree remains outside an in-process guarantee.

**Failure table**

The action and caller columns describe the proposal. Existing observations and gaps are cited separately.

| Failure | Existing signal or gap | Pool action | Caller sees |
|---|---|---|---|
| Launch refused | Nonzero launch exit, stderr ending before readiness, or launch deadline. (`src/server/Browser.ts:735`; `src/server/Browser.ts:785`; `src/server/helpers.ts:411`.) | Clean the partial attempt; fail startup. During recovery, consume the attempt and retire when exhausted. | Initialization error, or coded unavailable state after a runtime loss. |
| Executable missing | No discovered executable produces an explicit error; supplied missing path fails through spawn/readiness handling. (`src/server/Browser.ts:616`; `src/server/Browser.ts:629`; `src/server/Browser.ts:766`.) | Permanent setup failure; no call-driven retry. | Diagnostic naming executable failure before successful initialization. |
| Port 9222 occupied | HTTP success from `/json/version` causes refusal, even though browse requests an ephemeral launch port. (`src/server/Browser.ts:543`; `src/server/helpers.ts:363`.) | Repair ephemeral semantics; preserve refusal only for an explicitly requested conflicting fixed port. | No failure caused by unrelated 9222 occupancy after repair. |
| Established browser exits | `process-exit`, disconnect, idle; exit code/signal omitted. (`src/server/Browser.ts:388`.) | Invalidate generation, fail admitted work, clean and replace under budget. | `BROWSER_SESSION_LOST`; subsequent receipt explains replacement. |
| Socket drops while process lives | `transport-loss`; pending CDP calls reject. (`src/server/Browser.ts:444`; `src/core/CDPClient.ts:288`.) | Invalidate session; terminate the old owned browser before replacement. | Session-loss error; no assertion that an interrupted action did nothing. |
| Renderer crashes | Page `crash`; no existing supervisor consumer. (`src/core/BrowserPage.ts:1904`; `src/core/BrowserToolset.ts:2044`.) | Rebuild affected session after browser challenge; escalate if unhealthy. | Renderer/session-loss error and fresh observation requirement. |
| Browser lives but stops answering | Outstanding CDP request times out; no independent idle-hang signal. (`src/core/CDPClient.ts:134`.) | Quarantine, diagnose, then retain or replace. Idle detection waits for a challenge. | Bounded timeout or unavailable result. |
| Application operation is slow | Per-call CDP timeout exists, but timeout alone does not establish process death. (`src/core/CDPClient.ts:134`.) | Return the operation failure; recover only on failed health diagnosis. | Operation timeout without unnecessary session destruction. |
| Profile directory locked | No dedicated profile-lock classifier. A fresh-profile `mkdir` may reject; Chromium can exit or fail readiness. (`src/server/BrowserMCPServer.ts:217`; `src/server/Browser.ts:721`.) | Refuse sharing/deleting a live profile. Preserve bounded diagnostic context. | Launch/profile failure; exact classification only when evidence supports it. |
| Disk full during setup | Filesystem operations reject; no pool storage classification exists. (`src/server/BrowserMCPServer.ts:212`.) | Stop setup and further launches; retain cleanup evidence where possible. | Initialization storage error. |
| Disk full during journey/run write | Store writes reject and translate errors; `ENOSPC` has no dedicated branch. (`src/server/stores/FileBrowserStore.ts:141`; `src/server/stores/FileBrowserStore.ts:342`.) | Fail the write; do not restart a healthy browser. Preserve the preceding committed artifact. | Storage failure, not a successful save/run receipt. |
| Stdin ends during launch | Browse subscribes to `end`; owner abort reaches launch. (`src/server/BrowserMCPServer.ts:136`; `src/server/BrowserMCPServer.ts:155`.) | Join startup cleanup; prevent readiness publication. Add close/error coverage. | Connection ends; no later launch or response. |
| Signal during launch/teardown | Browse installs SIGINT/SIGTERM handlers; teardown removes them at its beginning. (`src/server/BrowserMCPServer.ts:137`; `src/server/BrowserMCPServer.ts:147`.) | Enter closing once, abort setup/recovery, join cleanup. Handle forced-kill aftermath through reclamation. | Normal termination where handled; otherwise disconnected server. |
| Server killed without cleanup | Profile creation records no durable owner; no startup sweep exists in launch. (`src/server/BrowserMCPServer.ts:211`.) | Next start reclaims verified orphan resources. | Lost connection; reclamation failure is an onset error on restart. |
| Cleanup cannot confirm termination | Library can throw after kill escalation; server still attempts profile removal. (`src/server/Browser.ts:1139`; `src/server/BrowserMCPServer.ts:160`.) | Retain ownership and profile; suppress replacement that would exceed capacity. | Explicit cleanup failure and reduced/unavailable capacity. |

**6. Prove the behavior with real Chromium**

Keep lifecycle tests that require independent launches. Do not move all of `tests/service/browser.test.ts` onto a shared browser in this change: that file explicitly tests launch, persistent profiles, transport loss, and termination, with destruction after each lifecycle case. Sharing would weaken their isolation. (`tests/service/browser.test.ts:66`; `tests/service/browser.test.ts:197`; `tests/service/browser.test.ts:228`; `tests/service/browser.test.ts:393`.)

Add service proofs for the pool and eager MCP owner:

- Connect a real MCP client and prove browser/context/toolset readiness precedes successful initialization and the first tool call.
- Kill the recorded real Chromium process. Prove the admitted action fails, no automatic replay occurs, the spare can be promoted, and replacement starts without another tool call.
- Kill the replacement before readiness; overlap process exit and socket closure; crash during teardown.
- Drop a real browser's proxied CDP connection. The existing service file already exercises real Chromium through a raw TCP proxy. (`tests/service/browser.test.ts:393`.)
- Crash a real renderer through CDP and prove the browser/session distinction.
- Suspend a real browser where the host supports it. Separately use a transport that blackholes a real connection to prove deadline behavior. Do not present blackholing as proof of an internally hung Chromium.
- Close stdin before launch completion and immediately after endpoint publication. Exercise handled POSIX signals and forced Windows termination independently.
- Verify old reference strings cannot select replacement elements.
- Release, abort, and invalidate leases concurrently; prove stale releases cannot free a successor lease.
- Kill the server, restart on the same root, and verify orphan process, endpoint, profile, and ownership-record reclamation. Keep a second live server on that root as the negative control.
- Exercise profile locking and disk exhaustion on disposable real host resources. Report unavailable host facilities explicitly; do not replace these claims with a fake browser or pretend filesystem.
- Verify listener and handle baselines after failed setup, recovery, normal destruction, and failed destruction.

Change the lazy-start assertions in `tests/src/server/BrowserMCPServer.test.ts:34`, `:71`, and `:122`. The bin tests also deliberately initialize successfully with a missing executable; replace those expectations with onset failure. (`tests/src/bin/main.test.ts:34`; `tests/src/bin/main.test.ts:73`.)

Use protocol-faithful peers for MCP ordering and response-write races, but real Chromium for browser ownership and recovery claims. Run the service project explicitly: `npm test` does not include it, while the publication chain does. (`package.json:79`; `package.json:96`; `package.json:98`.)

**7. Keep Playwright endpoint reuse a separate proved boundary**

A CDP endpoint is not a Playwright browser-server endpoint. Playwright documents `connect()` for its browser-server protocol and `connectOverCDP()` for Chromium CDP, with different fidelity. See [Playwright BrowserType](https://playwright.dev/docs/api/class-browsertype).

The supplied map identifies `launchServer()` as a prelaunched-browser server, while the ordinary `run-server` path launches per connection. It also identifies default Chromium pipe transport and distinguishes the Playwright WebSocket URL from a DevTools URL. (`../scaffold/.orkestrel/veneer/lifecycle/eager/map.md:132`; `../scaffold/.orkestrel/veneer/lifecycle/eager/map.md:136`; `../scaffold/.orkestrel/veneer/lifecycle/eager/map.md:138`.)

Ruling:

- Reuse the pool's ownership, readiness, lease, and recovery concepts for test browsers.
- Do not set `PLAYWRIGHT_WS_ENDPOINT` to the pool's CDP URL.
- Do not replace browse's launcher with Playwright merely to serve that variable.
- Let `ws-endpoint-probe` establish the runner's actual connection path, whether concurrent clients share the process with isolated contexts, what client close releases, whether dual Playwright/CDP access works, and how a restarted endpoint reaches consumers.
- Treat a browser restart as invalidating existing Playwright handles. A warm replacement does not transparently repair them.

No completed result from that probe was supplied, so cross-protocol process sharing remains unproved.

**8. Carry the lifecycle boundary to probe without designing its workers**

Carry over eager owner setup, readiness-gated initialization, correlated onset failure, event-triggered replacement, bounded recovery, and teardown that joins setup in flight.

These match probe roadmap item 1. Its server starts transport separately from lazy `Probe` construction, and the constructor begins arming stages. (`../probe/ROADMAP.md:5`; `../probe/src/server/ProbeServer.ts:105`; `../probe/src/server/ProbeServer.ts:234`; `../probe/src/server/Probe.ts:159`.)

Do not transfer browser capacity, lease affinity, profile reclamation, or Chromium failure classification into probe. Its stages require their own ownership decisions.

**Measure the eager start and spare before retention**

Compare the existing lazy behavior, eager single-browser behavior, and eager pool candidate using the same executable, fixture application, host, and client versions.

Measure these boundaries separately:

- Client spawn to initialization response.
- Server start to executable spawn, endpoint announcement, CDP connection, page readiness, toolset readiness, and complete pool readiness.
- First useful tool receipt and steady-state action latency.
- Crash observation to lease invalidation, spare promotion, usable receipt, old-tree release, and restored configured capacity.
- Shutdown and next-start orphan reclamation.
- Whole-process-tree memory, idle CPU, handles/file descriptors, disk footprint, and endpoint count.

Use realistic workloads: large document reading, application navigation with scripts and network activity, tabs and popups, long journey replay, and concurrent developer work that competes for CPU, memory, and disk. Include cold executable/filesystem caches, warm caches, and repeated server connections. Measure the actual constrained Windows and Linux host classes the result claims.

Separate deliberate fault-injection measurements from normal-session benefit. Injected crashes reveal recovery cost; they do not establish how often users benefit.

Retain the spare only when the measured reduction in recovery interruption or supported independent-work delay outweighs its startup and steady-state cost on the target host. Account for memory pressure and contention slowing the active browser. A faster failover that makes ordinary work materially worse fails the case.

Choose sample size from observed variability and the precision needed to decide. Report distributions and uncertainty. Do not fix a millisecond saving, memory allowance, or speedup threshold before the workload establishes the tradeoff. If evidence does not support the spare, keep eager launch and supervision at capacity one and report that D3 did not justify retention.

**Bounded units in commit order**

Each unit ends with its stated proof; later units depend on those results.

| Unit | Scope | Acceptance proof |
|---|---|---|
| MCP initialization mechanism | `../mcp/src/core/types.ts`, legacy adapter, transport/session lifecycle, corresponding tests | Deferred success; structured refusal; ping during setup; disconnected client; independent connections; response written before owner shutdown; unchanged default behavior without the hook. |
| Browser ownership and launch corrections | Server types, `Browser`, process/profile helpers, error observations | Ephemeral launch beside an occupied 9222; explicit-port conflict; missing executable; launcher handoff; confirmed tree termination; retained ownership on failed cleanup. |
| Durable profile reclamation | Ownership records, safe path validation, startup sweep | Kill at acquisition boundaries; recover incomplete spawn records; refuse PID reuse and unsafe paths; preserve live concurrent owners; remove verified orphans. |
| Pool and lease engine | Types first, pool implementation, factory/barrel, mirrored and service proofs | Fixed capacity; eager preparation; exclusive leases; event-driven recovery; finite replacement budget; no publication after stop; no reuse before cleanup. |
| Browse session recovery | MCP server integration, generation-bound dispatch, reference allocator, dynamic tools, receipts | Real crash during action; no action replay; no stale-reference alias; fresh receipt; saved artifacts survive; old mirrors disappear. Coordinate core-file edits after the writer named by the brief finishes. |
| Eager bin and client integration | Bin configuration, initialization gate, diagnostics, bin/service tests | Startup success and failure through each supported client; stdin and signal races; no orphan resources; explicit evidence for undocumented client presentation. |
| Measurement and retention | Realistic workload instrument and recorded decision | Contended eager-start and spare measurements; selected capacity justified by their result; no claimed result from an unrun benchmark. |
| Documentation and acceptance | Guides, public-contract parity, scoped review and gates | Source/type/guide agreement; independent audit of lifecycle claims; explicit service run and both-host cleanup evidence before publication. |

Publish the MCP change before browser re-pins and publishes against it, as D9 requires. Publishing is a release step, not part of this read-only assignment.

**Rejected alternatives**

The proposal rejects these additional alternatives:

- **Per-tool round-robin:** breaks browsing-session continuity.
- **Contexts as crash spares:** share the browser-process failure domain.
- **Automatic action replay:** cannot establish whether the interrupted action already took effect.
- **Automatic last-address restoration:** can repeat effects or reproduce the failure.
- **Reconnect the existing toolset after socket loss:** retains invalid page, context, reading, and adopted-tool state.
- **Unbounded restart or call-driven relaunch:** conceals persistent failure and adds resource pressure.
- **Periodic readiness polling:** conflicts with the no-polling law and still cannot prove continuous health.
- **A PID-only or age-only orphan sweep:** can terminate unrelated processes or delete live profiles.
- **Delete profiles despite uncertain termination:** destroys ownership evidence and risks interfering with a live browser.
- **Raise client timeouts without measurement:** hides startup cost without demonstrating an acceptable host workload.
- **Share all lifecycle tests:** weakens tests whose subject is independent launch and release.
- **Add parallel replay solely to justify the spare:** expands behavior before the requested availability case has been measured.
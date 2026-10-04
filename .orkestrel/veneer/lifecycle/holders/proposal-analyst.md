# Proposal — analyst lane (GPT-6 Astra), parallel holders

Read-only codex exec, 2026-10-04, brief `scaffold/tmp/codex/holders-analyst-brief.md` over `holders/design-brief.md`; 505 s; containment clean.

Recommend explicit holder handles, a browser lease per holder, destruction when a holder ends, and pool corrections before browser item 14 ships. Keep the default size at `1` until the contention measurement supports another ruling.

This is a read-only proposal. No file was changed, and no server, browser, test, build, install, or measurement was started. Paths below are relative to `C:/Users/mikes/WebstormProjects/`. The recorded heads match the checked-out branch references: `browser/.git/refs/heads/main:1`, `pool/.git/refs/heads/main:1`, `mcp/.git/refs/heads/main:1`, and `probe/.git/refs/heads/main:1`. That verifies the references, not the absence of working-tree edits.

**1. Who a holder is.** A holder represents a stateful browser interaction, addressed by an opaque handle. It is neither a JSON-RPC request nor an inferred agent identity.

The execution context supplies a request, tool call, signal, and optional consumer-asserted `caller`; it supplies no authenticated subagent identity. The stdio binder passes only a request signal. Request identifiers therefore cannot identify a browser holder across calls. Evidence: `mcp/src/core/types.ts:865`, `mcp/src/core/types.ts:1716`, and `mcp/src/core/helpers.ts:1883`.

Serve these consumers:

| Consumer | Ruling |
|---|---|
| Subagents reaching the same configured server | Each independent interaction acquires a handle. Pass that handle on subsequent calls. Sharing a handle intentionally shares browser state. |
| Parallel tool calls in one turn | Calls carrying different handles can run on different browsers. Calls using the same handle retain the toolset’s existing action queue and observation behavior. |
| Replay beside interactive work | Acquire another holder and replay there. A replay does not silently relocate itself from its selected holder. |
| Library consumers and service tests | Acquire holder objects directly from the server library’s browser owner. |
| Several HTTP sessions | Leave transport integration outside item 14. The holder mechanism can support a later session adapter, but the shipped `browse` entry remains stdio. |

The existing action queue is per toolset, and replay reserves that toolset. Separate leases therefore provide the required separation without changing the browser action scheduler. Evidence: `browser/src/core/BrowserToolset.ts:448`, `browser/src/core/BrowserToolset.ts:569`, `browser/src/core/BrowserToolset.ts:1349`, and `browser/src/core/BrowserReplay.ts:84`.

Treat the client inventory as conditional evidence. `holders/clients.md:8` generalizes a reported remote-connector failure into a shared-connection claim, while `:22` explicitly leaves the stdio process model unknown. Configuration inheritance at `:10` does not establish process sharing; `:24` records that uncertainty. Cursor remains unverified at `:25`. These sources were not fetched during this disk-only assignment. The implementation must work when calls reach the same process; it cannot make a client share that process or issue concurrent calls.

Also narrow `holders/clients.md:15`: its header statement concerns Streamable HTTP, not stdio. The local implementation separates HTTP session middleware from dispatch, and `caller` remains consumer-asserted. Evidence: `mcp/src/server/factories.ts:147`, `mcp/src/server/factories.ts:168`, and `mcp/src/server/middlewares.ts:198`.

**2. Holder lifecycle.** Provide explicit acquisition and destruction. Keep an implicit default holder for calls that omit a handle.

Use this lifecycle:

- Startup warms the configured floor and validates a browser before answering the legacy handshake.
- Startup’s validation token returns unused to the pool. It must not reserve capacity permanently for an implicit holder that has received no work.
- The first unnamed browser call acquires the default holder. Later unnamed calls retain its page, recording, and reading.
- Explicit acquisition returns an opaque handle after a lease is available.
- Explicit destruction ends admission for that holder, aborts its work, awaits cleanup, and invalidates its handle.
- Session or server termination destroys every holder and the pool.

Returning the unused startup token changes the internal startup contract, which presently promises a session lease. Update that contract and its guide together. Preserve the externally useful behavior: eager launch, validation before readiness, and persistent state across unnamed calls. Evidence: `browser/src/server/types.ts:414`, `browser/src/server/BrowserMCPServer.ts:218`, and `browser/guides/browser.md:3576`.

Separate acquisition cancellation from holder lifetime. A request signal cancels an acquisition waiting for capacity or warming; successful acquisition must not remain attached to that request’s eventual completion signal. Library callers can additionally supply an owner lifetime signal. `browse` uses its session lifetime for retained holders.

An abandoned holder occupies its admission place and browser until explicitly destroyed or the session ends. There is no reliable event distinguishing an abandoned subagent from a legitimate idle interaction on the shared connection. Recommend session-bounded retention without an inactivity timer. Document the cost and expose holder destruction to the coordinating caller. Automatic early reclamation would require an expiry policy or a client-supplied lifetime event; neither can be inferred from MCP request completion.

For cancellation racing a grant, check cancellation again before publishing the handle. Destroy an acquired token that cannot be delivered. A response lost after publication remains an abandonment case; do not claim delivery acknowledgment.

**3. Lease per holder.** Destroy a used holder’s browser with `token.destroy()`. Do not return its existing slot through `release()`.

A slot contains the browser, profile, context, and started toolset. The toolset retains its page, reading, action queue, and replay reservation. The existing teardown destroys the journey toolset before clearing other toolset state, then destroys the browser and removes the profile. Evidence: `browser/src/server/types.ts:364`, `browser/src/core/BrowserToolset.ts:221`, `browser/src/core/BrowserToolset.ts:228`, `browser/src/core/BrowserToolset.ts:2090`, and `browser/src/server/BrowserMCPServer.ts:599`.

Destruction provides a concrete boundary for cookies, storage, tabs, retained readings, recordings, adopted tools, and the browser profile. Saved journeys and completed runs remain intentional shared artifacts.

Downloads need explicit containment. The context uses browser-default download behavior when no destination is configured; the server’s isolation call supplies no download destination. Profile removal alone is therefore insufficient evidence that downloaded files are removed. Give owned slots a download destination beneath their owned profile, or explicitly deny downloads if that is the accepted product contract. Recommend containment. Evidence: `browser/src/core/BrowserContext.ts:517`, `browser/src/server/Browser.ts:243`, and `browser/src/server/BrowserMCPServer.ts:576`.

The cost is material but not yet measured for holder turnover. U12 measured a loaded refill warm at a median `2.26 s`, with a range of `1.39–2.51 s`; that is a prior refill reading, not a turnover benchmark. Evidence: `scaffold/.orkestrel/veneer/lifecycle/eager/readings.md:38`.

Correct `holders/map.md:90`: `release()` does not validate before returning a record to idle. It recycles the record; validation happens during a subsequent acquisition. Evidence: `pool/src/core/Pool.ts:701` and `pool/src/core/Pool.ts:344`.

**4. Capacity and waiting.** Refuse acquisition of another holder when the admitted holder count reaches the configured size. Return `BROWSER_SERVER_CAPACITY` immediately.

Count holders acquiring, serving, recovering, or closing against that admission limit. Reserve admission synchronously before awaiting `pool.acquire()`. Release the reservation after failed acquisition or completed destruction. This bounds abandoned holder objects as well as browser ownership.

Within an admitted holder, acquisition and recovery can wait for warming under cancellation. Share a recovery acquisition only among calls belonging to that holder. Keep the pool’s FIFO ordering for those acquisitions.

This choice prevents a request from waiting indefinitely behind a holder whose caller forgot to end it. It does not provide time slicing or starvation freedom: a holder can retain its browser for the session’s lifetime. The capacity refusal must explain that the caller can destroy an existing holder or retry after it ends.

When every browser is leased and one dies:

- The interrupted call returns `BROWSER_SERVER_UNRESOLVED`; do not repeat its action.
- Healthy holders continue on their existing tokens.
- The affected holder retains its identity and pending loss notice.
- The owner starts the permitted replacement after successful disposal.
- A later call on that holder waits for a replacement under its request signal.
- A terminal refill or cleanup refusal returns `BROWSER_SERVER_UNAVAILABLE` with the relevant cause.

No idle spare means no immediate failover promise. The prior spare-assisted measurements do not establish recovery latency with every browser leased. Evidence: `browser/src/server/BrowserMCPServer.ts:315`, `pool/src/core/Pool.ts:476`, `pool/src/core/Pool.ts:759`, and `scaffold/.orkestrel/veneer/lifecycle/eager/readings.md:33`.

**5. Pool behavior under several tokens.** Make these corrections in proposed `@orkestrel/pool` `0.0.15`. They belong to the reusable mechanism.

| Subject | Ruling and acceptance |
|---|---|
| Retained cleanup failure | Do not reject an otherwise unassigned waiter merely because a survivor exists while a usable leased or validating record can still become available. Park the waiter under its signal. Reject when no serviceable record or permitted pending recovery can satisfy it. Prove that releasing a healthy lease serves the waiter despite another retained record. |
| Spent floor | Apply the same progress distinction to the `create` refusal. A spent refill budget does not make a healthy leased record unusable. Prove waiting followed by release, and terminal refusal when no serviceable path remains. |
| Grant resets strikes | Remove the reset on successful grant. Ordinary acquisition must not restore the refill budget. Only explicit owner restart through `start()` reopens a spent budget. |
| Historical use suppresses strikes | Charge an idle loss even if that record was leased previously. Base the distinction on whether the record is leased at loss, not whether it has ever been leased. Otherwise release followed by idle loss avoids the bound. |
| Leased loss credit | Preserve the recorded exception: successful disposal of a record lost while leased earns a replacement attempt; failed disposal earns none. Credit does not reset strikes. |
| Waiter order | Retain FIFO commitment at `#waiters[0]`. Abort removes that waiter and permits the next eligible waiter to proceed. Do not add recovery priority or another scheduler. |

The existing refusal branches omit live-lease progress; the successful-grant branch resets the shared counter. Evidence: `pool/src/core/Pool.ts:351`, `pool/src/core/Pool.ts:368`, and `pool/src/core/Pool.ts:671`. Historical use controls strikes at `pool/src/core/Pool.ts:487`; the guide explicitly exempts a previously leased, subsequently released record at `pool/guides/pool.md:150`.

The resulting bound is precise: grants cannot replenish failed-refill allowance. It is **not** a lifetime limit on browser replacements, because the leased-loss credit remains. Repeated failures after successful leasing can still earn successive replacement attempts. A total lifetime cap would change that earlier decision and requires a separate user ruling. Evidence for the retained exception: `pool/guides/pool.md:146`.

Do not call `pool.start()` from acquisition refusal or a browser tool call. That would restore demand-driven retries.

No pool member needs adding. Revise the contracts for `PoolOptions.restarts`, `PoolInterface.start()`, and `PoolInterface.acquire()`, with implementation, tests, and guide parity. Their existing definitions are at `pool/src/core/types.ts:78`, `:112`, and `:121`.

These rulings bind probe item 1 wherever it consumes the revised pool. Correct the brief’s premise: the cited probe design specifies `min: 1` per stage, so concurrent proves queue acquisitions rather than hold several simultaneous tokens in the same stage pool. Successive grants still exercise the strike-reset issue. Evidence: `scaffold/.orkestrel/veneer/lifecycle/eager/probe-design.md:167` and `:171`. Probe’s actual manifest still declares queues and no pool dependency: `probe/package.json:95`.

**6. State ownership.** Move state according to what it describes.

| State | Owner and rule |
|---|---|
| Lease and pending acquisition | Per holder. A continuation must verify the exact holder and token before attaching or executing. |
| Page, context, toolset, reading, recording, replay reservation | Per slot leased to that holder. Destruction replaces the whole set. |
| Pending crash notices | Per holder. Another holder’s successful response cannot consume them. |
| Slot loss records, shared in-flight ping, process watches | Shared browser owner, keyed by exact slot. |
| Reference allocation | Shared browser owner. Keep monotonically distinct references across holders and replacement slots. |
| Profiles, process records, sweep, teardown faults | Shared browser owner. Keep one teardown barrier. |
| Journey and run root | Shared intentionally; browser-state isolation does not imply private saved artifacts. |

The server presently owns a global notice set and counter, and mirrors whichever toolset occupies its single lease. Evidence: `browser/src/server/BrowserMCPServer.ts:125`, `:339`, `:396`, and `:699`.

For tool discovery, avoid merging incompatible holder-specific definitions under one global name. Keep the default holder’s existing mirrored tools. Give explicit holders a scoped catalog and an execution envelope carrying their handle. The envelope separates routing fields from the underlying tool arguments, so a page tool can legitimately have an argument named `holder`.

Reserve the server’s control names. A page tool colliding with a reserved name remains reachable through scoped execution. Advertise generic execution conservatively as potentially mutating; do not inherit a read-only annotation from whichever holder most recently added a tool.

Keep replay refusal per holder. A second replay on that holder remains busy; a replay on another holder can proceed. Evidence: `browser/src/core/BrowserJourneyToolset.ts:439` and `:606`.

For shared journey names:

- Concurrent recordings can retain separate in-memory recordings. Saving uses the existing expected revision of `0`; one conflicting save returns `STALE` or `LOCKED`, without overwriting the committed journey.
- Concurrent replays use separate run directories. The short allocation lock can refuse a collision; it does not serialize replay execution.
- Add owner-local admission around replay and destructive `forget`: active replays hold shared access to their journey name through run persistence; `forget` requires exclusive access through run removal and journey deletion. Refuse conflicts with the existing locked error.
- Acquire that access before the first asynchronous lookup. Release it in `finally`, including cancellation, crash, and teardown.
- Editing a saved journey can coexist with a replay that already captured its revision.

Evidence: recording save uses revision checking at `browser/src/core/BrowserJourneyToolset.ts:234`; replay snapshots its revision at `:446`; `forget` clears runs then deletes the journey at `:400`. File locks protect individual mutations and allocation, not the replay lifetime: `browser/src/server/stores/FileBrowserJourneyStore.ts:81`, `browser/src/server/stores/FileBrowserRunStore.ts:43`, and `browser/src/server/stores/FileBrowserStore.ts:237`.

This admission guarantee covers holders owned by the same browser owner. Do not claim protection against another independent process deleting runs through the raw stores.

**7. Placement, contracts, and transport.** Extract the existing browser ownership machinery into a reusable server-library entity, proposed as `BrowserPool`. It composes `Pool<BrowserSlot>` and owns warming, watching, holder admission, scoped execution, recovery, shared journey admission, and cleanup.

`BrowserMCPServer` owns stdio, opaque-handle lookup, the implicit default holder, tool publication, and MCP result rendering. The bin retains environment parsing. Its existing variable handling is at `browser/src/bin/main.ts:11`.

The following is the proposed contract shape in `src/server/types.ts` terms. Names remain subject to the independent naming lane; the separation of lifetimes and execution ownership is required for correctness.

```ts
export interface BrowserHolderLoss {
	readonly cause: unknown
	readonly url: string
}

export interface BrowserHolderResult {
	readonly result: ToolResult
	readonly losses: readonly BrowserHolderLoss[]
}

export type BrowserHolderEventMap = {
	readonly change: readonly []
	readonly loss: readonly [loss: BrowserHolderLoss]
	readonly destroy: readonly []
}

export interface BrowserHolderOptions {
	readonly signal?: AbortSignal
	readonly lifetime?: AbortSignal
	readonly on?: EmitterHooks<BrowserHolderEventMap>
	readonly error?: EmitterErrorHandler
}

export interface BrowserHolderInterface {
	readonly id: string
	readonly emitter: EmitterInterface<BrowserHolderEventMap>
	tools(): readonly ToolDefinition[]
	execute(call: ToolCall, context: ToolContext): Promise<BrowserHolderResult>
	destroy(): Promise<void>
}

export type BrowserPoolEventMap = {
	readonly start: readonly []
	readonly acquire: readonly [holder: BrowserHolderInterface]
	readonly destroy: readonly []
}

export interface BrowserPoolOptions {
	readonly root?: string
	readonly headless?: boolean
	readonly executable?: string
	readonly readonly?: boolean
	readonly launch?: BrowserLaunchFunction
	readonly pool?: { readonly size?: number }
	readonly log?: NodeJS.WritableStream
	readonly on?: EmitterHooks<BrowserPoolEventMap>
	readonly error?: EmitterErrorHandler
}

export interface BrowserPoolInterface {
	readonly emitter: EmitterInterface<BrowserPoolEventMap>
	start(): Promise<void>
	acquire(options?: BrowserHolderOptions): Promise<BrowserHolderInterface>
	destroy(): Promise<void>
}

export interface BrowserHolderCall {
	readonly holder?: string
	readonly name: string
	readonly arguments: Readonly<Record<string, unknown>>
}
```

`signal` bounds acquisition waiting. `lifetime` ends the acquired holder. Execution composes the request, holder, and server lifetimes; it does not expose the raw mutable tool manager or token.

Reuse the installed `ToolCall`, `ToolContext`, `ToolResult`, and `ToolDefinition` contracts. Evidence: `browser/node_modules/@orkestrel/tool/dist/src/core/index.d.ts:155`, `:165`, `:178`, and `:488`.

Use ordinary tool arguments:

| Proposed tool | Contract |
|---|---|
| `acquire` | Return a holder handle and its initial catalog. |
| `tools` | Return the selected holder’s catalog. |
| `execute` | Execute `{ holder, name, arguments }` on that holder. Omission selects the default holder. |
| `destroy` | End the selected holder. Omission ends the default holder; a later unnamed call starts another. |

Ordinary named browser tools remain the default-holder path. Unknown explicit handles fail; they never fall back to the default.

No `@orkestrel/mcp` change is needed. Its existing execution hook and tool arguments carry this routing. No caller identity, metadata convention, or transport-session extension is introduced. Evidence: `mcp/src/core/types.ts:865` and `browser/src/server/BrowserMCPServer.ts:180`.

Resolve the map’s discovery uncertainty: `server/discover` does **not** await handshake. Its body directly constructs discovery output. Keep the browser-call gate for clients taking that path. Evidence: `mcp/src/core/MCPServer.ts:464`; this corrects the older expectation reported at `holders/map.md:85`.

**8. Measurement.** Run contention measurements only after the live-model measurement releases the host.

Compare configured sizes `1`, `2`, and `3` under workloads drawn from actual use:

| Workload | Load represented |
|---|---|
| Independent interactive holders | Navigation, reading, typing, and clicking, with realistic pauses between calls. |
| Interactive holder beside replay | User-facing call latency while a recorded journey executes and captures results. |
| Concurrent replays | Browser, rendering, storage, and capture contention. |
| Recording beside replay | Toolset independence and shared-store contention. |
| Holder turnover | Full destruction and refill between independent tasks. |
| Loss with every browser leased | Recovery without an idle spare, while unaffected holders continue work. |

Use the same logical workload across sizes. At insufficient capacity, record refusals and the time to finish the workload through sequential scheduling; do not hide refused work from throughput results.

Record acquisition latency separately from execution latency; report per-holder distributions, tail latency, completed work, refusals, cancellations, replay failures, cleanup duration, and loss-to-replacement success time. Record browser process-tree memory, CPU time, host memory pressure, and the effect on the other workload.

Use a TypeScript instrument under the browser checkout’s `tmp/probes/`, driving the built stdio entry and recording request identifiers, holder handles, process identities, and timestamps. Capture the target host, executable, versions, heads, and other running load. Run with both quiet-host controls and representative heavy concurrent work. Compare the discovered Edge executable with an available lighter Chromium build, without presuming either result.

Measure idle periods long enough to determine whether memory stabilizes. The prior run’s summed working set grew from `1.22 GB` to `1.78 GB` over `120 s`; shared pages were counted per process. That is not unique physical memory or evidence of a plateau. Evidence: `scaffold/.orkestrel/veneer/lifecycle/eager/readings.md:46`.

Before running, derive the sample size, observation duration, and meaningful improvement threshold from workload variability and the target host’s limits. Select the smallest size that provides a repeatable contention benefit without unacceptable interactive latency, resource pressure, or failure incidence. Keep size `1` if that benefit is absent or inconclusive. Keep `BROWSER_SERVER_RESTARTS = 1`.

This follows `scaffold/.claude/rules/quality.md:47`. The earlier load also failed near the end of measurement runs, with the failing case unavailable; retain complete background-workload logs this time. Evidence: `scaffold/.orkestrel/veneer/lifecycle/eager/readings.md:52`.

**9. Proof.** Require real Chromium for browser isolation, liveness, and cleanup claims. Use real pool instances and controlled resources for pool bookkeeping; do not replace project behavior.

The acceptance proofs are:

| Claim | Proof and breaking control |
|---|---|
| Independent holders | Navigate holders to distinct fixture pages; set cookies, local storage, IndexedDB, and service-worker state; open tabs and retain readings. Assert separation. Routing both handles to one slot must fail the proof. |
| Reference separation | Obtain references in each holder and after recovery. Cross-holder and stale references must be refused. Reusing a holder-local counter must fail the proof. |
| Concurrent execution | Hold a fixture request from one holder while another completes an observable action. A server-wide action queue must fail the proof. |
| Isolated loss | Kill the recorded Chromium process during an action. Assert unresolved outcome and no duplicate fixture request; another holder continues and receives no crash notice. |
| Capacity | Fill admitted holders; excess acquisition returns the capacity code without launching. Release admission through destruction and acquire again. Race acquisition with destruction and cancellation. |
| Recovery waiting | Lose a holder with all browsers leased. Hold or fail the replacement boundary; verify waiting cancellation, eventual success, and terminal refusal. |
| Destruction | Populate browser state and download an artifact; end the holder. Confirm its process and owned files are gone, and the successor begins clean. Replacing destruction with release must fail. |
| Pool progress | Retain one failed cleanup alongside a healthy lease. A queued acquisition survives until the healthy lease releases. Cover spent-floor and validation-in-progress variants. |
| Retry accounting | Exhaust a failing refill alongside a repeatedly acquired healthy record. Grants must not restart creation. Also prove an idle loss after release strikes, and leased-loss credit remains bounded as specified. |
| Tool catalogs | Publish conflicting page-tool definitions in separate holders. Discover and execute each correctly; removing one must not remove the other’s capability. |
| Shared journeys | Race recording saves, replay allocations, edits, and `forget`. Assert revision refusal, distinct runs, and exclusion of destructive deletion during active replay persistence. |
| Teardown | End the server with leases, actions, replay, acquisition, and refill live. Verify process descendants, endpoints, profiles, downloads, locks, and owned listeners. Inject a real filesystem refusal and assert a reported cleanup failure. |

Extend the existing real-browser failover tests rather than replace them. Their killed-lease and spare-loss cases begin at `browser/tests/service/browse.test.ts:160` and `:212`.

Cancellation is not rollback. A fixture must establish whether an action reached the page before cancellation; do not label every cancellation a known failure.

Keep Windows and POSIX evidence separate. The earlier measurements explicitly leave browser-wide hang behavior unproved on that host: `scaffold/.orkestrel/veneer/lifecycle/eager/readings.md:42`.

**10. Carry-over.** Carry the pool’s progress-aware waiting, cancellation, grant-independent retry accounting, successful-disposal credit, and retained-cleanup ceiling into probe item 1. Do not carry browser handles, page persistence, crash notices, or browser destruction-on-return into probe’s inspection contract. The probe design specifies release after an inspection and destruction on deadline. Evidence: `scaffold/.orkestrel/veneer/lifecycle/eager/probe-design.md:167`.

Service tests can consume the browser owner directly. Sharing a warm process between completed test holders remains a separate reuse decision because this proposal destroys used browsers. Do not present a raw CDP endpoint as a Playwright browser-server endpoint. The earlier shared-browser investigation records that distinction at `scaffold/.orkestrel/veneer/lifecycle/status.md:18`. Design nothing further for that question here.

The holder state machine follows. These are conceptual states derived from owned promises, tokens, and closure state; they do not require a separately stored status field.

| State | Transition |
|---|---|
| Acquiring | Admission reserved; await the holder’s pool token. Success → serving. Abort or terminal refusal → closing. |
| Serving | Execute on the exact token. Slot loss → recovering. Explicit end or owner abort → closing. |
| Recovering | Preserve identity and notices; share that holder’s pending replacement acquisition. Success → serving. Terminal refusal leaves a browserless holder that reports unavailable until ended or explicitly restarted by its owner. |
| Closing | Refuse further admission, abort work, detach publication, and await owned cleanup. |
| Closed | Handle invalid. Repeated object destruction returns its stable barrier. |

Every asynchronous continuation must verify its holder and token before attaching a grant, reporting loss, or altering publication. A late old-token completion must not detach its successor.

The failure contract follows.

| Failure | Signal | Action | Holder-visible result |
|---|---|---|---|
| Capacity occupied | Admission limit reached | Allocate nothing | Requesting caller receives `BROWSER_SERVER_CAPACITY`; existing holders continue. |
| Acquisition cancelled | Request signal | Remove waiter; destroy an undeliverable grant | Exact cancellation reason; no published holder. |
| Active browser lost | Process, transport, renderer, or failed ping | Detach exact token, record holder loss, destroy, permit owner refill | Interrupted calls unresolved; affected holder receives its notice; others continue. |
| Idle browser lost | Watch or validation | Dispose and charge idle-loss accounting | Owner diagnostic; no unrelated holder notice. |
| Refill budget spent | Pool refusal | Stop automatic attempts beyond owed credit | Affected holder unavailable; healthy holders continue. |
| Browser teardown unconfirmed | Destroy hook rejection | Retain counted record; do not replace it | Cleanup failure, potentially reduced capacity. |
| Holder ended during execution | Holder lifetime abort | Stop admission and finish teardown | Cancellation or ended result; no action retry. |
| Journey conflict | Revision or access refusal | Preserve existing files and run ownership | `STALE` or `LOCKED` for the conflicting operation. |
| Session ends | Input end or server destruction | Abort holders, destroy pool, await cleanup barrier | Pending work ends; cleanup failures reach the owner. |

Commit the implementation in this dependency order. Each writing unit owns its named files, includes its matching guide/parity edits, and stops at scoped project checks.

| Unit | Owned files | Acceptance |
|---|---|---|
| Pool progress and retry contract | `pool/src/core/types.ts`, `Pool.ts`, `tests/src/core/Pool.test.ts`, `guides/pool.md`, guide proofs | Waiter progress, cancellation ordering, strike accounting, retained credit, and teardown proofs pass. |
| Browser ownership and holders | `browser/src/server/types.ts`, proposed `BrowserPool.ts` and holder implementation, `BrowserMCPServer.ts` extraction, required kind files and barrel, mirrored tests, guide parity | Existing unnamed behavior survives extraction; direct library holders demonstrate isolation, bounded admission, and destruction. |
| MCP holder routing | `browser/src/server/BrowserMCPServer.ts`, server wire types/shapes/constants, server tests, service fixtures, guide parity | Handles, default routing, scoped catalogs, annotation conservatism, invalid-handle refusal, and cancellation races pass. |
| Shared journey admission | Browser owner’s journey admission implementation and kind files, service journey tests, guide parity | Replays coexist; conflicting saves preserve revisions; `forget` cannot remove an active holder’s run. |
| Integrated Chromium proof | `browser/tests/service/browse.test.ts`, `tests/setupService.ts`, `tests/setupServer.ts`, corresponding setup proofs | Real loss, full-capacity recovery, downloads, teardown, and controls pass; host limits are explicit. |
| Contention measurement and final documentation | Browser `tmp/probes/` instrument; accepted readings in scaffold campaign records; browser guide, guide proofs, and `ROADMAP.md` | Complete load logs, uncertainty, cleanup census, and default-size ruling. No default increase without the ruling. |
| Release preparation | Pool and browser manifests/lockfiles; dependency guide parity | Publish pool `0.0.15` before browser consumes it. Proposed browser release is `0.0.24`; MCP stays `0.0.36`. Recheck versions before release. |

The version proposals follow the supplied manifests: `pool/package.json:3`, `browser/package.json:3`, and `mcp/package.json:3`. Stage the dependency for integration before publication. Route the integrated correctness review to an independent engine and the required gates to the verifier; this assignment supplies no gate result.

The rejected alternatives are explicit:

| Alternative | Reason rejected |
|---|---|
| Infer holder from request ID, `caller`, or metadata | None establishes persistent caller identity in the supplied stdio path. |
| Require another transport session per holder | Does not serve concurrent callers sharing the shipped stdio connection. |
| Support replay alone as the extra holder | Leaves independent interactive and library consumers sharing state. |
| Assign a browser independently for every call | Breaks navigation, reference, reading, and recording continuity. |
| Automatically move replay to another browser | Changes its selected page state and conceals capacity acquisition. |
| Return a used slot unchanged | Retains browser and toolset state. |
| Rebuild only the context and reuse the process | Plausible successor optimization, but requires a complete reset contract and measured benefit. |
| Grow the pool on demand | Conflicts with the fixed ceiling and owner-driven warming decisions. |
| Wait indefinitely for another holder to end | An abandoned holder can occupy capacity until session termination. |
| Evict idle holders automatically | Requires an inactivity policy unsupported by a measured or user-selected duration. |
| Merge holder-specific tools by name | Definitions and removal events can conflict. |
| Keep global crash notices | An unrelated holder can consume another holder’s loss. |
| Reset retry allowance on grant or acquire refusal | Ordinary demand can repeatedly restore failed creation attempts. |
| Prioritize recovery ahead of FIFO waiters | Introduces another scheduling policy without an accepted fairness requirement. |
| Add MCP identity extensions or a supervisor | Unnecessary for explicit tool arguments; supervisor use is prohibited by the brief. |

The remaining user choices concern policy. The proposal recommends an option for each:

| Question | Options | Recommendation |
|---|---|---|
| How long can an abandoned holder retain capacity? | Until explicit/session end; finite inactivity expiry | Explicit/session end. Add expiry only with an accepted state-loss contract and a justified duration. |
| What happens when holder admission is full? | Immediate coded refusal; cancellable waiting | Immediate refusal, with explicit destruction available to the coordinator. |
| What happens when a used holder ends? | Destroy browser/profile; implement and prove process reuse | Destroy for item 14. Measure turnover before authorizing reuse. |
| What resets failure allowance? | Explicit owner restart; grants; a separately defined recovery episode | Explicit owner restart. Preserve leased-loss credit and describe its exception honestly. |
| Must item 14 include multi-session HTTP hosting? | Keep stdio plus reusable library holders; add an HTTP adapter | Keep stdio and library holders. HTTP session ownership requires its own integration proof. |
| What default size ships? | Retain `1`; raise after contention evidence | Retain `1` pending the specified measurement. |
# Contexts proposal — analyst lane (GPT-6 Astra), 2026-10-05

Read-only codex exec over `contexts-design-brief.md`; objective lane; containment clean.

Adopt holders as isolated Chromium contexts within a bounded browser pool. Keep browser ownership, restart accounting, and context ownership separate. Ship only after same-browser isolation, disposal, visibility, and crash containment pass real-Chromium proofs.

This is a read-only proposal. No file, test, build, server, or browser was changed or run. Local citations use sibling repositories `browser/` and `pool/`; `records/` means `scaffold/.orkestrel/veneer/lifecycle/holders/`.

**1. Unit and bounds**

Keep `BROWSE_POOL` and `pool.size` as the browser-process bound. Add `BROWSE_CONTEXTS` and `pool.contexts` as the holder-context bound **per browser**. Derive total admission as `size × contexts`, including the shared holder, acquisitions in progress, and capacity retained during disposal.

Preserve the existing browser limit and default. The source declares a limit of `3` and default of `1`; the user explicitly postpones changing that default until contexts land and measurement rules it. Start the context default conservatively at `1`, then rule both defaults from the completed measurement. (`browser/src/server/constants.ts:234`, `browser/src/server/constants.ts:236`, `records/contexts-design-brief.md:13`.)

Validate `contexts` as a positive safe integer and validate the derived product. No browser launches in response to an acquisition. The owner starts the configured floor and its bounded refills, preserving D6, D7, and D10. (`scaffold/.orkestrel/veneer/lifecycle/eager/design-brief.md:19`, `:20`, `:22`.)

Keep the holder wire contract unchanged. An unknown handle must never select the shared context. The existing acquisition reserves admission synchronously and detaches request cancellation after successful acquisition; preserve those properties. (`records/synthesis.md:7`, `browser/src/server/BrowserMCPServer.ts:326`, `:332`, `:351`, `:356`.)

**2. Assignment**

Assign an acquisition to a live browser with the fewest occupied context places. Count pending constructions and disposals as occupied. Break ties by stable pool order. Reserve the place before awaiting validation or construction.

Keep the shared holder as an ordinary isolated context with an exceptional lifetime: it lasts until server teardown. It consumes the same capacity and receives the same loss handling as named holders. The existing shared holder already participates in admission. (`records/synthesis.md:15`, `browser/src/server/BrowserMCPServer.ts:136`, `:326`.)

Do not migrate healthy contexts to rebalance them. Apply balancing when assigning a context. This avoids replacing cookies, pages, and in-flight work merely because another browser finishes warming.

Warm each browser with a prepared blank context, page, and started toolset. Its initial assignment consumes that prepared context. Construct additional contexts within the configured bound. This preserves startup detection of page/toolset failures without eagerly paying for every possible holder. The existing warm operation already constructs and starts that complete stack. (`browser/src/server/BrowserMCPServer.ts:814`, `:819`, `:820`, `:828`.)

Do not reserve a failover spare. Spare capacity may serve ordinary holders, as the user ruled. (`records/synthesis.md:10`.)

**3. Browser crash and recovery**

Treat a browser loss as one resource-loss event affecting every attached holder generation.

Synchronously mark the browser unavailable, invalidate its bindings, withdraw the shared catalog if affected, and record a separate notice for each holder using that holder’s last URL. Destroy the browser record once. Do not award refill credit or charge strikes once per context.

Preserve these caller outcomes:

- A dispatched action whose outcome becomes uncertain returns `BROWSER_SERVER_UNRESOLVED`; never repeat it automatically.
- A subsequent call retains the holder handle, receives its pending `BROWSER_SERVER_CRASH` notice, and operates on a fresh blank context.
- Concurrent recovery calls for one holder join the same pending replacement.
- Holders on surviving browsers retain their contexts and receive no unrelated notice.

These extend the existing per-holder grant and notice machinery. Its loss record presently stores a single slot URL, which must become holder-generation data when a slot hosts several contexts. (`browser/src/server/BrowserMCPServer.ts:585`, `:603`, `:692`, `:694`, `:549`; `records/synthesis.md:20`.)

Recover onto available capacity in another live browser; otherwise wait for the owner-driven refill. Never exceed the per-browser bound to accommodate displaced holders. At `BROWSE_POOL=1`, every affected holder waits for the replacement browser. A spent refill budget or retained browser-cleanup failure returns `BROWSER_SERVER_UNAVAILABLE`.

Preserve the user’s grant rule: only granting a browser record created after the last strike resets strikes. Context replacement, holder destruction, and grants on older healthy browsers must not reset them. (`records/synthesis.md:9`, `pool/src/core/Pool.ts:678`.)

**4. Turnover and cleanup**

Implement holder `destroy` as toolset teardown, **context `close()`**, download-directory cleanup, and lease release.

The distinction is essential: `BrowserContext.destroy()` destroys local page wrappers; `BrowserContext.close()` sends `Target.disposeBrowserContext`. Calling `destroy()` before `close()` also fixes the shared shutdown promise to the wrapper-only path. (`browser/src/core/BrowserContext.ts:160`, `:169`, `:355`, `:368`, `:379`.)

Use an ownership sequence with these requirements:

- Mark the holder ended and abort its lifetime synchronously.
- Drain its construction and execution ownership. Preserve replay persistence before releasing journey admission.
- Destroy the toolset, while still attempting context closure if toolset teardown fails.
- Close the context and settle its downloads.
- Remove its owned directory.
- Release the browser lease only after successful cleanup.

The toolset already tears down its journey toolset before other state, and server replay admission remains held through execution settlement. Preserve both. (`browser/src/core/BrowserToolset.ts:2090`, `browser/src/server/BrowserMCPServer.ts:450`, `:458`, `:502`.)

Give every context generation a distinct directory:

```text
ROOT/.profiles/PROCESS-UUID/contexts/GENERATION-UUID/downloads/
```

Mint path components internally. Recovery must not reuse the old generation’s directory. Set `Browser.setDownloadBehavior` with that context’s ID and directory before navigation; the library already supports both parameters. (`browser/src/server/Browser.ts:243`, `browser/src/core/BrowserContext.ts:517`.)

Completed download files require explicit filesystem cleanup. Do not interpret a context-disposal acknowledgment as proof that every download write or Chromium cleanup task has settled. Chromium’s implementation can acknowledge disposal while deferred profile destruction remains scheduled. See [`devtools_browser_context_manager.cc:184`](https://github.com/chromium/chromium/blob/main/chrome/browser/devtools/devtools_browser_context_manager.cc#L184).

If context disposal is uncertain, quarantine the browser and retire it through the pool. If only directory removal fails, retain that cleanup ownership and capacity until resolved or reported by server teardown. Preserve H2’s idempotent logical end while reporting cleanup failure; do not return failed capacity to service. (`records/review-h2.md:10`, `browser/src/server/BrowserMCPServer.ts:411`.)

Recycle browser processes on browser loss, failed browser validation, uncertain context disposal, or server teardown. Add no age or turnover-count recycling policy without a measured retention problem.

**5. Liveness**

Separate browser watches from holder-context watches.

A browser watch observes transport/process loss and owns one coalesced root ping. Keep the ping at hand-out and before calls. `Browser.ping()` sends `Browser.getVersion`; it establishes browser responsiveness, not renderer responsiveness. (`browser/src/server/Browser.ts:147`, `browser/src/server/BrowserMCPServer.ts:669`.)

A context watch observes its pages, the active page’s crash/closure, and local context closure. An active renderer crash invalidates that holder generation and rebuilds its context after cleanup. It must not immediately destroy sibling contexts. The existing server instead reports an active renderer crash as slot loss; that coupling must change. (`browser/src/server/BrowserMCPServer.ts:711`, `:731`, `:739`.)

A background-page crash must not reset an otherwise usable holder. Preserve the existing active/background distinction, and refuse use of the crashed target if it later becomes selected. The service test explicitly checks that distinction. (`browser/tests/service/browse.test.ts:784`.)

Do not add a timer or an unconditional renderer heartbeat. Use page events and bounded commands. After a page-command timeout, check browser health before classifying scope. A successful root ping must not turn an animation-frame timeout into a browser crash.

With no polling, an idle browser that silently stops answering can remain undetected until a call. That is consistent with the user’s event-plus-ping ruling. (`scaffold/.orkestrel/veneer/lifecycle/eager/design-brief.md:22`.)

**6. Isolation and the limits of the evidence**

Define “clean slate” as fresh context-scoped web state, fresh automation state, and removal of owned downloads. Do not claim a fresh operating-system process or immediate memory reclamation.

The protocol creates a separate incognito-like browser context and disposes its pages without `beforeunload`. Chromium implements creation through a unique off-the-record profile. See [`Target.pdl:110`](https://github.com/ChromeDevTools/devtools-protocol/blob/master/pdl/domains/Target.pdl#L110), [`Target.pdl:182`](https://github.com/ChromeDevTools/devtools-protocol/blob/master/pdl/domains/Target.pdl#L182), and [`devtools_browser_context_manager.cc:73`](https://github.com/chromium/chromium/blob/main/chrome/browser/devtools/devtools_browser_context_manager.cc#L73).

The isolation contract and required proof are:

| State | Proposed contract and evidence |
|---|---|
| Cookies, local/session storage, IndexedDB | Separate context storage. Chromium exposes these through storage partitions; prove same-origin separation between simultaneous holder contexts. See [`storage_partition.h:122`](https://github.com/chromium/chromium/blob/main/content/public/browser/storage_partition.h#L122). |
| CacheStorage and service workers | Context-owned partition services; prove no registration or cached response crosses holders or survives replacement. See [`storage_partition.h:142`](https://github.com/chromium/chromium/blob/main/content/public/browser/storage_partition.h#L142). |
| HTTP cache | Off-the-record networking uses memory-backed storage. Prove cache separation using origin-server request records; do not infer that every process-wide cache disappears. See [`profile_network_context_service.cc:1239`](https://github.com/chromium/chromium/blob/main/chrome/browser/net/profile_network_context_service.cc#L1239), [`:1270`](https://github.com/chromium/chromium/blob/main/chrome/browser/net/profile_network_context_service.cc#L1270). |
| Permissions | Apply overrides with the context ID and prove sibling and replacement permissions remain independent. The library already scopes its commands. (`browser/src/core/BrowserPermissionManager.ts:32`, `:49`.) |
| Tabs, references, catalogs | Keep separate context/toolset ownership and the server-wide reference allocator. Verify routing as well as Chromium storage. (`browser/src/core/BrowserContext.ts:66`, `browser/src/server/BrowserMCPServer.ts:172`, `:814`.) |
| Downloads | Separate paths and ownership; browser events must remain correctly routed by frame and download ID. (`browser/src/core/BrowserPage.ts:1957`, `:1973`.) |
| Browser process and transport | Shared deliberately; their loss invalidates all hosted contexts. The wrapper constructs isolated contexts on the same client. (`browser/src/server/Browser.ts:210`, `:232`.) |
| Journey files and saved runs | Shared deliberately. Preserve server-wide journey admission and the concurrent allocation repair. (`browser/src/server/BrowserMCPServer.ts:434`, `browser/src/server/stores/FileBrowserRunStore.ts:63`.) |

The supplied real reading establishes a narrower result: replacing a context cleared the seeded cookie and localStorage values, while replacing a tab retained them. The instrument uses `context.close()` for that reset. (`browser/tmp/probes/contexts/run-swgN81/record.json:39`, `:66`, `:184`; `browser/tmp/probes/contexts/Group.ts:43`.)

It does **not** establish simultaneous-context isolation or crash containment. Those checks were not reached. (`browser/tmp/probes/contexts/report.md:117`.) Keep them as release gates, not inferred passes.

Contexts also provide no resource quota or isolation from a privileged controller of their shared browser. Treat the holder boundary as automation/session isolation, not a hostile-tenant security boundary.

**7. Pool shape**

Keep `Pool<BrowserSlot>` as the browser owner and let `browse` own contexts. Extend the pool with an optional `capacity` bound on simultaneous leases per resource, defaulting to exclusive leasing.

This extension is justified by the actual semantic gap: installed pool declarations expose exclusive tokens, and the implementation removes a record from availability when assigning it. There is no supported concurrent lease mechanism to reuse. (`browser/node_modules/@orkestrel/pool/dist/src/core/index.d.ts:326`, `:342`; `pool/src/core/Pool.ts:346`, `:676`.)

Require the extension to preserve these invariants:

- Count resources against `min`/`max`; count outstanding leases and reservations against each record’s `capacity`.
- Select eligible records by least occupancy, with stable ties.
- Preserve FIFO waiter settlement and cancellation.
- Release only the exact lease.
- Destroying a resource invalidates all its leases and runs one disposal.
- Award one owed refill per lost leased resource, independent of lease count.
- Keep failed resource destruction counted against the browser ceiling.
- Preserve record-based public counts; document their meaning under sharing.

The existing pool already contains exact-token settlement, disposal coalescing, FIFO commitment, owed refill, and retained-cleanup mechanisms. Extend those mechanisms rather than building a second browser lifecycle in `browse`. (`pool/src/core/Pool.ts:284`, `:470`, `:650`, `:725`, `:761`.)

Repair idle-loss accounting in the same pool change. After healthy context turnover starts using `release()`, a previously used browser can become idle. Its subsequent loss must consume the bounded idle-refill budget. The existing `#strike` excludes every previously used record, and the earlier synthesis explicitly deferred that case because browse released none. (`pool/src/core/Pool.ts:489`, `records/synthesis.md:29`.)

Preserve terminal unavailability when no capacity is grantable and refilling has exhausted its budget. Do not keep a recovery call waiting indefinitely for another long-lived holder to end. Existing pool refusals already expose that outcome. (`pool/src/core/Pool.ts:353`.)

No MCP change is necessary for this proposal. The holder envelope, handshake hook, and server execution boundary already exist. (`browser/src/server/BrowserMCPServer.ts:201`, `:211`.)

**8. Visibility, focus, and tabs**

Do not promise that context creation makes every holder continuously visible and focused in either mode.

`Target.createTarget` distinguishes background placement, windows, and focus; context identity alone is not that contract. Focus emulation separately simulates an active, focused page. See [`Target.pdl:149`](https://github.com/ChromeDevTools/devtools-protocol/blob/master/pdl/domains/Target.pdl#L149) and [`Emulation.pdl:212`](https://github.com/ChromeDevTools/devtools-protocol/blob/master/pdl/domains/Emulation.pdl#L212).

The inspected pointer implementation already calls `Page.bringToFront` before awaiting animation-frame stability. That is relevant evidence, but it does not prove freedom from concurrent focus changes, window occlusion, or popup-induced hiding. (`browser/src/core/elements/BrowserPageElement.ts:375`, `:391`.)

Require concurrent holder actions to complete with:

- The selected page in each context.
- Another application foregrounded.
- Headed windows occluded or minimized.
- A popup opening and closing.
- Navigation and tab switching changing the selected page.

Measure `visibilityState`, `hasFocus()`, timer progress, and animation-frame progress separately. Choose the smallest verified activation mechanism. Do not add browser flags or focus emulation speculatively.

Retain existing sequential `tabs` and `switch` behavior within a holder. Do not add independent concurrent lanes inside one holder. The toolset already owns a current page and context tools. (`browser/src/core/BrowserToolset.ts:106`, `:312`.)

The brief reports hidden-tab ticks, but the supplied report marks visibility controls unrun and the record contains no completed timer measurements. Treat the tick comparison as briefing evidence requiring a reproducible artifact. The click timeout itself is recorded. (`records/contexts-design-brief.md:9`, `browser/tmp/probes/contexts/report.md:96`, `:125`, `browser/tmp/probes/contexts/run-swgN81/record.json:8495`.)

**9. Measurement and defaults**

Extend H6 to vary browser count independently from holder count. Compare equal logical work across separate browsers, shared-browser contexts, and the hybrid.

The existing context pilot warrants continuation, not a default change. In `run-swgN81`, the three-lane context arm recorded `15.95 s`, `1594.03 MiB` peak private commitment, and `31.27` browser CPU-seconds; separate browsers recorded `19.30 s`, `4517.26 MiB`, and `92.47` CPU-seconds. Each cell has one observation. (`browser/tmp/probes/contexts/report.md:13`, `:22`, `:40`.)

Use this measurement plan:

| Dimension | Required reading |
|---|---|
| Topology | Fixed holder count across feasible browser/context placements; include the shared holder explicitly. |
| Work | H6 interactive work, replay beside interaction, recording beside replay, concurrent replays, turnover, and loss while occupied. Preserve completed work and count refusals. |
| Startup | Process spawn to usable shared holder; time until the configured browser floor is ready. |
| Latency | Acquisition, execution, destruction, replacement readiness, and loss-to-success separately; retain per-holder distributions. |
| Cost | Browser-tree CPU, private commitment, summed working set, process count, and settled idle cost. Keep memory metrics distinct. |
| Retention | Repeated context turnover through a stable observation period; track context/target count, download folders, listeners, and memory trend. |
| Failure | Whole-browser kill, active-renderer crash, context disposal, cancellation during construction, and teardown during recovery. |
| Environment | Quiet host and representative competing load; record browser/version, mode, flags, topology, and whether competing work passes. |

Run instrument controls and isolation proofs before expensive comparisons. Randomize or interleave topology order. Derive repetition count, duration, and the meaningful difference from pilot variability before the final run. The repository requires that sizing and uncertainty comparison. (`scaffold/.claude/rules/quality.md:49`.)

Prefer the smallest browser count and context capacity that materially improve completion under representative load without unacceptable tails, retention, or recovery cost. Keep defaults unchanged when the finding is inconclusive. A hybrid needs its own measured failover benefit; H6’s separate-browser result does not establish that benefit for contexts. (`records/readings.md:12`, `:14`, `:17`.)

**10. Proof, units, and release**

Use real Chromium for protocol, isolation, visibility, and process-loss claims. Use real pool resources and deterministic barriers for lease-accounting races. Do not multiply Chromium launches for claims that the pool tests can settle.

The existing service suite provides useful starting points for held-request concurrency, isolation, process loss, downloads, and simultaneous replay. Those assertions must run with holders sharing a browser; their existing placement cannot prove the proposed topology. (`browser/tests/service/browse.test.ts:108`, `:138`, `:190`, `:221`, `:287`.)

Commit bounded units in this order:

| Unit | Owned files | Acceptance |
|---|---|---|
| Feasibility readings | Browser `tmp/probes/contexts/`; report returned to the Orchestrator | Same-browser isolation, disposal, headed/headless action progress, download settlement, and blast radius recorded. Every failed case remains visible. |
| Shared resource leasing | Pool `src/core/types.ts`, `Pool.ts`, required kind files, mirrored tests, `guides/pool.md` | Types first. Capacity/reservation bounds, exact release, stale tokens, FIFO cancellation, single cleanup/refill credit, strike epochs, used-idle loss, and retained cleanup proved. |
| Context ownership | Browser `src/server/Browser.ts`, `src/core/BrowserContext.ts`, matching types and tests where needed | Late creation cannot escape teardown. Context closure reaches protocol disposal despite preceding cleanup failure. Wrapper destruction remains distinct. |
| Holder assignment | Browser `src/server/BrowserMCPServer.ts`, server kind files, mirrored tests | Prepared context consumption, bounded construction, least occupancy, unchanged handles/catalogs, shared-context admission, cancellation, and generation checks. |
| Loss and turnover | Same server ownership, serially after assignment | Holder-local renderer recovery; browser-wide invalidation; single-flight recovery; contextual notices; downloads and failed cleanup retained; no automatic action replay. |
| Configuration and proofs | Browser `src/bin/main.ts`, constants/types, `tests/service/browse.test.ts`, service fixtures/setup | Environment validation; real shared-browser proofs; single-browser and hybrid recovery; teardown during construction/replay/disposal; sibling continuity during turnover. |
| Measurement and documentation | Browser probe files, matching guide/guide proofs and roadmap; Orchestrator-owned campaign records | Repeated H6 comparison with spread; explicit default ruling; guide describes context cleanup and browser-wide failure scope. |

Run the prescribed independent review and scoped/project checks, then the campaign’s integrated audit and tree-wide gates. Quote only measurements and test outcomes actually produced.

Release the accepted pool change before browser re-pins it. Publish browser after the context implementation, proofs, measurement, and default ruling are accepted. Re-pin downstream scaffold consumers afterward. No MCP or supervisor release is required by this design.

The following type sketch shows the separation; it is a proposal, not an edit to authoritative types. Existing server types combine the browser, context, and toolset in `BrowserSlot`, and bind catalog mirroring directly to its pool token. (`browser/src/server/types.ts:365`, `:432`.)

```ts
// Add to the existing PoolOptions<T> contract.
readonly capacity?: number

// Replace the inline browser pool options with a named contract.
export interface BrowserServerPool {
	readonly size?: number
	readonly contexts?: number
}

// Browser ownership.
export interface BrowserSlot {
	readonly browser: BrowserInterface
	readonly profile: string
}

// One prepared or assigned context generation.
export interface BrowserServerContext {
	readonly context: BrowserContextInterface
	readonly toolset: BrowserToolsetInterface
	readonly directory: string
}

// One holder's binding to a browser lease and context generation.
export interface BrowserServerLease {
	readonly token: PoolToken<BrowserSlot>
	readonly context: BrowserServerContext
	readonly abort: AbortController
}

export interface BrowserServerLoss {
	readonly scope: 'browser' | 'context'
	readonly cause: unknown
	readonly url?: string
}
```

Keep `BrowserServerHolder` as the stable handle and lifetime. Store pending assignments, prepared contexts, leases, disposals, and notices in their ownership maps. Bind mirror callbacks and asynchronous continuations to the exact `BrowserServerLease`, not merely its browser. Derive occupancy and lifecycle state from those records.

The browser state machine has these transitions:

```text
owner start/refill
    → warming
    → ready, with prepared context
    → serving, with bounded context leases
    → ready, after the last lease is released

warming failure → cleanup → bounded refill or unavailable
ready/serving loss → draining → disposed → bounded refill
cleanup uncertainty → retained, counted, unavailable
server teardown → draining → disposed or reported retained failure
```

The holder-context state machine preserves the handle across recovery:

```text
admitted → waiting → constructing → ready
ready → context/browser loss → draining → waiting → constructing → ready

construction failure → cleanup → unavailable
    existing handle: later call may retry
    undelivered acquisition: retire the handle

any live state → destroy/cancelled acquisition → ending → ended
```

Allow one context construction per pending recovery attempt. A failed attempt returns an error; it must not start an unbounded background reconstruction loop. A caller’s cancellation stops its wait, while holder destruction ends the shared recovery attempt.

The failure table defines the observable boundary:

| Failure | Signal and action | Caller outcome |
|---|---|---|
| Browser exits or disconnects | Browser event; invalidate every hosted generation; dispose/refill once | In-flight uncertainty; subsequent holder-local crash notice and fresh context |
| Browser stops answering | Root ping deadline; quarantine browser | Unresolved dispatched work; recovery or unavailable |
| Active renderer crashes | Page crash event; dispose affected context | Affected holder recovers; sibling contexts remain usable |
| Background renderer crashes | Mark target unusable; retain healthy current page | No whole-holder reset merely for the background event |
| Context disappears externally | Target closure/detachment or command failure | Invalidate affected generation; rebuild after cleanup |
| Page action times out while root ping succeeds | Preserve page failure classification | Original bounded tool failure; no automatic browser restart |
| Acquisition is cancelled | Abort admitted lifetime; drain undeliverable resources | Cancellation; no leaked handle or place |
| Holder ends during execution | Abort lifetime and drain ownership | `BROWSER_SERVER_UNRESOLVED`; no repeated action |
| Context disposal is uncertain | Quarantine and retire host browser | Cleanup diagnostic; affected siblings recover |
| Download deletion fails | Retain directory ownership and capacity | Holder remains ended; cleanup failure remains reported |
| Refill budget is exhausted | Stop refill | `BROWSER_SERVER_UNAVAILABLE` |
| Server ends during construction | Refuse publication; dispose late results | Session ended; teardown includes pending ownership |

Reject the following alternatives:

- **Tabs as holder isolation:** tab replacement retained cookie and storage state in the supplied reading. (`browser/tmp/probes/contexts/run-swgN81/record.json:134`.)
- **A browser per holder:** retain it as the measurement control; it prevents the proposed sharing and preserves process-launch turnover.
- **A context pool as the sole owner:** it cannot independently enforce browser-process bounds or browser-scoped restart credit.
- **Permanent coordinator leases over every browser:** acquiring those leases would reset the pool’s grant budget without an actual holder assignment. That conflicts with the purpose of the standing grant rule. (`pool/src/core/Pool.ts:676`, `records/synthesis.md:27`.)
- **An independent browse scheduler duplicating pool lifecycle:** it would duplicate resource reservations, cancellation, loss, and cleanup ownership.
- **Reset lists inside reused contexts:** they replace Chromium’s context boundary with a growing application-maintained cleanup contract.
- **A spare reserved from holders:** contrary to the standing ruling. (`records/synthesis.md:10`.)
- **Automatic action retries or URL restoration:** they can repeat externally visible work; recovery begins blank.
- **Periodic liveness checks, blind background flags, or arbitrary recycle intervals:** none is justified by the specified liveness contract or completed measurements.

The remaining user decisions concern policy rather than the holder wire contract:

| Question | Options and recommendation |
|---|---|
| Which default topology follows measurement? | **Recommend one browser with measured context capacity if it passes the acceptance rule.** Choose a hybrid when its measured recovery benefit warrants the additional idle cost. Retain conservative defaults if inconclusive. |
| What constitutes a clean slate? | **Recommend fresh context state plus explicit download cleanup.** Choose process/profile replacement only if process-wide state removal is required; that retains the heavier turnover path. |
| How should uncertain context disposal affect siblings? | **Recommend retiring the host browser**, with notices and recovery for its holders. Retaining the host requires a separate proof that the uncertain context cannot remain active. |
| Should configured headed mode alter focus semantics? | **Recommend preserving native semantics unless the visibility proof demonstrates a required, narrowly scoped remedy.** Explicit focus emulation is an alternative only with measured behavior and documented consequences. |
# holders-map

Grok 4.7 absorption, 2026-10-04, brief `scaffold/tmp/cursor/holders-map-brief.md`, session db913d32-01cb-4cfd-a409-df3601eb7d13.

Heads read: browser `3924fbb`, pool `5a3a631`, mcp `50afe56`, probe `dee8845`.

## Lease

- `BrowserSlot` is `browser`, `profile`, `context`, and `toolset` (`browser/src/server/types.ts:363-369`).
- `#warm` creates `ROOT/.profiles/<pid>-<uuid>/`, launches with `cdp.discover: false`, calls `isolate({ reference: this.#reference })`, creates one page, and builds one toolset whose journey and run stores use `this.#root` (`browser/src/server/BrowserMCPServer.ts:550-587`).
- The toolset stores that page in `#page` (`browser/src/core/BrowserToolset.ts:228`, `:263`), constructs one `BrowserJourneyToolset` when `journeys` is set (`:320-326`), and keeps one retained reading in `#reading` (`:230-236`). `tabs` reads `context.pages()` (`:1273-1274`).
- The server holds `#lease`, `#granting`, `#tools`, `#pool`, `#losses`, `#pings`, `#watches`, `#notice`, `#folders`, `#faults`, `#failure`, `#stranded`, and `#references` (`browser/src/server/BrowserMCPServer.ts:120-137`).
- `#grant` returns `#lease` when it is set. Otherwise one `#pool.acquire(this.#abort.signal)` is shared through `#granting` (`:375-382`).
- `#hold` assigns that token to `#lease`. A slot already in `#losses` is ended with `token.destroy()` and `#lease` stays unset (`:385-395`). The server then mirrors that slot's toolset manager (`:396-400`).
- A loss of the leased slot clears `#lease`, adds the slot to `#notice`, and calls `token.destroy()` (`:462-471`). `token.release` has no call site in this file.
- `#ping` stores one in-flight ping per slot (`:439-449`). `#serve` awaits it before returning the held slot (`:413-417`). A failed call on that same slot awaits it again (`:315-321`).
- A failed call whose slot is no longer `#lease.value` throws `BROWSER_SERVER_UNRESOLVED` (`:324-331`). `describeBrowserServerLoss` builds that text and the `BROWSER_SERVER_CRASH` text (`browser/src/server/helpers.ts:87-97`). `#annotate` prefixes each `#notice` entry as `BROWSER_SERVER_CRASH` and then deletes it (`browser/src/server/BrowserMCPServer.ts:339-346`).
- Construction adds one dispatcher per vocabulary name on one server manager, each bound to `#forward` (`:169-178`). `#forward` calls `slot.toolset.tools.execute` (`:305`). Tools that slot adds outside the vocabulary are mirrored onto the server manager (`:704-708`) and withdrawn from it in `#unmirror` (`:724-731`).
- `#issue` increments one `#references` counter and is the `reference` passed to every `isolate` (`:576`, `:699-701`).
- The pool is created with `min` equal to `pool.size` and `restarts` equal to `BROWSER_SERVER_RESTARTS` (`:153-161`). Those constants are `1` and `1`, and the size ceiling is `3` (`browser/src/server/constants.ts:232-237`). The constructor passes no `max`.
- `src/bin/main.ts` reads `BROWSE_POOL` into `pool.size` and starts that one server (`:11-43`).
- The guide says the session holds one browser, a spare stays idle until that browser is lost, and `initialize` waits for the first lease (`browser/guides/browser.md:3576-3580`).

## Concurrency today

- `bindServer` invokes `server.handle` from an async listener and does not await the previous message (`mcp/src/core/helpers.ts:1868-1883`). The stdio transport hands each complete line to that listener from `#receive` (`mcp/src/server/transports/StdioServerTransport.ts:136-139`).
- Both calls enter `#forward`. `#serve` returns the held slot (`browser/src/server/BrowserMCPServer.ts:413-417`). The line that selects that single slot is `if (this.#lease !== undefined) return this.#lease` (`:376`).
- `click`, `type`, `press`, `dialog`, `switch`, and an adopted page tool await `#acquire` (`browser/src/core/BrowserToolset.ts:841`, `:907`, `:1012`, `:1173`, `:1223`, `:1258`). `navigate` releases the same `turn` in its `finally` (`:1097`). `#acquire` chains `#tail`, so the next action waits until the previous turn resolves (`:1348-1356`). `hold` uses that same queue (`:463`).
- `look`, `read`, `plain`, and `tabs` are `BROWSER_OBSERVATION_TOOL_NAMES` (`browser/src/core/constants.ts:447-452`). Their handlers return without awaiting `#acquire`. `wait` is admitted as an observation (`browser/src/core/BrowserToolset.ts:663-665`) and also returns without awaiting `#acquire` (`:1126-1132`). Those calls proceed on the slot's page together.
- While `#reservation` or a queued hold is set, `#admit` throws `BROWSER_TOOLSET_BUSY` for a call that is not an observation (`:569-575`).
- The guide says concurrent calls share that one spare (`browser/guides/browser.md:3580`).

## Replays

- `#replayJourney` calls `#idleReplay`, then assigns `#replaying`, then awaits `#find` (`browser/src/core/BrowserJourneyToolset.ts:439-442`). `#idleReplay` throws `BROWSER_TOOLSET_BUSY` when `#replaying` or `toolset.held` is set (`:606-612`).
- `BrowserReplay` has no run flag of its own. `execute` calls `toolset.hold` (`browser/src/core/BrowserReplay.ts:84`). `hold` waits for earlier holds, then `#acquire`, then stores the hold as `#reservation` (`browser/src/core/BrowserToolset.ts:448-466`). `held` reads that reservation (`:366-368`).
- `#replay` is the promise `#teardown` awaits after aborting the lifetime signal (`browser/src/core/BrowserJourneyToolset.ts:444`, `:595-603`). Toolset teardown destroys the journey toolset first (`browser/src/core/BrowserToolset.ts:2090-2093`).
- A set `#recording` refuses replay before `#idleReplay` (`browser/src/core/BrowserJourneyToolset.ts:432-438`).
- Each warm builds a new journey toolset and new file stores on the server root (`browser/src/server/BrowserMCPServer.ts:578-584`). `FileBrowserJourneyStore.set` and `FileBrowserRunStore.open` take `journey.lock` under that journey name (`browser/src/server/stores/FileBrowserJourneyStore.ts:81-83`, `browser/src/server/stores/FileBrowserRunStore.ts:43-45`). The run store keeps allocated directories in its own `#directories` (`:34-35`, `:52`). Its remarks say it persists runs only in directories that instance allocated (`:24-26`).
- `#replaying`, `#reservation`, `#tail`, `#page`, and `#reading` sit on the toolset inside the slot. A second slot would have its own copies. Both slots would still share the root, the per-name lock, the server's one mirrored tool list, and `#references`.

## Pool under several tokens

- `acquire` appends a waiter (`pool/src/core/Pool.ts:188-198`). `#commit` resolves or rejects only `#waiters[0]` (`:643-672`).
- An idle record is validated, then leased (`:344-348`, `:564-606`). Creation inside `acquire` runs only when `min` is undefined (`:382-386`). With `min` set, `max` defaults to `min` (`pool/src/core/types.ts:74-76`, `pool/src/core/Pool.ts:111`).
- `release` removes the lease and `#recycle` pushes that record onto `#available` (`pool/src/core/Pool.ts:701-715`). `destroy` disposes that record through `#lose` (`:299-306`, `:468-484`). A token that has already settled returns from either call (`:291-305`).
- `watch` starts once per inserted record (`:448-462`). Disposal aborts its signal before the destroy hook (`:730-733`).
- `#strikes` is initialized to `0` (`:70`). `start` assigns `0` when `#spent()` is true (`:157`). A successful grant assigns `0` (`:671`). A failed refill adds one (`:437-438`). `#strike` adds one only when `min` is set and the record is absent from `#used` (`:487-491`), which includes a failed validation (`:591`).
- `:408-409` decrements `#owed` as a below-floor refill starts. `:759` increments `#owed` after a successful destroy of a record that was in `#owing`. A leased loss adds the record to `#owing` (`:476`) and `#strike` leaves `#strikes` unchanged for a record already in `#used`.
- A failed destroy under `min` stores a survivor and leaves `#owed` unchanged (`:754-760`).
- When `min` is set, nothing is refilling, nothing is destroying, `resources.size >= min`, and `survivors.size > 0`, the waiter is marked failed with `cleanup` (`:351-366`). The type and the guide state that this refusal stands with live leases (`pool/src/core/types.ts:131-133`, `pool/guides/pool.md:159-160`). `pool-design-1-attack.md:81` names this branch as rejecting a waiter while another holder's live lease could still be released.
- When that survivor condition is false and the spent-floor condition is false, the `min` loop `break`s and the waiter stays queued (`pool/src/core/Pool.ts:368-380`).
- `#spent` is `#strikes > #restarts` (`:396-398`). A spent floor with `#owed === 0`, nothing refilling, and nothing destroying marks the waiter failed with `create` (`:368-378`). A leased loss whose destroy succeeds still receives one refill: the guide says the credit is spendable only after that removal, and a failed disposal grants none (`pool/guides/pool.md:146-148`).
- `destroy` rejects queued waiters with `destroyed`, disposes every record, and returns one shared promise (`pool/src/core/Pool.ts:233-253`, `:818-835`). Browse awaits that promise (`browser/src/server/BrowserMCPServer.ts:239-244`).

## MCP sessions

- `createMCPRoutes` dispatches each POST and mints no session id (`mcp/src/server/factories.ts:141-172`). `createMCPSession` stores sessions in a `Map` and mints one on a legacy `initialize` that carries no valid id (`mcp/src/server/middlewares.ts:105`, `:181-193`). `createWebSocketServer` calls `bindServer` on the same dispatcher for each claimed socket and keeps those sockets in `live` (`mcp/src/server/factories.ts:318`, `:355-365`). `createStdioServer` binds one input and one output (`:484-500`).
- `StdioServerTransport.session` and `WebSocketServerTransport.session` return `undefined` (`mcp/src/server/transports/StdioServerTransport.ts:72-75`, `mcp/src/server/transports/WebSocketServerTransport.ts:69-72`).
- `MCPExecutionContext` carries `request`, `call`, `tools`, `signal`, an optional `caller`, and an optional `progress` (`mcp/src/core/types.ts:865-872`). `MCPDispatchOptions` carries an optional `signal` and an optional `caller` (`:1721-1726`). Its remarks say sessions mint transport identity and this package does not treat `caller` as that identity (`:1716-1718`). `bindServer` passes `{ signal }` (`mcp/src/core/helpers.ts:1883`). The HTTP handler adds `caller` only when `options.caller` returns a value (`mcp/src/server/handlers.ts:198-201`). The middleware writes the session onto `context.state.session` (`mcp/src/server/middlewares.ts:198-199`).
- `createMCPLegacy` copies `server.handshake` (`mcp/src/core/factories.ts:88-93`). `MCPLegacy` awaits it inside the `initialize` arm (`mcp/src/core/MCPLegacy.ts:142-147`). `MCPServerOptions` says the other methods do not await it (`mcp/src/core/types.ts:2159-2162`). `#register` maps `server/discover` to `#discover` with no handshake call (`mcp/src/core/MCPServer.ts:345`).
- Browse passes `#handshake` into `createMCPServer` and serves it through `createStdioServer` (`browser/src/server/BrowserMCPServer.ts:180-189`). `#handshake` awaits the one `#starting` promise (`:350-352`). `src/bin/main.ts` selects no other transport (`:35-43`).

## Probe precedent

- `@orkestrel/probe` `0.0.20` at `dee8845` depends on `@orkestrel/queue` and has no `@orkestrel/pool` dependency (`probe/package.json:94-101`).
- Each `prove` enqueues one inspection on the type queue, the lint queue, and the runtime queue, then awaits all three (`probe/src/server/Probe.ts:436-446`). Each queue is constructed with `concurrency: 1` (`:144-158`). Project resolution and type inspection also share `#typeTail` (`:577-586`).
- `#type`, `#lint`, and `#runtime` are assigned at construction (`:137-139`). `#recycle` replaces one of them after a deadline (`:536-574`).
- The guide says one queue per stage admits inspections in arrival order, one at a time (`probe/guides/probe.md:1034-1037`).
- ROADMAP item 1 says the intended server acquires from a pool for each `prove` and calls `token.destroy()` where `#recycle` runs now (`probe/ROADMAP.md:5`).
- The probe design record rules one acquire per stage inspection and one per project resolution, `release` on return, and `token.destroy()` on deadline, and it cites browse's held lease at `BrowserMCPServer.ts:375-402` (`scaffold/.orkestrel/veneer/lifecycle/eager/probe-design.md:167-170`).

## Readings and records

- U12 was Windows 11, Node 24.21.0, Edge 154.0.4258.53, on 2026-10-04 (`scaffold/.orkestrel/veneer/lifecycle/eager/readings.md:3`).
- Idle `start()` medians are 0.69 s, 0.68 s, and 0.70 s at sizes 1, 2, and 3. Loaded onset medians are 1.40 s, 1.36 s, and 1.30 s. Loaded full-floor medians are 1.19 s, 2.54 s, and 5.37 s (`:28-30`). Loaded spawn-to-`initialize` medians are 1.27 s, 1.31 s, and 1.32 s (`:31`).
- M3, leased-browser kill to the next successful call: 1.92 s at size 1 and 0.40 s at size 2 (`:33`). M5 in-call loss, interrupted call answered: 39 ms and 46 ms. Next call succeeds: 1.54 s and 73 ms (`:34-35`).
- M4 spare tree at size 2: summed working set 1.22 GB, range 0.99 GB to 2.04 GB, shared pages counted per process (`:39`). After the floor filled, that sum grew from 1.22 GB to 1.78 GB over 2 minutes, with a burst near 130% of one core and then a median near 10% (`:46`).
- The user set the default size to 1 and left `BROWSER_SERVER_RESTARTS` at 1, and recorded that a spare becomes capacity when parallel holders land (`:50-51`).
- D-5 records one strike counter, reset on grant at `Pool.ts:671` and on a spent `start` at `:157`, with the owed attempt at `:408-409` and `:759`, and says each holder's grant would reset the strikes (`scaffold/.orkestrel/veneer/lifecycle/reassessment-2026-10-04.md:18`). Rank 12 names the retained-floor refusal at `Pool.ts:352-366` and that reset as rulings for item 14 (`:57`).
- Browser ROADMAP item 14 says the session holds one `#lease` and concurrent calls share `#granting`, so every other warm browser waits for failover, and a replay runs on the session's browser. It names release-or-destroy, the size ceiling, the pool 0.0.14 floor refusal, and a contention measurement before the default changes (`browser/ROADMAP.md:6`).
- `proposal-library.md:90-98` describes a lease as `{ member, browser, signal, release }`, FIFO hand-out of the longest-ready member, and the spare as failover, with replays on the session toolset and a second replay refused while one runs.
- `proposal-analyst.md:146-156` says the server keeps its interactive lease across tool calls because the toolset serializes actions and replay shares that session. `:450` records rejection of adding parallel replay in order to justify the spare.
- `synthesis.md:717` records one stdio session as one holder, and a second holder at once as the change that makes the lease several holders.
- `judges.json:87` asks whether failover was the whole of balancing or whether browse must serve a second holder at once. `:85` says legacy `initialize` and modern `server/discover` would await the handshake hook.
- `design.md:3` says browse composes one `Pool<BrowserSlot>` with `min` equal to the size and supplies the session's one held lease.

## Distillate

One `browse` process serves one stdio pair and holds one `#lease` across calls. A missing lease is one shared `#granting`. Concurrent calls use that slot. Actions on it queue through `#tail`. `look`, `read`, `plain`, `tabs`, and `wait` do not enter that queue. A second replay is refused by `#replaying` and `toolset.held` on that toolset. The pool leases one record per token up to `min`, which is the configured size, default 1, ceiling 3, with `max` equal to `min`. Another `acquire` waits at the head of `#waiters` until some token `release`s or its record is destroyed. If retained survivors already fill the floor, that waiter is refused with `cleanup` while a live lease still exists. Every grant sets the single `#strikes` counter to 0. `release()` returns the same record to idle after `validate`. Browse's loss path calls `destroy()`. The page, journey toolset, reading, action queue, and replay flag live on the slot's toolset. Journey and run files share one root and lock per journey name. The tool hook receives the JSON-RPC request, the call, a signal, and an optional caller. Browse's stdio transport exposes no session id. Probe at `dee8845` still admits through per-stage queues and keeps each stage for the process; the design record's inspection lease is released on return.

## Unknowns

- Whether `tests/service/browse.test.ts` covers two observation calls in flight on one page. I read `#forward`, `#acquire`, and the U7 case at `browse.test.ts:160-179`. I did not read the rest of that file.
- A memory figure for one browser process. I read `readings.md:26-46`, which reports the spare tree's summed working set.
- A contention sample for two holders at once. I read the U12 table in `readings.md:26-46`, which reports onset, failover, and one idle spare.
- Whether any `server/discover` path awaits `handshake`. I read `MCPLegacy.ts:142-175`, `MCPServer.ts:345`, and `types.ts:2159-2162`. `judges.json:85` says discover would await it. I did not read the body of `#discover`.
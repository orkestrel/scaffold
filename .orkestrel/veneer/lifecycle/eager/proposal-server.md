# Proposal: eager, recovering `browse` with a warm spare (the smallest change)

**Lane:** subjective (API shape, naming, ergonomics, design fit). I also hold every objective fact the inputs establish.

**Angle:** the smallest change that meets D1 to D8. The pool stays private to the `browse` server. The library gains only what the server cannot work without. `@orkestrel/mcp` does not change.

## Design

The design has five parts:

- **Setup at start.** `start()` removes the profiles that ended servers left behind. It then launches every browser at once and starts reading stdio only after one browser is warm. Meanwhile the client's `initialize` waits in the pipe. If no browser can start, the server releases everything and exits with code 1, writing one coded line to stderr before it answers anything.
- **Slots.** Each browser lives in a slot that holds:
  - a fresh profile, `ROOT/.profiles/PID-UUID`;
  - its own Chromium process;
  - one isolated context with one page;
  - one toolset.

  The MCP session leases the lowest-index warm slot on its first call and keeps it. The other slots are warm spares, set by the `spares` option and the `BROWSE_SPARES` variable.
- **Liveness.** Liveness comes from events plus one check at hand-out. The events are the browser `disconnect` event and the page `crash` event on the session's current page. The check is a `ping` before every call, bounded by the browser's own command deadline. No timer runs.
- **Faults.** A fault releases the slot's current browser (its incarnation) and re-warms the slot after the release finishes.
  - A fault on the leased slot ends the lease, and the session learns it from the next answer it gets.
  - A fault on an unleased slot, or a failed warm-up, counts a strike. A second consecutive strike retires the slot. Granting a lease resets the slot's strikes.
- **One place for each.** `#warm` is the only code that creates a profile, a browser, or a toolset. `#release` is the only code that releases one. `start()` and `destroy()` are built from those two methods.

## Rulings

### 1. Where the launch starts and what the handshake does meanwhile

**Ruling:** the launch starts in `start()`, before the transport reads. The handshake waits because stdin is not read until one browser is warm. A failed start shows as exit code 1 with a coded stderr line, before any answer.

- **Why `start()`.** It is the earliest point that can await and report a failure. A constructor cannot await, and `createBrowserMCPServer` is documented to return a server "that reads nothing until `start()`" (src/server/factories.ts:96). `src/bin/main.ts:22-29` calls `start()` right after it parses the environment, so `start()` is the highest point upstream.
- **How the handshake waits without changing `@orkestrel/mcp`.** `@orkestrel/mcp` 0.0.35 answers `initialize` inside `MCPLegacy` with no hook (mcp:src/core/MCPLegacy.ts:140-150; map.md:17, 25). But the stdio carrier subscribes to its input only in `start()` (mcp:src/server/factories.ts:493-495; mcp:src/server/transports/StdioServerTransport.ts:83-100). Delaying `transport.start()` therefore delays every handshake path: legacy `initialize` and modern `server/discover` alike.
- **Why an exit and not a per-call error.** D4 wants the failure shown before the session depends on a tool. Answering `initialize` at once and failing on every call breaks that. An exit before the answer shows the server as failed in each client (clients.md:18-20), and the specification lets a stdio server end the session by exiting (clients.md:10).
- **Client startup timeouts.** Claude Code waits 30 s and connects in the background (clients.md:18). Codex waits 10 s (clients.md:19). Cursor does not document one (clients.md:20).
  - The handshake waits for one warm browser, not all of them, so it carries only the fastest warm-up.
  - Measurement M2 tests that against the Codex budget.
  - For a slower host, the guide names Codex's `startup_timeout_sec` setting.
- **Consequence.** Listing tools with Chromium absent goes away (src/server/BrowserMCPServer.ts:36-44; tests/src/bin/main.test.ts:34-71). D1 and D4 intend this.

### 2. Crash detection

Each fault signal is an event, or the reply to a command the work itself sends:

- **Owned process exits.** `Browser` emits `error` with cause `process-exit`, then `disconnect` (src/server/Browser.ts:407-418). The server listens to `disconnect`.
- **Socket drops.** A transport `close` or `error` is confirmed after `BROWSER_TRANSPORT_LOSS_DEFER_MS` and ends in `disconnect` (Browser.ts:422-442, 468-475). If the process is already dead, the exit path runs instead (Browser.ts:430-432). The same listener covers both.
- **Renderer crashes.** `Inspector.targetCrashed` makes the page emit `crash` (src/core/BrowserPage.ts:368, 1904-1906), and nothing subscribes to it today (map.md:85).
  - The server listens on every page the slot's context publishes. The context emits `page` for created and adopted pages alike (src/core/BrowserContext.ts:475-481).
  - The server acts only when the crashed page is the toolset's current view. `toolset.view` returns the current page (src/core/BrowserToolset.ts:360-362, 537-539).
- **Browser stops answering.** No event exists for this. A timed-out command rejects only that request (src/core/CDPClient.ts:134-145; map.md:89).
  - The server calls `ping` before each call. The deadline is the browser's own command timeout, `BROWSER_DEFAULT_TIMEOUT_MS` (src/core/constants.ts:96).
  - A rejection that is not the call's own abort counts as a fault.
  - This check is triggered by work, never by a schedule. A spare that hangs while idle is found when it is handed work, which is the moment D7 names.
- **Own teardown is not a fault.** The server's own `destroy()` raises no fault: `#finish` emits `destroy`, not `disconnect` (Browser.ts:1144-1158), and an exit after destroy is ignored (Browser.ts:389).

### 3. Recovery

- **What is rebuilt.** A fresh incarnation in the same slot: a Chromium process, a profile, one isolated context, one page at `about:blank`, and a toolset with its journey toolset. The journey and run stores are fresh objects over the same root, so saved journeys and written runs persist (map.md:69).
  - The replacement launches only after the dead incarnation's release settles, so the pool never runs more Chromium processes than its size (D6).
  - Mirrored page tools follow the leased toolset. The dead page's adopted tools are withdrawn from the server's manager (BrowserMCPServer.ts:262-290).
- **What is lost.** The page and its tabs, the retained reading, holds, dialogs, an unsaved recording, and an in-flight replay. `#release` calls `toolset.destroy()`, which aborts the replay and waits for it (map.md:69; BrowserToolset.ts:2075-2092).
- **How the agent learns it.**
  - When the leased slot faults, the server records the page's last address. `url` is cached on the page, so it can still be read after death (src/core/BrowserFrame.ts:84-85; BrowserPage.ts:139).
  - A call already running on the dead browser gets its CDP rejection (map.md:83) replaced by an error with code `BROWSER_SERVER_CRASH`.
  - If no call was running, the next call is refused with that error without running.
  - The message says what was lost and gives the last address. It names the next step: call `navigate`.
  - The tool layer passes only the message text to the client (map.md:32), so the text must stand on its own.
- **The last address is not restored.** Navigating back could repeat side effects, could re-crash on the same page, and would be product policy.
- **How a crash loop ends.** A strike is a failed warm-up, or a fault while the slot is unleased. A lease resets the slot's strikes. At `BROWSER_SERVER_STRIKES` (2) consecutive strikes the slot retires.
  - Why one retry: deterministic causes recur on the retry. Those are a missing executable, the occupied-port refusal (Browser.ts:543-549), an unwritable profile, and the root sandbox refusal. A transient cause, such as a launch timeout on a loaded host, can clear on one retry.
  - A fault while leased never strikes. It is driven by the agent's own work, and the agent sees each one.
  - With every slot retired, each call answers `BROWSER_SERVER_UNAVAILABLE` with the last cause. The server stays up rather than exiting, because Claude Code does not restart a stdio server (clients.md:18) and exiting would lose the cause.
- **Profile cleanup.** `#release` removes each incarnation's profile. A killed server runs no code, so `start()` sweeps `ROOT/.profiles` instead:
  - It removes each entry whose `PID-` prefix names no running process, and each entry with no pid prefix (the bare `UUID` layout of earlier versions).
  - It keeps entries owned by this process: two servers in one process share a pid (tests/src/server/BrowserMCPServer.test.ts:179-225).
  - It keeps entries whose pid is alive, and leaves an entry whose removal fails for the next start.
  - The liveness test is `process.kill(pid, 0)`: `ESRCH` means dead, `EPERM` means alive.

### 4. The pool

- **States per slot.** `warming`, `ready`, `busy`, `retired`. Recovery is warming with a predecessor, not a separate state.
  - Nothing stores a `busy` flag. "Busy" means the slot is the session's lease. "Ready" means the slot is in the server's ready map. Both follow from state the server already holds.
- **Liveness.** Events cover every slot in every state (ruling 2). Whether a browser answers is checked at each hand-out. A periodic check is refused (Refusals).
- **Work in flight on a browser that dies.** Its CDP requests reject (map.md:83), and the server replaces that answer with `BROWSER_SERVER_CRASH`.
- **The lease.**
  - The holder is the MCP session, the only holder a stdio server has.
  - The holder gets the slot: every call runs on that slot's toolset.
  - The lease is assigned at the session's first call and on each call after a loss.
  - It ends only when its browser faults or at `destroy()`. A holder that fails ends the session itself: stdin ends and `destroy()` runs.
- **Balancing rule.** A call runs on the session's leased slot, because the session's page state lives on that toolset. A lease goes to the lowest-index ready slot that nobody holds.
  - With one holder, this makes one slot busy and the rest spares.
  - The rule extends unchanged to a second holder (Tensions).
- **A second process, not a second context.** A process-level fault would kill a spare context together with its sibling, so a context gives no failover for exit, socket loss, or a hang.
- **What a spare serves.** Instant failover, nothing else.
- **When each browser starts.** At `start()`, concurrently. After a fault, the slot re-warms once its release has finished. A browser never starts on a call.
- **Idle cost.** Measured by M4.

### 5. Placement

- **In the library (`@orkestrel/browser/server`, `Browser`):**
  - the `endpoint` getter: D7 names the endpoint as a tracked fact, and the D8 proof reads it to show the port is released;
  - the `ping` method: no browser-level round trip exists in the public members (src/server/types.ts:227-305).
- **In the server (`BrowserMCPServer`, private):**
  - the slots, the lease, liveness, recovery, the sweep, and teardown;
  - the `BrowserSlot` record type in `src/server/types.ts`. Internal record types live there and are exported; the precedent is `BrowserToolsetWatch` (src/core/types.ts:3025-3031).
- **In `src/bin/main.ts`:** the `BROWSE_SPARES` variable.
- **No eager-off switch.** D1 fixes eager start. A host that wants no Chromium does not run `browse`, and wiring tests pass a `launch` function (types.ts:349).

### 6. Proof

- **Real Chromium.** Every D-claim is proved with real Chromium in `tests/service/browse.test.ts`, a test file this change adds.
  - It uses a recording `launch` that wraps `createBrowser` and records each instance, its pid, and its endpoint.
  - Crashes are caused for real: `process.kill(pid)` for an exit, CDP `Page.crash` for a renderer crash, and `SIGSTOP` (POSIX only) for a hang.
- **Fixture-based wiring tests** in `tests/src/server/BrowserMCPServer.test.ts` change shape, because a launch no longer happens on a call (BrowserMCPServer.test.ts:34-69, 71-120, 122-177).
- **The bin tests** keep the start-time failure in `src:bin`, which runs no Chromium. The live SIGTERM case moves to the service tier.
- **`tests/service/browser.test.ts`** keeps its launch per test, deferred to a later change. Those tests prove `Browser`'s own launch lifecycle, and status.md:25 asks for the cold-launch measurement first.

### 7. Tests outside `browse`

- The Vitest provider calls Playwright's `chromium.connect`, which needs a Playwright browser server (status.md:15). `launchServer` owns its own Chromium over the pipe transport (map.md:132, 138). So the pool's raw CDP browser cannot serve `PLAYWRIGHT_WS_ENDPOINT`.
- A CDP attach (`connectOverCDP`) can use the `endpoint` getter; `tests/service/document.test.ts` already attaches that way (browser-browse-map.md:72).
- **Ruling:** the pool serves no test browser in this change. The `ws-endpoint-probe` unit settles the facts.

### 8. What carries over to `@orkestrel/probe` (noted only, nothing designed there)

These parts carry over to probe's server start:

- build the `Probe` in `start()` before `transport.start()`, so the handshake waits on setup, instead of building it on the first `prove` (browser-browse-map.md:87-89);
- show a failed start as exit 1 with a coded stderr line;
- one setup method and one release method;
- event-driven stage faults, plus the replacement-on-deadline that probe already has (browser-browse-map.md:95);
- a start-time sweep of state that dead pids left behind;
- no pool: a second warm stage would be D3's question again, measured first.

## Type sketch (`src/server/types.ts`)

These are the additions and revisions. Unlisted members are unchanged.

```ts
import type { BrowserCallOptions, BrowserToolsetInterface } from '@src/core'

export interface BrowserInterface {
	// existing members unchanged
	/**
	 * Reports the CDP WebSocket endpoint of the represented session, or undefined when none is
	 * represented.
	 *
	 * @remarks
	 * A connect sets it, an owned session keeps it across a disconnect, and an observed process
	 * exit and `destroy()` clear it.
	 */
	readonly endpoint: string | undefined
	/**
	 * Sends CDP `Browser.getVersion` and resolves when the browser answers, changing no state.
	 *
	 * @remarks
	 * Rejects with `BrowserDestroyedError` after `destroy()`, with `BrowserNotConnectedError` while no
	 * connection is active, with `CDPTimeoutError` when no answer arrives within `options.timeout` or
	 * the browser's `timeout`, and with the signal's reason when `options.signal` aborts.
	 */
	ping(options?: BrowserCallOptions): Promise<void>
}

/** Creates each browser a browse server keeps warm. */
export type BrowserLaunchFunction = (options: BrowserOptions) => BrowserInterface

/**
 * Configures the browse server.
 *
 * @remarks
 * - `spares` — how many warm browsers stand by beside the session's, an integer from 0 through
 *   `BROWSER_SERVER_SPARE_LIMIT`. Default: `BROWSER_SERVER_SPARES`
 * - `launch` — creates each browser the server keeps warm. Default: `createBrowser`
 * (other rows unchanged)
 */
export interface BrowserMCPServerOptions {
	readonly root?: string
	readonly headless?: boolean
	readonly executable?: string
	readonly readonly?: boolean
	readonly spares?: number
	readonly launch?: BrowserLaunchFunction
	readonly stdio?: StdioServerOptions
}

/** Holds one browser a browse server keeps warm: the browser, its profile, and the toolset its warm-up builds. */
export interface BrowserSlot {
	readonly browser: BrowserInterface
	readonly profile: string
	readonly toolset: Promise<BrowserToolsetInterface>
}

export interface BrowserMCPServerInterface {
	/**
	 * Removes the profiles that ended servers left under the root, launches every browser, and serves
	 * stdio after the first is warm; when none can start, releases everything and rejects with
	 * `BROWSER_SERVER_UNAVAILABLE`.
	 */
	start(): Promise<void>
	/**
	 * Stops admission, ends the session's lease, and releases every browser: its toolset, which
	 * aborts the active replay, its process, and its profile.
	 */
	destroy(): Promise<void>
}
```

The constants go in `src/server/constants.ts`:

```ts
/** Counts the warm spares a browse server keeps by default; the D3 ruling sets it. */
export const BROWSER_SERVER_SPARES = 0
/** Bounds the spares, so a browse server keeps at most three browsers (D6). */
export const BROWSER_SERVER_SPARE_LIMIT = 2
/** Counts the consecutive unleased failures that retire a browse server's slot. */
export const BROWSER_SERVER_STRIKES = 2
/** Matches a profile directory a browse server names `PID-UUID` under `ROOT/.profiles`. */
export const BROWSER_SERVER_PROFILE_PATTERN =
	/^(\d+)-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/u
```

The new error codes are `BROWSER_SERVER_CRASH`, `BROWSER_SERVER_UNAVAILABLE`, and `BROWSER_SERVER_OPTIONS`.

The server's private state changes as follows:

- **Removed:** `#session`, `#browser`, `#profile`, and `#started` (src/server/BrowserMCPServer.ts:85-88).
- **Added:**
  - `#slots: (BrowserSlot | undefined)[]` — `undefined` marks a retired slot;
  - `#ready: Map<BrowserSlot, BrowserToolsetInterface>`;
  - `#lease: BrowserSlot | undefined`;
  - `#strikes: number[]`;
  - `#lost: string | undefined` — the last address of a lease the session has not yet been told about;
  - `#failure: unknown`;
  - `#releasing: Set<Promise<void>>`;
  - `#change: PromiseWithResolvers<void>` — resolved and replaced on every slot transition; waiters park on it;
  - `#starting: Promise<void> | undefined`.

## State machine (one slot)

Each row is one transition of one slot:

| From | Event | To | Action |
| --- | --- | --- | --- |
| (none) | `start()` | warming | `#warm`: name the `PID-UUID` profile, call `launch`, then build in order: `mkdir`, `connect`, `isolate`, `create`, toolset `start` |
| warming | build resolves and the browser reports `connected` | ready | add to `#ready`, resolve `#change` |
| warming | build rejects, or resolves on a dead browser | warming or retired | strike, release the incarnation, re-warm after the release or retire at the bound |
| ready | the session's call finds no lease | busy | set `#lease` to the lowest-index ready slot, reset its strikes, mirror its tools |
| ready | `disconnect`, current-page `crash` | warming or retired | strike, release, re-warm after the release or retire |
| busy | `disconnect`, current-page `crash`, failed `ping` | warming | end the lease, record `#lost`, unmirror, release, re-warm after the release (no strike) |
| warming, ready, busy | `destroy()` | (released) | abort launches, wake waiters, `#release` every slot, await `#releasing` |
| retired | none | retired | terminal |

## Failure table

Each row gives a failure, the signal that reports it, the server's action, and what the caller sees:

| Failure | Signal | Action | Caller sees |
| --- | --- | --- | --- |
| Chromium cannot start (missing executable, sandbox refusal, unwritable profile) | warm-up rejects (Browser.ts:616-620, 744-750) | strike, retry once, retire; with every slot retired, `start()` runs `destroy()` and rejects with `BROWSER_SERVER_UNAVAILABLE` | the process exits 1 with `browse: BROWSER_SERVER_UNAVAILABLE: …` on stderr and no answer; the client reports the server failed |
| A CDP endpoint answers on port 9222 | `#assertPortFree` throws (Browser.ts:320-322, 543-549) | same as the preceding row | same; see Tensions |
| Launch exceeds its deadline | `BrowserConnectionError` (Browser.ts:769-773) | strike and retry, then retire | at start: the start-time exit; mid-session: one spare fewer |
| A spare's process exits while idle | `disconnect` (Browser.ts:409-418) | strike, release, re-warm or retire | nothing |
| The leased process exits between calls | `disconnect` | end the lease, record `#lost`, release, re-warm | the next call: `BROWSER_SERVER_CRASH` text with the last address; the call after it runs on a spare, or waits for the re-warm when there are no spares |
| The leased process exits during a call | `disconnect`; pending CDP requests reject (map.md:83) | same | the in-flight call: `BROWSER_SERVER_CRASH` text instead of the CDP message |
| Socket drops with the process alive | `disconnect` after the defer (Browser.ts:441, 468-475) | same as an exit; `#release` terminates the process | same |
| Renderer crash on the current page | page `crash`, with the page equal to `toolset.view` | same as an exit | same |
| Renderer crash on a background tab | page `crash` on another page | none | `tabs` lists it; commands on it fail with their own messages |
| Leased browser alive but not answering | `ping` rejects at the command deadline (CDPClient.ts:134-145) | fault, same as an exit | that call waits up to the deadline, then gets `BROWSER_SERVER_CRASH` text |
| Every slot retired mid-session | the last retirement | no lease | every call: `BROWSER_SERVER_UNAVAILABLE` text with the last cause |
| The server is killed (SIGKILL, `TerminateProcess`) | none in-process | the next `start()` sweeps `PID-UUID` entries of dead pids | nothing; see Risks |
| A release step fails | rejection from `#release` | the other steps still run; `destroy()` aggregates the failures | `destroy()` rejects with an `AggregateError` |
| SIGINT or SIGTERM during setup | signal listeners, attached first in `start()` | `destroy()` aborts the launches through the `Browser` signal (Browser.ts:364-369) | `start()` rejects `BROWSER_TOOLSET_ENDED`; the bin exits 1 |

## Measurement plan (D3, D5) and measurements

**Readings supplied:** none from a live run. Every input is a static read (map.md:3; browser-browse-map.md:3).

**Load case (decided by the case, not by a figure):**

- The target Windows host, the one the user says takes heavy load poorly.
- The built `browse` is driven over stdio by a TypeScript instrument run with `node`. It loops a realistic session against a heavy local page: `navigate`, `look`, `read`, `click`, `type`, and a `replay` of a saved journey.
- Meanwhile the host runs the veneer journey projects, the four concurrent browsers status.md:7 names.
- Each reading is reported with every run listed, not only a mean.

**Readings to take:**

- **M1** — warm-up time per slot (launch to toolset started), idle and under load, with one, two, and three slots warming at once.
- **M2** — time from process spawn to the `initialize` answer for each pool size, compared against the Codex 10 s and Claude Code 30 s budgets (clients.md:18-19).
- **M3** — time from killing the leased pid to the next successful call, with a spare and without one. The difference is the spare's value.
- **M4** — idle cost of a spare: working set and CPU of its process tree, idle and while the leased browser works. On Windows, select processes whose command line holds the profile path; on POSIX, the process group.
- **M5** — the `ping` round trip per call under load. It reports the per-call cost and checks that no healthy call trips the deadline.
- **M6** — whether Chromium dies when the server is ended by `TerminateProcess` on Windows (the libuv job object claim) and by SIGKILL on POSIX.

**Readings still missing (to settle unknowns):**

- how Claude Code 2.1.286 and Codex display a stdio server that exits before answering `initialize` (clients.md:28);
- whether any target client pings before the `initialize` answer;
- whether a page answers commands after `Inspector.targetCrashed` (map.md:144).

**Decision:** the user rules on the spare from M3 and M4. `BROWSER_SERVER_SPARES` stays 0 until that ruling.

## Units, in commit order

Each unit edits only the files it lists, writes them serially, and stops at its project boundary.

1. **`endpoint` and `ping` on `Browser`**
   - **Role / engine:** builder (Sonnet 5.5).
   - **Owns:**
     - `src/server/types.ts` (the `BrowserInterface` members only) and `src/server/Browser.ts`;
     - `tests/setupServer.ts` (`BrowserLaunchDouble`: `endpoint` returns `undefined`; `ping` resolves while connected and otherwise rejects `BrowserNotConnectedError`);
     - the mirrored test of `src/server/Browser.ts` and `tests/service/browser.test.ts` (one added case);
     - `guides/browser.md` (the `BrowserInterface` rows).
   - **Spec:**
     - `endpoint` returns `#endpoint`, which is set at Browser.ts:574 and 653 and cleared at 406, 463, and 1150.
     - `ping` throws `BrowserDestroyedError` after destroy and `BrowserNotConnectedError` unless the browser is `connected` with a client. Otherwise it sends `client.send('Browser.getVersion', undefined, { timeout, signal })` with only the defined keys (CDPSendOptions, src/core/types.ts:100-104).
   - **Depends:** none.
   - **Accept (fixture tests):**
     - `endpoint` is `undefined` before `connect()` and after `destroy()`;
     - `ping` resolves when the fixture answers;
     - `ping` rejects `BrowserNotConnectedError` before `connect()`;
     - `ping` rejects `CDPTimeoutError` when the answer is withheld and `timeout` is given;
     - `ping` rejects with the signal's reason on abort.
   - **Accept (real Chromium):**
     - after `connect()`, `endpoint` matches `^ws://127\.0\.0\.1:\d+/devtools/browser/` and that port's `/json/version` answers 200;
     - `ping()` resolves;
     - after `process.kill(pid)` and the `disconnect` event, `endpoint` is `undefined` and `ping()` rejects `BrowserNotConnectedError`;
     - after `destroy()`, the port refuses connections.
   - **Run:** `npx vitest run --config vite.config.ts --project src:server <Browser test file>`, `npx vitest run --config vite.config.ts --project service tests/service/browser.test.ts`, `npm run test:guides`.

2. **Eager pool: setup, lease, teardown (D1, D4, D6, D7 assignment, D8)**
   - **Role / engine:** astra (GPT-6).
   - **Owns:**
     - `src/server/types.ts` (the server block), `src/server/constants.ts`, `src/server/BrowserMCPServer.ts`, `src/server/factories.ts` (the `createBrowserMCPServer` doc);
     - `tests/src/server/BrowserMCPServer.test.ts` and `tests/service/browse.test.ts` (new);
     - `guides/browser.md` (the server rows).
   - **Spec:**
     - **Constructor:** validates `spares` as an integer from 0 through the limit; any other value throws `BrowserError` with `BROWSER_SERVER_OPTIONS`.
     - **`start()`:** `#starting ??= #setup()`. `#setup` runs in this order:
       1. attach the signal listeners;
       2. `mkdir(ROOT/.profiles, { recursive: true })`;
       3. `#sweep()`;
       4. `#slots = Array.from({ length: spares + 1 }, (_, index) => this.#warm(index))`;
       5. `await #wait(#abort.signal)`; on failure, `await destroy()` and rethrow `BROWSER_SERVER_UNAVAILABLE`, whose message carries the cause;
       6. `transport.start()` and the input `end` listener.
     - **`#warm(index, after?)`:** creates the record synchronously. The launch options are those at BrowserMCPServer.ts:222-231, with the profile `join(ROOT, '.profiles', `${process.pid}-${randomUUID()}`)`. The build then:
       1. awaits `after` (its rejection ignored);
       2. runs an exclusive `mkdir(profile)`;
       3. attaches `disconnect` to `#fault`;
       4. calls `connect` and `isolate`;
       5. attaches the context `page` listener, which adds a `crash` listener per page;
       6. calls `create`, builds the toolset as at BrowserMCPServer.ts:236-243, and calls `toolset.start()`.

       A build failure destroys only the unpublished toolset. The record's `.then` calls `#settle` or `#strike`.
     - **`#release(slot)`:** awaits `slot.toolset` (rejection ignored), then destroys the toolset, destroys the browser, and runs `rm(profile, { recursive: true, force: true, maxRetries: 5 })`. Every step runs whatever the others do, and failures aggregate.
     - **`#wait(signal)`:** returns the lowest-index slot that is ready and not leased. It throws `BROWSER_SERVER_UNAVAILABLE` when every slot is `undefined`, and otherwise races `#change` against the signal.
     - **Lease:** `#forward` calls `#admit`, which leases through `#wait` when `#lease` is undefined, resets that slot's strikes, and mirrors the existing and future tools of its toolset (`#mirror`, BrowserMCPServer.ts:262-268).
     - **`destroy()`:**
       1. remove the listeners, stop the transport, and remove the dispatchers (BrowserMCPServer.ts:147-153);
       2. unmirror, abort, resolve `#change`;
       3. `#release` every current slot and await every promise in `#releasing`;
       4. aggregate the failures.
     - **Sweep:** applies `BROWSER_SERVER_PROFILE_PATTERN` as in ruling 3.
   - **Depends:** unit 1.
   - **Accept (real Chromium; the recording launcher records each `connect()` start and `destroy()` settlement):**
     - `start()` resolves only after a recorded browser reports `connected`. An `initialize` written to the input before `start()` resolves is answered after it.
     - `spares: 1` records exactly two browsers. `spares: 3`, `-1`, and `0.5` throw `BROWSER_SERVER_OPTIONS`.
     - `navigate` and then `look` run on one pid: `look` shows the navigated URL, and the other slot's page stays at `about:blank`.
     - After `destroy()`:
       - every recorded pid gives `ESRCH` to `process.kill(pid, 0)`;
       - every recorded endpoint's port refuses connections;
       - no `ROOT/.profiles` entry carries this pid's prefix;
       - the `SIGINT` and `SIGTERM` listener counts equal those before `start()`;
       - the input holds no `end` listener from the server.
     - The sweep removes a `DEADPID-UUID` entry (the pid of an exited child) and a bare `UUID` entry. It keeps the entry of a running child's pid and the entries of this process's pid.
     - A missing `executable` makes `start()` reject `BROWSER_SERVER_UNAVAILABLE` with the ENOENT cause. The output is empty and no profile is left.
   - **Run:** the touched files in `src:server` and `service`, `npm run test:src:server`, `npm run test:guides`.

3. **Liveness and recovery (D2, D7 liveness, failover)**
   - **Role / engine:** astra (GPT-6).
   - **Owns:** `src/server/BrowserMCPServer.ts`, `tests/service/browse.test.ts`, `tests/src/server/BrowserMCPServer.test.ts`, `guides/browser.md` (the server remarks).
   - **Spec:**
     - **`#settle`:** adds the slot to `#ready` only when the slot is still current and its browser is `connected`. Otherwise it routes to `#strike`.
     - **`#fault(index, browser)`:** returns early unless `#slots[index]?.browser === browser`, the slot is in `#ready`, and the server is not closing. It then:
       - removes the slot from `#ready`;
       - if the slot is leased, clears `#lease`, sets `#lost` to `toolset.view.url`, unmirrors, and withdraws every non-vocabulary dispatcher;
       - otherwise counts a strike;
       - adds `#release(slot)` to `#releasing`;
       - retires the slot at the bound, otherwise re-warms with `after` set to that release;
       - resolves `#change`.
     - **`#strike`:** the same, for a failed warm-up.
     - **`#crash`:** calls `#fault` only when the crashed page is `#ready.get(slot)?.view`.
     - **`#admit`:**
       - if `#lost` is pending, it consumes it and throws `BROWSER_SERVER_CRASH`;
       - otherwise it leases if needed and calls `browser.ping({ signal })`;
       - on a rejection that is not an abort, it calls `#fault` and then throws the consumed loss.
     - **`#forward`:** after the tool result, if the lease changed and `#lost` is pending, it consumes it and throws `BROWSER_SERVER_CRASH` in place of the failure.
   - **Depends:** units 1 and 2.
   - **Accept (real Chromium, `spares: 1` unless stated):**
     - Kill the leased pid after `navigate` to a local page. The next call answers `isError` text containing that URL. The call after it runs on the other pid. One replacement launch is recorded. After it warms, `.profiles` holds two entries with this pid's prefix.
     - A pending `wait` call answers the loss text when its browser is killed.
     - CDP `Page.crash` on the current page gives the next call the loss text.
     - POSIX only: `SIGSTOP` on the leased pid. The recording launcher sets the browser `timeout` to a deadline the test case decides. The next call answers the loss text, and the stopped pid is gone afterwards.
     - Killing the spare's pid leaves the next call on the same pid, with no loss text, and records one replacement.
     - With a recording launcher whose later launches use a missing executable:
       - killing the spare records exactly two failed relaunches and then none;
       - killing the leased pid gives the loss text, and the calls after it answer `BROWSER_SERVER_UNAVAILABLE` text naming ENOENT.
     - `spares: 0`: after a kill, the next call gets the loss text and the call after it waits for the re-warm and succeeds.
     - Each replacement's `connect()` starts after its predecessor's `destroy()` has settled.
   - **Run:** as for unit 2.

4. **The bin and `BROWSE_SPARES` (D1 and D4 at the process level)**
   - **Role / engine:** builder (Sonnet 5.5).
   - **Owns:** `src/bin/main.ts`, `tests/src/bin/main.test.ts`, `tests/service/browse.test.ts` (after unit 3), `guides/browser.md` (the variable list at 3523-3530).
   - **Spec:**
     - parse `BROWSE_SPARES` with `parseInteger` (node_modules/@orkestrel/contract/dist/src/core/index.d.ts:4688);
     - an empty value counts as unset;
     - a non-integer exits 1 with `BROWSER_SERVER_ENVIRONMENT`, following the pattern at src/bin/main.ts:10-21.
   - **Depends:** unit 3.
   - **Accept (`src:bin`):**
     - a missing executable makes the child exit 1 with exactly one stderr line, `browse: BROWSER_SERVER_UNAVAILABLE: … ENOENT …`, and empty stdout even though `initialize` was written;
     - `BROWSE_SPARES=many` exits 1 with the `BROWSER_SERVER_ENVIRONMENT` line;
     - `BROWSE_SPARES=3` exits 1 with the `BROWSER_SERVER_OPTIONS` line.
   - **Accept (`service`, built entry, system browser):**
     - `initialize`, `tools/list`, and `navigate` answer;
     - the end of input gives exit 0 and leaves no profile with the child's pid prefix;
     - on a host where `COOPERATIVE_SIGTERM` holds, SIGTERM gives the same result.
   - **Run:** `npx vitest run --config vite.config.ts --project src:bin tests/src/bin/main.test.ts`, the service file, `npm run test:guides`.

5. **Measurement (D3, D5)**
   - **Role / engine:** builder writes the instrument (TypeScript run with `node` under the checkout's `tmp/`); the Orchestrator runs it on the target host.
   - **Owns:** the instrument and its readings record.
   - **Depends:** unit 4.
   - **Accept:** readings M1 to M6, each with host, Chromium version, load description, and every run. No default changes in this unit.

6. **Default and guide prose (after the user's D3 ruling)**
   - **Role / engine:** opus (Opus 5.5).
   - **Owns:** `src/server/constants.ts` (the `BROWSER_SERVER_SPARES` value), `guides/browser.md` (§ Register the browse binary with Claude Code), `README.md` and `ROADMAP.md` where they describe the lazy launch.
   - **Spec:** the guide states that:
     - Chromium starts at server start;
     - it lists each client's startup budget, with Codex's `startup_timeout_sec`;
     - it describes `BROWSE_SPARES`;
     - it shows the loss text and the start-time failure line.
   - **Depends:** unit 5 and the ruling.
   - **Accept:** `npm run test:guides` is green, and every behavior claim in the prose is backed by a unit 3 or unit 4 assertion.

7. **Conditional: the `@orkestrel/mcp` handshake hook (only if the Tensions ruling chooses it)**
   - **Role / engine:** astra, in `C:\Users\mikes\WebstormProjects\mcp`.
   - **Spec:** sketched under Alternatives.
   - **Release order:** `@orkestrel/mcp` 0.0.36 publishes before `@orkestrel/browser` re-pins it. `browse` then starts its transport first and passes its setup promise.

## Alternatives

The two main alternatives are an `@orkestrel/mcp` handshake hook and a public pool class.

- **An `@orkestrel/mcp` handshake hook.** A `ready` promise on `MCPServerOptions`, exposed on `MCPServerInterface`. Legacy `initialize` (mcp:src/core/MCPLegacy.ts:140-150) and `server/discover` would await it, `ping` never would, and a rejection would answer the handshake with a JSON-RPC error carrying the rejection's message.
  - **What it gains:** pings answered promptly during setup, because `bindServer` handles each message concurrently (mcp:src/core/helpers.ts:1868-1907); the end of stdin seen during setup; the cause delivered inside the protocol.
  - **Specification basis:** the lifecycle allows an error reply to `initialize` (clients.md:9).
  - **Why the design wins for now:** `browse` can wait on the handshake without it (ruling 1). The client display of an exit and of an `initialize` error are both unread (clients.md:26, 28). The hook would add a release-order dependency for a gain no reading has yet shown.
- **A public `BrowserPool` class in `src/server`**, reused later by service tests. It would carry its own interface, options, member type, factory, guide section, and example. It loses because no consumer beyond `browse` exists in this change (the minimal public API law). Its first test consumer is the deferred shared-browser change (ruling 6). The pool's members are also `browse`-specific: they hold a toolset and journey stores.

These further options were rejected:

| Rejected option | Reason |
| --- | --- |
| Answer `initialize` at once and report a failed launch per call, with relaunch | Breaks D4 (the session already depends on the tools) and D7 (a launch caused by a caller) |
| Answer at once and send `notifications/message` | Needs a logging capability and a push channel in `@orkestrel/mcp` (map.md:37); the failure arrives after the session depends on the tools |
| Launch in the constructor | Cannot await or report; breaks "reads nothing until `start()`" (src/server/factories.ts:96) |
| Hold the handshake until every slot is warm | Adds the slowest warm-up to the handshake against the Codex 10 s budget; the first call needs one browser |
| A spare as a second context in the same Chromium | No failover for exit, socket loss, or a hang |
| Periodic health check | Refused by the no-polling law (see Refusals) |
| `ping` only after a failed call | A hang then costs the call's deadline plus the ping's, past Codex's 60 s tool timeout (clients.md:19) |
| Rebuild only the page and context after a renderer crash | A second recovery path, with no measured need |
| Reconnect the same `Browser` after an exit (Browser.ts:301-325) | Reuses a crashed profile; one profile per incarnation keeps release in one place |
| Restore the last address | Side effects, repeated crashes, product policy |
| Spread one session's calls across browsers | The session's state lives on one toolset (BrowserToolset.ts:2075-2092 lists what it holds) |
| Isolated replays on a spare | `replay` runs on the session toolset (browser-browse-map.md:53); this needs a second holder and goes beyond D6 |
| Crash-loop bound by time window | Fixes an unmeasured figure (D5) |
| Exit when every slot retires | Loses the cause; Claude Code does not restart a stdio server (clients.md:18) |
| An eager-off switch | D1 |
| A public `browsers` snapshot getter on the server | No consumer: tests read the recording launcher |
| `Supervisor` from `@orkestrel/process` | `Browser` owns the spawn, the endpoint hand-off, and group termination (Browser.ts:691-719, 1124-1142); the semantics differ |
| `@orkestrel/queue` for admission | The toolset already serializes actions (map.md:64); a lease needs no queue |
| One profile directory per server pid | Two servers in one process share a pid (BrowserMCPServer.test.ts:179-225) |
| A `browsers` count option | Collides with `BrowserOptions.browsers`, the candidate-source overrides (types.ts:161-163, 177) |

## Constraints

- `initialize` is answered in `MCPLegacy` with no hook (mcp:src/core/MCPLegacy.ts:140-150), and `ping` is answered there too (mcp:src/core/MCPLegacy.ts:151-152).
- The stdio carrier reads only after `start()` (mcp:src/server/factories.ts:493-495; mcp:src/server/transports/StdioServerTransport.ts:83-100).
- A tool failure reaches the client as message text only (map.md:32); `#forward` throws `BrowserError(message)` (src/server/BrowserMCPServer.ts:192).
- `disconnect` follows an exit and a transport loss (Browser.ts:409-418, 468-475); destroy emits `destroy` (Browser.ts:1144-1158).
- A page `crash` has no subscriber (map.md:85); a CDP timeout emits no event (CDPClient.ts:134-145).
- `toolset.view` is the current page (BrowserToolset.ts:360-362, 537-539); a page's `url` is cached (BrowserFrame.ts:84-85).
- The context publishes created and adopted pages (BrowserContext.ts:475-481).
- `Browser` never removes a caller's profile (helpers.ts:174-175, 190-191).
- The spawn is `detached` on POSIX only (helpers.ts:368-371).
- The launch binds port 0 while the probe checks 9222 (helpers.ts:363; Browser.ts:320-322).
- `BrowserLaunchFunction` is synchronous (types.ts:349).
- `BrowserLaunchDouble` implements `BrowserInterface` (tests/setupServer.ts:1526).
- One class per implementation file and no module-scope type (architecture.md:47-48); `main.ts` declares nothing (architecture.md:53).

## Refusals

| Option | Rule that forecloses it |
| --- | --- |
| A heartbeat timer | "No polling/busy loops or recursive microtasks as architecture. Park idle work on an event/abort wakeup" (architecture.md:318) |
| Reaching `Browser`'s private client to send a ping | "When the host needs behavior the interface lacks, add it to the interface as a real entity capability; never reach a private member" (architecture.md:216) |
| Keeping the lazy launch beside the eager one | "No compatibility shims. Update every consumer in the same change." (AGENTS.md) |
| Simulating crashes with a fake | "NEVER use mocks, behavioral fakes, module replacement, framework spies, or fake clocks for project-owned behavior." (AGENTS.md) |
| A `poolSize` option key | "Ungrouped option keys: one word." (names.md:29) |
| A slot type declared in `BrowserMCPServer.ts` | "It contains no module-scope interface, type, constant, or free function—even when private to that file." (architecture.md:48) |
| A stored `busy` flag | "Derive state. Compute facts from existing fields; never store a second flag or label that can drift." (AGENTS.md) |

## Tensions

These judgment calls are for the other lane or the Orchestrator to rule on:

- **Handshake mechanism.** Holding stdin unread versus the `@orkestrel/mcp` hook. The MCP ping utility asks for a prompt reply, and an unread stdin delays a pong sent during setup. No target client is known to ping before `initialize`. Rule after the missing client readings.
- **What D6 balances.** The work unit is the session lease, and a stdio server has one session, so balancing only differs once a second holder exists.
- **The pool limit.** Enforce three browsers (D6) as validation, or only document it.
- **Idle-death strikes.** A spare that dies idle twice during a long idle session is retired.
- **The loss notice.** Refusing the next call versus running it and appending the notice; `navigate` would have worked.
- **Renderer crashes.** Replacing the whole slot versus rebuilding only the page.
- **Port 9222.** Starting at server start moves the false refusal on 9222 to the start of every session. Fixing it means probing only the port the launch binds (Browser.ts:543-563), which is outside D1 to D8.
- **Default spares.** 0 until the D3 ruling, against the user's expectation of two browsers.
- **`BrowserSlot`.** Exported per precedent, or named in the parity `INTERNAL` list.
- **The sweep.** It removes bare `UUID` profiles that a live older-version server sharing the root may own.

## Risks

- **POSIX orphans.** A server ended by SIGKILL leaves detached Chromium processes running. The sweep removes their profiles, not the processes (M6).
- **Windows job object.** The claim that Chromium ends with a terminated server has not been measured (M6).
- **Slow hosts.** A host slower than Codex's 10 s budget fails at startup until `startup_timeout_sec` is raised (M2).
- **Stdin end during setup.** It is not seen until a browser is warm, so the delay is bounded by the launch deadline.
- **Hidden retirements.** A retired spare is not reported anywhere; no diagnostics surface is in scope.
- **Visible windows.** With `BROWSE_HEADLESS=false`, every spare opens a window.
- **Failed SIGKILL.** A release whose SIGKILL fails (Browser.ts:1139-1141) lets the replacement launch beside a surviving process.
- **Concurrent writers.** `guides/browser.md` might also be edited by the other writer, so units 1 to 4 and 6 write it serially.
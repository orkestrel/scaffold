<!-- Opus 5.5 planner lane, 2026-10-06, blind to the analyst; brief api/design-brief.md -->

# Proposal: `@orkestrel/browser` public API in the ecosystem's shape (subjective lane)

**Lane:** subjective. This proposal covers API shape, naming, ergonomics, and guide voice. Correctness of each change, throw-site census, and migration mechanics belong to the objective lane, and § 10 lists them as points for ruling.

**Readings:** I read the working tree of `C:/Users/mikes/WebstormProjects/browser` and could not confirm it sits at `51cf268`, because this lane runs no git. Its `read`, `notes`, and `redact` toolset members (`src/core/types.ts:2994-3005`) show reading-campaign work already in the tree. Export counts come from the census run (`api/consumers.md:23-32`). Group counts come from guide table rows, cited per group. Missing readings: a per-site census of `BROWSER_ERROR` throws, and a `surface` policy run for fleet name collisions.

**The design in one paragraph.** Today the browser reads as a CDP layer with a toolset added on. Its tagline opens on "A Chrome DevTools Protocol automation layer" (`guides/browser.md:3`), its Surface opens on `createCDPClient` (`:79-90`), and its Helpers table is a single 165-row list (`:370-536`). Under this design a reader meets the entities they hold, in the order they hold them: browser → context → page → elements and readings → toolset → journeys, with the protocol layer last. Every entity comes from a `create{Entity}` factory. Plumbing that owners drive leaves the public contracts, the way `table`'s managers take closures from their owner (`table.md:137-141`). Errors become one coded class, as in database, table, workspace, workflow, form, and tool. Stores keep the family's `get`/`set`/`delete`. The 8-tool vocabulary, its copy, and the reading behaviour stay as ruled.

---

## 1. The API at a glance

The following tables give the before and after per entity. Rows that stay unchanged are omitted unless the omission would mislead.

**Browser (server):**

| Aspect | Before | After |
| --- | --- | --- |
| Factory | `createBrowser(options?)` (`src/server/factories.ts:41`) | unchanged |
| Options | flat, with `engine` duplicated at the top and under `browsers` (`src/server/types.ts:168-173`, `:186-187`) | top-level `engine` removed; `browsers.engine` is the one place |
| Members | `ping`, `discover`, `connect`, `adopt`, `disconnect`, `context`, `contexts`, `isolate`, `create`, `destroy`, `close` (`:237-319`) | unchanged |

**Context:**

| Aspect | Before | After |
| --- | --- | --- |
| Creation | `new BrowserContext(client, id?, viewport?, writer?, emulation?, downloads?, options?)` (`src/core/BrowserContext.ts:77-85`), documented as public (`:48-52`) | `createBrowserContext(client, options?)`; `BrowserContextOptions` gains `id`, `viewport`, and `writer` |
| `emulation` | `apply`, `clear`, `attach(page)` (`src/core/types.ts:1573-1582`) | `apply`, `clear`; the manager subscribes to the context's `page` event |
| `cookies` | `cookies(urls?)`, `set`, `clear(filter?)` (`:1465-1472`) | `cookies(urls?)`, `set`, `remove(filter)`, `clear()` |
| `storage` | `state`, `restore`, `clear` (`:1509-1516`) | `snapshot`, `restore`, `clear` |
| `permissions` | `grant`, `deny`, `clear`, documented as "Resets" (`:1480`) | unchanged; doc reads "Removes" |

**Page:**

| Aspect | Before | After |
| --- | --- | --- |
| Creation | `context.create`, `browser.create`; class constructor is positional CDP ids (`src/core/BrowserPage.ts:290-302`) | unchanged factories; `BrowserPage` class interned |
| Recorder | `codegen(options?)` returns `BrowserCodegenInterface` with `attach(session)` and `script(…)` (`types.ts:3458`, `:2228-2237`) | `recorder: BrowserRecorderInterface` property; `attach` internal; `script` removed in favour of `compileBrowserJourney(recorder.journey(input), options)` |
| Frame members | `assert()`, `update(url)`, `save(path, bytes)` (`:3185-3198`) | removed from `BrowserFrameInterface`; `BrowserFrame` interned |
| `network` | `route`, `unroute`, `headers`, `offline`, `credentials` (`:1404-1413`) | `routes: BrowserRouteManagerInterface` (`add`, `remove`, `clear`); `apply(options: BrowserNetworkOptions)` |
| `network.har` | `recording` (`:1381`) | `active`, matching tracing, coverage, and profiler (`:645`, `:705`, `:767`) |
| `clock` | `installed`, `install`, `uninstall` (`:795-807`) | `active`, `start`, `stop` (`pause`, `resume`, and `advance` stay) |
| Workers | `detach()` beside `close()` (`:1067-1069`) | `destroy()` beside `close()`, the same split browser, context, and page use |
| WebSocket and download | drive methods `receive`, `transmit`, `fail`, `close`, `update` on the public contract (`:1185-1199`, `:1005-1006`, `:1023`) | removed; the owner drives the internal class through its constructor input |

**Elements:**

| Aspect | Before | After |
| --- | --- | --- |
| Outline tallies | `count` and `total` (`types.ts:2462-2463`) | `listed` and `found` |
| Manager | `outline`, `find`, `wait`, `element`, `elements`, `clear` | unchanged |

**Toolset:**

| Aspect | Before | After |
| --- | --- | --- |
| Factory | `createBrowserToolset(page, options?)` copies the page into `options.page` (`src/core/factories.ts:155-160`); `createDocumentToolset(options)` in the in-page face (`src/browser/factories.ts:62-83`) | `createBrowserToolset(view, options?)` in core for any view; `createDocumentToolset` removed |
| Options | `page`, `release` (`types.ts:2944`, `:2949`) | both removed; page features follow when the view is a page; the caller owns the view |
| Methods | `perform`, `notes`, `redact`, `read`, `follow`, `tabs`, `hold`, `start`, `destroy` (`:2994-3073`) | `execute` (was `perform`); `notes` leaves the contract; the rest unchanged |
| Journey tools | `new BrowserJourneyToolset(toolset, options)` (`src/core/BrowserJourneyToolset.ts:109`) or the `journeys` option (`BrowserToolset.ts:311-317`) | the `journeys` option only; class interned; `BrowserJourneyToolsetInterface` removed |

**Recorder, replay, and stores:**

| Aspect | Before | After |
| --- | --- | --- |
| Recorder | `journey(options: { name, description })` inline (`types.ts:1826`) | `journey(input: BrowserJourneyInput)` |
| Replay | `createBrowserReplay(toolset, revision, options?)`, `execute(options?)` | unchanged |
| Journey store | `set(journey, expected?, options?)`, `list(options & { offset, limit })` (`:2093-2110`) | `set(journey, options?: BrowserRevisionOptions)`, `list(options?: BrowserStorePageOptions)` |
| Run store | `snapshot?(bytes)`, `open(name)`, `list(name, options & …)` (`:2135-2137`, `:2172-2175`) | `write?(bytes)`, `create(name)`, `list(name, options?: BrowserStorePageOptions)` |

**Server factories and the browse server:**

| Aspect | Before | After |
| --- | --- | --- |
| Transport factory | `createCDPTransport` returns `WebSocketCDPTransport` (`src/server/factories.ts:51`) | `createWebSocketCDPTransport` |
| Writer factory | `createBrowserWriter` returns `FileBrowserWriter` (`:61`) | `createFileBrowserWriter` |
| Browse server options | flat `headless`, `executable`, `viewport`, `readonly`, `launch` beside `pool` (`src/server/types.ts:427-437`) | `browser: { headless, executable, viewport }`, `pool: { size, contexts, launch }`, `journeys: { readonly }`, plus `root`, `stdio`, `log` |

**Errors:**

| Aspect | Before | After |
| --- | --- | --- |
| Classes | 10 classes, 10 guards, `new BrowserError(message, code?, context?)`, `code: string` (`src/core/errors.ts:13-217`, `src/server/errors.ts:10-48`) | `BrowserError(code, message, context?)` with `code: BrowserErrorCode`, plus `BrowserStepError`; guards `isBrowserError` and `isBrowserStepError` |

**Guide:**

| Aspect | Before | After |
| --- | --- | --- |
| Shape | tagline names CDP first; Surface split by kind, with a 165-row Helpers table | the entity walk-through first; concept tables per face; Methods, Contract, and Patterns kept |

---

## 2. Entities and managers: exact interfaces

The following fences give only the members that change or that carry the design. An unlisted member keeps its current signature.

### Browser (server, unchanged surface)

`BrowserInterface` keeps every member (`src/server/types.ts:237-319`). The lookup pair on the entity (`context`, `contexts`) is the family's own form: workspace's `file`/`files` and database's `table` sit on the entity with no manager (`patterns-1.md:34`, `:63`).

```ts
interface BrowserOptions {
	readonly on?: EmitterHooks<BrowserEventMap>
	readonly error?: EmitterErrorHandler
	readonly headless?: boolean
	readonly executable?: string
	readonly profile?: string
	readonly cdp?: BrowserCDPOptions
	readonly timeout?: number
	readonly viewport?: BrowserViewport
	readonly signal?: AbortSignal
	readonly args?: readonly string[]
	readonly browsers?: SystemBrowserOptions // `engine` lives here only
}
```

### Context (core)

```ts
function createBrowserContext(
	client: CDPClientInterface,
	options?: BrowserContextOptions,
): BrowserContextInterface

interface BrowserContextOptions {
	readonly on?: EmitterHooks<BrowserContextEventMap>
	readonly error?: EmitterErrorHandler
	readonly id?: string // the CDP browser context this wraps; absent for the default context
	readonly reference?: BrowserReferenceFunction
	readonly viewport?: BrowserViewport
	readonly writer?: BrowserWriterInterface
	readonly downloads?: BrowserDownloadOptions
	readonly emulation?: BrowserEmulationOptions
	readonly proxy?: BrowserProxy // read by `browser.isolate` (see § 10, T6)
	readonly origins?: readonly string[] // read by `browser.isolate`
}

interface BrowserCookieManagerInterface {
	cookies(urls?: readonly string[]): Promise<readonly BrowserCookie[]>
	set(cookies: readonly BrowserCookieInput[]): Promise<void>
	remove(filter: BrowserCookieFilter): Promise<void>
	clear(): Promise<void>
}

interface BrowserStorageManagerInterface {
	snapshot(options?: BrowserStorageOptions): Promise<BrowserStorageState>
	restore(state: BrowserStorageState): Promise<void>
	clear(origin?: string): Promise<void>
}

interface BrowserEmulationManagerInterface {
	apply(options: BrowserEmulationOptions): Promise<void>
	clear(): Promise<void>
}
```

Each decision has a reason:
- **`remove`/`clear` split:** `clear` resets without a filter (`names.md:230`), and family managers use `remove` for a subset (`patterns-1.md:97-98`).
- **`snapshot` for `state`:** `snapshot` is the family term for a plain copy of a live entity (`patterns-1.md:104`), and `state` is a noun method.
- **`attach` removed:** `table` already shows the shape, where an owner hands its manager the owner's emitter (`table.md:137-141`).

### Page, frame, and their managers (core)

```ts
interface BrowserFrameInterface {
	readonly id: string
	readonly parent: string | undefined
	readonly name: string | undefined
	readonly url: string
	title(options?: BrowserCallOptions): Promise<string>
	read(options?: BrowserCallOptions): Promise<BrowserReadingInterface>
	evaluate(expression: string, options?: BrowserCallOptions): Promise<unknown>
	handle(expression: string, options?: BrowserCallOptions): Promise<BrowserHandleInterface>
	send(method: string, params?: Readonly<Record<string, unknown>>, options?: BrowserCallOptions): Promise<unknown>
	subscribe(method: string, handler: CDPHandler): Promise<void>
	unsubscribe(method: string, handler: CDPHandler): Promise<void>
}

interface BrowserPageInterface
	extends BrowserFrameInterface, BrowserViewInterface<BrowserPageElementInterface> {
	readonly recorder: BrowserRecorderInterface // was codegen()
	// emitter, elements, trusted, keyboard, mouse, touch, registry, network, navigation,
	// popups, scripts, accessibility, diagnostics, clock, opener, target, closed: unchanged
	// navigate, reload, back, forward, screenshot, pdf, frame, frames, snapshot, wait,
	// destroy, close: unchanged
}

interface BrowserNetworkManagerInterface {
	readonly emitter: EmitterInterface<BrowserNetworkEventMap>
	readonly har: BrowserHARManagerInterface
	readonly routes: BrowserRouteManagerInterface
	start(): Promise<void>
	body(id: string): Promise<Uint8Array>
	text(id: string): Promise<string>
	json(id: string): Promise<unknown>
	apply(options: BrowserNetworkOptions): Promise<void> // replaces headers, offline, credentials
	destroy(): Promise<void>
}

interface BrowserRouteManagerInterface {
	add(query: BrowserRouteQuery, handler: BrowserRouteHandler): Promise<void>
	remove(handler: BrowserRouteHandler): Promise<void>
	clear(): Promise<void>
}

interface BrowserNetworkOptions {
	readonly headers?: Readonly<Record<string, string>>
	readonly offline?: boolean
	readonly credentials?: BrowserCredentials
}

interface BrowserClockInterface {
	readonly active: boolean
	start(time?: number): Promise<void>
	pause(): Promise<void>
	resume(): Promise<void>
	advance(ms: number): Promise<void>
	stop(): Promise<void>
}

interface BrowserWebSocketInterface {
	readonly emitter: EmitterInterface<BrowserWebSocketEventMap>
	readonly id: string
	readonly url: string
}

interface BrowserDownloadInterface {
	readonly emitter: EmitterInterface<BrowserDownloadEventMap>
	// id, url, name, status, received, total, path
	abort(): Promise<void>
}

interface BrowserWorkerInterface {
	// id, url, category, evaluate, send
	destroy(): void // was detach
	close(): Promise<void>
}
```

The reasons follow:
- **Plumbing on public contracts:** the source says outright that `update` on a download and the drive methods on a WebSocket exist only "because the class exposes exactly its interface methods" (`types.ts:1005-1006`, `:1185-1186`). The same holds for frame `update` (`:3195-3198`), which a page calls from its own handler. A consumer can call `socket.receive(frame)` today and fake an observation. `table` closes this by interning the class and driving it through closures (`table.md:24-29`, `:137-141`).
- **`assert()` removed:** it throws when the frame is gone, and every other member calls it first (`:3188-3193`). For a consumer, `page.closed` is the readable fact.
- **`save` removed:** it forwards to the writer, and a child frame always rejects it (`:3184-3187`). A forward with no added behaviour fails the wrapper test (`architecture.md:163-168`).
- **`network.apply`:** `headers(…)`, `offline(…)`, and `credentials(…)` are noun-named writers (`names.md:114`, `:116`). The context's emulation already sets those same three facts through one `apply` (`types.ts:1557-1577`).
- **`routes` manager:** `route`/`unroute` is a compound verb pair. The law moves such a pair to a manager whose verbs are `add`, `remove`, and `clear` (`names.md:51-63`).
- **Clock renames:** tracing, coverage, and profiler share `active; start, stop` under one parent (`types.ts:644-779`). The clock's `installed; install, uninstall` is a second term for the same concept (`AGENTS.md` § Design laws, one concept, one term).
- **`page.recorder`:** the family exposes a sub-entity as a property, as `table.selection` and `context.instructions` are (`patterns-1.md:15-22`, `:50-57`). The page recorder and the toolset recorder then share one interface, `BrowserRecorderInterface` (`types.ts:1807-1831`). `script` is a two-call composition of public pieces (`:2232-2236`).

### Elements

```ts
interface BrowserOutline {
	readonly url: string
	readonly title: string
	readonly lines: readonly BrowserLine[]
	readonly listed: number // referenced rows the outline carries, at most `limit`
	readonly found: number // referenced nodes the tree holds
	readonly focus: string | undefined
}
```

Two tallies called `count` and `total` (`types.ts:2462-2463`, computed at `src/core/helpers.ts:403-409`, `:430-433`) break `names.md:117` and `:206-208`, which say to name each fact. The pool precedent names its tallies `size`, `idle`, and `active` (`names.md:207`).

### Toolset (core)

```ts
function createBrowserToolset(
	view: BrowserViewInterface,
	options?: BrowserToolsetOptions,
): BrowserToolsetInterface

interface BrowserToolsetOptions {
	readonly on?: EmitterHooks<BrowserToolsetEventMap>
	readonly error?: EmitterErrorHandler
	readonly notes?: () => string
	readonly tools?: ToolManagerInterface
	readonly source?: BrowserToolSourceInterface
	readonly context?: BrowserContextInterface // requires a page view
	readonly limit?: number
	readonly schemes?: readonly string[]
	readonly journeys?: BrowserJourneyOptions
}

interface BrowserToolsetInterface {
	readonly emitter: EmitterInterface<BrowserToolsetEventMap>
	readonly tools: ToolManagerInterface
	readonly native: readonly ToolInterface[]
	readonly view: BrowserViewInterface
	readonly limit: number
	readonly held: string | undefined
	execute(call: ToolCall, context?: ToolContext): Promise<BrowserToolsetResult> // was perform
	follow(id: string, step: BrowserJourneyStepInput, options?: BrowserFollowOptions): Promise<BrowserAction>
	read(options?: BrowserToolsetReadOptions): Promise<string>
	redact(text: string): string
	tabs(options?: BrowserCallOptions): Promise<readonly BrowserTab[]>
	hold(name: string, options?: BrowserCallOptions): Promise<BrowserHoldInterface>
	start(options?: BrowserCallOptions): Promise<void>
	destroy(): Promise<void>
}
```

The in-page placement then reads as two composable calls, which is the family's "kit of primitives" voice (`agent.md:11`):

```ts
import { createBrowserToolset } from '@orkestrel/browser'
import { createBrowserDOMView } from '@orkestrel/browser/browser'

const view = createBrowserDOMView({ document: frame.contentDocument })
const toolset = createBrowserToolset(view, { source: bridge })
await toolset.start()
// …
await toolset.destroy()
view.destroy()
```

The reasons follow:
- **`perform` is `execute`:** `perform` is a synonym of the fixed verb `execute` (`names.md:232-234`). `tool` already layers two `execute` methods with different returns, on the tool and on the manager (`tool.md:150-165`, via `patterns-1.md:87`).
- **`follow` stays:** it resolves a recorded target against the current view first, which a raw call does not do (split behavioural variants, `names.md:65-81`).
- **`notes()` leaves the contract:** it is a noun method that drains state (`types.ts:2999-3000`). Its only caller is the journey toolset (`BrowserJourneyToolset.ts:186`). The journey toolset gets it through its internal input.
- **`redact` stays:** the browse server needs it as a capability (`BrowserMCPServer.ts:799`).
- **No `createDocumentToolset`:** it returns a `BrowserToolsetInterface`, not a document-toolset entity (`names.md:176`). It also exists only to wire the `release` option (`src/browser/factories.ts:65-78`).
- **`page` option removed:** `createBrowserToolset` always sets `page` equal to the view (`src/core/factories.ts:159`). Two inputs that must agree are a second copy of one fact (`AGENTS.md` § Derive state).

### Journeys

```ts
interface BrowserJourneyInput {
	readonly name: string
	readonly description: string
}

interface BrowserRecorderInterface {
	readonly emitter: EmitterInterface<BrowserRecorderEventMap>
	readonly started: boolean
	start(): Promise<void>
	stop(): Promise<readonly BrowserJourneyStep[]>
	steps(): readonly BrowserJourneyStep[]
	journey(input: BrowserJourneyInput): BrowserJourney
	clear(): void
	destroy(): Promise<void>
}
// createBrowserRecorder(toolset, options?) and createBrowserReplay(toolset, revision, options?): unchanged
```

`buildBrowserJourney(steps, input: BrowserJourneyInput)` takes the same named input. The type replaces the two inline shapes (`types.ts:1826`, `:2232`) with the `{Entity}Input` form (`names.md:157`).

### Browse server

```ts
interface BrowserMCPServerOptions {
	readonly root?: string
	readonly browser?: { readonly headless?: boolean; readonly executable?: string; readonly viewport?: BrowserViewport }
	readonly pool?: { readonly size?: number; readonly contexts?: number; readonly launch?: BrowserLaunchFunction }
	readonly journeys?: { readonly readonly?: boolean }
	readonly stdio?: StdioServerOptions
	readonly log?: NodeJS.WritableStream
}
```

Several keys configure one sub-entity, the pooled browser, so they group under its noun (`names.md:30`, `:40-49`). `journeys.readonly` then mirrors the toolset's own `journeys.readonly` (`types.ts:2188-2192`). The holder tool names `acquire`, `execute`, `tools`, and `destroy` stay, because they are model-facing copy.

---

## 3. Options, events, and errors

### Options

Every key stays one word. Grouped keys follow the entity noun: `cdp`, `browsers`, `pool`, `journeys`, and the added `browser`. Rejected alternatives and their costs:
- **Group `BrowserOptions`' launch keys under `launch`:** no `launch` entity exists in the API, so no law asks for it. It would break ollama's `createBrowser({ executable, headless, args, cdp, timeout, signal })` call (`ollama/tests/setupServer.ts:1113-1120`).
- **Split `BrowserNavigationOptions.condition` into per-stage methods:** each value picks which lifecycle event the one wait observes. That is a datum, not a different algorithm (`names.md:79-80`). Splitting would turn one `navigate` into four.

Rename the type `BrowserWaitUntil` (`types.ts:214`) to `BrowserNavigationCondition`. The current name is a phrase, not the `{Entity}{Noun}` form (`names.md:161`).

### Events

Every emitter keeps the `on` option, `emitter.on`, and `error` isolation through `@orkestrel/emitter`. Its `EmitterErrorHandler` is `(error, event)`, the same handler every family package uses (`scaffold/guides/emitter.md:73`). No event map changes. The toolset's `skip` event (`types.ts:2909`) stays: declining a page tool is an intentional non-adoption, which is the fixed meaning of `skip` (`names.md:228`).

### Errors

The following fence gives the error contract.

```ts
class BrowserError extends Error {
	readonly code: BrowserErrorCode
	readonly context: JSONRecord | undefined
	constructor(code: BrowserErrorCode, message: string, context?: JSONRecord)
}
class BrowserStepError extends BrowserError {
	readonly action: BrowserAction
	constructor(id: string, action: BrowserAction)
}
function isBrowserError(value: unknown): value is BrowserError
function isBrowserStepError(value: unknown): value is BrowserStepError
```

These are the reasons:
- **Argument order and typed codes:** every family package with one error class constructs it as `(code, message, context?)` and types `code` as a union. This holds for table (`table.md:125-126`), workspace (`patterns-2.md:61`), tool (`:97`), form (`:85`), and workflow (`:73`). Browser has `(message, code = 'BROWSER_ERROR', context?)` with `code: string` (`src/core/errors.ts:13-26`).
- **Subclasses folded:** a family package keeps a subclass only where it carries typed data, as `AgentJobError` carries its result (`patterns-2.md:13`). `BrowserStepError` carries `action` (`errors.ts:79-87`), so it stays. `BrowserElementError` carries only `context.reason` (`:38-58`), so it folds into code `ELEMENT`. Its message moves to a `describeBrowserRefusal(subject, reason, detail?)` helper, using the `describe*` form (`names.md:100`). The CDP, connection, limit, and server classes carry nothing typed (`errors.ts:106-207`, `src/server/errors.ts:10-26`).
- **One class instead of a CDP hierarchy:** the alternative is a separate `CDPError` hierarchy like agent's `ProviderError`. Its cost is a second guard set and a second `catch` branch for every page call, with no typed payload to justify it.

`BrowserErrorCode` drops the `BROWSER_` prefix and the `_ERROR` suffix, which repeat the class name. Every family code union is bare (`database.md:270`, `table.md:126`). A sub-entity qualifier stays where the union needs it to read. The mapping is mechanical except for the catch-all:

| Before (`guides/browser.md:282-338`) | After |
| --- | --- |
| `BROWSER_ERROR`, the catch-all (`:282`) | split into `ARGUMENT`, `CLOSED`, `PROTOCOL` (off-shape payload), and `NAVIGATION`, by throw site |
| `BROWSER_CDP_ERROR` | `REMOTE` (the endpoint answered with an error, matching agent's `PROVIDER` against `PROTOCOL`, `patterns-2.md:13`) |
| `BROWSER_CDP_CONNECTION_ERROR`, `BROWSER_NOT_CONNECTED_ERROR` | `DISCONNECTED` |
| `BROWSER_CDP_TIMEOUT_ERROR` | `TIMEOUT` |
| `BROWSER_RESULT_LIMIT_ERROR`, `BROWSER_CONNECTION_ERROR`, `BROWSER_DESTROYED_ERROR`, `BROWSER_ELEMENT_ERROR`, `BROWSER_STEP_ERROR`, `BROWSER_JSON_ERROR`, `BROWSER_HAR_ERROR` | `LIMIT`, `CONNECTION`, `DESTROYED`, `ELEMENT`, `STEP`, `JSON`, `HAR` |
| `BROWSER_CONTEXT_CLOSED`, `BROWSER_PAGE_CLOSED`, `BROWSER_TARGET_HELD`, `BROWSER_WAIT_TIMEOUT`, `BROWSER_NAVIGATION_TIMEOUT`, `BROWSER_ELEMENT_QUERY`, `BROWSER_DOCUMENT*`, `BROWSER_TOOLSET_*`, `BROWSER_JOURNEY_*`, `BROWSER_CAPTURE_*`, `BROWSER_SERVER_*` | the same name without `BROWSER_` |

Abort and timeout stay as they are and match the family:
- `BrowserCallOptions { timeout, signal }` sits on every async call (`types.ts:2744-2747`). It plays the role of database's `OperationOptions` (`patterns-2.md:25`).
- An abort rejects with `signal.reason` unwrapped, as workflow does (`patterns-2.md:73`).
- A store call takes `BrowserStoreOptions { signal }` (`types.ts:2039-2041`).
- No entity gains an `abort()` method. Replay already ends with outcome `aborted` through its signal (`:1900`), and the family adds `abort()` only to an entity that owns a running turn (`agent.md:854`).

---

## 4. Free functions, constants, and types

The census reads 236 functions, 125 constants, 66 classes, 233 interfaces, and 61 types (`api/consumers.md:25-32`). The law constrains this section. A pure leaf is an exported helper (`architecture.md:184-189`), and every declaration in a kind file is exported and barrelled (`:51`, `:278-283`). So "leaves the barrel" happens only in three ways: the capability goes, the declaration becomes a true local, or a class is interned.

### Functions (from guide rows `browser.md:370-536`, `:1437-1462`, `:1622-1643`)

| Group | Rows | Ruling | Reason |
| --- | --- | --- | --- |
| In-page compilers (`compile*`) | 21 | stay | Pure leaves of `compilers.ts`; the guide groups them under the protocol layer |
| Outline, line projection, and search | 23 | 20 stay; `scanBrowserOutline`, `scanBrowserText`, and `renderBrowserMatches` leave | The three have no caller left in `src` (`helpers.ts:251`, `:310`, `:346`, each read with Grep over `src`). They are a second search semantics beside the ruled `scanBrowserLines`, so the capability itself goes |
| Tool boundary | 9 | stay | ollama imports `validateBrowserToolArguments` and `parseBrowserReference` (`ollama/tests/setupStore.ts:32-35`) |
| Input and geometry, option validators | 16 | stay | Pure leaves the page managers compose |
| Network, HAR, cookies, storage, and media | 15 | stay | Pure leaves |
| Protocol decoders (`read*`, `parse*`, and the snapshot predicates) | 47 | stay | Parsers and guards stay (brief § 6); the guide moves them to the protocol layer |
| Teardown (`settleBrowserTeardown`) | 1 | stays | A reusable leaf |
| Journeys | 28 | stay | The journey value's operations, as `table`'s helpers are "the pure leaves the table composes" (`table.md:200`, via `patterns-2.md:47`) |
| Bytes | 5 | `textToBytes` and `bytesToText` leave; `encodeBase64` and `decodeBase64` per ruling T1; `concatBytes` stays | The first two are one-line `TextEncoder`/`TextDecoder` wrappers (`helpers.ts:1316-1323`), which the wrapper test deletes (`architecture.md:165`). The base64 pair collides with `@orkestrel/codec` (`scaffold/guides/codec.md:68-69`) |
| Server discovery, launch, and browse-server parsers | 24 | stay | Rename only the names the `surface` policy rule reports (`names.md:124-137`) |
| In-page accessible-name and visibility helpers | 20 | stay | Pure leaves |
| Factories | 17 | 2 renamed, 1 removed, 1 to 3 added | § 2 |
| Error guards | 10 | 2 remain | § 3 |

### Constants (`browser.md:187-253`, `:1356-1405`, `:1605-1612`)

Constants stay public by the same law. The exceptions are these:
- `BASE64_CHARS` and `BASE64_LOOKUP` leave with the base64 ruling.
- The `BROWSER_SERVER_*` constants that name a refusal code (`:1394-1403`) become `BrowserErrorCode` members and stop being constants. The objective lane separates codes from diagnostic strings.

### Types

Public contracts, options, event maps, and data stay. Removals and renames:
- **Removed with their capability:** `BrowserCodegenInterface`, `BrowserJourneyToolsetInterface`, and `BrowserReadMatch`, the dead search's result.
- **Renamed:** `BrowserWaitUntil` → `BrowserNavigationCondition`.
- **Added:** `BrowserErrorCode`, `BrowserJourneyInput`, `BrowserRevisionOptions`, `BrowserStorePageOptions`, `BrowserNetworkOptions`, and `BrowserRouteManagerInterface`.
- **Private-state shapes that each serve one class:** for example `BrowserNavigationWait` (`types.ts:266`), `BrowserRegistryPending` (`:2825`), `BrowserReadinessWait` (`:2602`), `BrowserToolsetWatch` (`:3089`), and the `BrowserServer*`/`BrowserSlot*` holders (`src/server/types.ts:366-401`, `:443-461`). These become inline types on the owning class's `#` fields, which makes them true locals. `AGENTS.md` asks only that reusable and public types live in `types.ts`. See T3.

---

## 5. Stores and extension points

**Stores keep the family trio.** The journey and run stores already answer async `get`/`set`/`delete`, with an absent `get` as `undefined` and a missing `delete` as a no-op (`types.ts:2077-2176`). They need no `open`/`save` registry. A browser holds no live journeys in memory: a journey is data that `editBrowserJourney` edits and the store revisions. The registry shape exists for managers that hold live entities (`workspace.md:215-216`, via `patterns-1.md:65`).

Shape changes:
- **Journey store `set(journey, options?: BrowserRevisionOptions)`,** where `BrowserRevisionOptions extends BrowserStoreOptions { expected?: number }`. The positional `expected` today forces `set(journey, undefined, { signal })`.
- **Run store `open` → `create`:** the family uses `open` to hydrate a registry from its store (`patterns-1.md:106`), and this method mints a slot instead. `create` is the family verb for a registry that always mints (`patterns-1.md:24`).
- **Run store `snapshot?` → `write?`:** this method saves a PNG (`types.ts:2129-2135`), and `snapshot` is the family term for a plain copy of a live entity (`patterns-1.md:104`).
- **`list` keeps its name and takes `BrowserStorePageOptions`.** Paging is real here, because nothing holds the whole set in memory.

**Extension points stay as they are, because they already follow the provider and driver pattern:**
- `CDPTransportInterface` through `createCDPClient({ transport })`, as database takes `{ driver }` (`patterns-2.md:27`);
- `BrowserWriterInterface` through the context's `writer` option;
- `BrowserToolSourceInterface` through `source`;
- `BrowserLaunchFunction`, now under `pool.launch`;
- `BrowserReferenceFunction` through `reference`.

The category folders `transports/`, `stores/`, and `writers/` already match `architecture.md:245-251`. Do not add a `writer` key to `BrowserOptions` while no consumer needs it (`AGENTS.md` § Minimal public API).

---

## 6. Consumers and their migration

Ollama's tests are the only code consumer (`api/consumers.md:5-14`). The following table lists what each file imports and what changes.

| File | Imports | Change |
| --- | --- | --- |
| `tests/setupServer.ts:13-20` | `BrowserCallOptions`, `BrowserConsoleMessage`, `BrowserPageError`, `BrowserPageInterface`, `BrowserRequest`, `createBrowser` | none (`browser.create({ on })`, `page.network.start`, `navigate`, and `evaluate` keep their shape, `:1113-1136`) |
| `tests/setupServer.test.ts:15` | `BrowserCallOptions` | none |
| `tests/setupService.ts:2-3` | `SystemBrowser`, `SystemBrowserOptions`, `findSystemBrowser` | none |
| `tests/setupStore.ts:16-37` | `BrowserJourney`, `BrowserJourneyStep`, `BrowserInterface`, `BROWSER_JOURNEY_TOOL_NAMES`, `BROWSER_TOOL_LIMIT`, `createBrowserToolset`, `parseBrowserJourney`, `parseBrowserReference`, `parseBrowserRun`, `renderBrowserJourney`, `validateBrowserToolArguments`, the file store factories | none: `createBrowserToolset(page, { tools, journeys })` keeps its call shape |
| `tests/setupStore.test.ts:12-33` | the preceding plus `BROWSER_TOOL_COPY`, `createBrowserReading`, `scanBrowserLines`, `createBrowser` | `runs.open(…)` → `runs.create(…)` at `:1217` |
| `tests/setupStore/types.ts:2` | `BrowserJourney`, `BrowserPageInterface`, `BrowserRun` | none |
| `tests/service/browser.test.ts:1-2` | `BrowserInterface`, `createBrowser` | none |

Ollama does not branch on any browser error code (Grep for `'BROWSER_` literals and `isBrowser*Error` over `ollama/tests` matched nothing), so the error reshape costs it nothing. The guide mirrors in database, workflow, indexeddb, veneer, ollama, and scaffold refresh at each one's visit (`api/consumers.md:18`).

---

## 7. Scope: must, coherence, and stays

### Must (a shared pattern or the naming law breaks today)

| Change | Law | Size |
| --- | --- | --- |
| `BrowserError(code, message, context?)`, `BrowserErrorCode` union, catch-all split | family error shape (§ 3) | large: 485 construction sites across 46 files (Grep `new (BrowserError\|…)\(` over `src`), mechanical apart from the catch-all split |
| Factories named for their entity: `createWebSocketCDPTransport`, `createFileBrowserWriter`; `createDocumentToolset` removed | `names.md:176` | small |
| `createBrowserContext(client, options?)` replaces the documented positional constructor; owner-built classes interned: `BrowserPage`, `BrowserFrame`, `BrowserJourneyToolset`, the element classes | family factory form; `architecture.md:284-292` | medium |
| `perform` → `execute`; clock `install`/`uninstall` → `start`/`stop`; worker `detach` → `destroy` | fixed vocabulary, one concept one term (`names.md:222-234`) | small |
| Outline `count`/`total` → `listed`/`found` | `names.md:117`, `:206-208` | small |
| `textToBytes` and `bytesToText` removed; base64 per T1 | wrapper test (`architecture.md:165`); fleet ownership (`names.md:124-137`) | small |
| `BrowserWaitUntil` → `BrowserNavigationCondition`; `BrowserJourneyInput` replaces two inline shapes | `names.md:156-161` | small |

### Coherence

| Change | Size |
| --- | --- |
| Plumbing leaves public contracts: download `update`, WebSocket drive methods, frame `assert`/`update`/`save`, emulation `attach`, recorder `attach`, toolset `notes`; owners drive interned classes through constructor inputs | medium |
| `page.recorder` property; `script` removed | small |
| Network `routes` manager and `apply`; cookies `remove`/`clear`; storage `snapshot`; HAR `active` | small |
| Toolset `page` and `release` options removed | small |
| Store reshapes (§ 5) | small, plus one ollama line |
| Browse server option groups | small (the `browse` binary's env mapping changes) |
| Dead search helpers and their result type removed; private-state types inlined (T3) | small |
| Guide restructure (§ 8, unit U7) | medium |

### Stays, and why

Each of the following keeps its current shape:
- **`connect`, `disconnect`, `discover`, `adopt`, `ping`:** domain verbs with no synonym among the fixed verbs.
- **`destroy` beside `close` on browser, context, and page:** a real split between a local release and a remote shutdown (`src/server/types.ts:299-318`). The family's database already pairs `open` with `close` for its external resource (`patterns-1.md:117`).
  - Rejected alternative, `stop` for `close`: `page.stop()` reads as "stop loading".
- **`isolate`:** it names the operation exactly, and `create` is taken by the page shortcut (`src/server/types.ts:296-298`).
  - Rejected alternative, a `contexts` manager with `create`: every caller gets longer, ollama's three call sites included (`ollama/tests/setupStore.test.ts:133-134`, `:1888`). No prefixed method family asks for it.
- **The lookup pairs on the entity (`context`/`contexts`, `page`/`pages`):** the family's own form (`patterns-1.md:34`, `:63`).
- **`page.registry`:**
  - Rejected alternative, `page.tools`: it would sit beside `toolset.tools`, a different type under the same name.
- **`native`:** replay derives the placement from it (`BrowserReplay.ts:167`).
- **`follow`, `hold`, `tabs`, `read`, `redact`:** each names distinct behaviour.
- **The `language` union:** its values are external language names (`names.md:119`).
- **HAR and WebMCP field names:** the wire-body exemption covers them (`names.md:120-123`).
- **Decoders, compilers, journey helpers, and constants:** the barrel law keeps reusable leaves public (`architecture.md:278-283`).
- **The 8 page tools, their copy, and the 7 journey tools:** ruled (`plan.md:5-36`, `:139`).

---

## 8. Units

The browser units run in series in one checkout, after the reading campaign's R5 lands (`plan.md:226`), because they own the same files. Astra units run their own commands. The Orchestrator runs commands for Opus units. No unit commits.

| Unit | Role, engine | Owns | After | Acceptance |
| --- | --- | --- | --- | --- |
| U1 contract | writer, Opus (Orchestrator runs `npm run check`) | browser `src/core/types.ts`, `src/server/types.ts`, `src/browser/types.ts`, the `BrowserErrorCode` union | R5 | Every § 2 and § 3 signature is declared; `check` shows diagnostics only in files later units own |
| U2 errors | writer, Astra | `src/*/errors.ts`, every throw site, `helpers.ts` (`describeBrowserRefusal`), `tests/src/*/errors.test.ts`, every test asserting a code | U1 | Two classes and two guards remain; no `BROWSER_` code literal remains in `src`; each catch-all site maps to one split code, and the report lists every mapping; `test:src`, `check` |
| U3 factories and toolset | writer, Astra | `src/*/factories.ts`, `BrowserToolset.ts`, `BrowserContext.ts`, `src/browser/factories.ts`, `BrowserMCPServer.ts` options, `src/bin/main.ts`, their tests | U2 | `createBrowserContext`, `createBrowserToolset(view)` in both placements, the renamed factories, `execute`, no `page` or `release` option; the in-page fence in § 2 runs in `test:src:browser`; `test:src`, `test:src:bin`, `check` |
| U4 plumbing out of contracts | writer, Astra | `BrowserPage.ts`, `BrowserFrame.ts`, `BrowserDownload.ts`, `BrowserWebSocket.ts`, `BrowserEmulationManager.ts`, `recorders/BrowserCodegen.ts`, `BrowserJourneyToolset.ts`, `tests/guides.test.ts` `INTERNAL`, their tests | U3 | No interface carries a member only its owner calls; emulation reaches a created page before `create` resolves (pinned); `page.recorder` records as `codegen()` did (codegen service test green); `test:src`, `test:service` codegen and journey files, `check` |
| U5 managers and stores | writer, Astra | network, cookie, storage, clock, HAR, worker, outline, recorder, and the 4 store implementations, with their tests; ollama `tests/setupStore.test.ts:1217` | U4 | § 2 and § 5 shapes; one test per renamed member; `test:src`, ollama `test:setup` |
| U6 surface hygiene | writer, Astra | `helpers.ts` (dead search, bytes), `constants.ts`, inlined private-state types, names the `surface` rule reports | U5, T1, T3 | `surface` policy clean; no dead export; `test:policy`, `check` |
| U7 guide | writer, Opus (Orchestrator runs `npm run test:guides`) | `guides/browser.md`, `README.md` pitch, the doc blocks of changed exports | U6 | Restructure as specified after this table; every Summary cell equals its doc block; prose re-read against what shipped |
| F audit | reviewer, Opus on Astra code and Astra on Opus contracts | read-only | U7 | One `orkestrel-falsify` round |
| V gates | `verifier`, Astra | read-only | F | `format:check`, `lint:check`, `check`, `build`, `npm test` once |

**The guide restructure for U7** has five parts:
1. **Tagline (README pitch equal):** "The browser runtime for the `@orkestrel` line: a `Browser` that finds, launches, or attaches to Chromium, the contexts and pages it opens, the elements and readings a page yields, and the toolset and journeys that hand a page to an agent." This is a noun phrase that names the nouns, as agent's tagline does (`agent.md:3-7`).
2. **Opening paragraphs:** one sentence per noun, as `agent.md:9-15` does ("A browser is… A context isolates… A page… A view… A toolset…"), then the faces list.
3. **Surface:** the entity walk-through fences come first, connect and drive, then hand a page to an agent. Each face section (`### Core`, `### Server`, `### Browser`; the parity scoping reads these headings, `browser.md:3376`) replaces its kind tables with concept tables. For core: the context and page; elements and readings; the toolset; journeys and stores; the protocol layer (client, transports, decoders, compilers); constants by concern. This follows database's split of its functions into concept tables (`patterns-2.md:21`). Open the Surface with a sentence stating which classes are internal and why, as `table.md:24-29` does.
4. **Errors:** one table of the two classes, the code union, and the guards, followed by the code table.
5. **Methods, Contract, Patterns, Tests:** these stay. Contract invariant 7 is rewritten for the two-class error shape, and invariant 22 for the removed `createDocumentToolset`.

---

## 9. Risks

- **Reading campaign collision.** U1–U7 own the files R1–R5 own (`plan.md:222-226`). Starting before R5 lands invites merge loss. Landing after R5 and before release P puts the API change into 0.0.27 and raises that release's risk; see T7.
- **Error codes reach a client.** The browse server writes `CODE: message` to MCP clients (`BrowserMCPServer.ts:439`, `:540`, `:627`), and the binary does the same on stderr (`src/bin/main.ts:71`). Bare codes change that text. Page-tool results carry the message only (`BrowserToolset.ts:686-700`), so the ruled copy holds.
- **Internal control-flow codes.** `TOOLSET_RECEIPT` and `TOOLSET_SETTLED` never reach a caller (`browser.md:338`), yet they would sit in the public union.
- **Emulation ordering.** With `attach` gone, emulation must reach a page before `create` resolves. A subscription to the `page` event might fire too late; U4 pins it.
- **Page detection in `createBrowserToolset(view)`.** Detection needs a total guard. `trusted: true` (`types.ts:3408`) does not prove a view is a page.
- **Guide parity scoping.** Concept H4s inside the face H3s depend on how `tests/guides.test.ts` scopes a face. U7 reads it before restructuring.
- **Size of U2.** It touches 485 sites. A mechanical swap can mis-map the catch-all split, so the unit must report each catch-all mapping.

---

## 10. Points for the user's ruling

- **T1 Base64.** `encodeBase64`/`decodeBase64` collide with `@orkestrel/codec` (`codec.md:68-69`). Codec's decoder is strict and returns `undefined` on refusal; browser's is tolerant (`helpers.ts:1270-1271`).
  - Recommended: declare `@orkestrel/codec` and reuse it, the rule's first remedy (`names.md:134`). This adds a dependency, which needs your explicit approval (`AGENTS.md` § Non-negotiable rules).
  - Alternative: qualify the names as `encodeBrowserBase64` and `decodeBrowserBase64`.
- **T2 Bare codes.** Recommended: drop `BROWSER_`, for parity with every family union. The cost is that MCP and binary error text changes from `BROWSER_TOOLSET_ARGUMENT: …` to `TOOLSET_ARGUMENT: …`. Alternative: keep the prefixed strings and type them as a union.
- **T3 Private-state types.** Recommended: inline them on `#` fields so they leave the barrel. Alternative: keep them in `types.ts` as public, documented shapes. That costs about 15 Surface rows that describe nothing a consumer holds.
- **T4 Toolset page detection.** Recommended: a structural `isBrowserPage` guard. Alternative: keep an explicit `page` option and refuse it when it differs from the view.
- **T5 Outline tallies.** Recommended: `listed` and `found`. Any pair that names each fact meets `names.md:207`.
- **T6 Context options.** Recommended: one `BrowserContextOptions`, in which `createBrowserContext` refuses `proxy` and `origins` with `ARGUMENT`. Alternative: `isolate` takes its own options type that extends `BrowserContextOptions`.
- **T7 Release placement.** Recommended: ship this as browser 0.0.28 after the campaign's 0.0.27 release, so the measured campaign build stays the one you accepted. Alternative: fold it into 0.0.27.
- **T8 Page recorder.** Recommended: the `page.recorder` property. Alternative: keep the `codegen()` method and drop only `attach` and `script` from its contract.

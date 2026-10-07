<!-- GPT-6 Astra analyst lane, 2026-10-06, blind to the planner; brief api/design-brief.md; journal scaffold tmp/codex/api-analyst.jsonl -->

# Proposal: align the browser API without changing its tool vocabulary

Adopt typed construction, consistent execution and snapshot names, explicit journey-write conditions, and a finite error-code contract. Preserve the browser’s ownership rules, protocol access, public composition helpers, and model-facing behavior.

This proposal targets browser commit `51cf268acac9d9f9c901f0da00cc73a673fd5d98`. Citations use `browser/`, `ollama/`, and `scaffold/` relative to `C:/Users/mikes/WebstormProjects/`. Proposed contracts are distinguished from retained declarations.

## The API at a glance

The recommended changes are bounded by entity, rather than by an export-reduction target.

| Entity | Before | Proposed API | Reason |
|---|---|---|---|
| Browser | `createBrowser(options)`; discovery, connection, context lookup, isolation, page creation, and teardown on the entity. `browser/src/server/types.ts:237` | Retain the interface and factory. | These operations compose connection and ownership work. Splitting them into forwarding managers would add indirection. |
| Context | Positional constructor; `page`, `pages`, `create`, `sync`, `destroy`, and `close`. `browser/src/core/BrowserContext.ts:77`; `browser/src/core/types.ts:3481` | Add `createBrowserContext(input, options?)` for an existing CDP context. Retain the interface. | Give low-level consumers a typed construction boundary without changing remote-context creation. |
| Page | Positional constructor carrying protocol identity and ownership hooks. `browser/src/core/BrowserPage.ts:290` | Add `createBrowserPage(input, options?)`. Retain navigation, input, capture, and child-manager APIs. | Name the construction inputs and return the interface. |
| Toolset | `perform(call, context)`; page factory and differently named document factory. `browser/src/core/types.ts:3015`; `browser/src/browser/factories.ts:62` | Rename `perform` to `execute`; rename `createDocumentToolset` to `createBrowserDocumentToolset`. | Match the ecosystem’s primary execution verb and the existing `BrowserDocumentToolsetOptions` name. |
| Journey toolset | Direct constructor, `recording`, `replaying`, and `destroy`; no emitter. `browser/src/core/types.ts:2202`; `browser/src/core/BrowserJourneyToolset.ts:109` | Add its factory and lifecycle observation. Preserve registration and tool behavior. | Make construction and observation consistent without creating another journey execution engine. |
| Element managers | `outline`, `find`, `wait`, `element`, `elements`, and `clear`. `browser/src/core/types.ts:2672` | Retain the contract; add interface-returning factories for both placements. | References are discovered from documents. Generic insertion and deletion would misrepresent that ownership. |
| Recorder | `started`, inline options to `journey`, and existing lifecycle methods. `browser/src/core/types.ts:1807` | Rename `started` to `recording`, `journey` to `snapshot`, and name its options type. | Describe the present state and the immutable journey projection. |
| Codegen recorder | Recorder plus `attach` and inline options to `script`. `browser/src/core/types.ts:2228` | Follow the recorder changes; add named construction and script options. Retain `script` and `attach`. | Script generation composes a recorded snapshot with compilation. `browser/src/core/recorders/BrowserCodegen.ts:142` |
| Replay | Factory, `emitter`, and `execute(options)`. `browser/src/core/factories.ts:187`; `browser/src/core/types.ts:2023` | Retain. | It already follows the execution contract and releases its per-execution hold and subscriptions. `browser/src/core/BrowserReplay.ts:141` |
| Journey store | Async point access; positional `expected`, including `0` to require absence. `browser/src/core/types.ts:2093` | Move the write condition into named options: `revision` or `exclusive`. | Preserve concurrency protection while removing the absence sentinel. |
| Run store | Point access plus `open`, capture, listing, and cleanup. `browser/src/core/types.ts:2127` | Rename allocation from `open` to `allocate`; name listing options. Retain capture capabilities. | Distinguish reserving a run from hydrating a stored entity. |
| Browse MCP server | Flat browser-launch options; `start` and `destroy`; no emitter. `browser/src/server/types.ts:427` | Group launch settings under `browser`; add `on`, `error`, and `emitter`. | Separate browser configuration from server configuration and expose lifecycle events. |
| Snapshot | `walk({ order: 'depth' | 'breadth' })` selects different traversal implementations. `browser/src/core/BrowserSnapshot.ts:37` | Replace `walk` with `depth(options?)` and `breadth(options?)`. | Remove an algorithm-selecting string while retaining both traversal capabilities. |
| Remote handle | `dispose()` releases the remote object. `browser/src/core/BrowserHandle.ts:82` | Rename it to `destroy()`. | Use the fixed resource-teardown verb. |
| Reading and other child entities | Domain-specific operations and existing interfaces. `browser/src/core/types.ts:2376`; `browser/src/core/types.ts:1393`; `browser/src/core/types.ts:1465` | Retain unless explicitly changed here. | Similar-looking managers need different capabilities when they own different resources. |

The page tools remain `read`, `click`, `type`, `press`, `navigate`, `wait`, `dialog`, and `switch`. Their copy, admission rules, reading projection, and receipts remain governed by the reading campaign. `browser/src/core/types.ts:2842`; `scaffold/.orkestrel/veneer/lifecycle/reading/plan.md:1`

## Entities and managers

Use the following declarations as the replacement contracts. Referenced, unchanged types retain their authoritative definitions.

### Retained browser, context, and page contracts

Retain `BrowserInterface` exactly as declared at `browser/src/server/types.ts:237`, `BrowserContextInterface` at `browser/src/core/types.ts:3481`, and `BrowserPageInterface` at `browser/src/core/types.ts:3405`. Retain their inherited frame and view contracts, except the handle teardown rename described later.

Keep these distinctions:

- `browser.isolate()` creates a remote isolated context.
- `context.create()` creates a remote page.
- The proposed low-level factories construct wrappers around identities the caller already holds.
- `destroy()` releases resources according to ownership.
- `close()` explicitly closes the remote resource.

The distinction between local destruction and remote closure is already part of the public contract. Collapsing it would change the authority exercised by cleanup. `browser/src/server/types.ts:299`; `browser/src/core/types.ts:3459`; `browser/src/core/types.ts:3503`

Use named construction inputs for the low-level factories.

```ts
interface BrowserContextInput {
	readonly client: CDPClientInterface
	readonly id?: string
	readonly writer?: BrowserWriterInterface
}

interface BrowserContextAttachmentOptions {
	readonly on?: EmitterHooks<BrowserContextEventMap>
	readonly error?: EmitterErrorHandler
	readonly reference?: BrowserReferenceFunction
	readonly viewport?: BrowserViewport
	readonly emulation?: BrowserEmulationOptions
	readonly downloads?: BrowserDownloadOptions
}

interface BrowserPageInput {
	readonly client: CDPClientInterface
	readonly target: string
	readonly session: string
	readonly writer?: BrowserWriterInterface
	readonly url?: string
	readonly frame?: string
	readonly context?: string
	readonly opener?: BrowserPageInterface
	readonly reference?: BrowserReferenceFunction
	readonly ready?: Promise<void>
}

interface BrowserPageAttachmentOptions {
	readonly on?: EmitterHooks<BrowserPageEventMap>
	readonly error?: EmitterErrorHandler
}

declare function createBrowserContext(
	input: BrowserContextInput,
	options?: BrowserContextAttachmentOptions,
): BrowserContextInterface

declare function createBrowserPage(
	input: BrowserPageInput,
	options?: BrowserPageAttachmentOptions,
): BrowserPageInterface
```

These factories must preserve the existing constructor semantics. They must not allocate another target, claim a caller-owned client, or bypass target ownership. The page constructor distinguishes context-managed construction through its reference input, so replacing its positional arguments requires preserving that distinction. `browser/src/core/BrowserPage.ts:314`; `browser/src/core/BrowserPage.ts:331`

Keep `BrowserContextOptions` and `BrowserPageOptions` for remote creation. Proxy creation, initial navigation, and viewport setup belong to those creation paths; they must not become implied effects of a wrapper factory. The existing wrapper constructor reads page observer options, while context creation orchestrates page construction. `browser/src/core/BrowserPage.ts:327`; `browser/src/core/BrowserContext.ts:141`

### Toolsets

Replace the toolset interface with the following contract. The only method rename is `perform` → `execute`.

```ts
interface BrowserToolsetInterface {
	readonly emitter: EmitterInterface<BrowserToolsetEventMap>
	readonly tools: ToolManagerInterface
	readonly native: readonly ToolInterface[]
	readonly view: BrowserViewInterface
	readonly limit: number
	readonly held: string | undefined

	redact(text: string): string
	notes(): string
	read(options?: BrowserToolsetReadOptions): Promise<string>
	execute(call: ToolCall, context?: ToolContext): Promise<BrowserToolsetResult>
	follow(
		id: string,
		step: BrowserJourneyStepInput,
		options?: BrowserFollowOptions,
	): Promise<BrowserAction>
	tabs(options?: BrowserCallOptions): Promise<readonly BrowserTab[]>
	hold(name: string, options?: BrowserCallOptions): Promise<BrowserHoldInterface>
	start(options?: BrowserCallOptions): Promise<void>
	destroy(): Promise<void>
}
```

Retain `tools.execute()` and the structured toolset execution boundary. Their return contracts differ: the toolset result also carries the action and thrown value. Removing that boundary would remove information replay needs. `browser/src/core/types.ts:1914`; `browser/src/core/types.ts:3014`

Retain `createBrowserToolset(page, options?)`. Rename the document factory without changing its ownership behavior: it creates the DOM view, releases it on construction failure, and supplies its destruction callback to the toolset. `browser/src/core/factories.ts:155`; `browser/src/browser/factories.ts:62`

The journey adapter gains this exact observation contract.

```ts
type BrowserJourneyEventMap = {
	readonly record: readonly [name: string]
	readonly save: readonly [revision: BrowserJourneyRevision]
	readonly replay: readonly [name: string]
	readonly finish: readonly [run: BrowserRun]
	readonly destroy: readonly []
}

interface BrowserJourneyOptions {
	readonly on?: EmitterHooks<BrowserJourneyEventMap>
	readonly error?: EmitterErrorHandler
	readonly store: BrowserJourneyStoreInterface
	readonly runs?: BrowserRunStoreInterface
	readonly limit?: number
	readonly readonly?: boolean
}

interface BrowserJourneyToolsetInterface {
	readonly emitter: EmitterInterface<BrowserJourneyEventMap>
	readonly recording: string | undefined
	readonly replaying: string | undefined

	destroy(): Promise<void>
}

declare function createBrowserJourneyToolset(
	toolset: BrowserToolsetInterface,
	options: BrowserJourneyOptions,
): BrowserJourneyToolsetInterface
```

Emit after the corresponding operation succeeds. A preparation failure emits neither `replay` nor `finish`. An admitted replay emits `finish` with its resolved run, including a stopped or aborted run. Emit `destroy` after teardown, then destroy the emitter.

### Recorders and replay

Use named snapshot and script options.

```ts
interface BrowserRecorderSnapshotOptions {
	readonly name: string
	readonly description: string
}

interface BrowserCodegenScriptOptions extends BrowserRecorderSnapshotOptions {
	readonly language?: BrowserCodegenLanguage
}

interface BrowserRecorderInterface {
	readonly emitter: EmitterInterface<BrowserRecorderEventMap>
	readonly recording: boolean

	start(): Promise<void>
	stop(): Promise<readonly BrowserJourneyStep[]>
	steps(): readonly BrowserJourneyStep[]
	snapshot(options: BrowserRecorderSnapshotOptions): BrowserJourney
	clear(): void
	destroy(): Promise<void>
}

interface BrowserCodegenInterface extends BrowserRecorderInterface {
	attach(session: string): Promise<void>
	script(options: BrowserCodegenScriptOptions): BrowserCodegenScript
}

interface BrowserCodegenInput {
	readonly client: CDPClientInterface
	readonly session: string
	readonly frames?: () => readonly string[]
}

declare function createBrowserCodegen(
	input: BrowserCodegenInput,
	options?: BrowserRecorderOptions,
): BrowserCodegenInterface

interface BrowserReplayInterface {
	readonly emitter: EmitterInterface<BrowserReplayEventMap>

	execute(options?: BrowserCallOptions): Promise<BrowserRun>
}
```

Preserve snapshot behavior for interrupted actions. The toolset recorder includes an unresolved pending action without consuming its continuation; renaming that projection must not change it. `browser/src/core/types.ts:1822`; `browser/src/core/recorders/BrowserRecorder.ts:83`

Do not add replay `pause`, `resume`, or a second cancellation controller merely to resemble workflow. Replay already accepts a call signal and returns a run whose outcome records interruption. `browser/src/core/types.ts:1900`; `browser/src/core/types.ts:2030`

### Element managers and other managers

Retain the exact element-manager interface.

```ts
interface BrowserElementManagerInterface<
	TElement extends BrowserElementInterface = BrowserElementInterface,
> {
	outline(options?: BrowserOutlineOptions): Promise<BrowserOutline>
	find(
		query: BrowserElementQuery,
		options?: BrowserCallOptions,
	): Promise<readonly TElement[]>
	wait(
		query: BrowserElementQuery,
		options?: BrowserWaitOptions,
	): Promise<readonly TElement[]>
	element(reference: string): TElement | undefined
	elements(): readonly TElement[]
	clear(): void
}

declare function createBrowserElementManager(
	input: BrowserElementManagerInput,
): BrowserElementManagerInterface<BrowserPageElementInterface>

declare function createBrowserDOMElementManager(
	input: BrowserDOMElementManagerInput,
): BrowserElementManagerInterface<BrowserDOMElementInterface>
```

The factories expose the existing dependency boundary; they do not manufacture document identities or private page callbacks. Those inputs already name the protocol resources, readiness functions, navigation observation, and DOM lifetime signal. `browser/src/core/types.ts:2577`; `browser/src/browser/types.ts:86`

Do not add the entire registry vocabulary to every manager.

| Manager family | Ruling | Rejected alternative and cost |
|---|---|---|
| Browser contexts and context pages | Retain their existing noun lookup pairs and creation operations. | Extracting forwarding managers adds API paths and changes ownership-sensitive call sites without removing duplicated state. `browser/src/server/types.ts:289`; `browser/src/core/types.ts:3491` |
| Elements | Retain discovered-reference lookup and `clear`. | `add` and `remove` imply caller ownership of references that document capture actually controls. `browser/src/core/types.ts:2675` |
| Cookies | Retain `cookies`, `set`, and `clear`. | Renaming `set` to `add` obscures replacement semantics. `browser/src/core/types.ts:1465` |
| Permissions | Retain `grant`, `deny`, and `clear`. | Generic collection verbs obscure permission decisions. `browser/src/core/types.ts:1475` |
| Storage and emulation | Retain their snapshot/application operations. | Artificial registries require identities and collections the domain does not contain. `browser/src/core/types.ts:1509`; `browser/src/core/types.ts:1573` |
| Scripts, network, navigation, and popups | Retain their published contracts. | Adding unused lookup, counting, or mutation operations expands capabilities without a consumer. `browser/src/core/types.ts:567`; `browser/src/core/types.ts:1393`; `browser/src/core/types.ts:279`; `browser/src/core/types.ts:330` |

The ecosystem does not prescribe identical manager surfaces. Table rows, table selection, relation models, and workspace registries expose different operations. `scaffold/guides/table.md:119`; `scaffold/guides/table.md:122`; `scaffold/guides/relation.md:106`; `scaffold/guides/workspace.md:61`

### Snapshot and handle changes

Keep every snapshot operation except the traversal selector. Replace that selector with these signatures.

```ts
interface BrowserWalkOptions {
	readonly root?: BrowserNode
}

// Members of BrowserSnapshotInterface:
depth(options?: BrowserWalkOptions): Generator<BrowserNode, void, unknown>
breadth(options?: BrowserWalkOptions): Generator<BrowserNode, void, unknown>
```

Remove `BrowserWalkOrder` because its sole capability is the rejected selector. Preserve the traversal engines, node order, cross-document behavior, and lazy iteration. The existing dispatch selects separate depth and breadth implementations. `browser/src/core/types.ts:3269`; `browser/src/core/BrowserSnapshot.ts:37`

Replace `BrowserHandleInterface.dispose()` with `destroy(): Promise<void>`. Preserve idempotence and remote-object release. `browser/src/core/types.ts:534`; `browser/src/core/BrowserHandle.ts:82`

## Options, events, and errors

### Options

Retain the one-word browser, context, page, toolset, recorder, and replay option keys unless this proposal explicitly changes them. Their existing grouped options already include `cdp`, `browsers`, and `journeys`. `browser/src/server/types.ts:175`; `browser/src/core/types.ts:2938`

Group the MCP server’s browser settings without admitting options that would undermine its profile and pool ownership.

```ts
interface BrowserServerBrowserOptions {
	readonly headless?: boolean
	readonly executable?: string
	readonly viewport?: BrowserViewport
}

interface BrowserServerPoolOptions {
	readonly size?: number
	readonly contexts?: number
}

type BrowserMCPServerEventMap = {
	readonly start: readonly []
	readonly error: readonly [error: unknown]
	readonly destroy: readonly []
}

interface BrowserMCPServerOptions {
	readonly on?: EmitterHooks<BrowserMCPServerEventMap>
	readonly error?: EmitterErrorHandler
	readonly root?: string
	readonly browser?: BrowserServerBrowserOptions
	readonly readonly?: boolean
	readonly launch?: BrowserLaunchFunction
	readonly stdio?: StdioServerOptions
	readonly pool?: BrowserServerPoolOptions
	readonly log?: NodeJS.WritableStream
}

interface BrowserMCPServerInterface {
	readonly emitter: EmitterInterface<BrowserMCPServerEventMap>

	start(): Promise<void>
	destroy(): Promise<void>
}
```

Retain `launch` as the injected browser-construction seam. Do not replace `browser` with unrestricted `BrowserOptions`: the server owns profile creation and disables endpoint discovery in the options it passes to that seam. `browser/src/server/types.ts:356`

Keep navigation conditions, image formats, code-generation languages, media values, and protocol literals as data. A navigation milestone selects when the same navigation completes; an encoding or target language selects its output representation. Preserve external HAR and WebMCP field spellings. `browser/src/core/types.ts:214`; `browser/src/core/types.ts:503`; `browser/src/core/types.ts:2212`; `browser/src/core/types.ts:2749`

### Observation and lifecycle

Retain existing event maps except the additions specified here. In particular, keep toolset `skip`: it describes an intentionally declined adoption, not cancellation of a running action. Its reasons already identify reservation, ownership, naming, schema, and debugging refusals. `browser/src/core/types.ts:2869`; `browser/src/core/types.ts:2907`

Use the installed emitter directly. It isolates each listener and swallows a throwing error handler; another browser-owned error channel would duplicate this behavior. `browser/node_modules/@orkestrel/emitter/dist/src/core/index.js:107`; `browser/node_modules/@orkestrel/emitter/dist/src/core/index.js:149`

Keep browser connection states and run outcomes distinct. They describe different state machines; replacing them with a fleet-wide status union would admit meaningless states. `browser/src/server/types.ts:25`; `browser/src/core/types.ts:1900`

### Errors

Change the base constructor to the ecosystem’s code-first form:

```ts
new BrowserError(code, message, context?)
```

Its public fields become `readonly code: BrowserErrorCode` and the existing readonly optional context record. Preserve every specialized error class and its guard. The base currently accepts an unrestricted string; specialized classes already supply fixed codes and, for step errors, structured action evidence. `browser/src/core/errors.ts:13`; `browser/src/core/errors.ts:79`

Define the finite code vocabulary in core types. Retain the spellings so downstream comparisons and model-facing errors do not change.

```ts
type BrowserErrorCode =
	| `BROWSER_${
			| 'ERROR'
			| 'CONNECTION_ERROR'
			| 'NOT_CONNECTED_ERROR'
			| 'DESTROYED_ERROR'
			| 'RESULT_LIMIT_ERROR'
			| 'ELEMENT_ERROR'
			| 'ELEMENT_QUERY'
			| 'STEP_ERROR'
			| 'CONTEXT_CLOSED'
			| 'PAGE_CLOSED'
			| 'TARGET_HELD'
			| 'WAIT_TIMEOUT'
			| 'NAVIGATION_TIMEOUT'
			| 'JSON_ERROR'
			| 'HAR_ERROR'
			| 'DOCUMENT'
			| 'DOCUMENT_OWN'
			| 'DOCUMENT_DESTROYED'
			| 'DOCUMENT_SUBMIT'}`
	| `BROWSER_CDP_${'ERROR' | 'CONNECTION_ERROR' | 'TIMEOUT_ERROR'}`
	| `BROWSER_CAPTURE_${'UNAVAILABLE' | 'UNTRUSTED'}`
	| `BROWSER_TOOLSET_${
			| 'ARGUMENT'
			| 'BUSY'
			| 'CAPTURE'
			| 'CONTEXT'
			| 'DIALOG'
			| 'ENDED'
			| 'LIMIT'
			| 'OBSERVE'
			| 'PAGE'
			| 'RECEIPT'
			| 'RESERVED'
			| 'ROLE'
			| 'SCHEME'
			| 'SETTLED'
			| 'TAB'}`
	| `BROWSER_JOURNEY_${
			| 'ACCESS'
			| 'AMBIGUOUS'
			| 'ARGUMENT'
			| 'DIALOG'
			| 'EDIT'
			| 'EMPTY'
			| 'FILE'
			| 'FORMAT'
			| 'GAP'
			| 'INPUT'
			| 'INVALID'
			| 'LOCKED'
			| 'MISSING'
			| 'PATH'
			| 'PLACEMENT'
			| 'READONLY'
			| 'RECORDING'
			| 'SAVED'
			| 'STALE'
			| 'TARGET'}`
	| `BROWSER_SERVER_${
			| 'BUSY'
			| 'CRASH'
			| 'ENVIRONMENT'
			| 'EXHAUSTED'
			| 'HOLDER'
			| 'LAUNCH'
			| 'OPTIONS'
			| 'SWEEP'
			| 'TEARDOWN'
			| 'UNAVAILABLE'
			| 'UNRESOLVED'}`
```

This vocabulary includes internal cancellation reasons and server diagnostics as well as errors surfaced to callers. Document that distinction. For example, `BROWSER_TOOLSET_SETTLED` terminates internal capture work, while `BROWSER_TOOLSET_RECEIPT` carries an interrupted receipt. `browser/src/core/BrowserToolset.ts:792`; `browser/src/core/BrowserToolset.ts:1820`

Do not create a class per code. Preserve the existing classes that carry a narrower domain meaning or additional evidence. Keep `isBrowserError` as the exception guard; add `isBrowserErrorCode` only for boundaries that read a code as unknown data.

### Abort and timeout

Preserve `BrowserCallOptions` with `signal` and `timeout`, and preserve rejection with the caller’s `signal.reason`. Store calls retain their signal-only options. `browser/src/core/types.ts:2744`; `browser/src/core/types.ts:2039`

Compose an owner’s lifetime, the caller’s signal, and the operation deadline with `AbortSignal.any` where a composite operation needs those bounds. Do not restart the full timeout at each internal stage. Retain typed timeout errors and replay’s aborted-run outcome; do not translate every cancellation into a generic browser error.

The package already composes lifetime and call signals in journey execution and page waits. The alignment must preserve those boundaries rather than replace them with a global `abort()` that cancels unrelated work. `browser/src/core/BrowserJourneyToolset.ts:185`; `browser/src/core/BrowserPage.ts:433`

## The free-function, constant, and type classification

The independent `rg` declaration count on `2026-10-06` matches the supplied inventory: **236 functions, 125 constants, 233 interfaces, 61 type aliases, and 66 classes**. These are source declarations, not all public entry-point exports. The parity exclusion list contains implementation classes omitted from the barrels. `scaffold/.orkestrel/veneer/lifecycle/reading/api/consumers.md:29`; `browser/tests/guides.test.ts:35`

The requested classification needs an explicit qualification: factories and reusable effectful helpers are neither pure leaves nor necessarily entity internals. Removing them merely to fit that classification would conflict with the public-capability rule. The architecture rules explicitly admit reusable infrastructure helpers that perform host work. `scaffold/.claude/rules/architecture.md:61`

The following partition covers every function in the measured inventory.

| Group | Measured declarations | Membership and ruling |
|---|---:|---|
| Entity factories | 17 | Every function in the environment `factories.ts` files. Retain, with the document-factory rename and additions specified here. `browser/src/core/factories.ts:41`; `browser/src/browser/factories.ts:29`; `browser/src/server/factories.ts:41` |
| Guards and parsers | 49 | Core validators, core parsers, both error-guard files, the server `parse*` functions, `isBrowserDocument`, `isBrowserNodeQuery`, and `isBrowserNodeVisible`. Retain. Move declarations into their proper kind files where needed, preserving barrel access. `browser/src/core/validators.ts:17`; `browser/src/core/parsers.ts:52`; `browser/src/server/helpers.ts:58`; `browser/src/browser/helpers.ts:23`; `browser/src/core/helpers.ts:3037` |
| Pure composition functions | 137 | Core compilers; core helpers excluding the preceding predicates, `generateBrowserRunId`, and `settleBrowserTeardown`; server helpers excluding parsers and the effectful set below. Retain. A method’s use of a pure leaf is not grounds for hiding it. `browser/src/core/compilers.ts:34`; `browser/src/core/helpers.ts:134`; `browser/src/server/helpers.ts:120` |
| Reusable effectful composition functions | 32 | The explicit host set below. Retain and document their effects. They are not classified as pure. |
| Redundant selection wrapper | 1 | Remove `findSystemBrowser`; replace callers with `findSystemBrowsers(options)[0]`. Its implementation is exactly that projection. `browser/src/server/helpers.ts:228` |
| Other functions removed as implementation details | 0 | The reading supplies no capability-based justification for a broader removal campaign. |

The effectful set is closed and explicit:

- Core: `generateBrowserRunId` and `settleBrowserTeardown`. They respectively consume time/randomness and execute cleanup callbacks. `browser/src/core/helpers.ts:3466`; `browser/src/core/helpers.ts:3107`
- Server: `probeProcess`, `findSystemBrowsers`, `createBrowserProfile`, `removeBrowserProfile`, `findEnvOverrides`, `findInstallPaths`, `probePathNames`, `findStorePaths`, `launchBrowserProcess`, `readBrowserEndpoint`, and `fetchCDPTargets`. These inspect or operate on processes, files, streams, or endpoints. `browser/src/server/helpers.ts:83`; `browser/src/server/helpers.ts:185`; `browser/src/server/helpers.ts:268`; `browser/src/server/helpers.ts:448`; `browser/src/server/helpers.ts:560`
- Browser: every function in `src/browser/helpers.ts` except `isBrowserDocument`. These read live DOM state, advance a host traversal, or install listeners. Preserve that distinction in documentation. `browser/src/browser/helpers.ts:47`; `browser/src/browser/helpers.ts:940`; `browser/src/browser/helpers.ts:994`

Do not move `createBrowserProfile` into entity factories merely because of its prefix. It returns profile data and creates a directory; the naming rules explicitly distinguish that from constructing a live entity. `browser/src/server/helpers.ts:268`; `scaffold/.claude/rules/architecture.md:70`

Retain the constants and classify them by purpose.

| Constants | Measured declarations | Ruling |
|---|---:|---|
| Core | 67 | Retain protocol values, limits, compiler material, reference rules, reading rules, and tool copy. The ruled tool-copy and reading constants remain unchanged. `browser/src/core/constants.ts:96`; `browser/src/core/constants.ts:528`; `browser/src/core/constants.ts:925` |
| Browser | 8 | Retain DOM role, state, and interaction tables. `browser/src/browser/constants.ts:7` |
| Server | 50 | Retain discovery inputs, launch parameters, persistence names, pool bounds, and diagnostics. `browser/src/server/constants.ts:9`; `browser/src/server/constants.ts:225` |

Retain public types by their supported mechanism, not their external import count.

| Types | Measured declarations | Ruling |
|---|---:|---|
| Core | 257 | Retain entity contracts, data, protocol projections, extension inputs, and existing reusable orchestration contracts. Replace the specific signatures in this proposal; remove `BrowserWalkOrder`. `browser/src/core/types.ts:39`; `browser/src/core/types.ts:2577`; `browser/src/core/types.ts:3269` |
| Browser | 10 | Retain DOM construction, lifetime, naming, and transport contracts. `browser/src/browser/types.ts:22`; `browser/src/browser/types.ts:86`; `browser/src/browser/types.ts:163` |
| Server | 27 | Retain browser discovery, ownership, store, launch, and MCP contracts; group the specified options. `browser/src/server/types.ts:64`; `browser/src/server/types.ts:349`; `browser/src/server/types.ts:363` |

Reject indiscriminate export pruning. Its cost is loss of supported composition points, followed by duplicated downstream logic. The ecosystem explicitly publishes pure leaves used by its entities, including form evaluation and table operations. `scaffold/guides/form.md:185`; `scaffold/guides/table.md:200`

## Stores and extension points

Preserve async point access and backend-owned concurrency. Introduce the following options and replacement interfaces.

```ts
interface BrowserStoreListOptions extends BrowserStoreOptions {
	readonly offset?: number
	readonly limit?: number
}

interface BrowserJourneyWriteOptions extends BrowserStoreOptions {
	readonly revision?: number
	readonly exclusive?: boolean
}

interface BrowserJourneyStoreInterface {
	get(
		name: string,
		options?: BrowserStoreOptions,
	): Promise<BrowserJourneyRevision | undefined>

	set(
		journey: BrowserJourney,
		options?: BrowserJourneyWriteOptions,
	): Promise<BrowserJourneyRevision>

	delete(name: string, options?: BrowserStoreOptions): Promise<void>

	list(
		options?: BrowserStoreListOptions,
	): Promise<BrowserStorePage<BrowserJourneyRevision>>
}

interface BrowserRunStoreInterface {
	snapshot?(bytes: Uint8Array, options?: BrowserStoreOptions): Promise<string>
	allocate(name: string, options?: BrowserStoreOptions): Promise<BrowserRunSlot>
	get(
		name: string,
		id: string,
		options?: BrowserStoreOptions,
	): Promise<BrowserRun | undefined>
	set(run: BrowserRun, options?: BrowserStoreOptions): Promise<void>
	capture(
		slot: BrowserRunSlot,
		name: string,
		bytes: Uint8Array,
		options?: BrowserStoreOptions,
	): Promise<string | undefined>
	delete(name: string, id: string, options?: BrowserStoreOptions): Promise<void>
	clear(name: string, options?: BrowserStoreOptions): Promise<number>
	list(
		name: string,
		options?: BrowserStoreListOptions,
	): Promise<BrowserStorePage<BrowserRun>>
}
```

Define journey writes precisely:

- Omitted `revision` and `exclusive` permit replacement.
- `exclusive: true` requires absence.
- `revision` requires the stored revision to match.
- Reject `exclusive: true` combined with `revision`, before writing.
- A supplied revision must be a positive safe integer.
- Deletion retains revision history; recreation advances it.
- A missing delete remains a no-op.

The backend must enforce the condition atomically. A manager-side read followed by an unconditional write would lose the existing stale-write protection. `browser/src/core/types.ts:2088`

Keep `snapshot` as the optional standalone-image capability. It returns a persisted image path, not a serialized run. Keep slot-based `capture`, because it preserves the store-owned directory boundary. `browser/src/core/types.ts:2128`; `browser/src/core/types.ts:2142`

Do not add journey or run registries in this change. The existing tools operate on persisted journey values; introducing a cache would create freshness and invalidation obligations. The journey toolset reads store listings directly and uses an exclusive write when saving a recording. `browser/src/core/BrowserJourneyToolset.ts:324`; `browser/src/core/BrowserJourneyToolset.ts:356`

Reserve registry `open` and `save` for a future live-entity registry with a real consumer. Workspace and workflow use those verbs to hydrate and persist registered entities, which differs from run allocation. `scaffold/guides/workspace.md:215`; `scaffold/guides/workflow.md:590`

Retain the existing extension seams:

| Seam | Ruling |
|---|---|
| `CDPTransportInterface` | Keep the raw transport contract; keep correlation in the client. `browser/src/core/types.ts:39`; `browser/src/core/types.ts:138` |
| `BrowserViewInterface` | Keep optional observation and screenshot capabilities. Do not fabricate unsupported DOM capabilities. `browser/src/core/types.ts:2716` |
| `BrowserToolSourceInterface` | Keep the protocol-independent tool source and its optional census. `browser/src/core/types.ts:2886` |
| `BrowserWriterInterface` | Keep host persistence outside core. `browser/src/core/types.ts:196` |
| Journey/run stores | Preserve interchangeable implementations and their explicit additional capabilities. |
| `BrowserLaunchFunction` | Keep caller-supplied browser construction within server-owned launch options. `browser/src/server/types.ts:363` |

No dependency addition is required. The declared and installed contract, emitter, and tool packages already supply the relevant validation, observation, and tool contracts. `browser/package.json:111`; `browser/package-lock.json:202`; `browser/package-lock.json:227`; `browser/package-lock.json:599`

## Consumers and their migration

The independent `rg` scan agrees with `api/consumers.md` about executable external imports: **Ollama’s tests are the only sibling code consumer**. The scan included static imports and `import()`/`require()` forms in source-like files, excluded `node_modules`, `dist`, and `tmp`, and separated comments and generated-source fixtures from executable imports.

The exact import inventory is as follows.

| Ollama file | Imports from browser |
|---|---|
| `tests/setupStore.ts` | `BrowserJourney`, `BrowserJourneyStep`, `BrowserInterface`; `BROWSER_JOURNEY_TOOL_NAMES`, `BROWSER_TOOL_LIMIT`, `createBrowserToolset`, `parseBrowserJourney`, `parseBrowserReference`, `parseBrowserRun`, `renderBrowserJourney`, `validateBrowserToolArguments`, `createFileBrowserJourneyStore`, `createFileBrowserRunStore`. `ollama/tests/setupStore.ts:16`; `ollama/tests/setupStore.ts:27` |
| `tests/setupStore.test.ts` | `BrowserJourney`; `BROWSER_TOOL_COPY`, `BROWSER_TOOL_LIMIT`, `BROWSER_JOURNEY_TOOL_NAMES`, `createBrowserReading`, `createBrowserToolset`, `scanBrowserLines`, `renderBrowserJourney`, `createBrowser`, and the file-store factories. `ollama/tests/setupStore.test.ts:12`; `ollama/tests/setupStore.test.ts:20` |
| `tests/setupStore/types.ts` | `BrowserJourney`, `BrowserPageInterface`, `BrowserRun`. `ollama/tests/setupStore/types.ts:2` |
| `tests/service/browser.test.ts` | `BrowserInterface`, `createBrowser`. `ollama/tests/service/browser.test.ts:1` |
| `tests/setupService.ts` | `SystemBrowser`, `SystemBrowserOptions`, `findSystemBrowser`. `ollama/tests/setupService.ts:2` |
| `tests/setupServer.ts` | `BrowserCallOptions`, `BrowserConsoleMessage`, `BrowserPageError`, `BrowserPageInterface`, `BrowserRequest`, `createBrowser`. `ollama/tests/setupServer.ts:13` |
| `tests/setupServer.test.ts` | `BrowserCallOptions`. `ollama/tests/setupServer.test.ts:15` |

The import-based measurement is **12 functions, 3 constants, 10 interfaces, 1 type alias, and no classes**. That differs from the token-based “used outside browser” column in `api/consumers.md`; that column reports lexical matches, including collisions, rather than actual imports. Its declaration totals agree with the independent count. `scaffold/.orkestrel/veneer/lifecycle/reading/api/consumers.md:29`

Migrate the affected executable consumers in the same change:

- Replace the `findSystemBrowser` import with `findSystemBrowsers` and select the first result in `requirePageBrowser`. `ollama/tests/setupService.ts:240`
- Replace `runs.open(...)` with `runs.allocate(...)`. `ollama/tests/setupStore.test.ts:1217`
- Keep the other imported names and the browser/context creation calls. `ollama/tests/setupStore.ts:1288`; `ollama/tests/setupServer.ts:1123`
- Update browser-owned generated modules, fixtures, tests, and guide examples for renamed execution, recorder, traversal, and teardown members. Generated journey modules are themselves public-API consumers. `browser/src/core/compilers.ts:978`; `browser/tests/setup.ts:3923`

The declared-but-not-imported sibling set also agrees with the census: desk, indexeddb, database, workflow, veneer, and scaffold. Their manifests require coordinated pin and lockfile handling when the release is adopted. `desk/package.json:66`; `indexeddb/package.json:75`; `database/package.json:102`; `workflow/package.json:105`; `veneer/package.json:135`; `scaffold/package.json:110`

Refresh the browser guide mirrors in database, workflow, indexeddb, veneer, Ollama, and scaffold from the accepted upstream guide. Do not hand-edit mirrored API descriptions. This mirror set agrees with the supplied consumer reading. `scaffold/.orkestrel/veneer/lifecycle/reading/api/consumers.md:19`

## Scope, ordered must, should, and stays

Treat the combined migration as **large** because it crosses package boundaries. Size each implementation unit by its own contract and risk.

| Priority | Change | Size and scope |
|---|---|---|
| Must | Name public inline recorder and store options. | Medium: core contracts and their consumers. |
| Must | Replace journey `expected: 0` with explicit write conditions; preserve atomic revision checks. | Medium: concurrency and file-store behavior. |
| Must | Split snapshot traversal algorithms into named operations. | Medium: public contract change; snapshot implementation and consumers. |
| Must | Rename handle `dispose` to `destroy`. | Medium: public lifecycle contract and resource release. |
| Must | Correct misplaced guard/parser declarations while retaining their exports. | Small per behavior-preserving move; scoped source, barrel, and guide changes. |
| Must | Remove the redundant singular discovery wrapper and migrate Ollama. | Large in aggregate because the migration crosses repositories. |
| Must | Preserve guide/export/method parity and update every renamed consumer. | Part of each owning unit and final integration. |
| Should | Add typed factories for context, page, codegen, journey toolset, and element managers. | Medium: construction contracts and owner call sites. |
| Should | Rename toolset `perform` to `execute`, recorder `journey` to `snapshot`, and `started` to `recording`. | Medium: public naming changes; preserve execution and recording behavior. |
| Should | Rename run `open` to `allocate`. | Medium: public store contract and consumer migration. |
| Should | Add finite error codes and the code-first constructor. | Medium: broad mechanical migration with error-boundary review. |
| Should | Group MCP browser options and add journey/MCP observation. | Medium: public options and lifecycle observation. |
| Stays | Model-facing vocabulary, copy, reading behavior, receipts, secret handling, and journey tools. | No API-driven behavior change. |
| Stays | Connection ownership, local destruction, remote closure, protocol access, and existing capability seams. | No semantic redesign. |
| Stays | Supported pure and effectful composition helpers, constants, and types. | No export-count target. |

The optional coherence changes belong in the approved change if selected. They are not deferred implementation promises.

## Units

Use serial writing units in the browser checkout. Shared contracts and barrels have an explicit owner; later writers report required changes to those files for integration.

| Unit | Ownership and routing | Acceptance |
|---|---|---|
| Contract | **Opus** owns environment `types.ts`, factory signatures, and the exact public naming diff. The Orchestrator runs commands. | Types precede implementations; every changed signature has a migration mapping; unchanged capability and ownership contracts remain explicit. |
| Construction | **Astra** owns context/page/codegen/element construction implementations, factories, owner call sites, and their tests. | Factories return interfaces; direct construction preserves client ownership, target identity, readiness, popup publication, and teardown. |
| Execution and recording | **Astra** owns toolsets, recorders, replay call sites, generated-module compilation, and corresponding tests. | Renamed paths produce identical tool results and action evidence; interrupted snapshots and secret redaction remain intact; generated modules execute through the replacement API. |
| Stores | **Astra** owns memory/file stores and their tests; coordinates store consumers with the execution unit. | Exclusive creation, stale revision refusal, deletion/recreation, lock contention, allocation, capture confinement, missing deletion, and abort behavior pass against real implementations. |
| Errors and lifecycle | **Astra** owns error implementations, handle teardown, snapshot traversal, MCP implementation, CLI option mapping, and their tests. | Code/message/context preservation; traversal-order equivalence; idempotent handle release; isolated observers; server start/destroy events reflect completed transitions. |
| Surface placement | **Astra** owns guard/parser moves and discovery-wrapper removal. | No implementation duplication, no dependency re-export, and no unintended barrel loss. |
| Ollama migration | **Astra**, after browser integration, owns the affected setup files and package pin/lockfile changes. | The setup project passes; service consumers run against the candidate browser build; store-task oracles remain unchanged. |
| Guide | **Opus** owns `guides/browser.md`, README, and final public doc-block wording. The Orchestrator runs commands. | Every export has a Surface row; every Summary equals its doc block; method tables exactly match interfaces; executable examples use the replacement API. |
| Review | Independent **Opus** review of Astra mechanisms and **Astra** review of Opus contracts. | Attack ownership, CAS, cancellation, construction, secret preservation, and complete consumer migration. |
| Verification | Read-only **Astra command runner**. | Scoped checks first, then the required tree-wide gates once per changed repository; distribution and real-browser service proofs cover the published entries. |

Each writing unit runs the touched proof, touched test file, project tests, and scoped check. The final runner uses the repository’s declared format, lint, typecheck, build, and test commands. Browser also declares separate distribution and service projects; those are needed to validate the published API and real browser behavior. `browser/package.json:73`; `browser/package.json:99`

Restructure the guide within the headings it already has:

- **Surface:** lead with common construction and composition; retain an exhaustive environment-specific inventory.
- **Methods:** group by entity; keep data properties in Surface.
- **Contract:** state ownership, observation, cancellation, write conditions, and placement limits as testable invariants.
- **Patterns:** demonstrate page automation, DOM placement, recording, persistence, replay, custom stores, and MCP hosting.

The guide already contains Surface, Methods, Contract, and Patterns. The task is to improve their organization and parity, not introduce a competing documentation format. `browser/guides/browser.md:17`; `browser/guides/browser.md:1713`; `browser/guides/browser.md:3372`; `browser/guides/browser.md:3403`

## Risks

The main risk is changing semantics during a naming migration.

| Risk | Required control |
|---|---|
| Wrapper factories accidentally acquire remote resources or alter ownership. | Preserve the direct-construction versus context-managed target distinction; prove destruction against borrowed and owned resources. |
| Store simplification loses concurrency protection. | Enforce revision and exclusive conditions inside each backend, including deletion/recreation races. |
| Error migration changes tool copy or loses action evidence. | Compare messages, codes, context, and `BrowserStepError.action`; preserve bounded error rendering. |
| Observer additions disrupt operations. | Use the installed emitter’s isolation; emit after committed state changes; destroy observation last. |
| Rename misses generated source or structural consumers. | Check generated modules, public-entry distribution tests, and the complete sibling import list. |
| A finite code union includes internal cancellation reasons without explaining them. | Separate documented caller errors from internal control reasons while preserving their values. |
| Export classification becomes a deletion mandate. | Require a capability or wrapper justification for each removal. External non-use alone is insufficient. |
| A store registry is added without freshness semantics. | Keep persistence direct in this change; introduce a registry only with a real live-entity consumer. |

This is a read-only design assessment. The proposed contracts and migration have not been typechecked or exercised, and no test or gate result is claimed.

## Points for the user’s ruling

Approve the focused alignment described here, including the coherence changes, subject to the following explicit decisions.

| Decision | Recommendation | Cost of the rejected choice |
|---|---|---|
| API breadth | Preserve supported composition primitives. | Broad pruning removes customization points and forces downstream duplication. |
| Manager extraction | Keep browser/context collections on their owning entities. | Extracting them adds ownership-sensitive paths and forwarding layers without a demonstrated consumer benefit. |
| Construction | Add typed factories while retaining the low-level construction capability. | Parent-only creation would remove direct CDP composition; positional construction keeps arguments difficult to distinguish. |
| Naming | Adopt `execute`, recorder `snapshot`/`recording`, run `allocate`, and handle `destroy`. | Keeping both names creates compatibility shims; retaining the old names preserves avoidable vocabulary differences. |
| Store conditions | Use `revision` and boolean `exclusive`, enforced by the backend. | Keeping `0` retains an absence sentinel; moving checks outside the backend permits lost updates. |
| Lifecycle | Preserve `close` separately from `destroy`. | Collapsing them can terminate a shared remote browser during local cleanup. |
| Errors | Use finite existing code spellings and a code-first base constructor. | Retaining arbitrary strings prevents exhaustive handling; shortening all codes adds another migration without improving behavior. |
| Function classification | Recognize factories and effectful composition helpers explicitly. | Calling them pure is inaccurate; forcing them into entities creates unnecessary wrappers or removes supported mechanisms. |
| Compatibility | Migrate all known consumers atomically, with no aliases. | An alias period leaves duplicate API paths and conflicts with the repository’s compatibility rule. |
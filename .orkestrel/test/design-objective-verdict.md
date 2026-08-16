1. **Emitter recorder bundle — OUT.** No `@orkestrel/test` name or entry point. Consumers: agent, console, database, emitter, mcp, interpret, pool, queue, reason, relation, terminal, worker, workflow, workspace. `createErrorRecorder` is a rename-only wrapper over `createRecorder`; delete it and use `createRecorder<readonly [error: unknown, event: string]>()`. Do not publish the current `EmitterRecorders` / `recordEmitterEvents` / `isTotal` shape. It would expose `@orkestrel/emitter` types from a zero-dependency package. Its guard is also unsound for widened arrays: `ReadonlyArray<keyof TMap>` can contain only some runtime keys while `isTotal` promises all keys in the static union. Queue’s widened `QUEUE_EVENTS` demonstrates the risk. Keep explicit subscriptions until a sound, dependency-free shape exists.

2. **Deferred gates — native adoption, OUT.** No new name or entry point. Consumers: agent, console, pool, queue, router, server, worker, workflow, toolbox, plus inline sites in those packages. Replace `createGate`, `createDeferred`, executor-captured resolvers, and `TestGateInterface` with `Promise.withResolvers<T>()`; delete console and toolbox’s unused factories. Every consumer targets ESNext, uses TypeScript 6.0.3, and requires Node `>=22.12.0`, so both declarations and runtime support are present. Native `resolve` accepts `T | PromiseLike<T>`, which is a safe widening of the local gates.

3. **Start-and-keep loopback servers — IN.** Add to `@orkestrel/test/server`:

   ```ts
   interface LoopbackServerInterface {
   	readonly port: number
   	readonly url: string
   	stop(): Promise<void>
   }

   function createLoopbackServer(server: import('node:net').Server): Promise<LoopbackServerInterface>
   ```

   It binds the supplied unstarted server to `127.0.0.1:0`, reads the bound port, and keeps it listening until `stop()`. Consumers: router, websocket, terminal, scaffold, middleware; server has an unused copy; mcp has a different `@orkestrel/server` lifecycle. Router and middleware delete their address guards and manual listen/close promises. Websocket, terminal, and scaffold retain their protocol handlers but delete the common bind/address/close spine. Server deletes its unused helper. MCP keeps its local `start`/`stop`/`destroy` composition because it is not a native Node server.

4. **Reserve-then-release ports — IN under an honest name.** Add `findLoopbackPort(): Promise<number>` to `@orkestrel/test/server`. Consumers: supervisor and browser. It binds `127.0.0.1:0`, reads the port, closes the probe, and returns the number. The contract must state that the port is only known to have been free before return; no reservation survives, so another process can claim it. Both consumers delete `reserveLoopbackPort` / `reservePort` and their local address readers. Use this only because both current child-process protocols require a numeric port and cannot inherit an open handle; any consumer able to accept port `0` must start-and-keep instead.

5. **Bounded semantic retries — IN; timer polling — OUT.** Add to core:

   ```ts
   interface RetryOptions {
   	readonly attempts?: number
   	readonly message?: string
   }

   function retryUntil<T>(
   	produce: () => Promise<T>,
   	accept: (value: T) => boolean,
   	options?: RetryOptions,
   ): Promise<T>
   ```

   It returns the first accepted value and throws after a positive bounded attempt count, defaulting to six. Consumers: ollama and supervisor, whose `retryUntil` implementations match apart from error prose. They delete those copies. Browser `waitForCondition`, ollama `waitForRequest`, supervisor’s recorder/readiness loops, and supervisor’s inline deadline loops do not move: they park idle work on timers and would publish polling architecture. Replace them with observable events where possible; keep unavoidable child-process readiness probes domain-local. MCP’s `waitForSettlement` remains local because it is a single deadline race, not this retry mechanism.

6. **Teardown registrar — IN with dependency-safe failure semantics.** Add to core:

   ```ts
   interface TeardownInterface<T> {
   	track<U extends T>(resource: U): U
   	execute(): Promise<void>
   }

   function createTeardown<T>(
   	dispose: (resource: T) => void | Promise<void>,
   ): TeardownInterface<T>
   ```

   Consumers: mcp and worker. `execute()` drains in reverse registration order, awaits each disposer sequentially, continues after failures, rethrows one failure by identity, and throws an `AggregateError` for several in disposal order. This preserves MCP’s resource dependency order while retaining worker’s all-failures guarantee. Concurrent `Promise.allSettled` is wrong for dependent resources; MCP’s current fail-fast loop can leak later resources. The helper must not import or call Vitest. Each consumer keeps one `afterEach(() => teardown.execute())` and deletes its registrar implementation. Database and indexeddb keep registration-order cleanup because their stated ordering differs.

7. **Indexed-value requiring — existing adoption, OUT.** No new `requireElement`. Consumers: queue and terminal. Replace each helper with `requireValue(values[index], message)` from core and delete it. CSV’s `assertAndNarrow` remains local because it applies a caller-supplied guard and is not presence-only. Guide’s `requireTable` and `requireText` retain their domain lookup and diagnostic behavior.

8. **Recursive freezing — IN.** Add `deepFreeze<T>(value: T): T` to core. Consumers: reason and rater. The contract freezes the same reference and every reachable array or ordinary record, handles cycles, does not invoke accessors while traversing, and leaves class instances, functions, maps, and sets unchanged. Both consumers delete their recursive copies. This adds recursive graph behavior over `Object.freeze`; it is not a rename wrapper.

9. **Raw invocation — native adoption, OUT.** No `invokeRaw` export. Consumers: interpret, reason, rater. Delete their helpers and call `Reflect.apply` at the deliberately untyped boundary, then narrow the `unknown` result with the relevant domain guard. A generic `<T>` return lets the caller claim any result type without proof, while the checked variant only rename-wraps the native callable check and `Reflect.apply`.

10. **Injected time — one IN capability; timer fixtures stay local.** Add to core:

    ```ts
    interface ManualClockInterface {
    	readonly now: () => number
    	advance(milliseconds: number): void
    	set(value: number): void
    }

    function createManualClock(start?: number): ManualClockInterface
    ```

    Consumers: mcp and middleware. They delete their copies; middleware passes `manual.now` to its production option named `clock`. This is a legitimate inert collaborator because production explicitly accepts a time source. It does not replace the host clock. Terminal’s flush-all timer and toolbox’s fire-by-index timer remain local: their observable contracts differ, they name `@orkestrel/terminal`’s `TimerHandler`, and toolbox depends on terminal. Global fake clocks and patched host timers remain prohibited.

11. **Seeded PRNG — ecosystem adoption, OUT.** No `@orkestrel/test` PRNG. Consumers: sse and websocket; ndjson already adopts the originating primitive. Replace `mulberry32` and `createRandom` with `seededRandom` from `@orkestrel/contract` when dependency changes are authorized. Its published contract already fixes numeric `ToUint32` normalization, exact Mulberry32 output, `[0, 1)` range, and same-seed sequence stability. The signed `| 0` and unsigned `>>> 0` local variants produce the same 32-bit sequence, so migration is deterministic. Do not duplicate that contract in `@orkestrel/test`.

12. **Chunk-invariance corpus — IN.** Add to core:

    ```ts
    interface ChunkParserInterface<T> {
    	parse(chunk: string): readonly T[]
    }

    function feedChunks<T>(
    	parser: ChunkParserInterface<T>,
    	chunks: readonly string[],
    ): readonly T[]

    function createChunkings(
    	text: string,
    	sizes?: readonly number[],
    ): readonly (readonly string[])[]

    function partitionText(text: string, random: () => number): readonly string[]
    ```

    Consumers: sse and ndjson. Both delete `feedAll`, `chunkings`, and `partition`, while retaining protocol constants and protocol-specific assertions. Validate positive integer sizes and random values in `[0, 1)` so malformed inputs cannot create a non-terminating partition. These helpers exercise a structural `parse` seam and do not reimplement either runtime parser.

13. **Abort waiting — IN; signal instrumentation — deletion.** Add `waitForAbort(signal: AbortSignal): Promise<void>` to core. Consumers: mcp and supervisor. It resolves immediately when already aborted and otherwise registers one `{ once: true }` listener. Both delete their copies. Do not publish `createSignalRecorder` or `instrumentSignal`; consumers mcp and workflow currently replace a real signal’s `addEventListener` and `removeEventListener`, which is platform-method patching and violates the real-event rule, especially in workflow’s browser tests. Rewrite those tests around observable abort propagation and completion instead of listener counts.

14. **SSE and NDJSON framed readers — ecosystem adoption, OUT.** No reader, parser, or protocol types enter `@orkestrel/test`. Consumers: mcp and supervisor. MCP deletes its local SSE framing loop in favor of `createSSEParser` from `@orkestrel/sse`. Supervisor deletes `SSEReader`, `readSSEMessage`, `readSSEUntil`, and `parseProviderFrames`/NDJSON framing in favor of `createSSEParser` and `createNDJSONParser`; it retains domain stop predicates and transport driving. Both already declare `@orkestrel/sse`. Adding `@orkestrel/ndjson` where absent requires explicit dependency authorization.

15. **IndexedDB helper trio — OUT; no browser entry.** No `@orkestrel/test/browser` is warranted. Consumers: indexeddb and database. `deleteDatabase` is shared, but `uniqueName` carries different product prefixes and hidden counter policy, while cleanup order differs from the proposed LIFO teardown. The two packages are also one dependency cluster. A browser face would require `src/browser/types.ts`, a barrel, package export, alias, scoped DOM tsconfig, Vite build, check/build scripts, environment-boundary coverage, browser tests, and a browser provider dependency not currently installed. Keep these helpers local until a third independent browser consumer establishes a larger surface.

16. **Process liveness — narrow IN; exit waits stay local.** Add `hasProcess(pid: number): boolean` to `@orkestrel/test/server`. Consumers: supervisor and browser. Use signal `0` and treat a Linux `/proc` zombie as not live; document that the guarantee concerns caller-owned, signalable processes. Both delete `hasProcess` / `isProcessAlive`. Do not add `waitForProcessExit(pid)`: browser’s form polls a PID, while supervisor correctly holds a `ChildProcess` and parks on `close`. Supervisor retains its event-driven process result and stop policy; browser should expose a child handle when possible and otherwise keep the PID poll local.

17. **Hostile-input builders — OUT as domain policy.** No public shape. Consumers: qualifier, reason, workspace, scaffold, contract, html. Their populations differ across cyclic and deep records, null prototypes, hostile keys, throwing getters, revoked proxies, sparse arrays, oversized values, and domain-shaped nodes. A common API would require behavior modes or publish one suite’s coverage policy as framework mechanism. Each package keeps its own corpus.

18. **Single-consumer and protocol fixtures — OUT.** `ApplicationCookieJar` stays in supervisor; `waitForEvent` stays in supervisor and would otherwise expose emitter types; terminal, toolbox, and websocket keep their distinct TTY/form, provider, and WebSocket scripted peers. Router and server keep their distinct paused-response probes. These shapes either fail the two-package demand gate or implement different protocols. No `@orkestrel/test` names are added.

19. **Existing core surface — adoption sweep, no API change.** Keep the published readonly shapes unchanged.

    - `roundTripJSON<T>(value: T & JSONSafe<T>): T`: agent, workflow, and workspace delete their local copies and stale comments. The actual signature accepts interface snapshots. Adoption newly rejects explicit `undefined`, methods, opaque objects, symbol members, and non-finite numbers instead of silently reshaping them; that tightening is the intended JSON-portability proof. Audit equivalent inline stringify/parse sites in agent, browser, csv, markdown, workflow, and reason individually.
    - `collect`: database deletes `collectRows`; supervisor deletes `collectProviderObservations`. Supervisor’s service collector stays because it also preserves the generator’s terminal result.
    - `collectStream`: csv deletes its local reader loop. HTML and markdown already adopt it.
    - `requireValue`: sse deletes `expectDefined`; supervisor uses it inside `readGuideText`; queue and terminal adopt it as proposal 7.
    - `waitForDelay`: ollama replaces the raw ten-millisecond timeout inside `waitForRequest`, without thereby making the polling helper publishable.
    - `resolveRoot`: adopt in the readable guide suites for abort, agent, brief, browser, budget, console, contract, csv, database, emitter, guide, html, indexeddb, interpret, markdown, mcp, msg, ndjson, ollama, pool, program, qualifier, queue, rater, reason, relation, router, sea, server, sqlite, sse, template, terminal, timeout, tool, toolbox, websocket, worker, workflow, workspace, supervisor, and middleware. Delete their parent-URL constants and direct `new URL('../', import.meta.url)` spellings.

20. **Existing server surface — adoption sweep, no API change.**

    - `readInventory`: brief deletes its glob/read implementation; supervisor deletes `walkGuideDirectory` and `readGuideWorkspace`, expressing its omitted entries through `exclude`.
    - `createScratch`: supervisor deletes `createTemporaryDirectory` and migrates its path/destroy call sites; sqlite replaces its file-database `mkdtempSync` allocation. Browser, database, sea, worker, and scaffold retain wrappers only where they add registration, a database filename, seeded files, or junction behavior.
    - `resolveContained`, `matchesIdentity`, and `isExcluded`: no measured duplicate requires a sweep.
    - Raw directories inside `@orkestrel/test`’s own `createScratch` tests remain native independent controls; using the subject to construct its own proof would assert the implementation against itself.

21. **Fleet boilerplate — deletion and scaffold-template repair, no new API.** Delete `isBrowserVuePath` from the roughly 40 copied setup files across the 42 readable trees listed in proposal 19. Where older config tests still consume it, update them to the current scaffold configuration behavior. Do not export it from `@orkestrel/test`, and do not add it to scaffold: standing evidence shows the scaffold repository does not own or emit it. The line-aligned `config.test.ts` temporary-directory sites are different: repair the scaffold template to use `createScratch`, then regenerate the fleet. Keep a native self-hosted control only where `@orkestrel/test` must test its own scratch implementation independently.

22. **Remaining measured clusters — OUT.** `TEST_SEED = 42` in csv, guide, html, and markdown is a bare corpus choice, not a mechanism. `captureContractError` in budget and contract is a domain narrowing boundary and should use `@orkestrel/contract` primitives. Extreme-number tables in reason and rater contain different populations. Store-contract fixtures in terminal and workspace register different assertions and data. None receives an `@orkestrel/test` name; consumers retain domain data or adopt the originating ecosystem primitive.

DESIGN OBJECTIVE: 22 proposals
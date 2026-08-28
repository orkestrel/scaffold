# Fix dossier: mcp

Verified fix-producing findings for the `mcp` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s01-01 — DRIFT

1. package=mcp file=`/home/user/fleet/mcp/src/browser/transports/HTTPClientTransport.ts:83-321` and `/home/user/fleet/mcp/src/server/transports/HTTPClientTransport.ts:82-323` rule=`.claude/rules/architecture.md` § Environment/module placement + § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
   wrong: One host-independent class exists twice — identical `#emitter`/`#url`/`#headers`/`#fetch`/`#timeout`/`#pending`/`#parameters`/`#stamps` fields, identical `send`, `#stamp`, `#exchange`, `close`, `#buildHeaders`, `#capture`, and `#select` (the last three ~110 lines byte-for-byte) — and the copies have already drifted: `server/#deliver:253` throws `buildResponseError` for a non-`ok` reply while `browser/#deliver:238-253` swallows it, so the two published faces disagree about whether `send` rejects, which `MCPClientTransportInterface.send` (`src/core/types.ts:2376-2403`) specifies at length.
   repair: Move the class to `src/core/transports/HTTPClientTransport.ts` (it uses only `fetch`, `Response`, `AbortController`, `AbortSignal`, `WeakMap` — all available in core, and `@orkestrel/sse` is already a runtime dependency), export it from the core barrel, and leave each face with only its `create*` factory. Make the non-`ok` behaviour one documented option rather than a fork.

## s01-02 — DRIFT

2. package=mcp file=`/home/user/fleet/mcp/src/browser/helpers.ts:46-92` and `/home/user/fleet/mcp/src/server/helpers.ts:267-309` rule=`.claude/rules/architecture.md` § Environment/module placement ("Shared cross-environment logic belongs in the central core/shared layer") verdict=CONFIRMED
   wrong: `decodeEvent` is byte-identical in both faces and depends only on `JSON.parse` plus core's `parseJSONRPCMessage`; `readEventStream` is the same function in both but for one comment. The module comments (`browser/helpers.ts:12-17`, `server/helpers.ts:127-129`) justify this as "peer environment faces share no import", which is true and irrelevant — both faces import `@src/core`, which is where shared logic belongs.
   repair: Move `decodeEvent` and `readEventStream` to `src/core/helpers.ts`, export them from the core barrel, and import them in both faces. Delete both copies.

## s01-03 — DRIFT

3. package=mcp file=`/home/user/fleet/mcp/src/browser/helpers.ts:9,153` rule=`.claude/rules/architecture.md` § Kind purity ("Keep the leaf pair class-free … `helpers.ts` and `validators.ts` … import no implementation class") verdict=CONFIRMED
   wrong: `helpers.ts` imports `MessagePortTransport` and constructs it (`new MessagePortTransport({ port })`), and also calls `createMCPServer` (`:4,182`) to build an `MCPServer`. An edge running downward from a class-constructing function into the leaf pair is exactly what the rule forbids; the file comment at `:19-25` argues only about `factories.ts` naming and never addresses leaf purity.
   repair: Move `createScopeMessageListener`, `serveMCPScope`, and `serveMCP` out of `helpers.ts` into `src/browser/factories.ts` (which already imports the transport classes and holds `createScopeTransport`), renaming the two bootstrap exports to the `create*` form that file requires. Update the barrel, the guide's export table, and `tests/setupBrowser.ts`'s import.

## s01-04 — DRIFT

4. package=mcp file=`/home/user/fleet/mcp/src/core/constants.ts:235`, `/home/user/fleet/mcp/src/browser/constants.ts:43`, `/home/user/fleet/mcp/src/core/MCPClient.ts:518` rule=`AGENTS.md` § Authority ("Never import assumptions, names, or logic from another repository") + `.claude/rules/architecture.md` § System constraints ("free of unrelated-project logic") verdict=CONFIRMED
   wrong: `DEFAULT_MCP_CLIENT_NAME = 'taverna'` and `DEFAULT_MCP_SERVER_NAME = 'taverna'` ship another project's name as this package's default wire identity — every `@orkestrel/mcp` consumer who omits `identity` announces itself to a peer as `taverna` — and `MCPClient.ts:518` cites "the taverna idiom" as the authority for using `AbortSignal.timeout`. `guides/mcp.md:2178,3148` repeat the literal without stating any exception.
   repair: Set both defaults to this package's own identity (`'@orkestrel/mcp'`), update the two guide rows, delete the words "the taverna idiom" from the comment (keep "never a raw `setTimeout`"), and update the three assertions in `tests/src/core/MCPClient.test.ts` that pin the literal.

## s01-05 — DRIFT

5. package=mcp file=`/home/user/fleet/mcp/src/core/MCPServer.ts:227` rule=`AGENTS.md` § Design laws ("Derive state", "Real domain states only") verdict=CONFIRMED
   wrong: `dispatch` emits `this.#emitter.emit('request', invocation.method, invocation.id, 'modern')` with the era as a literal. No path in the package emits `'legacy'` (`MCPLegacy` answers `initialize`/`ping` itself and forwards only after translating to modern), so the third tuple element is a constant — while `MCPServerEventMap.request` (`src/core/types.ts:1935`) and `MCPEra` (`:251-261`) both document it as the "structurally selected wire era", and `types.ts:1908-1911` tells an observer it can "partition by it". Worse than redundant: a legacy-shaped invocation genuinely reaches `#dispatch` (it is refused later by `#modern:377-386`) and is reported as `'modern'`.
   repair: Emit the era that was selected — `isModernRequest(invocation) ? 'modern' : 'legacy'`, the same read `src/server/handlers.ts:104` already performs — or drop the element from `MCPServerEventMap` and its prose. Do not leave the type claiming a fact the emit does not produce.

## s01-06 — DRIFT

6. package=mcp file=`/home/user/fleet/mcp/src/core/MCPServer.ts:452-453` rule=`.claude/rules/typescript.md` § Comments ("Comments explain why, never restate what self-explanatory code does") verdict=CONFIRMED
   wrong: The comment "The built-in modern `tools/call` handler — stamped, and NOT cacheable, so it carries no cache fields" sits above `#resources`, the `resources/list` handler, which is cacheable and does stamp `ttlMs`/`cacheScope` (`:482-490`). It describes `#call` (`:761`), which carries no comment of its own.
   repair: Replace the comment with one describing `#resources` (a cacheable paged projection over the consumer's resource manager), and move the cacheability note to `#call` if it is wanted there.

## s01-07 — DRIFT

7. package=mcp file=`/home/user/fleet/mcp/src/server/types.ts:180-188` and `/home/user/fleet/mcp/src/server/MCPSession.ts:69-72` rule=`AGENTS.md` § Design laws ("One concept, one term") + `.claude/rules/names.md` § Type-level identifiers (`{Entity}Options`) verdict=CONFIRMED
   wrong: One `MCPSessionOptions` type serves two entities with conflicting meanings. Its own TSDoc defines `ttl` as "the session idle lifetime in milliseconds" for the middleware store; `MCPSession` reads the same key as the replay-log per-event lifetime (`MCPSession.ts:72`, defaulting to `DEFAULT_MCP_SESSION_TTL`, "the default per-event idle lifetime … of a session's folded resumable event log"). The middleware avoids the collision by never forwarding it (`middlewares.ts:182`), but `MCPSession` is barrelled and its `@example` shows direct construction, so a consumer passing `{ ttl: 60_000 }` gets the meaning the documentation does not describe, and `path`, `origin`, and `keepalive` are accepted and silently ignored.
   repair: Give the entity its own options type in `src/server/types.ts` carrying only `capacity` and `ttl` (named for the entity, `MCPSessionOptions`), and rename the middleware's type to the factory it configures (`MCPSessionMiddlewareOptions`). Update `MCPSession`'s constructor, `createMCPSession`, and the guide's Types rows.

## s01-09 — DRIFT-RESHAPE

9. package=mcp file=`/home/user/fleet/mcp/src/server/helpers.ts:57-62` rule=`.claude/rules/architecture.md` § Wrapper test ("Delete … wrappers around semantically identical platform or declared-dependency primitives") verdict=CONFIRMED
   wrong: `createReadableStream(pull, cancel)` returns `new ReadableStream<T>({ pull, cancel })` and nothing else — no boundary, invariant, composition, translation, lifecycle, or narrower contract. It has one caller (`transports/HTTPDisconnect.ts:123`) and a published guide row (`guides/mcp.md:2688`, `:3960`, `:3980`).
   repair: Delete the function, call `new ReadableStream<Uint8Array>({ pull, cancel })` in place at `HTTPDisconnect.ts:123` with the two existing arrow arguments as `pull` and `cancel`, and remove the guide's export row, its fenced example, and the parity entry.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: delete `createReadableStream`, and at HTTPDisconnect.ts:123 construct `new ReadableStream<Uint8Array>({ pull: this.#pull, cancel: this.#cancel })` with `#pull` and `#cancel` declared as bound arrow class fields (the pattern this class's siblings already use at WebSocketServerTransport.ts:54-56), then remove the guide export row at guides/mcp.md:2688, its fenced example at :3960,:3980, and the parity entry

**Lane DRIFT-RESHAPE/medium:** amend: delete `createReadableStream` and its guide row, fence, and parity entry, then in `HTTPDisconnect` hold the reader in a `#` field and lift the two behaviours into `#` arrow-function class fields (the class's existing idiom), constructing `new ReadableStream<Uint8Array>({ pull: this.#pull, cancel: this.#cancel })` — do not write the arrows inline inside the source object

## s01-10 — DRIFT

10. package=mcp file=`/home/user/fleet/mcp/src/core/types.ts:2340` rule=`.claude/rules/names.md` § General vocabulary ("Describe what a thing is") + `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
    wrong: `MCPClientTransportInterface` is the package's role-neutral message carrier — its own TSDoc says "with no knowledge of the protocol role on either side. … Server bridges use the same carrier" — and it is implemented by `StdioServerTransport` (`src/server/transports/StdioServerTransport.ts:50`) and `WebSocketServerTransport` (`:49`), and consumed by `bridgeMessageTransport(transport: MCPClientTransportInterface)` for server-side carriers. The name asserts a role the contract explicitly disclaims, and a reader cannot predict that a server transport implements a type named `Client`.
    repair: Rename to `MCPMessageTransportInterface` (and `MCPClientTransportEventMap` to `MCPMessageTransportEventMap`), update every implementer, consumer, guide table, and the `## Methods` bijection list at `guides/mcp.md:4846-4863`. This moves the published surface and earns a version bump; that is the correct cost per `.claude/rules/architecture.md` § Kind purity's move-versus-rename rule.

## s01-11 — DRIFT

11. package=mcp file=`/home/user/fleet/mcp/src/server/helpers.ts:476-504` rule=`.claude/rules/architecture.md` § Kind purity (`factories.ts` holds entity/value factories; every exported function there is `create*`) verdict=CONFIRMED
    wrong: `bridgeMessageTransport` builds and returns a stateful adapter value (it closes over `onMessage`/`onClosed` and subscribes to an emitter), which is what `createDuplexClientTransport` (`src/core/factories.ts:169-190`) does for the mirror direction — yet one sits in `helpers.ts` under a `bridge*` name and the other in `factories.ts` under `create*`. Two functions of one kind, two files, two name forms.
    repair: Move `bridgeMessageTransport` to `src/server/factories.ts` and rename it `createMessageTransportBridge`, updating `factories.ts:26,264,396`, the barrel-driven guide rows (`guides/mcp.md:2706,2813,2830`), and the two transport tests that import it.

## s01-12 — DRIFT

12. package=mcp file=`/home/user/fleet/mcp/src/server/transports/HTTPDisconnect.ts:42` rule=`.claude/rules/architecture.md` § Extension categories ("Nest because the category is a designed growth seam, not because a class name happens to end in `Store` or `Driver`") verdict=CONFIRMED
    wrong: `HTTPDisconnect` sits in the `transports/` category folder but is not a transport — it implements neither `MCPTransportInterface` nor `MCPClientTransportInterface`, and its own first sentence says it "Composes one incoming HTTP request lifetime with one MCP-owned SSE response lifetime." The module's other non-transport entity, `MCPSession`, correctly sits at the module root. The name also states an event rather than the entity it is.
    repair: Move the file to `src/server/HTTPDisconnect.ts` beside `MCPSession.ts`, update the barrel row (`src/server/index.ts:7`) and the two importers (`handlers.ts:30`, `middlewares.ts:27`). Consider renaming the class for what it is (a response lifetime), and if you do, take it in the same change rather than a later one.

## s01-13 — DRIFT

13. package=mcp file=`/home/user/fleet/mcp/src/browser/transports/MessagePortTransport.ts:70,78,102` rule=`AGENTS.md` § Design laws ("No superfluous wrappers"; the cleanup sweep in `.claude/rules/architecture.md` § Declaration placement) verdict=CONFIRMED
    wrong: `readonly #malformed = (): void => {}` is registered for `messageerror` and removed on close purely to do nothing. Not registering a listener produces the identical observable behaviour — an unhandled `messageerror` on a `MessagePort` neither throws, closes the port, nor reaches the transport. The class TSDoc (`:38-45`) presents the no-op registration as a deliberate mechanism, so the prose asserts a mechanism the runtime does not have.
    repair: Delete the `#malformed` field and its `addEventListener`/`removeEventListener` calls. Keep the documentation sentence, reworded to state the outcome ("a `messageerror` is ignored: one bad frame is not a dead channel, so nothing tears the binding down").

## s01-14 — DRIFT-RESHAPE

14. package=mcp file=`/home/user/fleet/mcp/src/browser/helpers.ts:47-51`, `/home/user/fleet/mcp/src/server/helpers.ts:304-308`, `/home/user/fleet/mcp/src/core/parsers.ts:163`, `/home/user/fleet/mcp/src/core/helpers.ts:1194`, `/home/user/fleet/mcp/src/core/MCPServer.ts:270-275`, `/home/user/fleet/mcp/src/core/MCPLegacy.ts:101-106`, `/home/user/fleet/mcp/src/server/handlers.ts:89-96`, `/home/user/fleet/mcp/src/server/middlewares.ts:110-115` rule=`.claude/rules/patterns.md` § Declared ecosystem capabilities ("Reuse the originating package directly when semantics match"; "Never reimplement … a declared package primitive") verdict=CONFIRMED
    wrong: The `try { JSON.parse(x) } catch { → undefined }` boundary is written out at eight sites. `@orkestrel/contract@0.0.13` is a declared dependency and its installed declaration exports exactly that primitive: `parseJSON(value: string): unknown` — "Parse a JSON string, returning `undefined` instead of throwing. The safe boundary for untrusted JSON text" (`node_modules/@orkestrel/contract/dist/src/core/index.d.ts:4465-4477`). `undefined` is unambiguous as a failure signal, because no JSON text parses to it.
    repair: Import `parseJSON` from `@orkestrel/contract` and replace each hand-written boundary with `const parsed = parseJSON(text)` plus the site's existing `undefined` branch. Keep the local `try`/`catch` only where the caught value itself is used (`WebSocketClientTransport.#receive` emits the parse error).

### Verification

**Lane DRIFT-RESHAPE/high:** amend: apply `parseJSON` only where the boundary is exactly "parse this string or `undefined`" (browser/helpers.ts:47-51, server/helpers.ts:304-308, core/MCPServer.ts:270-275, core/MCPLegacy.ts:101-106, server/handlers.ts:89-96, and core/helpers.ts:1194 where it replaces the `attempt` composition); at server/middlewares.ts:110-115 keep a `try` around `await request.text()` and use `parseJSON` for the text alone; at core/parsers.ts:163 replace only the parse step and leave the surrounding `try` until the rest of the body is proven throw-free; keep the local `try`/`catch` where the caught value is used (`WebSocketClientTransport.#receive`)

**Lane DRIFT-RESHAPE/high:** amend: import `parseJSON` from `@orkestrel/contract` and replace the six hand-written boundaries, but keep an explicit boundary around `await request.text()` in middlewares.ts (parse the text separately with `parseJSON`), and record src/core/helpers.ts:1194 and src/core/cloners.ts:33 as `attempt`→`parseJSON` simplifications rather than as reimplementations

## s01-15 — DRIFT

15. package=mcp file=`/home/user/fleet/mcp/src/server/transports/WebSocketServerTransport.ts:117-131`, `/home/user/fleet/mcp/src/server/transports/WebSocketClientTransport.ts:244-258`, `/home/user/fleet/mcp/src/browser/transports/WebSocketClientTransport.ts:222-240` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: Three copies of one `#receive`: parse the frame, narrow with `parseJSONRPCMessage`, emit `message` on success and `error` on either failure. `src/server/helpers.ts:409-422` already owns this exact fold for stdio (`dispatchLines`), so the package has four implementations of one step.
    repair: Export one leaf — `deliverMessage(emitter, text)` in `src/core/helpers.ts` — that decodes one frame and emits `message` or `error`, have `dispatchLines` call it per line, and reduce each transport's `#receive` to that call. Where a transport needs a different error text, pass it as a parameter rather than forking the body.

## s01-16 — DRIFT

16. package=mcp file=`/home/user/fleet/mcp/src/core/validators.ts:1279-1282` rule=`.claude/rules/typescript.md` § Types ("Put every reusable or public interface/type alias in the nearest authoritative `*/types.ts`") verdict=CONFIRMED
    wrong: `isMCPTaskNotification`'s predicate target is an anonymous inline intersection — `JSONRPCNotification & { readonly method: 'notifications/tasks'; readonly params: MCPTaskNotificationParams }` — declared in a guard file. It is a public, reusable narrowed type (`src/core/helpers.ts:1011-1015` consumes the narrowing to read `notification.params.taskId`), and a consumer has no name for what the guard proves.
    repair: Declare `MCPTaskNotification` in `src/core/types.ts` beside `MCPTaskNotificationParams`, annotate the guard as `value is MCPTaskNotification`, and add its guide Types row.

## s01-17 — DRIFT

17. package=mcp file=`/home/user/fleet/mcp/src/core/MCPClient.ts:172-178` and `:475-481` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") + `.claude/rules/typescript.md` § Types verdict=CONFIRMED
    wrong: The subscription entry shape (`queue`, `capacity`, `waiter`, `terminal`, `failure`) is written out twice, verbatim, in one file — once inside the `#pending` map's value type and once as the local annotation in `#openSubscription`. Two declarations of one shape drift independently, and `#settle` (`:1078-1090`) reads both.
    repair: Declare it once in `src/core/types.ts` (it is the client's own private glue, so give it a name and reference it from both positions) and annotate both sites from that name. The surrounding comment's claim that "the settler shape lives inline here" stops being true for the half that is duplicated.

### Verification

**Judge (DRIFT/high):** Both lanes agree the duplication is real; the dispute is the repair, and the subjective lane's decisive evidence fails on two counts. First, its mechanical claim breaks: `#settle` calls `this.#pending.delete(id)` BEFORE it mutates `waiter`/`queue`/`failure`/`terminal`, so the generator loop only wor

**Lane DRIFT/high:** amend: remove the duplication, and rule explicitly on publication. Either name the shape in `src/core/types.ts` (accepting it as published API, adding its guide Types row and parity entry, and correcting the `#pending` comment at MCPClient.ts:146 in the same change), or keep it private by letting the object literal at :475-481 take its type contextually from `this.#pending.set` and reading the entry back, so the shape is declared once and nothing new is published

**Lane DRIFT-RESHAPE/medium:** amend: delete the local annotation at MCPClient.ts:475-481 rather than naming the shape — build the subscription inside the `this.#pending.set(id, { ... })` argument so the map's declared value type types it contextually, and read it back from the entry for the loop, leaving the single inline declaration at :172-178 as the file's one home

## s01-18 — DRIFT

18. package=mcp file=`/home/user/fleet/mcp/src/server/types.ts:249-253` rule=`.claude/rules/names.md` § Type-level identifiers + § General vocabulary ("Describe what a thing is") verdict=CONFIRMED
    wrong: `EventStoreEntry` names an `EventStore` that does not exist — `MCPSession.ts:12` records that the store was folded into the session — and it is the one type in the module without the `MCP` prefix its siblings carry (`MCPSessionEntry`, `MCPSessionState`, `MCPHeaderIssue`). It also collides conceptually with `MCPSessionEntry`, which is a different "entry" for a different thing.
    repair: Rename to `MCPSessionEvent` (the unit `MCPSessionInterface.replay` returns), updating `types.ts:216,249`, `MCPSession.ts:3,63,96,98`, the guide rows at `guides/mcp.md:2722,3674,4870`, and the compile-time guard in `tests/src/server/MCPSession.test.ts:226`.

## s01-19 — DRIFT

19. package=mcp file=`/home/user/fleet/mcp/src/server/inferers.ts:87-92` rule=`.claude/rules/names.md` § Split behavioral variants ("Different value selects a different action/algorithm/shape of work → split") verdict=CONFIRMED
    wrong: `inferHeaderIssue(request, reference: JSONRPCInvocation | MCPVersion)` runs two unrelated algorithms selected by the argument's runtime type at `:92`: a string `reference` compares the protocol header against a pinned session version and returns; an invocation derives protocol, method, and name expectations from the body. The two branches share no code, and the parameter name `reference` is vague precisely because it has to cover both. Callers already know which they want (`middlewares.ts:195` always passes a version, `handlers.ts:124` always passes an invocation).
    repair: Split into `inferHeaderIssue(request, invocation)` and `inferSessionHeaderIssue(request, version)`, each with its own `@remarks`, and point each call site at the one it means.

## s01-20 — DRIFT

20. package=mcp file=`/home/user/fleet/mcp/src/core/MCPServer.ts:1223,1205,1459`, `/home/user/fleet/mcp/src/server/transports/WebSocketClientTransport.ts:274` rule=`.claude/rules/names.md` § General vocabulary ("Properties are nouns; methods are verbs") verdict=CONFIRMED
    wrong: `#round`, `#answers`, `#named`, and `#httpURL` are methods named as data. `#named(request)` returns a validated `taskId`, `#round(value)` returns an owned round, `#answers(requests, responses)` checks and owns a response map, and `#httpURL()` normalizes a URL — each reads at the call site as a property access rather than an action (`const named = this.#named(request)`).
    repair: Rename to the verb each performs: `#readTaskId`, `#ownRound`, `#checkAnswers`, `#toHTTPURL`. Private, so no published surface moves.

### Recorded exceptions

- `/home/user/fleet/mcp/src/core/MCPProgressReporter.ts:34` — the class exposes `take` and `stop` beyond `MCPProgressInterface`. verdict=EXEMPT, documented at `guides/mcp.md:3283` ("The class exposes MORE than `MCPProgressInterface` deliberately: the interface is the narrow …").
- `/home/user/fleet/mcp/src/core/MCPServer.ts:316-317` — `_options` unused parameters. verdict=EXEMPT, justified in the source at `MCPServer.ts:308-314` (registry-wide seam conformance), which `.claude/rules/names.md` § Fixed derivation/construction forms admits as "a short justification for each rare `_` in `src/`".
- `/home/user/fleet/mcp/src/server/transports/WebSocketServerTransport.ts:52-56`, `.../StdioServerTransport.ts:54-56`, `.../browser/transports/MessagePortTransport.ts:69` — arrow-function class fields where core uses `.bind(this)` in the constructor. verdict=EXEMPT, justified in place ("Bound once, as fields, so `close` can remove exactly the subscriptions `start` installed").
- `/home/user/fleet/mcp/src/core/helpers.ts:96,198` — `isFormElicitationSupported` and `isTaskSupported` carry `is*` names in `helpers.ts`. verdict=EXEMPT, `.claude/rules/architecture.md` § Kind purity places a predicate that is not a `Guard<T>` in `helpers.ts` by name.

## s01-ex-A — DRIFT

package=mcp file=src/core (MCPProgress and its interface) rule=`.claude/rules/documentation.md` § Parity ("Each implementing class exposes exactly its interface methods")
    wrong: `MCPProgressInterface` declares only `report`; the `MCPProgress` class also exposes `take` and `stop` publicly, so the class exposes extra public behavior and the parity rule has no exemption clause. The package guide documents the owner/consumer split, but a guide cannot grant an exemption from a rule (judge ruling over both lanes, subjects s01-ex-01 and s01-ex01).
    repair: Keep every class public. Declare the owning half on its own interface — for example `MCPProgressOwnerInterface` extending the consumer interface with `take` and `stop` — implemented by the class, exported from `types.ts`, documented in the guide. Additive only; do not remove `take` or `stop`.

## s01-ex-B — DRIFT

package=mcp file=src/core (MCPMethodHandler and one-parameter handlers) rule=`.claude/rules/names.md` § Fixed derivation/construction forms ("Remove the parameter when signature compatibility does not require it")
    wrong: Handlers bind a `_`-prefixed parameter that signature compatibility does not require; the judge over subjects s01-ex-02 and s01-ex02 ruled that the operative bullet is the removal directive, not the justification bullet both lanes quoted.
    repair: Where the `MCPMethodHandler` type itself must narrow to make the removal possible, the change moves a published type: defer to the breaking work order. Where a handler can simply omit the trailing unused parameter under the existing type (TypeScript accepts fewer parameters), remove the `_` binding there and keep the type unchanged.


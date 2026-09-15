<!-- Unit D1-S — planner (Opus 5, native), subjective lane, blind. Retained verbatim from the completion notification, 2026-09-15. Duration 755 s, 41 tool uses. Transcript file was consumed on first read, so this copy is the record. -->

I hold the **subjective** lane of design unit D1 (`planner`, Opus 5).

# Design

## 1. Tool contract

### 1a. Cancellation reaches the handler — one grouped context object

`ToolInterface.execute` takes the arguments record and one context object:

```ts
export interface ToolContext {
	/** Aborts when the caller stops waiting for this call. */
	readonly signal: AbortSignal
	/** Carries consumer-asserted caller identity, forwarded without verification. */
	readonly caller?: unknown
}

export interface ToolInterface extends ToolDefinition {
	readonly summary?: string
	execute(args: Readonly<Record<string, unknown>>, context: ToolContext): Promise<unknown> | unknown
}

export interface ToolManagerInterface {
	execute(call: ToolCall, context?: ToolContext): Promise<ToolResult>
	execute(calls: readonly ToolCall[], context?: ToolContext): Promise<readonly ToolResult[]>
}
```

`caller` moves off `ToolCall`, so `ToolCall` becomes `{ id, name, arguments }` — the model's intent and nothing else, plain JSON end to end.

Three reasons this shape wins over putting `signal` on `ToolCall`:

- `ToolCall` crosses a wire. `RelayProvider.body` already strips `caller` by hand before serializing (`agent/src/core/providers/RelayProvider.ts:84-129`). An `AbortSignal` is not JSON, so putting it there adds a second strip and makes a value type carry a live platform object. Moving `caller` out deletes the existing strip instead of adding one.
- The invocation genuinely has two halves: **what** is being run (the call) and **under what conditions** (who asked, when to stop). Grouping the conditions is what `names.md` § Group options by entity prescribes, and `{Entity}Context` is the fixed type form for an execution context.
- WebMCP's callback is `ToolExecuteCallback = Promise<any>(object inputObject, ToolExecuteCallbackOptions { required AbortSignal signal })` (`G5c-webmcp-idl.md` § 1). Our shape is that shape with one extra optional member. A page tool written against either reads the same.

`signal` is **required** on `ToolContext`, and `ToolContext` is always passed. A manager call with no context mints a controller and hands its signal through. A tool author writes `fetch(url, { signal: context.signal })` and never asks whether cancellation exists. That costs one `AbortController` allocation per call, against a call that already cost a model round trip. The current arity nicety — the registry omitting `caller` so a handler reading its own arity sees one argument (`tool/src/core/types.ts:94-96`) — is retired with it.

This closes a defect the fleet already wrote down. `MCPServerOptions.execution`'s own TSDoc reads: "This is also the only way a tool observes cancellation. The default path calls `ToolManagerInterface.execute`, whose signature takes a call and nothing else, so there is no seam to hand a signal through — a server with no `execution` runs its tool to completion even after the request that asked for it has ended, and abandons the result" (`mcp/src/core/types.ts:2142-2148`). The seam it names is the one this adds.

### 1b. Arguments validate from a contract, and `parameters` stays the advertised schema

`parameters` keeps its job: the open JSON Schema record a provider advertises. Add one sibling option:

```ts
export interface ToolOptions {
	readonly name: string
	readonly title?: string
	readonly description?: string
	readonly summary?: string
	readonly parameters?: Readonly<Record<string, unknown>>
	readonly contract?: ContractShape
	readonly annotations?: ToolAnnotations
	readonly execute: (args: Readonly<Record<string, unknown>>, context: ToolContext) => Promise<unknown> | unknown
}
```

When `contract` is set, `Tool.parameters` is **derived** through `@orkestrel/contract`'s `compileSchema` rather than stored, and `Tool.execute` validates `args` against the compiled guard before calling the handler. Supplying `contract` and `parameters` together throws a `ToolError` from the constructor, because two sources for one advertised schema is exactly the drift `AGENTS.md` § Design laws forbids under "Derive state".

Reject the union `parameters?: Record | ContractShape`: it makes one member carry two algorithms the manager must discriminate, and it forces `ToolDefinition` — a pure wire projection — to hold a non-wire value.

`@orkestrel/contract` is already tool's sole runtime dependency, so this adds no package. The ergonomic gain is the point: today a page author hand-writes JSON Schema, gets no validation, and a model that hallucinates `{ text: 42 }` reaches a handler that mutates the DOM. That is the prompt-injection surface WebMCP's own security section names, and it is the surface a page tool has and a server tool does not.

### 1c. Validation failure throws; the manager isolates it

Keep the existing split exactly: `ToolInterface.execute` contains nothing, and `ToolManagerInterface.execute` is where a call becomes a `ToolResult` (`tool/src/core/types.ts:88-103`). A validation failure throws a `ToolError` carrying the contract's own `explain` text, and the manager isolates it into a `ToolFailure` the same way it isolates a handler throw.

No new arm on `ToolResult`, no second path. What matters is the message the model reads on the next turn: `ToolFailure.error` must name which argument was wrong, because "invalid arguments" teaches a model nothing and "text: expected string, received number" gets a correct retry. A direct caller still gets the typed throw the existing TSDoc already promises it (`tool/src/core/types.ts:57-59`).

### 1d. Blast radius — take the cascade now

The change breaks every hand-written tool in agent, mcp, ollama, probe, and toolbox, plus their guides and tests. Take it in this campaign, for three reasons:

- The cascade is one round, in a campaign that is already re-pinning tool's consumers in layer order for other reasons. Doing it later means a second cascade over the same set.
- The defect is already recorded in mcp's published types, quoted earlier. A fleet that documents a missing seam and then ships another release without it is documenting a decision nobody made.
- WebMCP's IDL makes the signal required. If a page tool built on this fleet cannot be cancelled and a WebMCP tool can, "we have all the parts to do it better" fails at the first comparison a reader makes.

Also land in tool, because the WebMCP bridge cannot be honest without them: `ToolDefinition.title?: string` (the human label a consent prompt shows, distinct from the machine `name`) and `ToolDefinition.annotations?: ToolAnnotations`:

```ts
export interface ToolAnnotations {
	/** Reports that the tool changes no state its caller can observe. */
	readonly inert?: boolean
	/** Reports that the tool's value can carry content the tool did not author. */
	readonly untrusted?: boolean
	/** Reports that running the tool has a consequence a caller must confirm. */
	readonly consequential?: boolean
}
```

WebMCP spells these `readOnlyHint`, `untrustedContentHint`, `consequentialHint`; MCP spells its own set `readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`. The two foreign vocabularies disagree, so `names.md` § General vocabulary puts the neutral domain word on tool's type and the projection on the bridge. Without annotations, every tool this fleet hands a foreign agent arrives with no consent metadata at all.

## 2. Agent placement proofs

**Ruling: agent proves its own placements, in its own suite, in three projects.**

- **Node alone** — **retained on existing evidence.** `src:core` already runs the whole tool loop in Node (`agent/vite.config.ts:32-135`). What is missing is the sentence in `guides/agent.md` naming that project as the proof. Add the sentence; add no test.
- **Page alone** — **implement.** Agent adds `tests/src/browser/` and a `src:browser` Vitest project on Playwright Chromium, with `tests/setupBrowser.ts` and `configs/browsers.ts`. The proof constructs a scripted in-page `ProviderInterface`, an in-page `Tool` that mutates the DOM, and an `Agent`, then asserts the DOM changed and `fetch` was called zero times.
- **Relay across the two** — **implement, in the same project.** An `Agent` plus `createRelayProvider` in the page, against a Node `createRelay` fixture on `127.0.0.1` and an ephemeral port, with a page tool that executes in the page. `G4-ollama-relay-distillate.md` Unknowns records that no scoped test anywhere composes `createAgent(createRelayProvider(...), { tools })`, so the fleet's headline placement claim has no gate today. mcp's `tests/fixtures/browserServer.ts` is the established shape for a Node fixture serving a Playwright page, so this is new infrastructure in quantity, not in kind.

**Refuse a `src/browser` source environment in agent.** Every candidate mechanism fails the minimal-API gate. A `MessagePort`-carried provider, a page-lifecycle binder, a browser scheduler — the first has no named consumer, the second is application policy, and the third belongs to `@orkestrel/workflow`, which already publishes host backends. Agent's published face stays core-only; what it gains is a second environment it is **proven in**, not a second environment it **ships**.

`P1-closure-probe.md` is the reason this matters: it establishes statically that no root entry in agent's runtime closure imports `node:` or reads `process`, and states plainly what it did not establish — that each entry evaluates in a real page. A dynamic import, an unnamed global read, or a top-level side effect is outside a grep. The Chromium receipt is the only thing that settles it, and the receipt belongs where the claim is made.

**Fallback, if the project shape is refused:** place the page proofs in `@orkestrel/mcp`'s existing `src:browser` project with `@orkestrel/agent` and `@orkestrel/tool` as devDependencies of mcp. A development edge changes no layer and obliges no cascade. The cost is that agent's guide points at another package's tree for its own proof, which is worse but not wrong.

## 3. In-page MCP server

### 3a. Keep `MessageChannel`; compose the pair

**Refuse a second same-context transport.** `new MessageChannel()` is a native primitive, the pair is already proven in a real page (`mcp/tests/src/browser/factories.test.ts:459-460`) and in Node on published packages (`P2-c3-probe.md`), and a direct in-memory pair adds no boundary, invariant, composition, translation, lifecycle, or narrower contract.

What is missing is a factory. A consumer today writes the channel, two transports, `bindServer`, `createDuplexClientTransport`, `createMCPClient`, and `bindClient`, in an order the transport's own doc warns about: "do not interleave an `await` between `new MessagePortTransport(…)` and `bindServer`/`listen`" (`mcp/src/browser/transports/MessagePortTransport.ts:26-29`). A documented footgun a consumer has to remember is a factory that has not been written.

```ts
export interface PageServerInterface {
	/** Holds the client already bound to the server this call hosts. */
	readonly client: MCPClientInterface
	/** Closes both ports, unbinds both sides, and releases the channel. */
	stop(): void
}

export function createPageServer(options: PageServerOptions): PageServerInterface
```

This is `createScopeServer`'s page twin, named for where it hosts. The guide sentence writes itself: `createScopeServer` boots a server in a worker scope; `createPageServer` boots one in the page it is called from and hands back the client already connected to it. It passes the wrapper test on boundary, invariant, composition, and lifecycle.

### 3b. Refuse a window transport; add the handshake

`MessagePort` already crosses documents — `frame.contentWindow.postMessage(handshake, origin, [port2])` is the platform idiom, and `createScopeMessageListener` already gates port-bearing events through `options.accept(event)`, which can read `event.origin` (`mcp/src/browser/factories.ts:255-270`). The transport exists. The missing half is the client side of the handshake.

```ts
export function createScopeClient(options: ScopeClientOptions): MCPClientInterface
```

`ScopeClientOptions` carries `scope` (the `Window` or `Worker` to hand a port to), a **required** `origin`, and the client's own optional `identity`, `capabilities`, `version`, and `timeout`. Making `origin` required with no wildcard default is the design statement: this package never posts a transferable port to an unnamed origin. `createScopeServer` and `createScopeClient` become the symmetric pair — one hosts in a scope, the other connects to a host in another scope — which is one concept under one term.

### 3c. Build the WebMCP bridge, feature-detected, in `mcp/src/browser`

```ts
export interface ModelContextInterface {
	readonly emitter: EmitterInterface<ModelContextEventMap>
	/** Reports whether this document exposes the model-context registry. */
	readonly supported: boolean
	/** Registers every tool in the manager with the document's registry. */
	publish(tools: ToolManagerInterface): void
	/** Reads the document's registry, including any permitted foreign origins, as tools. */
	adopt(options?: ModelContextAdoptOptions): Promise<readonly ToolInterface[]>
	/** Unregisters everything this handle registered. */
	stop(): void
}

export function createModelContext(scope?: Document): ModelContextInterface
```

`supported` is derived on read from the presence of `modelContext` on the document, never stored. `publish` registers through `document.modelContext.registerTool(tool, { signal })` and retains the controller whose `abort()` is WebMCP's unregistration path (`G5c-webmcp-idl.md` § 2). `adopt` calls `getTools({ fromOrigins })` and wraps each `RegisteredTool` as a `@orkestrel/tool` `Tool` whose `execute` calls `executeTool`, passing `context.signal` into `ModelContextExecuteToolOptions`. `ModelContextEventMap` carries `change`, sourced from the registry's `toolchange` event.

**Placement.** The bridge belongs to mcp, not tool and not a new package. WebMCP's own framing is "web pages as client-side implementations of the Model Context Protocol" (`G5-webmcp-distillate.md` § 6). mcp already holds `src/browser`, a working Playwright project, `createScopeServer`, and the descriptor-to-`Tool` conversion the bridge repeats (`mcp/src/core/MCPClient.ts:774-789`). Tool must stay the tiny host-independent leaf at layer one.

**The bridge is also how the design tests itself.** If `ToolInterface` cannot express annotations, our tools cannot be handed safely to a foreign agent — and we learn that now, from building the projection, rather than after shipping.

**The honest limit.** The chromestatus record reads `"origintrial": false`, `"flag": false`, status `Proposed`, updated 2026-08-12 (`G5c-webmcp-idl.md` § 7). No browser we can drive exposes the global. The bridge is therefore proven against a fixture double built from G5c's verbatim IDL, which `tests.md` sanctions as a protocol-faithful stub, and mcp's existing `## Declared conformance gaps` section gains a row saying exactly that, with the chromestatus reading and its date. A double cannot claim the integration; the row says so.

### 3d. Server-to-client requests — excluded on evidence

Sampling, elicitation, and roots travel as `tools/call` `input_required` rather than as server-to-client JSON-RPC requests (`mcp/src/core/MCPClient.ts:724`; `G2-mcp-distillate.md` § 4). Leave it. No campaign outcome depends on it, adding an inbound-request dispatcher to `MCPClient` is a change with its own adversarial round, and the guide already declares the gap. Verify the declared row states it in the terms the code actually behaves in, and close the row as intentionally excluded.

Name the deferred upside so the successor round can pick it up: an in-page MCP server that can ask the page's own agent to run an inference is the one thing WebMCP cannot do at all, and in-page sampling is where it lives.

### 3e. `ping` and `logging` — excluded

`ping` on a `MessagePort` pair answers a liveness question `close` already answers, and it exists for a peer that needs it through `createMCPLegacy` (`mcp/src/core/MCPLegacy.ts:151`). `logging/*` is a server-to-client notification family the client design does not consume. Neither is advertised in `buildDiscoverResult`, so no peer is misled. Both close as excluded rows citing the composition that covers the need.

## 4. Agent over MCP

`P2-c3-probe.md` proves `tools.add(await client.tools())` already works on the published packages, with `fetchCalls: 0` and a missing tool surfacing as `ToolFailure`. Four rulings on what is left:

- **Refresh on `notifications/tools/list_changed`** — the client mechanism already exists as `client.listen({ toolsListChanged: true }, { signal })` (`mcp/src/core/types.ts:1618-1624`). The server side cannot produce the notification honestly, because `ToolManagerInterface` has no emitter and a server cannot observe `add`, `remove`, or `clear`. **Give `ToolManager` an emitter.** `patterns.md` § Stateful emitters says an entity with observable operations owns one by composition, and this registry has three and owns none. `ToolManagerEventMap` carries `add`, `remove`, and `clear`; `createToolManager(options?)` takes `on` and `error`. The change is additive and breaks nobody, and it is the highest value per byte in the whole design: a page whose tools change mid-run gets a real signal instead of a consumer remembering to fire one.
- **Forwarding `description` and `parameters`** — already done (`mcp/src/core/MCPClient.ts:774-789`); **retain**. Add `title` and `annotations` forwarding once tool carries them. Do not forward `summary`: MCP's descriptor has no such field, and `summary` is a local advertising choice about token budget, not a wire value.
- **Abort propagation** — `#execute` calls `this.call(name, args)` with no options, so nothing reaches `MCPCallOptions.signal` (`mcp/src/core/MCPClient.ts:796-802`; `mcp/src/core/types.ts:2696-2706`). With §1a landed this is one line: the wrapped `execute` passes `context.signal` into `call`. Without it, cancelling an in-page agent leaves an in-flight `tools/call` waiting on its own deadline, which is the leak with a visible UI.
- **Ownership** — mcp owns the wrapper; agent must not depend on mcp. **Agreed**, and for a reason beyond layering. Agent depends on `@orkestrel/tool` for the registry contract. MCP is one of several things that can fill that registry; WebMCP is another, and a plugin host is a third. The moment agent knows about MCP, every other fill mechanism becomes second-class. mcp owning the wrapper is what keeps `ToolManagerInterface` the single seam, and that is the property the whole campaign rests on.

## 5. Browser reading arm — sketch

**Shape.** Add nothing that re-wraps `@orkestrel/html`. `HTMLInterface` already carries `walk`, `find`, `filter`, `reduce`, `fold`, `stream`, `span`, `sanitize`, and `distill` (`html/src/core/types.ts:418-478`). A `BrowserReadingManager` re-exposing those methods would fail the wrapper test outright. Give `BrowserFrameInterface` two siblings beside `content()` and `article()`:

```ts
/** Parses the frame's current HTML and returns the handle over its tree. */
tree(): Promise<HTMLInterface>
/** Projects the frame's HTML to Markdown, optionally distilled and bounded. */
markdown(options?: BrowserMarkdownOptions): Promise<string>
```

`tree()` hands back `@orkestrel/html`'s own handle, so the querying vocabulary is the one a reader already knows. `markdown()` is `createHTML(html)`, optional `distill()`, `htmlToMarkdown`, `renderMarkdown`. `BrowserMarkdownOptions` carries `distill?: boolean` (the binary behavioral switch between reader-facing prose and the whole document) and `limit?: number` (a character cap, documented as characters — this package counts no tokens and adds no tokenizer).

`@orkestrel/markdown` becomes a runtime dependency of `@orkestrel/browser`, which the user authorized. browser already depends on html, and markdown sits above html, so the layer stays coherent.

**What phase one must settle first:**

- Whether `ToolContext.signal` exists. The reading arm's first real consumer is a tool an agent calls — "read this page" — and a page read that cannot be cancelled is the same leak in a more expensive place.
- Whether `ToolAnnotations` exists. A page read is `inert`; a page click is `consequential`. The browser arm's tools are the first real consumers of annotations, and phase one is where the vocabulary is fixed.
- Whether `createPageServer`'s shape is right. The browser arm's most likely delivery is an MCP server over a browser session, and phase two must reuse that shape rather than invent a second one.

## 6. WebMCP parity matrix

Each row ends implement, retain, or exclude. The matrix lands in `mcp/guides/mcp.md` under a new `## WebMCP parity` heading beside `## Declared conformance gaps`, where guide parity makes every backticked name self-checking.

| WebMCP surface | Ours | Verdict | Source |
| --- | --- | --- | --- |
| `registerTool(tool, { exposedTo, signal })` | `createModelContext(...).publish(tools)` | implement | `G5c` § 1 |
| `getTools({ fromOrigins })` | `createModelContext(...).adopt({ origins })` | implement | `G5c` § 1 |
| `executeTool(tool, input, { signal })` | `ToolManagerInterface.execute(call, context)` | implement | `G5c` § 1 |
| `toolchange` event | `ToolManagerEventMap` `add`/`remove`/`clear`, plus `ModelContextEventMap.change` | implement, exceeds — ours names which tool changed | `G5c` § 2 |
| `inputSchema` (JSON Schema) | `ToolDefinition.parameters`, derived from `ToolOptions.contract` | implement, exceeds — ours validates before execution | `G5c` § 1; `G5` § 8 |
| `ModelContextTool.title` | `ToolDefinition.title` | implement | `G5c` § 1 |
| `ToolAnnotations` hints | `ToolAnnotations { inert, untrusted, consequential }`, projected by the bridge | implement | `G5c` § 1, § 4 |
| Declarative form attributes | none | exclude — `index.bs` marks the section "entirely a TODO"; the submission path is a fetch-tool paraphrase; HTML markup is application policy | `G5c` § 3 |
| Consent and user activation | none; `ToolAnnotations.consequential` is the datum a consent layer reads | exclude — no source states the activation requirement, and consent belongs to the user agent | `G5` § 5 |
| Origin scoping (`Permissions-Policy: tools`, `allow="tools"`) | `createScopeServer`'s `accept` gate; `createScopeClient`'s required `origin` | implement the library half; the header is the application's | `G5c` § 5 |
| Result shape (`Promise<DOMString>` in IDL against `{ content: [...] }` in the sample) | `ToolResult` unchanged; the bridge projects to MCP's content blocks | exclude the contradiction, retain ours, record the primary source disagreeing with itself | `G5c` § 4 |
| Structured refusal | `ToolFailure` whose `error` names the reason | exclude — the spec's own issue #282 leaves it open; do not invent a shape | `G5` § 8 |
| Streaming and partial result on abort | `notifications/progress` plus `MCPCallOptions.progress` | retain, exceeds — WebMCP has none | `G5` § 8; `G2` § 3 |
| Resources, prompts, sampling, elicitation, tasks | published by `MCPServer` today | retain, exceeds — WebMCP has no counterpart | `G5` § 6; `G2` § 3 |
| Shipping status | feature detection through `supported`, never assumed | exclude as a dependency — `"origintrial": false`, `"flag": false`, `Proposed`, 2026-08-12 | `G5c` § 7 |

## 7. Versions and order

Regenerate the catalog with `scaffold catalog` before sequencing; `O1-orkestrel-report.md` already reports agent's and ollama's rows stale in the tree's copy.

Bumping on a runtime surface: `tool` (L1), `mcp` (L4), `agent` (L5), and — because `extractTools` builds `ToolCall` values and every toolbox tool takes the new second parameter — `ollama` (L6) and `toolbox` (L6). `probe` (L5) re-pins and re-runs its gates, and bumps only where its rebuilt `dist/` differs materially. `html`, `markdown`, and `guide` are untouched by phase one. `browser` (L3) is phase two.

Publish rounds, dependency-first:

1. `tool`
2. `mcp`, then `agent`
3. `probe`, `ollama`, `toolbox`
4. (phase two) `browser`, after `markdown` is confirmed unmoved

Re-pin obligations: tool reaches agent, mcp, ollama, probe, and toolbox; mcp reaches probe; agent reaches ollama and toolbox. Until tool publishes, its consumers work against a built, packed, **installed** tarball, never a link, with the replaced range recorded in the same step and the registry copy restored before any distribution proof or publish.

## Exit criterion — the capabilities whose closure ends the campaign

Each ends implemented, repaired, retained, or intentionally excluded on evidence.

- **E1 Tool cancellation.** `ToolContext` reaches every handler with a live `AbortSignal`; the agent's run abort and an MCP `tools/call` deadline both arrive there. — implement
- **E2 Tool argument contracts.** `ToolOptions.contract` derives `parameters` and validates arguments; a failure surfaces as a `ToolFailure` naming the wrong member. — implement
- **E3 Tool advertising vocabulary.** `title` and `ToolAnnotations` exist and project onto both foreign vocabularies. — implement
- **E4 Tool registry observability.** `ToolManager` owns an emitter; an MCP server can publish `toolsListChanged` from a real signal. — implement
- **E5 In-page tool execution.** A real Chromium page builds an `Agent` and a `Tool`, the model's call runs in the page, and `fetch` is not called. — implement
- **E6 In-page MCP pair.** `createPageServer` completes `initialize`, `tools/list`, and `tools/call` in one page with no network request. — implement
- **E7 Cross-document MCP.** `createScopeClient` hands a port to a named origin, and `createScopeServer`'s gate refuses a wrong one. — implement
- **E8 Agent over MCP in a page.** An agent's registry holds an MCP server's tools and calls them like local ones; a caller abort cancels the in-flight call. — implement
- **E9 Agent placement.** Node alone — retained on `src:core`. Page alone and relay across the two — implement.
- **E10 WebMCP bridge.** `createModelContext` publishes and adopts, feature-detected, proven against an IDL-faithful double, with the conformance gap recorded. — implement
- **E11 WebMCP parity matrix.** Every row in § 6 lands in mcp's guide with its verdict and source. — implement
- **E12 Protocol conformance gaps.** Server-to-client JSON-RPC requests, `ping`, and `logging/*` stay out, with each declared row verified against behaviour. — intentionally excluded on evidence
- **E13 Guides, parity, versions.** Every touched package's guide, parity suite, and version aligned; gates green in dependency order. — implement
- **E14 Browser reading arm.** Sketched in § 5 with its prerequisites named; built in the successor campaign the user's own ordering instruction sets. — intentionally excluded from phase one

# Alternatives

**Alternative A — leave `@orkestrel/tool` alone and solve cancellation in mcp and agent separately.**

mcp would keep routing cancellation through `MCPServerOptions.execution`, and agent would race its abort against a tool that cannot hear it. No cascade, no re-pin, phase one ships faster.

The design wins because this alternative makes cancellation a property of *who is calling the tool* rather than of the tool. A page tool called by the in-page agent would be cancellable; the same tool called through the in-page MCP server would not, unless the consumer wrote an `execution` handler; the same tool registered with `document.modelContext` would receive a signal from the browser and have nowhere to put it. Three call paths, three answers, one tool. The single-seam property that makes `ToolManagerInterface` worth having dissolves. And the alternative does not avoid the cascade — it defers it to the release where someone notices, and pays it then with a longer list of consumers.

**Alternative B — put the WebMCP bridge in a new `@orkestrel/webmcp` package.**

A dedicated package would isolate a specification marked `Proposed` with no flag and no origin trial, so churn in the spec would never force an mcp release, and the conformance gap would sit in its own guide rather than in mcp's.

The design wins because the bridge is not a package's worth of work — it is a registry adapter over a document global, and every part it needs already lives in `mcp/src/browser`: the `ToolInterface` projection, the scope vocabulary, the browser environment, and the Playwright project. A new package would re-declare tool and contract as dependencies, add a layer to the publish graph, and give the fleet a second place where "a page hosts tools" is explained. Isolation against spec churn is real but cheap to buy the other way: the bridge is one factory behind a derived `supported`, so a spec change touches one file and the gap row beside it.

# Constraints

*(Objective lane.)*

# Refusals

*(Objective lane.)*

# Measurements

*(Objective lane.)*

# Units

Serial order: U1 → (Orchestrator packs and installs tool) → U2 ∥ U3 → U4 ∥ U5 ∥ U6 → U7 → U8. Audit lanes follow each implementation unit.

**U0 — Tarball swap instrument.** Role `builder`, engine Sonnet. Checkout: `C:/Users/mikes/WebstormProjects/scaffold`. Owns: `tmp/units/swap-tool.sh`. Depends on: nothing. Acceptance: the script builds `tool`, packs it, and installs the tarball (never links it) into mcp, agent, ollama, probe, and toolbox; it records each replaced range to a file beside itself; it is re-runnable after tool's source moves; it performs no install itself when read — the Orchestrator runs it as a tracked command, because the permission floor bars every role from installing.

**U1 — Tool contract.** Role `sol`, engine GPT-6 Astra. Checkout: `C:/Users/mikes/WebstormProjects/tool`. Owns: `src/core/types.ts`, `src/core/errors.ts`, `src/core/tools/Tool.ts`, `src/core/tools/ToolManager.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/validators.ts`, `src/core/index.ts`, `tests/src/core/**`, `guides/tool.md`, `package.json`. Off-limits: `tests/setupPolicy.ts`, `tests/policy.test.ts`, `configs/policy.ts`, `configs/helpers.ts`, and every other file `scaffold repair` restores. Depends on: U0 (for the downstream install, not for its own work). Acceptance criteria, cheap-first:

1. `npm run lint:check` and `npm run check` green.
2. `ToolContext` is exported from the core barrel with `signal: AbortSignal` required and `caller?: unknown` optional; `ToolCall` declares no `caller`.
3. `ToolInterface.execute(args, context)` takes `context` as a required parameter; `ToolManagerInterface.execute` takes an optional trailing `ToolContext` on both overloads and mints a never-aborting signal when omitted.
4. `ToolOptions.contract?: ContractShape` exists; `Tool.parameters` derives from it through `compileSchema`; constructing with `contract` and `parameters` together throws `ToolError`.
5. Invalid arguments throw `ToolError` from `Tool.execute` and reach the caller as a `ToolFailure` whose `error` names the failing member.
6. `ToolDefinition` carries `title?` and `annotations?: ToolAnnotations { inert?, untrusted?, consequential? }`.
7. `ToolManager` owns an emitter over `add`, `remove`, and `clear`; `createToolManager(options?)` accepts `on` and `error`.
8. `npm run test:src:core` green, covering: a handler that observes `context.signal` aborting mid-execute; a batch where one handler throws and the siblings settle; a contract-validated tool refusing a wrong-typed argument; each emitter event; the construction refusal.
9. `npm run test:guides` green, with a runnable fence for every new export.
10. Observation, not criterion: the unit reports its own `npm test` reading; the Orchestrator takes the authoritative run after the unit exits.

**U2 — mcp browser face and WebMCP bridge.** Role `implementer`, engine Opus 5. Checkout: `C:/Users/mikes/WebstormProjects/mcp`. Owns: `src/browser/types.ts`, `src/browser/factories.ts`, `src/browser/constants.ts`, `src/browser/index.ts`, `src/core/MCPClient.ts`, `src/core/types.ts`, `tests/src/browser/**`, `tests/fixtures/modelContext.ts`, `guides/mcp.md`, `package.json`. Off-limits: the `scaffold repair` set; `src/server/**`. Depends on: U1 landed and installed as a tarball. Acceptance criteria:

1. `npm run lint:check` and `npm run check` green, including the scoped browser and core isolation checks.
2. `createPageServer(options): PageServerInterface` exported from the browser barrel, with `client` and `stop`.
3. `createScopeClient(options): MCPClientInterface` exported, with `origin` required and no wildcard path reachable.
4. `createModelContext(scope?): ModelContextInterface` exported, with `emitter`, `supported` (derived), `publish`, `adopt`, and `stop`.
5. `MCPClient`'s wrapped tool passes `context.signal` into `call` and forwards `title` and `annotations` from the descriptor.
6. `npm run test:src:browser` green in real Chromium, proving: `createPageServer` completing `initialize`, `tools/list`, and `tools/call` with zero `fetch` calls; `createScopeClient` against an iframe whose `createScopeServer` gate refuses a wrong origin and accepts the right one; `createModelContext` publishing to and adopting from the IDL-faithful double; an `AbortController` passed as `ToolContext.signal` cancelling an in-flight `tools/call`.
7. `tests/fixtures/modelContext.ts` implements the WebIDL in `G5c-webmcp-idl.md` § 1 member for member, and nothing beyond it.
8. `guides/mcp.md` carries `## WebMCP parity` with every row from § 6, each ending implement, retain, or exclude and citing its source; `## Declared conformance gaps` gains the `document.modelContext` row naming the chromestatus reading and its date.
9. `npm run test:guides` green.

**U3 — Agent context propagation and placement proofs.** Role `implementer`, engine Opus 5. Checkout: `C:/Users/mikes/WebstormProjects/agent`. Owns: `src/core/Agent.ts`, `src/core/types.ts`, `src/core/providers/RelayProvider.ts`, `src/core/helpers.ts`, `vite.config.ts`, `configs/browsers.ts`, `tests/setupBrowser.ts`, `tests/setup.css`, `tests/src/browser/**`, `tests/fixtures/relayServer.ts`, `guides/agent.md`, `package.json`. Off-limits: the `scaffold repair` set. Depends on: U1 landed and installed as a tarball; the Orchestrator's ruling on the Playwright devDependency question in Risks. Acceptance criteria:

1. `npm run lint:check` and `npm run check` green.
2. `Agent`'s tool-dispatch gate passes a `ToolContext` carrying the run's bound abort signal into `tools.execute`.
3. `RelayProvider`'s request body carries no `caller` special case, because `ToolCall` declares none.
4. `npm run test:config` green with a `src:browser` project that collects `tests/src/browser/**` on Playwright Chromium.
5. `npm run test:src:browser` green, proving in a real page: an `Agent` with an in-page provider and an in-page DOM-mutating `Tool` where the tool ran, the DOM changed, and `fetch` was called zero times; an `Agent` with `createRelayProvider` against a Node `createRelay` fixture on `127.0.0.1` and an ephemeral port, where the page tool executed in the page and each turn cost one relay request; an abort mid-tool-execute firing `context.signal` inside the handler and settling the run `partial: true`.
6. `guides/agent.md` names each placement and the project that proves it, and its relay section states which half runs where without claiming a proof that does not exist.
7. `npm run test:guides` green.

**U4 — ollama re-pin.** Role `builder`, engine Sonnet. Checkout: `C:/Users/mikes/WebstormProjects/ollama`. Owns: `src/core/helpers.ts`, `src/core/OllamaProvider.ts`, `tests/src/core/**`, `guides/ollama.md`, `package.json`. Depends on: U1 and U3 installed. Acceptance: `npm run lint:check` and `npm run check` green; `extractTools` builds `ToolCall` values with no `caller`; `npm run test:src:core` green; `npm run test:guides` green; the unit reports whether the rebuilt `dist/` differs materially from the published tarball.

**U5 — probe re-pin.** Role `builder`, engine Sonnet. Checkout: probe. Owns: its tool definitions, tests, guide, and `package.json`. Depends on: U1 and U2 installed. Acceptance: lint, check, and scoped tests green; every tool literal takes the new `execute` second parameter; the unit reports the `dist/` comparison.

**U6 — toolbox re-pin.** Role `builder`, engine Sonnet. Checkout: toolbox. Owns: its tool definitions, tests, guide, and `package.json`. Depends on: U1 and U3 installed. Acceptance: as U5, plus every toolbox tool declares `annotations` where its behaviour is inert or consequential.

**U7 — Mechanical conformance sweep.** Role `checker`, engine Sonnet, after the `grok` step of the tedious-work ladder. Checkout: read-only across all five. Owns: nothing. Depends on: U2 through U6. Acceptance: reports, with the pattern and the paths behind each result, that every backticked API in each touched guide resolves to a real export; that every parity row ends in implement, retain, or exclude; that no source, test, config, or script carries a suppression directive; and that each manifest's ranges match the regenerated catalog.

**U8 — Gate evidence.** Role `verifier`, engine Sonnet. Checkout: each of the five in dependency order. Owns: nothing. Depends on: U7. Acceptance: `format:check`, `lint:check`, `check`, `build`, `test` run bare in each checkout, in layer order, with the actual output recorded per package and no pipeline stage hiding a failing line.

**Audit lanes.** Each of U1, U2, and U3 receives an `analyst` lane on GPT-6 Astra and a `reviewer` lane on Opus 5, dispatched blind on one brief of numbered falsifiable claims, with at least one lane on an engine that did not write the unit. U1 is written on Astra, so its subjective `reviewer` lane on Opus 5 is the cross-engine one; U2 and U3 are written on Opus 5, so their `analyst` lanes on Astra are.

# Tensions

Named for the objective lane to challenge.

1. **Agent takes a `src:browser` Vitest project without a `src/browser` source environment.** I read the environment axis as one project per environment the package must be *proven in*; the table can be read as binding a project to a source directory it collects nothing from, and `check:src:browser` would have no source to compile. The fallback is named in § 2.
2. **`ToolContext.signal` is required and always minted.** The cost is one `AbortController` per call, including calls nobody will ever cancel. The optional alternative obeys "absence is `undefined`" more literally and makes every handler branch.
3. **`caller` moves from `ToolCall` to `ToolContext`.** This makes `ToolCall` pure JSON and deletes the relay's hand-written strip, but it changes `caller` from per-call to per-invocation and can cost `AuthorityContext` a member if any rule branches on it. I did not read every authority rule in the fleet.
4. **`inert` for WebMCP's `readOnlyHint`.** A read-only tool does something — it reads — so `inert` overstates. `safe` is an effort adjective and `readonly` is a keyword that reads badly as a property name. I chose the shortest assertion that carries no keyword collision.
5. **`ToolDefinition` grows to `name`, `title`, `description`, `summary`, `parameters`, and `annotations`.** Each earns its place, and the type whose job is "what is advertised" is now sizeable. `summary` is the member most exposed to the charge of overlap with `title`.
6. **`createPageServer` returns a composite handle carrying a connected `client`.** A factory named for a server that hands back a client is a shape this fleet has not used. Justified by the bind-order footgun it owns, and challengeable.
7. **`createScopeClient` reuses `scope` for a `Window` this package posts to.** The existing `ScopeInterface` names a host scope the package binds a server into; the client's target is a foreign scope it hands a port to. One word, two directions.
8. **Building `createModelContext` against a double.** No browser exposes the global, so the surface ships unproven against a live implementation. Waiting costs the campaign the discovery that tool's contract is adequate.
9. **Excluding server-to-client JSON-RPC requests** when in-page sampling is the clearest "exceed WebMCP" move available.
10. **`ToolManager` gaining an emitter.** The pattern rule demands it and it unlocks list-change notification, but it makes the fleet's smallest package observable and every consumer inherits an emitter most will not use.
11. **The WebMCP bridge in `mcp/src/browser` rather than its own package.** Argued in Alternatives; the counter-argument about specification churn is real.
12. **Not giving ollama a browser project.** The strongest possible evidence for the campaign's headline claim is a real model on `localhost:11434` calling a real page tool in a real page, and the host supports it. I left it out because `service` is one project and cannot be both Node and Chromium under the current rule.

# Risks

- **Playwright reaches agent's manifest.** A `src:browser` project needs `playwright` and `@vitest/browser-playwright` through `configs/browsers.ts`, and `AGENTS.md` forbids adding an npm package the user did not request. This is scaffold's browser-environment provisioning rather than a chosen dependency, but it is still packages arriving in agent. **Surface it to the user before U3 launches.** Evidence that settles the fallback instead: the package count each path adds — agent's own project adds the browser toolchain; mcp's existing project adds `@orkestrel/agent` as one devDependency and no toolchain.
- **The project shape may red `tests/config.test.ts` in agent.** That proof asserts the root configuration resolves its projects and outputs. Evidence: run `npm run test:config` in agent immediately after the project is declared and before any test file is written.
- **The required second parameter breaks five checkouts at once.** Evidence: typecheck each consumer against the staged tool tarball *before* U2 and U3 are briefed, so each brief names the real file set rather than a guessed one. The brief-checking rule calls for scoping by the files the result makes false, and only that typecheck produces the list.
- **`compileSchema`'s emitted dialect may not be what a model provider accepts.** Ollama forwards `parameters` straight onto the wire (`ollama/src/core/OllamaProvider.ts:79-90`). Evidence: one live daemon turn with a contract-derived `parameters` beside the same tool with a hand-written schema, comparing whether the model produces the same call.
- **The IDL-faithful double can pass where a real `document.modelContext` refuses.** No evidence is obtainable today; the chromestatus JSON reads `Proposed`, no flag, no origin trial. Accepted and documented rather than closed, with the guide row carrying the date so a later reader knows when to re-check.
- **The parity matrix rests on a primary source that disagrees with itself.** `executeTool` is typed `Promise<DOMString>` in the IDL while the sample returns a structured object, and G5c flags the contradiction rather than resolving it. Evidence that would settle it: the wpt.fyi suite the specification links, read against the IDL. Until then the row records the disagreement instead of picking a side.
- **A guide sentence can outlive the code it describes.** The relay prose in `agent/guides/agent.md` already claims a browser placement no test proves. Evidence: `tests/guides.test.ts` executes flagship fences, so every placement claim this campaign adds must sit under an executed fence rather than in bare prose.

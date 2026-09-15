OBJECTIVE lane

## Design

## Alternatives

## Constraints

Paths below are relative to `C:/Users/mikes/WebstormProjects/`. Evidence files are under `scaffold/.orkestrel/campaign/`.

### 1. Tool contract

**Add cancellation through execution options and a handler context. Keep `ToolCall` unchanged.**

The proposed signatures are:

```ts
interface ToolExecutionOptions {
	readonly signal?: AbortSignal
}

interface ToolExecutionContext {
	readonly caller?: unknown
	readonly signal?: AbortSignal
}
```

- `ToolInterface.execute(args, context?: ToolExecutionContext)` retains its value-or-promise return.
- `ToolOptions.execute` takes the same arguments.
- `ToolManagerInterface.execute(call, options?: ToolExecutionOptions)` and its batch overload retain their correlated `ToolResult` returns.
- The manager constructs the context from `call.caller` and `options.signal`. It omits the context argument when neither exists.
- An already-aborted signal prevents handler entry. Cancellation during execution reaches the handler cooperatively.
- Signals remain outside model output, conversation storage, tool definitions, and relay serialization.

This replaces the opaque second handler argument; consumers accessing that argument migrate to `context?.caller`. It is a deliberate contract change, with no compatibility overload. The existing contracts separate calls, handlers, and correlated results, making this the narrow execution boundary. Evidence: `tool/src/core/types.ts:27`, `:85`, `:114`, `:187`; `agent/src/core/Agent.ts:542`, `:669`; `scaffold/AGENTS.md`, **Design laws**.

**Retain `parameters?: Readonly<Record<string, unknown>>`. Do not make it a union with `ContractShape`.**

An authored tool can already compile a shape with `createContract`, advertise `schemaToParameters(contract.schema)`, and use `contract.is(args)` before its business operation. The installed package expressly supplies that schema projection. Its inverse, `schemaToShape`, widens unsupported schemas and ignores `pattern`; it cannot establish strict validation of arbitrary MCP schemas. Evidence: `tool/node_modules/@orkestrel/contract/dist/src/core/index.d.ts:1375`, `:5805`, `:5834`; `tool/guides/tool.md:173`.

**Keep failure behavior distinct by entry point.** There is no automatic schema-validation failure in `Tool` under this proposal. An authored handler that rejects invalid arguments throws a coded application error before its operation. Direct `tool.execute` propagates that error; `ToolManager.execute` contains it as `ToolFailure`. Do not return a correlated `ToolFailure` from the handler: the handler lacks the call ID, and the manager would otherwise wrap that object as a successful value. Evidence: `tool/src/core/types.ts:56`, `:93`; `tool/src/core/tools/ToolManager.ts:98`; `scaffold/.claude/rules/typescript.md`, **Errors and outcomes**.

**The cancellation change earns the cascade; mandatory shape adoption does not.** Cancellation closes a demonstrated break between agent cancellation, MCP request cancellation, and actual tool work. Update agent, mcp, ollama, probe, and toolbox consumers, including structural implementations whose old `caller?: unknown` parameter might still compile while behaving incorrectly. Evidence: `G1-tool-agent-distillate.md:48`; `mcp/src/core/types.ts:2143`; `O1-orkestrel-report.md:35`.

### 2. Agent placement proofs

**Keep agent core-only. Put the Chromium artifact proof in mcp’s `distribution` project.**

That project already has access to declared Playwright tooling. Its isolated consumer installs the campaign’s packed agent, tool, and mcp artifacts, then runs their public exports inside Chromium. This adds no permanent agent dependency to mcp and no Playwright dependency to agent. The fixture dependencies are the packages under examination.

The proof must load the agent’s emitted runtime closure, without Node polyfills or tree-shaking away unexercised root imports. It must construct `Agent`, `Tool`, and the provider boundary inside the page. A scripted `ProviderInterface` is permitted to supply model outputs; it proves runtime placement and tool dispatch, not local model inference. Evidence: `agent/src/core/types.ts:140`; `mcp/package.json:116`; `P1-closure-probe.md:31`; `scaffold/.claude/rules/tests.md`, **Test contract**, **Cross-cutting proofs**, **Expensive proofs**.

Rule on the alternatives as follows:

- **Playwright over the core suite:** reject changing `src:core` to a browser project or adding a fictitious `src:browser` project. The workspace matrix fixes `src:core` to Node.
- **Packed-artifact Chromium proof:** keep, hosted by mcp’s existing browser-capable toolchain.
- **Higher-package proof:** keep that composition in mcp; retain agent-owned Node regressions.
- **Agent `src/browser`:** reject. This scope identifies no agent-owned browser mechanism. WebMCP adaptation belongs to mcp.

Evidence: `scaffold/.claude/rules/workspace.md`, **Environments**, **Test project matrix**; `scaffold/AGENTS.md:71`.

**Prove Node independence separately.** Agent’s Node suite runs the full loop with a local tool and a scripted provider, without a DOM or network. The artifact fixture repeats that scenario through installed public exports. Existing Ollama service tests provide the real-model Node receipt; they do not mean inference happens inside the Node agent process. Evidence: `G4-ollama-relay-distillate.md:53`, `:84`.

**Prove the relay with an actual page agent.** A separate `service` proof places `Agent`, `RelayProvider`, authority, and the tool in Chromium; `createRelay` and `OllamaProvider` run in Node. Record the page mutation and the subsequent model request carrying its result. Model traffic crosses the relay; tool execution adds no server invocation. Include authentication refusal and cancellation. G4’s existing relay tests omit the agent and therefore cannot close this claim. Evidence: `G4-ollama-relay-distillate.md:42`; `agent/guides/agent.md:1095`.

### 3. In-page MCP server

**Retain the native MessageChannel pair.** Bind each transport synchronously after construction. No loopback transport, page-server subclass, or replacement registry is needed. The server already consumes a live `ToolManagerInterface`. Its transport members remain `send`, `listen`, `closed`, and `close`. Evidence: `mcp/src/core/types.ts:2130`, `:2392`; `mcp/src/browser/transports/MessagePortTransport.ts:18`; `G2-mcp-distillate.md:149`.

**Exclude a `window.postMessage` transport from phase one.** Same-page hosting does not require it. Iframe and extension integration would introduce separate sender verification, origin, navigation, and lifecycle requirements. Do not present `createScopeServer` as that transport: its `accept` gate covers port-bearing events, while portless strings take a different path. Evidence: `mcp/src/browser/factories.ts:253`; `mcp/guides/mcp.md:4189`; `scaffold/AGENTS.md:71`.

**Implement a feature-detected WebMCP export bridge in `mcp/src/browser`.**

The proposed package surface is:

- `createWebMCP(options): WebMCPInterface | undefined`
- `WebMCPOptions`: `client`, optional `context`, `origins`, and `annotations`
- `WebMCPInterface`: `refresh(): Promise<void>` and `destroy(): void`

`client` is an already-connected MCP client. For the in-page example it uses the MessageChannel pair. `context` optionally supplies the external registration boundary; otherwise the factory detects `document.modelContext`. Absence returns `undefined` without altering the document.

`refresh` obtains `client.tools()` and registers callbacks through **`document.modelContext.registerTool`**. The callbacks invoke those wrapped tools, preserving the MCP server’s execution boundary. They forward the WebMCP execution signal into the tool context. `origins` maps to registration `exposedTo`; bridge-owned abort controllers own unregistration. Registration lifetime and execution cancellation remain separate.

Require a usable description rather than inventing one. Reject unsupported registration input explicitly. Refresh and destruction must serialize their work, prevent late registration after destruction, remove obsolete owned registrations, and clean up partial registration failures without touching registrations owned elsewhere. The bridge borrows the client and does not disconnect it.

The external names come from `G5c-webmcp-idl.md:9` and the [WebMCP specification](https://raw.githubusercontent.com/webmachinelearning/webmcp/main/index.bs). Package-owned members remain one word; mirrored external fields retain their specified spelling under `scaffold/.claude/rules/names.md`, **General vocabulary**.

**Retain the existing input-required mechanism. Exclude independent server-to-client requests.** The actual guide places server-initiated elicitation under **Declared non-goals**, explaining the dated modern protocol choice. Record legacy sampling, elicitation, and roots interoperability limits by revision; do not describe modern `input_required` as equivalent to independent JSON-RPC requests. Evidence: `mcp/guides/mcp.md:1342`, `:4334`, `:4336`; `mcp/src/core/types.ts:2726`.

**Exclude modern `ping` and logging additions.** Retain legacy `ping` through `createMCPLegacy`. Local emitter events remain observability, not protocol logging. Evidence: `mcp/guides/mcp.md:4334`, `:4341`, `:4358`.

### 4. Agent over MCP

**Mcp owns the wrapper; agent must not depend on mcp.** The wrapper translates a protocol call into `ToolInterface` execution. Agent already accepts that interface through its tool manager. Evidence: `mcp/src/core/MCPClient.ts:393`, `:774`; `agent/src/core/types.ts:735`.

**Keep tool-list refresh explicit.** `client.tools()` returns a snapshot. The application receives `notifications/tools/list_changed` through the existing notification event, or through the modern subscription it explicitly opens, and fetches another snapshot. Document and execute an example that applies the replacement between agent runs.

For a manager mixing local and MCP tools, reconcile only the previously installed MCP instances; preserve unrelated local tools and reject name collisions explicitly. A failed refresh retains the last installed snapshot and reports the failure. No background polling, automatic agent dependency, or generic synchronization manager is added. Evidence: `mcp/src/core/types.ts:2607`; `mcp/src/core/MCPClient.ts:393`; `mcp/guides/mcp.md:1059`; `scaffold/AGENTS.md:73`.

**Retain the existing metadata projection and state its information loss.**

- Wire `description` becomes wrapped `description`.
- Wire `inputSchema` becomes wrapped `parameters`.
- Wrapped `summary` stays absent: the published descriptor has no separate summary.
- The server projects `manager.definitions()`, which already substitutes an authored summary for the full description. The wrapper cannot reconstruct the original full description.

Do not invent a private metadata extension merely to claim lossless forwarding. Evidence: `mcp/src/core/types.ts:1217`; `mcp/src/core/helpers.ts:769`; `mcp/src/core/MCPClient.ts:774`; `tool/src/core/types.ts:173`.

**Repair cancellation across the complete path:**

`Agent` run signal → manager execution options → wrapped tool context → `MCPClient.call(..., { signal })` → MCP cancellation → server request signal → server manager execution options → page handler context.

Agent must pass the signal through the authority and no-authority branches. Mcp must update its default server execution path, not only the client wrapper. Custom `MCPExecutionHandler` implementations receive the signal already and must forward it when delegating. Evidence: `agent/src/core/Agent.ts:673`, `:704`; `mcp/src/core/MCPClient.ts:796`; `mcp/src/core/MCPServer.ts:940`; `mcp/src/core/types.ts:2696`.

Retain the wrapper’s refusal of task and input-required outcomes that lack an inline value. Do not report those outcomes as successful `undefined` values or silently implement task polling and consent handling. Evidence: `mcp/src/core/MCPClient.ts:791`.

### 5. Browser reading arm — sketch only

Consider a `page.reading` manager with:

- `capture()` to retain an `HTMLInterface` from a bounded page capture;
- readonly `document` for the retained handle;
- separate `text()` and `markdown()` projections;
- `clear()` to release the retained capture;
- grouped bounds such as `limit: { bytes, nodes, depth, tokens }`, with a caller-supplied `measure` function when a token ceiling is requested.

Markdown projection composes `htmlToMarkdown(handle.document)` and `renderMarkdown`. Filtering uses html’s existing immutable transformations. A token limit must name its measurement function; character length is not a token count.

This is a proposed ownership shape, not an approved API design. Navigation invalidation, frame ownership, capture consistency, truncation reporting, and whether `article()` shares its implementation remain phase-two decisions. Keep `BrowserSnapshot` separate: its CDP nodes are not HTML nodes. Evidence: `browser/src/core/types.ts:391`, `:1783`; `browser/src/core/BrowserFrame.ts:113`; `browser/guides/browser.md:1876`; `scaffold/guides/html.md:170`, `:238`; `scaffold/guides/markdown.md:512`.

Phase one must settle execution context, cancellation, error boundaries, tool metadata, and the placement proofs first. Browser implementation and its real-Chromium reading test belong to the successor phase. The authorized markdown dependency is used there, not added for this sketch. Evidence: `goal.md:24`; `scaffold/tmp/codex/D1b-design-brief.md`, **Objective**, **The user’s instruction**.

### 6. WebMCP parity

The matrix fixes the dispositions for phase one.

| Surface | Published packages | Phase-one ruling | Disposition and source |
|---|---|---|---|
| Imperative registration | Tool managers and in-page MCP exist; no WebMCP registration bridge | Export the connected client’s tools through feature-detected `document.modelContext.registerTool`; retain `getTools`, `executeTool`, and `toolchange` as external names | **Implement** — `G5c-webmcp-idl.md:9`; [specification](https://raw.githubusercontent.com/webmachinelearning/webmcp/main/index.bs) |
| Declarative forms | No form-to-tool integration | Do not implement `toolname`, `tooldescription`, `toolautosubmit`, `toolparamdescription`, form submission interception, or navigation-result handling | **Exclude** — `G5c-webmcp-idl.md:131`; the [declarative explainer](https://raw.githubusercontent.com/webmachinelearning/webmcp/main/declarative-api-explainer.md) leaves schema synthesis and response handling unsettled |
| Tool annotations | Generic tools and MCP descriptors lack these hints | Accept per-tool bridge annotations using the exact mirrored fields `readOnlyHint`, `untrustedContentHint`, and `consequentialHint`; make no authorization decision from them | **Implement** — `tool/src/core/types.ts:9`; `mcp/src/core/types.ts:1217`; `G5c-webmcp-idl.md:32` |
| Consent | Agent authority gates agent calls; MCP execution can host application policy | Keep consent with the application. Shared protection must live in the tool or server execution boundary, because a browser caller does not pass through agent authority | **Retain** — `agent/src/core/Agent.ts:684`; `mcp/src/core/types.ts:2155`; `G5-webmcp-distillate.md:40` |
| Origin scoping | A private MessagePort is the selected same-page channel; no Window transport | Preserve browser enforcement, use registration `exposedTo` only when explicitly configured, and add no cross-origin default or extension privilege claim | **Implement** — `G5c-webmcp-idl.md:44`, `:164`; [specification](https://raw.githubusercontent.com/webmachinelearning/webmcp/main/index.bs) |
| Result shapes | Direct values, correlated `ToolResult`, MCP complete/task/input-required outcomes | Retain each boundary’s result semantics. The bridge returns the wrapped value or rejects; it does not normalize `executeTool`’s result or invent a refusal protocol | **Retain** — `tool/src/core/types.ts:45`; `mcp/src/core/types.ts:2726`; the [WebMCP README](https://raw.githubusercontent.com/webmachinelearning/webmcp/main/README.md) and `G5c-webmcp-idl.md:157` |

Parity is scoped, not blanket WebMCP conformance. Resources, prompts, completion, subscriptions, and tasks remain MCP capabilities with their existing ports and limits. The bridge exports tools; it does not expose every MCP capability through WebMCP. Evidence: `mcp/src/core/types.ts:2134`; `G2-mcp-distillate.md:44`.

### 7. Versions and order

**Runtime changes require tool, mcp, and agent releases. Their runtime consumers re-pin and release in dependency order.**

Use the following release waves, refreshing the live catalog before execution:

| Wave | Packages | Obligation |
|---|---|---|
| Tool | tool | Publish the execution-context contract |
| MCP | mcp | Adopt tool; publish cancellation and browser bridge |
| Agent and probe | agent; probe | Agent adopts tool. Probe adopts tool and mcp |
| Provider and concrete tools | ollama; toolbox | Adopt tool and agent; update affected handlers and declarations |
| Browser successor | browser | Add markdown and implement the separately designed reading capability |

Toolbox moves directly from its stale `^0.0.21` agent range to the campaign release. Its owner performs that work outside this campaign’s write scope. Do not insert an intermediate re-pin to agent 0.0.22.

Html and markdown do not bump for this design. Browser does not bump for a sketch. Guide does not cascade without a markdown runtime release. Test-only changes create no additional release obligation unless rebuilt published artifacts materially differ. Exact target version numbers remain release-time facts. Evidence: `O1-orkestrel-report.md:18`, `:35`; `scaffold/tmp/codex/D1b-design-brief.md`, **Standing conditions**; `scaffold/.agents/orchestration.md`, **What a bump obliges**.

## Refusals

These options conflict with the governing rules.

- **No signal on the model’s `ToolCall`.** Keep host execution state outside the serialized call boundary. The rule requires “one concept, one term”; execution context is distinct from a model-selected call. Evidence: `scaffold/AGENTS.md`, **Design laws**; `agent/guides/agent.md:443`.
- **No compatibility form accepting either an opaque caller or an execution context.** “No compatibility shims. This is greenfield. Update every consumer in the same change.” Evidence: `scaffold/AGENTS.md:72`.
- **No additional npm dependency beyond the expressly authorized browser→markdown edge.** “NEVER add an npm package unless the user explicitly requests it.” Reuse existing test tooling and install the campaign artifacts only as isolated test subjects. Evidence: `scaffold/AGENTS.md:43`; brief, **The user’s instruction**.
- **No agent browser environment created to obtain a test slot.** “Use only the environments the project needs.” Evidence: `scaffold/.claude/rules/workspace.md`, **Environments**, **Test project matrix**.
- **No replacement HTML parser, Markdown renderer, or CDP snapshot model.** “ALWAYS inspect the exact declared and installed `@orkestrel/*` capabilities before implementing overlapping logic.” Evidence: `scaffold/AGENTS.md:51`; `browser/guides/browser.md:1876`.
- **No local provider stub presented as local LLM inference, and no boundary stub presented as native WebMCP compatibility.** A scripted boundary “never stands in for the integration being claimed.” Evidence: `scaffold/.claude/rules/tests.md`, **Test contract**.
- **No promise that abort terminates arbitrary JavaScript or undoes side effects.** `MCPCallOptions.signal` expressly defines advisory cancellation. Evidence: `mcp/src/core/types.ts:2678`.

## Measurements

The supplied measurements bound this proposal; this lane did not run behavioral tests.

| Measurement | Supplied instrument or command | Reading and limit |
|---|---|---|
| Published versions | Orchestrator’s `npm view` readings, 2026-09-15; complete command transcript not supplied | tool 0.0.14; mcp 0.0.30; agent 0.0.22; ollama 0.0.16; browser 0.0.16; html 0.0.9; markdown 0.0.14 |
| Repository state | Orchestrator measurement; exact git commands not supplied | Checkouts clean on `main`, even with origin; campaign evidence directory intentionally untracked |
| Agent closure | `scratchpad/probe-closure.sh`; script retained at `P1-closure-probe.md:39` | Matched Node imports and process reads were zero in the inspected root entries. Positive controls included lsp, scaffold, and database/server. This was not browser evaluation |
| Agent over MCP | `scratchpad/probe-c3/probe.mjs`; source retained in `P2-c3-probe.mjs.txt`; launch command not supplied | Node 24.20.0; `fetchCalls: 0`; `executedInServer: 1`; result value 5; missing tool produced `tool not found: missing`. No Chromium proof |
| Toolbox pin | `grep -n '"@orkestrel/agent"' toolbox/package.json ollama/package.json`, supplied by the Orchestrator | Toolbox `^0.0.21`; ollama `^0.0.22`. Standing fleet obligation, not a design stop |
| WebMCP record | G5c’s fetch of the Chrome Status API | `Proposed`, `flag: false`, `origintrial: false`, record updated 2026-08-12. Installed-host availability remains unknown |

The primary-source read in this lane confirmed the `Document` extension and registration names. It also explicitly distinguishes in-page discovery from the browser agent’s internal discovery mechanism; that narrows G5’s caller uncertainty without identifying a deployed product. See the [WebMCP specification](https://raw.githubusercontent.com/webmachinelearning/webmcp/main/index.bs).

### Campaign exit criterion

The phase-one campaign closes when these capabilities have their named receipts:

1. **C1 — Page-local tool execution.** Installed agent and tool artifacts execute inside Chromium. A page-defined handler changes page state, its result reaches the follow-up provider turn, and the measured operation makes no network request.
2. **C2 — Page-local MCP.** Real page server/client pairs complete modern discovery, listing, and calling over MessageChannel. A separate legacy-adapter case completes `initialize`. Failure, cancellation, and cleanup are asserted with no operation-phase network traffic.
3. **C3 — Agent over MCP.** The page agent calls wrapped MCP tools; metadata projection, explicit refresh, remote failure, and cancellation through the server’s default execution path are proven.
4. **C4 — Placement.** Page-only runtime, Node-only runtime, and a real page-to-Node model relay each have an executed receipt. Scripted-provider and real-model evidence are labeled separately.
5. **C5 — WebMCP boundary.** The parity matrix is recorded; bridge translation and lifecycle tests pass; feature detection runs in real Chromium. Native registration/execution is proven when available. An unavailable host is explicitly recorded as excluding a native-compatibility claim, never reported as a successful native integration.
6. **C6 — Reading-arm handoff.** The bounded sketch, ownership, dependency authorization, and unresolved phase-two questions are delivered. HTML retention and its Chromium test remain the successor phase’s implementation criterion.
7. **C7 — Release readiness.** Types, implementations, guides, parity, artifacts, and required consumer ranges agree. Independent audits and the prescribed gates pass in dependency order.

This refines the candidate C1 project label and separates the candidate C6 implementation from the brief’s expressly requested sketch. Evidence: `goal.md:27`; brief, **Objective**, **What this round decides**.

## Units

All checkout paths use the workspace root stated under Constraints. Units writing the same checkout run serially. Every implementation unit applies the hardening skill within its named scope.

1. **Tool execution context — `sol`, GPT-6 Astra.**  
   **Checkout:** `tool`.  
   **Owned files:** `src/core/types.ts`, `src/core/tools/Tool.ts`, `ToolManager.ts`, affected factories, mirrored tool/factory tests, `tests/setup.ts`, `guides/tool.md`, and `tests/guides.test.ts`.  
   **Dependencies:** accepted design.  
   **Acceptance:** context and options match question 1; caller identity survives; absent context stays omitted; pre-abort prevents entry; cooperative abort reaches the handler; batch ordering and failure isolation remain intact. Direct validation throws and managed validation failures are demonstrated using the installed contract primitives.

2. **Agent cancellation — `sol`, GPT-6 Astra.**  
   **Checkout:** `agent`.  
   **Owned files:** `src/core/Agent.ts`, relevant contract remarks in `src/core/types.ts`, `tests/src/core/Agent.test.ts`, `tests/src/core/integration.test.ts`, relevant setup, `guides/agent.md`, and guide parity tests.  
   **Dependencies:** unit 1 artifact.  
   **Acceptance:** authority and no-authority paths forward the run signal; denied tools remain unentered; timeout/external/run cancellation reaches a cooperating tool; the agent settles partial without another provider turn. Node-local execution remains proven. No mcp or host-specific runtime import is added.

3. **MCP wrapper and default execution — `sol`, GPT-6 Astra.**  
   **Checkout:** `mcp`.  
   **Owned files:** `src/core/MCPClient.ts`, `MCPServer.ts`, affected remarks in `types.ts`, mirrored client/server tests, relevant setup, `guides/mcp.md`, and guide parity tests.  
   **Dependencies:** unit 1 artifact.  
   **Acceptance:** the wrapper forwards its signal into `call`; default server execution forwards the request signal into the tool manager; abort leaves the connection usable; failed/deferred calls retain their documented outcomes. Metadata tests prove the actual summary loss. An executed refresh example handles addition, replacement, removal, collisions, and refresh failure without deleting unrelated tools.

4. **WebMCP bridge — `implementer`, Opus 5.**  
   **Checkout:** `mcp`.  
   **Owned files:** `src/browser/WebMCP.ts`, browser `types.ts`, `factories.ts`, `validators.ts`, `index.ts`, supporting centralized files only where needed, mirrored browser tests, browser setup, `guides/mcp.md`, and guide parity tests.  
   **Dependencies:** unit 3.  
   **Acceptance:** exact G5c names; absent capability returns `undefined`; callbacks reach the actual MCP execution path; execution signals propagate; registration cancellation is separate; duplicate names, missing descriptions, partial failure, refresh/destruction races, and borrowed-client ownership are tested. No polyfill or Window transport is introduced.

5. **Chromium artifact proofs — `sol`, GPT-6 Astra.**  
   **Checkout:** `mcp`.  
   **Owned files:** `tests/distribution.test.ts`, `tests/setupDistribution.ts`, its setup proof where needed, authored fixture assets, `vite.config.ts`, and the distribution script entry.  
   **Dependencies:** units 1–4 artifacts staged by the Orchestrator.  
   **Acceptance:** C1–C3 run through installed public exports in real Chromium; the full agent root closure evaluates; the Node artifact case runs without browser globals. Network recording starts after fixture/module loading and measures the entire operation. A deliberate attempted request proves the recorder can detect traffic. Missing tools, cancellation, metadata, and cleanup have independent assertions.

6. **Real relay placement — `sol`, GPT-6 Astra.**  
   **Checkout:** `mcp`.  
   **Owned files:** `tests/service/placement.test.ts`, `tests/setupService.ts`, related authored fixture/setup assets, `vite.config.ts`, and service script entries.  
   **Dependencies:** unit 5; staged ollama artifact adopting the campaign tool and agent versions.  
   **Acceptance:** actual Chromium agent and page tool, Node relay/provider, and real Ollama complete the loop. The next model request contains the page-generated datum. Wrong authorization never enters the upstream provider. Cancellation and teardown release the page, stream, and server. Readiness failure fails loudly. Service proofs run from the publishing gate.

7. **Ollama adoption — `builder`, Sonnet.**  
   **Checkout:** `ollama`.  
   **Owned files:** manifest/lockfile ranges under Orchestrator-controlled installation, affected handler call sites and tests, and canonical guide references; mirrors refreshed through scaffold.  
   **Dependencies:** units 1 and 2.  
   **Acceptance:** tool and agent resolve to the intended releases/artifacts; affected callers use the execution context; existing live Node tool-loop and relay suites pass. No provider redesign or additional dependency is introduced.

8. **Probe adoption — `builder`, Sonnet.**  
   **Checkout:** `probe`.  
   **Owned files:** manifest/lockfile ranges under Orchestrator-controlled installation, affected tool implementations/callers, associated tests, and guide references.  
   **Dependencies:** units 1 and 3.  
   **Acceptance:** tool and mcp versions agree with the campaign; affected caller semantics are migrated; package gates and executable-tool behavior pass.

9. **Toolbox owner handoff — `builder`, Sonnet, dispatched by the toolbox owner.**  
   **Checkout:** `toolbox`.  
   **Owned files:** owner-authorized manifest/lockfile, affected tool handlers/callers, associated tests, and guide references.  
   **Dependencies:** units 1 and 2; external owner’s write dispatch.  
   **Acceptance:** direct re-pin from the stale agent range to the campaign release; every second-argument caller use is examined; affected tools preserve caller semantics and adopt cancellation where their operation supports it; owner supplies gate and release receipts. This lane authorizes no toolbox writes.

10. **Design-fit audit — `reviewer`, Opus 5.**  
    **Checkouts:** `tool`, `agent`, `mcp`, and affected consumers.  
    **Owned files:** none; report-only.  
    **Dependencies:** implementation and proof units.  
    **Acceptance:** challenge API naming, dependency direction, refresh ownership, bridge lifecycle, consent placement, truthful parity wording, and the phase-two boundary. Return concrete findings tied to the exit capabilities.

11. **Correctness audit — `analyst`, GPT-6 Astra.**  
    **Checkouts:** the same changed checkouts, with executable staged artifacts.  
    **Owned files:** none; report-only.  
    **Dependencies:** implementation and proof units; blind to unit 10’s findings.  
    **Acceptance:** attempt to break cancellation, authority bypass, registration races, stale refresh, metadata claims, network measurement, and artifact resolution. Separate executed findings from source review. Fixes written by Astra receive cross-engine review.

12. **Mechanical check — `checker`, Sonnet.**  
    **Checkouts:** every changed checkout.  
    **Owned files:** none; report-only.  
    **Dependencies:** resolved implementation/audit findings.  
    **Acceptance:** public exports and guide parity agree; tests are discovered by the intended projects and reachable gates; no in-scope skip/TODO substitutes for proof; no forbidden dependency, compatibility branch, misplaced declaration, or vendored-file edit remains.

13. **Final gates and release evidence — `verifier`, Sonnet.**  
    **Checkouts:** every changed checkout, dependency-first.  
    **Owned files:** none; report-only.  
    **Dependencies:** units 10–12 resolved; Orchestrator stages/installations and release ranges.  
    **Acceptance:** retain exact output and exit status for `format:check`, `lint:check`, `check`, `build`, and `test`, followed by required distribution/service publishing proofs. Distinguish staged-artifact receipts from registry receipts. C7 remains open until required consumer-owner receipts arrive. Commits, installation, publishing, and final acceptance remain with the Orchestrator.

## Tensions

These are judgment calls for challenge, not reconciled conclusions.

- **Execution context versus smaller signature edits.** Replacing opaque `caller` with `{ caller, signal }` is coherent but requires semantic migration even where TypeScript accepts old handlers.
- **Retaining open schemas.** Authored contract validation uses existing primitives without making validation universal. Automatic typed-tool construction could improve authoring ergonomics, but expands this campaign beyond the demonstrated cancellation defect.
- **Higher-package artifact ownership.** Mcp hosts the browser proof because it already declares Playwright. The proposal treats temporary installation of the named campaign artifacts as test-subject consumption, not authorization for permanent dependency additions.
- **Explicit refresh.** Application-owned reconciliation keeps policy out of the library but requires a tested example and does not provide live automatic synchronization.
- **Metadata loss.** Preserving the published wire projection means separate full description and summary do not survive MCP. A namespaced extension would change that decision and its scope.
- **WebMCP bridge before host availability is known.** The adapter can be implemented against the documented boundary, but native compatibility remains conditional on a real browser receipt. Feature absence must not become a passing integration claim.
- **Declarative parity exclusion.** The local callable mechanism and imperative bridge are in scope; browser-managed form synthesis and navigation results are excluded. Accordingly, the campaign cannot advertise complete WebMCP parity.
- **Protocol gap wording.** The brief presents independent server requests as a possible conformance gap. The first-hand guide instead declares their absence a modern-protocol non-goal at `mcp/guides/mcp.md:4336`. Retain that revision distinction and record legacy limitations.
- **C6 scope.** Candidate `goal.md:41` asks for implemented HTML retention; the successor brief expressly asks for a sketch. The proposed phase-one exit records the sketch and carries implementation to the successor phase.
- **Fleet evidence scope.** O1’s no-disagreement statement omitted toolbox. Its stale pin remains an external owner obligation, absorbed directly into the campaign release.
- **Missing measurement transcripts.** Registry/git command transcripts, a Chromium agent-closure receipt, and native WebMCP availability were not supplied. No behavioral success is inferred from those omissions.

## Risks

- **Cooperative cancellation:** a handler that ignores its signal can remain pending. Signal plumbing does not establish forced termination or rollback. Guides must qualify unconditional termination claims.
- **Bridge authorization:** agent authority does not protect direct browser-originated invocations. Shared policy must execute at the MCP server or tool boundary.
- **Network claims:** local dispatch does not prevent a tool’s own business logic from calling a server. Receipts prove the named page-local fixture; relay tests separately account for expected model traffic.
- **WebMCP availability and result drift:** G5c’s shipping record and its IDL/sample result discrepancy remain limits. Native tests must record browser version, feature detection, observed return shape, and actual execution.
- **Port lifetime:** MessagePort binding before yielding is required, and local close is not proof that a peer has shut down. Tests must close both owned ends and drain pending work.
- **Protocol breadth:** wrapped tools reject task and input-required outcomes without an inline value. The ordinary agent loop does not thereby gain task continuation, sampling, or elicitation support.
- **Reading fidelity:** html’s parser is not an HTML5 DOM constructor, its hidden-content filtering does not inspect computed style, and Markdown projection loses information. Phase two needs measured bounds and explicit freshness semantics.
- **Release closure:** toolbox is outside the campaign’s write scope. A completed implementation cannot close fleet alignment without the toolbox owner’s adoption receipt.
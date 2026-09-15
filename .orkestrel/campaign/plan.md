# Plan of record — browser-native agent, tools, and MCP (phase one), 2026-09-15

Reconciled by the Orchestrator from the blind design lanes `D1-design-planner.md` (Opus 5,
subjective) and `D1b-design-astra.md` (GPT-6 Astra, objective), the distillates G1–G5c, the
probes P1–P2, and the fleet report O1. Both lanes' reports are immutable; this file records the
rulings.

## Rulings (which lane was right, on what)

| # | Question | Ruling | Source of the ruling |
| - | -------- | ------ | -------------------- |
| R1 | Signal to the tool | `ToolContext { signal: AbortSignal; caller?: unknown }`, one grouped context passed as the second argument of `execute`; `ToolCall` becomes `{ id, name, arguments }` (plain JSON). `signal` is required on the context; the manager mints a never-aborting signal when its caller passes none. | Planner's shape (fixed `{Entity}Context` form, one-word members, matches WebMCP's required `signal`). Astra's objection about an old `(args, caller?: unknown)` handler still compiling is carried as a migration check in every consumer unit. `caller`'s only code consumer is `mcp/src/core/MCPServer.ts:794` (`buildToolCall(request, options.caller, args)`), per request, so a per-invocation context fits it. |
| R2 | Contract-derived schema | `ToolOptions.contract?: ContractShape` alongside `parameters?`; giving both throws. With `contract`, `parameters` is derived through the installed contract primitives (`compileSchema` at `index.d.ts:979`, `schemaToParameters` at `:5831`) and arguments are validated with the contract's `explain` before the handler runs; a fault throws `ToolError` from `Tool.execute`, and the manager contains it as a `ToolFailure` whose `error` names the failing path, expected, and received. | Planner. Astra's "authors can compile a contract themselves" is true and is the reason the option stays optional; the built-in path is what makes a page tool refuse a hallucinated argument by default, the surface WebMCP's own security section names. |
| R3 | Advertising vocabulary | `ToolDefinition` gains `title?` and `annotations?: ToolAnnotations { pure?, untrusted?, consequential? }` (domain words; `mcp` projects them onto MCP's `readOnlyHint`/`destructiveHint` and WebMCP's `readOnlyHint`/`untrustedContentHint`/`consequentialHint`). `summary` stays local and is not forwarded. | Planner's placement on the domain type per `names.md` § General vocabulary; `pure` replaces the planner's `inert` (Tension 4) because it reads as an assertion and carries no overstatement. |
| R4 | Tool registry emitter | **Excluded pending the user's decision.** The pattern rule wants `ToolManager` to own an `Emitter`, and `@orkestrel/emitter` is not a dependency of `tool`; `AGENTS.md` forbids adding a package the user did not request. Until authorized: no emitter, no server-pushed `tools/list_changed` from the registry; refresh stays explicit and application-owned (Astra's semantics). | Rule, not judgment. Surfaced to the user in the report. |
| R5 | Where the Chromium proofs live | In `mcp`: a distribution-project proof that packs and installs the campaign artifacts (tool, agent, mcp) into an isolated consumer and drives a real Chromium through the `playwright` `mcp` already declares. No Playwright project in `agent`, no `src/browser` in `agent`, no new dependency anywhere. | Astra. The planner's `tests/src/browser` in agent has no `src/browser` to mirror (`tests.md` § Test contract) and adds packages; its own fallback agreed. |
| R6 | Real-model page receipt | **Intentionally excluded on evidence.** No campaign package holds both Playwright and Ollama without a new dependency. Page-side relay placement is proven with a scripted upstream in the `mcp` proof; the real-model relay stays proven in Node by `ollama`'s service suite; the two compose. | Orchestrator, from the dependency rule. Surfaced to the user as a decision (authorize `playwright` in `ollama`, or `@orkestrel/browser` as an `ollama` devDependency). |
| R7 | In-page pair | Keep `MessageChannel`. Add `createPageServer(options): PageServerInterface { client, destroy }` in `mcp/src/browser`, the page twin of `createScopeServer`, owning the channel, both transports, both binds, and the teardown. | Planner (composition and lifecycle pass the wrapper test; the bind-order footgun is documented in the transport itself). Astra's "no page-server subclass" is honoured: it is a factory over the existing classes. |
| R8 | Cross-document handshake (`createScopeClient`) | **Intentionally excluded from phase one**; successor finding. | Astra. Not in the user's outcomes; separate origin, navigation, and lifecycle work. |
| R9 | WebMCP bridge | `createModelContext(options?): ModelContextInterface | undefined` in `mcp/src/browser`; `undefined` when the document exposes no `modelContext` (absence is `undefined`, derived at construction). Interface: `emitter` (`change` from `toolchange`), `publish(tools: ToolManagerInterface, options?: { origins? })` registering each current tool through `registerTool(tool, { exposedTo, signal })`, `adopt(options?: { origins? })` wrapping `getTools({ fromOrigins })` as `Tool` instances whose `execute` calls `executeTool(tool, args, { signal: context.signal })`, `destroy()` aborting every registration and releasing the emitter. Proven against an IDL-faithful double built from `G5c-webmcp-idl.md` § 1; the guide records that no shipping browser exposes the global (chromestatus `Proposed`, no flag, no origin trial, 2026-08-12) and that the double proves the translation, never the native integration. | Planner's shape (bidirectional, `ToolManagerInterface` input, mirrors the API's own noun) with Astra's absence rule and its honesty constraints. `destroy` per the lifecycle vocabulary. Without R4, `publish` registers a snapshot; a consumer calls it again after changing the registry. |
| R10 | Server-to-client requests, `ping`, `logging` | Excluded. The guide already declares server-initiated requests a modern-protocol non-goal (`mcp/guides/mcp.md:4336`); record the WebMCP comparison against that wording, not as a "conformance gap". | Both lanes; Astra's wording correction adopted. |
| R11 | Agent over MCP | `mcp` owns the wrapper; `agent` never depends on `mcp`. The wrapped tool forwards `context.signal` into `call(name, args, { signal })` and carries `title` and `annotations`; `summary` loss over the wire is documented. The MCP server's default execution path forwards the request signal into `tools.execute(call, { signal, caller })`. Explicit refresh: a documented and executed example that replaces only the MCP-installed instances, preserves local tools, refuses name collisions, and keeps the last snapshot on failure. | Both lanes; Astra's full cancellation path and refresh semantics adopted. |
| R12 | Declarative WebMCP forms | Excluded (spec section is a TODO; markup is application policy). | Both lanes. |
| R13 | Browser reading arm | Phase two. Both sketches (`D1-design-planner.md` § 5: `frame.tree()` + `frame.markdown(options)`; `D1b-design-astra.md` § 5: a `page.reading` manager with `capture`, `document`, `text`, `markdown`, `clear`, grouped `limit`) are the inputs to design round D2, run after phase one accepts. `@orkestrel/markdown` enters `browser` then, on the user's authorization already given. | Both lanes; user's ordering. |
| R14 | Versions and order | `tool` → `mcp` → `agent` → `ollama`; `probe` and `toolbox` re-pin to the campaign releases (toolbox moves straight from `^0.0.21`), carried to the user as obligations with exact instructions since they sit outside this campaign's write scope. `html`, `markdown`, `guide`, `browser` do not move in phase one. Consumers work against the packed, installed tool tarball until it publishes; registry copies restored before any distribution proof or publish. | O1 and both lanes. |
| R15 | Routing | Objective, constraint-heavy units to `sol` (Astra); API-shape and guide-voice units to `implementer` (Opus); the Chromium proof unit to the native `implementer` because a bench exec cannot install a package or drive a child's pipes (Bench laws rule 5); consumer adoption to `builder`. | Orchestration contract. |

## Exit criterion (fixed now; a re-baseline may change units, never this list)

| Id | Capability | Disposition |
| -- | ---------- | ----------- |
| X1 | Tool cancellation: `ToolContext.signal` reaches every handler; the agent's run abort and an MCP request cancellation both arrive there; an already-aborted signal never enters a handler | implement (tool, agent, mcp) |
| X2 | Tool argument contracts: `contract` derives `parameters`; arguments validated before execution; failure is a `ToolFailure` naming path, expected, received | implement (tool) |
| X3 | Tool advertising vocabulary: `title`, `annotations` on `ToolDefinition`, projected to MCP `tools/list` and to the WebMCP bridge | implement (tool, mcp) |
| X4 | Tool registry observability (emitter; server-pushed `tools/list_changed`) | excluded pending the user's authorization of `@orkestrel/emitter` in `tool` |
| X5 | In-page tool execution receipt: real Chromium, installed artifacts, agent + page tool, DOM changed, zero network | implement (mcp distribution proof) |
| X6 | In-page MCP pair: `createPageServer` completes `initialize`, `tools/list`, `tools/call` in one page, zero network | implement (mcp browser + proof) |
| X7 | Agent over MCP in a page: registry holds MCP tools; the call executes in the page server; a caller abort cancels the in-flight call; explicit refresh example executed | implement (mcp core + proof) |
| X8 | Agent placement: Node alone retained (`agent` `src:core`); page alone (X5); page-to-Node relay with a scripted upstream (mcp proof); real-model Node relay retained (`ollama` service); real-model page relay | last item excluded on evidence (R6); the rest implement or retain |
| X9 | WebMCP bridge: `createModelContext` publishes and adopts, feature-detected, proven against the IDL double in real Chromium; native integration recorded as unproven with the chromestatus reading | implement (mcp browser) |
| X10 | WebMCP parity matrix in `mcp/guides/mcp.md`, every row implement, retain, or exclude with its source | implement |
| X11 | Server-to-client requests, modern `ping`, `logging/*` | intentionally excluded; guide wording verified |
| X12 | Cross-document handshake (`createScopeClient`) | intentionally excluded (successor) |
| X13 | Declarative WebMCP forms | intentionally excluded |
| X14 | Guides, parity suites, and versions aligned for tool, mcp, agent, ollama; gates green in dependency order; probe and toolbox re-pins carried to the user with exact instructions | implement |
| X15 | Browser reading arm: both sketches recorded as D2 inputs; D2 runs after phase one accepts | carried to phase two |

## Units, order, and routing ledger

Serial writers per checkout. Codex execs in different checkouts may run in parallel.

| Unit | Subject | Checkout | Role / engine | After |
| ---- | ------- | -------- | ------------- | ----- |
| U0 | Head-start script: build, pack, install the tool tarball into agent, mcp, ollama (never link), record replaced ranges; re-runnable | scaffold `tmp/units/` | `builder` / Sonnet (authoring); Orchestrator runs it | — |
| U1 | Tool contract: `ToolContext`, `ToolCall` without `caller`, `contract` validation, `ToolError`, `title`, `annotations`, manager context minting and pre-abort refusal, tests, guide | tool | `sol` / GPT-6 Astra | — |
| A1 | Audit of U1: `reviewer` (Opus, cross-engine) + `analyst` (Astra, told its engine wrote it) + `checker` | tool | as named | U1 |
| U2 | Agent: `Agent.#authorize` passes `{ signal }` on both branches; `RelayProvider` strip removed; guide placement sentences name the proofs; migration check of every second-argument use | agent | `sol` / GPT-6 Astra | U0 run (tool tarball installed) |
| U3 | MCP core: `buildToolCall` and default execution pass `{ signal, caller }`; wrapped tool forwards `context.signal` into `call`, carries `title`/`annotations`; server advertises `title`/`annotations` on `tools/list`; refresh example; guide wording for the non-goal | mcp | `sol` / GPT-6 Astra | U0 run |
| A2, A3 | Audits of U2, U3: `reviewer` (Opus, cross-engine) + `analyst` (Astra) + `checker` | agent, mcp | as named | U2, U3 |
| U4 | MCP browser: `createPageServer`, `createModelContext`, IDL double fixture, Playwright tests, `## WebMCP parity` and the status row in the guide | mcp | `implementer` / Opus 5 | U3 |
| A4 | Audit of U4: `analyst` (Astra, cross-engine) + `reviewer` (Opus) + `checker` | mcp | as named | U4 |
| U5 | MCP distribution proof: isolated consumer installs packed tool, agent, mcp; Chromium via `playwright`; receipts for X5, X6, X7, page-side X8 with scripted upstream; network recorder with a positive control | mcp | `implementer` / Opus 5 (bench cannot install or drive a child) | U4, agent tarball |
| A5 | Audit of U5: `analyst` (Astra, cross-engine) + `reviewer` (Opus) + `checker` | mcp | as named | U5 |
| U6 | Ollama adoption: tool and agent tarballs installed; every second-argument use examined; `guides/tool.md` and `guides/agent.md` mirrors refreshed by byte copy; gates | ollama | `builder` / Sonnet | U1, U2 |
| V | Verifier gates per package in dependency order (`format:check`, `lint:check`, `check`, `build`, `test`; plus `test:distribution` in mcp) | tool, mcp, agent, ollama | `verifier` / Sonnet | audits resolved |
| L | Landing: commits per package (Orchestrator), version bumps per the publish skill, records retained; publish is the user's decision | all | Orchestrator | V |
| D2 | Phase-two design round for the browser reading arm | — | `planner` + `analyst` | L |

Substitutions recorded: Astra for Sol on every objective lane (`liveness.md`); Sonnet `researcher`
for the WebMCP research after the Grok lane's `no web access` (ledger G5/G5b/G5c).

## Re-baseline 2 — 2026-09-15, the user's rulings

The user ruled on the six open decisions. Each ruling below moves a unit; the exit criterion
gains the capabilities the rulings require and loses none.

| Ruling | Was | Now |
| --- | --- | --- |
| 1. `@orkestrel/emitter` in tool | R4 excluded pending authorization; X4 excluded | **Implement.** U8 (`sol`, Astra) lands `ToolManagerEventMap { add, remove, clear }`, `ToolManagerOptions { on?, error? }`, `emitter`, `destroy`; U8a (Orchestrator) declared and installed the dependency. Downstream: U4d in mcp (server pushes `notifications/tools/list_changed` from registry events; the WebMCP bridge re-publishes on change) after U4c/A4; agent needs nothing; consumers re-typecheck against the repacked tarball (M2). X4 → implement. |
| 2. Real-model page receipt | R6 excluded on evidence; X8 page side only | **Implement.** G8 (Grok) surveys the fleet's browser-environment tests; D3 (`planner` + `analyst`) rules on placement and dependency; U13 implements with the fleet's own machinery. X8 → implement in full. |
| 3. `probe` and `toolbox` re-pins | R14 carried to the user as instructions | **Units at landing**, after the publish wave: U9 (probe), U10 (toolbox), each re-pinned to the released versions with gates, audited by `checker`. New X18. |
| 4. Fleet duplicate-export gate and hosted guides | not in the plan | **Implement in scaffold.** G7 (Grok) scouts the hosted set, the policy set, the guide mirrors, and the commands; U11 lands the vendored policy rule (a target's `src/**` barrel exports and `tests/setup*.ts` exports against every other package's guide `## Surface`, including cross-package name conflicts such as `createChannel`); U12 hosts every package guide in `dist/host` so the rule reads offline from the installed scaffold; A11 audits. New X16 (gate) and X17 (hosted guides). The rule fix in `.claude/rules/tests.md` § Condition and the brief template's Installed primitives row (K3, K3b) ride the same scaffold release. |
| 5. Publish order | tool → mcp → agent → ollama | As recommended: scaffold first (vendored host moved), then the wave in the order `scaffold catalog` derives, through the `orkestrel-publish` skill, with the user's one-time code at each upload. |
| 6. Push | open | At landing, after the final verifier sweeps. |

Reuse cleanup (the user's instruction of the same day): G6 swept every campaign diff against
`@orkestrel/test` and `@orkestrel/contract`; U4c carries the mcp rows, U7 carried the agent row
(closed, A7 checking), the guide fence rows are ruled consumer code and stay.

Order from here: U4c → A4 → checkpoint mcp; U8 → repack tool → install into agent, mcp, ollama →
consumer typecheck (M2) → U4d (mcp: `list_changed` push and bridge re-publish) → A4b; G7 → U11 →
U12 → A11 (scaffold, parallel to the mcp work — disjoint checkouts); G8 → D3 → U13 → A13
(ollama or wherever D3 places it); U5 → A5; V-sweeps; landing; U9, U10 after publish; D2.

## Re-baseline 3 — 2026-09-15, the D3 and D4 rulings

Both rounds ran the adversarial pass (planner on Opus 5, analyst on GPT-6 Astra, blind, one brief
each). The Orchestrator reconciled them as follows. A ruling names the lane it follows; a ruling
that follows neither states why.

### D3 — the real-model page receipt (X8 in full)

| Question | Ruling | Lane |
| --- | --- | --- |
| Placement | `@orkestrel/ollama` owns the proof, in its existing Node `service` project, as `tests/service/page.test.ts`. No new Vitest project, no `configs/browsers.ts`, no `src/browser`. R5 stands for agent and mcp. | both (name: planner) |
| Dependency | Exactly `@orkestrel/browser@^0.0.16` in ollama `devDependencies`; Playwright refused (two packages plus a leaf; an environment project a live external may not enter; a bundler between the page and the artifact). | both |
| Model path | The authenticated relay served same-origin is the gated headline: page `Agent` + `RelayProvider` + page `Tool`; Node `createRelay` + `OllamaProvider` + live daemon. The direct-daemon case is a second, narrower case in the same file behind its own hard-throw preflight gate (`requireDaemonOrigin`), because contract 13 claims it in prose. | relay: both; direct: planner |
| Page loading | An import map over the installed built entries (`node_modules/@orkestrel/*` `exports['.'].import.default`), derived by `buildImportMap`, served on `127.0.0.1` from the fixture. Not a Vite bundle: the claim is about the published closure, and a bundler would prove the bundler. | planner |
| Observation | `page.network.start()` with `request`, `failure`, `finish` subscribed before navigation (the installed browser API); a page-local Resource Timing drain as corroboration; a deliberate uncached `/control` request as the positive control that every recorder must report; the recording transport around the real daemon fetch. Assert by filtering on method and URL, never by a total (the preflight is its own request). | analyst |
| Execution receipt | The page tool writes a fresh receipt into a real DOM element and returns it; the receipt is absent from the prompt; acceptance requires the model's recorded call, the agent's `tool` result, the DOM read through `evaluate`, the receipt inside the next relay and daemon requests, and completion with `partial: false`. One `POST /inference` per turn, zero page requests during tool execution. | analyst (planner's DOM-versus-wire cross-check kept) |
| Fixture | Extend ollama's `createRelayServer` neighbourhood with `createPageFixture` on one shared dispatcher (document at `/`, `/modules/` tree, `/control`, the recorded `/inference` relay); no mcp-style `globalSetup`, no copy. | both |
| Gates | Hard throws naming the fix: daemon and model (existing), Chromium through `findSystemBrowser` (resolved on call, never at `setupService.ts` load), `dist` present, daemon origin preflight; fresh owned profile, `cdp.discover: false`, ephemeral CDP port; `retryUntil` at most 3 attempts with request accounting asserted on every attempt; timeouts unchanged; `prepublishOnly` already runs `test:service`. | both |
| Units | U13a (Orchestrator tracked install + tarball restage), U13b (`implementer`, Opus 5, ollama: setup helpers, their setup proofs, the service test, `guides/ollama.md`; first step a throwaway probe that `@orkestrel/browser` serves an import-map ES-module page and reports one `request` and one `evaluate`), U13c (`builder`, agent: the placement subsection of `guides/agent.md`; mirrors refreshed), A13 (`analyst` Astra + `reviewer` Opus + `checker`), V13 (`verifier`). U13 runs after U8c lands so the page holds the final tool tarball; parallel with U5. | both |

### D4 — the fleet duplicate-export gate and hosted guides (X16, X17)

| Question | Ruling | Lane |
| --- | --- | --- |
| Hosting | A third staging list `REFERENCE_PATHS` carrying `guides` (shipped for reading at `dist/host/guides/<bare>.md`, never planted, never treated as canon). `CANON_PATHS` is refused because `listCanonPaths` enumerates canon members held inside a target and feeds the foreign-file and `overwrite` logic, so a target's own guides would read as held canon files. `guides/guide.md` and `guides/scaffold.md` leave `HOST_PATHS` (the prefix rule) and keep their target presence claims explicitly in `blueprintToHostArtifacts`; `selectHostPaths` stays (it still excludes the target's own guide). `stageHost` refuses a stage whose catalog rows are not all covered by a staged guide. | analyst (planner's stage refusal kept) |
| supervisor | `guides/supervisor.md` is authored in the supervisor checkout (D4-S, Opus 5) and mirrored before staging; no placeholder, no dropped row. | both |
| `catalog` offline | The hosted set is the second floor beneath the target's own snapshot: a failed fetch resolves from `dist/host/guides`, the mirror is written, `provenance.guides` reads `'floor'`, exit `EXIT_DRIFT`; a registry outage still performs a guide-only partial operation over the declared names (or the hosted catalog for `--all`) with a `note`, never an empty catalog; `audit` emits a non-blocking `Question` saying a mirror "differs from the hosted guide" (never "older"). No new verb, no flag. | planner (floor) + analyst (partial operation, audit question) |
| Rule name | `surface`, a `PolicyRule` member; the sweep is `inspectPolicySurface`; the violation keeps `createPolicyViolation`'s shape with the message `surface name belongs to one package: NAME (OWNER)` and the declaring `path` and `line`. | planner |
| Subject | The target's live barrels through `createSource({ files, module }).surface()`; any barrel statement outside the star-export law is itself a `surface` violation ("population incomplete"), so the enumerator can never report clean over an unread row; plus the target's own `tests/setup*.ts` exports through `extractExports`, minus the vendored setup modules `HOST_PATHS` names. No TypeScript-compiler alias resolution: the barrel law already forbids what it would find. | planner (loud-incomplete refusal added) |
| Comparison | Every hosted guide's `## Surface` column-0 names through `createGuide().surface()`, excluding the target's own guide; bare-name identity, case-sensitive; environment and kind ignored. A missing hosted root or an uncovered catalog row is a `surface` violation, never a pass. No second Markdown projection. | planner |
| Re-exports | No carve-out: `architecture.md` forbids re-exporting a dependency's symbol, so a forwarding export is already another rule's violation; the `contract`/`test` outcome names are independent declarations (analyst's measurement). | both |
| Phase-in | Grandfather by the hosted guide: a subject name fires only when another package's hosted guide claims it and the target's own hosted guide does not. Growth is refused at stage time: `stageHost` recomputes the cross-guide collision set of the staged guides and refuses when it exceeds the set of the previously published host (read from scaffold's own installed `@orkestrel/scaffold`); no `collisions.json`, no per-target allowlist. Setup-module exports are fail-closed with no grandfather. P7 measured that half: hits in brief, browser, console, database, indexeddb, lsp, mcp, middleware, ndjson, ollama, scaffold, sse, supervisor, test — each gets a cleanup unit (U14-*) before that target re-pins to the releasing scaffold. | planner (grandfather) + analyst (no silent growth, setup fail-closed, cleanup before adoption) |
| Resolution rules | R1 reuse beats rename; R2 the subject keeps the name and the other names what its thing is (`createChannel` stays agent's, test's becomes the console recorder it is; `isRecord` stays contract's, msg's states its broader contract); R3 extract a shared package only on an equivalence proof and an authorized dependency change, otherwise qualify (the `lsp`/`mcp`, `html`/`markdown`, `database`/`table` pairs are later design units, not renames by fiat); R4 no accept path. Land in `.claude/rules/names.md` § Fleet name ownership. | planner (R1, R2, R4) + analyst (R3) |
| Units | D4-S (supervisor guide, Opus), D4-1 (staging: `REFERENCE_PATHS`, `stageHost` refusal, `host.json`; Astra), D4-2 (`catalog` floor, partial operation, audit question; Astra), D4-3 (`surface` rule with physical controls: planted barrel and setup collisions, grandfathered name, vendored setup export, incomplete barrel, missing host; Astra), D4-4 (prose: `names.md`, `workspace.md` § Policy instruments, `guides/scaffold.md`, `guides/README.md`, `tests/guides.test.ts`; Opus), V (verifier, plus the distribution proof that an installed packed scaffold supplies every guide offline), A (analyst Astra + reviewer Opus + checker). Serialized in scaffold; D4-S first; the `tests.md` § Condition and brief-template edits (K3) ride the same release. | reconciled |

### Order from here

U8c (tool re-entry fix, after the A8 reviewer) → A8b → repack tool → install into agent, mcp, ollama → M2 typecheck. A4 (mcp browser face) → U4d (mcp: `list_changed` push from registry events; bridge re-publish on change) → A4b → checkpoint mcp → U5 → A5. U13a done → U13b/U13c → A13 → V13. D4-S → D4-1 → D4-2 → D4-3 → D4-4 → V → A; U14-* setup cleanups per target; scaffold release; targets re-pin and `repair`. Landing per Re-baseline 2.

### Addendum 2026-09-15 — D4-1d, the collision baseline is the committed inventory

D4-1c read the growth baseline from `node_modules/@orkestrel/scaffold`, which the canon checkout never carries (the build log after D4-1c: `Published host Surface baseline absent at …node_modules/@orkestrel/scaffold/dist/host/guides`), so the refusal could never fire where it exists to fire. Ruling: the baseline is the committed inventory `host.json` that `build:inventory` regenerates — `HostManifest.surface` records the collision set (collisions only, sorted, covered by the manifest digest), `stageHost` reads it through `readSurfaceBaseline` before the build overwrites it, an absent inventory establishes the baseline, and an inventory whose `surface` is missing or malformed is refused rather than reset. A one-time seed of the committed inventory is part of D4-1d. D4-1c's `node_modules` lookup and its tests are removed. D4-4 (prose) follows D4-1d; the D4 audit round audits the whole chain (D4-1b, D4-2b, D4-3, U14, U14b, D4-1c, D4-1d, D4-4).

## Sequencing ruling

Use a staged, substrate-first sequence:

`middleware preparation → publish checkpoint → dependency graph → source migrations → test/guide migrations → test-helper adoption → E1 fixes → integrated proof`

This avoids implementing the E1 fixes against APIs that immediately move underneath them. Alignment should not be one opaque unit: package resolution, production API migration, test migration, and helper adoption have different failure signatures and should remain independently attributable.

If middleware publication approval is deferred, supervisor may temporarily retain `@orkestrel/middleware@^0.0.9` while raising everything else. That graph is installable: middleware 0.0.9 accepts database `>=0.0.7` and server `>=0.0.10`, so database 0.0.9 and server 0.0.12 satisfy it. It will, however, retain nested legacy contract/budget/abort/timeout copies and therefore cannot satisfy the campaign’s fleet-alignment exit criterion.

## Units

### 1. Prepare middleware 0.0.12

- **Subject:** Produce a release-ready middleware patch with peer database `^0.0.9`.
- **Owned files:** [package.json](/workspace/middleware/package.json), `/workspace/middleware/package-lock.json`.
- **Dependency order:** First. Publication follows only after its evidence is accepted.
- **Routing:** Builder; this is a fully specified manifest-and-lock change.
- **Acceptance:** Version is `0.0.12`; peer and dev database pins are `^0.0.9`; server peer remains `^0.0.12`; middleware’s ordered gates pass; package inspection shows the corrected peer in the packed manifest; a generated consumer installs database 0.0.9, server 0.0.12, and the packed middleware without peer errors.
- **Risk:** Testing a local tarball proves the package but not registry availability. Supervisor’s final lock must wait until 0.0.12 is actually published.

The publish itself is a user-approved checkpoint between Units 1 and 2, not an executor action.

### 2. Raise and resolve the supervisor fleet

- **Subject:** Replace every direct `@orkestrel` range and regenerate the lock from registry artifacts.
- **Owned files:** [package.json](/workspace/supervisor/package.json), `/workspace/supervisor/package-lock.json`.
- **Dependency order:** After middleware 0.0.12 is visible; otherwise use the explicitly temporary middleware 0.0.9 branch.
- **Routing:** Builder.
- **Acceptance:** Direct ranges resolve to workflow 0.0.12, mcp 0.0.15, guide 0.0.11, agent 0.0.15, middleware 0.0.12, contract 0.0.11, server 0.0.12, tool 0.0.10, database 0.0.9, budget/emitter 0.0.6, sse 0.0.5, terminal 0.0.8, router 0.0.9, sea 0.0.6, ollama 0.0.9, scaffold `^0.0.37`, and test `^0.0.3`. `npm ls` reports no invalid peer, extraneous, or unintended direct legacy node.
- **Risk:** This unit intentionally exposes compilation failures carried by Units 3–4; it does not claim a green package by itself.

### 3. Migrate production consumers to the target APIs

- **Subject:** Make source code conform to workflow, MCP, and contract 0.0.11+ contracts.
- **Owned files:** [MCPProjection.ts](/workspace/supervisor/app/server/MCPProjection.ts), [helpers.ts](/workspace/supervisor/app/server/helpers.ts), [types.ts](/workspace/supervisor/app/server/types.ts), [ApplicationRoutes.ts](/workspace/supervisor/app/server/ApplicationRoutes.ts), [factories.ts](/workspace/supervisor/app/server/factories.ts), plus only source files named by actual diagnostics.
- **Dependency order:** After Unit 2; before any E1 implementation.
- **Routing:** Sol implementer; the protocol migration is nontrivial but listener-free.
- **Acceptance:**
  - Stream frames are `JSONRPCNotification`, while incoming calls remain `JSONRPCRequest` with required `id`.
  - Handlers use `MCPMethodOptions`; its required signal is observed without optional chaining.
  - `MCPStream` yields notifications and returns a response.
  - `buildJSONRPCResult` receives `request.id` and an admissible result carrying the modern `resultType`.
  - Source-scoped core/server/browser typechecks pass.
  - The contract audit confirms supervisor already supplies an explicit error parameter at every `Result` site; no invented cast or compatibility shim is added for the new `unknown` default.
- **Risk:** MCP 0.0.15 changes protocol semantics, not just names. A compiling response without `resultType`, or a request-shaped notification, would still be wrong.

### 4. Migrate tests and guides

- **Subject:** Bring recovery, MCP fixtures, guide parity, and dependency references onto the aligned APIs.
- **Owned files:** `tests/src/core/Run.test.ts`, `tests/src/server/integration.test.ts`, `tests/app/setup.ts`, `tests/app/server/MCPProjection.test.ts`, related route tests selected by diagnostics, `tests/guides/src/parity.test.ts`, [supervisor.md](/workspace/supervisor/guides/src/supervisor.md), and the dependency-reference guides under `guides/src/`.
- **Dependency order:** After Unit 3.
- **Routing:** Builder for the specified mechanical migrations; stop on any behavioral divergence.
- **Acceptance:**
  - `recoverWorkflow` becomes `createRecoveredWorkflow` in tests and the supervisor recovery example.
  - Guide parity uses `guide.fences()` and passes `GuideFence.code` to `findUnexampled` and `fenceImports`.
  - MCP test requests always carry IDs; notification fixtures use their distinct type; terminal stream results assert `resultType`.
  - Installed dependency-reference guides are synchronized where this repository presents them as mirrors.
  - Full `npm run check` and the focused workflow/MCP/guide projects pass.
- **Risk:** Existing fixtures encode the former request/notification ambiguity and explicit terminal frames; mechanical renaming must not preserve those obsolete assumptions.

### 5. Adopt `@orkestrel/test`

- **Subject:** Remove the two exact local duplicates without forcing the partial scratch abstraction.
- **Owned files:** [tests/setup.ts](/workspace/supervisor/tests/setup.ts), plus import sites only if direct re-export is insufficient.
- **Dependency order:** After Unit 4, so helper adoption cannot obscure API-migration failures.
- **Routing:** Builder.
- **Acceptance:** `createRecorder`, `RecorderInterface`, and `waitForDelay` come directly from `@orkestrel/test`; the local recorder interface and implementations are gone; existing tests remain unchanged where the shared setup can re-export the primitives.
- **Risk:** `createScratch` is not a drop-in replacement for async `createTemporaryDirectory`. Retain the latter as a distinct real-resource helper; do not wrap or rename `createScratch` merely to claim adoption.

### 6. Fix the Ollama cold-load budget — E1-1

- **Subject:** Give the application’s agent lane an explicit, configurable total inference budget.
- **Ownership ruling:** Supervisor-owned for this campaign. Ollama 0.0.9 already exposes `OllamaOptions.timeout`; supervisor currently elects its 120-second default in [ApplicationRuntime.ts](/workspace/supervisor/app/server/ApplicationRuntime.ts). The generic default remains a possible upstream ergonomics issue, but no upstream API change is required.
- **Owned files:** `app/core/types.ts`, `app/core/constants.ts`, `app/core/parsers.ts`, `app/server/ApplicationRuntime.ts`, their focused tests, [README.md](/workspace/supervisor/README.md), and the supervisor guide.
- **Dependency order:** After Units 1–5.
- **Routing:** Sol implementer.
- **Acceptance:** Policy exposes single-word grouped fields such as `agent.model` and `agent.timeout`; environment parsing offers a documented timeout setting; runtime passes it to `createOllama`; the default is derived from an observed cold-load high mark plus full-turn allowance and explicit slack; caller/workflow cancellation remains authoritative. A deliberately unloaded real model completes without the former 120-second abort or Ollama 499, and the warm path still passes.
- **Risk:** The Ollama timeout covers the whole streamed call, not merely model loading. A cap based only on load time will reproduce the defect during generation.

### 7. Give failed units a durable fault voice — E1-2

- **Subject:** Record bounded diagnostics whenever committed intent cannot reach or finish its execution boundary.
- **Ownership ruling:** Supervisor core, covering both post-intent launch failure and post-launch event/result transport rejection.
- **Owned files:** [Run.ts](/workspace/supervisor/src/core/Run.ts), [factories.ts](/workspace/supervisor/src/core/factories.ts), centralized helpers if required, `tests/src/core/Run.test.ts`, `tests/src/core/factories.test.ts`, and the supervisor guide.
- **Dependency order:** After alignment; independent of Unit 6, but integrate serially.
- **Routing:** Sol implementer.
- **Acceptance:** Red-first proofs cover executor launch returning failure, launch throwing, event iteration rejecting, and result rejecting. Each post-intent case appends one redacted, bounded diagnostic that reaches the live feed and durable journal; the original failure remains the workflow failure; the unit remains honestly running/indeterminate rather than receiving a fabricated settlement. Pre-intent validation failures still create neither row nor diagnostic.
- **Risk:** Diagnostic sequence selection must remain monotonic after any observations already admitted, and failure text must not bypass existing redaction and note caps.

### 8. Synchronize terminal snapshots and settlement results — E1-3 and E1-5

- **Subject:** Refresh the open viewer from durable truth when its live stream closes normally.
- **Ownership ruling:** Browser `Operator`, not provider parsers. Claude and Cursor already extract their terminal `result`; the settlement card reads “not available” because its refresh occurs on the settlement observation before `unit.settle`, and no refresh follows graceful stream exhaustion.
- **Owned files:** [Operator.ts](/workspace/supervisor/app/browser/controllers/Operator.ts), `app/browser/types.ts`, `tests/app/browser/controllers/Operator.test.ts`, relevant application/browser integration tests, and the supervisor guide.
- **Dependency order:** After Unit 7 so failed runs also have useful terminal content.
- **Routing:** Opus implementation bridge because this is browser state and suite behavior; require independent Sol correctness audit.
- **First investigation mechanism:** Prove the order `workflow terminal roster publication → LiveBroker.close → LiveViewer EOF → roster removal`, while recording `Client.inspect` calls. The current defect is that EOF causes only `live=false`.
- **Required mechanism:** On current-generation graceful EOF, perform one authoritative `inspect`, replace the snapshot, and derive terminal state from that snapshot. Roster completion/removal may trigger attention but must never become snapshot authority; wiring the header directly to `RosterManager.departed` would create a second truth.
- **Acceptance:** A red test ends the stream without injecting an artificial terminal frame. Afterwards the header and phase no longer say `running`, `Run finished` renders, `terminal=true`, and `ended=false` while durable state exists. Claude and Cursor settlement cards show their exact durable result and the old unavailable sentence is absent.
- **Risk:** If the final inspect still sees a running snapshot, the server closure barrier is incomplete; the writer must stop and report that divergence rather than add retries or polling.

### 9. Replace transcript JSON walls with progressive disclosure — E1-4

- **Subject:** Keep provider protocol evidence available without making it the default transcript reading experience.
- **Ownership ruling:** Supervisor browser presentation, not `ProviderExecution` parsing. The source parser already creates activity and settlement observations, while the transcript intentionally retains verbatim evidence.
- **Owned files:** [FeedItem.vue](/workspace/supervisor/app/browser/components/FeedItem.vue), browser helpers/types needed for the projection, `FeedItem.test.ts`, `FeedList.test.ts`, integration journeys, and the supervisor guide.
- **Dependency order:** After Unit 8.
- **Routing:** Opus implementation bridge.
- **Acceptance:** Valid structured provider stdout renders as a compact, initially collapsed protocol entry; raw text remains keyboard-reachable on demand; clean activity cards remain primary; non-JSON stdout and stderr retain their current visibility and tone. Light/dark and narrow/wide captures show no expanded JSON walls, and the disclosure has an exact accessible name, visible focus, and `aria-expanded`.
- **Risk:** Suppressing or discarding stdout would violate the existing evidence contract. Parsing provider-specific schemas in the browser would duplicate the server translators.

### 10. Integrated fleet and human acceptance

- **Subject:** Prove the aligned packages and all five E1 outcomes through real boundaries.
- **Owned files:** `tests/app/browser/integration/journey.test.ts`, its shared browser setup only where a missing human verb is required, `tests/app/browser/portfolio.test.ts`, and generated evidence under the git-ignored `tmp/` tree.
- **Dependency order:** Last.
- **Routing:** Opus implementation bridge for the journeys and captures; one independent verifier runs the final gates.
- **Acceptance:** Human-driven journeys use visible controls and real keyboard/pointer input against the built application. They prove terminal convergence, visible failure diagnostics, compact transcript presentation, and exact Claude/Cursor results, including negative assertions that the stale `running`, JSON-wall, and unavailable-result states are gone. Captures cover light/dark at narrow and desktop viewports. Real Ollama cold-load and installed Claude/Codex/Cursor scenarios are repeated. Middleware and supervisor then pass, with recorded exit codes, `format:check → lint:check → check → build → test`, followed by applicable service and generated-consumer proofs.
- **Risk:** Green component fixtures are insufficient because they previously manufactured terminal frames. Acceptance must drive real stream closure and read the resulting render.

## Exit criterion

The campaign ends only when all of these capabilities are closed:

1. Middleware 0.0.12 is published with database peer `^0.0.9`.
2. Supervisor’s direct pins and lock resolve the complete target fleet without invalid peers or unintended direct legacy versions.
3. Workflow, MCP, guide, and contract consumers use only the target contracts, with tests and governing documentation in parity.
4. `@orkestrel/test` supplies the exact recorder and delay primitives; the distinct temporary-directory helper remains intentional.
5. A real cold Ollama agent run survives beyond the former 120-second boundary and completes.
6. Every post-intent launch or execution failure produces a bounded durable/live diagnostic without inventing settlement.
7. A self-completing open run converges to terminal snapshot truth and shows `Run finished`.
8. Structured provider transcript is compact by default while raw evidence remains accessible.
9. Claude and Cursor settlement cards render their durable results.
10. Middleware and supervisor gates, generated-consumer proof, real-service proof, and the capture portfolio all pass with exit-code or rendered evidence.

## Three highest risks

1. **Registry sequencing:** middleware 0.0.12 is the only nontechnical gate; retaining 0.0.9 is installable but cannot close fleet alignment.
2. **Terminal event ordering:** treating roster removal as durable truth would hide the race rather than fix it. The final snapshot must come from `inspect` after the live EOF barrier.
3. **Real-service timing:** Ollama cold loads and foreign CLIs are materially slower and less deterministic than fixtures. Timeout and verification caps must be based on observed high marks with stated allowances and slack.
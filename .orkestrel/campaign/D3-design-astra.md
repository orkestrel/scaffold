<!-- D3-O — analyst (GPT-6 Astra, codex exec read-only -C WebstormProjects), objective design lane for the real-model page receipt; journal tmp/codex/D3-design.jsonl. Retained verbatim from --output-last-message, 2026-09-15. Immutable. -->

OBJECTIVE lane — analyst, GPT-6 Astra.

## Constraints

Paths are relative to `C:/Users/mikes/WebstormProjects/`. This is a source-based design report; runtime acceptance remains with the implementation and verification units.

### 1. Placement

**Place the proof in `ollama/tests/service/placement.test.ts`, collected by ollama’s existing Node `service` project. Use `@orkestrel/browser` to launch Chromium.**

The subject is the **page composition through the real Ollama relay**: page-owned `Agent`, `RelayProvider`, and `Tool`; Node-owned `createRelay` and `OllamaProvider`; external Ollama inference. Ollama owns the provider integration and already composes its relay with the real daemon. Its existing relay test’s variable named `browser` runs in Node and does not construct a page agent. See [ollama/tests/service/relay.test.ts:9](C:/Users/mikes/WebstormProjects/ollama/tests/service/relay.test.ts:9).

This placement combines G8b’s browser-package service-launch candidate with ollama’s existing service ownership. The layout law assigns live externals to `tests/service/`, while `distribution` proves installed artifacts. See [tests.md:141](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md:141) and [workspace.md:138](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/workspace.md:138).

Keep U5’s packed, scripted Chromium receipts in mcp. Record D3 as the authorized extension of R5’s placement ruling and replacement of R6’s exclusion; Re-baseline 2 explicitly requires X8 in full. See [plan.md:16](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/plan.md:16) and [plan.md:80](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/plan.md:80).

### 2. The dependency

**Add exactly `@orkestrel/browser: "^0.0.16"` to ollama’s `devDependencies`.**

The browser controls only test infrastructure. Ollama already declares agent, tool, NDJSON, Vite, router, server, and test helpers. Browser’s inspected manifest names version `0.0.16` and exports its launch machinery through `/server`. See [ollama/package.json:74](C:/Users/mikes/WebstormProjects/ollama/package.json:74) and [browser/package.json:3](C:/Users/mikes/WebstormProjects/browser/package.json:3).

Import `createBrowser` and `findSystemBrowser` from `@orkestrel/browser/server`. This route exercises the fleet’s browser discovery, process launch, CDP connection, page navigation, evaluation, and teardown. Playwright would drive its own implementation of those operations. The browser service suite demonstrates the required launch-and-navigate shape. See [browser/tests/service/browser.test.ts:43](C:/Users/mikes/WebstormProjects/browser/tests/service/browser.test.ts:43).

The cost is explicit orchestration of the page bundle, readiness, observation, and cleanup. This route does not supply Vitest’s Playwright Browser Mode integration; that integration uses `playwright` and `@vitest/browser-playwright` through `configs/browsers.ts`. See [mcp/configs/browsers.ts:5](C:/Users/mikes/WebstormProjects/mcp/configs/browsers.ts:5).

### 3. Model path and request observation

**Choose the authenticated Node relay, with the page and relay served from the same origin.**

The execution path is:

```text
Chromium: Agent → RelayProvider → POST /inference
Node:     createRelay → OllamaProvider → POST /api/chat
Chromium: returned ToolCall → page Tool → DOM mutation
Chromium: next model turn → POST /inference carrying the tool result
```

This follows the documented relay split and existing fixture. Tool execution occurs through the agent’s tool manager; the provider supplies calls and consumes subsequent messages. See [ollama/guides/ollama.md:213](C:/Users/mikes/WebstormProjects/ollama/guides/ollama.md:213), [ollama/tests/setupServer.ts:139](C:/Users/mikes/WebstormProjects/ollama/tests/setupServer.ts:139), and [agent/src/core/Agent.ts:535](C:/Users/mikes/WebstormProjects/agent/src/core/Agent.ts:535).

Extend `createRelayServer` with optional fixture page assets, preserving its existing callers and authenticated `/inference` route. Start it from the Node service test’s setup. Retain `tests/setupService.ts` for readiness and `tests/setupServer.ts` for Node resources. A Browser Mode `globalSetup`/`provide`/`inject` bridge is unnecessary because this runner already executes in Node; mcp needs that bridge to supply its separately loaded browser graph. See [ollama/vite.config.ts:115](C:/Users/mikes/WebstormProjects/ollama/vite.config.ts:115) and [mcp/tests/setupGlobal.ts:31](C:/Users/mikes/WebstormProjects/mcp/tests/setupGlobal.ts:31).

Serving the bundle and relay together avoids making the proof depend on cross-origin daemon access. The relay guide explicitly describes same-origin serving and explains the CORS middleware required for another origin. See [ollama/guides/ollama.md:262](C:/Users/mikes/WebstormProjects/ollama/guides/ollama.md:262).

Require these observations:

- Enable `page.network.start()` and subscribe to its `request`, `failure`, `finish`, and `socket` events before navigation. Keep the complete page log. The public network manager exposes these observations. See [browser/src/core/types.ts:1214](C:/Users/mikes/WebstormProjects/browser/src/core/types.ts:1214) and [browser/src/core/types.ts:1403](C:/Users/mikes/WebstormProjects/browser/src/core/types.ts:1403).
- Begin the operation window after bundle loading and an explicit page-ready condition. Record the agent’s `turn` and `tool` events in the page. See [agent/src/core/types.ts:928](C:/Users/mikes/WebstormProjects/agent/src/core/types.ts:928).
- Assert **exactly one page `POST /inference` per model turn**, with matching relay ingress and daemon `/api/chat` records. Assert **zero additional page requests for tool execution** and no unexpected operation-window destinations.
- Corroborate completed page requests with a page-local Resource Timing drain, following mcp’s convention. Treat that drain as corroboration, rather than sufficient evidence of every attempted request. Its implementation reads resource entries only. See [mcp/tests/setupBrowser.ts:165](C:/Users/mikes/WebstormProjects/mcp/tests/setupBrowser.ts:165).
- Outside the measured agent operation, issue a deliberate uncached page request to a fixture control endpoint. Require the browser log, Resource Timing drain, and fixture control record to detect it. A server-only counter cannot establish what the page attempted.
- Retain `createRecordingTransport` around the **real** daemon fetch to inspect outgoing messages and incoming response bytes. Never substitute generated tool calls. See [ollama/tests/setupServer.ts:51](C:/Users/mikes/WebstormProjects/ollama/tests/setupServer.ts:51).

### 4. Page loading and execution receipt

**Build a fixture page with the declared Vite toolchain and serve its output from the relay’s ephemeral `127.0.0.1` listener.**

Use authored HTML and a minimal module entry under `tests/fixtures/placement/`. Put browser scenario construction and DOM helpers in `tests/setupBrowser.ts`; put bundling, asset serving, and browser control in `tests/setupServer.ts`. This follows the environment placement of shared infrastructure and the fleet’s existing Vite-bundle-over-loopback pattern. See [tests.md:191](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md:191) and [mcp/tests/distribution.test.ts:636](C:/Users/mikes/WebstormProjects/mcp/tests/distribution.test.ts:636).

The page bundle imports installed `@orkestrel/agent`, `@orkestrel/tool`, and `@orkestrel/ndjson`. The Node fixture imports ollama’s source barrel through `@src/core`, as its existing live relay test does. The selected relay composition places the Ollama module in Node; it does not need to load that module into Chromium. See [ollama/tests/service/relay.test.ts:1](C:/Users/mikes/WebstormProjects/ollama/tests/service/relay.test.ts:1).

Require a page-defined tool that generates a fresh receipt during execution, writes it into a real DOM element, and returns it. The receipt must be absent from the initial prompt. Acceptance requires:

- The actual model response contains the registered tool call.
- The page agent reports the corresponding successful tool result.
- Browser evaluation independently reads the same receipt from the DOM.
- A subsequent relay request and daemon request contain that receipt in the tool-result message.
- The agent completes with nonempty content and `partial: false`.

These assertions test local execution and feedback without depending on exact generated prose, consistent with the live-service assertion rule. See [tests.md:153](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md:153).

Use HTTP loading. Leave `file:` navigation unclaimed; the inspected API accepts a string, while the named live proof uses HTTP. If a separate file-navigation measurement is commissioned, construct its URL with `pathToFileURL`. See [browser/src/core/BrowserPage.ts:221](C:/Users/mikes/WebstormProjects/browser/src/core/BrowserPage.ts:221), [browser/tests/service/browser.test.ts:49](C:/Users/mikes/WebstormProjects/browser/tests/service/browser.test.ts:49), and [portability.md:54](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/portability.md:54).

### 5. Gates

**Retain the existing `service` project and publishing chain.** It already uses Node, `setup.ts` plus `setupService.ts`, `120_000` ms test and hook timeouts, and `fileParallelism: false`. `prepublishOnly` invokes `test:service`; `npm test` excludes it. See [ollama/vite.config.ts:115](C:/Users/mikes/WebstormProjects/ollama/vite.config.ts:115) and [ollama/package.json:56](C:/Users/mikes/WebstormProjects/ollama/package.json:56).

Specify the gate behavior as follows:

| Gate | Required behavior |
|---|---|
| Daemon and model | Retain `/api/tags` readiness, the configured-model check, hard throw, and warmup. Defaults remain `OLLAMA_HOST=http://localhost:11434` and `OLLAMA_MODEL=qwen3.5:2b-q4_K_M`. See [setupService.ts:7](C:/Users/mikes/WebstormProjects/ollama/tests/setupService.ts:7), [setupService.ts:101](C:/Users/mikes/WebstormProjects/ollama/tests/setupService.ts:101), and [setupService.ts:187](C:/Users/mikes/WebstormProjects/ollama/tests/setupService.ts:187). |
| Chromium | Resolve through `findSystemBrowser`; throw when absent and propagate launch failure. Follow browser’s named-error convention. Existing discovery accepts `PLAYWRIGHT_EXECUTABLE_PATH` and `CHROME_PATH`. See [browser/tests/setupService.ts:54](C:/Users/mikes/WebstormProjects/browser/tests/setupService.ts:54) and [browser/src/server/types.ts:38](C:/Users/mikes/WebstormProjects/browser/src/server/types.ts:38). |
| Isolation | Launch headlessly with a fresh owned profile and `cdp.discover: false`. Allocate the CDP port through an ephemeral loopback bind, following the browser fixture. Do not rely on the default fixed CDP port or attach to an existing browser. See [browser/src/server/types.ts:96](C:/Users/mikes/WebstormProjects/browser/src/server/types.ts:96) and [browser/tests/setupServer.ts:34](C:/Users/mikes/WebstormProjects/browser/tests/setupServer.ts:34). |
| Model bounds | Start with `TOOL_LOOP_OPTIONS`, `think: false`, a `60_000` ms run timeout, and `limit: 4`. If model selection requires retries, use `retryUntil` with at most 3 attempts and a shared `90_000` ms deadline. Retain each attempt’s records and assert transport invariants on every attempt. Existing live tool tests establish the bounded-retry precedent. See [ollama/tests/setupService.ts:185](C:/Users/mikes/WebstormProjects/ollama/tests/setupService.ts:185) and [ollama/tests/service/tools.test.ts:41](C:/Users/mikes/WebstormProjects/ollama/tests/service/tools.test.ts:41). |
| Cleanup | Register cleanup as resources are acquired. Abort active page work, destroy the owned browser, stop the relay, and destroy scratch output even after partial setup or assertion failure. Use the installed test helpers for waits and scratch ownership. See [tests.md:227](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md:227), [tests.md:249](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md:249), and [tests.md:329](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md:329). |

## Refusals

The candidate rulings are:

| Candidate | Ruling |
|---|---|
| Agent `src:browser` | Refuse. Tests must mirror a source face; agent’s published entry is core. Do not invent a browser product surface to obtain a test slot. See [tests.md:13](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md:13) and [agent/package.json:29](C:/Users/mikes/WebstormProjects/agent/package.json:29). |
| Mcp-style Browser Mode plus Node fixture | Retain as fleet evidence; refuse as this proof’s runner. Ollama’s live service already has the required Node fixture ownership. |
| Supervisor-style integration config | Refuse. The live model belongs in `service`, and root configuration owns project registration. See [workspace.md:146](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/workspace.md:146). |
| `@orkestrel/browser` service launch | Accept in ollama, as specified in answers 1–5. |
| Packed-consumer distribution page | Retain for U5’s artifact receipts; refuse moving the live-model obligation into that project. See [U5 brief:12](C:/Users/mikes/WebstormProjects/scaffold/tmp/units/U5-mcp-distribution-brief.md:12). |
| Ollama’s existing Node-only relay proof | Retain, but refuse it as the page receipt: it constructs no Chromium page or page agent. See [relay.test.ts:20](C:/Users/mikes/WebstormProjects/ollama/tests/service/relay.test.ts:20). |

Refuse the Playwright dependency stack for U13. It introduces additional direct package entries and does not exercise `@orkestrel/browser` as the controller. The selected addition satisfies the brief’s exact dependency constraint. See [D3 brief:40](C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/D3-design-brief.md:40).

Refuse a scripted model response, Node-executed substitute tool, network interception that fulfills inference, silent readiness skip, or a claim that P1 already proves browser evaluation. P1 expressly limits its result to inspected root-entry text. See [P1-closure-probe.md:31](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/P1-closure-probe.md:31).

## Measurements

The evidence and outstanding measurements are:

| Subject | Reading or required measurement |
|---|---|
| Supplied host state | Windows 11, daemon reachable with localhost CORS, installed Playwright Chromium for mcp, and system Chrome or Edge are standing facts supplied by the Orchestrator. No daemon probe was performed in this lane. See [D3 brief:87](C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/D3-design-brief.md:87). |
| Dependency state | Ollama and agent lack the proposed browser dependency in their inspected manifests. Browser declares `0.0.16`. See [ollama/package.json:81](C:/Users/mikes/WebstormProjects/ollama/package.json:81), [agent/package.json:84](C:/Users/mikes/WebstormProjects/agent/package.json:84), and [browser/package.json:3](C:/Users/mikes/WebstormProjects/browser/package.json:3). |
| API/path corrections | The factory is `createOllama`, not `createOllamaProvider`. The base implementation is `agent/src/core/AgentProvider.ts`, not the brief’s `providers/AgentProvider.ts`. U5’s brief is under `scaffold/tmp/units/`. See [factories.ts:81](C:/Users/mikes/WebstormProjects/ollama/src/core/factories.ts:81), [AgentProvider.ts:73](C:/Users/mikes/WebstormProjects/agent/src/core/AgentProvider.ts:73), and [U5 brief:1](C:/Users/mikes/WebstormProjects/scaffold/tmp/units/U5-mcp-distribution-brief.md:1). |
| Direct Browser Mode access | Unmeasured for the actual Vitest origin. The settling measurement is a native, throwaway run using mcp’s installed Browser Mode machinery: record the actual origin, preflight outcome, page `POST /api/chat`, streamed completion, and browser errors. The historical Chrome receipt in ollama’s guide does not identify this Vitest origin. See [mcp/vite.config.ts:77](C:/Users/mikes/WebstormProjects/mcp/vite.config.ts:77) and [ollama/guides/ollama.md:124](C:/Users/mikes/WebstormProjects/ollama/guides/ollama.md:124). |
| U13 receipt | Require the browser executable/version, model/host, dependency artifact identities, exact command and exit status, elapsed duration, turn records, page requests, relay requests, daemon requests, DOM receipt, feedback message, and positive-control reading. Runtime success is not established by this report. |

### 7. Exit criterion — X8 in full

X8 closes only when the following placements have their distinct receipts:

| Capability | Closure |
|---|---|
| Node alone | Retain agent’s named Node tool-loop proof. See [agent/guides/agent.md:1549](C:/Users/mikes/WebstormProjects/agent/guides/agent.md:1549). |
| Page alone | Accept U5’s installed-artifact Chromium agent/tool receipt, including DOM mutation and zero operation-window network requests. |
| Page-to-Node scripted relay | Accept U5’s real page agent, Node relay, local tool execution, feedback, and request-observation control. See [U5 brief:109](C:/Users/mikes/WebstormProjects/scaffold/tmp/units/U5-mcp-distribution-brief.md:109). |
| Real-model Node relay | Retain and rerun ollama’s live relay suite. See [ollama/tests/service/relay.test.ts:8](C:/Users/mikes/WebstormProjects/ollama/tests/service/relay.test.ts:8). |
| Real-model page relay | Accept U13’s actual model-produced call, page DOM receipt, subsequent daemon-bound tool result, successful completion, and one model request per turn with zero extra tool-execution requests. |

The guides must identify these receipts accurately, A13 must resolve required findings, and the publishing gates must pass. The governing scope is X8 as extended by Re-baseline 2. See [plan.md:39](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/plan.md:39) and [plan.md:80](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/plan.md:80).

## Units

### 6. Owned work and order

Use the following units. Native host execution is required for installation, Chromium, loopback listeners, and daemon measurements; the bench limitation is explicit in the campaign routing and orchestration law. See [plan.md:26](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/plan.md:26) and [orchestration.md:723](C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md:723).

| Unit | Role | Engine / route | Owned files | Acceptance criteria | Dependencies |
|---|---|---|---|---|---|
| U13a — dependency preparation | builder | Sonnet, native host | `ollama/package.json`, `package-lock.json` | Add only `@orkestrel/browser` as a devDependency; inspect installed exports; preserve or restage campaign agent/tool artifacts after installation. Record resolved identities. | Accepted D3; campaign artifact receipts |
| U13b — page relay proof | implementer | Opus 5, native Claude | Ollama `tests/service/placement.test.ts`, `tests/setupService.ts`, `tests/setupServer.ts`, `tests/setupBrowser.ts`, `tests/fixtures/placement/**`; applicable existing setup proofs | Implement answers 3–5. Prove page execution, feedback, request accounting, recorder control, wrong-bearer refusal before upstream entry, and cleanup. Existing Node relay cases remain green. | U13a; campaign tool/agent adoption |
| U13c — guide alignment | builder | Sonnet, native | `ollama/guides/ollama.md` `## Tests`; `agent/guides/agent.md` `## Tests` / placement subsection; ollama’s agent-guide mirror; guide index/mirror updates for browser | Name executed tests, commands, placement, prerequisites, and measurement limits. Edit canonical guides first; refresh mirrors by byte copy. | U13b receipt; canonical guide edits serialized |
| A13 — correctness and fit | analyst; reviewer | Astra source review with native Orchestrator execution of attack vectors; Opus 5 fit review | Report only | Challenge empty observations, extra tool traffic, wrong credentials, missing readiness, failed setup, model-attempt accounting, and artifact identity. Label unexecuted claims. | U13b, U13c |
| A13-check — mechanical review | checker | Sonnet, native | Report only | Confirm service discovery, gate reachability, helper reuse, environment boundaries, dependency scope, and absence of in-scope skips or placeholders. | Resolved A13 |
| V13 — verification | verifier | Sonnet, native host | Report only | Run `format:check → lint:check → check → build → npm test`, then applicable distribution and service gates. Retain exact outputs. | Resolved audits |
| L — landing | Orchestrator | Native host | Campaign ledger and authorized landing changes | Record X8 only after U5/A5 and U13/A13/V13 receipts close. Follow the campaign landing order. | U5/A5; V13; campaign verifier sweeps |

Name the U13 tests for their behavior:

- `executes a page tool through an agent over a live Ollama relay and feeds its result into the next model turn`
- `records a deliberate page request outside the agent operation`
- `rejects a page relay credential before contacting Ollama`

U13 can proceed independently of U5’s implementation because the checkouts differ. Neither replaces the other’s receipt. Both must finish before landing, as the re-baselined order requires. See [plan.md:90](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/plan.md:90).

## Tensions

- **Browser-arm evidence:** this proof exercises `@orkestrel/browser` as the test controller. It does not establish that the page agent autonomously controls a browser or implements the phase-two reading arm. That capability remains assigned to D2. See [plan.md:24](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/plan.md:24).
- **Same-origin certainty versus direct-provider coverage:** select the relay to close the explicitly named real-model page-relay capability. Keep direct Browser Mode daemon access as a separately identified measurement.
- **Model variability versus meaningful failure:** bounded retries may accommodate tool selection, as existing live tests do. They must not discard request-accounting failures or turn a missing execution receipt into success. See [ollama/tests/service/tools.test.ts:23](C:/Users/mikes/WebstormProjects/ollama/tests/service/tools.test.ts:23).
- **Source composition versus package consumption:** U13 proves the live composition against the selected installed dependencies and ollama source. U5 retains responsibility for packed-artifact page evaluation. See [U5 brief:12](C:/Users/mikes/WebstormProjects/scaffold/tmp/units/U5-mcp-distribution-brief.md:12).

## Risks

- **Port handoff:** the browser fixture’s ephemeral-port reservation closes its listener before Chromium binds. Occupancy can change during that handoff; preserve the explicit launch failure and never attach to the occupying browser. See [browser/tests/setupServer.ts:34](C:/Users/mikes/WebstormProjects/browser/tests/setupServer.ts:34) and [browser/src/server/types.ts:100](C:/Users/mikes/WebstormProjects/browser/src/server/types.ts:100).
- **Observation scope:** page-scoped records prove the fixture page’s operation, not all browser-process traffic. Preserve raw records, explicit measurement boundaries, and the positive control.
- **Artifact identity:** manifest versions alone cannot identify staged campaign bytes. U5 already relies on named tarball receipts; U13 must likewise record the actual installed artifacts before accepting campaign behavior. See [U5 brief:30](C:/Users/mikes/WebstormProjects/scaffold/tmp/units/U5-mcp-distribution-brief.md:30).
- **False completion:** a model answer without a recorded call, DOM mutation, and daemon-bound feedback does not close X8. Missing Chromium, missing model readiness, exhausted retries, or incomplete cleanup must fail acceptance.
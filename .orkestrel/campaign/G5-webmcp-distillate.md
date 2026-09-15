<!-- Unit G5b — researcher (Sonnet, native), tedious-work ladder step 3 after the Grok lane's `no web access` deviation. Retained verbatim from the completion notification, 2026-09-15. Duration 137 s, 14 tool uses. -->

Question: What is WebMCP as of 2026-09-15 — its venue, specification status, exact API surface, security model, and the agents that consume its tools — and which adjacent browser-native mechanisms for agent tools and page reading exist that an in-page MCP server, an in-page tool registry, and an in-page agent must interoperate with or be measured against?

Evidence

1. Status.
- WebMCP originated from three converged proposals: Microsoft's "Web Model Context," Google's "Script Tools," and the MCP-B Chrome extension (https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/WebModelContext/explainer.md, archived note dated July 2025 pointing work onward).
- Venue: W3C Web Machine Learning Community Group (CG). The CG charter became operational 2025-09-25 and added WebMCP as a deliverable, moving it from explainer to spec-drafting phase (https://www.w3.org/2025/09/25-webmachinelearning-minutes.html, 2025-09-25).
- Current spec draft: "WebMCP" at https://webmachinelearning.github.io/webmcp/, marked "Draft Community Group Report," dated 2026-09-14, explicitly "not a W3C Standard nor... on the W3C Standards Track." Declarative API and detailed execution steps are marked unfinished; the document links a wpt.fyi test suite.
- Repository https://github.com/webmachinelearning/webmcp: README published 2025-08-13; ~4,000 stars, 123 open issues, 13 open pull requests (fetched 2026-09-15, count not independently reconfirmed against the live issues list, which the researcher separately paged).
- The CG plans an "early wide review" pass by W3C's horizontal groups (Accessibility, Internationalization, Privacy, Security) and the TAG before formal submission; editors agreed to draft that submission content for group consensus first (https://www.w3.org/2026/05/28-webmachinelearning-minutes.html, 2026-05-28).
- Chrome: early preview announced by André Cipriani Bandarra on Chrome for Developers, 2026-02-10, available behind a flag in Chrome 146 Canary (https://venturebeat.com/infrastructure/google-chrome-ships-webmcp-in-early-preview-turning-every-website-into-a, secondary, undated masthead; corroborated by search-result summary of the Chrome blog). The `developer.chrome.com/docs/ai/webmcp` page (published 2026-05-18, last updated 2026-08-07) instead states Chrome 149 for an origin trial and `chrome://flags/#enable-webmcp-testing` for local testing — the two Chrome version numbers (146 vs. 149) disagree across sources and are not reconciled here; `inference`: this likely reflects a Canary flag version versus a later origin-trial milestone, not stated directly in either source.
- Chrome Platform Status feature entry: https://chromestatus.com/feature/5117755740913664, status "DevTrial" on desktop Chrome 146, "under active discussion and subject to change" (search-result summary, date of retrieval 2026-09-15; page itself not directly fetched).
- Blink "Ready for Developer Testing: WebMCP" and an earlier "Intent to Experiment: WebMCP" thread exist on blink-dev (https://groups.google.com/a/chromium.org/g/blink-dev/c/bhhOmTGzD5Y, https://groups.google.com/a/chromium.org/g/blink-dev/c/gmYffo5WOE8; dates not directly fetched).
- Edge/Microsoft explainer status: `inference` from the fetched document — the standalone "Web Model Context" Edge explainer is archived (2025-07) in favor of the joint W3C WebMCP repository; no separate Edge shipping status found in the sources reached.

2. Imperative API.
- Global: `document.modelContext` (not `navigator.modelContext`, contrary to several secondary blog posts that use that name), returning a `ModelContext` object extending `EventTarget` (https://webmachinelearning.github.io/webmcp/, 2026-09-14).
- Methods (from the spec fetch and corroborated by the README, 2025-08-13):
  - `registerTool(tool, options)` → `Promise<undefined>` (or a `RegisteredTool` handle per README's phrasing; the two fetches disagree on exact return type — spec-page summary says `Promise<undefined>`, README says it "registers a tool" without stating the return shape explicitly to this researcher — `inference` that the two describe the same call at different fidelity).
  - `getTools(options)` → `Promise<sequence<RegisteredTool>>`; accepts a `fromOrigins` option for cross-origin discovery (README, 2025-08-13).
  - `executeTool(tool, inputObject, options)` → `Promise<DOMString>`; `options` supports a `signal` for cancellation (spec fetch, 2026-09-14; README, 2025-08-13).
  - `ontoolchange` event handler / `toolchange` event fires when tools are added, removed, or updated (both sources).
- Tool shape: `{ name, description, inputSchema (JSON Schema), execute(params) }`, `execute` is async and returns a response (Edge explainer's earlier `window.agent.provideContext()` form uses the identical object shape, https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/WebModelContext/explainer.md, archived 2025-07).
- Lifecycle (per document, per navigation, bfcache): not stated in any source reached; `Unknown`, see below.
- Unregistration: the spec's open-issues list includes "Clarify that unregistration must not fail an in-flight execution" (issue #300) and "Let a tool deliver a final result on caller abort" (#299), implying an unregistration mechanism exists but its exact signature was not found in the fetched spec text (https://github.com/webmachinelearning/webmcp/issues, retrieved 2026-09-15).

3. Declarative API.
- The Chrome docs page states an HTML-forms-based declarative API exists alongside the imperative one: "Add annotations to a standard HTML forms to create a WebMCP tool" (https://developer.chrome.com/docs/ai/webmcp, updated 2026-08-07). Exact attribute names (`toolname`, `tooldescription`, `toolparamdescription`) were not directly quoted from a fetched page; the open-issues list corroborates the shape — issue #286 "Include aria-label as part of the Declarative API's toolparamdescription sources" confirms `toolparamdescription` is a real declarative attribute name (https://github.com/webmachinelearning/webmcp/issues, retrieved 2026-09-15). Issue #307 "Clarify caller lifecycle for non-autosubmit declarative tools" implies an "autosubmit" behavior distinguishing declarative tool variants.
- The Edge explainer separately considered and rejected a Web App Manifest-based declarative form, on the ground that "manifests can't execute code" (archived 2025-07).
- Exact mapping of form submission to tool call and result return: not found in fetched sources; `Unknown`.

4. Callers.
- The spec frames "web pages as client-side implementations of the Model Context Protocol" so that a page's own registered tools are invoked by an agent, not by the page's own script for its own tools (spec fetch, 2026-09-14).
- Cross-origin: `getTools({ fromOrigins })` lets a caller enumerate another origin's tools; cross-origin iframes require the `allow="tools"` Permissions Policy attribute, default `self` (developer.chrome.com/docs/ai/webmcp, 2026-08-07; spec fetch's origin-isolation note, 2026-09-14).
- Which caller: developer.chrome.com/docs/ai/webmcp mentions a "Model Context Tool Inspector Extension" for testing but does not name the production caller (Gemini in Chrome or another built-in agent) directly in the content reached. `Unknown` which specific browser agent invokes tools in the shipping preview; `inference` from the "AI in Chrome" section grouping is that Chrome's own on-device/Gemini assistant is the intended first caller, not confirmed by a directly quoted sentence.
- Transport: described as an internal browser-mediated call (`executeTool`), not a network protocol; no exposed wire transport documented in the reached pages.

5. Security model.
- Origin isolation: "WebMCP is only available in origin-isolated documents" (developer.chrome.com/docs/ai/webmcp, 2026-08-07).
- Permissions Policy `tools`, default `self`; cross-origin iframe access requires `allow="tools"` (same source).
- The spec (2026-09-14) devotes a security-considerations section to: prompt injection through tool metadata or outputs; misrepresentation of intent between agent and site; privacy leakage through over-parameterized tool inputs; same-origin boundary violations; private-browsing-mode interactions. Proposed mitigations: input length restrictions, shared attack-evaluation datasets, and annotation hints for read-only, untrusted-content, and consequential actions.
- Open issue #298, "§6.4: add page-enforced write boundaries as a mitigation for agent over-reach," and #288, "A user agent that both invokes tools and automates the page can complete the page's own human-approval step" — both name unresolved consent-bypass risks as of the issue list read 2026-09-15 (https://github.com/webmachinelearning/webmcp/issues).
- Open issue #282, "No structured way to signal a tool's refusal, distinct from success or a schema-validation error," is an open gap in the result/error model relevant to safety signaling.
- User-activation requirement for `registerTool` or `executeTool`: not directly stated in any fetched page; `Unknown`.
- The Edge explainer (archived 2025-07) separately raised, unresolved at that time: model-poisoning risk from front-end-supplied tools, and the risk of exposing content a user "would not typically be able to see."

6. Relationship to MCP.
- The spec frames a web page itself as "a client-side implementation of the Model Context Protocol" (spec fetch, 2026-09-14) — i.e., WebMCP tools are meant to line up with MCP's `tools/list`/`tools/call` shape rather than define a wholly separate schema, though the fetched pages do not quote a field-by-field mapping table.
- The MCP specification (https://modelcontextprotocol.io/specification/, schema dated 2026-07-28) defines Resources, Prompts, and Tools as server-offered features and Elicitation as a client-offered feature, plus extensions: Tasks (async long-running operations with polling and durable handles), "Skills over MCP," and MCP Apps (interactive UI rendered inline). None of these MCP-side extensions were found, in the pages reached, to have a stated WebMCP counterpart; `Unknown` whether WebMCP addresses resources, prompts, sampling, elicitation, or tasks.
- The Edge explainer (archived 2025-07) states the API "loosely aligns with" and "maps nicely to" MCP but is positioned as complementary rather than a wire-compatible implementation: MCP targets headless/server scenarios, Web Model Context targets local, human-in-the-loop browser workflows.
- No documented bridge letting a page expose a full MCP server (with resources/prompts/sampling) through WebMCP, or a WebMCP tool set through a real MCP server, was found in the sources reached; MCP-B's own products (see item 7) are the closest observed attempt at such a bridge, per its site's product listing.

7. Adjacent mechanisms.
- MCP-B: a Chrome extension and toolset that "helped inspire" WebMCP and now implements the W3C CG standard; ships `document.modelContext.registerTool()` usage, an `@mcp-b/transports` package, an `@mcp-b/mcp-iframe` package, and a free "Rook" Chrome extension (https://mcp-b.ai/, retrieved 2026-09-15). Exact named transport list ("tab," "extension," `postMessage`) was not confirmed verbatim on the fetched page; the page instead names npm package names without an explicit transport-type list.
- Chrome DevTools MCP: returns an accessibility-tree snapshot (`take_snapshot`) plus optional screenshots, positioned for debugging a page rather than driving it (search-result summary of https://stevekinney.com/writing/driving-vs-debugging-the-browser and https://mcp.directory/blog/chrome-devtools-mcp-vs-playwright-mcp-2026, retrieved 2026-09-15; neither page was fetched directly).
- Playwright MCP: Microsoft's MCP server driving Chromium, Firefox, and WebKit; feeds the agent "an agent-oriented AI projection" of the accessibility tree (`browser_snapshot`) with per-element refs (for example `@e1`) rather than screenshots or CSS/XPath selectors (same search-result summary; direct source pages not fetched).
- Chrome built-in Prompt API (`LanguageModel`): `developer.chrome.com/docs/ai/` groups "Built-in AI" task APIs and WebMCP tool registration as separate systems in the content reached; no statement found that the Prompt API calls WebMCP-registered tools (fetched 2026-09-15, page carried no publish date in the reached content). `Unknown`/likely-not-yet-integrated as of the pages reached.
- No Markdown-projection-of-pages tool was found described in any source reached in this pass; `Unknown`.

8. Open problems (from the sources' own issues and explainer sections only).
- Result/error signaling: no structured way to signal tool refusal distinct from success or schema-validation error (issue #282, https://github.com/webmachinelearning/webmcp/issues).
- Streaming/partial results: "Preserve what a tool already produced across the execution boundary" unifying three prior issues (#282, #299, #300 as merged into #308); "Let a tool deliver a final result on caller abort" (#299); "Run `executeTool` completion steps in parallel" (#305) — all indicate the current spec does not yet define streaming or partial-result delivery across abort/unregistration.
- Multimodal input/output support remains open (issues #41, #86, #81, per the README fetch's issue-title summary, retrieved 2026-09-15; not independently re-confirmed against the live issue numbers pulled in the second issues-page fetch, which returned different, higher-numbered issues — the repository's issue set evidently moved between the two fetches taken in this session).
- Declarative-API completeness: the spec document itself lists the declarative API and "detailed execution steps" as unfinished sections (spec fetch, 2026-09-14); issue #307 asks for caller-lifecycle clarity on non-autosubmit declarative tools; issue #286 asks whether `aria-label` should feed `toolparamdescription`.
- Cross-document/session state: issue #135 "cross-document tool response handling" (per README fetch) is open; no stated coverage for multi-page or multi-tab session continuity was found.
- Non-Chromium engine support: no shipping or committed status found for Firefox, Safari/WebKit, or other engines in any source reached; `Unknown`, consistent with the spec's CG (not multi-vendor W3C Working Group) status and Chrome being the only shipping/DevTrial implementation found.
- Skills coordination: issue "#161" (per README fetch's issue summary) names an open question about coordinating WebMCP tools with the separate "Skills over MCP" extension named in the MCP specification's own extensions list (item 6).

Distillate

- Match the real global and shape: `document.modelContext` (not `navigator.modelContext`), with `registerTool`/`getTools`/`executeTool`/`toolchange`, JSON-Schema `inputSchema`, async `execute`, and an `AbortSignal`-bearing `options` on `executeTool`.
- Match the declarative surface as a first-class parallel path: HTML form attributes (`toolparamdescription` confirmed by issue #286) feeding the same tool registry, not a manifest-based declaration (Edge explainer rejected manifests because they cannot execute code).
- Match the security posture: origin-isolated documents only; `Permissions-Policy: tools` defaulting to `self`; `allow="tools"` required for cross-origin iframe tool exposure; treat tool descriptions/annotations as untrusted unless from a trusted server (MCP spec) and provide read-only/untrusted-content/consequential-action annotations (WebMCP spec).
- Match the open failure-signaling gap rather than assume it is solved: no structured "tool refused" result exists yet (issue #282); an in-page server must not assume the spec settles this.
- Must avoid conflating this with MCP proper: WebMCP is explicitly positioned for local, human-in-the-loop browser workflows, not headless server-to-server MCP; it has no documented resources/prompts/sampling/elicitation/tasks counterpart.
- Can exceed the spec's current unfinished areas — streaming/partial-result delivery on abort, cross-document/session state, multi-tab continuity, structured refusal — since the spec's own issue tracker names them as open rather than decided.
- Measure a page-reading mechanism against Playwright's `browser_snapshot` (ref-annotated accessibility projection) and Chrome DevTools MCP's `take_snapshot`, both of which already solve token-cheap structured page reading outside WebMCP.
- Treat MCP-B/Rook as the nearest existing bridge attempt between an in-page registry and a real MCP server; no other documented bridge exists in the sources reached.
- Chrome version numbers for the preview conflict across sources (146 vs. 149); do not cite either as settled without re-verifying against `chromestatus.com/feature/5117755740913664` directly.

Unknowns

- Item 1: exact reconciliation of Chrome 146 (Canary flag) versus Chrome 149 (origin trial) as the shipping milestone.
- Item 1: whether any non-Microsoft, non-Google browser vendor has taken a position on WebMCP.
- Item 2: exact per-document/per-navigation/bfcache lifecycle of registered tools.
- Item 2: exact return type of `registerTool` (`Promise<undefined>` versus a handle), given the spec-page summary and the README summary disagree.
- Item 2: exact unregistration method name and signature.
- Item 3: exact declarative attribute names beyond `toolparamdescription`, and the exact form-submission-to-tool-call mapping.
- Item 4: which specific browser-side agent (Gemini in Chrome, an extension, or another) is the production caller in the shipping preview.
- Item 5: whether `registerTool` or `executeTool` requires transient user activation.
- Item 6: whether WebMCP has any stated position on MCP resources, prompts, sampling, elicitation, or the Tasks/MCP Apps extensions.
- Item 7: the exact named transport list MCP-B exposes (tab, extension, `postMessage`), not confirmed verbatim from the fetched page.
- Item 8: whether the open-issue numbers cited from the README fetch (#41, #86, #81, #135, #161) still match the live repository, since a later issues-page fetch in this same session returned a different, non-overlapping set of open issue numbers (#282–#308).

Journal: native lane, no journal

Deviation: none

<!-- The successor unit G5c (verbatim IDL, declarative attributes, lifecycle, samples) is appended below when it returns. -->

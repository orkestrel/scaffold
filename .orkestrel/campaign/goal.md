# Campaign goal — browser-native agent, tools, and MCP (2026-09-15)

## The user's request, restated as outcomes

1. **Agent placement.** `@orkestrel/agent` runs in a browser page alone, in a Node process alone,
   and across the two (agent on one side, model on the other), and each placement is proven by a
   test that runs there.
2. **In-page tools.** A website or web application constructs an `Agent` and a `Tool` in the same
   page, and when the model calls the tool, the tool executes in that page. No request leaves the
   browser for the tool call. `@orkestrel/tool` is the package the agent depends on for this, so it
   is grounded first.
3. **In-page MCP server.** A website or web application hosts an MCP server inside the page, and an
   agent in the same page calls it with no request leaving the browser. The design must match what
   WebMCP offers and exceed it where the existing packages already carry the parts (transports,
   sessions, tasks, elicitation, sampling, resources, prompts).
4. **Browser as the agent's reading arm** (second phase, after 2 and 3 are grounded).
   `@orkestrel/browser` holds a parsed HTML tree for a page, keeps it manageable for a model, and can
   project it to Markdown through `@orkestrel/markdown` to save tokens.
5. **WebMCP research.** Primary-source research on WebMCP and the browser-native tool mechanisms an
   agent must interoperate with, feeding the design of 2 and 3 and read against 4.

## Order

Ground `tool` and `mcp` (outcomes 2 and 3, with 1 as the placement proof) before `browser`
(outcome 4). Use what the first phase settles to brief the second.

## Exit criterion (candidate — fixed at the design step before any implementation dispatch)

Each capability ends implemented, repaired, retained, or intentionally excluded on evidence:

- C1 In-page tool execution: a Playwright `src:browser` test constructs an agent with a page-defined
  tool and a provider whose model output calls it, and asserts the tool ran in the page.
- C2 In-page MCP server and client: a Playwright test hosts `MCPServer` and `MCPClient` in one page
  over an in-page transport and completes `initialize`, `tools/list`, and `tools/call` with no
  network request.
- C3 Agent over MCP: an agent's tool manager can hold tools that resolve to an MCP server's tools,
  in the page, so the agent calls them the same way it calls a local tool.
- C4 Placement proofs for the agent: page alone, Node alone, relay across the two.
- C5 WebMCP parity map: a recorded matrix of WebMCP's surface against what the packages publish,
  each row implement, retain, or exclude with the source cited.
- C6 Browser reading arm: HTML tree held by the page object, projection to Markdown optional, with a
  test on a real Chromium page.
- C7 Guides, parity suites, and versions aligned for every touched package, gates green, in
  dependency order.

The design round refines this list; the re-baseline step may change which units run but never
moves this criterion without the user.

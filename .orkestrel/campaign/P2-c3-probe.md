# Probe P2 — an Agent over an in-process MCP server, no network (2026-09-15)

Instrument: `scratchpad/probe-c3/probe.mjs` (retained below), Node 24.20.0, run by the Orchestrator
against the PUBLISHED packages installed from the registry into a scratch directory:
`@orkestrel/agent` 0.0.22, `@orkestrel/mcp` 0.0.30, `@orkestrel/tool` 0.0.14.

Composition: `createMCPServer({ identity, tools })` bound with `bindServer` to
`createMessagePortTransport({ port: port1 })`; `createMCPClient({ transport:
createDuplexClientTransport(createMessagePortTransport({ port: port2 })) })` bound with
`bindClient`; `client.tools()` added to a fresh `ToolManager`; `createAgent(provider, { tools })`
with a scripted `ProviderInterface` whose turns are `add(2,3)`, then `missing()`, then the answer.

Controls:
- `globalThis.fetch` replaced with a thrower that counts calls (any network attempt fails loudly).
- A call to a tool the server does not hold (`missing`) must surface as a `ToolFailure`.

Reading (verbatim):

```json
{
  "definitionsSeenByAgent": ["add"],
  "executedInServer": 1,
  "toolEvents": [
    { "name": "add", "success": true, "value": 5 },
    { "name": "missing", "success": false, "value": "tool not found: missing" }
  ],
  "content": "the sum is 5",
  "partial": false,
  "roles": ["user", "assistant", "tool", "assistant", "tool", "assistant"],
  "fetchCalls": 0
}
```

What this established: with the packages as published, an agent's tool manager can hold an MCP
client's tools, the model's call executes in the MCP server's own `ToolManager` in the same
process over a `MessageChannel`, the agent's loop feeds the result back and continues, a missing
tool is a `ToolFailure` rather than a hang, and no `fetch` occurred.

What it did not establish: the same composition inside a Chromium page (this ran in Node, whose
`MessageChannel` is the Node implementation), the shape of the `Tool` the client wraps (its
`parameters` and `description` forwarding), abort propagation into the remote call, or behaviour
when the server side is a Web Worker.

Instrument: see `scratchpad/probe-c3/probe.mjs` copied here as `P2-c3-probe.mjs.txt`.

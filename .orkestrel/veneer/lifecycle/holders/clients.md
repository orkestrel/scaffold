# How clients deliver concurrent work to one MCP server

Primary-source research by an Opus researcher, 2026-10-04. Each fact names its source; the Unknowns list what no primary source settled.

## Facts

1. Claude Code: a subagent's `mcpServers` entry either names a server already configured in the session, which the subagent reuses, or defines one inline, which connects when the subagent starts and disconnects when it finishes ([Claude Code subagents](https://code.claude.com/docs/en/sub-agents)).
2. Claude Code: concurrent tool calls from several subagents in one session reach one shared connection. An open report (opened 2026-08-03) shows responses delivered to the wrong pending call when subagents call one remote connector at once ([claude-code issue 83457](https://github.com/anthropics/claude-code/issues/83457)).
3. Claude Code: an open report against v2.0.71 (2025-12-17) says calls in one message ran in parallel before that version and in sequence in it, with no maintainer answer ([claude-code issue 14353](https://github.com/anthropics/claude-code/issues/14353)).
4. Codex: a custom agent inherits `mcp_servers` from the parent unless its file declares its own ([Codex subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)).
5. Codex: spawned-agent threads run at once, capped by `agents.max_concurrent_threads_per_session` (same page).
6. Cursor: the MCP page says nothing about background, parallel, or subagent use of a server ([Cursor MCP](https://cursor.com/docs/context/mcp)).
7. MCP 2025-06-18, stdio: the client launches the server as a subprocess ([MCP transports](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports)).
8. MCP 2025-06-18, Streamable HTTP: the server is an independent process that can handle multiple client connections (same page).
9. MCP 2025-06-18: a session is identified only by the `Mcp-Session-Id` header assigned at initialization; the text names no caller identity inside a session (same page).
10. MCP 2025-06-18: each client message is its own HTTP POST, and a client may hold several SSE streams at once, so requests can be in flight together (same page).
11. MCP 2025-06-18: a request id is unique per requestor within a session ([MCP basic](https://modelcontextprotocol.io/specification/2025-06-18/basic)).
12. MCP 2025-06-18: `_meta` is a general metadata slot and defines no caller or subagent key (same page).

## Unknowns

- Whether Claude Code subagents that name a stdio server share the parent's one process; the documentation says "reuses" without naming the process model.
- Whether current Claude Code and Codex versions send calls to one server concurrently or in sequence.
- Whether Codex's inherited `mcp_servers` entry is a shared process or a new process per thread.
- Cursor on every question.
- Whether the specification requires a server to handle requests concurrently; only the 2025-06-18 revision was read.

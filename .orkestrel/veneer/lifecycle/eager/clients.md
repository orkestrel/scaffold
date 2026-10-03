# Eager browse: MCP lifecycle and client startup facts

Opus 5.5 researcher lane, 2026-10-03, every source fetched that day. Read-only. A fact the lane could not reach is listed under Unknowns.

## MCP specification (2025-11-25, same as 2025-06-18 except version strings)

- The client sends `initialize` first and "SHOULD NOT send requests other than pings before the server has responded" (see the lifecycle page, https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle).
- Before `notifications/initialized`, the server sends only pings and logging. The client sends `initialized` when it is ready for normal operation.
- An error reply to `initialize` is allowed (the page's example is code -32602, unsupported protocol version). The client's response is specified only for a version mismatch: it disconnects.
- A stdio server may end the session by closing its output and exiting.
- Implementations set timeouts on every request; on a timeout the sender cancels.
- Servers that send `notifications/message` declare the `logging` capability (https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging), which is declared in the `initialize` response.

## Clients

| Client | Startup timeout (default, setting) | Tool timeout (default, setting) | Failure display | Restart after exit |
| --- | --- | --- | --- | --- |
| Claude Code | 30 s, `MCP_TIMEOUT` in ms; servers connect in the background unless `MCP_CONNECTION_NONBLOCKING=0` | about 28 h, `MCP_TOOL_TIMEOUT` or a per-server `timeout`; stdio idle limit 30 min, `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` | `/mcp` shows `✘ Failed to connect` with the failure detail; a request that needs a still-connecting server waits for it | stdio servers are not reconnected automatically; the user reconnects from `/mcp` |
| Codex CLI | 10 s, `startup_timeout_sec` or `startup_timeout_ms` | 60 s, `tool_timeout_sec` | `/mcp`; startup fails when the server is marked `required = true` | not documented |
| Cursor | not documented | not documented | an error in chat, the tool call marked failed, the MCP Logs output panel | manual toggle |

Sources: the MCP page of Claude Code's docs (https://code.claude.com/docs/en/mcp), its Agent SDK MCP page (https://code.claude.com/docs/en/agent-sdk/mcp), and its environment variables page (https://code.claude.com/docs/en/env-vars); the Codex configuration reference (https://learn.chatgpt.com/docs/config-file/config-reference); Cursor's MCP docs (https://cursor.com/docs/context/mcp).

## Unknowns

- What a client does when `initialize` returns an error other than a version mismatch.
- Whether a server may send `notifications/message` before its `initialize` response.
- How each client shows a stdio server that exits before answering `initialize`, as distinct from a timeout.
- How Claude Code handles a stdio server that exits mid-session; the desktop Code tab's behavior.
- Codex and Cursor restart behavior; Cursor's timeouts.
- Some Codex, Cursor, and Claude Code environment-variable rows come from the fetch tool's summaries, not verbatim text.

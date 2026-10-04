# Eager `browse`: readings

Host: Windows 11, Node 24.21.0, Edge 154.0.4258.53, browser `main` at `50dee0c` with `@orkestrel/pool` 0.0.14 staged; 2026-10-04. Instruments and raw transcripts live in the browser checkout under `tmp/u11/`, `tmp/probes/eager/`, and `tmp/u12/`.

## U11: real clients

`tmp/u11/u11.ts` ran the built `dist/bin/main.js` once per client and case, with no saved client configuration: Claude Code through `claude -p --mcp-config FILE --strict-mcp-config`, Codex through `codex exec` with `-c mcp_servers.browse.*` overrides (the user's choice, 2026-10-04).

| Client | Case | What the client reported | What the agent saw |
| --- | --- | --- | --- |
| Claude Code | valid browser | `browse` connected | `navigate` and `look` ran |
| Claude Code | missing executable | `browse` connected | its first call answered `BROWSER_SERVER_UNAVAILABLE: spawn … ENOENT.` (T8: a client that skips the legacy `initialize` gate meets the onset refusal at its first `tools/call`) |
| Codex (`exec`) | valid browser | `browse` started | `look` ran; `navigate` was refused by Codex: "MCP tool call requires approval, but approval policy is never" (a client policy for a tool that is not read-only) |
| Codex (`exec`) | missing executable | the server was dropped after the `-32000` refusal | no `browse` tools at all; the cause reached neither the agent nor the `exec` output |

**Session end (A-29).** `tmp/u11/linger.ts` read the server after each client exited. Both clients ended the `browse` server before its teardown finished: the server pid was gone at the client's exit, and its `<pid>-<uuid>` profile folder stayed (checked again 15 s later). The folder held no `browse.json`, so the server was killed while it removed the profile, after the browser was destroyed. On Windows the browser also dies with its server (A13). The next start in the same root removes the folder by the dead-owner rule (A6). Cost: one partial profile folder per ended session until the next start; no browser left running.

**For U13.** The guide states the Codex approval for `browse`'s mutating tools, that Codex hides a server whose `initialize` fails (read its log), that Claude Code shows the refusal at the first call, and that profile folders from ended sessions are removed at the next start.

## U12: measurements

Pending: `tmp/u12/run.ts` runs M1, M2, M3, M4, M5, and M9 serially (started 2026-10-04).

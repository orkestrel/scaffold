# Codex transport contract

Every driver that carries a brief to the GPT-6 Astra bench follows this file. Routes: `analyst` (audit, objective design argument) and `astra` (implementation). A driver writes the brief, resolves the command, and returns the brief path, the command, and the journal path. The Orchestrator launches the run as a tracked background command under a cap it sizes from prior runs.

## Models and effort

```text
CODEX_ASTRA_MODEL=gpt-6-astra          effort high; xhigh only for a stated hard-reasoning need
CODEX_MECHANICAL_MODEL=gpt-6-sol       fully specified, taste-free units and drivers
CODEX_READING_MODEL=gpt-6-luna         absorption and research when the Cursor bench is dark; record the substitution
```

## Command

Use the journaled CLI for every unit. `codex mcp-server` was removed in Codex 0.154.0: never register it in an MCP configuration and never call an `mcp__codex__*` tool.

```text
node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/codex/<unit>.jsonl --errors tmp/codex/<unit>.err --cap <seconds> --status -- codex exec --json -C <checkout> --sandbox <sandbox> --model gpt-6-astra -c model_reasoning_effort="high" --output-last-message tmp/codex/<unit>-last.md "Read tmp/codex/<unit>-brief.md from disk and execute it exactly. Your final message is the report it specifies."
```

- Launch through the dispatch skill's `launch.ts` as the preceding block shows; it closes stdin, records `git status --porcelain` before and after, and kills the process tree at the cap. Write the brief with `scripts/brief.ts --lane codex`. Never write a `.sh` launcher.
- Codex appends piped stdin to the prompt; the launcher closes stdin so an inherited pipe adds nothing.
- Add `--skip-git-repo-check` outside a trusted repository and `--output-schema <file>` when the Orchestrator supplies one.
- The first journal event, `thread.started`, carries the session id. Read the answer with `node .agents/skills/orkestrel-dispatch/scripts/result.ts --codex tmp/codex/<unit>.jsonl`, which reads the last-message file, never stdout.
- Follow up with `codex exec resume <session-id> "<prompt>"`. Resume accepts `--model`, `-c`, and output flags, and inherits the session's directory; pass the sandbox and permissions you intend explicitly rather than inferring them from the session's former role.

## Sandbox by host

| Host                                             | `analyst`            | `astra`              |
| ------------------------------------------------ | -------------------- | -------------------- |
| POSIX, Claude Code Cloud                         | `read-only`          | `workspace-write`    |
| Windows (measured 2026-09-28 on the user's host) | `danger-full-access` | `danger-full-access` |

- On the measured Windows host `read-only` and `workspace-write` reject every shell command with `blocked by policy`. Recheck when the host or the Codex version changes. Under `danger-full-access` the brief states read-only where the route is read-only, and the launch script records `git status --porcelain` before and after; any difference is a deviation. This mode detects tracked changes only; it does not enforce read-only access.
- Recorded POSIX sandbox behavior, to recheck when conditions change: network denied, `.git` mounted read-only, loopback bind fails `EPERM`, a grandchild process is denied. Route installs, live fetches, servers, process-tree proofs, and lockfile generation to the Orchestrator or a native writer.
- A nested `git` inside the sandbox has reported `not a git repository` while the unit's own `git status` worked; name this in the brief so the unit does not diagnose the checkout.
- When a sandbox rejects a write, the unit stops and reports it. It never tries another write mechanism.
- A Windows shell write can re-encode text. Edit a line carrying a code point above `0x7F` with the exec's patch tool, never with `Set-Content`, `Out-File`, or `>`.

## Availability

- Probe with `node .agents/skills/orkestrel-dispatch/scripts/bench.ts --codex` before the first use in a session: it reads `codex --version` and `codex login status`, then runs one bounded exec and reports `live`. Neither the version nor the login status alone is liveness.
- Binary absent: report it; the Orchestrator names `npm install -g @openai/codex` to the user and re-probes when the user answers.
- Not logged in: the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/login.ts --codex` in the background, which journals `codex login --device-auth` to `tmp/codex/login.log`, prints the URL and the one-time code for the user, and polls the status until it answers; then it re-probes with `bench.ts --codex`.
- Recovery impossible: record the bench dark. `planner` and `reviewer` hold the objective lane too; `builder` takes fully specified mechanics.
- Never authenticate on the user's behalf, read an auth file, or substitute a key or token.

## Routing exclusion

The provider's content filter has ended turns that authored a violation construct, even as a negative test: sandbox escapes, resolution-bypassing imports, injection payloads, credential probes. Route such a unit to `opus` from the start and record the bench dark for that unit only.

## Journals

Journals live under `tmp/codex/` and are never committed. `.agents/orchestration.md` § Cleanup owns their deletion.

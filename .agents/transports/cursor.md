# Cursor transport contract

Every driver that carries a brief to the Cursor Grok bench follows this file. Route: `grok`. A driver writes the brief, resolves the command, and returns the brief path, the command, and the journal path. The Orchestrator launches the run as a tracked background command under a cap it sizes from prior runs. Read `.agents/orchestration.md` first; it owns the role set and the routing.

## Model

```text
CURSOR_GROK_MODEL=grok-4.7-high
```

Read from `agent models` on 2026-08-13. Re-read `agent models` and update this line when the id changes. Never guess or substitute a model id.

## Command

- Resolve the entry with `node .agents/skills/orkestrel-dispatch/scripts/bench.ts --cursor --resolve`: bare `agent` on a POSIX host; on Windows, the newest versioned install's own `node.exe` and `index.js` under `%LOCALAPPDATA%\cursor-agent\versions\`. Never launch through `agent`, `agent.cmd`, or `agent.ps1` on Windows: the shims can abort with Win32 `0xE9` when no console is attached and leave only a `SetConsoleWindowTitle` trace in the `.err` file. Read an empty shim run as a launch failure.
- Launch:

```text
node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/cursor/<unit>.jsonl --errors tmp/cursor/<unit>.err --cap <seconds> --status -- <node> <index> -p --trust --mode=ask --model grok-4.7-high --output-format stream-json "Read tmp/cursor/<unit>-brief.md and execute it exactly. Your final message is the document it specifies."
```

- Write the brief to `tmp/cursor/<unit>-brief.md` with `scripts/brief.ts --lane cursor`; the prompt is a pointer to it.
- Read the answer and the session id with `node .agents/skills/orkestrel-dispatch/scripts/result.ts --cursor tmp/cursor/<unit>.jsonl`. The `init` event carries the session id; resume through the CLI's `--resume` option, probed before its first use.
- A driver runs a lane finishing in about two minutes itself and returns the result. For anything longer its job ends at drafting: return the brief path, the resolved command, and the journal path. A driver never recommends a cap and never detaches a run.
- A driver pinned read-only writes nothing: it returns the brief text, its intended path, the resolved command, and the journal paths, and the Orchestrator writes and launches.

## Containment

- Never use `--force`.
- Never expose `CURSOR_API_KEY`, inspect unrelated environment values, or read credentials.
- Leave `tmp/cursor/` to the Orchestrator; `.agents/orchestration.md` § Cleanup owns retention.

## Availability

- `bench.ts --cursor` reporting `live: false` records the bench dark. Stop with a deviation naming the fallback from `.agents/orchestration.md` § Benches: Luna, then Sonnet. Never hand the reading to the Orchestrator, `planner`, or `analyst`. Never install or authenticate.
- Never route orchestration or acceptance across this bridge.

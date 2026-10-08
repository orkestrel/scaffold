# Claude transport contract

Every Codex-side driver that carries a brief to the Claude Opus 5.5 bench follows this file. Routes: `planner`, `reviewer`, `opus`. A driver writes the brief, resolves the command, and returns the brief path, the command, and the journal path. The Orchestrator launches the run as a tracked background command under a cap it sizes from prior runs. Read `.agents/orchestration.md` first; it owns the role set and the routing.

## Command

```text
node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/claude/<unit>.jsonl --errors tmp/claude/<unit>.err --cap <seconds> --status -- claude -p "Read tmp/claude/<unit>-brief.md and execute it exactly. Your final message is the report it specifies." --model opus --output-format stream-json --verbose --permission-mode <mode>
```

- Pass the permission mode the route pins and `--model opus` for every route. Never substitute another alias, `fable`, or a fixed Claude model id.
- Write the brief to `tmp/claude/<unit>-brief.md` with `scripts/brief.ts --lane claude`; the prompt is a pointer to it. Briefs never travel as shell arguments.
- Read the answer and the session id with `node .agents/skills/orkestrel-dispatch/scripts/result.ts --claude tmp/claude/<unit>.jsonl`. A unit with no journal ran on its driver's engine, however normal its answer reads.
- A driver pinned `workspace-write` writes the brief itself. A driver pinned `read-only` writes nothing: it returns the brief text, its intended path, the resolved command, and the journal paths, and the Orchestrator writes and launches.
- A driver never launches long work, recommends a cap, detaches, polls, restarts, or kills a run.

## Availability

- Probe with `node .agents/skills/orkestrel-dispatch/scripts/bench.ts --claude` before the first use in a session. `live: false` records the bench dark: return it at once with the fallback named, so the Astra main session records Opus unavailable for the round. Where the binary is absent, name the install command for the `claude` CLI so the Orchestrator can put it to the user in the same turn.
- Never install, authenticate, or substitute an API key, access token, or copied auth file.
- Never route orchestration or acceptance across this bridge. Never read credentials, edit, or spawn another agent.

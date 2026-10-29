# Claude transport contract

For harnesses that route work to the Claude Opus 5.5 bench, follow this file. Routes: `planner`, `reviewer`, `opus`. Read `.agents/orchestration.md` first; its Codex mapping uses native roles without this transport or a Claude probe. `.agents/skills/orkestrel-dispatch/SKILL.md` § Launch owns the driver and launch contract.

## Command

```text
node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/claude/<unit>.jsonl --errors tmp/claude/<unit>.err --cap <seconds> --status -- claude -p "Read tmp/claude/<unit>-brief.md and execute it exactly. Your final message is the report it specifies." --model opus --output-format stream-json --verbose --permission-mode <mode>
```

- Pass the permission mode the route pins and `--model opus` for every route. Never substitute another alias, `fable`, or a fixed Claude model id, except the consultant dispatch `.agents/orchestration.md` § Engines admits, which passes `model: fable` per invocation.
- Write the brief to `tmp/claude/<unit>-brief.md` with `scripts/brief.ts --lane claude`; the prompt is a pointer to it.
- Read the answer and the session id with `node .agents/skills/orkestrel-dispatch/scripts/result.ts --claude tmp/claude/<unit>.jsonl`. A unit with no journal ran on its driver's engine, however normal its answer reads.
- A driver pinned `workspace-write` writes the brief itself.
- A driver never launches long work, recommends a cap, detaches, polls, restarts, or kills a run.

## Availability

- Probe with `node .agents/skills/orkestrel-dispatch/scripts/bench.ts --claude` before the first bench use in a session. `live: false` records the bench dark: return it at once with the fallback named, so the Orchestrator records Opus unavailable for the round. Where the binary is absent, name the install command for the `claude` CLI so the Orchestrator can put it to the user in the same turn.
- Never install, authenticate, or substitute an API key, access token, or copied auth file.
- Never route orchestration or acceptance across this bridge. Never read credentials, edit, or spawn another agent.

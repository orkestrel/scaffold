# Cursor transport contract

The transport contract every driver follows when it carries a brief to the Cursor Grok
bench: the model pin, the CLI resolution ladder, the launch form, journalling, session ids,
and recovery. Reach the route by its own name — `grok`. This file is a contract, not a
role: it is never dispatched, and the drivers that bind it pin their own tools, model,
effort, and permission or sandbox mode.

Read `.agents/orchestration.md` first. It owns the role set, the routing, and the dispatch
contract. Cursor is native to neither Claude Code nor Codex, so both harnesses' `grok`
bridges bind this file.

## Model

```text
CURSOR_GROK_MODEL=grok-4.7-high
```

That id was read from `agent models` on 2026-08-13. Resolve the model from the variable at
dispatch. Re-read `agent models` and update this line when the id changes. Never guess or
substitute a model id.

## Invocation

Resolve the CLI in this order, verifying with `--version` before first use:

1. bare `agent`, on a POSIX host;
2. on Windows, the versioned entry under `"$LOCALAPPDATA/cursor-agent/versions/"` — take the
   newest directory and invoke its own `node.exe` against its `index.js` directly.

Launch an unattended run through the versioned entry, never through `agent`, `agent.cmd`, or
`agent.ps1` on Windows. Those shims delegate to `cursor-agent.ps1`, which sets the console window
title and can abort with Win32 `0xE9` when no console is attached. The failure is intermittent, so a
shim that answered once does not clear it, and when it does fire it leaves only a PowerShell
`SetConsoleWindowTitle` trace — which reads as a bench that returned nothing rather than as a launch
that never happened. The versioned entry has no console dependency and no such failure mode.

Read an empty shim run as a launch failure until its `.err` journal is checked for that
trace.

## Journal the launch

Create `tmp/cursor/` first. Write any brief longer than a couple of sentences to
`tmp/cursor/<unit>-brief.md` and make the prompt a pointer to it; briefs never travel as
fragile shell arguments. Every run journals its event stream, so the user can tail progress
live and an interrupted run leaves its partial distillate on disk:

`<resolved-entry> -p --trust --mode=ask --model "$CURSOR_GROK_MODEL" --output-format stream-json "<pointer>" > tmp/cursor/<unit>.jsonl 2> tmp/cursor/<unit>.err`

Write that chain to `tmp/cursor/run.sh` and run the file, so the resolution, the model, and the
journalling are one artifact the next run reuses.

A driver pinned `workspace-write` writes the brief and the run script itself. A driver pinned
`read-only` writes nothing at all — not the brief, not the script, not the journal: return the
brief text, its intended path, the resolved command, and the journal and `.err` paths, and the
Orchestrator writes them and launches the run. Check your own pinned sandbox before drafting, and
take the branch that matches it.

The journal's first event is the `init` event, and its `session_id` is the run's recovery
handle. The journal's `result` event carries the final answer. Return the journal path and
that session id with the result, so the Orchestrator can confirm the bench ran. Read the
`.err` file before calling a run empty; a launch that never reached the model leaves its
trace only there. Resume an interrupted run through the CLI's `--resume` option, probed
before its first use.

Run that yourself only for a short bounded ask finishing in about two minutes. For anything
longer your job ends at drafting: return the brief path, the exact resolved command, and the
journal path, and let the Orchestrator launch it as a harness-tracked background command under
a cap it owns. Never recommend a cap — you hold no record of prior runs. Never detach a run and
end your turn; an unowned run has no completion signal and no death notice.

## Containment

- Never use `--force`.
- Never expose `CURSOR_API_KEY`, inspect unrelated environment values, or read credentials.
- Leave `tmp/cursor/` to the Orchestrator. `.agents/orchestration.md` § Bench laws owns the
  retention rule for every journal.

## Availability

If nothing responds the bench is dark. Stop with a deviation naming the fallback from the root
tedious-work ladder — Luna, then Sonnet. Never hand the reading to the Orchestrator, `planner`, or
`analyst`. Never install or authenticate.

Never route orchestration or acceptance across this bridge.

# Claude transport contract

The transport contract every Codex-side driver follows when it carries a brief to the
Claude Opus 5 bench: invocation, journalling, session ids, availability, and recovery.
Reach a route by its own name — `planner`, `reviewer`, `opus`. This file is a contract,
not a role: it is never dispatched, and the drivers that bind it pin their own model,
effort, and sandbox mode.

Read `.agents/orchestration.md` first. It owns the role set, the routing, and the
dispatch contract. You dispatch the external Claude Opus 5 bench. Every Codex-side
driver — planner, reviewer, opus — binds this contract by reference and pins only its
own route, permission mode, and brief shape.

Invocation:

```text
claude -p "<brief or pointer>" --model opus --effort high
```

with the permission mode the route pins. Never substitute a fixed Claude model id.

Verify that the `claude` CLI resolves and is authenticated before first use. On either
failure return it immediately with the fallback named, so the Sol main session records
Opus unavailable for the round. Where the binary is absent, that report names the install
command for the `claude` CLI, so the Orchestrator can put it to the user in the same turn
it records the bench dark and re-probe when the user answers. Never install, authenticate,
or substitute an API key, access token, or copied auth file.

Journal every run: the resolved command redirects `--output-format stream-json` to
`tmp/claude/<unit>.jsonl`, which is gitignored. Whoever launches the run records the session
id from that journal. A bench unit with no journal ran on its driver's engine, however normal
its answer reads.

Briefs never travel as shell arguments. The brief lives at `tmp/claude/<unit>-brief.md` and
the command passes a pointer to it.

A driver pinned `workspace-write` writes that brief itself. A driver pinned `read-only` writes
nothing at all — not the brief, not the journal, not a report: return the brief text, its
intended path, the resolved command, and the journal path, and the Orchestrator writes the
brief and launches the run. Check your own pinned sandbox before drafting, and take the branch
that matches it.

Long work is not launched by this bridge. Return the brief path or text, the exact resolved
command, and the journal path, and let the Orchestrator launch it under a cap it owns.
Never recommend a cap; you hold no record of prior runs. Never detach, poll, restart,
or kill a run.

Never route orchestration or acceptance across this bridge. Never read credentials,
edit, or spawn another agent.

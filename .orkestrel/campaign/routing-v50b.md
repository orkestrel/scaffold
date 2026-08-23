# Routing ledger — the setup-proof and browser-stage round

## Bench liveness, 2026-08-23

| Bench       | CLI resolves | Authentication | Round trip | Verdict |
| ----------- | ------------ | -------------- | ---------- | ------- |
| Codex / Sol | yes, v0.149.0 | `codex login status` reports "Not logged in" | not attempted | **dark** |
| Cursor / Grok | yes | reachable | not attempted this round | available |

Recovery was started in the same turn the probe reported the bench dark, not deferred. `codex login
--device-auth` was launched detached with its output captured under `tmp/codex/login.log`, the
verification URL and one-time code were surfaced to the user immediately, and a watcher polled the
authentication state for the full fifteen minutes the code lives. The code expired unclicked and the
login process was terminated by process id. No API key, access token, copied auth file, or
alternative login flow was substituted.

## Lane assignment

`.agents/orchestration.md` fixes that when Sol is dark in Claude Code, Opus 5 runs every lane —
still separate subagents, still clean contexts, still blind to each other, each told which
perspective it holds. That substitution was applied and is recorded here rather than absorbed.

| Lane       | Default engine | Engine that ran | Executor | Context |
| ---------- | -------------- | --------------- | -------- | ------- |
| Subjective | Opus 5         | Opus 5          | `planner` | clean, blind |
| Objective  | GPT-5.6 Sol    | **Opus 5 (substituted)** | read-only design subagent, explicitly charged with the objective perspective | clean, blind, forbidden from reading any file named `*subjective*` |

The subjective lane's answer was withheld from the campaign folder and held outside the repository
until the objective lane returned, so the objective lane could not read it even by accident.

## Dispatch deviation, recorded

The subjective lane's brief named a shell heredoc as its output mechanism, and the `planner` role's
allowlist carries no Bash. The lane could not write its answer file, reported the rejection rather
than finding another write mechanism, and returned the answer inline. The Orchestrator transcribed
it. This is a failure of the brief-check rule requiring the output mechanism to be checked against
the executor's tool allowlist; the objective lane's dispatch was corrected before launch.

## What the round owes the user

Sol held the objective lane in the round that produced the reconciled distribution design, and its
requirement for a real-browser stage is what the user ruled on. This round's objective lane runs on
the substitute engine. When the bench comes live the objective lane can be re-run on Sol against the
identical brief and the reconciliation re-taken; nothing downstream of it has been implemented.

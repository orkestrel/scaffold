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

## Both benches came live before publication, 2026-08-23

The user authorized the Codex device flow, and Cursor was reachable throughout. Both were recorded
live on a **round-tripped model call**, not on a version string or an authentication check — either
of those passes while an account is out of quota, while the routed model is unavailable to it, and
inside a sandbox with the network denied.

| Bench         | Model                  | Round trip | Evidence |
| ------------- | ---------------------- | ---------- | -------- |
| Cursor / Grok | `cursor-grok-4.5-high` | returned   | `tmp/cursor/probe.log`, exact three-word reply |
| Codex / Sol   | `gpt-5.6-sol`          | returned   | thread `01a02e6a-d137-78c0-85cd-b90ffe1d4e36`, exact three-word reply |

## What that changes, and what it does not

It does not change the code, which was finished and driven against ten real published packages while
both lanes were held by Opus. It changes the **provenance of the rulings**. Every design decision in
this campaign was reconciled with one engine holding both lanes, recorded as a substitution each
time.

The objective lane now runs on its rightful engine against the identical pre-publication brief and
its successor, blind to the Opus objective lane running beside it. Its journal is
`tmp/codex/audit-sol.jsonl`, thread `01a02e6b-cb79-7ff2-af42-cc1a5dde4dc5`.

The brief names the sandbox limits up front rather than letting the lane spend its round finding
them: the exec unshares the network, so the packed-tarball and `prepublishOnly` claims are
unmeasurable there and are ruled on supplied evidence; a loopback listener is denied, so the browser
half of two claims cannot be driven; a grandchild process is denied; and a nested `git` reports "not
a git repository" while the lane's own `git status` succeeds, which reads as a broken checkout and
is not one.

Grok holds no lane. Absorption is its charter, and it swept the whole chain for behavioural changes
no claim names — the one question the audit cannot answer about itself.

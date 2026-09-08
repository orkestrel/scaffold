# Agent final host instruments check

1. A1 — CONFIRMED

Evidence: `tmp/pass/agent-final-host.sh:101-109` requires the agent checkout, branch, exact baseline, clean staged/untracked state, and bounded dirty paths before capture. The EXIT handler at lines 75-99 captures final status and diffs and preserves a failing command or capture failure. The before and after status, worktree diff, and cached diff are compared at lines 92-95.

2. A2 — CONFIRMED

Evidence: `tmp/pass/agent-final-host.sh:111-116` filters only added or deleted source lines after removing diff headers and rejects any changed content not beginning with the permitted comment prefixes. Rejected lines are retained in `source-runtime.txt` and printed before failure. `check_writes` at lines 65-73 requires the actual combined docs summary shape from `scripts/docs.ts:447-449`, rejects any other summary, and the `run` calls at lines 119-123 log both directions and the core observation. No dry-run claim or vendored edit appears. Opening-header comparison remains separate per `tmp/units/d7n-agent-final-host-instruments-brief.md`.

3. Root config diagnostics — CONFIRMED

Evidence: `tmp/pass/run-guide-config-scout.sh:4-15` reads the route pin, requires the brief and fresh journal/stderr paths, records before/after status through an EXIT trap, attaches no target, invokes the resolved versioned entry in ask mode with the bounded read-only prompt, and caps the run at 900 seconds. `tmp/pass/guide-config-host.sh:5-10` refuses a stale log, redirects output, records the exact isolated test command, and preserves its exit through the EXIT trap. Neither script installs, writes source, forces state, discards changes, publishes, or reads credentials.

Syntax evidence: `bash -n tmp/pass/agent-final-host.sh`, `run-guide-config-scout.sh`, and `guide-config-host.sh` each exited 0. No script body, package gate, build, install, or review interaction ran.

VERDICT: PASS

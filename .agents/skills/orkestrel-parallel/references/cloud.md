# Cloud sandbox as a lane host

A cloud sandbox session that runs Claude Code on a remote machine. `.claude/AGENTS.md` § Cloud owns its setup hooks; `.agents/transports/codex.md` owns the Codex sandbox on POSIX and Cloud; `.agents/platforms/` owns the host shell.

## Mechanics

A row marked unmeasured carries no lane until a measurement on the host answers it.

| Question            | Cloud sandbox                                                                                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Start               | The parent starts a session through the remote trigger. A subagent cannot load the remote trigger (2026-10-28).                                                                                 |
| Continue            | Unmeasured.                                                                                                                                                                                     |
| Wake versus deliver | Unmeasured.                                                                                                                                                                                     |
| Track               | The session identity the trigger returns. The parent reads the session's log itself; the log reader truncates a long final report (2026-10-28).                                                 |
| Background          | Unmeasured.                                                                                                                                                                                     |
| Isolation           | The sandbox refuses `git checkout`, `clean`, `reset`, `restore`, and `stash drop`, so a lane cannot restore its own checkout; give each trial phase a fresh clone or scratch copy (2026-10-28). |
| Tools               | Shell and file tools inside the sandbox; the git refusals above. The stop hook asks to commit and push (2026-10-28).                                                                            |
| Limits              | Unmeasured.                                                                                                                                                                                     |
| Host effects        | Unmeasured.                                                                                                                                                                                     |
| Visibility          | Unmeasured.                                                                                                                                                                                     |
| Capability map      | Unmeasured.                                                                                                                                                                                     |

## Quirks

- When a trial needs a clean tree, run each phase in a fresh clone or scratch copy; the sandbox refuses `git checkout`, `clean`, `reset`, `restore`, and `stash drop`.
- When the stop hook asks to commit and push, a dispatched role never commits or pushes, and a peer session's brief says whether it does.
- When a session's result is needed, the parent reads the session's log itself; a subagent cannot load the remote trigger.
- When a session's final report may run long, ask in the brief for a short structured summary as the last message; the log reader truncates a long final report.

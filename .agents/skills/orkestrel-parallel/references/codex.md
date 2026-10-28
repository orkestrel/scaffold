# Codex as a lane host

Native Codex agents, and Codex lanes another harness hosts. `.codex/config.toml` owns loading and roles; `.agents/transports/codex.md` owns the Codex CLI as a bench; `.agents/platforms/` owns the host shell.

## Mechanics

| Question            | Codex                                                                                                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Start               | A native Codex agent when it supports the selected model and no model options are requested or inherited; otherwise the hosting harness's child-task channel (`references/t3.md`) or the CLI bench. |
| Continue            | `followup_task` resumes an idle native agent. A CLI bench resumes with its recorded session's resume command.                                                                                       |
| Wake versus deliver | `followup_task` wakes an idle agent; `send_message` delivers information and wakes no idle agent.                                                                                                   |
| Track               | The native agent id or the CLI session id, kept apart from a long command's shell session and process ids.                                                                                          |
| Background          | The shell tool yields after a short interval and leaves the command running (about 30 seconds on `npm run check`, 2026-10-22). It takes a yield interval and no timeout.                            |
| Isolation           | Lanes share the checkout unless the host harness creates a worktree.                                                                                                                                |
| Tools               | The sandbox mode decides shell access by host; `.agents/transports/codex.md` § Sandbox by host owns it.                                                                                             |
| Limits              | At the account's usage limit, a run ends with a `turn.failed` event that names the reset time, and later launches fail until then; record the bench dark and its reset time.                        |
| Host effects        | Codex lanes leaked no console host beside a leaking Cursor lane (2026-10-19).                                                                                                                       |
| Visibility          | A CLI bench is hidden; run it only as a capped command inside a visible lane. Not measured for a native agent.                                                                                      |
| Capability map      | `.agents/orchestration.md` § Roles, Codex column.                                                                                                                                                   |

## Quirks

- When a Codex lane runs a long command, brief the yield fallback before launch: the longest yield interval, output to a file, process-list reads until the tracked command exits, and no kill. The lane cannot set a timeout; brief it to proceed without asking for one.
- When the shell yields before the command exits, start nothing else, and confirm no owned leftover remains before the next lane; a lane that started the next test file broke the one-runner bound (2026-10-22).
- When a brief launches a long command, name its terminal record, such as the launcher's `exit=` line; a lane read a finished step as running and polled it for six minutes (2026-10-22).
- When a review brief describes risks in offensive-security wording, the provider's filter can end the lane without a verdict (2026-10-20). Brief the review as quality assurance of the user's own code in neutral words, require an early verdict file, retry once, then use a recorded fallback.
- When a `codex exec` run is killed, treat it as dead only when its `codex-code-mode-host` child is gone too.
- When a Codex child runs through a hosting harness, it can reach that harness's messaging tools; probe them before a writer or runner depends on them (`references/t3.md`).
- When a launch fails on a tool server's handshake timeout, relaunch that lane alone; a lane beside it started with the same server (2026-10-19). Stagger launches that start the same server.

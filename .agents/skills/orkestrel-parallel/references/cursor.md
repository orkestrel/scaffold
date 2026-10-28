# Cursor as a lane host

Cursor lanes, through the Cursor CLI or a hosting harness. `.cursor/rules/orchestration.mdc` owns loading; `.agents/transports/cursor.md` owns the Cursor CLI as a bench; `.agents/platforms/` owns the host shell.

## Mechanics

| Question            | Cursor                                                                                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Start               | The CLI bench per `.agents/transports/cursor.md`, or the hosting harness's child-task channel (`references/t3.md`).                                                                                          |
| Continue            | The CLI's `--resume` option with the session id from the `init` event continues the session with its read context intact (2026-10-01); probe it before its first use.                                        |
| Wake versus deliver | No peer-message wake channel is demonstrated.                                                                                                                                                                |
| Track               | The session id from the `init` event and the journal path.                                                                                                                                                   |
| Background          | The CLI runs under `.agents/skills/orkestrel-dispatch/scripts/launch.ts` with a cap. A lane outlived its stated 600-second timeout by running 764 seconds (2026-09-30).                                      |
| Isolation           | Lanes share the checkout.                                                                                                                                                                                    |
| Tools               | The bench runs in ask mode, read-only. It reads images: it read a capture's heading, captions, and fills exactly (2026-10-16).                                                                               |
| Limits              | At the account's usage limit, the bench reads dark; record it and use the native reader per `.agents/orchestration.md` § Benches.                                                                            |
| Host effects        | A Grok lane that ran shell commands leaked `conhost.exe` processes on a Windows host (2026-10-19; see `.agents/platforms/windows.md` § Processes). Briefs that forbade every command ran clean (2026-10-21). |
| Visibility          | The CLI bench is hidden; run it only as a capped command inside a visible lane.                                                                                                                              |
| Capability map      | Reader only: the `grok` role.                                                                                                                                                                                |

## Quirks

- When a Cursor lane is briefed, forbid every shell command and give it one file in and one file out; read and search tools carry absorption work.
- When a lane must return a long distillate, ask for bounded slices and continue the session for each; one final message was cut at 11.4 KB mid-sentence (2026-10-01).
- When a Cursor lane runs, count console and window processes at each launch, and clear orphans only when none of your lanes is live.
- When a lane would write source, run checks, or wait for messages, route it elsewhere; Cursor has no demonstrated wake channel.
- When a Cursor lane's duration matters, read the harness's actual cap; a stated timeout did not stop a lane.
- When a hosting harness launches a Cursor lane, pass no model options (`references/t3.md`).
- When a lane needs another family's model, launch it through that family's own harness, per `.cursor/rules/orchestration.mdc`; a Claude lane through Cursor failed at launch twice (2026-10-20).

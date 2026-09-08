# Windows bootstrap

The continuation starts from scaffold commit `b905d3c2732b4f507e231bff18bfb370643fc1de`.
Fleet preparation is in progress. No package closure or publication has occurred in this session.

The host readings came from `tmp/pass/host-check.sh` on 2026-09-08T12:48:12Z.

| Reading | Result |
| --- | --- |
| Node | `v24.20.0` |
| npm | `12.0.2` |
| Git | `2.55.0.windows.5` |
| Python | `3.14.7` |
| `nproc` | `16` |
| Shell | Git Bash at `C:/Users/mikes/scoop/apps/git/current/bin/bash.exe` |
| Scaffold | `C:/Users/mikes/WebstormProjects/scaffold` |
| Fleet | `C:/Users/mikes/WebstormProjects` |
| Scratch | `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass` |

The native objective route returned `LIVE: native analyst round trip completed` from the
`d7n_session_sol_liveness` dispatch. The previous session's substitution for that route no longer applies.

The subjective route returned `LIVE` with exit `0`. Its journal is
`tmp/claude/d7n-session-reprobe.jsonl`, session `e79cb3bd-578d-4db1-8c30-9ef742169634`.
The earlier probe reported a transient OAuth refresh failure. The retry completed without a login change.

The reading route returned `LIVE` with exit `0`. Its journal is
`tmp/cursor/d7n-session-liveness.jsonl`, session `15758d7e-6d5c-4e07-a26b-9050a5791402`.
The Windows launch uses the installed versioned entry directly.

Scaffold has owner edits in `package.json` and `package-lock.json`, including staged lockfile content.
Campaign commits select the campaign directory explicitly. The bootstrap does not install into scaffold.

The `port-bootstrap.sh` instrument ran the retained porting script and fetched scaffold's remote.
The working branch and `origin/main` resolved to the starting commit. The `run-clone.sh`
instrument runs the retained fleet clone and install script under a `7200` second cap.
The guide cloned at `1d5afa3`. Packing, installed hashes, and the remaining branch checks are pending.

The designated scaffold branch is `claude/docs-parity-windows-01a0810d`.
The commit trailer identifies this session as
`Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743`.

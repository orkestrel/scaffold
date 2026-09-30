# Long-running commands

Apply these rules to every command that outlives the turn that starts it: a bench exec, a Workflow, an install, a build, a publish chain.

## Launch

- Launch as a harness-tracked background command through `scripts/launch.ts` under a hard cap. Never detach a run from inside a dispatched agent; an unowned run has no completion signal and no death notice.
- Write a multi-step chain as a TypeScript file run by `node`, with an opening comment naming its log, its cap, and what changed from the file it supersedes. Never edit a script while it runs: copy, edit the copy, launch the copy.
- On Windows, keep every program-carrying command in a file: a heredoc, `node -e`, an `&&` chain, or a `${...}` argument trips the approval classifier.
- Run the first use of any flag, subcommand, or quoting form in a throwaway probe, never inside a unit.
- Keep network-dependent work (installs, lockfile generation, live fetches) out of sandboxed bench execs.
- Confirm the journal advanced past its header before recording the launch as started; `scripts/result.ts` reports `bytes` and `ageMs`.
- Never push a git commit through a hosting REST API when a file's content must ride in the request; the per-call cap truncates it.

## Watch

- Arm one Monitor per long exec, filtered to milestones and terminal states, exiting on the terminal event. Never stream the raw journal.
- A Workflow journal writes only at agent start and result; read liveness from the newest subagent transcript. Recover with `resumeFromRunId`.
- Judge a unit by the tree it changes: owned-file mtimes, suite counts, its report file. Check before killing anything; a unit killed on a false signal loses unwritten work.

## Kill and relaunch

- Take the child's `pid` from the spawn line `scripts/launch.ts` prints when the command starts, or from `<journal>.pid`. Never take it from a pattern match over command lines, and never run `pgrep -f` or `pkill -f`.
- On a POSIX host, read liveness with `kill -0 <pid>` (exit 0 means alive), list descendants by running `ps -A -o pid= -o ppid=` and taking the rows whose ppid is the recorded pid, then each listed id in turn, print the list, then kill each listed id and the recorded pid with `kill -KILL <id>`.
- On Windows under Git Bash, write every Windows slash option as `//`. Read liveness from the output of `tasklist //FI "PID eq <pid>" //NH`, never from its exit code: a row naming `<pid>` means alive, and the `INFO:` line means gone. Alternatively, read the `WINPID` column of `ps -W`. Never read liveness with `kill -0` or `ps -eo`. List descendants with `powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter 'ParentProcessId=<pid>' | Select-Object -ExpandProperty ProcessId"` applied to each listed id in turn, print the list, then kill the recorded tree with `taskkill //pid <pid> //T //F`.
- Refuse a list holding PID 1, the harness shell, or an id outside the descent of the recorded pid. At the cap, `launch.ts` kills the tree on Windows and the command alone on any other host; on a POSIX host, kill the listed descendants of a capped run by hand.
- Confirm the recorded process and every listed descendant are gone before another writer takes the files. A killed `codex exec` is dead only when its `codex-code-mode-host` child is gone too. Check owned-file mtimes before dispatching the substitute.
- Re-run a timing failure alone, after the unit exits, before believing it; a unit's own re-run is never alone.

## Cap

Size the cap from the `durationMs` that `scripts/result.ts` reported for comparable runs, plus a gate allowance, plus slack. Record the duration beside the result so the next cap has a measurement. A cap-killed exec (`capped=true`, exit 124) reads exactly like a real failure; check the cap first.

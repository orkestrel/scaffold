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

- `scripts/launch.ts` prints the child's `pid`. Read liveness from it with `kill -0 <pid>`, or by executable name and parent with `ps -eo pid,ppid,comm`. Never read it from a pattern match over command lines; a shell whose own command line contains the pattern matches itself.
- Kill only a recorded process id and the descendants you listed from it with `ps --ppid <pid> -o pid=`; print the list, then kill. Never `pkill -f` or `pgrep -f`. Refuse a list holding PID 1, the harness shell, or an id outside the descent. At the cap, `launch.ts` kills the tree itself.
- Confirm the recorded process and every listed descendant are gone before another writer takes the files. A killed `codex exec` is dead only when its `codex-code-mode-host` child is gone too. Check owned-file mtimes before dispatching the substitute.
- Re-run a timing failure alone, after the unit exits, before believing it; a unit's own re-run is never alone.

## Cap

Size the cap from the `durationMs` that `scripts/result.ts` reported for comparable runs, plus a gate allowance, plus slack. Record the duration beside the result so the next cap has a measurement. A cap-killed exec (`capped=true`, exit 124) reads exactly like a real failure; check the cap first.

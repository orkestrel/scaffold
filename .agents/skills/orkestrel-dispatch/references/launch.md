# Long-running commands

Apply these rules to every command that outlives the turn that starts it: a bench exec, a Workflow, an install, a build, a publish chain.

## Launch

- Launch as a harness-tracked background command through `scripts/launch.ts` under a hard cap, per § Launch ownership.
- Spawn a package manager through its JavaScript entry; `.agents/platforms/<platform>.md` names the entry and the shell quirks of each host.
- Write a multi-step chain as a TypeScript file run by `node`, with an opening comment naming its log and its cap. Never edit a script while it runs: copy, edit the copy, launch the copy.
- Run the first use of any flag, subcommand, or quoting form in a throwaway probe, never inside a unit.
- Keep network-dependent work (installs, lockfile generation, live fetches) out of sandboxed bench execs.
- Confirm the journal advanced past its header before recording the launch as started; `scripts/result.ts` reports `bytes` and `ageMs`.

## Launch ownership

- Give every run one owner whose lifetime exceeds the run: the owner holds the journal, the pid file, and the cap. A dispatched agent never detaches a run; its turn can end before the run does.
- When the expected duration exceeds the harness's background cap or idle-session window, which its page under `.agents/skills/orkestrel-parallel/references/` states, the Orchestrator starts the run outside the session's process tree by the detach procedure of `.agents/platforms/<platform>.md`. Record the journal and pid-file paths in the unit's records before the launch, and read liveness from the journal. No other session kills that pid.
- On a host whose platform page records no proven detach procedure, keep the session in its turn for the run's whole duration.

## Watch

- Watch each long exec through one harness-native watcher, the one its page under `.agents/skills/orkestrel-parallel/references/` names, filtered to milestones and terminal states and exiting on the terminal event; on a harness with none, wait for its completion notice. Never stream the raw journal.
- Read a harness fan-out run's liveness and recover it per its page under `.agents/skills/orkestrel-parallel/references/`.
- Judge a unit by the tree it changes: owned-file mtimes, suite counts, its report file. Check before killing anything; a unit killed on a false signal loses unwritten work.

## Kill and relaunch

- Take the child's `pid` from the spawn line `scripts/launch.ts` prints when the command starts, or from `<journal>.pid`. Never take it from a pattern match over command lines, and never run `pgrep -f` or `pkill -f`.
- Read liveness, list descendants, and kill with the commands of `.agents/platforms/<platform>.md`: list every descendant of the recorded pid, print the list, then kill each listed id and the recorded pid.
- Refuse a list holding PID 1, the harness shell, or an id outside the descent of the recorded pid. At the cap, `launch.ts` kills what the platform page states; kill the remaining listed descendants by hand.
- Confirm the recorded process and every listed descendant are gone before another writer takes the files. Check owned-file mtimes before dispatching the substitute.
- Re-run a timing failure alone, after the unit exits, before believing it; a unit's own re-run is never alone.

## Cap

Size the cap from the `durationMs` that `scripts/result.ts` reported for comparable runs, plus a gate allowance, plus slack. Record the duration beside the result so the next cap has a measurement. A cap-killed exec (`capped=true`, exit 124) reads exactly like a real failure; check the cap first.

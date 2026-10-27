# POSIX host

The commands an agent runs on a Linux or macOS host. `.claude/rules/portability.md` owns product code that runs on these hosts; `.agents/skills/orkestrel-dispatch/references/launch.md` owns the portable launch and kill procedure this page serves.

## Processes

- Read liveness with `kill -0 <pid>`; exit 0 means alive.
- List descendants by running `ps -A -o pid= -o ppid=`, taking the rows whose parent is the recorded pid, then each listed id in turn. Never take a pid from `pgrep -f` or `pkill -f`.
- Kill each listed id and the recorded pid with `kill -KILL <id>`. `launch.ts` kills only the command at its cap on this host; kill the listed descendants of a capped run by hand.
- No detach procedure is proven on this host. Before a run relies on one, prove that a detached run outlives the harness's idle stop, and record the procedure here with its date.

## Shell

- Gate a command on the previous one with `&&`, and read `$?` immediately after the command it reports on.
- Pass arguments as an array from a TypeScript launcher rather than through shell quoting.

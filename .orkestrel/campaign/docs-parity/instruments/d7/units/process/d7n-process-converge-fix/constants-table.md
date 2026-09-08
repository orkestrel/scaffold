The defaults and host bounds, from `@orkestrel/process`.

A `Shape` cell holds the constant's declared type.

| API | Kind | Shape | Summary |
| --- | --- | --- | --- |
| `PROCESS_GRACE` | const | `number` | Names the default cooperative POSIX window, 5000 ms, between `SIGTERM` and `SIGKILL` during termination. |
| `PROCESS_CONFIRMATION` | const | `number` | Names the window, 5000 ms, a termination waits for the child's native exit after the final kill. |
| `PROCESS_DRAIN` | const | `number` | Names the default window, 1000 ms, the package waits for the child's read ends to close after the child's native exit or after a termination this package initiated, before cutting them off. |
| `PROCESS_EVIDENCE` | const | `number` | Names the default maximum retained stderr tail, 2048 bytes, for a supervised `ProcessInterface`. |
| `PROCESS_BACKLOG` | const | `number` | Names the default soft high-water mark, 10485760 bytes, for a supervised `ProcessInterface` line backlog. |
| `PROCESS_OUTPUT` | const | `number` | Names the default maximum captured bytes, 10485760 each, for a one-shot run's stdout and stderr. |
| `PROCESS_TIMER` | const | `number` | Names the largest timer delay, 2147483647 ms, the host schedules without truncating it to one. |
| `PROCESS_PATHEXT` | const | `string` | Lists the executable extensions a Windows lookup applies when the environment declares no `PATHEXT`, `.COM;.EXE;.BAT;.CMD`. |
| `PROCESS_ERROR_CODES` | const | `readonly ProcessErrorCode[]` | Lists the machine-readable failure categories a `ProcessError` carries, in declaration order: `spawn`, `timeout`, `input`, `duplicate`, `protocol`, and `invalid`. |

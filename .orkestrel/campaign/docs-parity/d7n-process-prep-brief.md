# Brief — P.1 `d7n-process-prep` (process's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/process` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `a6a7c2a`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

process's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== process 2026-09-07T16:39:09Z tarball sha256 7c24b68bca15d128
== before
0.0.17
(status end)
== replaced range
90:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 848ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### process (a6a7c2a, version 0.0.10, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 32 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/src/server/processes/Supervisor.test.ts(1)
-- docs
   guides/process.md function validateText: guide "Refuse a spawn-bound string that is empty when required or carries NUL." source "Validates one spawn-bound string."
   guides/process.md function validateTimer: guide "Refuse a timer option outside `[0, PROCESS_TIMER]` or not a whole millisecond." source "Validates one timer-valued option in milliseconds."
   guides/process.md function validateBytes: guide "Refuse a byte option below its minimum or not a safe integer." source "Validates one byte-valued option."
   guides/process.md function validateEnvironment: guide "Refuse an environment override whose name is empty or whose text carries NUL." source "Validates every spawn-bound string of one environment override map."
   guides/process.md function validateCommand: guide "Refuse a command whose file, arguments, or environment carry bad text." source "Validates every spawn-bound string of one command."
   guides/process.md function validateWorkspace: guide "Refuse a working directory that is empty or carries NUL." source "Validates the working directory one child starts in."
   guides/process.md const PROCESS_GRACE: guide "Default POSIX milliseconds between `SIGTERM` and `SIGKILL`." source "Names the default cooperative POSIX window in milliseconds between `SIGTERM` and `SIGKILL` during termination."
   guides/process.md const PROCESS_CONFIRMATION: guide "Milliseconds a termination waits for the native exit after a kill." source "Names the window in milliseconds a termination waits for the child's native exit after the final kill."
   guides/process.md const PROCESS_DRAIN: guide "Default milliseconds a termination waits for the streams to close." source "Names the default window in milliseconds the package waits for the child's read ends to close after the child's native exit or after a termination this package initiated, before cutting them off."
   guides/process.md const PROCESS_EVIDENCE: guide "Default maximum retained stderr tail, in bytes, for a `Process`." source "Names the default maximum retained stderr tail in bytes for a supervised `ProcessInterface`."
   guides/process.md const PROCESS_BACKLOG: guide "Default soft high-water mark, in bytes, for the unconsumed backlog." source "Names the default soft high-water mark in bytes for a supervised `ProcessInterface` line backlog."
   guides/process.md const PROCESS_OUTPUT: guide "Default maximum captured bytes for a run's stdout and stderr, each." source "Names the default maximum captured bytes for a one-shot run's stdout and stderr, each."
   guides/process.md const PROCESS_TIMER: guide "The largest delay in milliseconds the host schedules as written." source "Names the largest timer delay in milliseconds the host schedules without truncating it to one."
   guides/process.md const PROCESS_PATHEXT: guide "The extensions a Windows lookup applies when `PATHEXT` is unset." source "Lists the executable extensions a Windows lookup applies when the environment declares no `PATHEXT`."
   guides/process.md const PROCESS_ERROR_CODES: guide "The declared `ProcessErrorCode` categories, in declaration order." source "Lists the machine-readable failure categories a `ProcessError` carries, in declaration order."
   guides/process.md interface ProcessCommand: guide "One spawnable command — `file`, `arguments`, and optional `environment`, `input`, `isolated`." source "Represents one spawnable command: the executable, its argument vector, and optional environment overrides and initial standard input."
   guides/process.md interface ProcessExit: guide "The terminal state — an exit `code` or the `signal` that ended the child, plus the `drained` discriminant." source "Represents the observed terminal state of a child process: its exit code or the signal that ended it, and how its observation ended."
   guides/process.md interface SpawnInput: guide "The resolved spawn form — the `file`, the `arguments`, and the `verbatim` flag." source "Represents the resolved spawn form of one command: the executable to launch, the argument vector to pass, and whether the host receives that vector verbatim."
   guides/process.md interface ExecutableOptions: guide "Lookup inputs for resolving a command file — `workspace` and `environment`." source "Supplies the lookup inputs for resolving a command file to an executable path."
   guides/process.md type ProcessEventMap: guide "A `Process`'s events — `stderr(chunk)`, `error(cause)`, and `exit(exit)`." source "Represents the push observation surface of a `ProcessInterface` — the moments a fire-and-forget observer subscribes to, alongside the `lines` stream and the `exit` promise."
   guides/process.md interface ProcessOptions: guide "`Process` construction — `command`, `workspace`, and the optional settings." source "Configures one supervised child process."
   guides/process.md interface ProcessInterface: guide "The supervised-child surface — `pid` / `code` / `signal` / `emitter` / `lines` / `evidence` / `truncated` / `settled` / `stopping` / `exit` plus methods." source "Represents one supervised child process with framed output, a bounded backlog, and bounded termination."
   guides/process.md type SessionEventMap: guide "A `Session`'s events — `stdout(chunk)`, `stderr(chunk)`, `error(cause)`, and `exit(exit)`." source "Represents the push observation surface of a `SessionInterface` — the moments a byte-oriented observer subscribes to, alongside the `ending` and `exit` promises."
   guides/process.md interface SessionOptions: guide "`Session` construction — `ProcessOptions` without `backlog` and without `writable`." source "Configures one raw byte session over a supervised child."
   guides/process.md interface SessionInterface: guide "The byte-session surface — `pid` / `code` / `signal` / `emitter` / `evidence` / `settled` / `stopping` / `ending` / `exit` plus methods." source "Represents one supervised child process read as raw bytes, with an open standard-input channel and bounded termination."
   guides/process.md interface ExecuteResult: guide "A one-shot outcome — the captured output, the exit, and the state flags." source "Represents the settled outcome of a one-shot run: the buffered output and the terminal state."
   guides/process.md interface ExecuteInput: guide "The captured bytes and terminal facts one settled `ExecuteResult` is built from." source "Represents the captured bytes and terminal facts one settled `ExecuteResult` is built from."
   guides/process.md interface ExecuteOptions: guide "`execute` options — workspace, environment, input, timeout, grace, signal, strict, limit." source "Configures a one-shot run."
   guides/process.md interface ExecuteSyncOptions: guide "`executeSync` options — the same set without `grace` and without `signal`." source "Configures a synchronous one-shot run."
   guides/process.md interface DetachOptions: guide "`detach` options — the working directory the detached child starts in." source "Configures a detached fire-and-forget spawn."
   guides/process.md type ProcessManagerEventMap: guide "A manager's events — `launch(id)` and `exit(id, exit)`." source "Represents the push observation surface of a `ProcessManagerInterface` — the fleet-level moments a fire-and-forget observer subscribes to."
   guides/process.md interface ProcessManagerOptions: guide "`ProcessManager` construction — initial `on` listeners and an `error` handler." source "Configures a `ProcessManagerInterface`."
   guides/process.md interface ProcessManagerInterface: guide "The registry surface — `emitter` / `count` plus the query, launch, stop, and destroy methods." source "Represents a keyed registry of live supervised child processes."
   guides/process.md type ProcessErrorCode: guide "The failure categories — `spawn`, `timeout`, `input`, `duplicate`, `protocol`, or `invalid`." source "Names the machine-readable `ProcessError` categories, derived from `PROCESS_ERROR_CODES`."
   guides/process.md interface ProcessErrorContext: guide "Structured failure detail — `id`, `command`, `code`, `signal`, or `value`." source "Represents structured context carried by a `ProcessError`."
   guides/process.md interface ProcessErrorOptions: guide "`ProcessError` construction — `code` plus optional `context`, `cause`, `result`." source "Configures a `ProcessError`."
   guides/process.md interface ProcessChildInterface: guide "The child boundary the termination helpers drive — the readonly `pid`, `exitCode`, and `signalCode`." source "Represents the child boundary the termination helpers drive."
   guides/process.md interface SupervisorFace: guide "The callback record a face hands `Supervisor` at construction — `chunk`, `fault`, `relieve`, `close`, `terminal`, `teardown`; see Vocabulary for the `Face` suffix." source "Represents the composing face's callbacks for each lifecycle moment of one supervised child."
   guides/process.md ProcessInterface.send: guide absent source "Writes one line to the open standard-input channel."
   guides/process.md ProcessInterface.stop: guide absent source "Terminates the child process tree, awaits its observed exit, and reaches the terminal moment."
   guides/process.md ProcessInterface.destroy: guide absent source "Stops the child, closes its standard-input channel, reaches the terminal moment, and destroys the observation emitter."
   guides/process.md SessionInterface.write: guide absent source "Writes raw bytes to the open standard-input channel."
   guides/process.md SessionInterface.end: guide absent source "Closes the standard-input channel and leaves the child running."
   guides/process.md SessionInterface.stop: guide absent source "Terminates the child process tree, awaits its observed exit, and reaches the terminal moment."
   guides/process.md SessionInterface.destroy: guide absent source "Stops the child, closes its standard-input channel, reaches the terminal moment, and destroys the observation emitter."
   guides/process.md ProcessManagerInterface.process: guide absent source "Returns the live child under `id`, or `undefined` when none is."
   guides/process.md ProcessManagerInterface.processes: guide absent source "Returns a snapshot of every live child."
   guides/process.md ProcessManagerInterface.launch: guide absent source "Spawns and registers one child under `id`."
   guides/process.md ProcessManagerInterface.stop: guide absent source "Terminates the named children and awaits their exit."
   guides/process.md ProcessManagerInterface.stop: guide absent source "Terminates the named children and awaits their exit."
   guides/process.md ProcessManagerInterface.destroy: guide absent source "Stops every child, then destroys the registry emitter last."
   guides/process.md ProcessChildInterface.kill: guide absent source "Delivers one signal to the process."
   guides/process.md ProcessChildInterface.once: guide absent source "Registers a one-shot listener for the native exit or stream close."
   guides/process.md ProcessChildInterface.off: guide absent source "Releases one previously registered exit or close listener."
   guides/process.md Supervisor.deliver: guide absent source "Writes raw bytes to the open standard-input channel."
   guides/process.md Supervisor.end: guide absent source "Closes the standard-input channel while leaving the child running."
   guides/process.md Supervisor.stop: guide absent source "Terminates the child process tree and reaches the terminal observation moment."
   guides/process.md Supervisor.destroy: guide absent source "Stops the child and releases the composing face after the terminal state freezes."
   guides/process.md pitch: readme absent tagline "A typed child-process toolkit in tiers. `Process` supervises one child with framed stdout lines under a bounded backlog, a byte-bounded stderr tail, a live `stderr` event, a writable stdin channel, a typed lifecycle emitter, and a bounded termination that ends every observation channel at one terminal moment. `Session` supervises the same child as raw bytes instead: one owned `Uint8Array` per stdout chunk, an `end` that closes stdin without terminating anything, and the child's own `ending` beside the terminal `exit`. `execute` and `executeSync` buffer a child to completion and settle with an `ExecuteResult`; `detach` is the fire-and-forget spawn that returns without waiting. `ProcessManager` is a keyed registry of live children, launched and stopped by id and observed through its own emitter. No spawn in this package uses an implicit shell, and an argument a batch target could corrupt is refused rather than passed, so a metacharacter in an argument is data rather than syntax. The host-independent contracts, errors, constants, and types ship from `@orkestrel/process`. The Node implementations and Node-side contracts ship from `@orkestrel/process/server`. Source: `src/core` (the contracts) and `src/server` (the Node engine)."
   rows read: 1, disagreements found: 97
   exit 1
-- check
   tests/guides.test.ts(394,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(397,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(401,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(421,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(436,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 19 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  19 failed | 95 passed | 1 skipped (115)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 1 | summary 0 | banned 1 | tests/src/server/processes/Supervisor.test.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for process (taken 2026-09-07T16:39Z by facts.sh)

- Checkout `/home/user/fleet/process`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `a6a7c2a`, status: clean
- `package.json`: version `0.0.10`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 1 | summary 0 | banned 1 | tests/src/server/processes/Supervisor.test.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                       | Source                                                    | Tests                                                                             |
    8:| ------- | -------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------- |
    9:| Process | [`process.md`](process.md) | [`src/core`](../src/core) · [`src/server`](../src/server) | [`tests/src/core`](../tests/src/core) · [`tests/src/server`](../tests/src/server) |
    13:| Directory    | Guide                      |
    14:| ------------ | -------------------------- |
    15:| `src/core`   | [`process.md`](process.md) |
    16:| `src/server` | [`process.md`](process.md) |
- Guide `guides/process.md`: 1576 lines. Headings:
    1:# Process
    20:## Surface
    47:### Factories
    57:### Spawns
    67:### Entities
    80:### Guards
    88:### Error factories
    99:### Command helpers
    119:### Capture helpers
    130:### Termination helpers
    144:### Validators
    158:### Constants
    174:### Types
    202:### Server contracts
    214:### Surface notes
    235:## Methods
    242:#### `ProcessInterface`
    256:#### `SessionInterface`
    271:#### `ProcessManagerInterface`
    286:#### `ProcessChildInterface`
    298:#### `Supervisor`
    312:## Supervised children
    359:### Byte sessions
    426:### The terminal moment
    505:#### The drain bound
    534:### The line backlog
    559:### Standard input
    636:### Termination
    750:## Command resolution
    817:### The child environment
    859:## One-shot runs
    911:### The result family
    956:### Output bounds
    1010:### Where `execute` and `executeSync` differ
    1033:## Detached spawns
    1055:## The keyed registry
    1116:## Errors
    1193:## Observing
    1235:## Patterns
    1237:### Collect output in one call
    1246:### Stream a long-running child and cancel it
    1268:### Close a byte session cooperatively
    1294:### Supervise a fleet by id
    1310:### Build a bounded stop of your own
    1378:### Practices
    1421:## Vocabulary
    1446:## Tests
    1569:## See also
- Table headers in `guides/process.md` (a header row is the row before a `| ---` row):
    51: | API                    | Kind     | Summary                                                       |
    61: | API           | Kind     | Summary                                                                         |
    72: | API              | Kind  | Summary                                                                                                                                    |
    84: | API              | Kind     | Summary                                                          |
    92: | API                    | Kind     | Summary                                                                   |
    104: | API                         | Kind     | Summary                                                                   |
    123: | API                  | Kind     | Summary                                                                     |
    135: | API            | Kind     | Summary                                                                   |
    149: | API                   | Kind     | Summary                                                                        |
    162: | API                    | Kind  | Value                   | Summary                                                             |
    178: | API                       | Kind      | Summary                                                                                                                                                   |
    209: | API                     | Kind      | Summary                                                                                                                                                                            |
    250: | Method    | Returns            | Behavior                                                                                        |
    264: | Method    | Returns            | Behavior                                                                                        |
    277: | Method      | Returns                         | Behavior                                                                                 |
    292: | Method | Returns   | Behavior                                                                              |
    305: | Method    | Returns            | Behavior                                                                                        |
    328: | Option      | Type                            | Required | Meaning                                                                                                                                                                         |
    380: | Option      | Type                            | Required | Meaning                                                                                                                                                                         |
    678: | Host    | Sequence                                                                                                                                        | `grace`  |
    867: | Option        | Type                                  | Default               | Meaning                                                                  |
    916: | Field       | True when                                                                  |
    1015: | Subject         | `execute`                                                 | `executeSync`                                        |
    1121: | Code        | Raised when                                                                                               |
    1204: | Event map                | Events                                                            |
    1425: | Name                     | Ruling                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
- Rows of any `### Entities` table (the Kind cell):
    74:  `Process`        | class
    75:  `Session`        | class
    76:  `Supervisor`     | class
    77:  `ProcessManager` | class
    78:  `ProcessError`   | class
- H1 blockquote (`guides/process.md`):
    3: > A typed child-process toolkit in tiers. `Process` supervises one child with framed stdout
    4: > lines under a bounded backlog, a byte-bounded stderr tail, a live `stderr` event, a writable stdin
    5: > channel, a typed lifecycle emitter, and a bounded termination that ends every observation channel
    6: > at one terminal moment. `Session` supervises the same child as raw bytes instead: one owned
    7: > `Uint8Array` per stdout chunk, an `end` that closes stdin without terminating anything, and the
    8: > child's own `ending` beside the terminal `exit`. `execute` and `executeSync` buffer a
    9: > child to completion and settle with an `ExecuteResult`; `detach` is the fire-and-forget spawn that
    10: > returns without waiting. `ProcessManager` is a keyed registry of live children, launched and
    11: > stopped by id and observed through its own emitter. No spawn in this package uses an implicit
    12: > shell, and an argument a batch target could corrupt is refused rather than passed, so a
    13: > metacharacter in an argument is data rather than syntax. The host-independent contracts, errors,
    14: > constants, and types ship from `@orkestrel/process`. The Node implementations and Node-side
    15: > contracts ship from `@orkestrel/process/server`.
    16: >
    17: > Source: [`src/core`](../src/core) (the contracts) and [`src/server`](../src/server) (the Node
    18: > engine).
- Opening prose after the blockquote (first two lines):
    20: ## Surface
    22: Spawn a supervised child from `@orkestrel/process/server`, read its framed lines, and await its exit:
- README (`README.md`) first lines:
    # @orkestrel/process
    
    A typed **child-process toolkit** in tiers. `Process` supervises one
    child: stdout is framed into lines under a bounded backlog, stderr is forwarded
    live and kept as a byte-bounded tail, stdin is a writable channel, and
    termination is bounded and reports whether the real exit arrived — `SIGTERM` then
    `SIGKILL` after a grace window on a POSIX host, a whole-tree kill on Windows.
    `Session` supervises the same child as raw bytes instead: one owned
    `Uint8Array` per stdout chunk, an `end` that closes stdin without terminating
    anything, and the child's own `ending` beside the terminal `exit`.
    `execute` and `executeSync` buffer a child to completion and settle with an
    `ExecuteResult` carrying the captured output, the exit, and `failed` /
- `## Patterns` fences, each with its nearest preceding heading:
    24: fence under "## Surface"
    403: fence under "### Byte sessions"
    488: fence under "### The terminal moment"
    596: fence under "### Standard input"
    728: fence under "### Termination"
    800: fence under "## Command resolution"
    834: fence under "### The child environment"
    844: fence under "### The child environment"
    887: fence under "## One-shot runs"
    939: fence under "### The result family"
    969: fence under "### Output bounds"
    989: fence under "### Output bounds"
    1049: fence under "## Detached spawns"
    1073: fence under "## The keyed registry"
    1142: fence under "## Errors"
    1155: fence under "## Errors"
    1172: fence under "## Errors"
    1223: fence under "## Observing"
    1239: fence under "### Collect output in one call"
    1248: fence under "### Stream a long-running child and cancel it"
    1270: fence under "### Close a byte session cooperatively"
    1296: fence under "### Supervise a fleet by id"
    1319: fence under "### Build a bounded stop of your own"
    1336: fence under "### Build a bounded stop of your own"
    1355: fence under "### Build a bounded stop of your own"
    1476: fence under "## Tests"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/server/factories.ts:30:export function createProcess(options: ProcessOptions): ProcessInterface {
    src/server/factories.ts:51:export function createSession(options: SessionOptions): SessionInterface {
    src/server/factories.ts:68:export function createProcessManager(options?: ProcessManagerOptions): ProcessManagerInterface {
    src/core/errors.ts:85:export function createDuplicateError(id: string): ProcessError {
    src/core/errors.ts:98:export function createProtocolError(id: string): ProcessError {
    src/core/errors.ts:117:export function createInvalidError(subject: string, value: unknown): ProcessError {
    src/core/errors.ts:133:export function createExecuteError(result: ExecuteResult, cause?: unknown): ProcessError {
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/server/processes/ProcessManager.ts:43:export class ProcessManager implements ProcessManagerInterface {
    src/server/processes/Supervisor.ts:76:export class Supervisor {
    src/server/processes/Process.ts:43:export class Process implements ProcessInterface {
    src/server/processes/Session.ts:38:export class Session implements SessionInterface {
    src/core/errors.ts:22:export class ProcessError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/cloners.ts:1
    src/server/factories.ts:3
    src/server/helpers.ts:30
    src/server/processes/ProcessManager.ts:1
    src/server/processes/Supervisor.ts:2
    src/server/processes/Process.ts:1
    src/server/processes/Session.ts:1
    src/server/types.ts:3
    src/core/errors.ts:3
- Drop-in sites (`tests/guides.test.ts`):
    28:} from '@orkestrel/guide'
    217:const ROOT_FILES = Object.freeze(['AGENTS.md', 'README.md'])
    223:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    386:		for (const group of guide.methods()) {
    387:			const members = source.methods(group.interface)
    394:					expect(findMissing(members, group.methods)).toEqual([])
    397:					expect(findMissing(group.methods, members)).toEqual([])
    401:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    408:			expect(guide.methods().length).toBeGreaterThan(0)
    421:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    424:		for (const group of guide.methods()) {
    434:							? source.examples(group.interface)
    435:							: source.examples(group.interface).concat(source.examples(entity))
    436:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    466:						...findMissing(
- `## Tests` paragraph naming checks: 1446:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.10"` → `"version": "0.0.11"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-process-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.

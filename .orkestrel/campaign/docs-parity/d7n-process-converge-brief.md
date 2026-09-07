# Brief — P.2 `d7n-process-converge` (process under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/process` from the committed baseline `720d8ee` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.11`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/process.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/process/guides/process.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-process-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/process.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/process.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/process.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/process.md function createProcess: guide "Spawn one supervised child and return its `ProcessInterface`." source "Creates one supervised child process."
guides/process.md function createSession: guide "Spawn one supervised child and return its `SessionInterface`." source "Creates one raw byte session over a supervised child process."
guides/process.md function createProcessManager: guide "Construct an empty `ProcessManagerInterface` registry." source "Creates one keyed registry of supervised child processes."
guides/process.md function execute: guide "Run a command to completion, buffer its output, and resolve an `ExecuteResult`." source "Runs one command to completion, buffering its output, and settles with the outcome."
guides/process.md function executeSync: guide "The blocking counterpart of `execute`, returning the `ExecuteResult` directly." source "Runs one command to completion synchronously, buffering its output, and returns the outcome."
guides/process.md function detach: guide "Spawn a command detached with no stdio and return without waiting for it." source "Spawns one command as a detached process and returns without waiting for it."
guides/process.md class Process: guide "The supervised child engine — framed lines under a bounded backlog." source "Supervises one child while keeping every observation channel aligned at termination."
guides/process.md class Session: guide "The same supervised child read as raw bytes over an open stdin channel." source "Supervises one child and publishes its standard output as raw bytes."
guides/process.md class Supervisor: guide "The spawn, capture, channel, and termination engine a face composes; its readonly members are named under Surface notes." source "Supervises one child process and reports each lifecycle moment to the face composing it."
guides/process.md class ProcessManager: guide "The keyed registry of live children with auto-eviction on exit." source "Represents a keyed registry of live supervised child processes."
guides/process.md class ProcessError: guide "A child-process failure with a stable machine-readable `code`." source "Represents a child-process failure with a stable machine-readable category."
guides/process.md function isProcessError: guide "Total guard narrowing an unknown caught value to `ProcessError`." source "Checks whether an unknown value is a `ProcessError`."
guides/process.md function createDuplicateError: guide "The `duplicate`-coded failure a registry raises on a reused live id." source "Creates the failure raised when a manager launch reuses a live id."
guides/process.md function createProtocolError: guide "The `protocol`-coded failure a launch raises on a destroyed registry." source "Creates the failure raised when a launch is attempted on a registry that is being destroyed."
guides/process.md function createInvalidError: guide "The `invalid`-coded failure a refused public input raises before a spawn." source "Creates the failure raised when a public input is refused before anything is spawned."
guides/process.md function createExecuteError: guide "The failure a rejecting run raises, carrying its `ExecuteResult`." source "Creates the failure raised when a run does not complete successfully and rejection is requested."
guides/process.md function snapshotCommand: guide "Take one owned frozen snapshot of a caller's command before validation." source "Takes one owned frozen snapshot of a caller's command."
guides/process.md function formatCommand: guide "Render a `ProcessCommand` into its space-joined diagnostic command line." source "Renders one command into its diagnostic command line."
guides/process.md function quoteArgument: guide "Quote one token for a `cmd.exe` command line, doubling an embedded quote." source "Quotes one command-line token for a `cmd.exe` command line."
guides/process.md function buildSpawn: guide "Resolve one command into the file, argument vector, and verbatim flag." source "Builds the resolved spawn form of one command for the current host."
guides/process.md function buildPlatformSpawn: guide "Build a spawn form from a resolved file and an explicit platform." source "Builds a spawn form from a resolved file and an explicit platform."
guides/process.md function buildExecutableCandidates: guide "Build the ordered paths an explicit platform would search." source "Builds the executable candidates an explicit platform would search."
guides/process.md function resolveExecutable: guide "Resolve a command file the way Windows would, or `undefined` on POSIX." source "Resolves a command file to the executable path the host would launch."
guides/process.md function isFile: guide "Report whether a path resolves to a regular file, never throwing." source "Checks whether a path names a regular file."
guides/process.md function readVariable: guide "Read one environment variable the way the host resolves its name." source "Reads one environment variable the way the current host resolves it."
guides/process.md function readPlatformVariable: guide "Read one variable under an explicit platform's key rules." source "Reads one environment variable under an explicit platform's key rules."
guides/process.md function mergeEnvironment: guide "Merge environment overrides into the environment one child receives." source "Merges environment overrides into the environment one child receives on the current host."
guides/process.md function mergePlatformEnvironment: guide "Merge explicit environment layers under one platform's key rules." source "Merges environment layers under an explicit platform's key rules."
guides/process.md function trimHead: guide "Keep at most `limit` leading bytes without splitting a UTF-8 sequence." source "Trims a buffer to at most `limit` leading bytes without splitting a UTF-8 sequence."
guides/process.md function trimTail: guide "Keep at most `limit` trailing bytes without splitting a UTF-8 sequence." source "Trims a buffer to at most `limit` trailing bytes without splitting a UTF-8 sequence."
guides/process.md function captureChunk: guide "Bound one delivered stream chunk to the bytes a capture still has room for." source "Bounds one delivered stream chunk to the bytes a capture still has room for."
guides/process.md function buildExecuteResult: guide "Assemble one frozen `ExecuteResult` from captured bytes and terminal facts." source "Builds one settled `ExecuteResult` from a completed run's captured bytes and terminal facts."
guides/process.md function isExited: guide "Report whether a child has reached its native exit." source "Checks whether a child process has reached its native exit."
guides/process.md function killProcess: guide "Signal one child, or its detached process group on a POSIX host." source "Signals one owned child process, or its detached process group on a POSIX host."
guides/process.md function killTree: guide "End one Windows process tree through `taskkill`, bounded by a deadline." source "Kills one Windows process tree through `taskkill`."
guides/process.md function waitForExit: guide "Await one child's native exit, bounded by a deadline." source "Waits for one child process's native exit, bounded by a deadline."
guides/process.md function waitForClose: guide "Await one child's stream close, bounded by a deadline." source "Waits for one child process's streams to close, bounded by a deadline."
guides/process.md function stopChild: guide "Terminate one child tree and report whether its native exit was observed." source "Terminates one child process tree and reports whether its native exit was observed."
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
```

## Facts for process (taken 2026-09-07T17:00Z by facts.sh)

- Checkout `/home/user/fleet/process`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `720d8ee`, status: clean
- `package.json`: version `0.0.11`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    387:			const members = source.methods(group.interface).map((method) => method.name)
    395:					expect(findMissing(members, documented)).toEqual([])
    398:					expect(findMissing(documented, members)).toEqual([])
    404:							: findMissing(
    405:									source.methods(entity).map((method) => method.name),
    414:			expect(guide.methods().length).toBeGreaterThan(0)
    428:				findUnexampled(
    431:					source.examples().map((example) => example.name),
    436:		for (const group of guide.methods()) {
    441:					? source.examples(group.interface).map((example) => example.name)
    445:							.concat(source.examples(entity).map((example) => example.name))
    452:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    482:						...findMissing(
- `## Tests` paragraph naming checks: 1446:## Tests — 0 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-process-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/process.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/process.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the gate cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the gate cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-process-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.

# Report — `d7n-process-prep`

Wall clock: 2026-09-07T16:45:41Z to 2026-09-07T16:48:17Z.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

Summary line:

```
0 of 40 planned paths drifted from the plan. Audit compared bytes at 26, existence at 5, and nothing at 9.
tsconfig.json replaced (2 lines added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 32 unchanged, 0 removed in ..
```

`git status --short` after:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P21 list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Hunk 1 (methods loop):

```diff
- const members = source.methods(group.interface)
- const entity = group.interface.replace(/Interface$/u, '')
+ const members = source.methods(group.interface).map((method) => method.name)
+ const documented = group.methods.map((method) => method.name)
+ const entity = group.interface.replace(/Interface$/u, '')
  describe(`${group.interface}`, () => {
    it('documents at least one method', () => {
      expect(group.methods.length).toBeGreaterThan(0)
    })
    it('documents every interface method', () => {
-     expect(findMissing(members, group.methods)).toEqual([])
+     expect(findMissing(members, documented)).toEqual([])
    })
    it('documents no phantom method', () => {
-     expect(findMissing(group.methods, members)).toEqual([])
+     expect(findMissing(documented, members)).toEqual([])
    })
    it(`${entity} exposes no undocumented method`, () => {
      const extra =
-       entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+       entity === group.interface
+         ? []
+         : findMissing(
+             source.methods(entity).map((method) => method.name),
+             documented,
+           )
      expect(extra).toEqual([])
    })
  })
```

Hunk 2 (Surface-function example case):

```diff
  expect(names.length).toBeGreaterThan(0)
- expect(findUnexampled(names, fences, source.examples())).toEqual([])
+ expect(
+   findUnexampled(
+     names,
+     fences,
+     source.examples().map((example) => example.name),
+   ),
+ ).toEqual([])
```

Hunk 3 (per-interface examples loop):

```diff
  for (const group of guide.methods()) {
    const entity = group.interface.replace(/Interface$/u, '')
+   const documented = group.methods.map((method) => method.name)
+   const examples =
+     entity === group.interface
+       ? source.examples(group.interface).map((example) => example.name)
+       : source
+           .examples(group.interface)
+           .map((example) => example.name)
+           .concat(source.examples(entity).map((example) => example.name))
    describe(`${group.interface} examples`, () => {
      it('documents an example for every method', () => {
        const fences = guide
          .fences()
          .filter((fence) => fence.language === EXAMPLE_LANGUAGE)
          .map((fence) => fence.code)
-       const examples =
-         entity === group.interface
-           ? source.examples(group.interface)
-           : source.examples(group.interface).concat(source.examples(entity))
-       expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+       expect(findUnexampled(documented, fences, examples)).toEqual([])
      })
    })
  }
```

The import-walk site (`findMissing(statement.names, face.surface().map((symbol) => symbol.name))`,
around line 482) was already string-based and was left unchanged, per item 2's carve-out.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 printed one diagnostic:

```
tests/src/server/processes/Supervisor.test.ts:113:4: error policy(no-banned-term): Replace just in this comment: delete.
```

Before/after for that diagnostic:

```diff
- // margin the sibling comparator in `Process.test.ts` reads. An override sized just past
- // the race turns a contended run into a red gate reporting a timeout.
+ // margin the sibling comparator in `Process.test.ts` reads. An override sized past
+ // the race turns a contended run into a red gate reporting a timeout.
```

Re-run of oxlint after the fix produced no output (exit 0, verified separately below).

`npm run test:policy` after item 1 and the voice fix passed clean (90 passed | 1 skipped) with no
`prose` rule failure naming a line in `guides/**` or `README.md`, so no substitution-table edit was
needed under this item's second clause.

## Item 4 — the bump

```diff
- "version": "0.0.10",
+ "version": "0.0.11",
```

`package-lock.json` was not touched.

## Acceptance criteria

**1.** `git status --short` after `npm run format` (run per standing conditions before the acceptance
gates):

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tests/src/server/processes/Supervisor.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

This is the P21 repair list plus `tests/guides.test.ts` (item 2) and
`tests/src/server/processes/Supervisor.test.ts` (item 3, the `no-banned-term` diagnostic named
above), and nothing else. `npm run format` changed no further files beyond re-formatting the two
edits already made.

**2.**

```
$ npm run format:check
Checking formatting...
All matched files use the correct format.
Finished in 3034ms on 57 files using 4 threads.

$ npx oxlint --config .oxlintrc.json --deny-warnings .
(no output)
EXIT 0

$ npm run check
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
> tsc --noEmit -p configs/src/tsconfig.server.json
EXIT 0
```

**3.**

```
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  114 passed | 1 skipped (115)
EXIT 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
EXIT 0

$ npm run test:config
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
EXIT 0
```

**4.** `npm run docs` read `rows read: 1, disagreements found: 97` and exited 1, as expected (the
converge unit's worklist). Verbatim output:

```
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
```

## Final tree state

`git status --short`:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tests/src/server/processes/Supervisor.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

No deviation occurred: `repair` wrote exactly the P21 list, every before-text in item 2 was found
verbatim, the sole voice diagnostic named `tests/src/server/processes/Supervisor.test.ts` (in
scope), `test:policy` had no `prose`-rule failure to carry, and every gate other than `docs` read
green.

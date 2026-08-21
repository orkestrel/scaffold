Outcome: implemented every carried finding. The complete working-tree diff appears below. The diff includes standing work present before this unit; `package.json` remained untouched by this unit.

## Finding 4 interaction ruling

`Process` treats the constructor-supplied `input` write and closing `end` as a package-initiated phase. A fault from that phase settles pending sends without an event or channel-failure state. The phase ends with its callbacks and paired stream error. A later host fault on a writable channel still emits `protocol`.

`execute` remains distinct by design. Its input callback or stream fault terminates the run and sets the cause. `strict: false` resolves a failed result. Strict mode rejects with that cause.

The existing `buildExecuteResult` TSDoc already names the host-fault door. `ExecuteResult` and the guide now document the `failed: true` residual with false state flags, code `0`, and signal `null`.

## Scope criterion

Command exited `0`.

```text
 M guides/process.md
 M package.json
 M src/core/types.ts
 M src/server/Process.ts
 M src/server/execution/execute.ts
 M tests/distribution.test.ts
 M tests/src/server/Process.test.ts
 M tests/src/server/execution/execute.test.ts
EXECUTE_TEST_BEFORE: <clean>
EXECUTE_TEST_AFTER:
 M tests/src/server/execution/execute.test.ts
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

Only `tests/src/server/execution/execute.test.ts` joined the standing set.

## Formatting criterion

Command:

```text
npx.cmd oxfmt --config .oxfmtrc.json --check src/server/Process.ts src/server/execution/execute.ts src/core/types.ts tests/src/server/Process.test.ts tests/src/server/execution/execute.test.ts guides/process.md tests/distribution.test.ts
```

Exit code `0`.

```text
Checking formatting...

All matched files use the correct format.
Finished in 539ms on 7 files using 16 threads.
npm notice run @orkestrel/process@0.0.4 npx
npm notice run oxfmt --config .oxfmtrc.json --check src/server/Process.ts src/server/execution/execute.ts src/core/types.ts tests/src/server/Process.test.ts tests/src/server/execution/execute.test.ts guides/process.md tests/distribution.test.ts
```

## Lint criterion

Command:

```text
npx.cmd oxlint --config .oxlintrc.json --deny-warnings src/server/Process.ts src/server/execution/execute.ts src/core/types.ts tests/src/server/Process.test.ts tests/src/server/execution/execute.test.ts guides/process.md tests/distribution.test.ts
```

Exit code `0`.

```text
npm notice run @orkestrel/process@0.0.4 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/server/Process.ts src/server/execution/execute.ts src/core/types.ts tests/src/server/Process.test.ts tests/src/server/execution/execute.test.ts guides/process.md tests/distribution.test.ts
```

## TypeScript criterion

Command:

```text
npx.cmd tsc --noEmit --project tsconfig.json
```

Exit code `0`.

```text
npm notice run @orkestrel/process@0.0.4 npx
npm notice run tsc --noEmit --project tsconfig.json
```

## Failing-first evidence

### Quiet constructor-input closure

The unmodified implementation failed naturally.

Command exited `1`.

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/process

-------------x-------------------------------

 Test Files  1 failed (1)
      Tests  1 failed | 44 skipped (45)
   Start at  05:48:05
   Duration  710ms (transform 198ms, setup 45ms, import 297ms, tests 218ms, environment 0ms)

npm notice run @orkestrel/process@0.0.4 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Process.test.ts -t keeps constructor input closure quiet when a non-reading child exits

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |src:server| tests/src/server/Process.test.ts > Process > keeps constructor input closure quiet when a non-reading child exits
AssertionError: expected 1 to be +0 // Object.is equality

- Expected
+ Received

- 0
+ 1

 ❯ tests/src/server/Process.test.ts:263:24
    261|   await child.destroy()
    262|
    263|   expect(errors.count).toBe(0)
       |                        ^
    264|  })
    265|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯
```

The repaired implementation exited `0`.

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/process

-------------·-------------------------------

 Test Files  1 passed (1)
      Tests  1 passed | 44 skipped (45)
   Start at  05:52:48
   Duration  737ms (transform 211ms, setup 44ms, import 329ms, tests 217ms, environment 0ms)

npm notice run @orkestrel/process@0.0.4 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Process.test.ts -t keeps constructor input closure quiet when a non-reading child exits
```

The bounded host-fault control, seeded with constructor input, exited `0`.

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/process

-----------------·---------------------------

 Test Files  1 passed (1)
      Tests  1 passed | 44 skipped (45)
   Start at  05:52:55
   Duration  730ms (transform 206ms, setup 37ms, import 309ms, tests 225ms, environment 0ms)

npm notice run @orkestrel/process@0.0.4 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Process.test.ts -t refuses the write and emits one protocol error when the host reports a stdin fault
```

### Flood-control pair comparison

The planted control used the trapped signal with a differing code and disabled the escalation disjunct. The pair comparison rejected that control.

Command exited `1`.

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/process

-----------------------x---------------------

 Test Files  1 failed (1)
      Tests  1 failed | 44 skipped (45)
   Start at  05:48:48
   Duration  829ms (transform 199ms, setup 35ms, import 292ms, tests 349ms, environment 0ms)

npm notice run @orkestrel/process@0.0.4 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Process.test.ts -t caps retained lines while termination drains a flooding child

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |src:server| tests/src/server/Process.test.ts > Process > caps retained lines while termination drains a flooding child
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ tests/src/server/Process.test.ts:525:5
    523|     (trappedExit.code === codeDifferingControl.code &&
    524|      trappedExit.signal === codeDifferingControl.signal),
    525|   ).toBe(true)
       |     ^
    526|   // The flooding child traps the same signal, so it ends exactly as t…
    527|   // Where the host escalates, that reading is `SIGKILL` and this line…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯
```

The final `SIGKILL` or exact code-and-signal comparison exited `0`.

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/process

-----------------------·---------------------

 Test Files  1 passed (1)
      Tests  1 passed | 44 skipped (45)
   Start at  05:55:24
   Duration  793ms (transform 200ms, setup 34ms, import 300ms, tests 314ms, environment 0ms)

npm notice run @orkestrel/process@0.0.4 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Process.test.ts -t caps retained lines while termination drains a flooding child
```

### Send after teardown begins

The mutation removed `#terminating` from the `send` guard, reproducing the 0.0.4 answer.

Command exited `1`.

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/process

-------------------x-------------------------

 Test Files  1 failed (1)
      Tests  1 failed | 44 skipped (45)
   Start at  05:49:06
   Duration  527ms (transform 194ms, setup 35ms, import 282ms, tests 59ms, environment 0ms)

npm notice run @orkestrel/process@0.0.4 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Process.test.ts -t refuses a send after teardown begins

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |src:server| tests/src/server/Process.test.ts > Process > refuses a send after teardown begins
AssertionError: expected true to be false // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ tests/src/server/Process.test.ts:404:20
    402|   await stopping
    403|
    404|   expect(accepted).toBe(false)
       |                    ^
    405|  })
    406|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯
```

Restoring the guard exited `0`.

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/process

-------------------·-------------------------

 Test Files  1 passed (1)
      Tests  1 passed | 44 skipped (45)
   Start at  05:55:30
   Duration  629ms (transform 236ms, setup 41ms, import 343ms, tests 68ms, environment 0ms)

npm notice run @orkestrel/process@0.0.4 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Process.test.ts -t refuses a send after teardown begins
```

### `execute` input fault

The mutation made the stdin error listener and input callback inert.

Command exited `1`.

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/process

------------x--

 Test Files  1 failed (1)
      Tests  1 failed | 14 skipped (15)
   Start at  05:49:24
   Duration  1.07s (transform 194ms, setup 36ms, import 304ms, tests 586ms, environment 0ms)

npm notice run @orkestrel/process@0.0.4 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/execution/execute.test.ts -t reports a pending input write fault as the cause of a failed run

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |src:server| tests/src/server/execution/execute.test.ts > execute > reports a pending input write fault as the cause of a failed run
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ tests/src/server/execution/execute.test.ts:211:25
    209|   const control = await execute(reading, { input })
    210|
    211|   expect(result.failed).toBe(true)
       |                         ^
    212|   expect(isProcessError(thrown)).toBe(true)
    213|   expect(isProcessError(thrown) ? thrown.cause : undefined).toBeInstan…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯
```

Restoring the callback and listener exited `0`.

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/process

------------·--

 Test Files  1 passed (1)
      Tests  1 passed | 14 skipped (15)
   Start at  05:55:37
   Duration  1.07s (transform 218ms, setup 42ms, import 318ms, tests 528ms, environment 0ms)

npm notice run @orkestrel/process@0.0.4 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/execution/execute.test.ts -t reports a pending input write fault as the cause of a failed run
```

## Server observation

Command exited `1`, as an observation only.

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/process

·················-························-·······················--··················x·····················-···x-······x···············

 Test Files  3 failed | 4 passed (7)
      Tests  3 failed | 127 passed | 6 skipped (136)
   Start at  05:56:24
   Duration  6.20s (transform 1.19s, setup 173ms, import 2.03s, tests 15.02s, environment 1ms)

npm notice run @orkestrel/process@0.0.4 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 3 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |src:server| tests/src/server/Process.test.ts > Process > kills a grandchild through the tree while the root is still live
AssertionError: expected true to be false // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ tests/src/server/Process.test.ts:590:48
    588|     await waitForDelay(100)
    589|
    590|     expect(holds(() => process.kill(held, 0))).toBe(false)
       |                                                ^
    591|    } finally {
    592|     holds(() => process.kill(held, 'SIGKILL'))

 FAIL  |src:server| tests/src/server/ProcessManager.test.ts > ProcessManager > refuses a launch whose own options destroyed the registry mid-construction
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ tests/src/server/ProcessManager.test.ts:198:24
    196|    }
    197|
    198|    expect(markerValid).toBe(true)
       |                        ^
    199|    expect(terminationValid).toBe(true)
    200|   } finally {

 FAIL  |src:server| tests/src/server/execution/executeSync.test.ts > executeSync > leaves an established grandchild running after a root-only timeout where asynchronous execution ends the tree
AssertionError: expected true to be false // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ tests/src/server/execution/executeSync.test.ts:62:40
     60|     // ~295 ms a surviving grandchild takes to write.
     61|     await waitForDelay(600)
     62|     expect(existsSync(streamedMarker)).toBe(false)
       |                                        ^
     63|    } finally {
     64|     scratch.destroy()
```

The failures are the sandbox-sensitive grandchild/tree observations named by the brief. I did not iterate against them.

## Guide criterion

Command exited `0`.

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/process

·······································································-······················-····

 Test Files  1 passed (1)
      Tests  97 passed | 2 skipped (99)
   Start at  05:57:15
   Duration  1.70s (transform 133ms, setup 27ms, import 301ms, tests 1.23s, environment 0ms)

npm notice run @orkestrel/process@0.0.4 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project guides
```

The initial guide attempt exposed an exact sentence expected by parity. I restored the accurate sentence, “A spawn fault reports `null` for `executeSync`,” and reran the final criterion shown here.

## Deviations

No scope, dependency, credential, installation, commit, or publication deviation occurred.

The server observation exited `1` only on the named host-sensitive process-tree cases. The brief assigns the authoritative host run to the Orchestrator.

## Complete diff

```diff
diff --git a/guides/process.md b/guides/process.md
index 21b2fb4..48e30b9 100644
--- a/guides/process.md
+++ b/guides/process.md
@@ -237,7 +237,7 @@ barrier shared by every call.
 
 | Method    | Returns            | Behavior                                                                                     |
 | --------- | ------------------ | -------------------------------------------------------------------------------------------- |
-| `send`    | `Promise<boolean>` | Write one line to the open stdin channel; true when the line reached the host without error. |
+| `send`    | `Promise<boolean>` | Write one line to the open stdin channel; true when the host accepted the bytes.             |
 | `stop`    | `Promise<boolean>` | Terminate the child tree and await its exit; true when the native exit was observed.         |
 | `destroy` | `Promise<void>`    | Stop the child, destroy stdin, then destroy the emitter last; the barrier every call shares. |
 
@@ -259,10 +259,14 @@ name ids and `void` when you stop every child.
 ## Supervised children
 
 `Process` spawns one child and captures both its streams. Standard output is framed through
-`readline`, including a final line written without a trailing newline. Standard error is decoded and
-forwarded live as the `stderr` event, while a byte-bounded raw tail is retained as `evidence` — the
-diagnostic to attach to a failed exit. The typed `emitter` also carries the child `error` cause on a
-spawn fault and the terminal `exit`, alongside the `exit` promise.
+`readline`, including a final line written without a trailing newline. A line feed, a CRLF pair, and
+a bare carriage return each terminate a line, and a CRLF split across delivered chunks joins as one
+break. A child that redraws a progress bar with a carriage return therefore yields one line per
+redraw, and consecutive carriage returns yield an empty line between them. Standard error is decoded
+and forwarded live as the `stderr` event, while a byte-bounded raw tail is retained as `evidence` —
+the diagnostic to attach to a failed exit. The typed `emitter` also carries the child `error` cause
+on a spawn fault, a `ProcessError` coded `protocol` whose cause is a host-reported standard-input
+fault, and the terminal `exit`, alongside the `exit` promise.
 
 `ProcessOptions` requires `command` and `workspace`; the rest are optional:
 
@@ -273,6 +277,7 @@ spawn fault and the terminal `exit`, alongside the `exit` promise.
 | `grace`     | `number`                        | no       | POSIX milliseconds between `SIGTERM` and `SIGKILL`. Default: `PROCESS_GRACE` (`5_000`).                    |
 | `evidence`  | `number`                        | no       | Maximum retained stderr tail in bytes. Default: `PROCESS_EVIDENCE` (`2_048`).                              |
 | `backlog`   | `number`                        | no       | Soft high-water mark in bytes; termination retains at most twice `backlog`. Default: `PROCESS_BACKLOG`.    |
+| `delivery`  | `number`                        | no       | Milliseconds an unconfirmed `send` waits before resolving `false`; `0` or omitted disables the bound.      |
 | `writable`  | `boolean`                       | no       | When `true`, stdin stays open for `send`; when `false` or omitted, stdin closes after any initial `input`. |
 | `signal`    | `AbortSignal`                   | no       | Aborting this signal terminates the child through the same bounded `stop`.                                 |
 | `on`        | `EmitterHooks<ProcessEventMap>` | no       | Initial `stderr`, `error`, and `exit` listeners installed at construction.                                 |
@@ -311,23 +316,46 @@ stdout holds the child's own write and therefore its exit. The teardown drain re
 `backlog`; it drops later lines without pausing stdout. The `truncated` property becomes `true` when
 either the no-consumer mark or the termination cap omits a line, so a consumer can detect the gap.
 
-A retained line costs its payload bytes plus the newline that framed it, so a line carrying no
-payload still costs one byte. That is what bounds a flood of empty lines, which would otherwise be
-free and defeat the mark entirely.
+A retained line costs its payload bytes plus one byte for the break that framed it, whichever
+terminator the child wrote, so a line carrying no payload still costs a byte. That is what bounds a
+flood of empty lines, which would otherwise be free and defeat the mark entirely.
 
 ### Standard input
 
 `writable: true` keeps stdin open for `send`. `send` never rejects and never throws: it resolves
-`true` when the host reported the line handled, and `false` when the channel was closed, destroyed,
-or ended, or when the write failed.
-
-A stdin delivery failure is swallowed on purpose. The engine attaches a stdin `error` listener that
-ignores the fault, so a child that closed its end of the pipe never crashes the caller with an
-unhandled stream error. The failure still reaches you: `send` resolves `false`, the child's outcome
-arrives through `exit`, and a caller that wants a deadline arms its own timer and calls `stop`. A
-line written to a child that is not reading stays pending until the child drains it or the channel
-closes, and every terminal teardown path destroys stdin, so a pending `send` always settles by
-teardown.
+`true` when the host accepted the bytes without reporting a fault, and `false` when the channel was
+closed, destroyed, ended, failed, or left the write unconfirmed through `delivery`. Acceptance is a
+fact about the host's pipe rather than about the child: it does not prove that the child read the
+bytes, and it does not prove that the child ever will.
+
+After `stop` or `destroy` begins, a later `send` call resolves `false`. Version 0.0.4 could resolve
+that call `true` before teardown destroyed the pipe. The narrower answer avoids claiming delivery
+for bytes the package is about to discard.
+
+A host-reported fault on the channel surfaces rather than being swallowed. The affected `send`
+resolves `false`, and the `error` event carries a `ProcessError` coded `protocol` whose `cause` is
+the host fault, so a message lost to a dying child is an event you can act on. The channel holds one
+failure state: the write callback and the stream error report the same fault once, and every later
+`send` resolves `false` with no further event.
+
+A closure the package itself initiates stays quiet. A `stop`, a `destroy`, or a channel that was
+never writable settles every pending write `false` and emits nothing. The constructor-supplied
+`input` write and its closing `end` form the initial input phase; a fault arising from that sequence
+also emits nothing and creates no channel-failure state. The quiet phase ends with that write and
+`end` lifecycle, so a later host fault on a `writable: true` channel still surfaces as `protocol`.
+
+An ordinary write settles as soon as the kernel accepts it. A write larger than the host's pipe
+buffer to a child that never reads it can fill the pipe and remain unconfirmed. `delivery` bounds
+that wait: an unconfirmed write resolves `false` after the given milliseconds, and no event fires,
+because the bound expiring is not a fault the host reported. Omit `delivery`, or pass `0`, and the
+write stays pending until the channel faults or teardown settles it.
+
+Neither mechanism proves delivery, so a consumer that needs a deadline still arms its own timer and
+calls `stop`. On Windows 11 with Node v24.18.1, measured on 2026-08-21, a child that closes its own
+file descriptor 0 can leave the parent's pipe writable: `send` resolves `true` and no fault is ever
+reported while that child stays alive, so `true` there records bytes taken into a pipe nobody will
+read. After that child exits, `send` resolves `false` because the channel is closed, and a write
+still pending when it exits fails with the host's `EOF` and arrives as the `protocol` error.
 
 ```ts
 import { createProcess } from '@orkestrel/process/server'
@@ -341,7 +369,7 @@ const echo = createProcess({
 	writable: true,
 })
 
-await echo.send('ping') // true — the line reached the host
+await echo.send('ping') // true — the host accepted the bytes
 await echo.stop() // true — the native exit was observed
 await echo.destroy()
 ```
@@ -585,6 +613,11 @@ const echoed = executeSync(
 echoed.stdout === input // true
 ```
 
+The `execute` function writes `input` with a host callback. A fault while that write is pending ends
+the run by design and makes `failed` true. With `strict: true`, the rejection carries the host fault
+as its `cause`; with `strict: false`, the result carries no cause member. This behavior is distinct
+from the quiet constructor input phase of `Process`.
+
 A run with no `timeout` and no `signal` is unbounded, and what it waits for is stdio completion
 rather than process exit. A descendant that inherits the child's stdio holds those pipes open after
 the child itself has exited, and the run stays pending for as long as the descendant lives. Give
@@ -604,11 +637,13 @@ result, and `expired`, `aborted`, and `truncated` each report one specific thing
 | `aborted`   | The caller's `signal` aborted the run before completion.                   |
 | `truncated` | Either stream exceeded `limit`, so the captured text is the retained head. |
 
-`failed` is derived: a run failed when it expired, was aborted, ended on a host fault, was ended by a
-signal, or exited with a code other than `0`. A `null` code from a spawn fault is therefore a
+`failed` is derived: a run failed when it timed out, was aborted, ended on a host fault, was ended by
+a signal, or exited with a code other than `0`. A `null` code from a spawn fault is therefore a
 failure, an abort is a failure, and a synchronous overflow is a failure. `expired` and `aborted` are
 the ways the run ended the child rather than the child ending itself, and only the earliest observed
-is recorded, so they are never both `true`.
+is recorded, so they are mutually exclusive. For a `strict: false` caller, `failed: true` with
+`expired`, `aborted`, and `truncated` false, `code: 0`, and `signal: null` is the residual signature
+that a host fault ended the run.
 
 A spawn fault reports the host's negative errno in `ProcessExit.code` and an asynchronous
 `ExecuteResult.code`. The synchronous `executeSync` result reports `null` instead.
@@ -860,20 +895,24 @@ Both `Process` and `ProcessManager` expose a typed `emitter` for fire-and-forget
 logging, metrics, tracing. Subscribe through `child.emitter.on(...)` or `manager.emitter.on(...)`, or
 wire initial listeners through the `on` option; supply an `error` handler to receive a listener's
 throw. The `error` handler and the `Process` `error` event are distinct: the handler receives a
-listener's own throw, while the `error` event carries a child fault. Emitting is observation-only:
-every event fires after the transition it reports, and a throwing listener is isolated and routed to
-the `error` handler, never onto a domain event, so a faulty observer cannot corrupt the engine.
+listener's own throw, while the `error` event carries a child or channel fault. Emitting is
+observation-only: every event fires after the transition it reports, and a throwing listener is
+isolated and routed to the `error` handler, never onto a domain event, so a faulty observer cannot
+corrupt the engine.
 
 | Event map                | Events                                          |
 | ------------------------ | ----------------------------------------------- |
 | `ProcessEventMap`        | `stderr(chunk)` · `error(cause)` · `exit(exit)` |
 | `ProcessManagerEventMap` | `launch(id)` · `exit(id, exit)`                 |
 
-A `Process` emits `stderr` for each decoded standard-error chunk, `error` with its cause when the
-child fails to spawn or errors, and `exit` once, with the terminal `ProcessExit`, when the child
-settles. A spawn fault emits `error` and then still resolves `exit`. A `ProcessManager` emits
-`launch` when a child joins the registry and `exit`, with the child's id and terminal state, when it
-settles and leaves.
+A `Process` emits `stderr` for each decoded standard-error chunk, `error` when the child fails to
+spawn, when the child itself errors, and when the host reports a fault on the standard-input
+channel after the constructor input phase, and `exit` once, with the terminal `ProcessExit`, when
+the child settles. A spawn or child fault carries its cause directly; a standard-input fault carries
+a `ProcessError` coded `protocol` whose `cause` is the host fault. A fault arising from constructor
+`input` or its closing `end` stays quiet. A spawn fault emits `error` and then still resolves `exit`. A
+`ProcessManager` emits `launch` when a child joins the registry and `exit`, with the child's id and
+terminal state, when it settles and leaves.
 
 ```ts
 import { createProcess } from '@orkestrel/process/server'
@@ -1036,6 +1075,14 @@ root. On a Windows host, settle it and re-run every server row with this command
 npx vitest run --config vite.config.ts --no-cache --project src:server
 ```
 
+The standard-input fault rows execute on every host, and only their Windows reading has been taken,
+on 2026-08-21. A write still pending when the child exits reports the host's `EOF` there and `EPIPE`
+on POSIX, and both arrive through the same `protocol` error, so the rows assert that shape rather
+than the errno. The POSIX `EPIPE` fast path is therefore the unproven residue, alongside the delivery
+matrix and the line framing across the supported Node lines. A POSIX child that closes its own file
+descriptor 0 is also expected to fault where the measured Windows child does not. On a POSIX host,
+settle each with the same command.
+
 The pure decision rows do not prove Windows end to end. They prove the decisions.
 
 - [`tests/src/core/errors.test.ts`](../tests/src/core/errors.test.ts) — the error surface:
@@ -1043,11 +1090,13 @@ The pure decision rows do not prove Windows end to end. They prove the decisions
   compared against the declared `PROCESS_ERROR_CODES` tuple with a refusal control drawn from
   outside it, and recognition of an error constructed by another source copy of the module.
 - [`tests/src/server/Process.test.ts`](../tests/src/server/Process.test.ts) — the supervised child:
-  line framing including a trailing partial line, the bounded backlog under each consumer policy
-  and under a flood of empty lines, the byte-bounded `evidence` tail and live `stderr` event, `send`
-  over an open and a closed channel, bounded termination and its confirmation, the POSIX escalation
-  from a trapped `SIGTERM` to `SIGKILL`, abort-signal termination, the isolated environment, the
-  `invalid` refusals, and `destroy`.
+  line framing across every terminator, a split CRLF pair, a carriage-return redraw, and a trailing
+  partial line, the bounded backlog under each consumer policy and under a flood of empty lines, the
+  byte-bounded `evidence` tail and live `stderr` event, `send` over an open and a closed channel, the
+  `delivery` bound against its unbounded control, the `protocol` fault a host-reported channel
+  failure raises beside the silence a package-initiated teardown keeps, bounded termination and its
+  confirmation, the POSIX escalation from a trapped `SIGTERM` to `SIGKILL`, abort-signal termination,
+  the isolated environment, the `invalid` refusals, and `destroy`.
diff --git a/package.json b/package.json
index c69c845..d341808 100644
--- a/package.json
+++ b/package.json
@@ -77,6 +77,7 @@
 		"build:src": "npm run build:src:core && npm run build:src:server",
 		"build:src:core": "vite build --config configs/src/vite.core.config.ts && npm run copy dist/src/core/index.d.ts dist/src/core/index.d.cts",
 		"build:src:server": "vite build --config configs/src/vite.server.config.ts && npm run copy dist/src/server/index.d.ts dist/src/server/index.d.cts",
+		"prepack": "npm run build",
 		"prepublishOnly": "npm run format:check && npm run lint:check && npm run check && npm run build && npm test && npm run test:distribution -- --mode release"
 	},
 	"dependencies": {
diff --git a/src/core/types.ts b/src/core/types.ts
index 3136389..53304b6 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -89,14 +89,18 @@ export interface ExecutableOptions {
  *
  * @remarks
  * Declared as a `type` alias so it satisfies the emitter's `EventMap` constraint structurally. The
- * `error` event carries a child fault — a failure to spawn or a process-level error. It is distinct
- * from the `error` handler in {@link ProcessOptions}: a listener throw is isolated by the emitter and
+ * `error` event carries a child fault — a failure to spawn, a process-level error, or a
+ * host-reported standard-input channel fault after the constructor input phase. A fault arising
+ * from the constructor-supplied `input` write or its closing `end` stays quiet because the package
+ * initiated that sequence. A surfaced standard-input fault is wrapped in a
+ * {@link ProcessError} coded `protocol` with the host fault as its cause. The event is distinct from
+ * the `error` handler in {@link ProcessOptions}: a listener throw is isolated by the emitter and
  * routed to that handler, never emitted as this `error` event.
  */
 export type ProcessEventMap = {
 	/** A decoded standard-error chunk arrived. */
 	readonly stderr: readonly [chunk: string]
-	/** The child emitted an error — a spawn fault or process-level failure — carrying its cause. */
+	/** The child or its open standard-input channel reported a fault, carrying the host cause directly or through a `protocol` {@link ProcessError}. */
 	readonly error: readonly [error: unknown]
 	/** The child settled — its terminal state, delivered once. */
 	readonly exit: readonly [exit: ProcessExit]
@@ -130,6 +134,8 @@ export interface ProcessOptions {
 	readonly evidence?: number
 	/** Soft high-water mark in bytes for the unconsumed `lines` backlog; termination retains at most twice this value. Default: {@link PROCESS_BACKLOG}. */
 	readonly backlog?: number
+	/** Milliseconds an unconfirmed {@link ProcessInterface.send} waits before resolving `false`. `0` or omitted disables the bound. */
+	readonly delivery?: number
 	/** If `true`, stdin stays open for {@link ProcessInterface.send}; if `false` or omitted, stdin closes after any initial `input`. */
 	readonly writable?: boolean
 	/** Aborting this signal terminates the child through the same bounded `stop`. */
@@ -172,7 +178,16 @@ export interface ProcessInterface {
 	readonly signal: string | null
 	/** The typed lifecycle observation surface. */
 	readonly emitter: EmitterInterface<ProcessEventMap>
-	/** The captured stdout lines, in arrival order, for one consumer, ending when the child's stdout closes. */
+	/**
+	 * The captured stdout lines, in arrival order, for one consumer, ending when the child's stdout closes.
+	 *
+	 * @remarks
+	 * A line feed, a CRLF pair, and a bare carriage return each terminate a line, and a CRLF split
+	 * across delivered chunks joins as one break. A child that redraws a progress bar with a carriage
+	 * return therefore yields one line per redraw, and consecutive carriage returns yield an empty
+	 * line between them. A final line written with no trailing terminator is delivered when stdout
+	 * closes.
+	 */
 	readonly lines: AsyncIterable<string>
 	/** The decoded byte-bounded stderr tail. */
 	readonly evidence: string
@@ -184,13 +199,18 @@ export interface ProcessInterface {
 	 * Write one line to the open standard-input channel.
 	 *
 	 * @remarks
-	 * Never rejects. The promise settles when the host reports the line handled, so a line written
-	 * to a child that is not reading stays pending until the child drains it or the channel closes.
-	 * Every terminal teardown path destroys stdin, so a pending write always settles by teardown. A
-	 * caller that needs its own deadline arms a timer and calls `stop`.
+	 * Never rejects. `true` means the host accepted the bytes without reporting a fault; it does not
+	 * prove that the child read them. An ordinary write settles when the kernel accepts it. Only a
+	 * full pipe can hold the write unconfirmed. The `delivery` option can bound that wait, and every
+	 * terminal teardown path settles pending writes. On Windows 11 with Node v24.18.1, measured on
+	 * 2026-08-21, a child that closes its own file descriptor 0 can leave the parent pipe writable:
+	 * the write can settle `true` without a callback error or a stream error while the child remains
+	 * alive. After `stop` or `destroy` begins, a later call settles `false`. Version 0.0.4 could settle
+	 * that call `true` before teardown destroyed the pipe; returning `false` avoids claiming delivery
+	 * for bytes the package is about to discard.
 	 *
 	 * @param text - The line text without its trailing newline
-	 * @returns True when the line reached the host without error; false when the channel was closed, destroyed, ended, or the write failed
+	 * @returns True when the host accepted the bytes without reporting a fault; false when the channel was closed, destroyed, ended, failed, or remained unconfirmed through `delivery`
 	 */
 	send(text: string): Promise<boolean>
 	/**
@@ -222,13 +242,15 @@ export interface ProcessInterface {
  * The settled outcome of a one-shot run: the buffered output and the terminal state.
  *
  * @remarks
- * `failed` is `true` when the child exited non-zero, was killed by a signal, expired, was aborted, or
- * failed to spawn. `expired` and `aborted` name the ways the run ended the child rather than the
- * child ending itself, and only the earliest observed is recorded. `truncated` is independent of
- * both: it reports that a captured stream omitted output because it exceeded `limit`, which fails a
- * synchronous run and does not fail an asynchronous one. `ProcessInterface` carries the same name for
- * the same fact against a supervised child's retention bounds. A spawn fault reports the host's negative errno for `execute`. A spawn fault reports
- * `null` for `executeSync`.
+ * `failed` is `true` when the run timed out, was aborted, ended on a host fault, was ended by a
+ * signal, or exited with a code other than `0`. `expired` and `aborted` name the ways the run ended
+ * the child rather than the child ending itself, and only the earliest observed is recorded.
+ * `truncated` reports that a captured stream omitted output because it exceeded `limit`, which
+ * fails a synchronous run and does not fail an asynchronous one. `ProcessInterface` carries the
+ * same name for the same fact against a supervised child's retention bounds. For a `strict: false`
+ * caller, `failed: true` with `expired`, `aborted`, and `truncated` false, `code: 0`, and
+ * `signal: null` is the residual signature that a host fault ended the run. A spawn fault reports
+ * the host's negative errno for `execute`. A spawn fault reports `null` for `executeSync`.
  */
 export interface ExecuteResult {
 	/** The command line that was run, for diagnostics. */
diff --git a/src/server/Process.ts b/src/server/Process.ts
index 523c457..9d6fbd9 100644
--- a/src/server/Process.ts
+++ b/src/server/Process.ts
@@ -7,7 +7,13 @@ import { spawn } from 'node:child_process'
 import { createInterface } from 'node:readline'
 import { StringDecoder } from 'node:string_decoder'
 import { Emitter } from '@orkestrel/emitter'
-import { PROCESS_BACKLOG, PROCESS_CONFIRMATION, PROCESS_EVIDENCE, PROCESS_GRACE } from '@src/core'
+import {
+	ProcessError,
+	PROCESS_BACKLOG,
+	PROCESS_CONFIRMATION,
+	PROCESS_EVIDENCE,
+	PROCESS_GRACE,
+} from '@src/core'
 import {
 	buildSpawn,
 	mergeEnvironment,
@@ -34,8 +40,11 @@ import {
  * overshoot it by the line that crossed it plus the rest of its delivered chunk. Termination never
  * reapplies backpressure, and retained lines are capped at twice `backlog`; later lines are dropped
  * and `truncated` reports the omission. Standard error is decoded and forwarded live as the `stderr`
- * event while a byte-bounded raw tail is retained as `evidence`. The typed `emitter` also carries the
- * child `error` cause on a spawn fault and the terminal `exit`, alongside the `exit` promise. `pid`,
+ * event while a byte-bounded raw tail is retained as `evidence`. The typed `emitter` also carries a
+ * child `error` cause on a spawn fault, a `protocol` {@link ProcessError} on a host-reported stdin
+ * fault after the constructor input phase, and the terminal `exit`, alongside the `exit` promise.
+ * A fault arising from the constructor-supplied `input` write or its closing `end` stays quiet
+ * because the package initiated that sequence. `pid`,
  * `code`, and `signal` read the spawned child directly, so the native exit is readable before the
  * `exit` promise settles on stdio close. `stop` ends the whole tree and reports whether the native
  * exit was observed; `destroy` stops the child, destroys stdin so every pending `send` settles, and
@@ -61,6 +70,7 @@ export class Process implements ProcessInterface {
 	readonly #grace: number
 	readonly #evidence: number
 	readonly #backlog: number
+	readonly #delivery: number
 	readonly #decoder = new StringDecoder('utf8')
 	readonly #exit = Promise.withResolvers<ProcessExit>()
 	readonly #lines: AsyncIterable<string>
@@ -68,6 +78,10 @@ export class Process implements ProcessInterface {
 	readonly #waiters: Array<PromiseWithResolvers<IteratorResult<string, void>>> = []
 	readonly #signal: AbortSignal | undefined
 	readonly #abort: EventListener | undefined
+	readonly #writes = new Map<
+		PromiseWithResolvers<boolean>,
+		ReturnType<typeof setTimeout> | undefined
+	>()
 	#tail: Buffer = Buffer.alloc(0)
 	#head = 0
 	#pending = 0
@@ -81,6 +95,10 @@ export class Process implements ProcessInterface {
 	#terminating = false
 	#closed = false
 	#ended = false
+	#input = 0
+	#inputEvent = false
+	#inputFault: Error | undefined
+	#failure: Error | undefined
 	#stopping: Promise<boolean> | undefined
 	#ending: Promise<void> | undefined
 
@@ -100,6 +118,7 @@ export class Process implements ProcessInterface {
 		const grace = options.grace
 		const evidence = options.evidence
 		const backlog = options.backlog
+		const delivery = options.delivery
 		const writable = options.writable
 		const signal = options.signal
 		const on = options.on
@@ -109,6 +128,7 @@ export class Process implements ProcessInterface {
 		validateCommand(command)
 		validateWorkspace(workspace)
 		validateTimer(grace, "option 'grace'")
+		validateTimer(delivery, "option 'delivery'")
 		validateBytes(evidence, "option 'evidence'", 0)
 		validateBytes(backlog, "option 'backlog'", 1)
 		this.#emitter = new Emitter<ProcessEventMap>({
@@ -118,6 +138,7 @@ export class Process implements ProcessInterface {
 		this.#grace = grace ?? PROCESS_GRACE
 		this.#evidence = evidence ?? PROCESS_EVIDENCE
 		this.#backlog = backlog ?? PROCESS_BACKLOG
+		this.#delivery = delivery ?? 0
 		this.#signal = signal
 		this.#lines = Object.freeze({ [Symbol.asyncIterator]: this.#iterate.bind(this) })
 		const childEnvironment = mergeEnvironment(command.isolated === true, command.environment)
@@ -135,10 +156,16 @@ export class Process implements ProcessInterface {
 		this.#reader.once('close', this.#finish.bind(this))
 		this.#child.once('error', (cause: unknown) => this.#emitter.emit('error', cause))
 		this.#child.once('close', this.#close.bind(this))
-		this.#child.stdin.on('error', () => undefined)
+		this.#child.stdin.on('error', (cause: Error) => this.#failInput(cause, true))
 		this.#child.stderr.on('data', this.#retain.bind(this))
-		if (input !== undefined) this.#child.stdin.write(input)
-		if (writable !== true) this.#child.stdin.end()
+		if (input !== undefined) {
+			this.#input += 1
+			this.#child.stdin.write(input, this.#completeInput.bind(this))
+		}
+		if (writable !== true) {
+			this.#input += 1
+			this.#child.stdin.end(this.#completeInput.bind(this))
+		}
 		if (signal !== undefined) {
 			this.#abort = this.#terminate.bind(this)
 			signal.addEventListener('abort', this.#abort, { once: true })
@@ -190,24 +217,36 @@ export class Process implements ProcessInterface {
 	 * Write one line to the open standard-input channel.
 	 *
 	 * @remarks
-	 * Never rejects. The promise settles when the host reports the line handled, so a line written to
-	 * a child that is not reading stays pending until the child drains it or the channel closes. Every
-	 * terminal teardown path destroys stdin, so a pending write always settles by teardown; a caller
-	 * that needs its own deadline arms a timer and calls `stop`.
+	 * Never rejects. `true` means the host accepted the bytes without reporting a fault; it does not
+	 * prove that the child read them. An ordinary write settles when the kernel accepts it. Only a
+	 * full pipe can hold the write unconfirmed. The `delivery` option can bound that wait, and every
+	 * terminal teardown path settles pending writes. On Windows 11 with Node v24.18.1, measured on
+	 * 2026-08-21, a child that closes its own file descriptor 0 can leave the parent pipe writable:
+	 * the write can settle `true` without a callback error or a stream error while the child remains
+	 * alive. After `stop` or `destroy` begins, a later call settles `false`. Version 0.0.4 could settle
+	 * that call `true` before teardown destroyed the pipe; returning `false` avoids claiming delivery
+	 * for bytes the package is about to discard.
 	 *
 	 * @param text - The line text without its trailing newline
-	 * @returns True when the line reached the host without error; false when the channel was closed, destroyed, ended, or the write failed
+	 * @returns True when the host accepted the bytes without reporting a fault; false when the channel was closed, destroyed, ended, failed, or remained unconfirmed through `delivery`
 	 */
 	send(text: string): Promise<boolean> {
 		const stdin = this.#child.stdin
-		if (this.#closed || !stdin.writable) return Promise.resolve(false)
+		if (this.#closed || this.#terminating || this.#failure !== undefined || !stdin.writable) {
+			return Promise.resolve(false)
+		}
 		const settled = Promise.withResolvers<boolean>()
+		this.#writes.set(settled, undefined)
 		try {
-			stdin.write(`${text}\n`, (error?: Error | null) => {
-				settled.resolve(error === undefined || error === null)
-			})
+			stdin.write(`${text}\n`, this.#confirmWrite.bind(this, settled))
 		} catch {
-			return Promise.resolve(false)
+			this.#settleWrite(settled, false)
+			return settled.promise
+		}
+		if (this.#delivery > 0 && this.#writes.has(settled)) {
+			const timer = setTimeout(() => this.#settleWrite(settled, false), this.#delivery)
+			timer.unref()
+			this.#writes.set(settled, timer)
 		}
 		return settled.promise
 	}
@@ -345,6 +384,56 @@ export class Process implements ProcessInterface {
 		this.#signal.removeEventListener('abort', this.#abort)
 	}
 
+	#confirmWrite(settled: PromiseWithResolvers<boolean>, error?: Error | null): void {
+		if (error === undefined || error === null) {
+			this.#settleWrite(settled, true)
+			return
+		}
+		this.#failInput(error)
+	}
+
+	#completeInput(error?: Error | null): void {
+		this.#input -= 1
+		if (error !== undefined && error !== null && !this.#inputEvent) {
+			this.#inputFault = error
+		}
+		if (this.#input === 0 && this.#inputEvent) {
+			this.#inputEvent = false
+			this.#inputFault = undefined
+		}
+	}
+
+	#settleWrite(settled: PromiseWithResolvers<boolean>, accepted: boolean): void {
+		if (!this.#writes.has(settled)) return
+		const timer = this.#writes.get(settled)
+		this.#writes.delete(settled)
+		clearTimeout(timer)
+		settled.resolve(accepted)
+	}
+
+	#settleWrites(): void {
+		for (const settled of this.#writes.keys()) this.#settleWrite(settled, false)
+	}
+
+	#failInput(cause: Error, emitted = false): void {
+		if (emitted && (this.#input > 0 || this.#inputFault !== undefined)) {
+			this.#inputEvent = true
+			this.#settleWrites()
+			if (this.#input === 0) {
+				this.#inputEvent = false
+				this.#inputFault = undefined
+			}
+			return
+		}
+		if (this.#failure !== undefined || this.#terminating) return
+		this.#failure = cause
+		this.#settleWrites()
+		this.#emitter.emit(
+			'error',
+			new ProcessError('The standard-input channel failed', { code: 'protocol', cause }),
+		)
+	}
+
 	#capBacklog(): void {
 		const limit = this.#backlog * 2
 		while (this.#pending > limit && this.#queue.length > this.#head) {
@@ -363,6 +452,7 @@ export class Process implements ProcessInterface {
 		this.#capBacklog()
 		this.#relieve()
 		const confirmed = await stopChild(this.#child, this.#grace, PROCESS_CONFIRMATION)
+		this.#settleWrites()
 		this.#child.stdin.destroy()
 		return confirmed
 	}
diff --git a/src/server/execution/execute.ts b/src/server/execution/execute.ts
index 283f864..d9b00b4 100644
--- a/src/server/execution/execute.ts
+++ b/src/server/execution/execute.ts
@@ -33,7 +33,10 @@ import {
  * rather than on process exit, so a descendant that inherited the child's stdio holds the run open
  * after the child itself has gone. Give such a run a `timeout`. The child's `environment` merges over
  * the parent unless the command is `isolated`, then `options.environment` on top, and `options.input`
- * overrides `command.input`. Unless `strict` is `false`, a failed run rejects with a
+ * overrides `command.input`. A host fault while writing that input terminates the run by design and
+ * marks its result failed; a strict rejection carries the host fault as its cause. This differs
+ * from `Process` constructor input, whose package-initiated input phase stays quiet. Unless `strict`
+ * is `false`, a failed run rejects with a
  * {@link createExecuteError} carrying the {@link ExecuteResult}. An invalid option or command string rejects
  * before the child is spawned, because an async function cannot throw synchronously.
  *
@@ -83,6 +86,7 @@ export async function execute(
 	const terminate = new AbortController()
 	const cleanup = new AbortController()
 	const finish = new AbortController()
+	const inputFailure = new AbortController()
 	const outChunks: Buffer[] = []
 	const errChunks: Buffer[] = []
 	const outRetention = new Retention()
@@ -140,7 +144,17 @@ export async function execute(
 		{ once: true },
 	)
 
-	child.stdin.on('error', () => undefined)
+	inputFailure.signal.addEventListener(
+		'abort',
+		() => {
+			if (finish.signal.aborted) return
+			cause = inputFailure.signal.reason
+			terminate.abort()
+		},
+		{ once: true },
+	)
+
+	child.stdin.on('error', (error: Error) => inputFailure.abort(error))
 	child.stdout.on('data', (chunk: unknown) => {
 		const retained = outRetention.retain(chunk, limit)
 		if (retained !== undefined) outChunks.push(retained)
@@ -159,7 +173,11 @@ export async function execute(
 	})
 	child.once('close', () => finish.abort())
 
-	if (text !== undefined) child.stdin.write(text)
+	if (text !== undefined) {
+		child.stdin.write(text, (error?: Error | null) => {
+			if (error !== undefined && error !== null) inputFailure.abort(error)
+		})
+	}
 	child.stdin.end()
 	if (timeout > 0) {
 		timeoutTimer = setTimeout(() => {
diff --git a/tests/distribution.test.ts b/tests/distribution.test.ts
index ba380ee..ebb8dac 100644
--- a/tests/distribution.test.ts
+++ b/tests/distribution.test.ts
@@ -15,6 +15,8 @@ import { fileURLToPath } from 'node:url'
 import { expect, it } from 'vitest'
 import * as ts from 'typescript'
 
+// The `prepublishOnly` gate runs `build` before `test:distribution`, so suppressing `prepack` here
+// packs that built artifact; a standalone run reads the artifact already on disk.
 // The consumer this proof builds is the only subject that answers for the published artifact. A
 // specifier resolved from this repository reaches the repository's own manifest, or the copy of an
 // earlier release installed under `node_modules`, so every assertion below is rooted in the
@@ -25,10 +27,14 @@ it('installs the packed artifact and drives its entries, declarations, and resol
 	const scratch = mkdtempSync(join(tmpdir(), 'orkestrel-process-distribution-'))
 
 	try {
-		const pack = spawnSync('npm', ['pack', '--json', '--pack-destination', scratch], {
-			cwd: root,
-			encoding: 'utf8',
-		})
+		const pack = spawnSync(
+			'npm',
+			['pack', '--json', '--ignore-scripts', '--pack-destination', scratch],
+			{
+				cwd: root,
+				encoding: 'utf8',
+			},
+		)
 		if (pack.error !== undefined || pack.status !== 0) {
 			throw new Error(`npm pack failed: ${pack.error?.message ?? pack.stderr}`)
 		}
diff --git a/tests/src/server/Process.test.ts b/tests/src/server/Process.test.ts
index 110e5b7..2a8545c 100644
--- a/tests/src/server/Process.test.ts
+++ b/tests/src/server/Process.test.ts
@@ -87,6 +87,82 @@ describe('Process', () => {
 		expect(lines).toEqual(['first-line', 'final-partial-line'])
 	})
 
+	// The framing contract, driven through the shipped `readline` path. Each child writes its bytes
+	// with `-e` rather than through a fixture mode, so the exact terminators under test sit beside
+	// the lines they must produce. The lone-CR rows are what discriminate this framer from a
+	// line-feed-only one: a framer that ignored a bare carriage return would yield `a\rb` for the
+	// `carriage` child and one whole line for the redrawing child.
+	it('terminates a line on a line feed, a CRLF pair, and a bare carriage return alike', async () => {
+		const feed = createProcess({
+			command: { file: process.execPath, arguments: ['-e', 'process.stdout.write("a\\nb\\n")'] },
+			workspace: process.cwd(),
+			grace: 20,
+		})
+		const carriage = createProcess({
+			command: { file: process.execPath, arguments: ['-e', 'process.stdout.write("a\\rb\\n")'] },
+			workspace: process.cwd(),
+			grace: 20,
+		})
+		const pair = createProcess({
+			command: { file: process.execPath, arguments: ['-e', 'process.stdout.write("a\\r\\nb\\n")'] },
+			workspace: process.cwd(),
+			grace: 20,
+		})
+		const consecutive = createProcess({
+			command: { file: process.execPath, arguments: ['-e', 'process.stdout.write("a\\r\\rb\\n")'] },
+			workspace: process.cwd(),
+			grace: 20,
+		})
+		const trailing = createProcess({
+			command: { file: process.execPath, arguments: ['-e', 'process.stdout.write("x\\ry\\rz")'] },
+			workspace: process.cwd(),
+			grace: 20,
+		})
+
+		expect(await collect(feed.lines)).toEqual(['a', 'b'])
+		expect(await collect(carriage.lines)).toEqual(['a', 'b'])
+		expect(await collect(pair.lines)).toEqual(['a', 'b'])
+		// A carriage return terminates in every position, so the run between two of them frames an
+		// empty line rather than collapsing.
+		expect(await collect(consecutive.lines)).toEqual(['a', '', 'b'])
+		// No trailing terminator: the last redraw still arrives as its own line when stdout closes.
+		expect(await collect(trailing.lines)).toEqual(['x', 'y', 'z'])
+	})
+
+	// The consequence a consumer meets: a child redrawing one status line yields one line per redraw
+	// rather than one line for the bar.
+	it('yields one line per carriage-return redraw', async () => {
+		const child = createProcess({
+			command: {
+				file: process.execPath,
+				arguments: ['-e', 'process.stdout.write("10%\\r50%\\r100%\\n")'],
+			},
+			workspace: process.cwd(),
+			grace: 20,
+		})
+
+		expect(await collect(child.lines)).toEqual(['10%', '50%', '100%'])
+	})
+
+	// The join half of the framing rule, which needs the pair to arrive in separate chunks: the child
+	// writes the carriage return, yields to its own event loop, then writes the line feed. A framer
+	// that treated each chunk independently would report an empty line between `a` and `b`.
+	it('joins a CRLF pair split across delivered chunks into one break', async () => {
+		const child = createProcess({
+			command: {
+				file: process.execPath,
+				arguments: [
+					'-e',
+					'process.stdout.write("a\\r"); setTimeout(() => { process.stdout.write("\\nb\\n"); process.exit(0) }, 60)',
+				],
+			},
+			workspace: process.cwd(),
+			grace: 20,
+		})
+
+		expect(await collect(child.lines)).toEqual(['a', 'b'])
+	})
+
 	it('forwards complete stderr live while retaining only the byte-bounded tail', async () => {
 		const chunks = createRecorder<readonly [string]>()
 		const child = createProcess({
@@ -168,6 +244,25 @@ describe('Process', () => {
 		expect(refused).toBe(false)
 	})
 
+	it('keeps constructor input closure quiet when a non-reading child exits', async () => {
+		const errors = createRecorder<readonly [unknown]>()
+		const child = createProcess({
+			command: {
+				file: process.execPath,
+				arguments: ['-e', 'setTimeout(() => process.exit(0), 150)'],
+				input: 'x'.repeat(4 * 1_024 * 1_024),
+			},
+			workspace: process.cwd(),
+			grace: 20,
+			on: { error: errors.handler },
+		})
+
+		await child.exit
+		await child.destroy()
+
+		expect(errors.count).toBe(0)
+	})
+
 	it('settles a write the child never reads once teardown destroys the channel', async () => {
 		const child = createProcess({
 			command: childCommand('sleep'),
@@ -184,6 +279,132 @@ describe('Process', () => {
 		expect(await delivery).toBe(false)
 	})
 
+	// The bound `delivery` puts on an unconfirmed write. Its control is the proof named `settles a
+	// write the child never reads once teardown destroys the channel`: the same 4 MB write to the same
+	// non-reading child, with no `delivery`, stays pending until teardown destroys the channel. Here
+	// the write settles while the child is still live and nothing has been torn down, which is the
+	// whole of what the option adds.
+	it('settles an unconfirmed write false at the delivery bound while the child is still live', async () => {
+		const errors = createRecorder<readonly [unknown]>()
+		const child = createProcess({
+			command: childCommand('sleep'),
+			workspace: process.cwd(),
+			grace: 20,
+			writable: true,
+			delivery: 50,
+			on: { error: errors.handler },
+		})
+
+		const settled = await child.send('x'.repeat(4 * 1_024 * 1_024))
+		const live = { code: child.code, signal: child.signal }
+		await child.destroy()
+
+		expect(settled).toBe(false)
+		expect(errors.count).toBe(0)
+		// The terminal pair is still null, so no exit and no teardown settled this write: the bound did.
+		expect(live).toEqual({ code: null, signal: null })
+	})
+
+	it('confirms a write to a reading child when delivery is bounded', async () => {
+		const child = createProcess({
+			command: childCommand('echo'),
+			workspace: process.cwd(),
+			grace: 20,
+			writable: true,
+			delivery: 250,
+		})
+
+		const accepted = await child.send('ping')
+		await child.send('stop')
+		await child.exit
+
+		expect(accepted).toBe(true)
+	})
+
+	// A host-reported channel fault, driven through the door this host offers: a write the child never
+	// read, still pending when the child exits on its own. The parent's pipe then fails — `write EOF`
+	// on Windows, `EPIPE` on POSIX — and the contract is the same either way, so this asserts the
+	// engine's shape rather than the host's errno. Its quiet counterpart is the proof named `settles a
+	// pending write false inside teardown and emits no error`: the same pending write, settled by the
+	// package's own teardown instead, emits nothing.
+	it('refuses the write and emits one protocol error when the host reports a stdin fault', async () => {
+		const errors = createRecorder<readonly [unknown]>()
+		const child = createProcess({
+			command: {
+				file: process.execPath,
+				arguments: ['-e', 'console.log("ready"); setTimeout(() => process.exit(0), 150)'],
+				input: 'initial input',
+			},
+			workspace: process.cwd(),
+			grace: 20,
+			writable: true,
+			on: { error: errors.handler },
+		})
+		const iterator = child.lines[Symbol.asyncIterator]()
+		const ready = await iterator.next()
+
+		const settled = await child.send('x'.repeat(4 * 1_024 * 1_024))
+		const refused = await child.send('after the fault')
+		await child.exit
+		await child.destroy()
+
+		expect(ready.value).toBe('ready')
+		expect(settled).toBe(false)
+		// One failure state per channel: the write callback and the stream error report it once, and
+		// every later write is refused with no further event.
+		expect(refused).toBe(false)
+		expect(errors.count).toBe(1)
+		const fault = errors.calls[0]?.[0]
+		expect(isProcessError(fault)).toBe(true)
+		expect(isProcessError(fault) ? fault.code : undefined).toBe('protocol')
+		expect(fault instanceof Error && fault.cause instanceof Error).toBe(true)
+	})
+
+	// Package-initiated closure stays quiet. Nothing host-reported happened, so there is nothing to
+	// report: the pending write resolves false and no `error` event fires. The order is pinned beside
+	// it, because the settle belongs to the stop path rather than to whatever runs after `destroy`.
+	it('settles a pending write false inside teardown and emits no error', async () => {
+		const errors = createRecorder<readonly [unknown]>()
+		const order: string[] = []
+		const child = createProcess({
+			command: childCommand('sleep'),
+			workspace: process.cwd(),
+			grace: 20,
+			writable: true,
+			on: { error: errors.handler },
+		})
+
+		const pending = child.send('x'.repeat(4 * 1_024 * 1_024)).then((accepted) => {
+			order.push('write')
+			return accepted
+		})
+		const raced = await Promise.race([pending, waitForDelay(150).then(() => 'pending')])
+		await child.destroy()
+		order.push('teardown')
+
+		expect(raced).toBe('pending')
+		expect(await pending).toBe(false)
+		expect(order).toEqual(['write', 'teardown'])
+		expect(errors.count).toBe(0)
+	})
+
+	// Version 0.0.4 accepted a write issued after `stop` began, then destroyed the pipe. The retained
+	// contract refuses that write because teardown cannot confirm delivery it is about to discard.
+	it('refuses a send after teardown begins', async () => {
+		const child = createProcess({
+			command: childCommand('sleep'),
+			workspace: process.cwd(),
+			grace: 20,
+			writable: true,
+		})
+
+		const stopping = child.stop()
+		const accepted = await child.send('after stop')
+		await stopping
+
+		expect(accepted).toBe(false)
+	})
+
 	it('collapses repeated stops and a concurrent abort onto one termination', async () => {
 		const controller = new AbortController()
 		const child = createProcess({
@@ -245,7 +466,32 @@ describe('Process', () => {
 		},
 	)
 
+	// The flooding child traps the stop signal, so what its exit reports is whatever this host reports
+	// for a trapped child — which is host-varying and therefore read at runtime rather than assumed.
+	// The reading is taken through the same `stop` door the proof uses, from a real child that installs
+	// a handler, with an untrapped child beside it as the control that proves the reading discriminates.
+	// Where the two disagree the host delivers a cooperative signal a child can ignore, the grace window
+	// elapses, and `SIGKILL` follows. Where they agree the host's stop path offers no signal to trap, so
+	// no escalation exists to observe: measured on Windows 11 with Node v24.18.1 on 2026-08-21,
+	// `taskkill /F /T` ends a trapped and an untrapped child alike at `{ code: 1, signal: null }`.
 	it('caps retained lines while termination drains a flooding child', async () => {
+		const trapping = createProcess({
+			command: childCommand('trap'),
+			workspace: process.cwd(),
+			grace: 50,
+		})
+		const trappingIterator = trapping.lines[Symbol.asyncIterator]()
+		const trapped = await trappingIterator.next()
+		await trapping.stop()
+		const trappedExit = await trapping.exit
+		const untrapped = createProcess({
+			command: childCommand('hang'),
+			workspace: process.cwd(),
+			grace: 50,
+		})
+		await untrapped.stop()
+		const untrappedExit = await untrapped.exit
+
 		const backlog = 1_024
 		const child = createProcess({
 			command: childCommand('flood'),
@@ -262,9 +508,20 @@ describe('Process', () => {
 		const retained = await collect(child.lines)
 		const bytes = retained.reduce((total, line) => total + Buffer.byteLength(line) + 1, 0)
 
+		expect(trapped.value).toBe('trapped')
 		expect(ready.value).toBe('ready')
 		expect(confirmed).toBe(true)
-		expect(exit.signal).toBe('SIGKILL')
+		// The probe against its control: either trapping the stop signal changes the terminal pair, and
+		// the trapped child carries the escalation, or the two children report alike and this host's stop
+		// path offers no signal to trap. A host that reported a trapped child differently without
+		// escalating to `SIGKILL` fails here.
+		expect(
+			trappedExit.signal === 'SIGKILL' ||
+				(trappedExit.code === untrappedExit.code && trappedExit.signal === untrappedExit.signal),
+		).toBe(true)
+		// The flooding child traps the same signal, so it ends exactly as this host ends a trapped child.
+		// Where the host escalates, that reading is `SIGKILL` and this line carries the POSIX expectation.
+		expect(exit).toEqual(trappedExit)
 		expect(bytes).toBeLessThanOrEqual(backlog * 2)
 		expect(child.truncated).toBe(true)
 	})
diff --git a/tests/src/server/execution/execute.test.ts b/tests/src/server/execution/execute.test.ts
index 0abb059..0ac7261 100644
--- a/tests/src/server/execution/execute.test.ts
+++ b/tests/src/server/execution/execute.test.ts
@@ -188,6 +188,33 @@ describe('execute', () => {
 		expect(code).toBeLessThan(0)
 	})
 
+	it('reports a pending input write fault as the cause of a failed run', async () => {
+		const input = 'x'.repeat(4 * 1_024 * 1_024)
+		const faulting = {
+			file: process.execPath,
+			arguments: ['-e', 'setTimeout(() => process.exit(0), 150)'],
+		}
+		const reading = {
+			file: process.execPath,
+			arguments: ['-e', 'process.stdin.resume()'],
+		}
+
+		const result = await execute(faulting, { input, strict: false })
+		let thrown: unknown
+		try {
+			await execute(faulting, { input })
+		} catch (error) {
+			thrown = error
+		}
+		const control = await execute(reading, { input })
+
+		expect(result.failed).toBe(true)
+		expect(isProcessError(thrown)).toBe(true)
+		expect(isProcessError(thrown) ? thrown.cause : undefined).toBeInstanceOf(Error)
+		expect(control.failed).toBe(false)
+		expect(control.code).toBe(0)
+	})
+
 	it('refuses a NUL in a per-run environment override before spawning', async () => {
 		const nul = String.fromCodePoint(0)
 		let thrown: unknown
```
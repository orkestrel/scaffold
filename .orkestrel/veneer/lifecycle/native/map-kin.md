# map:kin

All paths below are relative to `C:\Users\mikes\WebstormProjects\`. One fact contradicts the brief, so it comes first. At HEAD `dee8845` (Release 0.0.20), probe does not use `@orkestrel/pool`. Its server code imports only queue and timeout for lifecycle (`probe/src/server/Probe.ts:13-22`, `probe/package.json:99-100`). The pool design is still a plan: `probe/ROADMAP.md:5` (item 1), and `probe/tmp/codex/eager-probe-brief.md:13`, which has no output beside it.

PUBLISH STATE (facts; checked against registry.npmjs.org)
- pool: the registry's latest is 0.0.15, built from commit `4c589c6`. Two later commits add `capacity`: `3ff0c63` and `1f194d7`. That release's `types.ts` has no `capacity` option, and `package.json` still says 0.0.15.
- browser: HEAD passes `capacity: contexts` to the pool (`browser/src/server/BrowserMCPServer.ts:207`) but pins `^0.0.15` (`browser/package.json:110`). Its installed `node_modules/@orkestrel/pool` is labeled 0.0.15 and contains `capacity`, so it is a local build, not the registry copy. The bump to 0.0.25 is uncommitted; the registry has 0.0.24.
- supervisor: the registry has 0.0.1, the local copy is 0.0.2 with no Release commit, and HEAD `f5fc6e2` is titled "update".
- In sync with the registry: mcp 0.0.36 and worker 0.0.15 (the registry gitHead equals local HEAD), plus probe 0.0.20, process 0.0.14, timeout 0.0.12, abort 0.0.12, server 0.0.22, and queue 0.0.16.

PER PACKAGE (facts)
- process
  - It spawns the child eagerly in the constructor (`process/src/server/processes/Supervisor.ts:159-169`), and an abort signal leads to `stop` (`:180-184`).
  - Stopping sends SIGTERM, waits `grace`, then sends SIGKILL. On Windows it runs `taskkill /F /T` instead (`process/src/server/helpers.ts:773-790`, `:683-694`).
  - After the native exit it waits a bounded `drain` time for the output pipes to close (`Supervisor.ts:369-384`), and `stop`/`destroy` share one barrier (`:332-350`).
  - It never restarts a child. `ProcessManager` removes a child when it exits (`ProcessManager.ts:193-198`) and adopts no child that launches during teardown (`:128-133`, `:215-224`).
- supervisor
  - It renews its lease on a timer at two-thirds of the TTL, retries on a TTL/3 spacing, and gives up after a final attempt at TTL/6 (`supervisor/src/core/Run.ts:539-619`).
  - Losing the lease aborts the controller and destroys every handle (`Run.ts:621-636`).
  - Its probe bounds a child with a raw `setTimeout` and then `child.stop()` (`supervisor/src/server/executors/ProviderExecutor.ts:209-224`).
  - Recovery after a restart chooses `relaunch`, `reattach`, or `quarantine` (`Run.ts:430-480`). Each execution is a `Process` from `@orkestrel/process` (`ProviderExecution.ts:51-58`).
- probe
  - It arms its stages when constructed (`Probe.ts:159`), and the construction happens on the first `prove` (`ProbeServer.ts:234-245`).
  - A failed arm is retried once per later call, with no overall limit (`Probe.ts:229-242`).
  - Every stage call runs under a `createTimeout` deadline (`Probe.ts:509-531`). When the deadline expires, the stage is replaced by identity (`Probe.ts:536-575`).
  - When the lint server exits, the exit is recorded but nothing replaces it (`LintStage.ts:156`, `:173-175`).
  - On SIGINT, SIGTERM, or stdin close the server tears down (`ProbeServer.ts:122-125`, `:134-159`).
- mcp
  - The stdio client is built on process's `Supervisor` (`mcp/src/server/transports/StdioClientTransport.ts:146-166`).
  - Closing ends stdin, races the child's exit against `MCP_STDIO_GRACE` using a raw `setTimeout`, then destroys the child (`:222-244`).
  - A restart happens only when the caller calls `start()` again, as a new generation (`:131-145`, `:251-275`).
  - `MCPClient` uses `AbortSignal.timeout` for request and close deadlines (`mcp/src/core/MCPClient.ts:643`, `:1052-1065`). When the connection is lost, every pending request is rejected (`:1006-1008`).
  - The `handshake` hook runs on `initialize` (`mcp/src/core/MCPLegacy.ts:143-147`).
- server: `stop()` runs one `drain` deadline built from `createTimeout`, and an expired drain cuts the remaining connections (`server/src/server/Server.ts:276-298`). Cancellation uses `createAbort` and `linkSignal` (`:22`, `:120`).
- timeout / abort: `Timeout` wraps one `setTimeout` with an abort signal; its timer is not `unref`'d (`timeout/src/core/Timeout.ts:74-78`). abort exports `linkSignal` (`abort/src/core/helpers.ts:100`). Neither offers a helper that races a promise against a deadline.
- browse (browser) mechanisms
  - Browsers come from a pool with `min`, `restarts`, `watch` fed by the `disconnect` event, `validate`, and `capacity` (`BrowserMCPServer.ts:200-209`, `:784-789`).
  - Chromium is started with a raw `spawn` (`browser/src/server/helpers.ts:462-465`), not `@orkestrel/process`.
  - Termination sends SIGTERM, waits, sends SIGKILL, and polls the leftover process group every interval (`browser/src/server/Browser.ts:1124-1175`).
- worker: `NodeWorker` passes only `create`, `destroy`, `validate`, and `max` to the pool (`worker/src/server/NodeWorker.ts:45-50`). It does not pass `watch`, `min`, or `restarts`, although core `Worker` forwards them (`worker/src/core/Worker.ts:87-105`) and threads already record their death (`worker/src/server/types.ts:29-33`).

SAME STEP, DONE DIFFERENTLY (facts)
1. Killing a process tree on Windows: process runs `taskkill /T` (`helpers.ts:779-781`). browser signals one pid with `process.kill` (`Browser.ts:1096-1100`).
2. Children left behind after the root exits (POSIX): process returns as soon as the root exits (`helpers.ts:778`, `:787`). browser polls with signal 0 until they are gone (`Browser.ts:1130-1138`).
3. SIGKILL not confirmed: process returns `false` (`helpers.ts:789`). browser throws `BrowserConnectionError` (`Browser.ts:1169`).
4. Deadlines are written five ways:
   - a raw `setTimeout` race: `process/.../helpers.ts:714`, `:740`; `StdioClientTransport.ts:230`; `ProviderExecutor.ts:219`; `browser/.../helpers.ts:551`
   - `AbortSignal.timeout`: `MCPClient.ts:1052`; `Browser.ts:1054`
   - `createTimeout`: `Probe.ts:515`; `Server.ts:281`
   - Inside mcp, `MCPClient.ts:116` says "never a raw `setTimeout`", yet `StdioClientTransport.ts:230` uses one.
5. Replacing a dead worker: browser's pool `watch` refills it (`BrowserMCPServer.ts:204`). probe replaces a stage only on a deadline (`Probe.ts:526`) and keeps a dead lint server (`LintStage.ts:173`). worker notices a dead thread only at the next `validate` (`NodeWorker.ts:69-71`).
6. Limit on retrying a failed start: the pool counts strikes against `restarts` (`pool/src/core/types.ts:84-92`). probe retries once per call, without end (`Probe.ts:229-242`). supervisor's lease retry is spaced by time, not counted (`Run.ts:595-608`).
7. Graceful close of a stdio child: mcp ends stdin first and then escalates (`StdioClientTransport.ts:232-240`). process `stop` signals immediately (`helpers.ts:783`). browser signals immediately (`Browser.ts:1163`).
8. Teardown barrier: process, pool, probe, and browser share one promise across calls. `Server.destroy()` keeps no promise, so a second concurrent call runs the close again (`Server.ts:257-269`).
9. Stdio server onset and signals: probe (`ProbeServer.ts:105-159`) and browse (`BrowserMCPServer.ts:253-305`) each wire stdin close, SIGINT, and SIGTERM in their own way.

OPINION
- Publish pool 0.0.16, which carries `capacity`, before browser 0.0.25, and re-pin browser to `^0.0.16`. A browser built against the current pin would ship code that the registry copy of pool 0.0.15 cannot satisfy. Supervisor is the only other package whose local version is ahead of the registry; it stays out unless you bring it back into the release waves.
- Move to pool: nothing that blocks. `watch`, the warm floor, `restarts`, and `capacity` are already there. One gap may be worth a look: a hand-out liveness check (the browse server pings before each call, `BrowserMCPServer.ts:657`) as a `validate` option that also runs on shared leases.
- Move to worker: wire `NodeWorker` to the thread's death latch as `watch`, and forward `min`/`restarts`, so `createNodeWorker` gets the warm floor and loss-driven replacement that browse uses.
- Move to process: have browser launch Chromium through process's `Supervisor`, and merge the two kill procedures. process would take browser's wait for leftover group members (as an event-free bounded wait), and browser would take `taskkill /T`.
- timeout/abort: add one helper that races a promise against a deadline. That would cover findings 4 and 6 and replace the hand-written races in probe, mcp, and supervisor.
- mcp: one stdio-server helper for "serve until stdin ends or SIGINT/SIGTERM" would remove the duplication in finding 9.
- queue: probe ROADMAP item 1 already plans to swap probe's per-stage queues for pools (brief line 13). Nothing else in this map needs a change to queue.

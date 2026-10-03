# Resource consumers across the fleet

Grok 4.7 mapping lane `resource-consumers`, 2026-10-03, over every `@orkestrel/*` repository under `C:\Users\mikes\WebstormProjects\`. Read-only; no live run. Brief: `resource-consumers-brief.md`.

## 1. Consumers

### `@orkestrel/browser`

`Browser` (`C:\Users\mikes\WebstormProjects\browser\src\server\Browser.ts:72`) owns one Chromium-family child. Construction does not spawn (`Browser.ts:101-116`). `connect()` calls `#establish` (`Browser.ts:148-158`), which launches only after an optional CDP discovery miss (`Browser.ts:290-325`). `#launch` refuses a second child on the same instance (`Browser.ts:596-599`) and `launchBrowserProcess` spawns the executable (`C:\Users\mikes\WebstormProjects\browser\src\server\helpers.ts:350-371`).

Death is the child `exit` event (`Browser.ts:493-502`, `#handleProcessExit` at `Browser.ts:388-419`) or CDP transport `close` / `error` (`Browser.ts:478-482`, `#handleTransportLoss` at `Browser.ts:422-441`). A handed-off browser has no child handle, so transport loss is confirmed after `BROWSER_TRANSPORT_LOSS_DEFER_MS` (`Browser.ts:435-441`). Exit emits `error`, then `disconnect` and `idle` when the session had been connected (`Browser.ts:409-418`). Nothing in that path calls `#launch`. A later `connect()` can establish again. There is no restart counter.

`destroy` and `close` share `#shutdown` (`Browser.ts:264-284`) and run `#destroyResources` / `#closeResources` (`Browser.ts:840-906`): unbind, close or destroy contexts, `#terminate` (`Browser.ts:1124-1141`, `SIGTERM` then `SIGKILL`, with `BROWSER_KILL_GRACE_MS`), release the profile, then `#finish` destroys the emitter (`Browser.ts:1144-1157`). `#waitForRemainderWithin` is the one interval loop, and only for a POSIX group or a handed-off pid (`Browser.ts:1095-1110`). One process, several CDP contexts (`Browser.ts:90`).

The CDP socket is `WebSocketCDPTransport`. Its remarks say a later `start()` opens a new socket and concurrent `start` / `close` share one transition (`C:\Users\mikes\WebstormProjects\browser\src\server\transports\WebSocketCDPTransport.ts:28-29`). `Browser` binds that transport's `close` and `error` (`Browser.ts:478-482`). The transport does not replace itself.

`BrowserMCPServer` (`C:\Users\mikes\WebstormProjects\browser\src\server\BrowserMCPServer.ts:69`) is the browse server. `src\bin\main.ts:22-29` calls `createBrowserMCPServer(...).start()`. The class remarks and `#open` / `#launch` start one Chromium on the first tool call (`BrowserMCPServer.ts:33-44`, `196-233`). A rejected launch clears `#session` so the next call launches again (`BrowserMCPServer.ts:196-208`). A successful `#session` stays set. The server does not subscribe to the browser's exit. `destroy` removes signal handlers, stops stdio, drops tools, aborts, destroys the toolset, destroys the browser, then removes the profile (`BrowserMCPServer.ts:146-167`). One browser.

`tests\setupGlobal.ts` `setup` (`C:\Users\mikes\WebstormProjects\browser\tests\setupGlobal.ts:286-328`) starts a loopback HTTP fixture and, through `createBrowserLauncher`, two headless Chromiums before the browser test graph runs (`setupGlobal.ts:270-275`, `307-310`). Each launch is `createBrowser` then `connect` (`setupGlobal.ts:167-185`). The returned teardown destroys both browsers, closes the Vite runner, and closes the fixture server (`setupGlobal.ts:301-321`). No exit watch and no replacement. Two distinct endpoints, not an interchangeable pool.

`BrowserWorker` (`C:\Users\mikes\WebstormProjects\browser\src\core\BrowserWorker.ts:15-21`) is a CDP target session, not a `worker_threads` worker.

### `@orkestrel/probe`

`Probe` (`C:\Users\mikes\WebstormProjects\probe\src\server\Probe.ts:100`) constructs `TypeStage`, `LintStage`, and `RuntimeStage` in its constructor and starts `#arm` (`Probe.ts:125-159`). One queue per stage, `concurrency: 1`, `retries: 0` (`Probe.ts:144-158`). Each inspection is raced with `createTimeout` of `PROBE_DEADLINE` (`30_000`, `C:\Users\mikes\WebstormProjects\probe\src\core\constants.ts:98`). On expiry `#recycle` destroys that stage and constructs a new one of the same class (`Probe.ts:533-574`). `#ready` starts one replacement arm when the in-flight arm rejected, once per call (`Probe.ts:221-241`). `destroy` destroys the three stages, then the emitter (`Probe.ts:639-658`).

`TypeStage` (`C:\Users\mikes\WebstormProjects\probe\src\server\stages\TypeStage.ts:77`) warms a mirror in the constructor (`TypeStage.ts:98-102`, `236-244`). The compiler is a `tsc` child per warm and per check (`TypeStage.ts:46-47`, `#spawn` at `TypeStage.ts:561-607`), tracked in `#children` and removed on `error` or `close`. It is not kept. `destroy` `SIGTERM`s or Windows `taskkill /t /f`s those children and deletes the mirror (`TypeStage.ts:219-227`, `613-620`).

`LintStage` (`C:\Users\mikes\WebstormProjects\probe\src\server\stages\LintStage.ts:55`) starts one Oxlint language server in the constructor via `createStdioClientTransport` and `createLSPClient` (`LintStage.ts:78-84`, `142-158`). `exit` is stored as a string (`LintStage.ts:156-174`). A later inspection throws that ending (`LintStage.ts:242-246`). The stage does not spawn a successor. `destroy` calls `client.destroy()` (`LintStage.ts:135-136`). `grace` is `LINT_DEADLINE / 2` with `LINT_DEADLINE` `2_000` (`constants.ts:116`, `LintStage.ts:150`).

`RuntimeStage` (`C:\Users\mikes\WebstormProjects\probe\src\server\stages\RuntimeStage.ts:111`) starts one Vitest in the constructor (`RuntimeStage.ts:134-136`, `#warm` at `RuntimeStage.ts:315`). `#runner` closes and warms a new Vitest when `#specifications` reaches `PROBE_SPECIFICATIONS` (`64`, `constants.ts:156`, `RuntimeStage.ts:655-682`). That bound is retained URLs, not a dead-process count. No thread `exit` latch was read. `destroy` cancels the current run and `vitest.close()` (`RuntimeStage.ts:283-305`).

`ProbeServer` (`C:\Users\mikes\WebstormProjects\probe\src\server\ProbeServer.ts:56`) binds stdio in the constructor and does not construct `Probe` until an admitted `prove` (`ProbeServer.ts:230-238`). A constructor throw clears `#construction` so a later call retries (`ProbeServer.ts:241-244`). `start` listens to stdin `data` / `close` / `error` and `SIGINT` / `SIGTERM` (`ProbeServer.ts:105-125`). `destroy` removes those handlers, stops the transport, and destroys the probe (`ProbeServer.ts:134-158`). One probe.

### `@orkestrel/worker`

`Thread` (`C:\Users\mikes\WebstormProjects\worker\src\server\Thread.ts:13`) constructs `node:worker_threads` `Worker` immediately (`Thread.ts:26-29`). `alive` becomes false on `error`, `messageerror`, or `exit`, and `death` latches the first (`Thread.ts:40-42`, `68-77`). `createThread` resolves after `online` (`C:\Users\mikes\WebstormProjects\worker\src\server\factories.ts:41-42`).

`NodeWorker.build` (`C:\Users\mikes\WebstormProjects\worker\src\server\NodeWorker.ts:43-58`) passes the pool `create` / `destroy` (`worker.terminate()`) / `validate` (`alive && threadId > 0`) and, when set, `max: concurrency`. Threads are created when the pool acquires, not in the `NodeWorker` constructor. `Dispatch.#terminate` calls `Thread.evict()` and `worker.terminate()` on abort or a bad reply (`C:\Users\mikes\WebstormProjects\worker\src\server\Dispatch.ts:162-169`). The next acquire's `validate` drops the dead thread. `NodeWorkerOptions.retries` defaults to `0` and is the queue's extra job attempts (`C:\Users\mikes\WebstormProjects\worker\src\server\types.ts:71-72`), not a cap on thread spawns.

`Worker` (`C:\Users\mikes\WebstormProjects\worker\src\core\Worker.ts:47`) builds the pool in its constructor (`Worker.ts:80-89`). `max` is the caller's pool `max`, or `concurrency`, which defaults to `1` (`Worker.ts:67`, `84`). Acquire uses the attempt signal and `release` is in a `finally` (`Worker.ts:153-159`). `destroy` awaits queue destroy, then pool destroy, then destroys the emitter (`Worker.ts:162-177`). The token has no holder id. Several threads when `max` is greater than 1.

### `@orkestrel/mcp`

`StdioClientTransport` (`C:\Users\mikes\WebstormProjects\mcp\src\server\transports\StdioClientTransport.ts:68`) spawns one `@orkestrel/process` `Process` in `start()` (`StdioClientTransport.ts:140-154`). `child.exit` calls `#onExit` (`StdioClientTransport.ts:153`, `235-258`), which marks the lifetime closed and emits `close`. It does not construct another `Process`. A later `start()` waits out `#closing` and replaces the held child (`StdioClientTransport.ts:110-138`). The remarks describe a `start()` from a `close` listener as the restart (`StdioClientTransport.ts:251-252`). No restart count. `close` calls `child.destroy()` (`StdioClientTransport.ts:203-213`). One child.

`MCPSession` (`C:\Users\mikes\WebstormProjects\mcp\src\server\MCPSession.ts:62`) stores SSE `StreamInterface`s passed to `attach` (`MCPSession.ts:82-84`). It does not open the socket. `detach` removes one stream (`MCPSession.ts:86-88`). Middleware detaches on the disconnect abort (`C:\Users\mikes\WebstormProjects\mcp\src\server\middlewares.ts:170-171`). The log evicts by `ttl` and `capacity` on `push` and `replay`, with no timer (`MCPSession.ts:36-42`). Many streams on one session id.

`WebSocketClientTransport` (`C:\Users\mikes\WebstormProjects\mcp\src\server\transports\WebSocketClientTransport.ts:76`) handshakes in `start()` (`WebSocketClientTransport.ts:31-36`, `111`). Remarks say `close()` closes the socket and a later `start()` is the caller's (`WebSocketClientTransport.ts:58-61`). `ws.emitter.on('close', this.#ending)` is at `WebSocketClientTransport.ts:226`. No second socket is opened from that line. The handler body was not read.

`HTTPClientTransport` (`C:\Users\mikes\WebstormProjects\mcp\src\core\transports\HTTPClientTransport.ts:89`) uses `fetch` per send. `start()` is a no-op in the remarks (`HTTPClientTransport.ts:52`). `close()` aborts in-flight fetches and keeps `session` (`HTTPClientTransport.ts:64-70`). Not a kept socket.

### `@orkestrel/lsp`

`StdioClientTransport` (`C:\Users\mikes\WebstormProjects\lsp\src\server\transports\StdioClientTransport.ts:44`) spawns in `start()` through `createSession` (`StdioClientTransport.ts:92-113`, `189-214`). Session hooks are `stdout`, `error`, and `exit` (`StdioClientTransport.ts:209-212`). `#conclude` retires the generation on exit unless `close` is in flight (`StdioClientTransport.ts:247-258`). A `start()` while `#owner === #generation` throws `duplicate` (`StdioClientTransport.ts:97-100`). No numeric cap. `close` ends stdin, then `session.stop()` and `session.destroy()` (`StdioClientTransport.ts:145-186`). One child per generation.

`LSPClient.start` (`C:\Users\mikes\WebstormProjects\lsp\src\core\LSPClient.ts:141-150`) increments `#generation` and calls `transport.start()`. `#receiveExit` sets phase `closed` unless destroying or destroyed, drains pending work, and emits `exit` (`LSPClient.ts:615-624`). It does not call `start`. `destroy` sends `shutdown` and `exit`, then `transport.close()`, then destroys the emitter (`LSPClient.ts:637-655`). A later `start` is refused once the phase is `destroying` or `destroyed` (`LSPClient.ts:144-145`).

### `@orkestrel/process`

`Supervisor` (`C:\Users\mikes\WebstormProjects\process\src\server\processes\Supervisor.ts:76`) spawns in the constructor (`Supervisor.ts:159-166`) and subscribes to child `error`, `exit`, and `close` (`Supervisor.ts:167-169`). The remarks say it owns one child and the termination sequence (`Supervisor.ts:28-37`). No second `spawn` appears in the constructor. Tree kill is `stopChild`: Windows `taskkill`, otherwise `SIGTERM`, `waitForExit(grace)`, then `SIGKILL` (`C:\Users\mikes\WebstormProjects\process\src\server\helpers.ts:773-789`). The `Supervisor` method that calls `stopChild` was not opened.

`Process` (`C:\Users\mikes\WebstormProjects\process\src\server\processes\Process.ts:44`) constructs that engine in its constructor (`Process.ts:98-117`). Remarks say `destroy` stops, then destroys the emitter (`Process.ts:29-30`). `Session` (`C:\Users\mikes\WebstormProjects\process\src\server\processes\Session.ts:38`) does the same (`Session.ts:70-90`). One child each. No replacement.

`ProcessManager` (`C:\Users\mikes\WebstormProjects\process\src\server\processes\ProcessManager.ts:45`) launches on `launch` (`ProcessManager.ts:118-137`), evicts when `child.exit` settles (`ProcessManager.ts:135`), and the remarks say `destroy` awaits every child (`ProcessManager.ts:16-30`). No replacement. Many children, one per id.

`detach` (`helpers.ts:1140-1157`) spawns, ignores `error`, and `unref`s. It does not keep the child. `executeSync` (`helpers.ts:1067`) waits for one command.

### `@orkestrel/supervisor`

`ProviderExecution` (`C:\Users\mikes\WebstormProjects\supervisor\src\server\executors\ProviderExecution.ts:18`) constructs one `Process` in its constructor (`ProviderExecution.ts:51-58`) and consumes `lines`. `ProviderExecutor.launch` stores that execution under `input.token` (`C:\Users\mikes\WebstormProjects\supervisor\src\server\executors\ProviderExecutor.ts:117-165`). A second `launch` for the same token returns `LAUNCH` and does not spawn (`ProviderExecutor.ts:118-126`). `#probe` spawns a separate short-lived `Process` and arms one `setTimeout` (`ProviderExecutor.ts:187-219`). Several executions can sit in `#executions`. The `Run` method that would call `launch` again after a probe was not opened.

### `@orkestrel/database`, `@orkestrel/sqlite`, `@orkestrel/indexeddb`

`Database` (`C:\Users\mikes\WebstormProjects\database\src\core\Database.ts:41`) registers schema in the constructor and connects on first use (`Database.ts:37-38`). `DatabaseContext.connect` calls `driver.open` (`C:\Users\mikes\WebstormProjects\database\src\core\DatabaseContext.ts:130-145`). `close` drains, closes the driver, and emits `close` (`DatabaseContext.ts:118-127`). No death subscription.

`SQLiteDatabase.connect` (`C:\Users\mikes\WebstormProjects\sqlite\src\server\SQLiteDatabase.ts:58-66`) opens `node:sqlite` `DatabaseSync` once. `close` closes it (`SQLiteDatabase.ts:69-72`). Faults surface on the next call. No reconnect.

`SQLiteDriver.open` (`C:\Users\mikes\WebstormProjects\database\src\server\drivers\SQLiteDriver.ts:124-150`) closes any current handle and `createSQLiteDatabase` plus `connect`. `close` closes it (`SQLiteDriver.ts:205-210`). A locked database becomes a retryable `DRIVER` error in the class remarks (`SQLiteDriver.ts:100-103`). The driver does not reopen on that error.

`IndexedDBDatabase` (`C:\Users\mikes\WebstormProjects\indexeddb\src\browser\IndexedDBDatabase.ts:48`) opens on `connect` (`IndexedDBDatabase.ts:102`). `onclose` clears `#database` and `#opening` (`IndexedDBDatabase.ts:211-215`, `346-349`). `onversionchange` closes and clears the same latches (`IndexedDBDatabase.ts:224`, `352-355`). The next operation calls `connect` again. `close` is explicit (`IndexedDBDatabase.ts:143-144`). No restart count.

`IndexedDBDriver.open` (`C:\Users\mikes\WebstormProjects\database\src\browser\drivers\IndexedDBDriver.ts:112`) closes the previous handle and opens a new one. After a failed `migrate`, `#reopen` connects once at the current schema (`IndexedDBDriver.ts:488-500`, `665-679`). One recovery attempt on that path.

`JSONDriver.open` (`C:\Users\mikes\WebstormProjects\database\src\server\drivers\JSONDriver.ts:93`) loads a file into a memory driver. `close` closes that memory driver (`JSONDriver.ts:99-102`). Not a process.

### `@orkestrel/server` and `@orkestrel/websocket`

`Server` (`C:\Users\mikes\WebstormProjects\server\src\server\Server.ts:93`) stores host, port, and `status` `'idle'` in the constructor (`Server.ts:119-122`) and does not listen there. The class remarks say `start` builds `node:http` and binds, and `stop` drains then closes (`Server.ts:40-61`). No replacement of the listener is described there. The `start` and `stop` bodies were not opened.

`NodeWebSocket` (`C:\Users\mikes\WebstormProjects\websocket\src\server\NodeWebSocket.ts:80`) wraps a Duplex the caller already upgraded (`NodeWebSocket.ts:102-113`). Remarks: socket `error` emits domain `error` and terminates; `close` frames use `WEBSOCKET_CLOSE_TIMEOUT_MS`; `ping` is a method (`NodeWebSocket.ts:46-64`). No second connection is opened in the constructor.

### `@orkestrel/ollama`, `@orkestrel/agent`, `@orkestrel/program`, `@orkestrel/terminal`, `@orkestrel/toolbox`, `@orkestrel/sea`, `@orkestrel/scaffold`

`OllamaProvider` (`C:\Users\mikes\WebstormProjects\ollama\src\core\OllamaProvider.ts:33`) sends HTTP `/api/chat` through `AgentProvider` (`OllamaProvider.ts:40-47`). `keep_alive` is a request field (`OllamaProvider.ts:79`). It does not spawn a process.

`Agent`, `Program`, and `Terminal` export no child, worker, or database opener in the class list that was read. `Terminal` (`C:\Users\mikes\WebstormProjects\terminal\src\server\Terminal.ts:109`) drives stdin through `node:readline`. `DatabaseConversationStore` and `DatabaseTerminalStore` take a database; they were not read past their class declarations.

`TerminalConnection` (`C:\Users\mikes\WebstormProjects\toolbox\src\server\terminals\TerminalConnection.ts:17`) keeps one SSE stream it is given, replays pending forms, and arms a keepalive timer in `open` (`TerminalConnection.ts:71-80`). It does not spawn a process.

`SEA.execute` (`C:\Users\mikes\WebstormProjects\sea\src\server\seas\SEA.ts:94`) runs a build. `executeSync` is a short command (`C:\Users\mikes\WebstormProjects\sea\src\server\helpers.ts:171`). `openBrowser` calls `detach` (`helpers.ts:1157-1160`, `1203`). `detach` does not observe the child (`process\src\server\helpers.ts:1148-1157`).

`readGitRecords` (`C:\Users\mikes\WebstormProjects\scaffold\src\bin\helpers.ts:1321-1351`) creates one `Session`, awaits `exit`, and returns. The child is not kept.

### Consumer table

| Package | Resource | Eager or lazy | Death signal | Replacement | Limit | Teardown | Single or pool | Hand-rolled lines |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| browser | Chromium child `Browser` | Lazy `connect` | Child `exit`; transport `close`/`error` | Next `connect` only | None | `#terminate` then profile and emitter | Single | `Browser.ts:148-158`, `388-419`, `422-441`, `596-599`, `840-906`, `1124-1141` |
| browser | Browse server `BrowserMCPServer` | Lazy first tool call | None after a successful launch | Next call after a rejected launch | None | Toolset, browser, profile | Single | `BrowserMCPServer.ts:146-167`, `196-233` |
| browser | `tests/setupGlobal.ts` | Eager, two browsers | None | None | None | Vitest teardown | Two fixtures | `setupGlobal.ts:167-185`, `286-328` |
| probe | `Probe` stages | Eager constructor | Inspection deadline | `#recycle` new stage | One re-arm per `#ready` call | Stages, then emitter | Three single stages | `Probe.ts:125-159`, `221-241`, `509-574`, `639-658` |
| probe | `LintStage` Oxlint LSP | Eager constructor | Transport `exit` | None in the stage | None | `client.destroy()` | Single | `LintStage.ts:142-158`, `173-174`, `135-136` |
| probe | `RuntimeStage` Vitest | Eager constructor | None read | New Vitest at 64 specs | `PROBE_SPECIFICATIONS` `64` | `vitest.close()` | Single | `RuntimeStage.ts:134-136`, `655-682`, `283-305` |
| probe | `TypeStage` `tsc` | Per check | Child `close` | None | None | `SIGTERM` or `taskkill`, delete mirror | Short-lived children | `TypeStage.ts:561-620`, `219-227` |
| probe | `ProbeServer` | Lazy first `prove` | Stdin `close`, signals | Next call if `new Probe` threw | None | `probe.destroy()` | Single | `ProbeServer.ts:105-125`, `134-158`, `230-244` |
| worker | `node:worker_threads` | Lazy pool `create` | `error`, `messageerror`, `exit` | Next `validate` | Job `retries` default `0`; no thread cap | `terminate` in pool `destroy` | Pool, `max` = concurrency | `Thread.ts:26-42`, `68-77`; `NodeWorker.ts:43-71`; `Worker.ts:80-89`, `153-177`; `Dispatch.ts:162-169` |
| mcp | Stdio child `Process` | Lazy `start` | `child.exit` | Next `start` | None | `child.destroy()` | Single | `mcp\...\StdioClientTransport.ts:110-154`, `203-213`, `235-258` |
| mcp | `MCPSession` SSE streams | Attached by middleware | Disconnect abort | None | Log `ttl` and `capacity` | `detach` | Many streams, one session | `MCPSession.ts:36-42`, `82-88`; `middlewares.ts:170-171` |
| mcp | WebSocket client | Lazy `start` | Socket `close` | Caller `start` | None | `close` | Single | `WebSocketClientTransport.ts:31-36`, `58-61`, `111`, `226` |
| lsp | Stdio language server | Lazy `start` | Session `exit` | Next `start` after the generation retires | `duplicate` while unsettled; no count | `close` then `session.destroy` | Single | `lsp\...\StdioClientTransport.ts:92-113`, `145-214`, `247-258` |
| lsp | `LSPClient` | Lazy `start` | Transport `exit` sets `closed` | Caller `start` until destroyed | None | `shutdown`, `exit`, `transport.close` | Single | `LSPClient.ts:141-150`, `615-624`, `637-655` |
| process | `Supervisor` / `Process` / `Session` | Eager constructor | `error`, `exit`, `close` | None | None | `stopChild` | Single | `Supervisor.ts:159-169`; `Process.ts:98-117`; `Session.ts:70-90`; `helpers.ts:773-789` |
| process | `ProcessManager` | Lazy `launch` | Child `exit` evicts | None | None | `destroy` awaits children | Many, keyed | `ProcessManager.ts:16-30`, `118-137` |
| process | `detach` | Spawn and `unref` | `error` ignored | None | None | None | Not kept | `helpers.ts:1140-1157` |
| supervisor | `ProviderExecution` | Eager `Process` | Process streams / exit | None in the execution | None | Process `grace` | Many tokens | `ProviderExecution.ts:51-60`; `ProviderExecutor.ts:117-165` |
| supervisor | Probe child | On `probe` | One `setTimeout` | None | One probe | Process `grace` | Short-lived | `ProviderExecutor.ts:187-219` |
| database | `Database` + driver | Lazy `connect` | None | None | None | `driver.close` | Single | `Database.ts:37-38`; `DatabaseContext.ts:118-145` |
| sqlite | `SQLiteDatabase` | Lazy `connect` | Next-call `SQLiteError` | None | None | `close` | Single | `SQLiteDatabase.ts:58-72` |
| database | `SQLiteDriver` | Lazy `open` | Mapped `SQLiteError` | None | None | `close` | Single | `SQLiteDriver.ts:124-150`, `205-210` |
| indexeddb | `IndexedDBDatabase` | Lazy `connect` | `onclose`; `onversionchange` | Next operation `connect` | None | `close` | Single | `IndexedDBDatabase.ts:211-224`, `346-355` |
| database | `IndexedDBDriver` | Lazy `open` | Failed `migrate` | `#reopen` once | One recovery | `close` | Single | `IndexedDBDriver.ts:112`, `488-500`, `665-679` |
| database | `JSONDriver` | Lazy file `open` | None read | None | None | `memory.close` | Single | `JSONDriver.ts:93-102` |
| server | `node:http` `Server` | Lazy `start` | Not read | None described | None | `stop` then `destroy` | Single listener | `Server.ts:40-61`, `93-122` |
| websocket | `NodeWebSocket` | Caller supplies the socket | Socket `error`; close frame | None | Close-handshake timeout | `destroy` | Single | `NodeWebSocket.ts:46-64`, `102-113` |
| toolbox | `TerminalConnection` SSE | `open` on a given stream | Request abort | None | Keepalive interval | `#destroy` | Single | `TerminalConnection.ts:17-80` |
| ollama | None started | — | — | — | — | — | — | `OllamaProvider.ts:33-47`, `79` |
| terminal | Stdin readline | Uses the process stdin | — | — | — | — | — | `Terminal.ts:76-80` |
| sea | `executeSync`, `detach` opener | Short or detached | Detach ignores `error` | None | None | None for `detach` | Not kept | `sea\...\helpers.ts:1150-1160`; `process\...\helpers.ts:1140-1157` |
| scaffold | Git `Session` | Per query | `session.exit` | None | None | Awaits `exit` | Short-lived | `scaffold\src\bin\helpers.ts:1321-1351` |

## 2. Users of `@orkestrel/pool`

The only production import is `@orkestrel/worker`.

`Worker.ts:5` imports `Pool`. The constructor copies `create`, and `destroy`, `validate`, `on`, and `error` when the caller set them, and sets `max` to `pool.max` or to `concurrency` (`Worker.ts:80-89`). `concurrency` defaults to `1` (`Worker.ts:67`).

`NodeWorker.build` is the one production caller that fills those hooks (`NodeWorker.ts:43-58`):

- `create`: `new Thread(script, workerData).promise`
- `destroy`: `thread.worker.terminate()`
- `validate`: `thread.alive && thread.worker.threadId > 0`
- `max`: `concurrency` when `concurrency` is set; otherwise omitted, and `Worker` then uses `1`

It does not set pool `on` or `error`.

`worker\src\core\types.ts:2` imports the `PoolOptions` type. `WorkerOptions.pool` is that type (`types.ts:75`). `worker\src\core\factories.ts` does not import the package; its comment names it.

Type-only `PoolOptions` imports: `worker\tests\setup.ts:1`, `worker\tests\setup.test.ts:1`, `worker\tests\src\core\Worker.test.ts:1`. `Worker.test.ts:5` also imports `isPoolError`. Those tests pass `pool` objects into `createWorker` (`create`, and sometimes `destroy` or `max`). `factories.test.ts` does not import `@orkestrel/pool`; it passes `pool: { create }` to `createWorker`.

No other repository under `C:\Users\mikes\WebstormProjects` imports `@orkestrel/pool` from source. `pool`'s own `package.json`, README, and guide examples are the package itself.

## 3. The pool gap, measured

`C:\Users\mikes\WebstormProjects\pool\src` has no kind files. The files and their lengths:

| File | Lines |
| --- | --- |
| `src\core\Pool.ts` | 588 |
| `src\core\types.ts` | 126 |
| `src\core\errors.ts` | 63 |
| `src\core\factories.ts` | 41 |
| `src\core\validators.ts` | 40 |
| `src\core\index.ts` | 5 |

`PoolOptions` is `{ on?, error?, create, destroy?, validate?, max? }` (`types.ts:70-77`). The constructor stores the hooks and does not call `create` (`Pool.ts:65-80`).

**Warm floor, created eagerly and refilled.** Create runs only from `#startCreate`, and `#pump` calls that only for a queued waiter with no idle record while `owned + reservations < max` (`Pool.ts:263-276`, `284-290`). `#createResource` delivers to that waiter, recycles if the waiter left, or disposes if teardown began (`Pool.ts:314-353`). `max` is a ceiling option and a branch (`Pool.ts:272`). A floor has no waiter, so it is not a branch of `#pump`. Refill after `#clean` (`Pool.ts:503-525`) would be another entry into `create`. The guide states there is no warm floor (`C:\Users\mikes\WebstormProjects\scaffold\guides\pool.md:7-8`).

**Eviction when the resource reports its own death, idle or leased.** The pool never reads `T` except in `validate` and `destroy`. `validate` runs when an idle record is shifted for a waiter (`Pool.ts:265-269`, `293-305`). A failed validate disposes and, on success, `#pump`s the same waiter (`Pool.ts:386-408`). `#release` deletes the lease and `#recycle` pushes `#available` with no validate (`Pool.ts:470-483`). `destroy` disposes leased records (`Pool.ts:183-186`). Idle death is the next acquire's existing `validate` branch. Death while leased, and death while idle before that acquire, are not a branch: there is no subscription and no evict method.

**Events that name the record.** `PoolEventMap` values are `readonly []` (`types.ts:35-44`). `emit('create')`, `emit('acquire')`, `emit('release')`, and `emit('destroy')` pass no payload (`Pool.ts:335`, `442`, `482`, `523`). The emit sites and the event names already exist. Naming the record is a payload on those four calls and on `PoolEventMap`, not a second lifecycle. The map key is an opaque `object` (`Pool.ts:34-35`); the public value is `T` on the token (`types.ts:50-52`).

**Holder recorded on the lease.** `acquire` takes an optional `AbortSignal` (`Pool.ts:115-136`). `PoolToken` is `value` and `release` (`types.ts:50-58`). `#leased` is a `Set` of record keys (`Pool.ts:37`, `440`). A holder is an extra argument and a field beside that set or on the token. The lease record already exists, so this is a field on the current lease, not a different lifecycle. Nothing reads a holder today.

**Restart limit.** Create failure rejects that acquire with code `create` and does not try again (`Pool.ts:314-329`). Invalid `validate` disposes and pumps the same waiter, which may `#startCreate` again, with no counter (`Pool.ts:386-408`). A limit on that validate-driven replacement is a counter and a branch before the re-pump. A limit on replacing a leased resource that died has no loop to cap, because that death is not observed.

## 4. Shared shape

Hand-rolled means the package implements the behavior in its own class, not by calling `@orkestrel/pool`.

| Consumer | Eager start | Death detection | Replacement | Restart limit | Ordered teardown | Lease or holder |
| --- | --- | --- | --- | --- | --- | --- |
| `Browser` | No | Yes, `exit` and transport loss | Next `connect` | No | Yes, `#destroyResources` / `#closeResources` | No |
| `BrowserMCPServer` | No | No after success | Failed launch only | No | Yes, toolset then browser then profile | No |
| `setupGlobal` | Yes, two browsers | No | No | No | Yes, teardown list | No |
| `Probe` | Yes, three stages | Deadline | Yes, `#recycle` | One re-arm per `#ready` | Yes, stages then emitter | No |
| `LintStage` | Yes | `exit` latched | No | No | Yes, `client.destroy` | No |
| `RuntimeStage` | Yes | No | Yes, every 64 specs | That count | Yes, `vitest.close` | No |
| `TypeStage` | Mirror yes; compiler no | Child `close` | No | No | Yes, kill then delete mirror | No |
| `ProbeServer` | No | Stdin and signals | Failed `new Probe` only | No | Yes, probe after transport | No |
| `Thread` / `NodeWorker` | No | Yes, thread events | Next pool `validate` | Job retries only | Yes, via `Worker.destroy` | Pool token; no holder |
| `Worker` | No | Caller's `validate` | Pool's next acquire | No | Yes, queue then pool then emitter | `PoolToken`; no holder |
| mcp `StdioClientTransport` | No | `child.exit` | Next `start` | No | Yes, `Process.destroy` | No |
| `MCPSession` | No | Abort detaches | No | TTL and capacity | `detach` | Session id, not a resource holder |
| mcp `WebSocketClientTransport` | No | `close` | Caller `start` | No | `close` | No |
| lsp `StdioClientTransport` | No | `exit` | Next `start` after retire | Unsettled generation refuses | Yes, `stop` then `destroy` | Generation number |
| `LSPClient` | No | `exit` → `closed` | Caller `start` | No | Yes, shutdown then transport close | No |
| `Supervisor` / `Process` / `Session` | Yes | `error`, `exit`, `close` | No | No | `stopChild` | No |
| `ProcessManager` | No | `exit` evicts | No | No | Yes, every child | Id key, not a holder |
| `ProviderExecution` | Yes | Process exit | No | No | Process `grace` | Execution token |
| `Database` / `SQLiteDatabase` / `SQLiteDriver` | No | Next-call error | No | No | `close` | No |
| `IndexedDBDatabase` | No | `onclose`, `onversionchange` | Next `connect` | No | `close` | No |
| `IndexedDBDriver` | No | Failed migrate | `#reopen` once | One | `close` | No |
| `JSONDriver` | No | None read | No | No | `close` | No |
| `Server` | No | Not read | No | No | Remarks: drain then close | No |
| `NodeWebSocket` | No | `error` and close | No | Close timeout | `destroy` | No |
| `TerminalConnection` | No | Request abort | No | Keepalive | `#destroy` | No |

`OllamaProvider`, `Terminal`, `SEA`, `detach`, and `readGitRecords` do not keep a resource they must replace. `agent` and `program` were not found starting one.

## Unknowns

- `Server.ts` `start` and `stop` bodies. Lifecycle above is the class remarks at `Server.ts:40-61` and the idle fields at `Server.ts:119-122`.
- `NodeWebSocket` frame and timer methods past the class remarks. No reconnect call was in the constructor or the remarks.
- The `close` callback body in mcp `WebSocketClientTransport.ts` after the subscription at line 226.
- `Supervisor`'s method that invokes `stopChild`. The constructor spawn and the `error` / `exit` / `close` subscriptions were read (`Supervisor.ts:159-169`). `stopChild` itself was read (`helpers.ts:773-789`).
- `supervisor\src\core\Run.ts`. `ProviderExecution` does not spawn a second process. Whether reconcile calls `ProviderExecutor.launch` again was not read.
- `JSONDriver` `#open` body past the `open` / `close` entry points. No watch or reconnect was at `JSONDriver.ts:93-102`.
- `agent`, `program`, and `toolbox` beyond the exported class list and `TerminalConnection.open`. No `spawn`, `createSession`, or `new Process` hit those `src` trees.
- `veneer\tests` was not opened.
- `browser-wt-browse` was not used. Citations are from `C:\Users\mikes\WebstormProjects\browser`.
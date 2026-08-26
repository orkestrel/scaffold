Question: Where does published `src/`, tests, configs, scripts, and guides in `@orkestrel/mcp`, `@orkestrel/probe`, `@orkestrel/server`, and `@orkestrel/websocket` couple to a specific operating system?

Evidence:

mcp:
- [src] `src/server/transports/StdioClientTransport.ts:45` — close-path remarks (`SIGTERM`/`SIGKILL` process group vs `taskkill /F /T`) — documents that child-tree teardown (delegated to `@orkestrel/process`) is POSIX-signal vs Windows-forced, so a child's `SIGTERM` handler never runs on Windows
- [src] `src/server/transports/StdioClientTransport.ts:64` — example `command: 'node'` — assumes PATH/`PATHEXT` resolution of a bare `node` name (Windows often needs `node.exe` or the process supervisor's resolver)
- [src] `src/server/transports/StdioClientTransport.ts:141` — `new Process({ command: { file: this.#command }, workspace: process.cwd(), grace: PROCESS_GRACE })` — spawn/kill/grace semantics are whatever the process package does on this host; this file does not branch on `process.platform`
- [src] `src/server/types.ts:363` — `command` example `'node'` / `'./my-mcp-server'` — same bare-name / shebang-or-exec-bit assumption as the example
- [src] `src/server/types.ts:446` — evidence remarks (`taskkill /F /T`, no `SIGTERM` handler) — same Windows-forced vs POSIX-cooperative split
- [src] `src/server/helpers.ts:350` — `combined.split('\n')` then trim trailing `\r` — stdio NDJSON framing treats LF as the record separator and accepts CRLF from a Windows peer
- [src] `src/core/helpers.ts:490` — `parts.join('\n')` — MCP text-block rendering always uses LF, not `os.EOL`
- [src] `src/core/validators.ts:215` — `hierarchy.startsWith('//')` — RFC 3986 URI authority, not a filesystem absolute-path check
- [configs] `configs/browsers.ts:37` — `BUNDLED_BROWSERS_ROOT = '/opt/pw-browsers'` — hardcoded Linux container path (used as default root)
- [configs] `configs/browsers.ts:20` — `CHROMIUM_LAYOUTS` mixes `chrome-linux/`, `chrome-win*.exe`, `chrome-mac-*/…app/Contents/MacOS/…` — per-OS Playwright layouts in one list
- [configs] `configs/browsers.ts:57` — `SYSTEM_BROWSER_CHANNELS` linux `/opt/…`, darwin `/Applications/…`, win32 `chrome.exe`/`msedge.exe` segments — [gated] by `resolveSystemBrowser`
- [configs] `configs/browsers.ts:86` — `accessSync(path, FS_CONSTANTS.X_OK)` — POSIX execute-bit probe (Windows `X_OK` does not mean the same thing)
- [configs] `configs/browsers.ts:164` — aliases `chromium` and `chromium.exe` — Windows vs extensionless executable names
- [configs] `configs/browsers.ts:199` — `if (platform !== 'linux') return undefined` — bundled `/opt` search is Linux-only — [gated]
- [configs] `configs/browsers.ts:233` — `LOCALAPPDATA` / `PROGRAMFILES` / `PROGRAMFILES(X86)` / `HOMEDRIVE` + `Program Files` — Windows install roots — [gated]
- [configs] `configs/browsers.ts:309` — `platform === 'win32' ? 'msedge' : 'chrome'` — Windows fallback channel is Edge, elsewhere Chrome — [gated]
- [configs] `vite.config.ts:10` — `resolveBrowser(..., process.platform, process.env)` — browser launch options follow host platform — [gated]
- [tests] `tests/distribution.test.ts:33` — `npm.cmd` vs `npm`, `shell: true` only on win32 — Windows cannot spawn `npm.cmd` without a shell after batch-argument hardening — [gated]
- [tests] `tests/src/server/transports/StdioClientTransport.test.ts:309` — `process.kill(pid)` (no signal) — default `SIGTERM` on POSIX; Windows terminate
- [tests] `tests/src/server/transports/StdioClientTransport.test.ts:513` — `FORCED = process.platform === 'win32'` — Windows identified as a force-kill host — [gated]
- [tests] `tests/src/server/transports/StdioClientTransport.test.ts:568` — child `process.on('SIGTERM', …)` — assumes the host delivers `SIGTERM` (the FORCED test asserts it does not on win32)
- [tests] `tests/src/server/transports/StdioClientTransport.test.ts:806` — `it.runIf(FORCED)` handler never ran — Windows `taskkill` path only — [gated]
- [tests] `tests/src/server/transports/StdioClientTransport.test.ts:1168` — comment: Windows teardown ~102ms via `taskkill` vs ~17ms spawn-fail — timing model measured on Windows
- [tests] `tests/src/server/transports/StdioClientTransport.test.ts:1160` — `PATH` joined with `path.delimiter` — host PATH separator (`:` vs `;`)
- [tests] `tests/src/core/validators.test.ts:414` — `'file:///tmp/item'` — POSIX `file:` URI fixture (URI grammar, not a live `/tmp` open)
- [tests] `tests/setupServer.ts:351` / `405` — HTTP `101` handshake `\r\n` — RFC 6455/HTTP wire, not filesystem EOL
- [guides] `guides/mcp.md:2643` — stdio close: Windows `taskkill /F /T`, no `SIGTERM` handler
- [guides] `guides/process.md:520` — POSIX `SIGTERM`→grace→`SIGKILL` vs Windows `taskkill /F /T` via `System32\taskkill.exe`; `PROCESS_PATHEXT`; no `shell: true`
- [guides] `guides/test.md:495` — `supportsMode` is POSIX `chmod`/`stat` bits; CI described as POSIX; Windows junctions / `rmSync` `EPERM`
- [guides] `guides/probe.md:233` — `ProbeServer.start` answers `SIGINT`/`SIGTERM`

probe:
- [src] `src/server/helpers.ts:41` — `path.replaceAll('\\', '/')` — Windows backslash vs POSIX slash; no case-folding
- [src] `src/server/helpers.ts:73` — escape check uses `path.sep` (`..${sep}`) — host separator, not a hardcoded `/`
- [src] `src/server/helpers.ts:84` — mutate walk `path.split(sep)` + `lstatSync`/`realpathSync` — symlink/junction traversal is host FS semantics
- [src] `src/server/helpers.ts:148` — `overwriteFile`: truncate via descriptor because Windows `openSync(O_WRONLY|O_TRUNC)` without `O_CREAT` is `EINVAL`; `O_NOFOLLOW` is a no-op where Node does not define it
- [src] `src/server/helpers.ts:171` — `openSync(file, O_WRONLY | O_NOFOLLOW)` — POSIX no-follow; Windows final-component symlink/junction not refused the same way
- [src] `src/server/helpers.ts:191` — `isRefusedName`: Windows overlong/reserved names reported as `ENOENT`, POSIX as `ENAMETOOLONG`
- [src] `src/server/helpers.ts:287` — `relativeWorkspaceMessage` rewrites `pathToFileURL`, forward-slash, and native-`sep` spellings — Windows tools emit `\` and `file:///C:/…`
- [src] `src/server/helpers.ts:505` — `normalizePath(path).split('/')` for `src|app/<env>` — workspace layout uses `/` after slash-normalize
- [src] `src/server/Overlay.ts:69` — `path.startsWith(base)` after slash-normalize — case-sensitive prefix; NTFS is usually case-insensitive
- [src] `src/server/Overlay.ts:18` — example `/srv/checkout/…` — POSIX absolute path in docs
- [src] `src/core/validators.ts:63` — `isDraft` rejects `/…`, `\…`, and `[A-Za-z]:` plus `split(/[\\/]+/)` — admits both OS absolute forms
- [src] `src/bin/main.ts:8` — `error.message.split(/\r?\n|\r/u)` — CRLF-aware collapse of thrown text
- [src] `src/server/ProbeServer.ts:101` — `process.on('SIGINT'|'SIGTERM')` — POSIX service signals; Windows Ctrl+C is `SIGINT`, external `taskkill` does not deliver `SIGTERM`
- [src] `src/server/stages/LintStage.ts:150` — spawn `[process.execPath, oxlintBin, '--lsp']` — JS bin via Node, not `node_modules/.bin/oxlint` / `.cmd`
- [src] `src/server/stages/LintStage.ts:155` — `pathToFileURL(workspace).href` as LSP `workspace` — drive-letter `file:` encoding left to Node
- [src] `src/server/stages/RuntimeStage.ts:228` — `unlinkSync` of generated specs — Windows often cannot delete a still-open file (`EPERM`); POSIX can
- [src] `src/server/stages/RuntimeStage.ts:766` — `process.kill(id, 0)` — existence probe; comments treat `EPERM` as alive (POSIX permission vs Windows)
- [src] `src/server/stages/RuntimeStage.ts:909` — `fileURLToPath(stack.file)` — Vitest stack `file:` URLs vs native paths, including Windows drive letters
- [src] `src/server/stages/RuntimeStage.ts:307` — capture/release `SIGINT`/`SIGTERM` around `createVitest` — Vitest installs those handlers on every host
- [tests] `tests/src/bin/main.test.ts:32` — `TERMINAL = '/usr/bin/script'` — hardcoded POSIX `script(1)`; skipped unless that path exists (not `process.platform`) — [gated] by `existsSync`
- [tests] `tests/src/bin/main.test.ts:265` — `spawn(TERMINAL, ['-qfec', 'stty -echo; exec "$PROBE_NODE" …', '/dev/null'])` — util-linux `script`, POSIX shell, `stty`, `/dev/null` — [gated] by same skip
- [tests] `tests/src/bin/main.test.ts:39` — `SIGTERM`/`SIGINT` at boot and service — assumes Node will deliver those signals to the entry
- [tests] `tests/src/bin/main.test.ts:152` — `child.kill('SIGKILL')` — POSIX fatal signal; Windows process terminate
- [tests] `tests/setupServer.ts:45` — `process.kill(..., 'SIGKILL')` — same
- [tests] `tests/setupServer.test.ts:24` — ending `code === 7` or `signal === 'SIGTERM'` — accepts Windows exit-code vs POSIX signal reporting (not platform-gated)
- [tests] `tests/src/server/stages/RuntimeStage.test.ts:46` — `spawnSync('mkfifo', [path])` then `isFIFO()` — POSIX FIFO utility; Git Bash/Windows often leave no FIFO
- [tests] `tests/src/server/stages/RuntimeStage.test.ts:1203` — `context.skip` when FIFO gate is false — capability-gated, not `win32`-gated
- [tests] `tests/src/server/Probe.test.ts:1517` — `mkfifo` + skip if not a FIFO — same
- [tests] `tests/src/server/stages/RuntimeStage.test.ts:217` — `it.runIf(DIRECTORY_LINKS)` + `symlinkSync(..., 'junction')` — directory junctions; unprivileged Windows often cannot create them — [gated] by host capability
- [tests] `tests/src/server/stages/RuntimeStage.test.ts:1390` — test replaces the spec file with a directory (`rmSync`+`mkdirSync`) to block `unlinkSync` — exercises Windows delete-while-open / EISDIR vs POSIX
- [tests] `tests/src/core/validators.test.ts:108` — `/etc/hosts` and `C:\\Windows\\…` as rejected drafts — both OS absolute spellings
- [tests] `tests/src/server/helpers.test.ts:316` — `normalizePath('C:\\workspace\\…')` → `C:/workspace/…` — Windows drive+backslash
- [tests] `tests/src/server/Overlay.test.ts:8` — overlay keyed on `C:\\…` vs `C:/…` — slash folding, still case-sensitive
- [tests] `tests/src/server/ProbeServer.test.ts:188` — `process.emit('SIGINT'|'SIGTERM')` — synthetic delivery; does not prove OS signal routing
- [tests] `tests/distribution.test.ts:27` — `npm.cmd` + `shell: true` on win32 — [gated]
- [tests] `tests/src/server/stages/LintStage.test.ts:179` — fixture `process.kill(..., 'SIGKILL')` — same signal/terminate split
- [guides] `guides/probe.md:181` — Windows `ENOENT` for overlong names; `O_TRUNC` `EINVAL`; POSIX vs Windows `oxlint` bin shim (`sh` vs `.cmd`)
- [guides] `guides/probe.md:248` — `SIGINT`/`SIGTERM` destroy the stdio server
- [guides] `guides/test.md:494` — suite “runs on POSIX”; `mkdtempSync` mode `0700` unproven where permission bits are emulated
- [guides] `guides/mcp.md:4375` — `SIGTERM` → grace → `SIGKILL` group kill

server:
- [src] `src/server/helpers.ts:1211` — `message.data.split(/\r\n|\r|\n/)` then `lines.join('\n')` — SSE wire (WHATWG), not filesystem EOL
- [src] `src/server/helpers.ts:224` — cookie/header checks reject `\r\n` — HTTP header injection, protocol
- [src] no `process.platform`, spawn, POSIX path literals, or `path.posix`/`path.win32` in `src/`
- [tests] `tests/src/server/helpers.test.ts:1072` — `isAddressInfo('/tmp/pipe')` is false — Unix-socket path used as a negative AddressInfo fixture, not opened
- [tests] `tests/setupServer.ts:96` / `Server.test.ts:61` — HTTP/WebSocket requests and `101` replies use `\r\n` — HTTP/RFC 6455 wire
- [tests] `tests/src/server/Server.test.ts:553` — `pathname.split('/')` — URL path, not filesystem
- [tests] `tests/distribution.test.ts:27` — `npm.cmd` + `shell: true` on win32 — [gated]
- [guides] `guides/test.md:495` — POSIX `chmod`/`stat`; Windows junctions / `rmSync` `EPERM`; CI described as POSIX
- [guides] `guides/probe.md:233` — `SIGINT`/`SIGTERM`; Windows `ENOENT` for overlong names; POSIX vs Windows bin shims

websocket:
- [src] `src/server/NodeWebSocket.ts:132` — `headers.join('\r\n') + '\r\n\r\n'` — RFC 6455 HTTP handshake, not `os.EOL`
- [src] no `process.platform`, spawn, filesystem paths, or signals in `src/`
- [tests] `tests/setupServer.ts:85` / `setupServer.test.ts:103` — handshake `\r\n\r\n` — protocol
- [tests] `tests/src/server/helpers.test.ts:51` — reject keys/protocols containing `\r\n` — header injection, protocol
- [tests] `tests/distribution.test.ts:27` — `npm.cmd` + `shell: true` on win32 — [gated]
- [guides] `guides/test.md:495` — same POSIX `chmod` / Windows junction / CI-is-POSIX claims as other packages
- [guides] `guides/probe.md:233` — same `SIGINT`/`SIGTERM` / Windows `ENOENT` / bin-shim claims

Distillate:
- mcp: published stdio client does not branch on OS; it documents and inherits POSIX-signal vs Windows-`taskkill` teardown from `@orkestrel/process`, frames NDJSON on `\n` (CRLF-tolerant), and examples use bare `node`. Remaining coupling is Playwright browser discovery in `configs/browsers.ts` (hardcoded `/opt`, `X_OK`, win32 env roots) and tests that gate `npm.cmd`/`shell` and the force-kill SIGTERM-handler proof on `win32`.
- probe: coupling concentrates in workspace path folding (`normalizePath` slash-only, case-sensitive maps), Windows-aware `overwriteFile`/`isRefusedName`, `SIGINT`/`SIGTERM` on `ProbeServer`, `unlinkSync` of generated files, and tests that require `/usr/bin/script`+`stty`+`/dev/null` or `mkfifo` (capability skips, not `process.platform`). Lint/runtime children are spawned as `process.execPath` plus a JS entry, not `.cmd` shims.
- server: published HTTP/SSE code has no host-OS branch; CRLF appears only as HTTP/SSE protocol. Test coupling is protocol fixtures plus the shared win32 `npm.cmd` distribution helper; `/tmp/pipe` is a typed negative, not a live POSIX path.
- websocket: published code has no host-OS branch; `\r\n` is the RFC 6455 handshake. Same distribution `npm.cmd` gate and copied test/probe guide OS claims as server.

Unknowns:
- Whether `@orkestrel/process` (composed, not in these four trees) actually implements the documented `taskkill` vs process-group `SIGTERM`/`SIGKILL` split, `resolveExecutable`/`PATHEXT`, and `shell: false` on both hosts.
- Whether `fs.constants.X_OK` in `configs/browsers.ts` treats a Windows `.exe` as executable, and whether `O_NOFOLLOW` is non-zero on the Windows Node builds this fleet uses.
- Whether `Overlay.covers` / overlay maps ever mismatch on Windows from case-insensitive NTFS (no mixed-case test).
- Whether `ProbeServer`'s `SIGTERM` listener runs under Windows Node `process.kill` vs external `taskkill` (tests emit signals in-process).
- Whether Git Bash/MSYS `mkfifo` or `/usr/bin/script` on a Windows developer machine is treated as a real POSIX fixture (skips are `existsSync`/`isFIFO`, not platform).
- Whether `guides/process.md`, `guides/test.md`, `guides/probe.md`, and `guides/mcp.md` in these repos are byte copies of other packages' guides (only `guides/guide.md` and `guides/scaffold.md` were skipped as vendored).

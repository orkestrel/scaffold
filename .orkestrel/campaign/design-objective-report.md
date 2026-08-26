- `Answers`:
1. **Matrix.** Confirmed runtime repair is the `where` CRLF trim in `browser/src/server/helpers.ts:240`. Confirmed test-portability repair is the ungated SIGTERM-survival case at `browser/tests/setupServer.test.ts:442` (sibling already gated at `browser/tests/src/server/Browser.test.ts:1426`). Confirmed documentation repairs are canonical `test/guides/test.md:895` (“The suite runs on POSIX”) and canonical `browser/guides/browser.md:366` (POSIX-only teardown). Canonical `lsp/guides/lsp.md:36` `file:///workspace` is a fictional opaque URI, not a filesystem path: retain (integration already uses `pathToFileURL` at `lsp/tests/src/server/integration.test.ts:25`). Case-sensitive containment at `scaffold/src/server/helpers.ts:574` and `probe/src/server/Overlay.ts:69` is fail-closed exact text (`scaffold/src/server/helpers.ts:548-550`; Overlay already folds separators only). `console/src/core/helpers.ts:383` `renderBox` is LF-internal (return is `\n`-joined); the mixed `\r\n` at `console/tests/src/browser/helpers.test.ts:210` is ANSI verbatim, not `renderBox`. `terminal/src/core/helpers.ts:72` `\r\n` chunk is an open unknown. `probe/src/server/stages/RuntimeStage.ts:228` already reports unlink failure (`probe/tests/src/server/stages/RuntimeStage.test.ts:1378`). `RuntimeStage.ts:766` EPERM-as-alive is fail-safe. `X_OK` is existence-only on win32 (`probes.md`); keep `isFile()` plus well-known names. Protocol CRLF (LSP, HTTP, RFC 6455, NDJSON trim) and all process/sea/test platform forks retain. Full rows in `Matrix`.
2. **Ownership.** Instruction-set and `scripts/*.sh` / `.gitattributes` / `configs/helpers.ts` / `configs/policy.ts` / `tests/policy.test.ts` land in scaffold host inventory and propagate through `repair`. `configs/browsers.ts` and `tests/distribution.test.ts` land in `scaffold/src/core/templates.ts` and regenerate. `guides/test.md`, `guides/probe.md`, `guides/process.md`, `guides/scaffold.md` land in those canonical repositories (`probes.md` guide-mirror ruling). `guides/lsp.md` / `guides/browser.md` / `guides/mcp.md` / `guides/console.md` / `guides/sea.md` / `guides/terminal.md` are target-owned canonical guides. Browser `where` split, Overlay, RuntimeStage, process/sea/test forks are target-owned `src/`. Nothing edits a vendored copy or a consumer mirror in place.
3. **Instruction set.** Source-level OS-portability law lands in a new `.claude/rules/portability.md` plus one Rule map row in `AGENTS.md` (trigger is published source touching filesystem, spawn, signals, path spelling, or EOL). Test gating already has a home at `.claude/rules/tests.md:36` and `:39`; do not restate it. Guide OS claims land in `.claude/rules/documentation.md` (one home for prose). Exact register lines:
   - `AGENTS.md` Rule map: `| \`.claude/rules/portability.md\` | Host filesystem, process, spawn, signals, path spelling, and protocol vs host EOL in published source |`
   - `portability.md`: When published `src/` touches the filesystem, spawn, signals, or path spelling, write the same code so it is correct on Windows and Linux, or gate the OS-specific branch on the OS that needs it.
   - When comparing paths for identity or containment, use `node:path` or an existing package normalize; do not assume `/` or a case-insensitive prefix unless the value is a URI, archive key, or other non-host spelling.
   - When framing bytes for a named protocol (HTTP, LSP, RFC 6455, NDJSON, JSON Lines), use that protocol’s terminator, never `os.EOL`.
   - When spawning a binary by name, use `@orkestrel/process` resolution and termination; do not add `shell: true`, PATHEXT lookup, or `taskkill` in a consumer.
   - When `fs.constants.X_OK` or `O_NOFOLLOW` is missing or degraded on this host, treat that as the host’s semantics; do not invent an execute-bit or no-follow substitute.
   - Do not replace POSIX shebangs on npm bins, `.gitattributes` `eol=lf`, bash agent hooks, or a Linux-only bundled-browser root with a Windows equivalent.
   - `documentation.md`: When a guide names an operating system, CI host, or filesystem, write the claim as the host it was proven on; do not describe the fleet as POSIX-only.
   - `documentation.md`: When a flagship example needs a workspace `file:` URI that a reader might execute, build it with `pathToFileURL`; keep a POSIX-shaped `file:///workspace` only as an opaque fictional URI, never as a host path.
   Mechanical policy (`configs/policy.ts` / `tests/setupPolicy.ts:636`) is a TypeScript placement AST, not an OS semantic sweep. Near-zero-FP candidates are empty: `shell: true` is already absent from published `src/`; `split('\\n')`, `'/tmp/'`, `win32`, and `0o755` all fire on retained protocol, TSDoc, and gated forks (`os-sweep-a-report.md`, `os-sweep-c-report.md`). Portability stays prose. Do not overload the placement instrument.
4. **Primitives.** Reuse `@orkestrel/process` for executable resolution, `cmd.exe` batch routing, and win32 `taskkill` vs POSIX group signals (`os-sweep-a-report.md`; lsp/mcp already ride it). Reuse `@orkestrel/test` `supportsMode` / `supportsCase` / `supportsDirectoryLinks` / `supportsFileLinks` / `supportsBytes` plus `it.runIf`/`it.skipIf` in tests (`os-sweep-c-report.md`, `.claude/rules/tests.md:36`). Reuse local CRLF-tolerant split already in `mcp/src/server/helpers.ts:350` and `test/src/core/helpers.ts:299` — copy the local pattern into `browser` `probeAllPathNames`; do not add a shared `splitLines`. Reject production import of `@orkestrel/test` probes. Reject a Windows execute-bit helper, an `O_NOFOLLOW` polyfill, a shared case-fold normalize, and a VT-enable wrapper. No new public API: if the parseKey probe goes red, fix `parseKey` locally in `@orkestrel/terminal`.
5. **CI.** Option A: leave matrices as `ubuntu-latest` only (`scaffold/.github/workflows/ci.yml:9`; registry CI survey); Windows proof stays on this host; WSL is unavailable (`probes.md`). Option B: add first CI to lsp, probe, and process (today: no workflows). Option C: add `windows-latest` beside `ubuntu-latest` on OS-coupled packages. Cost: B is one Linux gate per missing repo (process/lsp/probe need no Playwright). C roughly doubles runner spend; GHA Windows is not a VT TTY, so console/terminal raw-mode and ANSI stay unproven there; Playwright-on-Windows is the expensive slice. Recommendation: B immediately for process, probe, and lsp (ubuntu-latest, no Playwright). C for process, probe, mcp (`it.runIf(FORCED)` never runs on ubuntu), browser, test, sea, and scaffold; keep Playwright on ubuntu only. Defer windows-latest for agent, guide, websocket, server, worker (no published OS branch) and for console/terminal (TTY not present on the runner). Do not add darwin.
6. **Units.** Table in `Units`. Scaffold instruction-set unit runs first. After that, different repositories in parallel; one writer per repository tree. Inside a repository, listed serial order.
7. **Over-correction constraints.** Do not flatten process PATHEXT/`cmd.exe`/`taskkill` vs POSIX groups (`process/src/server/helpers.ts:304,399,615,650,744`). Do not flatten sea PE/ELF/Mach-O, `signtool`/`codesign`, win32 `syncDirectory` no-op (`os-sweep-a-report.md`). Do not flatten test junction/chmod/case/bytes probes (`test/src/server/helpers.ts:532-639`). Do not replace protocol CRLF with `os.EOL` (LSP `lsp/src/core/helpers.ts:36`, RFC 6455 `websocket/src/server/NodeWebSocket.ts:132`, HTTP/SSE). Do not relax `.gitattributes` `eol=lf`. Do not rewrite `#!/usr/bin/env node` bins or bash `scripts/*.sh` (harness Git Bash; exit unless `CLAUDE_CODE_REMOTE=true`). Do not search bundled browsers off linux (`scaffold/src/core/templates.ts:874`). Do not case-fold scaffold containment (`helpers.ts:548-550` fail-closed) or Overlay keys. Do not invent X_OK/O_NOFOLLOW substitutes (`probes.md`). Do not retune Linux-sized spawn budgets without a failing Windows run (`process/guides/process.md:1240`). Do not enable VT or teach `parseKey` `\r\n` until the named probes settle.

- `Matrix`:

**process**
- `src/server/helpers.ts:12` — correctly-gated — posix/win32 path modules are the resolver — target
- `src/server/helpers.ts:156` — correctly-gated — win32 env case-fold skip — target
- `src/server/helpers.ts:210` — correctly-gated — PATH/Path merge — target
- `src/server/helpers.ts:304` — correctly-gated — PATHEXT/cwd-first lookup — target
- `src/server/helpers.ts:399` — correctly-gated — `.cmd`/`.bat` via `cmd.exe` — target
- `src/server/helpers.ts:615` — correctly-gated — `child.kill` vs `kill(-pid)` — target
- `src/server/helpers.ts:650` — correctly-gated — `taskkill.exe` body, callers gated — target
- `src/server/helpers.ts:744` — correctly-gated — `killTree` vs SIGTERM/SIGKILL — target
- `src/server/Process.ts:147` — correctly-gated — `detached` off win32 — target
- `src/server/Process.ts:150` — correctly-gated — `windowsHide: true` — target
- `src/server/Process.ts:153` — protocol-correct — `crlfDelay: Infinity` line ends — target
- `src/server/execution/executeSync.ts:73` — correctly-gated — Node maps `SIGKILL` on win32 — target
- `src/server/execution/detach.ts:40` — correctly-gated — Windows detach is not a signalable group — target
- `src/core/constants.ts:37` — correctly-gated — `PROCESS_PATHEXT` default — target
- `src/core/types.ts:33` — correctly-gated — isolated PATH/libuv host set — target
- `tests/src/server/helpers.test.ts:170` — correctly-gated — live PATHEXT `skipIf` — target
- `tests/src/server/helpers.test.ts:173` — protocol-correct — batch `\r\n` on win32 — target
- `tests/src/server/helpers.test.ts:246` — correctly-gated — POSIX empty-candidate `execvp` — target
- `tests/src/server/helpers.test.ts:307` — correctly-gated — `cmd.exe` percent refusal — target
- `tests/src/server/helpers.test.ts:574` — correctly-gated — live `killTree` — target
- `tests/src/server/helpers.test.ts:686` — correctly-gated — dead-pid `killTree` — target
- `tests/src/server/helpers.test.ts:867` — correctly-gated — negative pid ESRCH — target
- `tests/src/server/Process.test.ts:97` — protocol-correct — `\n`/`\r`/`\r\n` line framing — target
- `tests/src/server/Process.test.ts:452` — correctly-gated — SIGTERM trap POSIX-only — target
- `tests/src/server/Process.test.ts:600` — correctly-gated — `taskkill /T` grandchildren — target
- `tests/src/server/Process.test.ts:627` — correctly-gated — process-group grandchildren — target
- `tests/src/server/execution/detach.test.ts:59` — correctly-gated — POSIX group SIGINT — target
- `tests/src/server/fixtures/child.mjs:35` — correctly-gated — SIGTERM fixture — target
- `tests/src/server/fixtures/child.mjs:70` — correctly-gated — win32 detach for grandchild survival — target
- `tests/guides.test.ts:1013` — correctly-gated — isolated `SYSTEMROOT` — target
- `tests/guides.test.ts:1212` — correctly-gated — POSIX vs win32 `resolveExecutable('git')` — target
- `tests/distribution.test.ts:27` — correctly-gated — `npm.cmd` + `shell: true` — scaffold template
- `scripts/deps.sh:1` — correctly-gated — bash host hooks, Git Bash / `CLAUDE_CODE_REMOTE` — scaffold host
- `scripts/deps.sh:21` — correctly-gated — `mktemp /tmp` under bash — scaffold host
- `configs/helpers.ts:56` — correctly-gated — Vite `@fs` POSIX vs drive — scaffold host
- `guides/process.md:522` — correctly-gated — documents host-split termination — canonical process
- `guides/process.md:1240` — correctly-gated — Linux contended budget as proven host; do not retune without a Windows fail — canonical process
- `guides/test.md:888` — documentation defect — POSIX-as-suite claim — canonical test
- `.gitattributes:2` — correctly-gated — `eol=lf` fleet contract — scaffold host

**lsp**
- `src/server/transports/StdioTransport.ts:192` — correctly-gated — inherits process PATHEXT/cmd — target
- `src/server/transports/StdioTransport.ts:25` — correctly-gated — not detached; teardown via `stopChild` — target
- `src/server/transports/StdioTransport.ts:177` — correctly-gated — process SIGTERM/taskkill — target
- `src/core/helpers.ts:36` — protocol-correct — LSP `Content-Length` CRLF — target
- `src/core/parsers.ts:123` — protocol-correct — header split `\r\n` — target
- `src/core/LSPClient.ts:112` — correctly-gated — workspace URI opaque — target
- `tests/setupServer.ts:41` — correctly-gated — win32 killed exit `{code:1}` vs SIGKILL — target
- `tests/src/server/integration.test.ts:25` — correctly-gated — `pathToFileURL` host URI — target
- `tests/src/core/LSPClient.test.ts:179` — correctly-gated — opaque `file:///workspace` fixture, not a path — target
- `tests/src/server/fixtures/peer.mjs:90` — correctly-gated — POSIX SIGTERM peer — target
- `tests/src/server/transports/StdioTransport.test.ts:24` — correctly-gated — spawn budget; Windows flake unknown — target
- `tests/distribution.test.ts:27` — correctly-gated — `npm.cmd` — scaffold template
- `scripts/deps.sh:1` — correctly-gated — bash host hooks — scaffold host
- `guides/lsp.md:36` — correctly-gated — fictional opaque URI; integration shows `pathToFileURL` — canonical lsp
- `guides/lsp.md:40` — correctly-gated — same fictional URI — canonical lsp

**sea**
- `src/server/constants.ts:122` — correctly-gated — per-OS SEA toolchain — target
- `src/server/seals/SEA.ts:91` — correctly-gated — unsupported platform — target
- `src/server/seals/SEA.ts:284` — correctly-gated — `.exe` on win32 — target
- `src/server/seals/SEA.ts:298` — correctly-gated — darwin `chmod`/`codesign` — target
- `src/server/seals/SEA.ts:348` — correctly-gated — PE/signtool — target
- `src/server/seals/SEA.ts:399` — correctly-gated — ELF `chmod` — target
- `src/server/helpers.ts:121` — correctly-gated — skip symlink walk — target
- `src/server/helpers.ts:252` — correctly-gated — refuse symlink write — target
- `src/server/helpers.ts:557` — protocol-correct — archive keys ban `\\` and `C:` — target
- `src/server/helpers.ts:607` — correctly-gated — containment `startsWith(realBase+sep)` fail-closed like scaffold — target
- `src/server/helpers.ts:675` — correctly-gated — `syncDirectory` no-op on win32 — target
- `src/server/helpers.ts:1016` — correctly-gated — `rundll32`/`open`/`xdg-open` — target
- `src/server/injectors/Injector.ts:1607` — correctly-gated — close before rename (Windows lock) — target
- `src/server/injectors/Injector.ts:1615` — correctly-gated — POSIX mode on injected temp — target
- `tests/src/server/seals/SEA.test.ts:141` — correctly-gated — `.exe` name — target
- `tests/src/server/helpers.test.ts:461` — correctly-gated — skip missing-path fsync on win32 — target
- `tests/integration.test.ts:66` — correctly-gated — per-OS seal map — target
- `tests/distribution.test.ts:27` — correctly-gated — `npm.cmd` — scaffold template
- `scripts/deps.sh:1` — correctly-gated — bash host hooks — scaffold host
- `guides/sea.md:30` — correctly-gated — documents Windows subsystem/signtool/`syncDirectory` — canonical sea
- `guides/test.md:888` — documentation defect — POSIX-as-suite — canonical test

**mcp**
- `src/server/transports/StdioClientTransport.ts:45` — correctly-gated — documents process teardown split — target
- `src/server/transports/StdioClientTransport.ts:141` — correctly-gated — `Process` spawn/kill, no local platform branch — target
- `src/server/helpers.ts:350` — protocol-correct — NDJSON LF + trailing `\r` trim — target
- `src/core/helpers.ts:490` — protocol-correct — MCP text blocks LF — target
- `src/core/validators.ts:215` — protocol-correct — RFC 3986 `//` authority — target
- `configs/browsers.ts:37` — correctly-gated — `/opt/pw-browsers` Linux default — scaffold template
- `configs/browsers.ts:86` — correctly-gated — `X_OK` existence-degrade on win32 (`probes.md`); keep `isFile()` — scaffold template
- `configs/browsers.ts:199` — correctly-gated — bundled search linux-only — scaffold template
- `configs/browsers.ts:233` — correctly-gated — Windows install roots — scaffold template
- `tests/src/server/transports/StdioClientTransport.test.ts:513` — correctly-gated — `FORCED` win32 taskkill path — target
- `tests/src/server/transports/StdioClientTransport.test.ts:806` — correctly-gated — `it.runIf(FORCED)` never runs on ubuntu CI — target
- `tests/distribution.test.ts:33` — correctly-gated — `npm.cmd` — scaffold template
- `guides/mcp.md:2643` — correctly-gated — documents taskkill close — canonical mcp
- `guides/test.md:495` — documentation defect — POSIX-as-CI prose — canonical test

**probe**
- `src/server/helpers.ts:41` — correctly-gated — slash-normalize only; case remains exact — target
- `src/server/helpers.ts:73` — correctly-gated — escape uses `path.sep` — target
- `src/server/helpers.ts:148` — correctly-gated — truncate via fd; win32 `O_TRUNC` EINVAL — target
- `src/server/helpers.ts:171` — correctly-gated — `O_NOFOLLOW` no-op on win32 (`probes.md`, `helpers.ts:154-155`); do not polyfill — target
- `src/server/helpers.ts:191` — correctly-gated — refused-name codes per host — target
- `src/server/Overlay.ts:69` — correctly-gated — case-sensitive prefix after slash-normalize; fail-closed miss, not admit; tests cover separators not case (`Overlay.test.ts:32`) — target
- `src/core/validators.ts:63` — correctly-gated — drafts reject both OS absolutes — target
- `src/bin/main.ts:8` — protocol-correct — CRLF-aware error split — target
- `src/server/ProbeServer.ts:101` — correctly-gated — SIGINT/SIGTERM; taskkill does not deliver SIGTERM — target
- `src/server/stages/LintStage.ts:150` — correctly-gated — `process.execPath` not `.bin` shim — target
- `src/server/stages/RuntimeStage.ts:228` — correctly-gated — `unlinkSync` catch reports cleanup; do not add `removeTree` retry without a failing Windows inspection — target
- `src/server/stages/RuntimeStage.ts:766` — correctly-gated — `kill(id,0)` EPERM ⇒ alive fail-safe — target
- `tests/src/bin/main.test.ts:32` — correctly-gated — `/usr/bin/script` skipped unless present — target
- `tests/src/server/stages/RuntimeStage.test.ts:46` — correctly-gated — `mkfifo` via `isFIFO` — target
- `tests/src/server/stages/RuntimeStage.test.ts:217` — correctly-gated — `DIRECTORY_LINKS` junctions — target
- `tests/distribution.test.ts:27` — correctly-gated — `npm.cmd` — scaffold template
- `guides/probe.md:181` — correctly-gated — already documents Windows ENOENT/`O_TRUNC`/bin shims — canonical probe
- `guides/test.md:494` — documentation defect — POSIX-as-suite — canonical test

**server**
- `src/server/helpers.ts:1211` — protocol-correct — SSE WHATWG line split — target
- `src/server/helpers.ts:224` — protocol-correct — HTTP header `\r\n` reject — target
- `tests/src/server/helpers.test.ts:1072` — correctly-gated — `/tmp/pipe` typed negative, not opened — target
- `tests/setupServer.ts:96` — protocol-correct — HTTP/101 `\r\n` — target
- `tests/distribution.test.ts:27` — correctly-gated — `npm.cmd` — scaffold template
- `guides/test.md:495` — documentation defect — POSIX-as-CI — canonical test

**websocket**
- `src/server/NodeWebSocket.ts:132` — protocol-correct — RFC 6455 handshake CRLF — target
- `tests/setupServer.ts:85` — protocol-correct — handshake `\r\n\r\n` — target
- `tests/src/server/helpers.test.ts:51` — protocol-correct — reject `\r\n` in keys — target
- `tests/distribution.test.ts:27` — correctly-gated — `npm.cmd` — scaffold template
- `guides/test.md:495` — documentation defect — POSIX-as-CI — canonical test

**scaffold**
- `scripts/deps.sh:1` — correctly-gated — bash host hooks — scaffold host
- `scripts/cursor.sh:14` — correctly-gated — `mktemp /tmp` + `chmod 600` — scaffold host
- `.gitattributes:2` — correctly-gated — `eol=lf` — scaffold host
- `.editorconfig:4` — correctly-gated — editor LF — scaffold host
- `configs/helpers.ts:56` — correctly-gated — Vite `@fs` both roots — scaffold host
- `configs/src/vite.bin.config.ts:14` — correctly-gated — `#!/usr/bin/env node` npm bin — scaffold host
- `src/bin/main.ts:8` — correctly-gated — stdout `EPIPE` — target
- `src/bin/CLI.ts:1531` — correctly-gated — `git` via process resolver — target
- `src/core/templates.ts:650` — correctly-gated — generated shebang — scaffold template
- `src/core/templates.ts:712` — correctly-gated — `/opt/pw-browsers` — scaffold template
- `src/core/templates.ts:761` — correctly-gated — `X_OK` existence-degrade (`probes.md`) — scaffold template
- `src/core/templates.ts:874` — correctly-gated — bundled browser linux-only — scaffold template
- `src/core/templates.ts:1075` — correctly-gated — generated `npm.cmd` + `shell: true` — scaffold template
- `src/core/templates.ts:2042` — correctly-gated — generated `#!/usr/bin/env sh` service script — scaffold template
- `src/server/constants.ts:29` — correctly-gated — Windows reserved names on every host — target
- `src/server/validators.ts:104` — correctly-gated — both separators/UNC — target
- `src/server/helpers.ts:216` — correctly-gated — storage keys POSIX-shaped — target
- `src/server/helpers.ts:359` — correctly-gated — `isExactCaseFile` volume compensation — target
- `src/server/helpers.ts:574` — correctly-gated — containment exact text, fail-closed on case-fold (`:548-550`) — target
- `src/server/helpers.ts:1310` — correctly-gated — `chmod 0o755`; NTFS ignores; tests `skipIf(win32)` — target
- `src/server/WriteTransaction.ts:191` — correctly-gated — `mkdir` mode `0o700` — target
- `guides/scaffold.md:317` — correctly-gated — reserved device names — canonical scaffold
- `tests/src/server/helpers.test.ts:529` — correctly-gated — dangling junction `skipIf(win32)` — target
- `tests/src/server/helpers.test.ts:1317` — correctly-gated — exec-bit `skipIf(win32)` — target
- `tests/distribution.test.ts:13` — correctly-gated — `npm.cmd` — target (template origin)

**console**
- `src/core/ANSIRenderer.ts:34` — correctly-gated — SGR; VT enable is an open unknown — target
- `src/core/helpers.ts:383` — correctly-gated — `renderBox` LF-internal; return `\n`-joined; do not split CRLF without a host-file caller — target
- `src/core/Spinner.ts:162` — protocol-correct — TTY `\r` overwrite — target
- `src/server/helpers.ts:79` — correctly-gated — color from TTY/`FORCE_COLOR`, not VT — target
- `configs/browsers.ts:86` — correctly-gated — `X_OK` degrade — scaffold template
- `tests/src/browser/helpers.test.ts:210` — protocol-correct — ANSI keeps `\r\n` verbatim — target
- `tests/distribution.test.ts:33` — correctly-gated — `npm.cmd` — scaffold template
- `guides/console.md:5` — correctly-gated — documents ANSI/`\\r` — canonical console

**terminal**
- `src/core/constants.ts:20` — correctly-gated — DEL and BS both map to backspace — target
- `src/core/constants.ts:89` — correctly-gated — CR and LF each name `return`; CRLF as one chunk is unknown — target
- `src/core/helpers.ts:72` — test-portability defect (unproven) — `parseKey` matches the whole chunk; settle with the raw-mode probe before changing source — target
- `src/server/helpers.ts:101` — correctly-gated — `rawCapable` is TTY + `setRawMode` — target
- `src/server/Terminal.ts:380` — correctly-gated — Node raw mode — target
- `src/server/helpers.ts:153` — protocol-correct — CSI redraw — target
- `tests/distribution.test.ts:27` — correctly-gated — `npm.cmd` — scaffold template
- `guides/terminal.md:13` — correctly-gated — documents raw-mode/ANSI — canonical terminal

**test**
- `src/server/helpers.ts:46` — correctly-gated — containment via `relative`/`sep` — target
- `src/server/helpers.ts:94` — correctly-gated — symlink then junction on `EPERM` — target
- `src/server/helpers.ts:128` — correctly-gated — `removeTree` EBUSY/EPERM retry — target
- `src/server/helpers.ts:278` — correctly-gated — `kill(pid,0)` liveness — target
- `src/server/helpers.ts:282` — correctly-gated — linux `/proc` zombie — target
- `src/server/helpers.ts:532` — correctly-gated — `supportsDirectoryLinks` — target
- `src/server/helpers.ts:565` — correctly-gated — `supportsFileLinks` — target
- `src/server/helpers.ts:591` — correctly-gated — `supportsMode` — target
- `src/server/helpers.ts:613` — correctly-gated — `supportsCase` — target
- `src/server/helpers.ts:639` — correctly-gated — `supportsBytes` — target
- `src/server/factories.ts:34` — correctly-gated — `mkdtemp` `0700`; assert behind `POSIX_MODE` — target
- `src/browser/helpers.ts:1799` — correctly-gated — screenshot paths slash-folded — target
- `src/core/helpers.ts:299` — protocol-correct — JSON Lines strip trailing `\r` — target
- `configs/browsers.ts:58` — correctly-gated — Playwright layouts — scaffold template
- `guides/test.md:577` — correctly-gated — junctions vs file links; mode proven on POSIX — canonical test
- `guides/test.md:895` — documentation defect — “The suite runs on POSIX” so `/` conversion is unproven; add a host-run key-shape proof and reword — canonical test
- `tests/src/server/factories.test.ts:32` — correctly-gated — `it.runIf(POSIX_MODE)` — target
- `tests/src/server/helpers.test.ts:180` — correctly-gated — win32 cwd-hold `removeTree` — target
- `tests/distribution.test.ts:33` — correctly-gated — `npm.cmd` — scaffold template

**worker**
- `src/server/Thread.ts:26` — correctly-gated — `worker_threads`, no OS process control — target
- `src/server/NodeWorker.ts:58` — correctly-gated — `terminate()`, not signals — target
- `tests/src/server/helpers.test.ts:174` — correctly-gated — 50ms spawn budget; Windows flake unknown — target
- `tests/distribution.test.ts:27` — correctly-gated — `npm.cmd` — scaffold template
- `guides/test.md:888` — documentation defect — POSIX-as-suite — canonical test

**browser**
- `src/server/constants.ts:57` — correctly-gated — linux well-known paths — target
- `src/server/constants.ts:77` — correctly-gated — Windows `chrome.exe` suffixes — target
- `src/server/constants.ts:104` — correctly-gated — `/opt/pw-browsers` also searched on Windows (harmless miss) — target
- `src/server/helpers.ts:128` — correctly-gated — win32 normalize+`toLowerCase` dedupe — target
- `src/server/helpers.ts:195` — correctly-gated — `PROGRAMFILES`/`LOCALAPPDATA` roots — target
- `src/server/helpers.ts:235` — runtime defect — `where`/`which` `split('\\n')[0]` keeps `\\r` on a non-final line after whole-string `trim` — target
- `src/server/helpers.ts:257` — correctly-gated — always push `/opt/pw-browsers`; linux store on Windows is dead weight — target
- `src/server/helpers.ts:327` — correctly-gated — `detached` off win32 — target
- `src/server/Browser.ts:970` — correctly-gated — `kill(-pid)` POSIX-only — target
- `tests/setupServer.ts:515` — correctly-gated — fake browser is `process.execPath` + `.js` — target
- `tests/setupServer.test.ts:442` — test-portability defect — SIGTERM-survival ungated; Windows uncatchable terminate; sibling gated at `Browser.test.ts:1426` — target
- `tests/src/server/Browser.test.ts:1161` — correctly-gated — descendant/SIGKILL POSIX-only — target
- `tests/distribution.test.ts:27` — correctly-gated — `npm.cmd` — scaffold template
- `guides/browser.md:366` — documentation defect — documents POSIX group SIGTERM→SIGKILL; name the win32 `ChildProcess.kill` path — canonical browser
- `guides/test.md:888` — documentation defect — POSIX-as-suite — canonical test

**agent**
- `src/core/AgentContext.ts:233` — correctly-gated — prompt `join('\\n')`, not host I/O — target
- `tests/distribution.test.ts:27` — correctly-gated — `npm.cmd` — scaffold template
- `guides/test.md:888` — documentation defect — POSIX-as-suite — canonical test

**guide**
- `src/core/helpers.ts:78` — protocol-correct — source projection LF and CRLF — target
- `src/core/helpers.ts:563` — correctly-gated — inventory keys slash-separated by contract — target
- `src/core/constants.ts:26` — correctly-gated — `file:` not an external scheme — target
- `tests/setupServer.test.ts:17` — correctly-gated — `pathToFileURL(\`${scratch.path}/\`)` — target
- `tests/src/core/helpers.test.ts:55` — protocol-correct — CRLF fixtures — target
- `tests/distribution.test.ts:27` — correctly-gated — `npm.cmd` — scaffold template
- `guides/test.md:888` — documentation defect — POSIX-as-suite — canonical test

- `Units`:

| id | repository | role | owned files | off-limits | acceptance | serial |
| --- | --- | --- | --- | --- | --- | --- |
| `os-port-rules` | scaffold | implementer | `AGENTS.md` (Rule map row only), `.claude/rules/portability.md` (create), `.claude/rules/documentation.md` (OS-claim directives only) | `.claude/rules/tests.md` (already `:36`/`:39`), `configs/policy.ts`, `tests/policy.test.ts`, every target tree, `src/core/templates.ts` | New rule file is directives with trigger+action; Rule map has one portability row; tests.md portability lines are not copied; `npm run test -- tests/policy.test.ts` still green | 1 (campaign-first, before other writers read rules) |
| `os-port-browser-where` | browser | builder | `src/server/helpers.ts` (`probeAllPathNames`) | `configs/browsers.ts`, `guides/test.md`, `tests/distribution.test.ts`, `src/server/Browser.ts` | Split finder stdout on `/\r?\n/` and trim each line before taking `[0]`; run `npx vitest run --config vite.config.ts --project src:server tests/src/server/helpers.test.ts` | 1 |
| `os-port-browser-sigterm` | browser | builder | `tests/setupServer.test.ts` (SIGTERM-survival `it` only) | `src/**`, `guides/**` | Gate that case the way `tests/src/server/Browser.test.ts:1426` does, and name uncatchable SIGTERM in the title; run `npx vitest run --config vite.config.ts --project setup tests/setupServer.test.ts` | 2 |
| `os-port-browser-guide` | browser | builder | `guides/browser.md` (destroy/teardown rows) | consumer mirrors, `guides/test.md`, `guides/probe.md` | Teardown paragraph names POSIX `kill(-pid)` and win32 `ChildProcess.kill`; `npx vitest run --config vite.config.ts --project guides` | 3 |
| `os-port-test-keys` | test | implementer | `guides/test.md` (POSIX-suite sentences around `:895`), inventory/scratch tests under `tests/src/server/` | consumer mirrors, `src/server/helpers.ts` capability probes themselves | Guide states `/` keys on every host and that mode `0700` is proven only where `supportsMode` is true; a test asserts inventory keys use `/` on this host; run the matching `tests/src/server/*.test.ts` file plus `npx vitest run --config vite.config.ts --project guides` | 1 |
| `os-port-terminal-enter` | terminal | implementer | `tmp/probe/` (uncommitted), then `src/core/helpers.ts` `parseKey` and its test **only if the probe is red** | `src/server/**`, `guides/**` unless parseKey changes | On this Windows host, raw-mode stdin Enter: record whether one `'data'` chunk is `\\r`, `\\n`, or `\\r\\n`. If not a single `\\r\\n`, leave `parseKey` unchanged. If it is, map that chunk to `return` and add a unit test with that literal; run `npx vitest run --config vite.config.ts --project src:core` | 1 |
| `os-ci-process` | process | builder | `.github/workflows/ci.yml` (create) | `src/**`, `tests/**`, `guides/**` | ubuntu-latest plus windows-latest, Node current LTS line matching sibling `ci.yml`, no Playwright; `npm ci --ignore-scripts` then format/lint/check/build/`npm test` | 1 |
| `os-ci-probe` | probe | builder | `.github/workflows/ci.yml` (create) | `src/**` | Same matrix and gate chain as `os-ci-process`; no Playwright | 1 |
| `os-ci-lsp` | lsp | builder | `.github/workflows/ci.yml` (create) | `src/**`, `guides/lsp.md` | Same matrix and gate chain as `os-ci-process`; no Playwright | 1 |
| `os-ci-windows-mcp` | mcp | builder | `.github/workflows/ci.yml` (add `windows-latest`; Playwright step ubuntu-only) | `src/**`, `configs/browsers.ts` | Existing ubuntu job unchanged; windows job runs format/lint/check/build/`npm test` without Playwright install so `it.runIf(FORCED)` executes | 1 |
| `os-ci-windows-browser` | browser | builder | `.github/workflows/ci.yml` (add `windows-latest`; Playwright ubuntu-only) | `src/**` after `os-port-browser-where`/`sigterm` land | windows job runs the non-Playwright gate chain | 4 (after browser fix units) |
| `os-ci-windows-test` | test | builder | `.github/workflows/ci.yml` (add `windows-latest`; Playwright ubuntu-only) | `src/**` | windows job runs the non-Playwright gate chain | 2 (after `os-port-test-keys`) |
| `os-ci-windows-sea` | sea | builder | `.github/workflows/ci.yml` (add `windows-latest`) | `src/**` | windows job exercises PE/signtool-gated rows already `skipIf`’d on linux | 1 |
| `os-ci-windows-scaffold` | scaffold | builder | `.github/workflows/ci.yml` (add `windows-latest`; Playwright ubuntu-only) | `.claude/rules/**` after `os-port-rules` | windows job runs format/lint/check/build/`npm test` without Playwright | 2 (after `os-port-rules`) |

- `Risks`:
**Constraints a fix unit must obey:** process PATHEXT/`cmd.exe`/`taskkill` vs POSIX groups (`process/src/server/helpers.ts:304,399,615,650`); sea PE/ELF/Mach-O, `signtool`/`codesign`, win32 directory-fsync no-op; test `supports*` and `removeTree` retry; protocol CRLF (LSP, HTTP, RFC 6455) and NDJSON `\r` trim; `.gitattributes` `eol=lf`; POSIX shebangs on npm bins; bash `scripts/*.sh` under the agent harness; Linux-only bundled-browser roots (`templates.ts:874`); Windows reserved device names on every host; sea archive keys refusing `\\` and `C:`; scaffold containment fail-closed exact case (`helpers.ts:548-574`); Overlay case-sensitive maps; `X_OK`/`O_NOFOLLOW` degraded semantics (`probes.md`); `npm.cmd` + `shell: true` only in distribution tests; capability skips for `mkfifo`/`/usr/bin/script`/chmod bits; do not case-fold containment to “make Windows work” (that admits).
**Open unknowns and settling probes:** (1) Windows raw-mode Enter as one `\r\n` chunk — probe: `setRawMode(true)` on this host’s stdin, press Enter, log `JSON.stringify` of each `'data'` chunk; unit `os-port-terminal-enter`. (2) Windows Terminal/Node VT without `ENABLE_VIRTUAL_TERMINAL_PROCESSING` — probe: write `CSI 31m` to stdout, read console mode via a one-off `kernel32 GetConsoleMode` (or visual TTY run); do not add a mode call until that probe is red. (3) `grace: 20` / `waitForDelay(50)` / worker `timeout: 50` flake on slow Windows — probe: run those scoped projects on this host; retune only on a recorded fail. (4) `StdioTransport` spawn without `windowsHide` flashes a console — probe: spawn once on win32 and watch for a window. (5) `where` multi-line CRLF in the wild — probe: `where.exe chrome` / `where.exe node` and print `JSON.stringify(stdout)`; the `split('\\n')` defect stands even if this host returns one line. (6) Overlay mixed-case miss on NTFS — probe: `supportsCase()===false`, `set('C:/Workspace/a.ts')`, `covers('c:/workspace')`; do not fold unless a real Windows tool emits mixed case. (7) RuntimeStage `unlinkSync` EPERM on an open spec — probe: run a real `RuntimeStage.inspect` on this host and read cleanup issues; retry only if that run reports it. (8) `openBrowser` `rundll32`/`xdg-open` existence — leave untested as today. (9) Darwin SEA/`codesign` — no fleet host. (10) WSL Linux gates — unavailable (`probes.md`); ubuntu CI is the Linux proof.

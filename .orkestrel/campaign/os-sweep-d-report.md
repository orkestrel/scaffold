Question: Where does operating-system coupling sit in `@orkestrel/worker`, `@orkestrel/browser`, `@orkestrel/agent`, and `@orkestrel/guide` (`src/`, `app/`, `tests/`, `scripts/`, `configs/`, `package.json` scripts, `guides/`; vendored scaffold host files omitted)?

Evidence:

worker
- `src/server/Thread.ts:26` — `new Worker(script, { workerData })` — `[src]` `node:worker_threads` spawn; `script` is `string | URL` with no path normalization, `execArgv`, shebang, or `chmod`
- `src/server/NodeWorker.ts:58` / `Dispatch.ts:138` — `worker.terminate()` — `[src]` thread teardown via the worker-threads API, not `SIGTERM`/`SIGKILL`/`process.kill`
- `tests/src/server/helpers.test.ts:40` / `handlers.test.ts:13` / `factories.test.ts:86` — `new URL('./fixtures/…', import.meta.url)` — `[tests]` fixture scripts resolved as file URLs, not host separators
- `tests/src/server/helpers.test.ts:174` / `:188` — `timeout: 50` with comment that spawn is ~25–55ms — `[tests]` tight deadline vs worker-thread spawn cost (recovery job raised to 5000ms)
- `tests/distribution.test.ts:27` / `:32` / `:214` — `npm.cmd` + `shell: true` — `[tests]` `[gated]` Windows `.cmd` spawn needs a shell; Node `runNode` uses `process.execPath` without a shell
- `tests/distribution.test.ts:579` — `mkdtempSync(join(tmpdir(), 'distribution-'))` — `[tests]` OS temp directory via `os.tmpdir()`
- `configs/src/vite.server.config.ts:16` — `/[\\/]dist[\\/]src[\\/]server[\\/]index\.d\.ts$/` — `[configs]` declaration-path match accepts either separator
- `guides/test.md:54` — ` ```bash ` fence — `[guides]` examples presented as bash
- `guides/test.md:888` / `:1090` — “The suite runs on POSIX” / “the only host CI runs” — `[guides]` documents POSIX-only proof for mode `0700` and `/` separators
- `guides/probe.md:233` / `:753` — `SIGINT`/`SIGTERM` handlers; “on Linux 6.18.5 x64” — `[guides]` POSIX signals and a Linux host in recorded probe results
- no `app/`; published `src/` has no `process.platform`, hardcoded `/tmp`/`/usr`, `HOME`/`USERPROFILE`, `shell: true`, or `path.posix`/`path.win32`

browser
- `src/server/constants.ts:57-67` — `BROWSER_EXECUTABLE_PATHS.linux` `/usr/bin/…`, `/snap/bin/chromium`, `/opt/google/chrome/chrome`, `/opt/microsoft/msedge/msedge` — `[src]` `[gated]` POSIX well-known install paths keyed by `process.platform` (`darwin` Apps paths; `win32` empty)
- `src/server/constants.ts:77-87` — `Google\\Chrome\\…chrome.exe` suffixes; `C:\\Program Files` fallbacks — `[src]` Windows install roots when `PROGRAMFILES` / `PROGRAMFILES(X86)` unset
- `src/server/constants.ts:104` — `BROWSER_STORE_DEFAULT_DIRS = ['/opt/pw-browsers']` — `[src]` POSIX store base pushed on every platform (see helpers)
- `src/server/constants.ts:107-110` / `:134-137` — `.cache/ms-playwright` vs `Library/Caches/…` vs `chromium-*/chrome-win*/chrome.exe` — `[src]` `[gated]` Playwright cache/glob per platform
- `src/server/helpers.ts:128-129` — `pathWin32.normalize` + `.toLowerCase()` vs `pathPosix.normalize` — `[src]` `[gated]` Windows path case-folding for dedupe
- `src/server/helpers.ts:147` / `:164-168` — `mkdtemp(join(tmpdir(), …))`; `dirname(path) !== resolve(tmpdir())` guard — `[src]` profile lifecycle bound to `os.tmpdir()`; `rm` uses `maxRetries: 3`
- `src/server/helpers.ts:195-215` — `windowsRoots` from `PROGRAMFILES` / `PROGRAMFILES(X86)` / `LOCALAPPDATA` — `[src]` `[gated]` Windows roots; no `USERPROFILE`/`HOME` on win32
- `src/server/helpers.ts:235-240` — `spawnSync(win32 ? 'where' : 'which', [name])` then `stdout.toString('utf-8').trim().split('\n')[0]` — `[src]` `[gated]` PATH probe CLI; first line split on LF only (CRLF from `where` can leave a trailing `\r` on a non-final line); no `shell: true`, no `windowsHide`
- `src/server/helpers.ts:257-266` — always `bases.push(...BROWSER_STORE_DEFAULT_DIRS)` then win32 `LOCALAPPDATA\\ms-playwright` else `pathPosix.join(HOME, cacheDir)` — `[src]` `[gated]` home/cache env differs; `/opt/pw-browsers` still searched on Windows
- `src/server/helpers.ts:287` — `` `${base.replaceAll('\\', '/')}/${glob}` `` — `[src]` glob composed with `/` after backslash rewrite
- `src/server/helpers.ts:327-329` — `spawn(executable, args, { stdio: 'ignore', detached: process.platform !== 'win32' })` — `[src]` `[gated]` POSIX isolated process group; Windows not detached; no `shell: true`
- `src/server/Browser.ts:458` — `process.kill(0)` — `[src]` liveness probe (signal 0)
- `src/server/Browser.ts:970-986` / `:1040-1046` — `#hasProcessGroup` then `process.kill(-pid, signal)` else `ChildProcess.kill`; `SIGTERM` then `SIGKILL` with `BROWSER_KILL_GRACE_MS` (3000) — `[src]` `[gated]` negative-PID process-group signaling is POSIX-only; Windows uses `ChildProcess.kill` (Node maps SIGTERM to terminate)
- `src/server/factories.ts:43-45` — `mkdir(dirname(path))` / `writeFile(path, data)` — `[src]` screenshot writer takes caller paths as-is
- `src/core/BrowserFileChooser.ts:31-33` — `DOM.setFileInputFiles` with caller `files` strings — `[src]` upload paths passed through to CDP with no separator/drive normalization (core has no `node:*`)
- `tests/setupServer.ts:515-540` — fake executable is `process.execPath` + a `.js` script, “no shebang… spawnable identically on Windows/macOS/Linux” — `[tests]` avoids execute-bit/shebang
- `tests/setupServer.ts:548-575` — `process.on('SIGTERM')`; descendant `spawn(process.execPath, ['-e', …])`; watchdog `process.ppid === 1` plus `process.kill(ppid, 0)` — `[tests]` SIGTERM trap is POSIX-meaningful; ppid 1 is POSIX init (Windows relies on the kill-0 probe)
- `tests/setupServer.ts:461` — `process.kill(pid, 'SIGKILL')` in `destroyFakeBrowsers` — `[tests]` teardown kill-by-pid
- `tests/setupServer.test.ts:442-454` — `ignoreSIGTERM: true` then `process.kill(…, 'SIGTERM')` and assert the process still runs within 300ms — `[tests]` assumes catchable SIGTERM; not `runIf`’d (contrast Browser.test.ts:1426)
- `tests/src/server/Browser.test.ts:60` — `--no-sandbox --disable-dev-shm-usage --disable-gpu` — `[tests]` Linux container `/dev/shm`/sandbox flags for real Chromium
- `tests/src/server/Browser.test.ts:1161` / `:1264` / `:1351` / `:1426` — `descendant: process.platform !== 'win32'`; `it.runIf(process.platform !== 'win32')` SIGKILL-escalation — `[tests]` `[gated]` process-group/SIGTERM-ignore coverage POSIX-only
- `tests/src/server/helpers.test.ts:103-107` / `:218-220` — store layout `chrome-win`/`chrome.exe` vs `chrome-mac` vs `chrome-linux` — `[tests]` `[gated]`
- `tests/src/server/helpers.test.ts:240-262` / `:391` — `/usr/bin/…` and `C:\\Program Files\\…` engine hints; `--user-data-dir=/tmp/test-profile` — `[tests]` path literals as classification/argv strings
- `tests/src/core/BrowserPage.test.ts:530` / `:1327` — `/tmp/shot.png`, `C:\\downloads\\file.txt` — `[tests]` opaque path strings in mocked screenshot/download
- `tests/distribution.test.ts:27` / `:32` — same `npm.cmd` + `shell: true` — `[tests]` `[gated]`
- `guides/browser.md:366` / `:1316-1321` — POSIX process group; `destroy()` SIGTERM→SIGKILL — `[guides]` documents POSIX teardown; win32 behavior is the ungated `ChildProcess.kill` path
- `guides/test.md` / `guides/probe.md` — same POSIX-CI / bash / Linux probe claims as worker — `[guides]`
- no `app/`

agent
- `src/core/AgentContext.ts:233` / `:255` / `conversations/Conversation.ts:284` — `parts.join('\n\n')` / `lines.join('\n')` — `[src]` prompt/text assembly, not filesystem or external process I/O
- `src/` has no `process.platform`, `child_process`, `node:fs`, `node:os`, hardcoded `/tmp`/`/usr`, or `HOME`/`USERPROFILE`
- `tests/distribution.test.ts:27` / `:32` / `:579` — `npm.cmd` + `shell: true`; `os.tmpdir()` scratch — `[tests]` `[gated]`
- `guides/test.md:54` / `:888` / `:1090` / `guides/probe.md:233` / `:753` — bash fence; POSIX-only CI; SIGINT/SIGTERM; Linux probe host — `[guides]`
- no `app/`

guide
- `src/core/helpers.ts:78-97` — LF and CRLF (`\r\n`) as physical line terminators (`offset += 1` after CR) — `[src]` source projection is CRLF-aware; bare CR is not treated as a line break
- `src/core/helpers.ts:563` / `:837-851` — `key.split('/')` / `` `${directory}/${target}` `` / `segments.join('/')` — `[src]` inventory keys and link resolution are slash-separated, not `path.sep` (documented as opaque keys, not host paths)
- `src/core/constants.ts:26-31` — `EXTERNAL_SCHEMES` is `http:`/`https:`/`mailto:`/`tel:` only — `[src]` `file:` hrefs are not skipped as external; they would be resolved as slash keys
- `src/core/sources/Source.ts:22-25` — never imports `node:fs`; consumer supplies inventory — `[src]` filesystem separator policy is pushed to the inventory producer (`readInventory` in tests)
- `tests/setupServer.test.ts:17` — `pathToFileURL(\`${scratch.path}/\`)` — `[tests]` concatenates `/` onto a host path before `pathToFileURL`
- `tests/src/core/helpers.test.ts:55` / `:266` / `:381` — CRLF fixtures for `extractSourceLines` — `[tests]` exercises both EOL styles
- `tests/guides.test.ts:24` — `readInventory(new URL('../', import.meta.url), …)` — `[tests]` inventory from a file URL (separator convention lives in `@orkestrel/test`)
- `tests/distribution.test.ts:27` / `:32` / `:579` — `npm.cmd` + `shell: true`; `os.tmpdir()` — `[tests]` `[gated]`
- `guides/test.md:54` / `:888` / `:900` / `:1090` / `guides/probe.md:753` — bash; “suite runs on POSIX”; mode `0700`; Linux probe host — `[guides]`
- `guides/markdown.md` — markdown AST/projections; no host-path claims — `[guides]`
- no `app/`; `package.json` scripts are `node -e` / `vitest` / `tsc` (no bash/`chmod`/POSIX-only binaries)

Distillate:
- worker: OS coupling is almost entirely inherited tests/guides (`npm.cmd`/`shell: true`, POSIX-CI prose) plus tight thread-spawn timeouts; published `src/` is `worker_threads` URL/script + `terminate()`, not OS process control.
- browser: OS coupling concentrates in `src/server` executable discovery (POSIX `/usr`/`/opt`/`/snap` vs Windows `PROGRAMFILES`/`LOCALAPPDATA`/`where`) and launch/teardown (`detached` process groups, `kill(-pid)`, SIGTERM→SIGKILL); `src/core` is CDP-only; tests gate process-group/SIGTERM-ignore on non-win32 except `setupServer.test.ts`’s ungated SIGTERM-survival case.
- agent: published `src/` has no OS I/O or process coupling; remaining hits are the shared distribution npm-spawn gate and vendored-style test/probe guide claims.
- guide: published `src/` assumes slash-separated inventory keys and CRLF-or-LF source text, not `path.sep` or a host shell; remaining coupling is inventory producers, `pathToFileURL`+trailing `/`, distribution npm-spawn, and POSIX-CI guide prose.

Unknowns:
- Whether `where` ever returns multiple CRLF lines in practice so `split('\n')[0]` keeps a trailing `\r` on the executable path.
- Whether `tests/setupServer.test.ts` SIGTERM-survival is skipped by some outer Windows job (no `runIf` in-repo); tests were not executed.
- Whether `/opt/pw-browsers` is ever expected to exist on Windows, or is dead weight in `defaultStoreBases`.
- Whether `@orkestrel/test` `readInventory` always emits `/` keys on Windows (consumed by guide tests; implementation is outside these four trees).
- Whether `os.tmpdir()` vs `resolve(tmpdir())` equality in `removeBrowserProfile` can fail on short-name/8.3 or junction temp dirs.
- Exact Node-on-Windows mapping of `ChildProcess.kill('SIGTERM')` vs `process.kill(pid, 'SIGTERM')` for the fake-browser ignore path (source comments assert it is uncatchable; not re-verified here).
- `file:` drive-letter casing/percent-encoding: no `pathToFileURL` construction of browser or worker file URLs in published `src/` besides Vite `fileURLToPath(new URL(..., import.meta.url))`.

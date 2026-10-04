# Unit windows-teardown — the packed `browse` binary leaves its profile and a held handle on Windows

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the primary clone `C:\Users\mikes\WebstormProjects\browser` on `main` at `c42070a` (unpushed release preparation for 0.0.22 on top of the pushed `c34b4de`). Commit each established fix separately; never push, publish, or install outside this checkout. Perform the assignment yourself and spawn nothing.

## The failures

`npm run test:distribution` on this Windows host (2026-10-03):

1. **Pre-existing.** `tests/distribution.test.ts:1299-1300` ("packed browse binary › lists the vocabulary without Chromium, then records, saves, lists, edits, and replays a journey"): after `await client.disconnect()`, `ROOT/tmp/browsers/.profiles` still holds the server's profile folder. It fails the same way at `f11f821` (the pre-release `main`, run in the worktree `browser-wt-fix`), so it predates this release. The test's comment says "Closing the client ends the child with `SIGTERM`, whose handler removes the profile", which is POSIX behavior: on Windows a child's `SIGTERM` is a hard termination, so no handler runs, and the profile removal depends on the server seeing its input end and finishing teardown before the client's stop terminates it.
2. **New in this release.** The suite's `afterAll` (`tests/distribution.test.ts:823-825`) then fails with `EPERM, Permission denied` removing the scratch directory (`C:\Users\mikes\AppData\Local\Temp\distribution-*`), in both runs at `c42070a`/`37fea7c` and in neither at `f11f821`. Something still holds a file under the scratch tree when the suite ends. Candidates to check, not conclusions: the `browse` child or its Chromium (or a Chromium helper such as `crashpad_handler`, which the service diagnosis found outliving its browser on Windows: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse\service-flakes\findings.md`), the stderr-pipe change `d9a18c1`, the page activation `fb625ab`, or the client transport's stop.

## Assignment

1. Find who holds the handle at `afterAll` time: a process census by command line and parent (`Get-CimInstance Win32_Process`) and the open handles you can read without installing anything, captured from a probe that stops at the failing point, at `c42070a` and at `f11f821`. Establish whether the browse child, Chromium, or a helper is still alive after `client.disconnect()` resolves, and why it differs from the baseline.
2. Find the shutdown sequence on Windows end to end: what `client.disconnect()` does to the child through `@orkestrel/mcp`'s stdio client transport (read the installed source under `node_modules/@orkestrel/mcp` and `@orkestrel/process`), what the `browse` server does on input end (`src/server/BrowserMCPServer.ts` `#end` and `destroy`), and what `Browser.destroy()` does to Chromium's process tree on Windows (`src/server/Browser.ts`, `src/server/helpers.ts`).
3. Fix each cause at its source so that, on Windows and POSIX alike, a client that disconnects leaves no `browse` process, no Chromium or helper process it launched, no profile folder, and no held handle: the server's teardown on input end must complete before its process ends, and the browser's teardown must end the whole tree it launched. If the cause is in `@orkestrel/mcp`'s client transport (it ends the child before the server can finish), stop and report it with the evidence instead of changing the dependency. Each fix gets a test that fails before it on this host (a live `browse` binary or `Browser` case), and the distribution case's comment states the behavior as built, not POSIX signal semantics.
4. Rerun `npm run test:distribution` until it passes twice in a row, and report both.

## Gates

After the last commit, run `node tmp/codex/merge-gates.ts windows-teardown`, then `npm run test:distribution`, and read every exit code. When `test:service` fails, rerun the failing file alone and report both runs; never raise a budget. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/windows-teardown-report.md` and return it as your final message: the census and handle evidence at both commits, each cause with its evidence, each fix with its red and green command and counts, the gate table, the two distribution runs, the commit hashes, and any deviation. No process diary.

## Deviation contract

Stop when a cause lies in a dependency (`@orkestrel/mcp`, `@orkestrel/process`, Chromium) and cannot be fixed in this package without a contract change, and report: expected, found, evidence, and one hypothesis.

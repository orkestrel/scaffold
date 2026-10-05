T1 is **yes**: scaffold's successful `initialize` median is **13.410 s**, above Codex's 10 s default. Probe's median is **8.553 s**. Veneer refuses to arm in every run; its median **refusal response** is **61.114 s**, with no successful onset to report. M-D finds **no persistent referenced thread or handle** in the requested active-resource census: every settled listing is `[]`.

All readings use **LAPTOP-SBG38B5J**, Windows 11 Home 10.0.26300 x64, Intel Core i7-10700 CPU at 2.90 GHz, 16 logical processors, on **2026-10-05**. Times use `performance.now()`. CPU columns are `Win32_Processor.LoadPercentage` snapshots before each reading. The `*-load.json` files retain UTC timestamps, free memory, and command-line censuses. No census found another browser/ollama test run or Codex unit. Browser IDE services, an existing scaffold probe/Oxlint server, and this unit's supervising Codex process remained present. No synthetic load was applied; the recorded load varies substantially.

The version set **V** applies to every table unless stated otherwise.

| Version set | Node | Oxlint | TypeScript | Vitest | Claude Code | Codex CLI |
| --- | --- | --- | --- | --- | --- | --- |
| V | 24.21.0 | 1.86.0 | 6.0.3 | 4.1.11 | 2.1.285 | 0.159.2 |

Probe, scaffold, veneer, and the historical worktree use the language-tool versions in V. Claude's client transcript identifies `claude-opus-5-5`. Probe remained at `058a946` on `main`. The installed pool manifest reports **0.0.15**, although the brief calls it the 0.0.16 build. Its ESM SHA-256 is `bc897c9ab24f749675a1efa9914cac855caca5be8041c5cde556263c64aa9123`, identical to the sibling pool checkout's built ESM during this assignment. The historical commit has no installed pool. No installation ran in the main checkout.

The required gate-removal negative control **passed**. A source copy under `tmp/onset/control/` was built with the handshake callback bypassed. Both builds used the same arm-observing launcher, workspace, and JSON-RPC reader. Each completed arming and exited 0. Each row has one run, so sample and median coincide; host/date/V apply.

| Build | Initialize sample / median (s) | Arm sample / median (s) | CPU (%) | Control result |
| --- | ---: | ---: | ---: | --- |
| Gate bypassed | 0.878 | 8.722 | 0 | Initialize precedes arm |
| Gate present | 8.611 | 8.610 | 2 | Initialize follows arm |

**M-A** measures spawn to the `initialize` answer from the unchanged `dist/bin/main.js`, with each workspace as cwd. Host/date/V and the passing gate-removal control apply to every row.

| Workspace | Runs | Samples (s) | Median (s) | CPU samples (%) | Result |
| --- | ---: | --- | ---: | --- | --- |
| probe | 3 | 8.553, 8.552, 8.582 | 8.553 | 1, 10, 4 | Successful initialize; exit 0 |
| scaffold | 3 | 13.709, 13.339, 13.410 | 13.410 | 2, 2, 4 | Successful initialize; exit 0 |
| veneer | 3 | 61.114, 61.167, 61.054 | 61.114 | 1, 5, 22 | Refusal in every run; exit 1 |

Every veneer answer is JSON-RPC `-32000`: `[instrument] malformed: The probe could not arm: The type stage warm exceeded 30000 ms`. Its median is an error-response latency. Scaffold alone establishes T1. These readings do not establish a startup timeout that would make veneer arm.

**M-B** measures a real Oxlint child-tree kill through the next successful `prove`, after the server reports the loss, in `tmp/onset/recovery-workspace/`. The interval includes the kill command and proof work, so it is an upper bound on replacement readiness rather than a direct LSP-initialize timestamp. Host/date/V apply. Each run passes its clean case and detects the deliberately false runtime assertion.

| Reading | Runs | Samples (s) | Median (s) | CPU samples (%) | Control |
| --- | ---: | --- | ---: | --- | --- |
| Kill to successful prove | 3 | 2.695, 3.013, 3.187 | 3.013 | 54, 83, 74 | Case passes; false assertion fails runtime; receipt issued |

The closing receipt is `receipt probe:0a6606cfa10daf0adfe5bfa72eac7263:runtime:typescript@6.0.3:oxlint@1.86.0:vitest@4.1.11:tsconfig.json@7c367b3590470d4afdf9b212b2f95d86`. Each `recovery-N.json` records the killed pid, successful `taskkill` output, loss observation, verdict, and errors.

A preliminary call issued immediately after the synchronous kill raced loss observation and failed: `The lint stage could not serve (The LSP notification 'textDocument/didOpen' could not be written)`. The accepted recovery timings wait for the server's loss event before issuing the claim; they do not prove that an immediate-after-kill call succeeds. The failed attempt remains in `recovery-samples.err`.

**M-C** measures full npm command wall time, with one serial run per suite and commit. Each median equals its single sample. The historical comparator is `0437a29`, in `tmp/onset/baseline-0437a29/`, with `npm ci --ignore-scripts` and a build confined to that worktree. Host/date/V apply. The onset gate-removal control passes, but the historical server suite fails its own assertions, so this is not a fully passing performance comparison. Test populations also differ between commits.

| Commit | Suite | Runs | Sample / median (s) | CPU (%) | Exit | Suite outcome |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| 0437a29 | test:src:server | 1 | 404.339 | 15 | 1 | 202 passed, 5 skipped, 1 failed |
| 0437a29 | test:src:bin | 1 | 107.877 | 20 | 0 | 12 passed, 6 skipped |
| 058a946 | test:src:server | 1 | 439.957 | 7 | 0 | 213 passed, 6 skipped |
| 058a946 | test:src:bin | 1 | 134.031 | 10 | 0 | 15 passed, 6 skipped |

The historical failure is `tests/src/server/ProbeServer.test.ts:328`, `shares construction across concurrent admitted calls`: `expected [] to have a length of 1 but got +0`, at `expect(readDirectoryNames(mirror)).toHaveLength(1)`. Its full diagnostic remains in `suite-0437a29-test-src-server.err`. No source fix or excluded test was applied to the comparator.

**M-D** answers **no** for persistent resources reported by `process.getActiveResourcesInfo()`. The Vitest instance remains open while the settled listings are read at 1 s and 3 s. Host/date/V apply. Resource listings are categorical; a median is not applicable.

| Run | Immediately after runTestSpecifications | At 1 s | At 3 s | CPU (%) | Control |
| --- | --- | --- | --- | ---: | --- |
| 1 | `["CloseReq","Timeout","Timeout"]` | `[]` | `[]` | 16 | Real specification passes |
| 2 | `["CloseReq","Timeout"]` | `[]` | `[]` | 31 | Real specification passes |
| 3 | `["CloseReq","Timeout"]` | `[]` | `[]` | 9 | Real specification passes |

The resource-control baseline is `[]`; a worker with a retained parent listener produces `["MessagePort"]`; terminating it restores `[]`. A real false assertion is reported as failed. After `vitest.close()`, the listing is also `[]`. These controls pass. The instrument exits 1 because the deliberate Vitest failure sets `process.exitCode`; the measurement and control checks complete. This API does not enumerate every native OS thread or unreferenced worker, so that broader absence is not claimed.

**M-E** uses real client CLIs with temporary MCP settings. Each row is one run: sample and median are equal. Host/date/V apply. Durations are whole command wall times, including model inference, not MCP startup times. Healthy/refusing cases are paired controls; the gate-removal control also passed. No proof work or delegation ran through either client.

| Client / case | Sample / median (s) | CPU (%) | Exit | Client status | Agent saw |
| --- | ---: | ---: | ---: | --- | --- |
| Claude Code, healthy | 13.382 | 1 | 0 | probe connected | `mcp__probe__prove` |
| Claude Code, refusing | 4.990 | 7 | 0 | probe connected despite refusal | `mcp__probe__prove` |
| Codex, refusing, required=true | 0.795 | 4 | 1 | Session creation refused with cause | No agent turn |
| Codex, healthy, default startup timeout | 13.449 | 0 | 0 | Required server initialized; session completed | Answered “none” when discovery was forbidden |
| Codex, healthy metadata follow-up, default startup timeout | 20.225 | 83 | 0 | Required server initialized; session completed | `mcp__probe__prove`; did not invoke it |

The refusing fixture has an unreadable TypeScript manifest export. Codex prints `required MCP servers failed to initialize: probe` and `JSON-RPC error: -32000: [workspace] missing: typescript does not publish a readable manifest`. Claude discovery remains available on that fixture. The one-line Claude prompt requests tool names only; no `tools/call` was requested, so this reading does not claim Claude displayed the onset fault through a tool call. Codex received no `startup_timeout_sec` override. The metadata follow-up separates its initially deferred tool visibility from server connection status.

The client session identifiers are `53480f44-a3be-44af-bada-08eb3700b74a` (Claude healthy), `3d16a469-a8b3-4acf-841a-35d71a4530ff` (Claude refusing), `01a10d61-7e7f-7bc3-b27f-8846a54971e1` (Codex healthy), and `01a10d65-18bf-7401-9d30-e542087e90ce` (Codex discovery). Codex refusing creates no session. Raw journals are the matching `client-*.out`/`.err` files and their JSON command records.

Commands and their closing lines follow. Every long instrument used `node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal tmp/onset/NAME.log --errors tmp/onset/NAME.err --cap SECONDS -- node tmp/onset/SCRIPT.ts`. The launch artifacts retain the exact caps and terminal exit records. `commands.md` records every measured child command's exact executable, argument array, cwd, exit, duration, and closing stdout/stderr lines.

| Instrument | Closing line / result |
| --- | --- |
| `node tmp/onset/prepare-retry.ts` | `prepare: control built; tracked source untouched` |
| `node tmp/onset/onset.ts` | `control: PASS; gate removal reverses initialize/arm order`; initial loop stops at the first veneer refusal |
| `node tmp/onset/veneer.ts` | `M-A: veneer samples complete; response status retained` |
| `node tmp/onset/recovery.ts` | `M-B: PASS; every replacement proved the case and rejected the runtime control` |
| `node tmp/onset/resources.ts` | `M-D: controls PASS; held worker detected and false assertion failed`; expected exit 1 |
| `node tmp/onset/clients.ts` | `M-E: client readings complete` |
| `node tmp/onset/client-discovery.ts` | `M-E follow-up: Codex discovery completed at the default startup timeout` |
| `node tmp/onset/suites.ts` | `M-C: suite wall times recorded; historical worktree removed` |
| `node tmp/onset/finalize.ts` | `final: clean 058a946; built hashes unchanged; historical worktree absent` |
| `node tmp/onset/commands.ts` | `commands: tmp/onset/commands.md written` |

The suite and preparation command closing lines are recorded directly here as well as in the command appendix.

| Command | Context | Closing line / exit |
| --- | --- | --- |
| `git worktree add --detach tmp/onset/baseline-0437a29 0437a29` | Probe checkout | `HEAD is now at 0437a29 Defer stage warming to explicit start (roadmap 1 U1)`; exit 0 |
| `npm ci --ignore-scripts` | Historical worktree only | `added 131 packages, and audited 132 packages in 5s`; exit 0 |
| `npm run build` | Historical worktree only | `built in 20ms` (bin build); exit 0 |
| `npm run test:src:server` | 0437a29 | `Tests 1 failed \| 202 passed \| 5 skipped (208)`; `Duration 403.68s`; exit 1 |
| `npm run test:src:bin` | 0437a29 | `Tests 12 passed \| 6 skipped (18)`; `Duration 107.27s`; exit 0 |
| `npm run test:src:server` | 058a946 | `Tests 213 passed \| 6 skipped (219)`; `Duration 439.35s`; exit 0 |
| `npm run test:src:bin` | 058a946 | `Tests 15 passed \| 6 skipped (21)`; `Duration 133.41s`; exit 0 |
| `git worktree remove --force tmp/onset/baseline-0437a29` | Probe checkout | Empty output; exit 0 |
| `git status --porcelain` | Probe checkout | Empty output; exit 0 |
| `git rev-parse --short HEAD` | Probe checkout | `058a946`; exit 0 |

The exact client argument arrays, including one-line prompts, are in `commands.md` and `client-*.json`. Claude uses `claude -p --mcp-config tmp/onset/claude-CASE.json --strict-mcp-config`, with JSONL output and built-in tools disabled. Codex uses `codex exec --ignore-user-config --ephemeral --json` with `-c mcp_servers.probe.command=...`, `-c mcp_servers.probe.args=...`, and `-c mcp_servers.probe.required=true`. The temporary entry changes cwd to the selected workspace and imports the unchanged built bin. Claude closes with a successful result naming `mcp__probe__prove` in both cases; Codex refusing closes with the required-server error quoted in M-E; both healthy Codex commands close with `turn.completed`.

Preparation attempts remain recorded and are not timing samples: the first temporary control build refused its unused private method; the host filter initially included Claude Desktop and was corrected to the named process population; the initial worker control had no retained parent listener and exposed no active resource; Vitest's default reporter needed initialization, so the resource instrument uses the inert reporter hooks that RuntimeStage uses; the recovery fixture was corrected to declare the probe project and mapped test path. The specified gate-removal negative control passed before the accepted readings.

Final verification passed: the main checkout is clean at `058a946`; the original bin, server, and installed pool hashes are unchanged; the historical worktree directory and registration are absent. No sub-agent was spawned, and no commit was made. All retained instruments, samples, logs, and reports are under `tmp/onset/`.

## After the T1 revision (probe `e8d4715`, 2026-10-05, unit `eager-probe-warm2`)

The type stage warms behind `initialize` under `PROBE_WARM` (90,000 ms). Spawn to `initialize`, 3 runs each: veneer 7.439, 7.107, and 7.939 s; scaffold 3.171, 4.051, and 3.172 s; probe 1.495, 1.744, and 1.489 s.

On veneer, the first type `prove` earned a receipt without a retry in 3 runs of 3: 43.4, 45.0, and 46.2 s from call to receipt (50.8, 52.1, and 54.1 s from spawn).

Host: Windows, i7-10700, about 96 GB free, with CPU snapshots of 3 to 28%. Raw readings: probe `tmp/onset/warm2-evidence.json`.

Earlier comparison (unit `eager-probe-veneer2`): veneer's type warm took 37.2 s at the median (36.4 to 50.0 s). Published 0.0.20 refused its first two `prove` calls on veneer, at 76.7 s and 35.5 s.

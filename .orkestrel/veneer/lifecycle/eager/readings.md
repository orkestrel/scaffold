# Eager `browse`: readings

Host: Windows 11, Node 24.21.0, Edge 154.0.4258.53, browser `main` at `50dee0c` with `@orkestrel/pool` 0.0.14 staged; 2026-10-04. Instruments and raw transcripts live in the browser checkout under `tmp/u11/`, `tmp/probes/eager/`, and `tmp/u12/`.

## U11: real clients

`tmp/u11/u11.ts` ran the built `dist/bin/main.js` once per client and case, with no saved client configuration: Claude Code through `claude -p --mcp-config FILE --strict-mcp-config`, Codex through `codex exec` with `-c mcp_servers.browse.*` overrides (the user's choice, 2026-10-04).

| Client | Case | What the client reported | What the agent saw |
| --- | --- | --- | --- |
| Claude Code | valid browser | `browse` connected | `navigate` and `look` ran |
| Claude Code | missing executable | `browse` connected | its first call answered `BROWSER_SERVER_UNAVAILABLE: spawn … ENOENT.` (T8: a client that skips the legacy `initialize` gate meets the onset refusal at its first `tools/call`) |
| Codex (`exec`) | valid browser | `browse` started | `look` ran; `navigate` was refused by Codex: "MCP tool call requires approval, but approval policy is never" (a client policy for a tool that is not read-only) |
| Codex (`exec`) | missing executable | the server was dropped after the `-32000` refusal | no `browse` tools at all; the cause reached neither the agent nor the `exec` output |

**Session end (A-29).** `tmp/u11/linger.ts` read the server after each client exited. Both clients ended the `browse` server before its teardown finished: the server pid was gone at the client's exit, and its `<pid>-<uuid>` profile folder stayed (checked again 15 s later). The folder held no `browse.json`, so the server was killed while it removed the profile, after the browser was destroyed. On Windows the browser also dies with its server (A13). The next start in the same root removes the folder by the dead-owner rule (A6). Cost: one partial profile folder per ended session until the next start; no browser left running.

**For U13.** The guide states the Codex approval for `browse`'s mutating tools, that Codex hides a server whose `initialize` fails (read its log), that Claude Code shows the refusal at the first call, and that profile folders from ended sessions are removed at the next start.

**D-3 readings (2026-10-04, `tmp/u11/onset.ts`).** With `-c mcp_servers.browse.required=true`, Codex refused to start the session against the landed `browse` with a missing executable and printed the refusal with its cause (`required MCP servers failed to initialize: browse: handshaking with MCP server failed: JSON-RPC error: -32000: BROWSER_SERVER_UNAVAILABLE: spawn … ENOENT.`). Against a stand-in that writes the same `browse:` line and exits at once (option c), Codex showed no `browse` tools and no cause, and Claude Code reported the server `failed` (`CONNECTION_CLOSED`) with no cause. Ruling, by the user's condition: keep the landed `initialize` refusal and tell Codex users to set `required = true` (browser `3924fbb`, the guide's client observations). Probe item 1 copies this onset mechanism.

## U12: measurements

`tmp/u12/run.ts` ran the instruments of `tmp/probes/eager/` serially on 2026-10-04 (08:08 to 08:58 local), each under the load of veneer's `npm run test:journey` at `d0603b4` plus a heavy local page driven through the tools. Every instrument's load control held: median loaded `start()` onset 1.3 to 2.0 s against 0.66 to 0.75 s idle. Every cleanup census found no recorded process alive. Medians follow, with the range in parentheses; every sample is in `tmp/probes/eager/readings/*.json` and the table in `tmp/u12/summary.md`.

| Reading | Size 1 | Size 2 | Size 3 |
| --- | --- | --- | --- |
| M1 onset, `start()` resolved, idle | 0.69 s | 0.68 s | 0.70 s |
| M1 onset, loaded | 1.40 s (1.26 to 1.68) | 1.36 s (1.02 to 1.70) | 1.30 s (0.96 to 1.68) |
| M1 full floor, loaded (serial refill, T3) | 1.19 s | 2.54 s (2.26 to 4.06) | 5.37 s (4.55 to 6.49) |
| M2 spawn to `initialize` answer, loaded, clean root | 1.27 s (max 1.69) | 1.31 s (max 1.42) | 1.32 s (max 1.59) |
| M2 with a synthetic live orphan to sweep | 1.55 s (max 1.82) | 1.54 s (max 2.02) | 1.51 s (max 2.07) |
| M3 leased-browser kill to the next successful call | 1.92 s (1.42 to 2.43) | 0.40 s (0.06 to 0.48) | |
| M5 in-call loss: interrupted call answered | 39 ms | 46 ms | |
| M5 in-call loss: next call succeeds | 1.54 s | 73 ms | |
| M5 hand-out and per-call ping | 0.7 and 0.9 ms | 0.7 and 1.5 ms (max 81) | |
| M4 leased `look` / `read` | 1.26 s / 242 ms | 1.31 s / 246 ms | |
| M8 refill warm while calls continue | | 2.26 s (1.39 to 2.51); calls during it 1.99 s | |
| M4 spare tree, summed working set (shared pages counted per process) | | 1.22 GB (0.99 to 2.04) | |

- **M2** stays far under Codex's 10 s and Claude Code's 30 s budgets at every size, with or without leftovers: no `startup_timeout_sec` is needed.
- **M5 renderer hang:** a hung page answers after the 30 s command deadline (30.01 s, 3 runs), inside Codex's 60 s tool timeout; a browser-wide hang that costs two deadlines (row 11b) is `NOT-EVIDENCED` on this host.
- **M6:** answered by A13 (the browser dies with a killed server on Windows).
- **M7:** every slot's `DevToolsActivePort` matched its endpoint (M1 run).
- **M9:** 0 natural launch failures in 300 loaded size-1 onsets (warm median 0.96 s, range 0.71 to 2.07). With independent attempts the one-sided 95% upper bound is about 1%; a loaded host is not independent, so this informs rather than proves `BROWSER_SERVER_RESTARTS = 1` (T6).
- **M4 spare CPU** read about 40% of one core in the first two 3 s windows after the floor filled and 215 to 316% in every third window, so the windows could not separate Edge's startup work from a steady cost. `tmp/probes/eager/m4-idle.ts` then read an idle host in 5 s windows for 120 s after the floor filled, 3 sessions: a burst of about 130% of one core in the first 20 s, when Edge starts 6 more processes, then a median near 10% (windows 5 to 23, range 2 to 51%), with the summed working set growing from 1.22 GB to 1.78 GB over the 2 minutes. Edge is the browser this host discovers; a lighter build would cost less, unmeasured.

## Rulings on the readings (the user, 2026-10-04)

- **D3, the default size:** 1. `BROWSE_POOL=2` or `3` opts into a warm spare where fast recovery matters. The user's framing: failover comes first to build the machinery for parallel holders (browser roadmap item 14); with parallel holders a spare becomes capacity rather than idle cost, so the default is revisited then.
- **T6, the bound:** `BROWSER_SERVER_RESTARTS` stays 1.
- **The load itself:** veneer's journey exited 1 near the end of the M4 and M9 runs, which ended those instruments after their series completed (M4 296 samples, M9 300 onsets); the journey's log was in the instrument's removed scratch folder, so the failing case is not known. The journey passed 6 of 6 on a quiet host at `d0603b4`; these failures ran beside concurrent browser launches.

# Release record

Each round lists its packages in publish order: the layer, the version it replaced, the version the registry serves, the bump ruling with its evidence, and the `gitHead` the registry records. A row's ruling is the visit's (`.agents/skills/orkestrel-publish/scripts/wave.ts --visit`).

## 2026-10-04: the eager browse server and the contract-0.0.19 wave

The round shipped `@orkestrel/pool` 0.0.14 and the eager `browse` server in `@orkestrel/browser` 0.0.23, then moved every runtime consumer of pool and of the database chain to `@orkestrel/contract` `^0.0.19` (the user's ruling of 2026-10-04, "Contract wave first"), in the catalog's layer order regenerated before sequencing. `@orkestrel/supervisor` is excluded by the user's standing rule and stays on its prior ranges.

| Code | Layer | Package | From | To | Ruling | `gitHead` |
| --- | --- | --- | --- | --- | --- | --- |
| 1 (pre-round) | L2 | `@orkestrel/pool` | 0.0.13 | 0.0.14 | bump: dist moved (floor, `watch`, token `destroy`, `restarts`), contract `^0.0.19` | `5a3a631` |
| 2 | L1 | `@orkestrel/indexeddb` | 0.0.13 | 0.0.14 | bump: contract range moved; dist same | `b6fae46` |
| 2 | L1 | `@orkestrel/sqlite` | 0.0.13 | 0.0.14 | bump: contract range moved; dist same | `e456876` |
| 3 | L2 | `@orkestrel/database` | 0.0.16 | 0.0.17 | bump: contract, indexeddb, sqlite ranges moved; dist same | `14fd5b6` |
| 3 | L5 | `@orkestrel/browser` | 0.0.22 | 0.0.23 | bump: dist moved (the eager server), `@orkestrel/pool` `^0.0.14` added | `242f380` |
| 4 | L3 | `@orkestrel/queue` | 0.0.15 | 0.0.16 | bump: ranges moved; dist same | `b182c1e` |
| 4 | L3 | `@orkestrel/relation` | 0.0.14 | 0.0.15 | bump: ranges moved; dist same | `aec669d` |
| 4 | L3 | `@orkestrel/terminal` | 0.0.17 | 0.0.18 | bump: ranges moved; dist same | `bf3c7e8` |
| 4 | L3 | `@orkestrel/workspace` | 0.0.10 | 0.0.11 | bump: ranges moved; dist same | `ed74aaf` |
| 5 | L4 | `@orkestrel/worker` | 0.0.14 | 0.0.15 | bump: dist moved (forwards pool's `min`, `restarts`, `watch`), pool `^0.0.14`, contract `^0.0.19` | `a055007` |
| 5 | L5 | `@orkestrel/probe` | 0.0.19 | 0.0.20 | bump: contract, mcp, queue, tool ranges moved; dist same | `dee8845` |
| 5 | L3 | `@orkestrel/scaffold` | 0.0.90 | 0.0.91 | bump: generated workspaces pin browser `^0.0.23`, `BROWSE_UPSTREAM` adds pool, catalog regenerated; published ahead of its layer because consumers' audits read its browser pin | `9c6f2dbc2` |
| 6 | L4 | `@orkestrel/workflow` | 0.0.20 | 0.0.21 | bump: contract, database, queue ranges moved; dist same | `62e0718` |
| 7 | L5 | `@orkestrel/agent` | 0.0.25 | 0.0.26 | bump: six ranges moved; dist same (the first code for it was refused with `EOTP`) | `3a4e970` |
| 8 | L6 | `@orkestrel/toolbox` | 0.0.16 | 0.0.17 | bump: ranges moved; dist same | `2f535df` |

The code column counts the user's one-time codes in order; code 1 here is pool's, published before the wave. Every row was confirmed against the registry by `gitHead`.

Release-chain notes:

- `@orkestrel/browser`'s `prepublishOnly` runs `test:distribution -- --mode release`, which needs a Linux `/proc` table and filesystem FIFOs; on Windows the default mode ran (14 passed, 9 host-bound skips), the standard 0.0.22 shipped on. One full `test:service` run failed the synthesized-orphan case once (a 5 s window over a detached sweep and Edge's exit under load); 5 of 5 alone and the next full run (182) passed.
- `@orkestrel/scaffold` 0.0.91's catalog carries the versions published through code 4; the later rows refresh at its next release.
- `@orkestrel/ollama` 0.0.21 is held for one repair (the user's ruling, 2026-10-04): its live store tasks on `qwen3.5:2b-q4_K_M` passed 2 of 3 runs under both browser 0.0.22 and 0.0.23 in an A/B (`ollama/tmp/ab-store.json`), and `attemptStoreTask` opened every attempt in the browser's shared default context, so attempts 2 and 3 ran on shifted references (`e13`, `e25`) and never recovered. The repair isolates a fresh context per attempt; ollama publishes on the next code after its chain is green.

## 2026-10-04 evening round: parallel browse holders

| Code | Layer | Package | Prior | Published | Ruling | gitHead |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | L2 | `@orkestrel/pool` | 0.0.14 | 0.0.15 | bump: a grant resets the strikes only for a record created after the last strike (the user's Q3 ruling, `lifecycle/holders/synthesis.md`) | `4c589c6` |
| 2 | L5 | `@orkestrel/browser` | 0.0.23 | 0.0.24 | bump: parallel holders (`acquire`, `execute`, `tools`, `destroy`), journey admission across holders, downloads under each profile, `BROWSE_VIEWPORT`, `capture`, the scroll settle and `OCCLUDED`, the deadline-not-gone fix, the failover hardening; pool `^0.0.15` | `b81c22c` |
| 3 | L3 | `@orkestrel/scaffold` | 0.0.91 | 0.0.92 | bump: generated workspaces pin browser `^0.0.24` and probe `^0.0.20`; the canon's measured-performance rule and figures turned into properties; catalog and the browser and pool guide mirrors refreshed (npm's session expired between codes 2 and 3; one login, then a fresh code) | `5612beb` |

Release-chain notes: browser's `prepublishOnly` ran with the default distribution mode on Windows (14 passed, 9 host-bound skips) and `test:service` green (193 passed); its first visit caught the server case that pinned the old strike reset, rewritten to the ruled behavior with a control against the old rule. `@orkestrel/worker` still pins pool `^0.0.14` and takes the strike rule at its next visit.
## 2026-10-05 round: holders as contexts, shared leases, the sync fix

| Code | Layer | Package | Prior | Published | Ruling | gitHead |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | L2 | `@orkestrel/pool` | 0.0.15 | 0.0.16 | bump: per-record `capacity` (shared leases), the idle-loss strike, and `isPoolMax` renamed to `isPoolLimit` (a breaking public rename; no fleet source imports it) | `f5c3289` |
| 2 | L4 | `@orkestrel/worker` | 0.0.15 | 0.0.16 | bump: `WorkerOptions.pool` refuses `capacity` (`Omit` plus `capacity?: never`), the idle-loss strike case, pool `^0.0.16` | `5c14ed7` |
| 3 | L5 | `@orkestrel/browser` | 0.0.24 | 0.0.25 | bump: holders as isolated contexts on pooled browsers (`BROWSE_CONTEXTS`, default 2, limit 4; admission `size × contexts`, the shared holder counted); service-worker start (ROADMAP item 16); `--disable-sync` in `BROWSER_LAUNCH_ARGS` (ROADMAP item 15: the account's synced network-hooking extensions reset the loader factories mid-run); `CDPClient` settles a detached session's pending commands; page close before release; the teardown and crash repairs; concurrent replays; pool `^0.0.16` | `ea8477b` |

Release-chain notes:
- npm's session expired before pool's code; one login, then a fresh code. Worker and browser each answered "accepted, unconfirmed" while npm processed them, then `npm view` served them (worker after about 75 s, browser after about 4 minutes).
- Browser's `prepublishOnly` release-mode distribution needs `/proc` and FIFOs. On Windows the default mode ran (14 passed, 9 host-bound skips), and `test:service` passed (205 passed, 6 skipped), as for 0.0.22 and 0.0.24.
- The browser visit's test gate missed three times on `FileBrowserStore`'s lock-race case, a 512-iteration loop at Vitest's 5 s default under the parallel load. It was sized to 8 iterations from mutation measurements (`75c8fc2`).
- Probe (L5) is held: its visit failed the silent-initialize teardown case under the host load of worker's gates. Scaffold follows.

Continued on 2026-10-06 UTC:

| Code | Layer | Package | Prior | Published | Ruling | gitHead |
| --- | --- | --- | --- | --- | --- | --- |
| 4 | L5 | `@orkestrel/browser` | 0.0.25 | 0.0.26 | bump: `--disable-features=msImplicitSignin` in every library launch, merged with a caller's disabled features into one switch, so Edge automation profiles carry no Microsoft account (measured on Edge 154.0.4258.53) | `0379087` |
| 5 | L5 | `@orkestrel/probe` | 0.0.20 | 0.0.21 | bump: the eager start (ROADMAP item 1) on pool `^0.0.16`, with one exclusive pool per stage; `initialize` waits for lint and runtime while the type stage warms behind it under `PROBE_WARM`; `createHandshakeError`; `LINT_TEARDOWN`; queue removed | `0745af2` |
| 6 | L3 | `@orkestrel/scaffold` | 0.0.92 | 0.0.93 | bump: generated workspaces pin browser `^0.0.26` and probe `^0.0.21`; the catalog regenerated; the pool, worker, browser, and probe mirrors copied from their release heads; Oxfmt 0.72 reformatting | `916820149` |

Release-chain notes, continued:
- Browser 0.0.26's first visit failed `npm install`: `@microsoft/api-extractor` 7.59.4, published at 01:54 UTC, needed `@rushstack/ts-command-line@5.3.17`, which reached npm about 10 minutes later. The rerun passed.
- Browser 0.0.26 used the Windows gates again: default-mode distribution, 14 passed with 9 skipped; `test:service`, 205 passed with 6 skipped.
- Probe's second visit ran alone and passed, after the fixture fix (`140c5bd`: the overlap is recorded with the pid) and the receipt re-quote for Oxlint 1.87.0 (`24b8a27`).
- Scaffold's first preparation undid the visit's format step, and its second added a trailing newline to the `app-only-toolchain.txt` snapshot. Both were corrected before the passing `prepublishOnly`.
- Probe and scaffold each answered "accepted, unconfirmed", then `npm view` served them within about 2 minutes.

## 2026-10-06 round: mcp items 13 and 14, the ollama re-pin

| Code | Layer | Package | Prior | Published | Ruling | gitHead |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | L5 | `@orkestrel/mcp` | 0.0.36 | 0.0.37 | bump: `MCPInputOptions.clock` reads every expiry (ROADMAP item 14); `isPingRequest` lets a headerless legacy pre-initialize `ping` pass the session middleware (ROADMAP item 13, a recorded departure from the transport page's 400 recommendation); scaffold 0.0.93 | `9e374f2` |

Release-chain notes:
- mcp's visit ran alone: source 1539 passed with 2 skipped, guides 202, conformance 47. The publish answered "accepted, confirmed", and `npm view` serves 0.0.37.
- npm's session had expired; one login link, then the code.

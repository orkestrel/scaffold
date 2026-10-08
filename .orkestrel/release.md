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

## 2026-10-07 round: the scope-at-dispatch fix, the line view, and the 2B

Two agent releases landed the same day from two sessions. Code 1 is the judge round (`.orkestrel/agent/refine.md` § The judge): the judge contract and engine, the System One wire, and the helpers, visited with `scripts/wave.ts --visit` and uploaded with `scripts/window.ts --publish` (package size 445.4 kB, 9 files). The small-model campaign (`.orkestrel/veneer/lifecycle/reading/small/matrix.md`) then found that the agent loop dispatched calls to tools the active scope had withdrawn; the fix is recorded in `.orkestrel/agent/refine.md` § Scope at dispatch, and code 2 is that loop fix on top of the judge. The ollama judge wire for Mica's raw logprob readout waits in the held ollama checkout for its release; the desk re-pins when agent and ollama are both served.

| Code | Layer | Package | Prior | Published | Ruling | gitHead |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | L5 | `@orkestrel/agent` | 0.0.26 | 0.0.27 | bump: dist moved (`AgentJudge`, `SystemOneJudge`, `computeReading`, the judge types, guards, and helpers; `copyJSON`); runtime ranges same; dev re-pins probe `^0.0.21`, scaffold `^0.0.94`, toolchain | `6ea0451` |
| 2 | L5 | `@orkestrel/agent` | 0.0.27 | 0.0.28 | bump: a call to a tool the active scope does not admit is never dispatched; a turn that advertised no tool ends on the reply with each dropped call observed through `deny`; an out-of-scope call with tools advertised is denied before the authority gate; results and denials merge by call position | `7784837` |

Release-chain notes:
- Code 1: the visit's compare step ruled the bump (exit 3, dist moved, ranges same); the login URL expired once before the user reached it and was minted again; the upload answered `+ @orkestrel/agent@0.0.27` and the registry served it with `gitHead` `6ea0451`.
- Code 2: the first code expired between the user's message and the upload (`EOTP`); the second landed. The upload journal answered `+ @orkestrel/agent@0.0.28` at once and the registry served it about 6 minutes later.
- The agent visit's overwrite refused the tree once over a formatter reflow in the vendored `guides/router.md` mirror; the committed bytes were written back (`tmp/units/committed.ts`) and the visit passed.
- Browser 0.0.27 is prepared and held for the 2B's last live confirmation (release commit `59abac3` plus the journey start, in-place replay, stable links, the one-exit refusals, the restored `read` and `click`/`type` copy, all pushed); ollama re-pins to agent `^0.0.28` and browser `^0.0.27` after it.

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
- Ollama 0.0.21 is held. Its visit failed `test:service` on the live shipping and paging store cases, and the user ruled to release only after the store campaign's acceptance series passes. The release head `58c08d8` stays local.

## 2026-10-07 round, continued: browser 0.0.27 and ollama 0.0.21 after the small-model campaign

The campaign's record is `.orkestrel/veneer/lifecycle/reading/small/matrix.md`. The user's gate was the 2B's clean confirmation on the real harness; `confirm.ts 2b-final3` passed every one of the six store tasks in 16 runs of 16 (row F3), after the wire audit found the harness ran the thinking model with `think: false` (row W1).

| Code | Layer | Package | Prior | Published | Ruling | gitHead |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | L5 | `@orkestrel/browser` | 0.0.26 | 0.0.27 | bump: dist moved (the journey `start` and in-place replay, stable link references, the one-exit journey refusals, the field-aware `type` refusal, the `type` description that focuses the field, `edit` with `journey` optional and defaulting to the only saved journey across every store page, the restored `read` shape); ranges moved (codec `^0.0.5` added, mcp `^0.0.37`); 3 self-pin hits ruled kept (the compatibility fixture that preserves a file written by the published 0.0.26 store, tarball SHA1 `995478a4…`, and the case that replays it name that version by design) | `36cde8f` |

Release-chain notes:
- The browser layer's first visit failed `npm test` on one server case: the stable-links MCP case called `read` with no `from` (written after `74a8708` made `from` required; the server project had not run whole since). Both calls pass `from: 1` in `ee8aed1`.
- The second visit refused the overwrite over the first visit's uncommitted catalog row (agent 0.0.27 to 0.0.28); committed as `6578fad`.
- The third visit passed every gate (`npm test` 91.8 s) and ruled the bump; the layer stopped on the self-pin sweep's three hits, ruled kept per § Sweep the self-pins (a canned fixture carries the version it preserves).
- The first whole `test:service` run failed 3 of 263: two editable-region cases and the measured cart refusal still pinned the pre-`2098194` `type` refusal (`call click for a button`, `call click for a link`), the suite having last run before that commit; they pin the shipped field-aware text in `36cde8f` (the two files alone: 132 passed).
- Windows gates: default-mode distribution 14 passed with 9 host-bound skips; the second whole `test:service` run 256 passed with 6 skipped and one timing miss (`codegen.test.ts` claim 12, `outline is gone because the page changed`), which passed alone (2 of 2, 3.3 s), the file-by-file reading the Windows releases take.
- **Browser 0.0.27: published** 2026-10-07 from `36cde8f`. `window.ts --publish` answered accepted and unconfirmed; `--confirm` served it within the wait, and `npm view` reads `gitHead` `36cde8f1…`.

| Code | Layer | Package | Prior | Published | Ruling | gitHead |
| --- | --- | --- | --- | --- | --- | --- |
| 2 | L6 | `@orkestrel/ollama` | 0.0.20 | 0.0.21 | bump: dist moved (the judge wire for Mica's raw logprob readout, the store harness and its conformance, the 2B's thinking run); runtime range agent `^0.0.25` to `^0.0.28`; dev re-pins browser `^0.0.27`, scaffold `^0.0.94`; 0 self-pin hits | `058e770` |

Release-chain notes, ollama:
- The visit passed every gate (`npm test` 26.4 s) and ruled the bump; `prepublishOnly` failed `test:service` twice over: 8 page cases could not resolve `@orkestrel/queue` in the page (the lockfile placed queue 0.0.16 under agent and workflow with no top-level copy, which the derived import map never sees; `npm dedupe` hoisted it, `058e770`), and `tests/service/judge.test.ts` refuses at its load gate because the daemon holds no `tev1:0.8b` (the judge wire's decision model, `OLLAMA_JUDGE_CONFIG.decision`).
- The whole `test:service` after the dedupe: 75 passed with 1 skipped, the judge file alone red on the missing model; every live store case passed on the 2B with thinking.
- Ollama `main` is pushed at `058e770` (28 commits: the harness conformance, the wire audit's changes, the re-pin, the overwrite, the dedupe).
- The user ruled the judge model (2026-10-07): `tev1:0.8b` pulled (811 MB; the registry serves `library/tev1:0.8b`), beside the Mica already held. The judge file passes alone on Ollama 0.35.1 (1 of 1, 16.9 s), although the guide records its System One readings from 0.40.0, and the whole `test:service` then reads 15 files and 76 passed in 201.7 s. Every gate of `prepublishOnly` has passed on this host.
- **Ollama 0.0.21: published** 2026-10-07 from `058e770`. `window.ts --publish` answered accepted and unconfirmed; `--confirm` served it within the wait, and `npm view` reads `gitHead` `058e770d…` with agent `^0.0.28`.
- The desk (an application; nothing to publish) re-pinned to agent `^0.0.28`, ollama `^0.0.21`, browser `^0.0.27`, scaffold `^0.0.94`, and probe `^0.0.21` at desk `e9d6ca8`, with one agent copy (ollama's deduped) and every desk gate green at its pre-re-pin counts (type check 0, 101 app tests, 119 policy, 225 config, the journey 6 with 66 captures).
- mcp's `tests/distribution.test.ts` pins (`['"receipt-1"']` at lines 1596 and 1732) moved to `['receipt-1']` (`8695571`): the distribution adopter installs agent at `^0.0.23` and resolves 0.0.28, which passes a string tool result unchanged. The mcp visit then ruled no bump (dist same, ranges same, 0 self-pin hits; `npm test` 113.6 s) and pushed the re-pin to scaffold `^0.0.94`, the pins, and the overwrite (`ad9276d`); mcp stays at 0.0.37. **The user ruled (2026-10-07): the `@orkestrel/ollama` provider keeps `think` defaulting to `false`**; a harness or a consumer that wants a thinking model's reasoning sets `think: true` itself, as the store harness does.

## 2026-10-07 re-pin check: the consumers the rounds left behind

`tmp/units/fleet-pins.ts` read every checkout's `@orkestrel` ranges in `dependencies`, `devDependencies`, and `peerDependencies` against the registry's `latest` tags (supervisor skipped by the standing rule). Each stale range is ruled by its cause.

- **Runtime ranges these rounds left behind, re-pinned and released here:** middleware's peers on database (`^0.0.16`; the 2026-10-04 wave released database 0.0.17 and missed this peer) and server (`^0.0.21`); probe's `mcp` (`^0.0.36`; mcp 0.0.37 shipped 2026-10-06); scaffold's own browser and probe pins, which its generated workspaces copy (`^0.0.26` and `^0.0.21`), after probe publishes.
- **Owned by the agent session's plan** (`.orkestrel/agent/plan.md`, unit 14, after its agent release): toolbox (agent `^0.0.26`), mcp's quoted tool-result lines, and the scaffold guide mirrors; the desk re-pinned at `e9d6ca8`.
- **Owned by the veneer session:** veneer's browser pin (`lanes.md`, 2026-10-07).
- **Development ranges only, moved at each package's next visit with no release:** database and indexeddb (browser `^0.0.22`), workflow (browser `^0.0.23`), pool and worker (probe `^0.0.20`, scaffold `^0.0.92`).
- **Drift older than these rounds, waiting on the user's ruling:** 25 packages declare `@orkestrel/contract` `^0.0.18` at runtime (abort, brief, budget, codec, console, csv, emitter, form, interpret, lsp, msg, ndjson, process, program, qualifier, rater, reason, router, sea, sse, table, template, test, timeout, websocket), most with development pins on scaffold `^0.0.81` and probe `^0.0.19`. Contract 0.0.19 shipped 2026-10-01, and the user's ruling of 2026-10-04 moved only pool's consumers and the database chain, so an adopter of agent, browser, or middleware installs contract 0.0.18 and 0.0.19 side by side. Moving them is a fleet wave in layer order, with one release per package.

| Code | Layer | Package | Prior | Published | Ruling | gitHead |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | L4 | `@orkestrel/middleware` | 0.0.22 | 0.0.23 | bump: ranges moved (contract `^0.0.19`; peers database `^0.0.17`, server `^0.0.22`); dist same; scaffold 0.0.81 to 0.0.94 overwrite; 0 self-pin hits | `a1bc606` |

Release-chain notes:
- Middleware's first visit failed `lint:check`: scaffold 0.0.94's `policy(no-nested-functions)` refuses the session middleware's `control` methods on an object literal bound to a local. The literal moved into the `Object.assign` argument, typed through its type arguments so it still checks against `SessionControlInterface` (`72dd145`; `tests/src/core/middlewares.test.ts` 117 of 117, the `regenerate` and `destroy` cases included). The second visit passed every gate and `prepublishOnly`, release-mode distribution included (11 passed).
- The first code expired while the pack ran (`EOTP`); the second landed. `window.ts --publish` answered accepted and unconfirmed, `--confirm` served it, and `npm view` reads `gitHead` `a1bc606…` with peers server `^0.0.22` and database `^0.0.17`.
- **Probe 0.0.22 is prepared at `0ff5ff7`, pushed** (mcp `^0.0.37`; scaffold 0.0.92 to 0.0.94 overwrite; dist same, 0 self-pin hits): the visit's `npm test` passed in 534.2 s beside the `tmp/` recycle, and `prepublishOnly` passed (13 files, 269 passed with 12 skipped; policy 119; config 227; distribution 11). It publishes on the next code; scaffold's visit follows it.
- **Probe 0.0.22: published** 2026-10-07 from `0ff5ff7` (code 409869, accepted and unconfirmed, then served).

## 2026-10-07 fleet wave: every checkout on origin main, every `@orkestrel` range on its latest

The user's order (2026-10-07): bring every package to its origin `main`, re-pin it to the latest contract and every other `@orkestrel` package, make it work, and republish in layer order. Supervisor stays out by the standing rule; veneer is unpublished and its re-pin belongs to its session. `tmp/units/fleet-sync.ts` found every checkout current except scaffold (4 commits) and veneer (73), both clean and fast-forwarded. The agent session lands its work on `claude/confident-maxwell-6nd0f3` in agent, so agent `main` carries none of it; agent, toolbox, and ollama wait for the user's ruling before the wave visits them, because that session's plan proposes agent 0.0.29 and its own re-pin unit.

| Code | Layer | Package | Prior | Published | Ruling | gitHead |
| --- | --- | --- | --- | --- | --- | --- |
| — | L0 | `@orkestrel/contract` | 0.0.19 | 0.0.19 | no bump: development ranges only (guide, probe, scaffold) | `main` pushed |
| 1 | L1 | `@orkestrel/abort` | 0.0.12 | 0.0.13 | bump: contract `^0.0.19`; scaffold 0.0.94 overwrite | `25d63a5` |
| 1 | L1 | `@orkestrel/budget` | 0.0.12 | 0.0.13 | bump: contract `^0.0.19` | `3363fea` |
| 1 | L1 | `@orkestrel/csv` | 0.0.9 | 0.0.10 | bump: contract `^0.0.19` | `65f1640` |
| 1 | L1 | `@orkestrel/emitter` | 0.0.11 | 0.0.12 | bump: contract `^0.0.19` | `fe9a19b` |
| 1 | L1 | `@orkestrel/msg` | 0.0.12 | 0.0.13 | bump: contract `^0.0.19` | `f27910a` |
| 1 | L1 | `@orkestrel/ndjson` | 0.0.11 | 0.0.12 | bump: contract `^0.0.19` | `e809bba` |
| 1 | L1 | `@orkestrel/sse` | 0.0.9 | 0.0.10 | bump: contract `^0.0.19` | `a3142b0` |
| 1 | L1 | `@orkestrel/timeout` | 0.0.12 | 0.0.13 | bump: contract `^0.0.19` | `f8d14d2` |
| — | L1 | `@orkestrel/html`, `@orkestrel/indexeddb`, `@orkestrel/sqlite` | — | — | no bump: development ranges only | `main` pushed |

Prepared, not yet published: codec 0.0.6 (`2f1ac65`) and scaffold 0.0.95 (`3df25bd6c`, ahead of its layer as in the 2026-10-04 wave, because a consumer's audit reads its browser pin; it republishes in L3 after its runtime dependencies move).

Release-chain notes:
- Codec's visit failed the policy sweep's mirror rule: scaffold 0.0.94 requires a proof for an exporting `tests/setup.ts`. Unit `codec-setup` (Astra) wrote `tests/setup.test.ts` (13 cases: the tables against `atob` and `parseInt`, the UTF oracles against handwritten bytes and the fatal decoders) and stopped, as briefed, at the vendored config; `scaffold repair` registered the `setup` project; a deliberate encoder break reddened exactly the three encoder cases; `toThrow(TypeError)` met the lint rule.
- The test package's audit refused scaffold 0.0.94's plan (browser `^0.0.26` against the re-pinned `^0.0.27`, and the browser guide mirror), which scaffold 0.0.95 carries; its visit reruns after that publish.
- Scaffold 0.0.95: `scaffold catalog --all` regenerated the table and eleven mirrors (exit 1 only for the supervisor guide, HTTP 404); the three pin fixtures regenerated after the bump; nine CLI fixture lines moved vite 8.3.2 to 8.3.3 with the re-pin (`CLI.test.ts` 162 of 162); `prepublishOnly` passed.
- The registry serves TypeScript 7.0.2, Vitest 5.0.3, and `@vitest/browser-playwright` 5; every audit reports them as non-blocking readings. Moving the fleet's toolchain to those majors is a separate decision for the user.
- Development pins on guide, scaffold, probe, and test in lower layers trail by one release whenever those packages republish in a later layer, because each depends at runtime on lower layers; their next visit moves them.

Continued (the user, 2026-10-07: agent, toolbox, and ollama are re-pinned and republished in their layers; TypeScript and Vitest keep their majors, because 7 and 5 break the fleet; no manifest moved to either):

| Code | Layer | Package | Prior | Published | Ruling | gitHead |
| --- | --- | --- | --- | --- | --- | --- |
| 2 | L1 | `@orkestrel/codec` | 0.0.5 | 0.0.6 | bump: contract `^0.0.19`; the setup proof | `2f1ac65` |
| 2 | L3 (ahead) | `@orkestrel/scaffold` | 0.0.94 | 0.0.95 | bump: generated pins browser `^0.0.27`, probe `^0.0.22`; emitter `^0.0.12`; catalog | `3df25bd6c` |
| 3 | L1 | `@orkestrel/test` | 0.0.24 | 0.0.25 | bump: dist moved (`hasScratchPath`, the scratch and signal shapes) | `99efe1b` |
| 3 | L2 | `@orkestrel/database` | 0.0.17 | 0.0.18 | bump: ranges moved | `d9519f9` |
| 3 | L2 | `@orkestrel/pool` | 0.0.16 | 0.0.17 | bump: ranges moved | `60d1f27` |
| 3 | L2 | `@orkestrel/tool` | 0.0.18 | 0.0.19 | bump: ranges moved | `775a46c` |
| 3 | L2 | `@orkestrel/websocket` | 0.0.14 | 0.0.15 | bump: ranges moved | `4fc7508` |
| 4 | L2 | `@orkestrel/console`, `form`, `process`, `reason`, `router`, `table`, `template` | 0.0.15, 0.0.8, 0.0.14, 0.0.12, 0.0.16, 0.0.7, 0.0.9 | 0.0.16, 0.0.9, 0.0.15, 0.0.13, 0.0.17, 0.0.8, 0.0.10 | bump: ranges moved | `00c992b`, `7f5fb4b`, `88d0d81`, `9238fb3`, `47f47b8`, `95dc2e0`, `f6e0a5b` |
| — | L2 | `@orkestrel/markdown` | 0.0.17 | 0.0.17 | no bump: development ranges only | `main` pushed |
| 5 | L3 | `@orkestrel/interpret`, `lsp`, `qualifier`, `queue`, `rater`, `relation`, `sea`, `server`, `terminal`, `workspace` | 0.0.15, 0.0.10, 0.0.16, 0.0.16, 0.0.16, 0.0.15, 0.0.18, 0.0.22, 0.0.18, 0.0.11 | 0.0.16, 0.0.11, 0.0.17, 0.0.17, 0.0.17, 0.0.16, 0.0.19, 0.0.23, 0.0.19, 0.0.12 | bump: ranges moved | `a19cc86`, `3969af1`, `57b04c8`, `d4bca87`, `d7e9b04`, `b6cbc87`, `67fcad8`, `e9162fe`, `c7c5726`, `9bc7487` |
| 5 | L3 | `@orkestrel/scaffold` | 0.0.95 | 0.0.96 | bump: console `^0.0.16`, process `^0.0.15`, template `^0.0.10`; generated test `^0.0.25`; catalog | `85a20e380` |
| — | L3 | `@orkestrel/guide` | 0.0.24 | 0.0.24 | no bump: development ranges only | `main` pushed |

The code column restarts at the wave: code 1 is 144455 (the eight L1 rows earlier), code 2 is 013808, code 3 is 870746, code 4 is 881009, code 5 is 139265. Every row was confirmed against the registry.

Prepared for layer L4: brief 0.0.11 (`2fa209c`), mcp 0.0.38 (`7706492`), middleware 0.0.24 (`7c8b83a`), program 0.0.16 (`31a3214`), worker 0.0.17 (`9323028`), workflow 0.0.22 (`a4efd33`).

Release-chain notes, continued:
- `@orkestrel/test`: scaffold 0.0.95's `policy(no-nested-functions)` refused nine sites (the scratch methods on a local `const scratch`, the signal listener on a local `const installed`). Unit `test-nested` (Astra) returned the scratch literal directly through `hasScratchPath` (exported, documented, tested, bound for `has` so detached calls keep working) and passed the listener through `Object.freeze` with `handleEvent` finding itself through `this`. An Opus review held behavior and failed one receiver assertion that could not fail; it now pins identity, and a `handleEvent.call(this)` mutation reddens it. `npm test`: 1,115 passed before, 1,122 after.
- `@orkestrel/server`: the 413 drain case asserted that writing the rest of a 4 MB body returns `false`; this Windows host's loopback send buffer takes the whole write, at the pre-re-pin commit `fe0d85c` as well (3 of 3, read in a scratch worktree), so the case waits for `drain` only when the write buffered and keeps its server claim (`c0eb4fb`).
- `@orkestrel/scaffold` 0.0.96: the CLI fixture's planned test line moved to `^0.0.25` with the re-pin.
- `@orkestrel/mcp`: its first visit missed one case beside worker's gates and passed whole alone (1,539). Release-mode distribution then failed the three page compositions: the composition and the consumer overrides pinned agent `^0.0.23` and the fleet's earlier releases, so the page ran agent 0.0.23 (a JSON-encoded string result, three relay requests after a refused credential). The 2026-10-07 move to `'receipt-1'` had passed only the default mode, which skips those browser cases. Every pin moved to the served release (`6ed6509`), the page cases pass 8 of 8, and `prepublishOnly` passed (distribution 19 with 4 skipped).

| Code | Layer | Package | Prior | Published | Ruling | gitHead |
| --- | --- | --- | --- | --- | --- | --- |
| 6 | L4 | `@orkestrel/brief`, `mcp`, `middleware`, `program`, `worker`, `workflow` | 0.0.10, 0.0.37, 0.0.23, 0.0.15, 0.0.16, 0.0.21 | 0.0.11, 0.0.38, 0.0.24, 0.0.16, 0.0.17, 0.0.22 | bump: ranges moved | `2fa209c`, `7706492`, `7c8b83a`, `31a3214`, `9323028`, `a4efd33` |
| 7 | L5 | `@orkestrel/agent` | 0.0.28 | 0.0.29 | bump: ranges moved; built from agent `main`, which carries none of the agent session's branch work | `2c38d00` |
| 7 | L5 | `@orkestrel/browser` | 0.0.27 | 0.0.28 | bump: ranges moved; the HAR creator stamp follows the version | `e887416` |
| 7 | L5 | `@orkestrel/probe` | 0.0.22 | 0.0.23 | bump: ranges moved (mcp `^0.0.38`, pool `^0.0.17`, timeout, tool) | `10ffee3` |
| 8 | L6 | `@orkestrel/ollama` | 0.0.21 | 0.0.22 | bump: ranges moved (agent `^0.0.29`, budget, ndjson, tool) | `5e3cdbf` |
| 8 | L6 | `@orkestrel/toolbox` | 0.0.17 | 0.0.18 | bump: agent `^0.0.26` to `^0.0.29` and the fleet's ranges | `93680f3` |

Codes 6 to 8 are 828286, 996788, and 077715; every row was confirmed against the registry. After code 8, `fleet-pins.ts` reads every runtime and peer range in the fleet on its latest release; only development pins trail (probe, scaffold, test, browser), because those packages republished in later layers.

Release-chain notes, layers L5 and L6:
- Agent 0.0.29 takes the version the agent session's plan proposed for its selection release, which therefore publishes as 0.0.30 or later; its branch merges agent `main` (the re-pin and the overwrite) before that release.
- Browser: the self-pin sweep found the HAR creator stamp (`BROWSER_HAR_CREATOR.version`) at 0.0.27; it moved to 0.0.28 with the bump. Windows chain: format, lint, check, build, `npm test` (2,142 source), default-mode distribution (14 passed, 9 host-bound skips), and `test:service` whole (257 passed, 6 skipped).
- Ollama: the first visit missed one case whose excerpt framed `tests/setupStore.test.ts:275` (the journey proof that starts a real page browser, the first browser launch after the visit's install); three whole `npm test` reruns passed (129, 280, 120, 228, 42, 17), and the second visit's `prepublishOnly` passed with the live service suite whole (15 files, 76 passed: the 2B store tasks with thinking and both judge models).

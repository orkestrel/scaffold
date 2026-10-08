# Release record

Each round lists its packages in publish order: the layer, the version it replaced, the version the registry serves, the bump ruling with its evidence, and the `gitHead` the registry records. A row's ruling is the visit's (`.agents/skills/orkestrel-publish/scripts/wave.ts --visit`).

The rounds of 2026-10-04 to 2026-10-06 and the 2026-10-07 re-pin check closed and were swept on 2026-10-08; read them at scaffold `5aff2b245`.

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

| Code | Layer | Package | Prior | Published | Ruling | gitHead |
| --- | --- | --- | --- | --- | --- | --- |
| 9 | L3 | `@orkestrel/scaffold` | 0.0.96 | 0.0.97 | bump: generated workspaces pin browser `^0.0.28` and probe `^0.0.23`; the catalog after layer L6 | `cb1cceed0` |

Code 9 is 602919: the first code for it (384930) was never spent, because `window.ts` found npm's session expired before the upload; `tmp/units/npm-login.ts` minted a login link, the user approved it, and `--whoami` read the session live.

The closing pass (2026-10-08): with scaffold 0.0.97 served, a no-bump visit of every other published checkout (48, in batches of four, probe and ollama alone) moved the development pins on probe, scaffold, test, and browser to their latest, overwrote with scaffold 0.0.97, passed each visit's gates, and pushed; every visit ruled no bump. `fleet-pins.ts` then read every `@orkestrel` range of all 49 published packages on its latest release, and `fleet-sync.ts` read every checkout clean, on `main`, and level with `origin/main`. The wave is closed. Open after it: supervisor stays on its prior ranges by the standing rule; veneer's re-pin belongs to its session; TypeScript 7, Vitest 5, and `@vitest/browser-playwright` 5 wait on the user's ruling (the user, 2026-10-07: not yet).

## 2026-10-08 round: the Haiku 5.5 routing, the Fable floor, and the Cloud session hooks

Scaffold alone, ahead of its layer as a vendored-only release (`release.md` § The scaffold surface): every vendored instruction byte moved. The Claude roster runs `grok`, `analyst`, `astra`, `checker`, `verifier`, `scout`, `distiller`, and `researcher` on Claude Haiku 5.5 at `high`; `builder` keeps Sonnet 5.5 with the closed-shape job; each charter names its engine version; Claude Fable 5.1 orchestrates and is never a subagent (`.claude/AGENTS.md` § Models, the `CLAUDE_CODE_SUBAGENT_MODEL` floor in the vendored settings); the Cursor pin is `grok-4.7-xhigh`. Two Cloud session hooks run before and after `deps.sh` in one command: `scripts/npm.sh` raises the session's npm to the floor the checkout declares, and `scripts/browsers.sh` installs the Chromium builds `playwright-core` pins. The test infrastructure launches the npm it admits (`resolveNpmEntry`), so a distribution proof run by an npm below the floor provisions and uses an admitted one. The branch is `claude/practical-rubin-8pcc53`, published from its tip by the user's instruction; `main` takes it by merge.

| Code | Layer | Package | Prior | Published | Ruling | gitHead |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | L3 (ahead) | `@orkestrel/scaffold` | 0.0.97 | 0.0.98 | bump: dist moved (every vendored charter, the bridge, the settings, the orchestration canon, the transports, `scripts/npm.sh` and `scripts/browsers.sh` added to `EXECUTABLE_PATHS`); ranges same; dev re-pin vite `^8.3.4`; 3 self-pin hits moved with the bump (the generated-manifest snapshots) | `ddaabfb` |

Release-chain notes:
- The first visit stopped at `npm test`: the three generated-manifest snapshots and nine CLI lines carried the prior vite reading (`^8.3.3`); they moved with the re-pin (`6677f4d`), and the second visit passed every gate (`npm test` 356.2 s) and ruled the bump (`compare.ts` exit 3, ranges same).
- The release commit `4e29f68` was prepared and its `prepublishOnly` passed under a local npm 11.21.0 on the path; the user then asked for the npm hook in the same version, so 0.0.98 publishes from the later tip, never having reached the registry.
- The npm hook's review found the cause of the `EBADDEVENGINES` the distribution proof hit: `provisionNpm` admitted the `PATH` npm while `spawnNpm` launched the `npm_execpath` one. Under npm 10.9.4 the packed-adopter case failed before the fix (8.5 s) and passed after (105.0 s); a worktree mutation without the `npm_execpath` line failed again.
- `prepublishOnly` passed on `ddaabfb` under the session's own npm 11.21.0, which `scripts/npm.sh` had raised, with no local npm on the path (750.5 s; release-mode distribution 11 passed with 1 skipped).
- The login link was minted under `script` with a held-open stdin (`tmp/units/npm-login.ts`); the user approved it and `whoami` read `mikesaintsg`.
- **Scaffold 0.0.98: published** 2026-10-08 from `ddaabfb` on the first code. `window.ts --publish` answered `+ @orkestrel/scaffold@0.0.98`, accepted and confirmed; `npm view` reads `gitHead` `ddaabfb3…` and `latest` 0.0.98, and the tarball answers 200.

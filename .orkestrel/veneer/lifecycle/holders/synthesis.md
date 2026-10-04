# Synthesis — parallel holders in `browse` (browser ROADMAP item 14)

Reconciled 2026-10-04 by the Orchestrator from `proposal-analyst.md` (GPT-6 Astra, objective lane) and `proposal-planner.md` (Opus 5.5, subjective lane), both blind to each other over `design-brief.md`, with `map.md` and `clients.md` as inputs. Heads: browser `3924fbb`, pool `5a3a631`, mcp `50afe56`, probe `dee8845`. Revised after the Opus attack in `attack.md` (verdict FAIL on the first draft); each repair below adopts the attack's prescription.

## The user's rulings (2026-10-04)

- **Q1: a server-minted handle.** An `acquire` tool returns an opaque holder id and that holder's tool catalog; named work runs through `execute { holder, name, arguments }`; a `tools { holder }` call lists that holder's catalog; `destroy { holder }` ends it. The named browser tools stay the shared browser's path, unchanged. This supersedes ruling 5 (each holder's page tools are reachable through its own catalog and `execute`) and ruling 8's name pattern (the server mints the id). Acquisition waits under the request's signal and the holder's lifetime is the session's, apart from that signal (`proposal-analyst.md:38-42`). An unknown or ended handle is refused and never falls back to the shared browser. `acquire`, `execute`, `tools`, and `destroy` join the reserved names; `execute` is advertised as not read-only.
- **Q2: `destroy`** ends a holder.
- **Q3: a grant resets the restart budget only when the granted browser was created after the last strike** (ruling 1), shipped as pool 0.0.15.
- **Q4: no reserved spare.** Every browser can serve a holder; a holder that loses its browser waits for the refill.

## Where the lanes agree

- **A holder is named in the tool arguments.** MCP carries no caller identity inside a session (`clients.md` facts 9 and 12), and `caller` is consumer-asserted (`mcp/src/core/types.ts:1716-1719`). Item 14 serves subagents that reuse the parent's server, parallel calls in one turn, and a replay beside interactive work, over the shipped stdio entry. Several sessions on a multi-session transport stay out of item 14.
- **Calls that name no holder keep today's behavior** on one shared browser leased at setup (`src/server/types.ts:414-415`): dispatch, mirrored page tools, CRASH notes, onset, owed refill. The shared browser counts against admission and has no end edge before the server's end.
- **An ended holder destroys its browser** with `token.destroy()`, never `release()`: a fresh process, profile, and context, with no reset list to prove. The owed refill warms the replacement (`Pool.ts:476`, `:759`).
- **Admission is counted per holder and refused at once at capacity** with a code naming the holders. A holder being ended still counts until its disposal settles, so the browser count never passes the size.
- **No idle timer.** An abandoned holder keeps its browser until it is ended or the server ends; the capacity refusal names it so the agent can end it.
- **Per-holder state:** lease, pending grant, CRASH notices. **Shared state:** slot loss records, pings, watches, the `isolate` reference counter (`BrowserMCPServer.ts:576`, `:699-700`; a reference copied across holders misses), profiles, sweep, and the one teardown barrier. Every asynchronous continuation verifies its exact holder and token before it attaches a grant, reports a loss, or changes the mirrored tools (`proposal-analyst.md:281`). Each toolset keeps its own replay refusal; replays on different holders run together.
- **A call in flight when its holder is ended answers `BROWSER_SERVER_UNRESOLVED`;** the action is never repeated.
- **The pool's waiter order stays FIFO at `#waiters[0]`;** an aborted waiter leaves and the next proceeds. No recovery priority.
- **No `@orkestrel/mcp` change.** `server/discover` does not await the handshake (`mcp/src/core/MCPServer.ts:464-466`), so the browser-call gate stays.
- **The default size stays 1** until a contention measurement on the target host rules it; `BROWSER_SERVER_RESTARTS` stays 1. At size 1 an `acquire` is always refused, and the named tools always work.

## Orchestrator rulings where the lanes differ

1. **The strike rule goes to the user (Q3)** with this recommendation: a grant resets the strikes only when the granted record was created after the last strike. Under destroy-on-end each end earns one owed attempt, and a grant of an older record no longer reopens the budget of a browser that always fails. The bound it keeps is "consecutive failures with no grant of a post-strike record between them". Limit, unchanged from today: an idle spare that dies, refills, and dies again spends the floor, because nobody is granted the refill (`tests/src/server/BrowserMCPServer.test.ts:380-404` builds that state). Resetting on a successful create loops on a browser that launches but fails its ping (`BrowserMCPServer.ts:452-460`, `Pool.ts:591`). The analyst's no-reset rule makes `restarts` a bound between owner restarts, and `browse` calls `start()` only at setup (`BrowserMCPServer.ts:218`).
2. **The pool's `cleanup` and spent-floor refusals with a live lease stay as documented** (`Pool.ts:351-378`, `pool/types.ts:131-133`). Under destroy-on-end no lease returns through `release()`, and while a disposal is in flight both branches stay closed (`Pool.ts:354`, `:371`). Probe's stage pools run at `min = max = 1`, where a survivor and a live lease cannot coexist (`Pool.ts:380`, `:408`). The analyst's progress-aware waiting goes into pool `ROADMAP.md` as the change a consumer that releases at a size above 1 would need.
3. **The idle-loss accounting change is not built.** A loss of a released, previously leased record does not strike (`Pool.ts:487-491`); `browse` releases no used record, and probe's respawn-after-use was accepted as demand-bounded (`eager/probe-design.md:419`).
4. **No programmatic holder API or `BrowserPool` extraction in item 14** (planner; minimal public API: a capability arrives with its first real consumer). The holder mechanism lives in `BrowserMCPServer`. The analyst's extraction is the shape to take when shared test browsers (S-16) are ruled in.
5. **Named holders' page tools are not advertised** under Q1(a): a union list would leak one agent's page tools to another. The guide states the limit. Q1(b)'s scoped catalog would lift it.
6. **Cross-holder journey admission is built.** `#idleReplay` checks only its own toolset (`BrowserJourneyToolset.ts:606-608`), and `FileBrowserRunStore.clear` deletes every run directory, including one a replay is still writing (`FileBrowserRunStore.ts:147-152`), so holder B's `forget` breaks holder A's replay at its next capture (`:176-179`). The server admits per journey name: an active replay holds shared access through its run persistence, `forget` takes exclusive access, and a conflict answers the existing locked error. Limit: a second `browse` process on the same root still races (`proposal-analyst.md:126`).
7. **Downloads are proved, then contained if they escape.** The slot's context sets download behavior `default` with no path (`BrowserContext.ts:517-528`, `BrowserMCPServer.ts:576`). The exposure exists today with one browser; holders multiply it. The proof needs a real Chromium.
8. **Holder names follow `BROWSER_JOURNEY_NAME_PATTERN`** (planner); a malformed name answers `BROWSER_TOOLSET_ARGUMENT`. `BROWSE_POOL` and `pool.size` are re-described as the number of browsers, and so the most holders at once.
9. **The capacity code is `BROWSER_SERVER_BUSY`,** its text listing the holder ids and telling the agent to `destroy` one it no longer needs or call the named tools to share the shared browser.
10. **Release order.** The hardening commits on browser main (`3785b94`, `5782c08`, `0413e6f`; `package.json` still reads 0.0.23) publish as browser 0.0.24 after the store campaign, with whatever it keeps. Item 14 ships as pool 0.0.15, then browser 0.0.25.

## Corrections to the inputs

- `map.md` § Distillate: `release()` does not validate; it recycles the record, and validation runs at the next hand-out (`Pool.ts:701-715`, `:344`).
- `clients.md` fact 2 rests on a remote-connector report; whether stdio subagents share the parent's process is unknown (`clients.md` Unknowns). Fact 8 concerns Streamable HTTP, not stdio.
- `map.md` Unknowns: `server/discover` does not await the handshake (`mcp/src/core/MCPServer.ts:464-466`).
- Probe's concurrent proves queue on a stage pool at `min = 1`; they do not hold several tokens of one stage at once (`eager/probe-design.md:167-171`).

## Questions for the user

- **Q1, how a call names its holder.**
  - (a) An optional `browser` argument on every tool with a name the agent chooses, such as `browser: 'checkout'` (planner; recommended). The holder begins at its first call, a parent hands names to subagents in their prompts at no cost, and a call without the argument uses the shared browser. Costs: two agents that choose the same name share cookies and pages without warning; a typo creates a holder (bounded by the size, and the refusal names every holder); named holders' page tools are not advertised; a page tool with its own `browser` parameter stays reachable only on the shared browser.
  - (b) A server-minted handle (analyst). An `acquire` tool returns an opaque id, and named work runs through an `execute { holder, name, arguments }` envelope, with a scoped `tools` catalog per holder. Gains: no accidental sharing or typo holders, page tools reachable per holder, and cancelling an acquisition kept apart from the holder's lifetime. Costs: a round trip per holder before a parent can hand it to a subagent, and agents fill a generic envelope without per-tool schemas.
- **Q2, the verb that ends a named browser.**
  - (a) `destroy`, the fixed lifecycle verb (`scaffold/.claude/rules/names.md` § Fixed lifecycle vocabulary), which also says what happens: pages, cookies, and storage are gone (recommended). In this package `close` already means something else: shutting a remote browser down even when the instance does not own it (`browser/src/server/types.ts:308-316`).
  - (b) `close`, the planner's recommendation, the word an agent reaches for.
- **Q3, what resets the restart budget.** (a) A grant of a browser created after the last failure (recommended; ruling 1). (b) Only an owner restart, as the analyst proposed. (c) Every grant, as today, accepting that holder churn reopens a failing browser's budget.
- **Q4, a reserved failover spare.** (a) None: every browser in the pool can be a holder, and a holder that loses its browser waits for the refill (planner; recommended, matching the 2026-10-04 ruling that a spare becomes capacity). (b) Keep one browser unleasable as a spare while other holders exist, so failover stays instant and a size of 3 serves two holders.

## Units, in commit order (after the live-model campaign ends)

| Unit | Owned files | Route | Acceptance |
| --- | --- | --- | --- |
| H1 pool strike rule | pool `src/core/Pool.ts`, `src/core/types.ts`, `tests/src/core/Pool.test.ts`, `guides/pool.md`, guide proofs | Astra; one Opus review pass (a public contract remark changes) | Red: a refill that always fails relaunches on every grant of an older healthy record; green after; the idle-spare case reaches the spent floor; `Pool.test.ts:855` (a grant of a fresh record resets) stays green; the leased-loss credit unchanged; `npm run test:src`, `test:guides`; browse's `BrowserMCPServer.test.ts:380-404` and the U6 and U7 failover cases rerun green against the linked pool |
| H2 holders in `browse` | browser `src/server/types.ts`, `constants.ts`, `helpers.ts`, `BrowserMCPServer.ts`, mirrored `tests/src/server/*` | Astra writer; one Opus review pass on the concurrency seam | `acquire`, `execute`, `tools`, and `destroy` per the user's Q1 ruling; per-holder admission, an ending holder counted until disposal settles, `BROWSER_SERVER_BUSY` text listing the holder ids; each holder's catalog carries its page tools without touching the shared browser's mirrored list; an unknown or ended handle refused; `destroy` idempotent; per-holder notices; a cancelled `acquire` leaving no admitted holder and destroying an undeliverable grant; a cross-holder reference refused; continuation checks on the exact holder and token; unnamed behavior unchanged |
| H3 journey admission and downloads | browser `src/server/BrowserMCPServer.ts` and the kind files the admission needs, `tests/src/server/*`, `tests/service/browse.test.ts` for the download proof | Astra; one Opus review pass (concurrency) | `forget` refused while another holder's replay persists that name; replays of one name coexist; the download location proved with a real Chromium, and contained under the profile if it escaped |
| H4 real-Chromium proofs | browser `tests/service/browse.test.ts`, `tests/setupService.ts` | Astra | A held fixture request on one holder while another holder completes an action (red when the server serializes holders); isolation of cookies, storage, tabs, and references; loss on one holder only; capacity and recovery with every browser leased; the destroy contract; parallel replay; teardown with several leases live, including an injected cleanup refusal reported; each red with its mechanism removed; U6 to U8 unchanged |
| H5 guide and roadmap | browser `guides/browser.md`, `ROADMAP.md`, `tests/distribution.test.ts` vocabulary; pool `ROADMAP.md` line for ruling 2 | Opus | `npm run test:guides`; an executed assertion behind the destroy-on-end sentence; the Codex approval prompt for the end tool named |
| H6 contention measurement | browser `tmp/probes/`; scaffold `holders/readings.md` | Astra instrument, Orchestrator runs | The plan below; the user rules the default size |

Gates: `verifier` on pool and browser tree-wide once; one `orkestrel-falsify` round on the integrated result.

## Measurement plan (H6)

- Workloads, the same logical body of work at sizes 1, 2, and 3: named interactive holders driving the heavy local page (navigate, look, read, click, with realistic pauses); an interactive holder beside a looping replay; recording beside replay; concurrent replays; holder turnover; a loss with every browser leased while the other holders keep calling.
- Host: quiet controls, then a representative heavy load (veneer `npm run test:journey`, as U12), with every background process logged; the discovered Edge beside an available lighter Chromium build.
- Readings: acquisition latency apart from execution latency; per-holder distributions and tails; completed work, refusals, cancellations, and replay failures; refused work at the smaller sizes counted with the time to finish it serially; cleanup duration; loss-to-success with every browser leased; process-tree memory and CPU with an idle plateau measured until it settles; whether the host's other load still passes.
- Client delivery: with the built server configured in a client session, record the server pid and per-call timestamps across two subagents that name different browsers, to settle whether the client shares one process and sends their calls at once (`clients.md` Unknowns). Item 14's gain depends on it; the design is correct either way.
- Rule: raise the default only where several holders finish the body of work in less wall time than one holder serially, with the other load still passing and an idle browser's cost accepted by the user; keep 1 when the gain is absent or inconclusive. Size the samples and thresholds from the workload's variability before the run (`scaffold/.claude/rules/quality.md` § Performance).

## Recorded limits

- An abandoned named browser costs one warm browser (1.22 GB to 1.78 GB summed working set on Edge, shared pages counted per process, `eager/readings.md:46`) until it is ended or the server ends.
- `tools/list` grows by one optional parameter on every tool and one tool; unmeasured.
- Codex asks approval for `execute` and `destroy`, because neither is read-only (`eager/readings.md:13`); under Codex every named-holder call can prompt, depending on its approval mode.
- A second `browse` process on the same root can still race a replay against `forget`.
- POSIX failover rows stay limits for the Linux run.

# Proposal — planner lane (Opus 5.5), parallel holders

Read-only planner agent, 2026-10-04, over `holders/design-brief.md`; 542 s. Subjective lane: API shape, names, consumer ergonomics, guide voice. Citations checked by the planner at browser `3924fbb`, pool `5a3a631`, mcp `50afe56`.

## 1. Who a holder is

A holder is a name a call gives in an optional `browser` tool argument. A call without it uses the shared browser, today's single lease, with today's behaviour. Each named holder leases its own browser from the pool.

Served: subagents that reuse the parent's server (`clients.md` facts 1, 2, 4; no identity inside a connection, facts 9 and 12, so the only identity is one the model writes into the arguments); parallel tool calls with different names (same or no name queue on one toolset, `BrowserToolset.ts:1349-1356`); a replay beside interactive work (`replay { journey, browser: 'smoke' }`; each toolset still refuses its own second replay, `BrowserJourneyToolset.ts:606-613`); library consumers and service tests through the same argument over stdio (`tests/service/browse.test.ts:173`), with no programmatic holder API.

Left out: several sessions on a multi-session transport (`browse` is stdio only, `src/bin/main.ts:35-43`, `BrowserMCPServer.ts:186-189`).

The agent chooses the name, following the journey precedent (`core/constants.ts:885-886`): a parent hands a name to a subagent without a tool call, and D7's record of who holds each browser carries a meaningful name. Names reuse `BROWSER_JOURNEY_NAME_PATTERN`.

## 2. Holder lifecycle

- Begins at the first call that gives an unheld name; later calls address it by that name.
- Ends with a server-owned `close { browser }` call (`browser` required), or at the server's end (`BrowserMCPServer.ts:209-213`). After `close` the name is free again, as `forget` frees a journey name (`core/constants.ts:860`). Closing an unheld name answers success: "No browser is named `checkout`; nothing was closed."
- The shared browser begins at setup, exactly as today (`:209-227`), never ends before the server, has no name, and `close` cannot address it; no sentinel name (`AGENTS.md:57`).
- An abandoned holder costs one warm browser until `close` or the server's end (summed working set 1.22 GB growing to 1.78 GB over 2 minutes, median near 10% of one core, `eager/readings.md:46`). No timer or idle sweep (D10, `AGENTS.md:68`): the `BROWSER_SERVER_BUSY` refusal lists every holder by name, and the agent closes the one it abandoned.
- A session that never names a holder sees no change: dispatch path, mirrored page tools, CRASH notes, onset; U6, U7, and U8 pass unmodified.

## 3. Lease per holder

An ended holder destroys its browser with `token.destroy()`; the owed refill warms the replacement. `PoolToken.value` is fixed for the record's life (`pool/src/core/types.ts:50-52`) and `BrowserSlot` is readonly (`server/types.ts:363-369`), so reset-then-release would mutate a readonly slot or split the slot into a pooled process and a per-lease context built at grant, which moves context, page, and toolset creation onto the call path, against D7. Destroy is clean by construction and reuses the loss path (`BrowserMCPServer.ts:462-472`). Cost: one refill per `close`, 1.19 s loaded at size 1 and 2.26 s under calls (`eager/readings.md:30`, `:38`). A destroyed leased record never strikes (`Pool.ts:487-491`) and receives its owed attempt (`:476`, `:759`).

## 4. Capacity and waiting

- Admission is counted at the holder layer; holders, the shared one included, never exceed `pool.size`.
- An unheld name at capacity is refused at once with `BROWSER_SERVER_BUSY`, listing the holders: `BROWSER_SERVER_BUSY: every browser is in use by the shared browser and checkout; call close with a name you no longer need, or omit browser to share one.` At size 1 the text adds that `BROWSE_POOL` sets the number. Waiting would wait on another agent's `close` and end at the client's tool timeout with no cause.
- Below capacity, a call waits under its own signal for a warming browser, bounded by the refill and `restarts`.
- FIFO through the pool's waiters (`Pool.ts:188-198`, `:643-675`); holder admission keeps pool waiters at or under free capacity, so a waiter only waits for a refill, never for another holder's release.
- With every browser leased, a holder whose browser dies has its next call wait for the owed refill, then answer with the `BROWSER_SERVER_CRASH:` note (size-1 reading 1.92 s, `readings.md:33`).

## 5. The pool under several tokens

- The `cleanup` refusal with a live lease (`Pool.ts:351-366`, `pool/types.ts:131-133`) and the waiter order: `browse` policy, no pool change, because no waiter waits for another holder's release under holder admission.
- The strike reset on every grant (`Pool.ts:671`): lean to pool 0.0.15, where a grant resets the strikes only for a record created after the last strike (internal rule change, no API change, with its `types.ts:78-80` remark, tests, and guide line). Resetting on a successful create instead would loop on a browser that launches but fails its ping (`Pool.ts:591`).
- Probe item 1 is bound only by the strike ruling: it holds one token per stage at `min = max = 1` and concurrent proves wait as pool waiters (`eager/probe-design.md:167-171`).

## 6. State that is one per server

- Mirrored page tools: the shared browser only, as today (`BrowserMCPServer.ts:396-400`, `:704-732`). A union would leak one agent's page tools to another; named holders' page tools are not advertised, stated as a limit.
- `#notice` and the CRASH note: per holder.
- `#references`: shared, unchanged, so a reference copied from another holder's view is refused.
- Journey and run stores: one pair per slot, unchanged; two holders saving one name meet the per-name lock (`BROWSER_JOURNEY_LOCKED`, `FileBrowserStore.ts:213-216`, `:243`); two replays of one name get separate run folders.
- Replay refusal: per toolset, unchanged.

## 7. Placement and names

- All of it inside `BrowserMCPServer` in `src/server`: no new option, no new `BROWSE_*` variable, no change to `main.ts`. `BROWSE_POOL` and `pool.size` are re-described as the number of browsers, and so the most holders at once. `BrowserMCPServerInterface` gains nothing.
- Every vocabulary tool advertises an optional `browser` string; the server strips it before forwarding (the toolset refuses unadvertised keys, `BrowserToolset.ts:599-608`) and never passes it as `caller` (the replay hold token inside the toolset, `:569-576`, `:663-666`). `close` joins the reserved names (`:170-171`).
- No `@orkestrel/mcp` change.

```ts
/** Holds one holder of a browse server: the token it leases, the grant it awaits, and the lost slot its next outcome reports. */
export interface BrowserHolder {
	readonly token: PoolToken<BrowserSlot> | undefined
	readonly granting: Promise<PoolToken<BrowserSlot>> | undefined
	readonly loss: BrowserSlot | undefined
}
```

The server keeps `#holders: Map<string | undefined, BrowserHolder>`, the `undefined` key being the shared browser, replacing `#lease`, `#granting`, and `#notice`. Constants: `BROWSER_SERVER_BUSY`, `BROWSER_SERVER_PARAMETER` (`'A name for a browser of your own, such as checkout; calls without it share one.'`), `BROWSER_SERVER_CLOSE_COPY` (`'Closes the browser with that name; its pages and cookies are gone, and the name is free again.'`, required `['browser']`); helper `buildBrowserServerDefinition`. The copy bounds hold (`tests/src/core/BrowserToolset.test.ts:1047`, `:1060-1061`; `core/constants.ts:534-535`).

Guide: one section "Run work in parallel"; the page-tool limit; `BROWSER_SERVER_BUSY` among the codes; the sentence at `guides/browser.md:3580` rewritten; `close` in the `tools/list` fence (`:3629`); Server tables gain the type, constants, and helper; the class TSDoc vocabulary (`BrowserMCPServer.ts:67-69`) gains `close`.

## 8. Measurement (shape only)

Workloads: named interactive holders on the heavy local page (navigate, look, read, click); one replay holder looping a recorded journey; the shared browser serving interactive calls. Host load: veneer's `npm run test:journey`, as U12 (`readings.md:24`). Readings: per-holder call latency from 1 through the size; summed working set and CPU per browser tree, with an idle plateau past 2 minutes; failover with every browser leased; whether the host load still passes. Instrument: a TypeScript script under browser `tmp/` driving the built binary over stdio. Decision rule: raise the default only where several holders finish a fixed body of work in less wall time than one holder serially, with the host's other load still passing and an unused browser's idle cost accepted by the user.

## 9. Proof (real Chromium, `tests/service/browse.test.ts`)

Isolation (cookie and `localStorage` on one origin invisible to the other; `tabs` and references separate); a loss on one holder (the other hears nothing; the lost one's next call opens with the CRASH note and its URL); capacity (`BROWSER_SERVER_BUSY` naming both, then served after `close`); the destroy contract (pid exits, profile gone, successor at `about:blank` with a different pid); parallel replay beside the shared browser; teardown with several leases live; U6 to U8 unchanged; each case red with its mechanism removed.

## 10. Carry-over

Probe item 1: destroy-on-end parallels `token.destroy()` on deadline; probe re-runs its pool cases if the strike rule changes. Shared test browsers (S-16): a test file could run one server at size N and give each test a named browser; that reopens only on the launch-share reading.

## Holder state machine (derived, never stored)

- unheld → granting when a call names it below the size; `BROWSER_SERVER_BUSY` at the size.
- granting → holding on commit; on a first-grant refusal the entry is removed and the call answers `UNAVAILABLE`; on a later refusal → lost, answering the note and then `UNAVAILABLE`.
- holding → lost on a loss (`loss` set, token cleared, `token.destroy()`).
- lost → granting on the next call; the holder keeps its place.
- Any state → unheld on `close` (in-flight calls answer `UNRESOLVED`); server `destroy()` removes every holder. The shared browser begins in granting at setup and has no `close` edge.

## Failure table

| Failure | Signal | Action | Holder X sees | Others see |
| --- | --- | --- | --- | --- |
| X's browser exits or disconnects while idle | slot watch (`:474-491`) | `#lose`, `token.destroy()`, owed refill | next call: CRASH note, fresh browser | nothing |
| X's renderer crashes | page `crash` (`:502-507`) | same | same | nothing |
| X's browser dies during X's call | failed call plus shared ping (`:315-333`) | same | that call `UNRESOLVED`; next CRASH | nothing |
| An idle spare is lost | watch | dispose and refill (a strike if never leased) | nothing | nothing |
| Every browser leased and X's dies | watch | owed refill | next call waits under its signal, then CRASH | unaffected |
| X's refill spends the bound | pool `create` | `EXHAUSTED` line | CRASH note, then `UNAVAILABLE` | keep serving |
| A closed holder's teardown fails | destroy rejects → survivor | `TEARDOWN` line; survivor counts | `close` answers closed | a later unheld name answers `UNAVAILABLE` (`cleanup`) |
| An unheld name at capacity | holder count | refuse | `BROWSER_SERVER_BUSY` listing holders | nothing |
| A malformed name | journey pattern | refuse | `BROWSER_TOOLSET_ARGUMENT` | nothing |
| `close` during X's call | `close` | destroy | in-flight `UNRESOLVED`, "browser X was closed" | nothing |
| X's call cancelled | call signal | only the wait ends; the ping keeps its deadline | an abort | nothing |
| A second action during X's replay | toolset hold | refuse | `BROWSER_TOOLSET_BUSY` | unaffected |
| Two holders save one journey name | per-name lock | refuse the second | `BROWSER_JOURNEY_LOCKED` | nothing |
| End of input or a signal | `#end` | destroy every holder | in-flight `BROWSER_TOOLSET_ENDED` | the same |

## Alternatives

- Server-minted handles through an `open` tool: a round trip and a tool definition, a call before a parent can hand a name over, and `open` reads as "open a web address" beside `navigate`; typos are bounded by the size ceiling.
- One session per holder: serves nobody today (stdio only; subagents share the parent's connection).
- A replay-only second holder: serves one consumer and changes replay's meaning (a replay leaves the session on the journey's last page, `BrowserJourneyToolset.ts:456`).
- Release with a reset: the slot and token are immutable and the saving is unmeasured against a 1 to 2 s refill.
- Waiting at capacity: an agent's wait has no bound but the client's timeout and no visible cause.
- Mirroring the union of page tools: leaks one holder's page into every agent's tool list.

## Refusals

An idle timer (`AGENTS.md:68`; D10); a reserved name `default` (`AGENTS.md:57`); a stored `status` label (`AGENTS.md:58`); carrying the holder in `caller` (`mcp/src/core/types.ts:1716`, and it would break hold admission); a programmatic holder API or a `pool.holders` option (`AGENTS.md:65`; D6); `@orkestrel/supervisor`.

## Units (planner's order)

1. Types and constants (browser): `src/server/types.ts`, `constants.ts`, `helpers.ts`, mirrored tests.
2. Conditional on the strike ruling: pool 0.0.15 strike rule, red then green, U6 and U7 rerun; published before the browser release.
3. Server routing (browser): `BrowserMCPServer.ts` and its test; one reviewer pass on the concurrency seam.
4. Service proofs: `tests/service/browse.test.ts`, red evidence per mechanism.
5. Guide and roadmap: `guides/browser.md`, `ROADMAP.md` item 14, `tests/distribution.test.ts` vocabulary.
6. Contention measurement, then the user rules the default size.
7. Release: pool 0.0.15 first, then browser.

## Tensions for the user

T1 the wire word (`browser` recommended; `holder`, `window`, `session`); T2 the end verb (`close` recommended; `destroy`, `quit`); T3 agent-chosen names (recommended) or minted through `open`; T4 refuse at capacity (recommended) or wait; T5 destroy on end (recommended) or release after a context swap; T6 named holders' page tools not advertised (recommended) or a union; T7 no reserved failover spare (recommended) or one unleasable browser; T8 the strike reset (pool patch, the planner's lean); T9 a call in flight when its holder closes answers `UNRESOLVED` (recommended) or `close` is refused while calls are in flight.

## Risks

Agents may forget the argument (falls back to the shared browser, no regression); an agent may invent a name per call (meets `BROWSER_SERVER_BUSY` quickly; the text recovers it); abandoned holders hold 1.2 to 1.8 GB each on Edge; `tools/list` grows by one parameter on 17 tools plus one tool (unmeasured); claude-code issue 83457 cross-delivers concurrent subagent responses on a remote connector, unknown for stdio, and named holders raise that concurrency; Codex asks approval for `close` because it is not read-only (`readings.md:13`).

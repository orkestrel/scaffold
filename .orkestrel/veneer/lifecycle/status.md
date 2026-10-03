# Browser lifecycle: status

The user asked (2026-10-03) whether journeys, tests, and `browse` start a browser per test or file or reuse one with cleanup, whether several browsers stay alive to run work in parallel, and whether a browser stays warm as `probe` keeps its workers warm.

## Findings from the maps

- `veneer-tests-map.md`: each `vitest run` launches one Chromium per browser project and reuses it for every file in that project, one tester iframe per file on one page. A full `npm test` is 15 Vitest processes chained with `&&` and 17 launches, each with its own Vite server. The four journey variants run at once, four browsers, the only parallelism; every other browser project runs its files one after another (`fileParallelism: false`) except `setup:browser`. Nothing stays warm between scripts. `configs/browsers.ts` already connects to `PLAYWRIGHT_WS_ENDPOINT` when set, and no script sets it.
- `browser-browse-map.md`: the `browse` server launches Chromium on the first tool call and keeps one browser and one isolated context for the server's life; `replay` reuses them. It has no idle shutdown and no recovery after a successful launch, so a crashed browser leaves later calls on a dead page. `test:service` performs about 24 launches, 17 of them per test in `tests/service/browser.test.ts`. `src:browser` and `setup:browser` each launch 2 more in a global setup. `probe` starts its workers on the first `prove`, not at server start, and keeps them resident.

## Decisions

- 2026-10-03, the user: the `browse` server launches Chromium at server start, the highest point upstream, never inside a tool call, and recovers a crashed browser. Both come first. Then a warm spare browser that starts outside every tool call, so no call pays a startup; its value is measured.
- 2026-10-03, the user: `@orkestrel/probe` moves the same way, from a lazy start on the first `prove` to server start, so a broken tool shows at the onset. Recorded as probe `ROADMAP.md` item 1 (probe `0690762`).
- 2026-10-03, the user: the browsers form a small, simple pool that balances work: two expected, three at most, because the target hosts do not take heavy load. Every browser is launched when the owner decides, tracked and known, its liveness tracked at all times, assigned by the pool through recorded leases, and warm before work arrives. Setup has one place and runs as early and eagerly as possible; teardown has one place, runs as late as it needs to, and leaves nothing behind (design brief D6 to D8).
- 2026-10-03, the user: tap `PLAYWRIGHT_WS_ENDPOINT` for warm test browsers if it works as expected. The provider calls Playwright's `chromium.connect` (`@vitest/browser-playwright/dist/index.js:920`), Playwright's own protocol, so the endpoint comes from a Playwright browser server, not from a raw CDP endpoint.

## Findings from the probes

- `ws-endpoint-probe.md` (2026-10-03, loaded host, preliminary): `PLAYWRIGHT_WS_ENDPOINT` with a `chromium.launchServer` browser works as expected. A connected run starts no Chromium, passes the same counts (`test:src:vue` 1 of 1, `test:src:browser` 787 of 787), and leaves no context or page behind; a second run starts clean. A stopped endpoint fails at connect in milliseconds; a killed browser fails the run promptly. `run-server` launches a browser per connection, so only `launchServer` keeps one warm. One shared browser for the four journey projects failed J8 on `light-390` once (`Named region "Uploads" is not visible`, cause unresolved); one server per project passed all 60. A headless-shell launch took 80.5 ms, and provider setup to a ready context fell from a 99 ms median cold to 26.5 ms connected, so a warm browser shows no end-to-end gain for these scripts: the cost of a run sits in Vite, builds, and test bodies, not in the launch.
- The same probe found that `@orkestrel/browser`'s CDP attach to a browser another client uses files the pages it discovers under a local default context without their `browserContextId` (`dist/src/server/index.js:2289`) and does not adopt a page the other client opens later.

## The ruled design

`eager/synthesis.md` (Opus, from three proposals and a three-lens judge panel, 2026-10-03): a pool private to `BrowserMCPServer`, 1 to 3 fully warm browsers, one `handshake` hook in `@orkestrel/mcp` 0.0.36, liveness from events plus a `ping` at hand-out and before every call, a successor only after a confirmed release, one setup place and one teardown place, and a start sweep that reclaims a killed server's browsers; `@orkestrel/pool` is not used. The objective attack (`eager/attack.md`) failed it on 16 required, implementation-level findings, which a revision pass repairs. The user ruled the open decisions (design brief D10): failover now and parallel holders later, a `ping` at hand-out with no timer, the handshake on the first warm browser, and a default size of 1 until measured.

## Open decision: where the resource lifecycle lives

The user (2026-10-03) agrees `@orkestrel/pool` has a gap for this case (no eager warm floor, no eviction of a resource that dies, no named records, no holder) and asks whether it belongs in `@orkestrel/pool`, in a new package (for example `@orkestrel/lease` or `@orkestrel/resource`), or inside `@orkestrel/browser` now with a roadmap item for later, depending on whether it is a full build-out and whether it is truly needed. The `resource-consumers` survey counts the real consumers across the fleet and measures the gap; a build-now against defer argument and a judge follow, then the user rules.

The user then shared reliability research from another session (`reliability-assessment.md`): an operation lifecycle contract (an action's identity, acceptance, authoritative outcome, execution owner, and recovery path), with the rule to extract a public capability only where a consumer demonstrates the need. The user (2026-10-03): a resource or lease package fits the ecosystem and answers what is needed; the open question is only whether it is needed now. Two layers meet here and stay distinct: the resource lifecycle (keep a worker alive, know its liveness, replace it, tear it down) and the operation lifecycle (a tool call a crash interrupts has an unresolved outcome, not a failed one, and one owner decides whether to repeat it).

## Running

- `browse-eager-map` (Grok, `browser-wt-browse/tmp/cursor/`): the MCP `initialize` hooks, what a recovery rebuilds, crash signals, reusable `@orkestrel/*` primitives, profiles and port 9222, client startup timeouts, and Playwright's browser server.
- `ws-endpoint-probe` (Astra, veneer `tmp/codex/`): attach without a launch, cleanup per run, the launch-options header, the journey's parallel projects on one server, failure at the onset, one browser for both protocols, and preliminary cost.

## Open

- The journey proofs repair (`showcase-proofs-6`, veneer worktree `veneer-wt-page`) measures journey wall, per-project, and per-test time before and after replacing fixed observation windows with windows derived from the engine's timing.
- Measure on a quiet host: a cold Chromium launch, a context, and a page; the launch and Vite startup share of each script; then rule on shared browsers across service tests, the `browse` crash recovery, a warm start for `browse`, and file parallelism for the journey and `src:browser`, each with its measured saving.

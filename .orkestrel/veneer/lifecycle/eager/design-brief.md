# Design brief — an eager, recovering `browse` server with a warm spare

## Inputs

- The code: `C:\Users\mikes\WebstormProjects\browser-wt-browse` (`@orkestrel/browser`, branch `ccr-d15a48b1-yyyll6`). `src/server/`, `src/bin/`, and `src/server/types.ts` are stable; another writer is editing `src/core/BrowserToolset.ts`, `src/core/constants.ts`, `src/core/helpers.ts`, and `src/core/BrowserReading.ts`, so read their lifecycle parts and ignore reading changes.
- `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\browser-browse-map.md`: how the library and the server launch, reuse, and release a browser today.
- `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\eager\map.md`: the MCP `initialize` hooks, what a recovery rebuilds, crash signals, reusable `@orkestrel/*` primitives, profiles and port 9222, client startup timeouts, and Playwright's browser server.
- That checkout's `AGENTS.md` and `.claude/rules/*`: single-word public names, types first in `*/types.ts`, mechanism and not product policy, no polling, no compatibility shims, minimal public API.

## The user's decisions (2026-10-03)

- D1. `browse` launches Chromium at server start, the highest point upstream, never inside a tool call.
- D2. `browse` recovers a crashed browser.
- D3. After D1 and D2, a warm spare browser that starts outside every tool call, so no call pays a startup. Its value is measured before it is kept.
- D4. A broken tool shows at the onset, before a session depends on it.
- D5. Performance changes are measured under a realistic heavy load, with no micro optimization, and no figure is fixed in advance; the case decides each number.
- D6. The browsers form a small, simple pool that balances work across them: the user expects two, three at most, because the hosts these tools run on do not take heavy load well. The pool is no scheduler for many browsers and never grows on demand past its configured size.
- D7. Every browser in the pool is launched when the owner decides, never by a caller's demand; it is tracked and known (its process, endpoint, profile, and state); the pool tracks every browser's liveness at all times, so it knows which browsers are alive and answering before it hands one work; setup and teardown happen at points the owner chooses; the pool decides which work goes to which browser; and each browser is warm before work that needs it arrives.

## Settle each question, with a ruling and the reasoning

1. **Where the launch starts and what the handshake does meanwhile.** The point in `src/bin/main.ts`, the server constructor, or `start()`; whether `initialize` answers at once or waits for the launch; how a failed launch shows at the onset (an `initialize` error, a process exit, a coded error on every call with a relaunch, a logging notification). Weigh each client's startup timeout from the map.
2. **Crash detection.** Owned-process exit, a dropped socket, a renderer crash, and a browser that stops answering, each from an event, never a poll.
3. **Recovery.** What is relaunched and rebuilt (browser, context, page, toolset, journey toolset, retained readings, tabs); what is lost and how the agent learns it (the in-flight call's coded error, the next receipt); whether the last address is restored; how a crash loop ends, with the bound reasoned from the case; profile cleanup, including profiles a killed server left behind.
4. **The pool.** The shape that meets D6 and D7: each browser's states (for example warming, ready, busy, recovering, retired); liveness, meaning how the pool knows each browser is alive and answering, from events (process exit, dropped socket, crash) and from command deadlines, and whether a browser that is alive but stops answering can be detected without a periodic poll (`AGENTS.md` § Design laws, no polling architecture), with the reasoning if a check must run on a schedule; what happens to work in flight on a browser that dies; and the balancing rule that decides which browser serves which work. A second process or a second context, and why; what a spare serves (instant failover, isolated or parallel replays, anything else the code supports); when each browser starts and how a promoted or crashed one is replaced; its idle cost and how to measure it. Keep the pool small and simple: no feature beyond what D6 and D7 ask.
5. **Placement.** What belongs in the library (a supervised browser or a pool in `src/server`, reusable by tests) and what in the `browse` server and its `BROWSE_*` variables; the public type changes in `src/server/types.ts` with single-word names; how a host turns the eager start off, if it can.
6. **Proof.** How each claim is proved with a real Chromium (killing the process to cause a crash) and no mocks, and which service tests change; whether `tests/service/browser.test.ts`'s launch per test moves to a shared browser in this change or later.
7. **Tests outside `browse`.** Whether the same supervised browser could serve a warm test browser through `PLAYWRIGHT_WS_ENDPOINT` (a Playwright browser server) or a CDP endpoint, as far as the map shows; the `ws-endpoint-probe` unit settles the facts.
8. **Probe.** Which parts of the shape carry over to `@orkestrel/probe`'s server start (probe `ROADMAP.md` item 1); note them, design nothing there.

## Output

One proposal: the rulings on 1 to 8; the type sketch in `src/server/types.ts` terms; the state machine of the supervised browser; a failure table (failure, signal, action, what the caller sees); the measurement plan for D3; bounded units in commit order with each unit's acceptance proofs; and every alternative you rejected with its reason.

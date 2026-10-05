# Design brief — browse holders as isolated contexts in shared browsers

Read-only. Change no file in any checkout. Cite every fact as `file:line`.

## Inputs

- The code: `C:\Users\mikes\WebstormProjects\browser` at `main` (0.0.24 plus the concurrent-replay fix `e931740`): `src/server/BrowserMCPServer.ts` (holders, admission, `#warm`, loss, journey admission, downloads), `src/server/Browser.ts` (`isolate` creates a CDP browser context, `:210-227`), `src/core/BrowserContext.ts` (disposal, `:379`), `src/server/types.ts`, `src/server/stores/*`, `tests/service/browse.test.ts`; `C:\Users\mikes\WebstormProjects\pool` at 0.0.15 (`src/core/Pool.ts`).
- The records under `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\holders\`: `synthesis.md` (the user's rulings on the holder tools, the agreements), `readings.md` (H6: size 2 cuts the body 15 to 18%, size 3 adds nothing under load, each extra browser about 2 GB summed working set), `review-h2.md`, `status.md`; and `eager/design-brief.md` (D5 to D13).
- The contexts probe: browser `tmp/probes/contexts/report.md` and `tmp/probes/contexts/run-swgN81/record.json`. At 3 lanes, one browser with three isolated contexts against three browsers: 16.0 s against 19.3 s wall, 1.6 GB against 4.5 GB peak private memory, 31 against 92 browser CPU-seconds, 21 against 60 processes, a lane's clean slate 0.24 to 0.37 s against a 1.5 to 1.8 s relaunch. Tabs in one context: a hidden tab ticked 4 times against 127 and its click timed out, because the scroll settle waits for animation frames; tab replacement kept cookies and storage. One sample per cell; isolation and blast radius were not reached.

## The user's rulings

- 2026-10-05: open this design round on holders as isolated contexts inside shared browsers, a hybrid (a small pool of browsers for failover, each hosting several holder contexts) included; the default `BROWSE_POOL` stays 1 until contexts land, then it is ruled again from measurement.
- Standing: the holder tools' wire contract (`acquire`, `execute`, `tools`, `destroy`, a server-minted handle) stays; `destroy` gives a clean slate; failover and the eager start stand (D7, D10); the pool never grows on demand past its configured bounds (D6); `@orkestrel/pool` and `@orkestrel/mcp` change where it improves them; never `@orkestrel/supervisor`; measured performance only (`scaffold/.claude/rules/quality.md` § Performance); tests pin claims at the least cost.
- The user's question that opened this: use each browser to its full potential.

## Settle each question, with a ruling and the reasoning

1. **The unit and its bounds.** Browsers in the pool, holders as contexts; the bound on browsers and the bound on holders per browser (or in total); the names (single words) and the `BROWSE_*` variables; what `BROWSE_POOL` means afterward.
2. **Assignment.** Which browser hosts a new holder (fewest holders, spread for blast radius, or another rule), and whether the shared browser's page is itself a context on one browser.
3. **A browser crash.** Every holder on it loses its context: what each holder's next call sees, where it recovers (another live browser, or the refill), the strike accounting, and how failover still works at size 1.
4. **Turnover.** `destroy` as context disposal: what survives a disposed context in Chromium (cookies, storage, cache, service workers, permissions, downloads), with the per-context download path the 0.0.24 per-profile downloads become; when a browser itself is recycled.
5. **Liveness.** Per-context and per-page loss (a renderer crash) against a browser loss; the watches and pings each needs, with no polling.
6. **Isolation.** What a CDP browser context isolates and does not, verified from the protocol and from a real reading.
7. **The pool's shape.** `Pool<BrowserSlot>` with browse managing contexts, a pool of contexts, or another split; what `@orkestrel/pool` gains, if anything.
8. **Throttling and tabs.** Whether each holder context's page stays visible and focused in headless and headed modes; whether multi-tab work within one holder belongs here or later, given the hidden-tab throttling and the animation-frame settle.
9. **Measurement.** Repeated runs with spread for N holders over B browsers, contexts against browsers, with the H6 instrument extended; isolation and blast-radius readings; the rule that sets the defaults.
10. **Proof, units, and release.** Real-Chromium proofs; bounded units in commit order with owned files and acceptance; the release order.

## Output

One proposal: rulings on 1 to 10 with evidence and reasoning; the type sketch; the state machine for a browser and for a holder context; a failure table; the measurement plan; units with acceptance; rejected alternatives; and the questions for the user with options and a recommendation.

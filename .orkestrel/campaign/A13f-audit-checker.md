<!-- A13f — checker (Sonnet, native), mechanical lane over U13h-diff.patch.txt, U13h-page.test.ts.txt, and the U13h report, with the chain walk. Retained from the completion notification, 2026-09-15 (261 s, 57 tool uses). -->

# Audit A13f — MECHANICAL lane (checker, Sonnet, native)

1. **CONFIRMED** — `node_modules/@orkestrel/browser/dist/src/server/index.js:1046,1052,1053,1235,1295` race `#raceAbort` at discovery, port-free check, launch, and both `client.connect()` sites; `:1398`'s `client.send("Target.getTargets")` inside `#syncContexts` carries no `#raceAbort` call. `guides/ollama.md:124` and `tests/setupServer.ts` remarks now state exactly that scope, matching the dependency read.

2. **CONFIRMED** — `SCHEDULE_SLACK = 500` at `tests/setupServer.test.ts:270`. The two elapsed assertions read `150 ≤ e < 650` and `50 ≤ e < 550`, matching the claimed bands; the analyst's independent readings (164.0–172.2 ms) sit inside the first band.

3. **CONFIRMED** — `boundPageAttempt`'s composed strand carries `{ cause: failure }` and its cause is asserted `instanceof Error` with `describeFailure(cause)` equal to the attempt's own expiry message. The crossed-release throw carries `{ cause: signal.reason }` (`AbortSignal.timeout`'s `TimeoutError`), asserted.

4. **CONFIRMED** — `boundPageAttempt`'s remarks state the unref'd-timer ruling. Independently corroborated by the Orchestrator's own instrument, `P15-timer-probe.md`: `{"raced":"won","exitedAfterMs":0,"aborted":false}` on Node v24.20.0.

5. **CONFIRMED** — `guides/ollama.md:124` states the guarantee and cancellation ruling once and names the fixture-start/port-reservation exemption; `:358` names `PAGE_TOOL` under `tests/setup.test.ts`; `:359` states the intervals, slack, and causes. "It reaches three places." is absent from the tree.

6. **CONFIRMED** — `PAGE_INTERVALS` (exported and proved) sits beside `PAGE_BOUNDS` with its containments. `PAGE_BOUNDS.launches` (`tests/setupServer.ts:657`) replaces `attempts` at its reader, `tests/service/page.test.ts:273`; the unrelated `retryUntil({ attempts: 3, ... })` calls elsewhere are the general retry option.

7. **CONFIRMED** — Five owned files match the unit-only diff stat. `tests/setup.ts`'s diff hunk in `U13g-diff.patch.txt:60-99` against the same hunk in `U13h-diff.patch.txt:122-161`: byte-identical. `headless-edge: 0` corroborated by the Orchestrator's own `K-edge-residue-after-u13h.txt`. `collide3-ollama-after-u13h.txt` reports 0 collisions.

8. **CONFIRMED** — Walked every FAIL from A13 through A13e. Each names a closing test or a recorded ruling now present in the tree: `readPage`→`readOutcome`, `createTeardown`-ordered cleanup, the null-sentinel guard, F1 prompt, F3 console-error control, F4 `attempt.relay` filter, the `ProviderError` clause, and the A13e cancellation/slack/timer/residue carriers per claims 1–4, 7.

9. **CONFIRMED** — `U13h-ollama-service-verbose.log.txt` records `Test Files 13 passed (13)` / `Tests 69 passed (69)`, page.test.ts's 8 cases all green, each control inside its named bound (5206/3818/3688 ms). The gate logs record `exit=0` for every step.

10. **BROKEN** — The tree has not landed. The stated precondition — the `guides/agent.md` mirror refresh — has not happened: `ollama/guides/agent.md:1022` still reads "It is not proven by a browser test project, because this package has none," which is now false. `package.json:3` correctly holds `"version": "0.0.16"` (no bump). **Vector**: re-mirror the agent checkout's corrected sentence into `ollama/guides/agent.md`, then commit the `ollama` tree on `295fecb` with no version bump.

outside: none — every other finding traced to a claim above.

VERDICT: FAIL 10

<!-- Orchestrator: claim 10 is the landing step itself (the mirror refresh from agent `148c237`, then the commit); it runs after the A13f objective lane returns, so no lane reads a moving tree. -->

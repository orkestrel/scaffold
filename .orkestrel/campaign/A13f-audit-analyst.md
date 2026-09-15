OBJECTIVE (analyst) and cross-engine lane; Opus 5 wrote the audited unit.

1. **CONFIRMED** — Installed browser implementation matches the narrowed cancellation ruling. Executed a loopback CDP vector: `Target.getTargets` resolved 70.88 ms after abort; the already-aborted control rejected. Composed through `boundPageAttempt`, delayed connection reported expiry and released once in 149.76 ms. The outer race covers the connection gap.

2. **CONFIRMED** — Executed the actual callbacks through a non-writing Node loader after Vitest’s temporary-config write failed with `EPERM`. Parked acquisition measured **170.4026 ms**, inside `[150,650)`; parked release measured **63.3907 ms**, inside `[50,550)`. Removing the release timer reddened their lower bounds. `SCHEDULE_SLACK` is declared at `tests/setupServer.test.ts:283`.

3. **CONFIRMED** — Cause assertions at `tests/setupServer.test.ts:877` and `:949` passed. Independently dropping the composed and crossed-release causes in memory reddened their respective tests. The implementation retains the attempt failure and deadline reason at `tests/setupServer.ts:1308` and `:1315`.

4. **CONFIRMED** — On Node **v24.20.0**, a process with an armed 60,000 ms signal exited after **0.97 ms**, still unaborted; a worker likewise exited successfully after **28.06 ms**. A referenced-keepalive control observed `TimeoutError`. This corroborates P15 and the ruling at `tests/setupServer.ts:1273`.

5. **BROKEN** — The requested guide homes, moved `PAGE_TOOL` proof, slack explanation, deleted count sentence, and unbounded-fixture/port qualification are present. However, [setupServer.ts:1172](C:/Users/mikes/WebstormProjects/ollama/tests/setupServer.ts:1172) still promises that the inner CDP failure remains reachable as the cause. Executed an unanswered `Runtime.evaluate` with a 20 ms attempt and 80 ms command timeout: the returned cause was the deadline’s `TimeoutError`; the CDP failure was absent from that chain. With a 500 ms attempt and 20 ms command timeout, the original `CDPTimeoutError` propagated unchanged. Correct the expiry remarks to name the signal’s abort reason; preserve the implementation.

6. **CONFIRMED** — `PAGE_INTERVALS` is exported beside `PAGE_BOUNDS` at `tests/setupServer.ts:683`; its actual containment callback passed. Changing `hold` to 1,000 ms reddened it. `launches` replaces the former bounds member throughout its readers; `retryUntil` correctly retains its dependency-owned `attempts` option.

7. **CONFIRMED** — Current tracked and page snapshots match U13h. Its delta stays within the owned paths. Reconstructing U13g from HEAD and its staged patch produced byte-identical `tests/setup.ts`, `tests/setupService.ts`, and `tests/setupService.test.ts`. Compiler export inspection found no collisions for the audited helpers and bounds, with declaration controls detected. `tmp/probe` is absent; `git diff --check` passed. `K-edge-residue-after-u13h.txt` supplies the independent post-service empty headless-Edge reading.

8. **BROKEN** — Earlier implementation failures have carriers: retry/partial classification (`setupServer.test.ts:565`), cleanup (`:1127`), reader boundary (`:672`), sentinel guards (`:1249`), receipt ordering (`page.test.ts:341`), runtime operation membership (`:153`), recorder certification (`:395`), meaningful direct input (`:511`), and lifecycle bounds (`setupServer.test.ts:818`). U13h closes the cancellation wording, slack, placement, naming, and timer referrals. Claim 5 leaves the prose false, and the mirror prerequisite remains unmet. A13e’s independent live-mutation gap also remains **UNRESOLVED**: replay each retained U13e/U13f/U13g mutation separately with `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project service tests/service/page.test.ts`, then restore and repeat. Writer-reported negative runs do not independently close that gap.

9. **CONFIRMED** — Supplied Orchestrator evidence records **69 passed**, duration **74.29 s**, with attempt controls passing at **5,206**, **3,818**, and **3,688 ms**. The gate chain records exit 0 for formatting, lint, checking, build, and tests. These are supplied executions; independent live replay remains unresolved under claim 8.

10. **BROKEN** — HEAD remains `295fecb`, and [guides/agent.md:1022](C:/Users/mikes/WebstormProjects/ollama/guides/agent.md:1022) retains the superseded browser-proof attribution; `../agent/guides/agent.md:1034` contains the corrected attribution. Correct claim 5, settle claim 8’s evidence gap, refresh the mirror, and obtain acceptance before committing. No version bump is warranted by this tests-and-guide diff alone; the campaign’s runtime dependency change remains a separate trigger.

outside: none.

VERDICT: FAIL 5, 8, 10
<!-- Orchestrator: analyst route, GPT-6 Astra, read-only codex exec rooted at ollama; journal tmp/codex/A13f-audit.jsonl, thread 01a0a536-c5c8-7471-882c-7f6a75b2b8b9, 2026-09-15T13:17:04Z to 13:27:32Z (628 s), exit 0. -->

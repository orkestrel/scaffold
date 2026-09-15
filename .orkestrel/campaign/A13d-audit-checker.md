<!-- A13d — checker (Sonnet, native), mechanical lane over U13f-diff.patch.txt, U13f-page.test.ts.txt, and the U13f report. Retained from the completion notification, 2026-09-15 (170 s, 35 tool uses). -->

**MECHANICAL lane** — checker, Sonnet.

1. **CONFIRMED** — `acceptPageAttempt` (`tests/setupServer.ts:1342-1361`) reads, in order, `attempt.fault` (:1343), absent `outcome` (:1346), serialized `outcome.failure` (:1349), absent `outcome.result` (:1352), `outcome.result.partial` (:1355), then tool selection (:1360). Only a completed answer (`result.partial` falsy) without a dispatched tool answers `false`; every other path throws. The hermetic proof at `tests/setupServer.test.ts:555` (case block through :394) exercises exactly this order, including the A13c vector (`{turns:[0],tools:[],result:{content:"starting",partial:true}}` at :333) which throws `the page run was interrupted before it settled: starting` rather than retrying.

2. **CONFIRMED** — `boundPageAttempt` (`setupServer.ts:1145-1166`) races `createPageSession(...)` and the observation against `expirePageAttempt(signal, allowance)` (`:1110-1115`), releases through `session.destroy()` in a `finally` (:1156), and on the deadline outrunning the acquisition, awaits and destroys what it returned before rethrowing (:1163). `createPageSession` throws an already-aborted reason before taking anything (`options.signal?.throwIfAborted()`, :1028) and hands the signal to the readiness `waitForCondition` (:1059-1066). The report's live control "ends an over-long attempt on its own allowance and leaves no browser behind" passes at 5726-5761ms in both the writer's per-case timings and the Orchestrator's authoritative `U13f-ollama-service-verbose.log.txt:11`, and the report's two recorded mutations (racing removed; release-on-expiry removed) each reddened as claimed.

3. **CONFIRMED** — `PAGE_BOUNDS` (`setupServer.ts:627-648`) declares exactly `command, ready, read, run, evaluate, attempt, case, attempts, budget, retry`, with no `commands`/`reads` sum. The proof at `setupServer.test.ts:743` asserts that exact key order and every named containment (`attempt+command ≤ case`, `attempts×attempt ≤ budget ≤ retry`, `run < evaluate`, etc.), matching the brief's arithmetic exactly.

4. **NOT-EVIDENCED (mechanical)** — The declaration citations are verified: `node_modules/@orkestrel/browser/dist/src/core/index.d.ts` carries `timeout?: number` at lines 211, 1554, 1574, 1859, 2340, 2968, 3006, and a grep for `AbortSignal|abort` returns exactly one hit (`:2149 abort(reason?: string)`, request-interception abort). The ruling that `AbortSignal.timeout` is "right" for this seam is a design judgment outside the mechanical lane's remit.

5. **CONFIRMED** — `guides/ollama.md:124` states the one-deadline rule and the partial-outcome-ends-retry rule in prose matching the code exactly (`boundPageAttempt`, `acceptPageAttempt`); `:359` (`tests/setupServer.test.ts` bullet) names membership and containment, not a sum; `:368` (`page.test.ts` bullet) names the control. `npm run test:guides` exits 0 (34 passed) per `U13f-ollama-gates-test-full.log.txt:66-69`.

6. **CONFIRMED** — `expirePageAttempt` and `boundPageAttempt` collide with nothing: `collide3-ollama-after-u13f.txt` reports "collisions: none" over 469 export names across `src/**` and `tests/**`. `waitForAbort` (from `@orkestrel/test`, imported at `setupServer.ts` top) is the losing-race primitive `expirePageAttempt` composes with its own translation; `boundPageAttempt` does the racing job no installed export performs.

7. **CONFIRMED** — `git diff --stat HEAD` in the report (lines 33-39) touches only `guides/ollama.md`, `tests/setup.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/setupService.test.ts`, `tests/setupService.ts`; the patch file's `diff --git` headers (`U13f-diff.patch.txt`) confirm exactly those six paths, no `src/**`, no manifest, no lockfile. `scanPageOperations` and `readPage` are absent from the tree (`grep` returns no matches for either). The unit's claim that `tests/setup.ts`, `tests/setupService.ts`, `tests/setupService.test.ts` are byte-unchanged **from the U13c/U13e baseline** rests only on the writer's own report — UNRESOLVED for that specific sub-claim, though the six-file scope itself is independently confirmed. No headless Edge process: the report shows `Get-CimInstance ... msedge.exe ... --headless` returns `0`.

8. **CONFIRMED** — `U13f-ollama-service-verbose.log.txt` reports all 67 `service` tests passing, `13 passed (13)` test files, including the control at 5761ms; `U13f-ollama-gates-orchestrator.log.txt` and `U13f-ollama-gates-test-full.log.txt` show `format:check`, `lint:check`, `check`, `build`, and `test` (src, setup, policy, config, guides, conformance) all exit 0.

9. **CONFIRMED** — Every FAIL closes:
   - A13-analyst 2 / A13c-analyst 1 (partial-run retries) → closed by claim 1's `acceptPageAttempt` ordering and its regression proof.
   - A13-analyst 6 / A13-reviewer 6 (cleanup not registered as acquired) → closed at `createPageSession` (`setupServer.ts:1032-1089`, `createTeardown` registered per acquisition), CONFIRMED at A13b-analyst 3 and unchanged since.
   - A13-checker 7/8, A13-analyst 8, A13-reviewer 8 (`readPage` collision) → renamed to `readOutcome` (`setupServer.ts:1281`), exercised at `setupServer.test.ts:398`; `collide3-ollama-after-u13f.txt` reports no collision.
   - A13-analyst 9 / A13-reviewer 9 / A13b-analyst 11 (guide prose) → `guides/ollama.md:124` states the true rule (claim 5), and the `ProviderError` clause is asserted at `tests/service/page.test.ts:457`.
   - A13b-analyst 5 / A13c-analyst 3 (no single lifecycle deadline) → closed by claim 2's single-race `boundPageAttempt` and claim 3's membership-only `PAGE_BOUNDS` proof, with the mutation controls proving the race is load-bearing.
   - A13b-analyst 6 / A13c-analyst 4 (`scanPageOperations`) → removed from the tree.
   - A13-analyst 11 / A13-checker 11 (mutation hardening) → closed per A13b-analyst 2/9 and A13c-analyst 2/4, carried forward unchanged.
   - A13-analyst 12 / A13-reviewer 12 / A13b-analyst 14 / A13c-analyst 9 (ship-gate holds) — a holistic judgment; resolved here only insofar as every named mechanical defect underlying it is closed. `outside: none — chain closed`.

10. **UNRESOLVED** — Ship recommendation is a judgment call outside the mechanical lane's remit.

**outside:** none — chain closed, subject to the one UNRESOLVED sub-claim under claim 7 (byte-unchanged-from-baseline resting on the writer's report alone) and claim 4's ruling half being outside this lane's remit.

VERDICT: PASS

<!-- Orchestrator reconciliation of the claim 7 sub-claim: the three files' diffstat lines (26, 118, 96) are identical across the U13c, U13e, and U13f reports, and the A13c checker verified the U13e hunks byte-identical to U13c's; the Orchestrator's U13f-diff.patch.txt carries the same hunks. Closed. -->

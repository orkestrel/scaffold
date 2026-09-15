<!-- A13e — checker (Sonnet, native), mechanical lane over U13g-diff.patch.txt, U13g-page.test.ts.txt, and the U13g report, with the chain walk. Retained from the completion notification, 2026-09-15 (172 s, 32 tool uses). -->

MECHANICAL lane — checker, Sonnet.

1. **CONFIRMED** — `tests/setupServer.ts:1052-1074` (`createPageSession`) hands `options.signal` to `createBrowser` as `{ signal: options.signal }` inside `BrowserOptions`; the remarks at `:1043-1050` name the three reach points. The corrected declaration table in `U13g-ollama-page-fix-report.md` is verified against `node_modules/@orkestrel/browser`: server `index.d.ts:429,431` (`timeout`, `signal`), core `index.d.ts` shows `timeout` only at every page-command interface, and `grep -n "AbortSignal\|signal" dist/src/core/index.d.ts` returns no page-command signal member. The live control (`page.test.ts:560-582`) asserts the launch-half failure and its elapsed ceiling.

2. **CONFIRMED** — `boundPageAttempt` (`tests/setupServer.ts:1231-1271`) races `acquire`/`observe` against `expirePageAttempt(signal, bounds.attempt)`, then calls `releasePageAttempt` (`:1177-1194`) on both the catch path (`:1254`) and the success path (`:1263`), which races the acquisition's settlement plus `session.destroy()` against `AbortSignal.timeout(share)` and throws naming the stranded browser (`:1191-1193`) rather than awaiting unbounded. The signal is read again at `:1248` (mid-catch) and `:1264` (post-release). The hermetic proofs at `tests/setupServer.test.ts:817` onward and the live controls at `page.test.ts:560,623,670` exercise every named interleaving. No path awaits an unbounded promise.

3. **CONFIRMED** — `PAGE_BOUNDS` (`tests/setupServer.ts:638-648` plus remarks `:610-637`) declares `attempt: 85_000` and includes `release`; the proof at `tests/setupServer.test.ts:933-973` asserts the exact membership order and every named containment (`command/ready/read/evaluate < attempt`; `command ≤ release`; `attempt + release ≤ case`; `run < evaluate`; `read < evaluate`; `attempts × (attempt + release) ≤ budget`), with no sum over dependency operations — the remark at `:624-630` states why.

4. **CONFIRMED** — `page.test.ts:560-582` (over-long attempt), `:623-652` (delayed acquisition), `:670-` (crossed release) each assert `performance.now() - started ≤ allowance + PAGE_BOUNDS.release` beside the failure message. `U13g-ollama-service-verbose.log.txt` reports all three green (5212ms, 3666ms, 3701ms) in the authoritative run. The report's mutation logs show each control reddening under a named removal.

5. **CONFIRMED** — `guides/ollama.md:124` (contract 13) states `attempt + release`, the connection's signal route, that page commands are raced, and that a release outlasting its share is reported rather than awaited. `:359` names membership and the four interleavings, not a sum. No sentence still says the surface accepts no signal.

6. **CONFIRMED** — `guides/ollama.md:124` states the measured guarantee; `:359` and `:368` match the code's mechanism and the live control set, including the corrected recorder/request split retained from earlier rounds.

7. **UNRESOLVED (mechanical)** — `boundPageAttempt(bounds, acquire, observe)`'s shape, the `Pick<PageSessionInterface, 'destroy'>` constraint, `describeFailure` as an exported leaf over `isError`, `PageAttemptBounds`, and `AbortSignal.timeout` over `@orkestrel/timeout` are each present exactly as claimed at the cited lines; whether any is a wrapper the design laws forbid, and whether the names conform, is the reviewer's call.

8. **CONFIRMED** — `git diff --stat HEAD` and `git status --porcelain` name exactly the four files plus the three files the report claims byte-identical to U13f — that specific byte-identity sub-claim rests on the writer's report and is **UNRESOLVED** in this lane, though the file-scope list is directly confirmed. `collide3-ollama-after-u13g.txt` reports "collisions: none" over 469 names across 35 files. `waitForAbort` is imported and used inside `expirePageAttempt`/`releasePageAttempt`, not reimplemented. `K-edge-residue.txt` and the report's three readings each report `0` headless `msedge.exe`.

9. **CONFIRMED** — walking every FAIL: A13-analyst 2 / A13b-analyst 1 → `acceptPageAttempt`; A13-analyst 6 / A13-reviewer 6 → `createTeardown` registration; A13-analyst 8/9, A13-reviewer 8/9, A13-checker 7/8 → `readOutcome` and the corrected guide sentence; A13-analyst 11/12, A13-reviewer 12, A13-checker 11/12 → the executed mutation controls across U13c/U13e/U13f/U13g; A13-reviewer F1–F5 → the prompt, the `undefined` fields, the fault control, the `relay` filter at assignment (`page.test.ts:274-276`), `rootToPath`; A13b-analyst 2 → the receipt/turn pins; A13b-analyst 5 / A13c-analyst 3 / A13d-analyst 2,3 → `boundPageAttempt`/`releasePageAttempt`/`PAGE_BOUNDS` (claims 2–3); A13b-analyst 6/10 / A13c-analyst 4 → `scanPageOperations` removed; A13b-analyst 11 → the recorder sentence; A13d-analyst 4 → claim 1; A13d-analyst 5 → claim 5; A13d-analyst 7 → the residue readings; A13d-checker 4 → referred to claim 7. Every named FAIL maps to a closing test or a recorded ruling in the current tree.

10. **CONFIRMED** — `U13g-ollama-service-verbose.log.txt` reports `13 passed (13)` files, `69 passed (69)` tests, including all eight `page.test.ts` cases green with elapsed readings inside their stated ceilings. The gate logs show every gate and every `test` subproject at `exit=0`.

11. **UNRESOLVED (mechanical)** — shipping is a product/subjective judgment outside this lane's remit.

outside: none — chain closed, subject to the UNRESOLVED byte-identity sub-claim under claim 8 and claim 7's design-judgment portion.

VERDICT: PASS

<!-- Orchestrator reconciliation of the claim 8 sub-claim: the U13g report's byte comparison is corroborated by the identical diffstat lines for the three files across the U13c, U13e, U13f, and U13g reports (26, 118, 96), the A13c checker's byte check of U13e against U13c, and the A13d analyst's normalized comparison of U13f against U13c/U13e. Closed. -->

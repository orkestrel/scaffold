# Parallel holders — status and hand-off (updated 2026-10-06)

**Owner: the desktop session.** No other session takes over this work, or acts as if it has, unless the user gives the explicit go-ahead (the user, 2026-10-05). A session that reads this file without that go-ahead reads it for context only.

The design records sit beside this file: `synthesis.md` and `review-h2.md` (the holder tools, shipped in browser 0.0.24), `readings.md` (H6 contention), and the contexts round (`contexts-design-brief.md`, `contexts-proposal-analyst.md`, `contexts-proposal-planner.md`, `contexts-attack.md`, `contexts-synthesis.md` with the user's rulings).

## Published

- Pool 0.0.15 (`4c589c6`), browser 0.0.24 (`b81c22c`), scaffold 0.0.92 (`5612beb`), on 2026-10-04; record `scaffold/.orkestrel/release.md` § 2026-10-04 evening round.
- **The 2026-10-05 round, complete** (record `scaffold/.orkestrel/release.md` § 2026-10-05 round; logged for veneer in `lanes.md`):
  - pool 0.0.16 (`f5c3289`);
  - worker 0.0.16 (`5c14ed7`);
  - browser 0.0.25 (`ea8477b`) and 0.0.26 (`0379087`);
  - probe 0.0.21 (`0745af2`);
  - scaffold 0.0.93 (`916820149`).

  Every package is confirmed through `npm view`.

## Browser 0.0.25 — prepared, blocked at its gate

- On browser `main` and pushed: `e931740` (simultaneous replays of one journey on two holders no longer fail `BROWSER_JOURNEY_LOCKED`; run allocation queues per journey in process), `132c580` (the test launcher's Vite watcher ignores `tmp/`, which had pushed two global-setup cases past their budget), `74161b0` (scaffold 0.0.92 overwrite), `86140d2` (the release visit's re-pin).
- Uncommitted in the browser checkout: the version bump to 0.0.25 (`package.json`, `package-lock.json`) and the HAR creator stamp `0.0.25` (`src/core/constants.ts`); the visit ruled a bump (source moved).
- `prepublishOnly` steps: format, lint, typecheck, build, `npm test`, and the default-mode distribution test pass; `test:service` fails one `tests/service/document.test.ts` case at its startup precondition in two runs of two (logs browser `tmp/codex/r25-test-service.log`, `r25-test-service-2.log`). That is ROADMAP item 15, unrelated to 0.0.25's changes and present since at least 2026-10-04's census; it passed in the 0.0.24 release run by chance. Not published until it is resolved or the user rules to publish with it named.

### Item 15 investigation (2026-10-05)

- Ruled out: the fixture server's keep-alive race (`tmp/codex/keepalive-last.md`), a server-side read failure (the handler answers every path), and a toolset start that waits on an animation frame in a hidden page (`tmp/codex/item15-last.md`, `item15-hidden-startup.json`).
- At a captured failure (`tmp/codex/item15-failure-full-3.json`) the page was hidden and unfocused, two module requests were cancelled within 0.3 ms, and the browser carried Edge's onboarding, sync-confirmation, and extension targets; four unchanged full runs: two passed, one failed the document case, one the renderer-crash case.
- Running: unit `item15b` (brief browser `tmp/codex/item15b-brief.md`) compares repeated full runs with and without Playwright-style background-suppression flags, narrows the decisive flags, and reports whether they belong in the library's `BROWSER_LAUNCH_ARGS` (today only `--no-first-run`, `--no-default-browser-check`), since `browse` launches the same Edge on fresh profiles.

- The user ruled (2026-10-05): **hold browser 0.0.25 until item 15 is fixed.** Unit `item15b` was inconclusive (controls passed five of five that session; the first flagged run hung; no flags adopted). The Orchestrator's own full runs failed three of three (`tmp/codex/r25-test-service*.log`). Running: unit `item15c` (brief `tmp/codex/item15c-brief.md`), testing whether Edge freezes the hidden document page (sleeping tabs or efficiency mode on this laptop), which would cancel its in-flight module requests. Result: ruled out (`tmp/codex/item15c-last.md`): a frozen page suspends at `interactive` with no status-0 requests. Running: unit `item15d` (brief `tmp/codex/item15d-brief.md`), which loops full runs with Chromium's network log until a failure and reads the cancelling component and error. Result: zero document failures in six logged runs (one renderer-crash budget failure); the log suppresses or misses it. Also ruled out by reading the code: a double navigation in page creation (`BrowserContext.ts:181-210` creates `about:blank` and navigates once) and cross-page request interception (`BrowserNetworkManager.ts:272-290` enables `Fetch` per page only with routes or credentials). Running: `tmp/probes/engine-split.ts`, alternating full runs between the system Edge and Playwright's Chromium (`chromium-1243`) to read whether the flake is Edge-specific; results land in `tmp/probes/engine-split/results.json`. Result: all six passed (Edge three of three, Chromium three of three); the flake did not appear, so the split is unsettled. Across the day the rate moved by session (the Orchestrator's runs near 01:30 to 02:30 failed three of three; the next sixteen full runs in three series failed none). The cause is unknown; 0.0.25 stays held; resume item 15 when it recurs, reading the failing run first.
- The contexts campaign started while item 15 waits: P1 landed on pool `main` at `3ff0c63` (per-record `capacity`, 21 cases each red under its mutation; report pool `tmp/codex/contexts-p1-last.md`), unreleased (pool 0.0.16 later); its Opus review (`review-p1.md`) ruled FAIL (idle reuse order, the unstated validation exposure, ownership wording, one test, item 1's trigger) and unit `contexts-p1fix` repaired all seven findings with mutation probes (pool `main`, the commit after `3ff0c63`; `isPoolMax` renamed `isPoolLimit`, used only in vendored guide mirrors); M1's first attempt stopped on an instrument hang (an isolation control's in-page step waited on a permission prompt; `tmp/probes/contexts/m1/report.md`); unit `contexts-m1b` (brief browser `tmp/codex/contexts-m1b-brief.md`) finished on 2026-10-05 at 09:39, exit 0, 81 minutes, no probe Edge process left; its record is in the following section.

## M1 result (unit `contexts-m1b`, 2026-10-05)

Report: browser `tmp/probes/contexts/m1b/report.md` (prose, tables, commands); raw records beside it. Edge 154.0.4258.53, Node v24.21.0, browser `132c580`, three interleaved samples per cell, meaningful difference 15.4167% declared before the final series (`performance-weRPGQ/sizing.json`), observed ranges, not confidence intervals.

- **Wall:** contexts match separate browsers at equal holder counts (core loop: 2 holders 12.91 [12.61–15.61] s against 12.94 [12.77–15.71] s; quiet: 3 holders 10.13 against 10.30 s). Contexts on one browser: 1 to 2 holders improved 40.9% under the core loop (21.85 to 12.91 s, disjoint ranges); 2 to 3 improved 11.1% (below the threshold); quiet 3 to 4 showed no gain; the balanced twelve-workflow control read 3 against 4 contexts at 7.5% quiet and 7.6% loaded (below the threshold, loaded ranges overlap).
- **Cost:** at 2 holders under the core loop, contexts settle at 917 MiB private against 1610 MiB for two browsers, 13.9 against 17.0 browser CPU-seconds, 19 against 36 processes; at 3 holders 1130 against 3507 MiB. An idle second browser (hybrid at 1 holder) adds about 1 GiB private (2551 against 1414 MiB).
- **Latency:** context acquire 113 to 266 ms, `close()` about 22 ms, replacement 126 to 240 ms, against a 980 to 1898 ms browser relaunch.
- **Isolation:** every store passed 3/3 on one browser and on separate browsers, quiet and loaded: cookies, localStorage, sessionStorage, IndexedDB, Cache Storage, service-worker registration presence, permission overrides (set through `Browser.setPermission` with the context id), HTTP cache by origin counts, downloads; `Target.getBrowserContexts` omits each closed context; disposed listener counts read 0.
- **Turnover soak:** 30 generations, three repetitions per load: owned context, target, and download-folder counts return to one each batch; private memory rises from about 505 to about 670 MiB by generation 5 and then holds; a longer leak is not excluded.
- **Blast radius:** 24 cells. A killed browser loses every holder on it (one browser 4/4; two browsers 2/4, holders on the other browser answer); a renderer crash loses only its holder. Rebuilding the first lost holder takes 0.99 to 1.57 s from the loss event, sequential rebuilds stacking to 2.8 s for the fourth.
- **Recommendation (the writer's, for the user's ruling):** one browser with `BROWSE_CONTEXTS=2`, the shared holder counted; `BROWSE_POOL` stays 1; a second browser is an availability choice at about 1 GiB idle.
- **Defect candidate, browser library (browser `ROADMAP.md` item 16):** `navigator.serviceWorker.register()` never resolves under the library's page setup (`Target.setAutoAttach` with `waitForDebuggerOnStart: true`, `src/core/BrowserContext.ts:510`, `BrowserPage.ts:1347`, `:1490`); the registration exists with no installing, waiting, or active worker; with `waitForDebuggerOnStart: false` set through `page.send()` it activates. The worker attach path (`BrowserPage.ts:2052`) returns early for a target reported by a session other than the page's own, which might leave a service worker paused; unconfirmed.
- **Headed limit:** a page hidden behind a popup runs timers at 1 to 2 Hz and animation frames at 0 Hz; headed popup clicks succeeded 3/9, timing out in `Runtime.callFunctionOn` because element positioning waits on `requestAnimationFrame` (`src/core/elements/BrowserPageElement.ts`); headless succeeded 9/9.
- **Unresolved:** one quiet 3-context cell (`final-false-contexts-3-1`) failed a bounded 15-second `read` call; the focused repeat (three context runs, three browser controls) did not reproduce it. The loaded steady CPU calibration passed 2/3, so small CPU differences carry no claim.

## The contexts campaign (P1 and M1 done, C1 waits on the topology ruling)

- The user's rulings (2026-10-05): holders become isolated contexts on pooled browsers; a per-browser bound `BROWSE_CONTEXTS` with total admission `size × contexts`; the shared holder counts; the call-paced relaunch loop is a recorded limit; the default `BROWSE_POOL` stays 1 until contexts land; the default topology is ruled from M1.
- The user ruled Q4 from M1 (2026-10-05): one browser, default `BROWSE_CONTEXTS` 2, the shared holder counted, `BROWSE_POOL` 1.
- Unit `contexts-c1` (brief browser `tmp/codex/contexts-c1-brief.md`) stopped after 2.5 minutes on "ties by warm order" against the pool's release-order idle ties (`tmp/codex/contexts-c1-last.md`); the Orchestrator ruled that browse follows the pool's tie rule (`contexts-synthesis.md`, § Where the lanes agree). Unit `contexts-c1b` (the same brief with a continuation, `tmp/codex/contexts-c1b-brief.md`) finished in 46 minutes (`tmp/codex/contexts-c1b-last.md`): 13 files plus tests, 28 added cases with 27 mutation controls (`tmp/codex/contexts-controls-final.json`), owning projects 1839 passed. Uncommitted on browser `main` beside the 0.0.25 bump; `npm run test:guides` is red (seven new exports undocumented, three summaries drifted; log `tmp/codex/contexts-c1-guides.log`), to be synced in the review-fix unit. The Opus objective review (`review-c1.md`) ruled FAIL with eight required changes, three of them correctness defects: an unwatched prepared generation, a release-then-declare race with a co-holder, and over-broad retirement. The Orchestrator ruled the two referred questions in the same file. Unit `contexts-c1fix` (brief browser `tmp/codex/contexts-c1fix-brief.md`) stopped on change 5 with nothing changed; the Orchestrator restated change 5 (`review-c1.md`, § Orchestrator rulings). Unit `contexts-c1fix2` (brief browser `tmp/codex/contexts-c1fix2-brief.md`, report `tmp/codex/contexts-c1fix2-last.md`) repaired all eight changes and applied both rulings, each code repair red without its mechanism (ledger `tmp/codex/contexts-c1fix-controls/ledger.json`). Owning projects: 1844 passed. Guide parity: 250 passed. Policy: 119 passed. **C1 landed:** browser `main` `6bedbb1`, pushed 2026-10-05. Until pool 0.0.16 publishes and the browser re-pins, a fresh clone of browser `main` fails typecheck, because `package.json` pins pool `^0.0.15`; this checkout carries the pool build in `node_modules`. **C2 landed:** browser `main` `50e6017`, seven real-Chromium proofs, each red under its source mutation (`tmp/codex/contexts-c2-mutation-ledger.json`). Running the file whole showed three pre-existing cases failing since C1, which the Orchestrator had not run before committing C1:
- `contains downloads and destroys their process and profile before capacity is reused cleanly`;
- `reports a real filesystem refusal while ending several live leases`;
- `forces a hung stand-in process to exit at the ping deadline and serves its successor`.

Unit `contexts-c1svc` (report browser `tmp/codex/contexts-c1svc-last.md`) classified the four failures:
- two obsolete expectations, rewritten at `contexts: 1` with every true claim kept;
- two C1 defects, fixed with red cases: the forced kill waited on context cleanup, and an expected shutdown disconnect became a teardown fault.

It stopped at a core defect C1 exposed. Closing a crashed-renderer page stalls about 30 s, because `BrowserPage.#close()` releases resources before closing the target and the WebMCP registry waits on a crashed renderer. Running: unit `contexts-c1svc2` (brief browser `tmp/codex/contexts-c1svc2-brief.md`, cap 3 hours), with `src/core/BrowserPage.ts` in scope. It must pass the service file alone twice and rerun the server project's `FileBrowserStore` timing case after the probe unit finishes. All of this stays uncommitted, and one Opus review covers it before commit.

`contexts-c1svc2` result (`tmp/codex/contexts-c1svc2-last.md`):
- `BrowserPage.#close()` sends `Target.closeTarget` before `#release()`. A crashed-renderer close takes 21 ms instead of about 30 s, and its core case fails under the old order.
- Core project: 1250 passed.
- `tests/service/browse.test.ts` alone: two consecutive passes, 37 passed and 6 skipped, at 76.2 s and 71.8 s.
- Open: the server project's `FileBrowserStore` race case missed its 5,000 ms deadline only while the probe unit ran. The Orchestrator reruns `npm run test:src:server` after probe finishes.
- The Opus review (`review-c1svc.md`) ruled FAIL on F1, F2, F3a, and F3b.
- Unit `contexts-c1svc3` (`tmp/codex/contexts-c1svc3-last.md`) repaired F1, including a second window where a launched browser defers its loss event, and F2 (no `detach` after `close()` starts). Six mutation controls fail without their fixes. The whole `BrowserMCPServer.test.ts` and `BrowserPage.test.ts` files pass.
- F3a uncovered a core defect: `CDPClient` never settles a detached session's pending commands.
- The service file passed once and failed once: the downloads case timed out at 30,445 ms, with three replay cases after it, while the probe unit loaded the host.
- Unit `contexts-c1svc4` (`tmp/codex/contexts-c1svc4-last.md`):
  - `CDPClient` rejects a detached session's pending commands with `CDPConnectionError` (`method`, `session`); root and other-session commands resolve.
  - Eight mutation controls fail without their fixes; core project: 1253 passed.
  - `tests/service/browse.test.ts` alone passed twice consecutively on a quiet host: 37 passed, 6 skipped, 65.3 s and 68.2 s.
  - The downloads stall did not recur; its cause stays unestablished.
- The Orchestrator's `npm run test:src:server`: 388 passed, 10 skipped, so the `FileBrowserStore` misses were load from the probe unit.
- The Opus delta review (`review-c1svc2.md`) ruled FAIL on four items, and unit `contexts-c1svc5` repaired them:
  - registry guards once a page closes;
  - healthy-browser and lost-browser cleanup-fault cases;
  - a child-session detach delivered on its parent;
  - the `CDPConnectionError` description.
- Its results: 15 mutation controls, each failing exactly its case; core 1255 passed; guides 251; policy 119; the service file passed alone a third time. The Orchestrator's server rerun: 390 passed.
- **The C1 follow-up landed:** browser `main` `708f0dc`, pushed 2026-10-05.
- Probe U4 (`eager-probe-u4`; readings copied to `eager/probe-readings.md`):
  - The negative control passed.
  - M-A, spawn to `initialize`: probe 8.55 s; scaffold 13.41 s, so T1 is yes, above Codex's 10 s default; veneer **refused** at about 61 s in 3 runs of 3, `The type stage warm exceeded 30000 ms`.
  - M-B, Oxlint kill to a working replacement: 3.0 s.
  - M-C is not a clean comparison: the historical server suite failed one case.
  - M-D: no persistent handle.
  - M-E: Codex with `required = true` refuses and prints the cause. Claude Code connects in both the healthy and the refusing case.
- The veneer readings (`eager-probe-veneer2`):
  - Veneer's type warm takes 37.2 s at the median (36.4 to 50.0 s), whole arm 46.4 s.
  - Published 0.0.20 also refused its first two `prove` calls on veneer, at 76.7 s and 35.5 s, and recovered only after an idle replacement warm.
  - Scaffold: warm 7.3 s, arm 14.6 s.
- **The user ruled (2026-10-05):** `initialize` waits for lint and runtime only, and the type stage warms behind it under its own warm bound, separate from the 30 s inspection deadline (`eager/probe-design.md`, T1 revised).
- Unit `eager-probe-warm` stopped on the Orchestrator's own overreach, "lint keeps working while type is unavailable", which the `Verdict` contract forbids, and the correction withdrew it.
- Unit `eager-probe-warm2` committed probe `e8d4715`:
  - `PROBE_WARM` is 90,000 ms, overridable through `ProbeOptions.warm`.
  - `initialize` takes veneer 7.1 to 7.9 s, scaffold 3.2 to 4.1 s, and probe 1.5 to 1.7 s, all under Codex's 10 s default.
  - Veneer's first type `prove` succeeds without a retry, 43 to 46 s from the call.
  - Six cases each fail without their mechanism. Source suite: 268 passed.
- Probe U5 committed `3e43264`:
  - the guide's surfaces, § Lifecycle, § Registering the server, and § Cost;
  - the pool 0.0.15 mirror, refreshed to 0.0.16 at the release visit;
  - the queue mirror removed and ROADMAP item 1 deleted.

  The Orchestrator fixed the two TSDoc summaries U5 could not own, in `23ddcea`. Guides: 32 passed. Policy: 119 passed.
- Running: U6, the Opus review of `dee8845..23ddcea`. Then U7 (gates); push probe after U7.
- **M2** (unit `contexts-m2`, report browser `tmp/probes/holders/m2/report.md`) completed its quiet series, three repetitions per cell, through the built binary. Body wall time:
  - 1×1: 49.7 s;
  - 1×2: 29.7 s, 40.2% less than 1×1, with disjoint ranges;
  - 1×3: 24.3 s, 18.1% less than 1×2, with overlapping ranges, so not established;
  - 2×2: 24.6 s, at 87 against 49 browser CPU-seconds and 3,470 against 2,217 MiB idle; the holders on the surviving browser kept working after a kill.
- M2 stopped before the loaded series:
  - the host-CPU preflight failed twice (17 to 21%, mostly Cursor);
  - the core loop failed `tests/src/core/CDPClient.test.ts:277` once. That case, written 2026-09-29 (`91ec857`), counts process-wide `Timeout` resources, so an unrelated timer expiring between its two readings fails it under load. A flake candidate, not the session-detach change.
- **The user confirmed the defaults (2026-10-05):** one browser with 2 contexts, the shared holder counted, from M1's loaded library readings and M2's quiet binary readings. ROADMAP item 14 closed: browser `main` `10802f3`, pushed 2026-10-05.
  - The guide's defaults bullet cites M1 and M2.
  - The `CDPClient` timer case records only its own request's timer through `node:async_hooks`. It is red under a test-config overlay that skips clearing the timer on abort, and it passed 20 runs in a row.
  - Core: 1255 passed; guides 251; policy 119.
- **The browser contexts campaign is complete on `main`:** C1 `6bedbb1`, C2 `50e6017`, C3 `b1b1c8f`, the follow-up `708f0dc`, and the item 14 close `10802f3`, plus item 16 `e8aa649`. It is unpublished; the release waits for pool 0.0.16 and the user's item 15 decision.
- Probe: U6 (`review-u6.md`) ruled FAIL. Unit `eager-probe-u6fix` committed `0c78588`:
  - the type refill refusal is consumed by the call that receives it, red on the stale cause;
  - `LINT_TEARDOWN` (16,000 ms) bounds lint disposal with `deadline`; at `deadline: 500`, live pids read `[1,1]` against `[1,2]` before the fix;
  - the `arm-` cleanup assertion moved to a case that fails;
  - the TSDoc drift fixed, and the guide states the reworded survivor ruling.

  Its gates passed: `npm test` with source 269, policy 119, config 227, setup 19, and guides 32.
- U7, the Orchestrator's independent gate run:
  - The first run failed `spends silent initializes through the coordinator deadline` under full-suite load. Its 3 s replacement wait predated `0c78588`, which made each replacement follow a lint disposal bounded by `LINT_TEARDOWN`. The wait and the timeout now derive from `LINT_TEARDOWN` (`4428ae1`), and the overlap pin is unchanged.
  - The rerun passed every gate.
- **Probe landed:** probe `main` `0437a29..4428ae1`, pushed 2026-10-05. It pins pool `^0.0.15`, so a fresh install fails the idle-loss cases until the release re-pins to `^0.0.16`.

## Release, in layer order (the user, 2026-10-05: publish up to browser, not browser yet; then research item 15 in depth, upstream included)

- **pool 0.0.16: published** 2026-10-05 (`window.ts`: accepted, confirmed; log `tmp/units/publish--orkestrel-pool.log`), from `f5c3289`.
- **worker 0.0.16: published** 2026-10-05 from `5c14ed7`. `window.ts` reported accepted and unconfirmed while npm processed it; `npm view` then served 0.0.16 with `@orkestrel/pool` `^0.0.16` (log `tmp/units/publish--orkestrel-worker.log`).
- **probe:** its visit failed the test gate on one case. The silent-initialize case's `await probe.destroy()` rejected while worker's gates ran alongside.
  - The file alone passes: 37 passed in 481.6 s (`probe/tmp/codex/layer-probe-rerun.log`).
  - Likely cause, unconfirmed: under heavy load the lint kill confirmation overruns its window, and teardown (since U6) reports the slow child as a survivor.
  - The visit also reported 2 self-pin hits. It committed the re-pin (`a550341`) and left the overwrite's files uncommitted.
  - Reproduce it under load and rule on it after `item15e`, which needs the host.
- **Item 15 deep research** (records in `lifecycle/item15/`):
  - **The leading cause, H1, which the attack confirmed and strengthened:** Edge signs each fresh profile in to the user's Windows Microsoft account and syncs the account's extensions. The second install wave, about 20 to 22 s after launch, brings Claude (`declarativeNetRequest`, `debugger`) and Capital One Shopping (`webRequest`). The first such extension resets the URL loader factories, and a page's import wave in that window gets `net::ERR_ABORTED` before dispatch.
  - **The user ruled (2026-10-05):** `--disable-sync` goes into `BROWSER_LAUNCH_ARGS` for every browser the library and `browse` launch, and the experiment series may run.
  - Unit `item15e` (`tmp/codex/item15e-last.md`, `tmp/probes/item15/`) confirmed H1's behavior:
    - Reloading Capital One alone reproduced the signature (1 of 3 reloads, 0 of 1 controls), and so did Claude alone (1 of 2), so H7 is not needed.
    - E1 calibration: arm A failed at +20.779 s, beside Claude's install at +20.748 s; arm B (`--disable-sync`) installed neither extension and failed nothing.
    - No network-change or 4227/4231 events showed in the nine failure windows (H5 and H6 contradicted).
  - It committed no fix: `--disable-sync` leaves Edge's implicit sign-in to the Windows Microsoft account in place. No documented per-launch switch stops it; Edge's `ImplicitSignInEnabled` and `BrowserSignin` are machine-wide policies.
  - **The user ruled (2026-10-05):** land `--disable-sync` and close item 15 on sync off with no account extension, recording the sign-in as a limit. Research a per-launch way to stop implicit sign-in afterward, in its own unit.
  - **Item 15 closed:** unit `item15f` committed `1ebeca7`, pushed. `--disable-sync` is in `BROWSER_LAUNCH_ARGS`.
    - The formal E1 series of 8 interleaved pairs, declared beforehand: arm A failed 3 of 8 launches, each right after Claude's install; arm B failed 0 of 8 and installed no account extension. The rate comparison alone reads p = 0.10, against 0.05 declared, so the closure rests on the reproduced trigger and B's zero.
    - The regression case `tests/service/launch.test.ts` reads Edge's sync diagnostics: red in 1.1 s without the flag, green in 1.2 s with it.
    - Three full `npm run test:service` runs each passed 205 with 6 skipped, and 0 account installs across 77 profiles per run.
    - The guide records the implicit sign-in limit.
  - The bump and HAR stamp were committed as `11da79d`. The browser 0.0.25 visit committed the re-pin to pool `^0.0.16` (`1000f05`), and the Orchestrator committed the first visit's overwrite output (`6330805`, scaffold 0.0.92).
  - The visit's test gate then failed three times on `FileBrowserStore > preserves committed results when an empty lock removal races another writer`, which timed out at Vitest's 5,000 ms under the whole `src:server` load. The case loops 512 real-filesystem lock races and passes alone; it is the same case that missed earlier under the probe unit's load.
  - Unit `store-race-tune` committed `75c8fc2`:
    - The case drops from 512 iterations to 8. With the mechanism disabled, 59.96 to 68.55% of iterations fail, so 8 gives a 0.07% chance of missing the defect, under the declared 0.1%.
    - It is red with the mechanism disabled (4 of 8) and green at about 30 ms. Five whole `src:server` runs passed 390 each.
  - The fourth visit then passed every gate:
    - `npm test` and the compare (dist moved, range moved, ruling bump).
    - `prepublishOnly`'s `test:distribution --mode release` needs `/proc` and FIFOs, and fails on Windows. Per the release record, the default mode passed (14 passed, 9 host-bound skips), and `test:service` passed (205 passed, 6 skipped).
  - **Browser 0.0.25: published** 2026-10-06 UTC from `ea8477b`. `window.ts` reported accepted and unconfirmed, and `npm view` served 0.0.25 with pool `^0.0.16` about 4 minutes later. Recorded in `.orkestrel/release.md` § 2026-10-05 round and logged for veneer in `lanes.md`.
  - Probe: its pending overwrite was committed (`288f600`).
    - Unit `teardown-load` ran 20 runs at about 85% CPU (14 busy workers). The teardown rejection reproduced 0 times; every `destroy()` resolved, and every pid was gone afterward.
    - Instead, the case failed 20 of 20 because the fixture's `overlaps` record was never written: the observation depends on fixture timing under load.
    - `teardown-load2` committed `140c5bd`:
      - The fixture wrote `spawns`, then ran `tasklist` before writing `overlaps`, so cleanup could kill it between the two writes. It now records the overlap in its startup write.
      - Under load: 20 of 20 failed before, 0 of 20 after. With the disposal bound removed, 5 of 5 fail.
    - The quiet full suite failed only the executed receipt example (Oxlint moved to 1.87.0); the Orchestrator re-quoted it in TSDoc and the guide (`24b8a27`), and guides pass 32.
    - Under a synthetic 85% CPU load, 12 timing cases across 3 files fail (handshake, warm, deadline). That load is harsher than a release visit, so this is a follow-up, not a blocker.
    - The release-visit teardown rejection stays unreproduced in 20 runs.
    - Next: `layer.ts probe` once browser 0.0.26's preparation is done, with visits run one at a time.
  - Unit `signin` (`tmp/codex/signin-last.md`, `tmp/probes/signin/`):
    - On Edge 154.0.4258.53, `--disable-features=msImplicitSignin` stops implicit sign-in: no account in 3 of 3 launches plus 3 confirmations, against a control that signed in 3 of 3. The library's drive passes with it.
    - `msIdentityCore` also works. `--guest` breaks CDP with `ECONNRESET`. The `signin.*` preference seeds, `--disable-signin`, and `--allow-browser-signin=false` do not stop it.
    - Candidates came from `msedge.dll` strings; 84 launches, all profiles deleted.
  - Unit `signin-fix` committed `fee07dd`, pushed:
    - Every library launch emits one `--disable-features=` switch containing `msImplicitSignin`, merged with any caller's disabled features.
    - The service assertion "no account identity or consent after a 2 s settle" is red without the flag (3.3 s) and green with it. The merge case is red with two switches (18 ms).
    - Server 392, core 1255, guides 251, policy 119, and `test:service` 205 passed.
    - The guide states that Edge automation profiles carry no Microsoft account, synced extensions, or synced settings.
  - The 0.0.26 bump and HAR stamp were committed as `7a5ce85`.
    - The first 0.0.26 visit failed `npm install`: `@microsoft/api-extractor` 7.59.4, published at 01:54 UTC, needed `@rushstack/ts-command-line@5.3.17`, which reached npm about 10 minutes later.
    - The rerun passed every visit gate. The Windows `prepublishOnly` ran with the default-mode distribution (14 passed, 9 skipped) and `test:service` (205 passed, 6 skipped).
    - **Browser 0.0.26 READY** at `0379087`, waiting for the user's code.
  - **Probe 0.0.21 READY** at `0745af2`: `npm test` 514 s, `prepublishOnly` passed, and the compare shows pool `^0.0.16` added and queue removed. Waiting for the user's code.
  - Follow-up, its own unit after the browser release: a per-launch way to stop Edge's implicit sign-in (an internal `--disable-features` name, or guest mode) without touching the user's Edge.
- **worker** (L4): after pool publishes. **probe** sits in browser's layer (L5) and does not depend on browser.
- **Item 15 deep research:** running as the workflow `item15-deep-research` (evidence reader, code reader, upstream researcher, a synthesis with decisive experiments, an adversarial critic). Its experiments run after it returns.

The layer plan:

1. **pool 0.0.16:** `capacity`, the idle-loss strike, and the `isPoolMax` to `isPoolLimit` rename (breaking; no fleet source imports it).
2. **browser:** the held 0.0.25 work plus item 16, C1 to C3, the follow-up, and the item 14 close. Re-pin to pool `^0.0.16`. It needs the user's item 15 decision.
3. **probe and worker:** each re-pinned to pool `^0.0.16`.
4. **scaffold:** the catalog regenerated, the guide mirrors (pool, worker, browser, probe), and the fixture pins; coordinated with the cloud session's lanes. Then a veneer entry in `lanes.md`.
- M2 (browse confirmation) runs on a quiet host after U5's test runs.
- M2 waits for a quiet host after it. Drafted: `tmp/codex/contexts-c3-brief.md` (Opus, after c1svc), with its limit line amended by the correction to rulings 4 and 8.

Parallel lanes (the user, 2026-10-05; `native/synthesis.md`):
- worker unit `pool16` (worker `tmp/codex/pool16-brief.md`): narrow `WorkerOptions.pool` to refuse `capacity`, and pin the idle-loss strike;
- probe unit `eager-probe2` (probe `tmp/codex/eager-probe2-brief.md`): ROADMAP item 1 on pool 0.0.16, with local commits per unit and no push.

Both build against the pool tarball installed without saving. Pool ROADMAP item 1 stays unbuilt, and Q3(a) stands.

Lane results:
- **Worker landed:** worker `main` `11db32a`, pushed 2026-10-05, after units `pool16`, `pool16b`, and `pool16c` and one Opus review (`native/review-worker.md`, FAIL, then repaired).
  - `WorkerOptions.pool` refuses any value that can carry `capacity`.
  - The idle-loss strike case fails on pool 0.0.15.
  - Until the release visit re-pins worker to `^0.0.16`, a fresh install takes pool 0.0.14 and that case fails.
- **Probe:**
  - Unit `eager-probe2` stopped on L-3, because a retained survivor refuses for the life of the pool. Unit `eager-probe3` stopped on L-3's failed-warm branch, where `create` retains nothing. The Orchestrator re-ruled and extended L-3 in `eager/probe-design.md`.
  - Unit `eager-probe4` (report probe `tmp/codex/eager-probe4-last.md`) committed U1 `0437a29`, U2 `65ed2df`, and U3 `08ca166` on probe `main`, unpushed.
    - Format, lint, check, and build pass; server and bin cases pass.
    - The idle-loss case shows three spawns on pool 0.0.15 and two on 0.0.16.
    - Both survivor branches are implemented and NOT-EVIDENCED (the fixture cannot make a child outlive a kill).
    - `npm test` failed one core audit case: `MCPError` in the handshake. The Orchestrator ruled a named factory plus an explicit audit exception. Running: unit `eager-probe-audit`.
  - Unit `eager-probe-audit` committed `058a946`: `createHandshakeError` builds the handshake's `MCPError`, and the audit names that factory as its sole exception. Source suite: 263 passed, 12 skipped. Guide parity waits for U5, which must also document `createHandshakeError`.
  - Then U4 readings (after `contexts-c1svc4` finishes its service runs, for a quiet host; M-E uses `claude -p --mcp-config` as browse's U11 did, the user's choice of 2026-10-04), U5 docs, U6 Opus review, and U7 gates (`eager/probe-design.md`, § Units). Push probe after U7.
- **C3 landed:** browser `main` `b1b1c8f`, fast-forwarded and pushed 2026-10-05, ahead of the uncommitted C1 follow-up, whose files do not overlap.
  - The Opus writer worked in a worktree with no shell, so the Orchestrator ran its validation: guides 251 passed and policy 119 passed.
  - Its hung-renderer guide assertion fails when a failed call counts as a browser loss (a mutation in `BrowserMCPServer.ts`, restored), and passes restored.
  - ROADMAP item 14 holds the M2 confirmation.
  - The worktree and branch are removed. It builds against pool `main` `1f194d7`, installed in browser `node_modules` with `npm install --no-save` from pool `tmp/pack/pool-main-1f194d7.tgz`; `package.json` keeps `^0.0.15` until the release re-pins 0.0.16, and an `npm ci` in the browser checkout restores 0.0.15 and breaks the C1 build until then.
- Pool ROADMAP item 1 (a waiter waits while a release could return capacity above floor 1) names the contexts consumer at `BROWSE_POOL` greater than 1 as its trigger; the default size 1 never reaches it, and the analyst's proposal (§ 7) argues the opposite rule for browse (terminal unavailability rather than waiting on another holder). Rule it before the release, not inside C1.
- Units in order (`contexts-synthesis.md` § Units): M1 feasibility and sizing (extend browser `tmp/probes/contexts/`, whose first run `run-swgN81` and report are the pilot), P1 pool shared leases (pool 0.0.16), C1 contexts in browse, C2 real-Chromium proofs, C3 guide and roadmap, M2 confirmation, release (pool 0.0.16, browser, scaffold re-pin).

## Evidence and instruments

- H6 instrument: browser `tmp/probes/holders/` (`node tmp/probes/holders/main.ts [--control] [--load] --sizes 1,2,3 --count 5`); runs `run-9IesXQ` (quiet), `run-7fAPBz` (loaded); readings in `readings.md`.
- Contexts probe: browser `tmp/probes/contexts/` (`report.md`, `run-swgN81/record.json`).
- Duration census: browser `tmp/probes/test-census.ts --label NAME` (before and after summaries under `tmp/probes/census/`).
- Unit briefs and reports: browser `tmp/codex/*-brief.md` and `*-last.md` (holders-h1 to h6b, item6 to item8, gone, keepalive, service-flakes, replay-race, test-tune, contexts-probe).

## Open, in order (2026-10-06)

**The user (2026-10-06): proceed with what's left.**
- Workflow `remaining-items-analysis` finished; records in `lifecycle/remaining/` (three analyses and the attack).
  - **Probe:** 11 of the 12 loaded failures come from quiet-host test budgets; the twelfth misreads its handshake frame.
  - **mcp item 14:** inject the clock (the existing `clock` seam pattern and `createManualClock`).
  - **mcp item 13:** answer a legacy pre-initialize `ping` without a session. The Orchestrator ruled to admit only that request and to record the departure from the transport page's 400 recommendation in the guide.
- Running in parallel:
  - unit `load-cases` (probe `tmp/codex/load-cases-brief.md`): the handshake diagnostic, the event-wait fixes, and the derived budgets;
  - unit `items13-14` (mcp `tmp/codex/items13-14-brief.md`).
- The ollama store campaign resumes last, on a quiet host.
- **mcp:**
  - `items13-14` committed `c98d82f` (item 14: `MCPInputOptions.clock`; the expiry reads use it; the cases run on `createManualClock`) and `8f743a8` (item 13: `isPingRequest`; a headerless legacy `ping` passes the session middleware while initialization is pending; the guide records the departure). `ROADMAP.md` item 15 covers 404 versus 400.
  - Gates green: source 1537, guides 202, conformance 47, integration 4.
  - The Opus review (`remaining/review-mcp.md`) ruled FAIL on two test gaps, and `items13-14fix` repaired them (`51b4d0a`):
    - the expiry cases start their manual clock at `2 * Date.now()`, with added admission and pre-seal cases, so each of the six expiry reads goes red when reverted to `Date.now()`;
    - the guard pins a wrong `jsonrpc`, array `params`, and a batch;
    - the `clock` TSDoc states the trust;
    - source 1539, guides 202, check passed.
  - mcp ROADMAP item 16 (`44a8002`) records the stdio client transport cases' fixed `waitForDelay(300)` waits: 5 failed under the probe unit's load and passed alone.
  - **mcp `main` pushed** (`c98d82f`, `8f743a8`, `51b4d0a`, `44a8002`). **mcp 0.0.37 published** on 2026-10-06 at `9e374f2` (`.orkestrel/release.md` § 2026-10-06 round).
- **Probe:** `load-cases2` committed `adea0d3`, and **probe `main` is pushed** (`482666c`, `adea0d3`).
  - P2 to P12 derive their budgets from the lifecycle bounds, with the formulas in comments, and their waits are bounded events; P10 awaits the public refusal.
  - Each negative control fails 1 case. The quiet whole `npm run test` passed in 554.7 s.
  - Under the declared load, the 12 targeted cases pass. The full loaded suite failed 3, each on a named product refusal and none on a Vitest timeout:
    - P1: `The Oxlint language server exited with code 0` during onset, under 85% synthetic load only;
    - P5: its 3 s type warm, by design;
    - an unchanged workspace-snapshot case.
  - Follow-up, unscheduled: why Oxlint exits with code 0 during initialize under extreme load.
- **The ollama store campaign resumed** on 2026-10-06 near 08:06 local, through `scaffold/tmp/codex/codex.resume.ts`.
  - It runs the same Codex session (`01a10821-2df6-71d2-a0ef-7c7e1a4db929`) with the pause note's prompt plus the Orchestrator's notes (ollama `tmp/codex/store-campaign-resume-prompt.md`). The notes say: the arms stay at `3924fbb`, and check whether Edge sync at that build could affect S2 or S3 readings.
  - Journal: ollama `tmp/codex/store-campaign-resume.jsonl`. Cap 12 hours. No other unit runs on the host until it ends.
  - **Stopped under the preregistration's identity rule** after 12.5 minutes (report ollama `tmp/codex/store-campaign-resume-last.md`). The daemon reads Ollama 0.35.1, against the registered 0.35.0; the Orchestrator read `/api/version` and confirmed 0.35.1. The model digest is unchanged.
  - Kept candidates: none. S1 (paging fixture) was reverted by its fact-exposure guards at n=16. S2 (task after the seeded view) was reverted at closure without a final ruling. S3 to S6 and acceptance never ran. The discarded S2 run 9 is archived outside the counts.
  - Edge sync: the arms launch Edge without `--disable-sync` or `msImplicitSignin`, and every store attempt runs in an isolated CDP context. The archives record no executable, sync, or network diagnostics, so sync effects on S2 cannot be excluded.
  - Branch heads kept, worktrees removed: browser and agent `store-reliability` carry no campaign commits; ollama `store-reliability` is at `2529bb2`. Ollama `main` is unchanged: 3 unpushed commits plus the uncommitted 0.0.21 version bump.
  - **The user's ruling (2026-10-06):** release ollama 0.0.21 re-pinned to browser `^0.0.26`, then run a fresh campaign on Ollama 0.35.1 and browser 0.0.26 with S0 from run 1. The user holds Ollama's auto-update for the series. Publish mcp 0.0.37 in the same round.
  - Release visits run one at a time: mcp first, then ollama.
  - **Ollama's visit failed `test:service`** on the shipping and paging store cases (scaffold `tmp/units/layer-ollama.log`). Every other gate passed, 73 of 75 service cases among them. The build equals 0.0.20; only the agent range moved, to `^0.0.26`.
    - Paging has passed in none of 17 runs since `90901da` (attempt 2's S0 and this visit), against 3 of 8 at `b4a18c3`. The bases also differ in browser build.
  - **The user ruled (2026-10-06): hold ollama 0.0.21 until campaign 3's acceptance series passes.** Its release head `58c08d8` (re-pin plus overwrite) stays local and unpushed. Campaign 3 launches on it.
  - Unit `store-campaign3` (ollama `tmp/codex/store-campaign3-brief.md`) launched on `58c08d8` on 2026-10-06, with a 24-hour cap. Its journal is ollama `tmp/codex/store-campaign3.jsonl`.
    - Two Opus reviews of the brief (preregistration integrity and operations) ruled FAIL. Every finding was repaired before launch:
      - every arm runs as registered, S1 included;
      - the in-run capture identifies the campaign Edge by its command line;
      - attempt 3's scripts take collision-free `store-campaign3-` names;
      - the 2026-10-04 rulings bind;
      - the paging reading goes only into the report.
    - Both attempt-2 candidates apply to `58c08d8` (`git merge-tree`, no conflict).
    - A run whose campaign Edge lacks either disable stops the series.
  - **Check, 2026-10-06 near 10:15 local** (scaffold `tmp/units/campaign3-status.ts`, `transcript-diff.ts`, `codex-tail.ts`):
    - S0 completed 8 runs; S1 is on run 6. Each run takes about 5 minutes. The daemon read 0.35.1 throughout, and no stop fired.
    - In every completed run, the Edge capture identified the campaign browser (Edge 154.0.4258.53, headless) carrying `--disable-sync` and `--disable-features=msImplicitSignin`. The sampler polls every 2 s and costs about 20% of one core, the same in every arm.
    - **The baseline moved.** In S0, shipping passed 0 of 8 runs (attempt 2: 13 of 16) and search 4 of 8 (13 of 16). Click and checkout passed 8 of 8, and paging 0 of 8.
      - 23 of 24 shipping attempts repeat `look` searches and never call `read` (F-1, S3's target class).
      - The system text, the page view, and the task are byte-identical to attempt 2's after masking ports and ids. The model's first reply differs: 0.35.0 wrote prose and called `look` with `shipping`; 0.35.1 writes nothing and calls `look` with `shipping cutoff time`.
      - Two input changes confound the cause. The daemon moved to 0.35.1, and browser 0.0.26's journey toolset adds `capture` and shortens the `edit` description (browser `192a9ee`, 2026-10-04). Ollama's harness enables journeys, so the model sees both.
    - **Orphaned Edge processes:** about 166 crash-handler and utility processes from earlier test launches remain, about 2.6 GB of working set. Their browser processes are gone. Most come from browser's `tests/setupGlobal.ts:174` profile (`orkestrel-browser-global-*`); the rest come from library-profile launches. The newest is from 2026-10-05 21:09, and the campaign's runs left none.
  - **The user ruled (2026-10-06): all three recommendations.**
    - Let campaign 3 run.
    - When it ends, terminate the orphans: `node tmp/units/edge-orphans.ts --kill` from scaffold, after a dry run.
      - The script lists only `msedge.exe` helpers that have an `orkestrel-browser-` profile, a `--type=` switch, and a dead parent. Its dry run listed exactly the 166.
    - Then launch unit `toolset-probe` (ollama `tmp/codex/toolset-probe-brief.md`).
      - It measures the first reply on 0.35.1 under four toolset arms: attempt 3's definitions, without `capture`, attempt 2's with `capture`, and attempt 2's. That separates the toolset from the daemon.
      - When a toolset change is named, it runs full shipping and search attempts without that change.
  - Unscheduled follow-up: why Edge helpers outlive their browser on Windows after a test launch's teardown (browser `tests/setupGlobal.ts:174` and library-profile launches through 2026-10-05).
  - **The user ruled (2026-10-06 near 11:15): 24 hours is too long.** Stop, run the probe, then a lean rerun. The rerun runs without journey, 8 runs per arm with no extensions, S3 to S5, then acceptance, in about 4 to 5 hours in total.
    - **Campaign 3 stopped** near 11:20 by a process-tree kill. The interrupted S1 run 15 sits outside the counts in attempt-3 `discarded-stop/`. No ruling was taken. Pass counts:

      | Arm | Runs | Shipping | Click | Search | Checkout | Paging | Journey |
      | --- | --- | --- | --- | --- | --- | --- | --- |
      | S0 | 16 | 0 | 16 | 12 | 16 | 0 | 4 |
      | S1 | 14 | 1 | 14 | 12 | 14 | 0 | 3 |

    - S1's first look at 8 runs: paging F-15 fell from 5 of 8 to 0 of 8 (p = 0.013 against 0.0042), so its registered extension ran until the stop.
    - The attempt-3 worktrees are removed. Each repository keeps its `store-reliability-3` branch: ollama `c486c53` carries the S1 cherry-pick, and browser and agent sit at their bases.
    - The 166 orphaned Edge helpers are terminated (`edge-orphans.ts --kill`: 166 terminated, 0 failed), and a recount finds 0.
    - **Unit `toolset-probe` launched**, with a cap of 90 minutes (ollama `tmp/codex/toolset-probe-brief.md`, journal `tmp/codex/toolset-probe.jsonl`).
    - The lean rerun's brief follows the probe's ruling.
  - **The toolset probe ruled: the toolset causes the divergence** (45 minutes; ollama `tmp/codex/toolset-probe-last.md`, evidence under `tmp/codex/toolset-probe/`).
    - On Ollama 0.35.1, attempt 2's definitions reproduced attempt 2's archived first replies exactly in 40 of 40 literal replays, across all five page tasks.
    - Full runs with attempt 2's definitions on 0.35.1: shipping passed 14 of 16 (campaign 3's S0: 0 of 16) and search 14 of 16 (12 of 16).
    - Both browser edits are needed. Removing `capture` alone does not restore the archived reply, and neither does restoring the older `edit` description alone. Together they do.
    - The first reply is repeatable for fixed input bytes, yet a different loopback port in the seed changes it. This model's tool choice at temperature 0 is sensitive to input bytes that carry no meaning for the task.
    - The daemon upgrade is not needed to produce the divergence. Whether it contributes to other outcomes is not established.
  - **The user ruled (2026-10-06): lean rerun on browser 0.0.26 as shipped.**
  - **Unit `store-campaign4` launched** near 12:50 local, capped at 4.5 hours (ollama `tmp/codex/store-campaign4-brief.md`, journal `tmp/codex/store-campaign4.jsonl`).
    - An Opus review of the first draft ruled FAIL, and every repair is in the launched brief:
      - the classifier ignores the skipped journey;
      - S0's 16 runs are reclassified into `attempt-4/` and checked against campaign 3's 8;
      - Fisher compares 16 against 8;
      - there is no `extend` outcome, and guards are rates;
      - the registered guards, including F-2;
      - a cap-safe acceptance start;
      - the preregistration's arm labels;
      - an identity check against S0's hashes.
    - The Orchestrator ruled two further items:
      - S4 gets a paging F-15 guard, because it runs without rank 3;
      - an arm whose test cannot settle even at 0 of 8 is skipped and recorded.
    - The design:
      - Control: campaign 3's S0.
      - Arms: S3, S4, and S5, at 8 runs of the store tasks only, one look, alpha 0.05/3 each.
      - Acceptance runs only after an arm passes every page task in all 8 runs.
  - **Campaign 4 finished** in 87 minutes, uncapped, and kept no candidate (ollama `tmp/codex/store-campaign4-last.md`, records under `attempt-4/`).
    - S0's 16-run reclassification reproduced campaign 3's 8 classified runs exactly, and every identity hash matched.
    - **S3 (rank 1):** target F-1 stayed in 8 of 8 runs (control 16 of 16, p = 1). Search fell from 12/16 to 3/8, and it was reverted (browser `76b6130`).
    - **S4 (rank 2):** target F-14 stayed in 8 of 8 (control 14/16). Shipping moved from F-1 to F-2 in 8 of 8, click fell to 6/8, and search to 1/8, and it was reverted (browser `322fcd0`, ollama `2fd1082`).
    - **S5:** skipped. Its target appears in 1 of 16 control runs, so p(0/8) = 0.667.
    - **Acceptance:** skipped. S0 passed every page task in none of its 16 runs. Its one-sided 95% lower pass bounds are shipping 0%, click 82.9%, search 51.6%, checkout 82.9%, and paging 0%.
    - Nothing was pushed. Every worktree was removed, and each `store-reliability-4` branch keeps its reverts.
  - Under the standing constraints, acceptance is out of reach: the same model, no budget or oracle change, and browser 0.0.26's copy. The local daemon also holds `hf.co/sky7350/Mica-v0.1-4B` and `qwen3.8:latest` (27.3B, 16.5 GiB), and the registry serves `qwen3.5:4b-q4_K_M` at 3.10 GiB (read 2026-10-06).
  - **The user ruled (2026-10-06): try qwen3.5 4B.** The ruling approves the download.
    - Measure the store tasks 8 times on browser 0.0.26, unchanged.
    - If every page task passes in all 8 runs, run the 29-run acceptance with it and propose moving the live cases to it. Otherwise stop and report.
    - The download is pulled through `ollama pull`. The harness takes the model from `OLLAMA_MODEL` (ollama `tests/setupService.ts:13`), so the unit changes no code.
    - Pulled `qwen3.5:4b-q4_K_M` (digest `d8b0f5e9760c…`, 3.1 GiB). The daemon stays 0.35.1.
    - Unit `store-model4b` launched near 14:35 local (ollama `tmp/codex/store-model4b-brief.md`, journal `tmp/codex/store-model4b.jsonl`), with a cap of 4.5 hours.
  - **The user (2026-10-06):** "a model as small as the 2b" must run these tests; if the 4B cannot do them all without an issue, the cause lies deeper in the implementation. The tests must also be tuned for time.
    - `store-model4b` was stopped during setup. Its records are in `model-4b-stopped-setup/`.
    - Unit `model4b` relaunched it as a quick answer: stop at the first failed run, at most 8 runs, no acceptance, a 75-minute cap.
  - **4B answer** (ollama `tmp/codex/model4b-last.md`): it completed 1 run and failed 3 of the 5 page tasks.
    - Shipping passed in 36 s, and cart passed.
    - **Search and checkout:** both answered correctly, but an unsolicited `record` journey call returned 4,087 and 4,086 characters. That breaks `BROWSER_TOOL_LIMIT` (4,000), which the shared assertion requires of every result (ollama `tests/service/browser.test.ts:130`, `tests/setupStore.ts:1411`). **This is a browser library defect.**
    - **Paging:** it answered the token correctly through search, without the `read` continuation the case pins.
    - **Checkout:** it clicked Place order after `type` had already submitted, ignoring the instruction to wait, which created 2 orders per attempt.
  - **Workflow `store-implementation-investigation` launched** (run `wf_8a2ad37c-d95`), with the 2B as the target.
    - Map: Grok lanes for the surface, the harness and time, and the transcripts, plus Opus external research.
    - Design: three Opus designers, one each for the surface, the harness and oracles, and the economics.
    - Then an Opus synthesis and an Opus review.
  - **Investigation finished** (44 minutes; outputs in `lifecycle/store-design/`).
    - The Grok map lanes returned briefs, not distillates, because the workflow's `grok` driver had no shell. The designers and the synthesis read the sources themselves.
    - **The plan** (`store-design/synthesize.md`) separates three kinds of cause:
      - **Library defects:**
        - L2: journey results are unbounded;
        - L1: a `look` search reaches only referenced elements, never page text;
        - L3: the agent JSON-encodes string tool results.
      - **Harness and oracle defects:**
        - H1: page tasks advertise 7 unneeded journey tools;
        - H2: paging seeds a `look` view yet counts only `read` footers, and its token line shares search words with the prompt;
        - H3: search retries on a weaker predicate than it asserts;
        - H4: an unread meter costs about 6 s per attempt;
        - H5: checkout accepts a double order that the journey oracle depends on.
      - **Surface:** the model follows the last footer, not the system prompt.
    - **Ranked changes:**
      1. ollama: page tasks advertise only page tools.
      2. ollama: paging seeds with `read`, the oracle counts the seed's footer, and the token section shares no search word.
      3. ollama: the search predicate equals its assertion.
      4. ollama: drop the unread meter.
      5. browser: bound every journey result.
      6. browser: `look` and `read` searches reach page text and carry a matched heading's section.
      7. agent: string tool results reach the model unchanged.
      - Deferred: the checkout single order (R1).
    - **Experiments:** E1 to E5, about an hour of daemon time.
    - **Per-case budgets:** the five store tasks at 75 s or less in total, against 173.5 s.
  - **The review ruled FAIL** (`store-design/review.md`):
    1. The guards cannot detect a material fall at the planned counts. They need preregistered non-inferiority margins.
    2. Change 2 widens the paging oracle and needs the user's ruling.
    3. `secret` stays on `type` without journeys.
    4. The section carry cannot work for `plain`.
    5. Change 5 must slice the view to the room left after the prefix, so its footer offset stays exact.
    - Findings 6 to 11 are low: wording, decision rules for every count, the `vitest list` scope, the time budget (shipping turns take about 5.5 s, and the warmup reloads at 16,384), and a `read` seed lists no references.
    - Outside its claims: change 7 reaches every live tool test, and the 2B's F-21 journey calls caused no 2B failure.
  - **The user ruled (2026-10-06): unify the reading surface.** Fold `look`, `read`, and `plain` into one line-addressed read: numbered lines with references inline, from and to ranges with a bounded default, and a grep-style search.
    - All three library changes go in, the double-order trio goes in this round, and confirmation is 16 runs.
    - **Campaign opened:** `lifecycle/reading/campaign.md`, with the exit criterion.
    - **Absorb running:**
      - map: `tmp/units/reading-map.txt`;
      - Grok lane `reading-absorb` (scaffold `tmp/cursor/`), on the internals and the prior reading design under `showcase/browse/reading-design/`;
      - research lane on line-addressed reading in coding and browser harnesses.
    - **Consumers:** only ollama's harness consumes the toolset in code. Six repositories carry the guide as a mirror.
- **Probe:** `load-cases` committed P1 (`482666c`, the handshake diagnostic; its loaded rerun passed and named no bound). It stopped at P10, where no public event marks a failed idle refill. The Orchestrator ruled to observe the spent floor's refusal through `prove`, since pool refuses only after pending refills settle. Running: `load-cases2`.

1. **Probe under heavy load:** probe's whole `npm run test` under a synthetic 85% CPU load (14 busy workers) fails 12 timing cases across 3 files: handshake, warm, and deadline (probe `tmp/codex/teardown-load2-last.md`, `teardown-load2-suite-loaded.err`). Release visits run alone and pass. Rule whether to size those cases to the load a release host sees, after reading which bound each one holds.
2. **The ollama store campaign** stopped on 2026-10-06 when the daemon changed from 0.35.0 to 0.35.1, with no candidate kept. mcp 0.0.37 is published. Ollama 0.0.21 is held for campaign 3's acceptance series, and `store-campaign3` runs on its release head.
3. **mcp items 13 and 14.**
4. **Veneer's re-pin** to browser `^0.0.26`, probe `^0.0.21`, and scaffold `^0.0.93` is the cloud session's (`lanes.md`, 2026-10-06 entry).

Closed in the 2026-10-05 round, with the history in the earlier sections:
- the contexts campaign (C1 to C3, M1, M2, and the follow-up);
- ROADMAP items 14, 15, and 16;
- the implicit sign-in fix;
- probe item 1;
- the worker re-pin.

Earlier entries, kept for the record:

1. Superseded: ROADMAP item 15 (the document-startup flake), now blocking browser 0.0.25. Closed by `--disable-sync` in browser 0.0.25.
2. Superseded: the contexts campaign, C1, C2, C3, M2, and the release.
3. Done: browser `ROADMAP.md` item 16, the service-worker defect candidate (M1 result). Ran in parallel with C1b at the user's request (2026-10-05): unit `item16` in the worktree browser `tmp/worktrees/item16` (branch `item16` from `fd362be`, `node_modules` by `npm ci`, pool 0.0.15), brief and journal under that worktree's `tmp/codex/item16*`, cap 3 hours. It owns `src/core/BrowserPage.ts`, `BrowserWorker.ts`, their core tests, one case in `tests/service/browser.test.ts`, and item 16's removal; `BrowserContext.ts` and `src/core/types.ts` are report-only because C1b owns them. Merge the branch into `main` after C1b lands. Result (2026-10-05, 13 minutes, `tmp/codex/item16-last.md` in the worktree): `#attachWorker` awaited `Runtime.enable` before resuming, and a paused service worker cannot answer it (traces `tmp/probes/item16/traffic.json` against `traffic-green.json`); the fix queues the enable, resumes a service worker, then awaits the reply before publishing it, and a non-frame target reported by a frame session is resumed and detached instead of left paused. Three cases, each red without its mechanism (real-browser activation about 1.1 s green); `test:src:core` 1247 passed; `tests/service/browser.test.ts` alone 43 passed. Uncommitted in the worktree. The Opus objective review (`review-item16.md`) ruled FAIL on a forbidden test deferred and two guide overclaims; the code fix holds. Unit `item16fix` repaired all six findings (`tmp/codex/item16fix-last.md`); dedicated and shared workers start under the page setup on Edge 154 with no ordering change, so only the service worker needed it. Landed: browser `main` `e8aa649` (fast-forward, pushed 2026-10-05); the worktree and branch are removed, and its records sit in browser `tmp/codex/item16*` and `tmp/probes/item16/`. Item 16 is closed; it publishes with the next browser release.
4. The paused ollama store campaign (`ollama/tmp/codex/store-campaign-pause.md`): resume the same Codex session from S2's extension when the host can stay quiet for hours.
5. `@orkestrel/worker`'s re-pin to pool `^0.0.15` (and later 0.0.16), probe item 1 (brief at probe `tmp/codex/eager-probe-brief.md`), mcp items 13 and 14.

## Unpublished work across the fleet (read 2026-10-05, scaffold `tmp/units/fleet-status.ts` and `fleet-deps.ts`)

- Material and unpublished:
  - **pool:** `3ff0c63` and `1f194d7` (capacity, the idle-loss strike) go out as 0.0.16.
  - **browser:** 0.0.25 is prepared and held for item 15, plus item 16 (`e8aa649`), C1 (`6bedbb1`), and C2 and C3 when they land.
  - **scaffold:** 64 commits since 0.0.92, including the cloud session's S46 Oxlint rule and both sessions' records; the cloud session's lanes coordinate its release.
  - **worker:** owes a re-pin to pool 0.0.16, which changes its runtime range.
- Unpublished by design:
  - **ollama:** local 0.0.21 with 3 unpushed commits and a dirty manifest, held by the paused store campaign.
  - **supervisor:** local 0.0.2, dropped from the waves.
  - **veneer:** never published.
- Every other package carries only post-release visit commits (scaffold overwrites and devDependency re-pins). Their runtime dependency ranges match their published manifests.
- `mcp` 0.0.36 and `server` 0.0.22 were published after their last source commits, at 2026-10-04T01:20Z and 2026-10-01T21:01Z.

## Rules that bind the rest

- Tests pin claims at the least cost; report durations; never weaken a pin; no retries or longer waits to hide a failure.
- The desktop session writes no veneer path; it logs each `browse` release veneer consumes in `scaffold/.orkestrel/veneer/lanes.md`.
- Every unit's records go in its checkout's `tmp/` and this folder; commit and push each green checkpoint.

# Parallel holders — status and hand-off (updated 2026-10-05)

**Owner: the desktop session.** No other session takes over this work, or acts as if it has, unless the user gives the explicit go-ahead (the user, 2026-10-05). A session that reads this file without that go-ahead reads it for context only.

The design records sit beside this file: `synthesis.md` and `review-h2.md` (the holder tools, shipped in browser 0.0.24), `readings.md` (H6 contention), and the contexts round (`contexts-design-brief.md`, `contexts-proposal-analyst.md`, `contexts-proposal-planner.md`, `contexts-attack.md`, `contexts-synthesis.md` with the user's rulings).

## Published

- Pool 0.0.15 (`4c589c6`), browser 0.0.24 (`b81c22c`), scaffold 0.0.92 (`5612beb`), on 2026-10-04; record `scaffold/.orkestrel/release.md` § 2026-10-04 evening round.

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
- Running: unit `contexts-c1` (brief browser `tmp/codex/contexts-c1-brief.md`, launched 2026-10-05 near 09:55, cap 4 hours, journal `tmp/codex/contexts-c1.jsonl`). It builds against pool `main` `1f194d7`, installed in browser `node_modules` with `npm install --no-save` from pool `tmp/pack/pool-main-1f194d7.tgz`; `package.json` keeps `^0.0.15` until the release re-pins 0.0.16, and an `npm ci` in the browser checkout restores 0.0.15 and breaks the C1 build until then.
- Pool ROADMAP item 1 (a waiter waits while a release could return capacity above floor 1) names the contexts consumer at `BROWSE_POOL` greater than 1 as its trigger; the default size 1 never reaches it, and the analyst's proposal (§ 7) argues the opposite rule for browse (terminal unavailability rather than waiting on another holder). Rule it before the release, not inside C1.
- Units in order (`contexts-synthesis.md` § Units): M1 feasibility and sizing (extend browser `tmp/probes/contexts/`, whose first run `run-swgN81` and report are the pilot), P1 pool shared leases (pool 0.0.16), C1 contexts in browse, C2 real-Chromium proofs, C3 guide and roadmap, M2 confirmation, release (pool 0.0.16, browser, scaffold re-pin).

## Evidence and instruments

- H6 instrument: browser `tmp/probes/holders/` (`node tmp/probes/holders/main.ts [--control] [--load] --sizes 1,2,3 --count 5`); runs `run-9IesXQ` (quiet), `run-7fAPBz` (loaded); readings in `readings.md`.
- Contexts probe: browser `tmp/probes/contexts/` (`report.md`, `run-swgN81/record.json`).
- Duration census: browser `tmp/probes/test-census.ts --label NAME` (before and after summaries under `tmp/probes/census/`).
- Unit briefs and reports: browser `tmp/codex/*-brief.md` and `*-last.md` (holders-h1 to h6b, item6 to item8, gone, keepalive, service-flakes, replay-race, test-tune, contexts-probe).

## Open, in order

1. ROADMAP item 15 (the document-startup flake), now blocking browser 0.0.25: find the cause without perturbing the run (it vanished under every instrumented run), fix it, then finish 0.0.25 (commit the bump and stamp, push, publish with the user's code, confirm, log for veneer in `lanes.md`).
2. The contexts campaign: C1, C2, C3, M2, and the release.
3. Browser `ROADMAP.md` item 16, the service-worker defect candidate (M1 result): its own diagnosis unit, because a browse page that registers a service worker meets it with or without contexts.
4. The paused ollama store campaign (`ollama/tmp/codex/store-campaign-pause.md`): resume the same Codex session from S2's extension when the host can stay quiet for hours.
5. `@orkestrel/worker`'s re-pin to pool `^0.0.15` (and later 0.0.16), probe item 1 (brief at probe `tmp/codex/eager-probe-brief.md`), mcp items 13 and 14.

## Rules that bind the rest

- Tests pin claims at the least cost; report durations; never weaken a pin; no retries or longer waits to hide a failure.
- The desktop session writes no veneer path; it logs each `browse` release veneer consumes in `scaffold/.orkestrel/veneer/lanes.md`.
- Every unit's records go in its checkout's `tmp/` and this folder; commit and push each green checkpoint.

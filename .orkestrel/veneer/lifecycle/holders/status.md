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
- Running: probe U5 docs (`eager-probe-u5`, probe `tmp/codex/eager-probe-u5-brief.md`). Then U6 (Opus review) and U7 (gates); push probe after U7.
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

## Open, in order

1. ROADMAP item 15 (the document-startup flake), now blocking browser 0.0.25: find the cause without perturbing the run (it vanished under every instrumented run), fix it, then finish 0.0.25 (commit the bump and stamp, push, publish with the user's code, confirm, log for veneer in `lanes.md`).
2. The contexts campaign: C1, C2, C3, M2, and the release.
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

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

## The contexts campaign (ruled, not started)

- The user's rulings (2026-10-05): holders become isolated contexts on pooled browsers; a per-browser bound `BROWSE_CONTEXTS` with total admission `size × contexts`; the shared holder counts; the call-paced relaunch loop is a recorded limit; the default `BROWSE_POOL` stays 1 until contexts land; the default topology is ruled from M1.
- Units in order (`contexts-synthesis.md` § Units): M1 feasibility and sizing (extend browser `tmp/probes/contexts/`, whose first run `run-swgN81` and report are the pilot), P1 pool shared leases (pool 0.0.16), C1 contexts in browse, C2 real-Chromium proofs, C3 guide and roadmap, M2 confirmation, release (pool 0.0.16, browser, scaffold re-pin).

## Evidence and instruments

- H6 instrument: browser `tmp/probes/holders/` (`node tmp/probes/holders/main.ts [--control] [--load] --sizes 1,2,3 --count 5`); runs `run-9IesXQ` (quiet), `run-7fAPBz` (loaded); readings in `readings.md`.
- Contexts probe: browser `tmp/probes/contexts/` (`report.md`, `run-swgN81/record.json`).
- Duration census: browser `tmp/probes/test-census.ts --label NAME` (before and after summaries under `tmp/probes/census/`).
- Unit briefs and reports: browser `tmp/codex/*-brief.md` and `*-last.md` (holders-h1 to h6b, item6 to item8, gone, keepalive, service-flakes, replay-race, test-tune, contexts-probe).

## Open, in order

1. ROADMAP item 15 (the document-startup flake), now blocking browser 0.0.25: find the cause without perturbing the run (it vanished under every instrumented run), fix it, then finish 0.0.25 (commit the bump and stamp, push, publish with the user's code, confirm, log for veneer in `lanes.md`).
2. The contexts campaign, M1 first.
3. The paused ollama store campaign (`ollama/tmp/codex/store-campaign-pause.md`): resume the same Codex session from S2's extension when the host can stay quiet for hours.
4. `@orkestrel/worker`'s re-pin to pool `^0.0.15` (and later 0.0.16), probe item 1 (brief at probe `tmp/codex/eager-probe-brief.md`), mcp items 13 and 14.

## Rules that bind the rest

- Tests pin claims at the least cost; report durations; never weaken a pin; no retries or longer waits to hide a failure.
- The desktop session writes no veneer path; it logs each `browse` release veneer consumes in `scaffold/.orkestrel/veneer/lanes.md`.
- Every unit's records go in its checkout's `tmp/` and this folder; commit and push each green checkpoint.

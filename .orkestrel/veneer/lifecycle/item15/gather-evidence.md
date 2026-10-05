# gather:evidence

ITEM 15: FACTUAL RECORD (read-only; nothing edited or run except file reads, timestamp listings, and a streaming read of one retained netlog)
Paths: B = C:\Users\mikes\WebstormProjects\browser\, C = B\tmp\codex\.

EVIDENCE

1. Run series. All runs used a fresh temp profile per describe, headless, args --no-sandbox, --disable-dev-shm-usage, --disable-gpu (B\tests\service\document.test.ts:73-83; B\tests\setupService.ts:484-488).

2026-10-04:
- ~20:00 census, failed on 'captions' (B\tmp\probes\census\before\summary.md:254).
- 20:04:41 failed on 'placeholder visibility' plus the renderer-crash case (C\test-tune-service-before.log:268-269; .err:1-79,87).
- 20:13:08 failed on 'invisible button' WITH a page Network.loadingFailed listener (C\test-tune-diagnose.log:65-79,147-149).
- 22:06:51 failed on 'image privacy' (C\service-flakes-before-2.log:73; .err:1-76).
- 22:10:11 failed on 'foreignObject' (C\service-flakes-before-3.log:73).
- 22:13 to 22:27, four instrumented runs passed (C\service-flakes-last.md:10-17).
- 22:39, the keep-alive probe ran (C\keepalive-probe.log).

2026-10-05:
- 01:22:13 failed on 'selection', invoked through PowerShell npm.ps1 (C\r25-test-service.log:1-6,73-74,180).
- 01:39:28 failed on 'slot privacy' (C\r25-test-service-2.log:73-74,168).
- item15 runs through the launcher with node npm-cli.js (C\item15-last.md:25-30,37):
  - 01:46:34 failed the renderer-crash case (C\item15-before-1.err:6-7).
  - 01:50:37 passed.
  - 01:54:06 failed on 'SVG switch first branch'.
  - 01:58:57 passed.
- 02:07 to 02:20, five item15b controls passed (C\item15b-control-N.log:69).
- ~02:24, the item15b treatment run, with the flags at C\item15b-last.md:37-50:
  - It hit the 360 s cap (C\item15b-treatment-1.err:4).
  - The second test of the run failed (C\item15b-treatment-1.log:4). The log does not name the case, and the cap left no Vitest summary.
  - The document suite showed no failure (log:47,71).
- 02:33:20 failed on 'groups' (C\r25-test-service-3.log:73-74,168). This run is missing from status.md's list.
- 07:06 to 07:08, the item15c freeze probe (C\item15c-last.md:36-37).
- item15d runs with netlog, invoked as powershell npm (C\item15d-last.md:5-14,31):
  - 07:13:37 passed.
  - 07:17:07 failed the renderer-crash case only.
  - 07:20 to 07:31, four runs passed.
- 07:37 to 07:57, engine-split: Edge three of three and Chromium three of three passed (B\tmp\probes\engine-split\*.log:77).

2. Captured failure signature. Every capture reads hidden, readyState 'complete', dataset {}, toolset 'undefined'. The cancelled requests are always the last import wave:
- {codec, sse}: test-tune-diagnose.err:58-67; service-flakes-before-2.err:58-68; -before-3.err:58-68; r25-2:131-141; r25-3:131-141.
- {html, markdown}: test-tune-service-before.err:70-79; item15-before-3.err:72-81.
- All four (codec, sse, html, markdown): r25-test-service.log:131-153.
- Each cancelled request ended with status 0 and size 0 within 0.1 to 0.6 ms. Earlier waves answered 200.

3. Full capture C\item15-failure-full-3.json (identical to item15-failure.json):
- Prior cases (lines 4-114): the two hidden-tab cases at about 7.0 s each, then five capture cases at about 0.24 s each. The failing case started 1791179824208, which is 01:57:04.208 local.
- html and markdown (lines 484-554): fetchStart 51.6 and 51.7 ms, responseEnd 51.9 ms, domainLookupStart, connectStart, and requestStart all 0, nextHopProtocol empty. They never reached a connection. Initiator 'script' for all requests. No cancellation reason was recorded.
- codec and sse: 200 at 43.8 to 47.6 ms (lines 412-482).
- Targets (lines 558-790), all in one browser context:
  - extension service workers (3) and extension offscreen pages (2)
  - ntp.msn.com New tab (attached) with its worker
  - a Capital One Shopping onboarding page with ad and reCAPTCHA frames
  - a claude.ai OAuth "Just a moment..." page with a Turnstile frame
  - edge://sync-confirmation-dialog
  - the document page
- Both managed pages were hidden and unfocused (lines 792-808). The animation frame did not fire within 1477.7 ms (lines 810-813).
- The NTP worker URL carries mainTimeOrigin 1791179822614.8, which is 01:57:02.614 (line 604). That is 1.59 s before the failing case and about 0.35 s before the second hidden-tab case ended (815950 + 7010.6 ms). The onboarding ad request time is 01:57:08.239 (line 693).
- No console output was captured.

4. CDP errors. The test-tune diagnostics recorded `net::ERR_ABORTED` with `canceled: true` and `blocked: undefined` for the failing case's request ids 29392.10 and 29392.11 (C\test-tune-diagnose.log:66-79).

5. Hypothesis experiments:
- Keep-alive race: 350 reloads at 20 ms and 100 ms idle-close deadlines produced 0 status-0 loads (C\keepalive-last.md:5-13). The control was valid as a detector, but its signature was ERR_EMPTY_RESPONSE (keepalive-last.md:11), not the observed cancel before requestStart.
- Server read failure: excluded by the handler reading (C\item15-brief.md:13). The zero requestStart timing (item 3) independently shows the server never saw the cancelled requests.
- Animation frame: in a hidden page with no frame, the toolset still started; the foreground control fired a frame (C\item15-hidden-startup.json:1-12). The control was valid. This hypothesis was already inconsistent with the cancelled modules.
- Freezing: a forced Page.setWebLifecycleState freeze, with the codec response held by a raw-session Fetch interception, gave `interactive` and no status-0 requests (C\item15c-last.md:5-16). It is one mechanism test with an altered loading path. The field readings (freeze listeners and power state per run) were never collected (item15c-last.md:20). The only power reading was taken after the probe: Balanced, battery class unavailable (line 22).
- Playwright-style flags: the controls failed 0 of 5, so no baseline rate existed. The single treatment run hung (item15b-last.md:5-22,33). With the flags, the NTP was edge://newtab/ and no extension targets appeared at startup (C\item15b-treatment-1-document-targets.json:1; renderer-targets.json:1).
- Network log: 0 of 6 document failures with netlog on (C\item15d-last.md:16-20). The browse launch paths were not logged, and each document netlog reached about 500 MB.
- Engine split: no positive control. results.json reads "no summary" for every run while the logs show passes. The logs are UTF-16, but the probe reads them as UTF-8 (B\tmp\probes\engine-split.ts:18-20). The logs do not record which executable ran.
- Double navigation and cross-page interception: ruled out by code reading only (status.md:23).

6. My own reading of the passing item15d-2 document netlog (B\tmp\probes\netlog\item15d-2\document_test_ts-...-983e1c8c...json). Times are relative to the first ntp.msn.com event (line 130):
- login.live.com at +0.3 s (line 2606), sync at +0.6 s (line 7716).
- Extension crx downloads at +0.2 s (lines 1800, 2188).
- claude.ai OAuth at +21.9 s (line 166213), onboarding at +24.0 s (line 201292).
- Codec module waves at +21.8, +22.3, +23.9, and +24.2 s, all without error (item15d-last.md:18).

7. Not recorded anywhere: Edge processes left over from earlier runs, Windows activity, focus or foreground state, and the per-run power source. The journals contain only Get-Process checks of the launcher's own PID (C\item15.jsonl:56; item15d.jsonl:51-53). No profile is reused across describes.

CORRELATIONS (facts, as observed)
- The failures cluster into early-series blocks: 10-04 evening, about 20:00 to 20:13 and 22:06 to 22:10; 10-05 about 01:22 to 02:33. The later blocks passed, apart from two renderer-crash failures.
- The failing case's position in the capture table (B\tests\setup.ts:101-311) ranges from 6 to 36. At about 0.24 s per case, that puts the failure about 15 to 24 s after the document browser's start.
- Shell form does not separate the outcomes. PowerShell npm failed 3 of 3 for r25 but 0 of 12 for item15d and engine-split.
- ROADMAP item 15's statement "never under instrumentation" is contradicted by the 20:13:08 run.

OPINION (unverified)
- A browser-side cancel before dispatch fits the fresh-profile Edge sign-in, sync, and extension-install activity better than any server cause. The NTP reload at 01:57:02.6, 1.6 s before the cancellation, fits this.
- The passing netlog run shows the same environment without failure, so that activity is at most a timing-dependent trigger.
- The decisive gaps:
  - No failure has been captured with renderer-side cancellation provenance, such as a Network.loadingFailed record on the failing page, the extension load times, or Target created events with timestamps.
  - No run has paired the flags with a session whose baseline failure rate was nonzero.
- Test next: whether extension loading resets the renderer's URL loader factories while a module wave is in flight. This is a hypothesis, not established.

# gather:code

Finding: nothing in the code under test cancels these module requests. The only failure capture shows that Edge's sign-in and sync had installed synced extensions into the test's own fresh profile, and those extensions were opening tabs during the window when the failing page loaded. The most likely way a request ends at status 0 with zero bytes in 0.2–0.3 ms is that the browser fails or blocks it before it reaches the network. An extension blocking the request, or the browser rewiring request handling while an extension loads, would do that. This is my opinion and is not proven.

Paths are relative to C:\Users\mikes\WebstormProjects\browser unless absolute.

What the evidence shows (tmp/codex/item15-failure-full-3.json):
- The failed requests were `@orkestrel/html` and `@orkestrel/markdown`, not codec and sse, in this capture (:485-554). Each has `responseStatus` 0, `transferSize` 0, a duration of 0.3 ms and 0.2 ms, and empty `nextHopProtocol` and `contentType`. They started at 51.6 and 51.7 ms. They were the last batch of the module graph: `dist/src/core/index.js` imports them (dist/src/core/index.js:3-4) and finished at 41.8 ms (:405).
- Every other request returned 200 with full bytes (:157-482).
- `workerStart` is 0 everywhere, so no service worker controlled the page (:136 and the matching lines in every entry).
- At most 5 requests were in flight at once; the batch at :235-395 starts between 27.8 and 28.7 ms. That is under Chromium's limit of 6 connections per host.
- The test page shares `browserContextId` A2B5… with the following targets:
  - service workers for three extensions (:561-588);
  - a Capital One Shopping "Onboarding" page whose ad request is stamped `dt=1791179828239` (:670-694), about 4 s after the failing case began at 1791179824208 (:106);
  - a claude.ai OAuth page that redirects to `chrome-extension://fcoeoabgfenejglbffodgkkbkcdhcgfn` (:742);
  - `edge://sync-confirmation-dialog/` (:764);
  - an MSN new-tab page with `mainTimeOrigin=1791179822614.8` (:604), which falls inside the previous case (:30).
- Both page targets the harness inspected read `hidden` and `focus: false` (:793-807), so a third tab was in front.
- The failed import is static, so the page's `try/catch` never runs (tests/setupServer.ts:1226-1238). That explains the empty `dataset` and the 10 s precondition timeout (tests/setupService.ts:863-887) instead of a `failed` message.

Launch and profile:
- Edge gets a fresh temp profile for each file (tests/service/document.test.ts:73-83). The flags are `--no-sandbox`, `--disable-dev-shm-usage`, `--disable-gpu` (tests/setupService.ts:484-488), `--no-first-run`, `--no-default-browser-check` (src/server/constants.ts:35-38), `--headless=new`, `--user-data-dir`, and `--remote-debugging-port` (src/server/helpers.ts:457-460).
- No flag turns off sync, sign-in, extensions, or background networking.
- The treatment in unit `item15b` added those flags. Its first run hit the 360 s cap with no diagnosis, and its startup snapshots show no extension targets (tmp/codex/item15b-last.md:19-31, 38-49). It neither confirms nor rules this out.

Each mechanism, and whether this code can trigger it:
1. **Navigation or reload while loading:** no. A page is created at `about:blank` and navigated once (src/core/BrowserContext.ts:188-216). `Page.stopLoading`, which would cancel in-flight loads, is sent only when the navigation itself fails (src/core/BrowserPage.ts:782-786, 1679-1685). A failed navigation would make `browser.create` throw, but the run got past it to the precondition. The capture has a single `navigationId` (5115).
2. **Target close or context dispose:** no. `afterEach` closes the previous page (tests/service/document.test.ts:102-105) before the next one exists. The default context is never disposed; `Target.disposeBrowserContext` (src/core/BrowserContext.ts:385) applies only to a context with an id, and this file uses `browser.create`, which takes the default context.
3. **Another test file's server shutdown or port reuse:** no. Files run one at a time (vite.config.ts:418). Each file's fixture server binds port 0 (node_modules/@orkestrel/test/dist/src/server/index.js:878) and closes only in `afterAll` (tests/service/document.test.ts:69-70, 89-91; index.js:887-893). The CDP port comes from `reservePort` after the fixture already holds its own port (tests/setupServer.ts:135-143; document.test.ts:69, 75).
4. **Fixture closing sockets, keep-alive, server read failure:** no. The handler answers every module path with 200, or 404 or 500 when a file is missing or unreadable (tests/setupServer.ts:1488-1500). It never destroys a socket in the middle of a request. A 0.2 ms failure doesn't fit a reset on a reused connection either, because Chromium retries a GET that fails that way.
5. **Per-host connection limit and HTTP/1.1 head-of-line blocking:** they can queue requests but cannot fail them, and the queue never filled (see the evidence list).
6. **CDP commands:**
   - The page session sends `Page.enable`, `Runtime.enable`, `Target.setAutoAttach` with `waitForDebuggerOnStart`, `Page.setInterceptFileChooserDialog`, `Page.setLifecycleEventsEnabled`, `Browser.setDownloadBehavior`, and `Network.enable` (src/core/BrowserContext.ts:507-538; src/core/BrowserNetworkManager.ts:259). None of these cancels a load.
   - `Fetch.enable` is sent only when routes or credentials are set (BrowserNetworkManager.ts:272-290). This file sets neither.
   - `Emulation.setDeviceMetricsOverride` (BrowserContext.ts:542) changes layout only.
   - `Network.setCacheDisabled` runs on a separate Playwright session in one case (tests/service/document.test.ts:322).
   - Two Playwright `connectOverCDP` connections are never closed (document.test.ts:289, 311), so Playwright attaches to every page created after them. Both come after the failing capture case in the file, so they can't explain this capture. Neither command is known to cancel loads.
7. **Page made hidden:** yes, the page was hidden, but tabs opened by extensions or sync explain that. Chromium doesn't cancel fetches when a page is hidden, and unit `item15c` ruled out freezing.
8. **Service worker:** no for the page (`workerStart` 0). Extension service workers were present (:561-588).
9. **CORS or MIME:** no. All requests are same-origin and served as `text/javascript` (tests/setupServer.ts:1496-1499). A MIME refusal happens after the response arrives, so it would show status 200 with bytes, not status 0.
10. **Caching:** no. No `Cache-Control` or validators are sent (tests/setupServer.ts:1496-1499), and every entry that succeeded transferred its full body, so nothing was served from cache.

Opinion (not verified):
- An extension that sync installs partway through a run, possibly one that uses `webRequest` or `declarativeNetRequest`, is the strongest candidate. The browser can block a request before it reaches a socket. It can also fail requests caught while it swaps a frame's request handling to insert the extension's interception layer. I haven't checked in Chromium source that the swap fails requests already in flight.
- This would explain three observations:
  - **Session-dependent rate:** sync and add-on store timing vary by session.
  - **Same tabs at the failure:** the onboarding, sync-confirmation, and extension targets were present in the failing run.
  - **Last-batch hits:** the failures land on the final batch of imports, whichever modules that is in a given run.
- I can't say which listed extension uses those APIs.

Next steps (opinion):
- Add a script `onerror` handler, or a dynamic `import()` inside the existing `try`, so the page records the failure itself.
- Before the page navigates, attach a listener to the library's existing `failure` event (BrowserNetworkManager.ts:200-203). It would capture the `errorText` and `blockedReason` without adding any new CDP traffic. `net::ERR_BLOCKED_BY_CLIENT` would point to an extension.
- Record the target list both at startup and when the precondition fails, so each run shows whether sync was active.

Three library defects have source repairs and real red/green regressions. Existing timeouts were not raised, retries were not added, and assertions were not relaxed.

| Cause | Evidence and repair | Commit |
|---|---|---|
| Library: actionability awaited animation frames even with stability omitted. | Hidden-page compiler, fill, and click probes all timed out. The fill/select regression failed at `Runtime.callFunctionOn`; making frame sampling conditional on `stable: true` made it pass while the page remained hidden. This addresses the secret-typing and toolset-typing stall mechanism. | `87ce53c` |
| Library: pointer actions sampled animation frames without activating their page. | Baseline replay failures recorded fully loaded hidden pages and a pending `Runtime.callFunctionOn`; the enriched control receipt identified a 30-second actionability refusal. The new hidden-page click regression failed before activation and passed afterward, including trusted-click and visible-page assertions. Pointer actions now request `Page.bringToFront` before their existing stability check. | `fb625ab` |
| Library: teardown waited for browser process exit but retained its stderr read pipe. | A runtime resource trace identified `launchBrowserProcess` as the allocation site of the sole remaining `PipeWrap`. A real detached descendant retaining stderr made both `destroy()` and `close()` fail the pipe-release regression. Both pass after teardown explicitly destroys and awaits the owned pipe's close. The full browser lifecycle file passed 105 tests with one platform-specific skip. | `d9a18c1` |

The frame waits remain real animation-frame checks. Chromium documents that background tabs suspend those callbacks; activation satisfies their ordinary precondition but cannot prevent later host-driven visibility changes. [Chromium background-tab behavior](https://developer.chrome.com/blog/background_tabs), [CDP page activation](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-bringToFront).

The valid red and green commands use this common prefix:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=verbose
```

| Suffix | Red | Green | Log prefixes under `tmp/codex/` |
|---|---|---|---|
| `--project service tests/service/browser.test.ts -t "fills and selects in a hidden page"` | 1 failed, 39 filtered out | 1 passed, 39 filtered out | `flakes-fill-red`, `flakes-fill-green` |
| `--project service tests/service/browser.test.ts -t "activates a hidden page"` | 1 failed, 40 filtered out | 1 passed, 40 filtered out | `flakes-click-red`, `flakes-click-green` |
| `--project src:server tests/src/server/Browser.test.ts -t "releases the browser stderr pipe"` | 2 failed, 104 filtered out | 2 passed, 104 filtered out | `flakes-pipe-owned-red`, `flakes-pipe-green` |

Each command ran through the scaffold dispatch launcher, which preserved stdout, stderr, exit status, and duration. The pipe regression tracks the acquired native handle IDs through `async_hooks`, rather than counting unrelated handles. The element unit suite passed all 24 tests after its protocol fixture was taught the new activation command.

Unfixed or unestablished causes:

- **Chromium cross-process hit routing:** one baseline frame click returned without setting the child receipt. Fresh-page probes reproduced 3/100 and 2/100 missing child clicks, with no delayed arrival within one second. An independent raw-CDP control, bypassing element click, reproduced 4/100: trusted events landed on the outer `IFRAME` at the correct `(238,178)` coordinates, while the child's event log stayed empty. Both documents were visible and the static child's two animation frames had completed. This establishes a native routing failure, not an assertion that merely reads too early. Stale compositor hit data is an inference consistent with Chromium's dispatch implementation, which synchronizes visual state for wheel events but not ordinary mouse events. No speculative click retry or launch-default change was added. [Chromium input dispatch source](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/content/browser/devtools/protocol/input_handler.cc).
- **Visibility can change after activation:** a pointer-movement probe recorded a hidden parent and child despite requesting activation, with the preceding trusted pointer move delivered. A diagnostic combination of pointer movement and anti-backgrounding flags passed 100 pages; that experiment changes multiple factors and is not proof of a general repair. The flags were not added to the library or measurement runs.
- **Document startup:** the first gate run reproduced the 10-second readiness timeout in the HTML-switch capture case. A separate 100-page probe with lifecycle, exception, and network tracing passed; readiness after navigation took 0.8–6.4 ms. The gate failure has no captured import exception or pending-stage trace, so no specific cause or justified larger budget is established. Failure-only document-state diagnostics accompany the after measurements.
- **Historical beforeunload failure, setup rollback timeout, and lock-race timeout:** the baseline did not reproduce these. Setup rollback measured 1,996–2,080 ms quiet and 2,656–2,936 ms loaded against its existing 15-second limit. The 512-iteration lock race measured 1,322–1,366 ms quiet and 1,959–2,145 ms loaded against five seconds. These measurements do not justify changing either budget or alleging a library race.
- **Windows helper survival:** process census found eleven additional crashpad handlers and eleven `PooledProcess2` helpers from baseline browser profiles still alive after their browser parents had exited. The pipe fix releases the Node-owned handle; it does not establish complete Windows process-tree termination. Unrelated pre-existing browser processes were left alone. The census is preserved in `flakes-baseline-descendants.json`.

Committed as `d6937be20557ccd756ba7542624b496fbd2fa88e`. Every required post-commit gate passed. Hidden CSS-only transitions still reach their deadlines when Chromium withholds finish events; that measured limitation is documented and tested.

The repairs and their evidence are:

| Item | Repair | Red evidence | Green evidence |
| --- | --- | --- | --- |
| Closed text wait | Assert page lifetime before clearing DOM readiness; abort pending text evaluations when page resources are released. | Closing during a 5,000 ms wait rejected after 5,981 ms with `BROWSER_CDP_TIMEOUT_ERROR`; the latency assertion failed. | The same test passed; post-commit service run measured 1.76 ms and `Browser page is closed`, without `BROWSER_WAIT_TIMEOUT`. |
| Departed shadow root | Reuse the subscription recorder for root listeners; assert their signals are aborted after reconciliation while the wait remains pending. | Deleting only the departure-path `entry.release.abort()` failed both named transition/animation tests. | Restored source passed the complete wait test file and browser project. |
| Compiler description | Describe the immediate check and the task after a mutation batch or `BROWSER_WAIT_EVENTS` event; align the guide with task scheduling. | The reviewed prose claimed a check on each event. This is a prose correction, without a claimed runtime red test. | Compiler tests and all 250 guide-parity tests passed. |
| Element navigation | Retry context-loss errors and navigation-invalidated captures within the original deadline; document text and element waits together. | The pending absent-element test rejected with `CDPError: Inspected target navigated or closed`. | The same test resolved with an empty element collection after navigation. |

Targeted tests used `node node_modules/vitest/vitest.mjs run --config vite.config.ts`. The lifecycle command added `--project service tests/service/browser.test.ts -t "closing a page rejects|navigation settles a pending absent element"`: 2 failed before repair, 2 passed afterward. See `item-12-fix-2-lifecycle-red.log` and `item-12-fix-2-lifecycle-green.log` under `tmp/codex/`. The root mutation command added `--project src:browser tests/src/browser/BrowserDOMWait.test.ts -t "departed shadow root"`; see `item-12-fix-2-roots-control.log`. Scoped source verification passed 267 tests; the complete touched live files passed 93 tests.

The hidden-page probe used another tab in the same browser context as the foreground tab and asserted both visibility states. The 200 ms visibility transition removed the text, but Chromium delivered no natural `transitionend`. Initial frame-scheduler readings timed out at 5,551 ms for CDP and 5,751 ms for DOM against 5,000 ms deadlines.

The decision was to use zero-delay tasks for coalesced checks, retaining one check per burst and the final-event wake. Both controls pass. Restoring animation-frame scheduling failed the CDP hidden-removal control and the DOM delivered-event control at approximately 5,983 ms and 5,988 ms respectively; see `item-12-fix-2-frames-control.log`. The probe and controls are promoted in `tests/service/document.test.ts`.

The final service gate measured:

| Hidden-page case | CDP | DOM |
| --- | --- | --- |
| Natural CSS transition, no finish event delivered | Timeout at 5,689 ms | Timeout at 5,745 ms |
| DOM removal | Resolved in 1.00 ms | Resolved in 0.60 ms |
| Explicitly dispatched finish-event control | Resolved in 987 ms | Resolved in 979 ms |

The dispatched-event control is synthetic; it does not claim Chromium delivered the missing natural event. See `tmp/codex/item-12-fix-2-test-service.log` for these readings.

After the commit, `node tmp/codex/merge-gates.ts item-12-fix-2` produced the following gate table. Each exit code and its complete log were read.

| Gate | Exit | Seconds |
| --- | ---: | ---: |
| `format:check` | 0 | 2.4 |
| `lint:check` | 0 | 1.0 |
| `check` | 0 | 13.9 |
| `test:src:core` | 0 | 39.5 |
| `test:src:browser` | 0 | 16.6 |
| `test:src:server` | 0 | 13.2 |
| `test:src:bin` | 0 | 3.0 |
| `test:guides` | 0 | 3.1 |
| `test:policy` | 0 | 4.2 |
| `test:setup` | 0 | 23.4 |
| `test:setup:browser` | 0 | 10.9 |
| `build` | 0 | 14.2 |
| `test:service` | 0 | 94.2 |
| `git diff --check` | 0 | — |

The service gate passed 162 tests across 5 files, so no failing-file rerun was required. No test budget was raised.

Deviations: the live close failure required cancellation in addition to the prescribed assertion. The conditional scheduler repair requires “task” wording instead of “animation frame.” Task scheduling cannot recover a natural finish event Chromium never delivers, so the CSS-only hidden-transition limit remains explicit. The ancillary installed discovery checker exited 1 on browser project-label mapping (`src:browser` versus `src:browser (chromium)`, likewise setup); the actual named browser gates collected and passed their tests.

Worked alone, made one commit, and performed no push, publication, or installation. Final `git status --porcelain` is empty.

Committed the repairs as `39ede3affb417924db27ffc69e0393a65f945f91` on `ccr-d15a48b1-yyyll6`. The full service gate failed; its required isolated rerun passed. Final `git status --porcelain` is empty. One commit was made; nothing was pushed, published, or installed, and no agents were spawned.

The required changes and rulings are implemented as follows.

| Requirement | Repair and evidence |
| --- | --- |
| R1 | Both guide paragraphs name offscreen `content-visibility: auto` text retained by `read` and shadow-root-owned text shown by `look` as possible immediate absent-wait successes. The wording follows the review's recorded P1/P3 measurements. Mechanical presence checks fail against `5900987` and pass against the repair; they do not substitute for those behavioral measurements. |
| R2 | Added executed DOM and CDP assertions for closed/opened `details`, `until-found`, opacity zero, `aria-hidden`, and navigation. Initial absence uses a zero deadline; the CDP test first warms its isolated world. Navigation exposed a missing Chromium error variant, repaired in the existing retry path. Negative controls are listed below. |
| R3 | Recorders wrap each tested root's real `addEventListener`, delegate the registration, and retain its signal. Tests require the document and shadow-root registrations for `load`, `transitionend`, and `animationend`, then assert every signal is aborted after settlement, caller abort, and deadline. Removing root-signal aborts fails all three tests; restoring them passes all three. |
| R4 | Restricted the shadow-boundary statement to `transitionend` and `animationend`, explicitly naming Chromium 154.0.4258.53. The prescribed wording check fails on the baseline and passes on the repair. |
| R5 | Updated the compiler predicate description, DOM shadow-root discovery description, and both guide fence comments with the applicable finish events. Updated the guide's scheduling description for frame coalescing. Baseline wording checks fail; repaired checks pass. |
| Test titles | Renamed all nine titles to describe behavior. Baseline title checks fail; repaired checks pass. |
| Constant placement | Moved `BROWSER_WAIT_EVENTS` beside `BROWSER_STABLE_FRAME_COUNT`. The baseline placement check fails; the repaired check passes. |
| Timing margin | Moved `start` before sending class removal. The order check fails on the baseline and passes on the repair. The live browser file passes without increasing either timing bound. |
| Accepted guide row and tool copy | Left the accepted rename row and tool copy unchanged. The constant diff contains only its relocation. |

The runtime controls use real browser behavior. Each individual control produced one failing test and then one passing test after restoration, except the release group, which produced three failures and then three passes.

| Assertion | Deliberate breaking control |
| --- | --- |
| Closed `details` resolves immediately, both placements | Open the fixture's `details`. |
| `until-found` resolves immediately, both placements | Remove `hidden="until-found"`. |
| Opacity-zero text times out, both placements | Replace opacity with `display:none`. |
| `aria-hidden` text times out, both placements | Add HTML `hidden`. |
| Opening `details` makes absence time out, both placements | Leave `open` false. |
| DOM navigation rejects with `GONE` | Disable the `pagehide` subscription; the wait instead times out. |
| CDP navigation settles the pending wait | Remove recognition of `Inspected target navigated or closed`; the live assertion rejects. |
| Root listeners release on settlement, abort, and deadline | Remove `entry.release.abort()`; recorded signals remain live. |
| Finish events coalesce | Restore synchronous event checks; the burst produces 200 checks instead of one. |
| The final event still wakes the wait | Retain the completed frame handle; the final event is suppressed and the wait times out. |

After consolidating assertions for lint, the final visibility matrix again produced four failures and then four passes in each placement; the final release group again produced three failures and then three passes. Evidence is in `tmp/codex/item-12-mutations.log`, `tmp/codex/item-12-final-controls.log`, and `tmp/codex/item-12-copy-checks.log`. The commands were `node tmp/codex/item-12-mutations.ts`, `node tmp/codex/item-12-final-controls.ts`, and `node tmp/codex/item-12-copy-checks.ts`. Final scoped verification passed 48 DOM tests, 37 live browser tests, and 250 guide tests.

Before measuring cost, the rejection criterion was more than 16.7 ms of redundant checking within a frame: that consumes a full 60 Hz frame before painting or input handling. The measurement served veneer's existing `showcase/browser.html`, used a 1440×1000 viewport with motion enabled, and changed Light to Dark. The page contained 15,388 elements and generated 537 finish events. Each measurement used three fresh-page runs, with a no-wait control.

| Wait | Before: finish-event checking | After: scheduled checking |
| --- | --- | --- |
| Text | 2,203.3–2,245.8 ms | 11.6–14.7 ms across two frame checks |
| Element | 19,439.5–19,495.1 ms, handling 116–118 events before the measurement's 20-second deadline | 344.1–359.2 ms across two frame checks; all 537 events delivered |

The before element readings are deadline-limited, not complete-burst totals. Initial wait setup is excluded from these checking measurements. After coalescing, event-handler overhead was at most 0.4 ms; the no-wait control was below 0.6 ms. The cost justified coalescing finish events. The implementation preserves the final-event wake and cancels a pending frame on settlement. Individual element captures remain expensive. Raw readings are in `tmp/codex/item-12-cost-before.json` and `tmp/codex/item-12-cost.json`; the deterministic burst/final-event regression remains in `BrowserDOMWait.test.ts`.

After the commit, `node tmp/codex/merge-gates.ts item-12-fix` produced this table. Every exit code and each gate's bare log were read.

| Gate | Exit | Seconds |
| --- | ---: | ---: |
| `npm run format:check` | 0 | 2.7 |
| `npm run lint:check` | 0 | 1.1 |
| `npm run check` | 0 | 14.4 |
| `npm run test:src:core` | 0 | 39.5 |
| `npm run test:src:browser` | 0 | 21.7 |
| `npm run test:src:server` | 0 | 13.2 |
| `npm run test:src:bin` | 0 | 3.0 |
| `npm run test:guides` | 0 | 3.2 |
| `npm run test:policy` | 0 | 4.5 |
| `npm run test:setup` | 0 | 25.0 |
| `npm run test:setup:browser` | 0 | 21.5 |
| `npm run build` | 0 | 14.8 |
| `npm run test:service` | 1 | 120.7 |
| Isolated `tests/service/journey.test.ts` rerun | 0 | 32.5 |
| `git diff --check` | 0 | — |

The full service run passed 157 tests and failed the appearance-control assertion at `tests/service/journey.test.ts:754`: expected `complete`, received `stopped`. The required rerun was `node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project service tests/service/journey.test.ts`; all 33 tests passed. Both outcomes remain recorded in `tmp/codex/item-12-fix-test-service.log` and `tmp/codex/item-12-fix-service-rerun.log`. No budget was raised. The isolated pass does not establish the full-run failure's cause.

The implementation deviation was the CDP navigation repair: R2's executed proof demonstrated that the documented behavior did not hold for Chromium's additional error wording. The installed discovery helper also failed; direct scoped Vitest listing succeeded and confirmed the touched files were collected. The browser-setup gate exited 0 with 22 passing tests but printed a close-timeout diagnostic. No other requested scope was changed.

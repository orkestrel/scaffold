All required findings are repaired in commit `608d646d7163e42ad7c20e28cb021641415aa116`, on top of `3807993`. All required gates pass, and `git status --porcelain` is empty.

The repairs and their controls are recorded below. `S` checks the required source forms against `3807993` and the repaired tree: **8 failed before, 8 passed after**. Browser and filesystem controls supplement those source checks.

| Finding | Repair | Red and green evidence |
| --- | --- | --- |
| Claim 14 | Every provider-input case in `Showcase.test.ts` awaits `parkShowcasePointer()` in its own `finally`. | S’s claim-14 check fails before and passes after; the application gate passes 226 tests. |
| Cost: unchanged-row windows | Derives the window from computed transition duration/delay plus Bootstrap’s 5 ms pad, then awaits an abort and a frame. Measures collapse’s transient class on an inert sibling. Records delayed lifecycle, class, ARIA, and connection changes. | W: shortening the computed window to the pad makes the carried delayed-collapse control fail; **1 failed → 1 passed**. A: disabling attribute observation makes the transient class and ARIA controls fail; **2 failed → 2 passed**. |
| Cost: both-motion runs | Adds a per-table motion flag. Button and dropdown run under default motion; the other tables retain both passes. | S’s motion check fails before and passes after. Full journey runs pass **90 before → 88 after**, with only the authorized duplicate passes removed. |
| Cost: disabled routes | Shares the observation helper. Outside-dialog triggers receive focus directly and must have `tabIndex === 0`; dialog dismiss triggers retain Tab traversal. Both control censuses remain. | D: the prior disabled-route mutation fails every specimen at both widths; **18 failed → 18 passed**. The same runs also collect the application tests: **226 passed beside the red controls; 244 passed after restoration**. |
| Rules: scroll deadline | Passes `{ budget: 5_000 }` directly to the settling condition. | S’s deadline check fails before and passes after; the carried smooth-scroll control passes in the browser setup gate. |
| Rules: observation deadlines | Removes both elapsed-deadline polling loops through the shared abort-based observation. | S’s deadline check fails before and passes after; W, A, and D establish the retained behavioral controls. |
| Rules: duplicate walkers | Uses one predicate-driven Tab walker for role/name traversal, dialog dismiss traversal, and the census. | S’s walker check fails before and passes after. The role/name, hidden-stop, and missing-destination cases pass in the focused browser run. |
| Rules: capture skip | Uses `it.skipIf(CAPTURE)` instead of returning from a passing test. | S’s skip-registration check fails before and passes after. |
| O1 | Recreates fixed `WORKSPACE_ROOT`-anchored `no-capture-<variant>` directories and merges inherited browser commands. | K: restoring the old config fails the directory assertion; **1 failed → 1 passed**. The green control writes a sentinel and verifies that reevaluation removes it for every variant. S also checks anchoring and command composition. |
| O2 | Parks the oracle case’s real pointer in its own `finally`. | S’s oracle cleanup check fails before and passes after; the oracle case passes in the focused browser run. |
| O3 | J3 requires the known “Overflow values” scroller at 390 px. | J: returning an empty scroller population fails the membership assertion; **1 failed → 1 passed**. |

The evidence commands are reproducible from the retained instruments. Temporary probe sources are archived as `tmp/codex/proofs6-*.ts.txt`; their active copies were removed from `tmp/probes` after use. Logs and error outputs use the following prefixes under `tmp/codex`.

| Control | Command | Artifact prefix |
| --- | --- | --- |
| S | `node tmp/codex/proofs6-static.ts --baseline`, then the same command without `--baseline` | `proofs6-static-final-red`, `proofs6-static-green` |
| W | `npm run test:setup:browser -- tests/setupBrowser.test.ts -t "rejects a delayed collapse reaction"` | `proofs6-window-red`, `proofs6-window-green` |
| A | `npm run test:setup:browser -- tests/setupBrowser.test.ts -t "rejects a transient delayed"` | `proofs6-observer-red`, `proofs6-observer-green` |
| D | `node tmp/codex/proofs6-refusal-run.ts red`, then `green` | `proofs6-refusal-red`, `proofs6-refusal-green` |
| K | `npm run test:probe -- tmp/probes/proofs6-config.test.ts` | `proofs6-config-red`, `proofs6-config-final-green` |
| J | `npm run test:journey -- --project journey:light-390 -t "J3 browses"` | `proofs6-scroller-final-red`, `proofs6-scroller-green` |

The focused helper/oracle run also passed **9 tests**, using `npm run test:setup:browser -- tests/setupBrowser.test.ts -t "derives unchanged|transient delayed|accepts a stable|delayed collapse|traverseFocus|distinct realm"`; its artifact prefix is `proofs6-controls-green`.

Before the after runs, the retention criterion was material savings in the affected tests under the full concurrent journey load, with their controls retained. Review estimates were not targets or caps. **All cost changes are retained; none were dropped.**

Every full measurement used `npm run test:journey -- --reporter=json --outputFile=tmp/codex/<run>.json`, alongside the script’s dot reporter. Wall time is the monotonic duration of the npm process. The complete per-test timings are retained in the linked JSON reports.

| Run | npm wall | Vitest wall | Vitest summed test time | Result |
| --- | ---: | ---: | ---: | --- |
| [Before](C:/Users/mikes/WebstormProjects/veneer-wt-page/tmp/codex/proofs6-before.json) | 609.59 s | 607.81 s | 1959.43 s | 90 passed |
| [After, first measurement](C:/Users/mikes/WebstormProjects/veneer-wt-page/tmp/codex/proofs6-after1.json) | 465.87 s | 464.45 s | 1730.40 s | 88 passed |
| [After, final gate](C:/Users/mikes/WebstormProjects/veneer-wt-page/tmp/codex/proofs6-after2.json) | 533.64 s | 531.55 s | 2008.86 s | 88 passed |

The wall-time savings are **143.72 s** in the first after run and **75.95 s** in the final run. Project times below are each JSON suite’s elapsed test span.

| Project | Before | After first | After final |
| --- | ---: | ---: | ---: |
| light-1280 | 452.87 s | 444.33 s | 505.84 s |
| dark-1280 | 603.02 s | 432.75 s | 521.14 s |
| light-390 | 479.51 s | 458.70 s | 525.31 s |
| dark-390 | 423.94 s | 394.53 s | 456.53 s |

The affected workloads improve in both after runs. These grouped measurements overlap in mechanism and are not independent causal savings to add together.

| Affected workload | Before | After first | After final | Decision |
| --- | ---: | ---: | ---: | --- |
| Component tables excluding button/dropdown | 985.34 s | 763.23 s | 883.22 s | Keep derived observation windows: substantial savings while the delayed and transient-write controls pass. |
| Button/dropdown table cases | 167.07 s | 41.15 s | 49.72 s | Keep motion flags. The removed reduced-motion cases alone consumed 86.85 s in the baseline. |
| Disabled-route cases | 74.23 s | 30.44 s | 25.39 s | Keep shared observation and direct outside-dialog focus: both widths improve and all refusal controls hold. |

The slowest tests across the measured runs were the resolved-value matrix cases and the narrow default-motion scrollspy table.

| Test and variant | Before | After first | After final |
| --- | ---: | ---: | ---: |
| Resolved-value matrix, light-1280 | 88.15 s | 121.55 s | 133.08 s |
| Resolved-value matrix, dark-1280 | 91.45 s | 99.51 s | 137.41 s |
| Resolved-value matrix, light-390 | 93.60 s | 112.02 s | 136.05 s |
| Resolved-value matrix, dark-390 | 85.69 s | 123.36 s | 133.12 s |
| Scrollspy-390, default motion | 79.52 s | 80.78 s | 82.95 s |

Host load varied. `Get-Process chrome,msedge,node,codex` snapshots were taken before and after each full measurement, retaining process IDs, cumulative CPU time, and working sets in `proofs6-<run>-load-before.json` and `-load-after.json`. The following counts show start → finish; linked summaries also contain CPU and memory aggregates.

| Run | chrome | msedge | node | codex |
| --- | ---: | ---: | ---: | ---: |
| [Before](C:/Users/mikes/WebstormProjects/veneer-wt-page/tmp/codex/proofs6-before-summary.json) | 0 → 0 | 87 → 104 | 12 → 20 | 6 → 8 |
| [After first](C:/Users/mikes/WebstormProjects/veneer-wt-page/tmp/codex/proofs6-after1-summary.json) | 0 → 0 | 87 → 87 | 22 → 16 | 8 → 6 |
| [After final](C:/Users/mikes/WebstormProjects/veneer-wt-page/tmp/codex/proofs6-after2-summary.json) | 0 → 0 | 87 → 109 | 34 → 22 | 8 → 6 |

The final summed test time increased while wall time decreased. The slower matrix cases and differing host load limit attribution of total-run variation; the targeted workloads improved in both measurements.

After the last tracked edit, the gates ran in the required order. The [gate record](C:/Users/mikes/WebstormProjects/veneer-wt-page/tmp/codex/proofs6-gates.json) retains their exit codes and durations.

| Gate | Exit | Result |
| --- | ---: | --- |
| `npm run format:check` | 0 | Passed |
| `npm run lint:check` | 0 | Passed |
| `npm run check` | 0 | Passed |
| `npm run test:setup` | 0 | 149 passed |
| `npm run test:setup:browser` | 0 | 114 passed |
| `npm run test:app:browser` | 0 | 226 passed |
| `npm run test:journey` | 0 | 88 passed |
| `npm run test:journey:vue` | 0 | 4 passed |
| `git diff --check` | 0 | Passed |
| Final `git status --porcelain` | 0 | Empty |

Only tests and the journey configuration changed. No page input changed, so no showcase rebuild was required. Browser evidence covers Windows/Chromium.

Tooling deviation: no `prove` MCP tool was exposed. The report uses native Node/Vitest red-and-green evidence and claims no `prove` receipt. No repair required weakening a carried control or changing engine source files.
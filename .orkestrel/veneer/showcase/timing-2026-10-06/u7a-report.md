The popover excess is localized to **`Billing status` click completion**. The passing motion=true readings span **115,589.8–156,443.8 ms**, ratio **1.35344**: enough to stop after two runs, but **the historical 2.75 range was not reproduced**.

Run folders are under `/home/user/veneer/tmp/units/journey-cost/runs/`.

| Folder | Kind | seconds | outside.seconds | Passed | Failed |
|---|---|---:|---:|---:|---:|
| [task75-u7-probe-1](/home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-1) | journey | 617.399 | 75.21 | 94 | 0 |
| [task75-u7-probe-2](/home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-2) | journey | 594.450 | 67.62 | 94 | 0 |

The [complete slowest-settle table](/home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-2/settle-analysis.md:11) contains all **468 descriptions**, with the winning run, `seconds`, and `outside.seconds`. Its largest readings are:

| Description | Max ms | Run | seconds | outside.seconds |
|---|---:|---|---:|---:|
| showcase scroll settles | 888.3 | probe-2 | 594.450 | 67.62 |
| the Tailwind on Bootstrap markup heading lands in the upper quarter of the viewport | 742.8 | probe-2 | 594.450 | 67.62 |
| animations div.carousel | 687.2 | probe-2 | 594.450 | 67.62 |
| animations body. | 613.2 | probe-2 | 594.450 | 67.62 |
| animations div.modal | 598.1 | probe-2 | 594.450 | 67.62 |

These popover motion=true steps account for the spread. All rows concern `Billing status`; values are milliseconds.

| Step | probe-1 | probe-2 |
|---|---:|---:|
| Arrange initial click, `false through click` | 65,697.2 | 1,039.2 |
| Arrange corrective click, `false through click` | 22,154.6 | 3,882.2 |
| Action click, `false through click` | 13,975.9 | 19,863.0 |
| Action click, `true through click` | 10,955.2 | 9,762.4 |
| Arrange corrective click, `true through {Escape}` | 29,998.3 | 66,392.7 |
| **Those clicks combined** | **142,781.2** | **100,939.5** |
| Explicit settle waits across the table | 2,373.1 | 2,417.7 |
| Whole table, `report.json` | 156,443.8 | 115,589.8 |

The click difference is **41,841.7 ms**, accounting for the table difference of **40,854.0 ms**, with other work offsetting 987.7 ms. The [complete step table for both motion values](/home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-2/settle-analysis.md:485) includes every executed instrumented await and identifies overlapping parent intervals.

The held-title findings are:

| Held title | Finding |
|---|---|
| Popover, motion=true | Test input completion accounts for the spread, at [arrangement](/home/user/.wave/veneer-u7/tests/setupBrowser.ts:4557) and [action](/home/user/.wave/veneer-u7/tests/setupBrowser.ts:4481). Explicit settle waits do not. |
| Popover, motion=false | Run 2 is 2,592.7 ms slower. Arrangement/action calls account for 1,703.3 ms; explicit waits add 63.1 ms. Partial test-side attribution; remainder unresolved. |
| Offcanvas, motion=true | No explanatory settle found. The slower table spends 134.4 ms **less** in explicit waits. |
| Offcanvas, motion=false | Run 2 is 2,724.7 ms slower; waits add 262.5 ms, chiefly start-panel completion and preceding-dialog closure. They do not explain the excess. |
| Pair header | Run 2 is 2,837.4 ms slower; `animations body.` adds only 3.2 ms. No explanatory settle found. |
| Modal, motion=false | Run 2 is 2,954.1 ms slower; waits add 252.3 ms, chiefly archive/scrollable-dialog completion. They do not explain the excess. |

The [complete held-title table](/home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-2/settle-analysis.md:521) covers every title held in `durations-2026-10-06b.md`, naming the largest wait deltas. No measured settle explains the whole excess of the remaining titles. **No engine cause was established; no stage B engine row is justified.** The popover finding belongs in a test-input investigation.

The instrument commands were:

```text
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-1 --kind journey --cwd /home/user/.wave/veneer-u7 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH CAPTURE=0 /home/user/.wave/veneer-u7/node_modules/.bin/vitest run --config /home/user/.wave/veneer-u7/configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-1/report.json

flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-2 --kind journey --cwd /home/user/.wave/veneer-u7 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH CAPTURE=0 /home/user/.wave/veneer-u7/node_modules/.bin/vitest run --config /home/user/.wave/veneer-u7/configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-2/report.json

node /home/user/veneer/tmp/units/journey-cost/durations.ts --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-1 --out /home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-1/durations.md

node /home/user/veneer/tmp/units/journey-cost/durations.ts --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-1 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-2 --out /home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-2/durations.md
```

Deviations and limits:

| Expected | Found and evidence | Disposition |
|---|---|---|
| U6 duration entries available | `bec0a38` contained none. | Added temporary table/row timing probes; removed afterward. |
| Three wait imports in both files | Integration has no `waitForEvent` import or call. | Wrapped existing imports; setup’s event wrapper had no journey executions. |
| Complete, unduplicated instrument population | `durations.ts` reads both stdout and journey copies, doubling counts, and excludes non-statechart families through its title matching. | Left instrument unchanged; supplied the complete table from stdout entries counted once. |
| Multiple load-eligible readings for budgeting | [Combined output](/home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-2/durations.md:7) excludes probe-1: **75.21 > 70.23**. It also exceeds the historical 72.67 threshold. | Raw spread reported; no R3/R4 budget derived. |
| Historical 2.75 spread | Observed 1.35344. | Not reproduced; stopped at the brief’s lower stopping threshold. |
| Timeout/slack verification | `--timeouts` was intentionally omitted for U7a. | Maxima need no timeout file; slack checks do. Header-file runs remain U7b. |

One unverified hypothesis: Playwright actionability retries around animated popover placement cause the variable click completion.

The scoped browser typecheck passed. Both probe files were restored; the checkout is clean at `bec0a38`. Nothing was committed.
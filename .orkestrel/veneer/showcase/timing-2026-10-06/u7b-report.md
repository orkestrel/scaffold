Both header runs passed. The slowest **`the header buttons finish their color transitions`** reading was **2.5 ms**, in `task75-u7b-header-2`.

The completed [duration report](/home/user/veneer/tmp/units/journey-cost/durations-2026-10-06c.md) includes the generated tables, supplemental readings, timeout provenance, commands, and deviations.

Run folders are under `/home/user/veneer/tmp/units/journey-cost/runs/`.

| Folder | Kind | seconds | Passed | Failed |
|---|---|---:|---:|---:|
| jb2-1 | journey | 546.807 | 94 | 0 |
| jb2-2 | journey | 547.652 | 94 | 0 |
| jb2b-1 | journey | 544.307 | 93 | 1 |
| jb2b-2 | journey | 550.959 | 94 | 0 |
| completion-b3-journey-after-4 | journey | 531.623 | 94 | 0 |
| completion-b4-journey | journey | 618.627 | 94 | 0 |
| task75-u3-journey-1 | journey | 637.981 | 94 | 0 |
| task75-u3-journey-2 | journey | 631.022 | 94 | 0 |
| task75-u4-journey-2 | journey | 672.684 | 94 | 0 |
| task75-u5-journey-1 | journey | 608.232 | 94 | 0 |
| task75-u6-journey-1 | journey | 619.688 | 94 | 0 |
| task75-u7-probe-1 | journey | 617.399 | 94 | 0 |
| task75-u7-probe-2 | journey | 594.450 | 94 | 0 |
| task75-u7b-header-1 | command | 138.649 | 22 | 0 |
| task75-u7b-header-2 | command | 151.503 | 22 | 0 |

Both header logs contain **`Tests 22 passed (22)`** and five `Settle probe` entries. No verbose retry was needed.

Header readings are milliseconds, displayed to one decimal. H1/H2 denote `task75-u7b-header-1`/`-2`.

| Description | Min | Max | H1 max | H2 max | Slowest run |
|---|---:|---:|---:|---:|---|
| the header buttons finish their color transitions | 0.7 | **2.5** | 1.7 | 2.5 | H2 |
| animations body. | 0.1 | 2.4 | 1.9 | 2.4 | H2 |
| animations header.position-sticky top-0 z-3 bg-body border-bottom | 0.1 | 122.9 | 113.4 | 122.9 | H2 |
| the scroll offset follows the resized header | 0.1 | 0.3 | 0.3 | 0.3 | H2¹ |
| the contents heading settles below the toolbar | 648.6 | 712.1 | 699.5 | 712.1 | H2 |
| the removed offset exposes the covered heading | 682.9 | 698.7 | 698.7 | 690.1 | H1 |
| the status reports the open dialog | 0.1 | 0.2 | 0.1 | 0.2 | H2 |
| the status reports the closed dialog | 0.0 | 0.1 | 0.0 | 0.1 | H2 |

¹ The unrounded H2 value is slightly larger.

The [timeouts JSON](/home/user/veneer/tmp/units/journey-cost/timeouts-6a976a0.json) contains every journey title and the header-file titles. The [per-entry source map and exact JSON](/home/user/veneer/tmp/units/journey-cost/durations-2026-10-06c.md:2298) name the source line of every figure.

The runtime `COMPONENT_TABLES` reading confirms a maximum of **88 scenarios**, giving **230,000 ms** from `10_000 + 88 × 2500`. Sources are [the expression](/home/user/.wave/veneer-u7b/tests/app/browser/integration.test.ts:2168) and [the dropdown scenarios](/home/user/.wave/veneer-u7b/tests/setupBrowser.ts:5964). Unspecified browser timeouts are **15,000 ms**, from [installed Vitest](/home/user/.wave/veneer-u7b/node_modules/vitest/dist/chunks/coverage.DM_a_rWm.js:538).

The combined band is **1.265340**; no supplied run is out of band. The unmodified instrument reports no statechart R3 slack marks. Its title matcher excludes non-statechart settle families, so the report adds a labelled supplement. That supplement finds these marks:

| Enclosing test | Wait | R3 ms | Slack ms |
|---|---|---:|---:|
| Progress bars | animations body. | 752,100 | 109,087.8 |
| J8 | animations body. | 778,200 | 99,449.0 |
| J8 | animations body.modal-open | 310,500 | 99,449.0 |
| Paired open engine states | Customs status description is hidden | 50,900 | 27,945.3 |
| Compact sticky-header neutrality | animations header.position-sticky top-0 z-3 bg-body border-bottom | 151,100 | 28,495.7 |

**No journey title has slack under 10 seconds.** J1 has the smallest: **10,140.4 ms**. These `Showcase` titles do fall below 10 seconds:

| Title | Slack ms |
|---|---:|
| changes alignment at each mapped sm boundary under every face | 4,934.5 |
| moves between every pair of faces through the Stylesheets buttons | 7,132.6 |
| paints and clears the mapped focus halo through Tab under every face and theme | 8,550.3 |
| holds each z-index panel at half its stage under every face | 9,460.0 |

U8’s budgeted `waitForCondition` must cover the [header color transitions](/home/user/.wave/veneer-u7b/tests/app/browser/Showcase.test.ts:416), [resized-header offset](/home/user/.wave/veneer-u7b/tests/app/browser/Showcase.test.ts:707), [contents-heading settle](/home/user/.wave/veneer-u7b/tests/app/browser/Showcase.test.ts:718), and [removed-offset control](/home/user/.wave/veneer-u7b/tests/app/browser/Showcase.test.ts:753). The indirect body/banner animation waits also need the ruled animation budget. These findings do **not** establish a shared budget below every slack.

The [exact instrument commands](/home/user/veneer/tmp/units/journey-cost/durations-2026-10-06c.md:2474) include both queued Chromium invocations and the successful `durations.ts` invocation over all listed runs, with `--timeouts`, `--ceiling 5000`, and the ten pre-B4 omission pairs supplied through standard input.

Deviations are recorded with evidence in the [deviation table](/home/user/veneer/tmp/units/journey-cost/durations-2026-10-06c.md:2529):

| Expected | Found | Disposition |
|---|---|---|
| Both wait imports in `Showcase.test.ts` | Only `waitForCondition` is imported directly; helpers reach animation waits. | Wrapped the existing direct import and both setup imports. |
| Named viewport variant | These registrations have none. | Used `app:browser`; retained width loops. |
| Instrument includes every settle family | Its hard-coded statechart title mapping excludes other tests. | Instrument unchanged; complete labelled supplements added. |
| Counts represent distinct waits | U7a entries occur in stdout and journey text. | Generated counts retained; supplements count stdout once. |
| R3 available for every group | Zero minima leave 569 generated and 152 supplemental figures unavailable. | Preserved zeros and unavailable figures. |
| Derived figures fit slack | The five marks listed above exceed slack. | Reported; no replacement budget selected. |
| Earlier omission/load results carry forward | This brief selects pre-B4 omissions and a broader population. | Applied this brief; both U7a runs are load-eligible. |

One unverified hypothesis: descriptions that combine immediate returns with transition-spanning waits inflate the max/min margin.

Both probe files were restored. The checkout is clean at `6a976a0`; nothing was committed.
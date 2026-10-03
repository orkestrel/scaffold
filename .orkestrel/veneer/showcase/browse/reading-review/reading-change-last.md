Implemented the reading design in three commits on `ccr-d15a48b1-yyyll6`. All required final gates passed, and `git status --porcelain` is empty.

| Commit | Changes |
| --- | --- |
| `b6b2bee457bfb78f1c8e4552a4361b4494462a2d` | U1: whole-page Markdown and text by default; explicit distillation retained; relative link resolution; shared word collection; best-scoring line matches with original offsets; `BrowserReadMatch`; updated default-dependent tests and TSDoc. |
| `ed3bf9ec01083e5911d160cdd019afb180882dbf` | U2: required `search` replaces `what`; page-tool placeholder becomes `purpose`; adds `plain`; projection-aware retained reading; bounded first-page match blocks for reading, outline, tabs, and journeys; exact requested copy; migrated callers and MCP vocabulary tests. |
| `fcefa2a71a3cf29f007678c165a1ed4e78d5ffbf` | U3: guide, README, tool table, prompts, seeds, bounds, default/distillation examples, and executable guide tests agree with source. |

The acceptance proofs used deliberate mutations followed by source restoration. Each command below ran both red and green. Red means exit 1; green means exit 0. Counts are failed/passed/skipped; filtered-out tests account for the skips.

| Mutation / proof | Exact red and green command | Red counts | Green counts |
| --- | --- | --- | --- |
| Top-score filter removed | `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/helpers.test.ts -t "keeps only the top-scoring"` | 1 failed ; 137 skipped | 1 passed ; 137 skipped |
| Duplicate offsets replaced by first occurrence | `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/helpers.test.ts -t "keeps only the top-scoring"` | 1 failed ; 137 skipped | 1 passed ; 137 skipped |
| Relative-link resolution removed | `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/BrowserReading.test.ts -t "resolves relative links"` | 1 failed ; 11 skipped | 1 passed ; 11 skipped |
| Capture distillation bypassed | `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:browser tests/src/browser/BrowserDOMView.test.ts -t "drops captured navigation"` | 1 failed ; 18 skipped | 1 passed ; 18 skipped |
| First-page reading matches suppressed | `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/BrowserToolset.test.ts -t "reading search on"` | 2 failed ; 173 skipped | 2 passed ; 173 skipped |
| Plain projection replaced by Markdown | `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/BrowserToolset.test.ts -t "reading search on plain"` | 1 failed ; 174 skipped | 1 passed ; 174 skipped |
| Matches incorrectly repeated on continuation | `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/BrowserToolset.test.ts -t "reading search on"` | 2 failed ; 173 skipped | 2 passed ; 173 skipped |
| Projection identity removed from retained reading | `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/BrowserToolset.test.ts -t "reading search on"` | 2 failed ; 173 skipped | 2 passed ; 173 skipped |
| Plain removed from replay-hold observations | `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/BrowserToolset.test.ts -t "reading search on plain"` | 1 failed ; 174 skipped | 1 passed ; 174 skipped |
| Tab matching disabled | `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/BrowserToolset.test.ts -t "tab list without the current mark"` | 1 failed ; 174 skipped | 1 passed ; 174 skipped |
| Journey heading matching disabled | `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/BrowserJourneyToolset.test.ts -t "lists matching journey headings"` | 1 failed ; 76 skipped | 1 passed ; 76 skipped |
| Former what argument incorrectly admitted | `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/BrowserToolset.test.ts -t "refuses the former what"` | 1 failed ; 174 skipped | 1 passed ; 174 skipped |
| Oversized first row skipped instead of cut | `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/helpers.test.ts -t "bounds matches, cuts"` | 1 failed ; 138 skipped | 1 passed ; 138 skipped |
| Oversized later row stops the scan | `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/helpers.test.ts -t "bounds matches, cuts"` | 1 failed ; 138 skipped | 1 passed ; 138 skipped |

The reading tests exercise a matching heading beyond character 4,000, continuation from its original offset, plain-text pagination, absence of match blocks on later pages or unmatched searches, projection changes, annotations, and observation during replay holds. The dialog test includes `plain` among refused calls. Journey tests match headings alone and preserve listing offsets. The row test covers the half-room bound, surrogate-safe ellipsis, and skipping oversized later rows while continuing the scan.

Additional red/green evidence:

| Proof and exact command | Red | Green |
| --- | --- | --- |
| Whole-page default: `npx vitest run --config vite.config.ts --project src:core tests/src/core/BrowserReading.test.ts` | 3 failed, 9 passed | Covered by the combined command below: 150 passed |
| Reading plus matching helpers: `npx vitest run --config vite.config.ts --project src:core tests/src/core/BrowserReading.test.ts tests/src/core/helpers.test.ts` | Red controls above | 150 passed |
| Explicit distilled service projection: `npx vitest run --config vite.config.ts --project service tests/service/browser.test.ts -t "reads the article distilled"` | 1 failed, 28 skipped | 1 passed, 28 skipped |
| Long first row must leave room for a later fitting row: `npx vitest run --config vite.config.ts --project src:core tests/src/core/helpers.test.ts -t "bounds matches, cuts"` | 1 failed, 138 skipped | 1 passed, 138 skipped |
| MCP vocabulary: `npm run test:src:server` | 2 failed, 251 passed, 9 skipped | 253 passed, 9 skipped |
| Guide parity: `npm run test:guides` | 5 failed, 243 passed | 249 passed, including the new reading example |

U1 acceptance gates exited 0: `npm run check`, `npm run test:src:core` (1,204 passed), `npm run test:src:browser` (402 passed, 1 skipped), and `npm run test:setup` (175 passed, 3 skipped). U2's `npm run build` followed by `npm run test:service` exited 0, with 138 service tests passed. U3's guide and policy gates exited 0: 249 guide tests passed; 119 policy tests passed, 1 skipped. These were followed by the complete final sequence below.

The installed MCP proof instrument also checked the top-score claim: the case had zero type, lint, and runtime issues; the control had zero type/lint issues and one expected runtime failure. Receipt: `probe:969ab7e2d57beb4d737a64038f469230:runtime:typescript@6.0.3:oxlint@1.86.0:vitest@4.1.11:configs/src/tsconfig.core.json@15b104f0503eb67da672ca73995c632b`.

The serialized copy measurements used `npm run test:probe -- reading-bounds`, before and after the change. The full measurement serializes each tool's name, description, and parameters; the journey measurement includes the journey definitions and secret parameter schema.

| Measurement | Before | After | Previous bound | Final bound |
| --- | ---: | ---: | ---: | ---: |
| Full tool definitions | 6,023 | 6,559 | 6,050 | 6,600 |
| Journey definitions | 3,067 | 3,090 | 3,100 | 3,100 |

The final bounds are the smallest multiples of 50 containing the measured lengths. Both measurements are recorded in test comments and the guide. The fixed copy was preserved.

Performance was measured with guarded benches using `npm run test:bench -- --run reading-cost` and `npm run test:bench -- --run reading-cost-repeat`, both exit 0. Before measurement, the declared excessive-cost threshold was an added median greater than the larger of 50 ms or 20% of the no-search median: enough to cause noticeable delay for these fresh captures, rather than a universal target. Each case had one warmup per mode and nine paired fresh first-page calls, alternating which mode ran first. Calls used `search: ''` versus matching words; every searched response was checked for a match block. No cheap-read cache or speed optimization was added.

Veneer's rendered showcase had 15,388 elements and 73,911 text characters; its search was `Components`. The heavy page was a realistic 2,000-row, seven-column order ledger with links, 18,018 elements, and 183,469 text characters; its search was `order details`. Both ran in the installed headless system browser. No artificial host stress was introduced. The first run overlapped existing host work and this task's build/service work: aggregate utilization was 78.9001% across 16 logical CPUs, with 102,892,302,336 bytes free of 137,153,998,848. The showcase `look` repeat ran after this task's service work finished, with other host work still present: 35.9607% CPU and 109,408,600,064 bytes free.

All timing figures below are milliseconds; N means no search and S means search. Means include descriptive 95% t intervals over nine calls; they do not establish causation under changing host load.

| Case | Median N → S | Difference / threshold | Mean N ± CI | Mean S ± CI | Paired mean ± CI |
| --- | --- | --- | --- | --- | --- |
| showcase read | 606.46 → 568.85 | -37.61 / 121.29 | 698.98 ± 143.14 | 687.74 ± 163.37 | -11.23 ± 130.64 |
| showcase plain | 525.88 → 522.28 | -3.61 / 105.18 | 603.83 ± 173.08 | 570.15 ± 97.92 | -33.68 ± 105.57 |
| showcase look | 1814.59 → 2920.05 | 1105.46 / 362.92 | 2807.66 ± 1293.57 | 4743.02 ± 3742.38 | 1935.36 ± 3361.71 |
| table read | 454.85 → 510.56 | 55.71 / 90.97 | 475.84 ± 83.04 | 530.93 ± 68.10 | 55.09 ± 85.97 |
| table plain | 353.30 → 351.50 | -1.80 / 70.66 | 382.81 ± 75.49 | 360.61 ± 55.59 | -22.20 ± 68.46 |
| table look | 1966.24 → 1983.64 | 17.40 / 393.25 | 2074.79 ± 198.01 | 2055.34 ± 107.48 | -19.45 ± 197.59 |
| showcase look repeat | 800.53 → 833.40 | 32.87 / 160.11 | 806.20 ± 56.28 | 809.81 ± 47.91 | 3.61 ± 46.62 |

The first showcase `look` median difference exceeded the declared threshold. Its searched calls ranged up to 13,940.1795 ms, while its paired median difference was −6.2440 ms. The repeat, without code changes, had a 32.8707 ms median difference against a 160.1063 ms threshold, and a paired median difference of 1.5543 ms. This did not establish excessive matching cost or justify an algorithm repair. The original exceedance is retained as a measurement limitation; the repeat does not prove behavior under every contention pattern. All other measured median differences were below their case thresholds.

Every measured call is retained here, rounded to four decimal places. Arrays preserve pair order; N means no search and S means search.

showcase read:

```text
N: 606.4640, 979.0154, 930.0496, 531.8534, 545.3391, 517.5236, 547.1328, 786.7837, 846.6189
S: 878.1325, 978.4108, 568.8533, 558.1717, 495.8451, 462.1426, 514.9021, 748.0237, 985.2026
```

showcase plain:

```text
N: 994.3402, 541.6411, 450.3341, 495.1103, 435.5644, 422.2581, 583.3035, 525.8848, 986.0548
S: 681.8167, 522.2774, 487.5669, 545.8812, 594.5439, 479.4396, 469.3598, 492.7824, 857.7247
```

showcase look:

```text
N: 2142.9300, 5917.4686, 4062.9241, 4865.7074, 1665.0396, 1795.4921, 1435.8924, 1568.8995, 1814.5898
S: 13940.1795, 12394.6613, 2920.0466, 3760.2303, 3276.1329, 2203.4714, 1429.6484, 1496.5554, 1266.2802
```

table read:

```text
N: 408.7344, 540.7859, 454.8478, 486.5274, 569.4936, 371.7179, 336.0458, 683.0693, 431.3031
S: 580.1078, 430.5217, 589.0285, 499.1590, 510.5605, 405.0076, 473.0847, 651.4111, 639.4670
```

table plain:

```text
N: 542.2573, 529.4055, 376.5450, 263.1829, 310.4089, 420.7364, 296.4948, 353.2998, 352.9576
S: 393.4135, 402.2040, 283.9846, 279.5901, 325.1815, 459.4717, 351.4978, 461.8615, 288.2557
```

table look:

```text
N: 2210.3684, 1950.3641, 1830.0575, 2527.3191, 2437.7378, 1966.2375, 1976.7200, 1953.4657, 1820.8331
S: 2333.2494, 2204.7346, 1929.4320, 1951.5227, 2148.4979, 1968.2404, 1997.3490, 1983.6400, 1981.4119
```

showcase look repeat:

```text
N: 917.7365, 829.1146, 784.1700, 893.0399, 719.2478, 737.7651, 720.4278, 853.7673, 800.5315
S: 858.8982, 867.7876, 833.6515, 806.1992, 720.8021, 701.4596, 833.4022, 874.4651, 791.5807
```

All final gates below ran sequentially after commit `fcefa2a71a3cf29f007678c165a1ed4e78d5ffbf`; their actual exit codes were captured without a filtering pipeline.

| Command | Exit | Test result |
| --- | --- | --- |
| `npm run format:check` | 0 | — |
| `npm run lint:check` | 0 | — |
| `npm run check` | 0 | — |
| `npm run test:src:core` | 0 | 1209 passed |
| `npm run test:src:browser` | 0 | 402 passed ; 1 skipped |
| `npm run test:src:server` | 0 | 253 passed ; 9 skipped |
| `npm run test:src:bin` | 0 | 4 passed ; 1 skipped |
| `npm run test:guides` | 0 | 249 passed |
| `npm run test:policy` | 0 | 119 passed ; 1 skipped |
| `npm run test:setup` | 0 | 175 passed ; 3 skipped |
| `npm run test:setup:browser` | 0 | 22 passed |
| `npm run build` | 0 | — |
| `npm run test:service` | 0 | 138 passed |
| `git diff --check` | 0 | Clean |
| `git status --porcelain` | 0 | Empty output |

Deviations and limitations: the gate table reports successful final attempts, not an uninterrupted green run. Stale distilled-default and MCP vocabulary expectations were repaired and folded into U1 and U2 respectively. Verification also exposed intermittent failures whose root cause was not established by this reading change. No new skip, assertion relaxation, or timeout increase was introduced.

| Unsuccessful post-commit attempt | Result |
| --- | --- |
| Setup resource-cleanup timeout | 1 failed, 174 passed, 3 skipped |
| Service secret-entry and navigation CDP timeouts | 2 failed, 136 passed |
| Service cross-process frame submission timeout | 1 failed, 137 passed |
| Service replay-preparation control returned `stopped` | 1 failed, 137 passed |

The affected isolated checks passed unchanged; these results explain the retries but do not prove the intermittent failures resolved:

| Exact command | Result |
| --- | --- |
| `npx vitest run --config vite.config.ts --project setup tests/setupGlobal.test.ts -t "releases every acquired resource when a later step throws"` | 1 passed, 8 skipped |
| `npx vitest run --config vite.config.ts --project service tests/service/journey.test.ts tests/service/toolset.test.ts -t "records a secret through|names the beforeunload dialog"` | 2 passed, 64 skipped |
| `npx vitest run --config vite.config.ts --project service tests/service/toolset.test.ts -t "returns the destination view in the receipt of a type with submit that navigates an in-process frame out"` | 1 passed, 33 skipped |
| `npx vitest run --config vite.config.ts --project service tests/service/journey.test.ts -t "stores the run of the same journey"` | 1 passed, 31 skipped |
| `npx vitest run --config vite.config.ts --project service tests/service/journey.test.ts tests/service/toolset.test.ts -t "records a secret through|names the page handling of a type"` | 2 passed, 64 skipped |

The last two isolated checks also address replay/confirmation failures observed during U2 verification. A baseline comparison at `cfc3ad4`, in a temporary checkout inside this worktree, built successfully but did not complete its service run within the 360-second launcher bound (wrapper exit 1, capped after 360,212 ms). That comparison is inconclusive. The temporary checkout was removed without installing dependencies.

A browser mutation run emitted a Vitest close-timeout diagnostic after its passing assertion and exited 0. Initial benchmark harness attempts failed before collecting samples because of file discovery and an incorrect test-helper import; the reported measurements use the corrected harness.

No dependency package or unnamed contract change was required. No subagents were spawned, nothing was pushed or published, and nothing was installed outside the worktree. Task-owned probes were archived under `tmp/codex`; other work was retained. Raw mutation logs, benchmark JSON, proof receipt, and final gate logs remain there alongside this report.
Completed and committed as **`39fd514`**. Two consecutive full journey gates passed **60/60, zero skipped**, in **226.77 s** and **217.89 s**, versus **352.91 s** at `f53c656`. All mutations were restored. `git status --short` is empty. Nothing was pushed.

The measured spans and start offsets are below, in seconds (`span / +offset`).

| Run | light-1280 | dark-1280 | light-390 | dark-390 | Wall | Result |
|---|---:|---:|---:|---:|---:|---|
| `f53c656` baseline | 339.18 / 13.73 | 337.43 / 11.96 | 334.05 / 7.23 | 329.88 / 13.25 | 352.91 | 66 passed |
| J0c baseline repeat | 315.46 / 12.47 | 304.93 / 10.05 | 307.94 / 13.02 | 307.10 / 14.02 | 327.93 | 66 passed |
| Phase 1 | 331.70 / 9.03 | 326.94 / 6.03 | 292.68 / 15.78 | 310.29 / 10.75 | 340.73 | 63 passed, 3 failed |
| Phase 2 | 221.29 / 25.12 | 235.13 / 25.79 | 250.04 / 24.83 | 195.69 / 17.93 | 274.88 | 60 passed |
| Phase 3 | 192.23 / 14.64 | 202.81 / 10.16 | 225.39 / 10.60 | 172.40 / 7.14 | 236.00 | 60 passed |
| **Final 1** | **197.36 / 9.93** | **201.71 / 15.26** | **216.71 / 10.06** | **192.93 / 6.93** | **226.77** | **60 passed** |
| **Final 2** | **193.94 / 9.96** | **198.42 / 5.05** | **209.79 / 8.09** | **182.06 / 7.03** | **217.89** | **60 passed** |

The following durations are summed across each test’s registered variants. Differences include contention changes; they are not isolated measurements of individual cuts. The [per-variant comparison](/home/user/veneer/tmp/codex/j0c4-comparison.md) retains every individual reading.

| Test/table | Baseline | Final 1 | Final 2 |
|---|---:|---:|---:|
| J1 arrival | 11.63 | 8.89 | 10.19 |
| J2 keyboard | 37.92 | 23.59 | 20.83 |
| J3 sections | 275.55 | 84.09 | 86.89 |
| J4 stylesheet comparison | 21.39 | 15.26 | 13.95 |
| J6 vocabulary | 10.27 | 6.35 | 6.84 |
| J7 native controls | 70.19 | 22.90 | 21.68 |
| J8 live engine | 76.44 | 22.81 | 23.43 |
| Disabled refusal | 5.97 | 4.94 | 4.88 |
| Frozen refusal | 13.62 | 4.32 | 4.14 |
| Header tables, combined | 166.48 | 48.35 | 43.63 |
| Portfolio | 4.33 | 3.31 | 3.15 |
| Alert | 18.40 | 13.51 | 13.14 |
| Button | 9.97 | 6.32 | 5.43 |
| Tooltip | 40.14 | 33.69 | 31.13 |
| Popover | 18.54 | 17.21 | 17.09 |
| Tab | 26.66 | 22.27 | 21.52 |
| Dropdown | 48.67 | 34.78 | 34.15 |
| Collapse | 16.33 | 13.90 | 13.92 |
| Accordion | 36.27 | 31.19 | 31.93 |
| Toast | 26.04 | 19.86 | 19.55 |
| Carousel | 49.33 | 44.57 | 44.96 |
| Offcanvas | 24.05 | 20.31 | 20.66 |
| Modal | 32.85 | 30.34 | 31.11 |
| Scrollspy-1280 | 24.32 | 20.47 | 20.46 |
| Scrollspy-390 | 57.04 | 49.52 | 48.53 |
| Navbar-1280 | 12.33 | 7.52 | 7.17 |
| Navbar-390 | 35.97 | 36.16 | 32.60 |
| Responsive offcanvas-1280 | 3.79 | 2.60 | 2.78 |
| Responsive offcanvas-390 | 20.06 | 17.76 | 17.40 |

The split header durations were face **23.11 / 22.77**, theme **9.64 / 7.63**, and pair **15.60 / 13.23** for the final runs. The brief’s retained predictions compare as follows.

| Kept change | Predicted summed saving | Observed baseline reduction, final 1 / 2 |
|---|---:|---:|
| J3 motion and name lookup | 136.4 s | 191.46 / 188.66 s |
| Header placement | About 113 s, plus motion savings | 118.13 / 122.85 s |
| J7/J8/frozen placement | About 78.9 s, plus motion savings | 110.22 / 111.00 s |
| Wide availability rows | About 4.7 s | 6.00 / 6.17 s |
| Toast placement | No summed saving claimed | Balance measured below |

Item 21 kept the single move: **toast from light-390 to dark-390**. Phase 3 measured spans of **192.23 / 202.81 / 225.39 / 172.40 s**. Moving its measured **19.03 s** projected **192.23 / 202.81 / 206.36 / 191.43 s**. The destination scoped run passed in **16.17 s**; this continuation’s restored toast control passed in **17.08 s**.

The retained claims and their mutation controls are recorded below. Every red run exited **1**; every restored green run exited **0**. Counts refer to selected tests, not individual statechart rows.

| Claim retained | Mutation and red excerpt | Restored green |
|---|---|---:|
| Component conditions can settle beyond the default budget | Budget changed to 1,000 ms: `did not hold within 1000ms (waited 1005.5ms)` | 1 passed |
| Harness failures retain row names and causes | Returning only the row name lost the required `…button:` diagnostic prefix; pair and toast JSON also exposed their actual condition errors | 1 passed |
| Face rows read both required themes | Omitted face act: both changing rows reported `pressed=false` where `pressed=true` was required | 2 passed |
| Theme transitions remain proved | Omitted theme act: `light becomes dark through the Dark button: Condition … pressed=true …` | 1 passed |
| Every pair remains proved | Omitted pair act: all four pair names appeared with their condition errors | 1 passed |
| J7 keeps a reading at each width | Omitted email entry: `expected '' to be 'ines@larkspur.example'` | 2 passed |
| J8 keeps a reading at each width | Omitted Desktop alerts activation: `last states: ["pressed=false"]` | 2 passed |
| J8 keeps default motion in light-390 | Built it at reduced motion: `expected true to be false` | 1 passed |
| Frozen specimens remain unchanged with the engine running | Made a frozen control live: `expected ['expanded', 'pressed=true'] … ['expanded']` | 2 passed |
| Reduced-motion declarations take effect | Staged default motion instead: `expected false to be true` | 1 passed |
| Wide navbar retains its unchanged row | Removed it: diff omitted `Field notes hidden through {Escape}` | 1 passed |
| Wide drawer retains its unchanged row | Removed it: diff omitted `escape:hidden` | 1 passed |
| Toast remains proved in dark-390 | Omitted show act: `Close the upload toast hidden through show:click … did not hold within 5000ms` | 1 passed |
| J3 retains its final default-motion landing | Omitted release: the `scrollBehavior === 'smooth'` assertion failed | 1 passed |
| Name lookup refuses duplicates | Allowed repeated names: `expected [Function] to throw an error` | 1 passed |

Header placement remains face in **light-390 and dark-1280**, with theme and pair in **light-390**. J7, J8, and frozen refusal remain in **dark-1280 and light-390**. The [control excerpts](/home/user/veneer/tmp/codex/j0c4-controls-excerpts.txt) and [exit/count ledger](/home/user/veneer/tmp/codex/j0c4-controls-results.json) retain the evidence.

J6 contention readings were:

| Run | light-1280 | dark-1280 | light-390 | dark-390 |
|---|---:|---:|---:|---:|
| `f53c656` | 2.34 | 3.10 | 2.33 | 2.51 |
| J0c baseline repeat | 1.98 | 1.97 | 1.38 | 1.75 |
| Phase 1 | 2.22 | 2.34 | 1.74 | 1.84 |
| Phase 2 | 2.05 | 1.61 | 1.82 | 2.18 |
| Phase 3 | 1.31 | 2.19 | 1.55 | 1.66 |
| Final 1 | 1.50 | 1.69 | 1.45 | 1.71 |
| Final 2 | 2.12 | 1.71 | 1.56 | 1.44 |

Relative to the repeated J0c baseline, the historical increases above 15% were dark-1280 and light-390 in phase 1, and light-390 and dark-390 in phase 2. Both final runs were below `f53c656` in every variant.

All gates were read with their exit codes. Browser runs used the shared `flock`; both final ordinary journeys used the JSON reporter and memory sampler.

| Gate | Exit | Result |
|---|---:|---|
| `format:check` | 0 | 355 files formatted |
| Initial `lint:check` | 1 | Two rejected second arguments to `expect` |
| Final `lint:check` | 0 | No diagnostics |
| `check` | 0 | All configured TypeScript checks passed |
| `test:app:browser` | 0 | 220 passed |
| `test:src:browser` | 1 | 612 passed, 5 host-bound failures |
| `test:setup:browser` | 0 | 92 passed |
| `build` | 0 | All configured builds completed |
| JSON journey, final 1 | 0 | 60 passed, 0 skipped; 226.77 s |
| JSON journey, final 2 | 0 | 60 passed, 0 skipped; 217.89 s |
| `CAPTURE=1 test:journey` | 0 | 60 passed; 318.37 s |
| Capture comparison | 0 | 304 before, 304 after; 0 missing, 0 extra |
| `test:policy` | 0 | 119 passed, 1 skipped |

The source-browser failures exactly matched scaffold main’s **Host-bound set**: Placement’s config-popover-flip, perpendicular keyword dimension swap, Popover-scroll, and Popover-transform cases; and Tip’s markup-leaves case. No other source-browser case failed. Exact titles and diagnostics are in the [verifier report](/home/user/veneer/tmp/codex/j0c4-gates-report.md).

Peak sampled memory was **12,288,905,216 bytes** and **9,267,339,264 bytes**, against a **14,345,035,776-byte** cap. Sampler wall times were **228.25 s** and **219.22 s**; the tables use reporter durations.

The only additional repair was replacing the rejected two-argument `expect` calls with `assert.deepEqual`, preserving array equality and diagnostic messages. Pair and toast controls were rerun red and green afterward. The retained additions are the real-animation wait-budget control and J8’s motion assertion. Excluded optimization items remained excluded; the scoped suite therefore has **60**, rather than the original brief’s **64**, tests. The gate’s engine coverage remains [Chromium](/home/user/veneer/configs/browsers.ts:280).

The phase commits are:

| Phase | Commit |
|---|---|
| Motion declaration and J3 | `4070c56` |
| Wait budget, failure causes, and placements | `0af6193` |
| Wide availability rows | `04af924` |
| Toast placement | `a808e49` |
| Controls and diagnostic assertion repair | **`39fd514`** |

The final commit carries both required trailers. The verified tree is committed and clean.
Committed as `360e27e38da6cc789100a82b0452c34536ff8eb1`, with both required trailers. Working tree is clean; nothing was pushed.

The cuts reduced live action costs, but **the faster saved replay stopped at s10**, so a complete 42-step replay speedup remains unproven.

Measurements against installed 0.0.20 and the local build:

| Measurement | Before | After |
|---|---:|---:|
| Replay tool call | 65.485 s | 5.232 s, stopped |
| Stored replay duration | 63.754 s | 4.586 s, stopped |
| Steps executed / PNGs retained | 42 / 42 | 10 / 10 |
| Live click | 1,512.05 ms | 738.22 ms |
| Live press | 1,473.00 ms | 570.43 ms |
| Live look | 1,493.83 ms | 668.35 ms |

At s10, `"Orders placed before 2 p.m."` failed to appear after consecutive Enter presses. The screenshot shows the accordion closed. Veneer’s collapse implementation ignores toggles during transitions, consistent with the removed latency exposing a timing dependency. No delay or journey change was added.

Separate scratch instrumentation used `performance.now()` over 25,043 accessibility nodes. Values are before → after, in milliseconds:

| Span | Live look | Live click | Live press |
|---|---:|---:|---:|
| AX tree fetch | 523.01 → 635.54 | 520.26 → 581.29 | 591.96 → 497.83 |
| Complete accessibility capture, including fetch | 595.84 → 708.23 | 578.57 → 644.66 | 653.76 → 561.75 |
| Outline render | 1,332.00 → 10.85 | 1,360.61 → 8.50 | 949.70 → 10.21 |
| Observer install | — | 2.22 → 3.51 | 1.74 → 1.44 |
| Observer read and removal | — | 4.80 → 7.74 | 1.92 → 1.95 |

The instrumented scratch copy was deleted.

The changes and proofs are:

- **Parent indexing:** session-and-id maps replace the repeated parent scan, retaining first-match behavior. Existing outline proofs and a byte-exact case with shared ids across three sessions pass.
- **Replay receipt capture:** `follow` skips the unused outline while retaining action lines, settlement, observers, screenshots, and the final replay view. The regression also verifies that a subsequent live call sharing the caller’s signal still captures its view.

The replay regression failed before implementation with exit **1**:

```text
expected [ 'click e1', 'outline' ] to deeply equal [ 'click e1' ]
Tests  1 failed | 165 skipped (166)
```

After implementation, the focused helper, element-manager, toolset, replay, and journey-toolset suites passed: **428 tests across 5 files**, exit **0**.

Every required gate was read with its exit code:

| Gate | Exit | Result |
|---|---:|---|
| `npm run format:check` | 0 | 232 files |
| `npm run lint:check` | 0 | No diagnostics |
| `npm run check` | 0 | Root and four source checks |
| `npm run build` | 0 | Core, server, browser, binary |
| `flock /home/user/.wave/journey.lock npm test` | 0 | 2,500 passed, 3 skipped; 81 files |
| `test:policy`, included in `npm test` | 0 | 119 passed, 1 skipped |

Per-step action timings follow. These exclude target resolution and PNG capture. A dash means the stopped replay never executed that step.

| Step | Action | Before ms | After ms |
|---|---|---:|---:|
| s1 | click | 1973.65 | 58.04 |
| s2 | press | 1934.69 | 13.14 |
| s3 | press | 1889.22 | 19.93 |
| s4 | press | 2106.99 | 73.27 |
| s5 | wait | 9.20 | 9.30 |
| s6 | click | 1411.23 | 55.91 |
| s7 | press | 1353.73 | 17.38 |
| s8 | press | 1439.40 | 30.54 |
| s9 | press | 1384.70 | 85.43 |
| s10 | wait | 5.49 | 2006.11, timeout |
| s11 | click | 1477.07 | — |
| s12 | press | 1452.97 | — |
| s13 | press | 1556.97 | — |
| s14 | press | 1386.06 | — |
| s15 | wait | 4.83 | — |
| s16 | press | 1542.57 | — |
| s17 | wait | 5.31 | — |
| s18 | press | 1600.69 | — |
| s19 | press | 1629.93 | — |
| s20 | click | 1732.40 | — |
| s21 | press | 1812.67 | — |
| s22 | wait | 5.53 | — |
| s23 | press | 1880.74 | — |
| s24 | click | 1432.44 | — |
| s25 | press | 1366.53 | — |
| s26 | press | 1667.46 | — |
| s27 | press | 2076.48 | — |
| s28 | press | 1881.85 | — |
| s29 | click | 1602.24 | — |
| s30 | press | 1453.92 | — |
| s31 | press | 1467.44 | — |
| s32 | press | 1855.24 | — |
| s33 | press | 1951.19 | — |
| s34 | press | 1817.00 | — |
| s35 | press | 1468.46 | — |
| s36 | wait | 6.59 | — |
| s37 | press | 1943.28 | — |
| s38 | press | 1482.58 | — |
| s39 | press | 1335.26 | — |
| s40 | press | 1677.81 | — |
| s41 | press | 1442.52 | — |
| s42 | wait | 5.24 | — |

Further cut proposed, unimplemented: investigate reducing full accessibility-tree retrieval, which dominates the remaining live cost, while preserving reference binding and outline bytes. Separately, the saved journey needs an explicit transition-completion condition before its second toggle.
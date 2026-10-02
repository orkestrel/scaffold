Blocked at the scope’s first requirement: **the phase-1 failures’ cause remains unproved**. I did not proceed to the kept optimization items or change a timeout.

Both diagnostic full gates passed all 66 tests. Every test entered without `MEDIA_STAGE` and with default motion. The longest observed condition wait was 774.5 ms for scroll settling, within its 1,000 ms budget. The saved phase-1 report contains failed row names but omits their underlying errors.

The runs recorded these spans and start offsets, in seconds (`span / offset`):

| Run | light-1280 | dark-1280 | light-390 | dark-390 | Wall | Result |
|---|---:|---:|---:|---:|---:|---|
| Saved baseline | 315.46 / 12.47 | 304.93 / 10.05 | 307.94 / 13.02 | 307.10 / 14.02 | 327.93 | 66 passed |
| Saved phase 1 | 331.70 / 9.03 | 326.94 / 6.03 | 292.68 / 15.78 | 310.29 / 10.75 | 340.73 | 63 passed, 3 failed |
| Diagnostic 1 | 297.51 / 8.18 | 285.73 / 11.91 | 264.65 / 10.64 | 266.34 / 15.95 | 305.69 | 66 passed |
| Diagnostic 2 | 306.47 / 8.30 | 309.37 / 9.94 | 289.72 / 12.46 | 284.30 / 13.29 | 319.32 | 66 passed |

The affected tables measured:

| Table | Baseline | Failed checkpoint | Diagnostic 1 | Diagnostic 2 |
|---|---:|---:|---:|---:|
| scrollspy-1280 | 24.07 | 22.38 | 22.38 | 23.08 |
| offcanvas | 24.36 | 23.40 | 23.19 | 22.50 |
| responsive-offcanvas-390 | 19.50 | 25.70 | 19.50 | 18.38 |

J6 contention readings were:

| Run | light-1280 | dark-1280 | light-390 | dark-390 |
|---|---:|---:|---:|---:|
| Baseline | 1.98 | 1.97 | 1.38 | 1.75 |
| Phase 1 | 2.22 | 2.34 | 1.74 | 1.84 |
| Diagnostic 1 | 2.26 | 2.44 | 2.02 | 2.30 |
| Diagnostic 2 | 2.35 | 2.16 | 2.02 | 1.90 |

Commands completed in this session:

| Command | Exit | Result |
|---|---:|---|
| `npm run build` | 0 | Build completed |
| Diagnostic full journey gate 1 | 0 | `Tests 66 passed (66)` |
| Diagnostic full journey gate 2 | 0 | `Tests 66 passed (66)` |
| `git diff --check` | 0 | No whitespace errors |

Evidence is in [diagnostic 1](/home/user/veneer/tmp/codex/j0c-diagnose.log) and [diagnostic 2](/home/user/veneer/tmp/codex/j0c-diagnose-rows.log). Diagnostic instrumentation was removed from the tracked files.

No new commits were made. HEAD remains phase-1 commit `4070c567f020a4f5fbf22430659e2372a43bb404`. Excluded header reuse, ordering, and intermediate-settle edits were restored. Inherited placement edits belonging to items 6 and 9 remain uncommitted and unvalidated:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.ts
```

Phase-2/3 checkpoints, rebalance, controls, and final acceptance gates were not run because the prerequisite remains unresolved. Consequently, there are no validated optimization savings, final placement, or final memory measurement to report.

The existing capture inventory is **304 before, 304 after, 0 missing, 0 extra**. No fresh capture run was performed.

The approximately 250-second target remains unmet. The consecutive green diagnostic runs establish reproducibility of passing runs; they do **not** establish a repair of the reported failures.
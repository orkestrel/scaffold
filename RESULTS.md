# Results

Publication is on hold. Agent 0.0.30 has passed its release checks. Aggregate adoption remains undecided; the corrected live comparison has not run.

The release evidence is recorded in [the release checkpoint](.orkestrel/agent/instruments/units/agent-0030/release-checkpoint.md).

| Completed run                              | Result                                                                             |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| Agent main `ee734c3`, prepublication gates | 1,857 passed, 2 applicability skips                                                |
| Recorded replay                            | 108 of 108 passed                                                                  |
| Raw request comparison                     | 618 requests per build; no differences or incomplete copies                        |
| Desk packed-consumer checks                | 532 passed, 4 applicability skips                                                  |
| Ollama consumer patch checks               | 811 passed, 2 applicability skips; owner retains live-service and publication work |

The historical Qwen 2B pilot is retained as a stopped experiment. Records and aggregate each passed 9 of 12 goals, but the aggregate supplied no summaries and removed seed context that records retained. Those scores do not establish aggregate quality or equivalence. See [the pilot evidence](.orkestrel/agent/instruments/units/aggregates/reports/resumption-pilot-stop.md).

The corrected experiment preserves identical initial records context. The aggregate persists across read points and must update, revalidate, or retire summaries when their evidence changes. Records, aggregate, and full view will be compared on answer and work quality; full view has an explicitly larger context allowance. Separate judge runs test summaries against conversation evidence.

The requested comparisons remain pending. All model/thinking conditions have been frozen. Calibration has the following measured status; these drafts are not goal-quality scores. See [the calibration record](.orkestrel/agent/instruments/units/aggregates/reports/resumption-live-calibration.md).

| Summarizer |      Draft occurrences | Supported after adjudication | Fit outcome                                                       |
| ---------- | ---------------------: | ---------------------------: | ----------------------------------------------------------------- |
| Qwen 2B    |                    251 |                            1 | Refused: supported draft rejected for spelled-out dates           |
| Gemma 2B   |                    162 |                           55 | Refused: none passed the cutoff needed to reject incorrect drafts |
| Gemma 4B   |                    162 |           Review in progress | Pending                                                           |
| Qwen 4B    | Generation in progress |                      Pending | Pending                                                           |

Generation took 271800 ms for Qwen 2B, 828161 ms for Gemma 2B, and 1099747 ms for Gemma 4B. A focused objective diagnosis and Cursor Opus design pass inform a bounded development revision; the frozen results remain intact.

| Decision model | Thinking disabled | Thinking enabled |
| -------------- | ----------------- | ---------------- |
| Qwen 2B        | Pending           | Pending          |
| Qwen 4B        | Pending           | Pending          |
| Gemma 2B       | Pending           | Pending          |
| Gemma 4B       | Pending           | Pending          |

The independent aggregate harness passed 410 of 410 tests with no skips or failures in 953310 ms. Scaffold tests passed with 1,968 passes, 16 applicability skips, and no failures in 415328 ms. Build, formatting, lint, type, generated-inventory, and relocated operator checks passed. These are instrument checks, not model-quality results. See [the accepted instrument checkpoint](.orkestrel/agent/instruments/units/aggregates/reports/resumption-composed-checkpoint.md).

The aggregate session branch is checked out in the normal scaffold directory. Its committed changes are visible by comparing that branch against main. Scaffold main retains release-only records. Git lists only the primary scaffold checkout; patches and raw evidence from removed worktrees are preserved. Automatic approval review blocked removal of a residual dependency junction, so residual directories remain. See [the consolidation record](.orkestrel/agent/instruments/units/aggregates/reports/resumption-consolidation.md).

The remaining work follows [the campaign plan](.orkestrel/agent/plan.md): finish blind calibration and resource feasibility; select the sustained-work configuration from development evidence; run the model matrix and judge comparison; run the mandatory held-out continuous records-versus-aggregate pair; audit quality, apply justified development tuning, and evaluate on fresh held-out work before ruling on adoption. Publication and the desk re-pin follow the adoption decision and final release checks.

See [detailed progress](.orkestrel/agent/progress.md) for evidence and [the routing ledger](.orkestrel/agent/ledger.md) for unit decisions.

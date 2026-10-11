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

| Summarizer | Draft occurrences | Supported after adjudication | Fit outcome                                                       |
| ---------- | ----------------: | ---------------------------: | ----------------------------------------------------------------- |
| Qwen 2B    |               251 |                            1 | Refused: supported draft rejected for spelled-out dates           |
| Gemma 2B   |               162 |                           55 | Refused: none passed the cutoff needed to reject incorrect drafts |
| Gemma 4B   |               162 |                           93 | Refused: none passed the cutoff needed to reject incorrect drafts |
| Qwen 4B    |               163 |                           43 | Refused: none passed the cutoff needed to reject incorrect drafts |

Generation took 271800 ms for Qwen 2B, 828161 ms for Gemma 2B, 1099747 ms for Gemma 4B, and 839550 ms for Qwen 4B. Every original fit refused admission. The bounded source-clause prompt revision is implemented after objective diagnosis and the requested Cursor Opus design pass. Independent verification passed its full 44-test aggregate file, formatting, canonical build, and artifact bindings. The revision preserves the judge, admission rule, and budgets; its live calibration follows this checkpoint. See [the development ruling](.orkestrel/agent/instruments/units/aggregates/reports/resumption-prompt-l7.md).

The revised calibration is complete. Every fit refuses admission:

| Summarizer | Draft occurrences | Supported | Supported admitted | Separating cutoff |
| --- | ---: | ---: | ---: | ---: |
| Qwen 2B | 168 | 131 | 1 | 0.85 |
| Gemma 2B | 174 | 132 | 0 | 0.78 |
| Gemma 4B | 179 | 137 | 5 | 0.78 |
| Qwen 4B | 171 | 154 | 1 | 0.78 |

Generation took 259460, 758004, 1032491, and 850165 ms respectively. The fit requires at least 50% supported admission while rejecting every scored nonpositive calibration item. These draft occurrences include repetitions; they are not independent samples or goal-quality scores. See [the Qwen 2B adjudication](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l7-q2-adjudication.md), [the Gemma 2B adjudication](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l7-g2-adjudication.md), [the Gemma 4B adjudication](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l7-g4-adjudication.md), [the Qwen 4B adjudication](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l7-q4-adjudication.md), and [the successor calibration record](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l7-calibration.md).

The fixed judge diagnostic confirms poor separation on the decisive example. The unsupported original scores 0.8425; removing both invented relationships yields a supported summary scoring 0.8410. Both readings repeat exactly, with independent calculations matching the raw response probabilities. The instrument ran 8 requests in 22635 ms. This supports revising admission before aggregate quality trials; it does not establish that aggregates help or harm work. Independent Astra analysis and the requested Cursor Opus design challenge are complete. Root accepts a bounded screen of explicit source evidence and candidate separation, with the judge model and thresholds fixed. The screen is being prepared; it has no measured result. See [the judge diagnostic](.orkestrel/agent/instruments/units/aggregates/diagnostics/judge-relations/README.md) and [the admission development ruling](.orkestrel/agent/instruments/units/aggregates/reports/resumption-admission-l8.md).

Qwen 2B with thinking disabled completed its records resource preflight: 24 development goals, 78 recorded requests, a 3072-token context, and a 512-token reserve. Its full-view preflight stopped with an HTTP 500 XML parse error in 1043149 ms. That operational failure does not establish model infeasibility. The full-view request used a derived context allowance of 1068663 tokens; the largest observed successful prompt was 12685 tokens. Effective service capacity remains unproven. See [the preflight evidence](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l7-q2-feasibility.md). The held-out quality comparison remains pending.

| Decision model | Thinking disabled | Thinking enabled |
| -------------- | ----------------- | ---------------- |
| Qwen 2B        | Pending           | Pending          |
| Qwen 4B        | Pending           | Pending          |
| Gemma 2B       | Pending           | Pending          |
| Gemma 4B       | Pending           | Pending          |

Gemma 2B with thinking disabled also passed its records resource preflight: 24 development goals, 67 requests with complete usage, a 3072-token context, and a 512-token reserve, in 158503 ms. This establishes operational feasibility at that reserve; it is not a held-out quality result. See [the Gemma preflight evidence](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l7-g2-feasibility.md).

The independent aggregate harness passed 410 of 410 tests with no skips or failures in 953310 ms. Scaffold tests passed with 1,968 passes, 16 applicability skips, and no failures in 415328 ms. Build, formatting, lint, type, generated-inventory, and relocated operator checks passed. These are instrument checks, not model-quality results. See [the accepted instrument checkpoint](.orkestrel/agent/instruments/units/aggregates/reports/resumption-composed-checkpoint.md).

The aggregate session branch is checked out in the normal scaffold directory. Its committed changes are visible by comparing that branch against main. Scaffold main retains release-only records. Git lists only the primary scaffold checkout; patches and raw evidence from removed worktrees are preserved. Automatic approval review blocked removal of a residual dependency junction, so residual directories remain. See [the consolidation record](.orkestrel/agent/instruments/units/aggregates/reports/resumption-consolidation.md).

The remaining work follows [the campaign plan](.orkestrel/agent/plan.md): resolve the admission judge and complete resource feasibility; select the sustained-work configuration from development evidence; run the model matrix and judge comparison; run the mandatory held-out continuous records-versus-aggregate pair; audit quality, apply justified development tuning, and evaluate on fresh held-out work before ruling on adoption. Publication and the desk re-pin follow the adoption decision and final release checks.

See [detailed progress](.orkestrel/agent/progress.md) for evidence and [the routing ledger](.orkestrel/agent/ledger.md) for unit decisions.

# Results

Publication is on hold until the aggregate experiment and adoption verdict finish. Agent 0.0.30 is verified at main commit `ee734c3`; it is unpublished.

## Development comparison

The active run compares Qwen 2B with thinking disabled across records, a maintained aggregate, and full view on the same 24 development goals. Full view receives a larger input budget as the raw-history reference. This is development evidence; the broader model matrix and final long-work comparison remain required.

| Phase | Measured result |
| --- | --- |
| Calibration generation | Complete: 168 draft occurrences, 584451 ms, exit 0; no manifest errors |
| Independent support labels | Accepted: 123 supported, 21 contradicted, 12 unsupported, 12 ambiguous |
| Admission fit | Refused: cutoff 0.93 admits 0 of 123 supported occurrences; 2513 ms |
| Records | Graded: 11 correct, 12 failed, 1 ambiguous across 24 replies; 78 requests, 416794 ms |
| Full view | Stopped at g05 after an Ollama XML tool-call parsing error; partial run retained, 182083 ms |
| Living aggregate | Not run: the qualification rule withholds every supported calibration draft |
| Adoption | Undecided; no complete corrected three-arm quality result yet |

Claude Opus 5.5 reviewed the MVP plan through the Claude CLI. The selected direction uses the existing commands, overlaps independent labeling/grading with inference, and keeps admission and exposure requirements. The repaired MVP paths passed scoped tests and deliberate-break controls. See [Opus's planning pass](.orkestrel/agent/instruments/units/aggregates/reports/resumption-mvp-opus.md), [verification](.orkestrel/agent/instruments/units/aggregates/reports/resumption-mvp-verification.md), [generation](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l9-q2-generation.md), [label adjudication](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l9-q2-adjudication.md), and [raw l9 runs](.orkestrel/agent/instruments/results/l9).

The corrected fit preserves every semantic judgment and supplies a measured refusal. Opus and an independent Astra analyst are assessing the minimum protocol revision that permits an explicitly developmental quality observation while preserving qualification and adoption requirements. Full-view recovery must retain the malformed-call failure and its costs.

Excluding protocol goal g06, the fresh records result is **11 correct, 11 failed, and 1 ambiguous out of 23**. Tool compliance is separate: 3 of 23 under the system-wide lookup rule, or 17 of 23 under the narrower per-goal tool lists. Stale shipments, superseded contacts, reopened work, and invented refund policy cause material answer failures. See [every fresh per-goal judgment](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l9-q2-records-quality.md), [the measured admission refusal](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l9-q2-fit.md), and [the baseline execution evidence](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l9-q2-baselines.md).

## Earlier results and limits

An independent review of the historical Qwen 2B records run found **11 correct answers, 12 failures, and 1 ambiguous answer across 24 goals**. Excluding the protocol's g06 gives 11–12 content passes out of 23. The stored pattern scorer reported 14 passes. Four otherwise correct replies omitted a required lookup. This historical, unblinded result does not grade the fresh run. See [the per-goal evidence](.orkestrel/agent/instruments/units/aggregates/reports/resumption-q2-historical-quality.md).

Earlier thinking-disabled records resource checks completed for Qwen 2B, Qwen 4B, Gemma 2B, and Gemma 4B. Thinking-enabled comparisons and held-out quality remain pending. Earlier calibration fits refused useful admission, and the original pilot supplied no aggregate summaries while changing the initial context. Those runs cannot establish aggregate quality or equivalence. See [the calibration refusals](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l7-calibration.md) and [the original STOP result](.orkestrel/agent/instruments/units/aggregates/reports/resumption-pilot-stop.md).

## Release checks

Agent prepublication gates passed 1857 tests with 2 applicability skips. The recorded replay passed 108 of 108, and raw comparison found no differences or incomplete copies across 618 requests per build. Desk checks passed 532 tests with 4 skips; the Ollama patch passed 811 with 2 skips. Publication, published-package consumer pins, and any verification required by an adoption change remain pending. See [the release checkpoint](.orkestrel/agent/instruments/units/agent-0030/release-checkpoint.md).

## Remaining work

Finish and grade the MVP, make bounded development corrections justified by its results, then run the feasible Qwen/Gemma 2B/4B conditions with thinking enabled and disabled. Complete the blind audit and the mandatory final continuous records-main-versus-aggregate work comparison before the adoption decision. Report semantic quality, required tool/action compliance, aggregate exposure, operational failures, and fresh costs separately.

Work lives in the normal scaffold checkout on `claude/confident-maxwell-6nd0f3`. Compare this branch with main to see committed changes. Scaffold main remains release-only. Registered worktrees are removed; evidence and patches are preserved. Automatic approval review rejected residual dependency-junction cleanup, so those directories remain. See [the consolidation record](.orkestrel/agent/instruments/units/aggregates/reports/resumption-consolidation.md).

See [the plan](.orkestrel/agent/plan.md), [detailed progress](.orkestrel/agent/progress.md), and [routing ledger](.orkestrel/agent/ledger.md).

# Results

The l13 records-versus-aggregate-versus-full-view comparison has run and received a blind quality audit. Aggregate adoption for possible 0.0.31 remains undecided. Agent 0.0.30 is published.

## Qwen 3.5 2B, thinking disabled

Each arm emitted all 24 planned goal rows on source `0913a0966`. An independent Astra auditor graded the combined anonymous packet before arm identities were joined. Complete work requires correct content and the required actions; useful wording alone does not pass.

| Arm | Correct content | Ambiguous content | Required system actions | Complete work | Run tokens | Duration |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Records | 12/24 | 1/24 | 4/24 | 3/24 | 105231 | 387868 ms |
| Living aggregate | 10/24 | 1/24 | 5/24 | 4/24 | 360086 | 1117586 ms |
| Full view | 7/24 | 0/24 | 7/24 | 4/24 | 271750 known | 936483 ms |

Full view retained a failed goal with no final answer after an HTTP 500; that request's usage is unknown. Records and aggregate each also have one ambiguous complete-work judgment. Excluding the predeclared protocol-sensitive g06 gives correct content of 12/23, 10/23, and 7/23, and complete work of 3/23, 4/23, and 4/23. Under the narrower per-goal tool lists, compliance is 17/23, 18/23, and 19/23; those lists do not waive the system's fresh-lookup requirement.

Aggregate completed one more task than records but had fewer correct answers and used 3.42 times the run tokens. It improved the Grace escalation answer and performed the required depot-release lookup, but lost correctness on the ticket note, temporary sign-off cover, and discount eligibility. All arms struggled with fresh lookups, superseded facts, closed work, and unsupported additions. This development observation does not establish a general winner.

Maintained summaries reached the actual agent request on 15 of 24 aggregate goals. Six capped summary updates were withheld while the task continued. Run tokens include every recorded role; separate calibration and preparation costs remain in their campaign records. Full view used its disclosed larger input budget. See [the sealed audit and every per-goal reason](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l13-quality/README.md), [aggregate costs](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l13-aggregate-run.md), [records and exposure](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l13-records-run.md), and [full-view costs](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l13-full-run.md).

## Work in progress

The repaired measurement code is pushed at `5b9935430`. Independent review and scoped checks passed, including the complete exploratory runtime fixture in 2137628 ms; the canonical live build preserves all 624 tested output hashes. Actual Claude Opus 5.5 and independent Astra analysis informed [the accepted direction](.orkestrel/agent/instruments/units/aggregates/reports/resumption-comparison-completion-direction.md). Strict qualification and adoption requirements remain unchanged. See [the repair decision and failed-gate measurements](.orkestrel/agent/instruments/units/aggregates/reports/resumption-admission-repair.md).

L14 has frozen all eight decision-mode configurations. Its fixed calibration generations have these statuses; these are support-calibration measurements, not task-quality results.

| Summarizer | Generation | Opaque items | Independent labels |
| --- | --- | ---: | --- |
| Qwen 2B | Closed, 594801 ms | 168 | Written; mechanical checks passed |
| Gemma 2B | Closed, 1155940 ms | 174 | Written; mechanical checks passed |
| Gemma 4B | Closed, 1456410 ms | 179 | Written; mechanical checks passed |
| Qwen 4B | Closed, 1281189 ms | 171 | Written; mechanical checks passed |

Root adjudication and fixed fits are complete. Gemma 2B passed strict calibration at AGREE 0.59, admitting 112/131 supported occurrences and 21/29 distinct supported identities. Qwen 4B passed at 0.61, admitting 136/154 and 35/43. Qwen 2B and Gemma 4B were refused because their strict cutoffs admitted too few supported summaries; their predeclared exploratory cutoffs are 0.67 and 0.57. These are calibration outcomes, not task-quality wins. See [the calibration evidence and costs](.orkestrel/agent/instruments/results/l14/README.md). Qwen 2B resource/full preparation is next. No l14 quality verdict or continuous model pair exists yet.

The remaining measurements are:

- Feasible Qwen/Gemma 2B/4B conditions with decision thinking disabled and enabled, followed by blind comparison and the separate judge shadow.
- The mandatory continuous long-work records-main-versus-aggregate pair, carrying earlier work and corrections forward without resetting the conversation.
- Bounded tuning justified by those results, fresh evaluation where tuning changes the method, and the final adoption verdict.

No continuous pair has run. No aggregate integration decision follows from l13 alone.

## Release and workspace

Published agent 0.0.30 matches the verified archive. Agent main is at `ee734c3`; release checks passed 1857 tests with 2 applicability skips, replay 108/108, and a raw comparison with no differences across 618 requests per build. See [publication](.orkestrel/agent/instruments/units/agent-0030/publication.md).

Toolbox 0.0.19 (`979d725`) and Ollama 0.0.23 (`93ea1cb`) are published and registry-confirmed, matching their verified archives. Their full release chains passed 860 tests with 2 skips and 899 tests with 3 skips respectively; Ollama includes 76/76 live service tests. Earlier fixture failures remain recorded; the previously hidden failed predicate was not reconstructed. Desk's registry re-pin is pushed at `af774cd` after format, lint, type checks, 532 tests with 4 conditional skips, six browser journeys, and production build passed. Supervisor and Tactica are excluded by user instruction. See [downstream status](.orkestrel/release.md#agent-0030-downstream-re-pins).

Aggregate work is in the normal scaffold checkout on `claude/confident-maxwell-6nd0f3`; compare that branch with main for committed changes. Scaffold main remains release-only at `a64a80b`, with downstream closure recorded and pushed as a fast-forward. The completed Agent release and Ollama compatibility worktrees are removed; the previously rejected dependency-junction cleanup remains untouched. See [the plan](.orkestrel/agent/plan.md), [progress](.orkestrel/agent/progress.md), and [routing ledger](.orkestrel/agent/ledger.md).

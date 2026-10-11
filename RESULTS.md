# Results

Agent 0.0.30 is published. Aggregate adoption for possible 0.0.31 remains undecided. Records and full view completed the Qwen 2B development comparison and blind grading. The l12 aggregate successor answered 2 of 24 goals, then stopped when a summary exhausted its output budget. The bounded revision is implemented and independently verified: withhold that failed update and continue the task. L13 will measure its complete trajectory with fresh records/full baselines on the same build.

## Blind quality results

The l11 runs use Qwen 3.5 2B with thinking disabled on the same authored conversation. Full view has a larger disclosed input budget. An independent auditor graded anonymized outputs before their identities were revealed. Every planned goal remains in the denominator.

| Arm | Correct content | Ambiguous content | Required system actions satisfied | Complete work | Launcher duration |
| --- | --- | --- | --- | --- | --- |
| Records | 12/24 | 0/24 | 4/24 | 3/24 | 349081 ms |
| Full view | 6/24 | 1/24 | 7/24 | 4/24 | 874459 ms |
| Living aggregate | Pending blind grading; 2/24 goals answered in l12 | — | — | — | Failed l12 attempt: 148136 ms |

Both baselines often omit a required fresh lookup. Other failures include stale shipment status, superseded contacts, invented refund instructions, and unanswered parts of requests. Full view retained a failed goal after an XML tool-parser error and continued. The automatic pattern scorer reported 14 and 11 matches; those figures are superseded by the blind quality judgments for interpretation.

Excluding the predeclared protocol-sensitive g06 gives content results of 12/23 for records and 6/23 plus 1 ambiguous for full view; completed work is 3/23 and 4/23. Under the narrower per-goal tool lists, compliance is 17/23 and 20/23. This distinction does not waive the controlling system instructions. See [every sealed and joined judgment](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l11-quality/joined.md).

Recorded inference usage is 101937 input and 3294 output tokens for records, versus 269257 input and 2493 output tokens for full view. Full view also has a sent HTTP 500 request with unknown usage. The failed aggregate attempt consumed 5671 input and 98 output tokens across its sent requests; its unsent followers incurred no model expense. See [run evidence and costs](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l11-development-runs.md).

## Aggregate execution and remaining work

The harness rejected an intentional one-token judge response solely because its finish reason was length. The correction recognizes that exact raw-logprob protocol while retaining fault and capacity checks. An independent removal test reproduced the refusal; restoration passed the focused regression, development 5/5, capacity 6/6, and scoped static/build checks. See [verification](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l11-judge-length-verifier.md).

L12 answered g01 and g02 with nonzero summary exposure. Request 46, a summarizer call at g03, reached its 160-token output cap mid-sentence. The frozen policy stopped the trajectory: g03 has no answer and the remaining 21 goals were unattempted. The 46 sent requests consumed 37853 input and 1042 output tokens, with complete usage; the later unsent attempts incurred no inference cost. See [the retained l12 failure](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l12-development-run.md).

The accepted direction treats this exact capped summary as an unavailable update while preserving the task's records and valid summaries. Independent deliberate breaks failed at the expected continuation and cache-exclusion assertions. Restoration passed the focused regression, development 6/6, capacity 7/7, and scoped static/build gates. See [the policy ruling](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l12-maintenance-direction.md) and [the implementation proof](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l12-maintenance-fix.md). The development policy remains unqualified: strict calibration at 0.93 admitted no supported drafts; development uses AGREE 0.67 and CHANGE 0.56. These observations cannot establish adoption.

The feasible Qwen/Gemma 2B/4B quality conditions with thinking enabled and disabled remain pending beyond this Qwen 2B observation. The mandatory final continuous long-work records-main-versus-aggregate comparison has not run. Complete those measurements, justified bounded tuning, and the blind analysis before deciding whether to integrate aggregates.

## Release and workspace

The published 0.0.30 package matches the verified archive. Agent main is clean at `ee734c3`; release checks passed 1857 tests with 2 applicability skips, replay 108/108, and a raw comparison with no differences across 618 requests per build. Desk's published-package upgrade awaits an X2-compatible Ollama release from its owner. See [publication](.orkestrel/agent/instruments/units/agent-0030/publication.md) and [the desk prerequisite](.orkestrel/agent/instruments/units/agent-0030/desk-publication-prerequisite.md).

Aggregate work occupies the normal scaffold checkout on `claude/confident-maxwell-6nd0f3`; compare that branch with main to see committed changes. Scaffold main remains release-only. The completed release worktree is removed. Residual dependency-junction cleanup remains untouched after automatic approval review rejected it. See [the consolidation record](.orkestrel/agent/instruments/units/aggregates/reports/resumption-consolidation.md).

See [the execution plan](.orkestrel/agent/plan.md), [detailed progress](.orkestrel/agent/progress.md), and [routing ledger](.orkestrel/agent/ledger.md).

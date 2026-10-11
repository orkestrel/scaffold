# Results

Publication is on hold until the aggregate experiment and adoption verdict finish. Agent 0.0.30 is verified. The corrected records-versus-aggregate-versus-full-view quality comparison has not run.

## Admission blocker

The aggregate can produce supported summaries, but its admission judge does not separate them reliably from unsupported summaries. Running with useful summaries withheld would repeat the original pilot's empty treatment.

The revised source-clause prompt improved development support, but every fit refused. Qualification requires at least 50% supported admission while rejecting every scored nonpositive calibration item. These are draft occurrences, including repetitions, rather than independent samples or work-quality scores.

| Summarizer | Supported drafts / occurrences | Supported admitted |
| --- | ---: | ---: |
| Qwen 2B | 131 / 168 | 1 |
| Gemma 2B | 132 / 174 | 0 |
| Gemma 4B | 137 / 179 | 5 |
| Qwen 4B | 154 / 171 | 1 |

See [the calibration evidence](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l7-calibration.md).

The original controlled judge test scored an unsupported summary at 0.8425 and its supported correction at 0.8410. Independent Astra analysis and the requested Cursor Opus design pass led to a fixed test separating source evidence from the candidate. Its offline verification and audit passed. The live screen exited 0 uncapped in 23826 ms, but its ranking refused the revision: the supported candidate scored 0.8022, while a candidate retaining an invented repair prerequisite scored 0.8429 in both passes. Independent verification confirmed complete request custody and matching score calculations. Root accepts this measured refusal. These local scores are not an adoption verdict. See [the original diagnostic](.orkestrel/agent/instruments/units/aggregates/diagnostics/judge-relations/README.md), [the design ruling](.orkestrel/agent/instruments/units/aggregates/reports/resumption-admission-l8.md), and [the screen evidence](.orkestrel/agent/instruments/units/aggregates/diagnostics/admission-l8/README.md).

## Model runs

Root selected a bounded statement-support test after Astra and Cursor Opus returned their proposals. Each check keeps the full summary for interpreting the focused statement and uses only the conversation as evidence. Offline implementation and independent checks precede the fixed live test; no canonical admission change is accepted. See [the reconciled direction](.orkestrel/agent/instruments/units/aggregates/reports/resumption-focused-ruling.md).

Thinking-disabled records resource checks passed at a 3072-token context and 512-token reserve. Each run served 24 development goals. These checks establish resource feasibility, not held-out answer quality.

| Decision model | Requests | Duration | Thinking-enabled resource | Held-out quality matrix |
| --- | ---: | ---: | --- | --- |
| Qwen 2B | 78 | 133738 ms | Pending | Pending |
| Gemma 2B | 67 | 158503 ms | Pending | Pending |
| Qwen 4B | 67 | 274754 ms | Pending | Pending |
| Gemma 4B | 75 | 269897 ms | Pending | Pending |

See the resource evidence for [Qwen 2B](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l7-q2-feasibility.md), [Gemma 2B](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l7-g2-feasibility.md), [Qwen 4B](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l7-q4-feasibility.md), and [Gemma 4B](.orkestrel/agent/instruments/units/aggregates/reports/resumption-l7-g4-feasibility.md).

Qwen 2B full-view preflight failed with an HTTP 500 XML parse error in 1043149 ms. That is an operational failure, not model infeasibility. Daemon evidence shows that its requested 1068663-token window was clamped to 262144; the final successful prompt used 12685 tokens. Full-view qualification must bind effective capacity separately from the requested window. Further feasibility runs wait for the admission implementation decision because a canonical change requires fresh resource evidence. See [the failure and recovery evidence](.orkestrel/agent/instruments/units/aggregates/diagnostics/q2-full-failure/README.md), [the capacity finding](.orkestrel/agent/instruments/units/aggregates/diagnostics/q2-full-capacity/README.md), and [the custody contract](.orkestrel/agent/instruments/units/aggregates/reports/resumption-feasibility-custody.md).

The historical pilot passed 9 of 12 goals in each arm, but supplied no aggregate summaries and changed the initial seed context. Its STOP result cannot establish quality equivalence. See [the original pilot](.orkestrel/agent/instruments/units/aggregates/reports/resumption-pilot-stop.md).

## Release and implementation

The completed checks passed with the following scope. See [the release checkpoint](.orkestrel/agent/instruments/units/agent-0030/release-checkpoint.md) and [the instrument checkpoint](.orkestrel/agent/instruments/units/aggregates/reports/resumption-composed-checkpoint.md).

| Check | Result |
| --- | --- |
| Agent main `ee734c3`, prepublication gates | 1857 passed; 2 applicability skips |
| Recorded replay | 108 of 108 passed |
| Raw request comparison | 618 requests per build; no differences or incomplete copies |
| Desk packed-consumer checks | 532 passed; 4 applicability skips |
| Ollama consumer patch checks | 811 passed; 2 applicability skips; owner retains live-service and publication work |
| Aggregate harness | 410 of 410 passed |
| Scaffold | 1968 passed; 16 applicability skips; static and build gates passed |

## Remaining work and location

Resolve admission from the retained failures, complete resource/full-view qualification, and run feasible records, maintained-aggregate, and full-view cells with thinking disabled and enabled. Then complete the separate judge shadow, blind work-quality audit, justified development tuning, and fresh held-out evaluation. The final long continuous records-main-versus-aggregate comparison remains mandatory before adoption. Publication and the desk re-pin follow that decision and final release checks.

The aggregate branch is checked out in the normal scaffold directory: `claude/confident-maxwell-6nd0f3`. Compare that branch against main to see committed changes. Scaffold main retains release-only records. Registered worktrees are removed; their patches and evidence are preserved. Residual directories remain after automatic approval review rejected dependency-junction cleanup. See [the consolidation record](.orkestrel/agent/instruments/units/aggregates/reports/resumption-consolidation.md).

See [the plan](.orkestrel/agent/plan.md), [detailed progress](.orkestrel/agent/progress.md), and [the routing ledger](.orkestrel/agent/ledger.md).

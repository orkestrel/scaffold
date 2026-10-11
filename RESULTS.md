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

The admission diagnostics recorded complete requests and matching score calculations, but the independent focus audit found a mistaken positive label: the supposedly corrected summary says the ticket remains open, while its sources only instruct reopening. Both focuses are unsupported under the fixed completion rule. The raw scores remain valid; their claimed supported-versus-unsupported comparison and judge-misranking conclusion are withdrawn. Independent labels accept a corrected pair before focused inference. The exact wording check found no affected supported calibration item. See [the control correction](.orkestrel/agent/instruments/units/aggregates/reports/resumption-focus-control-correction.md), [corrected labels](.orkestrel/agent/instruments/units/aggregates/reports/resumption-focus-labels.md), and [the bounded impact check](.orkestrel/agent/instruments/units/aggregates/reports/resumption-focus-impact.md).

## Model runs

The complete-summary screen passed its fixed live test: 88 requests in 135266 ms, with every supported boundary candidate outranking its unsafe counterpart in both directions. Independent raw-score calculations and all 97 packet bindings matched. The next step is integrating contextual statement checks and exact checked-prose rendering, then full calibration. See [the accepted live screen](.orkestrel/agent/instruments/units/aggregates/diagnostics/focused-boundaries/README.md).

The corrected statement-support test passed: supported text scored 0.7571 and unsupported text scored 0.3958 in both request orders. All 4 requests completed in 14698 ms with matching raw-score calculations. Each check retained the complete summary as context and used only conversation sources as evidence. This local result follows independent review and offline verification; complete-summary and boundary controls must pass before full admission calibration. No canonical admission change or work-quality verdict follows from this result. See [the test and raw evidence](.orkestrel/agent/instruments/units/aggregates/diagnostics/focused-support/README.md).

Independent review settled the screen's 14 complete candidates: 6 supported, 6 contradicted, 1 unsupported, and 1 ambiguous. The earlier supported statement belongs to an ambiguous complete summary because another statement overstates contact-information availability. The passing screen retains that distinction; it does not certify the ambiguous summary. See [the labels and frozen test](.orkestrel/agent/instruments/units/aggregates/diagnostics/focused-boundaries/root-label-ruling.md).

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

The capacity diagnostic completed 30 inference requests and 40 metadata requests in 306155 ms, with all saved-byte checks passing. Every tested model accepted the larger-context prompt and rejected the identical input at the smaller context. Qwen and Gemma 4B reached their generation boundary; Gemma 2B stopped early, leaving that control inconclusive. A bounded padded Gemma 2B control is in preparation. These observations precede full-workload qualification. See [the raw evidence and limits](.orkestrel/agent/instruments/units/aggregates/diagnostics/capacity-controls/README.md).

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

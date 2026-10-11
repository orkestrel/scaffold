# Results

Publication is on hold until the aggregate experiment and adoption verdict finish. Agent 0.0.30 is verified. The corrected records-versus-aggregate-versus-full-view quality comparison has not run.

The immediate MVP is Qwen 2B with thinking disabled, the same 24 development goals, and three conditions: records, living aggregate, and full view. Report per-goal quality, aggregate exposure, failures and costs before expanding conditions. Verification is limited to the paths this run uses; the wider matrix and sustained-work checks remain required before adoption. No new reporting interface or diagnostic campaign is planned.

Claude Opus 5.5 reviewed that plan through the Claude CLI and supports the existing commands and scope. The MVP path is now verified: the repaired resource-ladder test and all 23 refit/capacity tests pass, and the three prescribed deliberate break tests fail as intended. Source was restored exactly and the final canonical build passed. This composes with the earlier passing tests; it is not a fresh full-campaign pass. Fresh calibration is next, with independent labeling alongside records/full-view runs. An aggregate pilot must still qualify and actually expose summaries. See [Opus's planning report](.orkestrel/agent/instruments/units/aggregates/reports/resumption-mvp-opus.md) and [verification evidence](.orkestrel/agent/instruments/units/aggregates/reports/resumption-mvp-verification.md).

## Actual answer quality available now

An independent semantic review of the historical Qwen 2B records run found **11 correct answers, 12 failures and 1 ambiguous answer across 24 goals**. Its stored pattern scorer reported 14 passes. Excluding the protocol's g06 leaves 11–12 content passes out of 23. Four otherwise correct answers omitted the lookup required by the scenario's order-handling rule; tool compliance is reported separately from content quality.

Failures include using superseded contacts, applying one customer's shipment state to another, and treating reopened tickets as closed. This is an unblinded historical baseline, not the corrected three-arm result. See [all per-goal findings and raw references](.orkestrel/agent/instruments/units/aggregates/reports/resumption-q2-historical-quality.md).

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

The complete-summary screen passed its fixed live test: 88 requests in 135266 ms, with every supported boundary candidate outranking its unsafe counterpart in both directions. Independent source audits passed, but integrated execution found failures: build/type/format/lint passed, then 402 of 423 tests passed and 21 failed. The causes are now bounded to source-extension validation, stale synthetic judge/summary expectations, an archived request expectation missing the approved shift flag, and handling unsent attempts after a measured refusal. Exact repairs are in progress. The first Qwen 2B model commands are prepared; no fresh comparison has started. See [the accepted live screen](.orkestrel/agent/instruments/units/aggregates/diagnostics/focused-boundaries/README.md), [the admission source audit](.orkestrel/agent/instruments/units/aggregates/reports/resumption-contextual-audit.md), and [the capacity source audit](.orkestrel/agent/instruments/units/aggregates/reports/resumption-capacity-audit.md).

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

The capacity diagnostic completed 30 inference requests and 40 metadata requests in 306155 ms, with all saved-byte checks passing. Every tested model accepted the larger-context prompt and rejected the identical input at the smaller context. The padded Gemma 2B successor then reached 2047 prompt-plus-output tokens in a 2048-token slot and finished by length, in 17737 ms. Root accepts the bounded deployment observation; work-quality qualification remains separate. See [the original evidence](.orkestrel/agent/instruments/units/aggregates/diagnostics/capacity-controls/README.md) and [the completed successor](.orkestrel/agent/instruments/units/aggregates/diagnostics/capacity-g2/README.md).

## Release and implementation

The completed checks passed with the following scope. See [the release checkpoint](.orkestrel/agent/instruments/units/agent-0030/release-checkpoint.md) and [the instrument checkpoint](.orkestrel/agent/instruments/units/aggregates/reports/resumption-composed-checkpoint.md).

| Check | Result |
| --- | --- |
| Agent main `ee734c3`, prepublication gates | 1857 passed; 2 applicability skips |
| Recorded replay | 108 of 108 passed |
| Raw request comparison | 618 requests per build; no differences or incomplete copies |
| Desk packed-consumer checks | 532 passed; 4 applicability skips |
| Ollama consumer patch checks | 811 passed; 2 applicability skips; owner retains live-service and publication work |
| Earlier aggregate harness checkpoint | 410 of 410 passed; current admission/capacity changes are under the focused verification described above |
| Scaffold | 1968 passed; 16 applicability skips; static and build gates passed |

## Remaining work and location

Resolve admission from the retained failures, complete resource/full-view qualification, and run feasible records, maintained-aggregate, and full-view cells with thinking disabled and enabled. Then complete the separate judge shadow, blind work-quality audit, justified development tuning, and fresh held-out evaluation. The final long continuous records-main-versus-aggregate comparison remains mandatory before adoption. Publication and the desk re-pin follow that decision and final release checks.

The aggregate branch is checked out in the normal scaffold directory: `claude/confident-maxwell-6nd0f3`. Compare that branch against main to see committed changes. Scaffold main retains release-only records. Registered worktrees are removed; their patches and evidence are preserved. Residual directories remain after automatic approval review rejected dependency-junction cleanup. See [the consolidation record](.orkestrel/agent/instruments/units/aggregates/reports/resumption-consolidation.md).

See [the plan](.orkestrel/agent/plan.md), [detailed progress](.orkestrel/agent/progress.md), and [the routing ledger](.orkestrel/agent/ledger.md).

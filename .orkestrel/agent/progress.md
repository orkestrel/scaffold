# Release and aggregate progress

The existing release candidate is verified, but publication is deferred by the user until the aggregate comparison and adoption verdict finish. Aggregate model-quality evaluation remains pending. This record distinguishes release-source verification, the stopped pilot, and offline instrument proofs. For remaining work and its order, see [the resumption plan](plan.md#resume-from-the-verified-state-of-2026-10-10).

The active aggregate checkout is `C:/Users/mikes/WebstormProjects/scaffold`, on `claude/confident-maxwell-6nd0f3`. Scaffold main stays at `215a103595e57d0536d0d2ca23980a0506838ae2` with release records only, including the publication hold. Root accepts the instrument at source checkpoint `4f3e0220d` after the completed independent gates. See [the concise results](../../RESULTS.md).

On 2026-10-11, the independent composed harness passed 410 of 410 tests across 81 suites, with no skips, cancellations, or todo tests, in 953310 ms. The canonical build and scaffold format, lint, type, and build commands passed. The successor proved idempotent host-inventory regeneration and passed scaffold tests: 1,968 passes, 16 applicability skips, and no failures in 415328 ms. Relocated source, emitted-build, and operator checks passed. See [the accepted instrument checkpoint](instruments/units/aggregates/reports/resumption-composed-checkpoint.md). Live freezes and blind calibration are the next phase; corrected model-quality results remain pending.

The aggregate branch and root RESULTS.md are available in the normal scaffold directory. The aggregate branch stays separate from main. Git lists only the primary scaffold checkout. Local patches, raw proofs, and build evidence from removed worktrees are retained. See [the consolidation record](instruments/units/aggregates/reports/resumption-consolidation.md) for historical path mappings and the residual cleanup rejected by automatic approval review.

All requested model/thinking conditions froze successfully. Qwen 2B generated 251 calibration draft occurrences in 271800 ms. Root accepted the independent support labels: 1 supported, 122 unsupported, 123 contradicted, and 5 ambiguous. The offline fit refused in 2273 ms because no supported draft reached judge scoring; the supported draft's spelled-out dates failed the exact-number check. This measured refusal is retained for development analysis. Gemma 2B generation completed with 162 occurrences in 828161 ms and is under independent blind review; Gemma 4B generation is active. See [the live calibration record](instruments/units/aggregates/reports/resumption-live-calibration.md). Goal-quality comparisons and adoption remain pending.

## Release evidence

The completed release runs establish the following results. See [the agent 0.0.30 release checkpoint](https://github.com/orkestrel/scaffold/blob/68060778df1e737e51ab083e90af81683c49671c/.orkestrel/agent/instruments/units/agent-0030/release-checkpoint.md) for scope, hashes, skips, and consumer limits. The same record is available in the primary scaffold checkout under `.orkestrel/agent/instruments/units/agent-0030/release-checkpoint.md`.

| Run                        | Result                                                               | Scope                                                                                                  |
| -------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Agent `prepublishOnly`     | Exit 0; 1,857 passed, 2 applicability skips; 43,574 ms               | Final release format, lint, type, build, and tests at agent main `ee734c3`                             |
| Recorded replay            | 108 of 108 passed; 6,279 ms                                          | Recovered recorded-run oracle                                                                          |
| Raw request comparison     | 618 requests per build; 0 differences or incomplete copies; 5,784 ms | Serialized request bodies; agent and judge mutation controls each detected a changed request           |
| Desk packed-consumer gates | 532 passed, 4 applicability skips; 241,760 ms                        | Packed agent plus patched Ollama; published-artifact re-pin remains pending                            |
| Ollama patch gates         | 811 passed, 2 applicability skips; 22,338 ms                         | Type, lint, format, build, and offline tests; live-service and publication steps remain with the owner |

Agent main contains version 0.0.30. npm publication has not been attempted in this resumption. The user's subsequent instruction defers publication through complete comparisons, analysis, development tuning, and the adoption verdict. That instruction supersedes the earlier keyboard-availability condition. If adoption changes the package, the final package and consumers require verification before publication. Publication must be confirmed through npm output and the registry before the desk re-pin is reported complete.

## Model runs and their limits

The original q2 pilot ran on the earlier protocol. Its results remain STOP, with raw evidence retained. See [the calibration verification](instruments/units/aggregates/reports/resumption-calibration.md) and [the pilot stopping evidence](instruments/units/aggregates/reports/resumption-pilot-stop.md).

| Run                            | Observed result                                                                                       | Interpretation                                                                                                           |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Archived seed pass             | 500 live questions; 823 cache rows; 1,897,212 ms                                                      | Filing preparation, recorded in the original handoff; no answer-quality comparison                                       |
| Original calibration           | 36 passed and 54 failed summaries from 90; CHANGE 0.56, AGREE 0.82; 523,314 ms                        | Historical calibration; later blind analysis questions the original positive labels                                      |
| Original q2 control            | 9 of 12 goals passed; 62,359 ms                                                                       | Observed control result under the original protocol                                                                      |
| Original q2 aggregate          | 9 of 12 goals passed; 67,990 ms; zero rendered topics on every goal                                   | No admitted treatment, so equal scores do not establish equivalence                                                      |
| Original aggregate maintenance | 249 builds failed: 156 code-check failures and 93 AGREE failures; 83 topic/read-point groups withheld | Rejection-path evidence, not proof that every draft was semantically wrong                                               |
| Original pilot comparison      | Initial plan invariant failed                                                                         | Aggregate reservation removed seed messages that the control retained; the nominal treatment changed the initial context |

The original first control selection retained seed indices 33 through 47; aggregate retained 40 through 47. The corrected plan keeps the initial records selection identical and adds a supported summary only within available headroom. The summary persists across read points, but changed or removed evidence requires revalidation, rebuilding, or retirement. Judges can compare against eligible earlier aggregate state in a separate shadow run; that shadow does not silently change live filing.

The requested model comparison has this status.

| Decision configuration      | Records / aggregate / full-view matrix                          | Final continuous pair         |
| --------------------------- | --------------------------------------------------------------- | ----------------------------- |
| Qwen 2B, thinking disabled  | Pending under the corrected protocol; original STOP is separate | Pending feasibility selection |
| Qwen 2B, thinking enabled   | Pending                                                         | Pending feasibility selection |
| Qwen 4B, thinking disabled  | Pending                                                         | Pending feasibility selection |
| Qwen 4B, thinking enabled   | Pending                                                         | Pending feasibility selection |
| Gemma 2B, thinking disabled | Pending                                                         | Pending feasibility selection |
| Gemma 2B, thinking enabled  | Pending                                                         | Pending feasibility selection |
| Gemma 4B, thinking disabled | Pending                                                         | Pending feasibility selection |
| Gemma 4B, thinking enabled  | Pending                                                         | Pending feasibility selection |

The final pair uses the configuration selected by the frozen development feasibility rank; it is not selected by evaluation quality. The full-view reference has an explicitly larger measured context allowance. Its scores cannot be presented as an equal-budget comparison. No aggregate adoption verdict exists.

## Instrument verification

The following historical runs test the measurement implementation with real components and controlled local inputs. Their pending boundaries describe each run when recorded; the accepted checkpoint preceding this section closes composed verification. They are not live model-quality results and their counts must not be added together.

| Evidence                                   | Result                                                                                                                               | Acceptance boundary                                                                                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Independent matrix component verification  | 360 tests passed; 80 suites; 52,477 ms                                                                                               | Component accepted; see [the matrix checkpoint](instruments/units/aggregates/reports/resumption-matrix-checkpoint.md)                                          |
| Independent authored-workload verification | 8 tests passed; 2,098 ms                                                                                                             | Workload and private/runtime separation accepted; see [the sustained-work checkpoint](instruments/units/aggregates/reports/resumption-endurance-checkpoint.md) |
| Integrated runtime writer run before audit | 397 tests passed; 81 suites; 238,083 ms; separate build control passed                                                               | Pre-audit implementation evidence; final independent integrated gates are still owed                                                                           |
| Returned failure-path repair               | Writer reports 26 tests passed across 3 suites; 135,863 ms; distinguishing mutations failed as required                              | Root inspected the preparation patch; transport successor and composed verification remain pending                                                             |
| Returned audit repair                      | Writer reports 33 tests passed; load-bearing mutations failed as required                                                            | Root reproduced a receipt-only repaired-work regression; a successor patch has returned                                                                        |
| Receipt repair successor                   | Writer reports 14 touched tests passed; build and tests completed in 4,324 ms; source-only mutation failed the receipt-positive case | Root inspected source and raw proof logs, then integrated the combined audit patch; composed verification remains pending                                      |
| Root receipt regression reproduction       | 1 collected test passed its defect assertions; 1,045 ms                                                                              | Old guard accepts valid receipt plus prior product; repaired guard refuses it; product-only control still refuses                                              |
| Fresh transport-probe prerequisites        | Collected fixture test passed; canonical launcher exit 0 in 230,092 ms                                                               | Prepared under the unchanged reviewed build                                                                                                                    |
| Matched transport reproduction             | 1 collected test passed its defect assertions; exit 0, uncapped, 20,517 ms                                                           | A judge HTTP 500 stops actual retries and enters the failed-candidate evidence path; the final incomplete-ranking guard still refuses selection                |
| Transport repair touched run               | Writer reports 83 tests passed across 17 suites; 273,810 ms, uncapped                                                                | Root integrated the source and documentation patches; saved successful-filing validation has a bounded successor, and composed verification remains pending    |

The integrated objective and subjective audit found correctness and measurement issues: pre-send attempts counted as requests, authentic failed preparation rejected by downstream readers, completion labels accepted without evidence for the exact obligation, repeated short audit controls that could reveal their identity, and a recommendation classified negative where the criterion requires inconclusive. The audit, preparation, and transport repairs are integrated and await composed verification. The transport reproduction shows an infrastructure failure passing the failed-candidate evidence check. Its controlled scope covers a failed q4 candidate and the final incomplete-ranking refusal; it does not demonstrate selection of an alternate winner. The repair separates operational errors from measured resource refusals and retains the frozen judge retry bound. A bounded successor applies the same raw validation to saved successful filing evidence.

The subjective control-text proposal returned through Cursor in session `17f44e78-d378-4dc0-8920-1efd18918f5c`, exit 0, uncapped, 453,857 ms. Independent source checking found an unintended finance-request completion claim in the stale-address control. Root applied the prescribed correction and integrated the full control products. Only control artifact strings and their manifest hashes changed; IDs, goals, oracle labels, reasons, truth, runtime, and workload measurements remain unchanged. Final workload gates remain pending.

The transport reproduction completed against fresh authentic prerequisites. Its first attempt failed a probe assumption that the fault must occur in the first arm; selecting the actual failed attempt corrected the instrument without changing the implementation. The saved-filing successor is integrated, with authentic-success, cleared-failure-label, foreign-model, altered-count, and boundary-removal controls. The corrected live invocation driver passes strict TypeScript and emitted-path checks; no live phase has started.

The independent composed run passed canonical build, strict type checking, scoped formatting, and scoped lint. Its harness command passed 408 of 409 tests across 81 suites, with no skipped, cancelled, or todo tests, then exited 1 uncapped in 161,567 ms for the launch. The failing runtime fixture recorded wall time 9,571 ms against its frozen 9,552 ms bound. The canonical build without synthetic resources and scaffold gates did not run. Source custody remained unchanged.

The same emitted runtime test passed alone: 1 of 1 tests, exit 0 uncapped in 353,436 ms, under unchanged source, emitted-test, workload, and synthetic-build identities. An earlier diagnostic launched from the wrong checkout failed before fixture execution and remains separately recorded. The isolated pass does not replace the failed composed gate. The integrated parser correction retains the resource-refusal outcome and exact custody checks for every produced reply. It also rejects earlier empty rows that could match an actual empty assistant tool-call message. The successor gate uses serial fixture scheduling to reduce host competition.

The serial successor passed canonical synthetic build, strict type checking, scoped formatting, and lint, then returned 409 of 410 passing tests across 81 suites, with no skipped, cancelled, or todo tests. Its launcher exited 1 uncapped in 614,594 ms; the test command took 604,788 ms. The continuous-runtime test received refusal exit 3 where it expected 0. Retained aggregate wall time is 10,011 ms against 9,974 ms; records completed in 9,750 ms. The parser regression passed. Canonical live build and scaffold gates remain unexecuted. Serial scheduling did not resolve the fixture's completion assumption.

## Find the working evidence

The runtime diagnosis is complete. The retained serial aggregate reached 10,011 ms against 9,974 ms; the standalone passing aggregate retained only 494 ms of margin. Approximate pre-request intervals were 6.7 seconds in evaluation and 1.6 seconds in development. The integrated fixture predeclares the same 100 ms real response delay for both phases and arms and preserves the existing 10 ms default for other consumers. In its full corrected proof, records completed in 18848 ms and aggregate in 21066 ms against the development-derived 31726 ms bound, with margins of 12878 ms and 10660 ms. The expired-wall control sent no request. Its enforcement mutation failed the intended assertion in 33416 ms; the restored control passed in 20944 ms. These are instrument proofs, not model-quality results. See primary `tmp/units/aggregate-runtime-refusal-analysis-report.md` and the isolated `aggregate-runtime-completion-repair` checkout's `tmp/units/aggregate-runtime-completion-report.md` and reporting addendum.

The following paths are relative to the primary scaffold checkout unless a different checkout is named. They contain local working evidence; campaign conclusions remain in the tracked records.

- `tmp/units/aggregate-integrated-analyst-report.md` and `tmp/units/aggregate-integrated-design-report.md`: immutable independent audit returns.
- `tmp/units/aggregate-integrated-acceptance-draft.md`: root's pending integrated ruling and repair custody.
- `tmp/worktrees/aggregate-failure-repair/tmp/units/aggregate-failure-repair-report.md`: returned failure-path patch, proof commands, and mutation evidence.
- `tmp/worktrees/aggregate-audit-repair/tmp/units/aggregate-audit-repair-report.md`: earlier audit repair report, preserved unchanged.
- `tmp/worktrees/aggregate-audit-repair/tmp/units/aggregate-audit-receipt-repair-report.md`: returned receipt correction and combined audit patch.
- `tmp/worktrees/agent-session/tmp/units/aggregate-repair-receipt-proof.json`: root's receipt regression observation.
- `tmp/worktrees/agent-session/tmp/units/aggregate-transport-prerequisites.log` and its `.err` file: fresh prerequisite run for the remaining transport probe.
- `tmp/worktrees/agent-session/tmp/units/aggregate-transport-reproduction-current.log` and its `.err` file: preserved failed probe assumption, exit 1 in 16,682 ms.
- `tmp/worktrees/agent-session/tmp/units/aggregate-transport-reproduction-matched.log`, its `.err` file, and `aggregate-transport-reproduction-measurements.json`: corrected reproduction and retained request/custody evidence.
- `tmp/cursor/aggregate-control-products.jsonl`: completed subjective proposal journal, inspected before integration.
- `tmp/units/aggregate-control-evidence-report.md` and `aggregate-control-integration.json`: independent control verdict and exact integration custody.
- `tmp/units/aggregate-integrated-verifier-accepted-stage-b-failure-report.md`: independent composed failure and input custody.
- `tmp/units/aggregate-integrated-runtime-alone-diagnostic-report.md`: unchanged runtime test's isolated pass and preserved invalid-cwd attempt.
- `tmp/units/aggregate-integrated-serial-final-report-02.md`: successor failed gate, raw test log, and input custody.
- `tmp/units/aggregate-runtime-wall-analysis-brief.md`: independent diagnosis scope for the retained serial refusal.
- `tmp/worktrees/aggregate-failure-repair/tmp/units/aggregate-partial-product-diagnosis.md`: retained partial-refusal evidence and parser cause.
- `tmp/units/aggregate-partial-product-repair-brief.md` and `aggregate-serial-gate-driver-brief.md`: bounded repair and successor gate scheduling.

Raw historical pilot evidence remains under this branch's `.orkestrel/agent/instruments/results/l5/pilot-resumption`. The accepted model and held-out-work contracts and commands are linked from the resumption plan. Follow that plan for open work; do not restart the completed release or overwrite the stopped pilot.

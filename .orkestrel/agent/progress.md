# Release and aggregate progress

The release is ready for npm publication. Aggregate model-quality evaluation remains pending. This record distinguishes released-source verification, the stopped pilot, and offline instrument proofs. For remaining work and its order, see [the resumption plan](plan.md#resume-from-the-verified-state-of-2026-10-10).

The snapshot date is 2026-10-10. The active aggregate checkout is `C:/Users/mikes/WebstormProjects/scaffold/tmp/worktrees/agent-session`, on `claude/confident-maxwell-6nd0f3`. Scaffold main at `68060778df1e737e51ab083e90af81683c49671c` carries release records only. The integrated aggregate source checkpoint is `168aaa05729ef1aad82a3e6871449aa948951fcd`, local and not accepted or pushed at this snapshot.

## Release evidence

The completed release runs establish the following results. See [the agent 0.0.30 release checkpoint](https://github.com/orkestrel/scaffold/blob/68060778df1e737e51ab083e90af81683c49671c/.orkestrel/agent/instruments/units/agent-0030/release-checkpoint.md) for scope, hashes, skips, and consumer limits. The same record is available in the primary scaffold checkout under `.orkestrel/agent/instruments/units/agent-0030/release-checkpoint.md`.

| Run                        | Result                                                               | Scope                                                                                                  |
| -------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Agent `prepublishOnly`     | Exit 0; 1,857 passed, 2 applicability skips; 43,574 ms               | Final release format, lint, type, build, and tests at agent main `ee734c3`                             |
| Recorded replay            | 108 of 108 passed; 6,279 ms                                          | Recovered recorded-run oracle                                                                          |
| Raw request comparison     | 618 requests per build; 0 differences or incomplete copies; 5,784 ms | Serialized request bodies; agent and judge mutation controls each detected a changed request           |
| Desk packed-consumer gates | 532 passed, 4 applicability skips; 241,760 ms                        | Packed agent plus patched Ollama; published-artifact re-pin remains pending                            |
| Ollama patch gates         | 811 passed, 2 applicability skips; 22,338 ms                         | Type, lint, format, build, and offline tests; live-service and publication steps remain with the owner |

Agent main contains version 0.0.30. npm publication has not been attempted in this resumption. The operator's last availability message says they are not at the keyboard. The exact publish command is authorized; no Claude-specific mode switch is required. Publication must be confirmed through npm output and the registry before the desk re-pin is reported complete.

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

The following runs test the measurement implementation with real components and controlled local inputs. They are not live model-quality results and their counts must not be added together.

| Evidence                                   | Result                                                                                                                               | Acceptance boundary                                                                                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Independent matrix component verification  | 360 tests passed; 80 suites; 52,477 ms                                                                                               | Component accepted; see [the matrix checkpoint](instruments/units/aggregates/reports/resumption-matrix-checkpoint.md)                                          |
| Independent authored-workload verification | 8 tests passed; 2,098 ms                                                                                                             | Workload and private/runtime separation accepted; see [the sustained-work checkpoint](instruments/units/aggregates/reports/resumption-endurance-checkpoint.md) |
| Integrated runtime writer run before audit | 397 tests passed; 81 suites; 238,083 ms; separate build control passed                                                               | Pre-audit implementation evidence; final independent integrated gates are still owed                                                                           |
| Returned failure-path repair               | Writer reports 26 tests passed across 3 suites; 135,863 ms; distinguishing mutations failed as required                              | Returned patch awaits root inspection and composed verification                                                                                                |
| Returned audit repair                      | Writer reports 33 tests passed; load-bearing mutations failed as required                                                            | Root reproduced a receipt-only repaired-work regression; a successor patch has returned                                                                        |
| Receipt repair successor                   | Writer reports 14 touched tests passed; build and tests completed in 4,324 ms; source-only mutation failed the receipt-positive case | Returned combined patch awaits root inspection and composed verification                                                                                       |
| Root receipt regression reproduction       | 1 collected test passed its defect assertions; 1,045 ms                                                                              | Old guard accepts valid receipt plus prior product; repaired guard refuses it; product-only control still refuses                                              |
| Fresh transport-probe prerequisites        | Collected fixture test passed; canonical launcher exit 0 in 230,092 ms                                                               | Prepared under the unchanged reviewed build                                                                                                                    |
| Matched transport reproduction             | 1 collected test passed its defect assertions; exit 0, uncapped, 20,517 ms                                                           | A judge HTTP 500 stops actual retries and enters the failed-candidate evidence path; the final incomplete-ranking guard still refuses selection                |

The integrated objective and subjective audit found unresolved correctness and measurement issues: pre-send attempts counted as requests, authentic failed preparation rejected by downstream readers, completion labels accepted without evidence for the exact obligation, repeated short audit controls that could reveal their identity, and a recommendation classified negative where the criterion requires inconclusive. Bounded repairs await integration. The transport reproduction also shows an infrastructure failure passing the failed-candidate evidence check. Its controlled scope covers a failed q4 candidate and the final incomplete-ranking refusal; it does not demonstrate selection of an alternate winner. That failure classification needs repair before live feasibility selection.

The subjective control-text proposal returned through Cursor in session `17f44e78-d378-4dc0-8920-1efd18918f5c`, exit 0, uncapped, 453,857 ms. Root review remains pending. The objective and audit repair sources are frozen in their isolated checkouts. The transport reproduction completed against fresh authentic prerequisites. Its first attempt failed a probe assumption that the fault must occur in the first arm; selecting the actual failed attempt corrected the instrument without changing the implementation. The independent verifier driver is prepared but has not run the final composed gates.

## Find the working evidence

The following paths are relative to the primary scaffold checkout unless a different checkout is named. They contain local working evidence; campaign conclusions remain in the tracked records.

- `tmp/units/aggregate-integrated-analyst-report.md` and `tmp/units/aggregate-integrated-design-report.md`: immutable independent audit returns.
- `tmp/units/aggregate-integrated-ruling-draft.md`: root's pending integrated ruling.
- `tmp/worktrees/aggregate-failure-repair/tmp/units/aggregate-failure-repair-report.md`: returned failure-path patch, proof commands, and mutation evidence.
- `tmp/worktrees/aggregate-audit-repair/tmp/units/aggregate-audit-repair-report.md`: earlier audit repair report, preserved unchanged.
- `tmp/worktrees/aggregate-audit-repair/tmp/units/aggregate-audit-receipt-repair-report.md`: returned receipt correction and combined audit patch.
- `tmp/worktrees/agent-session/tmp/units/aggregate-repair-receipt-proof.json`: root's receipt regression observation.
- `tmp/worktrees/agent-session/tmp/units/aggregate-transport-prerequisites.log` and its `.err` file: fresh prerequisite run for the remaining transport probe.
- `tmp/worktrees/agent-session/tmp/units/aggregate-transport-reproduction-current.log` and its `.err` file: preserved failed probe assumption, exit 1 in 16,682 ms.
- `tmp/worktrees/agent-session/tmp/units/aggregate-transport-reproduction-matched.log`, its `.err` file, and `aggregate-transport-reproduction-measurements.json`: corrected reproduction and retained request/custody evidence.
- `tmp/cursor/aggregate-control-products.jsonl`: completed subjective proposal journal; root must inspect the captured answer before integration.
- `tmp/units/aggregate-integrated-verifier-driver.ts`: prepared final gate driver; no execution is claimed.

Raw historical pilot evidence remains under this branch's `.orkestrel/agent/instruments/results/l5/pilot-resumption`. The accepted model and held-out-work contracts and commands are linked from the resumption plan. Follow that plan for open work; do not restart the completed release or overwrite the stopped pilot.

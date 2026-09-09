# Final extraction review routing

| Unit | Role and engine | Execution | State |
| --- | --- | --- | --- |
| guides_extraction_final_astra | independent read-only reviewer, native Astra | native task /root/guides_extraction_final_astra | returned; findings reconciled in d7n-guides-extraction-final-verdict.md |
| guides_entry_design_objective | reused read-only analyst, native Sol | native task /root/guides_entry_design_objective | returned under the owner waiver; direction-prose finding retained |
| guides_extraction_mechanical | mechanical evidence, Cursor Grok | root tracked exec 2915; session 4428a072-fc43-4126-9ef8-49425c904945 | returned exit 0; observation and instruction-read limits retained |
| guide_parity_core_fix | bounded leaf/prose successor, native Sol | native task /root/guide_parity_core_fix | returned frozen; correction accepted in d7n-guides-extraction-leaves-verdict.md |
| guides_extraction_leaves_astra | independent correction reviewer, native Astra | native task /root/guides_extraction_leaves_astra | returned PASS on the correction brief |
| guides_extraction_leaves_objective | reused correction analyst, native Sol | native task /root/guides_entry_design_objective | returned PASS on the correction brief |
| guides_extraction_leaves_mechanical | mechanical evidence, Cursor Grok | root tracked exec 98954; session ac9aa573-852d-43cd-8682-60c57d9a237a | returned exit 0; root launch receipt corrects the report's journal claim |
| guides_command_design_astra | independent design-fit recommendation, native Astra | native task /root/guides_command_design_astra | running on d7n-guides-command-boundary-brief.md after owner reopened the local command shell |
| guides_command_design_objective | reused objective recommendation, native Sol | native task /root/guides_entry_design_objective | running on the same command-boundary brief |
| guides_command_capabilities | capability evidence, Cursor Grok | root tracked exec 50378; session 3623acd8-f041-450d-984f-7ccd87e73d02 | running read-only; journal tmp/cursor/d7n-guides-command-capabilities.jsonl |

The mechanical journal is tmp/cursor/d7n-guides-extraction-mechanical.jsonl with
stderr beside it. The bridge verified the versioned CLI but stopped because it
expected an exported model selector. The root read the selector assignment from
the existing role contract and launched the exact versioned entry through the
saved run-guides-extraction-mechanical.sh script. Its init event confirms the
round trip. No credential was read and no engine substitution occurred.

Retain the bridge's original report unchanged. Its draft uses Windows backslashes
and assumes the selector is an environment variable; neither was the executed
carrier. The retained root script uses forward-slash paths, sources pass-env.sh,
and reads the non-secret selector from the role contract without embedding a
model identifier. Product diffs are captured before and after the reading.

The separate native Astra lane replaces unavailable Opus under Ruling 37. The
objective analyst is reused under Ruling 33. The root supplies final executed
gates; no fresh verifier is dispatched. Read the returned final reports and root
verdict before calling the integrated source accepted.

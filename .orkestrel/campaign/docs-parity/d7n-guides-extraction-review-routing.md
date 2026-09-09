# Final extraction review routing

| Unit | Role and engine | Execution | State |
| --- | --- | --- | --- |
| guides_extraction_final_astra | independent read-only reviewer, native Astra | native task /root/guides_extraction_final_astra | running on the common final brief |
| guides_entry_design_objective | reused read-only analyst, native Sol | native task /root/guides_entry_design_objective | running on the common final brief under the owner waiver |
| guides_extraction_mechanical | mechanical evidence, Cursor Grok | root tracked exec 2915; session 4428a072-fc43-4126-9ef8-49425c904945 | running on the bounded mechanical brief |

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

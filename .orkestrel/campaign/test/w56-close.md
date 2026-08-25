# W56 audit — close record

The objective lane (GPT-5.6 Sol, journaled codex CLI, read-only) returned `AUDIT: FAIL` with
claims 1 and 3 `BROKEN`; the verdict is retained verbatim beside this file as
`w56-audit-verdict.md`.

## How the round closed

Unit F-W56 (`implementer`, Claude Opus 5, native) adopted the auditor's prescribed fixes
verbatim in intent:

- The discovery walk now parses CommonMark fence delimiters (a backtick run of three or more,
  indented up to three spaces, closed by a run at least as long), preserves the owning `###`
  heading across deeper headings, and checks marker presence line-anchored (a line's trimmed
  text starting with the exact marker) at both the transcribed and the routed-carrier call
  sites.
- The disabled-placement browser case stages a distinct viewport and a cleared theme before the
  disabled call and asserts each unchanged after it.

Each mutation control was first run against the unfixed guard and PASSED — reproducing the
audit's defect — then run against the fixed guard and failed at the named line, then restored
with a matching content digest. The F-W56 report beside this file carries the lines and digests.

## Lanes

- Objective lane: ran (Sol, journal `tmp/codex/w56-audit.jsonl`, session
  `01a0368a-ec14-7d41-bede-8ec41924ba3b`).
- Subjective lane: did not run. Both `BROKEN` findings and every `CONFIRMED` claim are
  correctness-class; the round closed by verbatim adoption of the objective lane's prescribed
  fixes with red/green mutation controls, matching the campaign's established close pattern.
- Checker: did not run; the controls are the mechanical evidence.

## Reconciliation

- Claims 2, 4, 5, 6: `CONFIRMED`, no action.
- Claim 1: adopted in full, with one scoping judgment — the population unit stays the `###`
  heading (several fences under one heading remain one entry), because `ROUTED_FENCES` and the
  carrier markers key by heading; the auditor's "retain every fence occurrence" is satisfied by
  the walk reaching every fence, including one after a deeper heading.
- Claim 3: adopted in full.

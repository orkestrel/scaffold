# Unit roughnotes-integration-verifier — Verify staging and preservation

## Role and engine

verifier on native Terra. Read only; root saves the result.

## Objective

Verify the executed preparation, complete original backup, and exact staged accepted recovery before root commits and fast-forwards.

## Context

**Evidence.** Root read prepare-2.ps1 and its actual diff against prepare.ps1, then executed prepare-2.ps1. Read native tool result supplied with dispatch and scratch report-2.md/backup/ plus expected status/path files. Read canonical tmp/units/roughnotes-integration-preparation-brief.md and brief-2.md. Registry acceptance is .orkestrel/campaign/roughnotes-registry-acceptance.md. Recovery source baseline86a9ef6bc4620fdf36c47af1f4c530693357eb86; no commit yet. Original main remains at that baseline with staged .codex additions.

**Law.** Read canonical AGENTS.md, .agents/orchestration.md, portability/quality/writing rules, guides/README.md and recovery guide. Skill:none. Product/source acceptance is closed; no broad rereview or rerun.

**Installed primitives.** Native Git, PowerShell hash/file inspection. Do not write inline Node programs or any file.

**Host.** Windows PowerShell5.1. Scratch C:/Users/mikes/AppData/Local/Temp/roughnotes-integration-20260918; canonical C:/Users/mikes/WebstormProjects/scaffold; original sibling roughnotes; recovery canonical/tmp/recovery/roughnotes.

**Measurements.** Compare every backup source/hash to original bytes; original index entries to saved original-index.txt. Check complete status allowlists, recovery staged path set against recovery-paths.txt and accepted gate after snapshot, absent deletions, and no unstaged recovery source changes. Use Git cached diff/check, file hashes and git hash-object versus index where needed for LF normalization. Compare accepted gate source snapshot to worktree bytes. Do not claim raw worktree bytes equal normalized Git blobs without accounting for attributes.

**Control identifiers.** Inspect successor actual extra-row and native-failure controls. Run read-only git apply --reverse --check for the saved original unstaged patch; it must apply cleanly before root uses it. Do not perform the reversal.

**Standing conditions.** Full gates and registry capture green before staging. Recovery guides/test.md is the fetched published upstream mirror. Original staged .codex files are intentionally excluded from recovery source commit. Retention builder writes only canonical .orkestrel/campaign/roughnotes-acceptance-unit, independently.

## Unknowns

Report any mismatch, unstaged source, unsafe staging path, or missing backup; repair nothing.

## Scope

**Owned.** None, return final report.

**Shared (report-only).** Scratch artifacts and original/recovery Git/source snapshots.

**Off-limits.** All writes, index mutations, actual patch application, commit/merge/install/push/deletion, broad source audits, credentials.

**What asserts the state this change ends.** Staged accepted source and untouched original backup are the prerequisite for integration.

**Tools and limits.** Read-only commands, no delegates or tools that alter trees.

## Execution

Perform directly and spawn nothing. Read actual instrument and executed result, verify the staged and backup bytes independently.

## Output

Return GREEN/RED with commands/exits, backup/index/source preservation findings, staged ownership, reverse-check result, and limits.

## Deviation contract

Follow orchestration deviation protocol. Record read-only command issues; do not repair.

## Acceptance criteria

- Original dirty/staged working files match verified backup and preserved index entries.
- Recovery staged paths are exactly accepted source; gate snapshot agrees with working bytes.
- Original saved unstaged patch reverses cleanly in read-only check.

**Observations, not criteria.** Root commit and fast-forward follow this check; no source behavior audit is reopened.

## Review evidence

Inspect actual diff/status and bytes, not author prose alone. Return no commit authorization beyond mechanical findings.

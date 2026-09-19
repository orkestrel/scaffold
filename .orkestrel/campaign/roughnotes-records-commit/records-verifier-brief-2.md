# Unit records-verifier successor — Confirm the staging metadata correction

## Role and engine

verifier on native Terra, read-only.

## Objective

Verify the exact stale stage.ps1 hash correction identified by the prior verifier, then return commit readiness without repeating closed checks.

## Context

**Evidence.** The effective preceding brief is records-verifier-brief.md beside this file. Its returned report found the index allowlist, exclusions, copy manifests, required links, and protected hashes correct. Its sole discrepancy is raw-index-identity.json recording stage.ps1 as a3051238f1def4a6e077da237224e4d76339019d while the staged/live script is 2564a0f45b410124ed2434c10d5c79d6a2a82e16. Root applies only the reported metadata correction. The failed report remains records-verifier-report.md beside this brief and is retained unchanged.

**Law.** Follow AGENTS.md, .agents/orchestration.md, documentation/writing/quality/portability rules, orkestrel-debrief/SKILL.md and retention.md, and guides/README.md as in the preceding brief. No source or instruction edits.

**Installed primitives.** Native Git and file hashes only.

**Host.** PowerShell5.1 in canonical Scaffold. Read-only; root pauses writes while this check runs.

**Measurements.** Use your previous report for the unchanged checks. Re-read the exact stage.ps1 index hash, unfiltered disk hash, and corrected generated record. Inspect the staged diff of the changed metadata. Retained author/verifier briefs and reports are added under roughnotes-records-commit; compare copied bytes to their external originals.

**Control identifiers.** The original report demonstrates refusal of the stale hash. The corrected record must match the unchanged script bytes. Do not mutate the script or re-stage anything.

**Standing conditions.** All product gates and the earlier receipt checks remain closed. Root has not edited product source, raw landing/publication receipts, or protected user files. Final returned verifier text is appended after your return with exact byte comparison.

## Unknowns

Report only a remaining mismatch or unauthorized staged delta.

## Scope

**Owned.** Read-only verification of roughnotes-records-commit/raw-index-identity.json and added report/brief files. Use the preceding explicit staged allowlist.

**Shared (report-only).** Existing accepted bundles and Git state.

**Off-limits.** Writes, staging, commits, push, install, source gates, cleanup, and delegation.

**What asserts the state this change ends.** The stale stage.ps1 blob/disk fields prevented acceptance. Their exact correction is the only metadata change.

**Tools and limits.** Read-only Git and file comparisons. Do not broaden scope.

## Execution

Perform directly and spawn nothing. Compare the corrected record with actual staged/live script bytes, verify the added raw receipts, and check that the prior accepted scope has no unexpected staged delta. Return GREEN or the exact discrepancy.

## Output

Return a concise final verdict and exact script identity. State that prior unchanged checks carry forward.

## Deviation contract

Follow orchestration's deviation protocol. Report a mismatch without fixing it.

## Acceptance criteria

- Corrected stage.ps1 fields equal its unchanged staged and disk hashes.
- Added briefs/reports match external source bytes.
- No unauthorized path or protected edit enters the index.

**Observations, not criteria.** Root commits and pushes after acceptance. Field testing and debrief remain pending.

## Review evidence

Use the prior RED report, the exact staged metadata correction, actual blob hashes, and direct source/copy comparisons.

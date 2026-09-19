# Unit published-scaffold-verifier — Verify shipped archive identity

## Role and engine

verifier on native Terra. Return evidence; root retains the report.

## Objective

Independently check the actual registry artifact and the bounded complete payload-comparison evidence before Roughnotes adoption.

## Context

**Evidence.** Root's npm view of Scaffold0.0.75 returned sha512-ueJmibzyJKE7fyATUgc+CUWIKpfUEJxUm8oXBSFSrusuZiRYF6s7SfdCyQFmB37vN8+SoUVCssKV4/54sr1fEA==. The downloaded archive is C:/Users/mikes/AppData/Local/Temp/scaffold-registry-20260918/scaffold-0.0.75.tgz. The prepared archive is tmp/release/anchor-pack/orkestrel-scaffold-0.0.75.tgz. Read scratch comparison-brief.md, comparison.mjs, comparison-report.md and comparison-evidence/. Builder reports only package/dist/host/codex/config.toml and package/dist/host/manifest.json differ. Root ran git diff -- .codex/config.toml: local edits remove comments and add [mcp_servers.codex] command codex args [mcp-server]. Root Get-FileHash found canonical .codex/config.toml SHA256 C8364A20FCA401E65F3C092968B1F6B4D4E025A1EFD91E22BEB01B3FCD39E076, equal to reported published config. Root git status also shows host.json changed by the owner's publication; preserve it.

**Law.** Read AGENTS.md, .agents/orchestration.md, quality/portability/writing rules, orkestrel-publish/SKILL.md and references/wave.md and window.md, guides/README.md and scaffold guide release/ownership context.

**Installed primitives.** Native tar, Node and PowerShell; no package additions or implementation.

**Host.** Windows PowerShell5.1, Node24.20.0/npm12.0.2. Full read access, no sandbox escalation. Canonical root C:/Users/mikes/WebstormProjects/scaffold.

**Measurements.** Independently hash each tarball and read actual tar member listings and published config/host manifest. Compare with retained inventory/diffs and canonical config. Inspect the comparator's complete member walk, byte-safe extraction, controls, and actual result. Do not rerun it into its existing evidence directory.

**Control identifiers.** Read executed changed-byte and missing-member controls in the retained comparator result. Their scope is regular archive membership and bytes. No product behavior control is owed by this artifact check.

**Standing conditions.** Source release gates and audits are accepted at c64f7872; main2574f559 adds evidence. Different published config is the owner's existing local edit. Do not fix, commit, republish, or reopen source acceptance. Separate read-only Sol auditors inspect the adoption script.

## Unknowns

Whether the retained comparison overlooked a member or misclassified a difference is the question. Name any unverified reading rather than inventing acceptance.

## Scope

**Owned.** None; final report only.

**Shared (report-only).** Named archives, comparison evidence, canonical config and host manifest.

**Off-limits.** All writes, installs, extraction to disk, source gates, credentials, .codex content beyond the named public config, source modification and release commands.

**What asserts the state this change ends.** The published artifact identity supersedes the assumption it is byte-identical to the prepared tarball. Preserve prepared evidence.

**Tools and limits.** Read-only shell and file reads. No delegation or writes. Do not copy, modify, or print auth information.

## Execution

Perform the bounded assignment directly and spawn nothing.

## Output

Return GREEN/RED, exact command/exit evidence, archive identities, differing members, whether published config matches the owner's canonical edit, comparator coverage, and material limits. No product acceptance claim.

## Deviation contract

Report an unsafe command or missing evidence; do not repair. Distinguish a limitation of the check from an actual payload mismatch.

## Acceptance criteria

- Measured archive hashes match registry and prepared metadata.
- Actual tar listings agree with the comparator's population.
- The comparator's executed result binds to those archives and compares complete regular-member payloads.
- The published config and corresponding inventory digests account for the exact difference.

**Observations, not criteria.** No full runtime gates or Codex app launch belongs to this archive check.

## Review evidence

Read actual archive bytes/listings and the executed instrument with its raw evidence. Root supplied actual config diff and hash as corroboration. Source review and application capture are outside this subject.

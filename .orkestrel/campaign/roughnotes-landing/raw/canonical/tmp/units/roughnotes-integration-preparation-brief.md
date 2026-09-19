# Unit roughnotes-integration-preparation — Prepare protected source integration

## Role and engine

builder on native Terra. Author a fully specified preparation instrument; root executes it.

## Objective

Prepare explicit recovery staging and an immutable backup of original Roughnotes dirty source and staged Codex files before a root-owned commit and fast-forward.

## Context

**Evidence.** Read .orkestrel/campaign/roughnotes-integration-map-ruling.md and r-b-final-audit-verdict.md. Root read original and recovery Git status on2026-09-18 after final gates. Each HEAD is86a9ef6bc4620fdf36c47af1f4c530693357eb86. Original main has unstaged app/browser/App.vue, components/HomeView.vue, MagazineView.vue, MediaView.vue, ProductsView.vue, constants.ts, guides/README.md, tests/app/browser/App.test.ts, helpers.test.ts, setup.ts. Original staged additions .codex/agents/orkestrel.toml and .codex/hooks.json must survive byte-for-byte and index-blob-for-index-blob. Recovery branch recovery/journey-20260918 has accepted source, guide/catalog and package changes plus untracked tests/setupBrowser.test.ts; no staged files. Measure exact status and diff before authoring. Full registry gates and capture finished0; independent evidence verification runs read-only alongside this author.

**Law.** Read AGENTS.md, .agents/orchestration.md, portability/quality/writing rules, guides/README.md and recovery guides/README.md. Skill: none; this is mechanical integration preparation of already accepted source. No source design or behavior change. No dependencies, assertions, mocks, suppression, or unowned edits.

**Installed primitives.** Native Git, PowerShell5.1 and SHA256. Reuse existing script patterns only where semantics fit. Save Git binary diff with native --output to avoid PowerShell transcoding.

**Host.** Canonical C:/Users/mikes/WebstormProjects/scaffold; original C:/Users/mikes/WebstormProjects/roughnotes; recovery canonical/tmp/recovery/roughnotes. Shared Git common-dir is original/.git. Write instruments only in C:/Users/mikes/AppData/Local/Temp/roughnotes-integration-20260918. Root creates scratch before dispatch. No source mutation by author.

**Measurements.** Require fixed physical roots, original main and recovery branch at baseline, original exact dirty/staged allowlist, recovery exact accepted dirty allowlist derived from current status, and clean recovery index. Store SHA256 for all original dirty and staged working files, original staged blob entries, source absent paths, and recovery source paths. Back up original dirty files plus Codex files preserving relative layout, binary unstaged patch, binary staged patch, status and index blob metadata. Verify all copy hashes before staging recovery.

**Control identifiers.** Syntax validation and read-only preflight. Exercise destination-exists refusal only against a separate scratch control destination, not original source. Do not execute real preparation. No commit or reversible Git mutation controls belong to the author.

**Standing conditions.** Do not read .codex beyond the explicitly named public files; do not read secrets. Product source has accepted changes and must not be reset or reformatted. Existing source audits remain closed.

## Unknowns

Exact recovery path allowlist must be measured by author before embedding it. Report any unexpected original change or staged file. Stop if baseline/branch differs.

## Scope

**Owned.** Scratch prepare.ps1, recovery-paths.txt, report.md, evidence/ source-status and diffstat receipts. Root owns executing preparation, staging, commit, original patch reversal, merge, install, and push.

**Shared (report-only).** Original and recovery trees and indices, accepted campaign reports.

**Off-limits.** All source edits, any .codex edit, backup deletion, original index changes, commit/push/install/checkout/restore/reset/stash/clean, any current gates or capture output.

**What asserts the state this change ends.** Original modified files prevent fast-forward integration. Preserve them explicitly before root reverses their saved patch. Accepted recovery must stage only its measured owned paths, never user files.

**Tools and limits.** Author owned scratch files, syntax/read-only checks. No source mutation, no real preparation run, no delegation. You are not alone; preserve every other change.

## Execution

Perform directly and spawn nothing. Write prepare.ps1 with fixed roots and an exclusive scratch/backup output, preflight all branch/HEAD/status guards before creating backup. Copy and hash original working files, record index entries, and save unstaged/staged patches with git diff --binary --output. Save recovery changed-path snapshots and explicit recovery-paths.txt. After copies verify, stage recovery only with literal owned paths through git add -- <paths>, checking exit. Save staged diffstat/status. Refuse additional untracked or staged recovery source; ignored tmp is allowed. Do not touch original working source or index. Root then verifies staged evidence, commits recovery, checks and reverses the exact original unstaged patch, and fast-forwards original. Return exact separate Git commands for those root actions and required post-merge checks. Do not automate commit, merge, install, or push.

## Output

Return instrument/report paths, exact prepare command, measured original/recovery state, syntax/preflight/control evidence, and root command sequence. Name any integration risk concretely.

## Deviation contract

Follow orchestration deviation protocol. Choose evidence filenames and JSON representation locally. Stop on unexpected dirty paths, sensitive input, or need for broader writes.

## Acceptance criteria

- Preflight refuses a wrong root/branch/baseline or unexpected source/index state before mutation.
- Backup preserves original dirty working bytes and staged blob identities before recovery staging.
- Recovery staging is bounded to literal accepted paths; original remains untouched.
- Script syntax passes; root actual run and independent staged verification remain explicit.

**Observations, not criteria.** Root commit, fast-forward and registry install occur after acceptance.

## Review evidence

Return actual source status/diffstat, script diff, syntax reading, and execution limits. No source self-acceptance.

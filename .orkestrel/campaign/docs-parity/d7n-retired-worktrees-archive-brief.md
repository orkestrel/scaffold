# Unit d7n-retired-worktrees-archive — Archive retired edits

## Role and engine

Use builder on Terra through the native harness.

## Objective

Write a bounded PowerShell carrier that archives and verifies retired Scaffold edits before root removes the retired worktrees.

## Context

Read canonical AGENTS.md, .agents/orchestration.md, .claude/rules/portability.md, .claude/rules/writing.md, and .claude/rules/quality.md before acting. Read .agents/skills/orkestrel-debrief/references/retention.md for retention safety; this task does not prune the campaign. Dispatch skill: none. Governing specification: this brief and the owner's instruction to archive the retired copies' edits and remove those copies. Product guide: none; no product changes.

Use PowerShell 5.1 on Windows. The canonical checkout is C:/Users/mikes/WebstormProjects/scaffold. Write multi-step programs to files with apply_patch and invoke each with a plain command. Use forward-slash paths and host-native path operations. Every Git command uses git -C. No install, commit, push, publish, authentication, secret access, or destructive command runs in the role. Perform the assignment directly and spawn nothing. You are not alone in the workspace; preserve others' edits.

Root measured git worktree list --porcelain:

```text
worktree C:/Users/mikes/WebstormProjects/scaffold
HEAD 9eca9cbaa3821017efb7ef8aa9519150bc135fe3
branch refs/heads/main
worktree C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-guides-entry
HEAD 9b3003d14ca73c5218a7cb2a968f8b35600d3280
branch refs/heads/claude/docs-parity-guides-entry-unit
worktree C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path
HEAD c87021bdc6367d27463139b293287a586de18240
detached
```

Root's merge-base --is-ancestor command for each retired HEAD against canonical HEAD exited 0. Canonical status is clean. Root measured each retired status --short --untracked-files=all:

```text
scaffold-guides-entry:
 M .claude/rules/documentation.md
 M guides/scaffold.md
 M host.json
 M package-lock.json
 M package.json
 D scripts/docs.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/server/Materializer.ts
 M src/server/types.ts
 M tests/distribution.test.ts
 M tests/guides.test.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/fixtures/app-only-toolchain.txt
 M tests/src/core/fixtures/setup-false-manifest.txt
 M tests/src/core/fixtures/source-manifest.txt
 M tests/src/core/helpers.test.ts
 M tests/src/server/Materializer.test.ts
 M tests/src/server/helpers.test.ts
?? scripts/guides.ts
scaffold-path:
 M .claude/rules/portability.md
 M host.json
 M tests/config.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
?? tests/setupPolicy.test.ts
```

## Unknowns

Report any changed HEAD, branch, tracked/untracked path set, staged state, or path indirection. Do not broaden the archive population. Ignored caches, node_modules, dist, nested tmp, and local authentication/configuration are outside the authored-edit archive. Never read or copy .mcp.json, .env*, .npmrc, auth.json, keys, or tokens.

## Scope

Owned: tmp/pass/d7n-retired-worktrees-archive.ps1 and tmp/units/d7n-retired-worktrees-archive-report.md.

Shared, report-only: campaign records and canonical repository files. Root updates handoff.md and ledger.md.

Off-limits: every canonical product file, every retired file, all sibling repositories, prepared dist, release tarballs, and every other tmp path. The carrier may write only its exact evidence directory when root runs it. The carrier's removal mode may remove only the named retired worktrees after verification. Do not run either mode yourself.

State made false by removal: handoff.md and the cleanup report, carried by root. Historical reports remain intact.

## Execution

Create a script with explicit Archive, Verify, and Remove modes. Keep it narrowly scoped; no generic cleanup framework.

- Fix target paths and expected HEAD/branch/path sets to the evidence in this brief. Validate canonical checkout main and each retired worktree registration, git-common-dir, and .git file. Resolve exact paths, refuse reparse-point roots or ancestors, and verify the targets remain strictly below canonical tmp/pass. Never case-fold containment. Recheck immediately before removal.
- In Archive mode create .orkestrel/campaign/docs-parity/evidence/d7n-retired-worktrees-archive/<target-name>, refusing an existing destination. Capture base HEAD, branch, porcelain status, index listing, binary full-index combined/staged/unstaged diffs. Use Git's --output to avoid PowerShell redirection damage. Restrict diff reads to the measured authored paths and verify no extra dirty paths before reading content. Preserve raw bytes of each present modified/untracked authored file as <relative-path>.snapshot and record sha256 plus deleted paths in a manifest. Do not copy the whole worktree or .git contents. Preserve staged distinction through separate patches; refuse unexpected unmerged or staged entries rather than guessing.
- In Verify mode compare every snapshot's SHA256 with its source file, validate deleted paths remain absent, re-read expected HEAD/branch/status/path population, and compare re-captured combined/staged/unstaged patch hashes. Refuse any mismatch. Verify base HEAD is still reachable from canonical main. Do not create another checkout or package copy to validate recovery.
- In Remove mode verify archives and targets before any removal, and verify each target again immediately before its removal. Use git -C canonical worktree remove --force with the exact validated target only. No other discard or recursive delete command. Preserve recovery branch refs. Require an explicit archive commit argument and verify the archive is committed and that this commit is present on origin/main before removal. Root will push the archive beforehand. Stop if any command fails; never fall back to broader deletion.
- Record command exits and per-target archive verification/removal success as text. Check targets absent and worktree registrations absent after removal. Keep logs as .log.txt outside archived source snapshots.
- Include a read-only negative-control path for Verify: an optional expected snapshot hash override that deliberately mismatches, without changing source/archive bytes and without deleting anything. Root will run it and record the refusal.
- No model identifiers in generated prose or artifact contents; routing belongs only in this brief. Use counts only as literal data from commands, never authored prose.

## Output

Write the carrier and report; return their paths and syntax-check evidence. Do not run archive or removal modes. Include exact root invocation examples with forward-slash paths.

## Deviation contract

Stop and report expected, found, evidence, and done/not done on a primary scope conflict. Settle formatting details within the brief. Never widen the deletion population or the file-read population.

## Acceptance criteria

- PowerShell parsing succeeds.
- Carrier archives only measured authored edits with raw-byte hashes and Git recovery patches.
- Verification refuses source or archive mismatch and an explicit incorrect hash control.
- Removal requires a pushed archive and exact validated targets, retaining canonical repositories and prepared releases.
- An independent reviewer reads the exact carrier before root runs it. Root owns live execution evidence.

## Review evidence

Return the authored script and report. Root supplies actual diff/status and execution logs to the independent reviewer. No full product gates are needed for this archival task.

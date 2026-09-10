# Unit d7n-retired-worktrees-final-carrier — Correct archive recovery

## Role and engine

Use implementer on Sol through the native harness. Perform the assignment directly and spawn nothing. You are not alone in the workspace; preserve all other edits.

## Objective and authority

Correct the archive carrier so root can preserve the owner-authorized retired worktree edits and remove those worktrees. Read AGENTS.md, .agents/orchestration.md, .claude/rules/portability.md, .claude/rules/writing.md, .claude/rules/quality.md, tmp/units/d7n-retired-worktrees-archive-brief.md, and its correction brief before acting. Skill: none. Governing spec: those briefs with the corrections here. Product guide: none; no product change.

## Scope and host

Own tmp/pass/d7n-retired-worktrees-final-carrier.ps1 and tmp/units/d7n-retired-worktrees-final-carrier-report.md. Read the predecessor at .orkestrel/campaign/docs-parity/instruments/d7/foundation-native/d7n-retired-worktrees-archive.ps1; do not edit it. All other paths are report-only. No install, commit, push, authentication, secret access, archive mode, or deletion. Root owns live execution. PowerShell 5.1 runs on Windows at C:/Users/mikes/WebstormProjects/scaffold. Use host-native path functions, forward-slash paths, git -C, apply_patch, and plain file invocations. Do not create another checkout or package copy. Parser-only or read-only preflight mode may run; never copy source contents or execute removal yourself.

## Established evidence and scope

Canonical Scaffold is on main at 9eca9cbaa3821017efb7ef8aa9519150bc135fe3. The exact target HEADs/status/path populations remain the values in the original brief, measured by root. Each base HEAD is an ancestor of main. No archive or removal mode has run. Git status contains only retained campaign instruments/briefs/reports; canonical product is unchanged. The independent reviewer has placed the predecessor on HOLD. Do not repeat its unexecuted success claims.

## Required corrections

- Normalize every compared host path with the same native path normalizer, using ordinal comparison and no case-fold. Git worktree registration uses forward slashes; GetFullPath returns native separators. Parse the exact worktree block and validate its HEAD and branch or detached marker. Preserve fixed exact target paths; no generic or caller-supplied removal targets.
- Walk reparse ancestry correctly for FileInfo through Directory and for DirectoryInfo through Parent, through the filesystem root. Check the existing ancestor before creating an archive or validation directory. Check archive files and source files before reading them. Refuse path indirection rather than following it. Keep every write inside the fixed archive or validation root.
- Write structured head/branch metadata with a nullable branch for detached state, then compare nullable values explicitly. Do not call Trim on an empty raw file. Preserve source status and index metadata.
- Verify exact manifest path population, valid present/deleted states, expected deletion of scripts/docs.ts only in scaffold-guides-entry, source and snapshot hashes, HEAD/branch/status/index, patch hashes and live full-index binary patch re-captures. Refuse unexpected staged or unmerged state. Use GUID validation directories so repeated verification cannot collide. Use archive-local '* -text' to preserve every recovery byte through Git.
- Before any removal, verify the entire archive population against the explicitly supplied commit: required manifest, metadata, status, index, attributes, combined/staged/unstaged patches and hashes, snapshots for present records only, and any immutable archive logs. Compare raw Git blob IDs against hash-object --no-filters for every archive file. The commit must include all required files, no file may differ, and the commit must be reachable from origin/main. A commit containing snapshots without recovery metadata must fail. A deleted record must not require a snapshot.
- Verify every target and the pushed archive before any removal; then verify the respective target again immediately before git worktree remove --force on its exact validated path. Check path and registration absence after removal; preserve canonical main and branch refs. No broader fallback deletion. Abort on any failed command.
- Expose a non-mutating Preflight mode to test path normalization, source/registration/branch/status checks on the measured host before root archives. Keep Archive, Verify, and Remove modes. Permit a wrong-hash override only in Verify for root's negative control. Logs go to stdout or an external run-log path, never into immutable archive metadata during Verify/Remove.
- Keep the source archive limited to measured tracked and untracked authored files. Never read/copy .mcp.json, .env*, .npmrc, auth.json, tokens, keys, ignored caches, node_modules, dist, or nested tmp. Root may remove ignored contents only as part of the explicitly authorized retired directory removal after authored recovery is secured.

## Unknowns and deviation

Report any difference from the measured source/branch/path population. Do not broaden the archive. If an underlying requirement conflicts with the exact Windows host behavior, report the command and evidence before changing the scope. Ancillary script formatting is yours to settle.

## Acceptance and output

Run the PowerShell parser and read-only Preflight yourself. Record actual exits, not inferred success. Return the script and report paths with the corrected checks and limits. Root owns Archive, Verify, wrong-hash control, pushed-archive verification, removal, and final acceptance. Root's reused independent reviewer will inspect this successor and the root receipts. No fresh verifier or product gates run for this cleanup.

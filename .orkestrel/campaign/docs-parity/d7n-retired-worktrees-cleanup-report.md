# Retired worktree cleanup

The owner authorized archiving the retired worktree edits and removing those copies on 2026-09-10. Root archived and verified their authored edits. Removal awaits the archive commit and push; no retired directory has been removed at this checkpoint.

The recovery archive lives under evidence/d7n-retired-worktrees-archive. Its target directories are scaffold-guides-entry and scaffold-path. Each target retains metadata.json, status.txt, index.txt, manifest.json, combined/staged/unstaged binary full-index patches with hashes, and exact raw snapshots for present modified or untracked authored files. The manifest records the scripts/docs.ts deletion without a snapshot. Archive-local Git attributes preserve the recovery bytes without newline conversion.

The guides-entry base is 9b3003d14ca73c5218a7cb2a968f8b35600d3280 on claude/docs-parity-guides-entry-unit. The path worktree base is c87021bdc6367d27463139b293287a586de18240 in detached state. Root confirmed each base is reachable from canonical main. The archive preserves rejected and superseded edits as evidence; it does not apply them to the canonical implementation.

The removal scope is fixed to C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-guides-entry and C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path. Canonical package repositories, prepared release output, release tarballs, and other scratch paths are outside the deletion scope. Ignored dependencies, build output, nested temporary files, and local configuration are not part of the authored-edit archive. Root did not read or copy credentials or secrets.

Root's retained-copy Preflight and Archive passed. After correcting PowerShell JSON-array boxing, Verify passed in the scratch and retained copies. The wrong-hash control exited 1 at the actual snapshot comparison, and verification after the control exited 0. See d7n-retired-worktrees-json-correction-report.md and the matching evidence logs. The effective removal instrument is instruments/d7/foundation-native/d7n-retired-worktrees-verified-carrier.ps1; the predecessor instruments remain retained and must not run.

Before removal, the effective carrier requires an explicitly supplied archive commit reachable from origin/main and compares the complete archive population and every raw Git blob against that commit. It re-verifies each retired source immediately before its fixed worktree removal, then checks path absence, registration absence, canonical main stability, and recovery refs.

Scaffold's canonical checkout remains on main. The cleanup introduces no product edits and runs no release upload or authentication. The remaining fleet work and owner publication decisions remain open.

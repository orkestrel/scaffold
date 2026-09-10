# Retired worktree cleanup

The owner authorized archiving the retired worktree edits and removing those copies on 2026-09-10. Root archived and verified their authored edits, pushed the recovery archive, and removed the retired directories. Their paths and Git registrations are absent.

The recovery archive is committed at b9e2b6a6868666d3af6b4aa05e5736028dfdf16c and was pushed to main, claude/orkestrel-npm-audit-deps-14ibta, and claude/docs-parity-windows-01a0810d before deletion. The branch claude/docs-parity-guides-entry-unit remains at its recorded base for recovery. The archive files also remain in the canonical campaign folder; no package copy or worktree is needed to read them.

The recovery archive lives under evidence/d7n-retired-worktrees-archive. Its target directories are scaffold-guides-entry and scaffold-path. Each target retains metadata.json, status.txt, index.txt, manifest.json, combined/staged/unstaged binary full-index patches with hashes, and exact raw snapshots for present modified or untracked authored files. The manifest records the scripts/docs.ts deletion without a snapshot. Archive-local Git attributes preserve the recovery bytes without newline conversion.

The guides-entry base is 9b3003d14ca73c5218a7cb2a968f8b35600d3280 on claude/docs-parity-guides-entry-unit. The path worktree base is c87021bdc6367d27463139b293287a586de18240 in detached state. Root confirmed each base is reachable from canonical main. The archive preserves rejected and superseded edits as evidence; it does not apply them to the canonical implementation.

The removal scope is fixed to C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-guides-entry and C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path. Canonical package repositories, prepared release output, release tarballs, and other scratch paths are outside the deletion scope. Ignored dependencies, build output, nested temporary files, and local configuration are not part of the authored-edit archive. Root did not read or copy credentials or secrets.

Root's retained-copy Preflight and Archive passed. After correcting PowerShell JSON-array boxing, Verify passed in the scratch and retained copies. The wrong-hash control exited 1 at the actual snapshot comparison, and verification after the control exited 0. See d7n-retired-worktrees-json-correction-report.md and the matching evidence logs. The effective removal instrument is instruments/d7/foundation-native/d7n-retired-worktrees-verified-carrier.ps1; the predecessor instruments remain retained and must not run.

The removal command supplied the archive commit explicitly. The effective carrier verified that commit was reachable from origin/main, compared the complete archive population and every raw Git blob, and re-verified each retired source immediately before its fixed worktree removal. The command exited 0 after checking path absence, registration absence, canonical main stability, and recovery refs. Read evidence/d7n-retired-worktrees-remove.log.txt.

Root's separate post-removal checks confirm that Git lists only the canonical Scaffold worktree on main and that each deleted path is absent. The canonical product diff against the starting commit is empty outside the campaign folder. Contract, Codec, Msg, SSE, and Test remain clean on main, and their dist directories remain byte-equal to the accepted release extractions. Read evidence/d7n-retired-worktrees-closed-state.log.txt.

The cleanup runs no release upload or authentication. The remaining fleet work and owner publication decisions remain open.

VERDICT: PASS — retired copies removed with pushed recovery archives.

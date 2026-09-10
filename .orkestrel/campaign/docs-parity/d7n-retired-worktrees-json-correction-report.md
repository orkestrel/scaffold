# Retired worktree manifest correction

Root changed the manifest assignment to use the JSON array directly. The effective script is instruments/d7/foundation-native/d7n-retired-worktrees-verified-carrier.ps1. The exact change is retained in evidence/d7n-retired-worktrees-json-correction.diff. The previous carrier remains retained and must not run again.

Archive exited 0 and preserved the authored edits under evidence/d7n-retired-worktrees-archive. The prior Verify exited 1 before reaching the hash control because its enclosing array expression boxed the JSON array on Windows PowerShell 5.1. That failed control attempt proves nothing about hash checks.

The corrected Verify exited 0 in the scratch script and again in its retained copy. Each run verified source and snapshot hashes, metadata, index, manifest membership, deletions, and fresh patch captures against the immutable archive. The Verify-only WRONG_SHA256 override exited 1 at snapshot hash differs: .claude/rules/documentation.md. This control reaches the hash comparison and leaves source and archive bytes unchanged. Verification after the control exited 0.

The commands use powershell -NoProfile -File with the named carrier and -Mode Verify, adding -HashOverride WRONG_SHA256 only for the control. Archive ran through the predecessor's -Mode Archive; Archive must not be rerun because the fixed destination exists.

Root retained archive, prior failure, unreached control, actual hash-control, and verified logs under evidence/d7n-retired-worktrees-*.log.txt. No deletion, authentication, publication, or product gate has run. Committed-archive verification and removal await the archive commit and push.

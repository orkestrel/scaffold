# Retired worktrees archive carrier report

The unexecuted carrier is [d7n-retired-worktrees-archive.ps1](../pass/d7n-retired-worktrees-archive.ps1).

Root invocations use `powershell -File tmp/pass/d7n-retired-worktrees-archive.ps1 -Mode Archive`, then `-Mode Verify`, and only after the committed archive reaches `origin/main`, `-Mode Remove -ArchiveCommit <commit>`.

The carrier fixes the named retired targets, captures raw edited bytes and Git recovery patches, verifies a negative hash override without changing data, and limits removal to those validated worktrees.
